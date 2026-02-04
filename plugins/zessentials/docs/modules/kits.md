---
sidebar_position: 10
title: Kits Module
description: Configurable kit system with cooldowns and first-join kits
---

# Kits Module

**File:** `modules/kits/config.yml`

The Kits module provides a full-featured kit system allowing administrators to create, manage, and distribute item kits to players. Kits support cooldowns, permission restrictions, and GUI-based display modes. Players can receive kits automatically on their first join, and administrators can manage kits entirely through in-game commands and editors.

---

## Source Configuration

```yaml
enable: true
display: IN_LINE  # IN_LINE, INVENTORY, MULTI_LINE
kits-on-first-join:
  - "tools"
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Kits module |
| `display` | String | `IN_LINE` | The display mode used when listing available kits. `IN_LINE` shows kits as a single-line clickable list, `INVENTORY` opens a chest GUI with kit icons, `MULTI_LINE` displays each kit on its own line with details |
| `kits-on-first-join` | List of Strings | `["tools"]` | A list of kit names that are automatically given to players when they join the server for the first time. Leave empty or remove the list to disable first-join kits |

---

## Display Modes

The `display` option controls how kits are presented when a player runs the `/kit` command without specifying a kit name:

| Mode | Description |
|------|-------------|
| `IN_LINE` | Kits are displayed as a compact, single-line list of clickable kit names. Best for servers with a small number of kits |
| `INVENTORY` | Opens a chest-style GUI inventory where each kit is represented by its configured material icon. Players click an icon to claim the kit |
| `MULTI_LINE` | Each kit is displayed on its own line with additional details such as cooldown status and availability. Best for detailed overviews |

:::tip
The `INVENTORY` display mode provides the most visually appealing experience for players. Each kit's icon material, display name, and lore are configured within the kit definition itself.
:::

---

## Kit Definitions

Kit definitions (items, cooldowns, permissions, display settings) are **not** configured in this file. Instead, kits are managed through in-game commands and stored as individual YAML files in the `plugins/zEssentials/kits/` folder.

Use the following workflow to create and manage kits:

1. **Create a kit:** Use `/kitcreate <name>` to create a new kit from your current inventory.
2. **Edit a kit:** Use `/kiteditor <name>` to open the GUI-based kit editor where you can modify items, cooldowns, permissions, and display settings.
3. **Delete a kit:** Use `/kitdelete <name>` to remove a kit.
4. **Preview a kit:** Use `/showkit <name>` to preview the contents of a kit without claiming it.
5. **Give a kit:** Use `/kitgive <player> <name>` to give a kit to another player, bypassing their cooldown.

:::info
Each kit is stored as a separate YAML file in the `kits/` directory (e.g., `kits/tools.yml`). These files are automatically managed by the kit commands and editor. Manual editing is possible but not recommended -- use the in-game editor instead.
:::

---

## First-Join Kits

The `kits-on-first-join` list specifies which kits are automatically given to players when they join the server for the first time. This is useful for providing starter items, welcome packages, or introductory gear.

```yaml
kits-on-first-join:
  - "tools"
  - "starter"
```

:::warning
Ensure that the kits listed in `kits-on-first-join` actually exist. If a kit name does not match an existing kit definition, the first-join kit grant will silently fail for that entry.
:::

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/kit` | `kits` | `essentials.kit` | List available kits or claim a specific kit |
| `/showkit` | - | `essentials.kit.show` | Preview the contents of a kit without claiming it |
| `/kiteditor` | `keditor` | `essentials.kit.editor` | Open the GUI-based kit editor to modify an existing kit |
| `/kitcreate` | `kcreate` | `essentials.kit.create` | Create a new kit from your current inventory |
| `/kitdelete` | `kdelete` | `essentials.kit.delete` | Delete an existing kit permanently |
| `/kitgive` | `kgive` | `essentials.kit.give` | Give a kit to another player, bypassing their cooldown |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_has_kit_{name}%` | Returns `true` if the player has permission to use the specified kit |
| `%zessentials_user_kit_is_available_{name}%` | Returns `true` if the kit is currently available (no active cooldown) |
| `%zessentials_user_kit_time_until_available_{name}%` | Returns the remaining time until the kit becomes available, in a human-readable format |

Replace `{name}` with the actual kit name. For example, `%zessentials_user_kit_is_available_starter%` checks whether the `starter` kit is off cooldown.

For the full placeholder list, see [Placeholders](../placeholders).

---

## Example: Starter Kit with First-Join

A typical setup for a server that gives new players a starter kit:

**Module config** (`modules/kits/config.yml`):
```yaml
enable: true
display: INVENTORY
kits-on-first-join:
  - "starter"
```

Then create the kit in-game:
1. Place the desired starter items in your inventory.
2. Run `/kitcreate starter`.
3. Run `/kiteditor starter` to set the cooldown, permission, display name, and icon material.
