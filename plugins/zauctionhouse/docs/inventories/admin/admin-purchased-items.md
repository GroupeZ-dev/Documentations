---
sidebar_position: 4
title: Admin Purchased Items
description: Admin purchased items inventory configuration
---

# Admin Purchased Items

The admin purchased items inventory allows admins to view and manage a player's purchased items.

**File:** `plugins/zAuctionHouse/inventories/admin/admin-purchased-items.yml`

**Access:**
- From admin history main menu → Purchased Items button
- `/ah admin open purchased <player>`

**Permission:** Requires admin permission

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/admin-purchased.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Admin Actions

- View all purchased items for the target player
- Retrieve items to give back to the player
- Useful for recovering items after player complaints

## Default Configuration

```yaml
name: '#0c1719Admin purchased items (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_ADMIN_PURCHASED_ITEMS
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
| `items` | [`ZAUCTIONHOUSE_ADMIN_PURCHASED_ITEMS`](../buttons#admin-buttons) | Displays purchased items with admin retrieval |

## Patterns Used

| Pattern | Description |
|---------|-------------|
| `zauctionhouse-decoration` | Glass pane borders |
| `zauctionhouse-pagination` | Previous/Next page buttons |
| `zauctionhouse-back` | Back button to admin history |

## Click Actions

When an admin clicks an item:
- The item is retrieved and given to the admin
- The admin can then give it to the player manually

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Current page number |
| `%max-page%` | Total number of pages |
