# Connexions aux Bases de Données

Sarah supporte plusieurs systèmes de bases de données à travers une interface unifiée. Ce guide couvre comment configurer et gérer les connexions aux bases de données.

Les exemples utilisent le `Logger` de Sarah. Pour utiliser le logger Java de votre plugin :

```java
Logger logger = JULogger.from(getLogger());
```

## Bases de Données Supportées

| Base de Données | Classe de Connexion | Méthode de Configuration |
|-----------------|---------------------|--------------------------|
| MySQL | `MySqlConnection` | `DatabaseConfiguration.create()` |
| MariaDB | `MariaDbConnection` | `DatabaseConfiguration.createMariaDb()` |
| PostgreSQL | `PostgreSqlConnection` | `DatabaseConfiguration.createPostgreSql()` |
| SQLite | `SqliteConnection` | `DatabaseConfiguration.sqlite()` |

## Connexion MySQL

### Configuration Basique

```java
DatabaseConfiguration config = DatabaseConfiguration.create(
    "username",     // Utilisateur de la base de données
    "password",     // Mot de passe
    3306,           // Port
    "localhost",    // Hôte
    "my_database"   // Nom de la base de données
);

DatabaseConnection connection = new MySqlConnection(config, logger);
connection.connect();
```

### Avec Mode Debug

Activer la journalisation des requêtes SQL pour le débogage :

```java
DatabaseConfiguration config = DatabaseConfiguration.create(
    "username",
    "password",
    3306,
    "localhost",
    "my_database",
    true  // Activer le mode debug
);
```

## Connexion MariaDB

La configuration MariaDB est similaire à MySQL :

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

### Sans Port (Par défaut 3306)

```java
DatabaseConfiguration config = DatabaseConfiguration.createMariaDb(
    "username",
    "password",
    "localhost",
    "my_database"
);
```

## Connexion PostgreSQL

Ajoutez le pilote JDBC `org.postgresql:postgresql` à votre application, comme indiqué dans le guide d'[installation](installation).

### Configuration Basique

```java
DatabaseConfiguration config = DatabaseConfiguration.createPostgreSql(
    "username",     // Utilisateur de la base de données
    "password",     // Mot de passe
    5432,           // Port
    "localhost",    // Hôte
    "my_database",  // Nom de la base de données
    false           // Mode debug
);

DatabaseConnection connection = new PostgreSqlConnection(config, logger);
connection.connect();
```

Le type de cette configuration est `DatabaseType.POSTGRESQL`. Pour utiliser un pool, passez la même configuration à `HikariDatabaseConnection`.

### Noms de Colonnes

Sarah adapte les accents graves des identifiants en guillemets doubles avant d'envoyer la requête à PostgreSQL. Les identifiants entre guillemets sont sensibles à la casse : utilisez la même casse lors de la création des colonnes et dans les requêtes. Consultez les [types de colonnes](schema-builder#types-de-colonnes) pour les équivalences PostgreSQL et le comportement des timestamps.

## Connexion SQLite

SQLite est parfait pour le développement ou les petits projets :

```java
// Créer la configuration
DatabaseConfiguration config = DatabaseConfiguration.sqlite(true); // mode debug

// Créer la connexion avec le chemin du dossier
// Le fichier de base de données sera créé sous le nom "database.db" dans ce dossier
DatabaseConnection connection = new SqliteConnection(config, myPluginFolder, logger);
connection.connect();
```

### Mode Journal et Délai de Verrouillage

Configurez les options avant de vous connecter :

```java
SqliteConnection connection = new SqliteConnection(config, myPluginFolder, logger);
connection.setJournalMode("WAL");
connection.setBusyTimeout(5000);
connection.connect();
```

`setJournalMode` applique le mode journal à chaque connexion. `WAL` permet aux lecteurs de travailler pendant une écriture. `setBusyTimeout` définit en millisecondes l'attente d'un verrou avant une erreur `SQLITE_BUSY`. `null` conserve les valeurs par défaut du pilote. Utilisez `getJournalMode()` et `getBusyTimeout()` pour lire ces réglages.

### Exemple Complet SQLite

