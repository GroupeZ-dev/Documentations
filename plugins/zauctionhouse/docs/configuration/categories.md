---
sidebar_position: 4
title: Categories
description: Configure item categories in zAuctionHouse V4
---

# Categories Configuration

Categories organize items in the auction house, making it easier for players to find what they're looking for. Configure them in `categories.yml`.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/categories.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## How Categories Work

- Each category has a unique ID (the YAML key, e.g., "weapons", "armor")
- Categories use rules to determine which items belong to them
- Items are automatically sorted into categories based on these rules
- An item can appear in multiple categories if it matches multiple rules
- A category without rules acts as a fallback for unmatched items

:::info
Category display order is defined in `inventories/categories.yml`, not in `categories.yml`. The categories file only defines the matching rules.
:::

:::tip Multiple Files
You don't have to define all categories in `categories.yml`. You can create a `categories/` folder and split your categories into multiple YAML files for better organization:
```
plugins/zAuctionHouse/
├── categories.yml          # Main file (optional)
└── categories/
    ├── weapons.yml
    ├── armor.yml
    └── custom-items.yml
```
:::

## Category Settings

```yaml
settings:
  # Enable/disable the category system
  enabled: true

  # Display name for the "All" category
  all-category-name: "#0c1719Auction House"
```

## Basic Category Structure

```yaml
category-id:
  display-name: "#0c1719Category Name"
  rules:
    - type: material
      materials:
        - DIAMOND
        - EMERALD
```

## Default Categories

### Blocks Category

Matches all placeable blocks using Bukkit's BLOCKS tag:

```yaml
blocks:
  display-name: "#0c1719Blocks"
  rules:
    - type: tag
      tags:
        - BLOCKS
```

### Weapons Category

Matches combat weapons:

```yaml
weapons:
  display-name: "#0c1719Weapons"
  rules:
    # All sword types by suffix
    - type: material-suffix
      suffixes:
        - "_SWORD"

    # Ranged weapons by material
    - type: material
      materials:
        - BOW
        - CROSSBOW
        - TRIDENT
```

### Armor Category

Matches protective equipment:

```yaml
armor:
  display-name: "#0c1719Armor"
  rules:
    # Standard armor pieces
    - type: material-suffix
      suffixes:
        - "_HELMET"
        - "_CHESTPLATE"
        - "_LEGGINGS"
        - "_BOOTS"

    # Special items
    - type: material
      materials:
        - ELYTRA
        - SHIELD
        - TURTLE_HELMET
```

### Tools Category

Matches utility tools:

```yaml
tools:
  display-name: "#0c1719Tools"
  rules:
    - type: material-suffix
      suffixes:
        - "_PICKAXE"
        - "_AXE"
        - "_SHOVEL"
        - "_HOE"

    - type: material
      materials:
        - SHEARS
        - FLINT_AND_STEEL
        - FISHING_ROD
```

### Consumables Category

Matches food and potions:

```yaml
consumables:
  display-name: "#0c1719Consumables"
  rules:
    - type: material
      materials:
        - POTION
        - SPLASH_POTION
        - LINGERING_POTION
        - GOLDEN_APPLE
        - ENCHANTED_GOLDEN_APPLE
        - COOKED_BEEF
        - COOKED_PORKCHOP
        - BREAD
        - CAKE
        - COOKIE
        - PUMPKIN_PIE
```

### Resources Category

Matches ores, ingots, and crafting materials:

```yaml
resources:
  display-name: "#0c1719Resources"
  rules:
    - type: material
      materials:
        - COAL
        - IRON_INGOT
        - GOLD_INGOT
        - DIAMOND
        - EMERALD
        - NETHERITE_INGOT
        - LAPIS_LAZULI
        - REDSTONE
        - COPPER_INGOT
        - AMETHYST_SHARD
        - RAW_IRON
        - RAW_GOLD
        - RAW_COPPER
```

### Enchanted Books Category

