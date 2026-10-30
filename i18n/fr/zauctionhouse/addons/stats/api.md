---
title: API Développeur
description: Lire les classements, les statistiques des joueurs et les prix des objets de zAuctionHouseStats depuis votre propre plugin
---

# API Développeur

zAuctionHouseStats expose une petite API en lecture seule via le `ServicesManager` de Bukkit. Elle permet à votre plugin de lire les mêmes classements, statistiques de joueurs et prix d'objets que ceux utilisés par les [commandes](/zauctionhouse/addons/stats/commands-permissions), les [placeholders](/zauctionhouse/addons/stats/placeholders) et les [inventaires](/zauctionhouse/addons/stats/inventories) de l'addon.

Tous les types publics se trouvent dans le package `fr.maxlego08.stats.api` :

| Type | Nature | Description |
|------|--------|-------------|
| `StatsManager` | Interface | Point d'entrée : classements, statistiques des joueurs, prix des objets |
| `LeaderboardMetric` | Enum | Les 6 classements disponibles |
| `StatsPeriod` | Enum | Fenêtres calendaires : `DAY`, `WEEK`, `MONTH`, `ALL` |
| `LeaderboardEntry` | Record | Une ligne d'un classement |
| `PlayerStatsSnapshot` | Record | Fiche de statistiques complète d'un joueur |
| `ItemPriceStats` | Record | Nombre de ventes, prix moyen et prix médian d'un objet |

<CalloutContainer type="info">

<CalloutDescription>
L'API est stable sur toutes les versions 2.x : aucune constante de `LeaderboardMetric` ou de `StatsPeriod` n'est supprimée en 2.x.
</CalloutDescription>

</CalloutContainer>

## Dépendance

zAuctionHouseStats est un addon commercial : son build est publié sur le repository GroupeZ **privé** (`https://repo.groupez.dev/private`), qui nécessite des identifiants. Si vous n'y avez pas accès, compilez directement contre le jar du plugin.

### Compiler contre le jar

Placez `zAuctionHouseStats.jar` dans un dossier `libs/` de votre projet.

**Gradle (Kotlin DSL)**

```kotlin
dependencies {
    compileOnly(files("libs/zAuctionHouseStats.jar"))
}
```

**Maven**

```xml
<dependency>
    <groupId>fr.maxlego08.stats</groupId>
    <artifactId>zauctionhousestats</artifactId>
    <version>2.0.0</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/libs/zAuctionHouseStats.jar</systemPath>
</dependency>
```

### Depuis le repository privé

Si votre compte a accès au repository privé :

```kotlin
repositories {
    maven {
        name = "groupezPrivate"
        url = uri("https://repo.groupez.dev/private")
        credentials(PasswordCredentials::class)
    }
}

dependencies {
    compileOnly("fr.maxlego08.stats:zauctionhousestats:2.0.0")
}
```

<CalloutContainer type="warning">

<CalloutDescription>
Utilisez toujours `compileOnly` (Gradle) ou `provided` / `system` (Maven) : n'intégrez (shade) jamais zAuctionHouseStats dans votre plugin. Les classes sont fournies à l'exécution par l'addon installé.
</CalloutDescription>

</CalloutContainer>

### plugin.yml

Déclarez l'addon comme dépendance afin qu'il soit activé avant votre plugin :

```yaml
depend:
  - zAuctionHouseStats
# ou, si votre plugin peut fonctionner sans :
softdepend:
  - zAuctionHouseStats
```

## Obtenir le StatsManager

Le `StatsManager` est enregistré dans le `ServicesManager` **tout à la fin** du démarrage de l'addon (une fois la base de données, les caches, les menus, les placeholders et les commandes prêts), de sorte que l'API n'est jamais exposée dans un état à moitié initialisé. Il est désenregistré lorsque l'addon est désactivé.

