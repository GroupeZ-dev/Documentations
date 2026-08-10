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

| Command                                                    | Permission            | Description                                |
|------------------------------------------------------------|-----------------------|--------------------------------------------|
| `/zm`                                                      | `zmenu.use`           | Display the help menu                      |
| `/zm version`                                              | `zmenu.version`       | Display plugin version information         |
| `/zm list`                                                 | `zmenu.list`          | List all loaded inventories                |
| `/zm inventories`                                          | `zmenu.inventories`   | List all loaded inventories (alias)        |
| `/zm documentation`                                        | `zmenu.documentation` | View documentation links                   |
| `/zm description`                                          | `zmenu.description`   | Display plugin description                 |
| `/zm addons`                                               | `zmenu.addons`        | List official addons                       |
| `/zm contributors`                                         | `zmenu.contributors`  | Show plugin contributors                   |
| `/zm website`                                              | `zmenu.website`       | Open the plugin website link               |
| `/zm create <file name> <inventory size> <inventory name>` | `zmenu.create`        | Create a new inventory file                |
| `/zm editor`                                               | `zmenu.editor`        | Send a link to the online inventory editor |


### Inventory Commands

| Command                                           | Permission              | Description                              |
|---------------------------------------------------|-------------------------|------------------------------------------|
| `/zm open <inventory>`                            | `zmenu.open`            | Open an inventory for yourself           |
| `/zm open <inventory> <player>`                   | `zmenu.open`            | Open an inventory for another player     |
| `/zm open <inventory> <player> <args...>`         | `zmenu.open`            | Open inventory with arguments            |
| `/zm openMainMenu [<player>] [<display message>]` | `zmenu.open.main.menu`  | Open the main menu with optional message |

**Examples:**
```
/zm open shop
/zm open shop Notch
/zm open shop Notch "Welcome to the shop!"
```

### Reload Commands

| Command                       | Permission              | Description                         |
|-------------------------------|-------------------------|-------------------------------------|
| `/zm reload`                  | `zmenu.reload`          | Reload all configurations           |
| `/zm reload config`           | `zmenu.reload`          | Reload config.yml and messages only |
| `/zm reload inventory`        | `zmenu.reload`          | Reload all inventories              |
| `/zm reload inventory <name>` | `zmenu.reload`          | Reload a specific inventory         |
| `/zm reload command`          | `zmenu.reload`          | Reload all commands                 |
| `/zm reload command <name>`   | `zmenu.reload`          | Reload a specific command           |
| `/zm reload dialog`           | `zmenu.reload.dialog`   | Reload all dialog files             |

**Examples:**
```
/zm reload
/zm reload inventory shop
/zm reload command warp
```

### Item Commands

| Command                                 | Permission             | Description                      |
|-----------------------------------------|------------------------|----------------------------------|
| `/zm giveitem <inventory> <player>`     | `zmenu.give.item`      | Give a clickable item to player  |
| `/zm giveopenitem <inventory> <player>` | `zmenu.give.open.item` | Give menu-opening item to player |
| `/zm save <name>`                       | `zmenu.save`           | Save held item as inventory      |

### Player Data Commands

| Command                                        | Permission                    | Description                            |
|------------------------------------------------|-------------------------------|----------------------------------------|
| `/zm players add <player> <key> <value>`       | `zmenu.players.add`           | Add a number to a player data value    |
| `/zm players set <player> <key> <value>`       | `zmenu.players.set`           | Set a player data value                |
| `/zm players get <player> <key>`               | `zmenu.players.get`           | Get a player data value                |
| `/zm players subtract <player> <key> <number>` | `zmenu.players.subtract`      | Subtract a number from a player data value |
| `/zm players remove <player> <key>`            | `zmenu.players.remove`        | Remove a player data key               |
| `/zm players removeall <key>`                  | `zmenu.players.remove.all`    | Remove key from all players            |
| `/zm players clearplayer <player>`             | `zmenu.players.clear.player`  | Clear all data for one player          |
| `/zm players clearall`                         | `zmenu.players.clear.all`     | Clear all data for all players         |
| `/zm players keys <player>`                    | `zmenu.players.keys`          | List all keys for a player             |
| `/zm players convert`                          | `zmenu.players.convert`       | Convert JSON data to SQL               |

**Examples:**
```
/zm players set Notch coins 100
/zm players add Notch coins 50
/zm players subtract Notch coins 10
/zm players get Notch coins
/zm players keys Notch
/zm players clearplayer Notch
```

### Dialog Commands

| Command                                        | Permission                  | Description                              |
|------------------------------------------------|-----------------------------|------------------------------------------|
| `/zm dialog open <dialog>`                     | `zmenu.dialog`              | Open a dialog for yourself               |
| `/zm dialog open <dialog> <player>`            | `zmenu.dialog`              | Open a dialog for a player               |
| `/zm dialog open config <dialog>`              | `zmenu.open.dialog.config`  | Open a dialog in config/debug mode       |

### Bedrock Commands

