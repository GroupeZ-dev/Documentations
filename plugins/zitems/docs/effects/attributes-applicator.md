---
sidebar_position: 14
title: Attributes Applicator
description: Add or modify item attributes
---

# Attributes Applicator Effect

The `ATTRIBUTES_APPLICATOR` effect allows you to create items that add or modify attributes on other items. This is perfect for creating attribute runes, stat boosters, or equipment upgrade items.

## Configuration

```yaml
effects:
  - type: ATTRIBUTES_APPLICATOR
    attributes:
      - attribute: ATTACK_DAMAGE
        operation: ADD_NUMBER
        amount: 10.0
        slot: HAND
      - attribute: ATTACK_SPEED
        operation: ADD_NUMBER
        amount: 2.0
        slot: HAND

    # Merge strategy for existing attributes
    strategy: ADD  # ADD, REPLACE, KEEP_HIGHEST, KEEP_LOWEST, SUM

    # Optional: Restrict which items can have this effect
    applicable-materials:
      - DIAMOND_SWORD
      - NETHERITE_SWORD
    applicable-tags:
      - SWORDS
    applicability-blacklisted: false
```

## Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `attributes` | List | Yes | - | List of attributes to apply |
| `strategy` | Enum | No | `ADD` | How to merge with existing attributes |
| `applicable-materials` | List | No | - | Items that can have this effect |
| `applicable-tags` | List | No | - | Item tags |
| `applicability-blacklisted` | Boolean | No | `false` | Invert applicability |

### Attribute Parameters

Each attribute entry supports:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `attribute` | String | Yes | The attribute type |
| `operation` | Enum | Yes | How the value is applied |
| `amount` | Double | Yes | The attribute value |
| `slot` | Enum | No | Equipment slot restriction |

## Merge Strategies

| Strategy | Description |
|----------|-------------|
| `ADD` | Add new attributes while keeping existing ones |
| `REPLACE` | Replace all existing attributes with new ones |
| `KEEP_HIGHEST` | Keep only the highest value for each attribute |
| `KEEP_LOWEST` | Keep only the lowest value for each attribute |
| `SUM` | Sum modifiers with same attribute and operation |

## Available Attributes

### Combat Attributes
| Attribute | Description |
|-----------|-------------|
| `ATTACK_DAMAGE` | Melee damage dealt |
| `ATTACK_SPEED` | Attack cooldown speed |
| `ATTACK_KNOCKBACK` | Knockback on hit |

### Defense Attributes
| Attribute | Description |
|-----------|-------------|
| `ARMOR` | Damage reduction |
| `ARMOR_TOUGHNESS` | Armor effectiveness vs strong attacks |
| `KNOCKBACK_RESISTANCE` | Resistance to knockback |

### Movement Attributes
| Attribute | Description |
|-----------|-------------|
| `MOVEMENT_SPEED` | Walking speed |
| `FLYING_SPEED` | Flight speed (creative) |
| `JUMP_STRENGTH` | Jump height |
| `SAFE_FALL_DISTANCE` | Fall distance before damage |
| `FALL_DAMAGE_MULTIPLIER` | Fall damage multiplier |
| `STEP_HEIGHT` | Auto-step height |

### Health & Combat
| Attribute | Description |
|-----------|-------------|
| `MAX_HEALTH` | Maximum health |
| `SCALE` | Entity size scale |
| `GRAVITY` | Gravity strength |
| `BURNING_TIME` | Time on fire |
| `EXPLOSION_KNOCKBACK_RESISTANCE` | Explosion knockback resistance |
| `OXYGEN_BONUS` | Underwater breathing bonus |
| `WATER_MOVEMENT_EFFICIENCY` | Swimming speed |
| `BLOCK_BREAK_SPEED` | Mining speed |
| `BLOCK_INTERACTION_RANGE` | Block reach distance |
| `ENTITY_INTERACTION_RANGE` | Entity reach distance |
| `LUCK` | Luck stat |
| `FOLLOW_RANGE` | Entity follow range |

### Minecraft 1.21+ Attributes
| Attribute | Description |
|-----------|-------------|
| `MINING_EFFICIENCY` | Mining speed multiplier |
| `SNEAKING_SPEED` | Sneaking speed |
| `SUBMERGED_MINING_SPEED` | Underwater mining speed |
| `SWEEPING_DAMAGE_RATIO` | Sweep attack damage ratio |

## Operations

| Operation | Formula | Description |
|-----------|---------|-------------|
| `ADD_NUMBER` | Base + Value | Adds flat amount |
| `ADD_SCALAR` | Base * (1 + Value) | Adds percentage |
| `MULTIPLY_SCALAR_1` | Base * Value | Multiplies by value |

