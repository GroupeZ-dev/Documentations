---
title: Commands & Permissions
description: Complete list of commands and permissions for the zAuctionHouseStats addon
---

# Commands & Permissions

This page lists every command and permission provided by the zAuctionHouseStats addon. The addon has its own command, `/zahstats`, and also adds two sub-commands to the main zAuctionHouse command (`/ah stats` and `/ah price`).

## Main Command

The addon command is `/zahstats`, with one alias:
- `/zahs` - Short version

Running `/zahstats` with no argument shows the help (same as `/zahstats help`). The help only lists the sub-commands you have permission for. A player-only sub-command is hidden when the help is shown in the console.

<CalloutContainer type="info">

<CalloutDescription>
Sub-command names are case-insensitive. Each permission is checked by the addon, so a player without the permission gets the `command-no-permission` message from `messages.yml`. A player-only sub-command run from the console sends `command-no-console`. If the number of arguments is wrong, the addon sends `command-syntax-error` with the correct syntax. An unknown sub-command sends `command-unknown`, followed by the help if you have `zauctionhouse.stats.use`.
</CalloutDescription>

</CalloutContainer>

## Sub-Commands

| Command | Alias | Description | Permission | Console |
|---------|-------|-------------|------------|---------|
| `/zahstats help` | - | Show the help | `zauctionhouse.stats.use` | Yes |
| `/zahstats top <metric> [period] [economy]` | - | Show a leaderboard in chat | `zauctionhouse.stats.top` | Yes |
| `/zahstats player [name]` | - | Show a player's statistics | `zauctionhouse.stats.player` | Yes (name required) |
| `/zahstats items [economy]` | - | Open the item price explorer | `zauctionhouse.stats.items` | No |
| `/zahstats reload` | `rl` | Reload configuration, messages and menus | `zauctionhouse.stats.reload` | Yes |
| `/zahstats clearcache` | `cc` | Clear every statistics cache | `zauctionhouse.stats.clearcache` | Yes |
| `/zahstats import <v1\|v4logs> confirm` | - | Import history (V1 tables or zAuctionHouse logs) | `zauctionhouse.stats.import` | Yes |
| `/zahstats purge <days> confirm` | - | Delete sales older than N days (daily totals are kept) | `zauctionhouse.stats.purge` | Yes |

Tab completion only suggests the sub-commands you have permission for, then the possible values of each argument (metrics, periods, economies, online players, import sources, `confirm`).

The descriptions shown by `/zahstats help` and `/ah help` come from the `command-description` section of `messages.yml` (keys `help`, `top`, `player`, `items`, `reload`, `clearcache`, `import`, `purge`, `ah-stats` and `ah-price`). You can edit them, and `/zahstats reload` applies the change.

### Top Command Details

```bash
/zahstats top <metric> [period] [economy]
```

Shows the top 10 players for a metric in chat. To see the full leaderboard, use the paginated leaderboard menu (see [Inventories](/zauctionhouse/addons/stats/inventories)).

**Arguments:**
- `<metric>` - The leaderboard to show (required). Accepts a short alias or the full metric name (case-insensitive, `-` works in place of `_`)
- `[period]` - The time window (optional, defaults to `all`)
- `[economy]` - The economy name (optional, case-insensitive)

**Metrics:**

| Short alias | Full name | Description | Money metric |
|-------------|-----------|-------------|--------------|
| `sellers` | `top_sellers_money` | Money earned by sellers, after taxes | Yes |
| `buyers` | `top_buyers_money` | Money spent by buyers, taxes included | Yes |
| `sellers_count` | `top_sellers_count` | Number of completed sales as a seller | No |
| `buyers_count` | `top_buyers_count` | Number of completed purchases as a buyer | No |
| `tax` | `top_tax_paid` | Total taxes paid | Yes |
| `biggest` | `biggest_sale` | Biggest single sale as a seller | Yes |

**Periods:**

| Period | Window |
|--------|--------|
| `day` | Today, since midnight |
| `week` | Since Monday |
| `month` | Since the 1st of the month |
| `all` | All time (default) |

Periods are calendar windows in the time zone set in the addon configuration (see [Configuration](/zauctionhouse/addons/stats/configuration)).

<CalloutContainer type="info">

<CalloutDescription>
Money is never added up across economies. For a money metric, if you don't give an economy, the default zAuctionHouse economy is used. For a count metric (`sellers_count`, `buyers_count`), if you don't give an economy, all economies are counted together.
</CalloutDescription>

