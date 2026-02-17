---
sidebar_position: 2
title: Spawners Virtuels
description: Configuration et utilisation des Spawners Virtuels dans zSpawner
---

# Spawners Virtuels

Les Spawners Virtuels sont le type de spawner le plus avancé dans zSpawner. Ils offrent une personnalisation extensive incluant l'auto-kill, l'auto-sell, des taux de drop personnalisés et la location d'emplacement.

## Comment Fonctionnent les Spawners Virtuels

Contrairement aux spawners traditionnels, les Spawners Virtuels :

1. **Génèrent des entités dans une zone contrôlée** - Les entités apparaissent dans une distance configurable
2. **Peuvent auto-kill les entités** - Tuent automatiquement les mobs générés
3. **Peuvent auto-vendre les drops** - Vendent les items directement (nécessite zShop)
4. **Stockent les items en interne** - Les items collectés sont stockés dans l'inventaire du spawner
5. **Supportent la location d'emplacement** - Permettent à d'autres joueurs d'utiliser votre spawner temporairement

## Configuration

### Paramètres de Base

```yaml
virtual:
  # Matériau utilisé pour le bloc du spawner virtuel
  material: LODESTONE

  # Nom affiché au-dessus du bloc spawner
  name: "&6x%amount%"

  defaultSpawnerOption:
    distance: 6              # Distance de spawn depuis le centre
    experienceMultiplier: 1  # Multiplicateur d'expérience
    lootMultiplier: 1        # Multiplicateur de drop de loot
    autoKill: false          # Auto-kill des entités générées
    autoSell: false          # Auto-vente des items droppés
    mobPerMinute: 0          # Max mobs par minute (0 = illimité)
    maxEntity: 1000          # Maximum total d'entités
    minDelay: 10000          # Délai min de spawn (ms)
    maxDelay: 15000          # Délai max de spawn (ms)
    minSpawn: 1              # Min entités par spawn
    maxSpawn: 2              # Max entités par spawn
    remaining: 1000000       # Spawns restants
    locationEnabled: false   # Activer la location d'emplacement
    location:
      enabled: false
      minTime: 10            # Temps min de location (minutes)
      maxTime: 120           # Temps max de location (minutes)
      price: 5000            # Prix par minute
```

### Détails des Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `distance` | Double | 6 | Rayon depuis le spawner où les entités peuvent apparaître |
| `experienceMultiplier` | Double | 1 | Multiplicateur pour les drops d'expérience |
| `lootMultiplier` | Double | 1 | Multiplicateur pour les drops de loot |
| `autoKill` | Boolean | false | Tuer automatiquement les entités générées |
| `autoSell` | Boolean | false | Vendre automatiquement les items (nécessite zShop) |
| `mobPerMinute` | Integer | 0 | Maximum de mobs générés par minute (0 = pas de limite) |
| `maxEntity` | Integer | 1000 | Maximum d'entités avant que le spawner s'arrête |
| `minDelay` | Integer | 10000 | Délai minimum entre les spawns (millisecondes) |
| `maxDelay` | Integer | 15000 | Délai maximum entre les spawns (millisecondes) |
| `minSpawn` | Integer | 1 | Minimum d'entités générées à la fois |
| `maxSpawn` | Integer | 2 | Maximum d'entités générées à la fois |
| `remaining` | Integer | 1000000 | Total de spawns restants avant épuisement |
| `locationEnabled` | Boolean | false | Activer la fonctionnalité de location d'emplacement |

## Drops Personnalisés

Définissez des drops personnalisés pour des types d'entités spécifiques :

```yaml
custom-virtual-drops:
  - entity: MAGMA_CUBE
    cancel-default-drop: true
    drops:
      - chance: 100
        min: 1
        max: 3
        item:
          material: MAGMA_CREAM

  - entity: BLAZE
    cancel-default-drop: false
    drops:
      - chance: 50
        min: 1
        max: 2
        item:
          material: BLAZE_ROD
      - chance: 10
        min: 1
        max: 1
        item:
          material: GLOWSTONE_DUST
```

| Option | Description |
|--------|-------------|
| `entity` | Type d'entité pour cette configuration de drop |
| `cancel-default-drop` | Si true, empêche les drops vanilla |
| `drops` | Liste des entrées de drop personnalisé |
| `chance` | Pourcentage de chance (0-100) pour ce drop |
| `min` | Quantité minimum d'item |
| `max` | Quantité maximum d'item |
| `item` | Configuration de l'item (supporte le format zMenu) |

## Location d'Emplacement

