---
sidebar_position: 7
title: Home Module
description: Player home system with permission-based limits
---

# Home Module

**File:** `modules/home/config.yml`

The Home module allows players to set, teleport to, and manage personal home locations. The maximum number of homes is controlled through permission-based limits, and the module supports multiple display modes for the home list, configurable name validation, world restrictions, and confirmation prompts for overwriting or deleting homes.

---

## Configuration

```yaml
enable: true

# Permission-based home limits
# The plugin checks each permission from top to bottom and uses the first match
permissions:
  - permission: "essentials.home.default"
    amount: 3
  - permission: "essentials.home.vip"
    amount: 5
  - permission: "essentials.home.staff"
    amount: 10

# Display mode for the /home list
# Options: IN_LINE, INVENTORY, INVENTORY_DONUT, MULTI_LINE
home-display: MULTI_LINE

# Regex pattern for validating home names
home-regex: "[a-zA-Z0-9]+"

# Maximum length for home names
home-name-max: 16

# Minimum length for home names
home-name-min: 1

# Worlds where players cannot set homes
disable-worlds:
  - "world_event"

# Require confirmation when overwriting an existing home
home-overwrite-confirm: true

# Require confirmation when deleting a home
home-delete-confirm: true

# How permission amounts are evaluated: MAX or STACK
# MAX: Uses the highest matching permission amount
# STACK: Adds all matching permission amounts together
home-usage-type: MAX

# Default material icon for homes in the GUI
default-home-material: BLUE_BED
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Home module |
| `home-display` | String | `MULTI_LINE` | Display mode for the home list. Options: `IN_LINE` (single line), `INVENTORY` (chest GUI), `INVENTORY_DONUT` (donut-style GUI layout), `MULTI_LINE` (one home per line in chat) |
| `home-regex` | String | `[a-zA-Z0-9]+` | Regular expression pattern that home names must match. The default allows only alphanumeric characters |
| `home-name-max` | Integer | `16` | Maximum number of characters allowed in a home name |
| `home-name-min` | Integer | `1` | Minimum number of characters required in a home name |
| `disable-worlds` | List of Strings | `[world_event]` | List of world names where players are not allowed to set homes |
| `home-overwrite-confirm` | Boolean | `true` | If `true`, players must confirm with `/sethomeconfirm` when setting a home that already exists (overwriting) |
| `home-delete-confirm` | Boolean | `true` | If `true`, players must confirm with `/delhomeconfirm` when deleting a home |
| `home-usage-type` | String | `MAX` | How permission-based home limits are calculated. `MAX` uses the highest single matching permission. `STACK` adds all matching permission amounts together |
| `default-home-material` | String | `BLUE_BED` | The Minecraft material used as the default icon for homes in the inventory GUI display modes |

### Permission Entry Properties

Each entry in the `permissions` list defines a home limit for players with a specific permission:

| Property | Type | Description |
|----------|------|-------------|
| `permission` | String | The permission node to check on the player |
| `amount` | Integer | The number of homes granted by this permission |

:::info Home Usage Types
- **MAX**: The plugin checks all permissions and uses the **highest** matching amount. A player with both `essentials.home.default` (3) and `essentials.home.vip` (5) would have a maximum of **5** homes.
- **STACK**: The plugin **adds** all matching permission amounts together. The same player would have **8** homes (3 + 5).
:::

---

## Display Modes

The `home-display` option controls how the home list is presented to the player:

| Mode | Description |
|------|-------------|
| `IN_LINE` | Displays all homes in a single chat line, separated by commas or a delimiter |
| `MULTI_LINE` | Displays each home on its own chat line with clickable teleport actions |
| `INVENTORY` | Opens a chest-style GUI inventory where each home is represented by an item |
| `INVENTORY_DONUT` | Opens a GUI inventory with homes arranged in a donut (ring) pattern around the center |

:::tip
The `INVENTORY` and `INVENTORY_DONUT` modes use [zMenu](https://modrinth.com/plugin/zmenu) for rendering. The `default-home-material` option controls the item icon used for each home in these GUI modes.
:::

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/home` | `h`, `homes` | `essentials.home` | Teleport to a home or view your home list |
| `/sethome` | `hcreate`, `hc` | `essentials.set.home` | Create a new home at your current location |
| `/sethomeconfirm` | - | `essentials.set.home.confirm` | Confirm overwriting an existing home |
| `/delhome` | `hdelete`, `hd` | `essentials.del.home` | Delete a home |
| `/delhomeconfirm` | - | `essentials.del.home.confirm` | Confirm home deletion |
| `/home-list` | - | `essentials.home` | List all of your homes |

---

## Related Permissions

| Permission | Description |
|------------|-------------|
| `essentials.home` | Allows using `/home` and viewing the home list |
| `essentials.set.home` | Allows creating homes with `/sethome` |
| `essentials.set.home.confirm` | Allows confirming home overwrites |
| `essentials.del.home` | Allows deleting homes with `/delhome` |
| `essentials.del.home.confirm` | Allows confirming home deletion |
| `essentials.home.default` | Grants 3 home slots (configurable) |
| `essentials.home.vip` | Grants 5 home slots (configurable) |
| `essentials.home.staff` | Grants 10 home slots (configurable) |

:::warning
Permission nodes for home limits (e.g., `essentials.home.default`, `essentials.home.vip`) are fully configurable in the `permissions` list. The values above are the defaults. Changing the permission name in the configuration changes which permission is checked.
:::

---

## Related Placeholders

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_home_count%` | Number of homes the player currently has | Integer |
| `%zessentials_home_max%` | Maximum number of homes the player is allowed | Integer |
| `%zessentials_home_exist_{name}%` | Returns `true` if a home with the given name exists | Boolean |
| `%zessentials_home_delete%` | The name of the home being deleted (used in confirmation GUIs) | String |

**Example:** Display home usage in a scoreboard:
```
Homes: %zessentials_home_count%/%zessentials_home_max%
```

**Example:** Check if a home named `base` exists:
```
%zessentials_home_exist_base%
```
