---
sidebar_position: 15
title: Scoreboard Module
description: Dynamic per-player scoreboards with animations and conditional display
---

# Scoreboard Module

**File:** `modules/scoreboard/config.yml`

The Scoreboard module provides a dynamic, per-player scoreboard system with support for **event-driven line updates**, **color animations**, and **conditional scoreboard switching** based on permissions or placeholders. It uses the [FastBoard](https://github.com/MrMicky-FR/FastBoard) library for packet-based scoreboard rendering, ensuring high performance and flicker-free updates.

---

## Source Configuration

```yaml
enable: true
join-conditions:
  - priority: 0
    scoreboard: default
  - priority: 1
    scoreboard: admin
    requirements:
      - type: permission
        permission: "zessentials.scoreboard.admin"
enable-task-conditions: false
task-conditions-interval: 2
task-conditions:
  - scoreboard: event
    requirements:
      - type: placeholder
        placeholder: "%player_world%"
        value: "event"
        action: EQUALS_STRING
scoreboards:
  default:
    default: true
    title: "#53edd6zEssentials"
    lines:
      - line: 1
        text: ""
      - line: 2
        text: "&7Balance: &a%zessentials_user_formatted_balance_money%"
        event: "fr.maxlego08.essentials.api.event.events.user.UserEconomyPostUpdateEvent"
      - line: 3
        text: "&7Coins: &a%zessentials_user_formatted_balance_coins%"
        event: "fr.maxlego08.essentials.api.event.events.user.UserEconomyPostUpdateEvent"
      - line: 4
        text: ""
      - line: 5
        text: "play.essentials.fr"
        animation: COLOR_WAVE
        fromColor: "#5599ff"
        toColor: "#ffffff"
        length: 5
        delayBetween: 5000
        animationSpeed: 30
  admin:
    title: "#53edd6zEssentials"
    lines:
      - line: 1
        text: ""
      - line: 2
        text: "&7Balance: &a%zessentials_user_formatted_balance_money%"
        event: "fr.maxlego08.essentials.api.event.events.user.UserEconomyPostUpdateEvent"
      - line: 3
        text: "&7Coins: &a%zessentials_user_formatted_balance_coins%"
        event: "fr.maxlego08.essentials.api.event.events.user.UserEconomyPostUpdateEvent"
      - line: 4
        text: "&7Rank: &cAdmin"
      - line: 5
        text: ""
      - line: 6
        text: "play.essentials.fr"
        animation: COLOR_WAVE
        fromColor: "#5599ff"
        toColor: "#ffffff"
        length: 5
        delayBetween: 5000
        animationSpeed: 30
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Scoreboard module |
| `enable-task-conditions` | Boolean | `false` | Enable periodic condition checks that can dynamically switch a player's scoreboard while they are online |
| `task-conditions-interval` | Integer | `2` | Interval in seconds between task condition checks (only used when `enable-task-conditions` is `true`) |

### Join Conditions

The `join-conditions` list determines which scoreboard a player receives when they join the server. Entries are evaluated in **priority order** (lowest first). The first matching condition is used; if none match, the scoreboard marked as `default: true` is applied.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `join-conditions[].priority` | Integer | - | Evaluation priority. Lower values are checked first |
| `join-conditions[].scoreboard` | String | - | The name of the scoreboard to assign (must match a key under `scoreboards`) |
| `join-conditions[].requirements` | List | *(optional)* | A list of zMenu-style requirements that must be met. If omitted, the condition always matches |
| `join-conditions[].requirements[].type` | String | - | The requirement type, e.g., `permission` or `placeholder` |
| `join-conditions[].requirements[].permission` | String | - | The permission node to check (when `type` is `permission`) |

### Task Conditions

The `task-conditions` list allows the plugin to periodically re-evaluate conditions and switch a player's scoreboard at runtime (e.g., when they enter a specific world).

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `task-conditions[].scoreboard` | String | - | The scoreboard to switch to when the requirements are met |
| `task-conditions[].requirements` | List | - | A list of requirements to evaluate |
| `task-conditions[].requirements[].type` | String | - | The requirement type, e.g., `placeholder` |
| `task-conditions[].requirements[].placeholder` | String | - | The placeholder to evaluate (when `type` is `placeholder`) |
| `task-conditions[].requirements[].value` | String | - | The expected value to compare against |
| `task-conditions[].requirements[].action` | String | - | The comparison action, e.g., `EQUALS_STRING`, `EQUALS_NUMBER`, `SUPERIOR`, `INFERIOR` |

### Scoreboard Definitions

Each entry under `scoreboards` defines a named scoreboard with a title and lines.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `scoreboards.<name>.default` | Boolean | `false` | If `true`, this scoreboard is used as the fallback when no join condition matches |
| `scoreboards.<name>.title` | String | - | The scoreboard title displayed at the top. Supports color codes and hex colors (e.g., `#53edd6`) |
| `scoreboards.<name>.lines` | List | - | The list of line entries displayed on the scoreboard |

### Line Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `lines[].line` | Integer | - | The line number (position on the scoreboard, starting from 1) |
| `lines[].text` | String | - | The text content of the line. Supports color codes and PlaceholderAPI placeholders |
| `lines[].event` | String | *(optional)* | A fully-qualified Bukkit/zEssentials event class name. When this event fires, the line is refreshed. This avoids unnecessary tick-based updates |
| `lines[].animation` | String | *(optional)* | The animation type to apply to this line. Currently supports `COLOR_WAVE` |
| `lines[].fromColor` | String | *(optional)* | The starting hex color for the animation (e.g., `#5599ff`) |
| `lines[].toColor` | String | *(optional)* | The ending hex color for the animation (e.g., `#ffffff`) |
| `lines[].length` | Integer | *(optional)* | The length (in characters) of the color wave effect |
| `lines[].delayBetween` | Integer | *(optional)* | Delay in milliseconds between animation cycles |
| `lines[].animationSpeed` | Integer | *(optional)* | Speed of the animation in milliseconds per frame |

---

## Key Features

### Event-Driven Updates

Instead of updating every line on a fixed timer, you can bind individual lines to specific events. For example, binding a balance line to `UserEconomyPostUpdateEvent` ensures that line only refreshes when the player's balance actually changes. This drastically reduces unnecessary packet traffic.

```yaml
- line: 2
  text: "&7Balance: &a%zessentials_user_formatted_balance_money%"
  event: "fr.maxlego08.essentials.api.event.events.user.UserEconomyPostUpdateEvent"
```

:::tip
Event-driven lines are the recommended approach for data that changes infrequently (balances, ranks, stats). Only use timer-based updates for truly dynamic content.
:::

### COLOR_WAVE Animation

The `COLOR_WAVE` animation creates a smooth gradient wave effect across text, transitioning between two hex colors.

```yaml
- line: 5
  text: "play.essentials.fr"
  animation: COLOR_WAVE
  fromColor: "#5599ff"
  toColor: "#ffffff"
  length: 5
  delayBetween: 5000
  animationSpeed: 30
```

| Parameter | Description |
|-----------|-------------|
| `fromColor` | The starting color of the wave |
| `toColor` | The ending color of the wave |
| `length` | How many characters the gradient spans at once |
| `delayBetween` | Pause in milliseconds before the animation restarts |
| `animationSpeed` | Time in milliseconds between each animation frame |

### Conditional Scoreboard Switching

Using `join-conditions` and `task-conditions`, you can display different scoreboards to different players based on permissions, worlds, or any placeholder value. This integrates with the **zMenu requirements system**.

:::info
The `task-conditions` system must be explicitly enabled with `enable-task-conditions: true`. When disabled, scoreboards are only assigned on join and do not change dynamically.
:::

---

## How It Works

1. When a player joins, the plugin evaluates `join-conditions` in priority order.
2. The first matching condition determines which scoreboard the player sees. If no condition matches, the scoreboard marked `default: true` is used.
3. Lines with an `event` property are registered as event listeners and only update when that event fires.
4. Lines with an `animation` property run on their own animation loop.
5. If `enable-task-conditions` is `true`, the plugin periodically checks `task-conditions` and may switch the player's scoreboard at runtime.

---

## Related Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/sb` | `essentials.scoreboard` | Toggle the scoreboard visibility for the player |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## FastBoard Library

This module uses the [FastBoard](https://github.com/MrMicky-FR/FastBoard) library for rendering scoreboards via packets. This means:

- No flickering when updating lines.
- No interference with other plugins that use the vanilla scoreboard API.
- High performance even with many players online.

:::warning
Since FastBoard operates at the packet level, other plugins that also send scoreboard packets may conflict with this module. If you experience visual issues, check for conflicting scoreboard plugins.
:::
