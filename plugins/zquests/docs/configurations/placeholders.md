---
sidebar_position: 4
title: Placeholders
description: All available placeholders in zQuests
---

# Placeholders

zQuests provides PlaceholderAPI placeholders to display quest information anywhere on your server. These placeholders can be used in scoreboards, holograms, chat formats, and of course in zMenu inventories.

## Requirements

To use zQuests placeholders outside of zMenu, you need:
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed

## Quest Placeholders

### Basic Quest Information

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%zquests_name_<quest>%` | Quest display name | `Stone Breaker` |
| `%zquests_description_<quest>%` | Quest description | `Break 500 stone blocks` |
| `%zquests_thumbnail_<quest>%` | Quest thumbnail material | `STONE` |
| `%zquests_type_<quest>%` | Quest type | `BLOCK_BREAK` |
| `%zquests_objective_<quest>%` | Quest goal amount | `500` |

Replace `<quest>` with the quest's unique `name` value.

**Example:**
```
%zquests_name_stone-breaker-1%
```

### Quest Progress

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%zquests_progress_<quest>%` | Current progress | `250` |
| `%zquests_progress_bar_<quest>%` | Visual progress bar | `||||||||||||||||` |
| `%zquests_lore_line_<quest>%` | Formatted progress line | `|||||||||||||||| - 250/500 ✘` |
| `%zquests_is_active_<quest>%` | Quest is active | `true` or `false` |
| `%zquests_is_completed_<quest>%` | Quest is completed | `true` or `false` |

### Group Placeholders

| Placeholder | Description | Example Output |
|-------------|-------------|----------------|
| `%zquests_group_name_<group>%` | Group display name | `Mining Quests` |
| `%zquests_group_count_<group>%` | Total quests in group | `10` |
| `%zquests_group_finish_<group>%` | Completed quests in group | `5` |
| `%zquests_group_percent_<group>%` | Completion percentage | `50` |
| `%zquests_group_total_percent_<group>%` | Total progress percentage | `67.5` |

Replace `<group>` with the group identifier from `config.yml`.

### Favorite Quests

| Placeholder | Description |
|-------------|-------------|
| `%zquests_favorite_quests%` | Formatted list of favorite quests |

## Progress Bar Configuration

Configure the progress bar appearance in `config.yml`:

```yaml
progress-bar:
  # Character for completed progress
  icon: '|'
  # Character for remaining progress
  not-completed-icon: '|'
  # Color for completed portion
  progress-color: "#0ff216"
  # Color for remaining portion
  color: "#828282"
  # Total bar length
  size: 30
```

**Result:**
```
||||||||||||||||||||||||||||||  (green: completed, gray: remaining)
```

## Lore Line Configuration

Configure the lore line format in `config.yml`:

```yaml
lore-line-placeholder:
  # Format for active quests
  active: "%progress-bar% &8- &6%progress%&8/&f%goal% &c✘"
  # Format for completed quests
  complete: "%progress-bar% &8- &6%progress%&8/&f%goal% &a✔"
```

**Available variables:**
- `%progress-bar%` - The progress bar
- `%progress%` - Current progress number
- `%goal%` - Quest goal number

## Favorite Quests Placeholder

Configure the favorite quests display in `config.yml`:

```yaml
placeholder-favorite:
  # Maximum quests to show
  limit: 3
  # Message when no favorites
  empty: "&cNo favorite quests"
  # Format for each quest
  result: "&f%quest-description%\n&8%quest-display-name%\n#fcd600%quest-progress%&8/&f%quest-objective%"
  # Separator between quests
  between: "\n\n"
```

**Available variables in `result`:**
- `%quest-name%` - Quest internal name
- `%quest-display-name%` - Quest display name
- `%quest-description%` - Quest description
- `%quest-thumbnail%` - Quest thumbnail material
- `%quest-type%` - Quest type
- `%quest-objective%` - Quest goal
- `%quest-lore-line%` - Formatted progress line
- `%quest-progress-bar%` - Progress bar
- `%quest-percent%` - Completion percentage
- `%quest-progress%` - Current progress
- `%quest-global-group-name%` - Quest group name

## Quest Groups

Define quest groups in `config.yml` to use group placeholders:

```yaml
quests-groups:
  mining:
    display-name: "Mining Quests"
    quests:
      - "stone-breaker-1"
      - "stone-breaker-2"
      - "ore-miner-1"
      - "ore-miner-2"

  farming:
    display-name: "Farming Quests"
    quests:
      - "wheat-farmer-1"
      - "crop-master-1"

# Default group name for ungrouped quests
global-group-display-name: "General"
```

**Usage:**
```
Mining Progress: %zquests_group_percent_mining%%
```

## Usage Examples

### In Scoreboard

```yaml
# Example scoreboard configuration
lines:
  - "&6&lQUESTS"
  - ""
  - "&fActive: &e%zquests_is_active_daily-mining%"
  - "&fProgress: &a%zquests_progress_daily-mining%&7/&f%zquests_objective_daily-mining%"
  - "%zquests_progress_bar_daily-mining%"
```

### In zMenu Inventory

```yaml
items:
  quest-info:
    slot: 13
    item:
      material: "%zquests_thumbnail_stone-breaker%"
      name: "&6%zquests_name_stone-breaker%"
      lore:
        - "&7%zquests_description_stone-breaker%"
        - ""
        - "%zquests_lore_line_stone-breaker%"
        - ""
        - "&7Status: %zquests_is_completed_stone-breaker%"
```

### In Chat Format

```
[Quest: %zquests_name_current-quest%] %player_name%: %message%
```

### In Hologram

```yaml
# zEssentials hologram
lines:
  - "&6&lDAILY QUEST"
  - "&f%zquests_name_daily-quest%"
  - ""
  - "%zquests_progress_bar_daily-quest%"
  - "&7%zquests_progress_daily-quest%&8/&f%zquests_objective_daily-quest%"
```

## Placeholder Testing

Test placeholders with PlaceholderAPI:

```
/papi parse me %zquests_name_stone-breaker%
/papi parse me %zquests_progress_stone-breaker%
/papi parse me %zquests_is_active_stone-breaker%
```

## Troubleshooting

### Placeholder Shows "Unknown"

- Verify the quest name is correct (case-sensitive)
- Check that the quest exists in your configuration
- Reload the plugin: `/zquests reload`

### Progress Bar Not Showing

- Make sure `progress-bar` is configured in `config.yml`
- Check for YAML syntax errors

### Group Placeholder Returns 0

- Verify the group ID matches exactly
- Check that quests are listed in the group configuration
- Ensure the quest names match their `name` values

## Next Steps

- Configure [Commands and Permissions](./commands-permissions)
- Set up [Inventories](./inventories) with quest displays
- Learn about [Waypoints & Holograms](./waypoints-holograms)
