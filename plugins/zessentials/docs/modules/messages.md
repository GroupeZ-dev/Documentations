---
title: Messages Module
description: Private messaging system with reply and social spy support
---

# Messages Module

**File:** `modules/messages/config.yml`

The Messages module provides a complete private messaging system between players. It includes direct messaging, a reply shortcut for quick conversations, a toggle to disable incoming messages, a persistent ignore system, and a social spy feature that allows staff members to monitor all private messages on the server.

---

## Source Configuration

```yaml
enable: true
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Messages module |

<CalloutContainer type="info">

<CalloutDescription>
This module has a minimal configuration file. The module's behavior is primarily controlled through the messages file (for message formats) and through in-game commands. Enabling or disabling this module controls whether private messaging, the ignore system and `/tptoggle` are available on the server.
</CalloutDescription>

</CalloutContainer>

---

## How It Works

1. A player sends a private message to another player using the `/message` command.
2. The recipient receives the message privately. Both the sender and receiver see formatted versions of the message.
3. Either player can quickly respond using `/reply`, which automatically targets the last person they exchanged messages with.
4. Players who do not wish to receive private messages can toggle them off with `/messagetoggle`.
5. Players can block a specific player with `/ignore`: that player can no longer send them private messages or teleport requests.
6. Staff members with the `essentials.socialspy` permission can enable `/socialspy` to see all private messages exchanged between players on the server.

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/message <player> <message>` | `msg`, `tell`, `whisper`, `m`, `w` | `essentials.message` | Send a private message to another player |
| `/reply <message>` | `r` | `essentials.reply` | Reply to the last player who sent you a private message |
| `/messagetoggle [player]` | `msgtoggle`, `mtg` | `essentials.message.toggle` | Toggle receiving private messages on or off |
| `/socialspy [player]` | - | `essentials.socialspy` | Toggle social spy mode to monitor all private messages on the server |
| `/ignore <player>` | - | `essentials.ignore` | Ignore a player, blocking their private messages and teleport requests |
| `/unignore <player>` | `unignor` | `essentials.ignore` | Stop ignoring a player |
| `/ignorelist` | `ignores` | `essentials.ignore.list` | List the players you are ignoring |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Permissions

| Permission | Description |
|------------|-------------|
| `essentials.message` | Allows the player to send private messages using `/message` |
| `essentials.reply` | Allows the player to reply to private messages using `/reply` |
| `essentials.message.toggle` | Allows the player to toggle private messages on or off using `/messagetoggle` |
| `essentials.message.toggle.other` | Allows toggling private messages for another player with `/messagetoggle <player>` |
| `essentials.socialspy` | Allows the player to enable social spy mode to view all private messages |
| `essentials.ignore` | Allows using `/ignore` and `/unignore` |
| `essentials.ignore.list` | Allows using `/ignorelist` |

---

## Features

### Private Messaging

The `/message` command (and its aliases `msg`, `tell`, `whisper`, `m`, `w`) allows players to send private messages that are only visible to the sender and recipient. The message format for both the sender and receiver is configured in the messages file.

```
/message <player> <message>
/msg Steve Hello, how are you?
```

A muted player cannot send private messages, and private messages go through the same chat checks as the public chat (see [Chat Module](./chat)).

### Reply

The `/reply` command (alias `r`) sends a message to the last player you exchanged private messages with. This provides a convenient shortcut for ongoing conversations without needing to retype the recipient's name.

```
/reply I'm doing great, thanks!
/r See you later!
```

<CalloutContainer type="info">

<CalloutDescription>
The `/reply` command targets the last player who messaged you **or** the last player you messaged, whichever is more recent. This makes it easy to maintain a back-and-forth conversation.
</CalloutDescription>

</CalloutContainer>

### Message Toggle

Players can disable incoming private messages using `/messagetoggle`. When toggled off, other players attempting to message them will be notified that the recipient has private messages disabled. Staff with `essentials.message.toggle.other` can toggle it for another player with `/messagetoggle <player>`.

```
/messagetoggle
/msgtoggle
/mtg
```

### Ignore System

A player can ignore another player (online or offline) with `/ignore <player>`. While a player is ignored:

- their private messages are blocked (they receive a message saying the player is ignoring them)
- their teleport requests (`/tpa` and `/tpahere`) are blocked
- their text mails are blocked (see [Mailbox Module](./mailbox))

```
/ignore Steve
/unignore Steve
/ignorelist
```

The ignore list is persistent: it is stored in the `user_ignores` table (or in the user file with the JSON storage) and survives restarts.

<CalloutContainer type="info">

<CalloutDescription>
The vanish check takes precedence over the ignore check: sending a private message to a vanished player always returns "player not found", even if that player ignores the sender, so the vanished player's presence is never revealed.
</CalloutDescription>

</CalloutContainer>

### Social Spy

Staff members can enable social spy mode with `/socialspy` to monitor all private messages exchanged between players on the server. This is useful for moderation purposes, such as detecting harassment or rule violations in private conversations. `/socialspy <player>` toggles it for another player.

```
/socialspy
```

<CalloutContainer type="warning">

<CalloutDescription>
Social spy should be restricted to trusted staff members only. The `essentials.socialspy` permission grants the ability to read all private conversations on the server. Ensure your permission setup limits this to appropriate roles.
</CalloutDescription>

</CalloutContainer>

---

## Message Formatting

The format of private messages is configured in the messages file, not in the module configuration:

| Message key | Placeholders | Description |
|-------------|--------------|-------------|
| `command-message-me` | `%target%`, `<message>` | What the sender sees |
| `command-message-other` | `%target%`, `<message>` | What the receiver sees |
| `command-message-social-spy` | `%sender%`, `%receiver%`, `%message%` | What staff with social spy enabled see |
| `command-message-ignore-player` | `%player%` | Sent when the receiver is ignoring the sender |
| `command-ignore-list-header` / `command-ignore-list-line` | `%count%` / `%player%` | Format of `/ignorelist` |

---

## Example: Staff Monitoring Setup

To set up a staff team with social spy access:

1. Ensure the Messages module is enabled:
   ```yaml
   enable: true
   ```

2. Grant the `essentials.socialspy` permission to your staff role in your permissions plugin.

3. Staff members can then toggle social spy on or off at any time with `/socialspy`.

All private messages between players will be visible to staff members who have social spy enabled, using the format configured in the messages file.
