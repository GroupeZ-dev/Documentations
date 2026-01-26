---
sidebar_position: 1
title: Introduction
description: A unified API for multiple currency systems in Minecraft
---

# CurrenciesAPI

CurrenciesAPI is a Java library for Bukkit/Spigot plugin developers that provides a unified interface to interact with multiple in-game currency systems. It allows plugins to work seamlessly across different economy plugins without writing separate integration code.

- **GitHub**: [https://github.com/GroupeZ-dev/CurrenciesAPI](https://github.com/GroupeZ-dev/CurrenciesAPI)
- **Maven Repository**: [https://repo.groupez.dev/releases](https://repo.groupez.dev/#/releases/fr/traqueur/currencies/currenciesapi)
- **Discord**: [https://discord.groupez.dev](https://discord.groupez.dev)

## Why CurrenciesAPI?

Instead of writing separate integration code for each economy plugin, CurrenciesAPI provides a single, consistent interface:

```java
// Works with ANY supported currency system
Currencies currency = Currencies.VAULT;
currency.deposit(player, new BigDecimal("100.50"));
currency.withdraw(player, new BigDecimal("50.00"));
BigDecimal balance = currency.getBalance(player);
```

## Supported Currencies

CurrenciesAPI integrates with 15+ economy systems:

| Currency | Type | Description |
|----------|------|-------------|
| **Vault** | Economy | Primary economy wrapper |
| **PlayerPoints** | Points | Points-based economy |
| **EcoBits** | Economy | EcoBits currency system |
| **CoinsEngine** | Economy | Multi-currency support |
| **zEssentials** | Economy | zEssentials integration |
| **VotingPlugin** | Points | Vote points system |
| **RedisEconomy** | Economy | Redis-based economy |
| **RoyaleEconomy** | Economy | RoyaleEconomy support |
| **ElementalTokens** | Tokens | Token currency |
| **ElementalGems** | Gems | Gem currency |
| **BeastTokens** | Tokens | Beast tokens system |
| **zMenu Items** | Items | Item-based currency via zMenu |
| **Items** | Items | Native item currency |
| **Levels** | Experience | Player level currency |
| **Experience** | Experience | Player XP currency |

## Features

- **Unified API** - One interface for all currency systems
- **Easy Integration** - Simple deposit, withdraw, and balance methods
- **Multi-Currency** - Support for systems with multiple currency types
- **Item Currencies** - Native support for item-based economies
- **Experience Support** - Use player levels or XP as currency
- **Lightweight** - No runtime dependencies, just include in your plugin

## Quick Start

### 1. Add Dependency

```xml
<dependency>
    <groupId>fr.traqueur.currencies</groupId>
    <artifactId>currenciesapi</artifactId>
    <version>1.0.11</version>
</dependency>
```

### 2. Use the API

```java
import fr.traqueur.currencies.Currencies;

// Deposit money
Currencies.VAULT.deposit(player, new BigDecimal("100"));

// Withdraw money
Currencies.VAULT.withdraw(player, new BigDecimal("50"));

// Check balance
BigDecimal balance = Currencies.VAULT.getBalance(player);
```

## Next Steps

- [Installation Guide](installation) - Detailed setup instructions
- [Usage Guide](usage) - How to use the API
- [Currencies Reference](currencies) - All supported currencies
