---
sidebar_position: 7
title: Waypoints & Holograms
description: Guide players with waypoints and holograms in zQuests
---

# Waypoints & Holograms

zQuests can display holograms and waypoints to guide players to quest objectives. These features require a compatible plugin like **zEssentials**.

## Requirements

To use waypoints and holograms, you need:
- **zEssentials** or another compatible hologram/waypoint provider

## Global Configuration

Both features can be defined globally in dedicated files and referenced by quests.

### Holograms

Create `plugins/zQuests/holograms.yml`:

```yaml
holograms:
  - name: MINING_AREA
    location: "world,100,65,200"
    texts:
      - "&6&lMining Quest"
      - "&7Break ores in this area"
      - "&aFollow the beacon!"
    scale: 1.5
    billboard: VERTICAL

  - name: NPC_QUEST
    locations:
      - "world,50,70,100"
      - "world,-50,70,-100"
    text: "&e&lTalk to the villager"
    scale: 1.2
```

#### Hologram Options

| Option | Description | Default |
|--------|-------------|---------|
| `name` | Unique identifier (required) | - |
| `location` | Single location `world,x,y,z` | - |
| `locations` | Multiple locations | - |
| `text` | Single line text | - |
| `texts` | Multiple lines | - |
| `billboard` | Rotation mode: `CENTER`, `FIXED`, `HORIZONTAL`, `VERTICAL` | `CENTER` |
| `scale` | Size multiplier (single value or `x,y,z`) | `1` |
| `translation-x` | X offset | `0` |
| `translation-y` | Y offset | `0` |
| `translation-z` | Z offset | `0` |
| `brightness-block` | Block light level | `15` |
| `brightness-sky` | Sky light level | `15` |
| `shadow-radius` | Text shadow size | `0` |
| `shadow-strength` | Text shadow darkness | `1.0` |
| `visibility-distance` | Max visible distance | `-1` (default) |
| `text-background` | Background color (hex, name, `transparent`, `default`) | - |
| `text-alignment` | Text alignment: `CENTER`, `LEFT`, `RIGHT` | `CENTER` |
| `text-shadow` | Enable text shadow | `false` |
| `see-through` | Visible through blocks | `false` |

### Waypoints

Create `plugins/zQuests/waypoints.yml`:

```yaml
waypoints:
  - name: MINING_AREA
    location: "world,100,65,200"
    texture: quest_marker
    color: gold

  - name: FARM_LOCATION
    location: "world,200,70,150"
    texture: farm_icon
    color: green
```

#### Waypoint Options

| Option | Description | Default |
|--------|-------------|---------|
| `name` | Unique identifier (required) | - |
| `location` | Target location `world,x,y,z` | - |
| `texture` | Icon texture name | - |
| `color` | Beacon color (name or hex) | `white` |

## Using in Quests

### Reference Global Definitions

Reference globally defined holograms and waypoints by name:

```yaml
quests:
  - type: BLOCK_BREAK
    name: "mining-quest"
    display-name: "Mining Quest"
    goal: 100
    actions:
      - material: STONE
    hologram: MINING_AREA
    waypoint: MINING_AREA
```

### Inline Definitions

Define holograms and waypoints directly in the quest:

```yaml
quests:
  - type: CUBOID
    name: "find-village"
    display-name: "Find the Village"
    goal: 1
    actions:
      - cuboid: "world,100,60,100,200,100,200"
    hologram:
      location: "world,150,80,150"
      texts:
        - "&6&lVillage Quest"
        - "&7Find the hidden village"
        - "&aLook for the beacon!"
      scale: 2
      billboard: VERTICAL
      see-through: true
    waypoint:
      location: "world,150,65,150"
      texture: village_marker
      color: "#FFD700"
```

### Multiple Locations

Display holograms at multiple locations:

```yaml
quests:
  - type: ENTITY_KILL
    name: "skeleton-hunt"
    display-name: "Skeleton Hunt"
    goal: 50
    actions:
      - entity: SKELETON
    hologram:
      locations:
        - "world,100,65,100"
        - "world,-100,65,100"
        - "world,100,65,-100"
        - "world,-100,65,-100"
      texts:
        - "&c&lDanger Zone"
        - "&7Skeletons spawn here"
```

## Configuration in config.yml

Control hologram and waypoint updates:

```yaml
# Update holograms when quest state changes
update-hologram: true

# Update waypoints when quest state changes
update-waypoint: true
```

## Hologram Examples

### Simple Quest Marker

```yaml
hologram:
  location: "world,100,70,200"
  text: "&e&l! Quest Here"
  scale: 1.5
```

### Detailed Quest Info

```yaml
hologram:
  location: "world,100,72,200"
  texts:
    - "&6&lMining Master"
    - ""
    - "&7Break 500 stone blocks"
    - "&7in this area to complete"
    - "&7the quest!"
    - ""
    - "&a↓ Start here ↓"
  scale: 1.2
  billboard: CENTER
  text-alignment: CENTER
```

### NPC Interaction Point

```yaml
hologram:
  location: "world,50,73,100"
  texts:
    - "&e&l? Talk to Me"
    - "&7I have a quest for you!"
  scale: 1.0
  translation-y: 2.5  # Float above NPC
  billboard: CENTER
```

### Resource Pack Integration

```yaml
hologram:
  location: "world,100,70,200"
  text: "%img_quest_marker%"  # ItemsAdder/Oraxen image
  scale: 3
  text-background: transparent
```

## Waypoint Examples

### Simple Beacon

```yaml
waypoint:
  location: "world,100,65,200"
  color: blue
```

### Custom Icon

```yaml
waypoint:
  location: "world,100,65,200"
  texture: quest_diamond
  color: "#00FFFF"
```

## Refresh Command

If holograms or waypoints don't update properly:

```bash
/zquests refresh-hologram
```

This forces a refresh of all active holograms and waypoints.

## Visibility

Holograms and waypoints are only visible when:
1. The quest is **active** for the player
2. The quest is **not completed**
3. The player is within `visibility-distance` (if set)

Once a quest is completed, associated holograms and waypoints automatically disappear.

## Best Practices

1. **Use meaningful names** - Name global definitions clearly (e.g., `MINING_QUEST_MARKER`)
2. **Consistent heights** - Place holograms at consistent heights above ground
3. **Don't overuse** - Too many holograms can be distracting
4. **Test visibility** - Check holograms from player perspective
5. **Consider performance** - Many holograms can impact server performance

## Troubleshooting

### Holograms Not Showing

1. Verify zEssentials is installed and enabled
2. Check location coordinates are correct
3. Ensure the quest is active for the player
4. Try `/zquests refresh-hologram`

### Waypoints Not Working

1. Confirm waypoint provider is installed
2. Verify location format is correct
3. Check that the quest is started

### Holograms at Wrong Position

1. Use `translation-y` to adjust height
2. Verify world name matches exactly
3. Check for typos in coordinates

## Next Steps

- Learn about [Quest Configuration](./quests)
- Configure [Rewards](./rewards)
- Set up [Inventories](./inventories)
