---
sidebar_position: 2
title: Installation de zMenu
description: Comment telecharger, installer et configurer zMenu sur votre serveur Minecraft
---

# Installation de zMenu

Ce guide vous accompagnera dans le processus d'installation de zMenu sur votre serveur Minecraft.

## Prerequis

Avant d'installer zMenu, assurez-vous que votre serveur repond aux exigences suivantes :

| Prerequis | Version minimum |
|-----------|-----------------|
| Minecraft | 1.8.x ou superieur |
| Java | Java 8+ (Java 21 recommande) |
| Logiciel serveur | Spigot, Paper, Purpur, Pufferfish ou Folia |

:::tip Configuration recommandee
Pour une meilleure experience, nous recommandons d'utiliser **Paper** ou **Purpur** avec **Java 21**. Cela active le support du formatage MiniMessage et offre de meilleures performances.
:::

## Telechargement

Vous pouvez telecharger zMenu depuis les sources suivantes :

- **SpigotMC** (Principal) : [https://www.spigotmc.org/resources/zmenu.110402/](https://www.spigotmc.org/resources/zmenu.110402/)
- **GitHub Releases** : [https://github.com/Maxlego08/zMenu/releases](https://github.com/Maxlego08/zMenu/releases)
- **Modrinth** : [https://modrinth.com/plugin/zmenu](https://modrinth.com/plugin/zmenu)

## Etapes d'installation

### Etape 1 : Telecharger le plugin

Telechargez la derniere version de `zMenu.jar` depuis l'une des sources listees ci-dessus.

### Etape 2 : Installer le plugin

1. Arretez votre serveur Minecraft s'il est en cours d'execution
2. Placez le fichier `zMenu.jar` dans le dossier `plugins/` de votre serveur
3. Demarrez votre serveur

### Etape 3 : Verifier l'installation

Apres le demarrage de votre serveur, verifiez que zMenu s'est charge correctement :

1. Verifiez dans la console du serveur :
   ```
   [zMenu] zMenu has been enabled!
   ```

2. Executez la commande `/zm version` en jeu ou depuis la console pour voir les informations de version

### Etape 4 : Configuration initiale

Apres le premier demarrage, zMenu creera la structure de dossiers suivante :

```
plugins/zMenu/
├── config.yml                    # Fichier de configuration principal
├── global-placeholders.yml       # Valeurs des placeholders globaux
├── commands/
│   └── commands.yml              # Definitions des commandes personnalisees
├── inventories/
│   ├── basic_inventory.yml       # Exemple d'inventaire
│   ├── advanced_inventory.yml    # Exemple avance
│   └── pro_inventory.yml         # Exemple pro
├── patterns/
│   └── pattern_example.yml       # Exemple de pattern
├── items/
│   └── default-items.yml         # Definitions d'items reutilisables
├── actions_patterns/
│   └── default-actions.yml       # Patterns d'actions par defaut
└── dialogs/                      # Modeles de dialogues (1.20.5+)
```

## Dependances optionnelles

zMenu fonctionne de maniere autonome mais s'integre avec de nombreux plugins populaires pour des fonctionnalites ameliorees :

### Plugins recommandes

| Plugin | Objectif |
|--------|----------|
| [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) | Afficher des valeurs dynamiques dans les items et messages |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) | Integration economique |
| [LuckPerms](https://luckperms.net/) | Exigences basees sur les permissions |

### Plugins d'items (Optionnel)

Ces plugins vous permettent d'utiliser des items personnalises dans vos menus :

| Plugin | Integration |
|--------|-------------|
| [ItemsAdder](https://www.spigotmc.org/resources/itemsadder.73355/) | Items et textures personnalises |
| [Oraxen](https://www.spigotmc.org/resources/oraxen.72448/) | Items et modeles personnalises |
| [HeadDatabase](https://www.spigotmc.org/resources/head-database.14280/) | Tetes de joueurs personnalisees |
| [Slimefun](https://github.com/Slimefun/Slimefun4) | Items Slimefun |
| [MythicMobs](https://www.spigotmc.org/resources/mythicmobs.5702/) | Items MythicMobs |
| [ExecutableItems](https://www.spigotmc.org/resources/executableitems.77578/) | Support ExecutableItems |

### Autres integrations

| Plugin | Integration |
|--------|-------------|
| [Jobs Reborn](https://www.spigotmc.org/resources/jobs-reborn.4216/) | Exigences de niveau de metier |
| [zHead](https://www.spigotmc.org/resources/zhead.115717/) | Textures de tetes personnalisees |
| [packetevents](https://www.spigotmc.org/resources/packetevents-api.80279/) | Requis pour le systeme de dialogues (1.20.5+) |

## Fichiers de configuration

### config.yml

Le fichier de configuration principal controle les parametres globaux du plugin. Voici un apercu des options cles :

```yaml
# Activer le mode debug pour le depannage
enable-debug: false

# Parametres de base de donnees (SQLITE, MYSQL, MARIADB ou NONE)
storage-type: SQLITE

# Activer le formatage MiniMessage (Paper/Purpur uniquement)
enable-mini-message-format: true

# Parametres de cache pour les performances
enable-cache-item-stack: true
enable-cache-placeholder-api: false

# Protection anti-duplication
enable-anti-dupe: true

# Delai de clic pour prevenir le spam
enable-cooldown-click: true
cooldown-click-milliseconds: 100

# Inventaire par defaut ouvert par le bouton menu principal
main-menu: "example"
```

Consultez la [documentation config.yml](./configurations/config-yml) pour toutes les options disponibles.

## Depannage

### Le plugin ne se charge pas

Si zMenu n'apparait pas dans `/plugins` :

1. Verifiez la console pour des erreurs au demarrage
2. Verifiez que le fichier JAR n'est pas corrompu (re-telechargez si necessaire)
3. Assurez-vous d'utiliser une version de serveur compatible

### Erreurs de configuration

Si vous voyez des erreurs d'analyse YAML :

1. Utilisez un validateur YAML comme [YAML Lint](http://www.yamllint.com/)
2. Verifiez l'indentation incorrecte (utilisez des espaces, pas des tabulations)
3. Assurez-vous que les caracteres speciaux sont correctement entre guillemets

### Les placeholders ne fonctionnent pas

Si les placeholders PlaceholderAPI ne fonctionnent pas :

1. Assurez-vous que PlaceholderAPI est installe
2. Installez l'expansion requise : `/papi ecloud download <expansion>`
3. Rechargez PlaceholderAPI : `/papi reload`

## Mise a jour de zMenu

Pour mettre a jour zMenu :

1. Telechargez la derniere version
2. Arretez votre serveur
3. Remplacez l'ancien `zMenu.jar` par le nouveau
4. Demarrez votre serveur
5. Executez `/zm reload` si les configurations n'ont pas change

:::warning Sauvegardez d'abord
Sauvegardez toujours votre dossier `plugins/zMenu/` avant la mise a jour, surtout si vous avez personnalise les configurations.
:::

## Prochaines etapes

Maintenant que zMenu est installe, apprenez comment :

1. [Comprendre le systeme de configuration](./configurations/informations)
2. [Creer votre premier inventaire](./configurations/inventories/create-inventory)
3. [Utiliser les commandes et permissions](./configurations/commands-permissions)
