# Requêtes

Sarah fournit une API fluide pour exécuter des requêtes de base de données via la classe `RequestHelper`. Ce guide couvre toutes les opérations de requêtes avec des exemples pratiques.

## RequestHelper

Le `RequestHelper` est votre interface principale pour les opérations de base de données :

```java
RequestHelper requestHelper = new RequestHelper(databaseConnection, logger);
```

### Gestion des Erreurs de Lecture

Par défaut, une requête `select`/`selectAll` en échec journalise l’erreur et renvoie une liste vide ; `count` renvoie `0`, les agrégations `null` et `exists` renvoie `false`. Activez les lectures strictes pour distinguer une erreur d’un résultat vide :

```java
requestHelper.setStrictReads(true);
boolean strictReads = requestHelper.isStrictReads();
```

Avec ce mode, ces échecs lèvent `DatabaseException`. Le helper des transactions hérite de ce réglage. Les écritures et les requêtes SQL brutes lèvent une exception SQL encapsulée indépendamment de ce mode.

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

### Sélectionner avec Pagination

Utilisez `limit` et `offset` pour paginer les résultats dans la base. Ajoutez un tri stable pour conserver un ordre prévisible entre les pages :

```java
List<PlayerDTO> page = requestHelper.select("players", PlayerDTO.class, table -> {
    table.orderBy("uuid");
    table.limit(20);
    table.offset(40);
});
```

Un offset sans limite est pris en charge sur les quatre moteurs.

### Vérifier si un Enregistrement Existe

```java
boolean exists = requestHelper.exists("players", table -> {
    table.where("uuid", playerUuid);
});
```

`exists` recherche une correspondance sans charger les enregistrements correspondants.

### Agréger les Valeurs

```java
Number total = requestHelper.sum("players", "balance", table -> {
    table.where("is_banned", false);
});
Number highest = requestHelper.max("players", "level", table -> {});
Number lowest = requestHelper.min("players", "level", table -> {});
Number average = requestHelper.avg("players", "play_time", table -> {});
```

Ces méthodes renvoient un `Number` avec le type numérique fourni par le pilote, ou `null` lorsqu’aucune valeur n’est disponible. `count` renvoie un `long`. Elles acceptent les mêmes conditions WHERE qu’une sélection.

### Regrouper les Résultats avec HAVING

Utilisez `groupBy` pour regrouper une sélection et `having` pour filtrer les groupes obtenus :

```java
List<Map<String, Object>> groups = requestHelper.select("sales", table -> {
    table.addSelect("seller");
    table.groupBy("seller");
    table.having("SUM(`amount`)", ">=", 1000);
    table.having("COUNT(*)", ">", 1);
});
```

La valeur de HAVING est liée comme paramètre. Son expression est du SQL fourni par le développeur. Plusieurs clauses HAVING sont reliées par `AND` ; utilisez `where` pour filtrer les lignes avant leur regroupement.

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
    logger.warn("Échec de la création du joueur !");
});
```

### Insertion par Lot

Toutes les lignes du lot doivent utiliser la même table et le même ordre de colonnes.

```java
List<PlayerDTO> players = Arrays.asList(
    new PlayerDTO(uuid1, "Steve", 0),
    new PlayerDTO(uuid2, "Alex", 0),
    new PlayerDTO(uuid3, "Notch", 0)
);

