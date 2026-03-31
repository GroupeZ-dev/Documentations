---
sidebar_position: 1
title: Main Configuration
description: Main configuration options for zAuctionHouse V4
---

# Main Configuration

The main configuration file `config.yml` controls the core behavior of zAuctionHouse V4.

## Debug & Monitoring

```yaml
# Enables detailed logs and error messages in the console
enable-debug: false

# Enables performance monitoring and logging
# Logs execution times for heavy operations
enable-performance-debug: false

# Enables automatic version checking
enable-version-checker: true

# Performance debug filter configuration
performance-debug:
  filter:
    # Filter mode: DISABLED, WHITELIST, BLACKLIST
    mode: DISABLED
    # List of operations to filter (supports wildcards)
    operations:
      - "loadItems.*"
      - "SortedItemsCache.*"
```

### Performance Operations

Available operation names for filtering:

| Operation | Description |
|-----------|-------------|
| `loadItems.loadPlayers` | Time to load player data |
| `loadItems.loadItemsFromDB` | Time to load items from database |
| `loadItems.processItems` | Time to process loaded items |
| `loadItems.total` | Total loading time |
| `loadItems.rebuildSortedItemsCache` | Time to rebuild sorted cache |
| `SortedItemsCache.rebuild` | Time to rebuild the sorted items cache |
| `applyCategories` | Time to apply category filters |
| `computeCategoryCount[categoryId]` | Time to count items per category |
| `openInventory.<file name>` | Time to open a specific inventory |

## General Settings

```yaml
# Date format for timestamps (Java SimpleDateFormat)
# Examples:
#   "dd/MM/yyyy HH:mm:ss" -> "25/12/2024 14:30:45"
#   "MM-dd-yyyy hh:mm a"  -> "12-25-2024 02:30 PM"
date-format: dd/MM/yyyy HH:mm:ss
```

## Database Configuration

```yaml
# Storage type: SQLITE, MYSQL, MARIADB
storage-type: SQLITE

# Server name for multi-server setups
server-name: skyblock

# Database connection settings (MySQL/MariaDB only)
database-configuration:
  table-prefix: zauctionhouse_
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zauctionhouse
  debug: false
```

### Storage Types

| Type | Description | Best For |
|------|-------------|----------|
| `SQLITE` | Local file-based database | Single server, no setup required |
| `MYSQL` | MySQL database server | Multi-server, large auction houses |
| `MARIADB` | MariaDB database server | Multi-server, large auction houses |

:::info
For multi-server synchronization, use MySQL/MariaDB with the Redis addon.
:::

## Message Colors

Define custom color shortcuts for use in messages:

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

Use these in any message: `<primary>Welcome <secondary>to the auction house!`

## Command Configuration

:::warning
A server restart is required after changing command settings!
:::

```yaml
commands:
  main-command:
    aliases:
      - ah
      - hdv
      - auction
      - zauction

  sell:
    # Open GUI when running /ah sell without arguments
    enable-sell-inventory: false
    aliases:
      - sell
      - s
      - vendre
    arguments:
      - name: price
        display-name: price
        required: true
        auto-completion:
          - 1000
          - 10000
          - 25000
      - name: amount
        display-name: amount
        required: false
        auto-completion:
          - '1'
          - '%max-stack-size%'
      - name: economy
        display-name: economy
        required: false
        auto-completion:
          - vault

  claim:
    aliases:
      - claim
      - c
      - recuperer

  page:
    aliases:
      - page
      - p
```

### Custom Inventory Commands

Create shortcuts to specific inventories:

```yaml
  inventories:
    - enable: true
      permission: "zauctionhouse.selling"
      description: "Open selling items"
      aliases:
        - 'selling'
      inventory: SELLING_ITEMS

    - enable: true
      permission: "zauctionhouse.expired"
      description: "Open expired items"
      aliases:
        - 'expired'
      inventory: EXPIRED_ITEMS

    - enable: true
      permission: "zauctionhouse.purchased"
      description: "Open purchased items"
      aliases:
        - 'purchased'
      inventory: PURCHASED_ITEMS

    - enable: true
      permission: "zauctionhouse.history"
      description: "Open history"
      aliases:
        - 'history'
      inventory: HISTORY
```

## Price Shortcuts

Allow players to use shorthand notation for large prices:

```yaml
number-sell-multiplication:
  enable: true
  formats:
    - format: K
      multiplication: 1000
    - format: M
      multiplication: 1000000
    - format: B
      multiplication: 1000000000
    - format: T
      multiplication: 1000000000000
    # ... continues to TR (Tredecillion)
```

**Examples:**
- `/ah sell 1K` = 1,000
- `/ah sell 2.5M` = 2,500,000
- `/ah sell 1B` = 1,000,000,000

