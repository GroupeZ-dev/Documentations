---
sidebar_position: 3
title: Chat Module
description: Complete chat formatting, moderation, placeholders, and interactive features
---

# Chat Module

**File:** `modules/chat/config.yml`

The Chat module is one of the most feature-rich modules in zEssentials. It controls all aspects of server chat including formatting, moderation tools, anti-spam, interactive elements, mentions, local chat, item display, clickable links, custom rules, moderator action buttons, and optional chat history storage. The module uses a **priority-based permission system** for chat formats and MiniMessage for rich text formatting.

---

## Bypass Permissions

The following permissions allow players to bypass specific chat restrictions:

| Permission | Description |
|------------|-------------|
| `essentials.chat.bypass.alphanumeric` | Bypass the alphanumeric-only regex filter |
| `essentials.chat.bypass.dynamic.cooldown` | Bypass the dynamic chat cooldown (anti-spam) |
| `essentials.chat.bypass.link` | Bypass the link/URL filter in chat |
| `essentials.chat.bypass.same.message` | Bypass the duplicate message detection |
| `essentials.chat.bypass.disable` | Bypass the chat disable restriction (talk when chat is disabled) |
| `essentials.chat.moderator` | Grants access to the moderator action button on chat messages |

### Chat Formatting Permissions

These permissions control which MiniMessage formatting tags a player can use in chat:

| Permission | Allowed Tags |
|------------|-------------|
| `essentials.chat.color` | Color tags (e.g., `<red>`, `<#ff0000>`) |
| `essentials.chat.decoration` | Decoration tags (`<bold>`, `<italic>`, `<underlined>`, `<strikethrough>`, `<obfuscated>`) |
| `essentials.chat.rainbow` | Rainbow gradient tag (`<rainbow>`) |
| `essentials.chat.gradient` | Gradient tag (`<gradient:color1:color2>`) |
| `essentials.chat.click` | Click event tags (`<click:action:value>`) |
| `essentials.chat.hover` | Hover event tags (`<hover:show_text:value>`) |
| `essentials.chat.newline` | Newline tag (`<newline>`) |
| `essentials.chat.reset` | Reset tag (`<reset>`) |
| `essentials.chat.font` | Font tag (`<font:name>`) |
| `essentials.chat.keybind` | Keybind tag (`<keybind:key>`) |
| `essentials.chat.link` | Clickable URL tags |

---

## Source Configuration

```yaml
enable: true

# Regex and filter toggles
enable-alphanumeric-regex: true
enable-link-regex: true
enable-itemadders-font-regex: true

# Anti-spam systems
enable-chat-dynamic-cooldown: true
enable-same-message-cancel: true

# Local (distance-based) chat
enable-local-chat: false
local-chat-distance: 100

# Core chat features
enable-chat-format: true
enable-link-transform: true
enable-chat-messages: true

# Caps detection
enable-caps: true
caps-threshold: 0.5

# Anti-flood
enable-anti-flood: true
anti-flood-regex: "(.)\\1{3,}"

# Ping (@mention) system
enable-ping: true
enable-player-ping-sound: true
player-ping-sound: BLOCK_NOTE_BLOCK_PLING
player-ping-sound-volume: 0.8
player-ping-sound-pitch: 1
player-ping-color: "<red>%name%</red><red>"
player-ping-color-other: "<white>%name%</white>"

# Date format for chat history
date-format: "yyyy-MM-dd HH:mm:ss"

# Dynamic cooldown thresholds
chat-cooldowns:
  2: 1500
  4: 12000
  10: 60000
chat-cooldown-max: 50

# Chat format with priority-based permissions
chat-formats:
  - priority: 0
    permission: "zessentials.chat.default"
    format: "<gray>%player% <dark_gray>>> <white>%message%"
  - priority: 1
    permission: "zessentials.chat.vip"
    format: "<gold>[VIP] <yellow>%player% <dark_gray>>> <white>%message%"
  - priority: 2
    permission: "zessentials.chat.admin"
    format: "<red>[Admin] <white>%player% <dark_gray>>> <white>%message%"

# Chat placeholders (custom replacements in chat)
chat-placeholders:
  - placeholder: "[ping]"
    replacement: "<yellow>%player_ping%ms</yellow>"
  - placeholder: "[money]"
    replacement: "<green>%zessentials_user_formatted_balance_default%</green>"

# Item display in chat
show-item:
  enable: true
  placeholder: "[item]"
  format: "<hover:show_item:%item_nbt%><gold>[%item_name% x%item_amount%]</hover>"

# Command placeholder (./command becomes clickable)
command-placeholder:
  enable: true

# Custom rules (regex-based)
custom-rules:
  - regex: "(?i)(badword1|badword2)"
    action: cancel
    message: "&cThat word is not allowed."
  - regex: "(?i)(advertising\\.com)"
    action: cancel
    message: "&cAdvertising is not allowed."

# Ping system
ping:
  enable: true
  sound: BLOCK_NOTE_BLOCK_PLING
  volume: 0.8
  pitch: 1.0

# Moderator action button
moderator-button:
  enable: true

# Link transform (clickable URLs)
link-transform:
  enable: true

# Chat history storage (MySQL only)
chat-history:
  enable: false
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Chat module entirely |
| `enable-chat-format` | Boolean | `true` | Enable priority-based chat formatting |
| `enable-chat-messages` | Boolean | `true` | Enable the chat message processing pipeline |
| `date-format` | String | `yyyy-MM-dd HH:mm:ss` | Date format used for chat history timestamps. Uses Java `SimpleDateFormat` patterns |

### Regex Filters

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-alphanumeric-regex` | Boolean | `true` | When enabled, messages containing non-alphanumeric characters (except standard punctuation) are blocked. Bypass with `essentials.chat.bypass.alphanumeric` |
| `enable-link-regex` | Boolean | `true` | When enabled, messages containing URLs/links are blocked. Bypass with `essentials.chat.bypass.link` |
| `enable-itemadders-font-regex` | Boolean | `true` | When enabled, filters out ItemAdders custom font characters from chat messages |

