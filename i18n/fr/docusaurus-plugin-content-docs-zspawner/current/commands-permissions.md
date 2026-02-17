---
sidebar_position: 3
title: Commandes & Permissions
description: Liste complète de toutes les commandes et permissions pour zSpawner
---

# Commandes & Permissions

Cette page contient la liste complète de toutes les commandes et permissions disponibles dans zSpawner.

:::info Guide de Syntaxe
- `< >` indique un argument **requis**.
- `[ ]` indique un argument **optionnel**.
- `|` sépare plusieurs alias pour la même commande.
:::

---

## Commandes Principales

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/zspawner` | `spawner`, `sp`, `spawners` | `zspawner.use` | Ouvrir l'interface GUI des spawners |
| `/zspawner reload` | - | `zspawner.reload` | Recharger les fichiers de configuration |
| `/zspawner help` | - | `zspawner.help` | Afficher l'aide |

---

## Commandes de Gestion des Spawners

Commandes pour donner, ajouter et supprimer des spawners.

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zspawner give <type> <entité> <joueur> [silencieux]` | `zspawner.give` | Donner un item spawner à un joueur |
| `/zspawner add <entité> <joueur> [silencieux]` | `zspawner.add` | Ajouter un spawner GUI directement à un joueur |
| `/zspawner remove <joueur> <clé_spawner> [silencieux]` | `zspawner.remove` | Supprimer un spawner GUI d'un joueur |
| `/zspawner show [joueur] [page]` | `zspawner.show` | Afficher tous les spawners d'un joueur |

### Détails de la Commande Give

La commande `/zspawner give` accepte les types de spawners suivants :

| Type | Description |
|------|-------------|
| `CLASSIC` | Spawner traditionnel qui fonctionne comme vanilla |
| `GUI` | Spawner géré via l'interface `/zspawner` |
| `VIRTUAL` | Spawner avancé avec auto-kill, auto-sell, et plus |

**Exemples :**
```
/zspawner give classic zombie Maxlego08
/zspawner give gui skeleton Maxlego08 true
/zspawner give virtual blaze Maxlego08
```

---

## Commandes d'Options

Commandes pour gérer les options et améliorations des spawners.

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zspawner option <joueur> <clé_spawner> <option> <valeur>` | `zspawner.option` | Définir une option de spawner virtuel |
| `/zspawner giveoption <joueur> <option>` | `zspawner.give.option` | Donner un item d'amélioration à un joueur |

### Options Disponibles

Les options suivantes peuvent être modifiées avec la commande `/zspawner option` :

| Option | Type | Description |
|--------|------|-------------|
| `DISTANCE` | Double | Distance de spawn depuis le spawner |
| `EXPERIENCE_MULTIPLIER` | Double | Multiplicateur de gain d'expérience |
| `LOOT_MULTIPLIER` | Double | Multiplicateur de drop de loot |
| `AUTO_KILL` | Boolean | Activer/désactiver l'auto-kill |
| `AUTO_SELL` | Boolean | Activer/désactiver l'auto-sell |
| `DROP_LOOTS` | Boolean | Activer/désactiver les drops de loot |
| `MAX_ENTITY` | Integer | Nombre maximum d'entités de ce spawner |
| `MIN_DELAY` | Integer | Délai minimum de spawn (ms) |
| `MAX_DELAY` | Integer | Délai maximum de spawn (ms) |
| `MIN_SPAWN` | Integer | Minimum d'entités par spawn |
| `MAX_SPAWN` | Integer | Maximum d'entités par spawn |
| `MOB_PER_MINUTE` | Integer | Maximum de mobs générés par minute |
| `REMAINING` | Integer | Entités restantes à générer |

**Exemples :**
```
/zspawner option Maxlego08 zombie_1 AUTO_KILL true
/zspawner option Maxlego08 skeleton_2 MIN_DELAY 5000
/zspawner option Maxlego08 blaze_1 LOOT_MULTIPLIER 2.0
```

---

## Commandes de Location

Commandes pour gérer les locations d'emplacement de spawner.

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zspawner location` | `zspawner.location.admin` | Commande parente de gestion des locations |
| `/zspawner location set <joueur> <clé_spawner> <minutes>` | `zspawner.location.admin` | Définir la location pour un spawner |
| `/zspawner location add <joueur> <clé_spawner> <minutes>` | `zspawner.location.admin` | Ajouter du temps à une location |
| `/zspawner location remove <joueur> <clé_spawner> <minutes>` | `zspawner.location.admin` | Retirer du temps d'une location |
| `/zspawner location info <joueur> <clé_spawner>` | `zspawner.location.admin` | Afficher les informations de location |
| `/zspawner location clear <joueur> <clé_spawner>` | `zspawner.location.admin` | Annuler une location |

**Exemples :**
```
/zspawner location set Maxlego08 zombie_1 60
/zspawner location add Maxlego08 zombie_1 30
/zspawner location info Maxlego08 zombie_1
/zspawner location clear Maxlego08 zombie_1
```

---

## Toutes les Permissions

### Permissions Joueur

| Permission | Description |
|------------|-------------|
| `zspawner.use` | Accéder à l'interface GUI des spawners (`/zspawner`) |
| `zspawner.help` | Voir les commandes d'aide |

### Permissions Admin

| Permission | Description |
|------------|-------------|
| `zspawner.reload` | Recharger les fichiers de configuration |
| `zspawner.give` | Donner des spawners aux joueurs |
| `zspawner.give.option` | Donner des items d'amélioration aux joueurs |
| `zspawner.add` | Ajouter des spawners GUI aux joueurs |
| `zspawner.remove` | Supprimer des spawners des joueurs |
| `zspawner.option` | Modifier les options des spawners virtuels |
| `zspawner.show` | Voir tous les spawners de n'importe quel joueur |
| `zspawner.location.admin` | Gérer les locations d'emplacement |

### Permissions de Bypass

| Permission | Description |
|------------|-------------|
| `zspawner.bypass` | Contourner les restrictions d'accès aux spawners (peut ouvrir les spawners virtuels) |

---

## Exemples de Commandes

### Configuration d'un Spawner Virtuel

```bash
# Donner un spawner virtuel à un joueur
/zspawner give virtual zombie Maxlego08

# Après que le joueur l'a placé, configurer les options
/zspawner option Maxlego08 zombie_1 AUTO_KILL true
/zspawner option Maxlego08 zombie_1 LOOT_MULTIPLIER 1.5
/zspawner option Maxlego08 zombie_1 MIN_DELAY 8000
```

### Gestion des Locations

```bash
# Configurer une location de 2 heures
/zspawner location set Maxlego08 zombie_1 120

# Vérifier le statut de location
/zspawner location info Maxlego08 zombie_1

# Prolonger la location de 30 minutes
/zspawner location add Maxlego08 zombie_1 30

# Annuler la location
/zspawner location clear Maxlego08 zombie_1
```

### Distribution en Masse de Spawners

```bash
# Donner des spawners silencieusement (pas de messages aux joueurs)
/zspawner give gui skeleton Joueur1 true
/zspawner give gui skeleton Joueur2 true
/zspawner give gui skeleton Joueur3 true
```
