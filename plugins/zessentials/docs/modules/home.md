---
title: Home Module
description: Player home system with permission-based limits
---

# Home Module

**File:** `modules/home/config.yml`

The Home module allows players to set, teleport to, and manage personal home locations. The maximum number of homes is controlled through permission-based limits, and the module supports multiple display modes for the home list, configurable name validation, world restrictions, and confirmation prompts for overwriting or deleting homes.

Homes can also be made **public**, **shared** with specific players, organised in **categories**, marked as **favorites**, previewed before teleporting, and **imported** from EssentialsX.

---

## Configuration

```yaml
enable: true

# Allow players to have multiple homes.
# You must set the permission the player must have and the home number for that permission.
permissions:
  - permission: "essentials.home.default"
    amount: 3
  - permission: "essentials.home.vip"
    amount: 5
  - permission: "essentials.home.staff"
    amount: 10

# Display mode for /home
# Options: IN_LINE, INVENTORY, INVENTORY_DONUT, MULTI_LINE
home-display: MULTI_LINE

# Regex pattern for validating home names
home-regex: "[a-zA-Z0-9]+"

# Maximum length for home names
home-name-max: 16

# Minimum length for home names
home-name-min: 1

# Worlds where players cannot set homes
disable-worlds:
  - "world_event"

# The player must confirm with /sethomeconfirm when overwriting an existing home
home-overwrite-confirm: true

# The player must confirm when deleting a home
home-delete-confirm: true

# How permission amounts are evaluated: MAX or STACK
home-usage-type: MAX

# Default material for the home buttons (zMenu material loaders are supported)
default-home-material: BLUE_BED

# Public homes (/homepublic, /publichomes)
enable-public-homes: true

# Maximum number of public homes per player (-1 for unlimited)
max-public-homes: 3

# How /publichomes displays the list: CHAT or INVENTORY
public-homes-display: CHAT

# Shared homes (/homeshare, /homeunshare, /homeshares)
enable-shared-homes: true

# Maximum number of players a single home can be shared with (-1 for unlimited)
max-shared-per-home: 5

# Categories (/homecategory)
enable-categories: true

# Show favorite homes first in the home list (/homefavorite)
favorite-first: true

# Show a preview with a clickable confirmation before teleporting
enable-home-preview: false
```

