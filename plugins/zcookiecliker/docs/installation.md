---
sidebar_position: 2
title: Installation
description: How to install and configure zCookieClicker on your Minecraft server
---

# Installation

This guide covers the installation and initial configuration of zCookieClicker.

## Requirements

Before installing, ensure your server meets these requirements:

| Requirement | Version | Status |
|-------------|---------|--------|
| Java | 17 or higher | **Required** |
| Minecraft | 1.13 or higher | **Required** |
| [zMenu](https://modrinth.com/plugin/zmenu) | Latest version | **Required** |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Latest version | Optional |

### Supported Platforms

| Platform | Support |
|----------|---------|
| Paper | Recommended |
| Spigot | Supported |
| Purpur | Supported |

## Installation Steps

### 1. Download the Plugin

Download zCookieClicker from:
- [groupez.dev](https://groupez.dev/)

### 2. Install Dependencies

Install the **required** dependency:

1. **zMenu** - Download from [Modrinth](https://modrinth.com/plugin/zmenu) and place the `.jar` in your `plugins/` folder. zCookieClicker uses zMenu for all GUI interfaces.

### 3. Install the Plugin

1. Stop your server
2. Place `zCookieClicker.jar` in your `plugins/` folder
3. Start your server
4. The plugin will generate all default configuration files

### 4. Verify Installation

Run `/cookie` in-game. If the plugin is loaded correctly, it will open the Cookie Clicker GUI.

## File Structure

After first startup, zCookieClicker creates the following structure:

```
plugins/zCookieClicker/
├── config.yml                    # Main configuration
├── messages.yml                  # Plugin messages
├── inventories/
│   ├── cookies.yml               # Main cookie GUI
│   └── cookies-upgrade.yml       # Upgrades GUI
└── patterns/
    └── cookie-upgrade.yml        # Upgrade button pattern
```

## Database Configuration

zCookieClicker supports three storage backends.

### SQLite (Default)

SQLite is the default storage method and requires no additional configuration:

```yaml
sql:
  type: SQLITE
```

### MySQL

For larger servers:

```yaml
sql:
  type: MYSQL
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  database: zcookieclicker
  prefix: "zcookieclicker_"
  retry: 5
  debug: false
```

### MariaDB

```yaml
sql:
  type: MARIADB
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  database: zcookieclicker
  prefix: "zcookieclicker_"
  retry: 5
  debug: false
```

| Option | Description |
|--------|-------------|
| `type` | Storage type: SQLITE, MYSQL, or MARIADB |
| `user` | Database username |
| `password` | Database password |
| `port` | Database port |
| `host` | Database host address |
| `database` | Database name |
| `prefix` | Table prefix |
| `retry` | Connection retry attempts |
| `debug` | Enable SQL debug logging |

:::warning
Make sure to change the default database credentials before deploying to production.
:::

## First Configuration

After installation, here are the recommended first steps:

1. **Storage** - Choose your storage backend in `config.yml`
2. **Upgrades** - Customize upgrade costs and CPS values
3. **Number Format** - Configure how large numbers are displayed
4. **Messages** - Customize plugin messages in `messages.yml`
5. **GUIs** - Customize the cookie and upgrade GUIs

See the [Configuration](./configuration/config) section for detailed options.

## Troubleshooting

### Plugin does not start

- Check that **Java 17+** is installed: `java -version`
- Verify that **zMenu** is installed and loads without errors
- Check the server console for error messages

### GUI not opening

- Verify **zMenu** is installed and working properly
- Check that inventory files exist in `plugins/zCookieClicker/inventories/`
- Look for errors in the console

### Database connection failed

- Verify your database credentials in `config.yml`
- Ensure the MySQL/MariaDB server is running
- Check firewall settings if using a remote database
- Confirm the database exists

### Cookies not saving

- Check database connection is working
- Enable `debug: true` in the SQL configuration
- Verify the database tables were created

## Next Steps

- [Commands & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/config)
- [Upgrades](./configuration/upgrades)
