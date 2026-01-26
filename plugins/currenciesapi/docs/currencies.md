---
sidebar_position: 4
title: Currencies Reference
description: Complete reference of all supported currencies
---

# Currencies Reference

Complete reference for all currency systems supported by CurrenciesAPI.

## Currency Overview

| Currency | Enum Value | Multi-Currency | Requires Setup |
|----------|------------|----------------|----------------|
| Vault | `VAULT` | No | No |
| PlayerPoints | `PLAYERPOINTS` | No | No |
| EcoBits | `ECOBITS` | Yes | No |
| CoinsEngine | `COINSENGINE` | Yes | No |
| zEssentials | `ZESSENTIALS` | No | No |
| VotingPlugin | `VOTINGPLUGIN` | No | No |
| RedisEconomy | `REDISECONOMY` | Yes | No |
| RoyaleEconomy | `ROYALEECONOMY` | Yes | No |
| ElementalTokens | `ELEMENTALTOKENS` | No | No |
| ElementalGems | `ELEMENTALGEMS` | No | No |
| BeastTokens | `BEASTTOKENS` | No | No |
| zMenu Items | `ZMENUITEMS` | No | Yes |
| Items | `ITEM` | No | Yes |
| Levels | `LEVEL` | No | No |
| Experience | `EXPERIENCE` | No | No |

## Economy Plugins

### Vault

The most common economy wrapper for Minecraft servers.

```java
Currencies currency = Currencies.VAULT;

currency.deposit(player, new BigDecimal("100"));
currency.withdraw(player, new BigDecimal("50"));
BigDecimal balance = currency.getBalance(player);
```

**Requirements:** Vault plugin + an economy provider (EssentialsX, CMI, etc.)

---

### PlayerPoints

Points-based economy system.

```java
Currencies currency = Currencies.PLAYERPOINTS;

currency.deposit(player, new BigDecimal("500"));
currency.withdraw(player, new BigDecimal("100"));
BigDecimal points = currency.getBalance(player);
```

**Link:** [SpigotMC](https://www.spigotmc.org/resources/playerpoints.80745/)

---

### CoinsEngine

Multi-currency economy system.

```java
Currencies currency = Currencies.COINSENGINE;

// Default currency
currency.deposit(player, new BigDecimal("100"));

// Specific currency
BigDecimal gems = currency.getBalance(player, "gems");
BigDecimal coins = currency.getBalance(player, "coins");
```

**Link:** [SpigotMC](https://www.spigotmc.org/resources/coinsengine.84121/)

---

### EcoBits

Economy system with multiple currency support.

```java
Currencies currency = Currencies.ECOBITS;

// With specific currency
BigDecimal crystals = currency.getBalance(player, "crystals");
```

**Link:** [SpigotMC](https://www.spigotmc.org/resources/ecobits.110857/)

---

### zEssentials

GroupeZ essentials plugin economy.

```java
Currencies currency = Currencies.ZESSENTIALS;

currency.deposit(player, new BigDecimal("100"));
currency.withdraw(player, new BigDecimal("50"));
BigDecimal balance = currency.getBalance(player);
```

**Link:** [SpigotMC](https://www.spigotmc.org/resources/zessentials.111402/)

---

### VotingPlugin

Vote points from VotingPlugin.

```java
Currencies currency = Currencies.VOTINGPLUGIN;

// Add vote points
currency.deposit(player, new BigDecimal("10"));
BigDecimal votePoints = currency.getBalance(player);
```

**Link:** [SpigotMC](https://www.spigotmc.org/resources/votingplugin.15358/)

---

### RedisEconomy

Redis-based economy for network servers.

```java
Currencies currency = Currencies.REDISECONOMY;

// Supports multiple currencies
BigDecimal balance = currency.getBalance(player, "dollars");
```

**Link:** [SpigotMC](https://www.spigotmc.org/resources/rediseconomy.108829/)

---

### RoyaleEconomy

Multi-currency economy plugin.

```java
Currencies currency = Currencies.ROYALEECONOMY;

BigDecimal balance = currency.getBalance(player, "gold");
```

**Link:** [SpigotMC](https://www.spigotmc.org/resources/royale-economy.81135/)

---

## Token Systems

### ElementalTokens

Token-based currency.

```java
Currencies currency = Currencies.ELEMENTALTOKENS;

currency.deposit(player, new BigDecimal("100"));
BigDecimal tokens = currency.getBalance(player);
```

---

### ElementalGems

Gem-based currency from the same author.

```java
Currencies currency = Currencies.ELEMENTALGEMS;

currency.deposit(player, new BigDecimal("50"));
BigDecimal gems = currency.getBalance(player);
```

---

### BeastTokens

Beast tokens economy system.

```java
Currencies currency = Currencies.BEASTTOKENS;

currency.deposit(player, new BigDecimal("1000"));
BigDecimal tokens = currency.getBalance(player);
```

**Link:** [SpigotMC](https://www.spigotmc.org/resources/beasttokens.91361/)

---

## Item-Based Currencies

### zMenu Items

Use items defined in zMenu configuration as currency.

```java
Currencies currency = Currencies.ZMENUITEMS;

// Setup required - provide plugin, config file, and path
currency.createProvider(plugin, configFile, "items.currency.");

// Then use normally
currency.deposit(player, new BigDecimal("10"));
currency.withdraw(player, new BigDecimal("5"));
BigDecimal balance = currency.getBalance(player);
```

**Configuration path format:** Must end with a dot (`.`)

---

### Custom Items

Use any ItemStack as currency.

```java
Currencies currency = Currencies.ITEM;

// Register the item as currency
ItemStack goldNugget = new ItemStack(Material.GOLD_NUGGET);
ItemMeta meta = goldNugget.getItemMeta();
meta.setDisplayName("§6Gold Coin");
goldNugget.setItemMeta(meta);

currency.registerProvider("gold_coins", goldNugget);

// Use the currency
currency.deposit(player, new BigDecimal("64")); // Give 64 gold coins
currency.withdraw(player, new BigDecimal("32")); // Take 32 gold coins
BigDecimal coins = currency.getBalance(player); // Count coins in inventory
```

---

## Experience-Based

### Player Levels

Use player experience levels as currency.

```java
Currencies currency = Currencies.LEVEL;

// Add 10 levels
currency.deposit(player, new BigDecimal("10"));

// Remove 5 levels
currency.withdraw(player, new BigDecimal("5"));

// Get current level
BigDecimal level = currency.getBalance(player);
```

---

### Experience Points

Use raw experience points as currency.

```java
Currencies currency = Currencies.EXPERIENCE;

// Add 1000 XP
currency.deposit(player, new BigDecimal("1000"));

// Remove 500 XP
currency.withdraw(player, new BigDecimal("500"));

// Get total XP
BigDecimal xp = currency.getBalance(player);
```

---

## Checking Availability

Always check if a currency provider is available before use:

```java
for (Currencies currency : Currencies.values()) {
    if (currency.isEnable()) {
        System.out.println(currency.name() + " is available!");
    }
}
```

## Adding Custom Providers

If you need to add support for a currency not included in CurrenciesAPI, you can contribute to the project on [GitHub](https://github.com/GroupeZ-dev/CurrenciesAPI).
