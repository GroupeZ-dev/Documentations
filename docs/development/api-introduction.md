---
sidebar_position: 1
title: API Introduction
description: Getting started with the zMenu API
---

# API Introduction

zMenu provides a comprehensive API for developers to integrate with and extend the plugin's functionality. This guide will help you get started with the zMenu API.

## Maven Repository

Add the GroupeZ repository to your `pom.xml`:

```xml
<repositories>
    <repository>
        <id>groupez</id>
        <url>https://repo.groupez.dev/releases</url>
    </repository>
</repositories>
```

## Maven Dependency

Add the zMenu API as a dependency:

```xml
<dependencies>
    <dependency>
        <groupId>fr.maxlego08.menu</groupId>
        <artifactId>zmenu-api</artifactId>
        <version>1.1.0.0</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

## Gradle

For Gradle users:

```groovy
repositories {
    maven { url 'https://repo.groupez.dev/releases' }
}

dependencies {
    compileOnly 'fr.maxlego08.menu:zmenu-api:1.1.0.0'
}
```

### Kotlin DSL

```kotlin
repositories {
    maven("https://repo.groupez.dev/releases")
}

dependencies {
    compileOnly("fr.maxlego08.menu:zmenu-api:1.1.0.0")
}
```

## Plugin Dependency

Add zMenu as a dependency in your `plugin.yml`:

```yaml
# Hard dependency (plugin won't load without zMenu)
depend: [zMenu]

# Soft dependency (plugin will load even without zMenu)
softdepend: [zMenu]
```

## Getting the API

### Access the Plugin Instance

```java
import fr.maxlego08.menu.api.MenuPlugin;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private MenuPlugin menuPlugin;

    @Override
    public void onEnable() {
        // Get zMenu instance
        this.menuPlugin = (MenuPlugin) Bukkit.getPluginManager().getPlugin("zMenu");

        if (this.menuPlugin == null) {
            getLogger().severe("zMenu not found! Disabling plugin...");
            Bukkit.getPluginManager().disablePlugin(this);
            return;
        }

        getLogger().info("Successfully hooked into zMenu!");
    }

    public MenuPlugin getMenuPlugin() {
        return this.menuPlugin;
    }
}
```

### Safe Hook with Soft Dependency

```java
import fr.maxlego08.menu.api.MenuPlugin;
import org.bukkit.Bukkit;
import org.bukkit.plugin.Plugin;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private MenuPlugin menuPlugin;
    private boolean zMenuEnabled = false;

    @Override
    public void onEnable() {
        // Try to hook into zMenu
        hookZMenu();

        if (zMenuEnabled) {
            getLogger().info("zMenu integration enabled!");
            // Register zMenu-specific features
        } else {
            getLogger().info("zMenu not found, running without integration.");
        }
    }

    private void hookZMenu() {
        Plugin plugin = Bukkit.getPluginManager().getPlugin("zMenu");
        if (plugin != null && plugin.isEnabled()) {
            this.menuPlugin = (MenuPlugin) plugin;
            this.zMenuEnabled = true;
        }
    }

    public boolean isZMenuEnabled() {
        return this.zMenuEnabled;
    }

    public MenuPlugin getMenuPlugin() {
        return this.menuPlugin;
    }
}
```

## Core Interfaces

The zMenu API provides several core interfaces:

### MenuPlugin

The main plugin interface providing access to all managers:

```java
MenuPlugin menuPlugin = ...;

// Inventory management
InventoryManager inventoryManager = menuPlugin.getInventoryManager();

// Button type registration
ButtonManager buttonManager = menuPlugin.getButtonManager();

// Command management
CommandManager commandManager = menuPlugin.getCommandManager();

// Player data management
DataManager dataManager = menuPlugin.getDataManager();
```

### Key Managers

| Manager | Purpose |
|---------|---------|
| `InventoryManager` | Load, manage, and open inventories |
| `ButtonManager` | Register custom button types |
| `CommandManager` | Register custom commands |
| `DataManager` | Access player data storage |

## API Structure

```
fr.maxlego08.menu.api
├── MenuPlugin              # Main plugin interface
├── InventoryManager        # Inventory operations
├── ButtonManager           # Button registration
├── CommandManager          # Command handling
├── DataManager             # Player data access
├── button/
│   ├── Button              # Button interface
│   └── ButtonLoader        # Button loading
├── action/
│   ├── Action              # Action interface
│   └── ActionLoader        # Action loading
├── requirement/
│   ├── Requirement         # Requirement interface
│   └── Permissible         # Permission checking
└── event/
    ├── ButtonLoadEvent
    ├── InventoryLoadEvent
    └── PlayerOpenInventoryEvent
```

## Best Practices

1. **Always check for null** when getting the zMenu plugin instance
2. **Use soft dependencies** if your plugin can function without zMenu
3. **Don't store manager references** - get them fresh when needed
4. **Handle exceptions** gracefully when working with inventories
5. **Test thoroughly** with different zMenu versions

## Complete Example Plugin

```java
package com.example.myplugin;

import fr.maxlego08.menu.api.MenuPlugin;
import fr.maxlego08.menu.api.InventoryManager;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private MenuPlugin menuPlugin;

    @Override
    public void onEnable() {
        // Hook into zMenu
        this.menuPlugin = (MenuPlugin) Bukkit.getPluginManager().getPlugin("zMenu");

        if (this.menuPlugin == null) {
            getLogger().severe("zMenu is required!");
            Bukkit.getPluginManager().disablePlugin(this);
            return;
        }

        getLogger().info("MyPlugin enabled with zMenu integration!");
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

        // Open a zMenu inventory
        manager.getInventory("my-menu").ifPresent(inv -> {
            manager.openInventory(player, inv);
        });

        return true;
    }
}
```

## Next Steps

- Learn how to [Open Inventories](./api-inventory) programmatically
- Create [Custom Buttons](./api-buttons)
- Create [Custom Actions](./api-actions)
- Work with [Player Data](./api-player-data)
- Listen to [Events](./api-events)

## Support

For API support:
- **Discord**: [https://discord.groupez.dev](https://discord.groupez.dev)
- **GitHub Issues**: [https://github.com/Maxlego08/zMenu/issues](https://github.com/Maxlego08/zMenu/issues)
