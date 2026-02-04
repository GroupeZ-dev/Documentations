---
sidebar_position: 2
title: AutoMessage Module
description: Automatic broadcast messages at configurable intervals
---

# AutoMessage Module

**File:** `modules/automessage/config.yml`

The AutoMessage module broadcasts automated messages to all online players at a configurable interval. It is ideal for server announcements, tips, rule reminders, event promotions, or any recurring information you want players to see regularly. Messages can be sent sequentially or in random order.

---

## Source Configuration

```yaml
enable: true
interval: 300
random-order: false
messages:
  - lines:
      - ""
      - "#ffd353ℹ ᴀɴɴᴏᴜɴᴄᴇᴍᴇɴᴛ"
      - "&7Welcome to our server! Type &f/rules &7for server rules."
      - ""
  - lines:
      - ""
      - "#ffd353ℹ ᴀɴɴᴏᴜɴᴄᴇᴍᴇɴᴛ"
      - "&7Join our Discord: &f/discord"
      - ""
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the AutoMessage module |
| `interval` | Integer | `300` | Time in seconds between each automatic broadcast. `300` = 5 minutes |
| `random-order` | Boolean | `false` | If `true`, messages are selected randomly each interval. If `false`, messages cycle sequentially from top to bottom |
| `messages` | List | *(see above)* | The list of message entries to broadcast. Each entry contains a `lines` list |
| `messages[].lines` | List of Strings | - | The individual lines of text sent for a single broadcast. Each line is sent as a separate chat line to all players |

:::info
Each message entry is a multi-line block. Empty strings (`""`) produce blank lines in chat, which is useful for visual spacing around your announcements.
:::

:::tip
Messages support both legacy color codes (`&` prefix), hex colors (`#ffd353`), and MiniMessage formatting. You can also use PlaceholderAPI placeholders within messages for dynamic content such as player counts or server information.
:::

---

## How It Works

1. When the module is enabled, a repeating task is scheduled at the configured `interval` (in seconds).
2. Each time the task runs, the next message is selected from the `messages` list:
   - In **sequential mode** (`random-order: false`), messages are sent in order from the first to the last, then the cycle repeats.
   - In **random mode** (`random-order: true`), a message is picked randomly from the list each interval.
3. All lines within the selected message entry are sent to every online player.

---

## Related Commands

The AutoMessage module does not register any specific commands. To modify auto messages, edit the `modules/automessage/config.yml` file and restart the server or reload the plugin configuration.

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

The AutoMessage module does not provide any specific placeholders. However, you can use any registered PlaceholderAPI placeholder inside your message lines.

For the full placeholder list, see [Placeholders](../placeholders).

---

## Examples

### Tips Rotation

Broadcast helpful tips to players every 3 minutes:

```yaml
enable: true
interval: 180
random-order: true
messages:
  - lines:
      - ""
      - "#ffd353ℹ ᴛɪᴘ"
      - "&7Use &f/sethome &7to save your current location!"
      - ""
  - lines:
      - ""
      - "#ffd353ℹ ᴛɪᴘ"
      - "&7You can trade items safely with &f/pay &7and &f/mail&7."
      - ""
  - lines:
      - ""
      - "#ffd353ℹ ᴛɪᴘ"
      - "&7Vote daily with &f/vote &7to earn rewards!"
      - ""
```

### Event Announcement

Promote an ongoing event with a single repeating message:

```yaml
enable: true
interval: 600
random-order: false
messages:
  - lines:
      - ""
      - "&6&l⚔ EVENT &eDouble XP Weekend is active!"
      - "&7Enjoy double experience until Sunday at midnight."
      - "&7Use &f/warp event &7to join the event area."
      - ""
```

:::warning
Setting the `interval` too low (e.g., under 60 seconds) may annoy players with frequent broadcasts. A value between 180 and 600 seconds is generally recommended.
:::
