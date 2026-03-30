---
sidebar_position: 2
title: Messages
description: Customize all messages in zAuctionHouse V4
---

# Messages Configuration

All messages displayed by zAuctionHouse V4 can be customized in `messages.yml`.

## Message Format

Messages support:
- **MiniMessage format**: `<red>`, `<bold>`, `<gradient:red:blue>`, `<hover:show_text:'text'>`, `<click:run_command:'/cmd'>`
- **Hex colors**: `#RRGGBB` or `#RGB`
- **Legacy codes**: `&a`, `&l`, `&6` (MiniMessage recommended)
- **Custom color shortcuts**: `<primary>`, `<secondary>`, `<error>`, `<success>` (defined in config.yml)

## Message Types

Each message can be configured with a specific display type using the `type` field. If no type is specified, `TCHAT` is used by default.

| Type | Description |
|------|-------------|
| `TCHAT` | Display message in the chat window (default) |
| `ACTION` | Display message in the action bar above the hotbar |
| `TITLE` | Display message as a title on screen |
| `CENTER` | Display message centered in chat |
| `WITHOUT_PREFIX` | Display message in chat without the plugin prefix |
| `BOSSBAR` | Display message as a boss bar at the top of the screen |
| `NONE` | Do not display the message |

### Basic Usage

You can set the type of any message using the object format:

```yaml
# Simple format (defaults to TCHAT)
item-sold: "#e6fff3You just sold %items% #e6fff3for #92bed8%price%#e6fff3."

# With explicit type
item-sold:
  type: ACTION
  message: "#e6fff3You just sold %items% #e6fff3for #92bed8%price%#e6fff3."
```

### Multiple Message Parts

A single message key can trigger multiple display types at once using a list:

```yaml
item-sold:
  - type: TCHAT
    messages:
      - "#e6fff3You just sold %items% #e6fff3for #92bed8%price%#e6fff3."
  - type: ACTION
    message: "#e6fff3Sold for #92bed8%price%#e6fff3!"
```

### Title Type

The `TITLE` type supports additional fields to control the title display:

```yaml
item-sold:
  type: TITLE
  title: "<success>Item Sold!"
  subtitle: "#e6fff3You sold %items% #e6fff3for #92bed8%price%"
  start: 100    # Fade-in duration in milliseconds (default: 100)
  time: 2800    # Display duration in milliseconds (default: 2800)
  end: 100      # Fade-out duration in milliseconds (default: 100)
```

### BossBar Type

The `BOSSBAR` type displays a boss bar at the top of the screen with customizable appearance:

```yaml
item-sold:
  type: BOSSBAR
  text: "#e6fff3You just sold %items% #e6fff3for #92bed8%price%#e6fff3."
  color: WHITE       # Bar color: PINK, BLUE, RED, GREEN, YELLOW, PURPLE, WHITE (default: WHITE)
  overlay: PROGRESS  # Bar style: PROGRESS, NOTCHED_6, NOTCHED_10, NOTCHED_12, NOTCHED_20 (default: PROGRESS)
  flags: []          # Optional flags: DARKEN_SKY, PLAY_BOSS_MUSIC, CREATE_FOG
  duration: 60       # Display duration in ticks (default: 60)
  static: false      # If true, the bar does not animate (default: false)
```

### Combining Multiple Types

You can combine different types to create rich notifications:

```yaml
item-bought-buyer:
  - type: TCHAT
    messages:
      - "#e6fff3You have just bought %items% #e6fff3for #92bed8%price%#e6fff3."
  - type: TITLE
    title: "<success>Purchase Complete!"
    subtitle: "#92bed8%price%"
    start: 100
    time: 2800
    end: 100
  - type: BOSSBAR
    text: "#e6fff3Purchased %items% for #92bed8%price%"
    color: GREEN
    duration: 100
```

## General Messages

```yaml
# Prefix added before all messages
prefix: "<primary>zAuctionHouse <secondary>• "

# Version update notification
# Placeholders: %version%, %latest%
version-available: "<#ff0000>There is a new version available! <gray>(<white>current: <#ff9900>%version% <gray>| <white>latest: <#00ff00>%latest%<gray>)"
```

