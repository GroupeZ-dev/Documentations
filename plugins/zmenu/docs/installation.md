---
sidebar_position: 2
title: Installing zMenu
description: How to download, install, and configure zMenu on your Minecraft server
---

# Installing zMenu

This guide will walk you through the process of installing zMenu on your Minecraft server.

## Requirements

Before installing zMenu, make sure your server meets the following requirements:

| Requirement | Minimum Version |
|-------------|-----------------|
| Minecraft | 1.8.x or higher |
| Java | Java 8+ (Java 21 recommended) |
| Server Software | Spigot, Paper, Purpur, Pufferfish, or Folia |

:::tip Recommended Setup
For the best experience, we recommend using **Paper** or **Purpur** with **Java 21**. This enables MiniMessage formatting support and provides better performance.
:::

## Download

You can download zMenu from the following sources:

- **SpigotMC** (Primary): [https://www.spigotmc.org/resources/zmenu.110402/](https://www.spigotmc.org/resources/zmenu.110402/)
- **GitHub Releases**: [https://github.com/Maxlego08/zMenu/releases](https://github.com/Maxlego08/zMenu/releases)
- **Modrinth**: [https://modrinth.com/plugin/zmenu](https://modrinth.com/plugin/zmenu)

## Installation Steps

### Step 1: Download the Plugin

Download the latest version of `zMenu.jar` from one of the sources listed above.

### Step 2: Install the Plugin

1. Stop your Minecraft server if it's running
2. Place the `zMenu.jar` file in your server's `plugins/` folder
3. Start your server

### Step 3: Verify Installation

After starting your server, verify that zMenu loaded correctly:

1. Check the server console for:
   ```
   [zMenu] zMenu has been enabled!
   ```

2. Run the command `/zm version` in-game or from console to see version information

### Step 4: Initial Configuration

After the first startup, zMenu will create the following folder structure:

```
plugins/zMenu/
├── config.yml                    # Main configuration file
├── global-placeholders.yml       # Global placeholder values
├── commands/
│   └── commands.yml              # Custom command definitions
├── inventories/
│   ├── basic_inventory.yml       # Example inventory
│   ├── advanced_inventory.yml    # Advanced example
│   └── pro_inventory.yml         # Pro example
├── patterns/
│   └── pattern_example.yml       # Example pattern
├── items/
│   └── default-items.yml         # Reusable item definitions
├── actions_patterns/
│   └── default-actions.yml       # Default action patterns
└── dialogs/                      # Dialog templates (1.20.5+)
```

## Optional Dependencies

zMenu works standalone but integrates with many popular plugins for enhanced functionality:

### Recommended Plugins

| Plugin | Purpose |
|--------|---------|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Display dynamic values in items and messages |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Economy integration |
| [LuckPerms](https://luckperms.net/) | Permission-based requirements |

### Item Plugins (Optional)

These plugins allow you to use custom items in your menus:

| Plugin | Integration |
|--------|-------------|
| [ItemsAdder](https://www.spigotmc.org/resources/itemsadder.73355/) | Custom items and textures |
| [Oraxen](https://www.spigotmc.org/resources/oraxen.72448/) | Custom items and models |
| [HeadDatabase](https://www.spigotmc.org/resources/head-database.14280/) | Custom player heads |
| [Slimefun](https://github.com/Slimefun/Slimefun4) | Slimefun items |
| [MythicMobs](https://www.spigotmc.org/resources/mythicmobs.5702/) | MythicMobs items |
| [ExecutableItems](https://www.spigotmc.org/resources/executableitems.77578/) | ExecutableItems support |

### Other Integrations

| Plugin | Integration |
|--------|-------------|
| [Jobs Reborn](https://www.spigotmc.org/resources/jobs-reborn.4216/) | Job level requirements |
| [zHead](https://www.spigotmc.org/resources/zhead.115717/) | Custom head textures |
| [packetevents](https://www.spigotmc.org/resources/packetevents-api.80279/) | Required for dialog system (1.20.5+) |

## Configuration Files

### config.yml

The main configuration file controls global plugin settings. Here's an overview of key options:

```yaml
# Enable debug mode for troubleshooting
enable-debug: false

# Database settings (SQLITE, MYSQL, MARIADB, or NONE)
storage-type: SQLITE

# Enable MiniMessage formatting (Paper/Purpur only)
enable-mini-message-format: true

# Cache settings for performance
enable-cache-item-stack: true
enable-cache-placeholder-api: false

# Anti-dupe protection
enable-anti-dupe: true

# Click cooldown to prevent spam
enable-cooldown-click: true
cooldown-click-milliseconds: 100

# Default inventory opened by main menu button
main-menu: "example"
```

See the [config.yml documentation](./configurations/config-yml) for all available options.

## Troubleshooting

### Plugin Not Loading

If zMenu doesn't appear in `/plugins`:

1. Check console for errors during startup
2. Verify the JAR file isn't corrupted (re-download if needed)
3. Make sure you're using a compatible server version

### Configuration Errors

If you see YAML parsing errors:

1. Use a YAML validator like [YAML Lint](http://www.yamllint.com/)
2. Check for incorrect indentation (use spaces, not tabs)
3. Ensure special characters are quoted properly

### Placeholders Not Working

If PlaceholderAPI placeholders don't work:

1. Make sure PlaceholderAPI is installed
2. Install the required expansion: `/papi ecloud download <expansion>`
3. Reload PlaceholderAPI: `/papi reload`

## Updating zMenu

To update zMenu:

1. Download the latest version
2. Stop your server
3. Replace the old `zMenu.jar` with the new one
4. Start your server
5. Run `/zm reload` if configurations haven't changed

:::warning Backup First
Always backup your `plugins/zMenu/` folder before updating, especially if you've customized configurations.
:::

## Next Steps

Now that zMenu is installed, learn how to:

1. [Understand the configuration system](./configurations/informations)
2. [Create your first inventory](./configurations/inventories/create-inventory)
3. [Use commands and permissions](./configurations/commands-permissions)
