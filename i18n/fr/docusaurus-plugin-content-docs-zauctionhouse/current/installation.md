---
sidebar_position: 2
title: Installation
description: Comment installer et configurer zAuctionHouse sur votre serveur Minecraft
---

# Installation

Ce guide couvre l'installation et la configuration initiale de zAuctionHouse.

## Prérequis

Avant l'installation, assurez-vous que votre serveur répond à ces exigences :

| Prérequis | Version |
|-----------|---------|
| Java | 21 ou supérieur |
| Minecraft | 1.20.5 ou supérieur |
| zMenu | Dernière version |
| PlaceholderAPI | Optionnel |
| Vault | Optionnel |

## Étapes d'Installation

### 1. Télécharger le Plugin

Téléchargez zAuctionHouse depuis l'une de ces sources :
- [Modrinth](https://modrinth.com/plugin/zauctionhouse)
- [SpigotMC](https://www.spigotmc.org/resources/zauctionhouse.00000/)
- Salon Discord `#builds` pour les versions de développement

### 2. Installer les Dépendances

Assurez-vous que [zMenu](https://modrinth.com/plugin/zmenu) est installé sur votre serveur. zAuctionHouse nécessite zMenu pour ses interfaces d'inventaire.

Dépendances optionnelles :
- **PlaceholderAPI** - Pour le support des placeholders dans les objets et messages
- **Vault** - Pour l'intégration économique avec les plugins compatibles Vault

### 3. Installer le Plugin

1. Arrêtez votre serveur
2. Placez `zAuctionHouse.jar` dans votre dossier `plugins/`
3. Démarrez votre serveur
4. Le plugin va générer les fichiers de configuration par défaut

### 4. Vérifier l'Installation

Exécutez `/ah` pour ouvrir l'interface de l'hôtel des ventes. Si tout fonctionne, vous devriez voir l'interface principale.

## Structure des Fichiers

Après le premier démarrage, zAuctionHouse crée la structure suivante :

```
plugins/zAuctionHouse/
├── config.yml              # Configuration principale
├── messages.yml            # Tous les messages du plugin
├── categories.yml          # Définitions des catégories
├── economies/
│   └── vault.yml           # Configurations économiques
├── inventories/
│   ├── auction.yml         # Interface principale
│   ├── categories.yml      # Sélection des catégories
│   ├── confirm_buy.yml     # Confirmation d'achat
│   ├── confirm_remove.yml  # Confirmation de retrait
│   ├── expired.yml         # Objets expirés
│   ├── player.yml          # Objets du joueur
│   ├── purchased.yml       # Objets achetés
│   └── sell.yml            # Interface de vente
├── rules/
│   ├── blacklist.yml       # Objets en liste noire
│   └── whitelist.yml       # Objets en liste blanche
└── storage.db              # Base de données SQLite (si SQLite utilisé)
```

## Configuration de la Base de Données

zAuctionHouse supporte plusieurs options de stockage.

### SQLite (Par Défaut)

SQLite est la méthode de stockage par défaut et ne nécessite aucune configuration supplémentaire :

```yaml
storage:
  type: SQLITE
```

Le fichier de base de données est stocké dans `plugins/zAuctionHouse/storage.db`.

### MySQL / MariaDB

Pour les configurations multi-serveurs ou de meilleures performances avec de grands volumes de données :

```yaml
storage:
  type: MYSQL
  host: localhost
  port: 3306
  database: zauctionhouse
  user: root
  password: votre_mot_de_passe
  # Activer SSL pour les connexions sécurisées
  useSSL: false
```

### Paramètres du Pool de Connexions

Pour les serveurs à fort trafic, vous pouvez configurer le pool de connexions :

```yaml
storage:
  pool:
    maximum-pool-size: 10
    minimum-idle: 5
    connection-timeout: 30000
    idle-timeout: 600000
    max-lifetime: 1800000
```

## Configuration Multi-Serveur

Pour synchroniser les enchères sur plusieurs serveurs :

1. Utilisez MySQL/MariaDB comme type de stockage
2. Configurez les mêmes identifiants de base de données sur tous les serveurs
3. Activez la synchronisation en temps réel :

```yaml
multi-server:
  enabled: true
  # Intervalle de synchronisation en secondes (0 pour temps réel)
  sync-interval: 0
```

## Première Configuration

Après l'installation, vous voudrez peut-être configurer :

1. **Économie** - Configurez votre économie préférée dans `economies/vault.yml`
2. **Catégories** - Définissez les catégories d'objets dans `categories.yml`
3. **Limites** - Configurez les limites d'objets par joueur dans `config.yml`
4. **Expiration** - Définissez les durées d'expiration par défaut

Voir la section [Configuration](./configuration/config) pour les options détaillées.

## Dépannage

### Le plugin ne démarre pas

- Vérifiez que Java 21+ est installé : `java -version`
- Vérifiez que zMenu est installé et fonctionne
- Consultez la console pour les messages d'erreur

### L'économie ne fonctionne pas

- Assurez-vous que Vault est installé
- Vérifiez qu'un plugin économique (EssentialsX, CMI, etc.) est installé
- Vérifiez que Vault détecte votre économie : `/vault-info`

### Échec de connexion à la base de données

- Vérifiez que les identifiants de la base de données sont corrects
- Assurez-vous que le serveur MySQL est en cours d'exécution et accessible
- Vérifiez les paramètres du pare-feu si vous utilisez une base de données distante

### Les interfaces n'apparaissent pas

- Vérifiez que zMenu est installé et fonctionne
- Vérifiez que les fichiers d'inventaire existent dans `inventories/`
- Recherchez les erreurs dans la console lors de l'ouverture des menus

## Prochaines Étapes

- [Configurer les commandes et permissions](./commands-permissions)
- [Configurer les catégories](./configuration/categories)
- [Personnaliser l'interface](./configuration/inventories)
