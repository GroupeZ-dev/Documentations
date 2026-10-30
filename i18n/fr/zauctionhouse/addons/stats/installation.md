---
title: Installer zAuctionHouseStats
description: Comment installer zAuctionHouseStats, configurer sa base de données et vérifier que les statistiques sont collectées
---

# Installer zAuctionHouseStats

Ce guide couvre l'installation de l'addon zAuctionHouseStats, le choix de son stockage et la vérification de la collecte des statistiques.

## Prérequis

### Exigences serveur

| Exigence | Version |
|----------|---------|
| **Java** | 21 ou supérieur |
| **Minecraft** | 1.21+ (`api-version: 1.21`) |
| **Logiciel serveur** | Paper et ses forks, Folia (`folia-supported: true`) |

### Plugins requis

Ces plugins sont déclarés dans la liste `depend` du `plugin.yml` : l'addon ne se charge pas sans eux.

| Plugin | Notes |
|--------|-------|
| **zAuctionHouse** | Version 4 uniquement. L'addon refuse de démarrer avec une version plus ancienne de zAuctionHouse, ou si zAuctionHouse lui-même est désactivé (par exemple après une erreur de base de données de son côté). |
| **zMenu** | Fournit les menus de statistiques. L'addon se désactive si zMenu ne fonctionne pas. |

### Plugins optionnels

| Plugin | Notes |
|--------|-------|
| **PlaceholderAPI** | Déclaré en `softdepend`. Lorsqu'il est activé, l'expansion `zahstats` est enregistrée automatiquement. Voir [Placeholders](/zauctionhouse/addons/stats/placeholders). |

### Bibliothèques

Les drivers JDBC sont déclarés dans la section `libraries` du `plugin.yml` : le serveur les télécharge au premier démarrage. Vous n'avez rien d'autre à installer.

| Bibliothèque | Version |
|--------------|---------|
| `org.mariadb.jdbc:mariadb-java-client` | 3.5.6 |
| `org.xerial:sqlite-jdbc` | 3.46.0.0 |

<CalloutContainer type="info">

<CalloutTitle>Événements de statistiques de zAuctionHouse</CalloutTitle>

<CalloutDescription>
L'addon collecte les statistiques grâce aux événements exposés par zAuctionHouse. Si votre version de zAuctionHouse ne les expose pas encore, l'addon s'arrête avec une erreur, sauf si vous autorisez explicitement le mode dégradé de lecture des logs (`collection.polling.enabled: true`). Gardez zAuctionHouse à jour pour obtenir des statistiques exactes. Voir [Configuration](/zauctionhouse/addons/stats/configuration).
</CalloutDescription>

</CalloutContainer>

## Étapes d'installation

### 1. Installez le jar

Placez `zAuctionHouseStats.jar` dans le dossier `plugins/` de votre serveur, à côté de `zAuctionHouse.jar` et `zMenu.jar`.

### 2. Démarrez votre serveur

Démarrez le serveur une première fois pour générer les fichiers par défaut. Avec les paramètres par défaut (SQLite), l'addon fonctionne immédiatement.

### 3. Configurez le stockage et le fuseau horaire

Modifiez `plugins/zAuctionHouseStats/config.yml` :

