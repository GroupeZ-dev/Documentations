---
sidebar_position: 21
title: Module Warp
description: Système de warp serveur avec affichage optionnel par inventaire
---

# Module Warp

**Fichier :** `modules/warp/config.yml`

Le module Warp fournit un système de points de warp à l'échelle du serveur qui permet aux administrateurs de créer des emplacements nommés et aux joueurs de s'y téléporter. Les warps peuvent être parcourus via une interface graphique d'**inventaire zMenu** ou listés directement dans le **chat**, selon votre configuration. Ce module est idéal pour créer des points de téléportation de hub, des zones d'événements, des boutiques ou tout emplacement fréquemment visité sur votre serveur.

---

## Configuration Source

```yaml
enable: true
enable-inventory: false
enable-no-argument-message: true
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Warp |
| `enable-inventory` | Boolean | `false` | Lorsque `true`, l'exécution de `/warps` ouvre une interface graphique d'inventaire zMenu (`warps.yml`) affichant tous les warps disponibles. Lorsque `false`, les warps sont listés dans le chat à la place |
| `enable-no-argument-message` | Boolean | `true` | Lorsque `true` et que `enable-inventory` est `false`, l'exécution de `/warp` sans arguments envoie un message dans le chat listant tous les warps disponibles |

:::info Modes d'Affichage
- **Mode inventaire** (`enable-inventory: true`) -- L'exécution de `/warps` ouvre un inventaire interactif zMenu défini dans `warps.yml`. Les joueurs peuvent cliquer sur les éléments de warp pour se téléporter. Cela offre une expérience de navigation riche et visuelle.
- **Mode chat** (`enable-inventory: false`, `enable-no-argument-message: true`) -- L'exécution de `/warp` sans arguments liste tous les warps disponibles directement dans le chat du joueur. Les joueurs peuvent ensuite utiliser `/warp <name>` pour se téléporter.
:::

:::tip
Si vous activez le mode inventaire, assurez-vous que le fichier d'inventaire zMenu `warps.yml` est correctement configuré. Le plugin tentera d'ouvrir cet inventaire lorsque les joueurs utiliseront la commande `/warps`.
:::

:::warning
Lorsque `enable-inventory` et `enable-no-argument-message` sont tous les deux définis à `false`, l'exécution de `/warp` sans arguments ne produira aucune sortie. Assurez-vous qu'au moins une option d'affichage est activée pour que les joueurs puissent découvrir les warps disponibles.
:::

---

## Fonctionnement

1. Un administrateur crée un point de warp à son emplacement actuel en utilisant `/setwarp <name>`.
2. Le warp est sauvegardé et devient disponible pour tous les joueurs disposant de la permission appropriée.
3. Les joueurs se téléportent à un warp en utilisant `/warp <name>`.
4. Si `enable-inventory` est `true`, les joueurs peuvent parcourir tous les warps dans une interface graphique en exécutant `/warps`.
5. Si `enable-inventory` est `false` et `enable-no-argument-message` est `true`, l'exécution de `/warp` sans arguments liste tous les warps dans le chat.
6. Les administrateurs peuvent supprimer un warp en utilisant `/delwarp <name>`.

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/warp` | `w` | `essentials.warp` | Se téléporter à un point de warp nommé |
| `/setwarp` | `wcreate` | `essentials.warp.set` | Créer un nouveau warp à votre emplacement actuel |
| `/delwarp` | `wdelete` | `essentials.warp.del` | Supprimer un warp existant |
| `/warps` | `wlist` | `essentials.warps` | Lister tous les warps disponibles (chat ou inventaire selon la configuration) |

Pour la liste complète des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Permissions Associées

| Permission | Description |
|------------|-------------|
| `essentials.warp` | Permet de se téléporter aux points de warp en utilisant `/warp` |
| `essentials.warp.set` | Permet de créer de nouveaux points de warp en utilisant `/setwarp` |
| `essentials.warp.del` | Permet de supprimer des points de warp en utilisant `/delwarp` |
| `essentials.warps` | Permet de lister tous les points de warp en utilisant `/warps` |

---

## Exemple d'Utilisation

### Mode Inventaire

Activez le navigateur de warps basé sur l'interface graphique pour une expérience conviviale :

```yaml
enable: true
enable-inventory: true
enable-no-argument-message: true
```

Les joueurs exécutant `/warps` verront un inventaire zMenu avec tous les warps configurés. Cliquer sur un élément de warp téléporte le joueur à cet emplacement.

### Mode Chat

Gardez les choses simples avec une liste de warps basée sur le chat :

```yaml
enable: true
enable-inventory: false
enable-no-argument-message: true
```

Les joueurs exécutant `/warp` sans arguments recevront un message dans le chat listant tous les noms de warps disponibles. Ils peuvent ensuite utiliser `/warp <name>` pour se téléporter.
