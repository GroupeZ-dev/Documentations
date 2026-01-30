---
sidebar_position: 1
title: API
description: Documentation developpeur pour l'API zQuests
---

# API zQuests

zQuests fournit une API pour les developpeurs afin d'interagir avec les quetes, gerer la progression et creer des integrations personnalisees.

## Configuration

### Maven/Gradle

Ajoutez l'API zQuests comme dependance :

```kotlin
repositories {
    maven {
        name = "groupezReleases"
        url = uri("https://repo.groupez.dev/releases")
    }
}

dependencies {
    compileOnly("fr.maxlego08.quests:zquests-api:<version>")
}
```

Remplacez `<version>` par la version de zQuests executee sur votre serveur.

### plugin.yml

Ajoutez zQuests comme dependance :

```yaml
depend: [zQuests]
# ou
softdepend: [zQuests]
```

## Acces aux managers

Utilisez le `ServicesManager` de Bukkit pour acceder aux managers de zQuests :

```java
import fr.maxlego08.quests.api.QuestManager;
import fr.maxlego08.quests.api.HologramManager;
import fr.maxlego08.quests.api.WayPointManager;
import org.bukkit.Bukkit;

public class MonPlugin extends JavaPlugin {

    private QuestManager questManager;
    private HologramManager hologramManager;
    private WayPointManager wayPointManager;

    @Override
    public void onEnable() {
        // Obtenir le manager de quetes
        questManager = Bukkit.getServicesManager().load(QuestManager.class);

        // Obtenir le manager d'hologrammes (optionnel)
        hologramManager = Bukkit.getServicesManager().load(HologramManager.class);

        // Obtenir le manager de waypoints (optionnel)
        wayPointManager = Bukkit.getServicesManager().load(WayPointManager.class);

        if (questManager != null) {
            getLogger().info("API zQuests chargee !");
        }
    }
}
```

## Quest Manager

Le `QuestManager` est l'interface principale de l'API pour interagir avec les quetes.

### Obtenir les informations de quete

```java
// Obtenir une quete par son nom
Optional<Quest> quest = questManager.getQuest("casseur-pierre-1");

// Obtenir toutes les quetes
List<Quest> toutesQuetes = questManager.getQuests();

// Verifier si une quete existe
boolean existe = questManager.getQuest("nom-quete").isPresent();
```

### Donnees de quete du joueur

```java
UUID playerId = player.getUniqueId();

// Obtenir les quetes actives du joueur
List<ActiveQuest> quetesActives = questManager.getActiveQuests(playerId);

// Verifier si le joueur a une quete specifique active
boolean aQuete = questManager.hasActiveQuest(playerId, "casseur-pierre-1");

// Obtenir la progression du joueur sur une quete
Optional<ActiveQuest> queteActive = questManager.getActiveQuest(playerId, "casseur-pierre-1");
if (queteActive.isPresent()) {
    int progression = queteActive.get().getProgress();
    int objectif = queteActive.get().getQuest().getGoal();
}
```

### Demarrer et completer des quetes

```java
// Demarrer une quete pour un joueur
questManager.startQuest(playerId, "casseur-pierre-1");

// Completer une quete pour un joueur
questManager.completeQuest(playerId, "casseur-pierre-1");

// Supprimer une quete des donnees du joueur
questManager.deleteQuest(playerId, "casseur-pierre-1");

// Redemarrer une quete
questManager.restartQuest(playerId, "casseur-pierre-1");
```

### Modifier la progression

```java
// Definir une valeur de progression exacte
questManager.setProgress(playerId, "casseur-pierre-1", 250);

// Ajouter a la progression
questManager.addProgress(playerId, "casseur-pierre-1", 10);
```

### Gerer les evenements de quete

Declenchez la progression de quete pour des types de quetes specifiques :

```java
// Gerer la progression de casse de bloc
int misAJour = questManager.handleQuests(
    playerId,
    QuestType.BLOCK_BREAK,
    1,  // quantite
    Material.STONE  // donnees de l'action
);

// Gerer la progression de meurtre d'entite
questManager.handleQuests(
    playerId,
    QuestType.ENTITY_KILL,
    1,
    EntityType.ZOMBIE
);

// Gerer la progression de quete personnalisee
questManager.handleQuests(
    playerId,
    QuestType.CUSTOM,
    1,
    "mes-donnees-personnalisees"
);
```

La valeur de retour indique combien de quetes ont ete mises a jour.

## Types de quetes personnalises

### Utilisation du type CUSTOM

Le type de quete `CUSTOM` vous permet de creer des quetes suivies par votre propre logique :

```yaml
quests:
  - type: CUSTOM
    name: "parler-pnj"
    display-name: "Parler au Guide"
    goal: 1
    actions:
      - data: "pnj:guide"
```

Declenchez la progression depuis votre plugin :

```java
// Quand le joueur parle a votre PNJ
public void onInteractionPNJ(Player player, String pnjId) {
    QuestManager manager = Bukkit.getServicesManager().load(QuestManager.class);
    if (manager != null) {
        // Les donnees doivent correspondre aux donnees d'action de la quete
        int resultat = manager.handleQuests(
            player.getUniqueId(),
            QuestType.CUSTOM,
            1,
            "pnj:" + pnjId
        );

        if (resultat > 0) {
            // La/les quete(s) ont ete mises a jour
            player.sendMessage("Progression de quete mise a jour !");
        }
    }
}
```

### Quetes de contenu d'inventaire

Pour les quetes `INVENTORY_CONTENT` qui necessitent la livraison d'items :

```java
// Creer la verification du contenu d'inventaire
InventoryContent content = new InventoryContent(player, "nom_pnj");

// Traiter la quete (verifie l'inventaire et retire les items)
int resultat = questManager.handleInventoryQuests(content);
```

