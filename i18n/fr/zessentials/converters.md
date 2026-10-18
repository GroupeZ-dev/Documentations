---
title: Migration de données
description: Migrer les données d'autres plugins vers zEssentials
---

# Migration de données

zEssentials intègre des convertisseurs qui permettent de migrer les données des joueurs depuis d'autres plugins populaires. Chaque convertisseur lit les données dans le format de stockage du plugin source et les importe dans la base de données de zEssentials.

<CalloutContainer type="warning">

<CalloutTitle>Prérequis</CalloutTitle>

<CalloutDescription>
Tous les convertisseurs nécessitent que zEssentials utilise un **stockage SQL** (`SQLITE`, `MYSQL`, `MARIADB` ou `HIKARICP`). Le stockage `JSON` n'est pas supporté comme cible de migration. Vérifiez que votre base de données est configurée et fonctionnelle avant de lancer un convertisseur. En production, préférez MySQL/MariaDB à SQLite.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutTitle>Avant de commencer</CalloutTitle>

<CalloutDescription>
1. **Sauvegardez votre base de données** avant de lancer un convertisseur.
2. **Fermez le serveur aux joueurs** (par exemple avec la whitelist) ou assurez-vous qu'aucun joueur n'est connecté pendant la migration, pour éviter les conflits de données.
3. Vérifiez que les fichiers de données du plugin source sont accessibles depuis le serveur.
4. Lancez le convertisseur depuis la console du serveur pour de meilleurs résultats.
</CalloutDescription>

</CalloutContainer>

## Commande

Tous les convertisseurs se lancent avec la même commande :

```
/zessentials convert <plugin>
```

| Argument | Valeurs |
|----------|---------|
| `<plugin>` | `essentialsx`, `cmi`, `sunlight`, `playervaultx`, `coinsengine`, `huskhomes`, `axvaults` |

- **Alias** : `/ess convert`, `/zessentials conv`, `/zessentials c`
- **Permission** : `essentials.convert`

La conversion s'exécute de façon asynchrone. La progression et le résultat final (`You have just converted your ... data to zEssentials !`) sont envoyés à l'expéditeur de la commande.

<CalloutContainer type="info">

<CalloutTitle>Uniquement les homes d'EssentialsX</CalloutTitle>

<CalloutDescription>
Si vous souhaitez seulement importer les **homes** d'EssentialsX (sans les soldes), vous pouvez aussi utiliser `/homeimport essentialsx` (permission `essentials.home.import`). Cette commande lit les mêmes fichiers `plugins/Essentials/userdata/`, ignore les homes dont le monde n'existe pas et fonctionne avec tous les types de stockage. Voir le [module Home](./modules/home).
</CalloutDescription>

</CalloutContainer>

---

## EssentialsX

