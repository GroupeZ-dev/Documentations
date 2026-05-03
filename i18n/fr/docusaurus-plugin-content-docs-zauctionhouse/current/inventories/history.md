---
sidebar_position: 8
title: Historique
description: Configuration de l'inventaire de l'historique des ventes
---

# Inventaire de l'Historique

L'inventaire de l'historique affiche les ventes terminées du joueur. C'est une vue en lecture seule montrant tous les objets que le joueur a vendus.

**Fichier :** `plugins/zAuctionHouse/inventories/history.yml`

**Accès :** `/ah history`

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/history.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Fonctionnalités

- Voir tous les objets que vous avez vendus
- Voir qui a acheté chaque objet et quand
- Trier par date, prix ou nom de l'acheteur
- Les données historiques sont conservées selon la configuration

## Configuration par Défaut

```yaml
name: '#0c1719Sales History (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_HISTORY_ITEMS
    loading-slot: 22
    slots:
      - 9-17
      - 18-26
      - 27-35
      - 36-44
    item:
      material: BARRIER
      name: "#ff0000Loading..."
    else:
      slots:
        - 22
      item:
        material: BARRIER
        name: '#ff0000&nNo Sales Found'
        lore:
          - ''
          - '&7You have not sold any items yet.'

  sort:
    type: ZAUCTIONHOUSE_HISTORY_SORT
    slot: 51
    enable-text: ' #F27438➜ %sorting%'
    disable-text: ' #76CDCD➜ %sorting%'
    sorts:
      - DATE_DESC
      - DATE_ASC
      - PRICE_DESC
      - PRICE_ASC
      - BUYER_ASC
      - BUYER_DESC
    sort-names:
      DATE_DESC: "Newest First"
      DATE_ASC: "Oldest First"
      PRICE_DESC: "Highest Price"
      PRICE_ASC: "Lowest Price"
      BUYER_ASC: "Buyer A-Z"
      BUYER_DESC: "Buyer Z-A"
    item:
      material: HOPPER
      name: "#2CCED2<bold>sᴏʀᴛ"
      lore:
        - "#92ffffAvailable sort types:"
        - "%DATE_DESC%"
        - "%DATE_ASC%"
        - "%PRICE_DESC%"
        - "%PRICE_ASC%"
        - "%BUYER_ASC%"
        - "%BUYER_DESC%"
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto change the sort type"
```

## Boutons Utilisés

| Bouton | Type | Description |
|--------|------|-------------|
| `items` | [`ZAUCTIONHOUSE_HISTORY_ITEMS`](./buttons#zauctionhouse_history_items) | Affiche l'historique des ventes |
| `sort` | [`ZAUCTIONHOUSE_HISTORY_SORT`](./buttons#zauctionhouse_history_sort) | Change l'ordre de tri |

## Patterns Utilisés

| Pattern | Description |
|---------|-------------|
| `zauctionhouse-decoration` | Bordures en vitres colorées |
| `zauctionhouse-pagination` | Boutons page précédente/suivante |
| `zauctionhouse-back` | Bouton retour |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Numéro de la page actuelle |
| `%max-page%` | Nombre total de pages |

## Options de Tri

| Tri | Description |
|-----|-------------|
| `DATE_DESC` | Ventes les plus récentes en premier |
| `DATE_ASC` | Ventes les plus anciennes en premier |
| `PRICE_DESC` | Prix le plus élevé en premier |
| `PRICE_ASC` | Prix le plus bas en premier |
| `BUYER_ASC` | Nom de l'acheteur A-Z |
| `BUYER_DESC` | Nom de l'acheteur Z-A |

## État de Chargement

L'inventaire de l'historique charge les données de manière asynchrone. Pendant le chargement :
- Le `loading-slot` affiche le placeholder de chargement
- Une fois chargés, les objets sont affichés normalement
- La configuration `else` est affichée quand aucun historique n'existe
