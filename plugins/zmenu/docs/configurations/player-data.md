---
sidebar_position: 9
title: Player Data
description: Store and retrieve player-specific data
---

# Player Data

zMenu includes a built-in player data system that allows you to store and retrieve values specific to each player. This is perfect for tracking progress, creating toggles, storing statistics, and more.

## How It Works

Player data is stored in a database (SQLite by default, MySQL/MariaDB optional) and persists across server restarts. Each player has their own set of key-value pairs.

## Accessing Player Data

### Placeholder

Use the `%zmenu_player_value_<key>%` placeholder:

```yaml
item:
  name: "&6Coins: %zmenu_player_value_coins%"
  lore:
    - "&7Kills: %zmenu_player_value_kills%"
    - "&7Deaths: %zmenu_player_value_deaths%"
```

### Commands

```bash
# Set a value
/zm players set <player> <key> <value>

# Add to a value (numeric)
/zm players add <player> <key> <value>

# Get a value
/zm players get <player> <key>

# Remove a key
/zm players remove <player> <key>

# Remove a key from ALL players
/zm players removeall <key>

# List all keys for a player
/zm players keys <player>
```

## Modifying Data with Actions

### The Data Action

```yaml
actions:
  - type: data
    action: SET      # SET, ADD, SUBTRACT, MULTIPLY, DIVIDE, REMOVE
    key: "coins"
    value: "100"
    math: true       # Enable math expressions
```

### Actions

| Action | Description | Example |
|--------|-------------|---------|
| `SET` | Set to a specific value | `value: "100"` |
| `ADD` | Add to current value | `value: "50"` |
| `SUBTRACT` | Subtract from current | `value: "25"` |
| `MULTIPLY` | Multiply current value | `value: "2"` |
| `DIVIDE` | Divide current value | `value: "2"` |
| `REMOVE` | Remove the key entirely | - |

### Math Expressions

Enable math with `math: true`:

```yaml
actions:
  - type: data
    action: SET
    key: "total"
    value: "%zmenu_player_value_base%*1.5+100"
    math: true
```

## Examples

### Coins/Currency System

```yaml
# Display coins
items:
  coin-display:
    slot: 4
    item:
      material: GOLD_NUGGET
      name: "&6&lYour Coins"
      lore:
        - "&7Balance: &e%zmenu_player_value_coins%"

  # Add coins button
  add-coins:
    slot: 11
    item:
      material: GOLD_INGOT
      name: "&a&l+100 Coins"
    actions:
      - type: data
        action: ADD
        key: "coins"
        value: "100"
      - type: message
        messages:
          - "&a+100 coins!"
      - type: refresh

  # Spend coins
  spend-coins:
    slot: 15
    item:
      material: DIAMOND
      name: "&b&lBuy Diamond"
      lore:
        - "&7Cost: &e50 coins"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_value_coins%"
          compare: ">="
          number: 50
          deny:
            - type: message
              messages:
                - "&cYou need 50 coins!"
      success:
        - type: data
          action: SUBTRACT
          key: "coins"
          value: "50"
        - type: console-command
          commands:
            - "give %player% diamond 1"
        - type: refresh
```

### Toggle Setting

```yaml
items:
  toggle-notifications:
    type: SWITCH
    slot: 13
    placeholder: "%zmenu_player_value_notifications%"
    buttons:
      "true":
        item:
          material: LIME_DYE
          name: "&a&lNotifications: ON"
          lore:
            - "&7Click to turn off"
        actions:
          - type: data
            action: SET
            key: "notifications"
            value: "false"
          - type: refresh

      "false":
        item:
          material: GRAY_DYE
          name: "&7&lNotifications: OFF"
          lore:
            - "&7Click to turn on"
        actions:
          - type: data
            action: SET
            key: "notifications"
            value: "true"
          - type: refresh

    default:
      item:
        material: LIME_DYE
        name: "&a&lNotifications: ON"
      actions:
        - type: data
          action: SET
          key: "notifications"
          value: "false"
        - type: refresh
```

### Daily Reward System

