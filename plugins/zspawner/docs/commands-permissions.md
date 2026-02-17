---
sidebar_position: 3
title: Commands & Permissions
description: Complete list of all commands and permissions for zSpawner
---

# Commands & Permissions

This page contains the complete list of all commands and permissions available in zSpawner.

:::info Syntax Guide
- `< >` indicates a **required** argument.
- `[ ]` indicates an **optional** argument.
- `|` separates multiple aliases for the same command.
:::

---

## Main Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/zspawner` | `spawner`, `sp`, `spawners` | `zspawner.use` | Open the spawner GUI |
| `/zspawner reload` | - | `zspawner.reload` | Reload configuration files |
| `/zspawner help` | - | `zspawner.help` | Display help information |

---

## Spawner Management Commands

Commands for giving, adding, and removing spawners.

| Command | Permission | Description |
|---------|------------|-------------|
| `/zspawner give <type> <entity> <player> [silent]` | `zspawner.give` | Give a spawner item to a player |
| `/zspawner add <entity> <player> [silent]` | `zspawner.add` | Add a GUI spawner directly to a player |
| `/zspawner remove <player> <spawner_key> [silent]` | `zspawner.remove` | Remove a GUI spawner from a player |
| `/zspawner show [player] [page]` | `zspawner.show` | Display all spawners of a player |

### Give Command Details

The `/zspawner give` command accepts the following spawner types:

| Type | Description |
|------|-------------|
| `CLASSIC` | Traditional spawner that works like vanilla |
| `GUI` | Spawner managed through the `/zspawner` interface |
| `VIRTUAL` | Advanced spawner with auto-kill, auto-sell, and more |

**Examples:**
```
/zspawner give classic zombie Maxlego08
/zspawner give gui skeleton Maxlego08 true
/zspawner give virtual blaze Maxlego08
```

---

## Option Commands

Commands for managing spawner options and upgrades.

| Command | Permission | Description |
|---------|------------|-------------|
| `/zspawner option <player> <spawner_key> <option> <value>` | `zspawner.option` | Set a virtual spawner option |
| `/zspawner giveoption <player> <option>` | `zspawner.give.option` | Give an upgrade item to a player |

### Available Options

The following options can be modified with the `/zspawner option` command:

| Option | Type | Description |
|--------|------|-------------|
| `DISTANCE` | Double | Spawn distance from the spawner |
| `EXPERIENCE_MULTIPLIER` | Double | Experience gain multiplier |
| `LOOT_MULTIPLIER` | Double | Loot drop multiplier |
| `AUTO_KILL` | Boolean | Enable/disable auto-kill |
| `AUTO_SELL` | Boolean | Enable/disable auto-sell |
| `DROP_LOOTS` | Boolean | Enable/disable loot drops |
| `MAX_ENTITY` | Integer | Maximum entities from this spawner |
| `MIN_DELAY` | Integer | Minimum spawn delay (ms) |
| `MAX_DELAY` | Integer | Maximum spawn delay (ms) |
| `MIN_SPAWN` | Integer | Minimum entities per spawn |
| `MAX_SPAWN` | Integer | Maximum entities per spawn |
| `MOB_PER_MINUTE` | Integer | Maximum mobs spawned per minute |
| `REMAINING` | Integer | Remaining entities to spawn |

**Examples:**
```
/zspawner option Maxlego08 zombie_1 AUTO_KILL true
/zspawner option Maxlego08 skeleton_2 MIN_DELAY 5000
/zspawner option Maxlego08 blaze_1 LOOT_MULTIPLIER 2.0
```

---

## Location Commands

Commands for managing spawner location rentals.

| Command | Permission | Description |
|---------|------------|-------------|
| `/zspawner location` | `zspawner.location.admin` | Location management parent command |
| `/zspawner location set <player> <spawner_key> <minutes>` | `zspawner.location.admin` | Set location rental for a spawner |
| `/zspawner location add <player> <spawner_key> <minutes>` | `zspawner.location.admin` | Add time to a location rental |
| `/zspawner location remove <player> <spawner_key> <minutes>` | `zspawner.location.admin` | Remove time from a location rental |
| `/zspawner location info <player> <spawner_key>` | `zspawner.location.admin` | Show location rental information |
| `/zspawner location clear <player> <spawner_key>` | `zspawner.location.admin` | Clear a location rental |

**Examples:**
```
/zspawner location set Maxlego08 zombie_1 60
/zspawner location add Maxlego08 zombie_1 30
/zspawner location info Maxlego08 zombie_1
/zspawner location clear Maxlego08 zombie_1
```

---

## All Permissions

### Player Permissions

| Permission | Description |
|------------|-------------|
| `zspawner.use` | Access the spawner GUI (`/zspawner`) |
| `zspawner.help` | View help commands |

### Admin Permissions

| Permission | Description |
|------------|-------------|
| `zspawner.reload` | Reload configuration files |
| `zspawner.give` | Give spawners to players |
| `zspawner.give.option` | Give upgrade items to players |
| `zspawner.add` | Add GUI spawners to players |
| `zspawner.remove` | Remove spawners from players |
| `zspawner.option` | Modify virtual spawner options |
| `zspawner.show` | View all spawners of any player |
| `zspawner.location.admin` | Manage location rentals |

### Bypass Permissions

| Permission | Description |
|------------|-------------|
| `zspawner.bypass` | Bypass spawner access restrictions (can open virtual spawners) |

---

## Command Examples

### Setting up a Virtual Spawner

```bash
# Give a virtual spawner to a player
/zspawner give virtual zombie Maxlego08

# After the player places it, configure options
/zspawner option Maxlego08 zombie_1 AUTO_KILL true
/zspawner option Maxlego08 zombie_1 LOOT_MULTIPLIER 1.5
/zspawner option Maxlego08 zombie_1 MIN_DELAY 8000
```

### Managing Location Rentals

```bash
# Set up a 2-hour rental
/zspawner location set Maxlego08 zombie_1 120

# Check rental status
/zspawner location info Maxlego08 zombie_1

# Extend the rental by 30 minutes
/zspawner location add Maxlego08 zombie_1 30

# Cancel the rental
/zspawner location clear Maxlego08 zombie_1
```

### Bulk Spawner Distribution

```bash
# Give spawners silently (no messages to players)
/zspawner give gui skeleton Player1 true
/zspawner give gui skeleton Player2 true
/zspawner give gui skeleton Player3 true
```
