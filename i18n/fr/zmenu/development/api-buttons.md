---
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

## Options de Bouton

Une `ButtonOption` ajoute un comportement supplementaire a **tous** les boutons, quel que soit leur type. zMenu cree une instance de chaque option enregistree pour chaque bouton qu'il charge, puis appelle `loadButton(...)` avec la configuration du bouton et `onClick(...)` quand le bouton est clique.

```java
import fr.maxlego08.menu.api.ButtonManager;
import fr.maxlego08.menu.api.InventoryManager;
import fr.maxlego08.menu.api.MenuItemStack;
import fr.maxlego08.menu.api.button.Button;
import fr.maxlego08.menu.api.button.ButtonOption;
import fr.maxlego08.menu.api.engine.InventoryEngine;
import fr.maxlego08.menu.api.utils.Loader;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.inventory.InventoryClickEvent;
import org.bukkit.plugin.Plugin;

import java.io.File;

public class ClickLogOption implements ButtonOption {

    private final Plugin plugin;
    private boolean enabled;

    // zMenu appelle ce constructeur avec le plugin qui a enregistre l'option
    public ClickLogOption(Plugin plugin) {
        this.plugin = plugin;
    }

    @Override
    public String getName() {
        return "click-log";
    }

    @Override
    public Plugin getPlugin() {
        return this.plugin;
    }

    @Override
    public void loadButton(Button button, YamlConfiguration configuration, String path,
                           InventoryManager inventoryManager, ButtonManager buttonManager,
                           Loader<MenuItemStack> itemStackLoader, File file) {
        this.enabled = configuration.getBoolean(path + "click-log", false);
    }

    @Override
    public void onClick(Button button, Player player, InventoryClickEvent event,
                        InventoryEngine inventoryEngine, int slot, boolean isSuccess) {
        if (this.enabled) {
            this.plugin.getLogger().info(player.getName() + " a clique sur " + button.getName());
        }
    }
}
```

Enregistrez la classe de l'option (pas une instance) aupres de l'`InventoryManager` :

```java
menuPlugin.getInventoryManager().registerOption(this, ClickLogOption.class);

// Dans onDisable, retirez toutes les options enregistrees par votre plugin
menuPlugin.getInventoryManager().unregisterOptions(this);
```

Pour creer les instances, zMenu cherche d'abord un **constructeur public prenant un `Plugin`** (il recoit le plugin passe a `registerOption`). S'il n'y en a pas, il se rabat sur un **constructeur public sans argument**. Si la classe n'a ni l'un ni l'autre, ou si le constructeur leve une exception, l'option est ignoree pour ce bouton et zMenu affiche un avertissement une seule fois par classe d'option. Sans constructeur utilisable, l'avertissement est le suivant (si le constructeur leve une exception, celle-ci remplace la raison) :

```
The button option com.example.ClickLogOption was ignored: it needs a public constructor taking a Plugin, or a public no-argument constructor.
```

## Regles d'Item Personnalisees

Les [regles d'item](../configurations/item-rules) decident quels items sont acceptes, par exemple dans la section `rule` d'un bouton `item_drag` ou dans le requirement `item-rule`. Les types de regles de zMenu sont decouverts automatiquement, et les autres plugins ajoutent leurs propres types avec `ButtonManager#registerRuleLoader(RuleLoader)`.

Un `RuleLoader` fournit un nom de type, des alias optionnels, et construit une `Rule` a partir de la map de configuration de la regle :

```java
import fr.maxlego08.menu.api.rules.ItemRuleContext;
import fr.maxlego08.menu.api.rules.Rule;
import fr.maxlego08.menu.api.rules.RuleConfigHelper;
import fr.maxlego08.menu.api.rules.loader.RuleLoader;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.util.List;
import java.util.Map;

public class MinAmountRuleLoader implements RuleLoader {

    @Override
    public @NotNull String getType() {
        return "min-amount";
    }

    @Override
    public @NotNull List<@NotNull String> getAliases() {
        return List.of("minimum-amount");
    }

    @Override
    public @Nullable Rule load(@NotNull Map<String, Object> configuration) {
        int amount = RuleConfigHelper.getInt(configuration, "amount", 1);
        return new MinAmountRule(amount);
    }
}

class MinAmountRule implements Rule {

    private final int amount;

    MinAmountRule(int amount) {
        this.amount = amount;
    }

    @Override
    public boolean matches(@NotNull ItemRuleContext context) {
        return context.getItemStack().getAmount() >= this.amount;
    }
}
```

```java
menuPlugin.getButtonManager().registerRuleLoader(new MinAmountRuleLoader());
```

Le type et ses alias ne sont pas sensibles a la casse. Un loader enregistre avec le meme type ou alias qu'un loader existant le remplace. `load` peut retourner `null` quand la configuration est invalide : la regle est alors ignoree.

La regle s'utilise ensuite dans le YAML comme n'importe quel type integre :

```yaml
rule:
  type: min-amount
  amount: 16
```

Pour une regle qui reconnait des items personnalises par leur id, etendez plutot `AbstractPluginRuleLoader` : elle lit pour vous la liste `items` et l'option `ignore-case` (par defaut `true`), et vous n'implementez que `createRule(List<String> items, boolean ignoreCase)`.

Les regles sont resolues au chargement d'un inventaire. Enregistrez votre loader dans `onEnable`, avant de charger vos propres inventaires. Les inventaires charges avant l'enregistrement (comme les fichiers du dossier `inventories/` de zMenu) ne connaissent le nouveau type qu'apres un `/zm reload`.

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
