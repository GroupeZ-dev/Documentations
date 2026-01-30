---
sidebar_position: 2
title: Quest Types
description: All available quest types in zQuests
---

# Quest Types

zQuests provides over 25 different quest types to track various player activities. This page documents all available quest types and their specific configuration options.

## Block Quests

### BLOCK_BREAK

Track when players break specific blocks.

```yaml
quests:
  - type: BLOCK_BREAK
    name: "stone-miner"
    display-name: "Stone Miner"
    description: "Break 500 stone blocks"
    thumbnail: STONE
    goal: 500
    actions:
      - material: STONE
      - material: COBBLESTONE
      - tag: LOGS  # Use Bukkit tags
```

**Actions format:**
- `material` - [Bukkit Material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html)
- `tag` - [Bukkit Tag](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Tag.html) (e.g., LOGS, PLANKS, WOOL)

---

### BLOCK_PLACE

Track when players place specific blocks.

```yaml
quests:
  - type: BLOCK_PLACE
    name: "builder"
    display-name: "Builder"
    description: "Place 500 blocks"
    thumbnail: BRICKS
    goal: 500
    actions:
      - material: STONE_BRICKS
      - material: BRICKS
      - tag: PLANKS
```

---

## Entity Quests

### ENTITY_KILL

Track when players kill specific entities.

```yaml
quests:
  - type: ENTITY_KILL
    name: "skeleton-hunter"
    display-name: "Skeleton Hunter"
    description: "Kill 50 skeletons"
    thumbnail: BONE
    goal: 50
    actions:
      - entity: SKELETON
      - entity: STRAY
```

**Actions format:**
- `entity` - [Bukkit EntityType](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/EntityType.html)

---

### ENTITY_DAMAGE

Track total damage dealt to entities. No specific entity type required.

```yaml
quests:
  - type: ENTITY_DAMAGE
    name: "damage-dealer"
    display-name: "Damage Dealer"
    description: "Deal 1000 damage to entities"
    thumbnail: IRON_SWORD
    goal: 1000
```

---

### TAME

Track when players tame animals.

```yaml
quests:
  - type: TAME
    name: "animal-tamer"
    display-name: "Animal Tamer"
    description: "Tame 10 horses"
    thumbnail: SADDLE
    goal: 10
    actions:
      - entity: HORSE
      - entity: DONKEY
      - entity: MULE
```

---

### SHEAR

Track when players shear entities.

```yaml
quests:
  - type: SHEAR
    name: "wool-collector"
    display-name: "Wool Collector"
    description: "Shear 50 sheep"
    thumbnail: SHEARS
    goal: 50
    actions:
      - entity: SHEEP
```

---

## Gathering Quests

### FARMING

Track when players harvest crops.

```yaml
quests:
  - type: FARMING
    name: "wheat-farmer"
    display-name: "Wheat Farmer"
    description: "Harvest 500 wheat"
    thumbnail: WHEAT
    goal: 500
    actions:
      - material: WHEAT
```

---

### FISHING

Track when players catch fish.

```yaml
quests:
  - type: FISHING
    name: "fisherman"
    display-name: "Fisherman"
    description: "Catch 20 cod"
    thumbnail: COD
    goal: 20
    actions:
      - material: COD
      - material: SALMON
```

---

## Crafting Quests

### CRAFT

Track when players craft items.

```yaml
quests:
  - type: CRAFT
    name: "chest-crafter"
    display-name: "Chest Crafter"
    description: "Craft 16 chests"
    thumbnail: CHEST
    goal: 16
    actions:
      - material: CHEST
```

---

### SMELT

Track when players smelt items in furnaces.

```yaml
quests:
  - type: SMELT
    name: "iron-smelter"
    display-name: "Iron Smelter"
    description: "Smelt 64 iron ingots"
    thumbnail: IRON_INGOT
    goal: 64
    actions:
      - material: IRON_INGOT
```

---

### SMITHING

Track when players use the smithing table.

```yaml
quests:
  - type: SMITHING
    name: "netherite-smith"
    display-name: "Netherite Smith"
    description: "Upgrade to netherite armor"
    thumbnail: NETHERITE_CHESTPLATE
    goal: 4
    actions:
      - material: NETHERITE_HELMET
      - material: NETHERITE_CHESTPLATE
      - material: NETHERITE_LEGGINGS
      - material: NETHERITE_BOOTS
```

---

## Enchanting & Brewing Quests

### ENCHANT

Track when players enchant items.

```yaml
quests:
  - type: ENCHANT
    name: "enchanter"
    display-name: "Enchanter"
    description: "Apply Sharpness enchantment 5 times"
    thumbnail: ENCHANTED_BOOK
    goal: 5
    actions:
      - enchantment: SHARPNESS
```

**Additional action options:**
- `enchantment` - Required enchantment type
- `material` - Specific item material
- `minimum-level` - Minimum enchantment level
- `minimum-cost` - Minimum XP cost

