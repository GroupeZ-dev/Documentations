---
sidebar_position: 6
title: Inventaires
description: Configurez les inventaires de quetes avec zMenu
---

# Inventaires

zQuests utilise zMenu pour tous les affichages d'inventaires. Cela vous permet de personnaliser completement la facon dont les quetes sont presentees aux joueurs en utilisant le puissant systeme de configuration de zMenu.

## Inventaire par defaut

Quand les joueurs utilisent `/quests`, l'inventaire specifie dans `config.yml` s'ouvre :

```yaml
# Nom du fichier pour ouvrir l'inventaire avec la commande principale
main-command-inventory-name: "quests"
```

Cela ouvre `plugins/zQuests/inventories/quests.yml`.

## Boutons personnalises

zQuests fournit des types de boutons personnalises pour afficher les informations de quetes.

### ZQUESTS_COMPLETE

Verifie si une liste de quetes est complete et affiche differents items en consequence.

```yaml
items:
  recompense-etape:
    type: ZQUESTS_COMPLETE
    slot: 22
    quests:
      - "tutoriel-1"
      - "tutoriel-2"
      - "tutoriel-3"
    # Item affiche quand TOUTES les quetes sont completes
    item:
      material: NETHER_STAR
      name: "&6&lEtape Complete !"
      lore:
        - "&7Vous avez complete toutes les quetes du tutoriel !"
        - ""
        - "&aCliquez pour reclamer votre recompense !"
    actions:
      - type: console_command
        commands:
          - "give %player% diamond 10"
      - type: message
        messages:
          - "&aRecompense reclamee !"
    # Item affiche quand les quetes ne sont PAS completes
    else:
      item:
        material: BARRIER
        name: "&c&lEtape Verrouillee"
        lore:
          - "&7Completez toutes les quetes du tutoriel"
          - "&7pour debloquer cette recompense !"
          - ""
          - "&cQuetes restantes : 3"
```

### ZQUESTS_ACTIVE

Affiche les quetes actives avec support de pagination.

```yaml
items:
  quetes-actives:
    type: ZQUESTS_ACTIVE
    slots:
      - 10-16
      - 19-25
      - 28-34
    # Modele d'item pour chaque quete active
    item:
      material: "%quest-thumbnail%"
      name: "&6%quest-display-name%"
      lore:
        - "&7%quest-description%"
        - ""
        - "%quest-lore-line%"
        - ""
        - "&eCliquez pour les options"
```

### ZQUESTS_NOT_ACTIVE

Affiche les quetes qui n'ont pas encore ete demarrees.

```yaml
items:
  quetes-disponibles:
    type: ZQUESTS_NOT_ACTIVE
    slots:
      - 10-16
      - 19-25
    item:
      material: "%quest-thumbnail%"
      name: "&e%quest-display-name%"
      lore:
        - "&7%quest-description%"
        - ""
        - "&aCliquez pour demarrer !"
    actions:
      - type: START_QUEST
        quest: "%quest-name%"
```

### ZQUESTS_HISTORY

Affiche l'historique des quetes completees.

```yaml
items:
  historique-quetes:
    type: ZQUESTS_HISTORY
    slots:
      - 10-16
      - 19-25
    item:
      material: "%quest-thumbnail%"
      name: "&a%quest-display-name% &7(Completee)"
      lore:
        - "&7%quest-description%"
        - ""
        - "&aCompletee le : %quest-completed-date%"
```

### ZQUESTS_FAVORITE

Affiche les quetes favorites.

```yaml
items:
  favoris:
    type: ZQUESTS_FAVORITE
    slots:
      - 10-16
    item:
      material: "%quest-thumbnail%"
      name: "&6⭐ %quest-display-name%"
      lore:
        - "&7%quest-description%"
        - ""
        - "%quest-lore-line%"
```

### CHANGE_QUEST_GROUP

Bouton pour basculer entre les groupes de quetes.

```yaml
items:
  selecteur-groupe:
    type: CHANGE_QUEST_GROUP
    slot: 49
    groups:
      - "minage"
      - "agriculture"
      - "combat"
    item:
      material: COMPASS
      name: "&eChanger de Categorie"
      lore:
        - "&7Actuel : %current-group%"
        - ""
        - "&aCliquez pour changer"
```

### SET_FAVORITE_LIMIT

Bouton pour modifier la limite de quetes favorites.

```yaml
items:
  augmenter-limite:
    type: ADD_FAVORITE_LIMIT
    slot: 52
    amount: 1
    item:
      material: EMERALD
      name: "&aAugmenter la Limite de Favoris"
      lore:
        - "&7Limite actuelle : %favorite-limit%"
        - ""
        - "&eCliquez pour ajouter +1"

  diminuer-limite:
    type: REMOVE_FAVORITE_LIMIT
    slot: 46
    amount: 1
    item:
      material: REDSTONE
      name: "&cDiminuer la Limite de Favoris"
      lore:
        - "&7Limite actuelle : %favorite-limit%"
```

### SET_FAVORITE_TYPE

Bouton pour changer le type d'affichage des favoris.

```yaml
items:
  type-favori:
    type: SET_FAVORITE_TYPE
    slot: 4
    favorite-type: ALL  # ALL, ACTIVE, COMPLETED
    item:
      material: GOLD_INGOT
      name: "&6Definir le Type de Favori"
      lore:
        - "&7Cliquez pour changer le type d'affichage"
```

