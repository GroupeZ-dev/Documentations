---
title: Developer API
description: Use the zVeinMiner API to read and edit vein mining items, query player data and listen to vein mining events
---

# Developer API

zVeinMiner ships a separate API module (package `fr.maxlego08.veinminer.api`) that other plugins can compile against. It gives access to:

- **`VeinManager`** - vein detection, presets and the vein mining data stored on items
- **`PlayerManager`** - per-player toggle state and statistics
- **Events** - `VeinMineStartEvent`, `VeinMineBlockEvent` and `VeinMineCompleteEvent`

<CalloutContainer type="info">

<CalloutTitle>Requirements</CalloutTitle>

<CalloutDescription>
The API targets the same platform as the plugin: **Paper 26.3 or newer** and **Java 25**. Your plugin must be compiled with a Java 25 toolchain to use it. Spigot and Folia are not supported.
</CalloutDescription>

</CalloutContainer>

## Adding the dependency

The API is published on the GroupeZ repository. The group is `fr.maxlego08.veinminer` and the artifact is `zveinminer-api`. Replace `<version>` (or `VERSION` in Maven) with the latest zVeinMiner release, the one running on your server.

### Gradle (Kotlin DSL)

```kotlin
repositories {
    maven {
        name = "groupezReleases"
        url = uri("https://repo.groupez.dev/releases")
    }
}

dependencies {
    compileOnly("fr.maxlego08.veinminer:zveinminer-api:<version>")
}
```

### Gradle (Groovy DSL)

```groovy
repositories {
    maven { url 'https://repo.groupez.dev/releases' }
}

dependencies {
    compileOnly 'fr.maxlego08.veinminer:zveinminer-api:<version>'
}
```

### Maven

```xml
<repositories>
    <repository>
        <id>groupez-releases</id>
        <url>https://repo.groupez.dev/releases</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>fr.maxlego08.veinminer</groupId>
        <artifactId>zveinminer-api</artifactId>
        <version>VERSION</version> <!-- latest zVeinMiner release -->
        <scope>provided</scope>
    </dependency>
</dependencies>
```

<CalloutContainer type="warning">

<CalloutTitle>Do not shade the API</CalloutTitle>

<CalloutDescription>
Always use `compileOnly` (Gradle) or `provided` (Maven). The classes are supplied at runtime by the zVeinMiner jar; shading them would create a second copy of the interfaces and events, and your listeners would never be called.
</CalloutDescription>

</CalloutContainer>

## Declaring zVeinMiner as a dependency

zVeinMiner must be loaded before your plugin, and your plugin must be able to see its classes.

### paper-plugin.yml

```yaml
dependencies:
  server:
    zVeinMiner:
      load: BEFORE
      required: false     # true if your plugin cannot work without zVeinMiner
      join-classpath: true
```

Keep `join-classpath: true` (the Paper default): with `false`, your plugin cannot load the `fr.maxlego08.veinminer.api` classes.

### plugin.yml

If your plugin still uses a Bukkit `plugin.yml`:

```yaml
softdepend: [ zVeinMiner ]
# or, if zVeinMiner is mandatory:
depend: [ zVeinMiner ]
```

## Getting the managers

On enable, zVeinMiner registers both managers in Bukkit's `ServicesManager` with the `Highest` priority:

| Service | Description |
|---------|-------------|
| `fr.maxlego08.veinminer.api.VeinManager` | Vein detection, presets, item data |
| `fr.maxlego08.veinminer.api.PlayerManager` | Player toggle state and statistics |

```java
import fr.maxlego08.veinminer.api.PlayerManager;
import fr.maxlego08.veinminer.api.VeinManager;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private VeinManager veinManager;
    private PlayerManager playerManager;

    @Override
    public void onEnable() {
        var services = getServer().getServicesManager();

        this.veinManager = services.load(VeinManager.class);
        this.playerManager = services.load(PlayerManager.class);

        if (this.veinManager == null || this.playerManager == null) {
            getLogger().warning("zVeinMiner is not installed, the integration is disabled.");
            return;
        }

        getLogger().info("Hooked into zVeinMiner!");
    }
}
```

`load()` returns `null` when zVeinMiner is missing or not enabled, so always check the result when zVeinMiner is a soft dependency.

## VeinManager

