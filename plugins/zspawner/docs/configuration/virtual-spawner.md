---
sidebar_position: 2
title: Virtual Spawners
description: Configuration and usage of Virtual Spawners in zSpawner
---

# Virtual Spawners

Virtual Spawners are the most advanced spawner type in zSpawner. They offer extensive customization including auto-kill, auto-sell, custom drop rates, and location rental.

## How Virtual Spawners Work

Unlike traditional spawners, Virtual Spawners:

1. **Spawn entities in a controlled area** - Entities spawn within a configurable distance
2. **Can auto-kill entities** - Automatically kill spawned mobs
3. **Can auto-sell drops** - Sell items directly (requires zShop)
4. **Store items internally** - Collected items are stored in the spawner inventory
5. **Support location rental** - Allow other players to use your spawner temporarily

## Configuration

### Basic Settings

```yaml
virtual:
  # Material used for the virtual spawner block
  material: LODESTONE

  # Name displayed above the spawner block
  name: "&6x%amount%"

  defaultSpawnerOption:
    distance: 6              # Spawn distance from center
    experienceMultiplier: 1  # Experience multiplier
    lootMultiplier: 1        # Loot drop multiplier
    autoKill: false          # Auto-kill spawned entities
    autoSell: false          # Auto-sell dropped items
    mobPerMinute: 0          # Max mobs per minute (0 = unlimited)
    maxEntity: 1000          # Maximum total entities
    minDelay: 10000          # Min spawn delay (ms)
    maxDelay: 15000          # Max spawn delay (ms)
    minSpawn: 1              # Min entities per spawn
    maxSpawn: 2              # Max entities per spawn
    remaining: 1000000       # Remaining spawns
    locationEnabled: false   # Enable location rental
    location:
      enabled: false
      minTime: 10            # Min rental time (minutes)
      maxTime: 120           # Max rental time (minutes)
      price: 5000            # Price per minute
```

### Option Details

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `distance` | Double | 6 | Radius from spawner where entities can spawn |
| `experienceMultiplier` | Double | 1 | Multiplier for experience drops |
| `lootMultiplier` | Double | 1 | Multiplier for loot drops |
| `autoKill` | Boolean | false | Automatically kill spawned entities |
| `autoSell` | Boolean | false | Automatically sell items (requires zShop) |
| `mobPerMinute` | Integer | 0 | Maximum mobs spawned per minute (0 = no limit) |
| `maxEntity` | Integer | 1000 | Maximum entities before spawner stops |
| `minDelay` | Integer | 10000 | Minimum delay between spawns (milliseconds) |
| `maxDelay` | Integer | 15000 | Maximum delay between spawns (milliseconds) |
| `minSpawn` | Integer | 1 | Minimum entities spawned at once |
| `maxSpawn` | Integer | 2 | Maximum entities spawned at once |
| `remaining` | Integer | 1000000 | Total remaining spawns before depletion |
| `locationEnabled` | Boolean | false | Enable location rental feature |

## Custom Drops

Define custom drops for specific entity types:

```yaml
custom-virtual-drops:
  - entity: MAGMA_CUBE
    cancel-default-drop: true
    drops:
      - chance: 100
        min: 1
        max: 3
        item:
          material: MAGMA_CREAM

  - entity: BLAZE
    cancel-default-drop: false
    drops:
      - chance: 50
        min: 1
        max: 2
        item:
          material: BLAZE_ROD
      - chance: 10
        min: 1
        max: 1
        item:
          material: GLOWSTONE_DUST
```

| Option | Description |
|--------|-------------|
| `entity` | Entity type for this drop configuration |
| `cancel-default-drop` | If true, prevents vanilla drops |
| `drops` | List of custom drop entries |
| `chance` | Percentage chance (0-100) for this drop |
| `min` | Minimum item quantity |
| `max` | Maximum item quantity |
| `item` | Item configuration (supports zMenu format) |

## Location Rental

Allow players to rent spawner locations from owners.

### Enable Location Rental

```yaml
spawner-location:
  enable: true
  minPrice: 1000    # Minimum price per minute
  maxPrice: 10000   # Maximum price per minute
```

