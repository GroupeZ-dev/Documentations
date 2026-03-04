---
sidebar_position: 3
title: Why do I need zMenu?
description: Understanding why zAuctionHouse requires zMenu for inventory management
---

# Why do I need zMenu?

zAuctionHouse requires [zMenu](https://modrinth.com/plugin/zmenu) as a dependency. This page explains why and what benefits it provides.

## What is zMenu?

zMenu is a highly advanced inventory management plugin that provides an extensive set of features, including a robust API for seamless integration with other plugins.

The main goal of zMenu is to be the centerpiece of your plugin ecosystem, offering a unified and comprehensive approach to inventory management. By integrating with other plugins from GroupeZ and third-party plugins, zMenu standardizes inventory management across your server, making it easier to configure and providing advanced functionalities.

Whether used on its own or as a replacement for other inventory plugins, zMenu delivers a feature-rich and versatile experience.

## Benefits for zAuctionHouse

### Full Customization

With zMenu, you have complete control over every inventory in zAuctionHouse:
- **Custom layouts** - Design your own auction interface
- **Buttons & actions** - Configure what each button does
- **Patterns** - Create reusable UI components
- **Animations** - Add dynamic elements to your menus

### Unified Configuration

All GroupeZ plugins use zMenu for their inventories, meaning:
- Learn one configuration system, use it everywhere
- Share patterns and components between plugins
- Consistent user experience across all menus

### Advanced Features

zMenu provides features that enhance zAuctionHouse:
- **Placeholders** - Display dynamic data in menus
- **Requirements** - Show/hide buttons based on conditions
- **Actions** - Execute commands, open menus, play sounds, and more
- **Click types** - Different actions for left/right/shift clicks

### Performance

zMenu is optimized for performance:
- Efficient inventory rendering
- Minimal server impact
- Async operations where possible

## DeluxeMenu Compatibility

Already using DeluxeMenu? Good news!

**DeluxeMenu configurations are automatically compatible with zMenu.** Simply place your DeluxeMenu configuration files in the `inventories` folder of zMenu, and they will work without any additional changes!

This makes migration easy if you're switching from DeluxeMenu to zMenu.

## Getting Started with zMenu

1. Download zMenu from [Modrinth](https://modrinth.com/plugin/zmenu)
2. Place `zMenu.jar` in your `plugins/` folder
3. Start your server
4. zAuctionHouse will automatically use zMenu for all its inventories

For more information about zMenu, check the [zMenu documentation](https://docs.groupez.dev/zmenu).
