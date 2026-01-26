---
sidebar_position: 6
title: Evenements
description: Ecouter les evenements zMenu dans votre plugin
---

# Evenements

zMenu declenche divers evenements que vous pouvez ecouter dans votre plugin. Cela vous permet de reagir aux actions d'inventaire, aux chargements de boutons, et plus encore.

## Evenements Disponibles

| Evenement | Description |
|-----------|-------------|
| `ButtonLoadEvent` | Declenche quand un bouton est charge depuis la configuration |
| `InventoryLoadEvent` | Declenche quand un inventaire est charge |
| `PlayerOpenInventoryEvent` | Declenche quand un joueur ouvre un inventaire zMenu |
| `ButtonLoaderRegisterEvent` | Declenche quand un button loader est enregistre |
| `ZMenuItemsLoad` | Declenche quand les items personnalises sont charges |

## ButtonLoadEvent

Declenche quand un bouton est charge depuis un fichier de configuration.

```java
import fr.maxlego08.menu.api.event.ButtonLoadEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class ButtonListener implements Listener {

    @EventHandler
    public void onButtonLoad(ButtonLoadEvent event) {
        Button button = event.getButton();
        String buttonName = button.getName();

        getLogger().info("Bouton charge : " + buttonName);

        // Vous pouvez modifier le bouton ou ajouter une logique personnalisee
    }
}
```

### Cas d'Utilisation
- Journaliser tous les boutons charges
- Valider les configurations de boutons
- Ajouter un traitement personnalise aux boutons

## InventoryLoadEvent

Declenche quand un inventaire est charge depuis un fichier de configuration.

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

        getLogger().info("Inventaire charge : " + fileName);
        getLogger().info("  Nom : " + name);
        getLogger().info("  Taille : " + size);
        getLogger().info("  Boutons : " + inventory.getButtons().size());
    }
}
```

### Cas d'Utilisation
- Suivre les inventaires charges
- Valider les configurations d'inventaires
- Ajouter un post-traitement aux inventaires

## PlayerOpenInventoryEvent

Declenche quand un joueur ouvre un inventaire zMenu. Cet evenement est annulable.

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

        getLogger().info(player.getName() + " a ouvert l'inventaire : " + inventory.getFileName());

        // Annuler l'ouverture pour des conditions specifiques
        if (!player.hasPermission("myplugin.use.menus")) {
            event.setCancelled(true);
            player.sendMessage("Vous n'avez pas la permission d'utiliser les menus !");
        }
    }
}
```

### Cas d'Utilisation
- Journaliser l'acces aux menus des joueurs
- Restreindre l'acces aux inventaires
- Suivre l'activite des joueurs
- Ajouter des verifications personnalisees avant l'ouverture

### Annuler l'Evenement

```java
@EventHandler
public void onPlayerOpenInventory(PlayerOpenInventoryEvent event) {
    Player player = event.getPlayer();
    Inventory inventory = event.getInventory();

    // Bloquer les inventaires specifiques pour les non-VIP
    if (inventory.getFileName().startsWith("vip-") &&
        !player.hasPermission("server.vip")) {
        event.setCancelled(true);
        player.sendMessage(ChatColor.RED + "Ce menu est reserve aux VIP !");
    }
}
```

## ButtonLoaderRegisterEvent

Declenche quand un button loader est enregistre aupres du ButtonManager.

```java
import fr.maxlego08.menu.api.event.ButtonLoaderRegisterEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class LoaderListener implements Listener {

    @EventHandler
    public void onButtonLoaderRegister(ButtonLoaderRegisterEvent event) {
        ButtonLoader loader = event.getButtonLoader();
        String name = loader.getName();

        getLogger().info("Button loader enregistre : " + name);
    }
}
```

### Cas d'Utilisation
- Suivre les types de boutons disponibles
- Journaliser les integrations de plugins
- Deboguer l'enregistrement des loaders

## ZMenuItemsLoad

Declenche quand zMenu charge les items personnalises depuis la configuration.

```java
import fr.maxlego08.menu.api.event.ZMenuItemsLoad;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class ItemsLoadListener implements Listener {

    @EventHandler
    public void onItemsLoad(ZMenuItemsLoad event) {
        getLogger().info("Les items zMenu ont ete charges !");

        // Ajoutez vos items ou traitements personnalises ici
    }
}
```

## Enregistrer les Ecouteurs d'Evenements

Enregistrez vos ecouteurs dans le `onEnable` de votre plugin :

```java
@Override
public void onEnable() {
    // Enregistrer les ecouteurs d'evenements
    getServer().getPluginManager().registerEvents(new ButtonListener(), this);
    getServer().getPluginManager().registerEvents(new InventoryListener(), this);
    getServer().getPluginManager().registerEvents(new OpenInventoryListener(), this);
}
```

## Exemple Complet : Analytique des Menus