Permettez aux joueurs de louer des emplacements de spawner auprès des propriétaires.

### Activer la Location d'Emplacement

```yaml
spawner-location:
  enable: true
  minPrice: 1000    # Prix minimum par minute
  maxPrice: 10000   # Prix maximum par minute
```

### Paramètres de Location par Spawner

Dans les valeurs par défaut du spawner virtuel :

```yaml
defaultSpawnerOption:
  locationEnabled: false  # Activer pour ce spawner
  location:
    enabled: false
    minTime: 10           # Location minimum (minutes)
    maxTime: 120          # Location maximum (minutes)
    price: 5000           # Prix par minute
```

### Commandes Admin

Gérez les locations via des commandes :

```bash
# Définir la location pour un spawner
/zspawner location set <joueur> <clé_spawner> <minutes>

# Ajouter du temps à une location existante
/zspawner location add <joueur> <clé_spawner> <minutes>

# Retirer du temps d'une location
/zspawner location remove <joueur> <clé_spawner> <minutes>

# Voir les informations de location
/zspawner location info <joueur> <clé_spawner>

# Annuler/supprimer une location
/zspawner location clear <joueur> <clé_spawner>
```

## Items d'Amélioration

Les joueurs peuvent appliquer des items d'amélioration à leurs spawners virtuels. Configurez-les dans `option-items.yml` :

```yaml
items:
  MIN_DELAY:
    type: MIN_DELAY
    value: 10             # Montant à modifier
    max-value: 5000       # Limite de valeur minimum
    item:
      material: SUNFLOWER
      name: "#e5fa25Option Spawner&8: #fa9325Délai Min"
      lore:
        - ""
        - "#92bed8Information&8:"
        - "#8c8c8c• &7Réduit le délai minimum de spawn de &f10ms"
        - ""
        - "&7&oFaites clic droit sur votre spawner"
        - "&7&opour appliquer cette amélioration"
```

### Types d'Amélioration Disponibles

| Type | Effet |
|------|-------|
| `MIN_DELAY` | Réduit le délai minimum de spawn |
| `MAX_DELAY` | Réduit le délai maximum de spawn |
| `DISTANCE` | Modifie la distance de spawn |
| `EXPERIENCE_MULTIPLIER` | Augmente le multiplicateur d'expérience |
| `LOOT_MULTIPLIER` | Augmente le multiplicateur de loot |
| `MAX_ENTITY` | Augmente la limite maximum d'entités |
| `MIN_SPAWN` | Augmente le nombre minimum de spawn |
| `MAX_SPAWN` | Augmente le nombre maximum de spawn |
| `MOB_PER_MINUTE` | Modifie la limite de mobs par minute |
| `REMAINING` | Ajoute des spawns restants |

### Donner des Items d'Amélioration

```bash
/zspawner giveoption <joueur> MIN_DELAY
/zspawner giveoption <joueur> MAX_DELAY
```

## Intégration avec zShop

Quand zShop est installé, la fonctionnalité auto-sell devient disponible :

1. Activez auto-sell dans les options du spawner
2. Les items sont automatiquement vendus aux prix zShop
3. L'argent est déposé directement au joueur

```yaml
# Format du message de dépôt
deposit-reason: "Vente de x%amount% %item% pour %price% (Spawner)"
```

## Intégration avec zEssentials

Quand zEssentials est installé :

- Les items sont envoyés à la mailbox du joueur quand l'inventaire est plein
- Utile pour la collecte hors-ligne

## Intégration avec SuperiorSkyblock2

Quand SuperiorSkyblock2 est installé :

- Les membres de l'équipe d'île peuvent accéder aux spawners des autres
- Respecte les permissions d'île
- Suit la propriété des spawners par île

## Conseils et Bonnes Pratiques

### Optimisation des Performances

```yaml
defaultSpawnerOption:
  mobPerMinute: 60        # Limiter le taux de spawn
  maxEntity: 100          # Réduire le maximum d'entités
  minDelay: 15000         # Augmenter le délai minimum
  maxDelay: 30000         # Augmenter le délai maximum
```

### Configuration Économie Équilibrée

```yaml
defaultSpawnerOption:
  lootMultiplier: 1       # Loot standard
  experienceMultiplier: 1 # XP standard
  autoSell: false         # Nécessiter la vente manuelle
```

### Configuration Spawner Premium

```yaml
defaultSpawnerOption:
  lootMultiplier: 2.0
  experienceMultiplier: 1.5
  autoKill: true
  autoSell: true
  minDelay: 5000
  maxDelay: 10000
  maxSpawn: 4
```
