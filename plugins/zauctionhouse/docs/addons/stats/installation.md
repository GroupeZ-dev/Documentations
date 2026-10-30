---
title: Installing zAuctionHouseStats
description: How to install zAuctionHouseStats, configure its database and verify that statistics are collected
---

# Installing zAuctionHouseStats

This guide covers installing the zAuctionHouseStats addon, choosing its storage, and checking that statistics are being collected.

## Requirements

### Server Requirements

| Requirement | Version |
|-------------|---------|
| **Java** | 21 or higher |
| **Minecraft** | 1.21+ (`api-version: 1.21`) |
| **Server software** | Paper and its forks, Folia (`folia-supported: true`) |

### Required Plugins

These plugins are declared in the `depend` list of `plugin.yml`: the addon will not load without them.

| Plugin | Notes |
|--------|-------|
| **zAuctionHouse** | Version 4 only. The addon refuses to start with an older zAuctionHouse, or if zAuctionHouse itself is disabled (for example after a database failure on its side). |
| **zMenu** | Provides the statistics menus. The addon disables itself if zMenu is not working. |

### Optional Plugins

| Plugin | Notes |
|--------|-------|
| **PlaceholderAPI** | Declared as `softdepend`. When it is enabled, the `zahstats` expansion is registered automatically. See [Placeholders](/zauctionhouse/addons/stats/placeholders). |

### Libraries

The JDBC drivers are declared in the `libraries` section of `plugin.yml`, so the server downloads them on the first start. You do not need to install anything else.

| Library | Version |
|---------|---------|
| `org.mariadb.jdbc:mariadb-java-client` | 3.5.6 |
| `org.xerial:sqlite-jdbc` | 3.46.0.0 |

<CalloutContainer type="info">

<CalloutTitle>zAuctionHouse stats events</CalloutTitle>

<CalloutDescription>
The addon collects statistics through events exposed by zAuctionHouse. If your zAuctionHouse build does not expose them yet, the addon stops with an error unless you explicitly allow the degraded logs polling mode (`collection.polling.enabled: true`). Keep zAuctionHouse up to date to get exact statistics. See [Configuration](/zauctionhouse/addons/stats/configuration).
</CalloutDescription>

</CalloutContainer>

## Installation Steps

### 1. Install the Jar

Place `zAuctionHouseStats.jar` in your server's `plugins/` folder, next to `zAuctionHouse.jar` and `zMenu.jar`.

### 2. Start Your Server

Start the server once to generate the default files. With the default settings (SQLite), the addon works immediately.

### 3. Configure Storage and Timezone

Edit `plugins/zAuctionHouseStats/config.yml`:

