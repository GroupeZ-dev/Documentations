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

## AuctionSellService

Handles all item listing operations.

### Interface

```java
public interface AuctionSellService {

    /**
     * Sell an item.
     *
     * @param player The seller
     * @param itemStack The item to sell
     * @param price The listing price
     * @param economy The economy to use
     * @return CompletableFuture with the result
     */
    CompletableFuture<SellResult> sell(
        Player player,
        ItemStack itemStack,
        long price,
        AuctionEconomy economy
    );

    /**
     * Sell an item with custom expiration.
     *
     * @param player The seller
     * @param itemStack The item to sell
     * @param price The listing price
     * @param economy The economy to use
     * @param expiration Custom expiration duration
     * @return CompletableFuture with the result
     */
    CompletableFuture<SellResult> sell(
        Player player,
        ItemStack itemStack,
        long price,
        AuctionEconomy economy,
        Duration expiration
    );

    /**
     * Check if a player can sell an item.
     *
     * @param player The player
     * @param itemStack The item
     * @param price The price
     * @param economy The economy
     * @return Validation result
     */
    SellValidation validate(
        Player player,
        ItemStack itemStack,
        long price,
        AuctionEconomy economy
    );
}
```

### Usage Example

```java
AuctionSellService sellService = auctionPlugin.getSellService();
EconomyManager economyManager = auctionPlugin.getEconomyManager();

// Get economy
AuctionEconomy economy = economyManager.getEconomy("vault").orElseThrow();

// Get item from player
ItemStack item = player.getInventory().getItemInMainHand();
long price = 5000;

// Validate first (optional but recommended)
SellValidation validation = sellService.validate(player, item, price, economy);
if (!validation.isValid()) {
    player.sendMessage("Cannot sell: " + validation.getReason());
    return;
}

// Sell the item
sellService.sell(player, item, price, economy)
    .thenAccept(result -> {
        Bukkit.getScheduler().runTask(plugin, () -> {
            if (result.isSuccess()) {
                // Remove item from player
                player.getInventory().setItemInMainHand(null);
                player.sendMessage("Listed for " + price + "!");
            } else {
                player.sendMessage("Failed: " + result.getMessage());
            }
        });
    });
```

### SellResult

```java
public interface SellResult {
    boolean isSuccess();
    String getMessage();
    Optional<AuctionItem> getAuctionItem();
    SellFailReason getFailReason(); // NULL if successful
}

public enum SellFailReason {
    NO_PERMISSION,
    LIMIT_REACHED,
    PRICE_TOO_LOW,
    PRICE_TOO_HIGH,
    ITEM_BLACKLISTED,
    COOLDOWN,
    CANCELLED_BY_EVENT,
    DATABASE_ERROR
}
```

## AuctionPurchaseService

Handles item purchases.

### Interface

```java
public interface AuctionPurchaseService {

    /**
     * Purchase an item.
     *
     * @param buyer The buying player
     * @param auctionItem The item to purchase
     * @return CompletableFuture with the result
     */
    CompletableFuture<PurchaseResult> purchase(
        Player buyer,
        AuctionItem auctionItem
    );

    /**
     * Check if a player can purchase an item.
     *
     * @param buyer The player
     * @param auctionItem The item
     * @return Validation result
     */
    PurchaseValidation validate(Player buyer, AuctionItem auctionItem);
}
```

### Usage Example

```java
AuctionPurchaseService purchaseService = auctionPlugin.getPurchaseService();
AuctionManager manager = auctionPlugin.getAuctionManager();

// Get item by ID
UUID itemId = UUID.fromString("...");
AuctionItem item = manager.getItem(itemId).orElseThrow();

// Validate
PurchaseValidation validation = purchaseService.validate(player, item);
if (!validation.isValid()) {
    player.sendMessage("Cannot buy: " + validation.getReason());
    return;
}

// Purchase
purchaseService.purchase(player, item)
    .thenAccept(result -> {
        Bukkit.getScheduler().runTask(plugin, () -> {
            if (result.isSuccess()) {
                // Give item to player or add to claim
                if (result.isItemGiven()) {
                    player.sendMessage("Purchased! Item added to inventory.");
                } else {
                    player.sendMessage("Purchased! Claim from /ah purchased.");
                }
            } else {
                player.sendMessage("Failed: " + result.getMessage());
            }
        });
    });
```

### PurchaseResult

