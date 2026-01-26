---
sidebar_position: 1
title: config.yml
description: Main configuration file for zAuctionHouse
---

# config.yml

The main configuration file is located at `plugins/zAuctionHouseV3/config.yml`.

## Debug Settings

```yaml
enableDebug: false        # Enable detailed console logging
enableDebugTime: false    # Log execution times for performance analysis
```

## Core Settings

```yaml
enablePlugin: true        # Master switch to enable/disable the plugin
useZMenuEngine: true      # Use zMenu's inventory system (recommended)
storage: SQLITE           # Data storage: SQLITE, MYSQL, JSON, REDIS, CUSTOM
```

## Selling Options

```yaml
enableCreativeSell: true        # Allow selling in Creative mode
enableSellAnnonce: false        # Announce sales to seller
enableBuyAnnonce: false         # Announce purchases to buyer
giveItemAfterPurchase: false    # Give items directly to inventory
giveItemAfterRemove: false      # Give items directly when removing listing
enableNumberFormatSell: false   # Allow shorthand prices (500k, 1m)
disableSellBreakItem: false     # Prevent selling damaged items
```

## Economy Settings

```yaml
defaultEconomy: VAULT                # Primary currency system
enableSellEconomyInventory: true     # Show economy selection menu when selling

price:
  max: 999999999999999999    # Maximum allowed price
  min: 10                    # Minimum allowed price
  betterPrice: true          # Format prices for readability
  betterPriceReduction: false # Compress prices (1000 → 1k)
```

## Tax System

```yaml
tax:
  globalTax: false           # Apply tax to all transactions
  perItemTax: false          # Tax varies by item type
  type: SELL                 # When tax applies: SELL, PURCHASE, BOTH, CAPITALISM
  percent: 10.0              # Tax percentage
  enableByPass: true         # Allow tax exemption with permission
```

Tax types:
- `SELL` - Tax applied when listing items
- `PURCHASE` - Tax applied when buying
- `BOTH` - Tax on both actions
- `CAPITALISM` - Special tax mode

## Cooldowns

```yaml
sellCooldown:
  enable: true               # Enable delay between sales
  seconds: 5                 # Seconds between sales

commandCooldownMilliSeconds: 5000    # Delay between commands (ms)
cooldownTransactions: 30000          # Transaction command cooldown (ms)
cooldownClaimMoneySecond: 300        # Claim command cooldown (seconds)
```

## Item Expiration

```yaml
time:
  sell: 172800               # Seconds before items expire (2 days)
  expire: 604800             # Seconds before expired items are deleted (7 days)

enableExpirationPermission: false    # Use permission-based expiration times
```

### Permission-Based Expiration

```yaml
expirations:
  - permission: zauctionhouse.expiration.vip
    time: 3600
  - permission: zauctionhouse.expiration.elite
    time: 7200
  - permission: zauctionhouse.expiration.legend
    time: 259200
```

## Sorting & Display

```yaml
defaultSort: DECREASING_DATE         # Default sort method
enablePrioritySort: true             # Prioritize certain items
transactionPageSize: 5               # Transactions per page
categoryCheckOnlyMaterial: true      # Categories by material only
```

Available sort types:
- `INCREASING_PRICE`, `DECREASING_PRICE`
- `INCREASING_DATE`, `DECREASING_DATE`
- `ALPHABETICAL`, `REVERSE_ALPHABETICAL`
- `STACK_SIZE_INCREASING`, `STACK_SIZE_DECREASING`

## Anti-Lag Protection

```yaml
antiLag:
  player:
    enable: true             # Block high-ping players
    maxPing: 600             # Maximum allowed ping
  server:
    enable: true             # Disable on low server performance
    minTps: 16               # Minimum TPS requirement
```

## Anti-Dupe Protection

```yaml
antiDupe:
  enable: true               # Block duplicated items
```

## Money Claiming

```yaml
enableClaimMoney: false      # Hold money until player claims it
```

When enabled, sellers must use `/ah claim` to receive payment.

## Database Configuration

### SQLite (Default)
```yaml
storage: SQLITE
```

### MySQL
```yaml
storage: MYSQL
sql:
  user: homestead
  password: secret
  host: 192.168.10.10
  port: 3306
  database: zauctionhouse
  prefix: "zauctionhouse_"
```

## World Restrictions

```yaml
disableWorlds:
  - world_the_end
  - minigames
```

## Command Configuration

```yaml
command:
  main: zauctionhouse
  aliases:
    - zauction
    - ah
    - hdv
    - zah
    - zhdv
disableCommands: false       # Disable all commands
```

## Discord Webhook

```yaml
discordWebhook:
  isEnable: false
  url: "https://discord.com/api/webhooks/..."
```

## Item Limits

```yaml
permissions:
  - permission: zauctionhouse.max.5
    limit: 5
  - permission: zauctionhouse.max.10
    limit: 10
  - permission: zauctionhouse.max.15
    limit: 15
```

## Language

```yaml
language: 'en'               # Language file to use (en, fr, etc.)
```
