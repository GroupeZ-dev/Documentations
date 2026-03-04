---
sidebar_position: 12
title: Patterns
description: Reusable pattern templates for zAuctionHouse inventories
---

# Patterns

Patterns are reusable inventory templates that add common elements. They are stored in `plugins/zAuctionHouse/patterns/` and can be included in any inventory.

## How Patterns Work

- Patterns are applied in order; later patterns can override earlier ones
- Items from patterns can be overridden by the including inventory
- Multiple patterns can be combined in a single inventory

## Using Patterns

Include patterns in your inventory files:

```yaml
name: "My Inventory"
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:
  # Your items here (override pattern slots as needed)
```

---

## zauctionhouse-decoration

Adds decorative glass pane borders to the top and bottom rows.

**File:** `plugins/zAuctionHouse/patterns/decoration.yml`

**Configuration:**

```yaml
name: "zauctionhouse-decoration"
size: 54

items:

  decoration:
    is-permanent: true
    slots:
      - '0-8'     # Top row
      - '45-53'   # Bottom row
    item:
      material: LIGHT_BLUE_STAINED_GLASS_PANE
      name: "<white>"
```

**Visual:**

```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │  ← Glass Panes
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │  ← Glass Panes
└───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

---

## zauctionhouse-pagination

Adds previous and next page navigation buttons.

**File:** `plugins/zAuctionHouse/patterns/pagination.yml`

**Configuration:**

```yaml
name: "zauctionhouse-pagination"
size: 54

items:

  previous:
    type: PREVIOUS
    is-permanent: true
    slot: 48
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjllYTFkODYyNDdmNGFmMzUxZWQxODY2YmNhNmEzMDQwYTA2YzY4MTc3Yzc4ZTQyMzE2YTEwOThlNjBmYjdkMyJ9fX0="
      name: "#2CCED2<bold>ᴘʀᴇᴠɪᴏᴜs ᴘᴀɢᴇ"
      lore:
        - "#92ffffGo to the previous page."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
    else:
      item:
        material: LIGHT_BLUE_STAINED_GLASS_PANE
        name: "<white>"

  next:
    type: NEXT
    is-permanent: true
    slot: 50
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvODI3MWE0NzEwNDQ5NWUzNTdjM2U4ZTgwZjUxMWE5ZjEwMmIwNzAwY2E5Yjg4ZTg4Yjc5NWQzM2ZmMjAxMDVlYiJ9fX0="
      name: "#2CCED2<bold>ɴᴇxᴛ ᴘᴀɢᴇ"
      lore:
        - "#92ffffGo to the next page."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
    else:
      item:
        material: LIGHT_BLUE_STAINED_GLASS_PANE
        name: "<white>"
```

**Visual:**

```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │ < │   │ > │   │   │   │  ← Pagination
└───┴───┴───┴───┴───┴───┴───┴───┴───┘
             ↑       ↑
         Slot 48  Slot 50
```

**Behavior:**
- **Previous**: Shows arrow head when on page 2+, glass pane on page 1
- **Next**: Shows arrow head when more pages exist, glass pane on last page

---

## zauctionhouse-back

Adds a back button to return to the previous inventory.

**File:** `plugins/zAuctionHouse/patterns/back.yml`

**Configuration:**

```yaml
name: "zauctionhouse-back"
size: 54

items:

  previous:
    type: BACK
    is-permanent: true
    slot: 49
    item:
      material: BARRIER
      name: "#2CCED2<bold>ʙᴀᴄᴋ"
      lore:
        - "#92ffffGo to the previous inventory."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
```

**Visual:**

```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │ x │   │   │   │   │  ← Back
└───┴───┴───┴───┴───┴───┴───┴───┴───┘
                 ↑
             Slot 49
```

---

## Creating Custom Patterns

You can create your own patterns in the `patterns/` folder:

```yaml
# patterns/my-custom-pattern.yml
name: "my-custom-pattern"
size: 54

items:
  my-element:
    is-permanent: true
    slots:
      - 0
      - 8
    item:
      material: DIAMOND
      name: "&bDecoration"
```

Then use it in your inventories:

```yaml
patterns:
  - 'my-custom-pattern'
```

:::tip
Pattern names must be unique across all pattern files.
:::
