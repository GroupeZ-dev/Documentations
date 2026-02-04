---
sidebar_position: 1
title: Module AFK
description: Detection d'inactivite (Away From Keyboard) et systeme d'expulsion
---

# Module AFK

**Fichier :** `modules/afk/config.yml`

Le module AFK (Away From Keyboard) detecte automatiquement les joueurs inactifs en fonction de minuteurs d'inactivite configurables et les expulse optionnellement apres une duree definie. Il utilise un **systeme de permissions base sur les priorites**, vous permettant de definir differents seuils AFK et comportements d'expulsion pour differents groupes de joueurs (par exemple, joueurs par defaut, VIP, administrateurs).

---

## Configuration Source

```yaml
enable: true
check-interval: 20 # in ticks
soft-kick: true
soft-kick-message: "<red>You have been kicked for being AFK"
placeholder-afk: "&aV"
placeholder-not-afk: "&cX"
kick-actions:
  - type: message
    messages:
      - "&cYou have been kicked for being AFK"
permissions:
  - priority: 0
    permission: "zessentials.afk.player"
    start-afk-time: 20
    max-afk-time: 60
    kick: true
    message-on-start-afk: "&cYou are now AFK, we have only &f40&c seconds left before being expelled from the server."
    message-on-end-afk: "&aYou are no longer AFK. You have been afk for &f%duration%&a."
  - priority: 1
    permission: "zessentials.afk.vip"
    start-afk-time: 30
    max-afk-time: 120
    message-on-start-afk: "&cYou are now AFK, we have only &f90&c seconds left before being expelled from the server."
    message-on-end-afk: "&aYou are no longer AFK. You have been afk for &f%duration%&a."
    kick: true
  - priority: 2
    permission: "zessentials.afk.admin"
    start-afk-time: 60
    max-afk-time: 300
    kick: true
```

---

## Options

### Options Generales

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou desactiver le module AFK |
| `check-interval` | Integer | `20` | Frequence (en ticks) a laquelle le plugin verifie l'inactivite des joueurs. `20` ticks = 1 seconde |
| `soft-kick` | Boolean | `true` | Si `true`, le joueur est deconnecte en douceur via un paquet de transfert au lieu d'une expulsion brutale. Utile pour les reseaux avec proxy |
| `soft-kick-message` | String | `<red>You have been kicked for being AFK` | Le message au format MiniMessage affiche au joueur lors d'une deconnexion douce |
| `placeholder-afk` | String | `&aV` | Le texte renvoye par le placeholder `%zessentials_user_afk_status%` lorsque le joueur **est** AFK |
| `placeholder-not-afk` | String | `&cX` | Le texte renvoye par le placeholder `%zessentials_user_afk_status%` lorsque le joueur **n'est pas** AFK |

### Actions d'Expulsion

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `kick-actions` | List | *(voir ci-dessus)* | Liste d'actions executees lorsqu'un joueur est expulse pour inactivite. Chaque action a un `type` et des donnees associees |
| `kick-actions[].type` | String | `message` | Le type d'action. `message` envoie des messages au joueur avant son expulsion |
| `kick-actions[].messages` | List of Strings | *(voir ci-dessus)* | Messages envoyes au joueur lorsque l'action d'expulsion est declenchee. Supporte les codes couleur |

### Entrees de Permissions

La liste `permissions` definit le comportement AFK pour differents groupes de joueurs. Chaque entree est verifiee dans l'**ordre de priorite** (le nombre le plus bas = verifie en premier). La premiere permission correspondante determine les parametres AFK du joueur.

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `permissions[].priority` | Integer | - | L'ordre de priorite pour cette entree. Les valeurs plus basses sont verifiees en premier |
| `permissions[].permission` | String | - | Le noeud de permission que le joueur doit posseder pour que cette entree s'applique |
| `permissions[].start-afk-time` | Integer | - | Temps en secondes d'inactivite avant que le joueur soit marque comme AFK |
| `permissions[].max-afk-time` | Integer | - | Temps maximum en secondes pendant lequel un joueur peut rester AFK avant d'etre expulse (si `kick` est `true`) |
| `permissions[].kick` | Boolean | - | Indique s'il faut expulser le joueur apres avoir atteint `max-afk-time` |
| `permissions[].message-on-start-afk` | String | - | Message envoye au joueur lorsqu'il passe en statut AFK. Supporte le placeholder `%duration%` |
| `permissions[].message-on-end-afk` | String | - | Message envoye au joueur lorsqu'il revient de l'etat AFK. Supporte le placeholder `%duration%` |

:::tip
Le placeholder `%duration%` dans `message-on-start-afk` et `message-on-end-afk` est remplace par la duree lisible pendant laquelle le joueur est reste AFK.
:::

:::info
Si une entree de permission ne definit pas `message-on-start-afk` ou `message-on-end-afk` (comme l'entree admin ci-dessus), aucun message ne sera envoye pour cette transition. Le joueur sera tout de meme suivi et expulse si `kick` est `true`.
:::

:::warning
Assurez-vous que chaque joueur correspond a **au plus une** entree de permission. Si un joueur a plusieurs permissions correspondantes, seule la premiere correspondance par priorite est utilisee. Attribuez les permissions avec soin dans votre plugin de permissions pour eviter tout comportement inattendu.
:::

---

## Fonctionnement

1. Le plugin verifie toutes les `check-interval` ticks si chaque joueur en ligne a bouge, tourne sa camera ou interagi avec le jeu.
2. Lorsqu'un joueur est reste inactif pendant `start-afk-time` secondes (selon son entree de permission correspondante), il est marque comme AFK et recoit le message `message-on-start-afk`.
3. Si le joueur reste inactif jusqu'a `max-afk-time` et que `kick` est `true`, les `kick-actions` configurees sont executees et le joueur est deconnecte.
4. Lorsqu'un joueur bouge ou interagit, son statut AFK est reinitialise et il recoit le message `message-on-end-afk`.

---

## Commandes Associees

| Commande | Permission | Description |
|----------|------------|-------------|
| `/afk` | `essentials.afk` | Basculer manuellement votre statut AFK |

Pour la liste complete des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associes

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_is_afk%` | Renvoie `true` si le joueur est actuellement AFK |
| `%zessentials_user_afk_status%` | Renvoie le texte de placeholder configure (`placeholder-afk` ou `placeholder-not-afk`) en fonction de l'etat AFK du joueur |

Pour la liste complete des placeholders, voir [Placeholders](../placeholders).

---

## Exemple : Statut AFK dans la Liste des Joueurs

Vous pouvez utiliser les placeholders AFK pour afficher un indicateur visuel dans votre liste de joueurs ou votre scoreboard :

```yaml
format: "%zessentials_user_afk_status% &7%player_name%"
```

Cela afficherait un "V" vert a cote des joueurs en ligne et un "X" rouge a cote des joueurs AFK (en utilisant les valeurs de placeholder par defaut).
