---
sidebar_position: 1
title: Introduction
description: Create custom items with powerful effects for Minecraft 1.21+
---

# zItems

zItems is a powerful Minecraft plugin that allows you to create custom items with unique effects, metadata, and properties. From enchanted armor to magical tools, zItems gives you complete control over item creation.

- **SpigotMC**: [https://www.spigotmc.org/resources/zitems.118638/](https://www.spigotmc.org/resources/zitems.118638/)
- **GitHub**: [https://github.com/Traqueur-dev/zItems](https://github.com/Traqueur-dev/zItems)
- **Discord**: [https://discord.groupez.dev](https://discord.groupez.dev)

## Requirements

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.21+ |
| Java | Java 21 |
| Server Software | Paper, Purpur, or Folia |

## Key Features

### Custom Items

Create items with extensive customization:

- **Materials & Display**: Use any Minecraft material with custom names, lores, and custom model data
- **Enchantments**: Add vanilla or custom enchantments with any level
- **Attributes**: Modify damage, speed, armor, health, and more
- **Item Flags**: Hide enchantments, attributes, or other item properties
- **Recipes**: Define crafting recipes (shaped, shapeless, furnace, etc.)

### Effects System

Add powerful abilities to your items:

| Effect | Description |
|--------|-------------|
| `VEIN_MINING` | Mines entire ore veins at once |
| `HAMMER` | Mines in a 3x3 (or larger) area |
| `AUTO_SELL` | Automatically sells mined/killed drops |
| `SILK_SPAWNER` | Allows picking up spawners with silk touch |
| `MELT_MINING` | Auto-smelts mined ores (fortune compatible) |
| `XP_BOOST` | Multiplies XP drops from mining |
| `FARMING_HOE` | Harvest, till, and plant in area |
| `SELL_STICK` | Sell container contents by clicking |
| `INFINITE_BUCKET` | Unlimited water/lava placement |
| `ABSORPTION` | Items go directly to inventory |
| `ENCHANTS_APPLICATOR` | Modifies enchantment levels |
| `ATTRIBUTES_APPLICATOR` | Adds/modifies attributes |
| `UNBREAKABLE` | Prevents durability loss |

### Metadata System

Configure special item properties:

| Metadata | Description |
|----------|-------------|
| `food` | Make any item edible with nutrition, saturation, and effects |
| `potion` | Add potion effects to items |
| `leather-armor` | Set leather armor color |
| `trim` | Apply armor trims |
| `banner` | Add banner patterns |
| `tool` | Custom mining speeds and rules |
| `commands` | Execute commands on item interaction |

### Plugin Integrations

| Plugin | Features |
|--------|----------|
| Jobs Reborn | Money/XP boost effects for jobs |
| PlaceholderAPI | Dynamic placeholders in item names/lore |
| WorldGuard | Region-based effect restrictions |
| ItemsAdder | Custom block support |
| Oraxen | Custom block support |
| Nexo | Custom block support |
| ShopGUI+ | Auto-sell and sell stick support |
| EconomyShopGUI | Auto-sell and sell stick support |
| ZShop | Auto-sell and sell stick support |

## Quick Start

### Basic Item

```yaml
# plugins/zItems/items/legendary_sword.yml
legendary_sword:
  material: DIAMOND_SWORD
  display-name: "<gradient:#ff6b6b:#feca57>Legendary Sword</gradient>"
  lore:
    - ""
    - "<gray>A powerful weapon forged</gray>"
    - "<gray>in the depths of the nether.</gray>"
    - ""
    - "<yellow>Damage: <red>+15</red></yellow>"

  enchantments:
    - enchantment: SHARPNESS
      level: 5
    - enchantment: FIRE_ASPECT
      level: 2

  attributes:
    - attribute: ATTACK_DAMAGE
      operation: ADD_NUMBER
      amount: 15
      slot: MAINHAND

  unbreakable: true
```

### Item with Effects

```yaml
# plugins/zItems/items/vein_pickaxe.yml
vein_pickaxe:
  material: NETHERITE_PICKAXE
  display-name: "<gold>Vein Miner Pickaxe</gold>"
  lore:
    - ""
    - "<gray>Mines entire ore veins!</gray>"
    - "<yellow>Max blocks: <white>32</white></yellow>"

  enchantments:
    - enchantment: EFFICIENCY
      level: 5
    - enchantment: FORTUNE
      level: 3

  effects:
    - type: VEIN_MINING
      tags:
        - MINEABLE_PICKAXE
      block-limit: 32
      damage: 1

    - type: MELT_MINING
```

## Commands

| Command | Description |
|---------|-------------|
| `/zitems give <item> [player] [amount]` | Give a custom item |
| `/zitems giveeffect <effect> [player]` | Give an effect item |
| `/zitems applyeffect <effect>` | Apply effect to held item |
| `/zitems vieweffect` | View effects on held item |
| `/zitems gui` | Open item browser GUI |
| `/zitems reload` | Reload configuration |

## Next Steps

- [Installation Guide](installation) - Detailed setup instructions
- [Item Configuration](configurations/items) - Create custom items
- [Effects System](effects/overview) - Add powerful abilities
- [Metadata System](metadata/overview) - Configure special properties
- [Commands & Permissions](commands-permissions) - Full command reference
