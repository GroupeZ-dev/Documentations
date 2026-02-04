---
sidebar_position: 22
title: WorldEdit Module
description: Built-in block manipulation tools with economy integration and permission-based limits
---

# WorldEdit Module

**File:** `modules/worldedit/config.yml`

The WorldEdit module provides a built-in block manipulation system designed for survival and creative servers. Unlike traditional WorldEdit plugins, this module integrates directly with the zEssentials **economy system**, charging players per block placed or removed. It features **permission-based limits** for block counts, distances, and operation speeds, allowing server administrators to offer tiered WorldEdit access (e.g., free for admins, paid for regular players). A configurable block blacklist, per-material pricing, boss bar progress display, and batch processing ensure safe and performant world editing.

---

## Source Configuration

```yaml
enable: true

items:
  player-wand:
    name: "player-wand"
    display-name: "&ePlayer Wand"
    max-use: 50
    price-multiplier: 1.2
    item:
      material: WOODEN_AXE
      name: "&ePlayer WorldEdit Wand"
      lore:
        - "&7Right-click to set position 1"
        - "&7Left-click to set position 2"
        - "&7Uses remaining: &e%uses%"
  admin-Wand:
    name: "admin-Wand"
    display-name: "&cAdmin Wand"
    max-use: -1
    price-multiplier: 0
    item:
      material: GOLDEN_AXE
      name: "&cAdmin WorldEdit Wand"
      lore:
        - "&7Right-click to set position 1"
        - "&7Left-click to set position 2"
        - "&4Unlimited uses"

blacklist-blocks:
  - BEDROCK
  - BARRIER
  - COMMAND_BLOCK
  - CHAIN_COMMAND_BLOCK
  - REPEATING_COMMAND_BLOCK
  - STRUCTURE_BLOCK
  - STRUCTURE_VOID
  - JIGSAW
  - END_PORTAL
  - END_PORTAL_FRAME
  - END_GATEWAY
  - NETHER_PORTAL
  - SPAWNER
  - BUDDING_AMETHYST
  - REINFORCED_DEEPSLATE
  - SCULK_CATALYST
  - SCULK_SHRIEKER
  - SCULK_SENSOR
  - CALIBRATED_SCULK_SENSOR
  - LIGHT
  - PETRIFIED_OAK_SLAB
  - PLAYER_HEAD
  - PLAYER_WALL_HEAD
  - ZOMBIE_HEAD
  - ZOMBIE_WALL_HEAD
  - CREEPER_HEAD
  - CREEPER_WALL_HEAD
  - DRAGON_HEAD
  - DRAGON_WALL_HEAD
  - SKELETON_SKULL
  - SKELETON_WALL_SKULL
  - WITHER_SKELETON_SKULL
  - WITHER_SKELETON_WALL_SKULL
  - PIGLIN_HEAD
  - PIGLIN_WALL_HEAD
  - CHEST
  - TRAPPED_CHEST
  - ENDER_CHEST
  - BARREL
  - SHULKER_BOX
  - WHITE_SHULKER_BOX
  - ORANGE_SHULKER_BOX
  - MAGENTA_SHULKER_BOX
  - LIGHT_BLUE_SHULKER_BOX
  - YELLOW_SHULKER_BOX
  - LIME_SHULKER_BOX
  - PINK_SHULKER_BOX
  - GRAY_SHULKER_BOX
  - LIGHT_GRAY_SHULKER_BOX
  - CYAN_SHULKER_BOX
  - PURPLE_SHULKER_BOX
  - BLUE_SHULKER_BOX
  - BROWN_SHULKER_BOX
  - GREEN_SHULKER_BOX
  - RED_SHULKER_BOX
  - BLACK_SHULKER_BOX
  - FURNACE
  - BLAST_FURNACE
  - SMOKER
  - BREWING_STAND
  - HOPPER
  - DROPPER
  - DISPENSER
  - BEACON
  - CONDUIT
  - BELL
  - ENCHANTING_TABLE
  - ANVIL
  - CHIPPED_ANVIL
  - DAMAGED_ANVIL
  - GRINDSTONE
  - CARTOGRAPHY_TABLE
  - LOOM
  - SMITHING_TABLE
  - STONECUTTER
  - LECTERN
  - COMPOSTER
  - RESPAWN_ANCHOR
  - LODESTONE
  - BEE_NEST
  - BEEHIVE
  - CAMPFIRE
  - SOUL_CAMPFIRE
  - TNT
  - DRAGON_EGG
  - TURTLE_EGG
  - SNIFFER_EGG
  - FROGSPAWN
  - INFESTED_STONE
  - INFESTED_COBBLESTONE
  - INFESTED_STONE_BRICKS
  - INFESTED_MOSSY_STONE_BRICKS
  - INFESTED_CRACKED_STONE_BRICKS
  - INFESTED_CHISELED_STONE_BRICKS
  - INFESTED_DEEPSLATE
  - OAK_SIGN
  - SPRUCE_SIGN
  - BIRCH_SIGN
  - JUNGLE_SIGN
  - ACACIA_SIGN
  - DARK_OAK_SIGN
  - MANGROVE_SIGN
  - CHERRY_SIGN
  - BAMBOO_SIGN
  - CRIMSON_SIGN
  - WARPED_SIGN
  - OAK_WALL_SIGN
  - SPRUCE_WALL_SIGN
  - BIRCH_WALL_SIGN
  - JUNGLE_WALL_SIGN
  - ACACIA_WALL_SIGN
  - DARK_OAK_WALL_SIGN
  - MANGROVE_WALL_SIGN
  - CHERRY_WALL_SIGN
  - BAMBOO_WALL_SIGN
  - CRIMSON_WALL_SIGN
  - WARPED_WALL_SIGN
  - OAK_HANGING_SIGN
  - SPRUCE_HANGING_SIGN
  - BIRCH_HANGING_SIGN
  - JUNGLE_HANGING_SIGN
  - ACACIA_HANGING_SIGN
  - DARK_OAK_HANGING_SIGN
  - MANGROVE_HANGING_SIGN
  - CHERRY_HANGING_SIGN
  - BAMBOO_HANGING_SIGN
  - CRIMSON_HANGING_SIGN
  - WARPED_HANGING_SIGN
  - OAK_WALL_HANGING_SIGN
  - SPRUCE_WALL_HANGING_SIGN
  - BIRCH_WALL_HANGING_SIGN
  - JUNGLE_WALL_HANGING_SIGN
  - ACACIA_WALL_HANGING_SIGN
  - DARK_OAK_WALL_HANGING_SIGN
  - MANGROVE_WALL_HANGING_SIGN
  - CHERRY_WALL_HANGING_SIGN
  - BAMBOO_WALL_HANGING_SIGN
  - CRIMSON_WALL_HANGING_SIGN
  - WARPED_WALL_HANGING_SIGN
  - WHITE_BED
  - ORANGE_BED
  - MAGENTA_BED
  - LIGHT_BLUE_BED
  - YELLOW_BED
  - LIME_BED
  - PINK_BED
  - GRAY_BED
  - LIGHT_GRAY_BED
  - CYAN_BED
  - PURPLE_BED
  - BLUE_BED
  - BROWN_BED
  - GREEN_BED
  - RED_BED
  - BLACK_BED
  - WHITE_BANNER
  - ORANGE_BANNER
  - MAGENTA_BANNER
  - LIGHT_BLUE_BANNER
  - YELLOW_BANNER
  - LIME_BANNER
  - PINK_BANNER
  - GRAY_BANNER
  - LIGHT_GRAY_BANNER
  - CYAN_BANNER
  - PURPLE_BANNER
  - BLUE_BANNER
  - BROWN_BANNER
  - GREEN_BANNER
  - RED_BANNER
  - BLACK_BANNER
  - WHITE_WALL_BANNER
  - ORANGE_WALL_BANNER
  - MAGENTA_WALL_BANNER
  - LIGHT_BLUE_WALL_BANNER
  - YELLOW_WALL_BANNER
  - LIME_WALL_BANNER
  - PINK_WALL_BANNER
  - GRAY_WALL_BANNER
  - LIGHT_GRAY_WALL_BANNER
  - CYAN_WALL_BANNER
  - PURPLE_WALL_BANNER
  - BLUE_WALL_BANNER
  - BROWN_WALL_BANNER
  - GREEN_WALL_BANNER
  - RED_WALL_BANNER
  - BLACK_WALL_BANNER
  - FLOWER_POT
  - ARMOR_STAND
  - ITEM_FRAME
  - GLOW_ITEM_FRAME
  - PAINTING

default-block-price: 5

blocks-price:
  AIR: 1
  STONE: 1

permissions-blocks-per-second:
  player: 5
  vip: 10
  admin: 50

permissions-max-blocks:
  player: 500
  vip: 1000
  admin: 50000

permissions-max-distances:
  player: 20
  vip: 50
  admin: 100

permissions-sphere-radius:
  player: 4
  vip: 8
  admin: 100

permissions-sphere-height:
  player: 1
  vip: 2
  admin: 5

permissions-cylinder-height:
  player: 1
  vip: 2
  admin: 5

batch-size: 200

worldedit-boss-bar:
  color: RED
  style: PROGRESS

enable-color-visualisation: false
open-help-inventory: false

withdraw-reason: "Use of player worldedit"
refund-reason: "Refund from player worldedit"

blacklist-worlds:
  - world_the_end
  - world_nether
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the WorldEdit module |
| `default-block-price` | Double | `5` | The default economy cost per block for any material not listed in `blocks-price`. This is the base price before the wand's `price-multiplier` is applied |
| `batch-size` | Integer | `200` | Number of blocks processed per tick during an operation. Higher values complete operations faster but may cause more server lag |
| `enable-color-visualisation` | Boolean | `false` | When `true`, selection boundaries are highlighted with colored particles to help players visualize their selected region |
| `open-help-inventory` | Boolean | `false` | When `true`, running the base `/player-worldedit` command opens a zMenu help inventory instead of displaying help text in chat |
| `withdraw-reason` | String | `Use of player worldedit` | The transaction reason logged when money is deducted from a player for a WorldEdit operation |
| `refund-reason` | String | `Refund from player worldedit` | The transaction reason logged when money is refunded to a player (e.g., when an operation is cancelled) |

### Wand Items

The `items` section defines the WorldEdit wands that can be given to players. Each wand has its own usage limits and pricing.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `items.<wand>.name` | String | - | Internal identifier for the wand |
| `items.<wand>.display-name` | String | - | Display name shown in messages and inventories. Supports color codes |
| `items.<wand>.max-use` | Integer | - | Maximum number of operations the wand can perform. Set to `-1` for unlimited uses |
| `items.<wand>.price-multiplier` | Double | - | Multiplier applied to all block prices when using this wand. `0` makes all operations free, `1.2` adds a 20% surcharge |
| `items.<wand>.item.material` | String | - | The Minecraft material type for the wand item (e.g., `WOODEN_AXE`, `GOLDEN_AXE`) |
| `items.<wand>.item.name` | String | - | The display name of the wand item. Supports color codes |
| `items.<wand>.item.lore` | List of Strings | - | Lore lines displayed on the wand item. Supports the `%uses%` placeholder for remaining uses |

:::info Default Wand Definitions
- **player-wand** -- A `WOODEN_AXE` with 50 uses and a 1.2x price multiplier. Intended for regular players who pay for their edits.
- **admin-Wand** -- A `GOLDEN_AXE` with unlimited uses (`max-use: -1`) and a 0x price multiplier (free). Intended for staff members.
:::

### Block Blacklist

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `blacklist-blocks` | List of Strings | *(170+ entries)* | Materials that cannot be placed or modified by the WorldEdit module. Includes command blocks, spawners, containers, beds, banners, signs, and other special blocks |

:::warning
The blacklist contains over 170 block types by default. This prevents players from duplicating container contents, placing dangerous blocks (like command blocks or TNT), or manipulating blocks that store complex data (such as signs and banners). **Removing entries from this list may create exploits on your server.** Review additions carefully.
:::

### Block Pricing

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `default-block-price` | Double | `5` | The fallback price charged per block for any material not listed in `blocks-price` |
| `blocks-price` | Map | *(see below)* | Per-material price overrides. The key is the material name and the value is the price per block |

**Default block price overrides:**

| Material | Price |
|----------|-------|
| `AIR` | `1` |
| `STONE` | `1` |

:::tip
The final cost of a block operation is calculated as: `block_price x price_multiplier x block_count`. For example, placing 100 STONE blocks with the player-wand costs `1 x 1.2 x 100 = 120` economy units. Blocks not listed in `blocks-price` use the `default-block-price` of 5.
:::

### Permission-Based Limits

The WorldEdit module uses a **permission-based tier system** for controlling operation limits. Each tier is defined by a permission node in the format `essentials.worldedit.<tier>` (e.g., `essentials.worldedit.player`, `essentials.worldedit.vip`, `essentials.worldedit.admin`).

#### Blocks Per Second

| Tier | Value | Description |
|------|-------|-------------|
| `player` | `5` | Maximum blocks processed per second for default players |
| `vip` | `10` | Maximum blocks processed per second for VIP players |
| `admin` | `50` | Maximum blocks processed per second for administrators |

#### Maximum Blocks Per Operation

| Tier | Value | Description |
|------|-------|-------------|
| `player` | `500` | Maximum number of blocks in a single operation |
| `vip` | `1,000` | Maximum number of blocks in a single operation |
| `admin` | `50,000` | Maximum number of blocks in a single operation |

#### Maximum Selection Distance

| Tier | Value | Description |
|------|-------|-------------|
| `player` | `20` | Maximum distance (in blocks) between pos1 and pos2 |
| `vip` | `50` | Maximum distance (in blocks) between pos1 and pos2 |
| `admin` | `100` | Maximum distance (in blocks) between pos1 and pos2 |

#### Sphere Radius

| Tier | Value | Description |
|------|-------|-------------|
| `player` | `4` | Maximum radius for sphere operations |
| `vip` | `8` | Maximum radius for sphere operations |
| `admin` | `100` | Maximum radius for sphere operations |

#### Sphere Height

| Tier | Value | Description |
|------|-------|-------------|
| `player` | `1` | Maximum height for sphere operations |
| `vip` | `2` | Maximum height for sphere operations |
| `admin` | `5` | Maximum height for sphere operations |

#### Cylinder Height

| Tier | Value | Description |
|------|-------|-------------|
| `player` | `1` | Maximum height for cylinder operations |
| `vip` | `2` | Maximum height for cylinder operations |
| `admin` | `5` | Maximum height for cylinder operations |

:::info
Permission tier names (e.g., `player`, `vip`, `admin`) correspond to permission nodes. A player with the `essentials.worldedit.vip` permission will use the `vip` tier limits. You can add custom tiers by defining new entries in each permission section and assigning the corresponding permission to your players.
:::

### Boss Bar

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `worldedit-boss-bar.color` | String | `RED` | The color of the boss bar displayed during WorldEdit operations. Accepts Minecraft boss bar colors: `BLUE`, `GREEN`, `PINK`, `PURPLE`, `RED`, `WHITE`, `YELLOW` |
| `worldedit-boss-bar.style` | String | `PROGRESS` | The style of the boss bar. Accepts: `PROGRESS`, `NOTCHED_6`, `NOTCHED_10`, `NOTCHED_12`, `NOTCHED_20` |

### Blacklisted Worlds

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `blacklist-worlds` | List of Strings | `world_the_end`, `world_nether` | Worlds where the WorldEdit module is completely disabled. Players cannot use WorldEdit commands in these worlds |

:::warning
Ensure world names match your server's actual world folder names exactly. The comparison is case-sensitive.
:::

---

## How It Works

1. An administrator gives a WorldEdit wand to a player using `/player-worldedit give <player> <wand>`.
2. The player right-clicks a block to set **position 1** and left-clicks to set **position 2**, defining a cuboid selection.
3. The player runs an operation command (e.g., `/player-worldedit set <block>`) to manipulate blocks within the selection.
4. The plugin calculates the total cost based on block prices and the wand's `price-multiplier`, then withdraws the amount from the player's economy balance.
5. Blocks are processed in batches of `batch-size` per tick, with the boss bar showing progress.
6. If the player cancels an operation mid-way, any remaining unprocessed blocks are refunded at the calculated rate.
7. Each wand tracks its remaining uses. When a wand with limited `max-use` runs out, it can no longer be used for operations.

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/player-worldedit` | `pwe`, `ess-worldedit`, `eworldedit`, `ew` | `essentials.worldedit.use` | Base command for the WorldEdit module |

