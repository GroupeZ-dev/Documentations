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

| Plugin | Type |
|--------|------|
| [Vault](https://www.spigotmc.org/resources/34315/) | `VAULT` |
| [PlayerPoints](https://www.spigotmc.org/resources/80745/) | `PLAYERPOINTS` |
| [BeastTokens](https://www.spigotmc.org/resources/13409/) | `BEASTTOKENS` |
| [ElementalTokens](https://builtbybit.com/resources/16707/) | `ELEMENTALTOKENS` |
| [ElementalGems](https://builtbybit.com/resources/14920/) | `ELEMENTALGEMS` |
| [CoinsEngine](https://www.spigotmc.org/resources/84121/) | `COINSENGINE` |
| [VotingPlugin](https://www.spigotmc.org/resources/15358/) | `VOTINGPLUGIN` |
| [RedisEconomy](https://www.spigotmc.org/resources/105965/) | `REDISECONOMY` |
| [RoyaleEconomy](https://polymart.org/product/113/royaleeconomy-1-8-1-21) | `ROYALEECONOMY` |
| [EcoBits](https://www.spigotmc.org/resources/109967/) | `ECOBITS` |
| [zEssentials](https://www.spigotmc.org/resources/118014/) | `ZESSENTIALS` |
| [zMenu](https://www.spigotmc.org/resources/110402/) | `ZMENUITEMS` |
| Item (Vanilla) | `ITEM` |
| Level (Vanilla) | `LEVEL` |
| Experience (Vanilla) | `EXPERIENCE` |

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

  - type: PLAYER_POINTS
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
