---
sidebar_position: 4
title: Farming Hoe
description: Harvest, till, and plant crops in an area
---

# Farming Hoe Effect

The `FARMING_HOE` effect allows players to harvest mature crops, till soil, and plant seeds in a configurable area.

## Configuration

```yaml
effects:
  - type: FARMING_HOE
    # Required: Area size (must be odd number)
    size: 5

    # Optional: Auto-replant harvested crops
    auto-replant: true

    # Optional: Where drops appear
    drop-location: BLOCK  # BLOCK, CENTER, or PLAYER

    # Optional: Send drops to inventory
    drop-in-inventory: false

    # Optional: Enable harvesting
    harvest: true

    # Optional: Enable seed planting
    plant-seeds: true

    # Optional: Items to exclude from drops
    drop-blacklist:
      - WHEAT_SEEDS  # Don't drop seeds

    # Optional: Restrict which crops can be harvested
    allowed-crops:
      - WHEAT
      - CARROTS
      - POTATOES
      - BEETROOTS

    # Optional: Restrict which seeds can be planted
    allowed-seeds:
      - WHEAT_SEEDS
      - CARROT
      - POTATO
      - BEETROOT_SEEDS

    # Optional: Damage per harvest operation
    harvest-damage: 1

    # Optional: Damage per tilling operation
    till-damage: 1

    # Optional: Restrict which items can have this effect
    applicable-materials:
      - DIAMOND_HOE
      - NETHERITE_HOE
    applicable-tags:
      - HOES
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `size` | Integer | Yes | - | Area size (must be odd) |
| `auto-replant` | Boolean | No | `true` | Auto-replant after harvest |
| `drop-location` | Enum | No | `BLOCK` | Where drops appear |
| `drop-in-inventory` | Boolean | No | `false` | Send to inventory |
| `harvest` | Boolean | No | `true` | Enable harvesting |
| `plant-seeds` | Boolean | No | `true` | Enable planting |
| `drop-blacklist` | List | No | - | Items to not drop |
| `allowed-crops` | List | No | All | Crops that can be harvested |
| `allowed-seeds` | List | No | All | Seeds that can be planted |
| `harvest-damage` | Integer | No | `1` | Damage per harvest |
| `till-damage` | Integer | No | `1` | Damage per till |
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability |

## Drop Locations

| Location | Description |
|----------|-------------|
| `BLOCK` | Drops appear at each harvested block |
| `CENTER` | Drops appear at the center block |
| `PLAYER` | Drops appear at player's location |

## Supported Crops

| Crop | Seed | Farmland |
|------|------|----------|
| `WHEAT` | `WHEAT_SEEDS` | Farmland |
| `CARROTS` | `CARROT` | Farmland |
| `POTATOES` | `POTATO` | Farmland |
| `BEETROOTS` | `BEETROOT_SEEDS` | Farmland |
| `PUMPKIN_STEM` | `PUMPKIN_SEEDS` | Farmland |
| `MELON_STEM` | `MELON_SEEDS` | Farmland |
| `NETHER_WART` | `NETHER_WART` | Soul Sand |

## Functionality

### Harvesting (Left-Click / Break)
- Triggers when breaking a mature crop
- Harvests all mature crops in the area
- Auto-replants if enabled
- Drops can go to ground or inventory

### Tilling (Right-Click)
- Triggers when right-clicking dirt/grass
- Converts soil to farmland in the area
- Works on: Dirt, Grass, Podzol, Mycelium, Rooted Dirt, Dirt Path

### Planting (Right-Click on Farmland)
- Triggers when right-clicking farmland/soul sand
- Plants seeds from player's inventory
- Plants in the entire area

## Examples

### Basic Farming Hoe

```yaml
farming_hoe:
  material: DIAMOND_HOE
  display-name: "<green>Farmer's Hoe</green>"
  lore:
    - ""
    - "<gray>Harvest and plant in a</gray>"
    - "<gray>3x3 area!</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: FARMING_HOE
      size: 3
      auto-replant: true
      harvest: true
      plant-seeds: true
