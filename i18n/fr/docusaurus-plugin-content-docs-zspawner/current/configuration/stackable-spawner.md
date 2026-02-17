---
sidebar_position: 3
title: Spawners Empilables
description: Configuration des Spawners Empilables dans zSpawner
---

# Spawners Empilables

Les Spawners Empilables permettent de combiner plusieurs spawners du même type d'entité en un seul bloc, augmentant les taux de spawn et l'efficacité.

## Comment Fonctionnent les Spawners Empilables

1. Placez un spawner sur le sol
2. Placez un autre spawner du **même type d'entité** dessus
3. Les spawners fusionnent en une pile
4. Les taux de spawn augmentent selon la quantité de la pile
5. Un hologramme affiche le nombre actuel de la pile

## Configuration

### Activer les Spawners Empilables

```yaml
stackableSpawner:
  enable: false  # Mettre à true pour activer
```

### Limite Globale

Quantité maximale de pile pour tous les types d'entités :

```yaml
stackableSpawner:
  globalLimit: 5
```

### Limites par Entité

Définissez des limites spécifiques pour différents types d'entités :

```yaml
stackableSpawner:
  limits:
    - SKELETON: 10
    - ZOMBIE: 8
    - BLAZE: 5
```

### Liste Noire d'Entités

Empêcher certaines entités d'être empilées :

```yaml
stackableSpawner:
  blacklist:
    - BLAZE
    - WITHER_SKELETON
```

### Liste Blanche d'Entités

Si spécifié, seules ces entités peuvent être empilées (vide = toutes autorisées) :

```yaml
stackableSpawner:
  whitelist: []  # Vide signifie toutes les entités autorisées
  # Ou spécifier des entités spécifiques :
  # whitelist:
  #   - ZOMBIE
  #   - SKELETON
```

### Affichage Hologramme

Configurez l'hologramme affiché au-dessus des spawners empilés :

```yaml
stackableSpawner:
  hologram: '&6x%amount% &f%entity%'
```

| Placeholder | Description |
|-------------|-------------|
| `%amount%` | Quantité actuelle de la pile |
| `%entity%` | Nom du type d'entité |

## Niveaux de Pile

Configurez le comportement de spawn pour chaque niveau de pile :

```yaml
stackableSpawner:
  levels:
    - stackAmount: 1
      delay: 200
      minSpawnDelay: 100
      maxSpawnDelay: 400
      spawnCount: 5
      maxNearbyEntities: 10
      requiredPlayerRange: 16
      spawnRange: 8

    - stackAmount: 2
      delay: 200
      minSpawnDelay: 100
      maxSpawnDelay: 400
      spawnCount: 6
      maxNearbyEntities: 10
      requiredPlayerRange: 16
      spawnRange: 8

    # ... continuer pour les niveaux de pile supérieurs
```

### Options de Niveau

| Option | Description |
|--------|-------------|
| `stackAmount` | Niveau de pile auquel cette configuration s'applique |
| `delay` | Délai de base entre les spawns (ticks) |
| `minSpawnDelay` | Délai aléatoire minimum (ticks) |
| `maxSpawnDelay` | Délai aléatoire maximum (ticks) |
| `spawnCount` | Nombre d'entités par spawn |
| `maxNearbyEntities` | Maximum d'entités avant pause du spawner |
| `requiredPlayerRange` | Distance joueur requise pour le spawn |
| `spawnRange` | Rayon où les entités peuvent apparaître |

## Exemple de Configuration

### Configuration de Base

```yaml
stackableSpawner:
  enable: true
  globalLimit: 5
  hologram: '&6x%amount% &f%entity%'

  limits:
    - SKELETON: 10
    - BLAZE: 3

  blacklist:
    - ENDER_DRAGON
    - WITHER

  whitelist: []

  levels:
    - stackAmount: 1
      delay: 200
      minSpawnDelay: 100
      maxSpawnDelay: 400
      spawnCount: 4
      maxNearbyEntities: 10
      requiredPlayerRange: 16
      spawnRange: 8

    - stackAmount: 2
      delay: 180
      minSpawnDelay: 90
      maxSpawnDelay: 360
      spawnCount: 6
      maxNearbyEntities: 12
      requiredPlayerRange: 18
      spawnRange: 8

    - stackAmount: 3
      delay: 160
      minSpawnDelay: 80
      maxSpawnDelay: 320
      spawnCount: 8
      maxNearbyEntities: 14
      requiredPlayerRange: 20
      spawnRange: 10
```

### Empilement Agressif

Pour les serveurs voulant un spawn plus rapide avec les piles :

```yaml
stackableSpawner:
  enable: true
  globalLimit: 10

  levels:
    - stackAmount: 1
      delay: 100
      minSpawnDelay: 50
      maxSpawnDelay: 200
      spawnCount: 6
      maxNearbyEntities: 15
      requiredPlayerRange: 20
      spawnRange: 10

    - stackAmount: 5
      delay: 80
      minSpawnDelay: 40
      maxSpawnDelay: 160
      spawnCount: 15
      maxNearbyEntities: 30
      requiredPlayerRange: 24
      spawnRange: 12
```

### Empilement Conservateur

Pour les serveurs voulant un spawn contrôlé :

```yaml
stackableSpawner:
  enable: true
  globalLimit: 3

  levels:
    - stackAmount: 1
      delay: 300
      minSpawnDelay: 200
      maxSpawnDelay: 600
      spawnCount: 3
      maxNearbyEntities: 6
      requiredPlayerRange: 12
      spawnRange: 6
```

## Conseils

### Équilibrer les Piles de Spawners

- **Réduire `globalLimit`** diminue le lag potentiel de trop d'entités
- **Augmenter `maxNearbyEntities`** permet plus de mobs mais peut impacter les performances
- **Augmenter `requiredPlayerRange`** pour répartir les joueurs sur les spawners

### Considérations de Performance

- Chaque niveau de pile devrait avoir des valeurs `spawnCount` raisonnables
- Considérez le TPS du serveur lors du réglage de `minSpawnDelay` et `maxSpawnDelay`
- Utilisez `blacklist` pour empêcher l'empilement de mobs gourmands en ressources

### Équilibre Économique

- Les spawners premium (limites de pile plus élevées) peuvent être vendus en boutique
- Les limites par entité permettent différents paliers de prix
- La quantité de pile affecte directement l'efficacité de la ferme
