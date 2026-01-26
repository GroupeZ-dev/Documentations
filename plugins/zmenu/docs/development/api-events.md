---
sidebar_position: 6
title: Events
description: Listening to zMenu events in your plugin
---

# Events

zMenu fires various events that you can listen to in your plugin. This allows you to react to inventory actions, button loads, and more.

## Available Events

| Event | Description |
|-------|-------------|
| `ButtonLoadEvent` | Fired when a button is loaded from configuration |
| `InventoryLoadEvent` | Fired when an inventory is loaded |
| `PlayerOpenInventoryEvent` | Fired when a player opens a zMenu inventory |
| `ButtonLoaderRegisterEvent` | Fired when a button loader is registered |
| `ZMenuItemsLoad` | Fired when custom items are loaded |

## ButtonLoadEvent

Fired when a button is loaded from a configuration file.

```java
import fr.maxlego08.menu.api.event.ButtonLoadEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class ButtonListener implements Listener {

    @EventHandler
    public void onButtonLoad(ButtonLoadEvent event) {
        Button button = event.getButton();
        String buttonName = button.getName();

        getLogger().info("Button loaded: " + buttonName);

        // You can modify the button or add custom logic
    }
}
```

### Use Cases
- Log all loaded buttons
- Validate button configurations
- Add custom processing to buttons

## InventoryLoadEvent

Fired when an inventory is loaded from a configuration file.

```java
import fr.maxlego08.menu.api.event.InventoryLoadEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class InventoryListener implements Listener {

    @EventHandler
    public void onInventoryLoad(InventoryLoadEvent event) {
        Inventory inventory = event.getInventory();
        String name = inventory.getName();
        String fileName = inventory.getFileName();
        int size = inventory.size();

        getLogger().info("Inventory loaded: " + fileName);
        getLogger().info("  Name: " + name);
        getLogger().info("  Size: " + size);
        getLogger().info("  Buttons: " + inventory.getButtons().size());
    }
}
```

### Use Cases
- Track loaded inventories
- Validate inventory configurations
- Add post-processing to inventories

## PlayerOpenInventoryEvent

Fired when a player opens a zMenu inventory. This event is cancellable.

```java
import fr.maxlego08.menu.api.event.PlayerOpenInventoryEvent;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class OpenInventoryListener implements Listener {

    @EventHandler
    public void onPlayerOpenInventory(PlayerOpenInventoryEvent event) {
        Player player = event.getPlayer();
        Inventory inventory = event.getInventory();

        getLogger().info(player.getName() + " opened inventory: " + inventory.getFileName());

        // Cancel opening for specific conditions
        if (!player.hasPermission("myplugin.use.menus")) {
            event.setCancelled(true);
            player.sendMessage("You don't have permission to use menus!");
        }
    }
}
```

### Use Cases
- Log player menu access
- Restrict inventory access
- Track player activity
- Add custom checks before opening

### Cancel the Event

```java
@EventHandler
public void onPlayerOpenInventory(PlayerOpenInventoryEvent event) {
    Player player = event.getPlayer();
    Inventory inventory = event.getInventory();

    // Block specific inventories for non-VIP
    if (inventory.getFileName().startsWith("vip-") &&
        !player.hasPermission("server.vip")) {
        event.setCancelled(true);
        player.sendMessage(ChatColor.RED + "This menu is VIP-only!");
    }
}
```

## ButtonLoaderRegisterEvent

Fired when a button loader is registered with the ButtonManager.

```java
import fr.maxlego08.menu.api.event.ButtonLoaderRegisterEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class LoaderListener implements Listener {

    @EventHandler
    public void onButtonLoaderRegister(ButtonLoaderRegisterEvent event) {
        ButtonLoader loader = event.getButtonLoader();
        String name = loader.getName();

        getLogger().info("Button loader registered: " + name);
    }
}
```

### Use Cases
- Track available button types
- Log plugin integrations
- Debug loader registration

## ZMenuItemsLoad

Fired when zMenu loads custom items from configuration.

