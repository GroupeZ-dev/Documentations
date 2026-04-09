---
sidebar_position: 4
title: Placeholders
description: All placeholders available in zAuctionHouse V4
---

# Placeholders

zAuctionHouse V4 provides placeholders for use in messages, lore, and with PlaceholderAPI.

## Requirements

For PlaceholderAPI placeholders, you need [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed on your server.

## Internal Placeholders

These placeholders are used within zAuctionHouse configuration files (item lore, messages, etc.):

### Item Display Placeholders

Used in `item-lore` section of `config.yml`:

| Placeholder | Description |
|-------------|-------------|
| `%seller%` | Name of the player who listed the item |
| `%buyer%` | Name of the player who bought the item |
| `%price%` | Formatted price of the item |
| `%price-price-raw%` | Raw price value |
| `%price-price-with-decimal-format%` | Price with decimal formatting (e.g. 10 000) |
| `%price-price-without-decimal%` | Price without decimals (e.g. 10000) |
| `%price-price-with-reduction%` | Price with reduction (e.g. 10.0k) |
| `%time-remaining%` | Time until the listing expires |
| `%formatted-expire-date%` | Formatted expiration date |
| `%date%` | Transaction date |
| `%status%` | Dynamic action message (buy/retrieve) |
| `%item_count%` | Total item count in the listing |
| `%economy-name%` | Economy internal name |
| `%economy-display-name%` | Economy display name |
| `%items%` | Item display names |
| `%type%` | Log entry type |
| `%player%` | Player involved in the action |
| `%target%` | Target player (admin operations) |

:::tip Performance
Only the placeholders actually used in your lore templates are computed at render time. The plugin pre-detects which placeholders each lore section references when the configuration is loaded.
:::

### Inventory Placeholders

Used in inventory files:

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Current page number |
| `%max-page%` | Total number of pages |
| `%zauctionhouse_category_name%` | Current category name |
| `%expired-items%` | Number of expired items |
| `%purchased-items%` | Number of purchased items |
| `%selling-items%` | Number of items on sale |
| `%s%` | Pluralization suffix ("" for 1, "s" for 2+) |

### Message Placeholders

Used in `messages.yml`:

| Placeholder | Description | Used In |
|-------------|-------------|---------|
| `%version%` | Current plugin version | Version messages |
| `%latest%` | Latest available version | Version messages |
| `%syntax%` | Command syntax | Error messages |
| `%inventory-name%` | Missing inventory name | Error messages |
| `%name%` | Economy name | Economy messages |
| `%items%` | Item description | Transaction messages |
| `%tax%` | Tax amount | Tax messages |
| `%percentage%` | Tax percentage | Tax messages |
| `%max-price%` | Maximum allowed price | Price error |
| `%min-price%` | Minimum required price | Price error |
| `%max-items%` | Maximum items allowed | Limit error |
| `%amount%` | Amount value | Claim messages |
| `%economy%` | Economy name | Claim messages |
| `%count%` | Count of items | Notification messages |
| `%total%` | Total value | Notification messages |
| `%key%` | Cache key name | Admin cache |
| `%value%` | Cache value | Admin cache |
| `%source%` | Migration source | Migration messages |
| `%details%` | Migration details | Migration messages |
| `%progress%` | Migration progress | Migration messages |
| `%players%` | Migrated players count | Migration messages |
| `%transactions%` | Transaction count | Migration messages |
| `%errors%` | Error count | Migration messages |
| `%duration%` | Operation duration (ms) | Migration messages |
| `%current%` | Current progress | Generate messages |
| `%time%` | Time taken (ms) | Generate messages |

### Item Format Placeholders

Used in `item-display` section:

| Placeholder | Description |
|-------------|-------------|
| `%amount%` | Item quantity |
| `%item-translation-key%` | Minecraft language key |
| `%item-name%` | Custom item name |

### Sell Inventory Placeholders

Used in sell inventory buttons:

| Placeholder | Description |
|-------------|-------------|
| `%price%` | Current listing price |
| `%economy%` | Display name of selected economy |
| `%economy_name%` | Internal name of selected economy |
| `%item_count%` | Number of items being sold |
| `%left_click_amount%` | Price adjustment on left click |
| `%right_click_amount%` | Price adjustment on right click |
| `%shift_left_click_amount%` | Price adjustment on shift+left click |
| `%shift_right_click_amount%` | Price adjustment on shift+right click |

### Shulker Placeholders

Used in shulker content buttons:

| Placeholder | Description |
|-------------|-------------|
| `%shulker_current%` | Current shulker number (1-based) |
| `%shulker_total%` | Total number of shulkers |

### Sell Command Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%max-stack-size%` | Item's maximum stack size |

## PlaceholderAPI Placeholders

All PlaceholderAPI placeholders use the prefix `zauctionhouse_`:

### Global Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_listed_items%` | Total number of items currently listed |
| `%zauctionhouse_category_count_<category>%` | Number of items in a specific category (e.g., `%zauctionhouse_category_count_weapons%`) |

### Player Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_expired_items%` | Number of expired items for the player |
| `%zauctionhouse_selling_items%` | Number of items the player is currently selling |
| `%zauctionhouse_purchased_items%` | Number of purchased items for the player |
| `%zauctionhouse_sorting_value%` | Current sort type value (e.g., `DECREASING_DATE`) |
| `%zauctionhouse_sorting_name%` | Current sort type display name |
| `%zauctionhouse_category_name%` | Current category display name |
| `%zauctionhouse_category_id%` | Current category ID (defaults to `main`) |
| `%zauctionhouse_pending_money%` | Total pending money (formatted with currency) |
| `%zauctionhouse_pending_money_raw%` | Total pending money (raw number) |
| `%zauctionhouse_pending_money_<economy>%` | Pending money for a specific economy (e.g., `%zauctionhouse_pending_money_coins%`) |
| `%zauctionhouse_has_pending_money%` | `true` or `false` whether the player has pending money |

## Discord Webhook Placeholders

Used in `discord.yml` webhook configuration:

### Item Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%item_id%` | Internal item ID |
| `%item_material%` | Material name (lowercase) |
| `%item_display%` | Item display name with formatting |
| `%item_amount%` | Stack size |
| `%item_lore%` | Item lore |
| `%item_enchantments%` | List of enchantments |
| `%item_custom_model_data%` | CustomModelData value |
| `%item_dominant_color%` | Extracted dominant color |
| `%item_image_url%` | URL to item image |

### Player Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%seller_name%` | Seller's username |
| `%seller_uuid%` | Seller's UUID |
| `%buyer_name%` | Buyer's username (purchase only) |
| `%buyer_uuid%` | Buyer's UUID (purchase only) |

### Price Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%price%` | Raw price number |
| `%formatted_price%` | Price with economy formatting |
| `%economy_name%` | Economy internal name |
| `%economy_display_name%` | Economy display name |

### Time Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%created_at%` | When listing was created |
| `%expires_at%` | When listing expires |
| `%remaining_time%` | Time until expiration |
| `%timestamp%` | Current timestamp |

### Server Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%server_name%` | Server name (from config) |

### Category Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%category_names%` | Comma-separated category names |
| `%category_count%` | Number of matching categories |

## Usage Examples

### Inventory Lore

```yaml
# In inventories/auction.yml
item:
  material: BELL
  name: "#2CCED2Auction Information"
  lore:
    - "#92ffffNumber of items: #2CCED2%zauctionhouse_listed_items%"
    - "#92ffffSort type: #2CCED2%zauctionhouse_sorting_name%"
    - ""
    - "#8c8c8c• #2CCED2Click to refresh"
```

### Item Lore in Config

```yaml
# In config.yml
item-lore:
  listed-auction-item:
    - ""
    - "<white>⌂ #92ffffSeller#8c8c8c: #2CCED2%seller%"
    - "<white>☆ #92ffffPrice#8c8c8c: #2CCED2%price%"
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "%status%"
```

### Discord Webhook

```yaml
# In discord.yml
embed:
  title: "New Item Listed!"
  description: "**%seller_name%** has listed an item for sale"
  fields:
    - name: "Item"
      value: "%item_display%"
      inline: true
    - name: "Price"
      value: "%formatted_price%"
      inline: true
```

### Custom Messages

```yaml
# In messages.yml
item-sold: "#e6fff3You just sold %items% #e6fff3for #92bed8%price%#e6fff3."

item-bought-seller: "#ffacd5%buyer% #e6fff3just bought %items% #e6fff3for #92bed8%price%#e6fff3."

sales-notification:
  - "<click:run_command:/ah history>#e6fff3While you were away, %count% of your items were sold for a total of %total%!"
  - "<click:run_command:/ah history>#8c8c8c• #2CCED2Click here to view your sales history</click>"
```

## Color Formatting

zAuctionHouse V4 supports:

- **MiniMessage format**: `<red>`, `<bold>`, `<gradient:red:blue>`
- **Hex colors**: `#RRGGBB` or `#RGB`
- **Legacy codes**: `&c`, `&l`, etc. (MiniMessage recommended)
- **Custom shortcuts**: `<primary>`, `<secondary>`, `<error>`, `<success>` (defined in config.yml)

```yaml
# Example using custom shortcuts
message: "<primary>Welcome <secondary>to the auction house!"
# Becomes: "#24d65d Welcome #656665 to the auction house!"
```
