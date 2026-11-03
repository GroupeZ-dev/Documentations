---
title: Configuration
description: Toutes les options de config.yml et messages.yml de zVeinMiner
---

# Configuration

zVeinMiner utilise deux fichiers, tous deux créés dans `plugins/zVeinMiner/` au premier démarrage :

| Fichier | Contenu |
|---------|---------|
| `config.yml` | Comportement du vein mining, mondes, drops, outils, économie et presets |
| `messages.yml` | Tous les messages envoyés par le plugin |

Les deux fichiers sont rechargés avec `/zveinminer reload` (alias `rl`), voir [Commandes & Permissions](./commands-permissions).

---

## config.yml par défaut

```yaml
# Debug settings
enable-debug: false
enable-debug-time: false

# Vein mining settings
vein-mining:
  # Cooldown between vein mines in ticks (0 = disabled)
  cooldown: 0
  # Maximum vein size limit (overrides preset if lower)
  max-size-limit: 64
  # Require player to sneak to activate vein mining
  require-sneak: false
  # Connect every block of the matched tag (e.g. COAL_ORES mines coal ore and deepslate coal ore together)
  # If false, only blocks of the exact same type as the broken block are mined
  match-by-tag: true
  # Show the outline of the vein while sneaking
  preview: true

# World settings
worlds:
  # List of worlds where vein mining is disabled (or enabled if whitelist-mode is true)
  blacklist:
    - world_the_end
  # If true, the list above becomes a whitelist instead
  whitelist-mode: false

# Drop settings
drops:
  # Teleport drops to the player's location
  teleport-to-player: false
  # Automatically pick up drops into player's inventory
  auto-pickup: false

# Tool settings
tools:
  # Check tool durability before mining (prevents breaking more blocks than durability allows)
  check-durability: true
  # Apply durability damage to the tool
  apply-damage: true

# Economy settings (requires Vault)
economy:
  enabled: false
  # Cost per block mined (0 = disabled)
  cost-per-block: 0.0
  # Cost per vein mine action (0 = disabled)
  cost-per-vein: 0.0

# Preset definitions
presets:
  - name: "pickaxe-1"
    size: 8
    tags:
      - COAL_ORES
      - COPPER_ORES
      - DIAMOND_ORES
      - EMERALD_ORES
      - GOLD_ORES
      - IRON_ORES
      - LAPIS_ORES
      - REDSTONE_ORES
      - ANCIENT_DEBRIS
```

---

## Paramètres de debug

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `enable-debug` | Booléen | `false` | Affiche des informations supplémentaires dans la console (dont la stack trace des erreurs de commande). Activez-le lorsque vous signalez un problème au support. |
| `enable-debug-time` | Booléen | `false` | Affiche des mesures de temps dans la console, utile pour vérifier les performances. |

## Paramètres du vein mining

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `vein-mining.cooldown` | Entier (ticks) | `0` | Délai entre deux vein mines d'un même joueur, en ticks (20 ticks = 1 seconde). `0` désactive le cooldown. Pendant le cooldown, seul le bloc cassé est miné et le message `cooldown` s'affiche dans l'action bar. Les joueurs ayant `zveinminer.bypass.cooldown` l'ignorent. |
| `vein-mining.max-size-limit` | Entier | `64` | Limite globale de la taille d'une veine. Une taille d'item ou de preset supérieure à cette valeur y est ramenée, et `/zveinminer size` refuse une valeur plus grande. `0` ou moins désactive la limite. |
| `vein-mining.require-sneak` | Booléen | `false` | Si `true`, le joueur doit être accroupi en cassant le bloc pour déclencher le vein mining. |
| `vein-mining.match-by-tag` | Booléen | `true` | Si `true`, la veine suit tous les blocs du tag qui correspond au bloc cassé (par exemple `COAL_ORES` relie le minerai de charbon et le minerai de charbon des abîmes). Si `false`, seuls les blocs exactement du même type que le bloc cassé sont minés. |
| `vein-mining.preview` | Booléen | `true` | Affiche le contour de la veine (des shulkers lumineux visibles uniquement par ce joueur) lorsque le joueur s'accroupit en regardant un bloc compatible (jusqu'à 5 blocs de distance) avec un item de vein mining en main. Le contour disparaît lorsque le joueur se relève ou casse le bloc. |

