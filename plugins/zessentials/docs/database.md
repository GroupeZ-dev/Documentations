---
title: Database
description: Database architecture, tables, and storage backends for zEssentials
---

# Database

zEssentials uses a relational database to persist all player data, economies, sanctions, vaults, and more. This page covers the available storage backends, the full database schema, performance optimizations, and the migration system.

## Storage Backends

Configure the `storage-type` option in `config.yml` to select your backend.

| Value | Backend | Recommended for |
|-------|---------|-----------------|
| `SQLITE` | Local SQLite file | Installation and tests only |
| `MYSQL` | MySQL through HikariCP | Production |
| `MARIADB` | MariaDB through HikariCP (MariaDB driver) | Production |
| `HIKARICP` | MySQL/MariaDB through HikariCP | Production |
| `JSON` | One JSON file per player | Not recommended |

### SQLITE

SQLite is the default backend, storing data in a local file at `plugins/zEssentials/database.db`. It requires no external database server.

```yaml
storage-type: SQLITE
```

<CalloutContainer type="warning">

<CalloutDescription>
SQLite is intended for **installation and testing only**. Some features are limited (for example, sanction updates when the plugin starts), it uses a single-writer concurrency model, and it cannot be shared between several servers.

**Do not use SQLite in production.** Switch to `MYSQL`, `MARIADB` or `HIKARICP` before going live.
</CalloutDescription>

</CalloutContainer>

### MYSQL, MARIADB and HIKARICP

These three values connect to a MySQL or MariaDB server. They all use a **HikariCP connection pool**, which reuses connections, checks their health and evicts stale ones. `MARIADB` connects with the MariaDB JDBC driver (`jdbc:mariadb:`), `MYSQL` and `HIKARICP` use a `jdbc:mysql:` URL.

```yaml
storage-type: HIKARICP

database-configuration:
  table-prefix: "zessentials_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: 'secret'
  database: zessentials
  debug: false
```

<CalloutContainer type="info">

