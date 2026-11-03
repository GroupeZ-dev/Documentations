---
title: Configuration
description: Every option of config.yml and messages.yml in zVeinMiner
---

# Configuration

zVeinMiner uses two files, both created in `plugins/zVeinMiner/` on the first start:

| File | Content |
|------|---------|
| `config.yml` | Vein mining behavior, worlds, drops, tools, economy and presets |
| `messages.yml` | Every message sent by the plugin |

Both files are reloaded with `/zveinminer reload` (alias `rl`), see [Commands & Permissions](./commands-permissions).

---

## Default config.yml

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

## Debug Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-debug` | Boolean | `false` | Prints extra information in the console (including the stack trace of command errors). Enable it when reporting an issue to support. |
| `enable-debug-time` | Boolean | `false` | Prints timing measurements in the console, useful to check performance. |

## Vein Mining Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `vein-mining.cooldown` | Integer (ticks) | `0` | Delay between two vein mines of the same player, in ticks (20 ticks = 1 second). `0` disables the cooldown. While on cooldown, only the broken block is mined and the `cooldown` message is shown in the action bar. Players with `zveinminer.bypass.cooldown` ignore it. |
| `vein-mining.max-size-limit` | Integer | `64` | Global cap on the vein size. An item or preset size above this value is reduced to it, and `/zveinminer size` refuses a larger value. `0` or less disables the cap. |
| `vein-mining.require-sneak` | Boolean | `false` | When `true`, the player must be sneaking while breaking the block to trigger vein mining. |
| `vein-mining.match-by-tag` | Boolean | `true` | When `true`, the vein follows every block of the tag that matched the broken block (for example `COAL_ORES` connects coal ore and deepslate coal ore). When `false`, only blocks of the exact same type as the broken block are mined. |
| `vein-mining.preview` | Boolean | `true` | Shows the outline of the vein (glowing shulkers visible only to that player) when the player starts sneaking while looking at a matching block (up to 5 blocks away) with a vein mining item in hand. The outline disappears when the player stops sneaking or breaks the block. |

<CalloutContainer type="info">

<CalloutTitle>Configurations created by 1.0.0</CalloutTitle>

<CalloutDescription>
`match-by-tag` does not exist in configuration files created by version 1.0.0. When the key is missing, the plugin uses `false` (exact type matching, the old behavior). Add `match-by-tag: true` under `vein-mining` to mine the stone and deepslate variants of an ore together.
</CalloutDescription>

</CalloutContainer>

## World Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `worlds.blacklist` | List of strings | `[world_the_end]` | World names where vein mining is disabled. Names must match the world name exactly. |
| `worlds.whitelist-mode` | Boolean | `false` | When `true`, the list becomes a whitelist: vein mining only works in the listed worlds. |

## Drop Settings

These options apply to the blocks mined by the vein and to the block the player broke first.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `drops.auto-pickup` | Boolean | `false` | Puts the drops directly in the player's inventory and gives the experience directly to the player. |
| `drops.teleport-to-player` | Boolean | `false` | Drops the items at the player's feet instead of at the block, and spawns the experience orbs at the player's location. |

<CalloutContainer type="tip">

<CalloutTitle>Combining both options</CalloutTitle>

<CalloutDescription>
With only `auto-pickup` enabled, the items that do not fit in a full inventory stay where the block was. Enable `teleport-to-player` as well to drop that overflow at the player's feet.
</CalloutDescription>

</CalloutContainer>

## Tool Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tools.check-durability` | Boolean | `true` | Checks the remaining durability before each block. Vein mining stops before the tool would break, so a vein never destroys the tool. Only used when `apply-damage` is `true`, and ignored in creative mode. |
| `tools.apply-damage` | Boolean | `true` | Applies durability damage to the tool for each mined block (Unbreaking is applied like vanilla mining). When `false`, the extra blocks do not damage the tool. |

## Economy Settings

Requires Vault and an economy plugin, see [Integrations](./integrations). If Vault or an economy provider is missing, vein mining stays free.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `economy.enabled` | Boolean | `false` | Enables the cost of vein mining. |
| `economy.cost-per-block` | Decimal | `0.0` | Price of each extra block mined by the vein (the block broken by the player is not counted). `0` disables it. |
| `economy.cost-per-vein` | Decimal | `0.0` | Fixed price of each vein mine. `0` disables it. |

The total cost is `cost-per-vein + cost-per-block × mined blocks`. Before mining, the plugin checks that the player can pay for the whole vein; if not, the `economy-not-enough` message is sent and only the broken block is mined. After mining, only the blocks really broken are charged and the `economy-charged` message is sent.

## Presets

```yaml
presets:
  - name: "pickaxe-1"
    size: 8
    tags:
      - COAL_ORES
      - DIAMOND_ORE
```

| Key | Type | Description |
|-----|------|-------------|
| `name` | String | Unique name used by `/zveinminer apply`, `set` and `give`. |
| `size` | Integer | Maximum number of blocks mined by one vein, the block broken by the player included. Must be greater than `0` (a size of `1` only breaks the block itself), capped by `max-size-limit`. |
| `tags` | List of strings | Block tags (`COAL_ORES`) or block materials (`DIAMOND_ORE`) the item can vein mine. |

