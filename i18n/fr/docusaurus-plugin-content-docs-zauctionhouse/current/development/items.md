---
sidebar_position: 4
title: Objets
description: Travailler avec les interfaces Item et AuctionItem dans zAuctionHouse
---

# Objets

zAuctionHouse utilise une couche d'abstraction propre pour les objets. Comprendre les interfaces `Item` et `AuctionItem` est essentiel pour l'intégration API.

## Interface Item

L'interface de base `Item` représente tout objet dans le système :

```java
public interface Item {

    /**
     * Obtenir l'identifiant unique de cet objet.
     */
    UUID getUniqueId();

    /**
     * Obtenir l'ItemStack Bukkit.
     */
    ItemStack getItemStack();

    /**
     * Obtenir le type d'objet (quel type de stockage).
     */
    ItemType getType();

    /**
     * Obtenir le type de stockage actuel (où l'objet est stocké).
     */
    StorageType getStorageType();

    /**
     * Obtenir l'UUID du propriétaire.
     */
    UUID getOwnerUuid();

    /**
     * Obtenir la date de création de l'objet.
     */
    Instant getCreatedAt();
}
```

## Interface AuctionItem

`AuctionItem` étend `Item` avec des données spécifiques aux enchères :

```java
public interface AuctionItem extends Item {

    /**
     * Obtenir l'UUID du vendeur.
     */
    UUID getSellerUuid();

    /**
     * Obtenir le nom du vendeur (en cache).
     */
    String getSellerName();

    /**
     * Obtenir le prix de vente.
     */
    long getPrice();

    /**
     * Obtenir le prix actuel (après réductions).
     */
    long getCurrentPrice();

    /**
     * Obtenir l'économie utilisée pour cet objet.
     */
    AuctionEconomy getEconomy();

    /**
     * Obtenir le nom de l'économie.
     */
    String getEconomyName();

    /**
     * Obtenir la date de mise en vente.
     */
    Instant getListedAt();

    /**
     * Obtenir la date d'expiration.
     */
    Instant getExpiresAt();

    /**
     * Vérifier si l'objet a expiré.
     */
    boolean isExpired();

    /**
     * Obtenir la catégorie de l'objet.
     */
    Optional<Category> getCategory();

    /**
     * Obtenir le nom de la catégorie.
     */
    String getCategoryName();

    /**
     * Obtenir le statut de l'objet.
     */
    ItemStatus getStatus();

    /**
     * Obtenir l'UUID de l'acheteur (si vendu).
     */
    Optional<UUID> getBuyerUuid();

    /**
     * Obtenir la date d'achat (si vendu).
     */
    Optional<Instant> getPurchasedAt();
}
```

## Enum ItemType

Définit le type d'objet :

```java
public enum ItemType {
    /**
     * Objet d'enchère standard mis en vente.
     */
    AUCTION,

    /**
     * Réservé pour utilisation future (système d'enchères).
     */
    BID,

    /**
     * Réservé pour utilisation future (ordres d'achat).
     */
    BUY_ORDER
}
```

## Enum StorageType

Définit où l'objet est actuellement stocké :

```java
public enum StorageType {
    /**
     * L'objet est activement en vente.
     */
    LISTED,

    /**
     * L'objet a expiré et attend d'être récupéré par le vendeur.
     */
    EXPIRED,

    /**
     * L'objet a été acheté et attend d'être récupéré par l'acheteur.
     */
    PURCHASED,

    /**
     * L'objet a été retourné au vendeur (retiré de la vente).
     */
    RETURNED,

    /**
     * L'objet a été livré à l'acheteur.
     */
    DELIVERED
}
```

## Enum ItemStatus

Le statut actuel d'un objet :

```java
public enum ItemStatus {
    /**
     * L'objet est disponible à l'achat.
     */
    ACTIVE,

    /**
     * L'objet a été acheté.
     */
    SOLD,

    /**
     * L'objet a expiré.
     */
    EXPIRED,

    /**
     * L'objet a été retiré par le propriétaire.
     */
    REMOVED,

    /**
     * L'objet a été récupéré.
     */
    CLAIMED
}
```

## Travailler avec les AuctionItems

### Obtenir les Informations d'un Objet

```java
AuctionItem item = ...; // Depuis un événement ou le manager

// Infos de base
UUID itemId = item.getUniqueId();
ItemStack stack = item.getItemStack();
String seller = item.getSellerName();
long price = item.getCurrentPrice();

// Timing
Instant listed = item.getListedAt();
Instant expires = item.getExpiresAt();
boolean isExpired = item.isExpired();

// Temps jusqu'à l'expiration
Duration timeLeft = Duration.between(Instant.now(), expires);
long hoursLeft = timeLeft.toHours();

// Catégorie
String category = item.getCategoryName();
```

### Vérifier le Statut d'un Objet

