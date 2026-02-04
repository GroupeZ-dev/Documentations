---
sidebar_position: 2
title: "Evenements"
description: "Evenements personnalises declenches par zEssentials pour les developpeurs"
---

# Evenements

zEssentials declenche des evenements personnalises qui permettent aux developpeurs de se connecter a diverses actions effectuees par le plugin. Ces evenements suivent le systeme d'evenements standard de Bukkit et peuvent etre ecoutes en utilisant `@EventHandler` dans tout listener enregistre.

---

## Hierarchie des Evenements

Tous les evenements de zEssentials etendent une hierarchie de base :

```
Event
  └── EssentialsEvent
        ├── UserEvent
        │     └── CancellableUserEvent (implements Cancellable)
        └── CancellableEssentialsEvent (implements Cancellable)
```

- **EssentialsEvent** -- Evenement de base pour tous les evenements de zEssentials.
- **UserEvent** -- Etend `EssentialsEvent` et contient une reference a l'utilisateur affecte.
- **CancellableUserEvent** -- Etend `UserEvent` et implemente `Cancellable`, permettant l'annulation de l'evenement.
- **CancellableEssentialsEvent** -- Etend `EssentialsEvent` et implemente `Cancellable`, pour les evenements annulables non specifiques a un utilisateur.

---

## Ecouter les Evenements

Pour ecouter les evenements de zEssentials, enregistrez un listener Bukkit comme vous le feriez normalement :

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

## Reference des Evenements

### UserFirstJoinEvent

Declenche lorsqu'un joueur rejoint le serveur pour la toute premiere fois.

| Propriete | Valeur |
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

Declenche a chaque fois qu'un joueur rejoint le serveur.

| Propriete | Valeur |
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

Declenche lorsqu'un joueur quitte le serveur.

| Propriete | Valeur |
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

Declenche **avant** la mise a jour du solde d'un joueur. Il s'agit d'un evenement pre-transaction qui vous permet d'inspecter, modifier ou annuler l'operation economique avant qu'elle ne prenne effet.

| Propriete | Valeur |
|-----------|--------|
| Classe parente | `CancellableUserEvent` |
| Annulable | **Oui** |

**Methodes disponibles :**
- `getEconomy()` / `setEconomy()` -- obtenir ou changer l'economie cible
- `getAmount()` / `setAmount()` -- obtenir ou modifier le montant de la transaction
- `setCancelled(true)` -- annuler entierement la transaction

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

Declenche **apres** la mise a jour du solde d'un joueur. Il s'agit d'un evenement post-transaction destine uniquement a des fins informatives. La transaction a deja ete validee et ne peut pas etre modifiee ou annulee.

| Propriete | Valeur |
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

Declenche lorsque les classements du solde top (baltop) sont recalcules et mis a jour.

| Propriete | Valeur |
|-----------|--------|
| Classe parente | `EssentialsEvent` |
| Annulable | Non |

**Methodes disponibles :**
- `getBaltop()` -- retourne l'objet `Baltop` contenant les classements mis a jour

```java
@EventHandler
public void onBaltopUpdate(EconomyBaltopUpdateEvent event) {
    Baltop baltop = event.getBaltop();
    Bukkit.getLogger().info("Baltop rankings have been updated.");
}
```

---

### DiscordLinkEvent

Declenche lorsqu'un joueur lie son compte Discord a son compte Minecraft.

| Propriete | Valeur |
|-----------|--------|
| Classe parente | `CancellableUserEvent` |
| Annulable | **Oui** |

**Methodes disponibles :**
- `getDiscordAccount()` -- retourne le `DiscordAccount` en cours de liaison

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

Declenche lorsqu'un joueur delie son compte Discord de son compte Minecraft.

| Propriete | Valeur |
|-----------|--------|
| Classe parente | `CancellableUserEvent` |
| Annulable | **Oui** |

**Methodes disponibles :**
- `getDiscordAccount()` -- retourne le `DiscordAccount` en cours de deliaison

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

Declenche lorsqu'une etape est creee pour un joueur. Les etapes sont des jalons de progression dans le systeme d'etapes de zEssentials.

| Propriete | Valeur |
|-----------|--------|
| Classe parente | `CancellableUserEvent` |
| Annulable | **Oui** |

**Methodes disponibles :**
- `getStep()` -- retourne le `Step` en cours de creation

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

Declenche lorsqu'un joueur termine une etape.

| Propriete | Valeur |
|-----------|--------|
| Classe parente | `CancellableUserEvent` |
| Annulable | **Oui** |

**Methodes disponibles :**
- `getPlayerStep()` -- retourne le `PlayerStep` qui a ete complete

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

Declenche lorsqu'un joueur vote pour le serveur.

| Propriete | Valeur |
|-----------|--------|
| Classe parente | `CancellableEssentialsEvent` |
| Annulable | **Oui** |

**Methodes disponibles :**
- `getUniqueId()` -- retourne l'`UUID` du joueur qui a vote
- `getSiteName()` -- retourne le nom du site de vote

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

Declenche au fur et a mesure que la vote party progresse. Cet evenement est declenche a chaque vote qui contribue au seuil de la vote party, vous permettant de suivre ou modifier la progression.

| Propriete | Valeur |
|-----------|--------|
| Classe parente | `CancellableEssentialsEvent` |
| Annulable | **Oui** |

**Methodes disponibles :**
- `getVotePartyAmount()` / `setVotePartyAmount()` -- obtenir ou modifier le montant de progression actuel de la vote party

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

Declenche lorsque le seuil de la vote party est atteint et que la vote party est sur le point de commencer.

| Propriete | Valeur |
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

## Tableau Recapitulatif

| Evenement | Parent | Annulable | Description |
|-----------|--------|-----------|-------------|
| `UserFirstJoinEvent` | `UserEvent` | Non | Premiere connexion d'un joueur |
| `UserJoinEvent` | `UserEvent` | Non | Toute connexion d'un joueur |
| `UserQuitEvent` | `UserEvent` | Non | Deconnexion d'un joueur |
| `UserEconomyUpdateEvent` | `CancellableUserEvent` | **Oui** | Avant la mise a jour du solde |
| `UserEconomyPostUpdateEvent` | `UserEvent` | Non | Apres la mise a jour du solde |
| `EconomyBaltopUpdateEvent` | `EssentialsEvent` | Non | Classements baltop recalcules |
| `DiscordLinkEvent` | `CancellableUserEvent` | **Oui** | Compte Discord lie |
| `DiscordUnlinkEvent` | `CancellableUserEvent` | **Oui** | Compte Discord delie |
| `StepCreateEvent` | `CancellableUserEvent` | **Oui** | Etape creee pour un joueur |
| `StepFinishEvent` | `CancellableUserEvent` | **Oui** | Etape completee par un joueur |
| `UserVoteEvent` | `CancellableEssentialsEvent` | **Oui** | Un joueur vote |
| `VotePartyEvent` | `CancellableEssentialsEvent` | **Oui** | Progression de la vote party |
| `VotePartyStartEvent` | `CancellableEssentialsEvent` | **Oui** | Seuil de la vote party atteint |
