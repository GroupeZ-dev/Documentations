---
sidebar_position: 12
title: Unbreakable
description: Make items indestructible
---

# Unbreakable Effect

The `UNBREAKABLE` effect makes items completely immune to durability loss. The item will never break, regardless of use.

## Configuration

```yaml
effects:
  - type: UNBREAKABLE
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

1. **Applied on Item Creation:**
   - Effect is applied when the item is created or given
   - Sets the item's unbreakable flag to `true`
   - Works on all item types that have durability

2. **No Event Required:**
   - This is a "NoEventEffectHandler" - it applies once when the item is created
   - No ongoing event processing needed

## Examples

### Unbreakable Pickaxe

```yaml
eternal_pickaxe:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ffd700:#ff8c00>Eternal Pickaxe</gradient>"
  lore:
    - ""
    - "<gray>A pickaxe that will never break.</gray>"
    - ""
    - "<yellow>Unbreakable</yellow>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 10
    - enchantment: FORTUNE
      level: 5

  effects:
    - type: UNBREAKABLE
```

### Unbreakable Sword

```yaml
immortal_blade:
  material: NETHERITE_SWORD
  display-name: "<gradient:#ff4500:#ff0000>Immortal Blade</gradient>"
  lore:
    - ""
    - "<gray>Forged in eternal flames,</gray>"
    - "<gray>this blade will never shatter.</gray>"
    - ""
    - "<red>Indestructible</red>"

  enchantments:
    - enchantment: SHARPNESS
      level: 7
    - enchantment: FIRE_ASPECT
      level: 2
    - enchantment: LOOTING
      level: 3

  effects:
    - type: UNBREAKABLE
```

### Unbreakable Armor Set

```yaml
eternal_helmet:
  material: NETHERITE_HELMET
  display-name: "<gradient:#4169e1:#1e90ff>Eternal Helmet</gradient>"
  lore:
    - ""
    - "<gray>Part of the Eternal Set</gray>"
    - "<blue>Unbreakable</blue>"

  enchantments:
    - enchantment: PROTECTION
      level: 5

  effects:
    - type: UNBREAKABLE

eternal_chestplate:
  material: NETHERITE_CHESTPLATE
  display-name: "<gradient:#4169e1:#1e90ff>Eternal Chestplate</gradient>"
  lore:
    - ""
    - "<gray>Part of the Eternal Set</gray>"
    - "<blue>Unbreakable</blue>"

  enchantments:
    - enchantment: PROTECTION
      level: 5

  effects:
    - type: UNBREAKABLE

eternal_leggings:
  material: NETHERITE_LEGGINGS
  display-name: "<gradient:#4169e1:#1e90ff>Eternal Leggings</gradient>"
  lore:
    - ""
    - "<gray>Part of the Eternal Set</gray>"
    - "<blue>Unbreakable</blue>"

  enchantments:
    - enchantment: PROTECTION
      level: 5

  effects:
    - type: UNBREAKABLE

eternal_boots:
  material: NETHERITE_BOOTS
  display-name: "<gradient:#4169e1:#1e90ff>Eternal Boots</gradient>"
  lore:
    - ""
    - "<gray>Part of the Eternal Set</gray>"
    - "<blue>Unbreakable</blue>"

  enchantments:
    - enchantment: PROTECTION
      level: 5

  effects:
    - type: UNBREAKABLE
```

### Unbreakable Rune

```yaml
unbreakable_rune:
  material: OBSIDIAN
  display-name: "<gradient:#696969:#2f4f4f>Unbreakable Rune</gradient>"
  lore:
    - ""
    - "<gray>Apply to any tool or armor</gray>"
    - "<gray>to make it indestructible.</gray>"
    - ""
    - "<dark_gray>Eternal durability</dark_gray>"

  effects:
    - type: UNBREAKABLE

      applicable-tags:
        - PICKAXES
        - SHOVELS
        - AXES
        - HOES
        - SWORDS

      representation:
        material: OBSIDIAN
        display-name: "<gradient:#696969:#2f4f4f>Unbreakable Rune</gradient>"
        lore:
          - ""
          - "<gray>Use in a smithing table</gray>"
          - "<gray>to make an item unbreakable.</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Combined with Other Effects

```yaml
ultimate_tool:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ff6b6b:#feca57>Ultimate Mining Tool</gradient>"
  lore:
    - ""
    - "<gray>The perfect mining companion.</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- Vein Mining (64 blocks)</gray>"
    - "<gray>- Auto Smelt</gray>"
    - "<gray>- Unbreakable</gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 10
    - enchantment: FORTUNE
      level: 5

  effects:
    - type: VEIN_MINING
      tags:
        - MINEABLE_PICKAXE
      block-limit: 64

    - type: MELT_MINING

    - type: UNBREAKABLE
```

## Use Cases

1. **Premium Items**: High-value items that never need repair
2. **Event Rewards**: Special items for server events
3. **VIP Perks**: Exclusive items for donators
4. **Admin Tools**: Staff items that never break
5. **Quest Rewards**: Permanent quest completion items

## Difference from Native Unbreakable

You can also set `unbreakable: true` directly in the item configuration:

```yaml
# Using item property (recommended for simple cases)
simple_item:
  material: DIAMOND_PICKAXE
  unbreakable: true

# Using effect (useful for runes/applicators)
rune_item:
  material: ENDER_PEARL
  effects:
    - type: UNBREAKABLE
      representation:
        # Can be applied to other items
```

The effect is primarily useful when you want to create a **rune** that players can apply to their own items via the Smithing Table.

## Tips

- Use the native `unbreakable: true` property for simple unbreakable items
- Use the UNBREAKABLE effect when creating runes/applicators
- Consider hiding the "Unbreakable" line with item flags: `flags: [HIDE_UNBREAKABLE]`
- Works well with expensive crafting recipes for balance
- Great for progression systems where players earn permanent tools
