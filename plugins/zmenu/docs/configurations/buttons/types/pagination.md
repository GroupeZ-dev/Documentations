---
sidebar_position: 10
title: PAGINATION Button
description: Display paginated content in your menus
---

# PAGINATION Button Type

:::warning zMenu+ Required
This button type requires [zMenu+](../../../zmenu-plus) to work.
:::

The `PAGINATION` button type allows you to display paginated content in your menus. It automatically handles pagination of items across multiple pages.

## Usage

```yaml
items:
  paginated-items:
    type: PAGINATION
    slots:
      - 10-16
      - 19-25
      - 28-34
    elements:
      - display_name: "Diamond"
      - display_name: "Emerald"
    item:
      material: STONE
      name: "&7%display_name%"
```

## Configuration

| Property | Description | Required |
|----------|-------------|----------|
| `type` | Must be `PAGINATION` | Yes |
| `slots` | Slots where paginated items appear | Yes |
| `elements` | List of data for each entry | Yes |
| `item` | Item template for each entry | Yes |

:::tip
If a key in `elements` contains a list (e.g., for lore), the values will be joined with newlines. You can use these keys as placeholders in your `item` configuration.
:::

## Example

### Basic Pagination

```yaml
size: 54
name: "&8Paginated Menu"

items:
  # Paginated content area
  content:
    type: PAGINATION
    slots:
      - 10-16
      - 19-25
      - 28-34
    elements:
      - display_name: "Diamond"
        lore_value: "Valuable"
      - display_name: "Emerald"
        lore_value: "Traded"
    item:
      material: PAPER
      name: "&e&l%display_name%"
      lore:
        - "&7This item is %lore_value%"
```
  # Navigation buttons
  previous:
    type: PREVIOUS
    slot: 48
    is-permanent: true
    item:
      material: ARROW
      name: "&c&lPrevious Page"

  next:
    type: NEXT
    slot: 50
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lNext Page"
```

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%index%` | Current item index |
| `%page%` | Current page number |
| `%max_page%` | Total number of pages |

## Next Steps

- Learn about [DYNAMIC_PAGINATION](./dynamic-pagination) for dynamic content
- See [NEXT](./next) and [PREVIOUS](./previous) for navigation buttons
