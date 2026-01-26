---
sidebar_position: 8
title: MenuItemStack
description: Creating and manipulating dynamic items with MenuItemStack
---

# MenuItemStack

Learn how to use `MenuItemStack` to create dynamic, placeholder-aware items in zMenu.

## Overview

`MenuItemStack` is an abstraction over Bukkit's `ItemStack` that provides:
- Placeholder support in names, lores, and other properties
- Dynamic item building based on player context
- Easy manipulation of item properties
- Support for custom model data, enchantments, and more

## Getting MenuItemStack

### From Button Configuration

In custom buttons, retrieve the configured item:

```java
public class MyButton extends Button {

    @Override
    public ItemStack getCustomItemStack(Player player) {
        // Get the MenuItemStack from YAML configuration
        MenuItemStack menuItemStack = this.getItemStack();

        // Build and return the ItemStack
        return menuItemStack.build(player);
    }
}
```

### From InventoryManager

Load a MenuItemStack from configuration:

```java
InventoryManager manager = menuPlugin.getInventoryManager();
MenuItemStack itemStack = manager.loadItemStack(configuration, "path.to.item");
```

## Building ItemStacks

### Basic Build

```java
MenuItemStack menuItemStack = getItemStack();

// Simple build with placeholder parsing
ItemStack item = menuItemStack.build(player);
```

### Build with Cache Control

```java
// Build without caching (always fresh)
ItemStack item = menuItemStack.build(player, false);

// Build with caching (reuses cached result when possible)
ItemStack itemCached = menuItemStack.build(player, true);
```

### Build with Custom Placeholders

```java
import fr.maxlego08.menu.api.utils.Placeholders;

MenuItemStack menuItemStack = getItemStack();
Placeholders placeholders = new Placeholders();

// Register custom placeholders
placeholders.register("price", "1000");
placeholders.register("currency", "coins");
placeholders.register("stock", "42");

// Build with custom placeholders
ItemStack item = menuItemStack.build(player, false, placeholders);
```

## Custom Placeholders

### Creating Placeholders

```java
Placeholders placeholders = new Placeholders();

// String values
placeholders.register("player_name", player.getName());
placeholders.register("server_name", "MySever");

// Numeric values (converted to string)
placeholders.register("balance", String.valueOf(economy.getBalance(player)));
placeholders.register("level", String.valueOf(player.getLevel()));

// Boolean states
placeholders.register("is_premium", player.hasPermission("premium") ? "Yes" : "No");

// Formatted values
placeholders.register("health", String.format("%.1f", player.getHealth()));
```

### Using in YAML

```yaml
item:
  material: DIAMOND
  name: "&6Purchase for %price% %currency%"
  lore:
    - "&7Stock remaining: &e%stock%"
    - "&7Seller: &b%seller_name%"
    - ""
    - "&aClick to buy!"
```

## Complete Example: Dynamic Shop Item

### SellBuyButton.java

```java
package com.example.shop.buttons;

import fr.maxlego08.menu.api.MenuItemStack;
import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.engine.InventoryEngine;
import fr.maxlego08.menu.api.utils.Placeholders;
import com.example.shop.ShopPlugin;
import com.example.shop.ShopItem;
import org.bukkit.entity.Player;
import org.bukkit.event.inventory.InventoryClickEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.plugin.Plugin;

import java.math.BigDecimal;

public class SellBuyButton extends Button {

    private final ShopPlugin plugin;

    public SellBuyButton(Plugin plugin) {
        this.plugin = (ShopPlugin) plugin;
    }

    @Override
    public ItemStack getCustomItemStack(Player player) {
        // Get the MenuItemStack from configuration
        MenuItemStack menuItemStack = this.getItemStack();

        // Get data from player cache
        var cache = plugin.getCacheManager().getCache(player);
        ShopItem shopItem = cache.get("current_item");
        BigDecimal price = cache.get("price", BigDecimal.ZERO);

        // Create placeholders
        Placeholders placeholders = new Placeholders();
        placeholders.register("price", plugin.getEconomyManager().format(price));
        placeholders.register("item_name", shopItem.getName());
        placeholders.register("quantity", String.valueOf(shopItem.getQuantity()));

        // Check affordability and add status
        boolean canAfford = plugin.getEconomyManager().has(player, price);
        placeholders.register("status", canAfford ? "&aYou can afford this!" : "&cNot enough money!");

        // Build and return
        return menuItemStack.build(player, false, placeholders);
    }

    @Override
    public void onClick(Player player, InventoryClickEvent event,
                       InventoryEngine inventory, int slot, Placeholders placeholders) {
        super.onClick(player, event, inventory, slot, placeholders);

        var cache = plugin.getCacheManager().getCache(player);
        ShopItem shopItem = cache.get("current_item");
        BigDecimal price = cache.get("price", BigDecimal.ZERO);

        if (plugin.getEconomyManager().withdraw(player, price)) {
            shopItem.give(player);
            player.sendMessage("§aPurchase successful!");
            player.closeInventory();
        } else {
            player.sendMessage("§cYou don't have enough money!");
        }
    }
}
```

