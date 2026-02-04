---
sidebar_position: 22
title: Module WorldEdit
description: Outils intégrés de manipulation de blocs avec intégration économique et limites par permission
---

# Module WorldEdit

**Fichier :** `modules/worldedit/config.yml`

Le module WorldEdit fournit un système intégré de manipulation de blocs conçu pour les serveurs survie et créatif. Contrairement aux plugins WorldEdit traditionnels, ce module s'intègre directement au **système économique** de zEssentials, facturant les joueurs par bloc placé ou retiré. Il dispose de **limites par permission** pour le nombre de blocs, les distances et les vitesses d'opération, permettant aux administrateurs de serveur d'offrir un accès WorldEdit par paliers (ex. gratuit pour les admins, payant pour les joueurs réguliers). Une liste noire de blocs configurable, une tarification par matériau, un affichage de progression par Boss Bar et un traitement par lots garantissent une édition du monde sûre et performante.

---

## Configuration Source

```yaml
enable: true

items:
  player-wand:
    name: "player-wand"
    display-name: "&ePlayer Wand"
    max-use: 50
    price-multiplier: 1.2
    item:
      material: WOODEN_AXE
      name: "&ePlayer WorldEdit Wand"
      lore:
        - "&7Right-click to set position 1"
        - "&7Left-click to set position 2"
        - "&7Uses remaining: &e%uses%"
  admin-Wand:
    name: "admin-Wand"
    display-name: "&cAdmin Wand"
    max-use: -1
    price-multiplier: 0
    item:
      material: GOLDEN_AXE
      name: "&cAdmin WorldEdit Wand"
      lore:
        - "&7Right-click to set position 1"
        - "&7Left-click to set position 2"
        - "&4Unlimited uses"

blacklist-blocks:
  - BEDROCK
  - BARRIER
  - COMMAND_BLOCK
  - CHAIN_COMMAND_BLOCK
  - REPEATING_COMMAND_BLOCK
  - STRUCTURE_BLOCK
  - STRUCTURE_VOID
  - JIGSAW
  - END_PORTAL
  - END_PORTAL_FRAME
  - END_GATEWAY
  - NETHER_PORTAL
  - SPAWNER
  - BUDDING_AMETHYST
  - REINFORCED_DEEPSLATE
  - SCULK_CATALYST
  - SCULK_SHRIEKER
  - SCULK_SENSOR
  - CALIBRATED_SCULK_SENSOR
  - LIGHT
  - PETRIFIED_OAK_SLAB
  - PLAYER_HEAD
  - PLAYER_WALL_HEAD
  - ZOMBIE_HEAD
  - ZOMBIE_WALL_HEAD
  - CREEPER_HEAD
  - CREEPER_WALL_HEAD
  - DRAGON_HEAD
  - DRAGON_WALL_HEAD
  - SKELETON_SKULL
  - SKELETON_WALL_SKULL
  - WITHER_SKELETON_SKULL
  - WITHER_SKELETON_WALL_SKULL
  - PIGLIN_HEAD
  - PIGLIN_WALL_HEAD
  - CHEST
  - TRAPPED_CHEST
  - ENDER_CHEST
  - BARREL
  - SHULKER_BOX
  - WHITE_SHULKER_BOX
  - ORANGE_SHULKER_BOX
  - MAGENTA_SHULKER_BOX
  - LIGHT_BLUE_SHULKER_BOX
  - YELLOW_SHULKER_BOX
  - LIME_SHULKER_BOX
  - PINK_SHULKER_BOX
  - GRAY_SHULKER_BOX
  - LIGHT_GRAY_SHULKER_BOX
  - CYAN_SHULKER_BOX
  - PURPLE_SHULKER_BOX
  - BLUE_SHULKER_BOX
  - BROWN_SHULKER_BOX
  - GREEN_SHULKER_BOX
  - RED_SHULKER_BOX
  - BLACK_SHULKER_BOX
  - FURNACE
  - BLAST_FURNACE
  - SMOKER
  - BREWING_STAND
  - HOPPER
  - DROPPER
  - DISPENSER
  - BEACON
  - CONDUIT
  - BELL
  - ENCHANTING_TABLE
  - ANVIL
  - CHIPPED_ANVIL
  - DAMAGED_ANVIL
  - GRINDSTONE
  - CARTOGRAPHY_TABLE
  - LOOM
  - SMITHING_TABLE
  - STONECUTTER
  - LECTERN
  - COMPOSTER
  - RESPAWN_ANCHOR
  - LODESTONE
  - BEE_NEST
  - BEEHIVE
  - CAMPFIRE
  - SOUL_CAMPFIRE
  - TNT
  - DRAGON_EGG
  - TURTLE_EGG
  - SNIFFER_EGG
  - FROGSPAWN
  - INFESTED_STONE
  - INFESTED_COBBLESTONE
  - INFESTED_STONE_BRICKS
  - INFESTED_MOSSY_STONE_BRICKS
  - INFESTED_CRACKED_STONE_BRICKS
  - INFESTED_CHISELED_STONE_BRICKS
  - INFESTED_DEEPSLATE
  - OAK_SIGN
  - SPRUCE_SIGN
  - BIRCH_SIGN
  - JUNGLE_SIGN
  - ACACIA_SIGN
  - DARK_OAK_SIGN
  - MANGROVE_SIGN
  - CHERRY_SIGN
  - BAMBOO_SIGN
  - CRIMSON_SIGN
  - WARPED_SIGN
  - OAK_WALL_SIGN
  - SPRUCE_WALL_SIGN
  - BIRCH_WALL_SIGN
  - JUNGLE_WALL_SIGN
  - ACACIA_WALL_SIGN
  - DARK_OAK_WALL_SIGN
  - MANGROVE_WALL_SIGN
  - CHERRY_WALL_SIGN
  - BAMBOO_WALL_SIGN
  - CRIMSON_WALL_SIGN
  - WARPED_WALL_SIGN
  - OAK_HANGING_SIGN
  - SPRUCE_HANGING_SIGN
  - BIRCH_HANGING_SIGN
  - JUNGLE_HANGING_SIGN
  - ACACIA_HANGING_SIGN
  - DARK_OAK_HANGING_SIGN
  - MANGROVE_HANGING_SIGN
  - CHERRY_HANGING_SIGN
  - BAMBOO_HANGING_SIGN
  - CRIMSON_HANGING_SIGN
  - WARPED_HANGING_SIGN
  - OAK_WALL_HANGING_SIGN
  - SPRUCE_WALL_HANGING_SIGN
  - BIRCH_WALL_HANGING_SIGN
  - JUNGLE_WALL_HANGING_SIGN
  - ACACIA_WALL_HANGING_SIGN
  - DARK_OAK_WALL_HANGING_SIGN
  - MANGROVE_WALL_HANGING_SIGN
  - CHERRY_WALL_HANGING_SIGN
  - BAMBOO_WALL_HANGING_SIGN
  - CRIMSON_WALL_HANGING_SIGN
  - WARPED_WALL_HANGING_SIGN
  - WHITE_BED
  - ORANGE_BED
  - MAGENTA_BED
  - LIGHT_BLUE_BED
  - YELLOW_BED
  - LIME_BED
  - PINK_BED
  - GRAY_BED
  - LIGHT_GRAY_BED
  - CYAN_BED
  - PURPLE_BED
  - BLUE_BED
  - BROWN_BED
  - GREEN_BED
  - RED_BED
  - BLACK_BED
  - WHITE_BANNER
  - ORANGE_BANNER
  - MAGENTA_BANNER
  - LIGHT_BLUE_BANNER
  - YELLOW_BANNER
  - LIME_BANNER
  - PINK_BANNER
  - GRAY_BANNER
  - LIGHT_GRAY_BANNER
  - CYAN_BANNER
  - PURPLE_BANNER
  - BLUE_BANNER
  - BROWN_BANNER
  - GREEN_BANNER
  - RED_BANNER
  - BLACK_BANNER
  - WHITE_WALL_BANNER
  - ORANGE_WALL_BANNER
  - MAGENTA_WALL_BANNER
  - LIGHT_BLUE_WALL_BANNER
  - YELLOW_WALL_BANNER
  - LIME_WALL_BANNER
  - PINK_WALL_BANNER
  - GRAY_WALL_BANNER
  - LIGHT_GRAY_WALL_BANNER
  - CYAN_WALL_BANNER
  - PURPLE_WALL_BANNER
  - BLUE_WALL_BANNER
  - BROWN_WALL_BANNER
  - GREEN_WALL_BANNER
  - RED_WALL_BANNER
  - BLACK_WALL_BANNER
  - FLOWER_POT
  - ARMOR_STAND
  - ITEM_FRAME
  - GLOW_ITEM_FRAME
  - PAINTING

default-block-price: 5

blocks-price:
  AIR: 1
  STONE: 1

permissions-blocks-per-second:
  player: 5
  vip: 10
  admin: 50

permissions-max-blocks:
  player: 500
  vip: 1000
  admin: 50000

permissions-max-distances:
  player: 20
  vip: 50
  admin: 100

permissions-sphere-radius:
  player: 4
  vip: 8
  admin: 100

permissions-sphere-height:
  player: 1
  vip: 2
  admin: 5

permissions-cylinder-height:
  player: 1
  vip: 2
  admin: 5

batch-size: 200

worldedit-boss-bar:
  color: RED
  style: PROGRESS

enable-color-visualisation: false
open-help-inventory: false

withdraw-reason: "Use of player worldedit"
refund-reason: "Refund from player worldedit"

blacklist-worlds:
  - world_the_end
  - world_nether
```

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module WorldEdit |
| `default-block-price` | Double | `5` | Le coût économique par défaut par bloc pour tout matériau non listé dans `blocks-price`. Il s'agit du prix de base avant l'application du `price-multiplier` de la baguette |
| `batch-size` | Integer | `200` | Nombre de blocs traités par tick lors d'une opération. Des valeurs plus élevées terminent les opérations plus rapidement mais peuvent causer davantage de lag sur le serveur |
| `enable-color-visualisation` | Boolean | `false` | Lorsque `true`, les limites de sélection sont mises en évidence avec des particules colorées pour aider les joueurs à visualiser leur région sélectionnée |
| `open-help-inventory` | Boolean | `false` | Lorsque `true`, l'exécution de la commande de base `/player-worldedit` ouvre un inventaire d'aide zMenu au lieu d'afficher le texte d'aide dans le chat |
| `withdraw-reason` | String | `Use of player worldedit` | La raison de transaction enregistrée lorsque de l'argent est déduit du joueur pour une opération WorldEdit |
| `refund-reason` | String | `Refund from player worldedit` | La raison de transaction enregistrée lorsque de l'argent est remboursé au joueur (ex. lorsqu'une opération est annulée) |

