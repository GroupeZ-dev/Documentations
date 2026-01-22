---
sidebar_position: 1
title: Item Configuration
description: Complete reference for item configuration in zMenu
---

# Item Configuration

Items are the visual elements displayed in your inventory buttons. This page documents all available item configuration options.

## Basic Item Structure

```yaml
item:
  material: DIAMOND
  name: "&bMy Item"
  lore:
    - "&7Line 1"
    - "&7Line 2"
```

## Configuration Options

### material

The Minecraft material type for the item.

```yaml
item:
  material: DIAMOND_SWORD
```

**Vanilla Materials:**
Use any Minecraft material name: `DIAMOND`, `STONE`, `PLAYER_HEAD`, etc.

**Custom Item Plugins:**

| Plugin | Format | Example |
|--------|--------|---------|
| ItemsAdder | `ITEMSADDER:namespace:id` | `ITEMSADDER:my_items:ruby` |
| Oraxen | `ORAXEN:id` | `ORAXEN:emerald_sword` |
| HeadDatabase | `HEAD_DATABASE:id` | `HEAD_DATABASE:12345` |
| Slimefun | `SLIMEFUN:id` | `SLIMEFUN:ELECTRIC_MOTOR` |
| MythicMobs | `MYTHICMOBS:id` | `MYTHICMOBS:SkeletonSword` |
| ExecutableItems | `EXECUTABLE_ITEM:id` | `EXECUTABLE_ITEM:magic_wand` |
| BreweryX | `BREWERYX:recipe` | `BREWERYX:beer` |
| zHead | `ZHEAD:category:name` | `ZHEAD:animals:cat` |

---

### name

The display name of the item.

```yaml
item:
  material: DIAMOND
  name: "&b&lShiny Diamond"
```

**Features:**
- Supports color codes (`&6`, `&#FF5500`)
- Supports MiniMessage (if enabled)
- Supports placeholders (`%player%`)

---

### lore

The description lines shown below the item name.

```yaml
item:
  material: DIAMOND_SWORD
  name: "&6&lLegendary Sword"
  lore:
    - "&7A powerful weapon"
    - ""
    - "&7Damage: &c+50"
    - "&7Speed: &a+10%"
    - ""
    - "&eClick to equip!"
```

Each list item is a new line. Empty strings (`""`) create blank lines.

---

### amount

The stack size of the item (1-64).

```yaml
item:
  material: DIAMOND
  amount: 64
```

You can also use placeholders:

```yaml
item:
  material: DIAMOND
  amount: "%zmenu_player_value_coins%"  # Dynamic amount
```

---

### durability

Set the durability/damage value for tools and armor.

```yaml
item:
  material: DIAMOND_SWORD
  durability: 100  # 100 durability used
```

---

### customModelData

Set custom model data for resource pack integration.

```yaml
item:
  material: DIAMOND
  customModelData: 12345
```

This allows resource packs to display custom models for items.

---

### glow

Add an enchantment glow effect without showing enchantments.

```yaml
item:
  material: NETHER_STAR
  name: "&6&lSpecial Item"
  glow: true
```

---

### playerHead

Display a player's head. Only works with `material: PLAYER_HEAD`.

```yaml
item:
  material: PLAYER_HEAD
  playerHead: "%player%"  # Current player's head
  name: "&a%player%'s Head"
```

You can also use a specific player name:

```yaml
item:
  material: PLAYER_HEAD
  playerHead: "Notch"
```

---

### url

Use a custom head texture URL (base64 encoded texture).

```yaml
item:
  material: PLAYER_HEAD
  url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUv..."
  name: "&6Custom Head"
```

