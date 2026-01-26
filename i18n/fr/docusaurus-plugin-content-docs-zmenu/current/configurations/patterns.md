---
sidebar_position: 8
title: Patterns
description: Creer des modeles de boutons reutilisables pour vos inventaires
---

# Patterns

Les patterns sont des modeles de boutons reutilisables qui peuvent etre appliques a plusieurs inventaires. Ils aident a reduire la duplication et a maintenir la coherence dans vos menus.

## Emplacement des fichiers

Les patterns sont stockes dans `plugins/zMenu/patterns/`.

## Structure de base d'un pattern

```yaml
# patterns/mon_pattern.yml
name: "mon_pattern"
size: 54

items:
  bordure-haut:
    slots:
      - 0-8
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"

  bordure-bas:
    slots:
      - 45-53
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"
```

## Utiliser les patterns dans les inventaires

Referencez les patterns dans votre fichier d'inventaire :

```yaml
# inventories/shop.yml
name: "&6Boutique"
size: 54
patterns:
  - "mon_pattern"

items:
  # Vos items specifiques a l'inventaire...
```

## Variables de pattern

Les patterns peuvent utiliser des variables qui sont remplacees lors de l'application :

### Definir des slots variables

```yaml
# patterns/template.yml
name: "template"
size: 54

items:
  bouton-dynamique:
    slot: "%slot%"
    item:
      material: "%material%"
      name: "%name%"
      lore:
        - "%description%"
```

### Utiliser les variables dans l'inventaire

```yaml
# inventories/mon_menu.yml
patterns:
  - pattern:
      file-name: "template"
      slot: 13
      material: "DIAMOND"
      name: "&b&lMon Item"
      description: "&7Ceci est mon item personnalise"
```

## Exemples

### Pattern de barre de navigation

```yaml
# patterns/navigation.yml
name: "navigation"
size: 54

items:
  nav-retour:
    type: BACK
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&l← Retour"
    sound: UI_BUTTON_CLICK

  nav-precedent:
    type: PREVIOUS
    slot: 48
    is-permanent: true
    item:
      material: ARROW
      name: "&7Precedent"
    sound: UI_BUTTON_CLICK

  nav-page:
    slot: 49
    is-permanent: true
    item:
      material: PAPER
      name: "&e&lPage %page%/%max-page%"

  nav-suivant:
    type: NEXT
    slot: 50
    is-permanent: true
    item:
      material: ARROW
      name: "&7Suivant"
    sound: UI_BUTTON_CLICK

  nav-fermer:
    slot: 53
    is-permanent: true
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lFermer"
    sound: UI_BUTTON_CLICK
```

Utilisation :
```yaml
# inventories/shop.yml
name: "&6Boutique"
size: 54
patterns:
  - "navigation"
```

### Pattern de bordure

```yaml
# patterns/bordure.yml
name: "bordure"
size: 54

items:
  bordure:
    slots:
      - 0-8
      - 9
      - 17
      - 18
      - 26
      - 27
      - 35
      - 36
      - 44
      - 45-53
    item:
      material: GRAY_STAINED_GLASS_PANE
      name: "&8"
```

### Bordure en verre avec variable de couleur

```yaml
# patterns/bordure_coloree.yml
name: "bordure_coloree"
size: 54

items:
  bordure:
    slots:
      - 0-8
      - 45-53
    item:
      material: "%color%_STAINED_GLASS_PANE"
      name: "&8"
```

Utilisation :
```yaml
patterns:
  - pattern:
      file-name: "bordure_coloree"
      color: "BLUE"
```

### Pattern de recompense

```yaml
# patterns/bouton_recompense.yml
name: "bouton_recompense"
size: 54

items:
  recompense:
    slot: "%slot%"
    item:
      material: "%material%"
      name: "%name%"
      lore:
        - "&7Cliquez pour reclamer !"
        - ""
        - "&7Recompense : &a%reward_desc%"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_value_%key%_claimed%"
          compare: "!="
          target: "true"
          deny:
            - type: message
              messages:
                - "&cVous avez deja reclame cette recompense !"
      success:
        - type: data
          action: SET
          key: "%key%_claimed"
          value: "true"
        - type: console-command
          commands:
            - "%reward_command%"
        - type: message
          messages:
            - "&aRecompense reclamee !"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
        - type: refresh
```

Utilisation :
```yaml
patterns:
  - pattern:
      file-name: "bouton_recompense"
      slot: 11
      material: "DIAMOND"
      name: "&b&lRecompense Diamant"
      reward_desc: "5 Diamants"
      key: "diamond_reward"
      reward_command: "give %player% diamond 5"

  - pattern:
      file-name: "bouton_recompense"
      slot: 13
      material: "GOLD_INGOT"
      name: "&6&lRecompense Or"
      reward_desc: "32 Lingots d'or"
      key: "gold_reward"
      reward_command: "give %player% gold_ingot 32"

  - pattern:
      file-name: "bouton_recompense"
      slot: 15
      material: "EMERALD"
      name: "&a&lRecompense Emeraude"
      reward_desc: "16 Emeraudes"
      key: "emerald_reward"
      reward_command: "give %player% emerald 16"
```

## Patterns multiples

Appliquez plusieurs patterns a un inventaire :

```yaml
name: "&6Mon Menu"
size: 54
patterns:
  - "bordure"
  - "navigation"
  - pattern:
      file-name: "header"
      title: "Bienvenue !"
```

Les patterns sont appliques dans l'ordre, donc les patterns ulterieurs peuvent remplacer les precedents.

## Patterns d'actions

Actions par defaut qui s'appliquent a tous les boutons (sauf s'ils definissent les leurs) :

```yaml
# actions_patterns/default-actions.yml
actions:
  - type: sound
    sound: UI_BUTTON_CLICK

deny-actions:
  - type: sound
    sound: ENTITY_VILLAGER_NO
```

Ces actions s'appliquent automatiquement a :
- `actions` : Quand un bouton est clique avec succes
- `deny-actions` : Quand une exigence est refusee

## Pattern d'un autre plugin

Referencez des patterns d'autres plugins :

```yaml
patterns:
  - pattern:
      file-name: "nom_pattern"
      plugin-name: "AutrePlugin"
```

## Bonnes pratiques

1. **Creez des patterns pour les elements repetes** : Barres de navigation, bordures, boutons communs
2. **Utilisez des noms descriptifs** : `navigation`, `shop_border`, `reward_template`
3. **Gardez les patterns cibles** : Un pattern, un objectif
4. **Utilisez les variables** : Rendez les patterns flexibles et reutilisables
5. **Documentez les patterns** : Ajoutez des commentaires expliquant les variables necessaires
6. **Testez individuellement** : Testez les patterns avant de les utiliser en production

## Structure des patterns

```
plugins/zMenu/patterns/
├── navigation.yml      # Barre de navigation
├── bordures/
│   ├── simple.yml      # Bordure simple
│   ├── fancy.yml       # Bordure decoree
│   └── coloree.yml     # Bordure a couleur variable
└── boutons/
    ├── recompense.yml  # Modele de bouton recompense
    └── toggle.yml      # Modele de bouton bascule
```

## Recharger les patterns

```
/zm reload
```

Les patterns sont charges au demarrage du plugin et lors du rechargement.

## Prochaines etapes

- Apprenez les [Donnees joueur](./player-data) pour le stockage persistant
- Voir les [Actions](./buttons/actions) pour les interactions de boutons
- Configurez les [Commandes personnalisees](./custom-commands) pour ouvrir les inventaires
