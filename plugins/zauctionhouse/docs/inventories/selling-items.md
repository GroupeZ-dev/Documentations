---
sidebar_position: 7
title: Selling Items
description: Your selling items inventory configuration
---

# Selling Items Inventory

The selling items inventory displays items the player currently has listed for sale. Players can remove listings from here.

**File:** `plugins/zAuctionHouse/inventories/selling-items.yml`

**Access:** `/ah selling` or click the "Your Items" button in the main auction

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/selling.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Features

- View all your active listings
- See remaining time until expiration
- Remove items from sale (cancel listing)
- Items are not purchasable from this view (they're your own items)

## Default Configuration

```yaml
name: '#0c1719Selling items (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_SELLING_ITEMS
    empty-slot: 22
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
| `items` | [`ZAUCTIONHOUSE_SELLING_ITEMS`](./buttons#zauctionhouse_selling_items) | Displays selling items |

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

When a player clicks their own listed item:
- If `open-confirm-inventory` is `true`: Opens [Remove Confirm](./remove-confirm) inventory
- If `open-confirm-inventory` is `false`: Removes item directly

When an item is removed:
- It moves to the [Expired Items](./expired-items) inventory
- The player can claim it from there
