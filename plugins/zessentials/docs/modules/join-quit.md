---
sidebar_position: 9
title: JoinQuit Module
description: Customizable join, quit, and first-join messages with MOTD support
---

# JoinQuit Module

**File:** `modules/join_quit/config.yml`

The JoinQuit module manages the messages displayed when players join, leave, or connect to the server for the first time. It supports fully customizable join and quit messages, a first-join broadcast, and a configurable Message of the Day (MOTD) shown to players upon login. Silent join and quit functionality allows staff members to connect and disconnect without triggering public messages.

---

## Source Configuration

```yaml
enable: true
allow-silent-join-quit: false
custom-join-message: CUSTOM  # DISABLE, DEFAULT, CUSTOM
custom-quit-message: CUSTOM
allow-first-join-broadcast: true
allow-first-join-motd: true
first-join-motd-ticks: 20
allow-join-motd: false
join-motd-ticks: 20
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the JoinQuit module |
| `allow-silent-join-quit` | Boolean | `false` | When `true`, players with the `essentials.silentjoin` or `essentials.silentquit` permission can join or leave without triggering a public message |
| `custom-join-message` | String | `CUSTOM` | Controls the join message behavior. `DISABLE` removes join messages entirely, `DEFAULT` uses the vanilla Minecraft message, `CUSTOM` uses the message defined in `messages.yml` |
| `custom-quit-message` | String | `CUSTOM` | Controls the quit message behavior. `DISABLE` removes quit messages entirely, `DEFAULT` uses the vanilla Minecraft message, `CUSTOM` uses the message defined in `messages.yml` |
| `allow-first-join-broadcast` | Boolean | `true` | When `true`, a special broadcast message is sent to all online players when a new player joins for the first time |
| `allow-first-join-motd` | Boolean | `true` | When `true`, new players receive a dedicated first-join MOTD upon their initial connection |
| `first-join-motd-ticks` | Integer | `20` | Delay in ticks before the first-join MOTD is displayed to the new player. `20` ticks = 1 second |
| `allow-join-motd` | Boolean | `false` | When `true`, all players receive a MOTD message each time they join the server |
| `join-motd-ticks` | Integer | `20` | Delay in ticks before the join MOTD is displayed to the player. `20` ticks = 1 second |

:::info
The actual message content (join messages, quit messages, first-join broadcasts, and MOTD lines) is configured in the `messages.yml` file, not in this module configuration. This config file only controls the behavior and toggles for each feature.
:::

---

## Message Modes

The `custom-join-message` and `custom-quit-message` options accept three possible values:

| Value | Description |
|-------|-------------|
| `DISABLE` | Completely removes the join or quit message. No message is broadcast to players |
| `DEFAULT` | Uses the vanilla Minecraft join/quit message provided by the server |
| `CUSTOM` | Uses the custom message defined in `messages.yml`. Supports placeholders and color codes |

---

## Available Placeholders in Messages

The following placeholders can be used in join, quit, and first-join messages configured in `messages.yml`:

| Placeholder | Description |
|-------------|-------------|
| `%player%` | The player's name |
| `%displayName%` | The player's display name (may include prefixes, suffixes, or nicknames) |
| `%totalUser%` | The total number of unique players who have joined the server |
| `%totalUserFormat%` | The total number of unique players formatted with number separators (e.g., `1,234`) |

:::tip
These placeholders are specific to the JoinQuit module messages. You can also use any PlaceholderAPI placeholder in your messages if PlaceholderAPI is installed.
:::

---

## Permissions

| Permission | Description |
|------------|-------------|
| `essentials.silentjoin` | Allows the player to join without triggering a join message. Only effective when `allow-silent-join-quit` is `true` |
| `essentials.silentquit` | Allows the player to leave without triggering a quit message. Only effective when `allow-silent-join-quit` is `true` |

:::warning
The `essentials.silentjoin` and `essentials.silentquit` permissions have no effect unless `allow-silent-join-quit` is set to `true` in the module configuration.
:::

---

## How It Works

1. When a player connects, the module checks whether this is their first join.
2. If it is a first join and `allow-first-join-broadcast` is `true`, a first-join broadcast message is sent to all online players.
3. If it is a first join and `allow-first-join-motd` is `true`, the first-join MOTD is sent to the new player after `first-join-motd-ticks` ticks.
4. If `custom-join-message` is `CUSTOM`, the configured join message from `messages.yml` is broadcast. If `DISABLE`, no message is sent. If `DEFAULT`, the vanilla message is used.
5. If `allow-join-motd` is `true`, the regular MOTD is sent to the player after `join-motd-ticks` ticks.
6. When a player disconnects, the quit message is handled according to the `custom-quit-message` setting.
7. If the player has the `essentials.silentjoin` or `essentials.silentquit` permission and `allow-silent-join-quit` is `true`, the corresponding message is suppressed.

---

## Related Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/rules` | `essentials.rules` | Display the server rules (often shown alongside MOTD) |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_last_first_join_player%` | Name of the most recent player who joined for the first time |

For the full placeholder list, see [Placeholders](../placeholders).

---

## Example: Custom First-Join Setup

To create a welcoming experience for new players, enable both the first-join broadcast and the first-join MOTD:

```yaml
allow-first-join-broadcast: true
allow-first-join-motd: true
first-join-motd-ticks: 40
```

Then configure the message content in your `messages.yml` file. The MOTD will be displayed 2 seconds after the player joins (40 ticks), giving time for the world to load before showing the welcome message.
