---
sidebar_position: 2
title: Bouton INVENTORY
description: Bouton qui ouvre un autre inventaire
---

# Type de bouton INVENTORY

Le type de bouton `INVENTORY` ouvre un autre inventaire lorsqu'il est clique.

## Utilisation

```yaml
items:
  open-shop:
    type: INVENTORY
    slot: 13
    inventory: "shop"
    item:
      material: GOLD_INGOT
      name: "&e&lBoutique"
      lore:
        - "&7Cliquez pour ouvrir la boutique"
```

## Proprietes

### inventory

**Requis.** Le nom de l'inventaire a ouvrir.

```yaml
items:
  open-menu:
    type: INVENTORY
    slot: 0
    inventory: "my_other_menu"
```

Le nom de l'inventaire correspond au nom du fichier (sans `.yml`) dans le dossier `inventories/`.

---

### plugin

Specifie quel plugin utiliser pour ouvrir l'inventaire (pour le support multi-plugins).

```yaml
items:
  open-external:
    type: INVENTORY
    slot: 0
    inventory: "external_menu"
    plugin: "OtherPlugin"
```

---

### arguments

Passe des arguments a l'inventaire cible.

```yaml
items:
  open_with_args:
    type: INVENTORY
    slot: 0
    inventory: "category_menu"
    arguments:
      - "swords"
      - "%player%"
```

---

### page

Ouvre l'inventaire a une page specifique.

```yaml
items:
  open_page_3:
    type: INVENTORY
    slot: 0
    inventory: "paginated_menu"
    page: 3
```

## Exemples

### Navigation de menu basique

```yaml
items:
  shop:
    type: INVENTORY
    slot: 11
    inventory: "shop"
    item:
      material: GOLD_INGOT
      name: "&e&lBoutique"
      lore:
        - "&7Acheter et vendre des objets"
        - ""
        - "&e▸ Cliquez pour ouvrir"
    sound: UI_BUTTON_CLICK

  warps:
    type: INVENTORY
    slot: 13
    inventory: "warps"
    item:
      material: ENDER_PEARL
      name: "&5&lWarps"
      lore:
        - "&7Teleportez-vous a travers le monde"
        - ""
        - "&e▸ Cliquez pour ouvrir"
    sound: UI_BUTTON_CLICK

  settings:
    type: INVENTORY
    slot: 15
    inventory: "settings"
    item:
      material: COMPARATOR
      name: "&c&lParametres"
      lore:
        - "&7Configurez vos preferences"
        - ""
        - "&e▸ Cliquez pour ouvrir"
    sound: UI_BUTTON_CLICK
```

### Selection de categorie

```yaml
# Menu principal
items:
  swords:
    type: INVENTORY
    slot: 10
    inventory: "shop_swords"
    item:
      material: DIAMOND_SWORD
      name: "&b&lEpees"

  armor:
    type: INVENTORY
    slot: 12
    inventory: "shop_armor"
    item:
      material: DIAMOND_CHESTPLATE
      name: "&9&lArmures"

  tools:
    type: INVENTORY
    slot: 14
    inventory: "shop_tools"
    item:
      material: DIAMOND_PICKAXE
      name: "&a&lOutils"

  food:
    type: INVENTORY
    slot: 16
    inventory: "shop_food"
    item:
      material: GOLDEN_APPLE
      name: "&6&lNourriture"
```

### Avec des conditions

```yaml
items:
  vip-shop:
    type: INVENTORY
    slot: 22
    inventory: "vip_shop"
    item:
      material: DIAMOND_BLOCK
      name: "&b&lBoutique VIP"
      lore:
        - "&7Articles VIP exclusifs"
    view-requirement:
      requirements:
        - type: permission
          permission: "server.vip"
    else:
      item:
        material: COAL_BLOCK
        name: "&8&lBoutique VIP"
        lore:
          - "&cNecessite le rang VIP"
```

### Ouverture a une page specifique

```yaml
items:
  page_1:
    type: INVENTORY
    slot: 10
    inventory: "items_catalog"
    page: 1
    item:
      material: PAPER
      name: "&7Page 1"

  page_2:
    type: INVENTORY
    slot: 11
    inventory: "items_catalog"
    page: 2
    item:
      material: PAPER
      name: "&7Page 2"

  page_3:
    type: INVENTORY
    slot: 12
    inventory: "items_catalog"
    page: 3
    item:
      material: PAPER
      name: "&7Page 3"
```

## Alternative : Utiliser les actions

Vous pouvez egalement ouvrir des inventaires en utilisant l'action `inventory` avec un bouton `NONE` :

```yaml
items:
  open-shop:
    slot: 13
    item:
      material: GOLD_INGOT
      name: "&e&lBoutique"
    actions:
      - type: inventory
        inventory: "shop"
```

Le type de bouton `INVENTORY` est un raccourci pour ce modele courant.

## Historique de navigation

Lors de l'utilisation des boutons `INVENTORY`, zMenu maintient un historique de navigation. Cela permet aux boutons [BACK](./back) de retourner au menu precedent.

L'historique est gere automatiquement - vous n'avez rien de special a configurer.

## Bonnes pratiques

1. **Utilisez des noms clairs** pour les fichiers d'inventaire afin de les identifier facilement
2. **Ajoutez un retour visuel** avec des sons lors de l'ouverture des menus
3. **Utilisez des conditions** pour restreindre l'acces a certains menus
4. **Fournissez des etats verrouilles** avec `else` pour les menus restreints
5. **Organisez en dossiers** pour les structures de menu complexes

## Prochaines etapes

- Decouvrez les boutons [BACK](./back) pour la navigation
- Creez des [inventaires multi-pages](./next) avec la pagination
- Consultez toutes les [proprietes des boutons](../button)
