---
title: Main Configuration
description: Main configuration file (config.yml) for zEssentials
---

# Main Configuration

This page documents every option of the main `config.yml` file located at `plugins/zEssentials/config.yml`. This file controls global plugin behavior including storage, cooldowns, restrictions, message colors, fly settings, and more. Module-specific settings are in `plugins/zEssentials/modules/<module>/config.yml`.

---

## Debug

Enable or disable debug mode. When enabled, the plugin outputs additional logging to the console, which is useful for troubleshooting issues.

```yaml
enable-debug: false
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-debug` | Boolean | `false` | Enables verbose debug logging in the server console |

<CalloutContainer type="info">

<CalloutDescription>
If you request support, enable debug mode and send the logs. Only keep it enabled while troubleshooting: debug output can be very verbose.
</CalloutDescription>

</CalloutContainer>

---

## Storage

Configure how zEssentials stores data, the server communication type, and database/Redis connection details. See the [Database](../database) page for the full schema.

### Storage Type

```yaml
storage-type: SQLITE
```

| Value | Description |
|-------|-------------|
| `SQLITE` | Local file-based storage (`plugins/zEssentials/database.db`). Only intended to install and test the plugin, some features are limited. |
| `MYSQL` | MySQL database through a HikariCP connection pool. |
| `MARIADB` | MariaDB database through a HikariCP connection pool, using the MariaDB driver. |
| `HIKARICP` | MySQL/MariaDB database through a HikariCP connection pool. Recommended for production. |
| `JSON` | One JSON file per player in `plugins/zEssentials/users/`. Not every feature is supported. |

<CalloutContainer type="warning">

<CalloutDescription>
Use `MYSQL`, `MARIADB` or `HIKARICP` in production. SQLite is only there to install the plugin and run tests, and the JSON storage does not support every feature (vaults, item mailbox, chat history, baltop...).
</CalloutDescription>

</CalloutContainer>

### Server Type

```yaml
server-type: PAPER
```

| Value | Description |
|-------|-------------|
| `PAPER` | Default mode. All data is handled locally. |
| `REDIS` | Multi-server mode with synchronization via Redis pub/sub. **Currently in development**: in the current version the Redis server is not started and this value behaves like `PAPER`. |

### Database Configuration

Used when `storage-type` is set to `MYSQL`, `MARIADB` or `HIKARICP`.

```yaml
database-configuration:
  table-prefix: "zessentials_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: 'secret'
  database: zessentials
  debug: false
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `table-prefix` | String | `zessentials_` | Prefix applied to all database table names. Useful when sharing a database with other plugins. It is advisable not to change it. |
| `host` | String | `192.168.10.10` | Hostname or IP address of the database server. |
| `port` | Integer | `3306` | Port the database server is listening on. |
| `user` | String | `homestead` | Database username. |
| `password` | String | `secret` | Database password. |
| `database` | String | `zessentials` | Name of the database to use. The database must already exist. |
| `debug` | Boolean | `false` | Enables SQL query debug logging. |

<CalloutContainer type="warning">

<CalloutDescription>
Change the default database credentials before deploying to production. The default values (`homestead` / `secret`) are placeholders and must not be used in a live environment.
</CalloutDescription>

</CalloutContainer>

### Batch Auto Save

```yaml
batch-auto-save: 10000
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `batch-auto-save` | Long | `10000` | Interval in **milliseconds** between two batch writes to the database. Logs (commands, chat messages, private messages, economy transactions) and fly time updates are queued and sent in a single batch at this interval. |

### Redis Configuration

Used by the `REDIS` server type.

```yaml
redis-configuration:
  host: "192.168.10.10"
  port: 6379
  password: "123456a"
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `host` | String | `192.168.10.10` | Hostname or IP address of the Redis server. |
| `port` | Integer | `6379` | Port the Redis server is listening on. |
| `password` | String | `123456a` | Redis password. |

---

## Commands

### Force Commands

Commands listed here keep working even if the module they belong to is disabled. Use the main command name, without the `/`.

```yaml
force-commands:
  # - rtp
  # - home
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `force-commands` | List of Strings | *(empty)* | Main command names that stay available when their module is disabled. |

