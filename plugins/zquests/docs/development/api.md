---
sidebar_position: 1
title: API
description: Developer documentation for the zQuests API
---

# zQuests API

zQuests provides an API for developers to interact with quests, manage progress, and create custom integrations.

## Setup

### Maven/Gradle

Add the zQuests API as a dependency:

```kotlin
repositories {
    maven {
        name = "groupezReleases"
        url = uri("https://repo.groupez.dev/releases")
    }
}

dependencies {
    compileOnly("fr.maxlego08.quests:zquests-api:<version>")
}
```

Replace `<version>` with the version of zQuests running on your server.

### plugin.yml

Add zQuests as a dependency:

```yaml
depend: [zQuests]
# or
softdepend: [zQuests]
```

## Accessing Managers

Use Bukkit's `ServicesManager` to access zQuests managers:

```java
import fr.maxlego08.quests.api.QuestManager;
import fr.maxlego08.quests.api.HologramManager;
import fr.maxlego08.quests.api.WayPointManager;
import org.bukkit.Bukkit;

public class MyPlugin extends JavaPlugin {

    private QuestManager questManager;
    private HologramManager hologramManager;
    private WayPointManager wayPointManager;

    @Override
    public void onEnable() {
        // Get quest manager
        questManager = Bukkit.getServicesManager().load(QuestManager.class);

        // Get hologram manager (optional)
        hologramManager = Bukkit.getServicesManager().load(HologramManager.class);

        // Get waypoint manager (optional)
        wayPointManager = Bukkit.getServicesManager().load(WayPointManager.class);

        if (questManager != null) {
            getLogger().info("zQuests API loaded!");
        }
    }
}
```

## Quest Manager

The `QuestManager` is the main API interface for interacting with quests.

### Get Quest Information

```java
// Get a quest by name
Optional<Quest> quest = questManager.getQuest("stone-breaker-1");

// Get all quests
List<Quest> allQuests = questManager.getQuests();

// Check if quest exists
boolean exists = questManager.getQuest("quest-name").isPresent();
```

### Player Quest Data

```java
UUID playerId = player.getUniqueId();

// Get player's active quests
List<ActiveQuest> activeQuests = questManager.getActiveQuests(playerId);

// Check if player has a specific quest active
boolean hasQuest = questManager.hasActiveQuest(playerId, "stone-breaker-1");

// Get player's progress on a quest
Optional<ActiveQuest> activeQuest = questManager.getActiveQuest(playerId, "stone-breaker-1");
if (activeQuest.isPresent()) {
    int progress = activeQuest.get().getProgress();
    int goal = activeQuest.get().getQuest().getGoal();
}
```

### Start and Complete Quests

```java
// Start a quest for a player
questManager.startQuest(playerId, "stone-breaker-1");

// Complete a quest for a player
questManager.completeQuest(playerId, "stone-breaker-1");

// Delete a quest from player's data
questManager.deleteQuest(playerId, "stone-breaker-1");

// Restart a quest
questManager.restartQuest(playerId, "stone-breaker-1");
```

### Modify Progress

```java
// Set exact progress value
questManager.setProgress(playerId, "stone-breaker-1", 250);

// Add to progress
questManager.addProgress(playerId, "stone-breaker-1", 10);
```

### Handle Quest Events

Trigger quest progress for specific quest types:

```java
// Handle block break progress
int updated = questManager.handleQuests(
    playerId,
    QuestType.BLOCK_BREAK,
    1,  // amount
    Material.STONE  // action data
);

// Handle entity kill progress
questManager.handleQuests(
    playerId,
    QuestType.ENTITY_KILL,
    1,
    EntityType.ZOMBIE
);

// Handle custom quest progress
questManager.handleQuests(
    playerId,
    QuestType.CUSTOM,
    1,
    "my-custom-data"
);
```

The return value indicates how many quests were updated.

## Custom Quest Types

### Using CUSTOM Type

The `CUSTOM` quest type allows you to create quests tracked by your own logic:

```yaml
quests:
  - type: CUSTOM
    name: "talk-to-npc"
    display-name: "Talk to the Guide"
    goal: 1
    actions:
      - data: "npc:guide"
```

Trigger progress from your plugin:

```java
// When player talks to your NPC
public void onNPCInteract(Player player, String npcId) {
    QuestManager manager = Bukkit.getServicesManager().load(QuestManager.class);
    if (manager != null) {
        // Data must match quest's action data
        int result = manager.handleQuests(
            player.getUniqueId(),
            QuestType.CUSTOM,
            1,
            "npc:" + npcId
        );

        if (result > 0) {
            // Quest(s) were updated
            player.sendMessage("Quest progress updated!");
        }
    }
}
```

### Inventory Content Quests

For `INVENTORY_CONTENT` quests that require item delivery:

```java
// Create inventory content check
InventoryContent content = new InventoryContent(player, "npc_name");

// Process the quest (checks inventory and removes items)
int result = questManager.handleInventoryQuests(content);
```