<CalloutDescription>
The MariaDB JDBC driver is not shaded into the JAR: it is downloaded from Maven Central by Paper when the server starts (see [Installation](./installation#3-install-the-plugin)).
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutTitle>Recommended</CalloutTitle>

<CalloutDescription>
For any server expecting real players, use **HIKARICP** (or `MARIADB` if your server runs MariaDB). It handles concurrent database access efficiently and is required to share data between several servers.
</CalloutDescription>

</CalloutContainer>

### JSON

```yaml
storage-type: JSON
```

Player data is stored in one file per player in `plugins/zEssentials/users/<uuid>.json`. This backend does **not** support every feature: vaults, the item mailbox, chat history, economy rankings (baltop), transaction and command logs are not available, and [data converters](./converters) cannot be used.

### Configuration Reference

| Property | Default Value | Description |
|----------|---------------|-------------|
| `table-prefix` | `zessentials_` | Prefix applied to all table names |
| `host` | `192.168.10.10` | Database server hostname or IP address |
| `port` | `3306` | Database server port |
| `user` | `homestead` | Database username |
| `password` | `secret` | Database password |
| `database` | `zessentials` | Database name (must already exist) |
| `debug` | `false` | Logs the executed SQL queries |

<CalloutContainer type="warning">

<CalloutDescription>
Always change the default credentials before deploying to production. The values shown above are placeholders only.
</CalloutDescription>

</CalloutContainer>

## Database Tables

zEssentials creates **25 tables** (shown below with the default `zessentials_` prefix), plus the `zessentials_migrations` table used to track the applied migrations. Each table is described below with its columns, data types, and purpose.

### zessentials_users

Stores core player data. One row per player.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK | Player UUID |
| `name` | `VARCHAR(16)` | | Current player name |
| `last_location` | `TEXT` | | Serialized last known location |
| `play_time` | `BIGINT` | | Total play time |
| `ban_sanction_id` | `BIGINT` | | ID of the active ban in `zessentials_sanctions` |
| `mute_sanction_id` | `BIGINT` | | ID of the active mute in `zessentials_sanctions` |
| `vote` | `BIGINT` | | Total vote count |
| `vote_offline` | `INT` | | Votes received while offline |
| `frozen` | `BOOLEAN` | | Whether the player is currently frozen |
| `fly_seconds` | `BIGINT` | | Remaining temporary fly time in seconds |
| `player_time` | `BIGINT` | | Personal time set with `/ptime` (re-applied on join) |
| `player_weather` | `VARCHAR(32)` | | Personal weather set with `/pweather` (re-applied on join) |
| `created_at` | `TIMESTAMP` | | Account first seen |
| `updated_at` | `TIMESTAMP` | | Last data update |

### zessentials_economies

Stores per-player balances for each economy. Supports multiple currencies.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `economy_name` | `VARCHAR` | PK (composite) | Name of the economy/currency |
| `amount` | `DECIMAL(65,2)` | | Current balance |

### zessentials_economy_transactions

Logs all economy transactions between players or from the server.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `from_unique_id` | `UUID` | | Sender player UUID |
| `to_unique_id` | `UUID` | | Receiver player UUID |
| `economy_name` | `VARCHAR` | | Economy/currency name |
| `amount` | `DECIMAL(65,2)` | | Transaction amount |
| `from_amount` | `DECIMAL(65,2)` | | Sender balance after transaction |
| `to_amount` | `DECIMAL(65,2)` | | Receiver balance after transaction |
| `reason` | `TEXT` | | Transaction reason or description |

### zessentials_user_homes

Stores player home locations.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `name` | `VARCHAR` | PK (composite) | Home name |
| `location` | `TEXT` | | Serialized location (world, x, y, z, yaw, pitch) |
| `material` | `VARCHAR` | | Display icon material for GUI |
| `is_public` | `BOOLEAN` | | Whether the home is public (`/homepublic`) and can be visited by everyone |
| `category` | `VARCHAR(32)` | | Home category (`/homecategory`) |
| `is_favorite` | `BOOLEAN` | | Whether the home is marked as favorite (`/homefavorite`) |

### zessentials_user_home_shares

Stores the homes shared with specific players (`/homeshare`). Shares are deleted when the home is deleted.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `owner_id` | `UUID` | PK (composite) | UUID of the home owner |
| `home_name` | `VARCHAR` | PK (composite) | Name of the shared home |
| `target_id` | `UUID` | PK (composite) | UUID of the player the home is shared with |

### zessentials_user_ignores

Stores the players ignored with `/ignore` (private messages, teleport requests and text mails are blocked).

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | UUID of the player who ignores |
| `ignored_id` | `UUID` | PK (composite) | UUID of the ignored player |

### zessentials_sanctions

Stores all sanction records (bans, mutes, kicks) with full history.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto increment) | Sanction ID |
| `player_unique_id` | `UUID` | | Sanctioned player UUID |
| `sender_unique_id` | `UUID` | | UUID of the staff member who issued the sanction |
| `sanction_type` | `VARCHAR` | | Type of sanction (BAN, MUTE, KICK, etc.) |
| `reason` | `TEXT` | | Reason for the sanction |
| `duration` | `BIGINT` | | Duration in milliseconds |
| `expired_at` | `TIMESTAMP` | | When the sanction expires |

### zessentials_chat_message

Logs chat messages sent by players.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | | Player UUID |
| `content` | `TEXT` | | Message content |
| `created_at` | `TIMESTAMP` | | When the message was sent |

### zessentials_private_messages

Logs private messages between players.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `sender_unique_id` | `UUID` | | Sender player UUID |
| `receiver_unique_id` | `UUID` | | Receiver player UUID |
| `content` | `TEXT` | | Message content |

### zessentials_commands

Logs commands executed by players (when `enable-command-log` is enabled).

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | | Player UUID |
| `command` | `TEXT` | | Full command string |
| `created_at` | `TIMESTAMP` | | When the command was executed |

### zessentials_user_mail_boxes

Stores items waiting in a player's mailbox (item mailbox).

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto increment) | Mailbox entry ID |
| `unique_id` | `UUID` | | Recipient player UUID |
| `itemstack` | `TEXT` | | Serialized ItemStack data |
| `expired_at` | `TIMESTAMP` | | When the mailbox item expires |

