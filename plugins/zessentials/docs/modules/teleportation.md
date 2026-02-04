---
sidebar_position: 18
title: Teleportation Module
description: Complete teleportation system with TPA, RTP, delays, and safety features
---

# Teleportation Module

**File:** `modules/teleportation/config.yml`

The Teleportation module is a comprehensive teleportation system supporting direct teleports, teleport requests (TPA), random teleportation (RTP), configurable delays, safety checks, protection timers, biome blacklists, and world overrides. It includes a permission-based delay and protection system, allowing different behavior for different player groups.

---

## Source Configuration

```yaml
enable: true
teleport-safety: true
teleport-to-center: true
teleport-delay: 5
teleport-delay-permissions:
  - permission: "essentials.teleport.delay.vip"
    delay: 4
  - permission: "essentials.teleport.delay.staff"
    delay: 2
teleport-delay-bypass: false
teleport-tpa-expire: 60
open-confirm-inventory-for-tpa: false
open-confirm-inventory-for-tpa-here: false
rtp-worlds:
  - world: "world"
    center-x: 0
    center-z: 0
    radius-x: 5000
    radius-z: 5000
  - world: "survivalspawn"
    center-x: 0
    center-z: 0
    radius-x: 5000
    radius-z: 5000
max-rtp-attempts: 10
blacklist-biomes:
  - cold_ocean
  - deep_cold_ocean
  - deep_frozen_ocean
  - deep_lukewarm_ocean
  - deep_ocean
  - deep_warm_ocean
  - frozen_ocean
  - frozen_river
  - lukewarm_ocean
  - ocean
  - river
  - warm_ocean
teleport-protection: 1000
teleport-protections:
  - permission: "essentials.teleport.protection.vip"
    delay: 2000
  - permission: "essentials.teleport.protection.staff"
    delay: 3000
enable-random-teleport-search-log-message: true
enable-rtp-queue: false
rtp-queue-delay: 2000
enable-first-join-rtp: false
first-join-rtp-world: "world"
rtp-world-overrides:
  - from: "world_nether"
    to: "world"
  - from: "world_the_end"
    to: "world"
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Teleportation module |
| `teleport-safety` | Boolean | `true` | If `true`, the plugin checks for a safe landing location before teleporting (avoids lava, void, suffocation, etc.) |
| `teleport-to-center` | Boolean | `true` | If `true`, players are teleported to the center of the block (X.5, Z.5) for cleaner positioning |

### Teleport Delay

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `teleport-delay` | Integer | `5` | Default delay in seconds before a teleport is executed. The player must remain still during this time |
| `teleport-delay-bypass` | Boolean | `false` | If `true`, all players bypass the teleport delay entirely |
| `teleport-delay-permissions` | List | *(see above)* | Permission-based overrides for the teleport delay. Players with a matching permission use the specified delay instead of the default |
| `teleport-delay-permissions[].permission` | String | - | The permission node the player must have for this delay override to apply |
| `teleport-delay-permissions[].delay` | Integer | - | The delay in seconds to use for players with this permission |

:::tip
The `teleport-delay-permissions` list is checked in order. The first matching permission determines the player's delay. Assign permissions carefully so each player matches only one entry.
:::

### TPA (Teleport Ask) Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `teleport-tpa-expire` | Integer | `60` | Time in seconds before a pending TPA request expires automatically |
| `open-confirm-inventory-for-tpa` | Boolean | `false` | If `true`, opens a zMenu confirmation inventory for the target player when receiving a `/tpa` request |
| `open-confirm-inventory-for-tpa-here` | Boolean | `false` | If `true`, opens a zMenu confirmation inventory for the target player when receiving a `/tpahere` request |

:::info
When the confirmation inventory options are enabled, the receiving player gets a GUI prompt to accept or deny the request instead of relying on chat commands. This requires zMenu to be installed.
:::

### Random Teleportation (RTP) Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rtp-worlds` | List | *(see above)* | Defines which worlds allow random teleportation and the search area for each world |
| `rtp-worlds[].world` | String | - | The name of the world where RTP is allowed |
| `rtp-worlds[].center-x` | Integer | `0` | The X coordinate of the center point for the RTP search area |
| `rtp-worlds[].center-z` | Integer | `0` | The Z coordinate of the center point for the RTP search area |
| `rtp-worlds[].radius-x` | Integer | `5000` | The maximum distance from `center-x` on the X axis for random location selection |
| `rtp-worlds[].radius-z` | Integer | `5000` | The maximum distance from `center-z` on the Z axis for random location selection |
| `max-rtp-attempts` | Integer | `10` | Maximum number of attempts to find a safe random location before giving up |
| `enable-random-teleport-search-log-message` | Boolean | `true` | If `true`, logs a message to the console each time the plugin searches for a random teleport location |

### Biome Blacklist

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `blacklist-biomes` | List of Strings | *(see above)* | A list of biome identifiers where random teleportation will not place players. If a selected location falls within a blacklisted biome, the plugin retries up to `max-rtp-attempts` |

:::warning
If too many biomes are blacklisted and the RTP area is small, the plugin may exhaust all attempts without finding a valid location. Increase `max-rtp-attempts` or expand the RTP radius if players frequently fail to find a location.
:::

