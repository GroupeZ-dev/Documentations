---
sidebar_position: 5
title: Price Modifiers
description: Configure permission-based price modifications
---

# Price Modifiers

Price modifiers allow you to give players bonuses or discounts based on their permissions. This is perfect for VIP perks, donor ranks, or special promotions.

## Configuration

Price modifiers are configured in `config.yml`:

```yaml
pricesModifier:
  - permission: "zshop.prices.vip"
    type: SELL
    modifier: 1.5

  - permission: "zshop.prices.mvp"
    type: SELL
    modifier: 2.0

  - permission: "zshop.prices.vip.buy"
    type: BUY
    modifier: 0.9
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permission` | String | Permission node required |
| `type` | Enum | `BUY` or `SELL` |
| `modifier` | Double | Multiplier applied to price |

## Modifier Types

### SELL Modifier

Multiplies the sell price for players with the permission:

```yaml
- permission: "zshop.prices.vip"
  type: SELL
  modifier: 1.5  # Sell for 50% more
```

**Example:**
- Base sell price: $100
- With 1.5x modifier: $150

### BUY Modifier

Multiplies the buy price for players with the permission:

```yaml
- permission: "zshop.prices.vip.buy"
  type: BUY
  modifier: 0.9  # Buy for 10% less
```

**Example:**
- Base buy price: $100
- With 0.9x modifier: $90

## Common Configurations

### Tiered Sell Bonuses

```yaml
pricesModifier:
  # Basic VIP: +25% sell price
  - permission: "zshop.rank.vip"
    type: SELL
    modifier: 1.25

  # VIP+: +50% sell price
  - permission: "zshop.rank.vip_plus"
    type: SELL
    modifier: 1.5

  # MVP: +75% sell price
  - permission: "zshop.rank.mvp"
    type: SELL
    modifier: 1.75

  # MVP+: +100% sell price (double)
  - permission: "zshop.rank.mvp_plus"
    type: SELL
    modifier: 2.0
```

### Buy Discounts

```yaml
pricesModifier:
  # VIP: 5% discount
  - permission: "zshop.discount.vip"
    type: BUY
    modifier: 0.95

  # VIP+: 10% discount
  - permission: "zshop.discount.vip_plus"
    type: BUY
    modifier: 0.90

  # MVP: 15% discount
  - permission: "zshop.discount.mvp"
    type: BUY
    modifier: 0.85

  # MVP+: 20% discount
  - permission: "zshop.discount.mvp_plus"
    type: BUY
    modifier: 0.80
```

### Combined Buy and Sell

```yaml
pricesModifier:
  # VIP gets both bonuses
  - permission: "zshop.vip.sell"
    type: SELL
    modifier: 1.25
  - permission: "zshop.vip.buy"
    type: BUY
    modifier: 0.95

  # MVP gets better bonuses
  - permission: "zshop.mvp.sell"
    type: SELL
    modifier: 1.5
  - permission: "zshop.mvp.buy"
    type: BUY
    modifier: 0.90
```

## Setting Up Permissions

### LuckPerms

```bash
# Create VIP group with sell bonus
lp creategroup vip
lp group vip permission set zshop.rank.vip true

# Give to a player
lp user <player> parent add vip
```

### PermissionsEx

```bash
# Give permission to group
pex group vip add zshop.rank.vip

# Give to a player
pex user <player> group add vip
```

## Modifier Priority

When a player has multiple modifiers:
- **Only the highest applicable modifier is used** (they don't stack)
- Order in config determines priority if values are equal

**Example:**
```yaml
pricesModifier:
  - permission: "zshop.rank.vip"
    type: SELL
    modifier: 1.25
  - permission: "zshop.rank.mvp"
    type: SELL
    modifier: 1.5
```

If a player has both permissions, they get the **1.5x** modifier (highest).

## Excluding Items from Modifiers

Some items can be excluded from price modifiers:

```yaml
items:
  fixed_price_item:
    type: ZSHOP_ITEM
    item:
      material: BEDROCK
    buyPrice: 1000000.0
    sellPrice: 500000.0
    affectByPriceModifier: false  # No bonuses apply
    slot: 10
```

## Displaying Modifier Status

Use placeholders to show players their active modifier:

```yaml
# In item lore
lore:
  - ""
  - "&7Your sell bonus: &a%zshop_modifier_sell%x"
  - "&7Your buy discount: &a%zshop_modifier_buy%x"
```

## Event Modifiers

Create temporary event modifiers with permission plugins:

### Double Sell Weekend (LuckPerms)

```bash
# Create temporary permission
lp group default permission settemp zshop.event.double_sell true 2d

# Add the modifier in config.yml
pricesModifier:
  - permission: "zshop.event.double_sell"
    type: SELL
    modifier: 2.0
```

### Holiday Sale

```bash
# 25% discount for all players during holiday
lp group default permission settemp zshop.event.holiday_sale true 7d
```

```yaml
pricesModifier:
  - permission: "zshop.event.holiday_sale"
    type: BUY
    modifier: 0.75
```

## Complete Example

```yaml
pricesModifier:
  # ===== Rank-based Sell Bonuses =====
  # VIP: +25%
  - permission: "zshop.sell.vip"
    type: SELL
    modifier: 1.25

  # VIP+: +50%
  - permission: "zshop.sell.vipplus"
    type: SELL
    modifier: 1.50

  # MVP: +75%
  - permission: "zshop.sell.mvp"
    type: SELL
    modifier: 1.75

  # MVP+: +100%
  - permission: "zshop.sell.mvpplus"
    type: SELL
    modifier: 2.00

  # Legend: +150%
  - permission: "zshop.sell.legend"
    type: SELL
    modifier: 2.50

  # ===== Rank-based Buy Discounts =====
  # VIP: 5% off
  - permission: "zshop.buy.vip"
    type: BUY
    modifier: 0.95

  # VIP+: 10% off
  - permission: "zshop.buy.vipplus"
    type: BUY
    modifier: 0.90

  # MVP: 15% off
  - permission: "zshop.buy.mvp"
    type: BUY
    modifier: 0.85

  # MVP+: 20% off
  - permission: "zshop.buy.mvpplus"
    type: BUY
    modifier: 0.80

  # Legend: 25% off
  - permission: "zshop.buy.legend"
    type: BUY
    modifier: 0.75

  # ===== Event Modifiers =====
  # Double sell event
  - permission: "zshop.event.doublesell"
    type: SELL
    modifier: 2.00

  # Half price event
  - permission: "zshop.event.halfprice"
    type: BUY
    modifier: 0.50
```
