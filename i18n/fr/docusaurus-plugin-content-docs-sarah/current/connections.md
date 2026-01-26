# Connexions aux Bases de Données

Sarah supporte plusieurs systèmes de bases de données à travers une interface unifiée. Ce guide couvre comment configurer et gérer les connexions aux bases de données.

## Bases de Données Supportées

| Base de Données | Classe de Connexion | Méthode de Configuration |
|-----------------|---------------------|--------------------------|
| MySQL | `MySqlConnection` | `DatabaseConfiguration.create()` |
| MariaDB | `MariaDbConnection` | `DatabaseConfiguration.createMariaDb()` |
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

DatabaseConnection connection = new MySqlConnection(config);
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

DatabaseConnection connection = new MariaDbConnection(config);
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

## Connexion SQLite

SQLite est parfait pour le développement ou les petits projets :

```java
// Créer la configuration
DatabaseConfiguration config = DatabaseConfiguration.sqlite(true); // mode debug

// Créer la connexion avec le chemin du dossier
// Le fichier de base de données sera créé sous le nom "database.db" dans ce dossier
DatabaseConnection connection = new SqliteConnection(config, myPluginFolder);
connection.connect();
```

### Exemple Complet SQLite

```java
public class MyPlugin extends JavaPlugin {

    private DatabaseConnection connection;

    @Override
    public void onEnable() {
        DatabaseConfiguration config = DatabaseConfiguration.sqlite(false);
        this.connection = new SqliteConnection(config, getDataFolder());

        try {
            connection.connect();
            getLogger().info("Connecté à la base de données SQLite !");
        } catch (SQLException e) {
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

## Cycle de Vie de la Connexion

### Se Connecter

```java
try {
    connection.connect();
} catch (SQLException e) {
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
Connection jdbcConnection = connection.getConnection();
```

## Bonnes Pratiques

### 1. Toujours Gérer les Exceptions

```java
try {
    connection.connect();
} catch (SQLException e) {
    logger.severe("Échec de la connexion à la base de données : " + e.getMessage());
    // Désactiver le plugin ou utiliser une solution de repli
}
```

### 2. Utiliser SQLite pour le Développement

```java
boolean isDevelopment = true; // ou depuis la config

if (isDevelopment) {
    connection = new SqliteConnection(DatabaseConfiguration.sqlite(true), folder);
} else {
    connection = new MySqlConnection(productionConfig);
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
