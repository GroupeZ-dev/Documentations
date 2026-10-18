---
title: "Événements"
description: "Événements personnalisés déclenchés par zEssentials pour les développeurs"
---

# Événements

zEssentials déclenche des événements personnalisés qui permettent aux développeurs de réagir aux différentes actions effectuées par le plugin. Ces événements suivent le système d'événements standard de Bukkit et peuvent être écoutés avec `@EventHandler` dans n'importe quel listener enregistré.

---

## Hiérarchie des événements

Tous les événements de zEssentials héritent d'une hiérarchie de base :

```
Event
  └── EssentialsEvent
        ├── UserEvent
        │     └── CancellableUserEvent (implements Cancellable)
        └── CancellableEssentialsEvent (implements Cancellable)
```

- **EssentialsEvent** -- Événement de base de tous les événements de zEssentials.
- **UserEvent** -- Hérite d'`EssentialsEvent` et contient une référence vers l'utilisateur concerné.
- **CancellableUserEvent** -- Hérite d'`UserEvent` et implémente `Cancellable`, ce qui permet d'annuler l'événement.
- **CancellableEssentialsEvent** -- Hérite d'`EssentialsEvent` et implémente `Cancellable`, pour les événements annulables qui ne concernent pas un utilisateur précis.

---

## Écouter les événements

Pour écouter les événements de zEssentials, enregistrez un listener Bukkit comme d'habitude :

```java
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;

public class MyListener implements Listener {

    @EventHandler
    public void onUserFirstJoin(UserFirstJoinEvent event) {
        // Your logic here
    }
}
```

Enregistrez le listener dans le `onEnable()` de votre plugin :

```java
@Override
public void onEnable() {
    getServer().getPluginManager().registerEvents(new MyListener(), this);
}
```

---

## Dépendre de zEssentials

Depuis la 1.0.4.0, zEssentials est chargé en tant que **plugin Paper** (`paper-plugin.yml`). Déclarez-le comme dépendance de votre plugin pour qu'il soit chargé en premier et que ses classes soient visibles par votre plugin :

**Plugin Bukkit (`plugin.yml`)**

```yaml
softdepend: [ zEssentials ] # ou depend: [ zEssentials ]
```

**Plugin Paper (`paper-plugin.yml`)**

Les plugins Paper sont isolés les uns des autres : ajoutez `join-classpath: true` pour accéder à l'API de zEssentials.

```yaml
dependencies:
  server:
    zEssentials:
      load: BEFORE
      required: false
      join-classpath: true
```

L'instance principale de zEssentials est enregistrée dans le `ServicesManager` de Bukkit sous `EssentialsPlugin` :

```java
RegisteredServiceProvider<EssentialsPlugin> provider = Bukkit.getServicesManager().getRegistration(EssentialsPlugin.class);
if (provider != null) {
    EssentialsPlugin essentials = provider.getProvider();
    // Use the API
}
```

<CalloutContainer type="info">

<CalloutDescription>
zEssentials nécessite Paper 1.20.6+ (mappings Mojang). Sur Spigot, le plugin reste inactif et l'API n'est **pas** disponible.
</CalloutDescription>

</CalloutContainer>

---

## Référence des événements

### UserFirstJoinEvent

Déclenché lorsqu'un joueur rejoint le serveur pour la toute première fois.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `UserEvent` |
| Annulable | Non |

```java
@EventHandler
public void onFirstJoin(UserFirstJoinEvent event) {
    User user = event.getUser();
    Bukkit.getLogger().info(user.getName() + " joined for the first time!");
}
```

---

### UserJoinEvent

Déclenché à chaque fois qu'un joueur rejoint le serveur.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `UserEvent` |
| Annulable | Non |

```java
@EventHandler
public void onJoin(UserJoinEvent event) {
    User user = event.getUser();
    Bukkit.getLogger().info(user.getName() + " has joined the server.");
}
```

---

### UserQuitEvent

Déclenché lorsqu'un joueur quitte le serveur.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `UserEvent` |
| Annulable | Non |