### Cooldown Bypass

```yaml
enable-cooldown-bypass: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-cooldown-bypass` | Boolean | `true` | When enabled, players with the `essentials.bypass.cooldown` permission ignore the cooldowns defined in `command-cooldowns`. |

### Command Cooldowns

Define a cooldown (in seconds) per command, with optional permission-based overrides. The cooldown is applied after the command has been successfully executed.

- **command**: The main command name (without the leading `/`).
- **cooldown**: The base cooldown in seconds.
- **permissions**: A list of permission-based overrides. If the player has several matching permissions, the **lowest** cooldown is used. A cooldown of `0` means no cooldown.

```yaml
command-cooldowns:
  - command: heal
    cooldown: 60
    permissions:
      - permission: "essentials.cooldown.heal.vip"
        cooldown: 40
      - permission: "essentials.cooldown.heal.staff"
        cooldown: 20
  - command: tpr
    cooldown: 300
    permissions:
      - permission: "essentials.cooldown.rtp.vip"
        cooldown: 120
      - permission: "essentials.cooldown.rtp.staff"
        cooldown: 0
```

**Example breakdown for `heal`:**

| Player Type | Permission | Cooldown |
|-------------|-----------|----------|
| Default | *(none)* | 60 seconds |
| VIP | `essentials.cooldown.heal.vip` | 40 seconds |
| Staff | `essentials.cooldown.heal.staff` | 20 seconds |

**Example breakdown for `tpr`:**

| Player Type | Permission | Cooldown |
|-------------|-----------|----------|
| Default | *(none)* | 300 seconds (5 minutes) |
| VIP | `essentials.cooldown.rtp.vip` | 120 seconds (2 minutes) |
| Staff | `essentials.cooldown.rtp.staff` | 0 seconds (no cooldown) |

### Command Restrictions

Disable commands in specific worlds or within cuboid regions. Players with the bypass permission ignore the restriction.

```yaml
command-restrictions:
  - commands:
      - "spawn"
    bypass-permission: "essentials.bypass.commandrestriction.spawn"
    worlds:
      - "world_nether"
    cuboids:
      - "world,0,0,0,100,255,100"
```

| Option | Type | Description |
|--------|------|-------------|
| `commands` | List of Strings | The commands to restrict (without the leading `/`). The typed label is compared, so list the aliases too if needed. |
| `bypass-permission` | String | Permission that allows a player to bypass this restriction. |
| `worlds` | List of Strings | World names where the listed commands are blocked. |
| `cuboids` | List of Strings | Cuboid regions where the listed commands are blocked. Format: `world,x1,y1,z1,x2,y2,z2` |

The cuboid is defined by two opposite corners; any player standing inside the box cannot use the listed commands. You can define multiple restriction entries.

### Command Anti-Spam

Progressive cooldown preventing players from spamming commands. Each entry means: "if the player has executed `messages` commands within the last `cooldown` milliseconds, block the next command".

```yaml
cooldowns:
  - messages: 2
    cooldown: 1500 # max 1.5s
  - messages: 4
    cooldown: 5000 # max 5s
  - messages: 8
    cooldown: 10000 # max 10s
```

| Option | Type | Description |
|--------|------|-------------|
| `messages` | Integer | Number of commands executed. |
| `cooldown` | Long | Time window in milliseconds. |

To disable this system, set `cooldowns: []`. Players with the `essentials.cooldown.command.bypass` permission are not affected.

### Command Log

```yaml
enable-command-log: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-command-log` | Boolean | `true` | Stores every command executed by players in the `commands` table. Only works with SQL storage. |

---

## Items

### Trash

