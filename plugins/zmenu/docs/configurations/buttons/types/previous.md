---
sidebar_position: 5
title: PREVIOUS Button
description: Button that navigates to the previous page
---

# PREVIOUS Button Type

The `PREVIOUS` button type navigates to the previous page in a paginated inventory.

## Usage

```yaml
items:
  previous:
    type: PREVIOUS
    slot: 45
    item:
      material: ARROW
      name: "&c&l← Previous Page"
      lore:
        - "&7Go to page %zmenu_player_previous_page%"
```

## Properties

| Property | Description |
|----------|-------------|
| `slot` / `slots` | Position in inventory |
| `item` | Visual appearance |
| `sound` | Sound on click |
| `is-permanent` | Show on all pages (recommended) |

## Examples

### Basic Previous Button

```yaml
items:
  previous:
    type: PREVIOUS
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&l← Previous"
    sound: UI_BUTTON_CLICK
```

### Styled Previous Button

```yaml
items:
  previous:
    type: PREVIOUS
    slot: 45
    is-permanent: true
    item:
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYmQ2OWUwNmU1ZGFkZmQ4NGU1ZjNkMWMyMTA2M2YyNTUzYjJmYTk0NWVlMWQ0ZDcxNTJmZGM1NDI1YmMxMmE5In19"
      name: "&c&l← Previous Page"
      lore:
        - "&7Current: &f%page%"
        - "&7Go to: &f%zmenu_player_previous_page%"
    sound: ITEM_BOOK_PAGE_TURN
```

### Hide When On First Page

```yaml
items:
  previous:
    type: PREVIOUS
    slot: 45
    is-permanent: true
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_page%"
          compare: ">"
          number: 1
    item:
      material: ARROW
      name: "&c&l← Previous"
    else:
      item:
        material: GRAY_STAINED_GLASS_PANE
        name: "&8"
```

### Complete Navigation Bar

```yaml
items:
  nav-left-border:
    slots:
      - 45
      - 46
    is-permanent: true
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"

  previous:
    type: PREVIOUS
    slot: 47
    is-permanent: true
    item:
      material: ARROW
      name: "&c&l← Previous"
    sound: UI_BUTTON_CLICK

  back:
    type: BACK
    slot: 48
    is-permanent: true
    item:
      material: DARK_OAK_DOOR
      name: "&7&lBack"
    sound: UI_BUTTON_CLICK

  page-info:
    slot: 49
    is-permanent: true
    item:
      material: BOOK
      name: "&6&lPage %page% of %maxPage%"
      lore:
        - ""
        - "&7Use arrows to navigate"

  home:
    type: HOME
    slot: 50
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
      name: "&a&lNext →"
    sound: UI_BUTTON_CLICK

  nav-right-border:
    slots:
      - 52
      - 53
    is-permanent: true
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"
```

## Best Practices

1. **Always use `is-permanent: true`** for navigation buttons
2. **Pair with NEXT** button for complete navigation
3. **Add page counter** between navigation buttons
4. **Use consistent positioning** across all paginated menus
5. **Provide audio feedback** with sounds

## Related Button Types

- [NEXT](./next) - Navigate to next page
- [JUMP](./jump) - Jump to specific page
- [BACK](./back) - Return to previous inventory

## Next Steps

- See the [NEXT](./next) button type
- Learn about [JUMP](./jump) buttons
- View all [Button Types](./none)
