---
title: Commands & Permissions
description: Complete list of all commands and permissions for zEssentials
---

# Commands & Permissions

This page contains the complete list of all commands and permissions available in zEssentials. Commands are organized by category for easy reference.

<CalloutContainer type="info">

<CalloutTitle>Syntax Guide</CalloutTitle>

<CalloutDescription>
- `< >` indicates a **required** argument.
- `[ ]` indicates an **optional** argument.
- `|` separates multiple aliases for the same command.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutTitle>Permission format</CalloutTitle>

<CalloutDescription>
Every permission is generated from its internal name: the underscores become dots. For example `ESSENTIALS_TP_TOGGLE` becomes `essentials.tp.toggle` and `ESSENTIALS_UN_BAN` becomes `essentials.un.ban`. Always copy the permission exactly as written on this page.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutTitle>Custom commands</CalloutTitle>

<CalloutDescription>
Commands created with the [Custom Commands](./modules/custom-commands) module (`modules/customcommands/config.yml`, for example `/discord` or `/map`) are not listed here. Each one uses the `permission` defined in its own configuration (an empty permission means everyone can use it).
</CalloutDescription>

</CalloutContainer>

---

## Main Command

The plugin's main administration command.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/zessentials` | `ess` | `essentials.use` | Main plugin command |
| `/essversion` | `ev` | - | Show the plugin version (no permission required) |

### Main Command Subcommands

| Subcommand | Aliases | Permission | Description |
|------------|---------|------------|-------------|
| `reload [module]` | `rl` | `essentials.reload` | Reload the configuration files (or a single module) |
| `convert <plugin>` | `conv`, `c` | `essentials.convert` | Convert data from another plugin |
| `delete-world <world>` | - | `essentials.delete.world` | Remove the data linked to a world |
| `clear-random-word` | - | `essentials.clear.random.word` | Clear the random words |

---

## Gamemode Commands

Commands for changing player gamemode.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/gamemode <gamemode> [player]` | `gm` | `essentials.gamemode` | Change player gamemode |
| `/gmc [player]` | `creat` | `essentials.gamemode.creative` | Switch to creative mode |
| `/gma [player]` | `advent` | `essentials.gamemode.adventure` | Switch to adventure mode |
| `/gms [player]` | `survi` | `essentials.gamemode.survival` | Switch to survival mode |
| `/gmsp [player]` | `spec` | `essentials.gamemode.spectator` | Switch to spectator mode |

Changing the gamemode of another player also requires `essentials.gamemode.other`.

---

## Weather & Time Commands

Commands for controlling weather and time, including per-player overrides.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/day [world]` | - | `essentials.day` | Set the time to day |
| `/night [world]` | - | `essentials.night` | Set the time to night |
| `/sun [world]` | - | `essentials.sun` | Set the weather to sunny |
| `/player-weather [weather]` | `pweather` | `essentials.player.weather` | Change personal weather (client-side only) |
| `/player-time [time]` | `ptime` | `essentials.player.time` | Change personal time (client-side only) |

---

## Teleportation Commands

Commands for teleporting players to locations, other players, or random coordinates.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/tp <player> [x] [y] [z] [yaw] [pitch]` | - | `essentials.tp` | Teleport to a player or coordinates. `/tp <player1> <player2>` teleports `player1` to `player2` |
| `/tpall` | - | `essentials.tp.all` | Teleport all players to you |
| `/tphere <player>` | `s` | `essentials.tp.here` | Teleport a player to you |
| `/tpa <player>` | - | `essentials.tpa` | Request to teleport to a player |
| `/tpahere <player>` | - | `essentials.tpa.here` | Request a player to teleport to you |
| `/tpaccept [player]` | `tpyes` | `essentials.tpa.accept` | Accept an incoming teleport request |
| `/tpdeny [player]` | `tpno` | `essentials.tpa.deny` | Deny an incoming teleport request |
| `/tpacancel <player>` | - | `essentials.tpa.cancel` | Cancel your outgoing teleport request |
| `/tptoggle [player]` | - | `essentials.tp.toggle` | Toggle receiving teleport requests (`/tpa`) |
| `/tpaheretoggle [player]` | - | `essentials.tpa.here.toggle` | Toggle receiving `/tpahere` requests |
| `/back` | - | `essentials.back` | Teleport to your previous location |
| `/tpr` | `rtp` | `essentials.tp.random` | Teleport to a random location |
| `/tpr other <player> [world]` | `rtp other` | `essentials.tp.random.other` | Force a random teleport for a player |
| `/top` | - | `essentials.top` | Teleport to the highest block at your position |
| `/bottom` | - | `essentials.bottom` | Teleport to the lowest block at your position |
| `/worldtp <world> [player]` | `wtp` | `essentials.tp.world` | Teleport to another world |

| Permission | Description |
|------------|-------------|
| `essentials.tp.toggle.other` | Toggle teleport requests for another player |
| `essentials.tpa.here.toggle.other` | Toggle `/tpahere` requests for another player |
| `essentials.tp.world.other` | Teleport another player into a world |
| `essentials.back.death` | Allow `/back` to return to the death location |
| `essentials.teleport.bypass` | Bypass the teleportation delay (if enabled in the teleportation module) |

---

## Spawn Commands

Commands for managing and teleporting to spawn points.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/spawn [player]` | - | `essentials.spawn` | Teleport to the server spawn |
| `/setspawn` | - | `essentials.set.spawn` | Set the server spawn location |
| `/firstspawn [player]` | - | `essentials.spawn.first` | Teleport to the first spawn point |
| `/setfirstspawn` | - | `essentials.set.first.spawn` | Set the first spawn point for new players |

