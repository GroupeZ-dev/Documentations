---
sidebar_position: 2
title: Components
description: Reference complete des composants d'item dans zMenu (Minecraft 1.20.5+)
---

# Composants d'Item

A partir de Minecraft 1.20.5, les items utilisent un nouveau systeme de composants. zMenu fournit un support complet pour ce systeme via la section de configuration `components`.

:::info
Les composants necessitent Minecraft 1.20.5 ou superieur. Certains composants ne sont disponibles que dans les versions plus recentes, indiques par un badge a cote du nom de chaque composant.
:::

## Structure de base

```yaml
item:
  material: DIAMOND_SWORD
  components:
    custom-name: "&6&lEpee Legendaire"
    lore:
      - "&7Une arme puissante"
    enchantments:
      sharpness: 5
```

---

## attack-range <span class="badge badge--danger">1.21.11+</span>

Definit la portee d'attaque d'un item en blocs.

**Minecraft Wiki:** [attack_range](https://minecraft.wiki/w/Data_component_format#attack_range)

| Cle | Type | Defaut | Plage | Description |
|-----|------|--------|-------|-------------|
| `min-reach` | Float | `0` | 0-64 | Distance de portee minimale en mode survie |
| `max-reach` | Float | `3` | 0-64 | Distance de portee maximale en mode survie |
| `min-creative-reach` | Float | `0` | 0-64 | Distance de portee minimale en mode creatif |
| `max-creative-reach` | Float | `5` | 0-64 | Distance de portee maximale en mode creatif |
| `hitbox-margin` | Float | `0.3` | 0-1 | Marge supplementaire pour la detection de hitbox |
| `mob-factor` | Float | `1` | 0-2 | Multiplicateur applique aux hitbox des mobs |

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

Ajoute des modificateurs d'attributs a l'item.

**Minecraft Wiki:** [attribute_modifiers](https://minecraft.wiki/w/Data_component_format#attribute_modifiers)

| Cle | Type | Requis | Description |
|-----|------|--------|-------------|
| `type` | String | Oui | Type d'attribut (ex: `generic.attack_damage`) |
| `amount` | Double | Oui | Valeur du modificateur |
| `operation` | String | Oui | Type d'operation: `add_value`, `add_multiplied_base`, `add_multiplied_total` |
| `slot` | String | Non | Emplacement d'equipement: `any`, `mainhand`, `offhand`, `head`, `chest`, `legs`, `feet` |
| `id` | String | Non | Identifiant unique du modificateur |

```yaml
components:
  attribute-modifiers:
    - type: generic.attack_damage
      amount: 10
      operation: add_value
      slot: mainhand
      id: "my_plugin:attack_bonus"
    - type: generic.movement_speed
      amount: 0.1
      operation: add_multiplied_base
      slot: feet
```

**Types d'attributs disponibles:**
- `generic.armor` - Points d'armure
- `generic.armor_toughness` - Solidite d'armure
- `generic.attack_damage` - Degats d'attaque
- `generic.attack_knockback` - Recul d'attaque
- `generic.attack_speed` - Vitesse d'attaque
- `generic.flying_speed` - Vitesse de vol
- `generic.follow_range` - Distance de suivi
- `generic.knockback_resistance` - Resistance au recul
- `generic.luck` - Chance
- `generic.max_absorption` - Absorption maximale
- `generic.max_health` - Sante maximale
- `generic.movement_speed` - Vitesse de deplacement
- `generic.scale` - Echelle de l'entite
- `generic.step_height` - Hauteur de pas

---

## banner-patterns

Definit les motifs sur un item de banniere.

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

Definit la couleur de base pour les boucliers et bannieres.

**Minecraft Wiki:** [base_color](https://minecraft.wiki/w/Data_component_format#base_color)

```yaml
components:
  base-color: RED
```

**Couleurs disponibles:** `WHITE`, `ORANGE`, `MAGENTA`, `LIGHT_BLUE`, `YELLOW`, `LIME`, `PINK`, `GRAY`, `LIGHT_GRAY`, `CYAN`, `PURPLE`, `BLUE`, `BROWN`, `GREEN`, `RED`, `BLACK`

---

## block-state

Definit les proprietes d'etat de bloc pour les items de bloc lorsqu'ils sont places.

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

Configure le comportement de blocage comme un bouclier pour les items.

**Minecraft Wiki:** [blocks_attacks](https://minecraft.wiki/w/Data_component_format#blocks_attacks)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `block-delay-seconds` | Float | `0` | Delai avant que le blocage devienne actif |
| `disable-cooldown-scale` | Float | `1` | Echelle du temps de recharge quand le bouclier est desactive |
| `block-sound` | String | - | Son joue lors du blocage |
| `disabled-sound` | String | - | Son joue quand le bouclier est desactive |
| `item-damage.threshold` | Float | `0` | Seuil de degats avant que l'item prenne des degats |
| `item-damage.base` | Float | `0` | Degats de base de l'item |
| `item-damage.factor` | Float | `1.5` | Facteur multiplicateur de degats |
| `damage-reductions` | List | `[]` | Liste des regles de reduction de degats |

**Proprietes de reduction de degats:**
| Cle | Type | Description |
|-----|------|-------------|
| `type` | String/List | Type(s) de degats a reduire |
| `base` | Float | Reduction de degats de base |
| `factor` | Float | Facteur de reduction de degats |
| `horizontal-blocking-angle` | Float | Angle de blocage en degres (defaut: 90) |

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

Definit le son joue lorsque l'item se casse.

**Minecraft Wiki:** [break_sound](https://minecraft.wiki/w/Data_component_format#break_sound)

```yaml
components:
  break-sound: "entity.item.break"
```

---

## bundle-contents

Stocke des items dans un sac.

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

Stocke des projectiles dans les arbaletes.

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

Configure comment un item est consomme.

**Minecraft Wiki:** [consumable](https://minecraft.wiki/w/Data_component_format#consumable)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `consume-seconds` | Float | `1.6` | Temps pour consommer l'item en secondes |
| `animation` | String | `EAT` | Type d'animation |
| `consume-sound` | String | `entity.generic.eat` | Son joue lors de la consommation |
| `has-consume-particles` | Boolean | `true` | Afficher les particules lors de la consommation |
| `on-consume-effects` | List | `[]` | Effets a appliquer lors de la consommation |

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

**Types d'animation:** `EAT`, `DRINK`, `BLOCK`, `BOW`, `SPEAR`, `CROSSBOW`, `SPYGLASS`, `TOOT_HORN`, `BRUSH`, `BUNDLE`

**Types d'effets:**
- `APPLY_EFFECTS` - Appliquer des effets de potion avec probabilite
- `PLAY_SOUND` - Jouer un son
- `TELEPORT_RANDOMLY` - Teleporter aleatoirement dans un diametre
- `CLEAR_ALL_EFFECTS` - Supprimer tous les effets de potion
- `REMOVE_EFFECTS` - Supprimer des effets specifiques

---

## container

Stocke des items a l'interieur de l'item (comme les boites de shulker).

**Minecraft Wiki:** [container](https://minecraft.wiki/w/Data_component_format#container)

| Cle | Type | Description |
|-----|------|-------------|
| `slot` | Integer | Index de l'emplacement (0-26 pour les boites de shulker) |
| `material` | String | Materiau de l'item |
| `amount` | Integer | Quantite de l'item |

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

Definit la table de butin pour les items conteneurs.

**Minecraft Wiki:** [container_loot](https://minecraft.wiki/w/Data_component_format#container_loot)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `loot-table` | String | - | Nom de la table de butin (ex: `DESERT_PYRAMID`) |
| `seed` | Long | `0` | Graine aleatoire pour la generation du butin |

```yaml
components:
  container-loot:
    loot-table: DESERT_PYRAMID
    seed: 12345
```

**Tables de butin disponibles:** `ABANDONED_MINESHAFT`, `BASTION_BRIDGE`, `BURIED_TREASURE`, `DESERT_PYRAMID`, `END_CITY_TREASURE`, `JUNGLE_TEMPLE`, `NETHER_BRIDGE`, `PILLAGER_OUTPOST`, `SHIPWRECK_TREASURE`, `SIMPLE_DUNGEON`, `STRONGHOLD_CORRIDOR`, `VILLAGE_ARMORER`, `WOODLAND_MANSION`, et plus.

---

## custom-data

Stocke des donnees persistantes personnalisees (NBT) sur l'item.

**Minecraft Wiki:** [custom_data](https://minecraft.wiki/w/Data_component_format#custom_data)

Supporte plusieurs types de donnees avec detection automatique du type:
- String
- Boolean
- Integer
- Long
- Double
- Float
- Byte
- Short
- Tableaux byte[], int[], long[]

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

Donnees de modele personnalise pour l'integration des packs de ressources.

**Minecraft Wiki:** [custom_model_data](https://minecraft.wiki/w/Data_component_format#custom_model_data)

| Cle | Type | Description |
|-----|------|-------------|
| `floats` | List&lt;Float&gt; | Valeurs flottantes pour les predicats |
| `flags` | List&lt;Boolean&gt; | Drapeaux booleens pour les predicats |
| `strings` | List&lt;String&gt; | Valeurs de chaine pour les predicats |
| `colors` | List&lt;Color&gt; | Valeurs de couleur (format hex) |

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
      - "#FF5555"
      - "#55FF55"
```

---

## damage

Definit la valeur de degats actuelle de l'item.

**Minecraft Wiki:** [damage](https://minecraft.wiki/w/Data_component_format#damage)

```yaml
components:
  damage: 100
```

---

## damage-resistant

Rend l'item resistant a des types de degats specifiques.

**Minecraft Wiki:** [damage_resistant](https://minecraft.wiki/w/Data_component_format#damage_resistant)

| Cle | Type | Description |
|-----|------|-------------|
| `types` | String | Tag de type de degats a resister |

```yaml
components:
  damage-resistant:
    types: "minecraft:is_fire"
```

**Tags de types de degats disponibles:** `is_fire`, `is_explosion`, `is_projectile`, `is_fall`, `bypasses_armor`, `bypasses_shield`, `is_drowning`, `is_freezing`

---

## damage-type <span class="badge badge--danger">1.21.11+</span>

Definit le type de degats infliges par l'item lorsqu'il est utilise comme arme.

**Minecraft Wiki:** [damage_type](https://minecraft.wiki/w/Data_component_format#damage_type)

```yaml
components:
  damage-type: "minecraft:player_attack"
```

**Types de degats courants:** `player_attack`, `mob_attack`, `arrow`, `fireball`, `magic`, `wither`, `dragon_breath`, `freeze`, `sonic_boom`

---

## dye-color

Definit la couleur de teinture pour les armures en cuir et autres items teignables.

**Minecraft Wiki:** [dyed_color](https://minecraft.wiki/w/Data_component_format#dyed_color)

```yaml
components:
  dye-color: "#FF5555"
```

---

## enchantable <span class="badge badge--danger">1.21.2+</span>

Definit la valeur d'enchantabilite de l'item.

**Minecraft Wiki:** [enchantable](https://minecraft.wiki/w/Data_component_format#enchantable)

```yaml
components:
  enchantable: 15
```

---

## enchantment-glint-override

Force ou supprime l'effet de lueur d'enchantement.

**Minecraft Wiki:** [enchantment_glint_override](https://minecraft.wiki/w/Data_component_format#enchantment_glint_override)

```yaml
components:
  enchantment-glint-override: true   # Forcer la lueur
```

```yaml
components:
  enchantment-glint-override: false  # Supprimer la lueur
```

---

## enchantments

Ajoute des enchantements a l'item.

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

## equippable <span class="badge badge--danger">1.21.2+</span>

Configure les proprietes d'equipement pour n'importe quel item.

**Minecraft Wiki:** [equippable](https://minecraft.wiki/w/Data_component_format#equippable)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `slot` | String | - | Emplacement d'equipement: `HEAD`, `CHEST`, `LEGS`, `FEET`, `MAINHAND`, `OFFHAND`, `BODY` |
| `equip-sound` | String | - | Son lors de l'equipement |
| `asset-id` | String | - | Emplacement de ressource pour le modele d'equipement |
| `dispensable` | Boolean | `true` | Peut etre equipe par les distributeurs |
| `swappable` | Boolean | `true` | Peut etre echange avec d'autres equipements |
| `damage-on-hurt` | Boolean | `true` | Subit des degats quand l'entite est blessee |
| `equip-on-interact` | Boolean | `false` | S'equipe au clic droit |
| `camera-overlay` | String | - | Emplacement de ressource pour l'overlay de camera |
| `can-be-sheared` | Boolean | `false` | Peut etre cisaille de l'entite |
| `shearing-sound` | String | - | Son lors du cisaillement |
| `allowed-entities` | List | - | Entites qui peuvent porter cet item |

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

Configure un effet d'explosion unique d'etoile de feu d'artifice.

**Minecraft Wiki:** [firework_explosion](https://minecraft.wiki/w/Data_component_format#firework_explosion)

| Cle | Type | Description |
|-----|------|-------------|
| `shape` | String | Forme: `BALL`, `LARGE_BALL`, `BURST`, `CREEPER`, `STAR` |
| `colors` | Color | Couleur primaire (format hex) |
| `fade_colors` | Color | Couleur d'estompage (format hex) |
| `has_trail` | Boolean | A un effet de trainee |
| `has_twinkle` | Boolean | A un effet de scintillement |

```yaml
components:
  firework-explosion:
    shape: STAR
    colors: "#FF0000"
    fade_colors: "#FFFF00"
    has_trail: true
    has_twinkle: true
```

---

## fireworks

Configure les fusees de feu d'artifice.

**Minecraft Wiki:** [fireworks](https://minecraft.wiki/w/Data_component_format#fireworks)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `flight-duration` | Integer | `1` | Duree de vol (1-3) |
| `explosions` | List | `[]` | Liste des effets d'explosion |

**Proprietes d'explosion:**
| Cle | Type | Description |
|-----|------|-------------|
| `shape` | String | Forme: `BALL`, `LARGE_BALL`, `BURST`, `CREEPER`, `STAR` |
| `colors` | List | Couleurs primaires (format hex) |
| `fade-colors` | List | Couleurs d'estompage (format hex) |
| `has-trail` | Boolean | A un effet de trainee |
| `has-twinkle` | Boolean | A un effet de scintillement |

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

Rend n'importe quel item comestible.

**Minecraft Wiki:** [food](https://minecraft.wiki/w/Data_component_format#food)

| Cle | Type | Defaut | Requis | Description |
|-----|------|--------|--------|-------------|
| `nutrition` | Integer | - | Oui | Points de nourriture restaures (barres de faim) |
| `saturation` | Float | - | Oui | Modificateur de saturation |
| `can-always-eat` | Boolean | `false` | Non | Peut manger meme sans avoir faim |

```yaml
components:
  food:
    nutrition: 6
    saturation: 0.8
    can-always-eat: true
```

---

## glider <span class="badge badge--danger">1.21.2+</span>

Fait fonctionner l'item comme une elytre lorsqu'il est equipe dans l'emplacement de poitrine.

**Minecraft Wiki:** [glider](https://minecraft.wiki/w/Data_component_format#glider)

```yaml
components:
  glider: true
```

---

## instrument

Configure les proprietes d'instrument de corne de chevre.

**Minecraft Wiki:** [instrument](https://minecraft.wiki/w/Data_component_format#instrument)

**Simple (par nom d'instrument):**
```yaml
components:
  instrument: "minecraft:ponder_goat_horn"
```

**Configuration avancee:**

| Cle | Type | Description |
|-----|------|-------------|
| `sound-event` | String | Son a jouer |
| `use-duration` | Float | Duree d'utilisation en secondes |
| `range` | Float | Portee d'ecoute en blocs |
| `description` | String | Description de l'instrument |

```yaml
components:
  instrument:
    sound-event: "minecraft:ponder_goat_horn"
    use-duration: 7.0
    range: 256.0
    description: "Une corne de chevre mysterieuse"
```

**Instruments disponibles:** `ponder_goat_horn`, `sing_goat_horn`, `seek_goat_horn`, `feel_goat_horn`, `admire_goat_horn`, `call_goat_horn`, `yearn_goat_horn`, `dream_goat_horn`

---

## item-model <span class="badge badge--danger">1.21.2+</span>

Definit directement le modele de l'item.

**Minecraft Wiki:** [item_model](https://minecraft.wiki/w/Data_component_format#item_model)

```yaml
components:
  item-model: "minecraft:custom/my_model"
```

---

## item-name

Definit le nom de base de l'item (ne peut pas etre modifie sur une enclume, affiche en italique).

**Minecraft Wiki:** [item_name](https://minecraft.wiki/w/Data_component_format#item_name)

```yaml
components:
  item-name: "&6Item Special"
```

---

## jukebox-playable <span class="badge badge--danger">1.21+</span>

Rend l'item jouable dans un jukebox.

**Minecraft Wiki:** [jukebox_playable](https://minecraft.wiki/w/Data_component_format#jukebox_playable)

```yaml
components:
  jukebox-playable: "minecraft:music_disc.cat"
```

---

## kinetic-weapon <span class="badge badge--danger">1.21.11+</span>

Configure le comportement d'arme de type lance pour le combat monte.

**Minecraft Wiki:** [kinetic_weapon](https://minecraft.wiki/w/Data_component_format#kinetic_weapon)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `delay-ticks` | Integer | `0` | Delai avant l'attaque en ticks |
| `forward-movement` | Float | `0` | Mouvement vers l'avant lors de l'impact |
| `damage-multiplier` | Float | `1` | Multiplicateur de degats |
| `sound` | String | - | Son lors de la charge |
| `hit-sound` | String | - | Son lors de l'impact |
| `damage-conditions` | Object | - | Conditions pour infliger des degats |
| `dismount-conditions` | Object | - | Conditions pour demonter la cible |
| `knockback-conditions` | Object | - | Conditions pour le recul |

**Proprietes de condition:**
| Cle | Type | Description |
|-----|------|-------------|
| `max-duration-ticks` | Integer | Duree maximale pour la condition |
| `min-speed` | Float | Vitesse minimale du joueur |
| `min-relative-speed` | Float | Vitesse minimale relative a la cible |

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

Configure le suivi de magnetite pour la boussole.

**Minecraft Wiki:** [lodestone_tracker](https://minecraft.wiki/w/Data_component_format#lodestone_tracker)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `tracked` | Boolean | `true` | Si la magnetite est suivie |
| `target.post` | List&lt;Integer&gt; | - | Coordonnees cibles [x, y, z] |
| `target.dimension` | String | - | Nom du monde |

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

Definit les lignes de description de l'item.

**Minecraft Wiki:** [lore](https://minecraft.wiki/w/Data_component_format#lore)

```yaml
components:
  lore:
    - "&7Ligne 1"
    - "&7Ligne 2"
    - ""
    - "&eCliquez pour utiliser !"
```

Ou en une seule ligne:

```yaml
components:
  lore: "&7Une description simple"
```

---

## map-color

Definit la couleur du marqueur de carte pour les cartes remplies.

**Minecraft Wiki:** [map_color](https://minecraft.wiki/w/Data_component_format#map_color)

```yaml
components:
  map-color: "#FF5555"
```

---

## map-id

Definit l'ID de carte pour les cartes remplies.

**Minecraft Wiki:** [map_id](https://minecraft.wiki/w/Data_component_format#map_id)

```yaml
components:
  map-id: 1234
```

---

## max-damage

Definit la durabilite maximale de l'item.

**Minecraft Wiki:** [max_damage](https://minecraft.wiki/w/Data_component_format#max_damage)

```yaml
components:
  max-damage: 2000
```

---

## max-stack-size

Remplace la taille de pile maximale (1-99).

**Minecraft Wiki:** [max_stack_size](https://minecraft.wiki/w/Data_component_format#max_stack_size)

```yaml
components:
  max-stack-size: 16
```

---

## minimum-attack-charge <span class="badge badge--danger">1.21.11+</span>

Definit la charge d'attaque minimale requise pour infliger des degats.

**Minecraft Wiki:** [minimum_attack_charge](https://minecraft.wiki/w/Data_component_format#minimum_attack_charge)

```yaml
components:
  minimum-attack-charge: 0.5
```

---

## ominous-bottle-amplifier

Definit l'amplificateur de Mauvais Presage pour les bouteilles inquietantes.

**Minecraft Wiki:** [ominous_bottle_amplifier](https://minecraft.wiki/w/Data_component_format#ominous_bottle_amplifier)

```yaml
components:
  ominous-bottle-amplifier: 4
```

---

## piercing-weapon <span class="badge badge--danger">1.21.11+</span>

Configure le comportement d'arme de type trident.

**Minecraft Wiki:** [piercing_weapon](https://minecraft.wiki/w/Data_component_format#piercing_weapon)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `deals-knockback` | Boolean | `true` | Si les coups infligent un recul |
| `dismounts` | Boolean | `false` | Si les coups demontent les cavaliers |
| `sound` | String | - | Son lors du lancer |
| `hit-sound` | String | - | Son lors de l'impact |

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

Configure les effets de potion et l'apparence.

**Minecraft Wiki:** [potion_contents](https://minecraft.wiki/w/Data_component_format#potion_contents)

| Cle | Type | Description |
|-----|------|-------------|
| `potion` | String | Type de potion de base (ex: `speed`, `healing`) |
| `custom-color` | String | Couleur de potion personnalisee (format hex) |
| `custom-name` | String | Nom de potion personnalise |
| `custom-effects` | List | Liste des effets de potion personnalises |

**Proprietes des effets personnalises:**
| Cle | Type | Description |
|-----|------|-------------|
| `type` | String | Type d'effet (ex: `speed`, `jump_boost`) |
| `amplifier` | Integer | Niveau d'effet (0 = niveau 1) |
| `duration` | Integer | Duree en ticks (20 ticks = 1 seconde) |
| `ambient` | Boolean | Particules ambiantes (comme la balise) |
| `show-particles` | Boolean | Afficher les particules d'effet |
| `show-icon` | Boolean | Afficher l'icone d'effet |

```yaml
components:
  potion-contents:
    potion: speed
    custom-color: "#FF0000"
    custom-name: "&cPotion de Super Vitesse"
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

## potion-duration-scale <span class="badge badge--danger">1.21.5+</span>

Multiplie la duree des effets de potion.

**Minecraft Wiki:** [potion_duration_scale](https://minecraft.wiki/w/Data_component_format#potion_duration_scale)

```yaml
components:
  potion-duration-scale: 1.5
```

---

## profile <span class="badge badge--danger">1.21.9+</span>

Configure l'apparence des tetes de joueur.

**Minecraft Wiki:** [profile](https://minecraft.wiki/w/Data_component_format#profile)

**Simple (par nom de joueur ou UUID):**
```yaml
components:
  profile: "Notch"
```

```yaml
components:
  profile: "069a79f4-44e9-4726-a5be-fca90e38aaf5"
```

**Par URL de texture:**
```yaml
components:
  profile: "http://textures.minecraft.net/texture/abc123..."
```

**Configuration avancee:**
```yaml
components:
  profile:
    id: "069a79f4-44e9-4726-a5be-fca90e38aaf5"
    name: "Notch"
    texture: "http://textures.minecraft.net/texture/..."
    model: classic  # ou "slim"
    cape: "http://textures.minecraft.net/texture/..."
```

---

## rarity

Definit la rarete de l'item, ce qui affecte la couleur du nom.

**Minecraft Wiki:** [rarity](https://minecraft.wiki/w/Data_component_format#rarity)

```yaml
components:
  rarity: EPIC
```

**Valeurs disponibles:**
- `COMMON` - Nom blanc
- `UNCOMMON` - Nom jaune
- `RARE` - Nom cyan
- `EPIC` - Nom violet clair

---

## recipes

Debloque des recettes lorsque l'item est obtenu (livre de connaissances).

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

Definit le cout de reparation sur l'enclume.

**Minecraft Wiki:** [repair_cost](https://minecraft.wiki/w/Data_component_format#repair_cost)

```yaml
components:
  repair-cost: 5
```

---

## stored-enchantments

Enchantements stockes dans les livres enchantes.

**Minecraft Wiki:** [stored_enchantments](https://minecraft.wiki/w/Data_component_format#stored_enchantments)

```yaml
components:
  stored-enchantments:
    mending: 1
    unbreaking: 3
```

---

## suspicious-stew-effects

Definit les effets de potion pour le ragout suspect.

**Minecraft Wiki:** [suspicious_stew_effects](https://minecraft.wiki/w/Data_component_format#suspicious_stew_effects)

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

Configure l'animation de balancement lors de l'utilisation de l'item.

**Minecraft Wiki:** [swing_animation](https://minecraft.wiki/w/Data_component_format#swing_animation)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `duration` | Integer | `6` | Duree de l'animation en ticks |
| `type` | String | `WHACK` | Type d'animation |

```yaml
components:
  swing-animation:
    duration: 6
    type: WHACK
```

**Types d'animation:** `WHACK`, `BRUSH`

---

## tool

Transforme n'importe quel item en outil avec des capacites de minage.

**Minecraft Wiki:** [tool](https://minecraft.wiki/w/Data_component_format#tool)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `default-mining-speed` | Float | `1.0` | Vitesse par defaut pour les blocs non specifies |
| `damage-per-block` | Integer | `1` | Durabilite perdue par bloc mine |
| `can-destroy-blocks-in-creative` | Boolean | `true` | Peut casser des blocs en mode creatif |
| `rules` | List | `[]` | Regles de minage specifiques aux blocs |

**Proprietes des regles:**
| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `blocks` | List/String | - | Bloc(s) ou tag de bloc |
| `speed` | Float | `1.0` | Vitesse de minage pour ces blocs |
| `correct-for-drops` | Boolean | `false` | Si les blocs lachent des items lorsqu'ils sont mines |

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

Controle la visibilite de l'infobulle.

**Minecraft Wiki:** [tooltip_display](https://minecraft.wiki/w/Data_component_format#tooltip_display)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `hide-tooltip` | Boolean | `false` | Masquer l'infobulle entiere |

```yaml
components:
  tooltip-display:
    hide-tooltip: true
```

---

## tooltip-style <span class="badge badge--danger">1.21.2+</span>

Definit un style d'infobulle personnalise depuis les packs de ressources.

**Minecraft Wiki:** [tooltip_style](https://minecraft.wiki/w/Data_component_format#tooltip_style)

```yaml
components:
  tooltip-style: "minecraft:custom_tooltip"
```

---

## trim

Applique des motifs de garniture d'armure.

**Minecraft Wiki:** [trim](https://minecraft.wiki/w/Data_component_format#trim)

| Cle | Type | Requis | Description |
|-----|------|--------|-------------|
| `material` | String | Oui | Materiau de garniture |
| `pattern` | String | Oui | Motif de garniture |

```yaml
components:
  trim:
    material: gold
    pattern: sentry
```

**Materiaux:** `amethyst`, `copper`, `diamond`, `emerald`, `gold`, `iron`, `lapis`, `netherite`, `quartz`, `redstone`

**Motifs:** `coast`, `dune`, `eye`, `host`, `raiser`, `rib`, `sentry`, `shaper`, `silence`, `snout`, `spire`, `tide`, `vex`, `ward`, `wayfinder`, `wild`

---

## unbreakable

Rend l'item incassable.

**Minecraft Wiki:** [unbreakable](https://minecraft.wiki/w/Data_component_format#unbreakable)

```yaml
components:
  unbreakable: true
```

---

## use-cooldown <span class="badge badge--danger">1.21.2+</span>

Ajoute un temps de recharge apres l'utilisation de l'item.

**Minecraft Wiki:** [use_cooldown](https://minecraft.wiki/w/Data_component_format#use_cooldown)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `seconds` | Float | `0` | Duree du temps de recharge en secondes |
| `cooldown-group` | String | - | Identifiant du groupe de temps de recharge (les items du meme groupe partagent le temps de recharge) |

```yaml
components:
  use-cooldown:
    seconds: 1.0
    cooldown-group: "my_plugin:special_items"
```

---

## use-effects <span class="badge badge--danger">1.21.11+</span>

Configure les effets lors de l'utilisation de l'item (comme la longue-vue).

**Minecraft Wiki:** [use_effects](https://minecraft.wiki/w/Data_component_format#use_effects)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `can-sprint` | Boolean | `false` | Peut sprinter pendant l'utilisation |
| `speed-multiplier` | Float | `0.2` | Multiplicateur de vitesse de deplacement pendant l'utilisation |
| `interact-vibrations` | Boolean | `true` | Emet des vibrations de sculk lors de l'interaction |

```yaml
components:
  use-effects:
    can-sprint: false
    speed-multiplier: 0.2
    interact-vibrations: true
```

---

## use-remainder <span class="badge badge--danger">1.21.2+</span>

Item restant apres utilisation (comme les bols de ragout).

**Minecraft Wiki:** [use_remainder](https://minecraft.wiki/w/Data_component_format#use_remainder)

```yaml
components:
  use-remainder:
    material: BOWL
    amount: 1
```

---

## weapon <span class="badge badge--danger">1.21.5+</span>

Configure les proprietes de degats de l'arme.

**Minecraft Wiki:** [weapon](https://minecraft.wiki/w/Data_component_format#weapon)

| Cle | Type | Defaut | Description |
|-----|------|--------|-------------|
| `item-damage-per-attack` | Integer | `1` | Durabilite perdue par attaque |
| `disable-blocking-for-seconds` | Float | `0` | Duree pour desactiver le blocage au bouclier |

```yaml
components:
  weapon:
    item-damage-per-attack: 1
    disable-blocking-for-seconds: 5.0
```

---

## writable-book-content

Contenu pour le livre et plume (livre inscriptible).

**Minecraft Wiki:** [writable_book_content](https://minecraft.wiki/w/Data_component_format#writable_book_content)

| Cle | Type | Description |
|-----|------|-------------|
| `pages` | List | Liste des pages avec contenu texte brut |

```yaml
components:
  writable-book-content:
    pages:
      - title: "Mon Journal"
        raw: "Jour 1 : J'ai commence mon aventure..."
      - raw: "Jour 2 : J'ai trouve un village..."
      - raw: "Jour 3 : J'ai decouvert une forteresse !"
```

---

## written-book-content

Contenu pour les livres signes.

**Minecraft Wiki:** [written_book_content](https://minecraft.wiki/w/Data_component_format#written_book_content)

| Cle | Type | Description |
|-----|------|-------------|
| `title` | String | Titre du livre |
| `author` | String | Nom de l'auteur |
| `generation` | String | Generation du livre: `ORIGINAL`, `COPY_OF_ORIGINAL`, `COPY_OF_COPY`, `TATTERED` |
| `pages` | List | Liste des pages avec contenu texte brut |

```yaml
components:
  written-book-content:
    title: "La Legende de Herobrine"
    author: "Notch"
    generation: ORIGINAL
    pages:
      - raw: "Chapitre 1\n\nC'etait une nuit sombre et orageuse..."
      - raw: "Chapitre 2\n\nLa silhouette mysterieuse apparut..."
      - raw: "Fin"
```

---

## Exemple complet

Voici un exemple complet d'une epee legendaire personnalisee utilisant les composants:

```yaml
item:
  material: DIAMOND_SWORD
  components:
    item-name: "&6&l✦ Excalibur ✦"
    lore:
      - "&7L'epee legendaire des rois"
      - ""
      - "&7Degats: &c+15"
      - "&7Vitesse d'attaque: &a+1.6"
      - ""
      - "&5&oForgee dans le feu du dragon"
      - ""
      - "&eClic droit pour capacite speciale !"
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

## Compatibilite des versions

| Composant | Version minimale |
|-----------|------------------|
| La plupart des composants | 1.20.5 |
| `food`, `tool`, `container-loot`, `custom-data`, `damage-resistant`, `ominous-bottle-amplifier` | 1.20.5 |
| `jukebox-playable` | 1.21 |
| `consumable`, `enchantable`, `equippable`, `glider`, `item-model`, `tooltip-style`, `use-cooldown`, `use-remainder` | 1.21.2 |
| `blocks-attacks`, `break-sound`, `potion-duration-scale`, `tooltip-display`, `weapon` | 1.21.5 |
| `profile` | 1.21.9 |
| `attack-range`, `damage-type`, `kinetic-weapon`, `minimum-attack-charge`, `piercing-weapon`, `swing-animation`, `use-effects` | 1.21.11 |

## Prochaines etapes

- Apprenez a utiliser les composants dans [Configuration d'item](./item)
- Ajoutez des items aux [Boutons](../buttons/button)
- Creez des [Patterns](../patterns) pour des modeles reutilisables
