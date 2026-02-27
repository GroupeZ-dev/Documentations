---
sidebar_position: 3
title: Hammer
description: Mine in a 3x3 (or larger) area
---

# Hammer Effect

The `HAMMER` effect allows players to mine multiple blocks in a configurable area (like 3x3x1) with a single block break. The area is determined by the face of the block being mined.

## Configuration

```yaml
effects:
  - type: HAMMER
    # Required: Blocks that can be mined with hammer
    materials:
      - STONE
      - COBBLESTONE
      - GRANITE
    # OR use tags
    tags:
      - MINEABLE_PICKAXE

    # Required: Mining dimensions
    width: 3     # Horizontal size (must be odd)
    height: 3    # Vertical size (must be odd)
    depth: 1     # Depth (blocks forward)

    # Optional: Damage to apply to the tool
    # -1 = damage per block mined (default)
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
| `materials` | List | Yes* | - | Specific blocks that can be mined |
| `tags` | List | Yes* | - | Block tags that can be mined |
| `width` | Integer | Yes | - | Horizontal width (odd number) |
| `height` | Integer | Yes | - | Vertical height (odd number) |
| `depth` | Integer | Yes | - | Depth forward |
| `damage` | Integer | No | `-1` | Tool damage (-1 = per block) |
| `blacklisted` | Boolean | No | `false` | Invert material/tag filter |
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags that can have this effect |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability filter |

*Either `materials` or `tags` must be provided.

## Area Calculation

The hammer effect mines blocks based on which face you're looking at:

| Looking At | Width | Height | Depth |
|------------|-------|--------|-------|
| North/South face | Left-Right | Up-Down | Forward |
| East/West face | Forward-Back | Up-Down | Left-Right |
| Top/Bottom face | Left-Right | Forward-Back | Up-Down |

For a 3x3x1 configuration:
- `width: 3` = 1 block left + center + 1 block right
- `height: 3` = 1 block up + center + 1 block down
- `depth: 1` = only the surface layer

## Examples

### Basic 3x3 Hammer

```yaml
hammer_3x3:
  material: DIAMOND_PICKAXE
  display-name: "<gray>Mining Hammer</gray>"
  lore:
    - ""
    - "<gray>Mines in a 3x3 area!</gray>"
    - ""
    - "<yellow>Area: <white>3x3x1</white></yellow>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: HAMMER
      tags:
        - MINEABLE_PICKAXE
      width: 3
      height: 3
      depth: 1
      damage: 1
```

### 5x5 Excavator

```yaml
excavator_5x5:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#888888:#444444>Excavator</gradient>"
  lore:
    - ""
    - "<gray>Massive 5x5 mining area!</gray>"
    - ""
    - "<yellow>Area: <white>5x5x1</white></yellow>"
    - ""
    - "<red>Warning: High durability cost!</red>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: UNBREAKING
      level: 5
    - enchantment: MENDING
      level: 1

  effects:
    - type: HAMMER
      tags:
        - MINEABLE_PICKAXE
      width: 5
      height: 5
      depth: 1
      damage: -1  # Damage per block

  custom-model-data: 2001
```

### Tunnel Bore (3x3x3)

```yaml
tunnel_bore:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ff6b6b:#feca57>Tunnel Bore</gradient>"
  lore:
    - ""
    - "<gray>Creates 3x3 tunnels!</gray>"
    - ""
    - "<yellow>Area: <white>3x3x3</white></yellow>"
    - "<gray>Mines 27 blocks at once</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 10
    - enchantment: UNBREAKING
      level: 5
    - enchantment: MENDING
      level: 1

  effects:
    - type: HAMMER
      tags:
        - MINEABLE_PICKAXE
      width: 3
      height: 3
      depth: 3
      damage: 5  # Fixed damage (less than 27)

  unbreakable: false
  max-damage: 10000
```

### Shovel Excavator

```yaml
shovel_excavator:
  material: NETHERITE_SHOVEL
  display-name: "<gradient:#daa520:#cd853f>Earth Mover</gradient>"
  lore:
    - ""
    - "<gray>Digs in a 3x3 area!</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: HAMMER
      tags:
        - MINEABLE_SHOVEL
      width: 3
      height: 3
      depth: 1
      damage: 1
```

### Hammer with Auto-Smelt

```yaml
smelting_hammer:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ff4500:#ff8c00>Smelting Hammer</gradient>"
  lore:
    - ""
    - "<gray>3x3 mining with auto-smelt!</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- 3x3 Area Mining</gray>"
    - "<gray>- Auto Smelt</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3
    - enchantment: UNBREAKING
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

### Hammer Rune (Applicable Item)

```yaml
hammer_rune:
  material: IRON_BLOCK
  display-name: "<gray>Hammer Rune</gray>"
  lore:
    - ""
    - "<gray>Apply to a pickaxe to add</gray>"
    - "<gray>3x3 mining capability.</gray>"

  effects:
    - type: HAMMER
      tags:
        - MINEABLE_PICKAXE
      width: 3
      height: 3
      depth: 1
      damage: 1

      applicable-tags:
        - PICKAXES

      representation:
        material: IRON_BLOCK
        display-name: "<gray>Hammer Rune</gray>"
        lore:
          - ""
          - "<gray>Use in a smithing table</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

## Behavior

1. When a player breaks a block:
   - The effect determines which face was hit
   - Calculates the mining area based on width/height/depth
   - Filters blocks by materials/tags configuration
   - Checks permissions for each block
   - Mines all valid blocks in the area
   - Applies tool damage based on configuration

2. The effect respects:
   - WorldGuard regions
   - Other protection plugins
   - Fortune/Silk Touch enchantments
   - Custom block providers

## Incompatibilities

`HAMMER` is incompatible with:
- `VEIN_MINING` - Both effects modify block breaking behavior

If both are applied, only one will function.

## Tips

- Always use odd numbers for width and height for centered mining
- Combine with `MELT_MINING` for auto-smelting
- Combine with `ABSORPTION` to send items to inventory
- Use `damage: 1` for balanced durability (one damage regardless of blocks)
- Use `damage: -1` for realistic durability (damage per block)
- Consider adding `MENDING` enchantment for sustainability
