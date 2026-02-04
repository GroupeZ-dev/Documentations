---
sidebar_position: 2
title: Events
description: Custom events fired by zEssentials for developers
---

# Events

zEssentials fires custom events that allow developers to hook into various actions performed by the plugin. These events follow the standard Bukkit event system and can be listened to using `@EventHandler` in any registered listener.

---

## Event Hierarchy

All zEssentials events extend a base hierarchy:

```
Event
  └── EssentialsEvent
        ├── UserEvent
        │     └── CancellableUserEvent (implements Cancellable)
        └── CancellableEssentialsEvent (implements Cancellable)
```

- **EssentialsEvent** -- Base event for all zEssentials events.
- **UserEvent** -- Extends `EssentialsEvent` and carries a reference to the affected user.
- **CancellableUserEvent** -- Extends `UserEvent` and implements `Cancellable`, allowing the event to be cancelled.
- **CancellableEssentialsEvent** -- Extends `EssentialsEvent` and implements `Cancellable`, for non-user-specific cancellable events.

---

## Listening to Events

To listen to zEssentials events, register a Bukkit listener as you normally would:

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

Register the listener in your plugin's `onEnable()`:

```java
@Override
public void onEnable() {
    getServer().getPluginManager().registerEvents(new MyListener(), this);
}
```

---

## Event Reference

### UserFirstJoinEvent

Fired when a player joins the server for the very first time.

| Property | Value |
|----------|-------|
| Parent class | `UserEvent` |
| Cancellable | No |

```java
@EventHandler
public void onFirstJoin(UserFirstJoinEvent event) {
    User user = event.getUser();
    Bukkit.getLogger().info(user.getName() + " joined for the first time!");
}
```

---

### UserJoinEvent

Fired every time a player joins the server.

| Property | Value |
|----------|-------|
| Parent class | `UserEvent` |
| Cancellable | No |

```java
@EventHandler
public void onJoin(UserJoinEvent event) {
    User user = event.getUser();
    Bukkit.getLogger().info(user.getName() + " has joined the server.");
}
```

---

### UserQuitEvent

Fired when a player quits the server.

| Property | Value |
|----------|-------|
| Parent class | `UserEvent` |
| Cancellable | No |

```java
@EventHandler
public void onQuit(UserQuitEvent event) {
    User user = event.getUser();
    Bukkit.getLogger().info(user.getName() + " has left the server.");
}
```

---

### UserEconomyUpdateEvent

Fired **before** a player's balance is updated. This is a pre-transaction event that allows you to inspect, modify, or cancel the economy operation before it takes effect.

| Property | Value |
|----------|-------|
| Parent class | `CancellableUserEvent` |
| Cancellable | **Yes** |

**Available methods:**
- `getEconomy()` / `setEconomy()` -- get or change the target economy
- `getAmount()` / `setAmount()` -- get or modify the transaction amount
- `setCancelled(true)` -- cancel the transaction entirely

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

Fired **after** a player's balance has been updated. This is a post-transaction event intended for informational purposes only. The transaction has already been committed and cannot be modified or cancelled.

| Property | Value |
|----------|-------|
| Parent class | `UserEvent` |
| Cancellable | No |

```java
@EventHandler
public void onPostEconomyUpdate(UserEconomyPostUpdateEvent event) {
    User user = event.getUser();
    Bukkit.getLogger().info("Balance updated for " + user.getName());
}
```

---

### EconomyBaltopUpdateEvent

Fired when the balance top (baltop) rankings are recalculated and updated.

| Property | Value |
|----------|-------|
| Parent class | `EssentialsEvent` |
| Cancellable | No |

**Available methods:**
- `getBaltop()` -- returns the `Baltop` object containing the updated rankings

```java
@EventHandler
public void onBaltopUpdate(EconomyBaltopUpdateEvent event) {
    Baltop baltop = event.getBaltop();
    Bukkit.getLogger().info("Baltop rankings have been updated.");
}
```

---

### DiscordLinkEvent

Fired when a player links their Discord account to their Minecraft account.

| Property | Value |
|----------|-------|
| Parent class | `CancellableUserEvent` |
| Cancellable | **Yes** |

**Available methods:**
- `getDiscordAccount()` -- returns the `DiscordAccount` being linked

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

Fired when a player unlinks their Discord account from their Minecraft account.

| Property | Value |
|----------|-------|
| Parent class | `CancellableUserEvent` |
| Cancellable | **Yes** |

**Available methods:**
- `getDiscordAccount()` -- returns the `DiscordAccount` being unlinked

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

Fired when a step is created for a player. Steps are progression milestones within the zEssentials step system.

| Property | Value |
|----------|-------|
| Parent class | `CancellableUserEvent` |
| Cancellable | **Yes** |

**Available methods:**
- `getStep()` -- returns the `Step` being created

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

Fired when a player completes a step.

| Property | Value |
|----------|-------|
| Parent class | `CancellableUserEvent` |
| Cancellable | **Yes** |

**Available methods:**
- `getPlayerStep()` -- returns the `PlayerStep` that was completed

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

Fired when a player casts a vote for the server.

| Property | Value |
|----------|-------|
| Parent class | `CancellableEssentialsEvent` |
| Cancellable | **Yes** |

**Available methods:**
- `getUniqueId()` -- returns the `UUID` of the player who voted
- `getSiteName()` -- returns the name of the voting site

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

Fired as the vote party progresses. This event is fired on each vote that contributes toward the vote party threshold, allowing you to track or modify the progress.

| Property | Value |
|----------|-------|
| Parent class | `CancellableEssentialsEvent` |
| Cancellable | **Yes** |

**Available methods:**
- `getVotePartyAmount()` / `setVotePartyAmount()` -- get or modify the current vote party progress amount

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

Fired when the vote party threshold is reached and the vote party is about to start.

| Property | Value |
|----------|-------|
| Parent class | `CancellableEssentialsEvent` |
| Cancellable | **Yes** |

```java
@EventHandler
public void onVotePartyStart(VotePartyStartEvent event) {
    Bukkit.getLogger().info("Vote party is starting!");

    // Cancel to prevent the vote party from starting
    // event.setCancelled(true);
}
```

---

## Summary Table

| Event | Parent | Cancellable | Description |
|-------|--------|-------------|-------------|
| `UserFirstJoinEvent` | `UserEvent` | No | First time a player joins |
| `UserJoinEvent` | `UserEvent` | No | Any player join |
| `UserQuitEvent` | `UserEvent` | No | Player quits |
| `UserEconomyUpdateEvent` | `CancellableUserEvent` | **Yes** | Before balance update |
| `UserEconomyPostUpdateEvent` | `UserEvent` | No | After balance update |
| `EconomyBaltopUpdateEvent` | `EssentialsEvent` | No | Baltop rankings recalculated |
| `DiscordLinkEvent` | `CancellableUserEvent` | **Yes** | Discord account linked |
| `DiscordUnlinkEvent` | `CancellableUserEvent` | **Yes** | Discord account unlinked |
| `StepCreateEvent` | `CancellableUserEvent` | **Yes** | Step created for player |
| `StepFinishEvent` | `CancellableUserEvent` | **Yes** | Step completed by player |
| `UserVoteEvent` | `CancellableEssentialsEvent` | **Yes** | Player votes |
| `VotePartyEvent` | `CancellableEssentialsEvent` | **Yes** | Vote party progress |
| `VotePartyStartEvent` | `CancellableEssentialsEvent` | **Yes** | Vote party threshold reached |
