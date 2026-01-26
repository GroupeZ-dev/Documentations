---
sidebar_position: 4
title: Bouton NEXT
description: Bouton qui navigue vers la page suivante
---

# Type de bouton NEXT

Le type de bouton `NEXT` navigue vers la page suivante dans un inventaire pagine.

## Utilisation

```yaml
items:
  next:
    type: NEXT
    slot: 53
    item:
      material: ARROW
      name: "&a&lPage suivante →"
      lore:
        - "&7Aller a la page %zmenu_player_next_page%"
```

## Fonctionnement de la pagination

La pagination est automatique lorsqu'un bouton utilise plusieurs slots et qu'il y a plus de contenu que de slots disponibles :

```yaml
items:
  shop-items:
    slots:
      - 10-16
      - 19-25
      - 28-34
    # Cela cree 21 slots par page
    # Si vous avez 42 items, cela cree 2 pages
```

Le bouton `NEXT` n'apparait/fonctionne que lorsqu'il y a plus de pages disponibles.

## Proprietes

| Propriete | Description |
|-----------|-------------|
| `slot` / `slots` | Position dans l'inventaire |
| `item` | Apparence visuelle |
| `sound` | Son au clic |
| `is-permanent` | Afficher sur toutes les pages (recommande) |

## Exemples

### Bouton suivant basique

```yaml
items:
  next:
    type: NEXT
    slot: 53
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lSuivant →"
    sound: UI_BUTTON_CLICK
```

### Bouton suivant stylise

```yaml
items:
  next:
    type: NEXT
    slot: 53
    is-permanent: true
    item:
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMmE2ZDE1YTUyNzNlNjE0YjY0YTQ4ZjE2OTIxMzYyMmZjNGRkOTJlMWVhMTc4YzJiZDY1NzI3NDVhYWE2NTRiIn19"
      name: "&a&lPage suivante →"
      lore:
        - "&7Actuelle : &f%page%"
        - "&7Aller a : &f%zmenu_player_next_page%"
    sound: ITEM_BOOK_PAGE_TURN
```

### Paire de navigation (Precedent & Suivant)

```yaml
items:
  previous:
    type: PREVIOUS
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&l← Precedent"
    sound: UI_BUTTON_CLICK

  page-info:
    slot: 49
    is-permanent: true
    item:
      material: PAPER
      name: "&e&lPage %page%/%max-page%"
      lore:
        - "&7Naviguez entre les pages"

  next:
    type: NEXT
    slot: 53
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lSuivant →"
    sound: UI_BUTTON_CLICK
```

### Masquer quand il n'y a plus de pages

```yaml
items:
  next:
    type: NEXT
    slot: 53
    is-permanent: true
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_page%"
          compare: "<"
          number_placeholder: "%zmenu_player_max_page%"
    item:
      material: ARROW
      name: "&a&lSuivant →"
    else:
      item:
        material: GRAY_STAINED_GLASS_PANE
        name: "&8"
```

## Exemple complet d'inventaire pagine

```yaml
name: "&6&lBoutique &8(&7Page %page%/%max-page%&8)"
size: 54
enable: true

fillItem:
  material: BLACK_STAINED_GLASS_PANE
  name: "&8"

items:
  # Bordure superieure
  top-border:
    slots:
      - 0-8
    item:
      material: BLUE_STAINED_GLASS_PANE
      name: "&8"

  # Articles de la boutique - ceux-ci seront pagines
  shop-items:
    slots:
      - 10-16
      - 19-25
      - 28-34
    # Definissez plusieurs items qui remplissent ces slots
    # S'il y a plus d'items que de slots, des pages sont creees

  # Bordure inferieure
  bottom-border:
    slots:
      - 36-44
    is-permanent: true
    item:
      material: BLUE_STAINED_GLASS_PANE
      name: "&8"

  # Navigation
  previous:
    type: PREVIOUS
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&l← Precedent"
    sound: UI_BUTTON_CLICK

  back:
    type: BACK
    slot: 48
    is-permanent: true
    item:
      material: DARK_OAK_DOOR
      name: "&7&lRetour au menu"
    sound: UI_BUTTON_CLICK

  page-info:
    slot: 49
    is-permanent: true
    item:
      material: BOOK
      name: "&e&lPage %page%/%max-page%"

  close:
    slot: 50
    is-permanent: true
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lFermer"
    sound: UI_BUTTON_CLICK

  next:
    type: NEXT
    slot: 53
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lSuivant →"
    sound: UI_BUTTON_CLICK
```

## Placeholders pour la pagination

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Numero de la page actuelle |
| `%maxPage%` | Nombre total de pages |
| `%max-page%` | Identique a maxPage |
| `%zmenu_player_page%` | Page actuelle (PAPI) |
| `%zmenu_player_max_page%` | Pages maximum (PAPI) |
| `%zmenu_player_next_page%` | Numero de la page suivante |
| `%zmenu_player_previous_page%` | Numero de la page precedente |

## Bonnes pratiques

1. **Utilisez `is-permanent: true`** pour que la navigation apparaisse sur toutes les pages
2. **Ajoutez les infos de page** entre les boutons Precedent/Suivant
3. **Utilisez des sons** pour le retour lors du changement de page
4. **Envisagez de masquer** les boutons sur la premiere/derniere page
5. **Placez de maniere coherente** sur la ligne du bas (slots 45 et 53)

## Types de boutons associes

- [PREVIOUS](./previous) - Naviguer vers la page precedente
- [JUMP](./jump) - Aller directement a une page specifique
- [BACK](./back) - Retourner a l'inventaire precedent

## Prochaines etapes

- Decouvrez les boutons [PREVIOUS](./previous)
- Consultez [JUMP](./jump) pour la navigation directe de page
- Voir tous les [types de boutons](./none)
