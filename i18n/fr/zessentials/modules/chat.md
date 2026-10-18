---
title: Module Chat
description: Formatage complet du chat, modération, placeholders et fonctionnalités interactives
---

# Module Chat

**Fichier :** `modules/chat/config.yml`

Le module Chat est l'un des modules les plus complets de zEssentials. Il gère tous les aspects du chat du serveur : formatage, outils de modération, anti-spam, mentions (pings), chat local, affichage d'objets, liens et commandes cliquables, règles personnalisées, boutons d'action pour les modérateurs et stockage de l'historique du chat. Le module utilise un **système de formats basé sur des priorités et des permissions** ainsi que MiniMessage pour la mise en forme.

<CalloutContainer type="info">

<CalloutTitle>Paper uniquement</CalloutTitle>

<CalloutDescription>
Le format du chat est appliqué via l'événement `AsyncChatEvent` de Paper. Mettez `enable-chat-format: false` si vous souhaitez qu'un autre plugin de chat gère le formatage.
</CalloutDescription>

</CalloutContainer>

---

## Permissions de Contournement

Les permissions suivantes permettent aux joueurs de contourner certaines restrictions du chat :

| Permission | Description |
|------------|-------------|
| `essentials.chat.bypass.alphanumeric` | Contourne la vérification des caractères autorisés (`alphanumeric-regex`) |
| `essentials.chat.bypass.dynamic.cooldown` | Contourne le délai dynamique du chat (anti-spam) |
| `essentials.chat.bypass.link` | Contourne le filtre des liens (`link-regex`) |
| `essentials.chat.bypass.same.message` | Contourne la détection des messages identiques |
| `essentials.chat.bypass.caps` | Contourne la détection des majuscules |
| `essentials.chat.bypass.flood` | Contourne la vérification anti-flood |
| `essentials.chat.bypass.disable` | Permet de parler lorsque le chat est désactivé avec `/chatdisable` |
| `essentials.chat.moderator` | Affiche le bouton `moderator-action` devant chaque message |

### Permissions de Formatage du Chat

Ces permissions définissent les balises MiniMessage qu'un joueur peut utiliser dans le chat :

| Permission | Balises autorisées |
|------------|--------------------|
| `essentials.chat.color` | Couleurs (par exemple `<red>`, `<#ff0000>`) |
| `essentials.chat.decoration` | Décorations (`<bold>`, `<italic>`, `<underlined>`, `<strikethrough>`, `<obfuscated>`) |
| `essentials.chat.rainbow` | Arc-en-ciel (`<rainbow>`) |
| `essentials.chat.gradient` | Dégradé (`<gradient:couleur1:couleur2>`) |
| `essentials.chat.click` | Événements de clic (`<click:action:valeur>`) |
| `essentials.chat.hover` | Événements de survol (`<hover:show_text:valeur>`) |
| `essentials.chat.newline` | Retour à la ligne (`<newline>`) |
| `essentials.chat.reset` | Réinitialisation (`<reset>`) |
| `essentials.chat.font` | Police (`<font:nom>`) |
| `essentials.chat.keybind` | Touche (`<key:...>`) |
| `essentials.chat.link` | Transforme automatiquement les liens du joueur en liens cliquables (`link-transform`). Le joueur doit aussi avoir `essentials.chat.click` |

---

## Configuration Source

Le fichier par défaut (les commentaires de permissions en haut du fichier et certains commentaires répétés sont omis ici) :