```yaml
trash-size: 27
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `trash-size` | Integer | `27` | Size of the `/trash` inventory. Must be `9`, `18`, `27`, `36`, `45` or `54`. |

### Compact Materials

Materials that can be compacted with the `/compact` (`/condense`) and `/compactall` (`/condenseall`) commands. Each entry maps a material (`from`) to its compacted form (`to`).

```yaml
compact-materials:
  - from: COAL
    to: COAL_BLOCK
  - from: REDSTONE
    to: REDSTONE_BLOCK
  - from: LAPIS_LAZULI
    to: LAPIS_BLOCK
  - from: IRON_INGOT
    to: IRON_BLOCK
  - from: GOLD_INGOT
    to: GOLD_BLOCK
  - from: IRON_NUGGET
    to: IRON_INGOT
  - from: GOLD_NUGGET
    to: GOLD_INGOT
  - from: DIAMOND
    to: DIAMOND_BLOCK
  - from: EMERALD
    to: EMERALD_BLOCK
  - from: COPPER_INGOT
    to: COPPER_BLOCK
  - from: NETHERITE_INGOT
    to: NETHERITE_BLOCK
```

Material names must be valid [Bukkit Material](https://jd.papermc.io/paper/org/bukkit/Material.html) names.

### Smeltable Materials

Materials that can be instantly smelted with the `/furnace` command.

```yaml
smeltable-materials:
  - from: RAW_IRON
    to: IRON_INGOT
  - from: RAW_COPPER
    to: COPPER_INGOT
  - from: RAW_GOLD
    to: GOLD_INGOT
  - from: SAND
    to: GLASS
  - from: CLAY_BALL
    to: BRICK
  - from: ANCIENT_DEBRIS
    to: NETHERITE_SCRAP
  - from: WET_SPONGE
    to: SPONGE
  - from: CACTUS
    to: GREEN_DYE
  - from: KELP
    to: DRIED_KELP
```

---

## Message Colors

Color keys that are replaced in all plugin messages. You can add your own keys.

```yaml
message-colors:
  - key: "<primary>"
    color: "#24d65d"
  - key: "<secondary>"
    color: "#656665"
  - key: "<error>"
    color: "#ff0000"
  - key: "<success>"
    color: "#00ff00"
```

| Key | Default | Description |
|-----|---------|-------------|
| `<primary>` | `#24d65d` | Main accent color for highlights and important values. |
| `<secondary>` | `#656665` | Secondary color for less prominent text. |
| `<error>` | `#ff0000` | Color for error messages. |
| `<success>` | `#00ff00` | Color for success confirmations. |

---

## Placeholders

### Empty Placeholder Value

```yaml
placeholder-empty: "Empty"
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `placeholder-empty` | String | `Empty` | Default value returned by placeholders when no data is available. |

### Replace Placeholders

Replace the result of a PlaceholderAPI placeholder with another value, for example to add colors. Use the placeholder `%zessentials_replace_<placeholder>%` to apply the configuration (e.g. `%zessentials_replace_player_ping%`).

```yaml
replace-placeholders:
  - placeholder: 'player_ping' # Placeholder to replace, without %
    default: '&c%result%' # Used if no condition matches
    replaces:
      - type: STRING
        equalsTo: 0
        value: '&aWHOA YOU DONT HAVE PING WTF YOU ARE IN A DATACENTER ?'
      - type: NUMBER
        max: 50
        value: '&a%result%'
      - type: NUMBER
        max: 99
        value: '&2%result%'
      - type: NUMBER
        max: 199
        value: '&e%result%'
      - type: NUMBER
        max: 299
        value: '&c%result%'
