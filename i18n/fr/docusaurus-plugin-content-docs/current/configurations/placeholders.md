---
sidebar_position: 3
title: Placeholders
description: Tous les placeholders disponibles dans zMenu
---

# Placeholders

zMenu fournit des placeholders integres et supporte PlaceholderAPI pour le contenu dynamique dans vos inventaires.

## Placeholders integres

Ces placeholders sont disponibles sans plugins supplementaires :

### Placeholders joueur

| Placeholder | Description | Exemple de sortie |
|-------------|-------------|-------------------|
| `%player%` | Nom du joueur | `Notch` |

### Placeholders de pagination

| Placeholder | Description | Exemple de sortie |
|-------------|-------------|-------------------|
| `%page%` | Numero de page actuel | `1` |
| `%maxPage%` | Numero de page maximum | `5` |
| `%max-page%` | Numero de page maximum (alias) | `5` |
| `%zmenu_player_page%` | Page actuelle (format PAPI) | `1` |
| `%zmenu_player_next_page%` | Numero de page suivante | `2` |
| `%zmenu_player_previous_page%` | Numero de page precedente | `0` |
| `%zmenu_player_max_page%` | Page maximum (format PAPI) | `5` |

### Placeholders d'historique d'inventaire

| Placeholder | Description | Exemple de sortie |
|-------------|-------------|-------------------|
| `%zmenu_player_previous_inventories%` | Nombre d'inventaires precedents dans l'historique | `3` |

### Placeholders mathematiques

Effectuez des calculs directement dans votre configuration :

| Placeholder | Description | Exemple |
|-------------|-------------|---------|
| `%zmenu_math_<expression>%` | Calculer une expression mathematique | `%zmenu_math_5+5%` → `10` |
| `%zmenu_formatted_math_<expression>%` | Resultat mathematique formate | `%zmenu_formatted_math_1000+500%` → `1 500` |

**Operations supportees :**
- Addition : `+`
- Soustraction : `-`
- Multiplication : `*`
- Division : `/`
- Parentheses : `()`

**Exemples :**
```yaml
lore:
  - "&7Resultat : %zmenu_math_10*5%"           # Sortie : 50
  - "&7Solde : %zmenu_formatted_math_%vault_eco_balance%*2%"
```

### Placeholders de donnees joueur

| Placeholder | Description |
|-------------|-------------|
| `%zmenu_player_value_<cle>%` | Obtenir la valeur des donnees joueur |

**Exemple :**
```yaml
lore:
  - "&7Pieces : &6%zmenu_player_value_coins%"
  - "&7Kills : &c%zmenu_player_value_kills%"
```

### Placeholders de placeholders globaux

| Placeholder | Description |
|-------------|-------------|
| `%zmenu_global_placeholders_<cle>%` | Obtenir la valeur d'un placeholder global |

**Exemple :**
```yaml
# Dans global-placeholders.yml
server-name: "Mon Serveur"

# Dans l'inventaire
name: "&6%zmenu_global_placeholders_server-name%"
```

### Placeholders de temps

| Placeholder | Description | Exemple de sortie |
|-------------|-------------|-------------------|
| `%zmenu_time_unix_timestamp%` | Timestamp Unix actuel | `1704067200` |
| `%zmenu_time_next_day_unix_timestamp%` | Timestamp Unix de demain | `1704153600` |
| `%zmenu_time_today_start_unix_timestamp%` | Timestamp du debut d'aujourd'hui | `1704067200` |

### Placeholders de statistiques

| Placeholder | Description | Exemple de sortie |
|-------------|-------------|-------------------|
| `%zmenu_statistic_hours_played%` | Heures jouees (arrondi) | `42` |
| `%zmenu_statistic_time_played%` | Temps de jeu formate | `1j 18h 30m` |

## Integration PlaceholderAPI

zMenu supporte entierement PlaceholderAPI. Tout placeholder PAPI fonctionne dans :
- Titres d'inventaire
- Noms d'items
- Lore d'items
- Messages
- Exigences
- Actions

### Expansions PlaceholderAPI populaires

Installez les expansions avec : `/papi ecloud download <nom>`

