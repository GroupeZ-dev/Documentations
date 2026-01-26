---
sidebar_position: 4
title: Item Configuration
description: How to create custom items in zItems
---

# Item Configuration

This guide explains how to create and configure custom items in zItems.

## File Structure

Items are stored in `plugins/zItems/items/`. Each YAML file represents one item:

```
plugins/zItems/items/
├── legendary_sword.yml
├── magic_pickaxe.yml
├── healing_apple.yml
└── custom_armor/
    ├── helmet.yml
    ├── chestplate.yml
    ├── leggings.yml
    └── boots.yml
```

## Basic Item Structure

```yaml
# Item display name (supports color codes and MiniMessage)
name: "&6&lLegendary Sword"

# Base material
material: DIAMOND_SWORD

# Item lore (description)
lore:
  - "&7A powerful weapon"
  - ""
  - "&7Damage: &c+15"

# Stack size (optional, default: 1)
amount: 1
```

## Configuration Options

### name

The display name of the item.

```yaml
name: "&6&lLegendary Sword"
```

Supports:
- Color codes (`&6`, `&#FF5500`)
- MiniMessage format
- Placeholders (`%player%`)

---

### material

The base Minecraft material.

```yaml
material: DIAMOND_SWORD
```

Use any valid Minecraft material name.

---

### lore

Description lines displayed on the item.

```yaml
lore:
  - "&7Line 1"
  - "&7Line 2"
  - ""
  - "&eClick to use!"
```

---

### model-id

Custom model data for resource pack integration.

```yaml
model-id: 12345
```

---

### enchantments

Add enchantments to the item.

```yaml
enchantments:
  sharpness: 5
  unbreaking: 3
  fire_aspect: 2
  mending: 1
```

---

### attributes

Add attribute modifiers to the item.

```yaml
attributes:
  - type: generic.attack_damage
    amount: 15
    operation: add_value
    slot: mainhand
  - type: generic.movement_speed
    amount: 0.1
    operation: add_multiplied_base
    slot: feet
```

**Attribute Types:**
- `generic.armor`
- `generic.armor_toughness`
- `generic.attack_damage`
- `generic.attack_knockback`
- `generic.attack_speed`
- `generic.knockback_resistance`
- `generic.luck`
- `generic.max_health`
- `generic.movement_speed`

**Operations:**
- `add_value` - Add flat value
- `add_multiplied_base` - Add percentage
- `add_multiplied_total` - Multiply total

**Slots:**
- `mainhand`, `offhand`
- `head`, `chest`, `legs`, `feet`
- `any`

---

### runes

Add runes (special abilities) to the item.

```yaml
runes:
  - vein_mining
  - unbreakable
  - melt_mining
```

See [Runes](runes) for available runes.

---

### unbreakable

Make the item unbreakable.

```yaml
unbreakable: true
```

---

### flags

Hide certain item attributes.

```yaml
flags:
  - HIDE_ENCHANTS
  - HIDE_ATTRIBUTES
  - HIDE_UNBREAKABLE
```

---

## Food Items

Make any item edible:

```yaml
name: "&aEnchanted Apple"
material: GOLDEN_APPLE

food:
  nutrition: 10
  saturation: 1.5
  can-always-eat: true

  # Effects when eaten
  effects:
    - type: SPEED
      amplifier: 1
      duration: 600  # In ticks (600 = 30 seconds)
    - type: REGENERATION
      amplifier: 2
      duration: 100
```

---

## Tool Items

Create custom tools with special mining properties:

```yaml
name: "&b&lMulti-Tool"
material: DIAMOND_PICKAXE

tool:
  default-mining-speed: 8.0
  damage-per-block: 1
  rules:
    - blocks:
        - STONE
        - GRANITE
        - DIORITE
      speed: 12.0
      correct-for-drops: true
    - blocks: "#minecraft:mineable/pickaxe"
      speed: 10.0
      correct-for-drops: true
```

---

## Container Items

Create items that store other items (like bundles):

```yaml
name: "&6&lTreasure Chest"
material: CHEST

container:
  - slot: 0
    material: DIAMOND
    amount: 64
  - slot: 1
    material: EMERALD
    amount: 32
  - slot: 2
    material: GOLD_INGOT
    amount: 16
```

---

## Complete Examples

### Legendary Sword

```yaml
name: "&6&l✦ Excalibur ✦"
material: DIAMOND_SWORD

lore:
  - "&7The legendary sword of kings"
  - ""
  - "&7Damage: &c+15"
  - "&7Attack Speed: &a+1.6"
  - ""
  - "&5&oForged in dragon fire"

enchantments:
  sharpness: 10
  fire_aspect: 2
  unbreaking: 5
  mending: 1

attributes:
  - type: generic.attack_damage
    amount: 15
    operation: add_value
    slot: mainhand
  - type: generic.attack_speed
    amount: 1.6
    operation: add_value
    slot: mainhand

runes:
  - unbreakable

unbreakable: true

flags:
  - HIDE_ATTRIBUTES
```

### Mining Pickaxe with Vein Mining

```yaml
name: "&a&lVein Miner"
material: NETHERITE_PICKAXE

lore:
  - "&7Mines entire ore veins at once!"
  - ""
  - "&7Efficiency: &bV"
  - "&7Fortune: &bIII"
  - ""
  - "&6&lRUNE: &aVein Mining"

enchantments:
  efficiency: 5
  fortune: 3
  unbreaking: 3
  mending: 1

runes:
  - vein_mining
  - melt_mining
```

### Edible Sand (Fun Item)

```yaml
name: "&e&lMagic Sand"
material: SAND

lore:
  - "&7Surprisingly tasty!"
  - ""
  - "&7Restores &c5 hearts"
  - "&7Gives &bSpeed II &7for 10s"

food:
  nutrition: 10
  saturation: 0.5
  can-always-eat: true
  effects:
    - type: SPEED
      amplifier: 1
      duration: 200
    - type: REGENERATION
      amplifier: 1
      duration: 100
```

## Next Steps

- [Configure Runes](runes)
- [Commands Reference](commands-permissions)
