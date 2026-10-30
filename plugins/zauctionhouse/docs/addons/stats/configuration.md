---
title: Configuration
description: Complete reference of config.yml, messages.yml and language.yml for the zAuctionHouseStats addon
---

# Configuration

zAuctionHouseStats is configured with three files, all in `plugins/zAuctionHouseStats/`:

| File | Purpose |
|------|---------|
| `config.yml` | Storage, data collection, caches, leaderboards, statistics, retention, import and placeholder settings |
| `messages.yml` | Every chat message sent by the addon |
| `language.yml` | Language of the default `messages.yml`, `inventories/` and `patterns/` files generated on first start |

The menus (`inventories/` and `patterns/`) are documented on the [Inventories](/zauctionhouse/addons/stats/inventories) page.

<CalloutContainer type="info">

<CalloutDescription>
The addon uses its **own** database. It never writes to the zAuctionHouse tables. The default `table-prefix` is `zahstats_`.
</CalloutDescription>

</CalloutContainer>

## Default config.yml

This is the complete default `config.yml`. The comments are summarized in English here; the keys and default values are exactly the ones shipped with the addon.

```yaml
# Detailed debug logs (aggregated SQL queries, flush sizes, cache hits/misses).
debug: false

# Timing probes (flush durations, leaderboard refreshes...).
debug-performance: false

# Checks on startup whether a new version of the addon is available.
enable-version-checker: true

# Color shortcuts usable in messages.yml (<primary>, <secondary>, <error>, <success>).
# Same convention as zAuctionHouse V4 (message-colors).
message-colors:
  - key: <primary>
    color: '#24d65d'
  - key: <secondary>
    color: '#656665'
  - key: <error>
    color: '#ff0000'
  - key: <success>
    color: '#00ff00'

#=============================================================================
# STORAGE (the addon's OWN database - never the zAuctionHouse one)
#=============================================================================

# SQLITE | MYSQL | MARIADB
# SQLITE: local file in plugins/zAuctionHouseStats/ (single server).
# MYSQL/MARIADB: required for a cluster (several servers, one database).
storage-type: SQLITE

# If a database-configuration.yml file exists at the server root, it overrides
# this block KEY BY KEY (same convention as zAuctionHouse V4).
database-configuration:
  # Prefix of every table of the addon.
  # Changing it on an existing database creates a new EMPTY set of tables
  # (old tables are neither renamed nor migrated).
  table-prefix: "zahstats_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zauctionhouse
  # Hikari pool size (MySQL / MariaDB only).
  max-pool-size: 4
  min-idle: 2
  # Logs every SQL request in the console.
  debug: false

#=============================================================================
# COLLECTION (zAuctionHouse stats events, or polling of the logs table)
#=============================================================================

collection:
  # AUTO (default): uses the zAuctionHouse stats events if they exist;
  # otherwise falls back to polling the logs table ONLY if polling.enabled is
  # true (otherwise the addon disables itself).
  # EVENTS | LOGS_POLLING force a mode.
  mode: AUTO
  # Settings of the LOGS_POLLING mode only.
  polling:
    enabled: false
    interval-seconds: 60
    batch-size: 1000
    # true = decode item blobs to get material/amount (expensive, off the main thread).
    decode-itemstacks: false

#=============================================================================
# WRITE PATH
#=============================================================================

flush:
  # Interval between two writes of the event queue to the database, in seconds.
  interval-seconds: 2
  # Early flush as soon as N events are waiting (activity peak).
  max-pending: 100

#=============================================================================
# READ CACHES (used by commands, placeholders AND menus)
#=============================================================================

caches:
  leaderboard-ttl-seconds: 60
  player-stats-ttl-seconds: 60
  player-stats-offline-ttl-seconds: 60
  material-price-ttl-seconds: 3600
  global-stats-ttl-seconds: 60

#=============================================================================
# LEADERBOARDS
#=============================================================================

leaderboards:
  # Entries kept per leaderboard (the chat output of /zahstats top is capped at 10).
  # Bounded to [1, 100].
  size: 10
  # Name displayed when a player is unknown.
  unknown-name: "?"
  # Economy used when a money placeholder/menu does not specify one.
  # Empty = zAuctionHouse default economy.
  default-economy: ""
  # (metric, period) keys computed in the background on startup.
  # Form: { metric: <METRIC>, period: DAY|WEEK|MONTH|ALL[, economy: <name>] }
  preload:
    - { metric: TOP_SELLERS_MONEY, period: ALL }
    - { metric: TOP_SELLERS_MONEY, period: DAY }
    - { metric: TOP_BUYERS_MONEY, period: ALL }
  # Disabled metrics.
  disabled: []
  # Global switch for player heads in the menus.
  player-heads: true
  # Default head texture (base64) when a player profile cannot be found.
  # Empty = default client head.
  default-head-url: ""

#=============================================================================
# STATISTICS
#=============================================================================

statistics:
  # Time zone of the daily buckets (DAY/WEEK/MONTH periods).
  # Empty = server time zone. Example: "Europe/Paris".
  # NEVER CHANGE IT after the first start.
  timezone: ""

  # Store the full ItemStack (Base64) of every sale.
  save-itemstacks: false

  # Price statistics per material (/ah price, item-prices menu).
  material-prices:
    max-entries: 1000
    median-sample-limit: 50000

#=============================================================================
# PRICE EXPLORER (inventories/item-prices.yml)
#=============================================================================

item-prices:
  # Number of materials listed by the menu. Bounded to [1, 500].
  top-limit: 100

#=============================================================================
# RETENTION
#=============================================================================

retention:
  # Daily purge of sales and listings older than N days. 0 = unlimited (default).
  # Daily rollups and all-time totals are ALWAYS kept.
  sales-days: 0

#=============================================================================
# IMPORT / BACKFILL (/zahstats import v1|v4logs)
#=============================================================================

import:
  chunk-size: 500
  pause-between-chunks-ms: 50
  log-every-rows: 10000
  v1:
    server-name: "v1-import"
    listing-outcome-heuristic: true
    # Optional: if the zah_* tables live in another database.
    database:
      enabled: false
      type: MYSQL              # MYSQL | MARIADB | SQLITE
      host: localhost
      port: 3306
      user: ""
      password: ""
      database: ""
  v4logs:
    # Do not enable if 'import v1' is also used.
    include-migrated-v3: false
    resolve-amounts-from-transactions: true
    server-name-fallback: "v4-import"

#=============================================================================
# PLACEHOLDERS (fallback texts & format)
#=============================================================================

placeholders:
  loading: "Loading..."
  no-name: "✘"
  no-value: "0"
  not-applicable: "N/A"
  enable-not-applicable: true
  date-format: "dd/MM/yyyy HH:mm"
  enable-v1-aliases: true
```

