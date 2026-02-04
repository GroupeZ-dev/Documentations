---
sidebar_position: 1
title: Main Configuration
description: Main configuration file (config.yml) for zEssentials
---

# Main Configuration

This page documents every section of the main `config.yml` file located at `plugins/zEssentials/config.yml`. This file controls global plugin behavior including storage, cooldowns, restrictions, message colors, fly settings, and more.

---

## Debug

Enable or disable debug mode. When enabled, the plugin outputs additional logging to the console, which is useful for troubleshooting issues.

```yaml
enable-debug: false
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-debug` | Boolean | `false` | Enables verbose debug logging in the server console |

:::tip
Only enable debug mode when actively troubleshooting an issue. Debug output can be very verbose and may impact server performance on high-traffic servers.
:::

---

## Storage

Configure how zEssentials stores data, the server communication type, and database/Redis connection details.

### Storage Type

```yaml
storage-type: SQLITE
```

| Value | Description |
|-------|-------------|
| `SQLITE` | Local file-based storage. Best for single-server setups and testing. No additional configuration required. |
| `MYSQL` | MySQL or MariaDB database. Recommended for production environments. |
| `HIKARICP` | MySQL/MariaDB with HikariCP connection pooling. Best for high-performance and high-traffic servers. |

### Server Type

```yaml
server-type: PAPER
```

| Value | Description |
|-------|-------------|
| `PAPER` | Standalone server mode. All data is stored and read locally. |
| `REDIS` | Multi-server mode with real-time synchronization via Redis pub/sub. Requires MySQL or HikariCP storage. |

### Database Configuration

Used when `storage-type` is set to `MYSQL` or `HIKARICP`.

```yaml
database-configuration:
  table-prefix: "zessentials_"
  host: "192.168.10.10"
  port: 3306
  user: "homestead"
  password: "secret"
  database: "zessentials"
  debug: false
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `table-prefix` | String | `zessentials_` | Prefix applied to all database table names. Useful when sharing a database with other plugins. |
| `host` | String | `192.168.10.10` | Hostname or IP address of the database server. |
| `port` | Integer | `3306` | Port the database server is listening on. |
| `user` | String | `homestead` | Database username for authentication. |
| `password` | String | `secret` | Database password for authentication. |
| `database` | String | `zessentials` | Name of the database to use. The database must already exist. |
| `debug` | Boolean | `false` | Enables SQL query debug logging. Outputs all executed queries to the console. |

:::warning
Change the default database credentials before deploying to production. The default values (`homestead` / `secret`) are placeholders and must not be used in a live environment.
:::

### Redis Configuration

Used when `server-type` is set to `REDIS`. Enables cross-server synchronization of player data, sanctions, economy, messages, and more.

```yaml
redis-configuration:
  host: "127.0.0.1"
  port: 6379
  password: ""
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `host` | String | `127.0.0.1` | Hostname or IP address of the Redis server. |
| `port` | Integer | `6379` | Port the Redis server is listening on. |
| `password` | String | `""` | Redis password. Leave empty if authentication is not configured. |

:::tip
When using `REDIS` server type, ensure all servers in the network share the same MySQL database **and** the same Redis instance for full data synchronization.
:::

---

## Command Cooldowns

Configure cooldowns for commands to prevent spam and abuse. Cooldowns are applied per player and per command. You can define a base cooldown and permission-based overrides so that different ranks have different wait times.

### Force Commands

A list of exact command strings that will always have cooldowns applied, even if the player has the bypass permission. This is useful for commands you never want to be spammed regardless of rank.

```yaml
force-commands:
  - "/essversion"
```

### Cooldown Bypass

```yaml
enable-cooldown-bypass: true
```

When `enable-cooldown-bypass` is set to `true`, players with the `essentials.bypass.cooldown` permission will skip all command cooldowns (except those listed in `force-commands`).

### Command Cooldowns Definition

Define cooldowns per command with optional permission-based overrides. Each entry consists of:
- **command**: The command name (without the leading `/`).
- **cooldown**: The base cooldown in seconds that applies to all players.
- **permissions**: A list of permission-based overrides. Players with the matching permission use the override cooldown instead of the base value. A cooldown of `0` means no cooldown.

