---
sidebar_position: 4
title: Items
description: Working with Item and AuctionItem interfaces in zAuctionHouse
---

# Items

zAuctionHouse uses a clean abstraction layer for items. Understanding the `Item` and `AuctionItem` interfaces is essential for API integration.

## Item Interface

The base `Item` interface represents any item in the system:

```java
public interface Item {

    /**
     * Get the unique identifier of this item.
     */
    UUID getUniqueId();

    /**
     * Get the Bukkit ItemStack.
     */
    ItemStack getItemStack();

    /**
     * Get the item type (what kind of storage item).
     */
    ItemType getType();

    /**
     * Get the current storage type (where the item is stored).
     */
    StorageType getStorageType();

    /**
     * Get the owner's UUID.
     */
    UUID getOwnerUuid();

    /**
     * Get when the item was created.
     */
    Instant getCreatedAt();
}
```

## AuctionItem Interface

The `AuctionItem` extends `Item` with auction-specific data:

```java
public interface AuctionItem extends Item {

    /**
     * Get the seller's UUID.
     */
    UUID getSellerUuid();

    /**
     * Get the seller's name (cached).
     */
    String getSellerName();

    /**
     * Get the listing price.
     */
    long getPrice();

    /**
     * Get the current price (after reductions).
     */
    long getCurrentPrice();

    /**
     * Get the economy used for this item.
     */
    AuctionEconomy getEconomy();

    /**
     * Get the economy name.
     */
    String getEconomyName();

    /**
     * Get when the item was listed.
     */
    Instant getListedAt();

    /**
     * Get when the item expires.
     */
    Instant getExpiresAt();

    /**
     * Check if the item has expired.
     */
    boolean isExpired();

    /**
     * Get the item's category.
     */
    Optional<Category> getCategory();

    /**
     * Get the category name.
     */
    String getCategoryName();

    /**
     * Get the item status.
     */
    ItemStatus getStatus();

    /**
     * Get the buyer's UUID (if sold).
     */
    Optional<UUID> getBuyerUuid();

    /**
     * Get when the item was purchased (if sold).
     */
    Optional<Instant> getPurchasedAt();
}
```

## ItemType Enum

Defines what kind of item this is:

```java
public enum ItemType {
    /**
     * A regular auction item listed for sale.
     */
    AUCTION,

    /**
     * Reserved for future use (bidding system).
     */
    BID,

    /**
     * Reserved for future use (buy orders).
     */
    BUY_ORDER
}
```

## StorageType Enum

Defines where the item is currently stored:

```java
public enum StorageType {
    /**
     * Item is actively listed on the auction house.
     */
    LISTED,

    /**
     * Item has expired and is waiting to be claimed by seller.
     */
    EXPIRED,

    /**
     * Item was purchased and is waiting to be claimed by buyer.
     */
    PURCHASED,

    /**
     * Item was returned to the seller (removed from listing).
     */
    RETURNED,

    /**
     * Item was delivered to the buyer.
     */
    DELIVERED
}
```

## ItemStatus Enum

The current status of an item:

```java
public enum ItemStatus {
    /**
     * Item is available for purchase.
     */
    ACTIVE,

    /**
     * Item has been purchased.
     */
    SOLD,

    /**
     * Item has expired.
     */
    EXPIRED,

    /**
     * Item was removed by owner.
     */
    REMOVED,

    /**
     * Item has been claimed.
     */
    CLAIMED
}
```

## Working with AuctionItems

### Get Item Information

```java
AuctionItem item = ...; // From event or manager

// Basic info
UUID itemId = item.getUniqueId();
ItemStack stack = item.getItemStack();
String seller = item.getSellerName();
long price = item.getCurrentPrice();

// Timing
Instant listed = item.getListedAt();
Instant expires = item.getExpiresAt();
boolean isExpired = item.isExpired();

// Time until expiration
Duration timeLeft = Duration.between(Instant.now(), expires);
long hoursLeft = timeLeft.toHours();

// Category
String category = item.getCategoryName();
```

### Check Item Status

```java
// Check if item is still available
if (item.getStatus() == ItemStatus.ACTIVE) {
    // Can be purchased
}

// Check storage location
switch (item.getStorageType()) {
    case LISTED:
        // Visible in auction house
        break;
    case EXPIRED:
        // In seller's expired items
        break;
    case PURCHASED:
        // Waiting for buyer to claim
        break;
}

// Check if sold
if (item.getBuyerUuid().isPresent()) {
    UUID buyer = item.getBuyerUuid().get();
    Instant purchaseTime = item.getPurchasedAt().get();
}
```

