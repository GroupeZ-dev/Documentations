---
sidebar_position: 3
title: Stackable Spawners
description: Configuration of Stackable Spawners in zSpawner
---

# Stackable Spawners

Stackable Spawners allow multiple spawners of the same entity type to be combined into a single block, increasing spawn rates and efficiency.

## How Stackable Spawners Work

1. Place a spawner on the ground
2. Place another spawner of the **same entity type** on top
3. The spawners merge into a stack
4. Spawn rates increase based on stack amount
5. A hologram displays the current stack count

## Configuration

### Enable Stackable Spawners

```yaml
stackableSpawner:
  enable: false  # Set to true to enable
```

### Global Limit

Maximum stack amount for all entity types:

```yaml
stackableSpawner:
  globalLimit: 5
```

### Per-Entity Limits

Set specific limits for different entity types:

```yaml
stackableSpawner:
  limits:
    - SKELETON: 10
    - ZOMBIE: 8
    - BLAZE: 5
```

### Entity Blacklist

Prevent certain entities from being stacked:

```yaml
stackableSpawner:
  blacklist:
    - BLAZE
    - WITHER_SKELETON
```

### Entity Whitelist

If specified, only these entities can be stacked (empty = all allowed):

```yaml
stackableSpawner:
  whitelist: []  # Empty means all entities allowed
  # Or specify specific entities:
  # whitelist:
  #   - ZOMBIE
  #   - SKELETON
```

### Hologram Display

Configure the hologram shown above stacked spawners:

```yaml
stackableSpawner:
  hologram: '&6x%amount% &f%entity%'
```

| Placeholder | Description |
|-------------|-------------|
| `%amount%` | Current stack amount |
| `%entity%` | Entity type name |

## Stack Levels

Configure spawn behavior for each stack level:

```yaml
stackableSpawner:
  levels:
    - stackAmount: 1
      delay: 200
      minSpawnDelay: 100
      maxSpawnDelay: 400
      spawnCount: 5
      maxNearbyEntities: 10
      requiredPlayerRange: 16
      spawnRange: 8

    - stackAmount: 2
      delay: 200
      minSpawnDelay: 100
      maxSpawnDelay: 400
      spawnCount: 6
      maxNearbyEntities: 10
      requiredPlayerRange: 16
      spawnRange: 8

    # ... continue for higher stack amounts
```

### Level Options

| Option | Description |
|--------|-------------|
| `stackAmount` | Stack level this configuration applies to |
| `delay` | Base delay between spawns (ticks) |
| `minSpawnDelay` | Minimum random delay (ticks) |
| `maxSpawnDelay` | Maximum random delay (ticks) |
| `spawnCount` | Number of entities per spawn |
| `maxNearbyEntities` | Maximum entities before spawner pauses |
| `requiredPlayerRange` | Required player distance for spawning |
| `spawnRange` | Radius where entities can spawn |

## Example Configuration

### Basic Setup

```yaml
stackableSpawner:
  enable: true
  globalLimit: 5
  hologram: '&6x%amount% &f%entity%'

  limits:
    - SKELETON: 10
    - BLAZE: 3

  blacklist:
    - ENDER_DRAGON
    - WITHER

  whitelist: []

  levels:
    - stackAmount: 1
      delay: 200
      minSpawnDelay: 100
      maxSpawnDelay: 400
      spawnCount: 4
      maxNearbyEntities: 10
      requiredPlayerRange: 16
      spawnRange: 8

    - stackAmount: 2
      delay: 180
      minSpawnDelay: 90
      maxSpawnDelay: 360
      spawnCount: 6
      maxNearbyEntities: 12
      requiredPlayerRange: 18
      spawnRange: 8

    - stackAmount: 3
      delay: 160
      minSpawnDelay: 80
      maxSpawnDelay: 320
      spawnCount: 8
      maxNearbyEntities: 14
      requiredPlayerRange: 20
      spawnRange: 10

    - stackAmount: 4
      delay: 140
      minSpawnDelay: 70
      maxSpawnDelay: 280
      spawnCount: 10
      maxNearbyEntities: 16
      requiredPlayerRange: 22
      spawnRange: 10

    - stackAmount: 5
      delay: 120
      minSpawnDelay: 60
      maxSpawnDelay: 240
      spawnCount: 12
      maxNearbyEntities: 18
      requiredPlayerRange: 24
      spawnRange: 12
```

### Aggressive Stacking

For servers that want faster spawning with stacks:

```yaml
stackableSpawner:
  enable: true
  globalLimit: 10

  levels:
    - stackAmount: 1
      delay: 100
      minSpawnDelay: 50
      maxSpawnDelay: 200
      spawnCount: 6
      maxNearbyEntities: 15
      requiredPlayerRange: 20
      spawnRange: 10

    - stackAmount: 5
      delay: 80
      minSpawnDelay: 40
      maxSpawnDelay: 160
      spawnCount: 15
      maxNearbyEntities: 30
      requiredPlayerRange: 24
      spawnRange: 12

    - stackAmount: 10
      delay: 60
      minSpawnDelay: 30
      maxSpawnDelay: 120
      spawnCount: 25
      maxNearbyEntities: 50
      requiredPlayerRange: 28
      spawnRange: 14
```

### Conservative Stacking

For servers that want controlled spawning:

```yaml
stackableSpawner:
  enable: true
  globalLimit: 3

  levels:
    - stackAmount: 1
      delay: 300
      minSpawnDelay: 200
      maxSpawnDelay: 600
      spawnCount: 3
      maxNearbyEntities: 6
      requiredPlayerRange: 12
      spawnRange: 6

    - stackAmount: 2
      delay: 250
      minSpawnDelay: 180
      maxSpawnDelay: 500
      spawnCount: 4
      maxNearbyEntities: 8
      requiredPlayerRange: 14
      spawnRange: 7

    - stackAmount: 3
      delay: 200
      minSpawnDelay: 150
      maxSpawnDelay: 400
      spawnCount: 5
      maxNearbyEntities: 10
      requiredPlayerRange: 16
      spawnRange: 8
```

## Tips

### Balancing Spawner Stacks

- **Lower `globalLimit`** reduces potential lag from too many entities
- **Higher `maxNearbyEntities`** allows more mobs but may impact performance
- **Increase `requiredPlayerRange`** to spread players across spawners

### Performance Considerations

- Each stack level should have reasonable `spawnCount` values
- Consider server TPS when setting `minSpawnDelay` and `maxSpawnDelay`
- Use `blacklist` to prevent stacking of resource-intensive mobs

### Economy Balance

- Premium spawners (higher stack limits) can be sold in shops
- Per-entity limits allow different pricing tiers
- Stack amount directly affects farm efficiency
