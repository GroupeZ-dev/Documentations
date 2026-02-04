---
sidebar_position: 1
title: Hooks & Integrations
description: Optional plugin integrations and hooks for zEssentials
---

# Hooks & Integrations

zEssentials provides optional integrations with third-party plugins to extend its functionality. These hooks are loaded automatically when the corresponding plugin is detected on the server, unless otherwise noted.

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

### Configuration

Redis is configured in the main `config.yml`:

```yaml
server-type: REDIS

redis-configuration:
  host: "127.0.0.1"
  port: 6379
  password: ""
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

Integrates with [WorldGuard](https://enginehub.org/worldguard) to block permission checking in protected regions. When a player attempts to perform an action in a WorldGuard-protected region, zEssentials checks the `BLOCK_BREAK` flag to determine whether the action is allowed.

- **Auto-loaded**: Yes, if WorldGuard is present on the server
- **No additional configuration required**

---

## SuperiorSkyblock2

Integrates with [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) to block permission checking on islands. zEssentials verifies island membership and range before allowing certain actions.

- **Auto-loaded**: Yes, if SuperiorSkyblock2 is present on the server
- **Checks performed**:
  - `isMember()` -- verifies the player is a member of the island
  - `isInsideRange()` -- verifies the action occurs within the island boundaries
- **No additional configuration required**

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

Integrates with [ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/) to intercept `SYSTEM_CHAT` packets and add clickable command suggestions to chat messages.

- **Auto-loaded**: Yes, if ProtocolLib is present on the server
- **Packet intercepted**: `SYSTEM_CHAT`
- **Pattern**: `./command` -- text matching this pattern in chat messages becomes clickable, suggesting the command when clicked

### Configuration

Configured in `modules/chat/config.yml` under the `command-placeholder` section:

```yaml
command-placeholder:
  enabled: true
  # Additional settings for command suggestion behavior
```

---

## AxVaults

Provides data migration from [AxVaults](https://www.spigotmc.org/resources/axvaults.103560/) to the zEssentials vault system. This is not a runtime integration but a one-time migration tool.

- **Usage**: Accessed via the built-in converter command
- **Purpose**: Migrates existing AxVaults player vault data into zEssentials vaults

To migrate data from AxVaults, use the zEssentials converter command and select AxVaults as the source.
