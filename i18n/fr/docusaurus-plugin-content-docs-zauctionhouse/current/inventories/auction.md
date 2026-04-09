---
sidebar_position: 2
title: Enchères
description: Configuration de l'inventaire principal de l'hôtel des ventes
---

# Inventaire des Enchères

L'inventaire principal de l'hôtel des ventes affiche tous les objets actuellement en vente. Les joueurs y accèdent via la commande `/ah`.

**Fichier :** `plugins/zAuctionHouse/inventories/auction.yml`

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/auction.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/auction-page.gif" alt="Description" style={{ width: '420px', height: 'auto' }} />
  <img src="https://img.groupez.dev/zauctionhouse/v4/auction.gif" alt="Description" style={{ width: '420px', height: 'auto' }} />
</div>

## Aperçu

L'inventaire des enchères inclut :
- Zone d'affichage des objets (36 emplacements)
- Bouton de sélection de catégorie
- Bouton des objets expirés
- Bouton des objets achetés
- Bouton de vos objets (en vente)
- Bouton de recherche
- Bouton d'effacement de recherche
- Boutons de pagination
- Bouton de tri
- Bouton d'information

## Configuration par Défaut

```yaml
name: "%zauctionhouse_category_name% (%page%/%max-page%)"
size: 54

patterns:
  - 'zauctionhouse-decoration'

items:

  displayItems:
    type: ZAUCTIONHOUSE_LISTED_ITEMS
    empty-slot: 22
    slots:
      - 9-17
      - 18-26
      - 27-35
      - 36-44
    item:
      material: BARRIER
      name: '#ff0000&nNo items found'

  categories:
    slot: 4
    type: inventory
    plugin: "zAuctionHouse"
    inventory: "categories"
    is-permanent: true
    item:
      material: CHEST
      name: "#2CCED2<bold>ᴄᴀᴛᴇɢᴏʀɪᴇs"
      lore:
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"

  expired-items:
    type: ZAUCTIONHOUSE_EXPIRED_INVENTORY
    slot: 45
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjdhYWRmZjlkZGM1NDZmZGNlYzZlZDU5MTljYzM5ZGZhOGQwYzA3ZmY0YmM2MTNhMTlmMmU2ZDdmMjU5MyJ9fX0="
      name: "#2CCED2<bold>ᴇxᴘɪʀᴇᴅ ɪᴛᴇᴍs"
      lore:
        - "#92ffffYou have #2CCED2%expired-items% #92ffffexpired item%s%."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
    else:
      item:
        url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjdhYWRmZjlkZGM1NDZmZGNlYzZlZDU5MTljYzM5ZGZhOGQwYzA3ZmY0YmM2MTNhMTlmMmU2ZDdmMjU5MyJ9fX0="
        name: "#2CCED2<bold>ᴇxᴘɪʀᴇᴅ ɪᴛᴇᴍs"
        lore:
          - "#ff3535You have no expired items."

  purchased-items:
    type: ZAUCTIONHOUSE_PURCHASED_INVENTORY
    slot: 46
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjM3Y2FlNWM1MWViMTU1OGVhODI4ZjU4ZTBkZmY4ZTZiN2IwYjFhMTgzZDczN2VlY2Y3MTQ2NjE3NjEifX19"
      name: "#2CCED2<bold>ᴘᴜʀᴄʜᴀsᴇᴅ ɪᴛᴇᴍs"
      lore:
        - "#92ffffYou have #2CCED2%purchased-items% #92ffffbought item%s%."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
    else:
      item:
        url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjM3Y2FlNWM1MWViMTU1OGVhODI4ZjU4ZTBkZmY4ZTZiN2IwYjFhMTgzZDczN2VlY2Y3MTQ2NjE3NjEifX19"
        name: "#2CCED2<bold>ᴘᴜʀᴄʜᴀsᴇᴅ ɪᴛᴇᴍs"
        lore:
          - "#ff3535You have no purchased items."

  selling-items:
    type: ZAUCTIONHOUSE_SELLING_INVENTORY
    slot: 53
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjU4MDdjYzRjM2I2OTU4YWVhNjE1NmU4NDUxOGQ5MWE0OWM1ZjMyOTcxZTZlYjI2OWEyM2EyNWEyNzE0NSJ9fX0="
      name: "#2CCED2<bold>ʏᴏᴜʀ ɪᴛᴇᴍs"
      lore:
        - "#92ffffYou have #2CCED2%selling-items% #92ffffitem%s% on sale."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
    else:
      item:
        url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjU4MDdjYzRjM2I2OTU4YWVhNjE1NmU4NDUxOGQ5MWE0OWM1ZjMyOTcxZTZlYjI2OWEyM2EyNWEyNzE0NSJ9fX0="
        name: "#2CCED2<bold>ʏᴏᴜʀ ɪᴛᴇᴍs"
        lore:
          - "#ff3535You have no items for sale."

  previous:
    is-permanent: true
    type: PREVIOUS
    slot: 48
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjllYTFkODYyNDdmNGFmMzUxZWQxODY2YmNhNmEzMDQwYTA2YzY4MTc3Yzc4ZTQyMzE2YTEwOThlNjBmYjdkMyJ9fX0="
      name: "#2CCED2<bold>ᴘʀᴇᴠɪᴏᴜs ᴘᴀɢᴇ"
      lore:
        - "#92ffffGo to the previous page."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
    else:
      item:
        material: LIGHT_BLUE_STAINED_GLASS_PANE
        name: "<white>"

  next:
    is-permanent: true
    type: NEXT
    slot: 50
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvODI3MWE0NzEwNDQ5NWUzNTdjM2U4ZTgwZjUxMWE5ZjEwMmIwNzAwY2E5Yjg4ZTg4Yjc5NWQzM2ZmMjAxMDVlYiJ9fX0="
      name: "#2CCED2<bold>ɴᴇxᴛ ᴘᴀɢᴇ"
      lore:
        - "#92ffffGo to the next page."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
    else:
      item:
        material: LIGHT_BLUE_STAINED_GLASS_PANE
        name: "<white>"

  search:
    type: ZAUCTIONHOUSE_SEARCH
    slot: 47
    is-permanent: true
    item:
      material: COMPASS
      name: "#2CCED2<bold>sᴇᴀʀᴄʜ"
      lore:
        - ""
        - "#92ffffCurrent search#8c8c8c: #2CCED2%search_query%"
        - ""
        - "#92ffffFilters#8c8c8c:"
        - "#8c8c8c  name #76CDCD~ #8c8c8cvalue    #555555(contains)"
        - "#8c8c8c  name #76CDCD= #8c8c8cvalue    #555555(exact)"
        - "#8c8c8c  name #76CDCD~= #8c8c8cvalue   #555555(contains, ignore case)"
        - "#8c8c8c  name #76CDCD== #8c8c8cvalue   #555555(exact, ignore case)"
        - ""
        - "#92ffffFields#8c8c8c: #76CDCDname#8c8c8c, #76CDCDmaterial#8c8c8c, #76CDCDlore#8c8c8c, #76CDCDseller"
        - ""
        - "#92ffffExamples#8c8c8c:"
        - "#8c8c8c  seller #76CDCD= #8c8c8cNotch"
        - "#8c8c8c  name #76CDCD~ #8c8c8cDiamond"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto search"

  clear-search:
    type: ZAUCTIONHOUSE_CLEAR_SEARCH
    slot: 48
    is-permanent: true
    item:
      material: BARRIER
      name: "#ff6b6b<bold>ᴄʟᴇᴀʀ sᴇᴀʀᴄʜ"
      lore:
        - ""
        - "#92ffffSearching for#8c8c8c: #2CCED2%search_query%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto clear search"

  informations:
    slot: 49
    is-permanent: true
    item:
      material: BELL
      name: "#2CCED2<bold>ᴀᴜᴄᴛɪᴏɴ ɪɴғᴏʀᴍᴀᴛɪᴏɴ"
      lore:
        - "#92ffffWelcome to the auction house."
        - "#92ffffTrade items with other players."
        - ""
        - "#92ffffUsage#8c8c8c:"
        - "#2CCED2/ah sell #92ffff<price> [<amount>]"
        - ""
        - "#92ffffNumber of items#8c8c8c: #2CCED2%zauctionhouse_listed_items%"
        - "#92ffffSort type#8c8c8c: #2CCED2%zauctionhouse_sorting_name%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto refresh the items"

  change-sort:
    type: ZAUCTIONHOUSE_CHANGE_SORT
    sorts:
      - DECREASING_DATE
      - DECREASING_PRICE
      - ASCENDING_DATE
      - ASCENDING_PRICE
    enable-text: ' #F27438➜ %sorting%'
    disable-text: ' #76CDCD➜ %sorting%'
    loading-item:
      material: HOPPER
      name: "#2CCED2<bold>sᴏʀᴛ ᴛʏᴘᴇ"
      lore:
        - "#8c8c8c• #ff3535Loading, please wait"
    slot: 52
    item:
      material: HOPPER
      name: "#2CCED2<bold>sᴏʀᴛ ᴛʏᴘᴇ"
      lore:
        - "#92ffffAvailable sort types:"
        - "%DECREASING_DATE%"
        - "%DECREASING_PRICE%"
        - "%ASCENDING_DATE%"
        - "%ASCENDING_PRICE%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto change the sort type"
```

