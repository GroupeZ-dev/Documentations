# Migrations

Les migrations vous permettent de versionner le schéma de votre base de données. Sarah suit les migrations exécutées et s'assure que chaque migration ne s'exécute qu'une seule fois.

## Comment Fonctionnent les Migrations

1. Vous créez des classes de migration qui définissent les changements de schéma
2. Sarah maintient une table de migrations pour suivre les migrations exécutées
3. Quand vous appelez `MigrationManager.execute()`, seules les nouvelles migrations s'exécutent
4. Les migrations sont exécutées dans l'ordre où elles ont été enregistrées

## Créer une Migration

Étendez la classe `Migration` et implémentez la méthode `up()` :

```java
import fr.maxlego08.sarah.database.Migration;

public class CreateUsersTable extends Migration {

    @Override
    public void up() {
        create("users", table -> {
            table.uuid("uuid").primary();
            table.string("name", 64);
            table.text("location").nullable();
            table.bigInt("play_time").defaultValue(0);
            table.timestamps();
        });
    }
}
```

## Opérations de Migration

### Créer une Table

```java
public class CreatePlayersTable extends Migration {
    @Override
    public void up() {
        create("players", table -> {
            table.uuid("uuid").primary();
            table.string("name", 32);
            table.decimal("balance", 10, 2).defaultValue(0);
            table.bool("is_banned").defaultValue(false);
            table.timestamps();
        });
    }
}
```

### Créer une Table depuis un Template de Classe

Vous pouvez créer automatiquement une table basée sur un record ou une classe :

```java
// Définir votre DTO
public record PlayerDTO(
    UUID uuid,
    String name,
    long playTime
) {}

// Migration
public class CreatePlayersFromTemplate extends Migration {
    @Override
    public void up() {
        create("players", PlayerDTO.class);
    }
}
```

### Modifier une Table

Modifier une table existante :

```java
public class AddEmailToUsers extends Migration {
    @Override
    public void up() {
        alter("users", table -> {
            table.string("email", 255).nullable();
        });
    }
}
```

### Créer un Index

Créer un index pour de meilleures performances de requêtes :

```java
public class CreateUsersNameIndex extends Migration {
    @Override
    public void up() {
        createIndex("users", "name");
    }
}
```

### Supprimer une Table

Supprimer une table :

```java
public class DropOldLogsTable extends Migration {
    @Override
    public void up() {
        drop("old_logs");
    }
}
```

### Renommer une Table

```java
public class RenamePlayersTable extends Migration {
    @Override
    public void up() {
        rename("players", "users");
    }
}
```

## Types de Colonnes

Sarah supporte différents types de colonnes :

| Méthode | Type SQL | Exemple |
|---------|----------|---------|
| `uuid(name)` | VARCHAR(36) | `table.uuid("player_id")` |
| `string(name, length)` | VARCHAR(length) | `table.string("name", 64)` |
| `text(name)` | TEXT | `table.text("description")` |
| `longText(name)` | LONGTEXT | `table.longText("content")` |
| `integer(name)` | INT | `table.integer("count")` |
| `bigInt(name)` | BIGINT | `table.bigInt("balance")` |
| `decimal(name)` | DECIMAL | `table.decimal("price")` |
| `decimal(name, length, decimals)` | DECIMAL(length, decimals) | `table.decimal("price", 10, 2)` |
| `bool(name)` | TINYINT(1) | `table.bool("active")` |
| `json(name)` | JSON | `table.json("metadata")` |
| `blob(name)` | BLOB | `table.blob("data")` |
| `timestamp(name)` | TIMESTAMP | `table.timestamp("verified_at")` |
| `date(name)` | DATE | `table.date("birth_date")` |

## Modificateurs de Colonnes

### Clé Primaire

```java
table.uuid("uuid").primary();
```

### Auto Incrémentation

```java
table.autoIncrement("id");        // INT
table.autoIncrementBigInt("id");  // BIGINT
```

### Nullable

```java
table.string("nickname", 32).nullable();
```

### Valeur par Défaut

```java
table.bigInt("balance").defaultValue(0);
table.bool("active").defaultValue(true);
table.string("status", 16).defaultValue("pending");
```

### Timestamp Courant par Défaut

```java
table.timestamp("created_at").defaultCurrentTimestamp();
```

### Unique

```java
table.string("email", 255).unique();
```

### Clé Étrangère

```java
table.uuid("user_id").foreignKey("users");
// ou avec colonne personnalisée et cascade
table.uuid("user_id").foreignKey("users", "uuid", true);
```

## Aide pour les Timestamps

Ajouter les colonnes `created_at` et `updated_at` :

```java
create("posts", table -> {
    table.autoIncrementBigInt("id");
    table.string("title", 255);
    table.timestamps();  // Ajoute created_at et updated_at
});
```

Ou individuellement :

```java
table.createdAt();  // Juste created_at
table.updatedAt();  // Juste updated_at
```

