---
sidebar_position: 8
title: Patterns
description: Create reusable button templates for your inventories
---

# Patterns

Patterns are reusable button templates that can be applied to multiple inventories. They help reduce duplication and maintain consistency across your menus.

## File Location

Patterns are stored in `plugins/zMenu/patterns/`.

## Basic Pattern Structure

```yaml
# patterns/my_pattern.yml
name: "my_pattern"
size: 54

items:
  border-top:
    slots:
      - 0-8
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"

  border-bottom:
    slots:
      - 45-53
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"
```

## Using Patterns in Inventories

Reference patterns in your inventory file:

```yaml
# inventories/shop.yml
name: "&6Shop"
size: 54
patterns:
  - "my_pattern"

items:
  # Your inventory-specific items...
```

## Pattern Variables

Patterns can use variables that are replaced when applied:

### Defining Variable Slots

```yaml
# patterns/template.yml
name: "template"
size: 54

items:
  dynamic-button:
    slot: "%slot%"
    item:
      material: "%material%"
      name: "%name%"
      lore:
        - "%description%"
```

### Using Variables in Inventory

```yaml
# inventories/my_menu.yml
patterns:
  - pattern:
      file-name: "template"
      slot: 13
      material: "DIAMOND"
      name: "&b&lMy Item"
      description: "&7This is my custom item"
```

## Examples

### Navigation Bar Pattern

```yaml
# patterns/navigation.yml
name: "navigation"
size: 54

items:
  nav-back:
    type: BACK
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&l← Back"
    sound: UI_BUTTON_CLICK

  nav-previous:
    type: PREVIOUS
    slot: 48
    is-permanent: true
    item:
      material: ARROW
      name: "&7Previous"
    sound: UI_BUTTON_CLICK

  nav-page:
    slot: 49
    is-permanent: true
    item:
      material: PAPER
      name: "&e&lPage %page%/%max-page%"

  nav-next:
    type: NEXT
    slot: 50
    is-permanent: true
    item:
      material: ARROW
      name: "&7Next"
    sound: UI_BUTTON_CLICK

  nav-close:
    slot: 53
    is-permanent: true
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lClose"
    sound: UI_BUTTON_CLICK
```

Usage:
```yaml
# inventories/shop.yml
name: "&6Shop"
size: 54
patterns:
  - "navigation"
```

### Border Pattern

```yaml
# patterns/border.yml
name: "border"
size: 54

items:
  border:
    slots:
      - 0-8
      - 9
      - 17
      - 18
      - 26
      - 27
      - 35
      - 36
      - 44
      - 45-53
    item:
      material: GRAY_STAINED_GLASS_PANE
      name: "&8"
```

### Glass Border with Color Variable

```yaml
# patterns/colored_border.yml
name: "colored_border"
size: 54

items:
  border:
    slots:
      - 0-8
      - 45-53
    item:
      material: "%color%_STAINED_GLASS_PANE"
      name: "&8"
```

Usage:
```yaml
patterns:
  - pattern:
      file-name: "colored_border"
      color: "BLUE"
```

### Reward Pattern

```yaml
# patterns/reward_button.yml
name: "reward_button"
size: 54

items:
  reward:
    slot: "%slot%"
    item:
      material: "%material%"
      name: "%name%"
      lore:
        - "&7Click to claim!"
        - ""
        - "&7Reward: &a%reward_desc%"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_value_%key%_claimed%"
          compare: "!="
          target: "true"
          deny:
            - type: message
              messages:
                - "&cYou already claimed this reward!"
      success:
        - type: data
          action: SET
          key: "%key%_claimed"
          value: "true"
        - type: console-command
          commands:
            - "%reward_command%"
        - type: message
          messages:
            - "&aReward claimed!"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
        - type: refresh
```

Usage:
```yaml
patterns:
  - pattern:
      file-name: "reward_button"
      slot: 11
      material: "DIAMOND"
      name: "&b&lDiamond Reward"
      reward_desc: "5 Diamonds"
      key: "diamond_reward"
      reward_command: "give %player% diamond 5"

  - pattern:
      file-name: "reward_button"
      slot: 13
      material: "GOLD_INGOT"
      name: "&6&lGold Reward"
      reward_desc: "32 Gold Ingots"
      key: "gold_reward"
      reward_command: "give %player% gold_ingot 32"

  - pattern:
      file-name: "reward_button"
      slot: 15
      material: "EMERALD"
      name: "&a&lEmerald Reward"
      reward_desc: "16 Emeralds"
      key: "emerald_reward"
      reward_command: "give %player% emerald 16"
```

## Multiple Patterns

Apply multiple patterns to one inventory:

```yaml
name: "&6My Menu"
size: 54
patterns:
  - "border"
  - "navigation"
  - pattern:
      file-name: "header"
      title: "Welcome!"
```

Patterns are applied in order, so later patterns can override earlier ones.

## Action Patterns

Default actions that apply to all buttons (unless they define their own):

```yaml
# actions_patterns/default-actions.yml
actions:
  - type: sound
    sound: UI_BUTTON_CLICK

deny-actions:
  - type: sound
    sound: ENTITY_VILLAGER_NO
```

These apply automatically to:
- `actions`: When a button is clicked successfully
- `deny-actions`: When a requirement is denied

## Pattern from Another Plugin

Reference patterns from other plugins:

```yaml
patterns:
  - pattern:
      file-name: "pattern_name"
      plugin-name: "OtherPlugin"
```

## Best Practices

1. **Create patterns for repeated elements**: Navigation bars, borders, common buttons
2. **Use descriptive names**: `navigation`, `shop_border`, `reward_template`
3. **Keep patterns focused**: One pattern, one purpose
4. **Use variables**: Make patterns flexible and reusable
5. **Document patterns**: Add comments explaining what variables are needed
6. **Test individually**: Test patterns before using in production

## Pattern Structure

```
plugins/zMenu/patterns/
├── navigation.yml      # Navigation bar
├── borders/
│   ├── simple.yml      # Simple border
│   ├── fancy.yml       # Decorated border
│   └── colored.yml     # Color variable border
└── buttons/
    ├── reward.yml      # Reward button template
    └── toggle.yml      # Toggle button template
```

## Reloading Patterns

```
/zm reload
```

Patterns are loaded when the plugin starts and when you reload.

## Next Steps

- Learn about [Player Data](./player-data) for persistent storage
- See [Actions](./buttons/actions) for button interactions
- Configure [Custom Commands](./custom-commands) to open inventories
