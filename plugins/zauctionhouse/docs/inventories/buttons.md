---
sidebar_position: 1
title: Buttons
description: All available button types for zAuctionHouse inventories
---

# Button Types

This page lists all button types available in zAuctionHouse. Each button type has specific functionality and configuration options.

All inventories in zAuctionHouse are powered by [zMenu](https://modrinth.com/plugin/zmenu). For general zMenu button configuration (items, slots, lore, etc.), refer to the [zMenu documentation](https://docs.groupez.dev/zmenu).

## Item Display Buttons

These buttons display and handle auction items.

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSE_LISTED_ITEMS`](#zauctionhouse_listed_items) | Displays all listed auction items with pagination | [Auction](./auction) |
| [`ZAUCTIONHOUSE_EXPIRED_ITEMS`](#zauctionhouse_expired_items) | Displays player's expired items | [Expired Items](./expired-items) |
| [`ZAUCTIONHOUSE_PURCHASED_ITEMS`](#zauctionhouse_purchased_items) | Displays player's purchased items | [Purchased Items](./purchased-items) |
| [`ZAUCTIONHOUSE_SELLING_ITEMS`](#zauctionhouse_selling_items) | Displays player's items on sale | [Selling Items](./selling-items) |
| [`ZAUCTIONHOUSE_HISTORY_ITEMS`](#zauctionhouse_history_items) | Displays player's sales history | [History](./history) |

---

### ZAUCTIONHOUSE_LISTED_ITEMS

Displays all items currently listed for sale in the auction house. Supports pagination, category filtering, and sorting.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slots` | List | Slots where items are displayed (e.g., `9-17`, `18-26`) |
| `empty-slot` | Number | Slot for the "no items" placeholder |
| `item` | Item | Placeholder shown when no items exist |

**Example:**

```yaml
displayItems:
  type: ZAUCTIONHOUSE_LISTED_ITEMS
  empty-slot: 22
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
  item:
    material: BARRIER
    name: '#ff0000&nNo items found'
```

---

### ZAUCTIONHOUSE_EXPIRED_ITEMS

Displays expired items that the player can retrieve. Click an item to claim it back.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slots` | List | Slots where items are displayed |
| `empty-slot` | Number | Slot for the "no items" placeholder |
| `item` | Item | Placeholder shown when no items exist |

**Example:**

```yaml
items:
  type: ZAUCTIONHOUSE_EXPIRED_ITEMS
  empty-slot: 22
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
  item:
    material: BARRIER
    name: '#ff0000&nNo items found'
```

---

### ZAUCTIONHOUSE_PURCHASED_ITEMS

Displays items the player has purchased but not yet claimed.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slots` | List | Slots where items are displayed |
| `empty-slot` | Number | Slot for the "no items" placeholder |
| `item` | Item | Placeholder shown when no items exist |

**Example:**

```yaml
items:
  type: ZAUCTIONHOUSE_PURCHASED_ITEMS
  empty-slot: 22
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
  item:
    material: BARRIER
    name: '#ff0000&nNo items found'
```

---

### ZAUCTIONHOUSE_SELLING_ITEMS

Displays items the player currently has listed for sale. Click to remove an item from sale.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slots` | List | Slots where items are displayed |
| `empty-slot` | Number | Slot for the "no items" placeholder |
| `item` | Item | Placeholder shown when no items exist |

**Example:**

```yaml
items:
  type: ZAUCTIONHOUSE_SELLING_ITEMS
  empty-slot: 22
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
  item:
    material: BARRIER
    name: '#ff0000&nNo items found'
```

---

### ZAUCTIONHOUSE_HISTORY_ITEMS

Displays the player's sales history (items they have sold).

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slots` | List | Slots where items are displayed |
| `loading-slot` | Number | Slot for the loading indicator |
| `item` | Item | Loading placeholder |
| `else` | Object | Configuration when no history exists |

**Example:**

```yaml
items:
  type: ZAUCTIONHOUSE_HISTORY_ITEMS
  loading-slot: 22
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
  item:
    material: BARRIER
    name: "#ff0000Loading..."
  else:
    slots:
      - 22
    item:
      material: BARRIER
      name: '#ff0000&nNo Sales Found'
```

---

## Navigation Buttons

These buttons open other inventories.

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSE_EXPIRED_INVENTORY`](#zauctionhouse_expired_inventory) | Opens expired items inventory | [Auction](./auction) |
| [`ZAUCTIONHOUSE_PURCHASED_INVENTORY`](#zauctionhouse_purchased_inventory) | Opens purchased items inventory | [Auction](./auction) |
| [`ZAUCTIONHOUSE_SELLING_INVENTORY`](#zauctionhouse_selling_inventory) | Opens selling items inventory | [Auction](./auction) |
| [`ZAUCTIONHOUSE_HISTORY_INVENTORY`](#zauctionhouse_history_inventory) | Opens sales history inventory | [Auction](./auction) |
| [`ZAUCTIONHOUSE_CATEGORY`](#zauctionhouse_category) | Opens auction filtered by category | [Categories](./categories) |
| [`ZAUCTIONHOUSE_CATEGORY_SWITCHER`](#zauctionhouse_category_switcher) | Cycles through categories with left/right click | [Auction](./auction) |
| [`ZAUCTIONHOUSE_SEARCH`](#zauctionhouse_search) | Opens chat-based search input | [Auction](./auction) |
| [`ZAUCTIONHOUSE_CLEAR_SEARCH`](#zauctionhouse_clear_search) | Clears active search filter | [Auction](./auction) |

---

### ZAUCTIONHOUSE_EXPIRED_INVENTORY

Opens the expired items inventory. Displays different items based on whether the player has expired items.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Shown when player HAS expired items |
| `else.item` | Item | Shown when player has NO expired items |

**Placeholders:**
- `%expired-items%` - Number of expired items
- `%s%` - Pluralization suffix ("" for 1, "s" for 2+)

**Example:**

```yaml
expired-items:
  type: ZAUCTIONHOUSE_EXPIRED_INVENTORY
  slot: 45
  item:
    url: "eyJ0ZXh0dXJlcy..."
    name: "#2CCED2<bold>ᴇxᴘɪʀᴇᴅ ɪᴛᴇᴍs"
    lore:
      - "#92ffffYou have #2CCED2%expired-items% #92ffffexpired item%s%."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto open"
  else:
    item:
      url: "eyJ0ZXh0dXJlcy..."
      name: "#2CCED2<bold>ᴇxᴘɪʀᴇᴅ ɪᴛᴇᴍs"
      lore:
        - "#ff3535You have no expired items."
```

---

### ZAUCTIONHOUSE_PURCHASED_INVENTORY

Opens the purchased items inventory.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Shown when player HAS purchased items |
| `else.item` | Item | Shown when player has NO purchased items |

**Placeholders:**
- `%purchased-items%` - Number of purchased items
- `%s%` - Pluralization suffix

**Example:**

```yaml
purchased-items:
  type: ZAUCTIONHOUSE_PURCHASED_INVENTORY
  slot: 46
  item:
    url: "eyJ0ZXh0dXJlcy..."
    name: "#2CCED2<bold>ᴘᴜʀᴄʜᴀsᴇᴅ ɪᴛᴇᴍs"
    lore:
      - "#92ffffYou have #2CCED2%purchased-items% #92ffffbought item%s%."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto open"
  else:
    item:
      url: "eyJ0ZXh0dXJlcy..."
      name: "#2CCED2<bold>ᴘᴜʀᴄʜᴀsᴇᴅ ɪᴛᴇᴍs"
      lore:
        - "#ff3535You have no purchased items."
```

---

### ZAUCTIONHOUSE_SELLING_INVENTORY

Opens the inventory showing items the player currently has on sale.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Shown when player HAS items on sale |
| `else.item` | Item | Shown when player has NO items on sale |

**Placeholders:**
- `%selling-items%` - Number of items on sale
- `%s%` - Pluralization suffix

**Example:**

```yaml
selling-items:
  type: ZAUCTIONHOUSE_SELLING_INVENTORY
  slot: 53
  item:
    url: "eyJ0ZXh0dXJlcy..."
    name: "#2CCED2<bold>ʏᴏᴜʀ ɪᴛᴇᴍs"
    lore:
      - "#92ffffYou have #2CCED2%selling-items% #92ffffitem%s% on sale."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto open"
  else:
    item:
      url: "eyJ0ZXh0dXJlcy..."
      name: "#2CCED2<bold>ʏᴏᴜʀ ɪᴛᴇᴍs"
      lore:
        - "#ff3535You have no items for sale."
```

---

### ZAUCTIONHOUSE_HISTORY_INVENTORY

Opens the sales history inventory.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Button appearance |

**Example:**

```yaml
history:
  type: ZAUCTIONHOUSE_HISTORY_INVENTORY
  slot: 47
  item:
    material: BOOK
    name: "#2CCED2<bold>sᴀʟᴇs ʜɪsᴛᴏʀʏ"
    lore:
      - "#92ffffView your sales history."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto open"
```

---

### ZAUCTIONHOUSE_CATEGORY

Opens the auction house filtered by a specific category.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `category` | String | Category name (must match `categories.yml`) |
| `item` | Item | Button appearance |

**Special Categories:**
- `all` - Shows all items (no filtering)

**Placeholders:**
- `%zauctionhouse_category_count_<name>%` - Number of items in category

**Example:**

```yaml
weapons:
  type: ZAUCTIONHOUSE_CATEGORY
  category: weapons
  slot: 20
  item:
    material: DIAMOND_SWORD
    name: "#ff5555<bold>ᴡᴇᴀᴘᴏɴs"
    lore:
      - "#92ffffCombat equipment"
      - ""
      - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_weapons%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto browse"
```

---

### ZAUCTIONHOUSE_CATEGORY_SWITCHER

Cycles through categories using left/right click. Displays a dynamic lore showing the enable/disable state for each category.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `enable-text` | String | Format for the currently selected category |
| `disable-text` | String | Format for unselected categories |
| `categories` | List | List of category IDs to cycle through |
| `item` | Item | Button appearance |

**Placeholders:**
- `%category%` - Current category display name
- `%<category-id>%` - Replaced by `enable-text` or `disable-text` for each category

**Example:**

```yaml
category-switcher:
  type: ZAUCTIONHOUSE_CATEGORY_SWITCHER
  slot: 49
  enable-text: "&a● %category%"
  disable-text: "&7○ %category%"
  categories:
    - "main"
    - "weapons"
    - "armor"
    - "tools"
    - "blocks"
    - "consumables"
    - "resources"
    - "enchanted-books"
    - "misc"
  item:
    material: COMPASS
    name: "&6Categories &7(&f%category%&7)"
    lore:
      - ""
      - "%main%"
      - "%weapons%"
      - "%armor%"
      - "%tools%"
      - "%blocks%"
      - "%consumables%"
      - "%resources%"
      - "%enchanted-books%"
      - "%misc%"
      - ""
      - "&7Left-click &8» &fNext"
      - "&7Right-click &8» &fPrevious"
```

:::tip
Use `"main"` as a category ID to represent "All Items" (no filtering).
:::

---

## Search Buttons

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSE_SEARCH`](#zauctionhouse_search) | Opens chat-based search input | [Auction](./auction) |
| [`ZAUCTIONHOUSE_CLEAR_SEARCH`](#zauctionhouse_clear_search) | Clears active search filter | [Auction](./auction) |

---

### ZAUCTIONHOUSE_SEARCH

Opens a chat-based search input. When clicked, the player's inventory closes and they can type a search query in chat. Supports advanced filter operators for targeted searches.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Button appearance |

**Placeholders:**
- `%search_query%` - Current search query (or "None" if no search active)
- `%search_active%` - Whether a search is active (`true`/`false`)

**Search Operators:**

| Operator | Description |
|----------|-------------|
| `~` | Contains (case-sensitive) |
| `=` | Exact match (case-sensitive) |
| `~=` | Contains (ignore case) |
| `==` | Exact match (ignore case) |

**Searchable Fields:** `name`, `material`, `lore`, `seller`

**Example:**

```yaml
search:
  type: ZAUCTIONHOUSE_SEARCH
  slot: 47
  is-permanent: true
  item:
    material: COMPASS
    name: "#2CCED2<bold>sᴇᴀʀᴄʜ"
    lore:
      - ""
      - "#92ffffCurrent search#8c8c8c: #2CCED2%search_query%"
      - ""
      - "#92ffffFilters#8c8c8c:"
      - "#8c8c8c  name #76CDCD~ #8c8c8cvalue    #555555(contains)"
      - "#8c8c8c  name #76CDCD= #8c8c8cvalue    #555555(exact)"
      - "#8c8c8c  name #76CDCD~= #8c8c8cvalue   #555555(contains, ignore case)"
      - "#8c8c8c  name #76CDCD== #8c8c8cvalue   #555555(exact, ignore case)"
      - ""
      - "#92ffffFields#8c8c8c: #76CDCDname#8c8c8c, #76CDCDmaterial#8c8c8c, #76CDCDlore#8c8c8c, #76CDCDseller"
      - ""
      - "#92ffffExamples#8c8c8c:"
      - "#8c8c8c  seller #76CDCD= #8c8c8cNotch"
      - "#8c8c8c  name #76CDCD~ #8c8c8cDiamond"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto search"
```

:::tip
Without an operator, the search performs a case-insensitive substring match on item name, material, lore, and seller name simultaneously.
:::

---

### ZAUCTIONHOUSE_CLEAR_SEARCH

Clears the active search filter. This button is only visible when the player has an active search query.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Button appearance |

**Placeholders:**
- `%search_query%` - Current search query

**Example:**

```yaml
clear-search:
  type: ZAUCTIONHOUSE_CLEAR_SEARCH
  slot: 48
  is-permanent: true
  item:
    material: BARRIER
    name: "#ff6b6b<bold>ᴄʟᴇᴀʀ sᴇᴀʀᴄʜ"
    lore:
      - ""
      - "#92ffffSearching for#8c8c8c: #2CCED2%search_query%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto clear search"
```

---

## Claim Button

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSE_CLAIM`](#zauctionhouse_claim) | Displays pending money and allows claiming | [Auction](./auction) |

---

### ZAUCTIONHOUSE_CLAIM

Displays the player's pending money from sales and allows them to claim it with a single click. Shows per-economy amounts using dynamic placeholders and supports a loading state while data is being fetched.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `loading-item` | Item | Shown while pending money data is loading |
| `item` | Item | Normal button appearance with pending money placeholders |

**Placeholders:**

| Placeholder | Description |
|-------------|-------------|
| `%pending_total%` | Total pending money across all economies (formatted) |
| `%pending_<economy_name>%` | Pending money for a specific economy (e.g., `%pending_vault%`) |
| `%has_pending%` | `true` or `false` |

:::info
The economy name corresponds to the `name` field defined in your `economies.yml` configuration. For example, if you have an economy with `name: vault`, use `%pending_vault%`.
:::

**Example:**

```yaml
claim-money:
  type: ZAUCTIONHOUSE_CLAIM
  slot: 48
  loading-item:
    material: CLOCK
    name: "#2CCED2<bold>ᴄʟᴀɪᴍ ᴍᴏɴᴇʏ"
    lore:
      - "#8c8c8c• #ff3535Loading, please wait..."
  item:
    material: GOLD_INGOT
    name: "#2CCED2<bold>ᴄʟᴀɪᴍ ᴍᴏɴᴇʏ"
    lore:
      - ""
      - "#92ffffPending money#8c8c8c: #2CCED2%pending_total%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto claim your money"
```

**Multi-economy example:**

```yaml
claim-money:
  type: ZAUCTIONHOUSE_CLAIM
  slot: 48
  loading-item:
    material: CLOCK
    name: "#2CCED2<bold>ᴄʟᴀɪᴍ ᴍᴏɴᴇʏ"
    lore:
      - "#8c8c8c• #ff3535Loading, please wait..."
  item:
    material: GOLD_INGOT
    name: "#2CCED2<bold>ᴄʟᴀɪᴍ ᴍᴏɴᴇʏ"
    lore:
      - ""
      - "#92ffffVault#8c8c8c: #2CCED2%pending_vault%"
      - "#92ffffTokens#8c8c8c: #2CCED2%pending_tokens%"
      - "#92ffffTotal#8c8c8c: #2CCED2%pending_total%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto claim your money"
```

---

## Sort Buttons

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSE_CHANGE_SORT`](#zauctionhouse_change_sort) | Changes auction item sort order | [Auction](./auction) |
| [`ZAUCTIONHOUSE_HISTORY_SORT`](#zauctionhouse_history_sort) | Changes history sort order | [History](./history) |

---

### ZAUCTIONHOUSE_CHANGE_SORT

Cycles through available sort options for the auction house.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `sorts` | List | Available sort options |
| `enable-text` | String | Format for selected sort option |
| `disable-text` | String | Format for unselected sort options |
| `loading-item` | Item | Shown while sorting |
| `item` | Item | Button appearance |

**Sort Options:**
- `DECREASING_DATE` - Newest first
- `INCREASING_DATE` - Oldest first
- `DECREASING_PRICE` - Most expensive first
- `INCREASING_PRICE` - Cheapest first

**Example:**

```yaml
change-sort:
  type: ZAUCTIONHOUSE_CHANGE_SORT
  slot: 52
  sorts:
    - DECREASING_DATE
    - DECREASING_PRICE
    - ASCENDING_DATE
    - ASCENDING_PRICE
  enable-text: ' #F27438➜ %sorting%'
  disable-text: ' #76CDCD➜ %sorting%'
  loading-item:
    material: HOPPER
    name: "#2CCED2<bold>sᴏʀᴛ ᴛʏᴘᴇ"
    lore:
      - "#8c8c8c• #ff3535Loading, please wait"
  item:
    material: HOPPER
    name: "#2CCED2<bold>sᴏʀᴛ ᴛʏᴘᴇ"
    lore:
      - "#92ffffAvailable sort types:"
      - "%DECREASING_DATE%"
      - "%DECREASING_PRICE%"
      - "%ASCENDING_DATE%"
      - "%ASCENDING_PRICE%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto change the sort type"
```

---

### ZAUCTIONHOUSE_HISTORY_SORT

Cycles through sort options for sales history.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `sorts` | List | Available sort options |
| `sort-names` | Map | Display names for sort options |
| `enable-text` | String | Format for selected sort option |
| `disable-text` | String | Format for unselected sort options |
| `item` | Item | Button appearance |

**Sort Options:**
- `DATE_DESC` - Newest first
- `DATE_ASC` - Oldest first
- `PRICE_DESC` - Highest price first
- `PRICE_ASC` - Lowest price first
- `BUYER_ASC` - Buyer name A-Z
- `BUYER_DESC` - Buyer name Z-A

**Example:**

```yaml
sort:
  type: ZAUCTIONHOUSE_HISTORY_SORT
  slot: 51
  enable-text: ' #F27438➜ %sorting%'
  disable-text: ' #76CDCD➜ %sorting%'
  sorts:
    - DATE_DESC
    - DATE_ASC
    - PRICE_DESC
    - PRICE_ASC
  sort-names:
    DATE_DESC: "Newest First"
    DATE_ASC: "Oldest First"
    PRICE_DESC: "Highest Price"
    PRICE_ASC: "Lowest Price"
  item:
    material: HOPPER
    name: "#2CCED2<bold>sᴏʀᴛ"
    lore:
      - "#92ffffAvailable sort types:"
      - "%DATE_DESC%"
      - "%DATE_ASC%"
      - "%PRICE_DESC%"
      - "%PRICE_ASC%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto change the sort type"
```

---

## Sell Inventory Buttons

These buttons are used in the sell inventory.

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSE_SELL_SHOW_ITEM`](#zauctionhouse_sell_show_item) | Displays selected items | [Sell](./sell) |
| [`ZAUCTIONHOUSE_SELL_PRICE`](#zauctionhouse_sell_price) | Adjusts listing price | [Sell](./sell) |
| [`ZAUCTIONHOUSE_SELL_ECONOMY`](#zauctionhouse_sell_economy) | Selects economy type | [Sell](./sell) |
| [`ZAUCTIONHOUSE_SELL_CONFIRM`](#zauctionhouse_sell_confirm) | Confirms the sale | [Sell](./sell) |
| [`ZAUCTIONHOUSE_SELL_CANCEL`](#zauctionhouse_sell_cancel) | Cancels the sale | [Sell](./sell) |

---

### ZAUCTIONHOUSE_SELL_SHOW_ITEM

Displays items selected for sale.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slots` | List | Slots for displaying items |
| `empty-slot` | Number | Slot for "no item" placeholder |
| `item` | Item | Placeholder when no item selected |

**Example:**

```yaml
show-item:
  type: ZAUCTIONHOUSE_SELL_SHOW_ITEM
  slots:
    - 9-44
  empty-slot: 22
  item:
    material: BARRIER
    name: "#ff0000<bold>No Item Selected"
    lore:
      - ""
      - "#8c8c8cHold an item in your hand"
      - "#8c8c8cor select items from your inventory"
```

---

### ZAUCTIONHOUSE_SELL_PRICE

Adjusts the listing price with different amounts per click type.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `amounts` | Map | Price changes per click type |
| `item` | Item | Button appearance |

**Click Types:**
- `left-click` - Regular left click
- `right-click` - Regular right click
- `shift-left-click` - Shift + left click
- `shift-right-click` - Shift + right click

**Placeholders:**
- `%price%` - Current listing price

**Example (Decrease):**

```yaml
price-decrease:
  type: ZAUCTIONHOUSE_SELL_PRICE
  slot: 48
  amounts:
    left-click: -500
    right-click: -100
    shift-left-click: -1000
    shift-right-click: -2500
  item:
    url: eyJ0ZXh0dXJlcy...
    name: "#ff3333-1,000"
    lore:
      - ""
      - "<white>Current price#8c8c8c: #2CCED2%price%"
      - ""
      - "#8c8c8c• #92ffffLeft click#8c8c8c: -500"
      - "#8c8c8c• #92ffffRight click#8c8c8c: -100"
      - "#8c8c8c• #92ffffShift+Left#8c8c8c: -1,000"
      - "#8c8c8c• #92ffffShift+Right#8c8c8c: -2,500"
```

**Example (Increase):**

```yaml
price-increase:
  type: ZAUCTIONHOUSE_SELL_PRICE
  slot: 50
  amounts:
    left-click: 500
    right-click: 100
    shift-left-click: 1000
    shift-right-click: 2500
  item:
    url: eyJ0ZXh0dXJlcy...
    name: '#00cc00+1,000'
    lore:
      - '<white>Current price#8c8c8c: #2CCED2%price%'
      - ''
      - '#8c8c8c• #92ffffLeft click#8c8c8c: +500'
      - '#8c8c8c• #92ffffRight click#8c8c8c: +100'
      - '#8c8c8c• #92ffffShift+Left#8c8c8c: +1,000'
      - '#8c8c8c• #92ffffShift+Right#8c8c8c: +2,500'
```

---

### ZAUCTIONHOUSE_SELL_ECONOMY

Cycles through available economies.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Button appearance |

**Placeholders:**
- `%economy%` - Current economy name

**Example:**

```yaml
select-economy:
  type: ZAUCTIONHOUSE_SELL_ECONOMY
  slot: 49
  item:
    url: eyJ0ZXh0dXJlcy...
    name: "#ffd700<bold>Economy"
    lore:
      - ""
      - "<white>Current#8c8c8c: #2CCED2%economy%"
      - ""
      - "#8c8c8c• #92ffffLeft click#8c8c8c: Next economy"
      - "#8c8c8c• #92ffffRight click#8c8c8c: Previous economy"
```

---

### ZAUCTIONHOUSE_SELL_CONFIRM

Confirms the sale and lists the items.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Button appearance |

**Placeholders:**
- `%economy%` - Selected economy
- `%price%` - Listing price
- `%item_count%` - Number of items

**Example:**

```yaml
confirm:
  type: ZAUCTIONHOUSE_SELL_CONFIRM
  slot: 53
  item:
    material: LIME_STAINED_GLASS_PANE
    name: "#00ff00<bold>CONFIRM SALE"
    lore:
      - ""
      - "<white>Economy#8c8c8c: #2CCED2%economy%"
      - "<white>Price#8c8c8c: #2CCED2%price%"
      - "<white>Items#8c8c8c: #2CCED2%item_count%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto confirm the sale"
```

---

### ZAUCTIONHOUSE_SELL_CANCEL

Cancels the sale and returns items to the player.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Button appearance |

**Example:**

```yaml
cancel:
  type: ZAUCTIONHOUSE_SELL_CANCEL
  slot: 45
  item:
    material: RED_STAINED_GLASS_PANE
    name: "#ff0000<bold>CANCEL"
    lore:
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto cancel and return items"
```

---

## Confirmation Buttons

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSE_CONFIRM_PURCHASE`](#zauctionhouse_confirm_purchase) | Confirms a purchase | [Purchase Confirm](./purchase-confirm) |
| [`ZAUCTIONHOUSE_CONFIRM_REMOVE_LISTED`](#zauctionhouse_confirm_remove_listed) | Confirms removing a listing | [Remove Confirm](./remove-confirm) |
| [`ZAUCTIONHOUSE_SHOW`](#zauctionhouse_show) | Displays the auction item | [Confirmations](./purchase-confirm) |

---

### ZAUCTIONHOUSE_CONFIRM_PURCHASE

Confirms the purchase of an item.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slots` | List | Button slots (larger click area) |
| `item` | Item | Button appearance |

**Example:**

```yaml
confirm:
  type: ZAUCTIONHOUSE_CONFIRM_PURCHASE
  slots:
    - 0-2
    - 9-11
    - 18-20
  item:
    material: GREEN_STAINED_GLASS_PANE
    name: "#2CCED2<bold>ᴘᴜʀᴄʜᴀsᴇ"
    lore:
      - "#92ffffPurchase this item."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto purchase"
```

---

### ZAUCTIONHOUSE_CONFIRM_REMOVE_LISTED

Confirms removing an item from sale.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slots` | List | Button slots |
| `item` | Item | Button appearance |

**Example:**

```yaml
remove:
  type: ZAUCTIONHOUSE_CONFIRM_REMOVE_LISTED
  slots:
    - 0-2
    - 9-11
    - 18-20
  item:
    material: GREEN_STAINED_GLASS_PANE
    name: "#2CCED2<bold>ʀᴇᴍᴏᴠᴇ"
    lore:
      - "#92ffffRemove this item."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto remove"
```

---

### ZAUCTIONHOUSE_SHOW

Displays the auction item being confirmed.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Display position |

**Example:**

```yaml
show:
  type: ZAUCTIONHOUSE_SHOW
  slot: 13
```

---

## Shulker Buttons

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSE_SHULKER_OPEN`](#zauctionhouse_shulker_open) | Opens shulker content viewer | [Confirmations](./purchase-confirm) |
| [`ZAUCTIONHOUSE_SHULKER_CONTENT`](#zauctionhouse_shulker_content) | Displays shulker contents | [Shulker Content](./shulker-content) |
| [`ZAUCTIONHOUSE_SHULKER_INFO`](#zauctionhouse_shulker_info) | Shows shulker information | [Shulker Content](./shulker-content) |
| [`ZAUCTIONHOUSE_SHULKER_NAVIGATION`](#zauctionhouse_shulker_navigation) | Navigates between shulkers | [Shulker Content](./shulker-content) |

---

### ZAUCTIONHOUSE_SHULKER_OPEN

Opens the shulker content preview. Only visible when the item contains shulker boxes.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Button appearance |

**Example:**

```yaml
shulker:
  type: ZAUCTIONHOUSE_SHULKER_OPEN
  slot: 4
  item:
    material: SHULKER_BOX
    name: "#2CCED2<bold>ᴠɪᴇᴡ sʜᴜʟᴋᴇʀ ᴄᴏɴᴛᴇɴᴛ"
    lore:
      - "#92ffffView the content of shulker boxes."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto view content"
```

---

### ZAUCTIONHOUSE_SHULKER_CONTENT

Displays the contents of the current shulker box.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slots` | List | Slots for displaying contents |

**Example:**

```yaml
content:
  type: ZAUCTIONHOUSE_SHULKER_CONTENT
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
```

---

### ZAUCTIONHOUSE_SHULKER_INFO

Displays information about the current shulker.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Button appearance |

**Placeholders:**
- `%shulker_current%` - Current shulker number
- `%shulker_total%` - Total shulkers

**Example:**

```yaml
shulker-info:
  type: ZAUCTIONHOUSE_SHULKER_INFO
  slot: 4
  item:
    material: SHULKER_BOX
    name: "#2CCED2<bold>sʜᴜʟᴋᴇʀ ʙᴏx"
    lore:
      - "#92ffffViewing shulker #2CCED2%shulker_current% #92ffffof #2CCED2%shulker_total%"
```

---

### ZAUCTIONHOUSE_SHULKER_NAVIGATION

Navigates between shulkers in bulk sales.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `direction` | String | `previous` or `next` |
| `item` | Item | Button appearance |

**Example:**

```yaml
previous:
  type: ZAUCTIONHOUSE_SHULKER_NAVIGATION
  direction: previous
  slot: 48
  item:
    material: ARROW
    name: "#2CCED2<bold>ᴘʀᴇᴠɪᴏᴜs sʜᴜʟᴋᴇʀ"
    lore:
      - "#92ffffView the previous shulker box."

next:
  type: ZAUCTIONHOUSE_SHULKER_NAVIGATION
  direction: next
  slot: 50
  item:
    material: ARROW
    name: "#2CCED2<bold>ɴᴇxᴛ sʜᴜʟᴋᴇʀ"
    lore:
      - "#92ffffView the next shulker box."
```

---

## Bulk Item Buttons

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSE_ITEM_CONTENT`](#zauctionhouse_item_content) | Displays all items in a bulk sale | [Purchase Inventory Confirm](./purchase-inventory-confirm), [Remove Inventory Confirm](./remove-inventory-confirm) |

---

### ZAUCTIONHOUSE_ITEM_CONTENT

Displays all items in a bulk sale. Used in confirmation inventories for bulk purchases and removals.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slots` | List | Slots for displaying items |

**Example:**

```yaml
item-content:
  type: ZAUCTIONHOUSE_ITEM_CONTENT
  slots:
    - 9-44
```

---

## Admin Buttons

### Navigation Buttons

| Type | Description | Used In |
|------|-------------|---------|
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_MAIN`](#zauctionhouse_admin_history_main) | Displays target player info | [Admin History](./admin/admin-history) |
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_EXPIRED`](#zauctionhouse_admin_history_expired) | Opens target's expired items | [Admin History](./admin/admin-history) |
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_PURCHASED`](#zauctionhouse_admin_history_purchased) | Opens target's purchased items | [Admin History](./admin/admin-history) |
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_SELLING`](#zauctionhouse_admin_history_selling) | Opens target's selling items | [Admin History](./admin/admin-history) |
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_LOGS`](#zauctionhouse_admin_history_logs) | Opens target's action logs | [Admin History](./admin/admin-history) |
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_TRANSACTIONS`](#zauctionhouse_admin_history_transactions) | Opens target's transactions | [Admin History](./admin/admin-history) |

### Item Display Buttons

| Type | Description | Used In |
|------|-------------|---------|
| `ZAUCTIONHOUSE_ADMIN_SELLING_ITEMS` | Displays target's selling items | [Admin Selling Items](./admin/admin-selling-items) |
| `ZAUCTIONHOUSE_ADMIN_EXPIRED_ITEMS` | Displays target's expired items | [Admin Expired Items](./admin/admin-expired-items) |
| `ZAUCTIONHOUSE_ADMIN_PURCHASED_ITEMS` | Displays target's purchased items | [Admin Purchased Items](./admin/admin-purchased-items) |
| `ZAUCTIONHOUSE_ADMIN_LOGS` | Displays action logs | [Admin Logs](./admin/admin-logs) |
| `ZAUCTIONHOUSE_ADMIN_TRANSACTIONS` | Displays transactions | [Admin Transactions](./admin/admin-transactions) |

### Filter Buttons

| Type | Description | Used In |
|------|-------------|---------|
| `ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_TYPE` | Filters logs by action type | [Admin Logs](./admin/admin-logs) |
| `ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_DATE` | Filters logs by date range | [Admin Logs](./admin/admin-logs) |
| `ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_STATUS` | Filters transactions by status | [Admin Transactions](./admin/admin-transactions) |
| `ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_DATE` | Filters transactions by date | [Admin Transactions](./admin/admin-transactions) |

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_MAIN

Displays target player information (player head).

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `item` | Item | Button appearance |

**Example:**

```yaml
target:
  type: ZAUCTIONHOUSE_ADMIN_HISTORY_MAIN
  slot: 13
  item:
    player-head: '%target%'
    name: '#2CCED2<bold>%target%'
```

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_EXPIRED

Opens the admin expired items inventory for the target player.

**Placeholders:**
- `%target%` - Target player name
- `%expired-items%` - Number of expired items
- `%s%` - Pluralization suffix

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_PURCHASED

Opens the admin purchased items inventory for the target player.

**Placeholders:**
- `%target%` - Target player name
- `%purchased-items%` - Number of purchased items
- `%s%` - Pluralization suffix

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_SELLING

Opens the admin selling items inventory for the target player.

**Placeholders:**
- `%target%` - Target player name
- `%selling-items%` - Number of selling items
- `%s%` - Pluralization suffix

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_LOGS

Opens the admin logs inventory for the target player.

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_TRANSACTIONS

Opens the admin transactions inventory for the target player.

---

### ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_TYPE

Cycles through log type filters.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `types` | List | Available log types to filter |
| `type-names` | Map | Display names for each type |
| `enable-text` | String | Format for selected type |
| `disable-text` | String | Format for unselected types |
| `all-types-name` | String | Display name for "all" option |

**Log Types:**
- `SALE` - Item was listed for sale
- `PURCHASE` - Item was purchased
- `REMOVE_LISTED` - Item removed from active listing
- `REMOVE_SELLING` - Item retrieved from selling inventory
- `REMOVE_EXPIRED` - Item retrieved from expired inventory
- `REMOVE_PURCHASED` - Item retrieved from purchased inventory

---

### ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_DATE

Cycles through date range filters.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `filters` | List | Available date filters |
| `filter-names` | Map | Display names for each filter |
| `enable-text` | String | Format for selected filter |
| `disable-text` | String | Format for unselected filters |

**Date Filters:**
- `ALL` - All time
- `TODAY` - Today only
- `THIS_WEEK` - Last 7 days
- `THIS_MONTH` - Last 30 days
- `THIS_YEAR` - Last 365 days

---

### ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_STATUS

Cycles through transaction status filters.

**Configuration:**

| Property | Type | Description |
|----------|------|-------------|
| `slot` | Number | Button position |
| `statuses` | List | Available statuses |
| `status-names` | Map | Display names for each status |
| `enable-text` | String | Format for selected status |
| `disable-text` | String | Format for unselected statuses |
| `all-statuses-name` | String | Display name for "all" option |

**Statuses:**
- `PENDING` - Money not yet claimed
- `RETRIEVED` - Money has been claimed

---

### ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_DATE

Cycles through date range filters for transactions.

**Configuration:**

Same as [`ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_DATE`](#zauctionhouse_admin_logs_filter_date).

---

## zMenu Built-in Buttons

These buttons are provided by zMenu and work in all inventories.

| Type | Description |
|------|-------------|
| `PREVIOUS` | Goes to the previous page |
| `NEXT` | Goes to the next page |
| `BACK` | Returns to the previous inventory |
| `inventory` | Opens another inventory |

See [zMenu documentation](https://docs.groupez.dev/zmenu) for more details.
