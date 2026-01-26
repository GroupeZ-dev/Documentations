---
sidebar_position: 2
title: Commands & Permissions
description: All zMenu commands and permissions
---

# Commands & Permissions

This page lists all available commands and permissions in zMenu.

## Main Command

The main command is `/zm` (alias: `/zmenu`).

**Base Permission**: `zmenu.use`

## Command List

### General Commands

| Command | Permission | Description |
|---------|-----------|-------------|
| `/zm` | `zmenu.use` | Display the help menu |
| `/zm version` | - | Display plugin version information |
| `/zm list` | `zmenu.use` | List all loaded inventories |
| `/zm documentation` | `zmenu.documentation` | View documentation links |
| `/zm addons` | `zmenu.use` | List official addons |
| `/zm contributors` | `zmenu.use` | Show plugin contributors |

### Inventory Commands

| Command | Permission | Description |
|---------|-----------|-------------|
| `/zm open <inventory>` | `zmenu.open` | Open an inventory for yourself |
| `/zm open <inventory> <player>` | `zmenu.open` | Open an inventory for another player |
| `/zm open <inventory> <player> <args...>` | `zmenu.open` | Open inventory with arguments |
| `/zm create [name]` | `zmenu.create` | Create a new inventory from template |
| `/zm editor [name]` | `zmenu.editor` | Open the inventory editor |

**Examples:**
```
/zm open shop
/zm open shop Notch
/zm open shop Notch "Welcome to the shop!"
```

### Reload Commands

| Command | Permission | Description |
|---------|-----------|-------------|
| `/zm reload` | `zmenu.reload` | Reload all configurations |
| `/zm reload config` | `zmenu.reload` | Reload config.yml and messages only |
| `/zm reload inventory` | `zmenu.reload` | Reload all inventories |
| `/zm reload inventory <name>` | `zmenu.reload` | Reload a specific inventory |
| `/zm reload command` | `zmenu.reload` | Reload all commands |
| `/zm reload command <name>` | `zmenu.reload` | Reload a specific command |

**Examples:**
```
/zm reload
/zm reload inventory shop
/zm reload command warp
```

### Item Commands

| Command | Permission | Description |
|---------|-----------|-------------|
| `/zm giveitem <inventory> <player>` | `zmenu.giveitem` | Give a clickable item to player |
| `/zm giveopenitem <inventory> <player>` | `zmenu.giveopenitem` | Give menu-opening item to player |
| `/zm save <name>` | `zmenu.save` | Save held item as inventory |

### Player Data Commands

| Command | Permission | Description |
|---------|-----------|-------------|
| `/zm players add <player> <key> <value>` | `zmenu.players` | Add value to player data |
| `/zm players set <player> <key> <value>` | `zmenu.players` | Set player data value |
| `/zm players get <player> <key>` | `zmenu.players` | Get player data value |
| `/zm players remove <player> <key>` | `zmenu.players` | Remove player data key |
| `/zm players removeall <key>` | `zmenu.players` | Remove key from all players |
| `/zm players keys <player>` | `zmenu.players` | List all keys for a player |
| `/zm players convert` | `zmenu.players` | Convert JSON data to SQL |

**Examples:**
```
/zm players set Notch coins 100
/zm players add Notch coins 50
/zm players get Notch coins
/zm players keys Notch
```

### Dialog Commands

| Command | Permission | Description |
|---------|-----------|-------------|
| `/zm dialog open <dialog>` | `zmenu.dialog` | Open a dialog for yourself |
| `/zm dialog open <dialog> <player>` | `zmenu.dialog` | Open a dialog for a player |

### Utility Commands

| Command | Permission | Description |
|---------|-----------|-------------|
| `/zm convert` | `zmenu.convert` | Convert configurations from other plugins |
| `/zm testdupe` | `zmenu.dupe` | Test the anti-dupe system |
| `/zm dumplog` | `zmenu.dumplog` | Export debug logs |

## Permission List

### Core Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zmenu.use` | Access to basic commands | true |
| `zmenu.open` | Open inventories | op |
| `zmenu.open.bypass` | Bypass inventory open requirements | op |
| `zmenu.reload` | Reload configurations | op |
| `zmenu.create` | Create new inventories | op |
| `zmenu.editor` | Access inventory editor | op |

### Item Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zmenu.giveitem` | Give clickable items | op |
| `zmenu.giveopenitem` | Give menu-opening items | op |
| `zmenu.save` | Save items as inventories | op |

### Player Data Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zmenu.players` | Manage player data | op |

### Utility Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zmenu.convert` | Convert from other plugins | op |
| `zmenu.dupe` | Test anti-dupe system | op |
| `zmenu.documentation` | View documentation | op |
| `zmenu.dialog` | Open dialogs | op |
| `zmenu.dumplog` | Export debug logs | op |

## Custom Command Permissions

When you create custom commands in `commands/commands.yml`, you can define custom permissions:

```yaml
commands:
  shop:
    command: /shop
    inventory: shop_menu
    permission: myserver.shop
    aliases:
      - store
      - market
```

Players will need the `myserver.shop` permission to use `/shop`.

## Inventory-Specific Permissions

You can require specific permissions to open inventories using view requirements:

```yaml
# In your inventory file
view-requirement:
  requirements:
    - type: permission
      permission: "myserver.vip.menu"
      deny:
        - type: message
          messages:
            - "&cYou need VIP to access this menu!"
```

## Admin Permission

For server administrators, you can grant all zMenu permissions with:

```
zmenu.*
```

This grants access to all zMenu commands.

## LuckPerms Examples

Grant basic usage:
```
/lp user <player> permission set zmenu.use true
```

Grant all admin permissions:
```
/lp group admin permission set zmenu.* true
```

Grant specific inventory access:
```
/lp group vip permission set myserver.vip.menu true
```

## Permission Plugins

zMenu works with any permission plugin that supports Bukkit permissions:

- LuckPerms (Recommended)
- PermissionsEx
- GroupManager
- UltraPermissions
- And many more

## Next Steps

- Learn about [Placeholders](./placeholders)
- Create [Custom Commands](./custom-commands)
- Set up [Player Data](./player-data) for persistent storage
