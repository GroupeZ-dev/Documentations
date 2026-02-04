---
sidebar_position: 6
title: Hologram Module
description: Text, item, and block display holograms with damage indicators
---

# Hologram Module

**File:** `modules/hologram/config.yml`

The Hologram module allows you to create text, item, and block display holograms in the world. It also provides a damage indicator feature that shows floating damage numbers above entities when they take damage. Holograms support PlaceholderAPI, auto-update tasks, and are fully managed via in-game commands with over 25 subcommands.

---

## Configuration

```yaml
enable: true

# Automatic update task for holograms containing placeholders
auto-update-task:
  enable: false
  milliseconds: 1000

# Damage indicator - floating damage numbers above entities
damage-indicator:
  enabled: false
  players: true
  mobs: true
  animals: true
  waterMobs: true
  duration: 40
  appearance: '<#ed2626>%damage%'
  criticalAppearance: '<#ed2626><bold>\u1d04\u0280\u026a\u1d1b<#bf0b0b> %damage%'
  height: 1.0
  offsetX: 0.5
  offsetY: 0.5
  offsetZ: 0.5
  decimalFormat: "#.#"
  disabledEntities:
    - WITHER
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Hologram module |

### Auto-Update Task

The auto-update task periodically refreshes all holograms that contain PlaceholderAPI placeholders.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `auto-update-task.enable` | Boolean | `false` | Enable or disable automatic hologram placeholder updates |
| `auto-update-task.milliseconds` | Integer | `1000` | Interval in milliseconds between each hologram refresh cycle |

:::tip
Only enable the auto-update task if your holograms contain dynamic placeholders (e.g., player counts, baltop data). Static holograms do not need this feature and leaving it disabled saves server resources.
:::

### Damage Indicator

The damage indicator displays floating damage numbers above entities when they receive damage. Regular hits and critical hits can have separate appearances.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `damage-indicator.enabled` | Boolean | `false` | Enable or disable floating damage indicators |
| `damage-indicator.players` | Boolean | `true` | Show damage indicators when players take damage |
| `damage-indicator.mobs` | Boolean | `true` | Show damage indicators when hostile mobs take damage |
| `damage-indicator.animals` | Boolean | `true` | Show damage indicators when passive animals take damage |
| `damage-indicator.waterMobs` | Boolean | `true` | Show damage indicators when water mobs take damage |
| `damage-indicator.duration` | Integer | `40` | Duration in ticks that the damage number remains visible. `40` ticks = 2 seconds |
| `damage-indicator.appearance` | String | `<#ed2626>%damage%` | MiniMessage format for normal damage numbers. Use `%damage%` for the damage value |
| `damage-indicator.criticalAppearance` | String | *(see above)* | MiniMessage format for critical hit damage numbers. Use `%damage%` for the damage value |
| `damage-indicator.height` | Double | `1.0` | Base height above the entity where the damage number spawns |
| `damage-indicator.offsetX` | Double | `0.5` | Maximum random horizontal offset on the X axis. Adds visual variety to damage number placement |
| `damage-indicator.offsetY` | Double | `0.5` | Maximum random vertical offset on the Y axis |
| `damage-indicator.offsetZ` | Double | `0.5` | Maximum random horizontal offset on the Z axis |
| `damage-indicator.decimalFormat` | String | `#.#` | Java DecimalFormat pattern for the damage value. `#.#` shows one decimal place |
| `damage-indicator.disabledEntities` | List of Strings | `[WITHER]` | List of entity types that will not display damage indicators |

:::warning
Enabling damage indicators on a server with many entities and players can increase packet traffic. Consider disabling indicators for non-essential entity types (animals, water mobs) on high-population servers.
:::

---

## Related Commands

All hologram management is done through the `/hologram` command and its subcommands.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/hologram` | `holo`, `ho` | `essentials.hologram` | Manage holograms |

### Hologram Subcommands

| Subcommand | Description |
|------------|-------------|
| `create` | Create a new hologram at your current location |
| `delete` | Delete an existing hologram |
| `addline` | Add a new text line to a hologram |
| `setline` | Set the content of a specific line |
| `removeline` | Remove a line from a hologram |
| `insertbeforeline` | Insert a new line before a specific line number |
| `insertafterline` | Insert a new line after a specific line number |
| `scale` | Set the scale (size) of a hologram on x, y, z axes |
| `translation` | Set the translation offset of a hologram |
| `movehere` | Move a hologram to your current location |
| `moveto` | Move a hologram to specific x, y, z coordinates |
| `billboard` | Set the billboard mode (`CENTER`, `FIXED`, `HORIZONTAL`, `VERTICAL`) |
| `textalignment` | Set text alignment (`CENTER`, `LEFT`, `RIGHT`) |
| `yaw` | Set the yaw (horizontal) rotation |
| `pitch` | Set the pitch (vertical) rotation |
| `background` | Set the background color (ARGB hex format) |
| `list` | List all holograms on the server |
| `teleport` | Teleport to a hologram's location |
| `seethrough` | Toggle whether the hologram text is visible through blocks |
| `textshadow` | Toggle text shadow rendering |
| `shadowstrength` | Set the shadow strength (0.0 to 1.0) |
| `shadowradius` | Set the shadow radius |
| `viewdistance` | Set the maximum view distance in blocks |
| `item` | Set a hologram line to display an item |
| `block` | Set a hologram line to display a block |

---

## Related Permissions

| Permission | Description |
|------------|-------------|
| `essentials.hologram` | Grants access to all `/hologram` subcommands |

---

## Usage Examples

### Creating a Hologram

```
/hologram create myhologram
/hologram addline myhologram &6&lWelcome to the Server!
/hologram addline myhologram &7Use /help for commands
```

### Displaying an Item

```
/hologram create itemdisplay
/hologram item itemdisplay DIAMOND_SWORD
/hologram addline itemdisplay &bLegendary Sword
```

### Damage Indicator with Custom Appearance

To display damage numbers with a heart symbol:

```yaml
damage-indicator:
  enabled: true
  appearance: '<#ed2626>-%damage% \u2764'
  criticalAppearance: '<#ed2626><bold>CRIT</bold> <#bf0b0b>-%damage% \u2764'
```

:::info
Holograms are persistent and survive server restarts. All hologram data is stored in the plugin's data files and loaded automatically when the server starts.
:::