```

### Advanced 5x5 Farming Hoe

```yaml
advanced_farming_hoe:
  material: NETHERITE_HOE
  display-name: "<gradient:#7cfc00:#228b22>Master Farmer</gradient>"
  lore:
    - ""
    - "<gray>The ultimate farming tool!</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- 5x5 Area</gray>"
    - "<gray>- Auto Replant</gray>"
    - "<gray>- Direct to Inventory</gray>"
    - ""
    - "<gold>Crops: <white>All</white></gold>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3
    - enchantment: UNBREAKING
      level: 3
    - enchantment: MENDING
      level: 1

  effects:
    - type: FARMING_HOE
      size: 5
      auto-replant: true
      drop-in-inventory: true
      drop-location: PLAYER
      harvest: true
      plant-seeds: true
      harvest-damage: 1
      till-damage: 1
```

### Wheat-Only Harvester

```yaml
wheat_harvester:
  material: GOLDEN_HOE
  display-name: "<yellow>Wheat Harvester</yellow>"
  lore:
    - ""
    - "<gray>Specialized for wheat farming</gray>"
    - "<gray>No seed drops!</gray>"

  enchantments:
    - enchantment: FORTUNE
      level: 3

  effects:
    - type: FARMING_HOE
      size: 5
      auto-replant: true
      harvest: true
      plant-seeds: false
      allowed-crops:
        - WHEAT
      drop-blacklist:
        - WHEAT_SEEDS
```

### Nether Wart Harvester

```yaml
nether_wart_harvester:
  material: NETHERITE_HOE
  display-name: "<dark_red>Nether Harvester</dark_red>"
  lore:
    - ""
    - "<gray>Harvest nether warts</gray>"
    - "<gray>in a 5x5 area!</gray>"

  effects:
    - type: FARMING_HOE
      size: 5
      auto-replant: true
      allowed-crops:
        - NETHER_WART
      allowed-seeds:
        - NETHER_WART
      drop-in-inventory: true
```

### Auto-Sell Farming Hoe

```yaml
sell_farming_hoe:
  material: NETHERITE_HOE
  display-name: "<gradient:#ffd700:#ffaa00>Profit Farmer</gradient>"
  lore:
    - ""
    - "<gray>Harvest and auto-sell!</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- 5x5 Area</gray>"
    - "<gray>- Auto Replant</gray>"
    - "<gray>- Auto Sell (1.5x)</gray>"

  enchantments:
    - enchantment: FORTUNE
      level: 3
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: FARMING_HOE
      size: 5
      auto-replant: true
      harvest: true
      drop-blacklist:
        - WHEAT_SEEDS
        - BEETROOT_SEEDS

    - type: AUTO_SELL
      multiplier: 1.5
```

### Full Configuration Example

```yaml
ultimate_farmer:
  material: NETHERITE_HOE
  display-name: "<gradient:#00ff00:#00aa00>Ultimate Farmer</gradient>"
  lore:
    - ""
    - "<gray>The most advanced farming tool!</gray>"
    - ""
    - "<yellow>Area: <white>7x7</white></yellow>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- Harvest all crops</gray>"
    - "<gray>- Auto replant</gray>"
    - "<gray>- Till soil</gray>"
    - "<gray>- Plant seeds</gray>"
    - "<gray>- Items to inventory</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 10
    - enchantment: FORTUNE
      level: 5
    - enchantment: UNBREAKING
      level: 5
    - enchantment: MENDING
      level: 1

  effects:
    - type: FARMING_HOE
      size: 7
      auto-replant: true
      drop-location: PLAYER
      drop-in-inventory: true
      harvest: true
      plant-seeds: true
      drop-blacklist:
        - WHEAT_SEEDS
        - BEETROOT_SEEDS
        - PUMPKIN_SEEDS
        - MELON_SEEDS
      harvest-damage: 1
      till-damage: 1

  unbreakable: false
  max-damage: 5000
```

## Behavior

1. **Harvesting**:
   - Only harvests fully grown crops
   - Respects Fortune enchantment for bonus drops
   - Auto-replants set crop age to 0
   - Drop blacklist filters unwanted items

2. **Tilling**:
   - Converts compatible blocks to farmland
   - Respects protection plugins

3. **Planting**:
   - Uses seeds from player's inventory
   - Matches seed type to soil (farmland vs soul sand)
   - Consumes seeds from inventory

## Tips

- Use odd numbers for `size` (3, 5, 7, etc.)
- Enable `drop-in-inventory` for large farms
- Add `drop-blacklist` for seeds you don't want
- Combine with `AUTO_SELL` for profit farming
- Use `FORTUNE` enchantment for more drops
- Consider `MENDING` for long farming sessions