```yaml
enable: true

# Enables verification of authorized characters in chat
enable-alphanumeric-regex: true

# Check whether the message contains links
enable-link-regex: true

# Allows to apply a dynamic cooldown between each message of a player, the more the player will spam the more he will have a great cooldown
enable-chat-dynamic-cooldown: true

# Check player tries to put the same message multiple times
enable-same-message-cancel: true

# Enables local chat where messages are only visible to nearby players unless prefixed with '!'
enable-local-chat: false

# Maximum distance in blocks for local chat messages
local-chat-distance: 100

# Apply a format to the chat, disabled on if you want another plugin to handle this
enable-chat-format: true

# Turns links into clickable links if the player has the essentials.chat.link permission, the player must also have permission: essentials.chat.click
# check out link-transform
enable-link-transform: true

# Stores all player messages in the database. Works only with MYSQL storage
# Also provides access to all player messages with the /chathistory command
enable-chat-messages: true

# Regex to check allowed characters
# You can test the regex here before changing the default one: https://regex101.com/
alphanumeric-regex: '^[a-zA-Z0-9_.?!^¨%ù*&é"#''{(\[-|èêë`\\çà)\]=}ûî+<>:²€$/\\-\\,-â@;ô ]+$'

# Regex to check links
# You can test the regex here before changing the default one: https://regex101.com/
link-regex: '[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)'

# Regex to check pub message
pub-regex: '.*(&[0-9a-fk-or]|#[0-9a-fA-F]{6}|%[^%]+%|<[^>]+>).*'

# Allows to activate the flood check in the message, if the player will write messages with too many characters in capital letter, the message will be blocked
enable-caps: true

# Maximum character percentage per sentence, between 0 and 1
caps-threshold: 0.5

# Enable anti-flood regex
enable-anti-flood: true

# Allows players to avoid writing the same characters several times in a row, here 4 times. Thus avoid messages like "AHHHHHHHHHHHH"
anti-flood-regex: "(.)\\1{3,}"

# Set the number of messages and cooldown between each message in milliseconds
# The faster the player will send message the faster the cooldown between each message will be
chat-cooldowns:
  - messages: 2
    cooldown: 1500 # max 1.5s
  - messages: 4
    cooldown: 12000 # max 12s
  - messages: 10
    cooldown: 60000 # max 60s

# Number of messages that will be in memory to be analyzed during the cooldown
chat-cooldown-max: 50

# Chat format with permissions
#
# Use https://webui.advntr.dev/ to create your format quickly
#
# Available placeholder (you can use PlaceholderAPI here):
# %player% - Player's name
# %displayName% - Player's display name
# <message> - Player's message, Attention for message it's not %message% !
# %moderator_action% - Moderation action, see moderator-action
chat-formats:
  - priority: 1
    permission: "essentials.chat.format.vip"
    format: "<hover:show_text:'&cReport this message'><click:run_command:'/report %player% chat'><#ff0000>⚠</click></hover> %moderator_action%<#ffffff><hover:show_text:'#ffd353ℹ Informations#3f3f3f:<newline>#3f3f3f• &7Money#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_money%<newline>#3f3f3f• &7Coins#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_coins%<newline><newline>&f➥ &7Click for more information'>%player%</hover> <#333333>» <#ffff6b><click:suggest_command:'/msg %player% '><hover:show_text:'&fSend a private message'><message></hover></click>"
  - priority: 2
    permission: "essentials.chat.format.admin"
    format: "<#ffffff><hover:show_text:'#ffd353ℹ Informations#3f3f3f:<newline>#3f3f3f• &7Money#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_money%<newline>#3f3f3f• &7Coins#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_coins%<newline><newline>&f➥ &7Click for more information'>%player%</hover> <#333333>» <#ff4444><click:suggest_command:'/msg %player% '><hover:show_text:'&fSend a private message'><message></hover></click>"

# Default chat format
default-chat-format: "<hover:show_text:'&cReport this message'><click:run_command:'/report %player% chat'><#ff0000>⚠</click></hover> %moderator_action%<#ffffff><hover:show_text:'#ffd353ℹ Informations#3f3f3f:<newline>#3f3f3f• &7Money#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_money%<newline>#3f3f3f• &7Coins#3f3f3f: #4cd5ff%zessentials_user_formatted_balance_coins%<newline><newline>&f➥ &7Click for more information'>%player%</hover> <#333333>» <gray><click:suggest_command:'/msg %player% '><hover:show_text:'&fSend a private message'><message></hover></click>"

