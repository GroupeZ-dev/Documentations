---
sidebar_position: 4
title: Buttons
description: All button types available in zAuctionHouse
---

# Buttons

zAuctionHouse provides custom button types for use in zMenu inventory configurations.

## Auction List Buttons

These buttons display paginated lists of items and require a `slots` configuration.

| Button Type | Description |
|-------------|-------------|
| `ZAUCTIONHOUSE_AUCTION` | Display items currently on sale |
| `ZAUCTIONHOUSE_EXPIRE` | Display player's expired items |
| `ZAUCTIONHOUSE_ITEMS` | Display player's active listings |
| `ZAUCTIONHOUSE_BUYING` | Display player's purchased items |
| `ZAUCTIONHOUSE_SEARCH` | Display search results |
| `ZAUCTIONHOUSE_CATEGORY` | Display items in a category |
| `ZAUCTIONHOUSE_EXPIRE_AND_BUYING` | Combined expired + purchased |
| `ZAUCTIONHOUSE_EXPIRE_AND_BUYING_AND_ITEMS` | Combined all three |

### Example: Auction List

```yaml
auction_items:
  type: ZAUCTIONHOUSE_AUCTION
  slots:
    - 10-16
    - 19-25
    - 28-34
```

---

## Category Buttons

### ZAUCTIONHOUSE_CATEGORY

Display items from a specific category.

```yaml
weapons_category:
  type: ZAUCTIONHOUSE_CATEGORY
  category: weapons
  slot: 10
  item:
    material: DIAMOND_SWORD
    name: "&cWeapons"
```

### ZAUCTIONHOUSE_CATEGORIES_LORE

Cycle through categories (used in `category.yml`).

```yaml
category_selector:
  type: ZAUCTIONHOUSE_CATEGORIES_LORE
  slot: 49
  item:
    material: COMPASS
    name: "&eCategories"
```

### ZAUCTIONHOUSE_CATEGORIES_HOME

Category cycling for main auction view (used in `auction.yml`).

```yaml
home_categories:
  type: ZAUCTIONHOUSE_CATEGORIES_HOME
  slot: 45
  item:
    material: BOOK
    name: "&6Browse Categories"
```

---

## Remove All Buttons

| Button Type | Description |
|-------------|-------------|
| `ZAUCTIONHOUSE_REMOVE_ALL_ITEMS` | Recover all listed items |
| `ZAUCTIONHOUSE_REMOVE_ALL_BUYING` | Recover all purchased items |
| `ZAUCTIONHOUSE_REMOVE_ALL_EXPIRE` | Recover all expired items |

### Example

```yaml
remove_all_expire:
  type: ZAUCTIONHOUSE_REMOVE_ALL_EXPIRE
  slot: 53
  item:
    material: HOPPER
    name: "&cCollect All Expired"
    lore:
      - "&7Click to collect all"
      - "&7expired items."
```

---

## Display Buttons

| Button Type | Description | Used In |
|-------------|-------------|---------|
| `ZAUCTIONHOUSE_SHOW_REMOVE` | Display item for removal | removeConfirm.yml |
| `ZAUCTIONHOUSE_SHOW_BUY` | Display item for purchase | buyConfirm.yml |
| `ZAUCTIONHOUSE_SHOW_ADMIN` | Display item for admin removal | adminRemove.yml |
| `ZAUCTIONHOUSE_SHOW_ITEMS` | Display container contents | Various |
| `ZAUCTIONHOUSE_SHOW_SELLER` | Display seller's head | buyConfirm.yml |

### Example: Show Item for Purchase

```yaml
show_item:
  type: ZAUCTIONHOUSE_SHOW_BUY
  slot: 13
```

### Example: Show Seller Head

```yaml
seller_head:
  type: ZAUCTIONHOUSE_SHOW_SELLER
  slot: 4
```

---

## Functional Buttons

### ZAUCTIONHOUSE_CLAIM

Claim pending money (same as `/ah claim`).

```yaml
claim_button:
  type: ZAUCTIONHOUSE_CLAIM
  refresh-placeholder: true    # Auto-update display
  slot: 49
  item:
    material: GOLD_INGOT
    name: "&6Claim Money"
    lore:
      - "&7Pending: &e%zauctionhouse_claim_vault%"
```

### ZAUCTIONHOUSE_UPDATE

Refresh the item list.

