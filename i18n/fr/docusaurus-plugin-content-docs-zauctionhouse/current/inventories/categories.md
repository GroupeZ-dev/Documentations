---
sidebar_position: 3
title: Catégories
description: Configuration de l'inventaire de sélection des catégories
---

# Inventaire des Catégories

L'inventaire des catégories permet aux joueurs de filtrer les objets de l'hôtel des ventes par catégorie.

**Fichier :** `plugins/zAuctionHouse/inventories/categories.yml`

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/categories.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Aperçu

L'inventaire des catégories inclut :
- Boutons de catégorie pour chaque catégorie définie
- Catégorie "Tous les objets" (affiche tout)
- Bouton retour vers les enchères

## Configuration par Défaut

```yaml
name: "#0c1719Categories"
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-back'

items:

  all-items:
    type: ZAUCTIONHOUSE_CATEGORY
    category: all
    slot: 4
    item:
      material: CHEST
      name: "#2CCED2<bold>ᴀʟʟ ɪᴛᴇᴍs"
      lore:
        - "#92ffffView all auction listings"
        - ""
        - "#92ffffTotal items#8c8c8c: #2CCED2%zauctionhouse_category_count_all%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto browse"

  blocks:
    type: ZAUCTIONHOUSE_CATEGORY
    category: blocks
    slot: 19
    item:
      material: GRASS_BLOCK
      name: "#7a7a7a<bold>ʙʟᴏᴄᴋs"
      lore:
        - "#92ffffAll building blocks"
        - ""
        - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_blocks%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto browse"

  weapons:
    type: ZAUCTIONHOUSE_CATEGORY
    category: weapons
    slot: 20
    item:
      material: DIAMOND_SWORD
      name: "#ff5555<bold>ᴡᴇᴀᴘᴏɴs"
      lore:
        - "#92ffffCombat equipment"
        - "#92ffffSwords, bows, crossbows..."
        - ""
        - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_weapons%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto browse"

  armor:
    type: ZAUCTIONHOUSE_CATEGORY
    category: armor
    slot: 21
    item:
      material: DIAMOND_CHESTPLATE
      name: "#55ffff<bold>ᴀʀᴍᴏʀ"
      lore:
        - "#92ffffProtective equipment"
        - ""
        - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_armor%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto browse"

  tools:
    type: ZAUCTIONHOUSE_CATEGORY
    category: tools
    slot: 22
    item:
      material: DIAMOND_PICKAXE
      name: "#ffff55<bold>ᴛᴏᴏʟs"
      lore:
        - "#92ffffMining and farming tools"
        - ""
        - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_tools%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto browse"

  consumables:
    type: ZAUCTIONHOUSE_CATEGORY
    category: consumables
    slot: 23
    item:
      material: GOLDEN_APPLE
      name: "#55ff55<bold>ᴄᴏɴsᴜᴍᴀʙʟᴇs"
      lore:
        - "#92ffffFood and potions"
        - ""
        - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_consumables%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto browse"

  resources:
    type: ZAUCTIONHOUSE_CATEGORY
    category: resources
    slot: 24
    item:
      material: DIAMOND
      name: "#ffaa00<bold>ʀᴇsᴏᴜʀᴄᴇs"
      lore:
        - "#92ffffOres and materials"
        - ""
        - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_resources%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto browse"

  enchanted-books:
    type: ZAUCTIONHOUSE_CATEGORY
    category: enchanted-books
    slot: 25
    item:
      material: ENCHANTED_BOOK
      name: "#ff55ff<bold>ᴇɴᴄʜᴀɴᴛᴇᴅ ʙᴏᴏᴋs"
      lore:
        - "#92ffffBooks with enchantments"
        - ""
        - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_enchanted-books%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto browse"

  misc:
    type: ZAUCTIONHOUSE_CATEGORY
    category: misc
    slot: 31
    item:
      material: CHEST
      name: "#555555<bold>ᴍɪsᴄᴇʟʟᴀɴᴇᴏᴜs"
      lore:
        - "#92ffffOther items"
        - ""
        - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_misc%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto browse"
```

## Boutons Utilisés

| Bouton | Type | Description |
|--------|------|-------------|
| `all-items` | [`ZAUCTIONHOUSE_CATEGORY`](./buttons#zauctionhouse_category) | Affiche tous les objets |
| `blocks` | [`ZAUCTIONHOUSE_CATEGORY`](./buttons#zauctionhouse_category) | Filtre par blocs |
| `weapons` | [`ZAUCTIONHOUSE_CATEGORY`](./buttons#zauctionhouse_category) | Filtre par armes |
| `armor` | [`ZAUCTIONHOUSE_CATEGORY`](./buttons#zauctionhouse_category) | Filtre par armures |
| `tools` | [`ZAUCTIONHOUSE_CATEGORY`](./buttons#zauctionhouse_category) | Filtre par outils |
| `consumables` | [`ZAUCTIONHOUSE_CATEGORY`](./buttons#zauctionhouse_category) | Filtre par consommables |
| `resources` | [`ZAUCTIONHOUSE_CATEGORY`](./buttons#zauctionhouse_category) | Filtre par ressources |
| `enchanted-books` | [`ZAUCTIONHOUSE_CATEGORY`](./buttons#zauctionhouse_category) | Filtre par livres enchantés |
| `misc` | [`ZAUCTIONHOUSE_CATEGORY`](./buttons#zauctionhouse_category) | Filtre par divers |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_category_count_all%` | Nombre total d'objets en vente |
| `%zauctionhouse_category_count_<name>%` | Nombre d'objets dans une catégorie spécifique |

## Permissible de Catégorie

zAuctionHouse fournit un permissible zMenu personnalisé `zauctionhouse_category` qui permet la visibilité conditionnelle des boutons en fonction de la catégorie actuellement sélectionnée par le joueur. Cela est utile pour afficher/masquer des boutons selon le filtre de catégorie actif.

```yaml
requirements:
  - type: zauctionhouse_category
    category: "weapons"
```

Le bouton ne sera visible que lorsque le joueur a sélectionné la catégorie `weapons`. Si aucune catégorie n'est sélectionnée, la valeur par défaut est `main`.

## Ajouter des Catégories Personnalisées

Pour ajouter une nouvelle catégorie :

1. **Définissez la catégorie** dans `categories.yml` (voir [Configuration des Catégories](../configuration/categories))

2. **Ajoutez le bouton** à cet inventaire :

```yaml
my-custom-category:
  type: ZAUCTIONHOUSE_CATEGORY
  category: my-custom-category  # Must match categories.yml key
  slot: 32
  item:
    material: EMERALD
    name: "#00ff00<bold>ᴍʏ ᴄᴀᴛᴇɢᴏʀʏ"
    lore:
      - "#92ffffCustom category description"
      - ""
      - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_my-custom-category%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto browse"
```

:::tip
La valeur `category` doit correspondre exactement à la clé définie dans `categories.yml`.
:::
