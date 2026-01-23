---
sidebar_position: 3
title: Commands & Permissions
description: All zAuctionHouse commands and permissions
---

# Commands & Permissions

## Main Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/ah` | `zauctionhouse.use` | Open the auction house |
| `/zauction` | `zauctionhouse.use` | Alias for `/ah` |
| `/hdv` | `zauctionhouse.use` | Alias for `/ah` |

## Selling Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/ah sell <price> [amount]` | `zauctionhouse.sell` | List an item for sale |
| `/ah sellinventory <price>` | `zauctionhouse.sell.inventory` | Sell entire inventory |
| `/ah sell-confirmation-toggle` | `zauctionhouse.sell.confirmation.toggle` | Toggle sell confirmation |

### Selling with Different Economies

You can specify the economy by adding the format after the price:
```
/ah sell <price><format> [amount]
```

Example: `/ah sell 10l` sells an item for 10 levels (if `l` is the level economy format).

## Navigation Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/ah expire` | - | View expired items |
| `/ah buying` | - | View purchased items |
| `/ah categories` | - | Browse item categories |
| `/ah items` | - | Manage your active listings |

## Utility Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/ah search <string>` | `zauctionhouse.search` | Search for items |
| `/ah claim` | `zauctionhouse.claim` | Collect pending money |
| `/ah history [page] [type]` | `zauctionhouse.history` | View transaction history |
| `/ah transaction <player>` | `zauctionhouse.transaction` | View player's transaction history |

## Admin Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/ah reload` | `zauctionhouse.reload` | Reload configuration files |
| `/ah config` | `zauctionhouse.config` | In-game configuration |
| `/ah version` | (config.yml setting) | Display plugin version |
| `/ah blacklist` | `zauctionhouse.blacklist` | View blacklisted players |
| `/ah purge <days>` | `zauctionhouse.purge` | Remove old transactions |
| `/ah giveeconomyitem <economy>` | `zauctionhouse.give.economy.item` | Get economy item |

## Conversion Commands

| Command | Description |
|---------|-------------|
| `/ah convert zauctionhousev2` | Convert from v2 |
| `/ah convert crazyauction` | Convert from CrazyAuction |
| `/ah convert zmenu` | Convert zMenu configurations |
| `/ah convert items_base64_to_minecraft_1_21` | Convert items for 1.21 |

---

## Permissions

### Basic Permissions

| Permission | Description |
|------------|-------------|
| `zauctionhouse.use` | Access the auction house |
| `zauctionhouse.sell` | List items for sale |
| `zauctionhouse.sell.inventory` | Sell entire inventory |
| `zauctionhouse.search` | Use the search feature |
| `zauctionhouse.claim` | Claim pending money |
| `zauctionhouse.history` | View transaction history |

### Item Limit Permissions

Control how many items a player can list:

| Permission | Limit |
|------------|-------|
| `zauctionhouse.max.5` | 5 items |
| `zauctionhouse.max.10` | 10 items |
| `zauctionhouse.max.15` | 15 items |
| `zauctionhouse.max.<number>` | Custom limit |

### Expiration Time Permissions

Control how long items stay listed:

| Permission | Duration |
|------------|----------|
| `zauctionhouse.expiration.vip` | 3600 seconds (1 hour) |
| `zauctionhouse.expiration.elite` | 7200 seconds (2 hours) |
| `zauctionhouse.expiration.legend` | 259200 seconds (3 days) |

Configure custom durations in `config.yml`.

### Admin Permissions

| Permission | Description |
|------------|-------------|
| `zauctionhouse.reload` | Reload configurations |
| `zauctionhouse.config` | Access in-game config |
| `zauctionhouse.admin.remove` | Remove any listing |
| `zauctionhouse.admin.bypass.cooldown` | Bypass cooldowns |
| `zauctionhouse.transaction` | View other players' history |
| `zauctionhouse.blacklist` | Manage blacklist |
| `zauctionhouse.purge` | Purge old data |

### Tax Bypass

| Permission | Description |
|------------|-------------|
| `zauctionhouse.bypass.tax` | Exempt from sales tax |

---

## Examples

### Basic Setup with LuckPerms

```bash
# Allow all players to use the auction house
/lp group default permission set zauctionhouse.use true
/lp group default permission set zauctionhouse.sell true
/lp group default permission set zauctionhouse.max.5 true

# VIP perks
/lp group vip permission set zauctionhouse.max.15 true
/lp group vip permission set zauctionhouse.expiration.vip true

# Admin permissions
/lp group admin permission set zauctionhouse.admin.remove true
/lp group admin permission set zauctionhouse.reload true
```