---

### BREW

Track when players brew potions.

```yaml
quests:
  - type: BREW
    name: "potion-brewer"
    display-name: "Potion Brewer"
    description: "Brew 10 speed potions"
    thumbnail: POTION
    goal: 10
    actions:
      - potion-type: SWIFTNESS
```

**Action options:**
- `potion-type` - [Bukkit PotionType](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/potion/PotionType.html)
- `potion-material` - `POTION` or `SPLASH_POTION`
- `ingredient` - Required ingredient material

---

## Item Quests

### ITEM_BREAK

Track when players break items (use them until durability runs out).

```yaml
quests:
  - type: ITEM_BREAK
    name: "tool-destroyer"
    display-name: "Tool Destroyer"
    description: "Break 3 pickaxes"
    thumbnail: WOODEN_PICKAXE
    goal: 3
    actions:
      - material: WOODEN_PICKAXE
      - material: STONE_PICKAXE
      - material: IRON_PICKAXE
```

---

### ITEM_MENDING

Track durability recovered through Mending or anvils.

```yaml
quests:
  - type: ITEM_MENDING
    name: "repair-master"
    display-name: "Repair Master"
    description: "Recover 1000 durability"
    thumbnail: ANVIL
    goal: 1000
    actions:
      - material: DIAMOND_PICKAXE
```

---

### ITEM_CONSUME

Track when players eat or consume items.

```yaml
quests:
  - type: ITEM_CONSUME
    name: "food-lover"
    display-name: "Food Lover"
    description: "Eat 20 golden apples"
    thumbnail: GOLDEN_APPLE
    goal: 20
    actions:
      - material: GOLDEN_APPLE
      - material: ENCHANTED_GOLDEN_APPLE
```

---

## Exploration Quests

### CUBOID

Track when players enter a specific area.

```yaml
quests:
  - type: CUBOID
    name: "explore-spawn"
    display-name: "Visit Spawn"
    description: "Find the spawn area"
    thumbnail: COMPASS
    goal: 1
    actions:
      - cuboid: "world,100,50,100,200,100,200"
```

**Cuboid format:** `world,x1,y1,z1,x2,y2,z2`

---

### LOOK_AT_BLOCK

Track when players look at a block in a specific area.

```yaml
quests:
  - type: LOOK_AT_BLOCK
    name: "observe-monument"
    display-name: "Observe the Monument"
    description: "Look at the ancient monument"
    thumbnail: SPYGLASS
    goal: 1
    actions:
      - cuboid: "world,100,60,100,110,70,110"
```

Configure detection distance in `config.yml` with `look-at-distance-block`.

---

### LOOK_AT_ENTITY

Track when players look at an entity in a specific area.

```yaml
quests:
  - type: LOOK_AT_ENTITY
    name: "find-villager"
    display-name: "Find the Elder"
    description: "Look at the village elder"
    thumbnail: EMERALD
    goal: 1
    actions:
      - cuboid: "world,100,60,100,110,70,110"
```

Configure detection distance in `config.yml` with `look-at-distance-entity`.

---

## Economy Quests

### SELL

Track items sold through a shop. Works with zShop.

```yaml
quests:
  - type: SELL
    name: "merchant"
    display-name: "Merchant"
    description: "Sell 64 iron ingots"
    thumbnail: IRON_INGOT
    goal: 64
    actions:
      - material: IRON_INGOT
```

---

### PURCHASE

Track items bought through a shop. Works with zShop.

```yaml
quests:
  - type: PURCHASE
    name: "buyer"
    display-name: "Buyer"
    description: "Buy 32 diamonds"
    thumbnail: DIAMOND
    goal: 32
    actions:
      - material: DIAMOND
```

---

## Progression Quests

### EXPERIENCE_GAIN

Track experience points gained.

```yaml
quests:
  - type: EXPERIENCE_GAIN
    name: "xp-collector"
    display-name: "XP Collector"
    description: "Gain 1000 experience points"
    thumbnail: EXPERIENCE_BOTTLE
    goal: 1000
```

---

### JOB_LEVEL

Track job levels. Works with zJobs.

```yaml
quests:
  - type: JOB_LEVEL
    name: "miner-level"
    display-name: "Expert Miner"
    description: "Reach level 50 in the Miner job"
    thumbnail: IRON_PICKAXE
    goal: 50
    actions:
      - job: miner
```

---

### JOB_PRESTIGE

Track job prestige levels. Works with zJobs.

```yaml
quests:
  - type: JOB_PRESTIGE
    name: "miner-prestige"
    display-name: "Prestige Miner"
    description: "Reach prestige 1 in the Miner job"
    thumbnail: DIAMOND_PICKAXE
    goal: 1
    actions:
      - job: miner
```

---

## Special Quests

### VOTE

Track player votes. Requires manual progress via command.

