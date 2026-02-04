---
sidebar_position: 4
title: Placeholders
description: Complete list of PlaceholderAPI placeholders for zEssentials
---

# Placeholders

zEssentials provides **76+ placeholders** through [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/). All placeholders use the prefix `%zessentials_` and can be used anywhere PlaceholderAPI is supported, including scoreboards, holograms, chat formatting, tab lists, and more.

## Requirements

- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) must be installed and enabled on your server.
- The zEssentials expansion is registered automatically when the plugin loads. You can verify it with `/papi list`.

:::tip
Placeholders containing `{curly_braces}` are dynamic parameters that you must replace with actual values. For example, `%zessentials_user_balance_{economy}%` becomes `%zessentials_user_balance_default%` if your economy is named `default`.
:::

---

## User Information

General information about the player.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_is_god%` | Returns true if the player is in god mode | Boolean |
| `%zessentials_user_is_afk%` | Returns true if the player is AFK | Boolean |
| `%zessentials_user_afk_status%` | Returns the configured placeholder text for AFK status | String |
| `%zessentials_user_has_discord_linked%` | Returns true if the player has linked their Discord account | Boolean |
| `%zessentials_user_world%` | The player's current world name | String |
| `%zessentials_user_x%` | Precise X coordinate of the player | Decimal |
| `%zessentials_user_y%` | Precise Y coordinate of the player | Decimal |
| `%zessentials_user_z%` | Precise Z coordinate of the player | Decimal |
| `%zessentials_user_block_x%` | Block-level X coordinate of the player | Integer |
| `%zessentials_user_block_y%` | Block-level Y coordinate of the player | Integer |
| `%zessentials_user_block_z%` | Block-level Z coordinate of the player | Integer |
| `%zessentials_user_biome%` | The biome the player is currently standing in | String |

---

## Target Player

Used in sanctions GUI and similar interfaces where a target player is selected.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_target_player_name%` | Name of the target player | String |
| `%zessentials_user_target_is_ban%` | Returns true if the target player is banned | Boolean |
| `%zessentials_user_target_is_mute%` | Returns true if the target player is muted | Boolean |
| `%zessentials_user_target_pay_amount%` | The formatted pay amount for the target | String |

---

## Economy

Requires the Economy module to be enabled. Replace `{economy}` with your economy name (e.g., `default`, `coins`, `tokens`).

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_formatted_balance_{economy}%` | Formatted balance for the specified economy (e.g., `$1,234.56`) | String |
| `%zessentials_user_balance_{economy}%` | Raw numeric balance for the specified economy | Decimal |
| `%zessentials_user_custom_balance_{economy}_{format}%` | Balance formatted with a custom number format | String |
| `%zessentials_user_position_{economy}%` | Player's rank position in the baltop leaderboard | Integer |

### Economy Baltop

Retrieve information about the economy leaderboard. Replace `{economy}` with your economy name and `{position}` with the rank number (starting from 1).

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_economy_baltop_name_{economy}_{position}%` | Player name at the given baltop position | String |
| `%zessentials_economy_baltop_uuid_{economy}_{position}%` | UUID of the player at the given baltop position | String |
| `%zessentials_economy_baltop_amount_{economy}_{position}%` | Raw balance amount at the given position | Decimal |
| `%zessentials_economy_baltop_formatted_amount_{economy}_{position}%` | Formatted balance amount at the given position | String |

**Example:** To display the top 3 players in the `default` economy:
```
%zessentials_economy_baltop_name_default_1% - %zessentials_economy_baltop_formatted_amount_default_1%
%zessentials_economy_baltop_name_default_2% - %zessentials_economy_baltop_formatted_amount_default_2%
%zessentials_economy_baltop_name_default_3% - %zessentials_economy_baltop_formatted_amount_default_3%
```

---

## User Options