```yaml
command-cooldowns:
  - command: "heal"
    cooldown: 60
    permissions:
      - permission: "essentials.cooldowns.vip"
        cooldown: 40
      - permission: "essentials.cooldowns.staff"
        cooldown: 20
  - command: "tpr"
    cooldown: 300
    permissions:
      - permission: "essentials.cooldowns.vip"
        cooldown: 120
      - permission: "essentials.cooldowns.staff"
        cooldown: 0
```

**Example breakdown for `heal`:**

| Player Type | Permission | Cooldown |
|-------------|-----------|----------|
| Default | *(none)* | 60 seconds |
| VIP | `essentials.cooldowns.vip` | 40 seconds |
| Staff | `essentials.cooldowns.staff` | 20 seconds |

**Example breakdown for `tpr`:**

| Player Type | Permission | Cooldown |
|-------------|-----------|----------|
| Default | *(none)* | 300 seconds (5 minutes) |
| VIP | `essentials.cooldowns.vip` | 120 seconds (2 minutes) |
| Staff | `essentials.cooldowns.staff` | 0 seconds (no cooldown) |

:::info
Permission-based overrides are checked in order. The first matching permission is used. If no permission matches, the base `cooldown` value is applied.
:::

---

## Command Restrictions

Restrict specific commands from being used in certain worlds or within defined cuboid regions. Players with the bypass permission can ignore these restrictions.

```yaml
command-restrictions:
  - commands:
      - "heal"
      - "feed"
    bypass-permission: "essentials.bypass.restriction"
    worlds:
      - "world_pvp"
    cuboids:
      - "world,100,0,100,200,256,200"
```

| Option | Type | Description |
|--------|------|-------------|
| `commands` | List of Strings | The commands to restrict (without the leading `/`). |
| `bypass-permission` | String | Permission that allows a player to bypass this restriction. |
| `worlds` | List of Strings | World names where the listed commands are blocked. |
| `cuboids` | List of Strings | Cuboid regions where the listed commands are blocked. Format: `world,x1,y1,z1,x2,y2,z2` |

**Cuboid format:** `world,x1,y1,z1,x2,y2,z2`
- `world` -- The world name.
- `x1,y1,z1` -- First corner coordinates.
- `x2,y2,z2` -- Second corner coordinates.

The cuboid is defined by two opposite corners, and any player standing inside the bounding box will be restricted from using the listed commands.

:::info
You can define multiple restriction entries, each with their own set of commands, worlds, cuboids, and bypass permissions.
:::

---

## Trash

Configure the trash (disposal) inventory that players can open with `/trash`. Items placed in this inventory are permanently deleted when the inventory is closed.

```yaml
trash-size: 54
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `trash-size` | Integer | `54` | Number of slots in the trash inventory. Must be a multiple of 9. |

**Valid values:** `9`, `18`, `27`, `36`, `45`, `54`

These correspond to 1 through 6 rows of a chest-style inventory.

---

## Compact Materials

Define which items can be compacted into their block form using the `/compact` and `/compactall` commands. Each entry maps a base material to its compacted (block) form. Nine of the base material are consumed to produce one block.

```yaml
compact-materials:
  - COAL:COAL_BLOCK
  - REDSTONE:REDSTONE_BLOCK
  - LAPIS_LAZULI:LAPIS_BLOCK
  - DIAMOND:DIAMOND_BLOCK
  - EMERALD:EMERALD_BLOCK
  - IRON_INGOT:IRON_BLOCK
  - GOLD_INGOT:GOLD_BLOCK
  - RAW_IRON:RAW_IRON_BLOCK
  - RAW_GOLD:RAW_GOLD_BLOCK
  - RAW_COPPER:RAW_COPPER_BLOCK
  - COPPER_INGOT:COPPER_BLOCK
