---
sidebar_position: 14
title: Module Sanctions
description: Système de modération complet avec bannissements, mutes, expulsions, freezes et historique des sanctions
---

# Module Sanctions

**Fichier :** `modules/sanction/config.yml`

Le module Sanctions est un système de modération complet fournissant des **bannissements**, **mutes**, **expulsions**, **freezes**, et un **historique des sanctions** complet par joueur. Il inclut des raisons par défaut configurables, des listes de joueurs protégés, et des icônes de matériaux personnalisables pour l'interface GUI de l'historique des sanctions.

:::danger MySQL Requis
Le module Sanctions **nécessite le stockage MySQL** pour fonctionner. Il ne fonctionnera pas avec un stockage par fichier plat ou SQLite. Assurez-vous que votre connexion à la base de données est correctement configurée avant d'activer ce module.
:::

---

## Configuration Source

```yaml
enable: true
protections:
  - "Maxlego08"
  - "Notch"
kick-default-reason: "You have been kicked"
ban-default-reason: "The ban hammer has spoken"
mute-default-reason: "You have to turn your tongue 7 times before speaking"
unmute-default-reason: "You have the right to talk to us"
unban-default-reason: "The ban hammer gives you the right to return"
date-format: "yyyy-MM-dd HH:mm:ss"
kick-material: IRON_INGOT
ban-material: DIAMOND
mute-material: EMERALD
unban-material: IRON_INGOT
unmute-material: COPPER_INGOT
warn-material: COAL
freeze-material: ICE
current-mute-material: EMERALD_BLOCK
current-ban-material: DIAMOND_BLOCK
```

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Sanctions |
| `protections` | Liste de Strings | `["Maxlego08", "Notch"]` | Liste des noms de joueurs qui ne peuvent pas être sanctionnés. Toute tentative de bannissement, mute, expulsion ou freeze contre ces joueurs sera refusée |
| `date-format` | String | `yyyy-MM-dd HH:mm:ss` | Le format de date utilisé pour afficher les horodatages des sanctions. Suit les patterns Java `SimpleDateFormat` |

### Raisons par Défaut

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `kick-default-reason` | String | `You have been kicked` | Raison par défaut appliquée lorsqu'un joueur est expulsé sans spécifier de raison |
| `ban-default-reason` | String | `The ban hammer has spoken` | Raison par défaut appliquée lorsqu'un joueur est banni sans spécifier de raison |
| `mute-default-reason` | String | `You have to turn your tongue 7 times before speaking` | Raison par défaut appliquée lorsqu'un joueur est mute sans spécifier de raison |
| `unmute-default-reason` | String | `You have the right to talk to us` | Raison par défaut enregistrée lorsqu'un joueur est unmute sans spécifier de raison |
| `unban-default-reason` | String | `The ban hammer gives you the right to return` | Raison par défaut enregistrée lorsqu'un joueur est débanni sans spécifier de raison |

### Icônes de Matériaux

Ces matériaux sont utilisés comme icônes d'items dans l'interface GUI de l'historique des sanctions pour distinguer visuellement les différents types de sanctions.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `kick-material` | Material | `IRON_INGOT` | Matériau de l'item représentant les entrées d'expulsion dans l'historique des sanctions |
| `ban-material` | Material | `DIAMOND` | Matériau de l'item représentant les entrées de bannissement dans l'historique des sanctions |
| `mute-material` | Material | `EMERALD` | Matériau de l'item représentant les entrées de mute dans l'historique des sanctions |
| `unban-material` | Material | `IRON_INGOT` | Matériau de l'item représentant les entrées de débannissement dans l'historique des sanctions |
| `unmute-material` | Material | `COPPER_INGOT` | Matériau de l'item représentant les entrées de unmute dans l'historique des sanctions |
| `warn-material` | Material | `COAL` | Matériau de l'item représentant les entrées d'avertissement dans l'historique des sanctions |
| `freeze-material` | Material | `ICE` | Matériau de l'item représentant les entrées de freeze dans l'historique des sanctions |
| `current-mute-material` | Material | `EMERALD_BLOCK` | Matériau de l'item représentant un mute actif (en cours) dans l'historique des sanctions |
| `current-ban-material` | Material | `DIAMOND_BLOCK` | Matériau de l'item représentant un bannissement actif (en cours) dans l'historique des sanctions |

