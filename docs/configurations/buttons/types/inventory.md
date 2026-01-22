---
sidebar_position: 2
title: INVENTORY Button
description: Button that opens another inventory
---

# INVENTORY Button Type

The `INVENTORY` button type opens another inventory when clicked.

## Usage

```yaml
items:
  open-shop:
    type: INVENTORY
    slot: 13
    inventory: "shop"
    item:
      material: GOLD_INGOT
      name: "&e&lShop"
      lore:
        - "&7Click to open the shop"
```

## Properties

### inventory

**Required.** The name of the inventory to open.

```yaml
items:
  open-menu:
    type: INVENTORY
    slot: 0
    inventory: "my_other_menu"
```

The inventory name corresponds to the file name (without `.yml`) in the `inventories/` folder.

---

### plugin

Specify which plugin's inventory to open (for cross-plugin support).

```yaml
items:
  open-external:
    type: INVENTORY
    slot: 0
    inventory: "external_menu"
    plugin: "OtherPlugin"
```

---

### arguments

Pass arguments to the target inventory.

```yaml
items:
  open_with_args:
    type: INVENTORY
    slot: 0
    inventory: "category_menu"
    arguments:
      - "swords"
      - "%player%"
```

---

### page

Open the inventory at a specific page.

```yaml
items:
  open_page_3:
    type: INVENTORY
    slot: 0
    inventory: "paginated_menu"
    page: 3
```

## Examples

### Basic Menu Navigation

```yaml
items:
  shop:
    type: INVENTORY
    slot: 11
    inventory: "shop"
    item:
      material: GOLD_INGOT
      name: "&e&lShop"
      lore:
        - "&7Buy and sell items"
        - ""
        - "&e▸ Click to open"
    sound: UI_BUTTON_CLICK

  warps:
    type: INVENTORY
    slot: 13
    inventory: "warps"
    item:
      material: ENDER_PEARL
      name: "&5&lWarps"
      lore:
        - "&7Teleport around the world"
        - ""
        - "&e▸ Click to open"
    sound: UI_BUTTON_CLICK

  settings:
    type: INVENTORY
    slot: 15
    inventory: "settings"
    item:
      material: COMPARATOR
      name: "&c&lSettings"
      lore:
        - "&7Configure your preferences"
        - ""
        - "&e▸ Click to open"
    sound: UI_BUTTON_CLICK
```

### Category Selection

```yaml
# Main menu
items:
  swords:
    type: INVENTORY
    slot: 10
    inventory: "shop_swords"
    item:
      material: DIAMOND_SWORD
      name: "&b&lSwords"

  armor:
    type: INVENTORY
    slot: 12
    inventory: "shop_armor"
    item:
      material: DIAMOND_CHESTPLATE
      name: "&9&lArmor"

  tools:
    type: INVENTORY
    slot: 14
    inventory: "shop_tools"
    item:
      material: DIAMOND_PICKAXE
      name: "&a&lTools"

  food:
    type: INVENTORY
    slot: 16
    inventory: "shop_food"
    item:
      material: GOLDEN_APPLE
      name: "&6&lFood"
```

### With Requirements

```yaml
items:
  vip-shop:
    type: INVENTORY
    slot: 22
    inventory: "vip_shop"
    item:
      material: DIAMOND_BLOCK
      name: "&b&lVIP Shop"
      lore:
        - "&7Exclusive VIP items"
    view-requirement:
      requirements:
        - type: permission
          permission: "server.vip"
    else:
      item:
        material: COAL_BLOCK
        name: "&8&lVIP Shop"
        lore:
          - "&cRequires VIP rank"
```

### Opening at Specific Page

```yaml
items:
  page_1:
    type: INVENTORY
    slot: 10
    inventory: "items_catalog"
    page: 1
    item:
      material: PAPER
      name: "&7Page 1"

  page_2:
    type: INVENTORY
    slot: 11
    inventory: "items_catalog"
    page: 2
    item:
      material: PAPER
      name: "&7Page 2"

  page_3:
    type: INVENTORY
    slot: 12
    inventory: "items_catalog"
    page: 3
    item:
      material: PAPER
      name: "&7Page 3"
```

## Alternative: Using Actions

You can also open inventories using the `inventory` action with a `NONE` button:

```yaml
items:
  open-shop:
    slot: 13
    item:
      material: GOLD_INGOT
      name: "&e&lShop"
    actions:
      - type: inventory
        inventory: "shop"
```

The `INVENTORY` button type is shorthand for this common pattern.

## Navigation History

When using `INVENTORY` buttons, zMenu maintains a navigation history. This allows [BACK](./back) buttons to return to the previous menu.

The history is automatically managed - you don't need to configure anything special.

## Best Practices

1. **Use clear naming** for inventory files to easily identify them
2. **Add visual feedback** with sounds when opening menus
3. **Use requirements** to restrict access to certain menus
4. **Provide locked states** with `else` for restricted menus
5. **Organize in folders** for complex menu structures

## Next Steps

- Learn about [BACK](./back) buttons for navigation
- Create [Multi-page Inventories](./next) with pagination
- See all [Button Properties](../button)