</CalloutContainer>

If a leaderboard is disabled in the configuration, the command replies with the `top-disabled` message. An unknown metric, period or economy sends `top-metric-unknown`, `top-period-unknown` or `economy-unknown`.

**Examples:**
```bash
# All-time top sellers in the default economy
/zahstats top sellers

# Top buyers this week
/zahstats top buyers week

# Top sellers by number of sales this month, vault economy only
/zahstats top sellers_count month vault

# Full metric names also work
/zahstats top biggest_sale day
```

### Player Command Details

```bash
/zahstats player [name]
```

Shows a player's statistics, one block per economy. The default economy comes first, then the others in alphabetical order. Each block shows:
- Items listed, items sold and the conversion rate (sold / listed)
- Items bought
- Money earned and money spent
- Taxes paid and biggest sale
- First and last sale dates

**Arguments:**
- `[name]` - Player name (optional). Without a name, you see your own statistics. From the console, a name is required

The name must be a valid Minecraft name (1 to 16 letters, digits or `_`). Offline players work too: the addon looks up the name in its database. Tab completion suggests online players, but you can type any name. An invalid or unknown name sends `player-not-found`, and a player without any statistics sends `player-empty`.

**Examples:**
```bash
# Your own statistics
/zahstats player

# Another player's statistics
/zahstats player Notch
```

### Items Command Details

```bash
/zahstats items [economy]
```

Opens the item price explorer menu (`item-prices.yml`). Players only.

**Arguments:**
- `[economy]` - The economy to show prices in (optional, case-insensitive). If set, this economy is selected when the menu opens. An unknown economy sends `economy-unknown`

### Reload & Clear Cache

- `/zahstats reload` (alias `rl`) reloads the configuration, the messages and the menus. If the new configuration is invalid, nothing changes and the current configuration stays active (`reload-error`). If the configuration loads but some menus fail, the addon sends `reload-menus-error`.
- `/zahstats clearcache` (alias `cc`) clears all statistics caches, including the PlaceholderAPI value cache. It does not empty them: every cached value is marked as expired and recalculated in the background, while the previous value stays displayed until the new one is ready. It also resets the cache of parsed placeholders.

### Import Command Details

```bash
/zahstats import <v1|v4logs> confirm
```

Imports past sales into the addon. Works in two steps:
1. Run the command **without** `confirm` to do a dry run. It shows the estimated number of rows, the estimated time and any warnings.
2. Run it again **with** `confirm` to start the import. The import runs in the background, and progress is written to the console.

If the dry run shows a blocking warning (no `zah_*` table found in the V1 database, or V3 purchases that would be counted twice), the import is refused when you confirm it.

**Sources:**

| Source | Description |
|--------|-------------|
| `v1` | The `zah_*` tables of zAuctionHouseStats V1 |
| `v4logs` | The logs table of zAuctionHouse V4. Uses the listing price, so buyer and seller amounts are approximate |

The source name is case-insensitive, and `v4-logs` / `v4_logs` are also accepted.

Each source can only be imported once per database. On a multi-server setup, an import that is already running on another server is blocked. For the full process, see [Migration](/zauctionhouse/addons/stats/migration).

**Examples:**
```bash
# Dry run: preview the V1 import
/zahstats import v1

# Start the V1 import
/zahstats import v1 confirm
```

<CalloutContainer type="warning">

<CalloutDescription>
Always backup your database before importing.
</CalloutDescription>

</CalloutContainer>

### Purge Command Details

```bash
/zahstats purge <days> confirm
```

Deletes recorded sales, and finished listings, older than the given number of days. Active listings are never deleted. Daily totals and all-time totals are kept, so leaderboards, periods and player totals stay correct. Item prices and the day/week/month "biggest sale" leaderboard are calculated from the sales themselves, so purged sales no longer count there. Works in two steps:
1. Run the command **without** `confirm` to see how many rows would be deleted.
2. Run it again **with** `confirm` to delete them.

**Arguments:**
- `<days>` - Number of days to keep (required). A whole number, at least `1` (otherwise `purge-invalid-days`). Tab completion suggests `30`, `60`, `90`, `180` and `365`

To purge automatically every day, set `retention.sales-days` in `config.yml` (see [Configuration](/zauctionhouse/addons/stats/configuration)).

**Examples:**
```bash
# Preview: how many sales are older than 90 days
/zahstats purge 90

# Delete sales older than 90 days
/zahstats purge 90 confirm
```

<CalloutContainer type="warning">

