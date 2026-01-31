---
sidebar_position: 1
title: Introduction
description: Introduction to zAuctionHouse - The next generation auction house plugin for Minecraft
---

# zAuctionHouse

Welcome to the zAuctionHouse documentation!

zAuctionHouse is the complete rewrite of zAuctionHouse, featuring a modern architecture, improved performance, and an extensive API for developers. It integrates seamlessly with zMenu for fully customizable inventory interfaces.

## What's New in V4?

zAuctionHouse has been rebuilt from the ground up with:

- **New Architecture** - Modular design with separate API, Core, and Hooks modules
- **Service-Based System** - Dedicated services for selling, purchasing, and item management
- **CompletableFuture API** - Fully asynchronous operations for better performance
- **Enhanced Event System** - Pre and Post events for complete control over auction operations
- **Improved Item Management** - Better abstraction with Item and AuctionItem interfaces

## Key Features

### Multiple Economies
Support for various economy systems:
- Vault (any Vault-compatible economy)
- PlayerPoints
- Experience / Levels
- Custom item currencies
- Create your own economy implementation

### Flexible Category System
- Define categories with powerful rule system
- Material, name, lore, NBT tags, and model data rules
- Combine rules with AND/OR logic
- Blacklist and whitelist support

### Advanced Item Management
- List items for sale with customizable expiration times
- Auto-claim system for purchased items
- Price reduction over time
- Tax system on sales or purchases

### Full Customization
- All interfaces customizable via zMenu
- Custom messages for every action
- Number formatting (K, M, B suffixes)
- Multi-language support

### Multi-Server Support
- Synchronize auctions across multiple servers
- MySQL/MariaDB database support
- Real-time updates between servers

### Developer API
- Clean, documented API
- Service-based architecture
- Event system with pre/post hooks
- Custom economy implementation support

## Comparison with V3

| Feature | V3 | V4 |
|---------|----|----|
| Architecture | Monolithic | Modular (API/Core/Hooks) |
| Async Operations | Partial | Full CompletableFuture |
| Event System | Basic | Pre/Post Events |
| Services | Integrated | Dedicated Services |
| Item Abstraction | Basic | Item/AuctionItem Interfaces |
| Code Quality | Good | Completely Refactored |

## Requirements

- **Java 21+**
- **Minecraft 1.20.5+**
- **[zMenu](https://modrinth.com/plugin/zmenu)** - Required for inventory interfaces
- **PlaceholderAPI** - Optional, for placeholder support
- **Vault** - Optional, for economy integration

## Supported Platforms

zAuctionHouse works with:
- Spigot
- Paper (recommended)
- Purpur
- Pufferfish
- Folia

## Quick Links

- [Installation Guide](./installation)
- [Commands & Permissions](./commands-permissions)
- [Configuration](./configuration/config)
- [API Documentation](./development/api)

## Support

Need help? Here are your options:
- **Discord**: Join our [Discord server](https://discord.groupez.dev) for support
- **GitHub**: Report issues on [GitHub](https://github.com/Maxlego08/zAuctionHouse)

## Download

- **Modrinth**: [modrinth.com/plugin/zauctionhouse](https://modrinth.com/plugin/zauctionhouse)
- **SpigotMC**: [spigotmc.org/resources/zauctionhouse](https://www.spigotmc.org/resources/zauctionhouse.00000/)
