---
sidebar_position: 9
title: XP Boost
description: Multiply XP drops from mining
---

# XP Boost Effect

The `XP_BOOST` effect multiplies the XP dropped when mining blocks.

## Configuration

```yaml
effects:
  - type: XP_BOOST
    # Required: XP multiplier
    boost: 2.0

    # Optional: Chance to apply boost (0-100)
    chance-to-boost: -1  # -1 = always apply

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
| `boost` | Double | Yes | - | XP multiplier (must be >= 0) |
| `chance-to-boost` | Double | No | `-1` | Chance to apply (0-100, -1 = always) |
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability |

## XP Sources

The effect multiplies XP from mining blocks that drop XP:

| Block | Base XP |
|-------|---------|
| Coal Ore | 0-2 |
| Nether Gold Ore | 0-2 |
| Lapis Lazuli Ore | 2-5 |
| Diamond Ore | 3-7 |
| Emerald Ore | 3-7 |
| Redstone Ore | 1-5 |
| Ancient Debris | 2-6 |
| Spawner | 15-42 |

## Examples

### Double XP Pickaxe

```yaml
double_xp_pickaxe:
  material: DIAMOND_PICKAXE
  display-name: "<aqua>XP Miner</aqua>"
  lore:
    - ""
    - "<gray>Doubles XP from mining!</gray>"
    - ""
    - "<yellow>XP Boost: <white>2x</white></yellow>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3

  effects:
    - type: XP_BOOST
      boost: 2.0
```

### Triple XP with Chance

```yaml
lucky_pickaxe:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ffd700:#00ff00>Lucky Miner</gradient>"
  lore:
    - ""
    - "<gray>50% chance for triple XP!</gray>"
    - ""
    - "<yellow>XP Boost: <white>3x (50% chance)</white></yellow>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: XP_BOOST
      boost: 3.0
      chance-to-boost: 50
```

### Combined with Vein Mining

```yaml
xp_vein_miner:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#00ff00:#00aaff>XP Vein Miner</gradient>"
  lore:
    - ""
    - "<gray>Mine veins with bonus XP!</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- Vein Mining (32 blocks)</gray>"
    - "<gray>- XP Boost x3</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 10
    - enchantment: FORTUNE
      level: 5

  effects:
    - type: VEIN_MINING
      tags:
        - MINEABLE_PICKAXE
      block-limit: 32

    - type: XP_BOOST
      boost: 3.0
```

### Extreme XP for Spawners

```yaml
spawner_xp_pickaxe:
  material: NETHERITE_PICKAXE
  display-name: "<dark_purple>Spawner Slayer</dark_purple>"
  lore:
    - ""
    - "<gray>Massive XP from spawners!</gray>"
    - ""
    - "<yellow>XP Boost: <white>5x</white></yellow>"

  effects:
    - type: SILK_SPAWNER

    - type: XP_BOOST
      boost: 5.0
```

### XP Boost Rune

```yaml
xp_boost_rune:
  material: EXPERIENCE_BOTTLE
  display-name: "<green>XP Boost Rune</green>"
  lore:
    - ""
    - "<gray>Apply to a pickaxe for</gray>"
    - "<gray>double XP from mining.</gray>"

  effects:
    - type: XP_BOOST
      boost: 2.0

      applicable-tags:
        - PICKAXES

      representation:
        material: EXPERIENCE_BOTTLE
        display-name: "<green>XP Boost Rune</green>"
        lore:
          - ""
          - "<gray>Use in a smithing table</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

## Behavior

1. When a block is broken:
   - Checks if the block drops XP
   - If `chance-to-boost` is set, rolls for chance
   - Multiplies XP by `boost` value
   - XP is spawned at the block location

2. With multi-block effects:
   - When used with `VEIN_MINING` or `HAMMER`
   - XP from all blocks is collected and spawned at once

## Tips

- Use `boost: 2.0` for balanced gameplay
- Higher values (5x+) are very powerful for leveling
- Combine with `MENDING` enchantment for self-repair
- Use `chance-to-boost` for gambling-style mechanics
- Works great with spawner farms
