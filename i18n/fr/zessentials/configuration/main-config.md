---
title: Configuration Principale
description: Fichier de configuration principal (config.yml) pour zEssentials
---

# Configuration Principale

Cette page documente chaque option du fichier principal `config.yml` situé dans `plugins/zEssentials/config.yml`. Ce fichier contrôle le comportement global du plugin : stockage, cooldowns, restrictions, couleurs des messages, paramètres de vol, etc. Les paramètres propres à chaque module se trouvent dans `plugins/zEssentials/modules/<module>/config.yml`.

---

## Debug

Active ou désactive le mode debug. Lorsqu'il est activé, le plugin affiche des logs supplémentaires dans la console, ce qui est utile pour diagnostiquer un problème.

```yaml
enable-debug: false
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `enable-debug` | Boolean | `false` | Active les logs de debug détaillés dans la console du serveur |

<CalloutContainer type="info">

<CalloutDescription>
Si vous demandez de l'aide, activez le mode debug et envoyez les logs. Ne le laissez activé que pendant le diagnostic : la sortie de debug peut être très verbeuse.
</CalloutDescription>

</CalloutContainer>

---

## Stockage

Configure la façon dont zEssentials stocke les données, le type de serveur et les informations de connexion à la base de données et à Redis. Consultez la page [Base de données](../database) pour le schéma complet.

### Type de stockage

```yaml
storage-type: SQLITE
```

| Valeur | Description |
|--------|-------------|
| `SQLITE` | Stockage local dans un fichier (`plugins/zEssentials/database.db`). Uniquement prévu pour installer et tester le plugin, certaines fonctionnalités sont limitées. |
| `MYSQL` | Base MySQL via un pool de connexions HikariCP. |
| `MARIADB` | Base MariaDB via un pool de connexions HikariCP, avec le driver MariaDB. |
| `HIKARICP` | Base MySQL/MariaDB via un pool de connexions HikariCP. Recommandé en production. |
| `JSON` | Un fichier JSON par joueur dans `plugins/zEssentials/users/`. Toutes les fonctionnalités ne sont pas supportées. |

<CalloutContainer type="warning">

<CalloutDescription>
Utilisez `MYSQL`, `MARIADB` ou `HIKARICP` en production. SQLite sert uniquement à installer le plugin et à faire des tests, et le stockage JSON ne supporte pas toutes les fonctionnalités (coffres, boîte aux lettres d'items, historique du chat, baltop...).
</CalloutDescription>

</CalloutContainer>

### Type de serveur

```yaml
server-type: PAPER
```

| Valeur | Description |
|--------|-------------|
| `PAPER` | Mode par défaut. Toutes les données sont gérées localement. |
| `REDIS` | Mode multi-serveurs avec synchronisation via le pub/sub Redis. **Actuellement en développement** : dans la version actuelle, le serveur Redis n'est pas démarré et cette valeur se comporte comme `PAPER`. |

### Configuration de la base de données

Utilisée lorsque `storage-type` vaut `MYSQL`, `MARIADB` ou `HIKARICP`.

```yaml
database-configuration:
  table-prefix: "zessentials_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: 'secret'
  database: zessentials
  debug: false
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `table-prefix` | String | `zessentials_` | Préfixe appliqué à toutes les tables. Utile si la base est partagée avec d'autres plugins. Il est conseillé de ne pas le modifier. |
| `host` | String | `192.168.10.10` | Nom d'hôte ou adresse IP du serveur de base de données. |
| `port` | Integer | `3306` | Port d'écoute du serveur de base de données. |
| `user` | String | `homestead` | Nom d'utilisateur de la base de données. |
| `password` | String | `secret` | Mot de passe de la base de données. |
| `database` | String | `zessentials` | Nom de la base de données à utiliser. Elle doit déjà exister. |
| `debug` | Boolean | `false` | Affiche les requêtes SQL exécutées dans la console. |

<CalloutContainer type="warning">

<CalloutDescription>
Changez les identifiants par défaut avant de passer en production. Les valeurs par défaut (`homestead` / `secret`) sont des exemples et ne doivent pas être utilisées sur un serveur en ligne.
</CalloutDescription>

</CalloutContainer>

### Sauvegarde par lots

