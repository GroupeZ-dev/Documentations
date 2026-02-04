---
sidebar_position: 7
title: Module Homes
description: Système de homes des joueurs avec limites basées sur les permissions
---

# Module Homes

**Fichier :** `modules/home/config.yml`

Le module Homes permet aux joueurs de définir, se téléporter vers et gérer des emplacements de homes personnels. Le nombre maximum de homes est contrôlé par des limites basées sur les permissions, et le module supporte plusieurs modes d'affichage pour la liste des homes, la validation configurable des noms, les restrictions de mondes et les invites de confirmation pour l'écrasement ou la suppression de homes.

---

## Configuration

```yaml
enable: true

# Permission-based home limits
# The plugin checks each permission from top to bottom and uses the first match
permissions:
  - permission: "essentials.home.default"
    amount: 3
  - permission: "essentials.home.vip"
    amount: 5
  - permission: "essentials.home.staff"
    amount: 10

# Display mode for the /home list
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

# Require confirmation when overwriting an existing home
home-overwrite-confirm: true

# Require confirmation when deleting a home
home-delete-confirm: true

# How permission amounts are evaluated: MAX or STACK
# MAX: Uses the highest matching permission amount
# STACK: Adds all matching permission amounts together
home-usage-type: MAX

# Default material icon for homes in the GUI
default-home-material: BLUE_BED
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Homes |
| `home-display` | String | `MULTI_LINE` | Mode d'affichage de la liste des homes. Options : `IN_LINE` (une seule ligne), `INVENTORY` (interface GUI coffre), `INVENTORY_DONUT` (disposition GUI en anneau), `MULTI_LINE` (un home par ligne dans le chat) |
| `home-regex` | String | `[a-zA-Z0-9]+` | Expression régulière que les noms de homes doivent respecter. La valeur par défaut autorise uniquement les caractères alphanumériques |
| `home-name-max` | Integer | `16` | Nombre maximum de caractères autorisés dans un nom de home |
| `home-name-min` | Integer | `1` | Nombre minimum de caractères requis dans un nom de home |
| `disable-worlds` | Liste de Strings | `[world_event]` | Liste des noms de mondes où les joueurs ne sont pas autorisés à définir des homes |
| `home-overwrite-confirm` | Boolean | `true` | Si `true`, les joueurs doivent confirmer avec `/sethomeconfirm` lorsqu'ils définissent un home qui existe déjà (écrasement) |
| `home-delete-confirm` | Boolean | `true` | Si `true`, les joueurs doivent confirmer avec `/delhomeconfirm` lors de la suppression d'un home |
| `home-usage-type` | String | `MAX` | Mode de calcul des limites de homes basées sur les permissions. `MAX` utilise la permission correspondante la plus élevée. `STACK` additionne tous les montants de permissions correspondantes |
| `default-home-material` | String | `BLUE_BED` | Le matériau Minecraft utilisé comme icône par défaut pour les homes dans les modes d'affichage GUI inventaire |

### Propriétés des Entrées de Permission

Chaque entrée dans la liste `permissions` définit une limite de homes pour les joueurs possédant une permission spécifique :

| Propriété | Type | Description |
|-----------|------|-------------|
| `permission` | String | Le noeud de permission à vérifier sur le joueur |
| `amount` | Integer | Le nombre de homes accordés par cette permission |

:::info Types d'Utilisation des Homes
- **MAX** : Le plugin vérifie toutes les permissions et utilise le montant correspondant **le plus élevé**. Un joueur avec à la fois `essentials.home.default` (3) et `essentials.home.vip` (5) aurait un maximum de **5** homes.
- **STACK** : Le plugin **additionne** tous les montants de permissions correspondantes. Le même joueur aurait **8** homes (3 + 5).
:::

---

## Modes d'Affichage

L'option `home-display` contrôle la manière dont la liste des homes est présentée au joueur :

| Mode | Description |
|------|-------------|
| `IN_LINE` | Affiche tous les homes sur une seule ligne de chat, séparés par des virgules ou un délimiteur |
| `MULTI_LINE` | Affiche chaque home sur sa propre ligne de chat avec des actions de téléportation cliquables |
| `INVENTORY` | Ouvre une interface GUI de type coffre où chaque home est représenté par un objet |
| `INVENTORY_DONUT` | Ouvre une interface GUI avec les homes disposés en anneau autour du centre |

:::tip
Les modes `INVENTORY` et `INVENTORY_DONUT` utilisent [zMenu](https://modrinth.com/plugin/zmenu) pour le rendu. L'option `default-home-material` contrôle l'icône d'objet utilisée pour chaque home dans ces modes GUI.
:::

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/home` | `h`, `homes` | `essentials.home` | Se téléporter à un home ou voir votre liste de homes |
| `/sethome` | `hcreate`, `hc` | `essentials.set.home` | Créer un nouveau home à votre position actuelle |
| `/sethomeconfirm` | - | `essentials.set.home.confirm` | Confirmer l'écrasement d'un home existant |
| `/delhome` | `hdelete`, `hd` | `essentials.del.home` | Supprimer un home |
| `/delhomeconfirm` | - | `essentials.del.home.confirm` | Confirmer la suppression d'un home |
| `/home-list` | - | `essentials.home` | Lister tous vos homes |

---

## Permissions Associées

| Permission | Description |
|------------|-------------|
| `essentials.home` | Autorise l'utilisation de `/home` et la consultation de la liste des homes |
| `essentials.set.home` | Autorise la création de homes avec `/sethome` |
| `essentials.set.home.confirm` | Autorise la confirmation d'écrasement de homes |
| `essentials.del.home` | Autorise la suppression de homes avec `/delhome` |
| `essentials.del.home.confirm` | Autorise la confirmation de suppression de homes |
| `essentials.home.default` | Accorde 3 emplacements de homes (configurable) |
| `essentials.home.vip` | Accorde 5 emplacements de homes (configurable) |
| `essentials.home.staff` | Accorde 10 emplacements de homes (configurable) |

:::warning
Les noeuds de permission pour les limites de homes (par exemple, `essentials.home.default`, `essentials.home.vip`) sont entièrement configurables dans la liste `permissions`. Les valeurs ci-dessus sont les valeurs par défaut. Modifier le nom de la permission dans la configuration change la permission vérifiée.
:::

---

## Placeholders Associés

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_home_count%` | Nombre de homes que le joueur possède actuellement | Integer |
| `%zessentials_home_max%` | Nombre maximum de homes autorisés pour le joueur | Integer |
| `%zessentials_home_exist_{name}%` | Retourne `true` si un home avec le nom donné existe | Boolean |
| `%zessentials_home_delete%` | Le nom du home en cours de suppression (utilisé dans les interfaces de confirmation) | String |

**Exemple :** Afficher l'utilisation des homes dans un scoreboard :
```
Homes: %zessentials_home_count%/%zessentials_home_max%
```

**Exemple :** Vérifier si un home nommé `base` existe :
```
%zessentials_home_exist_base%
```
