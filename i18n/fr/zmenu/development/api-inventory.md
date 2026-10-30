---
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

## Listeners d'Inventaire

Un `InventoryListener` suit la vie de chaque inventaire zMenu : ouverture, fermeture, clics sur les boutons, changements d'inventaire et placement des items. Toutes ses methodes sont `default`, vous ne surchargez donc que celles dont vous avez besoin.

```java
menuPlugin.getInventoryManager().registerInventoryListener(myListener);

// Dans onDisable
menuPlugin.getInventoryManager().unregisterInventoryListener(myListener);
```

Deux methodes permettent a un listener d'afficher les items lui-meme, par exemple pour les envoyer par paquets au lieu de les placer dans l'inventaire Bukkit :

| Methode | Appelee quand |
|---------|---------------|
| `addItem(BaseInventory, boolean inPlayerInventory, ItemButton, boolean enableAntiDupe)` | Un bouton est place dans un slot |
| `updateItem(BaseInventory, boolean inPlayerInventory, ItemButton)` | L'item d'un bouton **deja place** est remplace apres l'ouverture de l'inventaire, par exemple une fois la texture d'une tete de joueur chargee |

Les deux retournent `true` quand le listener a affiche l'item lui-meme : zMenu saute alors son placement par defaut. Quand `updateItem` est appelee, le nouvel item est deja stocke dans le bouton, lisez-le donc avec `itemButton.getDisplayItem()`. `inPlayerInventory` indique si le bouton est dans l'inventaire du joueur ou dans le menu.

```java
public class PacketItemListener implements InventoryListener {

    @Override
    public boolean updateItem(BaseInventory baseInventory, boolean inPlayerInventory, ItemButton itemButton) {
        Player player = baseInventory.getPlayer();
        if (!inPlayerInventory || player == null) return false;

        sendSlotPacket(player, itemButton.getSlot(), itemButton.getDisplayItem());
        return true; // zMenu ne placera pas l'item lui-meme
    }
}
```

Si vous implementez `addItem` pour afficher les items vous-meme, implementez aussi `updateItem`, sinon les mises a jour suivantes (comme les tetes de joueur) sont placees par zMenu dans l'inventaire Bukkit.

Pour changer l'item stocke par un `ItemButton` sans l'afficher, utilisez `ItemButton#setDisplayItem(ItemStack)`. C'est alors a vous de l'afficher. `updateDisplayItem(ItemStack)`, a l'inverse, place aussi l'item.

## Serialisation d'Items

`InventoryManager` peut transformer un `ItemStack` en chaine Base64 et inversement, par exemple pour le sauvegarder dans une base de donnees :

```java
InventoryManager manager = menuPlugin.getInventoryManager();

String serialized = manager.serializeItemStack(itemStack);
ItemStack itemStack = manager.deserializeItemStack(serialized);
```

Un item `null` est serialise en chaine `"null"`, et `deserializeItemStack` retourne `null` pour `null` ou `"null"`. Le format depend de la version du serveur (serialisation d'objets Bukkit a partir de la 1.20.5, NBT via NMS avant), donc une chaine ecrite sur un serveur anterieur a la 1.20.5 ne peut pas etre lue en 1.20.5+, et inversement.

## Creer des Options de Son

`createSoundOption` construit une `SoundOption`, l'objet utilise par zMenu pour le `sound` des boutons et des actions :

```java
SoundOption sound = manager.createSoundOption("ENTITY_EXPERIENCE_ORB_PICKUP", "MASTER", 1.0f, 1.0f);
if (sound != null) {
    sound.play(player);
}
```

| Signature | Description |
|-----------|-------------|
| `createSoundOption(String soundName, String categoryName, float pitch, float volume)` | Identique a la methode ci-dessous avec `isCustom` a `false` |
| `createSoundOption(String soundName, String categoryName, float pitch, float volume, boolean isCustom)` | Quand `isCustom` vaut `true`, le son est joue par son nom brut, par exemple un son de resource pack |

Le nom du son est resolu via XSound, et la methode retourne `null` quand XSound ne le connait pas. `categoryName` est une categorie de son (`MASTER`, `MUSIC`, `PLAYERS`, ...), insensible a la casse ; une categorie inconnue est remplacee par `MASTER`.

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