Teleporting another player with `/spawn` or `/firstspawn` requires `essentials.spawn.other`.

---

## Warp Commands

Commands for creating, deleting, and teleporting to warps.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/warp [name]` | `w` | `essentials.warp` | Teleport to a warp |
| `/setwarp <name>` | `wcreate` | `essentials.warp.set` | Create a new warp |
| `/delwarp <name>` | `wdelete` | `essentials.warp.del` | Delete an existing warp |
| `/warps` | `wlist` | `essentials.warps` | List all available warps |

Each warp also requires its own permission: `essentials.warp.<warp name>`.

---

## Home Commands

Commands for managing personal home locations.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/home [name]` | `h`, `homes` | `essentials.home` | Teleport to a home, or list your homes |
| `/sethome [name]` | `hcreate`, `hc` | `essentials.set.home` | Create a new home |
| `/sethomeconfirm <name>` | - | `essentials.set.home.confirm` | Confirm home creation |
| `/delhome <name>` | `hdelete`, `hd` | `essentials.del.home` | Delete a home |
| `/delhomeconfirm <name>` | - | `essentials.del.home.confirm` | Confirm home deletion |
| `/delhome-other <player> <name>` | `delhomeother`, `hdelother` | `essentials.del.home.other` | Delete a home of another player |
| `/home-list <player>` | `hlist` | `essentials.home.list` | View a player's home list (admin) |
| `/homepublic <name>` | `publichome` | `essentials.home.public` | Make one of your homes public (or private again) |
| `/publichomes [player]` | `phomes` | `essentials.home.visit` | List the public homes |
| `/homeshare <name> <player>` | `hshare` | `essentials.home.share` | Share a home with a player |
| `/homeunshare <name> <player>` | `hunshare` | `essentials.home.share` | Stop sharing a home with a player |
| `/homeshares <name>` | `hshares` | `essentials.home.share` | List the players a home is shared with |
| `/homecategory <name> <category>` | `homecat`, `hcat` | `essentials.home.category` | Set the category of a home |
| `/homefavorite <name>` | `homefav`, `hfav` | `essentials.home.favorite` | Toggle a home as favorite |
| `/homeimport <source>` | - | `essentials.home.import` | Import homes from another plugin (`essentialsx`) |

| Permission | Description |
|------------|-------------|
| `essentials.home.other` | Teleport to another player's home with `/home <player>:<home>` |
| `essentials.home.visit` | Visit public and shared homes with `/home <player>:<home>` |
| `essentials.set.home.other` | Create or delete another player's home with `<player>:<home>` |

---

## Economy Commands

