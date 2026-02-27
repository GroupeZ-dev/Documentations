---
sidebar_position: 1
title: Introduction
description: Overview of zShop - A powerful shop plugin for Minecraft
---

# zShop

zShop is a powerful and flexible shop plugin for Minecraft servers that allows players to buy and sell items through a clean GUI interface. Built on top of the [zMenu](https://docs.zmenu.dev/) API, it provides extensive customization options for creating the perfect shop experience.

## Features

- **Multiple Economy Support**: Vault, PlayerPoints, TokenManager, CoinsEngine, item-based economies, XP, and levels
- **Flexible Pricing**: Buy and sell prices with permission-based modifiers
- **Purchase/Sale Limits**: Per-player and server-wide limits with automatic reset schedules
- **zMenu Integration**: Full access to zMenu's powerful inventory system
- **Transaction Logging**: Complete history of all shop transactions
- **Sell Commands**: Quick sell commands for inventory, hand, or all items
- **Confirmation System**: Optional purchase/sale confirmation dialogs
- **ShopGUI+ Converter**: Easy migration from ShopGUI+ plugin

## Button Types

zShop adds custom button types to zMenu:

| Button Type | Description |
|-------------|-------------|
| `ZSHOP_ITEM` | Main shop item - buy/sell on click |
| `ZSHOP_SHOW` | Display current item in buy/sell menu |
| `ZSHOP_SHOW_CONFIRM` | Display item in confirmation menu |
| `ZSHOP_CONFIRM_BUY` | Confirm purchase button |
| `ZSHOP_CONFIRM_SELL` | Confirm sale button |
| `ZSHOP_ADD` | Add items to cart |
| `ZSHOP_REMOVE` | Remove items from cart |
| `ZSHOP_BUY_MORE` | Bulk purchase options |

## Supported Economies

| Economy | Plugin Required |
|---------|-----------------|
| `VAULT` | [Vault](https://www.spigotmc.org/resources/vault.34315/) |
| `PLAYERPOINTS` | [PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) |
| `VOTINGPLUGIN` | [VotingPlugin](https://www.spigotmc.org/resources/votingplugin.15358/) |
| `TOKENMANAGER` | [TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) |
| `COINSENGINE` | [CoinsEngine](https://www.spigotmc.org/resources/84121/) |
| `BEASTTOKEN` | [BeastToken](https://www.spigotmc.org/resources/20806/) |
| `ITEM` | Built-in (use items as currency) |
| `LEVEL` | Built-in (Minecraft player level) |
| `EXPERIENCE` | Built-in (Minecraft XP points) |

## Requirements

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.13+ |
| Java | Java 21 |
| Server Software | Paper, Purpur, or Folia |
| zMenu | Required dependency |

## Links

- **SpigotMC**: [https://www.spigotmc.org/resources/zshop.117583/](https://www.spigotmc.org/resources/zshop.117583/)
- **Discord**: [discord.groupez.dev](https://discord.groupez.dev)
- **zMenu Documentation**: [docs.zmenu.dev](https://docs.zmenu.dev/)

## Quick Start

1. Install [zMenu](https://www.spigotmc.org/resources/zmenu.110402/) first
2. Download and install zShop
3. Configure your economies in `economies.yml`
4. Create shop categories in `inventories/categories/`
5. Use `/zshop` to open the shop

## Next Steps

- [Installation](./installation) - Complete installation guide
- [Configuration](./configurations/config) - Main configuration options
- [Shop Items](./configurations/items) - Create shop items
- [Economies](./configurations/economies) - Configure economies
