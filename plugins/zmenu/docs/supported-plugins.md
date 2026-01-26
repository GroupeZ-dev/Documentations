---
sidebar_position: 3
title: Supported Plugins
description: List of all plugins officially supported by zMenu
---

# Supported Plugins

zMenu integrates with many popular Minecraft plugins to extend its functionality. This page lists all officially supported plugins and what features they enable.

## Placeholder Plugins

### PlaceholderAPI

**Download**: [SpigotMC](https://www.spigotmc.org/resources/placeholderapi.6245/)

PlaceholderAPI is highly recommended for zMenu. It allows you to display dynamic values in your inventories, such as player statistics, economy balances, and much more.

**Features enabled:**
- Use `%placeholder%` syntax in item names, lore, and messages
- Thousands of available expansions
- Cached placeholder parsing for performance

**Example:**
```yaml
item:
  material: DIAMOND
  name: "&6%player_name%'s Menu"
  lore:
    - "&7Balance: &a$%vault_eco_balance%"
    - "&7Playtime: &e%statistic_hours_played%h"
```

---

## Economy Plugins

### Vault

**Download**: [SpigotMC](https://www.spigotmc.org/resources/vault.34315/)

Vault provides a unified economy API that zMenu uses for currency-based actions.

**Features enabled:**
- `currency-deposit` action
- `currency-withdraw` action
- Economy placeholders

---

## Permission Plugins

### LuckPerms

**Download**: [https://luckperms.net/](https://luckperms.net/)

LuckPerms integration allows for advanced permission-based features.

**Features enabled:**
- `luckperm` requirement type
- `luckperm-set` action to modify player groups
- Group-based view requirements

**Example:**
```yaml
click-requirement:
  requirements:
    - type: luckperm
      group: vip
      deny:
        - type: message
          messages:
            - "&cYou need VIP rank to use this!"
```

---

## Custom Item Plugins

### ItemsAdder

**Download**: [SpigotMC](https://www.spigotmc.org/resources/itemsadder.73355/)

ItemsAdder allows you to use custom items with textures in your menus.

**Usage:**
```yaml
item:
  material: ITEMSADDER:namespace:item_id
```

---

### Oraxen

**Download**: [SpigotMC](https://www.spigotmc.org/resources/oraxen.72448/)

Oraxen support for custom items and models.

**Usage:**
```yaml
item:
  material: ORAXEN:item_id
```

---

### HeadDatabase

**Download**: [SpigotMC](https://www.spigotmc.org/resources/head-database.14280/)

HeadDatabase provides thousands of custom player head textures.

**Usage:**
```yaml
item:
  material: HEAD_DATABASE:12345
```

---

### Slimefun

**Download**: [GitHub](https://github.com/Slimefun/Slimefun4)

Use Slimefun items in your menus.

**Usage:**
```yaml
item:
  material: SLIMEFUN:ITEM_ID
```

---

### MythicMobs

**Download**: [SpigotMC](https://www.spigotmc.org/resources/mythicmobs.5702/)

MythicMobs integration for custom items.

**Usage:**
```yaml
item:
  material: MYTHICMOBS:item_id
```

---

### ExecutableItems

**Download**: [SpigotMC](https://www.spigotmc.org/resources/executableitems.77578/)

ExecutableItems support for special items.

**Usage:**
```yaml
item:
  material: EXECUTABLE_ITEM:item_id
```

---

### ExecutableBlocks

**Download**: [SpigotMC](https://www.spigotmc.org/resources/executableblocks.96914/)

ExecutableBlocks support for special blocks as items.

---

### BreweryX

**Download**: [SpigotMC](https://www.spigotmc.org/resources/breweryx.114777/)

BreweryX integration for brewing system items.

**Usage:**
```yaml
item:
  material: BREWERYX:recipe_name
```

---

## Head Plugins

### zHead

**Download**: [SpigotMC](https://www.spigotmc.org/resources/zhead.115717/)

Another head texture plugin by the same developer.

**Usage:**
```yaml
item:
  material: ZHEAD:category:head_name
```

---

### HMCCosmetics

**Download**: [SpigotMC](https://www.spigotmc.org/resources/hmccosmetics.100107/)

HMCCosmetics integration for cosmetic items.

---

### MagicCosmetics

MagicCosmetics integration for cosmetic items.

---

## Job Plugins

### Jobs Reborn

**Download**: [SpigotMC](https://www.spigotmc.org/resources/jobs-reborn.4216/)

Jobs Reborn integration for job-based requirements.

**Features enabled:**
- `job` requirement type to check job levels

**Example:**
```yaml
click-requirement:
  requirements:
    - type: job
      job: Miner
      level: 10
```

---

## Shopkeeper Plugins

### Shopkeepers

Integration with Shopkeepers plugin.

**Features enabled:**
- `shopkeeper` action type

---

## Packet Plugins

### PacketEvents

**Download**: [SpigotMC](https://www.spigotmc.org/resources/packetevents-api.80279/)

PacketEvents is required for the Dialog system (Minecraft 1.20.5+).

**Features enabled:**
- Dialog system support
- Advanced UI features

---

## Supported Plugin Summary Table

| Plugin | Category | Material Prefix | Feature |
|--------|----------|-----------------|---------|
| PlaceholderAPI | Placeholders | - | Dynamic values |
| Vault | Economy | - | Currency actions |
| LuckPerms | Permissions | - | Group requirements |
| ItemsAdder | Custom Items | `ITEMSADDER:` | Custom items/textures |
| Oraxen | Custom Items | `ORAXEN:` | Custom items/models |
| HeadDatabase | Heads | `HEAD_DATABASE:` | Custom heads |
| Slimefun | Custom Items | `SLIMEFUN:` | Slimefun items |
| MythicMobs | Custom Items | `MYTHICMOBS:` | MythicMobs items |
| ExecutableItems | Custom Items | `EXECUTABLE_ITEM:` | EI items |
| BreweryX | Custom Items | `BREWERYX:` | Brewing items |
| zHead | Heads | `ZHEAD:` | Custom heads |
| Jobs Reborn | Jobs | - | Job requirements |
| PacketEvents | Packets | - | Dialog system |

## Using Custom Materials

When using custom item plugins, the material format typically follows this pattern:

```yaml
item:
  material: PLUGIN_PREFIX:item_identifier
```

### Examples:

```yaml
# ItemsAdder
item:
  material: ITEMSADDER:my_namespace:ruby

# Oraxen
item:
  material: ORAXEN:emerald_sword

# HeadDatabase
item:
  material: HEAD_DATABASE:1234

# Slimefun
item:
  material: SLIMEFUN:ELECTRIC_MOTOR

# MythicMobs
item:
  material: MYTHICMOBS:SkeletonKingSword
```

## Plugin Detection

zMenu automatically detects installed plugins and enables their features. You don't need to configure anything - just install the plugins and restart your server.

To verify which plugins zMenu detected, check the console output when the server starts or use the `/zm version` command.
