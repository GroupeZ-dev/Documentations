---
sidebar_position: 7
title: JUMP Button
description: Button that jumps to a specific page
---

# JUMP Button Type

The `JUMP` button type navigates directly to a specific page number in a paginated inventory.

## Usage

```yaml
items:
  go_to_page_5:
    type: JUMP
    slot: 49
    page: 5
    item:
      material: PAPER
      name: "&e&lGo to Page 5"
```

## Properties

### page

**Required.** The page number to jump to.

```yaml
items:
  jump:
    type: JUMP
    slot: 0
    page: 3
```

## Examples

### Page Index

Create a page index for quick navigation:

```yaml
items:
  page_1:
    type: JUMP
    slot: 45
    page: 1
    item:
      material: PAPER
      amount: 1
      name: "&7Page 1"
    sound: UI_BUTTON_CLICK

  page_2:
    type: JUMP
    slot: 46
    page: 2
    item:
      material: PAPER
      amount: 2
      name: "&7Page 2"
    sound: UI_BUTTON_CLICK

  page_3:
    type: JUMP
    slot: 47
    page: 3
    item:
      material: PAPER
      amount: 3
      name: "&7Page 3"
    sound: UI_BUTTON_CLICK

  page_4:
    type: JUMP
    slot: 48
    page: 4
    item:
      material: PAPER
      amount: 4
      name: "&7Page 4"
    sound: UI_BUTTON_CLICK

  page_5:
    type: JUMP
    slot: 49
    page: 5
    item:
      material: PAPER
      amount: 5
      name: "&7Page 5"
    sound: UI_BUTTON_CLICK
```

### Highlight Current Page

```yaml
items:
  page_1:
    type: JUMP
    slot: 45
    page: 1
    view-requirement:
      requirements:
        - type: placeholder
          value: "%page%"
          compare: "!="
          number: 1
    item:
      material: PAPER
      amount: 1
      name: "&7Page 1"
    else:
      item:
        material: ENCHANTED_BOOK
        amount: 1
        name: "&e&lPage 1 &7(Current)"
        glow: true
```

### Category Navigation

Jump to different sections of a large inventory:

```yaml
items:
  weapons:
    type: JUMP
    slot: 0
    page: 1
    item:
      material: DIAMOND_SWORD
      name: "&b&lWeapons"
      lore:
        - "&7Jump to weapons section"

  armor:
    type: JUMP
    slot: 1
    page: 3
    item:
      material: DIAMOND_CHESTPLATE
      name: "&9&lArmor"
      lore:
        - "&7Jump to armor section"

  tools:
    type: JUMP
    slot: 2
    page: 5
    item:
      material: DIAMOND_PICKAXE
      name: "&a&lTools"
      lore:
        - "&7Jump to tools section"

  food:
    type: JUMP
    slot: 3
    page: 7
    item:
      material: GOLDEN_APPLE
      name: "&6&lFood"
      lore:
        - "&7Jump to food section"
```

### First/Last Page Shortcuts

```yaml
items:
  first-page:
    type: JUMP
    slot: 45
    page: 1
    is-permanent: true
    item:
      material: PLAYER_HEAD
      url: "first_arrow_texture"
      name: "&7&l<< First"
    sound: UI_BUTTON_CLICK

  previous:
    type: PREVIOUS
    slot: 47
    is-permanent: true
    item:
      material: ARROW
      name: "&c&l< Previous"

  page-info:
    slot: 49
    is-permanent: true
    item:
      material: BOOK
      name: "&e&lPage %page%/%max-page%"

  next:
    type: NEXT
    slot: 51
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lNext >"

  # Note: For dynamic last page, you'd need a custom solution
  # since JUMP requires a static page number
```

### Dynamic Amount Display

Show the page number as the item amount:

```yaml
items:
  page-selector:
    type: JUMP
    slot: 13
    page: 1
    item:
      material: PAPER
      amount: 1  # Shows "1" in the corner
      name: "&7Page 1"
```

## Combining with View Requirements

Hide page buttons that don't exist:

```yaml
items:
  page_3:
    type: JUMP
    slot: 47
    page: 3
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_max_page%"
          compare: ">="
          number: 3
    item:
      material: PAPER
      amount: 3
      name: "&7Page 3"
```

## Use Cases

1. **Large catalogs** - Quick access to specific sections
2. **Organized shops** - Category-based navigation
3. **Page selectors** - Visual page number display
4. **Bookmarks** - Jump to favorite/important pages

## Limitations

- Page number must be static (defined in config)
- For dynamic page jumping, use custom actions or plugins

## Best Practices

1. **Indicate current page** - Use `view-requirement` + `else`
2. **Use visual amounts** - Set `amount` to match page number
3. **Group by category** - Organize jump buttons logically
4. **Add tooltips** - Use lore to explain what's on each page
5. **Combine with arrows** - Include PREVIOUS/NEXT for sequential navigation

## Related Button Types

- [NEXT](./next) - Go to next page
- [PREVIOUS](./previous) - Go to previous page
- [INVENTORY](./inventory) - Open different inventory

## Next Steps

- See [NEXT](./next) and [PREVIOUS](./previous) for sequential navigation
- Learn about [MAIN_MENU](./mainmenu) buttons
- View all [Button Types](./none)
