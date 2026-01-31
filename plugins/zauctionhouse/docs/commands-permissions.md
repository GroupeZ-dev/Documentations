---
sidebar_position: 3
title: Commands & Permissions
description: Complete list of commands and permissions for zAuctionHouse
---

# Commands & Permissions

This page lists all commands and permissions available in zAuctionHouse.

## Commands

### Player Commands

| Command | Description | Permission |
|---------|-------------|------------|
| `/ah` | Open the auction house | `zauctionhouse.use` |
| `/ah sell <price>` | Sell the item in your hand | `zauctionhouse.sell` |
| `/ah sell <price> <amount>` | Sell a specific amount | `zauctionhouse.sell` |
| `/ah selling` | View your listed items | `zauctionhouse.selling` |
| `/ah expired` | View your expired items | `zauctionhouse.expired` |
| `/ah purchased` | View items you've bought | `zauctionhouse.purchased` |
| `/ah search <query>` | Search for items | `zauctionhouse.search` |
| `/ah category <name>` | Open a specific category | `zauctionhouse.category` |

### Admin Commands

| Command | Description | Permission |
|---------|-------------|------------|
| `/ah admin reload` | Reload all configurations | `zauctionhouse.admin.reload` |
| `/ah admin clear` | Clear all auction items | `zauctionhouse.admin.clear` |
| `/ah admin remove <player>` | Remove all items from a player | `zauctionhouse.admin.remove` |
| `/ah admin expire <player>` | Expire all items from a player | `zauctionhouse.admin.expire` |
| `/ah admin stats` | View auction statistics | `zauctionhouse.admin.stats` |
| `/ah admin database` | View database information | `zauctionhouse.admin.database` |

## Permissions

### Basic Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zauctionhouse.use` | Access the auction house | true |
| `zauctionhouse.sell` | Sell items | true |
| `zauctionhouse.selling` | View your listed items | true |
| `zauctionhouse.expired` | View your expired items | true |
| `zauctionhouse.purchased` | View purchased items | true |
| `zauctionhouse.search` | Search for items | true |
| `zauctionhouse.category` | Use categories | true |

### Admin Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zauctionhouse.admin` | Access all admin commands | op |
| `zauctionhouse.admin.reload` | Reload configurations | op |
| `zauctionhouse.admin.clear` | Clear all items | op |
| `zauctionhouse.admin.remove` | Remove player items | op |
| `zauctionhouse.admin.expire` | Expire player items | op |
| `zauctionhouse.admin.stats` | View statistics | op |
| `zauctionhouse.admin.database` | View database info | op |
| `zauctionhouse.admin.bypass` | Bypass all restrictions | op |

### Item Limit Permissions

Control how many items a player can list simultaneously:

| Permission | Limit |
|------------|-------|
| `zauctionhouse.limit.5` | 5 items |
| `zauctionhouse.limit.10` | 10 items |
| `zauctionhouse.limit.25` | 25 items |
| `zauctionhouse.limit.50` | 50 items |
| `zauctionhouse.limit.100` | 100 items |
| `zauctionhouse.limit.unlimited` | No limit |

The plugin uses the highest limit permission the player has. Configure default limits in `config.yml`:

```yaml
limits:
  default: 10
  # Permission-based limits
  permissions:
    - permission: zauctionhouse.limit.5
      limit: 5
    - permission: zauctionhouse.limit.10
      limit: 10
    - permission: zauctionhouse.limit.25
      limit: 25
    - permission: zauctionhouse.limit.50
      limit: 50
    - permission: zauctionhouse.limit.100
      limit: 100
    - permission: zauctionhouse.limit.unlimited
      limit: -1
```

### Expiration Time Permissions

Control custom expiration times for listed items:

| Permission | Duration |
|------------|----------|
| `zauctionhouse.expire.1h` | 1 hour |
| `zauctionhouse.expire.6h` | 6 hours |
| `zauctionhouse.expire.12h` | 12 hours |
| `zauctionhouse.expire.1d` | 1 day |
| `zauctionhouse.expire.3d` | 3 days |
| `zauctionhouse.expire.7d` | 7 days |
| `zauctionhouse.expire.14d` | 14 days |
| `zauctionhouse.expire.30d` | 30 days |

Configure in `config.yml`:

```yaml
expiration:
  default: 7d
  # Permission-based expiration times
  permissions:
    - permission: zauctionhouse.expire.1h
      duration: 1h
    - permission: zauctionhouse.expire.6h
      duration: 6h
    - permission: zauctionhouse.expire.12h
      duration: 12h
    - permission: zauctionhouse.expire.1d
      duration: 1d
    - permission: zauctionhouse.expire.3d
      duration: 3d
    - permission: zauctionhouse.expire.7d
      duration: 7d
    - permission: zauctionhouse.expire.14d
      duration: 14d
    - permission: zauctionhouse.expire.30d
      duration: 30d
```

### Bypass Permissions

| Permission | Description |
|------------|-------------|
| `zauctionhouse.bypass.limit` | Bypass item listing limits |
| `zauctionhouse.bypass.cooldown` | Bypass sell cooldowns |
| `zauctionhouse.bypass.price` | Bypass min/max price restrictions |
| `zauctionhouse.bypass.blacklist` | Bypass item blacklist |
| `zauctionhouse.bypass.tax` | Bypass taxes |
| `zauctionhouse.bypass.world` | Bypass world restrictions |

### Economy Permissions

If using multiple economies, control access:

| Permission | Description |
|------------|-------------|
| `zauctionhouse.economy.vault` | Use Vault economy |
| `zauctionhouse.economy.playerpoints` | Use PlayerPoints |
| `zauctionhouse.economy.experience` | Use experience |
| `zauctionhouse.economy.levels` | Use levels |
| `zauctionhouse.economy.<name>` | Use custom economy |

## Command Aliases

You can configure command aliases in `config.yml`:

```yaml
commands:
  main:
    name: ah
    aliases:
      - auctionhouse
      - auction
      - hdv
```

## Permission Examples

### LuckPerms

Give a VIP group 50 item slots and 14-day expiration:

```
/lp group vip permission set zauctionhouse.limit.50 true
/lp group vip permission set zauctionhouse.expire.14d true
```

### PermissionsEx

```yaml
groups:
  vip:
    permissions:
      - zauctionhouse.limit.50
      - zauctionhouse.expire.14d
```

### GroupManager

```yaml
groups:
  vip:
    permissions:
      - zauctionhouse.limit.50
      - zauctionhouse.expire.14d
```
