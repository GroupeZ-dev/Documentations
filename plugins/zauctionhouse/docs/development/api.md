---
sidebar_position: 1
title: API
description: zAuctionHouse Developer API
---

# Developer API

Integrate zAuctionHouse with your own plugins using the API.

## Resources

- **JavaDoc**: [javadocs.groupez.dev/zauctionhousev3](https://javadocs.groupez.dev/zauctionhousev3)
- **Repository**: [JitPack](https://jitpack.io/#Maxlego08/zAuctionHouseV3-API/)

## Maven Setup

Add JitPack repository:

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
```

Add the dependency:

```xml
<dependencies>
    <dependency>
        <groupId>com.github.Maxlego08</groupId>
        <artifactId>zAuctionHouseV3-API</artifactId>
        <version>3.2.1.9</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

## Gradle Setup

Add JitPack repository:

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}
```

Add the dependency:

```groovy
dependencies {
    compileOnly 'com.github.Maxlego08:zAuctionHouseV3-API:3.2.1.9'
}
```

## Getting the API

```java
import fr.maxlego08.zauctionhouse.api.AuctionPlugin;
import fr.maxlego08.zauctionhouse.api.AuctionManager;
import org.bukkit.Bukkit;
import org.bukkit.plugin.RegisteredServiceProvider;

public class MyPlugin extends JavaPlugin {

    private AuctionPlugin auctionPlugin;
    private AuctionManager auctionManager;

    @Override
    public void onEnable() {
        // Get zAuctionHouse API
        RegisteredServiceProvider<AuctionPlugin> provider =
            Bukkit.getServicesManager().getRegistration(AuctionPlugin.class);

        if (provider != null) {
            this.auctionPlugin = provider.getProvider();
            this.auctionManager = auctionPlugin.getAuctionManager();
        }
    }
}
```

## Available Managers

The API provides access to these managers:

| Manager | Description |
|---------|-------------|
| `AuctionManager` | Core auction operations |
| `InventoryManager` | Inventory management |
| `CategoryManager` | Category operations |
| `TransactionManager` | Transaction history |
| `ConvertManager` | Data conversion |
| `FilterManager` | Search and filtering |
| `StoreManager` | Item storage |
| `IBlacklistManager` | Player blacklist |
| `EconomyManager` | Economy operations |

### Getting Managers

```java
AuctionManager auctionManager = auctionPlugin.getAuctionManager();
CategoryManager categoryManager = auctionPlugin.getCategoryManager();
TransactionManager transactionManager = auctionPlugin.getTransactionManager();
EconomyManager economyManager = auctionPlugin.getEconomyManager();
```

## Common Operations

### List an Item

```java
import fr.maxlego08.zauctionhouse.api.AuctionItem;

// Create an auction item
AuctionItem item = auctionManager.createAuctionItem(
    player,           // Seller
    itemStack,        // ItemStack to sell
    price,            // Price (long)
    economy           // Economy to use
);

// Add to auction house
auctionManager.addItem(item);
```

### Get Player's Items

```java
List<AuctionItem> playerItems = auctionManager.getItems(player.getUniqueId());
```

### Get All Items

```java
List<AuctionItem> allItems = auctionManager.getItems();
```

### Remove an Item

```java
auctionManager.removeItem(auctionItem);
```

## Events

zAuctionHouse fires events you can listen to:

```java
import fr.maxlego08.zauctionhouse.api.event.*;

public class MyListener implements Listener {

    @EventHandler
    public void onItemSold(AuctionItemSoldEvent event) {
        Player seller = event.getSeller();
        Player buyer = event.getBuyer();
        AuctionItem item = event.getAuctionItem();
        long price = event.getPrice();

        // Your logic here
    }

    @EventHandler
    public void onItemListed(AuctionItemListEvent event) {
        Player seller = event.getPlayer();
        AuctionItem item = event.getAuctionItem();

        // Your logic here
    }

    @EventHandler
    public void onItemExpired(AuctionItemExpireEvent event) {
        AuctionItem item = event.getAuctionItem();

        // Your logic here
    }
}
```

## Custom Economy

See the [Custom Economy](./custom-economy) page for creating custom economy implementations.

## Support

For API questions, join our [Discord](https://discord.groupez.dev).
