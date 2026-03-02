---
sidebar_position: 1
title: Main Configuration
description: zDrawer config.yml settings
---

# Main Configuration

The main configuration file is located at `plugins/zDrawer/config.yml`.

## General Settings

```yaml
# Enable debug messages in console
enableDebug: false

# Enable time performance debugging
enableDebugTime: false
```

## Storage Configuration

```yaml
# Storage type: JSON, SQLITE, or MYSQL
storage: SQLITE

# Auto-save interval in milliseconds (default: 2 minutes)
updateInterval: 120000

# Database configuration (for SQLITE/MYSQL)
sql:
  tableName: "zdrawers"
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  database: zdrawer
```

### Storage Types

| Type | Description | Best For |
|------|-------------|----------|
| `JSON` | File-based storage | Small servers, easy backup |
| `SQLITE` | Local database | Medium to large servers |
| `MYSQL` | Remote database | Server networks |

## Display Scales

Configure the size of display entities:

```yaml
drawer:
  scales:
    # Size for item display on drawer face
    itemDisplay: { x: 0.6, y: 0.6, z: 0.01 }

    # Size for upgrade indicator
    upgradeDisplay: { x: 0.15, y: 0.15, z: 0.01 }

    # Size for text display (amount)
    textDisplay: { x: 0.6, y: 0.6, z: 0.6 }
```

## Breaking Configuration

```yaml
drawer:
  # Require specific tools to break drawers
  enableBreakMaterial: true

  # Tools that can break drawers
  breakMaterials:
    - WOODEN_AXE
    - STONE_AXE
    - IRON_AXE
    - GOLDEN_AXE
    - DIAMOND_AXE
    - NETHERITE_AXE
```

## World Restrictions

```yaml
drawer:
  # Worlds where drawers cannot be placed
  disableWorlds:
    - "world_nether"
    - "world_the_end"
```

## Material Blacklist

```yaml
drawer:
  # Materials that cannot be stored in drawers
  blacklistMaterials:
    - BARREL
    - BEDROCK
    - SHULKER_BOX
```

## Block Access

```yaml
# Use BlockBreakEvent to check drawer access
# Enables compatibility with protection plugins
enableDefaultBlockAccess: true
```

## Number Formatting

Format large numbers for display:

```yaml
numberFormat:
  # Display format when formatting is disabled
  display: "&f%amount%"

  # Enable number formatting (e.g., 1.5K, 2.3M)
  enable: false

  # Format configurations
  formats:
    - format: ""           # Raw number
      maxAmount: 1000
    - format: "%.1fK"      # 1.5K
      maxAmount: 1000000
    - format: "%.1fM"      # 2.3M
      maxAmount: 1000000000
    - format: "%.1fB"      # 1.2B
      maxAmount: 1000000000000
    - format: "%.2fT"      # 3.45T
      maxAmount: 1000000000000000
    - format: "%.2fQ"      # 1.23Q
      maxAmount: 1000000000000000000
```

### Colored Number Display

You can add colors using MiniMessage format:

```yaml
numberFormat:
  enable: true
  formats:
    - format: ""
      maxAmount: 1000
      display: "<gradient:#1cfc03:#2bd66f>%amount%"
    - format: "%.1fK"
      maxAmount: 1000000
      display: "<gradient:#7bd62b:#a3d14d>%amount%"
    - format: "%.1fM"
      maxAmount: 1000000000
      display: "<gradient:#ebe123:#ebbc23>%amount%"
    - format: "%.1fB"
      maxAmount: 1000000000000
      display: "<gradient:#eb8023:#eb4b23>%amount%"
```

## Complete Example

```yaml
enableDebug: false
enableDebugTime: false

storage: SQLITE
updateInterval: 120000

sql:
  tableName: "zdrawers"
  user: root
  password: password
  port: 3306
  host: localhost
  database: minecraft

drawer:
  enableBreakMaterial: true
  breakMaterials:
    - WOODEN_AXE
    - STONE_AXE
    - IRON_AXE
    - GOLDEN_AXE
    - DIAMOND_AXE
    - NETHERITE_AXE
  disableWorlds:
    - "world_nether"
  blacklistMaterials:
    - BARREL
    - BEDROCK
  scales:
    itemDisplay: { x: 0.6, y: 0.6, z: 0.01 }
    upgradeDisplay: { x: 0.15, y: 0.15, z: 0.01 }
    textDisplay: { x: 0.6, y: 0.6, z: 0.6 }

numberFormat:
  display: "&f%amount%"
  enable: true
  formats:
    - format: ""
      maxAmount: 1000
    - format: "%.1fK"
      maxAmount: 1000000
    - format: "%.1fM"
      maxAmount: 1000000000

enableDefaultBlockAccess: true
```
