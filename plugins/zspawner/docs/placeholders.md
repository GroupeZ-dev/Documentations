---
sidebar_position: 4
title: Placeholders
description: PlaceholderAPI placeholders available in zSpawner
---

# Placeholders

zSpawner provides several placeholders through PlaceholderAPI for displaying spawner information in scoreboards, holograms, and other plugins.

## Requirements

To use these placeholders, you need [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed on your server.

## Available Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zspawner_sort%` | Current sort type (enum name) |
| `%zspawner_sort_name%` | Current sort type display name |
| `%zspawner_gui_spawners%` | Number of GUI spawners owned by the player |
| `%zspawner_virtual_spawners%` | Number of Virtual spawners owned by the player |
| `%zspawner_classic_spawners%` | Number of Classic spawners owned by the player |
| `%zspawner_material_<ENTITY>%` | Material associated with an entity type |
| `%zspawner_is_drop_loot%` | Whether the current virtual spawner drops loot |

## Placeholder Details

### Sort Placeholders

Players can sort their spawners in the GUI. These placeholders show the current sorting preference:

```
%zspawner_sort%      -> PLACE / NO_PLACE
%zspawner_sort_name% -> spawners placed / spawners not placed
```

### Spawner Count Placeholders

Count the number of spawners owned by the player, categorized by type:

```
%zspawner_gui_spawners%     -> 5
%zspawner_virtual_spawners% -> 3
%zspawner_classic_spawners% -> 10
```

### Material Placeholder

Get the material (spawn egg) associated with an entity type. Useful for creating dynamic displays:

```
%zspawner_material_ZOMBIE%   -> ZOMBIE_SPAWN_EGG
%zspawner_material_SKELETON% -> SKELETON_SPAWN_EGG
%zspawner_material_BLAZE%    -> BLAZE_SPAWN_EGG
```

### Drop Loot Placeholder

Check if the current virtual spawner is set to drop loot:

```
%zspawner_is_drop_loot% -> true / false
```

## Usage Examples

### Scoreboard

Display spawner statistics on a player's scoreboard:

```yaml
lines:
  - "&6&lSpawners"
  - "&7GUI: &f%zspawner_gui_spawners%"
  - "&7Virtual: &f%zspawner_virtual_spawners%"
  - "&7Classic: &f%zspawner_classic_spawners%"
```

### Hologram

Show total spawner counts above a spawner area:

```yaml
lines:
  - "&6Your Spawners"
  - "&eGUI: &f%zspawner_gui_spawners%"
  - "&eVirtual: &f%zspawner_virtual_spawners%"
```

### Menu Item Lore

Use in zMenu to display spawner information:

```yaml
lore:
  - "&7You own &e%zspawner_gui_spawners% &7GUI spawners"
  - "&7You own &e%zspawner_virtual_spawners% &7Virtual spawners"
  - ""
  - "&7Sorting by: &f%zspawner_sort_name%"
```

## Internal Placeholders

zSpawner also uses internal placeholders within its own configuration files. These are automatically replaced in spawner items and messages:

| Placeholder | Description |
|-------------|-------------|
| `%type%` | Entity type name |
| `%entity%` | Entity display name |
| `%amount%` | Stack amount |
| `%spawnerKey%` | Unique spawner identifier |
| `%target%` | Target player name |
| `%player%` | Player name |
| `%world%` | World name |
| `%x%`, `%y%`, `%z%` | Coordinates |
| `%limit%` | Spawner limit |
| `%second%` | Seconds (for teleportation) |
| `%time%` | Formatted time remaining |
| `%price%` | Price value |
| `%minutes%` | Minutes value |
| `%renter%` | Renter player name |
| `%owner%` | Owner player name |
| `%status%` | Rental status |
| `%enabled%` | Feature enabled status |
| `%min%` | Minimum value |
| `%max%` | Maximum value |
| `%name%` | Option name |
| `%value%` | Option value |

These internal placeholders are used in `config.yml`, `messages.yml`, and inventory files.
