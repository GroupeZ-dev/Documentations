---
sidebar_position: 3
title: Custom Buttons
description: Creating custom button types for zMenu
---

# Custom Buttons

Learn how to create and register custom button types in zMenu.

## Overview

Custom buttons allow you to extend zMenu with new button behaviors. This involves:
1. Creating a `ButtonLoader` to parse YAML configuration
2. Creating a `Button` implementation for the behavior
3. Registering the loader with the `ButtonManager`

## ButtonManager

Get the button manager to register custom buttons:

```java
ButtonManager buttonManager = menuPlugin.getButtonManager();
```

## Creating a Button Loader

The `ButtonLoader` interface defines how your button is loaded from YAML:

```java
import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.loader.ButtonLoader;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.plugin.Plugin;

public class MyButtonLoader implements ButtonLoader {

    @Override
    public String getName() {
        return "MY_CUSTOM_BUTTON"; // The type name used in YAML
    }

    @Override
    public Button load(YamlConfiguration configuration, String path, Plugin plugin) {
        // Read custom properties from configuration
        String customProperty = configuration.getString(path + ".custom-property", "default");
        int customNumber = configuration.getInt(path + ".custom-number", 0);
        boolean customFlag = configuration.getBoolean(path + ".custom-flag", false);

        // Create and return your button instance
        return new MyCustomButton(customProperty, customNumber, customFlag);
    }
}
```

## Creating a Button Implementation

Implement the `Button` interface (or extend a base class):

```java
import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.button.DefaultButtonValue;
import fr.maxlego08.menu.inventory.inventories.InventoryDefault;
import org.bukkit.entity.Player;
import org.bukkit.event.inventory.InventoryClickEvent;

public class MyCustomButton extends DefaultButtonValue implements Button {

    private final String customProperty;
    private final int customNumber;
    private final boolean customFlag;

    public MyCustomButton(String customProperty, int customNumber, boolean customFlag) {
        this.customProperty = customProperty;
        this.customNumber = customNumber;
        this.customFlag = customFlag;
    }

    @Override
    public String getName() {
        return "MY_CUSTOM_BUTTON";
    }

    @Override
    public void onClick(Player player, InventoryClickEvent event,
                       InventoryDefault inventory, int slot) {
        // Your custom click logic here
        player.sendMessage("Custom button clicked!");
        player.sendMessage("Property: " + customProperty);
        player.sendMessage("Number: " + customNumber);
        player.sendMessage("Flag: " + customFlag);

        // Example: Execute different actions based on configuration
        if (customFlag) {
            player.sendMessage("Flag is enabled!");
        }

        // You can also interact with the inventory
        // inventory.refresh(player);
    }
}
```

## Registering Your Button

Register your button loader when your plugin enables:

```java
@Override
public void onEnable() {
    MenuPlugin menuPlugin = (MenuPlugin) Bukkit.getPluginManager().getPlugin("zMenu");

    if (menuPlugin != null) {
        // Register custom button
        menuPlugin.getButtonManager().register(new MyButtonLoader());
        getLogger().info("Registered custom button: MY_CUSTOM_BUTTON");
    }
}
```

## Using Your Custom Button

In your inventory YAML configuration:

```yaml
items:
  my-custom-item:
    type: MY_CUSTOM_BUTTON
    slot: 13
    custom-property: "Hello World"
    custom-number: 42
    custom-flag: true
    item:
      material: DIAMOND
      name: "&b&lCustom Button"
      lore:
        - "&7This is a custom button!"
```

## Complete Example: Teleport Button

### TeleportButtonLoader.java

```java
package com.example.buttons;

import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.loader.ButtonLoader;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.World;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.plugin.Plugin;

public class TeleportButtonLoader implements ButtonLoader {

    @Override
    public String getName() {
        return "TELEPORT";
    }

    @Override
    public Button load(YamlConfiguration config, String path, Plugin plugin) {
        String worldName = config.getString(path + ".world", "world");
        double x = config.getDouble(path + ".x", 0);
        double y = config.getDouble(path + ".y", 64);
        double z = config.getDouble(path + ".z", 0);
        float yaw = (float) config.getDouble(path + ".yaw", 0);
        float pitch = (float) config.getDouble(path + ".pitch", 0);
        String message = config.getString(path + ".message", "&aTeleported!");

        World world = Bukkit.getWorld(worldName);
        Location location = new Location(world, x, y, z, yaw, pitch);

        return new TeleportButton(location, message);
    }
}
```

### TeleportButton.java

