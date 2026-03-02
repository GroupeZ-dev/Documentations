---
sidebar_position: 2
title: Drawer Configuration
description: Configure drawer types and properties
---

# Drawer Configuration

Configure different drawer types in the `drawer.drawers` section of `config.yml`.

## Basic Structure

```yaml
drawer:
  drawers:
    single:                    # Drawer name (used in commands)
      type: SINGLE             # Drawer type
      limit: 2048              # Maximum items per slot
      enableHopper: true       # Allow hopper interaction
      viewRange: 0.5           # Display visibility range
      enableTextBackground: false

      dropContent:
        enable: false
        limit: 1024

      item:                    # Drawer item configuration
        material: BARREL
        name: "#22f54cDrawer"
        lore:
          - "&8Store items here"

      border:                  # Visual border
        enable: true
        item:
          material: SPRUCE_WOOD

      craft:                   # Crafting recipe
        enable: true
        # ...
```

## Drawer Types

| Type | Slots | Description |
|------|-------|-------------|
| `SINGLE` | 1 | One item type |
| `DUO` | 2 | Two item types |
| `TRIO` | 3 | Three item types |
| `QUAD` | 4 | Four item types |

## Properties

### Basic Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | DrawerType | SINGLE, DUO, TRIO, or QUAD |
| `limit` | Integer | Maximum items per slot |
| `enableHopper` | Boolean | Allow hopper item transfer |
| `viewRange` | Float | Display entity visibility range |
| `enableTextBackground` | Boolean | Show background behind amount text |

### Drop Content

Configure behavior when drawer is broken:

```yaml
dropContent:
  enable: false    # Drop items when broken
  limit: 1024      # Max items before preventing break
```

If `enable` is `false`, items stay inside the dropped drawer item.
If `enable` is `true` and items exceed `limit`, the drawer cannot be broken.

## Item Configuration

Configure the drawer item using [zMenu item format](/zmenu/configurations/items/item):

```yaml
item:
  material: BARREL
  name: "#22f54cDrawer"
  lore:
    - "&8&oStore a large number of items"
    - ""
    - "#e3e3e3Content&8: #baffffx%zdrawer_amount_formatted_0% %zdrawer_content_0%"
    - "#e3e3e3Upgrade&8: #baffff%zdrawer_upgrade%"
```

### Available Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zdrawer_content_<index>%` | Item name in slot |
| `%zdrawer_amount_<index>%` | Amount in slot |
| `%zdrawer_amount_formatted_<index>%` | Formatted amount |
| `%zdrawer_upgrade%` | Applied upgrade name |

## Border Configuration

Display decorative borders around the drawer face:

```yaml
border:
  enable: true
  scale:
    up: { x: 1.0, y: 0.05, z: 0.05 }
    down: { x: 1.0, y: 0.05, z: 0.05 }
    left: { x: 0.05, y: 0.9, z: 0.05 }
    right: { x: 0.05, y: 0.9, z: 0.05 }
  item:
    material: SPRUCE_WOOD
```

## Craft Configuration

Define crafting recipe for the drawer:

```yaml
craft:
  enable: true
  shade:
    - "ABA"
    - "BCB"
    - "ABA"
  ingredients:
    A:
      material: SPRUCE_WOOD
    B:
      material: SPRUCE_PLANKS
    C:
      material: CHEST
```

See [Crafts Configuration](./crafts) for more details.

## Complete Examples

### Single Drawer

```yaml
drawer:
  drawers:
    single:
      type: SINGLE
      limit: 2048
      enableHopper: true
      viewRange: 0.5
      enableTextBackground: false

      dropContent:
        enable: false
        limit: 1024

      item:
        material: BARREL
        name: "#22f54cDrawer"
        lore:
          - "&8&oStore a large number of the same item"
          - ""
          - "#e3e3e3Content&8: #baffffx%zdrawer_amount_formatted_0% %zdrawer_content_0%"
          - "#e3e3e3Upgrade&8: #baffff%zdrawer_upgrade%"

      border:
        enable: true
        scale:
          up: { x: 1.0, y: 0.05, z: 0.05 }
          down: { x: 1.0, y: 0.05, z: 0.05 }
          left: { x: 0.05, y: 0.9, z: 0.05 }
          right: { x: 0.05, y: 0.9, z: 0.05 }
        item:
          material: SPRUCE_WOOD

      craft:
        enable: true
        shade:
          - "ABA"
          - "BCB"
          - "ABA"
        ingredients:
          A:
            material: SPRUCE_WOOD
          B:
            material: SPRUCE_PLANKS
          C:
            material: CHEST
```

### Quad Drawer

```yaml
drawer:
  drawers:
    quad:
      type: QUAD
      limit: 512
      enableHopper: true
      viewRange: 0.5
      enableTextBackground: false

      dropContent:
        enable: false
        limit: 1024

      item:
        material: BARREL
        name: "#22f54cDrawer Quad"
        lore:
          - "&8&oStore multiple item types"
          - ""
          - "&8First slot:"
          - "#e3e3e3Content&8: #baffffx%zdrawer_amount_formatted_0% %zdrawer_content_0%"
          - "&8Second slot:"
          - "#e3e3e3Content&8: #baffffx%zdrawer_amount_formatted_1% %zdrawer_content_1%"
          - "&8Third slot:"
          - "#e3e3e3Content&8: #baffffx%zdrawer_amount_formatted_2% %zdrawer_content_2%"
          - "&8Fourth slot:"
          - "#e3e3e3Content&8: #baffffx%zdrawer_amount_formatted_3% %zdrawer_content_3%"
          - ""
          - "#e3e3e3Upgrade&8: #baffff%zdrawer_upgrade%"

      border:
        enable: true
        item:
          material: BIRCH_WOOD

      craft:
        enable: true
        shade:
          - "ABA"
          - "BCB"
          - "ABA"
        ingredients:
          A:
            material: SPRUCE_WOOD
          B:
            material: SPRUCE_PLANKS
          C:
            material: ENDER_CHEST
```

## Size Configuration

Configure display positions for each drawer type and block face:

```yaml
drawer:
  sizes:
    SINGLE:
      SOUTH:
        scale: { x: 1, y: 1, z: 1.0 }
        positions:
          1:
            item: { x: 0, y: 0.0, z: 0.0 }
            text: { x: 0, y: 0.0, z: 0.0 }

    DUO:
      SOUTH:
        scale: { x: 0.8, y: 0.8, z: 1.0 }
        positions:
          1:
            item: { x: 0.25, y: 0.0, z: 0.0 }
            text: { x: 0.25, y: 0.1, z: 0.0 }
          2:
            item: { x: -0.25, y: 0.0, z: 0.0 }
            text: { x: -0.25, y: 0.1, z: 0.0 }
```

:::warning
Modifying size positions requires careful adjustment. Small changes can break the visual display. Only modify if you understand the coordinate system.
:::
