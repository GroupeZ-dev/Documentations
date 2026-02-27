---
sidebar_position: 2
title: Installation
description: How to install and configure zShop
---

# Installation

This guide walks you through installing zShop on your Minecraft server.

## Requirements

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.13+ |
| Java | Java 21 (required) |
| Server Software | Paper, Purpur, or Folia |
| zMenu | Required dependency |

:::warning zMenu Required
zShop requires [zMenu](https://www.spigotmc.org/resources/zmenu.110402/) to be installed. Install zMenu first before installing zShop.
:::

## Download

You can download zShop from:

- **SpigotMC**: [https://www.spigotmc.org/resources/zshop.117583/](https://www.spigotmc.org/resources/zshop.117583/)
- **Discord**: Development builds available at [discord.groupez.dev](https://discord.groupez.dev)

## Installation Steps

### Step 1: Install zMenu

1. Download [zMenu](https://www.spigotmc.org/resources/zmenu.110402/)
2. Place `zMenu.jar` in your `plugins/` folder
3. Start your server to generate zMenu configuration

### Step 2: Install zShop

1. Stop your Minecraft server if it's running
2. Place the `zShop.jar` file in your server's `plugins/` folder
3. Start your server

### Step 3: Verify Installation

After starting your server, verify that zShop loaded correctly:

1. Check the server console for:
   ```
   [zShop] zShop has been enabled!
   ```

2. Run `/zshop` in-game to open the shop

### Step 4: Initial Configuration

After the first startup, zShop creates the following folder structure:

```
plugins/zShop/
├── config.yml           # Main configuration
├── economies.yml        # Economy definitions
├── commands.yml         # Command definitions
├── inventories/         # Shop GUI configurations
│   ├── main_shop.yml    # Main shop menu
│   ├── shop_buy.yml     # Buy confirmation menu
│   ├── shop_sell.yml    # Sell confirmation menu
│   ├── confirm.yml      # Purchase confirmation
│   ├── buy_more.yml     # Bulk purchase menu
│   └── categories/      # Shop categories
│       ├── blocks.yml
│       ├── ores.yml
│       ├── farms.yml
│       └── ...
├── patterns/            # Reusable zMenu patterns
├── players/             # Player limit data
├── logs/                # Transaction logs
└── limits.json          # Server limit data
```

## Configuration Overview

### config.yml

Main plugin configuration including:
- Default economy
- Default item lore
- Price modifiers
- Logging settings
- Price formatting

See [Configuration](./configurations/config) for details.

### economies.yml

Define available economies:
- Vault integration
- Item-based currencies
- Experience/Level economies
- Third-party economy plugins

See [Economies](./configurations/economies) for details.

### inventories/

Shop menus using zMenu format:
- Create custom shop categories
- Configure items with prices
- Set up confirmation dialogs

See [Shop Items](./configurations/items) for details.

## Optional Dependencies

zShop works with these economy plugins:

| Plugin | Integration |
|--------|-------------|
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Standard economy support |
| [PlayerPoints](https://www.spigotmc.org/resources/playerpoints.80745/) | Points-based economy |
| [VotingPlugin](https://www.spigotmc.org/resources/votingplugin.15358/) | Vote points economy |
| [TokenManager](https://www.spigotmc.org/resources/tokenmanager.8610/) | Token economy |
| [CoinsEngine](https://www.spigotmc.org/resources/84121/) | Multi-currency support |
| [BeastToken](https://www.spigotmc.org/resources/20806/) | Token economy |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Placeholder support |

## Migrating from ShopGUI+

zShop includes a converter for ShopGUI+ configurations:

```
/zshop convert
```

:::info
About 90% of your ShopGUI+ configuration will be converted automatically. Some elements may need manual adjustment.
:::

## Updating

To update zShop:

1. Download the latest version
2. Stop your server
3. Backup your `plugins/zShop/` folder
4. Replace the old `zShop.jar` with the new one
5. Start your server
6. Run `/zshop reload` if needed

:::warning Backup First
Always backup your `plugins/zShop/` folder before updating. Configuration formats may change between versions.
:::

## Troubleshooting

### Plugin Not Loading

If zShop doesn't appear in `/plugins`:

1. Check console for errors during startup
2. Verify zMenu is installed and working
3. Verify you're using Java 21: `java -version`
4. Verify you're using Minecraft 1.13+
5. Ensure you're using Paper (not Spigot)

### Economy Not Working

If purchases/sales fail:

1. Check `economies.yml` configuration
2. Verify the economy plugin is installed
3. Check `defaultEconomy` in `config.yml`
4. Look for economy errors in console

### Items Not Appearing

If shop items don't show:

1. Check YAML syntax in inventory files
2. Verify material names are correct
3. Run `/zshop reload` after changes
4. Check console for loading errors

## Getting Help

Need help?

- **Discord**: [discord.groupez.dev](https://discord.groupez.dev) - Fastest support
- **GitHub Issues**: Report bugs and request features
- **Documentation**: You're here!

## Next Steps

- [Configuration](./configurations/config) - Main configuration
- [Economies](./configurations/economies) - Set up economies
- [Shop Items](./configurations/items) - Create shop items
- [Commands & Permissions](./commands-permissions) - Full command reference