| Command                                                     | Permission             | Description                    |
|-------------------------------------------------------------|------------------------|--------------------------------|
| `/zm bedrock open <name> [player] [display message]`        | `zmenu.open.bedrock`   | Open a Bedrock form            |
| `/zm bedrock reload`                                        | `zmenu.reload.bedrock` | Reload all Bedrock form files  |

### Live Sync Commands

These commands connect your server to the [Minecraft Inventory Builder](https://minecraft-inventory-builder.com) website for instant hot-reload of inventories.

| Command              | Permission           | Description                                                  |
|----------------------|----------------------|--------------------------------------------------------------|
| `/zm login`          | `zmenu.login`        | Start device-authorization flow to link server to the website |
| `/zm login <token>`  | `zmenu.login`        | Link server using a token (legacy)                           |
| `/zm connect`        | `zmenu.connect`      | Open the live sync WebSocket connection                      |
| `/zm disconnect`     | `zmenu.disconnect`   | Close the live sync connection                               |
| `/zm unlink`         | `zmenu.unlink`       | Force-detach server from the website and clear credentials   |
| `/zm download <url> [force]` | `zmenu.download` | Download an inventory from a URL (requires `enable-download-command: true` in config) |

**Live sync workflow:**
```
/zm login          # Approve the code shown on the website
/zm connect        # Open the WebSocket link
# Now "Sync to Server" on the web builder reloads inventory live
/zm disconnect     # Close the connection when done
```

### Utility Commands

| Command        | Permission      | Description                               |
|----------------|-----------------|-------------------------------------------|
| `/zm convert`  | `zmenu.convert` | Convert configurations from other plugins |
| `/zm testdupe` | `zmenu.dupe`    | Test the anti-dupe system                 |
| `/zm dumplog`  | `zmenu.dumplog` | Export debug logs                         |

## Permission List

### Core Permissions

| Permission              | Description                        | Default |
|-------------------------|------------------------------------|---------|
| `zmenu.use`             | Access to basic commands           | true    |
| `zmenu.open`            | Open inventories                   | op      |
| `zmenu.open.main.menu`  | Open the main menu                 | op      |
| `zmenu.open.bypass`     | Bypass inventory open requirements | op      |
| `zmenu.reload`          | Reload configurations              | op      |
| `zmenu.reload.dialog`   | Reload dialog files                | op      |
| `zmenu.create`          | Create new inventories             | op      |
| `zmenu.editor`          | Access inventory editor            | op      |
| `zmenu.inventories`     | List all loaded inventories        | op      |
| `zmenu.description`     | View plugin description            | op      |
| `zmenu.website`         | Open the plugin website link       | op      |

### Item Permissions

| Permission             | Description               | Default |
|------------------------|---------------------------|---------|
| `zmenu.give.item`      | Give clickable items      | op      |
| `zmenu.give.open.item` | Give menu-opening items   | op      |
| `zmenu.save`           | Save items as inventories | op      |

### Player Data Permissions

Each player data sub-command has its own permission node (split in 1.1.1.6):

| Permission                   | Description                        | Default |
|------------------------------|------------------------------------|---------|
| `zmenu.players.add`          | Add to player data value           | op      |
| `zmenu.players.set`          | Set player data value              | op      |
| `zmenu.players.get`          | Get player data value              | op      |
| `zmenu.players.subtract`     | Subtract from player data value    | op      |
| `zmenu.players.remove`       | Remove a player data key           | op      |
| `zmenu.players.remove.all`   | Remove a key from all players      | op      |
| `zmenu.players.clear.player` | Clear all data for one player      | op      |
| `zmenu.players.clear.all`    | Clear all data for all players     | op      |
| `zmenu.players.keys`         | List all keys for a player         | op      |
| `zmenu.players.convert`      | Convert JSON data to SQL           | op      |

### Dialog Permissions

| Permission                  | Description                              | Default |
|-----------------------------|------------------------------------------|---------|
| `zmenu.dialog`              | Open dialogs                             | op      |
| `zmenu.open.dialog.config`  | Open dialog in config/debug mode         | op      |

### Bedrock Permissions

| Permission              | Description               | Default |
|-------------------------|---------------------------|---------|
| `zmenu.open.bedrock`    | Open Bedrock forms        | op      |
| `zmenu.reload.bedrock`  | Reload Bedrock form files | op      |

### Live Sync Permissions

| Permission          | Description                                  | Default |
|---------------------|----------------------------------------------|---------|
| `zmenu.login`       | Link server to the Inventory Builder website | op      |
| `zmenu.connect`     | Open live sync WebSocket connection          | op      |
| `zmenu.disconnect`  | Close live sync connection                   | op      |
| `zmenu.unlink`      | Force-detach server from website             | op      |
| `zmenu.download`    | Download inventory from a URL                | op      |

### Utility Permissions

| Permission            | Description                | Default |
|-----------------------|----------------------------|---------|
| `zmenu.convert`       | Convert from other plugins | op      |
| `zmenu.dupe`          | Test anti-dupe system      | op      |
| `zmenu.documentation` | View documentation         | op      |
| `zmenu.dumplog`       | Export debug logs          | op      |

## Custom Command Permissions

When you create custom commands in `commands/commands.yml`, you can define custom permissions:

```yaml
commands:
  shop:
    command: shop
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
