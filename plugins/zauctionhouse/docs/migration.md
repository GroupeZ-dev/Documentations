---
sidebar_position: 8
title: Migration
description: How to migrate data from other auction plugins to zAuctionHouse V4
---

# Migration

zAuctionHouse V4 includes a built-in migration system that allows you to import data from other auction plugins. This ensures a smooth transition without losing existing listings, expired items, or transaction history.

:::warning Before You Start
1. **Back up your database** before running any migration.
2. **Stop the server** or ensure no players are online during migration to avoid data conflicts.
3. Verify the source plugin's data files or database are accessible.
4. Run the migration command from the server console for best results.
:::

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

## Migration Command

```bash
/ah admin migrate <source> confirm
```

**Permission:** `zauctionhouse.admin`

The `confirm` argument is required to prevent accidental migrations.

## zAuctionHouse V3

Migrate from zAuctionHouse V3 to V4.

**Source aliases:** `zauctionhousev3`, `zah`, `zahv3`, `v3`, `zauctionhouse`

```bash
/ah admin migrate zauctionhousev3 confirm
# or using aliases
/ah admin migrate v3 confirm
```

### Data Migrated

| Data Type | Description |
|-----------|-------------|
| **Active Listings** | All items currently on sale |
| **Expired Items** | Items that have expired and await retrieval |
| **Purchased Items** | Items bought by players pending claim |
| **Transaction History** | Complete sales history |
| **Player Data** | Seller information and statistics |

### How It Works

The migration system reads data from your V3 database and imports it into the V4 database structure. Both V3 SQLite and MySQL/MariaDB databases are supported, as well as JSON storage.

1. The migrator connects to your V3 data source
2. All auction items are read and converted to V4 format
3. Item NBT data is preserved, including custom items from other plugins
4. Player UUIDs and names are maintained
5. Price and economy information are transferred
6. Timestamps and expiration data are preserved

### Configuration

Configure the V3 migration source in `config.yml`:

```yaml
migration:
  zauctionhouse-v3:
    # Storage type of your V3 data: SQLITE, MYSQL, MARIADB, or JSON
    source-type: SQLITE
    table-prefix: "zauctionhouse_"

    # SQLite settings
    sqlite-path: "plugins/zAuctionHousev3/database.db"

    # MySQL/MariaDB settings
    host: "localhost"
    port: 3306
    database: "zauctionhouse"
    user: "root"
    password: ""

    # JSON settings
    json-folder: "plugins/zAuctionHouseV3"
```

| Source Type | Description | Key Settings |
|------------|-------------|--------------|
| `SQLITE` | Local file-based database (default) | `sqlite-path` |
| `MYSQL` | MySQL database server | `host`, `port`, `database`, `user`, `password` |
| `MARIADB` | MariaDB database server | Same as MySQL |
| `JSON` | JSON file storage | `json-folder` |

### Prerequisites

- zAuctionHouse V3 data must be accessible (same database or file location)
- zAuctionHouse V4 must be properly configured with storage
- Both plugins should use the same storage type for best results

### Migration Steps

