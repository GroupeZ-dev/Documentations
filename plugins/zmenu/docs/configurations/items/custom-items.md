---
sidebar_position: 3
title: Custom Items
description: Define standalone custom items in the items folder and give them to players
---

# Custom Items

Beside the items you display inside menus, zMenu can manage **standalone custom items** — real items that live in a player's inventory. They are defined in the `items/` folder, given out with a command (or from a menu button), and can carry [mechanics](./mechanics) such as being granted on first join.

Because they are stored with a hidden id, zMenu can also **recognise them later** and **keep them up to date**: edit an item's name or lore, reload, and every copy already in players' inventories is rebuilt automatically.

## The `items/` folder

Custom items are loaded from:

```
plugins/zMenu/items/
```

This folder is **always active** — there is no option to enable or disable it in `config.yml`. It is created automatically on first start with a default `default-items.yml` example inside.

- You can create **as many `.yml` files** as you want (e.g. `weapons.yml`, `tools.yml`, `events.yml`) to organise your items.
- **Subfolders are supported**: every `.yml` file found anywhere under `items/` is loaded.
- Each item is identified by an **item id** — the top-level YAML key. Ids must be unique across all files.

## Defining an item

Every top-level key is an item id, and its content uses the **exact same format as menu items** (see [Item Configuration](./item)). You can use materials from hooked plugins, [components](./components), enchantments, placeholders, translated names, and everything else the item loader supports.

```yaml
# plugins/zMenu/items/weapons.yml

# "legendary-sword" is the item id
legendary-sword:
  material: DIAMOND_SWORD
  name: "&b&lLegendary Sword"
  lore:
    - "&7A blade of pure power."
  amount: 1
  enchantments:
    - SHARPNESS,5
  flags:
    - HIDE_ENCHANTS
  glow: true
```

The default file that ships with the plugin shows the minimal structure:

```yaml
# plugins/zMenu/items/default-items.yml
#<item-id>:
#  name: ... # Same format used for items in menus
#  mechanics:
#    <mechanic-id>:
#      ... # Depending on the mechanic

first-item:
  name: "&aFirst Item"
  lore:
    - "&7This is the first item"
    - "&7in the default items file."
```

### Item options

In addition to every standard item option, custom items accept two extra flags placed directly under the item id.

| Option              | Type    | Default | Description                                                                                      |
|---------------------|---------|---------|--------------------------------------------------------------------------------------------------|
| `save-owner-in-pdc` | Boolean | `true`  | Store the receiver as the item's **owner**. Placeholders in the name/lore are then always resolved for that owner (see [Owner & placeholders](#owner--placeholders)). |
| `skip-item-update`  | Boolean | `false` | When `true`, copies already in inventories are **never rebuilt** on join/reload. Use it for items players may customise and keep as-is. |

```yaml
legendary-sword:
  material: DIAMOND_SWORD
  name: "&b&lLegendary Sword"
  save-owner-in-pdc: true
  skip-item-update: false
```

## Giving items

### `/zmenu giveitem`

Give a custom item to a player with:

```
/zmenu giveitem <item-id> [player]
```

- `<item-id>` — the id defined in your `items/` files (tab-completed automatically).
- `[player]` — optional target; defaults to yourself when run in-game.

| | |
|-|-|
| **Permission** | `zmenu.give.item` |
| **Give to yourself** | `/zmenu giveitem legendary-sword` |
| **Give to someone else** | `/zmenu giveitem legendary-sword Notch` |

### From a menu button

There is no dedicated "give custom item" action — you hand the item out with a normal command [action](../buttons/actions) that runs `zmenu giveitem`:

```yaml
buttons:
  claim-reward:
    material: CHEST
    name: "&aClaim your sword"
    slot: 13
    actions:
      - click: LEFT
        type: console_command
        commands:
          - "zmenu giveitem legendary-sword %player%"
```

Using a `console_command` action means the command runs from the console, so the clicking player does not need the `zmenu.give.item` permission themselves.

## Keeping items up to date

Custom items are stamped with a hidden id, which lets zMenu manage the copies already sitting in players' inventories. This check runs **when a player joins** and **when you run `/zmenu reload`** (for every online player):

- **Item still exists** → it is rebuilt from the current configuration, so edits to the name, lore, enchantments, etc. are applied to existing copies automatically (unless `skip-item-update: true`).
- **Item id no longer exists** (you deleted it from the files) → the hidden tags are stripped and the item is left in the inventory as a plain item.

:::tip
Edit an item, run `/zmenu reload`, and online players see the updated version without having to be given a new one.
:::

### Owner & placeholders

The behaviour of placeholders inside the name/lore depends on `save-owner-in-pdc`:

- **`save-owner-in-pdc: true`** (default) — the item is bound to the player it was given to. Placeholders always render for that **owner**, and updates only happen while the owner is online.
- **`save-owner-in-pdc: false`** — the item is generic. Placeholders render for whoever is **currently holding** it, and updates use the holder.

## Mechanics

An item can be given **mechanics** — reusable behaviours attached under a `mechanics:` section. The one available out of the box is `itemjoin` (grant on first join, lock to a slot, prevent modification):

```yaml
starter-map:
  material: FILLED_MAP
  name: "&eServer Guide"
  mechanics:
    itemjoin:
      give-first-join: true
      fixed-slot: 8
      prevent-inventory-modification: true
```

See the dedicated [Item Mechanics](./mechanics) page for the full list of mechanics and their options.

## Next Steps

- Configure the item itself with [Item Configuration](./item)
- Give items behaviour with [Item Mechanics](./mechanics)
- Add [Actions](../buttons/actions) to a button to give items on click
