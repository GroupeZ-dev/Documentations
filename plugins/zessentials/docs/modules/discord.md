---
sidebar_position: 4
title: Discord Module
description: Discord webhook notifications and account linking
---

# Discord Module

**File:** `modules/discord/config.yml`

The Discord module integrates your Minecraft server with Discord through **webhook notifications** and **account linking**. It can send messages to Discord channels when players chat, join, leave, or join for the first time. It also supports a secure account linking system that associates Minecraft accounts with Discord accounts.

For the standalone Discord bot used for account linking, see the [Discord Bot](../development/discord-bot) page.

---

## Source Configuration

```yaml
enable: true
chat-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  avatar: "https://mc-heads.net/avatar/%uuid%"
  message: "%message%"
  username: "%player%"
join-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  embeds:
    - author:
        name: "%player% just logged in"
        icon-url: "https://mc-heads.net/head/%uuid%"
      color: "#00ff00"
left-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  embeds:
    - author:
        name: "%player% just logged out"
        icon-url: "https://mc-heads.net/head/%uuid%"
      color: "#ff0000"
first-join-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  embeds:
    - author:
        name: "%player% just logged in for the first time"
        icon-url: "https://mc-heads.net/head/%uuid%"
      color: "#44ff44"
enable-link-account: false
log-link-error-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  message: "%player% vient d'essayer de lier son compte avec le code `%code%`"
log-link-success-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  message: "%player% vient de lier son compte avec le code `%code%` (%discord-name%:%discord-id%)"
log-unlink-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  message: "%player% vient de délier son compte (%discord-name%:%discord-id%)"
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Discord module |
| `enable-link-account` | Boolean | `false` | Enable the Discord account linking feature. Requires the [Discord Bot](../development/discord-bot) to be running |

### Chat Message Webhook

Forwards in-game chat messages to a Discord channel via webhook. The webhook message appears with the player's avatar and name.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chat-message.enable` | Boolean | `false` | Enable or disable chat message forwarding to Discord |
| `chat-message.webhook` | String | `https://discord.com/api/webhooks/` | The Discord webhook URL to send chat messages to |
| `chat-message.avatar` | String | `https://mc-heads.net/avatar/%uuid%` | URL template for the webhook avatar image. Use `%uuid%` for the player's UUID |
| `chat-message.message` | String | `%message%` | The message content sent to Discord. Use `%message%` for the chat message text |
| `chat-message.username` | String | `%player%` | The username displayed on the webhook message. Use `%player%` for the player name |

### Join Message Webhook

Sends a Discord embed when a player joins the server.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `join-message.enable` | Boolean | `false` | Enable or disable join message notifications |
| `join-message.webhook` | String | `https://discord.com/api/webhooks/` | The Discord webhook URL for join notifications |
| `join-message.embeds` | List | *(see above)* | List of embed objects sent when a player joins |

### Left Message Webhook

Sends a Discord embed when a player disconnects from the server.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `left-message.enable` | Boolean | `false` | Enable or disable leave message notifications |
| `left-message.webhook` | String | `https://discord.com/api/webhooks/` | The Discord webhook URL for leave notifications |
| `left-message.embeds` | List | *(see above)* | List of embed objects sent when a player leaves |

### First Join Message Webhook

Sends a Discord embed when a player joins the server for the very first time.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `first-join-message.enable` | Boolean | `false` | Enable or disable first join notifications |
| `first-join-message.webhook` | String | `https://discord.com/api/webhooks/` | The Discord webhook URL for first join notifications |
| `first-join-message.embeds` | List | *(see above)* | List of embed objects sent when a new player joins for the first time |

### Link Logging Webhooks

These webhooks log account linking events to a Discord channel for audit and moderation purposes.

#### Link Error Log

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `log-link-error-message.enable` | Boolean | `false` | Enable logging of failed link attempts |
| `log-link-error-message.webhook` | String | `https://discord.com/api/webhooks/` | The Discord webhook URL for error logs |
| `log-link-error-message.message` | String | *(see above)* | Message sent when a link attempt fails. Supports `%player%` and `%code%` placeholders |

#### Link Success Log

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `log-link-success-message.enable` | Boolean | `false` | Enable logging of successful account links |
| `log-link-success-message.webhook` | String | `https://discord.com/api/webhooks/` | The Discord webhook URL for success logs |
| `log-link-success-message.message` | String | *(see above)* | Message sent when an account is successfully linked. Supports `%player%`, `%code%`, `%discord-name%`, and `%discord-id%` |

