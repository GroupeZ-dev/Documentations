---
sidebar_position: 4
title: NEXT Button
description: Button that navigates to the next page
---

# NEXT Button Type

The `NEXT` button type navigates to the next page in a paginated inventory.

## Usage

```yaml
items:
  next:
    type: NEXT
    slot: 53
    item:
      material: ARROW
      name: "&a&lNext Page →"
      lore:
        - "&7Go to page %zmenu_player_next_page%"
```

## How Pagination Works

Pagination is automatic when a button uses multiple slots and there's more content than available slots:

```yaml
items:
  shop-items:
    slots:
      - 10-16
      - 19-25
      - 28-34
    # This creates 21 slots per page
    # If you have 42 items, it creates 2 pages
```

The `NEXT` button only appears/works when there are more pages available.

## Properties

| Property | Description |
|----------|-------------|
| `slot` / `slots` | Position in inventory |
| `item` | Visual appearance |
| `sound` | Sound on click |
| `is-permanent` | Show on all pages (recommended) |

## Examples

### Basic Next Button

```yaml
items:
  next:
    type: NEXT
    slot: 53
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lNext →"
    sound: UI_BUTTON_CLICK
```

### Styled Next Button

```yaml
items:
  next:
    type: NEXT
    slot: 53
    is-permanent: true
    item:
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMmE2ZDE1YTUyNzNlNjE0YjY0YTQ4ZjE2OTIxMzYyMmZjNGRkOTJlMWVhMTc4YzJiZDY1NzI3NDVhYWE2NTRiIn19"
      name: "&a&lNext Page →"
      lore:
        - "&7Current: &f%page%"
        - "&7Go to: &f%zmenu_player_next_page%"
    sound: ITEM_BOOK_PAGE_TURN
```

### Navigation Pair (Previous & Next)

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

  page-info:
    slot: 49
    is-permanent: true
    item:
      material: PAPER
      name: "&e&lPage %page%/%maxPage%"
      lore:
        - "&7Navigate through pages"

  next:
    type: NEXT
    slot: 53
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lNext →"
    sound: UI_BUTTON_CLICK
```

### Hide When No More Pages

```yaml
items:
  next:
    type: NEXT
    slot: 53
    is-permanent: true
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_page%"
          compare: "<"
          number_placeholder: "%zmenu_player_max_page%"
    item:
      material: ARROW
      name: "&a&lNext →"
    else:
      item:
        material: GRAY_STAINED_GLASS_PANE
        name: "&8"
```

## Complete Paginated Inventory Example

```yaml
name: "&6&lShop &8(&7Page %page%/%maxPage%&8)"
size: 54
enable: true

fillItem:
  material: BLACK_STAINED_GLASS_PANE
  name: "&8"

items:
  # Top border
  top-border:
    slots:
      - 0-8
    item:
      material: BLUE_STAINED_GLASS_PANE
      name: "&8"

  # Shop items - these will paginate
  shop-items:
    slots:
      - 10-16
      - 19-25
      - 28-34
    # Define multiple items that fill these slots
    # If there are more items than slots, pages are created

  # Bottom border
  bottom-border:
    slots:
      - 36-44
    is-permanent: true
    item:
      material: BLUE_STAINED_GLASS_PANE
      name: "&8"

  # Navigation
  previous:
    type: PREVIOUS
    slot: 45
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
      name: "&7&lBack to Menu"
    sound: UI_BUTTON_CLICK

  page-info:
    slot: 49
    is-permanent: true
    item:
      material: BOOK
      name: "&e&lPage %page%/%maxPage%"

  close:
    slot: 50
    is-permanent: true
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lClose"
    sound: UI_BUTTON_CLICK

  next:
    type: NEXT
    slot: 53
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lNext →"
    sound: UI_BUTTON_CLICK
```

## Placeholders for Pagination

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Current page number |
| `%maxPage%` | Total number of pages |
| `%max-page%` | Same as maxPage |
| `%zmenu_player_page%` | Current page (PAPI) |
| `%zmenu_player_max_page%` | Max pages (PAPI) |
| `%zmenu_player_next_page%` | Next page number |
| `%zmenu_player_previous_page%` | Previous page number |

## Best Practices

1. **Use `is-permanent: true`** so navigation appears on all pages
2. **Add page info** between Previous/Next buttons
3. **Use sounds** for feedback when changing pages
4. **Consider hiding** buttons when at first/last page
5. **Place consistently** at bottom row (slots 45 and 53)

## Related Button Types

- [PREVIOUS](./previous) - Navigate to previous page
- [JUMP](./jump) - Jump to a specific page
- [BACK](./back) - Return to previous inventory

## Next Steps

- Learn about [PREVIOUS](./previous) buttons
- See [JUMP](./jump) for direct page navigation
- View all [Button Types](./none)
