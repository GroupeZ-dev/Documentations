---
sidebar_position: 12
title: INPUT Button
description: Capture player text input through chat
---

# INPUT Button Type

:::warning zMenu+ Required
This button type requires [zMenu+](../../../zmenu-plus) to work.
:::

The `INPUT` button type allows you to capture text input from players. When clicked, it closes the inventory and prompts the player to type in chat. The input can then be used in actions or stored for later use.

## Usage

```yaml
items:
  input-button:
    type: INPUT
    slot: 13
    input-message: "&eEnter your nickname:"
    input-cancel: "cancel"
    item:
      material: NAME_TAG
      name: "&a&lChange Nickname"
```

## Configuration

| Property | Description | Required |
|----------|-------------|----------|
| `type` | Must be `INPUT` | Yes |
| `slot` | Button position | Yes |
| `input-message` | Message shown to player when waiting for input | Yes |
| `input-cancel` | Word to type to cancel (default: "cancel") | No |
| `item` | Visual appearance | Yes |

## Example

### Nickname Changer

```yaml
size: 27
name: "&8Change Nickname"

items:
  change-nick:
    type: INPUT
    slot: 13
    input-message:
      - "&7"
      - "&e&lEnter your new nickname"
      - "&7Type your desired nickname in chat"
      - "&7Type &ccancel &7to abort"
      - "&7"
    input-cancel: "cancel"
    item:
      material: NAME_TAG
      name: "&a&lChange Nickname"
      lore:
        - "&7Click to change your display name"
    actions:
      - type: console-command
        commands:
          - "nick %player% %input%"
      - type: message
        messages:
          - "&aYour nickname has been changed to &e%input%"

  back:
    type: BACK
    slot: 22
    item:
      material: ARROW
      name: "&c&lBack"
```

### Search Function

```yaml
items:
  search:
    type: INPUT
    slot: 4
    input-message: "&eEnter search term:"
    input-cancel: "cancel"
    item:
      material: COMPASS
      name: "&e&lSearch"
      lore:
        - "&7Click to search"
    actions:
      - type: inventory
        inventory: "search_results"
        arguments:
          query: "%input%"
```

### Amount Input

```yaml
items:
  set-amount:
    type: INPUT
    slot: 13
    input-message:
      - "&eEnter the amount to purchase:"
      - "&7(1-64)"
    input-cancel: "cancel"
    item:
      material: HOPPER
      name: "&6&lSet Amount"
      lore:
        - "&7Current: &e%amount%"
        - "&7Click to change"
    click-requirement:
      requirements:
        - type: regex
          input: "%input%"
          regex: "^[1-9][0-9]?$|^64$"
          deny:
            - type: message
              messages:
                - "&cPlease enter a number between 1 and 64"
      success:
        - type: data
          key: "amount"
          value: "%input%"
        - type: refresh
```

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%input%` | The text entered by the player |

## Notes

- The inventory will close when the player needs to type
- Use `input-cancel` to allow players to abort the input
- Validate input using `click-requirement` with regex

## Next Steps

- Learn about [Actions](../actions) to handle input
- See [NONE](./none) for standard buttons
