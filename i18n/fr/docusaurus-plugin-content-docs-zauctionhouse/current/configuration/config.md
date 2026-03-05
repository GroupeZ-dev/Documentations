---
sidebar_position: 1
title: Configuration Principale
description: Options de configuration principales pour zAuctionHouse V4
---

# Configuration Principale

Le fichier de configuration principal `config.yml` contrôle le comportement central de zAuctionHouse V4.

## Debug & Monitoring

```yaml
# Active les logs détaillés et messages d'erreur dans la console
enable-debug: false

# Active le monitoring de performance et la journalisation
# Enregistre les temps d'exécution pour les opérations lourdes
enable-performance-debug: false

# Active la vérification automatique des versions
enable-version-checker: true

# Configuration du filtre de debug de performance
performance-debug:
  filter:
    # Mode de filtre : DISABLED, WHITELIST, BLACKLIST
    mode: DISABLED
    # Liste des opérations à filtrer (supporte les wildcards)
    operations:
      - "loadItems.*"
      - "SortedItemsCache.*"
```

### Opérations de Performance

Noms d'opérations disponibles pour le filtrage :

| Opération | Description |
|-----------|-------------|
| `loadItems.loadPlayers` | Temps de chargement des données joueur |
| `loadItems.loadItemsFromDB` | Temps de chargement des objets depuis la base de données |
| `loadItems.processItems` | Temps de traitement des objets chargés |
| `loadItems.total` | Temps total de chargement |
| `loadItems.rebuildSortedItemsCache` | Temps de reconstruction du cache trié |
| `SortedItemsCache.rebuild` | Temps de reconstruction du cache d'objets triés |
| `applyCategories` | Temps d'application des filtres de catégorie |
| `computeCategoryCount[categoryId]` | Temps de comptage des objets par catégorie |
| `openInventory.<nom fichier>` | Temps d'ouverture d'un inventaire spécifique |

## Paramètres Généraux

```yaml
# Format de date pour les horodatages (Java SimpleDateFormat)
# Exemples :
#   "dd/MM/yyyy HH:mm:ss" -> "25/12/2024 14:30:45"
#   "MM-dd-yyyy hh:mm a"  -> "12-25-2024 02:30 PM"
date-format: dd/MM/yyyy HH:mm:ss
```

## Configuration de la Base de Données

```yaml
# Type de stockage : SQLITE, MYSQL, MARIADB
storage-type: SQLITE

# Nom du serveur pour les configurations multi-serveur
server-name: skyblock

# Paramètres de connexion à la base de données (MySQL/MariaDB uniquement)
database-configuration:
  table-prefix: zauctionhouse_
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zauctionhouse
  debug: false
```

### Types de Stockage

| Type | Description | Idéal pour |
|------|-------------|------------|
| `SQLITE` | Base de données locale basée sur fichier | Serveur unique, aucune configuration requise |
| `MYSQL` | Serveur de base de données MySQL | Multi-serveur, grands hôtels des ventes |
| `MARIADB` | Serveur de base de données MariaDB | Multi-serveur, grands hôtels des ventes |

:::info
Pour la synchronisation multi-serveur, utilisez MySQL/MariaDB avec l'addon Redis.
:::

## Couleurs des Messages

Définissez des raccourcis de couleur personnalisés pour les messages :

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

Utilisez-les dans n'importe quel message : `<primary>Bienvenue <secondary>à l'hôtel des ventes !`

## Configuration des Commandes

:::warning
Un redémarrage du serveur est requis après modification des paramètres de commandes !
:::

```yaml
commands:
  main-command:
    aliases:
      - ah
      - hdv
      - auction
      - zauction

  sell:
    # Ouvrir l'interface quand on exécute /ah sell sans arguments
    enable-sell-inventory: false
    aliases:
      - sell
      - s
      - vendre
    arguments:
      - name: price
        display-name: prix
        required: true
        auto-completion:
          - 1000
          - 10000
          - 25000
      - name: amount
        display-name: quantité
        required: false
        auto-completion:
          - '1'
          - '%max-stack-size%'
      - name: economy
        display-name: économie
        required: false
        auto-completion:
          - vault

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

### Commandes d'Inventaire Personnalisées

Créez des raccourcis vers des inventaires spécifiques :

```yaml
  inventories:
    - enable: true
      permission: "zauctionhouse.selling"
      description: "Ouvrir les objets en vente"
      aliases:
        - 'selling'
      inventory: SELLING_ITEMS

    - enable: true
      permission: "zauctionhouse.expired"
      description: "Ouvrir les objets expirés"
      aliases:
        - 'expired'
      inventory: EXPIRED_ITEMS

    - enable: true
      permission: "zauctionhouse.purchased"
      description: "Ouvrir les objets achetés"
      aliases:
        - 'purchased'
      inventory: PURCHASED_ITEMS

    - enable: true
      permission: "zauctionhouse.history"
      description: "Ouvrir l'historique"
      aliases:
        - 'history'
      inventory: HISTORY
```

## Raccourcis de Prix

Permettez aux joueurs d'utiliser une notation abrégée pour les grands prix :

