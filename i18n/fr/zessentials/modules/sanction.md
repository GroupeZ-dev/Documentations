---
title: Module Sanctions
description: Système de modération complet avec bans, mutes, kicks, freezes et historique des sanctions
---

# Module Sanctions

**Fichier :** `modules/sanction/config.yml`

Le module Sanctions est un système de modération complet qui propose les **bans**, **mutes**, **kicks**, **freezes**, un **historique des sanctions** par joueur ainsi que les commandes de recherche `/seen` et `/seenip`. Il inclut des raisons par défaut configurables, une liste de joueurs protégés, des options d'affichage pour `/seen` et des icônes de matériaux personnalisables pour l'interface d'historique des sanctions.

<CalloutContainer type="error">

<CalloutTitle>Stockage SQL requis</CalloutTitle>

<CalloutDescription>
Le module Sanctions **nécessite un stockage SQL** (`MYSQL`, `MARIADB`, `HIKARICP` ou `SQLITE`). Les sanctions, `/seen` et `/seenip` ne sont pas implémentés pour le stockage `JSON`. Une base MySQL/MariaDB est recommandée pour les serveurs en production.
</CalloutDescription>

</CalloutContainer>

---

## Configuration Source

```yaml
enable: true

# List of nicknames that cannot be sanctioned, even if they do not have permission.
protections:
  - "Maxlego08"
  - "Notch"

# Default reason for /kick
kick-default-reason: "You have been kicked"

# Default reason for /mute
ban-default-reason: "The ban hammer has spoken"

# Default reason for /ban
mute-default-reason: "You have to turn your tongue 7 times before speaking"

# Default reason for /unmute
unmute-default-reason: "You have the right to talk to us"

# Default reason for /unban
unban-default-reason: "The ban hammer gives you the right to return"

# Date format used for sanctions
date-format: "yyyy-MM-dd HH:mm:ss"

# Settings of the /seen command.
# Each line can be disabled globally here, even for operators.
# The permissions below are still required when the option is enabled.

# Show the UUID of the player
seen-show-uuid: true

# Show the IP addresses used by the player
# Requires the permission essentials.seen.show.ip
# Set this to false if you never want the IP to be displayed, even to an operator
seen-show-ip: true

# Show the last known location of the player
# Requires the permission essentials.seen.show.last.location
seen-show-last-location: true

# Show the date of the first connection of the player
# Requires the permission essentials.seen.show.created.at
seen-show-created-at: true

# Show the total playtime of the player
seen-show-playtime: true

# Materials are used for sanction_history inventory

# Material used for kicks
kick-material: IRON_INGOT

# Material used for ban
ban-material: DIAMOND

# Material used for mute
mute-material: EMERALD

# Material used for unban
unban-material: IRON_INGOT

# Material used for unmute
unmute-material: COPPER_INGOT

# Material used for warn
warn-material: COAL

# Material used for freeze
freeze-material: ICE

# Material used for mute if it is active
current-mute-material: EMERALD_BLOCK

# Material used for ban if it is active
current-ban-material: DIAMOND_BLOCK
```

<CalloutContainer type="info">

<CalloutDescription>
Dans le fichier par défaut, les commentaires au-dessus de `ban-default-reason` et `mute-default-reason` sont inversés. Les clés, elles, sont correctes : `ban-default-reason` est utilisée par `/ban` et `mute-default-reason` par `/mute`.
</CalloutDescription>

</CalloutContainer>

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Active ou désactive le module Sanctions |
| `protections` | Liste de String | `["Maxlego08", "Notch"]` | Liste des pseudos qui ne peuvent pas être sanctionnés. Toute tentative de ban, mute, kick ou freeze contre ces joueurs est refusée |
| `date-format` | String | `yyyy-MM-dd HH:mm:ss` | Format de date utilisé pour les dates des sanctions (`%created_at%`, `%expired_at%` dans les notifications) et pour les dates affichées par `/seen`. Suit les motifs Java `SimpleDateFormat` |

### Raisons par Défaut

La raison par défaut est utilisée lorsque le modérateur ne précise pas de raison dans la commande.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `kick-default-reason` | String | `You have been kicked` | Raison par défaut de `/kick` |
| `ban-default-reason` | String | `The ban hammer has spoken` | Raison par défaut de `/ban` |
| `mute-default-reason` | String | `You have to turn your tongue 7 times before speaking` | Raison par défaut de `/mute` |
| `unmute-default-reason` | String | `You have the right to talk to us` | Raison enregistrée par défaut pour `/unmute` |
| `unban-default-reason` | String | `The ban hammer gives you the right to return` | Raison enregistrée par défaut pour `/unban` |

