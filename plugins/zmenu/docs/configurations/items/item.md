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

The material type for the item. zMenu supports vanilla Minecraft materials and many custom item plugins.

```yaml
item:
  material: DIAMOND_SWORD
```

#### Material Loaders

zMenu supports many material sources through its loader system:

| Plugin | Syntax | Price | Link                                                   |
|--------|--------|-------|--------------------------------------------------------|
| **Bukkit** | `STONE`, `DIAMOND_SWORD` | Built-in | Vanilla Minecraft                                      |
| **PlaceholderAPI** | `%your_placeholder_material%` | Free | [SpigotMC](https://www.spigotmc.org/resources/6245/)   |
| **Armor (slot)** | `armor:HEAD`, `armor:CHEST`, `armor:LEGS`, `armor:FEET` | Built-in | Player's equipped armor                                |
| **zHead** | `zhd:<id>` | Free | [Polymart](https://polymart.org/resource/2070)         |
| **MagicCosmetics** | `magic_cosmetics:HAT`, `magic_cosmetics:BAG`, etc. | Paid | [Polymart](https://polymart.org/product/6981/magic-cosmetics-gui-non-animated)                                           |
| **HMCCosmetics** | `hmc_cosmetics:<type>`, `hmc_cosmetics:<type>-<player>` | Paid | [SpigotMC](https://www.spigotmc.org/resources/100107/) |
| **zItems** | `zitems:<id>` | Paid | [SpigotMC](https://www.spigotmc.org/resources/118638/) |
| **HeadDatabase** | `hdb:<id>` | Paid | [SpigotMC](https://www.spigotmc.org/resources/14280/)  |
| **Oraxen** | `oraxen:<item name>` | Paid | [SpigotMC](https://www.spigotmc.org/resources/72448/)  |
| **ItemsAdder** | `itemsadder:<item name>` | Paid | [SpigotMC](https://www.spigotmc.org/resources/73355/)  |
| **SlimeFun** | `slimefun:<item name>` | Free | [GitHub](https://github.com/Slimefun/Slimefun4)        |
| **Nova** | `nova:<item/block name>` | Free | [GitHub](https://github.com/xenondevs/Nova)            |
| **Base64** | `base64:<item in base64>` | Built-in | Import items as base64 string                          |
| **PlayerHead** | `playerHead:<player name>`, `playerHead:%player%` | Built-in | Display a player's head                                |
| **CraftEngine** | `craftengine:<item id>` | Free | [Modrinth](https://modrinth.com/plugin/craftengine)    |
| **ExecutableItems** | `ei:<item id>` | Paid | [SpigotMC](https://www.spigotmc.org/resources/83070/)  |
| **ExecutableBlocks** | `eb:<block id>` | Paid | [SpigotMC](https://www.spigotmc.org/resources/94696/)  |
| **Nexo** | `nexo:<item id>` | Paid | [MCModels](https://mcmodels.net/products/13172/nexo)   |

**Examples:**

```yaml
# Vanilla material
material: DIAMOND_SWORD

# Player head
material: "playerHead:%player%"

# Custom head from zHead
material: "zhd:123"

# ItemsAdder custom item
material: "itemsadder:my_namespace:ruby_gem"

# Oraxen custom item
material: "oraxen:amethyst_sword"
```

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

### translated-name

Use Minecraft's built-in translation system for item names.

```yaml
item:
  material: DIAMOND_SWORD
  translated-name: "item.minecraft.diamond_sword"
```

This displays the item name in the player's client language.

---

### center-name

Center the item name in the tooltip.

```yaml
item:
  material: DIAMOND
  name: "&6&lRare Item"
  center-name: true
```

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

### lore-type

Define how the lore should be processed.

```yaml
item:
  material: DIAMOND_SWORD
  lore:
    - "&7A powerful weapon"
  lore-type: LEGACY  # or MINIMESSAGE, NONE
```

**Available Types:**

| Type | Description |
|------|-------------|
| `LEGACY` | Use legacy color codes (`&6`, `&l`) |
| `MINIMESSAGE` | Use MiniMessage format |
| `NONE` | No color processing |

---

### translated-lore

Use Minecraft's built-in translation system for lore lines.

```yaml
item:
  material: DIAMOND_SWORD
  translated-lore:
    - "item.minecraft.diamond_sword.desc"
```

---

### center-lore

Center all lore lines in the tooltip.

```yaml
item:
  material: DIAMOND
  lore:
    - "&7A rare gem"
    - "&7Worth a fortune"
  center-lore: true
```

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

### model-id

Set custom model data for resource pack integration.

```yaml
item:
  material: DIAMOND
  model-id: 12345
```

This allows resource packs to display custom models for items.

---

### item-model <span class="badge badge--danger">1.21+</span>

Set the item model using a namespaced key (Minecraft 1.21+).

```yaml
item:
  material: DIAMOND_SWORD
  item-model: "minecraft:custom/my_sword"
```

Or with a custom namespace:

```yaml
item:
  material: DIAMOND_SWORD
  item-model: "mypack:weapons/legendary_blade"
```

---

### equipped-model <span class="badge badge--danger">1.21+</span>

Set the model displayed when the item is equipped (Minecraft 1.21+).

```yaml
item:
  material: DIAMOND_CHESTPLATE
  equipped-model: "minecraft:custom/my_armor"
```

This is used for armor and equipment that changes appearance when worn.

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

### player-head

Display a player's head. The material is automatically set to `PLAYER_HEAD`.

```yaml
item:
  player-head: "%player%"  # Current player's head
  name: "&a%player%'s Head"
```

You can also use a specific player name:

```yaml
item:
  player-head: "Notch"
```

:::tip
You don't need to specify `material: PLAYER_HEAD` when using `player-head`. The plugin handles this automatically.
:::

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

## Components <span class="badge badge--danger">1.20.5+</span>

Starting from Minecraft 1.20.5, items use a new component system. zMenu provides full support for over 40+ component types including food, tools, weapons, attributes, and more.

```yaml
item:
  material: DIAMOND_SWORD
  components:
    custom-name: "&6&lLegendary Sword"
    rarity: EPIC
    enchantments:
      - enchantment: sharpness
        level: 5
    fire-resistant: true
```

For the complete components reference, see the dedicated [Components](./components) page.

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
  player-head: "%player%"
  name: "&6&lPlayer Profile"
  lore:
    - "&7Click to view!"
  glow: true
```

Or with a custom texture URL:

```yaml
item:
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
  player-head: "%player%"
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

### Custom Model Item

```yaml
item:
  material: PAPER
  name: "&e&lMagic Wand"
  lore:
    - "&7Cast powerful spells!"
  model-id: 10001
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
