---
sidebar_position: 16
title: Spawn Module
description: Server spawn management with configurable respawn behavior
---

# Spawn Module

**File:** `modules/spawn/config.yml`

The Spawn module manages the server's spawn point and controls how players are handled on **respawn** and **join**. It provides fine-grained control over respawn priorities (bed, home, respawn anchor) and allows you to configure whether players are teleported to spawn when they first join or on every login.

---

## Source Configuration

```yaml
enable: true
respawn-listener-priority: highest  # none, lowest, low, normal, high, highest
spawn-join-listener-priority: highest
respawn-at-anchor: false
respawn-at-home: false
respawn-at-bed: true
teleport-at-spawn-on-join: false
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Spawn module |
| `respawn-listener-priority` | String | `highest` | The Bukkit event priority for the respawn listener. Accepts: `none`, `lowest`, `low`, `normal`, `high`, `highest`. Use `none` to disable the respawn listener entirely |
| `spawn-join-listener-priority` | String | `highest` | The Bukkit event priority for the join listener that handles spawn teleportation. Accepts: `none`, `lowest`, `low`, `normal`, `high`, `highest`. Use `none` to disable the join listener entirely |
| `respawn-at-anchor` | Boolean | `false` | If `true`, players will respawn at their respawn anchor (Nether) when available |
| `respawn-at-home` | Boolean | `false` | If `true`, players will respawn at their home location (set via `/sethome`) when available |
| `respawn-at-bed` | Boolean | `true` | If `true`, players will respawn at their bed location when available |
| `teleport-at-spawn-on-join` | Boolean | `false` | If `true`, players are teleported to the server spawn point every time they join the server |

:::info Listener Priority
The `respawn-listener-priority` and `spawn-join-listener-priority` options control the order in which zEssentials processes the respawn and join events relative to other plugins. Setting these to `highest` ensures zEssentials has the final say. Set to `none` to completely disable that listener, letting other plugins handle it instead.
:::

---

## Respawn Behavior

When a player dies and respawns, the plugin checks the following locations in order of priority:

1. **Respawn Anchor** -- If `respawn-at-anchor` is `true` and the player has a valid respawn anchor set.
2. **Home** -- If `respawn-at-home` is `true` and the player has a home location set.
3. **Bed** -- If `respawn-at-bed` is `true` and the player has a valid bed spawn.
4. **Server Spawn** -- If none of the above conditions are met, the player respawns at the server spawn point.

:::tip
Only one respawn location is used per death. The first valid option in the priority chain above is selected. If you want players to always respawn at spawn, set all three options (`respawn-at-anchor`, `respawn-at-home`, `respawn-at-bed`) to `false`.
:::

:::warning
If `respawn-at-bed` is `true` (the default), players with a valid bed will respawn there instead of at the server spawn. This is standard vanilla behavior. Set it to `false` if you want to override this for your server.
:::

---

## How It Works

1. An administrator sets the spawn point using `/setspawn` at the desired location.
2. Optionally, a first-join spawn is set using `/setfirstspawn` for new players.
3. When a player dies, the respawn listener evaluates the configured respawn options and teleports the player accordingly.
4. When a player joins, if `teleport-at-spawn-on-join` is `true`, they are teleported to the server spawn.
5. First-time players are teleported to the first spawn location (if configured), regardless of the `teleport-at-spawn-on-join` setting.

---

## Related Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/spawn` | `essentials.spawn` | Teleport to the server spawn point |
| `/setspawn` | `essentials.setspawn` | Set the server spawn point at your current location |
| `/firstspawn` | `essentials.firstspawn` | Teleport to the first-join spawn point |
| `/setfirstspawn` | `essentials.setfirstspawn` | Set the first-join spawn point at your current location |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Common Configurations

### Always Respawn at Spawn

To force all players to respawn at the server spawn regardless of beds, anchors, or homes:

```yaml
respawn-at-anchor: false
respawn-at-home: false
respawn-at-bed: false
```

### Teleport to Spawn on Every Join

To teleport players to spawn each time they log in (useful for lobby servers):

```yaml
teleport-at-spawn-on-join: true
```

### Let Other Plugins Handle Respawn

To disable zEssentials' respawn handling and let another plugin (e.g., a minigame plugin) control respawn behavior:

```yaml
respawn-listener-priority: none
```

:::note
Setting the listener priority to `none` completely disables that listener. This is different from setting it to `lowest`, which still processes the event but allows other plugins to override it.
:::
