---
sidebar_position: 3
title: Placeholders
description: All available placeholders in zMenu
---

# Placeholders

zMenu provides built-in placeholders and supports PlaceholderAPI for dynamic content in your inventories.

## Built-in Placeholders

These placeholders are available without any additional plugins:

### Player Placeholders

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%player%` | Player's name | `Notch` |

### Pagination Placeholders

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%page%` | Current page number | `1` |
| `%maxPage%` | Maximum page number | `5` |
| `%max-page%` | Maximum page number (alias) | `5` |
| `%zmenu_player_page%` | Current page (PAPI format) | `1` |
| `%zmenu_player_next_page%` | Next page number | `2` |
| `%zmenu_player_previous_page%` | Previous page number | `0` |
| `%zmenu_player_max_page%` | Maximum page (PAPI format) | `5` |

### Inventory History Placeholders

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%zmenu_player_previous_inventories%` | Number of previous inventories in history | `3` |

### Math Placeholders

Perform calculations directly in your configuration:

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `%zmenu_math_<expression>%` | Calculate a math expression | `%zmenu_math_5+5%` → `10` |
| `%zmenu_formatted_math_<expression>%` | Formatted math result | `%zmenu_formatted_math_1000+500%` → `1,500` |

**Supported Operations:**
- Addition: `+`
- Subtraction: `-`
- Multiplication: `*`
- Division: `/`
- Parentheses: `()`

**Examples:**
```yaml
lore:
  - "&7Result: %zmenu_math_10*5%"           # Output: 50
  - "&7Balance: %zmenu_formatted_math_%vault_eco_balance%*2%"
```

### Player Data Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zmenu_player_value_<key>%` | Get player data value |

**Example:**
```yaml
lore:
  - "&7Coins: &6%zmenu_player_value_coins%"
  - "&7Kills: &c%zmenu_player_value_kills%"
```

### Command Argument Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zmenu_argument_<key>%` | Get command argument value |

This placeholder retrieves arguments passed through custom commands configured in zMenu.

**Example:**

Command configuration:
```yaml
# In commands/commands.yml
commands:
  punish:
    command: punish
    arguments:
      - player
    inventory: example_punish
```

Using the argument in your inventory:
```yaml
items:
  player-info:
    item:
      material: PLAYER_HEAD
      playerHead: "%zmenu_argument_player%"
      name: "&cPunish %zmenu_argument_player%"
      lore:
        - "&7Click to punish this player"
```

When a player runs `/punish Notch`, the placeholder `%zmenu_argument_player%` will return `Notch`.

### Global Placeholder Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zmenu_global_placeholders_<key>%` | Get global placeholder value |

**Example:**
```yaml
# In global-placeholders.yml
server-name: "My Server"

# In inventory
name: "&6%zmenu_global_placeholders_server-name%"
```

### Time Placeholders

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%zmenu_time_unix_timestamp%` | Current Unix timestamp | `1704067200` |
| `%zmenu_time_next_day_unix_timestamp%` | Tomorrow's Unix timestamp | `1704153600` |
| `%zmenu_time_today_start_unix_timestamp%` | Start of today timestamp | `1704067200` |

### Statistic Placeholders

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%zmenu_statistic_hours_played%` | Hours played (rounded) | `42` |
| `%zmenu_statistic_time_played%` | Formatted playtime | `1d 18h 30m` |

## PlaceholderAPI Integration

zMenu fully supports PlaceholderAPI. Any PAPI placeholder works in:
- Inventory titles
- Item names
- Item lore
- Messages
- Requirements
- Actions

### Popular PlaceholderAPI Expansions

Install expansions with: `/papi ecloud download <name>`

