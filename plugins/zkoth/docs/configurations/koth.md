---
sidebar_position: 2
title: KOTH Configuration
description: Configure individual KOTH events
---

# KOTH Configuration

Each KOTH is configured in its own YAML file in the `plugins/zKoth/koths/` folder.

## Basic Settings

```yaml
# Display name for the KOTH event
name: castle

# Type of KOTH: CAPTURE or SCORE
type: CAPTURE

# For CAPTURE: seconds needed to capture
# For SCORE: points needed to win
capture: 30

# Cooldown in seconds before KOTH can be spawned again
cooldownStart: 300

# Auto-stop KOTH after this many seconds
stopAfterSeconds: 3600
```

## KOTH Types

### CAPTURE Type

Players must hold the zone for a continuous duration to win:

```yaml
type: CAPTURE
capture: 60  # 60 seconds to capture
```

- Timer resets if the capturing player leaves
- First to complete the capture timer wins

### SCORE Type

Players earn points while in the zone:

```yaml
type: SCORE
capture: 100  # 100 points to win
```

- Points accumulate while in the zone
- Leaving doesn't reset points
- First to reach the score target wins

## Location Configuration

Zone corners are set when creating the KOTH:

```yaml
minLocation:
  world: world
  x: 100
  y: 64
  z: 200

maxLocation:
  world: world
  x: 110
  y: 70
  z: 210
```

:::info
Use `/zkoth move <name>` to change the location instead of editing manually.
:::

## Message Settings

Control which messages are displayed:

```yaml
# Message when a player starts capturing
enableStartCapMessage: true

# Message when a player loses capture progress
enableLooseCapMessage: true

# Periodic messages during capture
enableEverySecondsCapMessage: false

# Periodic messages during cooldown
enableEverySecondsCooldownMessage: false
```

## Commands

### Start Commands

Executed when the KOTH starts (enters COOLDOWN or START):

```yaml
startCommands:
  - "bc &6&l[KOTH] &e%name% has spawned!"
  - "bc &7Location: &f%centerX%, %centerY%, %centerZ%"
```

### End Commands

Executed when a player wins:

```yaml
endCommands:
  - "bc &6&l[KOTH] &a%playerName% &ehas captured %name%!"
  - "eco give %playerName% 5000"
  - "give %playerName% diamond 10"
```

### Random End Commands

Execute random commands with configurable probability:

```yaml
randomEndCommands:
  # Number of commands to randomly select
  commandAmount: 2

  commands:
    - percent: 50  # 50% chance
      commands:
        - "give %playerName% diamond 5"

    - percent: 30  # 30% chance
      commands:
        - "give %playerName% emerald 10"

    - percent: 20  # 20% chance
      commands:
        - "give %playerName% netherite_ingot 1"
        - "bc &6%playerName% got a rare reward!"
```

## Command Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%playerName%` | Winner's name |
| `%teamName%` | Winner's team name |
| `%teamId%` | Winner's team ID |
| `%teamLeader%` | Team leader name |
| `%name%` | KOTH name |
| `%world%` | KOTH world |
| `%centerX%` | Center X coordinate |
| `%centerY%` | Center Y coordinate |
| `%centerZ%` | Center Z coordinate |
| `%minX%`, `%minY%`, `%minZ%` | Min corner |
| `%maxX%`, `%maxY%`, `%maxZ%` | Max corner |
| `%captureSeconds%` | Capture time |
| `%captureFormat%` | Formatted capture time |
| `%spawnSeconds%` | Spawn countdown |
| `%spawnFormat%` | Formatted spawn time |
| `%online-player%` | All online team members |

## Team Blacklist

Prevent certain team IDs from participating:

```yaml
blacklistTeamId:
  - "0"      # No team
  - "-1"     # System teams
  - "spawn"  # Specific team
```

## Progress Bar

Configure the capture progress bar for placeholders:

```yaml
progressBar:
  length: 20
  symbol: "|"
  completedColor: "#2fedc7"
  notCompletedColor: "#8f8f8f"
```

## Complete Example

```yaml
# Basic settings
name: Castle KOTH
type: CAPTURE
capture: 60
cooldownStart: 300
stopAfterSeconds: 3600

# Messages
enableStartCapMessage: true
enableLooseCapMessage: true
enableEverySecondsCapMessage: false
enableEverySecondsCooldownMessage: false

# Locations
minLocation:
  world: world
  x: 100
  y: 64
  z: 200
maxLocation:
  world: world
  x: 120
  y: 80
  z: 220

# Commands
startCommands:
  - "bc &6&l[KOTH] &eCastle KOTH has spawned!"
  - "bc &7Capture it at &f%centerX%, %centerY%, %centerZ%"

endCommands:
  - "bc &6&l[KOTH] &a%playerName% &ehas captured Castle!"
  - "eco give %playerName% 10000"
  - "give %playerName% diamond_block 5"

randomEndCommands:
  commandAmount: 1
  commands:
    - percent: 70
      commands:
        - "give %playerName% golden_apple 3"
    - percent: 25
      commands:
        - "give %playerName% enchanted_golden_apple 1"
    - percent: 5
      commands:
        - "give %playerName% netherite_ingot 1"
        - "bc &d&l%playerName% got a legendary reward!"

# Team blacklist
blacklistTeamId:
  - "0"
  - "-1"

# Progress bar
progressBar:
  length: 20
  symbol: "█"
  completedColor: "#00ff00"
  notCompletedColor: "#555555"

# Scoreboard (see scoreboard configuration)
scoreboard:
  cooldown:
    enable: true
    # ...
  start:
    enable: true
    # ...

# Hologram (see hologram configuration)
hologram:
  enable: false
  # ...

# Discord webhook (see webhook configuration)
webhook:
  enable: false
  # ...

# Loot (see loot configuration)
loot:
  random: 3
  type: INVENTORY
  items: []
```
