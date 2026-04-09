---
sidebar_position: 7
title: Objets en Vente
description: Configuration de l'inventaire de vos objets en vente
---

# Inventaire des Objets en Vente

L'inventaire des objets en vente affiche les objets que le joueur a actuellement mis en vente. Les joueurs peuvent retirer leurs annonces depuis cet inventaire.

**Fichier :** `plugins/zAuctionHouse/inventories/selling-items.yml`

**Acces :** `/ah selling` ou cliquer sur le bouton "Vos Objets" dans l'hotel des ventes principal

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/selling.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Fonctionnalites

- Voir toutes vos annonces actives
- Voir le temps restant avant expiration
- Retirer des objets de la vente (annuler l'annonce)
- Les objets ne sont pas achetables depuis cette vue (ce sont vos propres objets)

## Configuration par defaut

```yaml
name: '#0c1719Selling items (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_SELLING_ITEMS
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
| `items` | [`ZAUCTIONHOUSE_SELLING_ITEMS`](./buttons#zauctionhouse_selling_items) | Affiche les objets en vente |

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

Lorsqu'un joueur clique sur son propre objet en vente :
- Si `open-confirm-inventory` est `true` : Ouvre l'inventaire [Confirmation de Retrait](./remove-confirm)
- Si `open-confirm-inventory` est `false` : Retire l'objet directement

Lorsqu'un objet est retire :
- Il est deplace vers l'inventaire [Objets Expires](./expired-items)
- Le joueur peut le recuperer depuis cet inventaire