### Subcommands

| Subcommand | Description |
|------------|-------------|
| `give` | Give a WorldEdit wand to a player |
| `set` | Fill the selected region with a specified block |
| `walls` | Build walls around the selected region |
| `sphere` | Create a sphere at the target location |
| `fill` | Fill an area with a specified block |
| `cyl` | Create a cylinder at the target location |
| `cut` | Remove all blocks in the selected region (replace with air) |
| `stop` | Stop the current WorldEdit operation |
| `confirm` | Confirm a pending WorldEdit operation |
| `cancel` | Cancel a pending WorldEdit operation |
| `pos1` | Manually set position 1 to your current location |
| `pos2` | Manually set position 2 to your current location |
| `option` | Toggle personal WorldEdit options (inventory display, boss bar) |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Permissions

| Permission | Description |
|------------|-------------|
| `essentials.worldedit.use` | Allows using the `/player-worldedit` command and its subcommands |
| `essentials.worldedit.player` | Grants the `player` tier limits for WorldEdit operations |
| `essentials.worldedit.vip` | Grants the `vip` tier limits for WorldEdit operations |
| `essentials.worldedit.admin` | Grants the `admin` tier limits for WorldEdit operations |

:::tip
Assign only **one** tier permission per player. If a player has multiple tier permissions, the highest-priority match determines their limits. Define tiers from most restrictive to most permissive.
:::

