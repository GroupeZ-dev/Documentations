---
sidebar_position: 3
title: Economies
description: Configure economy systems in zAuctionHouse V4
---

# Economies Configuration

zAuctionHouse V4 supports multiple economy systems configured in `economies.yml`.

## CurrenciesAPI

zAuctionHouse uses [CurrenciesAPI](https://github.com/GroupeZ-dev/CurrenciesAPI) to handle all economy integrations. This library provides a unified interface for interacting with various economy plugins.

## Supported Economy Types

| Plugin | Type | Supports `currency-name` |
|--------|------|:------------------------:|
| [Vault](https://www.spigotmc.org/resources/34315/) | `VAULT` | No |
| [PlayerPoints](https://www.spigotmc.org/resources/80745/) | `PLAYERPOINTS` | No |
| [BeastTokens](https://www.spigotmc.org/resources/13409/) | `BEASTTOKENS` | No |
| [ElementalTokens](https://builtbybit.com/resources/16707/) | `ELEMENTALTOKENS` | No |
| [ElementalGems](https://builtbybit.com/resources/14920/) | `ELEMENTALGEMS` | No |
| [CoinsEngine](https://www.spigotmc.org/resources/84121/) | `COINSENGINE` | **Yes** |
| [VotingPlugin](https://www.spigotmc.org/resources/15358/) | `VOTINGPLUGIN` | No |
| [RedisEconomy](https://www.spigotmc.org/resources/105965/) | `REDISECONOMY` | **Yes** |
| [RoyaleEconomy](https://polymart.org/product/113/royaleeconomy-1-8-1-21) | `ROYALEECONOMY` | No |
| [EcoBits](https://www.spigotmc.org/resources/109967/) | `ECOBITS` | **Yes** |
| [zEssentials](https://www.spigotmc.org/resources/118014/) | `ZESSENTIALS` | **Yes** |
| [zMenu](https://www.spigotmc.org/resources/110402/) | `ZMENUITEMS` | No |
| Item (Vanilla) | `ITEM` | No (uses `item` config) |
| Level (Vanilla) | `LEVEL` | No |
| Experience (Vanilla) | `EXPERIENCE` | No |

You can also use `REDIRECT` to alias one economy to another.

## Vault Economy

The most common economy integration:

```yaml
economies:
  - type: VAULT
    is-enable: true
    name: vault
    display-name: "Vault"
    format: "%price%$"
    symbol: "v"

    # Auto-deposit money to seller immediately
    auto-claim: true

    # Only deposit when seller is online
    must-be-online: false

    # Optional permission to use this economy
    # permission: "zauctionhouse.economy.vault"

    # Economy transaction reasons
    withdraw-reason: "Purchase of %items% (zAuctionHouse)"
    deposit-reason: "Sale of %items% (zAuctionHouse)"

    # Price formatting mode
    # PRICE_WITH_DECIMAL_FORMAT, PRICE_WITHOUT_DECIMAL, PRICE_WITH_REDUCTION
    price-format: PRICE_WITH_DECIMAL_FORMAT

    # Price limits
    min-prices:
      auction: 10
      rent: 500
      bid: 500
    max-prices: 10000000000  # 10 billion

    # Tax configuration
    tax:
      enabled: false
      type: SELL
      amount-type: PERCENTAGE
      amount: 5
      bypass-permission: "zauctionhouse.tax.bypass"
      reductions:
        - permission: "zauctionhouse.tax.vip"
          percentage: 50
        - permission: "zauctionhouse.tax.premium"
          percentage: 25
        - permission: "zauctionhouse.tax.member"
          percentage: 10
```

## Tax Types

| Type | Description |
|------|-------------|
| `SELL` | Tax paid by seller when listing |
| `PURCHASE` | Tax deducted from seller's earnings on sale |
| `BOTH` | Tax at both listing AND sale |
| `CAPITALISM` | VAT-style, buyer pays extra |

### Tax Examples

**SELL Tax:**
- List 1000$ item with 5% tax
- Seller pays 50$ listing fee upfront
- Buyer pays 1000$, Seller receives 1000$

**PURCHASE Tax:**
- Item sells for 1000$ with 5% tax
- Buyer pays 1000$, Seller receives 950$

**CAPITALISM Tax (VAT):**
- Item listed for 1000$ with 5% VAT
- Buyer pays 1050$, Seller receives 1000$

## Item-Specific Tax Rules

Apply different tax rates for specific items:

```yaml
tax:
  item-rules:
    enabled: true
    rules:
      - name: "diamond_tax"
        priority: 100
        type: PURCHASE
        amount-type: PERCENTAGE
        amount: 10
        rule:
          type: material
          materials:
            - DIAMOND
            - DIAMOND_BLOCK

      - name: "rare_items"
        priority: 90
        type: CAPITALISM
        amount-type: PERCENTAGE
        amount: 15
        rule:
          type: and
          rules:
            - type: lore
              mode: CONTAINS
              values:
                - "Rare"
```

## Default Economy

Set which economy is used by default:

```yaml
default-economy:
  auction: vault
  rent: vault
  bid: vault
```

## Price Formatting

### Decimal Format

```yaml
# Java DecimalFormat pattern
price-decimal-format: '#,###.#'
```

Examples:
- `#,###.#` -> "1,234.5"
- `#,###.##` -> "1,234.56"
- `#,###` -> "1,234"

### Price Reductions (Compact Display)

When using `PRICE_WITH_REDUCTION`:

```yaml
price-reductions:
  # 0 - 999: Show as-is
  - format: "#.#"
    max-amount: 1000

  # 1K - 999K
  - format: "%.1fK"
    max-amount: 1000000

  # 1M - 999M
  - format: "%.1fM"
    max-amount: 1000000000

  # 1B - 999B
  - format: "%.1fB"
    max-amount: 1000000000000

  # 1T+ with custom color
  - format: "%.2fT"
    max-amount: 1000000000000000
    display: "<green>%amount%"

  # Quadrillions with custom color
  - format: "%.2fQ"
    max-amount: 100000000000000000
    display: "<red>%amount%"
```

## Multiple Economies Setup

You can have multiple economies active simultaneously:

```yaml
economies:
  - type: VAULT
    is-enable: true
    name: vault
    # ...

  - type: PLAYERPOINTS
    is-enable: true
    name: points
    # ...

  - type: ITEM
    is-enable: true
    name: diamonds
    # ...
```

Players choose which economy to use when listing:
```bash
/ah sell 1000 64 vault
/ah sell 500 32 points
/ah sell 10 16 diamonds
```

## Item Economy

Use a specific item as currency. Players pay with items from their inventory:

```yaml
economies:
  - type: ITEM
    is-enable: true
    name: item
    display-name: "Diamonds"
    format: "%price%d"
    symbol: "d"

    # Define the currency item (supports all zMenu item properties)
    item:
      material: DIAMOND
      # Optional: require specific name
      # name: "&bCurrency Diamond"
      # Optional: require specific lore
      # lore:
      #   - "&7Official currency"
      # Optional: require custom model data
      # model-data: 1001

    # Auto-deposit items to seller immediately
    auto-claim: true

    # Transaction reasons
    withdraw-reason: "Purchase of %items% (zAuctionHouse)"
    deposit-reason: "Sale of %items% (zAuctionHouse)"

    # If true, seller must be online to receive items
    # If offline, they must use /ah claim to get their items
    must-be-online: true

    # Price formatting mode
    price-format: PRICE_WITH_REDUCTION

    # Price limits
    min-prices: 1
    max-prices: 64
```

### Item Configuration

The `item` section supports all item properties available in zMenu:

```yaml
item:
  material: DIAMOND
  name: "&b&lPremium Diamond"
  lore:
    - "&7Server currency"
    - "&7Cannot be dropped"
  model-data: 1001
  glow: true
  # ... any other zMenu item properties
```

This allows you to create custom currency items that must match specific criteria.

## Currency Name Economy

For plugins that support multiple currencies (zEssentials, EcoBits, CoinsEngine, RedisEconomy), you can specify which currency to use:

```yaml
economies:
  - type: ZESSENTIALS  # Also works with: ECOBITS, COINSENGINE, REDISECONOMY
    currency-name: "coins"  # The currency name from the plugin
    is-enable: true
    name: coins
    display-name: "Coins"
    format: "%price%c"
    symbol: "c"

    # Auto-deposit to seller immediately
    auto-claim: true

    # Player doesn't need to be online
    must-be-online: false

    # Transaction reasons
    withdraw-reason: "Purchase of %items% (zAuctionHouse)"
    deposit-reason: "Sale of %items% (zAuctionHouse)"

    # Price formatting mode
    price-format: PRICE_WITH_REDUCTION

    # Price limits
    min-prices: 1
    max-prices: 99999
```

### Supported Plugins with Multiple Currencies

| Plugin | Type | Currency Configuration |
|--------|------|------------------------|
| [zEssentials](https://www.spigotmc.org/resources/118014/) | `ZESSENTIALS` | Uses currency name from zEssentials economy module |
| [EcoBits](https://www.spigotmc.org/resources/109967/) | `ECOBITS` | Uses EcoBits currency identifier |
| [CoinsEngine](https://www.spigotmc.org/resources/84121/) | `COINSENGINE` | Uses CoinsEngine currency name |
| [RedisEconomy](https://www.spigotmc.org/resources/105965/) | `REDISECONOMY` | Uses RedisEconomy currency name |

### Example: Multiple Currencies from Same Plugin

```yaml
economies:
  # zEssentials - Main coins
  - type: ZESSENTIALS
    currency-name: "coins"
    is-enable: true
    name: coins
    display-name: "Coins"
    format: "%price% coins"
    symbol: "c"
    auto-claim: true
    must-be-online: false
    price-format: PRICE_WITH_REDUCTION
    min-prices: 1
    max-prices: 999999

  # zEssentials - Premium gems
  - type: ZESSENTIALS
    currency-name: "gems"
    is-enable: true
    name: gems
    display-name: "Gems"
    format: "%price% gems"
    symbol: "g"
    auto-claim: true
    must-be-online: false
    price-format: PRICE_WITH_REDUCTION
    min-prices: 1
    max-prices: 10000
```

## Permission-Based Access

Restrict economy access by permission:

```yaml
  - type: VAULT
    is-enable: true
    name: premium_economy
    permission: "zauctionhouse.economy.premium"
    # ...
```

Only players with `zauctionhouse.economy.premium` can use this economy.

## Full Example

Complete `economies.yml`:

```yaml
economies:
  # Main Vault economy
  - type: VAULT
    is-enable: true
    name: vault
    display-name: "Money"
    format: "%price%$"
    symbol: "v"
    auto-claim: true
    must-be-online: false
    withdraw-reason: "Purchase of %items% (zAuctionHouse)"
    deposit-reason: "Sale of %items% (zAuctionHouse)"
    price-format: PRICE_WITH_DECIMAL_FORMAT
    min-prices:
      auction: 10
      rent: 500
      bid: 500
    max-prices: 10000000000
    tax:
      enabled: true
      type: SELL
      amount-type: PERCENTAGE
      amount: 5
      bypass-permission: "zauctionhouse.tax.bypass"
      reductions:
        - permission: "zauctionhouse.tax.vip"
          percentage: 50

  # Secondary points economy
  - type: PLAYERPOINTS
    is-enable: true
    name: points
    display-name: "Points"
    format: "%price% pts"
    symbol: "p"
    auto-claim: true
    min-prices:
      auction: 1
    max-prices: 1000000
    tax:
      enabled: false

default-economy:
  auction: vault
  rent: vault
  bid: vault

price-decimal-format: '#,###.#'

price-reductions:
  - format: "#.#"
    max-amount: 1000
  - format: "%.1fK"
    max-amount: 1000000
  - format: "%.1fM"
    max-amount: 1000000000
  - format: "%.1fB"
    max-amount: 1000000000000
```
