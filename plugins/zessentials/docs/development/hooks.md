---
title: Hooks & Integrations
description: Optional plugin integrations and hooks for zEssentials
---

# Hooks & Integrations

zEssentials provides optional integrations with third-party plugins to extend its functionality. These hooks are loaded automatically when the corresponding plugin is detected on the server, unless otherwise noted.

<CalloutContainer type="info">

<CalloutTitle>Load order</CalloutTitle>

<CalloutDescription>
zEssentials is a Paper plugin. All the integrations below are declared as optional server dependencies in its `paper-plugin.yml` (`load: BEFORE`, `required: false`): Vault, ProtocolLib, SuperiorSkyblock2, BentoBox, BlockTracker, WorldGuard, Votifier, NChat, MythicMobs, AxVaults and PlayerVaults. When present, they are loaded before zEssentials, and all of them except BentoBox use `join-classpath: true` so that zEssentials can access their API. zMenu and PlaceholderAPI are the only **required** dependencies.
</CalloutDescription>

</CalloutContainer>

---

## Vault

Exposes the zEssentials economy system through the [Vault](https://www.spigotmc.org/resources/vault.34315/) API, allowing other plugins to interact with player balances using the standard Vault Economy interface.

- **Loaded in**: `onLoad()` (before other plugins initialize)
- **Supported methods**: `getBalance`, `deposit`, `withdraw`, `has`, `format`, and all other standard Vault Economy methods
- **Bank support**: Not supported
- **Requirement**: The economy module must be enabled in zEssentials configuration

When Vault is present and the economy module is active, any plugin that depends on Vault for economy operations will automatically use zEssentials as the economy provider.

---

## Redis

Enables multi-server communication via Redis pub/sub, allowing zEssentials instances across multiple servers to synchronize data and actions in real time.

<CalloutContainer type="warning">

<CalloutTitle>In development</CalloutTitle>

<CalloutDescription>
The Redis integration is **currently disabled** in the plugin: the Redis server is not started, even with `server-type: REDIS`. The information below describes the planned behavior.
</CalloutDescription>

</CalloutContainer>

### Configuration

Redis is configured in the main `config.yml`:

```yaml
server-type: REDIS

redis-configuration:
  host: "192.168.10.10"
  port: 6379
  password: "123456a"
```

Set `server-type` to `REDIS` to activate multi-server mode.

### Features

- Cross-server private messages
- Cross-server broadcasts
- Cross-server kicks
- Cooldown synchronization between servers
- Chat clear and chat toggle synchronization
- Player list synchronization via Redis `SET`

### Technical Details

| Property | Value |
|----------|-------|
| Pub/Sub channel | `essentials:messages` |
| Player tracking key | `essentials:playerlist` |

### Message Types

zEssentials uses **7 message types** for inter-server communication:

| Message Type | Description |
|--------------|-------------|
| `KickMessage` | Kicks a player across servers |
| `ServerMessage` | Sends a broadcast to all servers |
| `ChatClear` | Clears chat on all servers |
| `ChatToggle` | Toggles chat state on all servers |
| `ServerPrivateMessage` | Delivers a private message cross-server |
| `ClearCooldown` | Clears a specific cooldown across servers |
| `UpdateCooldown` | Synchronizes cooldown timers across servers |

---

## WorldGuard

Integrates with [WorldGuard](https://enginehub.org/worldguard) to check block permissions in protected regions. When the WorldEdit module modifies a block, zEssentials tests the WorldGuard `BLOCK_BREAK` flag for the player at that location; blocks the player is not allowed to break are skipped.

- **Auto-loaded**: Yes, if WorldGuard is present on the server
- **No additional configuration required**

---

## SuperiorSkyblock2

Integrates with [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) to check block permissions on islands. Before the WorldEdit module modifies a block, zEssentials verifies island membership and range.

- **Auto-loaded**: Yes, if SuperiorSkyblock2 is present on the server
- **Checks performed**:
  - `isMember()` -- verifies the player is a member of the island
  - `isInsideRange()` -- verifies the action occurs within the island boundaries
- **No additional configuration required**

---

## Generic Protection Plugins

In addition to the dedicated hooks above, zEssentials always registers a **Bukkit event-based permission checker** (since 1.0.3.6). Before the WorldEdit module modifies a block, it fires a simulated `BlockBreakEvent` for the player: if a protection plugin cancels the event, the block is skipped.

- **Always active**, no configuration required
- Works with any protection plugin that cancels `BlockBreakEvent` (HuskClaims, GriefPrevention, Lands, Towny, etc.)

---

## NuVotifier

Integrates with [NuVotifier](https://www.spigotmc.org/resources/nuvotifier.13449/) to receive vote notifications. When a player votes on a server list site, NuVotifier fires a `VotifierEvent` which zEssentials listens to and records in its vote tracking system.

- **Auto-loaded**: Yes, if Votifier is present on the server
- **No additional configuration required**

Votes received through NuVotifier are fed into the zEssentials vote module, contributing to per-player vote counts and vote party progress.

---

## NChat

Integrates with NChat to enforce mute sanctions on both public and private messages. When a player is muted through zEssentials, the mute is also applied to NChat message channels.

- **Auto-loaded**: Yes, if NChat is present on the server
- **Event priority**: `HIGHEST`
- **Enforced on**: Public messages and private messages
- **No additional configuration required**

---

## BlockTracker

Integrates with [BlockTracker](https://github.com/Krakenied/BlockTracker) to track block modifications made by players. This is useful for features that need to distinguish between naturally generated blocks and player-placed blocks.

- **Auto-loaded**: Yes, if BlockTracker is present on the server
- **Methods**:
  - `isTracked()` -- checks whether a block has been modified by a player
  - `track()` -- marks a block as modified by a player
- **Fallback**: If BlockTracker is not installed, zEssentials uses a `DefaultBlockTracker` implementation where `isTracked()` always returns `false`

---

## ProtocolLib

Integration with [ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/) designed to intercept `SYSTEM_CHAT` packets and make the `./command` pattern clickable in **every** message sent to players (not only in player chat).

<CalloutContainer type="warning">

<CalloutDescription>
The ProtocolLib packet listener is **currently disabled** in the plugin. ProtocolLib is only declared as an optional dependency and is not required by any module.
</CalloutDescription>

</CalloutContainer>

- **Auto-loaded**: No (disabled)
- **Packet intercepted**: `SYSTEM_CHAT`

The `./command` placeholder in **player chat** does not need ProtocolLib: it is handled by the Chat module, in the `command-placeholder` section of `modules/chat/config.yml`:

```yaml
command-placeholder: # ./<command>. placeholder
  enable: true
  result: "<hover:show_text:'<yellow>Try this command'><click:suggest_command:'/%fixed_command%'><yellow>/%command%</yellow></click></hover>"
  permission: "zessentials.chat.placeholder.command"
```

---

## MythicMobs

Integrates with [MythicMobs](https://www.spigotmc.org/resources/mythicmobs.5702/) to display custom mob names in death messages. When a player is killed by a MythicMobs creature, the Death Message module can show the mob's configured display name instead of the vanilla entity type.

- **Auto-loaded**: Yes, if MythicMobs is present on the server
- **Requirement**: The Death Message module must be enabled with `death-message-type: CUSTOM`
- **Methods**:
  - `isMythicMob()` -- checks whether an entity is a MythicMobs creature
  - `getMythicMobName()` -- retrieves the display name of the MythicMobs creature
- **No additional configuration required**

---

## AxVaults

Provides data migration from [AxVaults](https://www.spigotmc.org/resources/axvaults.103862/) to the zEssentials vault system. This is not a runtime integration but a one-time migration tool.

- **Usage**: Accessed via the built-in converter command
- **Purpose**: Migrates existing AxVaults player vault data into zEssentials vaults

To migrate data from AxVaults, run `/zessentials convert axvaults` (see [Data Migration](../converters#axvaults)). The same applies to PlayerVaults with `/zessentials convert playervaultx`.
