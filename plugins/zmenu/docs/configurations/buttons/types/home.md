---
sidebar_position: 6
title: HOME Button
description: Button that returns to the first inventory in history
---

# HOME Button Type

The `HOME` button type returns the player to the very first inventory they opened in their navigation history. This is useful for deep menu hierarchies where players want to return to the start.

## Usage

```yaml
items:
  home:
    type: HOME
    slot: 49
    item:
      material: NETHER_STAR
      name: "&e&lHome"
      lore:
        - "&7Return to the main menu"
```

## How It Works

Unlike the [BACK](./back) button which goes one step back, `HOME` clears the entire history and returns to the first inventory:

1. Player opens Menu A (root)
2. Player navigates: A → B → C → D
3. Player clicks HOME → Returns directly to Menu A
4. History is cleared

## Difference from BACK and MAIN_MENU

| Button | Behavior |
|--------|----------|
| `BACK` | Goes to the previous inventory (one step) |
| `HOME` | Goes to the first inventory in history |
| `MAIN_MENU` | Opens the configured main menu (may be different) |

## Examples

### Basic Home Button

```yaml
items:
  home:
    type: HOME
    slot: 49
    item:
      material: NETHER_STAR
      name: "&e&lHome"
    sound: ENTITY_ENDERMAN_TELEPORT
```

### Styled Home Button

```yaml
items:
  home:
    type: HOME
    slot: 49
    item:
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzVhMzFjNjQ1MzNlNTRhZmFjZjA0YzNhMTY3YzM4YjBhYjIzMjI3NjdmYjE2MWVmMTU5MjI5YTI4ZmJiN2EifX0="
      name: "&6&l⌂ Home"
      lore:
        - "&7Return to the main menu"
        - ""
        - "&e▸ Click to go home"
    sound: BLOCK_NOTE_BLOCK_CHIME
```

### Navigation Bar with Home

```yaml
items:
  back:
    type: BACK
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&l← Back"
    sound: UI_BUTTON_CLICK

  previous:
    type: PREVIOUS
    slot: 47
    is-permanent: true
    item:
      material: ARROW
      name: "&7Previous"

  home:
    type: HOME
    slot: 49
    is-permanent: true
    item:
      material: NETHER_STAR
      name: "&e&lHome"
    sound: UI_BUTTON_CLICK

  next:
    type: NEXT
    slot: 51
    is-permanent: true
    item:
      material: ARROW
      name: "&7Next"

  close:
    slot: 53
    is-permanent: true
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lClose"
```

### Conditional Home Button

Only show when not at the root menu:

```yaml
items:
  home:
    type: HOME
    slot: 49
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_previous_inventories%"
          compare: ">"
          number: 0
    item:
      material: NETHER_STAR
      name: "&e&lHome"
    else:
      item:
        material: GRAY_STAINED_GLASS_PANE
        name: "&8"
```

## When to Use

Use `HOME` buttons when:
- You have deep menu hierarchies (3+ levels)
- Users need a quick way to restart navigation
- Your menus branch into multiple categories

## Best Practices

1. **Place centrally** - Middle of the navigation bar (slot 49)
2. **Use distinctive icon** - Nether star or house-shaped head
3. **Add to all sub-menus** - Include in every non-root menu
4. **Combine with BACK** - Give users both options
5. **Use `is-permanent: true`** - Always visible on paginated menus

## Related Button Types

- [BACK](./back) - Go back one step
- [MAIN_MENU](./mainmenu) - Open configured main menu
- [INVENTORY](./inventory) - Open specific inventory

## Next Steps

- Learn about [MAIN_MENU](./mainmenu) buttons
- See the [JUMP](./jump) button for page navigation
- View all [Button Types](./none)