```yaml
batch-auto-save: 10000
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `batch-auto-save` | Long | `10000` | Intervalle en **millisecondes** entre deux écritures groupées en base. Les logs (commandes, messages du chat, messages privés, transactions économiques) et les mises à jour du temps de vol sont mis en file d'attente puis envoyés en un seul lot à cet intervalle. |

### Configuration Redis

Utilisée par le type de serveur `REDIS`.

```yaml
redis-configuration:
  host: "192.168.10.10"
  port: 6379
  password: "123456a"
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `host` | String | `192.168.10.10` | Nom d'hôte ou adresse IP du serveur Redis. |
| `port` | Integer | `6379` | Port d'écoute du serveur Redis. |
| `password` | String | `123456a` | Mot de passe Redis. |

---

## Commandes

### Commandes forcées

Les commandes listées ici restent utilisables même si leur module est désactivé. Indiquez le nom principal de la commande, sans le `/`.

```yaml
force-commands:
  # - rtp
  # - home
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `force-commands` | Liste de String | *(vide)* | Noms principaux des commandes qui restent disponibles quand leur module est désactivé. |

### Contournement des cooldowns

```yaml
enable-cooldown-bypass: true
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `enable-cooldown-bypass` | Boolean | `true` | Si activé, les joueurs ayant la permission `essentials.bypass.cooldown` ignorent les cooldowns définis dans `command-cooldowns`. |

### Cooldowns des commandes

Définit un cooldown (en secondes) par commande, avec des valeurs différentes selon les permissions. Le cooldown est appliqué après l'exécution réussie de la commande.

- **command** : le nom principal de la commande (sans le `/`).
- **cooldown** : le cooldown de base en secondes.
- **permissions** : une liste de cooldowns par permission. Si le joueur possède plusieurs permissions correspondantes, le cooldown **le plus bas** est utilisé. Un cooldown de `0` signifie aucun cooldown.

```yaml
command-cooldowns:
  - command: heal
    cooldown: 60
    permissions:
      - permission: "essentials.cooldown.heal.vip"
        cooldown: 40
      - permission: "essentials.cooldown.heal.staff"
        cooldown: 20
  - command: tpr
    cooldown: 300
    permissions:
      - permission: "essentials.cooldown.rtp.vip"
        cooldown: 120
      - permission: "essentials.cooldown.rtp.staff"
        cooldown: 0
```

**Exemple détaillé pour `heal` :**

| Type de joueur | Permission | Cooldown |
|----------------|------------|----------|
| Par défaut | *(aucune)* | 60 secondes |
| VIP | `essentials.cooldown.heal.vip` | 40 secondes |
| Staff | `essentials.cooldown.heal.staff` | 20 secondes |

**Exemple détaillé pour `tpr` :**

| Type de joueur | Permission | Cooldown |
|----------------|------------|----------|
| Par défaut | *(aucune)* | 300 secondes (5 minutes) |
| VIP | `essentials.cooldown.rtp.vip` | 120 secondes (2 minutes) |
| Staff | `essentials.cooldown.rtp.staff` | 0 seconde (aucun cooldown) |

### Restrictions de commandes

Désactive des commandes dans certains mondes ou à l'intérieur de zones cuboïdes. Les joueurs ayant la permission de contournement ignorent la restriction.

```yaml
command-restrictions:
  - commands:
      - "spawn"
    bypass-permission: "essentials.bypass.commandrestriction.spawn"
    worlds:
      - "world_nether"
    cuboids:
      - "world,0,0,0,100,255,100"
```

| Option | Type | Description |
|--------|------|-------------|
| `commands` | Liste de String | Les commandes à restreindre (sans le `/`). Le label tapé par le joueur est comparé, ajoutez donc aussi les alias si nécessaire. |
| `bypass-permission` | String | Permission permettant d'ignorer cette restriction. |
| `worlds` | Liste de String | Mondes dans lesquels les commandes sont bloquées. |
| `cuboids` | Liste de String | Zones cuboïdes dans lesquelles les commandes sont bloquées. Format : `world,x1,y1,z1,x2,y2,z2` |

Le cuboïde est défini par deux coins opposés ; tout joueur se trouvant à l'intérieur ne peut pas utiliser les commandes listées. Vous pouvez définir plusieurs restrictions.

### Anti-spam des commandes

Cooldown progressif empêchant les joueurs de spammer des commandes. Chaque entrée signifie : « si le joueur a exécuté `messages` commandes durant les `cooldown` dernières millisecondes, la commande suivante est bloquée ».

```yaml
cooldowns:
  - messages: 2
    cooldown: 1500 # max 1.5s
  - messages: 4
    cooldown: 5000 # max 5s
  - messages: 8
    cooldown: 10000 # max 10s
```

