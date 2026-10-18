---
title: Mailbox Module
description: Offline item delivery and text mails for players, online or offline
---

# Mailbox Module

**File:** `modules/mailbox/config.yml`

The Mailbox module provides two complementary features:

- **Item mailbox**: administrators send physical items to a player's virtual mailbox, even when the player is offline. The player opens the mailbox GUI to collect the items, which expire after a configurable duration.
- **Text mails**: players send short text messages to another player, online or offline. The recipient reads them with `/mail read`, and is notified on join when unread mails are waiting.

---

## Source Configuration

```yaml
enable: true

# The expiration time of items when added to the mailbox
# If the player does not recover his items with expiration they will be deleted permanently.
expiration: 86400

# Settings of the text mails, sent with /mail send <player> <message>
# A mail can be sent to an offline player, it will be readable with /mail read on his next connection.

# Notify the player when he connects and has unread mails
message-notify-on-join: true

# Delay in seconds before sending the notification, to avoid it being lost in the join messages
message-notify-delay: 3

# Maximum amount of mails a player can store, a new mail is refused when the limit is reached
message-max-amount: 50

# Maximum amount of characters of a mail
message-max-length: 256

# Delay in seconds between two mails sent by the same player
# Players with the permission essentials.bypass.cooldown are not affected
message-cooldown: 5

# Date format used to display the date of a mail
message-date-format: "yyyy-MM-dd HH:mm"
```

---

## Options

### Item Mailbox

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Mailbox module (item mailbox and text mails) |
| `expiration` | Integer | `86400` | Time in seconds before an uncollected item expires and is permanently removed from the mailbox. `86400` seconds = 24 hours |

<CalloutContainer type="warning">

<CalloutDescription>
When items expire, they are permanently deleted and cannot be recovered. The expiration date of an item is computed when the item is added (`now + expiration`), so a value of `0` makes items expire immediately: always use a positive value. For a very long retention, use a large value such as `2592000` (30 days).
</CalloutDescription>

</CalloutContainer>

### Text Mails

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `message-notify-on-join` | Boolean | `true` | Notify a player who joins with unread mails. The notification contains a clickable `/mail read` |
| `message-notify-delay` | Integer | `3` | Delay in seconds before the join notification is sent, so it is not lost among the other join messages (minimum `1`) |
| `message-max-amount` | Integer | `50` | Maximum number of mails a player can store. When the limit is reached, new mails to that player are refused |
| `message-max-length` | Integer | `256` | Maximum number of characters of a mail |
| `message-cooldown` | Integer | `5` | Delay in seconds between two mails sent by the same player. `0` disables the cooldown. Players with `essentials.bypass.cooldown` are not affected (when `enable-cooldown-bypass` is `true` in `config.yml`) |
| `message-date-format` | String | `yyyy-MM-dd HH:mm` | Date format used in `/mail read`. Follows Java `SimpleDateFormat` patterns |

---

## Item Mailbox

1. An administrator sends an item to a player's mailbox with `/mail give`, `/mail give-hand`, `/mail giveall` or `/mail giveall-hand`.
2. The item is stored in the recipient's virtual mailbox, whether the recipient is online or offline. An online recipient receives an action bar message.
3. The player opens their mailbox with `/mail` and clicks on the items to collect them (a free inventory slot is required).
4. If an item is not collected before its expiration date, it is removed.
5. Administrators can inspect another player's mailbox with `/mail open <player>` and empty it with `/mail clear <player>`.

<CalloutContainer type="error">

<CalloutTitle>SQL storage required</CalloutTitle>

<CalloutDescription>
The **item mailbox** requires a SQL storage (`SQLITE`, `MYSQL`, `MARIADB` or `HIKARICP`). It is not implemented for the `JSON` storage.
</CalloutDescription>

</CalloutContainer>

---

## Text Mails

Text mails let players leave a message to someone who is not connected.

