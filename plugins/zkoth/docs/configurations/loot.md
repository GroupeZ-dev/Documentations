---
sidebar_position: 4
title: Loot Configuration
description: Configure KOTH rewards and loot
---

# Loot Configuration

Configure rewards that winners receive when capturing a KOTH.

## Basic Structure

```yaml
loot:
  # Number of random items to give (-1 for all)
  random: 3

  # Distribution type: DROP, CHEST, INVENTORY, NONE
  type: INVENTORY

  # Item list (configure with /zkoth loot <name>)
  items: []
```

## Loot Types

### NONE

No item rewards, only commands are executed:

```yaml
loot:
  type: NONE
  items: []
```

Use with `endCommands` for command-only rewards.

### INVENTORY

Items go directly to the winner's inventory:

```yaml
loot:
  random: 3
  type: INVENTORY
  items: []
```

If inventory is full, remaining items drop on the ground.

### DROP

Items drop on the ground at the KOTH center:

```yaml
loot:
  random: 5
  type: DROP
  items: []
```

### CHEST

A chest spawns at the KOTH center with the loot:

```yaml
loot:
  random: -1  # All items
  type: CHEST
  items: []
```

The chest is removed after `removeChestSec` seconds (configured in config.yml).

## Random Selection

```yaml
loot:
  # Number of items to randomly select
  random: 3    # Give 3 random items
  random: -1   # Give all items
  random: 1    # Give 1 random item
```

## Configuring Items

### Using the GUI

The easiest way to configure loot:

1. Run `/zkoth loot <name>`
2. Place items in the inventory
3. Close to save

### Manual Configuration

Items are stored in Base64 format in the YAML:

```yaml
loot:
  random: 3
  type: INVENTORY
  items:
    - "H4sIAAAAAA..."  # Encoded item
    - "H4sIAAAAAA..."
    - "H4sIAAAAAA..."
```

:::tip
Always use the GUI command to configure items. The Base64 encoding is handled automatically.
:::

## Combining with Commands

Loot works alongside command rewards:

```yaml
# Regular command rewards (always given)
endCommands:
  - "eco give %playerName% 5000"
  - "bc &a%playerName% won the KOTH!"

# Random command rewards
randomEndCommands:
  commandAmount: 1
  commands:
    - percent: 80
      commands:
        - "give %playerName% golden_apple 3"
    - percent: 20
      commands:
        - "give %playerName% enchanted_golden_apple 1"

# Item loot (additional to commands)
loot:
  random: 2
  type: INVENTORY
  items: []  # Configure with /zkoth loot
```

## Examples

### Command-Only Rewards

```yaml
# No item loot
loot:
  type: NONE
  items: []

# All rewards via commands
endCommands:
  - "eco give %playerName% 10000"
  - "crate give %playerName% koth 1"
  - "give %playerName% diamond 10"
```

### Guaranteed + Random Items

```yaml
# Give 3 random items from the loot pool
loot:
  random: 3
  type: INVENTORY
  items: []  # Add items with /zkoth loot

# Also give guaranteed rewards
endCommands:
  - "give %playerName% diamond 5"  # Always get 5 diamonds
```

### Chest Loot Box

```yaml
# Spawn a loot chest with all items
loot:
  random: -1
  type: CHEST
  items: []

# Remove chest after 2 minutes (config.yml)
# removeChestSec: 120
```

### Drop Party Style

```yaml
# Drop all items on the ground
loot:
  random: -1
  type: DROP
  items: []

# Announce the drop
endCommands:
  - "bc &6&lLOOT DROP! &eItems are falling at the KOTH!"
```

## Best Practices

1. **Balance rewards** - Make rewards worth the effort
2. **Use random selection** - Keeps rewards exciting
3. **Combine methods** - Use both loot and commands
4. **Test thoroughly** - Verify items appear correctly
5. **Consider inventory space** - Use DROP or CHEST for many items

## Troubleshooting

### Items Not Appearing

1. Check loot type isn't `NONE`
2. Verify items were saved (re-open `/zkoth loot`)
3. Check console for errors
4. Ensure inventory has space (for INVENTORY type)

### Chest Not Spawning

1. Verify type is `CHEST`
2. Check the spawn location is valid
3. Ensure no blocks are in the way
4. Check `removeChestSec` isn't too low
