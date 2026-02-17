---
sidebar_position: 1
title: Configuration Principale
description: Options de configuration principales pour zSpawner
---

# Configuration Principale

Cette page couvre les options de configuration principales disponibles dans `config.yml`.

## Paramètres Généraux

```yaml
# Affiche plus d'informations dans la console
# Activez ceci lors du signalement de problèmes au support
enableDebug: false

# Active les debugs de temps pour la mesure des performances
enableDebugTime: false

# Intervalle de mise à jour des données en millisecondes (défaut : 2 minutes)
updateInterval: 120000
```

## Configuration du Stockage

zSpawner supporte les backends de stockage SQLite et MySQL/MariaDB.

### SQLite

Option de stockage par défaut, ne nécessite aucune configuration supplémentaire :

```yaml
storage: SQLITE
```

### MySQL / MariaDB

Pour les environnements de production :

```yaml
storage: MYSQL

database-configuration:
  table-prefix: "zspawner_"
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  debug: false
  database: zspawner
```

| Option | Description |
|--------|-------------|
| `table-prefix` | Préfixe pour toutes les tables de base de données |
| `user` | Nom d'utilisateur de la base de données |
| `password` | Mot de passe de la base de données |
| `port` | Port de la base de données |
| `host` | Adresse hôte de la base de données |
| `debug` | Activer la journalisation de debug de la base de données |
| `database` | Nom de la base de données |

## Items de Spawner

Configurez les items que les joueurs reçoivent lorsqu'on leur donne des spawners :

```yaml
items:
  CLASSIC:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Placez le spawner sur le sol"
    flags:
      - HIDE_POTION_EFFECTS

  GUI:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Placez le spawner et trouvez-le"
      - "&8dans &7/spawners"
    flags:
      - HIDE_POTION_EFFECTS

  VIRTUAL:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Spawner virtuel, placez-le pour l'utiliser"
    flags:
      - HIDE_POTION_EFFECTS
```

| Placeholder | Description |
|-------------|-------------|
| `%type%` | Nom du type d'entité (ex: "ZOMBIE", "SKELETON") |

## Protection contre les Explosions

Configurez le comportement des spawners lors d'explosions :

```yaml
# Désactiver la destruction des spawners par explosions
disableSpawnerExplosion:
  GUI: true
  CLASSIC: true
  VIRTUAL: true  # Toujours true, ne peut pas être changé

# Dropper les spawners lors de la destruction par explosion
dropSpawnerOnExplose:
  GUI: false
  CLASSIC: false
  VIRTUAL: false  # Toujours false

# Protéger les spawners naturels (vanilla) des explosions
disableNaturalSpawnerExplosion: false

# Dropper les spawners naturels lors de la destruction par explosion
dropNaturalSpawnerOnExplose: false
```

## Limite par Chunk

Limiter le nombre de spawners pouvant être placés par chunk :

```yaml
chunkLimit:
  # Activer la limitation des spawners par chunk
  enable: false

  # Limite globale par chunk
  global: 5

  # Limites par entité
  limits:
    - SKELETON: 10
```

## Liste Noire de Blocs

Empêcher les spawners d'être placés sur certains blocs :

```yaml
blacklistBlocks:
  - CHEST
  - DROPPER
  - TRAPPED_CHEST
  - CAULDRON
  - FURNACE
  - ENDER_CHEST
  - BEDROCK
  - BREWING_STAND
  - DISPENSER
  - OBSIDIAN
  - SPAWNER
  - DIAMOND_BLOCK
  - GOLD_BLOCK
  - IRON_BLOCK
  - NETHERITE_BLOCK
```

## Permission de Casse par le Propriétaire

Permettre aux propriétaires de spawners de casser leurs spawners GUI :

```yaml
# Le propriétaire peut casser pour remettre le spawner dans /spawners
ownerCanBreakSpawner: true
```

## Matériaux d'Entités

Configurez le matériau d'affichage (œuf de spawn) pour chaque type d'entité dans les GUIs :

```yaml
entitiesMaterial:
  - ZOMBIE: ZOMBIE_SPAWN_EGG
  - SKELETON: SKELETON_SPAWN_EGG
  - CREEPER: CREEPER_SPAWN_EGG
  - SPIDER: SPIDER_SPAWN_EGG
  - BLAZE: BLAZE_SPAWN_EGG
  # ... plus d'entités
```

Vous pouvez utiliser les matériaux zMenu incluant les têtes personnalisées :

```yaml
entitiesMaterial:
  - ZOMBIE: "hdb:12345"  # HeadDatabase
  - SKELETON: "base64:..."  # Texture Base64
```

## Liste Noire de Matériaux

Empêcher certains items d'être stockés dans les spawners virtuels :

```yaml
blacklist-materials:
  - BOW
  - GOLDEN_SWORD
```

## Casse de Spawner Virtuel

Permettre de casser les blocs/entités où les spawners virtuels génèreraient :

```yaml
breakUpVirtualSpawner: true
```

## Paramètres d'Expérience

Donner l'expérience directement aux joueurs depuis les spawners virtuels :

```yaml
give-player-experience: false
```

## Raison de Dépôt

Format du message pour les transactions économiques :

```yaml
deposit-reason: "Vente de x%amount% %item% pour %price% (Spawner)"
```

## Exemple de Configuration Complète

```yaml
enableDebug: false
enableDebugTime: false
storage: SQLITE
updateInterval: 120000

database-configuration:
  table-prefix: "zspawner_"
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  debug: false
  database: zspawner

items:
  CLASSIC:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Placez le spawner sur le sol"
  GUI:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Placez et accédez via &7/spawners"
  VIRTUAL:
    material: SPAWNER
    name: "&6&lSpawner &r&8- &f%type%"
    lore:
      - "&8Spawner virtuel"

chunkLimit:
  enable: true
  global: 10
  limits:
    - SKELETON: 20
    - BLAZE: 5

disableSpawnerExplosion:
  GUI: true
  CLASSIC: true
  VIRTUAL: true

dropSpawnerOnExplose:
  GUI: false
  CLASSIC: false
  VIRTUAL: false

ownerCanBreakSpawner: true
breakUpVirtualSpawner: true
give-player-experience: false
```
