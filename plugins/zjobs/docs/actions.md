---
sidebar_position: 4
title: Actions & Rewards
description: Configure job actions and rewards in zJobs
---

# Actions & Rewards

This guide explains how to configure job actions and their rewards in zJobs.

## Action Types

zJobs supports various action types that trigger rewards:

| Action | Description |
|--------|-------------|
| `break` | Breaking blocks |
| `place` | Placing blocks |
| `kill` | Killing entities |
| `fish` | Fishing items |
| `craft` | Crafting items |
| `smelt` | Smelting items |
| `breed` | Breeding animals |
| `enchant` | Enchanting items |
| `repair` | Repairing items |
| `brew` | Brewing potions |
| `shear` | Shearing sheep |
| `tame` | Taming animals |
| `milk` | Milking cows |

## Basic Action Structure

```yaml
actions:
  break:  # Action type
    STONE:  # Target (material, entity, etc.)
      money: 1.0        # Money reward
      xp: 5             # Minecraft XP
      job-xp: 2         # Job experience
```

## Reward Types

### Money

Currency reward (requires Vault economy):

```yaml
DIAMOND_ORE:
  money: 50.0
```

### Experience (XP)

Minecraft experience points:

```yaml
DIAMOND_ORE:
  xp: 50
```

### Job XP

Experience towards job level:

```yaml
DIAMOND_ORE:
  job-xp: 15
```

### Items

Item rewards:

```yaml
DIAMOND_ORE:
  money: 50.0
  items:
    - material: DIAMOND
      amount: 1
      chance: 10  # 10% chance
```

### Commands

Execute commands:

```yaml
ENDER_DRAGON:
  money: 5000.0
  commands:
    - "broadcast &e%player% &7slayed the &5Ender Dragon&7!"
    - "give %player% diamond 64"
```

## Action Examples

### Break Action

Rewards for breaking blocks:

```yaml
actions:
  break:
    # Ores
    COAL_ORE:
      money: 5.0
      xp: 5
      job-xp: 2
    DEEPSLATE_COAL_ORE:
      money: 6.0
      xp: 6
      job-xp: 3

    # Logs (using tags)
    "#minecraft:logs":
      money: 1.0
      job-xp: 1

    # Crops
    WHEAT:
      money: 2.0
      job-xp: 2
      conditions:
        - type: block_age
          value: 7
```

### Place Action

Rewards for placing blocks:

```yaml
actions:
  place:
    STONE:
      money: 0.5
      job-xp: 1
    COBBLESTONE:
      money: 0.5
      job-xp: 1
    OAK_PLANKS:
      money: 1.0
      job-xp: 2
```

### Kill Action

Rewards for killing entities:

```yaml
actions:
  kill:
    # Hostile mobs
    ZOMBIE:
      money: 5.0
      xp: 5
      job-xp: 2
    SKELETON:
      money: 7.0
      xp: 7
      job-xp: 3
    CREEPER:
      money: 10.0
      xp: 10
      job-xp: 5

    # Bosses
    WITHER:
      money: 3000.0
      xp: 3000
      job-xp: 300
      commands:
        - "broadcast &c%player% &7defeated the &5Wither&7!"

    # Players (if PvP rewards enabled)
    PLAYER:
      money: 100.0
      job-xp: 50
```

### Fish Action

Rewards for fishing:

```yaml
actions:
  fish:
    COD:
      money: 5.0
      job-xp: 3
    SALMON:
      money: 7.0
      job-xp: 4
    TROPICAL_FISH:
      money: 15.0
      job-xp: 8
    PUFFERFISH:
      money: 20.0
      job-xp: 10

    # Treasure
    NAME_TAG:
      money: 50.0
      job-xp: 25
    SADDLE:
      money: 40.0
      job-xp: 20
    ENCHANTED_BOOK:
      money: 100.0
      job-xp: 50
```

### Craft Action

Rewards for crafting:

```yaml
actions:
  craft:
    DIAMOND_SWORD:
      money: 25.0
      job-xp: 15
    DIAMOND_PICKAXE:
      money: 30.0
      job-xp: 18
    ENCHANTING_TABLE:
      money: 100.0
      job-xp: 50
    BEACON:
      money: 500.0
      job-xp: 200
```

### Smelt Action

Rewards for smelting:

```yaml
actions:
  smelt:
    IRON_INGOT:
      money: 3.0
      job-xp: 2
    GOLD_INGOT:
      money: 5.0
      job-xp: 3
    COOKED_BEEF:
      money: 2.0
      job-xp: 1
    GLASS:
      money: 1.0
      job-xp: 1
```

