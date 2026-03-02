---
sidebar_position: 3
title: Commands & Permissions
description: Complete list of zKoth commands and permissions
---

# Commands & Permissions

Complete reference for all zKoth commands and their associated permissions.

## Main Command

### /zkoth

Display the list of available commands.

```
/zkoth
```

**Permission:** `zkoth.use`

---

## Management Commands

### /zkoth reload

Reload all configuration files.

```
/zkoth reload
```

**Permission:** `zkoth.reload`

---

### /zkoth version

Display the plugin version.

```
/zkoth version
```

**Permission:** None

---

### /zkoth list

Display all configured KOTHs.

```
/zkoth list
```

**Permission:** `zkoth.list`

---

## Creation Commands

### /zkoth axe

Get the selection axe for defining KOTH zones.

```
/zkoth axe
```

**Permission:** `zkoth.axe`

**Usage:**
1. Get the golden axe with this command
2. Left-click on the first corner block
3. Right-click on the opposite corner block

---

### /zkoth create

Create a new KOTH with the selected zone.

```
/zkoth create <name> [type] [capture_time]
```

**Arguments:**

| Argument | Required | Default | Description |
|----------|----------|---------|-------------|
| `name` | Yes | - | Unique name for the KOTH |
| `type` | No | `CAPTURE` | KOTH type: `CAPTURE` or `SCORE` |
| `capture_time` | No | `30` | Seconds to capture or points to win |

**Permission:** `zkoth.create`

**Examples:**
```bash
# Create a capture KOTH with 30 second capture time
/zkoth create castle CAPTURE 30

# Create a capture KOTH (default settings)
/zkoth create fortress

# Create a score KOTH where first to 100 points wins
/zkoth create arena SCORE 100
```

---

### /zkoth delete

Delete a KOTH permanently.

```
/zkoth delete <name>
```

**Permission:** `zkoth.delete`

**Example:**
```
/zkoth delete castle
```

---

### /zkoth move

Move a KOTH to a new location using your current selection.

```
/zkoth move <name>
```

**Permission:** `zkoth.move`

**Usage:**
1. Select a new zone with the selection axe
2. Run `/zkoth move <name>`

---

## Control Commands

### /zkoth spawn

Spawn a KOTH with the configured cooldown.

```
/zkoth spawn <name>
```

**Permission:** `zkoth.spawn`

The KOTH will enter COOLDOWN status and start after `cooldownStart` seconds.

---

### /zkoth now

Spawn a KOTH immediately without cooldown.

```
/zkoth now <name>
```

**Permission:** `zkoth.now`

The KOTH will immediately enter START status.

---

### /zkoth stop

Stop an active KOTH.

```
/zkoth stop <name>
```

**Permission:** `zkoth.stop`

---

## Configuration Commands

### /zkoth loot

Open the loot configuration GUI for a KOTH.

```
/zkoth loot <name> [page]
```

**Arguments:**

| Argument | Required | Default | Description |
|----------|----------|---------|-------------|
| `name` | Yes | - | KOTH name |
| `page` | No | `1` | Inventory page number |

**Permission:** `zkoth.loot`

**Usage:**
1. Open the loot GUI
2. Place items you want as rewards
3. Close the inventory to save

---

### /zkoth addcommand

Add a command to execute on KOTH start or win.

```
/zkoth addcommand <name> <type> <command>
```

**Arguments:**

| Argument | Required | Values | Description |
|----------|----------|--------|-------------|
| `name` | Yes | - | KOTH name |
| `type` | Yes | `start`, `win` | When to execute |
| `command` | Yes | - | Command to run (without `/`) |

**Permission:** `zkoth.command.add`

**Examples:**
```bash
# Broadcast when KOTH starts
/zkoth addcommand castle start bc &6Castle KOTH has started!

# Give winner a reward
/zkoth addcommand castle win give %playerName% diamond 10
```

---

## Permission Reference

### Player Permissions

| Permission | Description |
|------------|-------------|
| `zkoth.use` | Access `/zkoth` command |
| `zkoth.capture` | Capture KOTH zones (if enabled in config) |

### Admin Permissions

| Permission | Description |
|------------|-------------|
| `zkoth.reload` | Reload configuration |
| `zkoth.axe` | Get selection axe |
| `zkoth.create` | Create new KOTHs |
| `zkoth.delete` | Delete KOTHs |
| `zkoth.move` | Move KOTH zones |
| `zkoth.spawn` | Spawn KOTHs with cooldown |
| `zkoth.now` | Spawn KOTHs immediately |
| `zkoth.stop` | Stop active KOTHs |
| `zkoth.list` | List all KOTHs |
| `zkoth.loot` | Configure KOTH loot |
| `zkoth.command.add` | Add commands to KOTHs |

### Wildcard Permissions

```yaml
# Give all zKoth permissions
zkoth.*

# Example LuckPerms setup
/lp group admin permission set zkoth.* true
```

---

## Command Placeholders

When using `/zkoth addcommand`, these placeholders are available:

| Placeholder | Description |
|-------------|-------------|
| `%playerName%` | Winner's player name |
| `%teamName%` | Winner's team name |
| `%teamId%` | Winner's team ID |
| `%teamLeader%` | Winner's team leader |
| `%name%` | KOTH name |
| `%world%` | KOTH world |
| `%centerX%` | KOTH center X coordinate |
| `%centerY%` | KOTH center Y coordinate |
| `%centerZ%` | KOTH center Z coordinate |
| `%captureSeconds%` | Capture time (CAPTURE type) |
| `%captureFormat%` | Formatted capture time |
| `%online-player%` | All online players in team |

---

## Examples

### Create and Start a KOTH

```bash
# Get the selection axe
/zkoth axe

# Select corners (left-click, right-click)

# Create the KOTH
/zkoth create warzone CAPTURE 60

# Start immediately
/zkoth now warzone
```

### Configure Loot and Commands

```bash
# Open loot GUI and add items
/zkoth loot warzone

# Add start broadcast
/zkoth addcommand warzone start bc &c&lWARZONE KOTH is now active!

# Add winner reward
/zkoth addcommand warzone win eco give %playerName% 5000
/zkoth addcommand warzone win give %playerName% diamond_block 5
```

### Set Up Permissions (LuckPerms)

```bash
# Admin permissions
/lp group admin permission set zkoth.* true

# Staff can control KOTHs
/lp group mod permission set zkoth.spawn true
/lp group mod permission set zkoth.stop true
/lp group mod permission set zkoth.now true

# All players can participate
/lp group default permission set zkoth.capture true
```
