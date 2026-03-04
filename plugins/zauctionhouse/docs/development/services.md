---
sidebar_position: 2
title: Services
description: zAuctionHouse service-based architecture
---

# Services

zAuctionHouse uses a service-based architecture where each major operation has its own dedicated service.

## Service Overview

| Service | Purpose |
|---------|---------|
| `AuctionSellService` | Handle item listing |
| `AuctionPurchaseService` | Handle item purchases |
| `AuctionRemoveService` | Handle item removal |
| `AuctionExpireService` | Handle item expiration |
| `AuctionHistoryService` | Access transaction history |
| `AuctionClaimService` | Handle money claims from sales |

## AuctionSellService

Handles all item listing operations. Allows selling items, validating sales, and managing listing limits.

```java
public interface AuctionSellService {

    void sellAuctionItems(Player player, BigDecimal price, long expiredAt, Map<Integer, ItemStack> slotItems, AuctionEconomy auctionEconomy);

    void openSellCommandInventory(Player player, BigDecimal price, AuctionEconomy auctionEconomy);
}
```

## AuctionPurchaseService

Handles item purchases. Validates buyer funds, processes transactions, and transfers items.

```java
public interface AuctionPurchaseService {

    CompletableFuture<Void> purchaseItem(Player player, Item item);
}
```

## AuctionRemoveService

Handles item removal from listings, expired items, and purchased items. Returns items to players.

```java
public interface AuctionRemoveService {

    CompletableFuture<Void> removeListedItem(Player player, Item item);

    CompletableFuture<Void> removeSellingItem(Player player, Item item);

    CompletableFuture<Void> removeExpiredItem(Player player, Item item);

    CompletableFuture<Void> removePurchasedItem(Player player, Item item);

}
```

## AuctionExpireService

Handles automatic and manual expiration of items. Moves items from active listings to expired state.

```java
public interface AuctionExpireService {

    void processExpiredItem(Item item, StorageType storageType);

    void processExpiredItems(List<Item> items, StorageType storageType);

}
```

## AuctionHistoryService

Provides access to transaction history and player statistics. Retrieves past sales and purchases.

```java
public interface AuctionHistoryService {

    CompletableFuture<List<ItemLog>> getSalesHistory(UUID playerUniqueId);

    CompletableFuture<List<LogDTO>> getUnreadSales(UUID playerUniqueId);

    CompletableFuture<Void> markSalesAsRead(List<Integer> logIds);

    void handlePlayerJoin(Player player);

    void openHistoryInventory(Player player);

    void openHistoryInventory(Player player, int page);
}
```

## AuctionClaimService

Handles money claims from completed sales. Players receive money when their items are sold.

```java
public interface AuctionClaimService {

    CompletableFuture<ClaimResult> claim(Player player);

    CompletableFuture<ClaimResult> claim(Player player, AuctionEconomy economy);

    double getPendingAmount(UUID playerUuid);

    Map<AuctionEconomy, Double> getPendingAmounts(UUID playerUuid);

    boolean hasPendingClaims(UUID playerUuid);
}
```