| Option | Type | Description |
|--------|------|-------------|
| `messages` | Integer | Nombre de commandes exécutées. |
| `cooldown` | Long | Fenêtre de temps en millisecondes. |

Pour désactiver ce système, utilisez `cooldowns: []`. Les joueurs ayant la permission `essentials.cooldown.command.bypass` ne sont pas concernés.

### Log des commandes

```yaml
enable-command-log: true
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `enable-command-log` | Boolean | `true` | Enregistre chaque commande exécutée par les joueurs dans la table `commands`. Fonctionne uniquement avec un stockage SQL. |

---

## Items

### Poubelle

```yaml
trash-size: 27
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `trash-size` | Integer | `27` | Taille de l'inventaire `/trash`. Doit valoir `9`, `18`, `27`, `36`, `45` ou `54`. |

### Matériaux compactables

Matériaux pouvant être compactés avec les commandes `/compact` (`/condense`) et `/compactall` (`/condenseall`). Chaque entrée associe un matériau (`from`) à sa forme compactée (`to`).

```yaml
compact-materials:
  - from: COAL
    to: COAL_BLOCK
  - from: REDSTONE
    to: REDSTONE_BLOCK
  - from: LAPIS_LAZULI
    to: LAPIS_BLOCK
  - from: IRON_INGOT
    to: IRON_BLOCK
  - from: GOLD_INGOT
    to: GOLD_BLOCK
  - from: IRON_NUGGET
    to: IRON_INGOT
  - from: GOLD_NUGGET
    to: GOLD_INGOT
  - from: DIAMOND
    to: DIAMOND_BLOCK
  - from: EMERALD
    to: EMERALD_BLOCK
  - from: COPPER_INGOT
    to: COPPER_BLOCK
  - from: NETHERITE_INGOT
    to: NETHERITE_BLOCK
```

