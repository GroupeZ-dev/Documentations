---
title: Developer API
description: Read zAuctionHouseStats leaderboards, player statistics and item prices from your own plugin
---

# Developer API

zAuctionHouseStats exposes a small, read-only API through the Bukkit `ServicesManager`. It lets your plugin read the same leaderboards, player statistics and item prices that power the addon's [commands](/zauctionhouse/addons/stats/commands-permissions), [placeholders](/zauctionhouse/addons/stats/placeholders) and [inventories](/zauctionhouse/addons/stats/inventories).

All public types live in the `fr.maxlego08.stats.api` package:

| Type | Kind | Description |
|------|------|-------------|
| `StatsManager` | Interface | Entry point: leaderboards, player statistics, item prices |
| `LeaderboardMetric` | Enum | The 6 available leaderboards |
| `StatsPeriod` | Enum | Calendar windows: `DAY`, `WEEK`, `MONTH`, `ALL` |
| `LeaderboardEntry` | Record | One row of a leaderboard |
| `PlayerStatsSnapshot` | Record | Full statistics sheet of a player |
| `ItemPriceStats` | Record | Sales count, average and median price of an item |

<CalloutContainer type="info">

<CalloutDescription>
The API is stable across the 2.x versions: no constant of `LeaderboardMetric` or `StatsPeriod` is removed in 2.x.
</CalloutDescription>

</CalloutContainer>

## Dependency

zAuctionHouseStats is a commercial addon: its build publishes to the **private** GroupeZ repository (`https://repo.groupez.dev/private`), which requires credentials. If you do not have access to it, compile against the plugin jar directly.

### Compiling against the jar

Put `zAuctionHouseStats.jar` in a `libs/` folder of your project.

**Gradle (Kotlin DSL)**

```kotlin
dependencies {
    compileOnly(files("libs/zAuctionHouseStats.jar"))
}
```

**Maven**

```xml
<dependency>
    <groupId>fr.maxlego08.stats</groupId>
    <artifactId>zauctionhousestats</artifactId>
    <version>2.0.0</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/libs/zAuctionHouseStats.jar</systemPath>
</dependency>
```

### From the private repository

If your account has access to the private repository:

```kotlin
repositories {
    maven {
        name = "groupezPrivate"
        url = uri("https://repo.groupez.dev/private")
        credentials(PasswordCredentials::class)
    }
}

dependencies {
    compileOnly("fr.maxlego08.stats:zauctionhousestats:2.0.0")
}
```

<CalloutContainer type="warning">

<CalloutDescription>
Always use `compileOnly` (Gradle) or `provided` / `system` (Maven): never shade zAuctionHouseStats into your plugin. The classes are provided at runtime by the installed addon.
</CalloutDescription>

</CalloutContainer>

### plugin.yml

Declare the addon as a dependency so that it is enabled before your plugin:

```yaml
depend:
  - zAuctionHouseStats
# or, if your plugin can run without it:
softdepend:
  - zAuctionHouseStats
```

## Getting the StatsManager

The `StatsManager` is registered in the `ServicesManager` at the **very end** of the addon's startup (after the database, caches, menus, placeholders and commands are ready), so the API is never exposed in a half-initialized state. It is unregistered when the addon is disabled.

```java
import fr.maxlego08.stats.api.StatsManager;
import org.bukkit.Bukkit;
import org.bukkit.plugin.RegisteredServiceProvider;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private StatsManager statsManager;

    @Override
    public void onEnable() {
        RegisteredServiceProvider<StatsManager> registration =
            Bukkit.getServicesManager().getRegistration(StatsManager.class);

        if (registration == null) {
            getLogger().warning("zAuctionHouseStats not found, statistics features disabled.");
            return;
        }

        this.statsManager = registration.getProvider();
        getLogger().info("Hooked into zAuctionHouseStats!");
    }
}
```

<CalloutContainer type="info">