```java
// Vérifier si l'objet est toujours disponible
if (item.getStatus() == ItemStatus.ACTIVE) {
    // Peut être acheté
}

// Vérifier l'emplacement de stockage
switch (item.getStorageType()) {
    case LISTED:
        // Visible dans l'hôtel des ventes
        break;
    case EXPIRED:
        // Dans les objets expirés du vendeur
        break;
    case PURCHASED:
        // En attente de récupération par l'acheteur
        break;
}

// Vérifier si vendu
if (item.getBuyerUuid().isPresent()) {
    UUID buyer = item.getBuyerUuid().get();
    Instant purchaseTime = item.getPurchasedAt().get();
}
```

### Recherche et Filtrage

```java
AuctionManager manager = auctionPlugin.getAuctionManager();

// Obtenir tous les objets actifs
List<AuctionItem> allItems = manager.getListedItems();

// Filtrer par plage de prix
List<AuctionItem> affordable = allItems.stream()
    .filter(item -> item.getCurrentPrice() <= 10000)
    .collect(Collectors.toList());

// Filtrer par catégorie
List<AuctionItem> weapons = allItems.stream()
    .filter(item -> "weapons".equals(item.getCategoryName()))
    .collect(Collectors.toList());

// Filtrer par économie
List<AuctionItem> vaultItems = allItems.stream()
    .filter(item -> "vault".equals(item.getEconomyName()))
    .collect(Collectors.toList());

// Filtrer par vendeur
UUID targetSeller = ...;
List<AuctionItem> sellerItems = manager.getListedItems(targetSeller);

// Trier par prix
List<AuctionItem> sorted = allItems.stream()
    .sorted(Comparator.comparingLong(AuctionItem::getCurrentPrice))
    .collect(Collectors.toList());

// Trier par plus récent
List<AuctionItem> newest = allItems.stream()
    .sorted(Comparator.comparing(AuctionItem::getListedAt).reversed())
    .collect(Collectors.toList());
```

### Afficher les Informations d'un Objet

```java
public void displayItem(Player player, AuctionItem item) {
    ItemStack stack = item.getItemStack();

    player.sendMessage("§6Objet : §f" + getItemName(stack));
    player.sendMessage("§6Quantité : §f" + stack.getAmount());
    player.sendMessage("§6Vendeur : §f" + item.getSellerName());
    player.sendMessage("§6Prix : §f" + item.getCurrentPrice() + " " + item.getEconomyName());
    player.sendMessage("§6Catégorie : §f" + item.getCategoryName());

    // Temps restant
    if (!item.isExpired()) {
        Duration remaining = Duration.between(Instant.now(), item.getExpiresAt());
        player.sendMessage("§6Expire dans : §f" + formatDuration(remaining));
    } else {
        player.sendMessage("§cExpiré");
    }
}

private String getItemName(ItemStack item) {
    if (item.hasItemMeta() && item.getItemMeta().hasDisplayName()) {
        return item.getItemMeta().getDisplayName();
    }
    return item.getType().name();
}

private String formatDuration(Duration duration) {
    long hours = duration.toHours();
    long minutes = duration.toMinutesPart();
    if (hours > 24) {
        return (hours / 24) + "j " + (hours % 24) + "h";
    }
    return hours + "h " + minutes + "m";
}
```

## Créer des Requêtes Personnalisées

```java
public class AuctionQueries {

    private final AuctionManager manager;

    public AuctionQueries(AuctionPlugin plugin) {
        this.manager = plugin.getAuctionManager();
    }

    /**
     * Obtenir les objets les plus chers.
     */
    public List<AuctionItem> getMostExpensive(int limit) {
        return manager.getListedItems().stream()
            .sorted(Comparator.comparingLong(AuctionItem::getCurrentPrice).reversed())
            .limit(limit)
            .collect(Collectors.toList());
    }

    /**
     * Obtenir les objets qui expirent bientôt.
     */
    public List<AuctionItem> getExpiringSoon(Duration within) {
        Instant threshold = Instant.now().plus(within);
        return manager.getListedItems().stream()
            .filter(item -> item.getExpiresAt().isBefore(threshold))
            .sorted(Comparator.comparing(AuctionItem::getExpiresAt))
            .collect(Collectors.toList());
    }

    /**
     * Obtenir les objets par type de matériau.
     */
    public List<AuctionItem> getByMaterial(Material material) {
        return manager.getListedItems().stream()
            .filter(item -> item.getItemStack().getType() == material)
            .collect(Collectors.toList());
    }

    /**
     * Obtenir la valeur totale de toutes les ventes.
     */
    public Map<String, Long> getTotalValueByEconomy() {
        return manager.getListedItems().stream()
            .collect(Collectors.groupingBy(
                AuctionItem::getEconomyName,
                Collectors.summingLong(AuctionItem::getCurrentPrice)
            ));
    }

    /**
     * Obtenir les meilleurs vendeurs par nombre de ventes.
     */
    public Map<UUID, Long> getTopSellers(int limit) {
        return manager.getListedItems().stream()
            .collect(Collectors.groupingBy(
                AuctionItem::getSellerUuid,
                Collectors.counting()
            ))
            .entrySet().stream()
            .sorted(Map.Entry.<UUID, Long>comparingByValue().reversed())
            .limit(limit)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue,
                (e1, e2) -> e1,
                LinkedHashMap::new
            ));
    }
}
```
