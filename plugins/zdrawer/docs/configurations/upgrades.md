---
sidebar_position: 3
title: Upgrades
description: Configure drawer upgrades
---

# Upgrades Configuration

Upgrades increase the storage capacity of drawers. Configure them in the `upgrades` section of `config.yml`.

## Basic Structure

```yaml
upgrades:
  woodUpgrade:                    # Upgrade name
    displayName: "Wood Upgrade"   # Human-readable name
    limit: 4096                   # New item limit
    displayItem:                  # Item shown on drawer
      material: IRON_BLOCK
    craft:                        # Crafting recipe
      enable: true
      result:
        # ...
      shade:
        # ...
      ingredients:
        # ...
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `displayName` | String | Name shown in messages |
| `limit` | Long | New storage limit per slot |
| `displayItem` | ItemStack | Item displayed on drawer when upgrade is applied |
| `craft` | Object | Crafting recipe configuration |

## Display Item

Configure the item shown on the drawer face when the upgrade is applied:

```yaml
displayItem:
  material: IRON_BLOCK
```

You can use any [zMenu item configuration](/zmenu/configurations/items/item):

```yaml
displayItem:
  material: PLAYER_HEAD
  url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6..."
```

## Craft Configuration

Each upgrade has its own crafting recipe:

```yaml
craft:
  enable: true
  result:
    url: "eyJ0ZXh0dXJlcyI6..."   # Player head texture
    name: "#cc7727Wood Upgrade"
    lore:
      - "&7Increases drawer capacity"
      - "&7New limit: &e4096 items"
  shade:
    - "AAA"
    - "BCB"
    - "AAA"
  ingredients:
    A:
      material: STICK
    B:
      material: BARREL
    C:
      customCraft: upgradeDisplay   # Reference to custom craft
```

## Using Custom Crafts

You can reference custom crafts as ingredients:

```yaml
ingredients:
  C:
    customCraft: upgradeDisplay
```

This requires defining `upgradeDisplay` in `customCrafts` section.

## Example Upgrades

### Iron Upgrade

```yaml
upgrades:
  ironUpgrade:
    displayName: "Iron Upgrade"
    limit: 8192
    displayItem:
      material: IRON_BLOCK
    craft:
      enable: true
      result:
        material: PLAYER_HEAD
        url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6..."
        name: "&7Iron Upgrade"
        lore:
          - "&7Limit: &f8192"
      shade:
        - "AAA"
        - "BCB"
        - "AAA"
      ingredients:
        A:
          material: IRON_INGOT
        B:
          material: BARREL
        C:
          customCraft: upgradeDisplay
```

### Diamond Upgrade

```yaml
upgrades:
  diamondUpgrade:
    displayName: "Diamond Upgrade"
    limit: 32768
    displayItem:
      material: DIAMOND_BLOCK
    craft:
      enable: true
      result:
        material: PLAYER_HEAD
        url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6..."
        name: "&bDiamond Upgrade"
        lore:
          - "&7Limit: &f32768"
      shade:
        - "AAA"
        - "BCB"
        - "ADA"
      ingredients:
        A:
          material: DIAMOND
        B:
          material: BARREL
        C:
          customCraft: upgradeDisplay
        D:
          material: DIAMOND_BLOCK
```

### Netherite Upgrade

```yaml
upgrades:
  netheriteUpgrade:
    displayName: "Netherite Upgrade"
    limit: 2147483647   # Max int value (unlimited)
    displayItem:
      material: NETHERITE_BLOCK
    craft:
      enable: true
      result:
        material: PLAYER_HEAD
        url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6..."
        name: "&8Netherite Upgrade"
        lore:
          - "&7Limit: &fUnlimited"
      shade:
        - "ADA"
        - "BCB"
        - "ADA"
      ingredients:
        A:
          material: NETHERITE_INGOT
        B:
          material: NETHERITE_BLOCK
        C:
          customCraft: upgradeDisplay
        D:
          material: ANCIENT_DEBRIS
```

## Applying Upgrades

Players apply upgrades by:

1. Crafting the upgrade item
2. Right-clicking on a placed drawer with the upgrade in hand

:::info
Upgrades can only increase the limit. If a drawer already has a higher limit upgrade, applying a lower one will fail.
:::

## Giving Upgrades

Admins can give pre-upgraded drawers:

```bash
/zdrawer give drawer single Steve ironUpgrade
```

Or give the upgrade item directly:

```bash
/zdrawer give craft ironUpgrade Steve
```
