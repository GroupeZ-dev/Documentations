---
sidebar_position: 3
title: Commands & Permissions
description: Complete list of all commands and permissions for zEssentials
---

# Commands & Permissions

This page contains the complete list of all commands and permissions available in zEssentials. Commands are organized by category for easy reference.

:::info Syntax Guide
- `< >` indicates a **required** argument.
- `[ ]` indicates an **optional** argument.
- `|` separates multiple aliases for the same command.
:::

---

## Gamemode Commands

Commands for changing player gamemode.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/gamemode` | `gm` | `essentials.gamemode` | Change player gamemode |
| `/gmc` | `creat` | `essentials.gamemode.creative` | Switch to creative mode |
| `/gma` | `advent` | `essentials.gamemode.adventure` | Switch to adventure mode |
| `/gms` | `survi` | `essentials.gamemode.survival` | Switch to survival mode |
| `/gmsp` | `spec` | `essentials.gamemode.spectator` | Switch to spectator mode |

---

## Weather & Time Commands

Commands for controlling weather and time, including per-player overrides.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/day` | - | `essentials.day` | Set the time to day |
| `/night` | - | `essentials.night` | Set the time to night |
| `/sun` | - | `essentials.sun` | Set the weather to sunny |
| `/player-weather` | `pweather` | `essentials.player.weather` | Change personal weather (client-side only) |
| `/player-time` | `ptime` | `essentials.player.time` | Change personal time (client-side only) |

---

## Teleportation Commands

Commands for teleporting players to locations, other players, or random coordinates.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/tp` | - | `essentials.tp` | Teleport to a player or location |
| `/tpall` | - | `essentials.tp.all` | Teleport all players to you |
| `/tphere` | `s` | `essentials.tp.here` | Teleport a player to you |
| `/tpa` | - | `essentials.tpa` | Request to teleport to a player |
| `/tpahere` | - | `essentials.tpa.here` | Request a player to teleport to you |
| `/tpaccept` | `tpyes` | `essentials.tpa.accept` | Accept an incoming teleport request |
| `/tpdeny` | `tpno` | `essentials.tpa.deny` | Deny an incoming teleport request |
| `/tpacancel` | - | `essentials.tpa.cancel` | Cancel your outgoing teleport request |
| `/back` | - | `essentials.back` | Teleport to your previous location |
| `/tpr` | `rtp` | `essentials.tp.random` | Teleport to a random location |
| `/top` | - | `essentials.top` | Teleport to the highest block at your position |
| `/bottom` | - | `essentials.bottom` | Teleport to the lowest block at your position |
| `/worldtp` | `wtp` | `essentials.tp.world` | Teleport to another world |

---

## Spawn Commands

Commands for managing and teleporting to spawn points.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/spawn` | - | `essentials.spawn` | Teleport to the server spawn |
| `/setspawn` | - | `essentials.set.spawn` | Set the server spawn location |
| `/firstspawn` | - | `essentials.spawn.first` | Teleport to the first spawn point |
| `/setfirstspawn` | - | `essentials.set.first.spawn` | Set the first spawn point for new players |

---

## Warp Commands

Commands for creating, deleting, and teleporting to warps.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/warp` | `w` | `essentials.warp` | Teleport to a warp |
| `/setwarp` | `wcreate` | `essentials.warp.set` | Create a new warp |
| `/delwarp` | `wdelete` | `essentials.warp.del` | Delete an existing warp |
| `/warps` | `wlist` | `essentials.warps` | List all available warps |

---

## Home Commands

Commands for managing personal home locations.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/home` | `h`, `homes` | `essentials.home` | Teleport to a home |
| `/sethome` | `hcreate`, `hc` | `essentials.set.home` | Create a new home |
| `/sethomeconfirm` | - | `essentials.set.home.confirm` | Confirm home creation |
| `/delhome` | `hdelete`, `hd` | `essentials.del.home` | Delete a home |
| `/delhomeconfirm` | - | `essentials.del.home.confirm` | Confirm home deletion |

---

## Economy Commands

