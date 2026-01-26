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

## Download

You can download zItems from:

- **SpigotMC**: [https://www.spigotmc.org/resources/zitems-demo.118638/](https://www.spigotmc.org/resources/zitems-demo.118638/)
- **Discord**: Development builds available in `#builds` channel at [discord.groupez.dev](https://discord.groupez.dev)

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

After the first startup, zItems will create the following folder structure:

```
plugins/zItems/
├── config.yml           # Main configuration
├── items/               # Custom item definitions
│   ├── armor-trim.yml
│   ├── custom_seed.yml
│   ├── food.yml
│   ├── glass-breaker.yml
│   ├── loot-chest.yml
│   ├── multitools.yml
│   ├── strength-potion.yml
│   └── hoe.yml
└── runes/               # Rune configurations
```

## Configuration

### config.yml

The main configuration file:

```yaml
# Enable debug mode
debug: false

# Database settings for persistent data
storage-type: SQLITE
```

## Optional Dependencies

zItems works standalone but integrates with these plugins:

| Plugin | Integration |
|--------|-------------|
| [zMenu](https://modrinth.com/plugin/zmenu) | Use zItems in menu configurations |
| [zJobs](../zjobs/introduction) | Job Money/XP Boost runes |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Dynamic placeholders in item names/lore |

## Updating

To update zItems:

1. Download the latest version
2. Stop your server
3. Replace the old `zItems.jar` with the new one
4. Start your server
5. Run `/zitems reload` if needed

:::warning Backup First
Always backup your `plugins/zItems/` folder before updating.
:::

## Troubleshooting

### Plugin Not Loading

If zItems doesn't appear in `/plugins`:

1. Check console for errors during startup
2. Verify you're using Java 21
3. Verify you're using Minecraft 1.21+
4. Make sure the JAR file isn't corrupted

### Items Not Working

If custom items don't work:

1. Check for YAML syntax errors in item files
2. Use a YAML validator like [YAML Lint](http://www.yamllint.com/)
3. Verify material names are correct
4. Run `/zitems reload` after making changes

## Next Steps

- [Create custom items](items)
- [Configure runes](runes)
- [Commands & permissions](commands-permissions)
