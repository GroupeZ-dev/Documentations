---
sidebar_position: 3
title: Usage Guide
description: How to use CurrenciesAPI in your plugin
---

# Usage Guide

This guide explains how to use CurrenciesAPI to interact with various currency systems.

## Basic Operations

All currency operations use three simple methods:

### Deposit

Add currency to a player's account:

```java
import fr.traqueur.currencies.Currencies;
import java.math.BigDecimal;

// Deposit 100 to player's Vault balance
Currencies.VAULT.deposit(player, new BigDecimal("100"));

// Deposit with decimal precision
Currencies.VAULT.deposit(player, new BigDecimal("99.99"));
```

### Withdraw

Remove currency from a player's account:

```java
// Withdraw 50 from player's balance
Currencies.VAULT.withdraw(player, new BigDecimal("50"));

// Check if player has enough before withdrawing
BigDecimal amount = new BigDecimal("100");
if (Currencies.VAULT.getBalance(player).compareTo(amount) >= 0) {
    Currencies.VAULT.withdraw(player, amount);
}
```

### Get Balance

Check a player's current balance:

```java
BigDecimal balance = Currencies.VAULT.getBalance(player);

// Works with offline players too
OfflinePlayer offlinePlayer = Bukkit.getOfflinePlayer(uuid);
BigDecimal offlineBalance = Currencies.VAULT.getBalance(offlinePlayer);
```

## Working with Different Currencies

### Vault Economy

```java
Currencies currency = Currencies.VAULT;

// Standard operations
currency.deposit(player, new BigDecimal("100"));
currency.withdraw(player, new BigDecimal("50"));
BigDecimal balance = currency.getBalance(player);
```

### PlayerPoints

```java
Currencies currency = Currencies.PLAYERPOINTS;

// Points are typically whole numbers
currency.deposit(player, new BigDecimal("500"));
currency.withdraw(player, new BigDecimal("100"));
BigDecimal points = currency.getBalance(player);
```

### Experience-Based Currencies

```java
// Use player levels as currency
Currencies.LEVEL.deposit(player, new BigDecimal("10")); // Add 10 levels
Currencies.LEVEL.withdraw(player, new BigDecimal("5")); // Remove 5 levels
BigDecimal levels = Currencies.LEVEL.getBalance(player);

// Use experience points as currency
Currencies.EXPERIENCE.deposit(player, new BigDecimal("1000"));
Currencies.EXPERIENCE.withdraw(player, new BigDecimal("500"));
BigDecimal xp = Currencies.EXPERIENCE.getBalance(player);
```

## Multi-Currency Systems

Some economy plugins support multiple currency types (like CoinsEngine). Use the overloaded methods:

```java
// Get balance for a specific currency type
BigDecimal gems = Currencies.COINSENGINE.getBalance(player, "gems");
BigDecimal coins = Currencies.COINSENGINE.getBalance(player, "coins");

// Deposit to specific currency
Currencies.COINSENGINE.deposit(player, new BigDecimal("100"), "gems");
```

## Item-Based Currencies

### Using zMenu Items

For item-based currencies through zMenu:

```java
// Register the provider first
Currencies.ZMENUITEMS.createProvider(plugin, configFile, "currency-path.");

// Then use normally
Currencies.ZMENUITEMS.deposit(player, new BigDecimal("10"));
```

### Using Custom Items

For native item-based currency:

```java
// Define the item that represents currency
ItemStack currencyItem = new ItemStack(Material.GOLD_NUGGET);

// Register the provider
Currencies.ITEM.registerProvider("gold_nuggets", currencyItem);

// Use the currency
Currencies.ITEM.deposit(player, new BigDecimal("64"));
Currencies.ITEM.withdraw(player, new BigDecimal("32"));
```

## Checking Currency Availability

Before using a currency, check if it's available:

```java
if (Currencies.VAULT.isEnable()) {
    // Vault is available, safe to use
    Currencies.VAULT.deposit(player, new BigDecimal("100"));
} else {
    // Vault not available, use fallback
    player.sendMessage("Economy not available!");
}
```

## Complete Example

Here's a complete example of a shop purchase:

```java
public class ShopManager {

    private final Currencies currency = Currencies.VAULT;

    public boolean purchase(Player player, BigDecimal price, ItemStack item) {
        // Check if economy is available
        if (!currency.isEnable()) {
            player.sendMessage("§cEconomy system not available!");
            return false;
        }

        // Check balance
        BigDecimal balance = currency.getBalance(player);
        if (balance.compareTo(price) < 0) {
            player.sendMessage("§cInsufficient funds! You need $" + price);
            return false;
        }

        // Process purchase
        currency.withdraw(player, price);
        player.getInventory().addItem(item);
        player.sendMessage("§aPurchase successful! -$" + price);

        return true;
    }

    public void sell(Player player, BigDecimal price, ItemStack item) {
        // Remove item from inventory
        player.getInventory().removeItem(item);

        // Add money
        currency.deposit(player, price);
        player.sendMessage("§aSold for $" + price);
    }
}
```

## Best Practices

1. **Always check availability** - Use `isEnable()` before operations
2. **Use BigDecimal** - Never use `double` for currency calculations
3. **Handle offline players** - The API supports `OfflinePlayer`
4. **Relocate the library** - Prevent conflicts with other plugins
5. **Cache currency reference** - Store `Currencies` enum value instead of calling repeatedly

## Next Steps

- [Currencies Reference](currencies) - All supported currencies and their specifics
