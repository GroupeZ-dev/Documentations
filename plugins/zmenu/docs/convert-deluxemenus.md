---
title: Migrate from DeluxeMenus
description: Convert your DeluxeMenus menus into zMenu inventories with a single command
---

# Migrate from DeluxeMenus

**Coming from DeluxeMenus? You don't have to rewrite anything.** zMenu converts your existing DeluxeMenus menus into zMenu inventories with a single command: items, slots, click commands, requirements, open commands and more are translated automatically.

```
/zm convert deluxemenus
```

That's it. Every menu of `plugins/DeluxeMenus/gui_menus/` is converted, and you keep your whole configuration while gaining everything zMenu offers on top of it: [pagination](./configurations/buttons/types/pagination), [patterns](./configurations/patterns), [player data](./configurations/player-data), [dialogs](./configurations/dialogues), [Bedrock forms](./configurations/bedrock), [hot reload](./hot-reload) and much more.

<CalloutContainer type="info">

<CalloutTitle>Why migrate?</CalloutTitle>

<CalloutDescription>
- **Zero rewrite**: your menus are converted in seconds, not rewritten by hand over days.
- **Nothing hidden**: everything that cannot be converted exactly is listed at the top of the converted file and in the console.
- **Safe by design**: a feature zMenu cannot reproduce never grants more than DeluxeMenus did. An unsupported requirement always denies, and an unsupported action stops the actions after it.
- **No DeluxeMenus needed**: the converter reads the YAML files directly. DeluxeMenus does not need to be installed, or even enabled.
</CalloutDescription>

</CalloutContainer>

## Quick Start

1. Copy your DeluxeMenus folder into `plugins/` (or keep it where it is) so that the menus are in `plugins/DeluxeMenus/gui_menus/`.
2. Run `/zm convert deluxemenus` (or `/zm convert dm`) from the console or in game.
3. Read the result: each menu shows ✔ when converted or ✘ with the reason when it was not.
4. Open the converted files and check the **Not converted exactly** list at the top of each file, if any.
5. **Disable DeluxeMenus** (remove its jar), otherwise its open commands conflict with the converted ones.
6. Run `/zm reload` to load the converted inventories and their commands.

<CalloutContainer type="info">

<CalloutTitle>Combine it with the hot reload</CalloutTitle>

<CalloutDescription>
Enable the [hot reload](./hot-reload) before converting: the converted menus are then loaded as soon as they are written, and every fix you make while reviewing them is applied instantly, without `/zm reload`.
</CalloutDescription>

</CalloutContainer>

## Command

| Command | Permission | Description |
|---------|------------|-------------|
| `/zm convert deluxemenus` | `zmenu.convert` | Convert every menu of `plugins/DeluxeMenus/gui_menus/` (subfolders included) |
| `/zm convert deluxemenus <menu>` | `zmenu.convert` | Convert a single menu, by file name, with or without `.yml` |
| `/zm convert dm [menu]` | `zmenu.convert` | Short alias |

Example output:

```
✔ shop → inventories/converted/deluxemenu/shop.yml + command
✔ ranks → inventories/converted/deluxemenu/ranks.yml + command (2 not converted exactly, see the top of the file)
✘ broken: this is not a DeluxeMenus menu
Converted 2/3 menus. Review them, then run /zm reload to load them.
```

## Where are the converted files?

| What | Location |
|------|----------|
| Source menus (read only) | `plugins/DeluxeMenus/gui_menus/**/*.yml` |
| Converted inventories | `plugins/zMenu/inventories/converted/deluxemenu/<menu>.yml` |
| Converted open commands | `plugins/zMenu/commands/converted/deluxemenu/<menu>.yml` |

- Your DeluxeMenus files are **never modified**.
- An already converted menu is **never overwritten**: it is skipped with `already converted, delete ... to convert it again`. Delete the converted file to convert the menu again. Command files are not overwritten either.
- A file that has neither `menu_title` nor `items` is skipped with `this is not a DeluxeMenus menu`.

Each converted file starts with a header like this:

```yaml
# Converted from the DeluxeMenus menu shop.yml by zMenu.
# Review it before use: https://docs.groupez.dev/zmenu/getting-started
#
# Not converted exactly:
# - shop.yml: the action "[meta] set points INTEGER 5" is not supported, the actions after it will not run
# - shop.yml: the requirement money_check "has meta" is not supported, it always denies
name: '&8Shop'
size: 27
items:
  # ...
```

## The open command

