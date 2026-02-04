---
sidebar_position: 5
title: Database
description: Database architecture, tables, and storage backends for zEssentials
---

# Database

zEssentials uses a relational database to persist all player data, economies, sanctions, vaults, and more. This page covers the available storage backends, the full database schema, performance optimizations, and the migration system.

## Storage Backends

zEssentials supports three storage backends. Configure the `storage-type` option in `config.yml` to select your backend.

### SQLITE

SQLite is the default backend, storing data in a local file at `plugins/zEssentials/storage.db`. It requires no external database server.

```yaml
storage-type: SQLITE
```

:::warning
SQLite is intended for **testing and development only**. It has significant limitations compared to MySQL-based backends:
- No support for `LEFT JOIN` queries, which disables certain features that rely on cross-table lookups
- Single-writer concurrency model, which can cause lock contention under load
- Not suitable for multi-server setups (cannot be shared across servers)

**Do not use SQLite in production.** Switch to MYSQL or HIKARICP before going live.
:::

### MYSQL

Direct MySQL/MariaDB connection. Suitable for small to medium servers that do not require connection pooling.

```yaml
storage-type: MYSQL

database-configuration:
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zessentials
  table-prefix: zessentials_
  useSSL: false
```

This backend opens a new database connection for each operation. It works well for servers with moderate player counts but may become a bottleneck under heavy concurrent load.

### HIKARICP

HikariCP provides high-performance JDBC connection pooling on top of MySQL/MariaDB. This is the **recommended backend for production** environments.

```yaml
storage-type: HIKARICP

database-configuration:
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zessentials
  table-prefix: zessentials_
  useSSL: false
```

HikariCP maintains a pool of reusable database connections, dramatically reducing connection overhead on high-traffic servers. Benefits include:
- Connection reuse eliminates the cost of establishing new connections per query
- Automatic connection health checks and eviction of stale connections
- Configurable pool sizing to match your server's workload
- Significantly lower latency for database operations under concurrent access

:::tip Recommended
For any server expecting real players, use **HIKARICP**. It handles concurrent database access far more efficiently than a direct MYSQL connection and is required for optimal performance on networks with multiple servers.
:::

### Configuration Reference

| Property | Default Value | Description |
|----------|---------------|-------------|
| `host` | `192.168.10.10` | Database server hostname or IP address |
| `port` | `3306` | Database server port |
| `user` | `homestead` | Database username |
| `password` | `secret` | Database password |
| `database` | `zessentials` | Database name (must already exist) |
| `table-prefix` | `zessentials_` | Prefix applied to all table names |
| `useSSL` | `false` | Whether to use SSL for the database connection |

:::warning
Always change the default credentials before deploying to production. The values shown above are placeholders only.
:::

## Database Tables

zEssentials creates **22 tables** (using the default `zessentials_` prefix). Each table is described below with its columns, data types, and purpose.

### zessentials_users

Stores core player data. One row per player.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK | Player UUID |
| `name` | `VARCHAR` | | Current player name |
| `last_location` | `VARCHAR` | | Serialized last known location |
| `play_time` | `BIGINT` | | Total play time in milliseconds |
| `fly_seconds` | `BIGINT` | | Remaining temporary fly time in seconds |
| `frozen` | `BOOLEAN` | | Whether the player is currently frozen |
| `ban_sanction_id` | `BIGINT` | | FK to active ban in `zessentials_sanctions` |
| `mute_sanction_id` | `BIGINT` | | FK to active mute in `zessentials_sanctions` |
| `vote` | `BIGINT` | | Total online vote count |
| `vote_offline` | `BIGINT` | | Votes received while offline |
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
| `reason` | `VARCHAR` | | Transaction reason or description |

### zessentials_user_homes

Stores player home locations.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `name` | `VARCHAR` | PK (composite) | Home name |
| `location` | `VARCHAR` | | Serialized location (world, x, y, z, yaw, pitch) |
| `material` | `VARCHAR` | | Display icon material for GUI |