## Equipment Slots

| Slot | Description |
|------|-------------|
| `HAND` | Main hand |
| `OFF_HAND` | Off hand |
| `HEAD` | Helmet slot |
| `CHEST` | Chestplate slot |
| `LEGS` | Leggings slot |
| `FEET` | Boots slot |
| `ARMOR` | Any armor slot |
| `BODY` | Body slot (for horses/armor stands) |
| `ANY` | Any equipment slot |

## Examples

### Damage Boost Rune

```yaml
damage_rune:
  material: BLAZE_POWDER
  display-name: "<gradient:#ff4500:#ff0000>Damage Rune</gradient>"
  lore:
    - ""
    - "<gray>Increases attack damage.</gray>"
    - ""
    - "<red>+10 Attack Damage</red>"

  effects:
    - type: ATTRIBUTES_APPLICATOR
      attributes:
        - attribute: ATTACK_DAMAGE
          operation: ADD_NUMBER
          amount: 10.0
          slot: HAND

      applicable-tags:
        - SWORDS
        - AXES

      representation:
        material: BLAZE_POWDER
        display-name: "<gradient:#ff4500:#ff0000>Damage Rune</gradient>"
        lore:
          - ""
          - "<gray>Apply in smithing table</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Speed Boost Gem

```yaml
speed_gem:
  material: EMERALD
  display-name: "<gradient:#00ff00:#00aa00>Speed Gem</gradient>"
  lore:
    - ""
    - "<gray>Increases movement speed.</gray>"
    - ""
    - "<green>+20% Movement Speed</green>"

  effects:
    - type: ATTRIBUTES_APPLICATOR
      attributes:
        - attribute: MOVEMENT_SPEED
          operation: ADD_SCALAR
          amount: 0.2
          slot: FEET

      strategy: ADD

      applicable-materials:
        - NETHERITE_BOOTS
        - DIAMOND_BOOTS
        - IRON_BOOTS

      representation:
        material: EMERALD
        display-name: "<gradient:#00ff00:#00aa00>Speed Gem</gradient>"
        lore:
          - ""
          - "<gray>Apply to boots</gray>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Warrior's Essence

```yaml
warrior_essence:
  material: NETHER_STAR
  display-name: "<gradient:#ffd700:#ff8c00>Warrior's Essence</gradient>"
  lore:
    - ""
    - "<gray>The essence of a true warrior.</gray>"
    - ""
    - "<yellow>Combat Attributes:</yellow>"
    - "<gray>+15 Attack Damage</gray>"
    - "<gray>+50% Attack Speed</gray>"
    - "<gray>+2 Attack Knockback</gray>"

  effects:
    - type: ATTRIBUTES_APPLICATOR
      attributes:
        - attribute: ATTACK_DAMAGE
          operation: ADD_NUMBER
          amount: 15.0
          slot: HAND
        - attribute: ATTACK_SPEED
          operation: ADD_SCALAR
          amount: 0.5
          slot: HAND
        - attribute: ATTACK_KNOCKBACK
          operation: ADD_NUMBER
          amount: 2.0
          slot: HAND

      strategy: ADD

      applicable-tags:
        - SWORDS

      representation:
        material: NETHER_STAR
        display-name: "<gradient:#ffd700:#ff8c00>Warrior's Essence</gradient>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Tank Armor Upgrade

```yaml
tank_upgrade:
  material: IRON_BLOCK
  display-name: "<gradient:#808080:#696969>Tank Upgrade</gradient>"
  lore:
    - ""
    - "<gray>Become an unstoppable tank!</gray>"
    - ""
    - "<white>Defense Attributes:</white>"
    - "<gray>+10 Armor</gray>"
    - "<gray>+5 Armor Toughness</gray>"
    - "<gray>+50% Knockback Resistance</gray>"
    - "<gray>+10 Max Health</gray>"

  effects:
    - type: ATTRIBUTES_APPLICATOR
      attributes:
        - attribute: ARMOR
          operation: ADD_NUMBER
          amount: 10.0
          slot: CHEST
        - attribute: ARMOR_TOUGHNESS
          operation: ADD_NUMBER
          amount: 5.0
          slot: CHEST
        - attribute: KNOCKBACK_RESISTANCE
          operation: ADD_SCALAR
          amount: 0.5
          slot: CHEST
        - attribute: MAX_HEALTH
          operation: ADD_NUMBER
          amount: 10.0
          slot: CHEST

      strategy: ADD

      applicable-materials:
        - NETHERITE_CHESTPLATE
        - DIAMOND_CHESTPLATE

      representation:
        material: IRON_BLOCK
        display-name: "<gradient:#808080:#696969>Tank Upgrade</gradient>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Miner's Blessing

