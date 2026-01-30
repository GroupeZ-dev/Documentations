---
sidebar_position: 5
title: Commands & Permissions
description: All commands and permissions available in zQuests
---

# Commands & Permissions

This page lists all commands and permissions available in zQuests.

## Command Aliases

The main command `/zquests` has the following default aliases configured in `config.yml`:

- `/quests`
- `/quest`
- `/q`

You can customize these in `config.yml`:

```yaml
main-command-aliases:
  - quests
  - quest
  - q
```

## Commands

### Player Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/zquests` | `zquests.use` | Open the quest inventory |

### Admin Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/zquests help` | `zquests.help` | Display help message |
| `/zquests reload` | `zquests.reload` | Reload configuration files |
| `/zquests reload-inventories` | `zquests.reload` | Reload only inventory files |

### Quest Management

| Command | Permission | Description |
|---------|------------|-------------|
| `/zquests start <player> <quest>` | `zquests.start` | Start a quest for a player |
| `/zquests start-all <player>` | `zquests.start.all` | Start all quests for a player |
| `/zquests complete <player> <quest>` | `zquests.complete` | Complete a quest for a player |
| `/zquests complete-all <player> <group>` | `zquests.complete.all` | Complete all quests in a group |
| `/zquests restart <player> <quest>` | `zquests.restart` | Restart a quest for a player |
| `/zquests delete <player> <quest>` | `zquests.delete` | Delete a quest for a player |
| `/zquests delete-all <player>` | `zquests.delete.all` | Delete all quests for a player |

### Progress Management

| Command | Permission | Description |
|---------|------------|-------------|
| `/zquests set-progress <player> <quest> <amount>` | `zquests.set.progress` | Set quest progress |
| `/zquests add-progress <player> <quest> <amount>` | `zquests.add.progress` | Add to quest progress |
| `/zquests progress-inventory <player> [citizen]` | `zquests.progress.inventory` | Progress INVENTORY_CONTENT quests |

### Favorite Management

| Command | Permission | Description |
|---------|------------|-------------|
| `/zquests set-favorite <player> <quest> <true/false>` | `zquests.set.favorite` | Set quest favorite status |
| `/zquests add-favorite <player>` | `zquests.add.favorite` | Add to favorite limit |
| `/zquests set-favorite-limit <player> <amount>` | `zquests.set.favorite.limit` | Set favorite limit |
| `/zquests set-favorite-type <player> <type>` | `zquests.set.favorite.type` | Set favorite type |

### Rewards

| Command | Permission | Description |
|---------|------------|-------------|
| `/zquests reward <player> <quest>` | `zquests.reward` | Give quest rewards manually |

### Hologram

| Command | Permission | Description |
|---------|------------|-------------|
| `/zquests refresh-hologram` | `zquests.refresh.hologram` | Refresh all holograms |

### Debug

| Command | Permission | Description |
|---------|------------|-------------|
| `/zquests show <player> <quest>` | `zquests.show` | Show quest details |

## Command Examples

### Starting Quests

```bash
# Start a specific quest for a player
/zquests start Notch stone-breaker-1

# Start all auto-accept quests for a player
/zquests start-all Notch
```

### Managing Progress

```bash
# Set exact progress value
/zquests set-progress Notch stone-breaker-1 250

# Add progress (useful for VOTE quests)
/zquests add-progress Notch daily-vote 1

# Progress inventory content quest
/zquests progress-inventory Notch lumberjack
```

### Completing Quests

```bash
# Complete a quest for a player
/zquests complete Notch stone-breaker-1

# Complete all quests in the "mining" group
/zquests complete-all Notch mining
```

### Resetting Quests

```bash
# Restart a quest (keeps history, resets progress)
/zquests restart Notch stone-breaker-1

# Delete a quest completely
/zquests delete Notch stone-breaker-1

# Delete all quests for a player
/zquests delete-all Notch
```

### Managing Favorites

```bash
# Set a quest as favorite
/zquests set-favorite Notch stone-breaker-1 true

# Remove from favorites
/zquests set-favorite Notch stone-breaker-1 false

# Set favorite limit
/zquests set-favorite-limit Notch 5
```

## Permission List

### Basic Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zquests.use` | Access quest commands | `true` |
| `zquests.help` | View help message | `true` |

### Admin Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zquests.reload` | Reload configuration | `op` |
| `zquests.start` | Start quests for others | `op` |
| `zquests.start.all` | Start all quests | `op` |
| `zquests.complete` | Complete quests for others | `op` |
| `zquests.complete.all` | Complete quest groups | `op` |
| `zquests.delete` | Delete player quests | `op` |
| `zquests.delete.all` | Delete all player quests | `op` |
| `zquests.restart` | Restart player quests | `op` |
| `zquests.set.progress` | Set quest progress | `op` |
| `zquests.add.progress` | Add quest progress | `op` |
| `zquests.set.favorite` | Set favorite status | `op` |
| `zquests.add.favorite` | Add favorite limit | `op` |
| `zquests.set.favorite.limit` | Set favorite limit | `op` |
| `zquests.set.favorite.type` | Set favorite type | `op` |
| `zquests.reward` | Give quest rewards | `op` |
| `zquests.show` | View quest details | `op` |
| `zquests.progress.inventory` | Progress inventory quests | `op` |
| `zquests.refresh.hologram` | Refresh holograms | `op` |

## Permission-Based Inventory Pages

You can configure different starting pages based on permissions in `config.yml`:

```yaml
# Permission that the player must have to change the page with the main command
main-command-page:
  - permission: "quests.page.2"
    inventory: "quests"
    page: 2
    priority: 1
  - permission: "quests.page.3"
    inventory: "quests"
    page: 3
    priority: 2
```

Players with `quests.page.3` will open page 3 of the quest inventory when using `/quests`.

## Tab Completion

All commands support tab completion:
- Player names are auto-completed
- Quest names are auto-completed from loaded quests
- Group names are auto-completed for relevant commands

## Console Usage

All admin commands can be used from console:

```bash
# From console
zquests start Notch stone-breaker-1
zquests add-progress Notch daily-vote 1
zquests complete Notch tutorial-quest
```

## Integration with Other Plugins

### Vote Plugins

Add progress to vote quests when players vote:

```bash
# In your vote plugin reward
/zquests add-progress %player% vote-quest 1
```

### Citizens NPCs

Trigger quest progress on NPC interaction:

```bash
# Citizens click command
/zquests progress-inventory %player% npc_name
```

### Custom Scripts

Use commands in scripts or command blocks:

```bash
# Give quest progress for custom events
execute as @p run zquests add-progress @p custom-quest 1
```

## Next Steps

- Configure [Inventories](./inventories) for quest display
- Set up [Waypoints & Holograms](./waypoints-holograms)
- Learn about [Placeholders](./placeholders)
