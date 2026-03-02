---
sidebar_position: 11
title: Infinite Bucket
description: Unlimited water and lava placement
---

# Infinite Bucket Effect

The `INFINITE_BUCKET` effect allows water and lava buckets to be used infinitely without consuming the liquid.

## Configuration

```yaml
effects:
  - type: INFINITE_BUCKET
    # No additional configuration required

    # Optional: Restrict which items can have this effect
    applicable-materials:
      - WATER_BUCKET
      - LAVA_BUCKET
    applicability-blacklisted: false
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability |

## Supported Buckets

| Bucket | Supported |
|--------|-----------|
| Water Bucket | Yes |
| Lava Bucket | Yes |
| Milk Bucket | No |
| Powder Snow Bucket | No |

:::note
Milk and Powder Snow buckets are excluded because they have special behaviors that don't work well with infinite use.
:::

## Events

The effect handles:
- `PlayerBucketEmptyEvent` - Placing liquids
- `PlayerBucketFillEvent` - Picking up liquids

## Behavior

1. **Placing liquid:**
   - Liquid is placed normally
   - Bucket is NOT converted to empty bucket
   - Can be placed repeatedly without refilling

2. **Picking up liquid:**
   - Liquid is removed from the world
   - Bucket remains as-is (not duplicated)

## Examples

### Infinite Water Bucket

```yaml
infinite_water:
  material: WATER_BUCKET
  display-name: "<gradient:#00bfff:#1e90ff>Endless Spring</gradient>"
  lore:
    - ""
    - "<gray>An infinite source of water!</gray>"
    - ""
    - "<aqua>Never runs dry</aqua>"

  effects:
    - type: INFINITE_BUCKET

  # Prevent stacking issues
  max-stack-size: 1
```

### Infinite Lava Bucket

```yaml
infinite_lava:
  material: LAVA_BUCKET
  display-name: "<gradient:#ff4500:#ff8c00>Eternal Flame</gradient>"
  lore:
    - ""
    - "<gray>An infinite source of lava!</gray>"
    - ""
    - "<red>Burns eternally</red>"

  effects:
    - type: INFINITE_BUCKET

  max-stack-size: 1
```

### Premium Infinite Bucket

```yaml
premium_bucket:
  material: WATER_BUCKET
  display-name: "<gradient:#ffd700:#ffaa00>Divine Waters</gradient>"
  lore:
    - ""
    - "<gray>Blessed by the gods,</gray>"
    - "<gray>this bucket never empties.</gray>"
    - ""
    - "<yellow>VIP Item</yellow>"

  effects:
    - type: INFINITE_BUCKET

  max-stack-size: 1
  custom-model-data: 5001

  recipe:
    type: SHAPED
    pattern:
      - "DED"
      - "DWD"
      - "DDD"
    ingredients:
      - item: DIAMOND
        sign: D
      - item: EMERALD
        sign: E
      - item: WATER_BUCKET
        sign: W
```

### Builder's Toolkit

```yaml
builders_water:
  material: WATER_BUCKET
  display-name: "<aqua>Builder's Water</aqua>"
  lore:
    - ""
    - "<gray>Perfect for construction!</gray>"
    - "<gray>Infinite water placement.</gray>"

  effects:
    - type: INFINITE_BUCKET

  max-stack-size: 1

builders_lava:
  material: LAVA_BUCKET
  display-name: "<red>Builder's Lava</red>"
  lore:
    - ""
    - "<gray>For controlled demolition!</gray>"
    - "<gray>Infinite lava placement.</gray>"

  effects:
    - type: INFINITE_BUCKET

  max-stack-size: 1
```

## Use Cases

1. **Building**: Infinite water for large builds, farms, elevators
2. **Farming**: Water source for crop irrigation
3. **Obsidian Farming**: Infinite lava for obsidian generation
4. **Decorations**: Water features, lava decorations
5. **Cobblestone Generators**: Infinite lava supply

## Tips

- Always set `max-stack-size: 1` to prevent stacking issues
- Consider making this a rare/expensive item
- Works well with building-focused servers
- Great for skyblock/oneblock gamemodes
- Can be restricted via permissions for balance
