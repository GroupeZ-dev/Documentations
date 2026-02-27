---
sidebar_position: 1
title: Item Configuration
description: Complete guide to creating custom items in zItems
---

# Item Configuration

This guide explains how to create and configure custom items in zItems with detailed examples for every configuration option.

## File Structure

Items are stored in `plugins/zItems/items/`. You can organize items in subdirectories:

```
plugins/zItems/items/
├── weapons/
│   ├── legendary_sword.yml
│   └── vein_pickaxe.yml
├── tools/
│   ├── farming_hoe.yml
│   └── hammer.yml
├── armor/
│   ├── knight_set.yml
│   └── mage_robes.yml
└── misc/
    ├── magic_food.yml
    └── sell_stick.yml
```

Each YAML file can contain **one or multiple items**:

```yaml
# Single item (item ID = filename without extension)
material: DIAMOND_SWORD
display-name: "My Sword"

# OR multiple items in one file
sword_tier1:
  material: IRON_SWORD
  display-name: "Iron Blade"

sword_tier2:
  material: DIAMOND_SWORD
  display-name: "Diamond Blade"
```

---

## Base Item Properties

### material

**Required.** The base Minecraft material for the item.

```yaml
material: DIAMOND_SWORD
```

You can also reference another zItems item:

```yaml
item-id: "legendary_sword"
```

---

### display-name

The custom display name of the item. Supports MiniMessage format.

```yaml
display-name: "<gradient:#FF5500:#FFAA00>Legendary Sword</gradient>"
```

**Examples:**

```yaml
# Simple color
display-name: "<gold>Golden Sword</gold>"

# Gradient
display-name: "<gradient:#ff6b6b:#feca57>Fire Blade</gradient>"

# With decorations
display-name: "<bold><red>EPIC WEAPON</red></bold>"

# Rainbow
display-name: "<rainbow>Rainbow Sword</rainbow>"

# With placeholders
display-name: "<yellow>%player%'s Sword</yellow>"
```

---

### item-name

The internal item name (different from display-name). Used for stacking behavior.

```yaml
item-name: "legendary_sword_v1"
```

---

### lore

Description lines displayed on the item.

```yaml
lore:
  - ""
  - "<gray>A powerful weapon forged in</gray>"
  - "<gray>the depths of the nether.</gray>"
  - ""
  - "<yellow>Stats:</yellow>"
  - "<gray>- Damage: <red>+15</red></gray>"
  - "<gray>- Speed: <green>+1.6</green></gray>"
  - ""
  - "<dark_purple><italic>Right-click for special ability!</italic></dark_purple>"
```

---

### amount

Default stack size when giving the item. Default: `1`

```yaml
amount: 64
```

---

## Enchantments

### enchantments

Add enchantments to the item.

```yaml
enchantments:
  - enchantment: SHARPNESS
    level: 5
  - enchantment: FIRE_ASPECT
    level: 2
  - enchantment: UNBREAKING
    level: 3
  - enchantment: MENDING
    level: 1
```

**Complete Example - Ultimate Sword:**

```yaml
ultimate_sword:
  material: NETHERITE_SWORD
  display-name: "<gradient:#ff0000:#ff8800>Ultimate Sword</gradient>"
  lore:
    - ""
    - "<gray>The most powerful sword</gray>"
    - "<gray>in existence.</gray>"

  enchantments:
    - enchantment: SHARPNESS
      level: 10
    - enchantment: FIRE_ASPECT
      level: 3
    - enchantment: SWEEPING_EDGE
      level: 5
    - enchantment: LOOTING
      level: 5
    - enchantment: UNBREAKING
      level: 5
    - enchantment: MENDING
      level: 1
    - enchantment: KNOCKBACK
      level: 2
```

---

### disabled-enchantments

Prevent specific enchantments from being added to the item.

```yaml
disabled-enchantments:
  - enchantment: MENDING
  - enchantment: UNBREAKING
```

This prevents players from adding these enchantments via anvil or enchanting table.

---

## Attributes

### attributes

Add attribute modifiers to the item.

```yaml
attributes:
  - attribute: ATTACK_DAMAGE
    operation: ADD_NUMBER
    amount: 15.0
    slot: MAINHAND

  - attribute: ATTACK_SPEED
    operation: ADD_NUMBER
    amount: 1.6
    slot: MAINHAND

  - attribute: MOVEMENT_SPEED
    operation: ADD_SCALAR
    amount: 0.1
    slot: ANY
```

**Available Attributes:**

