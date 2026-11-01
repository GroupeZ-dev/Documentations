# Database Connections

Sarah supports multiple database systems through a unified interface. This guide covers how to configure and manage database connections.

The examples use Sarah's `Logger`. To use your plugin's Java logger:

```java
Logger logger = JULogger.from(getLogger());
```

## Supported Databases

| Database | Connection Class | Configuration Method |
|----------|-----------------|---------------------|
| MySQL | `MySqlConnection` | `DatabaseConfiguration.create()` |
| MariaDB | `MariaDbConnection` | `DatabaseConfiguration.createMariaDb()` |
| PostgreSQL | `PostgreSqlConnection` | `DatabaseConfiguration.createPostgreSql()` |
| SQLite | `SqliteConnection` | `DatabaseConfiguration.sqlite()` |

## MySQL Connection

### Basic Setup

```java
DatabaseConfiguration config = DatabaseConfiguration.create(
    "username",     // Database user
    "password",     // Database password
    3306,           // Port
    "localhost",    // Host
    "my_database"   // Database name
);

DatabaseConnection connection = new MySqlConnection(config, logger);
connection.connect();
```

### With Debug Mode

Enable SQL query logging for debugging:

```java
DatabaseConfiguration config = DatabaseConfiguration.create(
    "username",
    "password",
    3306,
    "localhost",
    "my_database",
    true  // Enable debug mode
);
```

## MariaDB Connection

MariaDB configuration is similar to MySQL:

```java
DatabaseConfiguration config = DatabaseConfiguration.createMariaDb(
    "username",
    "password",
    3306,
    "localhost",
    "my_database"
);

DatabaseConnection connection = new MariaDbConnection(config, logger);
connection.connect();
```

### Without Port (Default 3306)

```java
DatabaseConfiguration config = DatabaseConfiguration.createMariaDb(
    "username",
    "password",
    "localhost",
    "my_database"
);
```

## PostgreSQL Connection

Add the `org.postgresql:postgresql` JDBC driver to your application, as described in the [installation guide](installation).

### Basic Setup

```java
DatabaseConfiguration config = DatabaseConfiguration.createPostgreSql(
    "username",     // Database user
    "password",     // Database password
    5432,           // Port
    "localhost",    // Host
    "my_database",  // Database name
    false           // Debug mode
);

DatabaseConnection connection = new PostgreSqlConnection(config, logger);
connection.connect();
```

This configuration uses `DatabaseType.POSTGRESQL`. To use a pool, pass the same configuration to `HikariDatabaseConnection`.

### Column Names

