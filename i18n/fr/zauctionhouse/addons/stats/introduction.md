---
title: zAuctionHouseStats
description: Statistiques de ventes, classements, historique des prix des objets et statistiques joueurs pour zAuctionHouse V4
---

# zAuctionHouseStats

**zAuctionHouseStats** est l'addon officiel de statistiques pour **zAuctionHouse V4**. Il enregistre chaque mise en vente, vente et achat effectué sur votre hôtel des ventes, puis transforme ces données en classements, statistiques par joueur, références de prix des objets, interfaces zMenu et placeholders PlaceholderAPI.

Il est conçu pour ne jamais ralentir votre serveur. Chaque affichage (commandes, menus, placeholders) est servi depuis un cache, et tout le travail en base de données s'exécute sur un unique thread dédié en arrière-plan. Il est également sûr en réseau : plusieurs serveurs peuvent partager une même base MySQL/MariaDB sans compter une vente deux fois.

## Ce qu'il fait

### Classements
Classez vos joueurs selon **6 métriques**, chacune disponible sur **4 périodes** et filtrable par économie :

| Métrique | Classe les joueurs selon |
|----------|--------------------------|
| `TOP_SELLERS_MONEY` | L'argent réellement reçu en tant que vendeur, après taxes |
| `TOP_BUYERS_MONEY` | L'argent réellement payé en tant qu'acheteur, taxes incluses |
| `TOP_SELLERS_COUNT` | Le nombre de ventes réalisées |
| `TOP_BUYERS_COUNT` | Le nombre d'achats réalisés |
| `TOP_TAX_PAID` | Le total des taxes payées (part de taxe à l'achat et taxe de mise en vente) |
| `BIGGEST_SALE` | La plus grosse vente unique reçue en tant que vendeur |

| Période | Fenêtre |
|---------|---------|
| `DAY` | Aujourd'hui, depuis minuit |
| `WEEK` | Cette semaine, depuis lundi |
| `MONTH` | Ce mois-ci, depuis le 1er |
| `ALL` | Depuis toujours |

Les périodes sont des fenêtres calendaires, calculées dans le fuseau horaire défini dans `statistics.timezone` (ou celui du serveur). Les classements d'argent sont toujours calculés **par économie** : les montants de différentes économies ne sont jamais additionnés.

### Statistiques joueur
Chaque joueur dispose d'un profil complet : objets mis en vente, vendus, achetés, expirés et retirés, argent gagné et dépensé, taxes payées, plus grosse vente, ainsi que les dates de sa première et dernière vente et de son premier et dernier achat. Les joueurs peuvent consulter leur propre profil, et l'équipe peut consulter celui de n'importe quel joueur, y compris hors ligne.

### Historique des prix des objets
L'addon enregistre le matériau (et le custom model data) de chaque objet vendu, ce qui lui permet d'afficher le **nombre de ventes, le prix moyen et le prix médian** de n'importe quel objet. Les joueurs peuvent consulter l'objet qu'ils tiennent en main avec `/ah price`, ou parcourir les objets les plus vendus dans le menu d'exploration des prix.

### Statistiques globales du serveur
Des compteurs globaux pour tout l'hôtel des ventes : objets mis en vente, vendus, expirés et retirés, volume d'argent total, taxes collectées, nombre d'ouvertures de l'hôtel des ventes, et la plus grosse vente jamais réalisée.

### Interfaces prêtes à l'emploi
Cinq inventaires zMenu sont inclus et entièrement personnalisables : un hub de statistiques avec un podium du top 3, les classements, le profil de statistiques du joueur, l'explorateur de prix des objets et un menu de statut administrateur. Ils sont générés en **anglais, français, espagnol ou italien**.

### Placeholders
Chaque statistique est disponible sous forme de placeholder `%zahstats_...%` (familles `top_`, `player_`, `global_` et `material_`). Les placeholders n'interrogent jamais la base de données lorsqu'ils sont affichés : ils montrent un texte de chargement jusqu'à ce que la valeur soit prête, puis la lisent depuis le cache.

### Compatibilité V1
Vous venez de l'ancien zAuctionHouseStats V1 ? Les noms de placeholders V1 continuent de fonctionner grâce à une couche de compatibilité (désactivable avec `placeholders.enable-v1-aliases`), et votre historique V1 peut être importé avec `/zahstats import v1`. L'historique existant de zAuctionHouse V4 peut aussi être importé depuis ses logs avec `/zahstats import v4logs`.

## Fonctionnalités clés

| Fonctionnalité | Description |
|----------------|-------------|
| **6 classements x 4 périodes** | Classements journaliers, hebdomadaires, mensuels et depuis toujours, par économie |
| **Profils joueurs** | 13 statistiques par joueur, consultables dans le chat, en GUI ou via les placeholders |
| **Prix des objets** | Nombre de ventes, prix moyen et prix médian par objet |
| **Commandes intégrées** | `/zahstats` ainsi que `/ah stats` et `/ah price` ajoutées à la commande de zAuctionHouse |
| **Interfaces zMenu** | 5 inventaires, 11 types de boutons personnalisés, 2 patterns |
| **PlaceholderAPI** | Placeholders `%zahstats_*%`, ainsi que les noms de placeholders V1 |
| **Conception sans lag** | Lectures en cache, écritures groupées sur un thread dédié, aucune requête SQL sur le thread principal ou les threads de région |
| **Compatible multi-serveurs** | Les compteurs sont écrits sous forme d'incréments atomiques, plusieurs serveurs peuvent donc partager une même base de données |
| **Base de données propre** | Stockage SQLite, MySQL ou MariaDB séparé (tables préfixées par `zahstats_` par défaut), jamais les tables de zAuctionHouse |
| **Import d'historique** | Import depuis zAuctionHouseStats V1 ou depuis les logs de zAuctionHouse V4 |
| **Rétention** | Purge quotidienne optionnelle des anciennes lignes de ventes et de mises en vente, tout en conservant les agrégats journaliers, les classements et les totaux depuis toujours |
| **Folia** | Entièrement supporté |
| **API publique** | Un service `StatsManager` pour les autres plugins |

## Prérequis

| Prérequis | Version |
|-----------|---------|
| **Java** | 21 ou supérieur |
| **Minecraft** | 1.21+ |
| **zAuctionHouse** | V4, **4.0.1.5 ou plus récent** recommandé |
| **zMenu** | Requis (l'addon se désactive si zMenu ne fonctionne pas) |
| **PlaceholderAPI** | Optionnel, nécessaire uniquement pour utiliser les placeholders `%zahstats_*%` dans d'autres plugins (ils fonctionnent toujours dans les inventaires zMenu de l'addon) |

### Logiciels serveur supportés

| Logiciel | Statut |
|----------|--------|
| **Paper** | Recommandé |
| **Folia** | Entièrement supporté |
| **Forks de Paper** (Purpur, Pufferfish, ...) | Supportés |
| **Spigot** | Non supporté (l'addon utilise l'API Paper) |

<CalloutContainer type="warning">

<CalloutTitle>zAuctionHouse V4 uniquement</CalloutTitle>

<CalloutDescription>
Cet addon ne fonctionne pas avec zAuctionHouse V3. Si zAuctionHouse est absent, désactivé ou n'est pas en V4, l'addon s'arrête au démarrage et en explique la raison dans la console.
</CalloutDescription>

</CalloutContainer>

## Collecte des données

zAuctionHouseStats propose deux façons de collecter les données. Une **seule** d'entre elles est active sur un serveur à un instant donné, une vente ne peut donc jamais être comptée deux fois.

| Source | Quand elle est utilisée | Précision |
|--------|-------------------------|-----------|
| **Événements zAuctionHouse** (par défaut) | zAuctionHouse **4.0.1.5 ou plus récent** | Exacte : montants réellement payés et reçus, taxes, détails de l'objet |
| **Lecture des logs** (solution de repli) | Anciennes versions de zAuctionHouse V4, uniquement si `collection.polling.enabled` vaut `true` | Prix approximatifs |

- **Mode événements** : l'addon écoute les événements déclenchés par zAuctionHouse après une mise en vente, un achat, une récupération d'argent ou une ouverture de l'hôtel des ventes, ainsi que les expirations et retraits d'objets. Les événements sont mis en file d'attente en mémoire et écrits en base de données par lots (toutes les 2 secondes par défaut, ou plus tôt lors des pics d'activité).
- **Mode lecture des logs** : si la version installée de zAuctionHouse ne déclenche pas ces événements, l'addon peut à la place lire la table des logs de zAuctionHouse à intervalle régulier. Ce mode n'est jamais activé par défaut. En réseau, activez-le sur **un seul serveur**.