Retrieve the value of a user option. Replace `{option_name}` with the option key such as `BAN`, `MUTE`, `GOD`, `VANISH`, or any other registered option.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_option_{option_name}%` | Returns the value of the specified user option | String |

**Example:** `%zessentials_user_option_VANISH%` returns whether the player is vanished.

---

## Cooldowns

Track active cooldowns on a player. Replace `{cooldown_key}` with the specific cooldown identifier.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_is_cooldown_{cooldown_key}%` | Returns true if the cooldown is currently active | Boolean |
| `%zessentials_user_cooldown_second_{cooldown_key}%` | Remaining cooldown time in seconds | Integer |
| `%zessentials_user_cooldown_formatted_{cooldown_key}%` | Remaining cooldown time in a human-readable format | String |

---

## Mute / Sanction

Information about a player's mute status.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_is_mute%` | Returns true if the player is currently muted | Boolean |
| `%zessentials_user_mute_seconds%` | Remaining mute duration in seconds | Integer |
| `%zessentials_user_mute_formatted%` | Remaining mute duration in a human-readable format | String |

---

## Mailbox

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_mailbox_items%` | Number of items currently in the player's mailbox | Integer |

---

## Fly

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_fly_seconds%` | Remaining timed fly duration in seconds | Integer |

---

## Repair

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_can_repair_all%` | Returns true if the player can repair all items in their inventory | Boolean |
| `%zessentials_count_repair_all%` | Number of items in the player's inventory that can be repaired | Integer |

---

## Playtime

Track how long a player has been on the server.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_playtime%` | Total playtime in seconds | Integer |
| `%zessentials_user_playtime_formatted%` | Total playtime formatted (e.g., `5d 12h 30m`) | String |
| `%zessentials_user_current_session_playtime%` | Current session playtime in seconds | Integer |
| `%zessentials_user_current_session_playtime_formatted%` | Current session playtime formatted | String |

---

## Homes

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_home_count%` | Number of homes the player currently has | Integer |
| `%zessentials_home_max%` | Maximum number of homes the player is allowed | Integer |
| `%zessentials_home_exist_{home_name}%` | Returns true if a home with the given name exists | Boolean |
| `%zessentials_home_delete%` | The name of the home being deleted (used in confirmation GUIs) | String |

**Example:** `%zessentials_home_exist_base%` returns `true` if the player has a home named `base`.

---

## Kits

Replace `{kit_name}` with the name of the kit.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_has_kit_{kit_name}%` | Returns true if the player has permission to use the kit | Boolean |
| `%zessentials_user_kit_is_available_{kit_name}%` | Returns true if the kit is available (no active cooldown) | Boolean |
| `%zessentials_user_kit_time_until_available_{kit_name}%` | Time remaining until the kit becomes available | String |

**Example:** `%zessentials_user_kit_is_available_starter%` returns `true` if the `starter` kit has no active cooldown.

---

## Items in Hand

Information about the item the player is currently holding in their main hand.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_iteminhand_type%` | Material type name (e.g., `DIAMOND_SWORD`) | String |
| `%zessentials_iteminhand_realname%` | Formatted material name (e.g., `Diamond Sword`) | String |
| `%zessentials_iteminhand_displayname%` | Custom display name, or material name if none set | String |
| `%zessentials_iteminhand_custommodeldata%` | Custom model data value (`0` if none) | Integer |
| `%zessentials_iteminhand_maxdurability%` | Maximum durability of the item | Integer |
| `%zessentials_iteminhand_durability%` | Current damage value of the item | Integer |
| `%zessentials_iteminhand_amount%` | Number of items in the stack | Integer |
| `%zessentials_iteminhand_lore%` | Item lore text | String |
| `%zessentials_iteminhand_enchantments%` | All enchantments with their levels | String |
| `%zessentials_iteminhand_hasenchantment_{enchantment}%` | Returns true if the item has the specified enchantment | Boolean |
| `%zessentials_iteminhand_enchantmentlevel_{enchantment}%` | Level of the specified enchantment | Integer |
| `%zessentials_iteminhand_itemflags%` | All item flags applied to the item | String |
| `%zessentials_iteminhand_hasitemflag_{flag}%` | Returns true if the item has the specified flag | Boolean |

**Example:** `%zessentials_iteminhand_hasenchantment_sharpness%` returns `true` if the held item has the Sharpness enchantment.

### Items in Hand (Minecraft 1.21+)

These placeholders are only available on Minecraft 1.21 and newer.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_iteminhand_rarity%` | Item rarity (`COMMON`, `UNCOMMON`, `RARE`, `EPIC`) | String |
| `%zessentials_iteminhand_repaircost%` | Anvil repair cost of the item | Integer |
| `%zessentials_iteminhand_maxstacksize%` | Maximum stack size for the item | Integer |
| `%zessentials_iteminhand_hide_tooltip%` | Returns true if the item tooltip is hidden | Boolean |
| `%zessentials_iteminhand_glint%` | Returns true if the item has an enchantment glint | Boolean |
| `%zessentials_iteminhand_fire_resistant%` | Returns true if the item is fire resistant | Boolean |
| `%zessentials_iteminhand_unbreakable%` | Returns true if the item is unbreakable | Boolean |
| `%zessentials_iteminhand_hide_unbreakable%` | Returns true if the unbreakable property is hidden | Boolean |