# Allows players who have the essentials.chat.moderator permission to have a different view from other players.
# By default, moderators will have a button to punish the player
#
# Available placeholder (you can use PlaceholderAPI here):
# %player% - Player's name
moderator-action: "<hover:show_text:'<#ff8888>Punish the player'><click:run_command:'/sc %player%'><#ff8888>✗</click></hover> "

# Turns a link into a clickable link by players
link-transform: "<hover:show_text:'&fOpen the link'><click:open_url:'%url%'>%url%</click></hover>"

# Date format for /chathistory
date-format: "yyyy-MM-dd HH:mm:ss"

# Chat ping

# To ping a player you must use the prefix @<nickname>
enable-ping: true

# Allows to activate the sound during a player ping, the player can disable the sound with the command /pingsound
enable-player-ping-sound: true

# Sound played when player is pinged
player-ping-sound: BLOCK_NOTE_BLOCK_PLING

# Ping sound volume
player-ping-sound-volume: 0.8

# Ping sound pitch
player-ping-sound-pitch: 1

# Color of ping displayed to the player
player-ping-color: "<red>%name%</red><red>"

# Color of ping displayed for other players
player-ping-color-other: "<white>%name%</white>"

# Placeholders

chat-placeholders:
  - name: "ping" # Placeholder name, the name must consist only of lowercase letters, numbers 0 to 9 and characters _ and -
    regex: "(?i)\\[ping\\]" # [ping] placeholder
    result: "%player_ping% ms" # PlaceholderAPI extension Player: https://api.extendedclip.com/expansions/player/
    permission: "zessentials.chat.placeholder.ping" # You must define a permission
  - name: "block"
    regex: "(?i)\\[blocks\\]" # [blocks] placeholder
    result: "&a%statistic_mine_block% &fblocks" # PlaceholderAPI extension Statistic: https://api.extendedclip.com/expansions/statistic/
    permission: "zessentials.chat.placeholder.block"
  - name: "money"
    regex: "(?i)\\[money\\]" # [money] placeholder
    result: "%zessentials_user_formatted_balance_money%"
    permission: "zessentials.chat.placeholder.money"
  - name: "coins"
    regex: "(?i)\\[coins\\]" # [coins] placeholder
    result: "%zessentials_user_formatted_balance_coins%"
    permission: "zessentials.chat.placeholder.coins"
  - name: "playtime"
    regex: "(?i)\\[playtime\\]" # [playtime] placeholder
    result: "&fI've played &7%zessentials_user_playtime_formatted%"
    permission: "zessentials.chat.placeholder.playtime"
  - name: "pos"
    regex: "(?i)\\[pos\\]" # [pos] placeholder
    result: "&bWorld: &f%player_world% &eX: &f%player_x% &eY: &f%player_y% &eZ: &f%player_z%"
    permission: "zessentials.chat.placeholder.pos"

# Displays the item in your hand
item-placeholder:
  enable: true
  regex: "(?i)\\[item\\]|\\[i\\]" # [item] or [i] placeholder
  result: "&bx<amount> &f<item>"
  permission: "zessentials.chat.placeholder.item" # You must define a permission
  # Regex used to ensure item names do not contain forbidden characters when displayed in chat
  item-name-regex: "^[a-zA-Z0-9_.?!^¨%ù*&é\"#'{(\\[-|èêë`\\\\çà)\\]=}ûî+<>:²€$/\\-\\,-â@;ô ]+$"

# Allows to replace a text to transform it into clickable text to suggest a command
# Message: "Please open the auction house with the ./zah" will be transformed into "Please open the auction house with the /zah" with /zah that will be clickable
# If you want to use a command in a sentence, you must do this: ./<your command> [<aliases>].
# Example: "Please use ./zah. to open the auction house"
command-placeholder: # ./<command>. placeholder
  enable: true
  result: "<hover:show_text:'<yellow>Try this command'><click:suggest_command:'/%fixed_command%'><yellow>/%command%</yellow></click></hover>"
  permission: "zessentials.chat.placeholder.command" # You must define a permission

  # Replace check all messages sent to players and replace the command if it exists
  # You must use the ProtocolLib plugin
  # You must be on a paper basis, using spigot will not work
  enable-replace-all-message: false

