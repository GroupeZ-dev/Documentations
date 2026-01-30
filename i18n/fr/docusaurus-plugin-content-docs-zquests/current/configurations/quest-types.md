---
sidebar_position: 2
title: Types de quetes
description: Tous les types de quetes disponibles dans zQuests
---

# Types de quetes

zQuests fournit plus de 25 types de quetes differents pour suivre diverses activites des joueurs. Cette page documente tous les types de quetes disponibles et leurs options de configuration specifiques.

## Quetes de blocs

### BLOCK_BREAK

Suit quand les joueurs cassent des blocs specifiques.

```yaml
quests:
  - type: BLOCK_BREAK
    name: "mineur-pierre"
    display-name: "Mineur de Pierre"
    description: "Cassez 500 blocs de pierre"
    thumbnail: STONE
    goal: 500
    actions:
      - material: STONE
      - material: COBBLESTONE
      - tag: LOGS  # Utiliser les tags Bukkit
```

**Format des actions :**
- `material` - [Materiau Bukkit](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html)
- `tag` - [Tag Bukkit](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/Tag.html) (ex: LOGS, PLANKS, WOOL)

---

### BLOCK_PLACE

Suit quand les joueurs placent des blocs specifiques.

```yaml
quests:
  - type: BLOCK_PLACE
    name: "constructeur"
    display-name: "Constructeur"
    description: "Placez 500 blocs"
    thumbnail: BRICKS
    goal: 500
    actions:
      - material: STONE_BRICKS
      - material: BRICKS
      - tag: PLANKS
```

---

## Quetes d'entites

### ENTITY_KILL

Suit quand les joueurs tuent des entites specifiques.

```yaml
quests:
  - type: ENTITY_KILL
    name: "chasseur-squelette"
    display-name: "Chasseur de Squelettes"
    description: "Tuez 50 squelettes"
    thumbnail: BONE
    goal: 50
    actions:
      - entity: SKELETON
      - entity: STRAY
```

**Format des actions :**
- `entity` - [EntityType Bukkit](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/entity/EntityType.html)

---

### ENTITY_DAMAGE

Suit les degats totaux infliges aux entites. Aucun type d'entite specifique requis.

```yaml
quests:
  - type: ENTITY_DAMAGE
    name: "infligeur-degats"
    display-name: "Infligeur de Degats"
    description: "Infligez 1000 degats aux entites"
    thumbnail: IRON_SWORD
    goal: 1000
```

---

### TAME

Suit quand les joueurs apprivoisent des animaux.

```yaml
quests:
  - type: TAME
    name: "dresseur-animaux"
    display-name: "Dresseur d'Animaux"
    description: "Apprivoisez 10 chevaux"
    thumbnail: SADDLE
    goal: 10
    actions:
      - entity: HORSE
      - entity: DONKEY
      - entity: MULE
```

---

### SHEAR

Suit quand les joueurs tondent des entites.

```yaml
quests:
  - type: SHEAR
    name: "collecteur-laine"
    display-name: "Collecteur de Laine"
    description: "Tondez 50 moutons"
    thumbnail: SHEARS
    goal: 50
    actions:
      - entity: SHEEP
```

---

## Quetes de recolte

### FARMING

Suit quand les joueurs recoltent des cultures.

```yaml
quests:
  - type: FARMING
    name: "fermier-ble"
    display-name: "Fermier de Ble"
    description: "Recoltez 500 bles"
    thumbnail: WHEAT
    goal: 500
    actions:
      - material: WHEAT
```

---

### FISHING

Suit quand les joueurs attrapent des poissons.

```yaml
quests:
  - type: FISHING
    name: "pecheur"
    display-name: "Pecheur"
    description: "Attrapez 20 cabillauds"
    thumbnail: COD
    goal: 20
    actions:
      - material: COD
      - material: SALMON
```

---

## Quetes d'artisanat

### CRAFT

Suit quand les joueurs fabriquent des items.

```yaml
quests:
  - type: CRAFT
    name: "fabricant-coffres"
    display-name: "Fabricant de Coffres"
    description: "Fabriquez 16 coffres"
    thumbnail: CHEST
    goal: 16
    actions:
      - material: CHEST
```

