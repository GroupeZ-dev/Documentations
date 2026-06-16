---
sidebar_position: 8
title: Item Rules
description: Flexible item-matching system used to validate items dropped into a menu
---

# Item Rules

Item rules are a flexible **item-matching system**. Instead of comparing an item against a single fixed item stack, a rule describes a set of conditions an item must satisfy (its material, its name, its lore, a custom-model-data range, a plugin item id, etc.).

Rules are mainly used by the [`item_drag`](#the-item_drag-button) button to decide whether a player is allowed to drop an item into a slot.

## Defining a rule

A rule is defined with a `rule` section. Each rule has a `type` and its own options:

```yaml
rule:
  type: material
  materials:
    - DIAMOND
    - EMERALD
```

You can combine several rules with the `and` / `or` composite types (see [Combining rules](#combining-rules)).

## The item_drag button

The `item_drag` button lets a player place (drag) an item into a slot. You can validate the dropped item with a `rule`, show a `check-item` placeholder and display an `error-item` when the item is refused.

```yaml
items:
  drop-here:
    slot: 13
    type: item_drag

    # Optional: item shown in the slot when it is empty
    check-item:
      type: full
      item:
        material: LIGHT_GRAY_STAINED_GLASS_PANE
        name: "&7Drop a diamond here"

    # Optional: item flashed when the dropped item is refused
    error-item:
      duration: 20      # In ticks (default: 20)
      use_cache: true   # Default: true
      item:
        material: RED_STAINED_GLASS_PANE
        name: "&cInvalid item!"

    # Only items matching this rule are accepted
    rule:
      type: material
      materials:
        - DIAMOND
```

| Option       | Type   | Description                                                        |
|--------------|--------|--------------------------------------------------------------------|
| `check-item` | Item   | Item shown in the slot (with a comparison `type`, default `full`)  |
| `error-item` | Item   | Item flashed when a refused item is dropped (`duration`, `use_cache`) |
| `rule`       | Rule   | The rule the dropped item must match to be accepted                |

:::tip
`check-item` / `check_item` and `error-item` / `error_item` are interchangeable (both spellings work).
:::

## Rule types

### material

Matches an exact material.

```yaml
rule:
  type: material
  materials:
    - DIAMOND
    - EMERALD_BLOCK
```

| Key | Type | Description |
|-----|------|-------------|
| `materials` | List | The list of accepted materials |

---

### material-contains / material-prefix / material-suffix

Match the material **name** by substring, prefix or suffix. Useful to accept whole families of materials (all wool, all logs, etc.).

```yaml
rule:
  type: material-contains
  patterns:
    - "WOOL"        # matches WHITE_WOOL, RED_WOOL, ...
```

```yaml
rule:
  type: material-prefix
  prefixes:
    - "DIAMOND_"    # matches DIAMOND_SWORD, DIAMOND_PICKAXE, ...
```

```yaml
rule:
  type: material-suffix
  suffixes:
    - "_LOG"        # matches OAK_LOG, BIRCH_LOG, ...
```

| Type | Key | Description |
|------|-----|-------------|
| `material-contains` | `patterns` | Substrings the material name must contain |
| `material-prefix` | `prefixes` | Prefixes the material name must start with |
| `material-suffix` | `suffixes` | Suffixes the material name must end with |

---

### name

Matches the item's display name.

```yaml
rule:
  type: name
  match-type: CONTAINS   # EXACT (default), PREFIX, SUFFIX or CONTAINS
  ignore-case: true      # Default: true
  names:
    - "Legendary"
```

| Key | Type | Description |
|-----|------|-------------|
| `names` | List | The list of names to match |
| `match-type` | String | `EXACT` (default), `PREFIX`, `SUFFIX` or `CONTAINS` |
| `ignore-case` | Boolean | Case-insensitive matching (default: `true`) |

---

### lore

Matches the item's lore.

```yaml
rule:
  type: lore
  match-type: CONTAINS   # CONTAINS (default) or EQUALS
  ignore-case: true      # Default: true
  values:
    - "Soulbound"
```

| Key | Type | Description |
|-----|------|-------------|
| `values` | List | The lines to look for in the lore |
| `match-type` | String | `CONTAINS` (default) or `EQUALS` |
| `ignore-case` | Boolean | Case-insensitive matching (default: `true`) |

---

### tag

Matches a vanilla Minecraft material tag (for example `minecraft:planks`, `minecraft:wool`).

```yaml
rule:
  type: tag
  tags:
    - "planks"
    - "wool"
```

| Key | Type | Description |
|-----|------|-------------|
| `tags` | List | The list of material tags to match |

**Aliases:** `tag`, `material-tag`, `material_tag`, `tags`.

---

### custom-model-data

Matches the item's custom model data, either by exact value or by range.

```yaml
rule:
  type: custom-model-data
  values:
    - 1001
    - 1002
  ranges:
    - min: 2000
      max: 2999
```

| Key | Type | Description |
|-----|------|-------------|
| `values` | List | Accepted custom-model-data values |
| `ranges` | List | Accepted ranges, each with `min` and `max` |

---

### Plugin item rules

These rules match a custom item by its plugin id. They support wildcards and an `ignore-case` option (default `true`), and require the corresponding plugin to be installed.

```yaml
rule:
  type: itemsadder
  ignore-case: true
  items:
    - "myitems:ruby"
    - "myitems:*"      # wildcard
```

**Available plugin rule types:** `craftengine`, `denizen`, `eco`, `executableblocks`, `executableitems`, `headdatabase`, `itemsadder`, `mmoitems`, `nexo`, `nextgens`, `nova`, `oraxen`, `slimefun`.

| Key | Type | Description |
|-----|------|-------------|
| `items` | List | The list of item ids to match (wildcards supported) |
| `ignore-case` | Boolean | Case-insensitive matching (default: `true`) |

## Combining rules

Use `and` / `or` to combine several rules.

**and** — the item must match **every** sub-rule:

```yaml
rule:
  type: and
  rules:
    - type: material
      materials:
        - DIAMOND_SWORD
    - type: name
      match-type: CONTAINS
      names:
        - "Legendary"
```

**or** — the item must match **at least one** sub-rule:

```yaml
rule:
  type: or
  rules:
    - type: material
      materials:
        - DIAMOND
    - type: material
      materials:
        - EMERALD
```

| Key | Type | Description |
|-----|------|-------------|
| `rules` | List | The list of sub-rules to combine |

## See also

- [`item_drag` validation with `check-inventory`](./requirements#check-inventory)
- [Supported Plugins](../supported-plugins)
