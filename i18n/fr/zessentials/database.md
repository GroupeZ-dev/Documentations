---
title: Base de données
description: Architecture de la base de données, tables et moteurs de stockage de zEssentials
---

# Base de données

zEssentials utilise une base de données relationnelle pour conserver toutes les données des joueurs, les économies, les sanctions, les coffres, etc. Cette page présente les moteurs de stockage disponibles, le schéma complet de la base, les optimisations de performance et le système de migrations.

## Moteurs de stockage

Configurez l'option `storage-type` du `config.yml` pour choisir votre moteur.

| Valeur | Moteur | Recommandé pour |
|--------|--------|-----------------|
| `SQLITE` | Fichier SQLite local | Installation et tests uniquement |
| `MYSQL` | MySQL via HikariCP | Production |
| `MARIADB` | MariaDB via HikariCP (driver MariaDB) | Production |
| `HIKARICP` | MySQL/MariaDB via HikariCP | Production |
| `JSON` | Un fichier JSON par joueur | Déconseillé |

### SQLITE

SQLite est le moteur par défaut. Les données sont stockées dans un fichier local, `plugins/zEssentials/database.db`. Aucun serveur de base de données externe n'est nécessaire.

```yaml
storage-type: SQLITE
```

<CalloutContainer type="warning">

<CalloutDescription>
SQLite est prévu **uniquement pour l'installation et les tests**. Certaines fonctionnalités sont limitées (par exemple la mise à jour des sanctions au démarrage du plugin), il n'autorise qu'un seul écrivain à la fois et il ne peut pas être partagé entre plusieurs serveurs.

**N'utilisez pas SQLite en production.** Passez à `MYSQL`, `MARIADB` ou `HIKARICP` avant d'ouvrir votre serveur.
</CalloutDescription>

</CalloutContainer>

### MYSQL, MARIADB et HIKARICP

Ces trois valeurs se connectent à un serveur MySQL ou MariaDB. Elles utilisent toutes un **pool de connexions HikariCP**, qui réutilise les connexions, vérifie leur état et élimine celles qui sont périmées. `MARIADB` se connecte avec le driver JDBC MariaDB (`jdbc:mariadb:`), `MYSQL` et `HIKARICP` utilisent une URL `jdbc:mysql:`.

```yaml
storage-type: HIKARICP

database-configuration:
  table-prefix: "zessentials_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: 'secret'
  database: zessentials
  debug: false
```

<CalloutContainer type="info">

<CalloutDescription>
Le driver JDBC MariaDB n'est pas inclus dans le JAR : il est téléchargé depuis Maven Central par Paper au démarrage du serveur (voir [Installation](./installation#3-installer-le-plugin)).
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutTitle>Recommandé</CalloutTitle>

<CalloutDescription>
Pour tout serveur accueillant de vrais joueurs, utilisez **HIKARICP** (ou `MARIADB` si votre serveur utilise MariaDB). Il gère efficacement les accès concurrents à la base et est indispensable pour partager les données entre plusieurs serveurs.
</CalloutDescription>

</CalloutContainer>

### JSON

```yaml
storage-type: JSON
```

Les données sont stockées dans un fichier par joueur, `plugins/zEssentials/users/<uuid>.json`. Ce moteur ne supporte **pas** toutes les fonctionnalités : les coffres, la boîte aux lettres d'items, l'historique du chat, le classement de l'économie (baltop), les logs de transactions et de commandes ne sont pas disponibles, et les [convertisseurs de données](./converters) ne peuvent pas être utilisés.

### Référence de la configuration

| Propriété | Valeur par défaut | Description |
|-----------|-------------------|-------------|
| `table-prefix` | `zessentials_` | Préfixe appliqué à toutes les tables |
| `host` | `192.168.10.10` | Nom d'hôte ou adresse IP du serveur de base de données |
| `port` | `3306` | Port du serveur de base de données |
| `user` | `homestead` | Nom d'utilisateur |
| `password` | `secret` | Mot de passe |
| `database` | `zessentials` | Nom de la base (elle doit déjà exister) |
| `debug` | `false` | Affiche les requêtes SQL exécutées |

