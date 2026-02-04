---
sidebar_position: 1
title: Configuration Principale
description: Fichier de configuration principal (config.yml) pour zEssentials
---

# Configuration Principale

Cette page documente chaque section du fichier principal `config.yml` situe dans `plugins/zEssentials/config.yml`. Ce fichier controle le comportement global du plugin, incluant le stockage, les cooldowns, les restrictions, les couleurs de messages, les parametres de vol, et plus encore.

---

## Debug

Active ou desactive le mode debug. Lorsqu'il est active, le plugin affiche des logs supplementaires dans la console, ce qui est utile pour le depannage de problemes.

```yaml
enable-debug: false
```

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable-debug` | Boolean | `false` | Active les logs de debug detailles dans la console du serveur |

:::tip
N'activez le mode debug que lorsque vous depannez activement un probleme. La sortie de debug peut etre tres verbeuse et peut impacter les performances du serveur sur les serveurs a fort trafic.
:::

---

## Stockage

Configurez la maniere dont zEssentials stocke les donnees, le type de communication serveur et les details de connexion a la base de donnees/Redis.

### Type de Stockage

```yaml
storage-type: SQLITE
```

| Valeur | Description |
|--------|-------------|
| `SQLITE` | Stockage local base sur des fichiers. Ideal pour les configurations a serveur unique et les tests. Aucune configuration supplementaire requise. |
| `MYSQL` | Base de donnees MySQL ou MariaDB. Recommande pour les environnements de production. |
| `HIKARICP` | MySQL/MariaDB avec pool de connexions HikariCP. Ideal pour les serveurs haute performance et a fort trafic. |

### Type de Serveur

```yaml
server-type: PAPER
```

| Valeur | Description |
|--------|-------------|
| `PAPER` | Mode serveur autonome. Toutes les donnees sont stockees et lues localement. |
| `REDIS` | Mode multi-serveur avec synchronisation en temps reel via Redis pub/sub. Necessite un stockage MySQL ou HikariCP. |

### Configuration de la Base de Donnees

Utilise lorsque `storage-type` est defini sur `MYSQL` ou `HIKARICP`.

```yaml
database-configuration:
  table-prefix: "zessentials_"
  host: "192.168.10.10"
  port: 3306
  user: "homestead"
  password: "secret"
  database: "zessentials"
  debug: false
```

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `table-prefix` | String | `zessentials_` | Prefixe applique a tous les noms de tables de la base de donnees. Utile lors du partage d'une base de donnees avec d'autres plugins. |
| `host` | String | `192.168.10.10` | Nom d'hote ou adresse IP du serveur de base de donnees. |
| `port` | Integer | `3306` | Port sur lequel le serveur de base de donnees ecoute. |
| `user` | String | `homestead` | Nom d'utilisateur de la base de donnees pour l'authentification. |
| `password` | String | `secret` | Mot de passe de la base de donnees pour l'authentification. |
| `database` | String | `zessentials` | Nom de la base de donnees a utiliser. La base de donnees doit deja exister. |
| `debug` | Boolean | `false` | Active les logs de debug des requetes SQL. Affiche toutes les requetes executees dans la console. |

:::warning
Modifiez les identifiants de base de donnees par defaut avant de deployer en production. Les valeurs par defaut (`homestead` / `secret`) sont des espaces reserves et ne doivent pas etre utilisees dans un environnement en production.
:::

### Configuration Redis

Utilise lorsque `server-type` est defini sur `REDIS`. Permet la synchronisation inter-serveurs des donnees joueurs, sanctions, economie, messages, et plus encore.

```yaml
redis-configuration:
  host: "127.0.0.1"
  port: 6379
  password: ""
```

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `host` | String | `127.0.0.1` | Nom d'hote ou adresse IP du serveur Redis. |
| `port` | Integer | `6379` | Port sur lequel le serveur Redis ecoute. |
| `password` | String | `""` | Mot de passe Redis. Laissez vide si l'authentification n'est pas configuree. |

:::tip
Lors de l'utilisation du type de serveur `REDIS`, assurez-vous que tous les serveurs du reseau partagent la meme base de donnees MySQL **et** la meme instance Redis pour une synchronisation complete des donnees.
:::

---

## Cooldowns de Commandes

Configurez les cooldowns pour les commandes afin de prevenir le spam et les abus. Les cooldowns sont appliques par joueur et par commande. Vous pouvez definir un cooldown de base et des surcharges basees sur les permissions afin que differents rangs aient des temps d'attente differents.

### Commandes Forcees

Une liste de chaines de commandes exactes qui auront toujours des cooldowns appliques, meme si le joueur possede la permission de contournement. Ceci est utile pour les commandes que vous ne voulez jamais voir spammees, quel que soit le rang.

```yaml
force-commands:
  - "/essversion"