Migre les données des joueurs depuis [EssentialsX](https://essentialsx.net/) vers zEssentials.

### Données migrées

| Type de données | Détails |
|-----------------|---------|
| **Utilisateurs** | UUID du joueur et dernier pseudo connu |
| **Économie** | Soldes des joueurs |
| **Homes** | Tous les homes des joueurs avec leur position complète |

### Fonctionnement

Le convertisseur lit les fichiers d'EssentialsX situés dans `plugins/Essentials/userdata/`. Chaque fichier de ce dossier porte l'UUID d'un joueur (par exemple `550e8400-e29b-41d4-a716-446655440000.yml`) et contient ses données.

Dans chaque fichier, le convertisseur récupère :

- **`money`** -- Le solde du joueur
- **`last-account-name`** -- Le dernier pseudo connu du joueur
- **`homes`** -- La liste des homes, chacun contenant :
  - `world-name` -- Le monde du home
  - `x`, `y`, `z` -- Les coordonnées
  - `yaw`, `pitch` -- L'orientation du joueur

### Prérequis

- Les fichiers userdata d'EssentialsX doivent être présents dans `plugins/Essentials/userdata/`
- zEssentials doit utiliser un stockage SQL

### Utilisation

1. Vérifiez que le dossier `plugins/Essentials/userdata/` contient les fichiers `.yml` des joueurs
2. Lancez `/zessentials convert essentialsx` depuis la console
3. Le convertisseur parcourt tous les fichiers `.yml` et importe les données de chaque joueur

---

## CMI

Migre les données des joueurs depuis [CMI](https://www.spigotmc.org/resources/cmi.3742/) vers zEssentials.

### Données migrées

| Type de données | Détails |
|-----------------|---------|
| **Utilisateurs** | UUID et pseudo du joueur |
| **Économie** | Soldes des joueurs |
| **Homes** | Tous les homes des joueurs avec leur position complète |

### Fonctionnement

Le convertisseur lit la base SQLite de CMI (`cmi.sqlite.db`). Ce fichier doit être placé dans le dossier `plugins/zEssentials/` avant de lancer le convertisseur.

Dans CMI, les positions des homes sont stockées sous forme de chaînes sérialisées. Le convertisseur les analyse pour en extraire le monde, les coordonnées, le yaw et le pitch de chaque home.

### Prérequis

- Copiez `cmi.sqlite.db` depuis le dossier de CMI vers `plugins/zEssentials/`
- zEssentials doit utiliser un stockage SQL

### Utilisation

1. Copiez le fichier `cmi.sqlite.db` dans `plugins/zEssentials/`
2. Lancez `/zessentials convert cmi` depuis la console
3. Le convertisseur lit la base de CMI et importe les utilisateurs, les soldes et les homes

---

## CoinsEngine

Migre les soldes multi-devises depuis [CoinsEngine](https://www.spigotmc.org/resources/coinsengine.84121/) vers zEssentials.

### Données migrées

| Type de données | Détails |
|-----------------|---------|
| **Économie** | Tous les soldes multi-devises de chaque joueur |

### Fonctionnement

Le convertisseur lit deux sources :

1. **`plugins/CoinsEngine/data.db`** -- La base SQLite contenant les soldes des joueurs
2. **`plugins/CoinsEngine/currencies/*.yml`** -- Les fichiers de configuration des devises, utilisés pour déterminer le nom des colonnes dans la base

Chaque devise définie dans CoinsEngine correspond à une colonne de la base. Le convertisseur lit le nom des colonnes dans les fichiers de configuration des devises puis extrait le solde correspondant de chaque joueur.

### Prérequis

- Le fichier de données de CoinsEngine doit être présent dans `plugins/CoinsEngine/data.db`
- Les fichiers de configuration des devises doivent être présents dans `plugins/CoinsEngine/currencies/`
- **Toutes les devises doivent déjà exister dans la configuration de l'économie de zEssentials** avant de lancer le convertisseur. Créez d'abord les devises correspondantes dans zEssentials, puis lancez la migration.
- zEssentials doit utiliser un stockage SQL

### Utilisation

1. Vérifiez que `plugins/CoinsEngine/data.db` et `plugins/CoinsEngine/currencies/` sont accessibles
2. Créez toutes les devises correspondantes dans la configuration du module Économie de zEssentials
3. Lancez `/zessentials convert coinsengine` depuis la console
4. Le convertisseur associe chaque devise de CoinsEngine à son équivalent dans zEssentials et importe tous les soldes

---

## HuskHomes

Migre les données des joueurs depuis [HuskHomes](https://william278.net/project/huskhomes/) vers zEssentials.

### Données migrées

| Type de données | Détails |
|-----------------|---------|
| **Utilisateurs** | UUID et pseudo du joueur |
| **Homes** | Tous les homes des joueurs avec leur position complète |

### Fonctionnement

Le convertisseur lit la base SQLite de HuskHomes (`HuskHomesData.db`) si ce fichier est présent dans `plugins/zEssentials/`. Sinon, il lit les tables de HuskHomes dans la base de données de zEssentials (pratique lorsque les deux plugins partagent la même base MySQL). Le convertisseur lit quatre tables :

1. **`huskhomes_users`** -- Contient les UUID et pseudos des joueurs
2. **`huskhomes_homes`** -- Contient le nom des homes et leur propriétaire
3. **`huskhomes_saved_positions`** -- Associe chaque home à une position
4. **`huskhomes_position_data`** -- Contient les coordonnées (monde, x, y, z, yaw, pitch)

Ces tables sont combinées pour reconstituer l'ensemble des homes de chaque joueur.

### Prérequis

- Copiez `HuskHomesData.db` depuis le dossier de HuskHomes vers `plugins/zEssentials/`, ou assurez-vous que zEssentials peut accéder aux tables existantes de HuskHomes
- zEssentials doit utiliser un stockage SQL

### Utilisation

1. Copiez le fichier `HuskHomesData.db` dans `plugins/zEssentials/` (ou configurez l'accès à la base partagée)
2. Lancez `/zessentials convert huskhomes` depuis la console
3. Le convertisseur combine les tables des utilisateurs, des homes et des positions, puis importe tous les homes des joueurs

---

## PlayerVaultX

Migre le contenu des coffres depuis [PlayerVaultX](https://www.spigotmc.org/resources/playervaultx.51204/) vers zEssentials.

### Données migrées

| Type de données | Détails |
|-----------------|---------|
| **Coffres** | Tout le contenu des coffres des joueurs (items) |

### Fonctionnement

Le convertisseur lit les fichiers de PlayerVaultX situés dans `plugins/PlayerVaults/newvaults/`. Chaque fichier contient les coffres d'un joueur, avec les items stockés sous forme de tableaux d'`ItemStack` encodés en Base64 au format `CardboardBoxSerialization`.

Le convertisseur décode chaque chaîne Base64 en objets `ItemStack` Minecraft et les importe dans le système de coffres de zEssentials.

### Prérequis

- Les fichiers de PlayerVaultX doivent être présents dans `plugins/PlayerVaults/newvaults/`
- Le **plugin PlayerVaults doit être activé** sur le serveur (nécessaire pour les classes de désérialisation `CardboardBoxSerialization`)
- zEssentials doit utiliser un stockage SQL

### Utilisation

1. Vérifiez que le plugin PlayerVaults est installé et activé sur le serveur
2. Vérifiez que `plugins/PlayerVaults/newvaults/` contient les fichiers `.yml` des coffres
3. Lancez `/zessentials convert playervaultx` depuis la console
4. Le convertisseur décode et importe tous les items des coffres de chaque joueur

---

## AxVaults

Migre le contenu des coffres depuis [AxVaults](https://www.spigotmc.org/resources/axvaults.103862/) vers zEssentials.

### Données migrées

| Type de données | Détails |
|-----------------|---------|
| **Coffres** | Tout le contenu des coffres des joueurs (items) |

### Fonctionnement

Le convertisseur lit les coffres directement dans la base de données d'AxVaults. Il utilise la réflexion Java pour accéder à la connexion interne du plugin AxVaults, puis interroge les tables des coffres pour récupérer tous les items de chaque joueur.

### Prérequis

- Le **plugin AxVaults doit être activé** sur le serveur (nécessaire pour accéder à sa connexion à la base par réflexion)
- zEssentials doit utiliser un stockage SQL

### Utilisation

1. Vérifiez que le plugin AxVaults est installé et activé sur le serveur
2. Lancez `/zessentials convert axvaults` depuis la console
3. Le convertisseur accède à la connexion de la base d'AxVaults et importe tous les items des coffres

---

## Sunlight

Migre les données des joueurs depuis [Sunlight](https://www.spigotmc.org/resources/sunlight.101965/) vers zEssentials.

### Données migrées

| Type de données | Détails |
|-----------------|---------|
| **Utilisateurs** | UUID et pseudo du joueur |
| **Homes** | Tous les homes des joueurs avec leur position complète |

### Fonctionnement

Le convertisseur lit la base SQLite de Sunlight (`data.db`). Ce fichier doit être placé dans le dossier `plugins/zEssentials/` avant de lancer le convertisseur.

Sunlight stocke les positions dans un format différent de celui de zEssentials. Le convertisseur se charge de la conversion :

| Format Sunlight | Format zEssentials |
|-----------------|--------------------|
| `x, y, z, pitch, yaw, world` | `world, x, y, z, yaw, pitch` |

Les champs sont réordonnés pour correspondre à la structure des positions de zEssentials pendant l'import.

### Prérequis

- Copiez `data.db` depuis le dossier de Sunlight vers `plugins/zEssentials/`
- zEssentials doit utiliser un stockage SQL

### Utilisation

1. Copiez le fichier `data.db` dans `plugins/zEssentials/`
2. Lancez `/zessentials convert sunlight` depuis la console
3. Le convertisseur lit la base de Sunlight, convertit le format des positions et importe les utilisateurs et les homes

---

## Récapitulatif

| Convertisseur | Utilisateurs | Économie | Homes | Coffres | Format source | Emplacement des fichiers |
|---------------|:------------:|:--------:|:-----:|:-------:|---------------|--------------------------|
| **EssentialsX** | Oui | Oui | Oui | -- | Fichiers YAML | `plugins/Essentials/userdata/` (sur place) |
| **CMI** | Oui | Oui | Oui | -- | SQLite | Copier `cmi.sqlite.db` dans `plugins/zEssentials/` |
| **CoinsEngine** | -- | Oui | -- | -- | SQLite + YAML | `plugins/CoinsEngine/` (sur place) |
| **HuskHomes** | Oui | -- | Oui | -- | SQLite / MySQL | Copier `HuskHomesData.db` dans `plugins/zEssentials/` ou utiliser une base partagée |
| **PlayerVaultX** | -- | -- | -- | Oui | Fichiers YAML (Base64) | `plugins/PlayerVaults/newvaults/` (sur place) |
| **AxVaults** | -- | -- | -- | Oui | Base de données (par réflexion) | Le plugin doit être activé |
| **Sunlight** | Oui | -- | Oui | -- | SQLite | Copier `data.db` dans `plugins/zEssentials/` |

<CalloutContainer type="info">

<CalloutDescription>
Tous les convertisseurs nécessitent qu'un stockage SQL (`SQLITE`, `MYSQL`, `MARIADB` ou `HIKARICP`) soit configuré dans zEssentials. Le stockage `JSON` ne peut pas être utilisé comme cible des migrations.
</CalloutDescription>

</CalloutContainer>
