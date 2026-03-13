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
    inputType: TEXT
    conditions:
      regex: "^[a-zA-Z0-9]*$"
    success-actions:
      - type: message
        messages: ["&aValid input: %input%"]
    error-actions:
      - type: message
        messages: ["&cInvalid input! Only alphanumeric characters allowed."]
    item:
      material: NAME_TAG
      name: "&a&lEnter Text"
```

## Configuration

| Property | Description | Required |
|----------|-------------|----------|
| `type` | Must be `INPUT` | Yes |
| `inputType` | Type of input (`TEXT`, `NUMBER`, `LONG`, `DECIMAL`) | No (Default: `TEXT`) |
| `conditions.regex` | Regex to validate input | No |
| `conditions.min` | Minimum value/length | No (Default: 0) |
| `conditions.max` | Maximum value/length | No (Default: 0) |
| `success-actions` | Actions to execute on valid input | No |
| `error-actions` | Actions to execute on invalid input | No |
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
    inputType: TEXT
    conditions:
      min: 3
      max: 16
      regex: "^[a-zA-Z0-9_]*$"
    success-actions:
      - type: console-command
        commands:
          - "nick %player% %input%"
      - type: message
        messages:
          - "&aYour nickname has been changed to &e%input%"
    error-actions:
      - type: message
        messages:
          - "&cInvalid nickname! Must be 3-16 alphanumeric characters."
    item:
      material: NAME_TAG
      name: "&a&lChange Nickname"
      lore:
        - "&7Click to change your display name"

  back:
    type: BACK
    slot: 22
    item:
      material: ARROW
      name: "&c&lBack"
```

### Amount Input

```yaml
items:
  set-amount:
    type: INPUT
    slot: 13
    inputType: NUMBER
    conditions:
      min: 1
      max: 64
    success-actions:
      - type: data
        key: "amount"
        value: "%input%"
      - type: message
        messages: ["&aAmount set to %input%"]
      - type: refresh
    error-actions:
      - type: message
        messages: ["&cPlease enter a number between 1 and 64"]
    item:
      material: HOPPER
      name: "&6&lSet Amount"
      lore:
        - "&7Current: &e%amount%"
        - "&7Click to change"
```

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%input%` | The text entered by the player |

## Notes

- The inventory will close when the player needs to type
- Validate input using `conditions` with regex, min, or max values
- Use `%input%` in your actions to access the player's text

## Next Steps

- Learn about [Actions](../actions) to handle input
- See [NONE](./none) for standard buttons