```yaml
items:
  daily-reward:
    slot: 22
    item:
      material: CHEST
      name: "&e&lDaily Reward"
      lore:
        - "&7Claim your daily reward!"
        - ""
        - "&7Last claim: &f%zmenu_player_value_last_daily%"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_math_%zmenu_time_unix_timestamp%-%zmenu_player_value_last_daily%%"
          compare: ">="
          number: 86400  # 24 hours in seconds
          deny:
            - type: message
              messages:
                - "&cYou already claimed today's reward!"
      success:
        - type: data
          action: SET
          key: "last_daily"
          value: "%zmenu_time_unix_timestamp%"
        - type: console-command
          commands:
            - "give %player% diamond 5"
        - type: data
          action: ADD
          key: "daily_streak"
          value: "1"
        - type: message
          messages:
            - "&aDaily reward claimed!"
            - "&7Streak: &e%zmenu_player_value_daily_streak%"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
```

### Progress Tracking

```yaml
items:
  quest-progress:
    slot: 13
    type: SWITCH
    placeholder: "%zmenu_player_value_quest_1_stage%"
    buttons:
      "0":
        item:
          material: PAPER
          name: "&7&lQuest: Not Started"
          lore:
            - "&7Click to begin"
        actions:
          - type: data
            action: SET
            key: "quest_1_stage"
            value: "1"
          - type: message
            messages:
              - "&aQuest started!"
          - type: refresh

      "1":
        item:
          material: WRITABLE_BOOK
          name: "&e&lQuest: In Progress"
          lore:
            - "&7Stage 1: Collect 10 wood"

      "2":
        item:
          material: WRITABLE_BOOK
          name: "&e&lQuest: In Progress"
          lore:
            - "&7Stage 2: Craft a sword"

      "complete":
        item:
          material: ENCHANTED_BOOK
          name: "&a&lQuest: Complete!"
          lore:
            - "&7Click to claim reward"
          glow: true
        actions:
          - type: console-command
            commands:
              - "give %player% emerald 10"
          - type: data
            action: SET
            key: "quest_1_stage"
            value: "claimed"
          - type: refresh

      "claimed":
        item:
          material: BOOK
          name: "&8&lQuest: Claimed"
          lore:
            - "&7You've completed this quest"

    default:
      item:
        material: PAPER
        name: "&7&lQuest: Not Started"
```

### Kill Counter

```yaml
items:
  stats-display:
    slot: 4
    item:
      material: PLAYER_HEAD
      playerHead: "%player%"
      name: "&a&l%player%'s Stats"
      lore:
        - "&8&m───────────────"
        - ""
        - "&7Kills: &a%zmenu_player_value_kills%"
        - "&7Deaths: &c%zmenu_player_value_deaths%"
        - "&7K/D Ratio: &e%zmenu_math_%zmenu_player_value_kills%/%zmenu_player_value_deaths%%"
        - ""
        - "&8&m───────────────"
```

## Database Configuration

Configure storage in `config.yml`:

```yaml
# Storage type: SQLITE, MYSQL, MARIADB, or NONE
storage-type: SQLITE

# Database configuration (for MySQL/MariaDB)
database-configuration:
  table-prefix: "zmenu_"
  host: "localhost"
  port: 3306
  user: "username"
  password: "password"
  database: "zmenu"
```

### Converting JSON to SQL

If you previously used JSON storage:

```
/zm players convert
```

This migrates data from JSON files to the configured database.

## Default Values

If a key doesn't exist, the placeholder returns an empty string. Use default values:

```yaml
# In requirements, check for existence
- type: placeholder
  value: "%zmenu_player_value_coins%"
  compare: ">="
  number: 0  # Works even if key doesn't exist
```

Or set defaults on first access:

```yaml
items:
  initialize:
    slot: 0
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_value_initialized%"
          compare: "!="
          target: "true"
    item:
      material: AIR
    actions:
      - type: data
        action: SET
        key: "coins"
        value: "0"
      - type: data
        action: SET
        key: "initialized"
        value: "true"
      - type: refresh
```

## Best Practices

1. **Use descriptive keys**: `daily_reward_claimed` not `drc`
2. **Initialize defaults**: Set initial values for new players
3. **Use math carefully**: Ensure values are numeric for math operations
4. **Clean up old data**: Use `removeall` for unused keys
5. **Backup your database**: Especially before major changes
6. **Document your keys**: Keep track of what data you're storing

## Key Naming Conventions

```
# Good examples
player_coins
quest_tutorial_complete
settings_notifications
stats_kills
daily_last_claim

# Bad examples
c        # Too short
data1    # Not descriptive
x        # Meaningless
```

## Next Steps

- Create [Toggle Buttons](./buttons/types/switch) with player data
- Set up [Custom Commands](./custom-commands)
- Configure the [config.yml](./config-yml) database settings
