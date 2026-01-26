---
sidebar_position: 2
title: API Inventaire
description: Ouvrir et gerer les inventaires par programmation
---

# API Inventaire

Apprenez a ouvrir et gerer les inventaires zMenu par programmation en utilisant l'API.

## InventoryManager

Le `InventoryManager` est votre interface principale pour travailler avec les inventaires.

```java
InventoryManager manager = menuPlugin.getInventoryManager();
```

## Recuperer des Inventaires

### Recuperer par Nom

```java
// Retourne Optional<Inventory>
Optional<Inventory> inventory = manager.getInventory("shop");

// Verifier si l'inventaire existe
if (inventory.isPresent()) {
    Inventory inv = inventory.get();
    // Travailler avec l'inventaire
}

// Ou utiliser ifPresent
manager.getInventory("shop").ifPresent(inv -> {
    // Travailler avec l'inventaire
});
```

### Recuperer Tous les Inventaires

```java
// Obtenir tous les inventaires charges
Collection<Inventory> allInventories = manager.getInventories();

for (Inventory inventory : allInventories) {
    String name = inventory.getName();
    int size = inventory.size();
    // Traiter l'inventaire
}
```

### Verifier Si un Inventaire Existe

```java
boolean exists = manager.getInventory("shop").isPresent();
```

## Ouvrir des Inventaires

### Ouverture Basique

```java
manager.getInventory("shop").ifPresent(inv -> {
    manager.openInventory(player, inv);
});
```

### Ouvrir a une Page Specifique

```java
manager.getInventory("catalog").ifPresent(inv -> {
    manager.openInventory(player, inv, 3); // Ouvrir la page 3
});
```

### Ouvrir avec des Arguments

Passer des arguments personnalises a l'inventaire qui peuvent etre utilises dans les placeholders :

```java
List<String> arguments = new ArrayList<>();
arguments.add("swords");      // Argument 1
arguments.add("diamond");     // Argument 2

manager.getInventory("category-shop").ifPresent(inv -> {
    manager.openInventory(player, inv, 1, arguments);
});
```

### Ouvrir pour un Autre Joueur

```java
Player target = Bukkit.getPlayer("Notch");

manager.getInventory("admin-view").ifPresent(inv -> {
    manager.openInventory(target, inv);
});
```

## Interface Inventory

L'interface `Inventory` fournit des informations sur les inventaires charges :

```java
manager.getInventory("shop").ifPresent(inv -> {
    // Obtenir les proprietes de l'inventaire
    String name = inv.getName();           // Nom d'affichage
    String fileName = inv.getFileName();   // Nom du fichier sans extension
    int size = inv.size();                 // Taille de l'inventaire (9-54)
    Plugin plugin = inv.getPlugin();       // Plugin qui l'a enregistre

    // Obtenir les boutons
    List<Button> buttons = inv.getButtons();

    // Verifier si l'inventaire a des pages
    int maxPage = inv.getMaxPage(player);
});
```

## Creer des Moteurs d'Inventaire

Pour plus de controle, vous pouvez travailler directement avec `InventoryEngine` :

```java
manager.getInventory("shop").ifPresent(inv -> {
    // Creer une instance de moteur pour ce joueur
    InventoryEngine engine = manager.createInventoryEngine(player, inv);

    // Ouvrir avec le moteur
    engine.open();

    // Ou ouvrir a une page specifique
    engine.open(2);
});
```

## Fermer des Inventaires

### Fermer pour un Joueur

```java
// Fermer l'inventaire actuel
player.closeInventory();
```

### Verifier Si un Joueur a un zMenu Ouvert

```java
// Verifier si le joueur a un inventaire zMenu ouvert
boolean hasMenuOpen = manager.hasPlayerInventory(player);
```

## Travailler avec les Inventaires Specifiques a un Plugin

Si vous travaillez avec des inventaires de differents plugins :

```java
// Obtenir l'inventaire d'un plugin specifique
Optional<Inventory> inventory = manager.getInventory("shop", "MyPlugin");
```

## Rafraichir les Inventaires

Forcer le rafraichissement d'un inventaire ouvert :

```java
// Ceci est generalement gere en interne, mais vous pouvez declencher des mises a jour
// via les actions des boutons ou les evenements
```

## Exemple : Systeme de Boutique

```java
public class ShopManager {

    private final MenuPlugin menuPlugin;

    public ShopManager(MenuPlugin menuPlugin) {
        this.menuPlugin = menuPlugin;
    }

    public void openShop(Player player) {
        InventoryManager manager = menuPlugin.getInventoryManager();

        manager.getInventory("shop-main").ifPresent(inv -> {
            manager.openInventory(player, inv);
        });
    }

    public void openCategory(Player player, String category) {
        InventoryManager manager = menuPlugin.getInventoryManager();

        List<String> args = Collections.singletonList(category);

        manager.getInventory("shop-category").ifPresent(inv -> {
            manager.openInventory(player, inv, 1, args);
        });
    }

    public void openPlayerShop(Player viewer, Player shopOwner) {
        InventoryManager manager = menuPlugin.getInventoryManager();

        List<String> args = Arrays.asList(
            shopOwner.getName(),
            shopOwner.getUniqueId().toString()
        );

        manager.getInventory("player-shop").ifPresent(inv -> {
            manager.openInventory(viewer, inv, 1, args);
        });
    }
}
```

## Exemple : Commande pour Ouvrir un Menu

```java
public class MenuCommand implements CommandExecutor {

    private final MenuPlugin menuPlugin;

    public MenuCommand(MenuPlugin menuPlugin) {
        this.menuPlugin = menuPlugin;
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

        if (args.length == 0) {
            // Ouvrir le menu par defaut
            manager.getInventory("main-menu").ifPresent(inv -> {
                manager.openInventory(player, inv);
            });
        } else {
            // Ouvrir le menu specifie
            String menuName = args[0];
            Optional<Inventory> inventory = manager.getInventory(menuName);

            if (inventory.isPresent()) {
                manager.openInventory(player, inventory.get());
            } else {
                player.sendMessage("Menu non trouve : " + menuName);
            }
        }

        return true;
    }
}
```

## Exemple : Ouvrir un Menu sur un Evenement

```java
public class JoinListener implements Listener {

    private final MenuPlugin menuPlugin;

    public JoinListener(MenuPlugin menuPlugin) {
        this.menuPlugin = menuPlugin;
    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();

        // Ouvrir le menu de bienvenue apres 1 seconde
        Bukkit.getScheduler().runTaskLater(plugin, () -> {
            if (player.isOnline()) {
                InventoryManager manager = menuPlugin.getInventoryManager();

                manager.getInventory("welcome-menu").ifPresent(inv -> {
                    manager.openInventory(player, inv);
                });
            }
        }, 20L); // 20 ticks = 1 seconde
    }
}
```

## Bonnes Pratiques

1. **Toujours utiliser Optional** - `getInventory()` retourne Optional, gerez-le correctement
2. **Verifier que le joueur est en ligne** - Verifiez que le joueur est toujours en ligne avant d'ouvrir
3. **Utiliser des noms significatifs** - Les noms d'inventaire doivent correspondre a vos noms de fichiers
4. **Gerer les inventaires manquants** - Fournissez un retour si l'inventaire n'existe pas
5. **Ne pas mettre en cache les inventaires** - Recuperez des references fraiches quand necessaire

## Etapes Suivantes

- Creer des [Boutons Personnalises](./api-buttons)
- Creer des [Actions Personnalisees](./api-actions)
- Travailler avec les [Donnees Joueur](./api-player-data)
