---
sidebar_position: 3
title: Plugins supportes
description: Liste de tous les plugins officiellement supportes par zMenu
---

# Plugins supportes

zMenu s'integre avec de nombreux plugins Minecraft populaires pour etendre ses fonctionnalites. Cette page liste tous les plugins officiellement supportes et les fonctionnalites qu'ils activent.

## Plugins de placeholders

### PlaceholderAPI

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/placeholderapi.6245/)

PlaceholderAPI est fortement recommande pour zMenu. Il vous permet d'afficher des valeurs dynamiques dans vos inventaires, comme les statistiques des joueurs, les soldes economiques et bien plus encore.

**Fonctionnalites activees :**
- Utilisation de la syntaxe `%placeholder%` dans les noms d'items, lore et messages
- Des milliers d'expansions disponibles
- Analyse des placeholders en cache pour les performances

**Exemple :**
```yaml
item:
  material: DIAMOND
  name: "&6Menu de %player_name%"
  lore:
    - "&7Solde : &a$%vault_eco_balance%"
    - "&7Temps de jeu : &e%statistic_hours_played%h"
```

---

## Plugins d'economie

### Vault

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/vault.34315/)

Vault fournit une API d'economie unifiee que zMenu utilise pour les actions basees sur la monnaie.

**Fonctionnalites activees :**
- Action `currency-deposit`
- Action `currency-withdraw`
- Placeholders d'economie

---

## Plugins de permissions

### LuckPerms

**Telechargement** : [https://luckperms.net/](https://luckperms.net/)

L'integration LuckPerms permet des fonctionnalites avancees basees sur les permissions.

**Fonctionnalites activees :**
- Type d'exigence `luckperm`
- Action `luckperm-set` pour modifier les groupes des joueurs
- Exigences de vue basees sur les groupes

**Exemple :**
```yaml
click-requirement:
  requirements:
    - type: luckperm
      group: vip
      deny:
        - type: message
          messages:
            - "&cVous avez besoin du rang VIP pour utiliser ceci !"
```

---

## Plugins d'items personnalises

### ItemsAdder

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/itemsadder.73355/)

ItemsAdder vous permet d'utiliser des items personnalises avec textures dans vos menus.

**Utilisation :**
```yaml
item:
  material: ITEMSADDER:namespace:item_id
```

---

### Oraxen

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/oraxen.72448/)

Support Oraxen pour les items et modeles personnalises.

**Utilisation :**
```yaml
item:
  material: ORAXEN:item_id
```

---

### HeadDatabase

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/head-database.14280/)

HeadDatabase fournit des milliers de textures de tetes de joueurs personnalisees.

**Utilisation :**
```yaml
item:
  material: HEAD_DATABASE:12345
```

---

### Slimefun

**Telechargement** : [GitHub](https://github.com/Slimefun/Slimefun4)

Utilisez les items Slimefun dans vos menus.

**Utilisation :**
```yaml
item:
  material: SLIMEFUN:ITEM_ID
```

---

### MythicMobs

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/mythicmobs.5702/)

Integration MythicMobs pour les items personnalises.

**Utilisation :**
```yaml
item:
  material: MYTHICMOBS:item_id
```

---

### ExecutableItems

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/executableitems.77578/)

Support ExecutableItems pour les items speciaux.

**Utilisation :**
```yaml
item:
  material: EXECUTABLE_ITEM:item_id
```

---

### ExecutableBlocks

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/executableblocks.96914/)

Support ExecutableBlocks pour les blocs speciaux en tant qu'items.

---

### BreweryX

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/breweryx.114777/)

Integration BreweryX pour les items du systeme de brassage.

**Utilisation :**
```yaml
item:
  material: BREWERYX:recipe_name
```

---

## Plugins de tetes

### zHead

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/zhead.115717/)

Un autre plugin de textures de tetes par le meme developpeur.

**Utilisation :**
```yaml
item:
  material: ZHEAD:category:head_name
```

---

### HMCCosmetics

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/hmccosmetics.100107/)

Integration HMCCosmetics pour les items cosmetiques.

---

### MagicCosmetics

Integration MagicCosmetics pour les items cosmetiques.

---

## Plugins de metiers

### Jobs Reborn

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/jobs-reborn.4216/)

Integration Jobs Reborn pour les exigences basees sur les metiers.

**Fonctionnalites activees :**
- Type d'exigence `job` pour verifier les niveaux de metier

**Exemple :**
```yaml
click-requirement:
  requirements:
    - type: job
      job: Miner
      level: 10
```

---

## Plugins de marchands

### Shopkeepers

Integration avec le plugin Shopkeepers.

**Fonctionnalites activees :**
- Type d'action `shopkeeper`

---

## Plugins de paquets

### PacketEvents

**Telechargement** : [SpigotMC](https://www.spigotmc.org/resources/packetevents-api.80279/)

PacketEvents est requis pour le systeme de dialogues (Minecraft 1.20.5+).

**Fonctionnalites activees :**
- Support du systeme de dialogues
- Fonctionnalites UI avancees

---

## Tableau recapitulatif des plugins supportes

| Plugin | Categorie | Prefixe material | Fonctionnalite |
|--------|-----------|------------------|----------------|
| PlaceholderAPI | Placeholders | - | Valeurs dynamiques |
| Vault | Economie | - | Actions de monnaie |
| LuckPerms | Permissions | - | Exigences de groupe |
| ItemsAdder | Items personnalises | `ITEMSADDER:` | Items/textures personnalises |
| Oraxen | Items personnalises | `ORAXEN:` | Items/modeles personnalises |
| HeadDatabase | Tetes | `HEAD_DATABASE:` | Tetes personnalisees |
| Slimefun | Items personnalises | `SLIMEFUN:` | Items Slimefun |
| MythicMobs | Items personnalises | `MYTHICMOBS:` | Items MythicMobs |
| ExecutableItems | Items personnalises | `EXECUTABLE_ITEM:` | Items EI |
| BreweryX | Items personnalises | `BREWERYX:` | Items de brassage |
| zHead | Tetes | `ZHEAD:` | Tetes personnalisees |
| Jobs Reborn | Metiers | - | Exigences de metier |
| PacketEvents | Paquets | - | Systeme de dialogues |

## Utilisation des materiaux personnalises

Lors de l'utilisation de plugins d'items personnalises, le format de materiau suit generalement ce modele :

```yaml
item:
  material: PREFIXE_PLUGIN:identifiant_item
```

### Exemples :

```yaml
# ItemsAdder
item:
  material: ITEMSADDER:my_namespace:ruby

# Oraxen
item:
  material: ORAXEN:emerald_sword

# HeadDatabase
item:
  material: HEAD_DATABASE:1234

# Slimefun
item:
  material: SLIMEFUN:ELECTRIC_MOTOR

# MythicMobs
item:
  material: MYTHICMOBS:SkeletonKingSword
```

## Detection des plugins

zMenu detecte automatiquement les plugins installes et active leurs fonctionnalites. Vous n'avez rien a configurer - installez simplement les plugins et redemarrez votre serveur.

Pour verifier quels plugins zMenu a detectes, consultez la sortie de la console au demarrage du serveur ou utilisez la commande `/zm version`.