Commands for managing the in-game economy, balances, and payments.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/money` | `balance` | `essentials.money` | Show your current balance |
| `/pay` | - | `essentials.pay` | Pay another player |
| `/paytoggle` | - | `essentials.pay.toggle` | Toggle whether you can receive payments |
| `/economy` | `eco` | `essentials.eco.use` | Manage economies |
| `/balancetop` | `baltop` | `essentials.balance.top` | Show the top balances leaderboard |

### Economy Subcommands

The `/economy` command supports the following subcommands:

| Subcommand | Description |
|------------|-------------|
| `give` | Give money to a player |
| `take` | Take money from a player |
| `set` | Set a player's balance |
| `reset` | Reset a player's balance |
| `reset-all` | Reset all player balances |
| `show` | Show a player's balance |
| `give-random` | Give money to a random player |
| `give-all` | Give money to all players |

---

## Sanction Commands

Commands for moderating and sanctioning players.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/ban` | - | `essentials.ban` | Ban a player from the server |
| `/unban` | - | `essentials.unban` | Unban a player |
| `/mute` | - | `essentials.mute` | Mute a player |
| `/unmute` | - | `essentials.unmute` | Unmute a player |
| `/kick` | - | `essentials.kick` | Kick a player from the server |
| `/kickall` | - | `essentials.kick.all` | Kick all players from the server |
| `/freeze` | - | `essentials.freeze` | Freeze a player in place |
| `/sanction` | `sc` | `essentials.sanction` | Open the sanction GUI |
| `/seen` | `whois` | `essentials.seen` | Show information about a player |
| `/seenip` | `whoisip` | `essentials.seen.ip` | Show all players sharing the same IP address |

---

## Chat Commands

Commands for managing and interacting with the server chat.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/chathistory` | `ct` | `essentials.chat.history` | Show chat history |
| `/chatclear` | `cl` | `essentials.chat.clear` | Clear the chat |
| `/chatenable` | `ce` | `essentials.chat.enable` | Enable the chat |
| `/chatdisable` | `cd` | `essentials.chat.disable` | Disable the chat |
| `/broadcast` | `bc` | `essentials.chat.broadcast` | Broadcast a message to all players |
| `/showitem` | - | `essentials.show.item` | Show your held item in chat |
| `/pub` | - | `essentials.pub` | Send a highlighted message in chat |

---

## Messaging Commands

Commands for private messaging between players.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/message` | `msg`, `tell`, `whisper`, `m`, `w` | `essentials.message` | Send a private message to a player |
| `/reply` | `r` | `essentials.reply` | Reply to the last private message |
| `/messagetoggle` | `msgtoggle`, `mtg` | `essentials.message.toggle` | Toggle private messages on or off |
| `/socialspy` | - | `essentials.socialspy` | Spy on all private messages |

---

## Kit Commands

Commands for managing and distributing kits.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/kit` | `kits` | `essentials.kit` | Receive a kit |
| `/showkit` | - | `essentials.kit.show` | Preview the contents of a kit |
| `/kiteditor` | `keditor` | `essentials.kit.editor` | Open the kit editor GUI |
| `/kitcreate` | `kcreate` | `essentials.kit.create` | Create a new kit |
| `/kitdelete` | `kdelete` | `essentials.kit.delete` | Delete an existing kit |
| `/kitgive` | `kgive` | `essentials.kit.give` | Give a kit to another player |

---

## Vault Commands

Commands for accessing and managing personal vaults.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/vault` | `sac`, `bag`, `b`, `coffre`, `chest` | `essentials.vault.use` | Open your personal vault |

### Vault Subcommands

The `/vault` command supports the following subcommands:

| Subcommand | Description |
|------------|-------------|
| `set-slot` | Set the number of vault slots for a player |
| `add-slot` | Add vault slots to a player |
| `give` | Give a vault to a player |
| `info` | Show vault information |
| `show` | Display vault contents |
| `get-slot` | Get the number of vault slots a player has |
| `delete-slot` | Remove vault slots from a player |

---

## Hologram Commands

Commands for creating and managing holograms.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/hologram` | `holo`, `ho` | `essentials.hologram` | Manage holograms |

### Hologram Subcommands

The `/hologram` command supports the following subcommands:

| Subcommand | Description |
|------------|-------------|
| `create` | Create a new hologram |
| `delete` | Delete a hologram |
| `addline` | Add a line to a hologram |
| `setline` | Set the content of a specific line |
| `removeline` | Remove a line from a hologram |
| `scale` | Set the scale of a hologram |
| `translation` | Set the translation offset |
| `movehere` | Move hologram to your location |
| `moveto` | Move hologram to specific coordinates |
| `billboard` | Set the billboard mode |
| `textalignment` | Set text alignment |
| `yaw` | Set the yaw rotation |
| `pitch` | Set the pitch rotation |
| `insertbeforeline` | Insert a line before a specific line |
| `insertafterline` | Insert a line after a specific line |
| `background` | Set the background color |
| `list` | List all holograms |
| `teleport` | Teleport to a hologram |
| `seethrough` | Toggle see-through mode |
| `textshadow` | Toggle text shadow |
| `shadowstrength` | Set shadow strength |
| `shadowradius` | Set shadow radius |
| `viewdistance` | Set the view distance |
| `item` | Set a hologram to display an item |
| `block` | Set a hologram to display a block |

---

## Scoreboard Commands

Commands for managing the scoreboard display.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/sb` | - | `essentials.scoreboard` | Toggle the scoreboard display |

