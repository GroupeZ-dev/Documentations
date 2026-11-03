---
title: Installation
description: How to install zVeinMiner on your Paper server
---

# Installation

This guide covers the installation of zVeinMiner and the files it creates on first startup.

## Requirements

Before installing, ensure your server meets these requirements:

| Requirement | Version | Status |
|-------------|---------|--------|
| Java | 25 or higher | **Required** |
| [Paper](https://papermc.io/downloads/paper) | 26.3 or higher | **Required** |
| [WorldGuard](https://enginehub.org/worldguard) (+ [WorldEdit](https://enginehub.org/worldedit)) | Latest version | Optional |
| [GriefPrevention](https://modrinth.com/plugin/griefprevention) | Latest version | Optional |
| [Vault](https://www.spigotmc.org/resources/vault.34315/) + an economy plugin | Latest version | Optional |
| [PlaceholderAPI](https://modrinth.com/plugin/placeholderapi) | Latest version | Optional |
| [NoCheatPlus](https://www.spigotmc.org/resources/nocheatplus.26/) | Latest version | Optional |

zVeinMiner has **no required dependency**. Every integration is a soft dependency: the plugin detects it at startup and simply skips it when it is not installed. See [Integrations](./integrations) for what each one does.

### Supported Platforms

| Platform | Support |
|----------|---------|
| Paper 26.3+ | Recommended |
| Purpur and other Paper forks | Supported |
| Spigot / CraftBukkit | Not supported |
| Folia | Not supported |

<CalloutContainer type="warning">

<CalloutTitle>Paper plugin</CalloutTitle>

<CalloutDescription>
zVeinMiner is a **Paper plugin** (it ships a `paper-plugin.yml`). It will not load on Spigot or CraftBukkit, and it does not support Folia. Older Minecraft versions (1.21.x and below) are not supported by this release.
</CalloutDescription>

</CalloutContainer>

## Installation Steps

### 1. Download the Plugin

Download zVeinMiner from one of these sources:
- [Modrinth](https://modrinth.com/plugin/zveinminer)
- [groupez.dev](https://groupez.dev/)

### 2. Install Optional Dependencies

Install only the integrations you need:

- **WorldGuard** (requires **WorldEdit**) - Vein mining respects region protections
- **GriefPrevention** - Vein mining respects claims
- **Vault** + an economy plugin - Charge players for vein mining (`economy` section of `config.yml`)
- **PlaceholderAPI** - Placeholders from other plugins are parsed in every message sent to a player
- **NoCheatPlus** - Players are exempted from block break checks while a vein is mined

### 3. Install the Plugin

1. Stop your server
2. Place the zVeinMiner `.jar` in your `plugins/` folder
3. Start your server
4. The plugin generates its default `config.yml` and `messages.yml`

<CalloutContainer type="info">

<CalloutTitle>Updating from 1.0.0</CalloutTitle>

<CalloutDescription>
Your existing files are kept. Missing messages are added to `messages.yml` automatically, and the old `NETHERITE_SCRAP` tag is converted to `ANCIENT_DEBRIS` when presets are loaded. If your `config.yml` has no `match-by-tag` option, it defaults to `false` (exact block type matching, the 1.0.0 behavior).
</CalloutDescription>

</CalloutContainer>

### 4. Verify Installation

Run `/zveinminer` (aliases: `/veinminer`, `/zvm`, requires `zveinminer.use`) in-game or from the console. If the plugin is loaded correctly, it displays the subcommands you have permission to use. You can also run `/zveinminer list` to check that the presets from `config.yml` were loaded.

In the server console, look for lines such as:

```
[zVeinMiner] Hooked into WorldGuard
[zVeinMiner] Hooked into GriefPrevention
[zVeinMiner] Hooked into NoCheatPlus
```

The `Hooked into ...` lines only appear for the integrations that are installed. If an installed plugin cannot be hooked, the console shows `Failed to hook into <plugin>: ...` (or `<plugin> is installed but its hook is not available` for WorldGuard and GriefPrevention) instead. The Vault economy is resolved the first time it is needed and logs `Hooked into Vault economy: <provider>`.

## File Structure

After first startup, zVeinMiner creates the following structure:

```
plugins/zVeinMiner/
├── config.yml                # Main configuration: vein mining options, worlds, drops, tools, economy, presets
├── messages.yml              # All plugin messages
└── playerdata/
    └── <uuid>.yml            # Per-player toggle state and statistics
```

Player data is stored in YAML, one file per player. A file is written when the player leaves the server and when the plugin is disabled:

```yaml
vein-miner-enabled: true
statistics:
  total-blocks-mined: 0
  total-veins-mined: 0
```

There is no database to configure. See [Configuration](./configuration) for every option of `config.yml` and `messages.yml`, and [Presets & Tags](./presets-and-tags) to define which blocks can be vein mined.

## First Configuration

After installation, here are the recommended first steps:

1. **Presets** - Adjust the default `pickaxe-1` preset or add your own in the `presets` section of `config.yml`
2. **Limits** - Set `vein-mining.max-size-limit` and `vein-mining.cooldown` for your server
3. **Worlds** - Configure the `worlds.blacklist` (the End is blacklisted by default)
4. **Give items** - Use `/zveinminer apply <preset>` on the held item or `/zveinminer give <player> <preset> [material]` (default material: `DIAMOND_PICKAXE`) to create vein mining tools
5. **Reload** - Apply your changes with `/zveinminer reload`

See [Commands & Permissions](./commands-permissions) for the full command list.

## Troubleshooting

### Plugin does not start

- Check that **Java 25+** is installed: `java -version`
- Verify that the server runs **Paper 26.3 or newer** (or a Paper fork). Spigot and Folia cannot load the plugin
- Check the server console for error messages
- Ensure the `.jar` file is not corrupted by re-downloading it

### Vein mining does not trigger

- The held tool must have a preset or tags applied: check it with `/zveinminer info`
- The player needs the `zveinminer.use` permission
- The player must not be in Adventure or Spectator mode
- The broken block must match one of the tool's tags, and the tool must be the correct tool for that block (e.g. a pickaxe for ores)
- The vein size of the tool (after `vein-mining.max-size-limit`) must be greater than 1
- The player may have disabled vein mining with `/zveinminer toggle`
- If `vein-mining.require-sneak` is `true`, the player must sneak while breaking the block
- The current world may be blacklisted (or not whitelisted) in the `worlds` section
- A `cooldown` may still be active

### A preset is missing

- Invalid presets are skipped with a warning in the console (`Preset '...' has an invalid size`, `has no tags list`, ...)
- An unknown tag is skipped with `the tag '...' is not a valid block tag or block material`
- Fix the entry in `config.yml`, then run `/zveinminer reload`

### Messages are not updated

- If `messages.yml` contains a YAML syntax error, the console shows `Unable to read messages.yml, the current messages are kept` and the file is **not** overwritten. Fix the syntax and reload

### Economy does not charge players

- `economy.enabled` must be `true` and `economy.cost-per-block` and/or `economy.cost-per-vein` must be greater than `0`
- If the console shows `no Vault economy provider was found: vein mining will be free`, install an economy plugin compatible with Vault

## Next Steps

- [Commands & Permissions](./commands-permissions)
- [Configuration](./configuration)
- [Presets & Tags](./presets-and-tags)
- [Integrations](./integrations)