### zessentials_sanctions

Stores all sanction records (bans, mutes, kicks) with full history.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto increment) | Sanction ID |
| `player_unique_id` | `UUID` | | Sanctioned player UUID |
| `sender_unique_id` | `UUID` | | Staff member UUID who issued the sanction |
| `sanction_type` | `VARCHAR` | | Type of sanction (BAN, MUTE, KICK, etc.) |
| `reason` | `VARCHAR` | | Reason for the sanction |
| `duration` | `BIGINT` | | Duration in milliseconds (0 for permanent) |
| `expired_at` | `TIMESTAMP` | | When the sanction expires (null for permanent) |

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

Logs commands executed by players.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | | Player UUID |
| `command` | `TEXT` | | Full command string |
| `created_at` | `TIMESTAMP` | | When the command was executed |

### zessentials_user_mail_boxes

Stores items waiting in a player's mailbox for offline delivery.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto increment) | Mailbox entry ID |
| `unique_id` | `UUID` | | Recipient player UUID |
| `itemstack` | `TEXT` | | Serialized ItemStack data |
| `expired_at` | `TIMESTAMP` | | When the mailbox item expires |

### zessentials_vaults

Stores vault metadata for player storage vaults.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `vault_id` | `INT` | PK (composite) | Vault slot number |
| `name` | `VARCHAR` | | Custom vault name |
| `icon` | `VARCHAR` | | Display icon material for GUI |

### zessentials_vault_items

Stores individual items within player vaults.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `vault_id` | `INT` | PK (composite) | Vault slot number |
| `slot` | `INT` | PK (composite) | Item slot within the vault |
| `item` | `TEXT` | | Serialized ItemStack data |
| `quantity` | `INT` | | Item stack quantity |

### zessentials_player_slots

Stores unlocked vault slot data per player.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK | Player UUID |
| `slots` | `INT` | | Number of unlocked vault slots |

### zessentials_user_options

Stores per-player boolean option toggles (e.g., toggle chat, toggle PM).

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `option_name` | `VARCHAR` | PK (composite) | Option identifier |
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
| `play_time` | `BIGINT` | | Session duration in milliseconds |
| `address` | `VARCHAR` | | Player IP address for the session |

### zessentials_user_power_tools

Stores power tool bindings that map materials to commands.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `material` | `VARCHAR` | PK (composite) | Minecraft material name |
| `command` | `VARCHAR` | | Command to execute on item use |

### zessentials_steps

Tracks player progression through step-based systems (e.g., quests, tutorials).

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | Player UUID |
| `step_name` | `VARCHAR` | PK (composite) | Step identifier |
| `data` | `JSON` | | Arbitrary step data |
| `play_time_start` | `BIGINT` | | Play time when the step started |
| `play_time_end` | `BIGINT` | | Play time when the step must end |
| `play_time_between` | `BIGINT` | | Required play time between start and end |
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
| `user_id` | `VARCHAR` | PK (composite) | Discord user ID |
| `unique_id` | `UUID` | PK (composite) | Minecraft player UUID |
| `minecraft_name` | `VARCHAR` | | Minecraft player name |
| `discord_name` | `VARCHAR` | | Discord username |

### zessentials_link_codes

Stores temporary linking codes used during the account linking process.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `code` | `VARCHAR` | PK (composite) | Temporary linking code |
| `user_id` | `VARCHAR` | PK (composite) | Discord user ID |
| `discord_name` | `VARCHAR` | | Discord username |

### zessentials_link_histories

Audit log of all account link and unlink actions.

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto increment) | History entry ID |
| `action` | `VARCHAR` | | Action type (LINK, UNLINK, etc.) |
| `discord_id` | `VARCHAR` | | Discord user ID |
| `minecraft_id` | `UUID` | | Minecraft player UUID |
| `discord_name` | `VARCHAR` | | Discord username at time of action |
| `minecraft_name` | `VARCHAR` | | Minecraft name at time of action |
| `data` | `TEXT` | | Additional action metadata |

