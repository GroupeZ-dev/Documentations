---
sidebar_position: 1
title: Configuration Principale
description: Options de configuration principales pour zAuctionHouse
---

# Configuration Principale

Le fichier de configuration principal `config.yml` contrôle le comportement central de zAuctionHouse.

## Configuration du Stockage

Configurez comment les données d'enchères sont stockées :

```yaml
storage:
  # Type de stockage : SQLITE, MYSQL, MARIADB
  type: SQLITE

  # Paramètres MySQL/MariaDB (ignorés pour SQLite)
  host: localhost
  port: 3306
  database: zauctionhouse
  user: root
  password: password
  useSSL: false

  # Paramètres du pool de connexions
  pool:
    maximum-pool-size: 10
    minimum-idle: 5
    connection-timeout: 30000
    idle-timeout: 600000
    max-lifetime: 1800000
```

## Configuration Multi-Serveur

Activez la synchronisation des enchères sur plusieurs serveurs :

```yaml
multi-server:
  # Activer la synchronisation multi-serveur
  enabled: false

  # Intervalle de synchronisation en secondes (0 pour temps réel via triggers de base de données)
  sync-interval: 5

  # Identifiant du serveur (unique par serveur)
  server-id: server-1
```

## Formatage des Nombres

Configurez l'affichage des nombres :

```yaml
formatting:
  # Activer le format de nombres compact (1K, 1M, 1B)
  compact-numbers: true

  # Décimales pour les nombres compacts
  compact-decimals: 1

  # Suffixes pour les nombres compacts
  suffixes:
    thousand: "K"
    million: "M"
    billion: "B"
    trillion: "T"

  # Nombre de décimales pour les prix
  price-decimals: 2

  # Séparateur de milliers
  thousand-separator: ","

  # Séparateur décimal
  decimal-separator: "."
```

Exemple de rendu avec ces paramètres :
- `1500` s'affiche comme `1.5K`
- `2500000` s'affiche comme `2.5M`
- `1234.56` s'affiche comme `1,234.56`

## Paramètres d'Expiration

Configurez le comportement d'expiration des objets :

```yaml
expiration:
  # Durée d'expiration par défaut pour les objets en vente
  default: 7d

  # Format de temps : s (secondes), m (minutes), h (heures), d (jours)

  # Durée d'expiration maximale autorisée
  maximum: 30d

  # Intervalle de vérification des objets expirés (en minutes)
  check-interval: 5

  # Supprimer les objets expirés après ce délai (0 pour garder indéfiniment)
  delete-after: 30d

  # Notifier les joueurs des objets qui vont expirer
  notify-before-expiration: true
  notify-time: 1h
```

## Limites d'Objets

Configurez les limites de mise en vente par joueur :

```yaml
limits:
  # Limite par défaut pour les joueurs sans permissions spécifiques
  default: 10

  # Limites basées sur les permissions (la plus élevée a priorité)
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
      limit: -1  # -1 pour illimité
```

## Temps de Recharge

Configurez les temps de recharge pour diverses actions :

```yaml
cooldowns:
  # Temps de recharge entre les mises en vente (en secondes)
  sell: 5

  # Temps de recharge entre les achats (en secondes)
  purchase: 3

  # Temps de recharge pour la recherche (en secondes)
  search: 2
```

## Mondes Interdits

Empêchez l'utilisation de l'hôtel des ventes dans certains mondes :

```yaml
banned-worlds:
  - minigames
  - pvp_arena
  - creative
```

## Options de Tri

Configurez le tri par défaut et les options disponibles :

```yaml
sorting:
  # Méthode de tri par défaut
  default: NEWEST

  # Méthodes de tri disponibles
  # NEWEST, OLDEST, PRICE_LOW, PRICE_HIGH, NAME_AZ, NAME_ZA

  # Mémoriser la préférence de tri du joueur
  remember-preference: true
```

## Paramètres Anti-Exploit

Protection contre les exploits et la duplication :

```yaml
protection:
  # Empêcher la vente d'objets avec certains tags NBT
  block-creative-items: true

  # Taille de stack maximale à vendre (0 pour pas de limite)
  max-stack-size: 64

  # Temps minimum entre les mises en vente identiques (secondes)
  duplicate-listing-cooldown: 10

  # Vérifier les TPS avant d'autoriser les actions
  tps-protection:
    enabled: true
    minimum-tps: 15.0
```

## Journalisation

Configurez la journalisation des actions :

```yaml
logging:
  # Journaliser dans un fichier
  file-logging: true

  # Emplacement du fichier de log
  log-file: logs/auction.log

  # Actions à journaliser
  log-actions:
    - SELL
    - PURCHASE
    - EXPIRE
    - REMOVE
    - CLAIM
```

## Notifications

Configurez les notifications aux joueurs :

```yaml
notifications:
  # Notifier le vendeur quand un objet est acheté
  notify-seller-on-sale: true

  # Notifier le joueur quand un objet expire
  notify-on-expiration: true

  # Effets sonores
  sounds:
    enabled: true
    on-sale: ENTITY_PLAYER_LEVELUP
    on-purchase: ENTITY_EXPERIENCE_ORB_PICKUP
    on-expiration: BLOCK_NOTE_BLOCK_BASS
```

## Exemple Complet

Voici un exemple complet de `config.yml` :

```yaml
storage:
  type: SQLITE

multi-server:
  enabled: false
  sync-interval: 5
  server-id: server-1

formatting:
  compact-numbers: true
  compact-decimals: 1
  suffixes:
    thousand: "K"
    million: "M"
    billion: "B"
  price-decimals: 2
  thousand-separator: ","
  decimal-separator: "."

expiration:
  default: 7d
  maximum: 30d
  check-interval: 5
  delete-after: 30d
  notify-before-expiration: true
  notify-time: 1h

limits:
  default: 10
  permissions:
    - permission: zauctionhouse.limit.25
      limit: 25
    - permission: zauctionhouse.limit.50
      limit: 50
    - permission: zauctionhouse.limit.unlimited
      limit: -1

cooldowns:
  sell: 5
  purchase: 3
  search: 2

banned-worlds:
  - minigames

sorting:
  default: NEWEST
  remember-preference: true

protection:
  block-creative-items: true
  max-stack-size: 64
  tps-protection:
    enabled: true
    minimum-tps: 15.0

logging:
  file-logging: true
  log-file: logs/auction.log

notifications:
  notify-seller-on-sale: true
  notify-on-expiration: true
  sounds:
    enabled: true
    on-sale: ENTITY_PLAYER_LEVELUP
```
