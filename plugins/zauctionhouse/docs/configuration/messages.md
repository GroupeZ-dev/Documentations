---
sidebar_position: 2
title: Messages
description: Customize all messages in zAuctionHouse
---

# Messages Configuration

All messages displayed by zAuctionHouse can be customized in the `messages.yml` file.

## Message Format

Messages support:
- **MiniMessage format** (Paper servers) - `<green>`, `<bold>`, `<gradient:green:blue>`
- **Legacy color codes** - `&a`, `&l`, `&6`
- **PlaceholderAPI** - `%player_name%`, `%zauctionhouse_*%`

## Message Structure

```yaml
messages:
  prefix: "<gray>[<gold>AuctionHouse</gold>]</gray> "

  # Command messages
  commands:
    sell:
      success: "<green>You listed <item> for <price>!"
      no-item: "<red>You must hold an item to sell!"
      blacklisted: "<red>This item cannot be sold!"
      limit-reached: "<red>You have reached your listing limit (<limit>)!"
      price-too-low: "<red>Minimum price is <min>!"
      price-too-high: "<red>Maximum price is <max>!"

    buy:
      success: "<green>You purchased <item> for <price>!"
      not-enough-money: "<red>You need <price> to purchase this item!"
      own-item: "<red>You cannot buy your own item!"
      item-sold: "<red>This item has already been sold!"

    remove:
      success: "<green>You removed <item> from the auction house."
      not-owner: "<red>You do not own this item!"
```

## Available Variables

Variables are automatically replaced in messages:

### Item Variables
| Variable | Description |
|----------|-------------|
| `<item>` | Item name |
| `<amount>` | Item amount |
| `<price>` | Item price (formatted) |
| `<seller>` | Seller name |
| `<buyer>` | Buyer name |
| `<economy>` | Economy name |
| `<category>` | Category name |

### Player Variables
| Variable | Description |
|----------|-------------|
| `<player>` | Player name |
| `<limit>` | Player's listing limit |
| `<current>` | Current number of listings |
| `<remaining>` | Remaining listing slots |

### Price Variables
| Variable | Description |
|----------|-------------|
| `<min>` | Minimum price |
| `<max>` | Maximum price |
| `<tax>` | Tax amount |
| `<final>` | Final price after tax |

### Time Variables
| Variable | Description |
|----------|-------------|
| `<time>` | Time remaining |
| `<expire>` | Expiration time |
| `<duration>` | Duration |

## Complete Messages Example

```yaml
messages:
  # Global prefix for all messages
  prefix: "<gray>[<gold>AH</gold>]</gray> "

  # General messages
  general:
    no-permission: "<red>You don't have permission to do this!"
    player-only: "<red>This command can only be used by players!"
    reload: "<green>Configuration reloaded successfully!"
    invalid-number: "<red>Please enter a valid number!"
    cooldown: "<red>Please wait <time> before doing this again!"
    banned-world: "<red>You cannot use the auction house in this world!"

  # Sell messages
  sell:
    success: "<green>You listed <white><item></white> for <gold><price></gold>!"
    holding-air: "<red>You must hold an item to sell!"
    blacklisted: "<red>This item is blacklisted and cannot be sold!"
    not-whitelisted: "<red>This item is not allowed in the auction house!"
    limit-reached: "<red>You have reached your listing limit! (<current>/<limit>)"
    price-too-low: "<red>Minimum price for this item is <gold><min></gold>!"
    price-too-high: "<red>Maximum price for this item is <gold><max></gold>!"
    no-economy-permission: "<red>You don't have permission to use the <economy> economy!"
    creative-item: "<red>You cannot sell items obtained in creative mode!"

  # Purchase messages
  purchase:
    success: "<green>You purchased <white><item></white> for <gold><price></gold>!"
    not-enough-money: "<red>You need <gold><price></gold> to purchase this item!"
    own-item: "<red>You cannot purchase your own item!"
    already-sold: "<red>This item has already been sold!"
    inventory-full: "<red>Your inventory is full! The item has been saved for later."
    seller-notification: "<green><buyer> purchased your <white><item></white> for <gold><price></gold>!"

  # Remove messages
  remove:
    success: "<green>You removed <white><item></white> from the auction house."
    not-owner: "<red>This item does not belong to you!"
    expired-claimed: "<green>You claimed your expired item: <white><item></white>!"
    purchased-claimed: "<green>You claimed: <white><item></white>!"

  # Expire messages
  expire:
    notification: "<yellow>Your item <white><item></white> has expired!"
    warning: "<yellow>Your item <white><item></white> will expire in <time>!"

  # Admin messages
  admin:
    clear-all: "<green>Cleared all <amount> items from the auction house."
    clear-player: "<green>Cleared <amount> items from <player>."
    expire-player: "<green>Expired <amount> items from <player>."

  # Help messages
  help:
    header: "<gold>===== Auction House Help ====="
    commands:
      - "<yellow>/ah</yellow> - Open the auction house"
      - "<yellow>/ah sell <price></yellow> - Sell the item in your hand"
      - "<yellow>/ah selling</yellow> - View your listed items"
      - "<yellow>/ah expired</yellow> - View your expired items"
      - "<yellow>/ah purchased</yellow> - View purchased items to claim"
    footer: "<gold>=============================="

  # Time format
  time:
    seconds: "<seconds>s"
    minutes: "<minutes>m <seconds>s"
    hours: "<hours>h <minutes>m"
    days: "<days>d <hours>h"
```

## MiniMessage Examples

Using MiniMessage formatting (Paper only):

```yaml
messages:
  # Gradient text
  sell:
    success: "<gradient:green:yellow>Successfully listed your item!</gradient>"

  # Hover text
  help:
    sell: "<hover:show_text:'<gray>Click to sell an item'><yellow>/ah sell</yellow></hover>"

  # Click actions
  expired:
    notification: "<click:run_command:'/ah expired'><yellow>Click to view expired items!</yellow></click>"

  # Combined formatting
  purchase:
    seller-notification: |
      <gradient:gold:yellow><bold>ITEM SOLD!</bold></gradient>
      <gray>Buyer:</gray> <white><buyer></white>
      <gray>Item:</gray> <white><item></white>
      <gray>Price:</gray> <gold><price></gold>
```

## Per-Economy Messages

Configure messages per economy type:

```yaml
messages:
  economies:
    vault:
      format: "<gold>$<amount></gold>"
      not-enough: "<red>You need <gold>$<price></gold>!"

    playerpoints:
      format: "<aqua><amount> Points</aqua>"
      not-enough: "<red>You need <aqua><price> Points</aqua>!"

    experience:
      format: "<green><amount> XP</green>"
      not-enough: "<red>You need <green><price> XP</green>!"
```

## Disabling Messages

To disable a message, set it to empty:

```yaml
messages:
  sell:
    success: "" # No message sent on successful sale
```

## Reloading Messages

After editing `messages.yml`, reload with:

```
/ah admin reload
```