```

### Contournement des Cooldowns

```yaml
enable-cooldown-bypass: true
```

Lorsque `enable-cooldown-bypass` est defini sur `true`, les joueurs possedant la permission `essentials.bypass.cooldown` ignoreront tous les cooldowns de commandes (sauf ceux listes dans `force-commands`).

### Definition des Cooldowns de Commandes

Definissez les cooldowns par commande avec des surcharges optionnelles basees sur les permissions. Chaque entree se compose de :
- **command** : Le nom de la commande (sans le `/` initial).
- **cooldown** : Le cooldown de base en secondes qui s'applique a tous les joueurs.
- **permissions** : Une liste de surcharges basees sur les permissions. Les joueurs possedant la permission correspondante utilisent le cooldown de surcharge au lieu de la valeur de base. Un cooldown de `0` signifie aucun cooldown.

```yaml
command-cooldowns:
  - command: "heal"
    cooldown: 60
    permissions:
      - permission: "essentials.cooldowns.vip"
        cooldown: 40
      - permission: "essentials.cooldowns.staff"
        cooldown: 20
  - command: "tpr"
    cooldown: 300
    permissions:
      - permission: "essentials.cooldowns.vip"
        cooldown: 120
      - permission: "essentials.cooldowns.staff"
        cooldown: 0
```

**Exemple detaille pour `heal` :**

| Type de Joueur | Permission | Cooldown |
|----------------|-----------|----------|
| Par Defaut | *(aucune)* | 60 secondes |
| VIP | `essentials.cooldowns.vip` | 40 secondes |
| Staff | `essentials.cooldowns.staff` | 20 secondes |

**Exemple detaille pour `tpr` :**

| Type de Joueur | Permission | Cooldown |
|----------------|-----------|----------|
| Par Defaut | *(aucune)* | 300 secondes (5 minutes) |
| VIP | `essentials.cooldowns.vip` | 120 secondes (2 minutes) |
| Staff | `essentials.cooldowns.staff` | 0 secondes (aucun cooldown) |

:::info
Les surcharges basees sur les permissions sont verifiees dans l'ordre. La premiere permission correspondante est utilisee. Si aucune permission ne correspond, la valeur de base `cooldown` est appliquee.
:::

---

## Restrictions de Commandes

Restreignez des commandes specifiques d'etre utilisees dans certains mondes ou au sein de regions cuboides definies. Les joueurs possedant la permission de contournement peuvent ignorer ces restrictions.

```yaml
command-restrictions:
  - commands:
      - "heal"
      - "feed"
    bypass-permission: "essentials.bypass.restriction"
    worlds:
      - "world_pvp"
    cuboids:
      - "world,100,0,100,200,256,200"
```

| Option | Type | Description |
|--------|------|-------------|
| `commands` | List of Strings | Les commandes a restreindre (sans le `/` initial). |
| `bypass-permission` | String | Permission qui permet a un joueur de contourner cette restriction. |
| `worlds` | List of Strings | Noms des mondes ou les commandes listees sont bloquees. |
| `cuboids` | List of Strings | Regions cuboides ou les commandes listees sont bloquees. Format : `world,x1,y1,z1,x2,y2,z2` |

**Format cuboide :** `world,x1,y1,z1,x2,y2,z2`
- `world` -- Le nom du monde.
- `x1,y1,z1` -- Coordonnees du premier coin.
- `x2,y2,z2` -- Coordonnees du second coin.

Le cuboide est defini par deux coins opposes, et tout joueur se trouvant a l'interieur de la zone englobante sera empeche d'utiliser les commandes listees.

:::info
Vous pouvez definir plusieurs entrees de restriction, chacune avec son propre ensemble de commandes, mondes, cuboides et permissions de contournement.
:::

---

## Poubelle

Configurez l'inventaire poubelle (elimination) que les joueurs peuvent ouvrir avec `/trash`. Les objets places dans cet inventaire sont definitivement supprimes lorsque l'inventaire est ferme.

```yaml
trash-size: 54
```

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `trash-size` | Integer | `54` | Nombre d'emplacements dans l'inventaire poubelle. Doit etre un multiple de 9. |

**Valeurs valides :** `9`, `18`, `27`, `36`, `45`, `54`

Celles-ci correspondent a 1 a 6 rangees d'un inventaire de type coffre.

---

## Materiaux Compactables

Definissez quels objets peuvent etre compactes en leur forme de bloc en utilisant les commandes `/compact` et `/compactall`. Chaque entree associe un materiau de base a sa forme compactee (bloc). Neuf materiaux de base sont consommes pour produire un bloc.

```yaml
compact-materials:
  - COAL:COAL_BLOCK
  - REDSTONE:REDSTONE_BLOCK
  - LAPIS_LAZULI:LAPIS_BLOCK
  - DIAMOND:DIAMOND_BLOCK
  - EMERALD:EMERALD_BLOCK
  - IRON_INGOT:IRON_BLOCK
  - GOLD_INGOT:GOLD_BLOCK
  - RAW_IRON:RAW_IRON_BLOCK
  - RAW_GOLD:RAW_GOLD_BLOCK
  - RAW_COPPER:RAW_COPPER_BLOCK
  - COPPER_INGOT:COPPER_BLOCK
