---
sidebar_position: 3
title: BACK Button
description: Button that returns to the previous inventory
---

# BACK Button Type

The `BACK` button type returns the player to the previously opened inventory. zMenu maintains a history of opened inventories, allowing seamless navigation.

## Usage

```yaml
items:
  back:
    type: BACK
    slot: 45
    item:
      material: ARROW
      name: "&c&lBack"
      lore:
        - "&7Return to previous menu"
```

## How It Works

1. Player opens Menu A
2. Player clicks to open Menu B (history: [Menu A])
3. Player clicks to open Menu C (history: [Menu A, Menu B])
4. Player clicks BACK button → Returns to Menu B
5. Player clicks BACK button → Returns to Menu A

If there's no previous inventory in history, clicking a BACK button does nothing.

## Properties

The `BACK` button accepts all standard button properties:

| Property | Description |
|----------|-------------|
| `slot` / `slots` | Position(s) in inventory |
| `item` | Visual appearance |
| `sound` | Sound on click |
| `is-permanent` | Show on all pages |
| `view-requirement` | Conditions to see |

## Examples

### Basic Back Button

```yaml
items:
  back:
    type: BACK
    slot: 45
    item:
      material: ARROW
      name: "&c&lBack"
    sound: UI_BUTTON_CLICK
```

### Styled Back Button

```yaml
items:
  back:
    type: BACK
    slot: 45
    item:
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYmQ2OWUwNmU1ZGFkZmQ4NGU1ZjNkMWMyMTA2M2YyNTUzYjJmYTk0NWVlMWQ0ZDcxNTJmZGM1NDI1YmMxMmE5In19"
      name: "&c&l← Back"
      lore:
        - "&7Return to the previous menu"
    sound: UI_BUTTON_CLICK
```

### Permanent Back Button

```yaml
items:
  back:
    type: BACK
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&lBack"
```

This shows the back button on all pages of a paginated inventory.

### Navigation Bar with Back

```yaml
items:
  back:
    type: BACK
    slot: 45
    item:
      material: ARROW
      name: "&c&lBack"
    sound: UI_BUTTON_CLICK

  home:
    type: HOME
    slot: 49
    item:
      material: NETHER_STAR
      name: "&e&lMain Menu"
    sound: UI_BUTTON_CLICK

  close:
    slot: 53
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lClose"
    sound: UI_BUTTON_CLICK
```

### Conditional Back Button

Only show back button if there's a previous inventory:

```yaml
items:
  back:
    type: BACK
    slot: 45
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_previous_inventories%"
          compare: ">"
          number: 0
    item:
      material: ARROW
      name: "&c&lBack"
    else:
      item:
        material: GRAY_STAINED_GLASS_PANE
        name: "&8"
```

## Alternative: Using Actions

You can also use the `back` action with a regular button:

```yaml
items:
  back:
    slot: 45
    item:
      material: ARROW
      name: "&c&lBack"
    actions:
      - type: back
```

The `BACK` button type is shorthand for this.

## Common Patterns

### Bottom Navigation Bar

```yaml
items:
  nav-border-left:
    slots:
      - 45
      - 46
      - 47
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"

  back:
    type: BACK
    slot: 48
    item:
      material: ARROW
      name: "&c&lBack"

  info:
    slot: 49
    item:
      material: BOOK
      name: "&e&lPage %page%/%maxPage%"

  home:
    type: HOME
    slot: 50
    item:
      material: NETHER_STAR
      name: "&6&lHome"

  nav-border-right:
    slots:
      - 51
      - 52
      - 53
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"
```

## Best Practices

1. **Place consistently** - Put back buttons in the same position across all menus
2. **Use clear icons** - Arrows or left-pointing heads work well
3. **Add sounds** - Provide audio feedback when navigating
4. **Consider HOME** - For deep menu hierarchies, add a HOME button too
5. **Make permanent** - In paginated menus, use `is-permanent: true`

## Related Button Types

- [HOME](./home) - Return to the first inventory in history
- [MAIN_MENU](./mainmenu) - Open the configured main menu
- [INVENTORY](./inventory) - Open a specific inventory

## Next Steps

- Learn about [HOME](./home) buttons
- See [PREVIOUS](./previous) for page navigation
- View all [Button Types](./none)
