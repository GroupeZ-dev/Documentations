---
sidebar_position: 3
title: Commandes & Permissions
description: Liste complète des commandes et permissions pour zAuctionHouse
---

# Commandes & Permissions

Cette page liste toutes les commandes et permissions disponibles dans zAuctionHouse.

## Commandes

### Commandes Joueur

| Commande | Description | Permission |
|----------|-------------|------------|
| `/ah` | Ouvrir l'hôtel des ventes | `zauctionhouse.use` |
| `/ah sell <prix>` | Vendre l'objet dans votre main | `zauctionhouse.sell` |
| `/ah sell <prix> <quantité>` | Vendre une quantité spécifique | `zauctionhouse.sell` |
| `/ah selling` | Voir vos objets en vente | `zauctionhouse.selling` |
| `/ah expired` | Voir vos objets expirés | `zauctionhouse.expired` |
| `/ah purchased` | Voir les objets achetés | `zauctionhouse.purchased` |
| `/ah search <requête>` | Rechercher des objets | `zauctionhouse.search` |
| `/ah category <nom>` | Ouvrir une catégorie spécifique | `zauctionhouse.category` |

### Commandes Admin

| Commande | Description | Permission |
|----------|-------------|------------|
| `/ah admin reload` | Recharger les configurations | `zauctionhouse.admin.reload` |
| `/ah admin clear` | Supprimer tous les objets | `zauctionhouse.admin.clear` |
| `/ah admin remove <joueur>` | Supprimer les objets d'un joueur | `zauctionhouse.admin.remove` |
| `/ah admin expire <joueur>` | Expirer les objets d'un joueur | `zauctionhouse.admin.expire` |
| `/ah admin stats` | Voir les statistiques | `zauctionhouse.admin.stats` |
| `/ah admin database` | Voir les infos de la base de données | `zauctionhouse.admin.database` |

## Permissions

### Permissions de Base

| Permission | Description | Par Défaut |
|------------|-------------|------------|
| `zauctionhouse.use` | Accéder à l'hôtel des ventes | true |
| `zauctionhouse.sell` | Vendre des objets | true |
| `zauctionhouse.selling` | Voir vos objets en vente | true |
| `zauctionhouse.expired` | Voir vos objets expirés | true |
| `zauctionhouse.purchased` | Voir les objets achetés | true |
| `zauctionhouse.search` | Rechercher des objets | true |
| `zauctionhouse.category` | Utiliser les catégories | true |

### Permissions Admin

| Permission | Description | Par Défaut |
|------------|-------------|------------|
| `zauctionhouse.admin` | Accès à toutes les commandes admin | op |
| `zauctionhouse.admin.reload` | Recharger les configurations | op |
| `zauctionhouse.admin.clear` | Supprimer tous les objets | op |
| `zauctionhouse.admin.remove` | Supprimer les objets d'un joueur | op |
| `zauctionhouse.admin.expire` | Expirer les objets d'un joueur | op |
| `zauctionhouse.admin.stats` | Voir les statistiques | op |
| `zauctionhouse.admin.database` | Voir les infos de la base de données | op |
| `zauctionhouse.admin.bypass` | Contourner toutes les restrictions | op |

### Permissions de Limite d'Objets

Contrôlez combien d'objets un joueur peut mettre en vente simultanément :

| Permission | Limite |
|------------|--------|
| `zauctionhouse.limit.5` | 5 objets |
| `zauctionhouse.limit.10` | 10 objets |
| `zauctionhouse.limit.25` | 25 objets |
| `zauctionhouse.limit.50` | 50 objets |
| `zauctionhouse.limit.100` | 100 objets |
| `zauctionhouse.limit.unlimited` | Pas de limite |

Le plugin utilise la permission de limite la plus élevée dont dispose le joueur. Configurez les limites par défaut dans `config.yml` :

```yaml
limits:
  default: 10
  # Limites basées sur les permissions
  permissions:
    - permission: zauctionhouse.limit.5
      limit: 5
    - permission: zauctionhouse.limit.10
      limit: 10
    - permission: zauctionhouse.limit.25
      limit: 25
    - permission: zauctionhouse.limit.50
      limit: 50
    - permission: zauctionhouse.limit.100
      limit: 100
    - permission: zauctionhouse.limit.unlimited
      limit: -1
```

### Permissions de Durée d'Expiration

Contrôlez les durées d'expiration personnalisées pour les objets en vente :

| Permission | Durée |
|------------|-------|
| `zauctionhouse.expire.1h` | 1 heure |
| `zauctionhouse.expire.6h` | 6 heures |
| `zauctionhouse.expire.12h` | 12 heures |
| `zauctionhouse.expire.1d` | 1 jour |
| `zauctionhouse.expire.3d` | 3 jours |
| `zauctionhouse.expire.7d` | 7 jours |
| `zauctionhouse.expire.14d` | 14 jours |
| `zauctionhouse.expire.30d` | 30 jours |

Configurez dans `config.yml` :

```yaml
expiration:
  default: 7d
  # Durées d'expiration basées sur les permissions
  permissions:
    - permission: zauctionhouse.expire.1h
      duration: 1h
    - permission: zauctionhouse.expire.6h
      duration: 6h
    - permission: zauctionhouse.expire.12h
      duration: 12h
    - permission: zauctionhouse.expire.1d
      duration: 1d
    - permission: zauctionhouse.expire.3d
      duration: 3d
    - permission: zauctionhouse.expire.7d
      duration: 7d
    - permission: zauctionhouse.expire.14d
      duration: 14d
    - permission: zauctionhouse.expire.30d
      duration: 30d
```

### Permissions de Contournement

| Permission | Description |
|------------|-------------|
| `zauctionhouse.bypass.limit` | Contourner les limites de mise en vente |
| `zauctionhouse.bypass.cooldown` | Contourner les temps de recharge |
| `zauctionhouse.bypass.price` | Contourner les restrictions de prix min/max |
| `zauctionhouse.bypass.blacklist` | Contourner la liste noire d'objets |
| `zauctionhouse.bypass.tax` | Contourner les taxes |
| `zauctionhouse.bypass.world` | Contourner les restrictions de monde |

### Permissions d'Économie

Si vous utilisez plusieurs économies, contrôlez l'accès :

| Permission | Description |
|------------|-------------|
| `zauctionhouse.economy.vault` | Utiliser l'économie Vault |
| `zauctionhouse.economy.playerpoints` | Utiliser PlayerPoints |
| `zauctionhouse.economy.experience` | Utiliser l'expérience |
| `zauctionhouse.economy.levels` | Utiliser les niveaux |
| `zauctionhouse.economy.<nom>` | Utiliser une économie personnalisée |

## Alias de Commande

Vous pouvez configurer les alias de commande dans `config.yml` :

```yaml
commands:
  main:
    name: ah
    aliases:
      - auctionhouse
      - auction
      - hdv
```

## Exemples de Permissions

### LuckPerms

Donner à un groupe VIP 50 emplacements et 14 jours d'expiration :

```
/lp group vip permission set zauctionhouse.limit.50 true
/lp group vip permission set zauctionhouse.expire.14d true
```

### PermissionsEx

```yaml
groups:
  vip:
    permissions:
      - zauctionhouse.limit.50
      - zauctionhouse.expire.14d
```

### GroupManager

```yaml
groups:
  vip:
    permissions:
      - zauctionhouse.limit.50
      - zauctionhouse.expire.14d
```
