---
sidebar_position: 1
title: Introduction
description: Introduction to zSpawner - A comprehensive spawner management plugin for Minecraft servers
---

# zSpawner

Welcome to the official zSpawner documentation!

zSpawner is a comprehensive spawner management plugin for Minecraft servers (Paper/Spigot/Folia) that provides three distinct spawner types, virtual spawner systems, stackable spawners, and location rental features.

## Key Features

### Three Spawner Types

zSpawner provides three distinct spawner types to fit various server setups:

- **CLASSIC** - Traditional spawners that work like vanilla Minecraft spawners
- **GUI** - Spawners managed through a graphical interface (`/zspawner`)
- **VIRTUAL** - Advanced spawners with custom entity management, auto-kill, auto-sell, and more

### Virtual Spawner System

The Virtual Spawner is the most advanced spawner type with extensive customization options:

- **Auto-Kill** - Automatically kills spawned entities
- **Auto-Sell** - Automatically sells dropped items (requires zShop integration)
- **Custom Drop Tables** - Define custom drops per entity type
- **Spawn Rate Control** - Configure min/max delay, spawn count, and entity limits
- **Experience Multiplier** - Boost experience gained from spawned mobs
- **Loot Multiplier** - Increase drop rates from spawned entities
- **Location Rental** - Allow players to rent spawner locations

### Stackable Spawners

Combine multiple spawners of the same type into a single block:

- **Per-Entity Limits** - Set maximum stack sizes per entity type
- **Level-Based Configuration** - Configure spawn rates based on stack amount
- **Hologram Display** - Show stack amount with holograms

### Silk Touch Spawner Mining

Harvest spawners with Silk Touch tools:

- **Material Whitelist** - Define which tools can mine spawners
- **Natural Spawner Support** - Option to harvest natural spawners
- **Spawner Type Conversion** - Convert natural spawners to any zSpawner type

### Explosion Protection

Protect spawners from explosions:

- **Per-Type Configuration** - Enable/disable explosion protection per spawner type
- **Drop on Explosion** - Option to drop spawners when destroyed by explosions
- **Natural Spawner Protection** - Protect vanilla spawners from explosions

### Location Rental System

Allow players to rent spawner locations:

- **Time-Based Rental** - Players can rent spawner positions for specified durations
- **Configurable Pricing** - Set min/max prices per minute
- **Rental History** - Track all rental transactions

### Integrations

- [zMenu](https://modrinth.com/plugin/zmenu) - Fully customizable GUI interfaces (Required)
- [zShop](https://groupez.dev/) - Auto-sell functionality for virtual spawners
- [zEssentials](https://modrinth.com/plugin/zessentials) - Mailbox integration for item delivery
- [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) - Island team access for spawners
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) - Custom placeholders

### Multiple Storage Backends

- **SQLite** - Quick setup for smaller servers
- **MySQL** - Recommended for larger servers
- **MariaDB** - Alternative to MySQL

## Requirements

| Requirement | Version |
|-------------|---------|
| Java | 17 or higher |
| Minecraft | 1.13 or higher |
| zMenu | Latest version |

## Supported Platforms

| Platform | Support |
|----------|---------|
| Paper | Recommended |
| Spigot | Supported |
| Purpur | Supported |
| Folia | Supported |

## Quick Links

- [Installation Guide](./installation)
- [Commands & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/config)
- [Virtual Spawners](./configuration/virtual-spawner)

## Support

- **Discord**: Join our [Discord server](https://discord.groupez.dev) for support
- **SpigotMC**: [spigotmc.org/resources/zspawner.69465](https://www.spigotmc.org/resources/zspawner.69465/)

## Download

- **SpigotMC**: [spigotmc.org/resources/zspawner.69465](https://www.spigotmc.org/resources/zspawner.69465/)
- **groupez.dev**: [groupez.dev](https://groupez.dev/)