```

**Default compact conversions:**

| Material | Compacts Into |
|----------|--------------|
| `COAL` | `COAL_BLOCK` |
| `REDSTONE` | `REDSTONE_BLOCK` |
| `LAPIS_LAZULI` | `LAPIS_BLOCK` |
| `DIAMOND` | `DIAMOND_BLOCK` |
| `EMERALD` | `EMERALD_BLOCK` |
| `IRON_INGOT` | `IRON_BLOCK` |
| `GOLD_INGOT` | `GOLD_BLOCK` |
| `RAW_IRON` | `RAW_IRON_BLOCK` |
| `RAW_GOLD` | `RAW_GOLD_BLOCK` |
| `RAW_COPPER` | `RAW_COPPER_BLOCK` |
| `COPPER_INGOT` | `COPPER_BLOCK` |

You can add custom entries using the same format: `SOURCE_MATERIAL:RESULT_MATERIAL`. Material names must match valid [Bukkit Material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html) names.

---

## Smeltable Materials

Define which items can be instantly smelted using the `/furnace` command. Each entry maps a raw material to its smelted output.

```yaml
smeltable-materials:
  - RAW_IRON:IRON_INGOT
  - RAW_GOLD:GOLD_INGOT
  - RAW_COPPER:COPPER_INGOT
  - IRON_ORE:IRON_INGOT
  - GOLD_ORE:GOLD_INGOT
  - COPPER_ORE:COPPER_INGOT
  - COBBLESTONE:STONE
  - SAND:GLASS
  - WET_SPONGE:SPONGE
```

**Default smelt conversions:**

| Material | Smelts Into |
|----------|------------|
| `RAW_IRON` | `IRON_INGOT` |
| `RAW_GOLD` | `GOLD_INGOT` |
| `RAW_COPPER` | `COPPER_INGOT` |
| `IRON_ORE` | `IRON_INGOT` |
| `GOLD_ORE` | `GOLD_INGOT` |
| `COPPER_ORE` | `COPPER_INGOT` |
| `COBBLESTONE` | `STONE` |
| `SAND` | `GLASS` |
| `WET_SPONGE` | `SPONGE` |

You can add custom entries using the same format: `SOURCE_MATERIAL:RESULT_MATERIAL`. Material names must match valid [Bukkit Material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html) names.

---

## Message Colors

Configure the global color scheme used for plugin messages. Colors are specified as hex color codes.

```yaml
message-colors:
  primary: "#24d65d"
  secondary: "#656665"
  error: "#ff0000"
  success: "#00ff00"
```

| Color | Hex Code | Description |
|-------|----------|-------------|
| `primary` | `#24d65d` | Main accent color used for highlights, important values, and emphasis in messages. |
| `secondary` | `#656665` | Secondary color used for less prominent text such as labels and descriptions. |
| `error` | `#ff0000` | Color used for error messages and warnings. |
| `success` | `#00ff00` | Color used for success confirmations and positive feedback. |

These colors are applied across all plugin messages and can be referenced in message templates.

---

## Chat Cooldowns

An anti-spam system that applies progressively increasing cooldowns to players who send messages rapidly. The cooldown escalates based on the number of messages sent within a short time window.

```yaml
chat-cooldowns:
  2: 1.5
  4: 5.0
  8: 10.0
```

| Messages Sent | Cooldown Applied |
|--------------|-----------------|
| 2 | 1.5 seconds |
| 4 | 5.0 seconds |
| 8 | 10.0 seconds |

**How it works:**
- When a player sends **2 messages** in rapid succession, a **1.5-second** cooldown is applied before they can send another message.
- At **4 messages**, the cooldown increases to **5 seconds**.
- At **8 messages**, the cooldown increases to **10 seconds**.

The cooldown counter resets after the player stops sending messages for a period of time. This system is designed to prevent chat spam while allowing normal conversation flow.

:::info
The keys represent the message count threshold and the values represent the cooldown duration in seconds. You can customize these thresholds and durations to match your server's needs.
:::

---

## Replace Placeholders

A powerful system for dynamically replacing PlaceholderAPI placeholders with formatted text based on configurable conditions. This allows you to transform raw placeholder values into user-friendly, color-coded displays.

Each replacement entry consists of:
- **placeholder**: The PlaceholderAPI placeholder to intercept and replace.
- **conditions**: A list of conditions to evaluate against the placeholder's resolved value. Conditions are checked in order; the first matching condition determines the output.

### Condition Types

| Type | Description |
|------|-------------|
| `STRING` | Matches when the resolved placeholder value exactly equals the specified `value` string. |
| `NUMBER` | Matches when the resolved placeholder value (parsed as a number) satisfies the `min` and/or `max` range. |

### Example: Ping Display

This example replaces the `%player_ping%` placeholder with color-coded text based on the player's latency:

