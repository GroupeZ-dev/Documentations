---
sidebar_position: 1
title: Main Configuration
description: Main configuration options for zSpawner
---

# Main Configuration

This page covers the main configuration options available in `config.yml`.

## General Settings

```yaml
# Displays more information in the console
# Enable this when reporting issues to support
enableDebug: false

# Enables time debugs for performance measurement
enableDebugTime: false

# Data update interval in milliseconds (default: 2 minutes)
updateInterval: 120000
```

## Storage Configuration

zSpawner supports SQLite and MySQL/MariaDB storage backends.

### SQLite

Default storage option, requires no additional configuration:

```yaml
storage: SQLITE
```

### MySQL / MariaDB

For production environments:

```yaml
storage: MYSQL

database-configuration:
  table-prefix: "zspawner_"
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  debug: false
  database: zspawner
```

| Option | Description |
|--------|-------------|
| `table-prefix` | Prefix for all database tables |
| `user` | Database username |
| `password` | Database password |
| `port` | Database port |
| `host` | Database host address |
| `debug` | Enable database debug logging |
| `database` | Database name |

## Spawner Items

Configure the items players receive when given spawners:

```yaml
items:
  CLASSIC:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Place the spawner on the ground"
    flags:
      - HIDE_POTION_EFFECTS

  GUI:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Place the spawner and find"
      - "&8it in the &7/spawners"
    flags:
      - HIDE_POTION_EFFECTS

  VIRTUAL:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Virtual spawner, place it to use it"
    flags:
      - HIDE_POTION_EFFECTS
```

| Placeholder | Description |
|-------------|-------------|
| `%type%` | Entity type name (e.g., "ZOMBIE", "SKELETON") |

## Explosion Protection

Configure how spawners behave when hit by explosions:

```yaml
# Disable spawner destruction by explosions
disableSpawnerExplosion:
  GUI: true
  CLASSIC: true
  VIRTUAL: true  # Always true, cannot be changed

# Drop spawners when destroyed by explosion
dropSpawnerOnExplose:
  GUI: false
  CLASSIC: false
  VIRTUAL: false  # Always false

# Protect natural (vanilla) spawners from explosions
disableNaturalSpawnerExplosion: false

# Drop natural spawners when destroyed by explosion
dropNaturalSpawnerOnExplose: false
```

## Chunk Limit

Limit the number of spawners that can be placed per chunk:

```yaml
chunkLimit:
  # Enable chunk spawner limiting
  enable: false

  # Global limit per chunk
  global: 5

  # Per-entity limits
  limits:
    - SKELETON: 10
```

## Block Blacklist

Prevent spawners from being placed on certain blocks:

```yaml
blacklistBlocks:
  - CHEST
  - DROPPER
  - TRAPPED_CHEST
  - CAULDRON
  - FURNACE
  - ENDER_CHEST
  - BEDROCK
  - BREWING_STAND
  - DISPENSER
  - OBSIDIAN
  - SPAWNER
  - DIAMOND_BLOCK
  - GOLD_BLOCK
  - IRON_BLOCK
  - NETHERITE_BLOCK
```

## Owner Break Permission

Allow spawner owners to break their GUI spawners:

```yaml
# Owner can break to move spawner back to /spawners
ownerCanBreakSpawner: true
```

## Entity Materials

Configure the display material (spawn egg) for each entity type in GUIs:

```yaml
entitiesMaterial:
  - ZOMBIE: ZOMBIE_SPAWN_EGG
  - SKELETON: SKELETON_SPAWN_EGG
  - CREEPER: CREEPER_SPAWN_EGG
  - SPIDER: SPIDER_SPAWN_EGG
  - BLAZE: BLAZE_SPAWN_EGG
  # ... more entities
```

You can use zMenu materials including custom heads:

```yaml
entitiesMaterial:
  - ZOMBIE: "hdb:12345"  # HeadDatabase
  - SKELETON: "base64:..."  # Base64 texture
```

## Material Blacklist

Prevent certain items from being stored in virtual spawners:

```yaml
blacklist-materials:
  - BOW
  - GOLDEN_SWORD
```

## Virtual Spawner Break

Allow breaking blocks/entities where virtual spawners would spawn:

```yaml
breakUpVirtualSpawner: true
```

## Experience Settings

Give experience directly to players from virtual spawners:

```yaml
give-player-experience: false
```

## Deposit Reason

Message format for economy transactions:

```yaml
deposit-reason: "Sale of x%amount% %item% for %price% (Spawner)"
```

## Example Complete Configuration

```yaml
enableDebug: false
enableDebugTime: false
storage: SQLITE
updateInterval: 120000

database-configuration:
  table-prefix: "zspawner_"
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  debug: false
  database: zspawner

items:
  CLASSIC:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Place the spawner on the ground"
  GUI:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Place and access via &7/spawners"
  VIRTUAL:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Virtual spawner"

chunkLimit:
  enable: true
  global: 10
  limits:
    - SKELETON: 20
    - BLAZE: 5

disableSpawnerExplosion:
  GUI: true
  CLASSIC: true
  VIRTUAL: true

dropSpawnerOnExplose:
  GUI: false
  CLASSIC: false
  VIRTUAL: false

ownerCanBreakSpawner: true
breakUpVirtualSpawner: true
give-player-experience: false
```