### Teleport Protection

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `teleport-protection` | Integer | `1000` | Default protection duration in milliseconds after teleportation. During this time, the player is immune to damage |
| `teleport-protections` | List | *(see above)* | Permission-based overrides for the teleport protection duration |
| `teleport-protections[].permission` | String | - | The permission node the player must have for this protection override to apply |
| `teleport-protections[].delay` | Integer | - | The protection duration in milliseconds for players with this permission |

:::note
Teleport protection prevents players from taking damage immediately after teleporting. This is especially useful for RTP where players may land in hostile environments. The value is in **milliseconds** (e.g., `1000` = 1 second, `3000` = 3 seconds).
:::

### RTP Queue

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-rtp-queue` | Boolean | `false` | If `true`, enables a queue system for RTP requests to prevent server lag from simultaneous random teleport searches |
| `rtp-queue-delay` | Integer | `2000` | Delay in milliseconds between processing each queued RTP request |

### First Join RTP

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-first-join-rtp` | Boolean | `false` | If `true`, new players are automatically randomly teleported when they first join the server |
| `first-join-rtp-world` | String | `"world"` | The world in which the first-join random teleport takes place. Must be defined in `rtp-worlds` |

:::tip
First join RTP is useful for survival servers that want to spread players out across the map from the start, rather than having everyone spawn at the same location.
:::

### World Overrides

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rtp-world-overrides` | List | *(see above)* | Redirects RTP requests from one world to another. If a player uses `/tpr` in a listed `from` world, they are teleported to a random location in the `to` world instead |
| `rtp-world-overrides[].from` | String | - | The world where the player is currently located |
| `rtp-world-overrides[].to` | String | - | The target world where the player will be randomly teleported |

:::info
World overrides are useful for preventing RTP in dimensions like the Nether or The End, redirecting those requests back to the overworld instead.
:::

---

## How It Works

1. **Direct Teleports** (`/tp`, `/tphere`, `/tpall`): Instantly teleport players to a target location or player, subject to the configured delay and safety checks.
2. **Teleport Requests** (`/tpa`, `/tpahere`): Send a request to another player. The target can accept (`/tpaccept`) or deny (`/tpdeny`) within the expiration window. The requester can cancel with `/tpacancel`.
3. **Random Teleport** (`/tpr`): Selects a random location within the configured RTP bounds for the player's current world (or the override world), avoiding blacklisted biomes, and teleports the player there after safety checks.
4. **Back** (`/back`): Returns the player to their previous location before the last teleport.
5. **Vertical Teleports** (`/top`, `/bottom`): Teleports the player to the highest or lowest safe block at their current X/Z coordinates.
6. **World Teleport** (`/worldtp`): Teleports a player to a specific world.

---

## Related Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/tp` | `essentials.tp` | Teleport to a player or coordinates |
| `/tpall` | `essentials.tpall` | Teleport all online players to you |
| `/tphere` | `essentials.tphere` | Teleport a player to your location |
| `/tpa` | `essentials.tpa` | Send a teleport request to a player |
| `/tpahere` | `essentials.tpahere` | Request a player to teleport to you |
| `/tpaccept` | `essentials.tpaccept` | Accept a pending teleport request |
| `/tpdeny` | `essentials.tpdeny` | Deny a pending teleport request |
| `/tpacancel` | `essentials.tpacancel` | Cancel your outgoing teleport request |
| `/back` | `essentials.back` | Teleport to your previous location |
| `/tpr` (rtp) | `essentials.rtp` | Teleport to a random location |
| `/top` | `essentials.top` | Teleport to the highest block at your position |
| `/bottom` | `essentials.bottom` | Teleport to the lowest safe block at your position |
| `/worldtp` | `essentials.worldtp` | Teleport to a specific world |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Permissions

| Permission | Description |
|------------|-------------|
| `essentials.teleport.delay.vip` | Grants VIP teleport delay (4 seconds in default config) |
| `essentials.teleport.delay.staff` | Grants staff teleport delay (2 seconds in default config) |
| `essentials.teleport.protection.vip` | Grants VIP teleport protection (2000ms in default config) |
| `essentials.teleport.protection.staff` | Grants staff teleport protection (3000ms in default config) |

:::note
The permission nodes and their associated values are fully configurable. The permissions listed above are from the default configuration and can be changed to match your server's permission structure.
:::

---

## Example: Survival Server Setup

A typical survival server configuration with generous RTP bounds and ocean biome exclusion:

```yaml
enable: true
teleport-safety: true
teleport-to-center: true
teleport-delay: 5
teleport-delay-permissions:
  - permission: "essentials.teleport.delay.donor"
    delay: 2
  - permission: "essentials.teleport.delay.staff"
    delay: 0
teleport-delay-bypass: false
teleport-tpa-expire: 120
rtp-worlds:
  - world: "world"
    center-x: 0
    center-z: 0
    radius-x: 10000
    radius-z: 10000
max-rtp-attempts: 20
blacklist-biomes:
  - ocean
  - deep_ocean
teleport-protection: 3000
enable-first-join-rtp: true
first-join-rtp-world: "world"
```
