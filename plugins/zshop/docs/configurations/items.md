---
sidebar_position: 3
title: Shop Items
description: Configure shop items with ZSHOP_ITEM button type
---

# Shop Items Configuration

Shop items are configured using the `ZSHOP_ITEM` button type in zMenu inventory files.

## Basic Structure

```yaml
items:
  item_id:
    type: ZSHOP_ITEM
    slot: 10
    item:
      material: DIAMOND
    buyPrice: 100.0
    sellPrice: 50.0
```

## ZSHOP_ITEM Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `buyPrice` | Double | No | 0.0 | Price to buy the item |
| `sellPrice` | Double | No | 0.0 | Price to sell the item |
| `economy` | String | No | Default | Economy to use |
| `maxStack` | Integer | No | 64 | Maximum stack size |
| `lore` | List | No | Default | Custom lore lines |
| `giveItem` | Boolean | No | true | Give item on purchase |
| `buyCommands` | List | No | - | Commands on purchase |
| `sellCommands` | List | No | - | Commands on sale |
| `enableLog` | Boolean | No | true | Log transactions |
| `affectByPriceModifier` | Boolean | No | true | Apply price modifiers |
| `unstackable` | Boolean | No | false | Prevent stacking |
| `mob` | String | No | - | Mob type for spawners |
| `inventoryBuy` | String | No | - | Custom buy inventory |
| `inventorySell` | String | No | - | Custom sell inventory |

## Examples

### Basic Shop Item

```yaml
items:
  diamond:
    type: ZSHOP_ITEM
    slot: 10
    item:
      material: DIAMOND
    buyPrice: 100.0
    sellPrice: 50.0
```

### Item with Custom Amount

```yaml
items:
  coal_stack:
    type: ZSHOP_ITEM
    slot: 11
    item:
      material: COAL
      amount: 16  # Sell/buy 16 at a time
    buyPrice: 32.0
    sellPrice: 8.0
```

### Buy-Only Item

```yaml
items:
  enchanted_book:
    type: ZSHOP_ITEM
    slot: 12
    item:
      material: ENCHANTED_BOOK
      name: "&d&lSharpness V"
      enchantments:
        - SHARPNESS,5
    buyPrice: 5000.0
    # No sellPrice = cannot sell
```

### Sell-Only Item

```yaml
items:
  rotten_flesh:
    type: ZSHOP_ITEM
    slot: 13
    item:
      material: ROTTEN_FLESH
    sellPrice: 1.0
    # No buyPrice = cannot buy
```

### Different Economy

```yaml
items:
  special_item:
    type: ZSHOP_ITEM
    slot: 14
    item:
      material: NETHER_STAR
      name: "&6&lSpecial Item"
    buyPrice: 5.0
    sellPrice: 2.0
    economy: item_diamond  # Uses diamonds as currency
```

### Custom Lore

```yaml
items:
  custom_lore_item:
    type: ZSHOP_ITEM
    slot: 15
    item:
      material: GOLDEN_APPLE
    buyPrice: 500.0
    sellPrice: 100.0
    lore:
      - ""
      - "&7A rare golden apple!"
      - ""
      - "&eBuy: &a%buyPrice%"
      - "&eSell: &c%sellPrice%"
      - ""
      - "&7Stock: &fUnlimited"
```

### Command Item (No Physical Item)

```yaml
items:
  fly_permission:
    type: ZSHOP_ITEM
    slot: 16
    item:
      material: FEATHER
      name: "&b&l1 Hour of Flight"
      lore:
        - ""
        - "&7Purchase temporary flight!"
    buyPrice: 1000.0
    giveItem: false  # Don't give the feather
    buyCommands:
      - "lp user %player% permission settemp fly.use true 1h"
      - "msg %player% &aYou now have flight for 1 hour!"
```

### Spawner with Mob Type

```yaml
items:
  zombie_spawner:
    type: ZSHOP_ITEM
    slot: 17
    item:
      material: SPAWNER
      name: "&c&lZombie Spawner"
    buyPrice: 50000.0
    sellPrice: 10000.0
    mob: ZOMBIE
```

### Unstackable Item

