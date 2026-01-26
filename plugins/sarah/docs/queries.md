# Queries

Sarah provides a fluent API for executing database queries through the `RequestHelper` class. This guide covers all query operations with practical examples.

## RequestHelper

The `RequestHelper` is your main interface for database operations:

```java
RequestHelper requestHelper = new RequestHelper(databaseConnection, logger);
```

## SELECT Queries

### Select All Records

```java
// Select all players
List<PlayerDTO> players = requestHelper.selectAll("players", PlayerDTO.class);
```

### Select with Conditions

```java
// Select players with more than 1000 play time
List<PlayerDTO> activePlayers = requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("play_time", ">", 1000);
});
```

### Select with Multiple Conditions

```java
List<PlayerDTO> results = requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("play_time", ">", 1000);
    table.where("is_banned", false);
    table.whereNotNull("last_login");
});
```

### Select with Ordering

```java
List<PlayerDTO> topPlayers = requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("is_banned", false);
    table.orderByDesc("play_time");
});
```

### Select with IN Clause

```java
List<String> names = Arrays.asList("Steve", "Alex", "Notch");
List<PlayerDTO> players = requestHelper.select("players", PlayerDTO.class, table -> {
    table.whereIn("name", names);
});
```

### Select as Raw Maps

When you don't have a DTO class:

```java
List<Map<String, Object>> results = requestHelper.select("players", table -> {
    table.where("is_online", true);
});

for (Map<String, Object> row : results) {
    String name = (String) row.get("name");
    long playTime = (long) row.get("play_time");
}
```

### Count Records

```java
long totalPlayers = requestHelper.count("players", table -> {});

long activePlayers = requestHelper.count("players", table -> {
    table.where("play_time", ">", 1000);
});
```

## INSERT Queries

### Basic Insert

```java
requestHelper.insert("players", schema -> {
    schema.uuid("uuid", playerUuid);
    schema.string("name", playerName);
    schema.bigInt("play_time", 0);
});
```

### Insert from DTO

```java
// Your DTO class
public record PlayerDTO(UUID uuid, String name, long playTime) {}

// Insert
PlayerDTO player = new PlayerDTO(uuid, "Steve", 0);
requestHelper.insert("players", PlayerDTO.class, player);
```

### Insert with Result Callback

Get the auto-generated ID:

```java
requestHelper.insert("homes", schema -> {
    schema.uuid("player_uuid", playerUuid);
    schema.string("name", "MyHome");
    schema.string("world", "world");
    schema.decimal("x", x);
    schema.decimal("y", y);
    schema.decimal("z", z);
}, generatedId -> {
    System.out.println("Created home with ID: " + generatedId);
});
```

### Insert with Error Handling

```java
requestHelper.insert("players", schema -> {
    schema.uuid("uuid", playerUuid);
    schema.string("name", playerName);
}, generatedId -> {
    logger.info("Player created with ID: " + generatedId);
}, () -> {
    logger.warning("Failed to create player!");
});
```

### Batch Insert

```java
List<PlayerDTO> players = Arrays.asList(
    new PlayerDTO(uuid1, "Steve", 0),
    new PlayerDTO(uuid2, "Alex", 0),
    new PlayerDTO(uuid3, "Notch", 0)
);

requestHelper.insertMultiple("players", PlayerDTO.class, players);
```

## UPDATE Queries

### Basic Update

```java
requestHelper.update("players", schema -> {
    schema.bigInt("play_time", newPlayTime);
    schema.where("uuid", playerUuid);
});
```

### Update Multiple Columns

```java
requestHelper.update("players", schema -> {
    schema.string("name", newName);
    schema.bigInt("play_time", newPlayTime);
    schema.bool("is_online", true);
    schema.where("uuid", playerUuid);
});
```

### Batch Update

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

## UPSERT Queries (Insert or Update)

Upsert inserts a new row or updates if the primary key already exists.

### Basic Upsert

```java
requestHelper.upsert("players", schema -> {
    schema.uuid("uuid", playerUuid).primary();
    schema.string("name", playerName);
    schema.bigInt("play_time", playTime);
});
```

:::warning SQLite Requirement
For SQLite, you must mark the primary key column with `.primary()`:
```java
schema.uuid("uuid", playerUuid).primary();  // Required for SQLite!
```
:::

### Upsert from DTO

```java
PlayerDTO player = new PlayerDTO(uuid, "Steve", 1000);
requestHelper.upsert("players", PlayerDTO.class, player);
```

### Batch Upsert

```java
List<PlayerDTO> players = getPlayersToSave();
requestHelper.upsertMultiple("players", PlayerDTO.class, players);
```

## DELETE Queries

### Delete with Condition

```java
requestHelper.delete("players", schema -> {
    schema.where("uuid", playerUuid);
});
```

### Delete with Multiple Conditions

```java
requestHelper.delete("sessions", schema -> {
    schema.where("player_uuid", playerUuid);
    schema.where("is_expired", true);
});
```

### Delete Old Records

```java
requestHelper.delete("logs", schema -> {
    schema.where("created_at", "<", thirtyDaysAgo);
});
```

## WHERE Conditions

### Equality

```java
schema.where("name", "Steve");
schema.where("uuid", playerUuid);  // UUID support
```

### Comparison Operators

```java
schema.where("play_time", ">", 1000);
schema.where("balance", ">=", 100.0);
schema.where("level", "<", 10);
schema.where("score", "<=", 50);
schema.where("name", "!=", "Admin");
```

### NULL Checks

```java
schema.whereNull("deleted_at");
schema.whereNotNull("verified_at");
```

### IN Clause

```java
schema.whereIn("status", "active", "pending", "review");
schema.whereIn("name", Arrays.asList("Steve", "Alex"));
```

### Combining Conditions

All conditions are combined with AND:

```java
requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("is_banned", false);
    table.where("play_time", ">", 100);
    table.whereNotNull("last_login");
    table.whereIn("rank", "vip", "mvp", "admin");
});
// WHERE is_banned = 0 AND play_time > 100 AND last_login IS NOT NULL AND rank IN ('vip', 'mvp', 'admin')
```

## Data Transfer Objects (DTOs)

Sarah automatically maps query results to Java objects.

### Using Records (Java 14+)

```java
public record PlayerDTO(
    UUID uuid,
    String name,
    long playTime,
    boolean isBanned
) {}

// Sarah will automatically map columns to constructor parameters
List<PlayerDTO> players = requestHelper.selectAll("players", PlayerDTO.class);
```

### Using Classes with @Column Annotation

For older Java versions or custom column names:

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

    // Constructor matching column order
    public PlayerDTO(UUID uuid, String name, long playTime, boolean banned) {
        this.uuid = uuid;
        this.name = name;
        this.playTime = playTime;
        this.banned = banned;
    }

    // Getters...
}
```

### Column Name Mapping

Sarah converts between Java camelCase and SQL snake_case:

| Java Field | Database Column |
|------------|-----------------|
| `playTime` | `play_time` |
| `isBanned` | `is_banned` |
| `lastLoginAt` | `last_login_at` |
| `uuid` | `uuid` |

## Complete Examples

### Player Statistics System

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
            // Note: LIMIT is applied after query for now
        }).stream().limit(limit).toList();
    }
}
```

### Home System

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

## Next Steps

- [Schema Builder reference](schema-builder) - Complete API documentation
- [Migrations](migrations) - Manage database schema
