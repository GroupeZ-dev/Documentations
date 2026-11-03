---
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

<CalloutContainer type="info">

<CalloutDescription>
You can customize aliases in `config.yml` under `commands.main-command.aliases`. A server restart is required after changing command aliases.
</CalloutDescription>

</CalloutContainer>

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
| `/ah option` | Open the options GUI | `zauctionhouse.option` |
| `/ah option <option> [value]` | Toggle or set a player option | `zauctionhouse.option` |

### Sell Command Details

```bash
/ah sell <price> [amount] [economy]
```

**Arguments:**
- `<price>` - The price per item (required). Supports multipliers: `1K`, `2.5M`, `1B`, etc.
- `[amount]` - Number of items to sell from your stack (optional, defaults to full stack). With the sell inventory enabled, the amount is applied to the item held when the sale is confirmed, capped at the stack size
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
| `/ah admin` | Open the [admin player directory](/zauctionhouse/inventories/admin/admin-main) | `zauctionhouse.admin` + `zauctionhouse.admin.items` |
| `/ah admin history [player]` | Open the admin player directory, or a player's admin history | `zauctionhouse.admin.items` |
| `/ah admin generate <amount>` | Generate fake items for testing | `zauctionhouse.admin` |
| `/ah admin open <player> <type>` | View a player's listed, expired or purchased items | `zauctionhouse.admin.items` |
| `/ah admin forceopen <player> <inventory> [page]` | Open any inventory for a player | `zauctionhouse.admin` |
| `/ah admin add <player> <type>` | Add items to player's account | `zauctionhouse.admin.items` |
| `/ah admin cache show <player>` | Show player's cache data | `zauctionhouse.admin` |
| `/ah admin cache clear <player> [key]` | Clear player's cache | `zauctionhouse.admin` |
| `/ah admin cache set <player> <key> <value>` | Set cache value | `zauctionhouse.admin` |
| `/ah admin migrate <source> confirm` | Migrate data from other plugins | `zauctionhouse.admin` |
| `/ah admin option set <player> <option> <value>` | Set a player's option | `zauctionhouse.admin` |
| `/ah admin option list <player>` | List a player's options | `zauctionhouse.admin` |
| `/ah admin option reset <player>` | Reset a player's options to defaults | `zauctionhouse.admin` |

### Admin Open Types

The `<type>` parameter for `/ah admin open` accepts:
- `listed` - View player's active listings (default when the type is not recognized)
- `expired` - View player's expired items
- `purchased` - View player's purchased items

**Example:**
```bash
/ah admin open Steve listed
```

To view a player's history, use `/ah admin history <player>` (see below).

### Admin Player Directory & History

```bash
/ah admin
/ah admin history [player]
```

- `/ah admin` (no argument) and `/ah admin history` (no player) open the [admin player directory](/zauctionhouse/inventories/admin/admin-main) (`admin-main`): one head per player with auction activity, showing their current listings, sales and purchases. Click a head to open that player's admin history. The data is reloaded every time the inventory is opened.
- `/ah admin history <player>` opens the admin history menu (`admin-history-main`) of that player directly. If the player has never been seen by the plugin, an error message is sent.

Both require the `zauctionhouse.admin.items` permission. Without it, `/ah admin` only shows the command syntax.

**Examples:**
```bash
# Browse every player with auction activity
/ah admin

# Open Steve's admin history
/ah admin history Steve
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
| `admin-main` | Admin player directory |
| `admin-history-main` | Admin history main menu |
| `admin-logs` | Admin logs viewer |
| `admin-transactions` | Admin transactions viewer |
| `admin-remove-confirm` | Admin removal confirmation for a listing (normally opened with `Q` / middle click on a listing, which selects the item to remove) |
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

<CalloutContainer type="warning">

<CalloutDescription>
Always backup your data before migrating! Migration cannot be undone.
</CalloutDescription>

</CalloutContainer>

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
| `zauctionhouse.option` | Access the options GUI |
| `zauctionhouse.reload` | Reload configurations | 
| `zauctionhouse.admin` | Access admin features | 
| `zauctionhouse.admin.items` | Add/remove items as admin, open the admin player directory and admin history | 
| `zauctionhouse.admin.remove.inventory` | Press `Q` (drop) or middle click on a listing currently on sale in the auction house to open the [admin removal confirmation](/zauctionhouse/inventories/admin/admin-remove-confirm) | 

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
