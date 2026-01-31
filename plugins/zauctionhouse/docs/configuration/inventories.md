---
sidebar_position: 6
title: Inventories
description: Customize auction house interfaces in zAuctionHouse
---

# Inventories Configuration

All auction house interfaces are customizable using [zMenu](https://docs.groupez.dev/zmenu). The inventory files are located in `plugins/zAuctionHouse/inventories/`.

## Available Inventories

| File | Description |
|------|-------------|
| `auction.yml` | Main auction house interface |
| `categories.yml` | Category selection menu |
| `confirm_buy.yml` | Purchase confirmation dialog |
| `confirm_remove.yml` | Remove confirmation dialog |
| `expired.yml` | Player's expired items |
| `player.yml` | Player's active listings |
| `purchased.yml` | Items purchased to claim |
| `sell.yml` | Sell interface |

## Basic Structure

Each inventory file follows the zMenu structure:

```yaml
# Inventory name (supports placeholders)
name: "&6Auction House"

# Inventory size (9, 18, 27, 36, 45, 54)
size: 54

# Items in the inventory
items:
  # Static decorative item
  decoration:
    slot: 0
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: " "

  # Functional button
  close:
    slot: 49
    item:
      material: BARRIER
      name: "&cClose"
    actions:
      - type: close
```

## Main Auction Interface

Example `auction.yml`:

```yaml
name: "&6Auction House"
size: 54

# Fill empty slots
fillItem:
  material: BLACK_STAINED_GLASS_PANE
  name: " "

items:
  # Category button
  categories:
    slot: 4
    item:
      material: CHEST
      name: "&6Categories"
      lore:
        - "&7Browse by category"
        - ""
        - "&eClick to view categories"
    actions:
      - type: inventory
        inventory: "zauctionhouse/categories.yml"

  # Search button
  search:
    slot: 2
    item:
      material: COMPASS
      name: "&eSearch"
      lore:
        - "&7Find specific items"
        - ""
        - "&eClick to search"
    actions:
      - type: input
        input:
          type: CHAT
          message: "&eEnter search query:"
          action: "ah search %input%"

  # Sort button
  sort:
    slot: 6
    item:
      material: HOPPER
      name: "&6Sort: &f%zauctionhouse_sort%"
      lore:
        - "&7Change sorting method"
        - ""
        - "&eClick to change"
    actions:
      - type: zauctionhouse
        action: TOGGLE_SORT

  # Player's listings
  my-items:
    slot: 45
    item:
      material: BOOK
      name: "&aYour Listings"
      lore:
        - "&7Items: &f%zauctionhouse_player_items_listed%/%zauctionhouse_player_limit%"
        - ""
        - "&eClick to view"
    actions:
      - type: inventory
        inventory: "zauctionhouse/player.yml"

  # Expired items
  expired:
    slot: 46
    item:
      material: CLOCK
      name: "&cExpired Items"
      lore:
        - "&7Items: &f%zauctionhouse_player_items_expired%"
        - ""
        - "&eClick to view"
    actions:
      - type: inventory
        inventory: "zauctionhouse/expired.yml"

  # Purchased items
  purchased:
    slot: 47
    item:
      material: CHEST_MINECART
      name: "&aPurchased Items"
      lore:
        - "&7To claim: &f%zauctionhouse_player_items_to_claim%"
        - ""
        - "&eClick to view"
    actions:
      - type: inventory
        inventory: "zauctionhouse/purchased.yml"

  # Pagination - Previous
  previous:
    slot: 48
    type: PREVIOUS
    item:
      material: ARROW
      name: "&ePrevious Page"

  # Page info
  page-info:
    slot: 49
    item:
      material: PAPER
      name: "&ePage &f%page%&7/&f%max_page%"

  # Pagination - Next
  next:
    slot: 50
    type: NEXT
    item:
      material: ARROW
      name: "&eNext Page"

  # Close button
  close:
    slot: 53
    item:
      material: BARRIER
      name: "&cClose"
    actions:
      - type: close

# Auction items pagination
pagination:
  # Slots for auction items (main area)
  slots:
    - 10-16
    - 19-25
    - 28-34
    - 37-43

  # Item template for each auction item
  item:
    # Uses the actual item being sold
    useAuctionItem: true

    # Additional lore added to items
    lore:
      - ""
      - "&7Seller: &f%zauctionhouse_item_seller%"
      - "&7Price: &6%zauctionhouse_item_price%"
      - "&7Expires: &f%zauctionhouse_item_expire_time%"
      - ""
      - "&eLeft-click to purchase"
      - "&eRight-click for info"

  # Click actions
  actions:
    LEFT:
      - type: inventory
        inventory: "zauctionhouse/confirm_buy.yml"
    RIGHT:
      - type: message
        messages:
          - "&7Listed: %zauctionhouse_item_listed_ago% ago"
```

## Purchase Confirmation

Example `confirm_buy.yml`:

```yaml
name: "&6Confirm Purchase"
size: 27

items:
  # Item being purchased
  item-preview:
    slot: 13
    type: AUCTION_ITEM_PREVIEW

  # Confirm button
  confirm:
    slot: 11
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&aConfirm Purchase"
      lore:
        - "&7Price: &6%zauctionhouse_item_price%"
        - ""
        - "&eClick to confirm"
    actions:
      - type: zauctionhouse
        action: PURCHASE_ITEM

  # Cancel button
  cancel:
    slot: 15
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&cCancel"
      lore:
        - "&7Return to auction house"
    actions:
      - type: back
```

## Sell Interface

Example `sell.yml`:

```yaml
name: "&6Sell Item"
size: 27

items:
  # Item being sold
  selling-item:
    slot: 4
    type: SELLING_ITEM_PREVIEW

  # Price display
  price:
    slot: 13
    item:
      material: GOLD_INGOT
      name: "&6Price: &f%zauctionhouse_sell_price%"
      lore:
        - "&7Click to change price"
    actions:
      - type: input
        input:
          type: ANVIL
          item:
            material: PAPER
            name: "%zauctionhouse_sell_price%"
          action: "ah setprice %input%"

  # Economy selector
  economy:
    slot: 22
    item:
      material: EMERALD
      name: "&6Currency: &f%zauctionhouse_sell_economy%"
      lore:
        - "&7Click to change currency"
    actions:
      - type: zauctionhouse
        action: TOGGLE_ECONOMY

  # Confirm sale
  confirm:
    slot: 11
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&aList Item"
      lore:
        - "&7Price: &6%zauctionhouse_sell_price%"
        - "&7Currency: &f%zauctionhouse_sell_economy%"
        - "&7Expires: &f%zauctionhouse_sell_expire%"
        - ""
        - "&eClick to list"
    actions:
      - type: zauctionhouse
        action: CONFIRM_SELL

  # Cancel
  cancel:
    slot: 15
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&cCancel"
    actions:
      - type: close
```

## Patterns

Use zMenu patterns for reusable elements:

```yaml
# In patterns/auction_pattern.yml
size: 54

items:
  border:
    slots:
      - 0-8
      - 45-53
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: " "
```

Then use in inventories:

```yaml
# In auction.yml
name: "&6Auction House"
patterns:
  - "auction_pattern"

items:
  # Your items here
```

## Custom Actions

zAuctionHouse provides custom actions:

| Action | Description |
|--------|-------------|
| `PURCHASE_ITEM` | Purchase the selected item |
| `REMOVE_ITEM` | Remove player's listing |
| `CLAIM_EXPIRED` | Claim an expired item |
| `CLAIM_PURCHASED` | Claim a purchased item |
| `CLAIM_ALL_EXPIRED` | Claim all expired items |
| `CLAIM_ALL_PURCHASED` | Claim all purchased items |
| `CONFIRM_SELL` | Confirm selling an item |
| `TOGGLE_SORT` | Change sort method |
| `TOGGLE_ECONOMY` | Change economy |
| `OPEN_CATEGORY` | Open a specific category |

Usage:

```yaml
actions:
  - type: zauctionhouse
    action: PURCHASE_ITEM
```

## Tips

### Dynamic Item Count

Show item count in buttons:

```yaml
expired:
  item:
    material: CLOCK
    name: "&cExpired (%zauctionhouse_player_items_expired%)"
```

### Conditional Display

Hide buttons when empty:

```yaml
expired:
  view-requirement:
    requirements:
      expired-check:
        type: placeholder
        placeholder: "%zauctionhouse_player_items_expired%"
        action: SUPERIOR
        value: 0
```

### Custom Category Layout

```yaml
# categories.yml with custom layout
name: "&6Categories"
size: 45

items:
  weapons:
    slot: 10
    type: CATEGORY
    category: weapons

  armor:
    slot: 12
    type: CATEGORY
    category: armor
```

## Reloading

After modifying inventory files:

```
/ah admin reload
```

Changes take effect immediately for new inventory opens.
