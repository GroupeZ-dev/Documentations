---
sidebar_position: 1
title: Getting Started
description: Introduction to zMenu - The most powerful inventory plugin for Minecraft
---

# Getting Started with zMenu

**zMenu** is the most powerful and flexible inventory (GUI) plugin for Minecraft servers. It allows you to create beautiful, interactive menus with an extensive configuration system that gives you complete control over every aspect of your inventories.

## What is zMenu?

zMenu is a premium-quality inventory plugin that enables server administrators to create custom GUIs (Graphical User Interfaces) for their Minecraft servers. Whether you need a simple server selector, a complex shop system, or an interactive quest menu, zMenu provides all the tools you need.

## Key Features

### Highly Customizable Inventories
- Create inventories of any size (9 to 54 slots)
- Multi-page support with automatic pagination
- Custom titles with placeholder support
- Fill items for empty slots
- Matrix-based layout system for easy design

### Powerful Button System
- **9 built-in button types**: NONE, INVENTORY, BACK, NEXT, PREVIOUS, HOME, JUMP, MAIN_MENU, SWITCH
- Custom click actions for each mouse button
- View and click requirements
- Player head support with custom textures
- Dynamic item updates

### Extensive Action System
- **28+ action types** including messages, sounds, commands, teleportation, and more
- Execute actions as player, console, or with OP permissions
- Chain multiple actions together
- Conditional actions with requirements

### Advanced Features
- **Pattern System**: Create reusable button templates
- **Player Data**: Store and retrieve player-specific data
- **Global Placeholders**: Define values used across all inventories
- **PlaceholderAPI Support**: Full integration with PAPI
- **MiniMessage Support**: Modern text formatting for Paper servers
- **Anti-Dupe System**: Built-in protection against item duplication exploits
- **Database Support**: MySQL, MariaDB, and SQLite for data persistence

### Developer Friendly
- Clean, well-documented API
- Custom button type registration
- Custom action type registration
- Event system for inventory interactions

## Why Choose zMenu?

| Feature | zMenu | Other Plugins |
|---------|-------|---------------|
| Button Types | 9+ built-in | Limited |
| Action Types | 28+ | Basic |
| Multi-page Support | Native | Often requires workarounds |
| Pattern System | Yes | No |
| Player Data Storage | Yes | Rarely |
| MiniMessage Support | Yes | Rarely |
| Database Support | MySQL/MariaDB/SQLite | Usually file-based only |
| API Quality | Comprehensive | Often minimal |
| Active Development | Yes | Varies |
| Free | Yes | Often paid |

## How It Works

zMenu uses YAML configuration files to define your inventories. Here's a simplified overview:

1. **Inventories** are defined in the `inventories/` folder
2. Each inventory contains **buttons** (items that players can interact with)
3. Buttons can have **actions** that execute when clicked
4. **Requirements** control who can see or click buttons
5. **Patterns** allow you to reuse button configurations

### Simple Example

```yaml
# inventories/my_menu.yml
name: "&6My First Menu"
size: 27

items:
  welcome-button:
    slot: 13
    item:
      material: DIAMOND
      name: "&bWelcome!"
      lore:
        - "&7Click me to receive a message"
    actions:
      - type: message
        messages:
          - "&aHello, %player%!"
          - "&7Thanks for using zMenu!"
```

This creates a simple 27-slot inventory with a diamond in the center that sends a message when clicked.

## Supported Minecraft Versions

zMenu supports Minecraft versions **1.19 to 1.21+** and works with:
- Spigot
- Paper (recommended)
- Purpur
- Pufferfish
- Folia

## Next Steps

Ready to get started? Follow these steps:

1. [Install zMenu](./installation) on your server
2. Learn about the [configuration system](./configurations/informations)
3. [Create your first inventory](./configurations/inventories/create-inventory)
4. Explore [button types](./configurations/buttons/button) and [actions](./configurations/buttons/actions)

## Getting Help

- **Discord**: Join our [Discord server](https://discord.groupez.dev) for support
- **Modrinth**: Download from [Modrinth](https://modrinth.com/plugin/zmenu)
- **GitHub**: Report issues on [GitHub](https://github.com/Maxlego08/zMenu)
- **Dev Builds**: Get development versions in the `#builds` channel on Discord
