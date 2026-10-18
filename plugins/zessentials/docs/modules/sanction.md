---
title: Sanction Module
description: Complete moderation system with bans, mutes, kicks, freezes, and sanction history
---

# Sanction Module

**File:** `modules/sanction/config.yml`

The Sanction module is a full-featured moderation system providing **bans**, **mutes**, **kicks**, **freezes**, a complete **sanction history** per player, and the `/seen` and `/seenip` lookup commands. It includes configurable default reasons, a protected player list, display options for `/seen`, and customizable material icons for the sanction history GUI.

<CalloutContainer type="error">

<CalloutTitle>SQL Storage Required</CalloutTitle>

<CalloutDescription>
The Sanction module **requires a SQL storage** (`MYSQL`, `MARIADB`, `HIKARICP` or `SQLITE`). Sanctions, `/seen` and `/seenip` are not implemented for the `JSON` storage. A MySQL/MariaDB database is recommended for production servers.
</CalloutDescription>

</CalloutContainer>

---

## Source Configuration

```yaml
enable: true

# List of nicknames that cannot be sanctioned, even if they do not have permission.
protections:
  - "Maxlego08"
  - "Notch"

# Default reason for /kick
kick-default-reason: "You have been kicked"

# Default reason for /mute
ban-default-reason: "The ban hammer has spoken"

# Default reason for /ban
mute-default-reason: "You have to turn your tongue 7 times before speaking"

# Default reason for /unmute
unmute-default-reason: "You have the right to talk to us"

# Default reason for /unban
unban-default-reason: "The ban hammer gives you the right to return"

# Date format used for sanctions
date-format: "yyyy-MM-dd HH:mm:ss"

# Settings of the /seen command.
# Each line can be disabled globally here, even for operators.
# The permissions below are still required when the option is enabled.

# Show the UUID of the player
seen-show-uuid: true

# Show the IP addresses used by the player
# Requires the permission essentials.seen.show.ip
# Set this to false if you never want the IP to be displayed, even to an operator
seen-show-ip: true

# Show the last known location of the player
# Requires the permission essentials.seen.show.last.location
seen-show-last-location: true

# Show the date of the first connection of the player
# Requires the permission essentials.seen.show.created.at
seen-show-created-at: true

# Show the total playtime of the player
seen-show-playtime: true

# Materials are used for sanction_history inventory

# Material used for kicks
kick-material: IRON_INGOT

# Material used for ban
ban-material: DIAMOND

# Material used for mute
mute-material: EMERALD

# Material used for unban
unban-material: IRON_INGOT

# Material used for unmute
unmute-material: COPPER_INGOT

# Material used for warn
warn-material: COAL

# Material used for freeze
freeze-material: ICE

# Material used for mute if it is active
current-mute-material: EMERALD_BLOCK

# Material used for ban if it is active
current-ban-material: DIAMOND_BLOCK
```

<CalloutContainer type="info">

<CalloutDescription>
In the default file, the comments above `ban-default-reason` and `mute-default-reason` are swapped. The keys themselves are correct: `ban-default-reason` is used by `/ban` and `mute-default-reason` by `/mute`.
</CalloutDescription>

</CalloutContainer>

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Sanction module |
| `protections` | List of Strings | `["Maxlego08", "Notch"]` | List of player names that cannot be sanctioned. Any ban, mute, kick, or freeze attempt against these players is denied |
| `date-format` | String | `yyyy-MM-dd HH:mm:ss` | Date format used for sanction dates (`%created_at%`, `%expired_at%` in the notifications) and for the dates displayed by `/seen`. Follows Java `SimpleDateFormat` patterns |

### Default Reasons

The default reason is used when the moderator does not specify a reason in the command.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `kick-default-reason` | String | `You have been kicked` | Default reason for `/kick` |
| `ban-default-reason` | String | `The ban hammer has spoken` | Default reason for `/ban` |
| `mute-default-reason` | String | `You have to turn your tongue 7 times before speaking` | Default reason for `/mute` |
| `unmute-default-reason` | String | `You have the right to talk to us` | Default reason recorded for `/unmute` |
| `unban-default-reason` | String | `The ban hammer gives you the right to return` | Default reason recorded for `/unban` |

<CalloutContainer type="info">

<CalloutDescription>
Before version 1.0.3.8, `date-format` and the five `*-default-reason` options were silently ignored and the built-in values were always used. They are now read from the configuration file.
</CalloutDescription>

</CalloutContainer>

### `/seen` Display Options

Each line of `/seen` can be disabled globally. When an option is enabled, the related permission (if any) is still required.

| Option | Type | Default | Permission required | Description |
|--------|------|---------|---------------------|-------------|
| `seen-show-uuid` | Boolean | `true` | - | Show the UUID of the player |
| `seen-show-ip` | Boolean | `true` | `essentials.seen.show.ip` | Show the IP addresses used by the player |
| `seen-show-last-location` | Boolean | `true` | `essentials.seen.show.last.location` | Show the last known location of the player |
| `seen-show-created-at` | Boolean | `true` | `essentials.seen.show.created.at` | Show the date of the player's first connection |
| `seen-show-playtime` | Boolean | `true` | - | Show the total playtime of the player |

<CalloutContainer type="info">

<CalloutTitle>Hiding IP addresses from everyone</CalloutTitle>

<CalloutDescription>
Operators have every permission, including `essentials.seen.show.ip`, so the permission alone cannot hide IP addresses from them. Set `seen-show-ip: false` to never display IP addresses in `/seen`, even to operators.
</CalloutDescription>

