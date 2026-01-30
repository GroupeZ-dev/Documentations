---
sidebar_position: 1
title: Quest Configuration
description: Learn how to configure quests in zQuests
---

# Quest Configuration

This page explains how to configure quests in zQuests. Each quest is defined using YAML configuration with various options to customize behavior, objectives, and rewards.

## Basic Structure

Quests are defined in YAML files located in the `plugins/zQuests/quests/` folder. You can organize quests into multiple files for better management.

```yaml
quests:
  - type: BLOCK_BREAK
    name: "stone-breaker-1"
    display-name: "Stone Breaker"
    description: "Break 500 stone blocks"
    thumbnail: STONE
    goal: 500
    auto-accept: true
    actions:
      - material: STONE
      - material: COBBLESTONE
    rewards:
      - type: message
        messages:
          - "&aYou completed the Stone Breaker quest!"
      - type: console_command
        commands:
          - "give %player% diamond 5"
```

## Configuration Options

### `type`

Specifies the type of quest. This determines how progress is tracked.

- **Required:** Yes
- **Default:** None

```yaml
type: BLOCK_BREAK
```

See [Quest Types](./quest-types) for all available types.

---

### `name`

A unique identifier for the quest. This value is used internally to track player progress and must never change once players have started the quest.

- **Required:** Yes
- **Default:** None

```yaml
name: "stone-breaker-1"
```

:::warning Important
The quest name must be **unique** across all quest files. Changing this value after players have started the quest will reset their progress!
:::

---

### `display-name`

The name shown to players in inventories and messages. Supports color codes and placeholders.

- **Required:** No
- **Default:** Uses `name` value

```yaml
display-name: "&6Stone Breaker"
```

---

### `description`

A description of the quest shown to players. Supports color codes.

- **Required:** No
- **Default:** `"no description"`

```yaml
description: "Break 500 stone blocks to complete this quest"
```

---

### `placeholder-description`

An alternative description that supports dynamic placeholders. Useful for showing remaining progress.

- **Required:** No
- **Default:** Uses `description`

```yaml
placeholder-description: "Break %quest-remaining% more stone blocks"
```

Available placeholders:
- `%quest-remaining%` - Remaining amount to complete
- `%quest-progress%` - Current progress
- `%quest-goal%` - Quest goal

---

### `thumbnail`

The material used as the quest icon in inventories.

- **Required:** No
- **Default:** None

```yaml
thumbnail: DIAMOND_PICKAXE
```

Uses [Bukkit Material names](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html).

---

### `goal`

The target amount to complete the quest.

- **Required:** Yes
- **Default:** `1`

```yaml
goal: 500
```

---

### `auto-accept`

Whether the quest automatically starts when available to the player.

- **Required:** No
- **Default:** `false`

```yaml
auto-accept: true
```

---

### `use-global-rewards`

Whether to include global rewards when the quest is completed.

- **Required:** No
- **Default:** `true`

```yaml
use-global-rewards: true
```

Set to `false` if you only want the quest-specific rewards to be given.

---

### `favorite`

Whether the quest is marked as favorite when started.

- **Required:** No
- **Default:** `false`

```yaml
favorite: true
```

---

### `can-change-favorite`

Whether players can toggle the favorite status of this quest.

- **Required:** No
- **Default:** `true`

```yaml
can-change-favorite: true
```

---

### `unique`

When enabled, progress on this quest prevents progress on other quests of the same type. Useful for story quests where only one quest should advance at a time.

- **Required:** No
- **Default:** `false`

```yaml
unique: true
```

---

### `hidden`

Whether the quest is hidden from the `ZQUESTS_HISTORY` button.

- **Required:** No
- **Default:** `false`

```yaml
hidden: true
```

---

### `custom-model-id`

Custom model ID for resource pack integration, available via the `%quest-model-id%` placeholder.

- **Required:** No
- **Default:** `0`

```yaml
custom-model-id: 1001
```

---

### `actions`

Defines what counts toward quest progress. The format depends on the quest type.

- **Required:** Depends on quest type
- **Default:** Empty list

```yaml
# For BLOCK_BREAK quests
actions:
  - material: STONE
  - material: COBBLESTONE
  - tag: LOGS  # Bukkit tags

# For ENTITY_KILL quests
actions:
  - entity: ZOMBIE
  - entity: SKELETON
```

---

### `rewards`

Actions executed when the quest is completed. Supports all zMenu actions.

- **Required:** No
- **Default:** Empty list

```yaml
rewards:
  - type: message
    messages:
      - "&aQuest completed!"
  - type: console_command
    commands:
      - "give %player% diamond 10"
  - type: sound
    sound: ENTITY_PLAYER_LEVELUP
```

