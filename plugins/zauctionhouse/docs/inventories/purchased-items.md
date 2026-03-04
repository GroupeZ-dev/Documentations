---
sidebar_position: 6
title: Purchased Items
description: Purchased items inventory configuration
---

# Purchased Items Inventory

The purchased items inventory displays items the player has bought but not yet claimed.

**File:** `plugins/zAuctionHouse/inventories/purchased-items.yml`

**Access:** `/ah purchased` or click the "Purchased Items" button in the main auction

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/purchased-items.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Item Delivery Behavior

The behavior depends on `give-item` in `config.yml`:
- **`give-item: true`** - Items go directly to player's inventory (if space available)
- **`give-item: false`** - Items always go to this inventory for manual claiming

Items here also have an expiration time before permanent deletion.

## Default Configuration

```yaml
name: '#0c1719Purchased items (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_PURCHASED_ITEMS
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
| `items` | [`ZAUCTIONHOUSE_PURCHASED_ITEMS`](./buttons#zauctionhouse_purchased_items) | Displays purchased items |

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

When a player clicks a purchased item:
- The item is added to the player's inventory
- If the player's inventory is full, the item remains unclaimed