La source est choisie avec `collection.mode` (`AUTO`, `EVENTS` ou `LOGS_POLLING`). Avec la valeur par défaut `AUTO`, l'addon utilise les événements lorsqu'ils existent. Sinon, et si la lecture des logs n'est pas autorisée, l'addon se désactive et vous demande de mettre à jour zAuctionHouse.

<CalloutContainer type="info">

<CalloutTitle>Vous gérez un réseau ?</CalloutTitle>

<CalloutDescription>
Utilisez le stockage `MYSQL` ou `MARIADB` et faites pointer tous les serveurs vers la même base de données. Si l'addon détecte [zAuctionHouseRedis](https://groupez.dev/resources/zauctionhouse-redis.210) alors que vous utilisez SQLite, il vous avertit que chaque serveur ne verra que ses propres statistiques. Voir aussi la page de l'addon [zAuctionHouse Redis](/zauctionhouse/addons/redis/introduction).
</CalloutDescription>

</CalloutContainer>

## Étapes suivantes

- [Installation](/zauctionhouse/addons/stats/installation) - Installer l'addon et configurer sa base de données
- [Commandes & Permissions](/zauctionhouse/addons/stats/commands-permissions) - Toutes les commandes `/zahstats`, `/ah stats` et `/ah price`
- [Placeholders](/zauctionhouse/addons/stats/placeholders) - La référence complète des `%zahstats_*%` et les noms V1
- [Configuration](/zauctionhouse/addons/stats/configuration) - Chaque option de `config.yml` expliquée
- [Inventaires](/zauctionhouse/addons/stats/inventories) - Personnaliser les interfaces et les types de boutons personnalisés
- [Migration](/zauctionhouse/addons/stats/migration) - Importer votre historique V1 ou zAuctionHouse V4
- [API](/zauctionhouse/addons/stats/api) - Utiliser les statistiques depuis votre propre plugin
