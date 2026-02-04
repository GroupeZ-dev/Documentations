---
sidebar_position: 20
title: Vote Module
description: Vote tracking with vote party system and per-site cooldowns
---

# Vote Module

**File:** `modules/vote/config.yml`

The Vote module tracks player votes from external voting sites, provides configurable rewards based on cumulative vote counts, and includes a **Vote Party** system that triggers global rewards when the server reaches a collective vote goal. It supports per-site cooldowns, tiered reward brackets, offline vote notifications, and automatic monthly resets.

:::warning Dependency
This module requires [NuVotifier](https://github.com/NuVotifier/NuVotifier) to be installed and configured. NuVotifier receives incoming votes from voting sites and forwards them to zEssentials for processing.
:::

---

## Source Configuration

```yaml
enable: true
enable-vote-party: true
enable-vote-party-open-vote-inventory: true
vote-party-objective: 200
vote-party-rewards:
  actions:
    - type: console_command
      commands:
        - "eco give money %player% 5000"
  permission: "zessentials.vote.double"
  permission-actions:
    - type: console_command
      commands:
        - "eco give money %player% 5000"
  global-commands:
    - "bc Its VoteParty Time"
rewards-on-vote:
  - min: 0
    max: 150
    commands:
      - "cr give %player% vote"
  - min: 151
    max: 400
    commands:
      - "cr give %player% vote"
  - min: 401
    commands:
      - "cr give %player% vote"
sites:
  - name: "ServeurMinecraftVote"
    seconds: 5400
  - name: "ServeurPrive"
    seconds: 5400
  - name: "ServeursMinecraft"
    seconds: 86400
  - name: "TopServeurs"
    seconds: 7200
enable-offline-vote-message: true
placeholder-available: "<green>Available ✔"
placeholder-cooldown: "<red>%cooldown% ✘"
reset-configuration:
  day: 1
  hour: 0
  minute: 0
  second: 0
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Vote module |
| `enable-offline-vote-message` | Boolean | `true` | If `true`, players who voted while offline receive a notification message when they next join the server |

### Vote Party

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable-vote-party` | Boolean | `true` | Enable or disable the Vote Party system |
| `enable-vote-party-open-vote-inventory` | Boolean | `true` | If `true`, opens a zMenu vote inventory when the Vote Party triggers, allowing players to claim rewards through a GUI |
| `vote-party-objective` | Integer | `200` | The total number of server-wide votes required to trigger a Vote Party |

### Vote Party Rewards

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `vote-party-rewards.actions` | List | *(see above)* | Actions executed for each online player when the Vote Party triggers |
| `vote-party-rewards.actions[].type` | String | `console_command` | The type of action to perform. `console_command` executes commands from the console |
| `vote-party-rewards.actions[].commands` | List of Strings | - | The commands to execute. Supports the `%player%` placeholder for the player's name |
| `vote-party-rewards.permission` | String | `zessentials.vote.double` | A permission node that grants bonus rewards during a Vote Party |
| `vote-party-rewards.permission-actions` | List | *(see above)* | Additional actions executed for players who have the bonus permission. These run **in addition to** the standard actions |
| `vote-party-rewards.permission-actions[].type` | String | `console_command` | The type of bonus action |
| `vote-party-rewards.permission-actions[].commands` | List of Strings | - | The bonus commands to execute for players with the special permission |
| `vote-party-rewards.global-commands` | List of Strings | - | Commands executed once globally (not per-player) when the Vote Party triggers. Useful for broadcasts or server-wide effects |

:::tip
Players with the `zessentials.vote.double` permission (or whatever permission you configure) receive **both** the standard `actions` and the `permission-actions`, effectively doubling their rewards. This is great for incentivizing donation ranks.
:::

### Rewards on Vote

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `rewards-on-vote` | List | *(see above)* | Tiered reward brackets based on the player's cumulative vote count |
| `rewards-on-vote[].min` | Integer | - | The minimum cumulative vote count for this reward bracket (inclusive) |
| `rewards-on-vote[].max` | Integer | *(optional)* | The maximum cumulative vote count for this reward bracket (inclusive). Omit for an open-ended bracket |
| `rewards-on-vote[].commands` | List of Strings | - | Commands executed when a player votes and their total vote count falls within this bracket. Supports the `%player%` placeholder |

:::info
Reward brackets allow you to give different rewards as players accumulate more votes. For example, you could give basic crate keys for the first 150 votes, better keys from 151-400, and premium keys beyond 401. When `max` is omitted, the bracket applies to all vote counts at or above `min`.
:::

### Voting Sites

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sites` | List | *(see above)* | Defines the voting sites and their per-site cooldown durations |
| `sites[].name` | String | - | The name identifier for the voting site. Must match the service name sent by NuVotifier |
| `sites[].seconds` | Integer | - | The cooldown duration in seconds before a player can vote again on this site |

:::note
The `name` field must exactly match the service name configured in NuVotifier for each voting site. Common cooldown values are `5400` (1.5 hours), `7200` (2 hours), and `86400` (24 hours), depending on the voting site's own restrictions.
:::

### Placeholders

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `placeholder-available` | String | `<green>Available ✔` | The MiniMessage-formatted text returned by site cooldown placeholders when the player **can** vote on that site |
| `placeholder-cooldown` | String | `<red>%cooldown% ✘` | The MiniMessage-formatted text returned by site cooldown placeholders when the player is still on cooldown. The `%cooldown%` token is replaced with the remaining time |

### Reset Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `reset-configuration.day` | Integer | `1` | The day of the month when vote counts are reset |
| `reset-configuration.hour` | Integer | `0` | The hour (0-23) when the monthly reset occurs |
| `reset-configuration.minute` | Integer | `0` | The minute (0-59) when the monthly reset occurs |
| `reset-configuration.second` | Integer | `0` | The second (0-59) when the monthly reset occurs |

:::warning
The reset configuration controls when **all player vote counts** are reset to zero. By default, this happens on the 1st of every month at midnight. Make sure your players are aware of the reset schedule, especially if rewards are tied to cumulative vote counts.
:::

---

## How It Works

1. A player votes for the server on an external voting site.
2. NuVotifier receives the vote and forwards it to zEssentials.
3. The Vote module increments the player's cumulative vote count and executes the appropriate reward commands from the matching `rewards-on-vote` bracket.
4. The server-wide vote counter is incremented toward the `vote-party-objective`.
5. If the player is offline and `enable-offline-vote-message` is `true`, they receive a notification on their next login.
6. When the server-wide vote counter reaches the `vote-party-objective`, the Vote Party triggers:
   - `global-commands` are executed once.
   - `actions` are executed for each online player.
   - Players with the bonus permission also receive `permission-actions`.
   - The vote party counter resets to zero.
7. On the configured reset day/time each month, all player vote counts are reset.

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/vote` | - | `essentials.vote` | Open the vote menu or view vote information |
| `/voteparty` | `vp` | `essentials.voteparty` | View the current Vote Party progress |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_voteparty_amount%` | The current number of votes toward the next Vote Party |
| `%zessentials_voteparty_objective%` | The total votes required to trigger a Vote Party |
| `%zessentials_vote_amount%` | The player's cumulative vote count for the current period |
| `%zessentials_vote_site_cooldown_{site}%` | The cooldown status for a specific voting site. Replace `{site}` with the site name (e.g., `%zessentials_vote_site_cooldown_TopServeurs%`). Returns the configured `placeholder-available` or `placeholder-cooldown` text |

For the full placeholder list, see [Placeholders](../placeholders).

---

## Related Events

| Event | Description |
|-------|-------------|
| `UserVoteEvent` | Fired when a player's vote is received and processed. Can be used to trigger custom reward logic |
| `VotePartyEvent` | Fired when the Vote Party objective is reached and rewards are distributed |
| `VotePartyStartEvent` | Fired when the Vote Party begins processing. Can be cancelled or used to modify behavior before rewards are given |

:::tip
Listen to `VotePartyStartEvent` if you want to add custom pre-party logic such as firework effects, title announcements, or conditional checks before the party proceeds.
:::

---

## Example: Vote Menu with Site Cooldowns

You can display per-site cooldown statuses in a vote menu using the site cooldown placeholders:

```
ServeurMinecraftVote: %zessentials_vote_site_cooldown_ServeurMinecraftVote%
ServeurPrive:         %zessentials_vote_site_cooldown_ServeurPrive%
ServeursMinecraft:    %zessentials_vote_site_cooldown_ServeursMinecraft%
TopServeurs:          %zessentials_vote_site_cooldown_TopServeurs%
```

Each placeholder returns either `<green>Available ✔` or `<red>2h 15m ✘` (with the remaining cooldown time), making it easy to show players which sites are ready for voting.
