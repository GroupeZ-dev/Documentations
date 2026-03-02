---
sidebar_position: 6
title: Integrations
description: Team and scoreboard plugin integrations
---

# Plugin Integrations

zKoth integrates with various team, scoreboard, and utility plugins for enhanced functionality.

## Team Plugins

Team integrations allow KOTH to be captured as a team rather than individually.

### Supported Team Plugins

| Plugin | Description |
|--------|-------------|
| [Lands](https://www.spigotmc.org/resources/lands.53313/) | Land claiming and nations |
| [HuskTowns](https://www.spigotmc.org/resources/husktowns.92672/) | Towns and nations |
| [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.63905/) | Skyblock islands |
| [BetterTeams](https://www.spigotmc.org/resources/betterteams.17129/) | Simple teams |
| [SaberFactions](https://www.spigotmc.org/resources/saberfactions.68840/) | Factions |
| [FactionsUUID](https://www.spigotmc.org/resources/factionsuuid.1035/) | Factions |
| [SimpleClans](https://www.spigotmc.org/resources/simpleclans.71242/) | Clans |
| [GangsPlus](https://www.spigotmc.org/resources/gangsplus.2604/) | Gangs |
| [UltimateClans](https://www.spigotmc.org/resources/ultimate-clans.66289/) | Clans |

### How Team Integration Works

1. **Auto-Detection**: zKoth automatically detects installed team plugins
2. **Team Assignment**: Players are assigned to their team when entering KOTH
3. **Team Capture**: Points/time are tracked per team
4. **Team Rewards**: Commands can target all team members

### Team Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%teamName%` | Team display name |
| `%teamId%` | Internal team ID |
| `%teamLeader%` | Team leader name |
| `%online-player%` | All online team members |

### Team Commands

Use `%online-player%` to run commands for all team members:

```yaml
endCommands:
  # Give all online team members a reward
  - "give %online-player% diamond 5"

  # Announce to all team members
  - "msg %online-player% &aYour team won the KOTH!"
```

### Team Blacklist

Block certain teams from participating:

```yaml
blacklistTeamId:
  - "0"      # No team (solo players)
  - "-1"     # System teams
  - "admin"  # Admin team
```

---

## Scoreboard Plugins

zKoth can integrate with external scoreboard plugins for better compatibility.

### Supported Scoreboard Plugins

| Plugin | Description |
|--------|-------------|
| [FeatherBoard](https://www.spigotmc.org/resources/featherboard.2691/) | Advanced scoreboards |
| [SternalBoard](https://github.com/ShieldCommunity/SternalBoard) | Lightweight |
| [TAB](https://www.spigotmc.org/resources/tab.57806/) | Tab and scoreboard |
| [TitleManager](https://www.spigotmc.org/resources/titlemanager.1049/) | Titles and boards |

### How Scoreboard Integration Works

1. **Auto-Detection**: zKoth detects installed scoreboard plugins
2. **Fallback**: Uses built-in FastBoard if none detected
3. **Configuration**: Use the scoreboard plugin's config for styling
4. **Placeholders**: All zKoth placeholders work in external plugins

### Using PlaceholderAPI

With a scoreboard plugin that supports PlaceholderAPI:

```yaml
# Example FeatherBoard config
lines:
  - "&6&lKOTH"
  - ""
  - "&7Name: &f%zkoth_name%"
  - "&7Status: &f%zkoth_active_castle%"
  - "&7Player: &f%zkoth_player_name%"
  - "&7Time: &f%zkoth_capture_format%"
```

---

## Hologram Plugins

Display KOTH information with floating holograms.

### Supported Hologram Plugins

| Plugin | Description |
|--------|-------------|
| [DecentHolograms](https://www.spigotmc.org/resources/decentholograms.96927/) | Modern holograms |

### Hologram Configuration

In your KOTH configuration file:

```yaml
hologram:
  enable: true
  lines:
    - "&6&lKOTH: &f%name%"
    - ""
    - "&7Status: &aActive"
    - "&7Player: &f%playerName%"
    - "&7Time: &e%captureFormat%"
  world: world
  x: 100.5
  y: 70.0
  z: 200.5
```

### Hologram Placeholders

All standard zKoth placeholders work in hologram lines.

---

## PlaceholderAPI

[PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) enables zKoth placeholders in other plugins.

### Installation

1. Install PlaceholderAPI
2. zKoth registers its expansion automatically
3. Use `%zkoth_...%` placeholders anywhere

### Available Placeholders

See [Placeholders](./placeholders) for the complete list.

### Example Uses

**In a scoreboard plugin:**
```yaml
lines:
  - "%zkoth_name%"
  - "%zkoth_player_name%"
  - "%zkoth_capture_format%"
```

**In a chat plugin:**
```yaml
format: "&7[%zkoth_team_name%] &f%player%: %message%"
```

**In a hologram:**
```yaml
lines:
  - "KOTH: %zkoth_name%"
  - "Capturing: %zkoth_player_name%"
```

---

## zScheduler

[zScheduler](https://www.spigotmc.org/resources/zschedulers.112705/) enables automatic KOTH scheduling.

### Features

- Schedule KOTHs at specific times
- Recurring events (daily, weekly)
- Multiple KOTH rotation
- Announcement system

### Example Schedule

```yaml
# In zScheduler configuration
schedules:
  koth_morning:
    time: "10:00"
    days:
      - MONDAY
      - WEDNESDAY
      - FRIDAY
    commands:
      - "zkoth spawn castle"

  koth_evening:
    time: "20:00"
    days:
      - SATURDAY
      - SUNDAY
    commands:
      - "zkoth now arena"
```

---

## Integration Tips

### Best Practices

1. **Test integrations** - Verify plugins work together
2. **Check versions** - Ensure compatibility
3. **Use PlaceholderAPI** - For maximum flexibility
4. **Monitor performance** - Some integrations may impact TPS

### Common Issues

#### Team Not Detected

1. Verify team plugin is installed
2. Check console for integration messages
3. Ensure player is in a team
4. Restart server after installing plugins

#### Scoreboard Conflicts

1. Disable zKoth's built-in scoreboard
2. Use external plugin with placeholders
3. Check scoreboard radius settings

#### Placeholders Not Working

1. Verify PlaceholderAPI is installed
2. Check placeholder syntax
3. Run `/papi ecloud download zkoth` if needed
4. Test with `/papi parse me %zkoth_name%`
