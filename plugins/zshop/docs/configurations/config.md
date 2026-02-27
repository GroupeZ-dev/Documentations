---
sidebar_position: 1
title: Main Configuration
description: Configure zShop settings in config.yml
---

# Main Configuration

The `config.yml` file contains the main settings for zShop.

## Default Economy

Set the default economy used for all shop items:

```yaml
# Default Economy that will be used for all ZSHOP_ITEMS if Economy is not specified
defaultEconomy: "VAULT"
```

**Available economies:**
- `VAULT` - Vault economy
- `PLAYERPOINTS` - PlayerPoints plugin
- `VOTINGPLUGIN` - VotingPlugin
- `TOKENMANAGER` - TokenManager
- `COINSENGINE` - CoinsEngine
- `BEASTTOKEN` - BeastToken
- `ITEM` - Item-based economy
- `LEVEL` - Minecraft player level
- `EXPERIENCE` - Minecraft XP points

## Default Lore

The default lore displayed on all `ZSHOP_ITEM` buttons:

```yaml
defaultLore:
  - "&f» &7Buying price&8: &e%buyPrice%"
  - "&f» &7Selling price&8: &e%sellPrice%"
  - ""
  - "&f➥ &r&7Left click to &f&nʙᴜʏ"
  - "&f➥ &r&7Click wheel (or drop key) to &f&nsᴇʟʟ ᴇᴠᴇʀʏᴛʜɪɴɢ"
  - "&f➥ &r&7Right click to &f&nsᴇʟʟ"
```

**Available placeholders:**
- `%buyPrice%` - Formatted buy price
- `%sellPrice%` - Formatted sell price
- `%maxStack%` - Maximum stack size
- All PlaceholderAPI placeholders

## Inventory Names

Configure which inventories are used for different actions:

```yaml
# Name of the inventory for the sale of items
sellInventoryName: "shop_sell"

# Name of the inventory for the bought of items
buyInventoryName: "shop_buy"

# Name of the inventory for confirm of bought
confirmInventoryName: "confirm"

# Title of the inventory for /sellinventory
sellInventoryTitle: "&8Sell Inventory"
```

## Item Flags

Automatically hide item flags on shop items:

```yaml
# Disable all Flags of items for item display
disableItemFlag: true
```

This hides enchantments, attributes, and other item information automatically.

## Inventory Full Handling

Control behavior when player's inventory is full during purchase:

```yaml
# Check if the inventory is full during the purchase
# If disabled, items will drop on the ground
enableInventoryFullBuy: true
```

## Purchase/Sell Actions

Actions performed after a purchase or sale:

```yaml
# NONE - Nothing happens
# CLOSE - Closes inventory after purchase
# OPEN_BACK - Returns to previous inventory
# RESET_AMOUNT - Set the number of items to one

# Action performed when a player purchases an item
purchaseAction: NONE

# Action performed when a player sells an item
sellAction: NONE
```

## Sell Commands

Enable/disable sell commands:

```yaml
# Enable /sell-all, /sell-hand, /sell-handall
enableSellCommand: false

# Enable /sellinventory command
enableSellInventoryCommand: false
```

## Transaction Reasons

Messages sent to economy plugins for transaction history:

```yaml
withdraw-reason: "Sale of x%amount% %item%"
deposit-reason: "Purchase of x%amount% %item%"
deposit-all-reason: "Sale of %items%"
deposit-all-line: "x%amount% %item% for %price%"
```

## Date Format

Format for displaying dates in limits and logs:

```yaml
# Date format for limit placeholders
dateFormat: "EEEE, d MMM yyyy HH:mm:ss"
```

See [Java SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html) for format patterns.

## Price Modifiers

Permission-based price modifications. See [Price Modifiers](../price-modifiers) for details.

```yaml
pricesModifier:
  - permission: "zshop.prices.vip"
    type: SELL
    modifier: 1.5  # +50% sell price

  - permission: "zshop.prices.eternal"
    type: SELL
    modifier: 2.0  # +100% sell price

  - permission: "zshop.prices.legend.buy"
    type: BUY
    modifier: 0.9  # -10% buy price
```

## Logging

Configure transaction logging:

```yaml
log:
  # Enable logging
  enableLog: true

  # Save logs to player files
  enableLogInFile: true

  # Display logs in console
  enableLogInConsole: true

  # Date format for logs
  dateFormatLog: "d/M/yyyy HH:mm:ss"

  # Days before logs are deleted
  expireLogDay: 14

  # Log messages
  buyMessage: "%player% has purchased x%amount% %item% for %price%."
  buyConfirmMessage: "%player% has purchased %name% for %price%."
  sellMessage: "%player% has just sold x%amount% %item% for %price%."
  sellAllMessage: "%player% sold all %amount% x %item% for %price% to %shop% shop"
```

## Price Formatting

Configure how prices are displayed:

```yaml
priceFormat:
  # Decimal format pattern
  format: "#.##"

  # Character for decimals
  decimalSeparator: ","

  # Character for thousands separator
  groupingSeparator: "."

  # Digit settings
  minimumIntegerDigits: 1
  maximumIntegerDigits: 16
  minimumFractionDigits: 0
  maximumFractionDigits: 2

  # Abbreviated numbers (1000 = 1k)
  abbreviatedNumber:
    enable: false
    thousand: "k"
    millions: "m"
    billion: "b"
    trillion: "t"
    quadrillion: "q"
    quintillion: "Q"
```

## Debug Mode

Enable debug output for troubleshooting:

```yaml
# Displays more information in the console
enableDebug: true
enableDebugTime: false
```

## Language

Set the plugin language:

```yaml
# Language for the plugin (see 'lang' folder)
language: en-us
```

## Complete Example

```yaml
configVersion: 1

# Debug settings
enableDebug: false
enableDebugTime: false

# Economy
defaultEconomy: "VAULT"

# Default lore for shop items
defaultLore:
  - "&f» &7Buying price&8: &e%buyPrice%"
  - "&f» &7Selling price&8: &e%sellPrice%"
  - ""
  - "&f➥ &7Left click to &aʙᴜʏ"
  - "&f➥ &7Right click to &csᴇʟʟ"

# Inventory settings
sellInventoryName: "shop_sell"
buyInventoryName: "shop_buy"
confirmInventoryName: "confirm"
sellInventoryTitle: "&8Sell Items"

# Item display
disableItemFlag: true
enableInventoryFullBuy: true

# Actions
purchaseAction: NONE
sellAction: NONE

# Commands
enableSellCommand: true
enableSellInventoryCommand: true

# Price modifiers
pricesModifier:
  - permission: "zshop.vip"
    type: SELL
    modifier: 1.25
  - permission: "zshop.mvp"
    type: SELL
    modifier: 1.5
  - permission: "zshop.mvp"
    type: BUY
    modifier: 0.9

# Logging
log:
  enableLog: true
  enableLogInFile: true
  enableLogInConsole: false
  dateFormatLog: "d/M/yyyy HH:mm:ss"
  expireLogDay: 30
  buyMessage: "%player% bought x%amount% %item% for %price%"
  sellMessage: "%player% sold x%amount% %item% for %price%"

# Price format
priceFormat:
  format: "#,##0.00"
  decimalSeparator: "."
  groupingSeparator: ","
  abbreviatedNumber:
    enable: true
    thousand: "K"
    millions: "M"
    billion: "B"

# Language
language: en-us
```
