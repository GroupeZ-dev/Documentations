---
sidebar_position: 2
title: Components
description: Complete reference for item components in zMenu (Minecraft 1.20.5+)
---

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
      sharpness: 5
```

---

## attack-range <span class="badge badge--danger">1.21.11+</span>

Defines the attack range of an item in blocks.

**Minecraft Wiki:** [attack_range](https://minecraft.wiki/w/Data_component_format#attack_range)

| Key                  | Type  | Default | Range | Description                             |
|----------------------|-------|---------|-------|-----------------------------------------|
| `min-reach`          | Float | `0`     | 0-64  | Minimum reach distance in survival mode |
| `max-reach`          | Float | `3`     | 0-64  | Maximum reach distance in survival mode |
| `min-creative-reach` | Float | `0`     | 0-64  | Minimum reach distance in creative mode |
| `max-creative-reach` | Float | `5`     | 0-64  | Maximum reach distance in creative mode |
| `hitbox-margin`      | Float | `0.3`   | 0-1   | Additional margin for hitbox detection  |
| `mob-factor`         | Float | `1`     | 0-2   | Multiplier applied to mob hitboxes      |

```yaml
components:
  attack-range:
    min-reach: 0
    max-reach: 5
    min-creative-reach: 0
    max-creative-reach: 6
    hitbox-margin: 0.3
    mob-factor: 1.0
```

---

## attribute-modifiers

Adds attribute modifiers to the item.

**Minecraft Wiki:** [attribute_modifiers](https://minecraft.wiki/w/Data_component_format#attribute_modifiers)

| Key         | Type   | Required | Description                                                                   |
|-------------|--------|----------|-------------------------------------------------------------------------------|
| `type`      | String | Yes      | Attribute type (e.g., `generic.attack_damage`)                                |
| `amount`    | Double | Yes      | Value of the modifier                                                         |
| `operation` | String | Yes      | Operation type: `ADD_NUMBER`, `ADD_SCALAR`, `MULTIPLY_SCALAR_1`               |
| `slot`      | String | No       | Equipment slot: `any`, `mainhand`, `offhand`, `head`, `chest`, `legs`, `feet` |
| `key`       | String | No       | Unique identifier for the modifier                                            |

```yaml
components:
  attribute-modifiers:
    - type: generic.attack_damage
      amount: 10
      operation: add_value
      slot: mainhand
      key: "my_plugin:attack_bonus"
    - type: generic.movement_speed
      amount: 0.1
      operation: add_multiplied_base
      slot: feet
```

**Available Attributes:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/attribute/Attribute.html), support custom attributes if registered in the registry.

---

## banner-patterns

Defines patterns on a banner item.

**Minecraft Wiki:** [banner_patterns](https://minecraft.wiki/w/Data_component_format#banner_patterns)

```yaml
components:
  banner-patterns:
    - pattern: stripe_top
      color: red
    - pattern: cross
      color: blue
```

---

## base-color

Sets the base color for shields and banners.

**Minecraft Wiki:** [base_color](https://minecraft.wiki/w/Data_component_format#base_color)

```yaml
components:
  base-color: RED
```

**Available Colors:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/DyeColor.html).

---

## block-state

Sets block state properties for block items when placed.

**Minecraft Wiki:** [block_state](https://minecraft.wiki/w/Data_component_format#block_state)

```yaml
components:
  block-state:
    facing: north
    powered: true
    waterlogged: false
```

---

## blocks-attacks <span class="badge badge--danger">1.21.5+</span>

Configures shield-like blocking behavior for items.

**Minecraft Wiki:** [blocks_attacks](https://minecraft.wiki/w/Data_component_format#blocks_attacks)

| Key                      | Type   | Default | Description                               |
|--------------------------|--------|---------|-------------------------------------------|
| `block-delay-seconds`    | Float  | `0`     | Delay before blocking becomes active      |
| `disable-cooldown-scale` | Float  | `1`     | Cooldown scale when shield is disabled    |
| `block-sound`            | String | -       | Sound played when blocking                |
| `disabled-sound`         | String | -       | Sound played when shield is disabled      |
| `item-damage.threshold`  | Float  | `0`     | Damage threshold before item takes damage |
| `item-damage.base`       | Float  | `0`     | Base item damage                          |
| `item-damage.factor`     | Float  | `1.5`   | Damage multiplier factor                  |
| `damage-reductions`      | List   | `[]`    | List of damage reduction rules            |

**Damage Reduction Properties:**
| Key | Type | Description |
|-----|------|-------------|
| `type` | String/List | Damage type(s) to reduce |
| `base` | Float | Base damage reduction |
| `factor` | Float | Damage reduction factor |
| `horizontal-blocking-angle` | Float | Blocking angle in degrees (default: 90) |

```yaml
components:
  blocks-attacks:
    block-delay-seconds: 0.25
    disable-cooldown-scale: 1.0
    block-sound: item.shield.block
    disabled-sound: item.shield.break
    item-damage:
      threshold: 3.0
      base: 0
      factor: 1.5
    damage-reductions:
      - type: player_attack
        base: 5.0
        factor: 0.5
        horizontal-blocking-angle: 90
```

---

## break-sound <span class="badge badge--danger">1.21.5+</span>

Sets the sound played when the item breaks.

**Minecraft Wiki:** [break_sound](https://minecraft.wiki/w/Data_component_format#break_sound)

```yaml
components:
  break-sound: "entity.item.break"
```

---

## bundle-contents

Stores items inside a bundle.
Use zMenu item syntax inside each entry.

**Minecraft Wiki:** [bundle_contents](https://minecraft.wiki/w/Data_component_format#bundle_contents)

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

## charged-projectiles

Stores projectiles in crossbows.

**Minecraft Wiki:** [charged_projectiles](https://minecraft.wiki/w/Data_component_format#charged_projectiles)

```yaml
components:
  charged-projectiles:
    - material: ARROW
      amount: 1
    - material: SPECTRAL_ARROW
      amount: 1
