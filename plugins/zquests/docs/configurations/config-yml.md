---
sidebar_position: 8
title: config.yml
description: Main configuration file for zQuests
---

# config.yml

This page documents all options available in the main `config.yml` configuration file.

## Debug Options

```yaml
# Enables detailed information display in the console
# Enable this when troubleshooting issues
enable-debug: false

# Enables execution time debugging to measure plugin performance
# Useful for identifying bottlenecks
enable-debug-time: false
```

## Storage Configuration

```yaml
# Storage type options:
# SQLITE - Simple file-based storage (testing/small servers only)
# MYSQL - Direct MySQL connection
# HIKARICP - MySQL with connection pooling (recommended for production)
storage-type: SQLITE

# Database configuration (for MYSQL and HIKARICP)
database-configuration:
  # Table prefix for all zQuests tables
  table-prefix: "zquests_"
  # Database server IP
  host: 192.168.10.10
  # Database port (default MySQL: 3306)
  port: 3306
  # Database username
  user: your_username
  # Database password
  password: 'your_password'
  # Database name
  database: zquests
  # Enable SQL query logging
  debug: false
```

:::warning SQLite Limitations
SQLite is recommended only for testing. Some features may have limited functionality. Use HIKARICP for production servers.
:::

## Command Configuration

```yaml
# Aliases for the main /zquests command
main-command-aliases:
  - quests
  - quest
  - q

# Default inventory opened by /quests command
main-command-inventory-name: "quests"

# Permission-based starting page
# Players with these permissions start on different pages
main-command-page:
  - permission: "quests.page.2"
    inventory: "quests"
    page: 2
    priority: 1
  - permission: "quests.page.3"
    inventory: "quests"
    page: 3
    priority: 2
```

## Progress Bar Configuration

Configure the appearance of progress bars in placeholders:

```yaml
progress-bar:
  # Character for completed progress
  icon: '|'
  # Character for remaining progress
  not-completed-icon: '|'
  # Color for completed portion (hex color)
  progress-color: "#0ff216"
  # Color for remaining portion (hex color)
  color: "#828282"
  # Total bar length (number of characters)
  size: 30
```

**Example output:** `||||||||||||||||||||||||||||||` (green portion = complete, gray = remaining)

## Lore Line Configuration

Configure the `%zquests_lore_line_<quest>%` placeholder format:

```yaml
lore-line-placeholder:
  # Format for active (incomplete) quests
  active: "%progress-bar% &8- &6%progress%&8/&f%goal% &c✘"
  # Format for completed quests
  complete: "%progress-bar% &8- &6%progress%&8/&f%goal% &a✔"
```

**Available variables:**
- `%progress-bar%` - The visual progress bar
- `%progress%` - Current progress number
- `%goal%` - Quest goal number

## Favorite Quests Placeholder

Configure the `%zquests_favorite_quests%` placeholder:

```yaml
placeholder-favorite:
  # Maximum number of favorite quests to display
  limit: 3
  # Message shown when player has no favorites
  empty: "&cNo favorite quests"
  # Format for each quest in the list
  result: "&f%quest-description%\n&8%quest-display-name%\n#fcd600%quest-progress%&8/&f%quest-objective%"
  # Separator between quests
  between: "\n\n"
```

**Available variables in `result`:**
- `%quest-name%` - Internal quest name
- `%quest-display-name%` - Display name
- `%quest-description%` - Description
- `%quest-thumbnail%` - Thumbnail material
- `%quest-type%` - Quest type
- `%quest-objective%` - Quest goal
- `%quest-lore-line%` - Formatted lore line
- `%quest-progress-bar%` - Progress bar
- `%quest-percent%` - Completion percentage
- `%quest-progress%` - Current progress
- `%quest-global-group-name%` - Group name

## Quest Groups

Organize quests into groups for placeholders:

```yaml
quests-groups:
  mining:
    display-name: "Mining Quests"
    quests:
      - "stone-breaker-1"
      - "stone-breaker-2"
      - "ore-miner-1"
  farming:
    display-name: "Farming Quests"
    quests:
      - "wheat-farmer-1"
      - "crop-master-1"

# Default group name for ungrouped quests
global-group-display-name: "General"
```

