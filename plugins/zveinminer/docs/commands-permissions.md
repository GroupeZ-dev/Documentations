---
title: Commands & Permissions
description: Complete list of all commands and permissions for zVeinMiner
---

# Commands & Permissions

This page contains the complete list of all commands and permissions available in zVeinMiner.

<CalloutContainer type="info">

<CalloutTitle>Syntax Guide</CalloutTitle>

<CalloutDescription>
- `< >` indicates a **required** argument.
- `[ ]` indicates an **optional** argument.
- `|` separates multiple aliases for the same command or sub-command.
</CalloutDescription>

</CalloutContainer>

---

## Main Command

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/zveinminer` | `veinminer`, `zvm` | `zveinminer.use` | Display the list of sub-commands you have access to |

Running `/zveinminer` without arguments prints every sub-command whose permission you have, with its syntax and description. Each sub-command only checks its own permission.

---

## Player Commands

Granted to everyone by default.

| Command | Permission | Description |
|---------|------------|-------------|
| `/zveinminer toggle\|t` | `zveinminer.toggle` | Toggle vein mining on/off for yourself |
| `/zveinminer list\|l` | `zveinminer.list` | List the available presets with their size and tags |
| `/zveinminer info\|i` | `zveinminer.info` | Show the vein size and tags of the item in your main hand |
| `/zveinminer stats\|statistics` | `zveinminer.stats` | Show your vein mining statistics (blocks mined and veins mined) |

- `toggle` is stored per player, so your choice is kept between sessions.
- `info` shows the **effective** data of the item: the values stored on the item, or the ones inherited from its preset. If the item has no vein miner data (or its effective vein size is `0`), a "no data" message is shown.

---

## Item Management Commands

Reserved to operators by default. All of them work on the item held in your **main hand**, except `give`.

| Command | Permission | Description |
|---------|------------|-------------|
| `/zveinminer apply\|a <preset>` | `zveinminer.apply` | Link a preset to the held item |
| `/zveinminer set\|st <preset>` | `zveinminer.set` | Copy the size and tags of a preset onto the held item |
| `/zveinminer add\|ad <tag>` | `zveinminer.add` | Add a tag (block tag or block material) to the held item |
| `/zveinminer remove\|r <tag>` | `zveinminer.remove` | Remove a tag from the held item |
| `/zveinminer size\|s [size]` | `zveinminer.size` | Show or change the vein size of the held item |
| `/zveinminer give\|g <player> <preset> [material]` | `zveinminer.give` | Give a player an item with a preset |

### apply vs set

Both commands take a preset name from `config.yml` (tab completion lists them), but they do not store the same thing on the item:

| Command | Stored on the item | Effect of a later preset change |
|---------|--------------------|----------------------------------|
| `apply` | Only the **name** of the preset | The item follows the preset: edit the preset, `/zveinminer reload`, and the item uses the new values |
| `set` | A **copy** of the preset's size and tags | The item keeps the copied values, the preset can change without affecting it |

A size or tag list stored directly on the item always takes priority over the values of a linked preset. See [Presets & Tags](./presets-and-tags) for details.

### add and remove

- `<tag>` accepts a block tag name (such as `COAL_ORES`) or a block material name (such as `DIAMOND_ORE`). Tab completion of `add` suggests every known tag and block material; tab completion of `remove` suggests the tags of the item you are holding.
- Both commands start from the item's effective tags (its own tags, or those inherited from its preset), then write the result on the item.
- An unknown tag is refused, and adding a tag already present (or removing one that is absent) sends an error message.

### size

- Without argument, `/zveinminer size` displays the current (effective) vein size of the held item, `0` if it has no vein miner data.
- `[size]` must be `0` or a positive integer. It cannot exceed `vein-mining.max-size-limit` (default `64`, a value of `0` disables the limit), see [Configuration](./configuration).
- `/zveinminer size 0` removes the size stored on the item, so it falls back to the size of its linked preset (if any).

### give

- `<player>` must be the **exact** name of an online player.
- `[material]` is any item material, `DIAMOND_PICKAXE` by default. An unknown or non-item material is refused.
- The preset is copied onto the new item (same behavior as `set`). If the player's inventory is full, the item is dropped at their feet.

---

## Admin Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/zveinminer reload\|rl` | `zveinminer.reload` | Reload the configuration files |

<CalloutContainer type="warning">

<CalloutTitle>Console usage</CalloutTitle>

<CalloutDescription>
Only `reload`, `list` and `give` can be run from the console. Every other sub-command needs an item in hand or a player context and is refused when used by the console.
</CalloutDescription>

</CalloutContainer>

---

## Examples

```
/zvm list
/zvm toggle
/zveinminer apply pickaxe-1
/zveinminer set pickaxe-1
/zveinminer add COAL_ORES
/zveinminer remove DIAMOND_ORE
/zveinminer size
/zveinminer size 16
/zveinminer give Maxlego08 pickaxe-1
/zveinminer give Maxlego08 pickaxe-1 NETHERITE_PICKAXE
/zveinminer reload
```

---

## Permissions

| Permission | Default | Description |
|------------|---------|-------------|
| `zveinminer.use` | Everyone | Use vein mining and the `/zveinminer` command |
| `zveinminer.toggle` | Everyone | Toggle vein mining on/off |
| `zveinminer.list` | Everyone | List the available presets |
| `zveinminer.info` | Everyone | Show the vein mining data of the held item |
| `zveinminer.stats` | Everyone | Show your vein mining statistics |
| `zveinminer.reload` | OP | Reload the configuration files |
| `zveinminer.apply` | OP | Apply a preset to the held item |
| `zveinminer.set` | OP | Copy the properties of a preset to the held item |
| `zveinminer.add` | OP | Add a tag to the held item |
| `zveinminer.remove` | OP | Remove a tag from the held item |
| `zveinminer.size` | OP | Change the vein size of the held item |
| `zveinminer.give` | OP | Give an item with a preset |
| `zveinminer.bypass.cooldown` | OP | Ignore the vein mining cooldown |
| `zveinminer.admin` | OP | Grants every permission above |

<CalloutContainer type="tip">

<CalloutTitle>Vein mining itself</CalloutTitle>

<CalloutDescription>
`zveinminer.use` is also checked every time a player breaks a block: without it, the player mines normally even with a configured tool. `zveinminer.bypass.cooldown` only matters when a cooldown is set in the [configuration](./configuration).
</CalloutDescription>

</CalloutContainer>