- choose the [storage type](#storage) (SQLite for a single server, MySQL/MariaDB for a network);
- set the [timezone](#timezone) **before** any statistics are recorded or imported.

### 4. Restart Your Server

Some settings are only read at startup: `storage-type` and `database-configuration`, `collection.*`, `statistics.timezone`, `statistics.save-itemstacks`, `retention.sales-days` and `language.yml`. `/zahstats reload` does not apply them (it prints a "restart required" warning in the console). Restart the server after changing them.

## File Structure

After the first start, zAuctionHouseStats creates the following structure:

```
plugins/zAuctionHouseStats/
├── language.yml            # Language of the generated files (auto, en, fr, es, it)
├── config.yml              # Main configuration
├── messages.yml            # All addon messages
├── inventories/
│   ├── stats.yml           # Statistics hub (/ah stats)
│   ├── leaderboard.yml     # Leaderboards
│   ├── player-stats.yml    # Player statistics
│   ├── item-prices.yml     # Item price explorer (/zahstats items)
│   └── admin.yml           # Admin status menu
├── patterns/
│   ├── zahstats-back.yml
│   └── zahstats-pagination.yml
└── database.db             # SQLite database (if using SQLite)
```

### Language

`language.yml` is read **before** any other file is generated. It selects the language of `messages.yml`, `inventories/` and `patterns/`.

| Value | Language |
|-------|----------|
| `auto` | Detected from the server locale (default): French-speaking countries give `fr`, Spanish-speaking countries `es`, Italy/San Marino/Vatican `it`, anything else `en` |
| `en` | English |
| `fr` | French |
| `es` | Spanish |
| `it` | Italian |

Any other value prints a warning and falls back to English. `config.yml` is always generated in its default version, whatever the language.

<CalloutContainer type="warning">

<CalloutTitle>Changing the language later</CalloutTitle>

<CalloutDescription>
The language only applies to files that do not exist yet. To switch language, delete `messages.yml` and the `inventories/` and `patterns/` folders, then restart the server. `/zahstats reload` does not change the language.
</CalloutDescription>

</CalloutContainer>

## Storage

zAuctionHouseStats uses **its own database connection**. It never writes into the zAuctionHouse tables: all its tables use their own prefix.

```yaml
# SQLITE | MYSQL | MARIADB
storage-type: SQLITE

database-configuration:
  table-prefix: "zahstats_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zauctionhouse
  max-pool-size: 4
  min-idle: 2
  debug: false
```

| Key | Default | Description |
|-----|---------|-------------|
| `storage-type` | `SQLITE` | `SQLITE`, `MYSQL` or `MARIADB`. Any other value prevents the addon from starting. |
| `database-configuration.table-prefix` | `zahstats_` | Prefix of every table created by the addon. Only letters, digits and `_` are allowed. |
| `database-configuration.host` | `192.168.10.10` | MySQL/MariaDB host. |
| `database-configuration.port` | `3306` | MySQL/MariaDB port. |
| `database-configuration.user` | `homestead` | Database user. |
| `database-configuration.password` | `secret` | Database password. |
| `database-configuration.database` | `zauctionhouse` | Database name. |
| `database-configuration.max-pool-size` | `4` | Maximum connections in the pool (MySQL/MariaDB only, minimum `1`). |
| `database-configuration.min-idle` | `2` | Idle connections kept in the pool (MySQL/MariaDB only, minimum `0`). |
| `database-configuration.debug` | `false` | Prints every SQL request in the console. |

### SQLite

With `storage-type: SQLITE`, the data is stored in `plugins/zAuctionHouseStats/database.db`. No other setting is needed. SQLite is meant for a **single server**.

### MySQL / MariaDB

Set `storage-type` to `MYSQL` or `MARIADB` and fill in the connection details. You can use the same database as zAuctionHouse: the addon tables are kept apart by their prefix (`zahstats_` by default).

With MySQL/MariaDB, the addon always uses a HikariCP connection pool sized by `max-pool-size` and `min-idle`.

If the connection or the migrations fail (or do not complete within 60 seconds), the addon disables itself and prints the reason in the console. It never runs in a degraded mode without storage.

### Shared `database-configuration.yml`

If a `database-configuration.yml` file exists at the **root of the server** (the same file used by zAuctionHouse V4 and other GroupeZ plugins), it takes priority over `config.yml` **key by key**: each key it defines replaces the one in `config.yml`, missing keys fall back to `config.yml`.

The following keys are read from this file, under the `database-configuration` section:

| Key | Read from the shared file |
|-----|---------------------------|
| `host`, `port`, `user`, `password`, `database`, `debug` | Yes |
| `table-prefix` | **No**, always read from the addon `config.yml` |
| `max-pool-size`, `min-idle` | No, always read from the addon `config.yml` |
| `storage-type` | No, always read from the addon `config.yml` |

When the file is detected, the console shows:

```
Using the server-wide database-configuration.yml for database credentials (table-prefix is still read from config.yml).
```

If the file exists but cannot be read, a warning is printed and the values of `config.yml` are used instead.

<CalloutContainer type="info">

<CalloutTitle>Why the prefix is not shared</CalloutTitle>

<CalloutDescription>
`database-configuration.yml` is shared between several plugins. Reading its prefix would mix the addon tables with those of the other plugins, so the addon always uses its own `table-prefix`.
</CalloutDescription>

</CalloutContainer>

### Tables Created

On startup, the addon runs its migrations and creates the following tables (shown with the default `zahstats_` prefix):

| Table | Content |
|-------|---------|
| `zahstats_sales` | One row per sale |
| `zahstats_listings` | One row per listed item |
| `zahstats_player_stats` | All-time totals per player and economy |
| `zahstats_player_names` | Last known name of each player |
| `zahstats_player_daily` | Daily totals per player (DAY / WEEK / MONTH periods) |
| `zahstats_global_daily` | Daily server-wide totals per economy |
| `zahstats_global_stats` | Server-wide all-time statistics |
| `zahstats_import_state` | Progress of `/zahstats import` |
| `zahstats_migrations` | Migration registry |

The migration registry follows the prefix (`<prefix>migrations`; with an empty prefix it is `zahstats_migrations`). It is never the generic `migrations` table nor the zAuctionHouse one, so the addon can safely share a database with zAuctionHouse. After the migrations, the addon checks that all tables exist; if one is missing while the registry marks it as created, the addon stops and tells you to drop that registry table (or restore the missing tables) and restart.

<CalloutContainer type="warning">

<CalloutTitle>Changing the table prefix</CalloutTitle>

<CalloutDescription>
Changing `table-prefix` on an existing database creates a new, **empty** set of tables under the new prefix. The old tables are neither renamed nor migrated.
</CalloutDescription>

</CalloutContainer>

## Timezone

Statistics for the `DAY`, `WEEK` and `MONTH` periods are grouped by day. The timezone used to cut those days is set in `config.yml`:

```yaml
statistics:
  # Empty = server timezone. Example: "Europe/Paris".
  timezone: ""
```

| Value | Behavior |
|-------|----------|
| `""` (default) | Uses the timezone of the server |
| A zone ID, e.g. `Europe/Paris` | Uses this timezone |
| An invalid zone ID | The addon refuses to start |

<CalloutContainer type="error">

<CalloutTitle>Set it once, before any data</CalloutTitle>

<CalloutDescription>
Set the timezone **before the first start with real traffic and before running any `/zahstats import`**: imported history is also grouped by day with this timezone. Never change it afterwards: days already stored are not recalculated. The change also requires a restart (`/zahstats reload` only prints a warning).
</CalloutDescription>

</CalloutContainer>

The same timezone is used to display dates in the date placeholders (`placeholders.date-format`).

## Multi-Server

When several servers share one auction house (see the [zAuctionHouse Redis](/zauctionhouse/addons/redis/introduction) addon):

- use **`MYSQL` or `MARIADB`** and point every server to the **same database** with the **same `table-prefix`**. Counters are written as atomic increments, so several servers can write at the same time;
- **do not use SQLite**: each server would only see its own statistics. If the zAuctionHouseRedis addon is installed while the addon uses SQLite, a warning is printed at startup;
- each sale keeps the server name configured in zAuctionHouse;
- use the same `statistics.timezone` on every server;
- if you have to use the degraded logs polling mode (`collection.mode: LOGS_POLLING`), enable `collection.polling.enabled` on **one server only**. Servers with `LOGS_POLLING` and polling disabled collect nothing and print a warning.

## Verify Installation

### Console

A successful start prints lines similar to:

```
Storage ready (SQLITE, prefix 'zahstats_').
Statistics collection: zAuctionHouse stats events.
zMenu inventories loaded (language: en).
PlaceholderAPI expansion 'zahstats' registered.
zAuctionHouseStats 2.0.0 enabled.
```

The PlaceholderAPI line only appears when PlaceholderAPI is installed.

### In Game

| Command | What to check |
|---------|---------------|
| `/zahstats` or `/zahstats help` (alias `/zahs`) | Lists the subcommands you have access to |
| `/ah stats` | Opens the statistics hub (subcommand added to the zAuctionHouse command by the addon) |
| `/zahstats top <metric>` | Shows a leaderboard in chat |
| `/zahstats player [name]` | Shows the statistics of a player |
| `/ah price` | Shows the price statistics of the item in your hand |

All permissions default to operators. The admin menu (`admin.yml`, opened from the hub with `zauctionhouse.stats.admin`) shows the storage type, the collection mode and the state of the write queue and caches.

Statistics are written to the database every few seconds (`flush.interval-seconds`, `2` by default, or earlier once `flush.max-pending` events are waiting). On the server where the sale happens, player statistics already in cache and the global statistics are updated immediately. Leaderboards are recalculated when their cache expires (`caches.leaderboard-ttl-seconds`, `60` by default) and item prices every hour (`caches.material-price-ttl-seconds`, `3600`), so a new sale can take that long to appear there. Use `/zahstats clearcache` to force an immediate refresh of the caches.

See [Commands & Permissions](/zauctionhouse/addons/stats/commands-permissions) for the full reference.

## Upgrading from V1

zAuctionHouseStats V2 only works with zAuctionHouse V4. Your V1 history (`zah_*` tables) and the zAuctionHouse V4 logs can be imported into the new tables with `/zahstats import v1` and `/zahstats import v4logs`: without `confirm` the command only shows a preview (estimated rows and duration), `/zahstats import <v1|v4logs> confirm` starts the import. V1 placeholders keep working through compatibility aliases (`placeholders.enable-v1-aliases`).

Set the [timezone](#timezone) before importing, then follow the [Migration](/zauctionhouse/addons/stats/migration) guide.

## Next Steps

- [Commands & Permissions](/zauctionhouse/addons/stats/commands-permissions) - Full command reference
- [Placeholders](/zauctionhouse/addons/stats/placeholders) - Display statistics anywhere
- [Configuration](/zauctionhouse/addons/stats/configuration) - All `config.yml` options
- [Inventories](/zauctionhouse/addons/stats/inventories) - Customize the menus
