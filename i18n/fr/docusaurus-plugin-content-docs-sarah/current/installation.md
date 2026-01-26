# Installation

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
    implementation 'fr.maxlego08.sarah:sarah:1.21.2'
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
        <version>1.21.2</version>
    </dependency>
</dependencies>
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

    @Override
    public void onEnable() {
        // Charger la configuration
        saveDefaultConfig();

        // Configurer la base de données
        setupDatabase();

        // Exécuter les migrations
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

        // Se connecter à la base de données
        try {
            this.databaseConnection.connect();
        } catch (SQLException e) {
            getLogger().severe("Échec de la connexion à la base de données !");
            e.printStackTrace();
            getServer().getPluginManager().disablePlugin(this);
            return;
        }

        // Créer le request helper
        this.requestHelper = new RequestHelper(databaseConnection, getLogger());
    }

    private void runMigrations() {
        MigrationManager.setMigrationTableName("my_plugin_migrations");
        MigrationManager.registerMigration(new CreatePlayersTable());
        MigrationManager.registerMigration(new CreateStatsTable());

        try {
            MigrationManager.execute(databaseConnection, getLogger());
        } catch (SQLException e) {
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
  # Type : mysql, mariadb ou sqlite
  type: sqlite

  # Paramètres MySQL/MariaDB (ignorés pour SQLite)
  host: localhost
  port: 3306
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