### Breed Action

Rewards for breeding animals:

```yaml
actions:
  breed:
    COW:
      money: 10.0
      job-xp: 5
    PIG:
      money: 10.0
      job-xp: 5
    SHEEP:
      money: 8.0
      job-xp: 4
    CHICKEN:
      money: 5.0
      job-xp: 3
    HORSE:
      money: 25.0
      job-xp: 12
    VILLAGER:
      money: 50.0
      job-xp: 25
```

### Enchant Action

Rewards for enchanting:

```yaml
actions:
  enchant:
    SHARPNESS:
      money: 20.0
      job-xp: 10
    EFFICIENCY:
      money: 15.0
      job-xp: 8
    FORTUNE:
      money: 30.0
      job-xp: 15
    MENDING:
      money: 50.0
      job-xp: 25
```

## Conditions

Add conditions to actions for more control:

### Block Age

Only reward mature crops:

```yaml
WHEAT:
  money: 2.0
  conditions:
    - type: block_age
      value: 7
```

### Permission

Require permission for bonus rewards:

```yaml
DIAMOND_ORE:
  money: 50.0
  conditions:
    - type: permission
      value: "zjobs.bonus.mining"
      # Reward multiplied by 1.5 if player has permission
      multiplier: 1.5
```

### World

Only in specific worlds:

```yaml
ANCIENT_DEBRIS:
  money: 200.0
  conditions:
    - type: world
      value: "world_nether"
```

### Tool

Require specific tool:

```yaml
DIAMOND_ORE:
  money: 50.0
  conditions:
    - type: tool
      value: "DIAMOND_PICKAXE"
```

### Time

Only during certain times:

```yaml
PHANTOM:
  money: 20.0
  conditions:
    - type: time
      min: 13000  # Night time
      max: 23000
```

## Block Tags

Use Minecraft block tags for multiple blocks:

```yaml
actions:
  break:
    "#minecraft:logs":
      money: 1.0
      job-xp: 1
    "#minecraft:planks":
      money: 0.5
      job-xp: 1
    "#minecraft:wool":
      money: 1.0
      job-xp: 1
    "#minecraft:ores":
      money: 5.0
      job-xp: 3
```

## Random Rewards

Add chance-based bonus rewards:

```yaml
DIAMOND_ORE:
  money: 50.0
  job-xp: 15
  bonus:
    chance: 5  # 5% chance
    money: 100.0
    items:
      - material: DIAMOND
        amount: 1
    commands:
      - "msg %player% &aBonus diamond found!"
```

## Multipliers

### Level Multiplier

Increase rewards based on job level:

```yaml
# In job configuration
income-multiplier: 0.02  # +2% per level

# At level 50: rewards are 100% higher (2x)
```

### Tool Multipliers

Configure bonus for specific tools:

```yaml
# In action configuration
DIAMOND_ORE:
  money: 50.0
  tool-multipliers:
    NETHERITE_PICKAXE: 1.5  # 50% more with netherite
    DIAMOND_PICKAXE: 1.2    # 20% more with diamond
```

### Time Multipliers

Bonus during certain periods:

```yaml
# Global config
time-multipliers:
  weekend:
    enabled: true
    multiplier: 1.5
    days:
      - SATURDAY
      - SUNDAY
  happy-hour:
    enabled: true
    multiplier: 2.0
    start-hour: 18
    end-hour: 20
```

## Anti-Abuse

### Block Tracking

Prevent placing and breaking the same blocks:

```yaml
# In config.yml
anti-abuse:
  block-tracking: true
  track-duration: 3600  # 1 hour
```

### Spawn Protection

No rewards near mob spawners:

```yaml
anti-abuse:
  spawner-protection:
    enabled: true
    radius: 10
```

### AFK Detection

Reduce rewards for AFK players:

```yaml
anti-abuse:
  afk-detection:
    enabled: true
    timeout: 300  # 5 minutes
    multiplier: 0  # No rewards when AFK
```

## zItems Integration

Use zItems runes to boost job rewards:

### Job Money Boost Rune

```yaml
# On zItems item
runes:
  - job_money_boost
```

Players holding items with this rune earn bonus money.

### Job XP Boost Rune

```yaml
# On zItems item
runes:
  - job_xp_boost
```

Players holding items with this rune earn bonus job XP.

## Next Steps

- [Commands & Permissions](commands-permissions) - Full command reference
- [Job Configuration](jobs) - Create custom jobs
