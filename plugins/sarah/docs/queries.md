# Queries

Sarah provides a fluent API for executing database queries through the `RequestHelper` class. This guide covers all query operations with practical examples.

## RequestHelper

The `RequestHelper` is your main interface for database operations:

```java
RequestHelper requestHelper = new RequestHelper(databaseConnection, logger);
```

### Read Error Handling

By default, failed `select`/`selectAll` queries log the error and return an empty list, `count` returns `0`, aggregates return `null`, and `exists` returns `false`. Enable strict reads to distinguish a failed query from an empty result:

```java
requestHelper.setStrictReads(true);
boolean strictReads = requestHelper.isStrictReads();
```

With strict reads enabled, these failures throw `DatabaseException`. The transaction helper inherits this setting. Writes and raw SQL queries throw on SQL errors regardless of this setting.

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

### Select with Pagination

Use `limit` and `offset` to page results in the database. Add a stable sort so page boundaries remain predictable:

```java
List<PlayerDTO> page = requestHelper.select("players", PlayerDTO.class, table -> {
    table.orderBy("uuid");
    table.limit(20);
    table.offset(40);
});
```

An offset without a limit is supported on all four engines.

### Check Whether a Record Exists

```java
boolean exists = requestHelper.exists("players", table -> {
    table.where("uuid", playerUuid);
});
```

`exists` checks for a match without loading the matching records.

### Aggregate Values

```java
Number total = requestHelper.sum("players", "balance", table -> {
    table.where("is_banned", false);
});
Number highest = requestHelper.max("players", "level", table -> {});
Number lowest = requestHelper.min("players", "level", table -> {});
Number average = requestHelper.avg("players", "play_time", table -> {});
```

These methods return a `Number` using the numeric type supplied by the driver, or `null` when no value is available. `count` returns a `long`. All accept the same WHERE conditions as a select.

### Group Results with HAVING

Use `groupBy` to group a select and `having` to filter the resulting groups:

```java
List<Map<String, Object>> groups = requestHelper.select("sales", table -> {
    table.addSelect("seller");
    table.groupBy("seller");
    table.having("SUM(`amount`)", ">=", 1000);
    table.having("COUNT(*)", ">", 1);
});
```

The HAVING value is bound as a parameter. Its expression is developer-provided SQL. Multiple HAVING clauses are joined with `AND`; use `where` to filter individual rows before grouping.

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
    logger.warn("Failed to create player!");
});
```

### Batch Insert

All rows in a batch must use the same table and column order.

```java
List<PlayerDTO> players = Arrays.asList(
    new PlayerDTO(uuid1, "Steve", 0),
    new PlayerDTO(uuid2, "Alex", 0),
    new PlayerDTO(uuid3, "Notch", 0)
);

