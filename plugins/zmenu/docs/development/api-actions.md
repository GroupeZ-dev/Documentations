---
sidebar_position: 4
title: Custom Actions
description: Creating custom action types for zMenu
---

# Custom Actions

Learn how to create and register custom action types in zMenu.

## Overview

Actions are executed when players interact with buttons. Custom actions allow you to add new behaviors beyond the built-in action types.

## Creating an Action Loader

The `ActionLoader` interface defines how your action is parsed from YAML:

```java
import fr.maxlego08.menu.api.action.Action;
import fr.maxlego08.menu.api.loader.ActionLoader;
import org.bukkit.configuration.file.YamlConfiguration;

public class MyActionLoader implements ActionLoader {

    @Override
    public String getKey() {
        return "my-custom-action"; // The type name used in YAML
    }

    @Override
    public Action load(YamlConfiguration configuration, String path) {
        // Read custom properties from configuration
        String message = configuration.getString(path + ".message", "Default message");
        int times = configuration.getInt(path + ".times", 1);

        return new MyCustomAction(message, times);
    }
}
```

## Creating an Action Implementation

```java
import fr.maxlego08.menu.api.action.Action;
import org.bukkit.entity.Player;

public class MyCustomAction implements Action {

    private final String message;
    private final int times;

    public MyCustomAction(String message, int times) {
        this.message = message;
        this.times = times;
    }

    @Override
    public void execute(Player player) {
        for (int i = 0; i < times; i++) {
            player.sendMessage(message);
        }
    }
}
```

## Registering Your Action

Register your action loader when your plugin enables:

```java
@Override
public void onEnable() {
    MenuPlugin menuPlugin = (MenuPlugin) Bukkit.getPluginManager().getPlugin("zMenu");

    if (menuPlugin != null) {
        // Register using the button manager's action loader registry
        menuPlugin.getButtonManager().registerAction(new MyActionLoader());
        getLogger().info("Registered custom action: my-custom-action");
    }
}
```

## Using Your Custom Action

In your inventory YAML configuration:

```yaml
items:
  my-button:
    slot: 13
    item:
      material: DIAMOND
      name: "&bClick me"
    actions:
      - type: my-custom-action
        message: "&aHello, %player%!"
        times: 3
```

## Complete Example: Particle Action

### ParticleActionLoader.java

```java
package com.example.actions;

import fr.maxlego08.menu.api.action.Action;
import fr.maxlego08.menu.api.loader.ActionLoader;
import org.bukkit.Particle;
import org.bukkit.configuration.file.YamlConfiguration;

public class ParticleActionLoader implements ActionLoader {

    @Override
    public String getKey() {
        return "particle";
    }

    @Override
    public Action load(YamlConfiguration config, String path) {
        String particleName = config.getString(path + ".particle", "HEART");
        int count = config.getInt(path + ".count", 10);
        double offsetX = config.getDouble(path + ".offset-x", 0.5);
        double offsetY = config.getDouble(path + ".offset-y", 0.5);
        double offsetZ = config.getDouble(path + ".offset-z", 0.5);
        double speed = config.getDouble(path + ".speed", 0.1);

        Particle particle;
        try {
            particle = Particle.valueOf(particleName.toUpperCase());
        } catch (IllegalArgumentException e) {
            particle = Particle.HEART;
        }

        return new ParticleAction(particle, count, offsetX, offsetY, offsetZ, speed);
    }
}
```

### ParticleAction.java

```java
package com.example.actions;

import fr.maxlego08.menu.api.action.Action;
import org.bukkit.Location;
import org.bukkit.Particle;
import org.bukkit.entity.Player;

public class ParticleAction implements Action {

    private final Particle particle;
    private final int count;
    private final double offsetX;
    private final double offsetY;
    private final double offsetZ;
    private final double speed;

    public ParticleAction(Particle particle, int count,
                         double offsetX, double offsetY, double offsetZ,
                         double speed) {
        this.particle = particle;
        this.count = count;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.offsetZ = offsetZ;
        this.speed = speed;
    }

    @Override
    public void execute(Player player) {
        Location location = player.getLocation().add(0, 1, 0);
        player.getWorld().spawnParticle(
            particle,
            location,
            count,
            offsetX, offsetY, offsetZ,
            speed
        );
    }
}
```

### Usage in YAML

```yaml
items:
  reward-button:
    slot: 13
    item:
      material: NETHER_STAR
      name: "&6&lClaim Reward"
    actions:
      - type: particle
        particle: VILLAGER_HAPPY
        count: 30
        offset-x: 1.0
        offset-y: 1.0
        offset-z: 1.0
        speed: 0.2
      - type: message
        messages:
          - "&aReward claimed!"
```

## Complete Example: Economy Action

### EconomyActionLoader.java

```java
package com.example.actions;

import fr.maxlego08.menu.api.action.Action;
import fr.maxlego08.menu.api.loader.ActionLoader;
import org.bukkit.configuration.file.YamlConfiguration;

public class EconomyActionLoader implements ActionLoader {

    @Override
    public String getKey() {
        return "custom-economy";
    }

    @Override
    public Action load(YamlConfiguration config, String path) {
        String operation = config.getString(path + ".operation", "give");
        double amount = config.getDouble(path + ".amount", 0);
        String successMessage = config.getString(path + ".success-message", "&aDone!");
        String failMessage = config.getString(path + ".fail-message", "&cFailed!");

        return new EconomyAction(operation, amount, successMessage, failMessage);
    }
}
```