<CalloutContainer type="warning">

<CalloutDescription>
Changez toujours les identifiants par défaut avant de passer en production. Les valeurs ci-dessus ne sont que des exemples.
</CalloutDescription>

</CalloutContainer>

## Tables de la base de données

zEssentials crée **25 tables** (présentées ci-dessous avec le préfixe par défaut `zessentials_`), ainsi que la table `zessentials_migrations` utilisée pour suivre les migrations appliquées. Chaque table est décrite avec ses colonnes, leurs types et leur rôle.

### zessentials_users

Données principales des joueurs. Une ligne par joueur.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK | UUID du joueur |
| `name` | `VARCHAR(16)` | | Nom actuel du joueur |
| `last_location` | `TEXT` | | Dernière position connue, sérialisée |
| `play_time` | `BIGINT` | | Temps de jeu total |
| `ban_sanction_id` | `BIGINT` | | ID du ban actif dans `zessentials_sanctions` |
| `mute_sanction_id` | `BIGINT` | | ID du mute actif dans `zessentials_sanctions` |
| `vote` | `BIGINT` | | Nombre total de votes |
| `vote_offline` | `INT` | | Votes reçus hors ligne |
| `frozen` | `BOOLEAN` | | Indique si le joueur est actuellement gelé |
| `fly_seconds` | `BIGINT` | | Temps de vol temporaire restant en secondes |
| `player_time` | `BIGINT` | | Heure personnelle définie avec `/ptime` (réappliquée à la connexion) |
| `player_weather` | `VARCHAR(32)` | | Météo personnelle définie avec `/pweather` (réappliquée à la connexion) |
| `created_at` | `TIMESTAMP` | | Première apparition du compte |
| `updated_at` | `TIMESTAMP` | | Dernière mise à jour des données |

### zessentials_economies

Soldes des joueurs pour chaque économie. Supporte plusieurs devises.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | UUID du joueur |
| `economy_name` | `VARCHAR` | PK (composite) | Nom de l'économie/devise |
| `amount` | `DECIMAL(65,2)` | | Solde actuel |

### zessentials_economy_transactions

Historique de toutes les transactions économiques entre joueurs ou depuis le serveur.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `from_unique_id` | `UUID` | | UUID de l'émetteur |
| `to_unique_id` | `UUID` | | UUID du destinataire |
| `economy_name` | `VARCHAR` | | Nom de l'économie/devise |
| `amount` | `DECIMAL(65,2)` | | Montant de la transaction |
| `from_amount` | `DECIMAL(65,2)` | | Solde de l'émetteur après la transaction |
| `to_amount` | `DECIMAL(65,2)` | | Solde du destinataire après la transaction |
| `reason` | `TEXT` | | Raison ou description de la transaction |

### zessentials_user_homes

Positions des homes des joueurs.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | UUID du joueur |
| `name` | `VARCHAR` | PK (composite) | Nom du home |
| `location` | `TEXT` | | Position sérialisée (monde, x, y, z, yaw, pitch) |
| `material` | `VARCHAR` | | Matériau de l'icône dans l'interface |
| `is_public` | `BOOLEAN` | | Indique si le home est public (`/homepublic`) et peut être visité par tous |
| `category` | `VARCHAR(32)` | | Catégorie du home (`/homecategory`) |
| `is_favorite` | `BOOLEAN` | | Indique si le home est en favori (`/homefavorite`) |

### zessentials_user_home_shares

Homes partagés avec des joueurs précis (`/homeshare`). Les partages sont supprimés lorsque le home est supprimé.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `owner_id` | `UUID` | PK (composite) | UUID du propriétaire du home |
| `home_name` | `VARCHAR` | PK (composite) | Nom du home partagé |
| `target_id` | `UUID` | PK (composite) | UUID du joueur avec qui le home est partagé |

