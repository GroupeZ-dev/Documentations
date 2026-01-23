---
sidebar_position: 2
title: Installation
description: How to install zAuctionHouse on your server
---

# Installation

## Requirements

Before installing zAuctionHouse, make sure you have:

- Java 17 or higher
- Minecraft server 1.20.5+
- zMenu plugin installed
- Vault plugin (with an economy provider)

## Installation Steps

1. Download zAuctionHouse from [SpigotMC](https://www.spigotmc.org/members/maxlego08.45892/)
2. Place the JAR file in your server's `plugins` folder
3. Restart your server
4. Configure the plugin in `plugins/zAuctionHouse/config.yml`

## First Start

On first start, zAuctionHouse will:
- Create default configuration files
- Set up the database (SQLite by default)
- Generate default inventory files

## Verification

To verify the installation:
```
/zah help
```

This should display the help menu for zAuctionHouse commands.
