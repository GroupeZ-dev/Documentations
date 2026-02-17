---
sidebar_position: 7
title: Requirements
description: Complete guide to the requirements system in zMenu - conditions for buttons and inventories
---

# Requirements

Requirements are conditions that must be met before a button is displayed, clicked, or an inventory is opened. They are the core system for creating dynamic, conditional menus in zMenu.

## How Requirements Work

A requirement checks a condition (permission, placeholder value, item in inventory, etc.). Based on the result:
- If **all** requirements are met, the `success` actions are executed
- If **any** requirement fails, the `deny` actions of that requirement are executed

```yaml
click-requirement:
  vip-requirement:
    click:
      - ALL
    requirements:
      - type: permission
        permission: "server.vip"
        deny:
          - type: message
            messages:
              - "&cYou need VIP to use this!"
    success:
      - type: message
        messages:
          - "&aWelcome, VIP!"
```

---

## Where to Use Requirements

Requirements can be used in three contexts:

### view-requirement (Buttons)

Controls whether a button is **visible**. If the requirements are not met, the button is hidden entirely.

```yaml
items:
  vip-only:
    slot: 0
    view-requirement:
      requirements:
        - type: permission
          permission: "server.vip"
    item:
      material: DIAMOND
      name: "&b&lVIP Item"
```

### click-requirement (Buttons)

Controls whether a button can be **clicked**. The button remains visible, but the click is denied if conditions are not met.

```yaml
items:
  purchase:
    slot: 0
    click-requirement:
      <requirement_name>:
        requirements:
          - type: placeholder
            value: "%vault_eco_balance%"
            compare: ">="
            number: 100
            deny:
              - type: message
                messages:
                  - "&cYou need $100 to purchase this!"
              - type: sound
                sound: ENTITY_VILLAGER_NO
        success:
          - type: currency-withdraw
            amount: 100
          - type: message
            messages:
              - "&aPurchase successful!"
    item:
      material: GOLD_INGOT
      name: "&e&lPurchase - $100"
```

### view-requirement / open-requirement (Inventories)

Controls whether an **inventory can be opened**. Applied at the inventory level, not on individual buttons. `open-requirement` is an alias for `view-requirement` at the inventory level.

```yaml
# In your inventory file
name: "&6VIP Menu"
size: 54

view-requirement:
  requirements:
    - type: permission
      permission: "server.vip"
      deny:
        - type: message
          messages:
            - "&cYou need VIP to access this menu!"
```

If the requirement is not met, the inventory will not open and the deny actions will execute.

---

## Requirement Types

### permission

Checks if the player has a specific permission.

```yaml
requirements:
  - type: permission
    permission: "server.admin"
```

| Key | Type | Description |
|-----|------|-------------|
| `permission` | String | The permission node to check |

:::tip
You can use any permission from any permission plugin (LuckPerms, etc.). This is the simplest and most common requirement type.
:::

---

### placeholder

Compares a placeholder value against a target. This is the most versatile requirement type.

#### Numeric comparison

```yaml
requirements:
  - type: placeholder
    value: "%player_level%"
    compare: ">="
    number: 10
```

| Key | Type | Description |
|-----|------|-------------|
| `value` | String | The placeholder to evaluate |
| `compare` | String | The comparison operator |
| `number` | Number | The numeric value to compare against |

#### String comparison

```yaml
requirements:
  - type: placeholder
    value: "%player_world%"
    compare: "equals_string"
    target: "world_nether"
```

| Key | Type | Description |
|-----|------|-------------|
| `value` | String | The placeholder to evaluate |
| `compare` | String | The comparison operator |
| `target` | String | The string value to compare against |

#### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal to (numeric) | `compare: "=="` |
| `!=` | Not equal to (numeric) | `compare: "!="` |
| `>=` | Greater than or equal | `compare: ">="` |
| `>` | Greater than | `compare: ">"` |
| `<=` | Less than or equal | `compare: "<="` |
| `<` | Less than | `compare: "<"` |
| `equals_string` | Exact string match | `compare: "equals_string"` |
| `equalsIgnoreCase` | Case-insensitive string match | `compare: "equalsIgnoreCase"` |

:::info Alternative Syntax
In patterns, you can also use the `action` key with these values instead of `compare`:
- `SUPERIOR_OR_EQUAL` (same as `>=`)
- `SUPERIOR` (same as `>`)
- `EQUAL_TO` (same as `==`)
- `LOWER` (same as `<`)

```yaml
requirements:
  - type: placeholder
    placeholder: "%player_level%"
    value: '10'
    action: SUPERIOR_OR_EQUAL
```
:::

