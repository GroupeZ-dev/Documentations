---
sidebar_position: 2
title: Upgrades
description: Configure upgrades in zCookieClicker
---

# Upgrades

zCookieClicker features 14 unique upgrades that increase the player's cookies per second (CPS). Each upgrade can be purchased multiple times, with the price increasing after each purchase.

## Upgrade Configuration

Upgrades are configured in the `upgrades` section of `config.yml`:

```yaml
upgrades:
  - type: "MANUAL_CLICK"
    cost: 10
    cps: 0.1

  - type: "GRANDMA"
    cost: 100
    cps: 1
```

| Option | Description |
|--------|-------------|
| `type` | Upgrade identifier (must match enum value) |
| `cost` | Base cost of the upgrade |
| `cps` | Cookies per second provided by each upgrade |

## Available Upgrades

### Tier 1 - Early Game

| Upgrade | Type | Base Cost | CPS | Description |
|---------|------|-----------|-----|-------------|
| Manual Click | `MANUAL_CLICK` | 10 | 0.1 | Increases click power |
| Grandma | `GRANDMA` | 100 | 1 | A nice grandma to bake cookies |
| Farm | `FARM` | 1,100 | 8 | Grows cookie plants |
| Factory | `FACTORY` | 12,000 | 47 | Mass produces cookies |

### Tier 2 - Mid Game

| Upgrade | Type | Base Cost | CPS | Description |
|---------|------|-----------|-----|-------------|
| Mine | `MINE` | 130,000 | 260 | Mines cookie dough |
| Bank | `BANK` | 1,400,000 | 1,400 | Generates cookie interest |
| Temple | `TEMPLE` | 20,000,000 | 7,800 | Converts prayers to cookies |
| Tower | `TOWER` | 330,000,000 | 44,000 | A wizard tower making cookies |

### Tier 3 - Late Game

| Upgrade | Type | Base Cost | CPS | Description |
|---------|------|-----------|-----|-------------|
| Time Machine | `TIME_MACHINE` | 51,000,000,000 | 2,600,000 | Brings cookies from the past |
| Antimatter Condenser | `ANTIMATTER_CONDENSER` | 1,000,000,000,000 | 13,000,000 | Condenses antimatter into cookies |

### Tier 4 - End Game

| Upgrade | Type | Base Cost | CPS | Description |
|---------|------|-----------|-----|-------------|
| Prism | `PRISM` | 170,000,000,000,000 | 430,000,000 | Turns light into cookies |
| Chancellery | `CHANCELLERY` | 2,100,000,000,000,000 | 7,000,000,000 | Creates cookies from bureaucracy |
| Dimensional Corridor | `DIMENSIONAL_CORRIDOR` | 64,000,000,000,000,000 | 1,200,000,000,000 | Opens portals to cookie dimensions |
| Celestial Ovens | `CELESTIAL_OVENS` | 170,000,000,000,000,000 | 44,000,000,000,000 | Bakes cookies using star power |

## Default Configuration

```yaml
upgrades:
  - type: "MANUAL_CLICK"
    cost: 10
    cps: 0.1

  - type: "GRANDMA"
    cost: 100
    cps: 1

  - type: "FARM"
    cost: 1100
    cps: 8

  - type: "FACTORY"
    cost: 12000
    cps: 47

  - type: "MINE"
    cost: 130000
    cps: 260

  - type: "BANK"
    cost: 1400000
    cps: 1400

  - type: "TEMPLE"
    cost: 20000000
    cps: 7800

  - type: "TOWER"
    cost: 330000000
    cps: 44000

  - type: "TIME_MACHINE"
    cost: 51000000000
    cps: 2600000

  - type: "ANTIMATTER_CONDENSER"
    cost: 1000000000000
    cps: 13000000

  - type: "PRISM"
    cost: 170000000000000
    cps: 430000000

  - type: "CHANCELLERY"
    cost: 2100000000000000
    cps: 7000000000

  - type: "DIMENSIONAL_CORRIDOR"
    cost: 64000000000000000
    cps: 1200000000000

  - type: "CELESTIAL_OVENS"
    cost: 170000000000000000
    cps: 44000000000000
```

## Price Scaling

Each upgrade purchase increases the cost by the configured percentage:

```yaml
price-upgrade-percent: 15
```

**Formula:** `New Price = Base Price × (1 + percentage/100)^purchases`

**Example for Grandma (15% increase):**
| Purchase # | Price |
|------------|-------|
| 1st | 100 |
| 2nd | 115 |
| 3rd | 132 |
| 4th | 152 |
| 5th | 175 |
| 10th | 404 |
| 20th | 1,637 |

## GUI Configuration

Upgrades are displayed in the `cookies-upgrade.yml` inventory using patterns:

```yaml
manual-click:
  pattern:
    fileName: "cookie-upgrade"
    pluginName: zCookieClicker
    slot: 19
    material: WOODEN_SWORD
    upgrade: MANUAL_CLICK
    upgrade-name: 'Manual Click'
```

| Option | Description |
|--------|-------------|
| `fileName` | Pattern file name |
| `pluginName` | Plugin name for the pattern |
| `slot` | Inventory slot position |
| `material` | Display material for the upgrade |
| `upgrade` | Upgrade type (must match config) |
| `upgrade-name` | Display name in the GUI |

## Custom Upgrades

You can modify upgrade values to balance for your server:

### Easy Mode

```yaml
upgrades:
  - type: "GRANDMA"
    cost: 50        # Cheaper
    cps: 2          # More CPS

price-upgrade-percent: 10  # Slower price increase
```

### Hard Mode

```yaml
upgrades:
  - type: "GRANDMA"
    cost: 200       # More expensive
    cps: 0.5        # Less CPS

price-upgrade-percent: 25  # Faster price increase
```

## Tips

### Balancing CPS Values

- Keep a roughly 8-10x increase between tiers for balanced progression
- Higher tier upgrades should have significantly higher CPS to justify their cost

### Price Balancing

- Lower tiers should be affordable quickly to encourage engagement
- Higher tiers should require patience and strategy

### Material Selection

Choose materials that visually represent each upgrade:
- Manual Click → Wooden Sword (clicking)
- Grandma → Cake (baking)
- Farm → Wheat (farming)
- Factory → Brick (industrial)
- Mine → Iron Pickaxe (mining)
- Bank → Gold Ingot (wealth)
