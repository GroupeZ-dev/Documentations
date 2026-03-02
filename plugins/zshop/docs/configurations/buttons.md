---
sidebar_position: 5
title: Button Types
description: All zShop button types for inventory configuration
---

# Button Types

zShop adds several custom button types to zMenu for shop functionality.

## ZSHOP_ITEM

The main shop item button for buying and selling items.

```yaml
items:
  diamond:
    type: ZSHOP_ITEM
    slot: 10
    item:
      material: DIAMOND
    buyPrice: 100.0
    sellPrice: 50.0
```

**Click Actions:**
- **Left-click**: Open buy menu
- **Right-click**: Open sell menu
- **Middle-click / Drop key**: Sell all of this item

See [Shop Items](./items) for full documentation.

---

## ZSHOP_SHOW

Displays the currently selected item in buy/sell menus.

```yaml
items:
  show_item:
    type: ZSHOP_SHOW
    slot: 22
    item:
      material: BARRIER
      name: "&cError"
      lore:
        - "&cItem not found"
    lore:
      - ""
      - "&7Buying price: &e%buyPrice%"
```

The `item` section is a fallback shown only if there's an error.

---

## ZSHOP_SHOW_CONFIRM

Displays the item in confirmation dialogs.

```yaml
items:
  confirm_item:
    type: ZSHOP_SHOW_CONFIRM
    slot: 22
    item:
      material: BARRIER
      name: "&cError"
```

---

## ZSHOP_CONFIRM_BUY

Confirms a purchase in the confirmation menu.

```yaml
items:
  confirm_buy:
    type: ZSHOP_CONFIRM_BUY
    slot: 50
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&aConfirm Purchase"
      lore:
        - ""
        - "&7Click to confirm your purchase"
```

---

## ZSHOP_CONFIRM_SELL

Confirms a sale in the confirmation menu.

```yaml
items:
  confirm_sell:
    type: ZSHOP_CONFIRM_SELL
    slot: 50
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&aConfirm Sale"
      lore:
        - ""
        - "&7Click to confirm your sale"
```

---

## ZSHOP_ADD

Adds items to the purchase/sale amount.

```yaml
items:
  add_1:
    type: ZSHOP_ADD
    slot: 28
    amount: 1
    item:
      material: GREEN_STAINED_GLASS_PANE
      name: "&a+1"

  add_10:
    type: ZSHOP_ADD
    slot: 29
    amount: 10
    item:
      material: GREEN_STAINED_GLASS_PANE
      name: "&a+10"

  add_64:
    type: ZSHOP_ADD
    slot: 30
    amount: 64
    item:
      material: GREEN_STAINED_GLASS_PANE
      name: "&a+64"
```

**Parameters:**
- `amount`: Number of items to add

---

## ZSHOP_REMOVE

Removes items from the purchase/sale amount.

```yaml
items:
  remove_1:
    type: ZSHOP_REMOVE
    slot: 34
    amount: 1
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&c-1"

  remove_10:
    type: ZSHOP_REMOVE
    slot: 33
    amount: 10
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&c-10"

  remove_64:
    type: ZSHOP_REMOVE
    slot: 32
    amount: 64
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&c-64"
```

**Parameters:**
- `amount`: Number of items to remove

---

## ZSHOP_BUY_MORE

Quick buy buttons for purchasing specific amounts.

```yaml
items:
  buy_1:
    type: ZSHOP_BUY_MORE
    slot: 10
    amount: 1
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&aBuy x1"
      lore:
        - ""
        - "&7Price: &e%buyPrice%"

  buy_16:
    type: ZSHOP_BUY_MORE
    slot: 11
    amount: 16
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&aBuy x16"
      lore:
        - ""
        - "&7Price: &e%buyPrice%"

  buy_64:
    type: ZSHOP_BUY_MORE
    slot: 12
    amount: 64
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&aBuy x64"
      lore:
        - ""
        - "&7Price: &e%buyPrice%"
```

