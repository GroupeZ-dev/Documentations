---
sidebar_position: 8
title: Migration
description: Migrate data from other auction plugins to zAuctionHouse V4
---

# Migration

zAuctionHouse V4 includes a built-in migration system that allows you to import data from other auction plugins. This ensures a smooth transition without losing existing listings, expired items, or transaction history.

:::warning Before You Start
1. **Back up your database** before running any migration.
2. **Stop the server** or ensure no players are online during migration to prevent data conflicts.
3. Verify that the source plugin's data files or database are accessible.
4. Run the migration command from the server console for best results.
:::

## Migration Command

```bash
/ah admin migrate <source> confirm
```

**Permission:** `zauctionhouse.admin`

The `confirm` argument is required to prevent accidental migrations.

## Supported Sources

### zAuctionHouse V3

Migrate from zAuctionHouse V3 to V4.

**Source aliases:** `zauctionhousev3`, `zah`, `zahv3`, `v3`

```bash
/ah admin migrate zauctionhousev3 confirm
# or using aliases
/ah admin migrate v3 confirm
```

#### Data Migrated

| Data Type | Description |
|-----------|-------------|
| **Active Listings** | All items currently on sale |
| **Expired Items** | Items that have expired and await retrieval |
| **Purchased Items** | Items bought by players awaiting claim |
| **Transaction History** | Complete sales history |
| **Player Data** | Seller information and statistics |

#### How It Works

The migration system reads data from your V3 database and imports it into the V4 database structure. Both SQLite and MySQL/MariaDB V3 databases are supported.

1. The migrator connects to your V3 database
2. All auction items are read and converted to V4 format
3. Item NBT data is preserved, including custom items from other plugins
4. Player UUIDs and names are maintained
5. Price and economy information is transferred
6. Timestamps and expiration data are preserved

#### Prerequisites

- zAuctionHouse V3 data must be accessible (same database or file location)
- zAuctionHouse V4 must be properly configured with storage
- Both plugins should use the same storage type for best results

#### Migration Steps

1. Install zAuctionHouse V4 alongside V3 (don't remove V3 yet)
2. Configure V4's database connection in `config.yml`
3. Start the server and verify V4 loads correctly
4. Run the migration command:
   ```bash
   /ah admin migrate zauctionhousev3 confirm
   ```
5. Wait for the migration to complete (console will show progress)
6. Verify data by checking `/ah` and admin panels
7. Once verified, you can remove zAuctionHouse V3

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

If you're using multiple economies, ensure they are configured in V4 before migration. The migrator will attempt to map economy types automatically.

## Troubleshooting

### Migration fails to start

- Verify you have `zauctionhouse.admin` permission
- Ensure you included `confirm` in the command
- Check console for error messages

### Items not appearing after migration

- Verify the migration completed successfully (check console)
- Clear the cache: `/ah admin cache clear <player>`
- Restart the server

### Duplicate items

If you accidentally run migration twice, duplicate items may appear. To fix:
1. Stop the server
2. Restore your database backup
3. Run migration once more

### Missing transaction history

Transaction history migration depends on V3's logging configuration. If logging was disabled in V3, historical data may be limited.

## Future Migration Support

Additional migration sources may be added in future updates. If you need migration support for a specific auction plugin, please request it on our [Discord server](https://discord.groupez.dev) or [GitHub](https://github.com/Maxlego08/zAuctionHouseV4/issues).

### Commonly Requested

The following plugins are being considered for future migration support:

- AuctionHouse by klgr2001
- CrazyAuctions
- AuctionMaster
- PlayerAuctions

:::info
Migration support depends on the source plugin's data format and structure. Some plugins may not be feasible to support.
:::