```

| Option | Description |
|--------|-------------|
| `placeholder` | The PlaceholderAPI placeholder to replace, without the `%`. |
| `default` | Value used when no condition matches. |
| `replaces` | List of conditions, checked in order. The first matching condition is used. |

**Condition types:**

| Type | Properties | Matches when |
|------|------------|--------------|
| `STRING` | `equalsTo`, `value` | The placeholder result is equal (case-insensitive) to `equalsTo`. |
| `NUMBER` | `max`, `value` | The placeholder result is a number lower than or equal to `max`. |

In `value` and `default`, `%result%` is replaced by the original placeholder value.

### Random Words

Words returned by the `%zessentials_random_word%` placeholder (a word is never given twice until the list is cleared with `/zessentials clear-random-word`).

```yaml
random-words:
  - "enderdragon"
  - "netherite"
  - "crafting"
  - "survival"
  - "adventure"
  - "exploration"
  - "obsidian"
  - "diamond"
  - "goldmine"
  - "enderchest"
```

---

## Near

```yaml
near-distance: 50.0

near-direction-replacements:
  forward: "↑"
  forward-right: "↗"
  right: "→"
  back-right: "↘"
  back: "↓"
  back-left: "↙"
  left: "←"
  forward-left: "↖"

near-permissions:
  - permission: "essentials.near.vip"
    distance: 100.0
  - permission: "essentials.near.staff"
    distance: 200.0
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `near-distance` | Double | `50.0` | Default radius (in blocks) of the `/near` command. |
| `near-direction-replacements` | Section | *(arrows)* | Arrows used to display the direction of each player in `/near`. |
| `near-permissions` | List | *(see above)* | Permission-based radius. The first permission the player has is used. |

---

## Time

```yaml
day-time: 1000
night-time: 13000
time-smooth-change: false
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `day-time` | Long | `1000` | World time set by the `/day` command. |
| `night-time` | Long | `13000` | World time set by the `/night` command. |
| `time-smooth-change` | Boolean | `false` | Animates the world time change of `/day` and `/night` instead of an instant change. |

---

## Fly Settings

```yaml
temp-fly-task: false

disable-fly-world:
  - world_the_end

enable-fly-return: false

fly-task-announce:
  - 7200 # 2 hours
  - 3600 # 1 hour
  - 1800 # 30 minutes
  - 900 # 15 minutes
  - 300 # 5 minutes
  - 120 # 2 minutes
  - 60 # 1 minute
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
| `temp-fly-task` | Boolean | `false` | Enables the task (run every second) that decreases the temporary fly time of players (`/fly add`, `/fly set`...). |
| `disable-fly-world` | List of Strings | `[world_the_end]` | Worlds where fly is disabled. Bypass: `essentials.fly.bypass.world`. |
| `enable-fly-return` | Boolean | `false` | Re-enables fly when the player returns to a world where it is allowed. |
| `fly-task-announce` | List of Integers | *(see above)* | Remaining temporary fly times (in seconds) at which the player is notified. |

---

## Back

```yaml
disable-back-world:
  - world_the_end
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `disable-back-world` | List of Strings | `[world_the_end]` | Worlds where `/back` is disabled: the last location is not saved in these worlds. |

---

## Players

### Offline Player Names

```yaml
enable-offline-player-names: true
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-offline-player-names` | Boolean | `true` | Displays the names of online **and** offline players in command tab completion. |

### Blacklist UUIDs

Players whose UUID is listed here cannot connect to the server (they are kicked at login with "Unable to verify your connection, please try again.").

```yaml
blacklist-uuids:
  - "00000000-0000-0000-0000-000000000000"
```

### Default Options

Values of the player options applied to **new players** on their first join.

```yaml
default-options:
  - option: WORLDEDIT_INVENTORY
    value: true
