---
sidebar_position: 2
title: Creating an Inventory
description: Step-by-step guide to creating your first zMenu inventory
---

# Creating an Inventory

This guide will walk you through creating your first zMenu inventory from scratch.

## Step 1: Create the File

Create a new file in the `plugins/zMenu/inventories/` folder. Name it something descriptive like `my_first_menu.yml`.

```
plugins/zMenu/inventories/my_first_menu.yml
```

:::tip Naming Convention
Use lowercase letters, numbers, and underscores for file names. Avoid spaces and special characters.
:::

## Step 2: Define Basic Properties

Start with the essential inventory properties:

```yaml
# The title shown at the top of the inventory
name: "&6&lMy First Menu"

# The size of the inventory (must be 9, 18, 27, 36, 45, or 54)
size: 27

# Whether this inventory is enabled
enable: true
```

## Step 3: Add a Fill Item (Optional)

Fill empty slots with a decorative item:

```yaml
name: "&6&lMy First Menu"
size: 27
enable: true

fillItem:
  material: GRAY_STAINED_GLASS_PANE
  name: "&8"
```

This makes your inventory look cleaner by filling empty spaces.

## Step 4: Add Your First Button

Now let's add an interactive button. Buttons are defined in the `items` section:

```yaml
name: "&6&lMy First Menu"
size: 27
enable: true

fillItem:
  material: GRAY_STAINED_GLASS_PANE
  name: "&8"

items:
  welcome-button:
    slot: 13
    item:
      material: DIAMOND
      name: "&b&lWelcome!"
      lore:
        - "&7Click me to see a message"
    actions:
      - type: message
        messages:
          - "&aHello, %player%!"
          - "&7Thanks for using zMenu!"
```

Let's break down what each part does:

| Property | Description |
|----------|-------------|
| `welcome_button` | A unique name for this button |
| `slot: 13` | Position in the inventory (center of row 2) |
| `item` | The visual appearance of the button |
| `material` | The Minecraft item type |
| `name` | The item's display name |
| `lore` | Description lines below the name |
| `actions` | What happens when clicked |

## Step 5: Test Your Inventory

1. Save the file
2. Run `/zm reload inventory my_first_menu`
3. Open it with `/zm open my_first_menu`

You should see a 27-slot inventory with a diamond in the center!

## Step 6: Add More Buttons

Let's expand the menu with more functionality:

```yaml
name: "&6&lMy First Menu"
size: 27
enable: true

fillItem:
  material: GRAY_STAINED_GLASS_PANE
  name: "&8"

items:
  # Title item (non-interactive)
  title:
    slot: 4
    item:
      material: BOOK
      name: "&6&lServer Guide"
      lore:
        - "&7Welcome to our server!"
        - ""
        - "&7Select an option below."

  # Teleport to spawn
  spawn:
    slot: 11
    item:
      material: RED_BED
      name: "&c&lSpawn"
      lore:
        - "&7Teleport to spawn point"
        - ""
        - "&eClick to teleport!"
    actions:
      - type: close
      - type: player-command
        commands:
          - "spawn"

  # View player info
  info:
    slot: 13
    item:
      material: PLAYER_HEAD
      playerHead: "%player%"
      name: "&a&l%player%"
      lore:
        - "&8&m─────────────"
        - ""
        - "&7Health: &c%player_health%"
        - "&7Level: &a%player_level%"
        - ""
        - "&8&m─────────────"

  # Open shop
  shop:
    slot: 15
    item:
      material: GOLD_INGOT
      name: "&e&lShop"
      lore:
        - "&7Browse our shop"
        - ""
        - "&eClick to open!"
    actions:
      - type: inventory
        inventory: "shop"

  # Close button
  close:
    slot: 22
    item:
      material: BARRIER
      name: "&c&lClose"
      lore:
        - "&7Close this menu"
    actions:
      - type: close
```

## Step 7: Add Sound Effects

Make the menu more interactive with sounds:

```yaml
items:
  spawn:
    slot: 11
    item:
      material: RED_BED
      name: "&c&lSpawn"
    sound: ENTITY_ENDERMAN_TELEPORT
    actions:
      - type: close
      - type: player-command
        commands:
          - "spawn"
```

Or add a sound in the actions:

```yaml
actions:
  - type: sound
    sound: UI_BUTTON_CLICK
    pitch: 1.2
    volume: 0.5
  - type: player-command
    commands:
      - "spawn"
```

## Step 8: Add Requirements (Optional)

Restrict who can click a button:

```yaml
items:
  vip-area:
    slot: 16
    item:
      material: DIAMOND_BLOCK
      name: "&b&lVIP Area"
      lore:
        - "&7Exclusive VIP teleport"
    click-requirement:
      requirements:
        - type: permission
          permission: "server.vip"
          deny:
            - type: message
              messages:
                - "&cYou need VIP rank to use this!"
            - type: sound
              sound: ENTITY_VILLAGER_NO
      success:
        - type: player-command
          commands:
            - "warp vip"
```

## Understanding Slot Numbers

Slots are numbered from 0 to (size - 1), starting from the top-left:

```
Row 1:  0  1  2  3  4  5  6  7  8
Row 2:  9 10 11 12 13 14 15 16 17
Row 3: 18 19 20 21 22 23 24 25 26
Row 4: 27 28 29 30 31 32 33 34 35
Row 5: 36 37 38 39 40 41 42 43 44
Row 6: 45 46 47 48 49 50 51 52 53
```

For a 27-slot inventory (3 rows), slots 0-26 are available.

## Using Multiple Slots

A button can occupy multiple slots:

```yaml
items:
  big-button:
    slots:
      - 11
      - 12
      - 13
      - 20
      - 21
      - 22
    item:
      material: EMERALD_BLOCK
      name: "&a&lBig Button"
```

Or use a range:

```yaml
items:
  row-button:
    slots:
      - 10-16  # Slots 10 through 16
    item:
      material: GOLD_BLOCK
      name: "&e&lGold Row"
```

## Complete Example

Here's a complete, functional menu:

```yaml
name: "&6&lServer Menu"
size: 45
enable: true

fillItem:
  material: BLACK_STAINED_GLASS_PANE
  name: "&8"

openActions:
  - type: sound
    sound: BLOCK_CHEST_OPEN
    pitch: 1.0

items:
  # Decorative top border
  top-border:
    slots:
      - 0-8
    item:
      material: BLUE_STAINED_GLASS_PANE
      name: "&8"

  # Title
  title:
    slot: 4
    item:
      material: NETHER_STAR
      name: "&6&l✦ Server Menu ✦"
      lore:
        - ""
        - "&7Welcome, &f%player%"
        - ""
        - "&7Choose an option below"
      glow: true

  # Spawn teleport
  spawn:
    slot: 19
    item:
      material: RED_BED
      name: "&c&lSpawn"
      lore:
        - "&7Return to spawn"
        - ""
        - "&e▸ Click to teleport"
    sound: UI_BUTTON_CLICK
    actions:
      - type: close
      - type: player-command
        commands:
          - "spawn"
      - type: message
        messages:
          - "&aTeleporting to spawn..."

  # Warps menu
  warps:
    slot: 21
    item:
      material: ENDER_PEARL
      name: "&5&lWarps"
      lore:
        - "&7Browse warp locations"
        - ""
        - "&e▸ Click to open"
    sound: UI_BUTTON_CLICK
    actions:
      - type: inventory
        inventory: "warps"

  # Player info
  profile:
    slot: 23
    item:
      material: PLAYER_HEAD
      playerHead: "%player%"
      name: "&a&lYour Profile"
      lore:
        - "&8&m────────────────"
        - ""
        - "&7Name: &f%player%"
        - "&7Balance: &6$%vault_eco_balance%"
        - "&7Playtime: &e%zmenu_statistic_time_played%"
        - ""
        - "&8&m────────────────"

  # Settings
  settings:
    slot: 25
    item:
      material: COMPARATOR
      name: "&e&lSettings"
      lore:
        - "&7Configure preferences"
        - ""
        - "&e▸ Click to open"
    sound: UI_BUTTON_CLICK
    actions:
      - type: inventory
        inventory: "settings"

  # Bottom border
  bottom-border:
    slots:
      - 36-44
    item:
      material: BLUE_STAINED_GLASS_PANE
      name: "&8"

  # Close button
  close:
    slot: 40
    item:
      material: BARRIER
      name: "&c&lClose Menu"
      lore:
        - "&7Close this menu"
    sound: UI_BUTTON_CLICK
    actions:
      - type: close
```

## Tips for Good Menu Design

1. **Use consistent styling** - Keep colors and formatting similar across your menus
2. **Add visual borders** - Use glass panes or other items to frame your content
3. **Provide feedback** - Use sounds and messages to confirm actions
4. **Group related items** - Place similar options near each other
5. **Include navigation** - Always provide a way to go back or close
6. **Use clear icons** - Choose materials that visually represent their function
7. **Keep lore concise** - Don't overload buttons with too much text

## Next Steps

Now that you can create basic inventories:

- Learn about all [Button Options](../buttons/button)
- Explore different [Button Types](../buttons/types/none)
- Add complex [Actions](../buttons/actions) to your buttons
- Create [Patterns](../patterns) for reusable elements
