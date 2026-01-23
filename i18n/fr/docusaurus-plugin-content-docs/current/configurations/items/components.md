---
sidebar_position: 2
title: Components
description: Reference complete des composants d'item dans zMenu (Minecraft 1.20.5+)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Composants d'item

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
      - enchantment: sharpness
        level: 5
```

---

## Composants d'affichage

### custom-name

Definir le nom d'affichage de l'item (peut etre modifie sur une enclume).

```yaml
components:
  custom-name: "&b&lMon Item Personnalise"
```

---

### item-name

Definir le nom de base de l'item (ne peut pas etre modifie sur une enclume).

```yaml
components:
  item-name: "&6Item Special"
```

---

### lore

Definir les lignes de description de l'item.

```yaml
components:
  lore:
    - "&7Ligne 1"
    - "&7Ligne 2"
    - ""
    - "&eCliquez pour utiliser !"
```

---

### rarity

Definir la rarete de l'item. Affecte la couleur du nom.

```yaml
components:
  rarity: EPIC
```

**Valeurs disponibles :** `COMMON`, `UNCOMMON`, `RARE`, `EPIC`

---

### custom-model-data

Donnees de modele personnalise pour l'integration des packs de ressources.

```yaml
components:
  custom-model-data: 12345
```

---

### item-model <span class="badge badge--danger">1.21.4+</span>

Definir directement le modele de l'item.

```yaml
components:
  item-model: "minecraft:custom/my_model"
```

---

### tooltip-style <span class="badge badge--danger">1.21.2+</span>

Style de fond d'infobulle personnalise.

```yaml
components:
  tooltip-style: "minecraft:custom_style"
```

---

### hide-tooltip

Masquer toute l'infobulle.

```yaml
components:
  hide-tooltip: true
```

---

### hide-additional-tooltip

Masquer les informations supplementaires de l'infobulle.

```yaml
components:
  hide-additional-tooltip: true
```

---

## Composants d'enchantement

### enchantments

Ajouter des enchantements a l'item.

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

Enchantements stockes dans les livres enchantes.

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

Forcer ou supprimer l'effet de lueur d'enchantement.

```yaml
components:
  enchantment-glint-override: true   # Forcer la lueur
```

```yaml
components:
  enchantment-glint-override: false  # Supprimer la lueur
```

---

### enchantable <span class="badge badge--danger">1.21.2+</span>

Definir la valeur d'enchantabilite de l'item.

```yaml
components:
  enchantable:
    value: 15
```

---

## Composants de durabilite

### damage

Definir la valeur de degats actuelle de l'item.

```yaml
components:
  damage: 100
```

---

### max-damage

Definir la durabilite maximale de l'item.

```yaml
components:
  max-damage: 2000
```

---

### unbreakable

Rendre l'item incassable.

```yaml
components:
  unbreakable:
    show-in-tooltip: false
```

---

### repairable <span class="badge badge--danger">1.21.2+</span>

Definir quels items peuvent reparer cet item.

```yaml
components:
  repairable:
    items:
      - "minecraft:diamond"
      - "minecraft:netherite_ingot"
```

---

### repair-cost

Definir le cout de reparation sur l'enclume.

```yaml
components:
  repair-cost: 5
```

---

## Composant Food

### food

Rendre n'importe quel item comestible.

```yaml
components:
  food:
    nutrition: 6
    saturation: 0.8
    can-always-eat: true
    eat-seconds: 1.6
```

**Proprietes :**

| Propriete | Description |
|-----------|-------------|
| `nutrition` | Points de nourriture restaures (barres de faim) |
| `saturation` | Modificateur de saturation |
| `can-always-eat` | Peut manger meme sans avoir faim |
| `eat-seconds` | Temps pour manger en secondes |

---

## Composant Consumable <span class="badge badge--danger">1.21.2+</span>

### consumable

Configurer comment un item est consomme.

```yaml
components:
  consumable:
    consume-seconds: 1.6
    animation: EAT
    has-consume-particles: true
```

**Animations :** `EAT`, `DRINK`, `BLOCK`, `BOW`, `SPEAR`, `CROSSBOW`, `SPYGLASS`, `TOOT_HORN`, `BRUSH`, `BUNDLE`

---

## Composant Tool

### tool

Transformer n'importe quel item en outil avec des capacites de minage.

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

**Proprietes :**

| Propriete | Description |
|-----------|-------------|
| `default-mining-speed` | Vitesse par defaut pour les blocs non specifies |
| `damage-per-block` | Durabilite perdue par bloc mine |
| `rules` | Liste de regles specifiques aux blocs |

---

## Composant Weapon <span class="badge badge--danger">1.21.2+</span>

### weapon

Configurer les proprietes de degats de l'arme.

```yaml
components:
  weapon:
    damage-per-attack: 7.0
    can-disable-shield: true
    disable-blocking-for-seconds: 5.0
