---
title: Admin Main
description: Admin player directory inventory configuration
---

# Admin Main

The admin main inventory is the player directory of the administration interface. It lists every player who has auction activity and lets admins jump straight into a player's history without having to type their name.

**File:** `plugins/zAuctionHouse/inventories/admin/admin-main.yml`

**Access:**
- `/ah admin` (without argument)
- `/ah admin history` (without player argument)
- Any [`ZAUCTIONHOUSE_ADMIN_MAIN`](../buttons#admin-buttons) button, for example the **All players** button of the [admin history main](./admin-history) inventory

**Permission:** `zauctionhouse.admin.items` (`/ah admin` also requires `zauctionhouse.admin`)

## Features

- One entry per player with auction activity (listings, purchases, logs or transactions)
- Number of listings currently on sale, sales and purchases for each player
- Four sort modes: name, listed, sold, purchased
- Click on a player to open their [admin history main](./admin-history) inventory
- Refresh button to reload the data

<CalloutContainer type="info">

<CalloutDescription>
The data is loaded asynchronously with a single SQL query, and no item content is loaded. Every time the inventory is opened (command or `ZAUCTIONHOUSE_ADMIN_MAIN` button), the data is reloaded from the database.
</CalloutDescription>

</CalloutContainer>

## Default Configuration

```yaml
# Admin player directory. Counts are auction listings/lots, including historical purchases.
name: "#0c1719Player administration"
size: 54
patterns:
  - zauctionhouse-pagination
items:
  players:
    type: ZAUCTIONHOUSE_ADMIN_PLAYERS
    slots:
      - 0-44
    item:
      material: PLAYER_HEAD
      player-head: "%target%"
      name: "#2CCED2%target%"
      lore:
        - "#92ffffListed: #2CCED2%listed%"
        - "#92ffffSold: #2CCED2%sold%"
        - "#92ffffPurchased: #2CCED2%purchased%"
        - ""
        - "#92ffffClick to view player history"
    else:
      item:
        material: BARRIER
        name: "#ff5555No player history"
      slot: 22
  sort:
    type: ZAUCTIONHOUSE_ADMIN_PLAYERS_SORT
    slot: 49
    item:
      material: HOPPER
      name: "#2CCED2Sort players"
      lore:
        - "%name-color%• Name"
        - "%listed-color%• Listed (descending)"
        - "%sold-color%• Sold (descending)"
        - "%purchased-color%• Purchased (descending)"
        - "#8c8c8cLeft / right click to cycle"
  refresh:
    type: ZAUCTIONHOUSE_ADMIN_MAIN
    slot: 45
    item:
      material: SUNFLOWER
      name: "#2CCED2Refresh"
```

## Buttons Used

| Button | Type | Description |
|--------|------|-------------|
| `players` | [`ZAUCTIONHOUSE_ADMIN_PLAYERS`](../buttons#admin-buttons) | Paginated list of players with auction activity. Click opens the player's admin history |
| `sort` | [`ZAUCTIONHOUSE_ADMIN_PLAYERS_SORT`](../buttons#admin-buttons) | Changes the sort order of the player list |
| `refresh` | [`ZAUCTIONHOUSE_ADMIN_MAIN`](../buttons#admin-buttons) | Reloads the data and reopens the directory |

### ZAUCTIONHOUSE_ADMIN_PLAYERS

Paginated button that displays one item per player (use `PLAYER_HEAD` with `player-head: "%target%"` to show the player's head). The pagination controls come from the `zauctionhouse-pagination` pattern.

When no player has auction activity, the `else` button is displayed instead (by default a `BARRIER` in slot 22).

Clicking an entry opens the [admin history main](./admin-history) inventory of that player, like `/ah admin history <player>`.

### ZAUCTIONHOUSE_ADMIN_PLAYERS_SORT

Cycles through the sort modes:

| Click | Action |
|-------|--------|
| Left click | Next sort mode |
| Right click | Previous sort mode |

| Sort mode | Order |
|-----------|-------|
| Name | Alphabetical (A-Z, case insensitive) |
| Listed | Number of listings on sale, descending |
| Sold | Number of sales, descending |
| Purchased | Number of purchases, descending |

Players with the same value are sorted by name. The default sort mode is **Name**.

### ZAUCTIONHOUSE_ADMIN_MAIN

Opens the admin main inventory and reloads its data. In `admin-main.yml` it is used as the **Refresh** button; in `admin-history-main.yml` it is used as the **All players** button to go back to the directory:

```yaml
  players:
    type: ZAUCTIONHOUSE_ADMIN_MAIN
    slot: 49
    item:
      material: BOOK
      name: "#2CCED2All players"
```

## Placeholders

### Player entry (`ZAUCTIONHOUSE_ADMIN_PLAYERS`)

| Placeholder | Description |
|-------------|-------------|
| `%target%` | Player's name |
| `%listed%` | Number of listings currently on sale and not expired |
| `%sold%` | Number of `PURCHASE` logs where the player is the seller |
| `%purchased%` | Number of `PURCHASE` logs where the player is the buyer (includes historical purchases) |

### Sort button (`ZAUCTIONHOUSE_ADMIN_PLAYERS_SORT`)

| Placeholder | Description |
|-------------|-------------|
| `%name-color%` | `#2CCED2` if the name sort is active, `#8c8c8c` otherwise |
| `%listed-color%` | `#2CCED2` if the listed sort is active, `#8c8c8c` otherwise |
| `%sold-color%` | `#2CCED2` if the sold sort is active, `#8c8c8c` otherwise |
| `%purchased-color%` | `#2CCED2` if the purchased sort is active, `#8c8c8c` otherwise |

<CalloutContainer type="info">

<CalloutDescription>
This file is created automatically on startup if it does not exist yet, so existing installations receive it without having to regenerate their inventories.
</CalloutDescription>

</CalloutContainer>
