---
title: zAuctionHouseStats
description: Sales statistics, leaderboards, item price history and player stats for zAuctionHouse V4
---

# zAuctionHouseStats

**zAuctionHouseStats** is the official statistics addon for **zAuctionHouse V4**. It records every listing, sale and purchase made on your auction house, then turns that data into leaderboards, per-player statistics, item price references, zMenu GUIs and PlaceholderAPI placeholders.

It is built so that it never slows your server down. Every display (commands, menus, placeholders) is served from a cache, and all database work runs on one dedicated background thread. It is also safe to run on a network: several servers can share one MySQL/MariaDB database without counting a sale twice.

## What it does

### Leaderboards
Rank your players on **6 metrics**, each available for **4 periods** and filterable by economy:

| Metric | Ranks players by |
|--------|------------------|
| `TOP_SELLERS_MONEY` | Money actually received as a seller, after taxes |
| `TOP_BUYERS_MONEY` | Money actually paid as a buyer, taxes included |
| `TOP_SELLERS_COUNT` | Number of completed sales |
| `TOP_BUYERS_COUNT` | Number of completed purchases |
| `TOP_TAX_PAID` | Total taxes paid (purchase tax share and listing tax) |
| `BIGGEST_SALE` | Highest single sale received as a seller |

| Period | Window |
|--------|--------|
| `DAY` | Today, since midnight |
| `WEEK` | This week, since Monday |
| `MONTH` | This month, since the 1st |
| `ALL` | All time |

Periods are calendar windows, computed in the timezone set in `statistics.timezone` (or the server timezone). Money leaderboards are always calculated **per economy**: amounts from different economies are never added together.

### Player statistics
Each player gets a full profile: items listed, sold, bought, expired and removed, money earned and spent, taxes paid, biggest sale, and the dates of their first and last sale and purchase. Players can view their own profile, and staff can look up any player, including offline ones.

### Item price history
The addon records the material (and custom model data) of every item sold, so it can show the **number of sales, average price and median price** of any item. Players can check the item in their hand with `/ah price`, or browse the most sold items in the price explorer menu.

### Server-wide statistics
Global counters for the whole auction house: items listed, sold, expired and removed, total money volume, taxes collected, number of times the auction house was opened, and the biggest sale ever made.

### Ready-to-use GUIs
Five zMenu inventories are included and fully customizable: a statistics hub with a top 3 podium, the leaderboards, the player statistics profile, the item price explorer, and an admin status menu. They are generated in **English, French, Spanish or Italian**.

### Placeholders
Every statistic is available as a `%zahstats_...%` placeholder (`top_`, `player_`, `global_` and `material_` families). Placeholders never query the database when they are displayed: they show a loading text until the value is ready, then read it from the cache.

### V1 compatibility
Coming from the old zAuctionHouseStats V1? The V1 placeholder names keep working through a compatibility layer (it can be turned off with `placeholders.enable-v1-aliases`), and your V1 history can be imported with `/zahstats import v1`. Existing zAuctionHouse V4 history can also be imported from its logs with `/zahstats import v4logs`.

## Key features

| Feature | Description |
|---------|-------------|
| **6 leaderboards x 4 periods** | Daily, weekly, monthly and all-time rankings, per economy |
| **Player profiles** | 13 statistics per player, viewable in chat, GUI or placeholders |
| **Item prices** | Number of sales, average and median price per item |
| **Integrated commands** | `/zahstats` plus `/ah stats` and `/ah price` added to the zAuctionHouse command |
| **zMenu GUIs** | 5 inventories, 11 custom button types, 2 patterns |
| **PlaceholderAPI** | `%zahstats_*%` placeholders, plus the V1 placeholder names |
| **Zero-lag design** | Cached reads, batched writes on a dedicated thread, no SQL on the main or region threads |
| **Multi-server safe** | Counters are written as atomic increments, so several servers can share one database |
| **Own database** | Separate SQLite, MySQL or MariaDB storage (tables prefixed with `zahstats_` by default), never the zAuctionHouse tables |
| **History import** | Import from zAuctionHouseStats V1 or from the zAuctionHouse V4 logs |
| **Retention** | Optional daily purge of old sale and listing rows, while daily rollups, leaderboards and all-time totals are kept |
| **Folia** | Fully supported |
| **Public API** | A `StatsManager` service for other plugins |