Commands for managing the in-game economy, balances, and payments.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/money [player]` | `balance` | `essentials.money` | Show your current balance |
| `/pay <player> <amount> [economy]` | - | `essentials.pay` | Pay another player |
| `/paytoggle [player]` | - | `essentials.pay.toggle` | Toggle whether you can receive payments |
| `/paynotificationtoggle [player]` | `paynotify` | `essentials.pay.notification.toggle` | Toggle receiving pay notifications |
| `/economy` | `eco` | `essentials.eco.use` | Manage economies |
| `/balancetop [page]` | `baltop` | `essentials.balance.top` | Show the top balances leaderboard |
| `/balancetop refresh <economy>` | `baltop refresh` | `essentials.balance.top.refresh` | Refresh the baltop leaderboard |

| Permission | Description |
|------------|-------------|
| `essentials.money.other` | View another player's balance |
| `essentials.pay.toggle.other` | Toggle payments for another player |
| `essentials.pay.notification.toggle.other` | Toggle pay notifications for another player |

### Economy Subcommands

The `/economy` command supports the following subcommands:

| Subcommand | Aliases | Permission | Description |
|------------|---------|------------|-------------|
| `give <economy> <player> <amount> [reason]` | - | `essentials.eco.give` | Give money to a player |
| `give-random <economy> <player> <min-amount> <max-amount> [reason]` | `gr` | `essentials.eco.give.random` | Give a random amount of money to a player |
| `giveall <economy> <amount> [reason]` | - | `essentials.eco.give.all` | Give money to all players |
| `take <economy> <player> <amount> [reason]` | - | `essentials.eco.take` | Take money from a player |
| `set <economy> <player> <amount> [reason]` | - | `essentials.eco.set` | Set a player's balance |
| `reset <economy> <player> [reason]` | - | `essentials.eco.reset` | Reset a player's balance |
| `reset-all <economy>` | - | `essentials.eco.reset.all` | Reset all player balances |
| `show <player>` | `s` | `essentials.eco.show` | Show a player's balance |

---

## Sanction Commands

Commands for moderating and sanctioning players.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/ban <player> <duration> <reason>` | - | `essentials.ban` | Ban a player from the server |
| `/unban <player> [reason]` | - | `essentials.un.ban` | Unban a player |
| `/mute <player> <duration> <reason>` | - | `essentials.mute` | Mute a player |
| `/unmute <player> [reason]` | - | `essentials.un.mute` | Unmute a player |
| `/kick <player> [reason]` | - | `essentials.kick` | Kick a player from the server |
| `/kickall [reason]` | - | `essentials.kick.all` | Kick all players from the server |
| `/freeze <player>` | - | `essentials.freeze` | Freeze a player in place |
| `/sanction <player>` | `sc` | `essentials.sanction` | Open the sanction GUI |
| `/seen <player>` | `whois` | `essentials.seen` | Show information about a player |
| `/seenip <ip>` | `whoisip` | `essentials.seen.ip` | Show all players sharing the same IP address |

| Permission | Description |
|------------|-------------|
| `essentials.ban.notify` | Receive a notification when a player is banned |
| `essentials.unban.notify` | Receive a notification when a player is unbanned |
| `essentials.mute.notify` | Receive a notification when a player is muted |
| `essentials.unmute.notify` | Receive a notification when a player is unmuted |
| `essentials.kick.notify` | Receive a notification when a player is kicked |
| `essentials.kick.bypass.all` | Not be kicked by `/kickall` |
| `essentials.seen.show.ip` | See the IP address of a player in `/seen` |
| `essentials.seen.show.last.location` | See the last location of a player in `/seen` |
| `essentials.seen.show.created.at` | See the creation date of a player in `/seen` |

---

## Chat Commands

