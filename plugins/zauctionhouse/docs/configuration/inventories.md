---
sidebar_position: 6
title: Inventories
description: Customize auction house interfaces in zAuctionHouse V4
---

# Inventories Configuration

All auction house interfaces are customizable using [zMenu](https://docs.groupez.dev/zmenu). The inventory files are located in `plugins/zAuctionHouse/inventories/`.

## Available Inventories

### Main Inventories

| File | Description |
|------|-------------|
| `auction.yml` | Main auction house interface |
| `categories.yml` | Category selection menu |
| `expired-items.yml` | Player's expired items |
| `purchased-items.yml` | Items purchased to claim |
| `selling-items.yml` | Player's active listings |
| `history.yml` | Sales history |
| `sell-inventory.yml` | Item selection for selling |
| `shulker-content.yml` | Bulk sale contents viewer |

### Confirmation Inventories

| File | Description |
|------|-------------|
| `confirms/purchase-confirm.yml` | Purchase confirmation |
| `confirms/purchase-inventory-confirm.yml` | Bulk purchase confirmation |
| `confirms/remove-confirm.yml` | Remove confirmation |
| `confirms/remove-inventory-confirm.yml` | Bulk remove confirmation |

### Admin Inventories

| File | Description |
|------|-------------|
| `admin/admin-selling-items.yml` | View player's listings |
| `admin/admin-expired-items.yml` | View player's expired items |
| `admin/admin-purchased-items.yml` | View player's purchases |
| `admin/admin-transactions.yml` | View transactions |
| `admin/admin-history-main.yml` | Admin history overview |
| `admin/admin-logs.yml` | Audit logs |

### Pattern Files

| File | Description |
|------|-------------|
| `patterns/back.yml` | Back button template |
| `patterns/decoration.yml` | Glass border decoration |
| `patterns/pagination.yml` | Page navigation template |

## Main Auction Interface

Example `auction.yml`:

```yaml
# Title with placeholders
name: "%zauctionhouse_category_name% (%page%/%max-page%)"

# 6 rows
size: 54

# Apply reusable patterns
patterns:
  - 'zauctionhouse-decoration'

items:
  # Main item display area
  displayItems:
    type: ZAUCTIONHOUSE_LISTED_ITEMS
    empty-slot: 22
    slots:
      - 9-17    # Row 2
      - 18-26   # Row 3
      - 27-35   # Row 4
      - 36-44   # Row 5
    item:
      material: BARRIER
      name: '#ff0000&nNo items found'

  # Categories button
  categories:
    slot: 4
    type: inventory
    plugin: "zAuctionHouse"
    inventory: "categories"
    is-permanent: true
    item:
      material: CHEST
      name: "#2CCED2<bold>ᴄᴀᴛᴇɢᴏʀɪᴇs"
      lore:
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"

  # Expired items button
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

  # Purchased items button
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

  # Your items button
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

  # Pagination
  previous:
    is-permanent: true
    type: PREVIOUS
    slot: 48
    item:
      url: "eyJ0ZXh0dXJlcy..."
      name: "#2CCED2<bold>ᴘʀᴇᴠɪᴏᴜs ᴘᴀɢᴇ"
    else:
      item:
        material: LIGHT_BLUE_STAINED_GLASS_PANE
        name: "<white>"

  next:
    is-permanent: true
    type: NEXT
    slot: 50
    item:
      url: "eyJ0ZXh0dXJlcy..."
      name: "#2CCED2<bold>ɴᴇxᴛ ᴘᴀɢᴇ"
    else:
      item:
        material: LIGHT_BLUE_STAINED_GLASS_PANE
        name: "<white>"

  # Info/refresh button
  informations:
    slot: 49
    is-permanent: true
    item:
      material: BELL
      name: "#2CCED2<bold>ᴀᴜᴄᴛɪᴏɴ ɪɴғᴏʀᴍᴀᴛɪᴏɴ"
      lore:
        - "#92ffffWelcome to the auction house."
        - "#92ffffUsage#8c8c8c:"
        - "#2CCED2/ah sell #92ffff<price> [<amount>]"
        - ""
        - "#92ffffNumber of items#8c8c8c: #2CCED2%zauctionhouse_listed_items%"
        - "#92ffffSort type#8c8c8c: #2CCED2%zauctionhouse_sorting_name%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto refresh the items"

  # Sort button
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

## zAuctionHouse Button Types

### Display Buttons

| Type | Description |
|------|-------------|
| `ZAUCTIONHOUSE_LISTED_ITEMS` | Display auction items with pagination |
| `ZAUCTIONHOUSE_CATEGORY` | Category selector button |
| `ZAUCTIONHOUSE_CHANGE_SORT` | Sort type cycling button |

### Inventory Navigation Buttons

| Type | Description |
|------|-------------|
| `ZAUCTIONHOUSE_EXPIRED_INVENTORY` | Opens expired items (with conditional display) |
| `ZAUCTIONHOUSE_PURCHASED_INVENTORY` | Opens purchased items (with conditional display) |
| `ZAUCTIONHOUSE_SELLING_INVENTORY` | Opens selling items (with conditional display) |

### Item Action Buttons

| Type | Description |
|------|-------------|
| `ZAUCTIONHOUSE_PURCHASE_CONFIRM` | Confirm purchase button |
| `ZAUCTIONHOUSE_REMOVE_CONFIRM` | Confirm removal button |
| `ZAUCTIONHOUSE_CLAIM_ITEM` | Claim single item |
| `ZAUCTIONHOUSE_CLAIM_ALL` | Claim all items |

## Category Inventory

Example `categories.yml`:

```yaml
name: "#0c1719Categories"
size: 27

items:
  # All category
  all:
    slot: 10
    type: ZAUCTIONHOUSE_CATEGORY
    category: all
    item:
      material: NETHER_STAR
      name: "#2CCED2All Items"

  # Weapons category
  weapons:
    slot: 11
    type: ZAUCTIONHOUSE_CATEGORY
    category: weapons
    item:
      material: DIAMOND_SWORD
      name: "#2CCED2Weapons"

  # Armor category
  armor:
    slot: 12
    type: ZAUCTIONHOUSE_CATEGORY
    category: armor
    item:
      material: DIAMOND_CHESTPLATE
      name: "#2CCED2Armor"

  # Tools category
  tools:
    slot: 13
    type: ZAUCTIONHOUSE_CATEGORY
    category: tools
    item:
      material: DIAMOND_PICKAXE
      name: "#2CCED2Tools"

  # Blocks category
  blocks:
    slot: 14
    type: ZAUCTIONHOUSE_CATEGORY
    category: blocks
    item:
      material: GRASS_BLOCK
      name: "#2CCED2Blocks"

  # Misc category
  misc:
    slot: 15
    type: ZAUCTIONHOUSE_CATEGORY
    category: misc
    item:
      material: CHEST
      name: "#2CCED2Miscellaneous"

  # Back button
  back:
    slot: 22
    type: BACK
    item:
      material: ARROW
      name: "#2CCED2Back"
```

## Patterns

Use zMenu patterns for reusable elements.

### Decoration Pattern

`patterns/decoration.yml`:
```yaml
name: zauctionhouse-decoration
size: 54

items:
  top-border:
    slots: 0-8
    item:
      material: LIGHT_BLUE_STAINED_GLASS_PANE
      name: "<white>"

  bottom-border:
    slots: 45-53
    item:
      material: LIGHT_BLUE_STAINED_GLASS_PANE
      name: "<white>"
```

### Using Patterns

```yaml
name: "My Inventory"
size: 54
patterns:
  - 'zauctionhouse-decoration'

items:
  # Your items here (override pattern slots as needed)
```

## Inventory Placeholders

Available in inventory files:

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Current page number |
| `%max-page%` | Total pages |
| `%zauctionhouse_category_name%` | Current category |
| `%zauctionhouse_listed_items%` | Total listed items |
| `%zauctionhouse_sorting_name%` | Current sort name |
| `%expired-items%` | Player's expired item count |
| `%purchased-items%` | Player's purchased item count |
| `%selling-items%` | Player's selling item count |
| `%s%` | Pluralization suffix |

## Conditional Display

Show buttons only when relevant:

```yaml
expired-items:
  type: ZAUCTIONHOUSE_EXPIRED_INVENTORY
  slot: 45
  # Shows when player has expired items
  item:
    material: CLOCK
    name: "#2CCED2Expired Items"
    lore:
      - "You have %expired-items% items"
  # Shows when no expired items
  else:
    item:
      material: CLOCK
      name: "#2CCED2Expired Items"
      lore:
        - "#ff3535You have no expired items"
```

## Custom Player Heads

Use Base64 textures for custom heads:

```yaml
item:
  url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjllYTFkODYyNDdmNGFmMzUxZWQxODY2YmNhNmEzMDQwYTA2YzY4MTc3Yzc4ZTQyMzE2YTEwOThlNjBmYjdkMyJ9fX0="
  name: "#2CCED2Arrow Button"
```

## Reloading

After modifying inventory files:

```bash
/ah reload
```

Changes take effect immediately for new inventory opens.

## Tips

### Dynamic Item Count

```yaml
item:
  material: CLOCK
  name: "&cExpired (%expired-items%)"
```

### Loading State

For sort buttons, show loading state:

```yaml
loading-item:
  material: HOPPER
  name: "#2CCED2Loading..."
  lore:
    - "Please wait"
```

### Localization

Create localized inventories in `_fr/` folder for French translations:
```
inventories/
├── auction.yml
└── _fr/
    └── auction.yml
```