## Requirements

| Requirement | Version |
|-------------|---------|
| **Java** | 21 or higher |
| **Minecraft** | 1.21+ |
| **zAuctionHouse** | V4, **4.0.1.5 or newer** recommended |
| **zMenu** | Required (the addon disables itself if zMenu is not working) |
| **PlaceholderAPI** | Optional, only needed for `%zahstats_*%` placeholders in other plugins (they always work inside the addon's zMenu inventories) |

### Supported server software

| Software | Status |
|----------|--------|
| **Paper** | Recommended |
| **Folia** | Fully supported |
| **Paper forks** (Purpur, Pufferfish, ...) | Supported |
| **Spigot** | Not supported (the addon uses the Paper API) |

<CalloutContainer type="warning">

<CalloutTitle>zAuctionHouse V4 only</CalloutTitle>

<CalloutDescription>
This addon does not work with zAuctionHouse V3. If zAuctionHouse is missing, disabled, or is not V4, the addon shuts itself down at startup and explains why in the console.
</CalloutDescription>

</CalloutContainer>

## How data is collected

zAuctionHouseStats supports two ways of collecting data. Only **one** of them is active on a server at any time, so a sale can never be counted twice.

| Source | When it is used | Accuracy |
|--------|-----------------|----------|
| **zAuctionHouse events** (default) | zAuctionHouse **4.0.1.5 or newer** | Exact: real amounts paid and received, taxes, item details |
| **Logs polling** (fallback) | Older zAuctionHouse V4 builds, only if `collection.polling.enabled` is `true` | Approximate prices |

- **Events mode**: the addon listens to the events zAuctionHouse fires after a listing, purchase, money claim or auction house opening, as well as to item expirations and removals. Events are queued in memory and written to the database in batches (every 2 seconds by default, or sooner during busy moments).
- **Logs polling mode**: if the installed zAuctionHouse does not fire these events, the addon can read the zAuctionHouse logs table at a regular interval instead. This mode is never enabled by default. On a network, enable it on **one server only**.

The source is selected with `collection.mode` (`AUTO`, `EVENTS` or `LOGS_POLLING`). With the default `AUTO`, the addon uses the events when they exist. If they don't and polling is not allowed, the addon disables itself and asks you to update zAuctionHouse.

<CalloutContainer type="info">

<CalloutTitle>Running a network?</CalloutTitle>

<CalloutDescription>
Use `MYSQL` or `MARIADB` storage and point every server to the same database. If the addon detects [zAuctionHouseRedis](https://groupez.dev/resources/zauctionhouse-redis.210) while using SQLite, it warns you that each server will only see its own statistics. See also the [zAuctionHouse Redis](/zauctionhouse/addons/redis/introduction) addon page.
</CalloutDescription>

</CalloutContainer>

## Next steps

- [Installation](/zauctionhouse/addons/stats/installation) - Install the addon and set up its database
- [Commands & Permissions](/zauctionhouse/addons/stats/commands-permissions) - Every `/zahstats`, `/ah stats` and `/ah price` command
- [Placeholders](/zauctionhouse/addons/stats/placeholders) - The full `%zahstats_*%` reference and the V1 names
- [Configuration](/zauctionhouse/addons/stats/configuration) - Every `config.yml` option explained
- [Inventories](/zauctionhouse/addons/stats/inventories) - Customize the GUIs and the custom button types
- [Migration](/zauctionhouse/addons/stats/migration) - Import your V1 or zAuctionHouse V4 history
- [API](/zauctionhouse/addons/stats/api) - Use the statistics from your own plugin
