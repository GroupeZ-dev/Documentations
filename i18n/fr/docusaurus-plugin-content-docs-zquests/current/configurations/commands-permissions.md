---
sidebar_position: 5
title: Commandes et Permissions
description: Toutes les commandes et permissions disponibles dans zQuests
---

# Commandes et Permissions

Cette page liste toutes les commandes et permissions disponibles dans zQuests.

## Alias de commandes

La commande principale `/zquests` a les alias par defaut suivants configures dans `config.yml` :

- `/quests`
- `/quest`
- `/q`

Vous pouvez les personnaliser dans `config.yml` :

```yaml
main-command-aliases:
  - quests
  - quest
  - q
```

## Commandes

### Commandes joueur

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zquests` | `zquests.use` | Ouvrir l'inventaire des quetes |

### Commandes admin

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zquests help` | `zquests.help` | Afficher le message d'aide |
| `/zquests reload` | `zquests.reload` | Recharger les fichiers de configuration |
| `/zquests reload-inventories` | `zquests.reload` | Recharger uniquement les fichiers d'inventaires |

### Gestion des quetes

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zquests start <joueur> <quete>` | `zquests.start` | Demarrer une quete pour un joueur |
| `/zquests start-all <joueur>` | `zquests.start.all` | Demarrer toutes les quetes pour un joueur |
| `/zquests complete <joueur> <quete>` | `zquests.complete` | Completer une quete pour un joueur |
| `/zquests complete-all <joueur> <groupe>` | `zquests.complete.all` | Completer toutes les quetes d'un groupe |
| `/zquests restart <joueur> <quete>` | `zquests.restart` | Redemarrer une quete pour un joueur |
| `/zquests delete <joueur> <quete>` | `zquests.delete` | Supprimer une quete pour un joueur |
| `/zquests delete-all <joueur>` | `zquests.delete.all` | Supprimer toutes les quetes pour un joueur |

### Gestion de la progression

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zquests set-progress <joueur> <quete> <montant>` | `zquests.set.progress` | Definir la progression de la quete |
| `/zquests add-progress <joueur> <quete> <montant>` | `zquests.add.progress` | Ajouter a la progression de la quete |
| `/zquests progress-inventory <joueur> [citoyen]` | `zquests.progress.inventory` | Progression des quetes INVENTORY_CONTENT |

### Gestion des favoris

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zquests set-favorite <joueur> <quete> <true/false>` | `zquests.set.favorite` | Definir le statut favori de la quete |
| `/zquests add-favorite <joueur>` | `zquests.add.favorite` | Ajouter a la limite de favoris |
| `/zquests set-favorite-limit <joueur> <montant>` | `zquests.set.favorite.limit` | Definir la limite de favoris |
| `/zquests set-favorite-type <joueur> <type>` | `zquests.set.favorite.type` | Definir le type de favori |

### Recompenses

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zquests reward <joueur> <quete>` | `zquests.reward` | Donner manuellement les recompenses de quete |

### Hologramme

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zquests refresh-hologram` | `zquests.refresh.hologram` | Rafraichir tous les hologrammes |

### Debug

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zquests show <joueur> <quete>` | `zquests.show` | Afficher les details de la quete |

## Exemples de commandes

### Demarrer des quetes

```bash
# Demarrer une quete specifique pour un joueur
/zquests start Notch casseur-pierre-1

# Demarrer toutes les quetes auto-accept pour un joueur
/zquests start-all Notch
```

### Gerer la progression

```bash
# Definir une valeur exacte de progression
/zquests set-progress Notch casseur-pierre-1 250

# Ajouter a la progression (utile pour les quetes VOTE)
/zquests add-progress Notch vote-quotidien 1

# Progression des quetes de contenu d'inventaire
/zquests progress-inventory Notch bucheron
```

### Completer des quetes

```bash
# Completer une quete pour un joueur
/zquests complete Notch casseur-pierre-1

# Completer toutes les quetes du groupe "minage"
/zquests complete-all Notch minage
```

### Reinitialiser des quetes