```

**Conversions de compactage par defaut :**

| Materiau | Compacte En |
|----------|-------------|
| `COAL` | `COAL_BLOCK` |
| `REDSTONE` | `REDSTONE_BLOCK` |
| `LAPIS_LAZULI` | `LAPIS_BLOCK` |
| `DIAMOND` | `DIAMOND_BLOCK` |
| `EMERALD` | `EMERALD_BLOCK` |
| `IRON_INGOT` | `IRON_BLOCK` |
| `GOLD_INGOT` | `GOLD_BLOCK` |
| `RAW_IRON` | `RAW_IRON_BLOCK` |
| `RAW_GOLD` | `RAW_GOLD_BLOCK` |
| `RAW_COPPER` | `RAW_COPPER_BLOCK` |
| `COPPER_INGOT` | `COPPER_BLOCK` |

Vous pouvez ajouter des entrees personnalisees en utilisant le meme format : `SOURCE_MATERIAL:RESULT_MATERIAL`. Les noms de materiaux doivent correspondre a des noms valides de [Bukkit Material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html).

---

## Materiaux Fondables

Definissez quels objets peuvent etre instantanement fondus en utilisant la commande `/furnace`. Chaque entree associe un materiau brut a sa sortie fondue.

```yaml
smeltable-materials:
  - RAW_IRON:IRON_INGOT
  - RAW_GOLD:GOLD_INGOT
  - RAW_COPPER:COPPER_INGOT
  - IRON_ORE:IRON_INGOT
  - GOLD_ORE:GOLD_INGOT
  - COPPER_ORE:COPPER_INGOT
  - COBBLESTONE:STONE
  - SAND:GLASS
  - WET_SPONGE:SPONGE
```

**Conversions de fonte par defaut :**

| Materiau | Fond En |
|----------|---------|
| `RAW_IRON` | `IRON_INGOT` |
| `RAW_GOLD` | `GOLD_INGOT` |
| `RAW_COPPER` | `COPPER_INGOT` |
| `IRON_ORE` | `IRON_INGOT` |
| `GOLD_ORE` | `GOLD_INGOT` |
| `COPPER_ORE` | `COPPER_INGOT` |
| `COBBLESTONE` | `STONE` |
| `SAND` | `GLASS` |
| `WET_SPONGE` | `SPONGE` |

Vous pouvez ajouter des entrees personnalisees en utilisant le meme format : `SOURCE_MATERIAL:RESULT_MATERIAL`. Les noms de materiaux doivent correspondre a des noms valides de [Bukkit Material](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html).

---

## Couleurs des Messages

Configurez le schema de couleurs global utilise pour les messages du plugin. Les couleurs sont specifiees sous forme de codes couleur hexadecimaux.

```yaml
message-colors:
  primary: "#24d65d"
  secondary: "#656665"
  error: "#ff0000"
  success: "#00ff00"