```

---

## consumable <span class="badge badge--danger">1.21.2+</span>

Configures how an item is consumed.

**Minecraft Wiki:** [consumable](https://minecraft.wiki/w/Data_component_format#consumable)

| Key                     | Type    | Default              | Description                              |
|-------------------------|---------|----------------------|------------------------------------------|
| `consume-seconds`       | Float   | `1.6`                | Time to consume the item in seconds      |
| `animation`             | String  | `EAT`                | Animation type                           |
| `consume-sound`         | String  | `entity.generic.eat` | Sound played when consuming              |
| `has-consume-particles` | Boolean | `true`               | Whether to show particles when consuming |
| `on-consume-effects`    | List    | `[]`                 | Effects to apply when consumed           |

```yaml
components:
  consumable:
    consume-seconds: 1.6
    animation: EAT
    consume-sound: entity.generic.eat
    has-consume-particles: true
    on-consume-effects:
      - type: APPLY_EFFECTS
        probability: 1.0
        effects:
          - type: speed
            amplifier: 1
            duration: 600
      - type: PLAY_SOUND
        sound: entity.player.burp
      - type: TELEPORT_RANDOMLY
        diameter: 16.0
      - type: CLEAR_ALL_EFFECTS
      - type: REMOVE_EFFECTS
        effects:
          - poison
          - wither
```

**Animation Types:** `EAT`, `DRINK`, `BLOCK`, `BOW`, `SPEAR`, `CROSSBOW`, `SPYGLASS`, `TOOT_HORN`, `BRUSH`, `BUNDLE`

**Effect Types:**
- `APPLY_EFFECTS` - Apply potion effects with probability
- `PLAY_SOUND` - Play a sound
- `TELEPORT_RANDOMLY` - Teleport randomly within diameter
- `CLEAR_ALL_EFFECTS` - Clear all potion effects
- `REMOVE_EFFECTS` - Remove specific effects

---

## container

Stores items inside the item (like shulker boxes).

**Minecraft Wiki:** [container](https://minecraft.wiki/w/Data_component_format#container)

| Key        | Type    | Description                         |
|------------|---------|-------------------------------------|
| `slot`     | Integer | Slot index (0-26 for shulker boxes) |

Use zMenu item syntax inside each entry.

```yaml
components:
  container:
    - slot: 0
      material: DIAMOND
      amount: 64
    - slot: 1
      material: EMERALD
      amount: 32
```

---

## container-loot

Sets the loot table for container items.

**Minecraft Wiki:** [container_loot](https://minecraft.wiki/w/Data_component_format#container_loot)

| Key          | Type   | Default | Description                              |
|--------------|--------|---------|------------------------------------------|
| `loot-table` | String | -       | Loot table name (e.g., `DESERT_PYRAMID`) |
| `seed`       | Long   | `0`     | Random seed for loot generation          |

```yaml
components:
  container-loot:
    loot-table: DESERT_PYRAMID
    seed: 12345
```

**Available Loot Tables:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/loot/LootTables.html).

---

## custom-data

Stores custom persistent data (NBT) on the item.

**Minecraft Wiki:** [custom_data](https://minecraft.wiki/w/Data_component_format#custom_data)

Supports multiple data types with automatic type detection:
- String
- Boolean
- Integer
- Long
- Double
- Float
- Byte
- Short
- byte[], int[], long[] arrays

```yaml
components:
  custom-data:
    "my_plugin:item_id": "legendary_sword"
    "my_plugin:level": 10
    "my_plugin:enchanted": true
    "my_plugin:damage_bonus": 5.5
```

---

## custom-model-data

Custom model data for resource pack integration.

**Minecraft Wiki:** [custom_model_data](https://minecraft.wiki/w/Data_component_format#custom_model_data)

| Key       | Type          | Description                                                                                                                                                                         |
|-----------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `floats`  | List<Float>   | Float values for predicates                                                                                                                                                         |
| `flags`   | List<Boolean> | Boolean flags for predicates                                                                                                                                                        |
| `strings` | List<String>  | String values for predicates                                                                                                                                                        |
| `colors`  | List<Color>   | Color values. Each entry can be a hex string (e.g., `"#FFAA00"` or `"#80FFAA00"`), an integer (RGB or ARGB), a list of floats (RGB[A], 0.0–1.0), or a list of ints (RGB[A], 0–255). |

```yaml
components:
  custom-model-data:
    floats:
      - 1.0
      - 2.5
    flags:
      - true
      - false
    strings:
      - "variant_a"
    colors:
      - "#FFAA00"         # Hex string (RRGGBB)
      - "#80FFAA00"       # Hex string (AARRGGBB)
      - 16755200          # Integer RGB (decimal)
      - [1.0, 0.5, 0.0]   # List of floats (RGB, 0.0–1.0)
      - [1.0, 0.5, 0.0, 0.5] # List of floats (RGBA, 0.0–1.0)
      - [255, 128, 0]     # List of ints (RGB, 0–255)
      - [128, 255, 128, 0]# List of ints (RGBA, 0–255)
```

---

## damage

Sets the current damage value of the item.

**Minecraft Wiki:** [damage](https://minecraft.wiki/w/Data_component_format#damage)

```yaml
components:
  damage: 100
```

---

## damage-resistant

Makes the item resistant to specific damage types.

**Minecraft Wiki:** [damage_resistant](https://minecraft.wiki/w/Data_component_format#damage_resistant)

| Key | Type | Description |
|-----|------|-------------|
| `types` | String | Damage type tag to resist |

```yaml
components:
  damage-resistant:
    types: "minecraft:is_fire"
```

**Available Damage Type Tags:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/tag/DamageTypeTags.html).

---

## damage-type <span class="badge badge--danger">1.21.11+</span>

Sets the damage type dealt by the item when used as a weapon.

**Minecraft Wiki:** [damage_type](https://minecraft.wiki/w/Data_component_format#damage_type)

```yaml
components:
  damage-type: 
    types: "minecraft:player_attack"
```

**Common Damage Types:** `player_attack`, `mob_attack`, `arrow`, `fireball`, `magic`, `wither`, `dragon_breath`, `freeze`, `sonic_boom`

---

## dyed-color

Sets the dye color for leather armor and other dyeable items.

**Minecraft Wiki:** [dyed_color](https://minecraft.wiki/w/Data_component_format#dyed_color)

| Type          | Description                                     |
|---------------|-------------------------------------------------|
| String        | Hex string (e.g., `"#FFAA00"` or `"#80FFAA00"`) |
| Integer       | Integer RGB or ARGB (decimal)                   |
| List<Float>   | List of floats (RGB[A], 0.0–1.0)                |
| List<Integer> | List of ints (RGB[A], 0–255)                    |

```yaml
components:
  # Only use one of the following formats for dyed-color:
  dyed-color: "#FFAA00"         # Hex string (RRGGBB)
  # dyed-color: "#80FFAA00"       # Hex string (AARRGGBB)
  # dyed-color: 16755200          # Integer RGB (decimal)
  # dyed-color: [1.0, 0.5, 0.0]   # List of floats (RGB, 0.0–1.0)
  # dyed-color: [1.0, 0.5, 0.0, 0.5] # List of floats (RGBA, 0.0–1.0)
  # dyed-color: [255, 128, 0]     # List of ints (RGB, 0–255)
  # dyed-color: [128, 255, 128, 0]# List of ints (RGBA, 0–255)