```

| Option | Description |
|--------|-------------|
| `SOCIAL_SPY` | Spy the private messages between players. |
| `GOD` | Makes the player invincible. |
| `BAN` | The player is banned. |
| `MUTE` | The player is muted. |
| `INVSEE` | Allows checking the inventory of other players. |
| `VANISH` | Makes the player invisible. |
| `PRIVATE_MESSAGE_DISABLE` | Disables private messages. |
| `PAY_DISABLE` | Disables receiving payments. |
| `POWER_TOOLS_DISABLE` | Disables the power tools. |
| `DISABLE_SCOREBOARD` | Disables the scoreboard. |
| `NIGHT_VISION` | Permanent night vision. |
| `PHANTOMS_DISABLE` | Disables phantom spawning. |
| `WORLDEDIT_INVENTORY` | Uses the player's inventory for WorldEdit. |
| `WORLDEDIT_BOSSBAR_DISABLE` | Disables the WorldEdit boss bar. |
| `TELEPORT_REQUEST_DISABLE` | Disables receiving teleport requests (`/tpa`). |
| `TELEPORT_HERE_REQUEST_DISABLE` | Disables receiving `/tpahere` requests. |
| `DEATH_MESSAGE_DISABLE` | Hides death messages. |
| `PAY_NOTIFICATION_DISABLE` | Disables payment notifications. |
| `PLAYER_PING_SOUND_DISABLE` | Disables the chat ping sound. |

### First Join Teleport

```yaml
enable-first-join-teleport: false
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-first-join-teleport` | Boolean | `false` | Teleports players on their first join to the configured first spawn, or to the spawn if no first spawn is set, or to a random location if `enable-first-join-rtp` is enabled in `modules/teleportation/config.yml`. **Disabled by default since 1.0.3.9.** |

<CalloutContainer type="info">

<CalloutDescription>
If you used the first spawn feature before 1.0.3.9, set this option to `true` to keep the previous behavior.
</CalloutDescription>

</CalloutContainer>

---

## Date Format

```yaml
global-date-format: "yyyy-MM-dd HH:mm:ss"
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `global-date-format` | String | `yyyy-MM-dd HH:mm:ss` | Date format used when no other format is available. Follows the [Java SimpleDateFormat](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/SimpleDateFormat.html) patterns. |

**Common format patterns:**

| Pattern | Description | Example |
|---------|-------------|---------|
| `yyyy-MM-dd HH:mm:ss` | ISO 8601 style | `2026-02-04 14:30:00` |
| `dd/MM/yyyy HH:mm:ss` | Day/Month/Year 24-hour time | `04/02/2026 14:30:00` |
| `MM/dd/yyyy hh:mm a` | US-style with AM/PM | `02/04/2026 02:30 PM` |

---

## Metrics

