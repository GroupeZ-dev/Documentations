# Requêtes

Sarah fournit une API fluide pour exécuter des requêtes de base de données via la classe `RequestHelper`. Ce guide couvre toutes les opérations de requêtes avec des exemples pratiques.

## RequestHelper

Le `RequestHelper` est votre interface principale pour les opérations de base de données :

```java
RequestHelper requestHelper = new RequestHelper(databaseConnection, logger);
```

## Requêtes SELECT

### Sélectionner Tous les Enregistrements

```java
// Sélectionner tous les joueurs
List<PlayerDTO> players = requestHelper.selectAll("players", PlayerDTO.class);
```

### Sélectionner avec Conditions

```java
// Sélectionner les joueurs avec plus de 1000 de temps de jeu
List<PlayerDTO> activePlayers = requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("play_time", ">", 1000);
});
```

### Sélectionner avec Plusieurs Conditions

```java
List<PlayerDTO> results = requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("play_time", ">", 1000);
    table.where("is_banned", false);
    table.whereNotNull("last_login");
});
```

### Sélectionner avec Tri

```java
List<PlayerDTO> topPlayers = requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("is_banned", false);
    table.orderByDesc("play_time");
});
```

### Sélectionner avec Clause IN

```java
List<String> names = Arrays.asList("Steve", "Alex", "Notch");
List<PlayerDTO> players = requestHelper.select("players", PlayerDTO.class, table -> {
    table.whereIn("name", names);
});
```

### Sélectionner en Maps Brutes

Quand vous n'avez pas de classe DTO :

```java
List<Map<String, Object>> results = requestHelper.select("players", table -> {
    table.where("is_online", true);
});

for (Map<String, Object> row : results) {
    String name = (String) row.get("name");
    long playTime = (long) row.get("play_time");
}
```

### Compter les Enregistrements

```java
long totalPlayers = requestHelper.count("players", table -> {});

long activePlayers = requestHelper.count("players", table -> {
    table.where("play_time", ">", 1000);
});
```

## Requêtes INSERT

### Insertion Basique

```java
requestHelper.insert("players", schema -> {
    schema.uuid("uuid", playerUuid);
    schema.string("name", playerName);
    schema.bigInt("play_time", 0);
});
```

### Insertion depuis un DTO

```java
// Votre classe DTO
public record PlayerDTO(UUID uuid, String name, long playTime) {}

// Insertion
PlayerDTO player = new PlayerDTO(uuid, "Steve", 0);
requestHelper.insert("players", PlayerDTO.class, player);
```

### Insertion avec Callback de Résultat

Obtenir l'ID auto-généré :

```java
requestHelper.insert("homes", schema -> {
    schema.uuid("player_uuid", playerUuid);
    schema.string("name", "MyHome");
    schema.string("world", "world");
    schema.decimal("x", x);
    schema.decimal("y", y);
    schema.decimal("z", z);
}, generatedId -> {
    System.out.println("Home créé avec l'ID : " + generatedId);
});
```

### Insertion avec Gestion d'Erreur

```java
requestHelper.insert("players", schema -> {
    schema.uuid("uuid", playerUuid);
    schema.string("name", playerName);
}, generatedId -> {
    logger.info("Joueur créé avec l'ID : " + generatedId);
}, () -> {
    logger.warning("Échec de la création du joueur !");
});
```

### Insertion par Lot

```java
List<PlayerDTO> players = Arrays.asList(
    new PlayerDTO(uuid1, "Steve", 0),
    new PlayerDTO(uuid2, "Alex", 0),
    new PlayerDTO(uuid3, "Notch", 0)
);

requestHelper.insertMultiple("players", PlayerDTO.class, players);
```

## Requêtes UPDATE

### Mise à Jour Basique

```java
requestHelper.update("players", schema -> {
    schema.bigInt("play_time", newPlayTime);
    schema.where("uuid", playerUuid);
});
```

### Mettre à Jour Plusieurs Colonnes

```java
requestHelper.update("players", schema -> {
    schema.string("name", newName);
    schema.bigInt("play_time", newPlayTime);
    schema.bool("is_online", true);
    schema.where("uuid", playerUuid);
});
```

### Mise à Jour par Lot

```java
List<Schema> updates = new ArrayList<>();
for (PlayerDTO player : playersToUpdate) {
    Schema schema = SchemaBuilder.update("players", s -> {
        s.bigInt("play_time", player.playTime());
        s.where("uuid", player.uuid());
    });
    updates.add(schema);
}
requestHelper.updateMultiple(updates);
```

## Requêtes UPSERT (Insérer ou Mettre à Jour)

Upsert insère une nouvelle ligne ou met à jour si la clé primaire existe déjà.

### Upsert Basique

```java
requestHelper.upsert("players", schema -> {
    schema.uuid("uuid", playerUuid).primary();
    schema.string("name", playerName);
    schema.bigInt("play_time", playTime);
});
```

:::warning Exigence SQLite
Pour SQLite, vous devez marquer la colonne de clé primaire avec `.primary()` :
```java
schema.uuid("uuid", playerUuid).primary();  // Obligatoire pour SQLite !
```
:::

### Upsert depuis un DTO

```java
PlayerDTO player = new PlayerDTO(uuid, "Steve", 1000);
requestHelper.upsert("players", PlayerDTO.class, player);
```

### Upsert par Lot

```java
List<PlayerDTO> players = getPlayersToSave();
requestHelper.upsertMultiple("players", PlayerDTO.class, players);
```

## Requêtes DELETE