```

---

## enchantable <span class="badge badge--danger">1.21.2+</span>

Sets the enchantability value for the item.

**Minecraft Wiki:** [enchantable](https://minecraft.wiki/w/Data_component_format#enchantable)

```yaml
components:
  enchantable: 
    value: 15
```

---

## enchantment-glint-override

Force or remove the enchantment glint effect.

**Minecraft Wiki:** [enchantment_glint_override](https://minecraft.wiki/w/Data_component_format#enchantment_glint_override)

```yaml
components:
  enchantment-glint-override: true   # Force glint
```

```yaml
components:
  enchantment-glint-override: false  # Remove glint
```

---

## enchantments

Adds enchantments to the item. Supports custom enchantments if they were registered inside the registry.

**Minecraft Wiki:** [enchantments](https://minecraft.wiki/w/Data_component_format#enchantments)

```yaml
components:
  enchantments:
    sharpness: 5
    unbreaking: 3
    fire_aspect: 2
    mending: 1
```

---

### custom_name <span class="badge badge--danger">Paper only</span>

Sets the custom name of the item.

**Minecraft Wiki:** [custom_name](https://minecraft.wiki/w/Data_component_format#custom_name)

```yaml
components:
  custom-name: "&6&lLegendary Sword"
```

---

### intangible_projectile <span class="badge badge--danger">Paper only</span>

Makes projectiles fired from this item intangible (pass through blocks).

**Minecraft Wiki:** [intangible_projectile](https://minecraft.wiki/w/Data_component_format#intangible_projectile)

```yaml
components:
  intangible_projectile: true
```

---

### map_decorations <span class="badge badge--danger">Paper only</span>

Adds map decorations to filled maps.

**Minecraft Wiki:** [map_decorations](https://minecraft.wiki/w/Data_component_format#map_decorations)

| Key        | Type    | Description                                                                                                                   |
|------------|---------|-------------------------------------------------------------------------------------------------------------------------------|
| `type`     | String  | Decoration type (e.g., `red_marker`) [full list](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/map/MapCursor.Type.html) |
| `x`        | Integer | X coordinate on the map                                                                                                       |
| `z`        | Integer | Z coordinate on the map                                                                                                       |
| `rotation` | Integer | Rotation                                                                                                                      |

```yaml
components:
  map_decorations:
    - type: red_marker
      x: 100
      z: -50
      rotation: 0
    - type: blue_marker
      x: -30
      z: 75
      rotation: 4
```

---

### note_block_sound <span class="badge badge--danger">Paper only</span>

Sets the sound played when a note block item is placed.

**Minecraft Wiki:** [note_block_sound](https://minecraft.wiki/w/Data_component_format#note_block_sound)

```yaml
components:
  note_block_sound: "minecraft:block.note_block.bell"
```

---

### pot_decorations <span class="badge badge--danger">Paper only</span>

Adds decorations to decorated pots.
Requires the item to be a pottery shard or brick. Each decoration is represented by a string ID corresponding to a specific pattern or design.

**Minecraft Wiki:** [pot_decorations](https://minecraft.wiki/w/Data_component_format#pot_decorations)

```yaml
components:
  pot_decorations:
    - "skull_pottery_sherd"
    - "heart_pottery_sherd"
    - "blade_pottery_sherd"
    - "brick"
```

---

## equippable <span class="badge badge--danger">1.21.2+</span>

Configures equipment properties for any item.

**Minecraft Wiki:** [equippable](https://minecraft.wiki/w/Data_component_format#equippable)

| Key                 | Type    | Default | Description                                                                    |
|---------------------|---------|---------|--------------------------------------------------------------------------------|
| `slot`              | String  | -       | Equipment slot: `HEAD`, `CHEST`, `LEGS`, `FEET`, `MAINHAND`, `OFFHAND`, `BODY` |
| `equip-sound`       | String  | -       | Sound when equipping                                                           |
| `asset-id`          | String  | -       | Resource location for the equipment model                                      |
| `dispensable`       | Boolean | `true`  | Can be equipped by dispensers                                                  |
| `swappable`         | Boolean | `true`  | Can be swapped with other equipment                                            |
| `damage-on-hurt`    | Boolean | `true`  | Takes damage when the entity is hurt                                           |
| `equip-on-interact` | Boolean | `false` | Equip on right-click interaction                                               |
| `camera-overlay`    | String  | -       | Resource location for camera overlay                                           |
| `can-be-sheared`    | Boolean | `false` | Can be sheared off the entity                                                  |
| `shearing-sound`    | String  | -       | Sound when shearing                                                            |
| `allowed-entities`  | List    | -       | Entities that can wear this item                                               |

```yaml
components:
  equippable:
    slot: HEAD
    equip-sound: item.armor.equip_leather
    asset-id: "minecraft:leather"
    dispensable: true
    swappable: true
    damage-on-hurt: true
    equip-on-interact: false
    can-be-sheared: false
    allowed-entities:
      - minecraft:player
      - minecraft:armor_stand