```yaml
miner_blessing:
  material: GOLDEN_PICKAXE
  display-name: "<gradient:#ffd700:#daa520>Miner's Blessing</gradient>"
  lore:
    - ""
    - "<gray>Blessed by the mining gods.</gray>"
    - ""
    - "<yellow>Mining Attributes:</yellow>"
    - "<gray>+50% Block Break Speed</gray>"
    - "<gray>+2 Block Reach</gray>"

  effects:
    - type: ATTRIBUTES_APPLICATOR
      attributes:
        - attribute: BLOCK_BREAK_SPEED
          operation: ADD_SCALAR
          amount: 0.5
          slot: HAND
        - attribute: BLOCK_INTERACTION_RANGE
          operation: ADD_NUMBER
          amount: 2.0
          slot: HAND

      strategy: ADD

      applicable-tags:
        - PICKAXES

      representation:
        material: GOLDEN_PICKAXE
        display-name: "<gradient:#ffd700:#daa520>Miner's Blessing</gradient>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Replace Strategy Example

```yaml
perfect_stats:
  material: DIAMOND
  display-name: "<aqua>Perfect Stats Crystal</aqua>"
  lore:
    - ""
    - "<gray>Replaces all attributes with</gray>"
    - "<gray>perfect balanced stats.</gray>"

  effects:
    - type: ATTRIBUTES_APPLICATOR
      strategy: REPLACE  # Removes existing attributes!

      attributes:
        - attribute: ATTACK_DAMAGE
          operation: ADD_NUMBER
          amount: 20.0
          slot: HAND
        - attribute: ATTACK_SPEED
          operation: ADD_NUMBER
          amount: 4.0
          slot: HAND

      applicable-tags:
        - SWORDS

      representation:
        material: DIAMOND
        display-name: "<aqua>Perfect Stats Crystal</aqua>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
```

### Craftable Speed Boots Upgrade

```yaml
swiftness_crystal:
  material: PRISMARINE_SHARD
  display-name: "<gradient:#00ffff:#1e90ff>Swiftness Crystal</gradient>"
  lore:
    - ""
    - "<gray>Enhances boot speed.</gray>"
    - ""
    - "<aqua>+30% Movement Speed</aqua>"
    - "<aqua>+20% Jump Strength</aqua>"

  effects:
    - type: ATTRIBUTES_APPLICATOR
      attributes:
        - attribute: MOVEMENT_SPEED
          operation: ADD_SCALAR
          amount: 0.3
          slot: FEET
        - attribute: JUMP_STRENGTH
          operation: ADD_SCALAR
          amount: 0.2
          slot: FEET

      strategy: ADD

      applicable-materials:
        - NETHERITE_BOOTS
        - DIAMOND_BOOTS
        - IRON_BOOTS
        - GOLDEN_BOOTS
        - CHAINMAIL_BOOTS
        - LEATHER_BOOTS

      representation:
        material: PRISMARINE_SHARD
        display-name: "<gradient:#00ffff:#1e90ff>Swiftness Crystal</gradient>"

        applicator-type: SMITHING_TABLE
        template:
          item: NETHERITE_UPGRADE_SMITHING_TEMPLATE

  recipe:
    type: SHAPED
    pattern:
      - "PEP"
      - "ESE"
      - "PEP"
    ingredients:
      - item: PRISMARINE_SHARD
        sign: P
      - item: EMERALD
        sign: E
      - item: SUGAR
        sign: S
```

## Use Cases

1. **Stat Upgrades**: Allow players to customize item stats
2. **Progression System**: Tiered attribute upgrades
3. **Class Items**: Role-specific stat modifiers
4. **Balance Tools**: Items that normalize stats (REPLACE strategy)
5. **Event Rewards**: Powerful stat boosters

## Strategy Comparison

```yaml
# ADD - Keeps existing + adds new
strategy: ADD
# Result: Item has both old and new attributes

# REPLACE - Removes all, adds new
strategy: REPLACE
# Result: Only new attributes remain

# KEEP_HIGHEST - Keeps highest for each attribute
strategy: KEEP_HIGHEST
# Result: For each attribute, only the highest value is kept

# SUM - Combines same attribute+operation
strategy: SUM
# Result: +5 damage + +3 damage = +8 damage
```

## Tips

- Use `ADD` for stacking upgrades
- Use `REPLACE` for setting exact values
- Use `KEEP_HIGHEST` for best-in-slot systems
- Use `SUM` for cumulative upgrades
- Consider balance when setting attribute values
- Test with different equipment slots
- Combine with crafting recipes for balanced acquisition
