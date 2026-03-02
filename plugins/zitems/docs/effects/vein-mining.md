---
sidebar_position: 2
title: Vein Mining
description: Mine entire ore veins at once
---

# Vein Mining Effect

The `VEIN_MINING` effect allows players to mine entire ore veins (connected blocks of the same type) with a single block break.

## Configuration

```yaml
effects:
  - type: VEIN_MINING
    # Required: Blocks that can be vein mined
    materials:
      - COAL_ORE
      - IRON_ORE
      - DIAMOND_ORE
    # OR use tags
    tags:
      - COAL_ORES
      - IRON_ORES
      - DIAMOND_ORES

    # Required: Maximum blocks to mine in one vein
    block-limit: 32

    # Optional: Damage to apply to the tool
    # -1 = damage per block mined (default)
    # Other value = fixed damage amount
    damage: -1

    # Optional: Blacklist mode for materials/tags
    blacklisted: false

    # Optional: Restrict which items can have this effect
    applicable-materials:
      - DIAMOND_PICKAXE
      - NETHERITE_PICKAXE
    applicable-tags:
      - PICKAXES
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `materials` | List | Yes* | - | Specific blocks that can be vein mined |
| `tags` | List | Yes* | - | Block tags that can be vein mined |
| `block-limit` | Integer | Yes | - | Maximum blocks per vein operation |
| `damage` | Integer | No | `-1` | Tool damage (-1 = per block) |
| `blacklisted` | Boolean | No | `false` | Invert material/tag filter |
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags that can have this effect |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability filter |

*Either `materials` or `tags` must be provided.

## Block Tags

Common block tags for mining:

| Tag | Description |
|-----|-------------|
| `COAL_ORES` | Coal ore and deepslate variant |
| `IRON_ORES` | Iron ore and deepslate variant |
| `COPPER_ORES` | Copper ore and deepslate variant |
| `GOLD_ORES` | Gold ore and deepslate/nether variants |
| `REDSTONE_ORES` | Redstone ore and deepslate variant |
| `EMERALD_ORES` | Emerald ore and deepslate variant |
| `LAPIS_ORES` | Lapis ore and deepslate variant |
| `DIAMOND_ORES` | Diamond ore and deepslate variant |
| `MINEABLE_PICKAXE` | All pickaxe-mineable blocks |

## Examples

### Basic Vein Mining Pickaxe

```yaml
vein_pickaxe:
  material: DIAMOND_PICKAXE
  display-name: "<green>Vein Miner</green>"
  lore:
    - ""
    - "<gray>Mines connected ores!</gray>"
    - "<gray>Max: <white>16 blocks</white></gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3

  effects:
    - type: VEIN_MINING
      tags:
        - COAL_ORES
        - IRON_ORES
        - COPPER_ORES
        - GOLD_ORES
        - REDSTONE_ORES
        - EMERALD_ORES
        - LAPIS_ORES
        - DIAMOND_ORES
      block-limit: 16
      damage: 1
```

### Advanced Vein Miner with All Features

```yaml
ultimate_vein_miner:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#00ff00:#00aa00>Ultimate Vein Miner</gradient>"
  lore:
    - ""
    - "<gray>The ultimate mining tool!</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- Vein Mining: <white>64 blocks</white></gray>"
    - "<gray>- Auto Smelt</gray>"
    - "<gray>- XP Boost x2</gray>"

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
    - type: VEIN_MINING
      tags:
        - MINEABLE_PICKAXE
      block-limit: 64
      damage: -1  # Damage per block mined

    - type: MELT_MINING

    - type: XP_BOOST
      boost: 2.0
```

### Vein Mining Rune (Applicable Item)

```yaml
vein_mining_rune:
  material: EMERALD
  display-name: "<green>Vein Mining Rune</green>"
  lore:
    - ""
    - "<gray>Apply to a pickaxe at</gray>"
    - "<gray>a smithing table to add</gray>"
    - "<gray>the vein mining ability.</gray>"
    - ""
    - "<yellow>Configuration:</yellow>"
    - "<gray>- Max blocks: <white>32</white></gray>"

  effects:
    - type: VEIN_MINING
      tags:
        - COAL_ORES
        - IRON_ORES
        - COPPER_ORES
        - GOLD_ORES
        - REDSTONE_ORES
        - EMERALD_ORES
        - LAPIS_ORES
        - DIAMOND_ORES
      block-limit: 32
      damage: 1

      # This effect can only be applied to pickaxes
      applicable-tags:
        - PICKAXES

      # Physical representation of the effect
      representation:
        material: EMERALD
        display-name: "<green>Vein Mining Rune</green>"
        lore:
          - ""
          - "<gray>Use in a smithing table</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Specific Ore Vein Miner

```yaml
diamond_vein_miner:
  material: DIAMOND_PICKAXE
  display-name: "<aqua>Diamond Specialist</aqua>"
  lore:
    - ""
    - "<gray>Only mines diamond veins</gray>"
    - "<gray>but finds more diamonds!</gray>"

  enchantments:
    - enchantment: FORTUNE
      level: 5

  effects:
    - type: VEIN_MINING
      materials:
        - DIAMOND_ORE
        - DEEPSLATE_DIAMOND_ORE
      block-limit: 16
      damage: 1
```

## Behavior

1. When a player breaks a block that matches the materials/tags filter:
   - The effect finds all connected blocks of the same type
   - Up to `block-limit` blocks are collected
   - Each block checks if the player has permission to break it
   - Drops are collected and can be processed by other effects (Auto-Sell, Melt Mining)
   - Tool damage is applied based on the `damage` setting

2. The effect respects:
   - WorldGuard regions
   - Other protection plugins
   - Fortune enchantment
   - Custom block providers (ItemsAdder, Oraxen, etc.)

## Incompatibilities

`VEIN_MINING` is incompatible with:
- `HAMMER` - Both effects modify block breaking behavior

If both are applied, only one will function.

## Tips

- Use a reasonable `block-limit` (16-64) to prevent lag
- Combine with `MELT_MINING` for auto-smelting
- Combine with `AUTO_SELL` for automatic selling
- Use `damage: -1` for balanced durability usage
- Use `damage: 1` for more durability-friendly mining
