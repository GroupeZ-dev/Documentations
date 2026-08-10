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
- `deposit` action
- `withdraw` action
- Economy placeholders

---

### ExcellentEconomy

**Download**: [SpigotMC](https://www.spigotmc.org/resources/excellenteconomy-%E2%AD%90-economy-and-custom-currencies.84121/)

ExcellentEconomy provides a multi-currency economy system with custom currencies support.

**Features enabled:**
- `deposit` action
- `withdraw` action
- Multi-currency support via `economy` parameter

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
  vip-check:
    clicks:
      - ALL
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
  material: hdb:12345
```

:::caution Correct prefix
The material prefix is `hdb:` (case-insensitive). The previously documented `HEAD_DATABASE:` prefix is **incorrect** and will not resolve.
:::

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
  material: mythicmobs:item_id
```

---

### MMOItems

MMOItems integration for RPG items.

**Usage:**
```yaml
item:
  material: mmoitems:<type>:<item_id>
```

---

### Nexo

Nexo integration for custom items (successor to Oraxen).

**Usage:**
```yaml
item:
  material: nexo:<item_name>
```

---

### CraftEngine

CraftEngine integration for custom items.

**Usage:**
```yaml
item:
  material: craftengine:<item_id>
```

---

### Nova

Nova integration for custom items.

**Usage:**
```yaml
item:
  material: nova:<item_or_block_name>
```

---

### NextGens

NextGens generator integration.

**Usage:**
```yaml
item:
  material: nextgens_generators:<generator_id>
```

---

### zItems

**Download**: [SpigotMC](https://www.spigotmc.org/resources/zitems.118638/)

zItems integration by the same developer as zMenu.

**Usage:**
```yaml
item:
  material: zitems:<item_id>
```

---

### ExecutableItems

**Download**: [SpigotMC](https://www.spigotmc.org/resources/executableitems.77578/)

ExecutableItems support for special items.

**Usage:**
```yaml
item:
  material: ei:item_id
```

:::caution Correct prefix
The material prefix is `ei:` (case-insensitive). The previously documented `EXECUTABLE_ITEM:` prefix is **incorrect** and will not resolve.
:::

---

### ExecutableBlocks

**Download**: [SpigotMC](https://www.spigotmc.org/resources/executableblocks.96914/)

ExecutableBlocks support for special blocks as items.

**Usage:**
```yaml
item:
  material: eb:block_id
```

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

### Denizen

**Download**: [SpigotMC](https://www.spigotmc.org/resources/denizen.21039/)

Denizen integration is available through the [item rules system](./configurations/item-rules). You can match Denizen items by their script name using the `denizen` rule type (for example with the `item_drag` button).

**Usage:**
```yaml
rule:
  type: denizen
  items:
    - "my_denizen_item"
```

---

## Head Plugins

### zHead

**Download**: [SpigotMC](https://www.spigotmc.org/resources/zhead.115717/)

Another head texture plugin by the same developer.

**Usage:**
```yaml
item:
  material: zhd:category:head_name
```

:::caution Correct prefix
The material prefix is `zhd:` (case-insensitive). The previously documented `ZHEAD:` prefix is **incorrect** and will not resolve.
:::

---

### HMCCosmetics

**Download**: [SpigotMC](https://www.spigotmc.org/resources/hmccosmetics.100107/)

HMCCosmetics integration for cosmetic items.

**Usage:**
```yaml
item:
  material: hmc_cosmetics:<type>
  # or for a specific player's cosmetic:
  material: hmc_cosmetics:<type>-<player>
```

---

### MagicCosmetics

MagicCosmetics integration for cosmetic items.

**Usage:**
```yaml
item:
  material: magic_cosmetics:<cosmetic_id>
```

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
  job-check:
    clicks:
      - ALL
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

## Bedrock Compatibility

### Geyser / Floodgate

**Download**: [GeyserMC](https://geysermc.org/)

Geyser and Floodgate allow Bedrock Edition players to join Java Edition servers. When detected, zMenu enables the Bedrock Forms system, which provides native Bedrock UI forms instead of chest-based inventories.

**Features enabled:**
- Native Bedrock forms (Simple, Modal, Custom)
- `bedrock` action type to open forms
- Automatic inventory replacement for Bedrock players
- `/zm bedrock` commands
- `zmenu.open.bedrock` and `zmenu.reload.bedrock` permissions

**Example:**
```yaml
# In a button action
actions:
  - type: bedrock
    bedrock: "feedback-form"
```

See [Bedrock Forms](./configurations/bedrock) for complete documentation.

---

## Packet Plugins

### PacketEvents

**Download**: [SpigotMC](https://www.spigotmc.org/resources/packetevents-api.80279/)

PacketEvents is required for the Dialog system (Minecraft 1.20.5+).

**Features enabled:**
- Dialog system support
- Advanced UI features

---

## Built-in Material Loaders

These loaders are built into zMenu and do not require any external plugin.

### armor

Returns the item the player currently has equipped in the specified armor slot.

```yaml
item:
  material: armor:HEAD       # Helmet
  # material: armor:CHEST    # Chestplate
  # material: armor:LEGS     # Leggings
  # material: armor:FEET     # Boots
```

### base64

Deserialises a Base64-encoded `ItemStack` (Bukkit serialisation format).

```yaml
item:
  material: base64:<base64_encoded_itemstack>
```

---

## Supported Plugin Summary Table

| Plugin | Category | Material Prefix | Feature |
|--------|----------|-----------------|---------|
| PlaceholderAPI | Placeholders | - | Dynamic values |
| Vault | Economy | - | Currency actions |
| ExcellentEconomy | Economy | - | Multi-currency actions |
| LuckPerms | Permissions | - | Group requirements |
| ItemsAdder | Custom Items | `itemsadder:` | Custom items/textures |
| Oraxen | Custom Items | `oraxen:` | Custom items/models |
| Nexo | Custom Items | `nexo:` | Custom items/models |
| CraftEngine | Custom Items | `craftengine:` | Custom items |
| HeadDatabase | Heads | `hdb:` | Custom heads |
| Slimefun | Custom Items | `slimefun:` | Slimefun items |
| MythicMobs | Custom Items | `mythicmobs:` | MythicMobs items |
| MMOItems | Custom Items | `mmoitems:` | RPG items |
| ExecutableItems | Custom Items | `ei:` | EI items |
| ExecutableBlocks | Custom Items | `eb:` | EB items |
| BreweryX | Custom Items | `breweryx:` | Brewing items |
| Denizen | Item Rules | - | `denizen` item rule |
| zHead | Heads | `zhd:` | Custom heads |
| zItems | Custom Items | `zitems:` | Custom items |
| Nova | Custom Items | `nova:` | Nova items |
| NextGens | Custom Items | `nextgens_generators:` | Generator items |
| HMCCosmetics | Cosmetics | `hmc_cosmetics:` | Cosmetic items |
| MagicCosmetics | Cosmetics | `magic_cosmetics:` | Cosmetic items |
| Jobs Reborn | Jobs | - | Job requirements |
| Geyser/Floodgate | Bedrock | - | Native Bedrock forms |
| PacketEvents | Packets | - | Dialog system / click limiter |
| *(built-in)* | Material | `armor:` | Player's equipped item |
| *(built-in)* | Material | `base64:` | Base64-encoded ItemStack |

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
  material: itemsadder:my_namespace:ruby

# Oraxen / Nexo
item:
  material: oraxen:emerald_sword
  # material: nexo:emerald_sword

# HeadDatabase
item:
  material: hdb:1234

# Slimefun
item:
  material: slimefun:ELECTRIC_MOTOR

# MythicMobs
item:
  material: mythicmobs:SkeletonKingSword

# MMOItems
item:
  material: mmoitems:SWORD:LEGENDARY_BLADE

# ExecutableItems / ExecutableBlocks
item:
  material: ei:my_custom_item
  # material: eb:my_custom_block

# zItems
item:
  material: zitems:my_item_id

# Player's equipped item (built-in)
item:
  material: armor:HEAD
```

## Plugin Detection

zMenu automatically detects installed plugins and enables their features. You don't need to configure anything - just install the plugins and restart your server.

To verify which plugins zMenu detected, check the console output when the server starts or use the `/zm version` command.
