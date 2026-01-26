---
sidebar_position: 8
title: MAIN_MENU Button
description: Button that opens the configured main menu
---

# MAIN_MENU Button Type

The `MAIN_MENU` button type opens the inventory configured as the main menu in `config.yml`.

## Configuration

First, set the main menu in your `config.yml`:

```yaml
# config.yml
main-menu: "main"  # Name of the main menu inventory
```

## Usage

```yaml
items:
  main-menu:
    type: MAIN_MENU
    slot: 49
    item:
      material: NETHER_STAR
      name: "&6&lMain Menu"
      lore:
        - "&7Return to the main menu"
```

## Difference from HOME

| Button | Behavior |
|--------|----------|
| `HOME` | Returns to the first inventory the player opened in their session |
| `MAIN_MENU` | Always opens the specific inventory configured in config.yml |

**Example scenario:**
- Player opens Shop menu directly via `/zm open shop`
- Player navigates: Shop → Swords → Diamond Sword Details
- `HOME` would return to Shop (first opened)
- `MAIN_MENU` would open the configured main menu (e.g., "main")

## Examples

### Basic Main Menu Button

```yaml
items:
  main-menu:
    type: MAIN_MENU
    slot: 49
    item:
      material: NETHER_STAR
      name: "&6&lMain Menu"
    sound: UI_BUTTON_CLICK
```

### Styled Main Menu Button

```yaml
items:
  main-menu:
    type: MAIN_MENU
    slot: 49
    item:
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzVhMzFjNjQ1MzNlNTRhZmFjZjA0YzNhMTY3YzM4YjBhYjIzMjI3NjdmYjE2MWVmMTU5MjI5YTI4ZmJiN2EifX0="
      name: "&6&l⌂ Main Menu"
      lore:
        - "&7Go to the server's main menu"
        - ""
        - "&e▸ Click to open"
    sound: BLOCK_NOTE_BLOCK_CHIME
```

### In a Navigation Bar

```yaml
items:
  back:
    type: BACK
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&lBack"

  previous:
    type: PREVIOUS
    slot: 47
    is-permanent: true
    item:
      material: ARROW
      name: "&7Previous"

  main-menu:
    type: MAIN_MENU
    slot: 49
    is-permanent: true
    item:
      material: NETHER_STAR
      name: "&6&lMain Menu"

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

### Permanent on All Sub-menus

```yaml
items:
  main-menu:
    type: MAIN_MENU
    slot: 49
    is-permanent: true
    item:
      material: NETHER_STAR
      name: "&6&lMain Menu"
      lore:
        - "&7Return to main menu"
    sound: UI_BUTTON_CLICK
```

## When to Use

Use `MAIN_MENU` buttons when:
- You have a central hub menu players should access from anywhere
- Players may open sub-menus directly (via commands)
- You want consistent navigation across all menus
- Your server has a primary menu that everything branches from

## Best Practices

1. **Configure main-menu** in config.yml first
2. **Use consistently** across all sub-menus
3. **Place centrally** - slot 49 is common
4. **Use distinctive icon** - Nether star works well
5. **Add to patterns** - Include in a navigation pattern for consistency

## Creating a Main Menu Pattern

Create a reusable navigation bar with main menu:

```yaml
# patterns/navigation.yml
name: "navigation"
size: 54

items:
  back:
    type: BACK
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&lBack"
    sound: UI_BUTTON_CLICK

  main-menu:
    type: MAIN_MENU
    slot: 49
    is-permanent: true
    item:
      material: NETHER_STAR
      name: "&6&lMain Menu"
    sound: UI_BUTTON_CLICK

  close:
    slot: 53
    is-permanent: true
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lClose"
    sound: UI_BUTTON_CLICK
```

Then use it in your inventories:

```yaml
# inventories/shop.yml
name: "&6Shop"
size: 54
patterns:
  - "navigation"

items:
  # Your shop items...
```

## Related Button Types

- [HOME](./home) - Return to first opened inventory
- [BACK](./back) - Go back one step
- [INVENTORY](./inventory) - Open specific inventory

## Next Steps

- Learn about the [SWITCH](./switch) button type
- Create [Patterns](../../patterns) for reusable navigation
- View all [Button Types](./none)
