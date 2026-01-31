---
sidebar_position: 1
title: Introduction
description: Introduction à zAuctionHouse - Le plugin d'hôtel des ventes nouvelle génération pour Minecraft
---

# zAuctionHouse

Bienvenue dans la documentation de zAuctionHouse !

zAuctionHouse est la réécriture complète de zAuctionHouse, avec une architecture moderne, des performances améliorées et une API complète pour les développeurs. Il s'intègre parfaitement avec zMenu pour des interfaces d'inventaire entièrement personnalisables.

## Nouveautés de la V4

zAuctionHouse a été entièrement reconstruit avec :

- **Nouvelle Architecture** - Conception modulaire avec des modules API, Core et Hooks séparés
- **Système basé sur les Services** - Services dédiés pour la vente, l'achat et la gestion des objets
- **API CompletableFuture** - Opérations entièrement asynchrones pour de meilleures performances
- **Système d'Événements Amélioré** - Événements Pre et Post pour un contrôle total des opérations
- **Gestion des Objets Améliorée** - Meilleure abstraction avec les interfaces Item et AuctionItem

## Fonctionnalités Principales

### Économies Multiples
Support de divers systèmes économiques :
- Vault (toute économie compatible Vault)
- PlayerPoints
- Expérience / Niveaux
- Monnaies d'objets personnalisées
- Créez votre propre implémentation économique

### Système de Catégories Flexible
- Définissez des catégories avec un système de règles puissant
- Règles par matériau, nom, lore, tags NBT et model data
- Combinez les règles avec une logique ET/OU
- Support des listes noires et blanches

### Gestion Avancée des Objets
- Mettez en vente des objets avec des durées d'expiration personnalisables
- Système de réclamation automatique pour les objets achetés
- Réduction de prix au fil du temps
- Système de taxes sur les ventes ou achats

### Personnalisation Complète
- Toutes les interfaces personnalisables via zMenu
- Messages personnalisés pour chaque action
- Formatage des nombres (suffixes K, M, B)
- Support multilingue

### Support Multi-Serveur
- Synchronisez les enchères sur plusieurs serveurs
- Support des bases de données MySQL/MariaDB
- Mises à jour en temps réel entre serveurs

### API Développeur
- API propre et documentée
- Architecture basée sur les services
- Système d'événements avec hooks pre/post
- Support pour les implémentations d'économie personnalisées

## Comparaison avec la V3

| Fonctionnalité | V3 | V4 |
|----------------|----|----|
| Architecture | Monolithique | Modulaire (API/Core/Hooks) |
| Opérations Async | Partiel | CompletableFuture Complet |
| Système d'Événements | Basique | Événements Pre/Post |
| Services | Intégrés | Services Dédiés |
| Abstraction des Objets | Basique | Interfaces Item/AuctionItem |
| Qualité du Code | Bonne | Entièrement Refactorisé |

## Prérequis

- **Java 21+**
- **Minecraft 1.20.5+**
- **[zMenu](https://modrinth.com/plugin/zmenu)** - Requis pour les interfaces d'inventaire
- **PlaceholderAPI** - Optionnel, pour le support des placeholders
- **Vault** - Optionnel, pour l'intégration économique

## Plateformes Supportées

zAuctionHouse fonctionne avec :
- Spigot
- Paper (recommandé)
- Purpur
- Pufferfish
- Folia

## Liens Rapides

- [Guide d'Installation](./installation)
- [Commandes & Permissions](./commands-permissions)
- [Configuration](./configuration/config)
- [Documentation API](./development/api)

## Support

Besoin d'aide ? Voici vos options :
- **Discord** : Rejoignez notre [serveur Discord](https://discord.groupez.dev) pour obtenir de l'aide
- **GitHub** : Signalez les problèmes sur [GitHub](https://github.com/Maxlego08/zAuctionHouse)

## Téléchargement

- **Modrinth** : [modrinth.com/plugin/zauctionhouse](https://modrinth.com/plugin/zauctionhouse)
- **SpigotMC** : [spigotmc.org/resources/zauctionhouse](https://www.spigotmc.org/resources/zauctionhouse.00000/)