## Events

zQuests fires several events you can listen to:

### QuestStartEvent

Fired when a quest starts for a player.

```java
@EventHandler
public void onQuestStart(QuestStartEvent event) {
    Player player = event.getPlayer();
    Quest quest = event.getQuest();

    if (player != null) {
        player.sendMessage("Started quest: " + quest.getDisplayName());
    }
}
```

### QuestProgressEvent

Fired when quest progress is made.

```java
@EventHandler
public void onQuestProgress(QuestProgressEvent event) {
    Player player = event.getPlayer();
    ActiveQuest activeQuest = event.getActiveQuest();
    int progress = activeQuest.getProgress();
    int goal = activeQuest.getQuest().getGoal();

    if (player != null) {
        player.sendMessage("Progress: " + progress + "/" + goal);
    }
}
```

### QuestCompleteEvent

Fired when a quest is completed.

```java
@EventHandler
public void onQuestComplete(QuestCompleteEvent event) {
    Player player = event.getPlayer();
    Quest quest = event.getActiveQuest().getQuest();

    if (player != null) {
        player.sendMessage("Completed: " + quest.getDisplayName());

        // Give custom rewards
        player.getInventory().addItem(new ItemStack(Material.DIAMOND, 5));
    }
}
```

### QuestFavoriteChangeEvent

Fired when a quest's favorite status changes.

```java
@EventHandler
public void onFavoriteChange(QuestFavoriteChangeEvent event) {
    Player player = event.getPlayer();
    boolean isFavorite = event.isFavorite();

    if (player != null && isFavorite) {
        player.sendMessage("Quest added to favorites!");
    }
}
```

### QuestPostProgressEvent

Fired after quest progress is processed.

```java
@EventHandler
public void onPostProgress(QuestPostProgressEvent event) {
    // Useful for post-processing or logging
}
```

### QuestUserLoadEvent

Fired when a player's quest data is loaded.

```java
@EventHandler
public void onUserLoad(QuestUserLoadEvent event) {
    UUID playerId = event.getPlayerId();
    // Player's quest data is now available
}
```

## Hologram Manager

Manage quest holograms programmatically:

```java
HologramManager hologramManager = Bukkit.getServicesManager().load(HologramManager.class);

if (hologramManager != null) {
    // Refresh all holograms for a player
    hologramManager.refreshHolograms(player);

    // Refresh all holograms globally
    hologramManager.refreshAllHolograms();
}
```

## Waypoint Manager

Manage quest waypoints:

```java
WayPointManager wayPointManager = Bukkit.getServicesManager().load(WayPointManager.class);

if (wayPointManager != null) {
    // Refresh waypoints for a player
    wayPointManager.refreshWaypoints(player);
}
```

## Complete Example

Here's a complete example plugin that integrates with zQuests:

```java
package com.example.questintegration;

import fr.maxlego08.quests.api.QuestManager;
import fr.maxlego08.quests.api.QuestType;
import fr.maxlego08.quests.api.events.QuestCompleteEvent;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerInteractEntityEvent;
import org.bukkit.plugin.java.JavaPlugin;

public class QuestIntegration extends JavaPlugin implements Listener {

    private QuestManager questManager;

    @Override
    public void onEnable() {
        questManager = Bukkit.getServicesManager().load(QuestManager.class);

        if (questManager == null) {
            getLogger().warning("zQuests not found!");
            return;
        }

        getServer().getPluginManager().registerEvents(this, this);
        getLogger().info("Quest integration enabled!");
    }

    @EventHandler
    public void onNPCInteract(PlayerInteractEntityEvent event) {
        Player player = event.getPlayer();

        // Example: Trigger custom quest when player interacts with villager
        if (event.getRightClicked().getType().name().equals("VILLAGER")) {
            int result = questManager.handleQuests(
                player.getUniqueId(),
                QuestType.CUSTOM,
                1,
                "villager:interact"
            );

            if (result > 0) {
                player.sendMessage("§aQuest progress: Talked to villager!");
            }
        }
    }

    @EventHandler
    public void onQuestComplete(QuestCompleteEvent event) {
        Player player = event.getPlayer();
        if (player == null) return;

        String questName = event.getActiveQuest().getQuest().getName();

        // Custom handling for specific quests
        if (questName.equals("special-quest")) {
            player.sendMessage("§6§lSpecial quest completed!");
            // Add your custom logic here
        }
    }
}
```

## Best Practices

1. **Check for null** - Always check if managers are available
2. **Use events** - Listen to events instead of polling for changes
3. **Async considerations** - Quest operations are thread-safe but callbacks may be async
4. **Cache references** - Store manager references in onEnable() instead of fetching repeatedly
5. **Handle soft dependencies** - Make zQuests a soft-depend if your plugin should work without it

## API Javadocs

For complete API documentation, see the Javadocs generated from the source code or explore the API module in the [GitHub repository](https://github.com/Maxlego08/zQuests).
