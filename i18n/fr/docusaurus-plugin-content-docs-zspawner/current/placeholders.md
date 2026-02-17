---
sidebar_position: 4
title: Placeholders
description: Placeholders PlaceholderAPI disponibles dans zSpawner
---

# Placeholders

zSpawner fournit plusieurs placeholders via PlaceholderAPI pour afficher les informations des spawners dans les scoreboards, hologrammes et autres plugins.

## Prérequis

Pour utiliser ces placeholders, vous avez besoin de [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installé sur votre serveur.

## Placeholders Disponibles

| Placeholder | Description |
|-------------|-------------|
| `%zspawner_sort%` | Type de tri actuel (nom enum) |
| `%zspawner_sort_name%` | Nom d'affichage du type de tri actuel |
| `%zspawner_gui_spawners%` | Nombre de spawners GUI possédés par le joueur |
| `%zspawner_virtual_spawners%` | Nombre de spawners Virtuels possédés par le joueur |
| `%zspawner_classic_spawners%` | Nombre de spawners Classic possédés par le joueur |
| `%zspawner_material_<ENTITE>%` | Matériau associé à un type d'entité |
| `%zspawner_is_drop_loot%` | Si le spawner virtuel actuel drop du loot |

## Détails des Placeholders

### Placeholders de Tri

Les joueurs peuvent trier leurs spawners dans l'interface. Ces placeholders montrent la préférence de tri actuelle :

```
%zspawner_sort%      -> PLACE / NO_PLACE
%zspawner_sort_name% -> spawners placed / spawners not placed
```

### Placeholders de Comptage de Spawners

Compte le nombre de spawners possédés par le joueur, catégorisés par type :

```
%zspawner_gui_spawners%     -> 5
%zspawner_virtual_spawners% -> 3
%zspawner_classic_spawners% -> 10
```

### Placeholder de Matériau

Obtenir le matériau (œuf de spawn) associé à un type d'entité. Utile pour créer des affichages dynamiques :

```
%zspawner_material_ZOMBIE%   -> ZOMBIE_SPAWN_EGG
%zspawner_material_SKELETON% -> SKELETON_SPAWN_EGG
%zspawner_material_BLAZE%    -> BLAZE_SPAWN_EGG
```

### Placeholder Drop Loot

Vérifier si le spawner virtuel actuel est configuré pour dropper du loot :

```
%zspawner_is_drop_loot% -> true / false
```

## Exemples d'Utilisation

### Scoreboard

Afficher les statistiques de spawner sur le scoreboard d'un joueur :

```yaml
lines:
  - "&6&lSpawners"
  - "&7GUI: &f%zspawner_gui_spawners%"
  - "&7Virtuel: &f%zspawner_virtual_spawners%"
  - "&7Classic: &f%zspawner_classic_spawners%"
```

### Hologramme

Afficher le total des spawners au-dessus d'une zone de spawner :

```yaml
lines:
  - "&6Vos Spawners"
  - "&eGUI: &f%zspawner_gui_spawners%"
  - "&eVirtuel: &f%zspawner_virtual_spawners%"
```

### Lore d'Item de Menu

Utiliser dans zMenu pour afficher les informations de spawner :

```yaml
lore:
  - "&7Vous possédez &e%zspawner_gui_spawners% &7spawners GUI"
  - "&7Vous possédez &e%zspawner_virtual_spawners% &7spawners Virtuels"
  - ""
  - "&7Tri par: &f%zspawner_sort_name%"
```

## Placeholders Internes

zSpawner utilise aussi des placeholders internes dans ses propres fichiers de configuration. Ceux-ci sont automatiquement remplacés dans les items de spawner et les messages :

| Placeholder | Description |
|-------------|-------------|
| `%type%` | Nom du type d'entité |
| `%entity%` | Nom d'affichage de l'entité |
| `%amount%` | Nombre de la pile |
| `%spawnerKey%` | Identifiant unique du spawner |
| `%target%` | Nom du joueur cible |
| `%player%` | Nom du joueur |
| `%world%` | Nom du monde |
| `%x%`, `%y%`, `%z%` | Coordonnées |
| `%limit%` | Limite de spawner |
| `%second%` | Secondes (pour téléportation) |
| `%time%` | Temps restant formaté |
| `%price%` | Valeur du prix |
| `%minutes%` | Valeur en minutes |
| `%renter%` | Nom du joueur locataire |
| `%owner%` | Nom du propriétaire |
| `%status%` | Statut de location |
| `%enabled%` | Statut d'activation de la fonctionnalité |
| `%min%` | Valeur minimum |
| `%max%` | Valeur maximum |
| `%name%` | Nom de l'option |
| `%value%` | Valeur de l'option |

Ces placeholders internes sont utilisés dans `config.yml`, `messages.yml`, et les fichiers d'inventaire.
