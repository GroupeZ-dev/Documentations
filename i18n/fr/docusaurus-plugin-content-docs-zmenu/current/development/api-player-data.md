---
sidebar_position: 5
title: API Donnees Joueur
description: Travailler avec le stockage des donnees joueur dans zMenu
---

# API Donnees Joueur

Apprenez a travailler avec le systeme de stockage des donnees joueur de zMenu par programmation.

## Vue d'Ensemble

zMenu fournit un systeme de stockage de donnees integre qui persiste les valeurs specifiques aux joueurs. Ces donnees sont :
- Stockees dans une base de donnees (SQLite, MySQL ou MariaDB)
- Accessibles via des placeholders (`%zmenu_player_value_<cle>%`)
- Persistantes apres les redemarrages du serveur
- Disponibles via l'API

## DataManager

Obtenez le gestionnaire de donnees pour travailler avec les donnees joueur :

```java
DataManager dataManager = menuPlugin.getDataManager();
```

## Lire des Donnees

### Obtenir une Valeur Unique

```java
// Retourne Optional<String>
Optional<String> value = dataManager.getData(player, "coins");

// Verifier et utiliser la valeur
if (value.isPresent()) {
    int coins = Integer.parseInt(value.get());
    player.sendMessage("Vous avez " + coins + " pieces");
} else {
    player.sendMessage("Aucune donnee de pieces trouvee");
}
```

### Obtenir avec une Valeur par Defaut

```java
String coins = dataManager.getData(player, "coins").orElse("0");
int coinAmount = Integer.parseInt(coins);
```

### Obtenir par UUID

```java
UUID uuid = player.getUniqueId();
Optional<String> value = dataManager.getData(uuid, "coins");
```

### Verifier Si une Donnee Existe

```java
boolean hasCoins = dataManager.getData(player, "coins").isPresent();
```

## Ecrire des Donnees

### Definir une Valeur

```java
// Definir une valeur de chaine
dataManager.setData(player, "coins", "100");

// Definir une valeur numerique (en tant que chaine)
dataManager.setData(player, "level", String.valueOf(5));

// Definir un booleen (en tant que chaine)
dataManager.setData(player, "premium", "true");
```

### Ajouter a une Valeur Numerique

```java
// Ajouter 50 a la valeur actuelle
dataManager.addData(player, "coins", 50);
```

### Soustraire d'une Valeur

```java
// Soustraire en ajoutant une valeur negative
dataManager.addData(player, "coins", -25);
```

### Supprimer des Donnees

```java
// Supprimer une cle specifique pour un joueur
dataManager.removeData(player, "coins");
```

## Operations en Masse

### Obtenir Toutes les Cles pour un Joueur

```java
// Cette fonctionnalite depend de l'implementation
// Generalement, vous suivriez vos propres cles
List<String> knownKeys = Arrays.asList("coins", "level", "premium", "last-login");

for (String key : knownKeys) {
    dataManager.getData(player, key).ifPresent(value -> {
        player.sendMessage(key + " : " + value);
    });
}
```

## Exemple Complet : Systeme de Monnaie

```java
package com.example.currency;

import fr.maxlego08.menu.api.MenuPlugin;
import fr.maxlego08.menu.api.DataManager;
import org.bukkit.entity.Player;

public class CurrencyManager {

    private final DataManager dataManager;
    private static final String COINS_KEY = "coins";

    public CurrencyManager(MenuPlugin menuPlugin) {
        this.dataManager = menuPlugin.getDataManager();
    }

    public int getCoins(Player player) {
        return dataManager.getData(player, COINS_KEY)
            .map(Integer::parseInt)
            .orElse(0);
    }

    public void setCoins(Player player, int amount) {
        dataManager.setData(player, COINS_KEY, String.valueOf(Math.max(0, amount)));
    }

    public void addCoins(Player player, int amount) {
        int current = getCoins(player);
        setCoins(player, current + amount);
    }

    public boolean removeCoins(Player player, int amount) {
        int current = getCoins(player);
        if (current >= amount) {
            setCoins(player, current - amount);
            return true;
        }
        return false;
    }

    public boolean hasCoins(Player player, int amount) {
        return getCoins(player) >= amount;
    }
}
```