---

## Related Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_worldedit_option_inventory%` | Returns the player's current inventory display preference for WorldEdit operations |
| `%zessentials_user_worldedit_option_bossbar%` | Returns the player's current boss bar display preference for WorldEdit operations |

For the full placeholder list, see [Placeholders](../placeholders).

---

## Economy Integration

The WorldEdit module is tightly integrated with the [Economy module](./economy). Every block operation has a monetary cost determined by:

1. **Base block price** -- Either the material-specific price from `blocks-price` or the `default-block-price` (5 by default).
2. **Wand multiplier** -- The `price-multiplier` of the wand being used. The player-wand applies a 1.2x multiplier, while the admin-Wand uses 0x (free).
3. **Block count** -- The total number of blocks affected by the operation.

**Formula:** `total_cost = base_block_price x price_multiplier x block_count`

:::note
If the player does not have enough balance to cover the operation cost, the operation is rejected and the player is notified. Partial operations are not charged -- the full cost must be available upfront.
:::

---

## Example: Tiered WorldEdit Access

### Survival Server Setup

Offer basic WorldEdit to regular players and enhanced access to VIPs:

```yaml
permissions-max-blocks:
  player: 200
  vip: 2000
  admin: 50000

permissions-max-distances:
  player: 15
  vip: 40
  admin: 100

default-block-price: 10

blocks-price:
  AIR: 2
  STONE: 3
  DIRT: 2
  GRASS_BLOCK: 4
```

This configuration limits regular players to small edits at a higher cost, encourages VIP purchases for larger operations, and gives admins virtually unrestricted access for free (with the admin-Wand).