### zessentials_user_mail_messages

Stores the **text mails** sent with `/mail send` and `/mail sendall`.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto increment) | Mail ID |
| `unique_id` | `UUID` | | Recipient player UUID |
| `sender_id` | `UUID` | | Sender UUID (null when sent by the console) |
| `sender_name` | `VARCHAR(36)` | | Sender name |
| `content` | `TEXT` | | Mail content |
| `is_read` | `BOOLEAN` | | Whether the mail has been read (`/mail read`) |
| `created_at` | `TIMESTAMP` | | When the mail was sent |

### zessentials_vaults

Stores vault metadata for player storage vaults.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `vault_id` | `BIGINT` | PK (composite) | Vault number |
| `name` | `VARCHAR` | | Custom vault name |
| `icon` | `TEXT` | | Display icon for GUI |

### zessentials_vault_items

Stores individual items within player vaults.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `vault_id` | `BIGINT` | PK (composite) | Vault number |
| `slot` | `BIGINT` | PK (composite) | Item slot within the vault |
| `item` | `TEXT` | | Serialized ItemStack data |
| `quantity` | `BIGINT` | | Item stack quantity |

### zessentials_player_slots

Stores unlocked vault slot data per player.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK | Player UUID |
| `slots` | `BIGINT` | | Number of unlocked vault slots |

### zessentials_user_options

Stores per-player boolean option toggles (vanish, god, social spy, teleport toggles, ping sound...).

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK | Player UUID |
| `option_name` | `VARCHAR` | | Option identifier |
| `option_value` | `BOOLEAN` | | Current option state |

### zessentials_user_cooldowns

Stores per-player cooldown timers for commands and features.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `cooldown_name` | `VARCHAR` | PK (composite) | Cooldown identifier |
| `cooldown_value` | `BIGINT` | | Cooldown expiration timestamp in milliseconds |

### zessentials_user_play_times

Tracks individual play sessions with connection metadata.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | | Player UUID |
| `play_time` | `BIGINT` | | Session duration |
| `address` | `VARCHAR` | | Player IP address for the session |

### zessentials_user_power_tools

Stores power tool bindings that map materials to commands.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `material` | `VARCHAR` | PK (composite) | Minecraft material name |
| `command` | `TEXT` | | Command to execute on item use |

### zessentials_steps

Tracks player progression through the steps of the Step module.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `step_name` | `VARCHAR` | PK (composite) | Step identifier |
| `data` | `JSON` | | Arbitrary step data |
| `play_time_start` | `BIGINT` | | Play time when the step started |
| `play_time_end` | `BIGINT` | | Play time when the step ended |
| `play_time_between` | `BIGINT` | | Play time spent between start and end |
| `finished_at` | `TIMESTAMP` | | When the step was completed (null if in progress) |

### zessentials_vote_sites

Tracks per-player vote timestamps for each voting site.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `player_id` | `UUID` | PK (composite) | Player UUID |
| `site` | `VARCHAR` | PK (composite) | Vote site identifier |
| `last_vote_at` | `TIMESTAMP` | | Timestamp of the last vote on this site |

### zessentials_link_accounts

Stores verified Discord-to-Minecraft account links.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `user_id` | `BIGINT` | PK (composite) | Discord user ID |
| `unique_id` | `UUID` | PK (composite) | Minecraft player UUID |
| `minecraft_name` | `VARCHAR(16)` | | Minecraft player name |
| `discord_name` | `VARCHAR(32)` | | Discord username |

### zessentials_link_codes