**Parameters:**
- `amount`: Number of items to purchase

---

## Standard zMenu Buttons

You can also use all standard zMenu button types:

| Type | Description |
|------|-------------|
| `NONE` | Static display item |
| `INVENTORY` | Open another inventory |
| `BACK` | Return to previous menu |
| `HOME` | Return to main menu |
| `NEXT` | Next page |
| `PREVIOUS` | Previous page |

See [zMenu Button Documentation](https://docs.zmenu.dev/configurations/buttons).

---

## Complete Buy Menu Example

```yaml
# inventories/shop_buy.yml

name: "&7Purchase"
size: 54

patterns:
  - "zshop_decoration"
  - "zshop_back"

items:
  # Display item
  show_item:
    type: ZSHOP_SHOW
    slot: 22
    item:
      material: BARRIER
      name: "&cError"
    lore:
      - ""
      - "&7Price: &e%buyPrice%"

  # Add buttons
  add_1:
    type: ZSHOP_ADD
    slot: 28
    amount: 1
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&a+1"

  add_10:
    type: ZSHOP_ADD
    slot: 29
    amount: 10
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&a+10"

  add_64:
    type: ZSHOP_ADD
    slot: 30
    amount: 64
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&a+64"

  # Remove buttons
  remove_1:
    type: ZSHOP_REMOVE
    slot: 34
    amount: 1
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&c-1"

  remove_10:
    type: ZSHOP_REMOVE
    slot: 33
    amount: 10
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&c-10"

  remove_64:
    type: ZSHOP_REMOVE
    slot: 32
    amount: 64
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&c-64"

  # Confirm button
  confirm:
    type: ZSHOP_CONFIRM_BUY
    slot: 49
    item:
      material: EMERALD_BLOCK
      name: "&a&lConfirm Purchase"
      lore:
        - ""
        - "&7Click to buy!"

  # Buy more options
  buy_more:
    type: INVENTORY
    inventory: "buy_more"
    plugin: "zShop"
    slot: 50
    item:
      material: CHEST
      name: "&eBuy More Options"
```

---

## Complete Sell Menu Example

```yaml
# inventories/shop_sell.yml

name: "&7Sell"
size: 54

patterns:
  - "zshop_decoration"
  - "zshop_back"

items:
  show_item:
    type: ZSHOP_SHOW
    slot: 22
    item:
      material: BARRIER
      name: "&cError"
    lore:
      - ""
      - "&7Sell Price: &e%sellPrice%"

  add_1:
    type: ZSHOP_ADD
    slot: 28
    amount: 1
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&a+1"

  add_all:
    type: ZSHOP_ADD
    slot: 31
    amount: 9999  # Adds all available
    item:
      material: HOPPER
      name: "&aSell All"

  remove_1:
    type: ZSHOP_REMOVE
    slot: 34
    amount: 1
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&c-1"

  confirm:
    type: ZSHOP_CONFIRM_SELL
    slot: 49
    item:
      material: GOLD_BLOCK
      name: "&6&lConfirm Sale"
      lore:
        - ""
        - "&7Click to sell!"
```

---

## Confirmation Menu Example

```yaml
# inventories/confirm.yml

name: "&7Confirm Purchase"
size: 54

patterns:
  - "zshop_decoration"
  - "zshop_back"

items:
  show_item:
    type: ZSHOP_SHOW_CONFIRM
    slot: 22
    item:
      material: BARRIER
      name: "&cError"

  confirm:
    type: ZSHOP_CONFIRM_BUY
    slot: 50
    item:
      material: LIME_CONCRETE
      name: "&a&lConfirm"
      lore:
        - ""
        - "&7Click to complete purchase"

  cancel:
    type: BACK
    slot: 48
    item:
      material: RED_CONCRETE
      name: "&c&lCancel"
      lore:
        - ""
        - "&7Click to go back"
```
