---
sidebar_position: 4
title: Spawners Silk Touch
description: Configuration du minage de spawner avec Silk Touch dans zSpawner
---

# Spawners Silk Touch

zSpawner permet aux joueurs de miner les spawners en utilisant des outils Silk Touch, leur donnant le spawner comme item au lieu de le détruire.

## Configuration

### Activer le Minage Silk Touch

```yaml
silkSpawner:
  enable: false  # Mettre à true pour activer
```

### Liste Blanche d'Outils

Définissez quels outils peuvent miner les spawners :

```yaml
silkSpawner:
  whitelistMaterial:
    - GOLDEN_PICKAXE
    - DIAMOND_PICKAXE
    - NETHERITE_PICKAXE
```

### Exiger l'Enchantement Silk Touch

Optionnellement exiger l'enchantement Silk Touch sur l'outil :

```yaml
silkSpawner:
  needSilkTouchEnchant: true
```

### Support des Spawners Naturels

Permettre le minage des spawners vanilla (naturels) :

```yaml
silkSpawner:
  silkNaturalSpawner: true
```

### Conversion de Type de Spawner

Lors du minage de spawners naturels, les convertir en un type zSpawner spécifique :

```yaml
silkSpawner:
  naturelSpawnerInto: CLASSIC
```

Types disponibles :
- `CLASSIC` - Spawner traditionnel
- `GUI` - Spawner géré par GUI
- `VIRTUAL` - Spawner virtuel avec fonctionnalités avancées

## Exemple de Configuration Complète

### Configuration de Base

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - DIAMOND_PICKAXE
    - NETHERITE_PICKAXE
  needSilkTouchEnchant: true
  silkNaturalSpawner: true
  naturelSpawnerInto: CLASSIC
```

### Configuration Premium (Sans Silk Touch Requis)

Pour les joueurs VIP avec des pioches spéciales :

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - GOLDEN_PICKAXE  # Outil exclusif VIP
  needSilkTouchEnchant: false
  silkNaturalSpawner: true
  naturelSpawnerInto: GUI
```

### Configuration Stricte

Seulement des outils spécifiques avec Silk Touch :

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - NETHERITE_PICKAXE
  needSilkTouchEnchant: true
  silkNaturalSpawner: false  # Pas de minage de spawner naturel
  naturelSpawnerInto: CLASSIC
```

## Détails du Comportement

### Minage de Spawners zSpawner

Quand un joueur mine un spawner placé par zSpawner :

1. L'outil doit être dans la liste blanche
2. Si `needSilkTouchEnchant: true`, l'outil doit avoir Silk Touch
3. Le spawner drop avec son type original (CLASSIC, GUI, ou VIRTUAL)
4. Les paramètres originaux du spawner sont préservés

### Minage de Spawners Naturels

Quand un joueur mine un spawner vanilla/naturel :

1. `silkNaturalSpawner` doit être `true`
2. L'outil doit être dans la liste blanche
3. Si `needSilkTouchEnchant: true`, l'outil doit avoir Silk Touch
4. Le spawner est converti au type spécifié dans `naturelSpawnerInto`
5. Les paramètres par défaut du spawner sont appliqués

## Cas d'Utilisation

### Serveur Économie

Permettre à tous les joueurs de miner les spawners pour le commerce :

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - IRON_PICKAXE
    - GOLDEN_PICKAXE
    - DIAMOND_PICKAXE
    - NETHERITE_PICKAXE
  needSilkTouchEnchant: true
  silkNaturalSpawner: true
  naturelSpawnerInto: CLASSIC
```

### Serveur Skyblock

Convertir les spawners naturels en type GUI pour la gestion :

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - DIAMOND_PICKAXE
    - NETHERITE_PICKAXE
  needSilkTouchEnchant: true
  silkNaturalSpawner: true
  naturelSpawnerInto: GUI
```

### Serveur Prison

Convertir en spawners virtuels pour l'auto-collecte :

```yaml
silkSpawner:
  enable: true
  whitelistMaterial:
    - NETHERITE_PICKAXE
  needSilkTouchEnchant: false
  silkNaturalSpawner: true
  naturelSpawnerInto: VIRTUAL
```

## Conseils

### Recommandations d'Outils

- Utilisez la **Pioche en Or** comme outil de minage exclusif VIP (plus rapide mais moins durable)
- Utilisez la **Pioche en Netherite** comme exigence standard pour l'équilibre
- Envisagez de créer des outils personnalisés avec du lore pour le minage de spawner

### Considérations d'Équilibre

- Exiger Silk Touch ajoute un coût d'enchantement
- Limiter à des outils spécifiques crée une progression
- Le minage de spawners naturels affecte le gameplay d'exploration

### Intégration avec d'Autres Fonctionnalités

- Combiné avec les [Spawners Empilables](./stackable-spawner), les joueurs peuvent collecter et empiler
- Fonctionne avec les limites de chunk pour contrôler la densité des spawners
- La conversion en type GUI permet une gestion centralisée des spawners