| Attribute | Description |
|-----------|-------------|
| `ARMOR` | Armor points |
| `ARMOR_TOUGHNESS` | Armor toughness |
| `ATTACK_DAMAGE` | Attack damage |
| `ATTACK_KNOCKBACK` | Knockback strength |
| `ATTACK_SPEED` | Attack speed |
| `BLOCK_BREAK_SPEED` | Mining speed |
| `BLOCK_INTERACTION_RANGE` | Interaction reach |
| `BURNING_TIME` | Fire duration |
| `ENTITY_INTERACTION_RANGE` | Entity reach |
| `EXPLOSION_KNOCKBACK_RESISTANCE` | Explosion resistance |
| `FALL_DAMAGE_MULTIPLIER` | Fall damage modifier |
| `FLYING_SPEED` | Creative flying speed |
| `JUMP_STRENGTH` | Jump height |
| `KNOCKBACK_RESISTANCE` | Knockback resistance |
| `LUCK` | Luck value |
| `MAX_ABSORPTION` | Max absorption hearts |
| `MAX_HEALTH` | Max health |
| `MINING_EFFICIENCY` | Mining efficiency |
| `MOVEMENT_EFFICIENCY` | Movement on blocks |
| `MOVEMENT_SPEED` | Movement speed |
| `OXYGEN_BONUS` | Underwater breathing |
| `SAFE_FALL_DISTANCE` | Safe fall distance |
| `SCALE` | Player scale |
| `SNEAKING_SPEED` | Sneak speed |
| `STEP_HEIGHT` | Step height |
| `SUBMERGED_MINING_SPEED` | Underwater mining |
| `SWEEPING_DAMAGE_RATIO` | Sweeping edge ratio |
| `TEMPT_RANGE` | Animal tempt range |
| `WATER_MOVEMENT_EFFICIENCY` | Swim speed |

**Operations:**

| Operation | Description | Example |
|-----------|-------------|---------|
| `ADD_NUMBER` | Add flat value | `+5 damage` |
| `ADD_SCALAR` | Add percentage | `+10% speed` |
| `MULTIPLY_SCALAR_1` | Multiply total | `x1.5 damage` |

**Equipment Slots:**

| Slot | Description |
|------|-------------|
| `ANY` | Any slot |
| `MAINHAND` | Main hand |
| `OFFHAND` | Off hand |
| `HEAD` | Helmet slot |
| `CHEST` | Chestplate slot |
| `LEGS` | Leggings slot |
| `FEET` | Boots slot |
| `HAND` | Either hand |
| `ARMOR` | Any armor slot |
| `BODY` | Body slot (horses) |

---

### attribute-merge-strategy

How to handle attributes when effects add more attributes. Default: `ADD`

```yaml
attribute-merge-strategy: ADD  # ADD, REPLACE, or IGNORE
```

| Strategy | Description |
|----------|-------------|
| `ADD` | Add effect attributes to existing ones |
| `REPLACE` | Replace existing attributes with effect ones |
| `IGNORE` | Keep existing attributes, ignore effect ones |

---

## Item Properties

### rarity

Set the item rarity (affects tooltip color).

```yaml
rarity: EPIC
```

**Available Rarities:**
- `COMMON` (white)
- `UNCOMMON` (yellow)
- `RARE` (aqua)
- `EPIC` (pink)

---

### flags

Hide certain item information.

```yaml
flags:
  - HIDE_ENCHANTS
  - HIDE_ATTRIBUTES
  - HIDE_UNBREAKABLE
  - HIDE_DESTROYS
  - HIDE_PLACED_ON
  - HIDE_ADDITIONAL_TOOLTIP
  - HIDE_DYE
  - HIDE_ARMOR_TRIM
  - HIDE_STORED_ENCHANTS
```

---

### unbreakable

Make the item unbreakable (no durability loss).

```yaml
unbreakable: true
```

---

### hide-tooltip

Hide the entire item tooltip.

```yaml
hide-tooltip: true
```

---

### max-stack-size

Override the maximum stack size (1-99).

```yaml
max-stack-size: 16
```

---

### max-damage

Override the maximum durability.

```yaml
max-damage: 5000
```

---

### custom-model-data

Custom model data for resource pack textures.

```yaml
custom-model-data: 10001
```

---

### repair-cost

Set the anvil repair cost.

```yaml
repair-cost: 5
```

---

### damage-type-resistance

Make the item resistant to certain damage types.

```yaml
damage-type-resistance: IS_FIRE
```

---

## Crafting & Interaction

### grindstone-enabled

Allow using the item on a grindstone. Default: `false`

```yaml
grindstone-enabled: true
```

---

### anvil-enabled

Allow using the item in an anvil. Default: `true`

```yaml
anvil-enabled: true
```

---

### enchanting-table-enabled

Allow enchanting at enchanting table. Default: `true`

```yaml
enchanting-table-enabled: false
```

---

