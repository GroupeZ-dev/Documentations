---
sidebar_position: 1
title: Effects Overview
description: Complete guide to all effects in zItems
---

# Effects Overview

Effects are powerful abilities that can be added to items. They trigger on specific events like breaking blocks, killing mobs, or interacting with the world.

## How Effects Work

Effects are added to items in two ways:

1. **Built-in**: Defined in the item configuration
2. **Applied**: Added by players via Smithing Table or Applicator GUI

Effects are processed based on priority - lower priority numbers execute first.

## Effect Configuration

All effects share common configuration options:

```yaml
effects:
  - type: EFFECT_TYPE
    # Common options (optional)
    applicable-materials:    # Materials this effect can be applied to
      - DIAMOND_PICKAXE
      - NETHERITE_PICKAXE
    applicable-tags:          # Material tags this effect can be applied to
      - PICKAXES
    applicability-blacklisted: false  # If true, inverts the filter
```

## Available Effects

| Effect | Event | Description |
|--------|-------|-------------|
| [VEIN_MINING](./vein-mining) | Block Break | Mine entire ore veins |
| [HAMMER](./hammer) | Block Break | Mine in 3x3 (or larger) area |
| [MELT_MINING](./melt-mining) | Block Break | Auto-smelt mined blocks |
| [XP_BOOST](./xp-boost) | Block Break | Multiply XP drops |
| [SILK_SPAWNER](./silk-spawner) | Block Break | Pick up spawners |
| [AUTO_SELL](./auto-sell) | Block Break / Entity Death | Auto-sell drops |
| [ABSORPTION](./absorption) | Block Break / Entity Death | Items go to inventory |
| [FARMING_HOE](./farming-hoe) | Block Break / Interact | Area harvest and plant |
| [SELL_STICK](./sell-stick) | Player Interact | Sell container contents |
| [INFINITE_BUCKET](./infinite-bucket) | Bucket Events | Unlimited bucket uses |
| [UNBREAKABLE](./unbreakable) | - | Prevent durability loss |
| [ENCHANTS_APPLICATOR](./enchants-applicator) | - | Modify enchantments |
| [ATTRIBUTES_APPLICATOR](./attributes-applicator) | - | Add/modify attributes |

## Effect Representation

Effects can have a physical item representation that players can obtain and apply:

```yaml
effects:
  - type: VEIN_MINING
    block-limit: 32

    # Effect representation (item form)
    representation:
      material: EMERALD
      display-name: "<green>Vein Mining Rune</green>"
      lore:
        - ""
        - "<gray>Apply to a pickaxe</gray>"
        - "<gray>at a smithing table</gray>"

      # How the effect is applied
      applicator-type: SMITHING_TABLE  # or ZITEMS_APPLICATOR

      # For SMITHING_TABLE
      template:
        item: NETHERITE_UPGRADE_SMITHING_TEMPLATE

      # For ZITEMS_APPLICATOR
      ingredients:
        - item: DIAMOND
        - item: EMERALD
```

### Applicator Types

| Type | Description |
|------|-------------|
| `SMITHING_TABLE` | Apply via vanilla smithing table |
| `ZITEMS_APPLICATOR` | Apply via custom zItems GUI |

## Effect Incompatibilities

Some effects are incompatible with each other:

| Effect | Incompatible With |
|--------|-------------------|
| `VEIN_MINING` | `HAMMER` |
| `HAMMER` | `VEIN_MINING` |
| `AUTO_SELL` | `ABSORPTION` |
| `ABSORPTION` | `AUTO_SELL` |

If you try to add an incompatible effect, it will be rejected.

## Material Filters

Effects can be restricted to specific item types:

```yaml
effects:
  - type: VEIN_MINING
    # Only these materials can have this effect
    applicable-materials:
      - DIAMOND_PICKAXE
      - NETHERITE_PICKAXE
      - GOLDEN_PICKAXE
      - IRON_PICKAXE

  - type: HAMMER
    # Use tags for groups of items
    applicable-tags:
      - PICKAXES
      - SHOVELS

  - type: AUTO_SELL
    # Blacklist mode - effect works on everything EXCEPT these
    applicable-materials:
      - WOODEN_SWORD
    applicability-blacklisted: true
```

## Complete Example

```yaml
# A pickaxe with multiple effects
ultimate_pickaxe:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ff6b6b:#feca57>Ultimate Pickaxe</gradient>"
  lore:
    - ""
    - "<gray>The most powerful mining tool</gray>"
    - ""
    - "<yellow>Effects:</yellow>"
    - "<gray>- Vein Mining (64 blocks)</gray>"
    - "<gray>- Auto Smelt</gray>"
    - "<gray>- XP Boost x3</gray>"
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
    # Mine entire veins
    - type: VEIN_MINING
      tags:
        - MINEABLE_PICKAXE
      block-limit: 64
      damage: 1

    # Auto-smelt drops
    - type: MELT_MINING

    # Triple XP
    - type: XP_BOOST
      boost: 3.0
      chance-to-boost: 100

    # Sell drops automatically
    - type: AUTO_SELL
      multiplier: 1.0

  # Don't allow more effects
  allow-additional-effects: false
```

## Next Steps

Explore each effect in detail:

- [Vein Mining](./vein-mining) - Mine ore veins
- [Hammer](./hammer) - 3x3 mining
- [Farming Hoe](./farming-hoe) - Area farming
- [Auto Sell](./auto-sell) - Automatic selling
- [And more...](./melt-mining)
