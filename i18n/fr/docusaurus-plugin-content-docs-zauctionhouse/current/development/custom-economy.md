---
sidebar_position: 5
title: Économie Personnalisée
description: Créer des implémentations d'économie personnalisées pour zAuctionHouse
---

# Économie Personnalisée

zAuctionHouse supporte les implémentations d'économie personnalisées. Cela vous permet d'intégrer n'importe quel système de monnaie avec l'hôtel des ventes.

## Interface AuctionEconomy

Pour créer une économie personnalisée, implémentez l'interface `AuctionEconomy` :

```java
public interface AuctionEconomy {

    /**
     * Obtenir le nom unique de cette économie.
     * Utilisé dans la configuration et le stockage.
     */
    String getName();

    /**
     * Obtenir le nom d'affichage (peut inclure des couleurs).
     */
    String getDisplayName();

    /**
     * Vérifier si un joueur a assez de monnaie.
     *
     * @param player Le joueur
     * @param amount Le montant requis
     * @return true si le joueur a assez
     */
    boolean has(OfflinePlayer player, long amount);

    /**
     * Retirer de la monnaie à un joueur.
     *
     * @param player Le joueur
     * @param amount Le montant à retirer
     * @return true si succès
     */
    boolean withdraw(OfflinePlayer player, long amount);

    /**
     * Déposer de la monnaie à un joueur.
     *
     * @param player Le joueur
     * @param amount Le montant à déposer
     * @return true si succès
     */
    boolean deposit(OfflinePlayer player, long amount);

    /**
     * Obtenir le solde actuel du joueur.
     *
     * @param player Le joueur
     * @return Le solde
     */
    long getBalance(OfflinePlayer player);

    /**
     * Formater un montant pour l'affichage.
     *
     * @param amount Le montant
     * @return Chaîne formatée (ex: "1 000$" ou "100 Tokens")
     */
    String format(long amount);

    /**
     * Obtenir l'icône pour cette économie (optionnel).
     * Utilisé dans les affichages d'inventaire.
     */
    default ItemStack getIcon() {
        return new ItemStack(Material.GOLD_INGOT);
    }

    /**
     * Vérifier si cette économie est activée.
     */
    default boolean isEnabled() {
        return true;
    }
}
```

## Exemple : Économie de Tokens

Voici un exemple complet d'économie de tokens personnalisée :

```java
import fr.maxlego08.zauctionhouse.api.economy.AuctionEconomy;
import org.bukkit.Material;
import org.bukkit.OfflinePlayer;
import org.bukkit.inventory.ItemStack;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class TokenEconomy implements AuctionEconomy {

    private final Map<UUID, Long> balances = new HashMap<>();

    @Override
    public String getName() {
        return "tokens";
    }

    @Override
    public String getDisplayName() {
        return "§bTokens";
    }

    @Override
    public boolean has(OfflinePlayer player, long amount) {
        return getBalance(player) >= amount;
    }

    @Override
    public boolean withdraw(OfflinePlayer player, long amount) {
        UUID uuid = player.getUniqueId();
        long balance = getBalance(player);

        if (balance < amount) {
            return false;
        }

        balances.put(uuid, balance - amount);
        return true;
    }

    @Override
    public boolean deposit(OfflinePlayer player, long amount) {
        UUID uuid = player.getUniqueId();
        long balance = getBalance(player);
        balances.put(uuid, balance + amount);
        return true;
    }

    @Override
    public long getBalance(OfflinePlayer player) {
        return balances.getOrDefault(player.getUniqueId(), 0L);
    }

    @Override
    public String format(long amount) {
        return amount + " Tokens";
    }

    @Override
    public ItemStack getIcon() {
        ItemStack icon = new ItemStack(Material.EMERALD);
        // Personnaliser l'icône si nécessaire
        return icon;
    }

    // Méthode personnalisée pour définir le solde (pour commandes admin, etc.)
    public void setBalance(OfflinePlayer player, long amount) {
        balances.put(player.getUniqueId(), amount);
    }
}
```