- `/mail send <player> <message>` sends a mail to an online or offline player. An online recipient is notified immediately with a message pointing to `/mail read`.
- `/mail read` displays all your mails, with the sender and the date, then marks them as read.
- `/mail clearmessages` deletes your own mails; `/mail clearmessages <player>` deletes the mails of another player.
- `/mail sendall <message>` sends a mail to every **online** player (the sender is skipped, as well as players whose mailbox is full).
- When a player joins with unread mails, they receive a clickable notification after `message-notify-delay` seconds (if `message-notify-on-join` is enabled).

### Restrictions

- A mail cannot be longer than `message-max-length` characters.
- A player cannot send a mail to themselves.
- A **muted** player cannot send mails.
- A player who used `/ignore` on the sender does not receive their mails (the sender is told the recipient does not want to receive them). The ignore list is checked when the recipient is online.
- A mail is refused when the recipient already stores `message-max-amount` mails.
- Players must wait `message-cooldown` seconds between two mails, unless they have `essentials.bypass.cooldown`.
- Mails sent from the console are signed with the console name and are not subject to the mute and cooldown checks.

### Storage

Text mails work with **every storage type**:

| Storage | Persistence |
|---------|-------------|
| `SQLITE`, `MYSQL`, `MARIADB`, `HIKARICP` | `user_mail_messages` table |
| `JSON` | Stored inside the player's user file |

<CalloutContainer type="info">

<CalloutDescription>
Unlike text mails, the item mailbox is only available with a SQL storage.
</CalloutDescription>

</CalloutContainer>

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/mail` | `mailbox`, `mb` | `essentials.mail` | Open your item mailbox |

### Mail Subcommands

| Subcommand | Permission | Description |
|------------|------------|-------------|
| `/mail open <player>` | `essentials.mail.open` | Open the item mailbox of a player (admin view) |
| `/mail give <player> <item> [amount]` | `essentials.mail.give` | Send an item (vanilla material or custom item from the Items module) to a player's mailbox |
| `/mail give-hand <player>` | `essentials.mail.give.hand` | Send the item you are holding to a player's mailbox |
| `/mail giveall <item> [amount]` | `essentials.mail.giveall` | Send an item to the mailbox of every online player |
| `/mail giveall-hand` | `essentials.mail.giveall.hand` | Send the item you are holding to the mailbox of every online player |
| `/mail clear <player>` | `essentials.mail.clear` | Remove every item from a player's mailbox |
| `/mail send <player> <message>` | `essentials.mail.send` | Send a text mail to a player, online or offline |
| `/mail read` | `essentials.mail.read` | Read the mails you received and mark them as read |
| `/mail sendall <message>` | `essentials.mail.send.all` | Send a text mail to every online player |
| `/mail clearmessages [player]` | `essentials.mail.clear.messages` | Delete your mails, or the mails of another player |

| Permission | Description |
|------------|-------------|
| `essentials.bypass.cooldown` | Ignore `message-cooldown` between two text mails |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_mailbox_items%` | Returns the number of items currently in the player's item mailbox |

<CalloutContainer type="info">

<CalloutDescription>
Use the `%zessentials_user_mailbox_items%` placeholder in scoreboards, holograms, or chat formats to show players how many uncollected items they have. For example, you could display a notification in the scoreboard when the value is greater than zero.
</CalloutDescription>

</CalloutContainer>

For the full placeholder list, see [Placeholders](../placeholders).

---

## Examples

### 7-Day Item Expiration

```yaml
expiration: 604800
```

Items expire after 7 days, giving players more time to log in and collect deliveries.

### Stricter Text Mails

```yaml
message-max-amount: 20
message-max-length: 128
message-cooldown: 30
message-date-format: "dd/MM/yyyy HH:mm"
```

Players can store at most 20 mails of 128 characters, and must wait 30 seconds between two mails.

### Disable the Join Notification

```yaml
message-notify-on-join: false
```

Players are no longer notified on join; they must run `/mail read` themselves.
