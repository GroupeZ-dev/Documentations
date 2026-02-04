---
sidebar_position: 1
title: Introduction
description: Introduction to zEssentials - A comprehensive essentials plugin for Minecraft servers
---

# zEssentials

Welcome to the official zEssentials documentation!

zEssentials is a comprehensive, modular essentials plugin for Minecraft servers (Paper/Spigot) built with modern architecture, extensive API support, and multi-server capabilities via Redis. It provides all the core commands and systems needed to run a Minecraft server.

## Key Features

### Modular Architecture
Every feature is an independent module that can be enabled or disabled individually:
- **Economy** - Multi-currency system with Vault integration
- **Homes** - Player homes with permission-based limits
- **Kits** - Configurable kit system with cooldowns
- **Teleportation** - TPA, warps, spawn, random teleport
- **Sanctions** - Ban, mute, kick, freeze with history
- **Chat** - Chat formatting, interactive chat, broadcast
- **Scoreboard** - Dynamic per-player scoreboards with animations
- **Holograms** - Text, item, and block holograms
- **Vaults** - Personal player storage vaults
- **Mailbox** - Offline item delivery system
- **Voting** - Vote tracking and vote party system
- **WorldEdit** - Built-in building tools
- **Discord** - Webhook notifications and account linking
- **AFK** - Away From Keyboard detection

### Multi-Server Support
- Redis integration for cross-server messaging
- Synchronized player data, cooldowns, and sanctions
- Cross-server private messages and broadcasts

### Multiple Storage Backends
- **SQLite** - Quick setup for testing
- **MySQL / MariaDB** - Recommended for production
- **HikariCP** - Connection pooling for high-performance

### Extensive Compatibility
- **Minecraft 1.20.4 - 1.21.11** supported
- **Paper** (recommended), Spigot, Purpur, Pufferfish
- **Folia** compatible (async threading)
- **Java 21+** required

### Rich Integrations
- [zMenu](https://modrinth.com/plugin/zmenu) - Fully customizable GUI interfaces
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) - 76+ custom placeholders
- [Vault](https://www.spigotmc.org/resources/vault.34315/) - Economy backend
- [WorldGuard](https://enginehub.org/worldguard) - Region protection
- [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) - Island permissions
- [ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/) - Packet manipulation
- [NuVotifier](https://www.spigotmc.org/resources/nuvotifier.13449/) - Vote reception
- [BlockTracker](https://github.com/Krakenied/BlockTracker) - Block change tracking

### Developer API
- Clean, modular API with 242 interface files
- Custom events for all major actions
- Service-based architecture
- Full PlaceholderAPI expansion

### Data Migration
Built-in converters from:
- EssentialsX
- CMI
- CoinsEngine
- HuskHomes
- PlayerVaultX
- AxVaults
- Sunlight

## Requirements

| Requirement | Version |
|-------------|---------|
| Java | 21 or higher |
| Minecraft | 1.20.4 or higher |
| zMenu | Latest version |
| PlaceholderAPI | Latest version |

## Quick Links

- [Installation Guide](./installation)
- [Commands & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/main-config)
- [Database](./database)
- [API & Events](./development/events)

## Support

- **Discord**: Join our [Discord server](https://discord.groupez.dev) for support
- **GitHub**: Report issues on [GitHub](https://github.com/Maxlego08/zEssentials)
- **Documentation**: [zessentials.groupez.dev](https://zessentials.groupez.dev/)

## Download

- **Modrinth**: [modrinth.com/plugin/zessentials](https://modrinth.com/plugin/zessentials)
- **groupez.dev**: [groupez.dev](https://groupez.dev/)