```bash
# Redemarrer une quete (garde l'historique, reinitialise la progression)
/zquests restart Notch casseur-pierre-1

# Supprimer completement une quete
/zquests delete Notch casseur-pierre-1

# Supprimer toutes les quetes pour un joueur
/zquests delete-all Notch
```

### Gerer les favoris

```bash
# Definir une quete comme favorite
/zquests set-favorite Notch casseur-pierre-1 true

# Retirer des favoris
/zquests set-favorite Notch casseur-pierre-1 false

# Definir la limite de favoris
/zquests set-favorite-limit Notch 5
```

## Liste des permissions

### Permissions de base

| Permission | Description | Par defaut |
|------------|-------------|---------|
| `zquests.use` | Acceder aux commandes de quetes | `true` |
| `zquests.help` | Voir le message d'aide | `true` |

### Permissions admin

| Permission | Description | Par defaut |
|------------|-------------|---------|
| `zquests.reload` | Recharger la configuration | `op` |
| `zquests.start` | Demarrer des quetes pour d'autres | `op` |
| `zquests.start.all` | Demarrer toutes les quetes | `op` |
| `zquests.complete` | Completer des quetes pour d'autres | `op` |
| `zquests.complete.all` | Completer des groupes de quetes | `op` |
| `zquests.delete` | Supprimer les quetes des joueurs | `op` |
| `zquests.delete.all` | Supprimer toutes les quetes des joueurs | `op` |
| `zquests.restart` | Redemarrer les quetes des joueurs | `op` |
| `zquests.set.progress` | Definir la progression des quetes | `op` |
| `zquests.add.progress` | Ajouter a la progression des quetes | `op` |
| `zquests.set.favorite` | Definir le statut favori | `op` |
| `zquests.add.favorite` | Ajouter a la limite de favoris | `op` |
| `zquests.set.favorite.limit` | Definir la limite de favoris | `op` |
| `zquests.set.favorite.type` | Definir le type de favori | `op` |
| `zquests.reward` | Donner les recompenses de quetes | `op` |
| `zquests.show` | Voir les details des quetes | `op` |
| `zquests.progress.inventory` | Progression des quetes d'inventaire | `op` |
| `zquests.refresh.hologram` | Rafraichir les hologrammes | `op` |

## Pages d'inventaire basees sur les permissions

Vous pouvez configurer differentes pages de demarrage basees sur les permissions dans `config.yml` :

```yaml
# Permission que le joueur doit avoir pour changer de page avec la commande principale
main-command-page:
  - permission: "quests.page.2"
    inventory: "quests"
    page: 2
    priority: 1
  - permission: "quests.page.3"
    inventory: "quests"
    page: 3
    priority: 2
```

Les joueurs avec `quests.page.3` ouvriront la page 3 de l'inventaire de quetes en utilisant `/quests`.

## Auto-completion

Toutes les commandes supportent l'auto-completion :
- Les noms de joueurs sont auto-completes
- Les noms de quetes sont auto-completes depuis les quetes chargees
- Les noms de groupes sont auto-completes pour les commandes pertinentes

## Utilisation console

Toutes les commandes admin peuvent etre utilisees depuis la console :

```bash
# Depuis la console
zquests start Notch casseur-pierre-1
zquests add-progress Notch vote-quotidien 1
zquests complete Notch quete-tutoriel
```

## Integration avec d'autres plugins

### Plugins de vote

Ajouter la progression aux quetes de vote quand les joueurs votent :

```bash
# Dans la recompense de votre plugin de vote
/zquests add-progress %player% quete-vote 1
```

### Citizens NPCs

Declencher la progression de quete lors de l'interaction avec un PNJ :

```bash
# Commande de clic Citizens
/zquests progress-inventory %player% nom_pnj
```

### Scripts personnalises

Utilisez les commandes dans des scripts ou blocs de commande :

```bash
# Donner la progression de quete pour des evenements personnalises
execute as @p run zquests add-progress @p quete-personnalisee 1
```

## Prochaines etapes

- Configurez les [Inventaires](./inventories) pour l'affichage des quetes
- Configurez les [Waypoints & Hologrammes](./waypoints-holograms)
- Decouvrez les [Placeholders](./placeholders)
