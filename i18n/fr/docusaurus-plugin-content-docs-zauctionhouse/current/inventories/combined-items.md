---
sidebar_position: 15
title: Items Combinés
description: Inventaire combiné affichant les items en vente, expirés et achetés ensemble
---

# Inventaire des Items Combinés

L'inventaire des items combinés fusionne plusieurs vues d'items (en vente, expirés, achetés) dans une seule liste paginée. Vous pouvez configurer quels types de stockage inclure.

**Fichier :** `plugins/zAuctionHouse/inventories/combined-items.yml`

## Fonctionnalités

- Combiner les items en vente, expirés et achetés dans une seule vue
- Chaque type d'item utilise sa propre configuration de lore (depuis la section `item-lore` de `config.yml`)
- L'action au clic s'adapte automatiquement au type de stockage de l'item :
  - **Items en vente** : retire/annule la mise en vente
  - **Items expirés** : récupère l'item
  - **Items achetés** : récupère l'item acheté
- Activation individuelle de chaque source avec `include-selling`, `include-expired`, `include-purchased`

## Configuration par Défaut

```yaml
name: '#0c1719Mes Items (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_COMBINED_ITEMS
    empty-slot: 22
    include-selling: true
    include-expired: true
    include-purchased: true
    slots:
      - 9-17
      - 18-26
      - 27-35
      - 36-44
    item:
      material: BARRIER
      name: '#ff0000&nAucun item trouvé'
```

## Boutons Utilisés

| Bouton | Type | Description |
|--------|------|-------------|
| `items` | [`ZAUCTIONHOUSE_COMBINED_ITEMS`](./buttons#zauctionhouse_combined_items) | Affiche les items combinés de plusieurs types de stockage |

## Patterns Utilisés

| Pattern | Description |
|---------|-------------|
| `zauctionhouse-decoration` | Bordures en vitres |
| `zauctionhouse-pagination` | Boutons page précédente/suivante |
| `zauctionhouse-back` | Bouton retour |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Numéro de page actuel |
| `%max-page%` | Nombre total de pages |

## Actions au Clic

L'action au clic s'adapte automatiquement en fonction du type de stockage de l'item :

| Type d'Item | Action au Clic |
|-------------|----------------|
| En vente (listing actif) | Retire/annule la mise en vente, l'item passe en expiré |
| Expiré | Récupère l'item dans l'inventaire du joueur |
| Acheté | Récupère l'item acheté dans l'inventaire du joueur |

## Options de Configuration

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `include-selling` | Booléen | `true` | Inclure les items actuellement en vente |
| `include-expired` | Booléen | `true` | Inclure les items expirés non vendus |
| `include-purchased` | Booléen | `true` | Inclure les items achetés mais non réclamés |
| `empty-slot` | Nombre | `-1` | Emplacement du placeholder "aucun item" (-1 pour désactiver) |

### Exemples

**Afficher uniquement les items expirés et achetés :**
```yaml
items:
  type: ZAUCTIONHOUSE_COMBINED_ITEMS
  include-selling: false
  include-expired: true
  include-purchased: true
  slots:
    - 9-17
    - 18-26
```

**Afficher uniquement les items en vente (équivalent à ZAUCTIONHOUSE_SELLING_ITEMS) :**
```yaml
items:
  type: ZAUCTIONHOUSE_COMBINED_ITEMS
  include-selling: true
  include-expired: false
  include-purchased: false
  slots:
    - 9-17
    - 18-26
```
