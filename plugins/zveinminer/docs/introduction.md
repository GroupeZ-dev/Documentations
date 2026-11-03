---
title: Introduction
description: Introduction to zVeinMiner - A configurable vein mining plugin for Paper servers, driven by presets stored on items
---

# zVeinMiner

Welcome to the official zVeinMiner documentation!

zVeinMiner is a vein mining plugin for Paper servers. When a player breaks a block with a vein mining item, every connected block of the same kind is broken too, up to a configurable size. What an item can mine is not global: each item carries its own **preset**, **vein size** and **tags**, so you can hand out a small coal pickaxe, a large ore pickaxe or a lumberjack axe from the same plugin.

<CalloutContainer type="info">

<CalloutTitle>Paper plugin</CalloutTitle>

<CalloutDescription>
zVeinMiner is a Paper plugin (`paper-plugin.yml`). It requires **Paper 26.3 or newer** (or a fork such as Purpur) and **Java 25**. Spigot and Folia are not supported. See the [Installation Guide](./installation).
</CalloutDescription>

</CalloutContainer>

## Key Features

### Vein Mining by Preset

- **Presets** - Define as many presets as you want in `config.yml`, each with a name, a vein size and a list of tags
- **Data stored on the item** - The preset name, vein size and tags are written in the item's PersistentDataContainer, so each item keeps its own settings
- **Tags** - A tag is either a single block material (`DIAMOND_ORE`) or the name of a Bukkit material tag (`COAL_ORES`, `LOGS`...)
- **Tag matching** - With `match-by-tag`, the stone and deepslate variants of an ore are mined together
- **Item commands** - Apply, set, resize, add or remove tags on the held item, or give an item with a preset

See [Presets & Tags](./presets-and-tags) for the details.

### Sneak Preview

While sneaking with a vein mining item and looking at a matching block, the player sees a glowing outline of the blocks that will be mined. The preview only exists for its owner, uses non-persistent entities, and can be turned off with the `preview` option.

### Tool Handling

- **Durability check** - With `check-durability` (enabled by default), the tool durability is checked block by block and vein mining stops before the tool breaks
- **Tool damage** - `apply-damage` can be disabled so the extra blocks do not damage the tool
- **Unbreaking** - Unbreaking is applied like in vanilla mining
- **Right tool only** - Vein mining only starts when the held item is the right tool for the broken block, and blocks that need another tool are not part of the vein
- **Enchantments** - Blocks are broken like a normal player break, so Silk Touch and Fortune apply to every block
- **Creative mode** - No durability damage in creative mode

### Plugin Compatibility

Every extra block is broken through a real player break, which fires a `BlockBreakEvent` for each block. Protection plugins (Towny, Lands, WorldGuard...), logging plugins (CoreProtect) and reward plugins (Jobs, mcMMO) see every mined block, not only the first one.

### Player Features

- **Toggle** - Players can enable or disable vein mining for themselves with `/zveinminer toggle`
- **Statistics** - Total blocks and veins mined are tracked per player and shown with `/zveinminer stats`
- **Persistent data** - Preferences and statistics are saved in `plugins/zVeinMiner/playerdata/<uuid>.yml`

### Server Control

- **Cooldown** - Optional cooldown in ticks between two vein mines (bypassable with a permission)
- **Sneak requirement** - Optionally require sneaking to trigger vein mining
- **Global size limit** - `max-size-limit` caps the vein size of every item
- **Per-world control** - Blacklist or whitelist worlds
- **Drops** - Optionally teleport the drops to the player or pick them up automatically
- **Economy** - Optionally charge a cost per block and/or per vein (requires Vault)
- **Configurable messages** - Every message can be edited in `messages.yml`, missing messages are added automatically on update

### Protections & Integrations

All integrations are optional soft dependencies:

- **WorldGuard** - Only blocks the player is allowed to break are mined
- **GriefPrevention** - Claims are respected
- **NoCheatPlus** - Players are exempted from the block break checks while a vein is mined
- **Vault** - Economy costs
- **PlaceholderAPI** - Placeholders are replaced in every message sent to a player (zVeinMiner does not register placeholders of its own)

See [Integrations](./integrations).

### Developer API

zVeinMiner exposes a `VeinManager` and a `PlayerManager` through Bukkit's ServicesManager, custom events (`VeinMineStartEvent`, `VeinMineBlockEvent`, `VeinMineCompleteEvent`) and methods to apply presets and tags to items. See [API](./api).

## How It Works

1. A player breaks a block with an item that carries vein mining data.
2. zVeinMiner checks the game mode (not in adventure or spectator), the `zveinminer.use` permission, the toggle, the world, the sneak requirement, that the vein size is greater than 1, that the block matches one of the item's tags and that the item is the right tool for it, then the cooldown.
3. Connected matching blocks are found with a breadth-first search, limited by the item's vein size and `max-size-limit`.
4. Blocks the player cannot break (protections, spawn protection) are removed, the economy cost is checked and `VeinMineStartEvent` is fired.
5. Each remaining block is broken one by one, with its own `BlockBreakEvent`, tool damage and drops, until the vein is done or the tool would break.
6. The economy cost is charged for the blocks really broken, the player's statistics are updated and `VeinMineCompleteEvent` is fired.

## Requirements

| Requirement | Version |
|-------------|---------|
| Java | 25 or higher |
| Server | Paper 26.3 or higher |

## Supported Platforms

| Platform | Support |
|----------|---------|
| Paper | Recommended |
| Purpur and other Paper forks | Supported |
| Spigot | Not supported |
| Folia | Not supported |

## Quick Links

- [Installation Guide](./installation)
- [Commands & Permissions](./commands-permissions)
- [Configuration](./configuration)
- [Presets & Tags](./presets-and-tags)
- [Integrations](./integrations)
- [API](./api)

## Support

- **Discord**: Join our [Discord server](https://discord.groupez.dev) for support

## Download

- **Modrinth**: [modrinth.com/plugin/zveinminer](https://modrinth.com/plugin/zveinminer)
- **groupez.dev**: [groupez.dev](https://groupez.dev/)
