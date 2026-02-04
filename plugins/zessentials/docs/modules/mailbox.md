---
sidebar_position: 11
title: Mailbox Module
description: Offline item delivery system for sending items to players
---

# Mailbox Module

**File:** `modules/mailbox/config.yml`

The Mailbox module provides an offline item delivery system that allows players and administrators to send physical items to other players, even when the recipient is offline. Items are stored in a virtual mailbox that the recipient can open at any time to collect their deliveries. Items automatically expire after a configurable duration to prevent indefinite storage.

---

## Source Configuration

```yaml
enable: true
expiration: 86400  # seconds (24 hours)
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Mailbox module |
| `expiration` | Integer | `86400` | Time in seconds before uncollected items expire and are permanently removed from the mailbox. `86400` seconds = 24 hours. Set to `0` to disable expiration |

:::warning
When items expire, they are permanently deleted and cannot be recovered. Choose an expiration duration that gives players enough time to collect their deliveries. A value of `86400` (24 hours) is the default and works well for most servers.
:::

---

## How It Works

1. A player or administrator sends an item to another player's mailbox using the `/mail give` or `/mail give-hand` command.
2. The item is stored in the recipient's virtual mailbox, regardless of whether they are online or offline.
3. When the recipient joins (or at any time while online), they can open their mailbox with `/mail open` to view and collect pending items.
4. If the recipient does not collect items within the configured `expiration` time, the items are automatically removed.
5. Administrators can send items to all players at once using `/mail give-all` or `/mail give-all-hand`.

:::info
Players are notified when they have uncollected items in their mailbox upon joining the server.
:::

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/mail` | `mailbox`, `mb` | `essentials.mail` | Access the mailbox system |

### Mail Subcommands

| Subcommand | Description |
|------------|-------------|
| `open` | Open your mailbox to view and collect pending items |
| `give` | Send an item to a specific player's mailbox |
| `give-hand` | Send the item you are currently holding to a player's mailbox |
| `clear` | Clear all items from your mailbox |
| `give-all` | Send an item to every player's mailbox |
| `give-all-hand` | Send the item you are currently holding to every player's mailbox |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_mailbox_items%` | Returns the number of items currently in the player's mailbox |

:::tip
Use the `%zessentials_user_mailbox_items%` placeholder in scoreboards, holograms, or chat formats to show players how many uncollected items they have. For example, you could display a notification in the scoreboard when the value is greater than zero.
:::

For the full placeholder list, see [Placeholders](../placeholders).

---

## Example: Expiration Configuration

### 24-Hour Expiration (Default)

```yaml
expiration: 86400
```

Items expire after 24 hours if not collected.

### 7-Day Expiration

```yaml
expiration: 604800
```

Items expire after 7 days, giving players more time to log in and collect deliveries.

### No Expiration

```yaml
expiration: 0
```

Items never expire and remain in the mailbox indefinitely until the player collects or clears them.

:::warning
Disabling expiration (`0`) means items will accumulate indefinitely. On large servers with many players, this could increase storage usage over time.
:::