### Search and Filter

```java
AuctionManager manager = auctionPlugin.getAuctionManager();

// Get all active items
List<AuctionItem> allItems = manager.getListedItems();

// Filter by price range
List<AuctionItem> affordable = allItems.stream()
    .filter(item -> item.getCurrentPrice() <= 10000)
    .collect(Collectors.toList());

// Filter by category
List<AuctionItem> weapons = allItems.stream()
    .filter(item -> "weapons".equals(item.getCategoryName()))
    .collect(Collectors.toList());

// Filter by economy
List<AuctionItem> vaultItems = allItems.stream()
    .filter(item -> "vault".equals(item.getEconomyName()))
    .collect(Collectors.toList());

// Filter by seller
UUID targetSeller = ...;
List<AuctionItem> sellerItems = manager.getListedItems(targetSeller);

// Sort by price
List<AuctionItem> sorted = allItems.stream()
    .sorted(Comparator.comparingLong(AuctionItem::getCurrentPrice))
    .collect(Collectors.toList());

// Sort by newest
List<AuctionItem> newest = allItems.stream()
    .sorted(Comparator.comparing(AuctionItem::getListedAt).reversed())
    .collect(Collectors.toList());
```

### Display Item Information

```java
public void displayItem(Player player, AuctionItem item) {
    ItemStack stack = item.getItemStack();

    player.sendMessage("§6Item: §f" + getItemName(stack));
    player.sendMessage("§6Amount: §f" + stack.getAmount());
    player.sendMessage("§6Seller: §f" + item.getSellerName());
    player.sendMessage("§6Price: §f" + item.getCurrentPrice() + " " + item.getEconomyName());
    player.sendMessage("§6Category: §f" + item.getCategoryName());

    // Time remaining
    if (!item.isExpired()) {
        Duration remaining = Duration.between(Instant.now(), item.getExpiresAt());
        player.sendMessage("§6Expires in: §f" + formatDuration(remaining));
    } else {
        player.sendMessage("§cExpired");
    }
}

private String getItemName(ItemStack item) {
    if (item.hasItemMeta() && item.getItemMeta().hasDisplayName()) {
        return item.getItemMeta().getDisplayName();
    }
    return item.getType().name();
}

private String formatDuration(Duration duration) {
    long hours = duration.toHours();
    long minutes = duration.toMinutesPart();
    if (hours > 24) {
        return (hours / 24) + "d " + (hours % 24) + "h";
    }
    return hours + "h " + minutes + "m";
}
```

## Creating Custom Queries

```java
public class AuctionQueries {

    private final AuctionManager manager;

    public AuctionQueries(AuctionPlugin plugin) {
        this.manager = plugin.getAuctionManager();
    }

    /**
     * Get the most expensive items.
     */
    public List<AuctionItem> getMostExpensive(int limit) {
        return manager.getListedItems().stream()
            .sorted(Comparator.comparingLong(AuctionItem::getCurrentPrice).reversed())
            .limit(limit)
            .collect(Collectors.toList());
    }

    /**
     * Get items expiring soon.
     */
    public List<AuctionItem> getExpiringSoon(Duration within) {
        Instant threshold = Instant.now().plus(within);
        return manager.getListedItems().stream()
            .filter(item -> item.getExpiresAt().isBefore(threshold))
            .sorted(Comparator.comparing(AuctionItem::getExpiresAt))
            .collect(Collectors.toList());
    }

    /**
     * Get items by material type.
     */
    public List<AuctionItem> getByMaterial(Material material) {
        return manager.getListedItems().stream()
            .filter(item -> item.getItemStack().getType() == material)
            .collect(Collectors.toList());
    }

    /**
     * Get total value of all listings.
     */
    public Map<String, Long> getTotalValueByEconomy() {
        return manager.getListedItems().stream()
            .collect(Collectors.groupingBy(
                AuctionItem::getEconomyName,
                Collectors.summingLong(AuctionItem::getCurrentPrice)
            ));
    }

    /**
     * Get top sellers by listing count.
     */
    public Map<UUID, Long> getTopSellers(int limit) {
        return manager.getListedItems().stream()
            .collect(Collectors.groupingBy(
                AuctionItem::getSellerUuid,
                Collectors.counting()
            ))
            .entrySet().stream()
            .sorted(Map.Entry.<UUID, Long>comparingByValue().reversed())
            .limit(limit)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue,
                (e1, e2) -> e1,
                LinkedHashMap::new
            ));
    }
}
```