## Command Messages

```yaml
# Syntax error
# Placeholder: %syntax%
command-syntax-error: "<error>You must execute the command like this<gray>: <success>%syntax%"

# No permission
command-no-permission: "<error>You do not have permission to run this command."

# Console only (command requires player)
command-no-console: "<error>Only one player can execute this command."

# Invalid arguments
command-no-arg: "<error>Impossible to find the command with its arguments."

# Restricted context (banned world, etc.)
command-restricted: "<error>You cannot use this command here."

# Help format
# Placeholders: %syntax%, %description%
command-syntax-help: "<white>%syntax% <dark_gray>» <gray>%description%"
```

## Command Descriptions

```yaml
command-description-auction: "Open auction house"
command-description-auction-sell: "Add an item to the sale"
command-description-auction-rent: "Add an item for rent"
command-description-auction-bid: "Add an item to the auction"
command-description-auction-reload: "Reload configurations files"
command-description-auction-admin: "Open administrative tools for auctions"
command-description-auction-admin-generate: "Generate fake items"
command-description-auction-admin-open: "Open current auction items"
command-description-auction-admin-history: "Open player auction history"
command-description-auction-admin-add: "Add an item to the auction"
command-description-auction-admin-cache: "Manage player cache"
command-description-auction-admin-cache-set: "Set a value in player cache"
command-description-auction-admin-cache-clear: "Clear player cache"
command-description-auction-admin-cache-show: "Show player cache"
command-description-auction-claim: "Claim pending money from sales"
command-description-auction-page: "Open auction house at a specific page"
command-description-auction-migrate: "Migrate data from another auction plugin"
```

## Sell Messages

```yaml
# Trying to sell nothing
sell-error-air: "<error>Are you stupid ? You can't sell air !"

# Item changed during sell process
sell-error-change: "<error>The item in your hand has changed, sale cancelled."

# Economy not found
# Placeholder: %name%
sell-error-economy: "<error>Unable to find the economy <white>%name%<error>."

# Sell inventory empty
sell-inventory-empty: "<error>You must place items in the inventory before confirming."

# Sale cancelled
sell-inventory-cancelled: "<error>You cancelled the sale, your items have been returned."

# Items cleared from sell list
sell-items-cleared: "<success>Selected items have been cleared."

# Item added to sell list
sell-item-added: "<success>Item added to sale list."

# Item removed from sell list
sell-item-removed: "<success>Item removed from sale list."
```

## Admin Messages

```yaml
# Target player required
admin-target-required: "<error>You must specify a valid target player."

# Target not found
# Placeholder: %target%
admin-target-not-found: "<error>Unable to find the player <white>%target%<error>."

# Opening player's items
# Placeholders: %type%, %target%
admin-open-inventory: "<success>Opening %type% items for <white>%target%<success>."

# Opening player's history
# Placeholder: %target%
admin-open-history: "<success>Opening history for <white>%target%<success>."

# Admin removed items
# Placeholders: %items%, %target%
admin-item-removed: "<success>You removed <white>%items%<success> from <white>%target%<success>."

# Admin added items
# Placeholders: %items%, %target%, %type%
admin-item-added: "<success>You added <white>%items%<success> to <white>%target%<success> in <white>%type%<success>."

# Item retrieved from logs
admin-item-retrieved: "<success>Item(s) retrieved successfully."

# No item to retrieve
admin-no-item-to-retrieve: "<error>No item to retrieve from this log entry."
```

## Admin Generate Messages

```yaml
# Warning before generating
# Placeholder: %amount%
admin-generate-warning:
  - "<error>⚠ WARNING ⚠"
  - "<error>This command will generate <white>%amount%<error> fake auction items."
  - "<error>This data is <white>FAKE<error> and will need to be reset after testing."
  - "<error>Execute this command again within <white>30 seconds<error> to confirm."

# Generation confirmed
# Placeholder: %amount%
admin-generate-confirmed: "<success>Generation confirmed! Creating <white>%amount%<success> auction items..."

# Progress update
# Placeholders: %current%, %total%
admin-generate-progress: "<gray>Progress: <white>%current%<gray>/<white>%total%<gray> items created..."

# Generation complete
# Placeholders: %amount%, %time%
admin-generate-complete: "<success>Successfully generated <white>%amount%<success> auction items in <white>%time%ms<success>."

# No valid materials
admin-generate-no-materials: "<error>No valid materials found in categories."

# Invalid amount
admin-generate-invalid-amount: "<error>Invalid amount. Please specify a number between <white>1<error> and <white>100000<error>."
```

