---
title: Configuration
description: Référence complète de config.yml, messages.yml et language.yml pour l'addon zAuctionHouseStats
---

# Configuration

zAuctionHouseStats se configure avec trois fichiers, tous situés dans `plugins/zAuctionHouseStats/` :

| Fichier | Rôle |
|---------|------|
| `config.yml` | Stockage, collecte des données, caches, classements, statistiques, rétention, import et paramètres des placeholders |
| `messages.yml` | Tous les messages de chat envoyés par l'addon |
| `language.yml` | Langue des fichiers par défaut `messages.yml`, `inventories/` et `patterns/` générés au premier démarrage |

Les menus (`inventories/` et `patterns/`) sont documentés sur la page [Inventaires](/zauctionhouse/addons/stats/inventories).

<CalloutContainer type="info">

<CalloutDescription>
L'addon utilise sa **propre** base de données. Il n'écrit jamais dans les tables de zAuctionHouse. Le `table-prefix` par défaut est `zahstats_`.
</CalloutDescription>

</CalloutContainer>

## config.yml par défaut

Voici le `config.yml` par défaut complet. Les commentaires sont résumés et traduits ici ; les clés et les valeurs par défaut sont exactement celles fournies avec l'addon (le fichier est livré en anglais).

```yaml
# Logs de debug détaillés (requêtes SQL agrégées, tailles des flush, hits/miss des caches).
debug: false

# Sondes de temps (durées des flush, rafraîchissements des classements...).
debug-performance: false

# Vérifie au démarrage si une nouvelle version de l'addon est disponible.
enable-version-checker: true

# Raccourcis de couleur utilisables dans messages.yml (<primary>, <secondary>, <error>, <success>).
# Même convention que zAuctionHouse V4 (message-colors).
message-colors:
  - key: <primary>
    color: '#24d65d'
  - key: <secondary>
    color: '#656665'
  - key: <error>
    color: '#ff0000'
  - key: <success>
    color: '#00ff00'

#=============================================================================
# STOCKAGE (la base de données PROPRE à l'addon - jamais celle de zAuctionHouse)
#=============================================================================

# SQLITE | MYSQL | MARIADB
# SQLITE : fichier local dans plugins/zAuctionHouseStats/ (serveur unique).
# MYSQL/MARIADB : obligatoire pour un cluster (plusieurs serveurs, une base).
storage-type: SQLITE

# Si un fichier database-configuration.yml existe à la racine du serveur, il
# remplace ce bloc CLÉ PAR CLÉ (même convention que zAuctionHouse V4).
database-configuration:
  # Préfixe de toutes les tables de l'addon.
  # Le modifier sur une base existante crée un nouveau jeu de tables VIDES
  # (les anciennes tables ne sont ni renommées ni migrées).
  table-prefix: "zahstats_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zauctionhouse
  # Taille du pool Hikari (MySQL / MariaDB uniquement).
  max-pool-size: 4
  min-idle: 2
  # Affiche chaque requête SQL dans la console.
  debug: false

#=============================================================================
# COLLECTE (événements de stats de zAuctionHouse, ou lecture de la table des logs)
#=============================================================================

collection:
  # AUTO (par défaut) : utilise les événements de stats de zAuctionHouse s'ils existent ;
  # sinon, se rabat sur la lecture de la table des logs UNIQUEMENT si
  # polling.enabled vaut true (sinon l'addon se désactive).
  # EVENTS | LOGS_POLLING forcent un mode.
  mode: AUTO
  # Paramètres du mode LOGS_POLLING uniquement.
  polling:
    enabled: false
    interval-seconds: 60
    batch-size: 1000
    # true = décode les objets pour obtenir matériau/quantité (coûteux, hors du thread principal).
    decode-itemstacks: false

#=============================================================================
# ÉCRITURE
#=============================================================================

flush:
  # Intervalle entre deux écritures de la file d'événements en base, en secondes.
  interval-seconds: 2
  # Flush anticipé dès que N événements sont en attente (pic d'activité).
  max-pending: 100

#=============================================================================
# CACHES DE LECTURE (utilisés par les commandes, les placeholders ET les menus)
#=============================================================================

caches:
  leaderboard-ttl-seconds: 60
  player-stats-ttl-seconds: 60
  player-stats-offline-ttl-seconds: 60
  material-price-ttl-seconds: 3600
  global-stats-ttl-seconds: 60

#=============================================================================
# CLASSEMENTS
#=============================================================================

leaderboards:
  # Entrées conservées par classement (l'affichage chat de /zahstats top est limité à 10).
  # Borné à [1, 100].
  size: 10
  # Nom affiché lorsqu'un joueur est inconnu.
  unknown-name: "?"
  # Économie utilisée lorsqu'un placeholder/menu monétaire n'en précise pas.
  # Vide = économie par défaut de zAuctionHouse.
  default-economy: ""
  # Clés (métrique, période) calculées en arrière-plan au démarrage.
  # Forme : { metric: <METRIC>, period: DAY|WEEK|MONTH|ALL[, economy: <nom>] }
  preload:
    - { metric: TOP_SELLERS_MONEY, period: ALL }
    - { metric: TOP_SELLERS_MONEY, period: DAY }
    - { metric: TOP_BUYERS_MONEY, period: ALL }
  # Métriques désactivées.
  disabled: []
  # Interrupteur global des têtes de joueurs dans les menus.
  player-heads: true
  # Texture de tête par défaut (base64) lorsqu'un profil joueur est introuvable.
  # Vide = tête par défaut du client.
  default-head-url: ""

#=============================================================================
# STATISTIQUES
#=============================================================================

statistics:
  # Fuseau horaire des agrégats journaliers (périodes DAY/WEEK/MONTH).
  # Vide = fuseau horaire du serveur. Exemple : "Europe/Paris".
  # NE JAMAIS LE MODIFIER après le premier démarrage.
  timezone: ""

  # Stocke l'ItemStack complet (Base64) de chaque vente.
  save-itemstacks: false

  # Statistiques de prix par matériau (/ah price, menu item-prices).
  material-prices:
    max-entries: 1000
    median-sample-limit: 50000

#=============================================================================
# EXPLORATEUR DE PRIX (inventories/item-prices.yml)
#=============================================================================

item-prices:
  # Nombre de matériaux listés par le menu. Borné à [1, 500].
  top-limit: 100

#=============================================================================
# RÉTENTION
#=============================================================================

retention:
  # Purge quotidienne des ventes et mises en vente de plus de N jours. 0 = illimité (par défaut).
  # Les agrégats journaliers et les totaux depuis toujours sont TOUJOURS conservés.
  sales-days: 0

#=============================================================================
# IMPORT / BACKFILL (/zahstats import v1|v4logs)
#=============================================================================

import:
  chunk-size: 500
  pause-between-chunks-ms: 50
  log-every-rows: 10000
  v1:
    server-name: "v1-import"
    listing-outcome-heuristic: true
    # Optionnel : si les tables zah_* sont dans une autre base de données.
    database:
      enabled: false
      type: MYSQL              # MYSQL | MARIADB | SQLITE
      host: localhost
      port: 3306
      user: ""
      password: ""
      database: ""
  v4logs:
    # Ne pas activer si 'import v1' est également utilisé.
    include-migrated-v3: false
    resolve-amounts-from-transactions: true
    server-name-fallback: "v4-import"

#=============================================================================
# PLACEHOLDERS (textes de repli & format)
#=============================================================================

placeholders:
  loading: "Loading..."
  no-name: "✘"
  no-value: "0"
  not-applicable: "N/A"
  enable-not-applicable: true
  date-format: "dd/MM/yyyy HH:mm"
  enable-v1-aliases: true
```