```java
package com.example.buttons;

import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.button.DefaultButtonValue;
import fr.maxlego08.menu.inventory.inventories.InventoryDefault;
import org.bukkit.ChatColor;
import org.bukkit.Location;
import org.bukkit.entity.Player;
import org.bukkit.event.inventory.InventoryClickEvent;

public class TeleportButton extends DefaultButtonValue implements Button {

    private final Location location;
    private final String message;

    public TeleportButton(Location location, String message) {
        this.location = location;
        this.message = message;
    }

    @Override
    public String getName() {
        return "TELEPORT";
    }

    @Override
    public void onClick(Player player, InventoryClickEvent event,
                       InventoryDefault inventory, int slot) {
        // Close the inventory first
        player.closeInventory();

        // Teleport the player
        player.teleport(location);

        // Send message with color codes
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', message));
    }
}
```

### Usage in YAML

```yaml
items:
  spawn-teleport:
    type: TELEPORT
    slot: 13
    world: "world"
    x: 0
    y: 100
    z: 0
    yaw: 90
    pitch: 0
    message: "&aYou have been teleported to spawn!"
    item:
      material: ENDER_PEARL
      name: "&5&lTeleport to Spawn"
      lore:
        - "&7Click to teleport"
```

## Complete Example: Counter Button

A button that tracks clicks per player:

### CounterButtonLoader.java

```java
package com.example.buttons;

import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.loader.ButtonLoader;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.plugin.Plugin;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class CounterButtonLoader implements ButtonLoader {

    // Shared counter storage across all counter buttons
    private static final Map<UUID, Integer> counters = new HashMap<>();

    @Override
    public String getName() {
        return "COUNTER";
    }

    @Override
    public Button load(YamlConfiguration config, String path, Plugin plugin) {
        int maxCount = config.getInt(path + ".max-count", 10);
        String rewardCommand = config.getString(path + ".reward-command", "");

        return new CounterButton(counters, maxCount, rewardCommand);
    }
}
```

### CounterButton.java

```java
package com.example.buttons;

import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.button.DefaultButtonValue;
import fr.maxlego08.menu.inventory.inventories.InventoryDefault;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.inventory.InventoryClickEvent;

import java.util.Map;
import java.util.UUID;

public class CounterButton extends DefaultButtonValue implements Button {

    private final Map<UUID, Integer> counters;
    private final int maxCount;
    private final String rewardCommand;

    public CounterButton(Map<UUID, Integer> counters, int maxCount, String rewardCommand) {
        this.counters = counters;
        this.maxCount = maxCount;
        this.rewardCommand = rewardCommand;
    }

    @Override
    public String getName() {
        return "COUNTER";
    }

    @Override
    public void onClick(Player player, InventoryClickEvent event,
                       InventoryDefault inventory, int slot) {
        UUID uuid = player.getUniqueId();

        // Get current count
        int currentCount = counters.getOrDefault(uuid, 0);
        currentCount++;

        // Update counter
        counters.put(uuid, currentCount);

        player.sendMessage("§aClick count: " + currentCount + "/" + maxCount);

        // Check if max reached
        if (currentCount >= maxCount) {
            player.sendMessage("§6You reached the maximum clicks!");

            // Execute reward command
            if (!rewardCommand.isEmpty()) {
                String command = rewardCommand.replace("%player%", player.getName());
                Bukkit.dispatchCommand(Bukkit.getConsoleSender(), command);
            }

            // Reset counter
            counters.put(uuid, 0);
        }

        // Refresh the inventory to update display
        inventory.refresh(player);
    }
}
```

## Advanced: Button with Custom Item Display

Override the item display based on player state:

```java
@Override
public ItemStack getCustomItemStack(Player player) {
    // Return a custom item based on player state
    int count = counters.getOrDefault(player.getUniqueId(), 0);

    ItemStack item = new ItemStack(Material.PAPER);
    ItemMeta meta = item.getItemMeta();
    meta.setDisplayName("§6Counter: " + count + "/" + maxCount);
    item.setItemMeta(meta);

    return item;
}
```

## Best Practices

1. **Use meaningful type names** - Make them unique and descriptive
2. **Validate configuration** - Check for missing or invalid values
3. **Handle null values** - Use defaults for optional properties
4. **Keep buttons focused** - One button type = one purpose
5. **Document your buttons** - Explain required configuration options
6. **Test edge cases** - Empty configs, missing properties, etc.

## Next Steps

- Create [Custom Actions](./api-actions)
- Work with [Player Data](./api-player-data)
- Listen to [Events](./api-events)