### YAML Configuration

```yaml
items:
  buy-button:
    type: MY_SELL_BUY
    slot: 22
    item:
      material: EMERALD
      name: "&a&lConfirm Purchase"
      lore:
        - "&7Item: &f%item_name%"
        - "&7Quantity: &e%quantity%"
        - "&7Price: &6%price%"
        - ""
        - "%status%"
        - ""
        - "&eClick to purchase!"
```

## Complete Example: Sort Button with States

### SortButton.java

```java
package com.example.sort.buttons;

import fr.maxlego08.menu.api.MenuItemStack;
import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.engine.InventoryEngine;
import fr.maxlego08.menu.api.utils.Placeholders;
import com.example.sort.SortPlugin;
import com.example.sort.SortType;
import org.bukkit.entity.Player;
import org.bukkit.event.inventory.InventoryClickEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.plugin.Plugin;

import java.util.List;

public class SortButton extends Button {

    private final SortPlugin plugin;
    private final String enableText;
    private final String disableText;
    private final MenuItemStack loadingItemStack;
    private final List<SortType> sortTypes;

    public SortButton(Plugin plugin, String enableText, String disableText,
                     MenuItemStack loadingItemStack, List<SortType> sortTypes) {
        this.plugin = (SortPlugin) plugin;
        this.enableText = enableText;
        this.disableText = disableText;
        this.loadingItemStack = loadingItemStack;
        this.sortTypes = sortTypes;
    }

    @Override
    public boolean isPermanent() {
        return true;
    }

    @Override
    public ItemStack getCustomItemStack(Player player) {
        var cache = plugin.getCacheManager().getCache(player);
        SortType currentSort = cache.get("current_sort", SortType.DATE_DESC);

        MenuItemStack itemStack = this.getItemStack();
        Placeholders placeholders = new Placeholders();

        // Register state for each sort type
        for (SortType sortType : sortTypes) {
            String state = (sortType == currentSort) ? enableText : disableText;
            String displayName = state.replace("%sorting%", sortType.getDisplayName());
            placeholders.register(sortType.name(), displayName);
        }

        return itemStack.build(player, false, placeholders);
    }

    @Override
    public void onClick(Player player, InventoryClickEvent event,
                       InventoryEngine inventory, int slot, Placeholders placeholders) {
        super.onClick(player, event, inventory, slot, placeholders);

        var cache = plugin.getCacheManager().getCache(player);
        SortType currentSort = cache.get("current_sort", SortType.DATE_DESC);

        // Show loading state
        for (Integer buttonSlot : getSlots()) {
            inventory.getSpigotInventory().setItem(buttonSlot, loadingItemStack.build(player));
        }

        // Calculate next sort type
        int currentIndex = sortTypes.indexOf(currentSort);
        int direction = event.isRightClick() ? -1 : 1;
        int nextIndex = (currentIndex + direction + sortTypes.size()) % sortTypes.size();
        SortType nextSort = sortTypes.get(nextIndex);

        // Update cache and refresh
        cache.set("current_sort", nextSort);

        plugin.getScheduler().runAsync(task -> {
            // Perform async sorting
            plugin.getSortManager().sortItems(player, nextSort);

            // Update inventory on main thread
            plugin.getScheduler().runNextTick(w -> {
                inventory.updateInventory();
            });
        });
    }
}
```

### YAML Configuration

```yaml
items:
  sort-button:
    type: MY_SORT_BUTTON
    slot: 49
    is-permanent: true
    item:
      material: HOPPER
      name: "&e&lSort Items"
      lore:
        - "&7Current sorting options:"
        - ""
        - " %DATE_DESC%"
        - " %DATE_ASC%"
        - " %PRICE_DESC%"
        - " %PRICE_ASC%"
        - " %NAME_ASC%"
        - ""
        - "&eLeft-click &7for next"
        - "&eRight-click &7for previous"
```

## Complete Example: Toggle Button

### ToggleButton.java