```java
import fr.maxlego08.menu.api.event.ZMenuItemsLoad;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class ItemsLoadListener implements Listener {

    @EventHandler
    public void onItemsLoad(ZMenuItemsLoad event) {
        getLogger().info("zMenu items have been loaded!");

        // Add your custom items or processing here
    }
}
```

## Registering Event Listeners

Register your listeners in your plugin's `onEnable`:

```java
@Override
public void onEnable() {
    // Register event listeners
    getServer().getPluginManager().registerEvents(new ButtonListener(), this);
    getServer().getPluginManager().registerEvents(new InventoryListener(), this);
    getServer().getPluginManager().registerEvents(new OpenInventoryListener(), this);
}
```

## Complete Example: Menu Analytics

Track menu usage for analytics:

```java
package com.example.analytics;

import fr.maxlego08.menu.api.Inventory;
import fr.maxlego08.menu.api.event.PlayerOpenInventoryEvent;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

public class MenuAnalytics implements Listener {

    private final JavaPlugin plugin;
    private final Map<String, Integer> menuOpenCounts = new ConcurrentHashMap<>();
    private final Map<UUID, Long> lastMenuOpen = new ConcurrentHashMap<>();

    public MenuAnalytics(JavaPlugin plugin) {
        this.plugin = plugin;
    }

    @EventHandler
    public void onMenuOpen(PlayerOpenInventoryEvent event) {
        Player player = event.getPlayer();
        Inventory inventory = event.getInventory();
        String menuName = inventory.getFileName();

        // Track open count
        menuOpenCounts.merge(menuName, 1, Integer::sum);

        // Track last open time
        lastMenuOpen.put(player.getUniqueId(), System.currentTimeMillis());

        // Log for debugging
        plugin.getLogger().info(String.format(
            "[Analytics] %s opened %s (total opens: %d)",
            player.getName(),
            menuName,
            menuOpenCounts.get(menuName)
        ));
    }

    public int getOpenCount(String menuName) {
        return menuOpenCounts.getOrDefault(menuName, 0);
    }

    public Map<String, Integer> getAllStats() {
        return new HashMap<>(menuOpenCounts);
    }

    public void printStats() {
        plugin.getLogger().info("=== Menu Analytics ===");
        menuOpenCounts.entrySet().stream()
            .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
            .forEach(entry -> {
                plugin.getLogger().info(entry.getKey() + ": " + entry.getValue() + " opens");
            });
    }
}
```

## Complete Example: Menu Access Control

Control access to menus based on custom conditions:

```java
package com.example.access;

import fr.maxlego08.menu.api.Inventory;
import fr.maxlego08.menu.api.event.PlayerOpenInventoryEvent;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

public class MenuAccessController implements Listener {

    // Menus that require VIP
    private final Set<String> vipMenus = new HashSet<>();

    // Menus with cooldowns
    private final Map<String, Long> menuCooldowns = new HashMap<>();
    private final Map<UUID, Map<String, Long>> playerCooldowns = new HashMap<>();

    public MenuAccessController() {
        // Configure VIP menus
        vipMenus.add("vip-shop");
        vipMenus.add("vip-rewards");
        vipMenus.add("premium-features");

        // Configure cooldowns (in milliseconds)
        menuCooldowns.put("daily-rewards", 60000L); // 1 minute
        menuCooldowns.put("spin-wheel", 300000L);   // 5 minutes
    }

    @EventHandler(priority = EventPriority.HIGH)
    public void onMenuOpen(PlayerOpenInventoryEvent event) {
        if (event.isCancelled()) return;

        Player player = event.getPlayer();
        Inventory inventory = event.getInventory();
        String menuName = inventory.getFileName();

        // Check VIP requirement
        if (vipMenus.contains(menuName) && !player.hasPermission("server.vip")) {
            event.setCancelled(true);
            player.sendMessage(ChatColor.RED + "This menu requires VIP rank!");
            return;
        }

        // Check cooldown
        if (menuCooldowns.containsKey(menuName)) {
            long cooldown = menuCooldowns.get(menuName);
            long lastOpen = getLastOpen(player.getUniqueId(), menuName);
            long now = System.currentTimeMillis();

            if (now - lastOpen < cooldown) {
                event.setCancelled(true);
                long remaining = (cooldown - (now - lastOpen)) / 1000;
                player.sendMessage(ChatColor.RED + "Please wait " + remaining +
                    " seconds before opening this menu again!");
                return;
            }

            // Update last open time
            setLastOpen(player.getUniqueId(), menuName, now);
        }
    }

    private long getLastOpen(UUID uuid, String menu) {
        return playerCooldowns
            .getOrDefault(uuid, new HashMap<>())
            .getOrDefault(menu, 0L);
    }

    private void setLastOpen(UUID uuid, String menu, long time) {
        playerCooldowns
            .computeIfAbsent(uuid, k -> new HashMap<>())
            .put(menu, time);
    }

    public void addVipMenu(String menuName) {
        vipMenus.add(menuName);
    }

    public void setMenuCooldown(String menuName, long milliseconds) {
        menuCooldowns.put(menuName, milliseconds);
    }
}
```

