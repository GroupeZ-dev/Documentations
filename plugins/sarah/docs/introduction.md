# Introduction

Sarah is a powerful Java library designed to simplify database management with an intuitive and elegant API. Whether you're building a Minecraft plugin or any Java application, Sarah provides a clean abstraction over raw SQL while maintaining full control over your database operations.

- **GitHub**: [https://github.com/GroupeZ-dev/Sarah](https://github.com/GroupeZ-dev/Sarah)
- **Maven Repository**: [https://repo.groupez.dev/#/releases/fr/maxlego08/sarah/sarah](https://repo.groupez.dev/#/releases/fr/maxlego08/sarah/sarah)

## What is Sarah?

Sarah is a database management library that provides:

- **Simple Database Connections** - Support for MySQL, MariaDB, and SQLite with minimal configuration
- **Migration System** - Automatic schema versioning and migration tracking
- **Query Builder** - Fluent API for building type-safe SQL queries
- **Object Mapping** - Automatic mapping between database rows and Java objects (DTOs)
- **Connection Pooling** - Built-in HikariCP support for optimal performance

## Why Use Sarah?

### Before Sarah (Raw JDBC)

```java
try (Connection conn = dataSource.getConnection();
     PreparedStatement stmt = conn.prepareStatement(
         "INSERT INTO users (uuid, name, play_time) VALUES (?, ?, ?) " +
         "ON DUPLICATE KEY UPDATE name = ?, play_time = ?")) {
    stmt.setString(1, uuid.toString());
    stmt.setString(2, name);
    stmt.setLong(3, playTime);
    stmt.setString(4, name);
    stmt.setLong(5, playTime);
    stmt.executeUpdate();
} catch (SQLException e) {
    e.printStackTrace();
}
```

### With Sarah

```java
requestHelper.upsert("users", schema -> {
    schema.uuid("uuid", uuid).primary();
    schema.string("name", name);
    schema.bigInt("play_time", playTime);
});
```

## Key Features

### Multi-Database Support

Sarah supports the most popular database systems:

| Database | Class | Use Case |
|----------|-------|----------|
| MySQL | `MySqlConnection` | Production servers |
| MariaDB | `MariaDbConnection` | Production servers |
| SQLite | `SqliteConnection` | Development, small projects |

### Migration System

Keep your database schema versioned and organized:

```java
public class CreateUsersTable extends Migration {
    @Override
    public void up() {
        create("users", table -> {
            table.uuid("uuid").primary();
            table.string("name", 64);
            table.bigInt("play_time").defaultValue(0);
            table.timestamps();
        });
    }
}
```

### Fluent Query Builder

Write readable and maintainable database queries:

```java
// Select with conditions
List<User> users = requestHelper.select("users", User.class, table -> {
    table.where("play_time", ">", 1000);
    table.orderByDesc("play_time");
});

// Insert with automatic mapping
requestHelper.insert("users", User.class, newUser);

// Delete with conditions
requestHelper.delete("users", table -> {
    table.where("uuid", playerUuid);
});
```

## Quick Start

### 1. Add Dependency

**Gradle:**
```groovy
repositories {
    maven { url 'https://repo.groupez.dev/releases' }
}

dependencies {
    implementation 'fr.maxlego08.sarah:sarah:1.21.2'
}
```

**Maven:**
```xml
<repository>
    <id>groupez</id>
    <url>https://repo.groupez.dev/releases</url>
</repository>

<dependency>
    <groupId>fr.maxlego08.sarah</groupId>
    <artifactId>sarah</artifactId>
    <version>1.21.2</version>
</dependency>
```

### 2. Create a Connection

```java
// MySQL
DatabaseConfiguration config = DatabaseConfiguration.create(
    "username", "password", 3306, "localhost", "my_database"
);
DatabaseConnection connection = new MySqlConnection(config);

// Or SQLite
DatabaseConnection connection = new SqliteConnection(
    DatabaseConfiguration.sqlite(true),
    myPluginFolder
);
```

### 3. Start Using Sarah

```java
RequestHelper helper = new RequestHelper(connection, logger);

// Insert data
helper.insert("players", schema -> {
    schema.uuid("uuid", playerUuid);
    schema.string("name", playerName);
});

// Query data
List<PlayerDTO> players = helper.selectAll("players", PlayerDTO.class);
```

## Next Steps

- [Installation](installation) - Detailed setup instructions
- [Database Connections](connections) - Configure your database
- [Migrations](migrations) - Manage your schema
- [Queries](queries) - Learn the query builder
