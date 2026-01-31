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
| `AuctionClaimExpiredEvent` | After an expired item is claimed |
| `AuctionClaimPurchasedEvent` | After a purchased item is claimed |

## Pre-Events

### AuctionPreSellEvent

Fired before an item is listed for sale.

```java
import fr.maxlego08.zauctionhouse.api.event.AuctionPreSellEvent;

@EventHandler
public void onPreSell(AuctionPreSellEvent event) {
    Player player = event.getPlayer();
    ItemStack item = event.getItemStack();
    long price = event.getPrice();
    AuctionEconomy economy = event.getEconomy();

    // Example: Block selling enchanted items for less than 1000
    if (item.getEnchantments().size() > 0 && price < 1000) {
        event.setCancelled(true);
        event.setCancelReason("Enchanted items must be listed for at least 1000!");
        return;
    }

    // Example: Log expensive items
    if (price > 100000) {
        getLogger().info(player.getName() + " is listing expensive item: " + item.getType() + " for " + price);
    }
}
```

**Available Methods:**
- `getPlayer()` - The seller
- `getItemStack()` - The item being sold
- `getPrice()` - The listing price
- `setPrice(long)` - Modify the price
- `getEconomy()` - The economy being used
- `getExpiration()` - Expiration duration
- `setExpiration(Duration)` - Modify expiration
- `setCancelled(boolean)` - Cancel the sale
- `setCancelReason(String)` - Set cancellation message

### AuctionPrePurchaseItemEvent

Fired before an item is purchased.

```java
@EventHandler
public void onPrePurchase(AuctionPrePurchaseItemEvent event) {
    Player buyer = event.getBuyer();
    AuctionItem auctionItem = event.getAuctionItem();
    Player seller = event.getSeller(); // May be null if offline

    // Example: Prevent buying from blacklisted players
    if (isBlacklisted(auctionItem.getSellerUuid())) {
        event.setCancelled(true);
        event.setCancelReason("This seller is blacklisted!");
        return;
    }

    // Example: Require confirmation for expensive items
    if (auctionItem.getPrice() > 50000 && !hasConfirmed(buyer)) {
        event.setCancelled(true);
        event.setCancelReason("Please confirm purchase of expensive item!");
    }
}
```

**Available Methods:**
- `getBuyer()` - The buying player
- `getAuctionItem()` - The item being purchased
- `getSeller()` - The seller (may be null if offline)
- `getSellerUuid()` - Seller's UUID (always available)
- `setCancelled(boolean)` - Cancel the purchase
- `setCancelReason(String)` - Set cancellation message

### AuctionPreRemoveListedItemEvent

Fired before a player removes their listed item.

```java
@EventHandler
public void onPreRemove(AuctionPreRemoveListedItemEvent event) {
    Player player = event.getPlayer();
    AuctionItem item = event.getAuctionItem();

    // Example: Cooldown between removals
    if (isOnCooldown(player)) {
        event.setCancelled(true);
        event.setCancelReason("Please wait before removing another item!");
    }
}
```

### AuctionPreRemoveExpiredItemEvent

Fired before a player claims an expired item.

```java
@EventHandler
public void onPreClaimExpired(AuctionPreRemoveExpiredItemEvent event) {
    Player player = event.getPlayer();
    AuctionItem item = event.getAuctionItem();

    // Example: Charge fee for claiming expired items
    double fee = 100;
    if (!economy.has(player, fee)) {
        event.setCancelled(true);
        event.setCancelReason("You need $100 to claim expired items!");
    }
}
```

### AuctionPreRemovePurchasedItemEvent

Fired before a player claims a purchased item.

```java
@EventHandler
public void onPreClaimPurchased(AuctionPreRemovePurchasedItemEvent event) {
    Player player = event.getPlayer();
    AuctionItem item = event.getAuctionItem();

    // Example: Check inventory space
    if (player.getInventory().firstEmpty() == -1) {
        event.setCancelled(true);
        event.setCancelReason("Your inventory is full!");
    }
}
```

## Post-Events

### AuctionSellEvent

Fired after an item is successfully listed.

```java
import fr.maxlego08.zauctionhouse.api.event.AuctionSellEvent;

@EventHandler
public void onSell(AuctionSellEvent event) {
    Player player = event.getPlayer();
    AuctionItem auctionItem = event.getAuctionItem();

    // Log to database
    logSale(
        player.getUniqueId(),
        auctionItem.getItemStack(),
        auctionItem.getPrice()
    );

    // Discord notification
    sendDiscordMessage(String.format(
        "%s listed %s for %d",
        player.getName(),
        auctionItem.getItemStack().getType(),
        auctionItem.getPrice()
    ));
}
```

