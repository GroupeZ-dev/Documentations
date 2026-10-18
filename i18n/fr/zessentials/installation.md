---
title: Installation
description: Comment installer et configurer zEssentials sur votre serveur Minecraft
---

# Installation

Ce guide couvre l'installation et la configuration initiale de zEssentials.

## Prérequis

Avant l'installation, assurez-vous que votre serveur répond à ces exigences :

| Prérequis | Version | Statut |
|-----------|---------|--------|
| Logiciel serveur | **Paper** (ou un fork de Paper) 1.20.6 ou supérieur | **Requis** |
| Java | 21 ou supérieur (**25** pour Minecraft 26.x) | **Requis** |
| [zMenu](https://modrinth.com/plugin/zmenu) | Dernière version | **Requis** |
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Dernière version | **Requis** |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Dernière version | Optionnel |
| [WorldGuard](https://enginehub.org/worldguard) | Dernière version | Optionnel |
| [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) | Dernière version | Optionnel |
| [BentoBox](https://github.com/BentoBoxWorld/BentoBox) | Dernière version | Optionnel |
| [NuVotifier](https://www.spigotmc.org/resources/nuvotifier.13449/) | Dernière version | Optionnel |
| [BlockTracker](https://github.com/Krakenied/BlockTracker) | Dernière version | Optionnel |
| [MythicMobs](https://www.spigotmc.org/resources/mythicmobs.5702/) | Dernière version | Optionnel |
| NChat | Dernière version | Optionnel |
| [ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/) | Dernière version | Optionnel |
| [AxVaults](https://www.spigotmc.org/resources/axvaults.103862/) / PlayerVaults | Dernière version | Optionnel (migration de données uniquement) |

### Versions supportées

zEssentials embarque un adaptateur NMS par version de Minecraft. Les versions suivantes sont supportées :

| Minecraft | Java |
|-----------|------|
| 1.20.6 | 21+ |
| 1.21, 1.21.1, 1.21.3, 1.21.4, 1.21.5, 1.21.6, 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11 | 21+ |
| 26.2 | 25+ |

<CalloutContainer type="info">

<CalloutTitle>Mappings Mojang</CalloutTitle>

<CalloutDescription>
Depuis Minecraft 26.1, Paper ne réobfusque plus les plugins vers les mappings Spigot. zEssentials est donc compilé avec les **mappings Mojang**, qui ne peuvent être chargés que par Paper **1.20.5 ou plus récent**. Minecraft **1.20.4 et les versions antérieures ne sont plus supportées**. Minecraft 26.x utilise un versionnage basé sur l'année (26.2 est la deuxième version de 2026) et nécessite **Java 25**.
</CalloutDescription>

</CalloutContainer>

### Plateformes supportées

| Plateforme | Support |
|------------|---------|
| Paper | **Recommandé** |
| Purpur | Supporté (fork de Paper) |
| Pufferfish | Supporté (fork de Paper) |
| Folia | Supporté (threading par régions) |
| Spigot / CraftBukkit | **Non supporté** |

<CalloutContainer type="error">

<CalloutTitle>Paper est obligatoire</CalloutTitle>

<CalloutDescription>
zEssentials est un plugin **exclusivement Paper**. Le JAR contient un `paper-plugin.yml`, que Paper (et ses forks) charge en priorité.

Le JAR contient aussi un `plugin.yml` minimal, utilisé uniquement par Spigot. Sur Spigot, zEssentials reste **totalement inactif** (aucune commande, aucun module, aucune API) : il affiche seulement un avertissement dans la console et, lorsqu'un joueur ayant la permission `zessentials.paper.warning` (les opérateurs par défaut) se connecte, lui indique que le serveur doit tourner sous Paper. Téléchargez Paper sur [papermc.io/downloads](https://papermc.io/downloads).
</CalloutDescription>

</CalloutContainer>

## Étapes d'installation

### 1. Télécharger le plugin

Téléchargez zEssentials depuis l'une de ces sources :
- [Modrinth](https://modrinth.com/plugin/zessentials)
- [groupez.dev](https://groupez.dev/resources/zessentials.325/)
- Le salon Discord `#builds` pour les versions de développement

### 2. Installer les dépendances

Installez les dépendances **requises** sur votre serveur :

1. **zMenu** - Téléchargez-le depuis [Modrinth](https://modrinth.com/plugin/zmenu) et placez le `.jar` dans votre dossier `plugins/`. zEssentials utilise zMenu pour toutes ses interfaces.
2. **PlaceholderAPI** - Téléchargez-le depuis [SpigotMC](https://www.spigotmc.org/resources/placeholderapi.6245/) et placez le `.jar` dans votre dossier `plugins/`. Requis pour le support des placeholders dans tous les modules.

Ces deux plugins sont déclarés comme dépendances serveur obligatoires dans le `paper-plugin.yml` : Paper les charge **avant** zEssentials et refuse de charger zEssentials si l'un d'eux est absent.

Installez les dépendances **optionnelles** dont vous avez besoin :

- **Vault** - Expose l'économie de zEssentials aux autres plugins via l'API Vault
- **WorldGuard** - Vérification des régions protégées (utilisée par le module WorldEdit)
- **SuperiorSkyblock2** - Vérification des permissions sur les îles pour les serveurs skyblock
- **BentoBox** - Déclaré comme dépendance optionnelle pour être chargé avant zEssentials
- **NuVotifier** - Réception des votes pour le module Vote
- **BlockTracker** - Suivi des blocs posés par les joueurs
- **MythicMobs** - Noms des mobs personnalisés dans les messages de mort
- **NChat** - Applique les mutes de zEssentials aux messages NChat
- **ProtocolLib** - Intégration optionnelle au niveau des paquets, requise par aucun module
- **AxVaults** / **PlayerVaults** - Uniquement nécessaires pour [migrer les données des coffres](./converters) vers zEssentials

Consultez [Hooks & Intégrations](./development/hooks) pour le détail de chaque intégration.

### 3. Installer le plugin

1. Arrêtez votre serveur
2. Placez `zEssentials.jar` dans votre dossier `plugins/`
3. Démarrez votre serveur
4. Le plugin génère tous les fichiers de configuration par défaut ainsi que ceux des modules

<CalloutContainer type="info">

<CalloutTitle>Téléchargement de bibliothèque au démarrage</CalloutTitle>

<CalloutDescription>
Au démarrage du serveur, zEssentials demande à Paper (via son plugin loader, `ZEssentialsPluginLoader`) de fournir le **driver JDBC MariaDB** (`org.mariadb.jdbc:mariadb-java-client`), qui est téléchargé depuis Maven Central la première fois. Le serveur doit donc avoir accès à Internet lors du premier démarrage. Si votre hébergeur bloque Maven Central, vous pouvez utiliser un miroir avec la variable d'environnement `PAPER_DEFAULT_CENTRAL_REPOSITORY` ou la propriété système `org.bukkit.plugin.java.LibraryLoader.centralURL`, exactement comme pour Paper.
</CalloutDescription>

</CalloutContainer>

### 4. Vérifier l'installation

Exécutez `/zessentials` (alias `/ess`) en jeu ou depuis la console. Si le plugin est correctement chargé, il affiche sa version. Vous pouvez également vérifier dans la console du serveur la présence de lignes similaires à :

```
[zEssentials] Loading server plugin zEssentials v1.0.4.0
[zEssentials] Enabling zEssentials v1.0.4.0
[zEssentials] Create <n> commands.
[zEssentials] The database connection is valid ! (SQLITE)
```

Si vous voyez plutôt l'avertissement suivant, le serveur tourne sous Spigot et zEssentials est inactif :

```
[zEssentials] zEssentials is inactive: no commands, modules or API are available on Spigot.
[zEssentials] Install Paper, or a compatible fork, to use zEssentials.
[zEssentials] Download: https://papermc.io/downloads
```

## Structure des fichiers

Après le premier démarrage, zEssentials crée la structure suivante :

```
plugins/zEssentials/
├── config.yml                          # Configuration principale
├── database.db                         # Base SQLite (si storage-type: SQLITE)
├── users/                              # Fichiers des joueurs (si storage-type: JSON)
├── messages/                           # Fichiers de messages (EN, FR, DE, ES, IT, NL, ZH)
├── patterns/                           # Patterns zMenu (home_up.yml, home_down.yml)
└── modules/
    ├── afk/config.yml                  # Détection AFK
    ├── automessage/config.yml          # Annonces automatiques
    ├── chat/config.yml                 # Format du chat, ping, affichage d'items
    ├── customcommands/config.yml       # Vos propres commandes (/discord, /map...)
    ├── death_message/config.yml        # Messages de mort
    ├── discord/config.yml              # Webhooks Discord et liaison de comptes
    ├── economy/                        # config.yml, baltop.yml, confirm_pay_inventory.yml
    ├── hologram/                       # config.yml, holograms/
    ├── home/                           # config.yml, homes.yml, homes_donut.yml, home_delete.yml, public_homes.yml
    ├── items/config.yml                # Utilitaires d'items
    ├── join_quit/config.yml            # Messages de connexion/déconnexion
    ├── kits/                           # config.yml, kits.yml, kit_preview.yml, kits_categories.yml, kits/
    ├── mailbox/                        # config.yml, mailbox.yml, mailbox_admin.yml
    ├── messages/config.yml             # Messages privés
    ├── rules/                          # config.yml, rules.yml
    ├── sanction/                       # config.yml, sanction.yml, sanctions.yml, sanction_history.yml
    ├── scoreboard/config.yml           # Scoreboard dynamique
    ├── spawn/config.yml                # Spawn et premier spawn
    ├── steps/config.yml                # Suivi des étapes/progression
    ├── teleportation/                  # config.yml, confirm_request_inventory.yml, confirm_request_here_inventory.yml
    ├── vault/                          # config.yml, vault.yml, vault-admin.yml, vault-configuration.yml
    ├── vote/                           # config.yml, vote.yml
    ├── warp/                           # config.yml, warps.yml
    └── worldedit/                      # config.yml, pw-help.yml
```

<CalloutContainer type="info">

<CalloutDescription>
Chaque module possède son propre dossier dans `modules/`, avec un `config.yml` et, si besoin, les fichiers d'inventaires zMenu qu'il utilise. Un module peut être activé ou désactivé avec l'option `enable` de son `config.yml` sans impacter les autres modules.
</CalloutDescription>

</CalloutContainer>

## Configuration de la base de données

zEssentials supporte plusieurs moteurs de stockage, choisis avec l'option `storage-type` du `config.yml`. Consultez la page [Base de données](./database) pour tous les détails.

### SQLite (par défaut)

SQLite est le stockage par défaut et ne nécessite aucune configuration supplémentaire. Idéal pour les tests :

```yaml
storage-type: SQLITE
```

Le fichier de base de données est stocké dans `plugins/zEssentials/database.db`.

### MySQL / MariaDB / HikariCP

Recommandé pour les environnements de production et les configurations multi-serveurs :

```yaml
storage-type: HIKARICP # ou MYSQL / MARIADB

database-configuration:
  table-prefix: "zessentials_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: 'secret'
  database: zessentials
  debug: false
```

`MYSQL`, `MARIADB` et `HIKARICP` utilisent tous un pool de connexions HikariCP. `MARIADB` se connecte avec le driver MariaDB (`jdbc:mariadb:`), les deux autres valeurs utilisent une URL `jdbc:mysql:`.

### Valeurs par défaut de la configuration

| Propriété | Valeur par défaut |
|-----------|-------------------|
| `table-prefix` | `zessentials_` |
| `host` | `192.168.10.10` |
| `port` | `3306` |
| `user` | `homestead` |
| `password` | `secret` |
| `database` | `zessentials` |
| `debug` | `false` |

<CalloutContainer type="warning">

<CalloutDescription>
Changez impérativement les identifiants par défaut de la base de données avant de passer en production. Les valeurs par défaut sont des exemples et ne doivent pas être utilisées sur un serveur en ligne.
</CalloutDescription>

</CalloutContainer>

## Configuration Redis

Le fichier de configuration contient une section Redis prévue pour la synchronisation multi-serveurs (messages privés, kicks, annonces, cooldowns entre serveurs...) :

```yaml
redis-configuration:
  host: "192.168.10.10"
  port: 6379
  password: "123456a"
```

| Propriété | Description | Défaut |
|-----------|-------------|--------|
| `host` | Adresse du serveur Redis | `192.168.10.10` |
| `port` | Port du serveur Redis | `6379` |
| `password` | Mot de passe Redis | `123456a` |

## Type de serveur

```yaml
server-type: PAPER
```

| Valeur | Description |
|--------|-------------|
| `PAPER` | Mode par défaut. Toutes les données sont gérées localement, sans communication entre serveurs. |
| `REDIS` | Mode multi-serveurs utilisant le pub/sub Redis. |

<CalloutContainer type="warning">

<CalloutTitle>Mode Redis en développement</CalloutTitle>

<CalloutDescription>
Le type de serveur `REDIS` est **encore en développement** : dans la version actuelle, le serveur Redis n'est pas démarré, donc `server-type: REDIS` n'a aucun effet et le plugin se comporte comme avec `PAPER`. Pour un réseau, partagez la même base MySQL/MariaDB entre vos serveurs.
</CalloutDescription>

</CalloutContainer>

## Première configuration

Après l'installation, voici les premières étapes recommandées :

1. **Stockage** - Choisissez votre moteur de stockage (`SQLITE`, `MYSQL`, `MARIADB` ou `HIKARICP`) dans `config.yml`
2. **Modules** - Passez en revue les modules du dossier `modules/` et activez/désactivez-les selon vos besoins
3. **Économie** - Si vous utilisez le module Économie, configurez-le dans `modules/economy/config.yml` et installez Vault si d'autres plugins doivent l'utiliser
4. **Homes** - Définissez les limites de homes par permission dans `modules/home/config.yml`
5. **Kits** - Créez les kits de votre serveur dans `modules/kits/kits/`
6. **Première connexion** - Activez `enable-first-join-teleport` dans `config.yml` si les nouveaux joueurs doivent être téléportés au premier spawn (désactivé par défaut)
7. **Messages** - Personnalisez les messages du plugin dans le dossier `messages/`

Consultez la section [Configuration](./configuration/main-config) pour le détail des options.

## Dépannage

### Le plugin ne démarre pas

- Vérifiez que le serveur tourne sous **Paper** (ou un fork) **1.20.6+**. Sur Spigot, zEssentials reste inactif et affiche seulement un avertissement.
- Vérifiez la version de Java avec `java -version` : **Java 21+** est requis, **Java 25** pour Minecraft 26.x
- Vérifiez que **zMenu** et **PlaceholderAPI** sont installés et se chargent sans erreur
- Vérifiez que le serveur a pu télécharger le driver MariaDB au premier démarrage (accès Internet ou miroir Maven Central)
- Recherchez dans la console les erreurs mentionnant `fr.maxlego08.essentials.ZEssentialsPlugin`
- Assurez-vous que le fichier `.jar` n'est pas corrompu en le téléchargeant à nouveau

### « Cannot initialize zEssentials: zMenu ... service is unavailable »

zEssentials récupère les services de zMenu (`InventoryManager`, `ButtonManager` et `PatternManager`) dès son activation. Si zMenu n'a pas réussi à s'activer, zEssentials s'arrête désormais immédiatement avec une erreur explicite au lieu d'échouer plus tard :

```
Cannot initialize zEssentials: zMenu InventoryManager service is unavailable. Check that zMenu enabled successfully and its API is shared with zEssentials.
```

- Remontez dans la console et corrigez d'abord l'erreur signalée par **zMenu** (version obsolète, dépendance manquante...)
- Mettez zMenu à jour vers la dernière version
- Ne chargez pas et ne rechargez pas zEssentials ou zMenu à chaud avec un gestionnaire de plugins, redémarrez plutôt le serveur

### Les modules ne se chargent pas

- Vérifiez que le dossier du module existe dans `plugins/zEssentials/modules/`
- Vérifiez que le module est configuré avec `enable: true` dans son `config.yml`
- Recherchez dans la console les erreurs mentionnant le nom du module
- Assurez-vous que les dépendances optionnelles utilisées par ce module sont installées (par exemple NuVotifier pour les votes)

### Échec de la connexion à la base de données

- Vérifiez que les identifiants de la base de données dans `config.yml` sont corrects
- Assurez-vous que le serveur MySQL/MariaDB est démarré et accessible depuis le serveur Minecraft
- Vérifiez les règles du pare-feu si vous utilisez une base de données distante
- Confirmez que la base indiquée dans la configuration existe et que l'utilisateur possède les permissions nécessaires
- Activez `database-configuration.debug` pour afficher les requêtes SQL

### L'économie ne fonctionne pas

- Vérifiez que le module Économie est activé dans `modules/economy/config.yml`
- Si d'autres plugins utilisent Vault, assurez-vous que **Vault** est installé : zEssentials s'enregistre lui-même comme fournisseur d'économie Vault (seule l'économie avec `vault: true` est exposée)
- Exécutez `/vault-info` pour vérifier que Vault détecte bien zEssentials comme fournisseur d'économie

### Les placeholders PlaceholderAPI ne fonctionnent pas

- Assurez-vous que PlaceholderAPI est installé et chargé
- Exécutez `/papi list` pour vérifier que l'expansion zEssentials est enregistrée
- Vérifiez la syntaxe du placeholder (par exemple `%zessentials_user_balance_money%`)

### Les interfaces ne s'affichent pas

- Vérifiez que **zMenu** est installé et fonctionne correctement
- Vérifiez que les fichiers d'inventaires existent dans les dossiers des modules (par exemple `modules/home/homes.yml`)
- Recherchez des erreurs dans la console lors de l'ouverture d'un menu
- Assurez-vous que zMenu est à jour

## Étapes suivantes

- [Commandes & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/main-config)
- [Base de données](./database)
- [API & Événements](./development/events)
