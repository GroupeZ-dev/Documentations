---
sidebar_position: 1
title: Introduction
description: A powerful jobs plugin for Minecraft 1.21+
---

# zJobs

zJobs is a comprehensive jobs plugin that allows players to earn money and experience by performing various activities on your Minecraft server. Create custom jobs with configurable rewards for mining, farming, fishing, and more.

- **SpigotMC**: [https://www.spigotmc.org/resources/zjobs.120454/](https://www.spigotmc.org/resources/zjobs.120454/)
- **GitHub**: [https://github.com/Maxlego08/zJobs](https://github.com/Maxlego08/zJobs)
- **Discord**: [https://discord.groupez.dev](https://discord.groupez.dev)

## Requirements

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.21+ |
| Java | Java 21 |
| Server Software | Paper, Purpur, or Folia |

## Features

### Job System

- **Multiple Jobs** - Create unlimited custom jobs
- **Job Levels** - Players level up jobs by performing actions
- **Job Limits** - Configure maximum jobs per player
- **Job Switching** - Allow or restrict job changes
- **Prestige System** - Reset and earn prestige rewards

### Reward Types

| Reward | Description |
|--------|-------------|
| Money | Earn economy currency |
| Experience | Earn Minecraft XP |
| Job XP | Level up the job |
| Items | Receive item rewards |
| Commands | Execute commands on actions |

### Action Types

Players can earn rewards from various activities:

- **Block Breaking** - Mining ores, breaking blocks
- **Block Placing** - Building structures
- **Crafting** - Creating items
- **Smelting** - Using furnaces
- **Fishing** - Catching fish and treasures
- **Killing** - Defeating mobs and players
- **Breeding** - Animal husbandry
- **Enchanting** - Enchanting items
- **Farming** - Harvesting crops

### Integrations

zJobs integrates with other plugins:

| Plugin | Integration |
|--------|-------------|
| [zMenu](../zmenu/introduction) | Job GUI menus |
| [zItems](../zitems/introduction) | Job Money/XP Boost runes |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Economy support |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Placeholders |

## Quick Start

### Installation

1. Download zJobs from SpigotMC or Discord
2. Place the JAR file in your `plugins/` folder
3. Restart your server
4. Configure jobs in `plugins/zJobs/jobs/`

### Basic Commands

```
/jobs                     - Open jobs menu
/jobs join <job>          - Join a job
/jobs leave <job>         - Leave a job
/jobs info <job>          - View job information
/jobs stats               - View your job statistics
/jobs top <job>           - View job leaderboard
/jobs reload              - Reload configuration
```

### Creating Your First Job

Create a file in `plugins/zJobs/jobs/miner.yml`:

```yaml
name: "Miner"
display-name: "&6&lMiner"
description:
  - "&7Mine ores and stones to earn money!"

max-level: 100

actions:
  break:
    COAL_ORE:
      money: 5.0
      xp: 10
      job-xp: 2
    IRON_ORE:
      money: 10.0
      xp: 15
      job-xp: 3
    DIAMOND_ORE:
      money: 50.0
      xp: 50
      job-xp: 10
```

## Next Steps

- [Installation Guide](installation) - Detailed setup instructions
- [Job Configuration](jobs) - Create custom jobs
- [Actions & Rewards](actions) - Configure job actions
- [Commands & Permissions](commands-permissions) - Full command reference
