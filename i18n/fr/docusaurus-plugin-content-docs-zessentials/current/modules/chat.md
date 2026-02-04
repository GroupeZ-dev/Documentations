---
sidebar_position: 3
title: Module Chat
description: Formatage complet du chat, moderation, placeholders et fonctionnalites interactives
---

# Module Chat

**Fichier :** `modules/chat/config.yml`

Le module Chat est l'un des modules les plus riches en fonctionnalites de zEssentials. Il controle tous les aspects du chat du serveur, notamment le formatage, les outils de moderation, l'anti-spam, les elements interactifs, les mentions, le chat local, l'affichage d'objets, les liens cliquables, les regles personnalisees, les boutons d'action de moderateur et le stockage optionnel de l'historique du chat. Le module utilise un **systeme de permissions base sur les priorites** pour les formats de chat et MiniMessage pour le formatage de texte enrichi.

---

## Permissions de Contournement

Les permissions suivantes permettent aux joueurs de contourner certaines restrictions du chat :

| Permission | Description |
|------------|-------------|
| `essentials.chat.bypass.alphanumeric` | Contourner le filtre regex alphanumerique |
| `essentials.chat.bypass.dynamic.cooldown` | Contourner le temps de recharge dynamique du chat (anti-spam) |
| `essentials.chat.bypass.link` | Contourner le filtre de liens/URL dans le chat |
| `essentials.chat.bypass.same.message` | Contourner la detection de messages en double |
| `essentials.chat.bypass.disable` | Contourner la restriction de chat desactive (parler lorsque le chat est desactive) |
| `essentials.chat.moderator` | Accorde l'acces au bouton d'action de moderateur sur les messages du chat |

### Permissions de Formatage du Chat

Ces permissions controlent quelles balises de formatage MiniMessage un joueur peut utiliser dans le chat :

| Permission | Balises Autorisees |
|------------|-------------------|
| `essentials.chat.color` | Balises de couleur (par exemple, `<red>`, `<#ff0000>`) |
| `essentials.chat.decoration` | Balises de decoration (`<bold>`, `<italic>`, `<underlined>`, `<strikethrough>`, `<obfuscated>`) |
| `essentials.chat.rainbow` | Balise de degrade arc-en-ciel (`<rainbow>`) |
| `essentials.chat.gradient` | Balise de degrade (`<gradient:color1:color2>`) |
| `essentials.chat.click` | Balises d'evenement de clic (`<click:action:value>`) |
| `essentials.chat.hover` | Balises d'evenement de survol (`<hover:show_text:value>`) |
| `essentials.chat.newline` | Balise de retour a la ligne (`<newline>`) |
| `essentials.chat.reset` | Balise de reinitialisation (`<reset>`) |
| `essentials.chat.font` | Balise de police (`<font:name>`) |
| `essentials.chat.keybind` | Balise de raccourci clavier (`<keybind:key>`) |
| `essentials.chat.link` | Balises d'URL cliquables |

---

## Configuration Source

```yaml
enable: true

# Regex and filter toggles
enable-alphanumeric-regex: true
enable-link-regex: true
enable-itemadders-font-regex: true

# Anti-spam systems
enable-chat-dynamic-cooldown: true
enable-same-message-cancel: true

# Local (distance-based) chat
enable-local-chat: false
local-chat-distance: 100

# Core chat features
enable-chat-format: true
enable-link-transform: true
enable-chat-messages: true

# Caps detection
enable-caps: true
caps-threshold: 0.5

# Anti-flood
enable-anti-flood: true
anti-flood-regex: "(.)\\1{3,}"

# Ping (@mention) system
enable-ping: true
enable-player-ping-sound: true
player-ping-sound: BLOCK_NOTE_BLOCK_PLING
player-ping-sound-volume: 0.8
player-ping-sound-pitch: 1
player-ping-color: "<red>%name%</red><red>"
player-ping-color-other: "<white>%name%</white>"

# Date format for chat history
date-format: "yyyy-MM-dd HH:mm:ss"

# Dynamic cooldown thresholds
chat-cooldowns:
  2: 1500
  4: 12000
  10: 60000
chat-cooldown-max: 50

# Chat format with priority-based permissions
chat-formats:
  - priority: 0
    permission: "zessentials.chat.default"
    format: "<gray>%player% <dark_gray>>> <white>%message%"
  - priority: 1
    permission: "zessentials.chat.vip"
    format: "<gold>[VIP] <yellow>%player% <dark_gray>>> <white>%message%"
  - priority: 2
    permission: "zessentials.chat.admin"
    format: "<red>[Admin] <white>%player% <dark_gray>>> <white>%message%"

# Chat placeholders (custom replacements in chat)
chat-placeholders:
  - placeholder: "[ping]"
    replacement: "<yellow>%player_ping%ms</yellow>"
  - placeholder: "[money]"
    replacement: "<green>%zessentials_user_formatted_balance_default%</green>"

# Item display in chat
show-item:
  enable: true
  placeholder: "[item]"
  format: "<hover:show_item:%item_nbt%><gold>[%item_name% x%item_amount%]</hover>"

# Command placeholder (./command becomes clickable)
command-placeholder:
  enable: true

# Custom rules (regex-based)
custom-rules:
  - regex: "(?i)(badword1|badword2)"
    action: cancel
    message: "&cThat word is not allowed."
  - regex: "(?i)(advertising\\.com)"
    action: cancel
    message: "&cAdvertising is not allowed."

# Ping system
ping:
  enable: true
  sound: BLOCK_NOTE_BLOCK_PLING
  volume: 0.8
  pitch: 1.0

# Moderator action button
moderator-button:
  enable: true

# Link transform (clickable URLs)
link-transform:
  enable: true

# Chat history storage (MySQL only)
chat-history:
  enable: false
```

