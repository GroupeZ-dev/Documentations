---
sidebar_position: 3
title: Economies
description: Configure economy systems in zAuctionHouse
---

# Economies Configuration

zAuctionHouse supports multiple economy systems. Configure them in the `economies/` folder.

## Vault Economy

The most common economy integration. Create `economies/vault.yml`:

```yaml
# Enable this economy
enabled: true

# Display name for this economy
name: "Money"

# Icon for inventory display
icon:
  material: GOLD_INGOT
  name: "&6Money"

# Price restrictions
price:
  # Minimum price for any item
  min: 1
  # Maximum price for any item (0 for no limit)
  max: 1000000000

# Require permission to use this economy
permission: ""  # Leave empty for everyone

# Tax configuration
tax:
  # Enable tax on sales
  enabled: true
  # Tax percentage (10 = 10%)
  percentage: 10
  # Who pays the tax: SELLER or BUYER
  payer: SELLER

# Auto-claim settings
auto-claim:
  # Automatically give money to seller on purchase
  enabled: true
  # If false, seller must claim from purchased items
```

## PlayerPoints Economy

For servers using PlayerPoints. Create `economies/playerpoints.yml`:

```yaml
enabled: true
name: "Points"

icon:
  material: EMERALD
  name: "&aPoints"

price:
  min: 1
  max: 10000000

tax:
  enabled: false

auto-claim:
  enabled: true
```

## Experience Economy

Use player experience as currency. Create `economies/experience.yml`:

```yaml
enabled: true
name: "Experience"

icon:
  material: EXPERIENCE_BOTTLE
  name: "&aExperience"

price:
  min: 10
  max: 100000

tax:
  enabled: false

auto-claim:
  enabled: true
```

## Levels Economy

Use player levels as currency. Create `economies/levels.yml`:

```yaml
enabled: true
name: "Levels"

icon:
  material: ENCHANTED_BOOK
  name: "&bLevels"

price:
  min: 1
  max: 1000

tax:
  enabled: false

auto-claim:
  enabled: true
```

## Item-Based Economy

Use a specific item as currency. Create `economies/diamonds.yml`:

```yaml
enabled: true
name: "Diamonds"

# Define the currency item
currency-item:
  material: DIAMOND
  # Optional: require specific name
  name: ""
  # Optional: require specific lore
  lore: []
  # Optional: require custom model data
  model-data: 0

icon:
  material: DIAMOND
  name: "&bDiamonds"

price:
  min: 1
  max: 10000

tax:
  enabled: false

auto-claim:
  enabled: true
```

## Price Reduction

Configure automatic price reduction over time:

```yaml
price-reduction:
  # Enable price reduction
  enabled: true

  # Reduction schedule
  schedule:
    # After 1 day, reduce by 5%
    - after: 1d
      reduction: 5
    # After 3 days, reduce by 10%
    - after: 3d
      reduction: 10
    # After 7 days, reduce by 20%
    - after: 7d
      reduction: 20

  # Minimum price (percentage of original)
  minimum-percentage: 50
```

With these settings:
- Day 1-2: 100% of original price
- Day 2-3: 95% of original price
- Day 3-7: 90% of original price
- Day 7+: 80% of original price (minimum 50%)

## Tax Configuration Details

```yaml
tax:
  enabled: true

  # Base tax percentage
  percentage: 10

  # Who pays: SELLER or BUYER
  payer: SELLER

  # Permission to bypass tax
  bypass-permission: "zauctionhouse.bypass.tax"

  # Different tax rates based on permission
  rates:
    - permission: zauctionhouse.tax.vip
      percentage: 5
    - permission: zauctionhouse.tax.mvp
      percentage: 2
    - permission: zauctionhouse.tax.exempt
      percentage: 0
```

## Multiple Economies Example

You can have multiple economies active simultaneously. Players choose which to use when listing items.

Directory structure:
```
economies/
├── vault.yml        # Standard money
├── points.yml       # PlayerPoints
├── diamonds.yml     # Diamond currency
└── tokens.yml       # Custom token item
```

In inventories, display economy selector:

```yaml
# In sell.yml
items:
  economy-selector:
    slot: 4
    item:
      material: GOLD_INGOT
      name: "&6Select Currency"
      lore:
        - "&7Click to change currency"
        - ""
        - "&7Current: &f%economy%"
```

## Full Vault Economy Example

Complete `economies/vault.yml`:

```yaml
enabled: true
name: "Money"

icon:
  material: GOLD_INGOT
  name: "&6Money"
  lore:
    - "&7Standard server currency"
    - "&7Powered by Vault"

price:
  min: 1
  max: 1000000000

  # Price limits per category
  category-limits:
    weapons:
      min: 100
      max: 100000
    armor:
      min: 100
      max: 100000
    blocks:
      min: 1
      max: 10000
    misc:
      min: 1
      max: 50000

permission: ""

tax:
  enabled: true
  percentage: 10
  payer: SELLER
  bypass-permission: "zauctionhouse.bypass.tax"
  rates:
    - permission: zauctionhouse.tax.vip
      percentage: 5

price-reduction:
  enabled: true
  schedule:
    - after: 3d
      reduction: 10
    - after: 7d
      reduction: 20
  minimum-percentage: 50

auto-claim:
  enabled: true

# Format for displaying prices
format: "$%amount%"
```