## Enregistrer Votre Économie

Enregistrez votre économie avec l'`EconomyManager` :

```java
import fr.maxlego08.zauctionhouse.api.AuctionPlugin;
import fr.maxlego08.zauctionhouse.api.economy.EconomyManager;
import org.bukkit.Bukkit;
import org.bukkit.plugin.RegisteredServiceProvider;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private TokenEconomy tokenEconomy;

    @Override
    public void onEnable() {
        // Attendre que zAuctionHouse soit prêt
        Bukkit.getScheduler().runTaskLater(this, this::registerEconomy, 1L);
    }

    private void registerEconomy() {
        // Obtenir l'API zAuctionHouse
        RegisteredServiceProvider<AuctionPlugin> provider =
            Bukkit.getServicesManager().getRegistration(AuctionPlugin.class);

        if (provider == null) {
            getLogger().warning("zAuctionHouse non trouvé !");
            return;
        }

        AuctionPlugin auctionPlugin = provider.getProvider();
        EconomyManager economyManager = auctionPlugin.getEconomyManager();

        // Créer et enregistrer l'économie
        this.tokenEconomy = new TokenEconomy();
        economyManager.registerEconomy(tokenEconomy);

        getLogger().info("Économie Token enregistrée avec zAuctionHouse !");
    }

    public TokenEconomy getTokenEconomy() {
        return tokenEconomy;
    }
}
```

## Exemple : Économie Basée sur les Objets

Un exemple plus complexe utilisant un objet spécifique comme monnaie :

```java
public class DiamondShardEconomy implements AuctionEconomy {

    private final ItemStack currencyItem;

    public DiamondShardEconomy() {
        // Définir l'objet de monnaie
        this.currencyItem = new ItemStack(Material.PRISMARINE_SHARD);
        ItemMeta meta = currencyItem.getItemMeta();
        meta.setDisplayName("§bÉclat de Diamant");
        meta.setLore(Arrays.asList("§7Une monnaie précieuse", "§7utilisée dans l'hôtel des ventes"));
        meta.setCustomModelData(1001); // Custom model optionnel
        currencyItem.setItemMeta(meta);
    }

    @Override
    public String getName() {
        return "diamond_shards";
    }

    @Override
    public String getDisplayName() {
        return "§bÉclats de Diamant";
    }

    @Override
    public boolean has(OfflinePlayer player, long amount) {
        if (!player.isOnline()) return false;
        return countCurrency(player.getPlayer()) >= amount;
    }

    @Override
    public boolean withdraw(OfflinePlayer player, long amount) {
        if (!player.isOnline()) return false;
        Player online = player.getPlayer();

        if (countCurrency(online) < amount) {
            return false;
        }

        return removeCurrency(online, (int) amount);
    }

    @Override
    public boolean deposit(OfflinePlayer player, long amount) {
        if (!player.isOnline()) return false;
        Player online = player.getPlayer();

        ItemStack toGive = currencyItem.clone();
        toGive.setAmount((int) amount);

        HashMap<Integer, ItemStack> leftover = online.getInventory().addItem(toGive);

        // Déposer les objets restants aux pieds du joueur
        for (ItemStack item : leftover.values()) {
            online.getWorld().dropItemNaturally(online.getLocation(), item);
        }

        return true;
    }

    @Override
    public long getBalance(OfflinePlayer player) {
        if (!player.isOnline()) return 0;
        return countCurrency(player.getPlayer());
    }

    @Override
    public String format(long amount) {
        return amount + " Éclat" + (amount != 1 ? "s" : "") + " de Diamant";
    }

    @Override
    public ItemStack getIcon() {
        return currencyItem.clone();
    }

    private long countCurrency(Player player) {
        long count = 0;
        for (ItemStack item : player.getInventory().getContents()) {
            if (item != null && isCurrencyItem(item)) {
                count += item.getAmount();
            }
        }
        return count;
    }

    private boolean removeCurrency(Player player, int amount) {
        int remaining = amount;
        ItemStack[] contents = player.getInventory().getContents();

        for (int i = 0; i < contents.length && remaining > 0; i++) {
            ItemStack item = contents[i];
            if (item != null && isCurrencyItem(item)) {
                int remove = Math.min(item.getAmount(), remaining);
                item.setAmount(item.getAmount() - remove);
                remaining -= remove;

                if (item.getAmount() <= 0) {
                    player.getInventory().setItem(i, null);
                }
            }
        }

        return remaining == 0;
    }

    private boolean isCurrencyItem(ItemStack item) {
        if (item.getType() != currencyItem.getType()) return false;
        if (!item.hasItemMeta()) return false;

        ItemMeta meta = item.getItemMeta();
        ItemMeta expected = currencyItem.getItemMeta();

        // Vérifier le custom model data
        if (expected.hasCustomModelData()) {
            if (!meta.hasCustomModelData()) return false;
            if (meta.getCustomModelData() != expected.getCustomModelData()) return false;
        }

        // Vérifier le nom d'affichage
        if (expected.hasDisplayName()) {
            if (!meta.hasDisplayName()) return false;
            if (!meta.getDisplayName().equals(expected.getDisplayName())) return false;
        }

        return true;
    }
}
```