See [zMenu Actions](https://docs.groupez.dev/zmenu/configurations/buttons/actions) for all available action types.

---

### `start-actions`

Actions executed when the quest starts.

- **Required:** No
- **Default:** Empty list

```yaml
start-actions:
  - type: message
    messages:
      - "&eQuest started! Good luck!"
  - type: sound
    sound: ENTITY_EXPERIENCE_ORB_PICKUP
```

---

### `permissible-rewards`

Bonus rewards given only if the player meets certain requirements.

- **Required:** No
- **Default:** Empty list

```yaml
permissible-rewards:
  - requirements:
      - type: permission
        permission: quests.vip
    actions:
      - type: message
        messages:
          - "&6VIP Bonus: Extra rewards!"
      - type: console_command
        commands:
          - "give %player% diamond 5"
```

---

### `action-requirements`

Requirements that must be met for quest progress to count. If the player doesn't meet these requirements, their actions won't advance the quest.

- **Required:** No
- **Default:** Empty list

```yaml
action-requirements:
  - type: permission
    permission: quests.can-progress
  - type: world
    world: survival
```

---

### `hologram`

Display a hologram when the quest is active. Can reference a global hologram by name or define inline.

- **Required:** No
- **Default:** None

**Reference global hologram:**
```yaml
hologram: MY_HOLOGRAM
```

**Inline definition:**
```yaml
hologram:
  location: "world,100,65,200"
  texts:
    - "&aQuest location here!"
    - "&7Follow the path..."
```

See [Waypoints & Holograms](./waypoints-holograms) for full configuration.

---

### `waypoint`

Display a waypoint guiding the player to a location. Can reference a global waypoint or define inline.

- **Required:** No
- **Default:** None

**Reference global waypoint:**
```yaml
waypoint: QUEST_LOCATION
```

**Inline definition:**
```yaml
waypoint:
  location: "world,100,65,200"
  texture: quest_marker
  color: gold
```

See [Waypoints & Holograms](./waypoints-holograms) for full configuration.

---

## Complete Example

Here's a complete quest configuration showing most options:

```yaml
quests:
  - type: BLOCK_BREAK
    name: "mining-master"
    display-name: "&6Mining Master"
    description: "Break 1000 ore blocks"
    placeholder-description: "Break %quest-remaining% more ore blocks"
    thumbnail: DIAMOND_ORE
    goal: 1000
    auto-accept: false
    use-global-rewards: true
    favorite: false
    can-change-favorite: true
    unique: false
    hidden: false
    custom-model-id: 0
    actions:
      - material: COAL_ORE
      - material: IRON_ORE
      - material: GOLD_ORE
      - material: DIAMOND_ORE
      - material: EMERALD_ORE
      - material: LAPIS_ORE
      - material: REDSTONE_ORE
      - material: COPPER_ORE
      - material: DEEPSLATE_COAL_ORE
      - material: DEEPSLATE_IRON_ORE
      - material: DEEPSLATE_GOLD_ORE
      - material: DEEPSLATE_DIAMOND_ORE
      - material: DEEPSLATE_EMERALD_ORE
      - material: DEEPSLATE_LAPIS_ORE
      - material: DEEPSLATE_REDSTONE_ORE
      - material: DEEPSLATE_COPPER_ORE
    action-requirements:
      - type: world
        world: survival
    start-actions:
      - type: message
        messages:
          - "&eYou started the Mining Master quest!"
          - "&7Break 1000 ore blocks to complete it."
    rewards:
      - type: message
        messages:
          - "&a&lQuest Completed!"
          - "&7You are now a Mining Master!"
      - type: console_command
        commands:
          - "give %player% diamond 64"
          - "eco give %player% 10000"
      - type: sound
        sound: UI_TOAST_CHALLENGE_COMPLETE
    permissible-rewards:
      - requirements:
          - type: permission
            permission: rank.vip
        actions:
          - type: message
            messages:
              - "&6&lVIP BONUS: +32 diamonds!"
          - type: console_command
            commands:
              - "give %player% diamond 32"
    hologram: MINING_AREA
    waypoint: MINING_AREA
```

## File Organization

You can organize quests into multiple files:

```
plugins/zQuests/quests/
├── beginner/
│   ├── tutorial.yml
│   └── starter-quests.yml
├── daily/
│   ├── mining.yml
│   └── farming.yml
├── story/
│   └── main-storyline.yml
└── events/
    └── halloween.yml
```

Each file should contain a `quests` list:

```yaml
# quests/beginner/tutorial.yml
quests:
  - type: BLOCK_BREAK
    name: "tutorial-1"
    # ... quest config

  - type: CRAFT
    name: "tutorial-2"
    # ... quest config
```

## Next Steps

- Learn about all [Quest Types](./quest-types)
- Configure [Rewards](./rewards)
- Set up [Waypoints & Holograms](./waypoints-holograms)
