---
sidebar_position: 2
title: Economies
description: Configure economy systems in zShop
---

# Economies Configuration

The `economies.yml` file defines all available economy types that can be used in your shop.

## Economy Structure

Each economy follows this structure:

```yaml
economies:
  ECONOMY_ID:
    name: economy_name      # Internal name (used in item configs)
    type: ECONOMY_TYPE      # Economy type
    currency: "%price%$"    # Display format
    is-enable: true         # Enable/disable
    deny-message: "..."     # Message when insufficient funds
```

## Built-in Economy Types

### Vault

Standard Vault economy integration:

```yaml
economies:
  VAULT:
    name: vault
    type: VAULT
    currency: "%price%$"
    is-enable: true
    deny-message: "&cYou don't have enough money to buy this."
```

### Item Economy

Use items as currency (e.g., diamonds, emeralds):

```yaml
economies:
  ITEM_DIAMOND:
    name: item_diamond
    type: ITEM
    currency: "%price% diamond%s%"
    is-enable: true
    deny-message: "&cYou don't have enough diamonds to buy this."
    item:
      material: DIAMOND

  ITEM_EMERALD:
    name: item_emerald
    type: ITEM
    currency: "%price% emerald%s%"
    is-enable: true
    deny-message: "&cYou don't have enough emeralds to buy this."
    item:
      material: EMERALD
```

The `%s%` placeholder adds "s" for plural (e.g., "1 diamond", "5 diamonds").

:::tip Custom Items
You can use any item configuration supported by zMenu, including custom model data, NBT, etc.
:::

### Experience

Use Minecraft XP points:

```yaml
economies:
  EXPERIENCE:
    name: experience
    type: EXPERIENCE
    currency: "%price% XP"
    is-enable: true
    deny-message: "&cYou don't have enough experience to buy this."
```

### Level

Use Minecraft player levels:

```yaml
economies:
  LEVEL:
    name: level
    type: LEVEL
    currency: "%price% levels"
    is-enable: true
    deny-message: "&cYou don't have enough levels to buy this."
```

### PlayerPoints

Integration with PlayerPoints plugin:

```yaml
economies:
  PLAYERPOINTS:
    name: playerpoints
    type: PLAYERPOINTS
    currency: "%price% points"
    is-enable: true
    deny-message: "&cYou don't have enough points to buy this."
```

### CoinsEngine

Integration with CoinsEngine plugin:

```yaml
economies:
  COINSENGINE:
    name: coinsengine
    type: COINSENGINE
    currency: "%price% coins"
    is-enable: true
    currency-name: "coins"  # CoinsEngine currency name
    deny-message: "&cYou don't have enough coins to buy this."
```

### TokenManager

Integration with TokenManager plugin:

```yaml
economies:
  TOKENMANAGER:
    name: tokenmanager
    type: TOKENMANAGER
    currency: "%price% tokens"
    is-enable: true
    deny-message: "&cYou don't have enough tokens to buy this."
```

### VotingPlugin

Integration with VotingPlugin:

```yaml
economies:
  VOTINGPLUGIN:
    name: votingplugin
    type: VOTINGPLUGIN
    currency: "%price% vote points"
    is-enable: true
    deny-message: "&cYou don't have enough vote points to buy this."
```

### BeastToken

Integration with BeastToken plugin:

```yaml
economies:
  BEASTTOKEN:
    name: beasttoken
    type: BEASTTOKEN
    currency: "%price% tokens"
    is-enable: true
    deny-message: "&cYou don't have enough tokens to buy this."
```

## Using Economies in Items

Specify economy per item in your shop configuration:

```yaml
items:
  diamond:
    type: ZSHOP_ITEM
    item:
      material: DIAMOND
    buyPrice: 100.0
    sellPrice: 50.0
    economy: vault  # Uses vault economy

  special_sword:
    type: ZSHOP_ITEM
    item:
      material: DIAMOND_SWORD
    buyPrice: 10.0
    sellPrice: 5.0
    economy: item_diamond  # Uses diamond items as currency
```

If `economy` is not specified, the `defaultEconomy` from `config.yml` is used.

## Complete Example

```yaml
economies:
  # Main server currency (Vault)
  VAULT:
    name: vault
    type: VAULT
    currency: "$%price%"
    is-enable: true
    deny-message: "&cYou need $%price% to purchase this item."

  # Diamond currency for special items
  DIAMONDS:
    name: diamonds
    type: ITEM
    currency: "%price% &b&l\u2666"  # Diamond symbol
    is-enable: true
    deny-message: "&cYou need %price% diamonds to purchase this."
    item:
      material: DIAMOND

  # Emerald currency for villager trades
  EMERALDS:
    name: emeralds
    type: ITEM
    currency: "%price% emerald%s%"
    is-enable: true
    deny-message: "&cYou need %price% emeralds to purchase this."
    item:
      material: EMERALD

  # Nether Star for legendary items
  STARS:
    name: nether_stars
    type: ITEM
    currency: "%price% Nether Star%s%"
    is-enable: true
    deny-message: "&cYou need %price% Nether Stars to purchase this."
    item:
      material: NETHER_STAR

  # XP economy for enchantments
  XP:
    name: xp
    type: EXPERIENCE
    currency: "%price% XP"
    is-enable: true
    deny-message: "&cYou need %price% XP to purchase this."

  # Level economy for skills
  LEVELS:
    name: levels
    type: LEVEL
    currency: "%price% level%s%"
    is-enable: true
    deny-message: "&cYou need to be level %price% to purchase this."

  # Vote points for vote rewards
  VOTES:
    name: votes
    type: VOTINGPLUGIN
    currency: "%price% vote point%s%"
    is-enable: true
    deny-message: "&cYou need %price% vote points to purchase this."

  # Premium tokens
  TOKENS:
    name: tokens
    type: TOKENMANAGER
    currency: "%price% token%s%"
    is-enable: true
    deny-message: "&cYou need %price% tokens to purchase this."
```

## Currency Placeholder

The `currency` field supports:
- `%price%` - The numeric price
- `%s%` - Adds "s" if price > 1 (for pluralization)
- Color codes (`&6`, `&#FF5500`)
- Unicode characters

**Examples:**
```yaml
currency: "$%price%"           # $100
currency: "%price% coins"      # 100 coins
currency: "%price% diamond%s%" # 1 diamond, 5 diamonds
currency: "&6%price%&e gold"   # Colored text
```

## Custom Item Economy

For advanced item currencies with custom properties:

```yaml
economies:
  CUSTOM_COIN:
    name: custom_coin
    type: ITEM
    currency: "%price% &6Gold Coin%s%"
    is-enable: true
    deny-message: "&cYou need %price% Gold Coins to purchase this."
    item:
      material: GOLD_NUGGET
      name: "&6Gold Coin"
      lore:
        - "&7A valuable currency"
      model-id: 1001  # Custom model data
      glow: true
```

The item configuration follows [zMenu item format](https://docs.zmenu.dev/configurations/items).