Commands for managing and interacting with the server chat.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/chathistory <player> [page]` | `ct` | `essentials.chat.history` | Show chat history |
| `/chatclear` | `cl` | `essentials.chat.clear` | Clear the chat |
| `/chatenable` | `ce` | `essentials.chat.enable` | Enable the chat |
| `/chatdisable` | `cd` | `essentials.chat.disable` | Disable the chat |
| `/broadcast <message>` | `bc` | `essentials.chat.broadcast` | Broadcast a message to all players |
| `/showitem <code>` | - | `essentials.show.item` | Show your held item in chat |
| `/pub <message>` | - | `essentials.pub` | Send a highlighted message in chat |
| `/pingsound` | `pingsounds` | `essentials.ping.sound` | Toggle the sound played when you are mentioned in chat |

### Chat Permissions

| Permission | Description |
|------------|-------------|
| `essentials.chat.bypass.alphanumeric` | Not be affected by the character limitation |
| `essentials.chat.bypass.dynamic.cooldown` | Not be affected by the dynamic cooldown |
| `essentials.chat.bypass.link` | Send messages containing links |
| `essentials.chat.bypass.same.message` | Send the same message twice in a row |
| `essentials.chat.bypass.caps` | Send messages containing uppercase letters |
| `essentials.chat.bypass.flood` | Not be affected by the anti-flood |
| `essentials.chat.bypass.disable` | Talk even when the chat is disabled |
| `essentials.chat.moderator` | See the chat with the moderator view (moderation actions) |
| `essentials.chat.link` | Turn links into clickable links (also requires `essentials.chat.click`) |
| `essentials.chat.color` | Use colors (Minecraft and hex) in chat |
| `essentials.chat.decoration` | Use decorations (`<bold>`, `<italic>`, `<underlined>`, `<strikethrough>`, `<obfuscated>`) in chat |
| `essentials.chat.rainbow` | Use `<rainbow>` in chat |
| `essentials.chat.gradient` | Use `<gradient>` in chat |
| `essentials.chat.click` | Use `<click>` in chat |
| `essentials.chat.hover` | Use `<hover>` in chat |
| `essentials.chat.newline` | Use `<newline>` in chat |
| `essentials.chat.reset` | Use `<reset>` in chat |
| `essentials.chat.font` | Use `<font>` in chat |
| `essentials.chat.keybind` | Use `<key>` in chat |

The chat module also uses permissions defined in its configuration (chat formats, chat placeholders such as `[item]`, custom rules bypass). See `modules/chat/config.yml`.

### Sign Permissions

| Permission | Description |
|------------|-------------|
| `essentials.sign.color` | Use colors (Minecraft and hex) on signs |
| `essentials.sign.decoration` | Use decorations on signs |
| `essentials.sign.rainbow` | Use `<rainbow>` on signs |
| `essentials.sign.gradient` | Use `<gradient>` on signs |
| `essentials.sign.click` | Use `<click>` on signs |
| `essentials.sign.hover` | Use `<hover>` on signs |
| `essentials.sign.newline` | Use `<newline>` on signs |
| `essentials.sign.reset` | Use `<reset>` on signs |
| `essentials.sign.font` | Use `<font>` on signs |
| `essentials.sign.keybind` | Use `<key>` on signs |

---

## Messaging Commands

Commands for private messaging between players.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/message <player> <message>` | `msg`, `tell`, `whisper`, `m`, `w` | `essentials.message` | Send a private message to a player |
| `/reply <message>` | `r` | `essentials.reply` | Reply to the last private message |
| `/messagetoggle [player]` | `msgtoggle`, `mtg` | `essentials.message.toggle` | Toggle private messages on or off |
| `/socialspy [player]` | - | `essentials.socialspy` | Spy on all private messages |
| `/ignore <player>` | - | `essentials.ignore` | Ignore a player, blocking their private messages and teleport requests |
| `/unignore <player>` | `unignor` | `essentials.ignore` | Stop ignoring a player |
| `/ignorelist` | `ignores` | `essentials.ignore.list` | List the players you are ignoring |

Toggling private messages for another player requires `essentials.message.toggle.other`.

<CalloutContainer type="info">

<CalloutDescription>
`/w` is registered both as an alias of `/message` and of `/warp`.
</CalloutDescription>

</CalloutContainer>

---

## Kit Commands

Commands for managing and distributing kits.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/kit [kit]` | `kits` | `essentials.kit` | Receive a kit |
| `/showkit <kit>` | - | `essentials.kit.show` | Preview the contents of a kit |
| `/kiteditor <kit>` | `keditor` | `essentials.kit.editor` | Open the kit editor GUI |
| `/kitcreate <name> <cooldown>` | `kcreate` | `essentials.kit.create` | Create a new kit |
| `/kitdelete <kit>` | `kdelete` | `essentials.kit.delete` | Delete an existing kit |
| `/kitgive <player> <kit>` | `kgive` | `essentials.kit.give` | Give a kit to another player |

| Permission | Description |
|------------|-------------|
| `essentials.kit.<kit name>` | Use a specific kit (default permission, can be changed in the kit configuration) |
| `essentials.kit.bypass.cooldown` | Bypass the cooldown of the kits |

---

## Vault Commands

Commands for accessing and managing personal vaults.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/vault [vault id]` | `sac`, `bag`, `b`, `coffre`, `chest` | `essentials.vault.use` | Open your personal vault |

### Vault Subcommands

The `/vault` command supports the following subcommands:

| Subcommand | Permission | Description |
|------------|------------|-------------|
| `set <player> <slot>` | `essentials.vault.set.slot` | Set the number of vault slots for a player |
| `add <player> <slot>` | `essentials.vault.add.slot` | Add vault slots to a player |
| `give <player> <item> [amount]` | `essentials.vault.give` | Give an item into a player's vault |
| `info <player>` | `essentials.vault.info` | Show vault information |
| `show <player>` | `essentials.vault.show` | Display the vaults of a player |
| `get <player> <vault> <slot> [give]` | `essentials.vault.get.slot` | Get the content of a vault slot |
| `delete <player> <vault> <slot>` | `essentials.vault.delete.slot` | Remove the content of a vault slot |

Editing the vaults of another player opened with `/vault show` requires `essentials.vault.show.edit`.

---

## Hologram Commands

