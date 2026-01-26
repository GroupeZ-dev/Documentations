---
sidebar_position: 2
title: Custom Economy
description: Create custom economy implementations for zAuctionHouse
---

# Custom Economy

Create your own economy system for zAuctionHouse by implementing the `AuctionEconomy` interface.

## Interface Overview

```java
import fr.maxlego08.zauctionhouse.api.economy.AuctionEconomy;
import org.bukkit.OfflinePlayer;

public class MyCustomEconomy implements AuctionEconomy {

    @Override
    public String getName() {
        return "custom";
    }

    @Override
    public String getDisplayName() {
        return "Custom Currency";
    }

    @Override
    public boolean hasMoney(OfflinePlayer player, long amount) {
        // Check if player has enough currency
        return getBalance(player) >= amount;
    }

    @Override
    public void depositMoney(OfflinePlayer player, long amount) {
        // Add currency to player's balance
    }

    @Override
    public void withdrawMoney(OfflinePlayer player, long amount) {
        // Remove currency from player's balance
    }

    @Override
    public long getBalance(OfflinePlayer player) {
        // Return player's current balance
        return 0;
    }

    @Override
    public String format(long amount) {
        // Format the amount for display
        return amount + " Custom";
    }
}
```

## Required Methods

| Method | Description |
|--------|-------------|
| `getName()` | Internal economy identifier (lowercase, no spaces) |
| `getDisplayName()` | Display name shown to players |
| `hasMoney(player, amount)` | Check if player has sufficient funds |
| `depositMoney(player, amount)` | Add currency to player |
| `withdrawMoney(player, amount)` | Remove currency from player |
| `getBalance(player)` | Get player's current balance |
| `format(amount)` | Format amount for display |

## Registering Your Economy

Register your economy when zAuctionHouse loads:

```java
import fr.maxlego08.zauctionhouse.api.AuctionPlugin;
import org.bukkit.Bukkit;
import org.bukkit.plugin.RegisteredServiceProvider;

public class MyPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        // Wait for zAuctionHouse to be available
        if (Bukkit.getPluginManager().getPlugin("zAuctionHouseV3") != null) {
            registerEconomy();
        }
    }

    private void registerEconomy() {
        RegisteredServiceProvider<AuctionPlugin> provider =
            Bukkit.getServicesManager().getRegistration(AuctionPlugin.class);

        if (provider != null) {
            AuctionPlugin auctionPlugin = provider.getProvider();
            auctionPlugin.getEconomyManager().registerEconomy(new MyCustomEconomy());
            getLogger().info("Custom economy registered with zAuctionHouse!");
        }
    }
}
```

## Configuration

After registering your economy, add it to `economies.yml`:

```yaml
economies:
  custom:
    name: "Custom Currency"
    type: CUSTOM
    economyName: "custom"    # Must match getName()
    currency: "%price% Custom"
    format: "c"
    isEnable: true
    denyMessage: "&cYou don't have enough custom currency!"
```

## Complete Example

Here's a complete example using a simple file-based storage:

```java
import fr.maxlego08.zauctionhouse.api.economy.AuctionEconomy;
import org.bukkit.OfflinePlayer;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.plugin.java.JavaPlugin;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class TokenEconomy implements AuctionEconomy {

    private final JavaPlugin plugin;
    private final Map<UUID, Long> balances = new HashMap<>();
    private final File dataFile;

    public TokenEconomy(JavaPlugin plugin) {
        this.plugin = plugin;
        this.dataFile = new File(plugin.getDataFolder(), "tokens.yml");
        loadData();
    }

    @Override
    public String getName() {
        return "tokens";
    }

    @Override
    public String getDisplayName() {
        return "Tokens";
    }

    @Override
    public boolean hasMoney(OfflinePlayer player, long amount) {
        return getBalance(player) >= amount;
    }

    @Override
    public void depositMoney(OfflinePlayer player, long amount) {
        UUID uuid = player.getUniqueId();
        balances.put(uuid, getBalance(player) + amount);
        saveData();
    }

    @Override
    public void withdrawMoney(OfflinePlayer player, long amount) {
        UUID uuid = player.getUniqueId();
        balances.put(uuid, Math.max(0, getBalance(player) - amount));
        saveData();
    }

    @Override
    public long getBalance(OfflinePlayer player) {
        return balances.getOrDefault(player.getUniqueId(), 0L);
    }

    @Override
    public String format(long amount) {
        return amount + " Tokens";
    }

    private void loadData() {
        if (!dataFile.exists()) return;

        YamlConfiguration config = YamlConfiguration.loadConfiguration(dataFile);
        for (String key : config.getKeys(false)) {
            try {
                UUID uuid = UUID.fromString(key);
                balances.put(uuid, config.getLong(key));
            } catch (IllegalArgumentException ignored) {}
        }
    }

    private void saveData() {
        YamlConfiguration config = new YamlConfiguration();
        balances.forEach((uuid, balance) -> config.set(uuid.toString(), balance));

        try {
            config.save(dataFile);
        } catch (IOException e) {
            plugin.getLogger().warning("Failed to save token data: " + e.getMessage());
        }
    }
}
```

## Best Practices

1. **Thread Safety**: If your economy is accessed from multiple threads, ensure proper synchronization.

2. **Async Operations**: For database-backed economies, consider using async operations:
   ```java
   @Override
   public void depositMoney(OfflinePlayer player, long amount) {
       Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
           // Database operation here
       });
   }
   ```

3. **Offline Players**: Your implementation should handle offline players correctly since transactions can occur when players are offline.

4. **Error Handling**: Always handle potential errors gracefully:
   ```java
   @Override
   public void withdrawMoney(OfflinePlayer player, long amount) {
       try {
           // Withdrawal logic
       } catch (Exception e) {
           plugin.getLogger().severe("Failed to withdraw: " + e.getMessage());
       }
   }
   ```

5. **Balance Validation**: Always ensure balances never go negative.

## Support

For API questions or issues, join the [Discord](https://discord.groupez.dev).
