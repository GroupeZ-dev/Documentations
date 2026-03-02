---
sidebar_position: 10
title: Absorption
description: Send dropped items directly to inventory
---

# Absorption Effect

The `ABSORPTION` effect sends all dropped items directly to the player's inventory instead of dropping them on the ground.

## Configuration

```yaml
effects:
  - type: ABSORPTION
    # No additional configuration required

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
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability |

## Events

The absorption effect triggers on:
- `BlockBreakEvent` - Mining blocks
- `BlockDropItemEvent` - Block drops
- `EntityDropItemEvent` - Entity drops (mob kills)

## Behavior

1. When items would drop:
   - Items are added to the player's inventory
   - Items that don't fit drop normally
   - Works with Fortune, Looting, etc.

2. Overflow handling:
   - If inventory is full, items drop at the player's location
   - Partial stacks are split (what fits goes to inventory)

## Examples

### Basic Absorption Pickaxe

```yaml
magnet_pickaxe:
  material: DIAMOND_PICKAXE
  display-name: "<gradient:#ff69b4:#da70d6>Magnet Pick</gradient>"
  lore:
    - ""
    - "<gray>Items go directly to</gray>"
    - "<gray>your inventory!</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3

  effects:
    - type: ABSORPTION
```

### Combined with Vein Mining

```yaml
vein_magnet:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#00ff00:#00aaff>Vein Magnet</gradient>"
  lore:
    - ""
    - "<gray>Mine veins directly to inventory!</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- Vein Mining (32 blocks)</gray>"
    - "<gray>- Items to Inventory</gray>"

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

    - type: ABSORPTION
```

### Absorption Sword (Mob Drops)

```yaml
looter_sword:
  material: NETHERITE_SWORD
  display-name: "<gradient:#ffd700:#ff8c00>Looter's Blade</gradient>"
  lore:
    - ""
    - "<gray>Mob drops go to inventory!</gray>"
    - ""
    - "<yellow>Looting: <white>V</white></yellow>"

  enchantments:
    - enchantment: SHARPNESS
      level: 5
    - enchantment: LOOTING
      level: 5
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: ABSORPTION
```

### Absorption Rune

```yaml
absorption_rune:
  material: ENDER_PEARL
  display-name: "<light_purple>Absorption Rune</light_purple>"
  lore:
    - ""
    - "<gray>Apply to any tool to send</gray>"
    - "<gray>drops to your inventory.</gray>"

  effects:
    - type: ABSORPTION

      applicable-tags:
        - PICKAXES
        - SHOVELS
        - AXES
        - HOES
        - SWORDS

      representation:
        material: ENDER_PEARL
        display-name: "<light_purple>Absorption Rune</light_purple>"
        lore:
          - ""
          - "<gray>Use in a smithing table</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

## Incompatibilities

`ABSORPTION` is incompatible with:
- `AUTO_SELL` - Both effects process drops differently

If both are applied, only one will function.

## Processing Order

```
Block Break / Entity Death
    ↓
VEIN_MINING / HAMMER (collect blocks)
    ↓
MELT_MINING (smelt drops)
    ↓
ABSORPTION (items to inventory) ← Priority: -1
```

The absorption effect has priority `-1`, meaning it processes last (after smelting but would conflict with auto-sell).

## Tips

- Great for mining operations to reduce pickup time
- Combine with large inventory or backpack plugins
- Works perfectly with `VEIN_MINING` for efficient mining
- Use on swords for mob grinding without item pickup
- Consider not using with `MELT_MINING` if you want to keep raw ores