Presets keep the order of the file. An invalid preset (no name, invalid size, no tag list) or an unknown tag is skipped with a warning in the console instead of breaking the loading. See [Presets & Tags](./presets-and-tags) for the available tags and how presets are applied to items.

---

## messages.yml

### How it works

- The file is generated on the first start with every message and its default value.
- Each key is the message name in lowercase with `-` (for example `size-too-large`).
- When an update adds a new message, it is written to your existing file with its default value, so you only have to translate it. Your other messages are kept.
- If `messages.yml` contains a YAML error, it is **not** overwritten: an error is printed in the console and the current messages are kept.

### Formatting

| Feature | Supported | Example |
|---------|-----------|---------|
| Legacy color codes `&` | Yes | `&a&lSuccess` |
| Hex colors `#RRGGBB` | Yes | `#ff8800Orange text` |
| MiniMessage (`<red>`, `<gradient>`) | No | |
| PlaceholderAPI placeholders | Yes, when PlaceholderAPI is installed and the message is sent to a player | `%player_name%` |
| Multi-line messages | Yes, with a YAML list | See below |

Chat messages start with the `prefix` message. A list with several lines sends each line separately, without the prefix; a list with a single line is treated as a simple message.

```yaml
prefix: "&8(&6zVeinMiner&8) "
reload: "&aYou have just reloaded the configuration files."
info-header:
  - "&8&m-----------------"
  - "&6Item vein mining info:"
```

<CalloutContainer type="info">

<CalloutTitle>Display type</CalloutTitle>

<CalloutDescription>
The display type of a message cannot be changed from `messages.yml`. Every message is sent in the chat, except `cooldown` which is sent in the action bar (without the prefix). Messages sent to the console always use the chat format.
</CalloutDescription>

</CalloutContainer>

### General and commands

| Key | Placeholders | Default |
|-----|--------------|---------|
| `prefix` | | `&8(&6zVeinMiner&8) ` |
| `command-syntax-error` | `%syntax%` | `&cYou must execute the command like this&7: &a%syntax%` |
| `command-no-permission` | | `&cYou do not have permission to run this command.` |
| `command-no-console` | | `&cOnly one player can execute this command.` |
| `command-no-arg` | | `&cImpossible to find the command with its arguments.` |
| `command-syntax-help` | `%syntax%`, `%description%` | `&f%syntax% &7» &7%description%` |
| `reload` | | `&aYou have just reloaded the configuration files.` |

### Command descriptions

Used as `%description%` in `command-syntax-help`.

| Key | Default |
|-----|---------|
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

### Presets and size

| Key | Placeholders | Default |
|-----|--------------|---------|
| `preset-not-found` | `%name%` | `&cThe vein preset &f%name% &cwas not found.` |
| `preset-cannot-be-applied` | `%name%` | `&cYou cannot apply the vein preset &f%name% &cto this item.` |
| `preset-apply` | `%name%` | `&aYou have just applied the vein preset &f%name% &ato the item.` |
| `size-cannot-be-changed` | | `&cYou cannot apply a vein size to this item.` |
| `size-change` | `%size%` | `&aYou have just applied the vein size &f%size% &ato the item.` |
| `size-display` | `%size%` | `&aThe vein size of the item is &f%size%.` |
| `size-invalid` | | `&cInvalid vein size.` |
| `size-too-large` | `%max%` | `&cThe vein size cannot exceed &f%max%&c.` |

### Tags

| Key | Placeholders | Default |
|-----|--------------|---------|
| `tag-not-found` | `%tag%` | `&cThe tag &f%tag% &cwas not found.` |
| `tag-cannot-be-added` | `%tag%` | `&cYou cannot add the tag &f%tag% &cto this item.` |
| `tag-cannot-be-removed` | `%tag%` | `&cYou cannot remove the tag &f%tag% &cfrom this item.` |
| `tag-add` | `%tag%` | `&aYou have just added the tag &f%tag% &ato the item.` |
| `tag-add-error` | `%tag%` | `&cThis item have already the tag &f%tag%.` |
| `tag-remove` | `%tag%` | `&aYou have just removed the tag &f%tag% &ato the item.` |
| `tag-remove-error` | `%tag%` | `&cThis item don't have the tag &f%tag%.` |

### Toggle, list, info, give and stats

| Key | Placeholders | Default |
|-----|--------------|---------|
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

### Mining

| Key | Placeholders | Default |
|-----|--------------|---------|
| `economy-not-enough` | `%amount%` | `&cYou don't have enough money. Required: &f%amount%` |
| `economy-charged` | `%amount%` | `&aYou have been charged &f%amount%&a.` |
| `world-disabled` | | `&cVein mining is disabled in this world.` |
| `cooldown` | `%seconds%` | `&cYou must wait &f%seconds%s &cbefore vein mining again.` |

`%amount%` is formatted by your economy plugin through Vault, and `%seconds%` is the remaining cooldown with one decimal (for example `1.5`). In `list-entry` and `info-tags`, `%tags%` is the comma-separated list of tags (`None` in `info-tags` when the item has no tag).

<CalloutContainer type="warning">

<CalloutTitle>Unused keys</CalloutTitle>

<CalloutDescription>
`info-preset` and `world-disabled` exist in `messages.yml` but are not sent by the current version: `/zveinminer info` only shows the size and the tags, and in a disabled world the block is broken normally without any message.
</CalloutDescription>

</CalloutContainer>