### zessentials_user_ignores

Joueurs ignorés avec `/ignore` (les messages privés, les demandes de téléportation et les mails texte sont bloqués).

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | UUID du joueur qui ignore |
| `ignored_id` | `UUID` | PK (composite) | UUID du joueur ignoré |

### zessentials_sanctions

Toutes les sanctions (bans, mutes, kicks) avec leur historique complet.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto-incrément) | ID de la sanction |
| `player_unique_id` | `UUID` | | UUID du joueur sanctionné |
| `sender_unique_id` | `UUID` | | UUID du membre du staff ayant appliqué la sanction |
| `sanction_type` | `VARCHAR` | | Type de sanction (BAN, MUTE, KICK, etc.) |
| `reason` | `TEXT` | | Raison de la sanction |
| `duration` | `BIGINT` | | Durée en millisecondes |
| `expired_at` | `TIMESTAMP` | | Date d'expiration de la sanction |

### zessentials_chat_message

Historique des messages envoyés dans le chat.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | | UUID du joueur |
| `content` | `TEXT` | | Contenu du message |
| `created_at` | `TIMESTAMP` | | Date d'envoi du message |

### zessentials_private_messages

Historique des messages privés entre joueurs.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `sender_unique_id` | `UUID` | | UUID de l'émetteur |
| `receiver_unique_id` | `UUID` | | UUID du destinataire |
| `content` | `TEXT` | | Contenu du message |

### zessentials_commands

Historique des commandes exécutées par les joueurs (lorsque `enable-command-log` est activé).

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | | UUID du joueur |
| `command` | `TEXT` | | Commande complète |
| `created_at` | `TIMESTAMP` | | Date d'exécution de la commande |

### zessentials_user_mail_boxes

Items en attente dans la boîte aux lettres d'un joueur (boîte aux lettres d'items).

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto-incrément) | ID de l'entrée |
| `unique_id` | `UUID` | | UUID du destinataire |
| `itemstack` | `TEXT` | | ItemStack sérialisé |
| `expired_at` | `TIMESTAMP` | | Date d'expiration de l'item |

### zessentials_user_mail_messages

**Mails texte** envoyés avec `/mail send` et `/mail sendall`.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto-incrément) | ID du mail |
| `unique_id` | `UUID` | | UUID du destinataire |
| `sender_id` | `UUID` | | UUID de l'expéditeur (null si envoyé par la console) |
| `sender_name` | `VARCHAR(36)` | | Nom de l'expéditeur |
| `content` | `TEXT` | | Contenu du mail |
| `is_read` | `BOOLEAN` | | Indique si le mail a été lu (`/mail read`) |
| `created_at` | `TIMESTAMP` | | Date d'envoi du mail |

### zessentials_vaults

Métadonnées des coffres de stockage des joueurs.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | UUID du joueur |
| `vault_id` | `BIGINT` | PK (composite) | Numéro du coffre |
| `name` | `VARCHAR` | | Nom personnalisé du coffre |
| `icon` | `TEXT` | | Icône affichée dans l'interface |

### zessentials_vault_items

Items contenus dans les coffres des joueurs.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | UUID du joueur |
| `vault_id` | `BIGINT` | PK (composite) | Numéro du coffre |
| `slot` | `BIGINT` | PK (composite) | Emplacement de l'item dans le coffre |
| `item` | `TEXT` | | ItemStack sérialisé |
| `quantity` | `BIGINT` | | Quantité de l'item |

### zessentials_player_slots

Nombre d'emplacements de coffre débloqués par joueur.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK | UUID du joueur |
| `slots` | `BIGINT` | | Nombre d'emplacements débloqués |

### zessentials_user_options