<CalloutDescription>
If zAuctionHouseStats fails to start (for example when its configuration cannot be satisfied), it disables itself and never registers the service: `getRegistration` then returns `null`.
</CalloutDescription>

</CalloutContainer>

## Threading guarantees

Every method of `StatsManager` returns a `CompletableFuture` and is **served from the addon's caches**. The contract is:

| Guarantee | Details |
|-----------|---------|
| Never blocking | No call runs synchronous SQL or blocks the calling thread. You can call the API from the main thread, a region thread or an async thread. |
| Warm cache | The returned future is **already completed**. |
| Stale value | When the cached value is older than its TTL, the old value is returned immediately (already-completed future) and a background refresh is triggered. |
| Cold cache | The future completes when the first asynchronous load finishes. |
| Coalesced loads | Simultaneous requests for the same key share a single database query (50 cold calls = 1 query). |
| Possibly stale | Values can be up to one cache TTL old (see the `caches` section of the [configuration](/zauctionhouse/addons/stats/configuration) and [Data source](#data-source-zauctionhouse-events) below). |
| Defensive copies | Each caller receives its own copy of the future: calling `cancel`, `complete` or `orTimeout` on it never affects other callers. |
| Completion thread | Futures complete on the addon's storage thread (`zAHStats-Storage`), **not** on the main thread. |

<CalloutContainer type="warning">

<CalloutTitle>Switch back to the right thread</CalloutTitle>

<CalloutDescription>
Because futures complete on the `zAHStats-Storage` thread, you **must** switch back to the main / region / entity thread before touching the game state (inventories, entities, worlds). On Folia, use the entity scheduler of the player, for example through zAuctionHouse's scheduler: `auctionPlugin.getScheduler().runAtEntity(player, task -> ...)`. Never call `join()` or `get()` on these futures from the main thread.
</CalloutDescription>

</CalloutContainer>

Cache lifetimes used by the API:

| Method | Cache TTL key | Default |
|--------|---------------|---------|
| `getLeaderboard` | `caches.leaderboard-ttl-seconds` | `60` |
| `getPlayerStats` | `caches.player-stats-ttl-seconds` | `60` |
| `getItemPriceStatistics` | `caches.material-price-ttl-seconds` | `3600` |

### Failures and shutdown

| Situation | Result |
|-----------|--------|
| A refresh fails while a value is already cached | The previous value is kept and returned; a warning is logged and the next retry happens after a full TTL. |
| The very first load of a key fails | The future completes exceptionally. Until a full TTL has elapsed, further calls for that key return a failed future (the database is not hammered). |
| The addon is shutting down | In-flight futures complete immediately with the last cached value, or exceptionally with a `CancellationException` when no value was ever loaded. |

Always handle the exceptional case, for example with `exceptionally(...)` or `whenComplete(...)`.

## StatsManager

```java
public interface StatsManager {

    CompletableFuture<List<LeaderboardEntry>> getLeaderboard(LeaderboardMetric metric, StatsPeriod period,
                                                             String economyName);

    CompletableFuture<PlayerStatsSnapshot> getPlayerStats(UUID uniqueId);

    CompletableFuture<ItemPriceStats> getItemPriceStatistics(String economyName, Material material);

    CompletableFuture<ItemPriceStats> getItemPriceStatistics(String economyName, String material,
                                                             Integer customModelData, StatsPeriod period);
}
```

### getLeaderboard

```java
CompletableFuture<List<LeaderboardEntry>> getLeaderboard(LeaderboardMetric metric, StatsPeriod period, String economyName)
```

Returns the top-N of a leaderboard, where N is `leaderboards.size` (default `10`, bounded to `[1, 100]`). The returned list is immutable and sorted by rank.

| Parameter | Description |
|-----------|-------------|
| `metric` | The leaderboard, see [LeaderboardMetric](#leaderboardmetric). Required (`NullPointerException` if `null`). |
| `period` | The calendar window, see [StatsPeriod](#statsperiod). `null` = `ALL`. |
| `economyName` | The zAuctionHouse economy name (surrounding spaces are trimmed). `null` or empty = the default economy for money metrics, **all economies combined** for count metrics. A non-empty name always restricts the leaderboard to that economy. |

Special cases:

| Situation | Result |
|-----------|--------|
| The metric is listed in `leaderboards.disabled` | Future completed with an empty list, no query |
| A money metric is requested without economy and no default economy can be resolved | Future completed with an empty list |
| The leaderboard has fewer players than N | A shorter list |

The default economy is `leaderboards.default-economy`, or zAuctionHouse's default economy when that key is empty. Money metrics are always computed for **one** economy: amounts from different economies are never added together.

### getPlayerStats

```java
CompletableFuture<PlayerStatsSnapshot> getPlayerStats(UUID uniqueId)
```

Returns the statistics sheet of a player, see [PlayerStatsSnapshot](#playerstatssnapshot). `uniqueId` is required (`NullPointerException` if `null`). A player without any recorded statistics returns an **empty** snapshot (`isEmpty()` is `true`), never `null`.

Online players are pre-loaded when they join, so their snapshot is usually already cached.

### getItemPriceStatistics (Material)

```java
CompletableFuture<ItemPriceStats> getItemPriceStatistics(String economyName, Material material)
```

Price statistics of a material over all time, without any custom model data filter. Equivalent to `getItemPriceStatistics(economyName, material.name(), null, StatsPeriod.ALL)`.

| Parameter | Description |
|-----------|-------------|
| `economyName` | Economy name. `null` or empty = default economy. |
| `material` | The Bukkit material. Required (`NullPointerException` if `null`). |

### getItemPriceStatistics (full)

```java
CompletableFuture<ItemPriceStats> getItemPriceStatistics(String economyName, String material,
                                                         Integer customModelData, StatsPeriod period)
```

| Parameter | Description |
|-----------|-------------|
| `economyName` | Economy name. `null` or empty = default economy. |
| `material` | Bukkit material name, case-insensitive (`"diamond"` = `"DIAMOND"`). `null` or blank = filter on `customModelData` only, across all materials. |
| `customModelData` | Filter on the custom model data of the sold item. `null` = no filter. |
| `period` | Calendar window. `null` = `ALL`. |

| Situation | Result |
|-----------|--------|
| `material` is `null` / blank and `customModelData` is `null` | `IllegalArgumentException` thrown **immediately** (not through the future) |
| No economy can be resolved | Future completed with an empty `ItemPriceStats` (count `0`, average and median `0.00`) |
| No matching sale | Future completed with an empty `ItemPriceStats` |

Prices are computed on the **listing price** of completed sales. In the `DAY` / `WEEK` / `MONTH` windows, only sales made since midnight of the first day of the window (in `statistics.timezone`) are counted.

## Types

### LeaderboardMetric

| Constant | Value ranked | Money metric | Description |
|----------|--------------|:------------:|-------------|
| `TOP_SELLERS_MONEY` | Sum of money received by the seller | Yes | Money actually earned by sellers, net of taxes |
| `TOP_BUYERS_MONEY` | Sum of money paid by the buyer | Yes | Money actually spent by buyers, taxes included |
| `TOP_SELLERS_COUNT` | Number of sales | No | Completed sales as a seller |
| `TOP_BUYERS_COUNT` | Number of purchases | No | Completed purchases as a buyer |
| `TOP_TAX_PAID` | Sum of taxes paid | Yes | Taxes borne by the player (purchase tax share + listing tax) |
| `BIGGEST_SALE` | Maximum single sale | Yes | Biggest single sale received as a seller |

Methods:

| Method | Return type | Description |
|--------|-------------|-------------|
| `isMoney()` | `boolean` | `true` for money metrics: an economy is always required (default economy if none is given), and the value can be formatted with zAuctionHouse's economy format |
| `getAggregation()` | `LeaderboardMetric.Aggregation` | `SUM` or `MAX` (`MAX` only for `BIGGEST_SALE`) |
| `getAllTimeColumn()` | `String` | Internal database column used for the `ALL` period |
| `getDailyColumn()` | `String` | Internal database column used for `DAY` / `WEEK` / `MONTH`, `null` for `BIGGEST_SALE` |

### StatsPeriod

Periods are **calendar windows**, computed in the timezone configured by `statistics.timezone` (empty = server timezone):

| Constant | Window |
|----------|--------|
| `DAY` | Today, since midnight |
| `WEEK` | Since Monday (ISO week) |
| `MONTH` | Since the 1st of the current month |
| `ALL` | All time |

Methods:

| Method | Return type | Description |
|--------|-------------|-------------|
| `isWindowed()` | `boolean` | `true` for every constant except `ALL` |
| `minEpochDay(ZoneId zone)` | `long` | First epoch-day included in the window. Throws `IllegalStateException` for `ALL` |
| `minEpochDay(Clock clock, ZoneId zone)` | `long` | Same, with an injected clock |
| `minEpochDay(LocalDate today)` | `long` | First epoch-day of the window containing `today`. Throws `IllegalStateException` for `ALL` |
| `windowStart(Clock clock, ZoneId zone)` | `Instant` | Midnight of the first day of the window. Throws `IllegalStateException` for `ALL` |

### LeaderboardEntry

```java
public record LeaderboardEntry(int rank, UUID uuid, String name, BigDecimal value) {}
```

| Field | Type | Description |
|-------|------|-------------|
| `rank` | `int` | Position, from `1` to N. Ranks are positional (1, 2, 3…): ties are never shared and are broken by UUID |
| `uuid` | `UUID` | The player |
| `name` | `String` | Last known name of the player, or `leaderboards.unknown-name` (default `?`) if unknown |
| `value` | `BigDecimal` | The ranked value. Scale 2 for money metrics, scale 0 for counts |

### PlayerStatsSnapshot

```java
public record PlayerStatsSnapshot(UUID uniqueId, String name, Map<String, PlayerEconomyStats> byEconomy,
                                  Map<PeriodKey, PlayerPeriodStats> periods, long loadedAt) {}
```

| Field | Type | Description |
|-------|------|-------------|
| `uniqueId` | `UUID` | The player |
| `name` | `String` | Last known name, `null` if unknown |
| `byEconomy` | `Map<String, PlayerEconomyStats>` | All-time totals, keyed by economy name (immutable) |
| `periods` | `Map<PeriodKey, PlayerPeriodStats>` | Totals of the `DAY`, `WEEK` and `MONTH` windows, keyed by (period, economy) (immutable) |
| `loadedAt` | `long` | Epoch milliseconds of the load |

| Method | Return type | Description |
|--------|-------------|-------------|
| `economy(String economyName)` | `Optional<PlayerEconomyStats>` | All-time totals of an economy, empty if the player never used it |
| `period(StatsPeriod period, String economyName)` | `Optional<PlayerPeriodStats>` | Totals of a window for an economy, empty if there was no activity in that window |
| `isEmpty()` | `boolean` | `true` if the player has no recorded statistics |

#### PlayerStatsSnapshot.PeriodKey

```java
public record PeriodKey(StatsPeriod period, String economyName) {}
```

`period` is `DAY`, `WEEK` or `MONTH` (never `ALL`, which is served by `byEconomy`).

#### PlayerStatsSnapshot.PlayerEconomyStats

All-time totals of one economy.

| Field | Type | Description |
|-------|------|-------------|
| `itemsListed` | `long` | Items put up for sale |
| `itemsSold` | `long` | Items sold |
| `itemsBought` | `long` | Items bought |
| `itemsExpired` | `long` | Listings that expired without being sold |
| `itemsRemoved` | `long` | Listings removed from sale |
| `moneyEarned` | `BigDecimal` | Money earned as a seller, net of taxes |
| `moneySpent` | `BigDecimal` | Money spent as a buyer, taxes included |
| `taxPaid` | `BigDecimal` | Taxes paid |
| `biggestSale` | `BigDecimal` | Biggest single sale received |
| `firstSaleAt` | `Instant` | First sale, `null` if never |
| `lastSaleAt` | `Instant` | Last sale, `null` if never |
| `firstPurchaseAt` | `Instant` | First purchase, `null` if never |
| `lastPurchaseAt` | `Instant` | Last purchase, `null` if never |

#### PlayerStatsSnapshot.PlayerPeriodStats

Totals of one window (`DAY` / `WEEK` / `MONTH`) for one economy.

| Field | Type | Description |
|-------|------|-------------|
| `itemsSold` | `long` | Items sold |
| `itemsBought` | `long` | Items bought |
| `itemsListed` | `long` | Items put up for sale |
| `moneyEarned` | `BigDecimal` | Money earned, net of taxes |
| `moneySpent` | `BigDecimal` | Money spent, taxes included |
| `taxPaid` | `BigDecimal` | Taxes paid |

### ItemPriceStats

```java
public record ItemPriceStats(long count, BigDecimal average, BigDecimal median) {}
```

| Field | Type | Description |
|-------|------|-------------|
| `count` | `long` | Exact number of matching sales |
| `average` | `BigDecimal` | Average price (scale 2), `0` if no sale |
| `median` | `BigDecimal` | Median price (scale 2), computed on the most recent sales, up to `statistics.material-prices.median-sample-limit` (default `50000`); `0` if no sale |

| Method | Return type | Description |
|--------|-------------|-------------|
| `isEmpty()` | `boolean` | `true` if no sale matches (`count == 0`) |

## Examples

### Display the top sellers of the day

```java
import fr.maxlego08.stats.api.LeaderboardEntry;
import fr.maxlego08.stats.api.LeaderboardMetric;
import fr.maxlego08.stats.api.StatsManager;
import fr.maxlego08.stats.api.StatsPeriod;
import fr.maxlego08.zauctionhouse.api.AuctionPlugin;
import org.bukkit.entity.Player;

public void sendDailyTop(AuctionPlugin auctionPlugin, StatsManager stats, Player player) {
    stats.getLeaderboard(LeaderboardMetric.TOP_SELLERS_MONEY, StatsPeriod.DAY, null) // default economy
        .whenComplete((entries, throwable) -> {
            // Back on the player's thread before sending messages / touching the game state
            auctionPlugin.getScheduler().runAtEntity(player, task -> {
                if (throwable != null) {
                    player.sendMessage("Statistics are unavailable right now.");
                    return;
                }
                if (entries.isEmpty()) {
                    player.sendMessage("No sales today.");
                    return;
                }
                for (LeaderboardEntry entry : entries) {
                    player.sendMessage("#" + entry.rank() + " " + entry.name() + " - " + entry.value());
                }
            });
        });
}
```

### Read a player's statistics

```java
import fr.maxlego08.stats.api.PlayerStatsSnapshot;
import fr.maxlego08.stats.api.StatsPeriod;

stats.getPlayerStats(player.getUniqueId()).thenAccept(snapshot -> {
    if (snapshot.isEmpty()) return;

    // All-time totals for the "vault" economy
    snapshot.economy("vault").ifPresent(total -> {
        long sold = total.itemsSold();
        java.math.BigDecimal earned = total.moneyEarned();
        // ...
    });

    // This week's totals for the same economy
    snapshot.period(StatsPeriod.WEEK, "vault").ifPresent(week -> {
        long boughtThisWeek = week.itemsBought();
        // ...
    });
});
```

### Get the average price of an item

```java
import fr.maxlego08.stats.api.ItemPriceStats;
import fr.maxlego08.stats.api.StatsPeriod;
import org.bukkit.Material;

// All time, default economy
stats.getItemPriceStatistics(null, Material.DIAMOND).thenAccept(prices -> {
    if (prices.isEmpty()) return; // never sold
    java.math.BigDecimal average = prices.average();
    java.math.BigDecimal median = prices.median();
    long sales = prices.count();
});

// This month, "vault" economy, only items with custom model data 1001
stats.getItemPriceStatistics("vault", "PAPER", 1001, StatsPeriod.MONTH)
    .thenAccept(prices -> { /* ... */ });
```

<CalloutContainer type="warning">

<CalloutDescription>
Never call `join()` or `get()` on these futures from the main thread: on a cold cache, it would wait for a database query. Always chain with `thenAccept`, `whenComplete`, etc., then switch back to the right thread.
</CalloutDescription>

</CalloutContainer>

## Data source: zAuctionHouse events

zAuctionHouseStats does not expose events of its own. It collects its data by listening (at `MONITOR` priority, without ever modifying them) to zAuctionHouse V4 events. The dedicated statistics events live in the `fr.maxlego08.zauctionhouse.api.event.events.stats` package:

| Event | Fired when | Used for |
|-------|-----------|----------|
| `AuctionItemListedEvent` | An item has been successfully listed for sale | Listings, listing tax |
| `AuctionItemPurchasedEvent` | A purchase has been fully committed (once per purchase, on the buyer's server) | Sales, money earned/spent, taxes, item prices, leaderboards |
| `AuctionMoneyClaimEvent` | A player has claimed pending money | Money claims per economy |
| `AuctionOpenEvent` | A player opens (or comes back to) the main auction inventory | Activity counter |

These four events are observational only (not cancellable) and are delivered synchronously on the main thread (the global region thread on Folia).

The addon also listens to existing zAuctionHouse events:

| Event | Package | Used for |
|-------|---------|----------|
| `AuctionExpireEvent` | `fr.maxlego08.zauctionhouse.api.event.events` | Listings that expired without being sold (only items of the `LISTED` storage) |
| `AuctionRemoveListedItemEvent` | `fr.maxlego08.zauctionhouse.api.event.events.remove` | Listings removed from sale (credited to the seller, even when an admin removes the item) |
| `AuctionRemoveExpiredItemEvent` | `fr.maxlego08.zauctionhouse.api.event.events.remove` | Keeping player names up to date |
| `AuctionRemovePurchasedItemEvent` | `fr.maxlego08.zauctionhouse.api.event.events.remove` | Keeping player names up to date |

Event handlers never touch the database: they only queue the data, which is written asynchronously in batches (see `flush.interval-seconds` in the [configuration](/zauctionhouse/addons/stats/configuration)). Consequences for the API:

- A `PlayerStatsSnapshot` that is **already cached** on the server where the activity happened is updated immediately in memory, without any query.
- After each flush, the caches of the affected players are refreshed from the database (this also picks up activity recorded by other servers of a cluster), and cached item prices that had no sale yet are refreshed when that material is sold.
- Leaderboards and other cached item prices pick up new activity when their cache TTL expires.

<CalloutContainer type="info">

<CalloutDescription>
The statistics events require a recent zAuctionHouse V4 build. With `collection.mode: AUTO`, if the installed zAuctionHouse does not provide them, the addon can fall back to reading the zAuctionHouse logs table instead (only when `collection.polling.enabled` is `true`). This is a degraded mode: amounts are approximate (listing price, taxes unknown) and expirations and auction openings are not recorded. The API is the same in both modes. See [Installation](/zauctionhouse/addons/stats/installation) and [Configuration](/zauctionhouse/addons/stats/configuration).
</CalloutDescription>

</CalloutContainer>

To listen to these events yourself, see the zAuctionHouse [Events](/zauctionhouse/development/events) page.
