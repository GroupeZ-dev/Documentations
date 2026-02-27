---
sidebar_position: 3
title: Commands & Permissions
description: zItems commands and permissions reference
---

# Commands & Permissions

Complete reference for all zItems commands and permissions.

## Commands Overview

| Command | Description | Permission |
|---------|-------------|------------|
| `/zitems` | Main plugin command | `zitems.command.admin` |
| `/zitems give` | Give custom items | `zitems.command.admin` |
| `/zitems giveeffect` | Give effect items | `zitems.command.admin` |
| `/zitems applyeffect` | Apply effect to held item | `zitems.command.admin` |
| `/zitems vieweffect` | View effects on held item | `zitems.command.admin` |
| `/zitems gui` | Open item browser GUI | `zitems.command.admin` |
| `/zitems reload` | Reload configuration | `zitems.command.admin` |

**Aliases:** `/zit`, `/zitem`

---

## /zitems give

Gives a custom item to a player.

```
/zitems give <item> [player] [amount]
```

| Argument | Required | Description |
|----------|----------|-------------|
| `item` | Yes | The item ID from your items folder |
| `player` | No | Target player (defaults to yourself) |
| `amount` | No | Number of items (defaults to 1) |

**Examples:**
```bash
# Give yourself a legendary sword
/zitems give legendary_sword

# Give a player 5 vein pickaxes
/zitems give vein_pickaxe Steve 5

# Give yourself 64 of an item
/zitems give magic_apple _ 64
```

**Tab Completion:** All configured item IDs are available for auto-completion.

---

## /zitems giveeffect

Gives the physical representation of an effect (if configured) to a player.

```
/zitems giveeffect <effect> [player] [amount]
```

| Argument | Required | Description |
|----------|----------|-------------|
| `effect` | Yes | The effect ID |
| `player` | No | Target player (defaults to yourself) |
| `amount` | No | Number of items (defaults to 1) |

**Examples:**
```bash
# Give yourself a vein mining rune
/zitems giveeffect vein_mining_rune

# Give a player a hammer rune
/zitems giveeffect hammer_rune Steve
```

:::note Effect Representation Required
This command only works for effects that have a `representation` configured in their settings.
:::

---

## /zitems applyeffect

Applies an effect to the item you're currently holding.

```
/zitems applyeffect <effect>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `effect` | Yes | The effect ID to apply |

**Examples:**
```bash
# Apply vein mining to held pickaxe
/zitems applyeffect vein_mining

# Apply auto-sell to held item
/zitems applyeffect auto_sell
```

**Requirements:**
- Must be holding an item
- Effect must be compatible with the item's material
- Item must allow additional effects (`allow-additional-effects: true`)
- Effect cannot be incompatible with existing effects

---

## /zitems vieweffect

Shows all effects currently applied to the item you're holding.

```
/zitems vieweffect
```

**Output Example:**
```
Effects on this item:
- VEIN_MINING (block-limit: 32)
- MELT_MINING
- XP_BOOST (boost: 2.0)
```

---

## /zitems gui

Opens a GUI browser showing all configured items.

```
/zitems gui
```

The GUI allows you to:
- Browse all items
- Click to give yourself items
- View item properties

---

## /zitems reload

Reloads all plugin configuration files.

```
/zitems reload
```

This reloads:
- `config.yml` - Main configuration
- All files in `items/` - Item definitions
- All files in `effects/` - Effect definitions

:::warning Reload Limitations
Some changes may require a server restart:
- Custom recipes may not update immediately
- Custom block data may require restart
:::

---

## Permissions

### Admin Permission

| Permission | Description |
|------------|-------------|
| `zitems.command.admin` | Access to all zItems commands |

### Granular Permissions

You can create granular permissions for specific items and effects:

| Permission Pattern | Description |
|-------------------|-------------|
| `zitems.use.<item_id>` | Permission to use a specific item |
| `zitems.effect.<effect_id>` | Permission to use a specific effect |

---

## Permission Examples

### LuckPerms Configuration

**Allow staff to manage items:**
```bash
# Give moderators full access
/lp group moderator permission set zitems.command.admin true

# Or give specific permissions
/lp group moderator permission set zitems.give true
/lp group moderator permission set zitems.reload true
```

**Restrict items to VIP players:**
```bash
# Allow VIPs to use legendary items
/lp group vip permission set zitems.use.legendary_sword true
/lp group vip permission set zitems.use.vein_pickaxe true

# Allow default players to use basic items
/lp group default permission set zitems.use.basic_pickaxe true
```

**Control effect access:**
```bash
# Allow VIPs to use powerful effects
/lp group vip permission set zitems.effect.vein_mining true
/lp group vip permission set zitems.effect.auto_sell true

# Allow everyone basic effects
/lp group default permission set zitems.effect.xp_boost true
```

### PermissionsEx Configuration

```yaml
groups:
  vip:
    permissions:
      - zitems.use.legendary_sword
      - zitems.use.vein_pickaxe
      - zitems.effect.vein_mining

  moderator:
    permissions:
      - zitems.command.admin

  default:
    permissions:
      - zitems.use.basic_pickaxe
      - zitems.effect.xp_boost
```

---

## Command Tab Completion

All commands support tab completion:

- **Item IDs**: All configured items are suggested
- **Effect IDs**: All configured effects are suggested
- **Player names**: Online players are suggested

---

## Error Messages

Common error messages and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| `Item not found` | Invalid item ID | Check item file name and ID |
| `Effect not found` | Invalid effect ID | Check effect configuration |
| `Cannot apply effect` | Material incompatibility | Check effect's `applicable-materials` |
| `Effect already applied` | Duplicate effect | Remove existing effect first |
| `Incompatible effect` | Effect conflict | Cannot combine certain effects |

---

## Console Commands

All commands can be run from console with player specification:

```bash
# From console
zitems give legendary_sword Steve 1
zitems giveeffect vein_mining_rune Steve
zitems reload
```

---

## PlaceholderAPI Integration

If PlaceholderAPI is installed, these placeholders are available:

| Placeholder | Description |
|-------------|-------------|
| `%zitems_effects_count%` | Number of effects on held item |
| `%zitems_has_effect_<id>%` | Returns true/false if item has effect |

**Example usage in item lore:**
```yaml
lore:
  - "<gray>Effects: %zitems_effects_count%</gray>"
```
