---
sidebar_position: 6
title: Inventories
description: Configure quest inventories using zMenu
---

# Inventories

zQuests uses zMenu for all inventory displays. This allows you to fully customize how quests are presented to players using zMenu's powerful configuration system.

## Default Inventory

When players use `/quests`, the inventory specified in `config.yml` opens:

```yaml
# Name of the file to open the inventory with the main command
main-command-inventory-name: "quests"
```

This opens `plugins/zQuests/inventories/quests.yml`.

## Custom Buttons

zQuests provides custom button types for displaying quest information.

### ZQUESTS_COMPLETE

Check if a list of quests is complete and display different items accordingly.

```yaml
items:
  milestone-reward:
    type: ZQUESTS_COMPLETE
    slot: 22
    quests:
      - "tutorial-1"
      - "tutorial-2"
      - "tutorial-3"
    # Item shown when ALL quests are complete
    item:
      material: NETHER_STAR
      name: "&6&lMilestone Complete!"
      lore:
        - "&7You've completed all tutorial quests!"
        - ""
        - "&aClick to claim your reward!"
    actions:
      - type: console_command
        commands:
          - "give %player% diamond 10"
      - type: message
        messages:
          - "&aReward claimed!"
    # Item shown when quests are NOT complete
    else:
      item:
        material: BARRIER
        name: "&c&lMilestone Locked"
        lore:
          - "&7Complete all tutorial quests"
          - "&7to unlock this reward!"
          - ""
          - "&cQuests remaining: 3"
```

### ZQUESTS_ACTIVE

Display active quests with pagination support.

```yaml
items:
  active-quests:
    type: ZQUESTS_ACTIVE
    slots:
      - 10-16
      - 19-25
      - 28-34
    # Item template for each active quest
    item:
      material: "%quest-thumbnail%"
      name: "&6%quest-display-name%"
      lore:
        - "&7%quest-description%"
        - ""
        - "%quest-lore-line%"
        - ""
        - "&eClick for options"
```

### ZQUESTS_NOT_ACTIVE

Display quests that haven't been started yet.

```yaml
items:
  available-quests:
    type: ZQUESTS_NOT_ACTIVE
    slots:
      - 10-16
      - 19-25
    item:
      material: "%quest-thumbnail%"
      name: "&e%quest-display-name%"
      lore:
        - "&7%quest-description%"
        - ""
        - "&aClick to start!"
    actions:
      - type: START_QUEST
        quest: "%quest-name%"
```

### ZQUESTS_HISTORY

Display completed quests history.

```yaml
items:
  quest-history:
    type: ZQUESTS_HISTORY
    slots:
      - 10-16
      - 19-25
    item:
      material: "%quest-thumbnail%"
      name: "&a%quest-display-name% &7(Completed)"
      lore:
        - "&7%quest-description%"
        - ""
        - "&aCompleted on: %quest-completed-date%"
```

### ZQUESTS_FAVORITE

Display favorite quests.

```yaml
items:
  favorites:
    type: ZQUESTS_FAVORITE
    slots:
      - 10-16
    item:
      material: "%quest-thumbnail%"
      name: "&6⭐ %quest-display-name%"
      lore:
        - "&7%quest-description%"
        - ""
        - "%quest-lore-line%"
```

### CHANGE_QUEST_GROUP

Button to switch between quest groups.

```yaml
items:
  group-selector:
    type: CHANGE_QUEST_GROUP
    slot: 49
    groups:
      - "mining"
      - "farming"
      - "combat"
    item:
      material: COMPASS
      name: "&eChange Category"
      lore:
        - "&7Current: %current-group%"
        - ""
        - "&aClick to switch"
```

### SET_FAVORITE_LIMIT

Button to modify favorite quest limit.

```yaml
items:
  increase-limit:
    type: ADD_FAVORITE_LIMIT
    slot: 52
    amount: 1
    item:
      material: EMERALD
      name: "&aIncrease Favorite Limit"
      lore:
        - "&7Current limit: %favorite-limit%"
        - ""
        - "&eClick to add +1"

  decrease-limit:
    type: REMOVE_FAVORITE_LIMIT
    slot: 46
    amount: 1
    item:
      material: REDSTONE
      name: "&cDecrease Favorite Limit"
      lore:
        - "&7Current limit: %favorite-limit%"
```

### SET_FAVORITE_TYPE

Button to change favorite display type.

```yaml
items:
  favorite-type:
    type: SET_FAVORITE_TYPE
    slot: 4
    favorite-type: ALL  # ALL, ACTIVE, COMPLETED
    item:
      material: GOLD_INGOT
      name: "&6Set Favorite Type"
      lore:
        - "&7Click to change display type"
```

