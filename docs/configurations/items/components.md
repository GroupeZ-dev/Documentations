---
sidebar_position: 2
title: Components
description: Complete reference for item components in zMenu (Minecraft 1.20.5+)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Item Components

Starting from Minecraft 1.20.5, items use a new component system. zMenu provides full support for this system through the `components` configuration section.

:::info
Components require Minecraft 1.20.5 or higher. Some components are only available in newer versions, indicated by a badge next to each component name.
:::

## Basic Structure

```yaml
item:
  material: DIAMOND_SWORD
  components:
    custom-name: "&6&lLegendary Sword"
    lore:
      - "&7A powerful weapon"
    enchantments:
      - enchantment: sharpness
        level: 5
```

---

## Display Components

### custom-name

Set the item's display name (can be changed in anvil).

```yaml
components:
  custom-name: "&b&lMy Custom Item"
```

---

### item-name

Set the item's base name (cannot be changed in anvil).

```yaml
components:
  item-name: "&6Special Item"
```

---

### lore

Set the item's description lines.

```yaml
components:
  lore:
    - "&7Line 1"
    - "&7Line 2"
    - ""
    - "&eClick to use!"
```

---

### rarity

Set the item rarity. Affects the name color.

```yaml
components:
  rarity: EPIC
```

**Available values:** `COMMON`, `UNCOMMON`, `RARE`, `EPIC`

---

### custom-model-data

Custom model data for resource pack integration.

```yaml
components:
  custom-model-data: 12345
```

---

### item-model <span class="badge badge--danger">1.21.4+</span>

Set the item model directly.

```yaml
components:
  item-model: "minecraft:custom/my_model"
```

---

### tooltip-style <span class="badge badge--danger">1.21.2+</span>

Custom tooltip background style.

```yaml
components:
  tooltip-style: "minecraft:custom_style"
```

---

### hide-tooltip

Hide the entire tooltip.

```yaml
components:
  hide-tooltip: true
```

---

### hide-additional-tooltip

Hide additional tooltip information.

```yaml
components:
  hide-additional-tooltip: true
```

---

## Enchantment Components

### enchantments

Add enchantments to the item.

```yaml
components:
  enchantments:
    - enchantment: sharpness
      level: 5
    - enchantment: unbreaking
      level: 3
    - enchantment: fire_aspect
      level: 2
```

---

### stored-enchantments

Enchantments stored in enchanted books.

```yaml
components:
  stored-enchantments:
    - enchantment: mending
      level: 1
    - enchantment: unbreaking
      level: 3
```

---

### enchantment-glint-override

Force or remove the enchantment glint effect.

```yaml
components:
  enchantment-glint-override: true   # Force glint
```

```yaml
components:
  enchantment-glint-override: false  # Remove glint
```

---

### enchantable <span class="badge badge--danger">1.21.2+</span>

Set the enchantability value for the item.

```yaml
components:
  enchantable:
    value: 15
```

---

## Durability Components

### damage

Set the current damage value of the item.

```yaml
components:
  damage: 100
```

---

### max-damage

Set the maximum durability of the item.

```yaml
components:
  max-damage: 2000
```

---

### unbreakable

Make the item unbreakable.

```yaml
components:
  unbreakable:
    show-in-tooltip: false
```

---

### repairable <span class="badge badge--danger">1.21.2+</span>

Define which items can repair this item.

```yaml
components:
  repairable:
    items:
      - "minecraft:diamond"
      - "minecraft:netherite_ingot"
```

---

### repair-cost

Set the anvil repair cost.

```yaml
components:
  repair-cost: 5
```

---

## Food Component

### food

Make any item edible.

```yaml
components:
  food:
    nutrition: 6
    saturation: 0.8
    can-always-eat: true
    eat-seconds: 1.6
```

**Properties:**

| Property | Description |
|----------|-------------|
| `nutrition` | Food points restored (hunger bars) |
| `saturation` | Saturation modifier |
| `can-always-eat` | Can eat even when not hungry |
| `eat-seconds` | Time to eat in seconds |

---

## Consumable Component <span class="badge badge--danger">1.21.2+</span>

### consumable

Configure how an item is consumed.

```yaml
components:
  consumable:
    consume-seconds: 1.6
    animation: EAT
    has-consume-particles: true
```

**Animations:** `EAT`, `DRINK`, `BLOCK`, `BOW`, `SPEAR`, `CROSSBOW`, `SPYGLASS`, `TOOT_HORN`, `BRUSH`, `BUNDLE`

---

## Tool Component

### tool

Turn any item into a tool with mining capabilities.

