# Database Connections

Sarah supports multiple database systems through a unified interface. This guide covers how to configure and manage database connections.

## Supported Databases

| Database | Connection Class | Configuration Method |
|----------|-----------------|---------------------|
| MySQL | `MySqlConnection` | `DatabaseConfiguration.create()` |
| MariaDB | `MariaDbConnection` | `DatabaseConfiguration.createMariaDb()` |
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

DatabaseConnection connection = new MySqlConnection(config);
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

DatabaseConnection connection = new MariaDbConnection(config);
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

## SQLite Connection

SQLite is perfect for development or small projects:

```java
// Create configuration
DatabaseConfiguration config = DatabaseConfiguration.sqlite(true); // debug mode

// Create connection with folder path
// The database file will be created as "database.db" in this folder
DatabaseConnection connection = new SqliteConnection(config, myPluginFolder);
connection.connect();
```

### Complete SQLite Example

```java
public class MyPlugin extends JavaPlugin {

    private DatabaseConnection connection;

    @Override
    public void onEnable() {
        DatabaseConfiguration config = DatabaseConfiguration.sqlite(false);
        this.connection = new SqliteConnection(config, getDataFolder());

        try {
            connection.connect();
            getLogger().info("Connected to SQLite database!");
        } catch (SQLException e) {
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

## Connection Lifecycle

### Connecting

```java
try {
    connection.connect();
} catch (SQLException e) {
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
Connection jdbcConnection = connection.getConnection();
```

## Best Practices

### 1. Always Handle Exceptions

```java
try {
    connection.connect();
} catch (SQLException e) {
    logger.severe("Database connection failed: " + e.getMessage());
    // Disable plugin or use fallback
}
```

### 2. Use SQLite for Development

```java
boolean isDevelopment = true; // or from config

if (isDevelopment) {
    connection = new SqliteConnection(DatabaseConfiguration.sqlite(true), folder);
} else {
    connection = new MySqlConnection(productionConfig);
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
