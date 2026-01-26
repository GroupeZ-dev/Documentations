# Migrations

Migrations allow you to version control your database schema. Sarah tracks which migrations have been executed and ensures each migration runs only once.

## How Migrations Work

1. You create migration classes that define schema changes
2. Sarah maintains a migrations table to track executed migrations
3. When you call `MigrationManager.execute()`, only new migrations run
4. Migrations are executed in the order they were registered

## Creating a Migration

Extend the `Migration` class and implement the `up()` method:

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

## Migration Operations

### Create Table

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

### Create Table from Class Template

You can automatically create a table based on a record or class:

```java
// Define your DTO
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

### Alter Table

Modify an existing table:

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

### Create Index

Create an index for better query performance:

```java
public class CreateUsersNameIndex extends Migration {
    @Override
    public void up() {
        createIndex("users", "name");
    }
}
```

### Drop Table

Remove a table:

```java
public class DropOldLogsTable extends Migration {
    @Override
    public void up() {
        drop("old_logs");
    }
}
```

### Rename Table

```java
public class RenamePlayersTable extends Migration {
    @Override
    public void up() {
        rename("players", "users");
    }
}
```

## Column Types

Sarah supports various column types:

| Method | SQL Type | Example |
|--------|----------|---------|
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

## Column Modifiers

### Primary Key

```java
table.uuid("uuid").primary();
```

### Auto Increment

```java
table.autoIncrement("id");        // INT
table.autoIncrementBigInt("id");  // BIGINT
```

### Nullable

```java
table.string("nickname", 32).nullable();
```

### Default Value

```java
table.bigInt("balance").defaultValue(0);
table.bool("active").defaultValue(true);
table.string("status", 16).defaultValue("pending");
```

### Default Current Timestamp

```java
table.timestamp("created_at").defaultCurrentTimestamp();
```

### Unique

```java
table.string("email", 255).unique();
```

### Foreign Key

```java
table.uuid("user_id").foreignKey("users");
// or with custom column and cascade
table.uuid("user_id").foreignKey("users", "uuid", true);
```

## Timestamps Helper

Add `created_at` and `updated_at` columns:

```java
create("posts", table -> {
    table.autoIncrementBigInt("id");
    table.string("title", 255);
    table.timestamps();  // Adds created_at and updated_at
});
```

Or individually:

```java
table.createdAt();  // Just created_at
table.updatedAt();  // Just updated_at
```

## Running Migrations

### Basic Execution

```java
// Set custom table name (optional, defaults to "migrations")
MigrationManager.setMigrationTableName("my_plugin_migrations");

// Register migrations in order
MigrationManager.registerMigration(new CreateUsersTable());
MigrationManager.registerMigration(new CreatePostsTable());
MigrationManager.registerMigration(new AddEmailToUsers());

// Execute all pending migrations
MigrationManager.execute(databaseConnection, logger);
```

### Complete Example

```java
public class MyPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        // Setup database connection
        DatabaseConnection connection = setupConnection();

        // Configure migration table name
        MigrationManager.setMigrationTableName("myplugin_migrations");

        // Register all migrations
        registerMigrations();

        // Run migrations
        try {
            MigrationManager.execute(connection, getLogger());
            getLogger().info("Migrations completed successfully!");
        } catch (SQLException e) {
            getLogger().severe("Migration failed: " + e.getMessage());
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

## Migration Manager Methods

| Method | Description |
|--------|-------------|
| `setMigrationTableName(name)` | Set custom migrations table name |
| `getMigrationTableName()` | Get current migrations table name |
| `registerMigration(migration)` | Register a migration to be executed |
| `getMigrations()` | Get list of registered migrations |
| `execute(connection, logger)` | Execute all pending migrations |
| `setDatabaseConfiguration(config)` | Set the database configuration |
| `getDatabaseConfiguration()` | Get the database configuration |

## Best Practices

### 1. Name Migrations Descriptively

```java
// Good
public class CreateUsersTable extends Migration { }
public class AddEmailColumnToUsers extends Migration { }
public class CreateUserPostsIndex extends Migration { }

// Bad
public class Migration1 extends Migration { }
public class UpdateTable extends Migration { }
```

### 2. Keep Migrations Small

Each migration should do one thing:

```java
// Good - separate migrations
public class CreateUsersTable extends Migration { ... }
public class CreatePostsTable extends Migration { ... }

// Bad - too much in one migration
public class CreateAllTables extends Migration { ... }
```

### 3. Never Modify Existing Migrations

Once a migration has been executed in production, create a new migration for changes:

```java
// Don't modify CreateUsersTable after it's deployed
// Instead, create a new migration:
public class AddAvatarToUsers extends Migration {
    @Override
    public void up() {
        alter("users", table -> {
            table.string("avatar_url", 255).nullable();
        });
    }
}
```

### 4. Use Timestamps

Always include timestamps for auditing:

```java
create("important_data", table -> {
    table.autoIncrementBigInt("id");
    table.string("data", 255);
    table.timestamps();  // Always include this
});
```

## Real-World Example

Here's a complete migration setup for a homes plugin:

```java
// Migration 1: Create players table
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

// Migration 2: Create homes table
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

// Migration 3: Add icon column
public class AddIconToHomes extends Migration {
    @Override
    public void up() {
        alter("homes", table -> {
            table.string("icon", 64).defaultValue("GRASS_BLOCK");
        });
    }
}
```

## Next Steps

- [Learn about queries](queries) - Execute SELECT, INSERT, UPDATE, DELETE
- [Schema Builder reference](schema-builder) - All available methods
