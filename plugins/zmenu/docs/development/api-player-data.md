---
sidebar_position: 5
title: Player Data API
description: Working with player data storage in zMenu
---

# Player Data API

Learn how to work with zMenu's player data storage system programmatically.

## Overview

zMenu provides a built-in data storage system that persists player-specific values. This data is:
- Stored in a database (SQLite, MySQL, or MariaDB)
- Accessible via placeholders (`%zmenu_player_value_<key>%`)
- Persistent across server restarts
- Available through the API

## DataManager

Get the data manager to work with player data:

```java
DataManager dataManager = menuPlugin.getDataManager();
```

## Reading Data

### Get a Single Value

```java
// Returns Optional<String>
Optional<String> value = dataManager.getData(player, "coins");

// Check and use the value
if (value.isPresent()) {
    int coins = Integer.parseInt(value.get());
    player.sendMessage("You have " + coins + " coins");
} else {
    player.sendMessage("No coins data found");
}
```

### Get with Default Value

```java
String coins = dataManager.getData(player, "coins").orElse("0");
int coinAmount = Integer.parseInt(coins);
```

### Get by UUID

```java
UUID uuid = player.getUniqueId();
Optional<String> value = dataManager.getData(uuid, "coins");
```

### Check If Data Exists

```java
boolean hasCoins = dataManager.getData(player, "coins").isPresent();
```

## Writing Data

### Set a Value

```java
// Set a string value
dataManager.setData(player, "coins", "100");

// Set a numeric value (as string)
dataManager.setData(player, "level", String.valueOf(5));

// Set a boolean (as string)
dataManager.setData(player, "premium", "true");
```

### Add to a Numeric Value

```java
// Add 50 to the current value
dataManager.addData(player, "coins", 50);
```

### Subtract from a Value

```java
// Subtract by adding a negative value
dataManager.addData(player, "coins", -25);
```

### Remove Data

```java
// Remove a specific key for a player
dataManager.removeData(player, "coins");
```

## Bulk Operations

### Get All Keys for a Player

```java
// This functionality depends on implementation
// Generally, you would track your own keys
List<String> knownKeys = Arrays.asList("coins", "level", "premium", "last-login");

for (String key : knownKeys) {
    dataManager.getData(player, key).ifPresent(value -> {
        player.sendMessage(key + ": " + value);
    });
}
```

## Complete Example: Currency System

```java
package com.example.currency;

import fr.maxlego08.menu.api.MenuPlugin;
import fr.maxlego08.menu.api.DataManager;
import org.bukkit.entity.Player;

public class CurrencyManager {

    private final DataManager dataManager;
    private static final String COINS_KEY = "coins";

    public CurrencyManager(MenuPlugin menuPlugin) {
        this.dataManager = menuPlugin.getDataManager();
    }

    public int getCoins(Player player) {
        return dataManager.getData(player, COINS_KEY)
            .map(Integer::parseInt)
            .orElse(0);
    }

    public void setCoins(Player player, int amount) {
        dataManager.setData(player, COINS_KEY, String.valueOf(Math.max(0, amount)));
    }

    public void addCoins(Player player, int amount) {
        int current = getCoins(player);
        setCoins(player, current + amount);
    }

    public boolean removeCoins(Player player, int amount) {
        int current = getCoins(player);
        if (current >= amount) {
            setCoins(player, current - amount);
            return true;
        }
        return false;
    }

    public boolean hasCoins(Player player, int amount) {
        return getCoins(player) >= amount;
    }
}
```

### Usage

```java
CurrencyManager currency = new CurrencyManager(menuPlugin);

// Check balance
int balance = currency.getCoins(player);
player.sendMessage("Balance: " + balance);

// Add coins
currency.addCoins(player, 100);
player.sendMessage("Added 100 coins!");

// Remove coins (with check)
if (currency.removeCoins(player, 50)) {
    player.sendMessage("Spent 50 coins");
} else {
    player.sendMessage("Not enough coins!");
}
```

## Complete Example: Statistics Tracker

```java
package com.example.stats;

import fr.maxlego08.menu.api.MenuPlugin;
import fr.maxlego08.menu.api.DataManager;
import org.bukkit.entity.Player;

public class StatsTracker {

    private final DataManager dataManager;

    public StatsTracker(MenuPlugin menuPlugin) {
        this.dataManager = menuPlugin.getDataManager();
    }

    // Kills
    public int getKills(Player player) {
        return getIntValue(player, "kills");
    }

    public void incrementKills(Player player) {
        dataManager.addData(player, "kills", 1);
    }

    // Deaths
    public int getDeaths(Player player) {
        return getIntValue(player, "deaths");
    }

    public void incrementDeaths(Player player) {
        dataManager.addData(player, "deaths", 1);
    }

    // K/D Ratio
    public double getKDRatio(Player player) {
        int kills = getKills(player);
        int deaths = getDeaths(player);
        if (deaths == 0) return kills;
        return (double) kills / deaths;
    }

    // Playtime (in minutes)
    public long getPlaytime(Player player) {
        return getLongValue(player, "playtime");
    }

    public void addPlaytime(Player player, long minutes) {
        long current = getPlaytime(player);
        dataManager.setData(player, "playtime", String.valueOf(current + minutes));
    }

    // Helper methods
    private int getIntValue(Player player, String key) {
        return dataManager.getData(player, key)
            .map(Integer::parseInt)
            .orElse(0);
    }

    private long getLongValue(Player player, String key) {
        return dataManager.getData(player, key)
            .map(Long::parseLong)
            .orElse(0L);
    }
}
```

