---
title: Presets & Tags
description: How zVeinMiner presets, tags, vein sizes, previews, durability and cooldown work
---

# Presets & Tags

zVeinMiner never turns vein mining on for every tool. A tool only vein mines once it **carries vein mining data**: a **size** (how many blocks one vein can contain) and a list of **tags** (which blocks can be vein mined). This data is stored on the item itself (in its PersistentDataContainer), so it stays on the item when it is traded, stored in a chest or renamed.

The easiest way to give this data to an item is a **preset**, defined in `config.yml`.

---

## Defining presets

Presets are declared in the `presets` list of `config.yml`. Each entry needs three keys:

| Key | Type | Description |
|-----|------|-------------|
| `name` | String | Unique name of the preset, used by the commands (case sensitive) |
| `size` | Integer (greater than 0) | Maximum number of blocks in one vein, **including the block you break** |
| `tags` | List | Tags and/or block materials the preset can vein mine |

The default configuration ships one preset:

```yaml
presets:
  - name: "pickaxe-1"
    size: 8
    tags:
      - COAL_ORES
      - COPPER_ORES
      - DIAMOND_ORES
      - EMERALD_ORES
      - GOLD_ORES
      - IRON_ORES
      - LAPIS_ORES
      - REDSTONE_ORES
      - ANCIENT_DEBRIS
```

Presets are loaded in the order of `config.yml` and reloaded with `/zveinminer reload`. A broken entry does not stop the loading: it is skipped with a warning in the console.

| Situation | Result |
|-----------|--------|
| `name` missing or empty | Preset ignored |
| `size` missing, not a number or `<= 0` | Preset ignored |
| `tags` missing or not a list | Preset ignored |
| A tag is neither a known tag nor a block material | That tag is skipped (warning), the preset is kept, even if no valid tag is left |
| Two presets with the same `name` | The last definition is used |
| `size` greater than `max-size-limit` | Preset kept, the vein is limited to `max-size-limit` |

<CalloutContainer type="tip">

<CalloutTitle>Listing presets</CalloutTitle>

<CalloutDescription>
Use `/zveinminer list` in game to see the presets that were really loaded. See [Commands & Permissions](./commands-permissions) for every command.
</CalloutDescription>

</CalloutContainer>

---

## Tags

Each entry of `tags` (in a preset or added with `/zveinminer add`) is one of:

| Kind | Example | Matches |
|------|---------|---------|
| **Bukkit tag** | `COAL_ORES`, `LOGS`, `LEAVES` | Every block in that Minecraft tag (`COAL_ORES` = coal ore and deepslate coal ore) |
| **Block material** | `DIAMOND_ORE`, `GRAVEL`, `ANCIENT_DEBRIS` | Exactly that block |

Rules applied when a tag is read:

- Names are **not case sensitive** (`coal_ores` and `COAL_ORES` are the same) and surrounding spaces are ignored.
- Tags are the names of the constants of Bukkit's `Tag` class (for example `COAL_ORES`, `IRON_ORES`, `LOGS`, `CRIMSON_STEMS`), **not** namespaced keys like `minecraft:coal_ores`. A tag name is checked first, then a material name.
- Only **block** materials are accepted. Items that cannot be placed in the world are rejected.
- `NETHERITE_SCRAP` (used by older default configurations) is automatically converted to `ANCIENT_DEBRIS`.

<CalloutContainer type="info">

<CalloutTitle>Tab completion</CalloutTitle>

<CalloutDescription>
`/zveinminer add <tag>` suggests every available tag name and every block material, so you can browse them in game.
</CalloutDescription>

</CalloutContainer>

### How the vein follows a tag

When you break a block, zVeinMiner looks at the tags of your tool **in their order** and keeps the **first one that matches** the broken block. The `match-by-tag` option (section `vein-mining` of `config.yml`) then decides which neighbouring blocks belong to the vein:

| `match-by-tag` | Blocks connected to the vein |
|----------------|------------------------------|
| `true` (shipped value) | Every block matched by **the tag that matched the broken block**. With `IRON_ORES`, iron ore and deepslate iron ore are mined together. |
| `false` | Only blocks of the **exact same type** as the broken block. Stone and deepslate variants are mined separately. |

```yaml
vein-mining:
  match-by-tag: true
```

<CalloutContainer type="warning">

<CalloutTitle>Broad tags</CalloutTitle>

<CalloutDescription>
With `match-by-tag: true`, a broad tag connects everything it contains: `LOGS` links an oak tree to a birch tree that touches it. If you want one species at a time, use material names (`OAK_LOG`, `BIRCH_LOG`...) or set `match-by-tag` to `false`. If the key is missing from an old `config.yml`, `false` is used.
</CalloutDescription>

</CalloutContainer>

When a material name matches (for example `DIAMOND_ORE`), only that exact block is connected, whatever the value of `match-by-tag`.

---