<CalloutContainer type="info">

<CalloutTitle>Configurations créées par la 1.0.0</CalloutTitle>

<CalloutDescription>
`match-by-tag` n'existe pas dans les fichiers de configuration créés par la version 1.0.0. Lorsque la clé est absente, le plugin utilise `false` (correspondance exacte du type, l'ancien comportement). Ajoutez `match-by-tag: true` sous `vein-mining` pour miner ensemble les variantes pierre et abîmes d'un minerai.
</CalloutDescription>

</CalloutContainer>

## Paramètres des mondes

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `worlds.blacklist` | Liste de chaînes | `[world_the_end]` | Noms des mondes où le vein mining est désactivé. Les noms doivent correspondre exactement au nom du monde. |
| `worlds.whitelist-mode` | Booléen | `false` | Si `true`, la liste devient une whitelist : le vein mining ne fonctionne que dans les mondes listés. |

## Paramètres des drops

Ces options s'appliquent aux blocs minés par la veine ainsi qu'au premier bloc cassé par le joueur.

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `drops.auto-pickup` | Booléen | `false` | Place les drops directement dans l'inventaire du joueur et lui donne directement l'expérience. |
| `drops.teleport-to-player` | Booléen | `false` | Fait tomber les items aux pieds du joueur au lieu de l'emplacement du bloc, et fait apparaître les orbes d'expérience à la position du joueur. |

<CalloutContainer type="tip">

<CalloutTitle>Combiner les deux options</CalloutTitle>

<CalloutDescription>
Avec uniquement `auto-pickup` activé, les items qui ne rentrent pas dans un inventaire plein restent à l'emplacement du bloc. Activez aussi `teleport-to-player` pour faire tomber ce surplus aux pieds du joueur.
</CalloutDescription>

</CalloutContainer>

## Paramètres des outils

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `tools.check-durability` | Booléen | `true` | Vérifie la durabilité restante avant chaque bloc. Le vein mining s'arrête avant que l'outil ne casse, une veine ne détruit donc jamais l'outil. Utilisé uniquement lorsque `apply-damage` vaut `true`, et ignoré en mode créatif. |
| `tools.apply-damage` | Booléen | `true` | Applique des dégâts de durabilité à l'outil pour chaque bloc miné (Solidité est appliqué comme en minage vanilla). Si `false`, les blocs supplémentaires n'abîment pas l'outil. |

## Paramètres d'économie

