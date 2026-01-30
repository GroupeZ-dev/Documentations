---
sidebar_position: 4
title: Placeholders
description: Tous les placeholders disponibles dans zQuests
---

# Placeholders

zQuests fournit des placeholders PlaceholderAPI pour afficher les informations de quetes partout sur votre serveur. Ces placeholders peuvent etre utilises dans les scoreboards, hologrammes, formats de chat, et bien sur dans les inventaires zMenu.

## Prerequis

Pour utiliser les placeholders zQuests en dehors de zMenu, vous avez besoin de :
- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installe

## Placeholders de quetes

### Informations de base des quetes

| Placeholder | Description | Exemple de sortie |
|-------------|-------------|-------------------|
| `%zquests_name_<quete>%` | Nom d'affichage de la quete | `Casseur de Pierre` |
| `%zquests_description_<quete>%` | Description de la quete | `Cassez 500 blocs de pierre` |
| `%zquests_thumbnail_<quete>%` | Materiau miniature de la quete | `STONE` |
| `%zquests_type_<quete>%` | Type de quete | `BLOCK_BREAK` |
| `%zquests_objective_<quete>%` | Objectif de la quete | `500` |

Remplacez `<quete>` par la valeur unique `name` de la quete.

**Exemple :**
```
%zquests_name_casseur-pierre-1%
```

### Progression de la quete

| Placeholder | Description | Exemple de sortie |
|-------------|-------------|-------------------|
| `%zquests_progress_<quete>%` | Progression actuelle | `250` |
| `%zquests_progress_bar_<quete>%` | Barre de progression visuelle | `||||||||||||||||` |
| `%zquests_lore_line_<quete>%` | Ligne de progression formatee | `|||||||||||||||| - 250/500 ✘` |
| `%zquests_is_active_<quete>%` | La quete est active | `true` ou `false` |
| `%zquests_is_completed_<quete>%` | La quete est completee | `true` ou `false` |

### Placeholders de groupe

| Placeholder | Description | Exemple de sortie |
|-------------|-------------|-------------------|
| `%zquests_group_name_<groupe>%` | Nom d'affichage du groupe | `Quetes de Minage` |
| `%zquests_group_count_<groupe>%` | Total de quetes dans le groupe | `10` |
| `%zquests_group_finish_<groupe>%` | Quetes completees dans le groupe | `5` |
| `%zquests_group_percent_<groupe>%` | Pourcentage de completion | `50` |
| `%zquests_group_total_percent_<groupe>%` | Pourcentage de progression total | `67.5` |

Remplacez `<groupe>` par l'identifiant du groupe depuis `config.yml`.

### Quetes favorites

| Placeholder | Description |
|-------------|-------------|
| `%zquests_favorite_quests%` | Liste formatee des quetes favorites |

## Configuration de la barre de progression

Configurez l'apparence de la barre de progression dans `config.yml` :

```yaml
progress-bar:
  # Caractere pour la progression completee
  icon: '|'
  # Caractere pour la progression restante
  not-completed-icon: '|'
  # Couleur pour la portion completee
  progress-color: "#0ff216"
  # Couleur pour la portion restante
  color: "#828282"
  # Longueur totale de la barre
  size: 30
```

**Resultat :**
```
||||||||||||||||||||||||||||||  (vert : complete, gris : restant)
```

## Configuration de la ligne de lore

Configurez le format du placeholder `%zquests_lore_line_<quete>%` dans `config.yml` :

```yaml
lore-line-placeholder:
  # Format pour les quetes actives (incompletes)
  active: "%progress-bar% &8- &6%progress%&8/&f%goal% &c✘"
  # Format pour les quetes completees
  complete: "%progress-bar% &8- &6%progress%&8/&f%goal% &a✔"
```

**Variables disponibles :**
- `%progress-bar%` - La barre de progression
- `%progress%` - Nombre de progression actuelle
- `%goal%` - Objectif de la quete

## Placeholder des quetes favorites

Configurez l'affichage du placeholder `%zquests_favorite_quests%` dans `config.yml` :

