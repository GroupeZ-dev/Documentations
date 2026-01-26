---
sidebar_position: 7
title: Paginate Button
description: Creating paginated button lists in zMenu
---

# Paginate Button

Learn how to create buttons that display paginated lists of items using the `PaginateButton` class.

## Overview

`PaginateButton` is an abstract class that simplifies the creation of buttons displaying paginated content. It automatically handles:
- Slot distribution across multiple slots
- Page calculation based on available slots
- Navigation between pages with PREVIOUS/NEXT buttons

## Basic Structure

```java
import fr.maxlego08.menu.api.button.PaginateButton;
import fr.maxlego08.menu.api.engine.InventoryEngine;
import org.bukkit.entity.Player;
import org.bukkit.plugin.Plugin;

public class MyPaginatedButton extends PaginateButton {

    private final MyPlugin plugin;

    public MyPaginatedButton(Plugin plugin) {
        this.plugin = (MyPlugin) plugin;
    }

    @Override
    public void onRender(Player player, InventoryEngine inventoryEngine) {
        // Get your list of items
        List<MyItem> items = getItems(player);

        // Use the paginate helper method
        paginate(items, inventoryEngine, (slot, item) -> {
            // Create the ItemStack for display
            ItemStack itemStack = createDisplayItem(item);

            // Add item to the inventory with click handler
            inventoryEngine.addItem(slot, itemStack)
                .setClick(event -> handleClick(player, item, event));
        });
    }

    @Override
    public int getPaginationSize(Player player) {
        // Return the total number of items to paginate
        return getItems(player).size();
    }

    private List<MyItem> getItems(Player player) {
        return plugin.getItemManager().getItems(player);
    }

    private ItemStack createDisplayItem(MyItem item) {
        // Create and return the display ItemStack
        return item.toItemStack();
    }

    private void handleClick(Player player, MyItem item, InventoryClickEvent event) {
        // Handle the click event
        player.sendMessage("You clicked on: " + item.getName());
    }
}
```

## Key Methods

### `onRender(Player, InventoryEngine)`

Called when the inventory is rendered. Use this to populate items.

```java
@Override
public void onRender(Player player, InventoryEngine inventoryEngine) {
    List<MyItem> items = getMyItems(player);

    paginate(items, inventoryEngine, (slot, item) -> {
        ItemStack display = item.toItemStack();
        inventoryEngine.addItem(slot, display)
            .setClick(event -> processClick(player, item, event));
    });
}
```

### `getPaginationSize(Player)`

Returns the total number of items for pagination calculations.

```java
@Override
public int getPaginationSize(Player player) {
    return getMyItems(player).size();
}
```

### `paginate(List, InventoryEngine, BiConsumer)`

Helper method that distributes items across available slots for the current page.

```java
paginate(items, inventoryEngine, (slot, item) -> {
    // slot: the inventory slot to use
    // item: the current item from your list
});
```

### `getSlots()`

Returns the list of slots configured for this button (from YAML configuration).

```java
List<Integer> availableSlots = getSlots();
```

## Registering the Button

Use `NoneLoader` to register a paginate button:

```java
@Override
public void onEnable() {
    MenuPlugin menuPlugin = (MenuPlugin) Bukkit.getPluginManager().getPlugin("zMenu");

    if (menuPlugin != null) {
        ButtonManager buttonManager = menuPlugin.getButtonManager();

        // Register with NoneLoader for buttons with only a Plugin constructor
        buttonManager.register(new NoneLoader(this, MyPaginatedButton.class, "MY_PAGINATED_BUTTON"));
    }
}
```

## YAML Configuration

```yaml
name: "&6My Paginated Menu (%page%/%max-page%)"
size: 54

items:
  myItems:
    type: MY_PAGINATED_BUTTON
    slots:
      - 10-16
      - 19-25
      - 28-34
      - 37-43
    # Optional: Display when no items
    else:
      slots:
        - 22
      item:
        material: BARRIER
        name: "&cNo items found"
        lore:
          - "&7There are no items to display."

  # Navigation buttons
  previous:
    type: PREVIOUS
    is-permanent: true
    slot: 48
    item:
      material: ARROW
      name: "&ePrevious Page"
      lore:
        - "&7Go to page %page-1%"

  next:
    type: NEXT
    is-permanent: true
    slot: 50
    item:
      material: ARROW
      name: "&eNext Page"
      lore:
        - "&7Go to page %page+1%"
```

