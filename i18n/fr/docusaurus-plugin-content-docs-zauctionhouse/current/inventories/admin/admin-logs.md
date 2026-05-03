---
sidebar_position: 5
title: Admin Logs
description: Configuration de l'inventaire des logs d'actions admin
---

# Admin Logs

L'inventaire des logs admin affiche tous les logs d'actions d'un joueur. Les logs enregistrent chaque action d'enchère : mise en vente, achat et retrait d'objets.

**Fichier :** `plugins/zAuctionHouse/inventories/admin/admin-logs.yml`

**Accès :** Depuis le menu principal de l'historique admin → Bouton Logs

**Permission :** Nécessite la permission administrateur

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/admin-logs.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Types de Logs

| Type | Description |
|------|-------------|
| `SALE` | L'objet a été mis en vente |
| `PURCHASE` | L'objet a été acheté |
| `REMOVE_LISTED` | L'objet a été retiré de l'annonce active |
| `REMOVE_SELLING` | L'objet a été récupéré de l'inventaire de vente |
| `REMOVE_EXPIRED` | L'objet a été récupéré de l'inventaire des expirés |
| `REMOVE_PURCHASED` | L'objet a été récupéré de l'inventaire des achats |

## Fonctionnalités

- Filtrer par type de log
- Filtrer par période
- Voir toutes les actions d'enchère d'un joueur

## Configuration par Défaut

```yaml
name: '#0c1719Admin logs (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_ADMIN_LOGS
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

  filter-type:
    type: ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_TYPE
    slot: 47
    enable-text: ' #F27438➜ %type%'
    disable-text: ' #76CDCD➜ %type%'
    all-types-name: "All"
    types:
      - SALE
      - PURCHASE
      - REMOVE_LISTED
      - REMOVE_SELLING
      - REMOVE_EXPIRED
      - REMOVE_PURCHASED
    type-names:
      SALE: "Sale"
      PURCHASE: "Purchase"
      REMOVE_LISTED: "Remove Listed"
      REMOVE_SELLING: "Remove Owned"
      REMOVE_EXPIRED: "Remove Expired"
      REMOVE_PURCHASED: "Remove Purchased"
    item:
      material: HOPPER
      name: '#2CCED2<bold>ғɪʟᴛᴇʀ ʙʏ ᴛʏᴘᴇ'
      lore:
        - '#92ffffAvailable types:'
        - '%ALL%'
        - '%SALE%'
        - '%PURCHASE%'
        - '%REMOVE_LISTED%'
        - '%REMOVE_SELLING%'
        - '%REMOVE_EXPIRED%'
        - '%REMOVE_PURCHASED%'
        - ''
        - '#8c8c8c• #2CCED2Click #92ffffto change the filter type'

  filter-date:
    type: ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_DATE
    slot: 51
    enable-text: ' #F27438➜ %date%'
    disable-text: ' #76CDCD➜ %date%'
    filters:
      - ALL
      - TODAY
      - THIS_WEEK
      - THIS_MONTH
      - THIS_YEAR
    filter-names:
      ALL: "All Time"
      TODAY: "Today"
      THIS_WEEK: "This Week"
      THIS_MONTH: "This Month"
      THIS_YEAR: "This Year"
    item:
      material: CLOCK
      name: '#2CCED2<bold>ғɪʟᴛᴇʀ ʙʏ ᴅᴀᴛᴇ'
      lore:
        - '#92ffffAvailable filters:'
        - '%ALL%'
        - '%TODAY%'
        - '%THIS_WEEK%'
        - '%THIS_MONTH%'
        - '%THIS_YEAR%'
        - ''
        - '#8c8c8c• #2CCED2Click #92ffffto change the date filter'
```

## Boutons Utilisés

| Bouton | Type | Description |
|--------|------|-------------|
| `items` | [`ZAUCTIONHOUSE_ADMIN_LOGS`](../buttons#admin-buttons) | Affiche les entrées de log |
| `filter-type` | [`ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_TYPE`](../buttons#admin-buttons) | Filtre par type de log |
| `filter-date` | [`ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_DATE`](../buttons#admin-buttons) | Filtre par période |

## Filtres de Date

| Filtre | Description |
|--------|-------------|
| `ALL` | Toute période |
| `TODAY` | Aujourd'hui uniquement |
| `THIS_WEEK` | Les 7 derniers jours |
| `THIS_MONTH` | Les 30 derniers jours |
| `THIS_YEAR` | Les 365 derniers jours |