### Objets Baguette

La section `items` définit les baguettes WorldEdit qui peuvent être données aux joueurs. Chaque baguette possède ses propres limites d'utilisation et tarification.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `items.<wand>.name` | String | - | Identifiant interne de la baguette |
| `items.<wand>.display-name` | String | - | Nom affiché dans les messages et inventaires. Prend en charge les codes couleur |
| `items.<wand>.max-use` | Integer | - | Nombre maximum d'opérations que la baguette peut effectuer. Définir à `-1` pour des utilisations illimitées |
| `items.<wand>.price-multiplier` | Double | - | Multiplicateur appliqué à tous les prix de blocs lors de l'utilisation de cette baguette. `0` rend toutes les opérations gratuites, `1.2` ajoute un surcoût de 20% |
| `items.<wand>.item.material` | String | - | Le type de matériau Minecraft pour l'objet baguette (ex. `WOODEN_AXE`, `GOLDEN_AXE`) |
| `items.<wand>.item.name` | String | - | Le nom affiché de l'objet baguette. Prend en charge les codes couleur |
| `items.<wand>.item.lore` | List of Strings | - | Lignes de lore affichées sur l'objet baguette. Prend en charge le placeholder `%uses%` pour les utilisations restantes |

:::info Définitions des Baguettes par Défaut
- **player-wand** -- Une `WOODEN_AXE` avec 50 utilisations et un multiplicateur de prix de 1.2x. Destinée aux joueurs réguliers qui paient pour leurs modifications.
- **admin-Wand** -- Une `GOLDEN_AXE` avec des utilisations illimitées (`max-use: -1`) et un multiplicateur de prix de 0x (gratuit). Destinée aux membres du staff.
:::