# Allows to define custom rules with regex
custom-rules:
  - regex: "(can|may|would you like if) i (have|be|become|get|has) (op|admin|mod|builder)"
    permission: "essentials.chat.bypass.custom.rules"
    message: "&cCurrently, we are not looking for new staff."
  - regex: "(do|are) you (need|wish|looking for) (any|some|one|good) (op|ops|operators|admins|mods|builders|new people|ateam)"
    permission: "essentials.chat.bypass.custom.rules"
    message: "&cCurrently, we are not looking for new staff."
  - regex: "((admin|op|team|server|owner) (is|are)) + *(dick|cock|duck|noob)"
    permission: "essentials.chat.bypass.custom.rules"
    message: "&cYet so much hate, we are only love"
  - regex: "this server (is (bad|crappy|shitty)|suck)"
    permission: "essentials.chat.bypass.custom.rules"
    message: "&cNo, the server is great, you’re the bad one!"
```

<CalloutContainer type="info">

<CalloutTitle>Option supprimée</CalloutTitle>

<CalloutDescription>
Les options `enable-itemadders-font-regex` / `itemadders-font-regex` ont été supprimées en 1.0.3.8 : la fonctionnalité n'a jamais été branchée et ces options n'avaient aucun effet. Vous pouvez les retirer de votre fichier existant sans risque.
</CalloutDescription>

</CalloutContainer>

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Active ou désactive entièrement le module Chat |
| `enable-chat-format` | Boolean | `true` | Applique le format de chat de zEssentials (`chat-formats` / `default-chat-format`). Désactivez-le si un autre plugin formate le chat. Une fois désactivé, les filtres restent actifs mais le formatage, les pings, les placeholders de chat, la transformation des liens et le stockage de l'historique ne sont plus appliqués |
| `enable-chat-messages` | Boolean | `true` | Enregistre chaque message du chat en base de données, pour les consulter avec `/chathistory`. Nécessite un stockage SQL (les messages ne sont pas enregistrés avec le stockage `JSON`) |
| `date-format` | String | `yyyy-MM-dd HH:mm:ss` | Format de date utilisé par `/chathistory`. Suit les motifs Java `SimpleDateFormat` |

### Filtres

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable-alphanumeric-regex` | Boolean | `true` | Bloque les messages contenant des caractères non autorisés par `alphanumeric-regex`. Contournement : `essentials.chat.bypass.alphanumeric` |
| `alphanumeric-regex` | String | *(voir ci-dessus)* | Regex des caractères autorisés |
| `enable-link-regex` | Boolean | `true` | Bloque les messages contenant un lien (les espaces sont retirés avant la vérification). Contournement : `essentials.chat.bypass.link` |
| `link-regex` | String | *(voir ci-dessus)* | Regex utilisée pour détecter les liens |
| `pub-regex` | String | *(voir ci-dessus)* | Regex du contenu interdit dans les messages `/pub` (codes couleur, couleurs hexadécimales, placeholders et balises MiniMessage) |
| `enable-caps` | Boolean | `true` | Bloque les messages (de plus de 3 caractères) contenant trop de majuscules. Les pseudos des joueurs connectés sont ignorés. Contournement : `essentials.chat.bypass.caps` |
| `caps-threshold` | Double | `0.5` | Proportion maximale de majuscules, entre `0` et `1`. `0.5` bloque les messages contenant plus de 50 % de majuscules |
| `enable-anti-flood` | Boolean | `true` | Bloque les messages correspondant à `anti-flood-regex`. Contournement : `essentials.chat.bypass.flood` |
| `anti-flood-regex` | String | `(.)\\1{3,}` | Regex utilisée pour détecter le flood. Par défaut, bloque tout caractère répété 4 fois ou plus d'affilée |

