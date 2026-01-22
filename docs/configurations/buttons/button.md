---
sidebar_position: 1
title: Button Configuration
description: Complete reference for button configuration in zMenu
---

# Button Configuration

Buttons are the interactive elements in your inventories. This page documents all available button configuration options.

## Basic Structure

```yaml
items:
  my-button:
    slot: 0
    item:
      material: DIAMOND
      name: "&bMy Button"
    actions:
      - type: message
        messages:
          - "&aYou clicked the button!"
```

## Configuration Options

### slot

The position of the button in the inventory. Slots are numbered from 0.

```yaml
items:
  button:
    slot: 13
```

**Slot Layout (54-slot inventory):**
```
Row 1:  0  1  2  3  4  5  6  7  8
Row 2:  9 10 11 12 13 14 15 16 17
Row 3: 18 19 20 21 22 23 24 25 26
Row 4: 27 28 29 30 31 32 33 34 35
Row 5: 36 37 38 39 40 41 42 43 44
Row 6: 45 46 47 48 49 50 51 52 53
```

---

### slots

Use multiple slots for the same button.

```yaml
items:
  border:
    slots:
      - 0
      - 1
      - 2
      - 8
    item:
      material: BLACK_STAINED_GLASS_PANE
```

**Range Syntax:**
```yaml
items:
  row:
    slots:
      - 0-8      # Slots 0 through 8
      - 45-53    # Slots 45 through 53
```

---

### type

The button type determines special behavior. Default is `NONE`.

```yaml
items:
  back:
    slot: 45
    type: BACK
    item:
      material: ARROW
      name: "&c&lBack"
```

**Available Types:**

| Type | Description |
|------|-------------|
| `NONE` | Default button with no special behavior |
| `INVENTORY` | Opens another inventory |
| `BACK` | Returns to the previous inventory |
| `HOME` | Returns to the first inventory in history |
| `NEXT` | Goes to the next page |
| `PREVIOUS` | Goes to the previous page |
| `JUMP` | Jumps to a specific page |
| `MAIN_MENU` | Opens the main menu |
| `SWITCH` | Displays different items based on conditions |

See [Button Types](./types/none) for detailed documentation on each type.

---

### item

The visual appearance of the button. See [Item Configuration](../items/item) for all options.

```yaml
items:
  button:
    slot: 0
    item:
      material: DIAMOND
      name: "&b&lDiamond"
      lore:
        - "&7A shiny diamond"
```

---

### actions

Actions executed when the button is clicked.

```yaml
items:
  button:
    slot: 0
    item:
      material: EMERALD
    actions:
      - type: message
        messages:
          - "&aYou clicked!"
      - type: sound
        sound: UI_BUTTON_CLICK
```

See [Actions](./actions) for all available action types.

---

### sound

Play a sound when the button is clicked (shorthand).

```yaml
items:
  button:
    slot: 0
    sound: UI_BUTTON_CLICK
    item:
      material: DIAMOND
```

For more control, use the sound action instead:

```yaml
actions:
  - type: sound
    sound: UI_BUTTON_CLICK
    pitch: 1.5
    volume: 0.5
```

---

### messages

Send messages when clicked (shorthand).

```yaml
items:
  button:
    slot: 0
    messages:
      - "&aHello!"
      - "&7Welcome to the server."
    item:
      material: BOOK
```

---

### close-inventory

Close the inventory when the button is clicked.

```yaml
items:
  close:
    slot: 49
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lClose"
```

---

### refresh-on-click

Refresh the entire inventory after clicking.

```yaml
items:
  refresh:
    slot: 0
    refresh-on-click: true
    item:
      material: COMPASS
      name: "&e&lRefresh"
```

---

### update-on-click

Update only this button after clicking.

```yaml
items:
  toggle:
    slot: 0
    update-on-click: true
    item:
      material: LEVER
      name: "&e&lToggle"
```

---

### is-permanent

Display this button on all pages of a paginated inventory.

```yaml
items:
  navigation:
    slot: 49
    is-permanent: true
    item:
      material: ARROW
      name: "&7Navigation"
```

---

### page

Display button only on a specific page.

```yaml
items:
  page1-only:
    slot: 0
    page: 1
    item:
      material: DIAMOND
      name: "&bPage 1 Item"
```

**Range format:**
```yaml
items:
  pages-1-to-3:
    slot: 0
    page: 1-3
    item:
      material: EMERALD
      name: "&aPages 1-3"
```

---

### else

Define an alternative button when a view requirement isn't met.

```yaml
items:
  vip-button:
    slot: 0
    view-requirement:
      requirements:
        - type: permission
          permission: "vip.access"
    item:
      material: DIAMOND_BLOCK
      name: "&b&lVIP Content"
    else:
      item:
        material: COAL_BLOCK
        name: "&7&lLocked"
        lore:
          - "&cRequires VIP rank"
```

---

### open-link

Open a URL or prompt the player to join a Discord server.

