---
sidebar_position: 3
title: Commands & Permissions
description: Complete list of commands and permissions for zAuctionHouse V4
---

# Commands & Permissions

This page lists all commands and permissions available in zAuctionHouse V4.

## Main Command

The main command is `/zauctionhouse` with the following default aliases:
- `/ah` - Short and common
- `/hdv` - French abbreviation (Hotel des Ventes)
- `/auction` - Full English name
- `/zauction` - Plugin-prefixed version

:::info
You can customize aliases in `config.yml` under `commands.main-command.aliases`. A server restart is required after changing command aliases.
:::

## Player Commands

| Command | Description | Permission |
|---------|-------------|------------|
| `/ah` | Open the auction house | `zauctionhouse.use` |
| `/ah sell <price> [amount] [economy]` | Sell the item in your hand | `zauctionhouse.sell` |
| `/ah claim` | Claim pending money from sales | - |
| `/ah page <number>` | Open auction house at specific page | - |
| `/ah selling` | View your currently listed items | `zauctionhouse.selling` |
| `/ah expired` | View your expired items | `zauctionhouse.expired` |
| `/ah purchased` | View items you've bought | `zauctionhouse.purchased` |
| `/ah history` | View your sales history | `zauctionhouse.history` |
| `/ah search <query>` | Search items in the auction house | `zauctionhouse.use` |

### Sell Command Details

```bash
/ah sell <price> [amount] [economy]
```

**Arguments:**
- `<price>` - The price per item (required). Supports multipliers: `1K`, `2.5M`, `1B`, etc.
- `[amount]` - Number of items to sell from your stack (optional, defaults to full stack)
- `[economy]` - Which economy to use (optional, defaults to configured default)

**Examples:**
```bash
# Sell item in hand for 1000
/ah sell 1000

# Sell 32 items for 5000 each
/ah sell 5000 32

# Sell using specific economy
/ah sell 10000 64 vault
```

### Search Command Details

```bash
/ah search <query>
```

Search for items in the auction house. Without operators, the query performs a case-insensitive substring match on item name, material, lore, and seller.

**Advanced Filters:**

Use the format `field operator value` for targeted searches. Spaces around the operator are supported.

| Operator | Description |
|----------|-------------|
| `~` | Contains (case-sensitive) |
| `=` | Exact match (case-sensitive) |
| `~=` | Contains (ignore case) |
| `==` | Exact match (ignore case) |

| Field | Description |
|-------|-------------|
| `name` | Item display name |
| `material` | Item material type |
| `lore` | Item lore text |
| `seller` | Seller player name |

**Examples:**
```bash
# Simple search (matches name, material, lore, seller)
/ah search diamond

# Find items sold by a specific player
/ah search seller = Notch

# Find items containing "Diamond" in their name
/ah search name ~ Diamond

# Find swords (case-insensitive)
/ah search material ~= sword
```

### Sell Inventory Mode

If `enable-sell-inventory` is set to `true` in config, running `/ah sell` without arguments opens a GUI where players can:
- Select items from their inventory
- Set the price
- Choose the economy

## Admin Commands

| Command | Description | Permission |
|---------|-------------|------------|
| `/ah reload` | Reload all configuration files | `zauctionhouse.reload` |
| `/ah admin` | Access admin tools | `zauctionhouse.admin` |
| `/ah admin generate <amount>` | Generate fake items for testing | `zauctionhouse.admin` |
| `/ah admin open <type> <player>` | View player's items/history | `zauctionhouse.admin` |
| `/ah admin forceopen <player> <inventory> [page]` | Open any inventory for a player | `zauctionhouse.admin` |
| `/ah admin add <player> <type>` | Add items to player's account | `zauctionhouse.admin.items` |
| `/ah admin cache show <player>` | Show player's cache data | `zauctionhouse.admin` |
| `/ah admin cache clear <player> [key]` | Clear player's cache | `zauctionhouse.admin` |
| `/ah admin cache set <player> <key> <value>` | Set cache value | `zauctionhouse.admin` |
| `/ah admin migrate <source> confirm` | Migrate data from other plugins | `zauctionhouse.admin` |

### Admin Open Types

The `<type>` parameter for `/ah admin open` accepts:
- `selling` - View player's active listings
- `expired` - View player's expired items
- `purchased` - View player's purchased items
- `history` - View player's sales history

**Example:**
```bash
/ah admin open selling Steve
```

### Admin Force Open Command

```bash
/ah admin forceopen <player> <inventory> [page]
```

Opens any inventory for a player at a specific page. Useful for debugging or navigating directly to a specific inventory and page.

**Arguments:**
- `<player>` - Target player name (required)
- `<inventory>` - Inventory to open (required). Accepts any inventory file name
- `[page]` - Page number to open at (optional, defaults to 1)

**Available inventories:**

