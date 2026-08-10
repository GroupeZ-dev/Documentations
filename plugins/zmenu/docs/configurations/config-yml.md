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

# Enable per-operation performance debugging for inventory opening
enable-performance-debug: false

performance-debug:
  # Minimum execution time (ms) for an operation to appear in output
  threshold-ms: 10
  filter:
    # DISABLED - show all, WHITELIST - only listed, BLACKLIST - hide listed
    # Supports wildcards: "buildButton.*"
    mode: DISABLED
    operations: []

# Show informational messages about inventory/order loading
enable-information-message: true

# Skip the update check on startup
skip-update-check: false

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
  debug: false

# Interval (seconds) for batching SQL saves instead of one query per update
batch-task: 10

#######################################
#           Logging Settings          #
#######################################

# Log inventory opens to the database
enable-player-open-inventory-logs: true

# Print console messages when files are saved or loaded
enable-log-storage-file: false

# Show a message to the player when /zm open <inventory> <player> <display> is used
enable-open-message: true

#######################################
#        Formatting Settings          #
#######################################

# Enable MiniMessage format (requires Minecraft 1.17+)
# This allows modern formatting like <gradient:red:blue>
enable-mini-message-format: true

#######################################
#         Command Settings            #
#######################################

# Force player commands to run via chat (useful for fake commands not registered in Spigot)
enable-player-command-in-chat: false

# Allow buttons to execute commands with OP-level permissions.
# WARNING: Security-sensitive. Only enable if you understand the risks.
# Requires server restart to take effect.
enable-player-commands-as-op-action: false

# Method used to grant temporary elevated permissions (when enable-player-commands-as-op-action is true)
# ATTACHMENT: grants permission * temporarily (recommended)
# SET_OP: temporarily sets player as OP
# BOTH: combines both methods
op-grant-method: ATTACHMENT

#######################################
#        Inventory Behavior           #
#######################################

# Action types to skip when a player switches between zMenu inventories (prevents re-opening old menus)
skip-close-actions-on-inventory-switch:
  - inventory
  - inv
  - back

# Use the faster FastEvent system (refer to documentation before enabling)
enable-fast-event: false

# Disable double-click detection to avoid duplicate interactions
disable-double-click-event: true

# Click types that are handled in menus
all-clicks-type:
  - MIDDLE
  - RIGHT
  - LEFT
  - SHIFT_RIGHT
  - SHIFT_LEFT

#######################################
#        Performance Settings         #
#######################################

# Cache item stacks for better performance
enable-cache-item-stack: true

# Enable click cooldown to prevent spam clicking
enable-cooldown-click: true

# Cooldown duration (milliseconds) between clicks
cooldown-click-milliseconds: 100

# Limit click packets received from players (requires PacketEvents plugin)
enable-packet-event-click-limiter: false

# Minimum time (ms) between packet-level click events
packet-event-click-limiter-milliseconds: 50

# Enable PlaceholderAPI caching
enable-cache-placeholder-api: false

# PlaceholderAPI cache duration (ticks, 20 = 1 second)
cache-placeholder-api: 20

# Cache offline player data (seconds)
cache-offline-player: 300

# Auto-save player data interval (seconds)
seconds-save-player-data: 600

# Auto-save player inventories interval (seconds)
seconds-save-player-inventories: 600

#######################################
#         Security Settings           #
#######################################

# Enable anti-dupe protection
enable-anti-dupe: true

# Send a Discord notification when a dupe attempt is detected
enable-anti-dupe-discord-notification: false

# Webhook URL for anti-dupe Discord notifications
anti-dupe-discord-webhook-url: "https://discord.com/api/webhooks/<your webhook url>"

# Message sent to Discord on dupe detection. Supports %player%, %amount%, %itemname%
anti-dupe-message: "**%player%** used %amount% %itemname% from zMenu. It has been removed!"

#######################################
#          Menu Settings              #
#######################################

# Default main menu inventory name
main-menu: "example"

# Use swap item offhand key (F) to open main menu
use-swap-item-off-hand-key-to-open-main-menu: false

# Require shift + offhand key instead of just offhand key
use-swap-item-off-hand-key-to-open-main-menu-needs-shift: false

# Specific menu paths to load at startup (leave empty to load all)
specify-path-menus: []

# Generate default configuration files if they don't exist
generate-default-file: true

#######################################
#          Download / API             #
#######################################

# Allow use of /zm download command
enable-download-command: false

# API URL for Minecraft Inventory Builder (do not change this value)
api-url: "https://minecraft-inventory-builder.com/api/v2/"
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

#### enable-performance-debug

Logs per-operation execution times when opening inventories (button building, item rendering, etc.).

```yaml
enable-performance-debug: false

performance-debug:
  threshold-ms: 10   # Only show operations slower than this
  filter:
    mode: DISABLED   # DISABLED | WHITELIST | BLACKLIST
    operations: []   # Supports wildcards: "buildButton.*"
```

---

#### enable-information-message

Shows informational messages in console when an inventory or command is successfully loaded.

```yaml
enable-information-message: true
```

---

#### skip-update-check

