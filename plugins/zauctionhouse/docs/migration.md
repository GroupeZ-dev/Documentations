---
sidebar_position: 8
title: Migration v3 to v4
description: How to migrate from zAuctionHouse v3 to v4
---

# Migration v3 to v4

This guide explains how to migrate from zAuctionHouse v3 to the new v4 version.

## Requirements

Before migrating, ensure your server meets the v4 requirements:

| Requirement | Version |
|-------------|---------|
| **Java** | 21 or higher |
| **Minecraft** | 1.20 to 1.21+ |

### Required Plugins

| Plugin | Link |
|--------|------|
| **zMenu** | [modrinth.com/plugin/zmenu](https://modrinth.com/plugin/zmenu) |
| **PlaceholderAPI** | [spigotmc.org/resources/6245](https://www.spigotmc.org/resources/placeholderapi.6245/) |

:::warning Important
Both **zMenu** and **PlaceholderAPI** are mandatory for zAuctionHouse v4 to work. The plugin will not function without them.
:::

## Configuration

:::danger Configuration Cannot Be Migrated
The configuration system has been completely rewritten in v4. **You cannot migrate your v3 configuration** - you will need to reconfigure the plugin from scratch.
:::

The default configuration is available in multiple languages:

| Language | Status |
|----------|--------|
| English | Available |
| French | Available |
| Spanish | Available |
| Italian | Available |

When you first install v4, the plugin will generate the configuration files in your server's default language. You can then customize them as needed.

### Migration Steps for Configuration

1. **Backup your v3 configuration** - Keep your old `config.yml` as a reference
2. **Install zAuctionHouse v4** - The plugin will generate new configuration files
3. **Manually reconfigure** - Use your v3 config as reference to set up v4
4. **Test your changes** - Verify everything works as expected

## Items Migration

Your auction items (active listings, expired items, purchased items) **can be migrated** to v4.

### Migration Command

```bash
/ah admin convert
```

**Permission:** `zauctionhouse.admin`

This command will:
- Transfer all active listings from v3 to v4
- Migrate expired items awaiting retrieval
- Move purchased items pending claim
- Preserve all item NBT data and custom properties

:::warning Before You Start
1. **Back up your database** before running the migration
2. **Stop the server** or ensure no players are online during migration
3. Run the command from the server console for best results
:::

### What Gets Migrated

| Data Type | Migrated |
|-----------|----------|
| Active Listings | Yes |
| Expired Items | Yes |
| Purchased Items | Yes |
| Item NBT Data | Yes |
| Custom Plugin Items | Yes |
| Player Data | Yes |

### Item Compatibility

The v4 migration preserves all item data including:
- Custom model data
- NBT tags from other plugins (MMOItems, ItemsAdder, Oraxen, etc.)
- Enchantments and attributes
- Lore and display names

## Migration Checklist

1. [ ] Ensure Java 21 is installed
2. [ ] Verify server is running Minecraft 1.20+
3. [ ] Install zMenu
4. [ ] Install PlaceholderAPI
5. [ ] Backup your v3 database
6. [ ] Backup your v3 configuration (for reference)
7. [ ] Install zAuctionHouse v4
8. [ ] Run `/ah admin convert` to migrate items
9. [ ] Reconfigure the plugin using the new configuration files
10. [ ] Test everything works correctly

## Troubleshooting

### Items not migrating

- Ensure you have the `zauctionhouse.admin` permission
- Check console for error messages
- Verify your v3 database is accessible

### Plugin not starting

- Verify zMenu is installed and loaded
- Verify PlaceholderAPI is installed and loaded
- Ensure Java 21 is being used
- Check that your server is running Minecraft 1.20 or higher

### Configuration errors

Since v4 uses a completely new configuration format, do not attempt to copy v3 configuration files. Start fresh with the generated v4 configuration.

## Need Help?

If you encounter issues during migration, please reach out on our [Discord server](https://discord.groupez.dev) or open an issue on [GitHub](https://github.com/Maxlego08/zAuctionHouseV4/issues).
