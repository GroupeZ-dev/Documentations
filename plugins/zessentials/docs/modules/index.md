---
sidebar_position: 1
title: Modules Overview
description: Overview of all zEssentials modules
---

# Modules Overview

zEssentials is built on a **modular architecture** where each feature is encapsulated in its own independent module. Every module has its own configuration file, located in the `modules/` directory, and can be enabled or disabled individually. This design allows you to run only the features your server needs, reducing overhead and avoiding conflicts with other plugins.

---

## Available Modules

The following table lists all 22 modules included in zEssentials:

| Module | Config File | Description |
|--------|-------------|-------------|
| [AFK](./afk) | `modules/afk/config.yml` | Away From Keyboard detection and automatic kick system |
| [AutoMessage](./automessage) | `modules/automessage/config.yml` | Automatic broadcast messages at configurable intervals |
| [Chat](./chat) | `modules/chat/config.yml` | Chat formatting, channels, and moderation tools |
| [Discord](./discord) | `modules/discord/config.yml` | Discord integration for server-to-Discord communication |
| [Economy](./economy) | `modules/economy/config.yml` | Multi-currency economy system with Vault integration |
| [Hologram](./hologram) | `modules/hologram/config.yml` | Holographic text displays in the game world |
| [Home](./home) | `modules/home/config.yml` | Player home teleportation system |
| [Items](./items) | `modules/items/config.yml` | Custom item definitions and management |
| [JoinQuit](./join-quit) | `modules/join_quit/config.yml` | Customizable join, quit, and first-join messages with MOTD |
| [Kits](./kits) | `modules/kits/config.yml` | Predefined item kits with cooldowns and permissions |
| [Mailbox](./mailbox) | `modules/mailbox/config.yml` | Player-to-player mail messaging system |
| [Messages](./messages) | `modules/messages/config.yml` | Private messaging and social spy for staff |
| [Rules](./rules) | `modules/rules/config.yml` | Server rules display system |
| [Sanction](./sanction) | `modules/sanction/config.yml` | Player punishment system (ban, mute, kick, warn) |
| [Scoreboard](./scoreboard) | `modules/scoreboard/config.yml` | Customizable sidebar scoreboard display |
| [Spawn](./spawn) | `modules/spawn/config.yml` | Server spawn point management and teleportation |
| [Steps](./steps) | `modules/steps/config.yml` | Step-based progression and tracking system |
| [Teleportation](./teleportation) | `modules/teleportation/config.yml` | Teleport requests (TPA), back, and random teleport |
| [Vault](./vault) | `modules/vault/config.yml` | Personal player storage vaults |
| [Vote](./vote) | `modules/vote/config.yml` | Vote reward system for server list voting |
| [Warp](./warp) | `modules/warp/config.yml` | Server warp system with optional inventory display |
| [WorldEdit](./worldedit) | `modules/worldedit/config.yml` | Built-in block manipulation tools with economy integration |

---

## Enabling and Disabling Modules

Every module configuration file contains an `enable` option at the top. To disable a module, set this value to `false`:

```yaml
enable: false
```

To re-enable a module, set it back to `true`:

```yaml
enable: true
```

:::warning
After changing the `enable` value in any module's configuration file, you must **restart the server** for the change to take effect. A simple configuration reload is not sufficient to fully enable or disable a module.
:::

---

## Configuration File Structure

Each module stores its configuration in the following path:

```
plugins/zEssentials/modules/<module-name>/config.yml
```

For example, the Economy module configuration is located at:

```
plugins/zEssentials/modules/economy/config.yml
```

:::tip
All modules follow the same general structure: an `enable` toggle at the top followed by module-specific options. Refer to each module's dedicated documentation page for a complete breakdown of its configuration options, commands, permissions, and placeholders.
:::

---

## Module Dependencies

Most modules operate independently, but some modules interact with each other:

- The **WorldEdit** module uses the **Economy** module to charge players for block operations.
- The **Warp** module can use **zMenu** inventories for GUI-based warp browsing.
- The **Economy** module integrates with **Vault** for third-party plugin compatibility.
- The **JoinQuit**, **Rules**, and **AutoMessage** modules read message content from `messages.yml`.

:::info
Disabling a module that another module depends on may cause the dependent feature to silently degrade. For example, disabling the Economy module will prevent the WorldEdit module from charging players, and operations may fail or become free depending on the implementation.
:::
