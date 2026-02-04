---
sidebar_position: 13
title: Rules Module
description: Server rules display system
---

# Rules Module

**File:** `modules/rules/config.yml`

The Rules module provides a configurable system for displaying server rules to players. Rules can be shown either through an interactive **zMenu inventory** or as **chat messages**, depending on your preference. The actual rules content is defined separately in `messages.yml`.

---

## Source Configuration

```yaml
enable: true
rule-type: INVENTORY  # INVENTORY or MESSAGE
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Rules module |
| `rule-type` | String | `INVENTORY` | How rules are displayed to the player. Accepts `INVENTORY` or `MESSAGE` |

:::info Display Modes
- **`INVENTORY`** -- Rules are displayed through a zMenu inventory interface. This provides a rich, interactive GUI where players can browse rules in a paginated menu.
- **`MESSAGE`** -- Rules are sent directly as chat messages. This is simpler and works without zMenu, but offers less visual formatting.
:::

:::tip
The actual rules text and formatting are configured in `messages.yml`, not in this configuration file. This module only controls whether the rules system is enabled and which display mode to use.
:::

---

## How It Works

1. A player executes the `/rules` command (or one of its aliases).
2. The plugin checks the configured `rule-type`.
3. If set to `INVENTORY`, the plugin opens a zMenu inventory displaying the rules in a GUI format.
4. If set to `MESSAGE`, the plugin sends the rules content directly into the player's chat.

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/rules` | `?`, `help`, `aide` | `essentials.rules` | Display the server rules to the player |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Configuration in messages.yml

:::note
To edit the actual rules content displayed to players, modify the rules section in your `messages.yml` file. The Rules module reads the message entries from there and presents them using the chosen `rule-type` format.
:::

---

## Example Usage

### Inventory Mode

When `rule-type` is set to `INVENTORY`, running `/rules` opens a zMenu GUI. You can customize the inventory layout, item icons, and pagination through your zMenu configuration files.

### Message Mode

When `rule-type` is set to `MESSAGE`, running `/rules` outputs the rules directly in chat. This is ideal for servers that want a lightweight solution without requiring players to interact with a GUI.