## Complete Example: Shop Items Button

### ShopItemsButton.java

```java
package com.example.shop.buttons;

import fr.maxlego08.menu.api.button.PaginateButton;
import fr.maxlego08.menu.api.engine.InventoryEngine;
import fr.maxlego08.menu.api.utils.Placeholders;
import com.example.shop.ShopPlugin;
import com.example.shop.ShopItem;
import org.bukkit.entity.Player;
import org.bukkit.event.inventory.ClickType;
import org.bukkit.event.inventory.InventoryClickEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.ItemMeta;
import org.bukkit.plugin.Plugin;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class ShopItemsButton extends PaginateButton {

    private final ShopPlugin plugin;

    public ShopItemsButton(Plugin plugin) {
        this.plugin = (ShopPlugin) plugin;
    }

    @Override
    public void onRender(Player player, InventoryEngine inventoryEngine) {
        List<ShopItem> items = plugin.getShopManager().getAvailableItems(player);

        paginate(items, inventoryEngine, (slot, shopItem) -> {
            ItemStack display = createShopDisplay(player, shopItem);
            inventoryEngine.addItem(slot, display)
                .setClick(createClickHandler(player, inventoryEngine, shopItem));
        });
    }

    @Override
    public int getPaginationSize(Player player) {
        return plugin.getShopManager().getAvailableItems(player).size();
    }

    private ItemStack createShopDisplay(Player player, ShopItem shopItem) {
        ItemStack item = shopItem.getItem().clone();
        ItemMeta meta = item.getItemMeta();

        if (meta != null) {
            // Add price to lore
            List<String> lore = meta.hasLore() ? new ArrayList<>(meta.getLore()) : new ArrayList<>();
            lore.add("");
            lore.add("§7Price: §e" + shopItem.getFormattedPrice());
            lore.add("");
            lore.add("§eLeft-click §7to buy x1");
            lore.add("§eRight-click §7to buy x64");
            lore.add("§eShift+click §7to sell");
            meta.setLore(lore);
            item.setItemMeta(meta);
        }

        return item;
    }

    private Consumer<InventoryClickEvent> createClickHandler(
            Player player,
            InventoryEngine inventoryEngine,
            ShopItem shopItem) {

        return event -> {
            ClickType click = event.getClick();

            if (click == ClickType.LEFT) {
                // Buy 1
                plugin.getShopManager().buyItem(player, shopItem, 1);
            } else if (click == ClickType.RIGHT) {
                // Buy 64
                plugin.getShopManager().buyItem(player, shopItem, 64);
            } else if (click.isShiftClick()) {
                // Sell
                plugin.getShopManager().sellItem(player, shopItem);
            }

            // Refresh inventory to update displays
            inventoryEngine.updateInventory();
        };
    }
}
```

## Complete Example: Player List Button

### OnlinePlayersButton.java

```java
package com.example.admin.buttons;

import fr.maxlego08.menu.api.button.PaginateButton;
import fr.maxlego08.menu.api.engine.InventoryEngine;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.entity.Player;
import org.bukkit.event.inventory.InventoryClickEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.SkullMeta;
import org.bukkit.plugin.Plugin;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

public class OnlinePlayersButton extends PaginateButton {

    private final Plugin plugin;

    public OnlinePlayersButton(Plugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public void onRender(Player player, InventoryEngine inventoryEngine) {
        List<Player> onlinePlayers = new ArrayList<>(Bukkit.getOnlinePlayers());

        // Remove the viewer from the list
        onlinePlayers.remove(player);

        paginate(onlinePlayers, inventoryEngine, (slot, targetPlayer) -> {
            ItemStack head = createPlayerHead(targetPlayer);
            inventoryEngine.addItem(slot, head)
                .setClick(createClickHandler(player, targetPlayer));
        });
    }

    @Override
    public int getPaginationSize(Player player) {
        // Subtract 1 because we remove the viewing player
        return Math.max(0, Bukkit.getOnlinePlayers().size() - 1);
    }

    private ItemStack createPlayerHead(Player targetPlayer) {
        ItemStack head = new ItemStack(Material.PLAYER_HEAD);
        SkullMeta meta = (SkullMeta) head.getItemMeta();

        if (meta != null) {
            meta.setOwningPlayer(targetPlayer);
            meta.setDisplayName("§e" + targetPlayer.getName());
            meta.setLore(Arrays.asList(
                "§7World: §f" + targetPlayer.getWorld().getName(),
                "§7Health: §c" + (int) targetPlayer.getHealth() + "§7/§c20",
                "",
                "§aLeft-click §7to teleport",
                "§cRight-click §7to kick"
            ));
            head.setItemMeta(meta);
        }

        return head;
    }

    private Consumer<InventoryClickEvent> createClickHandler(Player admin, Player target) {
        return event -> {
            if (event.isLeftClick()) {
                admin.closeInventory();
                admin.teleport(target.getLocation());
                admin.sendMessage("§aTeleported to " + target.getName());
            } else if (event.isRightClick()) {
                if (admin.hasPermission("admin.kick")) {
                    target.kickPlayer("Kicked by " + admin.getName());
                    admin.sendMessage("§cKicked " + target.getName());
                }
            }
        };
    }
}
```

