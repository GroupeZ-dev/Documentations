---
sidebar_position: 3
title: Discord Bot
description: Standalone Discord bot for account linking
---

# Discord Bot

The zEssentials Discord Bot is a **standalone JDA application** that runs independently from the Minecraft server. It is not a Minecraft plugin. Its primary purpose is to link Minecraft accounts with Discord accounts, providing a bridge between your Discord server and your Minecraft server through a shared database.

---

## Overview

The Discord bot provides:

- **Account Linking** -- Players can link their Minecraft and Discord accounts through a secure code-based verification flow
- **Embed-Based Interface** -- A customizable embed with an interactive button is posted in a Discord channel for players to initiate the linking process
- **Audit Logging** -- All link actions are logged to a designated Discord channel for moderation purposes
- **Shared Database** -- The bot connects to the same database as zEssentials, enabling real-time account association

:::info
The Discord bot is a standalone Java application using [JDA (Java Discord API)](https://github.com/discord-jda/JDA). It runs as its own process, separate from the Minecraft server. Both the bot and the Minecraft server must connect to the same database.
:::

---

## Setup

### 1. Download the Bot

Download the Discord bot JAR file from the same source as zEssentials.

### 2. Create a Discord Bot Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a **New Application**
3. Navigate to the **Bot** section
4. Click **Reset Token** and copy the bot token
5. Enable the **Message Content Intent** under Privileged Gateway Intents
6. Navigate to **OAuth2 > URL Generator**, select the `bot` and `applications.commands` scopes, then generate an invite URL
7. Invite the bot to your Discord server using the generated URL

### 3. Create the Configuration

Create a `config.yml` file in the same directory as the bot JAR file. See the [Configuration](#configuration) section below for all available options.

### 4. Run the Bot

Start the bot with:

```bash
java -jar zessentials-discord-bot.jar
```

The bot will read `config.yml` from the current working directory, connect to the database, and log in to Discord.

---

## Configuration

The bot is configured through a single `config.yml` file placed alongside the bot JAR.

### Full Configuration Reference

```yaml
bot-token: "YOUR_BOT_TOKEN_HERE"
guild-id: "YOUR_GUILD_ID_HERE"

database-configuration:
  table-prefix: "zessentials_"
  user: "homestead"
  password: "secret"
  host: "192.168.10.10"
  port: 3306
  database: "zessentials"
  debug: false

link:
  enable: true

  button:
    name: "Link Account"
    style: PRIMARY
    disabled: false
    emoji: ""

  messages:
    code: "Your link code is: **%code%**. Use `/link %code%` in Minecraft to complete the link."
    already: "Your account is already linked."

  log:
    channel: "CHANNEL_ID_HERE"
    create: "A new link code has been generated."
    ask: "**%name%** is requesting to link their account. Code: `%code%` | Discord ID: `%id%`"

  embed:
    title: "Link Your Account"
    description: "Click the button below to link your Minecraft account with Discord."
    color: "54, 157, 229"
    footer: ""
    image: ""
    thumbnail: ""
    author: ""
    fields: []
```

### Configuration Options

#### General

| Option | Type | Description |
|--------|------|-------------|
| `bot-token` | String | The Discord bot token from the Developer Portal |
| `guild-id` | String | The ID of the Discord server (guild) the bot operates in |

#### Database Configuration

The database settings must match the zEssentials Minecraft plugin configuration so both connect to the same database.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `table-prefix` | String | `zessentials_` | Prefix for database table names |
| `user` | String | `homestead` | Database username |
| `password` | String | `secret` | Database password |
| `host` | String | `192.168.10.10` | Database host address |
| `port` | Integer | `3306` | Database port |
| `database` | String | `zessentials` | Database name |
| `debug` | Boolean | `false` | Enable debug logging for database queries |

:::warning
The `database-configuration` must point to the **same database** used by the zEssentials Minecraft plugin. If the databases do not match, account linking will not work.
:::

#### Link Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `link.enable` | Boolean | `true` | Enable or disable the account linking feature |

#### Button

Controls the appearance and behavior of the "Link Account" button on the embed.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `button.name` | String | `Link Account` | The label displayed on the button |
| `button.style` | Enum | `PRIMARY` | The button style. Options: `PRIMARY`, `SECONDARY`, `SUCCESS`, `DANGER` |
| `button.disabled` | Boolean | `false` | Whether the button is disabled (visible but not clickable) |
| `button.emoji` | String | `""` | An optional emoji displayed on the button |

#### Messages

Messages sent to the user during the linking process.

| Option | Type | Description |
|--------|------|-------------|
| `messages.code` | String | Message sent when a link code is generated. Use `%code%` as placeholder for the code. |
| `messages.already` | String | Message sent when a user attempts to link an already-linked account. |

#### Log

Audit logging configuration for tracking link actions.

| Option | Type | Description |
|--------|------|-------------|
| `log.channel` | String | The Discord channel ID where audit logs are sent |
| `log.create` | String | Log message template when a new link code is generated |
| `log.ask` | String | Log message template when a player requests to link. Placeholders: `%name%` (player name), `%code%` (link code), `%id%` (Discord user ID) |

#### Embed

Customizes the appearance of the link embed posted in Discord.

| Option | Type | Description |
|--------|------|-------------|
| `embed.title` | String | The embed title |
| `embed.description` | String | The embed description text |
| `embed.color` | String | The embed sidebar color in RGB format (e.g., `"54, 157, 229"`) |
| `embed.footer` | String | Optional footer text |
| `embed.image` | String | Optional image URL displayed in the embed |
| `embed.thumbnail` | String | Optional thumbnail URL displayed in the embed |
| `embed.author` | String | Optional author name displayed at the top of the embed |
| `embed.fields` | List | Optional list of additional embed fields |

---

## Bot Commands

The Discord bot registers the following slash commands:

### /reload

| Property | Value |
|----------|-------|
| **Permission** | Administrator |
| **Description** | Reloads the bot configuration from `config.yml` |

Reloads the `config.yml` file without restarting the bot process. Useful for applying configuration changes on the fly.

### /setlinkmessage

| Property | Value |
|----------|-------|
| **Permission** | Administrator |
| **Description** | Sends the link embed to the current channel |

Posts the configured embed (with the link button) to the channel where the command is executed. This is the embed that players interact with to begin the account linking process. Typically, you run this once in a dedicated linking channel.

---

## Account Linking Flow

The account linking process uses a secure code-based verification flow to associate a Discord account with a Minecraft account.

### Step-by-Step Process

1. **Admin sends the link embed** -- An administrator runs `/setlinkmessage` in a Discord channel. This posts an embed with a "Link Account" button.

2. **Embed appears in the channel** -- The embed is displayed with the configured title, description, color, and the interactive button.

3. **Player clicks the button** -- A player who wants to link their account clicks the "Link Account" button on the embed.

4. **Bot generates a verification code** -- The bot generates a unique 16-character hexadecimal code for the player.

5. **Code sent as ephemeral message** -- The bot sends the verification code to the player as an **ephemeral message** (only visible to that player). The message uses the `messages.code` template with the `%code%` placeholder replaced.

6. **Player enters code in Minecraft** -- The player joins the Minecraft server and runs the `/link <code>` command with the code they received in Discord.

7. **Accounts are linked** -- zEssentials validates the code, associates the Minecraft UUID with the Discord user ID, and stores the link in the database.

8. **Actions logged to audit channel** -- All linking actions (code generation, link requests, completed links) are logged to the configured audit log channel for moderation visibility.

### Flow Diagram

```
Discord                                    Minecraft
  |                                            |
  |  1. Admin runs /setlinkmessage             |
  |  2. Embed with button appears              |
  |  3. Player clicks "Link Account"           |
  |  4. Bot generates 16-char hex code         |
  |  5. Code sent as ephemeral message         |
  |                                            |
  |         Player copies code                 |
  |                                            |
  |                                  6. Player runs /link <code>
  |                                  7. Accounts linked in database
  |                                            |
  |  8. Action logged to audit channel         |
  |                                            |
```

:::tip
If a player clicks the link button but their account is already linked, the bot will reply with the `messages.already` message instead of generating a new code.
:::

---

## Database Tables

The Discord bot and zEssentials share the following database tables for account linking. All table names are prefixed with the configured `table-prefix`.

### link_codes

Stores temporary verification codes generated during the linking process.

| Column | Description |
|--------|-------------|
| Code | The 16-character hexadecimal verification code |
| Discord user ID | The Discord user who requested the code |
| Expiration | When the code expires |

### link_accounts

Stores the active links between Minecraft and Discord accounts.

| Column | Description |
|--------|-------------|
| Minecraft UUID | The linked Minecraft player UUID |
| Discord user ID | The linked Discord user ID |
| Link timestamp | When the accounts were linked |

### link_histories

Stores an audit trail of all linking and unlinking actions.

| Column | Description |
|--------|-------------|
| Minecraft UUID | The Minecraft player UUID involved |
| Discord user ID | The Discord user ID involved |
| Action | The type of action (link, unlink) |
| Timestamp | When the action occurred |

---

## Troubleshooting

### Bot does not start

- Verify the `bot-token` in `config.yml` is correct and has not been regenerated in the Developer Portal
- Ensure Java 17 or higher is installed
- Check that the `config.yml` file is in the same directory as the bot JAR

### Bot is online but commands do not appear

- Ensure the bot was invited with the `applications.commands` scope
- Wait a few minutes for Discord to propagate slash commands globally
- Verify the `guild-id` matches the Discord server where you expect the commands

### Link button does nothing

- Check the bot has permission to send messages and manage interactions in the channel
- Verify `link.enable` is set to `true` in the configuration
- Check the bot console for error messages

### Linking fails in Minecraft

- Verify that both the bot and the Minecraft server are connected to the **same database**
- Ensure the `table-prefix` matches in both configurations
- Check that the code has not expired
- Confirm the Discord module is enabled in zEssentials
