---
sidebar_position: 11
title: Bouton DYNAMIC_PAGINATION
description: Affichez du contenu pagine dynamique a partir de sources de donnees
---

# Type de bouton DYNAMIC_PAGINATION

:::warning zMenu+ requis
Ce type de bouton necessite [zMenu+](../../../zmenu-plus) pour fonctionner.
:::

Le type de bouton `DYNAMIC_PAGINATION` vous permet d'afficher du contenu pagine genere dynamiquement. Contrairement a la `PAGINATION` reguliere, ce type peut recuperer du contenu a partir de sources de donnees externes, de placeholders ou d'integrations de plugins.

## Utilisation

```yaml
items:
  dynamic-list:
    type: DYNAMIC_PAGINATION
    slots:
      - 10-16
      - 19-25
    source: "players"
    item:
      material: PLAYER_HEAD
      player-head: "%entry_name%"
      name: "&a%entry_name%"
```

## Configuration

| Propriete | Description | Requis |
|-----------|-------------|--------|
| `type` | Doit etre `DYNAMIC_PAGINATION` | Oui |
| `slots` | Slots ou les elements pagines apparaissent | Oui |
| `source` | Identifiant de la source de donnees | Oui |
| `item` | Modele d'item pour chaque entree | Oui |

## Exemple

### Liste des joueurs

```yaml
size: 54
name: "&8Joueurs en ligne"

items:
  player-list:
    type: DYNAMIC_PAGINATION
    slots:
      - 10-16
      - 19-25
      - 28-34
    source: "online_players"
    item:
      material: PLAYER_HEAD
      player-head: "%entry_name%"
      name: "&a&l%entry_name%"
      lore:
        - "&7Cliquez pour voir le profil"
    actions:
      - type: player-command
        commands:
          - "profile %entry_name%"

  # Navigation
  previous:
    type: PREVIOUS
    slot: 48
    is-permanent: true
    item:
      material: ARROW
      name: "&c&lPrecedent"

  next:
    type: NEXT
    slot: 50
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lSuivant"

  # Infos de page
  info:
    slot: 49
    is-permanent: true
    item:
      material: PAPER
      name: "&7Page %page%/%max_page%"
```

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%entry_name%` | Nom/identifiant de l'entree |
| `%entry_index%` | Index de l'entree dans la liste |
| `%page%` | Numero de la page actuelle |
| `%max_page%` | Nombre total de pages |

## Prochaines etapes

- Decouvrez [PAGINATION](./pagination) pour la pagination statique
- Voir [INPUT](./input) pour la gestion de la saisie des joueurs