## Complete Example: Menu Logging

Log all menu interactions for auditing:

```java
package com.example.logging;

import fr.maxlego08.menu.api.event.InventoryLoadEvent;
import fr.maxlego08.menu.api.event.PlayerOpenInventoryEvent;
import fr.maxlego08.menu.api.event.ButtonLoadEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class MenuLogger implements Listener {

    private final JavaPlugin plugin;
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private final File logFile;

    public MenuLogger(JavaPlugin plugin) {
        this.plugin = plugin;
        this.logFile = new File(plugin.getDataFolder(), "menu-log.txt");
    }

    @EventHandler
    public void onInventoryLoad(InventoryLoadEvent event) {
        log("INVENTORY_LOAD", "Loaded inventory: " + event.getInventory().getFileName());
    }

    @EventHandler
    public void onButtonLoad(ButtonLoadEvent event) {
        log("BUTTON_LOAD", "Loaded button: " + event.getButton().getName());
    }

    @EventHandler
    public void onMenuOpen(PlayerOpenInventoryEvent event) {
        String message = String.format("Player %s opened menu %s",
            event.getPlayer().getName(),
            event.getInventory().getFileName());
        log("MENU_OPEN", message);
    }

    private void log(String type, String message) {
        String timestamp = dateFormat.format(new Date());
        String logLine = String.format("[%s] [%s] %s", timestamp, type, message);

        // Log to console
        plugin.getLogger().info(logLine);

        // Log to file
        try (PrintWriter writer = new PrintWriter(new FileWriter(logFile, true))) {
            writer.println(logLine);
        } catch (IOException e) {
            plugin.getLogger().severe("Failed to write to log file: " + e.getMessage());
        }
    }
}
```

## Event Priorities

Use event priorities to control when your listener runs:

```java
// Run first (before other plugins)
@EventHandler(priority = EventPriority.LOWEST)
public void onMenuOpenFirst(PlayerOpenInventoryEvent event) {
    // ...
}

// Run last (after other plugins)
@EventHandler(priority = EventPriority.HIGHEST)
public void onMenuOpenLast(PlayerOpenInventoryEvent event) {
    // ...
}

// Run even if cancelled
@EventHandler(priority = EventPriority.MONITOR, ignoreCancelled = false)
public void onMenuOpenMonitor(PlayerOpenInventoryEvent event) {
    // Just observe, don't modify
}
```

## Best Practices

1. **Don't block events unnecessarily** - Only cancel when needed
2. **Use appropriate priorities** - LOWEST for modifications, MONITOR for logging
3. **Handle exceptions** - Don't let errors crash event handling
4. **Keep listeners lightweight** - Avoid heavy operations in event handlers
5. **Register listeners properly** - Use the plugin manager

## Next Steps

- Create [Custom Buttons](./api-buttons)
- Create [Custom Actions](./api-actions)
- Work with [Player Data](./api-player-data)
- Review the [API Introduction](./api-introduction)
