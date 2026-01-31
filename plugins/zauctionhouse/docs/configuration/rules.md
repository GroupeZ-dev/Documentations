---
sidebar_position: 5
title: Rules (Blacklist/Whitelist)
description: Configure item restrictions in zAuctionHouse
---

# Rules Configuration

Control which items can be sold in the auction house using blacklist and whitelist rules. Rules are configured in `rules.yml`.

## File Structure

```yaml
blacklist:
  enabled: true
  rules:
    - [rule definitions]

whitelist:
  enabled: false
  rules:
    - [rule definitions]
```

## Blacklist vs Whitelist

| Mode | Description |
|------|-------------|
| **Blacklist** | Prevents specific items from being sold. All items are allowed except those matching the rules. |
| **Whitelist** | Only allows specific items to be sold. All items are blocked except those matching the rules. |

:::warning
When whitelist is enabled, only items matching whitelist rules can be sold. The blacklist is ignored.
:::

---

## Available Rules

### Material Rule

Matches items by exact Minecraft material type.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `material` |
| `materials` | list | Yes | List of material names |

```yaml
- type: material
  materials:
    - BEDROCK
    - BARRIER
    - COMMAND_BLOCK
    - DIAMOND_SWORD
```

---

### Material Prefix Rule

Matches items whose material name **starts with** specified prefixes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `material-prefix` |
| `prefixes` | list | Yes | List of prefix strings (case-insensitive) |

```yaml
- type: material-prefix
  prefixes:
    - DIAMOND_    # Matches DIAMOND_SWORD, DIAMOND_PICKAXE, etc.
    - IRON_       # Matches IRON_HELMET, IRON_INGOT, etc.
    - GOLDEN_     # Matches GOLDEN_APPLE, GOLDEN_SWORD, etc.
```

---

### Material Suffix Rule

Matches items whose material name **ends with** specified suffixes.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `material-suffix` |
| `suffixes` | list | Yes | List of suffix strings (case-insensitive) |

```yaml
- type: material-suffix
  suffixes:
    - _SWORD       # Matches DIAMOND_SWORD, IRON_SWORD, etc.
    - _PICKAXE     # Matches DIAMOND_PICKAXE, NETHERITE_PICKAXE, etc.
    - _SPAWN_EGG  # Matches all spawn eggs
```

---

### Material Contains Rule

Matches items whose material name **contains** specified patterns (substring matching).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `material-contains` |
| `patterns` | list | Yes | List of pattern strings (case-insensitive) |

```yaml
- type: material-contains
  patterns:
    - BANNER     # Matches RED_BANNER, BLUE_BANNER, etc.
    - WOOL       # Matches RED_WOOL, WHITE_WOOL, etc.
    - CANDLE     # Matches all candle variants
```

---

### Material Tag Rule

Matches items by Minecraft material tags (built-in Bukkit tags).

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `material-tag` or `tag` |
| `tags` | list | Yes* | List of tag names |
| `tag` | string | Yes* | Single tag name (alternative to `tags`) |

*Use either `tags` (list) or `tag` (single value).

```yaml
# Using tags list
- type: material-tag
  tags:
    - LOGS
    - PLANKS
    - WOOL

# Using single tag
- type: tag
  tag: SAPLINGS
```

**Common Minecraft Tags:**
- `LOGS`, `PLANKS`, `SAPLINGS`, `FLOWERS`
- `WOOL`, `TERRACOTTA`, `GLASS`
- `STAIRS`, `SLABS`, `WALLS`, `FENCES`
- `DOORS`, `BUTTONS`, `PRESSURE_PLATES`
- `RAILS`, `BEDS`, `BANNERS`, `ANVIL`

---

### Name Equals Rule

Matches items whose display name **exactly equals** one of the specified values.

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `type` | string | Yes | - | `name` |
| `mode` | string | Yes | - | `EQUALS` |
| `values` | list | Yes | - | List of display names to match |
| `ignore-case` | boolean | No | `true` | Case-insensitive matching |

```yaml
- type: name
  mode: EQUALS
  values:
    - "Admin Sword"
    - "Legendary Bow"
    - "Forbidden Item"
  ignore-case: true
```

---

### Name Contains Rule

Matches items whose display name **contains** one of the specified substrings.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `name` |
| `mode` | string | No | `CONTAINS` (default) |
| `values` | list | Yes | List of substrings to search for |

```yaml
- type: name
  mode: CONTAINS
  values:
    - "Admin"
    - "Untradeable"
    - "[Soulbound]"
```

:::tip
Name matching is case-insensitive and automatically strips color codes.
:::

---

### Lore Equals Rule

Matches items that have a lore line **exactly matching** one of the specified values.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `lore` |
| `mode` | string | Yes | `EQUALS` |
| `values` | list | Yes | List of exact lore line matches |

```yaml
- type: lore
  mode: EQUALS
  values:
    - "Soulbound"
    - "Untradeable"
    - "Cannot be traded"
```

---

### Lore Contains Rule

Matches items whose lore **contains** one of the specified substrings anywhere.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `lore` |
| `mode` | string | No | `CONTAINS` (default) |
| `values` | list | Yes | List of substrings to search for |

