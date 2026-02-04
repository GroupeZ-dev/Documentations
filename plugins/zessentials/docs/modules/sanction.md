---
sidebar_position: 14
title: Sanction Module
description: Complete moderation system with bans, mutes, kicks, freezes, and sanction history
---

# Sanction Module

**File:** `modules/sanction/config.yml`

The Sanction module is a full-featured moderation system providing **bans**, **mutes**, **kicks**, **freezes**, and a complete **sanction history** per player. It includes configurable default reasons, protected player lists, and customizable material icons for the sanction history GUI.

:::danger MySQL Required
The Sanction module **requires MySQL storage** to function. It will not work with flat-file or SQLite storage. Make sure your database connection is properly configured before enabling this module.
:::

---

## Source Configuration

```yaml
enable: true
protections:
  - "Maxlego08"
  - "Notch"
kick-default-reason: "You have been kicked"
ban-default-reason: "The ban hammer has spoken"
mute-default-reason: "You have to turn your tongue 7 times before speaking"
unmute-default-reason: "You have the right to talk to us"
unban-default-reason: "The ban hammer gives you the right to return"
date-format: "yyyy-MM-dd HH:mm:ss"
kick-material: IRON_INGOT
ban-material: DIAMOND
mute-material: EMERALD
unban-material: IRON_INGOT
unmute-material: COPPER_INGOT
warn-material: COAL
freeze-material: ICE
current-mute-material: EMERALD_BLOCK
current-ban-material: DIAMOND_BLOCK
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Sanction module |
| `protections` | List of Strings | `["Maxlego08", "Notch"]` | List of player names that cannot be sanctioned. Any ban, mute, kick, or freeze attempt against these players will be denied |
| `date-format` | String | `yyyy-MM-dd HH:mm:ss` | The date format used for displaying sanction timestamps. Follows Java `SimpleDateFormat` patterns |

### Default Reasons

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `kick-default-reason` | String | `You have been kicked` | Default reason applied when a player is kicked without specifying a reason |
| `ban-default-reason` | String | `The ban hammer has spoken` | Default reason applied when a player is banned without specifying a reason |
| `mute-default-reason` | String | `You have to turn your tongue 7 times before speaking` | Default reason applied when a player is muted without specifying a reason |
| `unmute-default-reason` | String | `You have the right to talk to us` | Default reason recorded when a player is unmuted without specifying a reason |
| `unban-default-reason` | String | `The ban hammer gives you the right to return` | Default reason recorded when a player is unbanned without specifying a reason |

### Material Icons

These materials are used as item icons in the sanction history GUI inventory to visually distinguish different sanction types.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `kick-material` | Material | `IRON_INGOT` | Item material representing kick entries in the sanction history |
| `ban-material` | Material | `DIAMOND` | Item material representing ban entries in the sanction history |
| `mute-material` | Material | `EMERALD` | Item material representing mute entries in the sanction history |
| `unban-material` | Material | `IRON_INGOT` | Item material representing unban entries in the sanction history |
| `unmute-material` | Material | `COPPER_INGOT` | Item material representing unmute entries in the sanction history |
| `warn-material` | Material | `COAL` | Item material representing warn entries in the sanction history |
| `freeze-material` | Material | `ICE` | Item material representing freeze entries in the sanction history |
| `current-mute-material` | Material | `EMERALD_BLOCK` | Item material representing an active (current) mute in the sanction history |
| `current-ban-material` | Material | `DIAMOND_BLOCK` | Item material representing an active (current) ban in the sanction history |

:::tip
The block variants (`EMERALD_BLOCK`, `DIAMOND_BLOCK`) are used for **active** sanctions, making it easy for moderators to visually distinguish between past and current bans/mutes in the history GUI.
:::

---

## How It Works

1. A moderator issues a sanction command (e.g., `/ban`, `/mute`, `/kick`, `/freeze`).
2. The plugin checks if the target player is in the `protections` list. If so, the action is denied.
3. The sanction is applied to the target player and stored in the MySQL database with a timestamp, reason, and issuer.
4. If no reason is provided, the corresponding default reason is used.
5. Moderators can review a player's full sanction history using the `/sanction` command, which opens a GUI with material-coded entries.

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/ban` | | `essentials.ban` | Ban a player from the server |
| `/unban` | | `essentials.unban` | Unban a previously banned player |
| `/mute` | | `essentials.mute` | Mute a player, preventing them from chatting |
| `/unmute` | | `essentials.unmute` | Unmute a previously muted player |
| `/kick` | | `essentials.kick` | Kick a player from the server |
| `/kickall` | | `essentials.kickall` | Kick all players from the server |
| `/freeze` | | `essentials.freeze` | Freeze a player, preventing them from moving |
| `/sanction` | `sc` | `essentials.sanction` | View the sanction history for a player |
| `/seen` | `whois` | `essentials.seen` | View player information and last login |
| `/seenip` | `whoisip` | `essentials.seenip` | Look up players by IP address |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_is_mute%` | Returns `true` if the player is currently muted |
| `%zessentials_user_mute_seconds%` | Returns the remaining mute duration in seconds |
| `%zessentials_user_mute_formatted%` | Returns the remaining mute duration in a human-readable format |
| `%zessentials_user_target_is_ban%` | Returns `true` if the target player is currently banned |
| `%zessentials_user_target_is_mute%` | Returns `true` if the target player is currently muted |

For the full placeholder list, see [Placeholders](../placeholders).

:::warning
The `%zessentials_user_target_is_ban%` and `%zessentials_user_target_is_mute%` placeholders operate on a **target** player context, not the requesting player. They are typically used in sanction-related GUIs or commands where a moderator is inspecting another player.
:::

---

## Protected Players

The `protections` list prevents specific players from being sanctioned by any moderator, including those with full permissions. This is useful for protecting server owners or system accounts from accidental or malicious sanctions.

```yaml
protections:
  - "Maxlego08"
  - "Notch"
```

:::note
Protection is matched by **player name** (case-sensitive). Make sure the names in the list exactly match the in-game names of the players you want to protect.
:::
