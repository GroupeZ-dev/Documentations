---
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

When multiple plugins register inventories with the same name, you need to specify which plugin's inventory you want to access.

### Get Inventory by Name and Plugin Instance

```java
// Get inventory using your plugin instance
Optional<Inventory> inventory = manager.getInventory(myPlugin, "shop");

inventory.ifPresent(inv -> {
    manager.openInventory(player, inv);
});
```

### Get Inventory by Name and Plugin Name

```java
// Get inventory from a specific plugin by name
Optional<Inventory> inventory = manager.getInventory("shop", "MyPlugin");

// Example: Get inventory from zAuctionHouse plugin
Optional<Inventory> auctionInventory = manager.getInventory("auction", "zAuctionHouse");

auctionInventory.ifPresent(inv -> {
    manager.openInventory(player, inv);
});
```

### Complete Example: Plugin Integration

```java
public class InventoryService {

    private final Plugin plugin;
    private final InventoryManager inventoryManager;

    public InventoryService(Plugin plugin, MenuPlugin menuPlugin) {
        this.plugin = plugin;
        this.inventoryManager = menuPlugin.getInventoryManager();
    }

    /**
     * Opens an inventory registered by this plugin
     */
    public void openOwnInventory(Player player, String inventoryName) {
        inventoryManager.getInventory(plugin, inventoryName).ifPresent(inv -> {
            inventoryManager.openInventory(player, inv);
        });
    }

    /**
     * Opens an inventory registered by another plugin
     */
    public void openExternalInventory(Player player, String pluginName, String inventoryName) {
        inventoryManager.getInventory(inventoryName, pluginName).ifPresent(inv -> {
            inventoryManager.openInventory(player, inv);
        });
    }

    /**
     * Opens an inventory with pagination support
     */
    public void openInventoryAtPage(Player player, String inventoryName, int page) {
        inventoryManager.getInventory(plugin, inventoryName).ifPresent(inv -> {
            inventoryManager.openInventory(player, inv, page);
        });
    }

    /**
     * Opens an inventory preserving the navigation history
     * Allows players to go back to previous inventories
     */
    public void openWithHistory(Player player, String inventoryName, int page) {
        inventoryManager.getInventory(plugin, inventoryName).ifPresent(inv -> {
            inventoryManager.openInventoryWithOldInventories(player, inv, page);
        });
    }
}
```

### Using Enums for Inventory Names

A common pattern is to define your inventory names in an enum:

```java
public enum Inventories {

    MAIN_MENU("main-menu"),
    SHOP("shop"),
    SETTINGS("settings"),
    CONFIRM("confirm");

    private final String fileName;

    Inventories(String fileName) {
        this.fileName = fileName;
    }

    public String getFileName() {
        return fileName;
    }
}
```

Then use it in your loader:

```java
public class MyInventoryLoader {

    private final Plugin plugin;
    private final InventoryManager inventoryManager;

    public MyInventoryLoader(Plugin plugin, InventoryManager inventoryManager) {
        this.plugin = plugin;
        this.inventoryManager = inventoryManager;
    }

    public void openInventory(Player player, Inventories inventory) {
        openInventory(player, inventory, 1);
    }

    public void openInventory(Player player, Inventories inventory, int page) {
        var optional = inventoryManager.getInventory(plugin, inventory.getFileName());

        if (optional.isEmpty()) {
            plugin.getLogger().warning("Inventory not found: " + inventory.getFileName());
            player.sendMessage("§cInventory not found!");
            return;
        }

        inventoryManager.openInventoryWithOldInventories(player, optional.get(), page);
    }
}
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

## Inventory Listeners

An `InventoryListener` follows the life of every zMenu inventory: opening, closing, button clicks, inventory switches and item placement. All its methods are `default`, so you only override the ones you need.

```java
menuPlugin.getInventoryManager().registerInventoryListener(myListener);

// In onDisable
menuPlugin.getInventoryManager().unregisterInventoryListener(myListener);
```

Two methods let a listener display items itself, for example to send them with packets instead of placing them in the Bukkit inventory:

| Method | Called when |
|--------|-------------|
| `addItem(BaseInventory, boolean inPlayerInventory, ItemButton, boolean enableAntiDupe)` | A button is placed in a slot |
| `updateItem(BaseInventory, boolean inPlayerInventory, ItemButton)` | The item of a button **already placed** is replaced after the inventory has opened, for example once a player head texture has been loaded |

Both return `true` when the listener displayed the item itself: zMenu then skips its default placement. When `updateItem` is called, the new item is already stored in the button, so read it with `itemButton.getDisplayItem()`. `inPlayerInventory` tells you whether the button is in the player's inventory or in the menu.

```java
public class PacketItemListener implements InventoryListener {

    @Override
    public boolean updateItem(BaseInventory baseInventory, boolean inPlayerInventory, ItemButton itemButton) {
        Player player = baseInventory.getPlayer();
        if (!inPlayerInventory || player == null) return false;

        sendSlotPacket(player, itemButton.getSlot(), itemButton.getDisplayItem());
        return true; // zMenu will not place the item itself
    }
}
```

If you implement `addItem` to display items yourself, implement `updateItem` too, otherwise later updates (such as player heads) are placed by zMenu in the Bukkit inventory.

To change the item stored by an `ItemButton` without displaying it, use `ItemButton#setDisplayItem(ItemStack)`. You are then responsible for showing it. `updateDisplayItem(ItemStack)`, on the other hand, also places the item.

## Item Serialization

`InventoryManager` can turn an `ItemStack` into a Base64 string and back, for example to save it in a database:

```java
InventoryManager manager = menuPlugin.getInventoryManager();

String serialized = manager.serializeItemStack(itemStack);
ItemStack itemStack = manager.deserializeItemStack(serialized);
```

A `null` item is serialized as the string `"null"`, and `deserializeItemStack` returns `null` for `null` or `"null"`. The format depends on the server version (Bukkit object serialization from 1.20.5, NMS NBT before), so a string written on a server older than 1.20.5 cannot be read on 1.20.5+, and the other way around.

## Creating Sound Options

`createSoundOption` builds a `SoundOption`, the object zMenu uses for the `sound` of buttons and actions:

```java
SoundOption sound = manager.createSoundOption("ENTITY_EXPERIENCE_ORB_PICKUP", "MASTER", 1.0f, 1.0f);
if (sound != null) {
    sound.play(player);
}
```

| Signature | Description |
|-----------|-------------|
| `createSoundOption(String soundName, String categoryName, float pitch, float volume)` | Same as the method below with `isCustom` set to `false` |
| `createSoundOption(String soundName, String categoryName, float pitch, float volume, boolean isCustom)` | When `isCustom` is `true`, the sound is played by its raw name, for example a resource-pack sound |

The sound name is resolved through XSound, and the method returns `null` when XSound does not know it. `categoryName` is a sound category (`MASTER`, `MUSIC`, `PLAYERS`, ...), case-insensitive; an unknown category falls back to `MASTER`.

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