```yaml
placeholder-favorite:
  # Nombre maximum de quetes favorites a afficher
  limit: 3
  # Message quand le joueur n'a pas de favoris
  empty: "&cAucune quete favorite"
  # Format pour chaque quete dans la liste
  result: "&f%quest-description%\n&8%quest-display-name%\n#fcd600%quest-progress%&8/&f%quest-objective%"
  # Separateur entre les quetes
  between: "\n\n"
```

**Variables disponibles dans `result` :**
- `%quest-name%` - Nom interne de la quete
- `%quest-display-name%` - Nom d'affichage
- `%quest-description%` - Description
- `%quest-thumbnail%` - Materiau miniature
- `%quest-type%` - Type de quete
- `%quest-objective%` - Objectif
- `%quest-lore-line%` - Ligne de lore formatee
- `%quest-progress-bar%` - Barre de progression
- `%quest-percent%` - Pourcentage de completion
- `%quest-progress%` - Progression actuelle
- `%quest-global-group-name%` - Nom du groupe

## Groupes de quetes

Definissez les groupes de quetes dans `config.yml` pour utiliser les placeholders de groupe :

```yaml
quests-groups:
  minage:
    display-name: "Quetes de Minage"
    quests:
      - "casseur-pierre-1"
      - "casseur-pierre-2"
      - "mineur-minerai-1"

  agriculture:
    display-name: "Quetes d'Agriculture"
    quests:
      - "fermier-ble-1"
      - "maitre-recoltes-1"

# Nom de groupe par defaut pour les quetes non groupees
global-group-display-name: "General"
```

**Utilisation :**
```
Progression Minage : %zquests_group_percent_minage%%
```

## Exemples d'utilisation

### Dans un scoreboard

```yaml
# Exemple de configuration de scoreboard
lines:
  - "&6&lQUETES"
  - ""
  - "&fActive : &e%zquests_is_active_minage-quotidien%"
  - "&fProgression : &a%zquests_progress_minage-quotidien%&7/&f%zquests_objective_minage-quotidien%"
  - "%zquests_progress_bar_minage-quotidien%"
```

### Dans un inventaire zMenu

```yaml
items:
  info-quete:
    slot: 13
    item:
      material: "%zquests_thumbnail_casseur-pierre%"
      name: "&6%zquests_name_casseur-pierre%"
      lore:
        - "&7%zquests_description_casseur-pierre%"
        - ""
        - "%zquests_lore_line_casseur-pierre%"
        - ""
        - "&7Statut : %zquests_is_completed_casseur-pierre%"
```

### Dans un format de chat

```
[Quete : %zquests_name_quete-actuelle%] %player_name% : %message%
```

### Dans un hologramme

```yaml
# Hologramme zEssentials
lines:
  - "&6&lQUETE QUOTIDIENNE"
  - "&f%zquests_name_quete-quotidienne%"
  - ""
  - "%zquests_progress_bar_quete-quotidienne%"
  - "&7%zquests_progress_quete-quotidienne%&8/&f%zquests_objective_quete-quotidienne%"
```

## Test des placeholders

Testez les placeholders avec PlaceholderAPI :

```
/papi parse me %zquests_name_casseur-pierre%
/papi parse me %zquests_progress_casseur-pierre%
/papi parse me %zquests_is_active_casseur-pierre%
```

## Depannage

### Le placeholder affiche "Unknown"

- Verifiez que le nom de la quete est correct (sensible a la casse)
- Verifiez que la quete existe dans votre configuration
- Rechargez le plugin : `/zquests reload`

### La barre de progression ne s'affiche pas

- Assurez-vous que `progress-bar` est configure dans `config.yml`
- Verifiez les erreurs de syntaxe YAML

### Le placeholder de groupe retourne 0

- Verifiez que l'ID du groupe correspond exactement
- Verifiez que les quetes sont listees dans la configuration du groupe
- Assurez-vous que les noms de quetes correspondent a leurs valeurs `name`

## Prochaines etapes

- Configurez les [Commandes et Permissions](./commands-permissions)
- Configurez les [Inventaires](./inventories) avec les affichages de quetes
- Decouvrez les [Waypoints & Hologrammes](./waypoints-holograms)
