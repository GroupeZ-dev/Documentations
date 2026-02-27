---
sidebar_position: 6
title: Melt Mining
description: Automatically smelt mined blocks
---

# Melt Mining Effect

The `MELT_MINING` effect automatically smelts mined blocks, converting raw ores to ingots and other items to their smelted forms.

## Configuration

```yaml
effects:
  - type: MELT_MINING
    # No additional configuration required

    # Optional: Restrict which items can have this effect
    applicable-materials:
      - DIAMOND_PICKAXE
      - NETHERITE_PICKAXE
    applicable-tags:
      - PICKAXES
    applicability-blacklisted: false
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability |

## Smelting Results

The effect uses vanilla furnace recipes to determine outputs:

| Block | Normal Drop | Smelted Drop |
|-------|-------------|--------------|
| Iron Ore | Raw Iron | Iron Ingot |
| Gold Ore | Raw Gold | Gold Ingot |
| Copper Ore | Raw Copper | Copper Ingot |
| Ancient Debris | Ancient Debris | Netherite Scrap |
| Sand | Sand | Glass |
| Cobblestone | Cobblestone | Stone |
| Stone | Stone | Smooth Stone |
| Clay | Clay Ball | Brick |
| Netherrack | Netherrack | Nether Brick |
| Cactus | Cactus | Green Dye |
| Wet Sponge | Wet Sponge | Sponge |
| Kelp | Kelp | Dried Kelp |

:::info Fortune Compatibility
The effect works with Fortune enchantment. If Fortune gives you 3 raw iron, you get 3 iron ingots.
:::

## Visual Effect

When blocks are smelted, flame particles appear at the block location to indicate the auto-smelt occurred.

## Examples

### Basic Auto-Smelt Pickaxe

```yaml
smelting_pickaxe:
  material: DIAMOND_PICKAXE
  display-name: "<gradient:#ff4500:#ff8c00>Smelting Pick</gradient>"
  lore:
    - ""
    - "<gray>Automatically smelts ores!</gray>"
    - ""
    - "<yellow>Iron Ore → Iron Ingot</yellow>"
    - "<yellow>Gold Ore → Gold Ingot</yellow>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: MELT_MINING
```

### Combined with Vein Mining

```yaml
vein_smelter:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ff6b6b:#ff8c00>Vein Smelter</gradient>"
  lore:
    - ""
    - "<gray>Mine veins AND auto-smelt!</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- Vein Mining (32 blocks)</gray>"
    - "<gray>- Auto Smelt</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: VEIN_MINING
      tags:
        - IRON_ORES
        - GOLD_ORES
        - COPPER_ORES
      block-limit: 32
      damage: 1

    - type: MELT_MINING
```

### Combined with Hammer

```yaml
smelting_hammer:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#888888:#ff4500>Forge Hammer</gradient>"
  lore:
    - ""
    - "<gray>3x3 mining with auto-smelt!</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3

  effects:
    - type: HAMMER
      tags:
        - MINEABLE_PICKAXE
      width: 3
      height: 3
      depth: 1
      damage: 1

    - type: MELT_MINING
```

### Ultimate Mining Tool

```yaml
ultimate_miner:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ff0000:#ffd700>Infernal Miner</gradient>"
  lore:
    - ""
    - "<gray>The ultimate mining experience!</gray>"
    - ""
    - "<yellow>Effects:</yellow>"
    - "<gray>- Vein Mining (64 blocks)</gray>"
    - "<gray>- Auto Smelt</gray>"
    - "<gray>- XP Boost (x3)</gray>"
    - "<gray>- Auto Sell</gray>"

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

    - type: MELT_MINING

    - type: XP_BOOST
      boost: 3.0

    - type: AUTO_SELL
      multiplier: 1.0
```

### Auto-Smelt Rune

```yaml
smelt_rune:
  material: LAVA_BUCKET
  display-name: "<gradient:#ff4500:#ff8c00>Smelting Rune</gradient>"
  lore:
    - ""
    - "<gray>Apply to a pickaxe to add</gray>"
    - "<gray>auto-smelting capability.</gray>"

  effects:
    - type: MELT_MINING

      applicable-tags:
        - PICKAXES

      representation:
        material: LAVA_BUCKET
        display-name: "<gradient:#ff4500:#ff8c00>Smelting Rune</gradient>"
        lore:
          - ""
          - "<gray>Use in a smithing table</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

## Behavior

1. When a block is mined:
   - The effect checks if the drop has a furnace recipe
   - If yes, the drop is replaced with the smelted result
   - Flame particles appear at the block location
   - XP from smelting is added to the drop event

2. Works with other effects:
   - Processes after `VEIN_MINING` / `HAMMER` collect blocks
   - Processes before `AUTO_SELL` sells items
   - Fortune applies to the raw drops, then they're smelted

## Processing Order

```
Block Break
    ↓
VEIN_MINING / HAMMER (collect blocks)
    ↓
MELT_MINING (smelt drops)
    ↓
AUTO_SELL (sell drops)
    ↓
ABSORPTION (items to inventory)
```

## Tips

- Combine with `FORTUNE` for maximum ingot output
- Use with `VEIN_MINING` for efficient ore processing
- Combine with `AUTO_SELL` to sell ingots automatically
- Remember: Silk Touch prevents the effect (no drops to smelt)
- Works on any block with a furnace recipe (sand→glass, etc.)
