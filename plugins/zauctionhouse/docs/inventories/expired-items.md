---
sidebar_position: 5
title: Expired Items
description: Expired items inventory configuration
---

# Expired Items Inventory

The expired items inventory displays items that have expired without being sold. Players can retrieve these items back to their inventory.

**File:** `plugins/zAuctionHouse/inventories/expired-items.yml`

**Access:** `/ah expired` or click the "Expired Items" button in the main auction

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/expired.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Item Lifecycle

1. Items listed for sale have an expiration time (configured in `config.yml`)
2. When the time expires, items move to the expired items inventory
3. Players can retrieve expired items by clicking on them
4. Expired items have a second expiration (default: 1 week) before permanent deletion

## Default Configuration

```yaml
name: '#0c1719Expired items (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_EXPIRED_ITEMS
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
| `items` | [`ZAUCTIONHOUSE_EXPIRED_ITEMS`](./buttons#zauctionhouse_expired_items) | Displays expired items |

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

When a player clicks an expired item:
- The item is returned to the player's inventory
- If the player's inventory is full, the item remains in expired items
