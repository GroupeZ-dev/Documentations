---
title: API développeur
description: Utilisez l'API de zVeinMiner pour lire et modifier les items de vein mining, consulter les données des joueurs et écouter les événements de vein mining
---

# API développeur

zVeinMiner fournit un module API séparé (package `fr.maxlego08.veinminer.api`) sur lequel les autres plugins peuvent compiler. Il donne accès à :

- **`VeinManager`** - la détection des filons, les presets et les données de vein mining stockées sur les items
- **`PlayerManager`** - l'état d'activation et les statistiques de chaque joueur
- **Les événements** - `VeinMineStartEvent`, `VeinMineBlockEvent` et `VeinMineCompleteEvent`

<CalloutContainer type="info">

<CalloutTitle>Prérequis</CalloutTitle>

<CalloutDescription>
L'API cible la même plateforme que le plugin : **Paper 26.3 ou supérieur** et **Java 25**. Votre plugin doit être compilé avec une toolchain Java 25 pour l'utiliser. Spigot et Folia ne sont pas supportés.
</CalloutDescription>

</CalloutContainer>

## Ajouter la dépendance

L'API est publiée sur le dépôt GroupeZ. Le groupe est `fr.maxlego08.veinminer` et l'artefact est `zveinminer-api`. Remplacez `<version>` (ou `VERSION` avec Maven) par la dernière version de zVeinMiner, celle qui tourne sur votre serveur.

### Gradle (Kotlin DSL)

```kotlin
repositories {
    maven {
        name = "groupezReleases"
        url = uri("https://repo.groupez.dev/releases")
    }
}

dependencies {
    compileOnly("fr.maxlego08.veinminer:zveinminer-api:<version>")
}
```

### Gradle (Groovy DSL)

```groovy
repositories {
    maven { url 'https://repo.groupez.dev/releases' }
}

dependencies {
    compileOnly 'fr.maxlego08.veinminer:zveinminer-api:<version>'
}
```

### Maven

```xml
<repositories>
    <repository>
        <id>groupez-releases</id>
        <url>https://repo.groupez.dev/releases</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>fr.maxlego08.veinminer</groupId>
        <artifactId>zveinminer-api</artifactId>
        <version>VERSION</version> <!-- latest zVeinMiner release -->
        <scope>provided</scope>
    </dependency>
</dependencies>
```

<CalloutContainer type="warning">

<CalloutTitle>N'incluez pas l'API dans votre jar</CalloutTitle>

<CalloutDescription>
Utilisez toujours `compileOnly` (Gradle) ou `provided` (Maven). Les classes sont fournies à l'exécution par le jar de zVeinMiner ; les inclure (shade) créerait une seconde copie des interfaces et des événements, et vos listeners ne seraient jamais appelés.
</CalloutDescription>

</CalloutContainer>

## Déclarer zVeinMiner comme dépendance

zVeinMiner doit être chargé avant votre plugin, et votre plugin doit pouvoir accéder à ses classes.

### paper-plugin.yml

```yaml
dependencies:
  server:
    zVeinMiner:
      load: BEFORE
      required: false     # true si votre plugin ne peut pas fonctionner sans zVeinMiner
      join-classpath: true
```

Conservez `join-classpath: true` (la valeur par défaut de Paper) : avec `false`, votre plugin ne peut pas charger les classes de `fr.maxlego08.veinminer.api`.

### plugin.yml

Si votre plugin utilise encore un `plugin.yml` Bukkit :

```yaml
softdepend: [ zVeinMiner ]
# ou, si zVeinMiner est obligatoire :
depend: [ zVeinMiner ]
```

## Récupérer les managers

Au démarrage, zVeinMiner enregistre les deux managers dans le `ServicesManager` de Bukkit avec la priorité `Highest` :

| Service | Description |
|---------|-------------|
| `fr.maxlego08.veinminer.api.VeinManager` | Détection des filons, presets, données des items |
| `fr.maxlego08.veinminer.api.PlayerManager` | État d'activation et statistiques des joueurs |

