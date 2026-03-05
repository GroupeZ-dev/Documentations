---
sidebar_position: 2
title: Installer zAuctionHouse
description: Comment télécharger, installer et configurer zAuctionHouse sur votre serveur Minecraft
---

# Installer zAuctionHouse

Ce guide couvre le téléchargement et l'installation de zAuctionHouse sur votre serveur.

## Téléchargement

zAuctionHouse est disponible sur plusieurs plateformes :

| Plateforme | Lien | Notes |
|------------|------|-------|
| **Spigot** | [spigotmc.org/resources/63010](https://www.spigotmc.org/resources/63010/) | Version premium |
| **GroupeZ** | [groupez.dev/resources/1](https://groupez.dev/resources/1) | Version premium |
| **BuiltByBit** | [builtbybit.com/resources/8987](https://builtbybit.com/resources/8987/) | Version premium |
| **Modrinth** | [modrinth.com/plugin/zauctionhouse](https://modrinth.com/plugin/zauctionhouse) | Version d'essai gratuite |
| **GitHub** | [github.com/GroupeZ-dev/zAuctionHouse](https://github.com/GroupeZ-dev/zAuctionHouse) | Code source |

:::info Support
Le support est inclus avec la version premium. Les utilisateurs de la version d'essai gratuite peuvent accéder au support communautaire sur notre [serveur Discord](https://discord.groupez.dev).
:::

## Prérequis

Avant l'installation, assurez-vous que votre serveur respecte ces exigences :

### Exigences serveur

| Exigence | Version |
|----------|---------|
| **Java** | 21 ou supérieur |
| **Minecraft** | 1.21 ou supérieur |

### Logiciels serveur supportés

| Logiciel | Statut |
|----------|--------|
| **Paper** | Recommandé |
| **Folia** | Entièrement supporté |
| **Pufferfish** | Supporté |
| **Purpur** | Supporté |
| **UniverSpigot** | Supporté |
| **Spigot** | Supporté (non recommandé) |

Paper et ses forks sont recommandés pour les meilleures performances et compatibilité.

### Plugins requis

| Plugin | Lien |
|--------|------|
| **zMenu** | [modrinth.com/plugin/zmenu](https://modrinth.com/plugin/zmenu) |
| **PlaceholderAPI** | [spigotmc.org/resources/6245](https://www.spigotmc.org/resources/placeholderapi.6245/) |

:::tip Utilisateurs Folia
Pour les serveurs Folia, utilisez ces versions forkées :
- **PlaceholderAPI** : [Fork Folia](https://github.com/Anon8281/PlaceholderAPI/releases/tag/1.1)
- **Vault** : [Fork Folia](https://github.com/Geolykt/Vault/releases)
:::

### Plugins recommandés

| Plugin | Lien | Description |
|--------|------|-------------|
| **Vault** | [spigotmc.org/resources/34315](https://www.spigotmc.org/resources/vault.34315/) | Intégration économique |

## Étapes d'installation

### 1. Téléchargez les plugins

Téléchargez zAuctionHouse et tous les plugins requis depuis les liens ci-dessus.

### 2. Installez les plugins

Placez tous les fichiers `.jar` dans le dossier `plugins/` de votre serveur :
- `zAuctionHouse.jar`
- `zMenu.jar`
- `PlaceholderAPI.jar`
- `Vault.jar` (recommandé)

### 3. Démarrez votre serveur

Démarrez votre serveur pour générer les fichiers de configuration par défaut.

### 4. Configurez le plugin

Modifiez les fichiers de configuration dans `plugins/zAuctionHouse/` pour personnaliser le plugin pour votre serveur. Consultez la section [Configuration](./configuration/config) pour plus de détails.

### 5. Redémarrez votre serveur

Redémarrez votre serveur pour appliquer les changements de configuration. Vous êtes prêt à utiliser zAuctionHouse !

## Vérifier l'installation

Exécutez `/ah` pour ouvrir l'interface de l'hôtel des ventes. Si tout fonctionne correctement, vous devriez voir l'interface principale de l'hôtel des ventes.

## Structure des fichiers

Après le premier démarrage, zAuctionHouse crée la structure suivante :

```
plugins/zAuctionHouse/
├── config.yml              # Configuration principale
├── messages.yml            # Tous les messages du plugin
├── categories.yml          # Définitions des catégories
├── economies/
│   └── vault.yml           # Configurations économiques
├── inventories/
│   ├── auction.yml         # Interface principale de l'hôtel des ventes
│   ├── categories.yml      # Sélection des catégories
│   ├── confirm_buy.yml     # Confirmation d'achat
│   ├── confirm_remove.yml  # Confirmation de retrait
│   ├── expired.yml         # Objets expirés
│   ├── player.yml          # Annonces du joueur
│   ├── purchased.yml       # Objets achetés
│   └── sell.yml            # Interface de vente
├── rules.yml               # Règles des objets
└── database.db             # Base de données SQLite (si SQLite utilisé)
```

## Prochaines étapes

- [Pourquoi ai-je besoin de zMenu ?](./why-zmenu) - En savoir plus sur l'intégration de zMenu
- [Commandes & Permissions](./commands-permissions) - Référence complète des commandes
- [Configuration](./configuration/config) - Personnalisez tout