Nécessite Vault et un plugin d'économie, voir [Intégrations](./integrations). Si Vault ou le fournisseur d'économie est absent, le vein mining reste gratuit.

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `economy.enabled` | Booléen | `false` | Active le coût du vein mining. |
| `economy.cost-per-block` | Décimal | `0.0` | Prix de chaque bloc supplémentaire miné par la veine (le bloc cassé par le joueur n'est pas compté). `0` le désactive. |
| `economy.cost-per-vein` | Décimal | `0.0` | Prix fixe de chaque vein mine. `0` le désactive. |

Le coût total est `cost-per-vein + cost-per-block × blocs minés`. Avant de miner, le plugin vérifie que le joueur peut payer la veine entière ; sinon, le message `economy-not-enough` est envoyé et seul le bloc cassé est miné. Après le minage, seuls les blocs réellement cassés sont facturés et le message `economy-charged` est envoyé.

## Presets

```yaml
presets:
  - name: "pickaxe-1"
    size: 8
    tags:
      - COAL_ORES
      - DIAMOND_ORE
```

| Clé | Type | Description |
|-----|------|-------------|
| `name` | Chaîne | Nom unique utilisé par `/zveinminer apply`, `set` et `give`. |
| `size` | Entier | Nombre maximum de blocs minés par une veine, bloc cassé par le joueur inclus. Doit être supérieur à `0` (une taille de `1` ne casse que le bloc lui-même), limité par `max-size-limit`. |
| `tags` | Liste de chaînes | Tags de blocs (`COAL_ORES`) ou matériaux de blocs (`DIAMOND_ORE`) que l'item peut miner en veine. |

Les presets conservent l'ordre du fichier. Un preset invalide (sans nom, taille invalide, sans liste de tags) ou un tag inconnu est ignoré avec un avertissement dans la console au lieu de bloquer le chargement. Consultez [Presets & Tags](./presets-and-tags) pour les tags disponibles et la façon dont les presets sont appliqués aux items.

---

## messages.yml

### Fonctionnement

- Le fichier est généré au premier démarrage avec tous les messages et leur valeur par défaut.
- Chaque clé est le nom du message en minuscules avec des `-` (par exemple `size-too-large`).
- Lorsqu'une mise à jour ajoute un nouveau message, il est écrit dans votre fichier existant avec sa valeur par défaut, vous n'avez donc qu'à le traduire. Vos autres messages sont conservés.
- Si `messages.yml` contient une erreur YAML, il n'est **pas** écrasé : une erreur est affichée dans la console et les messages actuels sont conservés.

### Mise en forme

| Fonctionnalité | Supportée | Exemple |
|----------------|-----------|---------|
| Codes couleur legacy `&` | Oui | `&a&lSuccess` |
| Couleurs hex `#RRGGBB` | Oui | `#ff8800Orange text` |
| MiniMessage (`<red>`, `<gradient>`) | Non | |
| Placeholders PlaceholderAPI | Oui, lorsque PlaceholderAPI est installé et que le message est envoyé à un joueur | `%player_name%` |
| Messages multi-lignes | Oui, avec une liste YAML | Voir ci-dessous |

Les messages du chat commencent par le message `prefix`. Une liste de plusieurs lignes envoie chaque ligne séparément, sans le préfixe ; une liste d'une seule ligne est traitée comme un message simple.

```yaml
prefix: "&8(&6zVeinMiner&8) "
reload: "&aYou have just reloaded the configuration files."
info-header:
  - "&8&m-----------------"
  - "&6Item vein mining info:"
```

<CalloutContainer type="info">

<CalloutTitle>Type d'affichage</CalloutTitle>

<CalloutDescription>
Le type d'affichage d'un message ne peut pas être modifié depuis `messages.yml`. Tous les messages sont envoyés dans le chat, sauf `cooldown` qui est envoyé dans l'action bar (sans le préfixe). Les messages envoyés à la console utilisent toujours le format chat.
</CalloutDescription>

</CalloutContainer>

### Général et commandes

| Clé | Placeholders | Défaut |
|-----|--------------|--------|
| `prefix` | | `&8(&6zVeinMiner&8) ` |
| `command-syntax-error` | `%syntax%` | `&cYou must execute the command like this&7: &a%syntax%` |
| `command-no-permission` | | `&cYou do not have permission to run this command.` |
| `command-no-console` | | `&cOnly one player can execute this command.` |
| `command-no-arg` | | `&cImpossible to find the command with its arguments.` |
| `command-syntax-help` | `%syntax%`, `%description%` | `&f%syntax% &7» &7%description%` |
| `reload` | | `&aYou have just reloaded the configuration files.` |

### Descriptions des commandes

Utilisées comme `%description%` dans `command-syntax-help`.

| Clé | Défaut |
|-----|--------|
| `description-reload` | `Reload configuration files` |
| `description-apply` | `Apply a vein preset to an item` |
| `description-set` | `Set a vein preset to an item` |
| `description-add` | `Add a taggable to an item` |
| `description-remove` | `Remove a taggable from an item` |
| `description-size` | `Change vein size for an item` |
| `description-toggle` | `Toggle vein mining on/off` |
| `description-list` | `List available presets` |
| `description-info` | `Show info about the item in hand` |
| `description-give` | `Give an item with a preset` |
| `description-stats` | `Show your vein mining statistics` |

### Presets et taille

| Clé | Placeholders | Défaut |
|-----|--------------|--------|
| `preset-not-found` | `%name%` | `&cThe vein preset &f%name% &cwas not found.` |
| `preset-cannot-be-applied` | `%name%` | `&cYou cannot apply the vein preset &f%name% &cto this item.` |
| `preset-apply` | `%name%` | `&aYou have just applied the vein preset &f%name% &ato the item.` |
| `size-cannot-be-changed` | | `&cYou cannot apply a vein size to this item.` |
| `size-change` | `%size%` | `&aYou have just applied the vein size &f%size% &ato the item.` |
| `size-display` | `%size%` | `&aThe vein size of the item is &f%size%.` |
| `size-invalid` | | `&cInvalid vein size.` |
| `size-too-large` | `%max%` | `&cThe vein size cannot exceed &f%max%&c.` |

### Tags

| Clé | Placeholders | Défaut |
|-----|--------------|--------|
| `tag-not-found` | `%tag%` | `&cThe tag &f%tag% &cwas not found.` |
| `tag-cannot-be-added` | `%tag%` | `&cYou cannot add the tag &f%tag% &cto this item.` |
| `tag-cannot-be-removed` | `%tag%` | `&cYou cannot remove the tag &f%tag% &cfrom this item.` |
| `tag-add` | `%tag%` | `&aYou have just added the tag &f%tag% &ato the item.` |
| `tag-add-error` | `%tag%` | `&cThis item have already the tag &f%tag%.` |
| `tag-remove` | `%tag%` | `&aYou have just removed the tag &f%tag% &ato the item.` |
| `tag-remove-error` | `%tag%` | `&cThis item don't have the tag &f%tag%.` |

### Toggle, list, info, give et stats

| Clé | Placeholders | Défaut |
|-----|--------------|--------|
| `toggle-enabled` | | `&aVein mining has been &2enabled&a.` |
| `toggle-disabled` | | `&aVein mining has been &cdisabled&a.` |
| `list-header` | | `&6Available presets:` |
| `list-entry` | `%name%`, `%size%`, `%tags%` | `&7- &f%name% &7(size: &e%size%&7, tags: &e%tags%&7)` |
| `list-empty` | | `&cNo presets available.` |
| `info-header` | | `&6Item vein mining info:` |
| `info-size` | `%size%` | `&7Vein size: &e%size%` |
| `info-tags` | `%tags%` | `&7Tags: &e%tags%` |
| `info-preset` | `%preset%` | `&7Preset: &e%preset%` |
| `info-no-data` | | `&cThis item has no vein mining data.` |
| `give-success` | `%player%`, `%preset%` | `&aGave &f%player% &aan item with preset &f%preset%&a.` |
| `give-player-not-found` | `%player%` | `&cPlayer &f%player% &cnot found.` |
| `stats-header` | | `&6Your vein mining statistics:` |
| `stats-blocks-mined` | `%blocks%` | `&7Total blocks mined: &e%blocks%` |
| `stats-veins-mined` | `%veins%` | `&7Total veins mined: &e%veins%` |

### Minage

| Clé | Placeholders | Défaut |
|-----|--------------|--------|
| `economy-not-enough` | `%amount%` | `&cYou don't have enough money. Required: &f%amount%` |
| `economy-charged` | `%amount%` | `&aYou have been charged &f%amount%&a.` |
| `world-disabled` | | `&cVein mining is disabled in this world.` |
| `cooldown` | `%seconds%` | `&cYou must wait &f%seconds%s &cbefore vein mining again.` |

`%amount%` est formaté par votre plugin d'économie via Vault, et `%seconds%` correspond au cooldown restant avec une décimale (par exemple `1.5`). Dans `list-entry` et `info-tags`, `%tags%` est la liste des tags séparés par des virgules (`None` dans `info-tags` lorsque l'item n'a aucun tag).

<CalloutContainer type="warning">

<CalloutTitle>Clés inutilisées</CalloutTitle>

<CalloutDescription>
`info-preset` et `world-disabled` existent dans `messages.yml` mais ne sont pas envoyés par la version actuelle : `/zveinminer info` n'affiche que la taille et les tags, et dans un monde désactivé le bloc est cassé normalement sans aucun message.
</CalloutDescription>

</CalloutContainer>
