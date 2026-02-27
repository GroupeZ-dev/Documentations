---
sidebar_position: 8
title: Silk Spawner
description: Pick up spawners with silk touch
---

# Silk Spawner Effect

The `SILK_SPAWNER` effect allows players to pick up mob spawners when mining them. The spawner retains its mob type when placed back down.

## Configuration

```yaml
effects:
  - type: SILK_SPAWNER
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

## Behavior

1. When a spawner is broken with this effect:
   - The spawner drops as an item
   - The mob type is preserved in the item
   - When placed, it spawns the same mob type

2. Works with other effects:
   - Compatible with `VEIN_MINING` (if spawners are in the vein)
   - Compatible with `HAMMER` (all spawners in area drop)

## Events

The effect fires a custom `SpawnerDropEvent` that other plugins can listen to:
- Can be cancelled by other plugins
- Contains the spawner item and location

## Examples

### Basic Silk Spawner Pickaxe

```yaml
silk_spawner_pickaxe:
  material: DIAMOND_PICKAXE
  display-name: "<dark_purple>Spawner Collector</dark_purple>"
  lore:
    - ""
    - "<gray>Allows you to pick up</gray>"
    - "<gray>mob spawners!</gray>"

  enchantments:
    - enchantment: SILK_TOUCH
      level: 1
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: SILK_SPAWNER
```

### Advanced Spawner Pickaxe

```yaml
spawner_master:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#9932cc:#da70d6>Spawner Master</gradient>"
  lore:
    - ""
    - "<gray>The ultimate spawner tool!</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- Silk Touch Spawners</gray>"
    - "<gray>- 3x XP from Spawners</gray>"

  enchantments:
    - enchantment: SILK_TOUCH
      level: 1
    - enchantment: EFFICIENCY
      level: 10
    - enchantment: UNBREAKING
      level: 5
    - enchantment: MENDING
      level: 1

  effects:
    - type: SILK_SPAWNER

    - type: XP_BOOST
      boost: 3.0
```

### Combined with Vein Mining

```yaml
dungeon_pickaxe:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ff6b6b:#9932cc>Dungeon Raider</gradient>"
  lore:
    - ""
    - "<gray>Perfect for dungeon clearing!</gray>"
    - ""
    - "<yellow>Effects:</yellow>"
    - "<gray>- Vein Mining</gray>"
    - "<gray>- Silk Spawners</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 10
    - enchantment: UNBREAKING
      level: 5

  effects:
    - type: VEIN_MINING
      tags:
        - MINEABLE_PICKAXE
      block-limit: 64

    - type: SILK_SPAWNER
```

### Silk Spawner Rune

```yaml
silk_spawner_rune:
  material: SPAWNER
  display-name: "<dark_purple>Spawner Rune</dark_purple>"
  lore:
    - ""
    - "<gray>Apply to a pickaxe to</gray>"
    - "<gray>pick up spawners.</gray>"

  effects:
    - type: SILK_SPAWNER

      applicable-tags:
        - PICKAXES

      representation:
        material: SPAWNER
        display-name: "<dark_purple>Spawner Rune</dark_purple>"
        lore:
          - ""
          - "<gray>Use in a smithing table</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

## Tips

- Combine with `XP_BOOST` for extra XP from breaking spawners
- Does NOT require Silk Touch enchantment (but you can add it for aesthetics)
- Spawners are valuable - consider adding durability cost
- Works in mob grinder setups for spawner collection