Skips the automatic update check on startup.

```yaml
skip-update-check: false
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
  debug: false
```

| Option | Description |
|--------|-------------|
| `table-prefix` | Prefix for database tables |
| `host` | Database server address |
| `port` | Database port (default: 3306) |
| `user` | Database username |
| `password` | Database password |
| `database` | Database name |
| `debug` | Enable SQL debug logging |

---

#### batch-task

Interval in seconds for batching SQL saves. Instead of one query per update, all pending changes are saved in a single query.

```yaml
batch-task: 10
```

---

### Logging Settings

#### enable-player-open-inventory-logs

Logs when players open zMenu inventories to the database.

```yaml
enable-player-open-inventory-logs: true
```

---

#### enable-log-storage-file

Prints console messages when configuration files are saved or loaded.

```yaml
enable-log-storage-file: false
```

---

#### enable-open-message

When enabled, using `/zm open <inventory> <player> <display>` shows the `display` message to the target player.

```yaml
enable-open-message: true
```

---

### Formatting Settings

#### enable-mini-message-format

Enables MiniMessage formatting for text. Requires Minecraft 1.17+ and Paper (or a Paper fork).

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

### Command Settings

#### enable-player-command-in-chat

Forces player commands to run via chat rather than command dispatch. Useful for "fake" commands not registered in Paper/Spigot.

```yaml
enable-player-command-in-chat: false
```

---

#### enable-player-commands-as-op-action

Allows buttons to execute commands with OP-level permissions.

```yaml
enable-player-commands-as-op-action: false
```

:::danger Security Warning
Only enable this if you fully understand the security implications. Misuse can give players elevated permissions.
:::

---

#### op-grant-method

The method used to temporarily grant elevated permissions (only when `enable-player-commands-as-op-action: true`).

| Method | Description |
|--------|-------------|
| `ATTACHMENT` | Grants `*` permission temporarily (recommended, safer) |
| `SET_OP` | Temporarily sets the player as OP |
| `BOTH` | Combines both methods (maximum compatibility) |

```yaml
op-grant-method: ATTACHMENT
```

---

### Inventory Behavior

#### skip-close-actions-on-inventory-switch

Lists action types that are skipped when a player opens another zMenu inventory. Prevents actions like `back` or `inventory` from reopening old menus on inventory switch.

```yaml
skip-close-actions-on-inventory-switch:
  - inventory
  - inv
  - back
```

---

#### enable-fast-event

Replaces some Bukkit events with a faster alternative for better performance.

```yaml
enable-fast-event: false
```

---

#### disable-double-click-event

Prevents interactions from being triggered by double-clicking.

```yaml
disable-double-click-event: true
```

---

#### all-clicks-type

List of click types handled by zMenu menus. Remove click types you don't want to handle.

```yaml
all-clicks-type:
  - MIDDLE
  - RIGHT
  - LEFT
  - SHIFT_RIGHT
  - SHIFT_LEFT
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

#### enable-anti-dupe-discord-notification

Sends a Discord webhook notification when a duplication attempt is detected.

```yaml
enable-anti-dupe-discord-notification: false
anti-dupe-discord-webhook-url: "https://discord.com/api/webhooks/..."
anti-dupe-message: "**%player%** used %amount% %itemname% from zMenu. It has been removed!"
```

Supported placeholders in `anti-dupe-message`: `%player%`, `%amount%`, `%itemname%`.

---

#### enable-packet-event-click-limiter

Limits click packets received from players (requires the [PacketEvents](https://github.com/retrooper/packetevents) plugin).

```yaml
enable-packet-event-click-limiter: false
packet-event-click-limiter-milliseconds: 50
```

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

#### use-swap-item-off-hand-key-to-open-main-menu-needs-shift

When combined with `use-swap-item-off-hand-key-to-open-main-menu: true`, the player must also hold **Shift** to open the menu.

```yaml
use-swap-item-off-hand-key-to-open-main-menu-needs-shift: false
```

---

#### specify-path-menus

List of specific menu file paths to load at startup. Leave empty to load all menus in the `inventories/` folder.

```yaml
specify-path-menus: []
```

---

#### generate-default-file

When enabled, creates default configuration files if they do not already exist.

```yaml
generate-default-file: true
```

---

#### seconds-save-player-data

How often (in seconds) player data is automatically saved.

```yaml
seconds-save-player-data: 600  # 10 minutes
```

---

#### seconds-save-player-inventories

How often (in seconds) player inventory data is automatically saved.

```yaml
seconds-save-player-inventories: 600  # 10 minutes
```

---

### Download / API Settings

#### enable-download-command

Enables the `/zm download <url> [force]` command to download inventories from a URL.

```yaml
enable-download-command: false
```

---

#### api-url

The API URL for the [Minecraft Inventory Builder](https://minecraft-inventory-builder.com) website integration. **Do not change this value.**

```yaml
api-url: "https://minecraft-inventory-builder.com/api/v2/"
```

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
enable-performance-debug: true
performance-debug:
  threshold-ms: 5
  filter:
    mode: DISABLED
    operations: []
skip-update-check: true
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