Get head textures from sites like [minecraft-heads.com](https://minecraft-heads.com/).

---

### enchantments

Add enchantments to the item.

```yaml
item:
  material: DIAMOND_SWORD
  enchantments:
    - type: SHARPNESS
      level: 5
    - type: UNBREAKING
      level: 3
    - type: FIRE_ASPECT
      level: 2
```

Common enchantment types:
- Swords: `SHARPNESS`, `SMITE`, `FIRE_ASPECT`, `KNOCKBACK`
- Armor: `PROTECTION`, `THORNS`, `UNBREAKING`
- Tools: `EFFICIENCY`, `FORTUNE`, `SILK_TOUCH`
- Bows: `POWER`, `PUNCH`, `INFINITY`, `FLAME`

---

### flags

Hide certain item attributes using item flags.

```yaml
item:
  material: DIAMOND_SWORD
  enchantments:
    - type: SHARPNESS
      level: 5
  flags:
    - HIDE_ENCHANTS
    - HIDE_ATTRIBUTES
```

**Available Flags:**

| Flag | Description |
|------|-------------|
| `HIDE_ENCHANTS` | Hide enchantment list |
| `HIDE_ATTRIBUTES` | Hide attribute modifiers |
| `HIDE_UNBREAKABLE` | Hide "Unbreakable" tag |
| `HIDE_DESTROYS` | Hide "Can destroy" list |
| `HIDE_PLACED_ON` | Hide "Can be placed on" list |
| `HIDE_POTION_EFFECTS` | Hide potion effects |
| `HIDE_DYE` | Hide leather armor dye color |
| `HIDE_ARMOR_TRIM` | Hide armor trim pattern |

---

### unbreakable

Make the item unbreakable.

```yaml
item:
  material: DIAMOND_PICKAXE
  unbreakable: true
  flags:
    - HIDE_UNBREAKABLE
```

---

### attributes

Add attribute modifiers to the item.

```yaml
item:
  material: DIAMOND_SWORD
  attributes:
    - slot: HAND
      type: ATTACK_DAMAGE
      operation: ADD_NUMBER
      value: 10
    - slot: HAND
      type: ATTACK_SPEED
      operation: ADD_NUMBER
      value: -2.4
```

**Attribute Types:**
- `ATTACK_DAMAGE` - Attack damage bonus
- `ATTACK_SPEED` - Attack speed modifier
- `MAX_HEALTH` - Maximum health
- `MOVEMENT_SPEED` - Movement speed
- `ARMOR` - Armor points
- `ARMOR_TOUGHNESS` - Armor toughness
- `KNOCKBACK_RESISTANCE` - Knockback resistance
- `LUCK` - Luck modifier

**Operations:**
- `ADD_NUMBER` - Add flat value
- `ADD_SCALAR` - Add percentage
- `MULTIPLY_SCALAR_1` - Multiply by (1 + value)

**Slots:**
- `HAND` - Main hand
- `OFF_HAND` - Off hand
- `HEAD`, `CHEST`, `LEGS`, `FEET` - Armor slots

---

### potion

Configure potion items.

```yaml
item:
  material: POTION
  potion:
    type: SPEED
    duration: 600    # In ticks (600 = 30 seconds)
    amplifier: 1     # Level 2 (0 = level 1)
    extended: false
    upgraded: false
```

For splash or lingering potions:

```yaml
item:
  material: SPLASH_POTION
  potion:
    type: HEALING
    amplifier: 1
```

---

### banner

Configure banner patterns.

```yaml
item:
  material: WHITE_BANNER
  banner:
    base_color: WHITE
    patterns:
      - type: STRIPE_BOTTOM
        color: RED
      - type: STRIPE_TOP
        color: BLUE
      - type: CROSS
        color: BLACK
```

**Pattern Types:**
`STRIPE_BOTTOM`, `STRIPE_TOP`, `STRIPE_LEFT`, `STRIPE_RIGHT`, `STRIPE_CENTER`, `STRIPE_MIDDLE`, `STRIPE_DOWNRIGHT`, `STRIPE_DOWNLEFT`, `CROSS`, `STRAIGHT_CROSS`, `DIAGONAL_LEFT`, `DIAGONAL_RIGHT`, `DIAGONAL_LEFT_MIRROR`, `DIAGONAL_RIGHT_MIRROR`, `CIRCLE_MIDDLE`, `RHOMBUS_MIDDLE`, `HALF_VERTICAL`, `HALF_HORIZONTAL`, `TRIANGLE_BOTTOM`, `TRIANGLE_TOP`, `TRIANGLES_BOTTOM`, `TRIANGLES_TOP`, `BORDER`, `CURLY_BORDER`, `GRADIENT`, `GRADIENT_UP`, `BRICKS`, `GLOBE`, `CREEPER`, `SKULL`, `FLOWER`, `MOJANG`, `PIGLIN`

---

### firework

Configure firework rockets.

```yaml
item:
  material: FIREWORK_ROCKET
  firework:
    power: 2
    effects:
      - type: BALL_LARGE
        colors:
          - RED
          - ORANGE
        fade_colors:
          - YELLOW
        trail: true
        flicker: true
```

**Firework Types:**
`BALL`, `BALL_LARGE`, `BURST`, `CREEPER`, `STAR`

---

### leather-color

Color leather armor.

```yaml
item:
  material: LEATHER_CHESTPLATE
  leather-color: "#FF5555"  # Red color
```

Or use RGB values:

```yaml
item:
  material: LEATHER_BOOTS
  leather-color: "255,85,85"
```

---

### modelId

Alternative to customModelData (same functionality).

```yaml
item:
  material: PAPER
  modelId: 1001
```

---

## Complete Examples

### Simple Item

```yaml
item:
  material: DIAMOND
  name: "&b&lDiamond"
  lore:
    - "&7A precious gem"
```

### Player Head with Texture

```yaml
item:
  material: PLAYER_HEAD
  url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA..."
  name: "&6&lTreasure Chest"
  lore:
    - "&7Click to open!"
  glow: true
```

### Enchanted Tool

```yaml
item:
  material: DIAMOND_PICKAXE
  name: "&a&lMiner's Dream"
  lore:
    - "&7The ultimate mining tool"
    - ""
    - "&7Efficiency V"
    - "&7Fortune III"
    - "&7Unbreaking III"
  enchantments:
    - type: EFFICIENCY
      level: 5
    - type: FORTUNE
      level: 3
    - type: UNBREAKING
      level: 3
  flags:
    - HIDE_ENCHANTS
  glow: true
```

### Dynamic Item with Placeholders

```yaml
item:
  material: PLAYER_HEAD
  playerHead: "%player%"
  name: "&6&l%player%'s Profile"
  lore:
    - "&8&m─────────────────"
    - ""
    - "&7Level: &a%player_level%"
    - "&7Health: &c%player_health%/%player_max_health%"
    - "&7Balance: &6$%vault_eco_balance_formatted%"
    - ""
    - "&7Kills: &a%statistic_player_kills%"
    - "&7Deaths: &c%statistic_deaths%"
    - ""
    - "&8&m─────────────────"
```

### Potion Item

```yaml
item:
  material: SPLASH_POTION
  name: "&d&lHealing Potion"
  lore:
    - "&7Instantly heals 4 hearts"
  potion:
    type: INSTANT_HEAL
    amplifier: 1
  flags:
    - HIDE_POTION_EFFECTS
```

### Custom Model Item

```yaml
item:
  material: PAPER
  name: "&e&lMagic Wand"
  lore:
    - "&7Cast powerful spells!"
  customModelData: 10001
  glow: true
```

## Using ItemsAdder/Oraxen

For custom items from ItemsAdder:

```yaml
item:
  material: ITEMSADDER:my_namespace:ruby_gem
  name: "&c&lRuby Gem"
```

For Oraxen items:

```yaml
item:
  material: ORAXEN:amethyst_sword
  name: "&d&lAmethyst Sword"
```

## Best Practices

1. **Use meaningful names** - Make item names clear and descriptive
2. **Format lore consistently** - Use separators and spacing for readability
3. **Hide unnecessary info** - Use flags to hide enchantments/attributes when not needed
4. **Use placeholders** - Make items dynamic with PlaceholderAPI
5. **Test with resource packs** - If using customModelData, verify the models display correctly

## Next Steps

- Learn how to use items in [Buttons](../buttons/button)
- Add [Actions](../buttons/actions) to make items interactive
- Create [Patterns](../patterns) for reusable item templates
