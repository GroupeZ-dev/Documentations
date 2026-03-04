---
sidebar_position: 5
title: Rules (Blacklist/Whitelist)
description: Configure item restrictions in zAuctionHouse V4
---

# Rules Configuration

Control which items can be sold in the auction house using blacklist and whitelist rules. Rules are configured in `rules.yml`.

## How Rules Work

- **Blacklist**: Prevents specific items from being sold. All items are allowed except those matching the rules.
- **Whitelist**: Only allows specific items to be sold. All items are blocked except those matching the rules.
- Blacklist is checked **before** whitelist
- If an item matches a blacklist rule, it is blocked regardless of whitelist

:::warning
When whitelist is enabled, ONLY items matching whitelist rules can be sold.
:::

## File Structure

```yaml
blacklist:
  enabled: true
  rules:
    - [rule definitions]

whitelist:
  enabled: false
  rules:
    - [rule definitions]
```

## Rule Types Reference

### Material Rule

Match items by exact Minecraft material name:

```yaml
- type: material
  materials:
    - BEDROCK
    - BARRIER
    - COMMAND_BLOCK
```

### Material Suffix Rule

Match materials ending with a specific suffix:

```yaml
- type: material-suffix
  suffixes:
    - "_SWORD"       # DIAMOND_SWORD, IRON_SWORD, etc.
    - "_HELMET"      # All helmets
    - "_SPAWN_EGG"   # All spawn eggs
```

### Name Rule

Match items by display name:

```yaml
- type: name
  mode: CONTAINS  # CONTAINS, EQUALS, STARTS_WITH, ENDS_WITH, REGEX
  values:
    - "Admin"
    - "Untradeable"
    - "[Soulbound]"
```

| Mode | Description |
|------|-------------|
| `CONTAINS` | Name contains the value anywhere |
| `EQUALS` | Name exactly equals the value |
| `STARTS_WITH` | Name starts with the value |
| `ENDS_WITH` | Name ends with the value |
| `REGEX` | Name matches the regex pattern |

### Lore Rule

Match items by lore content:

```yaml
- type: lore
  mode: CONTAINS
  values:
    - "Soulbound"
    - "Cannot be traded"
    - "Personal Item"
```

### Custom Model Data Rule

Match items by CustomModelData value:

```yaml
- type: custom-model-data
  values:
    - 1001
    - 1002
    - 5000
```

### Tag Rule

Match items using Bukkit/Paper item tags:

```yaml
- type: tag
  tags:
    - BLOCKS
    - ITEMS
```

### NBT Rule

Match items by NBT data:

```yaml
- type: nbt
  path: "custom.data.key"
  value: "expected_value"
```

### Combination Rules

#### AND Rule

All rules must match:

```yaml
- type: and
  rules:
    - type: material
      materials:
        - NETHER_STAR
    - type: name
      mode: CONTAINS
      values:
        - "Voucher"
```

#### OR Rule

Any rule must match:

```yaml
- type: or
  rules:
    - type: lore
      mode: CONTAINS
      values:
        - "Soulbound"
    - type: lore
      mode: CONTAINS
      values:
        - "Untradeable"
```

## Custom Item Plugin Rules

All custom item plugin rules support **wildcard patterns** using `*`:

### ItemsAdder

```yaml
- type: itemsadder
  items:
    - "namespace:item_id"       # Exact match
    - "namespace:*"             # All items from namespace
    - "mynamespace:rare_*"      # Items starting with "rare_"
```

### Oraxen

```yaml
- type: oraxen
  items:
    - "custom_sword"
    - "*_armor"                 # Items ending with "_armor"
    - "event_*"                 # Items starting with "event_"
```

### Nexo

```yaml
- type: nexo
  items:
    - "mythic_blade"
    - "special_*"
    - "*_soulbound"
```

### MMOItems

```yaml
- type: mmoitems
  items:
    - "SWORD:CUTLASS"           # TYPE:ID format
    - "SWORD:*"                 # All items of type SWORD
    - "*:LEGENDARY_ITEM"        # Any type with this ID
    - "TOOL:*"                  # All tools
```

### ExecutableItems

```yaml
- type: executableitems
  items:
    - "custom_wand"
    - "voucher_*"
    - "admin_*"
```

