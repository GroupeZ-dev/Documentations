---
sidebar_position: 19
title: Module Coffres
description: Coffres de stockage personnels pour les joueurs avec limites d'emplacements basées sur les permissions
---

# Module Coffres

**Fichier :** `modules/vault/config.yml`

Le module Coffres fournit un système de stockage personnel qui donne aux joueurs accès à des coffres d'inventaire virtuels. Chaque joueur peut posséder plusieurs coffres avec des limites d'emplacements configurables basées sur leurs permissions. Les coffres persistent entre les sessions et peuvent être personnalisés avec des noms, des icônes et une validation de nom par regex. Il s'agit du module de **coffres de joueur (stockage)**, à ne pas confondre avec le hook d'économie Vault.

---

## Configuration Source

```yaml
enable: true
max-vaults: 7
default-vault-name: "<#353535>Vault<dark_gray>-<white>%vault-id%"
icon-open: "MINECART"
icon-open-model-id: 0
icon-close: "CHEST_MINECART"
icon-close-model-id: 0
vault-name-regex: "^[a-zA-Z0-9_-]{3,16}$"
vault-permissions:
  - permission: zessentials.vault.size.player
    slots: 45
  - permission: zessentials.vault.size.vip
    slots: 90
  - permission: zessentials.vault.size.admin
    slots: 500
vault-slot-type: MAX  # MAX or ADDITION
```

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Coffres |
| `max-vaults` | Integer | `7` | Le nombre maximum de coffres qu'un joueur peut créer |
| `default-vault-name` | String | `<#353535>Vault<dark_gray>-<white>%vault-id%` | Le nom d'affichage par défaut pour les coffres nouvellement créés. Supporte le formatage MiniMessage et le placeholder `%vault-id%` |
| `vault-name-regex` | String | `^[a-zA-Z0-9_-]{3,16}$` | Un motif regex que les noms de coffres doivent respecter. Utilisé pour valider les noms personnalisés définis par les joueurs |

### Icônes de Coffre

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `icon-open` | String | `MINECART` | Le matériau utilisé comme icône pour un coffre ouvert (actuellement consulté) dans le menu de sélection des coffres |
| `icon-open-model-id` | Integer | `0` | L'ID de données de modèle personnalisé pour l'icône de coffre ouvert. Définir sur `0` pour le modèle par défaut |
| `icon-close` | String | `CHEST_MINECART` | Le matériau utilisé comme icône pour un coffre fermé (non consulté actuellement) dans le menu de sélection des coffres |
| `icon-close-model-id` | Integer | `0` | L'ID de données de modèle personnalisé pour l'icône de coffre fermé. Définir sur `0` pour le modèle par défaut |

:::tip
Vous pouvez utiliser les données de modèle personnalisé pour afficher des textures uniques pour vos icônes de coffre lors de l'utilisation d'un resource pack. Définissez les champs `model-id` pour correspondre aux valeurs de données de modèle personnalisé de votre resource pack.
:::

### Permissions de Coffre (Limites d'Emplacements)

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `vault-permissions` | List | *(voir ci-dessus)* | Définitions de limites d'emplacements basées sur les permissions. Chaque entrée accorde un nombre spécifique d'emplacements d'inventaire en fonction de la permission du joueur |
| `vault-permissions[].permission` | String | - | Le noeud de permission que le joueur doit posséder pour que cette limite d'emplacements s'applique |
| `vault-permissions[].slots` | Integer | - | Le nombre d'emplacements d'inventaire accordés par cette permission. Doit être un multiple de 9 pour un rendu correct de l'inventaire (jusqu'à 54 par page) |
| `vault-slot-type` | String | `MAX` | Détermine comment les valeurs d'emplacements de permissions multiples sont combinées. Accepte `MAX` ou `ADDITION` |