```java
import fr.maxlego08.veinminer.api.PlayerManager;
import fr.maxlego08.veinminer.api.VeinManager;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private VeinManager veinManager;
    private PlayerManager playerManager;

    @Override
    public void onEnable() {
        var services = getServer().getServicesManager();

        this.veinManager = services.load(VeinManager.class);
        this.playerManager = services.load(PlayerManager.class);

        if (this.veinManager == null || this.playerManager == null) {
            getLogger().warning("zVeinMiner is not installed, the integration is disabled.");
            return;
        }

        getLogger().info("Hooked into zVeinMiner!");
    }
}
```

`load()` renvoie `null` lorsque zVeinMiner est absent ou n'est pas activé : vérifiez donc toujours le résultat lorsque zVeinMiner est une dépendance optionnelle.

## VeinManager

`VeinManager` est le point d'entrée principal. Toutes les propriétés de vein mining d'un item sont stockées dans son `PersistentDataContainer` (voir [VeinKeys](#veinkeys)), les méthodes ci-dessous fonctionnent donc sur n'importe quel `ItemStack`.

| Méthode | Retour | Description |
|---------|--------|-------------|
| `getVeinKeys()` | `VeinKeys` | Les `NamespacedKey` utilisées pour stocker les données sur les items |
| `getVeinBlocks(Block start, int maxVeinSize)` | `Set<Block>` | Filon de blocs **du même type** que `start` |
| `getVeinBlocks(Block start, int maxVeinSize, Predicate<Block> matcher)` | `Set<Block>` | Filon de blocs validés par `matcher` |
| `getVeinPreset(String name)` | `Optional<VeinPreset>` | Un preset chargé depuis `config.yml` (le nom est sensible à la casse) |
| `applyPreset(ItemStack item, VeinPreset preset)` | `void` | Lie l'item au preset (stocke uniquement le **nom** du preset) |
| `setPreset(ItemStack item, VeinPreset preset)` | `void` | Copie la **taille et les tags** du preset sur l'item |
| `getVeinMinerResult(ItemStack item)` | `Optional<ItemVeinMinerResult>` | La taille et les tags effectifs de l'item |
| `changeSize(ItemStack item, int size)` | `void` | Définit la taille stockée sur l'item (`0` la supprime) |
| `getTaggables(String tags)` | `List<Taggable>` | Analyse une liste de tags séparés par des virgules |
| `addTag(ItemStack item, Taggable tag)` | `boolean` | Ajoute un tag à l'item, `false` s'il est déjà présent |
| `removeTag(ItemStack item, Taggable tag)` | `boolean` | Retire un tag de l'item, `false` s'il n'est pas présent |
| `getTags(Player player)` | `List<String>` | Noms des tags de l'item en main principale du joueur |
| `displayCurrentSize(Player player)` | `void` | Envoie le message `size-display` pour l'item en main principale |

### Détection des filons

`getVeinBlocks` effectue un parcours en largeur (BFS) depuis le bloc de départ sur ses 26 voisins (diagonales comprises) :

- l'ensemble renvoyé **contient le bloc de départ** et conserve l'ordre de découverte (les blocs les plus proches en premier) ;
- l'ensemble est vide si le bloc de départ lui-même ne correspond pas ;
- `maxVeinSize` est plafonné par l'option `max-size-limit` de `config.yml` (lorsqu'elle est supérieure à `0`) ;
- la recherche ne charge jamais de chunks, ne dépasse jamais la bordure du monde et reste dans la hauteur du monde.

```java
Block start = event.getBlock();

// Same material only
Set<Block> sameType = veinManager.getVeinBlocks(start, 32);

// Custom matcher: every log connected to the start block
Set<Block> logs = veinManager.getVeinBlocks(start, 64, block -> Tag.LOGS.isTagged(block.getType()));
```

<CalloutContainer type="info">

<CalloutTitle>Lecture seule</CalloutTitle>

<CalloutDescription>
`getVeinBlocks` se contente de calculer les blocs, il ne casse jamais rien. Utilisez-le sur le thread principal, car il lit des blocs du monde.
</CalloutDescription>

</CalloutContainer>

### applyPreset ou setPreset

Les deux méthodes donnent des capacités de vein mining à un item, mais elles ne stockent pas les mêmes données :

| Méthode | Stocké sur l'item | Après un `/zveinminer reload` |
|---------|-------------------|-------------------------------|
| `applyPreset` | Le nom du preset | L'item suit la nouvelle taille et les nouveaux tags du preset |
| `setPreset` | La taille du preset et ses tags | L'item conserve les valeurs qui lui ont été données |

Aucune des deux méthodes ne supprime les autres données déjà stockées sur l'item : une taille ou une liste de tags stockée sur l'item reste prioritaire sur les valeurs d'un preset lié (voir [Lire un item](#lire-un-item)).

Ce sont les équivalents API de `/zveinminer apply` et `/zveinminer set` (voir [Commandes & Permissions](./commands-permissions)).

```java
ItemStack pickaxe = new ItemStack(Material.DIAMOND_PICKAXE);

veinManager.getVeinPreset("pickaxe-1").ifPresent(preset -> {
    veinManager.applyPreset(pickaxe, preset);
    player.getInventory().addItem(pickaxe);
});
```

Toutes les méthodes qui modifient un item (`applyPreset`, `setPreset`, `changeSize`, `addTag`, `removeTag`) modifient l'`ItemStack` que vous passez via son `ItemMeta`. Si le stack est une copie, remettez-le dans l'inventaire ensuite.

### Lire un item

`getVeinMinerResult` renvoie `Optional.empty()` lorsque l'item n'a aucune donnée de vein mining. Sinon, il résout les valeurs effectives :

1. la taille et les tags du preset lié (si l'item a un nom de preset et que le preset existe toujours) ;
2. remplacés par la taille stockée sur l'item, s'il y en a une ;
3. remplacés par les tags stockés sur l'item, s'il y en a.

```java
ItemStack hand = player.getInventory().getItemInMainHand();

veinManager.getVeinMinerResult(hand).ifPresent(result -> {
    int size = result.size();
    List<String> tags = result.tags().stream().map(Taggable::asString).toList();
    player.sendMessage("Vein size: " + size + " - tags: " + String.join(", ", tags));
});
```

### Modifier la taille et les tags

```java
ItemStack hand = player.getInventory().getItemInMainHand();

// Size stored on the item, 0 removes it and falls back to the preset size
veinManager.changeSize(hand, 16);

// Tags: Bukkit tag names (COAL_ORES, LOGS...) or block materials (DIAMOND_ORE...)
for (Taggable taggable : veinManager.getTaggables("IRON_ORES, ANCIENT_DEBRIS")) {
    veinManager.addTag(hand, taggable);
}

veinManager.getTaggables("IRON_ORES").forEach(taggable -> veinManager.removeTag(hand, taggable));
```

À propos des tags :

- `getTaggables` découpe la chaîne sur les virgules, supprime les espaces autour de chaque valeur, n'est pas sensible à la casse, et ignore silencieusement les valeurs qui ne sont ni le nom d'une constante `Tag` de matériaux Bukkit (`COAL_ORES`, `LOGS`...) ni un matériau de bloc (les items comme `DIAMOND` ne sont pas des blocs et sont ignorés ; `NETHERITE_SCRAP` est converti en `ANCIENT_DEBRIS` pour les anciennes configurations).
- `addTag` et `removeTag` partent des tags **effectifs** (y compris ceux hérités du preset), comparent les tags sans tenir compte de la casse avec `asString()`, puis stockent la nouvelle liste sur l'item.
- Retirer le dernier tag stocke une liste vide : l'item ne revient **pas** aux tags du preset.

La syntaxe des tags est décrite dans [Presets & Tags](./presets-and-tags).

## Types de données

### VeinPreset

Un preset chargé depuis la liste `presets` de `config.yml`.

| Méthode | Retour | Description |
|---------|--------|-------------|
| `getName()` | `String` | Nom du preset |
| `getMaxVeinSize()` | `int` | Taille de filon du preset |
| `getTags()` | `List<Taggable>` | Tags du preset |
| `isTagged(Block block)` | `boolean` | `true` si l'un des tags correspond au bloc |
| `getTagsAsString()` | `String` | Tags séparés par des virgules |

### Taggable

Un tag unique : soit un tag de blocs Bukkit, soit un matériau de bloc.

| Méthode | Retour | Description |
|---------|--------|-------------|
| `isTagged(Block block)` | `boolean` | `true` si le bloc correspond à ce tag |
| `asString()` | `String` | Le nom utilisé dans les fichiers de configuration (`COAL_ORES`, `DIAMOND_ORE`...) |

### ItemVeinMinerResult

Un record contenant les données effectives d'un item : `size()` (`int`) et `tags()` (`List<Taggable>`).

### VeinKeys

Les `NamespacedKey` utilisées dans le `PersistentDataContainer` de l'item. Elles utilisent le namespace `zveinminer`.

| Méthode | Clé | Type | Contenu |
|---------|-----|------|---------|
| `getSizeKey()` | `zveinminer:size` | `INTEGER` | Taille de filon stockée sur l'item |
| `getPresetKey()` | `zveinminer:preset` | `STRING` | Nom du preset lié |
| `getTaggableKey()` | `zveinminer:taggable` | `STRING` | Liste de tags séparés par des virgules |

Préférez les méthodes de `VeinManager` plutôt que d'écrire ces clés vous-même : elles gèrent pour vous le repli sur le preset et l'analyse des tags.

### Config

`fr.maxlego08.veinminer.api.Config` expose les valeurs chargées depuis `config.yml` sous forme de champs publics statiques (`cooldown`, `maxSizeLimit`, `requireSneak`, `matchByTag`, `previewEnabled`, `worldBlacklist`, `worldWhitelistMode`, `teleportToPlayer`, `autoPickup`, `checkDurability`, `applyDamage`, `economyEnabled`, `costPerBlock`, `costPerVein`, `enableDebug`, `enableDebugTime`) ainsi que les presets chargés dans `Config.veinPresets` (une `Map<String, VeinPreset>` dans l'ordre du fichier de configuration).

Considérez ces champs comme étant en **lecture seule** : ils sont écrasés à chaque rechargement de la configuration. L'instance de la map `veinPresets` est conservée entre les rechargements, vous pouvez donc garder une référence vers elle sans risque. La signification de chaque option est décrite dans [Configuration](./configuration).

## PlayerManager

`PlayerManager` donne accès à l'activation par joueur (`/zveinminer toggle`) et aux statistiques (`/zveinminer stats`).

| Méthode | Retour | Description |
|---------|--------|-------------|
| `getPlayerData(Player player)` | `PlayerData` | Données d'un joueur en ligne, chargées depuis le stockage si nécessaire |
| `getPlayerData(UUID uuid)` | `Optional<PlayerData>` | Uniquement les données **déjà chargées en mémoire**, vide sinon |
| `isEnabled(Player player)` | `boolean` | Indique si le vein mining est activé pour le joueur |
| `toggle(Player player)` | `boolean` | Inverse l'activation du vein mining, renvoie le nouvel état |
| `setEnabled(Player player, boolean enabled)` | `void` | Active ou désactive le vein mining pour le joueur |
| `updateStats(Player player, int blocksMined)` | `void` | Ajoute `blocksMined` blocs et **un** filon aux statistiques |
| `loadPlayerData(UUID uuid)` | `void` | Charge les données depuis le stockage en mémoire |
| `savePlayerData(UUID uuid)` | `void` | Sauvegarde les données en mémoire dans le stockage |
| `unloadPlayerData(UUID uuid)` | `void` | Sauvegarde les données et les retire de la mémoire |

Les données des joueurs sont stockées dans `plugins/zVeinMiner/playerdata/<uuid>.yml`. Elles sont chargées à la connexion et sauvegardées à la déconnexion ainsi qu'à l'arrêt du serveur ; les modifications faites via l'API restent en mémoire jusque-là, appelez `savePlayerData` si vous avez besoin qu'elles soient écrites immédiatement.

Lorsque le vein mining est désactivé pour un joueur, zVeinMiner ne déclenche aucun filon pour lui.

```java
// Disable vein mining while a player is in a minigame
playerManager.setEnabled(player, false);

// Read the statistics
PlayerData data = playerManager.getPlayerData(player);
player.sendMessage("Blocks: " + data.totalBlocksMined() + " - veins: " + data.totalVeinsMined());
```

### PlayerData

Un record immuable :

| Composant | Type | Description |
|-----------|------|-------------|
| `uuid()` | `UUID` | UUID du joueur |
| `veinMinerEnabled()` | `boolean` | Activation du vein mining (par défaut `true`) |
| `totalBlocksMined()` | `long` | Blocs minés avec le vein mining, bloc d'origine compris |
| `totalVeinsMined()` | `long` | Nombre de filons minés |

Il fournit également `defaultData(UUID)`, `withToggled()`, `withEnabled(boolean)` et `withStats(int, boolean)`, qui renvoient de nouvelles instances. Créer un nouveau record ne modifie pas les données stockées : utilisez les méthodes de `PlayerManager` pour mettre à jour un joueur.

## Événements

Tous les événements se trouvent dans `fr.maxlego08.veinminer.api.events`, étendent `PlayerEvent` et sont déclenchés sur le thread principal. Ils ne sont déclenchés que lorsqu'un filon est réellement lancé : le joueur n'est pas en mode Aventure ou Spectateur, possède la permission `zveinminer.use` et a le vein mining activé, le monde est autorisé, le joueur est accroupi si `require-sneak` est activé, l'outil a une taille effective supérieure à `1` (après le plafond `max-size-limit`), un tag correspondant au bloc et est l'outil adapté à ce bloc, le cooldown est terminé (ou le joueur possède `zveinminer.bypass.cooldown`), le filon contient au moins un bloc autre que l'origine autorisé par les vérifications de protection, et, lorsque l'économie est activée, le joueur a les moyens de payer le filon.

L'ordre est le suivant :

1. le joueur casse le bloc d'origine (`BlockBreakEvent` vanilla) ;
2. `VeinMineStartEvent` - une seule fois, avec tous les blocs du filon ;
3. pour chaque bloc : `VeinMineBlockEvent`, puis un `BlockBreakEvent` classique déclenché par `Player#breakBlock` ;
4. `VeinMineCompleteEvent` - une seule fois, avec les blocs réellement cassés.

### VeinMineStartEvent

Annulable. L'annuler empêche tout le vein mining (le bloc d'origine est tout de même cassé normalement).

| Méthode | Retour | Description |
|---------|--------|-------------|
| `getOriginBlock()` | `Block` | Bloc cassé par le joueur |
| `getBlocks()` | `Set<Block>` | Blocs qui vont être cassés, origine exclue, déjà filtrés par les vérifications de protection - **modifiable** |
| `getBlockCount()` | `int` | Taille de `getBlocks()` |
| `getTool()` | `ItemStack` | Outil en main principale |

Vous pouvez ajouter ou retirer des blocs de `getBlocks()`. Les blocs ajoutés sont ignorés s'il s'agit du bloc d'origine, d'air, s'ils sont dans un autre monde ou dans un chunk non chargé, et ils passent quand même par les vérifications de protection (WorldGuard, GriefPrevention, protection du spawn). Si l'économie est activée et que vous ajoutez des blocs, le solde du joueur est vérifié à nouveau pour le nouveau total.

```java
@EventHandler
public void onVeinStart(VeinMineStartEvent event) {
    // Never vein mine more than 10 blocks below Y=0
    if (event.getOriginBlock().getY() < 0 && event.getBlockCount() > 10) {
        event.setCancelled(true);
        event.getPlayer().sendMessage("Vein too large at this depth!");
    }

    // Never break blocks next to a spawner
    event.getBlocks().removeIf(block -> isNearSpawner(block));
}
```

### VeinMineBlockEvent

Annulable. Déclenché avant que chaque bloc supplémentaire ne soit cassé ; l'annuler ignore uniquement ce bloc.

| Méthode | Retour | Description |
|---------|--------|-------------|
| `getBlock()` | `Block` | Bloc sur le point d'être cassé |
| `getOriginBlock()` | `Block` | Bloc cassé par le joueur |
| `getTool()` | `ItemStack` | Outil en main principale |
| `getBlockIndex()` | `int` | Index du bloc dans le filon (à partir de 0) |
| `getTotalBlocks()` | `int` | Nombre de blocs dans le filon, origine exclue |

```java
@EventHandler
public void onVeinBlock(VeinMineBlockEvent event) {
    // Keep the blocks marked as placed by a player
    if (isPlacedByPlayer(event.getBlock())) {
        event.setCancelled(true);
    }
}
```

### VeinMineCompleteEvent

Non annulable : les blocs sont déjà cassés. Déclenché chaque fois qu'un `VeinMineStartEvent` n'a pas été annulé, même si aucun bloc supplémentaire n'a pu être cassé (par exemple lorsque le joueur n'a pas les moyens de payer le filon).

| Méthode | Retour | Description |
|---------|--------|-------------|
| `getOriginBlock()` | `Block` | Bloc cassé par le joueur |
| `getBrokenBlocks()` | `Set<Block>` | Blocs réellement cassés, origine **exclue** |
| `getTool()` | `ItemStack` | Outil en main principale |
| `getTotalBlocksBroken()` | `int` | Nombre de blocs cassés, origine **comprise** |

```java
@EventHandler
public void onVeinComplete(VeinMineCompleteEvent event) {
    if (event.getBrokenBlocks().isEmpty()) return;

    int total = event.getTotalBlocksBroken();
    event.getPlayer().sendActionBar(Component.text("Vein mined: " + total + " blocks"));
}
```

<CalloutContainer type="tip">

<CalloutTitle>Un BlockBreakEvent pour chaque bloc</CalloutTitle>

<CalloutDescription>
Chaque bloc supplémentaire est cassé avec `Player#breakBlock`, qui déclenche un `BlockBreakEvent` normal. Les plugins qui écoutent déjà `BlockBreakEvent` (jobs, logs, quêtes, protections) gèrent les blocs minés par filon sans aucun code spécifique à zVeinMiner. N'utilisez les événements de zVeinMiner que si vous avez besoin de savoir qu'un bloc fait partie d'un filon.
</CalloutDescription>

</CalloutContainer>

## Hooks de protection

L'API contient une interface `fr.maxlego08.veinminer.api.hooks.ProtectionHook` (`getName()`, `isAvailable()`, `canBreak(Player, Block)`), implémentée par les hooks intégrés WorldGuard et GriefPrevention. Il n'existe actuellement **aucune méthode publique pour enregistrer votre propre hook**.

Pour protéger des blocs du vein mining dans votre propre plugin, annulez soit le `BlockBreakEvent` déclenché pour chaque bloc, soit le `VeinMineBlockEvent`, ou retirez des blocs dans le `VeinMineStartEvent`. Les hooks intégrés sont décrits dans [Intégrations](./integrations).

## Exemple complet

Un petit plugin qui donne une pioche de vein mining à la première connexion et récompense les grands filons :

```java
package com.example.veinrewards;

import fr.maxlego08.veinminer.api.VeinManager;
import fr.maxlego08.veinminer.api.events.VeinMineCompleteEvent;
import org.bukkit.Material;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.inventory.ItemStack;
import org.bukkit.plugin.java.JavaPlugin;

public class VeinRewardsPlugin extends JavaPlugin implements Listener {

    private VeinManager veinManager;

    @Override
    public void onEnable() {
        this.veinManager = getServer().getServicesManager().load(VeinManager.class);
        if (this.veinManager == null) {
            getLogger().warning("zVeinMiner not found, disabling.");
            getServer().getPluginManager().disablePlugin(this);
            return;
        }
        getServer().getPluginManager().registerEvents(this, this);
    }

    @EventHandler
    public void onJoin(PlayerJoinEvent event) {
        if (event.getPlayer().hasPlayedBefore()) return;

        ItemStack pickaxe = new ItemStack(Material.IRON_PICKAXE);
        this.veinManager.getVeinPreset("pickaxe-1").ifPresent(preset -> {
            this.veinManager.applyPreset(pickaxe, preset);
            event.getPlayer().getInventory().addItem(pickaxe);
        });
    }

    @EventHandler
    public void onVeinComplete(VeinMineCompleteEvent event) {
        if (event.getTotalBlocksBroken() >= 8) {
            event.getPlayer().giveExp(10);
        }
    }
}
```

`pickaxe-1` est le preset fourni dans le `config.yml` par défaut ; remplacez-le par l'un de vos propres presets.
