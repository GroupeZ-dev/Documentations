---
sidebar_position: 3
title: Commandes & Permissions
description: Liste complète des commandes et permissions pour zAuctionHouse V4
---

# Commandes & Permissions

Cette page liste toutes les commandes et permissions disponibles dans zAuctionHouse V4.

## Commande principale

La commande principale est `/zauctionhouse` avec les alias par défaut suivants :
- `/ah` - Court et courant
- `/hdv` - Abréviation française (Hôtel des Ventes)
- `/auction` - Nom anglais complet
- `/zauction` - Version préfixée du plugin

:::info
Vous pouvez personnaliser les alias dans `config.yml` sous `commands.main-command.aliases`. Un redémarrage du serveur est requis après la modification des alias de commandes.
:::

## Commandes joueur

| Commande | Description | Permission |
|----------|-------------|------------|
| `/ah` | Ouvrir l'hôtel des ventes | `zauctionhouse.use` |
| `/ah sell <prix> [quantité] [économie]` | Vendre l'objet en main | `zauctionhouse.sell` |
| `/ah claim` | Récupérer l'argent des ventes | - |
| `/ah page <numéro>` | Ouvrir l'hôtel des ventes à une page spécifique | - |
| `/ah selling` | Voir vos objets actuellement en vente | `zauctionhouse.selling` |
| `/ah expired` | Voir vos objets expirés | `zauctionhouse.expired` |
| `/ah purchased` | Voir les objets que vous avez achetés | `zauctionhouse.purchased` |
| `/ah history` | Voir votre historique de ventes | `zauctionhouse.history` |

### Détails de la commande Sell

```bash
/ah sell <prix> [quantité] [économie]
```

