---
title: Installation
description: Installer et configurer l'addon zAuctionHouse Redis
---

# Installation

## Prérequis

- zAuctionHouse V4 sur tous les serveurs
- Serveur Redis (6.0+ recommandé)
- Base de données MySQL/MariaDB (partagée entre tous les serveurs)

## Étape 1 : Installer Redis

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

## Étape 2 : Configurer zAuctionHouse

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

## Étape 3 : Installer l'Addon Redis

1. Téléchargez zAuctionHouseRedis depuis votre achat
2. Placez `zAuctionHouseRedis.jar` dans le dossier `plugins` de **chaque serveur**
3. Démarrez chaque serveur pour générer la configuration

## Étape 4 : Configurer la Connexion Redis

Modifiez `plugins/zAuctionHouseRedis/config.yml` sur chaque serveur :

```yaml
redis-config:
  mode: 'standalone'
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

### Mode Redis Sentinel

Pour les configurations haute disponibilité, zAuctionHouse Redis supporte [Redis Sentinel](https://redis.io/docs/management/sentinel/). Sentinel fournit la découverte automatique du master et le basculement automatique : si le master tombe, un réplica est automatiquement promu et le plugin se reconnecte de manière transparente.

Pour utiliser le mode Sentinel, définissez `mode` sur `sentinel` et configurez la section `sentinel` :

```yaml
redis-config:
  mode: 'sentinel'

  sentinel:
    master-name: 'mymaster'
    user: ''
    password: ''
    nodes:
      - '192.168.10.10:26379'
      - '192.168.10.11:26379'
      - '192.168.10.12:26379'

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

| Champ | Description |
|-------|-------------|
| `mode` | Mode de connexion : `standalone` (par défaut) ou `sentinel` |
| `sentinel.master-name` | Nom du groupe master Sentinel (généralement `mymaster`) |
| `sentinel.user` | Nom d'utilisateur pour l'authentification Sentinel (laisser vide si aucun) |
| `sentinel.password` | Mot de passe pour l'authentification Sentinel (laisser vide si aucun) |
| `sentinel.nodes` | Liste des noeuds Sentinel au format `host:port` |

<CalloutContainer type="info">

<CalloutDescription>
Les champs `user` et `password` à la racine de `redis-config` sont pour la connexion au **master Redis**. Les champs `sentinel.user` et `sentinel.password` sont spécifiquement pour l'authentification auprès des **instances Sentinel** elles-mêmes.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutDescription>
Les configurations standalone existantes continuent de fonctionner sans aucune modification. Si le champ `mode` est absent, il est par défaut `standalone`.
</CalloutDescription>

</CalloutContainer>

## Étape 5 : Redémarrer les Serveurs

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