<CalloutContainer type="info">

<CalloutDescription>
Avant la version 1.0.3.8, `date-format` et les cinq options `*-default-reason` étaient ignorées silencieusement et les valeurs internes étaient toujours utilisées. Elles sont désormais lues depuis le fichier de configuration.
</CalloutDescription>

</CalloutContainer>

### Options d'affichage de `/seen`

Chaque ligne de `/seen` peut être désactivée globalement. Lorsqu'une option est activée, la permission associée (s'il y en a une) reste nécessaire.

| Option | Type | Par Défaut | Permission requise | Description |
|--------|------|------------|--------------------|-------------|
| `seen-show-uuid` | Boolean | `true` | - | Affiche l'UUID du joueur |
| `seen-show-ip` | Boolean | `true` | `essentials.seen.show.ip` | Affiche les adresses IP utilisées par le joueur |
| `seen-show-last-location` | Boolean | `true` | `essentials.seen.show.last.location` | Affiche la dernière position connue du joueur |
| `seen-show-created-at` | Boolean | `true` | `essentials.seen.show.created.at` | Affiche la date de première connexion du joueur |
| `seen-show-playtime` | Boolean | `true` | - | Affiche le temps de jeu total du joueur |

<CalloutContainer type="info">

<CalloutTitle>Masquer les adresses IP à tout le monde</CalloutTitle>

<CalloutDescription>
Les opérateurs possèdent toutes les permissions, y compris `essentials.seen.show.ip` : la permission seule ne permet donc pas de leur cacher les adresses IP. Mettez `seen-show-ip: false` pour ne jamais afficher les adresses IP dans `/seen`, même aux opérateurs.
</CalloutDescription>

</CalloutContainer>

### Icônes de Matériaux

Ces matériaux servent d'icônes dans l'interface d'historique des sanctions pour distinguer visuellement les différents types de sanctions.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `kick-material` | Material | `IRON_INGOT` | Icône des kicks |
| `ban-material` | Material | `DIAMOND` | Icône des bans |
| `mute-material` | Material | `EMERALD` | Icône des mutes |
| `unban-material` | Material | `IRON_INGOT` | Icône des unbans |
| `unmute-material` | Material | `COPPER_INGOT` | Icône des unmutes |
| `warn-material` | Material | `COAL` | Icône des avertissements |
| `freeze-material` | Material | `ICE` | Icône des freezes |
| `current-mute-material` | Material | `EMERALD_BLOCK` | Icône du mute actif (en cours) |
| `current-ban-material` | Material | `DIAMOND_BLOCK` | Icône du ban actif (en cours) |

<CalloutContainer type="info">

<CalloutDescription>
Les variantes en bloc (`EMERALD_BLOCK`, `DIAMOND_BLOCK`) sont utilisées pour les sanctions **actives**, ce qui permet aux modérateurs de distinguer facilement les bans/mutes passés et en cours dans l'historique.
</CalloutDescription>

</CalloutContainer>

---

## Fonctionnement

