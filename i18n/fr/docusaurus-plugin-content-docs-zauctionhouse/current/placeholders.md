---
sidebar_position: 4
title: Placeholders
description: Placeholders PlaceholderAPI pour zAuctionHouse
---

# Placeholders

zAuctionHouse fournit des placeholders PlaceholderAPI utilisables dans les scoreboards, hologrammes, plugins de chat, et plus encore.

## Prérequis

Pour utiliser les placeholders, vous devez avoir [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installé sur votre serveur.

## Placeholders Globaux

Ces placeholders retournent les statistiques de l'hôtel des ventes à l'échelle du serveur :

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_total_items%` | Nombre total d'objets actuellement en vente |
| `%zauctionhouse_total_sales%` | Nombre total de ventes (historique complet) |
| `%zauctionhouse_total_value%` | Valeur totale de tous les objets en vente |
| `%zauctionhouse_items_sold_today%` | Objets vendus aujourd'hui |
| `%zauctionhouse_items_listed_today%` | Objets mis en vente aujourd'hui |

## Placeholders Joueur

Ces placeholders retournent des données spécifiques au joueur :

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_player_items_listed%` | Nombre d'objets que le joueur a en vente |
| `%zauctionhouse_player_items_sold%` | Total d'objets vendus par le joueur |
| `%zauctionhouse_player_items_purchased%` | Total d'objets achetés par le joueur |
| `%zauctionhouse_player_items_expired%` | Nombre d'objets expirés en attente |
| `%zauctionhouse_player_items_to_claim%` | Nombre d'objets achetés à récupérer |
| `%zauctionhouse_player_total_earned%` | Total d'argent gagné des ventes |
| `%zauctionhouse_player_total_spent%` | Total d'argent dépensé en achats |
| `%zauctionhouse_player_limit%` | Limite de mise en vente du joueur |
| `%zauctionhouse_player_limit_remaining%` | Emplacements de vente restants |

## Placeholders d'Affichage d'Objet

Ces placeholders sont utilisés en interne dans les configurations d'inventaire pour afficher les informations des objets :

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_item_seller%` | Nom du vendeur |
| `%zauctionhouse_item_seller_uuid%` | UUID du vendeur |
| `%zauctionhouse_item_price%` | Prix de l'objet (formaté) |
| `%zauctionhouse_item_price_raw%` | Prix de l'objet (nombre brut) |
| `%zauctionhouse_item_economy%` | Nom de l'économie utilisée |
| `%zauctionhouse_item_category%` | Catégorie de l'objet |
| `%zauctionhouse_item_expire_date%` | Date d'expiration |
| `%zauctionhouse_item_expire_time%` | Temps avant expiration |
| `%zauctionhouse_item_listed_date%` | Date de mise en vente |
| `%zauctionhouse_item_listed_ago%` | Temps depuis la mise en vente |

## Placeholders d'Économie

Pour les configurations multi-économies :

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_economy_<nom>_items%` | Objets en vente avec cette économie |
| `%zauctionhouse_economy_<nom>_total_value%` | Valeur totale dans cette économie |

Remplacez `<nom>` par le nom de votre économie (ex: `vault`, `playerpoints`).

## Placeholders de Catégorie

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_category_<nom>_items%` | Objets dans cette catégorie |
| `%zauctionhouse_category_<nom>_total_value%` | Valeur totale dans cette catégorie |

Remplacez `<nom>` par le nom de votre catégorie.

## Exemples d'Utilisation

### Scoreboard (avec le plugin TAB)

```yaml
scoreboard:
  lines:
    - "&6Hôtel des Ventes"
    - "&7Objets en vente: &f%zauctionhouse_player_items_listed%/%zauctionhouse_player_limit%"
    - "&7Expirés: &c%zauctionhouse_player_items_expired%"
    - "&7À récupérer: &a%zauctionhouse_player_items_to_claim%"
```

### Hologramme (avec DecentHolograms)

```
/dh create auction
/dh line add auction "&6&lHôtel des Ventes"
/dh line add auction "&7Objets Total: &f%zauctionhouse_total_items%"
/dh line add auction "&7Vendus Aujourd'hui: &a%zauctionhouse_items_sold_today%"
```

### Format de Chat (avec EssentialsX)

```yaml
format: '{DISPLAYNAME} &7[HDV: {zauctionhouse_player_items_listed}] &f{MESSAGE}'
```

### Lore d'Inventaire (dans les inventaires zMenu)

```yaml
items:
  info:
    slot: 4
    item:
      material: BOOK
      name: "&6Vos Statistiques"
      lore:
        - "&7Objets en vente: &f%zauctionhouse_player_items_listed%"
        - "&7Total vendus: &a%zauctionhouse_player_items_sold%"
        - "&7Total achetés: &b%zauctionhouse_player_items_purchased%"
        - "&7Total gagné: &6%zauctionhouse_player_total_earned%"
```

## Actualisation des Placeholders

Les placeholders sont mis en cache pour les performances. Le cache s'actualise :
- Toutes les 30 secondes pour les placeholders globaux
- À la demande pour les placeholders joueur

Vous pouvez configurer la durée du cache dans `config.yml` :

```yaml
placeholders:
  cache-duration: 30 # secondes
```

## Dépannage

### Les placeholders ne fonctionnent pas

1. Assurez-vous que PlaceholderAPI est installé : `/papi list`
2. Vérifiez que l'expansion est enregistrée : `/papi ecloud list installed`
3. Essayez de recharger : `/papi reload`

### Les placeholders s'affichent en texte

Si les placeholders apparaissent en texte brut (ex: `%zauctionhouse_total_items%`) :
- Le plugin utilisant le placeholder peut ne pas supporter PlaceholderAPI
- Essayez d'envelopper avec `%papi_...%` dans certains plugins
- Consultez la documentation du plugin pour le support PlaceholderAPI
