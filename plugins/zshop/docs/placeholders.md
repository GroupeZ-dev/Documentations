---
sidebar_position: 6
title: Placeholders
description: Available placeholders in zShop
---

# Placeholders

zShop provides various placeholders for use in item lore, messages, and with PlaceholderAPI.

## Item Button Placeholders

These placeholders work in `ZSHOP_ITEM` button lore:

| Placeholder | Description |
|-------------|-------------|
| `%buyPrice%` | Formatted buy price with currency |
| `%sellPrice%` | Formatted sell price with currency |
| `%maxStack%` | Maximum stack size |
| `%economy%` | Economy name |

### Example Usage

```yaml
items:
  diamond:
    type: ZSHOP_ITEM
    item:
      material: DIAMOND
    buyPrice: 100.0
    sellPrice: 50.0
    slot: 10
    lore:
      - ""
      - "&7Buy Price: &a%buyPrice%"
      - "&7Sell Price: &c%sellPrice%"
      - ""
      - "&7Max Stack: &f%maxStack%"
```

## Limit Placeholders

Display limit information in item lore:

| Placeholder | Description |
|-------------|-------------|
| `%zshop_limit_player_buy_<MATERIAL>%` | Remaining player buy limit |
| `%zshop_limit_player_sell_<MATERIAL>%` | Remaining player sell limit |
| `%zshop_limit_server_buy_<MATERIAL>%` | Remaining server buy limit |
| `%zshop_limit_server_sell_<MATERIAL>%` | Remaining server sell limit |
| `%zshop_limit_player_buy_<MATERIAL>_max%` | Maximum player buy limit |
| `%zshop_limit_player_sell_<MATERIAL>_max%` | Maximum player sell limit |
| `%zshop_limit_server_buy_<MATERIAL>_max%` | Maximum server buy limit |
| `%zshop_limit_server_sell_<MATERIAL>_max%` | Maximum server sell limit |
| `%zshop_limit_player_buy_<MATERIAL>_reset%` | Time until player buy reset |
| `%zshop_limit_player_sell_<MATERIAL>_reset%` | Time until player sell reset |
| `%zshop_limit_server_buy_<MATERIAL>_reset%` | Time until server buy reset |
| `%zshop_limit_server_sell_<MATERIAL>_reset%` | Time until server sell reset |

### Example with Limits

```yaml
items:
  limited_diamond:
    type: ZSHOP_ITEM
    item:
      material: DIAMOND
    buyPrice: 100.0
    sellPrice: 50.0
    slot: 10
    lore:
      - ""
      - "&7Buy: &a%buyPrice%"
      - "&7Sell: &c%sellPrice%"
      - ""
      - "&eYour Buy Limit:"
      - "&7Remaining: &f%zshop_limit_player_buy_DIAMOND%&7/&f%zshop_limit_player_buy_DIAMOND_max%"
      - "&7Resets in: &f%zshop_limit_player_buy_DIAMOND_reset%"
      - ""
      - "&eServer Stock:"
      - "&7Available: &f%zshop_limit_server_buy_DIAMOND%&7/&f%zshop_limit_server_buy_DIAMOND_max%"

    playerBuyLimit:
      limit: 10
      schedulerType: DAILY
      hour: 0
      minute: 0

    serverBuyLimit:
      limit: 100
      schedulerType: DAILY
      hour: 0
      minute: 0
```

## Price Modifier Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zshop_modifier_sell%` | Player's sell price modifier |
| `%zshop_modifier_buy%` | Player's buy price modifier |

### Example

```yaml
lore:
  - ""
  - "&7Your Bonuses:"
  - "&7Sell Modifier: &a%zshop_modifier_sell%x"
  - "&7Buy Modifier: &a%zshop_modifier_buy%x"
```

## Transaction Placeholders

Used in log messages and transaction reasons:

| Placeholder | Description |
|-------------|-------------|
| `%player%` | Player name |
| `%amount%` | Item amount |
| `%item%` | Item name |
| `%price%` | Transaction price |
| `%name%` | Full item display name |
| `%shop%` | Shop/category name |

### Configuration Example

```yaml
# In config.yml
log:
  buyMessage: "%player% has purchased x%amount% %item% for %price%."
  sellMessage: "%player% has just sold x%amount% %item% for %price%."
  sellAllMessage: "%player% sold %amount% items for %price% at %shop%"

withdraw-reason: "Sale of x%amount% %item%"
deposit-reason: "Purchase of x%amount% %item%"
```

## PlaceholderAPI Integration

zShop integrates with PlaceholderAPI. All zShop placeholders use the `%zshop_...%` format:

```
%zshop_limit_player_buy_DIAMOND%
%zshop_limit_server_sell_IRON_INGOT%
%zshop_modifier_sell%
%zshop_modifier_buy%
```

### Using in Other Plugins

You can use zShop placeholders in any PlaceholderAPI-compatible plugin:

**Scoreboard:**
```yaml
lines:
  - "&7Sell Bonus: &a%zshop_modifier_sell%x"
```

**Hologram:**
```yaml
lines:
  - "&6&lShop Status"
  - "&7Diamonds Left: %zshop_limit_server_buy_DIAMOND%"
```

**Tab:**
```yaml
header:
  - "&7Your sell bonus: &a%zshop_modifier_sell%x"
```

## Complete Lore Example

```yaml
items:
  premium_item:
    type: ZSHOP_ITEM
    item:
      material: NETHERITE_INGOT
      name: "&6&lNetherite Ingot"
    buyPrice: 10000.0
    sellPrice: 5000.0
    slot: 22
    lore:
      - "&8&m─────────────────────"
      - ""
      - "&eTransaction Info:"
      - "&7Buy: &a%buyPrice%"
      - "&7Sell: &c%sellPrice%"
      - ""
      - "&eYour Limits:"
      - "&7Buy: &f%zshop_limit_player_buy_NETHERITE_INGOT%&7/&f%zshop_limit_player_buy_NETHERITE_INGOT_max%"
      - "&7Sell: &f%zshop_limit_player_sell_NETHERITE_INGOT%&7/&f%zshop_limit_player_sell_NETHERITE_INGOT_max%"
      - ""
      - "&eServer Stock:"
      - "&7Available: &f%zshop_limit_server_buy_NETHERITE_INGOT%"
      - "&7Resets: &f%zshop_limit_server_buy_NETHERITE_INGOT_reset%"
      - ""
      - "&eYour Bonuses:"
      - "&7Sell: &a%zshop_modifier_sell%x"
      - "&7Buy: &a%zshop_modifier_buy%x"
      - ""
      - "&8&m─────────────────────"
      - ""
      - "&7Left-click to &aBUY"
      - "&7Right-click to &cSELL"

    playerBuyLimit:
      limit: 5
      schedulerType: DAILY
      hour: 0
      minute: 0

    playerSellLimit:
      limit: 10
      schedulerType: DAILY
      hour: 0
      minute: 0

    serverBuyLimit:
      limit: 50
      schedulerType: WEEKLY
      day: MONDAY
      hour: 0
      minute: 0
```