### Utilisation

```java
CurrencyManager currency = new CurrencyManager(menuPlugin);

// Verifier le solde
int balance = currency.getCoins(player);
player.sendMessage("Solde : " + balance);

// Ajouter des pieces
currency.addCoins(player, 100);
player.sendMessage("100 pieces ajoutees !");

// Retirer des pieces (avec verification)
if (currency.removeCoins(player, 50)) {
    player.sendMessage("50 pieces depensees");
} else {
    player.sendMessage("Pas assez de pieces !");
}
```

## Exemple Complet : Suivi des Statistiques

```java
package com.example.stats;

import fr.maxlego08.menu.api.MenuPlugin;
import fr.maxlego08.menu.api.DataManager;
import org.bukkit.entity.Player;

public class StatsTracker {

    private final DataManager dataManager;

    public StatsTracker(MenuPlugin menuPlugin) {
        this.dataManager = menuPlugin.getDataManager();
    }

    // Kills
    public int getKills(Player player) {
        return getIntValue(player, "kills");
    }

    public void incrementKills(Player player) {
        dataManager.addData(player, "kills", 1);
    }

    // Morts
    public int getDeaths(Player player) {
        return getIntValue(player, "deaths");
    }

    public void incrementDeaths(Player player) {
        dataManager.addData(player, "deaths", 1);
    }

    // Ratio K/D
    public double getKDRatio(Player player) {
        int kills = getKills(player);
        int deaths = getDeaths(player);
        if (deaths == 0) return kills;
        return (double) kills / deaths;
    }

    // Temps de jeu (en minutes)
    public long getPlaytime(Player player) {
        return getLongValue(player, "playtime");
    }

    public void addPlaytime(Player player, long minutes) {
        long current = getPlaytime(player);
        dataManager.setData(player, "playtime", String.valueOf(current + minutes));
    }

    // Methodes utilitaires
    private int getIntValue(Player player, String key) {
        return dataManager.getData(player, key)
            .map(Integer::parseInt)
            .orElse(0);
    }

    private long getLongValue(Player player, String key) {
        return dataManager.getData(player, key)
            .map(Long::parseLong)
            .orElse(0L);
    }
}
```

## Exemple Complet : Systeme de Recompenses Quotidiennes

```java
package com.example.rewards;

import fr.maxlego08.menu.api.MenuPlugin;
import fr.maxlego08.menu.api.DataManager;
import org.bukkit.entity.Player;

public class DailyRewardsManager {

    private final DataManager dataManager;
    private static final long DAY_IN_MILLIS = 24 * 60 * 60 * 1000;

    public DailyRewardsManager(MenuPlugin menuPlugin) {
        this.dataManager = menuPlugin.getDataManager();
    }

    public boolean canClaimDaily(Player player) {
        long lastClaim = getLastClaimTime(player);
        long now = System.currentTimeMillis();
        return (now - lastClaim) >= DAY_IN_MILLIS;
    }

    public long getTimeUntilNextClaim(Player player) {
        long lastClaim = getLastClaimTime(player);
        long now = System.currentTimeMillis();
        long nextClaim = lastClaim + DAY_IN_MILLIS;
        return Math.max(0, nextClaim - now);
    }

    public void claimDaily(Player player) {
        dataManager.setData(player, "daily-last-claim",
            String.valueOf(System.currentTimeMillis()));
        incrementStreak(player);
    }

    public int getStreak(Player player) {
        return dataManager.getData(player, "daily-streak")
            .map(Integer::parseInt)
            .orElse(0);
    }

    private void incrementStreak(Player player) {
        dataManager.addData(player, "daily-streak", 1);
    }

    public void resetStreak(Player player) {
        dataManager.setData(player, "daily-streak", "0");
    }

    private long getLastClaimTime(Player player) {
        return dataManager.getData(player, "daily-last-claim")
            .map(Long::parseLong)
            .orElse(0L);
    }

    // Formater le temps restant
    public String formatTimeRemaining(Player player) {
        long millis = getTimeUntilNextClaim(player);
        long hours = millis / (60 * 60 * 1000);
        long minutes = (millis % (60 * 60 * 1000)) / (60 * 1000);
        return String.format("%dh %dm", hours, minutes);
    }
}
```