| Expansion | Placeholders | Exemple |
|-----------|-------------|---------|
| Player | `%player_name%`, `%player_health%`, `%player_level%` | `%player_name%` → `Notch` |
| Vault | `%vault_eco_balance%`, `%vault_eco_balance_formatted%` | `%vault_eco_balance%` → `1500.00` |
| Statistic | `%statistic_deaths%`, `%statistic_kills%` | `%statistic_deaths%` → `42` |
| Server | `%server_online%`, `%server_max_players%` | `%server_online%` → `50` |
| LuckPerms | `%luckperms_prefix%`, `%luckperms_primary_group_name%` | `%luckperms_prefix%` → `[Admin]` |

### Utilisation de PlaceholderAPI

```yaml
items:
  profile:
    slot: 4
    item:
      material: PLAYER_HEAD
      playerHead: "%player_name%"
      name: "&6Profil de %player_name%"
      lore:
        - "&8&m─────────────────"
        - ""
        - "&7Sante : &c%player_health%&7/&c%player_max_health%"
        - "&7Niveau : &a%player_level%"
        - "&7Solde : &6$%vault_eco_balance_formatted%"
        - ""
        - "&7Kills : &a%statistic_player_kills%"
        - "&7Morts : &c%statistic_deaths%"
        - ""
        - "&8&m─────────────────"
```

## Placeholders locaux

Definissez des placeholders specifiques a un inventaire :

```yaml
# Dans votre fichier d'inventaire
local-placeholders:
  prix: "100"
  nom-item: "Epee speciale"

items:
  shop-item:
    item:
      name: "&6%nom-item%"
      lore:
        - "&7Prix : &a$%prix%"
```

## Cache des placeholders

Pour de meilleures performances, vous pouvez activer le cache des placeholders dans `config.yml` :

```yaml
# Activer le cache PlaceholderAPI
enable-cache-placeholder-api: true

# Duree du cache en ticks (20 ticks = 1 seconde)
cache-placeholder-api: 20
```

:::warning
Le cache signifie que les placeholders ne se mettront pas a jour instantanement. Activez-le uniquement si vous avez des problemes de performances et comprenez les implications.
:::

## Placeholders imbriques

Vous pouvez utiliser des placeholders a l'interieur d'autres placeholders :

```yaml
# Utilisation des donnees joueur dans les maths
lore:
  - "&7Double pieces : %zmenu_math_%zmenu_player_value_coins%*2%"
```

## Exigences avec placeholders

Utilisez des placeholders dans les exigences pour creer des conditions dynamiques :

```yaml
click-requirement:
  requirements:
    - type: placeholder
      value: "%vault_eco_balance%"
      compare: ">="
      number: 100
      deny:
        - type: message
          messages:
            - "&cVous avez besoin d'au moins 100$ !"
```

## Formatage des placeholders

### Nombres

Pour les nombres formates, utilisez les variantes `_formatted` quand disponibles :
- `%vault_eco_balance_formatted%` au lieu de `%vault_eco_balance%`
- `%zmenu_formatted_math_<expr>%` au lieu de `%zmenu_math_<expr>%`

### Couleurs dans les placeholders

Certains placeholders incluent des codes couleur. Pour les conserver :
```yaml
name: "%luckperms_prefix% %player_name%"  # Garde les couleurs
```

## Debugger les placeholders

Si les placeholders ne fonctionnent pas :

1. **Verifiez que PlaceholderAPI est installe**
   ```
   /papi info
   ```

2. **Testez le placeholder**
   ```
   /papi parse me %nom_placeholder%
   ```

3. **Verifiez que l'expansion est installee**
   ```
   /papi list
   ```

4. **Installez les expansions manquantes**
   ```
   /papi ecloud download <expansion>
   /papi reload
   ```

## Tableau de reference rapide

| Categorie | Placeholder | Description |
|-----------|-------------|-------------|
| Joueur | `%player%` | Nom du joueur |
| Page | `%page%` | Page actuelle |
| Page | `%maxPage%` | Page max |
| Math | `%zmenu_math_<expr>%` | Calculer expression |
| Donnees | `%zmenu_player_value_<cle>%` | Donnees joueur |
| Global | `%zmenu_global_placeholders_<cle>%` | Valeur globale |
| Temps | `%zmenu_time_unix_timestamp%` | Temps Unix |
| Stats | `%zmenu_statistic_hours_played%` | Heures jouees |

## Prochaines etapes

- Apprenez les [Placeholders globaux](./global-placeholders)
- Configurez les [Donnees joueur](./player-data) pour les valeurs personnalisees
- Creez des [Exigences](./buttons/button#requirements) dynamiques
