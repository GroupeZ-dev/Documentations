---
sidebar_position: 2
title: Installation
description: How to install and configure zJobs
---

# Installation

This guide walks you through installing zJobs on your Minecraft server.

## Requirements

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.21+ |
| Java | Java 21 (required) |
| Server Software | Paper, Purpur, or Folia |

## Dependencies

### Required

| Plugin | Description |
|--------|-------------|
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Economy integration |

### Optional

| Plugin | Description |
|--------|-------------|
| [zMenu](https://modrinth.com/plugin/zmenu) | Custom GUI menus |
| [zItems](../zitems/introduction) | Job boost runes |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Placeholder support |

## Download

You can download zJobs from:

- **SpigotMC**: [https://www.spigotmc.org/resources/zjobs.120454/](https://www.spigotmc.org/resources/zjobs.120454/)
- **Discord**: Development builds available in `#builds` channel at [discord.groupez.dev](https://discord.groupez.dev)

## Installation Steps

### Step 1: Install Vault

zJobs requires Vault for economy support:

1. Download [Vault](https://www.spigotmc.org/resources/vault.34315/)
2. Place it in your `plugins/` folder
3. Install an economy plugin (EssentialsX, CMI, etc.)

### Step 2: Download zJobs

Download the latest version of `zJobs.jar` from one of the sources above.

### Step 3: Install the Plugin

1. Stop your Minecraft server if it's running
2. Place the `zJobs.jar` file in your server's `plugins/` folder
3. Start your server

### Step 4: Verify Installation

After starting your server, verify that zJobs loaded correctly:

1. Check the server console for:
   ```
   [zJobs] zJobs has been enabled!
   ```

2. Run `/jobs` in-game to verify commands work

### Step 5: Initial Configuration

After the first startup, zJobs will create the following folder structure:

```
plugins/zJobs/
├── config.yml           # Main configuration
├── jobs/                # Job definitions
│   ├── miner.yml
│   ├── farmer.yml
│   ├── hunter.yml
│   └── fisherman.yml
├── storage/             # Player data
└── inventories/         # GUI menus (if using built-in)
```

## Configuration

### config.yml

The main configuration file:

```yaml
# Maximum jobs a player can have at once
max-jobs: 3

# Allow players to leave jobs freely
allow-job-leave: true

# Cooldown between job changes (in seconds)
job-change-cooldown: 3600

# Economy settings
economy:
  # Money format
  format: "#,##0.00"
  # Currency symbol
  symbol: "$"

# Database settings
storage-type: SQLITE

# MySQL configuration (if storage-type is MYSQL)
mysql:
  host: localhost
  port: 3306
  database: zjobs
  username: root
  password: ""
```

## Economy Setup

zJobs requires a working economy through Vault. Supported economy plugins:

- **EssentialsX** - Full-featured server essentials
- **CMI** - Comprehensive server management
- **PlayerPoints** - Points-based economy
- **CoinsEngine** - Custom currency support

### Verify Economy

Test your economy setup:

```
/eco give <player> 100
```

If this works, zJobs will be able to give money rewards.

## Updating

To update zJobs:

1. Download the latest version
2. Stop your server
3. Backup your `plugins/zJobs/` folder
4. Replace the old `zJobs.jar` with the new one
5. Start your server
6. Run `/jobs reload` if needed

:::warning Backup First
Always backup your `plugins/zJobs/` folder before updating.
:::

## Troubleshooting

### Plugin Not Loading

If zJobs doesn't appear in `/plugins`:

1. Check console for errors during startup
2. Verify you're using Java 21
3. Verify you're using Minecraft 1.21+
4. Ensure Vault is installed and enabled

### Economy Not Working

If players don't receive money:

1. Verify Vault is installed: `/plugins`
2. Check you have an economy plugin
3. Test with `/eco give <player> 100`
4. Check console for economy errors

### Jobs Not Saving

If player job data isn't saved:

1. Check file permissions on `plugins/zJobs/storage/`
2. Verify database connection if using MySQL
3. Check console for storage errors

## Next Steps

- [Create custom jobs](jobs)
- [Configure actions and rewards](actions)
- [Commands & permissions](commands-permissions)