Commands for creating and managing holograms.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/hologram` | `holo`, `ho` | `essentials.hologram` | Manage holograms |

### Hologram Subcommands

The `/hologram` command supports the following subcommands:

| Subcommand | Permission | Description |
|------------|------------|-------------|
| `create <type> <name>` | `essentials.hologram.create` | Create a new hologram |
| `delete <name>` | `essentials.hologram.delete` | Delete a hologram |
| `list` (`l`, `?`) | `essentials.hologram.list` | List all holograms |
| `addline <name> <text>` | `essentials.hologram.add.line` | Add a line to a hologram |
| `setline <name> <line> <text>` | `essentials.hologram.set.line` | Set the content of a specific line |
| `removeline <name> <line>` | `essentials.hologram.remove.line` | Remove a line from a hologram |
| `insertbefore <name> <line> <text>` | `essentials.hologram.insert.before.line` | Insert a line before a specific line |
| `insertafter <name> <line> <text>` | `essentials.hologram.insert.after.line` | Insert a line after a specific line |
| `item <name>` | `essentials.hologram.add.line` | Set an item hologram to display the item in your hand |
| `block <name> <material>` | `essentials.hologram.add.line` | Set a block hologram to display a block |
| `scale <name> <x> <y> <z>` | `essentials.hologram.scale` | Set the scale of a hologram |
| `translation <name> <x> <y> <z>` | `essentials.hologram.translation` | Set the translation offset |
| `movehere <name>` | `essentials.hologram.move.here` | Move hologram to your location |
| `moveto <name> <x> <y> <z>` | `essentials.hologram.move.to` | Move hologram to specific coordinates |
| `teleport <name>` (`tp`) | `essentials.hologram.teleport` | Teleport to a hologram |
| `billboard <name> <billboard>` | `essentials.hologram.billboard` | Set the billboard mode |
| `textalignment <name> <alignment>` | `essentials.hologram.text.alignment` | Set text alignment |
| `yaw <name> <yaw>` | `essentials.hologram.yaw` | Set the yaw rotation |
| `pitch <name> <pitch>` | `essentials.hologram.yaw` | Set the pitch rotation |
| `background <name> <color>` | `essentials.hologram.text.background` | Set the background color |
| `seethrough <name> <boolean>` | `essentials.hologram.see.through` | Toggle see-through mode |
| `textshadow <name> <boolean>` | `essentials.hologram.text.shadow` | Toggle text shadow |
| `shadowstrength <name> <strength>` | `essentials.hologram.shadow.strength` | Set shadow strength |
| `shadowradius <name> <radius>` | `essentials.hologram.shadow.radius` | Set shadow radius |
| `viewdistance <name> <distance>` | `essentials.hologram.shadow.strength` | Set the view distance |

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

| Command | Permission | Description |
|---------|------------|-------------|
| `/vote add <player> <site> [silent]` | `essentials.vote.add` | Add a vote to a player |
| `/voteparty add <amount>` | `essentials.voteparty.add` | Add votes to the vote party |
| `/voteparty set <amount>` | `essentials.voteparty.set` | Set the number of votes in the vote party |
| `/voteparty remove <amount>` | `essentials.voteparty.remove` | Remove votes from the vote party |

---

## WorldEdit Commands

Lightweight WorldEdit commands built into zEssentials.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/player-worldedit` | `pwe`, `ess-worldedit`, `eworldedit`, `ew` | `essentials.worldedit.use` | Access WorldEdit tools |

### WorldEdit Subcommands

The `/player-worldedit` command supports the following subcommands:

| Subcommand | Permission | Description |
|------------|------------|-------------|
| `give <player> <item>` | `essentials.worldedit.give` | Give a WorldEdit tool |
| `set <material>` | `essentials.worldedit.set` | Fill the selection with a block |
| `fill <material>` | `essentials.worldedit.fill` | Fill the empty blocks of the selection |
| `walls <material>` | `essentials.worldedit.walls` | Create walls around the selection |
| `sphere <material> <radius> [filled]` | `essentials.worldedit.sphere` | Create a sphere |
| `cyl <material> <radius> <height> [filled]` | `essentials.worldedit.cyl` | Create a cylinder |
| `cut` | `essentials.worldedit.cut` | Cut the selection |
| `pos1` | `essentials.worldedit.pos1` | Set position 1 |
| `pos2` | `essentials.worldedit.pos2` | Set position 2 |
| `confirm` | `essentials.worldedit.confirm` | Confirm the current operation |
| `cancel` | `essentials.worldedit.cancel` | Cancel the current operation |
| `stop` | `essentials.worldedit.stop` | Stop the current operation |
| `option` (`o`) | `essentials.worldedit.option` | Configure WorldEdit options |
| `option inventory` (`inv`) | `essentials.worldedit.option.inventory` | Toggle the inventory option |
| `option bossbar` | `essentials.worldedit.option.bossbar` | Toggle the boss bar option |

