---
sidebar_position: 2
title: Installation
description: How to install zAuctionHouse on your server
---

# Installation

## Requirements

Before installing zAuctionHouse, make sure you have:

- Java 17 or higher
- Minecraft server 1.20.5+ (or 1.13+ for legacy support)
- [zMenu](https://www.spigotmc.org/resources/zmenu.110402/) plugin installed
- Vault plugin (optional, for economy support)

## Installation Steps

1. Download zAuctionHouse from [SpigotMC](https://www.spigotmc.org/resources/zauctionhouse.97544/)
2. Download and install [zMenu](https://www.spigotmc.org/resources/zmenu.110402/)
3. Place both JAR files in your server's `plugins` folder
4. Restart your server
5. Configure the plugin in `plugins/zAuctionHouseV3/`

## First Start

On first start, zAuctionHouse will create:
- `config.yml` - Main configuration
- `economies.yml` - Economy configurations
- `categories.yml` - Item categories
- `messages/` - Message files
- `inventories/` - zMenu inventory configurations

## Configuration Files

```
plugins/zAuctionHouseV3/
├── config.yml
├── economies.yml
├── categories.yml
├── messages/
│   └── en.yml
└── inventories/
    ├── auction.yml
    ├── buyConfirm.yml
    ├── removeConfirm.yml
    └── ...
```

## Verification

To verify the installation, run:
```
/ah
```

This should open the auction house interface.

## Converting from Other Plugins

zAuctionHouse supports conversion from:
- zAuctionHouseV2
- CrazyAuction
- AuctionHouseDB
- AuctionHouseRetro
- PlayerAuctions

Use the command:
```
/ah convert <plugin>
```

### Converting from zAuctionHouseV2

1. Place the `items.json` file in `plugins/zAuctionHouseV3/convert/`
2. Run `/ah convert zauctionhousev2`

### Upgrading to Minecraft 1.21

If upgrading from Minecraft 1.20.4 or earlier:

```
/ah convert items_base64_to_minecraft_1_21
```

:::danger Important
You **must** run this conversion command when upgrading to 1.21, or all items will be lost!
:::

This command:
- Works with JSON or MySQL storage only
- Automatically enables `enableNewBase64ItemStackMethod` in config.yml
- Redis users must first convert to MySQL

## zMenu Configuration

To convert old zMenu configurations:
```
/ah convert zmenu
```

For Minecraft 1.13+, use files from the `1.13+` folder when restoring backups.