</CalloutContainer>

### Material Icons

These materials are used as item icons in the sanction history GUI to visually distinguish the different sanction types.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `kick-material` | Material | `IRON_INGOT` | Icon of kick entries |
| `ban-material` | Material | `DIAMOND` | Icon of ban entries |
| `mute-material` | Material | `EMERALD` | Icon of mute entries |
| `unban-material` | Material | `IRON_INGOT` | Icon of unban entries |
| `unmute-material` | Material | `COPPER_INGOT` | Icon of unmute entries |
| `warn-material` | Material | `COAL` | Icon of warn entries |
| `freeze-material` | Material | `ICE` | Icon of freeze entries |
| `current-mute-material` | Material | `EMERALD_BLOCK` | Icon of the active (current) mute |
| `current-ban-material` | Material | `DIAMOND_BLOCK` | Icon of the active (current) ban |

<CalloutContainer type="info">

<CalloutDescription>
The block variants (`EMERALD_BLOCK`, `DIAMOND_BLOCK`) are used for **active** sanctions, making it easy for moderators to distinguish past and current bans/mutes in the history GUI.
</CalloutDescription>

</CalloutContainer>

---

## How It Works

1. A moderator issues a sanction command (e.g., `/ban`, `/mute`, `/kick`, `/freeze`).
2. The plugin checks if the target player is in the `protections` list. If so, the action is denied.
3. The sanction is applied to the target player and stored in the database with a timestamp, reason, and issuer.
4. If no reason is provided, the corresponding default reason is used.
5. Staff members with the matching `notify` permission receive a notification.
6. Moderators can review a player's full sanction history with `/sanction <player>`, which opens a GUI with material-coded entries.

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/ban <player> <duration> [reason]` | - | `essentials.ban` | Ban a player from the server |
| `/unban <player> [reason]` | - | `essentials.un.ban` | Unban a previously banned player |
| `/mute <player> <duration> [reason]` | - | `essentials.mute` | Mute a player, preventing them from chatting |
| `/unmute <player> [reason]` | - | `essentials.un.mute` | Unmute a previously muted player |
| `/kick <player> [reason]` | - | `essentials.kick` | Kick a player from the server |
| `/kickall [reason]` | - | `essentials.kick.all` | Kick all players from the server |
| `/freeze <player>` | - | `essentials.freeze` | Freeze or unfreeze a player |
| `/sanction <player>` | `sc` | `essentials.sanction` | Open the sanction GUI of a player |
| `/seen <player>` | `whois` | `essentials.seen` | View player information (status, playtime, UUID, IPs, last location, first join) |
| `/seenip <ip>` | `whoisip` | `essentials.seen.ip` | List the players who used an IP address |

### Additional Permissions

| Permission | Description |
|------------|-------------|
| `essentials.ban.notify` | Receive a notification when a player is banned |
| `essentials.unban.notify` | Receive a notification when a player is unbanned |
| `essentials.mute.notify` | Receive a notification when a player is muted |
| `essentials.unmute.notify` | Receive a notification when a player is unmuted |
| `essentials.kick.notify` | Receive a notification when a player is kicked |
| `essentials.kick.bypass.all` | Not be kicked by `/kickall` |
| `essentials.seen.show.ip` | See the IP addresses in `/seen` (if `seen-show-ip` is `true`) |
| `essentials.seen.show.last.location` | See the last location in `/seen` (if `seen-show-last-location` is `true`) |
| `essentials.seen.show.created.at` | See the first join date in `/seen` (if `seen-show-created-at` is `true`) |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_is_mute%` | Returns `true` if the player is currently muted |
| `%zessentials_user_mute_seconds%` | Returns the remaining mute duration in seconds |
| `%zessentials_user_mute_formatted%` | Returns the remaining mute duration in a human-readable format |
| `%zessentials_user_mute_reason%` | Returns the mute reason |
| `%zessentials_user_is_ban%` | Returns `true` if the player is banned |
| `%zessentials_user_ban_reason%` | Returns the ban reason |
| `%zessentials_user_ban_duration%` | Returns the remaining ban duration in seconds |
| `%zessentials_user_ban_duration_formatted%` | Returns the remaining ban duration formatted |
| `%zessentials_user_is_frozen%` | Returns `true` if the player is frozen |
| `%zessentials_user_target_is_ban%` | Returns `true` if the target player is currently banned |
| `%zessentials_user_target_is_mute%` | Returns `true` if the target player is currently muted |

For the full placeholder list, see [Placeholders](../placeholders).

<CalloutContainer type="warning">

<CalloutDescription>
The `%zessentials_user_target_is_ban%` and `%zessentials_user_target_is_mute%` placeholders operate on a **target** player context, not the requesting player. They are typically used in sanction-related GUIs where a moderator is inspecting another player.
</CalloutDescription>

</CalloutContainer>

---

## Protected Players

The `protections` list prevents specific players from being sanctioned by any moderator, including those with full permissions. This is useful for protecting server owners or system accounts from accidental or malicious sanctions.

```yaml
protections:
  - "Maxlego08"
  - "Notch"
```

<CalloutContainer type="info">

<CalloutDescription>
Protection is matched by **player name**, ignoring case.
</CalloutDescription>

</CalloutContainer>

---

## Example: Privacy-Friendly `/seen`

```yaml
seen-show-uuid: true
seen-show-ip: false
seen-show-last-location: false
seen-show-created-at: true
seen-show-playtime: true
```

`/seen` never shows IP addresses or the last location, even to operators, but still shows the UUID, the first join date and the playtime.
