---
sidebar_position: 4
title: Limits
description: Configure purchase and sale limits in zShop
---

# Limits Configuration

Limits allow you to restrict how many items players can buy or sell within a time period.

## Limit Types

| Type | Description |
|------|-------------|
| `serverBuyLimit` | Server-wide purchase limit |
| `serverSellLimit` | Server-wide sale limit |
| `playerBuyLimit` | Per-player purchase limit |
| `playerSellLimit` | Per-player sale limit |

## Scheduler Types

| Type | Description |
|------|-------------|
| `NEVER` | Limit never resets |
| `DAILY` | Resets every day |
| `WEEKLY` | Resets every week |
| `MONTHLY` | Resets every month |
| `YEARLY` | Resets every year |

## Basic Configuration

```yaml
items:
  limited_item:
    type: ZSHOP_ITEM
    item:
      material: DIAMOND
    buyPrice: 100.0
    sellPrice: 50.0
    slot: 10

    # Add limits here
    playerBuyLimit:
      limit: 10
      schedulerType: DAILY
      hour: 0
      minute: 0
```

## Limit Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | Integer | Yes | Maximum amount |
| `schedulerType` | Enum | Yes | Reset schedule type |
| `hour` | Integer | No | Hour of reset (0-23) |
| `minute` | Integer | No | Minute of reset (0-59) |
| `day` | String/Integer | No | Day for weekly/monthly |
| `month` | String | No | Month for yearly |

## Examples

### Daily Player Limit

Each player can buy 10 diamonds per day, resetting at midnight:

```yaml
items:
  diamond:
    type: ZSHOP_ITEM
    item:
      material: DIAMOND
    buyPrice: 100.0
    sellPrice: 50.0
    slot: 10

    playerBuyLimit:
      limit: 10
      schedulerType: DAILY
      hour: 0
      minute: 0
```

### Weekly Server Limit

Only 100 beacons can be purchased server-wide per week:

```yaml
items:
  beacon:
    type: ZSHOP_ITEM
    item:
      material: BEACON
    buyPrice: 100000.0
    sellPrice: 25000.0
    slot: 11

    serverBuyLimit:
      limit: 100
      schedulerType: WEEKLY
      day: MONDAY
      hour: 0
      minute: 0
```

**Valid day names:**
- `SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`

### Monthly Sell Limit

Players can sell up to 1000 iron ingots per month:

```yaml
items:
  iron_ingot:
    type: ZSHOP_ITEM
    item:
      material: IRON_INGOT
    buyPrice: 15.0
    sellPrice: 5.0
    slot: 12

    playerSellLimit:
      limit: 1000
      schedulerType: MONTHLY
      day: 1  # First day of month
      hour: 0
      minute: 0
```

### Yearly Event Item

Special item available only once per year:

```yaml
items:
  christmas_gift:
    type: ZSHOP_ITEM
    item:
      material: CHEST
      name: "&c&lChristmas Gift"
    buyPrice: 0.0
    giveItem: true
    slot: 13

    playerBuyLimit:
      limit: 1
      schedulerType: YEARLY
      month: DECEMBER
      day: 25
      hour: 0
      minute: 0
```

**Valid month names:**
- `JANUARY`, `FEBRUARY`, `MARCH`, `APRIL`, `MAY`, `JUNE`
- `JULY`, `AUGUST`, `SEPTEMBER`, `OCTOBER`, `NOVEMBER`, `DECEMBER`

### Permanent Limit (Never Resets)

One-time purchase item that never resets:

```yaml
items:
  vip_kit:
    type: ZSHOP_ITEM
    item:
      material: NETHER_STAR
      name: "&6&lVIP Starter Kit"
    buyPrice: 50000.0
    giveItem: false
    slot: 14
    buyCommands:
      - "kit vip %player%"

    playerBuyLimit:
      limit: 1
      schedulerType: NEVER
```

### Combined Limits

Item with both player and server limits:

```yaml
items:
  rare_item:
    type: ZSHOP_ITEM
    item:
      material: DRAGON_EGG
      name: "&5&lDragon Egg"
    buyPrice: 1000000.0
    slot: 15

    # Each player can buy 1 per week
    playerBuyLimit:
      limit: 1
      schedulerType: WEEKLY
      day: MONDAY
      hour: 0
      minute: 0

    # Only 3 total available per week
    serverBuyLimit:
      limit: 3
      schedulerType: WEEKLY
      day: MONDAY
      hour: 0
      minute: 0
```

### Buy and Sell Limits

```yaml
items:
  gold_ingot:
    type: ZSHOP_ITEM
    item:
      material: GOLD_INGOT
    buyPrice: 50.0
    sellPrice: 25.0
    slot: 16

    # Can buy 100 per day
    playerBuyLimit:
      limit: 100
      schedulerType: DAILY
      hour: 0
      minute: 0

    # Can sell 500 per day
    playerSellLimit:
      limit: 500
      schedulerType: DAILY
      hour: 0
      minute: 0
```

## Placeholders

Use these placeholders to display limit information:

| Placeholder | Description |
|-------------|-------------|
| `%zshop_limit_player_buy_<material>%` | Player buy limit remaining |
| `%zshop_limit_player_sell_<material>%` | Player sell limit remaining |
| `%zshop_limit_server_buy_<material>%` | Server buy limit remaining |
| `%zshop_limit_server_sell_<material>%` | Server sell limit remaining |
| `%zshop_limit_player_buy_<material>_max%` | Max player buy limit |
| `%zshop_limit_player_sell_<material>_max%` | Max player sell limit |
| `%zshop_limit_server_buy_<material>_max%` | Max server buy limit |
| `%zshop_limit_server_sell_<material>_max%` | Max server sell limit |
| `%zshop_limit_<type>_<material>_reset%` | Time until reset |

## Lore Example with Limits

```yaml
items:
  limited_diamond:
    type: ZSHOP_ITEM
    item:
      material: DIAMOND
    buyPrice: 100.0
    sellPrice: 50.0
    slot: 10
    lore:
      - ""
      - "&7Buy: &a%buyPrice%"
      - "&7Sell: &c%sellPrice%"
      - ""
      - "&7Your Limit: &e%zshop_limit_player_buy_DIAMOND%&7/&e%zshop_limit_player_buy_DIAMOND_max%"
      - "&7Resets in: &f%zshop_limit_player_buy_DIAMOND_reset%"

    playerBuyLimit:
      limit: 10
      schedulerType: DAILY
      hour: 0
      minute: 0
```

## Data Storage

- **Server limits**: Stored in `plugins/zShop/limits.json`
- **Player limits**: Stored in `plugins/zShop/players/<uuid>.json`

:::warning
Do not manually edit these files while the server is running. Use the plugin's reload command after any manual changes.
:::

## Best Practices

1. **Balance limits** - Set reasonable limits to prevent economy abuse
2. **Use appropriate reset times** - Match limits to your server's economy pace
3. **Combine limit types** - Use both player and server limits for rare items
4. **Display information** - Show limit status in item lore
5. **Test thoroughly** - Verify limits work as expected before going live
