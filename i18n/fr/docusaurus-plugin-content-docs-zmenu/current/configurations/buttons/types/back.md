---
sidebar_position: 3
title: Bouton BACK
description: Bouton qui retourne a l'inventaire precedent
---

# Type de bouton BACK

Le type de bouton `BACK` ramene le joueur a l'inventaire precedemment ouvert. zMenu maintient un historique des inventaires ouverts, permettant une navigation fluide.

## Utilisation

```yaml
items:
  back:
    type: BACK
    slot: 45
    item:
      material: ARROW
      name: "&c&lRetour"
      lore:
        - "&7Retourner au menu precedent"
```

## Fonctionnement

1. Le joueur ouvre le Menu A
2. Le joueur clique pour ouvrir le Menu B (historique : [Menu A])
3. Le joueur clique pour ouvrir le Menu C (historique : [Menu A, Menu B])
4. Le joueur clique sur le bouton BACK → Retourne au Menu B
5. Le joueur clique sur le bouton BACK → Retourne au Menu A

S'il n'y a pas d'inventaire precedent dans l'historique, cliquer sur un bouton BACK ne fait rien.

## Proprietes

Le bouton `BACK` accepte toutes les proprietes standard des boutons :

| Propriete | Description |
|-----------|-------------|
| `slot` / `slots` | Position(s) dans l'inventaire |
| `item` | Apparence visuelle |
| `sound` | Son au clic |
| `is-permanent` | Afficher sur toutes les pages |
| `view-requirement` | Conditions pour voir |

## Exemples

### Bouton retour basique

```yaml
items:
  back:
    type: BACK
    slot: 45
    item:
      material: ARROW
      name: "&c&lRetour"
    sound: UI_BUTTON_CLICK
```

### Bouton retour stylise

```yaml
items:
  back:
    type: BACK
    slot: 45
    item:
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYmQ2OWUwNmU1ZGFkZmQ4NGU1ZjNkMWMyMTA2M2YyNTUzYjJmYTk0NWVlMWQ0ZDcxNTJmZGM1NDI1YmMxMmE5In19"
      name: "&c&l← Retour"
      lore:
        - "&7Retourner au menu precedent"
    sound: UI_BUTTON_CLICK
```

### Bouton retour permanent

```yaml
items:
  back:
    type: BACK
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&lRetour"
```

Cela affiche le bouton retour sur toutes les pages d'un inventaire pagine.

### Barre de navigation avec retour

```yaml
items:
  back:
    type: BACK
    slot: 45
    item:
      material: ARROW
      name: "&c&lRetour"
    sound: UI_BUTTON_CLICK

  home:
    type: HOME
    slot: 49
    item:
      material: NETHER_STAR
      name: "&e&lMenu principal"
    sound: UI_BUTTON_CLICK

  close:
    slot: 53
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lFermer"
    sound: UI_BUTTON_CLICK
```

### Bouton retour conditionnel

Afficher le bouton retour uniquement s'il y a un inventaire precedent :

```yaml
items:
  back:
    type: BACK
    slot: 45
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_previous_inventories%"
          compare: ">"
          number: 0
    item:
      material: ARROW
      name: "&c&lRetour"
    else:
      item:
        material: GRAY_STAINED_GLASS_PANE
        name: "&8"
```

## Alternative : Utiliser les actions

Vous pouvez egalement utiliser l'action `back` avec un bouton normal :

```yaml
items:
  back:
    slot: 45
    item:
      material: ARROW
      name: "&c&lRetour"
    actions:
      - type: back
```

Le type de bouton `BACK` est un raccourci pour cela.

## Modeles courants

### Barre de navigation en bas

```yaml
items:
  nav-border-left:
    slots:
      - 45
      - 46
      - 47
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"

  back:
    type: BACK
    slot: 48
    item:
      material: ARROW
      name: "&c&lRetour"

  info:
    slot: 49
    item:
      material: BOOK
      name: "&e&lPage %page%/%maxPage%"

  home:
    type: HOME
    slot: 50
    item:
      material: NETHER_STAR
      name: "&6&lAccueil"

  nav-border-right:
    slots:
      - 51
      - 52
      - 53
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"
```

## Bonnes pratiques

1. **Placez de maniere coherente** - Mettez les boutons retour a la meme position dans tous les menus
2. **Utilisez des icones claires** - Les fleches ou les tetes pointant vers la gauche fonctionnent bien
3. **Ajoutez des sons** - Fournissez un retour audio lors de la navigation
4. **Considerez HOME** - Pour les hierarchies de menus profondes, ajoutez aussi un bouton HOME
5. **Rendez permanent** - Dans les menus pagines, utilisez `is-permanent: true`

## Types de boutons associes

- [HOME](./home) - Retourner au premier inventaire de l'historique
- [MAIN_MENU](./mainmenu) - Ouvrir le menu principal configure
- [INVENTORY](./inventory) - Ouvrir un inventaire specifique

## Prochaines etapes

- Decouvrez les boutons [HOME](./home)
- Consultez [PREVIOUS](./previous) pour la navigation de page
- Voir tous les [types de boutons](./none)
