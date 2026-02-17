---
sidebar_position: 1
title: Introduction
description: Introduction à zSpawner - Un plugin complet de gestion des spawners pour les serveurs Minecraft
---

# zSpawner

Bienvenue dans la documentation officielle de zSpawner !

zSpawner est un plugin complet de gestion des spawners pour les serveurs Minecraft (Paper/Spigot/Folia) qui propose trois types de spawners distincts, un système de spawners virtuels, des spawners empilables et des fonctionnalités de location d'emplacement.

## Fonctionnalités Clés

### Trois Types de Spawners

zSpawner propose trois types de spawners distincts pour s'adapter à différentes configurations de serveur :

- **CLASSIC** - Spawners traditionnels qui fonctionnent comme les spawners vanilla de Minecraft
- **GUI** - Spawners gérés via une interface graphique (`/zspawner`)
- **VIRTUAL** - Spawners avancés avec gestion personnalisée des entités, auto-kill, auto-sell, et plus

### Système de Spawner Virtuel

Le Spawner Virtuel est le type de spawner le plus avancé avec des options de personnalisation étendues :

- **Auto-Kill** - Tue automatiquement les entités générées
- **Auto-Sell** - Vend automatiquement les items récupérés (nécessite l'intégration zShop)
- **Tables de Drop Personnalisées** - Définissez des drops personnalisés par type d'entité
- **Contrôle du Taux de Spawn** - Configurez le délai min/max, le nombre de spawns et les limites d'entités
- **Multiplicateur d'Expérience** - Augmentez l'expérience gagnée des mobs générés
- **Multiplicateur de Loot** - Augmentez les taux de drop des entités générées
- **Location d'Emplacement** - Permettez aux joueurs de louer des emplacements de spawner

### Spawners Empilables

Combinez plusieurs spawners du même type en un seul bloc :

- **Limites par Entité** - Définissez des tailles de pile maximales par type d'entité
- **Configuration par Niveau** - Configurez les taux de spawn basés sur le nombre de piles
- **Affichage Hologramme** - Affichez le nombre de piles avec des hologrammes

### Minage de Spawner avec Silk Touch

Récoltez les spawners avec des outils Silk Touch :

- **Liste Blanche de Matériaux** - Définissez quels outils peuvent miner les spawners
- **Support des Spawners Naturels** - Option pour récolter les spawners naturels
- **Conversion de Type de Spawner** - Convertissez les spawners naturels en n'importe quel type zSpawner

### Protection contre les Explosions

Protégez les spawners des explosions :

- **Configuration par Type** - Activez/désactivez la protection par type de spawner
- **Drop lors d'Explosion** - Option pour dropper les spawners détruits par explosion
- **Protection des Spawners Naturels** - Protégez les spawners vanilla des explosions

### Système de Location d'Emplacement

Permettez aux joueurs de louer des emplacements de spawner :

- **Location Temporelle** - Les joueurs peuvent louer des positions de spawner pour des durées spécifiées
- **Prix Configurable** - Définissez des prix min/max par minute
- **Historique des Locations** - Suivez toutes les transactions de location

### Intégrations

- [zMenu](https://modrinth.com/plugin/zmenu) - Interfaces GUI entièrement personnalisables (Requis)
- [zShop](https://groupez.dev/) - Fonctionnalité auto-sell pour les spawners virtuels
- [zEssentials](https://modrinth.com/plugin/zessentials) - Intégration mailbox pour la livraison d'items
- [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) - Accès équipe d'île pour les spawners
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) - Placeholders personnalisés

### Plusieurs Backends de Stockage

- **SQLite** - Configuration rapide pour les petits serveurs
- **MySQL** - Recommandé pour les grands serveurs
- **MariaDB** - Alternative à MySQL

## Prérequis

| Prérequis | Version |
|-----------|---------|
| Java | 17 ou supérieur |
| Minecraft | 1.13 ou supérieur |
| zMenu | Dernière version |

## Plateformes Supportées

| Plateforme | Support |
|------------|---------|
| Paper | Recommandé |
| Spigot | Supporté |
| Purpur | Supporté |
| Folia | Supporté |

## Liens Rapides

- [Guide d'Installation](./installation)
- [Commandes & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/config)
- [Spawners Virtuels](./configuration/virtual-spawner)

## Support

- **Discord** : Rejoignez notre [serveur Discord](https://discord.groupez.dev) pour obtenir de l'aide
- **SpigotMC** : [spigotmc.org/resources/zspawner.69465](https://www.spigotmc.org/resources/zspawner.69465/)

## Téléchargement

- **SpigotMC** : [spigotmc.org/resources/zspawner.69465](https://www.spigotmc.org/resources/zspawner.69465/)
- **groupez.dev** : [groupez.dev](https://groupez.dev/)