---

## Vote Commands

Commands for managing the vote and vote party systems.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/vote` | - | `essentials.vote.use` | Show vote information |
| `/voteparty` | `vp` | `essentials.voteparty.use` | Show vote party information |

### Vote Subcommands

Both `/vote` and `/voteparty` support the following subcommands:

| Subcommand | Description |
|------------|-------------|
| `add` | Add votes to a player or vote party |
| `set` | Set the vote count |
| `remove` | Remove votes from a player or vote party |

---

## WorldEdit Commands

Lightweight WorldEdit commands built into zEssentials.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/player-worldedit` | `pwe`, `ess-worldedit`, `eworldedit`, `ew` | `essentials.worldedit.use` | Access WorldEdit tools |

### WorldEdit Subcommands

The `/player-worldedit` command supports the following subcommands:

| Subcommand | Description |
|------------|-------------|
| `give` | Give the WorldEdit tool |
| `set` | Fill the selection with a block |
| `walls` | Create walls around the selection |
| `sphere` | Create a sphere |
| `fill` | Fill an area |
| `cyl` | Create a cylinder |
| `cut` | Cut the selection |
| `stop` | Stop the current operation |
| `confirm` | Confirm the current operation |
| `cancel` | Cancel the current operation |
| `pos1` | Set position 1 |
| `pos2` | Set position 2 |
| `option` | Configure WorldEdit options |

---

## Discord Commands

Commands for linking and unlinking Discord accounts.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/link` | `lier` | `essentials.discord.link` | Link your Discord account |
| `/unlink` | `delier` | `essentials.discord.unlink` | Unlink your Discord account |

---

## Mail Commands

Commands for the in-game mail system.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/mail` | `mailbox`, `mb` | `essentials.mail` | Open your mailbox |

### Mail Subcommands

The `/mail` command supports the following subcommands:

| Subcommand | Description |
|------------|-------------|
| `open` | Open your mailbox |
| `give` | Send an item to a player's mailbox |
| `give-hand` | Send your held item to a player's mailbox |
| `clear` | Clear your mailbox |
| `give-all` | Send an item to all players' mailboxes |
| `give-all-hand` | Send your held item to all players' mailboxes |

---

## Admin & Utility Commands

