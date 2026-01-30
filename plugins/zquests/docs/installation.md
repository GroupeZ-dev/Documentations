---
sidebar_position: 2
title: Installation
description: How to download, install, and configure zQuests on your Minecraft server
---

# Installing zQuests

This guide will walk you through the process of installing zQuests on your Minecraft server.

## Requirements

Before installing zQuests, make sure your server meets the following requirements:

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.20.4 to 1.21.4 |
| Java | **Java 21** (required) |
| Server Software | Spigot, Paper, or Folia |
| zMenu | **Required** |

:::warning Required Dependency
**zMenu is required** for zQuests to work. Make sure to install [zMenu](https://modrinth.com/plugin/zmenu) before installing zQuests.
:::

:::tip Recommended Setup
For the best experience, we recommend using **Paper** or its forks. This enables MiniMessage formatting support and provides better performance.
:::

:::caution Modded Servers
Modded server software (Forge, Fabric with Bukkit compatibility layers) is **not supported**.
:::

## Download

You can download zQuests from:

- **GitHub**: [https://github.com/Maxlego08/zQuests](https://github.com/Maxlego08/zQuests)
- **Modrinth**: Check for releases on Modrinth
- **SpigotMC**: Available on SpigotMC

## Installation Steps

### Step 1: Install Dependencies

First, make sure you have the required plugins installed:

1. **zMenu** - Download from [Modrinth](https://modrinth.com/plugin/zmenu) or [SpigotMC](https://www.spigotmc.org/resources/zmenu.110402/)
2. **PlaceholderAPI** (Recommended) - Download from [SpigotMC](https://www.spigotmc.org/resources/placeholderapi.6245/)
   - For Folia servers, use the [Folia-compatible version](https://github.com/Anon8281/PlaceholderAPI/releases/tag/1.1)

### Step 2: Download zQuests

Download the latest version of `zQuests.jar` from one of the sources listed above.

### Step 3: Install the Plugin

1. Stop your Minecraft server if it's running
2. Place the `zQuests.jar` file in your server's `plugins/` folder
3. Start your server

### Step 4: Verify Installation

After starting your server, verify that zQuests loaded correctly:

1. Check the server console for:
   ```
   [zQuests] zQuests has been enabled!
   ```

2. Run the command `/zquests help` in-game or from console

### Step 5: Initial Configuration

After the first startup, zQuests will create the following folder structure:

```
plugins/zQuests/
├── config.yml                    # Main configuration file
├── messages.yml                  # Message translations
├── holograms.yml                 # Hologram configurations
├── waypoints.yml                 # Waypoint configurations
├── quests/                       # Quest definition files
│   ├── blocks.yml                # Block-related quests
│   ├── brew.yml                  # Brewing quests
│   ├── craft.yml                 # Crafting quests
│   ├── enchants.yml              # Enchanting quests
│   ├── entities.yml              # Entity-related quests
│   ├── farming.yml               # Farming quests
│   ├── fish.yml                  # Fishing quests
│   └── smelt.yml                 # Smelting quests
└── inventories/                  # zMenu inventory files
    └── quests.yml                # Default quest inventory
```

## Optional Dependencies

zQuests integrates with several plugins for enhanced functionality:

### Recommended Plugins

| Plugin | Purpose |
|--------|---------|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Display quest data in other plugins |
| [zEssentials](https://groupez.dev/) | Holograms and waypoints support |

### Economy Plugins

| Plugin | Integration |
|--------|-------------|
| [zShop](https://groupez.dev/) | SELL and PURCHASE quest types |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Economy rewards |

### Job Plugins

| Plugin | Integration |
|--------|-------------|
| [zJobs](https://groupez.dev/) | JOB_LEVEL and JOB_PRESTIGE quest types |

### Skyblock Plugins

| Plugin | Integration |
|--------|-------------|
| [SuperiorSkyBlock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) | ISLAND quest type |

### Block Tracking

| Plugin | Integration |
|--------|-------------|
| [BlockTracker](https://www.spigotmc.org/resources/blocktracker.94518/) | Track placed blocks for anti-exploit |

### Mob Stacker

| Plugin | Integration |
|--------|-------------|
| [WildStacker](https://www.spigotmc.org/resources/wildstacker.60648/) | Proper counting of stacked mobs |

## Database Configuration

zQuests supports multiple storage options:

### SQLite (Default)

SQLite is the default storage option and requires no additional configuration. It's suitable for small servers and testing.

```yaml
storage-type: SQLITE
```

:::warning SQLite Limitations
SQLite is recommended only for testing and small servers. Some features may have limited functionality with SQLite. For production servers, use MySQL or HikariCP.
:::

### MySQL

For better performance and full feature support, use MySQL:

```yaml
storage-type: MYSQL

database-configuration:
  table-prefix: "zquests_"
  host: 192.168.10.10
  port: 3306
  user: your_username
  password: 'your_password'
  database: zquests
  debug: false
```

### HikariCP (Recommended)

HikariCP provides connection pooling for optimal database performance:

```yaml
storage-type: HIKARICP

database-configuration:
  table-prefix: "zquests_"
  host: 192.168.10.10
  port: 3306
  user: your_username
  password: 'your_password'
  database: zquests
  debug: false
```

## Troubleshooting

### Plugin Not Loading

If zQuests doesn't appear in `/plugins`:

1. Check console for errors during startup
2. Verify zMenu is installed and loaded
3. Make sure you're using Java 21 or newer
4. Verify the JAR file isn't corrupted

### zMenu Not Found

If you see "zMenu not found" errors:

1. Make sure zMenu is in the plugins folder
2. Verify zMenu loads before zQuests (check load order)
3. Update both plugins to their latest versions

### Database Connection Failed

If database connection fails:

1. Verify database credentials are correct
2. Check that the database server is running
3. Ensure the database user has proper permissions
4. Check firewall settings

### Quests Not Tracking

If quest progress isn't being tracked:

1. Verify the quest is active for the player (`/zquests start <player> <quest>`)
2. Check that the quest type matches the action
3. Verify material/entity names are correct
4. Enable debug mode in config.yml to see detailed logs

## Updating zQuests

To update zQuests:

1. Download the latest version
2. Stop your server
3. Backup your `plugins/zQuests/` folder
4. Replace the old `zQuests.jar` with the new one
5. Start your server
6. Run `/zquests reload` if needed

:::warning Backup First
Always backup your configuration files before updating, especially the `quests/` folder containing your quest definitions.
:::

## Next Steps

Now that zQuests is installed, learn how to:

1. [Configure quests](./configurations/quests)
2. [Explore quest types](./configurations/quest-types)
3. [Set up rewards](./configurations/rewards)
4. [Use commands and permissions](./configurations/commands-permissions)
