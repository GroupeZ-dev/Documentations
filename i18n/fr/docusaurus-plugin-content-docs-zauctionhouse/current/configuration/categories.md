---
sidebar_position: 4
title: Catégories
description: Configurer les catégories d'objets dans zAuctionHouse
---

# Configuration des Catégories

Les catégories organisent les objets dans l'hôtel des ventes, facilitant la recherche pour les joueurs. Configurez-les dans `categories.yml`.

## Structure de Base d'une Catégorie

```yaml
categories:
  weapons:
    # Nom d'affichage
    name: "&cArmes"

    # Icône dans le menu des catégories
    icon:
      material: DIAMOND_SWORD
      name: "&cArmes"
      lore:
        - "&7Épées, arcs et plus"

    # Emplacement dans le menu des catégories (0-53)
    slot: 10

    # Règles pour correspondre aux objets (logique ET - toutes doivent correspondre)
    rules:
      - type: material
        values:
          - DIAMOND_SWORD
          - IRON_SWORD
          - NETHERITE_SWORD
          - BOW
          - CROSSBOW
```

## Types de Règles

### Règle par Matériau

Correspondre aux objets par type de matériau :

```yaml
rules:
  - type: material
    values:
      - DIAMOND_SWORD
      - DIAMOND_AXE
      - DIAMOND_PICKAXE
```

Vous pouvez utiliser des caractères génériques :

```yaml
rules:
  - type: material
    values:
      - "*_SWORD"      # Toutes les épées
      - "*_AXE"        # Toutes les haches
      - "DIAMOND_*"    # Tous les objets en diamant
```

### Règle par Nom

Correspondre aux objets par nom d'affichage :

```yaml
rules:
  - type: name
    # Mode de correspondance : CONTAINS, EQUALS, STARTS_WITH, ENDS_WITH, REGEX
    mode: CONTAINS
    value: "Légendaire"
    # Correspondance sensible à la casse
    case-sensitive: false
```

Exemples :

```yaml
# Correspondre aux objets avec "Épique" dans le nom
- type: name
  mode: CONTAINS
  value: "Épique"

# Correspondre aux objets commençant par "[Mythique]"
- type: name
  mode: STARTS_WITH
  value: "[Mythique]"

# Correspondre avec regex (objets avec chiffres romains)
- type: name
  mode: REGEX
  value: ".*[IVX]+$"
```

### Règle par Lore

Correspondre aux objets par contenu du lore :

```yaml
rules:
  - type: lore
    mode: CONTAINS
    value: "Lié à l'âme"
    # Vérifier une ligne spécifique (optionnel, -1 pour n'importe quelle ligne)
    line: -1
```

### Règle par Tag NBT

Correspondre aux objets par tags NBT (utile pour les objets personnalisés) :

```yaml
rules:
  - type: tag
    # Chemin NBT
    path: "CustomItem.type"
    value: "weapon"
```

Pour vérifier si un tag existe :

```yaml
rules:
  - type: tag
    path: "Enchantments"
    exists: true
```

### Règle par Custom Model Data

Correspondre aux objets par custom model data :

```yaml
rules:
  - type: model-data
    # Valeur exacte
    value: 1001

# Ou plage
- type: model-data
  min: 1000
  max: 1999
```

### Règle par Enchantement

Correspondre aux objets par enchantements :

```yaml
rules:
  - type: enchantment
    # Nom de l'enchantement
    enchantment: SHARPNESS
    # Niveau minimum (optionnel)
    min-level: 1
```

## Logique des Règles

### Logique ET (Par Défaut)

Toutes les règles doivent correspondre pour que l'objet soit dans la catégorie :

```yaml
categories:
  legendary-weapons:
    name: "&6Armes Légendaires"
    # L'objet doit être une épée ET avoir "Légendaire" dans le nom
    rules:
      - type: material
        values:
          - "*_SWORD"
      - type: name
        mode: CONTAINS
        value: "Légendaire"
```

### Logique OU

Utilisez `any-of` pour la logique OU - l'objet correspond si une règle correspond :

```yaml
categories:
  weapons:
    name: "&cArmes"
    any-of:
      - type: material
        values:
          - "*_SWORD"
      - type: material
        values:
          - BOW
          - CROSSBOW
```

### Logique Combinée