General administration and utility commands.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/god` | - | `essentials.god` | Toggle god mode (invincibility) |
| `/vanish` | `v` | `essentials.vanish` | Toggle vanish mode (invisibility) |
| `/heal` | - | `essentials.heal` | Heal a player to full health |
| `/lightning` | `strike` | `essentials.lighting` | Strike lightning at a location |
| `/fly` | - | `essentials.fly` | Toggle flight mode |
| `/speed` | - | `essentials.speed` | Change movement speed |
| `/walkspeed` | `wspeed` | `essentials.walk.speed` | Change walk speed |
| `/flyspeed` | `fspeed` | `essentials.fly.speed` | Change fly speed |
| `/more` | - | `essentials.more` | Fill the held item stack to max |
| `/trash` | `poubelle` | `essentials.trash` | Open the trash inventory |
| `/feed` | `eat` | `essentials.feed` | Feed a player to full hunger |
| `/craft` | - | `essentials.craft` | Open a virtual workbench |
| `/enchanting` | - | `essentials.enchanting` | Open a virtual enchanting table |
| `/invsee` | - | `essentials.invsee` | View another player's inventory |
| `/clearinventory` | `clear`, `ci` | `essentials.clearinventory` | Clear a player's inventory |
| `/compact` | `blocks`, `condense` | `essentials.compact` | Compact items into block form |
| `/compactall` | `blocksall`, `condenseall` | `essentials.compact.all` | Compact all items in inventory |
| `/hat` | - | `essentials.hat` | Wear the held item as a hat |
| `/anvil` | - | `essentials.anvil` | Open a virtual anvil |
| `/cartographytable` | - | `essentials.cartographytable` | Open a virtual cartography table |
| `/grindstone` | - | `essentials.grindstone` | Open a virtual grindstone |
| `/loom` | - | `essentials.loom` | Open a virtual loom |
| `/stonecutter` | - | `essentials.stonecutter` | Open a virtual stonecutter |
| `/smithingtable` | - | `essentials.smithingtable` | Open a virtual smithing table |
| `/furnace` | `burn` | `essentials.furnace` | Smelt the item in your hand |
| `/skull` | - | `essentials.skull` | Get a player's head |
| `/enderchest` | `ec` | `essentials.enderchest` | Open your ender chest |
| `/endersee` | `ecsee` | `essentials.endersee` | Open another player's ender chest |
| `/repair` | `fix` | `essentials.repair` | Repair the held item |
| `/repairall` | `fixall` | `essentials.repair.all` | Repair all items in inventory |
| `/ext` | - | `essentials.ext` | Extinguish yourself (stop burning) |
| `/near` | - | `essentials.near` | Show nearby players |
| `/playtime` | - | `essentials.play.time` | Show your total playtime |
| `/essversion` | `ev` | `essentials.use` | Show the plugin version |
| `/killall` | - | `essentials.kill.all` | Kill all entities in the area |
| `/lag` | - | `essentials.lag` | Show entity counts and server performance |
| `/enchant` | `enchantment` | `essentials.enchant` | Add an enchantment to the held item |
| `/nightvision` | `nv` | `essentials.nightvision` | Toggle night vision |
| `/phantoms` | - | `essentials.phantoms` | Toggle phantom spawning |
| `/sudo` | `su` | `essentials.sudo` | Force a player to execute a command |
| `/afk` | - | `essentials.afk` | Toggle AFK status |
| `/rules` | `?`, `help`, `aide` | `essentials.rules` | Show the server rules |
| `/cooldown` | - | `essentials.cooldown` | Show or manage command cooldowns |
| `/itemname` | `iname`, `itemrename`, `irename` | `essentials.item.name` | Rename the held item |
| `/itemlore` | `ilore`, `lore` | `essentials.item.lore` | Manage the lore of the held item |
| `/give` | - | `essentials.give` | Give items to a player |
| `/giveall` | - | `essentials.give.all` | Give items to all players |
| `/powertools` | `pt` | `essentials.power.tools` | Bind a command to the held item |
| `/powertools-toggle` | `pt-toggle` | `essentials.power.tools.toggle` | Toggle power tools on or off |
| `/experience` | `xp`, `exp`, `level`, `levels` | `essentials.experience` | Manage player experience |
| `/step` | - | `essentials.step` | Show step commands |
| `/suicide` | - | `essentials.suicide` | Kill yourself |
| `/kittycannon` | - | `essentials.kitty.cannon` | Launch exploding kittens |

### Cooldown Subcommands

The `/cooldown` command supports the following subcommands:

| Subcommand | Description |
|------------|-------------|
| `show` | Show active cooldowns for a player |
| `delete` | Delete a cooldown from a player |
| `create` | Create a cooldown for a player |

### Item Lore Subcommands

The `/itemlore` command supports the following subcommands:

| Subcommand | Description |
|------------|-------------|
| `add` | Add a lore line to the item |
| `set` | Set a specific lore line |
| `clear` | Clear all lore from the item |

### Experience Subcommands

The `/experience` command supports the following subcommands:

| Subcommand | Description |
|------------|-------------|
| `query` | Check a player's experience |
| `set` | Set a player's experience |
| `grant` | Grant experience to a player |
| `take` | Take experience from a player |

### Lag Subcommands

The `/lag` command supports the following subcommands:

| Subcommand | Description |
|------------|-------------|
| `world` | Show entity counts per world |
| `clear` | Clear entities |
| `clear-timer` | Set an automatic entity clear timer |

---

## Bypass Permissions

These permissions allow players to bypass certain restrictions.

| Permission | Description |
|------------|-------------|
| `essentials.bypass.cooldown` | Bypass command cooldowns, allowing immediate re-use of any command |

---

## Command Cooldowns

zEssentials supports configurable cooldowns on commands. When a cooldown is active, a player must wait the specified duration before using the same command again.

### How Cooldowns Work

- Cooldowns are applied **per player** and **per command**.
- When a player executes a command with a cooldown, a timer starts. The player cannot use that command again until the timer expires.
- Cooldown durations are defined in the plugin configuration.
- Active cooldowns can be viewed and managed using the `/cooldown` command with the `show`, `delete`, and `create` subcommands.

### Permission-Based Overrides

Cooldowns can be bypassed entirely using the `essentials.bypass.cooldown` permission. Players with this permission (typically staff members) will never be subject to command cooldowns, allowing them to use any command without delay.

This is particularly useful for:
- **Administrators** who need unrestricted access to all commands at all times.
- **Moderators** who require rapid use of sanction commands during emergencies.
- **Builders** who frequently use teleportation and WorldEdit commands.