## Admin Cache Messages

```yaml
# Cache header
# Placeholder: %player%
admin-cache-show-header: "<primary>Cache for <white>%player%<primary>:"

# Cache entry format
# Placeholders: %key%, %value%
admin-cache-show-entry: "<gray>  %key% <dark_gray>» <white>%value%"

# Empty cache
admin-cache-show-empty: "<gray>  No cache entries found."

# Cache cleared
# Placeholders: %key%, %player%
admin-cache-cleared: "<success>Cleared cache key <white>%key%<success> for <white>%player%<success>."

# All cache cleared
# Placeholder: %player%
admin-cache-cleared-all: "<success>Cleared all cache for <white>%player%<success>."

# Cache cleared for all players
# Placeholders: %key%, %count%
admin-cache-cleared-all-players: "<success>Cleared cache key <white>%key%<success> for <white>%count%<success> players."

# All cache cleared for all players
# Placeholder: %count%
admin-cache-cleared-all-players-all: "<success>Cleared all cache for <white>%count%<success> players."

# Cache value set
# Placeholders: %key%, %value%, %player%
admin-cache-set: "<success>Set <white>%key%<success> to <white>%value%<success> for <white>%player%<success>."

# Cache set for all players
# Placeholders: %key%, %value%, %count%
admin-cache-set-all-players: "<success>Set <white>%key%<success> to <white>%value%<success> for <white>%count%<success> players."

# Invalid cache key
# Placeholder: %key%
admin-cache-invalid-key: "<error>Invalid cache key <white>%key%<error>. Use tab completion for valid keys."

# Invalid cache value
# Placeholders: %value%, %key%
admin-cache-invalid-value: "<error>Invalid value <white>%value%<error> for key <white>%key%<error>."

# Key not settable
# Placeholder: %key%
admin-cache-key-not-settable: "<error>Cache key <white>%key%<error> cannot be set from command."

# Player not online
# Placeholder: %player%
admin-cache-player-not-online: "<error>Player <white>%player%<error> is not online."
```

## Item Removal Messages

```yaml
# Placeholder: %items%

# Removed from listings
item-remove-listed: "#e6fff3You just removed %items% #e6fff3from the listed items."

# Removed from expired
item-remove-expired: "#e6fff3You just removed %items% #e6fff3from the expired items."

# Removed from purchased
item-remove-purchased: "#e6fff3You just removed %items% #e6fff3from the purchased items."

# Removed from selling
item-remove-selling: "#e6fff3You just removed %items% #e6fff3from your items."
```

## Transaction Messages

```yaml
# Item listed
# Placeholders: %items%, %price%
item-sold: "#e6fff3You just sold %items% #e6fff3for #92bed8%price%#e6fff3."

# Item purchased (notification to seller)
# Placeholders: %buyer%, %items%, %price%
item-bought-seller: "#ffacd5%buyer% #e6fff3just bought %items% #e6fff3for #92bed8%price%#e6fff3."

# Item purchased (to buyer)
# Placeholders: %items%, %price%
item-bought-buyer: "#e6fff3You have just bought %items% #e6fff3for #92bed8%price%#e6fff3."
```

## Error Messages

```yaml
# Not enough money
not-enough-money: "<error>You don't have enough money to buy this."

# Not enough inventory space
not-enough-space: "<error>You don't have enough space in your inventory."

# Price too high
# Placeholder: %max-price%
price-too-high: "<error>You cannot sell for more than <white>%max-price%<error>."

# Price too low
# Placeholder: %min-price%
price-too-low: "<error>You cannot sell for less than <white>%min-price%<error>."

# Listing limit reached
# Placeholder: %max-items%
listed-items-limit: "<error>You cannot sell more than <white>%max-items%<error> items."

# Banned world
world-banned: "<error>You cannot sell items in this world."

# Blacklisted item
item-blacklisted: "<error>You cannot sell blacklisted items."

# Not whitelisted item
item-whitelisted: "<error>You cannot sell an item that is not whitelist."
```

