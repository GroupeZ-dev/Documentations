---
sidebar_position: 1
title: NONE Button
description: The default button type with no special behavior
---

# NONE Button Type

The `NONE` type is the default button type. It displays an item and executes actions when clicked, with no special built-in behavior.

## Usage

```yaml
items:
  my-button:
    type: NONE  # Optional - NONE is the default
    slot: 13
    item:
      material: DIAMOND
      name: "&b&lMy Button"
    actions:
      - type: message
        messages:
          - "&aYou clicked the button!"
```

Since `NONE` is the default, you can omit the `type` property:

```yaml
items:
  my-button:
    slot: 13
    item:
      material: DIAMOND
      name: "&b&lMy Button"
```

## When to Use

Use `NONE` buttons for:
- Displaying information
- Executing commands
- Opening links
- Sending messages
- Playing sounds
- Any custom action

## Examples

### Information Display

```yaml
items:
  info:
    slot: 4
    item:
      material: BOOK
      name: "&6&lServer Information"
      lore:
        - "&7Welcome to our server!"
        - ""
        - "&7Players online: &a%server_online%"
        - "&7Your rank: &e%luckperms_primary_group_name%"
```

### Command Executor

```yaml
items:
  spawn:
    slot: 11
    item:
      material: RED_BED
      name: "&c&lSpawn"
      lore:
        - "&7Teleport to spawn"
    actions:
      - type: close
      - type: player-command
        commands:
          - "spawn"
```

### Link Button

```yaml
items:
  website:
    slot: 15
    open-link: "https://myserver.com"
    item:
      material: PAPER
      name: "&a&lWebsite"
      lore:
        - "&7Click to visit our website"
```

### Interactive Button with Feedback

```yaml
items:
  reward:
    slot: 22
    item:
      material: CHEST
      name: "&e&lDaily Reward"
      lore:
        - "&7Click to claim your daily reward!"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%dailyreward_claimed%"
          compare: "equals_string"
          target: "false"
          deny:
            - type: message
              messages:
                - "&cYou already claimed today's reward!"
      success:
        - type: console-command
          commands:
            - "dailyreward claim %player%"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
        - type: message
          messages:
            - "&aReward claimed!"
```

## Properties

All standard button properties work with `NONE` buttons:

| Property | Description |
|----------|-------------|
| `slot` / `slots` | Position(s) in inventory |
| `item` | Visual appearance |
| `actions` | Actions on click |
| `click-requirement` | Conditions to click |
| `view-requirement` | Conditions to see |
| `sound` | Sound on click |
| `messages` | Messages on click |
| `close-inventory` | Close after click |
| `refresh-on-click` | Refresh inventory |
| `update-on-click` | Update button |
| `is-permanent` | Show on all pages |
| `page` | Show on specific page |
| `else` | Alternative when hidden |

## Next Steps

- Learn about [INVENTORY](./inventory) buttons to open other menus
- Explore [BACK](./back) buttons for navigation
- See all available [Actions](../actions)