```yaml
items:
  unique_tool:
    type: ZSHOP_ITEM
    slot: 18
    item:
      material: DIAMOND_PICKAXE
      name: "&a&lUnique Pickaxe"
      enchantments:
        - EFFICIENCY,10
    buyPrice: 10000.0
    unstackable: true  # Each purchase is separate
```

### Item with Limits

```yaml
items:
  limited_item:
    type: ZSHOP_ITEM
    slot: 19
    item:
      material: BEACON
    buyPrice: 100000.0
    sellPrice: 25000.0

    # Server-wide buy limit (resets weekly)
    serverBuyLimit:
      limit: 10
      schedulerType: WEEKLY
      day: MONDAY
      hour: 0
      minute: 0

    # Per-player sell limit (resets daily)
    playerSellLimit:
      limit: 5
      schedulerType: DAILY
      hour: 0
      minute: 0
```

See [Limits](./limits) for detailed limit configuration.

### Ignore Price Modifiers

```yaml
items:
  fixed_price_item:
    type: ZSHOP_ITEM
    slot: 20
    item:
      material: BEDROCK
    buyPrice: 1000000.0
    affectByPriceModifier: false  # VIP discounts don't apply
```

### Custom Transaction Reasons

```yaml
items:
  special_purchase:
    type: ZSHOP_ITEM
    slot: 21
    item:
      material: DIAMOND_BLOCK
    buyPrice: 900.0
    sellPrice: 800.0
    deposit-reason: "Sold diamond block at shop"
    withdraw-reason: "Purchased diamond block from shop"
```

## Complete Category Example

```yaml
# inventories/categories/ores.yml

name: "&7Ores Shop"
size: 54

patterns:
  - "zshop_decoration"
  - "zshop_return_home"

items:
  coal:
    type: ZSHOP_ITEM
    slot: 10
    item:
      material: COAL
      amount: 16
    buyPrice: 32.0
    sellPrice: 8.0

  iron_ingot:
    type: ZSHOP_ITEM
    slot: 11
    item:
      material: IRON_INGOT
    buyPrice: 15.0
    sellPrice: 5.0

  gold_ingot:
    type: ZSHOP_ITEM
    slot: 12
    item:
      material: GOLD_INGOT
    buyPrice: 50.0
    sellPrice: 25.0

  diamond:
    type: ZSHOP_ITEM
    slot: 13
    item:
      material: DIAMOND
    buyPrice: 500.0
    sellPrice: 250.0

  emerald:
    type: ZSHOP_ITEM
    slot: 14
    item:
      material: EMERALD
    buyPrice: 200.0
    sellPrice: 100.0

  lapis_lazuli:
    type: ZSHOP_ITEM
    slot: 15
    item:
      material: LAPIS_LAZULI
    buyPrice: 10.0
    sellPrice: 2.0

  redstone:
    type: ZSHOP_ITEM
    slot: 16
    item:
      material: REDSTONE
    buyPrice: 5.0
    sellPrice: 1.0

  netherite_ingot:
    type: ZSHOP_ITEM
    slot: 22
    item:
      material: NETHERITE_INGOT
    buyPrice: 10000.0
    sellPrice: 5000.0
    serverBuyLimit:
      limit: 5
      schedulerType: DAILY
      hour: 0
      minute: 0
```

## Lore Placeholders

Available placeholders in item lore:

| Placeholder | Description |
|-------------|-------------|
| `%buyPrice%` | Formatted buy price |
| `%sellPrice%` | Formatted sell price |
| `%maxStack%` | Maximum stack size |
| `%economy%` | Economy name |
| `%player%` | Player name |

Plus all PlaceholderAPI placeholders.

## Item Configuration

The `item` section follows [zMenu item format](https://docs.zmenu.dev/configurations/items):

```yaml
item:
  material: DIAMOND_SWORD
  name: "&6&lLegendary Sword"
  lore:
    - "&7A powerful weapon"
  amount: 1
  model-id: 1001
  glow: true
  enchantments:
    - SHARPNESS,5
  flags:
    - HIDE_ENCHANTS
    - HIDE_ATTRIBUTES
```