### Anti-Spam Systems

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-chat-dynamic-cooldown` | Boolean | `true` | Enable progressive cooldown that increases as a player sends messages more rapidly |
| `enable-same-message-cancel` | Boolean | `true` | Cancel messages that are identical to the player's previous message. Bypass with `essentials.chat.bypass.same.message` |
| `chat-cooldowns` | Map (Integer to Integer) | `{2: 1500, 4: 12000, 10: 60000}` | Dynamic cooldown thresholds. Key = number of messages, Value = cooldown in milliseconds applied after reaching that message count |
| `chat-cooldown-max` | Integer | `50` | Maximum cooldown duration in seconds that the dynamic system can impose |

:::info Dynamic Cooldown
The dynamic cooldown system tracks how many messages a player sends within a sliding window. As the count rises, progressively longer cooldowns are applied:
- After **2** rapid messages: **1500ms** (1.5 seconds) cooldown
- After **4** rapid messages: **12000ms** (12 seconds) cooldown
- After **10** rapid messages: **60000ms** (60 seconds) cooldown

Players with the `essentials.chat.bypass.dynamic.cooldown` permission are exempt.
:::

### Caps Detection

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-caps` | Boolean | `true` | Enable detection and blocking of messages with excessive uppercase characters |
| `caps-threshold` | Double | `0.5` | The ratio of uppercase characters to total characters that triggers caps detection. `0.5` means messages with more than 50% uppercase letters are flagged |

### Anti-Flood

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-anti-flood` | Boolean | `true` | Enable detection and removal of character flooding (e.g., "helloooooo") |
| `anti-flood-regex` | String | `(.)\\1{3,}` | Regex pattern used to detect character repetition. The default matches any character repeated 4 or more times consecutively |

### Local Chat

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-local-chat` | Boolean | `false` | Enable distance-based local chat. When enabled, messages are only visible to players within the configured distance |
| `local-chat-distance` | Integer | `100` | Maximum distance in blocks within which players can see each other's messages when local chat is enabled |

:::tip
Local chat is useful for roleplay or survival servers where you want players to only communicate with nearby players. Players can use `/pub` to send messages visible to everyone regardless of distance.
:::

### Ping (@Mention) System

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-ping` | Boolean | `true` | Enable the @mention ping system in chat. Players can type `@PlayerName` to ping another player |
| `enable-player-ping-sound` | Boolean | `true` | Play a sound effect to the pinged player |
| `player-ping-sound` | String | `BLOCK_NOTE_BLOCK_PLING` | The Minecraft sound effect played when a player is pinged |
| `player-ping-sound-volume` | Float | `0.8` | Volume of the ping sound (0.0 to 1.0) |
| `player-ping-sound-pitch` | Float | `1` | Pitch of the ping sound |
| `player-ping-color` | String | `<red>%name%</red><red>` | MiniMessage format for how the pinged player sees their own name highlighted in the message |
| `player-ping-color-other` | String | `<white>%name%</white>` | MiniMessage format for how other players see the pinged player's name in the message |

### Chat Formats

Chat formats use a priority-based permission system. The plugin checks each format entry in order of priority (lowest first) and applies the first format for which the player has the required permission.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chat-formats` | List | *(see above)* | List of chat format entries, each with a priority, permission, and MiniMessage format string |
| `chat-formats[].priority` | Integer | - | Priority order. Lower values are checked first |
| `chat-formats[].permission` | String | - | Permission node required for this format to apply |
| `chat-formats[].format` | String | - | MiniMessage chat format string. Use `%player%` for the player name and `%message%` for the message content |

### Chat Placeholders

