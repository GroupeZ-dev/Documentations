---
sidebar_position: 2
title: Installation
description: How to install and configure zSpawner on your Minecraft server
---

# Installation

This guide covers the installation and initial configuration of zSpawner.

## Requirements

Before installing, ensure your server meets these requirements:

| Requirement | Version | Status |
|-------------|---------|--------|
| Java | 17 or higher | **Required** |
| Minecraft | 1.13 or higher | **Required** |
| [zMenu](https://modrinth.com/plugin/zmenu) | Latest version | **Required** |
| [zShop](https://groupez.dev/) | Latest version | Optional |
| [zEssentials](https://modrinth.com/plugin/zessentials) | Latest version | Optional |
| [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) | Latest version | Optional |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Latest version | Optional |

### Supported Platforms

| Platform | Support |
|----------|---------|
| Paper | Recommended |
| Spigot | Supported |
| Purpur | Supported |
| Pufferfish | Supported |
| Folia | Supported |

:::tip Recommended
**Paper** is the recommended server platform. It offers the best performance and compatibility with zSpawner.
:::

## Installation Steps

### 1. Download the Plugin

Download zSpawner from one of these sources:
- [SpigotMC](https://www.spigotmc.org/resources/zspawner.69465/)
- [groupez.dev](https://groupez.dev/)

### 2. Install Dependencies

Install the **required** dependency:

1. **zMenu** - Download from [Modrinth](https://modrinth.com/plugin/zmenu) and place the `.jar` in your `plugins/` folder. zSpawner uses zMenu for all of its GUI interfaces.

Install any **optional** dependencies you need:

- **zShop** - Auto-sell functionality for virtual spawners
- **zEssentials** - Mailbox integration for item delivery when inventory is full
- **SuperiorSkyblock2** - Team-based access control for spawners

### 3. Install the Plugin

1. Stop your server
2. Place `zSpawner.jar` in your `plugins/` folder
3. Start your server
4. The plugin will generate all default configuration files

### 4. Verify Installation

Run `/zspawner` in-game. If the plugin is loaded correctly, it will open the spawner GUI. You can also check the server console for:

```
[zSpawner] Loading zSpawner v4.x.x
[zSpawner] Use zMenu
```

## File Structure

After first startup, zSpawner creates the following structure:

```
plugins/zSpawner/
├── config.yml                          # Main configuration
├── messages.yml                        # Localized messages
├── option-items.yml                    # Upgrade item definitions
└── inventories/
    ├── gui/
    │   └── spawners.yml                # GUI spawner interface
    ├── show.yml                        # Admin show spawners view
    └── virtual/
        ├── location-history.yml        # Location rental history
        ├── manage-location.yml         # Location management GUI
        ├── player-location.yml         # Player location rental
        └── virtual.yml                 # Virtual spawner interface
```

## Database Configuration

zSpawner supports three storage backends. Configure the storage section in `config.yml`.

### SQLite (Default)

SQLite is the default storage method and requires no additional configuration:

```yaml
storage: SQLITE
```

### MySQL

For larger servers with multiple instances:

```yaml
storage: MYSQL

database-configuration:
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zspawner
  table-prefix: "zspawner_"
  debug: false
```

### MariaDB

MariaDB is also supported with the same configuration as MySQL:

```yaml
storage: MYSQL

database-configuration:
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zspawner
  table-prefix: "zspawner_"
  debug: false
```

:::warning
Make sure to change the default database credentials before deploying to production.
:::

## First Configuration

After installation, here are the recommended first steps:

1. **Storage** - Choose your storage backend (`SQLITE` or `MYSQL`) in `config.yml`
2. **Spawner Items** - Customize spawner item names and lore in the `items` section
3. **Virtual Options** - Configure default virtual spawner settings in the `virtual` section
4. **Silk Touch** - Enable/disable silk touch spawner mining in the `silkSpawner` section
5. **Messages** - Customize plugin messages in `messages.yml`

See the [Configuration](./configuration/config) section for detailed options.

## Troubleshooting

### Plugin does not start

- Check that **Java 17+** is installed: `java -version`
- Verify that **zMenu** is installed and loads without errors
- Check the server console for error messages
- Ensure the `.jar` file is not corrupted by re-downloading it

### GUIs not opening

- Verify **zMenu** is installed and working properly
- Check that inventory files exist in `plugins/zSpawner/inventories/`
- Look for errors in the console when attempting to open a menu

### Database connection failed

- Verify your database credentials in `config.yml` are correct
- Ensure the MySQL/MariaDB server is running and accessible
- Check firewall settings if using a remote database
- Confirm the database exists and the user has proper permissions

### Spawners not spawning entities

- Check that the chunk is loaded
- Verify a player is within the required range
- For virtual spawners, check the spawner options (distance, delays)
- Enable debug mode: `enableDebug: true` to see more information

## Next Steps

- [Commands & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/config)
- [Virtual Spawners](./configuration/virtual-spawner)
