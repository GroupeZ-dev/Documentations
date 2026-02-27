---
sidebar_position: 13
title: Enchants Applicator
description: Modify enchantments on items
---

# Enchants Applicator Effect

The `ENCHANTS_APPLICATOR` effect allows you to create items that add or remove enchantments from other items. This is perfect for creating enchantment books, upgrade scrolls, or enchantment modification runes.

## Configuration

```yaml
effects:
  - type: ENCHANTS_APPLICATOR
    enchantments:
      - enchantment: SHARPNESS
        evolution: INCREASE
        level: 5
      - enchantment: UNBREAKING
        evolution: INCREASE
        level: 3

    # Optional: Restrict which items can have this effect
    applicable-materials:
      - DIAMOND_SWORD
      - NETHERITE_SWORD
    applicable-tags:
      - SWORDS
    applicability-blacklisted: false
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `enchantments` | List | Yes | - | List of enchantment modifications |
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability |

### Enchantment Parameters

Each enchantment entry supports:

| Parameter | Type | Required | Values | Description |
|-----------|------|----------|--------|-------------|
| `enchantment` | String | Yes | Any enchantment | The enchantment to modify |
| `evolution` | Enum | Yes | `INCREASE`, `DECREASE` | Add or remove levels |
| `level` | Integer | Yes | Any | Number of levels to add/remove |

## Evolution Types

| Type | Description |
|------|-------------|
| `INCREASE` | Add the specified number of levels |
| `DECREASE` | Remove the specified number of levels |

## Behavior

1. **Application Check:**
   - Verifies target item has the enchantment (for modifications)
   - Validates that resulting level won't be negative
   - If validation fails, no changes are made

2. **Level Modification:**
   - `INCREASE`: Adds levels to existing enchantment
   - `DECREASE`: Removes levels from existing enchantment
   - If resulting level is 0, enchantment is removed

## Examples

### Sharpness Upgrade Scroll

```yaml
sharpness_scroll:
  material: PAPER
  display-name: "<gradient:#ff4500:#ffd700>Sharpness Scroll</gradient>"
  lore:
    - ""
    - "<gray>Increases Sharpness by 5 levels!</gray>"
    - ""
    - "<yellow>Apply to:</yellow>"
    - "<gray>- Any sword with Sharpness</gray>"
    - ""
    - "<gold>Use in a smithing table</gold>"

  custom-model-data: 1001

  effects:
    - type: ENCHANTS_APPLICATOR
      enchantments:
        - enchantment: SHARPNESS
          evolution: INCREASE
          level: 5

      applicable-tags:
        - SWORDS

      representation:
        material: PAPER
        display-name: "<gradient:#ff4500:#ffd700>Sharpness Scroll</gradient>"
        lore:
          - ""
          - "<gray>+5 Sharpness Levels</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Multi-Enchant Upgrade Book

```yaml
warrior_blessing:
  material: ENCHANTED_BOOK
  display-name: "<gradient:#ff0000:#8b0000>Warrior's Blessing</gradient>"
  lore:
    - ""
    - "<gray>A powerful blessing that</gray>"
    - "<gray>enhances combat enchantments.</gray>"
    - ""
    - "<yellow>Enchantments:</yellow>"
    - "<gray>+3 Sharpness</gray>"
    - "<gray>+2 Fire Aspect</gray>"
    - "<gray>+1 Looting</gray>"

  glow: true

  effects:
    - type: ENCHANTS_APPLICATOR
      enchantments:
        - enchantment: SHARPNESS
          evolution: INCREASE
          level: 3
        - enchantment: FIRE_ASPECT
          evolution: INCREASE
          level: 2
        - enchantment: LOOTING
          evolution: INCREASE
          level: 1

      applicable-tags:
        - SWORDS

      representation:
        material: ENCHANTED_BOOK
        display-name: "<gradient:#ff0000:#8b0000>Warrior's Blessing</gradient>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Efficiency Boost Rune

```yaml
efficiency_rune:
  material: EMERALD
  display-name: "<gradient:#00ff00:#00aa00>Efficiency Rune</gradient>"
  lore:
    - ""
    - "<gray>Boosts mining efficiency!</gray>"
    - ""
    - "<green>+10 Efficiency</green>"
    - "<green>+3 Unbreaking</green>"

  effects:
    - type: ENCHANTS_APPLICATOR
      enchantments:
        - enchantment: EFFICIENCY
          evolution: INCREASE
          level: 10
        - enchantment: UNBREAKING
          evolution: INCREASE
          level: 3

      applicable-tags:
        - PICKAXES
        - SHOVELS
        - AXES

      representation:
        material: EMERALD
        display-name: "<gradient:#00ff00:#00aa00>Efficiency Rune</gradient>"
        lore:
          - ""
          - "<gray>Apply to mining tools</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Enchantment Removal Scroll