```

---

## firework-explosion

Configures a single firework star explosion effect.

**Minecraft Wiki:** [firework_explosion](https://minecraft.wiki/w/Data_component_format#firework_explosion)

| Key           | Type       | Description                                                                                                                                                                             |
|---------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `shape`       | String     | Shape: `BALL`, `LARGE_BALL`, `BURST`, `CREEPER`, `STAR`                                                                                                                                 |
| `colors`      | Color/List | Primary color(s). Each entry can be a hex string (e.g., `"#FFAA00"` or `"#80FFAA00"`), an integer (RGB or ARGB), a list of floats (RGB[A], 0.0–1.0), or a list of ints (RGB[A], 0–255). |
| `fade_colors` | Color/List | Fade color(s). Same formats as `colors`.                                                                                                                                                |
| `has_trail`   | Boolean    | Has trail effect                                                                                                                                                                        |
| `has_twinkle` | Boolean    | Has twinkle/flicker effect                                                                                                                                                              |

**Accepted Color Formats for `colors` and `fade_colors`:**

| Type          | Description                                     |
|---------------|-------------------------------------------------|
| String        | Hex string (e.g., `"#FFAA00"` or `"#80FFAA00"`) |
| Integer       | Integer RGB or ARGB (decimal)                   |
| List<Float>   | List of floats (RGB[A], 0.0–1.0)                |
| List<Integer> | List of ints (RGB[A], 0–255)                    |

```yaml
components:
  firework-explosion:
    shape: STAR
    # Only use one of the following formats for colors:
    colors: "#FFAA00"         # Hex string (RRGGBB)
    # colors: "#80FFAA00"       # Hex string (AARRGGBB)
    # colors: 16755200          # Integer RGB (decimal)
    # colors: [1.0, 0.5, 0.0]   # List of floats (RGB, 0.0–1.0)
    # colors: [1.0, 0.5, 0.0, 0.5] # List of floats (RGBA, 0.0–1.0)
    # colors: [255, 128, 0]     # List of ints (RGB, 0–255)
    # colors: [128, 255, 128, 0]# List of ints (RGBA, 0–255)
    # Only use one of the following formats for fade_colors:
    fade_colors: "#FFFF00"         # Hex string (RRGGBB)
    # fade_colors: "#80FFFF00"       # Hex string (AARRGGBB)
    # fade_colors: 16776960          # Integer RGB (decimal)
    # fade_colors: [1.0, 1.0, 0.0]   # List of floats (RGB, 0.0–1.0)
    # fade_colors: [1.0, 1.0, 0.0, 0.5] # List of floats (RGBA, 0.0–1.0)
    # fade_colors: [255, 255, 0]     # List of ints (RGB, 0–255)
    # fade_colors: [128, 255, 255, 0]# List of ints (RGBA, 0–255)
    has_trail: true
    has_twinkle: true
```

---

## fireworks

Configures firework rockets.

**Minecraft Wiki:** [fireworks](https://minecraft.wiki/w/Data_component_format#fireworks)

| Key               | Type    | Default | Description               |
|-------------------|---------|---------|---------------------------|
| `flight-duration` | Integer | `1`     | Flight duration (1-3)     |
| `explosions`      | List    | `[]`    | List of explosion effects |

Each entry in `explosions` follows the same properties as [`firework-explosion`](#firework-explosion).

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

---

## food

Makes any item edible.

**Minecraft Wiki:** [food](https://minecraft.wiki/w/Data_component_format#food)

| Key              | Type    | Default | Required | Description                        |
|------------------|---------|---------|----------|------------------------------------|
| `nutrition`      | Integer | -       | Yes      | Food points restored (hunger bars) |
| `saturation`     | Float   | -       | Yes      | Saturation modifier                |
| `can-always-eat` | Boolean | `false` | No       | Can eat even when not hungry       |

```yaml
components:
  food:
    nutrition: 6
    saturation: 0.8
    can-always-eat: true
```

---

## glider <span class="badge badge--danger">1.21.2+</span>

Makes the item function as an elytra when equipped in the chest slot.

**Minecraft Wiki:** [glider](https://minecraft.wiki/w/Data_component_format#glider)

```yaml
components:
  glider: true
```

---

## instrument

Configures goat horn instrument properties.

**Minecraft Wiki:** [instrument](https://minecraft.wiki/w/Data_component_format#instrument)

**Simple (by instrument name):**
```yaml
components:
  instrument: "minecraft:ponder_goat_horn"
```

**Advanced configuration:**

| Key            | Type   | Description                |
|----------------|--------|----------------------------|
| `sound-event`  | String | Sound to play              |
| `use-duration` | Float  | Duration of use in seconds |
| `range`        | Float  | Hearing range in blocks    |
| `description`  | String | Instrument description     |

```yaml
components:
  instrument:
    sound-event: "minecraft:ponder_goat_horn"
    use-duration: 7.0
    range: 256.0
    description: "A mysterious goat horn"
```

**Available Instruments:** `ponder_goat_horn`, `sing_goat_horn`, `seek_goat_horn`, `feel_goat_horn`, `admire_goat_horn`, `call_goat_horn`, `yearn_goat_horn`, `dream_goat_horn`

---

## item-model <span class="badge badge--danger">1.21.2+</span>

Sets the item model directly.

**Minecraft Wiki:** [item_model](https://minecraft.wiki/w/Data_component_format#item_model)

```yaml
components:
  item-model: "minecraft:custom/my_model"
```

---

## item-name

Sets the item's base name (cannot be changed in anvil, shown in italic).

**Minecraft Wiki:** [item_name](https://minecraft.wiki/w/Data_component_format#item_name)

```yaml
components:
  item-name: "&6Special Item"
```

---

## jukebox-playable <span class="badge badge--danger">1.21+</span>

Makes the item playable in a jukebox.

**Minecraft Wiki:** [jukebox_playable](https://minecraft.wiki/w/Data_component_format#jukebox_playable)

```yaml
components:
  jukebox-playable: "minecraft:music_disc.cat"
```

---

## kinetic-weapon <span class="badge badge--danger">1.21.11+</span>

Configures lance-like weapon behavior for mounted combat.

**Minecraft Wiki:** [kinetic_weapon](https://minecraft.wiki/w/Data_component_format#kinetic_weapon)

| Key                    | Type    | Default | Description                       |
|------------------------|---------|---------|-----------------------------------|
| `delay-ticks`          | Integer | `0`     | Delay before attack in ticks      |
| `forward-movement`     | Float   | `0`     | Forward movement on hit           |
| `damage-multiplier`    | Float   | `1`     | Damage multiplier                 |
| `sound`                | String  | -       | Sound when charging               |
| `hit-sound`            | String  | -       | Sound when hitting                |
| `damage-conditions`    | Object  | -       | Conditions for dealing damage     |
| `dismount-conditions`  | Object  | -       | Conditions for dismounting target |
| `knockback-conditions` | Object  | -       | Conditions for knockback          |

**Condition Properties:**
| Key | Type | Description |
|-----|------|-------------|
| `max-duration-ticks` | Integer | Maximum duration for condition |
| `min-speed` | Float | Minimum player speed |
| `min-relative-speed` | Float | Minimum speed relative to target |

```yaml
components:
  kinetic-weapon:
    delay-ticks: 0
    forward-movement: 0.5
    damage-multiplier: 2.0
    sound: "entity.player.attack.sweep"
    hit-sound: "entity.player.attack.strong"
    damage-conditions:
      max-duration-ticks: 100
      min-speed: 0.5
      min-relative-speed: 0.3
    dismount-conditions:
      max-duration-ticks: 50
      min-speed: 0.8
      min-relative-speed: 0.5
