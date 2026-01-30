---
sidebar_position: 2
title: Installation
description: Comment telecharger, installer et configurer zQuests sur votre serveur Minecraft
---

# Installation de zQuests

Ce guide vous accompagne dans le processus d'installation de zQuests sur votre serveur Minecraft.

## Prerequis

Avant d'installer zQuests, assurez-vous que votre serveur repond aux exigences suivantes :

| Prerequis | Version |
|-----------|---------|
| Minecraft | 1.20.4 a 1.21.4 |
| Java | **Java 21** (requis) |
| Logiciel serveur | Spigot, Paper ou Folia |
| zMenu | **Requis** |

:::warning Dependance requise
**zMenu est requis** pour que zQuests fonctionne. Assurez-vous d'installer [zMenu](https://modrinth.com/plugin/zmenu) avant d'installer zQuests.
:::

:::tip Configuration recommandee
Pour la meilleure experience, nous recommandons d'utiliser **Paper** ou ses forks. Cela active le support du formatage MiniMessage et offre de meilleures performances.
:::

:::caution Serveurs moddes
Les logiciels de serveur moddes (Forge, Fabric avec couches de compatibilite Bukkit) ne sont **pas supportes**.
:::

## Telechargement

Vous pouvez telecharger zQuests depuis :

- **GitHub** : [https://github.com/Maxlego08/zQuests](https://github.com/Maxlego08/zQuests)
- **Modrinth** : Verifiez les releases sur Modrinth
- **SpigotMC** : Disponible sur SpigotMC

## Etapes d'installation

### Etape 1 : Installer les dependances

D'abord, assurez-vous d'avoir les plugins requis installes :

1. **zMenu** - Telecharger depuis [Modrinth](https://modrinth.com/plugin/zmenu) ou [SpigotMC](https://www.spigotmc.org/resources/zmenu.110402/)
2. **PlaceholderAPI** (Recommande) - Telecharger depuis [SpigotMC](https://www.spigotmc.org/resources/placeholderapi.6245/)
   - Pour les serveurs Folia, utilisez la [version compatible Folia](https://github.com/Anon8281/PlaceholderAPI/releases/tag/1.1)

### Etape 2 : Telecharger zQuests

Telechargez la derniere version de `zQuests.jar` depuis l'une des sources listees ci-dessus.

### Etape 3 : Installer le plugin

1. Arretez votre serveur Minecraft s'il est en cours d'execution
2. Placez le fichier `zQuests.jar` dans le dossier `plugins/` de votre serveur
3. Demarrez votre serveur

### Etape 4 : Verifier l'installation

Apres le demarrage de votre serveur, verifiez que zQuests s'est charge correctement :

1. Verifiez dans la console du serveur :
   ```
   [zQuests] zQuests has been enabled!
   ```

2. Executez la commande `/zquests help` en jeu ou depuis la console

### Etape 5 : Configuration initiale

Apres le premier demarrage, zQuests creera la structure de dossiers suivante :

```
plugins/zQuests/
├── config.yml                    # Fichier de configuration principal
├── messages.yml                  # Traductions des messages
├── holograms.yml                 # Configurations des hologrammes
├── waypoints.yml                 # Configurations des waypoints
├── quests/                       # Fichiers de definition des quetes
│   ├── blocks.yml                # Quetes liees aux blocs
│   ├── brew.yml                  # Quetes de brassage
│   ├── craft.yml                 # Quetes d'artisanat
│   ├── enchants.yml              # Quetes d'enchantement
│   ├── entities.yml              # Quetes liees aux entites
│   ├── farming.yml               # Quetes d'agriculture
│   ├── fish.yml                  # Quetes de peche
│   └── smelt.yml                 # Quetes de fonte
└── inventories/                  # Fichiers d'inventaires zMenu
    └── quests.yml                # Inventaire de quetes par defaut
```

## Dependances optionnelles

zQuests s'integre avec plusieurs plugins pour des fonctionnalites ameliorees :

### Plugins recommandes

| Plugin | Objectif |
|--------|---------|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Afficher les donnees de quetes dans d'autres plugins |
| [zEssentials](https://groupez.dev/) | Support des hologrammes et waypoints |

### Plugins d'economie

| Plugin | Integration |
|--------|-------------|
| [zShop](https://groupez.dev/) | Types de quetes SELL et PURCHASE |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Recompenses economiques |

### Plugins de metiers

| Plugin | Integration |
|--------|-------------|
| [zJobs](https://groupez.dev/) | Types de quetes JOB_LEVEL et JOB_PRESTIGE |

### Plugins Skyblock

| Plugin | Integration |
|--------|-------------|
| [SuperiorSkyBlock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) | Type de quete ISLAND |

## Configuration de la base de donnees

zQuests supporte plusieurs options de stockage :

### SQLite (Par defaut)

SQLite est l'option de stockage par defaut et ne necessite aucune configuration supplementaire. C'est adapte pour les petits serveurs et les tests.

```yaml
storage-type: SQLITE
```

:::warning Limitations de SQLite
SQLite est recommande uniquement pour les tests et les petits serveurs. Certaines fonctionnalites peuvent avoir des fonctionnalites limitees. Pour les serveurs de production, utilisez MySQL ou HikariCP.
:::

### MySQL

Pour de meilleures performances et un support complet des fonctionnalites, utilisez MySQL :

```yaml
storage-type: MYSQL

database-configuration:
  table-prefix: "zquests_"
  host: 192.168.10.10
  port: 3306
  user: votre_utilisateur
  password: 'votre_mot_de_passe'
  database: zquests
  debug: false
```

### HikariCP (Recommande)

HikariCP fournit un pool de connexions pour des performances de base de donnees optimales :

```yaml
storage-type: HIKARICP

database-configuration:
  table-prefix: "zquests_"
  host: 192.168.10.10
  port: 3306
  user: votre_utilisateur
  password: 'votre_mot_de_passe'
  database: zquests
  debug: false
```

## Depannage

### Le plugin ne se charge pas

Si zQuests n'apparait pas dans `/plugins` :

1. Verifiez la console pour les erreurs au demarrage
2. Verifiez que zMenu est installe et charge
3. Assurez-vous d'utiliser Java 21 ou plus recent
4. Verifiez que le fichier JAR n'est pas corrompu

### zMenu non trouve

Si vous voyez des erreurs "zMenu not found" :

1. Assurez-vous que zMenu est dans le dossier plugins
2. Verifiez que zMenu se charge avant zQuests
3. Mettez a jour les deux plugins vers leurs dernieres versions

### Echec de connexion a la base de donnees

Si la connexion a la base de donnees echoue :

1. Verifiez que les identifiants sont corrects
2. Verifiez que le serveur de base de donnees fonctionne
3. Assurez-vous que l'utilisateur a les permissions appropriees
4. Verifiez les parametres du pare-feu

## Mise a jour de zQuests

Pour mettre a jour zQuests :

1. Telechargez la derniere version
2. Arretez votre serveur
3. Sauvegardez votre dossier `plugins/zQuests/`
4. Remplacez l'ancien `zQuests.jar` par le nouveau
5. Demarrez votre serveur
6. Executez `/zquests reload` si necessaire

:::warning Sauvegardez d'abord
Sauvegardez toujours vos fichiers de configuration avant la mise a jour, specialement le dossier `quests/` contenant vos definitions de quetes.
:::

## Prochaines etapes

Maintenant que zQuests est installe, apprenez a :

1. [Configurer les quetes](./configurations/quests)
2. [Explorer les types de quetes](./configurations/quest-types)
3. [Configurer les recompenses](./configurations/rewards)
4. [Utiliser les commandes et permissions](./configurations/commands-permissions)