1. Install zAuctionHouse V4 alongside V3 (don't remove V3 yet)
2. Configure V4's database connection in `config.yml`
3. Configure the migration source settings in the `migration` section of `config.yml`
4. Start the server and verify V4 loads correctly
5. Run the migration command:
   ```bash
   /ah admin migrate zauctionhousev3 confirm
   ```
6. Wait for the migration to complete (the console will show progress)
7. Verify the data by checking `/ah` and admin panels
8. Once verified, you can remove zAuctionHouse V3

### Configuration

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

#### Configuration Steps

1. **Backup your v3 configuration** - Keep your old `config.yml` as a reference
2. **Install zAuctionHouse v4** - The plugin will generate new configuration files
3. **Manually reconfigure** - Use your v3 config as reference to set up v4
4. **Test your changes** - Verify everything works as expected

## External Plugins

zAuctionHouse V4 also supports migration from third-party auction plugins.

### ZelAuction

Migrate from ZelAuction to zAuctionHouse V4.

**Source aliases:** `zelauction`, `zel`, `zelauctions`

```bash
/ah admin migrate zelauction confirm
# or using aliases
/ah admin migrate zel confirm
```

#### Data Migrated

| Data Type | Description |
|-----------|-------------|
| **Active Listings** | All products currently on sale |
| **Mailbox Items** | Purchased items awaiting claim (migrated as expired items) |
| **Transaction History** | Complete buy/sell history |
| **Player Data** | Seller and buyer information |

#### How It Works

The migration system reads data directly from the ZelAuction database by using its `database.yml` configuration file. Both SQLite and MySQL databases are supported.

1. The migrator reads `plugins/ZelAuction/database.yml` to determine the database type and connection settings
2. Products (listed items) are converted to V4 auction items with a default 48-hour expiration
3. Mailbox items (purchased items awaiting claim) are imported as expired items so players can reclaim them
4. Transactions are converted to V4 log entries
5. Player UUIDs and names are preserved
6. Item data is converted from legacy Base64 serialization to V4's GZIP-compressed format

#### Prerequisites

- The `plugins/ZelAuction/` folder must exist on the server with the `database.yml` configuration file
- The ZelAuction database file (`.db` for SQLite) must be present in the ZelAuction folder
- zAuctionHouse V4 must be properly configured with its own storage

:::info No Configuration Needed
Unlike the V3 migration, ZelAuction migration does not require any configuration in `config.yml`. The migrator reads all connection settings directly from ZelAuction's own `database.yml` file.
:::

#### Migration Steps

1. Ensure the `plugins/ZelAuction/` folder is present on your server with the database
2. Start the server with zAuctionHouse V4 installed
3. Run the migration command:
   ```bash
   /ah admin migrate zelauction confirm
   ```
4. Wait for the migration to complete (the console will show progress)
5. Verify the data by checking `/ah` and admin panels
6. Once verified, you can remove ZelAuction

## Migration Tips

### Large Databases

For servers with thousands of listings, migration may take several minutes. The console will display progress updates. Do not interrupt the process.

### Different Storage Types

If migrating from SQLite to MySQL (or vice versa), the migration handles the conversion automatically. However, ensure your target database is properly configured before starting.

### Item Compatibility

zAuctionHouse V4 uses modern item serialization that preserves all item data including:

- Custom model data
- NBT tags from other plugins (MMOItems, ItemsAdder, Oraxen, etc.)
- Enchantments and attributes
- Lore and display names
- Custom plugin metadata

### Economy Data

If you use multiple economies, ensure they are configured in V4 before migration. The migrator will attempt to map economy types automatically.

## Troubleshooting

### Migration doesn't start

- Ensure you have the `zauctionhouse.admin` permission
- Make sure you included `confirm` in the command
- Check the console for error messages

### Items not appearing after migration

- Verify the migration completed successfully (check console)
- Clear the cache: `/ah admin cache clear <player>`
- Restart the server

### Duplicate items

If you accidentally run the migration twice, duplicates may appear. To fix:
1. Stop the server
2. Restore your database backup
3. Run the migration once more

### Missing transaction history

Transaction history migration depends on the source plugin's logging configuration. If logging was disabled, historical data may be limited.

## Future Migration Support

Additional migration sources may be added in future updates. If you need migration support for a specific auction plugin, please request it on our [Discord server](https://discord.groupez.dev) or [GitHub](https://github.com/Maxlego08/zAuctionHouseV4/issues).

### Frequently Requested

The following plugins are being considered for future migration support:

- AuctionHouse by klgr2001
- CrazyAuctions
- AuctionMaster
- PlayerAuctions

:::info
Migration support depends on the source plugin's data format and structure. Some plugins may not be feasible to support.
:::
