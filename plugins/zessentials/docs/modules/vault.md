---
sidebar_position: 19
title: Vault Module
description: Personal player storage vaults with permission-based slot limits
---

# Vault Module

**File:** `modules/vault/config.yml`

The Vault module provides a personal storage system that gives players access to virtual inventory vaults. Each player can own multiple vaults with configurable slot limits based on their permissions. Vaults persist across sessions and can be customized with names, icons, and regex-based name validation. This is the **player vault (storage)** module, not to be confused with the Vault economy hook.

---

## Source Configuration

```yaml
enable: true
max-vaults: 7
default-vault-name: "<#353535>Vault<dark_gray>-<white>%vault-id%"
icon-open: "MINECART"
icon-open-model-id: 0
icon-close: "CHEST_MINECART"
icon-close-model-id: 0
vault-name-regex: "^[a-zA-Z0-9_-]{3,16}$"
vault-permissions:
  - permission: zessentials.vault.size.player
    slots: 45
  - permission: zessentials.vault.size.vip
    slots: 90
  - permission: zessentials.vault.size.admin
    slots: 500
vault-slot-type: MAX  # MAX or ADDITION
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Vault module |
| `max-vaults` | Integer | `7` | The maximum number of vaults a player can create |
| `default-vault-name` | String | `<#353535>Vault<dark_gray>-<white>%vault-id%` | The default display name for newly created vaults. Supports MiniMessage formatting and the `%vault-id%` placeholder |
| `vault-name-regex` | String | `^[a-zA-Z0-9_-]{3,16}$` | A regex pattern that vault names must match. Used to validate custom vault names set by players |

### Vault Icons

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `icon-open` | String | `MINECART` | The material used as the icon for an open (currently viewed) vault in the vault selection menu |
| `icon-open-model-id` | Integer | `0` | The custom model data ID for the open vault icon. Set to `0` for the default model |
| `icon-close` | String | `CHEST_MINECART` | The material used as the icon for a closed (not currently viewed) vault in the vault selection menu |
| `icon-close-model-id` | Integer | `0` | The custom model data ID for the closed vault icon. Set to `0` for the default model |

:::tip
You can use custom model data to display unique textures for your vault icons when using a resource pack. Set the `model-id` fields to match your resource pack's custom model data values.
:::

### Vault Permissions (Slot Limits)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `vault-permissions` | List | *(see above)* | Permission-based slot limit definitions. Each entry grants a specific number of inventory slots based on the player's permission |
| `vault-permissions[].permission` | String | - | The permission node the player must have for this slot limit to apply |
| `vault-permissions[].slots` | Integer | - | The number of inventory slots granted by this permission. Must be a multiple of 9 for proper inventory rendering (up to 54 per page) |
| `vault-slot-type` | String | `MAX` | Determines how multiple permission slot values are combined. Accepts `MAX` or `ADDITION` |

:::info Slot Type Modes
- **`MAX`** -- The player's vault size is determined by the **highest** matching permission value. For example, if a player has both `zessentials.vault.size.player` (45 slots) and `zessentials.vault.size.vip` (90 slots), their vault size will be **90 slots**.
- **`ADDITION`** -- All matching permission slot values are **added together**. Using the same example, the player's vault size would be **135 slots** (45 + 90).
:::

:::warning
When using `ADDITION` mode, be careful about which permissions you assign to players. Granting multiple vault size permissions will stack, potentially giving players very large vaults. Ensure your permission groups are configured to avoid unintended combinations.
:::

:::note
Vault sizes larger than 54 slots (6 rows) will span multiple inventory pages. The plugin handles pagination automatically, so players can navigate between pages within a single vault.
:::

---

## How It Works

1. A player runs the `/vault` command to open the vault selection menu.
2. The menu displays all available vaults using the configured open/close icons. Players can select an existing vault or create a new one (up to `max-vaults`).
3. When a vault is opened, the player sees an inventory with a number of slots determined by their permissions and the `vault-slot-type` setting.
4. Items placed in the vault are saved persistently. They remain available across server restarts and re-logins.
5. When creating or renaming a vault, the name must match the `vault-name-regex` pattern.

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/vault` | `sac`, `bag`, `b`, `coffre`, `chest` | `essentials.vault.use` | Open the vault selection menu or a specific vault |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Permissions

| Permission | Description |
|------------|-------------|
| `essentials.vault.use` | Allows the player to use the `/vault` command and access their vaults |
| `zessentials.vault.size.player` | Grants 45 vault slots (default config) |
| `zessentials.vault.size.vip` | Grants 90 vault slots (default config) |
| `zessentials.vault.size.admin` | Grants 500 vault slots (default config) |

:::note
The vault size permissions and their slot values are fully configurable. The permissions listed above are from the default configuration. You can add, remove, or modify entries to fit your server's rank structure.
:::

---

## Example: Tiered Vault System

A server with three tiers of vault access and additive slot sizing:

```yaml
enable: true
max-vaults: 10
default-vault-name: "<gradient:#ff7e5f:#feb47b>Vault <white>#%vault-id%"
icon-open: "ENDER_CHEST"
icon-open-model-id: 0
icon-close: "CHEST"
icon-close-model-id: 0
vault-name-regex: "^[a-zA-Z0-9_ ]{3,24}$"
vault-permissions:
  - permission: zessentials.vault.size.default
    slots: 27
  - permission: zessentials.vault.size.premium
    slots: 27
  - permission: zessentials.vault.size.elite
    slots: 54
vault-slot-type: ADDITION
```

In this setup, a player with all three permissions would have a vault size of **108 slots** (27 + 27 + 54), spanning two inventory pages.