`VeinManager` is the main entry point. Every vein mining property of an item is stored in its `PersistentDataContainer` (see [VeinKeys](#veinkeys)), so the methods below work on any `ItemStack`.

| Method | Returns | Description |
|--------|---------|-------------|
| `getVeinKeys()` | `VeinKeys` | The `NamespacedKey`s used to store the data on items |
| `getVeinBlocks(Block start, int maxVeinSize)` | `Set<Block>` | Vein of blocks of the **same type** as `start` |
| `getVeinBlocks(Block start, int maxVeinSize, Predicate<Block> matcher)` | `Set<Block>` | Vein of blocks matching `matcher` |
| `getVeinPreset(String name)` | `Optional<VeinPreset>` | A preset loaded from `config.yml` (name is case-sensitive) |
| `applyPreset(ItemStack item, VeinPreset preset)` | `void` | Links the item to the preset (stores the preset **name** only) |
| `setPreset(ItemStack item, VeinPreset preset)` | `void` | Copies the preset **size and tags** onto the item |
| `getVeinMinerResult(ItemStack item)` | `Optional<ItemVeinMinerResult>` | The effective size and tags of the item |
| `changeSize(ItemStack item, int size)` | `void` | Sets the size stored on the item (`0` removes it) |
| `getTaggables(String tags)` | `List<Taggable>` | Parses a comma-separated list of tags |
| `addTag(ItemStack item, Taggable tag)` | `boolean` | Adds a tag to the item, `false` if already present |
| `removeTag(ItemStack item, Taggable tag)` | `boolean` | Removes a tag from the item, `false` if not present |
| `getTags(Player player)` | `List<String>` | Tag names of the item in the player's main hand |
| `displayCurrentSize(Player player)` | `void` | Sends the `size-display` message for the item in the main hand |

### Vein detection

`getVeinBlocks` runs a breadth-first search from the start block over its 26 neighbours (diagonals included):

- the returned set **includes the start block** and keeps the discovery order (closest blocks first);
- the set is empty if the start block itself does not match;
- `maxVeinSize` is capped by the `max-size-limit` option of `config.yml` (when it is greater than `0`);
- the search never loads chunks, never leaves the world border and stays within the world height.

```java
Block start = event.getBlock();

// Same material only
Set<Block> sameType = veinManager.getVeinBlocks(start, 32);

// Custom matcher: every log connected to the start block
Set<Block> logs = veinManager.getVeinBlocks(start, 64, block -> Tag.LOGS.isTagged(block.getType()));
```

<CalloutContainer type="info">

<CalloutTitle>Read-only</CalloutTitle>

<CalloutDescription>
`getVeinBlocks` only computes the blocks, it never breaks anything. Use it on the main thread, as it reads blocks from the world.
</CalloutDescription>

</CalloutContainer>

### applyPreset vs setPreset

Both methods give an item vein mining abilities, but they store different data:

| Method | Stored on the item | After a `/zveinminer reload` |
|--------|--------------------|------------------------------|
| `applyPreset` | The preset name | The item follows the new size and tags of the preset |
| `setPreset` | The preset size and its tags | The item keeps the values it was given |

Neither method removes the other data already stored on the item: a size or a tag list stored on the item still overrides the values of a linked preset (see [Reading an item](#reading-an-item)).

They are the API equivalents of `/zveinminer apply` and `/zveinminer set` (see [Commands & Permissions](./commands-permissions)).

```java
ItemStack pickaxe = new ItemStack(Material.DIAMOND_PICKAXE);

veinManager.getVeinPreset("pickaxe-1").ifPresent(preset -> {
    veinManager.applyPreset(pickaxe, preset);
    player.getInventory().addItem(pickaxe);
});
```

All the methods that edit an item (`applyPreset`, `setPreset`, `changeSize`, `addTag`, `removeTag`) modify the `ItemStack` you pass through its `ItemMeta`. If the stack is a copy, put it back in the inventory afterwards.

### Reading an item

`getVeinMinerResult` returns `Optional.empty()` when the item has no vein mining data at all. Otherwise it resolves the effective values:

1. the size and tags of the linked preset (if the item has a preset name and the preset still exists);
2. overridden by the size stored on the item, if any;
3. overridden by the tags stored on the item, if any.

```java
ItemStack hand = player.getInventory().getItemInMainHand();

veinManager.getVeinMinerResult(hand).ifPresent(result -> {
    int size = result.size();
    List<String> tags = result.tags().stream().map(Taggable::asString).toList();
    player.sendMessage("Vein size: " + size + " - tags: " + String.join(", ", tags));
});
```

### Editing size and tags

```java
ItemStack hand = player.getInventory().getItemInMainHand();

// Size stored on the item, 0 removes it and falls back to the preset size
veinManager.changeSize(hand, 16);

// Tags: Bukkit tag names (COAL_ORES, LOGS...) or block materials (DIAMOND_ORE...)
for (Taggable taggable : veinManager.getTaggables("IRON_ORES, ANCIENT_DEBRIS")) {
    veinManager.addTag(hand, taggable);
}

veinManager.getTaggables("IRON_ORES").forEach(taggable -> veinManager.removeTag(hand, taggable));
```

Notes on tags:

- `getTaggables` splits the string on commas, trims each value, is case-insensitive, and silently ignores values that are neither the name of a Bukkit material `Tag` constant (`COAL_ORES`, `LOGS`...) nor a block material (items such as `DIAMOND` are not blocks and are ignored; `NETHERITE_SCRAP` is converted to `ANCIENT_DEBRIS` for older configurations).
- `addTag` and `removeTag` start from the **effective** tags (including the ones inherited from the preset), compare tags case-insensitively with `asString()`, then store the new list on the item.
- Removing the last tag stores an empty list: the item does **not** fall back to the preset tags.

The tag syntax itself is described in [Presets & Tags](./presets-and-tags).

## Data types

### VeinPreset

A preset loaded from the `presets` list of `config.yml`.

| Method | Returns | Description |
|--------|---------|-------------|
| `getName()` | `String` | Name of the preset |
| `getMaxVeinSize()` | `int` | Vein size of the preset |
| `getTags()` | `List<Taggable>` | Tags of the preset |
| `isTagged(Block block)` | `boolean` | `true` if one of the tags matches the block |
| `getTagsAsString()` | `String` | Tags joined with commas |

### Taggable

A single tag: either a Bukkit block tag or a block material.

| Method | Returns | Description |
|--------|---------|-------------|
| `isTagged(Block block)` | `boolean` | `true` if the block matches this tag |
| `asString()` | `String` | The name used in configuration files (`COAL_ORES`, `DIAMOND_ORE`...) |

### ItemVeinMinerResult

A record holding the effective data of an item: `size()` (`int`) and `tags()` (`List<Taggable>`).

### VeinKeys

The `NamespacedKey`s used in the item `PersistentDataContainer`. They use the `zveinminer` namespace.

| Method | Key | Type | Content |
|--------|-----|------|---------|
| `getSizeKey()` | `zveinminer:size` | `INTEGER` | Vein size stored on the item |
| `getPresetKey()` | `zveinminer:preset` | `STRING` | Name of the linked preset |
| `getTaggableKey()` | `zveinminer:taggable` | `STRING` | Comma-separated tag list |

Prefer the `VeinManager` methods over writing these keys yourself: they handle the preset fallback and the tag parsing for you.

### Config

`fr.maxlego08.veinminer.api.Config` exposes the values loaded from `config.yml` as public static fields (`cooldown`, `maxSizeLimit`, `requireSneak`, `matchByTag`, `previewEnabled`, `worldBlacklist`, `worldWhitelistMode`, `teleportToPlayer`, `autoPickup`, `checkDurability`, `applyDamage`, `economyEnabled`, `costPerBlock`, `costPerVein`, `enableDebug`, `enableDebugTime`) and the loaded presets in `Config.veinPresets` (a `Map<String, VeinPreset>` in the order of the configuration file).

Treat these fields as **read-only**: they are overwritten every time the configuration is reloaded. The map instance of `veinPresets` is kept across reloads, so you can safely keep a reference to it. The meaning of each option is described in [Configuration](./configuration).

## PlayerManager

`PlayerManager` gives access to the per-player toggle (`/zveinminer toggle`) and the statistics (`/zveinminer stats`).

| Method | Returns | Description |
|--------|---------|-------------|
| `getPlayerData(Player player)` | `PlayerData` | Data of an online player, loaded from storage if needed |
| `getPlayerData(UUID uuid)` | `Optional<PlayerData>` | Data **already loaded in memory** only, empty otherwise |
| `isEnabled(Player player)` | `boolean` | Whether vein mining is enabled for the player |
| `toggle(Player player)` | `boolean` | Toggles vein mining, returns the new state |
| `setEnabled(Player player, boolean enabled)` | `void` | Enables or disables vein mining for the player |
| `updateStats(Player player, int blocksMined)` | `void` | Adds `blocksMined` blocks and **one** vein to the statistics |
| `loadPlayerData(UUID uuid)` | `void` | Loads the data from storage into memory |
| `savePlayerData(UUID uuid)` | `void` | Saves the in-memory data to storage |
| `unloadPlayerData(UUID uuid)` | `void` | Saves the data and removes it from memory |

Player data is stored in `plugins/zVeinMiner/playerdata/<uuid>.yml`. It is loaded on join and saved on quit and when the server stops; changes made through the API are kept in memory until then, call `savePlayerData` if you need them written immediately.

When vein mining is disabled for a player, zVeinMiner does not start any vein for them.

```java
// Disable vein mining while a player is in a minigame
playerManager.setEnabled(player, false);

// Read the statistics
PlayerData data = playerManager.getPlayerData(player);
player.sendMessage("Blocks: " + data.totalBlocksMined() + " - veins: " + data.totalVeinsMined());
```

### PlayerData

An immutable record:

| Component | Type | Description |
|-----------|------|-------------|
| `uuid()` | `UUID` | Player UUID |
| `veinMinerEnabled()` | `boolean` | Vein mining toggle (default `true`) |
| `totalBlocksMined()` | `long` | Blocks mined with vein mining, origin block included |
| `totalVeinsMined()` | `long` | Number of veins mined |

It also provides `defaultData(UUID)`, `withToggled()`, `withEnabled(boolean)` and `withStats(int, boolean)`, which return new instances. Creating a new record does not change the stored data: use the `PlayerManager` methods to update a player.

## Events

All events are in `fr.maxlego08.veinminer.api.events`, extend `PlayerEvent` and are fired on the main thread. They are only fired when a vein is actually triggered: the player is not in Adventure or Spectator mode, has the `zveinminer.use` permission and has vein mining enabled, the world is allowed, the player sneaks if `require-sneak` is enabled, the tool has an effective size greater than `1` (after the `max-size-limit` cap), a tag matching the block and is the preferred tool for it, the cooldown is over (or the player has `zveinminer.bypass.cooldown`), the vein contains at least one block besides the origin that the protection checks allow, and, when the economy is enabled, the player can afford the vein.

The order is:

1. the player breaks the origin block (vanilla `BlockBreakEvent`);
2. `VeinMineStartEvent` - once, with every block of the vein;
3. for each block: `VeinMineBlockEvent`, then a regular `BlockBreakEvent` fired by `Player#breakBlock`;
4. `VeinMineCompleteEvent` - once, with the blocks that were really broken.

### VeinMineStartEvent

Cancellable. Cancelling it prevents the whole vein mine (the origin block is still broken normally).

| Method | Returns | Description |
|--------|---------|-------------|
| `getOriginBlock()` | `Block` | Block broken by the player |
| `getBlocks()` | `Set<Block>` | Blocks that will be broken, origin excluded, already filtered by the protection checks - **modifiable** |
| `getBlockCount()` | `int` | Size of `getBlocks()` |
| `getTool()` | `ItemStack` | Tool in the main hand |

You can add or remove blocks from `getBlocks()`. Added blocks are ignored if they are the origin block, air, in another world or in an unloaded chunk, and they still go through the protection checks (WorldGuard, GriefPrevention, spawn protection). If the economy is enabled and you add blocks, the player's balance is checked again for the new total.

```java
@EventHandler
public void onVeinStart(VeinMineStartEvent event) {
    // Never vein mine more than 10 blocks below Y=0
    if (event.getOriginBlock().getY() < 0 && event.getBlockCount() > 10) {
        event.setCancelled(true);
        event.getPlayer().sendMessage("Vein too large at this depth!");
    }

    // Never break blocks next to a spawner
    event.getBlocks().removeIf(block -> isNearSpawner(block));
}
```

### VeinMineBlockEvent

Cancellable. Fired before each extra block is broken; cancelling it skips that block only.

| Method | Returns | Description |
|--------|---------|-------------|
| `getBlock()` | `Block` | Block about to be broken |
| `getOriginBlock()` | `Block` | Block broken by the player |
| `getTool()` | `ItemStack` | Tool in the main hand |
| `getBlockIndex()` | `int` | Index of the block in the vein (0-based) |
| `getTotalBlocks()` | `int` | Number of blocks in the vein, origin excluded |

```java
@EventHandler
public void onVeinBlock(VeinMineBlockEvent event) {
    // Keep the blocks marked as placed by a player
    if (isPlacedByPlayer(event.getBlock())) {
        event.setCancelled(true);
    }
}
```

### VeinMineCompleteEvent

Not cancellable: the blocks are already broken. Fired every time a `VeinMineStartEvent` was not cancelled, even if no extra block could be broken (for example when the player cannot afford the vein).

| Method | Returns | Description |
|--------|---------|-------------|
| `getOriginBlock()` | `Block` | Block broken by the player |
| `getBrokenBlocks()` | `Set<Block>` | Blocks really broken, origin **excluded** |
| `getTool()` | `ItemStack` | Tool in the main hand |
| `getTotalBlocksBroken()` | `int` | Number of blocks broken, origin **included** |

```java
@EventHandler
public void onVeinComplete(VeinMineCompleteEvent event) {
    if (event.getBrokenBlocks().isEmpty()) return;

    int total = event.getTotalBlocksBroken();
    event.getPlayer().sendActionBar(Component.text("Vein mined: " + total + " blocks"));
}
```

<CalloutContainer type="tip">

<CalloutTitle>BlockBreakEvent for every block</CalloutTitle>

<CalloutDescription>
Each extra block is broken with `Player#breakBlock`, which fires a normal `BlockBreakEvent`. Plugins that already listen to `BlockBreakEvent` (jobs, logs, quests, protections) handle vein mined blocks without any zVeinMiner-specific code. Use the zVeinMiner events only when you need to know that a block belongs to a vein.
</CalloutDescription>

</CalloutContainer>

## Protection hooks

The API contains a `fr.maxlego08.veinminer.api.hooks.ProtectionHook` interface (`getName()`, `isAvailable()`, `canBreak(Player, Block)`), implemented by the built-in WorldGuard and GriefPrevention hooks. There is currently **no public method to register your own hook**.

To protect blocks from vein mining in your own plugin, either cancel the `BlockBreakEvent` fired for each block, or cancel `VeinMineBlockEvent` / remove blocks in `VeinMineStartEvent`. The built-in hooks are described in [Integrations](./integrations).

## Full example

A small plugin that gives a vein mining pickaxe on join and rewards large veins:

```java
package com.example.veinrewards;

import fr.maxlego08.veinminer.api.VeinManager;
import fr.maxlego08.veinminer.api.events.VeinMineCompleteEvent;
import org.bukkit.Material;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.plugin.java.JavaPlugin;

public class VeinRewardsPlugin extends JavaPlugin implements Listener {

    private VeinManager veinManager;

    @Override
    public void onEnable() {
        this.veinManager = getServer().getServicesManager().load(VeinManager.class);
        if (this.veinManager == null) {
            getLogger().warning("zVeinMiner not found, disabling.");
            getServer().getPluginManager().disablePlugin(this);
            return;
        }
        getServer().getPluginManager().registerEvents(this, this);
    }

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        if (event.getPlayer().hasPlayedBefore()) return;

        ItemStack pickaxe = new ItemStack(Material.IRON_PICKAXE);
        this.veinManager.getVeinPreset("pickaxe-1").ifPresent(preset -> {
            this.veinManager.applyPreset(pickaxe, preset);
            event.getPlayer().getInventory().addItem(pickaxe);
        });
    }

    @EventHandler
    public void onVeinComplete(VeinMineCompleteEvent event) {
        if (event.getTotalBlocksBroken() >= 8) {
            event.getPlayer().giveExp(10);
        }
    }
}
```

`pickaxe-1` is the preset shipped in the default `config.yml`; replace it with one of your own presets.
