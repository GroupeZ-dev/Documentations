---
sidebar_position: 3
title: Actions
description: Reference complete de tous les types d'actions dans zMenu
---

# Actions

Les actions sont des commandes executees lorsqu'un joueur interagit avec un bouton. zMenu fournit plus de 28 types d'actions pour divers usages.

## Utilisation de base

```yaml
items:
  mon-bouton:
    slot: 0
    item:
      material: DIAMOND
    actions:
      - type: message
        messages:
          - "&aBonjour, %player% !"
      - type: sound
        sound: UI_BUTTON_CLICK
```

## Actions de message

### message

Envoyer un message au joueur.

```yaml
- type: message
  messages:
    - "&aLigne 1"
    - "&bLigne 2"
  minimessage: true  # Optionnel : Utiliser le format MiniMessage
```

---

### messages

Alias pour `message`.

```yaml
- type: messages
  messages:
    - "&aPlusieurs lignes"
    - "&bDe texte"
```

---

### message-to

Envoyer un message a un joueur specifique.

```yaml
- type: message-to
  player: "Notch"
  messages:
    - "&aBonjour de la part de %player% !"
```

---

### broadcast

Envoyer un message a tous les joueurs en ligne.

```yaml
- type: broadcast
  messages:
    - "&6[Annonce] &f%player% a achete un item special !"
```

---

### action-bar

Afficher un message dans la barre d'action.

```yaml
- type: action-bar
  message: "&aBienvenue dans la boutique !"
```

---

### title

Afficher un titre et sous-titre.

```yaml
- type: title
  title: "&6&lBienvenue !"
  subtitle: "&7Profitez de votre sejour"
  fadeIn: 20      # Ticks
  stay: 60        # Ticks
  fadeOut: 20     # Ticks
```

---

### toast

Afficher une notification toast (popup de succes).

```yaml
- type: toast
  icon: DIAMOND
  message: "&aSucces debloque !"
  frame: TASK  # TASK, GOAL ou CHALLENGE
```

## Actions de son

### sound

Jouer un son au joueur.

```yaml
- type: sound
  sound: ENTITY_EXPERIENCE_ORB_PICKUP
  pitch: 1.0    # 0.5 a 2.0
  volume: 1.0   # Distance
  category: MASTER  # Categorie de son optionnelle
```

**Sons courants :**
- `UI_BUTTON_CLICK`
- `ENTITY_EXPERIENCE_ORB_PICKUP`
- `ENTITY_PLAYER_LEVELUP`
- `ENTITY_VILLAGER_YES`
- `ENTITY_VILLAGER_NO`
- `BLOCK_NOTE_BLOCK_PLING`
- `BLOCK_CHEST_OPEN`
- `BLOCK_CHEST_CLOSE`

---

### broadcast-sound

Jouer un son a tous les joueurs en ligne.

```yaml
- type: broadcast-sound
  sound: ENTITY_ENDER_DRAGON_DEATH
  pitch: 1.0
  volume: 1.0
```

## Actions de commande

### player-command

Executer une commande en tant que joueur.

```yaml
- type: player-command
  commands:
    - "spawn"
    - "kit starter"
```

---

### player-command-as-op

Executer une commande en tant que joueur avec les permissions OP.

```yaml
- type: player-command-as-op
  commands:
    - "gamemode creative"
```

:::warning
Utilisez avec precaution ! Cela donne au joueur un acces temporaire de niveau OP.
:::

---

### console-command

Executer une commande depuis la console.

```yaml
- type: console-command
  commands:
    - "give %player% diamond 64"
    - "eco give %player% 1000"
```

---

### player-chat

Forcer le joueur a envoyer un message dans le chat.

```yaml
- type: player-chat
  messages:
    - "Bonjour tout le monde !"
```

---

### random-player-command