### Liste Noire de Blocs

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `blacklist-blocks` | List of Strings | *(170+ entrées)* | Matériaux qui ne peuvent pas être placés ou modifiés par le module WorldEdit. Inclut les blocs de commande, les spawners, les conteneurs, les lits, les bannières, les panneaux et d'autres blocs spéciaux |

:::warning
La liste noire contient plus de 170 types de blocs par défaut. Cela empêche les joueurs de dupliquer le contenu des conteneurs, de placer des blocs dangereux (comme les blocs de commande ou le TNT), ou de manipuler des blocs qui stockent des données complexes (comme les panneaux et les bannières). **Supprimer des entrées de cette liste peut créer des exploits sur votre serveur.** Examinez les ajouts attentivement.
:::

### Tarification des Blocs

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `default-block-price` | Double | `5` | Le prix de secours facturé par bloc pour tout matériau non listé dans `blocks-price` |
| `blocks-price` | Map | *(voir ci-dessous)* | Surcharges de prix par matériau. La clé est le nom du matériau et la valeur est le prix par bloc |

**Surcharges de prix de blocs par défaut :**

| Matériau | Prix |
|----------|------|
| `AIR` | `1` |
| `STONE` | `1` |

:::tip
Le coût final d'une opération de blocs est calculé ainsi : `prix_bloc x multiplicateur_prix x nombre_blocs`. Par exemple, placer 100 blocs STONE avec le player-wand coûte `1 x 1.2 x 100 = 120` unités économiques. Les blocs non listés dans `blocks-price` utilisent le `default-block-price` de 5.
:::

