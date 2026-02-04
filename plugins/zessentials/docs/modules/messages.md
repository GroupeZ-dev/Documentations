---
sidebar_position: 12
title: Messages Module
description: Private messaging system with reply and social spy support
---

# Messages Module

**File:** `modules/messages/config.yml`

The Messages module provides a complete private messaging system between players. It includes direct messaging, a reply shortcut for quick conversations, a toggle to disable incoming messages, and a social spy feature that allows staff members to monitor all private messages on the server.

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

:::info
This module has a minimal configuration file. The module's behavior is primarily controlled through the `messages.yml` file (for message formats) and through in-game commands. Enabling or disabling this module controls whether private messaging functionality is available on the server.
:::

---

## How It Works

1. A player sends a private message to another player using the `/message` command.
2. The recipient receives the message privately. Both the sender and receiver see formatted versions of the message.
3. Either player can quickly respond using `/reply`, which automatically targets the last person they exchanged messages with.
4. Players who do not wish to receive private messages can toggle them off with `/messagetoggle`.
5. Staff members with the `essentials.socialspy` permission can enable `/socialspy` to see all private messages exchanged between players on the server.

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/message` | `msg`, `tell`, `whisper`, `m`, `w` | `essentials.message` | Send a private message to another player |
| `/reply` | `r` | `essentials.reply` | Reply to the last player who sent you a private message |
| `/messagetoggle` | `msgtoggle`, `mtg` | `essentials.message.toggle` | Toggle receiving private messages on or off |
| `/socialspy` | - | `essentials.socialspy` | Toggle social spy mode to monitor all private messages on the server |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Permissions

| Permission | Description |
|------------|-------------|
| `essentials.message` | Allows the player to send private messages using `/message` |
| `essentials.reply` | Allows the player to reply to private messages using `/reply` |
| `essentials.message.toggle` | Allows the player to toggle private messages on or off using `/messagetoggle` |
| `essentials.socialspy` | Allows the player to enable social spy mode to view all private messages |

---

## Features

### Private Messaging

The `/message` command (and its aliases `msg`, `tell`, `whisper`, `m`, `w`) allows players to send private messages that are only visible to the sender and recipient. The message format for both the sender and receiver is configured in the `messages.yml` file.

```
/message <player> <message>
/msg Steve Hello, how are you?
```

### Reply

The `/reply` command (alias `r`) sends a message to the last player you exchanged private messages with. This provides a convenient shortcut for ongoing conversations without needing to retype the recipient's name.

```
/reply I'm doing great, thanks!
/r See you later!
```

:::tip
The `/reply` command targets the last player who messaged you **or** the last player you messaged, whichever is more recent. This makes it easy to maintain a back-and-forth conversation.
:::

### Message Toggle

Players can disable incoming private messages using `/messagetoggle`. When toggled off, other players attempting to message them will be notified that the recipient has private messages disabled.

```
/messagetoggle
/msgtoggle
/mtg
```

### Social Spy

Staff members can enable social spy mode with `/socialspy` to monitor all private messages exchanged between players on the server. This is useful for moderation purposes, such as detecting harassment or rule violations in private conversations.

```
/socialspy
```

:::warning
Social spy should be restricted to trusted staff members only. The `essentials.socialspy` permission grants the ability to read all private conversations on the server. Ensure your permission setup limits this to appropriate roles.
:::

---

## Message Formatting

The format of private messages (what the sender sees, what the receiver sees, and what social spy shows) is configured in the `messages.yml` file, not in the module configuration. Typical format placeholders include:

| Placeholder | Description |
|-------------|-------------|
| `%sender%` | The name of the player sending the message |
| `%receiver%` | The name of the player receiving the message |
| `%message%` | The content of the private message |

---

## Example: Staff Monitoring Setup

To set up a staff team with social spy access:

1. Ensure the Messages module is enabled:
   ```yaml
   enable: true
   ```

2. Grant the `essentials.socialspy` permission to your staff role in your permissions plugin.

3. Staff members can then toggle social spy on or off at any time with `/socialspy`.

All private messages between players will be visible to staff members who have social spy enabled, using the format configured in `messages.yml`.