## Claim Messages

```yaml
# No pending money
claim-no-pending: "<error>You have no pending money to claim."

# Claim success
claim-success: "<success>You have successfully claimed your pending money!"

# Claim per economy
# Placeholders: %amount%, %economy%
claim-economy-success: "<success>You received <white>%amount%<success> from <white>%economy%<success>."

# Pending money notification
# Placeholder: %amount%
claim-pending-notify: "#e6fff3You have pending money to claim! Use <white>/ah claim<#e6fff3> to receive <white>%amount%<#e6fff3>."
```

## Sales Notification

```yaml
# Offline sales notification (on join)
# Placeholders: %count%, %total%
sales-notification:
  - "<click:run_command:/ah history>#e6fff3While you were away, <white>%count%<#e6fff3> of your items were sold for a total of <white>%total%<#e6fff3>!"
  - "<click:run_command:/ah history>#8c8c8c• #2CCED2Click here<#92ffff> to view your sales history</click>"
```

## Tax Messages

```yaml
# Tax applied on sell
# Placeholders: %tax%, %percentage%
tax-sell-applied: "<gray>A tax of <white>%tax%<gray> (%percentage%%) has been applied to this sale."

# Tax applied on purchase
# Placeholders: %tax%, %percentage%
tax-purchase-applied: "<gray>A tax of <white>%tax%<gray> (%percentage%%) has been applied to this purchase."

# VAT info (capitalism tax)
# Placeholders: %tax%, %percentage%
tax-capitalism-info: "<gray>The price includes <white>%tax%<gray> VAT (%percentage%%)."

# Tax exempt
tax-exempt: "<green>You are exempt from taxes."

# Reduced tax
# Placeholder: %percentage%
tax-reduced: "<green>You benefit from a reduced tax rate (%percentage%%)."

# Can't afford tax
# Placeholder: %tax%
tax-insufficient-funds: "<error>You don't have enough money to pay the tax of <white>%tax%<error>."
```

## Migration Messages

```yaml
# Not configured
# Placeholder: %source%
migration-not-configured: "<error>Migration for <white>%source%<error> is not configured."

# Invalid source
# Placeholder: %source%
migration-invalid-source: "<error>Unknown migration source: <white>%source%"

# Available sources
# Placeholder: %sources%
migration-available-sources: "<gray>Available sources: %sources%"

# Migration info
# Placeholders: %source%, %details%
migration-info:
  - "<primary>Migration from <white>%source%"
  - "<gray>Details: <white>%details%"

# Confirm prompt
# Placeholder: %source%
migration-confirm:
  - "<gray>Run <white>/ah admin migrate %source% confirm<gray> to start."
  - "<error>⚠ WARNING: Make sure to backup your data first!"

# Migration started
# Placeholder: %source%
migration-started: "<success>Migration from <white>%source%<success> started..."

# Progress
# Placeholder: %progress%
migration-progress: "<gray>[Migration] %progress%"

# Success
# Placeholders: %source%, %players%, %items%, %transactions%, %errors%, %duration%
migration-success:
  - "<success>Migration from <white>%source%<success> completed successfully!"
  - "<gray>  Players: <white>%players%"
  - "<gray>  Items: <white>%items%"
  - "<gray>  Transactions: <white>%transactions%"
  - "<gray>  Errors: <white>%errors%"
  - "<gray>  Duration: <white>%duration%ms"

# Failed
# Placeholder: %error%
migration-failed: "<error>Migration failed: <white>%error%"
```

## Reload Message

```yaml
reload-success: "<success>You just reloaded the plugin!"
```

## Inventory Not Found

```yaml
# Placeholder: %inventory-name%
inventory-not-found: "<error>Impossible to find the inventory <white>%inventory-name%<error>."
```

## Disabling Messages

Set a message to empty string to disable it:

```yaml
# No message sent on successful sale
item-sold: ""
```

## Reloading Messages

After editing `messages.yml`, reload with:

```bash
/ah reload
```
