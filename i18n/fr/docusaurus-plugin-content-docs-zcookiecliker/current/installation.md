---
sidebar_position: 2
title: Installation
description: Comment installer et configurer zCookieClicker sur votre serveur Minecraft
---

# Installation

Ce guide couvre l'installation et la configuration initiale de zCookieClicker.

## Prérequis

Avant l'installation, assurez-vous que votre serveur répond à ces exigences :

| Prérequis | Version | Statut |
|-----------|---------|--------|
| Java | 17 ou supérieur | **Requis** |
| Minecraft | 1.13 ou supérieur | **Requis** |
| [zMenu](https://modrinth.com/plugin/zmenu) | Dernière version | **Requis** |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Dernière version | Optionnel |

### Plateformes Supportées

| Plateforme | Support |
|------------|---------|
| Paper | Recommandé |
| Spigot | Supporté |
| Purpur | Supporté |

## Étapes d'Installation

### 1. Télécharger le Plugin

Téléchargez zCookieClicker depuis :
- [groupez.dev](https://groupez.dev/)

### 2. Installer les Dépendances

Installez la dépendance **requise** :

1. **zMenu** - Téléchargez depuis [Modrinth](https://modrinth.com/plugin/zmenu) et placez le `.jar` dans votre dossier `plugins/`. zCookieClicker utilise zMenu pour toutes les interfaces GUI.

### 3. Installer le Plugin

1. Arrêtez votre serveur
2. Placez `zCookieClicker.jar` dans votre dossier `plugins/`
3. Démarrez votre serveur
4. Le plugin génèrera tous les fichiers de configuration par défaut

### 4. Vérifier l'Installation

Exécutez `/cookie` en jeu. Si le plugin est correctement chargé, il ouvrira l'interface Cookie Clicker.

## Structure des Fichiers

Après le premier démarrage, zCookieClicker crée la structure suivante :

```
plugins/zCookieClicker/
├── config.yml                    # Configuration principale
├── messages.yml                  # Messages du plugin
├── inventories/
│   ├── cookies.yml               # Interface principale
│   └── cookies-upgrade.yml       # Interface des améliorations
└── patterns/
    └── cookie-upgrade.yml        # Pattern des boutons d'amélioration
```

## Configuration de la Base de Données

zCookieClicker supporte trois backends de stockage.

### SQLite (Par Défaut)

SQLite est la méthode de stockage par défaut :

```yaml
sql:
  type: SQLITE
```

### MySQL

Pour les grands serveurs :

```yaml
sql:
  type: MYSQL
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  database: zcookieclicker
  prefix: "zcookieclicker_"
  retry: 5
  debug: false
```

### MariaDB

```yaml
sql:
  type: MARIADB
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  database: zcookieclicker
  prefix: "zcookieclicker_"
  retry: 5
  debug: false
```

| Option | Description |
|--------|-------------|
| `type` | Type de stockage : SQLITE, MYSQL ou MARIADB |
| `user` | Nom d'utilisateur de la base de données |
| `password` | Mot de passe de la base de données |
| `port` | Port de la base de données |
| `host` | Adresse hôte de la base de données |
| `database` | Nom de la base de données |
| `prefix` | Préfixe des tables |
| `retry` | Tentatives de reconnexion |
| `debug` | Activer la journalisation SQL |

:::warning
Assurez-vous de changer les identifiants de base de données par défaut avant le déploiement en production.
:::

## Première Configuration

Après l'installation, voici les premières étapes recommandées :

1. **Stockage** - Choisissez votre backend de stockage dans `config.yml`
2. **Améliorations** - Personnalisez les coûts et valeurs CPS des améliorations
3. **Format des Nombres** - Configurez l'affichage des grands nombres
4. **Messages** - Personnalisez les messages du plugin dans `messages.yml`
5. **GUIs** - Personnalisez les interfaces cookie et améliorations

Voir la section [Configuration](./configuration/config) pour les options détaillées.

## Dépannage

### Le plugin ne démarre pas

- Vérifiez que **Java 17+** est installé : `java -version`
- Vérifiez que **zMenu** est installé et se charge sans erreurs
- Vérifiez la console du serveur pour les messages d'erreur

### L'interface ne s'ouvre pas

- Vérifiez que **zMenu** est installé et fonctionne correctement
- Vérifiez que les fichiers d'inventaire existent dans `plugins/zCookieClicker/inventories/`
- Regardez les erreurs dans la console

### Échec de connexion à la base de données

- Vérifiez vos identifiants de base de données dans `config.yml`
- Assurez-vous que le serveur MySQL/MariaDB est en cours d'exécution
- Vérifiez les paramètres du pare-feu si vous utilisez une base de données distante
- Confirmez que la base de données existe

### Les cookies ne se sauvegardent pas

- Vérifiez que la connexion à la base de données fonctionne
- Activez `debug: true` dans la configuration SQL
- Vérifiez que les tables de base de données ont été créées

## Prochaines Étapes

- [Commandes & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/config)
- [Améliorations](./configuration/upgrades)