requestHelper.insertMultiple("players", PlayerDTO.class, players);
```

### Get the Generated Key

Use `insertAndGetKey` when the caller needs the generated ID directly:

```java
int generatedId = requestHelper.insertAndGetKey("homes", schema -> {
    schema.uuid("player_uuid", playerUuid);
    schema.string("name", "MyHome");
});
```

The DTO overload is `insertAndGetKey(tableName, DTO.class, data)`. The result is `0` when a key is unavailable. The existing `insert` methods keep their `void` return type.

### Get a Batch Insert Result

```java
int result = requestHelper.insertMultipleAndGetKey("players", PlayerDTO.class, players);
```

This returns the first generated key when available, otherwise the inserted row count. It does not return one key per row. The overload `insertMultipleAndGetKey(List<Schema>)` accepts schemas built with `SchemaBuilder.insert`.

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

All schemas in a batch must use the same table, columns and condition structure; only parameter values should differ.

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

### Count Updated Rows

```java
int changed = requestHelper.updateAndCount("players", schema -> {
    schema.bigInt("play_time", newPlayTime);
    schema.where("uuid", playerUuid);
});
```

Use the returned count to check whether a conditional update matched a row. `update` itself still returns `void`.

### Increment a Column

`increment` adds to the stored value atomically, without reading and replacing it in separate requests. Use a negative amount to subtract:

```java
requestHelper.update("players", schema -> {
    schema.increment("coins", 10);
    schema.increment("lives", -1);
    schema.where("uuid", playerUuid);
});
```

### Assign an SQL Expression

Use `expression` for a calculated value. Bind dynamic values through placeholders:

```java
requestHelper.update("players", schema -> {
    schema.expression("version", "`version` + ?", 1);
    schema.expression("updated_at", "CURRENT_TIMESTAMP");
    schema.where("uuid", playerUuid);
});
```

Only use SQL expressions controlled by your application. This also lets PostgreSQL applications update `updated_at` explicitly.

### Count Batch Updates

```java
int changed = requestHelper.updateMultipleAndCount(updates);
```

`updates` is the `List<Schema>` from the batch example above. A DTO overload is available: `updateMultipleAndCount(tableName, DTO.class, dataList)`. SQLite executes the updates sequentially. On MariaDB, a driver success-without-count result contributes one row per statement.

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

<CalloutContainer type="warning">

<CalloutTitle>SQLite and PostgreSQL Requirement</CalloutTitle>

<CalloutDescription>
For SQLite and PostgreSQL, declare the conflict target with `.primary()` on non-auto-increment key columns, or `.unique()` when there is no such primary key. The target must match a constraint in the database:
```java
schema.uuid("uuid", playerUuid).primary();  // Required conflict target for SQLite/PostgreSQL
```
</CalloutDescription>

</CalloutContainer>

### Upsert from DTO

```java
PlayerDTO player = new PlayerDTO(uuid, "Steve", 1000);
requestHelper.upsert("players", PlayerDTO.class, player);
```

### Batch Upsert

Use the same table, column order and conflict-key structure for every row in a batch.

```java
List<PlayerDTO> players = getPlayersToSave();
requestHelper.upsertMultiple("players", PlayerDTO.class, players);
```

### Increment on Conflict

```java
requestHelper.upsert("player_stats", schema -> {
    schema.uuid("uuid", playerUuid).primary();
    schema.increment("kills", 1);
});
```

A new row receives `kills = 1`; an existing row adds `1` to its stored value in the same SQL statement.

### Preserve Insert-Only Values

```java
requestHelper.upsert("players", schema -> {
    schema.uuid("uuid", playerUuid).primary();
    schema.date("created_at", new java.util.Date()).insertOnly();
    schema.string("name", playerName);
});
```

`insertOnly()` applies to the last declared column. It writes that value on insertion and preserves it on conflict. If every column is insert-only, a conflict does nothing.

### Apply an Expression on Conflict

```java
requestHelper.upsert("players", schema -> {
    schema.uuid("uuid", playerUuid).primary();
    schema.string("name", playerName);
    schema.expression("updated_at", "CURRENT_TIMESTAMP");
});
```

In an upsert, an `expression` applies only to an existing row. A new row uses the database default for this column, so define a suitable default or allow `NULL` in its table schema.

### Count Upsert Results

```java
int changed = requestHelper.upsertAndCount("players", schema -> {
    schema.uuid("uuid", playerUuid).primary();
    schema.string("name", playerName);
});
int batchChanged = requestHelper.upsertMultipleAndCount("players", PlayerDTO.class, players);
```

The single-row method also accepts a DTO. The batch method also accepts `List<Schema>`. Counts follow the driver: MySQL reports `1` for an inserted row and can report `2` for an updated row.

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

### Count Deleted Rows

```java
int deleted = requestHelper.deleteAndCount("sessions", schema -> {
    schema.where("is_expired", true);
});
```

`deleteAndCount` returns the affected row count; `delete` keeps its `void` return type.

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

An empty IN list matches no rows. Numeric varargs preserve their type on PostgreSQL; string lists are interpreted according to the compared column type.

### Combining Conditions

Consecutive `where` conditions are combined with `AND`:

```java
requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("is_banned", false);
    table.where("play_time", ">", 100);
    table.whereNotNull("last_login");
    table.whereIn("rank", "vip", "mvp", "admin");
});
// WHERE is_banned = 0 AND play_time > 100 AND last_login IS NOT NULL AND rank IN ('vip', 'mvp', 'admin')
```

### NOT IN Clause

```java
schema.whereNotIn("status", "blocked", "deleted");
schema.whereNotIn("p", "name", Arrays.asList("Steve", "Alex"));
```

The second form prefixes the column with the table name or alias (`p.name`). An empty NOT IN list matches every row.

### BETWEEN and NOT BETWEEN

```java
schema.whereBetween("level", 10, 20);
schema.whereNotBetween("score", 0, 100);
```

Both bounds are inclusive. Values are bound with their types, including dates and numbers.

### LIKE and NOT LIKE

```java
schema.whereLike("name", "Alex%");
schema.whereNotLike("email", "%@example.com");
```

Use `%` for any sequence of characters and `_` for one character. Case sensitivity follows the engine and column collation.

### OR Conditions with orWhere

Use `orWhere` to join a condition to the previous one with `OR`:

```java
requestHelper.select("players", PlayerDTO.class, table -> {
    table.where("rank", "admin");
    table.orWhere("rank", "moderator");
    table.orWhere("level", ">=", 50);
});
```

For a joined table, use `schema.orWhere("p", "level", ">=", 50)`. The operator overload accepts the same comparison operators as `where`.

### OR with NULL, IN and BETWEEN

```java
schema.where("rank", "admin");
schema.orWhereNull("rank");
schema.orWhereNotNull("verified_at");
schema.orWhereIn("status", "active", "pending");
schema.orWhereBetween("level", 10, 20);
```

Each method joins its condition with `OR`. `orWhereIn` with an empty list adds a false condition.

### Grouped Conditions

SQL evaluates `AND` before `OR`. Use `where(group -> ...)` and `orWhere(group -> ...)` to make the grouping explicit:

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

A group without conditions adds nothing. These conditions are also available for counts, aggregates, updates and deletes. Use parameters for values and application-controlled column names/operators; invalid fragments are rejected with `IllegalArgumentException`.

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

### Mapped and Transient Fields

Static, synthetic and `@TransientField` fields are excluded when reading and writing DTOs. Define a constructor with one parameter per mapped field, in declaration order:

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

For map results, selected aliases are available as keys as well as the original column names.

## Raw SQL Queries

### Execute a Statement

```java
int deleted = requestHelper.execute(
    "DELETE FROM %prefix%logs WHERE created_at < ?", cutoff
);
```

`execute` returns the affected row count.

### Map Query Results

```java
List<String> names = requestHelper.query(
    "SELECT `name` FROM %prefix%players WHERE `level` >= ?",
    resultSet -> resultSet.getString("name"),
    10
);
```

The `RowMapper` receives the current row and must return its mapped value. Both methods replace `%prefix%`, adapt backtick quoting to the engine, and bind `?` parameters. SQL failures throw `DatabaseException`. `java.util.Date` is bound as a `Timestamp`, while UUID and enum parameters are converted to strings. Do not concatenate user input into SQL.

## Transactions

### Commit or Roll Back Several Operations

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

The callback commits when it returns and rolls back when it throws. Its return value becomes the result of `inTransaction`. Make every participating call through `tx`: calls through the original helper use a separate connection. The connection is released after the transaction.

## Asynchronous Queries

### Create an Async Helper

Wrap your existing helper to run operations off the calling thread:

```java
AsyncRequestHelper async = new AsyncRequestHelper(requestHelper);
// Or choose the thread count:
AsyncRequestHelper customPool = new AsyncRequestHelper(requestHelper, 2);
// Or use an executor owned by your application:
AsyncRequestHelper external = new AsyncRequestHelper(requestHelper, executor);
```

The default helper owns a pool of four daemon threads. Choose one of these constructors for your application.

### Read and Write with Futures

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

Every operation returns a `CompletableFuture`, including counts, aggregates, existence checks, batches, raw SQL and transactions. Async `insert` completes with the generated key; `update`, `upsert` and `delete` complete with the row count. Batch methods follow their synchronous result variants. An operation that throws completes the future exceptionally; reads follow the wrapped helper’s strict-read setting.

### Run an Async Transaction

```java
CompletableFuture<Integer> result = async.inTransaction(tx ->
    tx.updateAndCount("players", table -> {
        table.increment("coins", 10);
        table.where("uuid", playerUuid);
    })
);
```

Use the synchronous `tx` inside the callback so all operations remain on the transaction connection.

### Stop the Async Helper

```java
async.shutdown();
```

`shutdown()` stops only the pool owned by that helper. It leaves an external executor running. Future callbacks normally run on executor threads; use your server scheduler to return to its main thread before accessing thread-bound APIs.

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
            table.limit(limit);
        });
    }
}
```

### Home System

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

## Next Steps

- [Schema Builder reference](schema-builder) - Complete API documentation
- [Migrations](migrations) - Manage database schema