## Custom Actions

### START_QUEST

Start a quest from a button click:

```yaml
actions:
  - type: START_QUEST
    quest: "stone-breaker-1"
```

Use with quest placeholders for dynamic starts:

```yaml
# In a ZQUESTS_NOT_ACTIVE button
actions:
  - type: START_QUEST
    quest: "%quest-name%"
```

## Quest Placeholders in Inventories

When using quest button types, these placeholders are available:

| Placeholder | Description |
|-------------|-------------|
| `%quest-name%` | Internal quest name |
| `%quest-display-name%` | Display name |
| `%quest-description%` | Quest description |
| `%quest-thumbnail%` | Thumbnail material |
| `%quest-type%` | Quest type |
| `%quest-goal%` | Quest goal |
| `%quest-progress%` | Current progress |
| `%quest-lore-line%` | Formatted progress line |
| `%quest-progress-bar%` | Visual progress bar |
| `%quest-percent%` | Completion percentage |
| `%quest-remaining%` | Remaining amount |
| `%quest-model-id%` | Custom model ID |
| `%quest-completed-date%` | Completion date |
| `%quest-global-group-name%` | Group name |

## Complete Inventory Example

```yaml
# plugins/zQuests/inventories/quests.yml
name: "&8&lQuests"
size: 54

items:
  # Decorative border
  border:
    type: NONE
    slots:
      - 0-9
      - 17
      - 18
      - 26
      - 27
      - 35
      - 36
      - 44-53
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: " "

  # Category tabs
  all-quests:
    slot: 2
    item:
      material: BOOK
      name: "&6All Quests"
      lore:
        - "&7View all available quests"
    actions:
      - type: inventory
        inventory: "quests_all"

  active-tab:
    slot: 3
    item:
      material: WRITABLE_BOOK
      name: "&aActive Quests"
      lore:
        - "&7View your active quests"
    actions:
      - type: inventory
        inventory: "quests_active"

  completed-tab:
    slot: 4
    item:
      material: ENCHANTED_BOOK
      name: "&bCompleted Quests"
      lore:
        - "&7View completed quests"
    actions:
      - type: inventory
        inventory: "quests_history"

  favorites-tab:
    slot: 5
    item:
      material: NETHER_STAR
      name: "&6⭐ Favorites"
      lore:
        - "&7View favorite quests"
    actions:
      - type: inventory
        inventory: "quests_favorites"

  # Active quests display
  active-quests:
    type: ZQUESTS_ACTIVE
    slots:
      - 10-16
      - 19-25
      - 28-34
    item:
      material: "%quest-thumbnail%"
      name: "&6%quest-display-name%"
      lore:
        - ""
        - "&7%quest-description%"
        - ""
        - "%quest-lore-line%"
        - ""
        - "&8Type: &7%quest-type%"
        - ""
        - "&eLeft-click &7for details"
        - "&eRight-click &7to toggle favorite"

  # Pagination
  previous-page:
    type: PREVIOUS
    slot: 48
    item:
      material: ARROW
      name: "&cPrevious Page"
    view-requirement:
      requirements:
        - type: placeholder
          placeholder: "%page%"
          value: "1"
          action: SUPERIOR

  next-page:
    type: NEXT
    slot: 50
    item:
      material: ARROW
      name: "&aNext Page"
    view-requirement:
      requirements:
        - type: placeholder
          placeholder: "%page%"
          value: "%maxPage%"
          action: INFERIOR

  # Page indicator
  page-info:
    slot: 49
    item:
      material: PAPER
      name: "&ePage %page%/%maxPage%"
      lore:
        - "&7Click to refresh"
    actions:
      - type: refresh

  # Close button
  close:
    slot: 53
    item:
      material: BARRIER
      name: "&cClose"
    actions:
      - type: close
```

## Multiple Inventory Files

Organize your inventories:

```
plugins/zQuests/inventories/
├── quests.yml           # Main quest menu
├── quests_all.yml       # All quests view
├── quests_active.yml    # Active quests only
├── quests_history.yml   # Completed quests
├── quests_favorites.yml # Favorite quests
└── quest_details.yml    # Individual quest view
```

## Tips

1. **Use patterns** - Create reusable patterns for borders and navigation
2. **Add animations** - Use zMenu's update feature for live progress updates
3. **Filter by group** - Create separate inventories for different quest categories
4. **Mobile-friendly** - Keep important buttons in easy-to-reach slots

## Next Steps

- Configure [Waypoints & Holograms](./waypoints-holograms)
- Learn about [Quest Types](./quest-types)
- See [zMenu Documentation](https://docs.groupez.dev/zmenu) for more inventory options