**Arguments :**
- `<prix>` - Le prix par objet (requis). Supporte les multiplicateurs : `1K`, `2.5M`, `1B`, etc.
- `[quantité]` - Nombre d'objets à vendre de votre pile (optionnel, par défaut la pile complète)
- `[économie]` - Quelle économie utiliser (optionnel, par défaut l'économie configurée)

**Exemples :**
```bash
# Vendre l'objet en main pour 1000
/ah sell 1000

# Vendre 32 objets pour 5000 chacun
/ah sell 5000 32

# Vendre en utilisant une économie spécifique
/ah sell 10000 64 vault
```

### Mode vente d'inventaire

Si `enable-sell-inventory` est défini sur `true` dans la config, exécuter `/ah sell` sans arguments ouvre une interface où les joueurs peuvent :
- Sélectionner des objets de leur inventaire
- Définir le prix
- Choisir l'économie

## Commandes admin

| Commande | Description | Permission |
|----------|-------------|------------|
| `/ah reload` | Recharger tous les fichiers de configuration | `zauctionhouse.reload` |
| `/ah admin` | Accéder aux outils admin | `zauctionhouse.admin` |
| `/ah admin generate <quantité>` | Générer des objets factices pour les tests | `zauctionhouse.admin` |
| `/ah admin open <type> <joueur>` | Voir les objets/historique d'un joueur | `zauctionhouse.admin` |
| `/ah admin add <joueur> <type>` | Ajouter des objets au compte d'un joueur | `zauctionhouse.admin.items` |
| `/ah admin cache show <joueur>` | Afficher les données de cache d'un joueur | `zauctionhouse.admin` |
| `/ah admin cache clear <joueur> [clé]` | Effacer le cache d'un joueur | `zauctionhouse.admin` |
| `/ah admin cache set <joueur> <clé> <valeur>` | Définir une valeur de cache | `zauctionhouse.admin` |
| `/ah admin migrate <source> confirm` | Migrer des données d'autres plugins | `zauctionhouse.admin` |

### Types d'ouverture admin

Le paramètre `<type>` pour `/ah admin open` accepte :
- `selling` - Voir les annonces actives du joueur
- `expired` - Voir les objets expirés du joueur
- `purchased` - Voir les objets achetés du joueur
- `history` - Voir l'historique des ventes du joueur

**Exemple :**
```bash
/ah admin open selling Steve
```

### Migration

Migrer des données d'autres plugins d'hôtel des ventes :

```bash
/ah admin migrate zauctionhousev3 confirm
```

Sources supportées :
- `zauctionhousev3` (alias : `zah`, `zahv3`, `v3`)

:::warning
Sauvegardez toujours vos données avant de migrer ! La migration ne peut pas être annulée.
:::

## Permissions

### Permissions de base

| Permission | Description | Par défaut |
|------------|-------------|------------|
| `zauctionhouse.use` | Accéder à l'hôtel des ventes | true |
| `zauctionhouse.sell` | Vendre des objets sur l'hôtel des ventes | true |
| `zauctionhouse.selling` | Voir vos objets en vente | true |
| `zauctionhouse.expired` | Voir vos objets expirés | true |
| `zauctionhouse.purchased` | Voir les objets achetés | true |
| `zauctionhouse.history` | Voir l'historique des ventes | true |
| `zauctionhouse.reload` | Recharger les configurations | op |
| `zauctionhouse.admin` | Accéder aux fonctionnalités admin | op |
| `zauctionhouse.admin.items` | Ajouter/retirer des objets en tant qu'admin | op |
| `zauctionhouse.admin.remove-inventory` | Retirer des objets de la vente via l'interface | op |

### Permissions de limite d'objets

Contrôlez combien d'objets un joueur peut mettre en vente simultanément. Configurez dans `config.yml` :

```yaml
permissions:
  auction:
    - permission: zauctionhouse.max.5
      limit: 5
    - permission: zauctionhouse.max.10
      limit: 10
    - permission: zauctionhouse.max.15
      limit: 15
```

Le plugin utilise la limite de permission la plus élevée que le joueur possède.

| Permission | Limite |
|------------|--------|
| `zauctionhouse.max.5` | 5 objets |
| `zauctionhouse.max.10` | 10 objets |
| `zauctionhouse.max.15` | 15 objets |

### Permissions de temps d'expiration

Contrôlez les temps d'expiration personnalisés pour les objets listés. Configurez dans `config.yml` :

```yaml
expiration:
  auction:
    default-expiration: 172800  # 2 jours en secondes
    permission:
      enable: true
      permissions:
        - permission: zauctionhouse.expiration.vip
          expiration: 3600      # 1 heure
        - permission: zauctionhouse.expiration.elite
          expiration: 7200      # 2 heures
        - permission: zauctionhouse.expiration.legend
          expiration: 259200    # 3 jours
```

| Permission | Durée |
|------------|-------|
| `zauctionhouse.expiration.vip` | 1 heure |
| `zauctionhouse.expiration.elite` | 2 heures |
| `zauctionhouse.expiration.legend` | 3 jours |

### Permissions de taxe

Contrôlez les taux de taxe pour les joueurs. Configurez dans `economies.yml` :

| Permission | Description |
|------------|-------------|
| `zauctionhouse.tax.bypass` | Contourner complètement toutes les taxes |
| `zauctionhouse.tax.vip` | Réduction de taxe de 50% |
| `zauctionhouse.tax.premium` | Réduction de taxe de 25% |
| `zauctionhouse.tax.member` | Réduction de taxe de 10% |

### Permissions d'économie

Si vous utilisez plusieurs économies, contrôlez l'accès par économie :

| Permission | Description |
|------------|-------------|
| `zauctionhouse.economy.<nom>` | Utiliser une économie spécifique |

Remplacez `<nom>` par le nom de votre économie (ex: `vault`, `playerpoints`).

## Configuration des alias de commandes

Configurez les alias de commandes dans `config.yml` :

```yaml
commands:
  main-command:
    aliases:
      - ah
      - hdv
      - auction
      - zauction

  sell:
    aliases:
      - sell
      - s
      - vendre

  claim:
    aliases:
      - claim
      - c
      - recuperer

  page:
    aliases:
      - page
      - p
```

## Multiplicateurs de prix

Les joueurs peuvent utiliser une notation abrégée pour les grands prix :

| Suffixe | Multiplicateur |
|---------|----------------|
| `K` | 1 000 |
| `M` | 1 000 000 |
| `B` | 1 000 000 000 |
| `T` | 1 000 000 000 000 |
| `Q` | 1 000 000 000 000 000 |

**Exemples :**
```bash
/ah sell 1K      # = 1 000
/ah sell 2.5M    # = 2 500 000
/ah sell 1.5B    # = 1 500 000 000
```

## Exemples de permissions

### LuckPerms

Donner au groupe VIP 15 emplacements d'objets et l'expiration legend :

```bash
/lp group vip permission set zauctionhouse.max.15 true
/lp group vip permission set zauctionhouse.expiration.legend true
/lp group vip permission set zauctionhouse.tax.vip true
```

### Exemple de configuration de groupe

```yaml
# Groupe VIP
permissions:
  - zauctionhouse.max.15
  - zauctionhouse.expiration.legend
  - zauctionhouse.tax.vip

# Groupe Staff
permissions:
  - zauctionhouse.admin
  - zauctionhouse.reload
  - zauctionhouse.admin.items
```