```yaml
enchanted-books:
  display-name: "#0c1719Enchanted Books"
  rules:
    - type: material
      materials:
        - ENCHANTED_BOOK
```

### Miscellaneous Category (Fallback)

A category without rules catches all unmatched items:

```yaml
misc:
  display-name: "#0c1719Miscellaneous"
  # No rules = fallback category for unmatched items
```

## Rule Types

Categories use the same rule system as the blacklist/whitelist configuration. For a complete list of all available rule types (material, material-suffix, material-prefix, name, lore, custom-model-data, tag, AND/OR combinations, and custom item plugins), see the [Rules documentation](./rules.md#rule-types-reference).

## Adding Custom Categories

1. Add the category in `categories.yml`:

```yaml
my-custom-category:
  display-name: "#ff5555My Category"
  rules:
    - type: material
      materials:
        - DIAMOND_BLOCK
        - EMERALD_BLOCK
```

2. Add a button in `inventories/categories.yml`:

```yaml
items:
  my-category-button:
    slot: 15
    type: ZAUCTIONHOUSE_CATEGORY
    category: my-custom-category
    item:
      material: DIAMOND_BLOCK
      name: "#ff5555My Category"
      lore:
        - "#92ffffClick to browse"
```

## Category Examples

### Rare Items (by lore)

```yaml
rare-items:
  display-name: "#ff00ffRare Items"
  rules:
    - type: lore
      mode: CONTAINS
      values:
        - "Rare"
        - "Legendary"
        - "Mythical"
```

### All Custom Items

```yaml
custom-items:
  display-name: "#ffd700Custom Items"
  rules:
    - type: itemsadder
      items:
        - "*:*"  # All ItemsAdder items
    - type: oraxen
      items:
        - "*"    # All Oraxen items
```

### Combined Conditions

```yaml
special-swords:
  display-name: "#ff0000Special Swords"
  rules:
    - type: and
      rules:
        - type: material-suffix
          suffixes:
            - "_SWORD"
        - type: lore
          mode: CONTAINS
          values:
            - "Special Edition"
```

## Full Example

```yaml
settings:
  enabled: true
  all-category-name: "#0c1719Auction House"

blocks:
  display-name: "#0c1719Blocks"
  rules:
    - type: tag
      tags:
        - BLOCKS

weapons:
  display-name: "#0c1719Weapons"
  rules:
    - type: material-suffix
      suffixes:
        - "_SWORD"
    - type: material
      materials:
        - BOW
        - CROSSBOW
        - TRIDENT

armor:
  display-name: "#0c1719Armor"
  rules:
    - type: material-suffix
      suffixes:
        - "_HELMET"
        - "_CHESTPLATE"
        - "_LEGGINGS"
        - "_BOOTS"
    - type: material
      materials:
        - ELYTRA
        - SHIELD
        - TURTLE_HELMET

tools:
  display-name: "#0c1719Tools"
  rules:
    - type: material-suffix
      suffixes:
        - "_PICKAXE"
        - "_AXE"
        - "_SHOVEL"
        - "_HOE"
    - type: material
      materials:
        - SHEARS
        - FLINT_AND_STEEL
        - FISHING_ROD

consumables:
  display-name: "#0c1719Consumables"
  rules:
    - type: material
      materials:
        - POTION
        - SPLASH_POTION
        - LINGERING_POTION
        - GOLDEN_APPLE
        - ENCHANTED_GOLDEN_APPLE

resources:
  display-name: "#0c1719Resources"
  rules:
    - type: material
      materials:
        - COAL
        - IRON_INGOT
        - GOLD_INGOT
        - DIAMOND
        - EMERALD
        - NETHERITE_INGOT

enchanted-books:
  display-name: "#0c1719Enchanted Books"
  rules:
    - type: material
      materials:
        - ENCHANTED_BOOK

misc:
  display-name: "#0c1719Miscellaneous"
  # Fallback category
```