```yaml
replace-placeholders:
  - placeholder: "%player_ping%"
    conditions:
      - type: NUMBER
        min: 0
        max: 50
        result: "<#00ff00>%player_ping%ms"
      - type: NUMBER
        min: 51
        max: 100
        result: "<#ffff00>%player_ping%ms"
      - type: NUMBER
        min: 101
        max: 200
        result: "<#ff8800>%player_ping%ms"
      - type: NUMBER
        min: 201
        result: "<#ff0000>%player_ping%ms"
```

**Resulting behavior:**

| Ping Range | Display Color | Example Output |
|-----------|---------------|----------------|
| 0 -- 50 ms | Green (`#00ff00`) | `50ms` |
| 51 -- 100 ms | Yellow (`#ffff00`) | `75ms` |
| 101 -- 200 ms | Orange (`#ff8800`) | `150ms` |
| 201+ ms | Red (`#ff0000`) | `300ms` |

### Condition Properties

**For `NUMBER` conditions:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | String | Yes | Must be `NUMBER`. |
| `min` | Number | No | Minimum value (inclusive). Omit for no lower bound. |
| `max` | Number | No | Maximum value (inclusive). Omit for no upper bound. |
| `result` | String | Yes | The replacement text. Can include the original placeholder and MiniMessage formatting. |

**For `STRING` conditions:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | String | Yes | Must be `STRING`. |
| `value` | String | Yes | The exact string to match against the resolved placeholder value. |
| `result` | String | Yes | The replacement text. Can include the original placeholder and MiniMessage formatting. |

:::tip
You can use this system to create color-coded economy balances, health displays, rank prefixes, and any other placeholder-driven dynamic text.
:::

---

## Fly Settings

Configure flight-related behavior including temporary fly management, world restrictions, and notification timers.

```yaml
temp-fly-task: 1
disable-fly-world:
  - "world_pvp"
enable-fly-return: true
fly-task-announce:
  - 300
  - 120
  - 60
  - 30
  - 10
  - 5
  - 4
  - 3
  - 2
  - 1
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `temp-fly-task` | Integer | `1` | Interval in seconds at which the temporary fly timer is checked and updated. |
| `disable-fly-world` | List of Strings | `[]` | List of world names where flight is automatically disabled upon entry. |
| `enable-fly-return` | Boolean | `true` | When `true`, restores the player's fly state when they return to a world that allows flight after leaving a restricted world. |
| `fly-task-announce` | List of Integers | *(see above)* | Remaining time thresholds (in seconds) at which the player is notified that their temporary fly is about to expire. |

**How temporary fly announcements work:**

The `fly-task-announce` list defines the exact remaining-time values at which a notification is sent. In the default configuration, a player with temporary fly will receive a warning at 5 minutes, 2 minutes, 1 minute, 30 seconds, 10 seconds, and then a countdown from 5 to 1 second.

:::info
The `temp-fly-task` value controls how often the plugin checks the remaining fly time. A value of `1` means it checks every second, which is recommended for accurate countdown notifications.
:::

---

## Miscellaneous

This section covers various standalone settings that control plugin-wide behavior.

### Disable Back World

A list of worlds where the `/back` command is disabled. Players who die or teleport in these worlds will not have their previous location saved.

```yaml
disable-back-world:
  - "world_pvp"
```

### Random Words

A list of words used for random word generation within the plugin (e.g., for random name generation or confirmation prompts).

```yaml
random-words:
  - "apple"
  - "banana"
  - "cherry"
  - "diamond"
  - "emerald"
  - "fire"
  - "gold"
  - "honey"
  - "iron"
  - "jungle"
```

### Enable Offline Player Names

```yaml
enable-offline-player-names: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-offline-player-names` | Boolean | `true` | When enabled, the plugin resolves and caches offline player names for use in tab-completion and commands that accept player name arguments. |

### Blacklist UUIDs

A list of player UUIDs that are blacklisted from certain plugin features. Players with blacklisted UUIDs may be excluded from leaderboards, economy actions, or other systems.

```yaml
blacklist-uuids:
  - "00000000-0000-0000-0000-000000000000"
