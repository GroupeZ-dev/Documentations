---
sidebar_position: 1
title: Introduction
description: Introduction to zCookieClicker - A Cookie Clicker mini-game for Minecraft servers
---

# zCookieClicker

Welcome to the official zCookieClicker documentation!

zCookieClicker is a fun Cookie Clicker mini-game plugin for Minecraft servers. Players can click to earn cookies, purchase upgrades, and compete for the highest cookie count. Inspired by the popular Cookie Clicker web game.

## Key Features

### Cookie Clicking

- **Click to Earn** - Players click to earn cookies
- **Real-time Updates** - Cookie count updates instantly in the GUI
- **Passive Income** - Earn cookies per second (CPS) from upgrades

### Upgrade System

zCookieClicker includes 14 unique upgrades, each increasing your cookies per second:

| Upgrade | Base Cost | CPS |
|---------|-----------|-----|
| Manual Click | 10 | 0.1 |
| Grandma | 100 | 1 |
| Farm | 1,100 | 8 |
| Factory | 12,000 | 47 |
| Mine | 130,000 | 260 |
| Bank | 1,400,000 | 1,400 |
| Temple | 20,000,000 | 7,800 |
| Tower | 330,000,000 | 44,000 |
| Time Machine | 51,000,000,000 | 2,600,000 |
| Antimatter Condenser | 1,000,000,000,000 | 13,000,000 |
| Prism | 170,000,000,000,000 | 430,000,000 |
| Chancellery | 2,100,000,000,000,000 | 7,000,000,000 |
| Dimensional Corridor | 64,000,000,000,000,000 | 1,200,000,000,000 |
| Celestial Ovens | 170,000,000,000,000,000 | 44,000,000,000,000 |

### Dynamic Pricing

- **Price Scaling** - Upgrade costs increase by a configurable percentage with each purchase
- **BigDecimal Support** - Handles extremely large numbers without overflow

### Number Formatting

- **Short Format** - Large numbers displayed as K, M, B, T, Qa, Qi, etc.
- **Customizable Suffixes** - Configure your own number suffixes
- **Decimal Formatting** - Configurable decimal display format

### zMenu Integration

- **Customizable GUIs** - Full GUI customization via zMenu
- **Pattern System** - Use patterns for consistent upgrade displays
- **Interactive Buttons** - Custom button types for cookie clicking and purchasing

### Data Persistence

- **Multiple Storage Options** - SQLite, MySQL, or MariaDB
- **Automatic Saving** - Player progress saved automatically
- **Cross-session Progress** - Players keep their cookies between sessions

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

## Quick Links

- [Installation Guide](./installation)
- [Commands & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/config)
- [Upgrades](./configuration/upgrades)

## Support

- **Discord**: Join our [Discord server](https://discord.groupez.dev) for support
- **Website**: [groupez.dev](https://groupez.dev/)

## Download

- **groupez.dev**: [groupez.dev](https://groupez.dev/)
