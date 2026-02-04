---
sidebar_position: 20
title: Module Vote
description: Suivi des votes avec système de vote party et cooldowns par site
---

# Module Vote

**Fichier :** `modules/vote/config.yml`

Le module Vote suit les votes des joueurs provenant de sites de vote externes, fournit des récompenses configurables basées sur le nombre cumulé de votes, et inclut un système de **Vote Party** qui déclenche des récompenses globales lorsque le serveur atteint un objectif collectif de votes. Il prend en charge les cooldowns par site, les paliers de récompenses, les notifications de vote hors ligne et les réinitialisations mensuelles automatiques.

:::warning Dépendance
Ce module nécessite l'installation et la configuration de [NuVotifier](https://github.com/NuVotifier/NuVotifier). NuVotifier reçoit les votes entrants des sites de vote et les transmet à zEssentials pour traitement.
:::

---

## Configuration Source

```yaml
enable: true
enable-vote-party: true
enable-vote-party-open-vote-inventory: true
vote-party-objective: 200
vote-party-rewards:
  actions:
    - type: console_command
      commands:
        - "eco give money %player% 5000"
  permission: "zessentials.vote.double"
  permission-actions:
    - type: console_command
      commands:
        - "eco give money %player% 5000"
  global-commands:
    - "bc Its VoteParty Time"
rewards-on-vote:
  - min: 0
    max: 150
    commands:
      - "cr give %player% vote"
  - min: 151
    max: 400
    commands:
      - "cr give %player% vote"
  - min: 401
    commands:
      - "cr give %player% vote"
sites:
  - name: "ServeurMinecraftVote"
    seconds: 5400
  - name: "ServeurPrive"
    seconds: 5400
  - name: "ServeursMinecraft"
    seconds: 86400
  - name: "TopServeurs"
    seconds: 7200
enable-offline-vote-message: true
placeholder-available: "<green>Available ✔"
placeholder-cooldown: "<red>%cooldown% ✘"
reset-configuration:
  day: 1
  hour: 0
  minute: 0
  second: 0
```

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Vote |
| `enable-offline-vote-message` | Boolean | `true` | Si `true`, les joueurs ayant voté hors ligne reçoivent un message de notification lors de leur prochaine connexion au serveur |

### Vote Party

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable-vote-party` | Boolean | `true` | Activer ou désactiver le système Vote Party |
| `enable-vote-party-open-vote-inventory` | Boolean | `true` | Si `true`, ouvre un inventaire de vote zMenu lorsque le Vote Party se déclenche, permettant aux joueurs de récupérer leurs récompenses via une interface graphique |
| `vote-party-objective` | Integer | `200` | Le nombre total de votes à l'échelle du serveur requis pour déclencher un Vote Party |

### Récompenses du Vote Party

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `vote-party-rewards.actions` | List | *(voir ci-dessus)* | Actions exécutées pour chaque joueur en ligne lorsque le Vote Party se déclenche |
| `vote-party-rewards.actions[].type` | String | `console_command` | Le type d'action à effectuer. `console_command` exécute des commandes depuis la console |
| `vote-party-rewards.actions[].commands` | List of Strings | - | Les commandes à exécuter. Prend en charge le placeholder `%player%` pour le nom du joueur |
| `vote-party-rewards.permission` | String | `zessentials.vote.double` | Un noeud de permission qui accorde des récompenses bonus lors d'un Vote Party |
| `vote-party-rewards.permission-actions` | List | *(voir ci-dessus)* | Actions supplémentaires exécutées pour les joueurs disposant de la permission bonus. Celles-ci s'exécutent **en plus** des actions standard |
| `vote-party-rewards.permission-actions[].type` | String | `console_command` | Le type d'action bonus |
| `vote-party-rewards.permission-actions[].commands` | List of Strings | - | Les commandes bonus à exécuter pour les joueurs disposant de la permission spéciale |
| `vote-party-rewards.global-commands` | List of Strings | - | Commandes exécutées une seule fois globalement (pas par joueur) lorsque le Vote Party se déclenche. Utile pour les annonces ou les effets à l'échelle du serveur |

:::tip
Les joueurs disposant de la permission `zessentials.vote.double` (ou toute permission que vous configurez) reçoivent **à la fois** les `actions` standard et les `permission-actions`, doublant ainsi leurs récompenses. C'est idéal pour encourager les rangs de donation.
:::

### Récompenses par Vote

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `rewards-on-vote` | List | *(voir ci-dessus)* | Paliers de récompenses basés sur le nombre cumulé de votes du joueur |
| `rewards-on-vote[].min` | Integer | - | Le nombre minimum cumulé de votes pour ce palier de récompense (inclus) |
| `rewards-on-vote[].max` | Integer | *(optionnel)* | Le nombre maximum cumulé de votes pour ce palier de récompense (inclus). Omettre pour un palier sans limite supérieure |
| `rewards-on-vote[].commands` | List of Strings | - | Commandes exécutées lorsqu'un joueur vote et que son nombre total de votes se situe dans ce palier. Prend en charge le placeholder `%player%` |

:::info
Les paliers de récompenses vous permettent de donner différentes récompenses à mesure que les joueurs accumulent plus de votes. Par exemple, vous pourriez donner des clés de crate basiques pour les 150 premiers votes, de meilleures clés de 151 à 400, et des clés premium au-delà de 401. Lorsque `max` est omis, le palier s'applique à tous les nombres de votes égaux ou supérieurs à `min`.
:::

### Sites de Vote

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `sites` | List | *(voir ci-dessus)* | Définit les sites de vote et leurs durées de cooldown par site |
| `sites[].name` | String | - | L'identifiant du nom pour le site de vote. Doit correspondre au nom de service envoyé par NuVotifier |
| `sites[].seconds` | Integer | - | La durée du cooldown en secondes avant qu'un joueur puisse voter à nouveau sur ce site |

:::note
Le champ `name` doit correspondre exactement au nom de service configuré dans NuVotifier pour chaque site de vote. Les valeurs de cooldown courantes sont `5400` (1,5 heure), `7200` (2 heures) et `86400` (24 heures), selon les restrictions propres au site de vote.
:::

### Placeholders

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `placeholder-available` | String | `<green>Available ✔` | Le texte formaté en MiniMessage renvoyé par les placeholders de cooldown de site lorsque le joueur **peut** voter sur ce site |
| `placeholder-cooldown` | String | `<red>%cooldown% ✘` | Le texte formaté en MiniMessage renvoyé par les placeholders de cooldown de site lorsque le joueur est encore en cooldown. Le jeton `%cooldown%` est remplacé par le temps restant |

### Configuration de Réinitialisation

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `reset-configuration.day` | Integer | `1` | Le jour du mois où les compteurs de votes sont réinitialisés |
| `reset-configuration.hour` | Integer | `0` | L'heure (0-23) à laquelle la réinitialisation mensuelle a lieu |
| `reset-configuration.minute` | Integer | `0` | La minute (0-59) à laquelle la réinitialisation mensuelle a lieu |
| `reset-configuration.second` | Integer | `0` | La seconde (0-59) à laquelle la réinitialisation mensuelle a lieu |

:::warning
La configuration de réinitialisation contrôle quand **tous les compteurs de votes des joueurs** sont remis à zéro. Par défaut, cela se produit le 1er de chaque mois à minuit. Assurez-vous que vos joueurs sont informés du calendrier de réinitialisation, surtout si les récompenses sont liées aux nombres de votes cumulés.
:::

---

## Fonctionnement

1. Un joueur vote pour le serveur sur un site de vote externe.
2. NuVotifier reçoit le vote et le transmet à zEssentials.
3. Le module Vote incrémente le nombre cumulé de votes du joueur et exécute les commandes de récompense appropriées du palier `rewards-on-vote` correspondant.
4. Le compteur de votes à l'échelle du serveur est incrémenté vers le `vote-party-objective`.
5. Si le joueur est hors ligne et que `enable-offline-vote-message` est `true`, il reçoit une notification lors de sa prochaine connexion.
6. Lorsque le compteur de votes à l'échelle du serveur atteint le `vote-party-objective`, le Vote Party se déclenche :
   - Les `global-commands` sont exécutées une fois.
   - Les `actions` sont exécutées pour chaque joueur en ligne.
   - Les joueurs disposant de la permission bonus reçoivent également les `permission-actions`.
   - Le compteur du Vote Party est remis à zéro.
7. Au jour/heure de réinitialisation configuré chaque mois, tous les compteurs de votes des joueurs sont réinitialisés.

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/vote` | - | `essentials.vote` | Ouvrir le menu de vote ou afficher les informations de vote |
| `/voteparty` | `vp` | `essentials.voteparty` | Afficher la progression actuelle du Vote Party |