### AuctionPurchaseEvent

Fired after an item is successfully purchased.

```java
import fr.maxlego08.zauctionhouse.api.event.AuctionPurchaseEvent;

@EventHandler
public void onPurchase(AuctionPurchaseEvent event) {
    Player buyer = event.getBuyer();
    AuctionItem item = event.getAuctionItem();
    UUID sellerUuid = event.getSellerUuid();
    long price = event.getPrice();

    // Statistics tracking
    incrementStat(sellerUuid, "items_sold");
    incrementStat(buyer.getUniqueId(), "items_bought");
    addMoneyStat(sellerUuid, "money_earned", price);
    addMoneyStat(buyer.getUniqueId(), "money_spent", price);

    // Achievement check
    checkAchievement(buyer, "first_purchase");
}
```

### AuctionExpireEvent

Fired when an item automatically expires.

```java
import fr.maxlego08.zauctionhouse.api.event.AuctionExpireEvent;

@EventHandler
public void onExpire(AuctionExpireEvent event) {
    AuctionItem item = event.getAuctionItem();
    UUID ownerUuid = item.getSellerUuid();

    // Notify player if online
    Player owner = Bukkit.getPlayer(ownerUuid);
    if (owner != null) {
        owner.sendMessage("Your " + item.getItemStack().getType() + " has expired!");
    }

    // Log expiration
    logExpiration(item);
}
```

### AuctionRemoveListedItemEvent

Fired after a listed item is removed by the owner.

```java
@EventHandler
public void onRemove(AuctionRemoveListedItemEvent event) {
    Player player = event.getPlayer();
    AuctionItem item = event.getAuctionItem();

    getLogger().info(player.getName() + " removed listing: " + item.getItemStack().getType());
}
```

## Registering Listeners

Register your event listener like any Bukkit listener:

```java
public class MyPlugin extends JavaPlugin implements Listener {

    @Override
    public void onEnable() {
        // Register events
        getServer().getPluginManager().registerEvents(this, this);
    }

    @EventHandler
    public void onAuctionSell(AuctionSellEvent event) {
        // Handle event
    }

    @EventHandler(priority = EventPriority.HIGH)
    public void onPreSell(AuctionPreSellEvent event) {
        // Handle pre-event with high priority
    }
}
```

## Event Priorities

Use standard Bukkit event priorities:

```java
@EventHandler(priority = EventPriority.LOWEST)
public void onPreSellFirst(AuctionPreSellEvent event) {
    // Runs first
}

@EventHandler(priority = EventPriority.MONITOR)
public void onPreSellLast(AuctionPreSellEvent event) {
    // Runs last, only for monitoring
    // Do not modify event here
}
```

## Complete Example

```java
public class AuctionIntegration extends JavaPlugin implements Listener {

    @Override
    public void onEnable() {
        getServer().getPluginManager().registerEvents(this, this);
    }

    // Validate sales
    @EventHandler(priority = EventPriority.NORMAL)
    public void onPreSell(AuctionPreSellEvent event) {
        Player player = event.getPlayer();

        // Check custom permission for high-value items
        if (event.getPrice() > 100000 && !player.hasPermission("auction.highvalue")) {
            event.setCancelled(true);
            event.setCancelReason("You cannot list items over $100,000!");
        }
    }

    // Log all sales
    @EventHandler
    public void onSell(AuctionSellEvent event) {
        getLogger().info(String.format(
            "[SALE] %s listed %s x%d for %d %s",
            event.getPlayer().getName(),
            event.getAuctionItem().getItemStack().getType(),
            event.getAuctionItem().getItemStack().getAmount(),
            event.getAuctionItem().getPrice(),
            event.getAuctionItem().getEconomy().getName()
        ));
    }

    // Track purchases
    @EventHandler
    public void onPurchase(AuctionPurchaseEvent event) {
        // Update leaderboards
        updateLeaderboard("purchases", event.getBuyer().getUniqueId(), 1);
        updateLeaderboard("sales", event.getSellerUuid(), 1);
    }

    // Handle expirations
    @EventHandler
    public void onExpire(AuctionExpireEvent event) {
        // Mail notification for offline players
        UUID owner = event.getAuctionItem().getSellerUuid();
        if (Bukkit.getPlayer(owner) == null) {
            sendMail(owner, "Your auction item has expired!");
        }
    }
}
```
