# Schema Builder Reference

This is the complete API reference for Sarah's Schema Builder. All methods are available when defining migrations or building queries.

## Column Types

### uuid

Creates a UUID/VARCHAR(36) column.

```java
// Definition only
table.uuid("player_id");

// With value
table.uuid("player_id", playerUuid);
```

### string

Creates a VARCHAR column.

```java
// Definition with length
table.string("name", 64);

// With value
table.string("name", playerName);
```

### text

Creates a TEXT column for longer strings.

```java
table.text("description");
```

### longText

Creates a LONGTEXT column for very long content.

```java
table.longText("content");
```

### integer

Creates an INT column.

```java
table.integer("count");
```

### bigInt

Creates a BIGINT column.

```java
// Definition only
table.bigInt("balance");

// With value
table.bigInt("balance", 1000L);
```

### decimal

Creates a DECIMAL column.

```java
// Default precision
table.decimal("price");

// Custom precision (10 total digits, 2 after decimal)
table.decimal("price", 10, 2);

// With value
table.decimal("price", 99.99);
```

### bool

Creates a TINYINT(1)/BOOLEAN column.

```java
// Definition only
table.bool("is_active");

// With value
table.bool("is_active", true);
```

### json

Creates a JSON column.

```java
table.json("metadata");
```

### blob

Creates a BLOB column for binary data.

```java
// Definition only
table.blob("data");

// With byte array
table.blob("data", byteArray);

// With object (auto-serialized)
table.blob("data", myObject);
```

### date

Creates a DATE column.

```java
table.date("birth_date", new Date());
```

### timestamp

Creates a TIMESTAMP column.

```java
table.timestamp("verified_at");
```

### object

Stores any object (serialized).

```java
table.object("settings", settingsObject);
```

## Auto Increment

### autoIncrement

Creates an auto-incrementing INT primary key.

```java
table.autoIncrement("id");
```

### autoIncrementBigInt

Creates an auto-incrementing BIGINT primary key.

```java
table.autoIncrementBigInt("id");
```

## Column Modifiers

### primary

Marks the column as a primary key.

```java
table.uuid("uuid").primary();
```

### nullable

Allows NULL values.

```java
table.string("nickname", 32).nullable();
```

### unique

Adds a UNIQUE constraint.

```java
table.string("email", 255).unique();

// Or with explicit boolean
table.string("email", 255).unique(true);
```

### defaultValue

Sets a default value.

```java
table.bigInt("balance").defaultValue(0);
table.string("status", 16).defaultValue("pending");
table.bool("active").defaultValue(true);
```

### defaultCurrentTimestamp

Sets default to CURRENT_TIMESTAMP.

```java
table.timestamp("created_at").defaultCurrentTimestamp();
```

### foreignKey

Creates a foreign key relationship.

```java
// Basic (references 'id' column)
table.uuid("user_id").foreignKey("users");

// With custom column and cascade delete
table.uuid("user_id").foreignKey("users", "uuid", true);
```

## Timestamp Helpers

### timestamps

Adds both `created_at` and `updated_at` columns.

```java
table.timestamps();
```

### createdAt

Adds only `created_at` column.

```java
table.createdAt();
```

### updatedAt

Adds only `updated_at` column.

```java
table.updatedAt();
```

## WHERE Conditions

### where

Basic equality or comparison.

```java
// Equality
table.where("name", "Steve");
table.where("uuid", playerUuid);

// Comparison
table.where("balance", ">", 1000);
table.where("level", ">=", 10);
table.where("score", "<", 50);
table.where("rank", "<=", 100);
table.where("status", "!=", "banned");
```

### whereNull

Checks for NULL values.

```java
table.whereNull("deleted_at");
```

### whereNotNull

Checks for non-NULL values.

```java
table.whereNotNull("verified_at");
```

### whereIn

Checks if value is in a list.

```java
// Varargs
table.whereIn("status", "active", "pending", "review");

// List
table.whereIn("name", Arrays.asList("Steve", "Alex"));

// With table prefix
table.whereIn("users", "status", statusList);
```

## JOIN Operations

