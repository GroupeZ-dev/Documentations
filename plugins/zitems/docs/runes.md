---
sidebar_position: 5
title: Effects (Runes)
description: Add powerful abilities to items with effects
---

# Effects (Runes)

:::info Terminology Update
In the current version of zItems, **"Runes"** are now called **"Effects"**. This documentation uses both terms interchangeably, but the configuration uses `effects`.
:::

Effects are special abilities that can be applied to items in zItems. They provide unique mechanics that enhance gameplay, from mining entire ore veins to auto-selling drops.

## Quick Reference

| Effect | Description | Event |
|--------|-------------|-------|
| `VEIN_MINING` | Mine entire ore veins | Block Break |
| `HAMMER` | Mine in 3x3 (or larger) area | Block Break |
| `MELT_MINING` | Auto-smelt mined blocks | Block Break |
| `XP_BOOST` | Multiply XP drops | Block Break |
| `SILK_SPAWNER` | Pick up spawners | Block Break |
| `AUTO_SELL` | Automatically sell drops | Block Break / Kill |
| `ABSORPTION` | Items go to inventory | Block Break / Kill |
| `FARMING_HOE` | Area harvest and plant | Block Break / Interact |
| `SELL_STICK` | Sell container contents | Player Interact |
| `INFINITE_BUCKET` | Unlimited bucket uses | Bucket Events |
| `UNBREAKABLE` | Prevent durability loss | Always Active |
| `ENCHANTS_APPLICATOR` | Modify enchantments | On Application |
| `ATTRIBUTES_APPLICATOR` | Add/modify attributes | On Application |

## Adding Effects to Items

### In Item Configuration

```yaml
my_pickaxe:
  material: NETHERITE_PICKAXE
  display-name: "<gold>Super Pickaxe</gold>"

  effects:
    - type: VEIN_MINING
      tags:
        - MINEABLE_PICKAXE
      block-limit: 32
      damage: 1

    - type: MELT_MINING

    - type: XP_BOOST
      boost: 2.0
```

### Using Commands

Apply effects to items in-game:

```bash
/zitems applyeffect vein_mining
/zitems applyeffect melt_mining
/zitems applyeffect xp_boost
```

## Effect Configuration

Each effect has specific configuration options. Here's the general structure:

```yaml
effects:
  - type: EFFECT_TYPE
    # Effect-specific options here

    # Common options for all effects:
    applicable-materials:  # Restrict to specific items
      - DIAMOND_PICKAXE
      - NETHERITE_PICKAXE
    applicable-tags:  # Or use material tags
      - PICKAXES
    applicability-blacklisted: false  # Invert the filter
```

## Detailed Effect Documentation

For complete documentation on each effect:

- [Vein Mining](./effects/vein-mining) - Mine entire ore veins
- [Hammer](./effects/hammer) - 3x3 mining area
- [Farming Hoe](./effects/farming-hoe) - Area harvest and plant
- [Auto Sell](./effects/auto-sell) - Automatic drop selling
- [Melt Mining](./effects/melt-mining) - Auto-smelt drops
- [Sell Stick](./effects/sell-stick) - Container selling
- [Silk Spawner](./effects/silk-spawner) - Pick up spawners
- [XP Boost](./effects/xp-boost) - Multiply XP drops

See [Effects Overview](./effects/overview) for the complete reference.

## Effect Stacking

Multiple effects can be applied to the same item:

```yaml
effects:
  - type: VEIN_MINING
    block-limit: 32

  - type: MELT_MINING

  - type: XP_BOOST
    boost: 2.0

  - type: AUTO_SELL
    multiplier: 1.5
```

:::warning Incompatibilities
Some effects cannot be combined:
- `VEIN_MINING` + `HAMMER` - Both modify block breaking
- `AUTO_SELL` + `ABSORPTION` - Both process drops differently
:::

## Effect Items (Runes)

Effects can be represented as physical items that players can apply:

```yaml
vein_mining_effect:
  material: EMERALD
  display-name: "<green>Vein Mining Rune</green>"

  effects:
    - type: VEIN_MINING
      block-limit: 32

      # Physical representation
      representation:
        material: EMERALD
        display-name: "<green>Vein Mining Rune</green>"
        lore:
          - "<gray>Apply at smithing table</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

Players can then:
1. Obtain the rune item
2. Place it in a smithing table with their tool
3. Apply the effect to their tool

## Controlling Effect Access

### Item-Level Control

```yaml
my_item:
  # Allow adding more effects
  allow-additional-effects: true

  # Disable specific effects
  disabled-effects:
    - AUTO_SELL
    - VEIN_MINING

  # Show effects in lore
  base-effects-visible: true
  additional-effects-visible: true

  # Limit displayed effects
  nb-effects-view: 3
```

### Permission Control

```bash
# Allow specific effects
/lp user Steve permission set zitems.effect.vein_mining true

# Allow all effects
/lp group vip permission set zitems.effect.* true
```

## Legacy Migration

If you have old configurations using `runes:`, update them to use `effects:`:

**Old format:**
```yaml
runes:
  - vein_mining
  - melt_mining
```

**New format:**
```yaml
effects:
  - type: VEIN_MINING
    block-limit: 32

  - type: MELT_MINING
```

## Next Steps

- [Effects Overview](./effects/overview) - Complete effect reference
- [Item Configuration](./configurations/items) - Full item options
- [Commands Reference](./commands-permissions) - All commands