## How invalid values are handled

The addon validates `config.yml` when it starts and on every `/zahstats reload`:

- **Values that would corrupt data permanently** (`storage-type`, `database-configuration.table-prefix`, `statistics.timezone`, `collection.mode`) are strict. An invalid value **refuses the startup** (the addon disables itself with a console error), or **aborts the reload** (the previous configuration stays active).
- **Tuning values** below their minimum are reset to their default with a console warning. Values with a range (`leaderboards.size`, `item-prices.top-limit`, `import.chunk-size`) are clamped to the nearest bound, also with a warning. `statistics.material-prices.max-entries` is raised to `item-prices.top-limit` if it is lower, and an invalid `placeholders.date-format` falls back to `dd/MM/yyyy HH:mm` (both with a warning).
- Two import values are corrected silently: a negative `import.pause-between-chunks-ms` becomes `0`, and an `import.log-every-rows` lower than `1` goes back to `10000`.
- Invalid entries of `leaderboards.preload` and `leaderboards.disabled` are ignored with a console warning.
- A YAML syntax error during `/zahstats reload` aborts the reload instead of silently falling back to the defaults.

## General

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `debug` | Boolean | `false` | Detailed debug logs: aggregated SQL queries, flush sizes, cache hits/misses. Also reports any database access made outside the addon's storage thread. |
| `debug-performance` | Boolean | `false` | Timing probes (flush durations, leaderboard refreshes). The key is read, but the current version of the addon does not emit any timing probe yet, so it has no visible effect. |
| `enable-version-checker` | Boolean | `true` | On startup, checks in the background whether a newer version of the addon is available on groupez.dev and writes the result in the console. Players with the `zplugin.notifs` permission then receive the `version-available` message when they join. Read on startup only. |
| `message-colors` | List | See below | Color shortcuts available in `messages.yml`. |

### message-colors

Each entry maps a shortcut tag to a hex color. The shortcut can then be used in any message of `messages.yml`.

```yaml
message-colors:
  - key: <primary>
    color: '#24d65d'
  - key: <secondary>
    color: '#656665'
  - key: <error>
    color: '#ff0000'
  - key: <success>
    color: '#00ff00'
```