```yaml
number-sell-multiplication:
  enable: true
  formats:
    - format: K
      multiplication: 1000
    - format: M
      multiplication: 1000000
    - format: B
      multiplication: 1000000000
    - format: T
      multiplication: 1000000000000
    # ... continue jusqu'à TR (Tredecillion)
```

**Exemples :**
- `/ah sell 1K` = 1 000
- `/ah sell 2.5M` = 2 500 000
- `/ah sell 1B` = 1 000 000 000

## Paramètres d'Expiration

Tous les temps sont en **secondes**.

```yaml
expiration:
  # Annonces de vente
  auction:
    default-expiration: 172800  # 2 jours
    permission:
      enable: false
      permissions:
        - permission: zauctionhouse.expiration.vip
          expiration: 3600       # 1 heure
        - permission: zauctionhouse.expiration.elite
          expiration: 7200       # 2 heures
        - permission: zauctionhouse.expiration.legend
          expiration: 259200     # 3 jours

  # Annonces d'enchères (fonctionnalité future)
  bid:
    default-expiration: 172800

  # Annonces de location (fonctionnalité future)
  rent:
    default-expiration: 172800

  # Nettoyage des objets expirés
  expire:
    default-expiration: 604800   # 1 semaine

  # Nettoyage des objets achetés
  purchase:
    default-expiration: 604800   # 1 semaine
```

### Valeurs de Temps Courantes

| Temps | Secondes |
|-------|----------|
| 1 heure | 3600 |
| 1 jour | 86400 |
| 2 jours | 172800 |
| 3 jours | 259200 |
| 1 semaine | 604800 |
| 30 jours | 2592000 |

## Limites d'Objets

Configurez combien d'objets les joueurs peuvent mettre en vente :

```yaml
permissions:
  auction:
    - permission: zauctionhouse.max.5
      limit: 5
    - permission: zauctionhouse.max.10
      limit: 10
    - permission: zauctionhouse.max.15
      limit: 15

  rent:
    - permission: zauctionhouse.max.5
      limit: 5
    # ...

  bid:
    - permission: zauctionhouse.max.5
      limit: 5
    # ...
```

## Restrictions de Monde

Empêchez la mise en vente d'objets dans des mondes spécifiques (les joueurs peuvent toujours parcourir/acheter) :

```yaml
banned-worlds:
  auction:
    - "world_the_end"
  rent:
    - "world_the_end"
  bid:
    - "world_the_end"
```

## Lore d'Affichage des Objets

Personnalisez le lore ajouté aux objets dans l'hôtel des ventes :

```yaml
item-lore:
  # Objets dans la liste principale
  listed-auction-item:
    - ""
    - "<white>⌂ #92ffffVendeur#8c8c8c: #2CCED2%seller%"
    - "<white>☆ #92ffffPrix#8c8c8c: #2CCED2%price%"
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "%status%"

  # Ventes en masse (plusieurs objets)
  multiple-listed-auction-item:
    - ""
    - "<white>⌂ #92ffffVendeur#8c8c8c: #2CCED2%seller%"
    - "<white>☆ #92ffffPrix#8c8c8c: #2CCED2%price%"
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "#8c8c8c• #2CCED2ᴄʟɪᴄ ɢᴀᴜᴄʜᴇ #92ffffᴘᴏᴜʀ ᴠᴏɪʀ ʟᴇ ᴄᴏɴᴛᴇɴᴜ"
    - "%status%"

  # Objets expirés
  expired-item:
    - ""
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "#8c8c8c• #2CCED2Cliquez pour récupérer cet objet"

  # Objets achetés
  purchased-item:
    - ""
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "#8c8c8c• #2CCED2Cliquez pour récupérer cet objet"

  # Vos objets en vente
  selling-item:
    - ""
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "#8c8c8c• #2CCED2Cliquez pour récupérer cet objet"

  # Objet en cours d'achat
  being-purchased-item:
    - ""
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "#8c8c8c• #ff3535Votre objet est en cours d'achat, vous ne pouvez pas le récupérer."

  # Objets dans l'historique
  history-item:
    - ""
    - "<white>⌂ #92ffffAcheteur#8c8c8c: #2CCED2%buyer%"
    - "<white>☆ #92ffffPrix#8c8c8c: #2CCED2%price%"
    - "<white>⌚ #92ffffDate#8c8c8c: #969696%date%"

  # Messages de statut dynamiques
  status:
    seller: "#8c8c8c• #2CCED2ᴄʟɪᴄ #92ffffᴘᴏᴜʀ ʀᴇ́ᴄᴜᴘᴇ́ʀᴇʀ ᴄᴇᴛ ᴏʙᴊᴇᴛ"
    buyer: "#8c8c8c• #2CCED2ᴄʟɪᴄ #92ffffᴘᴏᴜʀ ᴀᴄʜᴇᴛᴇʀ ᴄᴇᴛ ᴏʙᴊᴇᴛ"
    right-seller: "#8c8c8c• #2CCED2ᴄʟɪᴄ ᴅʀᴏɪᴛ #92ffffᴘᴏᴜʀ ʀᴇ́ᴄᴜᴘᴇ́ʀᴇʀ ᴄᴇᴛ ᴏʙᴊᴇᴛ"
    right-buyer: "#8c8c8c• #2CCED2ᴄʟɪᴄ ᴅʀᴏɪᴛ #92ffffᴘᴏᴜʀ ᴀᴄʜᴇᴛᴇʀ ᴄᴇᴛ ᴏʙᴊᴇᴛ"

  # Noms des types de log
  log-type-names:
    SALE: "Objet Mis en Vente"
    PURCHASE: "Objet Acheté"
    REMOVE_LISTED: "Retiré de la Vente"
    REMOVE_SELLING: "Objet en Vente Récupéré"
    REMOVE_EXPIRED: "Objet Expiré Récupéré"
    REMOVE_PURCHASED: "Achat Récupéré"
```