```

| Couleur | Code Hex | Description |
|---------|----------|-------------|
| `primary` | `#24d65d` | Couleur d'accentuation principale utilisee pour les mises en valeur, les valeurs importantes et l'emphase dans les messages. |
| `secondary` | `#656665` | Couleur secondaire utilisee pour le texte moins important comme les libelles et les descriptions. |
| `error` | `#ff0000` | Couleur utilisee pour les messages d'erreur et les avertissements. |
| `success` | `#00ff00` | Couleur utilisee pour les confirmations de succes et les retours positifs. |

Ces couleurs sont appliquees a travers tous les messages du plugin et peuvent etre referencees dans les modeles de messages.

---

## Cooldowns de Chat

Un systeme anti-spam qui applique des cooldowns progressivement croissants aux joueurs qui envoient des messages rapidement. Le cooldown augmente en fonction du nombre de messages envoyes dans une courte fenetre de temps.

```yaml
chat-cooldowns:
  2: 1.5
  4: 5.0
  8: 10.0
```

| Messages Envoyes | Cooldown Applique |
|------------------|-------------------|
| 2 | 1.5 secondes |
| 4 | 5.0 secondes |
| 8 | 10.0 secondes |

**Comment ca fonctionne :**
- Lorsqu'un joueur envoie **2 messages** en succession rapide, un cooldown de **1,5 seconde** est applique avant qu'il puisse envoyer un autre message.
- A **4 messages**, le cooldown augmente a **5 secondes**.
- A **8 messages**, le cooldown augmente a **10 secondes**.

Le compteur de cooldown se reinitialise apres que le joueur cesse d'envoyer des messages pendant un certain temps. Ce systeme est concu pour prevenir le spam dans le chat tout en permettant un flux de conversation normal.

:::info
Les cles representent le seuil de nombre de messages et les valeurs representent la duree du cooldown en secondes. Vous pouvez personnaliser ces seuils et durees pour correspondre aux besoins de votre serveur.
:::

---

## Remplacement de Placeholders

Un systeme puissant pour remplacer dynamiquement les placeholders PlaceholderAPI par du texte formate base sur des conditions configurables. Cela vous permet de transformer les valeurs brutes des placeholders en affichages conviviaux et colores.

Chaque entree de remplacement se compose de :
- **placeholder** : Le placeholder PlaceholderAPI a intercepter et remplacer.
- **conditions** : Une liste de conditions a evaluer par rapport a la valeur resolue du placeholder. Les conditions sont verifiees dans l'ordre ; la premiere condition correspondante determine la sortie.

### Types de Conditions

| Type | Description |
|------|-------------|
| `STRING` | Correspond lorsque la valeur resolue du placeholder est exactement egale a la chaine `value` specifiee. |
| `NUMBER` | Correspond lorsque la valeur resolue du placeholder (analysee comme un nombre) satisfait la plage `min` et/ou `max`. |

### Exemple : Affichage du Ping

Cet exemple remplace le placeholder `%player_ping%` par du texte colore en fonction de la latence du joueur :

```yaml
replace-placeholders:
  - placeholder: "%player_ping%"
    conditions:
      - type: NUMBER
        min: 0
        max: 50
        result: "<#00ff00>%player_ping%ms"
      - type: NUMBER
        min: 51
        max: 100
        result: "<#ffff00>%player_ping%ms"
      - type: NUMBER
        min: 101
        max: 200
        result: "<#ff8800>%player_ping%ms"
      - type: NUMBER
        min: 201
        result: "<#ff0000>%player_ping%ms"
```

**Comportement resultant :**

| Plage de Ping | Couleur d'Affichage | Exemple de Sortie |
|---------------|---------------------|-------------------|
| 0 -- 50 ms | Vert (`#00ff00`) | `50ms` |
| 51 -- 100 ms | Jaune (`#ffff00`) | `75ms` |
| 101 -- 200 ms | Orange (`#ff8800`) | `150ms` |
| 201+ ms | Rouge (`#ff0000`) | `300ms` |

### Proprietes des Conditions

**Pour les conditions `NUMBER` :**

| Propriete | Type | Requis | Description |
|-----------|------|--------|-------------|
| `type` | String | Oui | Doit etre `NUMBER`. |
| `min` | Number | Non | Valeur minimale (inclusive). Omettez pour aucune borne inferieure. |
| `max` | Number | Non | Valeur maximale (inclusive). Omettez pour aucune borne superieure. |
| `result` | String | Oui | Le texte de remplacement. Peut inclure le placeholder original et le formatage MiniMessage. |

**Pour les conditions `STRING` :**