| Shortcut | Default color |
|----------|---------------|
| `<primary>` | `#24d65d` |
| `<secondary>` | `#656665` |
| `<error>` | `#ff0000` |
| `<success>` | `#00ff00` |

- The four defaults above are always available: if the block is missing, or if an entry is removed from it, the default color of that shortcut is still used.
- You can override a default or add your own shortcut. The `key` can be written with or without brackets (`primary` and `<primary>` are the same).
- `color` is usually a hex color (`'#24d65d'`, turned into `<#24d65d>`). A value that starts with `<` is used as-is, so you can map a shortcut to any MiniMessage tag (for example `'<gradient:#24d65d:#00ff00>'`).

## Storage

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `storage-type` | `SQLITE` \| `MYSQL` \| `MARIADB` | `SQLITE` | Database type. Any other value refuses the startup. |
| `database-configuration.table-prefix` | String | `zahstats_` | Prefix of every table of the addon. Only letters, digits and `_` are allowed. |
| `database-configuration.host` | String | `192.168.10.10` | Database host (MySQL/MariaDB). |
| `database-configuration.port` | Integer | `3306` | Database port (MySQL/MariaDB). |
| `database-configuration.user` | String | `homestead` | Database user (MySQL/MariaDB). |
| `database-configuration.password` | String | `secret` | Database password (MySQL/MariaDB). |
| `database-configuration.database` | String | `zauctionhouse` | Database name (MySQL/MariaDB). |
| `database-configuration.max-pool-size` | Integer (min 1) | `4` | Maximum size of the connection pool (MySQL/MariaDB only). |
| `database-configuration.min-idle` | Integer (min 0) | `2` | Minimum idle connections of the pool (MySQL/MariaDB only). |
| `database-configuration.debug` | Boolean | `false` | Logs every SQL request in the console. |

- **SQLITE** stores the data in a local file, `plugins/zAuctionHouseStats/database.db`. It is meant for a single server. The `host`, `port`, `user`, `password`, `database`, `max-pool-size` and `min-idle` keys are ignored.
- **MYSQL / MARIADB** are required in a multi-server setup (several servers sharing one database). Counters are written as atomic increments, so several servers can write to the same database safely. If `zAuctionHouseRedis` is installed while the addon uses `SQLITE`, a console warning reminds you that each server will only see its own statistics.

<CalloutContainer type="warning">

<CalloutDescription>
Changing `table-prefix` on an existing database creates a new, **empty** set of tables under the new prefix. The old tables are neither renamed nor migrated.
</CalloutDescription>

</CalloutContainer>

### Shared database-configuration.yml

If a `database-configuration.yml` file exists at the **server root** (the server working directory), it overrides the `database-configuration` block of the addon **key by key**, the same way as zAuctionHouse V4. A key missing from that file falls back to the addon's `config.yml`.

The keys read from that file are `host`, `port`, `user`, `password`, `database` and `debug`, under a `database-configuration:` section.

<CalloutContainer type="info">

<CalloutDescription>
`table-prefix` is **never** read from the server-wide file: it always comes from the addon's `config.yml`, so the statistics tables never mix with the tables of other plugins that share that file. `max-pool-size` and `min-idle` are also only read from the addon's `config.yml`.
</CalloutDescription>

</CalloutContainer>

## Collection

The addon collects statistics from **one** source only, chosen once on startup: the zAuctionHouse stats events, or a polling of the zAuctionHouse logs table. It never uses both at the same time, so a sale is never counted twice.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `collection.mode` | `AUTO` \| `EVENTS` \| `LOGS_POLLING` | `AUTO` | Source of the statistics. Any other value refuses the startup. |
| `collection.polling.enabled` | Boolean | `false` | Allows this server to poll the zAuctionHouse logs table. |
| `collection.polling.interval-seconds` | Integer (min 5) | `60` | Interval between two polling passes, in seconds. |
| `collection.polling.batch-size` | Integer (min 1) | `1000` | Log rows read per polling pass. |
| `collection.polling.decode-itemstacks` | Boolean | `false` | Decodes the item of each log row to get its material and amount. Expensive, runs off the main thread. |

How the mode is resolved:

| `collection.mode` | zAuctionHouse exposes the stats events | `polling.enabled` | Result |
|-------------------|------------------------------------------|-------------------|--------|
| `AUTO` | Yes | Any | Events |
| `AUTO` | No | `true` | Logs polling |
| `AUTO` | No | `false` | The addon disables itself |
| `EVENTS` | Yes | Any | Events |
| `EVENTS` | No | Any | The addon disables itself |
| `LOGS_POLLING` | Any | `true` | Logs polling |
| `LOGS_POLLING` | Any | `false` | No collection on this server |

<CalloutContainer type="warning">

<CalloutDescription>
Logs polling is a **degraded** mode: amounts are approximate (the listing price is used, taxes are unknown) and expirations are not tracked. Update zAuctionHouse to get exact statistics through the events. In a multi-server setup, enable polling on **one** server only: set `mode: LOGS_POLLING` everywhere and `polling.enabled: true` on a single server.
</CalloutDescription>

</CalloutContainer>

## Flush

Events are queued in memory and written to the database in batches.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `flush.interval-seconds` | Integer (min 1) | `2` | Interval between two writes of the queue to the database, in seconds. |
| `flush.max-pending` | Integer (min 1) | `100` | Writes the queue early as soon as this many events are waiting. |

## Caches

Commands, placeholders and menus read from in-memory caches, never directly from the database. When an entry expires, it is refreshed asynchronously and readers keep the previous value meanwhile: a placeholder never waits for a database query. All durations are in seconds (minimum 1).

| Key | Default | Cached data |
|-----|---------|-------------|
| `caches.leaderboard-ttl-seconds` | `60` | A computed leaderboard (per metric, period and economy). |
| `caches.player-stats-ttl-seconds` | `60` | The statistics of a player (`/zahstats player`, `player-stats` menu, player placeholders). |
| `caches.player-stats-offline-ttl-seconds` | `60` | The statistics of an **offline** player looked up through a placeholder. |
| `caches.material-price-ttl-seconds` | `3600` | Price statistics per material (`/ah price`, `item-prices` menu, material placeholders) and the list of materials of the price explorer. |
| `caches.global-stats-ttl-seconds` | `60` | Server-wide statistics. Your own server's activity is reflected immediately; the value is re-read from the database at this interval to include the other servers of a cluster. |

## Leaderboards

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `leaderboards.size` | Integer [1, 100] | `10` | Number of entries kept per leaderboard. Menus paginate beyond 10 entries; the chat output of `/zahstats top` is capped at 10. Out-of-range values are clamped. |
| `leaderboards.unknown-name` | String | `?` | Name displayed when a player's name is unknown. |
| `leaderboards.default-economy` | String | `""` | Economy used when a money placeholder or menu does not specify one. Empty = the zAuctionHouse default economy. |
| `leaderboards.preload` | List | See below | Leaderboards computed in the background on startup. |
| `leaderboards.disabled` | List of metrics | `[]` | Disabled leaderboards. |
| `leaderboards.player-heads` | Boolean | `true` | Global switch for textured player heads in the menus. Can also be turned off per button (see [Inventories](/zauctionhouse/addons/stats/inventories)). |
| `leaderboards.default-head-url` | String (base64) | `""` | Head texture used when a player profile cannot be found. Empty = default client head. |

Available metrics (for `preload`, `disabled` and the commands):

| Metric | Description | Money metric |
|--------|-------------|--------------|
| `TOP_SELLERS_MONEY` | Money earned by sellers, after taxes | Yes |
| `TOP_BUYERS_MONEY` | Money spent by buyers, taxes included | Yes |
| `TOP_SELLERS_COUNT` | Number of completed sales as a seller | No |
| `TOP_BUYERS_COUNT` | Number of completed purchases as a buyer | No |
| `TOP_TAX_PAID` | Total taxes paid | Yes |
| `BIGGEST_SALE` | Biggest single sale received by a seller | Yes |

Available periods: `DAY` (today, since midnight), `WEEK` (since Monday), `MONTH` (since the 1st of the month) and `ALL` (all time). Periods are calendar windows in the `statistics.timezone` time zone.

### preload

Each entry is `{ metric: <METRIC>, period: <PERIOD>[, economy: <name>] }`:

```yaml
leaderboards:
  preload:
    - { metric: TOP_SELLERS_MONEY, period: ALL }
    - { metric: TOP_SELLERS_MONEY, period: DAY }
    - { metric: TOP_BUYERS_MONEY, period: ALL }
    - { metric: TOP_SELLERS_COUNT, period: WEEK, economy: vault }
```