### Placeholders Disponibles

| Placeholder | Description |
|-------------|-------------|
| `%seller%` | Nom du vendeur |
| `%buyer%` | Nom de l'acheteur |
| `%price%` | Prix formaté |
| `%time-remaining%` | Temps avant expiration |
| `%date%` | Date de la transaction |
| `%status%` | Message d'action dynamique |
| `%items%` | Noms d'affichage des objets |
| `%type%` | Type d'entrée de log |
| `%player%` | Joueur impliqué |
| `%target%` | Joueur cible (admin) |

## Format de Temps

Configurez l'affichage du temps :

```yaml
time:
  second: seconde
  seconds: secondes
  minute: minute
  minutes: minutes
  hour: heure
  hours: heures
  day: jour
  days: jours

  # Chaînes de format (style printf)
  time-day: '%02dᴊ %02dʜ %02dᴍ'      # >= 1 jour
  time-hour: '%02dʜ %02dᴍ %02ds'     # >= 1 heure
  time-minute: '%02dᴍ %02ds'          # >= 1 minute
  time-second: '%02ds'                # < 1 minute
```

## Comportement des Actions

```yaml
action:
  # Actualiser l'inventaire après les actions
  update-inventory-on-action: true

  # Retrait d'objets des annonces
  remove-listed-item:
    give-item: false           # Donner à l'inventaire ou objets expirés
    open-inventory: true       # Rouvrir l'inventaire après
    open-confirm-inventory: true  # Afficher la confirmation

  # Retrait des objets expirés
  remove-expired-item:
    open-inventory: true

  # Achat d'objets
  purchased-item:
    give-item: false           # Donner à l'inventaire ou objets achetés
    player-inventory-must-have-free-space: true
    open-inventory: true
    money-item:
      enable: true
      duration: 60             # Ticks pour afficher l'erreur
      item:
        material: BARRIER
        name: "#ff3535✘ Vous n'avez pas assez d'argent !"
    money-message: true
    money-sound:
      enable: true
      category: MASTER
      sound: minecraft:entity.villager.no
      volume: 1
      pitch: 1

  # Retrait des objets en vente
  selling-item:
    open-inventory: true
```

## Configuration Auto-Claim

```yaml
auto-claim:
  # Auto-déposer l'argent en attente à la connexion
  enable: false
  delay-ticks: 20              # Attendre avant de réclamer
  notify-player: true          # Message lors de l'auto-réclamation
  notify-pending: true         # Notifier l'argent en attente
  notify-delay-ticks: 40
  deposit-reason: "Argent d'enchères réclamé"
```

## Notification de Ventes

```yaml
sales-notification:
  # Notifier des ventes hors ligne à la connexion
  enable: true
  delay-ticks: 60
```

## Configuration du Tri

```yaml
sort-items:
  # Tri par défaut : ASCENDING_PRICE, ASCENDING_DATE, DECREASING_DATE, DECREASING_PRICE
  default-sort: DECREASING_DATE

  # Noms d'affichage des types de tri
  translations:
    ASCENDING_PRICE: "ᴘʀɪx ᴄʀᴏɪssᴀɴᴛ"
    ASCENDING_DATE: "ᴅᴀᴛᴇ ᴄʀᴏɪssᴀɴᴛᴇ"
    DECREASING_DATE: "ᴅᴀᴛᴇ ᴅᴇ́ᴄʀᴏɪssᴀɴᴛᴇ"
    DECREASING_PRICE: "ᴘʀɪx ᴅᴇ́ᴄʀᴏɪssᴀɴᴛ"
```

## Paramètres de Migration

Migrer les données depuis zAuctionHouse V3 :

```yaml
migration:
  zauctionhouse-v3:
    source-type: SQLITE        # MYSQL, MARIADB, SQLITE, ou JSON
    table-prefix: "zauctionhouse_"
    sqlite-path: "plugins/zAuctionHousev3/database.db"

    # Paramètres MySQL/MariaDB
    host: "localhost"
    port: 3306
    database: "zauctionhouse"
    user: "root"
    password: ""

    # Paramètres JSON
    json-folder: "plugins/zAuctionHouseV3"
```

Pour migrer, exécutez :
```bash
/ah admin migrate zauctionhousev3 confirm
```
