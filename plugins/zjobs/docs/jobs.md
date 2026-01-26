---
sidebar_position: 3
title: Job Configuration
description: How to create and configure jobs in zJobs
---

# Job Configuration

This guide explains how to create and configure custom jobs in zJobs.

## File Structure

Jobs are stored in `plugins/zJobs/jobs/`. Each YAML file represents one job:

```
plugins/zJobs/jobs/
├── miner.yml
├── farmer.yml
├── hunter.yml
├── fisherman.yml
├── builder.yml
└── enchanter.yml
```

## Basic Job Structure

```yaml
# Unique job identifier (filename without .yml)
name: "miner"

# Display name with color codes
display-name: "&6&lMiner"

# Job description
description:
  - "&7Mine ores and stones"
  - "&7to earn money and XP!"

# Maximum job level
max-level: 100

# Icon for GUI menus
icon:
  material: DIAMOND_PICKAXE
  name: "&6&lMiner"
  lore:
    - "&7Mine blocks to earn rewards"
    - ""
    - "&7Level: &e%job_level%"
    - "&7XP: &e%job_xp%/%job_xp_required%"

# Job actions (see Actions documentation)
actions:
  break:
    STONE:
      money: 1.0
      job-xp: 1
```

## Configuration Options

### name

The internal job identifier. Should match the filename.

```yaml
name: "miner"
```

---

### display-name

The display name shown to players.

```yaml
display-name: "&6&lMiner"
```

Supports:
- Color codes (`&6`, `&#FF5500`)
- MiniMessage format
- Placeholders

---

### description

Description lines shown in menus and info commands.

```yaml
description:
  - "&7Mine ores and stones"
  - "&7to earn money and XP!"
  - ""
  - "&eJoin this job to get started!"
```

---

### max-level

Maximum level players can reach in this job.

```yaml
max-level: 100
```

---

### icon

Item displayed in GUI menus:

```yaml
icon:
  material: DIAMOND_PICKAXE
  name: "&6&lMiner Job"
  lore:
    - "&7Current Level: &e%job_level%"
    - "&7Total Earnings: &a$%job_total_money%"
  glow: true
```

---

### level-formula

Formula for calculating XP required per level:

```yaml
# XP required = base * (level ^ multiplier)
level-formula:
  base: 100
  multiplier: 1.5
```

Example progression:
- Level 1 → 2: 100 XP
- Level 2 → 3: 283 XP
- Level 10 → 11: 3,162 XP

---

### level-rewards

Rewards given when reaching certain levels:

```yaml
level-rewards:
  5:
    money: 500
    commands:
      - "broadcast &e%player% &7reached level &65 &7in &6Miner&7!"
  10:
    money: 2000
    items:
      - material: DIAMOND_PICKAXE
        amount: 1
        enchantments:
          efficiency: 3
  25:
    money: 10000
    commands:
      - "lp user %player% permission set jobs.miner.bonus true"
```

---

### income-multiplier

Level-based income scaling:

```yaml
# Each level increases income by this percentage
income-multiplier: 0.02  # 2% per level
```

At level 50 with `0.02` multiplier:
- Base reward: $10
- Bonus: 50 * 2% = 100%
- Final reward: $20

---

### required-permission

Permission required to join this job:

```yaml
required-permission: "zjobs.job.miner"
```

---

### max-players

Limit how many players can have this job:

```yaml
max-players: 100  # 0 = unlimited
```

---

## Complete Examples

### Miner Job