### EcoItems

```yaml
- type: ecoitems
  items:
    - "packmaster_tear"
    - "charm_*"
```

### Crucible (MythicCrucible)

```yaml
- type: crucible
  items:
    - "mythic_blade"
    - "dungeon_*"
```

### Slimefun

```yaml
- type: slimefun
  items:
    - "ELECTRIC_MOTOR"
    - "*_INGOT"
    - "CARGO_*"
```

### HeadDatabase

```yaml
- type: headdatabase
  items:
    - "12345"                   # By ID
    - "123*"                    # IDs starting with 123
```

### Nova

```yaml
- type: nova
  items:
    - "machines:electric_furnace"
    - "machines:*"              # All from machines addon
    - "*:solar_panel"           # Any addon with solar_panel
```

### Other Supported Plugins

| Plugin | Rule Type |
|--------|-----------|
| Denizen | `denizen` |
| AdvancedItems | `advanceditems` |
| CustomCrafting | `customcrafting` |
| zHead | `zhead` |
| MagicCosmetics | `magiccosmetics` |
| HMCCosmetics | `hmccosmetics` |
| zItems | `zitems` |
| CraftEngine | `craftengine` |
| ExecutableBlocks | `executableblocks` |

## Blacklist Example

```yaml
blacklist:
  enabled: true
  rules:
    # Block administrative blocks
    - type: material
      materials:
        - BEDROCK
        - BARRIER
        - COMMAND_BLOCK

    # Block items with "Untradeable" in lore AND model data 1001
    - type: and
      rules:
        - type: lore
          mode: CONTAINS
          values:
            - "Untradeable"
        - type: custom-model-data
          values:
            - 1001

    # Block specific ItemsAdder items
    # - type: itemsadder
    #   items:
    #     - "namespace:*"

    # Block specific Oraxen items
    # - type: oraxen
    #   items:
    #     - "event_*"

    # Block all MMOItems swords
    # - type: mmoitems
    #   items:
    #     - "SWORD:*"
```

## Whitelist Example

Create a specialized auction house (e.g., only vouchers):

```yaml
whitelist:
  enabled: true
  rules:
    # Only allow Nether Stars with "Voucher" in name
    - type: and
      rules:
        - type: material
          materials:
            - NETHER_STAR
        - type: name
          mode: CONTAINS
          values:
            - "Voucher"

    # Or only weapons
    # - type: material-suffix
    #   suffixes:
    #     - "_SWORD"
    #     - "_AXE"

    # Or items with "Tradeable" lore
    # - type: lore
    #   mode: CONTAINS
    #   values:
    #     - "Tradeable"
```

## Full Example

Complete `rules.yml`:

```yaml
blacklist:
  enabled: true
  rules:
    # Block admin blocks
    - type: material
      materials:
        - BEDROCK
        - BARRIER
        - COMMAND_BLOCK
        - CHAIN_COMMAND_BLOCK
        - REPEATING_COMMAND_BLOCK
        - STRUCTURE_BLOCK
        - STRUCTURE_VOID
        - JIGSAW
        - LIGHT
        - DEBUG_STICK

    # Block spawn eggs
    - type: material-suffix
      suffixes:
        - _SPAWN_EGG

    # Block soulbound items
    - type: lore
      mode: CONTAINS
      values:
        - "Soulbound"
        - "Cannot be traded"
        - "Untradeable"

    # Block items with admin tags
    - type: name
      mode: CONTAINS
      values:
        - "[Admin]"
        - "[Staff]"

whitelist:
  enabled: false
  rules:
    # Example: Only allow weapons and armor
    - type: material-suffix
      suffixes:
        - "_SWORD"
        - "_AXE"
        - "_HELMET"
        - "_CHESTPLATE"
        - "_LEGGINGS"
        - "_BOOTS"
```

## Tips

:::tip Saving Items
You can save items in Base64 format using `/zmenu save <item name>` then reference them in your rules for exact item matching.
:::

:::info Reload
After modifying rules, reload with `/ah reload`. Existing listings are not affected - they remain until expired or purchased.
:::

## Bypass Permission

Players with this permission can sell blacklisted items:

```
zauctionhouse.bypass.blacklist
```