### EconomyAction.java

```java
package com.example.actions;

import fr.maxlego08.menu.api.action.Action;
import net.milkbowl.vault.economy.Economy;
import net.milkbowl.vault.economy.EconomyResponse;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;
import org.bukkit.plugin.RegisteredServiceProvider;

public class EconomyAction implements Action {

    private final String operation;
    private final double amount;
    private final String successMessage;
    private final String failMessage;

    public EconomyAction(String operation, double amount,
                        String successMessage, String failMessage) {
        this.operation = operation;
        this.amount = amount;
        this.successMessage = successMessage;
        this.failMessage = failMessage;
    }

    @Override
    public void execute(Player player) {
        Economy economy = getEconomy();
        if (economy == null) {
            player.sendMessage(ChatColor.RED + "Economy not available!");
            return;
        }

        EconomyResponse response;
        boolean success;

        switch (operation.toLowerCase()) {
            case "give":
            case "deposit":
                response = economy.depositPlayer(player, amount);
                success = response.transactionSuccess();
                break;
            case "take":
            case "withdraw":
                if (economy.has(player, amount)) {
                    response = economy.withdrawPlayer(player, amount);
                    success = response.transactionSuccess();
                } else {
                    success = false;
                }
                break;
            default:
                success = false;
        }

        String message = success ? successMessage : failMessage;
        message = message.replace("%amount%", String.valueOf(amount));
        message = message.replace("%balance%", String.valueOf(economy.getBalance(player)));
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', message));
    }

    private Economy getEconomy() {
        if (Bukkit.getPluginManager().getPlugin("Vault") == null) {
            return null;
        }
        RegisteredServiceProvider<Economy> rsp =
            Bukkit.getServicesManager().getRegistration(Economy.class);
        return rsp != null ? rsp.getProvider() : null;
    }
}
```

### Usage in YAML

```yaml
items:
  daily-reward:
    slot: 13
    item:
      material: GOLD_INGOT
      name: "&6&lDaily Reward"
      lore:
        - "&7Claim $100 daily!"
    actions:
      - type: custom-economy
        operation: give
        amount: 100
        success-message: "&aYou received $%amount%! Balance: $%balance%"
        fail-message: "&cSomething went wrong!"
```

## Complete Example: Permission Check Action

### CheckPermissionActionLoader.java

```java
package com.example.actions;

import fr.maxlego08.menu.api.action.Action;
import fr.maxlego08.menu.api.loader.ActionLoader;
import org.bukkit.configuration.file.YamlConfiguration;

import java.util.List;

public class CheckPermissionActionLoader implements ActionLoader {

    @Override
    public String getKey() {
        return "check-permission";
    }

    @Override
    public Action load(YamlConfiguration config, String path) {
        String permission = config.getString(path + ".permission", "");
        List<String> successCommands = config.getStringList(path + ".success-commands");
        List<String> failCommands = config.getStringList(path + ".fail-commands");

        return new CheckPermissionAction(permission, successCommands, failCommands);
    }
}
```

### CheckPermissionAction.java

```java
package com.example.actions;

import fr.maxlego08.menu.api.action.Action;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;

import java.util.List;

public class CheckPermissionAction implements Action {

    private final String permission;
    private final List<String> successCommands;
    private final List<String> failCommands;

    public CheckPermissionAction(String permission,
                                List<String> successCommands,
                                List<String> failCommands) {
        this.permission = permission;
        this.successCommands = successCommands;
        this.failCommands = failCommands;
    }

    @Override
    public void execute(Player player) {
        List<String> commands = player.hasPermission(permission)
            ? successCommands
            : failCommands;

        for (String command : commands) {
            String parsedCommand = command.replace("%player%", player.getName());
            Bukkit.dispatchCommand(Bukkit.getConsoleSender(), parsedCommand);
        }
    }
}
```

### Usage in YAML

```yaml
items:
  vip-reward:
    slot: 13
    item:
      material: DIAMOND
      name: "&b&lVIP Reward"
    actions:
      - type: check-permission
        permission: "server.vip"
        success-commands:
          - "give %player% diamond 5"
          - "msg %player% &aHere are your VIP diamonds!"
        fail-commands:
          - "msg %player% &cYou need VIP to claim this!"
```

## Action with Placeholder Support

To support placeholders in your action:

```java
import fr.maxlego08.menu.api.utils.Placeholders;

@Override
public void execute(Player player) {
    // Parse placeholders before using the message
    String parsedMessage = Placeholders.parse(player, this.message);
    player.sendMessage(ChatColor.translateAlternateColorCodes('&', parsedMessage));
}
```

## Best Practices

1. **Use clear action names** - Descriptive and unique identifiers
2. **Validate input** - Handle missing or invalid configuration
3. **Provide defaults** - Use sensible default values
4. **Support placeholders** - Parse placeholders where appropriate
5. **Handle errors gracefully** - Don't crash on invalid input
6. **Document configuration** - Explain all options in your docs

## Next Steps

- Work with [Player Data](./api-player-data)
- Listen to [Events](./api-events)
- Review the [API Introduction](./api-introduction)