The DeluxeMenus `open_command` becomes a zMenu [custom command](./configurations/custom-commands):

```yaml
# DeluxeMenus
open_command:
  - shop
  - store
```

```yaml
# plugins/zMenu/commands/converted/deluxemenu/shop.yml
commands:
  shop:
    command: shop
    aliases:
      - store
    inventory: shop
```

The first command becomes the zMenu command, the others become its aliases.

## What is converted

### Menu options

| DeluxeMenus | zMenu | Notes |
|-------------|-------|-------|
| `menu_title` (or `name` / `title`) | `name` | When a list is used, the first line is kept |
| `inventory_type` | `type` | An invalid type falls back to a chest (warning) |
| `size` | `size` | Rounded to a valid chest size, from 9 to 54 (warning when changed) |
| `update_interval` (seconds) | `update-interval` | Converted to milliseconds |
| `open_command` | [custom command](./configurations/custom-commands) | First entry = command, others = aliases |
| `open_commands` | `open-actions` | See [actions](#actions) |
| `close_commands` | `close-actions` | See [actions](#actions) |
| `open_requirement` | `open-requirement` | See [requirements](#requirements) |
| `items` | `items` | See [items](#items) |

### Items

| DeluxeMenus | zMenu | Notes |
|-------------|-------|-------|
| `slot`, `slots`, `page` | `slot`, `slots`, `page` | |
| `priority` | `priority` + `else` | Items sharing a slot are chained by priority, exactly like DeluxeMenus |
| `update` | `update` | |
| `view_requirement` | `view-requirement` | |
| `click_commands` + `click_requirement` | click requirement | All click types |
| `left_click_commands`, `right_click_commands`, `shift_left_click_commands`, `shift_right_click_commands`, `middle_click_commands` (+ their `*_click_requirement`) | click requirements | One requirement per click type |
| `display_name`, `lore`, `amount`, `model_data`... | same keys | Read as-is by zMenu |
| `dynamic_amount` | `amount` | Placeholders are supported |
| `data` | `damage` | |
| `enchantments` (`SHARPNESS;5`) | `enchantments` (`SHARPNESS,5`) | |
| `item_flags` | `flags` | |
| `hide_tooltip` | `hide-tooltip` | |
| `enchantment_glint_override` | `enchantment-glint` | |
| `rarity` | `item-rarity` | |
| `tooltip_style` | `tooltip-style` | |
| `item_model` | `item-model` | |

### Materials

| DeluxeMenus material | zMenu material |
|----------------------|----------------|
| `head-<player>` | Player head of `<player>` (placeholders supported) |
| `texture-<hash>` | `basehead-<base64>` |
| `placeholder-<placeholder>` | `<placeholder>` |
| `main_hand`, `off_hand` | `armor:HAND`, `armor:OFF_HAND` |
| `armor_helmet`, `armor_chestplate`, `armor_leggings`, `armor_boots` | `armor:HEAD`, `armor:CHEST`, `armor:LEGS`, `armor:FEET` |
| `water_bottle` | `POTION` with `potion: WATER` |
| `hdb-<id>` / `headdb-<id>` | `hdb:<id>` |
| `itemsadder-<id>` | `itemsadder:<id>` |
| `oraxen-<id>` | `oraxen:<id>` |
| `nexo-<id>` | `nexo:<id>` |
| `mmoitems-<id>` | `mmoitems:<id>` |
| `craftengine-<id>` | `craftengine:<id>` |
| `executableitems-<id>` | `ei:<id>` |
| `executableblocks-<id>` | `eb:<id>` |
| Any vanilla material | Unchanged |

### Actions

DeluxeMenus click, open and close commands are converted into zMenu [actions](./configurations/buttons/actions). The `<delay=ticks>` and `<chance=percent>` modifiers are kept, wherever they appear in the line.

| DeluxeMenus | zMenu action |
|-------------|--------------|
| `[close]` | `close` |
| `[console]` | `console-command` |
| `[player]` | `player-command` |
| `[commandevent]` | `player-command` (with command event) |
| `[chat]` | `chat` |
| `[message]` / `[minimessage]` | `message` (legacy colors / MiniMessage) |
| `[broadcast]` / `[minibroadcast]` | `broadcast` (legacy colors / MiniMessage) |
| `[actionbar]` | `action-bar` |
| `[openguimenu]` / `[openmenu]` | `inventory` (arguments kept) |
| `[connect]` | `connect` |
| `[refresh]` | `refresh` |
| `[sound]` / `[rawsound]` | `sound` (volume and pitch kept) |
| `[broadcastsound]` / `[broadcastrawsound]` | `broadcast-sound` |
| `[broadcastsoundworld]` / `[broadcastrawsoundworld]` | `broadcast-sound`, played to the whole server (warning) |
| `[takemoney]` / `[givemoney]` | `withdraw` / `deposit` (Vault) |
| `[giveexp]` / `[takeexp]` | `/xp add` console command (`L` suffix = levels) |

Any other tag (`[meta]`, `[json]`, `[givepermission]`...) is reported, and the actions after it **do not run**, so a menu can never give a reward without the step that was supposed to come before it.

### Requirements

`open_requirement`, `view_requirement` and click requirements are converted into zMenu [requirements](./configurations/requirements), with their `deny_commands` and `success_commands`.

| DeluxeMenus type | zMenu | Negation (`!`) |
|------------------|-------|----------------|
| `has permission` | `permission` | Yes |
| `has permissions` | One `permission` per entry | No, and `minimum` must be the number of permissions |
| `string equals` | `placeholder` | Yes |
| `string equals ignorecase` | `placeholder` | Yes, with a literal `output` |
| `string contains` | `placeholder` | Yes, with a literal `output` |
| `string contains ignorecase` | `regex` | Yes, with a literal `output` |
| `>`, `>=`, `==`, `<=`, `<` | `placeholder` (numeric) | No |
| `!=` | `placeholder` (compared as text, warning) | - |
| `regex matches` | `regex` | Yes |
| `string length` | `regex` | No |
| `has money` | `money` (Vault) | No |
| `has exp` (with `level: true`) | `placeholder` on `%player_level%` | No |
| `has item` (material, `model_data`, `amount`) | `item` | No |

Long names (`has permission`), short names (`hasperm`, `perm`) and symbols are all recognized, ignoring case.

`minimum_requirements` is supported when every requirement is optional. When required and optional requirements are mixed, zMenu requires all of them and reports it.

## What is not converted

Everything below is listed at the top of the converted file and logged in the console with a `[DeluxeMenus]` prefix:

| Feature | Behavior |
|---------|----------|
| Unsupported action tags | Reported, the actions after it do not run |
| Unsupported requirement types (or unsupported negation / options) | Reported, the requirement always denies |
| `has item` with `strict`, `name`, `lore`, `data`, `armor`, `offhand`, `name_contains`, `lore_contains`, `model_data_component` | Reported, always denies |
| `stop_at_success` | Every requirement is checked |
| `refresh` (menu option) | Only items with `update: true` are refreshed |
| `args` (menu arguments) | Not converted, use [command arguments](./configurations/custom-commands) |
| `enable_open_requirements_bypass_permissions` | Not converted |
| Item options `rgb`, `banner_meta`, `base_color`, `potion_effects`, `trim_material`, `trim_pattern`, `model_data_component`, `light_level`, `lore_append_mode` | Not converted, use the zMenu [item options](./configurations/items/item) or [components](./configurations/items/components) |
| Materials `stack-...` and `simpleitemgenerator-...` | Not converted |

<CalloutContainer type="warning">

<CalloutTitle>Always review the result</CalloutTitle>

<CalloutDescription>
The converter does the heavy lifting, but your server is unique. Open each converted inventory once, test its buttons, and fix the lines listed under **Not converted exactly** before going live.
</CalloutDescription>

</CalloutContainer>

## FAQ

**Can I convert again after changing a DeluxeMenus menu?**
Yes. Delete the converted file in `inventories/converted/deluxemenu/` (and its command in `commands/converted/deluxemenu/` if you want it regenerated), then run the command again.

**Can I move the converted files?**
Yes. They are regular zMenu inventories: move or rename them anywhere in `inventories/`. Remember that the inventory name used by `/zm open` and by the command file is the file name.

**Do I need to keep DeluxeMenus installed?**
No. The converter only reads the files of `plugins/DeluxeMenus/gui_menus/`. Once converted, remove DeluxeMenus: if it stays enabled, zMenu warns you that its open commands conflict with the converted ones.

**My menu uses placeholders. Do they still work?**
Yes. PlaceholderAPI placeholders are kept as-is and resolved by zMenu.

## Next Steps

- Enable the [hot reload](./hot-reload) to polish your converted menus in real time
- Discover what zMenu adds: [button types](./configurations/buttons/button), [actions](./configurations/buttons/actions), [patterns](./configurations/patterns)
- Learn the [inventory format](./configurations/inventories/inventory) to go further
