---
sidebar_position: 3
title: Categories
description: Configure item categories for zAuctionHouse
---

# Categories

Categories help organize items in the auction house, making it easier for players to find what they're looking for.

## Configuration File

Categories are configured in `plugins/zAuctionHouseV3/categories.yml`.

## Basic Structure

```yaml
categories:
  blocks:
    name: "&8Blocks"
    materials:
      - STONE
      - GRANITE
      - DIORITE
      - ANDESITE
      - COBBLESTONE
      - DIRT
```

## Category Options

| Option | Type | Description |
|--------|------|-------------|
| `name` | String | Display name (supports color codes) |
| `materials` | List | List of Bukkit Material names |

## Material Configuration

### Simple Material List

```yaml
weapons:
  name: "&cWeapons"
  materials:
    - WOODEN_SWORD
    - STONE_SWORD
    - IRON_SWORD
    - GOLDEN_SWORD
    - DIAMOND_SWORD
    - NETHERITE_SWORD
    - BOW
    - CROSSBOW
    - TRIDENT
```

### Advanced Material Configuration

For more control, use detailed material definitions:

```yaml
custom_items:
  name: "&dCustom Items"
  materials:
    - material: DIAMOND_SWORD
      name: "&bLegendary Sword"      # Match specific item name
      loreKey: "legendary"           # Match lore key
      removeColor: true              # Ignore color codes when matching
      modelId: 1234                  # Match custom model data
```

## Default Categories

The plugin includes these pre-configured categories:

### Blocks
```yaml
blocks:
  name: "&8Blocks"
  materials:
    - STONE
    - GRANITE
    - DIORITE
    - ANDESITE
    # ... building materials
```

### Potions
```yaml
potions:
  name: "&5Potions"
  materials:
    - BLAZE_ROD
    - GHAST_TEAR
    - NETHER_STAR
    - BREWING_STAND
    # ... potion ingredients
```

### Tools
```yaml
tools:
  name: "&6Tools"
  materials:
    - WOODEN_PICKAXE
    - STONE_PICKAXE
    - IRON_PICKAXE
    # ... all tool types
```

### Weapons
```yaml
weapons:
  name: "&cWeapons"
  materials:
    - FLINT_AND_STEEL
    - BOW
    - ARROW
    - WOODEN_SWORD
    # ... all weapon types
```

### Miscellaneous
```yaml
misc:
  name: "&aMisc"
  materials:
    # Items not in other categories
```

## Category Behavior

### Material-Only Matching

When `categoryCheckOnlyMaterial: true` in config.yml:
- Categories determined by material type only
- Ignores item name, lore, enchantments
- Faster performance

When `false`:
- Full item matching including metadata
- Allows for more specific categorization

## Using Categories in Buttons

### Single Category Button

```yaml
category_blocks:
  type: ZAUCTIONHOUSE_CATEGORY
  category: blocks
  slot: 10
  item:
    material: STONE
    name: "&8Blocks"
```

### Category Cycling Button

```yaml
categories_cycle:
  type: ZAUCTIONHOUSE_CATEGORIES_LORE
  slot: 49
  item:
    material: HOPPER
    name: "&eCategories"
    lore:
      - "&7Current: %zauctionhouse_category%"
      - ""
      - "&eClick to cycle"
```

## Custom Category Implementation

For advanced category logic, developers can implement the `CategoryItem` interface:

```java
public class CustomCategoryItem implements CategoryItem {
    @Override
    public boolean matches(ItemStack item) {
        // Custom matching logic
        return item.hasItemMeta() &&
               item.getItemMeta().hasDisplayName() &&
               item.getItemMeta().getDisplayName().contains("Custom");
    }
}
```

## Complete Example

```yaml
categories:
  # Building blocks
  blocks:
    name: "&8Blocks"
    materials:
      - STONE
      - COBBLESTONE
      - DIRT
      - GRASS_BLOCK
      - OAK_LOG
      - BIRCH_LOG
      - SPRUCE_LOG

  # Combat items
  weapons:
    name: "&cWeapons"
    materials:
      - WOODEN_SWORD
      - STONE_SWORD
      - IRON_SWORD
      - DIAMOND_SWORD
      - NETHERITE_SWORD
      - BOW
      - CROSSBOW
      - ARROW
      - SPECTRAL_ARROW
      - TIPPED_ARROW

  # Mining and gathering
  tools:
    name: "&6Tools"
    materials:
      - WOODEN_PICKAXE
      - STONE_PICKAXE
      - IRON_PICKAXE
      - DIAMOND_PICKAXE
      - NETHERITE_PICKAXE
      - WOODEN_AXE
      - STONE_AXE
      - IRON_AXE
      - DIAMOND_AXE
      - NETHERITE_AXE
      - WOODEN_SHOVEL
      - STONE_SHOVEL
      - IRON_SHOVEL
      - DIAMOND_SHOVEL
      - NETHERITE_SHOVEL

  # Armor
  armor:
    name: "&9Armor"
    materials:
      - LEATHER_HELMET
      - LEATHER_CHESTPLATE
      - LEATHER_LEGGINGS
      - LEATHER_BOOTS
      - IRON_HELMET
      - IRON_CHESTPLATE
      - IRON_LEGGINGS
      - IRON_BOOTS
      - DIAMOND_HELMET
      - DIAMOND_CHESTPLATE
      - DIAMOND_LEGGINGS
      - DIAMOND_BOOTS
      - NETHERITE_HELMET
      - NETHERITE_CHESTPLATE
      - NETHERITE_LEGGINGS
      - NETHERITE_BOOTS

  # Food items
  food:
    name: "&aFood"
    materials:
      - APPLE
      - BREAD
      - COOKED_BEEF
      - COOKED_PORKCHOP
      - COOKED_CHICKEN
      - GOLDEN_APPLE
      - ENCHANTED_GOLDEN_APPLE
      - GOLDEN_CARROT

  # Everything else
  misc:
    name: "&eMisc"
    materials: []
```