**Group placeholders:**
- `%zquests_group_name_mining%` - "Mining Quests"
- `%zquests_group_count_mining%` - Total quests in group
- `%zquests_group_finish_mining%` - Completed quests
- `%zquests_group_percent_mining%` - Completion percentage

## Global Rewards

Rewards given for ALL quest completions:

```yaml
global-rewards:
  - type: message
    messages:
      - "&aQuest completed: &e%name%"
  - type: sound
    sound: ENTITY_PLAYER_LEVELUP
```

**Available placeholders:** `%name%`, `%description%`, `%goal%`

## Custom Rewards

Special rewards when specific quest combinations are completed:

```yaml
custom-rewards:
  - quests:
      - "tutorial-1"
      - "tutorial-2"
      - "tutorial-3"
    actions:
      - type: message
        messages:
          - "&6&lTutorial Complete!"
      - type: console_command
        commands:
          - "give %player% diamond 10"
```

## Event Configuration

Control quest-related events and scoreboard updates:

```yaml
events:
  - event: QuestStartEvent
    enabled: true
    update-scoreboard: false

  - event: QuestProgressEvent
    enabled: true
    update-scoreboard: false

  - event: QuestCompleteEvent
    enabled: true
    update-scoreboard: false

  - event: QuestFavoriteChangeEvent
    enabled: true
    update-scoreboard: false

  - event: QuestPostProgressEvent
    enabled: true
    update-scoreboard: false

  - event: QuestUserLoadEvent
    enabled: true
    update-scoreboard: false
```

Set `update-scoreboard: true` to refresh the player's scoreboard when that event occurs (requires zEssentials).

## Date Format

Configure date display format for placeholders:

```yaml
date-format: "dd/MM/yyyy HH:mm:ss"
```

Uses Java SimpleDateFormat patterns.

## Look At Detection

Configure detection distance for LOOK_AT quest types:

```yaml
# Maximum distance for LOOK_AT_BLOCK detection
look-at-distance-block: 50

# Maximum distance for LOOK_AT_ENTITY detection
look-at-distance-entity: 50
```

## Hologram & Waypoint Updates

Control automatic updates:

```yaml
# Update holograms when quest state changes
update-hologram: true

# Update waypoints when quest state changes
update-waypoint: true
```

## Complete Example

```yaml
enable-debug: false
enable-debug-time: false

storage-type: HIKARICP

database-configuration:
  table-prefix: "zquests_"
  host: localhost
  port: 3306
  user: minecraft
  password: 'secure_password'
  database: minecraft_quests
  debug: false

main-command-aliases:
  - quests
  - quest
  - q

main-command-inventory-name: "quests"

main-command-page:
  - permission: "quests.vip"
    inventory: "quests_vip"
    page: 1
    priority: 1

progress-bar:
  icon: '█'
  not-completed-icon: '░'
  progress-color: "#00FF00"
  color: "#444444"
  size: 20

lore-line-placeholder:
  active: "%progress-bar% &7%progress%/%goal%"
  complete: "%progress-bar% &a✔ Complete!"

placeholder-favorite:
  limit: 5
  empty: "&7No tracked quests"
  result: "&6%quest-display-name%\n&7%quest-progress%/%quest-objective%"
  between: "\n"

quests-groups:
  daily:
    display-name: "&eDaily Quests"
    quests:
      - "daily-mining"
      - "daily-farming"
  weekly:
    display-name: "&6Weekly Quests"
    quests:
      - "weekly-boss"

global-group-display-name: "Miscellaneous"

global-rewards:
  - type: sound
    sound: ENTITY_EXPERIENCE_ORB_PICKUP

custom-rewards:
  - quests:
      - "daily-mining"
      - "daily-farming"
    actions:
      - type: message
        messages:
          - "&6Daily bonus: All daily quests complete!"

events:
  - event: QuestCompleteEvent
    enabled: true
    update-scoreboard: true
  - event: QuestProgressEvent
    enabled: true
    update-scoreboard: false

date-format: "MMM dd, yyyy"

look-at-distance-block: 100
look-at-distance-entity: 50

update-hologram: true
update-waypoint: true
```

## Next Steps

- Configure [Quests](./quests)
- Set up [Rewards](./rewards)
- Learn about [Placeholders](./placeholders)
