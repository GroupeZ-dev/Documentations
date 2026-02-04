---
sidebar_position: 16
title: Module Spawn
description: Gestion du spawn serveur avec comportement de réapparition configurable
---

# Module Spawn

**Fichier :** `modules/spawn/config.yml`

Le module Spawn gère le point de spawn du serveur et contrôle la manière dont les joueurs sont gérés lors de la **réapparition** et de la **connexion**. Il offre un contrôle précis sur les priorités de réapparition (lit, home, ancre de réapparition) et vous permet de configurer si les joueurs sont téléportés au spawn lors de leur première connexion ou à chaque connexion.

---

## Configuration Source

```yaml
enable: true
respawn-listener-priority: highest  # none, lowest, low, normal, high, highest
spawn-join-listener-priority: highest
respawn-at-anchor: false
respawn-at-home: false
respawn-at-bed: true
teleport-at-spawn-on-join: false
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Spawn |
| `respawn-listener-priority` | String | `highest` | La priorité d'événement Bukkit pour le listener de réapparition. Valeurs acceptées : `none`, `lowest`, `low`, `normal`, `high`, `highest`. Utilisez `none` pour désactiver entièrement le listener de réapparition |
| `spawn-join-listener-priority` | String | `highest` | La priorité d'événement Bukkit pour le listener de connexion qui gère la téléportation au spawn. Valeurs acceptées : `none`, `lowest`, `low`, `normal`, `high`, `highest`. Utilisez `none` pour désactiver entièrement le listener de connexion |
| `respawn-at-anchor` | Boolean | `false` | Si `true`, les joueurs réapparaîtront à leur ancre de réapparition (Nether) lorsqu'elle est disponible |
| `respawn-at-home` | Boolean | `false` | Si `true`, les joueurs réapparaîtront à leur emplacement home (défini via `/sethome`) lorsqu'il est disponible |
| `respawn-at-bed` | Boolean | `true` | Si `true`, les joueurs réapparaîtront à l'emplacement de leur lit lorsqu'il est disponible |
| `teleport-at-spawn-on-join` | Boolean | `false` | Si `true`, les joueurs sont téléportés au point de spawn du serveur à chaque connexion |

:::info Priorité du Listener
Les options `respawn-listener-priority` et `spawn-join-listener-priority` contrôlent l'ordre dans lequel zEssentials traite les événements de réapparition et de connexion par rapport aux autres plugins. Les définir sur `highest` garantit que zEssentials a le dernier mot. Définissez-les sur `none` pour désactiver complètement ce listener, laissant d'autres plugins le gérer à la place.
:::

---

## Comportement de Réapparition

Lorsqu'un joueur meurt et réapparaît, le plugin vérifie les emplacements suivants par ordre de priorité :

1. **Ancre de Réapparition** -- Si `respawn-at-anchor` est `true` et que le joueur a une ancre de réapparition valide définie.
2. **Home** -- Si `respawn-at-home` est `true` et que le joueur a un emplacement home défini.
3. **Lit** -- Si `respawn-at-bed` est `true` et que le joueur a un lit de réapparition valide.
4. **Spawn du Serveur** -- Si aucune des conditions ci-dessus n'est remplie, le joueur réapparaît au point de spawn du serveur.

:::tip
Un seul emplacement de réapparition est utilisé par mort. La première option valide dans la chaîne de priorité ci-dessus est sélectionnée. Si vous souhaitez que les joueurs réapparaissent toujours au spawn, définissez les trois options (`respawn-at-anchor`, `respawn-at-home`, `respawn-at-bed`) sur `false`.
:::

:::warning
Si `respawn-at-bed` est `true` (la valeur par défaut), les joueurs ayant un lit valide réapparaîtront à celui-ci plutôt qu'au spawn du serveur. Il s'agit du comportement vanilla standard. Définissez-le sur `false` si vous souhaitez remplacer ce comportement pour votre serveur.
:::

---

## Fonctionnement

1. Un administrateur définit le point de spawn en utilisant `/setspawn` à l'emplacement souhaité.
2. Optionnellement, un spawn de première connexion est défini en utilisant `/setfirstspawn` pour les nouveaux joueurs.
3. Lorsqu'un joueur meurt, le listener de réapparition évalue les options de réapparition configurées et téléporte le joueur en conséquence.
4. Lorsqu'un joueur se connecte, si `teleport-at-spawn-on-join` est `true`, il est téléporté au spawn du serveur.
5. Les joueurs se connectant pour la première fois sont téléportés à l'emplacement du premier spawn (si configuré), indépendamment du paramètre `teleport-at-spawn-on-join`.

---

## Commandes Associées

| Commande | Permission | Description |
|----------|------------|-------------|
| `/spawn` | `essentials.spawn` | Se téléporter au point de spawn du serveur |
| `/setspawn` | `essentials.setspawn` | Définir le point de spawn du serveur à votre position actuelle |
| `/firstspawn` | `essentials.firstspawn` | Se téléporter au point de spawn de première connexion |
| `/setfirstspawn` | `essentials.setfirstspawn` | Définir le point de spawn de première connexion à votre position actuelle |

Pour la liste complète des commandes, consultez [Commandes & Permissions](../commands-permissions).

---

## Configurations Courantes

### Toujours Réapparaître au Spawn

Pour forcer tous les joueurs à réapparaître au spawn du serveur indépendamment des lits, ancres ou homes :

```yaml
respawn-at-anchor: false
respawn-at-home: false
respawn-at-bed: false
```

### Téléportation au Spawn à Chaque Connexion

Pour téléporter les joueurs au spawn à chaque connexion (utile pour les serveurs lobby) :

```yaml
teleport-at-spawn-on-join: true
```

### Laisser d'Autres Plugins Gérer la Réapparition

Pour désactiver la gestion de réapparition de zEssentials et laisser un autre plugin (par ex., un plugin de mini-jeu) contrôler le comportement de réapparition :

```yaml
respawn-listener-priority: none
```

:::note
Définir la priorité du listener sur `none` désactive complètement ce listener. C'est différent de le définir sur `lowest`, qui traite quand même l'événement mais permet à d'autres plugins de le remplacer.
:::