## Actions personnalisees

### START_QUEST

Demarrer une quete depuis un clic de bouton :

```yaml
actions:
  - type: START_QUEST
    quest: "casseur-pierre-1"
```

Utilisez avec les placeholders de quetes pour des demarrages dynamiques :

```yaml
# Dans un bouton ZQUESTS_NOT_ACTIVE
actions:
  - type: START_QUEST
    quest: "%quest-name%"
```

## Placeholders de quetes dans les inventaires

Lors de l'utilisation des types de boutons de quetes, ces placeholders sont disponibles :

| Placeholder | Description |
|-------------|-------------|
| `%quest-name%` | Nom interne de la quete |
| `%quest-display-name%` | Nom d'affichage |
| `%quest-description%` | Description de la quete |
| `%quest-thumbnail%` | Materiau miniature |
| `%quest-type%` | Type de quete |
| `%quest-goal%` | Objectif de la quete |
| `%quest-progress%` | Progression actuelle |
| `%quest-lore-line%` | Ligne de progression formatee |
| `%quest-progress-bar%` | Barre de progression visuelle |
| `%quest-percent%` | Pourcentage de completion |
| `%quest-remaining%` | Quantite restante |
| `%quest-model-id%` | ID de modele personnalise |
| `%quest-completed-date%` | Date de completion |
| `%quest-global-group-name%` | Nom du groupe |

## Exemple d'inventaire complet

```yaml
# plugins/zQuests/inventories/quests.yml
name: "&8&lQuetes"
size: 54

items:
  # Bordure decorative
  bordure:
    type: NONE
    slots:
      - 0-9
      - 17
      - 18
      - 26
      - 27
      - 35
      - 36
      - 44-53
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: " "

  # Onglets de categories
  toutes-quetes:
    slot: 2
    item:
      material: BOOK
      name: "&6Toutes les Quetes"
      lore:
        - "&7Voir toutes les quetes disponibles"
    actions:
      - type: inventory
        inventory: "quests_toutes"

  onglet-actives:
    slot: 3
    item:
      material: WRITABLE_BOOK
      name: "&aQuetes Actives"
      lore:
        - "&7Voir vos quetes actives"
    actions:
      - type: inventory
        inventory: "quests_actives"

  onglet-completees:
    slot: 4
    item:
      material: ENCHANTED_BOOK
      name: "&bQuetes Completees"
      lore:
        - "&7Voir les quetes completees"
    actions:
      - type: inventory
        inventory: "quests_historique"

  onglet-favoris:
    slot: 5
    item:
      material: NETHER_STAR
      name: "&6⭐ Favoris"
      lore:
        - "&7Voir les quetes favorites"
    actions:
      - type: inventory
        inventory: "quests_favoris"

  # Affichage des quetes actives
  quetes-actives:
    type: ZQUESTS_ACTIVE
    slots:
      - 10-16
      - 19-25
      - 28-34
    item:
      material: "%quest-thumbnail%"
      name: "&6%quest-display-name%"
      lore:
        - ""
        - "&7%quest-description%"
        - ""
        - "%quest-lore-line%"
        - ""
        - "&8Type : &7%quest-type%"
        - ""
        - "&eClic gauche &7pour les details"
        - "&eClic droit &7pour basculer le favori"

  # Pagination
  page-precedente:
    type: PREVIOUS
    slot: 48
    item:
      material: ARROW
      name: "&cPage Precedente"
    view-requirement:
      requirements:
        - type: placeholder
          placeholder: "%page%"
          value: "1"
          action: SUPERIOR

  page-suivante:
    type: NEXT
    slot: 50
    item:
      material: ARROW
      name: "&aPage Suivante"
    view-requirement:
      requirements:
        - type: placeholder
          placeholder: "%page%"
          value: "%maxPage%"
          action: INFERIOR

  # Indicateur de page
  info-page:
    slot: 49
    item:
      material: PAPER
      name: "&ePage %page%/%maxPage%"
      lore:
        - "&7Cliquez pour rafraichir"
    actions:
      - type: refresh

  # Bouton fermer
  fermer:
    slot: 53
    item:
      material: BARRIER
      name: "&cFermer"
    actions:
      - type: close
```

## Fichiers d'inventaires multiples

Organisez vos inventaires :

```
plugins/zQuests/inventories/
├── quests.yml             # Menu principal des quetes
├── quests_toutes.yml      # Vue de toutes les quetes
├── quests_actives.yml     # Quetes actives uniquement
├── quests_historique.yml  # Quetes completees
├── quests_favoris.yml     # Quetes favorites
└── quest_details.yml      # Vue de quete individuelle
```

## Conseils

1. **Utilisez les patterns** - Creez des patterns reutilisables pour les bordures et la navigation
2. **Ajoutez des animations** - Utilisez la fonction de mise a jour de zMenu pour des mises a jour en direct
3. **Filtrez par groupe** - Creez des inventaires separes pour differentes categories de quetes
4. **Mobile-friendly** - Gardez les boutons importants dans des slots faciles d'acces

## Prochaines etapes

- Configurez les [Waypoints & Hologrammes](./waypoints-holograms)
- Decouvrez les [Types de quetes](./quest-types)
- Voir la [Documentation zMenu](https://docs.groupez.dev/zmenu) pour plus d'options d'inventaires