## Travailler avec des Donnees Complexes

Pour des structures de donnees complexes, serialisez en JSON :

```java
import com.google.gson.Gson;

public class ComplexDataManager {

    private final DataManager dataManager;
    private final Gson gson = new Gson();

    public ComplexDataManager(MenuPlugin menuPlugin) {
        this.dataManager = menuPlugin.getDataManager();
    }

    // Sauvegarder une liste
    public void saveStringList(Player player, String key, List<String> list) {
        String json = gson.toJson(list);
        dataManager.setData(player, key, json);
    }

    // Charger une liste
    public List<String> loadStringList(Player player, String key) {
        return dataManager.getData(player, key)
            .map(json -> gson.fromJson(json,
                new TypeToken<List<String>>(){}.getType()))
            .orElse(new ArrayList<>());
    }

    // Sauvegarder un objet personnalise
    public void savePlayerStats(Player player, PlayerStats stats) {
        String json = gson.toJson(stats);
        dataManager.setData(player, "player-stats", json);
    }

    // Charger un objet personnalise
    public PlayerStats loadPlayerStats(Player player) {
        return dataManager.getData(player, "player-stats")
            .map(json -> gson.fromJson(json, PlayerStats.class))
            .orElse(new PlayerStats());
    }
}

// Exemple de classe de donnees
public class PlayerStats {
    public int kills = 0;
    public int deaths = 0;
    public long playtime = 0;
    public List<String> achievements = new ArrayList<>();
}
```

## Utiliser les Donnees dans les Inventaires

Les donnees que vous definissez sont automatiquement disponibles en tant que placeholders :

```yaml
items:
  stats-display:
    slot: 4
    item:
      material: PLAYER_HEAD
      playerHead: "%player%"
      name: "&6&lStatistiques de %player%"
      lore:
        - "&7Pieces : &e%zmenu_player_value_coins%"
        - "&7Kills : &a%zmenu_player_value_kills%"
        - "&7Morts : &c%zmenu_player_value_deaths%"
        - "&7Serie : &b%zmenu_player_value_daily-streak%"
```

## Bonnes Pratiques

1. **Utiliser des noms de cles coherents** - Etablir une convention de nommage
2. **Gerer les donnees manquantes** - Toujours utiliser `orElse()` pour les valeurs par defaut
3. **Valider l'analyse numerique** - Envelopper dans un try-catch pour la securite
4. **Ne pas ecraser les donnees importantes** - Verifier avant de definir
5. **Utiliser les types de donnees appropries** - Stocker en tant que chaines, analyser quand necessaire
6. **Nettoyer les donnees inutilisees** - Supprimer les cles qui ne sont plus necessaires

## Conventions de Nommage des Cles

```java
// Bonnes conventions de nommage
"coins"              // Simple, clair
"daily-streak"       // Kebab-case pour plusieurs mots
"quest-tutorial-1"   // Inclure des identifiants
"stats-kills"        // Prefixer avec la categorie

// A eviter
"c"                  // Trop court
"playerCoinsData"    // CamelCase (utiliser kebab)
"x1y2z3"            // Sans signification
```

## Etapes Suivantes

- Ecouter les [Evenements](./api-events)
- Creer des [Boutons Personnalises](./api-buttons) qui utilisent les donnees joueur
- Creer des [Actions Personnalisees](./api-actions) qui modifient les donnees joueur
