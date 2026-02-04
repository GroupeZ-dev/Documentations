---
sidebar_position: 6
title: Data Migration
description: Migrate data from other plugins to zEssentials
---

# Data Migration

zEssentials includes built-in data converters that allow you to migrate player data from other popular plugins. Each converter reads data from the source plugin's storage format and imports it into the zEssentials database.

:::warning Prerequisites
All converters require zEssentials to be configured with **SQL storage** (MySQL, MariaDB, or HikariCP). SQLite is not supported as a target for data migration. Ensure your database is configured and working before running any converter.
:::

:::tip Before You Start
1. **Back up your database** before running any converter.
2. **Stop the server** or ensure no players are online during migration to prevent data conflicts.
3. Verify that the source plugin's data files are accessible from the server.
4. Run the converter from the server console for best results.
:::

---

## EssentialsX

Migrates player data from [EssentialsX](https://essentialsx.net/) to zEssentials.

### Data Migrated

| Data Type | Details |
|-----------|---------|
| **Users** | Player UUID and last known username |
| **Economy** | Player money balances |
| **Homes** | All player homes with full location data |

### How It Works

The converter reads from EssentialsX's flat-file storage located at `plugins/Essentials/userdata/`. Each file in this directory is named after a player's UUID (e.g., `550e8400-e29b-41d4-a716-446655440000.yml`) and contains that player's data.

From each player file, the converter extracts:

- **`money`** -- The player's economy balance
- **`last-account-name`** -- The player's last known username
- **`homes`** -- A map of home names, each containing:
  - `world-name` -- The world the home is in
  - `x`, `y`, `z` -- The coordinates
  - `yaw`, `pitch` -- The player's facing direction

### Prerequisites

- EssentialsX userdata files must be present at `plugins/Essentials/userdata/`
- zEssentials must be configured with SQL storage

### Usage

1. Ensure the `plugins/Essentials/userdata/` directory contains the player `.yml` files
2. Run the converter command from the console
3. The converter will iterate through all `.yml` files and import each player's data

---

## CMI

Migrates player data from [CMI](https://www.spigotmc.org/resources/cmi.3742/) to zEssentials.

### Data Migrated

| Data Type | Details |
|-----------|---------|
| **Users** | Player UUID and username |
| **Economy** | Player money balances |
| **Homes** | All player homes with full location data |

### How It Works

The converter reads from CMI's SQLite database file (`cmi.sqlite.db`). This file must be placed in the `plugins/zEssentials/` folder before running the converter.

Home locations in CMI are stored as serialized strings. The converter parses these strings to extract the world name, coordinates, yaw, and pitch for each home.

### Prerequisites

- Copy `cmi.sqlite.db` from the CMI plugin folder into `plugins/zEssentials/`
- zEssentials must be configured with SQL storage

### Usage

1. Copy the `cmi.sqlite.db` file to `plugins/zEssentials/`
2. Run the converter command from the console
3. The converter will read the CMI database and import users, balances, and homes

---

## CoinsEngine

Migrates multi-currency balances from [CoinsEngine](https://www.spigotmc.org/resources/coinsengine.84121/) to zEssentials.

### Data Migrated

| Data Type | Details |
|-----------|---------|
| **Economy** | All multi-currency balances per player |

### How It Works

The converter reads from two sources:

1. **`plugins/CoinsEngine/data.db`** -- The SQLite database containing player balance data
2. **`plugins/CoinsEngine/currencies/*.yml`** -- Currency configuration files used to determine the column names in the database

Each currency defined in CoinsEngine maps to a column in the database. The converter reads the column names from the currency configuration files and extracts the corresponding balance values for each player.

### Prerequisites

- The CoinsEngine data file must be present at `plugins/CoinsEngine/data.db`
- Currency configuration files must be present at `plugins/CoinsEngine/currencies/`
- **All currencies must already exist in your zEssentials economy configuration** before running the converter. Create matching currencies in zEssentials first, then run the migration.
- zEssentials must be configured with SQL storage

### Usage

1. Ensure `plugins/CoinsEngine/data.db` and `plugins/CoinsEngine/currencies/` are accessible
2. Create all matching currencies in the zEssentials economy module configuration
3. Run the converter command from the console
4. The converter will map each CoinsEngine currency to its zEssentials equivalent and import all balances

---

## HuskHomes

Migrates player data from [HuskHomes](https://william278.net/project/huskhomes/) to zEssentials.

### Data Migrated

| Data Type | Details |
|-----------|---------|
| **Users** | Player UUID and username |
| **Homes** | All player homes with full location data |

### How It Works

The converter reads from HuskHomes' SQLite database (`HuskHomesData.db`) or from existing database tables if using a shared MySQL database. The converter performs a join across three tables:

1. **Users table** -- Contains player UUIDs and usernames
2. **Homes table** -- Contains home names and owner references
3. **Positions table** -- Contains the actual coordinates (world, x, y, z, yaw, pitch)

The three tables are joined together to reconstruct each player's complete home data.

### Prerequisites

- Either copy `HuskHomesData.db` from the HuskHomes plugin folder into `plugins/zEssentials/`, or ensure zEssentials can access the existing HuskHomes database tables
- zEssentials must be configured with SQL storage

### Usage

1. Copy the `HuskHomesData.db` file to `plugins/zEssentials/` (or configure access to the shared database)
2. Run the converter command from the console
3. The converter will join the users, homes, and positions tables and import all player home data

---

## PlayerVaultX

Migrates vault items from [PlayerVaultX](https://www.spigotmc.org/resources/playervaultx.51204/) to zEssentials.

### Data Migrated

| Data Type | Details |
|-----------|---------|
| **Vaults** | All player vault contents (items) |

### How It Works

The converter reads from PlayerVaultX's flat-file storage located at `plugins/PlayerVaults/newvaults/`. Each file contains a player's vault data with items stored as Base64-encoded `ItemStack` arrays using the `CardboardBoxSerialization` format.

The converter decodes each Base64 string back into Minecraft `ItemStack` objects and imports them into the zEssentials vault system.

### Prerequisites

- PlayerVaultX data files must be present at `plugins/PlayerVaults/newvaults/`
- The **PlayerVaults plugin must be enabled** on the server (required for the `CardboardBoxSerialization` deserialization classes)
- zEssentials must be configured with SQL storage

### Usage

1. Ensure the PlayerVaults plugin is installed and enabled on the server
2. Verify that `plugins/PlayerVaults/newvaults/` contains the player vault `.yml` files
3. Run the converter command from the console
4. The converter will decode and import all vault items for each player

---

## AxVaults

Migrates vault items from [AxVaults](https://www.spigotmc.org/resources/axvaults.103862/) to zEssentials.

### Data Migrated

| Data Type | Details |
|-----------|---------|
| **Vaults** | All player vault contents (items) |

### How It Works

The converter reads vault data directly from the AxVaults database. It uses Java reflection to access the AxVaults plugin's internal database connection, then queries the vault tables to retrieve all stored items for each player.

### Prerequisites

- The **AxVaults plugin must be enabled** on the server (required for database connection access via reflection)
- zEssentials must be configured with SQL storage

### Usage

1. Ensure the AxVaults plugin is installed and enabled on the server
2. Run the converter command from the console
3. The converter will access the AxVaults database connection and import all vault items

---

## Sunlight

Migrates player data from [Sunlight](https://www.spigotmc.org/resources/sunlight.101965/) to zEssentials.

### Data Migrated

| Data Type | Details |
|-----------|---------|
| **Users** | Player UUID and username |
| **Homes** | All player homes with full location data |

### How It Works

The converter reads from Sunlight's SQLite database (`data.db`). This file must be placed in the `plugins/zEssentials/` folder before running the converter.

Sunlight stores location data in a different format than zEssentials. The converter handles the format translation:

| Sunlight Format | zEssentials Format |
|-----------------|-------------------|
| `x, y, z, pitch, yaw, world` | `world, x, y, z, yaw, pitch` |

The converter remaps the fields to match the zEssentials location structure during import.

### Prerequisites

- Copy `data.db` from the Sunlight plugin folder into `plugins/zEssentials/`
- zEssentials must be configured with SQL storage

### Usage

1. Copy the `data.db` file to `plugins/zEssentials/`
2. Run the converter command from the console
3. The converter will read the Sunlight database, translate the location format, and import users and homes

---

## Summary

| Converter | Users | Economy | Homes | Vaults | Source Format | File Placement |
|-----------|:-----:|:-------:|:-----:|:------:|---------------|----------------|
| **EssentialsX** | Yes | Yes | Yes | -- | Flat-file YAML | `plugins/Essentials/userdata/` (in-place) |
| **CMI** | Yes | Yes | Yes | -- | SQLite | Copy `cmi.sqlite.db` to `plugins/zEssentials/` |
| **CoinsEngine** | -- | Yes | -- | -- | SQLite + YAML | `plugins/CoinsEngine/` (in-place) |
| **HuskHomes** | Yes | -- | Yes | -- | SQLite / MySQL | Copy `HuskHomesData.db` to `plugins/zEssentials/` or use shared DB |
| **PlayerVaultX** | -- | -- | -- | Yes | Flat-file YAML (Base64) | `plugins/PlayerVaults/newvaults/` (in-place) |
| **AxVaults** | -- | -- | -- | Yes | Database (via reflection) | Plugin must be enabled |
| **Sunlight** | Yes | -- | Yes | -- | SQLite | Copy `data.db` to `plugins/zEssentials/` |

:::info
All converters require SQL storage (MySQL, MariaDB, or HikariCP) to be configured in zEssentials. SQLite cannot be used as the target storage for migrations.
:::
