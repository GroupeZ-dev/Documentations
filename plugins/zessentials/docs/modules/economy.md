---
sidebar_position: 5
title: Economy Module
description: Multi-currency economy system with Vault integration
---

# Economy Module

**File:** `modules/economy/config.yml`

The Economy module provides a fully featured multi-currency economy system with Vault integration, balance top leaderboards, configurable number formatting, pay confirmations, and transaction reason tracking. You can define as many economies as you need, each with its own symbol, format, limits, and Vault registration status.

---

## Configuration

```yaml
enable: true

# The name of the default economy used by Vault and /pay
default-economy: "money"

# List of economy definitions
economies:
  - name: "money"
    display-name: "&6Money"
    symbol: "$"
    format: "%price%$"
    vault: true
    min: 0
    max: 1000000000
    min-pay: 0
    max-pay: 1000000000
    enable-pay: true
    enable-confirm-inventory: true
    min-confirm-inventory: 1000
    price-format: PRICE_WITH_REDUCTION

  - name: "coins"
    display-name: "&eCoins"
    symbol: "\u26c1"
    format: "%price% \u26c1"
    vault: false
    min: 0
    max: 1000000000
    min-pay: 0
    max-pay: 1000000000
    enable-pay: true
    enable-confirm-inventory: true
    min-confirm-inventory: 1000
    price-format: PRICE_WITH_REDUCTION

# Multiplier suffixes for the /pay command number shorthand
# Players can type e.g. /pay Player 5k to pay 5000
number-format-sell-multiplication:
  k: 1000
  m: 1000000
  b: 1000000000
  t: 1000000000000
  q: 1000000000000000
  qq: 1000000000000000000
  s: 1000000000000000000000
  ss: 1000000000000000000000000
  o: 1000000000000000000000000000
  n: 1000000000000000000000000000000
  d: 1000000000000000000000000000000000
  uu: 1000000000000000000000000000000000000
  dd: 1000000000000000000000000000000000000000
  tr: 1000000000000000000000000000000000000000000

# How prices are formatted globally
# Options: PRICE_RAW, PRICE_WITH_DECIMAL_FORMAT, PRICE_WITH_REDUCTION
price-format: PRICE_WITH_REDUCTION

# Decimal format pattern used when price-format is PRICE_WITH_DECIMAL_FORMAT
price-decimal-format: '#,###.#'

# Reduction tiers used when price-format is PRICE_WITH_REDUCTION
price-reductions:
  - format: "%amount%K"
    maxAmount: 999999
    display: "1K"
  - format: "%amount%M"
    maxAmount: 999999999
    display: "1M"
  - format: "%amount%B"
    maxAmount: 999999999999
    display: "1B"
  - format: "%amount%T"
    maxAmount: 999999999999999
    display: "1T"
  - format: "%amount%Q"
    maxAmount: 999999999999999999
    display: "1Q"

# Balance top leaderboard settings
enable-baltop: true
baltop-refresh-seconds: 900
baltop-placeholder-user-empty: "?"
baltop-display: MESSAGE
baltop-message-economy: money
baltop-message-amount: 10

# Whether to store economy data for offline players (increases storage usage)
store-offline-player-money: false

# Default balances granted to new players
default-economies:
  - economy: money
    amount: 100

# Transaction reason strings used in Vault and internal logging
pay-withdraw-reason: "Payment sent"
pay-deposit-reason: "Payment received"
command-give-reason: "Admin give"
command-give-all-reason: "Admin give all"
command-give-random-reason: "Admin give random"
command-take-reason: "Admin take"
command-reset-reason: "Admin reset"
command-set-reason: "Admin set"
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Economy module |
| `default-economy` | String | `money` | The name of the default economy. This economy is used for Vault integration and as the default for commands that do not specify an economy |
| `price-format` | String | `PRICE_WITH_REDUCTION` | Global price formatting mode. Options: `PRICE_RAW` (no formatting), `PRICE_WITH_DECIMAL_FORMAT` (uses `price-decimal-format`), `PRICE_WITH_REDUCTION` (uses `price-reductions` tiers) |
| `price-decimal-format` | String | `#,###.#` | Java DecimalFormat pattern used when `price-format` is `PRICE_WITH_DECIMAL_FORMAT` |
| `enable-baltop` | Boolean | `true` | Enable the balance top leaderboard |
| `baltop-refresh-seconds` | Integer | `900` | How often (in seconds) the baltop leaderboard is refreshed. `900` = 15 minutes |
| `baltop-placeholder-user-empty` | String | `?` | Placeholder text displayed in baltop when a position has no player |
| `baltop-display` | String | `MESSAGE` | How the baltop leaderboard is displayed. Currently supports `MESSAGE` |
| `baltop-message-economy` | String | `money` | The economy used when displaying the baltop via the `/baltop` command |
| `baltop-message-amount` | Integer | `10` | Number of entries shown per page in the baltop leaderboard |
| `store-offline-player-money` | Boolean | `false` | If `true`, economy data for offline players is stored and accessible via placeholders. Increases storage usage |

