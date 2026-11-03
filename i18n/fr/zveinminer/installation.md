---
title: Installation
description: Comment installer zVeinMiner sur votre serveur Paper
---

# Installation

Ce guide couvre l'installation de zVeinMiner et les fichiers qu'il crée au premier démarrage.

## Prérequis

Avant l'installation, assurez-vous que votre serveur répond à ces exigences :

| Prérequis | Version | Statut |
|-----------|---------|--------|
| Java | 25 ou supérieur | **Requis** |
| [Paper](https://papermc.io/downloads/paper) | 26.3 ou supérieur | **Requis** |
| [WorldGuard](https://enginehub.org/worldguard) (+ [WorldEdit](https://enginehub.org/worldedit)) | Dernière version | Optionnel |
| [GriefPrevention](https://modrinth.com/plugin/griefprevention) | Dernière version | Optionnel |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + un plugin d'économie | Dernière version | Optionnel |
| [PlaceholderAPI](https://modrinth.com/plugin/placeholderapi) | Dernière version | Optionnel |
| [NoCheatPlus](https://www.spigotmc.org/resources/nocheatplus.26/) | Dernière version | Optionnel |

zVeinMiner n'a **aucune dépendance obligatoire**. Chaque intégration est une dépendance optionnelle (soft dependency) : le plugin la détecte au démarrage et l'ignore simplement si elle n'est pas installée. Voir [Intégrations](./integrations) pour le rôle de chacune.

### Plateformes Supportées

| Plateforme | Support |
|------------|---------|
| Paper 26.3+ | Recommandé |
| Purpur et autres forks de Paper | Supporté |
| Spigot / CraftBukkit | Non supporté |
| Folia | Non supporté |

<CalloutContainer type="warning">

<CalloutTitle>Plugin Paper</CalloutTitle>

<CalloutDescription>
zVeinMiner est un **plugin Paper** (il embarque un `paper-plugin.yml`). Il ne se chargera pas sur Spigot ou CraftBukkit, et il ne supporte pas Folia. Les anciennes versions de Minecraft (1.21.x et inférieures) ne sont pas supportées par cette version.
</CalloutDescription>

</CalloutContainer>

## Étapes d'Installation

### 1. Télécharger le Plugin

Téléchargez zVeinMiner depuis l'une de ces sources :
- [Modrinth](https://modrinth.com/plugin/zveinminer)
- [groupez.dev](https://groupez.dev/)

### 2. Installer les Dépendances Optionnelles

Installez uniquement les intégrations dont vous avez besoin :

- **WorldGuard** (nécessite **WorldEdit**) - Le minage de filons respecte les protections de régions
- **GriefPrevention** - Le minage de filons respecte les claims
- **Vault** + un plugin d'économie - Faites payer le minage de filons aux joueurs (section `economy` de `config.yml`)
- **PlaceholderAPI** - Les placeholders des autres plugins sont interprétés dans chaque message envoyé à un joueur
- **NoCheatPlus** - Les joueurs sont exemptés des vérifications de cassage de blocs pendant le minage d'un filon

### 3. Installer le Plugin

1. Arrêtez votre serveur
2. Placez le `.jar` de zVeinMiner dans votre dossier `plugins/`
3. Démarrez votre serveur
4. Le plugin génère ses fichiers par défaut `config.yml` et `messages.yml`

<CalloutContainer type="info">

<CalloutTitle>Mise à jour depuis la 1.0.0</CalloutTitle>

<CalloutDescription>
Vos fichiers existants sont conservés. Les messages manquants sont ajoutés automatiquement à `messages.yml`, et l'ancien tag `NETHERITE_SCRAP` est converti en `ANCIENT_DEBRIS` lors du chargement des presets. Si votre `config.yml` ne contient pas l'option `match-by-tag`, elle vaut `false` par défaut (correspondance exacte du type de bloc, le comportement de la 1.0.0).
</CalloutDescription>

</CalloutContainer>

### 4. Vérifier l'Installation

Exécutez `/zveinminer` (alias : `/veinminer`, `/zvm`, nécessite `zveinminer.use`) en jeu ou depuis la console. Si le plugin est correctement chargé, il affiche les sous-commandes que vous avez la permission d'utiliser. Vous pouvez aussi exécuter `/zveinminer list` pour vérifier que les presets de `config.yml` ont bien été chargés.

Dans la console du serveur, recherchez des lignes comme :

```
[zVeinMiner] Hooked into WorldGuard
[zVeinMiner] Hooked into GriefPrevention
[zVeinMiner] Hooked into NoCheatPlus
```

Les lignes `Hooked into ...` n'apparaissent que pour les intégrations installées. Si un plugin installé ne peut pas être connecté, la console affiche à la place `Failed to hook into <plugin>: ...` (ou `<plugin> is installed but its hook is not available` pour WorldGuard et GriefPrevention). L'économie Vault est résolue la première fois qu'elle est nécessaire et affiche `Hooked into Vault economy: <provider>`.

## Structure des Fichiers

Après le premier démarrage, zVeinMiner crée la structure suivante :

```
plugins/zVeinMiner/
├── config.yml                # Configuration principale : options du minage de filons, mondes, drops, outils, économie, presets
├── messages.yml              # Tous les messages du plugin
└── playerdata/
    └── <uuid>.yml            # État d'activation et statistiques par joueur
```

Les données des joueurs sont stockées en YAML, un fichier par joueur. Un fichier est écrit lorsque le joueur quitte le serveur et lorsque le plugin est désactivé :

```yaml
vein-miner-enabled: true
statistics:
  total-blocks-mined: 0
  total-veins-mined: 0
```

Il n'y a aucune base de données à configurer. Voir [Configuration](./configuration) pour toutes les options de `config.yml` et `messages.yml`, et [Presets & Tags](./presets-and-tags) pour définir quels blocs peuvent être minés en filon.

## Première Configuration

Après l'installation, voici les premières étapes recommandées :

1. **Presets** - Ajustez le preset par défaut `pickaxe-1` ou ajoutez les vôtres dans la section `presets` de `config.yml`
2. **Limites** - Définissez `vein-mining.max-size-limit` et `vein-mining.cooldown` pour votre serveur
3. **Mondes** - Configurez `worlds.blacklist` (l'End est dans la blacklist par défaut)
4. **Donner des items** - Utilisez `/zveinminer apply <preset>` sur l'item en main ou `/zveinminer give <player> <preset> [material]` (matériau par défaut : `DIAMOND_PICKAXE`) pour créer des outils de minage de filons
5. **Rechargement** - Appliquez vos modifications avec `/zveinminer reload`

Voir [Commandes & Permissions](./commands-permissions) pour la liste complète des commandes.

## Dépannage

### Le plugin ne démarre pas

- Vérifiez que **Java 25+** est installé : `java -version`
- Vérifiez que le serveur tourne sous **Paper 26.3 ou plus récent** (ou un fork de Paper). Spigot et Folia ne peuvent pas charger le plugin
- Vérifiez la console du serveur pour les messages d'erreur
- Assurez-vous que le fichier `.jar` n'est pas corrompu en le re-téléchargeant

### Le minage de filons ne se déclenche pas

- L'outil en main doit avoir un preset ou des tags appliqués : vérifiez-le avec `/zveinminer info`
- Le joueur a besoin de la permission `zveinminer.use`
- Le joueur ne doit pas être en mode Aventure ou Spectateur
- Le bloc cassé doit correspondre à l'un des tags de l'outil, et l'outil doit être le bon outil pour ce bloc (par exemple une pioche pour les minerais)
- La taille de filon de l'outil (après application de `vein-mining.max-size-limit`) doit être supérieure à 1
- Le joueur a peut-être désactivé le minage de filons avec `/zveinminer toggle`
- Si `vein-mining.require-sneak` vaut `true`, le joueur doit être accroupi en cassant le bloc
- Le monde actuel est peut-être dans la blacklist (ou absent de la whitelist) de la section `worlds`
- Un `cooldown` est peut-être encore actif

### Un preset est manquant

- Les presets invalides sont ignorés avec un avertissement dans la console (`Preset '...' has an invalid size`, `has no tags list`, ...)
- Un tag inconnu est ignoré avec `the tag '...' is not a valid block tag or block material`
- Corrigez l'entrée dans `config.yml`, puis exécutez `/zveinminer reload`

### Les messages ne sont pas mis à jour

- Si `messages.yml` contient une erreur de syntaxe YAML, la console affiche `Unable to read messages.yml, the current messages are kept` et le fichier n'est **pas** écrasé. Corrigez la syntaxe et rechargez

### L'économie ne prélève pas les joueurs

- `economy.enabled` doit valoir `true` et `economy.cost-per-block` et/ou `economy.cost-per-vein` doivent être supérieurs à `0`
- Si la console affiche `no Vault economy provider was found: vein mining will be free`, installez un plugin d'économie compatible avec Vault

## Prochaines Étapes

- [Commandes & Permissions](./commands-permissions)
- [Configuration](./configuration)
- [Presets & Tags](./presets-and-tags)
- [Intégrations](./integrations)