## Gestion des valeurs invalides

L'addon valide `config.yml` au démarrage et à chaque `/zahstats reload` :

- **Les valeurs qui corrompraient les données de façon permanente** (`storage-type`, `database-configuration.table-prefix`, `statistics.timezone`, `collection.mode`) sont strictes. Une valeur invalide **bloque le démarrage** (l'addon se désactive avec une erreur dans la console), ou **annule le rechargement** (la configuration précédente reste active).
- **Les valeurs de réglage** inférieures à leur minimum sont remises à leur valeur par défaut avec un avertissement dans la console. Les valeurs avec un intervalle (`leaderboards.size`, `item-prices.top-limit`, `import.chunk-size`) sont ramenées à la borne la plus proche, également avec un avertissement. `statistics.material-prices.max-entries` est relevé à `item-prices.top-limit` s'il est inférieur, et un `placeholders.date-format` invalide revient à `dd/MM/yyyy HH:mm` (les deux avec un avertissement).
- Deux valeurs d'import sont corrigées silencieusement : un `import.pause-between-chunks-ms` négatif devient `0`, et un `import.log-every-rows` inférieur à `1` revient à `10000`.
- Les entrées invalides de `leaderboards.preload` et `leaderboards.disabled` sont ignorées avec un avertissement dans la console.
- Une erreur de syntaxe YAML pendant `/zahstats reload` annule le rechargement au lieu de revenir silencieusement aux valeurs par défaut.

## Général

| Clé | Type | Défaut | Description |
|-----|------|--------|-------------|
| `debug` | Booléen | `false` | Logs de debug détaillés : requêtes SQL agrégées, tailles des flush, hits/miss des caches. Signale aussi tout accès à la base de données effectué en dehors du thread de stockage de l'addon. |
| `debug-performance` | Booléen | `false` | Sondes de temps (durées des flush, rafraîchissements des classements). La clé est lue, mais la version actuelle de l'addon n'émet encore aucune sonde de temps : elle n'a donc aucun effet visible. |
| `enable-version-checker` | Booléen | `true` | Au démarrage, vérifie en arrière-plan si une nouvelle version de l'addon est disponible sur groupez.dev et écrit le résultat dans la console. Les joueurs ayant la permission `zplugin.notifs` reçoivent alors le message `version-available` à leur connexion. Lu uniquement au démarrage. |
| `message-colors` | Liste | Voir ci-dessous | Raccourcis de couleur disponibles dans `messages.yml`. |

### message-colors

Chaque entrée associe une balise raccourcie à une couleur hexadécimale. Le raccourci peut ensuite être utilisé dans n'importe quel message de `messages.yml`.

```yaml
message-colors:
  - key: <primary>
    color: '#24d65d'
  - key: <secondary>
    color: '#656665'
  - key: <error>
    color: '#ff0000'
  - key: <success>
    color: '#00ff00'
```

| Raccourci | Couleur par défaut |
|-----------|--------------------|
| `<primary>` | `#24d65d` |
| `<secondary>` | `#656665` |
| `<error>` | `#ff0000` |
| `<success>` | `#00ff00` |

- Les quatre raccourcis par défaut ci-dessus sont toujours disponibles : si le bloc est absent, ou si une entrée en est retirée, la couleur par défaut de ce raccourci est quand même utilisée.
- Vous pouvez remplacer un raccourci par défaut ou ajouter le vôtre. La `key` peut s'écrire avec ou sans chevrons (`primary` et `<primary>` sont équivalents).
- `color` est généralement une couleur hexadécimale (`'#24d65d'`, convertie en `<#24d65d>`). Une valeur qui commence par `<` est utilisée telle quelle : vous pouvez donc associer un raccourci à n'importe quelle balise MiniMessage (par exemple `'<gradient:#24d65d:#00ff00>'`).

## Stockage

| Clé | Type | Défaut | Description |
|-----|------|--------|-------------|
| `storage-type` | `SQLITE` \| `MYSQL` \| `MARIADB` | `SQLITE` | Type de base de données. Toute autre valeur bloque le démarrage. |
| `database-configuration.table-prefix` | Texte | `zahstats_` | Préfixe de toutes les tables de l'addon. Seuls les lettres, les chiffres et `_` sont autorisés. |
| `database-configuration.host` | Texte | `192.168.10.10` | Hôte de la base de données (MySQL/MariaDB). |
| `database-configuration.port` | Entier | `3306` | Port de la base de données (MySQL/MariaDB). |
| `database-configuration.user` | Texte | `homestead` | Utilisateur de la base de données (MySQL/MariaDB). |
| `database-configuration.password` | Texte | `secret` | Mot de passe de la base de données (MySQL/MariaDB). |
| `database-configuration.database` | Texte | `zauctionhouse` | Nom de la base de données (MySQL/MariaDB). |
| `database-configuration.max-pool-size` | Entier (min 1) | `4` | Taille maximale du pool de connexions (MySQL/MariaDB uniquement). |
| `database-configuration.min-idle` | Entier (min 0) | `2` | Nombre minimal de connexions inactives du pool (MySQL/MariaDB uniquement). |
| `database-configuration.debug` | Booléen | `false` | Affiche chaque requête SQL dans la console. |

- **SQLITE** stocke les données dans un fichier local, `plugins/zAuctionHouseStats/database.db`. Il est destiné à un serveur unique. Les clés `host`, `port`, `user`, `password`, `database`, `max-pool-size` et `min-idle` sont ignorées.
- **MYSQL / MARIADB** sont obligatoires dans une configuration multi-serveurs (plusieurs serveurs partageant une même base de données). Les compteurs sont écrits sous forme d'incréments atomiques, ce qui permet à plusieurs serveurs d'écrire dans la même base en toute sécurité. Si `zAuctionHouseRedis` est installé alors que l'addon utilise `SQLITE`, un avertissement dans la console rappelle que chaque serveur ne verra que ses propres statistiques.

<CalloutContainer type="warning">

<CalloutDescription>
Modifier `table-prefix` sur une base de données existante crée un nouveau jeu de tables **vides** sous le nouveau préfixe. Les anciennes tables ne sont ni renommées ni migrées.
</CalloutDescription>

</CalloutContainer>

### database-configuration.yml partagé

Si un fichier `database-configuration.yml` existe à la **racine du serveur** (le répertoire de travail du serveur), il remplace le bloc `database-configuration` de l'addon **clé par clé**, de la même manière que zAuctionHouse V4. Une clé absente de ce fichier reprend la valeur du `config.yml` de l'addon.

Les clés lues depuis ce fichier sont `host`, `port`, `user`, `password`, `database` et `debug`, sous une section `database-configuration:`.

<CalloutContainer type="info">

<CalloutDescription>
`table-prefix` n'est **jamais** lu depuis le fichier commun au serveur : il provient toujours du `config.yml` de l'addon, afin que les tables de statistiques ne se mélangent jamais avec les tables des autres plugins qui partagent ce fichier. `max-pool-size` et `min-idle` ne sont également lus que depuis le `config.yml` de l'addon.
</CalloutDescription>

</CalloutContainer>

## Collecte

L'addon collecte les statistiques depuis **une seule** source, choisie une fois au démarrage : les événements de stats de zAuctionHouse, ou la lecture périodique (polling) de la table des logs de zAuctionHouse. Il n'utilise jamais les deux en même temps : une vente n'est donc jamais comptée deux fois.

| Clé | Type | Défaut | Description |
|-----|------|--------|-------------|
| `collection.mode` | `AUTO` \| `EVENTS` \| `LOGS_POLLING` | `AUTO` | Source des statistiques. Toute autre valeur bloque le démarrage. |
| `collection.polling.enabled` | Booléen | `false` | Autorise ce serveur à lire la table des logs de zAuctionHouse. |
| `collection.polling.interval-seconds` | Entier (min 5) | `60` | Intervalle entre deux passes de lecture, en secondes. |
| `collection.polling.batch-size` | Entier (min 1) | `1000` | Lignes de logs lues par passe. |
| `collection.polling.decode-itemstacks` | Booléen | `false` | Décode l'objet de chaque ligne de log pour obtenir son matériau et sa quantité. Coûteux, exécuté hors du thread principal. |

Résolution du mode :

| `collection.mode` | zAuctionHouse expose les événements de stats | `polling.enabled` | Résultat |
|-------------------|----------------------------------------------|-------------------|----------|
| `AUTO` | Oui | Peu importe | Événements |
| `AUTO` | Non | `true` | Lecture des logs |
| `AUTO` | Non | `false` | L'addon se désactive |
| `EVENTS` | Oui | Peu importe | Événements |
| `EVENTS` | Non | Peu importe | L'addon se désactive |
| `LOGS_POLLING` | Peu importe | `true` | Lecture des logs |
| `LOGS_POLLING` | Peu importe | `false` | Aucune collecte sur ce serveur |

<CalloutContainer type="warning">

<CalloutDescription>
La lecture des logs est un mode **dégradé** : les montants sont approximatifs (le prix de mise en vente est utilisé, les taxes sont inconnues) et les expirations ne sont pas suivies. Mettez à jour zAuctionHouse pour obtenir des statistiques exactes grâce aux événements. Dans une configuration multi-serveurs, activez la lecture des logs sur **un seul** serveur : définissez `mode: LOGS_POLLING` partout et `polling.enabled: true` sur un seul serveur.
</CalloutDescription>

</CalloutContainer>

## Flush

Les événements sont mis en file d'attente en mémoire et écrits en base de données par lots.

| Clé | Type | Défaut | Description |
|-----|------|--------|-------------|
| `flush.interval-seconds` | Entier (min 1) | `2` | Intervalle entre deux écritures de la file en base de données, en secondes. |
| `flush.max-pending` | Entier (min 1) | `100` | Écrit la file en avance dès que ce nombre d'événements est en attente. |

## Caches

Les commandes, les placeholders et les menus lisent depuis des caches en mémoire, jamais directement depuis la base de données. Lorsqu'une entrée expire, elle est rafraîchie de manière asynchrone et les lecteurs conservent la valeur précédente en attendant : un placeholder n'attend jamais une requête en base de données. Toutes les durées sont en secondes (minimum 1).

| Clé | Défaut | Données en cache |
|-----|--------|------------------|
| `caches.leaderboard-ttl-seconds` | `60` | Un classement calculé (par métrique, période et économie). |
| `caches.player-stats-ttl-seconds` | `60` | Les statistiques d'un joueur (`/zahstats player`, menu `player-stats`, placeholders joueur). |
| `caches.player-stats-offline-ttl-seconds` | `60` | Les statistiques d'un joueur **hors ligne** consultées via un placeholder. |
| `caches.material-price-ttl-seconds` | `3600` | Les statistiques de prix par matériau (`/ah price`, menu `item-prices`, placeholders de matériau) et la liste des matériaux de l'explorateur de prix. |
| `caches.global-stats-ttl-seconds` | `60` | Les statistiques globales du serveur. L'activité de votre propre serveur est reflétée immédiatement ; la valeur est relue depuis la base de données à cet intervalle pour inclure les autres serveurs d'un cluster. |

## Classements

| Clé | Type | Défaut | Description |
|-----|------|--------|-------------|
| `leaderboards.size` | Entier [1, 100] | `10` | Nombre d'entrées conservées par classement. Les menus sont paginés au-delà de 10 entrées ; l'affichage chat de `/zahstats top` est limité à 10. Les valeurs hors limites sont ramenées à la borne la plus proche. |
| `leaderboards.unknown-name` | Texte | `?` | Nom affiché lorsque le nom d'un joueur est inconnu. |
| `leaderboards.default-economy` | Texte | `""` | Économie utilisée lorsqu'un placeholder ou un menu monétaire n'en précise pas. Vide = l'économie par défaut de zAuctionHouse. |
| `leaderboards.preload` | Liste | Voir ci-dessous | Classements calculés en arrière-plan au démarrage. |
| `leaderboards.disabled` | Liste de métriques | `[]` | Classements désactivés. |
| `leaderboards.player-heads` | Booléen | `true` | Interrupteur global des têtes de joueurs texturées dans les menus. Peut aussi être désactivé par bouton (voir [Inventaires](/zauctionhouse/addons/stats/inventories)). |
| `leaderboards.default-head-url` | Texte (base64) | `""` | Texture de tête utilisée lorsqu'un profil joueur est introuvable. Vide = tête par défaut du client. |

Métriques disponibles (pour `preload`, `disabled` et les commandes) :

| Métrique | Description | Métrique monétaire |
|----------|-------------|--------------------|
| `TOP_SELLERS_MONEY` | Argent gagné par les vendeurs, après taxes | Oui |
| `TOP_BUYERS_MONEY` | Argent dépensé par les acheteurs, taxes incluses | Oui |
| `TOP_SELLERS_COUNT` | Nombre de ventes réalisées en tant que vendeur | Non |
| `TOP_BUYERS_COUNT` | Nombre d'achats réalisés en tant qu'acheteur | Non |
| `TOP_TAX_PAID` | Total des taxes payées | Oui |
| `BIGGEST_SALE` | Plus grosse vente unique reçue par un vendeur | Oui |

Périodes disponibles : `DAY` (aujourd'hui, depuis minuit), `WEEK` (depuis lundi), `MONTH` (depuis le 1er du mois) et `ALL` (depuis toujours). Les périodes sont des fenêtres calendaires dans le fuseau horaire `statistics.timezone`.

### preload

Chaque entrée s'écrit `{ metric: <METRIC>, period: <PERIOD>[, economy: <nom>] }` :

```yaml
leaderboards:
  preload:
    - { metric: TOP_SELLERS_MONEY, period: ALL }
    - { metric: TOP_SELLERS_MONEY, period: DAY }
    - { metric: TOP_BUYERS_MONEY, period: ALL }
    - { metric: TOP_SELLERS_COUNT, period: WEEK, economy: vault }
```

- `period` est optionnel et vaut `ALL` par défaut.
- Sans `economy`, les métriques monétaires utilisent l'économie par défaut et les métriques de comptage couvrent toutes les économies.
- Le préchargement ne bloque jamais le démarrage du serveur : tant qu'il n'est pas terminé, les placeholders affichent `placeholders.loading`.
- Une entrée invalide (métrique ou période inconnue) est ignorée avec un avertissement dans la console. Les métriques désactivées ne sont pas préchargées.

### disabled

```yaml
leaderboards:
  disabled:
    - TOP_TAX_PAID
    - BIGGEST_SALE
```

Une métrique désactivée est retirée du sélecteur de métrique du menu de classement, ses placeholders `top` renvoient `placeholders.not-applicable`, `/zahstats top` répond avec le message `top-disabled`, et l'API renvoie une liste vide. Les noms de métriques inconnus sont ignorés avec un avertissement dans la console.

## Statistiques

| Clé | Type | Défaut | Description |
|-----|------|--------|-------------|
| `statistics.timezone` | Texte | `""` | Fuseau horaire des agrégats journaliers utilisés par les périodes `DAY`, `WEEK` et `MONTH`, et des dates affichées par les placeholders. Vide = fuseau horaire du serveur. Exemple : `"Europe/Paris"`. Un fuseau horaire invalide bloque le démarrage. |
| `statistics.save-itemstacks` | Booléen | `false` | Stocke l'objet complet (Base64) de chaque vente. Avec `false`, seules les colonnes interrogeables sont écrites (matériau, quantité, custom model data, catégorie, nom de l'objet), ce qui garde la table des ventes légère. `true` rend la table beaucoup plus lourde. |
| `statistics.material-prices.max-entries` | Entier (min 1) | `1000` | Nombre maximal d'entrées du cache de prix par matériau (les entrées les moins récemment utilisées sont évincées). Il n'est jamais inférieur à `item-prices.top-limit` : une valeur inférieure est relevée automatiquement avec un avertissement. |
| `statistics.material-prices.median-sample-limit` | Entier (min 1) | `50000` | Nombre maximal de prix lus pour calculer une médiane. |

<CalloutContainer type="error">

<CalloutDescription>
Ne modifiez **pas** `statistics.timezone` une fois que l'addon a enregistré des données. Les jours déjà agrégés ne sont pas recalculés : vos statistiques journalières, hebdomadaires et mensuelles seraient donc décalées.
</CalloutDescription>

</CalloutContainer>

## Explorateur de prix

| Clé | Type | Défaut | Description |
|-----|------|--------|-------------|
| `item-prices.top-limit` | Entier [1, 500] | `100` | Nombre de matériaux listés par le menu `item-prices` : les matériaux les plus vendus de la sélection en cours (économie, période). Les valeurs hors limites sont ramenées à la borne la plus proche. |

## Rétention

| Clé | Type | Défaut | Description |
|-----|------|--------|-------------|
| `retention.sales-days` | Entier (min 0) | `0` | Purge quotidienne des lignes individuelles de ventes et de mises en vente de plus de N jours. `0` = tout conserver. |

- La purge s'exécute de manière asynchrone une fois par jour, en commençant 10 minutes après le démarrage du serveur.
- Les totaux journaliers et les totaux depuis toujours sont **toujours** conservés : les classements et les périodes survivent donc à la purge.
- Le classement `BIGGEST_SALE` pour les périodes `DAY`, `WEEK` et `MONTH` est calculé à partir des ventes individuelles. Avec une valeur entre 1 et 34, le classement mensuel devient incomplet et un avertissement s'affiche dans la console. Utilisez `0` ou au moins `35`.
- Vous pouvez aussi purger manuellement avec `/zahstats purge <days> confirm` (voir [Commandes & Permissions](/zauctionhouse/addons/stats/commands-permissions)).

## Import

Ces paramètres sont utilisés par `/zahstats import v1` et `/zahstats import v4logs`. Ils sont relus à chaque rechargement et s'appliquent au prochain import. Voir [Migration](/zauctionhouse/addons/stats/migration) pour la procédure complète.

| Clé | Type | Défaut | Description |
|-----|------|--------|-------------|
| `import.chunk-size` | Entier [1, 500] | `500` | Lignes source lues par transaction. Les valeurs hors limites sont ramenées à la borne la plus proche. |
| `import.pause-between-chunks-ms` | Entier (min 0) | `50` | Pause entre deux lots, en millisecondes, pour limiter la charge sur la base de données. |
| `import.log-every-rows` | Entier (min 1) | `10000` | Fréquence d'écriture d'une ligne de progression dans la console. |
| `import.v1.server-name` | Texte | `v1-import` | Nom de serveur attribué aux lignes V1 importées. Il garde l'historique V1 séparé dans les statistiques par serveur et indique la provenance des lignes. |
| `import.v1.listing-outcome-heuristic` | Booléen | `true` | Reconstitue l'issue des mises en vente V1 (vendue, expirée...). |
| `import.v1.database.enabled` | Booléen | `false` | Lit les tables V1 `zah_*` depuis une autre base de données que celle de `database-configuration`. |
| `import.v1.database.type` | `MYSQL` \| `MARIADB` \| `SQLITE` | `MYSQL` | Type de cette base de données. Avec `SQLITE`, `database` est le nom du fichier dans le dossier de l'addon. |
| `import.v1.database.host` | Texte | `localhost` | Hôte de cette base de données. |
| `import.v1.database.port` | Entier | `3306` | Port de cette base de données. |
| `import.v1.database.user` | Texte | `""` | Utilisateur de cette base de données. |
| `import.v1.database.password` | Texte | `""` | Mot de passe de cette base de données. |
| `import.v1.database.database` | Texte | `""` | Nom de cette base de données (ou nom du fichier SQLite). |
| `import.v4logs.include-migrated-v3` | Booléen | `false` | Importe aussi les logs de zAuctionHouse migrés depuis la V3. Ne l'activez **pas** si vous utilisez aussi `import v1`, sinon ces achats seraient comptés deux fois (l'import est refusé dans ce cas). |
| `import.v4logs.resolve-amounts-from-transactions` | Booléen | `true` | Corrige les montants acheteur et vendeur à partir des transactions de zAuctionHouse lorsque c'est possible. |
| `import.v4logs.server-name-fallback` | Texte | `v4-import` | Nom de serveur utilisé lorsque la ligne d'origine de l'objet est absente. |

