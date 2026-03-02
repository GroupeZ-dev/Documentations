---
sidebar_position: 1
title: Introduction
description: Storage drawer system for Minecraft
---

# zDrawer

zDrawer is a storage drawer system plugin for Minecraft servers (1.20+). It allows players to create storage drawers that can hold a large number of a single item type, with visual displays showing the contents.

## Features

- **Multiple Drawer Types**: SINGLE, DUO, TRIO, and QUAD drawers with 1-4 storage slots
- **Visual Display**: Items and amounts are displayed on the drawer face using display entities
- **Upgrade System**: Increase storage capacity with craftable upgrades
- **Custom Crafts**: Fully configurable crafting recipes
- **Hopper Support**: Automatic item transfer with hoppers
- **Multiple Storage Backends**: JSON, SQLite, or MySQL
- **WorldGuard Integration**: Respect region protection
- **PlaceholderAPI Support**: Display drawer information anywhere

## Drawer Types

| Type | Slots | Description |
|------|-------|-------------|
| SINGLE | 1 | Single item type storage |
| DUO | 2 | Two different item types |
| TRIO | 3 | Three different item types |
| QUAD | 4 | Four different item types |

## How It Works

1. **Craft a Drawer**: Use the configured recipe to craft a drawer
2. **Place the Drawer**: Place it like any block (barrel-based)
3. **Store Items**: Right-click with items to store, left-click to retrieve
4. **Visual Feedback**: See stored items and amounts displayed on the drawer face

## Interactions

| Action | Result |
|--------|--------|
| Right-click with item | Store items in drawer |
| Left-click | Retrieve one stack |
| Shift + Left-click | Retrieve all items |
| Right-click with upgrade | Apply upgrade to drawer |

## Dependencies

| Plugin | Required | Description |
|--------|----------|-------------|
| [zMenu](https://www.spigotmc.org/resources/zmenu.110402/) | Yes | GUI and item configuration system |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | No | Placeholder support |
| [WorldGuard](https://enginehub.org/worldguard) | No | Region protection |

## Support

- [Discord](https://discord.groupez.dev/)
- [SpigotMC](https://www.spigotmc.org/resources/zdrawer.118500/)
- [Documentation](https://docs.groupez.dev/)
