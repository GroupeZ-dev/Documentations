---
sidebar_position: 6
title: Objets Achetes
description: Configuration de l'inventaire des objets achetes
---

# Inventaire des Objets Achetes

L'inventaire des objets achetes affiche les objets que le joueur a achetes mais n'a pas encore recuperes.

**Fichier :** `plugins/zAuctionHouse/inventories/purchased-items.yml`

**Acces :** `/ah purchased` ou cliquer sur le bouton "Objets Achetes" dans l'hotel des ventes principal

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/purchased-items.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Comportement de livraison des objets

Le comportement depend de `give-item` dans `config.yml` :
- **`give-item: true`** - Les objets vont directement dans l'inventaire du joueur (si de l'espace est disponible)
- **`give-item: false`** - Les objets vont toujours dans cet inventaire pour une recuperation manuelle

Les objets ici ont egalement un delai d'expiration avant suppression definitive.

## Configuration par defaut

```yaml
name: '#0c1719Purchased items (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_PURCHASED_ITEMS
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

## Boutons utilises

| Bouton | Type | Description |
|--------|------|-------------|
| `items` | [`ZAUCTIONHOUSE_PURCHASED_ITEMS`](./buttons#zauctionhouse_purchased_items) | Affiche les objets achetes |

## Motifs utilises

| Motif | Description |
|-------|-------------|
| `zauctionhouse-decoration` | Bordures en vitres |
| `zauctionhouse-pagination` | Boutons page precedente/suivante |
| `zauctionhouse-back` | Bouton retour |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Numero de la page actuelle |
| `%max-page%` | Nombre total de pages |

## Actions au clic

Lorsqu'un joueur clique sur un objet achete :
- L'objet est ajoute a l'inventaire du joueur
- Si l'inventaire du joueur est plein, l'objet reste non recupere