### trackable

Track the item in the database (for custom blocks). Default: `true`

```yaml
trackable: true
```

---

## Effects Configuration

### effects

Add effects (special abilities) to the item. See [Effects Overview](../effects/overview) for details.

```yaml
effects:
  - type: VEIN_MINING
    tags:
      - MINEABLE_PICKAXE
    block-limit: 32
    damage: 1

  - type: MELT_MINING

  - type: XP_BOOST
    boost: 2.0
```

---

### allow-additional-effects

Allow players to add more effects to this item. Default: `true`

```yaml
allow-additional-effects: true
```

---

### disabled-effects

Prevent specific effects from being added.

```yaml
disabled-effects:
  - AUTO_SELL
  - VEIN_MINING
```

---

### base-effects-visible

Show base effects in the item lore. Default: `true`

```yaml
base-effects-visible: true
```

---

### additional-effects-visible

Show additional (applied) effects in lore. Default: `true`

```yaml
additional-effects-visible: true
```

---

### nb-effects-view

Maximum number of effects to display in lore. Default: `-1` (all)

```yaml
nb-effects-view: 3
```

---

## Recipe Configuration

### recipe

Define a crafting recipe for the item.

**Shaped Recipe:**

```yaml
recipe:
  type: SHAPED
  pattern:
    - "DDD"
    - " S "
    - " S "
  ingredients:
    - item: DIAMOND
      sign: D
    - item: STICK
      sign: S
```

**Shapeless Recipe:**

```yaml
recipe:
  type: SHAPELESS
  ingredients:
    - item: DIAMOND
    - item: DIAMOND
    - item: STICK
```

**Furnace/Smelting Recipe:**

```yaml
recipe:
  type: FURNACE
  cooking-time: 200
  experience: 1.0
  ingredients:
    - item: IRON_ORE
```

**Smithing Recipe:**

```yaml
recipe:
  type: SMITHING_TRANSFORM
  ingredients:
    - item: NETHERITE_UPGRADE_SMITHING_TEMPLATE
    - item: DIAMOND_SWORD
    - item: NETHERITE_INGOT
```

**Recipe Types:**
- `SHAPED` - Crafting table with pattern
- `SHAPELESS` - Crafting table without pattern
- `FURNACE` - Furnace smelting
- `BLAST_FURNACE` - Blast furnace smelting
- `SMOKER` - Smoker cooking
- `CAMPFIRE` - Campfire cooking
- `STONECUTTER` - Stonecutter
- `SMITHING_TRANSFORM` - Smithing table transform

---

## Complete Examples

### Vein Mining Pickaxe

```yaml
vein_pickaxe:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#00ff00:#00aa00>Vein Miner</gradient>"
  lore:
    - ""
    - "<gray>Mines entire ore veins at once!</gray>"
    - ""
    - "<yellow>Configuration:</yellow>"
    - "<gray>- Max blocks: <white>32</white></gray>"
    - "<gray>- Works on: <white>All ores</white></gray>"
    - ""
    - "<gold>Effects:</gold>"
    - "<gray>- <green>Vein Mining</green></gray>"
    - "<gray>- <orange>Auto Smelt</orange></gray>"
    - "<gray>- <aqua>XP Boost x2</aqua></gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3
    - enchantment: UNBREAKING
      level: 3
    - enchantment: MENDING
      level: 1

  effects:
    - type: VEIN_MINING
      tags:
        - MINEABLE_PICKAXE
      block-limit: 32
      damage: 1

    - type: MELT_MINING

    - type: XP_BOOST
      boost: 2.0

  recipe:
    type: SHAPED
    pattern:
      - "NNN"
      - " S "
      - " S "
    ingredients:
      - item: NETHERITE_INGOT
        sign: N
      - item: STICK
        sign: S
```

---

### Hammer (3x3 Mining)

```yaml
hammer:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#888888:#444444>Excavator Hammer</gradient>"
  lore:
    - ""
    - "<gray>Mines in a 3x3x1 area!</gray>"
    - ""
    - "<yellow>Mining Area:</yellow>"
    - "<gray>Width: <white>3</white></gray>"
    - "<gray>Height: <white>3</white></gray>"
    - "<gray>Depth: <white>1</white></gray>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: UNBREAKING
      level: 3

  effects:
    - type: HAMMER
      tags:
        - MINEABLE_PICKAXE
      width: 3
      height: 3
      depth: 1
      damage: 1

  custom-model-data: 2001
```

---

### Farming Hoe