### Anti-Spam

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable-chat-dynamic-cooldown` | Boolean | `true` | Active le délai dynamique défini par `chat-cooldowns`. Contournement : `essentials.chat.bypass.dynamic.cooldown` |
| `chat-cooldowns` | Liste | *(voir ci-dessus)* | Liste de règles, chacune avec `messages` et `cooldown` (millisecondes). Une règle signifie : un joueur peut envoyer au maximum `messages` messages en `cooldown` millisecondes |
| `chat-cooldown-max` | Integer | `50` | Nombre de messages récents gardés en mémoire pour chaque joueur afin d'évaluer les règles. Doit être supérieur ou égal à la plus grande valeur de `messages` |
| `enable-same-message-cancel` | Boolean | `true` | Annule un message identique (sans tenir compte de la casse) au message précédent du joueur. Contournement : `essentials.chat.bypass.same.message` |

<CalloutContainer type="info">

<CalloutTitle>Délai dynamique</CalloutTitle>

<CalloutDescription>
Avec les règles par défaut, un joueur qui envoie :
- **2** messages en **1,5 seconde**,
- **4** messages en **12 secondes**,
- ou **10** messages en **60 secondes**

doit attendre la fin de la fenêtre correspondante avant de pouvoir envoyer un nouveau message. Le temps d'attente est affiché au joueur.
</CalloutDescription>

</CalloutContainer>

### Chat Local

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable-local-chat` | Boolean | `false` | Active le chat local : les messages ne sont visibles que par les joueurs du même monde situés à moins de `local-chat-distance` blocs. Un message commençant par `!` est envoyé à tout le monde (le `!` est retiré) |
| `local-chat-distance` | Double | `100` | Distance maximale en blocs des messages du chat local |

### Formats de Chat

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `chat-formats` | Liste | *(voir ci-dessus)* | Formats avec une `priority`, une `permission` et un `format` |
| `chat-formats[].priority` | Integer | - | Parmi les formats dont le joueur possède la permission, celui avec la priorité la **plus élevée** est utilisé |
| `chat-formats[].permission` | String | - | Permission requise pour ce format |
| `chat-formats[].format` | String | - | Format MiniMessage. Placeholders : `%player%`, `%displayName%`, `<message>` (le message, **pas** `%message%`), `%moderator_action%` et les placeholders PlaceholderAPI |
| `default-chat-format` | String | *(voir ci-dessus)* | Format utilisé lorsque le joueur ne possède aucune des permissions de `chat-formats` |
| `moderator-action` | String | *(voir ci-dessus)* | Texte inséré à la place de `%moderator_action%` pour les lecteurs ayant `essentials.chat.moderator` (vide pour les autres). Par défaut, un bouton qui exécute `/sc %player%` |

### Liens

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable-link-transform` | Boolean | `true` | Transforme les URL `http://` et `https://` des joueurs ayant `essentials.chat.link` en liens cliquables. Le joueur doit aussi avoir `essentials.chat.click` |
| `link-transform` | String | *(voir ci-dessus)* | Format MiniMessage d'un lien transformé. `%url%` est remplacé par l'URL |

<CalloutContainer type="info">

<CalloutDescription>
Depuis la 1.0.3.6, les URL contenant `~`, `+` ou `#` sont correctement détectées, et les caractères spéciaux d'une URL ne cassent plus le remplacement.
</CalloutDescription>

</CalloutContainer>

