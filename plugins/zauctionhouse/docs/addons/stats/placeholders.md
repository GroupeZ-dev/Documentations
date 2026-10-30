---
title: Placeholders
description: Every PlaceholderAPI placeholder provided by zAuctionHouseStats - leaderboards, player stats, server totals, material prices and V1 compatibility aliases
---

# Placeholders

zAuctionHouseStats registers a PlaceholderAPI expansion with the identifier **`zahstats`**, the same identifier as the V1 addon, so placeholders already used in your TAB, scoreboard or hologram configs keep working.

Every placeholder has this shape:

```
%zahstats_<body>%
```

The body belongs to one of four families: `top_`, `player_`, `global_` and `material_`. When V1 aliases are enabled, the [V1 aliases](#v1-compatibility-aliases) are also recognised, and they are checked before the four families.

## Requirements

- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed. It is a soft dependency, so the addon runs without it, but other plugins can only read these placeholders through PlaceholderAPI.
- The expansion is registered automatically when the addon enables. You do **not** need `/papi ecloud download`.
- The expansion is persistent (`persist() = true`), so `/papi reload` does not remove it.

<CalloutContainer type="info">

<CalloutTitle>A placeholder never queries the database</CalloutTitle>

<CalloutDescription>
Each placeholder reads an in-memory cache and returns right away. It never runs SQL and never waits, even when it is called from an async thread (TAB, holograms) or a Folia region thread. If a value has not been computed yet, the placeholder returns the `placeholders.loading` text and the value is computed in the background. Expired values are still served while they refresh, so a value that has loaded once does not go back to `Loading...`, not even after `/zahstats reload` or `/zahstats clearcache` (both only mark the caches as expired).
</CalloutDescription>

</CalloutContainer>

## Common rules

These rules apply to every family:

| Rule | Behaviour |
|------|-----------|
| Case | The whole body is case-insensitive: `%zahstats_TOP_Sellers_Money_1_name%` is the same as `%zahstats_top_sellers_money_1_name%`. |
| Period omitted | Defaults to `all` (all-time). |
| Economy omitted, **count** values | Total across all economies. |
| Economy omitted, **money** values | Uses the default economy: `leaderboards.default-economy` in `config.yml`, or the zAuctionHouse default economy when that key is empty. Amounts from different economies are never added together. |
| Economy names | Matched against the economies registered in zAuctionHouse, ignoring case. Names that contain `_` are supported. An unknown economy returns the `not-applicable` text. |
| Unknown body | Returns nothing, so PlaceholderAPI shows the raw `%zahstats_...%` text. This usually means a typo (unknown metric, invalid rank or field). |
| Raw vs formatted | Raw money is a plain decimal with 2 decimals (`1250.50`). Formatted money uses the zAuctionHouse economy format. Raw counts are whole numbers (`1500`) and formatted counts use thousand separators (`1,500`). |

### Period tokens

| Token | Window |
|-------|--------|
| `day` | Today, from midnight |
| `week` | This week, from Monday (ISO week) |
| `month` | This month, from the 1st |
| `all` | All-time (the default) |

Periods follow the calendar, not a sliding window. They are computed in the `statistics.timezone` set in `config.yml`, or in the server timezone when that key is empty. `global_*` placeholders do not take a period.

### Fallback texts

Fallback values come from the `placeholders` section of `config.yml` (see [Configuration](/zauctionhouse/addons/stats/configuration)):

| Key | Default | Shown when |
|-----|---------|------------|
| `placeholders.loading` | `Loading...` | The value is not in the cache yet: right after a server start, or the first time a given leaderboard, offline player or material is requested. |
| `placeholders.no-name` | `✘` | `top_..._<rank>_name` when the leaderboard has fewer entries than the requested rank. |
| `placeholders.no-value` | `0` | `top_..._<rank>_value` or `_format` beyond the leaderboard size, or a `player_*` placeholder used with no player (console, global hologram). |
| `placeholders.not-applicable` | `N/A` | The placeholder is valid but has no data: unknown economy, a period on an all-time-only metric, a disabled leaderboard, a material with no sales, a date that never happened, or no default economy available. |
| `placeholders.enable-not-applicable` | `true` | When `false`, every not-applicable case returns `0` instead, like V1 did. |
| `placeholders.date-format` | `dd/MM/yyyy HH:mm` | Pattern used by the `*_at` date placeholders (Java `DateTimeFormatter` syntax), applied in `statistics.timezone`. An invalid pattern falls back to the default and logs a warning. |
| `placeholders.enable-v1-aliases` | `true` | When `false`, the [V1 aliases](#v1-compatibility-aliases) are no longer recognised. |

## Leaderboards: `top_`

```
%zahstats_top_<metric>[_<period>][_<economy>]_<rank>_<field>%
```

### Metrics

| Token | Leaderboard | Type | Economy omitted |
|-------|-------------|------|-----------------|
| `sellers_money` | Money earned by sellers, after taxes | Money | Default economy |
| `buyers_money` | Money spent by buyers, taxes included | Money | Default economy |
| `sellers_count` | Number of completed sales as a seller | Count | All economies |
| `buyers_count` | Number of completed purchases as a buyer | Count | All economies |
| `tax_paid` | Total taxes paid (purchase tax share and listing tax) | Money | Default economy |
| `biggest_sale` | Largest single sale received by a seller | Money | Default economy |

### Rank and fields

- `<rank>` is a 1-based position (`1`, `2`, `3`, ...). A rank of `0`, a negative or non-numeric rank, or a rank longer than 6 digits makes the placeholder invalid (raw text is shown).
- How many entries are kept depends on `leaderboards.size` (default `10`, range 1 to 100). Ranks beyond the size, or beyond the number of ranked players, return the `no-name` and `no-value` texts.

| Field | Returns |
|-------|---------|
| `name` | Player name (`leaderboards.unknown-name`, default `?`, if the name is unknown) |
| `value` | Raw value: a whole number for counts, a plain decimal for money |
| `format` | Formatted value: economy format for money, thousand separators for counts |

A metric listed in `leaderboards.disabled` returns `not-applicable` for every field. A money leaderboard with no economy given and no default economy available also returns `not-applicable`.

### Examples

| Placeholder | Sample output |
|-------------|---------------|
| `%zahstats_top_sellers_money_1_name%` | `Notch` |
| `%zahstats_top_sellers_money_1_format%` | `$12,450.00` (depends on the economy format) |
| `%zahstats_top_sellers_money_1_value%` | `12450.00` |
| `%zahstats_top_sellers_money_day_1_name%` | Top seller today, default economy |
| `%zahstats_top_buyers_money_week_vault_3_format%` | 3rd biggest spender this week, `vault` economy |
| `%zahstats_top_sellers_count_2_value%` | `87` (sales across all economies) |
| `%zahstats_top_buyers_count_month_coins_1_name%` | Top buyer of the month, `coins` economy only |
| `%zahstats_top_tax_paid_1_format%` | Player who paid the most tax |
| `%zahstats_top_biggest_sale_all_vault_1_value%` | Largest single sale ever in `vault` |
| `%zahstats_top_sellers_money_15_name%` | `✘` with the default size of 10 |

<CalloutContainer type="info">

<CalloutTitle>Warm up the leaderboards you display</CalloutTitle>

<CalloutDescription>
Each (metric, period, economy) combination is computed the first time it is requested and then kept for `caches.leaderboard-ttl-seconds` (default 60). To avoid `Loading...` right after a restart, add the combinations you display to `leaderboards.preload` (by default: `TOP_SELLERS_MONEY` for `ALL` and `DAY`, and `TOP_BUYERS_MONEY` for `ALL`). See [Configuration](/zauctionhouse/addons/stats/configuration).
</CalloutDescription>

</CalloutContainer>

## Player statistics: `player_`

```
%zahstats_player_<metric>[_<period>][_<economy>][_format]%
```

These placeholders read the stats of the player in the PlaceholderAPI context. They also work for **offline** players, for example from plugins that resolve placeholders for an `OfflinePlayer`. Online players' stats are kept for `caches.player-stats-ttl-seconds` (default 60). An offline player's stats are loaded on first request (the first render shows `loading`) and kept for `caches.player-stats-offline-ttl-seconds` (default 60), for at most 256 offline players at a time. When there is no player at all, they return `no-value`.

### Metrics

| Token | Value | Type | Periods (`day`/`week`/`month`) |
|-------|-------|------|--------------------------------|
| `items_listed` | Items put up for sale | Count | Yes |
| `items_sold` | Items sold (completed sales) | Count | Yes |
| `items_bought` | Items bought | Count | Yes |
| `items_expired` | Listings that expired | Count | No, all-time only |
| `items_removed` | Listings removed by the player | Count | No, all-time only |
| `money_earned` | Money earned from sales, after taxes | Money | Yes |
| `money_spent` | Money spent on purchases | Money | Yes |
| `tax_paid` | Taxes paid | Money | Yes |
| `biggest_sale` | Largest single sale | Money | No, all-time only |
| `first_sale_at` | Date of the first sale | Date | No, all-time only |
| `last_sale_at` | Date of the last sale | Date | No, all-time only |
| `first_purchase_at` | Date of the first purchase | Date | No, all-time only |
| `last_purchase_at` | Date of the last purchase | Date | No, all-time only |

- Using `day`, `week` or `month` with an all-time-only metric returns `not-applicable`.
- **Counts** without an economy are summed across all economies. **Money** without an economy uses the default economy.
- **Dates** without an economy return the earliest (`first_*`) or latest (`last_*`) date across all economies. They use `placeholders.date-format` and return `not-applicable` if the event never happened. The `_format` suffix has no effect on dates.
- `_format` must be the last segment.

### Examples

| Placeholder | Sample output |
|-------------|---------------|
| `%zahstats_player_items_sold%` | `1342` |
| `%zahstats_player_items_sold_format%` | `1,342` |
| `%zahstats_player_items_sold_day%` | Items sold today, all economies |
| `%zahstats_player_items_listed_week_vault%` | Items listed this week in `vault` |
| `%zahstats_player_money_earned%` | `15230.75` (default economy) |
| `%zahstats_player_money_earned_format%` | `$15,230.75` |
| `%zahstats_player_money_earned_month_coins_format%` | Money earned this month in `coins`, formatted |
| `%zahstats_player_money_spent_vault%` | Raw money spent in `vault` |
| `%zahstats_player_tax_paid_week_format%` | Taxes paid this week, formatted |
| `%zahstats_player_biggest_sale_format%` | Player's largest sale |
| `%zahstats_player_last_sale_at%` | `21/10/2026 14:32` |
| `%zahstats_player_first_purchase_at_vault%` | First purchase made in `vault` |
| `%zahstats_player_items_expired_day%` | `N/A` (all-time only) |

## Server totals: `global_`

```
%zahstats_global_<key>[_<economy>][_format]%
```

Server-wide totals. In a multi-server setup with a shared database, these are network-wide totals. Sales on the current server show up right away, and totals are re-read from the database every `caches.global-stats-ttl-seconds` (default 60). These placeholders do **not** accept a period: `%zahstats_global_items_sold_day%` reads `day` as an economy name and returns `not-applicable`.

| Token | Value | Type | Economy omitted | Economy given |
|-------|-------|------|-----------------|---------------|
| `items_listed` | Items listed | Count | All economies | That economy |
| `items_sold` | Items sold | Count | All economies | That economy |
| `items_expired` | Listings expired | Count | All economies | That economy |
| `items_removed` | Listings removed | Count | All economies | That economy |
| `money_volume` | Total money traded | Money | Default economy | That economy |
| `tax_collected` | Total taxes collected | Money | Default economy | That economy |
| `biggest_sale` | Largest single sale | Money | Default economy | That economy |
| `auctions_opened` | Times the auction house menu was opened | Count | Server-wide total | `not-applicable` (not tracked per economy) |

### Examples

| Placeholder | Sample output |
|-------------|---------------|
| `%zahstats_global_items_sold%` | `48211` |
| `%zahstats_global_items_sold_format%` | `48,211` |
| `%zahstats_global_items_listed_vault%` | Items listed in `vault` |
| `%zahstats_global_money_volume_format%` | `$2,341,900.00` (default economy) |
| `%zahstats_global_money_volume_coins%` | Raw volume traded in `coins` |
| `%zahstats_global_tax_collected_vault_format%` | Taxes collected in `vault`, formatted |
| `%zahstats_global_biggest_sale_format%` | Largest sale on the server |
| `%zahstats_global_auctions_opened_format%` | `103,557` |

## Material prices: `material_`

```
%zahstats_material_[format_]<stat>[_<period>]_<economy>_<material>%
```

Price stats for one material, computed from completed sales. Unlike the other families, **the economy is required** here. An economy name that is not registered in zAuctionHouse returns `not-applicable`. `format_` comes **right after** `material_`, not at the end.

| Stat token | Value | Type |
|------------|-------|------|
| `average` | Average sale price (the listing price of each completed sale) | Money |
| `median` | Median sale price (the listing price of each completed sale) | Money |
| `count` | Number of completed sales | Count |
| `amount` | Same as `count` (V1 name) | Count |

The `<material>` part can be:

- a Bukkit material name, case-insensitive, such as `diamond`, `DIAMOND` or `netherite_ingot`,
- a number, which is read as a **custom model data** value (sales with that custom model data, whatever the material).

Prices are the listed price of the whole sale, not a price per item: a stack of 64 sold for 640 counts as 640.

A material with no sales in the chosen economy and period returns `not-applicable`. Values are kept for `caches.material-price-ttl-seconds` (default 3600) and up to `statistics.material-prices.max-entries` entries (default 1000). The median is computed from the most recent sales, at most `statistics.material-prices.median-sample-limit` prices (default 50000).

### Examples

| Placeholder | Sample output |
|-------------|---------------|
| `%zahstats_material_average_vault_diamond%` | `152.40` |
| `%zahstats_material_format_average_vault_diamond%` | `$152.40` |
| `%zahstats_material_median_week_vault_diamond%` | Median price of diamonds this week |
| `%zahstats_material_format_median_month_coins_netherite_ingot%` | Formatted median price of netherite ingots this month, in `coins` |
| `%zahstats_material_count_vault_elytra%` | `57` |
| `%zahstats_material_format_count_day_vault_diamond%` | Diamond sales today, with thousand separators |
| `%zahstats_material_amount_vault_diamond%` | Same as `count` |
| `%zahstats_material_average_vault_10001%` | Average price of items with custom model data `10001` |
| `%zahstats_material_average_vault_bedrock%` | `N/A` if bedrock was never sold |

## V1 compatibility aliases

When `placeholders.enable-v1-aliases` is `true` (the default), every V1 placeholder keeps working. Each alias is converted to the V2 placeholder in the right column and reads the same caches. Arguments are case-insensitive, and an unknown economy returns `not-applicable`. In the tables below, `<eco>` is a **required** economy name.

The V1 `material_[format_]average|median|amount_<eco>_<material>` placeholders are already valid V2 syntax (see [Material prices](#material-prices-material_)), so they are not listed here.

### Server totals

| V1 placeholder | V2 equivalent | Notes |
|----------------|---------------|-------|
| `%zahstats_item_sold_amount%` | `global_items_listed` | Counts **listings**, as in V1, despite the name |
| `%zahstats_item_purchase_amount%` | `global_items_sold` | |
| `%zahstats_number_of_items_not_sold%` | `global_items_expired` + `global_items_removed` | Sum of both |
| `%zahstats_number_of_items_expired%` | `global_items_expired` | Always returned nothing in V1, now returns real data |
| `%zahstats_number_of_items_remove_from_expire%` | `global_items_expired` | |
| `%zahstats_number_of_items_remove_from_storage%` | `global_items_removed` | |
| `%zahstats_number_of_items_remove_from_bought%` | `global_items_sold` | |
| `%zahstats_number_of_items_destroy%` | `global_items_expired` | |
| `%zahstats_auction_opened%` | `global_auctions_opened` | |

### Per-economy totals

| V1 placeholder | V2 equivalent | Notes |
|----------------|---------------|-------|
| `%zahstats_money_spend_<eco>%` | `global_money_volume_<eco>` | Raw |
| `%zahstats_money_spend_format_<eco>%` | `global_money_volume_<eco>_format` | Formatted |
| `%zahstats_total_price_of_all_items_sold_<eco>%` | none | Sum of the prices of all listings in that economy, raw. Computed on first request, then refreshed every 5 minutes |
| `%zahstats_total_price_of_all_items_sold_format_<eco>%` | none | Same, formatted |

### Player

| V1 placeholder | V2 equivalent | Notes |
|----------------|---------------|-------|
| `%zahstats_player_total_sales%` | `player_items_listed` | Counts **listings**, as in V1 |
| `%zahstats_player_total_sales_format%` | `player_items_listed_format` | Formatted as a number with thousand separators, not a price |
| `%zahstats_player_total_purchases%` | `player_items_bought` | |
| `%zahstats_player_total_purchases_format%` | `player_items_bought_format` | Formatted as a number with thousand separators |
| `%zahstats_player_total_earned_<eco>%` | `player_money_earned_<eco>` | Raw |
| `%zahstats_player_total_spent_<eco>%` | `player_money_spent_<eco>` | Raw |
| `%zahstats_player_total_format_earned_<eco>%` | `player_money_earned_<eco>_format` | Formatted |
| `%zahstats_player_total_format_spent_<eco>%` | `player_money_spent_<eco>_format` | Formatted |

### Leaderboards

V1 leaderboard aliases always read **rank 1** of the **all-time** leaderboard.

| V1 placeholder | V2 equivalent |
|----------------|---------------|
| `%zahstats_who_purchased_most_items_name%` | `top_buyers_count_1_name` |
| `%zahstats_who_purchased_most_items_amount%` | `top_buyers_count_1_value` |
| `%zahstats_who_sales_most_items_name%` | `top_sellers_count_1_name` |
| `%zahstats_who_sales_most_items_amount%` | `top_sellers_count_1_value` |
| `%zahstats_who_purchased_most_items_name_<eco>%` | `top_buyers_count_<eco>_1_name` |
| `%zahstats_who_purchased_most_items_amount_<eco>%` | `top_buyers_count_<eco>_1_value` |
| `%zahstats_who_sales_most_items_name_<eco>%` | `top_sellers_count_<eco>_1_name` |
| `%zahstats_who_sales_most_items_amount_<eco>%` | `top_sellers_count_<eco>_1_value` |
| `%zahstats_who_spent_most_money_name_<eco>%` | `top_buyers_money_<eco>_1_name` |
| `%zahstats_who_spent_most_money_amount_<eco>%` | `top_buyers_money_<eco>_1_value` |
| `%zahstats_format_who_spent_most_money_amount_<eco>%` | `top_buyers_money_<eco>_1_format` |
| `%zahstats_who_earned_most_money_name_<eco>%` | `top_sellers_money_<eco>_1_name` |
| `%zahstats_who_earned_most_money_amount_<eco>%` | `top_sellers_money_<eco>_1_value` |
| `%zahstats_format_who_earned_most_money_amount_<eco>%` | `top_sellers_money_<eco>_1_format` |

<CalloutContainer type="info">

<CalloutTitle>Fixed V1 leaderboards</CalloutTitle>

<CalloutDescription>
In V2, `who_sales_most_items_*` ranks players by **completed sales**. Aliases make old configs work as they are, but new configs should use the `top_` family, which also supports ranks other than 1 and periods. You can turn the aliases off with `placeholders.enable-v1-aliases: false` once you no longer use them.
</CalloutDescription>

</CalloutContainer>

## Using them in other plugins

### TAB, scoreboards and holograms

- **Pick a refresh interval that matches the cache.** Leaderboards and global totals refresh every 60 seconds by default, so refreshing a TAB or hologram placeholder every second only re-reads the same value. A refresh of 20 to 60 seconds (TAB `placeholderapi-refresh-intervals`, in milliseconds, or the hologram plugin's update interval) is enough. Lookups are cheap in any case, because they only read memory.
- **Global holograms have no player.** `top_`, `global_` and `material_` placeholders do not need a player and work in shared holograms (DecentHolograms, FancyHolograms, ...). `player_` placeholders need a player context. Without one they return `no-value`, so use per-player holograms or TAB for them.
- **Async rendering is safe.** Placeholders can be resolved from any thread (TAB and most hologram plugins render asynchronously), including on Folia.
- **Avoid `Loading...` after a restart.** Add the leaderboards you display to `leaderboards.preload`, or change `placeholders.loading` to a neutral text such as `...` or an empty string.

Example of a "top 3 sellers today" hologram:

```yaml
lines:
  - "&6Top sellers today"
  - "&e1. %zahstats_top_sellers_money_day_1_name% &7- &a%zahstats_top_sellers_money_day_1_format%"
  - "&e2. %zahstats_top_sellers_money_day_2_name% &7- &a%zahstats_top_sellers_money_day_2_format%"
  - "&e3. %zahstats_top_sellers_money_day_3_name% &7- &a%zahstats_top_sellers_money_day_3_format%"
```

Example of a scoreboard block:

```yaml
lines:
  - "&7Sold: &f%zahstats_player_items_sold_format%"
  - "&7Earned: &a%zahstats_player_money_earned_format%"
  - "&7Today: &a%zahstats_player_money_earned_day_format%"
```

### NPC plugins

NPC plugins (Citizens with a hologram trait, FancyNpcs, ZNPCsPlus, ...) can show leaderboard names directly. For example, a "rank 1 seller" NPC can use `%zahstats_top_sellers_money_1_name%` as its display name, or as the skin name if the plugin resolves placeholders in skin fields. When fewer players are ranked than the NPC's position, the name is the `placeholders.no-name` text (default `✘`). Set it to a player name that exists if your NPC plugin needs a valid skin.

### Testing

Use PlaceholderAPI's parse command to check a placeholder:

```
/papi parse me %zahstats_top_sellers_money_1_name%
/papi parse <player> %zahstats_player_money_earned_format%
```

| Result | Meaning |
|--------|---------|
| The raw `%zahstats_...%` text | Syntax not recognised. Check the family, tokens and field. |
| `Loading...` | Valid placeholder, value being computed. Try again a moment later. |
| `N/A` | Valid placeholder with no data. Check the economy name, the period, or whether the leaderboard is disabled. |

An economy name that was unknown is checked again on every render, so economies added later to zAuctionHouse are picked up automatically. After other changes to zAuctionHouse economies, run `/zahstats reload` or `/zahstats clearcache` (see [Commands & Permissions](/zauctionhouse/addons/stats/commands-permissions)) to reset the parsed placeholders and refresh the cached values.