---

## Armor

Retrieve the name of the item in a specific armor slot. Replace `{slot}` with one of: `HEAD`, `CHEST`, `LEGS`, `FEET`, `HAND`, or `OFF_HAND`.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_armor_name_{slot}%` | Item name in the specified armor slot | String |

**Example:** `%zessentials_armor_name_HEAD%` returns the name of the helmet the player is wearing.

---

## Vote

Requires the Vote module to be enabled.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_voteparty_amount%` | Current vote party progress count | Integer |
| `%zessentials_voteparty_objective%` | Vote party target goal | Integer |
| `%zessentials_vote_amount%` | Player's total vote count | Integer |
| `%zessentials_vote_site_cooldown_{site}%` | Remaining cooldown before the player can vote again on the specified site | String |

**Example:** `%zessentials_vote_site_cooldown_myserver%` shows the time until the player can vote again on the `myserver` vote site.

---

## WorldEdit

Requires the WorldEdit module to be enabled.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_user_worldedit_option_inventory%` | Returns true if WorldEdit inventory mode is enabled | Boolean |
| `%zessentials_user_worldedit_option_bossbar%` | Returns true if the WorldEdit bossbar is enabled | Boolean |

---

## Nearest Player

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_nearest_player_name%` | Name of the nearest online player | String |
| `%zessentials_nearest_player_distance%` | Distance to the nearest player (in blocks) | Decimal |
| `%zessentials_nearest_player_direction%` | Directional arrow pointing toward the nearest player | String |

---

## Server

General server-related placeholders.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_server_name%` | Configured server name | String |
| `%zessentials_random_player%` | Name of a random online player | String |
| `%zessentials_last_random_player%` | The last randomly selected player name | String |
| `%zessentials_last_first_join_player%` | Name of the most recent player who joined for the first time | String |
| `%zessentials_random_number_{from}_{to}%` | A random number within the specified range (inclusive) | Integer |
| `%zessentials_last_random_number_{player}%` | The last random number generated for the specified player | Integer |
| `%zessentials_custom_formatted_number_{number}_{format}%` | A number formatted with the specified pattern | String |
| `%zessentials_server_uptime_in_second%` | Server uptime in seconds | Integer |
| `%zessentials_server_uptime%` | Server uptime in a human-readable format | String |

**Example:** `%zessentials_random_number_1_100%` returns a random number between 1 and 100.

---

## Replace & Formatting

Utility placeholders for text manipulation and visual formatting.

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_replace_{placeholder}%` | Replaces a placeholder with a value defined in the configuration | String |
| `%zessentials_center_{text1}_{text2}_{length}%` | Centers two texts within the given character length | String |
| `%zessentials_progressbar_{current}_{max}_{size}_{symbol}_{completed_color}_{not_completed_color}%` | Generates a visual progress bar | String |

### Progress Bar Parameters

The progress bar placeholder accepts the following parameters:

| Parameter | Description |
|-----------|-------------|
| `{current}` | The current progress value |
| `{max}` | The maximum value |
| `{size}` | Total number of symbols in the bar |
| `{symbol}` | The character used for the bar (e.g., `\|`) |
| `{completed_color}` | Color code for the completed portion (e.g., `&a`) |
| `{not_completed_color}` | Color code for the remaining portion (e.g., `&7`) |

**Example:** `%zessentials_progressbar_50_100_20_|_&a_&7%` generates a 20-character progress bar that is 50% filled with green (`&a`) and 50% gray (`&7`).

---

## Random Word

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_random_word%` | Returns a random word from the configured word list | String |

---

## Usage Examples

### Scoreboard

Display player information on a dynamic scoreboard:

```yaml
lines:
  - "&6&lPlayer Info"
  - "&fBalance: &e%zessentials_user_formatted_balance_default%"
  - "&fHomes: &e%zessentials_home_count%&7/&e%zessentials_home_max%"
  - "&fPlaytime: &e%zessentials_user_playtime_formatted%"
  - ""
  - "&6&lServer"
  - "&fUptime: &e%zessentials_server_uptime%"
  - "&fVote Party: &e%zessentials_voteparty_amount%&7/&e%zessentials_voteparty_objective%"
```

### Holograms

Use placeholders in holograms to show baltop leaderboards:

```yaml
lines:
  - "&6&l--- Baltop ---"
  - "&e1. &f%zessentials_economy_baltop_name_default_1% &7- &a%zessentials_economy_baltop_formatted_amount_default_1%"
  - "&e2. &f%zessentials_economy_baltop_name_default_2% &7- &a%zessentials_economy_baltop_formatted_amount_default_2%"
  - "&e3. &f%zessentials_economy_baltop_name_default_3% &7- &a%zessentials_economy_baltop_formatted_amount_default_3%"
  - "&e4. &f%zessentials_economy_baltop_name_default_4% &7- &a%zessentials_economy_baltop_formatted_amount_default_4%"
  - "&e5. &f%zessentials_economy_baltop_name_default_5% &7- &a%zessentials_economy_baltop_formatted_amount_default_5%"
  - "&6&l--------------"
```

### Chat Format

Include AFK status and other information in chat messages:

```yaml
format: "%zessentials_user_afk_status% &7%player_name% &8>> &f%message%"
```

### Tab List

Show coordinates and biome in the player's tab list:

```yaml
header:
  - "&6&lMy Server"
  - "&fWorld: &e%zessentials_user_world% &7| &fBiome: &e%zessentials_user_biome%"
footer:
  - "&fPosition: &e%zessentials_user_block_x% %zessentials_user_block_y% %zessentials_user_block_z%"
  - "&fNearest Player: &e%zessentials_nearest_player_name% &7(%zessentials_nearest_player_distance% blocks %zessentials_nearest_player_direction%)"
```

### Progress Bar in Scoreboard

Display a vote party progress bar:

```yaml
lines:
  - "&6Vote Party"
  - "%zessentials_progressbar_%zessentials_voteparty_amount%_%zessentials_voteparty_objective%_20_|_&a_&7%"
  - "&e%zessentials_voteparty_amount%&7/&e%zessentials_voteparty_objective% &fvotes"
```

---

## Troubleshooting

### Placeholders display as raw text

- Verify that **PlaceholderAPI** is installed and loaded: `/papi list`
- Make sure the plugin or system you are using supports PlaceholderAPI (not all plugins parse PAPI placeholders).
- Reload PlaceholderAPI: `/papi reload`

### Placeholders return empty or incorrect values

- Ensure the corresponding **module** is enabled (e.g., Economy module for balance placeholders, Vote module for vote placeholders).
- Double-check the placeholder syntax, especially dynamic parameters like economy names, kit names, and slot names.
- For economy placeholders, confirm the economy name matches what is configured in `modules/economy.yml`.

### Placeholders not updating

- Some placeholders update on a refresh interval. If using scoreboards or holograms, ensure the update interval is configured properly.
- For baltop placeholders, the leaderboard may be cached and update periodically rather than in real time.