requestHelper.insertMultiple("players", PlayerDTO.class, players);
```

### Récupérer la Clé Générée

Utilisez `insertAndGetKey` pour obtenir directement l’identifiant généré :

```java
int generatedId = requestHelper.insertAndGetKey("homes", schema -> {
    schema.uuid("player_uuid", playerUuid);
    schema.string("name", "MyHome");
});
```

La surcharge DTO est `insertAndGetKey(tableName, DTO.class, data)`. Le résultat vaut `0` lorsqu’aucune clé n’est disponible. Les méthodes `insert` existantes conservent leur retour `void`.

### Récupérer le Résultat d’une Insertion par Lot

```java
int result = requestHelper.insertMultipleAndGetKey("players", PlayerDTO.class, players);
```

Cette méthode renvoie la première clé générée si elle est disponible, sinon le nombre de lignes insérées. Elle ne renvoie pas une clé par ligne. La surcharge `insertMultipleAndGetKey(List<Schema>)` accepte les schémas construits avec `SchemaBuilder.insert`.

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

Tous les schémas du lot doivent utiliser la même table, les mêmes colonnes et la même structure de conditions ; seules les valeurs des paramètres changent.

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

### Compter les Lignes Modifiées

```java
int changed = requestHelper.updateAndCount("players", schema -> {
    schema.bigInt("play_time", newPlayTime);
    schema.where("uuid", playerUuid);
});
```

Utilisez le nombre renvoyé pour vérifier si une mise à jour conditionnelle a trouvé une ligne. `update` conserve son retour `void`.

### Incrémenter une Colonne

`increment` ajoute un montant à la valeur stockée de manière atomique, sans lecture puis remplacement dans deux requêtes distinctes. Utilisez un montant négatif pour soustraire :

```java
requestHelper.update("players", schema -> {
    schema.increment("coins", 10);
    schema.increment("lives", -1);
    schema.where("uuid", playerUuid);
});
```

### Affecter une Expression SQL

Utilisez `expression` pour une valeur calculée. Liez les valeurs dynamiques avec des paramètres :

```java
requestHelper.update("players", schema -> {
    schema.expression("version", "`version` + ?", 1);
    schema.expression("updated_at", "CURRENT_TIMESTAMP");
    schema.where("uuid", playerUuid);
});
```

Utilisez uniquement des expressions SQL contrôlées par votre application. Cela permet aussi de mettre à jour explicitement `updated_at` avec PostgreSQL.

### Compter les Modifications par Lot

```java
int changed = requestHelper.updateMultipleAndCount(updates);
```

`updates` est la `List<Schema>` construite dans l’exemple de lot ci-dessus. Une surcharge DTO existe : `updateMultipleAndCount(tableName, DTO.class, dataList)`. SQLite exécute les mises à jour séquentiellement. Sur MariaDB, un succès du pilote sans nombre précis contribue pour une ligne par instruction.

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

<CalloutContainer type="warning">

<CalloutTitle>Exigence SQLite et PostgreSQL</CalloutTitle>

<CalloutDescription>
Pour SQLite et PostgreSQL, déclarez la cible de conflit avec `.primary()` sur les clés non auto-incrémentées, ou `.unique()` en l’absence d’une telle clé primaire. La cible doit correspondre à une contrainte existant dans la base :
```java
schema.uuid("uuid", playerUuid).primary();  // Cible de conflit pour SQLite/PostgreSQL
```
</CalloutDescription>

</CalloutContainer>

### Upsert depuis un DTO

```java
PlayerDTO player = new PlayerDTO(uuid, "Steve", 1000);
requestHelper.upsert("players", PlayerDTO.class, player);
```

### Upsert par Lot

Utilisez la même table, le même ordre de colonnes et la même structure de clés de conflit pour chaque ligne du lot.

```java
List<PlayerDTO> players = getPlayersToSave();
requestHelper.upsertMultiple("players", PlayerDTO.class, players);
```

### Incrémenter en Cas de Conflit

```java
requestHelper.upsert("player_stats", schema -> {
    schema.uuid("uuid", playerUuid).primary();
    schema.increment("kills", 1);
});
```

Une nouvelle ligne reçoit `kills = 1` ; une ligne existante ajoute `1` à sa valeur dans la même instruction SQL.

### Préserver les Valeurs Réservées à l’Insertion

```java
requestHelper.upsert("players", schema -> {
    schema.uuid("uuid", playerUuid).primary();
    schema.date("created_at", new java.util.Date()).insertOnly();
    schema.string("name", playerName);
});
```

`insertOnly()` s’applique à la dernière colonne déclarée. Elle est écrite à l’insertion et conserve sa valeur en cas de conflit. Si toutes les colonnes sont réservées à l’insertion, un conflit ne modifie rien.

### Appliquer une Expression en Cas de Conflit

```java
requestHelper.upsert("players", schema -> {
    schema.uuid("uuid", playerUuid).primary();
    schema.string("name", playerName);
    schema.expression("updated_at", "CURRENT_TIMESTAMP");
});
```

Dans un upsert, une `expression` s’applique uniquement à une ligne existante. Une nouvelle ligne utilise la valeur par défaut de la base pour cette colonne : définissez un défaut adapté ou autorisez `NULL` dans le schéma de la table.

### Compter les Résultats des Upserts

```java
int changed = requestHelper.upsertAndCount("players", schema -> {
    schema.uuid("uuid", playerUuid).primary();
    schema.string("name", playerName);
});
int batchChanged = requestHelper.upsertMultipleAndCount("players", PlayerDTO.class, players);
```

La méthode unitaire accepte aussi un DTO. La méthode par lot accepte aussi une `List<Schema>`. Les comptes suivent le pilote : MySQL signale `1` pour une insertion et peut signaler `2` pour une mise à jour.

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

### Compter les Lignes Supprimées

```java
int deleted = requestHelper.deleteAndCount("sessions", schema -> {
    schema.where("is_expired", true);
});
```

`deleteAndCount` renvoie le nombre de lignes affectées ; `delete` conserve son retour `void`.

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

Une liste IN vide ne correspond à aucune ligne. Les arguments numériques conservent leur type sur PostgreSQL ; les listes de chaînes sont interprétées selon le type de la colonne comparée.

### Combiner les Conditions

Les conditions `where` successives sont combinées avec `AND` :

```java
requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("is_banned", false);
    table.where("play_time", ">", 100);
    table.whereNotNull("last_login");
    table.whereIn("rank", "vip", "mvp", "admin");
});
// WHERE is_banned = 0 AND play_time > 100 AND last_login IS NOT NULL AND rank IN ('vip', 'mvp', 'admin')
```

### Clause NOT IN

```java
schema.whereNotIn("status", "blocked", "deleted");
schema.whereNotIn("p", "name", Arrays.asList("Steve", "Alex"));
```

La seconde forme préfixe la colonne par le nom ou l’alias de table (`p.name`). Une liste NOT IN vide correspond à toutes les lignes.

### BETWEEN et NOT BETWEEN

```java
schema.whereBetween("level", 10, 20);
schema.whereNotBetween("score", 0, 100);
```

Les deux bornes sont incluses. Les valeurs sont liées avec leurs types, notamment pour les dates et les nombres.

### LIKE et NOT LIKE

```java
schema.whereLike("name", "Alex%");
schema.whereNotLike("email", "%@example.com");
```

Utilisez `%` pour une suite de caractères et `_` pour un caractère. La sensibilité à la casse dépend du moteur et de la collation de la colonne.

### Conditions OR avec orWhere

Utilisez `orWhere` pour relier une condition à la précédente avec `OR` :

```java
requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("rank", "admin");
    table.orWhere("rank", "moderator");
    table.orWhere("level", ">=", 50);
});
```

Pour une table jointe, utilisez `schema.orWhere("p", "level", ">=", 50)`. La surcharge avec opérateur accepte les mêmes comparaisons que `where`.

### OR avec NULL, IN et BETWEEN

```java
schema.where("rank", "admin");
schema.orWhereNull("rank");
schema.orWhereNotNull("verified_at");
schema.orWhereIn("status", "active", "pending");
schema.orWhereBetween("level", 10, 20);
```

Chaque méthode relie sa condition avec `OR`. `orWhereIn` avec une liste vide ajoute une condition fausse.

### Groupes de Conditions

SQL évalue `AND` avant `OR`. Utilisez `where(group -> ...)` et `orWhere(group -> ...)` pour expliciter les groupes :

```java
requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("is_banned", false);
    table.where(group -> {
        group.where("rank", "vip");
        group.orWhere("rank", "admin");
    });
    table.orWhere(group -> {
        group.where("level", ">=", 50);
        group.whereNotNull("verified_at");
    });
});
// (is_banned = false AND (rank = 'vip' OR rank = 'admin'))
// OR (level >= 50 AND verified_at IS NOT NULL)
```

Un groupe vide n’ajoute rien. Ces conditions sont aussi disponibles pour les comptes, agrégations, mises à jour et suppressions. Liez les valeurs et utilisez des noms de colonnes/opérateurs contrôlés par l’application ; les fragments invalides sont rejetés avec `IllegalArgumentException`.

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

### Champs Mappés et Transitoires

Les champs statiques, synthétiques et annotés `@TransientField` sont exclus des lectures et écritures DTO. Définissez un constructeur avec un paramètre par champ mappé, dans leur ordre de déclaration :

```java
public class PlayerNameDTO {
    private final UUID uuid;
    private final String name;