Options booléennes de chaque joueur (vanish, god, social spy, réception des téléportations, son de ping...).

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK | UUID du joueur |
| `option_name` | `VARCHAR` | | Identifiant de l'option |
| `option_value` | `BOOLEAN` | | État actuel de l'option |

### zessentials_user_cooldowns

Cooldowns de chaque joueur pour les commandes et fonctionnalités.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | UUID du joueur |
| `cooldown_name` | `VARCHAR` | PK (composite) | Identifiant du cooldown |
| `cooldown_value` | `BIGINT` | | Date d'expiration du cooldown en millisecondes |

### zessentials_user_play_times

Sessions de jeu individuelles avec leurs informations de connexion.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | | UUID du joueur |
| `play_time` | `BIGINT` | | Durée de la session |
| `address` | `VARCHAR` | | Adresse IP du joueur pour la session |

### zessentials_user_power_tools

Power tools associant un matériau à une commande.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | UUID du joueur |
| `material` | `VARCHAR` | PK (composite) | Nom du matériau Minecraft |
| `command` | `TEXT` | | Commande exécutée à l'utilisation de l'item |

### zessentials_steps

Progression des joueurs dans les étapes du module Step.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `unique_id` | `UUID` | PK (composite) | UUID du joueur |
| `step_name` | `VARCHAR` | PK (composite) | Identifiant de l'étape |
| `data` | `JSON` | | Données libres de l'étape |
| `play_time_start` | `BIGINT` | | Temps de jeu au début de l'étape |
| `play_time_end` | `BIGINT` | | Temps de jeu à la fin de l'étape |
| `play_time_between` | `BIGINT` | | Temps de jeu passé entre le début et la fin |
| `finished_at` | `TIMESTAMP` | | Date de fin de l'étape (null si en cours) |

### zessentials_vote_sites

Date du dernier vote de chaque joueur sur chaque site.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `player_id` | `UUID` | PK (composite) | UUID du joueur |
| `site` | `VARCHAR` | PK (composite) | Identifiant du site de vote |
| `last_vote_at` | `TIMESTAMP` | | Date du dernier vote sur ce site |

### zessentials_link_accounts

Liaisons vérifiées entre comptes Discord et Minecraft.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `user_id` | `BIGINT` | PK (composite) | ID de l'utilisateur Discord |
| `unique_id` | `UUID` | PK (composite) | UUID du joueur Minecraft |
| `minecraft_name` | `VARCHAR(16)` | | Nom Minecraft |
| `discord_name` | `VARCHAR(32)` | | Nom d'utilisateur Discord |

### zessentials_link_codes

Codes temporaires utilisés pendant la liaison des comptes.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `code` | `VARCHAR` | PK (composite) | Code de liaison temporaire |
| `user_id` | `BIGINT` | PK (composite) | ID de l'utilisateur Discord |
| `discord_name` | `VARCHAR(32)` | | Nom d'utilisateur Discord |

### zessentials_link_histories

Historique de toutes les liaisons et suppressions de liaison.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `id` | `BIGINT` | PK (auto-incrément) | ID de l'entrée |
| `action` | `VARCHAR` | | Type d'action (LINK, UNLINK, etc.) |
| `discord_id` | `BIGINT` | | ID de l'utilisateur Discord |
| `minecraft_id` | `UUID` | | UUID du joueur Minecraft |
| `discord_name` | `VARCHAR(32)` | | Nom Discord au moment de l'action |
| `minecraft_name` | `VARCHAR(16)` | | Nom Minecraft au moment de l'action |
| `data` | `TEXT` | | Données supplémentaires sur l'action |

### zessentials_storages

Stockage clé-valeur générique pour les données internes du serveur.

| Colonne | Type | Clé | Description |
|---------|------|-----|-------------|
| `name` | `VARCHAR` | PK | Clé de stockage |
| `content` | `TEXT` | | Valeur sérialisée |

<CalloutContainer type="info">

