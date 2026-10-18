# Référence du Schema Builder

Ceci est la référence complète de l'API du Schema Builder de Sarah. Toutes les méthodes sont disponibles lors de la définition des migrations ou de la construction de requêtes.

## Types de Colonnes

### uuid

Crée une colonne UUID/VARCHAR(36).

```java
// Définition seule
table.uuid("player_id");

// Avec valeur
table.uuid("player_id", playerUuid);
```

### string

Crée une colonne VARCHAR.

```java
// Définition avec longueur
table.string("name", 64);

// Avec valeur
table.string("name", playerName);
```

### text

Crée une colonne TEXT pour les chaînes plus longues.

```java
table.text("description");
```

### longText

Crée une colonne LONGTEXT pour les contenus très longs.

```java
table.longText("content");
```

### integer

Crée une colonne INT.

```java
table.integer("count");
```

### bigInt

Crée une colonne BIGINT.

```java
// Définition seule
table.bigInt("balance");

// Avec valeur
table.bigInt("balance", 1000L);
```

### decimal

Crée une colonne DECIMAL.

```java
// Précision par défaut
table.decimal("price");

// Précision personnalisée (10 chiffres au total, 2 après la virgule)
table.decimal("price", 10, 2);

// Avec valeur
table.decimal("price", 99.99);
```

### bool

Crée une colonne TINYINT(1)/BOOLEAN.

```java
// Définition seule
table.bool("is_active");

// Avec valeur
table.bool("is_active", true);
```

### json

Crée une colonne JSON.

```java
table.json("metadata");
```

### blob

Crée une colonne BLOB pour les données binaires.

```java
// Définition seule
table.blob("data");

// Avec tableau d'octets
table.blob("data", byteArray);

// Avec objet (auto-sérialisé)
table.blob("data", myObject);
```

### date

Crée une colonne DATE.

```java
table.date("birth_date", new Date());
```

### timestamp

Crée une colonne TIMESTAMP.

```java
table.timestamp("verified_at");
```

### object

Stocke n'importe quel objet (sérialisé).

```java
table.object("settings", settingsObject);
```

## Auto Incrémentation

### autoIncrement

Crée une clé primaire INT auto-incrémentée.

```java
table.autoIncrement("id");
```

### autoIncrementBigInt

Crée une clé primaire BIGINT auto-incrémentée.

```java
table.autoIncrementBigInt("id");
```

## Modificateurs de Colonnes

### primary

Marque la colonne comme clé primaire.

```java
table.uuid("uuid").primary();
```

### nullable

Autorise les valeurs NULL.

```java
table.string("nickname", 32).nullable();
```

### unique

Ajoute une contrainte UNIQUE.

```java
table.string("email", 255).unique();

// Ou avec booléen explicite
table.string("email", 255).unique(true);
```

### defaultValue

Définit une valeur par défaut.

```java
table.bigInt("balance").defaultValue(0);
table.string("status", 16).defaultValue("pending");
table.bool("active").defaultValue(true);
```

### defaultCurrentTimestamp

Définit la valeur par défaut à CURRENT_TIMESTAMP.

```java
table.timestamp("created_at").defaultCurrentTimestamp();
```

### foreignKey

Crée une relation de clé étrangère.

```java
// Basique (référence la colonne 'id')
table.uuid("user_id").foreignKey("users");

// Avec colonne personnalisée et suppression en cascade
table.uuid("user_id").foreignKey("users", "uuid", true);
```

## Aides pour les Timestamps

### timestamps

Ajoute les colonnes `created_at` et `updated_at`.

```java
table.timestamps();
```

### createdAt

Ajoute seulement la colonne `created_at`.

```java
table.createdAt();
```

### updatedAt

Ajoute seulement la colonne `updated_at`.

```java
table.updatedAt();
```

## Conditions WHERE

### where

Égalité ou comparaison basique.

```java
// Égalité
table.where("name", "Steve");
table.where("uuid", playerUuid);

// Comparaison
table.where("balance", ">", 1000);
table.where("level", ">=", 10);
table.where("score", "<", 50);
table.where("rank", "<=", 100);
table.where("status", "!=", "banned");
```

### whereNull

Vérifie les valeurs NULL.

```java
table.whereNull("deleted_at");
```

### whereNotNull

Vérifie les valeurs non-NULL.

```java
table.whereNotNull("verified_at");
```

### whereIn

Vérifie si la valeur est dans une liste.

```java
// Varargs
table.whereIn("status", "active", "pending", "review");

// Liste
table.whereIn("name", Arrays.asList("Steve", "Alex"));

// Avec préfixe de table
table.whereIn("users", "status", statusList);
```

## Opérations JOIN

### leftJoin

```java
table.leftJoin(
    "users",          // Table primaire
    "u",              // Alias
    "uuid",           // Colonne primaire
    "orders",         // Table étrangère
    "user_uuid"       // Colonne étrangère
);
```

### rightJoin

```java
table.rightJoin("users", "u", "uuid", "orders", "user_uuid");
```

### innerJoin

```java
table.innerJoin("users", "u", "uuid", "orders", "user_uuid");
```

### fullJoin

```java
table.fullJoin("users", "u", "uuid", "orders", "user_uuid");
```

### Join avec Condition Supplémentaire