---

### SMELT

Suit quand les joueurs fondent des items dans les fourneaux.

```yaml
quests:
  - type: SMELT
    name: "fondeur-fer"
    display-name: "Fondeur de Fer"
    description: "Fondez 64 lingots de fer"
    thumbnail: IRON_INGOT
    goal: 64
    actions:
      - material: IRON_INGOT
```

---

### SMITHING

Suit quand les joueurs utilisent la table de forge.

```yaml
quests:
  - type: SMITHING
    name: "forgeron-netherite"
    display-name: "Forgeron Netherite"
    description: "Ameliorez en armure netherite"
    thumbnail: NETHERITE_CHESTPLATE
    goal: 4
    actions:
      - material: NETHERITE_HELMET
      - material: NETHERITE_CHESTPLATE
      - material: NETHERITE_LEGGINGS
      - material: NETHERITE_BOOTS
```

---

## Quetes d'enchantement et brassage

### ENCHANT

Suit quand les joueurs enchantent des items.

```yaml
quests:
  - type: ENCHANT
    name: "enchanteur"
    display-name: "Enchanteur"
    description: "Appliquez l'enchantement Tranchant 5 fois"
    thumbnail: ENCHANTED_BOOK
    goal: 5
    actions:
      - enchantment: SHARPNESS
```

**Options d'action supplementaires :**
- `enchantment` - Type d'enchantement requis
- `material` - Materiau specifique
- `minimum-level` - Niveau minimum d'enchantement
- `minimum-cost` - Cout minimum en XP

---

### BREW

Suit quand les joueurs brassent des potions.

```yaml
quests:
  - type: BREW
    name: "brasseur-potions"
    display-name: "Brasseur de Potions"
    description: "Brassez 10 potions de vitesse"
    thumbnail: POTION
    goal: 10
    actions:
      - potion-type: SWIFTNESS
```

**Options d'action :**
- `potion-type` - [PotionType Bukkit](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/potion/PotionType.html)
- `potion-material` - `POTION` ou `SPLASH_POTION`
- `ingredient` - Ingredient requis

---

## Quetes d'items

### ITEM_BREAK