:::tip
Les variantes en bloc (`EMERALD_BLOCK`, `DIAMOND_BLOCK`) sont utilisées pour les sanctions **actives**, ce qui permet aux modérateurs de distinguer visuellement les bannissements/mutes passés et en cours dans l'interface GUI de l'historique.
:::

---

## Fonctionnement

1. Un modérateur exécute une commande de sanction (par ex. `/ban`, `/mute`, `/kick`, `/freeze`).
2. Le plugin vérifie si le joueur ciblé est dans la liste `protections`. Si c'est le cas, l'action est refusée.
3. La sanction est appliquée au joueur ciblé et stockée dans la base de données MySQL avec un horodatage, une raison et l'émetteur.
4. Si aucune raison n'est fournie, la raison par défaut correspondante est utilisée.
5. Les modérateurs peuvent consulter l'historique complet des sanctions d'un joueur en utilisant la commande `/sanction`, qui ouvre une interface GUI avec des entrées codées par matériau.

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/ban` | | `essentials.ban` | Bannir un joueur du serveur |
| `/unban` | | `essentials.unban` | Débannir un joueur précédemment banni |
| `/mute` | | `essentials.mute` | Mute un joueur, l'empêchant de parler dans le chat |
| `/unmute` | | `essentials.unmute` | Unmute un joueur précédemment mute |
| `/kick` | | `essentials.kick` | Expulser un joueur du serveur |
| `/kickall` | | `essentials.kickall` | Expulser tous les joueurs du serveur |
| `/freeze` | | `essentials.freeze` | Geler un joueur, l'empêchant de se déplacer |
| `/sanction` | `sc` | `essentials.sanction` | Voir l'historique des sanctions d'un joueur |
| `/seen` | `whois` | `essentials.seen` | Voir les informations d'un joueur et sa dernière connexion |
| `/seenip` | `whoisip` | `essentials.seenip` | Rechercher des joueurs par adresse IP |

Pour la liste complète des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associés

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_is_mute%` | Retourne `true` si le joueur est actuellement mute |
| `%zessentials_user_mute_seconds%` | Retourne la durée restante du mute en secondes |
| `%zessentials_user_mute_formatted%` | Retourne la durée restante du mute dans un format lisible |
| `%zessentials_user_target_is_ban%` | Retourne `true` si le joueur ciblé est actuellement banni |
| `%zessentials_user_target_is_mute%` | Retourne `true` si le joueur ciblé est actuellement mute |

Pour la liste complète des placeholders, voir [Placeholders](../placeholders).

:::warning
Les placeholders `%zessentials_user_target_is_ban%` et `%zessentials_user_target_is_mute%` opèrent sur un contexte de joueur **ciblé**, et non sur le joueur demandeur. Ils sont généralement utilisés dans les interfaces GUI ou commandes liées aux sanctions où un modérateur inspecte un autre joueur.
:::

---

## Joueurs Protégés

La liste `protections` empêche des joueurs spécifiques d'être sanctionnés par n'importe quel modérateur, y compris ceux disposant de toutes les permissions. Cela est utile pour protéger les propriétaires du serveur ou les comptes système contre des sanctions accidentelles ou malveillantes.

```yaml
protections:
  - "Maxlego08"
  - "Notch"
```

:::note
La protection est basée sur le **nom du joueur** (sensible à la casse). Assurez-vous que les noms dans la liste correspondent exactement aux noms en jeu des joueurs que vous souhaitez protéger.
:::
