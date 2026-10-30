---
title: Commandes & Permissions
description: Liste complète des commandes et permissions de l'addon zAuctionHouseStats
---

# Commandes & Permissions

Cette page liste toutes les commandes et permissions fournies par l'addon zAuctionHouseStats. L'addon possède sa propre commande, `/zahstats`, et ajoute également deux sous-commandes à la commande principale de zAuctionHouse (`/ah stats` et `/ah price`).

## Commande principale

La commande de l'addon est `/zahstats`, avec un alias :
- `/zahs` - Version courte

Exécuter `/zahstats` sans argument affiche l'aide (identique à `/zahstats help`). L'aide ne liste que les sous-commandes pour lesquelles vous avez la permission. Une sous-commande réservée aux joueurs est masquée lorsque l'aide est affichée dans la console.

<CalloutContainer type="info">

<CalloutDescription>
Les noms des sous-commandes sont insensibles à la casse. Chaque permission est vérifiée par l'addon : un joueur sans la permission reçoit le message `command-no-permission` de `messages.yml`. Une sous-commande réservée aux joueurs exécutée depuis la console envoie `command-no-console`. Si le nombre d'arguments est incorrect, l'addon envoie `command-syntax-error` avec la bonne syntaxe. Une sous-commande inconnue envoie `command-unknown`, suivi de l'aide si vous avez `zauctionhouse.stats.use`.
</CalloutDescription>

</CalloutContainer>

## Sous-commandes

| Commande | Alias | Description | Permission | Console |
|----------|-------|-------------|------------|---------|
| `/zahstats help` | - | Afficher l'aide | `zauctionhouse.stats.use` | Oui |
| `/zahstats top <metric> [period] [economy]` | - | Afficher un classement dans le chat | `zauctionhouse.stats.top` | Oui |
| `/zahstats player [name]` | - | Afficher les statistiques d'un joueur | `zauctionhouse.stats.player` | Oui (nom requis) |
| `/zahstats items [economy]` | - | Ouvrir l'explorateur des prix des objets | `zauctionhouse.stats.items` | Non |
| `/zahstats reload` | `rl` | Recharger la configuration, les messages et les menus | `zauctionhouse.stats.reload` | Oui |
| `/zahstats clearcache` | `cc` | Vider tous les caches de statistiques | `zauctionhouse.stats.clearcache` | Oui |
| `/zahstats import <v1\|v4logs> confirm` | - | Importer l'historique (tables V1 ou logs de zAuctionHouse) | `zauctionhouse.stats.import` | Oui |
| `/zahstats purge <days> confirm` | - | Supprimer les ventes de plus de N jours (les totaux journaliers sont conservés) | `zauctionhouse.stats.purge` | Oui |

