---
sidebar_position: 6
title: Admin Transactions
description: Configuration de l'inventaire admin des transactions
---

# Admin Transactions

L'inventaire admin des transactions affiche l'historique des transactions d'un joueur. Les transactions sont des enregistrements de ventes complétées avec les détails financiers.

**Fichier :** `plugins/zAuctionHouse/inventories/admin/admin-transactions.yml`

**Accès :** Depuis le menu principal de l'historique admin → Bouton Transactions

**Permission :** Nécessite la permission administrateur

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/admin-transactions.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Statut des Transactions

| Statut | Description |
|--------|-------------|
| `PENDING` | L'argent n'a pas encore été récupéré par le vendeur |
| `RETRIEVED` | L'argent a été récupéré/déposé au vendeur |

## Fonctionnalités

- Voir toutes les transactions complétées
- Filtrer par statut de transaction
- Filtrer par période
- Voir les informations acheteur/vendeur

## Configuration par Défaut

```yaml
name: '#0c1719Admin transactions (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_ADMIN_TRANSACTIONS
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

  filter-status:
    type: ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_STATUS
    slot: 47
    enable-text: ' #F27438➜ %status%'
    disable-text: ' #76CDCD➜ %status%'
    all-statuses-name: "All"
    statuses:
      - PENDING
      - RETRIEVED
    status-names:
      PENDING: "Pending"
      RETRIEVED: "Retrieved"
    item:
      material: HOPPER
      name: '#2CCED2<bold>ғɪʟᴛᴇʀ ʙʏ sᴛᴀᴛᴜs'
      lore:
        - '#92ffffAvailable statuses:'
        - '%ALL%'
        - '%PENDING%'
        - '%RETRIEVED%'
        - ''
        - '#8c8c8c• #2CCED2Click #92ffffto change the filter status'

  filter-date:
    type: ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_DATE
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
| `items` | [`ZAUCTIONHOUSE_ADMIN_TRANSACTIONS`](../buttons#admin-buttons) | Affiche les entrées de transaction |
| `filter-status` | [`ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_STATUS`](../buttons#admin-buttons) | Filtre par statut |
| `filter-date` | [`ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_DATE`](../buttons#admin-buttons) | Filtre par période |

## Filtres de Date

| Filtre | Description |
|--------|-------------|
| `ALL` | Toute période |
| `TODAY` | Aujourd'hui uniquement |
| `THIS_WEEK` | Les 7 derniers jours |
| `THIS_MONTH` | Les 30 derniers jours |
| `THIS_YEAR` | Les 365 derniers jours |