```java
public interface PurchaseResult {
    boolean isSuccess();
    String getMessage();
    boolean isItemGiven(); // true if added to inventory, false if needs claiming
    PurchaseFailReason getFailReason();
}

public enum PurchaseFailReason {
    ITEM_NOT_FOUND,
    ITEM_ALREADY_SOLD,
    NOT_ENOUGH_MONEY,
    OWN_ITEM,
    COOLDOWN,
    CANCELLED_BY_EVENT,
    DATABASE_ERROR
}
```

## AuctionRemoveService

Handles item removal from listings.

### Interface

```java
public interface AuctionRemoveService {

    /**
     * Remove a listed item (return to seller).
     *
     * @param player The owner
     * @param auctionItem The item to remove
     * @return CompletableFuture with the result
     */
    CompletableFuture<RemoveResult> removeListedItem(
        Player player,
        AuctionItem auctionItem
    );

    /**
     * Claim an expired item.
     *
     * @param player The owner
     * @param auctionItem The expired item
     * @return CompletableFuture with the result
     */
    CompletableFuture<RemoveResult> claimExpiredItem(
        Player player,
        AuctionItem auctionItem
    );

    /**
     * Claim a purchased item.
     *
     * @param player The buyer
     * @param auctionItem The purchased item
     * @return CompletableFuture with the result
     */
    CompletableFuture<RemoveResult> claimPurchasedItem(
        Player player,
        AuctionItem auctionItem
    );

    /**
     * Claim all expired items for a player.
     *
     * @param player The owner
     * @return CompletableFuture with the count of claimed items
     */
    CompletableFuture<Integer> claimAllExpiredItems(Player player);

    /**
     * Claim all purchased items for a player.
     *
     * @param player The buyer
     * @return CompletableFuture with the count of claimed items
     */
    CompletableFuture<Integer> claimAllPurchasedItems(Player player);
}
```

### Usage Example

```java
AuctionRemoveService removeService = auctionPlugin.getRemoveService();

// Remove a listed item
removeService.removeListedItem(player, auctionItem)
    .thenAccept(result -> {
        Bukkit.getScheduler().runTask(plugin, () -> {
            if (result.isSuccess()) {
                player.sendMessage("Item removed and returned to inventory.");
            }
        });
    });

// Claim all expired items
removeService.claimAllExpiredItems(player)
    .thenAccept(count -> {
        Bukkit.getScheduler().runTask(plugin, () -> {
            player.sendMessage("Claimed " + count + " expired items.");
        });
    });
```

## AuctionExpireService

Handles automatic expiration of items.

### Interface

```java
public interface AuctionExpireService {

    /**
     * Manually expire an item.
     *
     * @param auctionItem The item to expire
     * @return CompletableFuture with the result
     */
    CompletableFuture<Boolean> expireItem(AuctionItem auctionItem);

    /**
     * Expire all items from a player.
     *
     * @param playerUuid The player's UUID
     * @return CompletableFuture with the count of expired items
     */
    CompletableFuture<Integer> expireAllItems(UUID playerUuid);

    /**
     * Check for expired items and process them.
     * Called automatically by the plugin.
     */
    void checkExpiredItems();
}
```

### Usage Example (Admin Feature)

```java
AuctionExpireService expireService = auctionPlugin.getExpireService();

// Expire all items from a player (admin action)
UUID targetUuid = Bukkit.getOfflinePlayer("PlayerName").getUniqueId();

expireService.expireAllItems(targetUuid)
    .thenAccept(count -> {
        sender.sendMessage("Expired " + count + " items from player.");
    });
```

## Error Handling

All services return CompletableFutures. Handle errors properly:

```java
sellService.sell(player, item, price, economy)
    .thenAccept(result -> {
        // Handle success/failure
    })
    .exceptionally(throwable -> {
        // Handle unexpected errors
        plugin.getLogger().severe("Error during sell: " + throwable.getMessage());
        Bukkit.getScheduler().runTask(plugin, () -> {
            player.sendMessage("An error occurred. Please try again.");
        });
        return null;
    });
```

## Thread Safety

All service methods are thread-safe. Results are delivered on async threads, so use `Bukkit.getScheduler().runTask()` when interacting with Bukkit API:

```java
purchaseService.purchase(player, item)
    .thenAccept(result -> {
        // This runs on async thread
        Bukkit.getScheduler().runTask(plugin, () -> {
            // Safe to use Bukkit API here
            player.sendMessage("...");
            player.getInventory().addItem(item.getItemStack());
        });
    });
```