```yaml
quests:
  - type: VOTE
    name: "voter"
    display-name: "Voter"
    description: "Vote 10 times"
    thumbnail: PAPER
    goal: 10
    actions: []
```

Use `/zquests add-progress <player> voter 1` to track votes.

---

### COMMAND

Track when players execute specific commands.

```yaml
quests:
  - type: COMMAND
    name: "home-user"
    display-name: "Home User"
    description: "Use the home command"
    thumbnail: RED_BED
    goal: 1
    actions:
      - commands:
          - "home"
          - "homes"
          - "sethome"
```

---

### INVENTORY_OPEN

Track when players open specific zMenu inventories.

```yaml
quests:
  - type: INVENTORY_OPEN
    name: "shop-visitor"
    display-name: "Shop Visitor"
    description: "Open the shop menu"
    thumbnail: EMERALD
    goal: 1
    actions:
      - inventories:
          - "shop"
          - "shop_categories"
```

---

### INVENTORY_CONTENT

Track item delivery to NPCs. Requires API or command to trigger.

```yaml
quests:
  - type: INVENTORY_CONTENT
    name: "wood-delivery"
    display-name: "Wood Delivery"
    description: "Deliver 500 oak logs to the Lumberjack"
    thumbnail: OAK_LOG
    goal: 500
    actions:
      - tag: OAK_LOGS
        citizen-name: lumberjack
```

Use `/zquests progress-inventory <player> lumberjack` to check and consume items.

---

### CUSTOM

Custom quest type for API integration.

```yaml
quests:
  - type: CUSTOM
    name: "talk-to-npc"
    display-name: "Meet the Guide"
    description: "Talk to the village guide"
    thumbnail: VILLAGER_SPAWN_EGG
    goal: 1
    actions:
      - data: "citizen:guide"
```

**API usage:**
```java
QuestsPlugin plugin = (QuestsPlugin) Bukkit.getPluginManager().getPlugin("zQuests");
plugin.getQuestManager().handleQuests(player.getUniqueId(), QuestType.CUSTOM, 1, "citizen:guide");
```

---

### ISLAND

Track island creation. Works with SuperiorSkyBlock2.

```yaml
quests:
  - type: ISLAND
    name: "island-owner"
    display-name: "Island Owner"
    description: "Create your island"
    thumbnail: GRASS_BLOCK
    goal: 1
```

---

### HATCHING

Track egg usage (throwing eggs).

```yaml
quests:
  - type: HATCHING
    name: "egg-thrower"
    display-name: "Egg Thrower"
    description: "Throw 16 eggs"
    thumbnail: EGG
    goal: 16
```

---

### RESURRECT

Track resurrections using Totem of Undying.

```yaml
quests:
  - type: RESURRECT
    name: "survivor"
    display-name: "Survivor"
    description: "Use a Totem of Undying 3 times"
    thumbnail: TOTEM_OF_UNDYING
    goal: 3
```

---

## Quest Type Reference

| Type | Tracks | Actions Required |
|------|--------|------------------|
| `BLOCK_BREAK` | Breaking blocks | `material` or `tag` |
| `BLOCK_PLACE` | Placing blocks | `material` or `tag` |
| `ENTITY_KILL` | Killing entities | `entity` |
| `ENTITY_DAMAGE` | Damage dealt | None |
| `TAME` | Taming animals | `entity` |
| `SHEAR` | Shearing entities | `entity` |
| `FARMING` | Harvesting crops | `material` |
| `FISHING` | Catching fish | `material` |
| `CRAFT` | Crafting items | `material` |
| `SMELT` | Smelting items | `material` |
| `SMITHING` | Using smithing table | `material` |
| `ENCHANT` | Enchanting items | `enchantment` |
| `BREW` | Brewing potions | `potion-type` |
| `ITEM_BREAK` | Breaking items | `material` |
| `ITEM_MENDING` | Repairing items | `material` |
| `ITEM_CONSUME` | Consuming items | `material` |
| `CUBOID` | Entering area | `cuboid` |
| `LOOK_AT_BLOCK` | Looking at blocks | `cuboid` |
| `LOOK_AT_ENTITY` | Looking at entities | `cuboid` |
| `SELL` | Selling items | `material` |
| `PURCHASE` | Buying items | `material` |
| `EXPERIENCE_GAIN` | Gaining XP | None |
| `JOB_LEVEL` | Job levels | `job` |
| `JOB_PRESTIGE` | Job prestige | `job` |
| `VOTE` | Voting | None (manual) |
| `COMMAND` | Running commands | `commands` |
| `INVENTORY_OPEN` | Opening menus | `inventories` |
| `INVENTORY_CONTENT` | Item delivery | `tag`/`material`, `citizen-name` |
| `CUSTOM` | Custom logic | `data` |
| `ISLAND` | Island creation | None |
| `HATCHING` | Throwing eggs | None |
| `RESURRECT` | Using totems | None |
