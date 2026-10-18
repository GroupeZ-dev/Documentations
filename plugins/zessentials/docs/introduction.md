---
title: Introduction
description: Introduction to zEssentials - A comprehensive essentials plugin for Minecraft servers
---

# zEssentials

Welcome to the official zEssentials documentation!

zEssentials is a comprehensive, modular essentials plugin for **Paper** Minecraft servers, built with modern architecture and extensive API support. It provides all the core commands and systems needed to run a Minecraft server.

<CalloutContainer type="info">

<CalloutTitle>Paper only</CalloutTitle>

<CalloutDescription>
Since version **1.0.4.0**, zEssentials is a Paper plugin and requires **Paper (or a fork such as Purpur, Pufferfish or Folia) 1.20.6+**. Spigot is no longer supported: on Spigot the plugin stays inactive and only displays a warning. See [Installation](./installation) for details.
</CalloutDescription>

</CalloutContainer>

## Key Features

### Modular Architecture
Every feature is an independent module that can be enabled or disabled individually:
- **Economy** - Multi-currency system with Vault integration, payments and baltop
- **Homes** - Player homes with permission-based limits, plus **public homes**, **shared homes**, categories, favorites and EssentialsX import
- **Kits** - Configurable kit system with cooldowns and categories
- **Teleportation** - TPA (with queue and toggle), back, top, bottom, random teleport
- **Spawn & Warps** - Spawn, first spawn and warp management
- **Sanctions** - Ban, mute, kick, freeze with history and configurable `/seen`
- **Chat** - Chat formatting, interactive chat, item display, ping sound, broadcast
- **Private Messages** - `/msg`, `/reply`, social spy and an **ignore system** (`/ignore`, `/unignore`, `/ignorelist`)
- **Mailbox** - Offline item delivery and **text mails** (`/mail send`, `/mail read`...) for offline players
- **Custom Commands** - Create your own commands (`/discord`, `/map`, `/store`...) directly from the configuration
- **Scoreboard** - Dynamic per-player scoreboards with animations
- **Holograms** - Text, item, and block holograms
- **Vaults** - Personal player storage vaults
- **Voting** - Vote tracking and vote party system
- **WorldEdit** - Built-in building tools
- **Death Message** - Customizable death messages per cause
- **Automatic Messages** - Scheduled broadcast announcements
- **Discord** - Webhook notifications and account linking
- **AFK** - Away From Keyboard detection
- **Rules, Steps, Join/Quit, Items** - And many more utilities

### Persistent Player Settings
- Per-player time and weather (`/ptime`, `/pweather`) are saved and re-applied on reconnection
- Player options (vanish, god, social spy, teleport toggles, ping sound...) are stored in the database

### Multiple Storage Backends
- **SQLite** - Quick setup for testing
- **MySQL / MariaDB** - Recommended for production
- **HikariCP** - Connection pooling for high-performance
- **JSON** - Flat-file storage (limited feature set)

### Extensive Compatibility
- **Minecraft 1.20.6, 1.21 - 1.21.11 and 26.2** supported
- **Paper** (recommended), Purpur, Pufferfish and other Paper forks
- **Folia** compatible (regionised threading)
- **Java 21+** required (**Java 25** for Minecraft 26.x)

### Rich Integrations
- [zMenu](https://modrinth.com/plugin/zmenu) - Fully customizable GUI interfaces
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) - Hundreds of custom placeholders
- [Vault](https://www.spigotmc.org/resources/vault.34315/) - Economy backend
- [WorldGuard](https://enginehub.org/worldguard) - Region protection
- [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) - Island permissions
- [NuVotifier](https://www.spigotmc.org/resources/nuvotifier.13449/) - Vote reception
- [BlockTracker](https://github.com/Krakenied/BlockTracker) - Block change tracking
- [MythicMobs](https://www.spigotmc.org/resources/mythicmobs.5702/) - Custom mob death messages
- NChat - Mute enforcement on NChat messages

### Developer API
- Clean, modular API with 250 interface and class files
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
| Server | Paper (or fork) 1.20.6 or higher |
| Java | 21 or higher (25 for Minecraft 26.x) |
| zMenu | Latest version |
| PlaceholderAPI | Latest version |

## Quick Links

- [Installation Guide](./installation)
- [Commands & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/main-config)
- [Database](./database)
- [Data Migration](./converters)
- [API & Events](./development/events)

## Support

- **Discord**: Join our [Discord server](https://discord.groupez.dev) for support
- **GitHub**: Report issues on [GitHub](https://github.com/Maxlego08/zEssentials)
- **Documentation**: [zessentials.groupez.dev](https://zessentials.groupez.dev/)

## Download

- **Modrinth**: [modrinth.com/plugin/zessentials](https://modrinth.com/plugin/zessentials)
- **groupez.dev**: [groupez.dev](https://groupez.dev/resources/zessentials.325/)
