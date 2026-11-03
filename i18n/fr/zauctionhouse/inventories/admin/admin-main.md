---
title: Admin Principal
description: Configuration de l'inventaire annuaire des joueurs admin
---

# Admin Principal

L'inventaire admin principal est l'annuaire des joueurs de l'interface d'administration. Il liste tous les joueurs ayant une activité d'enchères et permet aux administrateurs d'accéder directement à l'historique d'un joueur sans devoir taper son nom.

**Fichier :** `plugins/zAuctionHouse/inventories/admin/admin-main.yml`

**Accès :**
- `/ah admin` (sans argument)
- `/ah admin history` (sans argument joueur)
- N'importe quel bouton [`ZAUCTIONHOUSE_ADMIN_MAIN`](../buttons#boutons-administrateur), par exemple le bouton **Tous les joueurs** de l'inventaire [admin historique principal](./admin-history)

**Permission :** `zauctionhouse.admin.items` (`/ah admin` nécessite aussi `zauctionhouse.admin`)

## Fonctionnalités

- Une entrée par joueur ayant une activité d'enchères (annonces, achats, logs ou transactions)
- Nombre d'annonces actuellement en vente, de ventes et d'achats pour chaque joueur
- Quatre modes de tri : nom, en vente, vendus, achetés
- Cliquer sur un joueur ouvre son inventaire [admin historique principal](./admin-history)
- Bouton d'actualisation pour recharger les données

<CalloutContainer type="info">

<CalloutDescription>
Les données sont chargées de manière asynchrone avec une seule requête SQL, sans charger le contenu des objets. À chaque ouverture de l'inventaire (commande ou bouton `ZAUCTIONHOUSE_ADMIN_MAIN`), les données sont rechargées depuis la base de données.
</CalloutDescription>

</CalloutContainer>

## Configuration par Défaut

```yaml
# Admin player directory. Counts are auction listings/lots, including historical purchases.
name: "#0c1719Administration des joueurs"
size: 54
patterns:
  - zauctionhouse-pagination
items:
  players:
    type: ZAUCTIONHOUSE_ADMIN_PLAYERS
    slots:
      - 0-44
    item:
      material: PLAYER_HEAD
      player-head: "%target%"
      name: "#2CCED2%target%"
      lore:
        - "#92ffffEn vente: #2CCED2%listed%"
        - "#92ffffVendus: #2CCED2%sold%"
        - "#92ffffAchetés: #2CCED2%purchased%"
        - ""
        - "#92ffffCliquez pour consulter son historique"
    else:
      item:
        material: BARRIER
        name: "#ff5555Aucun historique"
      slot: 22
  sort:
    type: ZAUCTIONHOUSE_ADMIN_PLAYERS_SORT
    slot: 49
    item:
      material: HOPPER
      name: "#2CCED2Trier les joueurs"
      lore:
        - "%name-color%• Nom"
        - "%listed-color%• En vente (décroissant)"
        - "%sold-color%• Vendus (décroissant)"
        - "%purchased-color%• Achetés (décroissant)"
        - "#8c8c8cClic gauche / droit pour changer"
  refresh:
    type: ZAUCTIONHOUSE_ADMIN_MAIN
    slot: 45
    item:
      material: SUNFLOWER
      name: "#2CCED2Actualiser"
```

## Boutons Utilisés

| Bouton | Type | Description |
|--------|------|-------------|
| `players` | [`ZAUCTIONHOUSE_ADMIN_PLAYERS`](../buttons#boutons-administrateur) | Liste paginée des joueurs ayant une activité d'enchères. Un clic ouvre l'historique admin du joueur |
| `sort` | [`ZAUCTIONHOUSE_ADMIN_PLAYERS_SORT`](../buttons#boutons-administrateur) | Change l'ordre de tri de la liste des joueurs |
| `refresh` | [`ZAUCTIONHOUSE_ADMIN_MAIN`](../buttons#boutons-administrateur) | Recharge les données et rouvre l'annuaire |

### ZAUCTIONHOUSE_ADMIN_PLAYERS

Bouton paginé qui affiche un objet par joueur (utilisez `PLAYER_HEAD` avec `player-head: "%target%"` pour afficher la tête du joueur). Les contrôles de pagination proviennent du pattern `zauctionhouse-pagination`.

Lorsqu'aucun joueur n'a d'activité d'enchères, le bouton `else` est affiché à la place (par défaut une `BARRIER` au slot 22).

Cliquer sur une entrée ouvre l'inventaire [admin historique principal](./admin-history) de ce joueur, comme `/ah admin history <joueur>`.

### ZAUCTIONHOUSE_ADMIN_PLAYERS_SORT

Fait défiler les modes de tri :

| Clic | Action |
|------|--------|
| Clic gauche | Mode de tri suivant |
| Clic droit | Mode de tri précédent |

| Mode de tri | Ordre |
|-------------|-------|
| Nom | Alphabétique (A-Z, insensible à la casse) |
| En vente | Nombre d'annonces en vente, décroissant |
| Vendus | Nombre de ventes, décroissant |
| Achetés | Nombre d'achats, décroissant |

Les joueurs ayant la même valeur sont triés par nom. Le mode de tri par défaut est **Nom**.

### ZAUCTIONHOUSE_ADMIN_MAIN

Ouvre l'inventaire admin principal et recharge ses données. Dans `admin-main.yml`, il sert de bouton **Actualiser** ; dans `admin-history-main.yml`, il sert de bouton **Tous les joueurs** pour revenir à l'annuaire :

```yaml
  players:
    type: ZAUCTIONHOUSE_ADMIN_MAIN
    slot: 49
    item:
      material: BOOK
      name: "#2CCED2Tous les joueurs"
```

## Placeholders

### Entrée joueur (`ZAUCTIONHOUSE_ADMIN_PLAYERS`)

| Placeholder | Description |
|-------------|-------------|
| `%target%` | Nom du joueur |
| `%listed%` | Nombre d'annonces actuellement en vente et non expirées |
| `%sold%` | Nombre de logs `PURCHASE` où le joueur est le vendeur |
| `%purchased%` | Nombre de logs `PURCHASE` où le joueur est l'acheteur (inclut les achats historiques) |

### Bouton de tri (`ZAUCTIONHOUSE_ADMIN_PLAYERS_SORT`)

| Placeholder | Description |
|-------------|-------------|
| `%name-color%` | `#2CCED2` si le tri par nom est actif, `#8c8c8c` sinon |
| `%listed-color%` | `#2CCED2` si le tri par objets en vente est actif, `#8c8c8c` sinon |
| `%sold-color%` | `#2CCED2` si le tri par objets vendus est actif, `#8c8c8c` sinon |
| `%purchased-color%` | `#2CCED2` si le tri par objets achetés est actif, `#8c8c8c` sinon |

<CalloutContainer type="info">

<CalloutDescription>
Ce fichier est créé automatiquement au démarrage s'il n'existe pas encore : les installations existantes le reçoivent sans devoir régénérer leurs inventaires.
</CalloutDescription>

</CalloutContainer>