#### Math Expressions

Enable `math: true` to evaluate mathematical expressions in placeholder values:

```yaml
requirements:
  - type: placeholder
    math: true
    placeholder: "%zmenu_player_value_cookie%"
    value: "%price%+(%price%*%zmenu_player_value_upgrades%*1.15)"
    action: SUPERIOR_OR_EQUAL
```

This evaluates the math expression before comparing. Useful for dynamic pricing, scaling costs, or complex conditions.

---

### money

Checks if the player has enough money in their account. Works with [BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/), [Vault](https://www.spigotmc.org/resources/34315/), [PlayerPoints](https://www.spigotmc.org/resources/80745/), [ElementalTokens](https://builtbybit.com/resources/16707/), [ElementalGems](https://builtbybit.com/resources/14920/), [Level](https://www.minecraft.net/), [Experience](https://www.minecraft.net/), [zEssentials](https://www.spigotmc.org/resources/118014/), [EcoBits](https://www.spigotmc.org/resources/109967/), [CoinsEngine](https://www.spigotmc.org/resources/84121/) and [VotingPlugin](https://www.spigotmc.org/resources/15358/).

Uses [CurrenciesAPI](https://github.com/Traqueur-dev/CurrenciesAPI).

```yaml
requirements:
  - type: money
    amount: 1000
```

| Key | Type | Description |
|-----|------|-------------|
| `amount` | Number | The minimum balance required |
| `currency` | String | The currency name (optional) |
| `economy` | String | The economy name (only needed for zEssentials, CoinsEngine and EcoBits) |

**Example with specific currency and economy:**

```yaml
requirements:
  - type: money
    amount: 500
    currency: "gems"
    economy: "CoinsEngine"
```

:::warning
This requirement only checks the balance. To actually withdraw money on success, use the `currency-withdraw` action in the `success` block.
:::

---

### item

Checks if the player has a specific item in their inventory.

```yaml
requirements:
  - type: item
    item:
      material: DIAMOND
      amount: 5
```

| Key | Type | Description |
|-----|------|-------------|
| `item.material` | String | The Minecraft material name |
| `item.amount` | Number | The minimum quantity required |

You can also check for items with specific properties:

```yaml
requirements:
  - type: item
    item:
      material: DIAMOND_SWORD
      name: "&6Legendary Blade"
      amount: 1
```

---

### luckperm

Checks if the player belongs to a specific LuckPerms group. Requires [LuckPerms](https://luckperms.net/).

```yaml
requirements:
  - type: luckperm
    group: vip
```

| Key | Type | Description |
|-----|------|-------------|
| `group` | String | The LuckPerms group name |

---

### job

Checks if the player has reached a specific job level. Requires [Jobs Reborn](https://www.spigotmc.org/resources/jobs-reborn.4216/).

```yaml
requirements:
  - type: job
    job: Miner
    level: 10
```

| Key | Type | Description |
|-----|------|-------------|
| `job` | String | The job name |
| `level` | Number | The minimum level required |

---

### regex

Checks if a value matches a regular expression pattern. Commonly used with the `INPUT` button type to validate player input.

```yaml
requirements:
  - type: regex
    input: "%input%"
    regex: "^[1-9][0-9]?$|^64$"
```

| Key | Type | Description |
|-----|------|-------------|
| `input` | String | The value to test against the regex |
| `regex` | String | The regular expression pattern |

**Example: Validate numeric input between 1 and 64:**

```yaml
items:
  set-amount:
    type: INPUT
    slot: 13
    input-message:
      - "&eEnter the amount to purchase:"
      - "&7(1-64)"
    input-cancel: "cancel"
    item:
      material: HOPPER
      name: "&6&lSet Amount"
    click-requirement:
      requirements:
        - type: regex
          input: "%input%"
          regex: "^[1-9][0-9]?$|^64$"
          deny:
            - type: message
              messages:
                - "&cPlease enter a number between 1 and 64"
      success:
        - type: data
          key: "amount"
          value: "%input%"
        - type: refresh
```

---

### player-name

Checks the player's name.

```yaml
requirements:
  - type: player-name
    name: "Notch"
```

| Key | Type | Description |
|-----|------|-------------|
| `name` | String | The player name to check |

---

### cuboid

Checks if the player is located inside a cuboid zone. You must define the world and the coordinates of the two opposite corners of the cuboid.

```yaml
requirements:
  - type: cuboid
    cuboids:
      - "world,0,60,0,100,120,100"
```

The format is `<world name>,<x1>,<y1>,<z1>,<x2>,<y2>,<z2>`.

| Key | Type | Description |
|-----|------|-------------|
| `cuboids` | List of Strings | List of cuboid zones in the format `world,x1,y1,z1,x2,y2,z2` |

You can define multiple cuboids. The requirement passes if the player is inside **any** of them:

```yaml
requirements:
  - type: cuboid
    cuboids:
      - "world,0,60,0,100,120,100"
      - "world,-50,40,-50,50,100,50"
      - "world_nether,10,30,10,50,80,50"
```

---

### and

:::warning zMenu+ only
This feature is only available with [zMenu+](../zmenu-plus).
:::

Combines multiple requirements where **all** must be met. This allows you to group requirements together and nest them with `or` blocks for complex logic.

```yaml
requirements:
  - type: and
    requirements:
      - type: permission
        permission: "server.vip"
      - type: placeholder
        value: "%player_level%"
        compare: ">="
        number: 10
```

| Key | Type | Description |
|-----|------|-------------|
| `requirements` | List | The list of sub-requirements that must all pass |

---

### or

:::warning zMenu+ only
This feature is only available with [zMenu+](../zmenu-plus).
:::

Combines multiple requirements where only a **minimum** number must be met.

```yaml
requirements:
  - type: or
    minimum: 1
    random: false
    requirements:
      - type: permission
        permission: "server.vip"
      - type: permission
        permission: "server.premium"
```

| Key | Type | Description |
|-----|------|-------------|
| `minimum` | Number | The minimum number of requirements that must pass |
| `random` | Boolean | Whether the list of requirements should be traversed randomly |
| `requirements` | List | The list of sub-requirements |

---

### Combining and + or

You can combine `and` and `or` requirements to create complex conditions. For example, the player must have permission A **and** B, plus must have permission C **or** D:

```yaml
name: "&8Test And/Or"
size: 54
items:
  test:
    slot: 22
    view-requirement:
      requirements:
        - type: and
          requirements:
            - type: permission
              permission: zmenu.test
              success:
                - type: message
                  messages:
                    - "&7Test And 1 - &aOK"
              deny:
                - type: message
                  messages:
                    - "&7Test And 1 - &cKO"
            - type: permission
              permission: zmenu.test2
              success:
                - type: message
                  messages:
                    - "&7Test And 2 - &aOK"
              deny:
                - type: message
                  messages:
                    - "&7Test And 2 - &cKO"
        - type: or
          minimum: 1
          random: true
          requirements:
            - type: permission
              permission: zmenu.test3
              success:
                - type: message
                  messages:
                    - "&7Test Or 1 - &aOK"
              deny:
                - type: message
                  messages:
                    - "&7Test Or 1 - &cKO"
            - type: permission
              permission: zmenu.test4
              success:
                - type: message
                  messages:
                    - "&7Test Or 2 - &aOK"
              deny:
                - type: message
                  messages:
                    - "&7Test Or 2 - &cKO"
    item:
      material: PAPER
      name: "&aTest And/Or"
    else:
      item:
        material: PAPER
        name: "&cTest And/Or"
```

In this example, the player must have `zmenu.test` **and** `zmenu.test2` (the `and` block), plus must have `zmenu.test3` **or** `zmenu.test4` (the `or` block with `minimum: 1`). Each sub-requirement has its own `success` and `deny` actions for feedback.

---

## Success and Deny Actions

Each requirement can have `deny` actions, and the overall requirement block can have `success` actions.

### deny

Actions executed when **this specific requirement** is not met. Defined inside each individual requirement.

```yaml
requirements:
  - type: permission
    permission: "server.vip"
    deny:
      - type: message
        messages:
          - "&cYou need VIP rank!"
      - type: sound
        sound: ENTITY_VILLAGER_NO
```

### success

Actions executed when **all requirements** are met. Defined at the requirement block level (outside the `requirements` list).

```yaml
click-requirement:
  requirements:
    - type: placeholder
      value: "%vault_eco_balance%"
      compare: ">="
      number: 500
      deny:
        - type: message
          messages:
            - "&cYou need $500!"
  success:
    - type: currency-withdraw
      amount: 500
    - type: console-command
      commands:
        - "give %player% diamond_sword 1"
    - type: message
      messages:
        - "&aPurchase successful!"
    - type: sound
      sound: ENTITY_PLAYER_LEVELUP
```

All [action types](./buttons/actions) can be used in both `deny` and `success` blocks.

---

## Multiple Requirements

You can combine multiple requirements. **All** requirements must be met for the condition to pass. If any single requirement fails, its `deny` actions are executed.

```yaml
click-requirement:
  requirements:
    - type: permission
      permission: "server.vip"
      deny:
        - type: message
          messages:
            - "&cYou need VIP rank!"
    - type: placeholder
      value: "%vault_eco_balance%"
      compare: ">="
      number: 1000
      deny:
        - type: message
          messages:
            - "&cYou need $1000!"
    - type: item
      item:
        material: DIAMOND
        amount: 5
      deny:
        - type: message
          messages:
            - "&cYou need 5 diamonds!"
  success:
    - type: message
      messages:
        - "&aAll conditions met!"
```

In this example, the player must have the VIP permission **AND** $1000 **AND** 5 diamonds. If any condition fails, the corresponding deny message is shown.

---

## The else System

The `else` block works with `view-requirement` to display an alternative button when the requirement is not met. Instead of hiding the button entirely, you can show a different item.

### Basic else

```yaml
items:
  vip-button:
    slot: 0
    view-requirement:
      requirements:
        - type: permission
          permission: "vip.access"
    item:
      material: DIAMOND_BLOCK
      name: "&b&lVIP Content"
    else:
      item:
        material: COAL_BLOCK
        name: "&7&lLocked"
        lore:
          - "&cRequires VIP rank"
```

If the player has `vip.access`, they see a diamond block. Otherwise, they see a coal block with a "locked" message.

### Nested else Chains

You can chain multiple `else` blocks to create a state machine with several visual states. Each `else` can have its own `view-requirement`:

```yaml
items:
  reward:
    slot: 0

    # State 1: Already claimed
    view-requirement:
      requirements:
        - type: placeholder
          placeholder: "%zmenu_player_value_claimed%"
          value: "true"
          action: EQUAL_TO
    item:
      material: MINECART
      name: "&a&lReward Claimed"
      lore:
        - "&7You already claimed this reward"

    else:
      # State 2: Not enough level
      view-requirement:
        requirements:
          - type: placeholder
            placeholder: "%player_level%"
            value: "10"
            action: LOWER
      item:
        material: BARRIER
        name: "&c&lLocked"
        lore:
          - "&7Requires level 10"

      else:
        # State 3: Ready to claim
        item:
          material: CHEST
          name: "&e&lClaim Reward"
          lore:
            - "&7Click to claim!"
        click-requirement:
          requirements:
            - type: placeholder
              placeholder: "%player_level%"
              value: "10"
              action: SUPERIOR_OR_EQUAL
          success:
            - type: data
              action: SET
              key: "claimed"
              value: "true"
            - type: console-command
              commands:
                - "give %player% diamond 10"
            - type: sound
              sound: ENTITY_PLAYER_LEVELUP
```

The system evaluates each `view-requirement` from top to bottom:
1. If the first requirement matches, that button state is shown
2. If not, it moves to the `else` block and checks its requirement
3. This continues through the chain
4. The final `else` without a `view-requirement` acts as the default

---

## Named Click Requirements

Inside `click-requirement`, you can define **named requirement groups** with specific click types. This allows different conditions for different click actions.

```yaml
click-requirement:
  purchase:
    clicks:
      - ALL
    requirements:
      - type: placeholder
        value: "%vault_eco_balance%"
        compare: ">="
        number: 100
        deny:
          - type: message
            messages:
              - "&cYou need $100!"
    success:
      - type: currency-withdraw
        amount: 100
      - type: message
        messages:
          - "&aPurchased!"
```

| Key | Description |
|-----|-------------|
| `clicks` | List of click types this group responds to |
| `requirements` | The conditions to check |
| `success` | Actions if all requirements pass |

**Available click types:** `ALL`, `LEFT`, `RIGHT`, `SHIFT_LEFT`, `SHIFT_RIGHT`, `MIDDLE`, `DROP`, `CONTROL_DROP`

**Example with different actions per click:**

```yaml
click-requirement:
  buy-one:
    clicks:
      - LEFT
    requirements:
      - type: placeholder
        value: "%vault_eco_balance%"
        compare: ">="
        number: 100
        deny:
          - type: message
            messages:
              - "&cYou need $100!"
    success:
      - type: currency-withdraw
        amount: 100
      - type: console-command
        commands:
          - "give %player% diamond 1"
  buy-stack:
    clicks:
      - RIGHT
    requirements:
      - type: placeholder
        value: "%vault_eco_balance%"
        compare: ">="
        number: 6400
        deny:
          - type: message
            messages:
              - "&cYou need $6400!"
    success:
      - type: currency-withdraw
        amount: 6400
      - type: console-command
        commands:
          - "give %player% diamond 64"
```

---

## Complete Examples

### Shop Item with Price Check

A button that sells an item only if the player can afford it:

```yaml
items:
  shop-sword:
    slot: 13
    type: NONE
    item:
      material: DIAMOND_SWORD
      name: "&6&lDiamond Sword"
      lore:
        - "&8&m─────────────────"
        - ""
        - "&7Price: &a$500"
        - "&7Your balance: &e$%vault_eco_balance%"
        - ""
        - "&8&m─────────────────"
        - ""
        - "&e▸ Click to purchase"
      glow: true
    click-requirement:
      requirements:
        - type: placeholder
          value: "%vault_eco_balance%"
          compare: ">="
          number: 500
          deny:
            - type: message
              messages:
                - "&cYou need $500 to buy this!"
            - type: sound
              sound: ENTITY_VILLAGER_NO
      success:
        - type: currency-withdraw
          amount: 500
        - type: console-command
          commands:
            - "give %player% diamond_sword 1"
        - type: message
          messages:
            - "&aPurchase successful!"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
        - type: close
```

### Daily Reward with Cooldown

A button that can only be clicked once every 24 hours using player data and timestamps:

```yaml
items:
  daily-reward:
    slot: 22
    item:
      material: CHEST
      name: "&e&lDaily Reward"
      lore:
        - "&7Claim your daily reward!"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_math_%zmenu_time_unix_timestamp%-%zmenu_player_value_last_daily%%"
          compare: ">="
          number: 86400
          deny:
            - type: message
              messages:
                - "&cYou already claimed today's reward!"
      success:
        - type: data
          action: SET
          key: "last_daily"
          value: "%zmenu_time_unix_timestamp%"
        - type: console-command
          commands:
            - "give %player% diamond 5"
        - type: data
          action: ADD
          key: "daily_streak"
          value: "1"
        - type: message
          messages:
            - "&aDaily reward claimed!"
            - "&7Streak: &e%zmenu_player_value_daily_streak%"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
```

### VIP-Gated Menu

An inventory that only VIP players can open:

```yaml
name: "&6&lVIP Lounge"
size: 54

view-requirement:
  requirements:
    - type: permission
      permission: "server.vip"
      deny:
        - type: message
          messages:
            - "&cThis menu is reserved for VIP members!"
        - type: sound
          sound: ENTITY_VILLAGER_NO

open-actions:
  - type: sound
    sound: BLOCK_CHEST_OPEN
  - type: message
    messages:
      - "&aWelcome to the VIP lounge!"

items:
  # ... your VIP-only buttons
```

### Rank-Based Button with else Chain

A button that shows different content based on the player's rank:

```yaml
items:
  rank-display:
    slot: 4

    # Diamond rank
    view-requirement:
      requirements:
        - type: luckperm
          group: diamond
    item:
      material: DIAMOND_BLOCK
      name: "&b&lDiamond Rank"
      lore:
        - "&7Your rank: &bDiamond"

    else:
      # Gold rank
      view-requirement:
        requirements:
          - type: luckperm
            group: gold
      item:
        material: GOLD_BLOCK
        name: "&6&lGold Rank"
        lore:
          - "&7Your rank: &6Gold"

      else:
        # Default (no rank)
        item:
          material: STONE
          name: "&7&lNo Rank"
          lore:
            - "&7You don't have a rank"
            - "&eVisit our store to get one!"
```

### Player Data Spending System

A button that checks a custom currency stored in player data:

```yaml
items:
  spend-coins:
    slot: 15
    item:
      material: DIAMOND
      name: "&b&lBuy Diamond"
      lore:
        - "&7Cost: &e50 coins"
        - "&7Your coins: &f%zmenu_player_value_coins%"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_value_coins%"
          compare: ">="
          number: 50
          deny:
            - type: message
              messages:
                - "&cYou need 50 coins!"
      success:
        - type: data
          action: SUBTRACT
          key: "coins"
          value: "50"
        - type: console-command
          commands:
            - "give %player% diamond 1"
        - type: refresh
```

### Initialize Default Values

Use a hidden button with `view-requirement` to set default player data on first visit:

```yaml
items:
  initialize:
    slot: 0
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_value_initialized%"
          compare: "!="
          target: "true"
    item:
      material: AIR
    actions:
      - type: data
        action: SET
        key: "coins"
        value: "0"
      - type: data
        action: SET
        key: "initialized"
        value: "true"
      - type: refresh
```

This invisible button checks if the player has been initialized. If not, it sets default values and refreshes the inventory.