| Propriete | Type | Requis | Description |
|-----------|------|--------|-------------|
| `type` | String | Oui | Doit etre `STRING`. |
| `value` | String | Oui | La chaine exacte a comparer avec la valeur resolue du placeholder. |
| `result` | String | Oui | Le texte de remplacement. Peut inclure le placeholder original et le formatage MiniMessage. |

:::tip
Vous pouvez utiliser ce systeme pour creer des soldes d'economie colores, des affichages de sante, des prefixes de rang, et tout autre texte dynamique base sur les placeholders.
:::

---

## Parametres de Vol

Configurez le comportement lie au vol, y compris la gestion du vol temporaire, les restrictions de monde et les minuteries de notification.

```yaml
temp-fly-task: 1
disable-fly-world:
  - "world_pvp"
enable-fly-return: true
fly-task-announce:
  - 300
  - 120
  - 60
  - 30
  - 10
  - 5
  - 4
  - 3
  - 2
  - 1
```

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `temp-fly-task` | Integer | `1` | Intervalle en secondes auquel le minuteur de vol temporaire est verifie et mis a jour. |
| `disable-fly-world` | List of Strings | `[]` | Liste des noms de mondes ou le vol est automatiquement desactive a l'entree. |
| `enable-fly-return` | Boolean | `true` | Lorsque defini sur `true`, restaure l'etat de vol du joueur lorsqu'il retourne dans un monde autorisant le vol apres avoir quitte un monde restreint. |
| `fly-task-announce` | List of Integers | *(voir ci-dessus)* | Seuils de temps restant (en secondes) auxquels le joueur est notifie que son vol temporaire est sur le point d'expirer. |

**Comment fonctionnent les annonces de vol temporaire :**

La liste `fly-task-announce` definit les valeurs exactes de temps restant auxquelles une notification est envoyee. Dans la configuration par defaut, un joueur avec le vol temporaire recevra un avertissement a 5 minutes, 2 minutes, 1 minute, 30 secondes, 10 secondes, puis un decompte de 5 a 1 seconde.

:::info
La valeur `temp-fly-task` controle la frequence a laquelle le plugin verifie le temps de vol restant. Une valeur de `1` signifie qu'il verifie chaque seconde, ce qui est recommande pour des notifications de decompte precises.
:::

---

## Divers

Cette section couvre divers parametres independants qui controlent le comportement global du plugin.

### Desactivation du Back par Monde

Une liste de mondes ou la commande `/back` est desactivee. Les joueurs qui meurent ou se teleportent dans ces mondes n'auront pas leur position precedente sauvegardee.

```yaml
disable-back-world:
  - "world_pvp"
```

### Mots Aleatoires

Une liste de mots utilises pour la generation de mots aleatoires au sein du plugin (par exemple, pour la generation de noms aleatoires ou les invites de confirmation).

```yaml
random-words:
  - "apple"
  - "banana"
  - "cherry"
  - "diamond"
  - "emerald"
  - "fire"
  - "gold"
  - "honey"
  - "iron"
  - "jungle"
```

### Activer les Noms de Joueurs Hors Ligne

```yaml
enable-offline-player-names: true
```

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable-offline-player-names` | Boolean | `true` | Lorsqu'active, le plugin resout et met en cache les noms des joueurs hors ligne pour une utilisation dans l'auto-completion par tabulation et les commandes acceptant des noms de joueurs en argument. |

### UUIDs en Liste Noire

Une liste d'UUIDs de joueurs mis en liste noire pour certaines fonctionnalites du plugin. Les joueurs avec des UUIDs en liste noire peuvent etre exclus des classements, des actions economiques ou d'autres systemes.

```yaml
blacklist-uuids:
  - "00000000-0000-0000-0000-000000000000"
```

### Options Par Defaut

Configurez l'etat par defaut des options joueur activables/desactivables. Chaque option est definie sur `true` (activee) ou `false` (desactivee) par defaut pour tous les joueurs. Les joueurs peuvent les modifier individuellement via les commandes en jeu.

```yaml
default-options:
  SOCIAL_SPY: false
  GOD: false
  BAN: false
  MUTE: false
  INVSEE: false
  VANISH: false
  PRIVATE_MESSAGE_DISABLE: false
  PAY_DISABLE: false
  POWER_TOOLS_DISABLE: false
  DISABLE_SCOREBOARD: false
  NIGHT_VISION: false
  PHANTOMS_DISABLE: false
  WORLDEDIT_INVENTORY: false
  WORLDEDIT_BOSSBAR_DISABLE: false