## Expiration Settings

All times are in **seconds**.

```yaml
expiration:
  # Auction listings
  auction:
    default-expiration: 172800  # 2 days
    permission:
      enable: false
      permissions:
        - permission: zauctionhouse.expiration.vip
          expiration: 3600       # 1 hour
        - permission: zauctionhouse.expiration.elite
          expiration: 7200       # 2 hours
        - permission: zauctionhouse.expiration.legend
          expiration: 259200     # 3 days

  # Bid listings (future feature)
  bid:
    default-expiration: 172800

  # Rent listings (future feature)
  rent:
    default-expiration: 172800

  # Expired items cleanup
  expire:
    default-expiration: 604800   # 1 week

  # Purchased items cleanup
  purchase:
    default-expiration: 604800   # 1 week
```

### Common Time Values

| Time | Seconds |
|------|---------|
| 1 hour | 3600 |
| 1 day | 86400 |
| 2 days | 172800 |
| 3 days | 259200 |
| 1 week | 604800 |
| 30 days | 2592000 |

## Item Limits

Configure how many items players can list:

```yaml
permissions:
  auction:
    - permission: zauctionhouse.max.5
      limit: 5
    - permission: zauctionhouse.max.10
      limit: 10
    - permission: zauctionhouse.max.15
      limit: 15

  rent:
    - permission: zauctionhouse.max.5
      limit: 5
    # ...

  bid:
    - permission: zauctionhouse.max.5
      limit: 5
    # ...
```

## World Restrictions

Prevent listing items in specific worlds (players can still browse/buy):

```yaml
banned-worlds:
  auction:
    - "world_the_end"
  rent:
    - "world_the_end"
  bid:
    - "world_the_end"
```

## Item Display Lore

Customize the lore added to items in the auction house:

```yaml
item-lore:
  # Forces the displayed item amount to 1 in the auction inventory.
  # The real amount is preserved internally and given to the buyer on purchase.
  # Useful to keep a clean, uniform display.
  force-amount-one: false

  # Items in main auction listing
  listed-auction-item:
    - ""
    - "<white>⌂ #92ffffSeller#8c8c8c: #2CCED2%seller%"
    - "<white>☆ #92ffffPrice#8c8c8c: #2CCED2%price%"
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "%status%"

  # Bulk sales (multiple items)
  multiple-listed-auction-item:
    - ""
    - "<white>⌂ #92ffffSeller#8c8c8c: #2CCED2%seller%"
    - "<white>☆ #92ffffPrice#8c8c8c: #2CCED2%price%"
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "#8c8c8c• #2CCED2ʟᴇғᴛ ᴄʟɪᴄᴋ #92ffffᴛᴏ sᴇᴇ ᴛʜᴇ ᴄᴏɴᴛᴇɴᴛ"
    - "%status%"

  # Expired items
  expired-item:
    - ""
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "#8c8c8c• #2CCED2Click to retrieve this item"

  # Purchased items
  purchased-item:
    - ""
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "#8c8c8c• #2CCED2Click to retrieve this item"

  # Your items on sale
  selling-item:
    - ""
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "#8c8c8c• #2CCED2Click to retrieve this item"

  # Item being purchased
  being-purchased-item:
    - ""
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "#8c8c8c• #ff3535Your item is being purchased, you cannot retrieve it."

  # History items
  history-item:
    - ""
    - "<white>⌂ #92ffffBuyer#8c8c8c: #2CCED2%buyer%"
    - "<white>☆ #92ffffPrice#8c8c8c: #2CCED2%price%"
    - "<white>⌚ #92ffffDate#8c8c8c: #969696%date%"

  # Dynamic status messages
  status:
    seller: "#8c8c8c• #2CCED2ᴄʟɪᴄᴋ #92ffffᴛᴏ ʀᴇᴛʀɪᴇᴠᴇ ᴛʜɪs ɪᴛᴇᴍ"
    buyer: "#8c8c8c• #2CCED2ᴄʟɪᴄᴋ #92ffffᴛᴏ ʙᴜʏ ᴛʜɪs ɪᴛᴇᴍ"
    right-seller: "#8c8c8c• #2CCED2ʀɪɢʜᴛ ᴄʟɪᴄᴋ #92ffffᴛᴏ ʀᴇᴛʀɪᴇᴠᴇ ᴛʜɪs ɪᴛᴇᴍ"
    right-buyer: "#8c8c8c• #2CCED2ʀɪɢʜᴛ ᴄʟɪᴄᴋ #92ffffᴛᴏ ʙᴜʏ ᴛʜɪs ɪᴛᴇᴍ"

  # Log type names
  log-type-names:
    SALE: "Item Listed"
    PURCHASE: "Item Purchased"
    REMOVE_LISTED: "Removed from Listing"
    REMOVE_SELLING: "Retrieved Selling Item"
    REMOVE_EXPIRED: "Retrieved Expired"
    REMOVE_PURCHASED: "Retrieved Purchase"
```