La complétion automatique (tabulation) ne propose que les sous-commandes pour lesquelles vous avez la permission, puis les valeurs possibles de chaque argument (métriques, périodes, économies, joueurs en ligne, sources d'import, `confirm`).

Les descriptions affichées par `/zahstats help` et `/ah help` proviennent de la section `command-description` de `messages.yml` (clés `help`, `top`, `player`, `items`, `reload`, `clearcache`, `import`, `purge`, `ah-stats` et `ah-price`). Vous pouvez les modifier, et `/zahstats reload` applique le changement.

### Détails de la commande Top

```bash
/zahstats top <metric> [period] [economy]
```

Affiche le top 10 des joueurs pour une métrique dans le chat. Pour voir le classement complet, utilisez le menu de classement paginé (voir [Inventaires](/zauctionhouse/addons/stats/inventories)).

**Arguments :**
- `<metric>` - Le classement à afficher (requis). Accepte un alias court ou le nom complet de la métrique (insensible à la casse, `-` fonctionne à la place de `_`)
- `[period]` - La fenêtre de temps (optionnel, par défaut `all`)
- `[economy]` - Le nom de l'économie (optionnel, insensible à la casse)

**Métriques :**

| Alias court | Nom complet | Description | Métrique monétaire |
|-------------|-------------|-------------|--------------------|
| `sellers` | `top_sellers_money` | Argent gagné par les vendeurs, après taxes | Oui |
| `buyers` | `top_buyers_money` | Argent dépensé par les acheteurs, taxes incluses | Oui |
| `sellers_count` | `top_sellers_count` | Nombre de ventes réalisées en tant que vendeur | Non |
| `buyers_count` | `top_buyers_count` | Nombre d'achats réalisés en tant qu'acheteur | Non |
| `tax` | `top_tax_paid` | Total des taxes payées | Oui |
| `biggest` | `biggest_sale` | Plus grosse vente unique en tant que vendeur | Oui |

**Périodes :**

| Période | Fenêtre |
|---------|---------|
| `day` | Aujourd'hui, depuis minuit |
| `week` | Depuis lundi |
| `month` | Depuis le 1er du mois |
| `all` | Depuis toujours (par défaut) |

Les périodes sont des fenêtres calendaires dans le fuseau horaire défini dans la configuration de l'addon (voir [Configuration](/zauctionhouse/addons/stats/configuration)).

<CalloutContainer type="info">

<CalloutDescription>
L'argent n'est jamais additionné entre plusieurs économies. Pour une métrique monétaire, si vous n'indiquez pas d'économie, l'économie par défaut de zAuctionHouse est utilisée. Pour une métrique de comptage (`sellers_count`, `buyers_count`), si vous n'indiquez pas d'économie, toutes les économies sont comptées ensemble.
</CalloutDescription>

</CalloutContainer>

Si un classement est désactivé dans la configuration, la commande répond avec le message `top-disabled`. Une métrique, une période ou une économie inconnue envoie `top-metric-unknown`, `top-period-unknown` ou `economy-unknown`.

**Exemples :**
```bash
# Top vendeurs depuis toujours dans l'économie par défaut
/zahstats top sellers

# Top acheteurs cette semaine
/zahstats top buyers week

# Top vendeurs par nombre de ventes ce mois-ci, économie vault uniquement
/zahstats top sellers_count month vault

# Les noms complets des métriques fonctionnent aussi
/zahstats top biggest_sale day
```

### Détails de la commande Player

```bash
/zahstats player [name]
```

Affiche les statistiques d'un joueur, un bloc par économie. L'économie par défaut apparaît en premier, puis les autres par ordre alphabétique. Chaque bloc affiche :
- Les objets mis en vente, les objets vendus et le taux de conversion (vendus / mis en vente)
- Les objets achetés
- L'argent gagné et l'argent dépensé
- Les taxes payées et la plus grosse vente
- Les dates de la première et de la dernière vente

**Arguments :**
- `[name]` - Nom du joueur (optionnel). Sans nom, vous voyez vos propres statistiques. Depuis la console, un nom est requis

Le nom doit être un nom Minecraft valide (1 à 16 lettres, chiffres ou `_`). Les joueurs hors ligne fonctionnent aussi : l'addon recherche le nom dans sa base de données. La complétion automatique propose les joueurs en ligne, mais vous pouvez saisir n'importe quel nom. Un nom invalide ou inconnu envoie `player-not-found`, et un joueur sans aucune statistique envoie `player-empty`.

**Exemples :**
```bash
# Vos propres statistiques
/zahstats player

# Les statistiques d'un autre joueur
/zahstats player Notch
```

### Détails de la commande Items

```bash
/zahstats items [economy]
```

Ouvre le menu d'exploration des prix des objets (`item-prices.yml`). Joueurs uniquement.

**Arguments :**
- `[economy]` - L'économie dans laquelle afficher les prix (optionnel, insensible à la casse). Si elle est indiquée, cette économie est sélectionnée à l'ouverture du menu. Une économie inconnue envoie `economy-unknown`

### Reload & Clear Cache

- `/zahstats reload` (alias `rl`) recharge la configuration, les messages et les menus. Si la nouvelle configuration est invalide, rien ne change et la configuration actuelle reste active (`reload-error`). Si la configuration se charge mais que certains menus échouent, l'addon envoie `reload-menus-error`.
- `/zahstats clearcache` (alias `cc`) vide tous les caches de statistiques, y compris le cache des valeurs PlaceholderAPI. Il ne les vide pas : chaque valeur en cache est marquée comme expirée et recalculée en arrière-plan, et l'ancienne valeur reste affichée jusqu'à ce que la nouvelle soit prête. Il réinitialise aussi le cache des placeholders analysés.

### Détails de la commande Import

```bash
/zahstats import <v1|v4logs> confirm
```

Importe les ventes passées dans l'addon. Fonctionne en deux étapes :
1. Exécutez la commande **sans** `confirm` pour faire une simulation. Elle affiche le nombre estimé de lignes, le temps estimé et les éventuels avertissements.
2. Exécutez-la à nouveau **avec** `confirm` pour lancer l'import. L'import s'exécute en arrière-plan, et la progression est écrite dans la console.

Si la simulation affiche un avertissement bloquant (aucune table `zah_*` trouvée dans la base de données V1, ou des achats V3 qui seraient comptés deux fois), l'import est refusé lorsque vous le confirmez.

**Sources :**

| Source | Description |
|--------|-------------|
| `v1` | Les tables `zah_*` de zAuctionHouseStats V1 |
| `v4logs` | La table des logs de zAuctionHouse V4. Utilise le prix de mise en vente, donc les montants acheteur et vendeur sont approximatifs |

Le nom de la source est insensible à la casse, et `v4-logs` / `v4_logs` sont également acceptés.

Chaque source ne peut être importée qu'une seule fois par base de données. Sur une configuration multi-serveurs, un import déjà en cours sur un autre serveur est bloqué. Pour le processus complet, voir [Migration](/zauctionhouse/addons/stats/migration).

**Exemples :**
```bash
# Simulation : aperçu de l'import V1
/zahstats import v1

# Lancer l'import V1
/zahstats import v1 confirm
```

<CalloutContainer type="warning">

<CalloutDescription>
Sauvegardez toujours votre base de données avant d'importer.
</CalloutDescription>

</CalloutContainer>

### Détails de la commande Purge

```bash
/zahstats purge <days> confirm
```

Supprime les ventes enregistrées, ainsi que les mises en vente terminées, plus anciennes que le nombre de jours indiqué. Les mises en vente actives ne sont jamais supprimées. Les totaux journaliers et les totaux depuis toujours sont conservés, donc les classements, les périodes et les totaux des joueurs restent corrects. Les prix des objets et le classement « plus grosse vente » jour/semaine/mois sont calculés à partir des ventes elles-mêmes, donc les ventes purgées n'y comptent plus. Fonctionne en deux étapes :
1. Exécutez la commande **sans** `confirm` pour voir combien de lignes seraient supprimées.
2. Exécutez-la à nouveau **avec** `confirm` pour les supprimer.

**Arguments :**
- `<days>` - Nombre de jours à conserver (requis). Un nombre entier, au moins `1` (sinon `purge-invalid-days`). La complétion automatique propose `30`, `60`, `90`, `180` et `365`

Pour purger automatiquement chaque jour, définissez `retention.sales-days` dans `config.yml` (voir [Configuration](/zauctionhouse/addons/stats/configuration)).

**Exemples :**
```bash
# Aperçu : combien de ventes ont plus de 90 jours
/zahstats purge 90

# Supprimer les ventes de plus de 90 jours
/zahstats purge 90 confirm
```

<CalloutContainer type="warning">

<CalloutDescription>
Une purge est irréversible. Sauvegardez toujours votre base de données avant.
</CalloutDescription>

</CalloutContainer>

## Sous-commandes zAuctionHouse

L'addon ajoute deux sous-commandes à la commande principale de zAuctionHouse (`/zauctionhouse`, `/ah` et ses autres alias). Elles sont listées dans `/ah help`. Les deux sont réservées aux joueurs.

| Commande | Description | Permission |
|----------|-------------|------------|
| `/ah stats` | Ouvrir le menu principal des statistiques (`stats.yml`) | `zauctionhouse.stats.use` |
| `/ah price [economy]` | Statistiques de prix de l'objet en main | `zauctionhouse.stats.items` |

### Détails de la commande Price

```bash
/ah price [economy]
```

Affiche les statistiques de prix depuis toujours pour l'objet dans votre main principale : nombre de ventes, prix moyen et prix médian. Les objets sont identifiés par leur matériau et leur custom model data.

**Arguments :**
- `[economy]` - L'économie à utiliser (optionnel, insensible à la casse, par défaut l'économie par défaut de zAuctionHouse)

