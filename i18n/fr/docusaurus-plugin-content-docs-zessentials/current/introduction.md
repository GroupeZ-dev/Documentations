---
sidebar_position: 1
title: Introduction
description: Introduction à zEssentials - Un plugin essentials complet pour les serveurs Minecraft
---

# zEssentials

Bienvenue dans la documentation officielle de zEssentials !

zEssentials est un plugin essentials complet et modulaire pour les serveurs Minecraft (Paper/Spigot), construit avec une architecture moderne, un support API étendu et des capacités multi-serveurs via Redis. Il fournit toutes les commandes et systèmes essentiels nécessaires pour gérer un serveur Minecraft.

## Fonctionnalités Principales

### Architecture Modulaire
Chaque fonctionnalité est un module indépendant qui peut être activé ou désactivé individuellement :
- **Economy** - Système multi-devises avec intégration Vault
- **Homes** - Résidences des joueurs avec limites basées sur les permissions
- **Kits** - Système de kits configurable avec temps de recharge
- **Teleportation** - TPA, warps, spawn, téléportation aléatoire
- **Sanctions** - Ban, mute, kick, freeze avec historique
- **Chat** - Formatage du chat, chat interactif, diffusion
- **Scoreboard** - Scoreboards dynamiques par joueur avec animations
- **Holograms** - Hologrammes de texte, d'objets et de blocs
- **Vaults** - Coffres de stockage personnels des joueurs
- **Mailbox** - Système de livraison d'objets hors ligne
- **Voting** - Suivi des votes et système de vote party
- **WorldEdit** - Outils de construction intégrés
- **Discord** - Notifications webhook et liaison de comptes
- **AFK** - Détection d'absence

### Support Multi-Serveurs
- Intégration Redis pour la messagerie inter-serveurs
- Synchronisation des données joueurs, temps de recharge et sanctions
- Messages privés et diffusions inter-serveurs

### Multiples Backends de Stockage
- **SQLite** - Installation rapide pour les tests
- **MySQL / MariaDB** - Recommandé pour la production
- **HikariCP** - Pool de connexions pour haute performance

### Compatibilité Étendue
- **Minecraft 1.20.4 - 1.21.11** supporté
- **Paper** (recommandé), Spigot, Purpur, Pufferfish
- **Folia** compatible (threading asynchrone)
- **Java 21+** requis

### Intégrations Riches
- [zMenu](https://modrinth.com/plugin/zmenu) - Interfaces GUI entièrement personnalisables
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) - 76+ placeholders personnalisés
- [Vault](https://www.spigotmc.org/resources/vault.34315/) - Backend économique
- [WorldGuard](https://enginehub.org/worldguard) - Protection de régions
- [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) - Permissions d'îles
- [ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/) - Manipulation de paquets
- [NuVotifier](https://www.spigotmc.org/resources/nuvotifier.13449/) - Réception de votes
- [BlockTracker](https://github.com/Krakenied/BlockTracker) - Suivi des modifications de blocs

### API Développeur
- API propre et modulaire avec 242 fichiers d'interface
- Événements personnalisés pour toutes les actions majeures
- Architecture basée sur les services
- Expansion PlaceholderAPI complète

### Migration de Données
Convertisseurs intégrés depuis :
- EssentialsX
- CMI
- CoinsEngine
- HuskHomes
- PlayerVaultX
- AxVaults
- Sunlight

## Prérequis

| Prérequis | Version |
|-----------|---------|
| Java | 21 ou supérieur |
| Minecraft | 1.20.4 ou supérieur |
| zMenu | Dernière version |
| PlaceholderAPI | Dernière version |

## Liens Rapides

- [Guide d'Installation](./installation)
- [Commandes & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/main-config)
- [Base de Données](./database)
- [API & Événements](./development/events)

## Support

- **Discord** : Rejoignez notre [serveur Discord](https://discord.groupez.dev) pour obtenir de l'aide
- **GitHub** : Signalez les problèmes sur [GitHub](https://github.com/Maxlego08/zEssentials)
- **Documentation** : [zessentials.groupez.dev](https://zessentials.groupez.dev/)

## Téléchargement

- **Modrinth** : [modrinth.com/plugin/zessentials](https://modrinth.com/plugin/zessentials)
- **groupez.dev** : [groupez.dev](https://groupez.dev/)