Suit quand les joueurs cassent des items (les utilisent jusqu'a epuisement de la durabilite).

```yaml
quests:
  - type: ITEM_BREAK
    name: "destructeur-outils"
    display-name: "Destructeur d'Outils"
    description: "Cassez 3 pioches"
    thumbnail: WOODEN_PICKAXE
    goal: 3
    actions:
      - material: WOODEN_PICKAXE
      - material: STONE_PICKAXE
      - material: IRON_PICKAXE
```

---

### ITEM_MENDING

Suit la durabilite recuperee via Raccommodage ou enclumes.

```yaml
quests:
  - type: ITEM_MENDING
    name: "maitre-reparation"
    display-name: "Maitre Reparateur"
    description: "Recuperez 1000 de durabilite"
    thumbnail: ANVIL
    goal: 1000
    actions:
      - material: DIAMOND_PICKAXE
```

---

### ITEM_CONSUME

Suit quand les joueurs mangent ou consomment des items.

```yaml
quests:
  - type: ITEM_CONSUME
    name: "amateur-nourriture"
    display-name: "Amateur de Nourriture"
    description: "Mangez 20 pommes dorees"
    thumbnail: GOLDEN_APPLE
    goal: 20
    actions:
      - material: GOLDEN_APPLE
      - material: ENCHANTED_GOLDEN_APPLE
```

---

## Quetes d'exploration

### CUBOID

Suit quand les joueurs entrent dans une zone specifique.

```yaml
quests:
  - type: CUBOID
    name: "explorer-spawn"
    display-name: "Visiter le Spawn"
    description: "Trouvez la zone de spawn"
    thumbnail: COMPASS
    goal: 1
    actions:
      - cuboid: "world,100,50,100,200,100,200"
```

**Format du cuboide :** `monde,x1,y1,z1,x2,y2,z2`

---

### LOOK_AT_BLOCK

Suit quand les joueurs regardent un bloc dans une zone specifique.

```yaml
quests:
  - type: LOOK_AT_BLOCK
    name: "observer-monument"
    display-name: "Observer le Monument"
    description: "Regardez l'ancien monument"
    thumbnail: SPYGLASS
    goal: 1
    actions:
      - cuboid: "world,100,60,100,110,70,110"
```

---

### LOOK_AT_ENTITY

Suit quand les joueurs regardent une entite dans une zone specifique.

```yaml
quests:
  - type: LOOK_AT_ENTITY
    name: "trouver-villageois"
    display-name: "Trouver l'Ancien"
    description: "Regardez l'ancien du village"
    thumbnail: EMERALD
    goal: 1
    actions:
      - cuboid: "world,100,60,100,110,70,110"
```

---

## Quetes d'economie

### SELL

Suit les items vendus via une boutique. Fonctionne avec zShop.

```yaml
quests:
  - type: SELL
    name: "marchand"
    display-name: "Marchand"
    description: "Vendez 64 lingots de fer"
    thumbnail: IRON_INGOT
    goal: 64
    actions:
      - material: IRON_INGOT
```

---

### PURCHASE

Suit les items achetes via une boutique. Fonctionne avec zShop.

```yaml
quests:
  - type: PURCHASE
    name: "acheteur"
    display-name: "Acheteur"
    description: "Achetez 32 diamants"
    thumbnail: DIAMOND
    goal: 32
    actions:
      - material: DIAMOND
```

---

## Quetes de progression

### EXPERIENCE_GAIN

Suit les points d'experience gagnes.

```yaml
quests:
  - type: EXPERIENCE_GAIN
    name: "collecteur-xp"
    display-name: "Collecteur d'XP"
    description: "Gagnez 1000 points d'experience"
    thumbnail: EXPERIENCE_BOTTLE
    goal: 1000
```

---

### JOB_LEVEL

Suit les niveaux de metier. Fonctionne avec zJobs.

```yaml
quests:
  - type: JOB_LEVEL
    name: "niveau-mineur"
    display-name: "Mineur Expert"
    description: "Atteignez le niveau 50 du metier Mineur"
    thumbnail: IRON_PICKAXE
    goal: 50
    actions:
      - job: miner
```

---

### JOB_PRESTIGE

Suit les niveaux de prestige de metier. Fonctionne avec zJobs.

```yaml
quests:
  - type: JOB_PRESTIGE
    name: "prestige-mineur"
    display-name: "Prestige Mineur"
    description: "Atteignez le prestige 1 du metier Mineur"
    thumbnail: DIAMOND_PICKAXE
    goal: 1
    actions:
      - job: miner
```

---

## Quetes speciales

### VOTE

Suit les votes des joueurs. Necessite une progression manuelle via commande.

```yaml
quests:
  - type: VOTE
    name: "voteur"
    display-name: "Voteur"
    description: "Votez 10 fois"
    thumbnail: PAPER
    goal: 10
    actions: []
```

Utilisez `/zquests add-progress <joueur> voteur 1` pour suivre les votes.

---

### COMMAND

Suit quand les joueurs executent des commandes specifiques.

```yaml
quests:
  - type: COMMAND
    name: "utilisateur-home"
    display-name: "Utilisateur Home"
    description: "Utilisez la commande home"
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

Suit quand les joueurs ouvrent des inventaires zMenu specifiques.

```yaml
quests:
  - type: INVENTORY_OPEN
    name: "visiteur-boutique"
    display-name: "Visiteur de Boutique"
    description: "Ouvrez le menu de la boutique"
    thumbnail: EMERALD
    goal: 1
    actions:
      - inventories:
          - "shop"
          - "shop_categories"
```

---

### INVENTORY_CONTENT

Suit la livraison d'items aux PNJ. Necessite l'API ou une commande pour declencher.

```yaml
quests:
  - type: INVENTORY_CONTENT
    name: "livraison-bois"
    display-name: "Livraison de Bois"
    description: "Livrez 500 buches de chene au Bucheron"
    thumbnail: OAK_LOG
    goal: 500
    actions:
      - tag: OAK_LOGS
        citizen-name: bucheron
```

Utilisez `/zquests progress-inventory <joueur> bucheron` pour verifier et consommer les items.

---

### CUSTOM

Type de quete personnalise pour l'integration API.

```yaml
quests:
  - type: CUSTOM
    name: "parler-pnj"
    display-name: "Rencontrer le Guide"
    description: "Parlez au guide du village"
    thumbnail: VILLAGER_SPAWN_EGG
    goal: 1
    actions:
      - data: "citizen:guide"
```

**Utilisation API :**
```java
QuestsPlugin plugin = (QuestsPlugin) Bukkit.getPluginManager().getPlugin("zQuests");
plugin.getQuestManager().handleQuests(player.getUniqueId(), QuestType.CUSTOM, 1, "citizen:guide");
```

---

### ISLAND

Suit la creation d'ile. Fonctionne avec SuperiorSkyBlock2.

```yaml
quests:
  - type: ISLAND
    name: "proprietaire-ile"
    display-name: "Proprietaire d'Ile"
    description: "Creez votre ile"
    thumbnail: GRASS_BLOCK
    goal: 1
```

---

### HATCHING

Suit l'utilisation d'oeufs (lancer d'oeufs).

```yaml
quests:
  - type: HATCHING
    name: "lanceur-oeufs"
    display-name: "Lanceur d'Oeufs"
    description: "Lancez 16 oeufs"
    thumbnail: EGG
    goal: 16
```

---

### RESURRECT

Suit les resurrections via Totem d'Immortalite.

```yaml
quests:
  - type: RESURRECT
    name: "survivant"
    display-name: "Survivant"
    description: "Utilisez un Totem d'Immortalite 3 fois"
    thumbnail: TOTEM_OF_UNDYING
    goal: 3
```

---

## Reference des types de quetes

| Type | Suit | Actions requises |
|------|--------|------------------|
| `BLOCK_BREAK` | Casse de blocs | `material` ou `tag` |
| `BLOCK_PLACE` | Placement de blocs | `material` ou `tag` |
| `ENTITY_KILL` | Meurtre d'entites | `entity` |
| `ENTITY_DAMAGE` | Degats infliges | Aucune |
| `TAME` | Apprivoisement | `entity` |
| `SHEAR` | Tonte d'entites | `entity` |
| `FARMING` | Recolte de cultures | `material` |
| `FISHING` | Peche | `material` |
| `CRAFT` | Artisanat | `material` |
| `SMELT` | Fonte | `material` |
| `SMITHING` | Utilisation table de forge | `material` |
| `ENCHANT` | Enchantement | `enchantment` |
| `BREW` | Brassage de potions | `potion-type` |
| `ITEM_BREAK` | Casse d'items | `material` |
| `ITEM_MENDING` | Reparation d'items | `material` |
| `ITEM_CONSUME` | Consommation d'items | `material` |
| `CUBOID` | Entree dans une zone | `cuboid` |
| `LOOK_AT_BLOCK` | Regarder des blocs | `cuboid` |
| `LOOK_AT_ENTITY` | Regarder des entites | `cuboid` |
| `SELL` | Vente d'items | `material` |
| `PURCHASE` | Achat d'items | `material` |
| `EXPERIENCE_GAIN` | Gain d'XP | Aucune |
| `JOB_LEVEL` | Niveaux de metier | `job` |
| `JOB_PRESTIGE` | Prestige de metier | `job` |
| `VOTE` | Vote | Aucune (manuel) |
| `COMMAND` | Execution de commandes | `commands` |
| `INVENTORY_OPEN` | Ouverture de menus | `inventories` |
| `INVENTORY_CONTENT` | Livraison d'items | `tag`/`material`, `citizen-name` |
| `CUSTOM` | Logique personnalisee | `data` |
| `ISLAND` | Creation d'ile | Aucune |
| `HATCHING` | Lancer d'oeufs | Aucune |
| `RESURRECT` | Utilisation de totems | Aucune |
