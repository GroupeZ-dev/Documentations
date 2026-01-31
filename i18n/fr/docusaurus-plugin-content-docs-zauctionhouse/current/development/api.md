---
sidebar_position: 1
title: Introduction à l'API
description: Démarrer avec l'API Développeur de zAuctionHouse
---

# API Développeur

zAuctionHouse fournit une API complète pour les développeurs souhaitant s'intégrer au système d'enchères.

## Architecture

zAuctionHouse est construit avec une architecture modulaire :

```
zAuctionHouse/
├── API         # Interfaces et classes abstraites
├── Core        # Implémentation
└── Hooks       # Intégrations tierces
```

Cette séparation vous permet de dépendre uniquement du module API, gardant votre plugin léger.

## Configuration Maven

Ajoutez le repository JitPack :

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
```

Ajoutez la dépendance :

```xml
<dependencies>
    <dependency>
        <groupId>com.github.Maxlego08</groupId>
        <artifactId>zAuctionHouse-API</artifactId>
        <version>4.0.0</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

## Configuration Gradle

Ajoutez le repository JitPack :

```groovy
repositories {
    maven { url 'https://jitpack.io' }
}
```

Ajoutez la dépendance :

```groovy
dependencies {
    compileOnly 'com.github.Maxlego08:zAuctionHouse-API:4.0.0'
}
```

## Obtenir l'API

Accédez à l'API via le gestionnaire de services Bukkit :

```java
import fr.maxlego08.zauctionhouse.api.AuctionPlugin;
import fr.maxlego08.zauctionhouse.api.AuctionManager;
import org.bukkit.Bukkit;
import org.bukkit.plugin.RegisteredServiceProvider;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private AuctionPlugin auctionPlugin;

    @Override
    public void onEnable() {
        // Obtenir l'API zAuctionHouse
        RegisteredServiceProvider<AuctionPlugin> provider =
            Bukkit.getServicesManager().getRegistration(AuctionPlugin.class);

        if (provider == null) {
            getLogger().severe("zAuctionHouse non trouvé !");
            getServer().getPluginManager().disablePlugin(this);
            return;
        }

        this.auctionPlugin = provider.getProvider();
        getLogger().info("Connecté avec succès à zAuctionHouse !");
    }

    public AuctionPlugin getAuctionPlugin() {
        return auctionPlugin;
    }
}
```

## Interfaces Principales

### AuctionPlugin

Le point d'entrée principal de l'API :

```java
public interface AuctionPlugin {

    // Obtenir le gestionnaire d'enchères
    AuctionManager getAuctionManager();

    // Obtenir le gestionnaire d'économie
    EconomyManager getEconomyManager();

    // Obtenir le gestionnaire de catégories
    CategoryManager getCategoryManager();

    // Obtenir le gestionnaire de configuration
    ConfigurationManager getConfigurationManager();

    // Obtenir le service de vente
    AuctionSellService getSellService();

    // Obtenir le service d'achat
    AuctionPurchaseService getPurchaseService();

    // Obtenir le service de suppression
    AuctionRemoveService getRemoveService();

    // Obtenir le service d'expiration
    AuctionExpireService getExpireService();
}
```

### AuctionManager

Opérations principales des enchères :

```java
public interface AuctionManager {

    // Obtenir tous les objets en vente
    List<AuctionItem> getListedItems();

    // Obtenir les objets par joueur
    List<AuctionItem> getListedItems(UUID playerUuid);

    // Obtenir les objets par catégorie
    List<AuctionItem> getListedItems(Category category);

    // Obtenir les objets expirés d'un joueur
    List<AuctionItem> getExpiredItems(UUID playerUuid);

    // Obtenir les objets achetés à récupérer
    List<AuctionItem> getPurchasedItems(UUID playerUuid);

    // Obtenir un objet par ID
    Optional<AuctionItem> getItem(UUID itemId);

    // Rechercher des objets
    List<AuctionItem> search(String query);

    // Obtenir le nombre d'objets en vente d'un joueur
    int getListingCount(UUID playerUuid);

    // Obtenir la limite de mise en vente d'un joueur
    int getListingLimit(Player player);
}
```

## Exemples Rapides

### Lister Tous les Objets

```java
AuctionManager manager = auctionPlugin.getAuctionManager();
List<AuctionItem> items = manager.getListedItems();

for (AuctionItem item : items) {
    getLogger().info(String.format(
        "Objet: %s, Prix: %d, Vendeur: %s",
        item.getItemStack().getType(),
        item.getPrice(),
        item.getSellerName()
    ));
}
```

### Obtenir les Statistiques d'un Joueur

```java
UUID playerUuid = player.getUniqueId();
AuctionManager manager = auctionPlugin.getAuctionManager();

int listed = manager.getListingCount(playerUuid);
int expired = manager.getExpiredItems(playerUuid).size();
int toClaim = manager.getPurchasedItems(playerUuid).size();

player.sendMessage(String.format(
    "En vente: %d, Expirés: %d, À récupérer: %d",
    listed, expired, toClaim
));
```

### Vendre un Objet par Programmation

```java
AuctionSellService sellService = auctionPlugin.getSellService();
EconomyManager economyManager = auctionPlugin.getEconomyManager();

// Obtenir l'économie Vault
AuctionEconomy economy = economyManager.getEconomy("vault")
    .orElseThrow(() -> new IllegalStateException("Vault non trouvé"));

// Vendre l'objet dans la main du joueur
ItemStack itemStack = player.getInventory().getItemInMainHand();
long price = 1000;

sellService.sell(player, itemStack, price, economy)
    .thenAccept(result -> {
        if (result.isSuccess()) {
            player.sendMessage("Objet mis en vente avec succès !");
        } else {
            player.sendMessage("Échec : " + result.getMessage());
        }
    });
```

## Opérations Asynchrones

Toutes les opérations API qui interagissent avec la base de données retournent des `CompletableFuture` :

```java
// Exemple d'opération asynchrone
auctionPlugin.getSellService()
    .sell(player, item, price, economy)
    .thenAccept(result -> {
        // Gérer le résultat sur le thread principal si nécessaire
        Bukkit.getScheduler().runTask(plugin, () -> {
            player.sendMessage(result.getMessage());
        });
    })
    .exceptionally(throwable -> {
        getLogger().severe("Erreur lors de la vente : " + throwable.getMessage());
        return null;
    });
```

## JavaDoc

La documentation complète de l'API est disponible sur :
[javadocs.groupez.dev/zauctionhouse](https://javadocs.groupez.dev/zauctionhouse)

## Prochaines Étapes

- [Services](./services) - Découvrir l'architecture basée sur les services
- [Événements](./events) - Écouter les événements d'enchères
- [Objets](./items) - Travailler avec les interfaces Item et AuctionItem
- [Économie Personnalisée](./custom-economy) - Créer des implémentations d'économie personnalisées
