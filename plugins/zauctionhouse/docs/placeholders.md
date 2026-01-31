---
sidebar_position: 4
title: Placeholders
description: PlaceholderAPI placeholders for zAuctionHouse
---

# Placeholders

zAuctionHouse provides PlaceholderAPI placeholders for use in scoreboards, holograms, chat plugins, and more.

## Requirements

To use placeholders, you need [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed on your server.

## Global Placeholders

These placeholders return server-wide auction statistics:

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_total_items%` | Total items currently listed |
| `%zauctionhouse_total_sales%` | Total number of sales (all time) |
| `%zauctionhouse_total_value%` | Total value of all listed items |
| `%zauctionhouse_items_sold_today%` | Items sold today |
| `%zauctionhouse_items_listed_today%` | Items listed today |

## Player Placeholders

These placeholders return data specific to the player:

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_player_items_listed%` | Number of items the player has listed |
| `%zauctionhouse_player_items_sold%` | Total items the player has sold |
| `%zauctionhouse_player_items_purchased%` | Total items the player has purchased |
| `%zauctionhouse_player_items_expired%` | Number of expired items waiting |
| `%zauctionhouse_player_items_to_claim%` | Number of purchased items to claim |
| `%zauctionhouse_player_total_earned%` | Total money earned from sales |
| `%zauctionhouse_player_total_spent%` | Total money spent on purchases |
| `%zauctionhouse_player_limit%` | Player's listing limit |
| `%zauctionhouse_player_limit_remaining%` | Remaining listing slots |

## Item Display Placeholders

These placeholders are used internally in inventory configurations to display item information:

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_item_seller%` | Seller's name |
| `%zauctionhouse_item_seller_uuid%` | Seller's UUID |
| `%zauctionhouse_item_price%` | Item price (formatted) |
| `%zauctionhouse_item_price_raw%` | Item price (raw number) |
| `%zauctionhouse_item_economy%` | Economy name used |
| `%zauctionhouse_item_category%` | Item's category |
| `%zauctionhouse_item_expire_date%` | Expiration date |
| `%zauctionhouse_item_expire_time%` | Time until expiration |
| `%zauctionhouse_item_listed_date%` | When the item was listed |
| `%zauctionhouse_item_listed_ago%` | Time since listing |

## Economy Placeholders

For multi-economy setups:

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_economy_<name>_items%` | Items listed with this economy |
| `%zauctionhouse_economy_<name>_total_value%` | Total value in this economy |

Replace `<name>` with your economy name (e.g., `vault`, `playerpoints`).

## Category Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_category_<name>_items%` | Items in this category |
| `%zauctionhouse_category_<name>_total_value%` | Total value in this category |

Replace `<name>` with your category name.

## Usage Examples

### Scoreboard (using TAB plugin)

```yaml
scoreboard:
  lines:
    - "&6Auction House"
    - "&7Items Listed: &f%zauctionhouse_player_items_listed%/%zauctionhouse_player_limit%"
    - "&7Expired: &c%zauctionhouse_player_items_expired%"
    - "&7To Claim: &a%zauctionhouse_player_items_to_claim%"
```

### Hologram (using DecentHolograms)

```
/dh create auction
/dh line add auction "&6&lAuction House"
/dh line add auction "&7Total Items: &f%zauctionhouse_total_items%"
/dh line add auction "&7Sold Today: &a%zauctionhouse_items_sold_today%"
```

### Chat Format (using EssentialsX)

```yaml
format: '{DISPLAYNAME} &7[AH: {zauctionhouse_player_items_listed}] &f{MESSAGE}'
```

### Inventory Lore (in zMenu inventories)

```yaml
items:
  info:
    slot: 4
    item:
      material: BOOK
      name: "&6Your Statistics"
      lore:
        - "&7Items Listed: &f%zauctionhouse_player_items_listed%"
        - "&7Total Sold: &a%zauctionhouse_player_items_sold%"
        - "&7Total Purchased: &b%zauctionhouse_player_items_purchased%"
        - "&7Total Earned: &6%zauctionhouse_player_total_earned%"
```

## Placeholder Refresh

Placeholders are cached for performance. The cache refreshes:
- Every 30 seconds for global placeholders
- On-demand for player placeholders

You can configure the cache duration in `config.yml`:

```yaml
placeholders:
  cache-duration: 30 # seconds
```

## Troubleshooting

### Placeholders not working

1. Ensure PlaceholderAPI is installed: `/papi list`
2. Check that the expansion is registered: `/papi ecloud list installed`
3. Try reloading: `/papi reload`

### Placeholders showing as text

If placeholders appear as raw text (e.g., `%zauctionhouse_total_items%`):
- The plugin using the placeholder may not support PlaceholderAPI
- Try wrapping with `%papi_...%` in some plugins
- Check the plugin's documentation for PlaceholderAPI support
