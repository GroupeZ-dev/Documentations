---
sidebar_position: 6
title: Multi Serveur
description: Connecter plusieurs serveurs avec l'addon zAuctionHouse Redis
---

# Multi Serveur

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

:::info
zAuctionHouse utilise toujours SQL (MySQL/MariaDB) pour le stockage persistant des données. Redis est utilisé comme **couche de cache** pour la synchronisation en temps réel entre les serveurs.
:::

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

## Installation

### Prérequis

- zAuctionHouse V4 sur tous les serveurs
- Serveur Redis (6.0+ recommandé)
- Base de données MySQL/MariaDB (partagée entre tous les serveurs)

### Étape 1 : Installer Redis

Si vous n'avez pas de serveur Redis, vous pouvez en installer un :

**Ubuntu/Debian :**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

**Docker :**
```bash
docker run -d --name redis -p 6379:6379 redis:latest
```

De nombreux hébergeurs proposent également des instances Redis gérées.

### Étape 2 : Configurer zAuctionHouse

Assurez-vous que tous les serveurs utilisent la **même base de données MySQL** :

```yaml
storage-type: 'MYSQL'
server-name: 'skyblock'
database-configuration:
  table-prefix: 'zauctionhouse_'
  host: '192.168.10.10'
  port: 3306
  user: 'homestead'
  password: 'secret'
  database: 'zauctionhouse'
  debug: false
```

### Étape 3 : Installer l'Addon Redis

1. Téléchargez zAuctionHouseRedis depuis votre achat
2. Placez `zAuctionHouseRedis.jar` dans le dossier `plugins` de **chaque serveur**
3. Démarrez chaque serveur pour générer la configuration

### Étape 4 : Configurer la Connexion Redis

Modifiez `plugins/zAuctionHouseRedis/config.yml` sur chaque serveur :

```yaml
redis-config:
  host: '192.168.10.10'
  port: 6379
  user: ''
  password: ''
  channel-name: 'zauctionhouse'
  database: 0
  timeout: 2000
  lock-ttl-seconds: 30
  pool:
    max-total: 64
    max-idle: 32
    min-idle: 16
```

### Étape 5 : Redémarrer les Serveurs

Redémarrez tous les serveurs. Le plugin va automatiquement :
- Se connecter à votre serveur Redis
- S'abonner aux événements d'enchères
- Synchroniser les données entre les serveurs

## Vérification

Pour vérifier que l'addon fonctionne :

1. Vérifiez la console pour le message de connexion Redis réussie
2. Mettez un objet en vente sur le Serveur 1
3. Ouvrez `/ah` sur le Serveur 2 - l'objet devrait apparaître immédiatement
4. Achetez l'objet sur le Serveur 2
5. Vérifiez le Serveur 1 - l'objet devrait être retiré de la liste

## Dépannage

### Impossible de se connecter à Redis

- Vérifiez que Redis fonctionne : `redis-cli ping` devrait retourner `PONG`
- Vérifiez l'hôte et le port dans la configuration
- Assurez-vous que le pare-feu autorise les connexions sur le port 6379
- Si vous utilisez l'authentification par mot de passe, vérifiez que le mot de passe est correct

### Les objets ne se synchronisent pas

- Assurez-vous que tous les serveurs utilisent la même base de données MySQL
- Vérifiez que l'addon Redis est installé sur **tous** les serveurs
- Consultez la console pour les messages d'erreur
- Assurez-vous que tous les serveurs peuvent se connecter à Redis

### Haute latence

- Envisagez d'utiliser un serveur Redis dans le même datacenter que vos serveurs de jeu
- Vérifiez les ressources du serveur Redis (CPU, mémoire)
- Examinez les paramètres du pool de connexions

## Conseils de Performance

1. **Utilisez un serveur Redis local** - Gardez Redis dans le même datacenter que vos serveurs
2. **Ajustez le pool de connexions** - Adaptez les paramètres du pool selon la charge de votre serveur
3. **Surveillez Redis** - Utilisez `redis-cli INFO` pour surveiller la performance
4. **Activez la persistance** - Configurez Redis RDB/AOF pour la sécurité des données (optionnel)

## Support

Besoin d'aide pour configurer le multi-serveur ? Rejoignez notre [serveur Discord](https://discord.groupez.dev) pour obtenir du support.
