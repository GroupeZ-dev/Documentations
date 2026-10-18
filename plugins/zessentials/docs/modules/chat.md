---
title: Chat Module
description: Complete chat formatting, moderation, placeholders, and interactive features
---

# Chat Module

**File:** `modules/chat/config.yml`

The Chat module is one of the most feature-rich modules in zEssentials. It controls all aspects of server chat including formatting, moderation tools, anti-spam, mentions (pings), local chat, item display, clickable links and commands, custom rules, moderator action buttons, and chat history storage. The module uses a **priority-based permission system** for chat formats and MiniMessage for rich text formatting.

<CalloutContainer type="info">

<CalloutTitle>Paper only</CalloutTitle>

<CalloutDescription>
The chat format is applied through Paper's `AsyncChatEvent`. Set `enable-chat-format: false` if you want another chat plugin to handle formatting.
</CalloutDescription>

</CalloutContainer>

---

## Bypass Permissions

The following permissions allow players to bypass specific chat restrictions:

| Permission | Description |
|------------|-------------|
| `essentials.chat.bypass.alphanumeric` | Bypass the allowed characters check (`alphanumeric-regex`) |
| `essentials.chat.bypass.dynamic.cooldown` | Bypass the dynamic chat cooldown (anti-spam) |
| `essentials.chat.bypass.link` | Bypass the link filter (`link-regex`) |
| `essentials.chat.bypass.same.message` | Bypass the duplicate message detection |
| `essentials.chat.bypass.caps` | Bypass the uppercase detection |
| `essentials.chat.bypass.flood` | Bypass the anti-flood check |
| `essentials.chat.bypass.disable` | Talk while the chat is disabled with `/chatdisable` |
| `essentials.chat.moderator` | See the `moderator-action` button in front of each message |

### Chat Formatting Permissions

These permissions control which MiniMessage formatting tags a player can use in chat:

| Permission | Allowed Tags |
|------------|-------------|
| `essentials.chat.color` | Color tags (e.g., `<red>`, `<#ff0000>`) |
| `essentials.chat.decoration` | Decoration tags (`<bold>`, `<italic>`, `<underlined>`, `<strikethrough>`, `<obfuscated>`) |
| `essentials.chat.rainbow` | Rainbow tag (`<rainbow>`) |
| `essentials.chat.gradient` | Gradient tag (`<gradient:color1:color2>`) |
| `essentials.chat.click` | Click event tags (`<click:action:value>`) |
| `essentials.chat.hover` | Hover event tags (`<hover:show_text:value>`) |
| `essentials.chat.newline` | Newline tag (`<newline>`) |
| `essentials.chat.reset` | Reset tag (`<reset>`) |
| `essentials.chat.font` | Font tag (`<font:name>`) |
| `essentials.chat.keybind` | Keybind tag (`<key:...>`) |
| `essentials.chat.link` | Automatically turns the links of the player into clickable links (`link-transform`). The player also needs `essentials.chat.click` |

---

## Source Configuration

The default file (the permission comments at the top of the file and some repeated comments are omitted here):

```yaml
enable: true

# Enables verification of authorized characters in chat
enable-alphanumeric-regex: true

# Check whether the message contains links
enable-link-regex: true

# Allows to apply a dynamic cooldown between each message of a player, the more the player will spam the more he will have a great cooldown
enable-chat-dynamic-cooldown: true

# Check player tries to put the same message multiple times
enable-same-message-cancel: true

# Enables local chat where messages are only visible to nearby players unless prefixed with '!'
enable-local-chat: false

# Maximum distance in blocks for local chat messages
local-chat-distance: 100

# Apply a format to the chat, disabled on if you want another plugin to handle this
enable-chat-format: true

# Turns links into clickable links if the player has the essentials.chat.link permission, the player must also have permission: essentials.chat.click
# check out link-transform
enable-link-transform: true

# Stores all player messages in the database. Works only with MYSQL storage
# Also provides access to all player messages with the /chathistory command
enable-chat-messages: true

# Regex to check allowed characters
# You can test the regex here before changing the default one: https://regex101.com/
alphanumeric-regex: '^[a-zA-Z0-9_.?!^¨%ù*&é"#''{(\[-|èêë`\\çà)\]=}ûî+<>:²€$/\\-\\,-â@;ô ]+$'

