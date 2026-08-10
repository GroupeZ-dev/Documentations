---
sidebar_position: 8
title: Dialogues
description: Create interactive dialog popups with forms, confirmations, and multi-action buttons
---

# Dialogues

Dialogues are interactive popup windows that appear on screen, allowing players to interact with forms, confirmations, and action buttons. They provide a modern UI experience beyond traditional inventory menus.

:::warning Requirements
Dialogues require **Paper 1.21.7+**.
:::

## File Location

Dialogues are stored in the `plugins/zMenu/dialogs/` folder. Each YAML file represents one dialogue.

```
plugins/zMenu/dialogs/
├── welcome.yml
├── confirmation.yml
├── server-links.yml
└── feedback-form.yml
```

## Dialog Types

zMenu supports four dialog types:

| Type | Description |
|------|-------------|
| `notice` | Simple informational dialog with a body and optional inputs |
| `confirmation` | Yes/No confirmation dialog |
| `multi_action` | Multiple action buttons in a grid layout |
| `server_links` | Display server links as clickable buttons |

## Basic Structure

```yaml
name: "&6&lDialog Title"
external_title: "Window Title"
type: notice

can-close-with-escape: true
pause: false
after_action: CLOSE

body:
  # Body content sections...

inputs:
  # Input fields...
```

## Configuration Options

### name

The internal name of the dialog, displayed with color formatting.

```yaml
name: "&6&lWelcome Dialog"
```

### external_title

The window title shown in the dialog header.

```yaml
external_title: "Server Information"
```

### type