### Available Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%seller%` | Seller's name |
| `%buyer%` | Buyer's name |
| `%price%` | Formatted price |
| `%price-price-raw%` | Raw price value |
| `%price-price-with-decimal-format%` | Price with decimal formatting (e.g. 10 000) |
| `%price-price-with-reduction%` | Price with reduction (e.g. 10.0k) |
| `%time-remaining%` | Time until expiration |
| `%formatted-expire-date%` | Formatted expiration date |
| `%date%` | Transaction date |
| `%status%` | Dynamic action message |
| `%item_count%` | Total item count in the listing |
| `%economy-name%` | Economy internal name |
| `%economy-display-name%` | Economy display name |
| `%items%` | Item display names |
| `%type%` | Log entry type |
| `%player%` | Player involved |
| `%target%` | Target player (admin) |

:::tip Performance
Only the placeholders actually used in your lore templates are computed at render time. The plugin pre-detects which placeholders each lore section references when the configuration is loaded. If your `expired-item` lore only uses `%time-remaining%`, the plugin won't waste resources computing `%price%`, `%seller%`, etc.
:::

## Time Format

Configure how time is displayed:

```yaml
time:
  second: second
  seconds: seconds
  minute: minute
  minutes: minutes
  hour: hour
  hours: hours
  day: day
  days: days

  # Format strings (printf-style)
  time-day: '%02dᴅ %02dʜ %02dᴍ'      # >= 1 day
  time-hour: '%02dʜ %02dᴍ %02ds'     # >= 1 hour
  time-minute: '%02dᴍ %02ds'          # >= 1 minute
  time-second: '%02ds'                # < 1 minute
```

## Action Behavior

```yaml
action:
  # Auto-refresh inventory after actions
  update-inventory-on-action: true

  # Removing items from listings
  remove-listed-item:
    give-item: false           # Give to inventory or expired items
    open-inventory: true       # Reopen inventory after
    open-confirm-inventory: true  # Show confirmation

  # Removing expired items
  remove-expired-item:
    open-inventory: true

  # Purchasing items
  purchased-item:
    give-item: false           # Give to inventory or purchased items
    player-inventory-must-have-free-space: true
    open-inventory: true
    money-item:
      enable: true
      duration: 60             # Ticks to show error
      item:
        material: BARRIER
        name: "#ff3535✘ You don't have enough money to buy this!"
    money-message: true
    money-sound:
      enable: true
      category: MASTER
      sound: minecraft:entity.villager.no
      volume: 1
      pitch: 1

  # Removing selling items
  selling-item:
    open-inventory: true
```

## Auto-Claim Configuration

```yaml
auto-claim:
  # Auto-deposit pending money on join
  enable: false
  delay-ticks: 20              # Wait before claiming
  notify-player: true          # Message on auto-claim
  notify-pending: true         # Notify about pending money
  notify-delay-ticks: 40
  deposit-reason: "Claimed pending auction money"
```

## Sales Notification

```yaml
sales-notification:
  # Notify about offline sales on join
  enable: true
  delay-ticks: 60
```

## Sorting Configuration

```yaml
sort-items:
  # Default sort: ASCENDING_PRICE, ASCENDING_DATE, DECREASING_DATE, DECREASING_PRICE
  default-sort: DECREASING_DATE

  # Display names for sort types
  translations:
    ASCENDING_PRICE: "ᴀsᴄᴇɴᴅɪɴɢ ᴘʀɪᴄᴇ"
    ASCENDING_DATE: "ᴀsᴄᴇɴᴅɪɴɢ ᴅᴀᴛᴇ"
    DECREASING_DATE: "ᴅᴇᴄʀᴇᴀsɪɴɢ ᴅᴀᴛᴇ"
    DECREASING_PRICE: "ᴅᴇᴄʀᴇᴀsɪɴɢ ᴘʀɪᴄᴇ"
```

## Migration Settings

Migrate data from zAuctionHouse V3:

```yaml
migration:
  zauctionhouse-v3:
    source-type: SQLITE        # MYSQL, MARIADB, SQLITE, or JSON
    table-prefix: "zauctionhouse_"
    sqlite-path: "plugins/zAuctionHousev3/database.db"

    # MySQL/MariaDB settings
    host: "localhost"
    port: 3306
    database: "zauctionhouse"
    user: "root"
    password: ""

    # JSON settings
    json-folder: "plugins/zAuctionHouseV3"
```

To migrate, run:
```bash
/ah admin migrate zauctionhousev3 confirm
```
