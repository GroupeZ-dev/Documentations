---
sidebar_position: 5
title: Règles (Liste Noire/Blanche)
description: Configurer les restrictions d'objets dans zAuctionHouse
---

# Configuration des Règles

Contrôlez quels objets peuvent être vendus dans l'hôtel des ventes en utilisant les règles de liste noire et blanche.

## Liste Noire

Empêchez des objets spécifiques d'être vendus. Configurez dans `rules/blacklist.yml` :

```yaml
# Activer la liste noire
enabled: true

# Règles pour les objets en liste noire
rules:
  # Bloquer des matériaux spécifiques
  - type: material
    values:
      - BEDROCK
      - BARRIER
      - COMMAND_BLOCK
      - CHAIN_COMMAND_BLOCK
      - REPEATING_COMMAND_BLOCK
      - STRUCTURE_BLOCK
      - STRUCTURE_VOID
```

## Liste Blanche

Autorisez uniquement des objets spécifiques à être vendus. Configurez dans `rules/whitelist.yml` :

```yaml
# Activer la liste blanche (remplace la liste noire lorsqu'activée)
enabled: false

# Lorsqu'activée, SEULS ces objets peuvent être vendus
rules:
  - type: material
    values:
      - DIAMOND
      - EMERALD
      - GOLD_INGOT
      - IRON_INGOT
```

:::warning
Lorsque la liste blanche est activée, seuls les objets correspondant aux règles de la liste blanche peuvent être vendus. La liste noire est ignorée.
:::

## Types de Règles

Tous les types de règles des [Catégories](./categories) fonctionnent dans la liste noire/blanche :

### Règle par Matériau

```yaml
- type: material
  values:
    - DIAMOND_SWORD
    - "*_SPAWN_EGG"    # Tous les œufs de spawn
    - "MUSIC_DISC_*"   # Tous les disques de musique
```

### Règle par Nom

```yaml
# Bloquer les objets avec "Admin" dans le nom
- type: name
  mode: CONTAINS
  value: "Admin"
  case-sensitive: false
```

### Règle par Lore

```yaml
# Bloquer les objets liés à l'âme
- type: lore
  mode: CONTAINS
  value: "Lié à l'âme"
```

### Règle par Tag NBT

```yaml
# Bloquer les objets avec un tag NBT spécifique
- type: tag
  path: "CustomItem.untradeable"
  value: "true"
```

### Règle par Custom Model Data

```yaml
# Bloquer les objets avec un model data spécifique
- type: model-data
  value: 9999
```

### Règle par Enchantement

```yaml
# Bloquer les objets avec des enchantements de malédiction
- type: enchantment
  enchantment: VANISHING_CURSE

- type: enchantment
  enchantment: BINDING_CURSE
```

### Règle ItemsAdder