The dialog type. See [Dialog Types](#dialog-types) for details.

```yaml
type: notice
```

### can-close-with-escape

Allow players to close the dialog by pressing Escape.

```yaml
can-close-with-escape: true
```

### pause

Pause the game while the dialog is open (singleplayer-like behavior).

```yaml
pause: false
```

### after_action

What happens after an action is performed.

| Value | Description |
|-------|-------------|
| `CLOSE` | Close the dialog |
| `PAUSE` | Keep dialog open |
| `NONE` | Do nothing |

```yaml
after_action: CLOSE
```

---

## Body Content

The `body` section defines what content appears in the dialog. You can combine multiple content types.

### plain_message

Display text messages.

```yaml
body:
  welcome:
    type: plain_message
    messages:
      - "&6&lWelcome to our server!"
      - ""
      - "&7Server IP: &fplay.example.com"
      - "&7Discord: &fdiscord.gg/example"
    width: 400
```

### item

Display an item with optional tooltip.

```yaml
body:
  featured-item:
    type: item
    item:
      material: DIAMOND_SWORD
      name: "&b&lLegendary Sword"
      lore:
        - "&7A powerful weapon"
    show-decoration: true
    show-tooltip: true
    width: 200
    height: 150
```

---

## Input Fields

Dialogues can include interactive input fields in the `inputs` section.

### dialog_text

A text input field.

```yaml
inputs:
  feedback:
    type: dialog_text
    label: "&6Share your thoughts:"
    width: 400
    max-length: 200
    multiline:
      max-lines: 4
```

**Options:**

| Option | Type | Description |
|--------|------|-------------|
| `label` | String | Label displayed above the input |
| `width` | Integer | Width of the input field |
| `max-length` | Integer | Maximum character count |
| `multiline.max-lines` | Integer | Number of lines for multiline input |

### dialog_boolean

A Yes/No toggle.

```yaml
inputs:
  subscribe:
    type: dialog_boolean
    label: "&eWould you like updates?"
    text-true: "&a&lYES"
    text-false: "&c&lNo"
```

### dialog_single_option

A single selection from multiple options.

```yaml
inputs:
  gamemode:
    type: dialog_single_option
    label: "&6Select your gamemode:"
    options:
      survival:
        id: "survival"
        display: "&2Survival"
      creative:
        id: "creative"
        display: "&bCreative"
      adventure:
        id: "adventure"
        display: "&6Adventure"
```

### dialog_number_range

A numeric slider.

```yaml
inputs:
  amount:
    type: dialog_number_range
    label: "&eSelect amount:"
    start: 1
    end: 64
    step: 1
```

---

## Dynamic Buttons

Dynamic buttons generate several body sections or inputs from a single template, repeated over a numeric range. They are useful when the number of elements depends on data (a placeholder) or when you would otherwise copy/paste the same block many times.

Both dynamic types share these options:

| Option  | Type    | Description                                   |
|---------|---------|-----------------------------------------------|
| `start` | Integer | First index, inclusive. Placeholder-aware.    |
| `end`   | Integer | Last index, inclusive. Placeholder-aware.     |

Inside the repeated template, the `%index%` placeholder is replaced with the current iteration number.

### dialog-dynamic-body-button

Placed in the `body:` section. Repeats a `body:` element (e.g. `dialog_plain_message`, `dialog_item`).

```yaml
body:
  dynamic_message:
    type: dialog-dynamic-body-button
    start: 1
    end: 5
    body:
      type: dialog_plain_message
      messages:
        - "&eThis is body section #%index%"
      width: 300
```

### dialog-dynamic-input-button

Placed in the `inputs:` section. Repeats an `input:` element (e.g. `dialog_text`, `dialog_boolean`). Each generated input is keyed `<button-name>_<index>`, so its submitted value is available as the placeholder `%<button-name>_<index>%`.

```yaml
inputs:
  # If the player types "Hello" in the first field, %my_input_1% will be "Hello"
  my_input:
    type: dialog-dynamic-input-button
    start: 1
    end: 3
    input:
      type: dialog_text
      label: "&6Enter value #%index%:"
      width: 300
      max-length: 50
```

See the bundled `dialogs/dynamic-dialog-example.yml` for a complete example.

---

## Notice Dialog

A simple informational dialog with optional inputs.

```yaml
name: "&6&lServer Rules"
external_title: "Rules"
type: notice

can-close-with-escape: true
after_action: CLOSE

body:
  rules:
    type: plain_message
    messages:
      - "&c&lServer Rules"
      - ""
      - "&71. Be respectful to all players"
      - "&72. No cheating or exploits"
      - "&73. Follow staff instructions"
      - "&74. Have fun!"
    width: 350

inputs:
  accept:
    type: dialog_boolean
    label: "&eI agree to the rules"
    text-true: "&a&lAccept"
    text-false: "&c&lDecline"
```

---

## Confirmation Dialog

A dialog with Yes and No buttons.

```yaml
name: "&c&lConfirm Purchase"
external_title: "Confirmation"
type: confirmation

can-close-with-escape: true
after_action: CLOSE

body:
  message:
    type: plain_message
    messages:
      - "&7Are you sure you want to purchase"
      - "&6Diamond Sword &7for &a$500&7?"
    width: 300

confirmation:
  yes-text: "&a&lConfirm Purchase"
  yes-tooltip: "Click to confirm"
  yes-width: 200
  no-text: "&c&lCancel"
  no-tooltip: "Click to cancel"
  no-width: 200

yes-actions:
  1:
    success:
      - type: console-command
        commands:
          - "give %player% diamond_sword 1"
      - type: withdraw
        amount: 500
      - type: message
        messages:
          - "&aPurchase successful!"

no-actions:
  1:
    success:
      - type: message
        messages:
          - "&7Purchase cancelled."
```

### Confirmation Options

| Option | Description |
|--------|-------------|
| `yes-text` | Text on the Yes button |
| `yes-tooltip` | Tooltip when hovering Yes |
| `yes-width` | Width of Yes button |
| `no-text` | Text on the No button |
| `no-tooltip` | Tooltip when hovering No |
| `no-width` | Width of No button |

---

## Multi-Action Dialog

A dialog with multiple action buttons in a grid.

```yaml
name: "&6&lTeleport Menu"
external_title: "Teleport"
type: multi_action

can-close-with-escape: true
after_action: CLOSE
number-of-columns: 2

body:
  header:
    type: plain_message
    messages:
      - "&7Select a destination:"
    width: 300

multi-actions:
  spawn:
    text: "&a&lSpawn"
    tooltip: "&7Teleport to spawn"
    width: 150
    actions:
      1:
        success:
          - type: close
          - type: player-command
            commands:
              - "spawn"
          - type: message
            messages:
              - "&aTeleporting to spawn..."

  shop:
    text: "&e&lShop"
    tooltip: "&7Visit the shop"
    width: 150
    actions:
      1:
        success:
          - type: close
          - type: player-command
            commands:
              - "warp shop"

  pvp:
    text: "&c&lPvP Arena"
    tooltip: "&7Enter the PvP arena"
    width: 150
    actions:
      1:
        success:
          - type: close
          - type: player-command
            commands:
              - "warp pvp"

  home:
    text: "&b&lHome"
    tooltip: "&7Teleport home"
    width: 150
    actions:
      1:
        success:
          - type: close
          - type: player-command
            commands:
              - "home"
```

### Multi-Action Options

| Option | Description |
|--------|-------------|
| `number-of-columns` | Number of buttons per row |
| `multi-actions` | Map of action buttons |
| `text` | Button text |
| `tooltip` | Button tooltip |
| `width` | Button width |
| `actions` | Actions executed on click |

---

## Server Links Dialog

Display server links as clickable buttons.

```yaml
name: "&6&lServer Links"
external_title: "Links"
type: server_links

can-close-with-escape: true
after_action: CLOSE

server-links:
  text: "&6&lUseful Links"
  tooltip: "&7Click to open"
  width: 300
  number-of-columns: 2
  actions:
    1:
      success:
        - type: message
          messages:
            - "&aLink opened!"
```

---

## Action Button Options

Action buttons — the Yes/No buttons of a `confirmation`, a `notice` button, each entry of a `multi_action`, and the `server_links` exit button — share a common set of options.

### type

The kind of action performed when the button is clicked.

| Value          | Description                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `custom-click` | *(default)* Runs the zMenu `actions:` defined on the button.                  |
| `static`       | Runs a native client action (see `static-type` below), without a server round-trip. |

### static-type

Only used when `type: static`. The native client action to perform.

| `static-type`       | Required field | Description                          |
|---------------------|----------------|--------------------------------------|
| `OPEN_URL`          | `url`          | Open a URL in the player's browser   |
| `OPEN_FILE`         | `file`         | Open a local file                    |
| `RUN_COMMAND`       | `command`      | Run a command as the player          |
| `SUGGEST_COMMAND`   | `command`      | Pre-fill the chat box with a command |
| `COPY_TO_CLIPBOARD` | `text`         | Copy text to the clipboard           |

```yaml
multi-actions:
  website:
    text: "&bOur Website"
    type: static
    static-type: OPEN_URL
    url: "https://example.com"
```

### usage-limit

Maximum number of times the button can be activated (default: unlimited).

```yaml
usage-limit: 1
```

### duration-limit

A cooldown between activations. Either a plain number (seconds) or a section with a time unit:

```yaml
duration-limit: 5          # 5 seconds
```

```yaml
duration-limit:
  value: 2
  type: MINUTES            # SECONDS, MILLISECONDS, MINUTES, HOURS, ...
```

### enable-placeholders

Enable placeholder parsing for the button. Accepts a boolean, or a section to toggle it per key.

:::info Backward compatibility
The nested form (`<key>.label`, `<key>.tooltip`, `<key>.width`, `<key>.actions`, `<key>.type`) is the new canonical layout, but the old flat keys (`yes-text`, `notice.text`, `multi-actions.<key>.text`, ...) still work, so existing dialog files do not need to be rewritten.
:::

---

## Opening Dialogs

### From Button Actions

Use the `dialog` action type in inventory buttons:

```yaml
items:
  open-dialog:
    slot: 13
    item:
      material: BOOK
      name: "&6Open Dialog"
    actions:
      - type: dialog
        dialog: "welcome"
```

### With Arguments

Pass arguments to the dialog:

```yaml
actions:
  - type: dialog
    dialog: "confirmation"
    arguments:
      - "diamond_sword"
      - "500"
```

### From External Plugin

Open a dialog from another plugin:

```yaml
actions:
  - type: dialog
    dialog: "my-dialog"
    plugin: "MyPlugin"
```

---

## Complete Examples

### Feedback Form

```yaml
name: "&6&lFeedback Form"
external_title: "Share Your Feedback"
type: notice

can-close-with-escape: true
after_action: CLOSE

body:
  header:
    type: plain_message
    messages:
      - "&6&lWe Value Your Feedback!"
      - ""
      - "&7Please share your thoughts about the server."
    width: 400

inputs:
  rating:
    type: dialog_single_option
    label: "&eHow would you rate your experience?"
    options:
      excellent:
        id: "5"
        display: "&a⭐⭐⭐⭐⭐ Excellent"
      good:
        id: "4"
        display: "&e⭐⭐⭐⭐ Good"
      average:
        id: "3"
        display: "&6⭐⭐⭐ Average"
      poor:
        id: "2"
        display: "&c⭐⭐ Poor"

  comments:
    type: dialog_text
    label: "&7Additional comments:"
    width: 400
    max-length: 500
    multiline:
      max-lines: 5

  subscribe:
    type: dialog_boolean
    label: "&eReceive updates about new features?"
    text-true: "&aYes, keep me updated!"
    text-false: "&7No thanks"
```

### Kit Selection

```yaml
name: "&6&lSelect Your Kit"
external_title: "Kit Selection"
type: multi_action

can-close-with-escape: false
after_action: CLOSE
number-of-columns: 3

body:
  info:
    type: plain_message
    messages:
      - "&7Choose your starting kit wisely!"
      - "&7This cannot be changed later."
    width: 400

multi-actions:
  warrior:
    text: "&c&lWarrior"
    tooltip: "&7Iron armor and sword"
    width: 120
    actions:
      1:
        success:
          - type: console-command
            commands:
              - "kit warrior %player%"
          - type: message
            messages:
              - "&aYou selected the Warrior kit!"

  archer:
    text: "&a&lArcher"
    tooltip: "&7Leather armor and bow"
    width: 120
    actions:
      1:
        success:
          - type: console-command
            commands:
              - "kit archer %player%"
          - type: message
            messages:
              - "&aYou selected the Archer kit!"

  mage:
    text: "&5&lMage"
    tooltip: "&7Robes and magic items"
    width: 120
    actions:
      1:
        success:
          - type: console-command
            commands:
              - "kit mage %player%"
          - type: message
            messages:
              - "&aYou selected the Mage kit!"
```

---

## Best Practices

1. **Keep dialogs focused** - One purpose per dialog
2. **Use clear labels** - Make inputs easy to understand
3. **Provide tooltips** - Help players understand button actions
4. **Test on target version** - Ensure Paper 1.21.4+ and PacketEvents are installed
5. **Handle all outcomes** - Define actions for all possible choices
6. **Use appropriate types** - Choose the right dialog type for your use case

## Next Steps

- Learn about [Actions](./buttons/actions) for dialog button behaviors
- Configure [Requirements](./buttons/button#requirements) for conditional dialog access
- See [Inventories](./inventories/inventory) for traditional menu alternatives
