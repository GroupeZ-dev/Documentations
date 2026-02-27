---
sidebar_position: 5
title: Placeholders
description: Available placeholders in zKoth
---

# Placeholders

zKoth provides extensive placeholder support for scoreboards, messages, and PlaceholderAPI integration.

## PlaceholderAPI Integration

All zKoth placeholders use the `%zkoth_...%` format when used with PlaceholderAPI.

## Location Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zkoth_world%` | Current KOTH world |
| `%zkoth_name%` | Current KOTH name |
| `%zkoth_min_x%` | Minimum X coordinate |
| `%zkoth_min_y%` | Minimum Y coordinate |
| `%zkoth_min_z%` | Minimum Z coordinate |
| `%zkoth_max_x%` | Maximum X coordinate |
| `%zkoth_max_y%` | Maximum Y coordinate |
| `%zkoth_max_z%` | Maximum Z coordinate |
| `%zkoth_center_x%` | Center X coordinate |
| `%zkoth_center_y%` | Center Y coordinate |
| `%zkoth_center_z%` | Center Z coordinate |

## Time Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zkoth_spawn_seconds%` | Seconds until KOTH starts |
| `%zkoth_spawn_format%` | Formatted spawn countdown |
| `%zkoth_capture_seconds%` | Current capture seconds |
| `%zkoth_capture_format%` | Formatted capture time |
| `%zkoth_capture_max_seconds%` | Total capture time required |
| `%zkoth_capture_max_format%` | Formatted total capture time |

## Player Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zkoth_player_name%` | Current capturing player name |
| `%zkoth_score%` | Current player's score |

## Team Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zkoth_team_name%` | Capturing player's team name |
| `%zkoth_team_id%` | Capturing player's team ID |
| `%zkoth_team_leader%` | Team leader name |

## Score Leaderboard Placeholders

Replace `<position>` with a number (1, 2, 3, etc.):

| Placeholder | Description |
|-------------|-------------|
| `%zkoth_score_player_<position>%` | Player name at position |
| `%zkoth_score_points_<position>%` | Points at position |
| `%zkoth_score_team_name_<position>%` | Team name at position |
| `%zkoth_score_team_id_<position>%` | Team ID at position |
| `%zkoth_score_team_leader_<position>%` | Team leader at position |

**Examples:**
- `%zkoth_score_player_1%` - First place player
- `%zkoth_score_points_2%` - Second place points
- `%zkoth_score_team_name_3%` - Third place team

## Status Placeholders

Replace `<koth name>` with the KOTH name:

| Placeholder | Description |
|-------------|-------------|
| `%zkoth_active_<koth name>%` | Returns `true` if KOTH is active |
| `%zkoth_cooldown_<koth name>%` | Returns `true` if in cooldown |
| `%zkoth_start_<koth name>%` | Returns `true` if started |

**Examples:**
- `%zkoth_active_castle%` - Is "castle" KOTH active?
- `%zkoth_cooldown_arena%` - Is "arena" in cooldown?

## Nearby Players Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zkoth_nearby_players_<koth name>%` | List of nearby players |
| `%zkoth_count_nearby_players_<koth name>%` | Count of nearby players |

## Internal Placeholders

These placeholders work in KOTH configuration files (scoreboards, commands, webhooks):

| Placeholder | Description |
|-------------|-------------|
| `%name%` | KOTH name |
| `%world%` | World name |
| `%centerX%`, `%centerY%`, `%centerZ%` | Center coordinates |
| `%minX%`, `%minY%`, `%minZ%` | Minimum coordinates |
| `%maxX%`, `%maxY%`, `%maxZ%` | Maximum coordinates |
| `%playerName%` | Capturing player |
| `%teamName%` | Player's team |
| `%teamId%` | Team ID |
| `%teamLeader%` | Team leader |
| `%spawnSeconds%` | Spawn countdown |
| `%spawnFormat%` | Formatted spawn time |
| `%captureSeconds%` | Capture time |
| `%captureFormat%` | Formatted capture time |
| `%online-player%` | All online team members |

## Usage Examples

### Scoreboard

```yaml
scoreboard:
  start:
    enable: true
    title: "&6&lKOTH"
    lines:
      - ""
      - "&7Player: &a%playerName%"
      - "&7Team: &f%teamName%"
      - "&7Time: &e%captureFormat%"
      - ""
      - "&7Score: &a%score%"
      - ""
```

### Commands

```yaml
endCommands:
  - "bc &a%playerName% from %teamName% captured %name%!"
  - "eco give %playerName% 5000"
```

### Discord Webhook

```yaml
webhook:
  events:
    WIN:
      title: "KOTH Won!"
      description: "**%playerName%** captured **%name%**!"
```

### With PlaceholderAPI (in other plugins)

**Scoreboard plugin:**
```yaml
lines:
  - "&7KOTH: %zkoth_name%"
  - "&7Status: %zkoth_active_castle%"
  - "&7Capturing: %zkoth_player_name%"
```

**Hologram plugin:**
```yaml
lines:
  - "&6&lKOTH Status"
  - "&7Name: %zkoth_name%"
  - "&7Time: %zkoth_capture_format%"
```

**Tab plugin:**
```yaml
header:
  - "&6KOTH: %zkoth_name%"
  - "&7Player: %zkoth_player_name%"
```

### Leaderboard Display

```yaml
scoreboard:
  start:
    enable: true
    title: "&e&lSCORE KOTH"
    lines:
      - ""
      - "&6Top Players:"
      - "&e1. %zkoth_score_player_1% &7- &a%zkoth_score_points_1%"
      - "&e2. %zkoth_score_player_2% &7- &a%zkoth_score_points_2%"
      - "&e3. %zkoth_score_player_3% &7- &a%zkoth_score_points_3%"
      - ""
      - "&7Your Score: &a%score%"
      - ""
```

## Default Values

When a placeholder has no data, default values from `config.yml` are used:

```yaml
# config.yml
noPlayer: 'X'
noFaction: 'X'
noKoth: 'X'

defaultPlayerResult:
  playerName: "X"
  points: 0
  teamName: "X"
  teamId: "X"
  teamLeader: "X"
```
