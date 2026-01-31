---
sidebar_position: 2
title: Services
description: Architecture basée sur les services de zAuctionHouse
---

# Services

zAuctionHouse utilise une architecture basée sur les services où chaque opération majeure possède son propre service dédié.

## Vue d'Ensemble des Services

| Service | Fonction |
|---------|----------|
| `AuctionSellService` | Gérer la mise en vente des objets |
| `AuctionPurchaseService` | Gérer les achats d'objets |
| `AuctionRemoveService` | Gérer la suppression d'objets |
| `AuctionExpireService` | Gérer l'expiration des objets |

## AuctionSellService

Gère toutes les opérations de mise en vente.

### Interface

```java
public interface AuctionSellService {

    /**
     * Vendre un objet.
     *
     * @param player Le vendeur
     * @param itemStack L'objet à vendre
     * @param price Le prix de vente
     * @param economy L'économie à utiliser
     * @return CompletableFuture avec le résultat
     */
    CompletableFuture<SellResult> sell(
        Player player,
        ItemStack itemStack,
        long price,
        AuctionEconomy economy
    );

    /**
     * Vendre un objet avec expiration personnalisée.
     *
     * @param player Le vendeur
     * @param itemStack L'objet à vendre
     * @param price Le prix de vente
     * @param economy L'économie à utiliser
     * @param expiration Durée d'expiration personnalisée
     * @return CompletableFuture avec le résultat
     */
    CompletableFuture<SellResult> sell(
        Player player,
        ItemStack itemStack,
        long price,
        AuctionEconomy economy,
        Duration expiration
    );

    /**
     * Vérifier si un joueur peut vendre un objet.
     *
     * @param player Le joueur
     * @param itemStack L'objet
     * @param price Le prix
     * @param economy L'économie
     * @return Résultat de validation
     */
    SellValidation validate(
        Player player,
        ItemStack itemStack,
        long price,
        AuctionEconomy economy
    );
}
```

### Exemple d'Utilisation

```java
AuctionSellService sellService = auctionPlugin.getSellService();
EconomyManager economyManager = auctionPlugin.getEconomyManager();

// Obtenir l'économie
AuctionEconomy economy = economyManager.getEconomy("vault").orElseThrow();

// Obtenir l'objet du joueur
ItemStack item = player.getInventory().getItemInMainHand();
long price = 5000;

// Valider d'abord (optionnel mais recommandé)
SellValidation validation = sellService.validate(player, item, price, economy);
if (!validation.isValid()) {
    player.sendMessage("Impossible de vendre : " + validation.getReason());
    return;
}

// Vendre l'objet
sellService.sell(player, item, price, economy)
    .thenAccept(result -> {
        Bukkit.getScheduler().runTask(plugin, () -> {
            if (result.isSuccess()) {
                // Retirer l'objet du joueur
                player.getInventory().setItemInMainHand(null);
                player.sendMessage("Mis en vente pour " + price + " !");
            } else {
                player.sendMessage("Échec : " + result.getMessage());
            }
        });
    });
```

### SellResult

```java
public interface SellResult {
    boolean isSuccess();
    String getMessage();
    Optional<AuctionItem> getAuctionItem();
    SellFailReason getFailReason(); // NULL si succès
}

public enum SellFailReason {
    NO_PERMISSION,
    LIMIT_REACHED,
    PRICE_TOO_LOW,
    PRICE_TOO_HIGH,
    ITEM_BLACKLISTED,
    COOLDOWN,
    CANCELLED_BY_EVENT,
    DATABASE_ERROR
}
```

## AuctionPurchaseService

Gère les achats d'objets.

### Interface

```java
public interface AuctionPurchaseService {

    /**
     * Acheter un objet.
     *
     * @param buyer Le joueur acheteur
     * @param auctionItem L'objet à acheter
     * @return CompletableFuture avec le résultat
     */
    CompletableFuture<PurchaseResult> purchase(
        Player buyer,
        AuctionItem auctionItem
    );

    /**
     * Vérifier si un joueur peut acheter un objet.
     *
     * @param buyer Le joueur
     * @param auctionItem L'objet
     * @return Résultat de validation
     */
    PurchaseValidation validate(Player buyer, AuctionItem auctionItem);
}
```

### Exemple d'Utilisation

```java
AuctionPurchaseService purchaseService = auctionPlugin.getPurchaseService();
AuctionManager manager = auctionPlugin.getAuctionManager();

// Obtenir l'objet par ID
UUID itemId = UUID.fromString("...");
AuctionItem item = manager.getItem(itemId).orElseThrow();

// Valider
PurchaseValidation validation = purchaseService.validate(player, item);
if (!validation.isValid()) {
    player.sendMessage("Impossible d'acheter : " + validation.getReason());
    return;
}

// Acheter
purchaseService.purchase(player, item)
    .thenAccept(result -> {
        Bukkit.getScheduler().runTask(plugin, () -> {
            if (result.isSuccess()) {
                // Donner l'objet au joueur ou l'ajouter à récupérer
                if (result.isItemGiven()) {
                    player.sendMessage("Acheté ! Objet ajouté à l'inventaire.");
                } else {
                    player.sendMessage("Acheté ! Récupérez depuis /ah purchased.");
                }
            } else {
                player.sendMessage("Échec : " + result.getMessage());
            }
        });
    });
```

