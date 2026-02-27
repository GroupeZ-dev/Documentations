---
sidebar_position: 1
title: Metadata Overview
description: Configure special item properties with metadata
---

# Metadata Overview

Metadata allows you to configure special properties for items that go beyond basic materials and enchantments. This includes making items edible, adding potion effects, customizing armor appearance, and more.

## How Metadata Works

Metadata is defined in the `metadata` section of an item configuration:

```yaml
my_item:
  material: DIAMOND_SWORD
  display-name: "<red>Special Sword</red>"

  metadata:
    # Each metadata type is a separate key
    food:
      nutrition: 5
      saturation: 1.0

    commands:
      commands:
        - sender: CONSOLE
          commands:
            - "give %player% diamond 1"
```

## Available Metadata Types

| Type | Description | Use Case |
|------|-------------|----------|
| [food](#food) | Make items edible | Custom food items |
| [potion](#potion) | Add potion effects | Custom potions |
| [leather-armor](#leather-armor) | Dye leather armor | Colored armor |
| [trim](#trim) | Add armor trims | Decorative armor |
| [banner](#banner) | Add banner patterns | Custom banners/shields |
| [tool](#tool) | Custom mining properties | Custom tools |
| [commands](#commands) | Execute commands on use | Interactive items |

---

## food

Make any item edible with custom nutrition, effects, and animations.

```yaml
metadata:
  food:
    # Required: Food value (hunger points restored)
    nutrition: 6

    # Required: Saturation modifier
    saturation: 1.2

    # Optional: Can eat when not hungry (default: false)
    can-always-eat: true

    # Optional: Time to eat in seconds (default: 1.6)
    eat-seconds: 1.0

    # Optional: Eating animation
    animation: EAT  # EAT, DRINK, BLOCK, BOW, SPEAR, CROSSBOW, SPYGLASS, TOOT_HORN, BRUSH

    # Optional: Eating sound
    sound: ENTITY_GENERIC_EAT

    # Optional: Cooldown after eating
    cooldown-seconds: 5.0

    # Optional: Cooldown group (shared cooldown)
    group-cooldown: "my_food_group"

    # Optional: Effects when eaten
    effects:
      - effect: SPEED
        amplifier: 1
        duration: 600  # ticks (600 = 30 seconds)
      - effect: REGENERATION
        amplifier: 2
        duration: 100
```

### Full Food Example

```yaml
super_apple:
  material: GOLDEN_APPLE
  display-name: "<gradient:#ff69b4:#da70d6>Super Apple</gradient>"
  lore:
    - ""
    - "<gray>A magical fruit!</gray>"
    - ""
    - "<yellow>When eaten:</yellow>"
    - "<gray>+10 Hunger</gray>"
    - "<gray>Speed II (30s)</gray>"
    - "<gray>Strength II (30s)</gray>"

  metadata:
    food:
      nutrition: 10
      saturation: 2.5
      can-always-eat: true
      eat-seconds: 0.5
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

## potion

Configure custom potion effects for potions and tipped arrows.

```yaml
metadata:
  potion:
    # Optional: Potion color (hex or RGB)
    color: "#FF0000"

    # Optional: Base potion type
    base-potion-type: STRENGTH

    # Optional: Custom effects
    custom-effects:
      - effect: STRENGTH
        amplifier: 2
        duration: 1200
      - effect: SPEED
        amplifier: 1
        duration: 1200
```

### Full Potion Example

```yaml
warrior_potion:
  material: POTION
  display-name: "<red>Warrior's Elixir</red>"
  lore:
    - ""
    - "<gray>Grants combat prowess</gray>"
    - ""
    - "<yellow>Effects:</yellow>"
    - "<gray>Strength III (60s)</gray>"
    - "<gray>Speed II (60s)</gray>"
    - "<gray>Resistance I (60s)</gray>"

  metadata:
    potion:
      color: "#FF4444"
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

## leather-armor

Set the color of leather armor pieces.

```yaml
metadata:
  leather-armor:
    # Color in RGB format
    color: "#FF5500"
```

### Full Leather Armor Example

```yaml
flame_chestplate:
  material: LEATHER_CHESTPLATE
  display-name: "<gradient:#ff4500:#ff8c00>Flame Tunic</gradient>"
  lore:
    - ""
    - "<gray>Burns with inner fire</gray>"

  enchantments:
    - enchantment: FIRE_PROTECTION
      level: 4

  metadata:
    leather-armor:
      color: "#FF4500"
```

---

## trim

Apply armor trims to armor pieces.

```yaml
metadata:
  trim:
    # Trim material
    material: GOLD  # QUARTZ, IRON, NETHERITE, REDSTONE, COPPER, GOLD, EMERALD, DIAMOND, LAPIS, AMETHYST

    # Trim pattern
    pattern: SENTRY  # SENTRY, DUNE, COAST, WILD, WARD, EYE, VEX, TIDE, SNOUT, RIB, SPIRE, WAYFINDER, SHAPER, SILENCE, RAISER, HOST, FLOW, BOLT
```

### Full Trim Example

```yaml
royal_helmet:
  material: DIAMOND_HELMET
  display-name: "<gradient:#ffd700:#daa520>Royal Crown</gradient>"
  lore:
    - ""
    - "<gray>Fit for a king</gray>"

  enchantments:
    - enchantment: PROTECTION
      level: 4
    - enchantment: UNBREAKING
      level: 3

  metadata:
    trim:
      material: GOLD
      pattern: SENTRY
```

---

## banner

Add patterns to banners and shields.

```yaml
metadata:
  banner:
    patterns:
      - pattern: STRIPE_BOTTOM
        color: WHITE
      - pattern: STRIPE_TOP
        color: BLUE
      - pattern: CROSS
        color: RED
```

### Banner Patterns

Common patterns: `BASE`, `STRIPE_BOTTOM`, `STRIPE_TOP`, `STRIPE_LEFT`, `STRIPE_RIGHT`, `STRIPE_CENTER`, `STRIPE_MIDDLE`, `STRIPE_DOWNRIGHT`, `STRIPE_DOWNLEFT`, `CROSS`, `STRAIGHT_CROSS`, `DIAGONAL_LEFT`, `DIAGONAL_RIGHT`, `DIAGONAL_UP_LEFT`, `DIAGONAL_UP_RIGHT`, `HALF_VERTICAL`, `HALF_HORIZONTAL`, `CIRCLE`, `RHOMBUS`, `TRIANGLE_BOTTOM`, `TRIANGLE_TOP`, `GRADIENT`, `GRADIENT_UP`, `BRICKS`, `SKULL`, `CREEPER`, `FLOWER`, `MOJANG`, `GLOBE`, `PIGLIN`, `FLOW`, `GUSTER`

### Full Banner Example

```yaml
guild_banner:
  material: BLUE_BANNER
  display-name: "<blue>Guild Banner</blue>"
  lore:
    - ""
    - "<gray>The banner of our guild</gray>"

  metadata:
    banner:
      patterns:
        - pattern: GRADIENT
          color: LIGHT_BLUE
        - pattern: CROSS
          color: YELLOW
        - pattern: BORDER
          color: WHITE
```

---

## tool

Configure custom mining properties for tools.

```yaml
metadata:
  tool:
    # Damage per block mined
    damage-per-block: 1

    # Default mining speed
    default-mining-speed: 1.0

    # Tag-based rules
    rules:
      - tag: MINEABLE_PICKAXE
        speed: 8.0
        correct-for-drops: true

    # Material-based rules
    material-rules:
      - materials:
          - STONE
          - COBBLESTONE
        speed: 10.0
        correct-for-drops: true
```

### Full Tool Example

```yaml
multitool:
  material: NETHERITE_PICKAXE
  display-name: "<gradient:#ff6b6b:#feca57>Multi-Tool</gradient>"
  lore:
    - ""
    - "<gray>Works on everything!</gray>"

  metadata:
    tool:
      damage-per-block: 1
      default-mining-speed: 8.0
      rules:
        - tag: MINEABLE_PICKAXE
          speed: 12.0
          correct-for-drops: true
        - tag: MINEABLE_SHOVEL
          speed: 12.0
          correct-for-drops: true
        - tag: MINEABLE_AXE
          speed: 12.0
          correct-for-drops: true
```

---

## commands

Execute commands when the item is used.

```yaml
metadata:
  commands:
    # Optional: Require confirmation
    need-confirmation: false

    commands:
      - sender: PLAYER  # PLAYER or CONSOLE
        action: RIGHT_CLICK  # LEFT_CLICK, RIGHT_CLICK, SHIFT_LEFT_CLICK, SHIFT_RIGHT_CLICK
        commands:
          - "spawn"
        messages:
          - "<green>Teleported to spawn!</green>"
        cooldown: 300  # seconds
        damage:
          type: AMOUNT  # AMOUNT or DURABILITY
          quantity: 1
```

### Full Commands Example

```yaml
teleport_wand:
  material: BLAZE_ROD
  display-name: "<gradient:#00ffff:#00aaff>Teleport Wand</gradient>"
  lore:
    - ""
    - "<gray>Right-click to teleport to spawn!</gray>"
    - ""
    - "<yellow>Cooldown: <white>5 minutes</white></yellow>"

  max-damage: 10

  metadata:
    commands:
      commands:
        - sender: PLAYER
          action: RIGHT_CLICK
          commands:
            - "spawn"
          messages:
            - "<green>Whoosh! Teleported to spawn!</green>"
          cooldown: 300
          damage:
            type: AMOUNT
            quantity: 1
```

---

## Complete Multi-Metadata Example

```yaml
legendary_artifact:
  material: GOLDEN_APPLE
  display-name: "<gradient:#ffd700:#ff8c00>Legendary Artifact</gradient>"
  lore:
    - ""
    - "<gray>An ancient artifact with</gray>"
    - "<gray>mysterious powers.</gray>"
    - ""
    - "<yellow>When eaten:</yellow>"
    - "<gray>- Full hunger restoration</gray>"
    - "<gray>- All positive effects</gray>"
    - ""
    - "<yellow>When used:</yellow>"
    - "<gray>- Teleports to spawn</gray>"

  metadata:
    food:
      nutrition: 20
      saturation: 5.0
      can-always-eat: true
      eat-seconds: 0.5
      effects:
        - effect: SPEED
          amplifier: 2
          duration: 2400
        - effect: STRENGTH
          amplifier: 2
          duration: 2400
        - effect: REGENERATION
          amplifier: 2
          duration: 600
        - effect: RESISTANCE
          amplifier: 1
          duration: 2400
        - effect: FIRE_RESISTANCE
          amplifier: 0
          duration: 2400

    commands:
      commands:
        - sender: PLAYER
          action: SHIFT_RIGHT_CLICK
          commands:
            - "spawn"
          messages:
            - "<gold>The artifact's power teleports you!</gold>"
```

## Next Steps

- [Item Configuration](../configurations/items) - Full item options
- [Effects System](../effects/overview) - Add abilities to items