### Limites par Permission

Le module WorldEdit utilise un **système de paliers par permission** pour contrôler les limites d'opération. Chaque palier est défini par un noeud de permission au format `essentials.worldedit.<tier>` (ex. `essentials.worldedit.player`, `essentials.worldedit.vip`, `essentials.worldedit.admin`).

#### Blocs Par Seconde

| Palier | Valeur | Description |
|--------|--------|-------------|
| `player` | `5` | Nombre maximum de blocs traités par seconde pour les joueurs par défaut |
| `vip` | `10` | Nombre maximum de blocs traités par seconde pour les joueurs VIP |
| `admin` | `50` | Nombre maximum de blocs traités par seconde pour les administrateurs |

#### Blocs Maximum Par Opération

| Palier | Valeur | Description |
|--------|--------|-------------|
| `player` | `500` | Nombre maximum de blocs dans une seule opération |
| `vip` | `1 000` | Nombre maximum de blocs dans une seule opération |
| `admin` | `50 000` | Nombre maximum de blocs dans une seule opération |

#### Distance de Sélection Maximum

| Palier | Valeur | Description |
|--------|--------|-------------|
| `player` | `20` | Distance maximale (en blocs) entre pos1 et pos2 |
| `vip` | `50` | Distance maximale (en blocs) entre pos1 et pos2 |
| `admin` | `100` | Distance maximale (en blocs) entre pos1 et pos2 |

#### Rayon de Sphère

| Palier | Valeur | Description |
|--------|--------|-------------|
| `player` | `4` | Rayon maximum pour les opérations de sphère |
| `vip` | `8` | Rayon maximum pour les opérations de sphère |
| `admin` | `100` | Rayon maximum pour les opérations de sphère |

#### Hauteur de Sphère

| Palier | Valeur | Description |
|--------|--------|-------------|
| `player` | `1` | Hauteur maximale pour les opérations de sphère |
| `vip` | `2` | Hauteur maximale pour les opérations de sphère |
| `admin` | `5` | Hauteur maximale pour les opérations de sphère |

#### Hauteur de Cylindre

| Palier | Valeur | Description |
|--------|--------|-------------|
| `player` | `1` | Hauteur maximale pour les opérations de cylindre |
| `vip` | `2` | Hauteur maximale pour les opérations de cylindre |
| `admin` | `5` | Hauteur maximale pour les opérations de cylindre |

:::info
Les noms de paliers de permission (ex. `player`, `vip`, `admin`) correspondent à des noeuds de permission. Un joueur disposant de la permission `essentials.worldedit.vip` utilisera les limites du palier `vip`. Vous pouvez ajouter des paliers personnalisés en définissant de nouvelles entrées dans chaque section de permission et en assignant la permission correspondante à vos joueurs.
:::

### Boss Bar

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `worldedit-boss-bar.color` | String | `RED` | La couleur de la Boss Bar affichée pendant les opérations WorldEdit. Accepte les couleurs de Boss Bar Minecraft : `BLUE`, `GREEN`, `PINK`, `PURPLE`, `RED`, `WHITE`, `YELLOW` |
| `worldedit-boss-bar.style` | String | `PROGRESS` | Le style de la Boss Bar. Accepte : `PROGRESS`, `NOTCHED_6`, `NOTCHED_10`, `NOTCHED_12`, `NOTCHED_20` |

### Mondes en Liste Noire

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `blacklist-worlds` | List of Strings | `world_the_end`, `world_nether` | Mondes où le module WorldEdit est complètement désactivé. Les joueurs ne peuvent pas utiliser les commandes WorldEdit dans ces mondes |

:::warning
Assurez-vous que les noms de mondes correspondent exactement aux noms de dossiers de mondes réels de votre serveur. La comparaison est sensible à la casse.
:::

---

## Fonctionnement

