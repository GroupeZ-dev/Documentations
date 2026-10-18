---
title: Custom Commands Module
description: Create your own commands to display links, information, titles or run zMenu actions
---

# Custom Commands Module

**File:** `modules/customcommands/config.yml`

The Custom Commands module lets you create your own commands without any other plugin. It is perfect for informational commands such as `/discord`, `/map`, `/vote`, `/store` or `/updates`: each command can display messages in the chat, the action bar, a title or a boss bar, show clickable links, use PlaceholderAPI placeholders, and run zMenu actions (sound, command, open an inventory, ...).

---

## Source Configuration

```yaml
enable: true

# Every command you create here.
#
# command:     the command, without the slash. Required.
#              A command that already exists in zEssentials will be ignored, check your console on startup.
# aliases:     other names for the command. Optional.
# permission:  the permission needed to use the command. Optional, empty means everyone can use it.
# description: the description of the command, displayed in the tab completion of some server softwares. Optional.
# cooldown:    time in seconds between two uses of the command, 0 to disable.
#              Players with the permission essentials.bypass.cooldown are not affected.
# type:        how the content is displayed:
#              TCHAT   - in the chat, the default value
#              CENTER  - in the chat, but centered
#              ACTION  - in the action bar
#              TITLE   - as a title, uses title, subtitle, start, time and end
#              BOSSBAR - as a boss bar, uses text, color, overlay, flags and duration
#              NONE    - displays nothing, only runs the actions
# messages:    the lines to display, used by TCHAT, CENTER and ACTION.
# actions:     zMenu actions run after the messages, for example a sound or another command.
#
# MiniMessage, legacy colors and PlaceholderAPI placeholders are supported everywhere.
# <click:open_url:'...'> and <hover:show_text:'...'> allow to create clickable links.

commands:

  - command: "discord"
    aliases: [ "dc" ]
    permission: ""
    cooldown: 3
    type: TCHAT
    messages:
      - ""
      - "<primary>Join our Discord server:"
      - "<click:open_url:'https://discord.gg/your-invite'><hover:show_text:'&fClick to open the invitation'><secondary>https://discord.gg/your-invite</secondary></hover></click>"
      - ""
    actions:
      - type: sound
        sound: ENTITY_EXPERIENCE_ORB_PICKUP

  - command: "map"
    aliases: [ "dynmap", "carte" ]
    cooldown: 3
    type: TCHAT
    messages:
      - ""
      - "<primary>Our live map:"
      - "<click:open_url:'https://map.example.com'><hover:show_text:'&fClick to open the map'><secondary>https://map.example.com</secondary></hover></click>"
      - ""

  - command: "updates"
    permission: ""
    type: CENTER
    messages:
      - "&8&m-----------------------------------------"
      - "<primary>Latest updates"
      - ""
      - "&7- &fNew shop at the spawn"
      - "&7- &fThe end is now open"
      - "&8&m-----------------------------------------"

  - command: "playerinfo"
    permission: "essentials.playerinfo"
    type: TCHAT
    messages:
      - "<primary>Balance<secondary>: &f%zessentials_user_formatted_balance_money%"
      - "<primary>Playtime<secondary>: &f%zessentials_user_playtime_formatted%"

# Example with a title
#  - command: "welcome"
#    type: TITLE
#    title: "<primary>Welcome"
#    subtitle: "&fon our server, %player%"
#    start: 100
#    time: 2800
#    end: 100

# Example with a boss bar
#  - command: "event"
#    type: BOSSBAR
#    text: "<primary>An event starts in 5 minutes"
#    color: BLUE
#    overlay: PROGRESS
#    duration: 100

# Example without any message, only actions
#  - command: "shop"
#    type: NONE
#    actions:
#      - type: inventory
#        inventory: my_shop
#        plugin: zMenu
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Custom Commands module |
| `commands` | List | *(see above)* | The list of custom commands |

### Command Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `command` | String | - | **Required.** The command name, without the slash (a leading `/` is removed). It is lowercased and cannot contain spaces |
| `aliases` | List of Strings | `[]` | Other names for the command |
| `permission` | String | *(empty)* | Permission required to use the command. Empty or missing means everyone can use it |
| `description` | String | - | Description of the command, shown in the command help / tab completion of some server softwares |
| `cooldown` | Integer | `0` | Time in seconds between two uses of the command by the same player. `0` disables the cooldown. Players with `essentials.bypass.cooldown` are not affected (when `enable-cooldown-bypass` is `true` in `config.yml`) |
| `type` | String | `TCHAT` | How the content is displayed: `TCHAT`, `CENTER`, `ACTION`, `TITLE`, `BOSSBAR` or `NONE`. An unknown type falls back to `TCHAT` with an error in the console |
| `messages` | List of Strings | `[]` | The lines to display, used by `TCHAT`, `CENTER` and `ACTION` |
| `actions` | List | `[]` | zMenu actions run after the messages |

### Display Types

| Type | Description | Used keys |
|------|-------------|-----------|
| `TCHAT` | Sends each line of `messages` in the chat (default) | `messages` |
| `CENTER` | Sends each line of `messages` centered in the chat. Placeholders are resolved before centering | `messages` |
| `ACTION` | Joins `messages` with spaces and displays it in the action bar | `messages` |
| `TITLE` | Displays a title and a subtitle | `title`, `subtitle`, `start`, `time`, `end` |
| `BOSSBAR` | Displays a boss bar that empties over its duration | `text`, `color`, `overlay`, `flags`, `duration` |
| `NONE` | Displays nothing, only runs the `actions` | - |

#### `TITLE` Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | String | `""` | Title text |
| `subtitle` | String | `""` | Subtitle text |
| `start` | Integer | `100` | Fade-in duration, in milliseconds |
| `time` | Integer | `2800` | Display duration, in milliseconds |
| `end` | Integer | `100` | Fade-out duration, in milliseconds |

#### `BOSSBAR` Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | String | `""` | Boss bar text |
| `color` | String | `WHITE` | Bar color: `PINK`, `BLUE`, `RED`, `GREEN`, `YELLOW`, `PURPLE`, `WHITE` |
| `overlay` | String | `PROGRESS` | Bar style: `PROGRESS`, `NOTCHED_6`, `NOTCHED_10`, `NOTCHED_12`, `NOTCHED_20` |
| `flags` | List of Strings | `[]` | Optional flags: `DARKEN_SCREEN`, `PLAY_BOSS_MUSIC`, `CREATE_WORLD_FOG` |
| `duration` | Integer | `60` | Display duration, in **ticks** (20 ticks = 1 second) |

A boss bar with an invalid color, overlay or flag is refused and the command is not registered.

---

## Text Formatting

- **MiniMessage** (`<red>`, `<gradient:...>`, `<primary>`, `<secondary>`, ...) and **legacy colors** (`&a`, `&l`, ...) are supported.
- **PlaceholderAPI** placeholders are resolved for the player who runs the command, for example `%zessentials_user_formatted_balance_money%`. To display the player's name, use `%player_name%` (PlaceholderAPI Player expansion).
- **Clickable links** are created with `<click:open_url:'...'>` and `<hover:show_text:'...'>`:

```yaml
messages:
  - "<click:open_url:'https://store.example.com'><hover:show_text:'&fOpen the store'><secondary>store.example.com</secondary></hover></click>"