## Placeholders

Ces paramètres contrôlent les textes et le format renvoyés par les [placeholders](/zauctionhouse/addons/stats/placeholders). Certains sont aussi utilisés par les menus et les commandes.

| Clé | Type | Défaut | Description |
|-----|------|--------|-------------|
| `placeholders.loading` | Texte | `Loading...` | Affiché tant qu'une valeur n'est pas encore calculée (cache vide). |
| `placeholders.no-name` | Texte | `✘` | Nom affiché pour un rang sans joueur (le classement est plus court que le rang demandé). |
| `placeholders.no-value` | Texte | `0` | Valeur affichée lorsqu'un nombre est manquant (rang sans joueur, aucun joueur dans le contexte). |
| `placeholders.not-applicable` | Texte | `N/A` | Affiché lorsque la donnée n'existe pas (économie inconnue, classement désactivé, aucune vente d'un matériau, date qui n'a jamais eu lieu). |
| `placeholders.enable-not-applicable` | Booléen | `true` | `false` masque le texte `not-applicable` : les placeholders affichent `0` à la place, et les menus affichent `no-value` à la place. |
| `placeholders.date-format` | Texte | `dd/MM/yyyy HH:mm` | Format des dates affichées par les placeholders, le menu `player-stats` et `/zahstats player` (motif [Java DateTimeFormatter](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/DateTimeFormatter.html)), rendu dans `statistics.timezone`. Un motif invalide revient à la valeur par défaut avec un avertissement. |
| `placeholders.enable-v1-aliases` | Booléen | `true` | Garde fonctionnels les noms de placeholders de zAuctionHouseStats V1. `false` désactive cette table de compatibilité. |