## Exécuter les Migrations

### Exécution Basique

```java
// Définir un nom de table personnalisé (optionnel, par défaut "migrations")
MigrationManager.setMigrationTableName("my_plugin_migrations");

// Enregistrer les migrations dans l'ordre
MigrationManager.registerMigration(new CreateUsersTable());
MigrationManager.registerMigration(new CreatePostsTable());
MigrationManager.registerMigration(new AddEmailToUsers());

// Exécuter toutes les migrations en attente
MigrationManager.execute(databaseConnection, logger);
```

### Exemple Complet

```java
public class MyPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        // Configurer la connexion à la base de données
        DatabaseConnection connection = setupConnection();

        // Configurer le nom de la table de migrations
        MigrationManager.setMigrationTableName("myplugin_migrations");

        // Enregistrer toutes les migrations
        registerMigrations();

        // Exécuter les migrations
        try {
            MigrationManager.execute(connection, getLogger());
            getLogger().info("Migrations terminées avec succès !");
        } catch (SQLException e) {
            getLogger().severe("Échec de la migration : " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void registerMigrations() {
        MigrationManager.registerMigration(new CreatePlayersTable());
        MigrationManager.registerMigration(new CreateHomesTable());
        MigrationManager.registerMigration(new CreateWarpsTable());
        MigrationManager.registerMigration(new AddPlayerEmailColumn());
    }
}
```

## Méthodes du MigrationManager

| Méthode | Description |
|---------|-------------|
| `setMigrationTableName(name)` | Définir le nom personnalisé de la table de migrations |
| `getMigrationTableName()` | Obtenir le nom actuel de la table de migrations |
| `registerMigration(migration)` | Enregistrer une migration à exécuter |
| `getMigrations()` | Obtenir la liste des migrations enregistrées |
| `execute(connection, logger)` | Exécuter toutes les migrations en attente |
| `setDatabaseConfiguration(config)` | Définir la configuration de la base de données |
| `getDatabaseConfiguration()` | Obtenir la configuration de la base de données |

## Bonnes Pratiques

### 1. Nommer les Migrations de Façon Descriptive

```java
// Bien
public class CreateUsersTable extends Migration { }
public class AddEmailColumnToUsers extends Migration { }
public class CreateUserPostsIndex extends Migration { }

// Mal
public class Migration1 extends Migration { }
public class UpdateTable extends Migration { }
```

### 2. Garder les Migrations Petites

Chaque migration devrait faire une seule chose :

```java
// Bien - migrations séparées
public class CreateUsersTable extends Migration { ... }
public class CreatePostsTable extends Migration { ... }

// Mal - trop dans une seule migration
public class CreateAllTables extends Migration { ... }
```

### 3. Ne Jamais Modifier les Migrations Existantes

Une fois qu'une migration a été exécutée en production, créez une nouvelle migration pour les changements :

```java
// Ne modifiez pas CreateUsersTable après déploiement
// À la place, créez une nouvelle migration :
public class AddAvatarToUsers extends Migration {
    @Override
    public void up() {
        alter("users", table -> {
            table.string("avatar_url", 255).nullable();
        });
    }
}
```

### 4. Utiliser les Timestamps

Toujours inclure les timestamps pour l'audit :

```java
create("important_data", table -> {
    table.autoIncrementBigInt("id");
    table.string("data", 255);
    table.timestamps();  // Toujours inclure ceci
});
```

## Exemple Concret

Voici une configuration complète de migrations pour un plugin de homes :

```java
// Migration 1 : Créer la table des joueurs
public class CreatePlayersTable extends Migration {
    @Override
    public void up() {
        create("homes_players", table -> {
            table.uuid("uuid").primary();
            table.string("name", 16);
            table.integer("max_homes").defaultValue(3);
            table.timestamps();
        });
    }
}

// Migration 2 : Créer la table des homes
public class CreateHomesTable extends Migration {
    @Override
    public void up() {
        create("homes", table -> {
            table.autoIncrementBigInt("id");
            table.uuid("player_uuid").foreignKey("homes_players", "uuid", true);
            table.string("name", 32);
            table.string("world", 64);
            table.decimal("x", 10, 2);
            table.decimal("y", 10, 2);
            table.decimal("z", 10, 2);
            table.decimal("yaw", 5, 2);
            table.decimal("pitch", 5, 2);
            table.timestamps();
        });
    }
}

// Migration 3 : Ajouter la colonne icône
public class AddIconToHomes extends Migration {
    @Override
    public void up() {
        alter("homes", table -> {
            table.string("icon", 64).defaultValue("GRASS_BLOCK");
        });
    }
}
```

## Prochaines Étapes

- [En savoir plus sur les requêtes](queries) - Exécuter SELECT, INSERT, UPDATE, DELETE
- [Référence du Schema Builder](schema-builder) - Toutes les méthodes disponibles
