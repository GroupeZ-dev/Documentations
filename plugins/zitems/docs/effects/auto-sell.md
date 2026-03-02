---
sidebar_position: 5
title: Auto Sell
description: Automatically sell drops from mining and killing
---

# Auto Sell Effect

The `AUTO_SELL` effect automatically sells items dropped from mining blocks or killing entities. It requires a shop plugin (ShopGUI+, EconomyShopGUI, or ZShop) to function.

## Configuration

```yaml
effects:
  - type: AUTO_SELL
    # Optional: Price multiplier (default: 1.0)
    multiplier: 1.5

    # Optional: Restrict which items can have this effect
    applicable-materials:
      - DIAMOND_PICKAXE
      - NETHERITE_PICKAXE
    applicable-tags:
      - PICKAXES
      - SWORDS
    applicability-blacklisted: false
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `multiplier` | Double | No | `1.0` | Price multiplier for sales |
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability |

## Supported Shop Plugins

The auto-sell effect requires one of these plugins:

| Plugin | Description |
|--------|-------------|
| **ShopGUI+** | Premium shop plugin |
| **EconomyShopGUI** | Free shop plugin |
| **ZShop** | GroupeZ shop plugin |

:::warning Shop Required
If no supported shop plugin is installed, the auto-sell effect will not function and items will drop normally.
:::

## Events

The auto-sell effect triggers on:
- `BlockBreakEvent` - When mining blocks
- `EntityDeathEvent` - When killing mobs

## Examples

### Basic Auto-Sell Pickaxe

```yaml
auto_sell_pickaxe:
  material: DIAMOND_PICKAXE
  display-name: "<gold>Money Maker</gold>"
  lore:
    - ""
    - "<gray>Automatically sells mined items!</gray>"
    - ""
    - "<yellow>Sell Rate: <white>1x</white></yellow>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3

  effects:
    - type: AUTO_SELL
      multiplier: 1.0
```

### Premium Auto-Sell with Multiplier

```yaml
premium_auto_sell:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ffd700:#ffaa00>Golden Pickaxe</gradient>"
  lore:
    - ""
    - "<gray>Sells items for <gold>50% more</gold>!</gray>"
    - ""
    - "<yellow>Sell Rate: <white>1.5x</white></yellow>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: AUTO_SELL
      multiplier: 1.5
```

### Auto-Sell Sword

```yaml
auto_sell_sword:
  material: NETHERITE_SWORD
  display-name: "<red>Merchant's Blade</red>"
  lore:
    - ""
    - "<gray>Kills sell mob drops automatically!</gray>"
    - ""
    - "<yellow>Sell Rate: <white>2x</white></yellow>"

  enchantments:
    - enchantment: SHARPNESS
      level: 5
    - enchantment: LOOTING
      level: 3

  effects:
    - type: AUTO_SELL
      multiplier: 2.0
```

### Combined Mining Tool

```yaml
ultimate_mining_tool:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ff6b6b:#feca57>Fortune Miner</gradient>"
  lore:
    - ""
    - "<gray>The ultimate money-making tool!</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- Vein Mining (32 blocks)</gray>"
    - "<gray>- Auto Smelt</gray>"
    - "<gray>- Auto Sell (2x)</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 10
    - enchantment: FORTUNE
      level: 5
    - enchantment: UNBREAKING
      level: 5

  effects:
    - type: VEIN_MINING
      tags:
        - MINEABLE_PICKAXE
      block-limit: 32

    - type: MELT_MINING

    - type: AUTO_SELL
      multiplier: 2.0
```

### Auto-Sell Rune

```yaml
auto_sell_rune:
  material: GOLD_INGOT
  display-name: "<gold>Auto-Sell Rune</gold>"
  lore:
    - ""
    - "<gray>Apply to any tool to add</gray>"
    - "<gray>auto-selling capability.</gray>"
    - ""
    - "<yellow>Multiplier: <white>1.5x</white></yellow>"

  effects:
    - type: AUTO_SELL
      multiplier: 1.5

      applicable-tags:
        - PICKAXES
        - SHOVELS
        - AXES
        - HOES
        - SWORDS

      representation:
        material: GOLD_INGOT
        display-name: "<gold>Auto-Sell Rune</gold>"
        lore:
          - ""
          - "<gray>Use in a smithing table</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

## Behavior

1. When a block is broken or entity is killed:
   - The effect collects all drops
   - Each item is checked against the shop plugin
   - If sellable, the item is sold at `price × multiplier`
   - Money is added to player's balance
   - Items that can't be sold drop normally

2. Processing order with other effects:
   - `VEIN_MINING` / `HAMMER` mine blocks first
   - `MELT_MINING` smelts drops
   - `AUTO_SELL` sells the final drops (priority: -1)

## Incompatibilities

`AUTO_SELL` is incompatible with:
- `ABSORPTION` - Both effects process drops differently

If both are applied, only one will function.

## Tips

- Always combine with `FORTUNE` for more items to sell
- Use with `VEIN_MINING` for massive profits
- Use with `MELT_MINING` to sell ingots instead of raw ores
- Higher multipliers make the effect very powerful - balance carefully
- Items without shop prices will drop normally