# Regex to check links
# You can test the regex here before changing the default one: https://regex101.com/
link-regex: '[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)'

# Regex to check pub message
pub-regex: '.*(&[0-9a-fk-or]|#[0-9a-fA-F]{6}|%[^%]+%|<[^>]+>).*'

# Allows to activate the flood check in the message, if the player will write messages with too many characters in capital letter, the message will be blocked
enable-caps: true

# Maximum character percentage per sentence, between 0 and 1
caps-threshold: 0.5

# Enable anti-flood regex
enable-anti-flood: true

# Allows players to avoid writing the same characters several times in a row, here 4 times. Thus avoid messages like "AHHHHHHHHHHHH"
anti-flood-regex: "(.)\\1{3,}"

# Set the number of messages and cooldown between each message in milliseconds
# The faster the player will send message the faster the cooldown between each message will be
chat-cooldowns:
  - messages: 2
    cooldown: 1500 # max 1.5s
  - messages: 4
    cooldown: 12000 # max 12s
  - messages: 10
    cooldown: 60000 # max 60s

# Number of messages that will be in memory to be analyzed during the cooldown
chat-cooldown-max: 50

# Chat format with permissions
#
# Use https://webui.advntr.dev/ to create your format quickly
#
# Available placeholder (you can use PlaceholderAPI here):
# %player% - Player's name
# %displayName% - Player's display name
# <message> - Player's message, Attention for message it's not %message% !
# %moderator_action% - Moderation action, see moderator-action
chat-formats:
  - priority: 1
    permission: "essentials.chat.format.vip"
    format: "<hover:show_text:'&cReport this message'><click:run_command:'/report %player% chat'><#ff0000>⚠</click></hover> %moderator_action%<#ffffff><hover:show_text:'#ffd353ℹ Informations#3f3f3f:<newline>#3f3f3f• &7Money#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_money%<newline>#3f3f3f• &7Coins#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_coins%<newline><newline>&f➥ &7Click for more information'>%player%</hover> <#333333>» <#ffff6b><click:suggest_command:'/msg %player% '><hover:show_text:'&fSend a private message'><message></hover></click>"
  - priority: 2
    permission: "essentials.chat.format.admin"
    format: "<#ffffff><hover:show_text:'#ffd353ℹ Informations#3f3f3f:<newline>#3f3f3f• &7Money#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_money%<newline>#3f3f3f• &7Coins#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_coins%<newline><newline>&f➥ &7Click for more information'>%player%</hover> <#333333>» <#ff4444><click:suggest_command:'/msg %player% '><hover:show_text:'&fSend a private message'><message></hover></click>"

# Default chat format
default-chat-format: "<hover:show_text:'&cReport this message'><click:run_command:'/report %player% chat'><#ff0000>⚠</click></hover> %moderator_action%<#ffffff><hover:show_text:'#ffd353ℹ Informations#3f3f3f:<newline>#3f3f3f• &7Money#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_money%<newline>#3f3f3f• &7Coins#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_coins%<newline><newline>&f➥ &7Click for more information'>%player%</hover> <#333333>» <gray><click:suggest_command:'/msg %player% '><hover:show_text:'&fSend a private message'><message></hover></click>"

# Allows players who have the essentials.chat.moderator permission to have a different view from other players.
# By default, moderators will have a button to punish the player
#
# Available placeholder (you can use PlaceholderAPI here):
# %player% - Player's name
moderator-action: "<hover:show_text:'<#ff8888>Punish the player'><click:run_command:'/sc %player%'><#ff8888>✗</click></hover> "

# Turns a link into a clickable link by players
link-transform: "<hover:show_text:'&fOpen the link'><click:open_url:'%url%'>%url%</click></hover>"

# Date format for /chathistory
date-format: "yyyy-MM-dd HH:mm:ss"

# Chat ping

# To ping a player you must use the prefix @<nickname>
enable-ping: true

# Allows to activate the sound during a player ping, the player can disable the sound with the command /pingsound
enable-player-ping-sound: true

# Sound played when player is pinged
player-ping-sound: BLOCK_NOTE_BLOCK_PLING