### zessentials_storages

Generic key-value storage for plugin-internal data (e.g., serialized warps, spawn locations).

| Column | Type | Key | Description |
|--------|------|-----|-------------|
| `name` | `VARCHAR` | PK | Storage key |
| `content` | `LONGTEXT` | | Serialized storage value |

## Performance Optimizations

zEssentials implements several layers of write optimization to minimize database load and ensure responsive gameplay.

### Batch Processing (TypeSafeCache)

Player data is not written to the database on every change. Instead, modifications are accumulated in a `TypeSafeCache` and flushed to the database in batches at a configurable interval.

```yaml
batch-auto-save: 10 # Flush interval in seconds
```

The default flush interval is **10 seconds**. During each flush cycle, all pending changes across all players are written in a single batch operation. This dramatically reduces the number of database round-trips compared to writing each change individually.

If the server shuts down gracefully, all pending changes are flushed immediately before the connection is closed.

### Vault Item Debouncing

When players move items within vaults, rapid slot changes can generate dozens of database writes per second. zEssentials uses a **200ms debounce window** backed by a `ConcurrentHashMap` cache to coalesce rapid vault item updates.

When a vault slot changes, the update is placed into the cache. If the same slot changes again within 200ms, the previous pending write is replaced. Only the final state of each slot is written to the database, eliminating redundant intermediate writes.

### Economy Update Debouncing

Economy balance updates use an `AtomicReference` queue to debounce rapid successive changes to the same player's balance. When multiple economy operations target the same player in quick succession (e.g., rapid shop transactions), only the final balance state is persisted. This prevents write amplification while guaranteeing that the database always reflects the correct final balance.

### ExpiringCache for Redis

When running in multi-server mode with Redis, zEssentials uses an `ExpiringCache` with a **30-second TTL** to avoid redundant Redis lookups. Frequently accessed data (such as player balances or online status) is cached locally and only refreshed from Redis when the cache entry expires. This reduces Redis network traffic and query latency while still keeping data reasonably fresh across servers.

## Migration System

zEssentials uses a sequential migration system to manage database schema changes across versions. Each migration is numbered and executed in order. The plugin tracks which migrations have already been applied, so only new migrations run on startup.

There are currently **32 sequential migrations** that build up the full schema:

1. **Migrations 1-4** -- Create the core tables: `users`, `economies`, `user_homes`, and `sanctions`
2. **Migrations 5-8** -- Add logging tables: `chat_message`, `private_messages`, `commands`, and `economy_transactions`
3. **Migrations 9-12** -- Add vault system tables: `vaults`, `vault_items`, `player_slots`, and `user_mail_boxes`
4. **Migrations 13-16** -- Add player option and cooldown tables: `user_options`, `user_cooldowns`, `user_play_times`, and `user_power_tools`
5. **Migrations 17-20** -- Add progression and voting tables: `steps`, `vote_sites`, and introduce new columns to existing tables
6. **Migrations 21-24** -- Add Discord linking tables: `link_accounts`, `link_codes`, `link_histories`
7. **Migrations 25-28** -- Add `storages` table and schema refinements (index additions, column type changes)
8. **Migrations 29-32** -- Latest schema adjustments including new columns for votes, fly time, and additional sanction fields

Migrations run automatically on server startup. No manual intervention is required. If you are upgrading from an older version, the plugin will detect the current schema state and apply only the migrations that have not yet been executed.

:::info
Never manually modify the migration tracking state or skip migrations. Doing so can leave your database in an inconsistent state. If you encounter migration errors, check the server console for details and report the issue on [GitHub](https://github.com/Maxlego08/zEssentials) or [Discord](https://discord.groupez.dev).
:::