Stores temporary linking codes used during the account linking process.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `code` | `VARCHAR` | PK (composite) | Temporary linking code |
| `user_id` | `BIGINT` | PK (composite) | Discord user ID |
| `discord_name` | `VARCHAR(32)` | | Discord username |

### zessentials_link_histories

Audit log of all account link and unlink actions.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto increment) | History entry ID |
| `action` | `VARCHAR` | | Action type (LINK, UNLINK, etc.) |
| `discord_id` | `BIGINT` | | Discord user ID |
| `minecraft_id` | `UUID` | | Minecraft player UUID |
| `discord_name` | `VARCHAR(32)` | | Discord username at time of action |
| `minecraft_name` | `VARCHAR(16)` | | Minecraft name at time of action |
| `data` | `TEXT` | | Additional action metadata |

### zessentials_storages

Generic key-value storage for plugin-internal server data.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `name` | `VARCHAR` | PK | Storage key |
| `content` | `TEXT` | | Serialized storage value |

<CalloutContainer type="info">

<CalloutDescription>
Unless stated otherwise, most tables also contain `created_at` and `updated_at` timestamp columns.
</CalloutDescription>

</CalloutContainer>

## Performance Optimizations

zEssentials implements several layers of write optimization to minimize database load and keep gameplay responsive.

### Batch Processing (TypeSafeCache)

Logs and frequent updates are not written to the database one by one. Command logs, chat messages, private messages, economy transactions and fly time updates are accumulated in a `TypeSafeCache` and flushed to the database in batches at a configurable interval:

```yaml
batch-auto-save: 10000 # Flush interval in milliseconds
```

The default flush interval is **10 seconds** (`10000` ms). This dramatically reduces the number of database round-trips compared to writing each entry individually.

### Economy Update Coalescing

Economy balance updates are coalesced per player and per economy with an `AtomicReference`. When several operations target the same balance in quick succession (e.g. rapid shop transactions), a pending write is reused and only the latest value is persisted. This prevents write amplification while guaranteeing that the database always reflects the correct final balance.

### Asynchronous Writes

All other database writes (homes, options, vault items, sanctions...) are executed asynchronously so that the main server thread is never blocked by a database query.

## Migration System

zEssentials uses a sequential migration system (provided by the [Sarah](https://github.com/Maxlego08/Sarah) library) to manage database schema changes across versions. Applied migrations are recorded in the `zessentials_migrations` table, so only new migrations run on startup.

There are currently **37 registered migrations**:

| Step | Migrations |
|------|------------|
| Core tables | `users`, `storages`, `user_options`, `user_cooldowns`, `economies`, `economy_transactions`, `user_homes` |
| Social | `user_ignores`, `user_home_shares` |
| Sanctions & logs | `sanctions`, `ban_sanction_id`/`mute_sanction_id` columns on `users`, `chat_message`, `commands`, `user_play_times` |
| Player features | `user_power_tools`, `user_mail_boxes`, `vote`/`vote_offline` columns, `vote_sites` |
| Vaults | `vault_items`, `vaults`, `player_slots` |
| User columns | `frozen`, `fly_seconds`, `player_time`/`player_weather` columns on `users` |
| Homes | `is_public`, `category`, `is_favorite` columns on `user_homes` |
| Economy | `reason` column on `economy_transactions` |
| Discord | `link_codes`, `link_accounts`, `link_histories` |
| Refactoring | `user_power_tools` (v2, composite primary key), `player_slots` update, `private_messages`, `steps` (v2 with play time columns) |
| Mailbox | `user_mail_messages` (text mails) |

Migrations run automatically on server startup. No manual intervention is required. If you are upgrading from an older version, the plugin applies only the migrations that have not yet been executed.

<CalloutContainer type="info">

<CalloutDescription>
Never manually modify the migration tracking table or skip migrations. Doing so can leave your database in an inconsistent state. If you encounter migration errors, check the server console for details and report the issue on [GitHub](https://github.com/Maxlego08/zEssentials) or [Discord](https://discord.groupez.dev).
</CalloutDescription>

</CalloutContainer>