1. Un administrateur donne une baguette WorldEdit à un joueur en utilisant `/player-worldedit give <player> <wand>`.
2. Le joueur fait un clic droit sur un bloc pour définir la **position 1** et un clic gauche pour définir la **position 2**, délimitant une sélection cuboïde.
3. Le joueur exécute une commande d'opération (ex. `/player-worldedit set <block>`) pour manipuler les blocs dans la sélection.
4. Le plugin calcule le coût total basé sur les prix des blocs et le `price-multiplier` de la baguette, puis déduit le montant du solde économique du joueur.
5. Les blocs sont traités par lots de `batch-size` par tick, avec la Boss Bar affichant la progression.
6. Si le joueur annule une opération en cours, les blocs restants non traités sont remboursés au taux calculé.
7. Chaque baguette suit ses utilisations restantes. Lorsqu'une baguette avec un `max-use` limité est épuisée, elle ne peut plus être utilisée pour des opérations.

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/player-worldedit` | `pwe`, `ess-worldedit`, `eworldedit`, `ew` | `essentials.worldedit.use` | Commande de base pour le module WorldEdit |

### Sous-commandes

| Sous-commande | Description |
|---------------|-------------|
| `give` | Donner une baguette WorldEdit à un joueur |
| `set` | Remplir la région sélectionnée avec un bloc spécifié |
| `walls` | Construire des murs autour de la région sélectionnée |
| `sphere` | Créer une sphère à l'emplacement ciblé |
| `fill` | Remplir une zone avec un bloc spécifié |
| `cyl` | Créer un cylindre à l'emplacement ciblé |
| `cut` | Supprimer tous les blocs de la région sélectionnée (remplacer par de l'air) |
| `stop` | Arrêter l'opération WorldEdit en cours |
| `confirm` | Confirmer une opération WorldEdit en attente |
| `cancel` | Annuler une opération WorldEdit en attente |
| `pos1` | Définir manuellement la position 1 à votre emplacement actuel |
| `pos2` | Définir manuellement la position 2 à votre emplacement actuel |
| `option` | Basculer les options personnelles de WorldEdit (affichage inventaire, Boss Bar) |

Pour la liste complète des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Permissions Associées

| Permission | Description |
|------------|-------------|
| `essentials.worldedit.use` | Permet d'utiliser la commande `/player-worldedit` et ses sous-commandes |
| `essentials.worldedit.player` | Accorde les limites du palier `player` pour les opérations WorldEdit |
| `essentials.worldedit.vip` | Accorde les limites du palier `vip` pour les opérations WorldEdit |
| `essentials.worldedit.admin` | Accorde les limites du palier `admin` pour les opérations WorldEdit |

:::tip
Assignez une seule permission de palier par joueur. Si un joueur possède plusieurs permissions de palier, la correspondance de plus haute priorité détermine ses limites. Définissez les paliers du plus restrictif au plus permissif.
:::

---

## Placeholders Associés

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_worldedit_option_inventory%` | Renvoie la préférence actuelle du joueur pour l'affichage d'inventaire lors des opérations WorldEdit |
| `%zessentials_user_worldedit_option_bossbar%` | Renvoie la préférence actuelle du joueur pour l'affichage de la Boss Bar lors des opérations WorldEdit |

Pour la liste complète des placeholders, voir [Placeholders](../placeholders).

---

## Intégration Économique

Le module WorldEdit est étroitement intégré au [module Économie](./economy). Chaque opération de blocs a un coût monétaire déterminé par :

1. **Prix de base du bloc** -- Soit le prix spécifique au matériau depuis `blocks-price`, soit le `default-block-price` (5 par défaut).
2. **Multiplicateur de baguette** -- Le `price-multiplier` de la baguette utilisée. Le player-wand applique un multiplicateur de 1.2x, tandis que le admin-Wand utilise 0x (gratuit).
3. **Nombre de blocs** -- Le nombre total de blocs affectés par l'opération.

**Formule :** `coût_total = prix_base_bloc x multiplicateur_prix x nombre_blocs`

:::note
Si le joueur n'a pas un solde suffisant pour couvrir le coût de l'opération, celle-ci est rejetée et le joueur en est notifié. Les opérations partielles ne sont pas facturées -- le coût total doit être disponible à l'avance.
:::

---

## Exemple : Accès WorldEdit par Paliers

### Configuration Serveur Survie

Offrez un WorldEdit basique aux joueurs réguliers et un accès amélioré aux VIP :

```yaml
permissions-max-blocks:
  player: 200
  vip: 2000
  admin: 50000

permissions-max-distances:
  player: 15
  vip: 40
  admin: 100

default-block-price: 10

blocks-price:
  AIR: 2
  STONE: 3
  DIRT: 2
  GRASS_BLOCK: 4
```

Cette configuration limite les joueurs réguliers à de petites modifications à un coût plus élevé, encourage les achats VIP pour des opérations plus importantes, et donne aux admins un accès pratiquement illimité gratuitement (avec le admin-Wand).