# Ping sound volume
player-ping-sound-volume: 0.8

# Ping sound pitch
player-ping-sound-pitch: 1

# Color of ping displayed to the player
player-ping-color: "<red>%name%</red><red>"

# Color of ping displayed for other players
player-ping-color-other: "<white>%name%</white>"

# Placeholders

chat-placeholders:
  - name: "ping" # Placeholder name, the name must consist only of lowercase letters, numbers 0 to 9 and characters _ and -
    regex: "(?i)\\[ping\\]" # [ping] placeholder
    result: "%player_ping% ms" # PlaceholderAPI extension Player: https://api.extendedclip.com/expansions/player/
    permission: "zessentials.chat.placeholder.ping" # You must define a permission
  - name: "block"
    regex: "(?i)\\[blocks\\]" # [blocks] placeholder
    result: "&a%statistic_mine_block% &fblocks" # PlaceholderAPI extension Statistic: https://api.extendedclip.com/expansions/statistic/
    permission: "zessentials.chat.placeholder.block"
  - name: "money"
    regex: "(?i)\\[money\\]" # [money] placeholder
    result: "%zessentials_user_formatted_balance_money%"
    permission: "zessentials.chat.placeholder.money"
  - name: "coins"
    regex: "(?i)\\[coins\\]" # [coins] placeholder
    result: "%zessentials_user_formatted_balance_coins%"
    permission: "zessentials.chat.placeholder.coins"
  - name: "playtime"
    regex: "(?i)\\[playtime\\]" # [playtime] placeholder
    result: "&fI've played &7%zessentials_user_playtime_formatted%"
    permission: "zessentials.chat.placeholder.playtime"
  - name: "pos"
    regex: "(?i)\\[pos\\]" # [pos] placeholder
    result: "&bWorld: &f%player_world% &eX: &f%player_x% &eY: &f%player_y% &eZ: &f%player_z%"
    permission: "zessentials.chat.placeholder.pos"

# Displays the item in your hand
item-placeholder:
  enable: true
  regex: "(?i)\\[item\\]|\\[i\\]" # [item] or [i] placeholder
  result: "&bx<amount> &f<item>"
  permission: "zessentials.chat.placeholder.item" # You must define a permission
  # Regex used to ensure item names do not contain forbidden characters when displayed in chat
  item-name-regex: "^[a-zA-Z0-9_.?!^¨%ù*&é\"#'{(\\[-|èêë`\\\\çà)\\]=}ûî+<>:²€$/\\-\\,-â@;ô ]+$"

# Allows to replace a text to transform it into clickable text to suggest a command
# Message: "Please open the auction house with the ./zah" will be transformed into "Please open the auction house with the /zah" with /zah that will be clickable
# If you want to use a command in a sentence, you must do this: ./<your command> [<aliases>].
# Example: "Please use ./zah. to open the auction house"
command-placeholder: # ./<command>. placeholder
  enable: true
  result: "<hover:show_text:'<yellow>Try this command'><click:suggest_command:'/%fixed_command%'><yellow>/%command%</yellow></click></hover>"
  permission: "zessentials.chat.placeholder.command" # You must define a permission

  # Replace check all messages sent to players and replace the command if it exists
  # You must use the ProtocolLib plugin
  # You must be on a paper basis, using spigot will not work
  enable-replace-all-message: false

# Allows to define custom rules with regex
custom-rules:
  - regex: "(can|may|would you like if) i (have|be|become|get|has) (op|admin|mod|builder)"
    permission: "essentials.chat.bypass.custom.rules"
    message: "&cCurrently, we are not looking for new staff."
  - regex: "(do|are) you (need|wish|looking for) (any|some|one|good) (op|ops|operators|admins|mods|builders|new people|ateam)"
    permission: "essentials.chat.bypass.custom.rules"
    message: "&cCurrently, we are not looking for new staff."
  - regex: "((admin|op|team|server|owner) (is|are)) + *(dick|cock|duck|noob)"
    permission: "essentials.chat.bypass.custom.rules"
    message: "&cYet so much hate, we are only love"
  - regex: "this server (is (bad|crappy|shitty)|suck)"
    permission: "essentials.chat.bypass.custom.rules"
    message: "&cNo, the server is great, you’re the bad one!"