---

## Options

### Options Generales

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou desactiver entierement le module Chat |
| `enable-chat-format` | Boolean | `true` | Activer le formatage du chat base sur les priorites |
| `enable-chat-messages` | Boolean | `true` | Activer le pipeline de traitement des messages du chat |
| `date-format` | String | `yyyy-MM-dd HH:mm:ss` | Format de date utilise pour les horodatages de l'historique du chat. Utilise les motifs Java `SimpleDateFormat` |

### Filtres Regex

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable-alphanumeric-regex` | Boolean | `true` | Lorsqu'active, les messages contenant des caracteres non alphanumeriques (sauf la ponctuation standard) sont bloques. Contournable avec `essentials.chat.bypass.alphanumeric` |
| `enable-link-regex` | Boolean | `true` | Lorsqu'active, les messages contenant des URL/liens sont bloques. Contournable avec `essentials.chat.bypass.link` |
| `enable-itemadders-font-regex` | Boolean | `true` | Lorsqu'active, filtre les caracteres de police personnalises ItemAdders des messages du chat |

### Systemes Anti-Spam

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable-chat-dynamic-cooldown` | Boolean | `true` | Active le temps de recharge progressif qui augmente lorsqu'un joueur envoie des messages plus rapidement |
| `enable-same-message-cancel` | Boolean | `true` | Annule les messages identiques au message precedent du joueur. Contournable avec `essentials.chat.bypass.same.message` |
| `chat-cooldowns` | Map (Integer to Integer) | `{2: 1500, 4: 12000, 10: 60000}` | Seuils de temps de recharge dynamiques. Cle = nombre de messages, Valeur = temps de recharge en millisecondes applique apres avoir atteint ce nombre de messages |
| `chat-cooldown-max` | Integer | `50` | Duree maximale du temps de recharge en secondes que le systeme dynamique peut imposer |

:::info Temps de Recharge Dynamique
Le systeme de temps de recharge dynamique suit le nombre de messages qu'un joueur envoie dans une fenetre glissante. A mesure que le compteur augmente, des temps de recharge progressivement plus longs sont appliques :
- Apres **2** messages rapides : **1500ms** (1,5 secondes) de temps de recharge
- Apres **4** messages rapides : **12000ms** (12 secondes) de temps de recharge
- Apres **10** messages rapides : **60000ms** (60 secondes) de temps de recharge

Les joueurs avec la permission `essentials.chat.bypass.dynamic.cooldown` sont exemptes.
:::

### Detection des Majuscules

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable-caps` | Boolean | `true` | Active la detection et le blocage des messages avec un nombre excessif de caracteres en majuscules |
| `caps-threshold` | Double | `0.5` | Le ratio de caracteres en majuscules par rapport au total de caracteres qui declenche la detection. `0.5` signifie que les messages avec plus de 50% de lettres majuscules sont signales |

### Anti-Flood

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable-anti-flood` | Boolean | `true` | Active la detection et la suppression du flood de caracteres (par exemple, "helloooooo") |
| `anti-flood-regex` | String | `(.)\\1{3,}` | Motif regex utilise pour detecter la repetition de caracteres. La valeur par defaut correspond a tout caractere repete 4 fois ou plus consecutivement |

