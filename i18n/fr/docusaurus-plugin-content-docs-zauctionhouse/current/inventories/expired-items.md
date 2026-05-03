---
sidebar_position: 5
title: Objets Expirés
description: Configuration de l'inventaire des objets expirés
---

# Inventaire des Objets Expirés

L'inventaire des objets expirés affiche les objets dont la durée de vente a expiré sans avoir été vendus. Les joueurs peuvent récupérer ces objets dans leur inventaire.

**Fichier :** `plugins/zAuctionHouse/inventories/expired-items.yml`

**Accès :** `/ah expired` ou cliquez sur le bouton "Objets Expirés" dans les enchères principales

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/expired.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Cycle de Vie des Objets

1. Les objets mis en vente ont un temps d'expiration (configuré dans `config.yml`)
2. Lorsque le temps expire, les objets sont déplacés vers l'inventaire des objets expirés
3. Les joueurs peuvent récupérer les objets expirés en cliquant dessus
4. Les objets expirés ont une seconde expiration (par défaut : 1 semaine) avant suppression définitive

## Configuration par Défaut

```yaml
name: '#0c1719Expired items (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_EXPIRED_ITEMS
    empty-slot: 22
    slots:
      - 9-17
      - 18-26
      - 27-35
      - 36-44
    item:
      material: BARRIER
      name: '#ff0000&nNo items found'
```

## Boutons Utilisés

| Bouton | Type | Description |
|--------|------|-------------|
| `items` | [`ZAUCTIONHOUSE_EXPIRED_ITEMS`](./buttons#zauctionhouse_expired_items) | Affiche les objets expirés |

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

## Actions au Clic

Lorsqu'un joueur clique sur un objet expiré :
- L'objet est renvoyé dans l'inventaire du joueur
- Si l'inventaire du joueur est plein, l'objet reste dans les objets expirés