### Economy Entry Properties

Each entry in the `economies` list supports the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | String | - | Unique internal name for this economy. Used in commands, placeholders, and configuration references |
| `display-name` | String | - | Display name shown to players. Supports color codes and MiniMessage |
| `symbol` | String | - | Currency symbol (e.g., `$`, `T`, special Unicode characters) |
| `format` | String | - | Format string for displaying prices. Use `%price%` as the amount placeholder (e.g., `%price%$` or `%price% coins`) |
| `vault` | Boolean | `false` | If `true`, this economy is registered with the Vault API and can be used by other plugins |
| `min` | Double | `0` | Minimum balance allowed for this economy |
| `max` | Double | `1000000000` | Maximum balance allowed for this economy |
| `min-pay` | Double | `0` | Minimum amount a player can send in a single `/pay` transaction |
| `max-pay` | Double | `1000000000` | Maximum amount a player can send in a single `/pay` transaction |
| `enable-pay` | Boolean | `true` | Whether the `/pay` command is enabled for this economy |
| `enable-confirm-inventory` | Boolean | `true` | If `true`, a confirmation GUI opens before processing pay transactions for this economy |
| `min-confirm-inventory` | Double | `1000` | Minimum payment amount required to trigger the confirmation GUI. Payments below this amount process immediately |
| `price-format` | String | `PRICE_WITH_REDUCTION` | Per-economy price formatting override. Same options as the global `price-format` |

:::info
Only **one** economy should have `vault: true`. This economy is registered with the Vault API and will be used by any third-party plugin that queries Vault for economy data.
:::

### Number Format Multipliers

The `number-format-sell-multiplication` map defines shorthand suffixes players can use with the `/pay` command. For example, typing `/pay Player 5k` sends 5,000.

| Suffix | Multiplier |
|--------|------------|
| `k` | 1,000 |
| `m` | 1,000,000 |
| `b` | 1,000,000,000 |
| `t` | 1,000,000,000,000 |
| `q` | 1,000,000,000,000,000 |
| `qq` | 1,000,000,000,000,000,000 |
| `s` | 10^21 |
| `ss` | 10^24 |
| `o` | 10^27 |
| `n` | 10^30 |
| `d` | 10^33 |
| `uu` | 10^36 |
| `dd` | 10^39 |
| `tr` | 10^42 |

### Price Reduction Tiers

When `price-format` is set to `PRICE_WITH_REDUCTION`, amounts are abbreviated using the configured tiers:

| Property | Type | Description |
|----------|------|-------------|
| `format` | String | The display format. Use `%amount%` for the reduced number (e.g., `%amount%K`) |
| `maxAmount` | Long | The upper bound for this tier. Amounts exceeding this value use the next tier |
| `display` | String | A label for this tier (e.g., `1K`, `1M`, `1B`) |