```

<CalloutContainer type="info">

<CalloutDescription>
You can also use `<click:run_command:'/...'>` or `<click:suggest_command:'/...'>` to make a line run or suggest another command.
</CalloutDescription>

</CalloutContainer>

---

## zMenu Actions

`actions` uses the same format as the actions of zMenu inventories. They are run **after** the messages, only when the command is executed by a player (they are skipped from the console). The `%player%` placeholder is available in actions.

```yaml
  - command: "shop"
    type: NONE
    actions:
      - type: inventory
        inventory: my_shop
        plugin: zMenu
```

Common actions are `sound`, `message`, `player_command`, `console_command` and `inventory`. See the zMenu documentation for the complete list of actions and their options.

---

## How It Works

1. On startup, each entry of `commands` is validated and registered as a real server command, with its aliases.
2. A command that **already exists in zEssentials** (including aliases) is refused with an error in the console, so a custom command can never override a zEssentials command. An alias that conflicts with a zEssentials command is ignored the same way.
3. An entry without a valid `command`, or with nothing to display and no action, is ignored with an error in the console.
4. When a player runs the command, the permission and the cooldown are checked, the content is displayed, then the actions are run.
5. On `/zessentials reload` (alias `/ess rl`), the custom commands are unregistered then registered again from the configuration: new commands are added, modified ones are updated and removed ones disappear, without any duplicate. The command list of online players is refreshed, so tab completion is immediately up to date.

<CalloutContainer type="info">

<CalloutDescription>
Custom commands are not configurable in `commands.yml`: everything is defined in `modules/customcommands/config.yml`.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutDescription>
Only zEssentials commands are protected. If a custom command has the same name as a command of another plugin, rename it or use an alias to avoid conflicts.
</CalloutDescription>

</CalloutContainer>

---

## Permissions

| Permission | Description |
|------------|-------------|
| `permission` of each command | Required to use that command (if set) |
| `essentials.bypass.cooldown` | Ignore the `cooldown` of every custom command |

---

## Examples

### Store Link with Sound

```yaml
commands:
  - command: "store"
    aliases: [ "shop", "boutique" ]
    description: "Open the store link"
    cooldown: 5
    type: TCHAT
    messages:
      - "<primary>Support the server on our store:"
      - "<click:open_url:'https://store.example.com'><hover:show_text:'&fClick to open the store'><secondary>https://store.example.com</secondary></hover></click>"
    actions:
      - type: sound
        sound: ENTITY_EXPERIENCE_ORB_PICKUP
```

### Title Announcement

```yaml
commands:
  - command: "welcome"
    type: TITLE
    title: "<primary>Welcome"
    subtitle: "&fon our server, %player_name%"
    start: 100
    time: 2800
    end: 100
```

### Boss Bar Restricted by Permission

```yaml
commands:
  - command: "event"
    permission: "essentials.custom.event"
    type: BOSSBAR
    text: "<primary>An event starts in 5 minutes"
    color: BLUE
    overlay: PROGRESS
    duration: 100
```