## messages.yml

`messages.yml` contient tous les messages de chat de l'addon. Il est généré au premier démarrage dans la langue choisie dans `language.yml`.

### Format

Les messages utilisent le même format que le `messages.yml` de zAuctionHouse V4 :

- **MiniMessage** : `<red>`, `<bold>`, `<gradient:red:blue>`, `<hover:show_text:'text'>`, `<click:run_command:'/cmd'>`... Voir le [format MiniMessage](https://docs.advntr.dev/minimessage/format.html).
- **Couleurs hexadécimales** : `<#RRGGBB>`.
- **Raccourcis de couleur** : `<primary>`, `<secondary>`, `<error>`, `<success>` et tout raccourci que vous ajoutez dans `config.yml` (`message-colors`).
- **Codes legacy** : `&a`, `&l`, `§c` et `&#RRGGBB` sont tolérés (convertis en MiniMessage) mais déconseillés.

Règles :

- `%prefix%` est remplacé par la valeur de la clé `prefix`. Définissez `prefix: ""` pour désactiver le préfixe.
- Un message **vide** (`""`) n'est pas envoyé.
- `price-informations` est une liste : chaque ligne est envoyée comme un message séparé.
- Une clé absente de votre fichier (par exemple après une mise à jour) utilise la valeur par défaut fournie avec l'addon, dans la même langue.
- Les valeurs qui proviennent des joueurs (noms de joueurs, économies saisies...) sont toujours affichées en texte brut : les balises MiniMessage ou codes couleur qu'elles contiennent ne sont pas interprétés.
- Une balise MiniMessage invalide ne casse jamais un message : le texte est affiché tel quel.

### Clés des messages

| Clé | Placeholders | Utilisé lorsque |
|-----|--------------|-----------------|
| `prefix` | - | Préfixe inséré avec `%prefix%` |
| `command-syntax-error` | `%syntax%` | Une commande est utilisée avec de mauvais arguments |
| `command-no-permission` | - | L'expéditeur n'a pas la permission |
| `command-no-console` | - | Une commande réservée aux joueurs est exécutée depuis la console |
| `command-unknown` | `%command%` | Sous-commande inconnue |
| `plugin-not-ready` | - | L'addon n'est pas encore complètement démarré |
| `economy-unknown` | `%economy%` | Économie inconnue |
| `economy-all` | - | Libellé utilisé lorsqu'un classement de comptage couvre toutes les économies |
| `help-header` | - | En-tête de `/zahstats help` |
| `help-line` | `%syntax%`, `%description%` | Une ligne de l'aide |
| `command-description.help` | - | Description d'aide de `/zahstats help` |
| `command-description.top` | - | Description d'aide de `/zahstats top` |
| `command-description.player` | - | Description d'aide de `/zahstats player` |
| `command-description.items` | - | Description d'aide de `/zahstats items` |
| `command-description.reload` | - | Description d'aide de `/zahstats reload` |
| `command-description.clearcache` | - | Description d'aide de `/zahstats clearcache` |
| `command-description.import` | - | Description d'aide de `/zahstats import` |
| `command-description.purge` | - | Description d'aide de `/zahstats purge` |
| `command-description.ah-stats` | - | Description d'aide de `/ah stats` |
| `command-description.ah-price` | - | Description d'aide de `/ah price` |
| `top-header` | `%metric%`, `%period%`, `%economy%` | En-tête de `/zahstats top` |
| `top-line` | `%rank%`, `%name%`, `%value%` | Une ligne de `/zahstats top` |
| `top-empty` | - | Le classement n'a aucune donnée |
| `top-loading` | - | Le classement est en cours de calcul |
| `top-disabled` | `%metric%` | Le classement est désactivé dans `leaderboards.disabled` |
| `top-metric-unknown` | `%metric%`, `%metrics%` | Métrique inconnue |
| `top-period-unknown` | `%period%` | Période inconnue |
| `metric-name.top-sellers-money` | - | Libellé de `TOP_SELLERS_MONEY` |
| `metric-name.top-buyers-money` | - | Libellé de `TOP_BUYERS_MONEY` |
| `metric-name.top-sellers-count` | - | Libellé de `TOP_SELLERS_COUNT` |
| `metric-name.top-buyers-count` | - | Libellé de `TOP_BUYERS_COUNT` |
| `metric-name.top-tax-paid` | - | Libellé de `TOP_TAX_PAID` |
| `metric-name.biggest-sale` | - | Libellé de `BIGGEST_SALE` |
| `period-name.day` | - | Libellé de `DAY` |
| `period-name.week` | - | Libellé de `WEEK` |
| `period-name.month` | - | Libellé de `MONTH` |
| `period-name.all` | - | Libellé de `ALL` |
| `player-header` | `%player%`, `%economy%` | En-tête de `/zahstats player` |
| `player-line-listed` | `%listed%`, `%sold%`, `%conversion%` | Objets mis en vente / vendus et taux de conversion |
| `player-line-bought` | `%bought%` | Objets achetés |
| `player-line-money` | `%earned%`, `%spent%` | Argent gagné et dépensé |
| `player-line-tax` | `%tax%`, `%biggest%` | Taxes payées et plus grosse vente |
| `player-line-dates` | `%first-sale%`, `%last-sale%` | Dates de la première et de la dernière vente |
| `player-not-found` | `%name%` | Le joueur n'a jamais été vu par l'hôtel des ventes |
| `player-empty` | `%player%` | Le joueur n'a encore aucune statistique |
| `player-loading` | `%name%` | Les statistiques du joueur sont en cours de chargement |
| `player-never` | - | Affiché à la place d'une date qui n'a jamais eu lieu |
| `price-error` | - | `/ah price` sans objet dans la main principale |
| `price-economy-unknown` | `%economy%` | `/ah price` avec une économie inconnue |
| `price-informations` | `%itemName%`, `%economy%`, `%amount%`, `%average%`, `%median%` | Résultat de `/ah price` (liste de lignes) |
| `price-no-data` | `%itemName%`, `%economy%` | Aucune vente enregistrée pour cet objet |
| `reload-success` | - | `/zahstats reload` a réussi |
| `reload-error` | - | `/zahstats reload` a échoué, la configuration précédente reste active |
| `reload-menus-error` | - | Configuration et messages rechargés, mais un menu est invalide |
| `cache-cleared` | - | `/zahstats clearcache` a réussi |
| `import-confirm` | `%rows%`, `%source%`, `%warning%` | Aperçu de l'import, demande `confirm` |
| `import-warning-v1` | - | Avertissement inséré dans `%warning%` pour `v1` |
| `import-warning-v4logs` | - | Avertissement inséré dans `%warning%` pour `v4logs` |
| `import-estimate` | `%duration%` | Durée estimée de l'import |
| `import-migrated-v3-excluded` | `%count%` | Les logs migrés depuis la V3 sont ignorés |
| `import-migrated-v3-included` | `%count%` | Les logs migrés depuis la V3 seront importés |
| `import-warning-v1-tables-missing` | - | Aucune table `zah_*` trouvée dans la base de données V1 |
| `import-warning-migrated-v3-double-count` | `%count%` | Les logs migrés depuis la V3 seraient comptés deux fois |
| `import-started` | `%source%` | L'import a démarré |
| `import-progress` | `%source%`, `%processed%`, `%total%`, `%percent%`, `%remaining%`, `%failed%` | Ligne de progression dans la console |
| `import-finished` | `%source%`, `%processed%` | L'import est terminé |
| `import-already-done` | `%source%` | Cet import a déjà été effectué sur cette base de données |
| `import-locked` | `%source%` | L'import est déjà en cours sur un autre serveur |
| `import-failed` | `%source%`, `%error%` | L'import a échoué |
| `import-unknown-source` | `%source%` | Source d'import inconnue |
| `import-unavailable` | `%source%` | L'import n'est pas disponible |
| `purge-confirm` | `%count%`, `%days%` | Aperçu de la purge, demande `confirm` |
| `purge-success` | `%deleted%`, `%days%` | La purge est terminée |
| `purge-invalid-days` | `%days%` | Nombre de jours invalide |
| `purge-failed` | `%error%` | La purge a échoué |
| `purge-unavailable` | - | La purge n'est pas disponible |
| `version-available` | `%version%`, `%latest%` | Envoyé à la connexion aux joueurs ayant `zplugin.notifs` lorsqu'une nouvelle version de l'addon est disponible (voir `enable-version-checker`) |

Les libellés `metric-name.*` et `period-name.*` sont aussi utilisés pour remplir `%metric%` et `%period%` dans les autres messages, ainsi que par les placeholders formatés.

## language.yml

`language.yml` choisit la langue des fichiers par défaut générés au premier démarrage : `messages.yml`, le dossier `inventories/` et le dossier `patterns/`. Il fonctionne comme le `language.yml` de zAuctionHouse V4.

```yaml
# Options disponibles :
#   - auto : détection à partir du pays/de la locale du serveur
#   - en   : anglais (par défaut)
#   - fr   : français
#   - es   : espagnol
#   - it   : italien
language: auto
```

| Valeur | Langue |
|--------|--------|
| `auto` (par défaut) | Détectée à partir de la locale du serveur |
| `en` | Anglais |
| `fr` | Français |
| `es` | Espagnol |
| `it` | Italien |

Avec `auto`, l'addon utilise d'abord le pays de la locale du serveur (JVM), puis sa langue :

| Langue détectée | Pays |
|-----------------|------|
| Français (`fr`) | France, Belgique, Suisse, Canada, Luxembourg, Monaco, et les pays et territoires francophones d'Afrique, des Caraïbes et du Pacifique (Sénégal, Côte d'Ivoire, Cameroun, Madagascar, Haïti, La Réunion, Guadeloupe, Martinique, Guyane, Polynésie française, Nouvelle-Calédonie...) |
| Espagnol (`es`) | Espagne, Mexique, Argentine, Chili, Colombie, Pérou, Venezuela et les autres pays hispanophones d'Amérique latine, Porto Rico, Guinée équatoriale |
| Italien (`it`) | Italie, Saint-Marin, Vatican |
| Anglais (`en`) | Tous les autres pays, sauf si la langue de la locale est elle-même `fr`, `es` ou `it` |