### PurchaseResult

```java
public interface PurchaseResult {
    boolean isSuccess();
    String getMessage();
    boolean isItemGiven(); // true si ajouté à l'inventaire, false si à récupérer
    PurchaseFailReason getFailReason();
}

public enum PurchaseFailReason {
    ITEM_NOT_FOUND,
    ITEM_ALREADY_SOLD,
    NOT_ENOUGH_MONEY,
    OWN_ITEM,
    COOLDOWN,
    CANCELLED_BY_EVENT,
    DATABASE_ERROR
}
```

## AuctionRemoveService

Gère la suppression d'objets des ventes.

### Interface

```java
public interface AuctionRemoveService {

    /**
     * Retirer un objet en vente (retourner au vendeur).
     *
     * @param player Le propriétaire
     * @param auctionItem L'objet à retirer
     * @return CompletableFuture avec le résultat
     */
    CompletableFuture<RemoveResult> removeListedItem(
        Player player,
        AuctionItem auctionItem
    );

    /**
     * Récupérer un objet expiré.
     *
     * @param player Le propriétaire
     * @param auctionItem L'objet expiré
     * @return CompletableFuture avec le résultat
     */
    CompletableFuture<RemoveResult> claimExpiredItem(
        Player player,
        AuctionItem auctionItem
    );

    /**
     * Récupérer un objet acheté.
     *
     * @param player L'acheteur
     * @param auctionItem L'objet acheté
     * @return CompletableFuture avec le résultat
     */
    CompletableFuture<RemoveResult> claimPurchasedItem(
        Player player,
        AuctionItem auctionItem
    );

    /**
     * Récupérer tous les objets expirés d'un joueur.
     *
     * @param player Le propriétaire
     * @return CompletableFuture avec le nombre d'objets récupérés
     */
    CompletableFuture<Integer> claimAllExpiredItems(Player player);

    /**
     * Récupérer tous les objets achetés d'un joueur.
     *
     * @param player L'acheteur
     * @return CompletableFuture avec le nombre d'objets récupérés
     */
    CompletableFuture<Integer> claimAllPurchasedItems(Player player);
}
```

### Exemple d'Utilisation

```java
AuctionRemoveService removeService = auctionPlugin.getRemoveService();

// Retirer un objet en vente
removeService.removeListedItem(player, auctionItem)
    .thenAccept(result -> {
        Bukkit.getScheduler().runTask(plugin, () -> {
            if (result.isSuccess()) {
                player.sendMessage("Objet retiré et retourné à l'inventaire.");
            }
        });
    });

// Récupérer tous les objets expirés
removeService.claimAllExpiredItems(player)
    .thenAccept(count -> {
        Bukkit.getScheduler().runTask(plugin, () -> {
            player.sendMessage("Récupéré " + count + " objets expirés.");
        });
    });
```

## AuctionExpireService

Gère l'expiration automatique des objets.

### Interface

```java
public interface AuctionExpireService {

    /**
     * Expirer manuellement un objet.
     *
     * @param auctionItem L'objet à expirer
     * @return CompletableFuture avec le résultat
     */
    CompletableFuture<Boolean> expireItem(AuctionItem auctionItem);

    /**
     * Expirer tous les objets d'un joueur.
     *
     * @param playerUuid UUID du joueur
     * @return CompletableFuture avec le nombre d'objets expirés
     */
    CompletableFuture<Integer> expireAllItems(UUID playerUuid);

    /**
     * Vérifier les objets expirés et les traiter.
     * Appelé automatiquement par le plugin.
     */
    void checkExpiredItems();
}
```

### Exemple d'Utilisation (Fonction Admin)

```java
AuctionExpireService expireService = auctionPlugin.getExpireService();

// Expirer tous les objets d'un joueur (action admin)
UUID targetUuid = Bukkit.getOfflinePlayer("NomJoueur").getUniqueId();

expireService.expireAllItems(targetUuid)
    .thenAccept(count -> {
        sender.sendMessage("Expiré " + count + " objets du joueur.");
    });
```

## Gestion des Erreurs

Tous les services retournent des CompletableFutures. Gérez les erreurs correctement :

```java
sellService.sell(player, item, price, economy)
    .thenAccept(result -> {
        // Gérer succès/échec
    })
    .exceptionally(throwable -> {
        // Gérer les erreurs inattendues
        plugin.getLogger().severe("Erreur lors de la vente : " + throwable.getMessage());
        Bukkit.getScheduler().runTask(plugin, () -> {
            player.sendMessage("Une erreur est survenue. Veuillez réessayer.");
        });
        return null;
    });
```

## Thread Safety

Toutes les méthodes des services sont thread-safe. Les résultats sont livrés sur des threads asynchrones, utilisez donc `Bukkit.getScheduler().runTask()` lors de l'interaction avec l'API Bukkit :

```java
purchaseService.purchase(player, item)
    .thenAccept(result -> {
        // Ceci s'exécute sur un thread asynchrone
        Bukkit.getScheduler().runTask(plugin, () -> {
            // Safe pour utiliser l'API Bukkit ici
            player.sendMessage("...");
            player.getInventory().addItem(item.getItemStack());
        });
    });
```