### Suppression avec Condition

```java
requestHelper.delete("players", schema -> {
    schema.where("uuid", playerUuid);
});
```

### Suppression avec Plusieurs Conditions

```java
requestHelper.delete("sessions", schema -> {
    schema.where("player_uuid", playerUuid);
    schema.where("is_expired", true);
});
```

### Supprimer les Anciens Enregistrements

```java
requestHelper.delete("logs", schema -> {
    schema.where("created_at", "<", thirtyDaysAgo);
});
```

## Conditions WHERE

### Égalité

```java
schema.where("name", "Steve");
schema.where("uuid", playerUuid);  // Support UUID
```

### Opérateurs de Comparaison

```java
schema.where("play_time", ">", 1000);
schema.where("balance", ">=", 100.0);
schema.where("level", "<", 10);
schema.where("score", "<=", 50);
schema.where("name", "!=", "Admin");
```

### Vérifications NULL

```java
schema.whereNull("deleted_at");
schema.whereNotNull("verified_at");
```

### Clause IN

```java
schema.whereIn("status", "active", "pending", "review");
schema.whereIn("name", Arrays.asList("Steve", "Alex"));
```

### Combiner les Conditions

Toutes les conditions sont combinées avec AND :

```java
requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("is_banned", false);
    table.where("play_time", ">", 100);
    table.whereNotNull("last_login");
    table.whereIn("rank", "vip", "mvp", "admin");
});
// WHERE is_banned = 0 AND play_time > 100 AND last_login IS NOT NULL AND rank IN ('vip', 'mvp', 'admin')
```

## Objets de Transfert de Données (DTOs)

Sarah mappe automatiquement les résultats de requêtes vers des objets Java.

### Utiliser les Records (Java 14+)

```java
public record PlayerDTO(
    UUID uuid,
    String name,
    long playTime,
    boolean isBanned
) {}

// Sarah mappera automatiquement les colonnes aux paramètres du constructeur
List<PlayerDTO> players = requestHelper.selectAll("players", PlayerDTO.class);
```

### Utiliser des Classes avec l'Annotation @Column

Pour les anciennes versions de Java ou les noms de colonnes personnalisés :

```java
public class PlayerDTO {
    @Column("uuid")
    private UUID uuid;

    @Column("name")
    private String name;

    @Column("play_time")
    private long playTime;

    @Column("is_banned")
    private boolean banned;

    // Constructeur correspondant à l'ordre des colonnes
    public PlayerDTO(UUID uuid, String name, long playTime, boolean banned) {
        this.uuid = uuid;
        this.name = name;
        this.playTime = playTime;
        this.banned = banned;
    }

    // Getters...
}
```

### Mapping des Noms de Colonnes

Sarah convertit entre le camelCase Java et le snake_case SQL :

| Champ Java | Colonne Base de Données |
|------------|-------------------------|
| `playTime` | `play_time` |
| `isBanned` | `is_banned` |
| `lastLoginAt` | `last_login_at` |
| `uuid` | `uuid` |

## Exemples Complets

### Système de Statistiques de Joueurs

```java
public class PlayerStatsManager {
    private final RequestHelper requestHelper;

    public PlayerStatsManager(RequestHelper requestHelper) {
        this.requestHelper = requestHelper;
    }

    public void saveStats(UUID uuid, PlayerStats stats) {
        requestHelper.upsert("player_stats", schema -> {
            schema.uuid("uuid", uuid).primary();
            schema.bigInt("kills", stats.getKills());
            schema.bigInt("deaths", stats.getDeaths());
            schema.bigInt("play_time", stats.getPlayTime());
            schema.decimal("balance", stats.getBalance());
        });
    }

    public PlayerStats getStats(UUID uuid) {
        List<PlayerStats> results = requestHelper.select("player_stats", PlayerStats.class, table -> {
            table.where("uuid", uuid);
        });
        return results.isEmpty() ? new PlayerStats() : results.get(0);
    }

    public List<PlayerStats> getTopPlayers(int limit) {
        return requestHelper.select("player_stats", PlayerStats.class, table -> {
            table.orderByDesc("kills");
            // Note : LIMIT est appliqué après la requête pour l'instant
        }).stream().limit(limit).toList();
    }
}
```

### Système de Homes

```java
public class HomeManager {
    private final RequestHelper requestHelper;

    public void createHome(UUID playerUuid, String name, Location location) {
        requestHelper.insert("homes", schema -> {
            schema.uuid("player_uuid", playerUuid);
            schema.string("name", name);
            schema.string("world", location.getWorld().getName());
            schema.decimal("x", location.getX());
            schema.decimal("y", location.getY());
            schema.decimal("z", location.getZ());
            schema.decimal("yaw", location.getYaw());
            schema.decimal("pitch", location.getPitch());
        });
    }

    public List<HomeDTO> getHomes(UUID playerUuid) {
        return requestHelper.select("homes", HomeDTO.class, table -> {
            table.where("player_uuid", playerUuid);
        });
    }

    public void deleteHome(UUID playerUuid, String name) {
        requestHelper.delete("homes", schema -> {
            schema.where("player_uuid", playerUuid);
            schema.where("name", name);
        });
    }

    public long countHomes(UUID playerUuid) {
        return requestHelper.count("homes", table -> {
            table.where("player_uuid", playerUuid);
        });
    }
}
```

## Prochaines Étapes

- [Référence du Schema Builder](schema-builder) - Documentation complète de l'API
- [Migrations](migrations) - Gérer le schéma de base de données
