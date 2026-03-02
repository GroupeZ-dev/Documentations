---
sidebar_position: 3
title: Commands & Permissions
description: zDrawer commands and permissions
---

# Commands & Permissions

## Commands

Base command: `/zdrawer` (alias: `/drawer`)

### General Commands

| Command | Description | Permission |
|---------|-------------|------------|
| `/zdrawer` | Show help | `zdrawer.use` |
| `/zdrawer version` | Show plugin version | `zdrawer.use` |
| `/zdrawer reload` | Reload configuration | `zdrawer.reload` |

### Give Commands

| Command | Description | Permission |
|---------|-------------|------------|
| `/zdrawer give` | Show give commands | `zdrawer.give` |
| `/zdrawer give drawer <name> <player> [upgrade] [material] [amount]` | Give a drawer | `zdrawer.give.drawer` |
| `/zdrawer give craft <name> <player>` | Give a craft item | `zdrawer.give.craft` |

### Management Commands

| Command | Description | Permission |
|---------|-------------|------------|
| `/zdrawer place <name> <world> <x> <y> <z> <face> [upgrade] [material] [amount]` | Place a drawer | `zdrawer.place` |
| `/zdrawer purge <world> <break>` | Remove all drawers in world | `zdrawer.purge` |
| `/zdrawer clear` | Remove orphaned display entities | `zdrawer.clear` |
| `/zdrawer convert <type>` | Convert storage type | `zdrawer.convert` |
| `/zdrawer debug` | Debug drawer in current chunk | `zdrawer.debug` |

## Command Details

### Give Drawer

```
/zdrawer give drawer <name> <player> [upgrade] [material] [amount]
```

| Parameter | Description | Required |
|-----------|-------------|----------|
| `name` | Drawer configuration name (e.g., `single`, `duo`) | Yes |
| `player` | Target player | Yes |
| `upgrade` | Upgrade name or `none` | No |
| `material` | Pre-fill material | No |
| `amount` | Pre-fill amount | No |

**Examples:**

```bash
# Give empty single drawer
/zdrawer give drawer single Steve

# Give duo drawer with wood upgrade
/zdrawer give drawer duo Steve woodUpgrade

# Give pre-filled drawer
/zdrawer give drawer single Steve none DIAMOND 1000
```

### Give Craft

```
/zdrawer give craft <name> <player>
```

Give a custom craft result item to a player.

**Example:**

```bash
/zdrawer give craft upgradeDisplay Steve
```

### Place Drawer

```
/zdrawer place <name> <world> <x> <y> <z> <face> [upgrade] [material] [amount]
```

| Parameter | Description |
|-----------|-------------|
| `name` | Drawer configuration name |
| `world` | World name |
| `x`, `y`, `z` | Coordinates |
| `face` | Block face (NORTH, SOUTH, EAST, WEST, UP, DOWN) |
| `upgrade` | Optional upgrade name |
| `material` | Optional pre-fill material |
| `amount` | Optional pre-fill amount |

**Example:**

```bash
/zdrawer place single world 100 64 200 NORTH
```

### Purge World

```
/zdrawer purge <world> <break>
```

| Parameter | Description |
|-----------|-------------|
| `world` | World name to purge |
| `break` | `true` to break blocks, `false` to keep them |

**Example:**

```bash
/zdrawer purge world_nether true
```

### Clear Entities

```
/zdrawer clear
```

Removes all orphaned display entities created by zDrawer. Useful after server crashes that may leave duplicate entities.

### Convert Storage

```
/zdrawer convert <type>
```

| Type | Description |
|------|-------------|
| `JSON` | Convert to JSON file storage |
| `SQLITE` | Convert to SQLite database |
| `MYSQL` | Convert to MySQL database |

## Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zdrawer.use` | Access base command | true |
| `zdrawer.reload` | Reload configuration | op |
| `zdrawer.give` | Access give commands | op |
| `zdrawer.give.drawer` | Give drawers | op |
| `zdrawer.give.craft` | Give craft items | op |
| `zdrawer.place` | Place drawers via command | op |
| `zdrawer.purge` | Purge drawers from world | op |
| `zdrawer.clear` | Clear orphaned entities | op |
| `zdrawer.convert` | Convert storage type | op |
| `zdrawer.debug` | Debug commands | op |

## Permission Examples

### LuckPerms

```bash
# Allow player to use give commands
lp user Steve permission set zdrawer.give.drawer true
lp user Steve permission set zdrawer.give.craft true

# Allow group to reload
lp group admin permission set zdrawer.reload true
```