```

<CalloutContainer type="info">

<CalloutTitle>Removed option</CalloutTitle>

<CalloutDescription>
The `enable-itemadders-font-regex` / `itemadders-font-regex` options were removed in 1.0.3.8: the feature was never wired and the options had no effect. You can safely delete them from your existing file.
</CalloutDescription>

</CalloutContainer>

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Chat module entirely |
| `enable-chat-format` | Boolean | `true` | Apply the zEssentials chat format (`chat-formats` / `default-chat-format`). Disable it if another plugin formats the chat. When disabled, the filters still run but formatting, pings, chat placeholders, link transform and chat history storage are not applied |
| `enable-chat-messages` | Boolean | `true` | Store every chat message in the database, to read them with `/chathistory`. Requires a SQL storage (messages are not stored with the `JSON` storage) |
| `date-format` | String | `yyyy-MM-dd HH:mm:ss` | Date format used by `/chathistory`. Follows Java `SimpleDateFormat` patterns |

### Filters

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-alphanumeric-regex` | Boolean | `true` | Block messages containing characters that are not allowed by `alphanumeric-regex`. Bypass with `essentials.chat.bypass.alphanumeric` |
| `alphanumeric-regex` | String | *(see above)* | Regex of the allowed characters |
| `enable-link-regex` | Boolean | `true` | Block messages containing a link (spaces are removed before the check). Bypass with `essentials.chat.bypass.link` |
| `link-regex` | String | *(see above)* | Regex used to detect links |
| `pub-regex` | String | *(see above)* | Regex of forbidden content in `/pub` messages (color codes, hex colors, placeholders and MiniMessage tags) |
| `enable-caps` | Boolean | `true` | Block messages (longer than 3 characters) with too many uppercase letters. Online player names are ignored. Bypass with `essentials.chat.bypass.caps` |
| `caps-threshold` | Double | `0.5` | Maximum ratio of uppercase letters, between `0` and `1`. `0.5` blocks messages with more than 50% of uppercase letters |
| `enable-anti-flood` | Boolean | `true` | Block messages matching `anti-flood-regex`. Bypass with `essentials.chat.bypass.flood` |
| `anti-flood-regex` | String | `(.)\\1{3,}` | Regex used to detect flood. The default blocks any character repeated 4 times or more in a row |

### Anti-Spam

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-chat-dynamic-cooldown` | Boolean | `true` | Enable the dynamic cooldown defined by `chat-cooldowns`. Bypass with `essentials.chat.bypass.dynamic.cooldown` |
| `chat-cooldowns` | List | *(see above)* | List of rules, each with `messages` and `cooldown` (milliseconds). A rule means: a player can send at most `messages` messages within `cooldown` milliseconds |
| `chat-cooldown-max` | Integer | `50` | Number of recent messages kept in memory for each player to evaluate the rules. Must be greater than or equal to the highest `messages` value |
| `enable-same-message-cancel` | Boolean | `true` | Cancel a message identical (ignoring case) to the player's previous message. Bypass with `essentials.chat.bypass.same.message` |

<CalloutContainer type="info">

<CalloutTitle>Dynamic Cooldown</CalloutTitle>

<CalloutDescription>
With the default rules, a player who sends:
- **2** messages within **1.5 seconds**,
- **4** messages within **12 seconds**,
- or **10** messages within **60 seconds**

must wait until the corresponding window has elapsed before sending another message. The waiting time is displayed to the player.
</CalloutDescription>

</CalloutContainer>

### Local Chat

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-local-chat` | Boolean | `false` | Enable local chat: messages are only visible to players in the same world within `local-chat-distance` blocks. A message starting with `!` is sent to everyone (the `!` is removed) |
| `local-chat-distance` | Double | `100` | Maximum distance in blocks of local chat messages |

