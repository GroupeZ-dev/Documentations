---
sidebar_position: 8
title: Bouton MAIN_MENU
description: Bouton qui ouvre le menu principal configure
---

# Type de bouton MAIN_MENU

Le type de bouton `MAIN_MENU` ouvre l'inventaire configure comme menu principal dans `config.yml`.

## Configuration

D'abord, definissez le menu principal dans votre `config.yml` :

```yaml
# config.yml
main-menu: "main"  # Nom de l'inventaire du menu principal
```

## Utilisation

```yaml
items:
  main-menu:
    type: MAIN_MENU
    slot: 49
    item:
      material: NETHER_STAR
      name: "&6&lMenu principal"
      lore:
        - "&7Retourner au menu principal"
```

## Difference avec HOME

| Bouton | Comportement |
|--------|--------------|
| `HOME` | Retourne au premier inventaire que le joueur a ouvert dans sa session |
| `MAIN_MENU` | Ouvre toujours l'inventaire specifique configure dans config.yml |

**Exemple de scenario :**
- Le joueur ouvre le menu Boutique directement via `/zm open shop`
- Le joueur navigue : Boutique → Epees → Details Epee en Diamant
- `HOME` retournerait a Boutique (premier ouvert)
- `MAIN_MENU` ouvrirait le menu principal configure (ex: "main")

## Exemples

### Bouton menu principal basique

```yaml
items:
  main-menu:
    type: MAIN_MENU
    slot: 49
    item:
      material: NETHER_STAR
      name: "&6&lMenu principal"
    sound: UI_BUTTON_CLICK
```

### Bouton menu principal stylise

```yaml
items:
  main-menu:
    type: MAIN_MENU
    slot: 49
    item:
      material: PLAYER_HEAD
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYzVhMzFjNjQ1MzNlNTRhZmFjZjA0YzNhMTY3YzM4YjBhYjIzMjI3NjdmYjE2MWVmMTU5MjI5YTI4ZmJiN2EifX0="
      name: "&6&l⌂ Menu principal"
      lore:
        - "&7Aller au menu principal du serveur"
        - ""
        - "&e▸ Cliquez pour ouvrir"
    sound: BLOCK_NOTE_BLOCK_CHIME
```

### Dans une barre de navigation

```yaml
items:
  back:
    type: BACK
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&lRetour"

  previous:
    type: PREVIOUS
    slot: 47
    is-permanent: true
    item:
      material: ARROW
      name: "&7Precedent"

  main-menu:
    type: MAIN_MENU
    slot: 49
    is-permanent: true
    item:
      material: NETHER_STAR
      name: "&6&lMenu principal"

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

### Permanent sur tous les sous-menus

```yaml
items:
  main-menu:
    type: MAIN_MENU
    slot: 49
    is-permanent: true
    item:
      material: NETHER_STAR
      name: "&6&lMenu principal"
      lore:
        - "&7Retourner au menu principal"
    sound: UI_BUTTON_CLICK
```

## Quand l'utiliser

Utilisez les boutons `MAIN_MENU` quand :
- Vous avez un menu hub central auquel les joueurs doivent acceder de partout
- Les joueurs peuvent ouvrir des sous-menus directement (via des commandes)
- Vous voulez une navigation coherente dans tous les menus
- Votre serveur a un menu principal d'ou tout se ramifie

## Bonnes pratiques

1. **Configurez main-menu** dans config.yml d'abord
2. **Utilisez de maniere coherente** dans tous les sous-menus
3. **Placez au centre** - le slot 49 est courant
4. **Utilisez une icone distinctive** - L'etoile du Nether fonctionne bien
5. **Ajoutez aux patterns** - Incluez dans un pattern de navigation pour la coherence

## Creer un pattern de menu principal

Creez une barre de navigation reutilisable avec le menu principal :

```yaml
# patterns/navigation.yml
name: "navigation"
size: 54

items:
  back:
    type: BACK
    slot: 45
    is-permanent: true
    item:
      material: ARROW
      name: "&c&lRetour"
    sound: UI_BUTTON_CLICK

  main-menu:
    type: MAIN_MENU
    slot: 49
    is-permanent: true
    item:
      material: NETHER_STAR
      name: "&6&lMenu principal"
    sound: UI_BUTTON_CLICK

  close:
    slot: 53
    is-permanent: true
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lFermer"
    sound: UI_BUTTON_CLICK
```

Puis utilisez-le dans vos inventaires :

```yaml
# inventories/shop.yml
name: "&6Boutique"
size: 54
patterns:
  - "navigation"

items:
  # Vos articles de boutique...
```

## Types de boutons associes

- [HOME](./home) - Retourner au premier inventaire ouvert
- [BACK](./back) - Reculer d'une etape
- [INVENTORY](./inventory) - Ouvrir un inventaire specifique

## Prochaines etapes

- Decouvrez le type de bouton [SWITCH](./switch)
- Creez des [Patterns](../../patterns) pour une navigation reutilisable
- Voir tous les [types de boutons](./none)
