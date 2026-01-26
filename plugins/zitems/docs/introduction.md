---
sidebar_position: 1
title: Introduction
description: Create custom items with powerful abilities for Minecraft 1.21+
---

# zItems

zItems is a powerful Minecraft plugin that allows you to create custom items with unique abilities, runes, and properties. From enchanted armor to magical tools, zItems gives you complete control over item creation.

- **SpigotMC**: [https://www.spigotmc.org/resources/zitems-demo.118638/](https://www.spigotmc.org/resources/zitems-demo.118638/)
- **GitHub**: [https://github.com/Maxlego08/zItems](https://github.com/Maxlego08/zItems)
- **Discord**: [https://discord.groupez.dev](https://discord.groupez.dev)

## Requirements

| Requirement | Version |
|-------------|---------|
| Minecraft | 1.21+ |
| Java | Java 21 |
| Server Software | Paper, Purpur, or Folia |

## Features

### Custom Items

Create items with custom properties:

- **Custom Materials** - Use any Minecraft material as base
- **Custom Names & Lore** - Full color code and MiniMessage support
- **Custom Model Data** - Resource pack integration
- **Custom Attributes** - Modify damage, speed, armor, and more
- **Food Items** - Make any item edible
- **Tool Properties** - Custom mining speeds and block lists
- **Container Items** - Items that store other items (like bundles)

### Runes System

Add powerful abilities to your items with runes:

| Rune | Description |
|------|-------------|
| Absorption | Grants absorption hearts |
| Farming Hoe | Enhanced farming capabilities |
| Hammer | 3x3 mining pattern |
| Job Money Boost | Increases money from jobs |
| Job XP Boost | Increases XP from jobs |
| Melt Mining | Auto-smelts mined ores |
| Protection | Enhanced damage protection |
| Silk Spawner | Allows spawner silk touch |
| Tree Cutter | Cuts entire trees at once |
| Unbreakable | Prevents item durability loss |
| Vein Mining | Mines entire ore veins |
| XP Boost | Increases XP drops |

### Pre-built Items

zItems comes with several example items:

- **armor-trim** - Diamond armor with trim and 25% armor boost
- **custom_seed** - Wheat seed for instant crop maturation
- **food** - Edible sand block
- **glass-breaker** - Tool that only breaks glass
- **loot-chest** - Container with loot contents
- **multitools** - Tool that breaks all block types
- **strength-potion** - Potion with multiple effects
- **hoe** - Enhanced farming tool

## Quick Start

### Installation

1. Download zItems from SpigotMC or Discord
2. Place the JAR file in your `plugins/` folder
3. Restart your server
4. Configure items in `plugins/zItems/items/`

### Basic Commands

```
/zitems reload                    - Reload plugin configuration
/zitems give <item> [player] [amount]  - Give an item to a player
/zitems applyrune <rune>          - Apply a rune to held item
```

### Creating Your First Item

Create a file in `plugins/zItems/items/my_sword.yml`:

```yaml
name: "&6&lLegendary Sword"
material: DIAMOND_SWORD
lore:
  - "&7A powerful weapon"
  - ""
  - "&7Damage: &c+15"
  - ""
  - "&eRight-click for special ability!"

attributes:
  - type: generic.attack_damage
    amount: 15
    operation: add_value
    slot: mainhand

enchantments:
  sharpness: 5
  unbreaking: 3
  fire_aspect: 2

runes:
  - vein_mining
```

## Integration with zMenu

zItems integrates seamlessly with zMenu. Use custom items in your menus:

```yaml
# In your zMenu inventory file
items:
  special-sword:
    slot: 13
    item:
      material: "zitems:legendary_sword"
    actions:
      - type: give_item
        item: "zitems:legendary_sword"
```

## Next Steps

- [Installation Guide](installation) - Detailed setup instructions
- [Item Configuration](items) - Create custom items
- [Runes System](runes) - Add abilities to items
- [Commands & Permissions](commands-permissions) - Full command reference
