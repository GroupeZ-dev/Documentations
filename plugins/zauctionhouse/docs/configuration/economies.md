---
sidebar_position: 2
title: Economies
description: Configure multiple economies for zAuctionHouse
---

# Economies

zAuctionHouse supports multiple economy systems, allowing players to buy and sell with different currencies.

## Supported Economy Types

| Type | Plugin Required | Description |
|------|-----------------|-------------|
| `VAULT` | Vault + Economy plugin | Standard server economy |
| `PLAYERPOINTS` | PlayerPoints | Points-based currency |
| `EXPERIENCE` | - | Minecraft XP points |
| `LEVEL` | - | Minecraft levels |
| `ITEM` | - | Physical item currency |
| `BEASTTOKEN` | BeastTokens | Token currency |
| `COINSENGINE` | CoinsEngine | Multi-currency support |
| `ECOBITS` | EcoBits | Eco currency |
| `ELEMENTALGEMS` | ElementalGems | Gems currency |
| `ELEMENTALTOKENS` | ElementalTokens | Token currency |
| `REDISECONOMY` | RedisEconomy | Redis-based economy |
| `VOTINGPLUGIN` | VotingPlugin | Vote points |
| `ZESSENTIALS` | zEssentials | zEssentials economy |
| `ZMENUITEMS` | zMenu | zMenu item economy |

## Configuration Structure

Each economy in `economies.yml`:

```yaml
economies:
  vault:
    name: "Money"                    # Display name
    type: VAULT                      # Economy type
    currency: "%price%$"             # Price format display
    format: "v"                      # Shorthand format
    isEnable: true                   # Enable/disable
    denyMessage: "&cYou don't have enough money!"
```

## Economy Options

| Option | Type | Description |
|--------|------|-------------|
| `name` | String | Display name in menus |
| `type` | String | Economy type (see table above) |
| `currency` | String | Format string with `%price%` placeholder |
| `format` | String | Short code for sell commands |
| `isEnable` | Boolean | Enable or disable this economy |
| `denyMessage` | String | Message when player lacks funds |
| `permission` | String | Optional permission to use this economy |

## Examples

### Vault (Standard Money)

```yaml
vault:
  name: "Money"
  type: VAULT
  currency: "%price%$"
  format: "v"
  isEnable: true
  denyMessage: "&cYou don't have enough money!"
```

### Item Economy (Diamonds)

```yaml
diamond:
  name: "Diamonds"
  type: ITEM
  currency: "%price% Diamonds"
  format: "d"
  isEnable: true
  denyMessage: "&cYou don't have enough diamonds!"
  material: DIAMOND
  permission: "zauctionhouse.economy.diamond"
```

### Item Economy (Emeralds)

```yaml
emerald:
  name: "Emeralds"
  type: ITEM
  currency: "%price% Emeralds"
  format: "e"
  isEnable: true
  denyMessage: "&cYou don't have enough emeralds!"
  material: EMERALD
```

### Experience Points

```yaml
experience:
  name: "Experience"
  type: EXPERIENCE
  currency: "%price% XP"
  format: "xp"
  isEnable: true
  denyMessage: "&cYou don't have enough experience!"
```

### Player Levels

```yaml
level:
  name: "Levels"
  type: LEVEL
  currency: "%price% Levels"
  format: "l"
  isEnable: true
  denyMessage: "&cYou don't have enough levels!"
```

### PlayerPoints

```yaml
points:
  name: "Points"
  type: PLAYERPOINTS
  currency: "%price% Points"
  format: "pp"
  isEnable: true
  denyMessage: "&cYou don't have enough points!"
```

### CoinsEngine

```yaml
coins:
  name: "Coins"
  type: COINSENGINE
  currency: "%price% Coins"
  format: "c"
  isEnable: true
  currencyName: "coins"    # CoinsEngine currency ID
  denyMessage: "&cYou don't have enough coins!"
```

## Using Economies

### Selling with Specific Economy

Players can specify the economy when selling:

```
/ah sell <price><format>
```

Examples:
- `/ah sell 100v` - Sell for 100 using Vault
- `/ah sell 50d` - Sell for 50 diamonds
- `/ah sell 10l` - Sell for 10 levels

### Economy Selection Menu

When `enableSellEconomyInventory: true` in config.yml, players see a menu to choose the economy before selling.

## Default Configuration

```yaml
economies:
  vault:
    name: "Money"
    type: VAULT
    currency: "%price%$"
    format: "v"
    isEnable: true
    denyMessage: "&cYou don't have enough money!"

  diamond:
    name: "Diamonds"
    type: ITEM
    currency: "%price% Diamonds"
    format: "d"
    isEnable: false
    denyMessage: "&cYou don't have enough diamonds!"
    material: DIAMOND

  emerald:
    name: "Emeralds"
    type: ITEM
    currency: "%price% Emeralds"
    format: "e"
    isEnable: false
    denyMessage: "&cYou don't have enough emeralds!"
    material: EMERALD

  experience:
    name: "Experience"
    type: EXPERIENCE
    currency: "%price% XP"
    format: "xp"
    isEnable: false
    denyMessage: "&cYou don't have enough experience!"

  level:
    name: "Levels"
    type: LEVEL
    currency: "%price% Levels"
    format: "l"
    isEnable: false
    denyMessage: "&cYou don't have enough levels!"

  points:
    name: "Points"
    type: PLAYERPOINTS
    currency: "%price% Points"
    format: "pp"
    isEnable: false
    denyMessage: "&cYou don't have enough points!"
```
