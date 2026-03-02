---
sidebar_position: 3
title: Commands & Permissions
description: Complete list of zShop commands and permissions
---

# Commands & Permissions

Complete reference for all zShop commands and their associated permissions.

## Main Commands

### /zshop

Open the main shop menu.

```
/zshop
```

**Aliases:** `/shop`, `/myshop`

**Permission:** None (configurable via zMenu)

---

### /zshoplugin

Main plugin management command.

```
/zshoplugin
```

**Aliases:** `/zpl`

**Permission:** `zshop.help`

#### Subcommands

| Subcommand | Description | Permission |
|------------|-------------|------------|
| `/zshoplugin reload` | Reload configuration files | `zshop.reload` |
| `/zshoplugin convert` | Convert ShopGUI+ config to zShop | `zshop.convert` |
| `/zshoplugin logs <player>` | View player transaction logs | `zshop.logs` |

---

## Sell Commands

:::info
Sell commands are disabled by default. Enable them in `config.yml`:
```yaml
enableSellCommand: true
```
:::

### /sell-all

Sell all sellable items in your inventory.

```
/sell-all
```

**Aliases:** `/zshop-sell-all`

**Permission:** `zshop.sell.all`

---

### /sell-hand

Sell the item stack in your main hand.

```
/sell-hand
```

**Aliases:** `/zshop-sell-hand`

**Permission:** `zshop.sell.hand`

---

### /sell-handall

Sell all items of the same type as the item in your hand.

```
/sell-handall
```

**Aliases:** `/zshop-sell-handall`

**Permission:** `zshop.sell.hand_all`

---

### /sell-inventory

Open the sell inventory GUI where you can place items to sell.

```
/sell-inventory
```

**Permission:** `zshop.sell.inventory`

:::info
This command is disabled by default. Enable it in `config.yml`:
```yaml
enableSellInventoryCommand: true
```
:::

---

## Custom Shop Commands

You can create custom commands to open specific shop menus in `commands.yml`:

```yaml
commands:
  # Main shop
  zshop:
    command: zshop
    aliases:
      - shop
      - myshop
    inventory: main_shop

  # Rank shop example
  rank:
    command: rank
    aliases:
      - zrank
    inventory: rank

  # Custom category command
  ores:
    command: ores
    aliases:
      - oreshop
    inventory: ores
```

See [zMenu Command Documentation](https://docs.zmenu.dev/configurations/commands) for more options.

---

## Permission Reference

### Admin Permissions

| Permission | Description |
|------------|-------------|
| `zshop.help` | Access `/zshoplugin` command |
| `zshop.reload` | Reload plugin configuration |
| `zshop.convert` | Convert ShopGUI+ configuration |
| `zshop.logs` | View player transaction logs |

### Sell Permissions

| Permission | Description |
|------------|-------------|
| `zshop.sell.all` | Use `/sell-all` command |
| `zshop.sell.hand` | Use `/sell-hand` command |
| `zshop.sell.hand_all` | Use `/sell-handall` command |
| `zshop.sell.inventory` | Use `/sell-inventory` command |

### Price Modifier Permissions

Configure in `config.yml`:

```yaml
pricesModifier:
  - permission: "zshop.prices.vip"
    type: SELL
    modifier: 1.5  # +50% sell price

  - permission: "zshop.prices.legend.buy"
    type: BUY
    modifier: 0.9  # -10% buy price
```

| Permission | Effect |
|------------|--------|
| `zshop.prices.vip` | 1.5x sell price (+50%) |
| `zshop.prices.eternal` | 2.0x sell price (+100%) |
| `zshop.prices.legend.buy` | 0.9x buy price (-10%) |
| `zshop.prices.legend.sell` | 3.0x sell price (+200%) |

See [Price Modifiers](./price-modifiers) for detailed configuration.

---

## Examples

### Give VIP Sell Bonus

```bash
# Using LuckPerms
lp user <player> permission set zshop.prices.vip true

# Using PermissionsEx
pex user <player> add zshop.prices.vip
```

### Create Staff Permissions Group

```bash
# LuckPerms
lp creategroup shopstaff
lp group shopstaff permission set zshop.reload true
lp group shopstaff permission set zshop.logs true
```

### Restrict Sell Commands to Donors

```bash
# LuckPerms
lp group donor permission set zshop.sell.all true
lp group donor permission set zshop.sell.hand true
```