| Expansion | Placeholders | Example |
|-----------|-------------|---------|
| Player | `%player_name%`, `%player_health%`, `%player_level%` | `%player_name%` → `Notch` |
| Vault | `%vault_eco_balance%`, `%vault_eco_balance_formatted%` | `%vault_eco_balance%` → `1500.00` |
| Statistic | `%statistic_deaths%`, `%statistic_kills%` | `%statistic_deaths%` → `42` |
| Server | `%server_online%`, `%server_max_players%` | `%server_online%` → `50` |
| LuckPerms | `%luckperms_prefix%`, `%luckperms_primary_group_name%` | `%luckperms_prefix%` → `[Admin]` |

### Using PlaceholderAPI

```yaml
items:
  profile:
    slot: 4
    item:
      material: PLAYER_HEAD
      playerHead: "%player_name%"
      name: "&6%player_name%'s Profile"
      lore:
        - "&8&m─────────────────"
        - ""
        - "&7Health: &c%player_health%&7/&c%player_max_health%"
        - "&7Level: &a%player_level%"
        - "&7Balance: &6$%vault_eco_balance_formatted%"
        - ""
        - "&7Kills: &a%statistic_player_kills%"
        - "&7Deaths: &c%statistic_deaths%"
        - ""
        - "&8&m─────────────────"
```

## Local Placeholders

Define placeholders specific to an inventory:

```yaml
# In your inventory file
local-placeholders:
  price: "100"
  item-name: "Special Sword"

items:
  shop-item:
    item:
      name: "&6%item-name%"
      lore:
        - "&7Price: &a$%price%"
```

## Placeholder Caching

For better performance, you can enable placeholder caching in `config.yml`:

```yaml
# Enable PlaceholderAPI caching
enable-cache-placeholder-api: true

# Cache duration in ticks (20 ticks = 1 second)
cache-placeholder-api: 20
```

:::warning
Caching means placeholders won't update instantly. Only enable this if you have performance issues and understand the implications.
:::

## Nested Placeholders

You can use placeholders inside other placeholders:

```yaml
# Using player data in math
lore:
  - "&7Double coins: %zmenu_math_%zmenu_player_value_coins%*2%"
```

## Requirements with Placeholders

Use placeholders in requirements to create dynamic conditions:

```yaml
click-requirement:
  requirements:
    - type: placeholder
      value: "%vault_eco_balance%"
      compare: ">="
      number: 100
      deny:
        - type: message
          messages:
            - "&cYou need at least $100!"
```

## Placeholder Formatting

### Numbers

For formatted numbers, use the `_formatted` variants when available:
- `%vault_eco_balance_formatted%` instead of `%vault_eco_balance%`
- `%zmenu_formatted_math_<expr>%` instead of `%zmenu_math_<expr>%`

### Colors in Placeholders

Some placeholders include color codes. To strip them:
```yaml
name: "%luckperms_prefix% %player_name%"  # Keeps colors
```

## Debugging Placeholders

If placeholders aren't working:

1. **Check PlaceholderAPI is installed**
   ```
   /papi info
   ```

2. **Test the placeholder**
   ```
   /papi parse me %placeholder_name%
   ```

3. **Check the expansion is installed**
   ```
   /papi list
   ```

4. **Install missing expansions**
   ```
   /papi ecloud download <expansion>
   /papi reload
   ```

## Quick Reference Table

| Category | Placeholder | Description |
|----------|-------------|-------------|
| Player | `%player%` | Player name |
| Page | `%page%` | Current page |
| Page | `%maxPage%` | Max page |
| Math | `%zmenu_math_<expr>%` | Calculate expression |
| Data | `%zmenu_player_value_<key>%` | Player data |
| Argument | `%zmenu_argument_<key>%` | Command argument |
| Global | `%zmenu_global_placeholders_<key>%` | Global value |
| Time | `%zmenu_time_unix_timestamp%` | Unix time |
| Stats | `%zmenu_statistic_hours_played%` | Hours played |

## Next Steps

- Learn about [Global Placeholders](./global-placeholders)
- Set up [Player Data](./player-data) for custom values
- Create dynamic [Requirements](./buttons/button#requirements)