### leftJoin

```java
table.leftJoin(
    "users",          // Primary table
    "u",              // Alias
    "uuid",           // Primary column
    "orders",         // Foreign table
    "user_uuid"       // Foreign column
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

### Join with Additional Condition

```java
JoinCondition condition = new JoinCondition(...);
table.leftJoin("users", "u", "uuid", "orders", "user_uuid", condition);
```

## SELECT Options

### addSelect

Specify columns to select.

```java
table.addSelect("name");
table.addSelect("users", "name");              // With table prefix
table.addSelect("users", "name", "userName");  // With alias
table.addSelect("users", "name", "userName", "Unknown");  // With default
```

### distinct

Select only distinct rows.

```java
table.distinct();
```

### orderBy

Sort results ascending.

```java
table.orderBy("name");
```

### orderByDesc

Sort results descending.

```java
table.orderByDesc("created_at");
```

## Schema Types

Sarah uses different schema types for different operations:

| Type | Description | Created By |
|------|-------------|------------|
| `CREATE` | Create new table | `SchemaBuilder.create()` |
| `ALTER` | Modify existing table | `SchemaBuilder.alter()` |
| `DROP` | Delete table | `SchemaBuilder.drop()` |
| `RENAME` | Rename table | `SchemaBuilder.rename()` |
| `INSERT` | Insert data | `SchemaBuilder.insert()` |
| `UPSERT` | Insert or update | `SchemaBuilder.upsert()` |
| `UPDATE` | Update data | `SchemaBuilder.update()` |
| `SELECT` | Query data | `SchemaBuilder.select()` |
| `SELECT_COUNT` | Count rows | `SchemaBuilder.selectCount()` |
| `DELETE` | Delete data | `SchemaBuilder.delete()` |
| `CREATE_INDEX` | Create index | `SchemaBuilder.createIndex()` |

## SchemaBuilder Static Methods

### create

Create a new table.

```java
Schema schema = SchemaBuilder.create(migration, "users", table -> {
    table.uuid("uuid").primary();
    table.string("name", 64);
});
```

### create (from template)

Create table from class template.

```java
Schema schema = SchemaBuilder.create(migration, "users", UserDTO.class);
```

### alter

Modify existing table.

```java
Schema schema = SchemaBuilder.alter(migration, "users", table -> {
    table.string("email", 255).nullable();
});
```

### drop

Delete a table.

```java
Schema schema = SchemaBuilder.drop(migration, "old_table");
```

### rename

Rename a table.

```java
Schema schema = SchemaBuilder.rename(migration, "old_name", "new_name");
```

### createIndex

Create an index.

```java
Schema schema = SchemaBuilder.createIndex(migration, "users", "email");
```

### insert

Insert data.

```java
Schema schema = SchemaBuilder.insert("users", table -> {
    table.uuid("uuid", uuid);
    table.string("name", name);
});
```

### upsert

Insert or update data.

```java
Schema schema = SchemaBuilder.upsert("users", table -> {
    table.uuid("uuid", uuid).primary();
    table.string("name", name);
});
```

### update

Update data.

```java
Schema schema = SchemaBuilder.update("users", table -> {
    table.string("name", newName);
    table.where("uuid", uuid);
});
```

### select

Query data.

```java
Schema schema = SchemaBuilder.select("users");
```

### selectCount

Count rows.

```java
Schema schema = SchemaBuilder.selectCount("users");
```

### delete

Delete data.

```java
Schema schema = SchemaBuilder.delete("users");
```

## Execution Methods

### execute

Execute the schema operation.

```java
int affectedRows = schema.execute(databaseConnection, logger);
```

### executeSelect

Execute a SELECT query.

```java
List<Map<String, Object>> results = schema.executeSelect(databaseConnection, logger);
```

### executeSelect (with mapping)

Execute SELECT and map to objects.

```java
List<UserDTO> users = schema.executeSelect(UserDTO.class, databaseConnection, logger);
```

### executeSelectCount

Execute a COUNT query.

```java
long count = schema.executeSelectCount(databaseConnection, logger);
```

## Complete Example

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
