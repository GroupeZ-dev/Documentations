---
sidebar_position: 3
title: Événements
description: Système d'événements de zAuctionHouse
---

# Événements

zAuctionHouse fournit un système d'événements complet avec des Pre-Events (annulables) et Post-Events (informatifs).

## Types d'Événements

### Pre-Events

Les Pre-Events se déclenchent **avant** l'exécution d'une action. Ils sont **annulables** - vous pouvez empêcher l'action de se produire.

| Événement | Description |
|-----------|-------------|
| `AuctionPreSellEvent` | Avant la mise en vente d'un objet |
| `AuctionPrePurchaseItemEvent` | Avant l'achat d'un objet |
| `AuctionPreRemoveListedItemEvent` | Avant le retrait d'un objet en vente |
| `AuctionPreRemoveExpiredItemEvent` | Avant la récupération d'un objet expiré |
| `AuctionPreRemovePurchasedItemEvent` | Avant la récupération d'un objet acheté |

### Post-Events

Les Post-Events se déclenchent **après** la finalisation d'une action. Ils ne sont **pas annulables** - utilisez-les pour la journalisation, les notifications ou les intégrations.

| Événement | Description |
|-----------|-------------|
| `AuctionSellEvent` | Après la mise en vente d'un objet |
| `AuctionPurchaseEvent` | Après l'achat d'un objet |
| `AuctionRemoveListedItemEvent` | Après le retrait d'un objet en vente |
| `AuctionExpireEvent` | Après l'expiration d'un objet |
| `AuctionClaimExpiredEvent` | Après la récupération d'un objet expiré |
| `AuctionClaimPurchasedEvent` | Après la récupération d'un objet acheté |

## Pre-Events

### AuctionPreSellEvent

Déclenché avant la mise en vente d'un objet.

```java
import fr.maxlego08.zauctionhouse.api.event.AuctionPreSellEvent;

@EventHandler
public void onPreSell(AuctionPreSellEvent event) {
    Player player = event.getPlayer();
    ItemStack item = event.getItemStack();
    long price = event.getPrice();
    AuctionEconomy economy = event.getEconomy();

    // Exemple : Bloquer la vente d'objets enchantés à moins de 1000
    if (item.getEnchantments().size() > 0 && price < 1000) {
        event.setCancelled(true);
        event.setCancelReason("Les objets enchantés doivent être vendus au moins 1000 !");
        return;
    }

    // Exemple : Logger les objets chers
    if (price > 100000) {
        getLogger().info(player.getName() + " met en vente un objet cher : " + item.getType() + " pour " + price);
    }
}
```

**Méthodes Disponibles :**
- `getPlayer()` - Le vendeur
- `getItemStack()` - L'objet en vente
- `getPrice()` - Le prix de vente
- `setPrice(long)` - Modifier le prix
- `getEconomy()` - L'économie utilisée
- `getExpiration()` - Durée d'expiration
- `setExpiration(Duration)` - Modifier l'expiration
- `setCancelled(boolean)` - Annuler la vente
- `setCancelReason(String)` - Définir le message d'annulation

### AuctionPrePurchaseItemEvent

Déclenché avant l'achat d'un objet.

```java
@EventHandler
public void onPrePurchase(AuctionPrePurchaseItemEvent event) {
    Player buyer = event.getBuyer();
    AuctionItem auctionItem = event.getAuctionItem();
    Player seller = event.getSeller(); // Peut être null si hors ligne

    // Exemple : Empêcher l'achat auprès de joueurs blacklistés
    if (isBlacklisted(auctionItem.getSellerUuid())) {
        event.setCancelled(true);
        event.setCancelReason("Ce vendeur est blacklisté !");
        return;
    }

    // Exemple : Nécessiter confirmation pour les objets chers
    if (auctionItem.getPrice() > 50000 && !hasConfirmed(buyer)) {
        event.setCancelled(true);
        event.setCancelReason("Veuillez confirmer l'achat de l'objet cher !");
    }
}
```

**Méthodes Disponibles :**
- `getBuyer()` - Le joueur acheteur
- `getAuctionItem()` - L'objet acheté
- `getSeller()` - Le vendeur (peut être null si hors ligne)
- `getSellerUuid()` - UUID du vendeur (toujours disponible)
- `setCancelled(boolean)` - Annuler l'achat
- `setCancelReason(String)` - Définir le message d'annulation

### AuctionPreRemoveListedItemEvent

Déclenché avant qu'un joueur retire son objet en vente.

```java
@EventHandler
public void onPreRemove(AuctionPreRemoveListedItemEvent event) {
    Player player = event.getPlayer();
    AuctionItem item = event.getAuctionItem();

    // Exemple : Cooldown entre les retraits
    if (isOnCooldown(player)) {
        event.setCancelled(true);
        event.setCancelReason("Veuillez attendre avant de retirer un autre objet !");
    }
}
```

### AuctionPreRemoveExpiredItemEvent

Déclenché avant qu'un joueur récupère un objet expiré.

```java
@EventHandler
public void onPreClaimExpired(AuctionPreRemoveExpiredItemEvent event) {
    Player player = event.getPlayer();
    AuctionItem item = event.getAuctionItem();

    // Exemple : Frais pour récupérer les objets expirés
    double fee = 100;
    if (!economy.has(player, fee)) {
        event.setCancelled(true);
        event.setCancelReason("Vous avez besoin de 100$ pour récupérer les objets expirés !");
    }
}
```

### AuctionPreRemovePurchasedItemEvent

Déclenché avant qu'un joueur récupère un objet acheté.

