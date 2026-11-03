---
title: Integrations
description: How zVeinMiner works with WorldGuard, GriefPrevention, Vault, NoCheatPlus and PlaceholderAPI
---

# Integrations

zVeinMiner works alone. Every integration is a **soft dependency**: if the other plugin is missing, zVeinMiner still starts and the feature that uses it is skipped.

| Plugin | What zVeinMiner does with it | Configuration needed |
|--------|------------------------------|----------------------|
| **WorldGuard** (+ WorldEdit) | Checks region protection for every block of the vein | None |
| **GriefPrevention** | Checks claim permissions for every block of the vein | None |
| **Vault** (+ an economy plugin) | Charges players for vein mining | `economy` section in `config.yml` |
| **NoCheatPlus** | Turns off the block break checks while a vein is mined | None |
| **PlaceholderAPI** | Fills in placeholders in the messages sent to players | None |

When a hook connects, the console shows a line such as `Hooked into WorldGuard`, `Hooked into Vault economy: <name>` or `Hooked into NoCheatPlus`.

## Protection plugins

### How protection works

Each extra block of a vein is broken with Paper's `Player#breakBlock`. This fires a normal `BlockBreakEvent` for every block, so **any** protection, logging or reward plugin sees each block as if the player broke it by hand. That includes plugins zVeinMiner has no hook for.

The WorldGuard and GriefPrevention hooks add a check **before** mining starts:

1. zVeinMiner finds the vein.
2. It removes every block that the player is not allowed to break, according to the protection hooks and vanilla spawn protection.
3. Only the remaining blocks are mined. They are also the only ones that count toward the [economy](#vault-economy) cost.

The same filter is used for the vein preview, the outline shown while sneaking (when `vein-mining.preview` is `true`). The preview only shows the blocks the player can actually break.

<CalloutContainer type="info">

<CalloutTitle>Protection plugins without a hook</CalloutTitle>

<CalloutDescription>

A protection plugin with no dedicated hook still blocks vein mining in its areas through the `BlockBreakEvent` fired for each block. If 3 blocks in a row are refused, zVeinMiner stops the vein mine. This keeps the player from getting one denial message per block. The only drawback is that the preview may show blocks that cannot be broken.

</CalloutDescription>

</CalloutContainer>

Spawn protection is always checked, even without any protection plugin. It follows the vanilla rule: it applies only in the main world, only when `spawn-protection` is greater than 0, only when at least one operator exists, and never to operators.

### WorldGuard

Requires WorldGuard and WorldEdit, which WorldGuard depends on.

For each block, zVeinMiner runs WorldGuard's build test with the `block-break` flag. This is the same test WorldGuard uses when a player breaks a block:

- region members and owners can mine, and region defaults apply;
- a `block-break` flag set to `allow` or `deny` overrides the default;
- a region **without** a `block-break` flag follows the normal build rules. It is not denied automatically;
- players with WorldGuard's bypass in that world (for example `worldguard.region.bypass.<world>`) skip the check.

No flag or option needs to be configured in zVeinMiner.

### GriefPrevention

For each block, zVeinMiner looks for the GriefPrevention claim at that location:

- no claim: the block can be mined;
- a claim: the block can be mined only if GriefPrevention allows that player to break that block type there, the same check as a normal break.

### Detection and reload

zVeinMiner looks for protection hooks when it starts and again on every `/zveinminer reload`. A hook is used only if its plugin is enabled.

| Situation | Result |
|-----------|--------|
| Plugin not installed | Nothing is logged, the check is skipped |
| Plugin installed and hook works | `Hooked into <plugin>` |
| Plugin installed but its API is not ready | Warning: `<plugin> is installed but its hook is not available, vein mining will not check its protections.` |
| Plugin version not compatible | Warning: `Failed to hook into <plugin>: <error>`, the check is skipped |

Even when a hook is skipped, the `BlockBreakEvent` fired for each block still lets that plugin cancel the blocks.

## Vault (economy)

Vault lets you charge players for vein mining. Turn it on in `config.yml`:

```yaml
# Economy settings (requires Vault)
economy:
  enabled: false
  # Cost per block mined (0 = disabled)
  cost-per-block: 0.0
  # Cost per vein mine action (0 = disabled)
  cost-per-vein: 0.0
```

You need **Vault and an economy plugin** that registers a Vault provider. zVeinMiner looks up the provider the first time it needs it, not at startup, so an economy plugin that registers late is still found.

**How the cost works:**

```
cost = cost-per-vein + cost-per-block x number of extra blocks broken
```

The block the player broke by hand is not counted. Only the extra blocks mined by zVeinMiner are.

1. Before mining, zVeinMiner works out the highest possible cost, based on every block that passed the protection checks. If the player cannot pay that much, no extra block is mined (the block broken by hand still breaks normally) and the player gets the `economy-not-enough` message.
2. After mining, the player pays only for the blocks that were **actually** broken. For example, if the tool runs out of durability halfway through, the blocks that were not broken are not charged.
3. When the amount is greater than 0, the player gets the `economy-charged` message.

| Message key (`messages.yml`) | Default | Variable |
|------------------------------|---------|----------|
| `economy-not-enough` | `&cYou don't have enough money. Required: &f%amount%` | `%amount%`, formatted by the economy plugin |
| `economy-charged` | `&aYou have been charged &f%amount%&a.` | `%amount%`, formatted by the economy plugin |

<CalloutContainer type="warning">

<CalloutTitle>No economy provider</CalloutTitle>

<CalloutDescription>

If `economy.enabled` is `true` but Vault or the economy provider is missing, vein mining is **free**. The console shows this warning once: `Economy is enabled in config.yml but no Vault economy provider was found: vein mining will be free.` When `economy.enabled` is `false`, Vault is never used.

</CalloutDescription>

</CalloutContainer>

## NoCheatPlus

All the blocks of a vein are broken in the same tick. Without this hook, NoCheatPlus's block break checks (fast break and similar) would cancel them.

When NoCheatPlus is enabled, zVeinMiner exempts the player from the `BLOCKBREAK` checks only while a vein is being mined, then removes the exemption. If another plugin had already exempted the player, zVeinMiner leaves that exemption alone. The normal block break is never exempted, only the extra blocks of the vein.

The hook needs no configuration. It is loaded by reflection when zVeinMiner starts. If NoCheatPlus is not installed, nothing is logged and nothing is exempted. If NoCheatPlus is installed but its API has changed, nothing is exempted and the console shows `Failed to hook into NoCheatPlus: <error>`. Unlike the protection hooks, the NoCheatPlus hook is not looked up again on `/zveinminer reload`.

## PlaceholderAPI

zVeinMiner **does not register its own PlaceholderAPI expansion**, so it has no `%zveinminer_...%` placeholders.

When PlaceholderAPI is installed, every message zVeinMiner sends to a player, in chat or in the action bar, goes through PlaceholderAPI first. You can use any placeholder from other expansions in `messages.yml`:

```yaml
economy-charged: "&aYou have been charged &f%amount%&a. Balance: &f%vault_eco_balance_formatted%"
```

Messages sent to the console are not parsed. Without PlaceholderAPI, messages are sent as written, and placeholders stay as plain text.

<CalloutContainer type="tip">

<CalloutTitle>For developers</CalloutTitle>

<CalloutDescription>

To add your own checks, rewards or statistics around vein mining, use the events and the `VeinManager` service described in the [API](./api) page.

</CalloutDescription>

</CalloutContainer>

## See also

- [Configuration](./configuration): every `config.yml` option, including `economy`
- [Commands and permissions](./commands-permissions): `/zveinminer reload` and the `zveinminer.*` permissions
- [Installation](./installation): requirements and plugin setup
