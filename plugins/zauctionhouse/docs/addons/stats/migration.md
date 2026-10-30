---
title: Migration & Maintenance
description: Import past sales from zAuctionHouseStats V1 or from zAuctionHouse V4 logs, purge old rows, set up retention and roll back safely
---

# Migration & Maintenance

zAuctionHouseStats only records sales from the moment it is installed. To add your **past** sales to the statistics, use the import command. This page also covers how to keep the database small (purge and retention) and how to start over if something goes wrong.

There are two sources you can import from:

| Your server | Data available | What to run |
|-------------|----------------|-------------|
| Ran **zAuctionHouseStats V1** (zAuctionHouse V3 era) | The `zah_*` tables of V1 | `/zahstats import v1 confirm` |
| Ran **zAuctionHouse V4** before you installed this addon | The V4 `logs`, `items`, `players` and `transactions` tables | `/zahstats import v4logs confirm` |
| Both of the above | Both | Both imports, `v1` first (see [Step-by-step procedure](#step-by-step-procedure)) |
| Fresh install | Nothing | Nothing to do. You can still import later |

<CalloutContainer type="warning">

<CalloutTitle>Before You Start</CalloutTitle>

<CalloutDescription>
1. **Back up your databases** (the addon database and the zAuctionHouse database). A backup is the only way to undo an import.
2. Set `statistics.timezone` in `config.yml` **before** importing. Daily totals are calculated in this time zone and are never recalculated later.
3. Imports never modify or delete the source tables. They only read them.
</CalloutDescription>

</CalloutContainer>

## Commands

| Command | Description | Permission |
|---------|-------------|------------|
| `/zahstats import <v1\|v4logs>` | Dry run: shows what the import would do, writes nothing | `zauctionhouse.stats.import` |
| `/zahstats import <v1\|v4logs> confirm` | Starts the import in the background | `zauctionhouse.stats.import` |
| `/zahstats purge <days>` | Shows how many rows are older than `<days>` days | `zauctionhouse.stats.purge` |
| `/zahstats purge <days> confirm` | Deletes rows older than `<days>` days | `zauctionhouse.stats.purge` |

Both permissions are `op` by default and are included in `zauctionhouse.stats.admin`. Both commands can be run from the console. The source name is case-insensitive, and `v4-logs` / `v4_logs` are also accepted. See [Commands & Permissions](/zauctionhouse/addons/stats/commands-permissions) for the full command list.

## How an Import Works

Both imports work the same way:

- **Dry run first.** Without `confirm`, the command shows the number of source rows to read, an estimated duration and any warnings. Nothing is written. If the import is already complete, the dry run only replies `import-already-done`.
- **In the background.** All database work runs on the addon's own storage thread, never on the main thread. The server stays playable during the import.
- **In chunks.** Rows are read in chunks (`import.chunk-size`, 500 by default). Each chunk is written in **one transaction**: the rows, the totals and the import progress are saved together, or not at all. Between two chunks, the addon waits `import.pause-between-chunks-ms` so live sales can be saved in between.
- **Progress in the console.** A progress line is written every `import.log-every-rows` rows, with the percentage, the time left (based on the speed observed so far) and the number of unreadable rows. A summary is written at the end.
- **Caches cleared.** When the import ends, the leaderboard, player, price and placeholder caches are cleared so the new data shows up right away. This also happens if the import stops after at least one chunk was saved.

The duration shown in the dry run is a safe estimate based on 2,000 rows per second, plus the pauses between chunks.

### Import Progress (`import_state`)

The addon keeps track of every import in the `zahstats_import_state` table (with your table prefix). Each import is split into steps, and each step has one row:

| Step (`source` column) | Import | What it does |
|------------------------|--------|--------------|
| `v1:sales` | `v1` | Imports V1 purchases as sales |
| `v1:listings` | `v1` | Imports V1 listings |
| `v1:globals` | `v1` | Imports V1 global counters (applied once) |
| `v4logs:boundary` | `v4logs` | Last zAuctionHouse log id the import may read. Recorded at the first start of the addon |
| `v4logs:rows` | `v4logs` | Imports zAuctionHouse logs |
| `v4logs:outcomes` | `v4logs` | Works out what happened to listings that are still open |

| Column | Meaning |
|--------|---------|
| `last_cursor` | Id of the last source row saved. Updated in the same transaction as each chunk |
| `imported_counts` | Rows imported by this step |
| `failed_counts` | Rows that could not be read (see [Unreadable rows](#unreadable-rows)) |
| `running_server` | Server currently running this step (the cluster lock), or empty |
| `started_at` / `finished_at` | When the step started and finished. A finished step is never run again |

This gives you three guarantees:

- **No double counting.** Once all steps of an import are finished, running it again only replies `import-already-done`.
- **Resume after a stop.** If the server stops or crashes during an import, run the **same command** again. It resumes from the last saved chunk.
- **Safe on errors.** If a chunk fails, it is rolled back and the progress does not move. The import stops with `import-failed` and can be resumed.

### Cluster Lock

On a multi-server setup (several servers sharing one MySQL/MariaDB database), run each import from **one server only**. Any server works: the result is shared by all servers.

When an import starts, it writes the server name in `running_server`. The server name is the `server-name` of zAuctionHouse, or the Bukkit server name and port if it is empty. If another server already holds the lock, the import is refused with `import-locked`. Only one import can run at a time on the same server, too: starting a second one while the first is running also replies `import-locked`. When an import finishes, fails or is stopped by a shutdown, the server releases its lock.

Other servers can keep recording live sales during the import: totals are written as atomic additions, so nothing is lost.

<CalloutContainer type="info">

<CalloutTitle>A server crashed during an import</CalloutTitle>

<CalloutDescription>
The crashed server keeps its lock. Run the import again **from the same server** to resume it. If that server is gone for good, release the lock manually, then run the import from another server:

```sql
UPDATE zahstats_import_state SET running_server = NULL WHERE source LIKE 'v1:%';
-- or, for the logs import:
UPDATE zahstats_import_state SET running_server = NULL WHERE source LIKE 'v4logs:%';
```
</CalloutDescription>

</CalloutContainer>

### Unreadable Rows

Item data is stored as encoded blobs in both sources. The addon decodes them on a best-effort basis:

- The material, custom model data and item name come from the **first** readable item. The amount is the sum of all readable items.
- If no item in the blob can be read, the row is still imported with material `UNKNOWN` and amount `1`, and counted as unreadable. These rows are grouped under the material `UNKNOWN` in material statistics.
- V1 rows whose buyer or seller UUID is invalid (seller UUID for listings) are **skipped** (not imported) and also counted as unreadable.
- V4 logs that lack the player needed to build the row (no seller for a `SALE`, no buyer or seller for a `PURCHASE`) are skipped without being counted.

## Import from V1 (`import v1`)

Imports the data of zAuctionHouseStats V1 (the plugin for zAuctionHouse V3). V1 is not needed to run: the addon reads its tables directly.

### Where the V1 Tables Are

By default, the addon looks for the `zah_*` tables in **its own database** (the one set in `storage-type` / `database-configuration`). This is the usual case:

- **SQLite:** the addon uses `plugins/zAuctionHouseStats/database.db`. If V1 used the same file, its tables are already there.
- **MySQL / MariaDB:** point `database-configuration` to the database that contains the `zah_*` tables.

If the V1 tables are in **another** database, enable `import.v1.database`. The addon opens a temporary connection when the import starts (it only reads from it) and closes it at the end:

```yaml
import:
  v1:
    database:
      enabled: true
      type: MYSQL              # MYSQL | MARIADB | SQLITE
      host: localhost
      port: 3306
      user: "minecraft"
      password: "your-password"
      database: "old_database"
```

With `type: SQLITE`, `database` is the name of the file in the `plugins/zAuctionHouseStats/` folder (the default `database.db` file is used if it is empty). Any other `type` value is treated as `MYSQL`.

If no `zah_*` table is found, the dry run shows `import-warning-v1-tables-missing` and the import is refused.

### What Is Imported

The import runs three steps, in this order:

| Step | V1 table | Imported into | Details |
|------|----------|---------------|---------|
| `v1:sales` | `zah_player_purchased_items` | Sales + all totals | One sale per purchase. Buyer, seller, names, economy, price, item and purchase date |
| `v1:listings` | `zah_player_sales_items` | Listings + all totals | One listing per item put on sale, with its creation date. The listing outcome is rebuilt (see below) |
| `v1:globals` | `zah_stats_global` | Global statistics | Global counters that have no dated rows (see below). Applied **once**, in one transaction |

Daily totals, player totals and player names are calculated from the imported rows, exactly like live sales. Player names never replace a more recent name already known by the addon.

**Global counters** (`zah_stats_global`):

| Addon statistic | Built from the V1 keys |
|-----------------|------------------------|
| `auctions_opened` | `AUCTION_OPENED` |
| `items_expired` | `NUMBER_OF_ITEMS_NOT_SOLD` + `NUMBER_OF_ITEMS_DESTROY` |
| `items_removed` | `NUMBER_OF_ITEMS_REMOVE_FROM_EXPIRE` + `NUMBER_OF_ITEMS_REMOVE_FROM_STORAGE` + `NUMBER_OF_ITEMS_REMOVE_FROM_BOUGHT` |

These are all-time totals only: V1 never stored them per day. Counters equal to `0` are skipped. The per-economy V1 table `zah_stats_global_economies` is **not** imported: money totals are rebuilt from the imported sales instead.

**Listing outcomes.** V1 never saved what happened to a listing. With `import.v1.listing-outcome-heuristic: true` (default), the addon rebuilds it:

1. **Sold** if a V1 purchase has the same seller, economy and price, between the listing creation and expiration dates. Each purchase matches one listing only.
2. Otherwise **expired** if the expiration date has passed.
3. Otherwise the listing stays **active**.

With `false`, every V1 listing is imported as active. Rebuilt outcomes never add to the expired/removed counters: those come from the global counters above, so nothing is counted twice.

**Consistency check.** At the end, the addon compares the `zah_player_stats` counters of each player (items put on sale and items bought) with the rows imported under the `import.v1.server-name` server name. Each difference is logged as a console warning (the first 20 are detailed, the rest are summed up). Differences usually mean rows were deleted from the V1 tables by hand. `zah_player_stats` itself is never imported.

### Conversions

| Data | In V1 | After import |
|------|-------|--------------|
| Amounts | Whole numbers | Decimal numbers. Amount paid, amount received and listing price all equal the V1 price |
| Dates | Epoch milliseconds | Timestamps |
| Server name | Not stored | `import.v1.server-name` (`v1-import` by default) |
| Item id | Not stored | `0` |
| Taxes | Not stored | Empty (unknown) |
| Listing date of a sale | Not stored | Empty |
| Category | Not stored | Empty |
| Full item | Encoded blob | Copied to the sale only if `statistics.save-itemstacks: true` |

The `v1-import` server name keeps the V1 history apart in per-server statistics and lets you find the imported rows later.

## Import from zAuctionHouse V4 Logs (`import v4logs`)

Imports the history that zAuctionHouse V4 recorded **before** you installed the addon. It reads the V4 database through zAuctionHouse's own connection, so there is nothing to configure.

### The Boundary

At its first start, the addon saves the highest log id of zAuctionHouse as `v4logs:boundary`. The logs import never reads past this id, because later sales are already recorded live. This is what prevents double counting.

- The boundary is recorded **once** and never moves afterwards.
- The addon waits up to 10 seconds for it before starting live collection. If this takes longer, live collection starts anyway and a console warning tells you that a few sales may be counted twice if you import the logs later.
- If the boundary is missing (for example, the V4 database was not available at startup), the import is refused. Restart the server once so the addon can record it.

### What Is Imported

The import runs two steps:

| Step | Source | Result |
|------|--------|--------|
| `v4logs:rows` | `SALE` logs | Listings + totals (including the listing tax, if any) |
| | `PURCHASE` logs | Sales + totals. Server name and listing date come from the V4 `items` table |
| | `REMOVE_LISTED` and `REMOVE_SELLING` logs | Listing marked as removed. The removal is credited to the **seller**, even if an admin removed it |
| `v4logs:outcomes` | V4 `items.storage_type` | Outcome of listings that are still open after the first step |

For the second step, each listing of the addon that is still active and has a V4 item id (imported or recorded live) gets its outcome from the current state of its V4 item:

| V4 item state | Listing outcome |
|---------------|-----------------|
| `EXPIRED` | Expired |
| `DELETED` | Removed |
| `PURCHASED` | Sold |
| `LISTED` | Stays active (the item is really still on sale) |
| Item no longer exists | Removed |

These outcomes have no date and do **not** add to the expired/removed counters.

### What Is Approximated

<CalloutContainer type="warning">

<CalloutTitle>Amounts may be approximate</CalloutTitle>

<CalloutDescription>
V4 logs only store the **listing price**, not what the buyer paid or what the seller received. A console warning is written at the end of each logs import as a reminder.
</CalloutDescription>

</CalloutContainer>

With `import.v4logs.resolve-amounts-from-transactions: true` (default), the addon looks for the matching rows in the V4 `transactions` table. When both the buyer row and the seller row are found, the real amounts are used, and the tax is the difference between them (left empty if that difference is negative). Otherwise, all amounts stay equal to the listing price. If the `transactions` table cannot be read, the addon logs a warning and uses the listing price for the rest of the import.

| Data | After import |
|------|--------------|
| Amount paid / received | Exact if the transactions are found, listing price otherwise |
| Tax amount | Calculated from the transactions when found, empty otherwise. The tax type is never known |
| Time covered | Since V4 was installed, minus any logs that were purged in zAuctionHouse |
| Server name | From the V4 `items` table, or `import.v4logs.server-name-fallback` (`v4-import` by default) if the item was deleted |
| Listing date of a sale | From the V4 `items` table, empty if the item was deleted |
| Material / amount | Decoded from the item blob, `UNKNOWN` if unreadable |
| Category | Empty |
| `auctions_opened` | Not available (V4 does not log menu openings) |
| `items_expired` | Not counted (V4 does not log expirations). Expired listings only get their outcome in the `v4logs:outcomes` step |

### Logs Migrated from V3

If you moved from V3 to V4 with zAuctionHouse's built-in migration, the V4 logs also contain purchases copied from V3, marked `migrated_from_v3`. These are the **same** purchases as the V1 tables.

- By default (`import.v4logs.include-migrated-v3: false`), they are skipped. The dry run tells you how many were skipped.
- Set it to `true` **only** if you never used zAuctionHouseStats V1, so `import v1` is not an option. Their listing date is left empty, because it is not known.
- If `import v1` is already finished and this option is `true`, the dry run shows `import-warning-migrated-v3-double-count` and the import is refused.

<CalloutContainer type="error">

<CalloutTitle>Never combine the two</CalloutTitle>

<CalloutDescription>
Do not run `import v1` after a logs import done with `include-migrated-v3: true`. The addon cannot detect this case, and V3 purchases would be counted twice.
</CalloutDescription>

</CalloutContainer>

## Import Configuration

All settings are in the `import` section of `config.yml`. They are read each time an import starts, so `/zahstats reload` is enough to change them for the next import.

```yaml
import:
  chunk-size: 500
  pause-between-chunks-ms: 50
  log-every-rows: 10000
  v1:
    server-name: "v1-import"
    listing-outcome-heuristic: true
    database:
      enabled: false
      type: MYSQL              # MYSQL | MARIADB | SQLITE
      host: localhost
      port: 3306
      user: ""
      password: ""
      database: ""
  v4logs:
    include-migrated-v3: false
    resolve-amounts-from-transactions: true
    server-name-fallback: "v4-import"
```

Every key is described in the [Import](/zauctionhouse/addons/stats/configuration#import) section of the configuration page, and the way out-of-range values are corrected is explained in [How invalid values are handled](/zauctionhouse/addons/stats/configuration#how-invalid-values-are-handled). To lower the load of an import on a busy server, raise `import.pause-between-chunks-ms` or lower `import.chunk-size`.

## Step-by-step Procedure

### Standard Case (V3 + V1, now on V4)

1. **Back up** the databases: `mysqldump` for MySQL/MariaDB, or a copy of `plugins/zAuctionHouseStats/database.db` and `plugins/zAuctionHouse/database.db` for SQLite.
2. Stop the server, remove the old zAuctionHouseStats V1 jar and add the new one (see [Installation](/zauctionhouse/addons/stats/installation)).
3. Start the server once. Check the console: the tables are created and the v4logs boundary is recorded.
4. In `config.yml`, check `storage-type` and `database-configuration` (and `import.v1.database` if needed), and set `statistics.timezone`. **Restart** the server if you changed `storage-type`, `database-configuration`, `statistics.timezone` or `statistics.save-itemstacks`: `/zahstats reload` does not apply them. A reload is enough for the `import` section.
5. Run `/zahstats import v1` and read the dry run: number of rows, estimated time, warnings.
6. Run `/zahstats import v1 confirm`. Follow the progress in the console. Players can keep playing.
7. If the server also ran on V4 before the addon was installed, run `/zahstats import v4logs`, then `/zahstats import v4logs confirm`. Keep `include-migrated-v3: false`.
8. Check the result: `/zahstats top TOP_SELLERS_MONEY all`, a few placeholders and the `stats.yml` menu. Caches are already cleared.

### Moved from V3 to V4 without V1

There are no `zah_*` tables, so only `import v4logs` applies. In this case, and only this case, you can set `import.v4logs.include-migrated-v3: true` to recover the V3 purchases copied by zAuctionHouse. Their amounts are the V3 listing prices.

### Multi-server

Run each import from one server only. The lock stops other servers, and live collection keeps running on all of them.

### Running in Production Safely

- The import never blocks the main thread, but it does load the database. On a busy server, run it at a quiet time, or raise `import.pause-between-chunks-ms` / lower `import.chunk-size`.
- Stopping the server during an import is safe: the import stops before the next chunk and resumes when you run the same command again.
- If an import fails, read the console error, fix the cause, then run the same command again. Already saved chunks are kept.
- Import **before** enabling a short retention (see below), otherwise old imported rows are purged right after.
- The end summary lists how many sales and listings were added, and their id ranges. Keep it: it is the only way to find rows from a logs import later. It only covers the chunks saved by the **last** run: if the import was resumed, also keep the `committed so far` line that the console writes each time an import stops.

## Purge & Retention

The detailed `sales` and `listings` rows are what make the tables grow. You can delete old rows by hand or automatically. In both cases:

- Sales are deleted by **sale date**, listings by **listing date**. "Older than N days" means older than the current time minus N × 24 hours. Active listings are **never** deleted.
- **Daily totals, player totals and global statistics are always kept.** Leaderboards, periods and player statistics stay correct after a purge.
- Rows are deleted in batches of 500, each batch as a separate task, so the database is never locked for long and live sales keep being saved.
- Imported rows are purged like any other row.

What you lose: data that is read from the detailed rows for the purged days, such as material prices and top materials (`/ah price`, price explorer) and the `BIGGEST_SALE` leaderboard for the day/week/month periods.

### Manual Purge

```bash
# Preview: how many rows are older than 90 days
/zahstats purge 90

# Delete them
/zahstats purge 90 confirm
```

`<days>` must be a whole number, at least `1`. After the purge, the material price and top material caches and the period `BIGGEST_SALE` leaderboards are refreshed (the same happens after each automatic retention run). The deletion cannot be undone without a backup.

### Automatic Retention

```yaml
retention:
  sales-days: 0
```

| Key | Default | Description |
|-----|---------|-------------|
| `retention.sales-days` | `0` | Delete `sales` and `listings` rows older than this many days, once a day. `0` keeps everything. A negative value logs a warning and falls back to `0` |

- The first purge runs **10 minutes** after the server starts, then every 24 hours. It is skipped while the server is shutting down.
- Changing this value needs a **restart**. `/zahstats reload` only logs a warning.
- A value between `1` and `34` logs a warning at startup: the monthly `BIGGEST_SALE` leaderboard would be incomplete. Use `0` or at least `35`.
- Each run writes the number of deleted rows to the console. If a run fails, a warning is logged and the next run tries again.

## Rollback

An import cannot be partly undone: totals are added together and cannot be taken back for one import only. The supported way is to **drop the addon tables and import again**. The sources are never changed, so you can do this as many times as you need.

<CalloutContainer type="warning">

<CalloutTitle>Live data is lost too</CalloutTitle>

<CalloutDescription>
Dropping the tables also deletes every sale the addon recorded live since it was installed. If you need that data, restore your backup instead, or back up the `zahstats_*` tables first.
</CalloutDescription>

</CalloutContainer>

1. Stop the server (on a multi-server setup, stop **every** server that shares the addon database).
2. Drop the addon tables (replace `zahstats_` if you changed `table-prefix`):

```sql
DROP TABLE zahstats_sales;
DROP TABLE zahstats_listings;
DROP TABLE zahstats_player_stats;
DROP TABLE zahstats_player_names;
DROP TABLE zahstats_player_daily;
DROP TABLE zahstats_global_daily;
DROP TABLE zahstats_global_stats;
DROP TABLE zahstats_import_state;
DROP TABLE zahstats_migrations;
```

3. With SQLite, **do not delete** `database.db` if it also holds the V1 `zah_*` tables you want to import.
4. Start the server. The tables are created again, empty, and a new v4logs boundary is recorded at the current last log. A new logs import then also covers the live sales lost in step 2, as long as zAuctionHouse has not purged those logs.
5. Run the imports again (see [Step-by-step Procedure](#step-by-step-procedure)).

To find imported rows without a rollback: V1 rows have the server name `v1-import` (or your `import.v1.server-name`). Rows from a logs import have no special marker; use the id ranges from the end-of-import summary. On a multi-server setup, live sales from other servers may fall inside these ranges.

### Cleaning Up V1 Tables

Once you have checked the import, you can drop the V1 tables by hand. The addon never does it for you:

```sql
DROP TABLE zah_player_purchased_items;
DROP TABLE zah_player_sales_items;
DROP TABLE zah_player_stats;
DROP TABLE zah_stats_global;
DROP TABLE zah_stats_global_economies;
```

## Messages

All replies are in `messages.yml` and can be translated.

| Key | When it is sent |
|-----|-----------------|
| `import-confirm` | Dry run: number of rows to read, with `import-warning-v1` or `import-warning-v4logs` |
| `import-estimate` | Dry run: estimated duration |
| `import-migrated-v3-excluded` | Dry run: number of `migrated_from_v3` logs skipped |
| `import-migrated-v3-included` | Dry run: number of `migrated_from_v3` logs that will be imported |
| `import-warning-v1-tables-missing` | No `zah_*` table found, the import will be refused |
| `import-warning-migrated-v3-double-count` | V3 purchases would be counted twice, the import will be refused |
| `import-started` | Import started |
| `import-progress` | Console progress line (`%source%`, `%processed%`, `%total%`, `%percent%`, `%remaining%`, `%failed%`) |
| `import-finished` | Import finished |
| `import-already-done` | The import was already completed on this database (dry run or `confirm`) |
| `import-locked` | The import is already running on another server, or another import is already running on this server |
| `import-failed` | The import failed or was refused (`%error%`) |
| `import-unknown-source` | The source is not `v1` or `v4logs` |
| `import-unavailable` | The import service is not available |
| `purge-confirm` | Purge dry run: number of rows that would be deleted |
| `purge-success` | Purge done |
| `purge-invalid-days` | `<days>` is not a whole number of at least `1` |
| `purge-failed` | The purge failed (`%error%`) |
| `purge-unavailable` | The purge service is not available |
