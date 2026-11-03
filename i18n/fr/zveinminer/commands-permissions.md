---
title: Commandes & Permissions
description: Liste complète de toutes les commandes et permissions pour zVeinMiner
---

# Commandes & Permissions

Cette page contient la liste complète de toutes les commandes et permissions disponibles dans zVeinMiner.

<CalloutContainer type="info">

<CalloutTitle>Guide de Syntaxe</CalloutTitle>

<CalloutDescription>
- `< >` indique un argument **requis**.
- `[ ]` indique un argument **optionnel**.
- `|` sépare plusieurs alias pour la même commande ou sous-commande.
</CalloutDescription>

</CalloutContainer>

---

## Commande Principale

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/zveinminer` | `veinminer`, `zvm` | `zveinminer.use` | Afficher la liste des sous-commandes auxquelles vous avez accès |

Exécuter `/zveinminer` sans argument affiche chaque sous-commande dont vous possédez la permission, avec sa syntaxe et sa description. Chaque sous-commande ne vérifie que sa propre permission.

---

## Commandes Joueur

Accordées à tout le monde par défaut.

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zveinminer toggle\|t` | `zveinminer.toggle` | Activer ou désactiver le vein mining pour vous-même |
| `/zveinminer list\|l` | `zveinminer.list` | Lister les presets disponibles avec leur taille et leurs tags |
| `/zveinminer info\|i` | `zveinminer.info` | Afficher la taille de filon et les tags de l'item dans votre main principale |
| `/zveinminer stats\|statistics` | `zveinminer.stats` | Afficher vos statistiques de vein mining (blocs minés et filons minés) |

- `toggle` est enregistré par joueur, votre choix est donc conservé d'une session à l'autre.
- `info` affiche les données **effectives** de l'item : les valeurs stockées sur l'item, ou celles héritées de son preset. Si l'item n'a aucune donnée de vein miner (ou si sa taille de filon effective vaut `0`), un message « aucune donnée » est affiché.

---

## Commandes de Gestion des Items

Réservées aux opérateurs par défaut. Toutes agissent sur l'item tenu dans votre **main principale**, sauf `give`.

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zveinminer apply\|a <preset>` | `zveinminer.apply` | Lier un preset à l'item tenu en main |
| `/zveinminer set\|st <preset>` | `zveinminer.set` | Copier la taille et les tags d'un preset sur l'item tenu en main |
| `/zveinminer add\|ad <tag>` | `zveinminer.add` | Ajouter un tag (tag de blocs ou matériau de bloc) à l'item tenu en main |
| `/zveinminer remove\|r <tag>` | `zveinminer.remove` | Retirer un tag de l'item tenu en main |
| `/zveinminer size\|s [size]` | `zveinminer.size` | Afficher ou modifier la taille de filon de l'item tenu en main |
| `/zveinminer give\|g <player> <preset> [material]` | `zveinminer.give` | Donner à un joueur un item avec un preset |

### apply ou set

Les deux commandes prennent un nom de preset défini dans `config.yml` (l'auto-complétion les propose), mais elles ne stockent pas la même chose sur l'item :

| Commande | Stocké sur l'item | Effet d'une modification ultérieure du preset |
|----------|-------------------|-----------------------------------------------|
| `apply` | Uniquement le **nom** du preset | L'item suit le preset : modifiez le preset, faites `/zveinminer reload`, et l'item utilise les nouvelles valeurs |
| `set` | Une **copie** de la taille et des tags du preset | L'item conserve les valeurs copiées, le preset peut changer sans l'affecter |

Une taille ou une liste de tags stockée directement sur l'item est toujours prioritaire sur les valeurs d'un preset lié. Consultez [Presets & Tags](./presets-and-tags) pour plus de détails.

### add et remove

- `<tag>` accepte un nom de tag de blocs (comme `COAL_ORES`) ou un nom de matériau de bloc (comme `DIAMOND_ORE`). L'auto-complétion de `add` propose tous les tags et matériaux de bloc connus ; celle de `remove` propose les tags de l'item que vous tenez en main.
- Les deux commandes partent des tags effectifs de l'item (ses propres tags, ou ceux hérités de son preset), puis écrivent le résultat sur l'item.
- Un tag inconnu est refusé, et ajouter un tag déjà présent (ou retirer un tag absent) envoie un message d'erreur.

### size

- Sans argument, `/zveinminer size` affiche la taille de filon actuelle (effective) de l'item tenu en main, `0` s'il n'a aucune donnée de vein miner.
- `[size]` doit valoir `0` ou être un entier positif. Elle ne peut pas dépasser `vein-mining.max-size-limit` (`64` par défaut, une valeur de `0` désactive la limite), consultez la [Configuration](./configuration).
- `/zveinminer size 0` supprime la taille stockée sur l'item, qui reprend alors la taille de son preset lié (s'il en a un).

### give

- `<player>` doit être le nom **exact** d'un joueur connecté.
- `[material]` est n'importe quel matériau d'item, `DIAMOND_PICKAXE` par défaut. Un matériau inconnu ou qui n'est pas un item est refusé.
- Le preset est copié sur le nouvel item (même comportement que `set`). Si l'inventaire du joueur est plein, l'item est lâché à ses pieds.

---

## Commandes Administrateur

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zveinminer reload\|rl` | `zveinminer.reload` | Recharger les fichiers de configuration |