## Giving vein mining data to an item

Five commands write vein mining data on the item held in the main hand (or on a new item for `give`). They do not work on an empty hand.

| Command | What is stored on the item | Follows later `config.yml` changes? |
|---------|----------------------------|--------------------------------------|
| `/zveinminer apply <preset>` | Only the **preset name** | Yes: size and tags are read from the preset every time |
| `/zveinminer set <preset>` | A **copy** of the preset size and tags | No: the item keeps the values it received |
| `/zveinminer give <player> <preset> [material]` | A new item with a **copy** of the preset size and tags (same as `set`) | No |
| `/zveinminer add <tag>` / `remove <tag>` | The **full tag list** of the item | No for the tags |
| `/zveinminer size [size]` | The **size** of the item | No for the size |

### apply: linked to the preset

```
/zveinminer apply pickaxe-1
```

The item only remembers the name `pickaxe-1`. Change the size or the tags of `pickaxe-1` in `config.yml`, run `/zveinminer reload`, and every item that received `apply pickaxe-1` uses the new values. If the preset is removed from the configuration, these items stop vein mining (unless they have their own size and tags).

### set and give: a frozen copy

```
/zveinminer set pickaxe-1
/zveinminer give Maxlego08 pickaxe-1 NETHERITE_PICKAXE
```

The size and tags of the preset are copied onto the item. Editing the preset later does not change these items. `give` creates a new item of the given material (default `DIAMOND_PICKAXE`), copies the preset onto it and gives it to an online player whose name must be **exact**. If the inventory is full, the item is dropped at the player's feet.

### add, remove and size: fine tuning one item

```
/zveinminer add GRAVEL
/zveinminer remove DIAMOND_ORES
/zveinminer size 16
/zveinminer size
```

- `add` and `remove` start from the **current** tags of the item (including the tags inherited from an applied preset) and write the resulting list on the item. From then on, the item keeps its own tag list instead of the preset one. Removing the last tag leaves the item with **no tag**: it does not fall back to the preset tags.
- `size <size>` stores a size on the item. It must be a whole number `0` or more and, when `max-size-limit` is greater than `0`, cannot be greater than `max-size-limit`. `size 0` removes the size stored on the item, so it uses the size of its applied preset again.
- `size` without argument displays the current size of the held item.

### Which value wins

The item values always win over the preset values:

| Value | Read from |
|-------|-----------|
| Size | The size stored on the item, otherwise the size of the applied preset, otherwise `0` |
| Tags | The tag list stored on the item, otherwise the tags of the applied preset, otherwise none |

Use `/zveinminer info` to display the size and tags resolved for the held item (the size shown is the stored or preset value, before the `max-size-limit` cap).

---

## Vein size and max-size-limit

The `size` is the total number of blocks of a vein, **the broken block included**: a size of `8` breaks the block you mine plus up to 7 more.

```yaml
vein-mining:
  # Maximum vein size limit (overrides preset if lower)
  max-size-limit: 64
```

- `max-size-limit` caps every vein, whatever the size of the preset or of the item. With `max-size-limit: 64`, an item with a size of `200` mines at most 64 blocks.
- `max-size-limit: 0` (or lower) disables the cap.
- A size of `1` or less never triggers vein mining: the block is broken normally.

---

## Vein detection

When a block is broken with a valid tool, the vein is searched with a breadth-first search (BFS) starting from that block:

1. The 26 surrounding blocks (faces, edges **and corners**) of each block are checked, so diagonal ores are part of the vein.
2. A block joins the vein if it matches the tag (see [How the vein follows a tag](#how-the-vein-follows-a-tag)) **and** the held tool is the right tool to harvest it.
3. The search stops when the vein reaches its size, and the closest blocks are found first.

The search never goes outside the world height, outside the world border, or into an unloaded chunk.

Vein mining is only triggered if all these conditions are met:

| Condition | Details |
|-----------|---------|
| Permission | The player has `zveinminer.use` |
| Toggle | The player did not disable vein mining with `/zveinminer toggle` |
| Game mode | Not Adventure nor Spectator |
| World | The world is allowed by the `worlds` section ([Configuration](./configuration)) |
| Sneak | The player sneaks, only if `require-sneak: true` |
| Item data | The held item has a size greater than 1 and a tag matching the broken block |
| Tool | The held tool can harvest the broken block (no vein mining of diamond ore with a wooden pickaxe) |

Each extra block is broken as if the player broke it: a `BlockBreakEvent` is fired for every block, the drops, Fortune, Silk Touch and experience of the tool apply, and protection plugins can refuse any of them (see [Integrations](./integrations)).

---

## Preview while sneaking

When the player **starts sneaking** while looking at a block (up to 5 blocks away) that their tool could vein mine, the outline of the vein is shown with glowing invisible shulkers. Only the outer blocks of the vein are highlighted, and only blocks the player is allowed to break are shown.

```yaml
vein-mining:
  # Show the outline of the vein while sneaking
  preview: true
```

- The preview uses the same checks as vein mining (permission, toggle, world, item data, tool), so it shows exactly what would be mined. It works whether or not `require-sneak` is enabled.
- It is computed when the player starts sneaking. To preview another vein, stop sneaking and sneak again while looking at it.
- Only the player who sneaks can see their preview.
- It disappears when the player stops sneaking, breaks a block, changes held item, swaps hands, teleports, changes world, dies or quits, and when a previewed block is destroyed or moved (another player, explosion, piston).
- Preview shulkers are never saved with the world. Shulkers left by a crash or by an older version are removed on startup and when their chunk loads.

Set `preview: false` to disable it.

---

## Durability

The `tools` section of `config.yml` controls how the tool is damaged:

```yaml
tools:
  # Check tool durability before mining (prevents breaking more blocks than durability allows)
  check-durability: true
  # Apply durability damage to the tool
  apply-damage: true
```

| Option | Effect |
|--------|--------|
| `apply-damage: true` | Each extra block damages the tool like vanilla mining, Unbreaking included |
| `apply-damage: false` | Extra blocks of the vein do not damage the tool |
| `check-durability: true` | Durability is checked **block by block**: the vein stops before the tool would break, so a vein mine **never breaks the tool** (only checked when `apply-damage` is `true`) |
| `check-durability: false` | No check: the vein continues until the tool breaks, then stops |

Durability checks are skipped in Creative mode and for unbreakable items. Custom tools with a modified maximum durability or a higher damage per block are taken into account.

<CalloutContainer type="info">

<CalloutTitle>Wrong tool, no vein</CalloutTitle>

<CalloutDescription>
Blocks that the held tool cannot harvest are never part of the vein, even if they match a tag. With a stone pickaxe and the `DIAMOND_ORES` tag, nothing is vein mined because diamond ore needs an iron pickaxe. Blocks that drop with any tool (logs, gravel, clay...) accept any held item that carries the vein mining data.
</CalloutDescription>

</CalloutContainer>

---

## Cooldown

```yaml
vein-mining:
  # Cooldown between vein mines in ticks (0 = disabled)
  cooldown: 0
```

- The cooldown is in **ticks** (20 ticks = 1 second). `0` disables it.
- It starts after a vein mine that broke at least one extra block.
- During the cooldown, the broken block is mined normally (without vein) and the `cooldown` message is shown in the action bar with the remaining seconds.
- Players with `zveinminer.bypass.cooldown` ignore the cooldown.

---

## Examples

All the examples below go in the `presets` list of `config.yml`. Give them with `/zveinminer apply <name>`, `/zveinminer set <name>` or `/zveinminer give <player> <name> [material]`.

### Pickaxe for ores

```yaml
presets:
  - name: "pickaxe-ores"
    size: 16
    tags:
      - COAL_ORES
      - COPPER_ORES
      - IRON_ORES
      - GOLD_ORES
      - REDSTONE_ORES
      - LAPIS_ORES
      - DIAMOND_ORES
      - EMERALD_ORES
      - NETHER_QUARTZ_ORE
      - ANCIENT_DEBRIS
```

With `match-by-tag: true`, stone and deepslate variants of each ore are mined together. The tool must still be able to harvest each ore: an iron pickaxe is needed for diamond ores.

```
/zveinminer give Maxlego08 pickaxe-ores DIAMOND_PICKAXE
```

### Axe for trees

```yaml
presets:
  - name: "axe-trees"
    size: 32
    tags:
      - LOGS
```

`LOGS` contains every log, wood, stem and hyphae. With `match-by-tag: true`, logs of different species that touch each other are mined together.

To fell one species at a time, list materials instead:

```yaml
presets:
  - name: "axe-oak"
    size: 32
    tags:
      - OAK_LOG
      - DARK_OAK_LOG
```

```
/zveinminer give Maxlego08 axe-trees DIAMOND_AXE
```

### Shovel for gravel and clay

```yaml
presets:
  - name: "shovel-1"
    size: 12
    tags:
      - GRAVEL
      - CLAY
```

### Upgrading a single item

Start from a preset, then tune one item in hand:

```
/zveinminer apply pickaxe-1
/zveinminer add NETHER_QUARTZ_ORE
/zveinminer size 24
/zveinminer info
```

After these commands the item keeps its own tag list (the `pickaxe-1` tags plus `NETHER_QUARTZ_ORE`) and its own size of 24. `size 24` is refused if `max-size-limit` is enabled and lower than 24.

<CalloutContainer type="tip">

<CalloutTitle>Going further</CalloutTitle>

<CalloutDescription>
The other options of `config.yml` (worlds, drops, economy) are described in [Configuration](./configuration). Developers can read and write the same item data through the [API](./api).
</CalloutDescription>

</CalloutContainer>