```

### Default Options

Configure the default state of toggleable player options. Each option is set to `true` (enabled) or `false` (disabled) by default for all players. Players can override these individually through in-game commands.

```yaml
default-options:
  SOCIAL_SPY: false
  GOD: false
  BAN: false
  MUTE: false
  INVSEE: false
  VANISH: false
  PRIVATE_MESSAGE_DISABLE: false
  PAY_DISABLE: false
  POWER_TOOLS_DISABLE: false
  DISABLE_SCOREBOARD: false
  NIGHT_VISION: false
  PHANTOMS_DISABLE: false
  WORLDEDIT_INVENTORY: false
  WORLDEDIT_BOSSBAR_DISABLE: false
```

| Option | Default | Description |
|--------|---------|-------------|
| `SOCIAL_SPY` | `false` | Whether social spy (viewing private messages between other players) is enabled by default. |
| `GOD` | `false` | Whether god mode (invincibility) is enabled by default. |
| `BAN` | `false` | Whether the player is banned by default. |
| `MUTE` | `false` | Whether the player is muted by default. |
| `INVSEE` | `false` | Whether inventory viewing is enabled by default. |
| `VANISH` | `false` | Whether vanish mode (invisibility) is enabled by default. |
| `PRIVATE_MESSAGE_DISABLE` | `false` | Whether receiving private messages is disabled by default. |
| `PAY_DISABLE` | `false` | Whether receiving payments is disabled by default. |
| `POWER_TOOLS_DISABLE` | `false` | Whether power tools (command-bound items) are disabled by default. |
| `DISABLE_SCOREBOARD` | `false` | Whether the scoreboard display is disabled by default. |
| `NIGHT_VISION` | `false` | Whether permanent night vision is enabled by default. |
| `PHANTOMS_DISABLE` | `false` | Whether phantom spawning is disabled by default for the player. |
| `WORLDEDIT_INVENTORY` | `false` | Whether the WorldEdit inventory mode is enabled by default. |
| `WORLDEDIT_BOSSBAR_DISABLE` | `false` | Whether the WorldEdit progress boss bar is disabled by default. |

### Batch Auto Save

```yaml
batch-auto-save: 600
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `batch-auto-save` | Integer | `600` | Interval in seconds between automatic batch saves of player data to the database. Default is 600 seconds (10 minutes). |

### Enable Command Log

```yaml
enable-command-log: false
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-command-log` | Boolean | `false` | When enabled, logs all commands executed by players to the database for auditing purposes. |

### Near Distance

```yaml
near-distance: 200
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `near-distance` | Integer | `200` | The radius (in blocks) used by the `/near` command to find nearby players. |

### Global Date Format

```yaml
global-date-format: "dd/MM/yyyy HH:mm:ss"
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `global-date-format` | String | `dd/MM/yyyy HH:mm:ss` | The date format pattern used throughout the plugin for displaying dates and times. Follows [Java SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html) patterns. |

**Common format patterns:**

| Pattern | Description | Example |
|---------|-------------|---------|
| `dd/MM/yyyy HH:mm:ss` | Day/Month/Year 24-hour time | `04/02/2026 14:30:00` |
| `MM/dd/yyyy hh:mm a` | US-style with AM/PM | `02/04/2026 02:30 PM` |
| `yyyy-MM-dd HH:mm:ss` | ISO 8601 style | `2026-02-04 14:30:00` |

---

## Full Default Configuration

Below is the complete default `config.yml` with all sections and their default values for reference:

