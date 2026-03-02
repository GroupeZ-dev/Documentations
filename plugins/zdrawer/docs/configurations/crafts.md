---
sidebar_position: 4
title: Custom Crafts
description: Configure custom crafting recipes
---

# Custom Crafts Configuration

Define custom crafting recipes for drawer-related items in the `customCrafts` section.

## Basic Structure

```yaml
customCrafts:
  craftName:                    # Unique craft name
    result:                     # Resulting item
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6..."
      name: "&eCraft Item"
      lore:
        - "&7Description"
    shade:                      # Crafting pattern
      - "AAA"
      - "BCB"
      - "AAA"
    ingredients:                # Pattern ingredients
      A:
        material: STICK
      B:
        material: CHEST
      C:
        material: IRON_INGOT
```

## Properties

### Result

The item produced by the craft. Uses [zMenu item configuration](/zmenu/configurations/items/item):

```yaml
result:
  material: PLAYER_HEAD
  url: "base64_texture_value"
  name: "#54b2e8Upgrade Frame"
  lore:
    - "&8Upgrade frame for crafting"
```

### Shade (Pattern)

The 3x3 crafting pattern using letters:

```yaml
shade:
  - "AAA"    # Top row
  - "BCB"    # Middle row
  - "AAA"    # Bottom row
```

Each letter represents an ingredient. Use space for empty slots:

```yaml
shade:
  - "A A"    # A, empty, A
  - " B "    # empty, B, empty
  - "A A"    # A, empty, A
```

### Ingredients

Define what each letter represents:

```yaml
ingredients:
  A:
    material: STICK
  B:
    material: BARREL
  C:
    material: CHEST
```

## Referencing Custom Crafts

Custom crafts can be used as ingredients in other crafts:

```yaml
customCrafts:
  upgradeFrame:
    result:
      material: PLAYER_HEAD
      name: "&eUpgrade Frame"
    shade:
      - "AAA"
      - "BCB"
      - "AAA"
    ingredients:
      A:
        material: STICK
      B:
        material: SPRUCE_PLANKS
      C:
        material: BARREL

upgrades:
  woodUpgrade:
    craft:
      ingredients:
        C:
          customCraft: upgradeFrame   # Reference the custom craft
```

## Example: Upgrade Display Frame

A common use case is creating an upgrade frame used in all upgrade recipes:

```yaml
customCrafts:
  upgradeDisplay:
    result:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOWQxNDlkYzRkNzFmOWE0N2I3MTRhZDgxN2YxNmYzYjU1N2QzMzUzZTBhZTNiY2M0ODExMmFlMmFjZDgyNyJ9fX0="
      name: "#54b2e8Upgrade Frame"
      lore:
        - "&8Upgrade frame for craft Drawer Upgrade"
    shade:
      - "AAA"
      - "BCB"
      - "AAA"
    ingredients:
      A:
        material: STICK
      B:
        material: SPRUCE_PLANKS
      C:
        material: BARREL
```

## Advanced Item Configuration

### Using Player Heads with Textures

```yaml
result:
  material: PLAYER_HEAD
  url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6..."
  name: "&6Golden Frame"
```

### Using Enchanted Items

```yaml
result:
  material: DIAMOND
  name: "&bEnhanced Diamond"
  glow: true
  enchants:
    - enchant: DURABILITY
      level: 1
```

### Using Custom Model Data

```yaml
result:
  material: PAPER
  name: "&aCustom Item"
  customModelData: 1001
```

## Giving Craft Results

Give craft result items to players:

```bash
/zdrawer give craft upgradeDisplay Steve
```

This gives the exact item that would result from crafting.

## Tips

1. **Unique Names**: Each craft must have a unique name
2. **Pattern Matching**: Letters in shade must match ingredients
3. **Item Stacking**: Result items with custom NBT won't stack with normal items
4. **Testing**: Test crafts in creative mode before deploying
