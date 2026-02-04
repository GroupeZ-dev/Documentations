---
sidebar_position: 1
title: AFK Module
description: Away From Keyboard detection and kick system
---

# AFK Module

**File:** `modules/afk/config.yml`

The AFK (Away From Keyboard) module automatically detects idle players based on configurable inactivity timers and optionally kicks them after a set duration. It uses a **priority-based permission system**, allowing you to define different AFK thresholds and kick behaviors for different player groups (e.g., default players, VIPs, admins).

---

## Source Configuration

```yaml
enable: true
check-interval: 20 # in ticks
soft-kick: true
soft-kick-message: "<red>You have been kicked for being AFK"
placeholder-afk: "&aV"
placeholder-not-afk: "&cX"
kick-actions:
  - type: message
    messages:
      - "&cYou have been kicked for being AFK"
permissions:
  - priority: 0
    permission: "zessentials.afk.player"
    start-afk-time: 20
    max-afk-time: 60
    kick: true
    message-on-start-afk: "&cYou are now AFK, we have only &f40&c seconds left before being expelled from the server."
    message-on-end-afk: "&aYou are no longer AFK. You have been afk for &f%duration%&a."
  - priority: 1
    permission: "zessentials.afk.vip"
    start-afk-time: 30
    max-afk-time: 120
    message-on-start-afk: "&cYou are now AFK, we have only &f90&c seconds left before being expelled from the server."
    message-on-end-afk: "&aYou are no longer AFK. You have been afk for &f%duration%&a."
    kick: true
  - priority: 2
    permission: "zessentials.afk.admin"
    start-afk-time: 60
    max-afk-time: 300
    kick: true
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the AFK module |
| `check-interval` | Integer | `20` | How often (in ticks) the plugin checks for player inactivity. `20` ticks = 1 second |
| `soft-kick` | Boolean | `true` | If `true`, the player is gently disconnected using a transfer packet instead of a hard kick. Useful for proxied networks |
| `soft-kick-message` | String | `<red>You have been kicked for being AFK` | The MiniMessage-formatted message displayed to the player when they are soft-kicked |
| `placeholder-afk` | String | `&aV` | The text returned by the `%zessentials_user_afk_status%` placeholder when the player **is** AFK |
| `placeholder-not-afk` | String | `&cX` | The text returned by the `%zessentials_user_afk_status%` placeholder when the player **is not** AFK |

### Kick Actions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `kick-actions` | List | *(see above)* | A list of actions performed when a player is kicked for being AFK. Each action has a `type` and associated data |
| `kick-actions[].type` | String | `message` | The type of action. `message` sends messages to the player before they are kicked |
| `kick-actions[].messages` | List of Strings | *(see above)* | Messages sent to the player when the kick action is triggered. Supports color codes |

### Permission Entries

The `permissions` list defines AFK behavior for different player groups. Each entry is checked in **priority order** (lowest number = checked first). The first matching permission determines the player's AFK settings.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `permissions[].priority` | Integer | - | The priority order for this entry. Lower values are checked first |
| `permissions[].permission` | String | - | The permission node the player must have for this entry to apply |
| `permissions[].start-afk-time` | Integer | - | Time in seconds of inactivity before the player is marked as AFK |
| `permissions[].max-afk-time` | Integer | - | Maximum time in seconds a player can remain AFK before being kicked (if `kick` is `true`) |
| `permissions[].kick` | Boolean | - | Whether to kick the player after reaching `max-afk-time` |
| `permissions[].message-on-start-afk` | String | - | Message sent to the player when they enter AFK status. Supports the `%duration%` placeholder |
| `permissions[].message-on-end-afk` | String | - | Message sent to the player when they return from AFK. Supports the `%duration%` placeholder |

:::tip
The `%duration%` placeholder in `message-on-start-afk` and `message-on-end-afk` is replaced with the human-readable time the player spent AFK.
:::

:::info
If a permission entry does not define `message-on-start-afk` or `message-on-end-afk` (like the admin entry above), no message will be sent for that transition. The player will still be tracked and kicked if `kick` is `true`.
:::

:::warning
Ensure that each player matches **at most one** permission entry. If a player has multiple matching permissions, only the first match by priority is used. Assign permissions carefully in your permission plugin to avoid unexpected behavior.
:::

---

## How It Works

1. The plugin checks every `check-interval` ticks whether each online player has moved, rotated their camera, or interacted with the game.
2. Once a player has been idle for `start-afk-time` seconds (from their matched permission entry), they are marked as AFK and receive the `message-on-start-afk` message.
3. If the player remains idle until `max-afk-time` and `kick` is `true`, the configured `kick-actions` are executed and the player is disconnected.
4. When a player moves or interacts, their AFK status is cleared and they receive the `message-on-end-afk` message.

---

## Related Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/afk` | `essentials.afk` | Manually toggle your AFK status |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_is_afk%` | Returns `true` if the player is currently AFK |
| `%zessentials_user_afk_status%` | Returns the configured placeholder text (`placeholder-afk` or `placeholder-not-afk`) based on the player's AFK state |

For the full placeholder list, see [Placeholders](../placeholders).

---

## Example: AFK Status in Tab List

You can use the AFK placeholders to display a visual indicator in your tab list or scoreboard:

```yaml
format: "%zessentials_user_afk_status% &7%player_name%"
```

This would show a green "V" next to online players and a red "X" next to AFK players (using the default placeholder values).
