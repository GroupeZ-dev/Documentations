---
sidebar_position: 3
title: Boutons Personnalises
description: Creer des types de boutons personnalises pour zMenu
---

# Boutons Personnalises

Apprenez a creer et enregistrer des types de boutons personnalises dans zMenu.

## Vue d'Ensemble

Les boutons personnalises vous permettent d'etendre zMenu avec de nouveaux comportements de boutons. Cela implique :
1. Creer un `ButtonLoader` pour analyser la configuration YAML
2. Creer une implementation de `Button` pour le comportement
3. Enregistrer le loader aupres du `ButtonManager`

## ButtonManager

Obtenez le gestionnaire de boutons pour enregistrer des boutons personnalises :

```java
ButtonManager buttonManager = menuPlugin.getButtonManager();
```

## Creer un Button Loader

L'interface `ButtonLoader` definit comment votre bouton est charge depuis le YAML :

```java
import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.loader.ButtonLoader;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.plugin.Plugin;

public class MyButtonLoader implements ButtonLoader {

    @Override
    public String getName() {
        return "MY_CUSTOM_BUTTON"; // Le nom du type utilise dans le YAML
    }

    @Override
    public Button load(YamlConfiguration configuration, String path, Plugin plugin) {
        // Lire les proprietes personnalisees depuis la configuration
        String customProperty = configuration.getString(path + ".custom-property", "default");
        int customNumber = configuration.getInt(path + ".custom-number", 0);
        boolean customFlag = configuration.getBoolean(path + ".custom-flag", false);

        // Creer et retourner votre instance de bouton
        return new MyCustomButton(customProperty, customNumber, customFlag);
    }
}
```

## Creer une Implementation de Bouton

Implementez l'interface `Button` (ou etendez une classe de base) :

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
        // Votre logique de clic personnalisee ici
        player.sendMessage("Bouton personnalise clique !");
        player.sendMessage("Propriete : " + customProperty);
        player.sendMessage("Nombre : " + customNumber);
        player.sendMessage("Flag : " + customFlag);

        // Exemple : Executer differentes actions selon la configuration
        if (customFlag) {
            player.sendMessage("Le flag est active !");
        }

        // Vous pouvez aussi interagir avec l'inventaire
        // inventory.refresh(player);
    }
}
```

## Enregistrer Votre Bouton

Enregistrez votre button loader quand votre plugin s'active :

```java
@Override
public void onEnable() {
    MenuPlugin menuPlugin = (MenuPlugin) Bukkit.getPluginManager().getPlugin("zMenu");

    if (menuPlugin != null) {
        // Enregistrer le bouton personnalise
        menuPlugin.getButtonManager().register(new MyButtonLoader());
        getLogger().info("Bouton personnalise enregistre : MY_CUSTOM_BUTTON");
    }
}
```

## Utiliser Votre Bouton Personnalise

Dans votre configuration YAML d'inventaire :

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
      name: "&b&lBouton Personnalise"
      lore:
        - "&7Ceci est un bouton personnalise !"
```

## Exemple Complet : Bouton de Teleportation

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
        String message = config.getString(path + ".message", "&aTeleporte !");

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
        // Fermer l'inventaire d'abord
        player.closeInventory();

        // Teleporter le joueur
        player.teleport(location);

        // Envoyer le message avec les codes couleur
        player.sendMessage(ChatColor.translateAlternateColorCodes('&', message));
    }
}
```

### Utilisation dans le YAML

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
    message: "&aVous avez ete teleporte au spawn !"
    item:
      material: ENDER_PEARL
      name: "&5&lTeleportation au Spawn"
      lore:
        - "&7Cliquez pour vous teleporter"
```

## Exemple Complet : Bouton Compteur

Un bouton qui compte les clics par joueur :

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

    // Stockage partage des compteurs pour tous les boutons compteur
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

        // Obtenir le compteur actuel
        int currentCount = counters.getOrDefault(uuid, 0);
        currentCount++;

        // Mettre a jour le compteur
        counters.put(uuid, currentCount);

        player.sendMessage("§aNombre de clics : " + currentCount + "/" + maxCount);

        // Verifier si le maximum est atteint
        if (currentCount >= maxCount) {
            player.sendMessage("§6Vous avez atteint le nombre maximum de clics !");

            // Executer la commande de recompense
            if (!rewardCommand.isEmpty()) {
                String command = rewardCommand.replace("%player%", player.getName());
                Bukkit.dispatchCommand(Bukkit.getConsoleSender(), command);
            }

            // Reinitialiser le compteur
            counters.put(uuid, 0);
        }

        // Rafraichir l'inventaire pour mettre a jour l'affichage
        inventory.refresh(player);
    }
}
```

## Avance : Bouton avec Affichage d'Item Personnalise

Surcharger l'affichage de l'item en fonction de l'etat du joueur :

```java
@Override
public ItemStack getCustomItemStack(Player player) {
    // Retourner un item personnalise en fonction de l'etat du joueur
    int count = counters.getOrDefault(player.getUniqueId(), 0);

    ItemStack item = new ItemStack(Material.PAPER);
    ItemMeta meta = item.getItemMeta();
    meta.setDisplayName("§6Compteur : " + count + "/" + maxCount);
    item.setItemMeta(meta);

    return item;
}
```

## Bonnes Pratiques

1. **Utiliser des noms de type significatifs** - Les rendre uniques et descriptifs
2. **Valider la configuration** - Verifier les valeurs manquantes ou invalides
3. **Gerer les valeurs null** - Utiliser des valeurs par defaut pour les proprietes optionnelles
4. **Garder les boutons concentres** - Un type de bouton = un objectif
5. **Documenter vos boutons** - Expliquer les options de configuration requises
6. **Tester les cas limites** - Configurations vides, proprietes manquantes, etc.

## Etapes Suivantes

- Creer des [Actions Personnalisees](./api-actions)
- Travailler avec les [Donnees Joueur](./api-player-data)
- Ecouter les [Evenements](./api-events)
