---
sidebar_position: 15
title: Combined Items
description: Combined inventory showing selling, expired, and purchased items together
---

# Combined Items Inventory

The combined items inventory merges multiple item views (selling, expired, purchased) into a single paginated list. You can configure which storage types to include.

**File:** `plugins/zAuctionHouse/inventories/combined-items.yml`

## Features

- Combine selling, expired, and purchased items in one view
- Each item type uses its own lore configuration (from `config.yml` `item-lore` section)
- Click action automatically adapts to the item's storage type:
  - **Selling items**: removes/cancels the listing
  - **Expired items**: claims the item back
  - **Purchased items**: claims the purchased item
- Individually toggle each source with `include-selling`, `include-expired`, `include-purchased`

## Default Configuration

```yaml
name: '#0c1719My Items (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_COMBINED_ITEMS
    empty-slot: 22
    include-selling: true
    include-expired: true
    include-purchased: true
    slots:
      - 9-17
      - 18-26
      - 27-35
      - 36-44
    item:
      material: BARRIER
      name: '#ff0000&nNo items found'
```

## Buttons Used

| Button | Type | Description |
|--------|------|-------------|
| `items` | [`ZAUCTIONHOUSE_COMBINED_ITEMS`](./buttons#zauctionhouse_combined_items) | Displays combined items from multiple storage types |

## Patterns Used

| Pattern | Description |
|---------|-------------|
| `zauctionhouse-decoration` | Glass pane borders |
| `zauctionhouse-pagination` | Previous/Next page buttons |
| `zauctionhouse-back` | Back button to return |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Current page number |
| `%max-page%` | Total number of pages |

## Click Actions

The click action adapts automatically based on the item's storage type:

| Item Type | Click Action |
|-----------|-------------|
| Selling (active listing) | Removes/cancels the listing, item moves to expired |
| Expired | Claims the item back to the player's inventory |
| Purchased | Claims the purchased item to the player's inventory |

## Configuration Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `include-selling` | Boolean | `true` | Include items the player currently has listed for sale |
| `include-expired` | Boolean | `true` | Include items that expired without being sold |
| `include-purchased` | Boolean | `true` | Include items the player has bought but not yet claimed |
| `empty-slot` | Number | `-1` | Slot for the "no items" placeholder (-1 to disable) |

### Examples

**Show only expired and purchased items:**
```yaml
items:
  type: ZAUCTIONHOUSE_COMBINED_ITEMS
  include-selling: false
  include-expired: true
  include-purchased: true
  slots:
    - 9-17
    - 18-26
```

**Show only selling items (equivalent to ZAUCTIONHOUSE_SELLING_ITEMS):**
```yaml
items:
  type: ZAUCTIONHOUSE_COMBINED_ITEMS
  include-selling: true
  include-expired: false
  include-purchased: false
  slots:
    - 9-17
    - 18-26
```
