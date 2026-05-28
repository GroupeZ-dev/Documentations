---
sidebar_position: 4
title: Death Message Module
description: Customizable death messages with support for player kills, mobs, MythicMobs, and per-cause configuration
---

# Death Message Module

**File:** `modules/death_message/config.yml`

The Death Message module allows you to fully customize the death messages displayed in chat. You can choose between vanilla messages, completely disable them, or use custom messages with per-cause configuration.

---

## Configuration

```yaml
# Enable or disable this module
enable: true

# Allow players with essentials.silent.death permission to die without a death message
allow-silent-death: false

# Death message type:
# - DISABLE: No death messages will be shown
# - DEFAULT: Use vanilla Minecraft death messages
# - CUSTOM: Use custom death messages defined below
death-message-type: CUSTOM
```

### Death Message Types

| Type | Description |
|------|-------------|
| `DISABLE` | No death messages are shown at all |
| `DEFAULT` | Uses vanilla Minecraft death messages (no changes) |
| `CUSTOM` | Uses the custom messages defined in the configuration |

---

## Custom Messages

When `death-message-type` is set to `CUSTOM`, you can define multiple messages for each death cause. If multiple messages are defined for a cause, one will be picked randomly.

### Available Placeholders

| Placeholder | Description | Availability |
|-------------|-------------|--------------|
| `%player%` | Name of the player who died | All causes |
| `%displayName%` | Display name of the player who died | All causes |
| `%killer%` | Name of the player who killed | `PLAYER` cause only |
| `%mob%` | Name of the mob that killed | `MOB` and `MYTHIC_MOB` causes only |
| `%cause%` | The formatted cause of death | All causes |
| `%weapon%` | The weapon used by the killer (with hover event) | `PLAYER` cause only |

### Supported Causes

| Cause | Description |
|-------|-------------|
| `GENERIC` | Default message when no specific cause matches |
| `PLAYER` | Death by another player |
| `MOB` | Death by a vanilla mob |
| `MYTHIC_MOB` | Death by a MythicMobs creature (requires MythicMobs) |
| `FALL` | Falling from a high place |
| `DROWNING` | Drowning in water |
| `FIRE` | Burning in fire |
| `LAVA` | Swimming in lava |
| `VOID` | Falling out of the world |
| `LIGHTNING` | Struck by lightning |
| `STARVATION` | Starving to death |
| `SUFFOCATION` | Suffocating in a wall |
| `EXPLOSION` | Blown up by an explosion |
| `POISON` | Dying of poison |
| `WITHER` | Wither effect |
| `CRAMMING` | Entity cramming |
| `FLY_INTO_WALL` | Kinetic energy (elytra) |
| `FREEZE` | Freezing to death |

All vanilla `DamageCause` values are supported.

### Example Configuration

```yaml
custom-messages:
  GENERIC:
    - "#99E0FF%player% &7died."
  PLAYER:
    - "#99E0FF%player% &7was slain by #34cfe0%killer%&7."
    - "#34cfe0%killer% &7killed #99E0FF%player%&7."
  MOB:
    - "#99E0FF%player% &7was killed by &c%mob%&7."
  MYTHIC_MOB:
    - "#99E0FF%player% &7was slain by <gradient:#ff6600:#ff0000>%mob%</gradient>&7!"
  FALL:
    - "#99E0FF%player% &7fell from a high place."
    - "#99E0FF%player% &7hit the ground too hard."
  DROWNING:
    - "#99E0FF%player% &7drowned."
  LAVA:
    - "#99E0FF%player% &7tried to swim in lava."
```

---

## Commands

| Command | Aliases | Description | Permission |
|---------|---------|-------------|------------|
| `/deathmessage` | `/dm`, `/deathmsg` | Toggle death message visibility for yourself | `essentials.deathmessage` |

---

## Permissions

| Permission | Description |
|------------|-------------|
| `essentials.deathmessage` | Allows toggling death message visibility |
| `essentials.silent.death` | Player dies without any death message being shown (requires `allow-silent-death: true`) |
