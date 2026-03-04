---
sidebar_position: 2
title: Admin Selling Items
description: Admin selling items inventory configuration
---

# Admin Selling Items

The admin selling items inventory allows admins to view and manage a player's active listings.

**File:** `plugins/zAuctionHouse/inventories/admin/admin-selling-items.yml`

**Access:**
- From admin history main menu → Sale Items button
- `/ah admin open selling <player>`

**Permission:** Requires admin permission

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/admin-listed.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Admin Actions

- View all items currently listed for sale by the target player
- Remove items from sale (cancels the listing)
- Useful for removing inappropriate listings or scams

## Default Configuration

```yaml
name: '#0c1719Admin listed items (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_ADMIN_SELLING_ITEMS
    slots:
      - 9-17
      - 18-26
      - 27-35
      - 36-44
    else:
      slots:
        - 22
      item:
        material: BARRIER
        name: '#ff0000&nNo Items Found'
```

## Buttons Used

| Button | Type | Description |
|--------|------|-------------|
| `items` | [`ZAUCTIONHOUSE_ADMIN_SELLING_ITEMS`](../buttons#admin-buttons) | Displays selling items with admin removal |

## Patterns Used

| Pattern | Description |
|---------|-------------|
| `zauctionhouse-decoration` | Glass pane borders |
| `zauctionhouse-pagination` | Previous/Next page buttons |
| `zauctionhouse-back` | Back button to admin history |

## Click Actions

When an admin clicks an item:
- The item is removed from sale
- The item moves to the target player's expired items
- The target player can retrieve it from there

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Current page number |
| `%max-page%` | Total number of pages |