Sarah converts identifier backticks to double quotes before sending a statement to PostgreSQL. Quoted identifiers are case-sensitive: use the same case when creating columns and querying them. See [column types](schema-builder#column-types) for PostgreSQL equivalents and timestamp behavior.

## SQLite Connection

SQLite is perfect for development or small projects:

```java
// Create configuration
DatabaseConfiguration config = DatabaseConfiguration.sqlite(true); // debug mode

// Create connection with folder path
// The database file will be created as "database.db" in this folder
DatabaseConnection connection = new SqliteConnection(config, myPluginFolder, logger);
connection.connect();
```

### Journal Mode and Lock Timeout

Set the options before connecting:

```java
SqliteConnection connection = new SqliteConnection(config, myPluginFolder, logger);
connection.setJournalMode("WAL");
connection.setBusyTimeout(5000);
connection.connect();
```

`setJournalMode` applies the journal mode to each connection. `WAL` lets readers work while a write is in progress. `setBusyTimeout` sets how many milliseconds to wait for a lock before failing with `SQLITE_BUSY`. `null` keeps the driver defaults. Use `getJournalMode()` and `getBusyTimeout()` to read these settings.

### Complete SQLite Example

```java
public class MyPlugin extends JavaPlugin {

    private DatabaseConnection connection;

    @Override
    public void onEnable() {
        DatabaseConfiguration config = DatabaseConfiguration.sqlite(false);
        this.connection = new SqliteConnection(config, getDataFolder(), JULogger.from(getLogger()));

        try {
            connection.connect();
            getLogger().info("Connected to SQLite database!");
        } catch (DatabaseException e) {
            getLogger().severe("Failed to connect to SQLite!");
            e.printStackTrace();
        }
    }
}
```

## DatabaseConfiguration Methods

### Factory Methods

| Method | Description |
|--------|-------------|
| `create(user, password, port, host, database)` | Create MySQL config |
| `create(user, password, port, host, database, debug)` | Create MySQL config with debug |
| `createMariaDb(user, password, port, host, database)` | Create MariaDB config |
| `createMariaDb(user, password, port, host, database, debug)` | Create MariaDB config with debug |
| `createPostgreSql(user, password, port, host, database, debug)` | Create PostgreSQL config |
| `sqlite(debug)` | Create SQLite config |

### Instance Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getUser()` | `String` | Get database username |
| `getPassword()` | `String` | Get database password |
| `getPort()` | `int` | Get database port |
| `getHost()` | `String` | Get database host |
| `getDatabase()` | `String` | Get database name |
| `isDebug()` | `boolean` | Check if debug mode is enabled |
| `getDatabaseType()` | `DatabaseType` | Get the database type enum |
| `replacePrefix(tableName)` | `String` | Replace table prefix |
| `getMaximumPoolSize()` | `Integer` | Get the pool size, `null` for the default |
| `getMinimumIdle()` | `Integer` | Get the minimum idle connections, `null` for the default |
| `getMaxLifetime()` | `Long` | Get the connection lifetime in milliseconds, `null` for the default (1.26+) |
| `getTablePrefix()` | `String` | Get the table prefix |
| `getDialect()` | `Dialect` | Get the dialect for the configured engine |
| `prepare(sql)` | `String` | Replace the prefix and adapt SQL quoting for the engine |
| `getConnectionTimeout()` | `Long` | Get the pooled connection timeout in milliseconds, `null` for the default |
| `getLeakDetectionThreshold()` | `Long` | Get the leak detection threshold in milliseconds, `null` for the default |
| `getProperties()` | `Map<String, String>` | Get driver properties set with `withProperty` |

### Driver Properties

`withProperty(key, value)` adds or replaces a property for plain and pooled connections. The method returns a new configuration: keep its result.

```java
DatabaseConfiguration config = DatabaseConfiguration.createPostgreSql(
    "username", "password", 5432, "localhost", "my_database", false)
    .withProperty("sslmode", "require");
```

For MySQL and MariaDB, `withProperty("useSSL", "true")` enables SSL and `withProperty("allowMultiQueries", "false")` disables multiple statements, which Sarah enables by default.

### Dialects and Prefixes

`getDialect()` exposes `MySqlDialect`, `MariaDbDialect`, `SqliteDialect` or `PostgreSqlDialect` depending on the configuration. Sarah's queries use this dialect automatically.

```java
DatabaseConfiguration config = new DatabaseConfiguration(
    "game_", "username", "password", 5432, "localhost", "my_database", false,
    DatabaseType.POSTGRESQL);
String sql = config.prepare("SELECT `name` FROM %prefix%players");
// SELECT "name" FROM game_players
```

`replacePrefix` only replaces `%prefix%`. `prepare` also adapts identifier backticks to double quotes for PostgreSQL, leaving SQL strings in single quotes unchanged.

## Connection Pool (HikariCP)

`HikariDatabaseConnection` opens a HikariCP pool for MySQL, MariaDB and PostgreSQL. Its settings are tuned on the `DatabaseConfiguration`, each `with...` method returns a new configuration:

```java
DatabaseConfiguration config = DatabaseConfiguration.create("username", "password", 3306, "localhost", "my_database", false, DatabaseType.MYSQL)
        .withPoolSettings(10, 2)                         // maximum pool size, minimum idle
        .withMaxLifetime(TimeUnit.MINUTES.toMillis(10))
        .withTimeouts(10000L, 0L);                       // wait timeout, disable leak detection

DatabaseConnection connection = new HikariDatabaseConnection(config, logger);
```

| Method | Description | Default (`null`) |
|--------|-------------|------------------|
| `withPoolSettings(maximumPoolSize, minimumIdle)` | Pool size and idle connections kept open | `cores * 2 + 1`, and `min(pool size, 10)` |
| `withMaxLifetime(maxLifetime)` | Lifetime of a connection in milliseconds before it is retired. `0` keeps connections until the pool closes. HikariCP replaces values below 30 seconds with its default | 30 minutes |
| `withTimeouts(connectionTimeout, leakDetectionThreshold)` | Connection wait timeout and leak detection threshold, in milliseconds. `0` disables leak detection | 10 seconds for each setting |

SQLite cannot use this pool: use `SqliteConnection`. A long transaction can exceed the leak detection threshold without being a leak; tune the threshold for your usage.

Set the max lifetime a few minutes below the database `wait_timeout`, or below the idle timeout of a proxy in front of it, so the pool never hands out a connection the server already closed.

## Connection Lifecycle

### Connecting

```java
try {
    connection.connect();
} catch (DatabaseException e) {
    // Handle connection failure
    e.printStackTrace();
}
```

### Disconnecting

Always disconnect when your plugin disables:

```java
@Override
public void onDisable() {
    if (connection != null) {
        connection.disconnect();
    }
}
```

### Getting Raw Connection

If you need the underlying JDBC connection:

```java
try (Connection jdbcConnection = connection.getConnection()) {
    // Use the JDBC connection here
}
```

Each `getConnection()` call opens a dedicated connection or borrows one from the pool. The caller must close it; with HikariCP, `close()` returns it to the pool. `RequestHelper` handles this cleanup for its own queries.

### Logging

`Logger` exposes `info`, `warn` and `error`. For a custom logger implementing only `info`, the other methods delegate to `info` by default. `JULogger.from(getLogger())` uses Java's INFO, WARNING and SEVERE levels.

Connection failures are logged with `error`. `DatabaseConfiguration.toString()` masks the password.

## Best Practices

### 1. Always Handle Exceptions

```java
try {
    connection.connect();
} catch (DatabaseException e) {
    logger.error("Database connection failed: " + e.getMessage());
    // Disable plugin or use fallback
}
```

### 2. Use SQLite for Development

```java
boolean isDevelopment = true; // or from config

if (isDevelopment) {
    connection = new SqliteConnection(DatabaseConfiguration.sqlite(true), folder, logger);
} else {
    connection = new MySqlConnection(productionConfig, logger);
}
```

### 3. Close Connections Properly

```java
@Override
public void onDisable() {
    // Save pending data first
    saveAllData();

    // Then disconnect
    if (connection != null) {
        connection.disconnect();
    }
}
```

## Next Steps

- [Learn about migrations](migrations)
- [Execute queries](queries)