## Complete Example: Daily Rewards System

```java
package com.example.rewards;

import fr.maxlego08.menu.api.MenuPlugin;
import fr.maxlego08.menu.api.DataManager;
import org.bukkit.entity.Player;

public class DailyRewardsManager {

    private final DataManager dataManager;
    private static final long DAY_IN_MILLIS = 24 * 60 * 60 * 1000;

    public DailyRewardsManager(MenuPlugin menuPlugin) {
        this.dataManager = menuPlugin.getDataManager();
    }

    public boolean canClaimDaily(Player player) {
        long lastClaim = getLastClaimTime(player);
        long now = System.currentTimeMillis();
        return (now - lastClaim) >= DAY_IN_MILLIS;
    }

    public long getTimeUntilNextClaim(Player player) {
        long lastClaim = getLastClaimTime(player);
        long now = System.currentTimeMillis();
        long nextClaim = lastClaim + DAY_IN_MILLIS;
        return Math.max(0, nextClaim - now);
    }

    public void claimDaily(Player player) {
        dataManager.setData(player, "daily-last-claim",
            String.valueOf(System.currentTimeMillis()));
        incrementStreak(player);
    }

    public int getStreak(Player player) {
        return dataManager.getData(player, "daily-streak")
            .map(Integer::parseInt)
            .orElse(0);
    }

    private void incrementStreak(Player player) {
        dataManager.addData(player, "daily-streak", 1);
    }

    public void resetStreak(Player player) {
        dataManager.setData(player, "daily-streak", "0");
    }

    private long getLastClaimTime(Player player) {
        return dataManager.getData(player, "daily-last-claim")
            .map(Long::parseLong)
            .orElse(0L);
    }

    // Format time remaining
    public String formatTimeRemaining(Player player) {
        long millis = getTimeUntilNextClaim(player);
        long hours = millis / (60 * 60 * 1000);
        long minutes = (millis % (60 * 60 * 1000)) / (60 * 1000);
        return String.format("%dh %dm", hours, minutes);
    }
}
```

## Working with Complex Data

For complex data structures, serialize to JSON:

```java
import com.google.gson.Gson;

public class ComplexDataManager {

    private final DataManager dataManager;
    private final Gson gson = new Gson();

    public ComplexDataManager(MenuPlugin menuPlugin) {
        this.dataManager = menuPlugin.getDataManager();
    }

    // Save a list
    public void saveStringList(Player player, String key, List<String> list) {
        String json = gson.toJson(list);
        dataManager.setData(player, key, json);
    }

    // Load a list
    public List<String> loadStringList(Player player, String key) {
        return dataManager.getData(player, key)
            .map(json -> gson.fromJson(json,
                new TypeToken<List<String>>(){}.getType()))
            .orElse(new ArrayList<>());
    }

    // Save custom object
    public void savePlayerStats(Player player, PlayerStats stats) {
        String json = gson.toJson(stats);
        dataManager.setData(player, "player-stats", json);
    }

    // Load custom object
    public PlayerStats loadPlayerStats(Player player) {
        return dataManager.getData(player, "player-stats")
            .map(json -> gson.fromJson(json, PlayerStats.class))
            .orElse(new PlayerStats());
    }
}

// Example data class
public class PlayerStats {
    public int kills = 0;
    public int deaths = 0;
    public long playtime = 0;
    public List<String> achievements = new ArrayList<>();
}
```

## Using Data in Inventories

The data you set is automatically available as placeholders:

```yaml
items:
  stats-display:
    slot: 4
    item:
      material: PLAYER_HEAD
      playerHead: "%player%"
      name: "&6&l%player%'s Stats"
      lore:
        - "&7Coins: &e%zmenu_player_value_coins%"
        - "&7Kills: &a%zmenu_player_value_kills%"
        - "&7Deaths: &c%zmenu_player_value_deaths%"
        - "&7Streak: &b%zmenu_player_value_daily-streak%"
```

## Best Practices

1. **Use consistent key names** - Establish a naming convention
2. **Handle missing data** - Always use `orElse()` for defaults
3. **Validate numeric parsing** - Wrap in try-catch for safety
4. **Don't overwrite important data** - Check before setting
5. **Use appropriate data types** - Store as strings, parse when needed
6. **Clean up unused data** - Remove keys no longer needed

## Key Naming Conventions

```java
// Good naming conventions
"coins"              // Simple, clear
"daily-streak"       // Kebab-case for multi-word
"quest-tutorial-1"   // Include identifiers
"stats-kills"        // Prefix with category

// Avoid
"c"                  // Too short
"playerCoinsData"    // CamelCase (use kebab)
"x1y2z3"            // Meaningless
```

## Next Steps

- Listen to [Events](./api-events)
- Create [Custom Buttons](./api-buttons) that use player data
- Create [Custom Actions](./api-actions) that modify player data