---

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Home module |
| `permissions` | List | *(see above)* | Permission-based home limits (see [Permission Entry Properties](#permission-entry-properties)) |
| `home-display` | String | `MULTI_LINE` | Display mode for the home list. Options: `IN_LINE` (single line), `INVENTORY` (chest GUI), `INVENTORY_DONUT` (donut-style GUI layout), `MULTI_LINE` (one home per line in chat) |
| `home-regex` | String | `[a-zA-Z0-9]+` | Regular expression pattern that home names must match. The default allows only alphanumeric characters |
| `home-name-max` | Integer | `16` | Maximum number of characters allowed in a home name |
| `home-name-min` | Integer | `1` | Minimum number of characters required in a home name |
| `disable-worlds` | List of Strings | `[world_event]` | List of world names where players are not allowed to set homes |
| `home-overwrite-confirm` | Boolean | `true` | If `true`, players must confirm with `/sethomeconfirm` when setting a home that already exists (overwriting) |
| `home-delete-confirm` | Boolean | `true` | If `true`, `/delhome <name>` opens a confirmation GUI (`modules/home/home_delete.yml`) instead of deleting the home immediately |
| `home-usage-type` | String | `MAX` | How permission-based home limits are calculated. `MAX` uses the highest single matching permission. `STACK` adds all matching permission amounts together |
| `default-home-material` | String | `BLUE_BED` | The material used as the default icon for homes in the inventory GUI display modes. zMenu material loaders can be used |
| `enable-public-homes` | Boolean | `true` | Enable public homes (`/homepublic`, `/publichomes`) |
| `max-public-homes` | Integer | `3` | Maximum number of public homes per player. `-1` for unlimited |
| `public-homes-display` | String | `CHAT` | How `/publichomes` displays the list: `CHAT` (clickable chat message) or `INVENTORY` (paginated GUI, `modules/home/public_homes.yml`) |
| `enable-shared-homes` | Boolean | `true` | Enable shared homes (`/homeshare`, `/homeunshare`, `/homeshares`) |
| `max-shared-per-home` | Integer | `5` | Maximum number of players a single home can be shared with. `-1` for unlimited |
| `enable-categories` | Boolean | `true` | Enable home categories (`/homecategory`) |
| `favorite-first` | Boolean | `true` | If `true`, favorite homes are displayed at the top of the home list |
| `enable-home-preview` | Boolean | `false` | If `true`, `/home <name>` first shows a preview (world and coordinates) with a clickable `[Teleport]` button instead of teleporting directly |

### Permission Entry Properties

Each entry in the `permissions` list defines a home limit for players with a specific permission:

| Property | Type | Description |
|----------|------|-------------|
| `permission` | String | The permission node to check on the player |
| `amount` | Integer | The number of homes granted by this permission |

<CalloutContainer type="info">

<CalloutTitle>Home Usage Types</CalloutTitle>

<CalloutDescription>
- **MAX**: The plugin checks all permissions and uses the **highest** matching amount. A player with both `essentials.home.default` (3) and `essentials.home.vip` (5) would have a maximum of **5** homes.
- **STACK**: The plugin **adds** all matching permission amounts together. The same player would have **8** homes (3 + 5).
</CalloutDescription>

</CalloutContainer>

---

## Display Modes

The `home-display` option controls how the home list is presented to the player:

| Mode | Description |
|------|-------------|
| `IN_LINE` | Displays all homes in a single chat line, separated by commas or a delimiter |
| `MULTI_LINE` | Displays each home on its own chat line with clickable teleport actions |
| `INVENTORY` | Opens a chest-style GUI inventory where each home is represented by an item |
| `INVENTORY_DONUT` | Opens a GUI inventory with homes arranged in a donut (ring) pattern around the center |

<CalloutContainer type="info">

<CalloutDescription>
The `INVENTORY` and `INVENTORY_DONUT` modes use [zMenu](https://modrinth.com/plugin/zmenu) for rendering (`modules/home/homes.yml` and `modules/home/homes_donut.yml`). The `default-home-material` option controls the item icon used for each home in these GUI modes.
</CalloutDescription>

</CalloutContainer>

### Home Placeholders

The home list messages and the home GUI buttons can use the following internal placeholders:

| Placeholder | Description |
|-------------|-------------|
| `%name%` | Home name |
| `%world%` | World name |
| `%environment%` | World environment (normal, nether, the end) |
| `%x%`, `%y%`, `%z%` | Block coordinates of the home |
| `%count%` | Number of homes of the player |
| `%max%` | Maximum number of homes of the player |
| `%category%` | Category of the home (empty if none) |
| `%favorite%` | `true` if the home is a favorite |
| `%public%` | `true` if the home is public |

---

## Public Homes

A player can make one of their homes visitable by everyone with `/homepublic <home>`. Running the command again on the same home makes it private again. The number of public homes per player is limited by `max-public-homes`.

- `/publichomes` lists every public home of the server, `/publichomes <player>` only the public homes of that player. The list is displayed in chat or in a paginated GUI depending on `public-homes-display`.
- A public home is visited with `/home <player>:<home>`. The visitor needs the `essentials.home.visit` permission.

```
/homepublic base
/publichomes Steve
/home Steve:base
```

<CalloutContainer type="info">

<CalloutDescription>
`/home <player>:<home>` behaves differently for staff: a player with `essentials.home.other` teleports to any home of another player, public or not. Players without it can only visit public homes and homes shared with them.
</CalloutDescription>

</CalloutContainer>

---

## Shared Homes

Instead of making a home public, a player can share it with specific players (online or offline):

- `/homeshare <home> <player>` shares the home with a player (limited by `max-shared-per-home`)
- `/homeunshare <home> <player>` removes the share
- `/homeshares <home>` lists the players the home is shared with

The other player visits the home with `/home <owner>:<home>` and needs the `essentials.home.visit` permission. Shares are automatically purged when the home is deleted.

---

## Categories and Favorites

- `/homecategory <home> <category>` assigns a category to a home. The category name must match `[a-zA-Z0-9_-]` (1 to 32 characters). Use `none` or `reset` as the category to remove it. Requires `enable-categories: true`.
- `/homefavorite <home>` toggles a home as favorite. When `favorite-first` is `true`, favorites are displayed first in the home list.

The `%category%` and `%favorite%` placeholders can be used in the home list messages and GUI buttons to display this information.

---

## Home Preview

When `enable-home-preview` is `true`, `/home <name>` no longer teleports directly: it displays the home world and coordinates with a clickable `[Teleport]` button, which runs `/home <name> confirm`. The format is the `command-home-preview` message in the messages file.

---

## Importing from EssentialsX

`/homeimport essentialsx` imports every home from the EssentialsX user data (`plugins/Essentials/userdata/*.yml`). The import runs asynchronously; homes located in a world that does not exist on the server are skipped, and a summary (imported, skipped, errors) is displayed at the end. A home with the same name as an existing home overwrites it.

---

## Managing Other Players' Homes

| Action | Command | Permission |
|--------|---------|------------|
| Teleport to any home of another player | `/home <player>:<home>` | `essentials.home.other` |
| List the homes of another player | `/home-list <player> [home]` | `essentials.home.list` |
| Create a home for another player | `/sethome <player>:<home>` | `essentials.set.home.other` |
| Delete a home of another player | `/delhome-other <player> <home>` | `essentials.del.home.other` |
| Delete a home of another player (legacy syntax) | `/delhome <player>:<home>` | `essentials.set.home.other` |

`/delhome-other` works with online and offline players and deletes the home without confirmation.

---

## Related Commands

| Command | Aliases | Permission | Description |
|---------|---------|------------|-------------|
| `/home [name]` | `h`, `homes` | `essentials.home` | Teleport to a home or view your home list. `/home <player>:<home>` visits a public or shared home |
| `/sethome <name>` | `hcreate`, `hc` | `essentials.set.home` | Create a new home at your current location |
| `/sethomeconfirm <name>` | - | `essentials.set.home.confirm` | Confirm overwriting an existing home |
| `/delhome <name>` | `hdelete`, `hd` | `essentials.del.home` | Delete a home (opens the confirmation GUI if `home-delete-confirm` is enabled) |
| `/delhomeconfirm <name>` | - | `essentials.del.home.confirm` | Confirm home deletion |
| `/delhome-other <player> <home>` | `delhomeother`, `hdelother` | `essentials.del.home.other` | Delete a home of another player (online or offline) |
| `/home-list <player> [home]` | `hlist` | `essentials.home.list` | List the homes of another player, or teleport to one of them |
| `/homepublic <home>` | `publichome` | `essentials.home.public` | Toggle a home between public and private |
| `/publichomes [player]` | `phomes` | `essentials.home.visit` | List public homes |
| `/homeshare <home> <player>` | `hshare` | `essentials.home.share` | Share a home with a player |
| `/homeunshare <home> <player>` | `hunshare` | `essentials.home.share` | Stop sharing a home with a player |
| `/homeshares <home>` | `hshares` | `essentials.home.share` | List the players a home is shared with |
| `/homecategory <home> <category>` | `homecat`, `hcat` | `essentials.home.category` | Set (or reset with `none`) the category of a home |
| `/homefavorite <home>` | `homefav`, `hfav` | `essentials.home.favorite` | Toggle a home as favorite |
| `/homeimport essentialsx` | - | `essentials.home.import` | Import homes from EssentialsX |

---

## Related Permissions

| Permission | Description |
|------------|-------------|
| `essentials.home` | Allows using `/home` and viewing the home list |
| `essentials.home.other` | Allows teleporting to any home of another player with `/home <player>:<home>` |
| `essentials.home.list` | Allows listing the homes of another player with `/home-list` |
| `essentials.set.home` | Allows creating homes with `/sethome` |
| `essentials.set.home.other` | Allows creating the homes of another player (and deleting them with `/delhome <player>:<home>`) |
| `essentials.set.home.confirm` | Allows confirming home overwrites |
| `essentials.del.home` | Allows deleting homes with `/delhome` |
| `essentials.del.home.confirm` | Allows confirming home deletion |
| `essentials.del.home.other` | Allows deleting a home of another player with `/delhome-other` |
| `essentials.home.public` | Allows making a home public with `/homepublic` |
| `essentials.home.visit` | Allows listing public homes and visiting public and shared homes |
| `essentials.home.share` | Allows using `/homeshare`, `/homeunshare` and `/homeshares` |
| `essentials.home.category` | Allows setting a category on a home |
| `essentials.home.favorite` | Allows marking a home as favorite |
| `essentials.home.import` | Allows importing homes from other plugins |
| `essentials.home.default` | Grants 3 home slots (configurable) |
| `essentials.home.vip` | Grants 5 home slots (configurable) |
| `essentials.home.staff` | Grants 10 home slots (configurable) |

<CalloutContainer type="warning">

<CalloutDescription>
Permission nodes for home limits (e.g., `essentials.home.default`, `essentials.home.vip`) are fully configurable in the `permissions` list. The values above are the defaults. Changing the permission name in the configuration changes which permission is checked.
</CalloutDescription>

</CalloutContainer>

---

## Storage

The public, category and favorite information is stored in the `is_public`, `category` and `is_favorite` columns of the `user_homes` table, and the shares in the `user_home_shares` table (or in the user file with the JSON storage).

---

## Related Placeholders

| Placeholder | Description | Return Type |
|-------------|-------------|-------------|
| `%zessentials_home_count%` | Number of homes the player currently has | Integer |
| `%zessentials_home_max%` | Maximum number of homes the player is allowed | Integer |
| `%zessentials_home_exist_{name}%` | Returns `true` if a home with the given name exists | Boolean |
| `%zessentials_home_delete%` | The name of the home being deleted (used in confirmation GUIs) | String |

**Example:** Display home usage in a scoreboard:
```
Homes: %zessentials_home_count%/%zessentials_home_max%
```

**Example:** Check if a home named `base` exists:
```
%zessentials_home_exist_base%
```
