---
sidebar_position: 4
title: Placeholders
description: PlaceholderAPI placeholders available in zCookieClicker
---

# Placeholders

zCookieClicker provides several placeholders through PlaceholderAPI for displaying cookie information in scoreboards, holograms, and other plugins.

## Requirements

To use these placeholders, you need [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installed on your server.

## Available Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zcookieclicker_cookie%` | Player's current cookie count (formatted) |
| `%zcookieclicker_cps%` | Player's cookies per second (formatted) |
| `%zcookieclicker_upgrade_<UPGRADE>%` | Number of a specific upgrade owned |

## Upgrade Placeholders

You can check how many of each upgrade a player owns:

| Placeholder | Description |
|-------------|-------------|
| `%zcookieclicker_upgrade_MANUAL_CLICK%` | Manual Click upgrades owned |
| `%zcookieclicker_upgrade_GRANDMA%` | Grandma upgrades owned |
| `%zcookieclicker_upgrade_FARM%` | Farm upgrades owned |
| `%zcookieclicker_upgrade_FACTORY%` | Factory upgrades owned |
| `%zcookieclicker_upgrade_MINE%` | Mine upgrades owned |
| `%zcookieclicker_upgrade_BANK%` | Bank upgrades owned |
| `%zcookieclicker_upgrade_TEMPLE%` | Temple upgrades owned |
| `%zcookieclicker_upgrade_TOWER%` | Tower upgrades owned |
| `%zcookieclicker_upgrade_TIME_MACHINE%` | Time Machine upgrades owned |
| `%zcookieclicker_upgrade_ANTIMATTER_CONDENSER%` | Antimatter Condenser upgrades owned |
| `%zcookieclicker_upgrade_PRISM%` | Prism upgrades owned |
| `%zcookieclicker_upgrade_CHANCELLERY%` | Chancellery upgrades owned |
| `%zcookieclicker_upgrade_DIMENSIONAL_CORRIDOR%` | Dimensional Corridor upgrades owned |
| `%zcookieclicker_upgrade_CELESTIAL_OVENS%` | Celestial Ovens upgrades owned |

## Usage Examples

### Scoreboard

Display cookie stats on a player's scoreboard:

```yaml
lines:
  - "&6&lCookie Clicker"
  - ""
  - "&eCookies: &f%zcookieclicker_cookie%"
  - "&eCPS: &f%zcookieclicker_cps%"
  - ""
  - "&7Grandmas: &f%zcookieclicker_upgrade_GRANDMA%"
  - "&7Farms: &f%zcookieclicker_upgrade_FARM%"
```

### Hologram

Show cookie stats above a cookie area:

```yaml
lines:
  - "&6Cookie Clicker"
  - "&eCookies: &f%zcookieclicker_cookie%"
  - "&eCPS: &f%zcookieclicker_cps%/s"
```

### Chat Format

Display cookies in chat:

```yaml
format: "&7[&6%zcookieclicker_cookie% Cookies&7] &f%player%: %message%"
```

### Tab List

Show cookie count in the tab list:

```yaml
header: "&6Cookie Clicker"
footer: "&eCookies: %zcookieclicker_cookie% | CPS: %zcookieclicker_cps%"
```

## Internal Placeholders

zCookieClicker also uses internal placeholders within its GUI files:

| Placeholder | Description |
|-------------|-------------|
| `%cookie%` | Current cookie count (formatted) |
| `%cookie-per-seconds%` | Cookies per second (formatted) |
| `%price%` | Upgrade price |
| `%cps%` | Upgrade CPS value |
| `%amount%` | Number of upgrades owned |
| `%upgrade-name%` | Upgrade display name |

These internal placeholders are automatically replaced in inventory configurations.

## Number Formatting

All number placeholders use the configured number format from `config.yml`:

```yaml
short-number-format:
  enabled: true
  decimal-format: "#.##"
  suffixes:
    - ""
    - "K"      # Thousands
    - "M"      # Millions
    - "B"      # Billions
    - "T"      # Trillions
    - "Qa"     # Quadrillions
    - "Qi"     # Quintillions
    - "Sx"     # Sextillions
    - "Sp"     # Septillions
    - "Oc"     # Octillions
```

**Examples:**
- `1000` → `1K`
- `1500000` → `1.5M`
- `2340000000` → `2.34B`