```yaml
curse_cleanse:
  material: PAPER
  display-name: "<gradient:#ffffff:#aaaaaa>Curse Cleanse</gradient>"
  lore:
    - ""
    - "<gray>Removes curses from items.</gray>"
    - ""
    - "<white>Removes:</white>"
    - "<gray>- Curse of Vanishing</gray>"
    - "<gray>- Curse of Binding</gray>"

  effects:
    - type: ENCHANTS_APPLICATOR
      enchantments:
        - enchantment: VANISHING_CURSE
          evolution: DECREASE
          level: 1
        - enchantment: BINDING_CURSE
          evolution: DECREASE
          level: 1

      representation:
        material: PAPER
        display-name: "<gradient:#ffffff:#aaaaaa>Curse Cleanse</gradient>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Protection Armor Upgrade

```yaml
protection_blessing:
  material: NETHER_STAR
  display-name: "<gradient:#4169e1:#00bfff>Divine Protection</gradient>"
  lore:
    - ""
    - "<gray>Enhances armor protection.</gray>"
    - ""
    - "<aqua>+4 Protection</aqua>"
    - "<aqua>+3 Unbreaking</aqua>"

  effects:
    - type: ENCHANTS_APPLICATOR
      enchantments:
        - enchantment: PROTECTION
          evolution: INCREASE
          level: 4
        - enchantment: UNBREAKING
          evolution: INCREASE
          level: 3

      applicable-materials:
        - NETHERITE_HELMET
        - NETHERITE_CHESTPLATE
        - NETHERITE_LEGGINGS
        - NETHERITE_BOOTS
        - DIAMOND_HELMET
        - DIAMOND_CHESTPLATE
        - DIAMOND_LEGGINGS
        - DIAMOND_BOOTS

      representation:
        material: NETHER_STAR
        display-name: "<gradient:#4169e1:#00bfff>Divine Protection</gradient>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Downgrade Scroll (For Balance)

```yaml
enchant_degrade:
  material: WITHER_ROSE
  display-name: "<dark_gray>Entropy Scroll</dark_gray>"
  lore:
    - ""
    - "<gray>Weakens enchantments...</gray>"
    - ""
    - "<red>-2 Sharpness</red>"

  effects:
    - type: ENCHANTS_APPLICATOR
      enchantments:
        - enchantment: SHARPNESS
          evolution: DECREASE
          level: 2

      applicable-tags:
        - SWORDS

      representation:
        material: WITHER_ROSE
        display-name: "<dark_gray>Entropy Scroll</dark_gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Craftable Enchantment Rune

```yaml
fortune_rune:
  material: DIAMOND
  display-name: "<gradient:#00bfff:#1e90ff>Fortune Rune</gradient>"
  lore:
    - ""
    - "<gray>Increases fortune on pickaxes.</gray>"
    - ""
    - "<aqua>+3 Fortune</aqua>"

  effects:
    - type: ENCHANTS_APPLICATOR
      enchantments:
        - enchantment: FORTUNE
          evolution: INCREASE
          level: 3

      applicable-tags:
        - PICKAXES

      representation:
        material: DIAMOND
        display-name: "<gradient:#00bfff:#1e90ff>Fortune Rune</gradient>"
        lore:
          - ""
          - "<gray>Apply in smithing table</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE

  recipe:
    type: SHAPED
    pattern:
      - "DED"
      - "ENE"
      - "DED"
    ingredients:
      - item: DIAMOND
        sign: D
      - item: EMERALD
        sign: E
      - item: NETHER_STAR
        sign: N
```

## All Minecraft Enchantments

Here's a reference of all available enchantments:

### Weapons
- `SHARPNESS`, `SMITE`, `BANE_OF_ARTHROPODS`
- `KNOCKBACK`, `FIRE_ASPECT`, `LOOTING`
- `SWEEPING_EDGE` (Java Edition)

### Tools
- `EFFICIENCY`, `SILK_TOUCH`, `FORTUNE`

### Armor
- `PROTECTION`, `FIRE_PROTECTION`, `BLAST_PROTECTION`, `PROJECTILE_PROTECTION`
- `THORNS`, `RESPIRATION`, `AQUA_AFFINITY`
- `DEPTH_STRIDER`, `FROST_WALKER`, `SOUL_SPEED`, `SWIFT_SNEAK`
- `FEATHER_FALLING`

### Bows & Crossbows
- `POWER`, `PUNCH`, `FLAME`, `INFINITY`
- `MULTISHOT`, `PIERCING`, `QUICK_CHARGE`

### Fishing
- `LUCK_OF_THE_SEA`, `LURE`

### Trident
- `LOYALTY`, `IMPALING`, `RIPTIDE`, `CHANNELING`

### Universal
- `UNBREAKING`, `MENDING`
- `VANISHING_CURSE`, `BINDING_CURSE`

### Mace (1.21+)
- `DENSITY`, `BREACH`, `WIND_BURST`

## Use Cases

1. **Upgrade Scrolls**: Allow players to enhance their gear
2. **Enchantment Books**: Custom enchantment application items
3. **Curse Removal**: Items that cleanse negative enchantments
4. **Progression System**: Tiered enchantment upgrades
5. **Event Rewards**: Special enchantment boosters

## Tips

- Ensure target items have the required enchantment for modifications
- Use `DECREASE` carefully - can't reduce below 0
- Combine with crafting recipes for balanced acquisition
- Consider economy integration for purchasing upgrade scrolls
- Great for server progression systems
