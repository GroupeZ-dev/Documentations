---
title: Config.yml
description: Reference du fichier de configuration principal
---

# Config.yml

Le fichier `config.yml` est le fichier de configuration principal de zMenu. Il controle les parametres globaux du plugin, le stockage et la synchronisation multi-serveurs, les menus, les clics, la securite, les caches, les dialogues et l'integration avec le site web.

## Emplacement du fichier

`plugins/zMenu/config.yml`

## Structure du fichier

Le fichier est divise en 10 sections, dans cet ordre :

| # | Section | Contenu |
|---|---------|---------|
| 1 | [General](#1-general) | Fonctionnalites, messages console, verification des mises a jour, fichiers par defaut, MiniMessage |
| 2 | [Debug & logs](#2-debug--logs) | Modes debug, debug de performance, cooldown des logs d'erreur |
| 3 | [Stockage](#3-stockage) | Type de stockage, parametres SQL / MongoDB / Redis, sauvegarde, migration |
| 4 | [Multi-serveurs](#4-multi-serveurs) | Identifiant du serveur, messagerie entre serveurs, transfert de session |
| 5 | [Menus](#5-menus) | Menu principal, menus a charger, actions de fermeture, animations, hot reload |
| 6 | [Clics](#6-clics) | Types de clic, double-clic, cooldown de clic, limiteur de paquets de clic |
| 7 | [Securite & anti-dupe](#7-securite--anti-dupe) | Anti-dupe, protection ghost GUI, commandes OP |
| 8 | [Performance & caches](#8-performance--caches) | FastEvent, caches ItemStack / MiniMessage / PlaceholderAPI / OfflinePlayer |
| 9 | [Dialogues](#9-dialogues) | Listes de dialogues imbriquees, resource pack des canvas de dialogue |
| 10 | [Site web](#10-site-web) | Commande de telechargement, live-sync, URL de l'API |

## Reference complete de la configuration

Voici le `config.yml` par defaut genere par zMenu :

```yaml
# ==================================================================================================
#  zMenu - Main configuration
# ==================================================================================================
#
#  Documentation  : https://docs.groupez.dev/zmenu/getting-started
#  Online editor  : https://minecraft-inventory-builder.com/
#
#  Get 23.5% off at MineStrator with: https://cashback.groupez.dev/
#
#
#  Sections of this file:
#    1. General
#    2. Debug & logs
#    3. Storage
#    4. Multi-server
#    5. Menus
#    6. Clicks
#    7. Security & anti-dupe
#    8. Performance & caches
#    9. Dialogs
#   10. Website (inventory builder)
#


# ==================================================================================================
#  1. GENERAL
# ==================================================================================================

# Turn off the parts of zMenu you do not use.
# A disabled feature registers nothing (no listener, no command, no default file).
#
# Features are read when the server starts:
# restart the server after changing them, /zm reload does not apply them.
features:

  # Custom items of the items folder, their mechanics (itemjoin, on-click),
  # the item update on join and /zm giveitem.
  custom-items: true


# Show information messages in the console,
# for example when an inventory or a command has been loaded successfully.
enable-information-message: true


# Skip the update check at startup.
skip-update-check: false


# Create the default files (inventories, commands, patterns...) when they don't exist.
generate-default-file: true


# Enable MiniMessage format.
# Enables Dialogs support (Paper 1.21.7+). MiniMessage formatting itself is always enabled.
# More info: https://docs.advntr.dev/minimessage/index.html
enable-mini-message-format: true



# ==================================================================================================
#  2. DEBUG & LOGS
# ==================================================================================================

# Show detailed information in the console.
# If you encounter an issue, enable this option and send the errors to support.
enable-debug: false


# Measure the execution time of the plugin.
# Useful to identify bottlenecks and optimize performance.
enable-debug-time: false


# Measure and log the execution time of each step when an inventory opens
# (button building, item rendering, etc.).
enable-performance-debug: false

performance-debug:

  # Minimum execution time (in ms) for an operation to appear in the output.
  # Set to 0 to see every operation.
  threshold-ms: 10

  filter:
    # DISABLED  - Show all operations above threshold-ms
    # WHITELIST - Only show the operations matching the list below
    # BLACKLIST - Hide the operations matching the list below
    #
    # Supports wildcards: "buildButton.*" matches all buildButton operations.
    mode: DISABLED
    operations: []


# Print a message in the console when files are saved or loaded.
enable-log-storage-file: false


# How long, in seconds, to wait before logging the same failing button again.
#
# When the actions of a button throw an error, zMenu logs it once with the full stack trace,
# then stays quiet about that same button for this long. Without it, a player clicking a broken
# button produced one full stack trace per click, filling the console and the log file and
# slowing the server down.
#
# Set to 0 to log every single occurrence.
click-error-log-cooldown-seconds: 30



# ==================================================================================================
#  3. STORAGE
# ==================================================================================================

# Where zMenu stores its data.
#
#   SQLITE     - For the first start and for tests only.
#   MYSQL      - RECOMMENDED
#   MARIADB    - RECOMMENDED
#   POSTGRESQL - Uses database-configuration below (set port to 5432).
#                zMenu downloads the driver on the next start.
#   MONGODB    - Keeps everything in MongoDB (see the mongodb section below).
#                zMenu downloads the driver on the next start.
#   REDIS      - Keeps everything in Redis (see the redis section below).
#                Make sure Redis writes its data to disk (appendonly yes in redis.conf),
#                or a restart of Redis loses it.
#   NONE       - No database at all.
#
# We advise you to use MARIADB or MYSQL. SQLITE is only there to install the plugin and run some
# tests: the plugin works, but not all features are available with SQLITE yet.
# This will be fixed in future plugin updates.
storage-type: SQLITE


# --- SQL database (MYSQL, MARIADB, POSTGRESQL) ----------------------------------------------------

database-configuration:

  # The prefix applied to every table.
  # If several plugins share the same database, each one must have its own prefix.
  # It is advisable not to change this value.
  table-prefix: "zmenu_"

  # IP address of the machine hosting the database.
  host: 192.168.10.10

  # Port of the database (MySQL / MariaDB: 3306, PostgreSQL: 5432).
  port: 3306

  # Database credentials.
  user: homestead
  password: 'secret'

  # Name of the database.
  database: zmenu

  # Enable or not the SQL debug mode.
  debug: false

  # Maximum lifetime of a pooled MySQL or MariaDB connection, in seconds.
  # A connection older than this is retired and replaced. 0 keeps connections until the pool closes.
  # Hikari requires at least 30 seconds. 1800 (30 minutes) is also the default when omitted.
  max-lifetime: 1800

  # Extra driver properties sent with every MySQL, MariaDB or PostgreSQL connection. Examples:
  #   useSSL: "true"                   - MySQL / MariaDB over TLS
  #   allowPublicKeyRetrieval: "true"  - MySQL 8 without TLS ("Public Key Retrieval is not allowed")
  #   sslmode: "disable"               - PostgreSQL without TLS, or "require" to force it
  properties: {}


# --- MongoDB (storage-type MONGODB) ---------------------------------------------------------------

mongodb:

  # mongodb://[user:password@]host:port, or a mongodb+srv:// connection string.
  uri: "mongodb://localhost:27017"

  database: "zmenu"

  # The start of every collection name.
  collection-prefix: "zmenu_"


# --- Redis (storage-type REDIS and messaging-type REDIS) ------------------------------------------
# zMenu downloads the Redis client on the next start after you choose one of them.

redis:

  # redis://[user:password@]host:port/database, or rediss:// for TLS.
  uri: "redis://localhost:6379/0"

  # true for a Redis Cluster, uri then names one of its nodes.
  cluster: false

  # The start of every key zMenu writes. Change it when several networks share one Redis.
  key-prefix: "zmenu"

  # Refuse to start when Redis does not write its data to disk (appendonly no).
  require-aof: false


# --- Saving -----------------------------------------------------------------------------------------

# Time in seconds between two batch saves.
# Instead of running an SQL query for each update, a single query is executed every 10 seconds.
batch-task: 10


# Write the buffered data of a player to the database as soon as they disconnect,
# instead of waiting for the next batch-task cycle.
#
# Buffered data is always written when the server stops, so this only changes how much an outright
# crash can lose: enabled, a crash only loses what arrived since the last disconnect, instead of
# up to a full batch-task interval for every player.
#
# Set to false if the extra write on each quit is too much for your database.
# Several players leaving at the same time are already grouped into a single write.
flush-storage-on-quit: true


# Currently not used: player data is saved through batch-task and flush-storage-on-quit.
seconds-save-player-data: 600
seconds-save-player-inventories: 600


# Save in the database the inventories opened by the players.
enable-player-open-inventory-logs: true


# --- Migration ------------------------------------------------------------------------------------

# To move to another storage-type:
#   1. Copy the data with /zm storage migrate <type>
#   2. Change storage-type
#   3. Restart
#
# When the new type needs a driver zMenu does not have yet (POSTGRESQL, MONGODB, REDIS), set it here and
# restart once before running the command, so zMenu downloads it.
migration-target: ""


# The database /zm storage migrate copies to, when it is not the one of database-configuration,
# for example MariaDB to PostgreSQL. Each value set here replaces the same value of
# database-configuration for the copy only.
#
# After the copy, move these values into database-configuration, change storage-type and restart.
#migration-database-configuration:
#  host: 127.0.0.1
#  port: 5432
#  user: zmenu
#  password: 'secret'
#  database: zmenu



# ==================================================================================================
#  4. MULTI-SERVER
#  Only useful when several servers share the same database.
# ==================================================================================================

# Name of this server, used for the variables of the "server" scope
# (data action with scope: server, %zmenu_server_value_<key>%, /zm variables ... server ...).
#
# Servers sharing one database must each have their own name.
# Leave empty to use a name generated once and kept in plugins/zMenu/server-id.txt.
server-id: ""


# How servers sharing a database tell each other about changes to player and global variables,
# so a value changed on one server is updated on the others.
#
#   AUTO  - With MySQL, MariaDB, PostgreSQL or MongoDB: through a table (collection) of the
#           database, read every messaging-poll-interval seconds.
#           With storage-type REDIS: through Redis pub/sub.
#           SQLite is never shared, so it does nothing there.
#   SQL   - Always through the table of the SQL database, read every messaging-poll-interval
#           seconds, even on SQLite (several servers on one SQLite file).
#   REDIS - Through Redis pub/sub (see the redis section), even with MySQL or MariaDB as storage:
#           changes reach the other servers at once.
#   NONE  - Nothing is sent: a server only sees the changes of the others when it reads them again
#           (a player joining it, a restart).
messaging-type: NONE

# Time in seconds between two reads of the database, used by messaging-type AUTO and SQL.
# Decimals are allowed, minimum 0.25.
messaging-poll-interval: 2


# When a player moves from one server to another, the new server waits up to this many
# milliseconds for the old one to save the data of the player before reading it.
# Only used with a shared database.
session-handoff-timeout: 3000



# ==================================================================================================
#  5. MENUS
# ==================================================================================================

# Name of the default menu, opened when no specific one is defined.
main-menu: "example"


# Open the main menu when the player presses the swap offhand key (F).
use-swap-item-off-hand-key-to-open-main-menu: false

# Only open the main menu when the player presses shift + the swap offhand key together.
use-swap-item-off-hand-key-to-open-main-menu-needs-shift: false


# Specific inventories to load at plugin start.
# Add the paths of the menus you want to load manually.
specify-path-menus: [ ]


# Show a message to the player when the command "/zm open <inventory> <player> <display>" is used.
enable-open-message: true


# Action types that are NOT run as close actions when a player switches to another zMenu inventory.
# This prevents actions like "open another inventory" or "go back" from reopening old menus.
skip-close-actions-on-inventory-switch:
  - inventory
  - inv
  - back


# Longest an opening or closing animation may last, in milliseconds.
# A longer one still plays, but is reported in the console and never freezes the menu,
# so a mistyped interval cannot lock a player out of their menu.
max-animation-duration: 10000


# From how many idle-animation buttons a menu drives them all from one shared timer.
#
#   Below this  : each idle button gets its own task, which keeps every frame exact to the tick.
#   At or above : the menu uses a single task per viewer, however many buttons cycle, and frames
#                 land on the next tick (only noticeable for durations that are not a multiple of 50 ms).
#
# Lower it on a busy server with many idle buttons. 0 always shares, a very large value never does.
shared-idle-timer-threshold: 8


# --- Hot reload -----------------------------------------------------------------------------------
# You must have zMenu+ on your server to use this feature:
# https://minecraft-inventory-builder.com/resources/zmenu.4
#
# zMenu watches the inventories folder (and its subfolders) and automatically:
#   - reloads an inventory when its file is modified,
#   - loads it when a file is added,
#   - unloads it when the file is deleted.
#
# Players viewing a reloaded inventory see the new version reopened on the same page,
# an unloaded inventory is closed.
# A file that cannot be loaded (YAML error, invalid button, etc.) is not applied: the previous
# version stays loaded until the error is fixed.
#
# Files listed in specify-path-menus are not watched.
# The folder is also scanned every 2 seconds, for file systems that do not send change events
# (Docker, WSL, network shares).
# Changes are logged in the console with a [HotReload] prefix, enable-debug shows more details.

hot-reload:

  enable: false

  # Time in milliseconds to wait after the last change of a file before reloading it.
  # Text editors often write a file in several steps, this avoids reloading it several times.
  delay-milliseconds: 500



# ==================================================================================================
#  6. CLICKS
# ==================================================================================================

# Only run a button for a click type listed in all-clicks-type below,
# or one that a click-requirement of that button explicitly asks for.
#
# Keep this enabled! When it is off, exotic click types reach the button while every requirement
# scoped to a normal click type is skipped: pressing the drop key (Q), ctrl + Q or a number key
# on a button runs its actions and commands without checking any requirement at all.
#
# Only disable this if enforcing it breaks a menu you cannot change.
enforce-click-types: true


# Click types supported.
# Any click type not listed here is ignored, unless a click-requirement of the button names it
# explicitly. Requires enforce-click-types to be true.
#
# This is also the default list of click types used by a requirement that does not specify one.
all-clicks-type:
  - MIDDLE
  - RIGHT
  - LEFT
  - SHIFT_RIGHT
  - SHIFT_LEFT


# Ignore double-clicks, so they don't trigger interactions.
disable-double-click-event: true


# --- Click cooldown -------------------------------------------------------------------------------

# Prevent players from spamming clicks too quickly. Useful to reduce abuse or bugs.
enable-cooldown-click: true

# Cooldown duration in milliseconds between two clicks.
# Also acts as a rate limit against automated click macros. Values below ~150 make it realistic
# for a scripted client to fire several purchases before an asynchronous economy has committed
# the first one.
cooldown-click-milliseconds: 250


# --- Packet click limiter (requires PacketEvents) -------------------------------------------------

# Limit all the click packets received from players (only for zMenu inventories).
# Prevents players from sending excessive click packets, reducing packet spam and potential exploits.
#
# STRONGLY RECOMMENDED on public servers: this is the only limit that applies before the click
# reaches the server tick, and it is the layer that stops packet injection clients from bursting
# clicks.
#
# Requires the PacketEvents plugin to be installed, it does nothing without it.
enable-packet-event-click-limiter: false

# Minimum time in milliseconds between two click packets. Lower values are more permissive.
packet-event-click-limiter-milliseconds: 150



# ==================================================================================================
#  7. SECURITY & ANTI-DUPE
# ==================================================================================================

# --- Anti-dupe ------------------------------------------------------------------------------------

# Automatically detect and prevent item duplication exploits.
enable-anti-dupe: true

# Send a message to a Discord webhook when a dupe attempt is detected.
enable-anti-dupe-discord-notification: false

# Discord webhook URL used for the anti-dupe notifications.
anti-dupe-discord-webhook-url: "https://discord.com/api/webhooks/<your discord webhook url>"

# Message sent to Discord when a dupe is detected.
# Placeholders: %player%, %amount%, %itemname%
anti-dupe-message: "**%player%** used %amount% %itemname% from zMenu. It has been removed!"


# --- Ghost GUI protection -------------------------------------------------------------------------

# Close the menu when the player moves away from where it was opened.
#
# Protects against "ghost GUI" abuse: a modified client can hide the inventory screen locally
# without sending a close packet, then keep clicking the still-open container while running,
# fighting or teleporting.
#
# Set to false only if you rely on menus staying open while walking.
close-on-move: true

# Maximum distance (in blocks) a player may move from the opening location before the menu
# is closed. Only used when close-on-move is true.
max-move-distance: 2.0

# Close the menu as soon as the player takes or deals damage.
# Prevents using menus (kits, shops, heals) during combat through a ghost GUI.
close-on-damage: true


# --- Commands -------------------------------------------------------------------------------------

# Send the player commands of the buttons through the chat (as if the player typed them),
# instead of executing them directly. Useful for "fake" commands not registered in Spigot.
enable-player-command-in-chat: false


# Allow buttons to execute player commands with elevated permissions (OP or permission *).
#
# WARNING: This is a security-sensitive feature. Only enable it if you understand the risks.
# Disabled by default for security reasons. Requires a server restart to take effect.
enable-player-commands-as-op-action: false

# Method used to grant the temporary elevated permissions.
# Only used when enable-player-commands-as-op-action is true.
#
#   ATTACHMENT - Grants permission * temporarily (safer, recommended)
#   SET_OP     - Temporarily sets the player as OP (use with caution)
#   BOTH       - Combines both methods (maximum compatibility, use with extreme caution)
op-grant-method: ATTACHMENT



# ==================================================================================================
#  8. PERFORMANCE & CACHES
# ==================================================================================================

# Enable the FastEvent system.
# Replaces some Bukkit events with a faster alternative: better performance, at the cost of
# API changes. Read the documentation before enabling this.
enable-fast-event: false


# Cache the ItemStacks, to reduce object creation.
enable-cache-item-stack: true


# --- MiniMessage component cache ------------------------------------------------------------------
# Cache used for the parsed MiniMessage components (item names, lore, inventory titles, messages).
#
# This cache used to be unbounded: once a player placeholder was resolved into a name or a lore
# line, every distinct result stayed in memory for the whole uptime, which on a busy server grew
# until the JVM ran out of heap.

component-cache:

  # Maximum number of parsed components kept in memory. Set to 0 for no limit (old behaviour).
  max-size: 10000

  # Drop an entry that has not been used for this many minutes. Set to 0 to never expire
  # (old behaviour). This matters more than the size limit, because a component built from a
  # player placeholder is usually used once and never again.
  expire-minutes: 10

  # Keep item names, lore and plain messages in separate cache namespaces.
  # Item names and lore are cached with a formatting reset in front of them, plain messages are
  # not. So when an item name and a message shared the same text, they also shared one cache entry:
  # whichever was parsed first won and the other one rendered wrong, most visibly as an item name
  # that appeared italic. Set to false to restore that old, colliding behaviour.
  fix-key-collisions: true


# --- PlaceholderAPI cache -------------------------------------------------------------------------

# Cache the PlaceholderAPI values for a short period, to reduce the number of calls to PlaceholderAPI.
enable-cache-placeholder-api: false

# How long a cached placeholder value is kept, in milliseconds (1000 = 1 second).
cache-placeholder-api: 20


# --- Offline players cache ------------------------------------------------------------------------

# Time in seconds before the OfflinePlayer cache is cleaned.
cache-offline-player: 300



# ==================================================================================================
#  9. DIALOGS (Paper 1.21.7+, requires enable-mini-message-format)
# ==================================================================================================

# How many dialog_list dialogs can be nested inside each other (a list inside a list inside a list...).
#
# This does not limit how many dialogs a list contains. A list sends every dialog it contains,
# including the content of nested lists, in the packet that opens it, so deep nesting makes that
# packet bigger and can disconnect the player. Lists nested deeper than this are left out.
dialog-list-max-depth: 4


# --- Dialog canvas --------------------------------------------------------------------------------
# Dialog canvases draw images and text at pixel positions inside dialogs (body type dialog-canvas).
# zMenu generates the fonts they need into plugins/zMenu/resource-pack/output,
# from the dialogs that use them.

dialog-canvas:

  resource-pack:

    # Who adds the files of zMenu to the resource pack players download:
    #
    #   auto        - The pack plugin installed on the server (Nexo, ItemsAdder or CraftEngine).
    #                 With several of them, nothing is done until one is chosen here.
    #                 Without any, standalone when its url is set, else none.
    #   nexo        - Nexo
    #   itemsadder  - ItemsAdder
    #   craftengine - CraftEngine
    #   standalone  - zMenu sends plugins/zMenu/resource-pack/zmenu-pack.zip from the url below.
    #   none        - You add plugins/zMenu/resource-pack/zmenu-pack.zip (or the output folder)
    #                 to your pack yourself.
    target: auto

    # Run the rebuild command of the pack plugin (/nexo reload pack, /iazip, /ce reload pack)
    # when the files of zMenu changed after /zm reload.
    # When false, zMenu only tells you which command to run.
    auto-rebuild: false

    standalone:

      # Where you upload zmenu-pack.zip. zMenu does not host it, and sends it with its SHA-1,
      # so upload it again each time zMenu says the pack changed.
      url: ""

      # Kick players who decline the pack.
      required: false

      # Shown when the pack is offered (MiniMessage), empty for none.
      prompt: "<gray>Interface of the server menus"

  # When players see the fallback text of a canvas instead of the canvas:
  #
  #   auto  - With the standalone pack: until the player loaded it.
  #           With Nexo, ItemsAdder, CraftEngine or a pack of server.properties: only after the
  #           player declined it or it failed, including packs sent while the player joins.
  #   true  - Until a resource pack is reported loaded.
  #   false - Never.
  require-pack: auto

  # How long, in seconds, the buttons of an opened canvas keep working.
  # Opening the dialog again resets it.
  click-lifetime-seconds: 600

  # Download the font and textures of the vanilla client from Mojang once per Minecraft version,
  # to measure text in the default font and to draw vanilla textures (glyph: minecraft:item/diamond).
  #
  # zMenu only downloads them once a loaded dialog has a canvas that needs them.
  # They are kept in plugins/zMenu/cache/vanilla and are never added to the resource pack
  # (except the shader of hide-focus-outline).
  download-vanilla-assets: true

  # Experimental: a click on a canvas makes the client draw a white outline around the dialog body.
  # The client draws it in code, so no texture can change it. This adds the gui shaders of the
  # client to the pack, changed to skip white 1 pixel lines exactly as long as the outline of one
  # of your canvases. Other white of the client's screens stays.
  #
  # It replaces the gui shaders of any other pack and needs download-vanilla-assets.
  #
  # debug paints instead of hiding: red = hidden, green = another white 1 pixel line, blue = other white.
  hide-focus-outline: false



# ==================================================================================================
#  10. WEBSITE (inventory builder)
#  https://minecraft-inventory-builder.com/
# ==================================================================================================

# Allow the use of the download command of the plugin.
enable-download-command: false


# Reopen the website live-sync link automatically at startup (a few seconds after the plugin
# enables), when this server is already linked to an account.
# Set to false if you prefer to open it by hand with /zmenu website connect after every restart.
enable-website-auto-connect: true


# API URL of the inventory builder.
# Do not change this value, leave the default URL, otherwise the link with the site will not work.
api-url: "https://minecraft-inventory-builder.com/api/v2/"


# Web editor inventories sync.
# Do not enable this, for now it is only for development purposes.
DEV-ONLY-DONT-ENABLE-THIS: false
```

## Options de configuration expliquees

---

### 1. General

#### features

Desactive les parties de zMenu que vous n'utilisez pas. Une fonctionnalite desactivee n'enregistre rien : aucun listener, aucune commande et aucun fichier par defaut.

```yaml
features:
  custom-items: true
```

| Fonctionnalite | Description |
|----------------|-------------|
| `custom-items` | Les items personnalises du dossier `items/`, leurs mecaniques (`itemjoin`, `on-click`), la mise a jour des items a la connexion et `/zm giveitem`. Voir [Items personnalises](./items/custom-items). |

<CalloutContainer type="warning">

<CalloutDescription>
Les fonctionnalites sont lues au demarrage du serveur. Redemarrez le serveur apres les avoir modifiees : `/zm reload` ne les applique pas (un avertissement est affiche dans la console).
</CalloutDescription>

</CalloutContainer>

---

#### enable-information-message

Affiche des messages d'information dans la console, par exemple quand un inventaire ou une commande a ete charge avec succes.

```yaml
enable-information-message: true
```

---

#### skip-update-check

Ignore la verification automatique des mises a jour au demarrage.

```yaml
skip-update-check: false
```

---

#### generate-default-file

Cree les fichiers par defaut (inventaires, commandes, patterns...) quand ils n'existent pas.

```yaml
generate-default-file: true
```

---

#### enable-mini-message-format

Active le support des [Dialogues](./dialogues) (Paper 1.21.7+). Le formatage MiniMessage lui-meme est toujours active.

```yaml
enable-mini-message-format: true
```

Vous pouvez utiliser MiniMessage dans les noms, les lores, les titres et les messages :

```yaml
name: "<gradient:red:blue>Texte en degrade</gradient>"
lore:
  - "<rainbow>Arc-en-ciel !</rainbow>"
  - "<bold><gold>Or en gras</gold></bold>"
```

Plus d'infos : [documentation MiniMessage](https://docs.advntr.dev/minimessage/index.html).

---

### 2. Debug & logs

#### enable-debug

Affiche des messages de debug detailles dans la console.

```yaml
enable-debug: false
```

**Quand activer :**
- Resolution de problemes de chargement d'inventaire
- Debug de problemes de placeholder
- Signalement de bugs au support (envoyez les erreurs affichees dans la console)

---

#### enable-debug-time

Mesure le temps d'execution du plugin, pour identifier les goulots d'etranglement.

```yaml
enable-debug-time: false
```

---

#### enable-performance-debug

Mesure et affiche le temps d'execution de chaque etape lors de l'ouverture d'un inventaire (construction des boutons, rendu des items, etc.).

```yaml
enable-performance-debug: false

performance-debug:
  threshold-ms: 10
  filter:
    mode: DISABLED
    operations: []
```

| Option | Description |
|--------|-------------|
| `threshold-ms` | Temps d'execution minimum (en ms) pour qu'une operation apparaisse dans la sortie. `0` affiche toutes les operations. |
| `filter.mode` | `DISABLED` affiche toutes les operations au-dessus du seuil, `WHITELIST` affiche uniquement les operations de la liste, `BLACKLIST` les masque. |
| `filter.operations` | Operations utilisees par le filtre. Supporte les jokers : `"buildButton.*"` correspond a toutes les operations `buildButton`. |

---

#### enable-log-storage-file

Affiche un message dans la console quand des fichiers sont sauvegardes ou charges.

```yaml
enable-log-storage-file: false
```

---

#### click-error-log-cooldown-seconds

Duree, en secondes, pendant laquelle zMenu attend avant de logger a nouveau le meme bouton en erreur.

```yaml
click-error-log-cooldown-seconds: 30
```

Quand les actions d'un bouton levent une erreur, zMenu la logge une fois avec la stack trace complete, puis reste silencieux sur ce meme bouton pendant cette duree. Sans cela, un joueur cliquant sur un bouton casse produisait une stack trace complete par clic, remplissant la console et le fichier de log et ralentissant le serveur.

Mettez `0` pour logger chaque occurrence.

---

### 3. Stockage

#### storage-type

Ou zMenu stocke ses donnees (donnees joueur, variables, logs d'inventaires).

| Type | Description |
|------|-------------|
| `SQLITE` | Base de donnees locale basee sur fichier (par defaut). Uniquement pour le premier demarrage et les tests. |
| `MYSQL` | Serveur MySQL. **Recommande.** |
| `MARIADB` | Serveur MariaDB. **Recommande.** |
| `POSTGRESQL` | Serveur PostgreSQL, utilise [`database-configuration`](#database-configuration) (mettez `port` a `5432`). zMenu telecharge le driver au prochain demarrage. |
| `MONGODB` | Stocke tout dans MongoDB, voir [`mongodb`](#mongodb). zMenu telecharge le driver au prochain demarrage. |
| `REDIS` | Stocke tout dans Redis, voir [`redis`](#redis). Assurez-vous que Redis ecrit ses donnees sur le disque (`appendonly yes` dans `redis.conf`), sinon un redemarrage de Redis les perd. |
| `NONE` | Aucune base de donnees. |

```yaml
storage-type: SQLITE
```

<CalloutContainer type="info">

<CalloutDescription>
Nous vous conseillons d'utiliser `MARIADB` ou `MYSQL`. `SQLITE` n'est la que pour installer le plugin et faire quelques tests : le plugin fonctionne, mais toutes les fonctionnalites ne sont pas encore disponibles avec SQLite.
</CalloutDescription>

</CalloutContainer>

**Recommandations :**
- **Tests** : `SQLITE`
- **Production / reseau** : `MYSQL` ou `MARIADB` (ou `POSTGRESQL`)
- **Pas de donnees joueur necessaires** : `NONE`

---

#### database-configuration

Parametres de connexion pour `MYSQL`, `MARIADB` et `POSTGRESQL`.

```yaml
database-configuration:
  table-prefix: "zmenu_"
  host: 192.168.10.10
  port: 3306
  user: homestead
  password: 'secret'
  database: zmenu
  debug: false
  max-lifetime: 1800
  properties: {}
```

| Option | Description |
|--------|-------------|
| `table-prefix` | Prefixe applique a chaque table. Si plusieurs plugins partagent la meme base de donnees, chacun doit avoir son propre prefixe. Il est conseille de ne pas le modifier. |
| `host` | Adresse IP de la machine qui heberge la base de donnees |
| `port` | Port de la base de donnees (MySQL / MariaDB : `3306`, PostgreSQL : `5432`) |
| `user` | Nom d'utilisateur de la base de donnees |
| `password` | Mot de passe de la base de donnees |
| `database` | Nom de la base de donnees |
| `debug` | Active le mode debug SQL |
| `max-lifetime` | Duree de vie maximale d'une connexion MySQL ou MariaDB du pool, en secondes (defaut : `1800`, soit 30 minutes) |
| `properties` | Proprietes supplementaires du driver envoyees avec chaque connexion MySQL, MariaDB ou PostgreSQL |

L'option `max-lifetime` definit combien de temps une connexion peut rester dans le pool HikariCP. Une connexion plus ancienne que cette valeur est retiree et remplacee par une nouvelle.

- `0` conserve les connexions jusqu'a la fermeture du pool.
- Une valeur absente ou negative conserve la valeur par defaut de 30 minutes.
- HikariCP impose un minimum de `30` secondes.

Reduisez cette valeur si votre serveur de base de donnees, ou un proxy place devant, ferme les connexions inactives avant 30 minutes (par exemple un `wait_timeout` MySQL bas).

`properties` courantes :

```yaml
  properties:
    useSSL: "true"                   # MySQL / MariaDB over TLS
    allowPublicKeyRetrieval: "true"  # MySQL 8 without TLS ("Public Key Retrieval is not allowed")
    sslmode: "disable"               # PostgreSQL without TLS, or "require" to force it
```

<CalloutContainer type="info">

<CalloutDescription>
Si un fichier `database-configuration.yml` existe a la racine du serveur, zMenu lit d'abord la section `database-configuration` de ce fichier (y compris `max-lifetime`) et utilise `config.yml` pour les cles manquantes.
</CalloutDescription>

</CalloutContainer>

---

#### mongodb

Utilise par `storage-type: MONGODB`.

```yaml
mongodb:
  uri: "mongodb://localhost:27017"
  database: "zmenu"
  collection-prefix: "zmenu_"
```

| Option | Description |
|--------|-------------|
| `uri` | `mongodb://[user:password@]host:port`, ou une chaine de connexion `mongodb+srv://` |
| `database` | Nom de la base de donnees |
| `collection-prefix` | Le debut du nom de chaque collection |

---

#### redis

Utilise par `storage-type: REDIS` et `messaging-type: REDIS`. zMenu telecharge le client Redis au prochain demarrage apres que vous ayez choisi l'un des deux.

```yaml
redis:
  uri: "redis://localhost:6379/0"
  cluster: false
  key-prefix: "zmenu"
  require-aof: false
```

| Option | Description |
|--------|-------------|
| `uri` | `redis://[user:password@]host:port/database`, ou `rediss://` pour TLS |
| `cluster` | `true` pour un Redis Cluster, `uri` designe alors l'un de ses noeuds |
| `key-prefix` | Le debut de chaque cle ecrite par zMenu. Modifiez-le quand plusieurs reseaux partagent un meme Redis. |
| `require-aof` | Refuse de demarrer quand Redis n'ecrit pas ses donnees sur le disque (`appendonly no`) |

---

#### batch-task

Temps en secondes entre deux sauvegardes groupees. Au lieu d'executer une requete SQL a chaque mise a jour, une seule requete est executee toutes les 10 secondes.

```yaml
batch-task: 10
```

---

#### flush-storage-on-quit

Ecrit les donnees en attente d'un joueur dans la base de donnees des qu'il se deconnecte, au lieu d'attendre le prochain cycle de `batch-task`.

```yaml
flush-storage-on-quit: true
```

Les donnees en attente sont toujours ecrites a l'arret du serveur : cette option change donc seulement ce qu'un crash brutal peut perdre. Activee, un crash ne perd que ce qui est arrive depuis la derniere deconnexion, au lieu de jusqu'a un intervalle complet de `batch-task` pour chaque joueur.

Mettez `false` si l'ecriture supplementaire a chaque deconnexion est trop lourde pour votre base de donnees. Plusieurs joueurs qui se deconnectent en meme temps sont deja regroupes en une seule ecriture.

---

#### seconds-save-player-data / seconds-save-player-inventories

```yaml
seconds-save-player-data: 600
seconds-save-player-inventories: 600
```

<CalloutContainer type="info">

<CalloutDescription>
Ces options ne sont actuellement pas utilisees : les donnees joueur sont sauvegardees via [`batch-task`](#batch-task) et [`flush-storage-on-quit`](#flush-storage-on-quit).
</CalloutDescription>

</CalloutContainer>

---

#### enable-player-open-inventory-logs

Sauvegarde dans la base de donnees les inventaires ouverts par les joueurs.

```yaml
enable-player-open-inventory-logs: true
```

---

#### migration-target

Permet de deplacer vos donnees vers un autre `storage-type` :

1. Copiez les donnees avec `/zm storage migrate <type>`
2. Changez `storage-type`
3. Redemarrez le serveur

```yaml
migration-target: ""
```

Quand le nouveau type a besoin d'un driver que zMenu n'a pas encore (`POSTGRESQL`, `MONGODB`, `REDIS`), indiquez-le dans `migration-target` et redemarrez une fois **avant** d'executer la commande, pour que zMenu le telecharge.

---

#### migration-database-configuration

La base de donnees vers laquelle `/zm storage migrate` copie, quand ce n'est pas celle de `database-configuration` (par exemple de MariaDB vers PostgreSQL). Chaque valeur definie ici remplace la meme valeur de `database-configuration`, uniquement pour la copie.

```yaml
migration-database-configuration:
  host: 127.0.0.1
  port: 5432
  user: zmenu
  password: 'secret'
  database: zmenu
```

Cette section est commentee par defaut. Apres la copie, deplacez ces valeurs dans `database-configuration`, changez `storage-type` et redemarrez.

---

### 4. Multi-serveurs

Ces options ne sont utiles que lorsque plusieurs serveurs partagent la meme base de donnees.

#### server-id

Nom de ce serveur, utilise pour les variables du scope `server` (action `data` avec `scope: server`, `%zmenu_server_value_<key>%`, `/zm variables ... server ...`).

```yaml
server-id: ""
```

Les serveurs qui partagent une meme base de donnees doivent chacun avoir leur propre nom. Laissez vide pour utiliser un nom genere une fois et conserve dans `plugins/zMenu/server-id.txt`.

---

#### messaging-type

Comment les serveurs qui partagent une base de donnees se previennent des changements des variables joueur et globales, pour qu'une valeur modifiee sur un serveur soit mise a jour sur les autres.

| Type | Description |
|------|-------------|
| `AUTO` | Avec MySQL, MariaDB, PostgreSQL ou MongoDB : via une table (collection) de la base de donnees, lue toutes les `messaging-poll-interval` secondes. Avec `storage-type: REDIS` : via le pub/sub Redis. SQLite n'est jamais partage, donc il ne fait rien dans ce cas. |
| `SQL` | Toujours via la table de la base de donnees SQL, lue toutes les `messaging-poll-interval` secondes, meme sur SQLite (plusieurs serveurs sur un meme fichier SQLite). |
| `REDIS` | Via le pub/sub Redis (voir [`redis`](#redis)), meme avec MySQL ou MariaDB comme stockage : les changements atteignent les autres serveurs immediatement. |
| `NONE` | Rien n'est envoye : un serveur ne voit les changements des autres que lorsqu'il les relit (un joueur qui le rejoint, un redemarrage). |

```yaml
messaging-type: NONE
```

---

#### messaging-poll-interval

Temps en secondes entre deux lectures de la base de donnees, utilise par `messaging-type` `AUTO` et `SQL`. Les decimales sont autorisees, minimum `0.25`.

```yaml
messaging-poll-interval: 2
```

---

#### session-handoff-timeout

Quand un joueur passe d'un serveur a un autre, le nouveau serveur attend jusqu'a ce nombre de millisecondes que l'ancien sauvegarde les donnees du joueur avant de les lire. Utilise uniquement avec une base de donnees partagee.

```yaml
session-handoff-timeout: 3000
```

---

### 5. Menus

#### main-menu

L'inventaire par defaut ouvert par le type de bouton `MAIN_MENU` et le raccourci touche F.

```yaml
main-menu: "example"
```

Cela doit correspondre a un nom de fichier d'inventaire (sans `.yml`) dans votre dossier `inventories/`.

---

#### use-swap-item-off-hand-key-to-open-main-menu

Ouvre le menu principal quand le joueur appuie sur la touche d'echange de main secondaire (F).

```yaml
use-swap-item-off-hand-key-to-open-main-menu: false
```

**Quand activer :**
- Vous voulez un acces facile au menu sans commandes
- Votre serveur a un menu hub principal

**Quand garder desactive :**
- Les joueurs ont besoin de la touche F pour l'echange d'items reel
- Vous utilisez des packs de ressources personnalises avec des raccourcis touche F

---

#### use-swap-item-off-hand-key-to-open-main-menu-needs-shift

Combinee avec `use-swap-item-off-hand-key-to-open-main-menu: true`, le joueur doit aussi maintenir **Shift** pour ouvrir le menu.

```yaml
use-swap-item-off-hand-key-to-open-main-menu-needs-shift: false
```

---

#### specify-path-menus

Inventaires specifiques a charger au demarrage du plugin. Ajoutez les chemins des menus que vous voulez charger manuellement.

```yaml
specify-path-menus: []
```

---

#### enable-open-message

Quand cette option est activee, l'utilisation de `/zm open <inventory> <player> <display>` affiche un message au joueur cible.

```yaml
enable-open-message: true
```

---

#### skip-close-actions-on-inventory-switch

Types d'actions qui ne sont **pas** executes comme actions de fermeture quand un joueur passe a un autre inventaire zMenu. Empeche des actions comme `inventory` ou `back` de rouvrir d'anciens menus.

```yaml
skip-close-actions-on-inventory-switch:
  - inventory
  - inv
  - back
```

---

#### max-animation-duration

Duree maximale d'une animation d'ouverture ou de fermeture, en millisecondes.

```yaml
max-animation-duration: 10000
```

Une animation plus longue est quand meme jouee, mais elle est signalee dans la console et ne bloque jamais le menu : un intervalle mal saisi ne peut donc pas empecher un joueur d'acceder a son menu.

---

#### shared-idle-timer-threshold

A partir de combien de boutons avec animation idle un menu les pilote tous depuis un seul timer partage.

```yaml
shared-idle-timer-threshold: 8
```

- **En dessous de cette valeur** : chaque bouton idle a sa propre tache, ce qui garde chaque frame exacte au tick pres.
- **A partir de cette valeur** : le menu utilise une seule tache par joueur, quel que soit le nombre de boutons animes, et les frames tombent sur le tick suivant (visible uniquement pour des durees qui ne sont pas un multiple de 50 ms).

Baissez-la sur un serveur charge avec beaucoup de boutons idle. `0` partage toujours, une tres grande valeur ne partage jamais.

---

#### hot-reload

<CalloutContainer type="info">

<CalloutDescription>
Le hot reload a sa propre page avec tous les details : [Hot Reload](../hot-reload). Vous devez avoir [zMenu+](../zmenu-plus) sur votre serveur pour utiliser cette fonctionnalite.
</CalloutDescription>

</CalloutContainer>

Surveille le dossier `inventories/` (et tous ses sous-dossiers) et applique vos modifications sans aucune commande :

- **Fichier modifie** : l'inventaire est recharge.
- **Nouveau fichier** : l'inventaire est charge.
- **Fichier supprime** (ou dossier supprime) : l'inventaire est decharge.

```yaml
hot-reload:
  enable: false
  delay-milliseconds: 500
```

| Option | Description |
|--------|-------------|
| `enable` | Active le rechargement a chaud. Desactive par defaut. |
| `delay-milliseconds` | Temps d'attente apres la derniere modification d'un fichier avant de le recharger. Les editeurs de texte enregistrent souvent un fichier en plusieurs etapes, cela evite de le recharger plusieurs fois. |

**Bon a savoir :**
- Les joueurs qui regardent un inventaire au moment ou il est recharge voient la nouvelle version s'ouvrir instantanement, sur la meme page et avec les memes inventaires precedents (un bouton retour ouvre aussi la nouvelle version). Si l'inventaire est decharge (fichier supprime, `enable: false`), il est ferme.
- Un fichier qui ne peut pas etre charge (erreur de syntaxe YAML, type de bouton inconnu, taille invalide...) n'est pas applique : la version precedente reste chargee et l'erreur est affichee dans la console jusqu'a ce que vous corrigiez le fichier.
- Seul le dossier `inventories/` est surveille. Les fichiers de `specify-path-menus`, les patterns et les commandes necessitent toujours `/zm reload`.
- L'activation ou la desactivation de l'option prend effet apres `/zm reload` ou `/zm reload config` (ou en deux secondes depuis le dialogue de configuration en jeu).
- En plus des evenements du systeme de fichiers, le dossier est scanne toutes les deux secondes. Les modifications sont donc detectees meme la ou le systeme de fichiers n'envoie aucun evenement : conteneurs Docker (Pterodactyl, bind mounts), WSL, partages reseau, fichiers envoyes en SFTP.
- Un fichier est recharge quand son contenu ou sa date de modification change. Enregistrer a nouveau un fichier sans modification le recharge quand meme, mais une meme version n'est jamais rechargee deux fois.

**Logs console :**

Chaque action est affichee dans la console avec le prefixe `[HotReload]` :

```
[zMenu] [HotReload] Inventory hot reload enabled, watching .../plugins/zMenu/inventories (native recursive watch, 12 file(s), 12 loaded inventory(ies), scan every 2000ms, delay 500ms).
[zMenu] [HotReload] Change detected on example.yml, reloading the inventory...
[zMenu] [HotReload] Inventory example.yml reloaded in 14ms, reopened for 1 player(s).
```

Vous verrez aussi les erreurs YAML, les fichiers qui n'ont pas pu etre charges, les inventaires decharges apres une suppression, et les fichiers desactives (`enable: false`) ou en attente d'un prerequis de chargement. Avec [`enable-debug`](#enable-debug) a `true`, chaque evenement de fichier, chaque changement trouve par le scan et chaque fichier ignore (inchange) est aussi affiche.

**Depannage :** si rien ne se passe quand vous enregistrez un fichier, verifiez d'abord que la ligne `Inventory hot reload enabled` apparait au demarrage ou apres `/zm reload`. Activez ensuite `enable-debug` pour voir si les modifications sont detectees.

**Quand activer :**
- Pendant la creation ou la modification de menus, pour voir vos changements instantanement
- Sur un serveur de test/developpement

---

### 6. Clics

#### enforce-click-types

N'execute un bouton que pour un type de clic liste dans [`all-clicks-type`](#all-clicks-type), ou un type qu'un `click-requirement` de ce bouton demande explicitement.

```yaml
enforce-click-types: true
```

<CalloutContainer type="error">

<CalloutTitle>Gardez cette option activee</CalloutTitle>

<CalloutDescription>
Quand elle est desactivee, les types de clic exotiques atteignent le bouton alors que chaque requirement limite a un type de clic normal est ignore : appuyer sur la touche de drop (Q), ctrl + Q ou une touche numerique sur un bouton execute ses actions et commandes sans verifier aucun requirement. Ne la desactivez que si son application casse un menu que vous ne pouvez pas modifier.
</CalloutDescription>

</CalloutContainer>

---

#### all-clicks-type

Types de clic supportes par les menus zMenu. Tout type de clic absent de cette liste est ignore, sauf si un `click-requirement` du bouton le nomme explicitement. Necessite `enforce-click-types: true`.

```yaml
all-clicks-type:
  - MIDDLE
  - RIGHT
  - LEFT
  - SHIFT_RIGHT
  - SHIFT_LEFT
```

C'est aussi la liste par defaut des types de clic utilisee par un [requirement](./requirements) qui n'en precise pas.

---

#### disable-double-click-event

Ignore les double-clics, pour qu'ils ne declenchent pas d'interactions.

```yaml
disable-double-click-event: true
```

---

#### enable-cooldown-click / cooldown-click-milliseconds

Empeche les joueurs de spammer les clics trop rapidement, avec un cooldown entre deux clics.

```yaml
enable-cooldown-click: true
cooldown-click-milliseconds: 250
```

Le cooldown sert aussi de limite contre les macros de clics automatises. Des valeurs inferieures a ~150 rendent realiste, pour un client scripte, de declencher plusieurs achats avant qu'une economie asynchrone ait valide le premier.

**Ajustez selon vos besoins :**
- Plus bas = plus reactif, risque de double-clics accidentels et de macros
- Plus haut = plus sur, peut sembler lent

---

#### enable-packet-event-click-limiter / packet-event-click-limiter-milliseconds

Limite tous les paquets de clic recus des joueurs (uniquement pour les inventaires zMenu). Necessite le plugin [PacketEvents](https://github.com/retrooper/packetevents), sans lui l'option ne fait rien.

```yaml
enable-packet-event-click-limiter: false
packet-event-click-limiter-milliseconds: 150
```

`packet-event-click-limiter-milliseconds` est le temps minimum entre deux paquets de clic. Des valeurs plus basses sont plus permissives.

<CalloutContainer type="warning">

<CalloutDescription>
**Fortement recommande sur les serveurs publics** : c'est la seule limite qui s'applique avant que le clic n'atteigne le tick du serveur, et c'est la couche qui empeche les clients d'injection de paquets d'envoyer des rafales de clics.
</CalloutDescription>

</CalloutContainer>

---

### 7. Securite & anti-dupe

#### enable-anti-dupe

Detecte et empeche automatiquement les exploits de duplication d'items impliquant les GUIs d'inventaire.

```yaml
enable-anti-dupe: true
```

---

#### enable-anti-dupe-discord-notification

Envoie un message a un webhook Discord quand une tentative de duplication est detectee.

```yaml
enable-anti-dupe-discord-notification: false
anti-dupe-discord-webhook-url: "https://discord.com/api/webhooks/<your discord webhook url>"
anti-dupe-message: "**%player%** used %amount% %itemname% from zMenu. It has been removed!"
```

| Option | Description |
|--------|-------------|
| `anti-dupe-discord-webhook-url` | URL du webhook Discord utilise pour les notifications |
| `anti-dupe-message` | Message envoye sur Discord. Placeholders : `%player%`, `%amount%`, `%itemname%` |

---

#### close-on-move / max-move-distance

Ferme le menu quand le joueur s'eloigne de l'endroit ou il l'a ouvert.

```yaml
close-on-move: true
max-move-distance: 2.0
```

Protege contre les abus de "ghost GUI" : un client modifie peut masquer l'ecran d'inventaire localement sans envoyer de paquet de fermeture, puis continuer a cliquer dans le conteneur toujours ouvert en courant, en combattant ou en se teleportant.

`max-move-distance` est la distance maximale (en blocs) qu'un joueur peut parcourir depuis l'endroit d'ouverture avant que le menu ne soit ferme. Ne mettez `close-on-move` a `false` que si vous avez besoin que les menus restent ouverts pendant que le joueur marche.

---

#### close-on-damage

Ferme le menu des que le joueur subit ou inflige des degats. Empeche d'utiliser des menus (kits, shops, soins) en combat via un ghost GUI.

```yaml
close-on-damage: true
```

---

#### enable-player-command-in-chat

Envoie les commandes joueur des boutons via le chat (comme si le joueur les tapait), au lieu de les executer directement. Utile pour les "fausses" commandes non enregistrees dans Paper/Spigot.

```yaml
enable-player-command-in-chat: false
```

---

#### enable-player-commands-as-op-action

Permet aux boutons d'executer des commandes joueur avec des permissions elevees (OP ou permission `*`). Necessite un redemarrage du serveur pour prendre effet.

```yaml
enable-player-commands-as-op-action: false
```

<CalloutContainer type="error">

<CalloutTitle>Avertissement de securite</CalloutTitle>

<CalloutDescription>
N'activez cette option que si vous comprenez parfaitement les implications de securite. Une mauvaise utilisation peut donner des permissions elevees aux joueurs.
</CalloutDescription>

</CalloutContainer>

---

#### op-grant-method

La methode utilisee pour accorder les permissions elevees temporaires (uniquement quand `enable-player-commands-as-op-action: true`).

| Methode | Description |
|---------|-------------|
| `ATTACHMENT` | Accorde temporairement la permission `*` (plus sur, recommande) |
| `SET_OP` | Met temporairement le joueur OP (a utiliser avec precaution) |
| `BOTH` | Combine les deux methodes (compatibilite maximale, a utiliser avec une extreme precaution) |

```yaml
op-grant-method: ATTACHMENT
```

---

### 8. Performance & caches

#### enable-fast-event

Remplace certains evenements Bukkit par une alternative plus rapide : de meilleures performances, au prix de changements dans l'API. Cela modifie les evenements recus par les plugins qui utilisent l'API de zMenu, verifiez vos addons avant de l'activer.

```yaml
enable-fast-event: false
```

---

#### enable-cache-item-stack

Met en cache les ItemStacks pour reduire la creation d'objets.

```yaml
enable-cache-item-stack: true
```

**Recommandation :** gardez cette option activee sauf si vous rencontrez des problemes.

---

#### component-cache

Cache utilise pour les composants MiniMessage analyses (noms d'items, lores, titres d'inventaires, messages).

```yaml
component-cache:
  max-size: 10000
  expire-minutes: 10
  fix-key-collisions: true
```

| Option | Description |
|--------|-------------|
| `max-size` | Nombre maximum de composants analyses gardes en memoire. `0` pour aucune limite (ancien comportement). |
| `expire-minutes` | Supprime une entree qui n'a pas ete utilisee depuis ce nombre de minutes. `0` pour ne jamais expirer (ancien comportement). C'est plus important que la limite de taille, car un composant construit a partir d'un placeholder joueur est generalement utilise une seule fois. |
| `fix-key-collisions` | Garde les noms d'items, les lores et les messages simples dans des espaces de cache separes. Mettez `false` pour retrouver l'ancien comportement, avec collisions. |

Ce cache etait auparavant illimite : une fois qu'un placeholder joueur etait resolu dans un nom ou une ligne de lore, chaque resultat distinct restait en memoire pendant toute la duree de fonctionnement du serveur, ce qui, sur un serveur charge, grossissait jusqu'a ce que la JVM manque de memoire (heap).

A propos de `fix-key-collisions` : les noms d'items et les lores sont mis en cache avec une reinitialisation du formatage devant eux, pas les messages simples. Quand un nom d'item et un message partageaient le meme texte, ils partageaient aussi une meme entree de cache : celui qui etait analyse en premier gagnait et l'autre s'affichait mal, le plus visiblement sous la forme d'un nom d'item qui apparaissait en italique.

---

#### enable-cache-placeholder-api / cache-placeholder-api

Met en cache les valeurs de PlaceholderAPI pendant une courte periode, pour reduire le nombre d'appels a PlaceholderAPI.

```yaml
enable-cache-placeholder-api: false
cache-placeholder-api: 20
```

`cache-placeholder-api` est la duree pendant laquelle une valeur en cache est conservee, **en millisecondes** (`1000` = 1 seconde).

Le cache est limite a 10 000 entrees (une par placeholder et par joueur), et chaque entree expire une fois la duree `cache-placeholder-api` ecoulee : il ne grossit donc plus avec le temps.

<CalloutContainer type="warning">

<CalloutDescription>
Activer ceci signifie que les placeholders ne se mettront pas a jour instantanement. Utilisez avec precaution.
</CalloutDescription>

</CalloutContainer>

---

#### cache-offline-player

Temps en secondes avant que le cache des OfflinePlayer ne soit nettoye.

```yaml
cache-offline-player: 300  # 5 minutes
```

---

### 9. Dialogues

Ces options concernent les [Dialogues](./dialogues) (Paper 1.21.7+, necessite `enable-mini-message-format`).

#### dialog-list-max-depth

Nombre de dialogues [`dialog_list`](./dialogues#liste-de-dialogues) pouvant etre imbriques les uns dans les autres (une liste dans une liste dans une liste...). Par defaut : `4`.

```yaml
dialog-list-max-depth: 4
```

Cela ne limite pas le nombre de dialogues qu'une liste contient. Une liste envoie tous les dialogues qu'elle contient, y compris le contenu des listes imbriquees, dans le paquet qui l'ouvre : une imbrication profonde rend ce paquet plus gros et peut deconnecter le joueur. Les listes imbriquees au-dela de cette valeur sont ignorees.

---

#### dialog-canvas

Les canvas de dialogue dessinent des images et du texte a des positions en pixels dans les dialogues (type de body `dialog-canvas`). zMenu genere les polices dont ils ont besoin dans `plugins/zMenu/resource-pack/output`, a partir des dialogues qui les utilisent.

```yaml
dialog-canvas:
  resource-pack:
    target: auto
    auto-rebuild: false
    standalone:
      url: ""
      required: false
      prompt: "<gray>Interface of the server menus"
  require-pack: auto
  click-lifetime-seconds: 600
  download-vanilla-assets: true
  hide-focus-outline: false
```

##### resource-pack.target

Qui ajoute les fichiers de zMenu au resource pack que les joueurs telechargent.

| Valeur | Description |
|--------|-------------|
| `auto` | Le plugin de pack installe sur le serveur (Nexo, ItemsAdder ou CraftEngine). S'il y en a plusieurs, rien n'est fait tant que l'un d'eux n'est pas choisi ici. S'il n'y en a aucun, `standalone` quand son `url` est definie, sinon `none`. |
| `nexo` | Nexo |
| `itemsadder` | ItemsAdder |
| `craftengine` | CraftEngine |
| `standalone` | zMenu envoie `plugins/zMenu/resource-pack/zmenu-pack.zip` depuis `standalone.url`. |
| `none` | Vous ajoutez vous-meme `plugins/zMenu/resource-pack/zmenu-pack.zip` (ou le dossier `output`) a votre pack. |

##### resource-pack.auto-rebuild

Execute la commande de reconstruction du plugin de pack (`/nexo reload pack`, `/iazip`, `/ce reload pack`) quand les fichiers de zMenu ont change apres `/zm reload`. Quand `false`, zMenu vous indique seulement quelle commande executer.

##### resource-pack.standalone

| Option | Description |
|--------|-------------|
| `url` | L'endroit ou vous hebergez `zmenu-pack.zip`. zMenu ne l'heberge pas et l'envoie avec son SHA-1 : renvoyez-le donc a chaque fois que zMenu indique que le pack a change. |
| `required` | Expulse les joueurs qui refusent le pack. |
| `prompt` | Affiche quand le pack est propose (MiniMessage), vide pour aucun message. |

##### require-pack

Quand les joueurs voient le texte de remplacement d'un canvas au lieu du canvas.

| Valeur | Description |
|--------|-------------|
| `auto` | Avec le pack standalone : jusqu'a ce que le joueur l'ait charge. Avec Nexo, ItemsAdder, CraftEngine ou un pack de `server.properties` : uniquement apres que le joueur l'a refuse ou que son chargement a echoue, y compris pour les packs envoyes pendant la connexion du joueur. |
| `true` | Jusqu'a ce qu'un resource pack soit signale comme charge. |
| `false` | Jamais. |

##### click-lifetime-seconds

Duree, en secondes, pendant laquelle les boutons d'un canvas ouvert restent fonctionnels. Rouvrir le dialogue la reinitialise.

##### download-vanilla-assets

Telecharge la police et les textures du client vanilla depuis Mojang une fois par version de Minecraft, pour mesurer le texte dans la police par defaut et dessiner les textures vanilla (`glyph: minecraft:item/diamond`).

zMenu ne les telecharge qu'une fois qu'un dialogue charge possede un canvas qui en a besoin. Elles sont conservees dans `plugins/zMenu/cache/vanilla` et ne sont jamais ajoutees au resource pack (sauf le shader de `hide-focus-outline`).

##### hide-focus-outline

<CalloutContainer type="warning">

<CalloutTitle>Experimental</CalloutTitle>

<CalloutDescription>
Remplace les shaders gui de tout autre pack et necessite `download-vanilla-assets`.
</CalloutDescription>

</CalloutContainer>

Un clic sur un canvas fait dessiner au client un contour blanc autour du body du dialogue. Le client le dessine dans son code, donc aucune texture ne peut le modifier. Cette option ajoute les shaders gui du client au pack, modifies pour ignorer les lignes blanches de 1 pixel exactement aussi longues que le contour de l'un de vos canvas. Le reste du blanc des ecrans du client est conserve.

La valeur `debug` colore au lieu de masquer : rouge = masque, vert = une autre ligne blanche de 1 pixel, bleu = autre blanc.

---

### 10. Site web

Parametres de l'integration avec [Minecraft Inventory Builder](https://minecraft-inventory-builder.com).

#### enable-download-command

Active la commande `/zm website download <url> [force]` pour telecharger des inventaires depuis une URL.

```yaml
enable-download-command: false
```

La commande ne s'execute que si cette option est a `true`. Avec la valeur par defaut `false`, la commande est refusee, l'expediteur est invite a l'activer dans `config.yml`, et la tentative est enregistree dans la console.

---

#### enable-website-auto-connect

Rouvre automatiquement le lien live-sync avec le site au demarrage (quelques secondes apres l'activation du plugin), quand ce serveur est deja lie a un compte.

```yaml
enable-website-auto-connect: true
```

Mettez `false` si vous preferez l'ouvrir a la main avec `/zmenu website connect` apres chaque redemarrage.

---

#### api-url

L'URL de l'API de l'inventory builder. **Ne modifiez pas cette valeur**, sinon le lien avec le site ne fonctionnera pas.

```yaml
api-url: "https://minecraft-inventory-builder.com/api/v2/"
```

---

#### DEV-ONLY-DONT-ENABLE-THIS

Synchronisation des inventaires de l'editeur web. **Ne l'activez pas**, c'est uniquement destine au developpement pour le moment.

```yaml
DEV-ONLY-DONT-ENABLE-THIS: false
```

---

## Exemples de configurations

### Serveur basique (SQLite)

```yaml
enable-debug: false
storage-type: SQLITE
enable-mini-message-format: true
enable-cache-item-stack: true
enable-anti-dupe: true
enable-cooldown-click: true
cooldown-click-milliseconds: 250
main-menu: "main"
```

### Serveur reseau (MySQL)

```yaml
enable-debug: false
storage-type: MYSQL
database-configuration:
  table-prefix: "zmenu_"
  host: "mysql.monreseau.com"
  port: 3306
  user: "zmenu_user"
  password: "mot_de_passe_securise_ici"
  database: "minecraft_network"
server-id: "lobby-1"
messaging-type: AUTO
enable-mini-message-format: true
enable-cache-item-stack: true
enable-cache-placeholder-api: true
cache-placeholder-api: 1000
enable-anti-dupe: true
main-menu: "hub_menu"
```

### Serveur public (axe sur la securite)

```yaml
enforce-click-types: true
enable-cooldown-click: true
cooldown-click-milliseconds: 250
enable-packet-event-click-limiter: true   # requires PacketEvents
packet-event-click-limiter-milliseconds: 150
enable-anti-dupe: true
close-on-move: true
close-on-damage: true
enable-player-commands-as-op-action: false
```

### Axe sur les performances

```yaml
enable-debug: false
enable-cache-item-stack: true
enable-cache-placeholder-api: true
cache-placeholder-api: 3000
cache-offline-player: 600
component-cache:
  max-size: 10000
  expire-minutes: 10
shared-idle-timer-threshold: 4
```

### Developpement/Test

```yaml
enable-debug: true
enable-debug-time: true
enable-performance-debug: true
performance-debug:
  threshold-ms: 5
  filter:
    mode: DISABLED
    operations: []
skip-update-check: true
hot-reload:
  enable: true
storage-type: SQLITE
enable-cache-item-stack: false
enable-cache-placeholder-api: false
enable-cooldown-click: false
click-error-log-cooldown-seconds: 0
```

## Recharger la configuration

Apres avoir effectue des modifications :

```
/zm reload config
```

Ou rechargez tout :

```
/zm reload
```

<CalloutContainer type="info">

<CalloutDescription>
Certains changements necessitent un redemarrage du serveur pour prendre effet : les parametres de stockage et de base de donnees, `features` et `enable-player-commands-as-op-action`.
</CalloutDescription>

</CalloutContainer>

## Bonnes pratiques

1. **Commencez avec les valeurs par defaut** : changez uniquement ce dont vous avez besoin
2. **Utilisez MySQL ou MariaDB en production** : SQLite est fait pour les tests, et une base de donnees partagee permet le partage de donnees entre serveurs
3. **Donnez a chaque serveur son propre `server-id`** quand plusieurs serveurs partagent une meme base de donnees
4. **Gardez l'anti-dupe et `enforce-click-types` actives** : protege votre economie
5. **Activez le limiteur de paquets de clic sur les serveurs publics** (necessite PacketEvents)
6. **Utilisez le mode debug pendant la configuration**, desactivez-le en production

## Depannage

### Echec de connexion a la base de donnees

1. Verifiez que les identifiants sont corrects
2. Verifiez que le serveur de base de donnees fonctionne
3. Assurez-vous que la base de donnees existe
4. Verifiez que le pare-feu autorise les connexions
5. Verifiez que l'utilisateur a les permissions appropriees
6. Pour MySQL 8 sans TLS, ajoutez `allowPublicKeyRetrieval: "true"` a `database-configuration.properties`

### Variables non synchronisees entre les serveurs

1. Verifiez que chaque serveur utilise la meme base de donnees et a son propre `server-id`
2. Verifiez que `messaging-type` n'est pas `NONE`
3. Avec `REDIS`, verifiez la section `redis` sur chaque serveur

### Les placeholders ne se mettent pas a jour

1. Desactivez temporairement le cache des placeholders
2. Verifiez que PlaceholderAPI est installe
3. Verifiez que l'expansion est telechargee

### Problemes de performance

1. Activez le cache d'item stack
2. Activez le cache de placeholder
3. Utilisez `enable-performance-debug` pour trouver les operations lentes
4. Verifiez les boucles d'inventaire (A ouvre B ouvre A)

## Prochaines etapes

- Configurez les [Commandes personnalisees](./custom-commands)
- Configurez le stockage des [Donnees joueur](./player-data)
- Apprenez l'[API de developpement](../development/api-introduction)
