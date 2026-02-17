---
sidebar_position: 3
title: Commands & Permissions
description: Complete list of all commands and permissions for zCookieClicker
---

# Commands & Permissions

This page contains the complete list of all commands and permissions available in zCookieClicker.

:::info Syntax Guide
- `< >` indicates a **required** argument.
- `[ ]` indicates an **optional** argument.
:::

---

## Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/zcookieclicker` | `cookieclicker`, `cookie` | `zcookieclicker.use` | Open the Cookie Clicker GUI |
| `/zcookieclicker reload` | - | `zcookieclicker.reload` | Reload configuration files |
| `/zcookieclicker give <player> <amount>` | - | `zcookieclicker.give` | Give cookies to a player |

---

## Command Details

### Open Cookie Clicker

```
/cookie
```

Opens the main Cookie Clicker GUI where players can:
- Click the cookie to earn cookies
- View their current cookie count
- View their cookies per second (CPS)
- Access the upgrades menu

### Reload Configuration

```
/cookie reload
```

Reloads all configuration files including:
- `config.yml`
- `messages.yml`
- Inventory files
- Pattern files

### Give Cookies

```
/cookie give <player> <amount>
```

Gives a specified amount of cookies to a player.

**Examples:**
```
/cookie give Maxlego08 1000
/cookie give Notch 5000000
```

---

## Permissions

### Player Permissions

| Permission | Description |
|------------|-------------|
| `zcookieclicker.use` | Access the Cookie Clicker GUI |

### Admin Permissions

| Permission | Description |
|------------|-------------|
| `zcookieclicker.reload` | Reload configuration files |
| `zcookieclicker.give` | Give cookies to players |
| `zcookieclicker.set` | Set a player's cookie count |
| `zcookieclicker.remove` | Remove cookies from a player |

---

## Permission Examples

### LuckPerms

Give a player access to the cookie clicker:
```
/lp user <player> permission set zcookieclicker.use true
```

Give a group admin permissions:
```
/lp group admin permission set zcookieclicker.reload true
/lp group admin permission set zcookieclicker.give true
```

### PermissionsEx

```yaml
groups:
  default:
    permissions:
      - zcookieclicker.use
  admin:
    permissions:
      - zcookieclicker.reload
      - zcookieclicker.give
```

---

## Usage Examples

### Basic Player Usage

1. Player runs `/cookie` to open the GUI
2. Click the cookie to earn cookies
3. Click "Upgrades" to view available upgrades
4. Purchase upgrades to increase CPS
5. Close and reopen to see updated stats

### Admin Cookie Management

```bash
# Give 10,000 cookies to a player
/cookie give Maxlego08 10000

# Reload after configuration changes
/cookie reload
```
