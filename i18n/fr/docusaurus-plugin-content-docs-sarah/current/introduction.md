# Introduction

Sarah est une puissante bibliothèque Java conçue pour simplifier la gestion des bases de données avec une API intuitive et élégante. Que vous développiez un plugin Minecraft ou toute autre application Java, Sarah fournit une abstraction propre du SQL brut tout en conservant un contrôle total sur vos opérations de base de données.

- **GitHub** : [https://github.com/GroupeZ-dev/Sarah](https://github.com/GroupeZ-dev/Sarah)
- **Dépôt Maven** : [https://repo.groupez.dev/#/releases/fr/maxlego08/sarah/sarah](https://repo.groupez.dev/#/releases/fr/maxlego08/sarah/sarah)

## Qu'est-ce que Sarah ?

Sarah est une bibliothèque de gestion de base de données qui fournit :

- **Connexions Simples** - Support pour MySQL, MariaDB et SQLite avec une configuration minimale
- **Système de Migrations** - Versioning automatique du schéma et suivi des migrations
- **Constructeur de Requêtes** - API fluide pour construire des requêtes SQL typées
- **Mapping d'Objets** - Mapping automatique entre les lignes de la base de données et les objets Java (DTOs)
- **Pool de Connexions** - Support HikariCP intégré pour des performances optimales

## Pourquoi Utiliser Sarah ?

### Avant Sarah (JDBC Brut)

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

### Avec Sarah

```java
requestHelper.upsert("users", schema -> {
    schema.uuid("uuid", uuid).primary();
    schema.string("name", name);
    schema.bigInt("play_time", playTime);
});
```

## Fonctionnalités Clés

### Support Multi-Base de Données

Sarah supporte les systèmes de base de données les plus populaires :

| Base de Données | Classe | Cas d'Usage |
|-----------------|--------|-------------|
| MySQL | `MySqlConnection` | Serveurs de production |
| MariaDB | `MariaDbConnection` | Serveurs de production |
| SQLite | `SqliteConnection` | Développement, petits projets |

### Système de Migrations

Gardez votre schéma de base de données versionné et organisé :

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

### Constructeur de Requêtes Fluide

Écrivez des requêtes de base de données lisibles et maintenables :

```java
// Sélection avec conditions
List<User> users = requestHelper.select("users", User.class, table -> {
    table.where("play_time", ">", 1000);
    table.orderByDesc("play_time");
});

// Insertion avec mapping automatique
requestHelper.insert("users", User.class, newUser);

// Suppression avec conditions
requestHelper.delete("users", table -> {
    table.where("uuid", playerUuid);
});
```

## Démarrage Rapide

### 1. Ajouter la Dépendance

**Gradle :**
```groovy
repositories {
    maven { url 'https://repo.groupez.dev/releases' }
}

dependencies {
    implementation 'fr.maxlego08.sarah:sarah:1.21.2'
}
```

**Maven :**
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

### 2. Créer une Connexion

```java
// MySQL
DatabaseConfiguration config = DatabaseConfiguration.create(
    "username", "password", 3306, "localhost", "my_database"
);
DatabaseConnection connection = new MySqlConnection(config);

// Ou SQLite
DatabaseConnection connection = new SqliteConnection(
    DatabaseConfiguration.sqlite(true),
    myPluginFolder
);
```

### 3. Commencer à Utiliser Sarah

```java
RequestHelper helper = new RequestHelper(connection, logger);

// Insérer des données
helper.insert("players", schema -> {
    schema.uuid("uuid", playerUuid);
    schema.string("name", playerName);
});

// Requêter des données
List<PlayerDTO> players = helper.selectAll("players", PlayerDTO.class);
```

## Prochaines Étapes

- [Installation](installation) - Instructions de configuration détaillées
- [Connexions aux Bases de Données](connections) - Configurer votre base de données
- [Migrations](migrations) - Gérer votre schéma
- [Requêtes](queries) - Apprendre le constructeur de requêtes