```java
import fr.maxlego08.stats.api.StatsManager;
import org.bukkit.Bukkit;
import org.bukkit.plugin.RegisteredServiceProvider;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private StatsManager statsManager;

    @Override
    public void onEnable() {
        RegisteredServiceProvider<StatsManager> registration =
            Bukkit.getServicesManager().getRegistration(StatsManager.class);

        if (registration == null) {
            getLogger().warning("zAuctionHouseStats introuvable, fonctionnalités de statistiques désactivées.");
            return;
        }

        this.statsManager = registration.getProvider();
        getLogger().info("Connecté à zAuctionHouseStats !");
    }
}
```

<CalloutContainer type="info">

<CalloutDescription>
Si zAuctionHouseStats ne parvient pas à démarrer (par exemple lorsque sa configuration ne peut pas être satisfaite), il se désactive et n'enregistre jamais le service : `getRegistration` renvoie alors `null`.
</CalloutDescription>

</CalloutContainer>

## Garanties de threading

Chaque méthode de `StatsManager` renvoie un `CompletableFuture` et est **servie depuis les caches de l'addon**. Le contrat est le suivant :

| Garantie | Détails |
|----------|---------|
| Jamais bloquant | Aucun appel n'exécute de SQL synchrone ni ne bloque le thread appelant. Vous pouvez appeler l'API depuis le thread principal, un thread de région ou un thread asynchrone. |
| Cache chaud | Le future renvoyé est **déjà complété**. |
| Valeur périmée | Lorsque la valeur en cache est plus ancienne que son TTL, l'ancienne valeur est renvoyée immédiatement (future déjà complété) et un rafraîchissement en arrière-plan est déclenché. |
| Cache froid | Le future se complète lorsque le premier chargement asynchrone se termine. |
| Chargements regroupés | Les requêtes simultanées pour une même clé partagent une seule requête en base de données (50 appels à froid = 1 requête). |
| Possiblement périmé | Les valeurs peuvent avoir jusqu'à un TTL de cache d'ancienneté (voir la section `caches` de la [configuration](/zauctionhouse/addons/stats/configuration) et la [Source des données](#source-des-données--événements-zauctionhouse) ci-dessous). |
| Copies défensives | Chaque appelant reçoit sa propre copie du future : appeler `cancel`, `complete` ou `orTimeout` dessus n'affecte jamais les autres appelants. |
| Thread de complétion | Les futures se complètent sur le thread de stockage de l'addon (`zAHStats-Storage`), **pas** sur le thread principal. |

<CalloutContainer type="warning">

<CalloutTitle>Revenez sur le bon thread</CalloutTitle>

<CalloutDescription>
Comme les futures se complètent sur le thread `zAHStats-Storage`, vous **devez** revenir sur le thread principal / de région / de l'entité avant de toucher à l'état du jeu (inventaires, entités, mondes). Sur Folia, utilisez le scheduler d'entité du joueur, par exemple via le scheduler de zAuctionHouse : `auctionPlugin.getScheduler().runAtEntity(player, task -> ...)`. N'appelez jamais `join()` ou `get()` sur ces futures depuis le thread principal.
</CalloutDescription>

</CalloutContainer>

Durées de vie des caches utilisés par l'API :

| Méthode | Clé du TTL de cache | Défaut |
|---------|---------------------|--------|
| `getLeaderboard` | `caches.leaderboard-ttl-seconds` | `60` |
| `getPlayerStats` | `caches.player-stats-ttl-seconds` | `60` |
| `getItemPriceStatistics` | `caches.material-price-ttl-seconds` | `3600` |

### Échecs et arrêt

| Situation | Résultat |
|-----------|----------|
| Un rafraîchissement échoue alors qu'une valeur est déjà en cache | La valeur précédente est conservée et renvoyée ; un avertissement est loggé et la tentative suivante a lieu après un TTL complet. |
| Le tout premier chargement d'une clé échoue | Le future se complète exceptionnellement. Tant qu'un TTL complet ne s'est pas écoulé, les appels suivants pour cette clé renvoient un future en échec (la base de données n'est pas surchargée). |
| L'addon est en cours d'arrêt | Les futures en cours se complètent immédiatement avec la dernière valeur en cache, ou exceptionnellement avec une `CancellationException` si aucune valeur n'a jamais été chargée. |

Gérez toujours le cas exceptionnel, par exemple avec `exceptionally(...)` ou `whenComplete(...)`.

## StatsManager

```java
public interface StatsManager {

    CompletableFuture<List<LeaderboardEntry>> getLeaderboard(LeaderboardMetric metric, StatsPeriod period,
                                                             String economyName);

    CompletableFuture<PlayerStatsSnapshot> getPlayerStats(UUID uniqueId);

    CompletableFuture<ItemPriceStats> getItemPriceStatistics(String economyName, Material material);

    CompletableFuture<ItemPriceStats> getItemPriceStatistics(String economyName, String material,
                                                             Integer customModelData, StatsPeriod period);
}
```

### getLeaderboard

```java
CompletableFuture<List<LeaderboardEntry>> getLeaderboard(LeaderboardMetric metric, StatsPeriod period, String economyName)
```

Renvoie le top N d'un classement, où N vaut `leaderboards.size` (défaut `10`, borné à `[1, 100]`). La liste renvoyée est immuable et triée par rang.

| Paramètre | Description |
|-----------|-------------|
| `metric` | Le classement, voir [LeaderboardMetric](#leaderboardmetric). Obligatoire (`NullPointerException` si `null`). |
| `period` | La fenêtre calendaire, voir [StatsPeriod](#statsperiod). `null` = `ALL`. |
| `economyName` | Le nom de l'économie zAuctionHouse (les espaces autour sont supprimés). `null` ou vide = l'économie par défaut pour les métriques monétaires, **toutes les économies cumulées** pour les métriques de comptage. Un nom non vide restreint toujours le classement à cette économie. |

Cas particuliers :

| Situation | Résultat |
|-----------|----------|
| La métrique est listée dans `leaderboards.disabled` | Future complété avec une liste vide, sans requête |
| Une métrique monétaire est demandée sans économie et aucune économie par défaut ne peut être résolue | Future complété avec une liste vide |
| Le classement compte moins de N joueurs | Une liste plus courte |

L'économie par défaut est `leaderboards.default-economy`, ou l'économie par défaut de zAuctionHouse lorsque cette clé est vide. Les métriques monétaires sont toujours calculées pour **une seule** économie : les montants de différentes économies ne sont jamais additionnés.

### getPlayerStats

```java
CompletableFuture<PlayerStatsSnapshot> getPlayerStats(UUID uniqueId)
```

Renvoie la fiche de statistiques d'un joueur, voir [PlayerStatsSnapshot](#playerstatssnapshot). `uniqueId` est obligatoire (`NullPointerException` si `null`). Un joueur sans aucune statistique enregistrée renvoie un snapshot **vide** (`isEmpty()` vaut `true`), jamais `null`.

Les joueurs en ligne sont préchargés à leur connexion : leur snapshot est donc généralement déjà en cache.

### getItemPriceStatistics (Material)

```java
CompletableFuture<ItemPriceStats> getItemPriceStatistics(String economyName, Material material)
```

Statistiques de prix d'un matériau depuis toujours, sans filtre de custom model data. Équivaut à `getItemPriceStatistics(economyName, material.name(), null, StatsPeriod.ALL)`.

| Paramètre | Description |
|-----------|-------------|
| `economyName` | Nom de l'économie. `null` ou vide = économie par défaut. |
| `material` | Le matériau Bukkit. Obligatoire (`NullPointerException` si `null`). |

### getItemPriceStatistics (complète)

```java
CompletableFuture<ItemPriceStats> getItemPriceStatistics(String economyName, String material,
                                                         Integer customModelData, StatsPeriod period)
```

| Paramètre | Description |
|-----------|-------------|
| `economyName` | Nom de l'économie. `null` ou vide = économie par défaut. |
| `material` | Nom du matériau Bukkit, insensible à la casse (`"diamond"` = `"DIAMOND"`). `null` ou vide = filtre uniquement sur `customModelData`, tous matériaux confondus. |
| `customModelData` | Filtre sur le custom model data de l'objet vendu. `null` = aucun filtre. |
| `period` | Fenêtre calendaire. `null` = `ALL`. |

| Situation | Résultat |
|-----------|----------|
| `material` est `null` / vide et `customModelData` est `null` | `IllegalArgumentException` levée **immédiatement** (pas via le future) |
| Aucune économie ne peut être résolue | Future complété avec un `ItemPriceStats` vide (nombre `0`, moyenne et médiane `0.00`) |
| Aucune vente correspondante | Future complété avec un `ItemPriceStats` vide |

Les prix sont calculés sur le **prix de mise en vente** des ventes conclues. Dans les fenêtres `DAY` / `WEEK` / `MONTH`, seules les ventes réalisées depuis minuit du premier jour de la fenêtre (dans `statistics.timezone`) sont comptées.

## Types

### LeaderboardMetric

| Constante | Valeur classée | Métrique monétaire | Description |
|-----------|----------------|:------------------:|-------------|
| `TOP_SELLERS_MONEY` | Somme de l'argent reçu par le vendeur | Oui | Argent réellement gagné par les vendeurs, net de taxes |
| `TOP_BUYERS_MONEY` | Somme de l'argent payé par l'acheteur | Oui | Argent réellement dépensé par les acheteurs, taxes incluses |
| `TOP_SELLERS_COUNT` | Nombre de ventes | Non | Ventes conclues en tant que vendeur |
| `TOP_BUYERS_COUNT` | Nombre d'achats | Non | Achats conclus en tant qu'acheteur |
| `TOP_TAX_PAID` | Somme des taxes payées | Oui | Taxes supportées par le joueur (part de la taxe d'achat + taxe de mise en vente) |
| `BIGGEST_SALE` | Vente unique maximale | Oui | Plus grosse vente unique reçue en tant que vendeur |

Méthodes :

| Méthode | Type de retour | Description |
|---------|----------------|-------------|
| `isMoney()` | `boolean` | `true` pour les métriques monétaires : une économie est toujours requise (l'économie par défaut si aucune n'est fournie), et la valeur peut être formatée avec le format d'économie de zAuctionHouse |
| `getAggregation()` | `LeaderboardMetric.Aggregation` | `SUM` ou `MAX` (`MAX` uniquement pour `BIGGEST_SALE`) |
| `getAllTimeColumn()` | `String` | Colonne interne de la base de données utilisée pour la période `ALL` |
| `getDailyColumn()` | `String` | Colonne interne de la base de données utilisée pour `DAY` / `WEEK` / `MONTH`, `null` pour `BIGGEST_SALE` |

### StatsPeriod

Les périodes sont des **fenêtres calendaires**, calculées dans le fuseau horaire défini par `statistics.timezone` (vide = fuseau horaire du serveur) :

| Constante | Fenêtre |
|-----------|---------|
| `DAY` | Aujourd'hui, depuis minuit |
| `WEEK` | Depuis lundi (semaine ISO) |
| `MONTH` | Depuis le 1er du mois en cours |
| `ALL` | Depuis toujours |

Méthodes :

| Méthode | Type de retour | Description |
|---------|----------------|-------------|
| `isWindowed()` | `boolean` | `true` pour toutes les constantes sauf `ALL` |
| `minEpochDay(ZoneId zone)` | `long` | Premier epoch-day inclus dans la fenêtre. Lève `IllegalStateException` pour `ALL` |
| `minEpochDay(Clock clock, ZoneId zone)` | `long` | Idem, avec une horloge injectée |
| `minEpochDay(LocalDate today)` | `long` | Premier epoch-day de la fenêtre contenant `today`. Lève `IllegalStateException` pour `ALL` |
| `windowStart(Clock clock, ZoneId zone)` | `Instant` | Minuit du premier jour de la fenêtre. Lève `IllegalStateException` pour `ALL` |

### LeaderboardEntry

```java
public record LeaderboardEntry(int rank, UUID uuid, String name, BigDecimal value) {}
```

| Champ | Type | Description |
|-------|------|-------------|
| `rank` | `int` | Position, de `1` à N. Les rangs sont positionnels (1, 2, 3…) : les ex æquo ne partagent jamais un rang et sont départagés par UUID |
| `uuid` | `UUID` | Le joueur |
| `name` | `String` | Dernier nom connu du joueur, ou `leaderboards.unknown-name` (défaut `?`) s'il est inconnu |
| `value` | `BigDecimal` | La valeur classée. Échelle 2 pour les métriques monétaires, échelle 0 pour les comptages |

### PlayerStatsSnapshot

```java
public record PlayerStatsSnapshot(UUID uniqueId, String name, Map<String, PlayerEconomyStats> byEconomy,
                                  Map<PeriodKey, PlayerPeriodStats> periods, long loadedAt) {}
```

| Champ | Type | Description |
|-------|------|-------------|
| `uniqueId` | `UUID` | Le joueur |
| `name` | `String` | Dernier nom connu, `null` s'il est inconnu |
| `byEconomy` | `Map<String, PlayerEconomyStats>` | Totaux depuis toujours, indexés par nom d'économie (immuable) |
| `periods` | `Map<PeriodKey, PlayerPeriodStats>` | Totaux des fenêtres `DAY`, `WEEK` et `MONTH`, indexés par (période, économie) (immuable) |
| `loadedAt` | `long` | Date du chargement, en millisecondes epoch |

| Méthode | Type de retour | Description |
|---------|----------------|-------------|
| `economy(String economyName)` | `Optional<PlayerEconomyStats>` | Totaux depuis toujours d'une économie, vide si le joueur ne l'a jamais utilisée |
| `period(StatsPeriod period, String economyName)` | `Optional<PlayerPeriodStats>` | Totaux d'une fenêtre pour une économie, vide s'il n'y a eu aucune activité dans cette fenêtre |
| `isEmpty()` | `boolean` | `true` si le joueur n'a aucune statistique enregistrée |

#### PlayerStatsSnapshot.PeriodKey

```java
public record PeriodKey(StatsPeriod period, String economyName) {}
```

`period` vaut `DAY`, `WEEK` ou `MONTH` (jamais `ALL`, qui est servi par `byEconomy`).

#### PlayerStatsSnapshot.PlayerEconomyStats

Totaux depuis toujours d'une économie.

| Champ | Type | Description |
|-------|------|-------------|
| `itemsListed` | `long` | Objets mis en vente |
| `itemsSold` | `long` | Objets vendus |
| `itemsBought` | `long` | Objets achetés |
| `itemsExpired` | `long` | Mises en vente expirées sans avoir été vendues |
| `itemsRemoved` | `long` | Mises en vente retirées de la vente |
| `moneyEarned` | `BigDecimal` | Argent gagné en tant que vendeur, net de taxes |
| `moneySpent` | `BigDecimal` | Argent dépensé en tant qu'acheteur, taxes incluses |
| `taxPaid` | `BigDecimal` | Taxes payées |
| `biggestSale` | `BigDecimal` | Plus grosse vente unique reçue |
| `firstSaleAt` | `Instant` | Première vente, `null` si aucune |
| `lastSaleAt` | `Instant` | Dernière vente, `null` si aucune |
| `firstPurchaseAt` | `Instant` | Premier achat, `null` si aucun |
| `lastPurchaseAt` | `Instant` | Dernier achat, `null` si aucun |

#### PlayerStatsSnapshot.PlayerPeriodStats

Totaux d'une fenêtre (`DAY` / `WEEK` / `MONTH`) pour une économie.

| Champ | Type | Description |
|-------|------|-------------|
| `itemsSold` | `long` | Objets vendus |
| `itemsBought` | `long` | Objets achetés |
| `itemsListed` | `long` | Objets mis en vente |
| `moneyEarned` | `BigDecimal` | Argent gagné, net de taxes |
| `moneySpent` | `BigDecimal` | Argent dépensé, taxes incluses |
| `taxPaid` | `BigDecimal` | Taxes payées |

### ItemPriceStats

```java
public record ItemPriceStats(long count, BigDecimal average, BigDecimal median) {}
```

| Champ | Type | Description |
|-------|------|-------------|
| `count` | `long` | Nombre exact de ventes correspondantes |
| `average` | `BigDecimal` | Prix moyen (échelle 2), `0` si aucune vente |
| `median` | `BigDecimal` | Prix médian (échelle 2), calculé sur les ventes les plus récentes, dans la limite de `statistics.material-prices.median-sample-limit` (défaut `50000`) ; `0` si aucune vente |

| Méthode | Type de retour | Description |
|---------|----------------|-------------|
| `isEmpty()` | `boolean` | `true` si aucune vente ne correspond (`count == 0`) |

## Exemples

### Afficher les meilleurs vendeurs du jour

```java
import fr.maxlego08.stats.api.LeaderboardEntry;
import fr.maxlego08.stats.api.LeaderboardMetric;
import fr.maxlego08.stats.api.StatsManager;
import fr.maxlego08.stats.api.StatsPeriod;
import fr.maxlego08.zauctionhouse.api.AuctionPlugin;
import org.bukkit.entity.Player;

public void sendDailyTop(AuctionPlugin auctionPlugin, StatsManager stats, Player player) {
    stats.getLeaderboard(LeaderboardMetric.TOP_SELLERS_MONEY, StatsPeriod.DAY, null) // économie par défaut
        .whenComplete((entries, throwable) -> {
            // Retour sur le thread du joueur avant d'envoyer des messages / de toucher à l'état du jeu
            auctionPlugin.getScheduler().runAtEntity(player, task -> {
                if (throwable != null) {
                    player.sendMessage("Les statistiques sont indisponibles pour le moment.");
                    return;
                }
                if (entries.isEmpty()) {
                    player.sendMessage("Aucune vente aujourd'hui.");
                    return;
                }
                for (LeaderboardEntry entry : entries) {
                    player.sendMessage("#" + entry.rank() + " " + entry.name() + " - " + entry.value());
                }
            });
        });
}
```

### Lire les statistiques d'un joueur

```java
import fr.maxlego08.stats.api.PlayerStatsSnapshot;
import fr.maxlego08.stats.api.StatsPeriod;

stats.getPlayerStats(player.getUniqueId()).thenAccept(snapshot -> {
    if (snapshot.isEmpty()) return;

    // Totaux depuis toujours pour l'économie "vault"
    snapshot.economy("vault").ifPresent(total -> {
        long sold = total.itemsSold();
        java.math.BigDecimal earned = total.moneyEarned();
        // ...
    });

    // Totaux de la semaine pour la même économie
    snapshot.period(StatsPeriod.WEEK, "vault").ifPresent(week -> {
        long boughtThisWeek = week.itemsBought();
        // ...
    });
});
```

### Obtenir le prix moyen d'un objet

```java
import fr.maxlego08.stats.api.ItemPriceStats;
import fr.maxlego08.stats.api.StatsPeriod;
import org.bukkit.Material;

// Depuis toujours, économie par défaut
stats.getItemPriceStatistics(null, Material.DIAMOND).thenAccept(prices -> {
    if (prices.isEmpty()) return; // jamais vendu
    java.math.BigDecimal average = prices.average();
    java.math.BigDecimal median = prices.median();
    long sales = prices.count();
});

// Ce mois-ci, économie "vault", uniquement les objets avec le custom model data 1001
stats.getItemPriceStatistics("vault", "PAPER", 1001, StatsPeriod.MONTH)
    .thenAccept(prices -> { /* ... */ });
```

<CalloutContainer type="warning">

<CalloutDescription>
N'appelez jamais `join()` ou `get()` sur ces futures depuis le thread principal : avec un cache froid, cela attendrait une requête en base de données. Enchaînez toujours avec `thenAccept`, `whenComplete`, etc., puis revenez sur le bon thread.
</CalloutDescription>

</CalloutContainer>

## Source des données : événements zAuctionHouse

zAuctionHouseStats n'expose aucun événement propre. Il collecte ses données en écoutant (en priorité `MONITOR`, sans jamais les modifier) les événements de zAuctionHouse V4. Les événements dédiés aux statistiques se trouvent dans le package `fr.maxlego08.zauctionhouse.api.event.events.stats` :

| Événement | Déclenché quand | Utilisé pour |
|-----------|-----------------|--------------|
| `AuctionItemListedEvent` | Un objet a été mis en vente avec succès | Mises en vente, taxe de mise en vente |
| `AuctionItemPurchasedEvent` | Un achat a été entièrement validé (une fois par achat, sur le serveur de l'acheteur) | Ventes, argent gagné/dépensé, taxes, prix des objets, classements |
| `AuctionMoneyClaimEvent` | Un joueur a récupéré de l'argent en attente | Récupérations d'argent par économie |
| `AuctionOpenEvent` | Un joueur ouvre (ou revient sur) l'inventaire principal de l'hôtel des ventes | Compteur d'activité |

Ces quatre événements sont purement informatifs (non annulables) et sont déclenchés de manière synchrone sur le thread principal (le thread de la région globale sur Folia).

L'addon écoute également des événements existants de zAuctionHouse :

| Événement | Package | Utilisé pour |
|-----------|---------|--------------|
| `AuctionExpireEvent` | `fr.maxlego08.zauctionhouse.api.event.events` | Mises en vente expirées sans avoir été vendues (uniquement les objets du stockage `LISTED`) |
| `AuctionRemoveListedItemEvent` | `fr.maxlego08.zauctionhouse.api.event.events.remove` | Mises en vente retirées de la vente (attribuées au vendeur, même lorsqu'un administrateur retire l'objet) |
| `AuctionRemoveExpiredItemEvent` | `fr.maxlego08.zauctionhouse.api.event.events.remove` | Mise à jour des noms des joueurs |
| `AuctionRemovePurchasedItemEvent` | `fr.maxlego08.zauctionhouse.api.event.events.remove` | Mise à jour des noms des joueurs |

Les gestionnaires d'événements ne touchent jamais à la base de données : ils se contentent de mettre les données en file d'attente, qui sont écrites de manière asynchrone par lots (voir `flush.interval-seconds` dans la [configuration](/zauctionhouse/addons/stats/configuration)). Conséquences pour l'API :

- Un `PlayerStatsSnapshot` **déjà en cache** sur le serveur où l'activité a eu lieu est mis à jour immédiatement en mémoire, sans aucune requête.
- Après chaque flush, les caches des joueurs concernés sont rafraîchis depuis la base de données (ce qui récupère aussi l'activité enregistrée par les autres serveurs d'un réseau), et les prix d'objets en cache qui n'avaient encore aucune vente sont rafraîchis lorsque ce matériau est vendu.
- Les classements et les autres prix d'objets en cache prennent en compte la nouvelle activité à l'expiration de leur TTL de cache.

<CalloutContainer type="info">

<CalloutDescription>
Les événements de statistiques nécessitent un build récent de zAuctionHouse V4. Avec `collection.mode: AUTO`, si le zAuctionHouse installé ne les fournit pas, l'addon peut se rabattre sur la lecture de la table des logs de zAuctionHouse (uniquement lorsque `collection.polling.enabled` vaut `true`). Il s'agit d'un mode dégradé : les montants sont approximatifs (prix de mise en vente, taxes inconnues) et les expirations ainsi que les ouvertures de l'hôtel des ventes ne sont pas enregistrées. L'API est identique dans les deux modes. Voir [Installation](/zauctionhouse/addons/stats/installation) et [Configuration](/zauctionhouse/addons/stats/configuration).
</CalloutDescription>

</CalloutContainer>

Pour écouter vous-même ces événements, consultez la page [Événements](/zauctionhouse/development/events) de zAuctionHouse.
