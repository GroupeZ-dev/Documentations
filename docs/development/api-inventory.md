---
sidebar_position: 2
title: Inventory API
description: Opening and managing inventories programmatically
---

# Inventory API

Learn how to open and manage zMenu inventories programmatically using the API.

## InventoryManager

The `InventoryManager` is your main interface for working with inventories.

```java
InventoryManager manager = menuPlugin.getInventoryManager();
```

## Getting Inventories

### Get by Name

```java
// Returns Optional<Inventory>
Optional<Inventory> inventory = manager.getInventory("shop");

// Check if inventory exists
if (inventory.isPresent()) {
    Inventory inv = inventory.get();
    // Work with inventory
}

// Or use ifPresent
manager.getInventory("shop").ifPresent(inv -> {
    // Work with inventory
});
```

### Get All Inventories

```java
// Get all loaded inventories
Collection<Inventory> allInventories = manager.getInventories();

for (Inventory inventory : allInventories) {
    String name = inventory.getName();
    int size = inventory.size();
    // Process inventory
}
```

### Check If Inventory Exists

```java
boolean exists = manager.getInventory("shop").isPresent();
```

## Opening Inventories

### Basic Opening

```java
manager.getInventory("shop").ifPresent(inv -> {
    manager.openInventory(player, inv);
});
```

### Open at Specific Page

```java
manager.getInventory("catalog").ifPresent(inv -> {
    manager.openInventory(player, inv, 3); // Open page 3
});
```

### Open with Arguments

Pass custom arguments to the inventory that can be used in placeholders:

```java
List<String> arguments = new ArrayList<>();
arguments.add("swords");      // Argument 1
arguments.add("diamond");     // Argument 2

manager.getInventory("category-shop").ifPresent(inv -> {
    manager.openInventory(player, inv, 1, arguments);
});
```

### Open for Another Player

```java
Player target = Bukkit.getPlayer("Notch");

manager.getInventory("admin-view").ifPresent(inv -> {
    manager.openInventory(target, inv);
});
```

## Inventory Interface

The `Inventory` interface provides information about loaded inventories:

```java
manager.getInventory("shop").ifPresent(inv -> {
    // Get inventory properties
    String name = inv.getName();           // Display name
    String fileName = inv.getFileName();   // File name without extension
    int size = inv.size();                 // Inventory size (9-54)
    Plugin plugin = inv.getPlugin();       // Plugin that registered it

    // Get buttons
    List<Button> buttons = inv.getButtons();

    // Check if inventory has pages
    int maxPage = inv.getMaxPage(player);
});
```

## Creating Inventory Engines

For more control, you can work with `InventoryEngine` directly:

```java
manager.getInventory("shop").ifPresent(inv -> {
    // Create an engine instance for this player
    InventoryEngine engine = manager.createInventoryEngine(player, inv);

    // Open with the engine
    engine.open();

    // Or open at specific page
    engine.open(2);
});
```

## Closing Inventories

### Close for Player

```java
// Close current inventory
player.closeInventory();
```

### Check If Player Has zMenu Open

```java
// Check if player has any zMenu inventory open
boolean hasMenuOpen = manager.hasPlayerInventory(player);
```

## Working with Plugin-Specific Inventories

If you're working with inventories from different plugins:

```java
// Get inventory from specific plugin
Optional<Inventory> inventory = manager.getInventory("shop", "MyPlugin");
```

## Refreshing Inventories

Force refresh an open inventory:

```java
// This is typically handled internally, but you can trigger updates
// through button actions or events
```

## Example: Shop System

```java
public class ShopManager {

    private final MenuPlugin menuPlugin;

    public ShopManager(MenuPlugin menuPlugin) {
        this.menuPlugin = menuPlugin;
    }

    public void openShop(Player player) {
        InventoryManager manager = menuPlugin.getInventoryManager();

        manager.getInventory("shop-main").ifPresent(inv -> {
            manager.openInventory(player, inv);
        });
    }

    public void openCategory(Player player, String category) {
        InventoryManager manager = menuPlugin.getInventoryManager();

        List<String> args = Collections.singletonList(category);

        manager.getInventory("shop-category").ifPresent(inv -> {
            manager.openInventory(player, inv, 1, args);
        });
    }

    public void openPlayerShop(Player viewer, Player shopOwner) {
        InventoryManager manager = menuPlugin.getInventoryManager();

        List<String> args = Arrays.asList(
            shopOwner.getName(),
            shopOwner.getUniqueId().toString()
        );

        manager.getInventory("player-shop").ifPresent(inv -> {
            manager.openInventory(viewer, inv, 1, args);
        });
    }
}
```

## Example: Command to Open Menu

```java
public class MenuCommand implements CommandExecutor {

    private final MenuPlugin menuPlugin;

    public MenuCommand(MenuPlugin menuPlugin) {
        this.menuPlugin = menuPlugin;
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command,
                            String label, String[] args) {
        if (!(sender instanceof Player)) {
            sender.sendMessage("Players only!");
            return true;
        }

        Player player = (Player) sender;
        InventoryManager manager = menuPlugin.getInventoryManager();

        if (args.length == 0) {
            // Open default menu
            manager.getInventory("main-menu").ifPresent(inv -> {
                manager.openInventory(player, inv);
            });
        } else {
            // Open specified menu
            String menuName = args[0];
            Optional<Inventory> inventory = manager.getInventory(menuName);

            if (inventory.isPresent()) {
                manager.openInventory(player, inventory.get());
            } else {
                player.sendMessage("Menu not found: " + menuName);
            }
        }

        return true;
    }
}
```

## Example: Open Menu on Event

```java
public class JoinListener implements Listener {

    private final MenuPlugin menuPlugin;

    public JoinListener(MenuPlugin menuPlugin) {
        this.menuPlugin = menuPlugin;
    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();

        // Open welcome menu after 1 second
        Bukkit.getScheduler().runTaskLater(plugin, () -> {
            if (player.isOnline()) {
                InventoryManager manager = menuPlugin.getInventoryManager();

                manager.getInventory("welcome-menu").ifPresent(inv -> {
                    manager.openInventory(player, inv);
                });
            }
        }, 20L); // 20 ticks = 1 second
    }
}
```

## Best Practices

1. **Always use Optional** - `getInventory()` returns Optional, handle it properly
2. **Check player online** - Verify player is still online before opening
3. **Use meaningful names** - Inventory names should match your file names
4. **Handle missing inventories** - Provide feedback if inventory doesn't exist
5. **Don't cache inventories** - Get fresh references when needed

## Next Steps

- Create [Custom Buttons](./api-buttons)
- Create [Custom Actions](./api-actions)
- Work with [Player Data](./api-player-data)