```

| Option | Par Defaut | Description |
|--------|------------|-------------|
| `SOCIAL_SPY` | `false` | Indique si l'espionnage social (visualisation des messages prives entre autres joueurs) est active par defaut. |
| `GOD` | `false` | Indique si le mode dieu (invincibilite) est active par defaut. |
| `BAN` | `false` | Indique si le joueur est banni par defaut. |
| `MUTE` | `false` | Indique si le joueur est mute par defaut. |
| `INVSEE` | `false` | Indique si la visualisation d'inventaire est activee par defaut. |
| `VANISH` | `false` | Indique si le mode vanish (invisibilite) est active par defaut. |
| `PRIVATE_MESSAGE_DISABLE` | `false` | Indique si la reception de messages prives est desactivee par defaut. |
| `PAY_DISABLE` | `false` | Indique si la reception de paiements est desactivee par defaut. |
| `POWER_TOOLS_DISABLE` | `false` | Indique si les power tools (objets lies a des commandes) sont desactives par defaut. |
| `DISABLE_SCOREBOARD` | `false` | Indique si l'affichage du scoreboard est desactive par defaut. |
| `NIGHT_VISION` | `false` | Indique si la vision nocturne permanente est activee par defaut. |
| `PHANTOMS_DISABLE` | `false` | Indique si l'apparition des phantoms est desactivee par defaut pour le joueur. |
| `WORLDEDIT_INVENTORY` | `false` | Indique si le mode inventaire WorldEdit est active par defaut. |
| `WORLDEDIT_BOSSBAR_DISABLE` | `false` | Indique si la barre de boss de progression WorldEdit est desactivee par defaut. |

### Sauvegarde Automatique par Lot

```yaml
batch-auto-save: 600
```

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `batch-auto-save` | Integer | `600` | Intervalle en secondes entre les sauvegardes automatiques par lot des donnees joueurs dans la base de donnees. La valeur par defaut est de 600 secondes (10 minutes). |

### Activer le Journal des Commandes

```yaml
enable-command-log: false
```

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable-command-log` | Boolean | `false` | Lorsqu'active, enregistre toutes les commandes executees par les joueurs dans la base de donnees a des fins d'audit. |

### Distance de Proximite

```yaml
near-distance: 200
```

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `near-distance` | Integer | `200` | Le rayon (en blocs) utilise par la commande `/near` pour trouver les joueurs a proximite. |

### Format de Date Global

```yaml
global-date-format: "dd/MM/yyyy HH:mm:ss"
```

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `global-date-format` | String | `dd/MM/yyyy HH:mm:ss` | Le modele de format de date utilise dans tout le plugin pour l'affichage des dates et heures. Suit les modeles [Java SimpleDateFormat](https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html). |

**Modeles de format courants :**

| Modele | Description | Exemple |
|--------|-------------|---------|
| `dd/MM/yyyy HH:mm:ss` | Jour/Mois/Annee heure 24h | `04/02/2026 14:30:00` |
| `MM/dd/yyyy hh:mm a` | Style americain avec AM/PM | `02/04/2026 02:30 PM` |
| `yyyy-MM-dd HH:mm:ss` | Style ISO 8601 | `2026-02-04 14:30:00` |

---

## Configuration Par Defaut Complete

Ci-dessous se trouve le fichier `config.yml` complet par defaut avec toutes les sections et leurs valeurs par defaut pour reference :