```yaml
components:
  tool:
    default-mining-speed: 1.0
    damage-per-block: 1
    rules:
      - blocks:
          - "minecraft:stone"
          - "minecraft:granite"
          - "minecraft:diorite"
        speed: 8.0
        correct-for-drops: true
      - blocks:
          - "#minecraft:mineable/pickaxe"
        speed: 4.0
        correct-for-drops: true
```

**Properties:**

| Property | Description |
|----------|-------------|
| `default-mining-speed` | Default speed for blocks not in rules |
| `damage-per-block` | Durability lost per block mined |
| `rules` | List of block-specific rules |

---

## Weapon Component <span class="badge badge--danger">1.21.2+</span>

### weapon

Configure weapon damage properties.

```yaml
components:
  weapon:
    damage-per-attack: 7.0
    can-disable-shield: true
    disable-blocking-for-seconds: 5.0
```

---

## Attribute Modifiers

### attribute-modifiers

Add attribute modifiers to the item.

```yaml
components:
  attribute-modifiers:
    modifiers:
      - type: ATTACK_DAMAGE
        amount: 10
        operation: ADD_NUMBER
        slot: MAINHAND
      - type: MOVEMENT_SPEED
        amount: 0.1
        operation: ADD_SCALAR
        slot: FEET
      - type: MAX_HEALTH
        amount: 4
        operation: ADD_NUMBER
        slot: CHEST
    show-in-tooltip: true
```

**Attribute Types:**

| Type | Description |
|------|-------------|
| `ATTACK_DAMAGE` | Attack damage bonus |
| `ATTACK_SPEED` | Attack speed modifier |
| `MAX_HEALTH` | Maximum health |
| `MOVEMENT_SPEED` | Movement speed |
| `ARMOR` | Armor points |
| `ARMOR_TOUGHNESS` | Armor toughness |
| `KNOCKBACK_RESISTANCE` | Knockback resistance |
| `LUCK` | Luck modifier |

**Operations:**

| Operation | Description |
|-----------|-------------|
| `ADD_NUMBER` | Add flat value |
| `ADD_SCALAR` | Add percentage |
| `MULTIPLY_SCALAR_1` | Multiply by (1 + value) |

**Slots:** `MAINHAND`, `OFFHAND`, `HEAD`, `CHEST`, `LEGS`, `FEET`, `ANY`

---

## Potion Components

### potion-contents

Configure potion effects and appearance.

```yaml
components:
  potion-contents:
    potion: speed
    custom-color: "#FF0000"
    custom-effects:
      - type: speed
        amplifier: 1
        duration: 600
        ambient: false
        show-particles: true
        show-icon: true
      - type: jump_boost
        amplifier: 2
        duration: 600
```

---

## Container Components

### container

Store items inside the item (like shulker boxes).

```yaml
components:
  container:
    - slot: 0
      item:
        material: DIAMOND
        amount: 64
    - slot: 1
      item:
        material: EMERALD
        amount: 32
```

---

### bundle-contents

Items stored in a bundle.

```yaml
components:
  bundle-contents:
    - material: DIAMOND
      amount: 10
    - material: EMERALD
      amount: 5
    - material: GOLD_INGOT
      amount: 20
```

---

## Armor Components

### trim

Apply armor trim patterns.

```yaml
components:
  trim:
    material: gold
    pattern: sentry
    show-in-tooltip: true
```

**Materials:** `amethyst`, `copper`, `diamond`, `emerald`, `gold`, `iron`, `lapis`, `netherite`, `quartz`, `redstone`

**Patterns:** `coast`, `dune`, `eye`, `host`, `raiser`, `rib`, `sentry`, `shaper`, `silence`, `snout`, `spire`, `tide`, `vex`, `ward`, `wayfinder`, `wild`

---

### glider <span class="badge badge--danger">1.21.2+</span>

Make the item function as an elytra.

```yaml
components:
  glider: true
```

---

### equippable <span class="badge badge--danger">1.21.2+</span>

Configure equipment properties.

```yaml
components:
  equippable:
    slot: HEAD
    equip-sound: "minecraft:item.armor.equip_leather"
    model: "minecraft:custom_helmet"
    allowed-entities:
      - "minecraft:player"
    dispensable: true
    swappable: true
    damage-on-hurt: true
```

---

## Firework Components

### fireworks

Configure firework rockets.

```yaml
components:
  fireworks:
    flight-duration: 2
    explosions:
      - shape: LARGE_BALL
        colors:
          - "#FF0000"
          - "#00FF00"
        fade-colors:
          - "#FFFF00"
        has-trail: true
        has-twinkle: true
```

