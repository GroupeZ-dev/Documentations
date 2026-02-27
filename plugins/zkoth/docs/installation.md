---
sidebar_position: 2
title: Installation
description: How to install and configure zKoth
---

# Installation

This guide walks you through installing zKoth on your Minecraft server.

## Requirements

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.8 - 1.21+ |
| Java | Java 21 (required) |
| Server Software | Spigot, Paper, Purpur, or Folia |

## Download

You can download zKoth from:

- **SpigotMC**: [https://www.spigotmc.org/resources/zkoth.118588/](https://www.spigotmc.org/resources/zkoth.118588/)
- **Discord**: Development builds available at [discord.groupez.dev](https://discord.groupez.dev)

## Installation Steps

### Step 1: Install the Plugin

1. Stop your Minecraft server if it's running
2. Place the `zKoth.jar` file in your server's `plugins/` folder
3. Start your server

### Step 2: Verify Installation

After starting your server, verify that zKoth loaded correctly:

1. Check the server console for:
   ```
   [zKoth] zKoth has been enabled!
   ```

2. Run `/zkoth` in-game to see available commands

### Step 3: Initial Configuration

After the first startup, zKoth creates the following folder structure:

```
plugins/zKoth/
├── config.yml           # Main configuration
├── lang/                # Language files
│   └── en-us.yml
└── koths/               # KOTH configurations
    └── koth-example.yml # Example KOTH
```

## Creating Your First KOTH

### Step 1: Get the Selection Axe

```
/zkoth axe
```

You'll receive a golden axe for selecting the KOTH zone.

### Step 2: Select the Zone

1. **Left-click** on the first corner block
2. **Right-click** on the opposite corner block

The zone is the 3D area between these two points.

### Step 3: Create the KOTH

```
/zkoth create <name> [type] [capture_time]
```

**Examples:**
```bash
# Create a capture KOTH with 30 second capture time
/zkoth create castle CAPTURE 30

# Create a score KOTH with 100 points to win
/zkoth create arena SCORE 100
```

### Step 4: Start the KOTH

```bash
# Start with cooldown
/zkoth spawn castle

# Start immediately
/zkoth now castle
```

## Configuration Overview

### config.yml

Main plugin settings including:
- Debug options
- Message display timings
- Scoreboard radius
- Capture permissions

See [Configuration](./configurations/config) for details.

### koths/*.yml

Individual KOTH configurations:
- Capture/score settings
- Scoreboard display
- Hologram settings
- Discord webhooks
- Loot configuration

See [KOTH Configuration](./configurations/koth) for details.

## Optional Dependencies

Install these plugins for additional features:

### Team Plugins (for team-based KOTH)

| Plugin | Feature |
|--------|---------|
| Lands | Land teams |
| FactionsUUID | Faction teams |
| SuperiorSkyblock2 | Island teams |
| BetterTeams | Simple teams |

### Display Plugins

| Plugin | Feature |
|--------|---------|
| PlaceholderAPI | Placeholders in other plugins |
| DecentHolograms | Floating KOTH information |
| FeatherBoard | Custom scoreboards |

### Automation

| Plugin | Feature |
|--------|---------|
| zScheduler | Schedule automatic KOTH events |

## Updating

To update zKoth:

1. Download the latest version
2. Stop your server
3. Backup your `plugins/zKoth/` folder
4. Replace the old `zKoth.jar` with the new one
5. Start your server
6. Run `/zkoth reload` if needed

:::warning Backup First
Always backup your `plugins/zKoth/` folder before updating. KOTH configurations may need adjustments for new versions.
:::

## Troubleshooting

### Plugin Not Loading

If zKoth doesn't appear in `/plugins`:

1. Check console for errors during startup
2. Verify you're using Java 21: `java -version`
3. Ensure the JAR file isn't corrupted
4. Check for conflicting plugins

### Selection Not Working

If the axe doesn't select corners:

1. Verify you have the correct axe from `/zkoth axe`
2. Check you have `zkoth.axe` permission
3. Try using a different block type

### KOTH Not Starting

If KOTH doesn't start:

1. Check the KOTH exists with `/zkoth list`
2. Verify the world is loaded
3. Check console for error messages
4. Ensure selection coordinates are valid

## Getting Help

Need help?

- **Discord**: [discord.groupez.dev](https://discord.groupez.dev) - Fastest support
- **GitHub Issues**: Report bugs and request features
- **Documentation**: You're here!

## Next Steps

- [Commands & Permissions](./commands-permissions) - Full command reference
- [KOTH Configuration](./configurations/koth) - Configure KOTHs
- [Placeholders](./placeholders) - Available placeholders
- [Integrations](./integrations) - Team and scoreboard plugins