## Boutons Utilisés

| Bouton | Type | Description |
|--------|------|-------------|
| `displayItems` | [`ZAUCTIONHOUSE_LISTED_ITEMS`](./buttons#zauctionhouse_listed_items) | Affiche les objets en vente |
| `categories` | `inventory` | Ouvre le menu des catégories |
| `expired-items` | [`ZAUCTIONHOUSE_EXPIRED_INVENTORY`](./buttons#zauctionhouse_expired_inventory) | Ouvre les objets expirés |
| `purchased-items` | [`ZAUCTIONHOUSE_PURCHASED_INVENTORY`](./buttons#zauctionhouse_purchased_inventory) | Ouvre les objets achetés |
| `selling-items` | [`ZAUCTIONHOUSE_SELLING_INVENTORY`](./buttons#zauctionhouse_selling_inventory) | Ouvre les objets en vente |
| `previous` | `PREVIOUS` | Page précédente |
| `next` | `NEXT` | Page suivante |
| `search` | [`ZAUCTIONHOUSE_SEARCH`](./buttons#zauctionhouse_search) | Rechercher des objets |
| `clear-search` | [`ZAUCTIONHOUSE_CLEAR_SEARCH`](./buttons#zauctionhouse_clear_search) | Effacer la recherche active |
| `informations` | (statique) | Affichage des informations |
| `change-sort` | [`ZAUCTIONHOUSE_CHANGE_SORT`](./buttons#zauctionhouse_change_sort) | Sélecteur de tri |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Numéro de la page actuelle |
| `%max-page%` | Nombre total de pages |
| `%zauctionhouse_category_name%` | Nom de la catégorie actuelle |
| `%zauctionhouse_listed_items%` | Nombre total d'objets en vente |
| `%zauctionhouse_sorting_name%` | Nom du type de tri actuel |
| `%expired-items%` | Nombre d'objets expirés du joueur |
| `%purchased-items%` | Nombre d'objets achetés du joueur |
| `%selling-items%` | Nombre d'objets en vente du joueur |
| `%s%` | Suffixe de pluralisation |
| `%search_query%` | Requête de recherche actuelle |
| `%search_active%` | Indique si une recherche est active |
