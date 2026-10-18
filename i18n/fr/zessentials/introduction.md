---
title: Introduction
description: Introduction à zEssentials - Un plugin essentials complet pour serveurs Minecraft
---

# zEssentials

Bienvenue dans la documentation officielle de zEssentials !

zEssentials est un plugin essentials complet et modulaire pour les serveurs Minecraft **Paper**, conçu avec une architecture moderne et une API étendue. Il fournit toutes les commandes et tous les systèmes de base nécessaires pour faire tourner un serveur Minecraft.

<CalloutContainer type="info">

<CalloutTitle>Paper uniquement</CalloutTitle>

<CalloutDescription>
Depuis la version **1.0.4.0**, zEssentials est un plugin Paper et nécessite **Paper (ou un fork comme Purpur, Pufferfish ou Folia) 1.20.6+**. Spigot n'est plus supporté : sur Spigot, le plugin reste inactif et affiche seulement un avertissement. Consultez [Installation](./installation) pour plus de détails.
</CalloutDescription>

</CalloutContainer>

## Fonctionnalités principales

### Architecture modulaire
Chaque fonctionnalité est un module indépendant qui peut être activé ou désactivé individuellement :
- **Économie** - Système multi-devises avec intégration Vault, paiements et baltop
- **Homes** - Homes des joueurs avec limites par permission, ainsi que **homes publics**, **homes partagés**, catégories, favoris et import depuis EssentialsX
- **Kits** - Système de kits configurable avec cooldowns et catégories
- **Téléportation** - TPA (avec file d'attente et activation/désactivation), back, top, bottom, téléportation aléatoire
- **Spawn & Warps** - Gestion du spawn, du premier spawn et des warps
- **Sanctions** - Ban, mute, kick, freeze avec historique et `/seen` configurable
- **Chat** - Format du chat, chat interactif, affichage d'items, son de ping, annonces
- **Messages privés** - `/msg`, `/reply`, social spy et un **système d'ignore** (`/ignore`, `/unignore`, `/ignorelist`)
- **Boîte aux lettres** - Livraison d'items hors ligne et **mails texte** (`/mail send`, `/mail read`...) pour les joueurs déconnectés
- **Commandes personnalisées** - Créez vos propres commandes (`/discord`, `/map`, `/store`...) directement depuis la configuration
- **Scoreboard** - Scoreboards dynamiques par joueur avec animations
- **Hologrammes** - Hologrammes de texte, d'items et de blocs
- **Coffres** - Coffres de stockage personnels
- **Votes** - Suivi des votes et système de vote party
- **WorldEdit** - Outils de construction intégrés
- **Messages de mort** - Messages de mort personnalisables par cause
- **Messages automatiques** - Annonces diffusées à intervalle régulier
- **Discord** - Notifications par webhook et liaison de comptes
- **AFK** - Détection d'inactivité (Away From Keyboard)
- **Règles, Étapes, Connexion/Déconnexion, Items** - Et bien d'autres utilitaires

### Paramètres joueurs persistants
- Le temps et la météo personnels (`/ptime`, `/pweather`) sont sauvegardés et réappliqués à la reconnexion
- Les options des joueurs (vanish, god, social spy, réception des demandes de téléportation, son de ping...) sont stockées en base de données

### Plusieurs moteurs de stockage
- **SQLite** - Installation rapide pour les tests
- **MySQL / MariaDB** - Recommandé pour la production
- **HikariCP** - Pool de connexions pour de hautes performances
- **JSON** - Stockage en fichiers (fonctionnalités limitées)

### Large compatibilité
- **Minecraft 1.20.6, 1.21 - 1.21.11 et 26.2** supportés
- **Paper** (recommandé), Purpur, Pufferfish et autres forks de Paper
- Compatible **Folia** (threading par régions)
- **Java 21+** requis (**Java 25** pour Minecraft 26.x)

### Nombreuses intégrations
- [zMenu](https://modrinth.com/plugin/zmenu) - Interfaces entièrement personnalisables
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) - Des centaines de placeholders personnalisés
- [Vault](https://www.spigotmc.org/resources/vault.34315/) - Backend d'économie
- [WorldGuard](https://enginehub.org/worldguard) - Protection des régions
- [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) - Permissions des îles
- [NuVotifier](https://www.spigotmc.org/resources/nuvotifier.13449/) - Réception des votes
- [BlockTracker](https://github.com/Krakenied/BlockTracker) - Suivi des modifications de blocs
- [MythicMobs](https://www.spigotmc.org/resources/mythicmobs.5702/) - Mobs personnalisés dans les messages de mort
- NChat - Application des mutes aux messages NChat

### API développeur
- API propre et modulaire avec 250 fichiers d'interfaces et de classes
- Événements personnalisés pour toutes les actions importantes
- Architecture basée sur les services
- Expansion PlaceholderAPI complète

### Migration de données
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
| Serveur | Paper (ou fork) 1.20.6 ou supérieur |
| Java | 21 ou supérieur (25 pour Minecraft 26.x) |
| zMenu | Dernière version |
| PlaceholderAPI | Dernière version |

## Liens rapides

- [Guide d'installation](./installation)
- [Commandes & Permissions](./commands-permissions)
- [Placeholders](./placeholders)
- [Configuration](./configuration/main-config)
- [Base de données](./database)
- [Migration de données](./converters)
- [API & Événements](./development/events)

## Support

- **Discord** : Rejoignez notre [serveur Discord](https://discord.groupez.dev) pour obtenir de l'aide
- **GitHub** : Signalez les problèmes sur [GitHub](https://github.com/Maxlego08/zEssentials)
- **Documentation** : [zessentials.groupez.dev](https://zessentials.groupez.dev/)

## Téléchargement

- **Modrinth** : [modrinth.com/plugin/zessentials](https://modrinth.com/plugin/zessentials)
- **groupez.dev** : [groupez.dev](https://groupez.dev/resources/zessentials.325/)
