---
title: Module Homes
description: Système de homes des joueurs avec limites basées sur les permissions
---

# Module Homes

**Fichier :** `modules/home/config.yml`

Le module Homes permet aux joueurs de définir, se téléporter vers et gérer des emplacements de homes personnels. Le nombre maximum de homes est contrôlé par des limites basées sur les permissions, et le module supporte plusieurs modes d'affichage pour la liste des homes, la validation configurable des noms, les restrictions de mondes et les invites de confirmation pour l'écrasement ou la suppression de homes.

Les homes peuvent également être rendus **publics**, **partagés** avec des joueurs précis, rangés par **catégories**, marqués comme **favoris**, prévisualisés avant la téléportation et **importés** depuis EssentialsX.

---

## Configuration

```yaml
enable: true

# Allow players to have multiple homes.
# You must set the permission the player must have and the home number for that permission.
permissions:
  - permission: "essentials.home.default"
    amount: 3
  - permission: "essentials.home.vip"
    amount: 5
  - permission: "essentials.home.staff"
    amount: 10

# Display mode for /home
# Options: IN_LINE, INVENTORY, INVENTORY_DONUT, MULTI_LINE
home-display: MULTI_LINE

# Regex pattern for validating home names
home-regex: "[a-zA-Z0-9]+"

# Maximum length for home names
home-name-max: 16

# Minimum length for home names
home-name-min: 1

# Worlds where players cannot set homes
disable-worlds:
  - "world_event"

# The player must confirm with /sethomeconfirm when overwriting an existing home
home-overwrite-confirm: true

# The player must confirm when deleting a home
home-delete-confirm: true

# How permission amounts are evaluated: MAX or STACK
home-usage-type: MAX

# Default material for the home buttons (zMenu material loaders are supported)
default-home-material: BLUE_BED

# Public homes (/homepublic, /publichomes)
enable-public-homes: true

# Maximum number of public homes per player (-1 for unlimited)
max-public-homes: 3

# How /publichomes displays the list: CHAT or INVENTORY
public-homes-display: CHAT

# Shared homes (/homeshare, /homeunshare, /homeshares)
enable-shared-homes: true

# Maximum number of players a single home can be shared with (-1 for unlimited)
max-shared-per-home: 5

# Categories (/homecategory)
enable-categories: true

# Show favorite homes first in the home list (/homefavorite)
favorite-first: true

# Show a preview with a clickable confirmation before teleporting
enable-home-preview: false
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Homes |
| `permissions` | Liste | *(voir ci-dessus)* | Limites de homes basées sur les permissions (voir [Propriétés des Entrées de Permission](#propriétés-des-entrées-de-permission)) |
| `home-display` | String | `MULTI_LINE` | Mode d'affichage de la liste des homes. Options : `IN_LINE` (une seule ligne), `INVENTORY` (interface GUI coffre), `INVENTORY_DONUT` (disposition GUI en anneau), `MULTI_LINE` (un home par ligne dans le chat) |
| `home-regex` | String | `[a-zA-Z0-9]+` | Expression régulière que les noms de homes doivent respecter. La valeur par défaut autorise uniquement les caractères alphanumériques |
| `home-name-max` | Integer | `16` | Nombre maximum de caractères autorisés dans un nom de home |
| `home-name-min` | Integer | `1` | Nombre minimum de caractères requis dans un nom de home |
| `disable-worlds` | Liste de Strings | `[world_event]` | Liste des noms de mondes où les joueurs ne sont pas autorisés à définir des homes |
| `home-overwrite-confirm` | Boolean | `true` | Si `true`, les joueurs doivent confirmer avec `/sethomeconfirm` lorsqu'ils définissent un home qui existe déjà (écrasement) |
| `home-delete-confirm` | Boolean | `true` | Si `true`, `/delhome <nom>` ouvre une interface de confirmation (`modules/home/home_delete.yml`) au lieu de supprimer le home immédiatement |
| `home-usage-type` | String | `MAX` | Mode de calcul des limites de homes basées sur les permissions. `MAX` utilise la permission correspondante la plus élevée. `STACK` additionne tous les montants de permissions correspondantes |
| `default-home-material` | String | `BLUE_BED` | Le matériau utilisé comme icône par défaut pour les homes dans les modes d'affichage GUI. Les material loaders de zMenu sont supportés |
| `enable-public-homes` | Boolean | `true` | Active les homes publics (`/homepublic`, `/publichomes`) |
| `max-public-homes` | Integer | `3` | Nombre maximum de homes publics par joueur. `-1` pour illimité |
| `public-homes-display` | String | `CHAT` | Affichage de `/publichomes` : `CHAT` (message cliquable dans le chat) ou `INVENTORY` (interface paginée, `modules/home/public_homes.yml`) |
| `enable-shared-homes` | Boolean | `true` | Active les homes partagés (`/homeshare`, `/homeunshare`, `/homeshares`) |
| `max-shared-per-home` | Integer | `5` | Nombre maximum de joueurs avec qui un même home peut être partagé. `-1` pour illimité |
| `enable-categories` | Boolean | `true` | Active les catégories de homes (`/homecategory`) |
| `favorite-first` | Boolean | `true` | Si `true`, les homes favoris sont affichés en haut de la liste des homes |
| `enable-home-preview` | Boolean | `false` | Si `true`, `/home <nom>` affiche d'abord un aperçu (monde et coordonnées) avec un bouton cliquable `[Teleport]` au lieu de téléporter directement |

### Propriétés des Entrées de Permission

Chaque entrée dans la liste `permissions` définit une limite de homes pour les joueurs possédant une permission spécifique :

| Propriété | Type | Description |
|-----------|------|-------------|
| `permission` | String | Le noeud de permission à vérifier sur le joueur |
| `amount` | Integer | Le nombre de homes accordés par cette permission |

<CalloutContainer type="info">

<CalloutTitle>Types d'Utilisation des Homes</CalloutTitle>

<CalloutDescription>
- **MAX** : Le plugin vérifie toutes les permissions et utilise le montant correspondant **le plus élevé**. Un joueur avec à la fois `essentials.home.default` (3) et `essentials.home.vip` (5) aurait un maximum de **5** homes.
- **STACK** : Le plugin **additionne** tous les montants de permissions correspondantes. Le même joueur aurait **8** homes (3 + 5).
</CalloutDescription>

</CalloutContainer>

---

## Modes d'Affichage

L'option `home-display` contrôle la manière dont la liste des homes est présentée au joueur :

| Mode | Description |
|------|-------------|
| `IN_LINE` | Affiche tous les homes sur une seule ligne de chat, séparés par des virgules ou un délimiteur |
| `MULTI_LINE` | Affiche chaque home sur sa propre ligne de chat avec des actions de téléportation cliquables |
| `INVENTORY` | Ouvre une interface GUI de type coffre où chaque home est représenté par un objet |
| `INVENTORY_DONUT` | Ouvre une interface GUI avec les homes disposés en anneau autour du centre |

<CalloutContainer type="info">

<CalloutDescription>
Les modes `INVENTORY` et `INVENTORY_DONUT` utilisent [zMenu](https://modrinth.com/plugin/zmenu) pour le rendu (`modules/home/homes.yml` et `modules/home/homes_donut.yml`). L'option `default-home-material` contrôle l'icône d'objet utilisée pour chaque home dans ces modes GUI.
</CalloutDescription>

</CalloutContainer>

### Placeholders des Homes

Les messages de la liste des homes et les boutons des interfaces de homes peuvent utiliser les placeholders internes suivants :

| Placeholder | Description |
|-------------|-------------|
| `%name%` | Nom du home |
| `%world%` | Nom du monde |
| `%environment%` | Environnement du monde (normal, nether, end) |
| `%x%`, `%y%`, `%z%` | Coordonnées du bloc du home |
| `%count%` | Nombre de homes du joueur |
| `%max%` | Nombre maximum de homes du joueur |
| `%category%` | Catégorie du home (vide si aucune) |
| `%favorite%` | `true` si le home est un favori |
| `%public%` | `true` si le home est public |

---

## Homes Publics

Un joueur peut rendre l'un de ses homes visitable par tout le monde avec `/homepublic <home>`. Relancer la commande sur le même home le rend de nouveau privé. Le nombre de homes publics par joueur est limité par `max-public-homes`.

- `/publichomes` liste tous les homes publics du serveur, `/publichomes <joueur>` uniquement les homes publics de ce joueur. La liste est affichée dans le chat ou dans une interface paginée selon `public-homes-display`.
- Un home public se visite avec `/home <joueur>:<home>`. Le visiteur doit avoir la permission `essentials.home.visit`.

```
/homepublic base
/publichomes Steve
/home Steve:base
```

<CalloutContainer type="info">

<CalloutDescription>
`/home <joueur>:<home>` se comporte différemment pour le staff : un joueur possédant `essentials.home.other` se téléporte à n'importe quel home d'un autre joueur, public ou non. Les joueurs sans cette permission ne peuvent visiter que les homes publics et les homes partagés avec eux.
</CalloutDescription>

</CalloutContainer>

---

## Homes Partagés

Plutôt que de rendre un home public, un joueur peut le partager avec des joueurs précis (connectés ou non) :

- `/homeshare <home> <joueur>` partage le home avec un joueur (limité par `max-shared-per-home`)
- `/homeunshare <home> <joueur>` retire le partage
- `/homeshares <home>` liste les joueurs avec qui le home est partagé

L'autre joueur visite le home avec `/home <propriétaire>:<home>` et doit avoir la permission `essentials.home.visit`. Les partages sont automatiquement supprimés lorsque le home est supprimé.

---

## Catégories et Favoris

- `/homecategory <home> <catégorie>` attribue une catégorie à un home. Le nom de la catégorie doit respecter `[a-zA-Z0-9_-]` (1 à 32 caractères). Utilisez `none` ou `reset` comme catégorie pour la retirer. Nécessite `enable-categories: true`.
- `/homefavorite <home>` ajoute ou retire un home des favoris. Lorsque `favorite-first` vaut `true`, les favoris sont affichés en premier dans la liste des homes.

Les placeholders `%category%` et `%favorite%` peuvent être utilisés dans les messages de la liste des homes et dans les boutons des interfaces pour afficher ces informations.

---

## Aperçu des Homes

Lorsque `enable-home-preview` vaut `true`, `/home <nom>` ne téléporte plus directement : la commande affiche le monde et les coordonnées du home avec un bouton cliquable `[Teleport]`, qui exécute `/home <nom> confirm`. Le format correspond au message `command-home-preview` du fichier de messages.

---

## Import depuis EssentialsX

`/homeimport essentialsx` importe tous les homes depuis les données joueurs d'EssentialsX (`plugins/Essentials/userdata/*.yml`). L'import s'exécute de manière asynchrone ; les homes situés dans un monde qui n'existe pas sur le serveur sont ignorés, et un résumé (importés, ignorés, erreurs) est affiché à la fin. Un home portant le même nom qu'un home existant le remplace.

---

## Gérer les Homes des Autres Joueurs

| Action | Commande | Permission |
|--------|----------|------------|
| Se téléporter à n'importe quel home d'un autre joueur | `/home <joueur>:<home>` | `essentials.home.other` |
| Lister les homes d'un autre joueur | `/home-list <joueur> [home]` | `essentials.home.list` |
| Créer un home pour un autre joueur | `/sethome <joueur>:<home>` | `essentials.set.home.other` |
| Supprimer un home d'un autre joueur | `/delhome-other <joueur> <home>` | `essentials.del.home.other` |
| Supprimer un home d'un autre joueur (ancienne syntaxe) | `/delhome <joueur>:<home>` | `essentials.set.home.other` |

`/delhome-other` fonctionne avec les joueurs connectés et déconnectés, et supprime le home sans confirmation.

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/home [nom]` | `h`, `homes` | `essentials.home` | Se téléporter à un home ou voir votre liste de homes. `/home <joueur>:<home>` permet de visiter un home public ou partagé |
| `/sethome <nom>` | `hcreate`, `hc` | `essentials.set.home` | Créer un nouveau home à votre position actuelle |
| `/sethomeconfirm <nom>` | - | `essentials.set.home.confirm` | Confirmer l'écrasement d'un home existant |
| `/delhome <nom>` | `hdelete`, `hd` | `essentials.del.home` | Supprimer un home (ouvre l'interface de confirmation si `home-delete-confirm` est activé) |
| `/delhomeconfirm <nom>` | - | `essentials.del.home.confirm` | Confirmer la suppression d'un home |
| `/delhome-other <joueur> <home>` | `delhomeother`, `hdelother` | `essentials.del.home.other` | Supprimer un home d'un autre joueur (connecté ou non) |
| `/home-list <joueur> [home]` | `hlist` | `essentials.home.list` | Lister les homes d'un autre joueur, ou se téléporter à l'un d'eux |
| `/homepublic <home>` | `publichome` | `essentials.home.public` | Basculer un home entre public et privé |
| `/publichomes [joueur]` | `phomes` | `essentials.home.visit` | Lister les homes publics |
| `/homeshare <home> <joueur>` | `hshare` | `essentials.home.share` | Partager un home avec un joueur |
| `/homeunshare <home> <joueur>` | `hunshare` | `essentials.home.share` | Arrêter de partager un home avec un joueur |
| `/homeshares <home>` | `hshares` | `essentials.home.share` | Lister les joueurs avec qui un home est partagé |
| `/homecategory <home> <catégorie>` | `homecat`, `hcat` | `essentials.home.category` | Définir (ou retirer avec `none`) la catégorie d'un home |
| `/homefavorite <home>` | `homefav`, `hfav` | `essentials.home.favorite` | Ajouter ou retirer un home des favoris |
| `/homeimport essentialsx` | - | `essentials.home.import` | Importer les homes depuis EssentialsX |

---

## Permissions Associées

| Permission | Description |
|------------|-------------|
| `essentials.home` | Autorise l'utilisation de `/home` et la consultation de la liste des homes |
| `essentials.home.other` | Autorise la téléportation à n'importe quel home d'un autre joueur avec `/home <joueur>:<home>` |
| `essentials.home.list` | Autorise la consultation des homes d'un autre joueur avec `/home-list` |
| `essentials.set.home` | Autorise la création de homes avec `/sethome` |
| `essentials.set.home.other` | Autorise la création des homes d'un autre joueur (et leur suppression avec `/delhome <joueur>:<home>`) |
| `essentials.set.home.confirm` | Autorise la confirmation d'écrasement de homes |
| `essentials.del.home` | Autorise la suppression de homes avec `/delhome` |
| `essentials.del.home.confirm` | Autorise la confirmation de suppression de homes |
| `essentials.del.home.other` | Autorise la suppression d'un home d'un autre joueur avec `/delhome-other` |
| `essentials.home.public` | Autorise à rendre un home public avec `/homepublic` |
| `essentials.home.visit` | Autorise la consultation des homes publics et la visite des homes publics et partagés |
| `essentials.home.share` | Autorise l'utilisation de `/homeshare`, `/homeunshare` et `/homeshares` |
| `essentials.home.category` | Autorise à définir une catégorie sur un home |
| `essentials.home.favorite` | Autorise à marquer un home comme favori |
| `essentials.home.import` | Autorise l'import de homes depuis d'autres plugins |
| `essentials.home.default` | Accorde 3 emplacements de homes (configurable) |
| `essentials.home.vip` | Accorde 5 emplacements de homes (configurable) |
| `essentials.home.staff` | Accorde 10 emplacements de homes (configurable) |

<CalloutContainer type="warning">

<CalloutDescription>
Les noeuds de permission pour les limites de homes (par exemple, `essentials.home.default`, `essentials.home.vip`) sont entièrement configurables dans la liste `permissions`. Les valeurs ci-dessus sont les valeurs par défaut. Modifier le nom de la permission dans la configuration change la permission vérifiée.
</CalloutDescription>

</CalloutContainer>

---

## Stockage

Les informations public, catégorie et favori sont stockées dans les colonnes `is_public`, `category` et `is_favorite` de la table `user_homes`, et les partages dans la table `user_home_shares` (ou dans le fichier du joueur avec le stockage JSON).

---

## Placeholders Associés

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_home_count%` | Nombre de homes que le joueur possède actuellement | Integer |
| `%zessentials_home_max%` | Nombre maximum de homes autorisés pour le joueur | Integer |
| `%zessentials_home_exist_{name}%` | Retourne `true` si un home avec le nom donné existe | Boolean |
| `%zessentials_home_delete%` | Le nom du home en cours de suppression (utilisé dans les interfaces de confirmation) | String |

**Exemple :** Afficher l'utilisation des homes dans un scoreboard :
```
Homes: %zessentials_home_count%/%zessentials_home_max%
```

**Exemple :** Vérifier si un home nommé `base` existe :
```
%zessentials_home_exist_base%
```