```java
package com.example.settings.buttons;

import fr.maxlego08.menu.api.MenuItemStack;
import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.engine.InventoryEngine;
import fr.maxlego08.menu.api.utils.Placeholders;
import org.bukkit.entity.Player;
import org.bukkit.event.inventory.InventoryClickEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.plugin.Plugin;

public class ToggleButton extends Button {

    private final Plugin plugin;
    private final String settingKey;
    private final MenuItemStack enabledItem;
    private final MenuItemStack disabledItem;

    public ToggleButton(Plugin plugin, String settingKey,
                       MenuItemStack enabledItem, MenuItemStack disabledItem) {
        this.plugin = plugin;
        this.settingKey = settingKey;
        this.enabledItem = enabledItem;
        this.disabledItem = disabledItem;
    }

    @Override
    public ItemStack getCustomItemStack(Player player) {
        boolean isEnabled = getSettingValue(player);

        // Use different MenuItemStack based on state
        MenuItemStack itemStack = isEnabled ? enabledItem : disabledItem;

        Placeholders placeholders = new Placeholders();
        placeholders.register("status", isEnabled ? "&aEnabled" : "&cDisabled");
        placeholders.register("action", isEnabled ? "disable" : "enable");

        return itemStack.build(player, false, placeholders);
    }

    @Override
    public void onClick(Player player, InventoryClickEvent event,
                       InventoryEngine inventory, int slot, Placeholders placeholders) {
        super.onClick(player, event, inventory, slot, placeholders);

        // Toggle the setting
        boolean currentValue = getSettingValue(player);
        setSettingValue(player, !currentValue);

        // Refresh inventory
        inventory.updateInventory();

        // Notify player
        String newStatus = !currentValue ? "enabled" : "disabled";
        player.sendMessage("§aSetting " + settingKey + " " + newStatus + "!");
    }

    private boolean getSettingValue(Player player) {
        // Implementation depends on your storage system
        return plugin.getConfig().getBoolean("players." + player.getUniqueId() + "." + settingKey, false);
    }

    private void setSettingValue(Player player, boolean value) {
        plugin.getConfig().set("players." + player.getUniqueId() + "." + settingKey, value);
        plugin.saveConfig();
    }
}
```

## Loading MenuItemStack from Configuration

### Custom ButtonLoader

```java
package com.example.loader;

import fr.maxlego08.menu.api.MenuItemStack;
import fr.maxlego08.menu.api.InventoryManager;
import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.loader.ButtonLoader;
import com.example.buttons.ToggleButton;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.plugin.Plugin;

public class ToggleButtonLoader implements ButtonLoader {

    private final Plugin plugin;
    private final InventoryManager inventoryManager;

    public ToggleButtonLoader(Plugin plugin, InventoryManager inventoryManager) {
        this.plugin = plugin;
        this.inventoryManager = inventoryManager;
    }

    @Override
    public String getName() {
        return "MY_TOGGLE";
    }

    @Override
    public Button load(YamlConfiguration config, String path, Plugin plugin) {
        // Load basic properties
        String settingKey = config.getString(path + ".setting-key", "default");

        // Load MenuItemStack for enabled state
        MenuItemStack enabledItem = inventoryManager.loadItemStack(config, path + ".enabled-item");

        // Load MenuItemStack for disabled state
        MenuItemStack disabledItem = inventoryManager.loadItemStack(config, path + ".disabled-item");

        return new ToggleButton(this.plugin, settingKey, enabledItem, disabledItem);
    }
}
```

### YAML Configuration

```yaml
items:
  notifications-toggle:
    type: MY_TOGGLE
    slot: 11
    setting-key: "notifications"
    enabled-item:
      material: LIME_DYE
      name: "&a&lNotifications: %status%"
      lore:
        - "&7You will receive notifications"
        - ""
        - "&eClick to %action%"
    disabled-item:
      material: GRAY_DYE
      name: "&c&lNotifications: %status%"
      lore:
        - "&7Notifications are turned off"
        - ""
        - "&eClick to %action%"
```

## MenuItemStack Properties

Properties available in YAML configuration:

```yaml
item:
  # Material
  material: DIAMOND_SWORD

  # Display name
  name: "&6&lLegendary Sword"

  # Lore lines
  lore:
    - "&7A powerful weapon"
    - "&7Damage: &c+50"

  # Amount
  amount: 1

  # Custom model data (1.14+)
  modelId: 12345

  # Durability/damage
  durability: 0

  # Enchantments
  enchants:
    - SHARPNESS,5
    - UNBREAKING,3

  # Item flags
  flags:
    - HIDE_ENCHANTS
    - HIDE_ATTRIBUTES

  # Glow effect (without enchant text)
  glow: true

  # Player head
  playerHead: "%player%"
  # Or custom URL
  url: "eyJ0ZXh0dXJlcyI6..."

  # Potion
  potion: SPEED
  potionExtended: true
  potionUpgraded: false

  # Leather armor color
  color: "#FF5555"

  # Banner patterns
  banner:
    - RED,STRIPE_TOP
    - BLUE,CROSS
```

## Best Practices

1. **Use placeholders** - Leverage the placeholder system for dynamic content
2. **Cache when possible** - Use `build(player, true)` for static items
3. **Create reusable placeholders** - Build a helper class for common placeholders
4. **Handle null values** - Always provide defaults for placeholder values
5. **Keep lore concise** - Long lores can cause display issues
6. **Test with PlaceholderAPI** - Ensure PAPI placeholders work correctly

## Next Steps

- Create [Custom Buttons](./api-buttons) using MenuItemStack
- Create [Paginated Buttons](./api-paginate-button) with dynamic items
- Work with [Player Data](./api-player-data) for persistent values