```

---

## Modificateurs d'attributs

### attribute-modifiers

Ajouter des modificateurs d'attributs a l'item.

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

**Types d'attributs :**

| Type | Description |
|------|-------------|
| `ATTACK_DAMAGE` | Bonus de degats d'attaque |
| `ATTACK_SPEED` | Modificateur de vitesse d'attaque |
| `MAX_HEALTH` | Sante maximale |
| `MOVEMENT_SPEED` | Vitesse de deplacement |
| `ARMOR` | Points d'armure |
| `ARMOR_TOUGHNESS` | Solidite d'armure |
| `KNOCKBACK_RESISTANCE` | Resistance au recul |
| `LUCK` | Modificateur de chance |

**Operations :**

| Operation | Description |
|-----------|-------------|
| `ADD_NUMBER` | Ajouter une valeur fixe |
| `ADD_SCALAR` | Ajouter un pourcentage |
| `MULTIPLY_SCALAR_1` | Multiplier par (1 + valeur) |

**Emplacements :** `MAINHAND`, `OFFHAND`, `HEAD`, `CHEST`, `LEGS`, `FEET`, `ANY`

---

## Composants de potion

### potion-contents

Configurer les effets de potion et l'apparence.

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

## Composants de conteneur

### container

Stocker des items a l'interieur de l'item (comme les boites de shulker).

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

Items stockes dans un sac.

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

## Composants d'armure

### trim

Appliquer des motifs de garniture d'armure.

```yaml
components:
  trim:
    material: gold
    pattern: sentry
    show-in-tooltip: true
```

**Materiaux :** `amethyst`, `copper`, `diamond`, `emerald`, `gold`, `iron`, `lapis`, `netherite`, `quartz`, `redstone`

**Motifs :** `coast`, `dune`, `eye`, `host`, `raiser`, `rib`, `sentry`, `shaper`, `silence`, `snout`, `spire`, `tide`, `vex`, `ward`, `wayfinder`, `wild`

---

### glider <span class="badge badge--danger">1.21.2+</span>

Faire fonctionner l'item comme une elytre.

```yaml
components:
  glider: true
```

---

### equippable <span class="badge badge--danger">1.21.2+</span>

Configurer les proprietes d'equipement.

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

## Composants de feu d'artifice

### fireworks

Configurer les fusees de feu d'artifice.

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

**Formes :** `BALL`, `LARGE_BALL`, `BURST`, `CREEPER`, `STAR`

---

### firework-explosion

Configurer les etoiles de feu d'artifice.

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

## Composants de tete

### profile

Configurer l'apparence des tetes de joueur.

```yaml
components:
  profile:
    name: "Notch"
```

Ou utiliser une texture directement :

```yaml
components:
  profile:
    textures:
      - value: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUv..."
```

---

### note-block-sound

Definir le son quand place sur un bloc de notes.

```yaml
components:
  note-block-sound: "minecraft:block.note_block.bell"
```

---

## Composants d'interaction avec les blocs

### can-place-on

Blocs sur lesquels cet item peut etre place (mode aventure).

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

Blocs que cet item peut casser (mode aventure).

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

## Composants divers

### max-stack-size

Remplacer la taille de pile maximale (1-99).

```yaml
components:
  max-stack-size: 16
```

---

### fire-resistant

Rendre l'item immunise au feu et a la lave.

```yaml
components:
  fire-resistant: true
```

---

### intangible-projectile

Le projectile traverse les entites sans collision.

```yaml
components:
  intangible-projectile: true
```

---

### map-color

Definir la couleur pour les cartes remplies.

```yaml
components:
  map-color: "#00FF00"
```

---

### map-id

Definir l'ID de la carte.

```yaml
components:
  map-id: 1
```

---

### ominous-bottle-amplifier <span class="badge badge--danger">1.21+</span>

Definir le niveau de Mauvais Presage pour les bouteilles ominous.

```yaml
components:
  ominous-bottle-amplifier: 3
```

---

### use-cooldown <span class="badge badge--danger">1.21.2+</span>

Ajouter un temps de recharge apres utilisation de l'item.

```yaml
components:
  use-cooldown:
    seconds: 1.0
    cooldown-group: "my_cooldown"
```

---

### use-remainder <span class="badge badge--danger">1.21.2+</span>

Item restant apres utilisation (comme les bols de ragout).

```yaml
components:
  use-remainder:
    material: BOWL
    amount: 1
```

---

### jukebox-playable <span class="badge badge--danger">1.21+</span>

Rendre l'item jouable dans un jukebox.

```yaml
components:
  jukebox-playable:
    song: "minecraft:music_disc.cat"
    show-in-tooltip: true
```

---

## Exemple complet

Voici un exemple complet d'une epee legendaire personnalisee utilisant les composants :

```yaml
item:
  material: DIAMOND_SWORD
  components:
    custom-name: "&6&l✦ Excalibur ✦"
    lore:
      - "&7L'epee legendaire des rois"
      - ""
      - "&7Degats : &c+15"
      - "&7Vitesse d'attaque : &a+1.6"
      - ""
      - "&5&oForgee dans le feu du dragon"
      - ""
      - "&eClic droit pour capacite speciale !"
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

## Compatibilite des versions

| Composant | Version minimale |
|-----------|------------------|
| La plupart des composants | 1.20.5 |
| `food`, `tool` | 1.20.5 |
| `ominous-bottle-amplifier`, `jukebox-playable` | 1.21 |
| `consumable`, `weapon`, `repairable`, `enchantable` | 1.21.2 |
| `glider`, `tooltip-style`, `use-cooldown`, `use-remainder` | 1.21.2 |
| `equippable` | 1.21.2 |
| `item-model` | 1.21.4 |

## Prochaines etapes

- Apprenez a utiliser les composants dans [Configuration d'item](./item)
- Ajoutez des items aux [Boutons](../buttons/button)
- Creez des [Patterns](../patterns) pour des modeles reutilisables