<CalloutContainer type="warning">

<CalloutTitle>Utilisation depuis la console</CalloutTitle>

<CalloutDescription>
Seules `reload`, `list` et `give` peuvent être exécutées depuis la console. Toutes les autres sous-commandes nécessitent un item en main ou un contexte joueur et sont refusées lorsqu'elles sont utilisées par la console.
</CalloutDescription>

</CalloutContainer>

---

## Exemples

```
/zvm list
/zvm toggle
/zveinminer apply pickaxe-1
/zveinminer set pickaxe-1
/zveinminer add COAL_ORES
/zveinminer remove DIAMOND_ORE
/zveinminer size
/zveinminer size 16
/zveinminer give Maxlego08 pickaxe-1
/zveinminer give Maxlego08 pickaxe-1 NETHERITE_PICKAXE
/zveinminer reload
```

---

## Permissions

| Permission | Par défaut | Description |
|------------|------------|-------------|
| `zveinminer.use` | Tout le monde | Utiliser le vein mining et la commande `/zveinminer` |
| `zveinminer.toggle` | Tout le monde | Activer ou désactiver le vein mining |
| `zveinminer.list` | Tout le monde | Lister les presets disponibles |
| `zveinminer.info` | Tout le monde | Afficher les données de vein mining de l'item tenu en main |
| `zveinminer.stats` | Tout le monde | Afficher vos statistiques de vein mining |
| `zveinminer.reload` | OP | Recharger les fichiers de configuration |
| `zveinminer.apply` | OP | Appliquer un preset à l'item tenu en main |
| `zveinminer.set` | OP | Copier les propriétés d'un preset sur l'item tenu en main |
| `zveinminer.add` | OP | Ajouter un tag à l'item tenu en main |
| `zveinminer.remove` | OP | Retirer un tag de l'item tenu en main |
| `zveinminer.size` | OP | Modifier la taille de filon de l'item tenu en main |
| `zveinminer.give` | OP | Donner un item avec un preset |
| `zveinminer.bypass.cooldown` | OP | Ignorer le cooldown du vein mining |
| `zveinminer.admin` | OP | Accorde toutes les permissions ci-dessus |

<CalloutContainer type="tip">

<CalloutTitle>Le vein mining lui-même</CalloutTitle>

<CalloutDescription>
`zveinminer.use` est également vérifiée chaque fois qu'un joueur casse un bloc : sans elle, le joueur mine normalement, même avec un outil configuré. `zveinminer.bypass.cooldown` n'a d'effet que si un cooldown est défini dans la [configuration](./configuration).
</CalloutDescription>

</CalloutContainer>