    @TransientField
    private String displayName;

    public PlayerNameDTO(UUID uuid, String name) {
        this.uuid = uuid;
        this.name = name;
    }
}
```

Pour les résultats sous forme de maps, les alias sélectionnés sont disponibles comme clés, ainsi que les noms de colonnes d’origine.

## Requêtes SQL Brutes

### Exécuter une Instruction

```java
int deleted = requestHelper.execute(
    "DELETE FROM %prefix%logs WHERE created_at < ?", cutoff
);
```

`execute` renvoie le nombre de lignes affectées.

### Mapper les Résultats d’une Requête

```java
List<String> names = requestHelper.query(
    "SELECT `name` FROM %prefix%players WHERE `level` >= ?",
    resultSet -> resultSet.getString("name"),
    10
);
```

Le `RowMapper` reçoit la ligne courante et renvoie la valeur mappée. Les deux méthodes remplacent `%prefix%`, adaptent les accents graves au moteur et lient les paramètres `?`. Les erreurs SQL lèvent `DatabaseException`. Les paramètres `java.util.Date` deviennent des `Timestamp`, les UUID et enums des chaînes. Ne concaténez pas les saisies utilisateur dans le SQL.

## Transactions

### Valider ou Annuler Plusieurs Opérations

```java
int changed = requestHelper.inTransaction(tx -> {
    int debited = tx.updateAndCount("accounts", table -> {
        table.increment("balance", -10);
        table.where("id", fromAccount);
    });
    if (debited != 1) {
        throw new IllegalStateException("Source account not found");
    }
    int credited = tx.updateAndCount("accounts", table -> {
        table.increment("balance", 10);
        table.where("id", toAccount);
    });
    if (credited != 1) {
        throw new IllegalStateException("Destination account not found");
    }
    return debited + credited;
});
```

Le callback valide la transaction lorsqu’il retourne et l’annule lorsqu’il lève une exception. Sa valeur de retour devient le résultat de `inTransaction`. Effectuez tous les appels participants sur `tx` : le helper d’origine utilise une connexion séparée. La connexion est libérée après la transaction.

## Requêtes Asynchrones

### Créer un Helper Asynchrone

Encapsulez votre helper pour exécuter les opérations en dehors du thread appelant :

```java
AsyncRequestHelper async = new AsyncRequestHelper(requestHelper);
// Ou choisissez le nombre de threads :
AsyncRequestHelper customPool = new AsyncRequestHelper(requestHelper, 2);
// Ou utilisez un exécuteur appartenant à votre application :
AsyncRequestHelper external = new AsyncRequestHelper(requestHelper, executor);
```

Le helper par défaut possède un pool de quatre threads daemon. Choisissez un de ces constructeurs pour votre application.

### Lire et Écrire avec des Futures

```java
CompletableFuture<List<PlayerDTO>> players = async.select(
    "players", PlayerDTO.class, table -> table.where("is_banned", false)
);
CompletableFuture<Integer> changed = async.update("players", table -> {
    table.increment("coins", 10);
    table.where("uuid", playerUuid);
});
changed.thenAccept(count -> logger.info("Updated rows: " + count));
```

Chaque opération renvoie un `CompletableFuture`, y compris les comptes, agrégations, vérifications d’existence, lots, requêtes SQL brutes et transactions. `insert` asynchrone fournit la clé générée ; `update`, `upsert` et `delete` fournissent le nombre de lignes affectées. Les lots suivent les variantes synchrones retournant un résultat. Une exception complète le futur exceptionnellement ; les lectures suivent le mode strict du helper encapsulé.

### Exécuter une Transaction Asynchrone

```java
CompletableFuture<Integer> result = async.inTransaction(tx ->
    tx.updateAndCount("players", table -> {
        table.increment("coins", 10);
        table.where("uuid", playerUuid);
    })
);
```

Utilisez le `tx` synchrone dans le callback pour conserver toutes les opérations sur la connexion de la transaction.

### Arrêter le Helper Asynchrone

```java
async.shutdown();
```

`shutdown()` arrête uniquement le pool appartenant au helper. Un exécuteur externe reste actif. Les callbacks des futures s’exécutent normalement sur les threads de l’exécuteur ; utilisez le scheduler du serveur pour revenir au thread principal avant d’accéder aux API qui l’exigent.

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
            table.limit(limit);
        });
    }
}
```

### Système de Homes

```java
public class HomeManager {
    private final RequestHelper requestHelper;

    public HomeManager(RequestHelper requestHelper) {
        this.requestHelper = requestHelper;
    }

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