Mélangez ET et OU :

```yaml
categories:
  epic-gear:
    name: "&5Équipement Épique"
    # Doit correspondre à la règle de matériau ET au moins une dans any-of
    rules:
      - type: material
        values:
          - "*_SWORD"
          - "*_HELMET"
          - "*_CHESTPLATE"
    any-of:
      - type: name
        mode: CONTAINS
        value: "Épique"
      - type: lore
        mode: CONTAINS
        value: "Objet Rare"
```

## Exemple Complet de Catégories

```yaml
# Catégorie par défaut pour les objets non correspondants
default-category: misc

categories:
  weapons:
    name: "&cArmes"
    icon:
      material: DIAMOND_SWORD
      name: "&cArmes"
      lore:
        - "&7Épées, haches, arcs et plus"
        - ""
        - "&eCliquez pour parcourir !"
    slot: 10
    rules:
      - type: material
        values:
          - "*_SWORD"
          - "*_AXE"
          - BOW
          - CROSSBOW
          - TRIDENT

  armor:
    name: "&9Armure"
    icon:
      material: DIAMOND_CHESTPLATE
      name: "&9Armure"
      lore:
        - "&7Casques, plastrons et plus"
    slot: 11
    rules:
      - type: material
        values:
          - "*_HELMET"
          - "*_CHESTPLATE"
          - "*_LEGGINGS"
          - "*_BOOTS"
          - SHIELD
          - ELYTRA

  tools:
    name: "&6Outils"
    icon:
      material: DIAMOND_PICKAXE
      name: "&6Outils"
      lore:
        - "&7Pioches, pelles et plus"
    slot: 12
    rules:
      - type: material
        values:
          - "*_PICKAXE"
          - "*_SHOVEL"
          - "*_HOE"
          - SHEARS
          - FISHING_ROD
          - FLINT_AND_STEEL

  potions:
    name: "&dPotions"
    icon:
      material: POTION
      name: "&dPotions"
      lore:
        - "&7Potions et matériaux d'alchimie"
    slot: 13
    rules:
      - type: material
        values:
          - POTION
          - SPLASH_POTION
          - LINGERING_POTION
          - TIPPED_ARROW

  enchanted:
    name: "&bObjets Enchantés"
    icon:
      material: ENCHANTED_BOOK
      name: "&bObjets Enchantés"
      lore:
        - "&7Tous les objets enchantés"
    slot: 14
    rules:
      - type: tag
        path: "Enchantments"
        exists: true

  blocks:
    name: "&aBlocs"
    icon:
      material: GRASS_BLOCK
      name: "&aBlocs"
      lore:
        - "&7Blocs de construction"
    slot: 15
    rules:
      - type: material
        values:
          - "*_BLOCK"
          - "*_BRICKS"
          - "*_PLANKS"
          - "*_SLAB"
          - "*_STAIRS"
          - "*_WALL"
          - "*_FENCE"

  food:
    name: "&6Nourriture"
    icon:
      material: GOLDEN_APPLE
      name: "&6Nourriture"
      lore:
        - "&7Nourriture et consommables"
    slot: 16
    rules:
      - type: material
        values:
          - APPLE
          - GOLDEN_APPLE
          - ENCHANTED_GOLDEN_APPLE
          - BREAD
          - COOKED_BEEF
          - COOKED_PORKCHOP
          - COOKED_CHICKEN
          - COOKED_SALMON
          - GOLDEN_CARROT
          - CAKE

  misc:
    name: "&7Divers"
    icon:
      material: CHEST
      name: "&7Divers"
      lore:
        - "&7Tout le reste"
    slot: 19
    # Pas de règles - attrape tout ce qui n'est pas dans d'autres catégories
```

## Priorité des Catégories

Quand un objet correspond à plusieurs catégories, il va dans la première catégorie correspondante. Ordonnez vos catégories de la plus spécifique à la moins spécifique :

```yaml
categories:
  # Catégorie spécifique en premier
  legendary-weapons:
    name: "&6Armes Légendaires"
    rules:
      - type: material
        values: ["*_SWORD"]
      - type: name
        mode: CONTAINS
        value: "Légendaire"

  # Catégorie générale après
  weapons:
    name: "&cArmes"
    rules:
      - type: material
        values: ["*_SWORD"]
```
