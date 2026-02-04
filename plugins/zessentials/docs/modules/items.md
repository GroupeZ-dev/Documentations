---
sidebar_position: 8
title: Items Module
description: Custom item definitions for use across the plugin
---

# Items Module

**File:** `modules/items/config.yml`

The Items module allows you to define custom items that can be referenced and used throughout the plugin. Custom items are defined using the [zMenu item format](https://docs.zmenu.dev/) and support custom names, materials, enchantments, lore, and all other item properties. These items can then be given to players via the `/give` command or referenced in other modules.

:::info
Unlike most modules, the Items module does **not** have an `enable` toggle. Custom item definitions are always available when configured. The module serves as a shared item registry for the entire plugin.
:::

---

## Configuration

```yaml
# Custom item definitions using the zMenu item format
# Each key is a unique item identifier that can be referenced across the plugin
custom-items:
  master_sword:
    name: "<gradient:#e88d1e:#e8511e>\u1d0d\u1d00s\u1d1b\u1d07\u0280 s\u1d21\u1d0f\u0280\u1d05</gradient>"
    material: DIAMOND_SWORD
    enchants:
      - SHARPNESS,10
      - UNBREAKING,10
      - LOOTING,10
      - MENDING,1
```

---

## Options

### Custom Item Properties

Each item in the `custom-items` map is identified by a unique key (e.g., `master_sword`) and supports the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | String | - | The custom display name for the item. Supports MiniMessage formatting, gradients, and color codes |
| `material` | String | - | The Minecraft material type (e.g., `DIAMOND_SWORD`, `GOLDEN_APPLE`, `NETHERITE_PICKAXE`) |
| `enchants` | List of Strings | `[]` | List of enchantments in `ENCHANTMENT_NAME,LEVEL` format |
| `lore` | List of Strings | `[]` | List of lore lines displayed on the item. Supports color codes and MiniMessage |
| `amount` | Integer | `1` | Stack size of the item |
| `durability` | Integer | `0` | Damage value applied to the item (for tools and armor) |
| `unbreakable` | Boolean | `false` | If `true`, the item cannot lose durability |
| `modelId` | Integer | `0` | Custom model data value for resource pack integration |

:::tip
Custom items use the **zMenu item format**, which means any property supported by zMenu items can be used here. This includes NBT data, item flags, skull textures, leather armor colors, potion effects, and more. Refer to the [zMenu documentation](https://docs.zmenu.dev/) for the full list of supported item properties.
:::

### Enchantment Format

Enchantments are specified as a comma-separated string of `NAME,LEVEL`:

```yaml
enchants:
  - SHARPNESS,10
  - UNBREAKING,10
  - LOOTING,10
  - MENDING,1
```

All standard Minecraft enchantment names are supported (e.g., `SHARPNESS`, `EFFICIENCY`, `PROTECTION`, `FIRE_ASPECT`, `SILK_TOUCH`, `FORTUNE`, `MENDING`, `UNBREAKING`).

:::warning
Enchantment levels above the vanilla maximum (e.g., `SHARPNESS,10`) are supported but may behave differently depending on your server software and version. Some anti-cheat plugins may flag items with non-standard enchantment levels.
:::

---

## Defining Multiple Items

You can define as many custom items as needed. Each must have a unique key:

```yaml
custom-items:
  master_sword:
    name: "<gradient:#e88d1e:#e8511e>Master Sword</gradient>"
    material: DIAMOND_SWORD
    enchants:
      - SHARPNESS,10
      - UNBREAKING,10
      - LOOTING,10
      - MENDING,1

  healing_potion:
    name: "&d&lSuper Healing Potion"
    material: POTION
    amount: 3
    lore:
      - "&7A powerful healing potion"
      - "&7that restores full health."

  builders_pickaxe:
    name: "&b&lBuilder's Pickaxe"
    material: NETHERITE_PICKAXE
    unbreakable: true
    enchants:
      - EFFICIENCY,5
      - SILK_TOUCH,1

  trophy_head:
    name: "&6&lChampion Trophy"
    material: PLAYER_HEAD
    lore:
      - "&7Awarded to the champion"
      - "&7of the tournament."
```

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/give` | - | `essentials.give` | Give items (including custom items) to a player |
| `/giveall` | - | `essentials.give.all` | Give items to all online players |
| `/itemname` | `iname`, `itemrename`, `irename` | `essentials.item.name` | Rename the item held in your hand |
| `/itemlore` | `ilore`, `lore` | `essentials.item.lore` | Add, set, or clear lore on the held item |

### Item Lore Subcommands

| Subcommand | Description |
|------------|-------------|
| `add` | Add a new lore line to the held item |
| `set` | Set a specific lore line by index |
| `clear` | Remove all lore from the held item |

---

## Related Permissions

| Permission | Description |
|------------|-------------|
| `essentials.give` | Allows giving items to a player with `/give` |
| `essentials.give.all` | Allows giving items to all players with `/giveall` |
| `essentials.item.name` | Allows renaming the held item |
| `essentials.item.lore` | Allows modifying lore on the held item |

---

## Related Placeholders

The following placeholders return information about the item the player is currently holding in their main hand:

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_iteminhand_type%` | Material type name (e.g., `DIAMOND_SWORD`) | String |
| `%zessentials_iteminhand_realname%` | Formatted material name (e.g., `Diamond Sword`) | String |
| `%zessentials_iteminhand_displayname%` | Custom display name, or material name if none set | String |
| `%zessentials_iteminhand_custommodeldata%` | Custom model data value (`0` if none) | Integer |
| `%zessentials_iteminhand_maxdurability%` | Maximum durability of the item | Integer |
| `%zessentials_iteminhand_durability%` | Current damage value of the item | Integer |
| `%zessentials_iteminhand_amount%` | Number of items in the stack | Integer |
| `%zessentials_iteminhand_lore%` | Item lore text | String |
| `%zessentials_iteminhand_enchantments%` | All enchantments with their levels | String |
| `%zessentials_iteminhand_hasenchantment_{enchantment}%` | Returns `true` if the item has the specified enchantment | Boolean |
| `%zessentials_iteminhand_enchantmentlevel_{enchantment}%` | Level of the specified enchantment | Integer |
| `%zessentials_iteminhand_itemflags%` | All item flags applied to the item | String |
| `%zessentials_iteminhand_hasitemflag_{flag}%` | Returns `true` if the item has the specified flag | Boolean |

### Minecraft 1.21+ Placeholders

These placeholders are only available on Minecraft 1.21 and newer:

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_iteminhand_rarity%` | Item rarity (`COMMON`, `UNCOMMON`, `RARE`, `EPIC`) | String |
| `%zessentials_iteminhand_repaircost%` | Anvil repair cost of the item | Integer |
| `%zessentials_iteminhand_maxstacksize%` | Maximum stack size for the item | Integer |
| `%zessentials_iteminhand_hide_tooltip%` | Returns `true` if the item tooltip is hidden | Boolean |
| `%zessentials_iteminhand_glint%` | Returns `true` if the item has an enchantment glint | Boolean |
| `%zessentials_iteminhand_fire_resistant%` | Returns `true` if the item is fire resistant | Boolean |
| `%zessentials_iteminhand_unbreakable%` | Returns `true` if the item is unbreakable | Boolean |

**Example:** Check if the held item has Sharpness:
```
%zessentials_iteminhand_hasenchantment_sharpness%
```
