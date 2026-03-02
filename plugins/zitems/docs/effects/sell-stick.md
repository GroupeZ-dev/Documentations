---
sidebar_position: 7
title: Sell Stick
description: Sell container contents by clicking
---

# Sell Stick Effect

The `SELL_STICK` effect allows players to sell all items in a container (chest, barrel, hopper, etc.) by right-clicking it with the item.

## Configuration

```yaml
effects:
  - type: SELL_STICK
    # Optional: Price multiplier (default: 1.0)
    multiplier: 1.5

    # Optional: Apply durability damage on use
    damage: true

    # Optional: Required interaction type
    action: RIGHT_CLICK  # LEFT_CLICK, RIGHT_CLICK, SHIFT_LEFT_CLICK, SHIFT_RIGHT_CLICK, CLICK (any)

    # Optional: Required hand
    hand: HAND  # HAND or OFF_HAND

    # Optional: Restrict which items can have this effect
    applicable-materials:
      - STICK
      - BLAZE_ROD
    applicability-blacklisted: false
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `multiplier` | Double | No | `1.0` | Price multiplier for sales |
| `damage` | Boolean | No | `true` | Apply durability damage |
| `action` | Enum | No | Any | Required click type |
| `hand` | Enum | No | Any | Required hand |
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability |

## Interaction Actions

| Action | Description |
|--------|-------------|
| `LEFT_CLICK` | Left-click only |
| `RIGHT_CLICK` | Right-click only |
| `SHIFT_LEFT_CLICK` | Shift + Left-click only |
| `SHIFT_RIGHT_CLICK` | Shift + Right-click only |
| `CLICK` | Any click type |

## Supported Containers

The effect works on any container:
- Chests (single and double)
- Trapped Chests
- Barrels
- Hoppers
- Droppers
- Dispensers
- Shulker Boxes
- Furnaces, Blast Furnaces, Smokers
- Brewing Stands

## Examples

### Basic Sell Stick

```yaml
sell_stick:
  material: STICK
  display-name: "<gold>Sell Stick</gold>"
  lore:
    - ""
    - "<gray>Right-click a chest to</gray>"
    - "<gray>sell all items inside!</gray>"
    - ""
    - "<yellow>Uses: <white>100</white></yellow>"

  max-damage: 100

  effects:
    - type: SELL_STICK
      multiplier: 1.0
      damage: true
      action: RIGHT_CLICK
```

### Premium Sell Stick

```yaml
premium_sell_stick:
  material: BLAZE_ROD
  display-name: "<gradient:#ffd700:#ffaa00>Premium Sell Rod</gradient>"
  lore:
    - ""
    - "<gray>Sell items for 50% more!</gray>"
    - ""
    - "<yellow>Multiplier: <white>1.5x</white></yellow>"
    - "<yellow>Uses: <white>Unlimited</white></yellow>"

  effects:
    - type: SELL_STICK
      multiplier: 1.5
      damage: false

  unbreakable: true
```

### Left-Click Sell Wand

```yaml
sell_wand:
  material: BLAZE_ROD
  display-name: "<gradient:#ff6b6b:#feca57>Sell Wand</gradient>"
  lore:
    - ""
    - "<gray>Left-click a container</gray>"
    - "<gray>to sell everything!</gray>"
    - ""
    - "<yellow>Multiplier: <white>2x</white></yellow>"

  max-damage: 500
  custom-model-data: 3001

  effects:
    - type: SELL_STICK
      multiplier: 2.0
      damage: true
      action: LEFT_CLICK
```

### Shift-Click Sell Stick

```yaml
shift_sell_stick:
  material: STICK
  display-name: "<aqua>Safe Sell Stick</aqua>"
  lore:
    - ""
    - "<gray>Shift + Right-click to sell</gray>"
    - "<gray>Prevents accidental sales!</gray>"

  max-damage: 200

  effects:
    - type: SELL_STICK
      multiplier: 1.0
      damage: true
      action: SHIFT_RIGHT_CLICK
```

### Main Hand Only Sell Stick

```yaml
mainhand_sell_stick:
  material: GOLDEN_SHOVEL
  display-name: "<gold>Merchant's Shovel</gold>"
  lore:
    - ""
    - "<gray>Hold in main hand and</gray>"
    - "<gray>right-click to sell!</gray>"

  effects:
    - type: SELL_STICK
      multiplier: 1.0
      damage: true
      hand: HAND
```

### Tiered Sell Sticks

```yaml
# Basic tier
sell_stick_basic:
  material: STICK
  display-name: "<white>Sell Stick</white>"
  lore:
    - ""
    - "<gray>Basic sell stick</gray>"
    - ""
    - "<yellow>Multiplier: <white>1x</white></yellow>"
    - "<yellow>Uses: <white>50</white></yellow>"

  max-damage: 50

  effects:
    - type: SELL_STICK
      multiplier: 1.0
      damage: true

# Rare tier
sell_stick_rare:
  material: BLAZE_ROD
  display-name: "<aqua>Rare Sell Rod</aqua>"
  lore:
    - ""
    - "<gray>Rare sell stick</gray>"
    - ""
    - "<yellow>Multiplier: <white>1.25x</white></yellow>"
    - "<yellow>Uses: <white>200</white></yellow>"

  max-damage: 200

  effects:
    - type: SELL_STICK
      multiplier: 1.25
      damage: true

# Epic tier
sell_stick_epic:
  material: END_ROD
  display-name: "<light_purple>Epic Sell Rod</light_purple>"
  lore:
    - ""
    - "<gray>Epic sell stick</gray>"
    - ""
    - "<yellow>Multiplier: <white>1.5x</white></yellow>"
    - "<yellow>Uses: <white>500</white></yellow>"

  max-damage: 500
  custom-model-data: 3002

  effects:
    - type: SELL_STICK
      multiplier: 1.5
      damage: true

# Legendary tier
sell_stick_legendary:
  material: NETHER_STAR
  display-name: "<gradient:#ffd700:#ff8c00>Legendary Sell Star</gradient>"
  lore:
    - ""
    - "<gray>Legendary sell stick</gray>"
    - ""
    - "<yellow>Multiplier: <white>2x</white></yellow>"
    - "<yellow>Uses: <white>Unlimited</white></yellow>"

  effects:
    - type: SELL_STICK
      multiplier: 2.0
      damage: false

  unbreakable: true
```

## Behavior

1. When a player clicks a container:
   - Checks if the action matches the configured action
   - Checks if the hand matches the configured hand
   - Iterates through all items in the container
   - Sells each item using the shop plugin
   - Items that can't be sold remain in the container
   - Applies durability damage if enabled

2. Shop integration:
   - Uses the same shop plugins as AUTO_SELL
   - ShopGUI+, EconomyShopGUI, or ZShop required
   - Items without shop prices are not sold

## Tips

- Use `max-damage` to limit uses
- Set `damage: false` for unlimited use
- Use `action: SHIFT_RIGHT_CLICK` to prevent accidental sales
- Combine with `multiplier` for VIP perks
- Create tiers with increasing multipliers and uses
