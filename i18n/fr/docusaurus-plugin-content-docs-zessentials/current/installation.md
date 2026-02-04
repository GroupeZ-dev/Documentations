---
sidebar_position: 2
title: Installation
description: Comment installer et configurer zEssentials sur votre serveur Minecraft
---

# Installation

Ce guide couvre l'installation et la configuration initiale de zEssentials.

## Prérequis

Avant l'installation, assurez-vous que votre serveur répond à ces exigences :

| Prérequis | Version | Statut |
|-----------|---------|--------|
| Java | 21 ou supérieur | **Requis** |
| Minecraft | 1.20.4 ou supérieur | **Requis** |
| [zMenu](https://modrinth.com/plugin/zmenu) | Dernière version | **Requis** |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Dernière version | **Requis** |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Dernière version | Optionnel |
| [ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/) | Dernière version | Optionnel |
| [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) | Dernière version | Optionnel |
| [BentoBox](https://github.com/BentoBoxWorld/BentoBox) | Dernière version | Optionnel |

### Plateformes Supportées

| Plateforme | Support |
|------------|---------|
| Paper | Recommandé |
| Spigot | Supporté |
| Purpur | Supporté |
| Pufferfish | Supporté |
| Folia | Supporté (threading asynchrone) |

:::tip Recommandé
**Paper** est la plateforme serveur recommandée. Elle offre les meilleures performances et la meilleure compatibilité avec zEssentials.
:::

## Étapes d'Installation

### 1. Télécharger le Plugin

Téléchargez zEssentials depuis l'une de ces sources :
- [Modrinth](https://modrinth.com/plugin/zessentials)
- [groupez.dev](https://groupez.dev/)
- Le canal Discord `#builds` pour les versions de développement

### 2. Installer les Dépendances

Installez les dépendances **requises** sur votre serveur :

1. **zMenu** - Téléchargez depuis [Modrinth](https://modrinth.com/plugin/zmenu) et placez le `.jar` dans votre dossier `plugins/`. zEssentials utilise zMenu pour toutes ses interfaces GUI.
2. **PlaceholderAPI** - Téléchargez depuis [SpigotMC](https://www.spigotmc.org/resources/placeholderapi.6245/) et placez le `.jar` dans votre dossier `plugins/`. Requis pour le support des placeholders dans tous les modules.

Installez les dépendances **optionnelles** dont vous avez besoin :

- **Vault** - Intégration du backend économique pour le module Economy
- **ProtocolLib** - Fonctionnalités au niveau des paquets telles que les hologrammes et la manipulation de la tab list
- **SuperiorSkyblock2** - Vérifications des permissions basées sur les îles pour les serveurs skyblock
- **BentoBox** - Vérifications des permissions basées sur les îles pour les serveurs skyblock utilisant BentoBox

### 3. Installer le Plugin

1. Arrêtez votre serveur
2. Placez `zEssentials.jar` dans votre dossier `plugins/`
3. Démarrez votre serveur
4. Le plugin générera tous les fichiers de configuration par défaut et les configurations des modules

### 4. Vérifier l'Installation

Exécutez `/essentials` en jeu ou depuis la console. Si le plugin est chargé correctement, il affichera les informations de version et la liste des modules activés. Vous pouvez également vérifier la console du serveur pour :

```
[zEssentials] Loading zEssentials v1.x.x
[zEssentials] Main class: fr.maxlego08.essentials.ZEssentialsPlugin
[zEssentials] Successfully enabled!
```

## Structure des Fichiers

Après le premier démarrage, zEssentials crée la structure suivante :

```
plugins/zEssentials/
├── config.yml                          # Configuration principale
├── storage.db                          # Base de données SQLite (si SQLite est utilisé)
├── commands/
│   └── ...                             # Définitions de commandes personnalisées
├── modules/
│   ├── afk.yml                         # Paramètres de détection AFK
│   ├── announcements.yml               # Annonces automatiques
│   ├── chat.yml                        # Formatage du chat et canaux
│   ├── compact.yml                     # Paramètres de compactage d'objets
│   ├── cooldown.yml                    # Paramètres globaux des temps de recharge
│   ├── discord.yml                     # Intégration webhook Discord
│   ├── economy.yml                     # Économie et multi-devises
│   ├── fly.yml                         # Gestion du vol
│   ├── freeze.yml                      # Paramètres de gel des joueurs
│   ├── home.yml                        # Configuration des résidences
│   ├── hologram.yml                    # Paramètres des hologrammes
│   ├── join-quit.yml                   # Messages de connexion/déconnexion
│   ├── kits.yml                        # Définitions de kits et temps de recharge
│   ├── mailbox.yml                     # Livraison d'objets hors ligne
│   ├── pay.yml                         # Paramètres de paiement entre joueurs
│   ├── rules.yml                       # Règles du serveur
│   ├── sanction.yml                    # Paramètres de ban, mute, kick
│   ├── scoreboard.yml                  # Scoreboard dynamique
│   ├── teleportation.yml              # TPA, warps, spawn, RTP
│   ├── vault.yml                       # Coffres de stockage des joueurs
│   ├── vote.yml                        # Suivi des votes et récompenses
│   └── worldedit.yml                   # Outils WorldEdit intégrés
├── inventories/
│   └── ...                             # Fichiers d'inventaire zMenu
├── messages/
│   └── ...                             # Fichiers de messages localisés
└── kits/
    └── ...                             # Fichiers de définition de kits
```

:::info
Chaque fichier de module dans `modules/` peut être configuré individuellement. Les modules peuvent être activés ou désactivés sans affecter les autres modules.
:::

## Configuration de la Base de Données

zEssentials supporte trois backends de stockage. Configurez la section storage dans `config.yml`.

### SQLite (Par Défaut)

SQLite est la méthode de stockage par défaut et ne nécessite aucune configuration supplémentaire. Idéal pour les configurations mono-serveur et les tests :

```yaml
storage-type: SQLITE
```

Le fichier de base de données est stocké dans `plugins/zEssentials/storage.db`.

### MySQL / MariaDB

Recommandé pour les environnements de production et les configurations multi-serveurs :

```yaml
storage-type: MYSQL

database-configuration:
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zessentials
  table-prefix: zessentials_
  useSSL: false
```

### HikariCP

Pour les environnements haute performance avec pool de connexions :

```yaml
storage-type: HIKARICP

database-configuration:
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: secret
  database: zessentials
  table-prefix: zessentials_
  useSSL: false
```

HikariCP fournit un pool de connexions optimisé prêt à l'emploi, réduisant la surcharge de connexion sur les serveurs à fort trafic.

### Valeurs de Configuration Par Défaut de la Base de Données

| Propriété | Valeur Par Défaut |
|-----------|-------------------|
| `host` | `192.168.10.10` |
| `port` | `3306` |
| `user` | `homestead` |
| `password` | `secret` |
| `database` | `zessentials` |
| `table-prefix` | `zessentials_` |

:::warning
Assurez-vous de modifier les identifiants de base de données par défaut avant de déployer en production. Les valeurs par défaut sont des exemples et ne doivent pas être utilisées dans un environnement en production.
:::

## Configuration Redis

zEssentials supporte Redis pour la synchronisation des données en temps réel entre plusieurs serveurs. Cela est nécessaire si vous souhaitez des messages privés inter-serveurs, des sanctions synchronisées, des données économiques partagées, et plus encore.

Configurez la section Redis dans `config.yml` :

```yaml
redis-configuration:
  host: 127.0.0.1
  port: 6379
  password: ""
```

| Propriété | Description | Par Défaut |
|-----------|-------------|------------|
| `host` | Adresse du serveur Redis | `127.0.0.1` |
| `port` | Port du serveur Redis | `6379` |
| `password` | Mot de passe Redis (laisser vide si aucun) | `""` |

## Configuration du Type de Serveur

zEssentials supporte deux modes de type de serveur qui déterminent comment le plugin gère la communication inter-serveurs :

```yaml
server-type: PAPER
```

### PAPER

Le mode par défaut pour les serveurs autonomes ou les réseaux n'utilisant pas Redis :

```yaml
server-type: PAPER
```

- Toutes les données sont stockées et lues localement
- Pas de communication inter-serveurs
- Idéal pour les configurations mono-serveur

### REDIS

Activez ce mode pour les réseaux multi-serveurs utilisant Redis :

```yaml
server-type: REDIS
```

- Active la synchronisation des données en temps réel via Redis pub/sub
- Données joueurs, sanctions, économie et messages synchronisés sur tous les serveurs
- Nécessite une configuration Redis valide (voir [Configuration Redis](#configuration-redis))
- Nécessite MySQL ou HikariCP comme type de stockage (SQLite n'est pas supporté en mode multi-serveurs)

:::tip
Lors de l'utilisation du type de serveur `REDIS`, assurez-vous que tous les serveurs de votre réseau partagent la même base de données MySQL **et** la même instance Redis pour une synchronisation complète.
:::

## Première Configuration

Après l'installation, voici les premières étapes recommandées :

1. **Stockage** - Choisissez votre backend de stockage (`SQLITE`, `MYSQL` ou `HIKARICP`) dans `config.yml`
2. **Modules** - Examinez et activez/désactivez les modules dans le répertoire `modules/` selon vos besoins
3. **Économie** - Si vous utilisez le module Economy, configurez-le dans `modules/economy.yml` et assurez-vous que Vault est installé
4. **Résidences** - Définissez les limites de résidences par groupe de permissions dans `modules/home.yml`
5. **Kits** - Créez vos kits serveur dans `modules/kits.yml` et le répertoire `kits/`
6. **Messages** - Personnalisez les messages du plugin dans le répertoire `messages/`

Consultez la section [Configuration](./configuration/main-config) pour les options détaillées.

## Dépannage

### Le plugin ne démarre pas

- Vérifiez que **Java 21+** est installé : `java -version`
- Vérifiez que **zMenu** est installé et se charge sans erreurs
- Vérifiez que **PlaceholderAPI** est installé et se charge sans erreurs
- Consultez la console du serveur pour les messages d'erreur référençant `fr.maxlego08.essentials.ZEssentialsPlugin`
- Assurez-vous que le fichier `.jar` n'est pas corrompu en le re-téléchargeant

### Les modules ne se chargent pas

- Vérifiez que le fichier du module existe dans `plugins/zEssentials/modules/`
- Vérifiez que le module est défini sur `enabled: true` dans son fichier de configuration
- Recherchez les erreurs dans la console qui référencent le nom du module spécifique
- Assurez-vous que toutes les dépendances requises pour ce module sont installées (par ex., ProtocolLib pour les hologrammes)

### Échec de connexion à la base de données

- Vérifiez que vos identifiants de base de données dans `config.yml` sont corrects
- Assurez-vous que le serveur MySQL/MariaDB est en cours d'exécution et accessible depuis le serveur Minecraft
- Vérifiez les paramètres du pare-feu si vous utilisez une base de données distante
- Confirmez que la base de données spécifiée dans la configuration existe et que l'utilisateur dispose des permissions appropriées
- Pour les problèmes HikariCP, vérifiez que le pilote JDBC est compatible avec votre version de base de données

### Échec de connexion Redis

- Vérifiez que le serveur Redis est en cours d'exécution : `redis-cli ping` devrait retourner `PONG`
- Vérifiez l'hôte, le port et le mot de passe dans votre section `redis-configuration`
- Assurez-vous qu'aucun pare-feu ne bloque le port Redis
- Confirmez que `server-type` est défini sur `REDIS` dans `config.yml`

### L'économie ne fonctionne pas

- Assurez-vous que **Vault** est installé et chargé avant zEssentials
- Vérifiez qu'un plugin fournisseur d'économie (EssentialsX, CMI, etc.) est enregistré auprès de Vault
- Vérifiez que le module Economy est activé dans `modules/economy.yml`
- Exécutez `/vault-info` pour vérifier que Vault détecte votre fournisseur d'économie

### Les placeholders PlaceholderAPI ne fonctionnent pas

- Assurez-vous que PlaceholderAPI est installé et chargé
- Exécutez `/papi list` pour vérifier si l'expansion zEssentials est enregistrée
- Vérifiez que la syntaxe du placeholder est correcte (par ex., `%zessentials_player_balance%`)
- Rechargez PlaceholderAPI avec `/papi reload`

### Les interfaces n'apparaissent pas

- Vérifiez que **zMenu** est installé et fonctionne correctement
- Vérifiez que les fichiers d'inventaire existent dans `plugins/zEssentials/inventories/`
- Recherchez les erreurs dans la console lors de l'ouverture d'un menu
- Assurez-vous que zMenu est à jour avec la dernière version

## Étapes Suivantes

- [Commandes & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/main-config)
- [Base de Données](./database)
- [API & Événements](./development/events)