1. Un modérateur exécute une commande de sanction (par exemple `/ban`, `/mute`, `/kick`, `/freeze`).
2. Le plugin vérifie si le joueur ciblé figure dans la liste `protections`. Si c'est le cas, l'action est refusée.
3. La sanction est appliquée au joueur ciblé et enregistrée dans la base de données avec la date, la raison et l'auteur.
4. Si aucune raison n'est fournie, la raison par défaut correspondante est utilisée.
5. Les membres du staff ayant la permission `notify` correspondante reçoivent une notification.
6. Les modérateurs peuvent consulter l'historique complet d'un joueur avec `/sanction <joueur>`, qui ouvre une interface avec des entrées identifiées par leur matériau.

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/ban <joueur> <durée> [raison]` | - | `essentials.ban` | Bannit un joueur du serveur |
| `/unban <joueur> [raison]` | - | `essentials.un.ban` | Débannit un joueur |
| `/mute <joueur> <durée> [raison]` | - | `essentials.mute` | Rend un joueur muet, l'empêchant d'écrire dans le chat |
| `/unmute <joueur> [raison]` | - | `essentials.un.mute` | Rend la parole à un joueur muet |
| `/kick <joueur> [raison]` | - | `essentials.kick` | Expulse un joueur du serveur |
| `/kickall [raison]` | - | `essentials.kick.all` | Expulse tous les joueurs du serveur |
| `/freeze <joueur>` | - | `essentials.freeze` | Gèle ou dégèle un joueur |
| `/sanction <joueur>` | `sc` | `essentials.sanction` | Ouvre l'interface de sanction d'un joueur |
| `/seen <joueur>` | `whois` | `essentials.seen` | Affiche les informations d'un joueur (statut, temps de jeu, UUID, IP, dernière position, première connexion) |
| `/seenip <ip>` | `whoisip` | `essentials.seen.ip` | Liste les joueurs ayant utilisé une adresse IP |

### Permissions Supplémentaires

| Permission | Description |
|------------|-------------|
| `essentials.ban.notify` | Recevoir une notification lorsqu'un joueur est banni |
| `essentials.unban.notify` | Recevoir une notification lorsqu'un joueur est débanni |
| `essentials.mute.notify` | Recevoir une notification lorsqu'un joueur est rendu muet |
| `essentials.unmute.notify` | Recevoir une notification lorsqu'un joueur retrouve la parole |
| `essentials.kick.notify` | Recevoir une notification lorsqu'un joueur est expulsé |
| `essentials.kick.bypass.all` | Ne pas être expulsé par `/kickall` |
| `essentials.seen.show.ip` | Voir les adresses IP dans `/seen` (si `seen-show-ip` vaut `true`) |
| `essentials.seen.show.last.location` | Voir la dernière position dans `/seen` (si `seen-show-last-location` vaut `true`) |
| `essentials.seen.show.created.at` | Voir la date de première connexion dans `/seen` (si `seen-show-created-at` vaut `true`) |

Pour la liste complète des commandes, consultez [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associés

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_is_mute%` | Retourne `true` si le joueur est actuellement muet |
| `%zessentials_user_mute_seconds%` | Retourne la durée restante du mute en secondes |
| `%zessentials_user_mute_formatted%` | Retourne la durée restante du mute dans un format lisible |
| `%zessentials_user_mute_reason%` | Retourne la raison du mute |
| `%zessentials_user_is_ban%` | Retourne `true` si le joueur est banni |
| `%zessentials_user_ban_reason%` | Retourne la raison du ban |
| `%zessentials_user_ban_duration%` | Retourne la durée restante du ban en secondes |
| `%zessentials_user_ban_duration_formatted%` | Retourne la durée restante du ban formatée |
| `%zessentials_user_is_frozen%` | Retourne `true` si le joueur est gelé |
| `%zessentials_user_target_is_ban%` | Retourne `true` si le joueur ciblé est actuellement banni |
| `%zessentials_user_target_is_mute%` | Retourne `true` si le joueur ciblé est actuellement muet |

Pour la liste complète des placeholders, consultez [Placeholders](../placeholders).

<CalloutContainer type="warning">

<CalloutDescription>
Les placeholders `%zessentials_user_target_is_ban%` et `%zessentials_user_target_is_mute%` s'appliquent au **joueur ciblé**, et non au joueur qui fait la requête. Ils sont généralement utilisés dans les interfaces de sanction, lorsqu'un modérateur inspecte un autre joueur.
</CalloutDescription>

</CalloutContainer>

---

## Joueurs Protégés

La liste `protections` empêche certains joueurs d'être sanctionnés par n'importe quel modérateur, y compris ceux qui possèdent toutes les permissions. C'est utile pour protéger les propriétaires du serveur ou des comptes système contre des sanctions accidentelles ou malveillantes.

```yaml
protections:
  - "Maxlego08"
  - "Notch"
```

<CalloutContainer type="info">

<CalloutDescription>
La protection se base sur le **pseudo** du joueur, sans tenir compte des majuscules et minuscules.
</CalloutDescription>

</CalloutContainer>

---

## Exemple : `/seen` respectueux de la vie privée

```yaml
seen-show-uuid: true
seen-show-ip: false
seen-show-last-location: false
seen-show-created-at: true
seen-show-playtime: true
```

`/seen` n'affiche jamais les adresses IP ni la dernière position, même aux opérateurs, mais affiche toujours l'UUID, la date de première connexion et le temps de jeu.