```

---

## lodestone-tracker

Configures compass lodestone tracking.

**Minecraft Wiki:** [lodestone_tracker](https://minecraft.wiki/w/Data_component_format#lodestone_tracker)

| Key                | Type                | Default | Description                      |
|--------------------|---------------------|---------|----------------------------------|
| `tracked`          | Boolean             | `true`  | Whether the lodestone is tracked |
| `target.post`      | List&lt;Integer&gt; | -       | Target coordinates [x, y, z]     |
| `target.dimension` | String              | -       | World name                       |

```yaml
components:
  lodestone-tracker:
    tracked: true
    target:
      post: [100, 64, -200]
      dimension: world
```

---

## lore

Sets the item's description lines.

**Minecraft Wiki:** [lore](https://minecraft.wiki/w/Data_component_format#lore)

```yaml
components:
  lore:
    - "&7Line 1"
    - "&7Line 2"
    - ""
    - "&eClick to use!"
```

Or as a single line:

```yaml
components:
  lore: "&7A simple description"
```

---

## map-color

Sets the map marker color for filled maps.

**Minecraft Wiki:** [map_color](https://minecraft.wiki/w/Data_component_format#map_color)

> [!NOTE]
> The `map-color` field uses the same color parsing method as [`firework-explosion`](#firework-explosion) `colors` and `fade_colors`. All supported formats (hex string, integer, float/int arrays/lists) are accepted.

```yaml
components:
  map-color: "#FF5555"
  # map-color: 16737717
  # map-color: [1.0, 0.33, 0.33]
  # map-color: [255, 85, 85]
```

---

## map-id

Sets the map ID for filled maps.

**Minecraft Wiki:** [map_id](https://minecraft.wiki/w/Data_component_format#map_id)

```yaml
components:
  map-id: 1234
```

---

## max-damage

Sets the maximum durability of the item.

**Minecraft Wiki:** [max_damage](https://minecraft.wiki/w/Data_component_format#max_damage)

```yaml
components:
  max-damage: 2000
```

---

## max-stack-size

Override the maximum stack size (1-99).

**Minecraft Wiki:** [max_stack_size](https://minecraft.wiki/w/Data_component_format#max_stack_size)

```yaml
components:
  max-stack-size: 16
```

---

## minimum-attack-charge <span class="badge badge--danger">1.21.11+</span>

Sets the minimum attack charge required to deal damage.

**Minecraft Wiki:** [minimum_attack_charge](https://minecraft.wiki/w/Data_component_format#minimum_attack_charge)

```yaml
components:
  minimum-attack-charge: 0.5
```

---

## ominous-bottle-amplifier

Sets the Bad Omen amplifier for ominous bottles.

**Minecraft Wiki:** [ominous_bottle_amplifier](https://minecraft.wiki/w/Data_component_format#ominous_bottle_amplifier)

```yaml
components:
  ominous-bottle-amplifier: 4
```

---

## piercing-weapon <span class="badge badge--danger">1.21.11+</span>

Configures trident-like weapon behavior.

**Minecraft Wiki:** [piercing_weapon](https://minecraft.wiki/w/Data_component_format#piercing_weapon)

| Key               | Type    | Default | Description                  |
|-------------------|---------|---------|------------------------------|
| `deals-knockback` | Boolean | `true`  | Whether hits deal knockback  |
| `dismounts`       | Boolean | `false` | Whether hits dismount riders |
| `sound`           | String  | -       | Sound when thrown            |
| `hit-sound`       | String  | -       | Sound when hitting           |

```yaml
components:
  piercing-weapon:
    deals-knockback: true
    dismounts: true
    sound: "item.trident.throw"
    hit-sound: "item.trident.hit"
```

---

## potion-contents

Configures potion effects and appearance.

**Minecraft Wiki:** [potion_contents](https://minecraft.wiki/w/Data_component_format#potion_contents)

| Key | Type | Description |
|-----|------|-------------|
| `potion` | String | Base potion type (e.g., `speed`, `healing`) |
| `custom-color` | String/Number/List | Custom potion color. **Uses the same color parsing method as [`firework-explosion`](#firework-explosion) `colors` and `fade_colors`.** |
| `custom-name` | String | Custom potion name |
| `custom-effects` | List | List of custom potion effects |

> [!NOTE]
> The `custom-color` field accepts all formats supported by [`firework-explosion`](#firework-explosion) `colors`: hex string, integer, list of floats, or list of ints. Refer to that section for a full table and YAML examples.

**Custom Effect Properties:**
| Key | Type | Description |
|-----|------|-------------|
| `type` | String | Effect type (e.g., `speed`, `jump_boost`) |
| `amplifier` | Integer | Effect level (0 = level 1) |
| `duration` | Integer | Duration in ticks (20 ticks = 1 second) |
| `ambient` | Boolean | Ambient particles (like beacon) |
| `show-particles` | Boolean | Show effect particles |
| `show-icon` | Boolean | Show effect icon |

```yaml
components:
  potion-contents:
    potion: speed
    # Only use one of the following formats for custom-color:
    custom-color: "#FF0000"         # Hex string (RRGGBB)
    # custom-color: "#80FF0000"       # Hex string (AARRGGBB)
    # custom-color: 16711680          # Integer RGB (decimal)
    # custom-color: [1.0, 0.0, 0.0]   # List of floats (RGB, 0.0–1.0)
    # custom-color: [1.0, 0.0, 0.0, 0.5] # List of floats (RGBA, 0.0–1.0)
    # custom-color: [255, 0, 0]     # List of ints (RGB, 0–255)
    # custom-color: [128, 255, 0, 0]# List of ints (RGBA, 0–255)
    custom-name: "&cSuper Speed Potion"
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

### hide_tooltip

Hides the tooltip when hovering over the item.

