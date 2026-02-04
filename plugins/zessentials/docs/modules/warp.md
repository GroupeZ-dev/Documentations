---
sidebar_position: 21
title: Warp Module
description: Server warp system with optional inventory display
---

# Warp Module

**File:** `modules/warp/config.yml`

The Warp module provides a server-wide warp point system that allows administrators to create named locations and players to teleport to them. Warps can be browsed through a **zMenu inventory** GUI or listed directly in **chat**, depending on your configuration. This module is ideal for creating hub teleport points, event areas, shops, or any frequently visited location on your server.

---

## Source Configuration

```yaml
enable: true
enable-inventory: false
enable-no-argument-message: true
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Warp module |
| `enable-inventory` | Boolean | `false` | When `true`, running `/warps` opens a zMenu inventory GUI (`warps.yml`) displaying all available warps. When `false`, warps are listed in chat instead |
| `enable-no-argument-message` | Boolean | `true` | When `true` and `enable-inventory` is `false`, running `/warp` without arguments sends a chat message listing all available warps |

:::info Display Modes
- **Inventory mode** (`enable-inventory: true`) -- Running `/warps` opens an interactive zMenu inventory defined in `warps.yml`. Players can click warp items to teleport. This provides a rich, visual browsing experience.
- **Chat mode** (`enable-inventory: false`, `enable-no-argument-message: true`) -- Running `/warp` without arguments lists all available warps directly in the player's chat. Players can then use `/warp <name>` to teleport.
:::

:::tip
If you enable inventory mode, make sure the `warps.yml` zMenu inventory file is properly configured. The plugin will attempt to open this inventory when players use the `/warps` command.
:::

:::warning
When both `enable-inventory` and `enable-no-argument-message` are set to `false`, running `/warp` without arguments will produce no output. Ensure at least one display option is enabled so players can discover available warps.
:::

---

## How It Works

1. An administrator creates a warp point at their current location using `/setwarp <name>`.
2. The warp is saved and becomes available to all players with the appropriate permission.
3. Players teleport to a warp using `/warp <name>`.
4. If `enable-inventory` is `true`, players can browse all warps in a GUI by running `/warps`.
5. If `enable-inventory` is `false` and `enable-no-argument-message` is `true`, running `/warp` without arguments lists all warps in chat.
6. Administrators can remove a warp using `/delwarp <name>`.

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/warp` | `w` | `essentials.warp` | Teleport to a named warp point |
| `/setwarp` | `wcreate` | `essentials.warp.set` | Create a new warp at your current location |
| `/delwarp` | `wdelete` | `essentials.warp.del` | Delete an existing warp |
| `/warps` | `wlist` | `essentials.warps` | List all available warps (chat or inventory depending on config) |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Permissions

| Permission | Description |
|------------|-------------|
| `essentials.warp` | Allows teleporting to warp points using `/warp` |
| `essentials.warp.set` | Allows creating new warp points using `/setwarp` |
| `essentials.warp.del` | Allows deleting warp points using `/delwarp` |
| `essentials.warps` | Allows listing all warp points using `/warps` |

---

## Example Usage

### Inventory Mode

Enable the GUI-based warp browser for a user-friendly experience:

```yaml
enable: true
enable-inventory: true
enable-no-argument-message: true
```

Players running `/warps` will see a zMenu inventory with all configured warps. Clicking a warp item teleports the player to that location.

### Chat Mode

Keep things simple with a chat-based warp list:

```yaml
enable: true
enable-inventory: false
enable-no-argument-message: true
```

Players running `/warp` without arguments will receive a chat message listing all available warp names. They can then use `/warp <name>` to teleport.
