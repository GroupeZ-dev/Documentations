---
sidebar_position: 3
title: Scoreboard
description: Configure KOTH scoreboards
---

# Scoreboard Configuration

Each KOTH can display a custom scoreboard to nearby players. Configure scoreboards in the KOTH configuration file.

## Basic Structure

```yaml
scoreboard:
  cooldown:
    enable: true
    title: "&f&l⌈ &7&ozKoth &f&l⌋"
    lines:
      - "&r"
      - "#16db47Location:"
      - " #636363◊ #ffffffX: %centerX% Y: %centerY% Z: %centerZ%"
      - "&r"
      - "#16db47Starts in:"
      - " #636363◊ #ffffff%spawnFormat%"
      - "&r"

  start:
    enable: true
    title: "&f&l⌈ &7&ozKoth &f&l⌋"
    lines:
      - "&r"
      - "#16db47Location:"
      - " #636363◊ #ffffffX: %centerX% Y: %centerY% Z: %centerZ%"
      - "&r"
      - "#16db47Player:"
      - " #636363◊ #ffffff%playerName%"
      - "&r"
      - "#16db47Time left:"
      - " #636363◊ #ffffff%captureFormat%"
      - "&r"
```

## Scoreboard Types

### Cooldown Scoreboard

Displayed during the COOLDOWN phase before capture begins:

```yaml
scoreboard:
  cooldown:
    enable: true
    title: "&6&lKOTH Incoming"
    lines:
      - ""
      - "&7KOTH: &f%name%"
      - ""
      - "&7Location:"
      - "&f%centerX%, %centerY%, %centerZ%"
      - ""
      - "&7Starts in:"
      - "&e%spawnFormat%"
      - ""
```

### Start Scoreboard

Displayed during the START phase when capture is active:

```yaml
scoreboard:
  start:
    enable: true
    title: "&c&lKOTH Active"
    lines:
      - ""
      - "&7KOTH: &f%name%"
      - ""
      - "&7Capturing:"
      - "&a%playerName%"
      - ""
      - "&7Time Left:"
      - "&e%captureFormat%"
      - ""
      - "&7Progress:"
      - "%zkoth_progress_bar%"
      - ""
```

## Placeholders

### Location Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%name%` | KOTH name |
| `%world%` | World name |
| `%centerX%` | Center X coordinate |
| `%centerY%` | Center Y coordinate |
| `%centerZ%` | Center Z coordinate |
| `%minX%`, `%minY%`, `%minZ%` | Minimum corner |
| `%maxX%`, `%maxY%`, `%maxZ%` | Maximum corner |

### Time Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%spawnSeconds%` | Seconds until start |
| `%spawnFormat%` | Formatted time until start |
| `%captureSeconds%` | Current capture seconds |
| `%captureFormat%` | Formatted capture time |
| `%captureMaxSeconds%` | Total capture time needed |
| `%captureMaxFormat%` | Formatted total time |

### Player Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%playerName%` | Capturing player name |
| `%teamName%` | Capturing player's team |
| `%teamId%` | Team ID |
| `%teamLeader%` | Team leader name |

### Score Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%score%` | Current player's score |
| `%zkoth_score_player_1%` | #1 player name |
| `%zkoth_score_points_1%` | #1 player points |
| `%zkoth_score_player_2%` | #2 player name |
| `%zkoth_score_points_2%` | #2 player points |

## Display Radius

Players only see the scoreboard when within the configured radius:

```yaml
# In config.yml
scoreboardRadius: 50
```

## Scoreboard Plugin Support

zKoth integrates with these scoreboard plugins:

| Plugin | Auto-Detection |
|--------|----------------|
| FeatherBoard | Yes |
| SternalBoard | Yes |
| TAB | Yes |
| TitleManager | Yes |

If none are detected, zKoth uses its built-in FastBoard implementation.

## Examples

### Simple Scoreboard

```yaml
scoreboard:
  cooldown:
    enable: true
    title: "&6KOTH"
    lines:
      - ""
      - "&7Starting in: &e%spawnFormat%"
      - ""

  start:
    enable: true
    title: "&cKOTH"
    lines:
      - ""
      - "&7Player: &a%playerName%"
      - "&7Time: &e%captureFormat%"
      - ""
```

### Detailed Scoreboard

```yaml
scoreboard:
  cooldown:
    enable: true
    title: "&f&l⌈ &6&lKOTH &f&l⌋"
    lines:
      - "&8&m─────────────"
      - ""
      - "&eEvent: &f%name%"
      - ""
      - "&eLocation:"
      - "&7X: &f%centerX%"
      - "&7Y: &f%centerY%"
      - "&7Z: &f%centerZ%"
      - ""
      - "&eStarts in:"
      - "&a%spawnFormat%"
      - ""
      - "&8&m─────────────"

  start:
    enable: true
    title: "&f&l⌈ &c&lKOTH &f&l⌋"
    lines:
      - "&8&m─────────────"
      - ""
      - "&eEvent: &f%name%"
      - ""
      - "&eCapturing:"
      - "&a%playerName%"
      - "&7Team: &f%teamName%"
      - ""
      - "&eTime Remaining:"
      - "&c%captureFormat%"
      - ""
      - "&8&m─────────────"
```

### Score-Based Scoreboard

```yaml
scoreboard:
  start:
    enable: true
    title: "&e&lSCORE KOTH"
    lines:
      - ""
      - "&6Leaderboard:"
      - "&e1. &f%zkoth_score_player_1% &7- &a%zkoth_score_points_1%"
      - "&e2. &f%zkoth_score_player_2% &7- &a%zkoth_score_points_2%"
      - "&e3. &f%zkoth_score_player_3% &7- &a%zkoth_score_points_3%"
      - ""
      - "&7Your Score: &a%score%"
      - ""
```

### Team-Focused Scoreboard

```yaml
scoreboard:
  start:
    enable: true
    title: "&c&lFACTION KOTH"
    lines:
      - ""
      - "&7Capturing Faction:"
      - "&a%teamName%"
      - ""
      - "&7Leader: &f%teamLeader%"
      - "&7Player: &f%playerName%"
      - ""
      - "&7Time: &e%captureFormat%"
      - ""
```

## Tips

1. Use `&r` or empty lines for spacing
2. Hex colors work on 1.16+ (`#16db47`)
3. Keep scoreboards concise (max 15 lines)
4. Test with different screen sizes
5. Use consistent formatting