### Chat Local

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable-local-chat` | Boolean | `false` | Active le chat local base sur la distance. Lorsqu'active, les messages ne sont visibles que par les joueurs situes dans la distance configuree |
| `local-chat-distance` | Integer | `100` | Distance maximale en blocs dans laquelle les joueurs peuvent voir les messages des autres lorsque le chat local est active |

:::tip
Le chat local est utile pour les serveurs roleplay ou survie ou vous souhaitez que les joueurs ne communiquent qu'avec les joueurs proches. Les joueurs peuvent utiliser `/pub` pour envoyer des messages visibles par tous, quelle que soit la distance.
:::

### Systeme de Ping (@Mention)

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable-ping` | Boolean | `true` | Active le systeme de ping par @mention dans le chat. Les joueurs peuvent taper `@NomDuJoueur` pour mentionner un autre joueur |
| `enable-player-ping-sound` | Boolean | `true` | Jouer un effet sonore au joueur mentionne |
| `player-ping-sound` | String | `BLOCK_NOTE_BLOCK_PLING` | L'effet sonore Minecraft joue lorsqu'un joueur est mentionne |
| `player-ping-sound-volume` | Float | `0.8` | Volume du son de ping (0.0 a 1.0) |
| `player-ping-sound-pitch` | Float | `1` | Tonalite du son de ping |
| `player-ping-color` | String | `<red>%name%</red><red>` | Format MiniMessage pour la facon dont le joueur mentionne voit son propre nom mis en evidence dans le message |
| `player-ping-color-other` | String | `<white>%name%</white>` | Format MiniMessage pour la facon dont les autres joueurs voient le nom du joueur mentionne dans le message |

### Formats de Chat

Les formats de chat utilisent un systeme de permissions base sur les priorites. Le plugin verifie chaque entree de format dans l'ordre de priorite (le plus bas en premier) et applique le premier format pour lequel le joueur possede la permission requise.

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `chat-formats` | List | *(voir ci-dessus)* | Liste des entrees de format de chat, chacune avec une priorite, une permission et une chaine de format MiniMessage |
| `chat-formats[].priority` | Integer | - | Ordre de priorite. Les valeurs plus basses sont verifiees en premier |
| `chat-formats[].permission` | String | - | Noeud de permission requis pour que ce format s'applique |
| `chat-formats[].format` | String | - | Chaine de format de chat MiniMessage. Utilisez `%player%` pour le nom du joueur et `%message%` pour le contenu du message |

### Placeholders de Chat

Remplacements de texte personnalises dans les messages du chat. Lorsqu'un joueur tape un mot-cle de placeholder, il est remplace par du contenu dynamique.

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `chat-placeholders` | List | *(voir ci-dessus)* | Liste des definitions de remplacement de placeholders |
| `chat-placeholders[].placeholder` | String | - | Le motif de texte a rechercher dans le chat (par exemple, `[ping]`, `[money]`) |
| `chat-placeholders[].replacement` | String | - | Le texte de remplacement MiniMessage. Supporte les placeholders PlaceholderAPI |

### Affichage d'Objets

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `show-item.enable` | Boolean | `true` | Active le placeholder `[item]` qui permet aux joueurs de montrer l'objet tenu en main dans le chat |
| `show-item.placeholder` | String | `[item]` | Le texte que les joueurs tapent dans le chat pour afficher l'objet tenu en main |
| `show-item.format` | String | *(voir ci-dessus)* | Format MiniMessage pour l'affichage de l'objet. Supporte `%item_name%`, `%item_amount%`, `%item_nbt%` |

### Placeholder de Commande

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `command-placeholder.enable` | Boolean | `true` | Lorsqu'active, taper `./commande` dans le chat cree un texte cliquable qui execute la commande au clic |

### Regles Personnalisees

Regles basees sur les regex qui peuvent detecter et agir sur les messages du chat. Les regles sont verifiees dans l'ordre.

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `custom-rules` | List | *(voir ci-dessus)* | Liste des definitions de regles de chat personnalisees |
| `custom-rules[].regex` | String | - | Motif d'expression reguliere a comparer aux messages du chat |
| `custom-rules[].action` | String | - | Action a effectuer lorsque la regle correspond. `cancel` bloque le message |
| `custom-rules[].message` | String | - | Message envoye au joueur lorsque son message est bloque par cette regle |

### Bouton d'Action de Moderateur

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `moderator-button.enable` | Boolean | `true` | Lorsqu'active, les joueurs avec la permission `essentials.chat.moderator` voient un bouton d'action a cote de chaque message du chat, permettant un acces rapide aux actions de moderation (mute, kick, etc.) sur l'expediteur du message |

### Transformation de Liens

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `link-transform.enable` | Boolean | `true` | Convertit automatiquement les URL postees dans le chat en liens cliquables |
| `enable-link-transform` | Boolean | `true` | Bouton global pour la transformation de liens |

### Historique du Chat

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `chat-history.enable` | Boolean | `false` | Active le stockage des messages du chat dans la base de donnees pour la consultation de l'historique. **Necessite MySQL** |

:::warning
Le stockage de l'historique du chat necessite une base de donnees **MySQL** (ou MariaDB). Il n'est pas disponible avec SQLite. Activer cette fonctionnalite sur un serveur actif generera un nombre important d'ecritures en base de donnees.
:::

