---
sidebar_position: 4
title: Placeholders
description: Placeholders PlaceholderAPI disponibles dans zCookieClicker
---

# Placeholders

zCookieClicker fournit plusieurs placeholders via PlaceholderAPI pour afficher les informations des cookies dans les scoreboards, hologrammes et autres plugins.

## Prérequis

Pour utiliser ces placeholders, vous avez besoin de [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installé sur votre serveur.

## Placeholders Disponibles

| Placeholder | Description |
|-------------|-------------|
| `%zcookieclicker_cookie%` | Nombre de cookies du joueur (formaté) |
| `%zcookieclicker_cps%` | Cookies par seconde du joueur (formaté) |
| `%zcookieclicker_upgrade_<AMELIORATION>%` | Nombre d'une amélioration spécifique possédée |

## Placeholders d'Améliorations

Vous pouvez vérifier combien de chaque amélioration un joueur possède :

| Placeholder | Description |
|-------------|-------------|
| `%zcookieclicker_upgrade_MANUAL_CLICK%` | Clics Manuels possédés |
| `%zcookieclicker_upgrade_GRANDMA%` | Grand-mères possédées |
| `%zcookieclicker_upgrade_FARM%` | Fermes possédées |
| `%zcookieclicker_upgrade_FACTORY%` | Usines possédées |
| `%zcookieclicker_upgrade_MINE%` | Mines possédées |
| `%zcookieclicker_upgrade_BANK%` | Banques possédées |
| `%zcookieclicker_upgrade_TEMPLE%` | Temples possédés |
| `%zcookieclicker_upgrade_TOWER%` | Tours possédées |
| `%zcookieclicker_upgrade_TIME_MACHINE%` | Machines à Voyager dans le Temps possédées |
| `%zcookieclicker_upgrade_ANTIMATTER_CONDENSER%` | Condenseurs d'Antimatière possédés |
| `%zcookieclicker_upgrade_PRISM%` | Prismes possédés |
| `%zcookieclicker_upgrade_CHANCELLERY%` | Chancelleries possédées |
| `%zcookieclicker_upgrade_DIMENSIONAL_CORRIDOR%` | Couloirs Dimensionnels possédés |
| `%zcookieclicker_upgrade_CELESTIAL_OVENS%` | Fours Célestes possédés |

## Exemples d'Utilisation

### Scoreboard

Afficher les statistiques de cookies sur le scoreboard d'un joueur :

```yaml
lines:
  - "&6&lCookie Clicker"
  - ""
  - "&eCookies: &f%zcookieclicker_cookie%"
  - "&eCPS: &f%zcookieclicker_cps%"
  - ""
  - "&7Grand-mères: &f%zcookieclicker_upgrade_GRANDMA%"
  - "&7Fermes: &f%zcookieclicker_upgrade_FARM%"
```

### Hologramme

Afficher les statistiques de cookies au-dessus d'une zone cookie :

```yaml
lines:
  - "&6Cookie Clicker"
  - "&eCookies: &f%zcookieclicker_cookie%"
  - "&eCPS: &f%zcookieclicker_cps%/s"
```

### Format de Chat

Afficher les cookies dans le chat :

```yaml
format: "&7[&6%zcookieclicker_cookie% Cookies&7] &f%player%: %message%"
```

### Liste de Tab

Afficher le nombre de cookies dans la liste de tab :

```yaml
header: "&6Cookie Clicker"
footer: "&eCookies: %zcookieclicker_cookie% | CPS: %zcookieclicker_cps%"
```

## Placeholders Internes

zCookieClicker utilise aussi des placeholders internes dans ses fichiers GUI :

| Placeholder | Description |
|-------------|-------------|
| `%cookie%` | Nombre de cookies actuel (formaté) |
| `%cookie-per-seconds%` | Cookies par seconde (formaté) |
| `%price%` | Prix de l'amélioration |
| `%cps%` | Valeur CPS de l'amélioration |
| `%amount%` | Nombre d'améliorations possédées |
| `%upgrade-name%` | Nom d'affichage de l'amélioration |

Ces placeholders internes sont automatiquement remplacés dans les configurations d'inventaire.

## Formatage des Nombres

Tous les placeholders de nombres utilisent le format configuré dans `config.yml` :

```yaml
short-number-format:
  enabled: true
  decimal-format: "#.##"
  suffixes:
    - ""
    - "K"      # Milliers
    - "M"      # Millions
    - "Md"     # Milliards
    - "T"      # Billions
    - "Qa"     # Quadrillions
    - "Qi"     # Quintillions
    - "Sx"     # Sextillions
    - "Sp"     # Septillions
    - "Oc"     # Octillions
```

**Exemples :**
- `1000` → `1K`
- `1500000` → `1.5M`
- `2340000000` → `2.34Md`