### Chat Formats

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chat-formats` | List | *(see above)* | Formats with a `priority`, a `permission` and a `format` |
| `chat-formats[].priority` | Integer | - | Among the formats whose permission the player has, the one with the **highest** priority is used |
| `chat-formats[].permission` | String | - | Permission required for this format |
| `chat-formats[].format` | String | - | MiniMessage format. Placeholders: `%player%`, `%displayName%`, `<message>` (the message, **not** `%message%`), `%moderator_action%` and PlaceholderAPI placeholders |
| `default-chat-format` | String | *(see above)* | Format used when the player has none of the `chat-formats` permissions |
| `moderator-action` | String | *(see above)* | Text inserted in place of `%moderator_action%` for viewers with `essentials.chat.moderator` (empty for the others). By default, a button that runs `/sc %player%` |

### Links

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-link-transform` | Boolean | `true` | Turn the `http://` and `https://` URLs of players with `essentials.chat.link` into clickable links. The player also needs `essentials.chat.click` |
| `link-transform` | String | *(see above)* | MiniMessage format of a transformed link. `%url%` is replaced by the URL |

<CalloutContainer type="info">

<CalloutDescription>
Since 1.0.3.6, URLs containing `~`, `+` or `#` are correctly detected, and special characters in a URL no longer break the replacement.
</CalloutDescription>

</CalloutContainer>

### Ping (@Mention)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-ping` | Boolean | `true` | Enable pings: typing `@<name>` (3 to 16 characters) highlights the name in the message |
| `enable-player-ping-sound` | Boolean | `true` | Global toggle of the ping sound. When `true`, each player can still disable it for themselves with `/pingsound` |
| `player-ping-sound` | String | `BLOCK_NOTE_BLOCK_PLING` | Sound played to the pinged player. Resolved through the zMenu XSound API, so it works on every supported version. A name unknown to XSound is played as a custom (resource pack) sound |
| `player-ping-sound-volume` | Float | `0.8` | Volume of the ping sound |
| `player-ping-sound-pitch` | Float | `1` | Pitch of the ping sound |
| `player-ping-color` | String | `<red>%name%</red><red>` | How the pinged player sees the mention. `%name%` is replaced by `@<name>` |
| `player-ping-color-other` | String | `<white>%name%</white>` | How the other players see the mention |

<CalloutContainer type="info">

<CalloutDescription>
Before 1.0.3.8, the ping sound did not play on Paper 1.21.3+ (`org.bukkit.Sound` became an interface) and `enable-player-ping-sound` was ignored. Both are fixed.
</CalloutDescription>

</CalloutContainer>

### Chat Placeholders

Custom keywords replaced in chat messages.

| Option | Type | Description |
|--------|------|-------------|
| `chat-placeholders[].name` | String | Unique name of the placeholder: lowercase letters, digits, `_` and `-` only |
| `chat-placeholders[].regex` | String | Regex matched in the message (e.g. `(?i)\\[ping\\]` for `[ping]`) |
| `chat-placeholders[].result` | String | Replacement text. Supports colors, MiniMessage, `%player%` and PlaceholderAPI placeholders (resolved for the sender) |
| `chat-placeholders[].permission` | String | Permission associated with the placeholder |

### Item Display

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `item-placeholder.enable` | Boolean | `true` | Enable the item display |
| `item-placeholder.regex` | String | `(?i)\\[item\\]\|\\[i\\]` | Text replaced by the item held in the main hand (`[item]` or `[i]`) |
| `item-placeholder.result` | String | `&bx<amount> &f<item>` | Display of the item. `<amount>` and `<item>` are replaced. Hovering shows the item tooltip, clicking opens a preview of the item (via `/showitem`, valid 5 minutes) |
| `item-placeholder.permission` | String | `zessentials.chat.placeholder.item` | Permission associated with the item display |
| `item-placeholder.item-name-regex` | String | *(see above)* | Regex the item name must match; otherwise the message is refused. Defaults to `alphanumeric-regex` when missing |

### Command Placeholder

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `command-placeholder.enable` | Boolean | `true` | Turn `./<command>` (ended by a `.` or the end of the message) into a clickable text that suggests `/<command>` |
| `command-placeholder.result` | String | *(see above)* | Display of the command. `%command%` is the command, `%fixed_command%` the command with escaped quotes |
| `command-placeholder.permission` | String | `zessentials.chat.placeholder.command` | Permission associated with the command placeholder |
| `command-placeholder.enable-replace-all-message` | Boolean | `false` | Also transform commands in every message sent to players. Requires ProtocolLib and Paper |

