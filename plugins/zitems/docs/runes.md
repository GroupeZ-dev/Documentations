---
sidebar_position: 5
title: Runes
description: Add powerful abilities to items with runes
---

# Runes

Runes are special abilities that can be applied to items in zItems. They provide unique effects and mechanics that enhance gameplay.

## Available Runes

### Absorption

Grants absorption hearts when equipped or used.

```yaml
runes:
  - absorption
```

**Effect:** Provides extra hearts that absorb damage.

---

### Farming Hoe

Enhanced farming capabilities for hoes.

```yaml
runes:
  - farming_hoe
```

**Effect:**
- Tills larger areas
- Replants crops automatically
- Harvests mature crops

---

### Hammer

3x3 mining pattern for tools.

```yaml
runes:
  - hammer
```

**Effect:** Mines a 3x3 area instead of a single block.

---

### Job Money Boost

Increases money earned from jobs (requires zJobs).

```yaml
runes:
  - job_money_boost
```

**Effect:** Multiplies money rewards from job actions.

---

### Job XP Boost

Increases XP earned from jobs (requires zJobs).

```yaml
runes:
  - job_xp_boost
```

**Effect:** Multiplies XP rewards from job actions.

---

### Melt Mining

Auto-smelts mined ores.

```yaml
runes:
  - melt_mining
```

**Effect:**
- Iron ore drops iron ingots
- Gold ore drops gold ingots
- Sand drops glass
- And more...

---

### Protection

Enhanced damage protection.

```yaml
runes:
  - protection
```

**Effect:** Reduces incoming damage beyond normal armor.

---

### Silk Spawner

Allows picking up spawners with silk touch.

```yaml
runes:
  - silk_spawner
```

**Effect:** Spawners can be collected when mined with this item.

---

### Tree Cutter

Cuts entire trees at once.

```yaml
runes:
  - tree_cutter
```

**Effect:** Breaking one log breaks the entire tree.

---

### Unbreakable

Prevents item durability loss.

```yaml
runes:
  - unbreakable
```

**Effect:** Item never takes durability damage.

---

### Vein Mining

Mines entire ore veins.

```yaml
runes:
  - vein_mining
```

**Effect:** Breaking one ore block breaks all connected ore blocks of the same type.

---

### XP Boost

Increases XP drops from mining and killing.

```yaml
runes:
  - xp_boost
```

**Effect:** Multiplies experience orb drops.

---

## Applying Runes

### In Item Configuration

Add runes when creating items:

```yaml
name: "&6&lMiner's Dream"
material: DIAMOND_PICKAXE

runes:
  - vein_mining
  - melt_mining
  - xp_boost
```

### Using Commands

Apply runes to existing items:

```
/zitems applyrune vein_mining
```

This applies the rune to the item in your main hand.

## Rune Stacking

Multiple runes can be applied to the same item:

```yaml
runes:
  - vein_mining
  - melt_mining
  - hammer
  - xp_boost
```

:::note
Some runes may not stack or may have limited compatibility. Check individual rune documentation for restrictions.
:::

## Custom Rune Configuration

Runes can be configured in `plugins/zItems/runes/`:

```yaml
# plugins/zItems/runes/vein_mining.yml
enabled: true
max-blocks: 64
tool-types:
  - PICKAXE
block-whitelist:
  - COAL_ORE
  - DEEPSLATE_COAL_ORE
  - IRON_ORE
  - DEEPSLATE_IRON_ORE
  - GOLD_ORE
  - DEEPSLATE_GOLD_ORE
  - DIAMOND_ORE
  - DEEPSLATE_DIAMOND_ORE
  - EMERALD_ORE
  - DEEPSLATE_EMERALD_ORE
```

## Permissions

Control who can use runes:

| Permission | Description |
|------------|-------------|
| `zitems.rune.*` | Access to all runes |
| `zitems.rune.vein_mining` | Use vein mining rune |
| `zitems.rune.hammer` | Use hammer rune |
| `zitems.rune.tree_cutter` | Use tree cutter rune |
| etc. | |

## Next Steps

- [Item Configuration](items)
- [Commands Reference](commands-permissions)
