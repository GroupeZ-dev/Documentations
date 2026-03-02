---
sidebar_position: 2
title: Installation
description: How to install and configure zItems
---

# Installation

This guide walks you through installing zItems on your Minecraft server.

## Requirements

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.21+ |
| Java | Java 21 (required) |
| Server Software | Paper, Purpur, or Folia |

:::warning Paper Required
zItems uses Paper-specific APIs. Spigot is **not** supported.
:::

## Download

You can download zItems from:

- **SpigotMC**: [https://www.spigotmc.org/resources/zitems.118638/](https://www.spigotmc.org/resources/zitems.118638/)
- **Discord**: Development builds available at [discord.groupez.dev](https://discord.groupez.dev)

## Installation Steps

### Step 1: Download the Plugin

Download the latest version of `zItems.jar` from one of the sources above.

### Step 2: Install the Plugin

1. Stop your Minecraft server if it's running
2. Place the `zItems.jar` file in your server's `plugins/` folder
3. Start your server

### Step 3: Verify Installation

After starting your server, verify that zItems loaded correctly:

1. Check the server console for:
   ```
   [zItems] zItems has been enabled!
   ```

2. Run `/zitems` in-game to verify commands work

### Step 4: Initial Configuration

After the first startup, zItems creates the following folder structure:

```
plugins/zItems/
├── config.yml           # Main configuration
├── items/               # Custom item definitions
│   ├── example_sword.yml
│   ├── vein_pickaxe.yml
│   └── farming_hoe.yml
└── messages.yml         # Customizable messages
```

## Configuration

### config.yml

The main configuration file:

```yaml
# Enable debug mode for troubleshooting
debug: false

# Database settings for persistent data
storage:
  type: SQLITE  # SQLITE or MYSQL

  # MySQL settings (if type is MYSQL)
  mysql:
    host: localhost
    port: 3306
    database: zitems
    username: root
    password: ""
```

### Item Files

Items are defined in YAML files in the `items/` folder. See [Item Configuration](./configurations/items) for details.

## Optional Dependencies

zItems works standalone but integrates with these plugins:

| Plugin | Integration |
|--------|-------------|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Dynamic placeholders in item names/lore |
| [Jobs Reborn](https://www.spigotmc.org/resources/jobs-reborn.4216/) | Money/XP boost effects for jobs |
| [WorldGuard](https://enginehub.org/worldguard) | Region-based effect restrictions |
| [ShopGUI+](https://www.spigotmc.org/resources/shopgui-1-8-1-21.6515/) | Auto-sell and sell stick support |
| [EconomyShopGUI](https://www.spigotmc.org/resources/economyshopgui.69927/) | Auto-sell and sell stick support |
| [ItemsAdder](https://www.spigotmc.org/resources/itemsadder.73355/) | Custom block support |
| [Oraxen](https://www.spigotmc.org/resources/oraxen.72448/) | Custom block support |
| [Nexo](https://polymart.org/resource/nexo.6901) | Custom block support |
| [zMenu](https://www.spigotmc.org/resources/zmenu.110402/) | Use zItems in menu configurations |
| [zShop](https://www.spigotmc.org/resources/zshop.117583/) | Auto-sell and sell stick support |
| [zJobs](https://www.spigotmc.org/resources/zjobs.117523/) | Job Money/XP boost effects |

## Updating

To update zItems:

1. Download the latest version
2. Stop your server
3. Backup your `plugins/zItems/` folder
4. Replace the old `zItems.jar` with the new one
5. Start your server
6. Run `/zitems reload` if needed

:::warning Backup First
Always backup your `plugins/zItems/` folder before updating. Item configurations may need adjustments for new versions.
:::

## Troubleshooting

### Plugin Not Loading

If zItems doesn't appear in `/plugins`:

1. Check console for errors during startup
2. Verify you're using Java 21: `java -version`
3. Verify you're using Minecraft 1.21+
4. Ensure you're using Paper (not Spigot)
5. Make sure the JAR file isn't corrupted

### Items Not Working

If custom items don't work:

1. Check for YAML syntax errors in item files
2. Use a YAML validator like [YAML Lint](http://www.yamllint.com/)
3. Verify material names are correct (use Minecraft 1.21+ names)
4. Run `/zitems reload` after making changes
5. Check console for error messages

### Effects Not Triggering

If effects don't work:

1. Verify the effect type is spelled correctly
2. Check `applicable-materials` / `applicable-tags` filters
3. Ensure the item has `allow-additional-effects: true` if applied later
4. Check for incompatible effects
5. Verify shop plugin is installed (for AUTO_SELL, SELL_STICK)

### Database Issues

If data isn't persisting:

1. Check database configuration in `config.yml`
2. Verify MySQL credentials if using MySQL
3. Ensure the database exists and user has permissions
4. Check console for database connection errors

## Getting Help

Need help?

- **Discord**: [discord.groupez.dev](https://discord.groupez.dev) - Fastest support
- **GitHub Issues**: Report bugs and request features
- **Documentation**: You're here!

## Next Steps

- [Introduction](./introduction) - Overview of features
- [Item Configuration](./configurations/items) - Create custom items
- [Effects System](./effects/overview) - Add powerful abilities
- [Commands & Permissions](./commands-permissions) - Full command reference
