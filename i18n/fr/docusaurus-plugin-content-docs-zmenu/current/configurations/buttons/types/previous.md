---
sidebar_position: 5
title: Bouton PREVIOUS
description: Bouton qui navigue vers la page precedente
---

# Type de bouton PREVIOUS

Le type de bouton `PREVIOUS` navigue vers la page precedente dans un inventaire pagine.

## Utilisation

```yaml
items:
  previous:
    type: PREVIOUS
    slot: 45
    item:
      material: ARROW
      name: "&c&l← Page precedente"
      lore:
        - "&7Aller a la page %zmenu_player_previous_page%"
```

## Proprietes

| Propriete | Description |
|-----------|-------------|
| `slot` / `slots` | Position dans l'inventaire |
| `item` | Apparence visuelle |
| `sound` | Son au clic |
| `is-permanent` | Afficher sur toutes les pages (recommande) |

## Exemples

### Bouton precedent basique

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
```

### Bouton precedent stylise

```yaml
items:
  previous:
    type: PREVIOUS
    slot: 45
    is-permanent: true
    item:
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYmQ2OWUwNmU1ZGFkZmQ4NGU1ZjNkMWMyMTA2M2YyNTUzYjJmYTk0NWVlMWQ0ZDcxNTJmZGM1NDI1YmMxMmE5In19"
      name: "&c&l← Page precedente"
      lore:
        - "&7Actuelle : &f%page%"
        - "&7Aller a : &f%zmenu_player_previous_page%"
    sound: ITEM_BOOK_PAGE_TURN
```

### Masquer sur la premiere page

```yaml
items:
  previous:
    type: PREVIOUS
    slot: 45
    is-permanent: true
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_page%"
          compare: ">"
          number: 1
    item:
      material: ARROW
      name: "&c&l← Precedent"
    else:
      item:
        material: GRAY_STAINED_GLASS_PANE
        name: "&8"
```

### Barre de navigation complete

```yaml
items:
  nav-left-border:
    slots:
      - 45
      - 46
    is-permanent: true
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"

  previous:
    type: PREVIOUS
    slot: 47
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
      name: "&7&lRetour"
    sound: UI_BUTTON_CLICK

  page-info:
    slot: 49
    is-permanent: true
    item:
      material: BOOK
      name: "&6&lPage %page% sur %maxPage%"
      lore:
        - ""
        - "&7Utilisez les fleches pour naviguer"

  home:
    type: HOME
    slot: 50
    is-permanent: true
    item:
      material: NETHER_STAR
      name: "&e&lAccueil"
    sound: UI_BUTTON_CLICK

  next:
    type: NEXT
    slot: 51
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lSuivant →"
    sound: UI_BUTTON_CLICK

  nav-right-border:
    slots:
      - 52
      - 53
    is-permanent: true
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"
```

## Bonnes pratiques

1. **Utilisez toujours `is-permanent: true`** pour les boutons de navigation
2. **Associez avec le bouton NEXT** pour une navigation complete
3. **Ajoutez un compteur de pages** entre les boutons de navigation
4. **Utilisez un positionnement coherent** dans tous les menus pagines
5. **Fournissez un retour audio** avec des sons

## Types de boutons associes

- [NEXT](./next) - Naviguer vers la page suivante
- [JUMP](./jump) - Aller directement a une page specifique
- [BACK](./back) - Retourner a l'inventaire precedent

## Prochaines etapes

- Consultez le type de bouton [NEXT](./next)
- Decouvrez les boutons [JUMP](./jump)
- Voir tous les [types de boutons](./none)