```java
public class MyPlugin extends JavaPlugin {

    private DatabaseConnection connection;

    @Override
    public void onEnable() {
        DatabaseConfiguration config = DatabaseConfiguration.sqlite(false);
        this.connection = new SqliteConnection(config, getDataFolder(), JULogger.from(getLogger()));

        try {
            connection.connect();
            getLogger().info("Connecté à la base de données SQLite !");
        } catch (DatabaseException e) {
            getLogger().severe("Échec de la connexion à SQLite !");
            e.printStackTrace();
        }
    }
}
```

## Méthodes de DatabaseConfiguration

### Méthodes de Création

| Méthode | Description |
|---------|-------------|
| `create(user, password, port, host, database)` | Créer une config MySQL |
| `create(user, password, port, host, database, debug)` | Créer une config MySQL avec debug |
| `createMariaDb(user, password, port, host, database)` | Créer une config MariaDB |
| `createMariaDb(user, password, port, host, database, debug)` | Créer une config MariaDB avec debug |
| `createPostgreSql(user, password, port, host, database, debug)` | Créer une config PostgreSQL |
| `sqlite(debug)` | Créer une config SQLite |

### Méthodes d'Instance

| Méthode | Type de Retour | Description |
|---------|----------------|-------------|
| `getUser()` | `String` | Obtenir le nom d'utilisateur |
| `getPassword()` | `String` | Obtenir le mot de passe |
| `getPort()` | `int` | Obtenir le port |
| `getHost()` | `String` | Obtenir l'hôte |
| `getDatabase()` | `String` | Obtenir le nom de la base |
| `isDebug()` | `boolean` | Vérifier si le mode debug est activé |
| `getDatabaseType()` | `DatabaseType` | Obtenir le type de base de données |
| `replacePrefix(tableName)` | `String` | Remplacer le préfixe de table |
| `getMaximumPoolSize()` | `Integer` | Obtenir la taille du pool, `null` pour le défaut |
| `getMinimumIdle()` | `Integer` | Obtenir le minimum de connexions inactives, `null` pour le défaut |
| `getMaxLifetime()` | `Long` | Obtenir la durée de vie des connexions en millisecondes, `null` pour le défaut (1.26+) |
| `getTablePrefix()` | `String` | Obtenir le préfixe de table |
| `getDialect()` | `Dialect` | Obtenir le dialecte du moteur configuré |
| `prepare(sql)` | `String` | Remplacer le préfixe et adapter les guillemets SQL au moteur |
| `getConnectionTimeout()` | `Long` | Lire le délai d'attente d'une connexion du pool en millisecondes, `null` pour le défaut |
| `getLeakDetectionThreshold()` | `Long` | Lire le seuil de détection de fuite en millisecondes, `null` pour le défaut |
| `getProperties()` | `Map<String, String>` | Lire les propriétés du pilote définies par `withProperty` |

### Propriétés du Pilote

`withProperty(key, value)` ajoute ou remplace une propriété pour les connexions simples et les pools. La méthode renvoie une nouvelle configuration : conservez son résultat.

```java
DatabaseConfiguration config = DatabaseConfiguration.createPostgreSql(
    "username", "password", 5432, "localhost", "my_database", false)
    .withProperty("sslmode", "require");
```

Avec MySQL et MariaDB, `withProperty("useSSL", "true")` active SSL et `withProperty("allowMultiQueries", "false")` désactive les requêtes multiples, activées par défaut par Sarah.

### Dialectes et Préfixes

`getDialect()` donne accès à `MySqlDialect`, `MariaDbDialect`, `SqliteDialect` ou `PostgreSqlDialect` selon la configuration. Les requêtes de Sarah utilisent automatiquement ce dialecte.

```java
DatabaseConfiguration config = new DatabaseConfiguration(
    "game_", "username", "password", 5432, "localhost", "my_database", false,
    DatabaseType.POSTGRESQL);
String sql = config.prepare("SELECT `name` FROM %prefix%players");
// SELECT "name" FROM game_players
```

`replacePrefix` remplace uniquement `%prefix%`. `prepare` adapte aussi les accents graves en guillemets doubles pour PostgreSQL, sans modifier les chaînes SQL entre apostrophes.

## Pool de Connexions (HikariCP)