```java
@EventHandler
public void onQuit(UserQuitEvent event) {
    User user = event.getUser();
    Bukkit.getLogger().info(user.getName() + " has left the server.");
}
```

---

### UserEconomyUpdateEvent

Déclenché **avant** la mise à jour du solde d'un joueur. C'est un événement pré-transaction qui permet d'inspecter, de modifier ou d'annuler l'opération avant qu'elle ne soit appliquée.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `CancellableUserEvent` |
| Annulable | **Oui** |

**Méthodes disponibles :**
- `getEconomy()` / `setEconomy()` -- obtenir ou changer l'économie ciblée
- `getAmount()` / `setAmount()` -- obtenir ou modifier le montant de la transaction
- `setCancelled(true)` -- annuler complètement la transaction

```java
@EventHandler
public void onEconomyUpdate(UserEconomyUpdateEvent event) {
    User user = event.getUser();
    double amount = event.getAmount();

    // Prevent transactions over 1,000,000
    if (amount > 1_000_000) {
        event.setCancelled(true);
        return;
    }

    // Apply a tax by reducing the amount
    event.setAmount(amount * 0.95);
}
```

---

### UserEconomyPostUpdateEvent

Déclenché **après** la mise à jour du solde d'un joueur. C'est un événement post-transaction purement informatif : la transaction a déjà été validée et ne peut plus être modifiée ni annulée.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `UserEvent` |
| Annulable | Non |

```java
@EventHandler
public void onPostEconomyUpdate(UserEconomyPostUpdateEvent event) {
    User user = event.getUser();
    Bukkit.getLogger().info("Balance updated for " + user.getName());
}
```

---

### EconomyBaltopUpdateEvent

Déclenché lorsque le classement des soldes (baltop) est recalculé et mis à jour.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `EssentialsEvent` |
| Annulable | Non |

**Méthodes disponibles :**
- `getBaltop()` -- renvoie l'objet `Baltop` contenant le classement mis à jour

```java
@EventHandler
public void onBaltopUpdate(EconomyBaltopUpdateEvent event) {
    Baltop baltop = event.getBaltop();
    Bukkit.getLogger().info("Baltop rankings have been updated.");
}
```

---

### DiscordLinkEvent

Déclenché lorsqu'un joueur lie son compte Discord à son compte Minecraft.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `CancellableUserEvent` |
| Annulable | **Oui** |

**Méthodes disponibles :**
- `getDiscordAccount()` -- renvoie le `DiscordAccount` en cours de liaison

```java
@EventHandler
public void onDiscordLink(DiscordLinkEvent event) {
    User user = event.getUser();
    DiscordAccount account = event.getDiscordAccount();

    Bukkit.getLogger().info(user.getName() + " linked Discord account: " + account.getUserId());

    // Cancel the link if needed
    // event.setCancelled(true);
}
```

---

### DiscordUnlinkEvent

Déclenché lorsqu'un joueur supprime la liaison entre son compte Discord et son compte Minecraft.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `CancellableUserEvent` |
| Annulable | **Oui** |

**Méthodes disponibles :**
- `getDiscordAccount()` -- renvoie le `DiscordAccount` dont la liaison est supprimée

```java
@EventHandler
public void onDiscordUnlink(DiscordUnlinkEvent event) {
    User user = event.getUser();
    DiscordAccount account = event.getDiscordAccount();

    Bukkit.getLogger().info(user.getName() + " unlinked Discord account: " + account.getUserId());

    // Cancel the unlink if needed
    // event.setCancelled(true);
}
```

---

### StepCreateEvent

Déclenché lorsqu'une étape est créée pour un joueur. Les étapes sont des jalons de progression du système d'étapes de zEssentials.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `CancellableUserEvent` |
| Annulable | **Oui** |

**Méthodes disponibles :**
- `getStep()` -- renvoie le `Step` en cours de création

```java
@EventHandler
public void onStepCreate(StepCreateEvent event) {
    User user = event.getUser();
    Step step = event.getStep();

    Bukkit.getLogger().info("Step created for " + user.getName() + ": " + step.getName());
}
```

---

### StepFinishEvent

