---
sidebar_position: 5
title: Custom Economy
description: Create custom economy implementations for zAuctionHouse
---

# Custom Economy

zAuctionHouse supports custom economy implementations. This allows you to integrate any currency system with the auction house.

## Requirements

Your plugin must load **before** zAuctionHouse. Add the following to your `plugin.yml`:

```yaml
loadbefore:
  - zAuctionHouse
```

## AuctionEconomy Interface

To create a custom economy, implement the `AuctionEconomy` interface:

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

## Registering Your Economy

Register your economy using the `AuctionLoadEconomyEvent`. This event provides access to the `EconomyManager` which allows you to register your custom economy.

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
            // Economy registered successfully
        }
    }
}
```

## Example: Vault Economy

Here's a complete example integrating Vault as a custom economy:

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
        return "Money";
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
        return "zAuctionHouse sale";
    }

    @Override
    public String getWithdrawReason() {
        return "zAuctionHouse purchase";
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

## Main Plugin Class

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