### Ping (@Mention)

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable-ping` | Boolean | `true` | Active les pings : écrire `@<pseudo>` (3 à 16 caractères) met le pseudo en valeur dans le message |
| `enable-player-ping-sound` | Boolean | `true` | Interrupteur global du son de ping. Lorsqu'il vaut `true`, chaque joueur peut encore le désactiver pour lui-même avec `/pingsound` |
| `player-ping-sound` | String | `BLOCK_NOTE_BLOCK_PLING` | Son joué au joueur mentionné. Résolu via l'API XSound de zMenu, il fonctionne donc sur toutes les versions supportées. Un nom inconnu de XSound est joué comme son personnalisé (resource pack) |
| `player-ping-sound-volume` | Float | `0.8` | Volume du son de ping |
| `player-ping-sound-pitch` | Float | `1` | Hauteur (pitch) du son de ping |
| `player-ping-color` | String | `<red>%name%</red><red>` | Affichage de la mention pour le joueur mentionné. `%name%` est remplacé par `@<pseudo>` |
| `player-ping-color-other` | String | `<white>%name%</white>` | Affichage de la mention pour les autres joueurs |

<CalloutContainer type="info">

<CalloutDescription>
Avant la 1.0.3.8, le son de ping ne se jouait pas sur Paper 1.21.3+ (`org.bukkit.Sound` est devenu une interface) et `enable-player-ping-sound` était ignoré. Ces deux problèmes sont corrigés.
</CalloutDescription>

</CalloutContainer>

### Placeholders de Chat

Mots-clés personnalisés remplacés dans les messages du chat.

| Option | Type | Description |
|--------|------|-------------|
| `chat-placeholders[].name` | String | Nom unique du placeholder : lettres minuscules, chiffres, `_` et `-` uniquement |
| `chat-placeholders[].regex` | String | Regex recherchée dans le message (par exemple `(?i)\\[ping\\]` pour `[ping]`) |
| `chat-placeholders[].result` | String | Texte de remplacement. Supporte les couleurs, MiniMessage, `%player%` et les placeholders PlaceholderAPI (résolus pour l'expéditeur) |
| `chat-placeholders[].permission` | String | Permission associée au placeholder |

### Affichage d'Objets

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `item-placeholder.enable` | Boolean | `true` | Active l'affichage d'objets |
| `item-placeholder.regex` | String | `(?i)\\[item\\]\|\\[i\\]` | Texte remplacé par l'objet tenu en main principale (`[item]` ou `[i]`) |
| `item-placeholder.result` | String | `&bx<amount> &f<item>` | Affichage de l'objet. `<amount>` et `<item>` sont remplacés. Le survol affiche l'infobulle de l'objet, le clic ouvre un aperçu de l'objet (via `/showitem`, valable 5 minutes) |
| `item-placeholder.permission` | String | `zessentials.chat.placeholder.item` | Permission associée à l'affichage d'objets |
| `item-placeholder.item-name-regex` | String | *(voir ci-dessus)* | Regex que le nom de l'objet doit respecter, sinon le message est refusé. Utilise `alphanumeric-regex` si elle est absente |

### Placeholder de Commande

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `command-placeholder.enable` | Boolean | `true` | Transforme `./<commande>` (terminé par un `.` ou la fin du message) en texte cliquable qui suggère `/<commande>` |
| `command-placeholder.result` | String | *(voir ci-dessus)* | Affichage de la commande. `%command%` est la commande, `%fixed_command%` la commande avec les apostrophes échappées |
| `command-placeholder.permission` | String | `zessentials.chat.placeholder.command` | Permission associée au placeholder de commande |
| `command-placeholder.enable-replace-all-message` | Boolean | `false` | Transforme aussi les commandes dans tous les messages envoyés aux joueurs. Nécessite ProtocolLib et Paper |

### Règles Personnalisées

Règles basées sur des regex, vérifiées avant tous les autres filtres. Lorsqu'une règle correspond, le message est annulé et le `message` de la règle est envoyé au joueur.

| Option | Type | Description |
|--------|------|-------------|
| `custom-rules[].regex` | String | Regex comparée au message |
| `custom-rules[].permission` | String | Facultatif. Si elle est définie, la règle **ne s'applique qu'aux joueurs possédant cette permission** ; si elle est absente, la règle s'applique à tout le monde |
| `custom-rules[].message` | String | Message envoyé au joueur lorsque la règle bloque un message |

<CalloutContainer type="warning">

<CalloutDescription>
Malgré son nom, la permission `essentials.chat.bypass.custom.rules` utilisée dans le fichier par défaut n'exempte pas les joueurs d'une règle : une règle avec une `permission` ne s'applique qu'aux joueurs qui la **possèdent**. Pour appliquer une règle à tous les joueurs, supprimez sa ligne `permission`.
</CalloutDescription>

</CalloutContainer>

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/chathistory <joueur> [page]` | `ct` | `essentials.chat.history` | Affiche les messages enregistrés d'un joueur (10 par page). Nécessite `enable-chat-messages` et un stockage SQL |
| `/chatclear` | `cl` | `essentials.chat.clear` | Vide le chat pour tous les joueurs |
| `/chatenable` | `ce` | `essentials.chat.enable` | Réactive le chat après sa désactivation |
| `/chatdisable` | `cd` | `essentials.chat.disable` | Désactive le chat (contournement avec `essentials.chat.bypass.disable`) |
| `/broadcast <message>` | `bc` | `essentials.chat.broadcast` | Diffuse un message à tous les joueurs |
| `/pingsound` | `pingsounds` | `essentials.ping.sound` | Active ou désactive le son de ping pour vous-même |
| `/pub <message>` | - | `essentials.pub` | Envoie un message publicitaire mis en avant à tous les joueurs. Les messages correspondant à `pub-regex` sont refusés |
| `/showitem <code>` | - | `essentials.show.item` | Ouvre l'aperçu d'un objet affiché dans le chat (utilisé par le clic sur `[item]`) |

