---
sidebar_position: 3
title: Events
description: zAuctionHouse event system
---

# Events

zAuctionHouse provides a comprehensive event system with Pre-Events (cancellable) and Post-Events (informational).

## Event Types

### Pre-Events

Pre-Events fire **before** an action is executed. They are **cancellable** - you can prevent the action from happening.

| Event | Description |
|-------|-------------|
| `AuctionPreSellEvent` | Before an item is listed |
| `AuctionPrePurchaseItemEvent` | Before an item is purchased |
| `AuctionPreRemoveListedItemEvent` | Before a listed item is removed |
| `AuctionPreRemoveExpiredItemEvent` | Before an expired item is claimed |
| `AuctionPreRemovePurchasedItemEvent` | Before a purchased item is claimed |

### Post-Events

Post-Events fire **after** an action is completed. They are **not cancellable** - use them for logging, notifications, or integrations.

| Event | Description |
|-------|-------------|
| `AuctionSellEvent` | After an item is listed |
| `AuctionPurchaseEvent` | After an item is purchased |
| `AuctionRemoveListedItemEvent` | After a listed item is removed |
| `AuctionExpireEvent` | After an item expires |