```yaml
items:
  discord:
    slot: 0
    open-link: "https://discord.gg/myserver"
    item:
      material: PLAYER_HEAD
      url: "discord_head_texture"
      name: "&9&lDiscord"
      lore:
        - "&7Click to join our Discord!"
```

---

### player-head

Display the current player's head.

```yaml
items:
  profile:
    slot: 0
    player-head: "%player%"
    item:
      material: PLAYER_HEAD
      name: "&a&l%player%"
```

---

## Requirements

### view-requirement

Control whether the button is visible.

```yaml
items:
  vip-only:
    slot: 0
    view-requirement:
      requirements:
        - type: permission
          permission: "server.vip"
    item:
      material: DIAMOND
      name: "&b&lVIP Item"
```

If requirements aren't met, the button won't be displayed.

---

### click-requirement

Control whether the button can be clicked. The button is still visible, but clicking may be denied.

```yaml
items:
  purchase:
    slot: 0
    click-requirement:
      requirements:
        - type: placeholder
          value: "%vault_eco_balance%"
          compare: ">="
          number: 100
          deny:
            - type: message
              messages:
                - "&cYou need $100 to purchase this!"
            - type: sound
              sound: ENTITY_VILLAGER_NO
      success:
        - type: message
          messages:
            - "&aPurchase successful!"
        - type: console-command
          commands:
            - "eco take %player% 100"
    item:
      material: GOLD_INGOT
      name: "&e&lPurchase - $100"
```

### Requirement Types

| Type | Description |
|------|-------------|
| `permission` | Check if player has a permission |
| `placeholder` | Compare a placeholder value |
| `currency` | Check player's balance |
| `item` | Check if player has items |
| `job` | Check Jobs Reborn level |
| `luckperm` | Check LuckPerms group |
| `regex` | Match text against a pattern |
| `player-name` | Check player's name |

**Permission Requirement:**
```yaml
requirements:
  - type: permission
    permission: "server.admin"
```

**Placeholder Requirement:**
```yaml
requirements:
  - type: placeholder
    value: "%player_level%"
    compare: ">="
    number: 10
```

**Comparison operators:** `==`, `!=`, `>=`, `>`, `<=`, `<`, `equals_string`, `equalsIgnoreCase`

**Currency Requirement:**
```yaml
requirements:
  - type: currency
    amount: 1000
```

**Item Requirement:**
```yaml
requirements:
  - type: item
    item:
      material: DIAMOND
      amount: 5
```

---

## Click Types

You can specify different actions for different click types:

```yaml
items:
  multi-click:
    slot: 0
    item:
      material: CHEST
      name: "&e&lMulti-Action Button"
      lore:
        - "&7Left-click: Open shop"
        - "&7Right-click: View balance"
        - "&7Shift-click: Help"
    clicks:
      LEFT:
        actions:
          - type: inventory
            inventory: "shop"
      RIGHT:
        actions:
          - type: message
            messages:
              - "&7Your balance: &a$%vault_eco_balance%"
      SHIFT_LEFT:
        actions:
          - type: message
            messages:
              - "&eThis is a multi-action button!"
```

**Available Click Types:**
- `LEFT` - Left click
- `RIGHT` - Right click
- `SHIFT_LEFT` - Shift + left click
- `SHIFT_RIGHT` - Shift + right click
- `MIDDLE` - Middle click (scroll wheel)
- `DROP` - Press Q to drop
- `CONTROL_DROP` - Ctrl + Q

---

## Complete Example

```yaml
items:
  shop-item:
    slot: 13
    type: NONE

    item:
      material: DIAMOND_SWORD
      name: "&6&lDiamond Sword"
      lore:
        - "&8&m─────────────────"
        - ""
        - "&7A powerful sword!"
        - ""
        - "&7Price: &a$500"
        - "&7Your balance: &e$%vault_eco_balance%"
        - ""
        - "&8&m─────────────────"
        - ""
        - "&e▸ Click to purchase"
      enchantments:
        - type: SHARPNESS
          level: 5
      flags:
        - HIDE_ENCHANTS
      glow: true

    click-requirement:
      requirements:
        - type: placeholder
          value: "%vault_eco_balance%"
          compare: ">="
          number: 500
          deny:
            - type: message
              messages:
                - "&cYou need $500 to buy this!"
            - type: sound
              sound: ENTITY_VILLAGER_NO
      success:
        - type: console-command
          commands:
            - "eco take %player% 500"
            - "give %player% diamond_sword{Enchantments:[{id:sharpness,lvl:5}]} 1"
        - type: message
          messages:
            - "&aPurchase successful!"
            - "&7You bought a &6Diamond Sword&7!"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
        - type: close
```

## Best Practices

1. **Use meaningful button names** for easier maintenance
2. **Group related buttons** using descriptive naming conventions
3. **Provide feedback** with sounds and messages
4. **Use requirements** to control access appropriately
5. **Use `else`** to show locked/unavailable states
6. **Add lore hints** to explain what buttons do

## Next Steps

- Learn about each [Button Type](./types/none)
- Explore all available [Actions](./actions)
- Create [Patterns](../patterns) for reusable buttons