```yaml
name: "miner"
display-name: "&6&lMiner"

description:
  - "&7Extract valuable ores from"
  - "&7the depths of the earth!"
  - ""
  - "&7&lRewards:"
  - "&8▸ &fMoney from ores"
  - "&8▸ &fBonus XP at deep levels"

max-level: 100
income-multiplier: 0.02

icon:
  material: DIAMOND_PICKAXE
  name: "&6&lMiner"
  lore:
    - "&7Level: &e%job_level%"
    - "&7XP: &e%job_xp%&7/&e%job_xp_required%"
    - ""
    - "&7Total Earned: &a$%job_total_money%"

level-formula:
  base: 100
  multiplier: 1.5

level-rewards:
  10:
    money: 1000
    commands:
      - "msg %player% &aCongratulations on reaching Miner level 10!"
  25:
    money: 5000
    items:
      - material: IRON_PICKAXE
        enchantments:
          efficiency: 5
          unbreaking: 3
  50:
    money: 25000
    items:
      - material: DIAMOND_PICKAXE
        enchantments:
          efficiency: 5
          fortune: 3
          unbreaking: 3
          mending: 1
  100:
    money: 100000
    commands:
      - "broadcast &6%player% &ehas mastered the &6Miner &ejob!"

actions:
  break:
    STONE:
      money: 0.5
      job-xp: 1
    COAL_ORE:
      money: 5.0
      xp: 5
      job-xp: 3
    DEEPSLATE_COAL_ORE:
      money: 6.0
      xp: 6
      job-xp: 4
    IRON_ORE:
      money: 10.0
      xp: 10
      job-xp: 5
    DEEPSLATE_IRON_ORE:
      money: 12.0
      xp: 12
      job-xp: 6
    GOLD_ORE:
      money: 20.0
      xp: 15
      job-xp: 8
    DEEPSLATE_GOLD_ORE:
      money: 24.0
      xp: 18
      job-xp: 10
    DIAMOND_ORE:
      money: 50.0
      xp: 50
      job-xp: 15
    DEEPSLATE_DIAMOND_ORE:
      money: 60.0
      xp: 60
      job-xp: 18
    EMERALD_ORE:
      money: 75.0
      xp: 75
      job-xp: 20
    DEEPSLATE_EMERALD_ORE:
      money: 90.0
      xp: 90
      job-xp: 24
    ANCIENT_DEBRIS:
      money: 200.0
      xp: 200
      job-xp: 50
```

### Farmer Job

```yaml
name: "farmer"
display-name: "&a&lFarmer"

description:
  - "&7Grow and harvest crops"
  - "&7to feed the server!"

max-level: 100
income-multiplier: 0.015

icon:
  material: GOLDEN_HOE
  name: "&a&lFarmer"
  lore:
    - "&7Level: &e%job_level%"
    - "&7XP: &e%job_xp%&7/&e%job_xp_required%"

level-formula:
  base: 80
  multiplier: 1.4

actions:
  break:
    WHEAT:
      money: 2.0
      job-xp: 2
      conditions:
        - type: block_age
          value: 7  # Only mature crops
    CARROTS:
      money: 2.5
      job-xp: 2
      conditions:
        - type: block_age
          value: 7
    POTATOES:
      money: 2.5
      job-xp: 2
      conditions:
        - type: block_age
          value: 7
    BEETROOTS:
      money: 3.0
      job-xp: 3
      conditions:
        - type: block_age
          value: 3
    NETHER_WART:
      money: 5.0
      job-xp: 4
      conditions:
        - type: block_age
          value: 3
    MELON:
      money: 4.0
      job-xp: 3
    PUMPKIN:
      money: 4.0
      job-xp: 3
    SUGAR_CANE:
      money: 1.5
      job-xp: 1
    CACTUS:
      money: 1.5
      job-xp: 1

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
```

### Hunter Job

```yaml
name: "hunter"
display-name: "&c&lHunter"

description:
  - "&7Track and defeat monsters"
  - "&7to protect the realm!"

max-level: 100
income-multiplier: 0.025

icon:
  material: DIAMOND_SWORD
  name: "&c&lHunter"
  lore:
    - "&7Level: &e%job_level%"
    - "&7Kills: &e%job_total_actions%"

level-formula:
  base: 150
  multiplier: 1.6

actions:
  kill:
    ZOMBIE:
      money: 5.0
      xp: 5
      job-xp: 2
    SKELETON:
      money: 7.0
      xp: 7
      job-xp: 3
    SPIDER:
      money: 6.0
      xp: 6
      job-xp: 2
    CREEPER:
      money: 10.0
      xp: 10
      job-xp: 5
    ENDERMAN:
      money: 25.0
      xp: 25
      job-xp: 10
    BLAZE:
      money: 30.0
      xp: 30
      job-xp: 12
    WITHER_SKELETON:
      money: 40.0
      xp: 40
      job-xp: 15
    WITCH:
      money: 20.0
      xp: 20
      job-xp: 8
    PHANTOM:
      money: 15.0
      xp: 15
      job-xp: 6
    WARDEN:
      money: 500.0
      xp: 500
      job-xp: 100
    ENDER_DRAGON:
      money: 5000.0
      xp: 5000
      job-xp: 500
    WITHER:
      money: 3000.0
      xp: 3000
      job-xp: 300
```

## Job Restrictions

### World Restrictions

Limit jobs to specific worlds:

```yaml
worlds:
  whitelist:
    - world
    - world_nether
  # OR
  blacklist:
    - world_creative
```

### Region Restrictions

Limit jobs to specific WorldGuard regions:

```yaml
regions:
  whitelist:
    - mining_area
    - farm_zone
```

## Next Steps

- [Actions & Rewards](actions) - Configure job actions
- [Commands & Permissions](commands-permissions) - Full command reference