**Shapes:** `BALL`, `LARGE_BALL`, `BURST`, `CREEPER`, `STAR`

---

### firework-explosion

Configure firework stars.

```yaml
components:
  firework-explosion:
    shape: STAR
    colors:
      - "#FF0000"
      - "#0000FF"
    fade-colors:
      - "#FFFFFF"
    has-trail: true
    has-twinkle: true
```

---

## Head Components

### profile

Configure player head appearance.

```yaml
components:
  profile:
    name: "Notch"
```

Or use a texture directly:

```yaml
components:
  profile:
    textures:
      - value: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUv..."
```

---

### note-block-sound

Set the sound when placed on a note block.

```yaml
components:
  note-block-sound: "minecraft:block.note_block.bell"
```

---

## Block Interaction Components

### can-place-on

Blocks this item can be placed on (adventure mode).

```yaml
components:
  can-place-on:
    predicates:
      - blocks:
          - "minecraft:stone"
          - "minecraft:dirt"
          - "minecraft:grass_block"
    show-in-tooltip: true
```

---

### can-break

Blocks this item can break (adventure mode).

```yaml
components:
  can-break:
    predicates:
      - blocks:
          - "minecraft:stone"
          - "#minecraft:mineable/pickaxe"
    show-in-tooltip: true
```

---

## Miscellaneous Components

### max-stack-size

Override the maximum stack size (1-99).

```yaml
components:
  max-stack-size: 16
```

---

### fire-resistant

Make the item immune to fire and lava.

```yaml
components:
  fire-resistant: true
```

---

### intangible-projectile

Projectile passes through entities without collision.

```yaml
components:
  intangible-projectile: true
```

---

### map-color

Set the color for filled maps.

```yaml
components:
  map-color: "#00FF00"
```

---

### map-id

Set the map ID.

```yaml
components:
  map-id: 1
```

---

### ominous-bottle-amplifier <span class="badge badge--danger">1.21+</span>

Set the Bad Omen level for ominous bottles.

```yaml
components:
  ominous-bottle-amplifier: 3
```

---

### use-cooldown <span class="badge badge--danger">1.21.2+</span>

Add a cooldown after using the item.

```yaml
components:
  use-cooldown:
    seconds: 1.0
    cooldown-group: "my_cooldown"
```

---

### use-remainder <span class="badge badge--danger">1.21.2+</span>

Item left after using (like bowls from stew).

```yaml
components:
  use-remainder:
    material: BOWL
    amount: 1
```

---

### jukebox-playable <span class="badge badge--danger">1.21+</span>

Make the item playable in a jukebox.

```yaml
components:
  jukebox-playable:
    song: "minecraft:music_disc.cat"
    show-in-tooltip: true
```

---

## Complete Example

Here's a complete example of a custom legendary sword using components:

```yaml
item:
  material: DIAMOND_SWORD
  components:
    custom-name: "&6&l✦ Excalibur ✦"
    lore:
      - "&7The legendary sword of kings"
      - ""
      - "&7Damage: &c+15"
      - "&7Attack Speed: &a+1.6"
      - ""
      - "&5&oForged in dragon fire"
      - ""
      - "&eRight-click for special ability!"
    rarity: EPIC
    enchantments:
      - enchantment: sharpness
        level: 10
      - enchantment: fire_aspect
        level: 2
      - enchantment: unbreaking
        level: 5
      - enchantment: mending
        level: 1
    enchantment-glint-override: true
    attribute-modifiers:
      modifiers:
        - type: ATTACK_DAMAGE
          amount: 15
          operation: ADD_NUMBER
          slot: MAINHAND
        - type: ATTACK_SPEED
          amount: 1.6
          operation: ADD_NUMBER
          slot: MAINHAND
      show-in-tooltip: false
    unbreakable:
      show-in-tooltip: false
    fire-resistant: true
    max-damage: 5000
```

---

## Version Compatibility

| Component | Minimum Version |
|-----------|-----------------|
| Most components | 1.20.5 |
| `food`, `tool` | 1.20.5 |
| `ominous-bottle-amplifier`, `jukebox-playable` | 1.21 |
| `consumable`, `weapon`, `repairable`, `enchantable` | 1.21.2 |
| `glider`, `tooltip-style`, `use-cooldown`, `use-remainder` | 1.21.2 |
| `equippable` | 1.21.2 |
| `item-model` | 1.21.4 |

## Next Steps

- Learn how to use components in [Item Configuration](./item)
- Add items to [Buttons](../buttons/button)
- Create [Patterns](../patterns) for reusable templates