Vous devez tenir un objet, sinon l'addon envoie `price-error`. Une économie inconnue envoie `price-economy-unknown`. Si aucune vente n'est enregistrée pour cet objet, l'addon envoie le message `price-no-data`.

**Exemples :**
```bash
# Prix de l'objet en main, économie par défaut
/ah price

# Prix dans une économie spécifique
/ah price vault
```

## Permissions

Toutes les permissions sont par défaut à `op`.

| Permission | Description | Par défaut |
|------------|-------------|------------|
| `zauctionhouse.stats.use` | `/zahstats`, `/zahstats help` et `/ah stats` (menu principal des statistiques) | `op` |
| `zauctionhouse.stats.top` | `/zahstats top` et le menu de classement | `op` |
| `zauctionhouse.stats.player` | `/zahstats player` et le menu des statistiques joueur | `op` |
| `zauctionhouse.stats.items` | `/zahstats items`, `/ah price` et le menu des prix des objets | `op` |
| `zauctionhouse.stats.reload` | `/zahstats reload` | `op` |
| `zauctionhouse.stats.clearcache` | `/zahstats clearcache` | `op` |
| `zauctionhouse.stats.import` | `/zahstats import` | `op` |
| `zauctionhouse.stats.purge` | `/zahstats purge` | `op` |
| `zauctionhouse.stats.admin` | Toutes les permissions ci-dessus, plus le menu d'administration (`admin.yml`) | `op` |

