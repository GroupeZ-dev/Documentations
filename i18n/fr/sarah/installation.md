# Installation

La dernière version est **1.27**.

Ce guide vous accompagne dans l'ajout de Sarah à votre projet et sa configuration correcte.

## Dépendances

### Gradle

Ajoutez le dépôt GroupeZ et la dépendance Sarah à votre `build.gradle` :

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

Ajoutez le dépôt et la dépendance à votre `pom.xml` :

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

### Pilotes JDBC

Sarah ne fournit pas les pilotes JDBC. Ajoutez celui du moteur utilisé à votre application :

| Base de Données | Dépendance Gradle |
|-----------------|-------------------|
| MySQL | `com.mysql:mysql-connector-j:8.2.0` |
| MariaDB | `org.mariadb.jdbc:mariadb-java-client:3.1.4` |
| PostgreSQL | `org.postgresql:postgresql:42.7.4` |
| SQLite | `org.xerial:sqlite-jdbc:3.42.0.0` |

Par exemple, pour PostgreSQL :

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

## Relocation (Important !)

Pour éviter les conflits avec d'autres plugins utilisant Sarah, vous devriez relocaliser la dépendance.

### Gradle avec le Plugin Shadow

```groovy
plugins {
    id 'com.github.johnrengelman.shadow' version '8.1.1'
}

shadowJar {
    relocate 'fr.maxlego08.sarah', 'your.package.sarah'
}
```

### Maven avec le Plugin Shade

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

## Exemple de Configuration Basique

Voici un exemple complet de configuration de Sarah dans un plugin Minecraft :

```java
public class MyPlugin extends JavaPlugin {

    private DatabaseConnection databaseConnection;
    private RequestHelper requestHelper;
    private fr.maxlego08.sarah.logger.Logger databaseLogger;

    @Override
    public void onEnable() {
        // Charger la configuration
        saveDefaultConfig();

        // Configurer la base de données
        if (!setupDatabase()) return;

        // Exécuter les migrations
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
            getLogger().severe("Échec de la connexion à la base de données: " + e.getMessage());
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
            getLogger().severe("Échec de l'exécution des migrations !");
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

## Exemple de Fichier de Configuration

Voici un exemple de `config.yml` pour votre plugin :

```yaml
database:
  # Type : mysql, mariadb, postgresql ou sqlite
  type: sqlite

  # Paramètres serveur (ignorés pour SQLite)
  host: localhost
  port: 3306 # PostgreSQL : 5432
  database: my_plugin
  user: root
  password: secret

  # Activer la journalisation des requêtes SQL
  debug: false
```


## Prochaines Étapes

Maintenant que Sarah est installé, apprenez à :

- [Configurer les connexions aux bases de données](connections)
- [Créer et exécuter des migrations](migrations)
- [Exécuter des requêtes](queries)