<CalloutDescription>
Sauf mention contraire, la plupart des tables contiennent aussi les colonnes d'horodatage `created_at` et `updated_at`.
</CalloutDescription>

</CalloutContainer>

## Optimisations de performance

zEssentials met en place plusieurs niveaux d'optimisation des écritures pour limiter la charge sur la base de données et garder un gameplay fluide.

### Traitement par lots (TypeSafeCache)

Les logs et les mises à jour fréquentes ne sont pas écrits un par un. Les logs de commandes, les messages du chat, les messages privés, les transactions économiques et les mises à jour du temps de vol sont accumulés dans un `TypeSafeCache` puis envoyés en base par lots, à un intervalle configurable :

```yaml
batch-auto-save: 10000 # Intervalle d'envoi en millisecondes
```

L'intervalle par défaut est de **10 secondes** (`10000` ms). Cela réduit considérablement le nombre d'allers-retours avec la base par rapport à une écriture individuelle de chaque entrée.

### Regroupement des mises à jour de l'économie

Les mises à jour des soldes sont regroupées par joueur et par économie grâce à un `AtomicReference`. Lorsque plusieurs opérations visent le même solde en peu de temps (par exemple des achats rapides dans un shop), l'écriture en attente est réutilisée et seule la dernière valeur est enregistrée. Cela évite les écritures inutiles tout en garantissant que la base contient toujours le bon solde final.

### Écritures asynchrones

Toutes les autres écritures (homes, options, items des coffres, sanctions...) sont exécutées de façon asynchrone, afin que le thread principal du serveur ne soit jamais bloqué par une requête.

## Système de migrations

zEssentials utilise un système de migrations séquentielles (fourni par la bibliothèque [Sarah](https://github.com/Maxlego08/Sarah)) pour faire évoluer le schéma de la base d'une version à l'autre. Les migrations appliquées sont enregistrées dans la table `zessentials_migrations` : seules les nouvelles migrations sont exécutées au démarrage.

Il y a actuellement **37 migrations enregistrées** :

| Étape | Migrations |
|-------|------------|
| Tables principales | `users`, `storages`, `user_options`, `user_cooldowns`, `economies`, `economy_transactions`, `user_homes` |
| Social | `user_ignores`, `user_home_shares` |
| Sanctions & logs | `sanctions`, colonnes `ban_sanction_id`/`mute_sanction_id` sur `users`, `chat_message`, `commands`, `user_play_times` |
| Fonctionnalités joueurs | `user_power_tools`, `user_mail_boxes`, colonnes `vote`/`vote_offline`, `vote_sites` |
| Coffres | `vault_items`, `vaults`, `player_slots` |
| Colonnes utilisateur | colonnes `frozen`, `fly_seconds`, `player_time`/`player_weather` sur `users` |
| Homes | colonnes `is_public`, `category`, `is_favorite` sur `user_homes` |
| Économie | colonne `reason` sur `economy_transactions` |
| Discord | `link_codes`, `link_accounts`, `link_histories` |
| Refonte | `user_power_tools` (v2, clé primaire composite), mise à jour de `player_slots`, `private_messages`, `steps` (v2 avec les colonnes de temps de jeu) |
| Boîte aux lettres | `user_mail_messages` (mails texte) |

Les migrations s'exécutent automatiquement au démarrage du serveur, sans aucune intervention manuelle. Si vous mettez à jour depuis une ancienne version, le plugin applique uniquement les migrations qui n'ont pas encore été exécutées.

<CalloutContainer type="info">

<CalloutDescription>
Ne modifiez jamais manuellement la table de suivi des migrations et ne sautez aucune migration : cela pourrait laisser votre base dans un état incohérent. En cas d'erreur de migration, consultez la console du serveur et signalez le problème sur [GitHub](https://github.com/Maxlego08/zEssentials) ou sur [Discord](https://discord.groupez.dev).
</CalloutDescription>

</CalloutContainer>