<CalloutContainer type="info">

<CalloutDescription>
La commande d'historique du chat est `/chathistory` (alias `/ct`). `/sc` est l'alias de `/sanction`, utilisé par le `moderator-action` par défaut.
</CalloutDescription>

</CalloutContainer>

Pour la liste complète des commandes, consultez [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associés

Le module Chat n'enregistre pas de placeholders PlaceholderAPI dédiés. En revanche, n'importe quel placeholder PlaceholderAPI peut être utilisé dans les formats de chat, `moderator-action` et les placeholders de chat.

Pour la liste complète des placeholders, consultez [Placeholders](../placeholders).

---

## Détails des Fonctionnalités

### Formats de Chat par Priorité

Parmi les entrées de `chat-formats` dont le joueur possède la permission, celle avec la `priority` la **plus élevée** est utilisée. Si le joueur n'en possède aucune, `default-chat-format` est utilisé.

```yaml
chat-formats:
  - priority: 1
    permission: "essentials.chat.format.vip"
    format: "<gold>[VIP] <yellow>%player% <dark_gray>» <white><message>"
  - priority: 2
    permission: "essentials.chat.format.admin"
    format: "<red>[Admin] <white>%player% <dark_gray>» <white><message>"

default-chat-format: "<gray>%player% <dark_gray>» <white><message>"
```

Un joueur possédant à la fois `essentials.chat.format.vip` et `essentials.chat.format.admin` utilise le format admin (priorité `2`).

<CalloutContainer type="warning">

<CalloutDescription>
Le message est inséré avec la balise `<message>`, et non `%message%`.
</CalloutDescription>

</CalloutContainer>

### Chat Local

Lorsque `enable-local-chat` vaut `true`, les messages ne sont envoyés qu'aux joueurs du même monde situés à moins de `local-chat-distance` blocs de l'expéditeur. Commencez un message par `!` pour l'envoyer à tout le serveur, par exemple `!Bonjour à tous`.

### Son de Ping

Lorsqu'un joueur est mentionné avec `@<pseudo>`, le son configuré lui est joué. Les joueurs que cela dérange peuvent exécuter `/pingsound` pour le désactiver pour eux-mêmes (le choix est sauvegardé) ; une nouvelle exécution le réactive. Mettez `enable-player-ping-sound: false` pour désactiver le son pour tout le monde.

### Placeholders de Chat Personnalisés

```yaml
chat-placeholders:
  - name: "money"
    regex: "(?i)\\[money\\]"
    result: "%zessentials_user_formatted_balance_money%"
    permission: "zessentials.chat.placeholder.money"
```

Lorsqu'un joueur écrit `[money]` dans le chat, le texte est remplacé par son solde formaté.

### Bouton d'Action de Modérateur

Les lecteurs ayant la permission `essentials.chat.moderator` voient le texte `moderator-action` à la place de `%moderator_action%`. Par défaut, il s'agit d'un bouton rouge `✗` qui exécute `/sc <joueur>` pour ouvrir l'interface de sanction de l'expéditeur.
