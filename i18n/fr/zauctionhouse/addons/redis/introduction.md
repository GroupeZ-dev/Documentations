---
title: zAuctionHouse Redis
description: Connecter plusieurs serveurs avec l'addon zAuctionHouse Redis
---

# zAuctionHouse Redis

zAuctionHouse a été conçu dès le départ avec la performance et l'évolutivité en tête. Que vous gériez un petit serveur survie ou un grand réseau comme DonutSMP, zAuctionHouse est construit pour gérer un trafic élevé et plusieurs serveurs de manière transparente.

## Addon zAuctionHouse Redis

Pour connecter plusieurs serveurs et synchroniser votre hôtel des ventes sur l'ensemble de votre réseau, vous avez besoin de l'addon **zAuctionHouse Redis**.

<div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', marginBottom: '20px' }}>
  <a href="https://groupez.dev/resources/zauctionhouse-redis.210" style={{ padding: '12px 24px', backgroundColor: '#2CCED2', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Acheter sur GroupeZ - 15€</a>
  <a href="https://builtbybit.com/resources/zauctionhouse-redis.23405/" style={{ padding: '12px 24px', backgroundColor: '#4a5568', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Acheter sur BuiltByBit - 20.99$</a>
</div>

### Fonctionnalités

- **Synchronisation en temps réel** - Les objets mis en vente sur un serveur apparaissent instantanément sur tous les autres
- **Verrouillage distribué** - Empêche les doubles achats et les conditions de course
- **Propagation des événements** - Tous les événements d'enchères (mise en vente, achat, retrait) sont synchronisés
- **Invalidation du cache** - Garantit que tous les serveurs ont des données à jour
- **Haute performance** - Impact minimal sur la latence de vos serveurs

## Pourquoi Redis ?

Redis est un stockage de structures de données en mémoire qui fournit des opérations de lecture et d'écriture extrêmement rapides. Il est particulièrement adapté aux scénarios où plusieurs serveurs doivent partager et synchroniser des données en temps réel.

### Comparaison de Performance

| Solution | Vitesse | Synchronisation Temps Réel | Cohérence des Données |
|----------|---------|---------------------------|----------------------|
| **Redis** | Extrêmement rapide (en mémoire) | Oui | Excellente |
| Base de Données SQL | Plus lente (basée sur disque) | Non | Bonne |
| BungeeCord/Velocity | N/A | Non | N/A |

### Pourquoi pas SQL ?

Contrairement aux bases de données SQL traditionnelles, qui sont basées sur le disque et peuvent introduire une latence significative lors de la gestion d'opérations de lecture et d'écriture fréquentes, Redis opère directement en mémoire. Cela le rend idéal pour les applications nécessitant un accès haute performance et à faible latence aux données partagées.

Utiliser SQL pour synchroniser plusieurs serveurs n'est pas efficace pour un hôtel des ventes. Les bases de données SQL sont conçues pour le stockage persistant, ce qui signifie que chaque opération de lecture ou d'écriture implique un accès au disque. Cela devient un goulot d'étranglement lors de la gestion de mises à jour fréquentes depuis plusieurs serveurs. De plus, SQL ne fournit pas la synchronisation en temps réel qu'un hôtel des ventes nécessite, entraînant des délais et des conflits de données potentiels.

<CalloutContainer type="info">

<CalloutDescription>
zAuctionHouse utilise toujours SQL (MySQL/MariaDB) pour le stockage persistant des données. Redis est utilisé comme **couche de cache** pour la synchronisation en temps réel entre les serveurs.
</CalloutDescription>

</CalloutContainer>

### Pourquoi pas la messagerie BungeeCord/Velocity ?

BungeeCord et Velocity sont des solutions de proxy qui facilitent la communication entre les serveurs Minecraft, mais ils ne sont pas conçus pour la synchronisation de données. Bien qu'ils puissent transmettre des messages entre serveurs, ils n'ont pas la capacité de gérer efficacement des données partagées comme les objets d'enchères.

Redis, en revanche, est conçu exactement pour cet objectif : fournir un cache partagé à accès rapide que plusieurs serveurs peuvent utiliser pour assurer la cohérence des données.

### Avantages Clés de Redis

1. **Stockage en mémoire** - Les données sont stockées en RAM pour un accès instantané
2. **Messagerie Pub/Sub** - Propagation d'événements en temps réel sur tous les serveurs
3. **Opérations atomiques** - Empêche les conditions de course et la corruption de données
4. **Verrouillage distribué** - Garantit qu'un seul serveur peut modifier un objet à la fois
5. **Évolutivité** - Gère des milliers d'opérations par seconde

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Serveur 1  │     │  Serveur 2  │     │  Serveur 3  │
│zAuctionHouse│     │zAuctionHouse│     │zAuctionHouse│
│+ Addon Redis│     │+ Addon Redis│     │+ Addon Redis│
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌──────▼──────┐
                    │    Redis    │
                    │   Serveur   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   MySQL /   │
                    │   MariaDB   │
                    └─────────────┘
```

**Comment ça fonctionne :**
1. Un joueur met un objet en vente sur le Serveur 1
2. L'objet est sauvegardé dans la base de données MySQL
3. Redis publie un événement à tous les serveurs
4. Les Serveurs 2 et 3 reçoivent l'événement et mettent à jour leur cache
5. Les joueurs sur tous les serveurs voient l'objet instantanément

## Étapes suivantes

- [Installation](/zauctionhouse/addons/redis/installation) : installer Redis et configurer l'addon sur chaque serveur
- [Dépannage](/zauctionhouse/addons/redis/troubleshooting) : résoudre les problèmes de connexion et de synchronisation
