---
sidebar_position: 7
title: Bouton JUMP
description: Bouton qui saute a une page specifique
---

# Type de bouton JUMP

Le type de bouton `JUMP` navigue directement vers un numero de page specifique dans un inventaire pagine.

## Utilisation

```yaml
items:
  go_to_page_5:
    type: JUMP
    slot: 49
    page: 5
    item:
      material: PAPER
      name: "&e&lAller a la page 5"
```

## Proprietes

### page

**Requis.** Le numero de page vers lequel sauter.

```yaml
items:
  jump:
    type: JUMP
    slot: 0
    page: 3
```

## Exemples

### Index de pages

Creer un index de pages pour une navigation rapide :

```yaml
items:
  page_1:
    type: JUMP
    slot: 45
    page: 1
    item:
      material: PAPER
      amount: 1
      name: "&7Page 1"
    sound: UI_BUTTON_CLICK

  page_2:
    type: JUMP
    slot: 46
    page: 2
    item:
      material: PAPER
      amount: 2
      name: "&7Page 2"
    sound: UI_BUTTON_CLICK

  page_3:
    type: JUMP
    slot: 47
    page: 3
    item:
      material: PAPER
      amount: 3
      name: "&7Page 3"
    sound: UI_BUTTON_CLICK

  page_4:
    type: JUMP
    slot: 48
    page: 4
    item:
      material: PAPER
      amount: 4
      name: "&7Page 4"
    sound: UI_BUTTON_CLICK

  page_5:
    type: JUMP
    slot: 49
    page: 5
    item:
      material: PAPER
      amount: 5
      name: "&7Page 5"
    sound: UI_BUTTON_CLICK
```

### Mettre en surbrillance la page actuelle

```yaml
items:
  page_1:
    type: JUMP
    slot: 45
    page: 1
    view-requirement:
      requirements:
        - type: placeholder
          value: "%page%"
          compare: "!="
          number: 1
    item:
      material: PAPER
      amount: 1
      name: "&7Page 1"
    else:
      item:
        material: ENCHANTED_BOOK
        amount: 1
        name: "&e&lPage 1 &7(Actuelle)"
        glow: true
```

### Navigation par categorie

Sauter vers differentes sections d'un grand inventaire :

```yaml
items:
  weapons:
    type: JUMP
    slot: 0
    page: 1
    item:
      material: DIAMOND_SWORD
      name: "&b&lArmes"
      lore:
        - "&7Aller a la section armes"

  armor:
    type: JUMP
    slot: 1
    page: 3
    item:
      material: DIAMOND_CHESTPLATE
      name: "&9&lArmures"
      lore:
        - "&7Aller a la section armures"

  tools:
    type: JUMP
    slot: 2
    page: 5
    item:
      material: DIAMOND_PICKAXE
      name: "&a&lOutils"
      lore:
        - "&7Aller a la section outils"

  food:
    type: JUMP
    slot: 3
    page: 7
    item:
      material: GOLDEN_APPLE
      name: "&6&lNourriture"
      lore:
        - "&7Aller a la section nourriture"
```

### Raccourcis premiere/derniere page

```yaml
items:
  first-page:
    type: JUMP
    slot: 45
    page: 1
    is-permanent: true
    item:
      material: PLAYER_HEAD
      url: "first_arrow_texture"
      name: "&7&l<< Premiere"
    sound: UI_BUTTON_CLICK

  previous:
    type: PREVIOUS
    slot: 47
    is-permanent: true
    item:
      material: ARROW
      name: "&c&l< Precedent"

  page-info:
    slot: 49
    is-permanent: true
    item:
      material: BOOK
      name: "&e&lPage %page%/%maxPage%"

  next:
    type: NEXT
    slot: 51
    is-permanent: true
    item:
      material: ARROW
      name: "&a&lSuivant >"

  # Note: Pour une derniere page dynamique, vous auriez besoin d'une solution personnalisee
  # car JUMP necessite un numero de page statique
```

### Affichage dynamique de la quantite

Afficher le numero de page comme quantite de l'item :

```yaml
items:
  page-selector:
    type: JUMP
    slot: 13
    page: 1
    item:
      material: PAPER
      amount: 1  # Affiche "1" dans le coin
      name: "&7Page 1"
```

## Combiner avec les conditions de vue

Masquer les boutons de page qui n'existent pas :

```yaml
items:
  page_3:
    type: JUMP
    slot: 47
    page: 3
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_max_page%"
          compare: ">="
          number: 3
    item:
      material: PAPER
      amount: 3
      name: "&7Page 3"
```

## Cas d'utilisation

1. **Grands catalogues** - Acces rapide a des sections specifiques
2. **Boutiques organisees** - Navigation basee sur les categories
3. **Selecteurs de page** - Affichage visuel des numeros de page
4. **Signets** - Sauter aux pages favorites/importantes

## Limitations

- Le numero de page doit etre statique (defini dans la configuration)
- Pour un saut de page dynamique, utilisez des actions personnalisees ou des plugins

## Bonnes pratiques

1. **Indiquez la page actuelle** - Utilisez `view-requirement` + `else`
2. **Utilisez des quantites visuelles** - Definissez `amount` pour correspondre au numero de page
3. **Groupez par categorie** - Organisez les boutons de saut logiquement
4. **Ajoutez des infobulles** - Utilisez le lore pour expliquer ce qu'il y a sur chaque page
5. **Combinez avec les fleches** - Incluez PREVIOUS/NEXT pour la navigation sequentielle

## Types de boutons associes

- [NEXT](./next) - Aller a la page suivante
- [PREVIOUS](./previous) - Aller a la page precedente
- [INVENTORY](./inventory) - Ouvrir un inventaire different

## Prochaines etapes

- Consultez [NEXT](./next) et [PREVIOUS](./previous) pour la navigation sequentielle
- Decouvrez les boutons [MAIN_MENU](./mainmenu)
- Voir tous les [types de boutons](./none)