---

## Commandes Associees

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/chathistory` | `ct` | `essentials.chat.history` | Consulter l'historique du chat stocke |
| `/chatclear` | `cl` | `essentials.chat.clear` | Effacer le chat pour tous les joueurs |
| `/chatenable` | `ce` | `essentials.chat.enable` | Activer le chat du serveur (apres qu'il a ete desactive) |
| `/chatdisable` | `cd` | `essentials.chat.disable` | Desactiver le chat du serveur (empeche les joueurs de discuter) |
| `/broadcast` | `bc` | `essentials.chat.broadcast` | Diffuser un message a tous les joueurs |
| `/showitem` | - | `essentials.show.item` | Montrer l'objet actuellement tenu en main dans le chat |
| `/pub` | - | `essentials.pub` | Envoyer un message mis en evidence/public visible par tous (utile avec le chat local) |

Pour la liste complete des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associes

Le module Chat n'enregistre pas de placeholders PlaceholderAPI dedies. Cependant, le module utilise largement PlaceholderAPI dans son systeme de formatage. Tout placeholder enregistre peut etre utilise dans les formats de chat, les placeholders de chat et les formats d'affichage d'objets.

Pour la liste complete des placeholders, voir [Placeholders](../placeholders).

---

## Details des Fonctionnalites

### Formatage du Chat Base sur les Priorites

Les formats de chat sont evalues dans l'ordre de priorite (le nombre le plus bas en premier). Le premier format dont le joueur possede la permission est applique. Cela vous permet de definir une hierarchie :

```yaml
chat-formats:
  - priority: 0
    permission: "zessentials.chat.default"
    format: "<gray>%player% <dark_gray>>> <white>%message%"
  - priority: 1
    permission: "zessentials.chat.vip"
    format: "<gold>[VIP] <yellow>%player% <dark_gray>>> <white>%message%"
  - priority: 2
    permission: "zessentials.chat.admin"
    format: "<red>[Admin] <white>%player% <dark_gray>>> <white>%message%"
```

:::info
Un joueur possedant a la fois `zessentials.chat.default` et `zessentials.chat.vip` utilisera le format `default` car il a un numero de priorite plus bas et est verifie en premier. Pour utiliser le format VIP, supprimez la permission par defaut ou structurez votre hierarchie de permissions afin que les joueurs ne possedent qu'une seule permission de chat.
:::

### Systeme de Temps de Recharge Dynamique

Le temps de recharge dynamique augmente les restrictions en fonction de la frequence des messages :

| Messages Envoyes | Temps de Recharge Applique |
|------------------|---------------------------|
| 2 messages rapides | 1 500 ms (1,5s) |
| 4 messages rapides | 12 000 ms (12s) |
| 10 messages rapides | 60 000 ms (60s) |

Le plafond maximum du temps de recharge est controle par `chat-cooldown-max` (par defaut : 50 secondes). Le compteur de temps de recharge se reinitialise apres une periode d'inactivite.

### Chat Local

Lorsque `enable-local-chat` est `true`, les messages ne sont transmis qu'aux joueurs situes dans un rayon de `local-chat-distance` blocs de l'expediteur. Ceci est mesure en distance 3D. Les joueurs hors de portee ne verront pas le message. La commande `/pub` envoie un message qui contourne la restriction de distance et est visible sur tout le serveur.

### Placeholders de Chat Personnalises

Les placeholders de chat vous permettent de creer des mots-cles raccourcis qui se developpent en contenu enrichi :

```yaml
chat-placeholders:
  - placeholder: "[ping]"
    replacement: "<yellow>%player_ping%ms</yellow>"
  - placeholder: "[money]"
    replacement: "<green>%zessentials_user_formatted_balance_default%</green>"
```

Lorsqu'un joueur tape `[ping]` dans le chat, cela est remplace par son ping actuel en jaune. Lorsqu'il tape `[money]`, cela affiche son solde formate en vert.

### Bouton d'Action de Moderateur

Lorsqu'active, les membres du staff avec la permission `essentials.chat.moderator` voient un petit bouton d'action ajoute a chaque message du chat. Cliquer sur ce bouton ouvre un menu d'actions rapides pour l'expediteur du message, fournissant des raccourcis vers les commandes de moderation telles que mute, kick ou ban.

### Transformation de Liens

Les URL detectees dans les messages du chat sont automatiquement converties en liens cliquables. Les joueurs peuvent cliquer directement sur l'URL dans le chat pour l'ouvrir. Cela fonctionne conjointement avec le filtre regex de liens -- si `enable-link-regex` est `true`, les liens sont bloques sauf si le joueur possede `essentials.chat.bypass.link`, auquel cas le lien est a la fois autorise et rendu cliquable.
