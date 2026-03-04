---
sidebar_position: 1
title: Introduction
description: Introduction to zAuctionHouse V4 - The next generation auction house plugin for Minecraft
---

# zAuctionHouse V4

Welcome to the zAuctionHouse V4 documentation!

zAuctionHouse V4 is a complete rewrite of zAuctionHouse, featuring a modern architecture, improved performance, and an extensive API for developers. It integrates seamlessly with zMenu for fully customizable inventory interfaces.

## What's New in V4?

zAuctionHouse V4 has been rebuilt from the ground up with:

- **Service-Based Architecture** - Dedicated services for selling, purchasing, claiming, and item management
- **CompletableFuture API** - Fully asynchronous operations for better performance
- **Enhanced Event System** - Pre and Post events for complete control over auction operations
- **Sarah ORM** - Modern database access with repository pattern
- **Folia Support** - Full compatibility with Folia servers
- **Cluster Support** - Multi-server synchronization with Redis addon

## Key Features

### Multiple Economies
Support for various economy systems:
- **Vault** - Any Vault-compatible economy
- **PlayerPoints** - Points-based currency
- **CoinsEngine** - Custom currencies
- **Experience/Levels** - XP as currency
- **Item-based** - Trade items as currency
- **Custom** - Create your own economy implementation

### Flexible Category System
- Define categories with powerful rule system
- Material, name, lore, NBT tags, and model data rules
- Combine rules with AND/OR logic
- Support for custom item plugins (ItemsAdder, Oraxen, Nexo, MMOItems, etc.)

### Advanced Item Management
- List items for sale with customizable expiration times
- Permission-based listing limits and expiration overrides
- Auto-claim system for offline sales
- Bulk sales (multiple items in one listing)
- Shulker box content preview

### Comprehensive Tax System
- Multiple tax types: SELL, PURCHASE, BOTH, CAPITALISM (VAT)
- Permission-based tax exemptions and reductions
- Item-specific tax rules

### Full Customization
- All interfaces customizable via zMenu
- Custom messages with MiniMessage support
- Number formatting (K, M, B suffixes)
- Hex color support
- Multi-language support (i18n)

### Multi-Server Support
- Synchronize auctions across multiple servers
- MySQL/MariaDB database support
- Redis addon for real-time synchronization
- Distributed locking for transaction safety

### Discord Integration
- Webhook notifications for sales and purchases
- Customizable embeds with item images
- Player avatars and item thumbnails

### Developer API
- Clean, documented API module
- Service-based architecture
- Cancellable Pre/Post events
- Custom economy implementation support
- Custom rule registration

## Requirements

- **Java 21+**
- **Minecraft 1.20.5+** (Paper API 1.21)
- **[zMenu](https://modrinth.com/plugin/zmenu)** - Required for inventory interfaces
- **PlaceholderAPI** - Required for placeholders

### Optional Dependencies
- **Vault** - For economy integration
- **LuckPerms** - For offline permission checks
- **ItemsAdder/Oraxen/Nexo** - For custom item support

## Supported Platforms

zAuctionHouse V4 works with:
- Paper (recommended)
- Spigot
- Purpur
- Pufferfish
- **Folia** - Full support

## Configuration Files

| File | Description |
|------|-------------|
| `config.yml` | Main configuration, database, commands |
| `messages.yml` | All player-facing messages |
| `economies.yml` | Economy providers and tax settings |
| `categories.yml` | Item category definitions |
| `rules.yml` | Blacklist/whitelist rules |
| `discord.yml` | Discord webhook configuration |
| `inventories/` | zMenu inventory templates |
| `patterns/` | Reusable UI patterns |

## Quick Links

- [Installation Guide](./installation)
- [Commands & Permissions](./commands-permissions)
- [Configuration](./configuration/config)
- [Placeholders](./placeholders)
- [API Documentation](./development/api)

## Support

Need help? Here are your options:
- **Discord**: Join our [Discord server](https://discord.groupez.dev) for support
- **Documentation**: [docs.groupez.dev/zauctionhouse](https://docs.groupez.dev/zauctionhouse)
- **GitHub**: Report issues on [GitHub](https://github.com/Maxlego08/zAuctionHouse)

## Download

- **Modrinth**: [modrinth.com/plugin/zauctionhouse](https://modrinth.com/plugin/zauctionhouse)
- **SpigotMC**: [spigotmc.org/resources/zauctionhouse](https://www.spigotmc.org/resources/zauctionhouse.00000/)

## Sponsor

[![Minestrator](https://minestrator.com/img/logo.png)](https://minestrator.com/a/FAIRYSKY)
