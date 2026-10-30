---
title: Migration & Maintenance
description: Importer les ventes passées depuis zAuctionHouseStats V1 ou depuis les logs de zAuctionHouse V4, purger les anciennes lignes, configurer la rétention et revenir en arrière en toute sécurité
---

# Migration & Maintenance

zAuctionHouseStats n'enregistre les ventes qu'à partir de son installation. Pour ajouter vos ventes **passées** aux statistiques, utilisez la commande d'import. Cette page explique aussi comment garder une base de données légère (purge et rétention) et comment repartir de zéro en cas de problème.

Vous pouvez importer depuis deux sources :

| Votre serveur | Données disponibles | Que faire |
|---------------|---------------------|-----------|
| A utilisé **zAuctionHouseStats V1** (époque zAuctionHouse V3) | Les tables `zah_*` de la V1 | `/zahstats import v1 confirm` |
| A utilisé **zAuctionHouse V4** avant l'installation de cet addon | Les tables V4 `logs`, `items`, `players` et `transactions` | `/zahstats import v4logs confirm` |
| Les deux cas ci-dessus | Les deux | Les deux imports, `v1` en premier (voir [Procédure pas à pas](#procédure-pas-à-pas)) |
| Nouvelle installation | Rien | Rien à faire. Vous pourrez toujours importer plus tard |

<CalloutContainer type="warning">

<CalloutTitle>Avant de commencer</CalloutTitle>

<CalloutDescription>
1. **Sauvegardez vos bases de données** (celle de l'addon et celle de zAuctionHouse). Une sauvegarde est le seul moyen d'annuler un import.
2. Définissez `statistics.timezone` dans `config.yml` **avant** d'importer. Les totaux journaliers sont calculés dans ce fuseau horaire et ne sont jamais recalculés ensuite.
3. Les imports ne modifient ni ne suppriment jamais les tables sources. Ils se contentent de les lire.
</CalloutDescription>

</CalloutContainer>

## Commandes

| Commande | Description | Permission |
|----------|-------------|------------|
| `/zahstats import <v1\|v4logs>` | Simulation : affiche ce que ferait l'import, n'écrit rien | `zauctionhouse.stats.import` |
| `/zahstats import <v1\|v4logs> confirm` | Lance l'import en arrière-plan | `zauctionhouse.stats.import` |
| `/zahstats purge <days>` | Affiche le nombre de lignes de plus de `<days>` jours | `zauctionhouse.stats.purge` |
| `/zahstats purge <days> confirm` | Supprime les lignes de plus de `<days>` jours | `zauctionhouse.stats.purge` |

Les deux permissions sont `op` par défaut et sont incluses dans `zauctionhouse.stats.admin`. Les deux commandes peuvent être exécutées depuis la console. Le nom de la source n'est pas sensible à la casse, et `v4-logs` / `v4_logs` sont aussi acceptés. Voir [Commandes & Permissions](/zauctionhouse/addons/stats/commands-permissions) pour la liste complète des commandes.

## Fonctionnement d'un import

Les deux imports fonctionnent de la même manière :

- **Simulation d'abord.** Sans `confirm`, la commande affiche le nombre de lignes sources à lire, une durée estimée et les éventuels avertissements. Rien n'est écrit. Si l'import est déjà terminé, la simulation répond uniquement `import-already-done`.
- **En arrière-plan.** Tout le travail en base de données s'exécute sur le thread de stockage propre à l'addon, jamais sur le thread principal. Le serveur reste jouable pendant l'import.
- **Par lots.** Les lignes sont lues par lots (`import.chunk-size`, 500 par défaut). Chaque lot est écrit dans **une seule transaction** : les lignes, les totaux et la progression de l'import sont enregistrés ensemble, ou pas du tout. Entre deux lots, l'addon attend `import.pause-between-chunks-ms` pour que les ventes en direct puissent être enregistrées entre-temps.
- **Progression dans la console.** Une ligne de progression est écrite toutes les `import.log-every-rows` lignes, avec le pourcentage, le temps restant (basé sur la vitesse observée jusque-là) et le nombre de lignes illisibles. Un résumé est écrit à la fin.
- **Caches vidés.** À la fin de l'import, les caches des classements, des joueurs, des prix et des placeholders sont vidés pour que les nouvelles données apparaissent immédiatement. Cela se produit aussi si l'import s'arrête après l'enregistrement d'au moins un lot.

La durée affichée par la simulation est une estimation prudente basée sur 2 000 lignes par seconde, plus les pauses entre les lots.

### Progression de l'import (`import_state`)

L'addon suit chaque import dans la table `zahstats_import_state` (avec votre préfixe de tables). Chaque import est découpé en étapes, et chaque étape a une ligne :

| Étape (colonne `source`) | Import | Rôle |
|--------------------------|--------|------|
| `v1:sales` | `v1` | Importe les achats V1 comme ventes |
| `v1:listings` | `v1` | Importe les mises en vente V1 |
| `v1:globals` | `v1` | Importe les compteurs globaux V1 (appliqués une seule fois) |
| `v4logs:boundary` | `v4logs` | Dernier id de log zAuctionHouse que l'import peut lire. Enregistré au premier démarrage de l'addon |
| `v4logs:rows` | `v4logs` | Importe les logs de zAuctionHouse |
| `v4logs:outcomes` | `v4logs` | Détermine ce qu'il est advenu des mises en vente encore ouvertes |

| Colonne | Signification |
|---------|---------------|
| `last_cursor` | Id de la dernière ligne source enregistrée. Mis à jour dans la même transaction que chaque lot |
| `imported_counts` | Lignes importées par cette étape |
| `failed_counts` | Lignes qui n'ont pas pu être lues (voir [Lignes illisibles](#lignes-illisibles)) |
| `running_server` | Serveur qui exécute actuellement cette étape (le verrou de cluster), ou vide |
| `started_at` / `finished_at` | Début et fin de l'étape. Une étape terminée n'est jamais relancée |

Cela vous apporte trois garanties :

- **Aucun double comptage.** Une fois toutes les étapes d'un import terminées, le relancer répond uniquement `import-already-done`.
- **Reprise après un arrêt.** Si le serveur s'arrête ou plante pendant un import, exécutez à nouveau **la même commande**. L'import reprend à partir du dernier lot enregistré.
- **Sûr en cas d'erreur.** Si un lot échoue, il est annulé et la progression n'avance pas. L'import s'arrête avec `import-failed` et peut être repris.

### Verrou de cluster

Sur une configuration multi-serveurs (plusieurs serveurs partageant une même base MySQL/MariaDB), exécutez chaque import depuis **un seul serveur**. N'importe lequel convient : le résultat est partagé par tous les serveurs.

Au démarrage d'un import, le nom du serveur est écrit dans `running_server`. Ce nom est le `server-name` de zAuctionHouse, ou le nom et le port du serveur Bukkit s'il est vide. Si un autre serveur détient déjà le verrou, l'import est refusé avec `import-locked`. Un seul import peut aussi tourner à la fois sur un même serveur : en lancer un second pendant que le premier s'exécute répond également `import-locked`. Quand un import se termine, échoue ou est interrompu par un arrêt, le serveur libère son verrou.

Les autres serveurs peuvent continuer à enregistrer les ventes en direct pendant l'import : les totaux sont écrits sous forme d'additions atomiques, donc rien n'est perdu.

<CalloutContainer type="info">

<CalloutTitle>Un serveur a planté pendant un import</CalloutTitle>

<CalloutDescription>
Le serveur qui a planté conserve son verrou. Relancez l'import **depuis ce même serveur** pour le reprendre. Si ce serveur a définitivement disparu, libérez le verrou manuellement, puis lancez l'import depuis un autre serveur :

```sql
UPDATE zahstats_import_state SET running_server = NULL WHERE source LIKE 'v1:%';
-- ou, pour l'import des logs :
UPDATE zahstats_import_state SET running_server = NULL WHERE source LIKE 'v4logs:%';
```
</CalloutDescription>

</CalloutContainer>

### Lignes illisibles

Dans les deux sources, les données des objets sont stockées sous forme de blobs encodés. L'addon les décode au mieux :

- Le matériau, le custom model data et le nom de l'objet proviennent du **premier** objet lisible. La quantité est la somme de tous les objets lisibles.
- Si aucun objet du blob ne peut être lu, la ligne est tout de même importée avec le matériau `UNKNOWN` et la quantité `1`, et comptée comme illisible. Ces lignes sont regroupées sous le matériau `UNKNOWN` dans les statistiques par matériau.
- Les lignes V1 dont l'UUID de l'acheteur ou du vendeur est invalide (UUID du vendeur pour les mises en vente) sont **ignorées** (non importées) et aussi comptées comme illisibles.
- Les logs V4 auxquels il manque le joueur nécessaire pour construire la ligne (pas de vendeur pour un `SALE`, pas d'acheteur ou de vendeur pour un `PURCHASE`) sont ignorés sans être comptés.

## Import depuis la V1 (`import v1`)

Importe les données de zAuctionHouseStats V1 (le plugin pour zAuctionHouse V3). La V1 n'a pas besoin d'être installée : l'addon lit directement ses tables.

### Emplacement des tables V1

Par défaut, l'addon cherche les tables `zah_*` dans **sa propre base de données** (celle définie dans `storage-type` / `database-configuration`). C'est le cas habituel :

- **SQLite :** l'addon utilise `plugins/zAuctionHouseStats/database.db`. Si la V1 utilisait le même fichier, ses tables y sont déjà.
- **MySQL / MariaDB :** faites pointer `database-configuration` vers la base qui contient les tables `zah_*`.

Si les tables V1 se trouvent dans une **autre** base de données, activez `import.v1.database`. L'addon ouvre une connexion temporaire au démarrage de l'import (il ne fait qu'y lire) et la ferme à la fin :

```yaml
import:
  v1:
    database:
      enabled: true
      type: MYSQL              # MYSQL | MARIADB | SQLITE
      host: localhost
      port: 3306
      user: "minecraft"
      password: "your-password"
      database: "old_database"
```

Avec `type: SQLITE`, `database` est le nom du fichier dans le dossier `plugins/zAuctionHouseStats/` (le fichier par défaut `database.db` est utilisé s'il est vide). Toute autre valeur de `type` est traitée comme `MYSQL`.

Si aucune table `zah_*` n'est trouvée, la simulation affiche `import-warning-v1-tables-missing` et l'import est refusé.

### Ce qui est importé

L'import exécute trois étapes, dans cet ordre :

| Étape | Table V1 | Importé dans | Détails |
|-------|----------|--------------|---------|
| `v1:sales` | `zah_player_purchased_items` | Ventes + tous les totaux | Une vente par achat. Acheteur, vendeur, noms, économie, prix, objet et date d'achat |
| `v1:listings` | `zah_player_sales_items` | Mises en vente + tous les totaux | Une mise en vente par objet mis en vente, avec sa date de création. Le résultat de la mise en vente est reconstitué (voir ci-dessous) |
| `v1:globals` | `zah_stats_global` | Statistiques globales | Compteurs globaux sans lignes datées (voir ci-dessous). Appliqués **une seule fois**, dans une seule transaction |

Les totaux journaliers, les totaux par joueur et les noms des joueurs sont calculés à partir des lignes importées, exactement comme pour les ventes en direct. Les noms des joueurs ne remplacent jamais un nom plus récent déjà connu de l'addon.

**Compteurs globaux** (`zah_stats_global`) :

| Statistique de l'addon | Construite à partir des clés V1 |
|------------------------|---------------------------------|
| `auctions_opened` | `AUCTION_OPENED` |
| `items_expired` | `NUMBER_OF_ITEMS_NOT_SOLD` + `NUMBER_OF_ITEMS_DESTROY` |
| `items_removed` | `NUMBER_OF_ITEMS_REMOVE_FROM_EXPIRE` + `NUMBER_OF_ITEMS_REMOVE_FROM_STORAGE` + `NUMBER_OF_ITEMS_REMOVE_FROM_BOUGHT` |

Il s'agit uniquement de totaux « depuis toujours » : la V1 ne les a jamais stockés par jour. Les compteurs égaux à `0` sont ignorés. La table V1 par économie `zah_stats_global_economies` n'est **pas** importée : les totaux d'argent sont plutôt reconstitués à partir des ventes importées.

**Résultat des mises en vente.** La V1 n'a jamais enregistré ce qu'il advenait d'une mise en vente. Avec `import.v1.listing-outcome-heuristic: true` (par défaut), l'addon le reconstitue :

1. **Vendue** si un achat V1 a le même vendeur, la même économie et le même prix, entre la date de création et la date d'expiration de la mise en vente. Chaque achat ne correspond qu'à une seule mise en vente.
2. Sinon **expirée** si la date d'expiration est dépassée.
3. Sinon la mise en vente reste **active**.

Avec `false`, chaque mise en vente V1 est importée comme active. Les résultats reconstitués n'augmentent jamais les compteurs d'objets expirés/retirés : ceux-ci proviennent des compteurs globaux ci-dessus, donc rien n'est compté deux fois.

**Vérification de cohérence.** À la fin, l'addon compare les compteurs `zah_player_stats` de chaque joueur (objets mis en vente et objets achetés) avec les lignes importées sous le nom de serveur `import.v1.server-name`. Chaque écart est signalé par un avertissement dans la console (les 20 premiers sont détaillés, les autres sont résumés). Les écarts signifient généralement que des lignes ont été supprimées à la main des tables V1. `zah_player_stats` n'est lui-même jamais importé.

### Conversions

| Donnée | En V1 | Après import |
|--------|-------|--------------|
| Montants | Nombres entiers | Nombres décimaux. Le montant payé, le montant reçu et le prix de mise en vente sont tous égaux au prix V1 |
| Dates | Millisecondes epoch | Timestamps |
| Nom du serveur | Non stocké | `import.v1.server-name` (`v1-import` par défaut) |
| Id de l'objet | Non stocké | `0` |
| Taxes | Non stockées | Vide (inconnu) |
| Date de mise en vente d'une vente | Non stockée | Vide |
| Catégorie | Non stockée | Vide |
| Objet complet | Blob encodé | Copié dans la vente uniquement si `statistics.save-itemstacks: true` |

Le nom de serveur `v1-import` sépare l'historique V1 dans les statistiques par serveur et vous permet de retrouver plus tard les lignes importées.

## Import depuis les logs de zAuctionHouse V4 (`import v4logs`)

Importe l'historique enregistré par zAuctionHouse V4 **avant** l'installation de l'addon. Il lit la base de données V4 via la connexion propre à zAuctionHouse, il n'y a donc rien à configurer.

### La limite

À son premier démarrage, l'addon enregistre l'id de log le plus élevé de zAuctionHouse dans `v4logs:boundary`. L'import des logs ne lit jamais au-delà de cet id, car les ventes suivantes sont déjà enregistrées en direct. C'est ce qui empêche le double comptage.

- La limite est enregistrée **une seule fois** et ne bouge plus jamais ensuite.
- L'addon l'attend jusqu'à 10 secondes avant de démarrer la collecte en direct. Si cela prend plus de temps, la collecte en direct démarre quand même et un avertissement dans la console vous prévient que quelques ventes pourraient être comptées deux fois si vous importez les logs plus tard.
- Si la limite est absente (par exemple, la base V4 n'était pas disponible au démarrage), l'import est refusé. Redémarrez le serveur une fois pour que l'addon puisse l'enregistrer.

### Ce qui est importé

L'import exécute deux étapes :

| Étape | Source | Résultat |
|-------|--------|----------|
| `v4logs:rows` | Logs `SALE` | Mises en vente + totaux (y compris la taxe de mise en vente, le cas échéant) |
| | Logs `PURCHASE` | Ventes + totaux. Le nom du serveur et la date de mise en vente proviennent de la table V4 `items` |
| | Logs `REMOVE_LISTED` et `REMOVE_SELLING` | Mise en vente marquée comme retirée. Le retrait est attribué au **vendeur**, même si c'est un admin qui l'a retirée |
| `v4logs:outcomes` | V4 `items.storage_type` | Résultat des mises en vente encore ouvertes après la première étape |

Pour la seconde étape, chaque mise en vente de l'addon encore active et possédant un id d'objet V4 (importée ou enregistrée en direct) reçoit son résultat à partir de l'état actuel de son objet V4 :

| État de l'objet V4 | Résultat de la mise en vente |
|--------------------|------------------------------|
| `EXPIRED` | Expirée |
| `DELETED` | Retirée |
| `PURCHASED` | Vendue |
| `LISTED` | Reste active (l'objet est réellement toujours en vente) |
| L'objet n'existe plus | Retirée |

Ces résultats n'ont pas de date et n'augmentent **pas** les compteurs d'objets expirés/retirés.

### Ce qui est approximé

<CalloutContainer type="warning">

<CalloutTitle>Les montants peuvent être approximatifs</CalloutTitle>

<CalloutDescription>
Les logs V4 ne stockent que le **prix de mise en vente**, pas ce que l'acheteur a payé ni ce que le vendeur a reçu. Un avertissement est écrit dans la console à la fin de chaque import des logs pour le rappeler.
</CalloutDescription>

</CalloutContainer>

Avec `import.v4logs.resolve-amounts-from-transactions: true` (par défaut), l'addon recherche les lignes correspondantes dans la table V4 `transactions`. Quand la ligne de l'acheteur et celle du vendeur sont toutes deux trouvées, les montants réels sont utilisés, et la taxe est la différence entre les deux (laissée vide si cette différence est négative). Sinon, tous les montants restent égaux au prix de mise en vente. Si la table `transactions` ne peut pas être lue, l'addon écrit un avertissement et utilise le prix de mise en vente pour le reste de l'import.

| Donnée | Après import |
|--------|--------------|
| Montant payé / reçu | Exact si les transactions sont trouvées, prix de mise en vente sinon |
| Montant de la taxe | Calculé à partir des transactions si elles sont trouvées, vide sinon. Le type de taxe n'est jamais connu |
| Période couverte | Depuis l'installation de la V4, moins les logs purgés dans zAuctionHouse |
| Nom du serveur | Depuis la table V4 `items`, ou `import.v4logs.server-name-fallback` (`v4-import` par défaut) si l'objet a été supprimé |
| Date de mise en vente d'une vente | Depuis la table V4 `items`, vide si l'objet a été supprimé |
| Matériau / quantité | Décodés à partir du blob de l'objet, `UNKNOWN` si illisible |
| Catégorie | Vide |
| `auctions_opened` | Non disponible (la V4 ne journalise pas les ouvertures de menu) |
| `items_expired` | Non compté (la V4 ne journalise pas les expirations). Les mises en vente expirées ne reçoivent leur résultat que lors de l'étape `v4logs:outcomes` |

### Logs migrés depuis la V3

Si vous êtes passé de la V3 à la V4 avec la migration intégrée de zAuctionHouse, les logs V4 contiennent aussi des achats copiés depuis la V3, marqués `migrated_from_v3`. Ce sont les **mêmes** achats que ceux des tables V1.

- Par défaut (`import.v4logs.include-migrated-v3: false`), ils sont ignorés. La simulation vous indique combien ont été ignorés.
- Passez cette option à `true` **uniquement** si vous n'avez jamais utilisé zAuctionHouseStats V1, et que `import v1` n'est donc pas une option. Leur date de mise en vente reste vide, car elle n'est pas connue.
- Si `import v1` est déjà terminé et que cette option vaut `true`, la simulation affiche `import-warning-migrated-v3-double-count` et l'import est refusé.

<CalloutContainer type="error">

<CalloutTitle>Ne combinez jamais les deux</CalloutTitle>

<CalloutDescription>
N'exécutez pas `import v1` après un import des logs effectué avec `include-migrated-v3: true`. L'addon ne peut pas détecter ce cas, et les achats V3 seraient comptés deux fois.
</CalloutDescription>

</CalloutContainer>

## Configuration de l'import

Tous les réglages se trouvent dans la section `import` de `config.yml`. Ils sont relus à chaque démarrage d'un import, donc `/zahstats reload` suffit pour les modifier en vue du prochain import.

```yaml
import:
  chunk-size: 500
  pause-between-chunks-ms: 50
  log-every-rows: 10000
  v1:
    server-name: "v1-import"
    listing-outcome-heuristic: true
    database:
      enabled: false
      type: MYSQL              # MYSQL | MARIADB | SQLITE
      host: localhost
      port: 3306
      user: ""
      password: ""
      database: ""
  v4logs:
    include-migrated-v3: false
    resolve-amounts-from-transactions: true
    server-name-fallback: "v4-import"
```

Chaque clé est décrite dans la section [Import](/zauctionhouse/addons/stats/configuration#import) de la page de configuration, et la correction des valeurs hors limites est expliquée dans [Gestion des valeurs invalides](/zauctionhouse/addons/stats/configuration#gestion-des-valeurs-invalides). Pour réduire la charge d'un import sur un serveur très actif, augmentez `import.pause-between-chunks-ms` ou diminuez `import.chunk-size`.

## Procédure pas à pas

### Cas standard (V3 + V1, désormais en V4)

1. **Sauvegardez** les bases de données : `mysqldump` pour MySQL/MariaDB, ou une copie de `plugins/zAuctionHouseStats/database.db` et `plugins/zAuctionHouse/database.db` pour SQLite.
2. Arrêtez le serveur, retirez l'ancien jar de zAuctionHouseStats V1 et ajoutez le nouveau (voir [Installation](/zauctionhouse/addons/stats/installation)).
3. Démarrez le serveur une fois. Vérifiez la console : les tables sont créées et la limite v4logs est enregistrée.
4. Dans `config.yml`, vérifiez `storage-type` et `database-configuration` (et `import.v1.database` si besoin), et définissez `statistics.timezone`. **Redémarrez** le serveur si vous avez modifié `storage-type`, `database-configuration`, `statistics.timezone` ou `statistics.save-itemstacks` : `/zahstats reload` ne les applique pas. Un reload suffit pour la section `import`.
5. Exécutez `/zahstats import v1` et lisez la simulation : nombre de lignes, temps estimé, avertissements.
6. Exécutez `/zahstats import v1 confirm`. Suivez la progression dans la console. Les joueurs peuvent continuer à jouer.
7. Si le serveur tournait aussi en V4 avant l'installation de l'addon, exécutez `/zahstats import v4logs`, puis `/zahstats import v4logs confirm`. Laissez `include-migrated-v3: false`.
8. Vérifiez le résultat : `/zahstats top TOP_SELLERS_MONEY all`, quelques placeholders et le menu `stats.yml`. Les caches sont déjà vidés.

### Passage de la V3 à la V4 sans la V1

Il n'y a pas de tables `zah_*`, seul `import v4logs` s'applique donc. Dans ce cas, et uniquement dans ce cas, vous pouvez définir `import.v4logs.include-migrated-v3: true` pour récupérer les achats V3 copiés par zAuctionHouse. Leurs montants correspondent aux prix de mise en vente V3.

### Multi-serveurs

Exécutez chaque import depuis un seul serveur. Le verrou bloque les autres serveurs, et la collecte en direct continue de fonctionner sur tous.

### En production, en toute sécurité

- L'import ne bloque jamais le thread principal, mais il sollicite la base de données. Sur un serveur très actif, lancez-le à une heure creuse, ou augmentez `import.pause-between-chunks-ms` / réduisez `import.chunk-size`.
- Arrêter le serveur pendant un import est sans danger : l'import s'arrête avant le lot suivant et reprend quand vous relancez la même commande.
- Si un import échoue, lisez l'erreur dans la console, corrigez la cause, puis relancez la même commande. Les lots déjà enregistrés sont conservés.
- Importez **avant** d'activer une rétention courte (voir ci-dessous), sinon les anciennes lignes importées sont purgées juste après.
- Le résumé de fin indique combien de ventes et de mises en vente ont été ajoutées, ainsi que leurs plages d'id. Conservez-le : c'est le seul moyen de retrouver plus tard les lignes d'un import des logs. Il ne couvre que les lots enregistrés lors de la **dernière** exécution : si l'import a été repris, conservez aussi la ligne `committed so far` que la console écrit à chaque arrêt d'un import.

## Purge & Rétention

Ce sont les lignes détaillées `sales` et `listings` qui font grossir les tables. Vous pouvez supprimer les anciennes lignes à la main ou automatiquement. Dans les deux cas :

- Les ventes sont supprimées selon leur **date de vente**, les mises en vente selon leur **date de mise en vente**. « Plus de N jours » signifie plus ancien que l'heure actuelle moins N × 24 heures. Les mises en vente actives ne sont **jamais** supprimées.
- **Les totaux journaliers, les totaux par joueur et les statistiques globales sont toujours conservés.** Les classements, les périodes et les statistiques des joueurs restent justes après une purge.
- Les lignes sont supprimées par paquets de 500, chaque paquet dans une tâche séparée, afin que la base de données ne soit jamais verrouillée longtemps et que les ventes en direct continuent d'être enregistrées.
- Les lignes importées sont purgées comme toutes les autres.

Ce que vous perdez : les données lues depuis les lignes détaillées pour les jours purgés, comme les prix des matériaux et les meilleurs matériaux (`/ah price`, explorateur de prix) et le classement `BIGGEST_SALE` pour les périodes jour/semaine/mois.

### Purge manuelle

```bash
# Aperçu : combien de lignes ont plus de 90 jours
/zahstats purge 90

# Les supprimer
/zahstats purge 90 confirm
```

`<days>` doit être un nombre entier, au moins `1`. Après la purge, les caches des prix des matériaux et des meilleurs matériaux ainsi que les classements `BIGGEST_SALE` par période sont actualisés (il en va de même après chaque exécution de la rétention automatique). La suppression est irréversible sans sauvegarde.

### Rétention automatique

```yaml
retention:
  sales-days: 0
```

| Clé | Défaut | Description |
|-----|--------|-------------|
| `retention.sales-days` | `0` | Supprime une fois par jour les lignes `sales` et `listings` de plus de ce nombre de jours. `0` conserve tout. Une valeur négative écrit un avertissement et revient à `0` |

- La première purge s'exécute **10 minutes** après le démarrage du serveur, puis toutes les 24 heures. Elle est ignorée pendant l'arrêt du serveur.
- Modifier cette valeur nécessite un **redémarrage**. `/zahstats reload` écrit seulement un avertissement.
- Une valeur comprise entre `1` et `34` écrit un avertissement au démarrage : le classement mensuel `BIGGEST_SALE` serait incomplet. Utilisez `0` ou au moins `35`.
- Chaque exécution écrit le nombre de lignes supprimées dans la console. Si une exécution échoue, un avertissement est écrit et l'exécution suivante réessaie.

## Retour arrière

Un import ne peut pas être annulé partiellement : les totaux sont additionnés et ne peuvent pas être retirés pour un seul import. La méthode prise en charge consiste à **supprimer les tables de l'addon et à importer à nouveau**. Les sources ne sont jamais modifiées, vous pouvez donc le faire autant de fois que nécessaire.

<CalloutContainer type="warning">

<CalloutTitle>Les données en direct sont aussi perdues</CalloutTitle>

<CalloutDescription>
Supprimer les tables efface aussi toutes les ventes enregistrées en direct par l'addon depuis son installation. Si vous avez besoin de ces données, restaurez plutôt votre sauvegarde, ou sauvegardez d'abord les tables `zahstats_*`.
</CalloutDescription>

</CalloutContainer>

1. Arrêtez le serveur (sur une configuration multi-serveurs, arrêtez **tous** les serveurs qui partagent la base de l'addon).
2. Supprimez les tables de l'addon (remplacez `zahstats_` si vous avez modifié `table-prefix`) :

```sql
DROP TABLE zahstats_sales;
DROP TABLE zahstats_listings;
DROP TABLE zahstats_player_stats;
DROP TABLE zahstats_player_names;
DROP TABLE zahstats_player_daily;
DROP TABLE zahstats_global_daily;
DROP TABLE zahstats_global_stats;
DROP TABLE zahstats_import_state;
DROP TABLE zahstats_migrations;
```

3. Avec SQLite, **ne supprimez pas** `database.db` s'il contient aussi les tables V1 `zah_*` que vous voulez importer.
4. Démarrez le serveur. Les tables sont recréées, vides, et une nouvelle limite v4logs est enregistrée au dernier log actuel. Un nouvel import des logs couvre alors aussi les ventes en direct perdues à l'étape 2, tant que zAuctionHouse n'a pas purgé ces logs.
5. Relancez les imports (voir [Procédure pas à pas](#procédure-pas-à-pas)).

Pour retrouver les lignes importées sans retour arrière : les lignes V1 ont le nom de serveur `v1-import` (ou votre `import.v1.server-name`). Les lignes issues d'un import des logs n'ont pas de marqueur particulier ; utilisez les plages d'id du résumé de fin d'import. Sur une configuration multi-serveurs, des ventes en direct d'autres serveurs peuvent se trouver dans ces plages.

### Nettoyage des tables V1

Une fois l'import vérifié, vous pouvez supprimer les tables V1 à la main. L'addon ne le fait jamais à votre place :

```sql
DROP TABLE zah_player_purchased_items;
DROP TABLE zah_player_sales_items;
DROP TABLE zah_player_stats;
DROP TABLE zah_stats_global;
DROP TABLE zah_stats_global_economies;
```

## Messages

Toutes les réponses se trouvent dans `messages.yml` et peuvent être traduites.

| Clé | Quand elle est envoyée |
|-----|------------------------|
| `import-confirm` | Simulation : nombre de lignes à lire, avec `import-warning-v1` ou `import-warning-v4logs` |
| `import-estimate` | Simulation : durée estimée |
| `import-migrated-v3-excluded` | Simulation : nombre de logs `migrated_from_v3` ignorés |
| `import-migrated-v3-included` | Simulation : nombre de logs `migrated_from_v3` qui seront importés |
| `import-warning-v1-tables-missing` | Aucune table `zah_*` trouvée, l'import sera refusé |
| `import-warning-migrated-v3-double-count` | Les achats V3 seraient comptés deux fois, l'import sera refusé |
| `import-started` | Import démarré |
| `import-progress` | Ligne de progression dans la console (`%source%`, `%processed%`, `%total%`, `%percent%`, `%remaining%`, `%failed%`) |
| `import-finished` | Import terminé |
| `import-already-done` | L'import a déjà été effectué sur cette base de données (simulation ou `confirm`) |
| `import-locked` | L'import est déjà en cours sur un autre serveur, ou un autre import est déjà en cours sur ce serveur |
| `import-failed` | L'import a échoué ou a été refusé (`%error%`) |
| `import-unknown-source` | La source n'est ni `v1` ni `v4logs` |
| `import-unavailable` | Le service d'import n'est pas disponible |
| `purge-confirm` | Simulation de purge : nombre de lignes qui seraient supprimées |
| `purge-success` | Purge effectuée |
| `purge-invalid-days` | `<days>` n'est pas un nombre entier d'au moins `1` |
| `purge-failed` | La purge a échoué (`%error%`) |
| `purge-unavailable` | Le service de purge n'est pas disponible |