#### Unlink Log

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `log-unlink-message.enable` | Boolean | `false` | Enable logging of account unlinks |
| `log-unlink-message.webhook` | String | `https://discord.com/api/webhooks/` | The Discord webhook URL for unlink logs |
| `log-unlink-message.message` | String | *(see above)* | Message sent when a player unlinks their account. Supports `%player%`, `%discord-name%`, and `%discord-id%` |

### Embed Object Properties

Webhook sections that use `embeds` support the following properties in each embed entry:

| Property | Type | Description |
|----------|------|-------------|
| `author.name` | String | The author name displayed at the top of the embed. Supports `%player%` and `%uuid%` |
| `author.icon-url` | String | URL of the icon displayed next to the author name |
| `color` | String | Hex color code for the embed sidebar (e.g., `"#00ff00"` for green) |
| `title` | String | Optional embed title |
| `description` | String | Optional embed description/body text |
| `thumbnail` | String | Optional thumbnail image URL |
| `footer` | String | Optional footer text |

---

## Available Placeholders in Webhook Messages

The following placeholders can be used in webhook message fields and embed fields:

| Placeholder | Description |
|-------------|-------------|
| `%player%` | The player's name |
| `%uuid%` | The player's UUID |
| `%message%` | The chat message content (chat-message webhook only) |
| `%code%` | The link verification code (link log webhooks only) |
| `%discord-name%` | The linked Discord account username (link log webhooks only) |
| `%discord-id%` | The linked Discord account ID (link log webhooks only) |

:::tip
For the `avatar` and `icon-url` fields, services like `https://mc-heads.net/avatar/%uuid%` and `https://mc-heads.net/head/%uuid%` provide Minecraft skin renders based on the player UUID.
:::

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/link` | `lier` | `essentials.discord.link` | Link your Minecraft account to Discord using a verification code |
| `/unlink` | `delier` | `essentials.discord.unlink` | Unlink your Discord account from your Minecraft account |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_has_discord_linked%` | Returns `true` if the player has linked their Discord account, `false` otherwise |

For the full placeholder list, see [Placeholders](../placeholders).

---

## Setting Up Webhooks

To create a Discord webhook:

1. Open your Discord server and navigate to the channel where you want notifications.
2. Click the gear icon to open **Channel Settings**.
3. Go to **Integrations** > **Webhooks**.
4. Click **New Webhook**.
5. Configure the webhook name and avatar (optional), then click **Copy Webhook URL**.
6. Paste the webhook URL into the corresponding `webhook` field in the configuration.

:::warning
Keep your webhook URLs private. Anyone with a webhook URL can send messages to that Discord channel. If a webhook URL is compromised, delete it in Discord and create a new one.
:::

---

## Account Linking

The account linking system connects a player's Minecraft account with their Discord account through a secure code-based verification flow. This requires:

1. The `enable-link-account` option set to `true` in this module's configuration.
2. The [Discord Bot](../development/discord-bot) running as a standalone application connected to the same database.

### Linking Flow

1. A player clicks the "Link Account" button on the Discord embed (set up via the bot).
2. The bot generates a unique verification code and sends it to the player in Discord.
3. The player runs `/link <code>` on the Minecraft server.
4. The accounts are linked in the shared database.
5. The link event is logged to the configured webhook (if enabled).

### Unlinking

Players can unlink their account at any time by running `/unlink` on the Minecraft server. The unlink event is logged if `log-unlink-message` is enabled.

:::info
For full details on setting up the Discord bot, including database configuration, bot commands, and the complete linking flow diagram, see the [Discord Bot](../development/discord-bot) page.
:::

---

## Examples

### Chat Relay to Discord

Forward all in-game chat to a Discord channel:

```yaml
chat-message:
  enable: true
  webhook: "https://discord.com/api/webhooks/1234567890/abcdefghijk"
  avatar: "https://mc-heads.net/avatar/%uuid%"
  message: "%message%"
  username: "%player%"
```

### Join/Leave Notifications with Embeds

```yaml
join-message:
  enable: true
  webhook: "https://discord.com/api/webhooks/1234567890/abcdefghijk"
  embeds:
    - author:
        name: "%player% just logged in"
        icon-url: "https://mc-heads.net/head/%uuid%"
      color: "#00ff00"

left-message:
  enable: true
  webhook: "https://discord.com/api/webhooks/1234567890/abcdefghijk"
  embeds:
    - author:
        name: "%player% just logged out"
        icon-url: "https://mc-heads.net/head/%uuid%"
      color: "#ff0000"
```
