---
sidebar_position: 10
title: Bouton PAGINATION
description: Affichez du contenu pagine dans vos menus
---

# Type de bouton PAGINATION

:::warning zMenu+ requis
Ce type de bouton necessite [zMenu+](../../../zmenu-plus) pour fonctionner.
:::

Le type de bouton `PAGINATION` vous permet d'afficher du contenu pagine dans vos menus. Il gere automatiquement la pagination des elements sur plusieurs pages.

## Utilisation

```yaml
items:
  paginated-items:
    type: PAGINATION
    slots:
      - 10-16
      - 19-25
      - 28-34
    elements:
      - display_name: "Diamant"
      - display_name: "Emeraude"
    item:
      material: STONE
      name: "&7%display_name%"
```

## Configuration

| Propriete | Description | Requis |
|-----------|-------------|--------|
| `type` | Doit etre `PAGINATION` | Oui |
| `slots` | Slots ou les elements pagines apparaissent | Oui |
| `elements` | Liste des donnees pour chaque entree | Oui |
| `item` | Modele d'item pour chaque entree | Oui |

:::tip
Si une cle dans `elements` contient une liste (par exemple pour le lore), les valeurs seront jointes par des retours a la ligne. Vous pouvez utiliser ces cles comme placeholders dans la configuration de votre `item`.
:::

## Exemple

### Pagination basique

```yaml
size: 54
name: "&8Menu pagine"

items:
  # Zone de contenu pagine
  content:
    type: PAGINATION
    slots:
      - 10-16
      - 19-25
      - 28-34
    elements:
      - display_name: "Diamant"
        lore_value: "Precieux"
      - display_name: "Emeraude"
        lore_value: "Echangeable"
    item:
      material: PAPER
      name: "&e&l%display_name%"
      lore:
        - "&7Cet objet est %lore_value%"

  # Boutons de navigation
  previous:
    type: PREVIOUS
    slot: 48
    is-permanent: true
    item:
      material: ARROW
      name: "&c&lPage precedente"

  next:
    type: NEXT
    slot: 50
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lPage suivante"
```

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%index%` | Index de l'element actuel |
| `%page%` | Numero de la page actuelle |
| `%max_page%` | Nombre total de pages |

## Prochaines etapes

- Decouvrez [DYNAMIC_PAGINATION](./dynamic-pagination) pour du contenu dynamique
- Consultez [NEXT](./next) et [PREVIOUS](./previous) pour les boutons de navigation