```java
JoinCondition condition = new JoinCondition(...);
table.leftJoin("users", "u", "uuid", "orders", "user_uuid", condition);
```

## Options SELECT

### addSelect

Spécifier les colonnes à sélectionner.

```java
table.addSelect("name");
table.addSelect("users", "name");              // Avec préfixe de table
table.addSelect("users", "name", "userName");  // Avec alias
table.addSelect("users", "name", "userName", "Unknown");  // Avec défaut
```

### distinct

Sélectionner seulement les lignes distinctes.

```java
table.distinct();
```

### orderBy

Trier les résultats par ordre croissant.

```java
table.orderBy("name");
```

### orderByDesc

Trier les résultats par ordre décroissant.

```java
table.orderByDesc("created_at");
```

## Types de Schema

Sarah utilise différents types de schema pour différentes opérations :

| Type | Description | Créé Par |
|------|-------------|----------|
| `CREATE` | Créer une nouvelle table | `SchemaBuilder.create()` |
| `ALTER` | Modifier une table existante | `SchemaBuilder.alter()` |
| `DROP` | Supprimer une table | `SchemaBuilder.drop()` |
| `RENAME` | Renommer une table | `SchemaBuilder.rename()` |
| `INSERT` | Insérer des données | `SchemaBuilder.insert()` |
| `UPSERT` | Insérer ou mettre à jour | `SchemaBuilder.upsert()` |
| `UPDATE` | Mettre à jour des données | `SchemaBuilder.update()` |
| `SELECT` | Requêter des données | `SchemaBuilder.select()` |
| `SELECT_COUNT` | Compter les lignes | `SchemaBuilder.selectCount()` |
| `DELETE` | Supprimer des données | `SchemaBuilder.delete()` |
| `CREATE_INDEX` | Créer un index | `SchemaBuilder.createIndex()` |

## Méthodes Statiques du SchemaBuilder

### create

Créer une nouvelle table.

```java
Schema schema = SchemaBuilder.create(migration, "users", table -> {
    table.uuid("uuid").primary();
    table.string("name", 64);
});
```

### create (depuis template)

Créer une table depuis un template de classe.

```java
Schema schema = SchemaBuilder.create(migration, "users", UserDTO.class);
```

### alter

Modifier une table existante.

```java
Schema schema = SchemaBuilder.alter(migration, "users", table -> {
    table.string("email", 255).nullable();
});
```

### drop

Supprimer une table.

```java
Schema schema = SchemaBuilder.drop(migration, "old_table");
```

### rename

Renommer une table.

```java
Schema schema = SchemaBuilder.rename(migration, "old_name", "new_name");
```

### createIndex

Créer un index.

```java
Schema schema = SchemaBuilder.createIndex(migration, "users", "email");
```

### insert

Insérer des données.

```java
Schema schema = SchemaBuilder.insert("users", table -> {
    table.uuid("uuid", uuid);
    table.string("name", name);
});
```

### upsert

Insérer ou mettre à jour des données.

```java
Schema schema = SchemaBuilder.upsert("users", table -> {
    table.uuid("uuid", uuid).primary();
    table.string("name", name);
});
```

### update

Mettre à jour des données.

```java
Schema schema = SchemaBuilder.update("users", table -> {
    table.string("name", newName);
    table.where("uuid", uuid);
});
```

### select

Requêter des données.

```java
Schema schema = SchemaBuilder.select("users");
```

### selectCount

Compter les lignes.

```java
Schema schema = SchemaBuilder.selectCount("users");
```

### delete

Supprimer des données.

```java
Schema schema = SchemaBuilder.delete("users");
```

## Méthodes d'Exécution

### execute

Exécuter l'opération du schema.

```java
int affectedRows = schema.execute(databaseConnection, logger);
```

### executeSelect

Exécuter une requête SELECT.

```java
List<Map<String, Object>> results = schema.executeSelect(databaseConnection, logger);
```

### executeSelect (avec mapping)

Exécuter SELECT et mapper vers des objets.

```java
List<UserDTO> users = schema.executeSelect(UserDTO.class, databaseConnection, logger);
```

### executeSelectCount

Exécuter une requête COUNT.

```java
long count = schema.executeSelectCount(databaseConnection, logger);
```

## Exemple Complet

```java
public class UserRepository {
    private final RequestHelper helper;

    public void createUser(User user) {
        helper.upsert("users", schema -> {
            schema.uuid("uuid", user.getUuid()).primary();
            schema.string("name", user.getName());
            schema.string("email", user.getEmail()).unique();
            schema.bigInt("balance", user.getBalance()).defaultValue(0);
            schema.bool("is_premium", user.isPremium()).defaultValue(false);
            schema.text("bio").nullable();
            schema.json("settings");
            schema.timestamps();
        });
    }

    public List<User> findPremiumUsers() {
        return helper.select("users", User.class, table -> {
            table.where("is_premium", true);
            table.whereNotNull("email");
            table.orderByDesc("balance");
        });
    }

    public List<User> searchUsers(String query) {
        return helper.select("users", User.class, table -> {
            table.where("name", "LIKE", "%" + query + "%");
        });
    }

    public void deleteInactiveUsers(Date threshold) {
        helper.delete("users", table -> {
            table.where("last_login", "<", threshold);
            table.where("is_premium", false);
        });
    }
}
```