- choisissez le [type de stockage](#stockage) (SQLite pour un serveur unique, MySQL/MariaDB pour un réseau) ;
- définissez le [fuseau horaire](#fuseau-horaire) **avant** que la moindre statistique ne soit enregistrée ou importée.

### 4. Redémarrez votre serveur

Certains paramètres ne sont lus qu'au démarrage : `storage-type` et `database-configuration`, `collection.*`, `statistics.timezone`, `statistics.save-itemstacks`, `retention.sales-days` et `language.yml`. `/zahstats reload` ne les applique pas (un avertissement « redémarrage requis » est affiché dans la console). Redémarrez le serveur après les avoir modifiés.

## Structure des fichiers

Après le premier démarrage, zAuctionHouseStats crée la structure suivante :

```
plugins/zAuctionHouseStats/
├── language.yml            # Langue des fichiers générés (auto, en, fr, es, it)
├── config.yml              # Configuration principale
├── messages.yml            # Tous les messages de l'addon
├── inventories/
│   ├── stats.yml           # Hub des statistiques (/ah stats)
│   ├── leaderboard.yml     # Classements
│   ├── player-stats.yml    # Statistiques d'un joueur
│   ├── item-prices.yml     # Explorateur des prix des objets (/zahstats items)
│   └── admin.yml           # Menu d'état administrateur
├── patterns/
│   ├── zahstats-back.yml
│   └── zahstats-pagination.yml
└── database.db             # Base de données SQLite (si SQLite est utilisé)
```

### Langue

`language.yml` est lu **avant** la génération de tout autre fichier. Il sélectionne la langue de `messages.yml`, `inventories/` et `patterns/`.

| Valeur | Langue |
|--------|--------|
| `auto` | Détectée à partir de la locale du serveur (par défaut) : les pays francophones donnent `fr`, les pays hispanophones `es`, l'Italie/Saint-Marin/le Vatican `it`, tout le reste `en` |
| `en` | Anglais |
| `fr` | Français |
| `es` | Espagnol |
| `it` | Italien |

Toute autre valeur affiche un avertissement et revient à l'anglais. `config.yml` est toujours généré dans sa version par défaut, quelle que soit la langue.

<CalloutContainer type="warning">

<CalloutTitle>Changer de langue plus tard</CalloutTitle>

<CalloutDescription>
La langue ne s'applique qu'aux fichiers qui n'existent pas encore. Pour changer de langue, supprimez `messages.yml` ainsi que les dossiers `inventories/` et `patterns/`, puis redémarrez le serveur. `/zahstats reload` ne change pas la langue.
</CalloutDescription>

</CalloutContainer>

## Stockage

zAuctionHouseStats utilise **sa propre connexion à la base de données**. Il n'écrit jamais dans les tables de zAuctionHouse : toutes ses tables utilisent leur propre préfixe.

```yaml
# SQLITE | MYSQL | MARIADB
storage-type: SQLITE

database-configuration:
  table-prefix: "zahstats_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zauctionhouse
  max-pool-size: 4
  min-idle: 2
  debug: false
```

| Clé | Défaut | Description |
|-----|--------|-------------|
| `storage-type` | `SQLITE` | `SQLITE`, `MYSQL` ou `MARIADB`. Toute autre valeur empêche l'addon de démarrer. |
| `database-configuration.table-prefix` | `zahstats_` | Préfixe de toutes les tables créées par l'addon. Seuls les lettres, les chiffres et `_` sont autorisés. |
| `database-configuration.host` | `192.168.10.10` | Hôte MySQL/MariaDB. |
| `database-configuration.port` | `3306` | Port MySQL/MariaDB. |
| `database-configuration.user` | `homestead` | Utilisateur de la base de données. |
| `database-configuration.password` | `secret` | Mot de passe de la base de données. |
| `database-configuration.database` | `zauctionhouse` | Nom de la base de données. |
| `database-configuration.max-pool-size` | `4` | Nombre maximal de connexions dans le pool (MySQL/MariaDB uniquement, minimum `1`). |
| `database-configuration.min-idle` | `2` | Connexions inactives conservées dans le pool (MySQL/MariaDB uniquement, minimum `0`). |
| `database-configuration.debug` | `false` | Affiche chaque requête SQL dans la console. |

### SQLite

Avec `storage-type: SQLITE`, les données sont stockées dans `plugins/zAuctionHouseStats/database.db`. Aucun autre paramètre n'est nécessaire. SQLite est prévu pour un **serveur unique**.

### MySQL / MariaDB

Définissez `storage-type` sur `MYSQL` ou `MARIADB` et renseignez les informations de connexion. Vous pouvez utiliser la même base de données que zAuctionHouse : les tables de l'addon sont séparées grâce à leur préfixe (`zahstats_` par défaut).

Avec MySQL/MariaDB, l'addon utilise toujours un pool de connexions HikariCP dimensionné par `max-pool-size` et `min-idle`.

Si la connexion ou les migrations échouent (ou ne se terminent pas en moins de 60 secondes), l'addon se désactive et affiche la raison dans la console. Il ne fonctionne jamais en mode dégradé sans stockage.

### Fichier `database-configuration.yml` partagé

Si un fichier `database-configuration.yml` existe à la **racine du serveur** (le même fichier que celui utilisé par zAuctionHouse V4 et d'autres plugins GroupeZ), il est prioritaire sur `config.yml` **clé par clé** : chaque clé qu'il définit remplace celle de `config.yml`, les clés absentes reprennent la valeur de `config.yml`.

Les clés suivantes sont lues depuis ce fichier, dans la section `database-configuration` :

| Clé | Lue depuis le fichier partagé |
|-----|-------------------------------|
| `host`, `port`, `user`, `password`, `database`, `debug` | Oui |
| `table-prefix` | **Non**, toujours lue depuis le `config.yml` de l'addon |
| `max-pool-size`, `min-idle` | Non, toujours lues depuis le `config.yml` de l'addon |
| `storage-type` | Non, toujours lue depuis le `config.yml` de l'addon |

Lorsque le fichier est détecté, la console affiche :

```
Using the server-wide database-configuration.yml for database credentials (table-prefix is still read from config.yml).
```

Si le fichier existe mais ne peut pas être lu, un avertissement est affiché et les valeurs de `config.yml` sont utilisées à la place.

<CalloutContainer type="info">

<CalloutTitle>Pourquoi le préfixe n'est pas partagé</CalloutTitle>

<CalloutDescription>
`database-configuration.yml` est partagé entre plusieurs plugins. Lire son préfixe mélangerait les tables de l'addon avec celles des autres plugins : l'addon utilise donc toujours son propre `table-prefix`.
</CalloutDescription>

</CalloutContainer>

### Tables créées

Au démarrage, l'addon exécute ses migrations et crée les tables suivantes (affichées avec le préfixe par défaut `zahstats_`) :

| Table | Contenu |
|-------|---------|
| `zahstats_sales` | Une ligne par vente |
| `zahstats_listings` | Une ligne par objet mis en vente |
| `zahstats_player_stats` | Totaux depuis toujours par joueur et par économie |
| `zahstats_player_names` | Dernier nom connu de chaque joueur |
| `zahstats_player_daily` | Totaux journaliers par joueur (périodes DAY / WEEK / MONTH) |
| `zahstats_global_daily` | Totaux journaliers de tout le serveur par économie |
| `zahstats_global_stats` | Statistiques globales du serveur depuis toujours |
| `zahstats_import_state` | Progression de `/zahstats import` |
| `zahstats_migrations` | Registre des migrations |

Le registre des migrations suit le préfixe (`<prefix>migrations` ; avec un préfixe vide, il s'agit de `zahstats_migrations`). Ce n'est jamais la table générique `migrations` ni celle de zAuctionHouse : l'addon peut donc partager une base de données avec zAuctionHouse sans risque. Après les migrations, l'addon vérifie que toutes les tables existent ; si l'une d'elles manque alors que le registre la marque comme créée, l'addon s'arrête et vous indique de supprimer cette table de registre (ou de restaurer les tables manquantes) puis de redémarrer.

<CalloutContainer type="warning">

<CalloutTitle>Changer le préfixe des tables</CalloutTitle>

<CalloutDescription>
Changer `table-prefix` sur une base de données existante crée un nouveau jeu de tables **vides** sous le nouveau préfixe. Les anciennes tables ne sont ni renommées ni migrées.
</CalloutDescription>

</CalloutContainer>

## Fuseau horaire

Les statistiques des périodes `DAY`, `WEEK` et `MONTH` sont regroupées par jour. Le fuseau horaire utilisé pour découper ces jours se définit dans `config.yml` :

```yaml
statistics:
  # Empty = server timezone. Example: "Europe/Paris".
  timezone: ""
```

| Valeur | Comportement |
|--------|--------------|
| `""` (défaut) | Utilise le fuseau horaire du serveur |
| Un identifiant de zone, par ex. `Europe/Paris` | Utilise ce fuseau horaire |
| Un identifiant de zone invalide | L'addon refuse de démarrer |

<CalloutContainer type="error">

<CalloutTitle>À définir une fois, avant toute donnée</CalloutTitle>

<CalloutDescription>
Définissez le fuseau horaire **avant le premier démarrage avec du trafic réel et avant tout `/zahstats import`** : l'historique importé est lui aussi regroupé par jour selon ce fuseau horaire. Ne le changez jamais ensuite : les jours déjà enregistrés ne sont pas recalculés. Le changement nécessite aussi un redémarrage (`/zahstats reload` affiche seulement un avertissement).
</CalloutDescription>

</CalloutContainer>

Le même fuseau horaire est utilisé pour afficher les dates dans les placeholders de date (`placeholders.date-format`).

## Multi-serveurs

Lorsque plusieurs serveurs partagent un même hôtel des ventes (voir l'addon [zAuctionHouse Redis](/zauctionhouse/addons/redis/introduction)) :

- utilisez **`MYSQL` ou `MARIADB`** et faites pointer tous les serveurs vers la **même base de données** avec le **même `table-prefix`**. Les compteurs sont écrits par incréments atomiques, plusieurs serveurs peuvent donc écrire en même temps ;
- **n'utilisez pas SQLite** : chaque serveur ne verrait que ses propres statistiques. Si l'addon zAuctionHouseRedis est installé alors que l'addon utilise SQLite, un avertissement est affiché au démarrage ;
- chaque vente conserve le nom de serveur configuré dans zAuctionHouse ;
- utilisez le même `statistics.timezone` sur tous les serveurs ;
- si vous devez utiliser le mode dégradé de lecture des logs (`collection.mode: LOGS_POLLING`), activez `collection.polling.enabled` sur **un seul serveur**. Les serveurs en `LOGS_POLLING` avec la lecture désactivée ne collectent rien et affichent un avertissement.

## Vérifier l'installation

### Console

Un démarrage réussi affiche des lignes similaires à :

```
Storage ready (SQLITE, prefix 'zahstats_').
Statistics collection: zAuctionHouse stats events.
zMenu inventories loaded (language: en).
PlaceholderAPI expansion 'zahstats' registered.
zAuctionHouseStats 2.0.0 enabled.
```

La ligne PlaceholderAPI n'apparaît que si PlaceholderAPI est installé.

### En jeu

| Commande | Ce qu'il faut vérifier |
|----------|------------------------|
| `/zahstats` ou `/zahstats help` (alias `/zahs`) | Liste les sous-commandes auxquelles vous avez accès |
| `/ah stats` | Ouvre le hub des statistiques (sous-commande ajoutée à la commande de zAuctionHouse par l'addon) |
| `/zahstats top <metric>` | Affiche un classement dans le chat |
| `/zahstats player [name]` | Affiche les statistiques d'un joueur |
| `/ah price` | Affiche les statistiques de prix de l'objet en main |

Toutes les permissions sont accordées par défaut aux opérateurs. Le menu d'administration (`admin.yml`, ouvert depuis le hub avec `zauctionhouse.stats.admin`) affiche le type de stockage, le mode de collecte et l'état de la file d'écriture et des caches.

Les statistiques sont écrites en base de données toutes les quelques secondes (`flush.interval-seconds`, `2` par défaut, ou plus tôt dès que `flush.max-pending` événements sont en attente). Sur le serveur où la vente a lieu, les statistiques des joueurs déjà en cache et les statistiques globales sont mises à jour immédiatement. Les classements sont recalculés à l'expiration de leur cache (`caches.leaderboard-ttl-seconds`, `60` par défaut) et les prix des objets toutes les heures (`caches.material-price-ttl-seconds`, `3600`) : une nouvelle vente peut donc mettre ce temps à y apparaître. Utilisez `/zahstats clearcache` pour forcer un rafraîchissement immédiat des caches.

Voir [Commandes & Permissions](/zauctionhouse/addons/stats/commands-permissions) pour la référence complète.

## Mise à jour depuis la V1

zAuctionHouseStats V2 fonctionne uniquement avec zAuctionHouse V4. Votre historique V1 (tables `zah_*`) et les logs de zAuctionHouse V4 peuvent être importés dans les nouvelles tables avec `/zahstats import v1` et `/zahstats import v4logs` : sans `confirm`, la commande affiche seulement un aperçu (nombre de lignes et durée estimés), `/zahstats import <v1|v4logs> confirm` lance l'import. Les placeholders de la V1 continuent de fonctionner grâce à des alias de compatibilité (`placeholders.enable-v1-aliases`).

Définissez le [fuseau horaire](#fuseau-horaire) avant l'import, puis suivez le guide de [Migration](/zauctionhouse/addons/stats/migration).

## Prochaines étapes

- [Commandes & Permissions](/zauctionhouse/addons/stats/commands-permissions) - Référence complète des commandes
- [Placeholders](/zauctionhouse/addons/stats/placeholders) - Affichez les statistiques n'importe où
- [Configuration](/zauctionhouse/addons/stats/configuration) - Toutes les options de `config.yml`
- [Inventaires](/zauctionhouse/addons/stats/inventories) - Personnalisez les menus
