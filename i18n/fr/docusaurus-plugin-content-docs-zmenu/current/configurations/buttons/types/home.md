---
sidebar_position: 6
title: Bouton HOME
description: Bouton qui retourne au premier inventaire de l'historique
---

# Type de bouton HOME

Le type de bouton `HOME` ramene le joueur au tout premier inventaire qu'il a ouvert dans son historique de navigation. C'est utile pour les hierarchies de menus profondes ou les joueurs veulent revenir au debut.

## Utilisation

```yaml
items:
  home:
    type: HOME
    slot: 49
    item:
      material: NETHER_STAR
      name: "&e&lAccueil"
      lore:
        - "&7Retourner au menu principal"
```

## Fonctionnement

Contrairement au bouton [BACK](./back) qui recule d'une etape, `HOME` efface tout l'historique et retourne au premier inventaire :

1. Le joueur ouvre le Menu A (racine)
2. Le joueur navigue : A → B → C → D
3. Le joueur clique sur HOME → Retourne directement au Menu A
4. L'historique est efface

## Difference entre BACK et MAIN_MENU

| Bouton | Comportement |
|--------|--------------|
| `BACK` | Va a l'inventaire precedent (une etape) |
| `HOME` | Va au premier inventaire de l'historique |
| `MAIN_MENU` | Ouvre le menu principal configure (peut etre different) |

## Exemples

### Bouton accueil basique

```yaml
items:
  home:
    type: HOME
    slot: 49
    item:
      material: NETHER_STAR
      name: "&e&lAccueil"
    sound: ENTITY_ENDERMAN_TELEPORT
```

### Bouton accueil stylise

```yaml
items:
  home:
    type: HOME
    slot: 49
    item:
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzVhMzFjNjQ1MzNlNTRhZmFjZjA0YzNhMTY3YzM4YjBhYjIzMjI3NjdmYjE2MWVmMTU5MjI5YTI4ZmJiN2EifX0="
      name: "&6&l⌂ Accueil"
      lore:
        - "&7Retourner au menu principal"
        - ""
        - "&e▸ Cliquez pour retourner a l'accueil"
    sound: BLOCK_NOTE_BLOCK_CHIME
```

### Barre de navigation avec accueil

```yaml
items:
  back:
    type: BACK
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&l← Retour"
    sound: UI_BUTTON_CLICK

  previous:
    type: PREVIOUS
    slot: 47
    is-permanent: true
    item:
      material: ARROW
      name: "&7Precedent"

  home:
    type: HOME
    slot: 49
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
      name: "&7Suivant"

  close:
    slot: 53
    is-permanent: true
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lFermer"
```

### Bouton accueil conditionnel

Afficher uniquement quand on n'est pas au menu racine :

```yaml
items:
  home:
    type: HOME
    slot: 49
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_previous_inventories%"
          compare: ">"
          number: 0
    item:
      material: NETHER_STAR
      name: "&e&lAccueil"
    else:
      item:
        material: GRAY_STAINED_GLASS_PANE
        name: "&8"
```

## Quand l'utiliser

Utilisez les boutons `HOME` quand :
- Vous avez des hierarchies de menus profondes (3+ niveaux)
- Les utilisateurs ont besoin d'un moyen rapide de recommencer la navigation
- Vos menus se ramifient en plusieurs categories

## Bonnes pratiques

1. **Placez au centre** - Au milieu de la barre de navigation (slot 49)
2. **Utilisez une icone distinctive** - Etoile du Nether ou tete en forme de maison
3. **Ajoutez a tous les sous-menus** - Incluez dans chaque menu non-racine
4. **Combinez avec BACK** - Donnez aux utilisateurs les deux options
5. **Utilisez `is-permanent: true`** - Toujours visible dans les menus pagines

## Types de boutons associes

- [BACK](./back) - Reculer d'une etape
- [MAIN_MENU](./mainmenu) - Ouvrir le menu principal configure
- [INVENTORY](./inventory) - Ouvrir un inventaire specifique

## Prochaines etapes

- Decouvrez les boutons [MAIN_MENU](./mainmenu)
- Consultez le bouton [JUMP](./jump) pour la navigation de page
- Voir tous les [types de boutons](./none)