Pour la liste complète des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associés

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_voteparty_amount%` | Le nombre actuel de votes vers le prochain Vote Party |
| `%zessentials_voteparty_objective%` | Le nombre total de votes requis pour déclencher un Vote Party |
| `%zessentials_vote_amount%` | Le nombre cumulé de votes du joueur pour la période en cours |
| `%zessentials_vote_site_cooldown_{site}%` | Le statut de cooldown pour un site de vote spécifique. Remplacez `{site}` par le nom du site (ex. `%zessentials_vote_site_cooldown_TopServeurs%`). Renvoie le texte configuré `placeholder-available` ou `placeholder-cooldown` |

Pour la liste complète des placeholders, voir [Placeholders](../placeholders).

---

## Événements Associés

| Événement | Description |
|-----------|-------------|
| `UserVoteEvent` | Déclenché lorsque le vote d'un joueur est reçu et traité. Peut être utilisé pour déclencher une logique de récompense personnalisée |
| `VotePartyEvent` | Déclenché lorsque l'objectif du Vote Party est atteint et que les récompenses sont distribuées |
| `VotePartyStartEvent` | Déclenché lorsque le Vote Party commence le traitement. Peut être annulé ou utilisé pour modifier le comportement avant la distribution des récompenses |

:::tip
Écoutez `VotePartyStartEvent` si vous souhaitez ajouter une logique personnalisée avant la fête, comme des effets de feux d'artifice, des annonces de titre, ou des vérifications conditionnelles avant le lancement du party.
:::

---

## Exemple : Menu de Vote avec Cooldowns par Site

Vous pouvez afficher les statuts de cooldown par site dans un menu de vote en utilisant les placeholders de cooldown de site :

```
ServeurMinecraftVote: %zessentials_vote_site_cooldown_ServeurMinecraftVote%
ServeurPrive:         %zessentials_vote_site_cooldown_ServeurPrive%
ServeursMinecraft:    %zessentials_vote_site_cooldown_ServeursMinecraft%
TopServeurs:          %zessentials_vote_site_cooldown_TopServeurs%
```

Chaque placeholder renvoie soit `<green>Available ✔` soit `<red>2h 15m ✘` (avec le temps de cooldown restant), ce qui permet de montrer facilement aux joueurs quels sites sont prêts pour le vote.