- `period` is optional and defaults to `ALL`.
- Without `economy`, money metrics use the default economy and count metrics cover every economy.
- Preloading never blocks the server startup: until it is done, placeholders display `placeholders.loading`.
- An invalid entry (unknown metric or period) is ignored with a console warning. Disabled metrics are not preloaded.

### disabled

```yaml
leaderboards:
  disabled:
    - TOP_TAX_PAID
    - BIGGEST_SALE
```

A disabled metric is removed from the metric selector of the leaderboard menu, its `top` placeholders return `placeholders.not-applicable`, `/zahstats top` replies with the `top-disabled` message, and the API returns an empty list. Unknown metric names are ignored with a console warning.

## Statistics

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `statistics.timezone` | String | `""` | Time zone of the daily buckets used by the `DAY`, `WEEK` and `MONTH` periods, and of the dates displayed by placeholders. Empty = server time zone. Example: `"Europe/Paris"`. An invalid time zone refuses the startup. |
| `statistics.save-itemstacks` | Boolean | `false` | Stores the full item (Base64) of every sale. When `false`, only the queryable columns are written (material, amount, custom model data, category, item name), which keeps the sales table light. `true` makes the table much heavier. |
| `statistics.material-prices.max-entries` | Integer (min 1) | `1000` | Maximum number of entries of the per-material price cache (least recently used entries are evicted). It is never lower than `item-prices.top-limit`: a lower value is raised automatically with a warning. |
| `statistics.material-prices.median-sample-limit` | Integer (min 1) | `50000` | Maximum number of prices read to compute a median. |

<CalloutContainer type="error">

<CalloutDescription>
Do **not** change `statistics.timezone` once the addon has recorded data. Days that are already aggregated are not recalculated, so your daily, weekly and monthly statistics would be shifted.
</CalloutDescription>

</CalloutContainer>

## Price explorer

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `item-prices.top-limit` | Integer [1, 500] | `100` | Number of materials listed by the `item-prices` menu: the best-selling materials of the current selection (economy, period). Out-of-range values are clamped. |

## Retention

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `retention.sales-days` | Integer (min 0) | `0` | Daily purge of the individual sale and listing rows older than N days. `0` = keep everything. |

- The purge runs asynchronously once a day, starting 10 minutes after the server startup.
- Daily totals and all-time totals are **always** kept, so leaderboards and periods survive the purge.
- The `BIGGEST_SALE` leaderboard for the `DAY`, `WEEK` and `MONTH` periods is computed from the individual sales. With a value between 1 and 34, the monthly ranking becomes incomplete and a console warning is shown. Use `0` or at least `35`.
- You can also purge manually with `/zahstats purge <days> confirm` (see [Commands & Permissions](/zauctionhouse/addons/stats/commands-permissions)).

## Import

These settings are used by `/zahstats import v1` and `/zahstats import v4logs`. They are read again on every reload and apply to the next import. See [Migration](/zauctionhouse/addons/stats/migration) for the full procedure.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `import.chunk-size` | Integer [1, 500] | `500` | Source rows read per transaction. Out-of-range values are clamped. |
| `import.pause-between-chunks-ms` | Integer (min 0) | `50` | Pause between two chunks, in milliseconds, to limit the load on the database. |
| `import.log-every-rows` | Integer (min 1) | `10000` | How often a progress line is written to the console. |
| `import.v1.server-name` | String | `v1-import` | Server name given to the imported V1 rows. It keeps the V1 history separate in per-server statistics and marks where the rows come from. |
| `import.v1.listing-outcome-heuristic` | Boolean | `true` | Rebuilds the outcome of V1 listings (sold, expired...). |
| `import.v1.database.enabled` | Boolean | `false` | Reads the V1 `zah_*` tables from another database than the one in `database-configuration`. |
| `import.v1.database.type` | `MYSQL` \| `MARIADB` \| `SQLITE` | `MYSQL` | Type of that database. With `SQLITE`, `database` is the file name in the addon folder. |
| `import.v1.database.host` | String | `localhost` | Host of that database. |
| `import.v1.database.port` | Integer | `3306` | Port of that database. |
| `import.v1.database.user` | String | `""` | User of that database. |
| `import.v1.database.password` | String | `""` | Password of that database. |
| `import.v1.database.database` | String | `""` | Name of that database (or SQLite file name). |
| `import.v4logs.include-migrated-v3` | Boolean | `false` | Also imports the zAuctionHouse logs that were migrated from V3. Do **not** enable it if you also use `import v1`, or those purchases would be counted twice (the import is refused in that case). |
| `import.v4logs.resolve-amounts-from-transactions` | Boolean | `true` | Corrects the buyer and seller amounts from the zAuctionHouse transactions when possible. |
| `import.v4logs.server-name-fallback` | String | `v4-import` | Server name used when the original item row is missing. |