```yaml
refresh_button:
  type: ZAUCTIONHOUSE_UPDATE
  slot: 8
  item:
    material: SUNFLOWER
    name: "&aRefresh"
```

### ZAUCTIONHOUSE_CHANGE_SORT

Change the sorting method.

```yaml
sort_button:
  type: ZAUCTIONHOUSE_CHANGE_SORT
  slot: 47
  item:
    material: HOPPER
    name: "&eSort"
```

### ZAUCTIONHOUSE_CHANGE_SORTING

Cycle through sort options (right-click forward, left-click back).

Available sort types:
- `INCREASING_PRICE` / `DECREASING_PRICE`
- `INCREASING_DATE` / `DECREASING_DATE`
- `ALPHABETICAL` / `REVERSE_ALPHABETICAL`
- `STACK_SIZE_INCREASING` / `STACK_SIZE_DECREASING`
- And more...

```yaml
sorting_cycle:
  type: ZAUCTIONHOUSE_CHANGE_SORTING
  slot: 47
  item:
    material: HOPPER
    name: "&eSort: %zauctionhouse_sorting%"
    lore:
      - "&7Left-click: Previous"
      - "&7Right-click: Next"
```

---

## Selling Buttons

### ZAUCTIONHOUSE_SELL_INVENTORY_ACCEPT

Confirm selling multiple items.

```yaml
confirm_sell:
  type: ZAUCTIONHOUSE_SELL_INVENTORY_ACCEPT
  slot: 49
  item:
    material: LIME_STAINED_GLASS_PANE
    name: "&aConfirm Sale"
```

### ZAUCTIONHOUSE_SELL_INVENTORY_SLOT

Designate slots for item placement.

```yaml
sell_slots:
  type: ZAUCTIONHOUSE_SELL_INVENTORY_SLOT
  slots:
    - 10-16
    - 19-25
```

---

## Purchase Buttons

### ZAUCTIONHOUSE_BUY_CONFIRM

Confirm a purchase.

Available placeholders:
- `%price%` - Item price
- `%seller%` - Seller name
- `%timer%` - Time remaining
- `%money-after-purchase%` - Balance after purchase

```yaml
buy_confirm:
  type: ZAUCTIONHOUSE_BUY_CONFIRM
  slot: 11
  item:
    material: LIME_STAINED_GLASS_PANE
    name: "&aConfirm Purchase"
    lore:
      - "&7Price: &e%price%"
      - "&7Seller: &b%seller%"
      - "&7Your balance after: &e%money-after-purchase%"
```

---

## Admin Buttons

### ZAUCTIONHOUSE_ADMIN_REMOVE

Remove items as admin.

```yaml
admin_remove:
  type: ZAUCTIONHOUSE_ADMIN_REMOVE
  isSilent: false        # Don't notify the seller
  isForceRemove: false   # Remove without returning to seller
  slot: 15
  item:
    material: BARRIER
    name: "&cRemove Listing"
```

### ZAUCTIONHOUSE_REMOVE_CONFIRM

Standard item removal.

```yaml
remove_confirm:
  type: ZAUCTIONHOUSE_REMOVE_CONFIRM
  slot: 11
  item:
    material: LIME_STAINED_GLASS_PANE
    name: "&aConfirm Removal"
```

### ZAUCTIONHOUSE_REMOVE_CONFIRM_ADMIN

Admin removal variant.

```yaml
admin_remove_confirm:
  type: ZAUCTIONHOUSE_REMOVE_CONFIRM_ADMIN
  slot: 15
  item:
    material: RED_STAINED_GLASS_PANE
    name: "&cAdmin Remove"
```

---

## Economy Selection

### ZAUCTIONHOUSE_ECONOMY

Select an economy for selling.

```yaml
economy_vault:
  type: ZAUCTIONHOUSE_ECONOMY
  economy: "vault"
  slot: 10
  item:
    material: GOLD_INGOT
    name: "&6Money"
```

---

## Search Button

### ZAUCTIONHOUSE_SEARCH_INPUT

Open search interface (sign-based with ProtocolLib, chat-based otherwise).

```yaml
search_button:
  type: ZAUCTIONHOUSE_SEARCH_INPUT
  slot: 48
  item:
    material: OAK_SIGN
    name: "&eSearch"
    lore:
      - "&7Click to search items"
```
