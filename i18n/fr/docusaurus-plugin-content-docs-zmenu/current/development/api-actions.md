---
sidebar_position: 4
title: Actions Personnalisees
description: Creer des types d'actions personnalisees pour zMenu
---

# Actions Personnalisees

Apprenez a creer et enregistrer des types d'actions personnalisees dans zMenu.

## Vue d'Ensemble

Les actions sont executees lorsque les joueurs interagissent avec les boutons. Les actions personnalisees vous permettent d'ajouter de nouveaux comportements au-dela des types d'actions integres.

## Creer un Action Loader

L'interface `ActionLoader` definit comment votre action est analysee depuis le YAML :

```java
import fr.maxlego08.menu.api.action.Action;
import fr.maxlego08.menu.api.loader.ActionLoader;
import org.bukkit.configuration.file.YamlConfiguration;

public class MyActionLoader implements ActionLoader {

    @Override
    public String getKey() {
        return "my-custom-action"; // Le nom du type utilise dans le YAML
    }

    @Override
    public Action load(YamlConfiguration configuration, String path) {
        // Lire les proprietes personnalisees depuis la configuration
        String message = configuration.getString(path + ".message", "Message par defaut");
        int times = configuration.getInt(path + ".times", 1);

        return new MyCustomAction(message, times);
    }
}
```

## Creer une Implementation d'Action

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

## Enregistrer Votre Action

Enregistrez votre action loader quand votre plugin s'active :

```java
@Override
public void onEnable() {
    MenuPlugin menuPlugin = (MenuPlugin) Bukkit.getPluginManager().getPlugin("zMenu");

    if (menuPlugin != null) {
        // Enregistrer en utilisant le registre d'action loaders du button manager
        menuPlugin.getButtonManager().registerAction(new MyActionLoader());
        getLogger().info("Action personnalisee enregistree : my-custom-action");
    }
}
```

## Utiliser Votre Action Personnalisee

Dans votre configuration YAML d'inventaire :

```yaml
items:
  my-button:
    slot: 13
    item:
      material: DIAMOND
      name: "&bCliquez-moi"
    actions:
      - type: my-custom-action
        message: "&aBonjour, %player% !"
        times: 3
```

## Exemple Complet : Action de Particules

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

### Utilisation dans le YAML

```yaml
items:
  reward-button:
    slot: 13
    item:
      material: NETHER_STAR
      name: "&6&lReclamer la Recompense"
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
          - "&aRecompense reclamee !"
```

## Exemple Complet : Action Economie

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
        String successMessage = config.getString(path + ".success-message", "&aTermine !");
        String failMessage = config.getString(path + ".fail-message", "&cEchec !");

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
            player.sendMessage(ChatColor.RED + "Economie non disponible !");
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

### Utilisation dans le YAML

```yaml
items:
  daily-reward:
    slot: 13
    item:
      material: GOLD_INGOT
      name: "&6&lRecompense Quotidienne"
      lore:
        - "&7Reclamez 100$ quotidiennement !"
    actions:
      - type: custom-economy
        operation: give
        amount: 100
        success-message: "&aVous avez recu $%amount% ! Solde : $%balance%"
        fail-message: "&cQuelque chose s'est mal passe !"
```

## Exemple Complet : Action de Verification de Permission

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

### Utilisation dans le YAML

```yaml
items:
  vip-reward:
    slot: 13
    item:
      material: DIAMOND
      name: "&b&lRecompense VIP"
    actions:
      - type: check-permission
        permission: "server.vip"
        success-commands:
          - "give %player% diamond 5"
          - "msg %player% &aVoici vos diamants VIP !"
        fail-commands:
          - "msg %player% &cVous avez besoin du rang VIP pour reclamer ceci !"
```

## Action avec Support des Placeholders

Pour supporter les placeholders dans votre action :

```java
import fr.maxlego08.menu.api.utils.Placeholders;

@Override
public void execute(Player player) {
    // Analyser les placeholders avant d'utiliser le message
    String parsedMessage = Placeholders.parse(player, this.message);
    player.sendMessage(ChatColor.translateAlternateColorCodes('&', parsedMessage));
}
```

## Bonnes Pratiques

1. **Utiliser des noms d'action clairs** - Identifiants descriptifs et uniques
2. **Valider l'entree** - Gerer les configurations manquantes ou invalides
3. **Fournir des valeurs par defaut** - Utiliser des valeurs par defaut sensees
4. **Supporter les placeholders** - Analyser les placeholders la ou c'est approprie
5. **Gerer les erreurs avec elegance** - Ne pas planter sur une entree invalide
6. **Documenter la configuration** - Expliquer toutes les options dans votre documentation

## Etapes Suivantes

- Travailler avec les [Donnees Joueur](./api-player-data)
- Ecouter les [Evenements](./api-events)
- Revoir l'[Introduction a l'API](./api-introduction)