## Evenements

zQuests declenche plusieurs evenements que vous pouvez ecouter :

### QuestStartEvent

Declenche quand une quete demarre pour un joueur.

```java
@EventHandler
public void onQuestStart(QuestStartEvent event) {
    Player player = event.getPlayer();
    Quest quest = event.getQuest();

    if (player != null) {
        player.sendMessage("Quete demarree : " + quest.getDisplayName());
    }
}
```

### QuestProgressEvent

Declenche quand une progression de quete est faite.

```java
@EventHandler
public void onQuestProgress(QuestProgressEvent event) {
    Player player = event.getPlayer();
    ActiveQuest queteActive = event.getActiveQuest();
    int progression = queteActive.getProgress();
    int objectif = queteActive.getQuest().getGoal();

    if (player != null) {
        player.sendMessage("Progression : " + progression + "/" + objectif);
    }
}
```

### QuestCompleteEvent

Declenche quand une quete est completee.

```java
@EventHandler
public void onQuestComplete(QuestCompleteEvent event) {
    Player player = event.getPlayer();
    Quest quest = event.getActiveQuest().getQuest();

    if (player != null) {
        player.sendMessage("Completee : " + quest.getDisplayName());

        // Donner des recompenses personnalisees
        player.getInventory().addItem(new ItemStack(Material.DIAMOND, 5));
    }
}
```

### QuestFavoriteChangeEvent

Declenche quand le statut favori d'une quete change.

```java
@EventHandler
public void onFavoriteChange(QuestFavoriteChangeEvent event) {
    Player player = event.getPlayer();
    boolean estFavori = event.isFavorite();

    if (player != null && estFavori) {
        player.sendMessage("Quete ajoutee aux favoris !");
    }
}
```

### QuestPostProgressEvent

Declenche apres que la progression de quete soit traitee.

```java
@EventHandler
public void onPostProgress(QuestPostProgressEvent event) {
    // Utile pour le post-traitement ou la journalisation
}
```

### QuestUserLoadEvent

Declenche quand les donnees de quete d'un joueur sont chargees.

```java
@EventHandler
public void onUserLoad(QuestUserLoadEvent event) {
    UUID playerId = event.getPlayerId();
    // Les donnees de quete du joueur sont maintenant disponibles
}
```

## Hologram Manager

Gerez les hologrammes de quetes par programme :

```java
HologramManager hologramManager = Bukkit.getServicesManager().load(HologramManager.class);

if (hologramManager != null) {
    // Rafraichir tous les hologrammes pour un joueur
    hologramManager.refreshHolograms(player);

    // Rafraichir tous les hologrammes globalement
    hologramManager.refreshAllHolograms();
}
```

## Waypoint Manager

Gerez les waypoints de quetes :

```java
WayPointManager wayPointManager = Bukkit.getServicesManager().load(WayPointManager.class);

if (wayPointManager != null) {
    // Rafraichir les waypoints pour un joueur
    wayPointManager.refreshWaypoints(player);
}
```

## Exemple complet

Voici un exemple de plugin complet qui s'integre avec zQuests :

```java
package com.exemple.integrationquetes;

import fr.maxlego08.quests.api.QuestManager;
import fr.maxlego08.quests.api.QuestType;
import fr.maxlego08.quests.api.events.QuestCompleteEvent;
import org.bukkit.Bukkit;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerInteractEntityEvent;
import org.bukkit.plugin.java.JavaPlugin;

public class IntegrationQuetes extends JavaPlugin implements Listener {

    private QuestManager questManager;

    @Override
    public void onEnable() {
        questManager = Bukkit.getServicesManager().load(QuestManager.class);

        if (questManager == null) {
            getLogger().warning("zQuests non trouve !");
            return;
        }

        getServer().getPluginManager().registerEvents(this, this);
        getLogger().info("Integration de quetes activee !");
    }

    @EventHandler
    public void onInteractionPNJ(PlayerInteractEntityEvent event) {
        Player player = event.getPlayer();

        // Exemple : Declencher une quete personnalisee quand le joueur interagit avec un villageois
        if (event.getRightClicked().getType().name().equals("VILLAGER")) {
            int resultat = questManager.handleQuests(
                player.getUniqueId(),
                QuestType.CUSTOM,
                1,
                "villageois:interaction"
            );

            if (resultat > 0) {
                player.sendMessage("§aProgression de quete : Parle au villageois !");
            }
        }
    }

    @EventHandler
    public void onQuestComplete(QuestCompleteEvent event) {
        Player player = event.getPlayer();
        if (player == null) return;

        String nomQuete = event.getActiveQuest().getQuest().getName();

        // Gestion personnalisee pour des quetes specifiques
        if (nomQuete.equals("quete-speciale")) {
            player.sendMessage("§6§lQuete speciale completee !");
            // Ajoutez votre logique personnalisee ici
        }
    }
}
```

## Bonnes pratiques

1. **Verifiez les null** - Verifiez toujours si les managers sont disponibles
2. **Utilisez les evenements** - Ecoutez les evenements au lieu de verifier periodiquement les changements
3. **Considerations async** - Les operations de quete sont thread-safe mais les callbacks peuvent etre async
4. **Cachez les references** - Stockez les references des managers dans onEnable() au lieu de les recuperer a chaque fois
5. **Gerez les soft dependencies** - Faites de zQuests une soft-depend si votre plugin doit fonctionner sans

## Javadocs de l'API

Pour la documentation complete de l'API, consultez les Javadocs generees depuis le code source ou explorez le module API dans le [depot GitHub](https://github.com/Maxlego08/zQuests).