**Minecraft Wiki:** [hide_tooltip](https://minecraft.wiki/w/Data_component_format#hide_tooltip)

| Key | Type | Description |
|-----|------|-------------|
| `hide_tooltip` | Boolean | Whether to hide the tooltip |

```yaml
components:
  hide_tooltip: true
```

#### Paper only

One more setting to hide specific tooltip lines:
| Key | Type | Description |
|-----|------|-------------|
| `hidden_components` | List | List of component types to hide from tooltip (e.g., `ATTACK_RANGE`, `ATTRIBUTE_MODIFIERS`) [full list](https://jd.papermc.io/paper/1.21.11/io/papermc/paper/datacomponent/DataComponentTypes.html) |

```yaml
components:
  hide_tooltip: true
  hidden_components:
    - ATTACK_RANGE
    - ATTRIBUTE_MODIFIERS
```



---

## potion-duration-scale <span class="badge badge--danger">1.21.5+</span>

Scales the duration of potion effects.

**Minecraft Wiki:** [potion_duration_scale](https://minecraft.wiki/w/Data_component_format#potion_duration_scale)

```yaml
components:
  potion-duration-scale: 1.5
```

---

## profile <span class="badge badge--danger">1.21.9+</span>

Configures player head appearance.

**Minecraft Wiki:** [profile](https://minecraft.wiki/w/Data_component_format#profile)

**Simple (by player name or UUID):**
```yaml
components:
  profile: "Notch"
```

```yaml
components:
  profile: "069a79f4-44e9-4726-a5be-fca90e38aaf5"
```

**By texture URL:**
```yaml
components:
  profile: "http://textures.minecraft.net/texture/abc123..."
```

**Advanced configuration:**
```yaml
components:
  profile:
    id: "069a79f4-44e9-4726-a5be-fca90e38aaf5"
    name: "Notch"
    texture: "http://textures.minecraft.net/texture/..."
    model: classic  # or "slim"
    cape: "http://textures.minecraft.net/texture/..."
```

---

## rarity

Sets the item rarity, which affects the name color.

**Minecraft Wiki:** [rarity](https://minecraft.wiki/w/Data_component_format#rarity)

```yaml
components:
  rarity: EPIC
```

**Available Values:**
- `COMMON` - White name
- `UNCOMMON` - Yellow name
- `RARE` - Aqua name
- `EPIC` - Light purple name

---

## recipes

Unlocks recipes when item is obtained (knowledge book).

**Minecraft Wiki:** [recipes](https://minecraft.wiki/w/Data_component_format#recipes)

```yaml
components:
  recipes:
    - "minecraft:diamond_sword"
    - "minecraft:diamond_pickaxe"
    - "minecraft:enchanting_table"
```

---

## repair-cost

Sets the anvil repair cost.

**Minecraft Wiki:** [repair_cost](https://minecraft.wiki/w/Data_component_format#repair_cost)

```yaml
components:
  repair-cost: 5
```

---

## stored-enchantments

Enchantments stored in enchanted books. 
Supported enchantments are the same as the [`enchantments`](#enchantments) component, but these enchantments are only stored in the book and do not apply any effects until transferred to an item using an anvil.

**Minecraft Wiki:** [stored_enchantments](https://minecraft.wiki/w/Data_component_format#stored_enchantments)

```yaml
components:
  stored-enchantments:
    mending: 1
    unbreaking: 3
```

---

## suspicious-stew-effects

Sets potion effects for suspicious stew.

**Minecraft Wiki:** [suspicious_stew_effects](https://minecraft.wiki/w/Data_component_format#suspicious_stew_effects)

| Key            | Type    | Description                                          |
|----------------|---------|------------------------------------------------------|
| id             | String  | Potion effect type (e.g., `blindness`, `saturation`) |
| duration       | Integer | Effect duration in ticks (20 ticks = 1 second)       |
| amplifier      | Boolean | Effect level (0 = level 1)                           |
| ambient        | Boolean | Ambient particles (like beacon)                      |
| show_particles | Boolean | Show effect particles                                |
| show_icon      | Boolean | Show effect icon                                     |

```yaml
components:
  suspicious-stew-effects:
    - type: blindness
      amplifier: 0
      duration: 100
    - type: saturation
      amplifier: 0
      duration: 200
```

---

## swing-animation <span class="badge badge--danger">1.21.11+</span>

Configures the swing animation when using the item.

**Minecraft Wiki:** [swing_animation](https://minecraft.wiki/w/Data_component_format#swing_animation)

| Key        | Type    | Default | Description                 |
|------------|---------|---------|-----------------------------|
| `duration` | Integer | `6`     | Animation duration in ticks |
| `type`     | String  | `WHACK` | Animation type              |

```yaml
components:
  swing-animation:
    duration: 6
    type: WHACK
```

**Animation Types:** `WHACK`, `BRUSH`

---

## tool

Turn any item into a tool with mining capabilities.

**Minecraft Wiki:** [tool](https://minecraft.wiki/w/Data_component_format#tool)

| Key                              | Type    | Default | Description                           |
|----------------------------------|---------|---------|---------------------------------------|
| `default-mining-speed`           | Float   | `1.0`   | Default speed for blocks not in rules |
| `damage-per-block`               | Integer | `1`     | Durability lost per block mined       |
| `can-destroy-blocks-in-creative` | Boolean | `true`  | Can break blocks in creative mode     |
| `rules`                          | List    | `[]`    | Block-specific mining rules           |

**Rule Properties:**
| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `blocks` | List/String | - | Block(s) or block tag |
| `speed` | Float | `1.0` | Mining speed for these blocks |
| `correct-for-drops` | Boolean | `false` | Whether blocks drop items when mined |

```yaml
components:
  tool:
    default-mining-speed: 1.0
    damage-per-block: 1
    can-destroy-blocks-in-creative: true
    rules:
      - blocks:
          - minecraft:stone
          - minecraft:granite
          - minecraft:diorite
        speed: 8.0
        correct-for-drops: true
      - blocks: "#minecraft:mineable/pickaxe"
        speed: 4.0
        correct-for-drops: true
```

---

## tooltip-display <span class="badge badge--danger">1.21.5+</span>

Controls tooltip visibility.

**Minecraft Wiki:** [tooltip_display](https://minecraft.wiki/w/Data_component_format#tooltip_display)

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `hide-tooltip` | Boolean | `false` | Hide the entire tooltip |

```yaml
components:
  tooltip-display:
    hide-tooltip: true
```

---

## tooltip-style <span class="badge badge--danger">1.21.2+</span>

Sets a custom tooltip style from resource packs.

**Minecraft Wiki:** [tooltip_style](https://minecraft.wiki/w/Data_component_format#tooltip_style)

```yaml
components:
  tooltip-style: "minecraft:custom_tooltip"
```

---

## trim

Applies armor trim patterns.

**Minecraft Wiki:** [trim](https://minecraft.wiki/w/Data_component_format#trim)

| Key        | Type   | Required | Description   |
|------------|--------|----------|---------------|
| `material` | String | Yes      | Trim material |
| `pattern`  | String | Yes      | Trim pattern  |

```yaml
components:
  trim:
    material: gold
    pattern: sentry
```

**Materials:** `amethyst`, `copper`, `diamond`, `emerald`, `gold`, `iron`, `lapis`, `netherite`, `quartz`, `redstone`

**Patterns:** `coast`, `dune`, `eye`, `host`, `raiser`, `rib`, `sentry`, `shaper`, `silence`, `snout`, `spire`, `tide`, `vex`, `ward`, `wayfinder`, `wild`

---

## unbreakable

Makes the item unbreakable.

**Minecraft Wiki:** [unbreakable](https://minecraft.wiki/w/Data_component_format#unbreakable)

```yaml
components:
  unbreakable: true
```

---

## use-cooldown <span class="badge badge--danger">1.21.2+</span>

Adds a cooldown after using the item.

**Minecraft Wiki:** [use_cooldown](https://minecraft.wiki/w/Data_component_format#use_cooldown)

| Key              | Type   | Default | Description                                                        |
|------------------|--------|---------|--------------------------------------------------------------------|
| `seconds`        | Float  | `0`     | Cooldown duration in seconds                                       |
| `cooldown-group` | String | -       | Cooldown group identifier (items in the same group share cooldown) |

```yaml
components:
  use-cooldown:
    seconds: 1.0
    cooldown-group: "my_plugin:special_items"
```

---

## use-effects <span class="badge badge--danger">1.21.11+</span>

Configures effects when using the item (like spyglass).

**Minecraft Wiki:** [use_effects](https://minecraft.wiki/w/Data_component_format#use_effects)

| Key                   | Type    | Default | Description                            |
|-----------------------|---------|---------|----------------------------------------|
| `can-sprint`          | Boolean | `false` | Can sprint while using                 |
| `speed-multiplier`    | Float   | `0.2`   | Movement speed multiplier while using  |
| `interact-vibrations` | Boolean | `true`  | Emit sculk vibrations when interacting |

```yaml
components:
  use-effects:
    can-sprint: false
    speed-multiplier: 0.2
    interact-vibrations: true
```

---

## use-remainder <span class="badge badge--danger">1.21.2+</span>

Item left after using (like bowls from stew).
Use zMenu item syntax here.

**Minecraft Wiki:** [use_remainder](https://minecraft.wiki/w/Data_component_format#use_remainder)

```yaml
components:
  use-remainder:
    material: BOWL
    amount: 1
```

---

### death_protection <span class="badge badge--danger">Paper only</span> <span class="badge badge--danger">1.21.2+</span>

Configures death protection for items (similar to a Totem of Undying).

**Minecraft Wiki:** [death_protection](https://minecraft.wiki/w/Data_component_format#death_protection)

| Key             | Type | Description                                      |
|-----------------|------|--------------------------------------------------|
| `death_effects` | List | List of effects to apply when death is prevented |

```yaml
components:
  death_protection:
    death_effects:
      - type: APPLY_EFFECTS
        probability: 1.0
        effects:
          - id: regeneration
            amplified: true
            duration: 900
          - id: fire_resistance
            duration: 800
          - id: absorption
            amplified: true
            duration: 100
      - type: PLAY_SOUND
        sound: item.totem.use
      - type: TELEPORT_RANDOMLY
        diameter: 16.0
      - type: CLEAR_ALL_EFFECTS
      - type: REMOVE_EFFECTS
        effects:
          - poison
          - wither
```

**Effect Types:**
- `APPLY_EFFECTS` - Apply potion effects with probability
- `PLAY_SOUND` - Play a sound
- `TELEPORT_RANDOMLY` - Teleport randomly within diameter
- `CLEAR_ALL_EFFECTS` - Clear all potion effects
- `REMOVE_EFFECTS` - Remove specific effects

---

### repairable <span class="badge badge--danger">Paper only</span> <span class="badge badge--danger">1.21.2+</span>

Configures item repair behavior.

**Minecraft Wiki:** [repairable](https://minecraft.wiki/w/Data_component_format#repairable)

```yaml
components:
  repairable:
    items:
      - minecraft:diamond
      - minecraft:netherite_ingot
```

---

## weapon <span class="badge badge--danger">1.21.5+</span>

Configures weapon damage properties.

**Minecraft Wiki:** [weapon](https://minecraft.wiki/w/Data_component_format#weapon)

| Key                            | Type    | Default | Description                         |
|--------------------------------|---------|---------|-------------------------------------|
| `item-damage-per-attack`       | Integer | `1`     | Durability lost per attack          |
| `disable-blocking-for-seconds` | Float   | `0`     | Duration to disable shield blocking |

```yaml
components:
  weapon:
    item-damage-per-attack: 1
    disable-blocking-for-seconds: 5.0
```

---

### provides_banner_patterns <span class="badge badge--danger">Paper only</span> <span class="badge badge--danger">1.21.5+</span>

Configures banner pattern providing behavior for items.

**Minecraft Wiki:** [provides_banner_patterns](https://minecraft.wiki/w/Data_component_format#provides_banner_patterns)

```yaml
components:
  provides_banner_patterns: "minecraft:flower_banner_pattern"
```

---

### provides_trim_material <span class="badge badge--danger">Paper only</span> <span class="badge badge--danger">1.21.5+</span>

Configures trim material providing behavior for items.

**Minecraft Wiki:** [provides_trim_material](https://minecraft.wiki/w/Data_component_format#provides_trim_material)

```yaml
components:
  provides_trim_material: "minecraft:gold"
```

---

## writable-book-content

Content for book and quill (writable book).

**Minecraft Wiki:** [writable_book_content](https://minecraft.wiki/w/Data_component_format#writable_book_content)

| Key     | Type | Description                         |
|---------|------|-------------------------------------|
| `pages` | List | List of pages with raw text content |

```yaml
components:
  writable-book-content:
    pages:
      - title: "My Journal"
        raw: "Day 1: Started my adventure..."
      - raw: "Day 2: Found a village..."
      - raw: "Day 3: Discovered a stronghold!"
```

---

## written-book-content

Content for signed written books.

**Minecraft Wiki:** [written_book_content](https://minecraft.wiki/w/Data_component_format#written_book_content)

| Key          | Type   | Description                                                                 |
|--------------|--------|-----------------------------------------------------------------------------|
| `title`      | String | Book title                                                                  |
| `author`     | String | Book author name                                                            |
| `generation` | String | Book generation: `ORIGINAL`, `COPY_OF_ORIGINAL`, `COPY_OF_COPY`, `TATTERED` |
| `pages`      | List   | List of pages with raw text content                                         |

```yaml
components:
  written-book-content:
    title: "The Legend of Herobrine"
    author: "Notch"
    generation: ORIGINAL
    pages:
      - raw: "Chapter 1\n\nIt was a dark and stormy night..."
      - raw: "Chapter 2\n\nThe mysterious figure appeared..."
      - raw: "The End"
```

---

### axolotl/variant

Configures axolotl variant for axolotl.

```yaml
components:
  axolotl/variant: "lucy"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Axolotl.Variant.html)

---

### cat/collar

Configures cat collar color for cat.

```yaml
components:
  cat/collar: "red"
```

---

### cat/variant

Configures cat variant for cat.

```yaml
components:
  cat/variant: "siamese"
```

**Available Variants:* can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Cat.Type.html)

---

### chicken/variant <span class="badge badge--danger">1.21.5+</span>

Configures chicken variant for chicken.

```yaml
components:
  chicken/variant: "COLD"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Chicken.Variant.html)

---

### cow/variant <span class="badge badge--danger">1.21.5+</span>

Configures cow variant for cow.

```yaml
components:
  cow/variant: "COLD"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Cow.Variant.html)

---

### fox/variant

Configures fox variant for fox.

```yaml
components:
  fox/variant: "RED"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Fox.Type.html)

---

### frog/variant

Configures frog variant for frog.

```yaml
components:
  frog/variant: "TEMPERATE"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Frog.Variant.html)

---

### horse/variant

Configures horse variant for horse.

```yaml
components:
  horse/variant: "BLACK"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Horse.Color.html)

---

### llama/variant

Configures llama variant for llama.

```yaml
components:
  llama/variant: "CREAMY"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Llama.Color.html)

---

### mooshroom/variant

Configures mooshroom variant for mooshroom.

```yamlcomponents:
  mooshroom/variant: "BROWN"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/MushroomCow.Variant.html)

---

### painting/variant <span class="badge badge--danger">1.20.5+</span>

Configures painting variant for painting.

```yaml
components:
  painting/variant: "WITHER"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Art.html)

---

### parrot/variant

Configures parrot variant for parrot.

```yaml
components:
  parrot/variant: "BLUE"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Parrot.Variant.html)

---

### pig/variant <span class="badge badge--danger">1.21.5+</span>

Configures pig variant for pig.

```yaml
components:
  pig/variant: "COLD"
``` 

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Pig.Variant.html)

---

### rabbit/variant

Configures rabbit variant for rabbit.

```yaml
components:
  rabbit/variant: "BLACK"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Rabbit.Type.html)

---

### salmon/size <span class="badge badge--danger">1.21.5+</span>

Configures salmon size for salmon.

```yaml
components:
  salmon/size: "SMALL"
```

**Available Sizes:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Salmon.Variant.html)

---


### sheep/color

Configures sheep color for sheep.

```yaml
components:
  sheep/color: "BLACK"
```

**Available Colors:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/DyeColor.html)

---

### shulker/color

Configures shulker color for shulker.

```yaml
components:
  shulker/color: "PURPLE"
```

**Available Colors:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/DyeColor.html)

---

---

### tropical_fish/base_color

Configures tropical fish base color.

```yaml
components:
  tropical_fish/base_color: "ORANGE"
```

**Available Colors:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/DyeColor.html)

---

### tropical_fish/pattern_color

Configures tropical fish pattern color.

```yaml
components:
  tropical_fish/pattern_color: "BLUE"
```

**Available Colors:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/DyeColor.html)

---

### villager/variant

Configures villager variant for villager.

```yaml
components:
  villager/variant: "PLAINS"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Villager.Type.html)

---

### wolf/variant <span class="badge badge--danger">1.20.5+</span>

Configures wolf variant for wolf.

```yaml
components:
  wolf/variant: "RED"
```

**Available Variants:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/Wolf.Variant.html)

---

### wolf/collar <span class="badge badge--danger">1.20.5+</span>

Configures wolf collar color for wolf.

```yaml
components:
  wolf/collar: "BLUE"
```

**Available Colors:** can be found [here](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/DyeColor.html)

---

## Complete Example

Here's a complete example of a custom legendary sword using components:

```yaml
item:
  material: DIAMOND_SWORD
  components:
    item-name: "&6&l✦ Excalibur ✦"
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
      sharpness: 10
      fire_aspect: 2
      unbreaking: 5
      mending: 1
    enchantment-glint-override: true
    attribute-modifiers:
      - type: generic.attack_damage
        amount: 15
        operation: add_value
        slot: mainhand
      - type: generic.attack_speed
        amount: 1.6
        operation: add_value
        slot: mainhand
    unbreakable: true
    max-damage: 5000
    attack-range:
      max-reach: 4
      max-creative-reach: 6
```

---

## Version Compatibility

| Component                                                                                                                                                                                                                                                                                                                      | Minimum Version |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| Most components                                                                                                                                                                                                                                                                                                                | 1.20.5          |
| `food`, `tool`, `container-loot`, `custom-data`, `damage-resistant`, `ominous-bottle-amplifier`, `painting/variant`, `wolf/variant`, `wolf/collar`                                                                                                                                                                             | 1.20.5          |
| `jukebox-playable`                                                                                                                                                                                                                                                                                                             | 1.21            |
| `consumable`, `enchantable`, `equippable`, `glider`, `item-model`, `tooltip-style`, `use-cooldown`, `use-remainder`, `death_protection`, `repairable`                                                                                                                                                                          | 1.21.2          |
| `blocks-attacks`, `break-sound`, `potion-duration-scale`, `tooltip-display`, `weapon`, `provides_banner_patterns`, `provides_trim_material`, `chicken/variant`, `cow/variant`, `pig/variant`, `salmon/size`                                                                                                                     | 1.21.5          |
| `profile`                                                                                                                                                                                                                                                                                                                      | 1.21.9          |
| `attack-range`, `damage-type`, `kinetic-weapon`, `minimum-attack-charge`, `piercing-weapon`, `swing-animation`, `use-effects`                                                                                                                                                                                                  | 1.21.11         |

## Next Steps

- Learn how to use components in [Item Configuration](./item)
- Add items to [Buttons](../buttons/button)
- Create [Patterns](../patterns) for reusable templates