### Custom Rules

Regex rules checked before every other filter. When a rule matches, the message is cancelled and the rule `message` is sent to the player.

| Option | Type | Description |
|--------|------|-------------|
| `custom-rules[].regex` | String | Regex matched against the message |
| `custom-rules[].permission` | String | Optional. When set, the rule is **only applied to players who have this permission**; when omitted, the rule applies to everyone |
| `custom-rules[].message` | String | Message sent to the player when the rule blocks a message |

<CalloutContainer type="warning">

<CalloutDescription>
Despite its name, the `essentials.chat.bypass.custom.rules` permission used in the default file does not exempt players from a rule: a rule with a `permission` only applies to players who **have** it. To apply a rule to every player, remove its `permission` line.
</CalloutDescription>

</CalloutContainer>

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/chathistory <player> [page]` | `ct` | `essentials.chat.history` | Show the stored messages of a player (10 per page). Requires `enable-chat-messages` and a SQL storage |
| `/chatclear` | `cl` | `essentials.chat.clear` | Clear the chat for all players |
| `/chatenable` | `ce` | `essentials.chat.enable` | Enable the chat after it has been disabled |
| `/chatdisable` | `cd` | `essentials.chat.disable` | Disable the chat (bypass with `essentials.chat.bypass.disable`) |
| `/broadcast <message>` | `bc` | `essentials.chat.broadcast` | Broadcast a message to all players |
| `/pingsound` | `pingsounds` | `essentials.ping.sound` | Toggle the chat ping sound for yourself |
| `/pub <message>` | - | `essentials.pub` | Send a highlighted advertisement message to all players. Messages matching `pub-regex` are refused |
| `/showitem <code>` | - | `essentials.show.item` | Open the preview of an item shown in chat (used by the click of `[item]`) |

<CalloutContainer type="info">

<CalloutDescription>
The chat history command is `/chathistory` (alias `/ct`). `/sc` is the alias of `/sanction`, used by the default `moderator-action`.
</CalloutDescription>

</CalloutContainer>

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

The Chat module does not register dedicated PlaceholderAPI placeholders. However, any PlaceholderAPI placeholder can be used in chat formats, `moderator-action` and chat placeholders.

For the full placeholder list, see [Placeholders](../placeholders).

---

## Feature Details

### Priority-Based Chat Formatting

Among the `chat-formats` entries whose permission the player has, the one with the **highest** `priority` is used. If the player has none of them, `default-chat-format` is used.

```yaml
chat-formats:
  - priority: 1
    permission: "essentials.chat.format.vip"
    format: "<gold>[VIP] <yellow>%player% <dark_gray>» <white><message>"
  - priority: 2
    permission: "essentials.chat.format.admin"
    format: "<red>[Admin] <white>%player% <dark_gray>» <white><message>"

default-chat-format: "<gray>%player% <dark_gray>» <white><message>"
```

A player with both `essentials.chat.format.vip` and `essentials.chat.format.admin` uses the admin format (priority `2`).

<CalloutContainer type="warning">

<CalloutDescription>
The message is inserted with the `<message>` tag, not `%message%`.
</CalloutDescription>

</CalloutContainer>

### Local Chat

When `enable-local-chat` is `true`, messages are only delivered to players in the same world within `local-chat-distance` blocks of the sender. Start a message with `!` to send it to the whole server, for example `!Hello everyone`.

### Ping Sound

When a player is mentioned with `@<name>`, the configured sound is played to them. Players who find it annoying can run `/pingsound` to disable it for themselves (the choice is saved); running it again re-enables it. Set `enable-player-ping-sound: false` to disable the sound for everyone.

### Custom Chat Placeholders

```yaml
chat-placeholders:
  - name: "money"
    regex: "(?i)\\[money\\]"
    result: "%zessentials_user_formatted_balance_money%"
    permission: "zessentials.chat.placeholder.money"
```

When a player types `[money]` in chat, it is replaced with their formatted balance.

### Moderator Action Button

Viewers with the `essentials.chat.moderator` permission see the `moderator-action` text in place of `%moderator_action%`. By default it is a red `✗` button that runs `/sc <player>` to open the sanction GUI of the sender.
