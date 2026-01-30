---
sidebar_position: 3
title: Rewards
description: Configure rewards for quest completion in zQuests
---

# Rewards

zQuests provides a flexible reward system that allows you to reward players when they complete quests. You can use all zMenu actions as rewards, configure global rewards for all quests, and create custom rewards that trigger when specific quest combinations are completed.

## Reward Types

### Quest-Specific Rewards

Define rewards directly in a quest configuration:

```yaml
quests:
  - type: BLOCK_BREAK
    name: "stone-breaker"
    display-name: "Stone Breaker"
    goal: 100
    actions:
      - material: STONE
    rewards:
      - type: message
        messages:
          - "&aQuest completed!"
      - type: console_command
        commands:
          - "give %player% diamond 5"
      - type: sound
        sound: ENTITY_PLAYER_LEVELUP
```

### Global Rewards

Rewards that apply to **all** quest completions. Define these in `config.yml`:

```yaml
global-rewards:
  - type: message
    messages:
      - "&aYou completed the &e%name% &aquest!"
      - "&7Goal: &f%goal%"
```

**Available placeholders:**
- `%name%` - Quest display name
- `%description%` - Quest description
- `%goal%` - Quest goal amount

### Custom Rewards

Special rewards triggered when a player completes a specific combination of quests. Define in `config.yml`:

```yaml
custom-rewards:
  - quests:
      - "stone-breaker-1"
      - "stone-breaker-2"
      - "stone-breaker-3"
    actions:
      - type: message
        messages:
          - "&6&lACHIEVEMENT UNLOCKED!"
          - "&eYou completed all Stone Breaker quests!"
      - type: console_command
        commands:
          - "give %player% diamond_pickaxe 1"
```

### Permissible Rewards

Bonus rewards given only if the player meets certain requirements:

```yaml
quests:
  - type: BLOCK_BREAK
    name: "mining-quest"
    goal: 500
    actions:
      - material: STONE
    rewards:
      - type: console_command
        commands:
          - "give %player% diamond 10"
    permissible-rewards:
      - requirements:
          - type: permission
            permission: rank.vip
        actions:
          - type: message
            messages:
              - "&6VIP BONUS: +10 extra diamonds!"
          - type: console_command
            commands:
              - "give %player% diamond 10"
      - requirements:
          - type: permission
            permission: rank.mvp
        actions:
          - type: message
            messages:
              - "&bMVP BONUS: +25 extra diamonds!"
          - type: console_command
            commands:
              - "give %player% diamond 25"
```

## Available Action Types

zQuests supports all zMenu actions. Here are the most commonly used ones:

### Message

Send messages to the player:

```yaml
- type: message
  messages:
    - "&aFirst line"
    - "&bSecond line"
    - ""
    - "&7Blank line above for spacing"
```

### Console Command

Execute commands from console:

```yaml
- type: console_command
  commands:
    - "give %player% diamond 10"
    - "eco give %player% 1000"
    - "lp user %player% permission set quest.completed.%name%"
```

### Player Command

Execute commands as the player:

```yaml
- type: player_command
  commands:
    - "spawn"
    - "home"
```

### Sound

Play sounds:

```yaml
- type: sound
  sound: ENTITY_PLAYER_LEVELUP
  pitch: 1.0
  volume: 1.0
```

### Title

Display titles:

```yaml
- type: title
  title: "&6Quest Complete!"
  subtitle: "&eYou earned 10 diamonds"
  fadeIn: 20
  stay: 60
  fadeOut: 20
```

### Action Bar

Display action bar messages:

```yaml
- type: actionbar
  message: "&aQuest completed! +10 diamonds"
```

### Teleport

Teleport the player:

```yaml
- type: teleport
  location: "world,100,65,200,0,0"
```

### Give Item

Give items directly:

```yaml
- type: give_item
  item:
    material: DIAMOND_SWORD
    name: "&6Quest Reward Sword"
    lore:
      - "&7A reward for your hard work"
    enchants:
      - SHARPNESS:5
      - UNBREAKING:3
```

### Close Inventory

Close the player's inventory:

```yaml
- type: close
```

### Open Inventory

Open a zMenu inventory:

```yaml
- type: inventory
  inventory: "rewards_menu"
  plugin: "zMenu"
```

### Start Another Quest

Chain quests together:

```yaml
- type: START_QUEST
  quest: "advanced-mining-quest"
```

## Reward Order

When a quest is completed, rewards are executed in this order:

1. **Quest-specific rewards** - Defined in the quest's `rewards` section
2. **Global rewards** - If `use-global-rewards: true` (default)
3. **Permissible rewards** - If requirements are met
4. **Custom rewards** - If all required quests are completed

## Disable Global Rewards

To prevent global rewards from being given for a specific quest:

```yaml
quests:
  - type: BLOCK_BREAK
    name: "silent-quest"
    goal: 100
    use-global-rewards: false
    rewards:
      - type: message
        messages:
          - "&aThis quest has custom rewards only!"
```

## Complete Example

Here's a full configuration showing all reward types:

```yaml
# In config.yml
global-rewards:
  - type: message
    messages:
      - ""
      - "&8&m─────────────────────────"
      - "&a&lQUEST COMPLETED"
      - "&f%name%"
      - "&8&m─────────────────────────"
      - ""
  - type: sound
    sound: ENTITY_PLAYER_LEVELUP

custom-rewards:
  - quests:
      - "tutorial-1"
      - "tutorial-2"
      - "tutorial-3"
    actions:
      - type: title
        title: "&6Tutorial Complete!"
        subtitle: "&eYou're ready for adventure"
      - type: console_command
        commands:
          - "give %player% diamond_sword{display:{Name:'\"&6Starter Sword\"'}} 1"
          - "give %player% cooked_beef 64"

# In quests file
quests:
  - type: BLOCK_BREAK
    name: "tutorial-3"
    display-name: "Final Tutorial Quest"
    goal: 50
    use-global-rewards: true
    actions:
      - material: STONE
    rewards:
      - type: message
        messages:
          - "&eYou broke 50 stone blocks!"
      - type: console_command
        commands:
          - "give %player% iron_pickaxe 1"
    permissible-rewards:
      - requirements:
          - type: permission
            permission: donator
        actions:
          - type: message
            messages:
              - "&6Donator bonus: Extra tools!"
          - type: console_command
            commands:
              - "give %player% diamond_pickaxe 1"
```

## Best Practices

1. **Use global rewards sparingly** - Don't spam players with too many messages for every quest
2. **Chain quests** - Use `START_QUEST` action to create quest chains
3. **Balance rewards** - Make sure rewards match quest difficulty
4. **Test thoroughly** - Test rewards to ensure commands work correctly
5. **Use placeholders** - Make messages dynamic with quest placeholders

## Next Steps

- Learn about [Placeholders](./placeholders)
- Configure [Commands and Permissions](./commands-permissions)
- Set up [Inventories](./inventories) to display quests