Les noms doivent correspondre à des [Material Bukkit](https://jd.papermc.io/paper/org/bukkit/Material.html) valides.

### Matériaux cuisables

Matériaux pouvant être cuits instantanément avec la commande `/furnace`.

```yaml
smeltable-materials:
  - from: RAW_IRON
    to: IRON_INGOT
  - from: RAW_COPPER
    to: COPPER_INGOT
  - from: RAW_GOLD
    to: GOLD_INGOT
  - from: SAND
    to: GLASS
  - from: CLAY_BALL
    to: BRICK
  - from: ANCIENT_DEBRIS
    to: NETHERITE_SCRAP
  - from: WET_SPONGE
    to: SPONGE
  - from: CACTUS
    to: GREEN_DYE
  - from: KELP
    to: DRIED_KELP
```

---

## Couleurs des messages

Clés de couleur remplacées dans tous les messages du plugin. Vous pouvez ajouter vos propres clés.

```yaml
message-colors:
  - key: "<primary>"
    color: "#24d65d"
  - key: "<secondary>"
    color: "#656665"
  - key: "<error>"
    color: "#ff0000"
  - key: "<success>"
    color: "#00ff00"
```

| Clé | Défaut | Description |
|-----|--------|-------------|
| `<primary>` | `#24d65d` | Couleur principale pour les éléments mis en avant et les valeurs importantes. |
| `<secondary>` | `#656665` | Couleur secondaire pour le texte moins important. |
| `<error>` | `#ff0000` | Couleur des messages d'erreur. |
| `<success>` | `#00ff00` | Couleur des confirmations de succès. |

---

## Placeholders

### Valeur vide

```yaml
placeholder-empty: "Empty"
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `placeholder-empty` | String | `Empty` | Valeur renvoyée par les placeholders lorsqu'aucune donnée n'est disponible. |

### Remplacement de placeholders

Remplace le résultat d'un placeholder PlaceholderAPI par une autre valeur, par exemple pour ajouter des couleurs. Utilisez le placeholder `%zessentials_replace_<placeholder>%` pour appliquer la configuration (par exemple `%zessentials_replace_player_ping%`).

```yaml
replace-placeholders:
  - placeholder: 'player_ping' # Placeholder à remplacer, sans %
    default: '&c%result%' # Utilisé si aucune condition ne correspond
    replaces:
      - type: STRING
        equalsTo: 0
        value: '&aWHOA YOU DONT HAVE PING WTF YOU ARE IN A DATACENTER ?'
      - type: NUMBER
        max: 50
        value: '&a%result%'
      - type: NUMBER
        max: 99
        value: '&2%result%'
      - type: NUMBER
        max: 199
        value: '&e%result%'
      - type: NUMBER
        max: 299
        value: '&c%result%'
```

| Option | Description |
|--------|-------------|
| `placeholder` | Le placeholder PlaceholderAPI à remplacer, sans les `%`. |
| `default` | Valeur utilisée lorsqu'aucune condition ne correspond. |
| `replaces` | Liste de conditions, vérifiées dans l'ordre. La première condition qui correspond est utilisée. |

**Types de conditions :**

| Type | Propriétés | Correspond lorsque |
|------|------------|--------------------|
| `STRING` | `equalsTo`, `value` | Le résultat du placeholder est égal (sans tenir compte de la casse) à `equalsTo`. |
| `NUMBER` | `max`, `value` | Le résultat du placeholder est un nombre inférieur ou égal à `max`. |

Dans `value` et `default`, `%result%` est remplacé par la valeur d'origine du placeholder.

### Mots aléatoires

Mots renvoyés par le placeholder `%zessentials_random_word%` (un mot n'est jamais donné deux fois tant que la liste n'a pas été réinitialisée avec `/zessentials clear-random-word`).

```yaml
random-words:
  - "enderdragon"
  - "netherite"
  - "crafting"
  - "survival"
  - "adventure"
  - "exploration"
  - "obsidian"
  - "diamond"
  - "goldmine"
  - "enderchest"
```

---

## Near

```yaml
near-distance: 50.0

near-direction-replacements:
  forward: "↑"
  forward-right: "↗"
  right: "→"
  back-right: "↘"
  back: "↓"
  back-left: "↙"
  left: "←"
  forward-left: "↖"

near-permissions:
  - permission: "essentials.near.vip"
    distance: 100.0
  - permission: "essentials.near.staff"
    distance: 200.0
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `near-distance` | Double | `50.0` | Rayon par défaut (en blocs) de la commande `/near`. |
| `near-direction-replacements` | Section | *(flèches)* | Flèches utilisées pour afficher la direction de chaque joueur dans `/near`. |
| `near-permissions` | Liste | *(voir ci-dessus)* | Rayon selon la permission. La première permission que possède le joueur est utilisée. |

---

## Temps

```yaml
day-time: 1000
night-time: 13000
time-smooth-change: false
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `day-time` | Long | `1000` | Heure du monde définie par la commande `/day`. |
| `night-time` | Long | `13000` | Heure du monde définie par la commande `/night`. |
| `time-smooth-change` | Boolean | `false` | Anime le changement d'heure de `/day` et `/night` au lieu d'un changement instantané. |

---

## Paramètres de vol

```yaml
temp-fly-task: false

disable-fly-world:
  - world_the_end

enable-fly-return: false

fly-task-announce:
  - 7200 # 2 heures
  - 3600 # 1 heure
  - 1800 # 30 minutes
  - 900 # 15 minutes
  - 300 # 5 minutes
  - 120 # 2 minutes
  - 60 # 1 minute
  - 30
  - 10
  - 5
  - 4
  - 3
  - 2
  - 1
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `temp-fly-task` | Boolean | `false` | Active la tâche (exécutée chaque seconde) qui décrémente le temps de vol temporaire des joueurs (`/fly add`, `/fly set`...). |
| `disable-fly-world` | Liste de String | `[world_the_end]` | Mondes dans lesquels le vol est désactivé. Contournement : `essentials.fly.bypass.world`. |
| `enable-fly-return` | Boolean | `false` | Réactive le vol lorsque le joueur revient dans un monde où il est autorisé. |
| `fly-task-announce` | Liste d'Integer | *(voir ci-dessus)* | Temps de vol restants (en secondes) auxquels le joueur est prévenu. |

---

## Back

```yaml
disable-back-world:
  - world_the_end
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `disable-back-world` | Liste de String | `[world_the_end]` | Mondes dans lesquels `/back` est désactivé : la dernière position n'y est pas enregistrée. |

---

## Joueurs

### Noms des joueurs hors ligne

```yaml
enable-offline-player-names: true
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `enable-offline-player-names` | Boolean | `true` | Affiche les noms des joueurs en ligne **et** hors ligne dans l'autocomplétion des commandes. |

### UUID blacklistés

Les joueurs dont l'UUID est listé ici ne peuvent pas se connecter au serveur (ils sont expulsés à la connexion avec le message « Unable to verify your connection, please try again. »).

```yaml
blacklist-uuids:
  - "00000000-0000-0000-0000-000000000000"
```

### Options par défaut

Valeurs des options appliquées aux **nouveaux joueurs** lors de leur première connexion.

```yaml
default-options:
  - option: WORLDEDIT_INVENTORY
    value: true
```

| Option | Description |
|--------|-------------|
| `SOCIAL_SPY` | Espionner les messages privés entre joueurs. |
| `GOD` | Rend le joueur invincible. |
| `BAN` | Le joueur est banni. |
| `MUTE` | Le joueur est muet. |
| `INVSEE` | Permet de consulter l'inventaire des autres joueurs. |
| `VANISH` | Rend le joueur invisible. |
| `PRIVATE_MESSAGE_DISABLE` | Désactive les messages privés. |
| `PAY_DISABLE` | Désactive la réception de paiements. |
| `POWER_TOOLS_DISABLE` | Désactive les power tools. |
| `DISABLE_SCOREBOARD` | Désactive le scoreboard. |
| `NIGHT_VISION` | Vision nocturne permanente. |
| `PHANTOMS_DISABLE` | Désactive l'apparition des phantoms. |
| `WORLDEDIT_INVENTORY` | Utilise l'inventaire du joueur pour WorldEdit. |
| `WORLDEDIT_BOSSBAR_DISABLE` | Désactive la boss bar de WorldEdit. |
| `TELEPORT_REQUEST_DISABLE` | Désactive la réception des demandes de téléportation (`/tpa`). |
| `TELEPORT_HERE_REQUEST_DISABLE` | Désactive la réception des demandes `/tpahere`. |
| `DEATH_MESSAGE_DISABLE` | Masque les messages de mort. |
| `PAY_NOTIFICATION_DISABLE` | Désactive les notifications de paiement. |
| `PLAYER_PING_SOUND_DISABLE` | Désactive le son de ping du chat. |

### Téléportation à la première connexion

```yaml
enable-first-join-teleport: false
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `enable-first-join-teleport` | Boolean | `false` | Téléporte les joueurs lors de leur première connexion au premier spawn configuré, ou au spawn si aucun premier spawn n'est défini, ou à une position aléatoire si `enable-first-join-rtp` est activé dans `modules/teleportation/config.yml`. **Désactivé par défaut depuis la 1.0.3.9.** |

<CalloutContainer type="info">

<CalloutDescription>
Si vous utilisiez le premier spawn avant la 1.0.3.9, passez cette option à `true` pour conserver l'ancien comportement.
</CalloutDescription>

</CalloutContainer>

---

## Format de date

```yaml
global-date-format: "yyyy-MM-dd HH:mm:ss"
```

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `global-date-format` | String | `yyyy-MM-dd HH:mm:ss` | Format de date utilisé lorsqu'aucun autre format n'est disponible. Suit les motifs de [Java SimpleDateFormat](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/text/SimpleDateFormat.html). |

**Formats courants :**

| Motif | Description | Exemple |
|-------|-------------|---------|
| `yyyy-MM-dd HH:mm:ss` | Style ISO 8601 | `2026-02-04 14:30:00` |
| `dd/MM/yyyy HH:mm:ss` | Jour/Mois/Année, format 24 h | `04/02/2026 14:30:00` |
| `MM/dd/yyyy hh:mm a` | Format américain avec AM/PM | `02/04/2026 02:30 PM` |

---

## Statistiques

Depuis la 1.0.3.9, zEssentials envoie des statistiques d'utilisation et des erreurs anonymes à [FastStats](https://faststats.dev/project/zessentials/). Ce n'est pas configuré dans `config.yml` : FastStats crée son propre fichier de configuration dans le dossier `faststats` de votre répertoire `plugins/`, dans lequel vous pouvez le désactiver.

---

## Configuration par défaut complète

Voici le `config.yml` complet par défaut :

```yaml
# Displays debug items in the console, if you request support, please enable debug and send logs with debugs
enable-debug: false

# Storage:
# SQLITE - For the launch of the plugin only.
# MYSQL - Allows creating a simple connection to the database, only for small servers.
# HIKARICP - HikariCP is a fast and lightweight JDBC connection pool.
storage-type: SQLITE

# PAPER - Default type
# REDIS - Allows connecting several servers (currently in development)
server-type: PAPER

database-configuration:
  table-prefix: "zessentials_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: 'secret'
  database: zessentials
  debug: false

# Sends requests available in batch to the database (history of messages, commands, etc.)
batch-auto-save: 10000

redis-configuration:
  host: "192.168.10.10"
  port: 6379
  password: "123456a"

# Commands that will work even if their module is disabled
force-commands:
  # - rtp
  # - home

enable-cooldown-bypass: true

command-cooldowns:
  - command: heal
    cooldown: 60
    permissions:
      - permission: "essentials.cooldown.heal.vip"
        cooldown: 40
      - permission: "essentials.cooldown.heal.staff"
        cooldown: 20
  - command: tpr
    cooldown: 300
    permissions:
      - permission: "essentials.cooldown.rtp.vip"
        cooldown: 120
      - permission: "essentials.cooldown.rtp.staff"
        cooldown: 0

command-restrictions:
  - commands:
      - "spawn"
    bypass-permission: "essentials.bypass.commandrestriction.spawn"
    worlds:
      - "world_nether"
    cuboids:
      - "world,0,0,0,100,255,100"

trash-size: 27

compact-materials:
  - from: COAL
    to: COAL_BLOCK
  - from: REDSTONE
    to: REDSTONE_BLOCK
  - from: LAPIS_LAZULI
    to: LAPIS_BLOCK
  - from: IRON_INGOT
    to: IRON_BLOCK
  - from: GOLD_INGOT
    to: GOLD_BLOCK
  - from: IRON_NUGGET
    to: IRON_INGOT
  - from: GOLD_NUGGET
    to: GOLD_INGOT
  - from: DIAMOND
    to: DIAMOND_BLOCK
  - from: EMERALD
    to: EMERALD_BLOCK
  - from: COPPER_INGOT
    to: COPPER_BLOCK
  - from: NETHERITE_INGOT
    to: NETHERITE_BLOCK

message-colors:
  - key: "<primary>"
    color: "#24d65d"
  - key: "<secondary>"
    color: "#656665"
  - key: "<error>"
    color: "#ff0000"
  - key: "<success>"
    color: "#00ff00"

cooldowns:
  - messages: 2
    cooldown: 1500 # max 1.5s
  - messages: 4
    cooldown: 5000 # max 5s
  - messages: 8
    cooldown: 10000 # max 10s

enable-command-log: true

smeltable-materials:
  - from: RAW_IRON
    to: IRON_INGOT
  - from: RAW_COPPER
    to: COPPER_INGOT
  - from: RAW_GOLD
    to: GOLD_INGOT
  - from: SAND
    to: GLASS
  - from: CLAY_BALL
    to: BRICK
  - from: ANCIENT_DEBRIS
    to: NETHERITE_SCRAP
  - from: WET_SPONGE
    to: SPONGE
  - from: CACTUS
    to: GREEN_DYE
  - from: KELP
    to: DRIED_KELP

placeholder-empty: "Empty"

near-distance: 50.0

near-direction-replacements:
  forward: "↑"
  forward-right: "↗"
  right: "→"
  back-right: "↘"
  back: "↓"
  back-left: "↙"
  left: "←"
  forward-left: "↖"

day-time: 1000
night-time: 13000
time-smooth-change: false

near-permissions:
  - permission: "essentials.near.vip"
    distance: 100.0
  - permission: "essentials.near.staff"
    distance: 200.0

global-date-format: "yyyy-MM-dd HH:mm:ss"

replace-placeholders:
  - placeholder: 'player_ping'
    default: '&c%result%'
    replaces:
      - type: STRING
        equalsTo: 0
        value: '&aWHOA YOU DONT HAVE PING WTF YOU ARE IN A DATACENTER ?'
      - type: NUMBER
        max: 50
        value: '&a%result%'
      - type: NUMBER
        max: 99
        value: '&2%result%'
      - type: NUMBER
        max: 199
        value: '&e%result%'
      - type: NUMBER
        max: 299
        value: '&c%result%'

temp-fly-task: false

disable-fly-world:
  - world_the_end

enable-fly-return: false

fly-task-announce:
  - 7200
  - 3600
  - 1800
  - 900
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

disable-back-world:
  - world_the_end

random-words:
  - "enderdragon"
  - "netherite"
  - "crafting"
  - "survival"
  - "adventure"
  - "exploration"
  - "obsidian"
  - "diamond"
  - "goldmine"
  - "enderchest"

enable-offline-player-names: true

blacklist-uuids:
  - "00000000-0000-0000-0000-000000000000"

default-options:
  - option: WORLDEDIT_INVENTORY
    value: true

# Teleports players on their first join to the configured first-spawn, spawn, or random teleport location
enable-first-join-teleport: false
```
