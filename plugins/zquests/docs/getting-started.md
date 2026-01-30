---
sidebar_position: 1
title: Getting Started
description: Introduction to zQuests - A powerful quest plugin for Minecraft servers
---

# Getting Started with zQuests

**zQuests** is a powerful and flexible quest plugin for Minecraft servers. It allows you to create engaging quest systems that keep your players motivated and active. With deep integration with zMenu, you can create immersive experiences with beautiful quest interfaces.

## What is zQuests?

zQuests is a comprehensive quest management plugin that enables server administrators to create custom quests with various objectives, rewards, and progression systems. Whether you need simple daily tasks, complex story-driven quests, or achievement-based challenges, zQuests provides all the tools you need.

## Key Features

### Extensive Quest Types
- **25+ quest types** including block breaking, entity killing, crafting, fishing, and more
- Support for custom quest types via API
- Tag-based material matching for flexible configurations

### Flexible Quest Management
- **Auto-accept quests**: Automatically start quests for players
- **Favorite system**: Let players track their important quests
- **Quest groups**: Organize quests into categories
- **Unique quests**: Prevent progress on other quests during specific quest chains
- **Hidden quests**: Create secret objectives

### Powerful Reward System
- **Global rewards**: Applied to all quest completions
- **Custom rewards**: Trigger rewards when specific quest combinations are completed
- **Permissible rewards**: Give bonus rewards based on permissions
- Supports all zMenu actions as rewards

### zMenu Integration
- Custom buttons for quest display
- Quest-specific actions
- Dynamic inventory updates
- Progress tracking in menus

### Additional Features
- **Waypoints**: Guide players to quest locations
- **Holograms**: Display quest information in the world
- **PlaceholderAPI support**: Display quest information anywhere
- **Database support**: MySQL, MariaDB, and SQLite
- **Scoreboard integration**: Update scoreboards on quest events

## Quest Types Overview

| Category | Quest Types |
|----------|-------------|
| **Blocks** | BLOCK_BREAK, BLOCK_PLACE |
| **Entities** | ENTITY_KILL, ENTITY_DAMAGE, TAME, SHEAR |
| **Items** | CRAFT, SMELT, ITEM_BREAK, ITEM_MENDING, ITEM_CONSUME |
| **Gathering** | FARMING, FISHING, MINING |
| **Potions** | BREW, ENCHANT |
| **Exploration** | CUBOID, LOOK_AT_BLOCK, LOOK_AT_ENTITY |
| **Economy** | SELL, PURCHASE |
| **Progression** | JOB_LEVEL, JOB_PRESTIGE, EXPERIENCE_GAIN |
| **Special** | VOTE, COMMAND, CUSTOM, ISLAND, INVENTORY_OPEN, INVENTORY_CONTENT |
| **Misc** | HATCHING, RESURRECT, SMITHING |

## How It Works

zQuests uses YAML configuration files to define your quests. Here's a simplified overview:

1. **Quests** are defined in YAML files in the `quests/` folder
2. Each quest has a **type** that determines how progress is tracked
3. **Actions** define what counts toward quest progress
4. **Rewards** are given when quests are completed
5. **Inventories** display quest information using zMenu

### Simple Example

```yaml
quests:
  - type: BLOCK_BREAK
    name: "stone-breaker"
    display-name: "Stone Breaker"
    description: "Break 100 stone blocks"
    thumbnail: STONE
    goal: 100
    auto-accept: true
    actions:
      - material: STONE
      - material: COBBLESTONE
    rewards:
      - type: message
        messages:
          - "&aQuest completed! You broke 100 stone blocks!"
      - type: console_command
        commands:
          - "give %player% diamond 5"
```

This creates a quest that tracks stone and cobblestone breaking, automatically starts for all players, and gives rewards upon completion.

## Why Choose zQuests?

| Feature | zQuests | Other Plugins |
|---------|---------|---------------|
| Quest Types | 25+ built-in | Limited |
| zMenu Integration | Native | None |
| Custom Actions | Full zMenu support | Basic |
| Favorite System | Yes | Rarely |
| Quest Groups | Yes | Sometimes |
| Waypoints & Holograms | Yes | Rarely |
| Database Support | MySQL/MariaDB/SQLite | Usually file-based |
| PlaceholderAPI | Full support | Varies |
| API | Comprehensive | Often minimal |

## Next Steps

Ready to get started? Follow these steps:

1. [Install zQuests](./installation) on your server
2. Learn about [quest configuration](./configurations/quests)
3. Explore all [quest types](./configurations/quest-types)
4. Set up [rewards](./configurations/rewards) for your quests
5. Create [custom inventories](./configurations/inventories) with zMenu

## Getting Help

- **Discord**: Join our [Discord server](https://discord.groupez.dev) for support
- **GitHub**: Report issues on [GitHub](https://github.com/Maxlego08/zQuests)
- **Documentation**: You're reading it!