```yaml
- type: lore
  mode: CONTAINS
  values:
    - "Soulbound"
    - "Cannot be traded"
    - "Personal Item"
```

:::tip
Lore matching is case-insensitive and searches across all lore lines.
:::

---

### Custom Model Data Rule

Matches items with specific custom model data values.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `custom-model-data` |
| `values` | list | Yes* | List of exact custom model data integers |
| `ranges` | list | Yes* | List of range objects (see below) |

*Use either `values` or `ranges`.

**Exact values:**
```yaml
- type: custom-model-data
  values:
    - 1001
    - 1002
    - 5000
```

**Ranges:**
```yaml
- type: custom-model-data
  ranges:
    - min: 1000
      max: 1999
    - min: 5000
      max: 5999
```

---

### ItemsAdder Rule

Matches items from the [ItemsAdder](https://www.spigotmc.org/resources/itemsadder.73355/) plugin.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `itemsadder` |
| `items` | list | Yes | List of ItemsAdder item IDs (namespace:id format) |

```yaml
- type: itemsadder
  items:
    - "namespace:custom_sword"
    - "namespace:admin_pickaxe"
    - "myitems:special_gem"
```

:::info
Requires ItemsAdder plugin to be installed. Items are matched by their full namespaced ID.
:::

---

### Nexo Rule

Matches items from the [Nexo](https://www.spigotmc.org/resources/nexo.114883/) plugin.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `nexo` |
| `items` | list | Yes | List of Nexo item IDs |

```yaml
- type: nexo
  items:
    - "custom_sword"
    - "admin_tool"
    - "legendary_armor"
```

:::info
Requires Nexo plugin to be installed.
:::

---

### Oraxen Rule

Matches items from the [Oraxen](https://www.spigotmc.org/resources/oraxen.72448/) plugin.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `oraxen` |
| `items` | list | Yes | List of Oraxen item IDs |

```yaml
- type: oraxen
  items:
    - "custom_sword"
    - "ruby_pickaxe"
    - "emerald_armor"
```

:::info
Requires Oraxen plugin to be installed.
:::

---

### And Rule (Composite)

Combines multiple rules with AND logic. **ALL** child rules must match for the rule to match.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | `and` |
| `rules` | list | Yes | List of rule definitions |

```yaml
- type: and
  rules:
    - type: material
      materials:
        - NETHER_STAR
    - type: name
      mode: CONTAINS
      values:
        - "Voucher"
```

This example matches NETHER_STAR items that also have "Voucher" in their name.

---

## Complete Examples

### Blacklist Example

```yaml
blacklist:
  enabled: true
  rules:
    # Block administrative blocks
    - type: material
      materials:
        - BEDROCK
        - BARRIER
        - COMMAND_BLOCK
        - CHAIN_COMMAND_BLOCK
        - REPEATING_COMMAND_BLOCK
        - STRUCTURE_BLOCK
        - STRUCTURE_VOID
        - JIGSAW
        - LIGHT
        - DEBUG_STICK

    # Block all spawn eggs
    - type: material-suffix
      suffixes:
        - _SPAWN_EGG

    # Block items with "Admin" in name
    - type: name
      mode: CONTAINS
      values:
        - "[Admin]"
        - "Untradeable"

    # Block soulbound items (by lore)
    - type: lore
      mode: CONTAINS
      values:
        - "Soulbound"
        - "Cannot be traded"

    # Block custom items with specific model data
    - type: custom-model-data
      ranges:
        - min: 9000
          max: 9999

    # Block specific voucher items
    - type: and
      rules:
        - type: material
          materials:
            - NETHER_STAR
        - type: name
          mode: CONTAINS
          values:
            - "Voucher"
```

### Whitelist Example

```yaml
whitelist:
  enabled: true
  rules:
    # Only allow weapons
    - type: material-suffix
      suffixes:
        - _SWORD
        - _AXE

    - type: material
      materials:
        - BOW
        - CROSSBOW
        - TRIDENT

    # Only allow armor
    - type: material-suffix
      suffixes:
        - _HELMET
        - _CHESTPLATE
        - _LEGGINGS
        - _BOOTS

    - type: material
      materials:
        - SHIELD
        - ELYTRA

    # Only allow tools
    - type: material-suffix
      suffixes:
        - _PICKAXE
        - _SHOVEL
        - _HOE

    # Only allow valuable items
    - type: material
      materials:
        - DIAMOND
        - EMERALD
        - NETHERITE_INGOT
        - ENCHANTED_BOOK
```

---

## Bypass Permission

Players with the bypass permission can sell blacklisted items:

```
zauctionhouse.bypass.blacklist
```

---

## Rule Evaluation

Rules are checked when:
1. A player attempts to list an item
2. Items are loaded from database

After modifying rules, reload the configuration:

```
/ah admin reload
```

:::info
Existing listings are not automatically removed when rules change. Already listed items remain in the auction house until they expire or are purchased.
:::

---

## Custom Rules (API)

Developers can register custom rules via the API. See the [API documentation](../development/api) for details on implementing custom `Rule` and `RuleLoader` classes.

```java
// Register a custom rule loader
RuleLoaderRegistry registry = plugin.getRuleLoaderRegistry();
registry.register(new MyCustomRuleLoader());
```
