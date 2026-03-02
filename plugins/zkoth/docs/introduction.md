---
sidebar_position: 1
title: Introduction
description: Overview of zKoth - King of the Hill plugin for Minecraft
---

# zKoth

zKoth is a powerful King of the Hill (KOTH) plugin for Minecraft servers. It allows you to create capture zones where players or teams compete to control an area for rewards.

## Features

- **Multiple KOTH Types**: Capture-based or Score-based gameplay
- **Team Support**: Integration with faction, clan, and team plugins
- **Custom Scoreboards**: Display KOTH status with configurable scoreboards
- **Hologram Support**: Show KOTH information with floating holograms
- **Discord Webhooks**: Send KOTH events to Discord channels
- **Loot System**: Configure rewards with DROP, CHEST, or INVENTORY distribution
- **Random Commands**: Execute random commands with configurable probabilities
- **Scheduling**: Use zScheduler for automatic KOTH events
- **PlaceholderAPI**: Full placeholder support for other plugins

## KOTH Types

| Type | Description |
|------|-------------|
| `CAPTURE` | First player/team to hold the zone for the required time wins |
| `SCORE` | Players earn points while in the zone, highest score wins |

## KOTH Status

| Status | Description |
|--------|-------------|
| `STOP` | KOTH is inactive |
| `COOLDOWN` | KOTH is spawned, waiting for capture to begin |
| `START` | KOTH capture is in progress |

## Loot Types

| Type | Description |
|------|-------------|
| `DROP` | Items drop on the ground at KOTH center |
| `CHEST` | A chest spawns with the loot items |
| `INVENTORY` | Items go directly to winner's inventory |
| `NONE` | No item loot (commands only) |

## Supported Integrations

### Team Plugins

| Plugin | Description |
|--------|-------------|
| [Lands](https://www.spigotmc.org/resources/lands.53313/) | Land claim and nations plugin |
| [HuskTowns](https://www.spigotmc.org/resources/husktowns.92672/) | Towns and nations plugin |
| [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.63905/) | Skyblock islands as teams |
| [BetterTeams](https://www.spigotmc.org/resources/betterteams.17129/) | Simple teams plugin |
| [SaberFactions](https://www.spigotmc.org/resources/saberfactions.68840/) | Factions plugin |
| [FactionsUUID](https://www.spigotmc.org/resources/factionsuuid.1035/) | Factions plugin |
| [SimpleClans](https://www.spigotmc.org/resources/simpleclans.71242/) | Clans plugin |
| [GangsPlus](https://www.spigotmc.org/resources/gangsplus.2604/) | Gangs plugin |
| [UltimateClans](https://www.spigotmc.org/resources/ultimate-clans.66289/) | Clans plugin |

### Scoreboard Plugins

| Plugin | Description |
|--------|-------------|
| [FeatherBoard](https://www.spigotmc.org/resources/featherboard.2691/) | Advanced scoreboard plugin |
| [SternalBoard](https://github.com/ShieldCommunity/SternalBoard) | Lightweight scoreboard |
| [TAB](https://www.spigotmc.org/resources/tab.57806/) | Tab list and scoreboard plugin |
| [TitleManager](https://www.spigotmc.org/resources/titlemanager.1049/) | Titles and scoreboard |

### Other Plugins

| Plugin | Description |
|--------|-------------|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Placeholder support |
| [DecentHolograms](https://www.spigotmc.org/resources/decentholograms.96927/) | Hologram display |
| [zScheduler](https://www.spigotmc.org/resources/zschedulers.112705/) | Automatic event scheduling |

## Requirements

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.8 - 1.21+ |
| Java | Java 21 |
| Server Software | Spigot, Paper, Purpur, or Folia |

## Links

- **SpigotMC**: [https://www.spigotmc.org/resources/zkoth.118588/](https://www.spigotmc.org/resources/zkoth.118588/)
- **Discord**: [discord.groupez.dev](https://discord.groupez.dev)

## Quick Start

1. Install zKoth on your server
2. Use `/zkoth axe` to get the selection wand
3. Select two corners of your KOTH zone (left-click and right-click)
4. Create the KOTH with `/zkoth create <name> [type] [capture_time]`
5. Start the KOTH with `/zkoth spawn <name>` or `/zkoth now <name>`

## Next Steps

- [Installation](./installation) - Complete installation guide
- [Commands & Permissions](./commands-permissions) - All commands
- [KOTH Configuration](./configurations/koth) - Configure your KOTHs
- [Placeholders](./placeholders) - Available placeholders
