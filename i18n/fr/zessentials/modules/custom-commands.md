---
title: Module Commandes Personnalisées
description: Créez vos propres commandes pour afficher des liens, des informations, des titres ou exécuter des actions zMenu
---

# Module Commandes Personnalisées

**Fichier :** `modules/customcommands/config.yml`

Le module Commandes Personnalisées vous permet de créer vos propres commandes sans aucun autre plugin. Il est idéal pour les commandes d'information comme `/discord`, `/map`, `/vote`, `/store` ou `/updates` : chaque commande peut afficher des messages dans le chat, la barre d'action, un titre ou une boss bar, proposer des liens cliquables, utiliser des placeholders PlaceholderAPI et exécuter des actions zMenu (son, commande, ouverture d'inventaire, ...).

---

## Configuration Source

```yaml
enable: true

# Every command you create here.
#
# command:     the command, without the slash. Required.
#              A command that already exists in zEssentials will be ignored, check your console on startup.
# aliases:     other names for the command. Optional.
# permission:  the permission needed to use the command. Optional, empty means everyone can use it.
# description: the description of the command, displayed in the tab completion of some server softwares. Optional.
# cooldown:    time in seconds between two uses of the command, 0 to disable.
#              Players with the permission essentials.bypass.cooldown are not affected.
# type:        how the content is displayed:
#              TCHAT   - in the chat, the default value
#              CENTER  - in the chat, but centered
#              ACTION  - in the action bar
#              TITLE   - as a title, uses title, subtitle, start, time and end
#              BOSSBAR - as a boss bar, uses text, color, overlay, flags and duration
#              NONE    - displays nothing, only runs the actions
# messages:    the lines to display, used by TCHAT, CENTER and ACTION.
# actions:     zMenu actions run after the messages, for example a sound or another command.
#
# MiniMessage, legacy colors and PlaceholderAPI placeholders are supported everywhere.
# <click:open_url:'...'> and <hover:show_text:'...'> allow to create clickable links.

commands:

  - command: "discord"
    aliases: [ "dc" ]
    permission: ""
    cooldown: 3
    type: TCHAT
    messages:
      - ""
      - "<primary>Join our Discord server:"
      - "<click:open_url:'https://discord.gg/your-invite'><hover:show_text:'&fClick to open the invitation'><secondary>https://discord.gg/your-invite</secondary></hover></click>"
      - ""
    actions:
      - type: sound
        sound: ENTITY_EXPERIENCE_ORB_PICKUP

  - command: "map"
    aliases: [ "dynmap", "carte" ]
    cooldown: 3
    type: TCHAT
    messages:
      - ""
      - "<primary>Our live map:"
      - "<click:open_url:'https://map.example.com'><hover:show_text:'&fClick to open the map'><secondary>https://map.example.com</secondary></hover></click>"
      - ""

  - command: "updates"
    permission: ""
    type: CENTER
    messages:
      - "&8&m-----------------------------------------"
      - "<primary>Latest updates"
      - ""
      - "&7- &fNew shop at the spawn"
      - "&7- &fThe end is now open"
      - "&8&m-----------------------------------------"

  - command: "playerinfo"
    permission: "essentials.playerinfo"
    type: TCHAT
    messages:
      - "<primary>Balance<secondary>: &f%zessentials_user_formatted_balance_money%"
      - "<primary>Playtime<secondary>: &f%zessentials_user_playtime_formatted%"

# Example with a title
#  - command: "welcome"
#    type: TITLE
#    title: "<primary>Welcome"
#    subtitle: "&fon our server, %player%"
#    start: 100
#    time: 2800
#    end: 100

# Example with a boss bar
#  - command: "event"
#    type: BOSSBAR
#    text: "<primary>An event starts in 5 minutes"
#    color: BLUE
#    overlay: PROGRESS
#    duration: 100

# Example without any message, only actions
#  - command: "shop"
#    type: NONE
#    actions:
#      - type: inventory
#        inventory: my_shop
#        plugin: zMenu
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Active ou désactive le module Commandes Personnalisées |
| `commands` | Liste | *(voir ci-dessus)* | La liste des commandes personnalisées |

### Options d'une commande

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `command` | String | - | **Obligatoire.** Le nom de la commande, sans le slash (un `/` en début est retiré). Il est converti en minuscules et ne peut pas contenir d'espace |
| `aliases` | Liste de String | `[]` | Autres noms de la commande |
| `permission` | String | *(vide)* | Permission nécessaire pour utiliser la commande. Vide ou absente : tout le monde peut l'utiliser |
| `description` | String | - | Description de la commande, affichée dans l'aide / l'autocomplétion de certains logiciels serveur |
| `cooldown` | Integer | `0` | Délai en secondes entre deux utilisations de la commande par un même joueur. `0` désactive le délai. Les joueurs ayant `essentials.bypass.cooldown` ne sont pas concernés (si `enable-cooldown-bypass` vaut `true` dans `config.yml`) |
| `type` | String | `TCHAT` | Mode d'affichage du contenu : `TCHAT`, `CENTER`, `ACTION`, `TITLE`, `BOSSBAR` ou `NONE`. Un type inconnu est remplacé par `TCHAT` avec une erreur dans la console |
| `messages` | Liste de String | `[]` | Les lignes à afficher, utilisées par `TCHAT`, `CENTER` et `ACTION` |
| `actions` | Liste | `[]` | Actions zMenu exécutées après les messages |

### Types d'affichage

| Type | Description | Clés utilisées |
|------|-------------|----------------|
| `TCHAT` | Envoie chaque ligne de `messages` dans le chat (par défaut) | `messages` |
| `CENTER` | Envoie chaque ligne de `messages` centrée dans le chat. Les placeholders sont résolus avant le centrage | `messages` |
| `ACTION` | Assemble `messages` avec des espaces et l'affiche dans la barre d'action | `messages` |
| `TITLE` | Affiche un titre et un sous-titre | `title`, `subtitle`, `start`, `time`, `end` |
| `BOSSBAR` | Affiche une boss bar qui se vide pendant sa durée | `text`, `color`, `overlay`, `flags`, `duration` |
| `NONE` | N'affiche rien, exécute seulement les `actions` | - |

#### Options de `TITLE`

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `title` | String | `""` | Texte du titre |
| `subtitle` | String | `""` | Texte du sous-titre |
| `start` | Integer | `100` | Durée d'apparition, en millisecondes |
| `time` | Integer | `2800` | Durée d'affichage, en millisecondes |
| `end` | Integer | `100` | Durée de disparition, en millisecondes |

#### Options de `BOSSBAR`

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `text` | String | `""` | Texte de la boss bar |
| `color` | String | `WHITE` | Couleur de la barre : `PINK`, `BLUE`, `RED`, `GREEN`, `YELLOW`, `PURPLE`, `WHITE` |
| `overlay` | String | `PROGRESS` | Style de la barre : `PROGRESS`, `NOTCHED_6`, `NOTCHED_10`, `NOTCHED_12`, `NOTCHED_20` |
| `flags` | Liste de String | `[]` | Options facultatives : `DARKEN_SCREEN`, `PLAY_BOSS_MUSIC`, `CREATE_WORLD_FOG` |
| `duration` | Integer | `60` | Durée d'affichage, en **ticks** (20 ticks = 1 seconde) |

Une boss bar avec une couleur, un style ou une option invalide est refusée et la commande n'est pas enregistrée.

---

## Mise en forme du texte

- **MiniMessage** (`<red>`, `<gradient:...>`, `<primary>`, `<secondary>`, ...) et les **couleurs legacy** (`&a`, `&l`, ...) sont supportés.
- Les placeholders **PlaceholderAPI** sont résolus pour le joueur qui exécute la commande, par exemple `%zessentials_user_formatted_balance_money%`. Pour afficher le pseudo du joueur, utilisez `%player_name%` (extension Player de PlaceholderAPI).
- Les **liens cliquables** se créent avec `<click:open_url:'...'>` et `<hover:show_text:'...'>` :

```yaml
messages:
  - "<click:open_url:'https://store.example.com'><hover:show_text:'&fOuvrir la boutique'><secondary>store.example.com</secondary></hover></click>"
```

<CalloutContainer type="info">

<CalloutDescription>
Vous pouvez aussi utiliser `<click:run_command:'/...'>` ou `<click:suggest_command:'/...'>` pour qu'une ligne exécute ou suggère une autre commande.
</CalloutDescription>

</CalloutContainer>

---

## Actions zMenu

`actions` utilise le même format que les actions des inventaires zMenu. Elles sont exécutées **après** les messages, uniquement lorsque la commande est lancée par un joueur (elles sont ignorées depuis la console). Le placeholder `%player%` est disponible dans les actions.

```yaml
  - command: "shop"
    type: NONE
    actions:
      - type: inventory
        inventory: my_shop
        plugin: zMenu
```

Les actions courantes sont `sound`, `message`, `player_command`, `console_command` et `inventory`. Consultez la documentation de zMenu pour la liste complète des actions et de leurs options.

---

## Fonctionnement

1. Au démarrage, chaque entrée de `commands` est validée puis enregistrée comme une véritable commande du serveur, avec ses alias.
2. Une commande qui **existe déjà dans zEssentials** (alias compris) est refusée avec une erreur dans la console : une commande personnalisée ne peut donc jamais remplacer une commande de zEssentials. Un alias en conflit avec une commande de zEssentials est ignoré de la même manière.
3. Une entrée sans `command` valide, ou sans rien à afficher ni action, est ignorée avec une erreur dans la console.
4. Lorsqu'un joueur exécute la commande, la permission et le délai sont vérifiés, le contenu est affiché, puis les actions sont exécutées.
5. Lors d'un `/zessentials reload` (alias `/ess rl`), les commandes personnalisées sont désenregistrées puis réenregistrées depuis la configuration : les nouvelles commandes sont ajoutées, celles modifiées sont mises à jour et celles supprimées disparaissent, sans aucun doublon. La liste des commandes des joueurs connectés est rafraîchie, l'autocomplétion est donc immédiatement à jour.

<CalloutContainer type="info">

<CalloutDescription>
Les commandes personnalisées ne se configurent pas dans `commands.yml` : tout est défini dans `modules/customcommands/config.yml`.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutDescription>
Seules les commandes de zEssentials sont protégées. Si une commande personnalisée porte le même nom qu'une commande d'un autre plugin, renommez-la ou utilisez un alias pour éviter les conflits.
</CalloutDescription>

</CalloutContainer>

---

## Permissions

| Permission | Description |
|------------|-------------|
| `permission` de chaque commande | Nécessaire pour utiliser cette commande (si elle est définie) |
| `essentials.bypass.cooldown` | Ignore le `cooldown` de toutes les commandes personnalisées |

---

## Exemples

### Lien de boutique avec un son

```yaml
commands:
  - command: "store"
    aliases: [ "shop", "boutique" ]
    description: "Ouvre le lien de la boutique"
    cooldown: 5
    type: TCHAT
    messages:
      - "<primary>Soutenez le serveur sur notre boutique :"
      - "<click:open_url:'https://store.example.com'><hover:show_text:'&fCliquez pour ouvrir la boutique'><secondary>https://store.example.com</secondary></hover></click>"
    actions:
      - type: sound
        sound: ENTITY_EXPERIENCE_ORB_PICKUP
```

### Annonce en titre

```yaml
commands:
  - command: "bienvenue"
    type: TITLE
    title: "<primary>Bienvenue"
    subtitle: "&fsur notre serveur, %player_name%"
    start: 100
    time: 2800
    end: 100
```

### Boss bar réservée par permission

```yaml
commands:
  - command: "event"
    permission: "essentials.custom.event"
    type: BOSSBAR
    text: "<primary>Un événement commence dans 5 minutes"
    color: BLUE
    overlay: PROGRESS
    duration: 100
```
