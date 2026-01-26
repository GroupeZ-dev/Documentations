---
sidebar_position: 11
title: DYNAMIC_PAGINATION Button
description: Display dynamic paginated content from data sources
---

# DYNAMIC_PAGINATION Button Type

:::warning zMenu+ Required
This button type requires [zMenu+](../../../zmenu-plus) to work.
:::

The `DYNAMIC_PAGINATION` button type allows you to display dynamically generated paginated content. Unlike regular `PAGINATION`, this type can pull content from external data sources, placeholders, or plugin integrations.

## Usage

```yaml
items:
  dynamic-list:
    type: DYNAMIC_PAGINATION
    slots:
      - 10-16
      - 19-25
    source: "players"
    item:
      material: PLAYER_HEAD
      player-head: "%entry_name%"
      name: "&a%entry_name%"
```

## Configuration

| Property | Description | Required |
|----------|-------------|----------|
| `type` | Must be `DYNAMIC_PAGINATION` | Yes |
| `slots` | Slots where paginated items appear | Yes |
| `source` | Data source identifier | Yes |
| `item` | Item template for each entry | Yes |

## Example

### Player List

```yaml
size: 54
name: "&8Online Players"

items:
  player-list:
    type: DYNAMIC_PAGINATION
    slots:
      - 10-16
      - 19-25
      - 28-34
    source: "online_players"
    item:
      material: PLAYER_HEAD
      player-head: "%entry_name%"
      name: "&a&l%entry_name%"
      lore:
        - "&7Click to view profile"
    actions:
      - type: player-command
        commands:
          - "profile %entry_name%"

  # Navigation
  previous:
    type: PREVIOUS
    slot: 48
    is-permanent: true
    item:
      material: ARROW
      name: "&c&lPrevious"

  next:
    type: NEXT
    slot: 50
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lNext"

  # Page info
  info:
    slot: 49
    is-permanent: true
    item:
      material: PAPER
      name: "&7Page %page%/%max_page%"
```

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%entry_name%` | Entry name/identifier |
| `%entry_index%` | Entry index in the list |
| `%page%` | Current page number |
| `%max_page%` | Total number of pages |

## Next Steps

- Learn about [PAGINATION](./pagination) for static pagination
- See [INPUT](./input) for player input handling
