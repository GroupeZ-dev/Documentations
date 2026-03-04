---
sidebar_position: 7
title: Migration
description: Migrer les données d'autres plugins d'enchères vers zAuctionHouse V4
---

# Migration

zAuctionHouse V4 inclut un système de migration intégré qui vous permet d'importer des données depuis d'autres plugins d'enchères. Cela assure une transition fluide sans perdre les annonces existantes, les objets expirés ou l'historique des transactions.

:::warning Avant de Commencer
1. **Sauvegardez votre base de données** avant d'exécuter toute migration.
2. **Arrêtez le serveur** ou assurez-vous qu'aucun joueur n'est en ligne pendant la migration pour éviter les conflits de données.
3. Vérifiez que les fichiers de données ou la base de données du plugin source sont accessibles.
4. Exécutez la commande de migration depuis la console du serveur pour de meilleurs résultats.
:::

## Commande de Migration

```bash
/ah admin migrate <source> confirm
```

**Permission :** `zauctionhouse.admin`

L'argument `confirm` est requis pour éviter les migrations accidentelles.

## Sources Supportées

### zAuctionHouse V3

Migrer de zAuctionHouse V3 vers V4.

**Alias de source :** `zauctionhousev3`, `zah`, `zahv3`, `v3`

```bash
/ah admin migrate zauctionhousev3 confirm
# ou en utilisant les alias
/ah admin migrate v3 confirm
```

#### Données Migrées

| Type de Données | Description |
|-----------------|-------------|
| **Annonces Actives** | Tous les objets actuellement en vente |
| **Objets Expirés** | Objets qui ont expiré et attendent d'être récupérés |
| **Objets Achetés** | Objets achetés par les joueurs en attente de réclamation |
| **Historique des Transactions** | Historique complet des ventes |
| **Données Joueur** | Informations et statistiques des vendeurs |

#### Comment Ça Fonctionne

Le système de migration lit les données de votre base de données V3 et les importe dans la structure de base de données V4. Les bases de données V3 SQLite et MySQL/MariaDB sont supportées.

1. Le migrateur se connecte à votre base de données V3
2. Tous les objets d'enchères sont lus et convertis au format V4
3. Les données NBT des objets sont préservées, incluant les objets personnalisés d'autres plugins
4. Les UUIDs et noms des joueurs sont maintenus
5. Les informations de prix et d'économie sont transférées
6. Les horodatages et données d'expiration sont préservés

#### Prérequis

- Les données de zAuctionHouse V3 doivent être accessibles (même base de données ou emplacement de fichier)
- zAuctionHouse V4 doit être correctement configuré avec le stockage
- Les deux plugins devraient utiliser le même type de stockage pour de meilleurs résultats

#### Étapes de Migration

1. Installez zAuctionHouse V4 à côté de V3 (ne supprimez pas encore V3)
2. Configurez la connexion à la base de données de V4 dans `config.yml`
3. Démarrez le serveur et vérifiez que V4 se charge correctement
4. Exécutez la commande de migration :
   ```bash
   /ah admin migrate zauctionhousev3 confirm
   ```
5. Attendez que la migration se termine (la console affichera la progression)
6. Vérifiez les données en consultant `/ah` et les panneaux admin
7. Une fois vérifié, vous pouvez supprimer zAuctionHouse V3

## Conseils de Migration

### Grandes Bases de Données

Pour les serveurs avec des milliers d'annonces, la migration peut prendre plusieurs minutes. La console affichera des mises à jour de progression. N'interrompez pas le processus.

### Types de Stockage Différents

Si vous migrez de SQLite vers MySQL (ou vice versa), la migration gère automatiquement la conversion. Cependant, assurez-vous que votre base de données cible est correctement configurée avant de commencer.

### Compatibilité des Objets

zAuctionHouse V4 utilise une sérialisation d'objets moderne qui préserve toutes les données des objets incluant :

- Custom model data
- Tags NBT d'autres plugins (MMOItems, ItemsAdder, Oraxen, etc.)
- Enchantements et attributs
- Lore et noms d'affichage
- Métadonnées de plugins personnalisés

### Données d'Économie

Si vous utilisez plusieurs économies, assurez-vous qu'elles sont configurées dans V4 avant la migration. Le migrateur tentera de mapper automatiquement les types d'économie.

## Dépannage

### La migration ne démarre pas

- Vérifiez que vous avez la permission `zauctionhouse.admin`
- Assurez-vous d'avoir inclus `confirm` dans la commande
- Consultez la console pour les messages d'erreur

### Les objets n'apparaissent pas après la migration

- Vérifiez que la migration s'est terminée avec succès (consultez la console)
- Videz le cache : `/ah admin cache clear <joueur>`
- Redémarrez le serveur

### Objets en double

Si vous exécutez accidentellement la migration deux fois, des objets en double peuvent apparaître. Pour corriger :
1. Arrêtez le serveur
2. Restaurez votre sauvegarde de base de données
3. Exécutez la migration une fois de plus

### Historique des transactions manquant

La migration de l'historique des transactions dépend de la configuration de journalisation de V3. Si la journalisation était désactivée dans V3, les données historiques peuvent être limitées.

## Support de Migration Futur

Des sources de migration supplémentaires peuvent être ajoutées dans les futures mises à jour. Si vous avez besoin d'un support de migration pour un plugin d'enchères spécifique, veuillez le demander sur notre [serveur Discord](https://discord.groupez.dev) ou [GitHub](https://github.com/Maxlego08/zAuctionHouseV4/issues).

### Fréquemment Demandés

Les plugins suivants sont envisagés pour un futur support de migration :

- AuctionHouse par klgr2001
- CrazyAuctions
- AuctionMaster
- PlayerAuctions

:::info
Le support de migration dépend du format et de la structure des données du plugin source. Certains plugins peuvent ne pas être réalisables à supporter.
:::