Suivre l'utilisation des menus pour l'analytique :

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

        // Compter les ouvertures
        menuOpenCounts.merge(menuName, 1, Integer::sum);

        // Suivre l'heure de la derniere ouverture
        lastMenuOpen.put(player.getUniqueId(), System.currentTimeMillis());

        // Journaliser pour le debogage
        plugin.getLogger().info(String.format(
            "[Analytique] %s a ouvert %s (total ouvertures : %d)",
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
        plugin.getLogger().info("=== Analytique des Menus ===");
        menuOpenCounts.entrySet().stream()
            .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
            .forEach(entry -> {
                plugin.getLogger().info(entry.getKey() + " : " + entry.getValue() + " ouvertures");
            });
    }
}
```

## Exemple Complet : Controle d'Acces aux Menus

Controler l'acces aux menus en fonction de conditions personnalisees :

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

    // Menus qui necessitent le VIP
    private final Set<String> vipMenus = new HashSet<>();

    // Menus avec temps de recharge
    private final Map<String, Long> menuCooldowns = new HashMap<>();
    private final Map<UUID, Map<String, Long>> playerCooldowns = new HashMap<>();

    public MenuAccessController() {
        // Configurer les menus VIP
        vipMenus.add("vip-shop");
        vipMenus.add("vip-rewards");
        vipMenus.add("premium-features");

        // Configurer les temps de recharge (en millisecondes)
        menuCooldowns.put("daily-rewards", 60000L); // 1 minute
        menuCooldowns.put("spin-wheel", 300000L);   // 5 minutes
    }

    @EventHandler(priority = EventPriority.HIGH)
    public void onMenuOpen(PlayerOpenInventoryEvent event) {
        if (event.isCancelled()) return;

        Player player = event.getPlayer();
        Inventory inventory = event.getInventory();
        String menuName = inventory.getFileName();

        // Verifier l'exigence VIP
        if (vipMenus.contains(menuName) && !player.hasPermission("server.vip")) {
            event.setCancelled(true);
            player.sendMessage(ChatColor.RED + "Ce menu necessite le rang VIP !");
            return;
        }

        // Verifier le temps de recharge
        if (menuCooldowns.containsKey(menuName)) {
            long cooldown = menuCooldowns.get(menuName);
            long lastOpen = getLastOpen(player.getUniqueId(), menuName);
            long now = System.currentTimeMillis();

            if (now - lastOpen < cooldown) {
                event.setCancelled(true);
                long remaining = (cooldown - (now - lastOpen)) / 1000;
                player.sendMessage(ChatColor.RED + "Veuillez attendre " + remaining +
                    " secondes avant d'ouvrir ce menu a nouveau !");
                return;
            }

            // Mettre a jour l'heure de la derniere ouverture
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

## Exemple Complet : Journalisation des Menus

Journaliser toutes les interactions avec les menus pour l'audit :

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
        log("INVENTORY_LOAD", "Inventaire charge : " + event.getInventory().getFileName());
    }

    @EventHandler
    public void onButtonLoad(ButtonLoadEvent event) {
        log("BUTTON_LOAD", "Bouton charge : " + event.getButton().getName());
    }

    @EventHandler
    public void onMenuOpen(PlayerOpenInventoryEvent event) {
        String message = String.format("Le joueur %s a ouvert le menu %s",
            event.getPlayer().getName(),
            event.getInventory().getFileName());
        log("MENU_OPEN", message);
    }

    private void log(String type, String message) {
        String timestamp = dateFormat.format(new Date());
        String logLine = String.format("[%s] [%s] %s", timestamp, type, message);

        // Journaliser dans la console
        plugin.getLogger().info(logLine);

        // Journaliser dans le fichier
        try (PrintWriter writer = new PrintWriter(new FileWriter(logFile, true))) {
            writer.println(logLine);
        } catch (IOException e) {
            plugin.getLogger().severe("Echec de l'ecriture dans le fichier de log : " + e.getMessage());
        }
    }
}
```

## Priorites des Evenements

Utilisez les priorites d'evenements pour controler quand votre ecouteur s'execute :

```java
// S'executer en premier (avant les autres plugins)
@EventHandler(priority = EventPriority.LOWEST)
public void onMenuOpenFirst(PlayerOpenInventoryEvent event) {
    // ...
}

// S'executer en dernier (apres les autres plugins)
@EventHandler(priority = EventPriority.HIGHEST)
public void onMenuOpenLast(PlayerOpenInventoryEvent event) {
    // ...
}

// S'executer meme si annule
@EventHandler(priority = EventPriority.MONITOR, ignoreCancelled = false)
public void onMenuOpenMonitor(PlayerOpenInventoryEvent event) {
    // Juste observer, ne pas modifier
}
```

## Bonnes Pratiques

1. **Ne pas bloquer les evenements inutilement** - N'annuler que lorsque necessaire
2. **Utiliser les priorites appropriees** - LOWEST pour les modifications, MONITOR pour la journalisation
3. **Gerer les exceptions** - Ne pas laisser les erreurs planter la gestion des evenements
4. **Garder les ecouteurs legers** - Eviter les operations lourdes dans les gestionnaires d'evenements
5. **Enregistrer correctement les ecouteurs** - Utiliser le gestionnaire de plugins

## Etapes Suivantes

- Creer des [Boutons Personnalises](./api-buttons)
- Creer des [Actions Personnalisees](./api-actions)
- Travailler avec les [Donnees Joueur](./api-player-data)
- Revoir l'[Introduction a l'API](./api-introduction)
