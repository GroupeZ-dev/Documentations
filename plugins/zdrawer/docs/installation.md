---
sidebar_position: 2
title: Installation
description: How to install zDrawer
---

# Installation

## Requirements

- Minecraft server 1.20 or higher
- [zMenu](https://www.spigotmc.org/resources/zmenu.110402/) plugin installed
- Java 17 or higher

## Installation Steps

1. Download the latest version of zDrawer
2. Ensure zMenu is installed and running
3. Place `zDrawer.jar` in your `plugins` folder
4. Restart your server
5. Configure the plugin in `plugins/zDrawer/config.yml`

## First Start

On first start, zDrawer creates:

```
plugins/zDrawer/
├── config.yml          # Main configuration
└── storage/            # Data storage folder
    └── drawers.json    # Drawer data (if using JSON storage)
```

## Verify Installation

1. Check console for successful load message
2. Run `/zdrawer version` to see plugin version
3. Try crafting a drawer using the default recipe

## Default Crafts

### Single Drawer

```
┌─────────────────────────┐
│  Spruce   │  Spruce   │  Spruce  │
│   Wood    │  Planks   │   Wood   │
├───────────┼───────────┼──────────┤
│  Spruce   │  Chest    │  Spruce  │
│  Planks   │           │  Planks  │
├───────────┼───────────┼──────────┤
│  Spruce   │  Spruce   │  Spruce  │
│   Wood    │  Planks   │   Wood   │
└─────────────────────────┘
```

### Duo Drawer

Same pattern, but with **Iron Block** in center instead of Chest.

### Trio Drawer

Same pattern, but with **Diamond Block** in center.

### Quad Drawer

Same pattern, but with **Ender Chest** in center.

## Storage Types

Configure your preferred storage backend in `config.yml`:

```yaml
# Available: JSON, SQLITE, MYSQL
storage: SQLITE
```

| Storage | Best For | Notes |
|---------|----------|-------|
| JSON | Small servers | Simple file-based storage |
| SQLITE | Medium/Large servers | Database storage, better performance |
| MYSQL | Large networks | Shared database across servers |

## Optional Dependencies

### PlaceholderAPI

Install for placeholder support in other plugins:

1. Install PlaceholderAPI
2. Restart server
3. Use `%zdrawer_...%` placeholders

### WorldGuard

Install for region protection:

1. Install WorldGuard
2. Restart server
3. Drawers will respect build permissions