Custom text replacements within chat messages. When a player types a placeholder keyword, it is replaced with dynamic content.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chat-placeholders` | List | *(see above)* | List of placeholder replacement definitions |
| `chat-placeholders[].placeholder` | String | - | The text pattern to match in chat (e.g., `[ping]`, `[money]`) |
| `chat-placeholders[].replacement` | String | - | The MiniMessage replacement text. Supports PlaceholderAPI placeholders |

### Item Display

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `show-item.enable` | Boolean | `true` | Enable the `[item]` placeholder that lets players show their held item in chat |
| `show-item.placeholder` | String | `[item]` | The text players type in chat to display their held item |
| `show-item.format` | String | *(see above)* | MiniMessage format for the item display. Supports `%item_name%`, `%item_amount%`, `%item_nbt%` |

### Command Placeholder

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `command-placeholder.enable` | Boolean | `true` | When enabled, typing `./command` in chat creates a clickable text that runs the command when clicked |

### Custom Rules

Regex-based rules that can match and act on chat messages. Rules are checked in order.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `custom-rules` | List | *(see above)* | List of custom chat rule definitions |
| `custom-rules[].regex` | String | - | Regular expression pattern to match against chat messages |
| `custom-rules[].action` | String | - | Action to take when the rule matches. `cancel` blocks the message |
| `custom-rules[].message` | String | - | Message sent to the player when their message is blocked by this rule |

### Moderator Action Button

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `moderator-button.enable` | Boolean | `true` | When enabled, players with the `essentials.chat.moderator` permission see an action button next to each chat message, allowing quick access to moderation actions (mute, kick, etc.) on the message sender |

### Link Transform

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `link-transform.enable` | Boolean | `true` | Automatically converts URLs posted in chat into clickable links |
| `enable-link-transform` | Boolean | `true` | Global toggle for link transformation |

### Chat History

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chat-history.enable` | Boolean | `false` | Enable storage of chat messages in the database for history retrieval. **Requires MySQL** |

:::warning
Chat history storage requires a **MySQL** (or MariaDB) database backend. It is not available with SQLite. Enabling this feature on a busy server will generate significant database writes.
:::

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/chathistory` | `ct` | `essentials.chat.history` | View stored chat history |
| `/chatclear` | `cl` | `essentials.chat.clear` | Clear the chat for all players |
| `/chatenable` | `ce` | `essentials.chat.enable` | Enable the server chat (after it has been disabled) |
| `/chatdisable` | `cd` | `essentials.chat.disable` | Disable the server chat (prevents players from chatting) |
| `/broadcast` | `bc` | `essentials.chat.broadcast` | Broadcast a message to all players |
| `/showitem` | - | `essentials.show.item` | Show your currently held item in chat |
| `/pub` | - | `essentials.pub` | Send a highlighted/public message visible to all (useful with local chat) |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

The Chat module does not register dedicated PlaceholderAPI placeholders. However, the module makes extensive use of PlaceholderAPI within its formatting system. Any registered placeholder can be used in chat formats, chat placeholders, and item display formats.

For the full placeholder list, see [Placeholders](../placeholders).

---

## Feature Details

### Priority-Based Chat Formatting

Chat formats are evaluated in priority order (lowest number first). The first format whose permission the player holds is applied. This allows you to define a hierarchy:

```yaml
chat-formats:
  - priority: 0
    permission: "zessentials.chat.default"
    format: "<gray>%player% <dark_gray>>> <white>%message%"
  - priority: 1
    permission: "zessentials.chat.vip"
    format: "<gold>[VIP] <yellow>%player% <dark_gray>>> <white>%message%"
  - priority: 2
    permission: "zessentials.chat.admin"
    format: "<red>[Admin] <white>%player% <dark_gray>>> <white>%message%"
```

:::info
A player with both `zessentials.chat.default` and `zessentials.chat.vip` will use the `default` format because it has a lower priority number and is checked first. To use the VIP format, remove the default permission or structure your permission hierarchy so players only have one chat permission.
:::

### Dynamic Cooldown System

The dynamic cooldown escalates restrictions based on message frequency:

| Messages Sent | Cooldown Applied |
|---------------|-----------------|
| 2 messages rapidly | 1,500 ms (1.5s) |
| 4 messages rapidly | 12,000 ms (12s) |
| 10 messages rapidly | 60,000 ms (60s) |

The maximum cooldown cap is controlled by `chat-cooldown-max` (default: 50 seconds). The cooldown counter resets after a period of inactivity.

### Local Chat

When `enable-local-chat` is `true`, messages are only delivered to players within `local-chat-distance` blocks of the sender. This is measured as a 3D distance. Players outside the range will not see the message. The `/pub` command sends a message that bypasses the distance restriction and is visible server-wide.

### Custom Chat Placeholders

Chat placeholders allow you to create shorthand keywords that expand into rich content:

```yaml
chat-placeholders:
  - placeholder: "[ping]"
    replacement: "<yellow>%player_ping%ms</yellow>"
  - placeholder: "[money]"
    replacement: "<green>%zessentials_user_formatted_balance_default%</green>"
```

When a player types `[ping]` in chat, it is replaced with their current ping in yellow. When they type `[money]`, it shows their formatted balance in green.

### Moderator Action Button

When enabled, staff members with the `essentials.chat.moderator` permission see a small action button appended to each chat message. Clicking this button opens a quick-action menu for the message sender, providing shortcuts to moderation commands such as mute, kick, or ban.

### Link Transform

URLs detected in chat messages are automatically converted to clickable links. Players can click the URL directly in chat to open it. This works alongside the link regex filter -- if `enable-link-regex` is `true`, links are blocked unless the player has `essentials.chat.bypass.link`, in which case the link is both allowed and made clickable.
