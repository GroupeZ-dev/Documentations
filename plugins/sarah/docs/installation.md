# Installation

The latest release is **1.27**.

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
    implementation 'fr.maxlego08.sarah:sarah:1.27'
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
        <version>1.27</version>
    </dependency>
</dependencies>
```

### JDBC Drivers

Sarah does not bundle JDBC drivers. Add the driver for your database to your application:

| Database | Gradle Dependency |
|----------|-------------------|
| MySQL | `com.mysql:mysql-connector-j:8.2.0` |
| MariaDB | `org.mariadb.jdbc:mariadb-java-client:3.1.4` |
| PostgreSQL | `org.postgresql:postgresql:42.7.4` |
| SQLite | `org.xerial:sqlite-jdbc:3.42.0.0` |

For example, with PostgreSQL:

```groovy
dependencies {
    implementation 'fr.maxlego08.sarah:sarah:1.27'
    implementation 'org.postgresql:postgresql:42.7.4'
}
```

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.7.4</version>
</dependency>
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
    private fr.maxlego08.sarah.logger.Logger databaseLogger;

    @Override
    public void onEnable() {
        // Load configuration
        saveDefaultConfig();

        // Setup database
        if (!setupDatabase()) return;

        // Run migrations
        runMigrations();
    }

    private boolean setupDatabase() {
        this.databaseLogger = JULogger.from(getLogger());
        try {
            String type = getConfig().getString("database.type", "sqlite")
                    .toLowerCase(java.util.Locale.ROOT);
            boolean debug = getConfig().getBoolean("database.debug", false);

            if (type.equals("sqlite")) {
                this.databaseConnection = new SqliteConnection(
                        DatabaseConfiguration.sqlite(debug), getDataFolder(), databaseLogger);
            } else {
                DatabaseType databaseType;
                switch (type) {
                    case "mysql": databaseType = DatabaseType.MYSQL; break;
                    case "mariadb": databaseType = DatabaseType.MARIADB; break;
                    case "postgresql": databaseType = DatabaseType.POSTGRESQL; break;
                    default: throw new IllegalArgumentException("Unknown database type: " + type);
                }
                int defaultPort = databaseType == DatabaseType.POSTGRESQL ? 5432 : 3306;
                DatabaseConfiguration config = new DatabaseConfiguration(
                        "", getConfig().getString("database.user"),
                        getConfig().getString("database.password"),
                        getConfig().getInt("database.port", defaultPort),
                        getConfig().getString("database.host", "localhost"),
                        getConfig().getString("database.database"), debug, databaseType);
                this.databaseConnection = new HikariDatabaseConnection(config, databaseLogger);
            }

            this.databaseConnection.connect();
        } catch (RuntimeException e) {
            getLogger().severe("Failed to connect to database: " + e.getMessage());
            getServer().getPluginManager().disablePlugin(this);
            return false;
        }
        this.requestHelper = new RequestHelper(databaseConnection, databaseLogger);
        return true;
    }

    private void runMigrations() {
        MigrationManager.setMigrationTableName("my_plugin_migrations");
        MigrationManager.registerMigration(new CreatePlayersTable());
        MigrationManager.registerMigration(new CreateStatsTable());

        try {
            MigrationManager.execute(databaseConnection, databaseLogger);
        } catch (DatabaseException e) {
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
  # Type: mysql, mariadb, postgresql, or sqlite
  type: sqlite

  # Server settings (ignored for SQLite)
  host: localhost
  port: 3306 # PostgreSQL: 5432
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