## Advanced: Real-time Updates

Update pagination items in real-time when data changes:

```java
public class LiveItemsButton extends PaginateButton {

    private final MyPlugin plugin;

    public LiveItemsButton(Plugin plugin) {
        this.plugin = (MyPlugin) plugin;
    }

    @Override
    public void onRender(Player player, InventoryEngine inventoryEngine) {
        List<MyItem> items = plugin.getItemManager().getItems(player);

        paginate(items, inventoryEngine, (slot, item) -> {
            ItemStack display = item.toItemStack();
            inventoryEngine.addItem(slot, display)
                .setClick(createClick(player, inventoryEngine, slot, item, display));
        });
    }

    @Override
    public int getPaginationSize(Player player) {
        return plugin.getItemManager().getItems(player).size();
    }

    private Consumer<InventoryClickEvent> createClick(
            Player player,
            InventoryEngine inventoryEngine,
            int slot,
            MyItem item,
            ItemStack itemStack) {

        return event -> {
            // Process the click
            boolean success = processItemClick(player, item, event);

            if (success) {
                // Update this specific slot
                updateSlot(player, inventoryEngine, slot, item);
            }
        };
    }

    /**
     * Update a specific slot in the inventory without full refresh
     */
    private void updateSlot(Player player, InventoryEngine inventoryEngine, int slot, MyItem item) {
        ItemStack newDisplay = item.toItemStack();
        inventoryEngine.getSpigotInventory().setItem(slot, newDisplay);
    }

    /**
     * Called from external events to update all open inventories
     */
    public void updateAllInventories(MyItem changedItem, boolean wasAdded) {
        for (Player onlinePlayer : Bukkit.getOnlinePlayers()) {
            var holder = onlinePlayer.getOpenInventory().getTopInventory().getHolder();

            if (holder instanceof InventoryEngine inventoryEngine) {
                var buttons = inventoryEngine.getMenuInventory()
                    .getButtons(LiveItemsButton.class);

                if (!buttons.isEmpty()) {
                    // Trigger a refresh
                    inventoryEngine.updateInventory();
                }
            }
        }
    }
}
```

## Handling Empty States

Display a fallback item when no items exist:

```yaml
items:
  myItems:
    type: MY_PAGINATED_BUTTON
    slots:
      - 10-16
      - 19-25
    else:
      slots:
        - 13  # Center slot
      item:
        material: STRUCTURE_VOID
        name: "&c&lNo Items"
        lore:
          - "&7You don't have any items yet."
          - ""
          - "&eClick here to get started!"
        actions:
          - type: message
            messages:
              - "&aVisit the shop to purchase items!"
```

## Best Practices

1. **Return accurate size** - `getPaginationSize()` must return the exact count
2. **Handle empty lists** - Use the `else` configuration for empty states
3. **Use click consumers** - Set click handlers via `setClick()` for proper event handling
4. **Cache expensive calculations** - Don't recalculate lists in every render
5. **Update efficiently** - Use `updateInventory()` instead of reopening
6. **Test pagination** - Verify navigation works with various item counts

## Next Steps

- Learn about [MenuItemStack](./api-menu-item-stack) for dynamic item creation
- Create [Custom Actions](./api-actions) for button clicks
- Work with [Player Data](./api-player-data) for persistent storage
