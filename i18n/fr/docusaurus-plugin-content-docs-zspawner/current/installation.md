---
sidebar_position: 2
title: Installation
description: Comment installer et configurer zSpawner sur votre serveur Minecraft
---

# Installation

Ce guide couvre l'installation et la configuration initiale de zSpawner.

## Prérequis

Avant l'installation, assurez-vous que votre serveur répond à ces exigences :

| Prérequis | Version | Statut |
|-----------|---------|--------|
| Java | 17 ou supérieur | **Requis** |
| Minecraft | 1.13 ou supérieur | **Requis** |
| [zMenu](https://modrinth.com/plugin/zmenu) | Dernière version | **Requis** |
| [zShop](https://groupez.dev/) | Dernière version | Optionnel |
| [zEssentials](https://modrinth.com/plugin/zessentials) | Dernière version | Optionnel |
| [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) | Dernière version | Optionnel |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Dernière version | Optionnel |

### Plateformes Supportées

| Plateforme | Support |
|------------|---------|
| Paper | Recommandé |
| Spigot | Supporté |
| Purpur | Supporté |
| Pufferfish | Supporté |
| Folia | Supporté |

:::tip Recommandé
**Paper** est la plateforme serveur recommandée. Elle offre les meilleures performances et compatibilité avec zSpawner.
:::

## Étapes d'Installation

### 1. Télécharger le Plugin

Téléchargez zSpawner depuis l'une de ces sources :
- [SpigotMC](https://www.spigotmc.org/resources/zspawner.69465/)
- [groupez.dev](https://groupez.dev/)

### 2. Installer les Dépendances

Installez la dépendance **requise** :

1. **zMenu** - Téléchargez depuis [Modrinth](https://modrinth.com/plugin/zmenu) et placez le `.jar` dans votre dossier `plugins/`. zSpawner utilise zMenu pour toutes ses interfaces GUI.

Installez les dépendances **optionnelles** dont vous avez besoin :

- **zShop** - Fonctionnalité auto-sell pour les spawners virtuels
- **zEssentials** - Intégration mailbox pour la livraison d'items quand l'inventaire est plein
- **SuperiorSkyblock2** - Contrôle d'accès basé sur l'équipe pour les spawners

### 3. Installer le Plugin

1. Arrêtez votre serveur
2. Placez `zSpawner.jar` dans votre dossier `plugins/`
3. Démarrez votre serveur
4. Le plugin génèrera tous les fichiers de configuration par défaut

### 4. Vérifier l'Installation

Exécutez `/zspawner` en jeu. Si le plugin est correctement chargé, il ouvrira l'interface GUI des spawners. Vous pouvez aussi vérifier la console du serveur pour :

```
[zSpawner] Loading zSpawner v4.x.x
[zSpawner] Use zMenu
```

## Structure des Fichiers

Après le premier démarrage, zSpawner crée la structure suivante :

```
plugins/zSpawner/
├── config.yml                          # Configuration principale
├── messages.yml                        # Messages localisés
├── option-items.yml                    # Définitions des items d'amélioration
└── inventories/
    ├── gui/
    │   └── spawners.yml                # Interface des spawners GUI
    ├── show.yml                        # Vue admin des spawners
    └── virtual/
        ├── location-history.yml        # Historique des locations
        ├── manage-location.yml         # GUI de gestion des locations
        ├── player-location.yml         # Location d'emplacement joueur
        └── virtual.yml                 # Interface du spawner virtuel
```

## Configuration de la Base de Données

zSpawner supporte trois backends de stockage. Configurez la section storage dans `config.yml`.

### SQLite (Par Défaut)

SQLite est la méthode de stockage par défaut et ne nécessite aucune configuration supplémentaire :

```yaml
storage: SQLITE
```

### MySQL

Pour les grands serveurs avec plusieurs instances :

```yaml
storage: MYSQL

database-configuration:
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zspawner
  table-prefix: "zspawner_"
  debug: false
```

### MariaDB

MariaDB est aussi supporté avec la même configuration que MySQL :

```yaml
storage: MYSQL

database-configuration:
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zspawner
  table-prefix: "zspawner_"
  debug: false
```

:::warning
Assurez-vous de changer les identifiants de base de données par défaut avant le déploiement en production.
:::

## Première Configuration

Après l'installation, voici les premières étapes recommandées :

1. **Stockage** - Choisissez votre backend de stockage (`SQLITE` ou `MYSQL`) dans `config.yml`
2. **Items de Spawner** - Personnalisez les noms et descriptions des items spawner dans la section `items`
3. **Options Virtuelles** - Configurez les paramètres par défaut des spawners virtuels dans la section `virtual`
4. **Silk Touch** - Activez/désactivez le minage silk touch dans la section `silkSpawner`
5. **Messages** - Personnalisez les messages du plugin dans `messages.yml`

Voir la section [Configuration](./configuration/config) pour les options détaillées.

## Dépannage

### Le plugin ne démarre pas

- Vérifiez que **Java 17+** est installé : `java -version`
- Vérifiez que **zMenu** est installé et se charge sans erreurs
- Vérifiez la console du serveur pour les messages d'erreur
- Assurez-vous que le fichier `.jar` n'est pas corrompu en le re-téléchargeant

### Les GUIs ne s'ouvrent pas

- Vérifiez que **zMenu** est installé et fonctionne correctement
- Vérifiez que les fichiers d'inventaire existent dans `plugins/zSpawner/inventories/`
- Regardez les erreurs dans la console lors de l'ouverture d'un menu

### Échec de connexion à la base de données

- Vérifiez que vos identifiants de base de données dans `config.yml` sont corrects
- Assurez-vous que le serveur MySQL/MariaDB est en cours d'exécution et accessible
- Vérifiez les paramètres du pare-feu si vous utilisez une base de données distante
- Confirmez que la base de données existe et que l'utilisateur a les permissions appropriées

### Les spawners ne génèrent pas d'entités

- Vérifiez que le chunk est chargé
- Vérifiez qu'un joueur est dans la portée requise
- Pour les spawners virtuels, vérifiez les options du spawner (distance, délais)
- Activez le mode debug : `enableDebug: true` pour voir plus d'informations

## Prochaines Étapes

- [Commandes & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/config)
- [Spawners Virtuels](./configuration/virtual-spawner)
