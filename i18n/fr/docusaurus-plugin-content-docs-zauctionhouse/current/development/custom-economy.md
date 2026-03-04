---
sidebar_position: 5
title: Économie Personnalisée
description: Créer des implémentations d'économie personnalisées pour zAuctionHouse
---

# Économie Personnalisée

zAuctionHouse supporte les implémentations d'économie personnalisées. Cela vous permet d'intégrer n'importe quel système de monnaie avec l'hôtel des ventes.

## Prérequis

Votre plugin doit se charger **avant** zAuctionHouse. Ajoutez ceci à votre `plugin.yml` :

```yaml
loadbefore:
  - zAuctionHouse
```

## Interface AuctionEconomy

Pour créer une économie personnalisée, implémentez l'interface `AuctionEconomy` :

```java
public interface AuctionEconomy {

    String getName();

    String getDisplayName();

    String getSymbol();

    String getFormat();

    default String format(String priceAsString, long amount) {
        return getFormat().replace("%price%", priceAsString).replace("%s%", amount > 1 ? "s" : "");
    }

    CompletableFuture<BigDecimal> get(OfflinePlayer offlinePlayer);

    CompletableFuture<Boolean> has(OfflinePlayer offlinePlayer, BigDecimal price);

    default boolean hasSync(Player player, BigDecimal price) {
        return has(player, price).join();
    }

    void deposit(OfflinePlayer offlinePlayer, BigDecimal value, String reason);

    void withdraw(OfflinePlayer offlinePlayer, BigDecimal value, String reason);

    String getDepositReason();

    String getWithdrawReason();

    @Nullable
    String getPermission();

    PriceFormat getPriceFormat();

    boolean isAutoClaim();

    boolean mustBeOnline();

    BigDecimal getMaxPrice(ItemType itemType);

    BigDecimal getMinPrice(ItemType itemType);

    TaxConfiguration getTaxConfiguration();
}
```

## Enregistrer Votre Économie

Enregistrez votre économie en utilisant l'événement `AuctionLoadEconomyEvent`. Cet événement fournit l'accès au `EconomyManager` qui vous permet d'enregistrer votre économie personnalisée.

```java
import fr.maxlego08.zauctionhouse.api.event.AuctionLoadEconomyEvent;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class EconomyListener implements Listener {

    private final MyEconomy myEconomy;

    public EconomyListener(MyEconomy myEconomy) {
        this.myEconomy = myEconomy;
    }

    @EventHandler
    public void onLoadEconomy(AuctionLoadEconomyEvent event) {
        boolean success = event.getEconomyManager().registerEconomy(this.myEconomy);
        if (success) {
            // Économie enregistrée avec succès
        }
    }
}
```

## Exemple : Économie Vault

Voici un exemple complet intégrant Vault comme économie personnalisée :

```java
import fr.maxlego08.zauctionhouse.api.economy.AuctionEconomy;
import fr.maxlego08.zauctionhouse.api.economy.PriceFormat;
import fr.maxlego08.zauctionhouse.api.economy.TaxConfiguration;
import fr.maxlego08.zauctionhouse.api.item.ItemType;
import net.milkbowl.vault.economy.Economy;
import org.bukkit.OfflinePlayer;
import org.bukkit.plugin.RegisteredServiceProvider;

import java.math.BigDecimal;
import java.util.concurrent.CompletableFuture;

public class VaultEconomy implements AuctionEconomy {

    private final Economy economy;

    public VaultEconomy() {
        RegisteredServiceProvider<Economy> provider =
            Bukkit.getServicesManager().getRegistration(Economy.class);
        this.economy = provider != null ? provider.getProvider() : null;
    }

    @Override
    public String getName() {
        return "vault";
    }

    @Override
    public String getDisplayName() {
        return "Argent";
    }

    @Override
    public String getSymbol() {
        return "$";
    }

    @Override
    public String getFormat() {
        return "%price%$";
    }

    @Override
    public CompletableFuture<BigDecimal> get(OfflinePlayer offlinePlayer) {
        return CompletableFuture.completedFuture(
            BigDecimal.valueOf(this.economy.getBalance(offlinePlayer))
        );
    }

    @Override
    public CompletableFuture<Boolean> has(OfflinePlayer offlinePlayer, BigDecimal price) {
        return CompletableFuture.completedFuture(
            this.economy.has(offlinePlayer, price.doubleValue())
        );
    }

    @Override
    public void deposit(OfflinePlayer offlinePlayer, BigDecimal value, String reason) {
        this.economy.depositPlayer(offlinePlayer, value.doubleValue());
    }

    @Override
    public void withdraw(OfflinePlayer offlinePlayer, BigDecimal value, String reason) {
        this.economy.withdrawPlayer(offlinePlayer, value.doubleValue());
    }

    @Override
    public String getDepositReason() {
        return "Vente zAuctionHouse";
    }

    @Override
    public String getWithdrawReason() {
        return "Achat zAuctionHouse";
    }

    @Override
    public String getPermission() {
        return null;
    }

    @Override
    public PriceFormat getPriceFormat() {
        return PriceFormat.FORMATTED;
    }

    @Override
    public boolean isAutoClaim() {
        return true;
    }

    @Override
    public boolean mustBeOnline() {
        return false;
    }

    @Override
    public BigDecimal getMaxPrice(ItemType itemType) {
        return BigDecimal.valueOf(1000000000);
    }

    @Override
    public BigDecimal getMinPrice(ItemType itemType) {
        return BigDecimal.ONE;
    }

    @Override
    public TaxConfiguration getTaxConfiguration() {
        return TaxConfiguration.empty();
    }
}
```

## Classe Plugin Principale

```java
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        VaultEconomy vaultEconomy = new VaultEconomy();
        getServer().getPluginManager().registerEvents(
            new EconomyListener(vaultEconomy),
            this
        );
    }
}
```