### Per-Spawner Location Settings

In the virtual spawner defaults:

```yaml
defaultSpawnerOption:
  locationEnabled: false  # Enable for this spawner
  location:
    enabled: false
    minTime: 10           # Minimum rental (minutes)
    maxTime: 120          # Maximum rental (minutes)
    price: 5000           # Price per minute
```

### Admin Commands

Manage location rentals via commands:

```bash
# Set rental for a spawner
/zspawner location set <player> <spawner_key> <minutes>

# Add time to existing rental
/zspawner location add <player> <spawner_key> <minutes>

# Remove time from rental
/zspawner location remove <player> <spawner_key> <minutes>

# View rental information
/zspawner location info <player> <spawner_key>

# Clear/cancel rental
/zspawner location clear <player> <spawner_key>
```

## Upgrade Items

Players can apply upgrade items to their virtual spawners. Configure these in `option-items.yml`:

```yaml
items:
  MIN_DELAY:
    type: MIN_DELAY
    value: 10             # Amount to modify
    max-value: 5000       # Minimum value limit
    item:
      material: SUNFLOWER
      name: "#e5fa25Spawner Option&8: #fa9325Min Delay"
      lore:
        - ""
        - "#92bed8Information&8:"
        - "#8c8c8c• &7Reduces minimum spawn delay by &f10ms"
        - ""
        - "&7&oRight-click on your spawner"
        - "&7&oto apply this upgrade"

  MAX_DELAY:
    type: MAX_DELAY
    value: 10
    max-value: 8000
    item:
      material: SUNFLOWER
      name: "#e5fa25Spawner Option&8: #fa9325Max Delay"
      lore:
        - ""
        - "#92bed8Information&8:"
        - "#8c8c8c• &7Reduces maximum spawn delay by &f10ms"
```

### Available Upgrade Types

| Type | Effect |
|------|--------|
| `MIN_DELAY` | Reduces minimum spawn delay |
| `MAX_DELAY` | Reduces maximum spawn delay |
| `DISTANCE` | Modifies spawn distance |
| `EXPERIENCE_MULTIPLIER` | Increases experience multiplier |
| `LOOT_MULTIPLIER` | Increases loot multiplier |
| `MAX_ENTITY` | Increases maximum entity limit |
| `MIN_SPAWN` | Increases minimum spawn count |
| `MAX_SPAWN` | Increases maximum spawn count |
| `MOB_PER_MINUTE` | Modifies mobs per minute limit |
| `REMAINING` | Adds remaining spawns |

### Give Upgrade Items

```bash
/zspawner giveoption <player> MIN_DELAY
/zspawner giveoption <player> MAX_DELAY
```

## Integration with zShop

When zShop is installed, the auto-sell feature becomes available:

1. Enable auto-sell in spawner options
2. Items are automatically sold at zShop prices
3. Money is deposited directly to the player

```yaml
# Deposit message format
deposit-reason: "Sale of x%amount% %item% for %price% (Spawner)"
```

## Integration with zEssentials

When zEssentials is installed:

- Items are sent to player's mailbox when inventory is full
- Useful for offline collection

## Integration with SuperiorSkyblock2

When SuperiorSkyblock2 is installed:

- Island team members can access each other's spawners
- Respects island permissions
- Tracks spawner ownership per island

## Tips and Best Practices

### Performance Optimization

```yaml
defaultSpawnerOption:
  mobPerMinute: 60        # Limit spawn rate
  maxEntity: 100          # Lower maximum entities
  minDelay: 15000         # Increase minimum delay
  maxDelay: 30000         # Increase maximum delay
```

### Balanced Economy Setup

```yaml
defaultSpawnerOption:
  lootMultiplier: 1       # Standard loot
  experienceMultiplier: 1 # Standard XP
  autoSell: false         # Require manual selling
```

### Premium Spawner Setup

```yaml
defaultSpawnerOption:
  lootMultiplier: 2.0
  experienceMultiplier: 1.5
  autoKill: true
  autoSell: true
  minDelay: 5000
  maxDelay: 10000
  maxSpawn: 4
```