**Example:** A balance of 1,500,000 would display as `1.5M` using the default reduction tiers.

### Default Economies

The `default-economies` list defines the starting balance given to new players:

| Property | Type | Description |
|----------|------|-------------|
| `economy` | String | The economy name to grant the starting balance in |
| `amount` | Double | The starting balance amount |

### Transaction Reasons

Transaction reasons are logged with each economy operation and can be used for auditing:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `pay-withdraw-reason` | String | `Payment sent` | Reason logged when money is withdrawn via `/pay` |
| `pay-deposit-reason` | String | `Payment received` | Reason logged when money is deposited via `/pay` |
| `command-give-reason` | String | `Admin give` | Reason logged for `/eco give` |
| `command-give-all-reason` | String | `Admin give all` | Reason logged for `/eco give-all` |
| `command-give-random-reason` | String | `Admin give random` | Reason logged for `/eco give-random` |
| `command-take-reason` | String | `Admin take` | Reason logged for `/eco take` |
| `command-reset-reason` | String | `Admin reset` | Reason logged for `/eco reset` |
| `command-set-reason` | String | `Admin set` | Reason logged for `/eco set` |

:::tip
Transaction reasons appear in Vault API callbacks and can be picked up by logging plugins that monitor economy transactions.
:::

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/money` | `balance` | `essentials.money` | Show your current balance |
| `/pay` | - | `essentials.pay` | Pay another player |
| `/paytoggle` | - | `essentials.pay.toggle` | Toggle whether you can receive payments |
| `/economy` | `eco` | `essentials.eco.use` | Manage economies (give, take, set, reset, show) |
| `/balancetop` | `baltop` | `essentials.balance.top` | Show the top balances leaderboard |

### Economy Subcommands

| Subcommand | Description |
|------------|-------------|
| `give` | Give money to a player |
| `take` | Take money from a player |
| `set` | Set a player's balance |
| `reset` | Reset a player's balance to the default |
| `reset-all` | Reset all player balances |
| `show` | Show a player's balance |
| `give-random` | Give money to a random online player |
| `give-all` | Give money to all online players |

---

## Related Permissions

| Permission | Description |
|------------|-------------|
| `essentials.money` | Allows using the `/money` command |
| `essentials.pay` | Allows using the `/pay` command |
| `essentials.pay.toggle` | Allows toggling payment reception |
| `essentials.eco.use` | Allows using `/economy` admin commands |
| `essentials.balance.top` | Allows viewing the balance top leaderboard |

---

## Related Placeholders

### Player Balance

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_formatted_balance_{economy}%` | Formatted balance for the specified economy (e.g., `1.5M$`) |
| `%zessentials_user_balance_{economy}%` | Raw numeric balance for the specified economy |
| `%zessentials_user_custom_balance_{economy}_{format}%` | Balance formatted with a custom DecimalFormat pattern |
| `%zessentials_user_position_{economy}%` | Player's rank position in the baltop leaderboard |

### Baltop Leaderboard

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_economy_baltop_name_{economy}_{position}%` | Player name at the given baltop position |
| `%zessentials_economy_baltop_uuid_{economy}_{position}%` | UUID of the player at the given baltop position |
| `%zessentials_economy_baltop_amount_{economy}_{position}%` | Raw balance amount at the given position |
| `%zessentials_economy_baltop_formatted_amount_{economy}_{position}%` | Formatted balance amount at the given position |

:::warning
Replace `{economy}` with the actual economy name (e.g., `money`, `coins`) and `{position}` with the rank number starting from 1. Using an invalid economy name will return an empty value.
:::

**Example:** Display the top 3 players in the `money` economy:
```
1. %zessentials_economy_baltop_name_money_1% - %zessentials_economy_baltop_formatted_amount_money_1%
2. %zessentials_economy_baltop_name_money_2% - %zessentials_economy_baltop_formatted_amount_money_2%
3. %zessentials_economy_baltop_name_money_3% - %zessentials_economy_baltop_formatted_amount_money_3%
```
