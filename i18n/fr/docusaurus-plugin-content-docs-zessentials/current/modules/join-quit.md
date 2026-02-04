---
sidebar_position: 9
title: Module Connexion & Déconnexion
description: Messages de connexion, déconnexion et première connexion personnalisables avec prise en charge du MOTD
---

# Module Connexion & Déconnexion

**Fichier :** `modules/join_quit/config.yml`

Le module Connexion & Déconnexion gère les messages affichés lorsque les joueurs se connectent, se déconnectent ou rejoignent le serveur pour la première fois. Il prend en charge des messages de connexion et de déconnexion entièrement personnalisables, une diffusion de première connexion et un Message du Jour (MOTD) configurable affiché aux joueurs lors de leur connexion. La fonctionnalité de connexion et déconnexion silencieuse permet aux membres du staff de se connecter et se déconnecter sans déclencher de messages publics.

---

## Configuration Source

```yaml
enable: true
allow-silent-join-quit: false
custom-join-message: CUSTOM  # DISABLE, DEFAULT, CUSTOM
custom-quit-message: CUSTOM
allow-first-join-broadcast: true
allow-first-join-motd: true
first-join-motd-ticks: 20
allow-join-motd: false
join-motd-ticks: 20
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Connexion & Déconnexion |
| `allow-silent-join-quit` | Boolean | `false` | Lorsque `true`, les joueurs ayant la permission `essentials.silentjoin` ou `essentials.silentquit` peuvent se connecter ou se déconnecter sans déclencher de message public |
| `custom-join-message` | String | `CUSTOM` | Contrôle le comportement du message de connexion. `DISABLE` supprime entièrement les messages de connexion, `DEFAULT` utilise le message vanilla de Minecraft, `CUSTOM` utilise le message défini dans `messages.yml` |
| `custom-quit-message` | String | `CUSTOM` | Contrôle le comportement du message de déconnexion. `DISABLE` supprime entièrement les messages de déconnexion, `DEFAULT` utilise le message vanilla de Minecraft, `CUSTOM` utilise le message défini dans `messages.yml` |
| `allow-first-join-broadcast` | Boolean | `true` | Lorsque `true`, un message de diffusion spécial est envoyé à tous les joueurs en ligne lorsqu'un nouveau joueur se connecte pour la première fois |
| `allow-first-join-motd` | Boolean | `true` | Lorsque `true`, les nouveaux joueurs reçoivent un MOTD dédié à la première connexion lors de leur connexion initiale |
| `first-join-motd-ticks` | Integer | `20` | Délai en ticks avant que le MOTD de première connexion ne soit affiché au nouveau joueur. `20` ticks = 1 seconde |
| `allow-join-motd` | Boolean | `false` | Lorsque `true`, tous les joueurs reçoivent un message MOTD à chaque connexion au serveur |
| `join-motd-ticks` | Integer | `20` | Délai en ticks avant que le MOTD de connexion ne soit affiché au joueur. `20` ticks = 1 seconde |

:::info
Le contenu réel des messages (messages de connexion, messages de déconnexion, diffusions de première connexion et lignes du MOTD) est configuré dans le fichier `messages.yml`, et non dans cette configuration de module. Ce fichier de configuration contrôle uniquement le comportement et les bascules de chaque fonctionnalité.
:::

---

## Modes de Message

Les options `custom-join-message` et `custom-quit-message` acceptent trois valeurs possibles :

| Valeur | Description |
|--------|-------------|
| `DISABLE` | Supprime complètement le message de connexion ou de déconnexion. Aucun message n'est diffusé aux joueurs |
| `DEFAULT` | Utilise le message vanilla de connexion/déconnexion de Minecraft fourni par le serveur |
| `CUSTOM` | Utilise le message personnalisé défini dans `messages.yml`. Prend en charge les placeholders et les codes couleur |

---

## Placeholders Disponibles dans les Messages

Les placeholders suivants peuvent être utilisés dans les messages de connexion, déconnexion et première connexion configurés dans `messages.yml` :

| Placeholder | Description |
|-------------|-------------|
| `%player%` | Le nom du joueur |
| `%displayName%` | Le nom d'affichage du joueur (peut inclure des préfixes, suffixes ou pseudonymes) |
| `%totalUser%` | Le nombre total de joueurs uniques ayant rejoint le serveur |
| `%totalUserFormat%` | Le nombre total de joueurs uniques formaté avec des séparateurs de nombres (par exemple, `1,234`) |

:::tip
Ces placeholders sont spécifiques aux messages du module Connexion & Déconnexion. Vous pouvez également utiliser n'importe quel placeholder PlaceholderAPI dans vos messages si PlaceholderAPI est installé.
:::

---

## Permissions

| Permission | Description |
|------------|-------------|
| `essentials.silentjoin` | Permet au joueur de se connecter sans déclencher de message de connexion. Effectif uniquement lorsque `allow-silent-join-quit` est `true` |
| `essentials.silentquit` | Permet au joueur de se déconnecter sans déclencher de message de déconnexion. Effectif uniquement lorsque `allow-silent-join-quit` est `true` |

:::warning
Les permissions `essentials.silentjoin` et `essentials.silentquit` n'ont aucun effet sauf si `allow-silent-join-quit` est défini sur `true` dans la configuration du module.
:::

---

## Fonctionnement

1. Lorsqu'un joueur se connecte, le module vérifie s'il s'agit de sa première connexion.
2. S'il s'agit d'une première connexion et que `allow-first-join-broadcast` est `true`, un message de diffusion de première connexion est envoyé à tous les joueurs en ligne.
3. S'il s'agit d'une première connexion et que `allow-first-join-motd` est `true`, le MOTD de première connexion est envoyé au nouveau joueur après `first-join-motd-ticks` ticks.
4. Si `custom-join-message` est `CUSTOM`, le message de connexion configuré dans `messages.yml` est diffusé. Si `DISABLE`, aucun message n'est envoyé. Si `DEFAULT`, le message vanilla est utilisé.
5. Si `allow-join-motd` est `true`, le MOTD régulier est envoyé au joueur après `join-motd-ticks` ticks.
6. Lorsqu'un joueur se déconnecte, le message de déconnexion est géré selon le paramètre `custom-quit-message`.
7. Si le joueur possède la permission `essentials.silentjoin` ou `essentials.silentquit` et que `allow-silent-join-quit` est `true`, le message correspondant est supprimé.

---

## Commandes Associées

| Commande | Permission | Description |
|----------|------------|-------------|
| `/rules` | `essentials.rules` | Afficher les règles du serveur (souvent affichées avec le MOTD) |

Pour la liste complète des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associés

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_last_first_join_player%` | Nom du joueur le plus récent s'étant connecté pour la première fois |

Pour la liste complète des placeholders, voir [Placeholders](../placeholders).

---

## Exemple : Configuration de Première Connexion Personnalisée

Pour créer une expérience accueillante pour les nouveaux joueurs, activez à la fois la diffusion de première connexion et le MOTD de première connexion :

```yaml
allow-first-join-broadcast: true
allow-first-join-motd: true
first-join-motd-ticks: 40
```

Ensuite, configurez le contenu des messages dans votre fichier `messages.yml`. Le MOTD sera affiché 2 secondes après la connexion du joueur (40 ticks), laissant le temps au monde de se charger avant d'afficher le message de bienvenue.
