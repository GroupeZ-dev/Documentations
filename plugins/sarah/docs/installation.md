# Installation

This guide will walk you through adding Sarah to your project and configuring it properly.

## Dependencies

### Gradle

Add the GroupeZ repository and Sarah dependency to your `build.gradle`:

```groovy
repositories {
    mavenCentral()
    maven { url 'https://repo.groupez.dev/releases' }
}

dependencies {
    implementation 'fr.maxlego08.sarah:sarah:1.21.2'
}
```

### Maven

Add the repository and dependency to your `pom.xml`:

```xml
<repositories>
    <repository>
        <id>groupez</id>
        <url>https://repo.groupez.dev/releases</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>fr.maxlego08.sarah</groupId>
        <artifactId>sarah</artifactId>
        <version>1.21.2</version>
    </dependency>
</dependencies>
```

## Relocation (Important!)

To avoid conflicts with other plugins using Sarah, you should relocate the dependency.

### Gradle with Shadow Plugin

```groovy
plugins {
    id 'com.github.johnrengelman.shadow' version '8.1.1'
}

shadowJar {
    relocate 'fr.maxlego08.sarah', 'your.package.sarah'
}
```

### Maven with Shade Plugin

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.5.0</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <relocations>
                    <relocation>
                        <pattern>fr.maxlego08.sarah</pattern>
                        <shadedPattern>your.package.sarah</shadedPattern>
                    </relocation>
                </relocations>
            </configuration>
        </execution>
    </executions>
</plugin>
```

## Basic Setup Example

Here's a complete example of setting up Sarah in a Minecraft plugin:

```java
public class MyPlugin extends JavaPlugin {

    private DatabaseConnection databaseConnection;
    private RequestHelper requestHelper;

    @Override
    public void onEnable() {
        // Load configuration
        saveDefaultConfig();

        // Setup database
        setupDatabase();

        // Run migrations
        runMigrations();
    }

    private void setupDatabase() {
        String type = getConfig().getString("database.type", "sqlite");

        if (type.equalsIgnoreCase("mysql")) {
            DatabaseConfiguration config = DatabaseConfiguration.create(
                getConfig().getString("database.user"),
                getConfig().getString("database.password"),
                getConfig().getInt("database.port", 3306),
                getConfig().getString("database.host"),
                getConfig().getString("database.database")
            );
            this.databaseConnection = new MySqlConnection(config);
        } else {
            DatabaseConfiguration config = DatabaseConfiguration.sqlite(
                getConfig().getBoolean("database.debug", false)
            );
            this.databaseConnection = new SqliteConnection(config, getDataFolder());
        }

        // Connect to database
        try {
            this.databaseConnection.connect();
        } catch (SQLException e) {
            getLogger().severe("Failed to connect to database!");
            e.printStackTrace();
            getServer().getPluginManager().disablePlugin(this);
            return;
        }

        // Create request helper
        this.requestHelper = new RequestHelper(databaseConnection, getLogger());
    }

    private void runMigrations() {
        MigrationManager.setMigrationTableName("my_plugin_migrations");
        MigrationManager.registerMigration(new CreatePlayersTable());
        MigrationManager.registerMigration(new CreateStatsTable());

        try {
            MigrationManager.execute(databaseConnection, getLogger());
        } catch (SQLException e) {
            getLogger().severe("Failed to run migrations!");
            e.printStackTrace();
        }
    }

    @Override
    public void onDisable() {
        if (databaseConnection != null) {
            databaseConnection.disconnect();
        }
    }

    public RequestHelper getRequestHelper() {
        return requestHelper;
    }
}
```

## Configuration File Example

Here's a sample `config.yml` for your plugin:

```yaml
database:
  # Type: mysql, mariadb, or sqlite
  type: sqlite

  # MySQL/MariaDB settings (ignored for SQLite)
  host: localhost
  port: 3306
  database: my_plugin
  user: root
  password: secret

  # Enable SQL query logging
  debug: false
```

## Next Steps

Now that you have Sarah installed, learn how to:

- [Configure database connections](connections)
- [Create and run migrations](migrations)
- [Execute queries](queries)