Correspond aux objets du plugin [ItemsAdder](https://www.spigotmc.org/resources/itemsadder.73355/).

```yaml
- type: itemsadder
  items:
    - "namespace:custom_sword"
    - "namespace:admin_pickaxe"
    - "myitems:special_gem"
```

:::info
Nécessite le plugin ItemsAdder. Les objets sont identifiés par leur ID complet (namespace:id).
:::

### Règle Nexo

Correspond aux objets du plugin [Nexo](https://www.spigotmc.org/resources/nexo.114883/).

```yaml
- type: nexo
  items:
    - "custom_sword"
    - "admin_tool"
    - "legendary_armor"
```

:::info
Nécessite le plugin Nexo.
:::

### Règle Oraxen

Correspond aux objets du plugin [Oraxen](https://www.spigotmc.org/resources/oraxen.72448/).

```yaml
- type: oraxen
  items:
    - "custom_sword"
    - "ruby_pickaxe"
    - "emerald_armor"
```

:::info
Nécessite le plugin Oraxen.
:::

## Combiner les Règles

Utilisez `any-of` pour la logique OU :

```yaml
rules:
  # Bloquer si N'IMPORTE laquelle de celles-ci correspond
  any-of:
    - type: material
      values:
        - BEDROCK
    - type: name
      mode: CONTAINS
      value: "Admin"
    - type: lore
      mode: CONTAINS
      value: "Ne peut pas être échangé"
```

Utilisez plusieurs règles pour la logique ET :

```yaml
# Bloquer les objets qui sont À LA FOIS des épées en diamant ET ont "Admin" dans le nom
rules:
  - type: material
    values:
      - DIAMOND_SWORD
  - type: name
    mode: CONTAINS
    value: "Admin"
```

## Exemple Complet de Liste Noire

```yaml
enabled: true

# Message descriptif lorsqu'un objet est bloqué
message: "<red>Cet objet ne peut pas être vendu dans l'hôtel des ventes !"

rules:
  # Blocs administratifs
  - type: material
    values:
      - BEDROCK
      - BARRIER
      - COMMAND_BLOCK
      - CHAIN_COMMAND_BLOCK
      - REPEATING_COMMAND_BLOCK
      - STRUCTURE_BLOCK
      - STRUCTURE_VOID
      - JIGSAW
      - LIGHT
      - DEBUG_STICK

  # Œufs de spawn (prévenir l'abus économique)
  - type: material
    values:
      - "*_SPAWN_EGG"

  # Objets réservés au créatif
  - type: material
    values:
      - KNOWLEDGE_BOOK
      - BUNDLE

  # Boîtes de Shulker avec des objets (empêcher de cacher des objets)
  - type: tag
    path: "BlockEntityTag.Items"
    exists: true

# Règles supplémentaires utilisant any-of (logique OU)
any-of:
  # Bloquer les objets admin par nom
  - type: name
    mode: CONTAINS
    value: "[Admin]"
    case-sensitive: false

  # Bloquer les objets liés à l'âme
  - type: lore
    mode: CONTAINS
    value: "Lié à l'âme"

  # Bloquer les objets personnalisés non échangeables
  - type: tag
    path: "CustomItem.tradeable"
    value: "false"

  # Bloquer les objets maudits
  - type: enchantment
    enchantment: VANISHING_CURSE

  - type: enchantment
    enchantment: BINDING_CURSE
```

## Exemple Complet de Liste Blanche

```yaml
enabled: false  # Mettre à true pour activer

message: "<red>Seuls certains objets peuvent être vendus dans l'hôtel des ventes !"

# Seuls ces objets peuvent être vendus lorsque la liste blanche est activée
rules:
  - type: material
    values:
      # Armes
      - "*_SWORD"
      - "*_AXE"
      - BOW
      - CROSSBOW
      - TRIDENT

      # Armure
      - "*_HELMET"
      - "*_CHESTPLATE"
      - "*_LEGGINGS"
      - "*_BOOTS"
      - SHIELD
      - ELYTRA

      # Outils
      - "*_PICKAXE"
      - "*_SHOVEL"
      - "*_HOE"

      # Objets de valeur
      - DIAMOND
      - EMERALD
      - NETHERITE_INGOT
      - ENCHANTED_BOOK
```

## Règles par Catégorie

Vous pouvez également définir des règles par catégorie dans `categories.yml` :

```yaml
categories:
  weapons:
    name: "&cArmes"

    # Liste noire spécifique à la catégorie
    blacklist:
      - type: name
        mode: CONTAINS
        value: "Entraînement"

    # Liste blanche spécifique à la catégorie
    # whitelist:
    #   - type: enchantment
    #     enchantment: SHARPNESS
```

## Permission de Contournement

Les joueurs avec la permission de contournement peuvent vendre des objets en liste noire :

```yaml
# Dans config.yml
bypass-permission: zauctionhouse.bypass.blacklist
```

## Règles Dynamiques

Les règles sont vérifiées lorsque :
1. Un joueur tente de mettre un objet en vente
2. Un objet est chargé depuis la base de données (si les règles ont changé)

Après avoir modifié les règles, rechargez avec :

```
/ah admin reload
```

Les mises en vente existantes ne sont pas affectées. Pour supprimer les objets en liste noire déjà en vente :

```
/ah admin clear --blacklisted
```

## Débogage des Règles

Activez le mode débogage pour voir pourquoi les objets sont bloqués :

```yaml
# Dans config.yml
debug:
  rules: true
```

Cela journalisera l'évaluation des règles dans la console lorsqu'un joueur essaie de vendre un objet.
