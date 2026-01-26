---
sidebar_position: 11
title: Config.yml
description: Main configuration file reference
---

# Config.yml

The `config.yml` file is the main configuration file for zMenu. It controls global plugin settings, database configuration, performance options, and more.

## File Location

`plugins/zMenu/config.yml`

## Complete Configuration Reference

```yaml
#######################################
#          Debug Settings             #
#######################################

# Enable debug messages in console
enable-debug: false

# Enable debug timing information
enable-debug-time: false

#######################################
#         Storage Settings            #
#######################################

# Storage type for player data
# Options: SQLITE, MYSQL, MARIADB, NONE
storage-type: SQLITE

# Database configuration (for MySQL/MariaDB)
database-configuration:
  table-prefix: "zmenu_"
  host: "localhost"
  port: 3306
  user: "username"
  password: "password"
  database: "zmenu"

#######################################
#        Formatting Settings          #
#######################################

# Enable MiniMessage format (Paper/Purpur only)
# This allows modern formatting like <gradient:red:blue>
enable-mini-message-format: true

#######################################
#        Performance Settings         #
#######################################

# Cache item stacks for better performance
enable-cache-item-stack: true

# Enable PlaceholderAPI caching
enable-cache-placeholder-api: false

# PlaceholderAPI cache duration (ticks, 20 = 1 second)
cache-placeholder-api: 20

# Cache offline player data (seconds)
cache-offline-player: 300

#######################################
#           Click Settings            #
#######################################

# Enable click cooldown to prevent spam clicking
enable-cooldown-click: true

# Cooldown duration (milliseconds)
cooldown-click-milliseconds: 100

#######################################
#         Security Settings           #
#######################################

# Enable anti-dupe protection
enable-anti-dupe: true

# Log when players open inventories
enable-player-open-inventory-logs: true

#######################################
#          Menu Settings              #
#######################################

# Default main menu inventory name
main-menu: "example"

# Use swap item offhand key (F) to open main menu
use-swap-item-off-hand-key-to-open-main-menu: false
```

## Configuration Options Explained

### Debug Settings

#### enable-debug

Enables detailed debug messages in the console. Useful for troubleshooting issues.

```yaml
enable-debug: false
```

**When to enable:**
- Troubleshooting inventory loading issues
- Debugging placeholder problems
- Reporting bugs to the developer

---

#### enable-debug-time

Shows timing information for operations.

```yaml
enable-debug-time: false
```

---

### Storage Settings

#### storage-type

Determines how player data is stored.

| Type | Description |
|------|-------------|
| `SQLITE` | Local file-based database (default) |
| `MYSQL` | MySQL server |
| `MARIADB` | MariaDB server |
| `NONE` | No persistent storage |

```yaml
storage-type: SQLITE
```

**Recommendations:**
- **Single server**: Use `SQLITE`
- **Network/BungeeCord**: Use `MYSQL` or `MARIADB`
- **No player data needed**: Use `NONE`

---

#### database-configuration

MySQL/MariaDB connection settings.

```yaml
database-configuration:
  table-prefix: "zmenu_"
  host: "localhost"
  port: 3306
  user: "minecraft"
  password: "secure_password"
  database: "minecraft_db"
```

| Option | Description |
|--------|-------------|
| `table-prefix` | Prefix for database tables |
| `host` | Database server address |
| `port` | Database port (default: 3306) |
| `user` | Database username |
| `password` | Database password |
| `database` | Database name |

---

### Formatting Settings

#### enable-mini-message-format

Enables MiniMessage formatting for text. **Only works on Paper/Purpur/Pufferfish**.

```yaml
enable-mini-message-format: true
```

When enabled, you can use:
```yaml
name: "<gradient:red:blue>Gradient Text</gradient>"
lore:
  - "<rainbow>Rainbow!</rainbow>"
  - "<bold><gold>Bold gold</gold></bold>"
```

---

### Performance Settings

#### enable-cache-item-stack

Caches created ItemStacks to improve performance.

```yaml
enable-cache-item-stack: true
```

**Recommendation:** Keep enabled unless you experience issues.

---

#### enable-cache-placeholder-api

Caches PlaceholderAPI results to reduce parsing overhead.

```yaml
enable-cache-placeholder-api: false
```

:::warning
Enabling this means placeholders won't update instantly. Use with caution.
:::

---

