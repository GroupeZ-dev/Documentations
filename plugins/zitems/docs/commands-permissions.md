---
sidebar_position: 3
title: Commands & Permissions
description: zItems commands and permissions reference
---

# Commands & Permissions

Complete reference for all zItems commands and permissions.

## Commands

### /zitems reload

Reloads the plugin configuration and all item files.

```
/zitems reload
```

**Permission:** `zitems.reload`

---

### /zitems give

Gives a custom item to a player.

```
/zitems give <item> [player] [amount]
```

| Argument | Required | Description |
|----------|----------|-------------|
| `item` | Yes | The item ID from your items folder |
| `player` | No | Target player (defaults to yourself) |
| `amount` | No | Number of items (defaults to 1) |

**Examples:**
```
/zitems give legendary_sword
/zitems give legendary_sword Steve
/zitems give legendary_sword Steve 5
```

**Permission:** `zitems.give`

---

### /zitems applyrune

Applies a rune to the item you're holding.

```
/zitems applyrune <rune>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `rune` | Yes | The rune ID to apply |

**Examples:**
```
/zitems applyrune vein_mining
/zitems applyrune hammer
/zitems applyrune unbreakable
```

**Permission:** `zitems.applyrune`

---

## Permissions

### Admin Permissions

| Permission | Description |
|------------|-------------|
| `zitems.*` | Access to all zItems commands |
| `zitems.reload` | Reload plugin configuration |
| `zitems.give` | Give items to players |
| `zitems.give.others` | Give items to other players |
| `zitems.applyrune` | Apply runes to items |

### Player Permissions

| Permission | Description |
|------------|-------------|
| `zitems.use.<item>` | Permission to use a specific item |
| `zitems.rune.<rune>` | Permission to use a specific rune |

## Permission Examples

### Allow only VIPs to use legendary items

```yaml
# LuckPerms example
/lp group vip permission set zitems.use.legendary_sword true
/lp group vip permission set zitems.use.legendary_pickaxe true
```

### Allow staff to give items

```yaml
/lp group moderator permission set zitems.give true
/lp group moderator permission set zitems.give.others true
```

### Allow everyone to use basic runes

```yaml
/lp group default permission set zitems.rune.xp_boost true
/lp group default permission set zitems.rune.vein_mining true
```
