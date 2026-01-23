---
sidebar_position: 3
title: Actions
description: Complete reference for all action types in zMenu
---

# Actions

Actions are commands executed when a player interacts with a button. zMenu provides 28+ action types for various purposes.

## Basic Usage

```yaml
items:
  my-button:
    slot: 0
    item:
      material: DIAMOND
    actions:
      - type: message
        messages:
          - "&aHello, %player%!"
      - type: sound
        sound: UI_BUTTON_CLICK
```

## Message Actions

### message

Send a message to the player.

```yaml
- type: message
  messages:
    - "&aLine 1"
    - "&bLine 2"
  minimessage: true  # Optional: Use MiniMessage format
```

---

### messages

Alias for `message`.

```yaml
- type: messages
  messages:
    - "&aMultiple lines"
    - "&bOf text"
```

---

### message-to

Send a message to a specific player.

```yaml
- type: message-to
  player: "Notch"
  messages:
    - "&aHello from %player%!"
```

---

### broadcast

Send a message to all online players.

```yaml
- type: broadcast
  messages:
    - "&6[Announcement] &f%player% purchased a special item!"
```

---

### action-bar

Display an action bar message.

```yaml
- type: action-bar
  message: "&aWelcome to the shop!"
```

---

### title

Display a title and subtitle.

```yaml
- type: title
  title: "&6&lWelcome!"
  subtitle: "&7Enjoy your stay"
  fadeIn: 20      # Ticks
  stay: 60        # Ticks
  fadeOut: 20     # Ticks
```

---

### toast

Display a toast notification (achievement popup).

```yaml
- type: toast
  icon: DIAMOND
  message: "&aAchievement Unlocked!"
  frame: TASK  # TASK, GOAL, or CHALLENGE
```

## Sound Actions

### sound

Play a sound to the player.

```yaml
- type: sound
  sound: ENTITY_EXPERIENCE_ORB_PICKUP
  pitch: 1.0    # 0.5 to 2.0
  volume: 1.0   # Distance
  category: MASTER  # Optional sound category
```

**Common Sounds:**
- `UI_BUTTON_CLICK`
- `ENTITY_EXPERIENCE_ORB_PICKUP`
- `ENTITY_PLAYER_LEVELUP`
- `ENTITY_VILLAGER_YES`
- `ENTITY_VILLAGER_NO`
- `BLOCK_NOTE_BLOCK_PLING`
- `BLOCK_CHEST_OPEN`
- `BLOCK_CHEST_CLOSE`

---

### broadcast-sound

Play a sound to all online players.

```yaml
- type: broadcast-sound
  sound: ENTITY_ENDER_DRAGON_DEATH
  pitch: 1.0
  volume: 1.0
```

## Command Actions

### player-command

Execute a command as the player.

```yaml
- type: player-command
  commands:
    - "spawn"
    - "kit starter"
```

---

### player-command-as-op

Execute a command as the player with OP permissions.

```yaml
- type: player-command-as-op
  commands:
    - "gamemode creative"
```

:::warning
Use with caution! This gives the player temporary OP-level access.
:::

---

### console-command

Execute a command from the console.

```yaml
- type: console-command
  commands:
    - "give %player% diamond 64"
    - "eco give %player% 1000"
```

---

### player-chat

Force the player to send a chat message.

```yaml
- type: player-chat
  messages:
    - "Hello everyone!"
```

## Inventory Actions

### inventory

Open another inventory.

```yaml
- type: inventory
  inventory: "shop"
  page: 1          # Optional: specific page
  arguments:       # Optional: pass arguments
    - "arg1"
```

---

### close

Close the current inventory.

```yaml
- type: close
```

---

### back

Go back to the previous inventory.

```yaml
- type: back
```

---

### refresh

Refresh the current button.

```yaml
- type: refresh
```

---

### refresh-inventory

Refresh the entire inventory (redraw all buttons).

```yaml
- type: refresh-inventory
```

## Player Actions

### teleport

Teleport the player to coordinates.

```yaml
- type: teleport
  world: "world"
  x: 0
  y: 100
  z: 0
  yaw: 0       # Optional
  pitch: 0     # Optional
```

---

### connect

Connect the player to another server (BungeeCord/Velocity).

```yaml
- type: connect
  server: "lobby"
```

## Data Actions

### data

Modify player data values.

```yaml
- type: data
  action: SET       # SET, ADD, SUBTRACT, MULTIPLY, DIVIDE, REMOVE
  key: "coins"
  value: "100"
  math: true        # Optional: enable math expressions
```

**Actions:**

| Action | Description | Example |
|--------|-------------|---------|
| `SET` | Set to specific value | `value: "100"` |
| `ADD` | Add to current value | `value: "50"` |
| `SUBTRACT` | Subtract from current | `value: "25"` |
| `MULTIPLY` | Multiply current value | `value: "2"` |
| `DIVIDE` | Divide current value | `value: "2"` |
| `REMOVE` | Remove the key entirely | - |

**Math expressions:**
```yaml
- type: data
  action: ADD
  key: "total"
  value: "%zmenu_player_value_base%*1.5"
  math: true
```

## Economy Actions

### currency-deposit