```yaml
#
# zEssentials - Main Configuration
#

# Debug mode - Enable verbose logging for troubleshooting
enable-debug: false

# Storage configuration
storage-type: SQLITE
server-type: PAPER

# Database configuration (for MYSQL and HIKARICP storage types)
database-configuration:
  table-prefix: "zessentials_"
  host: "192.168.10.10"
  port: 3306
  user: "homestead"
  password: "secret"
  database: "zessentials"
  debug: false

# Redis configuration (for REDIS server type)
redis-configuration:
  host: "127.0.0.1"
  port: 6379
  password: ""

# Commands that always have cooldowns (even with bypass permission)
force-commands:
  - "/essversion"

# Allow players with essentials.bypass.cooldown to skip cooldowns
enable-cooldown-bypass: true

# Command cooldowns with permission-based overrides
command-cooldowns:
  - command: "heal"
    cooldown: 60
    permissions:
      - permission: "essentials.cooldowns.vip"
        cooldown: 40
      - permission: "essentials.cooldowns.staff"
        cooldown: 20
  - command: "tpr"
    cooldown: 300
    permissions:
      - permission: "essentials.cooldowns.vip"
        cooldown: 120
      - permission: "essentials.cooldowns.staff"
        cooldown: 0

# Command restrictions by world and cuboid region
command-restrictions:
  - commands:
      - "heal"
      - "feed"
    bypass-permission: "essentials.bypass.restriction"
    worlds:
      - "world_pvp"
    cuboids:
      - "world,100,0,100,200,256,200"

# Trash inventory size (must be a multiple of 9: 9, 18, 27, 36, 45, 54)
trash-size: 54

# Compact material conversions (9 items -> 1 block)
compact-materials:
  - COAL:COAL_BLOCK
  - REDSTONE:REDSTONE_BLOCK
  - LAPIS_LAZULI:LAPIS_BLOCK
  - DIAMOND:DIAMOND_BLOCK
  - EMERALD:EMERALD_BLOCK
  - IRON_INGOT:IRON_BLOCK
  - GOLD_INGOT:GOLD_BLOCK
  - RAW_IRON:RAW_IRON_BLOCK
  - RAW_GOLD:RAW_GOLD_BLOCK
  - RAW_COPPER:RAW_COPPER_BLOCK
  - COPPER_INGOT:COPPER_BLOCK

# Smeltable material conversions (instant furnace)
smeltable-materials:
  - RAW_IRON:IRON_INGOT
  - RAW_GOLD:GOLD_INGOT
  - RAW_COPPER:COPPER_INGOT
  - IRON_ORE:IRON_INGOT
  - GOLD_ORE:GOLD_INGOT
  - COPPER_ORE:COPPER_INGOT
  - COBBLESTONE:STONE
  - SAND:GLASS
  - WET_SPONGE:SPONGE

# Global message color scheme
message-colors:
  primary: "#24d65d"
  secondary: "#656665"
  error: "#ff0000"
  success: "#00ff00"

# Chat anti-spam cooldowns (message count threshold: cooldown in seconds)
chat-cooldowns:
  2: 1.5
  4: 5.0
  8: 10.0

# Placeholder replacement system
replace-placeholders:
  - placeholder: "%player_ping%"
    conditions:
      - type: NUMBER
        min: 0
        max: 50
        result: "<#00ff00>%player_ping%ms"
      - type: NUMBER
        min: 51
        max: 100
        result: "<#ffff00>%player_ping%ms"
      - type: NUMBER
        min: 101
        max: 200
        result: "<#ff8800>%player_ping%ms"
      - type: NUMBER
        min: 201
        result: "<#ff0000>%player_ping%ms"

# Fly settings
temp-fly-task: 1
disable-fly-world:
  - "world_pvp"
enable-fly-return: true
fly-task-announce:
  - 300
  - 120
  - 60
  - 30
  - 10
  - 5
  - 4
  - 3
  - 2
  - 1

# Worlds where /back is disabled
disable-back-world:
  - "world_pvp"

# Random words for generation features
random-words:
  - "apple"
  - "banana"
  - "cherry"
  - "diamond"
  - "emerald"
  - "fire"
  - "gold"
  - "honey"
  - "iron"
  - "jungle"

# Resolve and cache offline player names for tab-completion
enable-offline-player-names: true

# Blacklisted UUIDs excluded from certain features
blacklist-uuids:
  - "00000000-0000-0000-0000-000000000000"

# Default player option states
default-options:
  SOCIAL_SPY: false
  GOD: false
  BAN: false
  MUTE: false
  INVSEE: false
  VANISH: false
  PRIVATE_MESSAGE_DISABLE: false
  PAY_DISABLE: false
  POWER_TOOLS_DISABLE: false
  DISABLE_SCOREBOARD: false
  NIGHT_VISION: false
  PHANTOMS_DISABLE: false
  WORLDEDIT_INVENTORY: false
  WORLDEDIT_BOSSBAR_DISABLE: false

# Auto-save interval in seconds (default: 600 = 10 minutes)
batch-auto-save: 600

# Log all player commands to the database
enable-command-log: false

# Radius in blocks for the /near command
near-distance: 200

# Global date format (Java SimpleDateFormat pattern)
global-date-format: "dd/MM/yyyy HH:mm:ss"
```