---

## Discord Commands

Commands for linking and unlinking Discord accounts.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/link <code>` | `lier` | `essentials.discord.link` | Link your Discord account |
| `/unlink` | `delier` | `essentials.discord.unlink` | Unlink your Discord account |

---

## Mail Commands

Commands for the in-game mail system: item mailbox and text mails.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/mail` | `mailbox`, `mb` | `essentials.mail` | Open your mailbox |

### Mail Subcommands

The `/mail` command supports the following subcommands:

| Subcommand | Permission | Description |
|------------|------------|-------------|
| `open <player>` | `essentials.mail.open` | Open a player's mailbox |
| `give <player> <item> [amount]` | `essentials.mail.give` | Send an item to a player's mailbox |
| `give-hand <player>` | `essentials.mail.give.hand` | Send your held item to a player's mailbox |
| `giveall <item> [amount]` | `essentials.mail.giveall` | Send an item to all players' mailboxes |
| `giveall-hand` | `essentials.mail.giveall.hand` | Send your held item to all players' mailboxes |
| `clear <player>` | `essentials.mail.clear` | Remove the items from a player's mailbox |
| `send <player> <message>` | `essentials.mail.send` | Send a text mail to a player, online or not |
| `read` | `essentials.mail.read` | Read the mails you received |
| `sendall <message>` | `essentials.mail.send.all` | Send a text mail to every online player |
| `clearmessages [player]` | `essentials.mail.clear.messages` | Delete your text mails, or the mails of a player |

---

## Death Message Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/deathmessage [player]` | `dm`, `deathmsg` | `essentials.death.message.toggle` | Toggle death messages visibility |

| Permission | Description |
|------------|-------------|
| `essentials.death.message.toggle.other` | Toggle death messages for another player |
| `essentials.silent.death` | Die silently, without a death message (if enabled in the module) |

---

## Step Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/step` | - | `essentials.step` | Show step commands |
| `/step start <player> <step>` | - | `essentials.step.start` | Start a step for a player |
| `/step finish <player> <step>` | - | `essentials.step.finish` | Finish a step for a player |

---

## Fly Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/fly [player]` | - | `essentials.fly` | Toggle flight mode |
| `/flyspeed <speed>` | `fspeed` | `essentials.fly.speed` | Change fly speed |

### Fly Subcommands

The `/fly` command also manages temporary fly time:

| Subcommand | Permission | Description |
|------------|------------|-------------|
| `add <player> <seconds>` | `essentials.fly.add` | Add fly time to a player |
| `remove <player> <seconds>` | `essentials.fly.remove` | Remove fly time from a player |
| `set <player> <seconds>` | `essentials.fly.set` | Set the fly time of a player |
| `get <player>` | `essentials.fly.get` | Display a player's fly time |
| `info` | `essentials.fly.info` | Display your remaining fly time |

| Permission | Description |
|------------|-------------|
| `essentials.fly.other` | Toggle fly for another player |
| `essentials.fly.unlimited` | Unlimited fly (no temporary fly time consumed) |
| `essentials.fly.bypass.world` | Fly even in worlds where fly is disabled |
| `essentials.fly.safelogin` | Automatically enable fly on login when suspended in the air |

---

## Admin & Utility Commands

