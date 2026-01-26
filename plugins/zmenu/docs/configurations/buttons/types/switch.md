---
sidebar_position: 9
title: SWITCH Button
description: Button that displays different items based on conditions
---

# SWITCH Button Type

The `SWITCH` button type displays different items based on a placeholder value. This allows you to create dynamic buttons that change appearance based on player data or other conditions.

## Usage

```yaml
items:
  toggle:
    type: SWITCH
    slot: 13
    placeholder: "%zmenu_player_value_notifications%"
    buttons:
      "true":
        item:
          material: LIME_DYE
          name: "&a&lNotifications: ON"
          lore:
            - "&7Click to disable"
        actions:
          - type: data
            action: SET
            key: "notifications"
            value: "false"
          - type: refresh

      "false":
        item:
          material: GRAY_DYE
          name: "&7&lNotifications: OFF"
          lore:
            - "&7Click to enable"
        actions:
          - type: data
            action: SET
            key: "notifications"
            value: "true"
          - type: refresh
```

## Properties

### placeholder

**Required.** The placeholder to evaluate for determining which button to display.

```yaml
placeholder: "%zmenu_player_value_setting%"
```

---

### buttons

**Required.** A map of values to button configurations. The key is the placeholder result, and the value is the button config to display.

```yaml
buttons:
  "value1":
    item:
      material: DIAMOND
    actions:
      - type: message
        messages: ["Value is 1"]
  "value2":
    item:
      material: EMERALD
    actions:
      - type: message
        messages: ["Value is 2"]
```

---

### default

Button to display when the placeholder value doesn't match any defined buttons.

```yaml
default:
  item:
    material: BARRIER
    name: "&cUnknown State"
```

## Examples

### Toggle Setting

```yaml
items:
  toggle-pvp:
    type: SWITCH
    slot: 13
    placeholder: "%zmenu_player_value_pvp_enabled%"
    buttons:
      "true":
        item:
          material: DIAMOND_SWORD
          name: "&c&lPvP: ENABLED"
          lore:
            - "&7You can be attacked by players"
            - ""
            - "&e▸ Click to disable"
          glow: true
        actions:
          - type: data
            action: SET
            key: "pvp_enabled"
            value: "false"
          - type: message
            messages:
              - "&aPvP has been disabled!"
          - type: sound
            sound: BLOCK_NOTE_BLOCK_PLING
          - type: refresh

      "false":
        item:
          material: SHIELD
          name: "&a&lPvP: DISABLED"
          lore:
            - "&7You are protected from players"
            - ""
            - "&e▸ Click to enable"
        actions:
          - type: data
            action: SET
            key: "pvp_enabled"
            value: "true"
          - type: message
            messages:
              - "&cPvP has been enabled!"
          - type: sound
            sound: ENTITY_ENDER_DRAGON_GROWL
          - type: refresh

    default:
      item:
        material: SHIELD
        name: "&a&lPvP: DISABLED"
      actions:
        - type: data
          action: SET
          key: "pvp_enabled"
          value: "true"
        - type: refresh
```

### Multi-State Button

```yaml
items:
  difficulty:
    type: SWITCH
    slot: 22
    placeholder: "%zmenu_player_value_difficulty%"
    buttons:
      "easy":
        item:
          material: LIME_WOOL
          name: "&a&lDifficulty: EASY"
          lore:
            - "&7Current: Easy mode"
            - ""
            - "&e▸ Click to change to Normal"
        actions:
          - type: data
            action: SET
            key: "difficulty"
            value: "normal"
          - type: refresh

      "normal":
        item:
          material: YELLOW_WOOL
          name: "&e&lDifficulty: NORMAL"
          lore:
            - "&7Current: Normal mode"
            - ""
            - "&e▸ Click to change to Hard"
        actions:
          - type: data
            action: SET
            key: "difficulty"
            value: "hard"
          - type: refresh

      "hard":
        item:
          material: RED_WOOL
          name: "&c&lDifficulty: HARD"
          lore:
            - "&7Current: Hard mode"
            - ""
            - "&e▸ Click to change to Easy"
        actions:
          - type: data
            action: SET
            key: "difficulty"
            value: "easy"
          - type: refresh

    default:
      item:
        material: YELLOW_WOOL
        name: "&e&lDifficulty: NORMAL"
      actions:
        - type: data
          action: SET
          key: "difficulty"
          value: "hard"
        - type: refresh
```

