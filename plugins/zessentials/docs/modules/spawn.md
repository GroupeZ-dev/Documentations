---
title: Spawn Module
description: Server spawn management with configurable respawn behavior
---

# Spawn Module

**File:** `modules/spawn/config.yml`

The Spawn module manages the server's spawn point and first spawn point, and controls where players appear on **respawn** and on **join**. It lets you decide whether beds and respawn anchors are respected, and at which event priority zEssentials handles respawns and first joins, so it can cooperate with other plugins such as Multiverse.

---

## Source Configuration

```yaml
enable: true

# What priority should we use for handling respawns?
# Set this to none, if you want vanilla respawning behaviour.
# Set this to lowest, if you want Multiverse to handle the respawning.
# Set this to high, if you want zEssentials to handle the respawning.
# Set this to highest, if you want to force zEssentials to handle the respawning.
# Note: Changes will not apply until after the server is restarted.
respawn-listener-priority: highest

# What priority should we use for handling spawning on joining the server?
# See respawn-listener-priority for possible values.
# Note: Changing this may impact or break spawn-on-join functionality.
# Note: Changes will not apply until after the server is restarted.
spawn-join-listener-priority: highest

# When the player dies, does he have to respawn to the respawn anchor
respawn-at-anchor: false

# When users die, should they respawn at their first home, instead of the spawnpoint?
respawn-at-home: false

# When users die, should they respawn at their bed instead of the spawnpoint?
respawn-at-bed: true

# Allows teleporting the player to spawn when logged in
teleport-at-spawn-on-join: false
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Spawn module |
| `respawn-listener-priority` | String | `highest` | Event priority of the respawn listener. Accepts `none`, `lowest`, `low`, `normal`, `high`, `highest`. `none` disables the listener (vanilla respawn behavior) |
| `spawn-join-listener-priority` | String | `highest` | Event priority of the listener that sets the spawn location of a player joining for the first time. Accepts `lowest`, `low`, `normal`, `high`, `highest` |
| `respawn-at-anchor` | Boolean | `false` | If `true`, a player whose respawn is at a respawn anchor keeps that location. If `false`, they are sent to the server spawn |
| `respawn-at-home` | Boolean | `false` | Reserved for a future version: respawning at a home is **not implemented yet** and this option currently has no effect |
| `respawn-at-bed` | Boolean | `true` | If `true`, a player whose respawn is at a bed keeps that location. If `false`, they are sent to the server spawn |
| `teleport-at-spawn-on-join` | Boolean | `false` | If `true`, players are teleported to the server spawn every time they join |

<CalloutContainer type="info">

<CalloutTitle>Listener priorities are now honored</CalloutTitle>

<CalloutDescription>
Before version 1.0.3.8, `respawn-listener-priority` and `spawn-join-listener-priority` were ignored and both listeners were always registered with the `NORMAL` priority. They now use the configured value, `HIGHEST` by default, which lets zEssentials have the final say over other plugins. Use `lowest` if another plugin (e.g. Multiverse) should decide instead.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="warning">

<CalloutDescription>
`none` is only supported for `respawn-listener-priority`. Do not use it for `spawn-join-listener-priority`.
</CalloutDescription>

</CalloutContainer>

Changes to the listener priorities require a **server restart**.

---

## Respawn Behavior

When a player respawns and a server spawn has been set with `/setspawn`:

1. **Respawn Anchor** -- If the respawn happens at a respawn anchor and `respawn-at-anchor` is `true`, the anchor is kept.
2. **Bed** -- If the respawn happens at a bed and `respawn-at-bed` is `true`, the bed is kept.
3. **Server Spawn** -- Otherwise, the player respawns at the server spawn.

If no server spawn is set, zEssentials does not change the respawn location.

<CalloutContainer type="info">

<CalloutDescription>
To always respawn players at spawn, set `respawn-at-anchor` and `respawn-at-bed` to `false`.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutTitle>Folia</CalloutTitle>

<CalloutDescription>
On Folia, the server spawn is set as the player's respawn location when they die.
</CalloutDescription>

</CalloutContainer>

---

## First Join

The first spawn is defined with `/setfirstspawn`. New players are sent there only when **first join teleport** is enabled in the main `config.yml`:

```yaml
# config.yml
enable-first-join-teleport: false
```

This option is **disabled by default** since 1.0.3.9. When it is enabled, a player joining for the first time spawns at the first spawn location, or at the server spawn if no first spawn is set. The spawn location is set during the join (with `spawn-join-listener-priority`), so new players directly appear at the right place.

---

## How It Works

1. An administrator sets the spawn point using `/setspawn` at the desired location.
2. Optionally, a first-join spawn is set using `/setfirstspawn`, and `enable-first-join-teleport` is enabled in `config.yml`.
3. When a player dies, the respawn listener applies the rules above.
4. When a player joins, if `teleport-at-spawn-on-join` is `true`, they are teleported to the server spawn.
5. Players can return to spawn at any time with `/spawn`.

---

## Related Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/spawn [player]` | `essentials.spawn` | Teleport to the server spawn point. Teleporting another player requires `essentials.spawn.other` |
| `/setspawn` | `essentials.set.spawn` | Set the server spawn point at your current location |
| `/firstspawn [player]` | `essentials.spawn.first` | Teleport to the first-join spawn point. Teleporting another player requires `essentials.spawn.other` |
| `/setfirstspawn` | `essentials.set.first.spawn` | Set the first-join spawn point at your current location |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Common Configurations

### Always Respawn at Spawn

```yaml
respawn-at-anchor: false
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

<CalloutContainer type="info">

<CalloutDescription>
Setting the respawn listener priority to `none` completely disables it. This is different from `lowest`, which still processes the event but lets plugins listening at a higher priority override the location.
</CalloutDescription>

</CalloutContainer>