General administration and utility commands.

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/god [player]` | - | `essentials.god` | Toggle god mode (invincibility) |
| `/vanish [player]` | `v` | `essentials.vanish` | Toggle vanish mode (invisibility) |
| `/heal [player\|*]` | - | `essentials.heal` | Heal a player to full health |
| `/feed [player\|*]` | `eat` | `essentials.feed` | Feed a player to full hunger |
| `/lightning [player\|*] [--only-visual]` | `strike` | `essentials.lighting` | Strike lightning at a player |
| `/speed <speed> [player]` | - | `essentials.speed` | Change movement speed |
| `/walkspeed <speed>` | `wspeed` | `essentials.walk.speed` | Change walk speed |
| `/more` | - | `essentials.more` | Fill the held item stack to max |
| `/trash` | `poubelle` | `essentials.trash` | Open the trash inventory |
| `/craft` | - | `essentials.craft` | Open a virtual workbench |
| `/enchanting` | - | `essentials.enchanting` | Open a virtual enchanting table |
| `/invsee <player>` | - | `essentials.invsee` | View another player's inventory |
| `/clearinventory [player]` | `clear`, `ci` | `essentials.clearinventory` | Clear a player's inventory |
| `/compact [type]` | `blocks`, `condense` | `essentials.compact` | Compact items into block form |
| `/compactall` | `blocksall`, `condenseall` | `essentials.compact.all` | Compact all items in inventory |
| `/hat` | - | `essentials.hat` | Wear the held item as a hat |
| `/anvil` | - | `essentials.anvil` | Open a virtual anvil |
| `/cartographytable` | - | `essentials.cartographytable` | Open a virtual cartography table |
| `/grindstone` | - | `essentials.grindstone` | Open a virtual grindstone |
| `/loom` | - | `essentials.loom` | Open a virtual loom |
| `/stonecutter` | - | `essentials.stonecutter` | Open a virtual stonecutter |
| `/smithingtable` | - | `essentials.smithingtable` | Open a virtual smithing table |
| `/furnace` | `burn` | `essentials.furnace` | Smelt the item in your hand |
| `/skull [player]` | - | `essentials.skull` | Get a player's head |
| `/enderchest` | `ec` | `essentials.enderchest` | Open your ender chest |
| `/endersee <player>` | `ecsee` | `essentials.endersee` | Open another player's ender chest |
| `/repair` | `fix` | `essentials.repair` | Repair the held item |
| `/repairall [player]` | `fixall` | `essentials.repair.all` | Repair all items in inventory |
| `/ext [player]` | - | `essentials.ext` | Extinguish yourself (stop burning) |
| `/near` | - | `essentials.near` | Show nearby players |
| `/playtime` | - | `essentials.play.time` | Show your total playtime |
| `/killall [type] [world] [radius]` | - | `essentials.kill.all` | Kill all entities in the area |
| `/lag` | - | `essentials.lag` | Show entity counts per world |
| `/enchant <enchantment> [level] [player]` | `enchantment` | `essentials.enchant` | Add an enchantment to the held item |
| `/nightvision [player]` | `nv` | `essentials.nightvision` | Toggle night vision |
| `/phantoms [player]` | - | `essentials.phantoms` | Toggle phantom spawning |
| `/sudo <player> <command/message>` | `su` | `essentials.sudo` | Force a player to execute a command or send a message |
| `/afk` | - | `essentials.afk` | Toggle AFK status |
| `/rules` | `?`, `help`, `aide` | `essentials.rules` | Show the server rules |
| `/cooldown` | - | `essentials.cooldown` | Show or manage command cooldowns |
| `/itemname <name>` | `iname`, `itemrename`, `irename` | `essentials.item.name` | Rename the held item |
| `/itemlore` | `ilore`, `lore` | `essentials.item.lore` | Manage the lore of the held item |
| `/give <player> <item> [amount]` | - | `essentials.give` | Give items to a player |
| `/giveall <item> [amount]` | - | `essentials.give.all` | Give items to all players |
| `/powertools [command]` | `pt` | `essentials.power.tools` | Bind a command to the held item |
| `/powertools-toggle [player]` | `pt-toggle` | `essentials.power.tools.toggle` | Toggle power tools on or off |
| `/experience` | `xp`, `exp`, `level`, `levels` | `essentials.experience` | Manage player experience |
| `/suicide` | - | `essentials.suicide` | Kill yourself |
| `/kittycannon` | - | `essentials.kitty.cannon` | Launch exploding kittens |
| `/itemframe` | `iframe` | `essentials.itemframe` | Toggle the visibility of the item frame you are looking at |

### Utility Permissions

| Permission | Description |
|------------|-------------|
| `essentials.god.other` | Toggle god mode for another player |
| `essentials.vanish.other` | Toggle vanish for another player |
| `essentials.vanish.see` | See vanished players |
| `essentials.heal.other` | Heal another player |
| `essentials.heal.all` | Heal all players with `/heal *` |
| `essentials.feed.other` | Feed another player (also used by `/ext <player>`) |
| `essentials.feed.all` | Feed all players with `/feed *` |
| `essentials.lighting.other` | Strike another player with lightning |
| `essentials.lighting.all` | Strike all players with `/lightning *` |
| `essentials.clearinventory.other` | Clear the inventory of another player |
| `essentials.repair.all.other` | Repair all the items of another player |
| `essentials.endersee.offline` | Open the ender chest of an offline player |
| `essentials.invsee.interact` | Interact with (modify) an inventory opened with `/invsee` |
| `essentials.phantoms.other` | Toggle phantoms for another player |
| `essentials.power.tools.toggle.other` | Toggle power tools for another player |
| `essentials.sudo.bypass` | Cannot be targeted by `/sudo` |
| `essentials.afk.bypass` | Not be affected by the anti-AFK |
| `essentials.silent.join` | Join the server silently (if enabled in the join/quit module) |
| `essentials.silent.quit` | Leave the server silently (if enabled in the join/quit module) |

The AFK module also uses the permissions defined in `modules/afk/config.yml` (for example `zessentials.afk.vip`).

### Cooldown Subcommands

The `/cooldown` command supports the following subcommands:

| Subcommand | Aliases | Permission | Description |
|------------|---------|------------|-------------|
| `show [player]` | `s` | `essentials.cooldown.show` | Show active cooldowns for a player |
| `delete <player> <cooldown>` | - | `essentials.cooldown.delete` | Delete a cooldown from a player |
| `create <player> <key> <duration>` | - | `essentials.cooldown.create` | Create a cooldown for a player |

### Item Lore Subcommands

The `/itemlore` command supports the following subcommands:

| Subcommand | Permission | Description |
|------------|------------|-------------|
| `add <line>` | `essentials.item.lore.add` | Add a lore line to the item |
| `set <index> <line>` | `essentials.item.lore.set` | Set a specific lore line |
| `clear` | `essentials.item.lore.clear` | Clear all lore from the item |

### Experience Subcommands

The `/experience` command supports the following subcommands:

| Subcommand | Permission | Description |
|------------|------------|-------------|
| `query <player> <type>` | `essentials.experience.query` | Check a player's experience |
| `set <player> <amount> <type>` | `essentials.experience.set` | Set a player's experience |
| `grant <player> <amount> <type>` | `essentials.experience.grant` | Grant experience to a player |
| `grant-random <player> <min-amount> <max-amount> <type>` | `essentials.experience.grant` | Grant a random amount of experience to a player |
| `take <player> <amount> <type>` | `essentials.experience.take` | Take experience from a player |

### Lag Subcommands

The `/lag` command supports the following subcommands (all use `essentials.lag`):

| Subcommand | Description |
|------------|-------------|
| `world <world>` | Show detailed entity counts for a world |
| `clear [world/entity] [entity]` | Clear entities for a world or globally |
| `clearcooldown <time> [world/entity] [entity]` | Clear entities after a delay |

---

## Other Permissions

| Permission | Default | Description |
|------------|---------|-------------|
| `zessentials.paper.warning` | op | Receive the warning, when joining, that the server runs Spigot instead of Paper. zEssentials requires Paper and stays inactive on Spigot |

---

## Bypass Permissions

These permissions allow players to bypass certain restrictions.

| Permission | Description |
|------------|-------------|
| `essentials.bypass.cooldown` | Bypass command cooldowns (`command-cooldowns` in `config.yml`, custom commands, mail), if `enable-cooldown-bypass` is enabled |
| `essentials.cooldown.command.bypass` | Bypass the anti-spam command cooldown (`cooldowns` in `config.yml`) |
| `essentials.kit.bypass.cooldown` | Bypass the cooldown of the kits |
| `essentials.teleport.bypass` | Bypass the teleportation delay |
| `essentials.fly.bypass.world` | Fly in worlds where fly is disabled |
| `essentials.afk.bypass` | Not be affected by the anti-AFK |
| `essentials.kick.bypass.all` | Not be kicked by `/kickall` |
| `essentials.sudo.bypass` | Cannot be targeted by `/sudo` |

---

## Command Cooldowns

zEssentials supports configurable cooldowns on commands. When a cooldown is active, a player must wait the specified duration before using the same command again.

### How Cooldowns Work

- Cooldowns are applied **per player** and **per command**.
- When a player executes a command with a cooldown, a timer starts. The player cannot use that command again until the timer expires.
- Cooldown durations are defined in the `command-cooldowns` section of `config.yml`, with optional per-permission durations (for example `essentials.cooldown.heal.vip`).
- Active cooldowns can be viewed and managed using the `/cooldown` command with the `show`, `delete`, and `create` subcommands.

### Permission-Based Overrides

Cooldowns can be bypassed entirely using the `essentials.bypass.cooldown` permission, as long as `enable-cooldown-bypass` is set to `true` in `config.yml`. Players with this permission (typically staff members) will never be subject to command cooldowns, allowing them to use any command without delay.

This is particularly useful for:
- **Administrators** who need unrestricted access to all commands at all times.
- **Moderators** who require rapid use of sanction commands during emergencies.
- **Builders** who frequently use teleportation and WorldEdit commands.