Une langue explicite qui n'est pas fournie (par exemple `de`) revient à l'anglais avec un avertissement dans la console.

### Changer la langue

La langue ne s'applique qu'aux fichiers qui **n'existent pas encore**. Vos fichiers existants ne sont jamais écrasés. Pour changer de langue :

1. Modifiez `language` dans `language.yml`.
2. Supprimez `messages.yml` ainsi que les dossiers `inventories/` et `patterns/` dans `plugins/zAuctionHouseStats/` (sauvegardez-les d'abord si vous les avez personnalisés).
3. **Redémarrez** le serveur. Les fichiers sont régénérés dans la nouvelle langue.

<CalloutContainer type="info">

<CalloutDescription>
`/zahstats reload` ne change **pas** la langue. Si `language.yml` a été modifié, le rechargement affiche seulement un rappel des étapes ci-dessus dans la console. `config.yml` et `language.yml` eux-mêmes ne sont fournis qu'en anglais.
</CalloutDescription>

</CalloutContainer>

### Traduire

Pour traduire ou reformuler les messages, modifiez directement `plugins/zAuctionHouseStats/messages.yml` puis exécutez `/zahstats reload`. Vous pouvez partir de n'importe quelle langue fournie (`en`, `fr`, `es`, `it`) et la traduire dans une autre : chaque clé est disponible dans les quatre langues, et une clé que vous supprimez reprend la valeur par défaut fournie dans la langue sélectionnée.

## Ce que recharge /zahstats reload

`/zahstats reload` (permission `zauctionhouse.stats.reload`) applique la plupart des changements sans redémarrage. Il n'exécute jamais de requête en base de données sur le thread de la commande.

| Rechargé | Détails |
|----------|---------|
| `config.yml` | Lu et validé **avant** tout changement. S'il est invalide (erreur YAML ou valeur invalide), le rechargement est annulé, la configuration précédente reste active et `reload-error` est envoyé. |
| Caches | Les durées, les tailles, les classements désactivés, `unknown-name`, `default-economy`, `statistics.material-prices.*` et la limite de l'explorateur de prix sont appliqués. Les données en cache elles-mêmes ne sont **pas** vidées (utilisez `/zahstats clearcache` pour cela). `leaderboards.preload` n'est utilisé qu'au démarrage. |
| Têtes de joueurs | `leaderboards.player-heads` et `leaderboards.default-head-url` sont appliqués au prochain affichage d'un menu. |
| Flush | `flush.interval-seconds` et `flush.max-pending` sont appliqués. |
| Debug | `debug` est appliqué. |
| `messages.yml` et `message-colors` | Rechargés. |
| Paramètres d'import | Le bloc `import` s'applique au prochain import. |
| Placeholders | `placeholders.*` (textes de repli, format de date, alias V1) sont appliqués. |
| Menus | Les fichiers `inventories/` et `patterns/` sont rechargés. Si un menu est invalide, la configuration et les messages restent appliqués et `reload-menus-error` est envoyé. |

Ces paramètres ne sont lus qu'au démarrage. Les modifier nécessite un **redémarrage du serveur**, et le rechargement affiche un avertissement dans la console lorsqu'ils ont changé :

| Paramètre | |
|-----------|-|
| `storage-type` et tout le bloc `database-configuration` | Redémarrage nécessaire |
| `collection.*` | Redémarrage nécessaire |
| `statistics.timezone` | Redémarrage nécessaire (et ne jamais le modifier une fois que des données existent) |
| `statistics.save-itemstacks` | Redémarrage nécessaire |
| `retention.sales-days` | Redémarrage nécessaire |
| `language.yml` | Supprimer les fichiers générés, puis redémarrer (voir [Changer la langue](#changer-la-langue)) |

`enable-version-checker` n'est lu lui aussi qu'au démarrage, mais sa modification n'affiche aucun avertissement lors du rechargement.
