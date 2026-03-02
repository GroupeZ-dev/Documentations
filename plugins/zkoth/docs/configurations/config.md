---
sidebar_position: 1
title: Main Configuration
description: Configure zKoth settings in config.yml
---

# Main Configuration

The `config.yml` file contains global settings for the zKoth plugin.

## Debug Settings

```yaml
# Displays more information in the console
enableDebug: false

# Enables time debugs for performance measurement
enableDebugTime: false
```

## Performance Settings

```yaml
# Milliseconds between PlayerMoveEvent checks
# Higher values reduce server load but decrease responsiveness
playerMoveEventCooldown: 50

# Milliseconds between scheduler ticks
schedulerMillisecond: 1000
```

## Message Display Timing

### Cooldown Messages

Seconds before KOTH start when messages are displayed:

```yaml
displayMessageCooldown:
  - 300  # 5 minutes
  - 120  # 2 minutes
  - 60   # 1 minute
  - 30
  - 10
  - 5
  - 4
  - 3
  - 2
  - 1
```

### Capture Messages

Seconds remaining during capture when messages are displayed:

```yaml
displayMessageKothCap:
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

## Default Values

Placeholder values when no data is available:

```yaml
# Displayed when no player is capturing
noPlayer: 'X'

# Displayed when player has no faction/team
noFaction: 'X'

# Displayed when no KOTH is active
noKoth: 'X'
```

## Scoreboard Settings

```yaml
# Radius (in blocks) for scoreboard display
# Players within this distance see the KOTH scoreboard
scoreboardRadius: 50
```

## Capture Permission

Optionally require permission to capture KOTHs:

```yaml
# Require permission to capture a KOTH
enableCapturePermission: false

# Permission required (only if above is true)
capturePermission: "zkoth.capture"
```

:::tip
Spectators are always blocked from capturing, regardless of this setting.
:::

## Chest Settings

```yaml
# Seconds before loot chests are removed
removeChestSec: 120
```

## Default Player Result

Values for score placeholders when position doesn't exist:

```yaml
defaultPlayerResult:
  playerName: "X"
  points: 0
  teamName: "X"
  teamId: "X"
  teamLeader: "X"
```

## Complete Example

```yaml
# Debug settings
enableDebug: false
enableDebugTime: false

# Performance
playerMoveEventCooldown: 50
schedulerMillisecond: 1000

# Cooldown message timings
displayMessageCooldown:
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

# Capture message timings
displayMessageKothCap:
  - 60
  - 30
  - 10
  - 5
  - 4
  - 3
  - 2
  - 1

# Default placeholders
noPlayer: 'None'
noFaction: 'No Team'
noKoth: 'No KOTH'

# Scoreboard
scoreboardRadius: 100

# Capture permission
enableCapturePermission: false
capturePermission: "zkoth.capture"

# Loot chest removal time
removeChestSec: 180

# Default score display
defaultPlayerResult:
  playerName: "---"
  points: 0
  teamName: "---"
  teamId: "---"
  teamLeader: "---"
```
