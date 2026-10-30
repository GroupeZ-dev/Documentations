---
title: Inventories
description: Menus, patterns and custom zMenu button types of the zAuctionHouseStats addon
---

# Inventories

zAuctionHouseStats ships five menus and two patterns, all powered by [zMenu](https://modrinth.com/plugin/zmenu). This page explains each menu, the patterns, and every custom button type added by the addon (`ZAUCTIONHOUSESTATS_*`), with all of their options.

For general zMenu options (items, slots, lore, actions, requirements, etc.), see the [zMenu documentation](https://docs.groupez.dev/zmenu).

## Files and Folders

All menu files are in the addon data folder:

```
plugins/zAuctionHouseStats/
├── language.yml
├── inventories/
│   ├── stats.yml
│   ├── leaderboard.yml
│   ├── player-stats.yml
│   ├── item-prices.yml
│   └── admin.yml
└── patterns/
    ├── zahstats-back.yml
    └── zahstats-pagination.yml
```

- Every `.yml` file in `inventories/` (including sub-folders) is loaded as a menu. The menu name is the file name without `.yml` (for example `leaderboard`).
- Every `.yml` file in `patterns/` is loaded as a pattern. You can add your own patterns there.
- A missing default file is created again at startup. An existing file is **never overwritten**, so your changes are kept.
- `/zahstats reload` reloads all menus and patterns. A pattern you deleted or renamed is removed from zMenu on reload.

<CalloutContainer type="warning">

<CalloutTitle>Invalid menu files</CalloutTitle>

<CalloutDescription>
If a menu or a pattern is invalid at startup, the addon disables itself and logs the error. If it happens during `/zahstats reload`, the configuration and messages are still applied, and the addon sends the `reload-menus-error` message.
</CalloutDescription>

</CalloutContainer>

### Language

The default menus are available in four languages. The language is chosen with `language.yml`:

| Value | Language |
|-------|----------|
| `auto` | Detected from the server locale (country first, then language). Default value |
| `en` | English |
| `fr` | French |
| `es` | Spanish |
| `it` | Italian |

Any other value falls back to English, with a warning in the console. The four versions of each menu have the same layout, slots and button types: only the texts change. The examples on this page are the English files.

```yaml
language: auto
```

<CalloutContainer type="info">

<CalloutDescription>
The language only applies to files that **do not exist yet**. To switch language, delete `messages.yml` and the `inventories/` and `patterns/` folders in `plugins/zAuctionHouseStats/`, then restart the server. `/zahstats reload` does not change the language.
</CalloutDescription>

</CalloutContainer>

## Menus Overview

| File | Purpose | How to open | Permission (`open-requirement`) |
|------|---------|-------------|---------------------------------|
| `stats.yml` | Hub: global statistics, top 3 sellers, navigation | `/ah stats` | `zauctionhouse.stats.use` |
| `leaderboard.yml` | Paginated leaderboards with selectors | Hub button | `zauctionhouse.stats.top` |
| `player-stats.yml` | Statistics sheet of a player | Hub "My statistics" button, or click a player in a leaderboard / podium | `zauctionhouse.stats.player` |
| `item-prices.yml` | Price explorer of the best-selling materials | `/zahstats items [economy]`, or hub button | `zauctionhouse.stats.items` |
| `admin.yml` | Write queue, caches and maintenance | Hub button (only shown to admins) | `zauctionhouse.stats.admin` |

The permission check is done by a zMenu `open-requirement` in each file. If the player does not have the permission, the `deny` message of the file is sent. See [Commands & Permissions](/zauctionhouse/addons/stats/commands-permissions) for the full permission list.

To open an addon menu from another button, use a zMenu `INVENTORY` button with `plugin: zAuctionHouseStats`:

```yaml
open-leaderboard:
  type: INVENTORY
  inventory: leaderboard
  plugin: zAuctionHouseStats
  slot: 38
  item:
    material: GOLD_INGOT
    name: "#2CCED2<bold>ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅs"
```

Menus are opened with a navigation history, so the `BACK` button returns to the previous menu.

---

## stats.yml (Hub)

The hub shows live global statistics, the top 3 sellers and buttons to open the other menus. It is opened with `/ah stats`.

| Setting | Value |
|---------|-------|
| Size | 54 |
| `update-interval` | `1000` (ms) |
| `fill-item` | `BLACK_STAINED_GLASS_PANE` |

**Layout:**

| Slot | Button | Type | Content |
|------|--------|------|---------|
| 4 | `header` | `ZAUCTIONHOUSESTATS_TEXT` | Title and `%zahstats_global_auctions_opened%` |
| 10 | `listed` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_items_listed%` |
| 11 | `sold` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_items_sold%` |
| 12 | `expired` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_items_expired%`, `%zahstats_global_items_removed%` |
| 14 | `volume` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_money_volume_format%` |
| 15 | `tax` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_tax_collected_format%` |
| 16 | `biggest` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_biggest_sale_format%` |
| 22 | `podium-first` | `ZAUCTIONHOUSESTATS_PODIUM` | Rank 1 of `TOP_SELLERS_MONEY` / `ALL` |
| 30 | `podium-second` | `ZAUCTIONHOUSESTATS_PODIUM` | Rank 2 |
| 32 | `podium-third` | `ZAUCTIONHOUSESTATS_PODIUM` | Rank 3 |
| 38 | `open-leaderboard` | `INVENTORY` | Opens `leaderboard` |
| 40 | `my-stats` | `ZAUCTIONHOUSESTATS_MY_STATS` | Opens your own `player-stats` |
| 42 | `open-item-prices` | `INVENTORY` | Opens `item-prices` |
| 53 | `open-admin` | `INVENTORY` | Opens `admin`, only with `zauctionhouse.stats.admin` (otherwise a glass pane) |

The statistic buttons use `update: true`, so they refresh every `update-interval`. Values are read from memory caches only: a refresh never waits for a database query (a value not in cache yet is loaded in the background and shows `placeholders.loading` meanwhile).

```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │ H │   │   │   │   │  H = header
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │ L │ S │ E │   │ V │ T │ B │   │  Global statistics
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │ 1 │   │   │   │   │  Podium #1
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │ 2 │   │ 3 │   │   │   │  Podium #2 and #3
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │ ↗ │   │ ★ │   │ ↗ │   │   │  Leaderboard / My stats / Prices
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │ A │  A = admin
└───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

---

## leaderboard.yml

Paginated leaderboards. The player changes the metric, the period and the economy with the three selectors at the bottom. Clicking a player opens their statistics sheet.

| Setting | Value |
|---------|-------|
| Size | 54 |
| `update-interval` | `1000` (ms) |
| Patterns | `zahstats-pagination`, `zahstats-back` |

**Layout:**

| Slot(s) | Button | Type |
|---------|--------|------|
| 0-8, 51-53 | `decoration` | `NONE` (glass panes) |
| 9-44 | `leaderboard` | `ZAUCTIONHOUSESTATS_LEADERBOARD` (`loading-slot: 22`) |
| 45 | `metric-selector` | `ZAUCTIONHOUSESTATS_METRIC_SELECTOR` |
| 46 | `period-selector` | `ZAUCTIONHOUSESTATS_PERIOD_SELECTOR` |
| 47 | `economy-selector` | `ZAUCTIONHOUSESTATS_ECONOMY_SELECTOR` |
| 48 | `previous` | `PREVIOUS` (pattern `zahstats-pagination`) |
| 49 | `back` | `BACK` (pattern `zahstats-back`) |
| 50 | `next` | `NEXT` (pattern `zahstats-pagination`) |

The default selection of this menu is `metric: TOP_SELLERS_MONEY`, `period: ALL` and the default economy.

<CalloutContainer type="info">

<CalloutTitle>Number of entries</CalloutTitle>

<CalloutDescription>
A leaderboard holds at most `leaderboards.size` entries (default `10`, between `1` and `100`) in `config.yml`. With the default value, the 36 data slots fit on one page. Increase `leaderboards.size` to get more pages. See [Configuration](/zauctionhouse/addons/stats/configuration).
</CalloutDescription>

</CalloutContainer>

---

## player-stats.yml

The statistics sheet of a player: counters summed over all economies, then one entry per economy.

The sheet shows:
- **The player clicked** in a leaderboard or in the podium of the hub.
- **Yourself** when opened with the `ZAUCTIONHOUSESTATS_MY_STATS` button (this clears any player clicked before) or with `/ah stats` and then "My statistics".

| Setting | Value |
|---------|-------|
| Size | 54 |
| Patterns | `zahstats-pagination`, `zahstats-back` |

**Layout:**

| Slot(s) | Button | Type |
|---------|--------|------|
| 0-12, 14-26, 45-47, 51-53 | `decoration` | `NONE` (glass panes) |
| 13 | `player-stats` | `ZAUCTIONHOUSESTATS_PLAYER_STATS` (player head and counters) |
| 27-44 | `economies` | `ZAUCTIONHOUSESTATS_PLAYER_ECONOMIES` (`loading-slot: 31`) |
| 48 / 49 / 50 | `previous` / `back` / `next` | From the patterns |

<CalloutContainer type="info">

<CalloutDescription>
`/zahstats player [name]` shows the statistics **in chat**, it does not open this menu.
</CalloutDescription>

</CalloutContainer>

---

## item-prices.yml

The price explorer lists the best-selling materials for the selected economy and period, with the number of sales, the average price and the median price. The list is dynamic: it is computed from the sales, there is no hard-coded list of materials. The icon of each entry is the sold material itself.

It is opened with `/zahstats items [economy]`. If an economy is given, it is selected when the menu opens.

| Setting | Value |
|---------|-------|
| Size | 54 |
| Patterns | `zahstats-pagination`, `zahstats-back` |

**Layout:**

| Slot(s) | Button | Type |
|---------|--------|------|
| 0-8, 45, 51-53 | `decoration` | `NONE` (glass panes) |
| 9-44 | `item-prices` | `ZAUCTIONHOUSESTATS_ITEM_PRICES` (`loading-slot: 22`) |
| 46 | `period-selector` | `ZAUCTIONHOUSESTATS_PERIOD_SELECTOR` |
| 47 | `economy-selector` | `ZAUCTIONHOUSESTATS_ECONOMY_SELECTOR` |
| 48 / 49 / 50 | `previous` / `back` / `next` | From the patterns |

The default selection is `period: ALL` and the default economy. The number of materials is set by `item-prices.top-limit` in `config.yml` (default `100`, between `1` and `500`).

The median is only computed for the materials of the page you are looking at. Until it is ready, `%median%` and `%format_median%` show the `placeholders.loading` text of `config.yml`, then the page refreshes on its own.

---

## admin.yml

The administration panel: live status of the write queue and caches, and shortcuts to maintenance commands.

| Setting | Value |
|---------|-------|
| Size | 27 |
| `update-interval` | `1000` (ms) |
| `fill-item` | `BLACK_STAINED_GLASS_PANE` |

**Layout:**

| Slot | Button | Type | Action |
|------|--------|------|--------|
| 10 | `reload` | `NONE` | Runs `zahstats reload` (`player_command`) |
| 11 | `clearcache` | `NONE` | Runs `zahstats clearcache` (`player_command`) |
| 13 | `status` | `ZAUCTIONHOUSESTATS_ADMIN_STATUS` | Live status (`update: true`) |
| 15 | `purge` | `NONE` | Sends `/zahstats purge <days> confirm` in chat and closes the menu |
| 16 | `import` | `NONE` | Sends `/zahstats import v1 confirm` in chat and closes the menu |
| 22 | `back` | `BACK` | Previous menu |

Purge and import are irreversible, so these buttons only show the command. The player has to type it.

---

## Patterns

The addon ships two patterns. Their names start with `zahstats-` because the zMenu pattern registry is shared by all plugins: keep this prefix if you rename them or add your own, to avoid conflicts.

| Pattern | File | Slots | Content |
|---------|------|-------|---------|
| `zahstats-pagination` | `patterns/zahstats-pagination.yml` | 48, 50 | `PREVIOUS` and `NEXT` buttons (glass pane when there is no other page) |
| `zahstats-back` | `patterns/zahstats-back.yml` | 49 | `BACK` button |

Both patterns are `size: 54` and their buttons use `is-permanent: true`. They are used by `leaderboard.yml`, `player-stats.yml` and `item-prices.yml`:

```yaml
patterns:
  - "zahstats-pagination"
  - "zahstats-back"
```

### zahstats-pagination

```yaml
name: "zahstats-pagination"
size: 54

items:
  previous:
    type: PREVIOUS
    is-permanent: true
    slot: 48
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjllYTFkODYyNDdmNGFmMzUxZWQxODY2YmNhNmEzMDQwYTA2YzY4MTc3Yzc4ZTQyMzE2YTEwOThlNjBmYjdkMyJ9fX0="
      name: "#2CCED2<bold>ᴘʀᴇᴠɪᴏᴜs ᴘᴀɢᴇ"
      lore:
        - "#92ffffGo to the previous page. #8c8c8c(%page%/%max-page%)"
    else:
      item:
        material: BLACK_STAINED_GLASS_PANE
        name: "<white>"
  next:
    type: NEXT
    is-permanent: true
    slot: 50
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvODI3MWE0NzEwNDQ5NWUzNTdjM2U4ZTgwZjUxMWE5ZjEwMmIwNzAwY2E5Yjg4ZTg4Yjc5NWQzM2ZmMjAxMDVlYiJ9fX0="
      name: "#2CCED2<bold>ɴᴇxᴛ ᴘᴀɢᴇ"
      lore:
        - "#92ffffGo to the next page. #8c8c8c(%page%/%max-page%)"
    else:
      item:
        material: BLACK_STAINED_GLASS_PANE
        name: "<white>"
```

### zahstats-back

```yaml
name: "zahstats-back"
size: 54

items:
  back:
    type: BACK
    is-permanent: true
    slot: 49
    item:
      material: DARK_OAK_DOOR
      name: "#2CCED2<bold>ʙᴀᴄᴋ"
      lore:
        - "#92ffffGo to the previous menu."
```

---

## Button Types

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSESTATS_LEADERBOARD`](#zauctionhousestats_leaderboard) | Paginated leaderboard with player heads | `leaderboard.yml` |
| [`ZAUCTIONHOUSESTATS_METRIC_SELECTOR`](#zauctionhousestats_metric_selector) | Cycles through leaderboard metrics | `leaderboard.yml` |
| [`ZAUCTIONHOUSESTATS_PERIOD_SELECTOR`](#zauctionhousestats_period_selector) | Cycles through periods | `leaderboard.yml`, `item-prices.yml` |
| [`ZAUCTIONHOUSESTATS_ECONOMY_SELECTOR`](#zauctionhousestats_economy_selector) | Cycles through economies | `leaderboard.yml`, `item-prices.yml` |
| [`ZAUCTIONHOUSESTATS_PODIUM`](#zauctionhousestats_podium) | One rank of a leaderboard, with the player head | `stats.yml` |
| [`ZAUCTIONHOUSESTATS_PLAYER_STATS`](#zauctionhousestats_player_stats) | Player head and counters of the sheet | `player-stats.yml` |
| [`ZAUCTIONHOUSESTATS_PLAYER_ECONOMIES`](#zauctionhousestats_player_economies) | One entry per economy of the player (paginated) | `player-stats.yml` |
| [`ZAUCTIONHOUSESTATS_ITEM_PRICES`](#zauctionhousestats_item_prices) | Best-selling materials with prices (paginated) | `item-prices.yml` |
| [`ZAUCTIONHOUSESTATS_ADMIN_STATUS`](#zauctionhousestats_admin_status) | Live status of the queue and caches | `admin.yml` |
| [`ZAUCTIONHOUSESTATS_TEXT`](#zauctionhousestats_text) | Display button that resolves `%zahstats_*%` without PlaceholderAPI | `stats.yml` |
| [`ZAUCTIONHOUSESTATS_MY_STATS`](#zauctionhousestats_my_stats) | Opens your own statistics sheet | `stats.yml` |

All these types also accept the standard zMenu options (`slot`/`slots`, `item`, `actions`, `permission`, `update`, etc.).

### Common Rules

**Loading.** Data buttons never query the database while the menu is drawn. When the data is not in cache yet, the button shows its `loading-item`, loads the data in the background, then refreshes the menu once the data is ready. The cache durations are set in the `caches` section of `config.yml`.

**Missing items.** If a button needs `entry-item`, `loading-item` or `empty-item` and the section is missing, a warning is logged and the button uses its `item` section instead.

**Invalid values.** An invalid `metric` or `period` value is logged (file and path) and replaced by its default value. A typo never breaks the menu.

**`%zahstats_*%` placeholders.** In every `ZAUCTIONHOUSESTATS_*` button, `%zahstats_...%` placeholders in the `name` and `lore` are resolved by the addon itself, **without PlaceholderAPI**. Standard zMenu buttons (`NONE`, `INVENTORY`, ...) need PlaceholderAPI for that. See [Placeholders](/zauctionhouse/addons/stats/placeholders) for the full list.

### Default Selection: metric, period, economy

`ZAUCTIONHOUSESTATS_LEADERBOARD`, `ZAUCTIONHOUSESTATS_ITEM_PRICES` and `ZAUCTIONHOUSESTATS_PODIUM` read these options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `metric` | Metric | `TOP_SELLERS_MONEY` | Leaderboard metric (ignored by `ZAUCTIONHOUSESTATS_ITEM_PRICES`) |
| `period` | Period | `ALL` | Period of the data |
| `economy` | String | Default economy | zAuctionHouse economy name. When missing, see below |

**Metrics:**

| Value | Description | Money |
|-------|-------------|-------|
| `TOP_SELLERS_MONEY` | Money earned by sellers, after taxes | Yes |
| `TOP_BUYERS_MONEY` | Money spent by buyers, taxes included | Yes |
| `TOP_SELLERS_COUNT` | Number of sales | No |
| `TOP_BUYERS_COUNT` | Number of purchases | No |
| `TOP_TAX_PAID` | Total taxes paid | Yes |
| `BIGGEST_SALE` | Biggest single sale | Yes |

**Periods:**

| Value | Description |
|-------|-------------|
| `DAY` | Today, since midnight |
| `WEEK` | This week, since Monday |
| `MONTH` | This month, since the 1st |
| `ALL` | All time |

Periods use the `statistics.timezone` of `config.yml`.

**When `economy` is not set:**
- Money metrics and prices use the default economy: `leaderboards.default-economy` in `config.yml`, or the default economy of zAuctionHouse when it is empty.
- Count metrics (`TOP_SELLERS_COUNT`, `TOP_BUYERS_COUNT`) use **all economies combined**.

Money amounts are never added up across economies.

### ZAUCTIONHOUSESTATS_LEADERBOARD

Displays a leaderboard on several slots, with pagination. The metric, period and economy come from the button options, and can be changed by the player with the selectors of the same menu. Clicking an entry opens the statistics sheet (`player-stats.yml`) of that player.

**Configuration:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slots` | List | - | Slots of the entries |
| `entry-item` | Item | `item` | Template of each entry |
| `loading-item` | Item | `item` | Shown at `loading-slot` while the leaderboard loads |
| `loading-slot` | Number | `22` | Slot of the loading and "no data" items. `-1` = never shown |
| `player-heads` | Boolean | `true` | Apply the player skin on `PLAYER_HEAD` entries |
| `metric` | Metric | `TOP_SELLERS_MONEY` | Default metric |
| `period` | Period | `ALL` | Default period |
| `economy` | String | Default economy | Default economy |
| `item` | Item | - | Shown at `loading-slot` when there is no data for the current selection, or when a money metric has no economy to use (no default economy) |

**Entry placeholders** (`entry-item`):

| Placeholder | Description |
|-------------|-------------|
| `%rank%` | Rank of the player |
| `%name%` | Player name (`leaderboards.unknown-name` when unknown) |
| `%value%` | Raw value |
| `%format%` | Value formatted by the zAuctionHouse economy for money metrics, raw value for count metrics |
| `%economy%` | Economy name (empty when all economies are combined) |

**Example:**

```yaml
leaderboard:
  type: ZAUCTIONHOUSESTATS_LEADERBOARD
  slots:
    - "9-17"
    - "18-26"
    - "27-35"
    - "36-44"
  metric: TOP_SELLERS_MONEY
  period: ALL
  # economy: vault
  player-heads: true
  loading-slot: 22
  loading-item:
    material: CLOCK
    name: "#f1c40fLoading the leaderboard..."
  entry-item:
    material: PLAYER_HEAD
    name: "#f1c40f#%rank% #ffffff%name%"
    lore:
      - "#92ffffValue: #2CCED2%format%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto view the player statistics"
  item:
    material: BARRIER
    name: "#ff5555No data for this selection"
    lore:
      - "#92ffffChange the metric, the period or the economy."
```

### Selectors

The three selector types work the same way:

- **Left click**: next value.
- **Right click**: previous value.
- The list loops: after the last value comes the first one.
- After a change, the menu opens again at **page 1**, and the navigation history is kept.
- The `actions`, messages and sounds of the button still run on click.

**Configuration (all selectors):**

| Property | Type | Description |
|----------|------|-------------|
| `metrics` / `periods` / `economies` | List | Values of the cycle, in order (see each selector) |
| `labels` | Section | Display name of each value (`VALUE: "Label"`). Keys are case-insensitive |
| `item` | Item | Displayed item |

**Placeholders** (`item`):

| Placeholder | Description |
|-------------|-------------|
| `%selected%` | Label of the current value |
| `%next%` | Label of the value selected by a left click |
| `%previous%` | Label of the value selected by a right click |

A value without a label shows its raw name (for example `TOP_TAX_PAID`). In `metrics` and `periods`, invalid values are logged and skipped, and duplicates are ignored. If the list is empty or only has invalid values, the default list is used. `economies` is not checked against zAuctionHouse: empty entries and duplicates are removed, the other names are used as they are. If the cycle ends up empty (for example every metric is disabled), a click does nothing.

<CalloutContainer type="info">

<CalloutTitle>How the selection works</CalloutTitle>

<CalloutDescription>
The selection is stored **per player** and only contains the values the player changed. The other values come from the data button of the menu (`ZAUCTIONHOUSESTATS_LEADERBOARD` or `ZAUCTIONHOUSESTATS_ITEM_PRICES`). Place selectors in the same menu as one of these buttons, so they show the value really used. The selection is shared between menus (an economy chosen in `leaderboard.yml` is kept in `item-prices.yml`) and is cleared when the player disconnects. `ZAUCTIONHOUSESTATS_PODIUM` ignores the selection.
</CalloutDescription>

</CalloutContainer>

### ZAUCTIONHOUSESTATS_METRIC_SELECTOR

Changes the leaderboard metric.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `metrics` | List | All metrics | Metrics of the cycle |
| `labels` | Section | - | Label of each metric |

Metrics listed in `leaderboards.disabled` (`config.yml`) are removed from the cycle.

**Example:**

```yaml
metric-selector:
  type: ZAUCTIONHOUSESTATS_METRIC_SELECTOR
  slot: 45
  # metrics:
  #   - TOP_SELLERS_MONEY
  #   - TOP_BUYERS_MONEY
  labels:
    TOP_SELLERS_MONEY: "Top sellers (money)"
    TOP_BUYERS_MONEY: "Top buyers (money)"
    TOP_SELLERS_COUNT: "Top sellers (sales)"
    TOP_BUYERS_COUNT: "Top buyers (purchases)"
    TOP_TAX_PAID: "Most taxes paid"
    BIGGEST_SALE: "Biggest sale"
  item:
    material: COMPARATOR
    name: "#2CCED2Metric: #ffffff%selected%"
    lore:
      - "#8c8c8c• #2CCED2Left click #92ffff→ %next%"
      - "#8c8c8c• #2CCED2Right click #92ffff→ %previous%"
```

### ZAUCTIONHOUSESTATS_PERIOD_SELECTOR

Changes the period.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `periods` | List | `DAY`, `WEEK`, `MONTH`, `ALL` | Periods of the cycle |
| `labels` | Section | - | Label of each period |

**Example:**

```yaml
period-selector:
  type: ZAUCTIONHOUSESTATS_PERIOD_SELECTOR
  slot: 46
  # periods:
  #   - WEEK
  #   - ALL
  labels:
    DAY: "Today"
    WEEK: "This week"
    MONTH: "This month"
    ALL: "All time"
  item:
    material: CLOCK
    name: "#2CCED2Period: #ffffff%selected%"
    lore:
      - "#8c8c8c• #2CCED2Left click #92ffff→ %next%"
      - "#8c8c8c• #2CCED2Right click #92ffff→ %previous%"
```

### ZAUCTIONHOUSESTATS_ECONOMY_SELECTOR

Changes the economy.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `economies` | List | All zAuctionHouse economies | Economy names of the cycle |
| `labels` | Section | - | Label of each economy. The `default` key is the label of the "default" option |

The cycle always starts with the **default** option (label key `default`): default economy for money and prices, all economies combined for counts. Then come the economies of the list. An economy without a label shows its zAuctionHouse display name. Without a `default` label, the default option is displayed as `default`.

**Example:**

```yaml
economy-selector:
  type: ZAUCTIONHOUSESTATS_ECONOMY_SELECTOR
  slot: 47
  # economies:
  #   - vault
  #   - playerpoints
  labels:
    default: "Default"
    # vault: "Money"
  item:
    material: GOLD_NUGGET
    name: "#2CCED2Economy: #ffffff%selected%"
    lore:
      - "#8c8c8c• #2CCED2Left click #92ffff→ %next%"
      - "#8c8c8c• #2CCED2Right click #92ffff→ %previous%"
```

### ZAUCTIONHOUSESTATS_PODIUM

Displays one rank of a leaderboard on a single slot, with the player head. Clicking it opens the statistics sheet of that player. The metric, period and economy are fixed by the options: selectors do not change them.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slot` | Number | - | Slot of the button |
| `rank` | Number | `1` | Rank to display (minimum `1`) |
| `metric` | Metric | `TOP_SELLERS_MONEY` | Leaderboard metric |
| `period` | Period | `ALL` | Leaderboard period |
| `economy` | String | Default economy | Leaderboard economy |
| `item` | Item | - | Template of the entry |
| `loading-item` | Item | `item` | Shown while the leaderboard loads |
| `empty-item` | Item | `item` | Shown when nobody holds this rank, or when a money metric has no economy to use |

**Placeholders:**

| Placeholder | Available in | Description |
|-------------|--------------|-------------|
| `%rank%` | `item`, `loading-item`, `empty-item` | Rank |
| `%name%` | `item` | Player name (`leaderboards.unknown-name` when unknown) |
| `%value%` | `item` | Raw value |
| `%format%` | `item` | Formatted value (money metrics), raw value otherwise |
| `%economy%` | `item` | Economy name (empty when all economies are combined) |

The skin is applied when `leaderboards.player-heads` is `true` (this button has no `player-heads` option of its own).

**Example:**

```yaml
podium-first:
  type: ZAUCTIONHOUSESTATS_PODIUM
  slot: 22
  rank: 1
  metric: TOP_SELLERS_MONEY
  period: ALL
  # economy: vault
  item:
    material: PLAYER_HEAD
    name: "#f1c40f#%rank% #ffffff%name%"
    lore:
      - "#92ffffEarned: #2CCED2%format%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto view the statistics"
  loading-item:
    material: CLOCK
    name: "#f1c40fLoading..."
  empty-item:
    material: SKELETON_SKULL
    name: "#8c8c8cNo seller yet"
```

<CalloutContainer type="info">

<CalloutDescription>
Use this button instead of a standard button with `player-head: '%zahstats_top_..._name%'`: it works without PlaceholderAPI and uses the addon head cache.
</CalloutDescription>

</CalloutContainer>

### ZAUCTIONHOUSESTATS_PLAYER_STATS

Displays the head and the counters of the player shown by the sheet (the player clicked, or yourself). Counters are all-time values summed over all economies.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slot` | Number | - | Slot of the button |
| `item` | Item | - | Item shown once the statistics are loaded |
| `loading-item` | Item | `item` | Item shown while the statistics load |

**Placeholders** (`item`):

| Placeholder | Description |
|-------------|-------------|
| `%target%` | Player name (also available in `loading-item`) |
| `%items_listed%` | Items listed |
| `%items_sold%` | Items sold |
| `%items_bought%` | Items bought |
| `%items_expired%` | Items expired |
| `%items_removed%` | Items removed |
| `%conversion_rate%` | Sold / listed × 100, two decimals |
| `%economies%` | Number of economies the player used |
| `%first_sale%` | Date of the first sale |
| `%last_sale%` | Date of the last sale |
| `%first_purchase%` | Date of the first purchase |
| `%last_purchase%` | Date of the last purchase |

Dates use `placeholders.date-format` and `statistics.timezone` of `config.yml`. A missing date, or a conversion rate with no listed item, shows `placeholders.not-applicable` (or `placeholders.no-value` when `placeholders.enable-not-applicable` is `false`).

**Example:**

```yaml
player-stats:
  type: ZAUCTIONHOUSESTATS_PLAYER_STATS
  slot: 13
  loading-item:
    material: CLOCK
    name: "#f1c40fLoading the statistics of %target%..."
  item:
    material: PLAYER_HEAD
    name: "#2CCED2<bold>%target%"
    lore:
      - "#92ffffItems listed: #2CCED2%items_listed%"
      - "#92ffffItems sold: #2CCED2%items_sold%"
      - "#92ffffItems bought: #2CCED2%items_bought%"
      - "#92ffffItems expired: #2CCED2%items_expired%"
      - "#92ffffItems removed: #2CCED2%items_removed%"
      - "#92ffffConversion rate: #2CCED2%conversion_rate%%"
      - ""
      - "#92ffffFirst sale: #2CCED2%first_sale%"
      - "#92ffffLast sale: #2CCED2%last_sale%"
      - "#92ffffFirst purchase: #2CCED2%first_purchase%"
      - "#92ffffLast purchase: #2CCED2%last_purchase%"
```

### ZAUCTIONHOUSESTATS_PLAYER_ECONOMIES

Displays one entry per economy used by the player of the sheet, sorted by economy name, with pagination.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slots` | List | - | Slots of the entries |
| `entry-item` | Item | `item` | Template of each entry |
| `loading-item` | Item | `item` | Shown at `loading-slot` while the statistics load |
| `loading-slot` | Number | `31` | Slot of the loading and "no economy" items. `-1` = never shown |
| `item` | Item | - | Shown at `loading-slot` when the player has no activity |

**Entry placeholders** (`entry-item`):

| Placeholder | Description |
|-------------|-------------|
| `%economy%` | Economy name |
| `%economy_display%` | Economy display name (from zAuctionHouse) |
| `%money_earned%` | Money earned (formatted) |
| `%money_spent%` | Money spent (formatted) |
| `%tax_paid%` | Taxes paid (formatted) |
| `%biggest_sale%` | Biggest sale (formatted) |
| `%money_earned_raw%` | Money earned (raw number) |
| `%money_spent_raw%` | Money spent (raw number) |
| `%items_listed%` | Items listed in this economy |
| `%items_sold%` | Items sold in this economy |
| `%items_bought%` | Items bought in this economy |
| `%ratio%` | Earned / spent, two decimals. When nothing was spent: `placeholders.not-applicable` (or `placeholders.no-value` when `placeholders.enable-not-applicable` is `false`) |

**Example:**

```yaml
economies:
  type: ZAUCTIONHOUSESTATS_PLAYER_ECONOMIES
  slots:
    - "27-35"
    - "36-44"
  loading-slot: 31
  loading-item:
    material: CLOCK
    name: "#f1c40fLoading the economies..."
  entry-item:
    material: GOLD_INGOT
    name: "#2CCED2<bold>%economy_display%"
    lore:
      - "#92ffffEarned: #2CCED2%money_earned%"
      - "#92ffffSpent: #2CCED2%money_spent%"
      - "#92ffffTaxes paid: #2CCED2%tax_paid%"
      - "#92ffffBiggest sale: #2CCED2%biggest_sale%"
      - "#92ffffEarned / spent ratio: #2CCED2%ratio%"
      - ""
      - "#8c8c8c%items_sold% sold, %items_bought% bought"
  item:
    material: BARRIER
    name: "#ff5555No auction activity yet"
```

### ZAUCTIONHOUSESTATS_ITEM_PRICES

Displays the best-selling materials of the selected economy and period, with pagination. Materials are sorted by number of sales (most sold first, then by name). The `material` of `entry-item` is replaced by the sold material, but its name, lore and flags are kept (an unknown material keeps the template material). The `metric` option is not used.

Prices are always computed for **one** economy: the selected one, otherwise the default economy. If no economy can be found, the `item` is shown at `loading-slot`.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slots` | List | - | Slots of the entries |
| `entry-item` | Item | `item` | Template of each entry |
| `loading-item` | Item | `item` | Shown at `loading-slot` while the list loads |
| `loading-slot` | Number | `26` | Slot of the loading and "no sale" items. `-1` = never shown |
| `period` | Period | `ALL` | Default period |
| `economy` | String | Default economy | Default economy |
| `limit` | Number | `-1` | Maximum number of materials for this button. `-1` or `0` = only `item-prices.top-limit` applies |
| `item` | Item | - | Shown at `loading-slot` when there is no sale for the current selection |

The number of materials listed is the smallest of `limit` and `item-prices.top-limit` (`config.yml`).

**Entry placeholders** (`entry-item`):

| Placeholder | Description |
|-------------|-------------|
| `%material%` | Material name (for example `DIAMOND_SWORD`) |
| `%material_name%` | Readable name (for example `Diamond Sword`) |
| `%amount%` | Number of sales |
| `%economy%` | Economy name |
| `%average%` | Average listing price of the sales (raw number, two decimals) |
| `%format_average%` | Average listing price of the sales (formatted) |
| `%median%` | Median price (raw number), `placeholders.loading` while computed |
| `%format_median%` | Median price (formatted), `placeholders.loading` while computed |

**Example:**

```yaml
item-prices:
  type: ZAUCTIONHOUSESTATS_ITEM_PRICES
  slots:
    - "9-17"
    - "18-26"
    - "27-35"
    - "36-44"
  period: ALL
  # economy: vault
  # limit: 50
  loading-slot: 22
  loading-item:
    material: CLOCK
    name: "#f1c40fLoading the prices..."
  entry-item:
    material: PAPER
    name: "#2CCED2<bold>%material_name%"
    lore:
      - "#92ffffSales: #2CCED2%amount%"
      - "#92ffffAverage price: #2CCED2%format_average%"
      - "#92ffffMedian price: #2CCED2%format_median%"
  item:
    material: BARRIER
    name: "#ff5555No sale for this selection"
```

### ZAUCTIONHOUSESTATS_ADMIN_STATUS

Live status panel. It only reads in-memory counters, so it is safe with `update: true`. It has no specific option.

**Placeholders:**

| Placeholder | Description |
|-------------|-------------|
| `%storage_type%` | Database type (`SQLITE`, `MYSQL`, `MARIADB`) |
| `%collection_mode%` | Active collection mode on this server: `EVENTS`, `LOGS_POLLING` or `NONE` |
| `%queue_pending%` | Events waiting in the write queue |
| `%pending_retry%` | `true` if a failed flush is waiting to be retried, otherwise `false` |
| `%flush_count%` | Number of flushes |
| `%flush_failures%` | Number of failed flushes |
| `%dropped_events%` | Number of dropped events |
| `%leaderboard_entries%` | Entries in the leaderboard cache |
| `%leaderboard_hit_ratio%` | Hit ratio of the leaderboard cache, in percent (one decimal, without the `%` sign) |
| `%player_entries%` | Entries in the player statistics cache |
| `%player_hit_ratio%` | Hit ratio of the player statistics cache, in percent (one decimal) |
| `%material_entries%` | Entries in the material price cache |
| `%material_hit_ratio%` | Hit ratio of the material price cache, in percent (one decimal) |
| `%sql_queries%` | Number of read (`SELECT`) queries executed since startup |
| `%sales_count%` | Rows in the sales table (`placeholders.loading` until counted, refreshed every 5 minutes) |
| `%listings_count%` | Rows in the listings table (`placeholders.loading` until counted, refreshed every 5 minutes) |
| `%head_textures%` | Player head textures in cache |

**Example:**

```yaml
status:
  type: ZAUCTIONHOUSESTATS_ADMIN_STATUS
  slot: 13
  update: true
  item:
    material: COMPARATOR
    name: "#2CCED2<bold>Status"
    lore:
      - "#92ffffDatabase: #2CCED2%storage_type% #8c8c8c(collection: %collection_mode%)"
      - "#92ffffPending events: #2CCED2%queue_pending% #8c8c8c(retry: %pending_retry%)"
      - "#92ffffFlushes: #2CCED2%flush_count% #8c8c8c(failures: %flush_failures%, dropped: %dropped_events%)"
      - ""
      - "#92ffffLeaderboards: #2CCED2%leaderboard_entries% #8c8c8c(hit %leaderboard_hit_ratio%%)"
      - "#92ffffPlayer sheets: #2CCED2%player_entries% #8c8c8c(hit %player_hit_ratio%%)"
      - "#92ffffMaterial prices: #2CCED2%material_entries% #8c8c8c(hit %material_hit_ratio%%)"
      - "#92ffffRows: #2CCED2%sales_count% #92ffffsales, #2CCED2%listings_count% #92fffflistings"
      - "#8c8c8cRead queries: %sql_queries% - head textures: %head_textures%"
```

### ZAUCTIONHOUSESTATS_TEXT

A display button whose `name` and `lore` can contain `%zahstats_*%` placeholders. They are resolved by the addon from its caches, **without PlaceholderAPI**. It works with `update: true`. It has no specific option.

**Example:**

```yaml
sold:
  type: ZAUCTIONHOUSESTATS_TEXT
  slot: 11
  update: true
  item:
    material: EMERALD
    name: "#2CCED2<bold>Items sold"
    lore:
      - "#92ffffTotal: #2CCED2%zahstats_global_items_sold%"
```

### ZAUCTIONHOUSESTATS_MY_STATS

Opens `player-stats.yml` on **your own** statistics. A plain `INVENTORY` button would show the last player clicked in a leaderboard; this button clears it first. Its `name` and `lore` resolve `%zahstats_*%` placeholders like `ZAUCTIONHOUSESTATS_TEXT`. It has no specific option.

**Example:**

```yaml
my-stats:
  type: ZAUCTIONHOUSESTATS_MY_STATS
  slot: 40
  item:
    material: BOOK
    name: "#2CCED2<bold>ᴍʏ sᴛᴀᴛɪsᴛɪᴄs"
    lore:
      - "#92ffffYour sales, purchases and earnings."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto open"
```

---

## Player Heads

`ZAUCTIONHOUSESTATS_LEADERBOARD`, `ZAUCTIONHOUSESTATS_PODIUM` and `ZAUCTIONHOUSESTATS_PLAYER_STATS` apply the player skin on their item. The item must be a `PLAYER_HEAD`; any other material is displayed as it is.

Skins are loaded in the background, a page at a time, and kept in the addon cache for 6 hours (including players without a skin, so they are not requested again). The menu refreshes once the skins of the page are ready. The skin of a player who joins the server is cached right away.

| Setting (`config.yml`) | Default | Description |
|------------------------|---------|-------------|
| `leaderboards.player-heads` | `true` | Global switch for player skins in all menus |
| `leaderboards.default-head-url` | `""` | Base64 texture used when a skin cannot be found. Empty = default client head |

`ZAUCTIONHOUSESTATS_LEADERBOARD` also has its own `player-heads` option: skins are applied only if both the option and `leaderboards.player-heads` are `true`.

See [Configuration](/zauctionhouse/addons/stats/configuration) for all settings.