### Rank-Based Display

```yaml
items:
  rank-display:
    type: SWITCH
    slot: 4
    placeholder: "%luckperms_primary_group_name%"
    buttons:
      "default":
        item:
          material: COAL
          name: "&7&lMember"
          lore:
            - "&7Your current rank"

      "vip":
        item:
          material: IRON_INGOT
          name: "&a&lVIP"
          lore:
            - "&7Your current rank"
          glow: true

      "mvp":
        item:
          material: GOLD_INGOT
          name: "&6&lMVP"
          lore:
            - "&7Your current rank"
          glow: true

      "admin":
        item:
          material: DIAMOND
          name: "&b&lAdmin"
          lore:
            - "&7Your current rank"
          glow: true

    default:
      item:
        material: COAL
        name: "&7&lMember"
```

### Progress Indicator

```yaml
items:
  quest-status:
    type: SWITCH
    slot: 31
    placeholder: "%zmenu_player_value_quest_stage%"
    buttons:
      "0":
        item:
          material: PAPER
          name: "&7&lQuest: Not Started"
          lore:
            - "&7Begin your adventure!"
            - ""
            - "&e▸ Click to start"
        actions:
          - type: data
            action: SET
            key: "quest_stage"
            value: "1"
          - type: message
            messages:
              - "&aQuest started! Talk to the village elder."
          - type: refresh

      "1":
        item:
          material: WRITABLE_BOOK
          name: "&e&lQuest: In Progress"
          lore:
            - "&7Talk to the village elder"
            - ""
            - "&7Progress: &e1/3"

      "2":
        item:
          material: WRITABLE_BOOK
          name: "&e&lQuest: In Progress"
          lore:
            - "&7Collect 10 wheat"
            - ""
            - "&7Progress: &e2/3"

      "3":
        item:
          material: ENCHANTED_BOOK
          name: "&a&lQuest: Complete!"
          lore:
            - "&7Return for your reward"
            - ""
            - "&e▸ Click to claim"
          glow: true
        actions:
          - type: console-command
            commands:
              - "give %player% diamond 5"
          - type: data
            action: SET
            key: "quest_stage"
            value: "done"
          - type: message
            messages:
              - "&aYou received 5 diamonds!"
          - type: refresh

      "done":
        item:
          material: BOOK
          name: "&8&lQuest: Completed"
          lore:
            - "&7You've completed this quest"

    default:
      item:
        material: PAPER
        name: "&7&lQuest: Not Started"
```

## Important Notes

1. **Use `refresh` action** - Always include a refresh action when changing the state
2. **Quote string values** - Values like `"true"` and `"false"` need quotes
3. **Provide default** - Always define a default for unexpected values
4. **Player data integration** - Works great with `%zmenu_player_value_*%` placeholders

## Common Use Cases

- Toggle settings (on/off)
- Multi-option selectors
- Progress indicators
- Rank-based displays
- State machines
- Conditional rewards

## Best Practices

1. **Always refresh** after state changes
2. **Use descriptive keys** for player data
3. **Provide visual feedback** (sounds, messages)
4. **Include default state** for new players
5. **Use clear visual distinction** between states

## Related Features

- [Player Data](../../player-data) - Store player-specific values
- [Placeholders](../../placeholders) - Dynamic values
- [Actions](../actions) - Execute on click

## Next Steps

- Learn about [Player Data](../../player-data) for storing states
- See all available [Actions](../actions)
- View other [Button Types](./none)