### Wildcard

`zauctionhouse.stats.admin` donne toutes les autres permissions `zauctionhouse.stats.*` :

```yaml
zauctionhouse.stats.admin:
  children:
    zauctionhouse.stats.use: true
    zauctionhouse.stats.top: true
    zauctionhouse.stats.player: true
    zauctionhouse.stats.items: true
    zauctionhouse.stats.reload: true
    zauctionhouse.stats.clearcache: true
    zauctionhouse.stats.import: true
    zauctionhouse.stats.purge: true
```

### Permissions des menus

Les menus par défaut vérifient les mêmes permissions avec un `open-requirement` zMenu :

| Menu | Permission |
|------|------------|
| `stats.yml` | `zauctionhouse.stats.use` |
| `leaderboard.yml` | `zauctionhouse.stats.top` |
| `player-stats.yml` | `zauctionhouse.stats.player` |
| `item-prices.yml` | `zauctionhouse.stats.items` |
| `admin.yml` | `zauctionhouse.stats.admin` |

Dans `stats.yml`, le bouton qui ouvre le menu d'administration n'est affiché qu'aux joueurs ayant `zauctionhouse.stats.admin`. Voir [Inventaires](/zauctionhouse/addons/stats/inventories) pour plus de détails.

### Notifications de mise à jour

| Permission | Description | Par défaut |
|------------|-------------|------------|
| `zplugin.notifs` | Recevoir le message `version-available` à la connexion lorsqu'une nouvelle version de l'addon est disponible | Non déclarée par l'addon (opérateurs uniquement, sauf si vous la donnez) |

Cette permission est partagée avec les autres plugins GroupeZ et ne fait pas partie de `zauctionhouse.stats.admin`. La vérification n'a lieu que si `enable-version-checker` vaut `true` (voir [Configuration](/zauctionhouse/addons/stats/configuration)).

## Exemples de permissions

### LuckPerms

Permettre à tous les joueurs d'utiliser les menus de statistiques et `/ah price` :

```bash
/lp group default permission set zauctionhouse.stats.use true
/lp group default permission set zauctionhouse.stats.top true
/lp group default permission set zauctionhouse.stats.player true
/lp group default permission set zauctionhouse.stats.items true
```

Donner un accès complet au staff :

```bash
/lp group admin permission set zauctionhouse.stats.admin true
```

### Exemple de configuration des groupes

```yaml
# Groupe par défaut
permissions:
  - zauctionhouse.stats.use
  - zauctionhouse.stats.top
  - zauctionhouse.stats.player
  - zauctionhouse.stats.items

# Groupe staff
permissions:
  - zauctionhouse.stats.admin
```
