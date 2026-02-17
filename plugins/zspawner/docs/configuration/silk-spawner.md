---
sidebar_position: 4
title: Silk Touch Spawners
description: Configuration of Silk Touch spawner mining in zSpawner
---

# Silk Touch Spawners

zSpawner allows players to mine spawners using Silk Touch tools, giving them the spawner as an item instead of destroying it.

## Configuration

### Enable Silk Touch Mining

```yaml
silkSpawner:
  enable: false  # Set to true to enable
```

### Tool Whitelist

Define which tools can mine spawners:

```yaml
silkSpawner:
  whitelistMaterial:
    - GOLDEN_PICKAXE
    - DIAMOND_PICKAXE
    - NETHERITE_PICKAXE
```

### Require Silk Touch Enchantment

Optionally require the Silk Touch enchantment on the tool:

```yaml
silkSpawner:
  needSilkTouchEnchant: true
```

### Natural Spawner Support

Allow mining of vanilla (natural) spawners:

```yaml
silkSpawner:
  silkNaturalSpawner: true
```

### Spawner Type Conversion

When mining natural spawners, convert them to a specific zSpawner type:

```yaml
silkSpawner:
  naturelSpawnerInto: CLASSIC
```

Available types:
- `CLASSIC` - Traditional spawner
- `GUI` - GUI-managed spawner
- `VIRTUAL` - Virtual spawner with advanced features

## Complete Configuration Example

### Basic Setup

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - DIAMOND_PICKAXE
    - NETHERITE_PICKAXE
  needSilkTouchEnchant: true
  silkNaturalSpawner: true
  naturelSpawnerInto: CLASSIC
```

### Premium Setup (No Silk Touch Required)

For VIP players with special pickaxes:

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - GOLDEN_PICKAXE  # VIP exclusive tool
  needSilkTouchEnchant: false
  silkNaturalSpawner: true
  naturelSpawnerInto: GUI
```

### Strict Setup

Only specific tools with Silk Touch:

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - NETHERITE_PICKAXE
  needSilkTouchEnchant: true
  silkNaturalSpawner: false  # No natural spawner mining
  naturelSpawnerInto: CLASSIC
```

## Behavior Details

### Mining zSpawner Spawners

When a player mines a zSpawner-placed spawner:

1. Tool must be in the whitelist
2. If `needSilkTouchEnchant: true`, tool must have Silk Touch
3. Spawner drops as its original type (CLASSIC, GUI, or VIRTUAL)
4. Original spawner settings are preserved

### Mining Natural Spawners

When a player mines a vanilla/natural spawner:

1. `silkNaturalSpawner` must be `true`
2. Tool must be in the whitelist
3. If `needSilkTouchEnchant: true`, tool must have Silk Touch
4. Spawner converts to the type specified in `naturelSpawnerInto`
5. Default spawner settings are applied

## Use Cases

### Economy Server

Allow all players to mine spawners for trading:

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - IRON_PICKAXE
    - GOLDEN_PICKAXE
    - DIAMOND_PICKAXE
    - NETHERITE_PICKAXE
  needSilkTouchEnchant: true
  silkNaturalSpawner: true
  naturelSpawnerInto: CLASSIC
```

### Skyblock Server

Convert natural spawners to GUI type for management:

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - DIAMOND_PICKAXE
    - NETHERITE_PICKAXE
  needSilkTouchEnchant: true
  silkNaturalSpawner: true
  naturelSpawnerInto: GUI
```

### Prison Server

Convert to virtual spawners for auto-collection:

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - NETHERITE_PICKAXE
  needSilkTouchEnchant: false
  silkNaturalSpawner: true
  naturelSpawnerInto: VIRTUAL
```

## Tips

### Tool Recommendations

- Use **Golden Pickaxe** as a VIP-exclusive mining tool (faster but less durable)
- Use **Netherite Pickaxe** as the standard requirement for balance
- Consider creating custom tools with lore for spawner mining

### Balance Considerations

- Requiring Silk Touch adds enchantment cost
- Limiting to specific tools creates progression
- Natural spawner mining affects exploration gameplay

### Integration with Other Features

- Combined with [Stackable Spawners](./stackable-spawner), players can collect and stack
- Works with chunk limits to control spawner density
- GUI type conversion enables central spawner management