| Inventory | Description |
|-----------|-------------|
| `auction` | Main auction house listing |
| `admin-selling-items` | Admin view of player's active listings |
| `admin-expired-items` | Admin view of player's expired items |
| `admin-purchased-items` | Admin view of player's purchased items |
| `admin-history-main` | Admin history main menu |
| `admin-logs` | Admin logs viewer |
| `admin-transactions` | Admin transactions viewer |
| `selling-items` | Player's currently selling items |
| `expired-items` | Player's expired items |
| `purchased-items` | Player's purchased items |
| `history` | Player's sales history |
| `sell-inventory` | Sell preparation inventory |
| `shulker-content` | Shulker box content viewer |

**Examples:**
```bash
# Open admin view of Steve's active listings
/ah admin forceopen Steve admin-selling-items

# Open auction house at page 3
/ah admin forceopen Steve auction 3

# Open admin logs at page 2
/ah admin forceopen Steve admin-logs 2
```

### Migration

Migrate data from other auction plugins:

```bash
/ah admin migrate zauctionhousev3 confirm
```

Supported sources:
- `zauctionhousev3` (aliases: `zah`, `zahv3`, `v3`)

:::warning
Always backup your data before migrating! Migration cannot be undone.
:::

## Permissions

### Basic Permissions

| Permission | Description |
|------------|-------------|
| `zauctionhouse.use` | Access the auction house | 
| `zauctionhouse.sell` | Sell items on the auction house | 
| `zauctionhouse.selling` | View your listed items | 
| `zauctionhouse.expired` | View your expired items | 
| `zauctionhouse.purchased` | View purchased items | 
| `zauctionhouse.history` | View sales history | 
| `zauctionhouse.reload` | Reload configurations | 
| `zauctionhouse.admin` | Access admin features | 
| `zauctionhouse.admin.items` | Add/remove items as admin | 
| `zauctionhouse.admin.remove-inventory` | Remove items from sale via GUI | 

### Item Limit Permissions

Control how many items a player can list simultaneously. Configure in `config.yml`:

```yaml
permissions:
  auction:
    - permission: zauctionhouse.max.5
      limit: 5
    - permission: zauctionhouse.max.10
      limit: 10
    - permission: zauctionhouse.max.15
      limit: 15
```

The plugin uses the highest limit permission the player has.

| Permission | Limit |
|------------|-------|
| `zauctionhouse.max.5` | 5 items |
| `zauctionhouse.max.10` | 10 items |
| `zauctionhouse.max.15` | 15 items |

### Expiration Time Permissions

Control custom expiration times for listed items. Configure in `config.yml`:

```yaml
expiration:
  auction:
    default-expiration: 172800  # 2 days in seconds
    permission:
      enable: true
      permissions:
        - permission: zauctionhouse.expiration.vip
          expiration: 3600      # 1 hour
        - permission: zauctionhouse.expiration.elite
          expiration: 7200      # 2 hours
        - permission: zauctionhouse.expiration.legend
          expiration: 259200    # 3 days
```

| Permission | Duration |
|------------|----------|
| `zauctionhouse.expiration.vip` | 1 hour |
| `zauctionhouse.expiration.elite` | 2 hours |
| `zauctionhouse.expiration.legend` | 3 days |

### Tax Permissions

Control tax rates for players. Configure in `economies.yml`:

| Permission | Description |
|------------|-------------|
| `zauctionhouse.tax.bypass` | Completely bypass all taxes |
| `zauctionhouse.tax.vip` | 50% tax reduction |
| `zauctionhouse.tax.premium` | 25% tax reduction |
| `zauctionhouse.tax.member` | 10% tax reduction |

### Economy Permissions

If using multiple economies, control access per economy:

| Permission | Description |
|------------|-------------|
| `zauctionhouse.economy.<name>` | Use specific economy |

Replace `<name>` with your economy name (e.g., `vault`, `playerpoints`).

## Command Aliases Configuration

Configure command aliases in `config.yml`:

```yaml
commands:
  main-command:
    aliases:
      - ah
      - hdv
      - auction
      - zauction

  sell:
    aliases:
      - sell
      - s
      - vendre

  claim:
    aliases:
      - claim
      - c
      - recuperer

  page:
    aliases:
      - page
      - p

  search:
    aliases:
      - search
      - s
```

## Price Multipliers

Players can use shorthand notation for large prices:

| Suffix | Multiplier |
|--------|------------|
| `K` | 1,000 |
| `M` | 1,000,000 |
| `B` | 1,000,000,000 |
| `T` | 1,000,000,000,000 |
| `Q` | 1,000,000,000,000,000 |

**Examples:**
```bash
/ah sell 1K      # = 1,000
/ah sell 2.5M    # = 2,500,000
/ah sell 1.5B    # = 1,500,000,000
```

## Permission Examples

### LuckPerms

Give a VIP group 15 item slots and legend expiration:

```bash
/lp group vip permission set zauctionhouse.max.15 true
/lp group vip permission set zauctionhouse.expiration.legend true
/lp group vip permission set zauctionhouse.tax.vip true
```

### Example Group Setup

```yaml
# VIP Group
permissions:
  - zauctionhouse.max.15
  - zauctionhouse.expiration.legend
  - zauctionhouse.tax.vip

# Staff Group
permissions:
  - zauctionhouse.admin
  - zauctionhouse.reload
  - zauctionhouse.admin.items
```
