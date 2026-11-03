---
title: Admin Remove Confirm
description: Admin listing removal confirmation inventory configuration
---

# Admin Remove Confirm

The admin remove confirmation inventory lets an administrator remove any player's listing directly from the auction house, choosing beforehand whether the seller is notified, whether the item is returned to the seller and whether the administrator receives it.

**File:** `plugins/zAuctionHouse/inventories/admin/admin-remove-confirm.yml`

**Access:** In the main auction inventory, press **Q** (drop key) or **middle click** on a listing

**Permission:** `zauctionhouse.admin.remove.inventory`

## How to Open It

1. Open the auction house (`/ah`).
2. Hover a listing and press the **drop key** (`Q` by default) or **middle click** it.
3. The confirmation inventory opens with the selected listing shown in the top slot.

This works on the listings displayed by the [`ZAUCTIONHOUSE_LISTED_ITEMS`](../buttons#zauctionhouse_listed_items) button (`auction.yml`), and only for listings currently on sale. The check happens **before** the container preview: for a shulker box, Q / middle click opens the admin removal instead of the content preview. Players without the permission keep the normal behavior.

While the confirmation is open, the listing is reserved for the administrator: it disappears from the auction house of the other players and can be neither bought nor removed by its seller. Closing the inventory or clicking Cancel puts it back on sale.

<CalloutContainer type="info">

<CalloutDescription>
Each time the inventory opens, the options are reset to their defaults: **notify ON**, **expire ON**, **copy OFF**. With these defaults, the listing is returned to the seller's expired items and the seller is warned.
</CalloutDescription>

</CalloutContainer>

## Features

- Preview the listing before removing it
- Choose whether the seller is notified
- Choose whether the item goes back to the seller or is deleted
- Choose whether the administrator receives the item
- Cluster-safe removal (works with the [Redis addon](../../addons/redis/introduction))

## Removal Options

| Option | Button | Default | When ON | When OFF |
|--------|--------|---------|---------|----------|
| Notify | `ZAUCTIONHOUSE_ADMIN_REMOVE_NOTIFY` | ON | The seller receives the `admin-listing-removed` message | The seller is not told |
| Expire | `ZAUCTIONHOUSE_ADMIN_REMOVE_EXPIRE` | ON | The item is moved to the seller's [Expired Items](../expired-items), with the normal `expiration.expire` duration, so the seller can claim it | The listing is deleted |
| Copy | `ZAUCTIONHOUSE_ADMIN_REMOVE_COPY` | OFF | The administrator receives the item (see table below) | The administrator receives nothing |

### Result of Each Combination

| Expire | Copy | Seller | Administrator |
|--------|------|--------|---------------|
| ON | OFF | Gets the item back in their expired items | Nothing |
| ON | ON | Gets the item back in their expired items | Receives a **copy** of the item |
| OFF | ON | Loses the item | Receives **the item itself** |
| OFF | OFF | Loses the item | Nothing: the item is permanently deleted |

The **Notify** option is independent and can be combined with any of these rows.

<CalloutContainer type="warning">

<CalloutDescription>
With **Expire OFF** and **Copy OFF**, the item is destroyed and cannot be recovered. With **Expire OFF** and **Copy ON**, if the item cannot be delivered to the administrator, it goes back to the seller's claimable (expired) items instead of being lost.
</CalloutDescription>

</CalloutContainer>

## What Happens on Confirm

When the administrator clicks the confirm button:

1. The plugin checks that the listing is still available, locks it and revalidates it (cluster-safe). If the item was sold or removed in the meantime, for example on another server, the administrator receives `admin-item-not-available` and nothing is removed.
2. The listing is removed according to the selected options.
3. A log of type `ADMIN_REMOVE` (displayed as **Admin Remove**) is written; it is visible in the [Admin Logs](./admin-logs) inventory.
4. The administrator receives the `admin-item-removed` message.
5. The main auction inventory reopens.

Clicking the cancel button (`BACK`) returns to the auction house without removing anything, and the listing is put back on sale.

### Offline Notification

When **Notify** is ON and the seller is not online on the server where the removal happens, the `ADMIN_REMOVE` log is stored as unread. The `admin-listing-removed` message is sent to the seller the next time they join, then the log is marked as read.

## Default Configuration

```yaml
# Every option can be toggled independently before confirming.
name: "#0c1719Remove this listing?"
size: 27
items:
  show:
    type: ZAUCTIONHOUSE_SHOW
    slot: 4
  notify:
    type: ZAUCTIONHOUSE_ADMIN_REMOVE_NOTIFY
    enable-material: BELL
    disable-material: BARRIER
    slot: 11
    item:
      material: '%material%'
      name: "%state-color%Notify player"
      lore:
        - "#8c8c8cClick to toggle"
  expire:
    type: ZAUCTIONHOUSE_ADMIN_REMOVE_EXPIRE
    enable-material: CLOCK
    disable-material: BARRIER
    slot: 13
    item:
      material: '%material%'
      name: "%state-color%Send to expired items"
      lore:
        - "#8c8c8cClick to toggle"
  copy:
    type: ZAUCTIONHOUSE_ADMIN_REMOVE_COPY
    enable-material: CHEST
    disable-material: BARRIER
    slot: 15
    item:
      material: '%material%'
      name: "%state-color%Give admin a copy"
      lore:
        - "#8c8c8cClick to toggle"
  confirm:
    type: ZAUCTIONHOUSE_ADMIN_REMOVE_CONFIRM
    slot: 21
    item:
      material: LIME_CONCRETE
      name: "#2CCED2Confirm removal"
  cancel:
    type: BACK
    slot: 23
    item:
      material: RED_CONCRETE
      name: "#ff5555Cancel"
```

<CalloutContainer type="info">

<CalloutDescription>
This file is copied automatically on startup if it is missing, so existing installations get it without regenerating their inventories.
</CalloutDescription>

</CalloutContainer>

## Buttons Used

| Button | Type | Description |
|--------|------|-------------|
| `show` | [`ZAUCTIONHOUSE_SHOW`](../buttons#zauctionhouse_show) | Displays the listing being removed |
| `notify` | `ZAUCTIONHOUSE_ADMIN_REMOVE_NOTIFY` | Toggles the seller notification |
| `expire` | `ZAUCTIONHOUSE_ADMIN_REMOVE_EXPIRE` | Toggles between returning the item to the seller and deleting it |
| `copy` | `ZAUCTIONHOUSE_ADMIN_REMOVE_COPY` | Toggles giving the item to the administrator |
| `confirm` | `ZAUCTIONHOUSE_ADMIN_REMOVE_CONFIRM` | Performs the removal |
| `cancel` | `BACK` | Cancels and goes back |

### Option Buttons

`ZAUCTIONHOUSE_ADMIN_REMOVE_NOTIFY`, `ZAUCTIONHOUSE_ADMIN_REMOVE_EXPIRE` and `ZAUCTIONHOUSE_ADMIN_REMOVE_COPY` share the same configuration. Clicking the button switches its state and refreshes the inventory.

| Option | Default | Description |
|--------|---------|-------------|
| `enable-material` | `PAPER` | Material used when the option is ON |
| `disable-material` | `BARRIER` | Material used when the option is OFF |

**Placeholders:**

| Placeholder | Description |
|-------------|-------------|
| `%material%` | `enable-material` or `disable-material` depending on the current state. Use it as `item.material: '%material%'` |
| `%state-color%` | `#55ff55` when ON, `#ff5555` when OFF |
| `%enabled%` | `true` or `false` |

### ZAUCTIONHOUSE_ADMIN_REMOVE_CONFIRM

Removes the listing shown by `ZAUCTIONHOUSE_SHOW` using the current state of the three options. It has no specific options. If the listing is no longer on sale when clicked, the main auction inventory simply reopens.

## Messages

| Key | Sent to | Default (English) |
|-----|---------|-------------------|
| `admin-listing-removed` | Seller (immediately, or on next join if offline) | `<error>Your listing <white>%items%<error> was removed by an administrator.` |
| `admin-item-removed` | Administrator | `<success>You removed <white>%items%<success> from <white>%target%<success>.` |
| `admin-item-not-available` | Administrator | `<error>The item <white>%items%<error> is no longer available: it was sold, claimed or removed on another server.` |

Messages are configured in `messages.yml` (see [Messages](../../configuration/messages)).