## Placeholders

These settings control the texts and format returned by the [placeholders](/zauctionhouse/addons/stats/placeholders). Some of them are also used by the menus and commands.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `placeholders.loading` | String | `Loading...` | Displayed while a value is not computed yet (cold cache). |
| `placeholders.no-name` | String | `✘` | Name displayed for a rank that has no player (the leaderboard is shorter than the requested rank). |
| `placeholders.no-value` | String | `0` | Value displayed when a number is missing (rank without a player, no player in the context). |
| `placeholders.not-applicable` | String | `N/A` | Displayed when the data does not exist (unknown economy, disabled leaderboard, no sale of a material, date that never happened). |
| `placeholders.enable-not-applicable` | Boolean | `true` | `false` hides the `not-applicable` text: placeholders display `0` instead, and the menus display `no-value` instead. |
| `placeholders.date-format` | String | `dd/MM/yyyy HH:mm` | Format of the dates shown by the placeholders, the `player-stats` menu and `/zahstats player` ([Java DateTimeFormatter](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/DateTimeFormatter.html) pattern), rendered in `statistics.timezone`. An invalid pattern falls back to the default with a warning. |
| `placeholders.enable-v1-aliases` | Boolean | `true` | Keeps the zAuctionHouseStats V1 placeholder names working. `false` disables this compatibility table. |

## messages.yml

`messages.yml` contains every chat message of the addon. It is generated on first start in the language selected by `language.yml`.

### Format

Messages use the same format as the zAuctionHouse V4 `messages.yml`:

- **MiniMessage**: `<red>`, `<bold>`, `<gradient:red:blue>`, `<hover:show_text:'text'>`, `<click:run_command:'/cmd'>`... See the [MiniMessage format](https://docs.advntr.dev/minimessage/format.html).
- **Hex colors**: `<#RRGGBB>`.
- **Color shortcuts**: `<primary>`, `<secondary>`, `<error>`, `<success>` and any shortcut you add in `config.yml` (`message-colors`).
- **Legacy codes**: `&a`, `&l`, `§c` and `&#RRGGBB` are tolerated (converted to MiniMessage) but not recommended.

Rules:

- `%prefix%` is replaced by the value of the `prefix` key. Set `prefix: ""` to disable the prefix.
- An **empty** message (`""`) is not sent.
- `price-informations` is a list: each line is sent as a separate message.
- A key missing from your file (for example after an update) uses the default value shipped with the addon, in the same language.
- Values that come from players (player names, typed economies...) are always displayed as plain text: MiniMessage tags or color codes they contain are not interpreted.
- An invalid MiniMessage tag never breaks a message: the text is displayed as-is.

### Message keys

| Key | Placeholders | Used when |
|-----|--------------|-----------|
| `prefix` | - | Prefix inserted with `%prefix%` |
| `command-syntax-error` | `%syntax%` | A command is used with wrong arguments |
| `command-no-permission` | - | The sender lacks the permission |
| `command-no-console` | - | A player-only command is run from the console |
| `command-unknown` | `%command%` | Unknown sub-command |
| `plugin-not-ready` | - | The addon is not fully started yet |
| `economy-unknown` | `%economy%` | Unknown economy |
| `economy-all` | - | Label used when a count leaderboard covers every economy |
| `help-header` | - | Header of `/zahstats help` |
| `help-line` | `%syntax%`, `%description%` | One line of the help |
| `command-description.help` | - | Help description of `/zahstats help` |
| `command-description.top` | - | Help description of `/zahstats top` |
| `command-description.player` | - | Help description of `/zahstats player` |
| `command-description.items` | - | Help description of `/zahstats items` |
| `command-description.reload` | - | Help description of `/zahstats reload` |
| `command-description.clearcache` | - | Help description of `/zahstats clearcache` |
| `command-description.import` | - | Help description of `/zahstats import` |
| `command-description.purge` | - | Help description of `/zahstats purge` |
| `command-description.ah-stats` | - | Help description of `/ah stats` |
| `command-description.ah-price` | - | Help description of `/ah price` |
| `top-header` | `%metric%`, `%period%`, `%economy%` | Header of `/zahstats top` |
| `top-line` | `%rank%`, `%name%`, `%value%` | One line of `/zahstats top` |
| `top-empty` | - | The leaderboard has no data |
| `top-loading` | - | The leaderboard is being computed |
| `top-disabled` | `%metric%` | The leaderboard is disabled in `leaderboards.disabled` |
| `top-metric-unknown` | `%metric%`, `%metrics%` | Unknown metric |
| `top-period-unknown` | `%period%` | Unknown period |
| `metric-name.top-sellers-money` | - | Label of `TOP_SELLERS_MONEY` |
| `metric-name.top-buyers-money` | - | Label of `TOP_BUYERS_MONEY` |
| `metric-name.top-sellers-count` | - | Label of `TOP_SELLERS_COUNT` |
| `metric-name.top-buyers-count` | - | Label of `TOP_BUYERS_COUNT` |
| `metric-name.top-tax-paid` | - | Label of `TOP_TAX_PAID` |
| `metric-name.biggest-sale` | - | Label of `BIGGEST_SALE` |
| `period-name.day` | - | Label of `DAY` |
| `period-name.week` | - | Label of `WEEK` |
| `period-name.month` | - | Label of `MONTH` |
| `period-name.all` | - | Label of `ALL` |
| `player-header` | `%player%`, `%economy%` | Header of `/zahstats player` |
| `player-line-listed` | `%listed%`, `%sold%`, `%conversion%` | Listed / sold items and conversion rate |
| `player-line-bought` | `%bought%` | Bought items |
| `player-line-money` | `%earned%`, `%spent%` | Money earned and spent |
| `player-line-tax` | `%tax%`, `%biggest%` | Tax paid and biggest sale |
| `player-line-dates` | `%first-sale%`, `%last-sale%` | First and last sale dates |
| `player-not-found` | `%name%` | The player was never seen by the auction house |
| `player-empty` | `%player%` | The player has no statistics yet |
| `player-loading` | `%name%` | The player statistics are being loaded |
| `player-never` | - | Displayed instead of a date that never happened |
| `price-error` | - | `/ah price` without an item in the main hand |
| `price-economy-unknown` | `%economy%` | `/ah price` with an unknown economy |
| `price-informations` | `%itemName%`, `%economy%`, `%amount%`, `%average%`, `%median%` | Result of `/ah price` (list of lines) |
| `price-no-data` | `%itemName%`, `%economy%` | No sale recorded for this item |
| `reload-success` | - | `/zahstats reload` succeeded |
| `reload-error` | - | `/zahstats reload` failed, the previous configuration stays active |
| `reload-menus-error` | - | Configuration and messages reloaded, but a menu is invalid |
| `cache-cleared` | - | `/zahstats clearcache` succeeded |
| `import-confirm` | `%rows%`, `%source%`, `%warning%` | Import preview, asks for `confirm` |
| `import-warning-v1` | - | Warning inserted in `%warning%` for `v1` |
| `import-warning-v4logs` | - | Warning inserted in `%warning%` for `v4logs` |
| `import-estimate` | `%duration%` | Estimated import duration |
| `import-migrated-v3-excluded` | `%count%` | Logs migrated from V3 are skipped |
| `import-migrated-v3-included` | `%count%` | Logs migrated from V3 will be imported |
| `import-warning-v1-tables-missing` | - | No `zah_*` table found in the V1 database |
| `import-warning-migrated-v3-double-count` | `%count%` | V3-migrated logs would be counted twice |
| `import-started` | `%source%` | The import has started |
| `import-progress` | `%source%`, `%processed%`, `%total%`, `%percent%`, `%remaining%`, `%failed%` | Console progress line |
| `import-finished` | `%source%`, `%processed%` | The import is finished |
| `import-already-done` | `%source%` | This import was already completed on this database |
| `import-locked` | `%source%` | The import is already running on another server |
| `import-failed` | `%source%`, `%error%` | The import failed |
| `import-unknown-source` | `%source%` | Unknown import source |
| `import-unavailable` | `%source%` | The import is not available |
| `purge-confirm` | `%count%`, `%days%` | Purge preview, asks for `confirm` |
| `purge-success` | `%deleted%`, `%days%` | The purge is done |
| `purge-invalid-days` | `%days%` | Invalid number of days |
| `purge-failed` | `%error%` | The purge failed |
| `purge-unavailable` | - | The purge is not available |
| `version-available` | `%version%`, `%latest%` | Sent on join to players with `zplugin.notifs` when a newer version of the addon is available (see `enable-version-checker`) |

The `metric-name.*` and `period-name.*` labels are also used to fill `%metric%` and `%period%` in other messages, and by the formatted placeholders.

## language.yml

`language.yml` selects the language of the default files generated on first start: `messages.yml`, the `inventories/` folder and the `patterns/` folder. It works like the zAuctionHouse V4 `language.yml`.

```yaml
# Available options:
#   - auto : detection from the server country/locale
#   - en   : English (default)
#   - fr   : French (Francais)
#   - es   : Spanish (Espanol)
#   - it   : Italian (Italiano)
language: auto
```

| Value | Language |
|-------|----------|
| `auto` (default) | Detected from the server locale |
| `en` | English |
| `fr` | French |
| `es` | Spanish |
| `it` | Italian |

With `auto`, the addon uses the country of the server (JVM) locale first, then its language:

| Detected language | Countries |
|-------------------|-----------|
| French (`fr`) | France, Belgium, Switzerland, Canada, Luxembourg, Monaco, and French-speaking countries and territories of Africa, the Caribbean and the Pacific (Senegal, Ivory Coast, Cameroon, Madagascar, Haiti, Reunion, Guadeloupe, Martinique, French Guiana, French Polynesia, New Caledonia...) |
| Spanish (`es`) | Spain, Mexico, Argentina, Chile, Colombia, Peru, Venezuela and the other Spanish-speaking countries of Latin America, Puerto Rico, Equatorial Guinea |
| Italian (`it`) | Italy, San Marino, Vatican City |
| English (`en`) | Every other country, unless the locale language itself is `fr`, `es` or `it` |

An explicit language that is not shipped (for example `de`) falls back to English with a console warning.

### Changing the language

The language only applies to files that **do not exist yet**. Your existing files are never overwritten. To switch language:

1. Change `language` in `language.yml`.
2. Delete `messages.yml` and the `inventories/` and `patterns/` folders in `plugins/zAuctionHouseStats/` (back them up first if you customized them).
3. **Restart** the server. The files are regenerated in the new language.

<CalloutContainer type="info">

<CalloutDescription>
`/zahstats reload` does **not** change the language. If `language.yml` was changed, the reload only prints a console reminder of the steps above. `config.yml` and `language.yml` themselves are only shipped in English.
</CalloutDescription>

</CalloutContainer>

### Translating

To translate or reword the messages, edit `plugins/zAuctionHouseStats/messages.yml` directly and run `/zahstats reload`. You can start from any shipped language (`en`, `fr`, `es`, `it`) and translate it to another one: every key is available in all four languages, and a key you remove falls back to the shipped default of the selected language.

## What /zahstats reload reloads

`/zahstats reload` (permission `zauctionhouse.stats.reload`) applies most changes without a restart. It never runs database queries on the command thread.

| Reloaded | Details |
|----------|---------|
| `config.yml` | Read and validated **before** anything changes. If it is invalid (YAML error or invalid value), the reload is aborted, the previous configuration stays active and `reload-error` is sent. |
| Caches | Durations, sizes, disabled leaderboards, `unknown-name`, `default-economy`, `statistics.material-prices.*` and the price explorer limit are applied. The cached data itself is **not** cleared (use `/zahstats clearcache` for that). `leaderboards.preload` is only used on startup. |
| Player heads | `leaderboards.player-heads` and `leaderboards.default-head-url` are applied to the next menu render. |
| Flush | `flush.interval-seconds` and `flush.max-pending` are applied. |
| Debug | `debug` is applied. |
| `messages.yml` and `message-colors` | Reloaded. |
| Import settings | The `import` block applies to the next import. |
| Placeholders | `placeholders.*` (fallback texts, date format, V1 aliases) are applied. |
| Menus | The `inventories/` and `patterns/` files are reloaded. If a menu is invalid, the configuration and messages stay applied and `reload-menus-error` is sent. |

These settings are read only on startup. Changing them requires a **server restart**, and the reload prints a console warning when they changed:

| Setting | |
|---------|-|
| `storage-type` and the whole `database-configuration` block | Restart required |
| `collection.*` | Restart required |
| `statistics.timezone` | Restart required (and never change it once data exists) |
| `statistics.save-itemstacks` | Restart required |
| `retention.sales-days` | Restart required |
| `language.yml` | Delete the generated files, then restart (see [Changing the language](#changing-the-language)) |

`enable-version-checker` is also only read on startup, but changing it does not print any warning on reload.