`HikariDatabaseConnection` ouvre un pool HikariCP pour MySQL, MariaDB et PostgreSQL. Ses réglages se font sur la `DatabaseConfiguration`, chaque méthode `with...` renvoie une nouvelle configuration :

```java
DatabaseConfiguration config = DatabaseConfiguration.create("username", "password", 3306, "localhost", "my_database", false, DatabaseType.MYSQL)
        .withPoolSettings(10, 2)                         // taille max du pool, connexions inactives minimum
        .withMaxLifetime(TimeUnit.MINUTES.toMillis(10))
        .withTimeouts(10000L, 0L);                       // attente, détection de fuite désactivée

DatabaseConnection connection = new HikariDatabaseConnection(config, logger);
```

| Méthode | Description | Défaut (`null`) |
|---------|-------------|-----------------|
| `withPoolSettings(maximumPoolSize, minimumIdle)` | Taille du pool et nombre de connexions inactives gardées ouvertes | `cœurs * 2 + 1`, et `min(taille du pool, 10)` |
| `withMaxLifetime(maxLifetime)` | Durée de vie d'une connexion en millisecondes avant son remplacement. `0` garde les connexions jusqu'à la fermeture du pool. HikariCP remplace les valeurs sous 30 secondes par sa valeur par défaut | 30 minutes |
| `withTimeouts(connectionTimeout, leakDetectionThreshold)` | Délai d'attente d'une connexion et seuil de détection de fuite, en millisecondes. `0` désactive la détection de fuite | 10 secondes pour chaque réglage |

SQLite ne peut pas utiliser ce pool : utilisez `SqliteConnection`. Une transaction longue peut dépasser le seuil de détection de fuite sans être une fuite ; adaptez ce seuil à votre utilisation.

Réglez la durée de vie quelques minutes sous le `wait_timeout` de la base, ou sous le délai d'inactivité d'un proxy placé devant, pour que le pool ne fournisse jamais une connexion déjà fermée par le serveur.

## Cycle de Vie de la Connexion

### Se Connecter

```java
try {
    connection.connect();
} catch (DatabaseException e) {
    // Gérer l'échec de connexion
    e.printStackTrace();
}
```

### Se Déconnecter

Toujours se déconnecter quand votre plugin se désactive :

```java
@Override
public void onDisable() {
    if (connection != null) {
        connection.disconnect();
    }
}
```

### Obtenir la Connexion Brute

Si vous avez besoin de la connexion JDBC sous-jacente :

```java
try (Connection jdbcConnection = connection.getConnection()) {
    // Utiliser la connexion JDBC ici
}
```

Chaque appel à `getConnection()` ouvre une connexion dédiée, ou en emprunte une au pool. Le code appelant doit la fermer ; avec HikariCP, `close()` la rend au pool. `RequestHelper` gère cette fermeture pour ses propres requêtes.

### Journalisation

`Logger` expose `info`, `warn` et `error`. Pour un logger personnalisé qui implémente seulement `info`, les deux autres méthodes utilisent `info` par défaut. `JULogger.from(getLogger())` utilise les niveaux Java INFO, WARNING et SEVERE.

Les échecs de connexion sont journalisés avec `error`. `DatabaseConfiguration.toString()` masque le mot de passe.

## Bonnes Pratiques

### 1. Toujours Gérer les Exceptions

```java
try {
    connection.connect();
} catch (DatabaseException e) {
    logger.error("Échec de la connexion à la base de données : " + e.getMessage());
    // Désactiver le plugin ou utiliser une solution de repli
}
```

### 2. Utiliser SQLite pour le Développement

```java
boolean isDevelopment = true; // ou depuis la config

if (isDevelopment) {
    connection = new SqliteConnection(DatabaseConfiguration.sqlite(true), folder, logger);
} else {
    connection = new MySqlConnection(productionConfig, logger);
}
```

### 3. Fermer les Connexions Correctement

```java
@Override
public void onDisable() {
    // D'abord sauvegarder les données en attente
    saveAllData();

    // Ensuite se déconnecter
    if (connection != null) {
        connection.disconnect();
    }
}
```

## Prochaines Étapes

- [En savoir plus sur les migrations](migrations)
- [Exécuter des requêtes](queries)
