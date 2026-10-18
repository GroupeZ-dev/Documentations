---
title: Installation
description: How to install and configure zEssentials on your Minecraft server
---

# Installation

This guide covers the installation and initial configuration of zEssentials.

## Requirements

Before installing, ensure your server meets these requirements:

| Requirement | Version | Status |
|-------------|---------|--------|
| Server software | **Paper** (or a Paper fork) 1.20.6 or higher | **Required** |
| Java | 21 or higher (**25** for Minecraft 26.x) | **Required** |
| [zMenu](https://modrinth.com/plugin/zmenu) | Latest version | **Required** |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Latest version | **Required** |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Latest version | Optional |
| [WorldGuard](https://enginehub.org/worldguard) | Latest version | Optional |
| [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) | Latest version | Optional |
| [BentoBox](https://github.com/BentoBoxWorld/BentoBox) | Latest version | Optional |
| [NuVotifier](https://www.spigotmc.org/resources/nuvotifier.13449/) | Latest version | Optional |
| [BlockTracker](https://github.com/Krakenied/BlockTracker) | Latest version | Optional |
| [MythicMobs](https://www.spigotmc.org/resources/mythicmobs.5702/) | Latest version | Optional |
| NChat | Latest version | Optional |
| [ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/) | Latest version | Optional |
| [AxVaults](https://www.spigotmc.org/resources/axvaults.103862/) / PlayerVaults | Latest version | Optional (data migration only) |

### Supported Versions

zEssentials ships one NMS adapter per Minecraft version. The following versions are supported:

| Minecraft | Java |
|-----------|------|
| 1.20.6 | 21+ |
| 1.21, 1.21.1, 1.21.3, 1.21.4, 1.21.5, 1.21.6, 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11 | 21+ |
| 26.2 | 25+ |

<CalloutContainer type="info">

<CalloutTitle>Mojang mappings</CalloutTitle>

<CalloutDescription>
Since Minecraft 26.1, Paper no longer reobfuscates plugins to Spigot mappings. zEssentials is therefore built with **Mojang mappings**, which can only be loaded by Paper **1.20.5 or newer**. Minecraft **1.20.4 and older are no longer supported**. Minecraft 26.x uses year-based versioning (26.2 is the second release of 2026) and requires **Java 25**.
</CalloutDescription>

</CalloutContainer>

### Supported Platforms

| Platform | Support |
|----------|---------|
| Paper | **Recommended** |
| Purpur | Supported (Paper fork) |
| Pufferfish | Supported (Paper fork) |
| Folia | Supported (regionised threading) |
| Spigot / CraftBukkit | **Not supported** |

<CalloutContainer type="error">

<CalloutTitle>Paper is required</CalloutTitle>

<CalloutDescription>
zEssentials is a **Paper-only** plugin. The JAR contains a `paper-plugin.yml`, which Paper (and its forks) loads in priority.

The JAR also contains a minimal `plugin.yml` that is only used by Spigot. On Spigot, zEssentials stays **completely inactive** (no commands, no modules, no API): it only logs a warning in the console and, when a player with the `zessentials.paper.warning` permission (operators by default) joins, tells them that the server must run Paper. Download Paper at [papermc.io/downloads](https://papermc.io/downloads).
</CalloutDescription>

</CalloutContainer>

## Installation Steps

### 1. Download the Plugin

Download zEssentials from one of these sources:
- [Modrinth](https://modrinth.com/plugin/zessentials)
- [groupez.dev](https://groupez.dev/resources/zessentials.325/)
- Discord `#builds` channel for development versions

### 2. Install Dependencies

Install the **required** dependencies on your server:

1. **zMenu** - Download from [Modrinth](https://modrinth.com/plugin/zmenu) and place the `.jar` in your `plugins/` folder. zEssentials uses zMenu for all of its GUI interfaces.
2. **PlaceholderAPI** - Download from [SpigotMC](https://www.spigotmc.org/resources/placeholderapi.6245/) and place the `.jar` in your `plugins/` folder. Required for placeholder support across all modules.

Both are declared as required server dependencies in `paper-plugin.yml`: Paper loads them **before** zEssentials and refuses to load zEssentials if one of them is missing.

Install any **optional** dependencies you need:

- **Vault** - Exposes the zEssentials economy to other plugins through the Vault API
- **WorldGuard** - Region protection checks (used by the WorldEdit module)
- **SuperiorSkyblock2** - Island-based permission checks for skyblock servers
- **BentoBox** - Declared as an optional dependency so that it is loaded before zEssentials
- **NuVotifier** - Receives votes for the Vote module
- **BlockTracker** - Tracks player-placed blocks
- **MythicMobs** - Custom mob names in death messages
- **NChat** - Applies zEssentials mutes to NChat messages
- **ProtocolLib** - Optional packet-level integration, not required by any module
- **AxVaults** / **PlayerVaults** - Only needed to [migrate vault data](./converters) into zEssentials

See [Hooks & Integrations](./development/hooks) for details on each integration.

### 3. Install the Plugin

1. Stop your server
2. Place `zEssentials.jar` in your `plugins/` folder
3. Start your server
4. The plugin will generate all default configuration files and module configs

<CalloutContainer type="info">

<CalloutTitle>Runtime library download</CalloutTitle>

<CalloutDescription>
When the server starts, zEssentials asks Paper (through its plugin loader, `ZEssentialsPluginLoader`) to provide the **MariaDB JDBC driver** (`org.mariadb.jdbc:mariadb-java-client`), which is downloaded from Maven Central the first time. The server therefore needs internet access on first start. If your host blocks Maven Central, you can use a mirror with the `PAPER_DEFAULT_CENTRAL_REPOSITORY` environment variable or the `org.bukkit.plugin.java.LibraryLoader.centralURL` system property, exactly like for Paper itself.
</CalloutDescription>

</CalloutContainer>

### 4. Verify Installation

Run `/zessentials` (alias `/ess`) in-game or from the console. If the plugin is loaded correctly, it displays the plugin version. You can also check the server console for lines similar to:

```
[zEssentials] Loading server plugin zEssentials v1.0.4.0
[zEssentials] Enabling zEssentials v1.0.4.0
[zEssentials] Create <n> commands.
[zEssentials] The database connection is valid ! (SQLITE)
```

If you see the following warning instead, the server is running Spigot and zEssentials is inactive:

```
[zEssentials] zEssentials is inactive: no commands, modules or API are available on Spigot.
[zEssentials] Install Paper, or a compatible fork, to use zEssentials.
[zEssentials] Download: https://papermc.io/downloads
```

## File Structure

After first startup, zEssentials creates the following structure:

```
plugins/zEssentials/
├── config.yml                          # Main configuration
├── database.db                         # SQLite database (if storage-type: SQLITE)
├── users/                              # Player files (if storage-type: JSON)
├── messages/                           # Message files (EN, FR, DE, ES, IT, NL, ZH)
├── patterns/                           # zMenu patterns (home_up.yml, home_down.yml)
└── modules/
    ├── afk/config.yml                  # AFK detection
    ├── automessage/config.yml          # Automatic announcements
    ├── chat/config.yml                 # Chat formatting, ping, item display
    ├── customcommands/config.yml       # Your own commands (/discord, /map...)
    ├── death_message/config.yml        # Death messages
    ├── discord/config.yml              # Discord webhooks and account linking
    ├── economy/                        # config.yml, baltop.yml, confirm_pay_inventory.yml
    ├── hologram/                       # config.yml, holograms/
    ├── home/                           # config.yml, homes.yml, homes_donut.yml, home_delete.yml, public_homes.yml
    ├── items/config.yml                # Item utilities
    ├── join_quit/config.yml            # Join/quit messages
    ├── kits/                           # config.yml, kits.yml, kit_preview.yml, kits_categories.yml, kits/
    ├── mailbox/                        # config.yml, mailbox.yml, mailbox_admin.yml
    ├── messages/config.yml             # Private messages
    ├── rules/                          # config.yml, rules.yml
    ├── sanction/                       # config.yml, sanction.yml, sanctions.yml, sanction_history.yml
    ├── scoreboard/config.yml           # Dynamic scoreboard
    ├── spawn/config.yml                # Spawn and first spawn
    ├── steps/config.yml                # Step/progression tracking
    ├── teleportation/                  # config.yml, confirm_request_inventory.yml, confirm_request_here_inventory.yml
    ├── vault/                          # config.yml, vault.yml, vault-admin.yml, vault-configuration.yml
    ├── vote/                           # config.yml, vote.yml
    ├── warp/                           # config.yml, warps.yml
    └── worldedit/                      # config.yml, pw-help.yml
```

<CalloutContainer type="info">

<CalloutDescription>
Each module has its own folder in `modules/` with a `config.yml` and, when needed, the zMenu inventory files it uses. A module can be enabled or disabled with the `enable` option of its `config.yml` without affecting other modules.
</CalloutDescription>

</CalloutContainer>

## Database Configuration

zEssentials supports several storage backends, selected with the `storage-type` option in `config.yml`. See the [Database](./database) page for the full details.

### SQLite (Default)

SQLite is the default storage method and requires no additional configuration. Best for testing:

```yaml
storage-type: SQLITE
```

The database file is stored at `plugins/zEssentials/database.db`.

### MySQL / MariaDB / HikariCP

Recommended for production environments and multi-server setups:

```yaml
storage-type: HIKARICP # or MYSQL / MARIADB

database-configuration:
  table-prefix: "zessentials_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: 'secret'
  database: zessentials
  debug: false
```

`MYSQL`, `MARIADB` and `HIKARICP` all use a HikariCP connection pool. `MARIADB` connects with the MariaDB driver (`jdbc:mariadb:`), the two other values use a `jdbc:mysql:` URL.

### Default Database Configuration Values

| Property | Default Value |
|----------|---------------|
| `table-prefix` | `zessentials_` |
| `host` | `192.168.10.10` |
| `port` | `3306` |
| `user` | `homestead` |
| `password` | `secret` |
| `database` | `zessentials` |
| `debug` | `false` |

<CalloutContainer type="warning">

<CalloutDescription>
Make sure to change the default database credentials before deploying to production. The default values are placeholders and should not be used in a live environment.
</CalloutDescription>

</CalloutContainer>

## Redis Configuration

The configuration file contains a Redis section intended for multi-server synchronization (cross-server private messages, kicks, broadcasts, cooldowns...):

```yaml
redis-configuration:
  host: "192.168.10.10"
  port: 6379
  password: "123456a"
```

| Property | Description | Default |
|----------|-------------|---------|
| `host` | Redis server address | `192.168.10.10` |
| `port` | Redis server port | `6379` |
| `password` | Redis password | `123456a` |

## Server Type Configuration

```yaml
server-type: PAPER
```

| Value | Description |
|-------|-------------|
| `PAPER` | Default mode. All data is handled locally, no cross-server communication. |
| `REDIS` | Multi-server mode using Redis pub/sub. |

<CalloutContainer type="warning">

<CalloutTitle>Redis mode in development</CalloutTitle>

<CalloutDescription>
The `REDIS` server type is **still in development**: in the current version the Redis server is not started, so setting `server-type: REDIS` has no effect and the plugin behaves as with `PAPER`. For a network, share the same MySQL/MariaDB database between your servers.
</CalloutDescription>

</CalloutContainer>

## First Configuration

After installation, here are the recommended first steps:

1. **Storage** - Choose your storage backend (`SQLITE`, `MYSQL`, `MARIADB` or `HIKARICP`) in `config.yml`
2. **Modules** - Review and enable/disable modules in the `modules/` directory based on your needs
3. **Economy** - If using the Economy module, configure it in `modules/economy/config.yml` and install Vault if other plugins need to use it
4. **Homes** - Set home limits per permission in `modules/home/config.yml`
5. **Kits** - Create your server kits in `modules/kits/kits/`
6. **First join** - Enable `enable-first-join-teleport` in `config.yml` if new players must be teleported to the first spawn (disabled by default)
7. **Messages** - Customize plugin messages in the `messages/` directory

See the [Configuration](./configuration/main-config) section for detailed options.

## Troubleshooting

### Plugin does not start

- Make sure the server runs **Paper** (or a fork) **1.20.6+**. On Spigot, zEssentials stays inactive and only logs a warning.
- Check the Java version with `java -version`: **Java 21+** is required, **Java 25** for Minecraft 26.x
- Verify that **zMenu** and **PlaceholderAPI** are installed and load without errors
- Check that the server could download the MariaDB driver on first start (internet access or Maven Central mirror)
- Check the server console for error messages referencing `fr.maxlego08.essentials.ZEssentialsPlugin`
- Ensure the `.jar` file is not corrupted by re-downloading it

### "Cannot initialize zEssentials: zMenu ... service is unavailable"

zEssentials retrieves the zMenu services (`InventoryManager`, `ButtonManager` and `PatternManager`) as soon as it enables. If zMenu failed to enable, zEssentials now stops immediately with an explicit error instead of failing later:

```
Cannot initialize zEssentials: zMenu InventoryManager service is unavailable. Check that zMenu enabled successfully and its API is shared with zEssentials.
```

- Scroll up in the console and fix the error reported by **zMenu** first (outdated version, missing dependency...)
- Update zMenu to the latest version
- Do not load or reload zEssentials or zMenu at runtime with a plugin manager, restart the server instead

### Modules not loading

- Verify the module folder exists in `plugins/zEssentials/modules/`
- Check that the module is set to `enable: true` in its `config.yml`
- Look for errors in the console that reference the specific module name
- Ensure all optional dependencies used by that module are installed (e.g. NuVotifier for votes)

### Database connection failed

- Verify your database credentials in `config.yml` are correct
- Ensure the MySQL/MariaDB server is running and accessible from the Minecraft server
- Check firewall settings if using a remote database
- Confirm the database specified in the configuration exists and the user has proper permissions
- Enable `database-configuration.debug` to log the SQL queries

### Economy not working

- Check the Economy module is enabled in `modules/economy/config.yml`
- If other plugins use Vault, ensure **Vault** is installed: zEssentials registers itself as the Vault economy provider (only the economy with `vault: true` is exposed)
- Run `/vault-info` to verify that Vault detects zEssentials as the economy provider

### PlaceholderAPI placeholders not working

- Ensure PlaceholderAPI is installed and loaded
- Run `/papi list` to check if the zEssentials expansion is registered
- Verify the placeholder syntax is correct (e.g. `%zessentials_user_balance_money%`)

### Interfaces not appearing

- Verify **zMenu** is installed and working properly
- Check that the inventory files exist in the module folders (e.g. `modules/home/homes.yml`)
- Look for errors in the console when attempting to open a menu
- Ensure zMenu is up to date with the latest version

## Next Steps

- [Commands & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/main-config)
- [Database](./database)
- [API & Events](./development/events)