```yaml
farming_hoe:
  material: NETHERITE_HOE
  display-name: "<gradient:#7cfc00:#228b22>Farmer's Dream</gradient>"
  lore:
    - ""
    - "<gray>Till, plant, and harvest</gray>"
    - "<gray>in a 5x5 area!</gray>"
    - ""
    - "<yellow>Features:</yellow>"
    - "<gray>- Auto replant: <green>Yes</green></gray>"
    - "<gray>- Area: <white>5x5</white></gray>"

  effects:
    - type: FARMING_HOE
      size: 5
      auto-replant: true
      drop-in-inventory: true
      harvest: true
      plant-seeds: true
      harvest-damage: 1
      till-damage: 1

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3
```

---

### Sell Stick

```yaml
sell_stick:
  material: STICK
  display-name: "<gradient:#ffd700:#ffaa00>Sell Stick</gradient>"
  lore:
    - ""
    - "<gray>Right-click a container</gray>"
    - "<gray>to sell all items inside!</gray>"
    - ""
    - "<yellow>Multiplier: <white>1.5x</white></yellow>"

  enchantments:
    - enchantment: UNBREAKING
      level: 3

  max-damage: 100

  effects:
    - type: SELL_STICK
      multiplier: 1.5
      damage: true
      action: RIGHT_CLICK
```

---

### Magic Food

```yaml
magic_apple:
  material: GOLDEN_APPLE
  display-name: "<gradient:#ff69b4:#da70d6>Enchanted Fruit</gradient>"
  lore:
    - ""
    - "<gray>A magical fruit that</gray>"
    - "<gray>grants incredible powers!</gray>"
    - ""
    - "<yellow>When eaten:</yellow>"
    - "<gray>- <red>+10 Hearts</red></gray>"
    - "<gray>- <aqua>Speed II</aqua> (30s)</gray>"
    - "<gray>- <gold>Strength II</gold> (30s)</gray>"

  metadata:
    food:
      nutrition: 10
      saturation: 2.5
      can-always-eat: true
      eat-seconds: 1.0
      animation: EAT
      effects:
        - effect: SPEED
          amplifier: 1
          duration: 600
        - effect: STRENGTH
          amplifier: 1
          duration: 600
        - effect: REGENERATION
          amplifier: 2
          duration: 100
```

---

### Knight Armor Set

```yaml
knight_helmet:
  material: NETHERITE_HELMET
  display-name: "<gradient:#c0c0c0:#808080>Knight's Helmet</gradient>"
  lore:
    - ""
    - "<gray>Part of the Knight set</gray>"
    - ""
    - "<yellow>Set bonus (4 pieces):</yellow>"
    - "<gray>+20% damage reduction</gray>"

  enchantments:
    - enchantment: PROTECTION
      level: 4
    - enchantment: UNBREAKING
      level: 3

  attributes:
    - attribute: ARMOR
      operation: ADD_NUMBER
      amount: 5.0
      slot: HEAD
    - attribute: ARMOR_TOUGHNESS
      operation: ADD_NUMBER
      amount: 3.0
      slot: HEAD
    - attribute: KNOCKBACK_RESISTANCE
      operation: ADD_NUMBER
      amount: 0.1
      slot: HEAD

  metadata:
    trim:
      material: GOLD
      pattern: SENTRY

knight_chestplate:
  material: NETHERITE_CHESTPLATE
  display-name: "<gradient:#c0c0c0:#808080>Knight's Chestplate</gradient>"
  lore:
    - ""
    - "<gray>Part of the Knight set</gray>"

  enchantments:
    - enchantment: PROTECTION
      level: 4
    - enchantment: UNBREAKING
      level: 3

  attributes:
    - attribute: ARMOR
      operation: ADD_NUMBER
      amount: 10.0
      slot: CHEST
    - attribute: ARMOR_TOUGHNESS
      operation: ADD_NUMBER
      amount: 4.0
      slot: CHEST
    - attribute: KNOCKBACK_RESISTANCE
      operation: ADD_NUMBER
      amount: 0.15
      slot: CHEST

  metadata:
    trim:
      material: GOLD
      pattern: SENTRY
```

---

### Potion with Custom Effects

```yaml
strength_potion:
  material: POTION
  display-name: "<red>Warrior's Elixir</red>"
  lore:
    - ""
    - "<gray>A powerful combat potion</gray>"

  metadata:
    potion:
      color: "#FF0000"
      base-potion-type: STRENGTH
      custom-effects:
        - effect: STRENGTH
          amplifier: 2
          duration: 1200
        - effect: SPEED
          amplifier: 1
          duration: 1200
        - effect: RESISTANCE
          amplifier: 0
          duration: 1200
```

---

## Next Steps

- [Effects Overview](../effects/overview) - Learn about all available effects
- [Metadata System](../metadata/overview) - Configure food, potions, tools, and more
- [Commands Reference](../commands-permissions) - All commands and permissions
