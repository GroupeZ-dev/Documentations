---
sidebar_position: 11
title: Shulker Content
description: Shulker content preview inventory configuration
---

# Shulker Content Inventory

The shulker content inventory displays the contents of shulker boxes being sold, allowing buyers to preview what's inside before purchasing.

**File:** `plugins/zAuctionHouse/inventories/shulker-content.yml`

**Access:** Click "View Shulker Content" button in purchase/remove confirmation

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/shulker-preview.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/shulker-box.gif" alt="Description" style={{ width: '420px', height: 'auto' }} />
</div>

## Features

- Preview all items inside shulker boxes
- Navigate between multiple shulkers (bulk sales)
- View-only mode - items cannot be taken

## Default Configuration

```yaml
name: "#0c1719Shulker Content (%shulker-current%/%shulker-total%)"
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-back'

items:

  content:
    type: ZAUCTIONHOUSE_SHULKER_CONTENT
    slots:
      - 9-17
      - 18-26
      - 27-35
      - 36-44

  shulker-info:
    type: ZAUCTIONHOUSE_SHULKER_INFO
    slot: 4
    item:
      material: SHULKER_BOX
      name: "#2CCED2<bold>sʜᴜʟᴋᴇʀ ʙᴏx"
      lore:
        - "#92ffffViewing shulker #2CCED2%shulker_current% #92ffffof #2CCED2%shulker_total%"
        - ""
        - "#8c8c8c• Use navigation buttons to switch"

  previous:
    type: ZAUCTIONHOUSE_SHULKER_NAVIGATION
    direction: previous
    slot: 48
    item:
      material: ARROW
      name: "#2CCED2<bold>ᴘʀᴇᴠɪᴏᴜs sʜᴜʟᴋᴇʀ"
      lore:
        - "#92ffffView the previous shulker box."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto view previous"

  next:
    type: ZAUCTIONHOUSE_SHULKER_NAVIGATION
    direction: next
    slot: 50
    item:
      material: ARROW
      name: "#2CCED2<bold>ɴᴇxᴛ sʜᴜʟᴋᴇʀ"
      lore:
        - "#92ffffView the next shulker box."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto view next"
```

## Buttons Used

| Button | Type | Description |
|--------|------|-------------|
| `content` | [`ZAUCTIONHOUSE_SHULKER_CONTENT`](./buttons#zauctionhouse_shulker_content) | Displays shulker contents |
| `shulker-info` | [`ZAUCTIONHOUSE_SHULKER_INFO`](./buttons#zauctionhouse_shulker_info) | Shows shulker information |
| `previous` | [`ZAUCTIONHOUSE_SHULKER_NAVIGATION`](./buttons#zauctionhouse_shulker_navigation) | Previous shulker |
| `next` | [`ZAUCTIONHOUSE_SHULKER_NAVIGATION`](./buttons#zauctionhouse_shulker_navigation) | Next shulker |

## Patterns Used

| Pattern | Description |
|---------|-------------|
| `zauctionhouse-decoration` | Glass pane borders |
| `zauctionhouse-back` | Back button to return |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%shulker-current%` | Currently viewing shulker number (1-based) |
| `%shulker-total%` | Total number of shulkers in the sale |
| `%shulker_current%` | Same as above (alternative format) |
| `%shulker_total%` | Same as above (alternative format) |

## Multiple Shulkers

When a bulk sale contains multiple shulker boxes, players can navigate between them using the previous/next buttons.

The navigation buttons are only active when there are multiple shulkers:
- **Previous**: Disabled on first shulker
- **Next**: Disabled on last shulker