<CalloutDescription>
A purge cannot be undone. Always backup your database first.
</CalloutDescription>

</CalloutContainer>

## zAuctionHouse Sub-Commands

The addon adds two sub-commands to the main zAuctionHouse command (`/zauctionhouse`, `/ah` and its other aliases). They are listed in `/ah help`. Both are for players only.

| Command | Description | Permission |
|---------|-------------|------------|
| `/ah stats` | Open the statistics hub (`stats.yml`) | `zauctionhouse.stats.use` |
| `/ah price [economy]` | Price statistics of the item in your hand | `zauctionhouse.stats.items` |

### Price Command Details

```bash
/ah price [economy]
```

Shows all-time price statistics for the item in your main hand: number of sales, average price and median price. Items are matched by material and custom model data.

**Arguments:**
- `[economy]` - The economy to use (optional, case-insensitive, defaults to the default zAuctionHouse economy)

You must hold an item, otherwise the addon sends `price-error`. An unknown economy sends `price-economy-unknown`. If no sale is recorded for this item, the addon sends the `price-no-data` message.

**Examples:**
```bash
# Prices of the item in hand, default economy
/ah price

# Prices in a specific economy
/ah price vault
```

## Permissions

All permissions default to `op`.

| Permission | Description | Default |
|------------|-------------|---------|
| `zauctionhouse.stats.use` | `/zahstats`, `/zahstats help` and `/ah stats` (statistics hub) | `op` |
| `zauctionhouse.stats.top` | `/zahstats top` and the leaderboard menu | `op` |
| `zauctionhouse.stats.player` | `/zahstats player` and the player statistics menu | `op` |
| `zauctionhouse.stats.items` | `/zahstats items`, `/ah price` and the item price menu | `op` |
| `zauctionhouse.stats.reload` | `/zahstats reload` | `op` |
| `zauctionhouse.stats.clearcache` | `/zahstats clearcache` | `op` |
| `zauctionhouse.stats.import` | `/zahstats import` | `op` |
| `zauctionhouse.stats.purge` | `/zahstats purge` | `op` |
| `zauctionhouse.stats.admin` | All permissions above, plus the administration menu (`admin.yml`) | `op` |

### Wildcard

`zauctionhouse.stats.admin` gives every other `zauctionhouse.stats.*` permission:

```yaml
zauctionhouse.stats.admin:
  children:
    zauctionhouse.stats.use: true
    zauctionhouse.stats.top: true
    zauctionhouse.stats.player: true
    zauctionhouse.stats.items: true
    zauctionhouse.stats.reload: true
    zauctionhouse.stats.clearcache: true
    zauctionhouse.stats.import: true
    zauctionhouse.stats.purge: true
```

### Menu Permissions

The default menus check the same permissions with a zMenu `open-requirement`:

| Menu | Permission |
|------|------------|
| `stats.yml` | `zauctionhouse.stats.use` |
| `leaderboard.yml` | `zauctionhouse.stats.top` |
| `player-stats.yml` | `zauctionhouse.stats.player` |
| `item-prices.yml` | `zauctionhouse.stats.items` |
| `admin.yml` | `zauctionhouse.stats.admin` |

In `stats.yml`, the button that opens the administration menu is only shown to players with `zauctionhouse.stats.admin`. See [Inventories](/zauctionhouse/addons/stats/inventories) for more details.

### Update Notifications

| Permission | Description | Default |
|------------|-------------|---------|
| `zplugin.notifs` | Receive the `version-available` message on join when a newer version of the addon is available | Not declared by the addon (operators only, unless you grant it) |

This permission is shared with the other GroupeZ plugins and is not part of `zauctionhouse.stats.admin`. The check only runs when `enable-version-checker` is `true` (see [Configuration](/zauctionhouse/addons/stats/configuration)).

## Permission Examples

### LuckPerms

Let all players use the statistics menus and `/ah price`:

```bash
/lp group default permission set zauctionhouse.stats.use true
/lp group default permission set zauctionhouse.stats.top true
/lp group default permission set zauctionhouse.stats.player true
/lp group default permission set zauctionhouse.stats.items true
```

Give staff full access:

```bash
/lp group admin permission set zauctionhouse.stats.admin true
```

### Example Group Setup

```yaml
# Default Group
permissions:
  - zauctionhouse.stats.use
  - zauctionhouse.stats.top
  - zauctionhouse.stats.player
  - zauctionhouse.stats.items

# Staff Group
permissions:
  - zauctionhouse.stats.admin
```
