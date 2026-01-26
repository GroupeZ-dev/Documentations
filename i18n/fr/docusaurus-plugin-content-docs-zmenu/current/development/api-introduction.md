---
sidebar_position: 1
title: Introduction a l'API
description: Premiers pas avec l'API zMenu
---

# Introduction a l'API

zMenu fournit une API complete permettant aux developpeurs de s'integrer et d'etendre les fonctionnalites du plugin. Ce guide vous aidera a demarrer avec l'API zMenu.

## Depot Maven

Ajoutez le depot GroupeZ a votre `pom.xml` :

```xml
<repositories>
    <repository>
        <id>groupez</id>
        <url>https://repo.groupez.dev/releases</url>
    </repository>
</repositories>
```

## Dependance Maven

Ajoutez l'API zMenu comme dependance :

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

Pour les utilisateurs de Gradle :

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

## Dependance du Plugin

Ajoutez zMenu comme dependance dans votre `plugin.yml` :

```yaml
# Dependance obligatoire (le plugin ne se chargera pas sans zMenu)
depend: [zMenu]

# Dependance optionnelle (le plugin se chargera meme sans zMenu)
softdepend: [zMenu]
```

## Obtenir l'API

### Acceder a l'Instance du Plugin

```java
import fr.maxlego08.menu.api.MenuPlugin;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private MenuPlugin menuPlugin;

    @Override
    public void onEnable() {
        // Obtenir l'instance de zMenu
        this.menuPlugin = (MenuPlugin) Bukkit.getPluginManager().getPlugin("zMenu");

        if (this.menuPlugin == null) {
            getLogger().severe("zMenu non trouve ! Desactivation du plugin...");
            Bukkit.getPluginManager().disablePlugin(this);
            return;
        }

        getLogger().info("Connexion reussie a zMenu !");
    }

    public MenuPlugin getMenuPlugin() {
        return this.menuPlugin;
    }
}
```

### Connexion Securisee avec Dependance Optionnelle

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
        // Tenter de se connecter a zMenu
        hookZMenu();

        if (zMenuEnabled) {
            getLogger().info("Integration zMenu activee !");
            // Enregistrer les fonctionnalites specifiques a zMenu
        } else {
            getLogger().info("zMenu non trouve, fonctionnement sans integration.");
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

## Interfaces Principales

L'API zMenu fournit plusieurs interfaces principales :

### MenuPlugin

L'interface principale du plugin donnant acces a tous les gestionnaires :

```java
MenuPlugin menuPlugin = ...;

// Gestion des inventaires
InventoryManager inventoryManager = menuPlugin.getInventoryManager();

// Enregistrement des types de boutons
ButtonManager buttonManager = menuPlugin.getButtonManager();

// Gestion des commandes
CommandManager commandManager = menuPlugin.getCommandManager();

// Gestion des donnees joueur
DataManager dataManager = menuPlugin.getDataManager();
```

### Gestionnaires Principaux

| Gestionnaire | Fonction |
|--------------|----------|
| `InventoryManager` | Charger, gerer et ouvrir les inventaires |
| `ButtonManager` | Enregistrer des types de boutons personnalises |
| `CommandManager` | Enregistrer des commandes personnalisees |
| `DataManager` | Acceder au stockage des donnees joueur |

## Structure de l'API

```
fr.maxlego08.menu.api
├── MenuPlugin              # Interface principale du plugin
├── InventoryManager        # Operations sur les inventaires
├── ButtonManager           # Enregistrement des boutons
├── CommandManager          # Gestion des commandes
├── DataManager             # Acces aux donnees joueur
├── button/
│   ├── Button              # Interface des boutons
│   └── ButtonLoader        # Chargement des boutons
├── action/
│   ├── Action              # Interface des actions
│   └── ActionLoader        # Chargement des actions
├── requirement/
│   ├── Requirement         # Interface des conditions
│   └── Permissible         # Verification des permissions
└── event/
    ├── ButtonLoadEvent
    ├── InventoryLoadEvent
    └── PlayerOpenInventoryEvent
```

## Bonnes Pratiques

1. **Toujours verifier la nullite** lors de la recuperation de l'instance du plugin zMenu
2. **Utiliser les dependances optionnelles** si votre plugin peut fonctionner sans zMenu
3. **Ne pas stocker les references aux gestionnaires** - les recuperer au moment ou vous en avez besoin
4. **Gerer les exceptions** correctement lors du travail avec les inventaires
5. **Tester minutieusement** avec differentes versions de zMenu

## Exemple de Plugin Complet

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
        // Se connecter a zMenu
        this.menuPlugin = (MenuPlugin) Bukkit.getPluginManager().getPlugin("zMenu");

        if (this.menuPlugin == null) {
            getLogger().severe("zMenu est requis !");
            Bukkit.getPluginManager().disablePlugin(this);
            return;
        }

        getLogger().info("MyPlugin active avec l'integration zMenu !");
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command,
                            String label, String[] args) {
        if (!(sender instanceof Player)) {
            sender.sendMessage("Joueurs uniquement !");
            return true;
        }

        Player player = (Player) sender;
        InventoryManager manager = menuPlugin.getInventoryManager();

        // Ouvrir un inventaire zMenu
        manager.getInventory("my-menu").ifPresent(inv -> {
            manager.openInventory(player, inv);
        });

        return true;
    }
}
```

## Etapes Suivantes

- Apprendre a [Ouvrir des Inventaires](./api-inventory) par programmation
- Creer des [Boutons Personnalises](./api-buttons)
- Creer des [Actions Personnalisees](./api-actions)
- Travailler avec les [Donnees Joueur](./api-player-data)
- Ecouter les [Evenements](./api-events)

## Support

Pour le support de l'API :
- **Discord** : [https://discord.groupez.dev](https://discord.groupez.dev)
- **GitHub Issues** : [https://github.com/Maxlego08/zMenu/issues](https://github.com/Maxlego08/zMenu/issues)