:::info zMenu+
Cette action necessite [zMenu+](https://minecraft-music-inventory.com/resources/zmenu.music.331).
:::

Executer une selection aleatoire de commandes en tant que joueur a partir d'une liste. Les commandes sont selectionnees **sans remise** (pas de doublons dans une seule execution).

```yaml
- type: random_player_command
  commands:
    - "say J'ai eu l'option 1 !"
    - "say J'ai eu l'option 2 !"
    - "say J'ai eu l'option 3 !"
    - "say J'ai eu l'option 4 !"
  amount: 1               # Nombre de commandes a executer aleatoirement (defaut : 1)
  command-in-chat: false   # Optionnel : executer via le chat au lieu d'un dispatch (defaut : false)
```

**Options :**

| Option | Type | Defaut | Description |
|--------|------|--------|-------------|
| `commands` | Liste | Requis | Liste des commandes parmi lesquelles choisir aleatoirement |
| `amount` | Entier | `1` | Nombre de commandes aleatoires a executer |
| `command-in-chat` | Booleen | `false` | Si `true`, envoie via `player.chat()` ; si `false`, dispatch en tant que commande |

**Alias :** `random_player_command`, `random_player_commands`, `random-player-command`, `random-player-commands`

---

### random-console-command

:::info zMenu+
Cette action necessite [zMenu+](https://minecraft-music-inventory.com/resources/zmenu.music.331).
:::

Executer une selection aleatoire de commandes console a partir d'une liste. Les commandes sont selectionnees **sans remise** (pas de doublons dans une seule execution). Supporte le placeholder `%player%`.

```yaml
- type: random_console_command
  commands:
    - "give %player% diamond 1"
    - "give %player% emerald 1"
    - "give %player% gold_ingot 1"
    - "give %player% iron_ingot 1"
  amount: 2    # Executer 2 commandes aleatoires de la liste
```

**Options :**

| Option | Type | Defaut | Description |
|--------|------|--------|-------------|
| `commands` | Liste | Requis | Liste des commandes console parmi lesquelles choisir aleatoirement |
| `amount` | Entier | `1` | Nombre de commandes aleatoires a executer |

**Alias :** `random_console_command`, `random_console_commands`, `random-console-command`, `random-console-commands`, `random-command`, `random-commands`

## Actions d'inventaire

### inventory

Ouvrir un autre inventaire.

```yaml
- type: inventory
  inventory: "shop"
  page: 1          # Optionnel : page specifique
  arguments:       # Optionnel : passer des arguments
    - "arg1"
```

---

### close

Fermer l'inventaire actuel.

```yaml
- type: close
```

---

### back

Retourner a l'inventaire precedent.

```yaml
- type: back
```

---

### refresh

Rafraichir le bouton actuel.

```yaml
- type: refresh
```

---

### refresh-inventory

Rafraichir l'inventaire entier (redessiner tous les boutons).

```yaml
- type: refresh-inventory
```

## Actions joueur

### teleport

Teleporter le joueur a des coordonnees.

```yaml
- type: teleport
  world: "world"
  x: 0
  y: 100
  z: 0
  yaw: 0       # Optionnel
  pitch: 0     # Optionnel
```

---

### connect

Connecter le joueur a un autre serveur (BungeeCord/Velocity).

```yaml
- type: connect
  server: "lobby"
```

## Actions de donnees

### data

Modifier les valeurs de donnees joueur.

```yaml
- type: data
  action: SET       # SET, ADD, SUBTRACT, MULTIPLY, DIVIDE, REMOVE
  key: "coins"
  value: "100"
  math: true        # Optionnel : activer les expressions mathematiques
```

**Actions :**

| Action | Description | Exemple |
|--------|-------------|---------|
| `SET` | Definir a une valeur specifique | `value: "100"` |
| `ADD` | Ajouter a la valeur actuelle | `value: "50"` |
| `SUBTRACT` | Soustraire de la valeur actuelle | `value: "25"` |
| `MULTIPLY` | Multiplier la valeur actuelle | `value: "2"` |
| `DIVIDE` | Diviser la valeur actuelle | `value: "2"` |
| `REMOVE` | Supprimer entierement la cle | - |

**Expressions mathematiques :**
```yaml
- type: data
  action: ADD
  key: "total"
  value: "%zmenu_player_value_base%*1.5"
  math: true
```

## Actions d'economie

### currency-deposit

Ajouter de l'argent au solde du joueur.

```yaml
- type: currency-deposit
  amount: 100
  reason: "Recompense"    # Optionnel
```

---

### currency-withdraw

Retirer de l'argent du solde du joueur.

```yaml
- type: currency-withdraw
  amount: 50
  reason: "Achat"  # Optionnel
```

## Action de livre

### book

Ouvrir un livre ecrit pour le joueur.

```yaml
- type: book
  author: "Serveur"
  title: "&6Livre de bienvenue"
  pages:
    - |
      &6Bienvenue !

      &7Ceci est la page 1
      de notre livre de bienvenue.
    - |
      &6Page 2

      &7Plus de contenu ici.
```

## Action de dialogue

### dialog

Ouvrir un dialogue (Paper 1.20.5+ avec PacketEvents).

```yaml
- type: dialog
  dialog: "confirmation"
```

## Actions Discord

### discord

Envoyer un message a un webhook Discord.

```yaml
- type: discord
  webhook: "https://discord.com/api/webhooks/..."
  content: "%player% a fait un achat !"
  username: "Bot Boutique"          # Optionnel
  avatar_url: "https://..."     # Optionnel
```

---

### discord-component

Envoyer un message Discord avec boutons/composants.

```yaml
- type: discord-component
  webhook: "https://discord.com/api/webhooks/..."
  embeds:
    - title: "Nouvel achat"
      description: "%player% a achete un item"
      color: "#00FF00"
```

## Actions d'integration

### luckperm-set

Modifier les permissions/groupes LuckPerms.

```yaml
- type: luckperm-set
  group: "vip"
  duration: 2592000  # Secondes (30 jours)
```

---

### shopkeeper

Interagir avec le plugin Shopkeepers.

```yaml
- type: shopkeeper
  name: "nom_boutique"
```

## Exemples complets

### Achat avec retour

```yaml
items:
  acheter-item:
    slot: 13
    item:
      material: DIAMOND_SWORD
      name: "&6&lEpee en diamant"
      lore:
        - "&7Prix : &a500$"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%vault_eco_balance%"
          compare: ">="
          number: 500
          deny:
            - type: message
              messages:
                - "&cVous avez besoin de 500$ !"
            - type: sound
              sound: ENTITY_VILLAGER_NO
      success:
        - type: currency-withdraw
          amount: 500
        - type: console-command
          commands:
            - "give %player% diamond_sword 1"
        - type: message
          messages:
            - "&aAchat reussi !"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
        - type: close
```

### Parametre a bascule avec donnees

```yaml
items:
  bascule:
    slot: 22
    type: SWITCH
    placeholder: "%zmenu_player_value_setting%"
    buttons:
      "on":
        item:
          material: LIME_DYE
          name: "&a&lParametre : ON"
        actions:
          - type: data
            action: SET
            key: "setting"
            value: "off"
          - type: message
            messages:
              - "&7Parametre desactive"
          - type: sound
            sound: UI_BUTTON_CLICK
          - type: refresh
      "off":
        item:
          material: GRAY_DYE
          name: "&7&lParametre : OFF"
        actions:
          - type: data
            action: SET
            key: "setting"
            value: "on"
          - type: message
            messages:
              - "&7Parametre active"
          - type: sound
            sound: UI_BUTTON_CLICK
          - type: refresh
```

### Bouton multi-actions

```yaml
items:
  recompense:
    slot: 13
    item:
      material: CHEST
      name: "&e&lRecompense quotidienne"
    actions:
      - type: console-command
        commands:
          - "give %player% diamond 5"
      - type: currency-deposit
        amount: 1000
      - type: data
        action: SET
        key: "last_reward"
        value: "%zmenu_time_unix_timestamp%"
      - type: title
        title: "&6&lRecompense reclamee !"
        subtitle: "&75 Diamants + 1000$"
      - type: sound
        sound: ENTITY_PLAYER_LEVELUP
      - type: broadcast
        messages:
          - "&6%player% &7a reclame sa recompense quotidienne !"
      - type: close
```

## Ordre des actions

Les actions s'executent dans l'ordre ou elles sont listees. Si vous devez fermer l'inventaire apres une teleportation, mettez `close` avant `teleport` :

```yaml
actions:
  - type: close
  - type: teleport
    world: "world"
    x: 0
    y: 100
    z: 0
```

## Utiliser les actions dans les exigences

Les actions peuvent aussi etre utilisees dans les blocs `deny` et `success` des exigences :

```yaml
click-requirement:
  requirements:
    - type: permission
      permission: "server.vip"
      deny:
        - type: message
          messages:
            - "&cVous avez besoin du VIP !"
  success:
    - type: message
      messages:
        - "&aAcces accorde !"
```

## Tableau de reference rapide

| Action | Description |
|--------|-------------|
| `message` | Envoyer un message au joueur |
| `broadcast` | Envoyer un message a tous |
| `action-bar` | Afficher la barre d'action |
| `title` | Afficher titre/sous-titre |
| `toast` | Afficher un toast de succes |
| `sound` | Jouer un son |
| `player-command` | Executer une commande en tant que joueur |
| `console-command` | Executer une commande en tant que console |
| `random-player-command` | Executer des commandes aleatoires en tant que joueur (zMenu+) |
| `random-console-command` | Executer des commandes console aleatoires (zMenu+) |
| `inventory` | Ouvrir un inventaire |
| `close` | Fermer l'inventaire |
| `back` | Revenir en arriere |
| `refresh` | Rafraichir le bouton |
| `teleport` | Teleporter le joueur |
| `connect` | Changer de serveur |
| `data` | Modifier les donnees joueur |
| `currency-deposit` | Ajouter de l'argent |
| `currency-withdraw` | Retirer de l'argent |

## Prochaines etapes

- Apprenez les [Donnees joueur](../player-data) pour stocker des valeurs
- Voir les [Exigences](./button#exigences) pour les actions conditionnelles
- Creez des [Patterns](../patterns) avec des actions par defaut
