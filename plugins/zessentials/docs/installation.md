---
sidebar_position: 2
title: Installation
description: How to install and configure zEssentials on your Minecraft server
---

# Installation

This guide covers the installation and initial configuration of zEssentials.

## Requirements

Before installing, ensure your server meets these requirements:

| Requirement | Version | Status |
|-------------|---------|--------|
| Java | 21 or higher | **Required** |
| Minecraft | 1.20.4 or higher | **Required** |
| [zMenu](https://modrinth.com/plugin/zmenu) | Latest version | **Required** |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Latest version | **Required** |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Latest version | Optional |
| [ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/) | Latest version | Optional |
| [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) | Latest version | Optional |
| [BentoBox](https://github.com/BentoBoxWorld/BentoBox) | Latest version | Optional |

### Supported Platforms

| Platform | Support |
|----------|---------|
| Paper | Recommended |
| Spigot | Supported |
| Purpur | Supported |
| Pufferfish | Supported |
| Folia | Supported (async threading) |

:::tip Recommended
**Paper** is the recommended server platform. It offers the best performance and compatibility with zEssentials.
:::

## Installation Steps

### 1. Download the Plugin

Download zEssentials from one of these sources:
- [Modrinth](https://modrinth.com/plugin/zessentials)
- [groupez.dev](https://groupez.dev/)
- Discord `#builds` channel for development versions

### 2. Install Dependencies

Install the **required** dependencies on your server:

1. **zMenu** - Download from [Modrinth](https://modrinth.com/plugin/zmenu) and place the `.jar` in your `plugins/` folder. zEssentials uses zMenu for all of its GUI interfaces.
2. **PlaceholderAPI** - Download from [SpigotMC](https://www.spigotmc.org/resources/placeholderapi.6245/) and place the `.jar` in your `plugins/` folder. Required for placeholder support across all modules.

Install any **optional** dependencies you need:

- **Vault** - Economy backend integration for the Economy module
- **ProtocolLib** - Packet-level features such as holograms and tab list manipulation
- **SuperiorSkyblock2** - Island-based permission checks for skyblock servers
- **BentoBox** - Island-based permission checks for BentoBox-powered skyblock servers

### 3. Install the Plugin

1. Stop your server
2. Place `zEssentials.jar` in your `plugins/` folder
3. Start your server
4. The plugin will generate all default configuration files and module configs

### 4. Verify Installation

Run `/essentials` in-game or from the console. If the plugin is loaded correctly, it will display version information and the list of enabled modules. You can also check the server console for:

```
[zEssentials] Loading zEssentials v1.x.x
[zEssentials] Main class: fr.maxlego08.essentials.ZEssentialsPlugin
[zEssentials] Successfully enabled!
```

## File Structure

After first startup, zEssentials creates the following structure:

```
plugins/zEssentials/
├── config.yml                          # Main configuration
├── storage.db                          # SQLite database (if using SQLite)
├── commands/
│   └── ...                             # Custom command definitions
├── modules/
│   ├── afk.yml                         # AFK detection settings
│   ├── announcements.yml               # Automatic announcements
│   ├── chat.yml                        # Chat formatting and channels
│   ├── compact.yml                     # Item compacting settings
│   ├── cooldown.yml                    # Global cooldown settings
│   ├── discord.yml                     # Discord webhook integration
│   ├── economy.yml                     # Economy and multi-currency
│   ├── fly.yml                         # Fly management
│   ├── freeze.yml                      # Player freeze settings
│   ├── home.yml                        # Player homes configuration
│   ├── hologram.yml                    # Hologram settings
│   ├── join-quit.yml                   # Join/quit messages
│   ├── kits.yml                        # Kit definitions and cooldowns
│   ├── mailbox.yml                     # Offline item delivery
│   ├── pay.yml                         # Player pay settings
│   ├── rules.yml                       # Server rules
│   ├── sanction.yml                    # Ban, mute, kick settings
│   ├── scoreboard.yml                  # Dynamic scoreboard
│   ├── teleportation.yml              # TPA, warps, spawn, RTP
│   ├── vault.yml                       # Player storage vaults
│   ├── vote.yml                        # Vote tracking and rewards
│   └── worldedit.yml                   # Built-in WorldEdit tools
├── inventories/
│   └── ...                             # zMenu inventory files
├── messages/
│   └── ...                             # Localized message files
└── kits/
    └── ...                             # Kit definition files
```

:::info
Each module file in `modules/` can be individually configured. Modules can be enabled or disabled without affecting other modules.
:::

## Database Configuration

zEssentials supports three storage backends. Configure the storage section in `config.yml`.

### SQLite (Default)

SQLite is the default storage method and requires no additional configuration. Best for single-server setups and testing:

```yaml
storage-type: SQLITE
```

The database file is stored at `plugins/zEssentials/storage.db`.

### MySQL / MariaDB

Recommended for production environments and multi-server setups:

```yaml
storage-type: MYSQL

database-configuration:
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zessentials
  table-prefix: zessentials_
  useSSL: false
```

### HikariCP

For high-performance environments with connection pooling:

```yaml
storage-type: HIKARICP

database-configuration:
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zessentials
  table-prefix: zessentials_
  useSSL: false
```

HikariCP provides optimized connection pooling out of the box, reducing connection overhead on high-traffic servers.

### Default Database Configuration Values

| Property | Default Value |
|----------|---------------|
| `host` | `192.168.10.10` |
| `port` | `3306` |
| `user` | `homestead` |
| `password` | `secret` |
| `database` | `zessentials` |
| `table-prefix` | `zessentials_` |

:::warning
Make sure to change the default database credentials before deploying to production. The default values are placeholders and should not be used in a live environment.
:::

## Redis Configuration

zEssentials supports Redis for real-time data synchronization across multiple servers. This is required if you want cross-server private messages, synchronized sanctions, shared economy data, and more.

Configure the Redis section in `config.yml`:

```yaml
redis-configuration:
  host: 127.0.0.1
  port: 6379
  password: ""
```

| Property | Description | Default |
|----------|-------------|---------|
| `host` | Redis server address | `127.0.0.1` |
| `port` | Redis server port | `6379` |
| `password` | Redis password (leave empty if none) | `""` |

## Server Type Configuration

zEssentials supports two server type modes that determine how the plugin handles cross-server communication:

```yaml
server-type: PAPER
```

### PAPER

The default mode for standalone servers or networks not using Redis:

```yaml
server-type: PAPER
```

- All data is stored and read locally
- No cross-server communication
- Best for single-server setups

### REDIS

Enable this mode for multi-server networks using Redis:

```yaml
server-type: REDIS
```

- Enables real-time data synchronization via Redis pub/sub
- Synchronized player data, sanctions, economy, and messages across all servers
- Requires a valid Redis configuration (see [Redis Configuration](#redis-configuration))
- Requires MySQL or HikariCP as the storage type (SQLite is not supported in multi-server mode)

:::tip
When using `REDIS` server type, make sure all servers in your network share the same MySQL database **and** the same Redis instance for full synchronization.
:::

## First Configuration

After installation, here are the recommended first steps:

1. **Storage** - Choose your storage backend (`SQLITE`, `MYSQL`, or `HIKARICP`) in `config.yml`
2. **Modules** - Review and enable/disable modules in the `modules/` directory based on your needs
3. **Economy** - If using the Economy module, configure it in `modules/economy.yml` and ensure Vault is installed
4. **Homes** - Set home limits per permission group in `modules/home.yml`
5. **Kits** - Create your server kits in `modules/kits.yml` and the `kits/` directory
6. **Messages** - Customize plugin messages in the `messages/` directory

See the [Configuration](./configuration/main-config) section for detailed options.

## Troubleshooting

### Plugin does not start

- Check that **Java 21+** is installed: `java -version`
- Verify that **zMenu** is installed and loads without errors
- Verify that **PlaceholderAPI** is installed and loads without errors
- Check the server console for error messages referencing `fr.maxlego08.essentials.ZEssentialsPlugin`
- Ensure the `.jar` file is not corrupted by re-downloading it

### Modules not loading

- Verify the module file exists in `plugins/zEssentials/modules/`
- Check that the module is set to `enabled: true` in its configuration file
- Look for errors in the console that reference the specific module name
- Ensure all required dependencies for that module are installed (e.g., ProtocolLib for holograms)

### Database connection failed

- Verify your database credentials in `config.yml` are correct
- Ensure the MySQL/MariaDB server is running and accessible from the Minecraft server
- Check firewall settings if using a remote database
- Confirm the database specified in the configuration exists and the user has proper permissions
- For HikariCP issues, check that the JDBC driver is compatible with your database version

### Redis connection failed

- Verify the Redis server is running: `redis-cli ping` should return `PONG`
- Check the host, port, and password in your `redis-configuration` section
- Ensure no firewall is blocking the Redis port
- Confirm `server-type` is set to `REDIS` in `config.yml`

### Economy not working

- Ensure **Vault** is installed and loaded before zEssentials
- Verify an economy provider plugin (EssentialsX, CMI, etc.) is registered with Vault
- Check the Economy module is enabled in `modules/economy.yml`
- Run `/vault-info` to verify Vault detects your economy provider

### PlaceholderAPI placeholders not working

- Ensure PlaceholderAPI is installed and loaded
- Run `/papi list` to check if the zEssentials expansion is registered
- Verify the placeholder syntax is correct (e.g., `%zessentials_player_balance%`)
- Reload PlaceholderAPI with `/papi reload`

### Interfaces not appearing

- Verify **zMenu** is installed and working properly
- Check that inventory files exist in `plugins/zEssentials/inventories/`
- Look for errors in the console when attempting to open a menu
- Ensure zMenu is up to date with the latest version

## Next Steps

- [Commands & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/main-config)
- [Database](./database)
- [API & Events](./development/events)