```yaml
#
# zEssentials - Main Configuration
#

# Debug mode - Enable verbose logging for troubleshooting
enable-debug: false

# Storage configuration
storage-type: SQLITE
server-type: PAPER

# Database configuration (for MYSQL and HIKARICP storage types)
database-configuration:
  table-prefix: "zessentials_"
  host: "192.168.10.10"
  port: 3306
  user: "homestead"
  password: "secret"
  database: "zessentials"
  debug: false

# Redis configuration (for REDIS server type)
redis-configuration:
  host: "127.0.0.1"
  port: 6379
  password: ""

# Commands that always have cooldowns (even with bypass permission)
force-commands:
  - "/essversion"

# Allow players with essentials.bypass.cooldown to skip cooldowns
enable-cooldown-bypass: true

# Command cooldowns with permission-based overrides
command-cooldowns:
  - command: "heal"
    cooldown: 60
    permissions:
      - permission: "essentials.cooldowns.vip"
        cooldown: 40
      - permission: "essentials.cooldowns.staff"
        cooldown: 20
  - command: "tpr"
    cooldown: 300
    permissions:
      - permission: "essentials.cooldowns.vip"
        cooldown: 120
      - permission: "essentials.cooldowns.staff"
        cooldown: 0

# Command restrictions by world and cuboid region
command-restrictions:
  - commands:
      - "heal"
      - "feed"
    bypass-permission: "essentials.bypass.restriction"
    worlds:
      - "world_pvp"
    cuboids:
      - "world,100,0,100,200,256,200"

# Trash inventory size (must be a multiple of 9: 9, 18, 27, 36, 45, 54)
trash-size: 54

# Compact material conversions (9 items -> 1 block)
compact-materials:
  - COAL:COAL_BLOCK
  - REDSTONE:REDSTONE_BLOCK
  - LAPIS_LAZULI:LAPIS_BLOCK
  - DIAMOND:DIAMOND_BLOCK
  - EMERALD:EMERALD_BLOCK
  - IRON_INGOT:IRON_BLOCK
  - GOLD_INGOT:GOLD_BLOCK
  - RAW_IRON:RAW_IRON_BLOCK
  - RAW_GOLD:RAW_GOLD_BLOCK
  - RAW_COPPER:RAW_COPPER_BLOCK
  - COPPER_INGOT:COPPER_BLOCK

# Smeltable material conversions (instant furnace)
smeltable-materials:
  - RAW_IRON:IRON_INGOT
  - RAW_GOLD:GOLD_INGOT
  - RAW_COPPER:COPPER_INGOT
  - IRON_ORE:IRON_INGOT
  - GOLD_ORE:GOLD_INGOT
  - COPPER_ORE:COPPER_INGOT
  - COBBLESTONE:STONE
  - SAND:GLASS
  - WET_SPONGE:SPONGE

# Global message color scheme
message-colors:
  primary: "#24d65d"
  secondary: "#656665"
  error: "#ff0000"
  success: "#00ff00"

# Chat anti-spam cooldowns (message count threshold: cooldown in seconds)
chat-cooldowns:
  2: 1.5
  4: 5.0
  8: 10.0

# Placeholder replacement system
replace-placeholders:
  - placeholder: "%player_ping%"
    conditions:
      - type: NUMBER
        min: 0
        max: 50
        result: "<#00ff00>%player_ping%ms"
      - type: NUMBER
        min: 51
        max: 100
        result: "<#ffff00>%player_ping%ms"
      - type: NUMBER
        min: 101
        max: 200
        result: "<#ff8800>%player_ping%ms"
      - type: NUMBER
        min: 201
        result: "<#ff0000>%player_ping%ms"

# Fly settings
temp-fly-task: 1
disable-fly-world:
  - "world_pvp"
enable-fly-return: true
fly-task-announce:
  - 300
  - 120
  - 60
  - 30
  - 10
  - 5
  - 4
  - 3
  - 2
  - 1

# Worlds where /back is disabled
disable-back-world:
  - "world_pvp"

# Random words for generation features
random-words:
  - "apple"
  - "banana"
  - "cherry"
  - "diamond"
  - "emerald"
  - "fire"
  - "gold"
  - "honey"
  - "iron"
  - "jungle"

# Resolve and cache offline player names for tab-completion
enable-offline-player-names: true

# Blacklisted UUIDs excluded from certain features
blacklist-uuids:
  - "00000000-0000-0000-0000-000000000000"

# Default player option states
default-options:
  SOCIAL_SPY: false
  GOD: false
  BAN: false
  MUTE: false
  INVSEE: false
  VANISH: false
  PRIVATE_MESSAGE_DISABLE: false
  PAY_DISABLE: false
  POWER_TOOLS_DISABLE: false
  DISABLE_SCOREBOARD: false
  NIGHT_VISION: false
  PHANTOMS_DISABLE: false
  WORLDEDIT_INVENTORY: false
  WORLDEDIT_BOSSBAR_DISABLE: false

# Auto-save interval in seconds (default: 600 = 10 minutes)
batch-auto-save: 600

# Log all player commands to the database
enable-command-log: false

# Radius in blocks for the /near command
near-distance: 200

# Global date format (Java SimpleDateFormat pattern)
global-date-format: "dd/MM/yyyy HH:mm:ss"
```