## Fichier de Configuration

Créez un fichier de configuration pour votre économie dans `economies/` :

```yaml
# economies/tokens.yml
enabled: true
name: "Tokens"

icon:
  material: EMERALD
  name: "&bTokens"
  lore:
    - "&7Monnaie de tokens personnalisée"

price:
  min: 1
  max: 1000000

tax:
  enabled: false

auto-claim:
  enabled: true
```

## Bonnes Pratiques

1. **Thread Safety** : Assurez-vous que votre implémentation est thread-safe si vous utilisez des opérations asynchrones.

2. **Support Hors Ligne** : Considérez ce qui se passe quand un joueur est hors ligne. Pour les économies basées sur les objets, vous devrez peut-être stocker les dépôts en attente.

3. **Journalisation** : Journalisez les transactions pour le débogage :

```java
@Override
public boolean withdraw(OfflinePlayer player, long amount) {
    boolean success = doWithdraw(player, amount);
    if (success) {
        plugin.getLogger().info(String.format(
            "Retiré %d %s de %s",
            amount, getName(), player.getName()
        ));
    }
    return success;
}
```

4. **Validation** : Validez les montants avant le traitement :

```java
@Override
public boolean withdraw(OfflinePlayer player, long amount) {
    if (amount <= 0) {
        throw new IllegalArgumentException("Le montant doit être positif");
    }
    // ...
}
```

5. **Gestion des Erreurs** : Gérez les cas limites gracieusement :

```java
@Override
public boolean deposit(OfflinePlayer player, long amount) {
    try {
        // Logique de dépôt
        return true;
    } catch (Exception e) {
        plugin.getLogger().severe("Échec du dépôt : " + e.getMessage());
        return false;
    }
}
```

## Tester Votre Économie

Testez votre économie minutieusement :

```java
// Exemple de test unitaire
@Test
public void testWithdrawDeposit() {
    TokenEconomy economy = new TokenEconomy();
    OfflinePlayer player = mockPlayer();

    // Solde initial
    assertEquals(0, economy.getBalance(player));

    // Dépôt
    assertTrue(economy.deposit(player, 1000));
    assertEquals(1000, economy.getBalance(player));

    // Retrait
    assertTrue(economy.withdraw(player, 500));
    assertEquals(500, economy.getBalance(player));

    // Fonds insuffisants
    assertFalse(economy.withdraw(player, 1000));
    assertEquals(500, economy.getBalance(player));
}
```