```java
@EventHandler
public void onPreClaimPurchased(AuctionPreRemovePurchasedItemEvent event) {
    Player player = event.getPlayer();
    AuctionItem item = event.getAuctionItem();

    // Exemple : Vérifier l'espace d'inventaire
    if (player.getInventory().firstEmpty() == -1) {
        event.setCancelled(true);
        event.setCancelReason("Votre inventaire est plein !");
    }
}
```

## Post-Events

### AuctionSellEvent

Déclenché après la mise en vente réussie d'un objet.

```java
import fr.maxlego08.zauctionhouse.api.event.AuctionSellEvent;

@EventHandler
public void onSell(AuctionSellEvent event) {
    Player player = event.getPlayer();
    AuctionItem auctionItem = event.getAuctionItem();

    // Logger dans la base de données
    logSale(
        player.getUniqueId(),
        auctionItem.getItemStack(),
        auctionItem.getPrice()
    );

    // Notification Discord
    sendDiscordMessage(String.format(
        "%s a mis en vente %s pour %d",
        player.getName(),
        auctionItem.getItemStack().getType(),
        auctionItem.getPrice()
    ));
}
```

### AuctionPurchaseEvent

Déclenché après l'achat réussi d'un objet.

```java
import fr.maxlego08.zauctionhouse.api.event.AuctionPurchaseEvent;

@EventHandler
public void onPurchase(AuctionPurchaseEvent event) {
    Player buyer = event.getBuyer();
    AuctionItem item = event.getAuctionItem();
    UUID sellerUuid = event.getSellerUuid();
    long price = event.getPrice();

    // Suivi des statistiques
    incrementStat(sellerUuid, "items_sold");
    incrementStat(buyer.getUniqueId(), "items_bought");
    addMoneyStat(sellerUuid, "money_earned", price);
    addMoneyStat(buyer.getUniqueId(), "money_spent", price);

    // Vérification des succès
    checkAchievement(buyer, "first_purchase");
}
```

### AuctionExpireEvent

Déclenché quand un objet expire automatiquement.

```java
import fr.maxlego08.zauctionhouse.api.event.AuctionExpireEvent;

@EventHandler
public void onExpire(AuctionExpireEvent event) {
    AuctionItem item = event.getAuctionItem();
    UUID ownerUuid = item.getSellerUuid();

    // Notifier le joueur s'il est en ligne
    Player owner = Bukkit.getPlayer(ownerUuid);
    if (owner != null) {
        owner.sendMessage("Votre " + item.getItemStack().getType() + " a expiré !");
    }

    // Logger l'expiration
    logExpiration(item);
}
```

### AuctionRemoveListedItemEvent

Déclenché après le retrait d'un objet en vente par son propriétaire.

```java
@EventHandler
public void onRemove(AuctionRemoveListedItemEvent event) {
    Player player = event.getPlayer();
    AuctionItem item = event.getAuctionItem();

    getLogger().info(player.getName() + " a retiré : " + item.getItemStack().getType());
}
```

## Enregistrer les Listeners

Enregistrez votre listener d'événements comme tout listener Bukkit :

```java
public class MyPlugin extends JavaPlugin implements Listener {

    @Override
    public void onEnable() {
        // Enregistrer les événements
        getServer().getPluginManager().registerEvents(this, this);
    }

    @EventHandler
    public void onAuctionSell(AuctionSellEvent event) {
        // Gérer l'événement
    }

    @EventHandler(priority = EventPriority.HIGH)
    public void onPreSell(AuctionPreSellEvent event) {
        // Gérer le pre-event avec priorité haute
    }
}
```

## Priorités d'Événements

Utilisez les priorités d'événements standard Bukkit :

```java
@EventHandler(priority = EventPriority.LOWEST)
public void onPreSellFirst(AuctionPreSellEvent event) {
    // S'exécute en premier
}

@EventHandler(priority = EventPriority.MONITOR)
public void onPreSellLast(AuctionPreSellEvent event) {
    // S'exécute en dernier, uniquement pour la surveillance
    // Ne pas modifier l'événement ici
}
```

## Exemple Complet

```java
public class AuctionIntegration extends JavaPlugin implements Listener {

    @Override
    public void onEnable() {
        getServer().getPluginManager().registerEvents(this, this);
    }

    // Valider les ventes
    @EventHandler(priority = EventPriority.NORMAL)
    public void onPreSell(AuctionPreSellEvent event) {
        Player player = event.getPlayer();

        // Vérifier permission personnalisée pour objets de haute valeur
        if (event.getPrice() > 100000 && !player.hasPermission("auction.highvalue")) {
            event.setCancelled(true);
            event.setCancelReason("Vous ne pouvez pas mettre en vente des objets à plus de 100 000$ !");
        }
    }

    // Logger toutes les ventes
    @EventHandler
    public void onSell(AuctionSellEvent event) {
        getLogger().info(String.format(
            "[VENTE] %s a mis en vente %s x%d pour %d %s",
            event.getPlayer().getName(),
            event.getAuctionItem().getItemStack().getType(),
            event.getAuctionItem().getItemStack().getAmount(),
            event.getAuctionItem().getPrice(),
            event.getAuctionItem().getEconomy().getName()
        ));
    }

    // Suivre les achats
    @EventHandler
    public void onPurchase(AuctionPurchaseEvent event) {
        // Mettre à jour les classements
        updateLeaderboard("purchases", event.getBuyer().getUniqueId(), 1);
        updateLeaderboard("sales", event.getSellerUuid(), 1);
    }

    // Gérer les expirations
    @EventHandler
    public void onExpire(AuctionExpireEvent event) {
        // Notification par mail pour les joueurs hors ligne
        UUID owner = event.getAuctionItem().getSellerUuid();
        if (Bukkit.getPlayer(owner) == null) {
            sendMail(owner, "Votre objet d'enchère a expiré !");
        }
    }
}
```
