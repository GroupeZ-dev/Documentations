---
sidebar_position: 10
title: Remove Confirm
description: Remove listing confirmation inventory configuration
---

# Remove Confirm Inventory

The remove confirmation inventory asks sellers to confirm removing their item from sale.

**File:** `plugins/zAuctionHouse/inventories/confirms/remove-confirm.yml`

**Access:** Automatically opens when a seller clicks their own listed item (if `open-confirm-inventory` is `true`)

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/remove-confirm.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Features

- Preview the item before removing
- View shulker contents (if applicable)
- Confirm or cancel the removal

## What Happens on Remove

When an item is removed from sale:
- It moves to the [Expired Items](./expired-items) inventory
- The player can claim it from there

## Default Configuration

```yaml
name: "#0c1719Remove this item?"
size: 27

items:

  remove:
    type: ZAUCTIONHOUSE_CONFIRM_REMOVE_LISTED
    slots:
      - 0-2
      - 9-11
      - 18-20
    item:
      material: GREEN_STAINED_GLASS_PANE
      name: "#2CCED2<bold>ʀᴇᴍᴏᴠᴇ"
      lore:
        - "#92ffffRemove this item."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto remove"

  deny:
    type: BACK
    slots:
      - 6-8
      - 15-17
      - 24-26
    item:
      material: RED_STAINED_GLASS_PANE
      name: "#2CCED2<bold>ʙᴀᴄᴋ"
      lore:
        - "#92ffffGo back."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto go back"

  decoration:
    slots:
      - 3-5
      - 12
      - 14
      - 21-23
    item:
      material: LIGHT_BLUE_STAINED_GLASS_PANE
      name: "#2CCED2"

  show:
    type: ZAUCTIONHOUSE_SHOW
    slot: 13

  shulker:
    type: ZAUCTIONHOUSE_SHULKER_OPEN
    slot: 4
    item:
      material: SHULKER_BOX
      name: "#2CCED2<bold>ᴠɪᴇᴡ sʜᴜʟᴋᴇʀ ᴄᴏɴᴛᴇɴᴛ"
      lore:
        - "#92ffffView the content of shulker boxes."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto view content"
```

## Buttons Used

| Button | Type | Description |
|--------|------|-------------|
| `remove` | [`ZAUCTIONHOUSE_CONFIRM_REMOVE_LISTED`](./buttons#zauctionhouse_confirm_remove_listed) | Confirms removal |
| `deny` | `BACK` | Returns to auction |
| `decoration` | (static) | Visual decoration |
| `show` | [`ZAUCTIONHOUSE_SHOW`](./buttons#zauctionhouse_show) | Displays the item |
| `shulker` | [`ZAUCTIONHOUSE_SHULKER_OPEN`](./buttons#zauctionhouse_shulker_open) | Opens shulker preview |

## Disabling Confirmation

To disable the confirmation dialog and remove items directly:

```yaml
# In config.yml
open-confirm-inventory: false
```
