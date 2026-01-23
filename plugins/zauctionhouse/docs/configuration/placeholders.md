---
sidebar_position: 5
title: Placeholders
description: PlaceholderAPI placeholders for zAuctionHouse
---

# Placeholders

zAuctionHouse provides placeholders that work both with and without PlaceholderAPI. Without PlaceholderAPI, placeholders only work within zAuctionHouse configurations.

## General Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_expired_item%` | Number of expired items for the player |
| `%zauctionhouse_buying_item%` | Number of purchased items to collect |
| `%zauctionhouse_currents_item%` | Number of items the player has for sale |
| `%zauctionhouse_counts%` | Total number of items for sale |
| `%zauctionhouse_max_items%` | Maximum items the player can sell |
| `%zauctionhouse_sorting%` | Current sorting method display name |
| `%zauctionhouse_sorting_type%` | Current sorting method type |
| `%zauctionhouse_category%` | Current selected category |
| `%zauctionhouse_claims%` | Returns true/false if player has pending money |
| `%zauctionhouse_disable_sell_confirmation%` | Returns true if confirmation is disabled |

## Economy Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_claim_<economy>%` | Pending money for specific economy |

Examples:
- `%zauctionhouse_claim_vault%`
- `%zauctionhouse_claim_diamond%`
- `%zauctionhouse_claim_level%`

## Category Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_category_item_<category>%` | Number of items in a category |

Examples:
- `%zauctionhouse_category_item_weapons%`
- `%zauctionhouse_category_item_blocks%`
- `%zauctionhouse_category_item_tools%`

## Sell Show Placeholders

These placeholders only work in the `SELL_SHOW` inventory:

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_price%` | Price of the item |
| `%zauctionhouse_amount%` | Amount of items |
| `%zauctionhouse_currency%` | Currency type |
| `%zauctionhouse_sellinventory_price%` | Total price for inventory sell |
| `%zauctionhouse_sellinventory_currency%` | Currency for inventory sell |

---

## Message Placeholders

These placeholders are used in message configurations:

| Placeholder | Description |
|-------------|-------------|
| `%command%` | Command syntax |
| `%syntaxe%` | Command format |
| `%price%` | Item price |
| `%amount%` | Item quantity |
| `%item%` | Item name |
| `%player%` | Player username |
| `%buyer%` | Purchaser name |
| `%seller%` | Seller name |
| `%time%` | Time duration |
| `%status%` | Status text |
| `%page%` | Current page |
| `%maxPage%` | Total pages |
| `%type%` | Transaction type |
| `%date%` | Transaction date |
| `%cooldown%` | Cooldown remaining |
| `%max%` | Maximum limit |
| `%min%` | Minimum limit |
| `%tax%` | Tax amount |
| `%name%` | Economy name |

---

## Statistics Addon Placeholders

If using the Statistics addon, additional placeholders are available:

### Global Statistics

| Placeholder | Description |
|-------------|-------------|
| `%zahstats_global_sales%` | Total sales server-wide |
| `%zahstats_global_purchases%` | Total purchases server-wide |
| `%zahstats_global_expired%` | Total expired items |

### Player Statistics

| Placeholder | Description |
|-------------|-------------|
| `%zahstats_player_sales%` | Player's total sales |
| `%zahstats_player_purchases%` | Player's total purchases |
| `%zahstats_player_earnings%` | Player's total earnings |
| `%zahstats_player_spending%` | Player's total spending |

### Economy-Specific

| Placeholder | Description |
|-------------|-------------|
| `%zahstats_player_earnings_<economy>%` | Earnings in specific economy |
| `%zahstats_player_spending_<economy>%` | Spending in specific economy |

### Material Statistics

| Placeholder | Description |
|-------------|-------------|
| `%zahstats_material_avgprice_<material>%` | Average price for material |
| `%zahstats_material_medianprice_<material>%` | Median price for material |

### Rankings

| Placeholder | Description |
|-------------|-------------|
| `%zahstats_top_seller_<position>%` | Top seller at position |
| `%zahstats_top_buyer_<position>%` | Top buyer at position |
| `%zahstats_top_earnings_<position>%` | Top earner at position |

---

## Configuration Examples

### In Inventory Configuration

```yaml
claim_button:
  slot: 49
  item:
    material: GOLD_INGOT
    name: "&6Claim Money"
    lore:
      - "&7You have pending money!"
      - ""
      - "&7Vault: &e%zauctionhouse_claim_vault%"
      - "&7Diamonds: &b%zauctionhouse_claim_diamond%"
      - ""
      - "&eClick to claim!"
```

### Category Display

```yaml
categories_info:
  slot: 4
  item:
    material: BOOK
    name: "&eCategory Info"
    lore:
      - "&7Weapons: &c%zauctionhouse_category_item_weapons%"
      - "&7Armor: &9%zauctionhouse_category_item_armor%"
      - "&7Tools: &6%zauctionhouse_category_item_tools%"
      - "&7Blocks: &8%zauctionhouse_category_item_blocks%"
```

### Player Stats

```yaml
stats_button:
  slot: 8
  item:
    material: PAPER
    name: "&eYour Stats"
    lore:
      - "&7Active Listings: &a%zauctionhouse_currents_item%"
      - "&7Max Listings: &e%zauctionhouse_max_items%"
      - "&7Expired Items: &c%zauctionhouse_expired_item%"
      - "&7To Collect: &b%zauctionhouse_buying_item%"
```

---

## Placeholder Caching

Placeholders are cached to improve performance:

```yaml
# In config.yml
placeholder:
  cacheDuration: 60000    # Cache duration in milliseconds (1 minute)
  loadingText: "Loading..." # Text shown while loading
```

Adjust `cacheDuration` based on your server's needs:
- Lower values = more accurate but more resource usage
- Higher values = less accurate but better performance
