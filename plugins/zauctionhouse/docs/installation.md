---
sidebar_position: 2
title: Installation
description: How to install and configure zAuctionHouse on your Minecraft server
---

# Installation

This guide covers the installation and initial configuration of zAuctionHouse.

## Requirements

Before installing, ensure your server meets these requirements:

| Requirement | Version |
|-------------|---------|
| Java | 21 or higher |
| Minecraft | 1.20.5 or higher |
| zMenu | Latest version |
| PlaceholderAPI | Optional |
| Vault | Optional |

## Installation Steps

### 1. Download the Plugin

Download zAuctionHouse from one of these sources:
- [Modrinth](https://modrinth.com/plugin/zauctionhouse)
- [SpigotMC](https://www.spigotmc.org/resources/zauctionhouse.00000/)
- Discord `#builds` channel for development versions

### 2. Install Dependencies

Ensure [zMenu](https://modrinth.com/plugin/zmenu) is installed on your server. zAuctionHouse requires zMenu for its inventory interfaces.

Optional dependencies:
- **PlaceholderAPI** - For placeholder support in items and messages
- **Vault** - For economy integration with Vault-compatible plugins

### 3. Install the Plugin

1. Stop your server
2. Place `zAuctionHouse.jar` in your `plugins/` folder
3. Start your server
4. The plugin will generate default configuration files

### 4. Verify Installation

Run `/ah` to open the auction house interface. If everything is working, you should see the main auction interface.

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
├── rules/
│   ├── blacklist.yml       # Blacklisted items
│   └── whitelist.yml       # Whitelisted items
└── storage.db              # SQLite database (if using SQLite)
```

## Database Configuration

zAuctionHouse supports multiple storage options.

### SQLite (Default)

SQLite is the default storage method and requires no additional configuration:

```yaml
storage:
  type: SQLITE
```

The database file is stored at `plugins/zAuctionHouse/storage.db`.

### MySQL / MariaDB

For multi-server setups or better performance with large datasets:

```yaml
storage:
  type: MYSQL
  host: localhost
  port: 3306
  database: zauctionhouse
  user: root
  password: your_password
  # Enable SSL for secure connections
  useSSL: false
```

### Connection Pool Settings

For high-traffic servers, you can configure the connection pool:

```yaml
storage:
  pool:
    maximum-pool-size: 10
    minimum-idle: 5
    connection-timeout: 30000
    idle-timeout: 600000
    max-lifetime: 1800000
```

## Multi-Server Setup

To synchronize auctions across multiple servers:

1. Use MySQL/MariaDB as your storage type
2. Configure the same database credentials on all servers
3. Enable real-time synchronization:

```yaml
multi-server:
  enabled: true
  # Sync interval in seconds (0 for real-time)
  sync-interval: 0
```

## First Configuration

After installation, you may want to configure:

1. **Economy** - Set up your preferred economy in `economies/vault.yml`
2. **Categories** - Define item categories in `categories.yml`
3. **Limits** - Configure item limits per player in `config.yml`
4. **Expiration** - Set default expiration times

See the [Configuration](./configuration/config) section for detailed options.

## Troubleshooting

### Plugin doesn't start

- Check that Java 21+ is installed: `java -version`
- Verify zMenu is installed and working
- Check the console for error messages

### Economy not working

- Ensure Vault is installed
- Verify an economy plugin (EssentialsX, CMI, etc.) is installed
- Check that Vault can detect your economy: `/vault-info`

### Database connection failed

- Verify database credentials are correct
- Ensure the MySQL server is running and accessible
- Check firewall settings if using a remote database

### Interfaces not appearing

- Verify zMenu is installed and working
- Check that inventory files exist in `inventories/`
- Look for errors in the console when opening menus

## Next Steps

- [Configure commands and permissions](./commands-permissions)
- [Set up categories](./configuration/categories)
- [Customize the interface](./configuration/inventories)