Add money to player's balance.

```yaml
- type: currency-deposit
  amount: 100
  reason: "Reward"    # Optional
```

---

### currency-withdraw

Remove money from player's balance.

```yaml
- type: currency-withdraw
  amount: 50
  reason: "Purchase"  # Optional
```

## Book Action

### book

Open a written book for the player.

```yaml
- type: book
  author: "Server"
  title: "&6Welcome Book"
  pages:
    - |
      &6Welcome!

      &7This is page 1
      of our welcome book.
    - |
      &6Page 2

      &7More content here.
```

## Dialog Action

### dialog

Open a dialog (Paper 1.20.5+ with PacketEvents).

```yaml
- type: dialog
  dialog: "confirmation"
```

## Discord Actions

### discord

Send a message to a Discord webhook.

```yaml
- type: discord
  webhook: "https://discord.com/api/webhooks/..."
  content: "%player% made a purchase!"
  username: "Shop Bot"          # Optional
  avatar_url: "https://..."     # Optional
```

---

### discord-component

Send a Discord message with buttons/components.

```yaml
- type: discord-component
  webhook: "https://discord.com/api/webhooks/..."
  embeds:
    - title: "New Purchase"
      description: "%player% bought an item"
      color: "#00FF00"
```

## Integration Actions

### luckperm-set

Modify LuckPerms permissions/groups.

```yaml
- type: luckperm-set
  group: "vip"
  duration: 2592000  # Seconds (30 days)
```

---

### shopkeeper

Interact with Shopkeepers plugin.

```yaml
- type: shopkeeper
  name: "shop_name"
```

## Complete Examples

### Purchase with Feedback

```yaml
items:
  buy-item:
    slot: 13
    item:
      material: DIAMOND_SWORD
      name: "&6&lDiamond Sword"
      lore:
        - "&7Price: &a$500"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%vault_eco_balance%"
          compare: ">="
          number: 500
          deny:
            - type: message
              messages:
                - "&cYou need $500!"
            - type: sound
              sound: ENTITY_VILLAGER_NO
      success:
        - type: currency-withdraw
          amount: 500
        - type: console-command
          commands:
            - "give %player% diamond_sword 1"
        - type: message
          messages:
            - "&aPurchase successful!"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
        - type: close
```

### Toggle Setting with Data

```yaml
items:
  toggle:
    slot: 22
    type: SWITCH
    placeholder: "%zmenu_player_value_setting%"
    buttons:
      "on":
        item:
          material: LIME_DYE
          name: "&a&lSetting: ON"
        actions:
          - type: data
            action: SET
            key: "setting"
            value: "off"
          - type: message
            messages:
              - "&7Setting turned &cOFF"
          - type: sound
            sound: UI_BUTTON_CLICK
          - type: refresh
      "off":
        item:
          material: GRAY_DYE
          name: "&7&lSetting: OFF"
        actions:
          - type: data
            action: SET
            key: "setting"
            value: "on"
          - type: message
            messages:
              - "&7Setting turned &aON"
          - type: sound
            sound: UI_BUTTON_CLICK
          - type: refresh
```

### Multi-Action Button

```yaml
items:
  reward:
    slot: 13
    item:
      material: CHEST
      name: "&e&lDaily Reward"
    actions:
      - type: console-command
        commands:
          - "give %player% diamond 5"
      - type: currency-deposit
        amount: 1000
      - type: data
        action: SET
        key: "last_reward"
        value: "%zmenu_time_unix_timestamp%"
      - type: title
        title: "&6&lReward Claimed!"
        subtitle: "&75 Diamonds + $1000"
      - type: sound
        sound: ENTITY_PLAYER_LEVELUP
      - type: broadcast
        messages:
          - "&6%player% &7claimed their daily reward!"
      - type: close
```

## Action Order

Actions execute in the order they're listed. If you need to close the inventory after a teleport, put `close` before `teleport`:

```yaml
actions:
  - type: close
  - type: teleport
    world: "world"
    x: 0
    y: 100
    z: 0
```

## Using Actions in Requirements

Actions can also be used in `deny` and `success` blocks of requirements:

```yaml
click-requirement:
  requirements:
    - type: permission
      permission: "server.vip"
      deny:
        - type: message
          messages:
            - "&cYou need VIP!"
  success:
    - type: message
      messages:
        - "&aAccess granted!"
```

## Quick Reference Table

| Action | Description |
|--------|-------------|
| `message` | Send message to player |
| `broadcast` | Send message to all |
| `action-bar` | Show action bar |
| `title` | Show title/subtitle |
| `toast` | Show achievement toast |
| `sound` | Play sound |
| `player-command` | Run command as player |
| `console-command` | Run command as console |
| `inventory` | Open inventory |
| `close` | Close inventory |
| `back` | Go back |
| `refresh` | Refresh button |
| `teleport` | Teleport player |
| `connect` | Change server |
| `data` | Modify player data |
| `currency-deposit` | Add money |
| `currency-withdraw` | Remove money |

## Next Steps

- Learn about [Player Data](../player-data) for storing values
- See [Requirements](./button#requirements) for conditional actions
- Create [Patterns](../patterns) with default actions
