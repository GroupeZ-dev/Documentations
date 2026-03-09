---
sidebar_position: 2
title: Installing zAuctionHouse
description: How to download, install and configure zAuctionHouse on your Minecraft server
---

# Installing zAuctionHouse

This guide covers downloading and installing zAuctionHouse on your server.

## Download

zAuctionHouse is available on multiple platforms:

| Platform | Link | Notes |
|----------|------|-------|
| **Spigot** | [spigotmc.org/resources/63010](https://www.spigotmc.org/resources/63010/) | Premium version |
| **GroupeZ** | [groupez.dev/resources/1](https://groupez.dev/resources/1) | Premium version |
| **BuiltByBit** | [builtbybit.com/resources/8987](https://builtbybit.com/resources/8987/) | Premium version |
| **Modrinth** | [modrinth.com/plugin/zauctionhouse](https://modrinth.com/plugin/zauctionhouse) | Free trial version |
| **GitHub** | [github.com/GroupeZ-dev/zAuctionHouse](https://github.com/GroupeZ-dev/zAuctionHouse) | Source code |

:::info Support
Support is included with the premium version. Free trial users can access community support on our [Discord server](https://discord.groupez.dev).
:::

## Requirements

Before installing, ensure your server meets these requirements:

### Server Requirements

| Requirement | Version |
|-------------|---------|
| **Java** | 21 or higher |
| **Minecraft** | 1.20 to 1.21+ |

### Supported Server Software

| Software | Status |
|----------|--------|
| **Paper** | Recommended |
| **Folia** | Fully supported |
| **Pufferfish** | Supported |
| **Purpur** | Supported |
| **UniverSpigot** | Supported |
| **Spigot** | Supported (not recommended) |

Paper and its forks are recommended for the best performance and compatibility.

### Required Plugins

| Plugin | Link |
|--------|------|
| **zMenu** | [modrinth.com/plugin/zmenu](https://modrinth.com/plugin/zmenu) |
| **PlaceholderAPI** | [spigotmc.org/resources/6245](https://www.spigotmc.org/resources/placeholderapi.6245/) |

:::tip Folia Users
For Folia servers, use these forked versions:
- **PlaceholderAPI**: [Folia Fork](https://github.com/Anon8281/PlaceholderAPI/releases/tag/1.1)
- **Vault**: [Folia Fork](https://github.com/Geolykt/Vault/releases)
:::

### Recommended Plugins

| Plugin | Link | Description |
|--------|------|-------------|
| **Vault** | [spigotmc.org/resources/34315](https://www.spigotmc.org/resources/vault.34315/) | Economy integration |

## Installation Steps

### 1. Download the Plugins

Download zAuctionHouse and all required plugins from the links above.

### 2. Install the Plugins

Place all `.jar` files in your server's `plugins/` folder:
- `zAuctionHouse.jar`
- `zMenu.jar`
- `PlaceholderAPI.jar`
- `Vault.jar` (recommended)

### 3. Start Your Server

Start your server to generate the default configuration files.

### 4. Configure the Plugin

Edit the configuration files in `plugins/zAuctionHouse/` to customize the plugin for your server. See the [Configuration](./configuration/config) section for details.

### 5. Restart Your Server

Restart your server to apply the configuration changes. You're ready to use zAuctionHouse!

## Verify Installation

Run `/ah` to open the auction house interface. If everything is working correctly, you should see the main auction interface.

## File Structure

After first startup, zAuctionHouse creates the following structure:

```
plugins/zAuctionHouse/
├── config.yml              # Main configuration
├── messages.yml            # All plugin messages
├── categories.yml          # Category definitions
├── economies/
│   └── vault.yml           # Economy configurations
├── inventories/
│   ├── auction.yml         # Main auction interface
│   ├── categories.yml      # Category selection
│   ├── confirm_buy.yml     # Purchase confirmation
│   ├── confirm_remove.yml  # Remove confirmation
│   ├── expired.yml         # Expired items
│   ├── player.yml          # Player's listings
│   ├── purchased.yml       # Purchased items
│   └── sell.yml            # Sell interface
├── rules.yml               # Item rules
└── database.db             # SQLite database (if using SQLite)
```

## Next Steps

- [Why do I need zMenu?](./why-zmenu) - Learn about zMenu integration
- [Commands & Permissions](./commands-permissions) - Full command reference
- [Configuration](./configuration/config) - Customize everything