#### cache-placeholder-api

Duration to cache placeholder results (in ticks).

```yaml
cache-placeholder-api: 20  # 1 second
```

---

#### cache-offline-player

How long to cache offline player data (seconds).

```yaml
cache-offline-player: 300  # 5 minutes
```

---

### Click Settings

#### enable-cooldown-click

Prevents spam clicking by adding a cooldown between clicks.

```yaml
enable-cooldown-click: true
```

---

#### cooldown-click-milliseconds

The cooldown duration between clicks.

```yaml
cooldown-click-milliseconds: 100  # 0.1 seconds
```

**Adjust based on your needs:**
- Lower = More responsive, risk of accidental double-clicks
- Higher = Safer, might feel sluggish

---

### Security Settings

#### enable-anti-dupe

Enables the anti-item-duplication system.

```yaml
enable-anti-dupe: true
```

This detects and prevents common item duplication exploits involving inventory GUIs.

---

#### enable-player-open-inventory-logs

Logs when players open zMenu inventories.

```yaml
enable-player-open-inventory-logs: true
```

Useful for:
- Monitoring player activity
- Debugging issues
- Security auditing

---

### Menu Settings

#### main-menu

The default inventory opened by the `MAIN_MENU` button type and the F key shortcut.

```yaml
main-menu: "example"
```

This should match an inventory filename (without `.yml`) in your `inventories/` folder.

---

#### use-swap-item-off-hand-key-to-open-main-menu

Allow players to press F (swap offhand key) to open the main menu.

```yaml
use-swap-item-off-hand-key-to-open-main-menu: false
```

**When to enable:**
- You want easy menu access without commands
- Your server has a main hub menu

**When to keep disabled:**
- Players need the F key for actual item swapping
- You use custom resource packs with F key bindings

---

## Example Configurations

### Basic Server (SQLite)

```yaml
enable-debug: false
storage-type: SQLITE
enable-mini-message-format: true
enable-cache-item-stack: true
enable-anti-dupe: true
enable-cooldown-click: true
cooldown-click-milliseconds: 100
main-menu: "main"
```

### Network Server (MySQL)

```yaml
enable-debug: false
storage-type: MYSQL
database-configuration:
  table-prefix: "zmenu_"
  host: "mysql.mynetwork.com"
  port: 3306
  user: "zmenu_user"
  password: "secure_password_here"
  database: "minecraft_network"
enable-mini-message-format: true
enable-cache-item-stack: true
enable-cache-placeholder-api: true
cache-placeholder-api: 40
enable-anti-dupe: true
main-menu: "hub_menu"
```

### Performance-Focused

```yaml
enable-debug: false
storage-type: SQLITE
enable-cache-item-stack: true
enable-cache-placeholder-api: true
cache-placeholder-api: 60
cache-offline-player: 600
enable-cooldown-click: true
cooldown-click-milliseconds: 150
```

### Development/Testing

```yaml
enable-debug: true
enable-debug-time: true
storage-type: SQLITE
enable-cache-item-stack: false
enable-cache-placeholder-api: false
enable-cooldown-click: false
enable-player-open-inventory-logs: true
```

## Reloading Configuration

After making changes:

```
/zm reload config
```

Or reload everything:

```
/zm reload
```

:::note
Database configuration changes require a server restart to take effect.
:::

## Best Practices

1. **Start with defaults**: Only change what you need
2. **Enable caching on large servers**: Improves performance
3. **Use MySQL for networks**: Allows data sharing across servers
4. **Keep anti-dupe enabled**: Protects your economy
5. **Test debug mode**: Useful when setting up, disable in production
6. **Set appropriate click cooldown**: Balance responsiveness and safety

## Troubleshooting

### Database Connection Failed

1. Verify credentials are correct
2. Check database server is running
3. Ensure the database exists
4. Check firewall allows connections
5. Verify user has proper permissions

### Placeholders Not Updating

1. Disable placeholder caching temporarily
2. Check if PlaceholderAPI is installed
3. Verify the expansion is downloaded

### Performance Issues

1. Enable item stack caching
2. Enable placeholder caching
3. Increase click cooldown
4. Check for inventory loops (A opens B opens A)

## Next Steps

- Set up [Custom Commands](./custom-commands)
- Configure [Player Data](./player-data) storage
- Learn about the [Development API](../development/api-introduction)