Since 1.0.3.9, zEssentials sends anonymous usage statistics and errors to [FastStats](https://faststats.dev/project/zessentials/). This is not configured in `config.yml`: FastStats creates its own configuration file in the `faststats` folder of your `plugins/` directory, where you can opt out.

---

## Full Default Configuration

Below is the complete default `config.yml`:

```yaml
# Displays debug items in the console, if you request support, please enable debug and send logs with debugs
enable-debug: false

# Storage:
# SQLITE - For the launch of the plugin only.
# MYSQL - Allows creating a simple connection to the database, only for small servers.
# HIKARICP - HikariCP is a fast and lightweight JDBC connection pool.
storage-type: SQLITE

# PAPER - Default type
# REDIS - Allows connecting several servers (currently in development)
server-type: PAPER

database-configuration:
  table-prefix: "zessentials_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: 'secret'
  database: zessentials
  debug: false

# Sends requests available in batch to the database (history of messages, commands, etc.)
batch-auto-save: 10000

redis-configuration:
  host: "192.168.10.10"
  port: 6379
  password: "123456a"

# Commands that will work even if their module is disabled
force-commands:
  # - rtp
  # - home

enable-cooldown-bypass: true

command-cooldowns:
  - command: heal
    cooldown: 60
    permissions:
      - permission: "essentials.cooldown.heal.vip"
        cooldown: 40
      - permission: "essentials.cooldown.heal.staff"
        cooldown: 20
  - command: tpr
    cooldown: 300
    permissions:
      - permission: "essentials.cooldown.rtp.vip"
        cooldown: 120
      - permission: "essentials.cooldown.rtp.staff"
        cooldown: 0

command-restrictions:
  - commands:
      - "spawn"
    bypass-permission: "essentials.bypass.commandrestriction.spawn"
    worlds:
      - "world_nether"
    cuboids:
      - "world,0,0,0,100,255,100"

trash-size: 27

compact-materials:
  - from: COAL
    to: COAL_BLOCK
  - from: REDSTONE
    to: REDSTONE_BLOCK
  - from: LAPIS_LAZULI
    to: LAPIS_BLOCK
  - from: IRON_INGOT
    to: IRON_BLOCK
  - from: GOLD_INGOT
    to: GOLD_BLOCK
  - from: IRON_NUGGET
    to: IRON_INGOT
  - from: GOLD_NUGGET
    to: GOLD_INGOT
  - from: DIAMOND
    to: DIAMOND_BLOCK
  - from: EMERALD
    to: EMERALD_BLOCK
  - from: COPPER_INGOT
    to: COPPER_BLOCK
  - from: NETHERITE_INGOT
    to: NETHERITE_BLOCK

message-colors:
  - key: "<primary>"
    color: "#24d65d"
  - key: "<secondary>"
    color: "#656665"
  - key: "<error>"
    color: "#ff0000"
  - key: "<success>"
    color: "#00ff00"

cooldowns:
  - messages: 2
    cooldown: 1500 # max 1.5s
  - messages: 4
    cooldown: 5000 # max 5s
  - messages: 8
    cooldown: 10000 # max 10s

enable-command-log: true

smeltable-materials:
  - from: RAW_IRON
    to: IRON_INGOT
  - from: RAW_COPPER
    to: COPPER_INGOT
  - from: RAW_GOLD
    to: GOLD_INGOT
  - from: SAND
    to: GLASS
  - from: CLAY_BALL
    to: BRICK
  - from: ANCIENT_DEBRIS
    to: NETHERITE_SCRAP
  - from: WET_SPONGE
    to: SPONGE
  - from: CACTUS
    to: GREEN_DYE
  - from: KELP
    to: DRIED_KELP

placeholder-empty: "Empty"

near-distance: 50.0

near-direction-replacements:
  forward: "↑"
  forward-right: "↗"
  right: "→"
  back-right: "↘"
  back: "↓"
  back-left: "↙"
  left: "←"
  forward-left: "↖"

day-time: 1000
night-time: 13000
time-smooth-change: false

near-permissions:
  - permission: "essentials.near.vip"
    distance: 100.0
  - permission: "essentials.near.staff"
    distance: 200.0

global-date-format: "yyyy-MM-dd HH:mm:ss"

replace-placeholders:
  - placeholder: 'player_ping'
    default: '&c%result%'
    replaces:
      - type: STRING
        equalsTo: 0
        value: '&aWHOA YOU DONT HAVE PING WTF YOU ARE IN A DATACENTER ?'
      - type: NUMBER
        max: 50
        value: '&a%result%'
      - type: NUMBER
        max: 99
        value: '&2%result%'
      - type: NUMBER
        max: 199
        value: '&e%result%'
      - type: NUMBER
        max: 299
        value: '&c%result%'

temp-fly-task: false

disable-fly-world:
  - world_the_end

enable-fly-return: false

fly-task-announce:
  - 7200
  - 3600
  - 1800
  - 900
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

disable-back-world:
  - world_the_end

random-words:
  - "enderdragon"
  - "netherite"
  - "crafting"
  - "survival"
  - "adventure"
  - "exploration"
  - "obsidian"
  - "diamond"
  - "goldmine"
  - "enderchest"

enable-offline-player-names: true

blacklist-uuids:
  - "00000000-0000-0000-0000-000000000000"

default-options:
  - option: WORLDEDIT_INVENTORY
    value: true

# Teleports players on their first join to the configured first-spawn, spawn, or random teleport location
enable-first-join-teleport: false
```