Déclenché lorsqu'un joueur termine une étape.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `CancellableUserEvent` |
| Annulable | **Oui** |

**Méthodes disponibles :**
- `getPlayerStep()` -- renvoie le `PlayerStep` qui vient d'être terminé

```java
@EventHandler
public void onStepFinish(StepFinishEvent event) {
    User user = event.getUser();
    PlayerStep playerStep = event.getPlayerStep();

    Bukkit.getLogger().info(user.getName() + " completed a step!");

    // Cancel to prevent the step from being marked as finished
    // event.setCancelled(true);
}
```

---

### UserVoteEvent

Déclenché lorsqu'un joueur vote pour le serveur.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `CancellableEssentialsEvent` |
| Annulable | **Oui** |

**Méthodes disponibles :**
- `getUniqueId()` -- renvoie l'`UUID` du joueur qui a voté
- `getSiteName()` -- renvoie le nom du site de vote

```java
@EventHandler
public void onVote(UserVoteEvent event) {
    UUID playerId = event.getUniqueId();
    String site = event.getSiteName();

    Bukkit.getLogger().info("Player " + playerId + " voted on " + site);

    // Cancel to prevent the vote from being recorded
    // event.setCancelled(true);
}
```

---

### VotePartyEvent

Déclenché au fil de la progression de la vote party. Cet événement est déclenché à chaque vote qui compte pour le seuil de la vote party, ce qui permet de suivre ou de modifier la progression.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `CancellableEssentialsEvent` |
| Annulable | **Oui** |

**Méthodes disponibles :**
- `getVotePartyAmount()` / `setVotePartyAmount()` -- obtenir ou modifier la progression actuelle de la vote party

```java
@EventHandler
public void onVotePartyProgress(VotePartyEvent event) {
    int currentAmount = event.getVotePartyAmount();

    // Double the vote party contribution
    event.setVotePartyAmount(currentAmount + 1);

    Bukkit.getLogger().info("Vote party progress: " + event.getVotePartyAmount());
}
```

---

### VotePartyStartEvent

Déclenché lorsque le seuil de la vote party est atteint et que la vote party est sur le point de commencer.

| Propriété | Valeur |
|-----------|--------|
| Classe parente | `CancellableEssentialsEvent` |
| Annulable | **Oui** |

```java
@EventHandler
public void onVotePartyStart(VotePartyStartEvent event) {
    Bukkit.getLogger().info("Vote party is starting!");

    // Cancel to prevent the vote party from starting
    // event.setCancelled(true);
}
```

---

## Tableau récapitulatif

| Événement | Parent | Annulable | Description |
|-----------|--------|-----------|-------------|
| `UserFirstJoinEvent` | `UserEvent` | Non | Première connexion d'un joueur |
| `UserJoinEvent` | `UserEvent` | Non | Toute connexion d'un joueur |
| `UserQuitEvent` | `UserEvent` | Non | Déconnexion d'un joueur |
| `UserEconomyUpdateEvent` | `CancellableUserEvent` | **Oui** | Avant la mise à jour du solde |
| `UserEconomyPostUpdateEvent` | `UserEvent` | Non | Après la mise à jour du solde |
| `EconomyBaltopUpdateEvent` | `EssentialsEvent` | Non | Classement baltop recalculé |
| `DiscordLinkEvent` | `CancellableUserEvent` | **Oui** | Compte Discord lié |
| `DiscordUnlinkEvent` | `CancellableUserEvent` | **Oui** | Liaison du compte Discord supprimée |
| `StepCreateEvent` | `CancellableUserEvent` | **Oui** | Étape créée pour un joueur |
| `StepFinishEvent` | `CancellableUserEvent` | **Oui** | Étape terminée par un joueur |
| `UserVoteEvent` | `CancellableEssentialsEvent` | **Oui** | Un joueur vote |
| `VotePartyEvent` | `CancellableEssentialsEvent` | **Oui** | Progression de la vote party |
| `VotePartyStartEvent` | `CancellableEssentialsEvent` | **Oui** | Seuil de la vote party atteint |
