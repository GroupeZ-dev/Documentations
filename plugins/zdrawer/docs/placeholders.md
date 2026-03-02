---
sidebar_position: 5
title: Placeholders
description: Available placeholders in zDrawer
---

# Placeholders

zDrawer provides placeholders for use in drawer item lore and with PlaceholderAPI.

## Internal Placeholders

These placeholders work in drawer item configuration (lore):

| Placeholder | Description |
|-------------|-------------|
| `%zdrawer_content_<index>%` | Item name stored in slot |
| `%zdrawer_amount_<index>%` | Raw amount in slot |
| `%zdrawer_amount_formatted_<index>%` | Formatted amount (e.g., 1.5K) |
| `%zdrawer_upgrade%` | Applied upgrade name |

### Index Values

The `<index>` is 0-based:

| Index | Slot |
|-------|------|
| 0 | First slot |
| 1 | Second slot |
| 2 | Third slot |
| 3 | Fourth slot |

### Usage in Drawer Lore

```yaml
item:
  material: BARREL
  name: "#22f54cDrawer"
  lore:
    - "&8&oStore items here"
    - ""
    - "#e3e3e3Content&8: #baffffx%zdrawer_amount_formatted_0% %zdrawer_content_0%"
    - "#e3e3e3Upgrade&8: #baffff%zdrawer_upgrade%"
```

### Multi-Slot Drawer Lore

```yaml
# For a QUAD drawer
item:
  lore:
    - "&8First slot:"
    - "  #e3e3e3x%zdrawer_amount_formatted_0% %zdrawer_content_0%"
    - "&8Second slot:"
    - "  #e3e3e3x%zdrawer_amount_formatted_1% %zdrawer_content_1%"
    - "&8Third slot:"
    - "  #e3e3e3x%zdrawer_amount_formatted_2% %zdrawer_content_2%"
    - "&8Fourth slot:"
    - "  #e3e3e3x%zdrawer_amount_formatted_3% %zdrawer_content_3%"
```

## PlaceholderAPI Integration

When PlaceholderAPI is installed, these placeholders are available for the drawer the player is currently interacting with:

| Placeholder | Description |
|-------------|-------------|
| `%zdrawer_content_<index>%` | Item name in slot |
| `%zdrawer_amount_<index>%` | Amount in slot |
| `%zdrawer_amount_formatted_<index>%` | Formatted amount |
| `%zdrawer_upgrade%` | Upgrade name |

### Usage Examples

**In a scoreboard plugin:**

```yaml
lines:
  - "&6Drawer Contents"
  - "&7Slot 1: %zdrawer_content_0%"
  - "&7Amount: %zdrawer_amount_formatted_0%"
```

**In a hologram:**

```yaml
lines:
  - "&eDrawer Info"
  - "&7%zdrawer_content_0%"
  - "&7x%zdrawer_amount_formatted_0%"
```

## Default Values

When a drawer slot is empty or no upgrade is applied:

| Placeholder | Default Value |
|-------------|---------------|
| `%zdrawer_content_<index>%` | `Empty` |
| `%zdrawer_amount_<index>%` | `0` |
| `%zdrawer_upgrade%` | `X` (or custom icon) |

Configure the empty upgrade display in messages:

```yaml
# In messages
EMPTY_DRAWER: "Empty"
EMPTY_UPGRADE: "#e32f1b✘"
```

## Number Formatting

The `%zdrawer_amount_formatted_<index>%` placeholder uses the number format configuration:

```yaml
numberFormat:
  enable: true
  formats:
    - format: ""
      maxAmount: 1000
    - format: "%.1fK"
      maxAmount: 1000000
    - format: "%.1fM"
      maxAmount: 1000000000
```

| Amount | Formatted |
|--------|-----------|
| 500 | 500 |
| 1500 | 1.5K |
| 2500000 | 2.5M |
| 1234567890 | 1.2B |

## Testing Placeholders

Test PlaceholderAPI placeholders:

```bash
/papi parse me %zdrawer_content_0%
/papi parse me %zdrawer_amount_formatted_0%
```

:::note
PlaceholderAPI placeholders only work when a player has recently interacted with a drawer.
:::