:::info Modes de Type d'Emplacements
- **`MAX`** -- La taille du coffre du joueur est déterminée par la **plus haute** valeur de permission correspondante. Par exemple, si un joueur possède à la fois `zessentials.vault.size.player` (45 emplacements) et `zessentials.vault.size.vip` (90 emplacements), la taille de son coffre sera de **90 emplacements**.
- **`ADDITION`** -- Toutes les valeurs d'emplacements de permissions correspondantes sont **additionnées**. En reprenant le même exemple, la taille du coffre du joueur serait de **135 emplacements** (45 + 90).
:::

:::warning
Lors de l'utilisation du mode `ADDITION`, faites attention aux permissions que vous attribuez aux joueurs. Accorder plusieurs permissions de taille de coffre les cumulera, donnant potentiellement aux joueurs des coffres très grands. Assurez-vous que vos groupes de permissions sont configurés pour éviter les combinaisons involontaires.
:::

:::note
Les tailles de coffre supérieures à 54 emplacements (6 rangées) s'étendront sur plusieurs pages d'inventaire. Le plugin gère la pagination automatiquement, permettant aux joueurs de naviguer entre les pages au sein d'un même coffre.
:::

---

## Fonctionnement

1. Un joueur exécute la commande `/vault` pour ouvrir le menu de sélection des coffres.
2. Le menu affiche tous les coffres disponibles en utilisant les icônes ouvert/fermé configurées. Les joueurs peuvent sélectionner un coffre existant ou en créer un nouveau (jusqu'à `max-vaults`).
3. Lorsqu'un coffre est ouvert, le joueur voit un inventaire avec un nombre d'emplacements déterminé par ses permissions et le paramètre `vault-slot-type`.
4. Les objets placés dans le coffre sont sauvegardés de manière persistante. Ils restent disponibles après les redémarrages du serveur et les reconnexions.
5. Lors de la création ou du renommage d'un coffre, le nom doit correspondre au motif `vault-name-regex`.

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/vault` | `sac`, `bag`, `b`, `coffre`, `chest` | `essentials.vault.use` | Ouvrir le menu de sélection des coffres ou un coffre spécifique |

Pour la liste complète des commandes, consultez [Commandes & Permissions](../commands-permissions).

---

## Permissions Associées

| Permission | Description |
|------------|-------------|
| `essentials.vault.use` | Permet au joueur d'utiliser la commande `/vault` et d'accéder à ses coffres |
| `zessentials.vault.size.player` | Accorde 45 emplacements de coffre (configuration par défaut) |
| `zessentials.vault.size.vip` | Accorde 90 emplacements de coffre (configuration par défaut) |
| `zessentials.vault.size.admin` | Accorde 500 emplacements de coffre (configuration par défaut) |

:::note
Les permissions de taille de coffre et leurs valeurs d'emplacements sont entièrement configurables. Les permissions listées ci-dessus proviennent de la configuration par défaut. Vous pouvez ajouter, supprimer ou modifier les entrées pour correspondre à la structure de rangs de votre serveur.
:::

---

## Exemple : Système de Coffres à Niveaux

Un serveur avec trois niveaux d'accès aux coffres et un dimensionnement additif des emplacements :

```yaml
enable: true
max-vaults: 10
default-vault-name: "<gradient:#ff7e5f:#feb47b>Vault <white>#%vault-id%"
icon-open: "ENDER_CHEST"
icon-open-model-id: 0
icon-close: "CHEST"
icon-close-model-id: 0
vault-name-regex: "^[a-zA-Z0-9_ ]{3,24}$"
vault-permissions:
  - permission: zessentials.vault.size.default
    slots: 27
  - permission: zessentials.vault.size.premium
    slots: 27
  - permission: zessentials.vault.size.elite
    slots: 54
vault-slot-type: ADDITION
```

Dans cette configuration, un joueur possédant les trois permissions aurait une taille de coffre de **108 emplacements** (27 + 27 + 54), répartis sur deux pages d'inventaire.
