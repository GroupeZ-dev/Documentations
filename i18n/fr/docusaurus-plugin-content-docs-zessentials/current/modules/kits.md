---
sidebar_position: 10
title: Module Kits
description: Système de kits configurable avec temps de recharge et kits de première connexion
---

# Module Kits

**Fichier :** `modules/kits/config.yml`

Le module Kits fournit un système de kits complet permettant aux administrateurs de créer, gérer et distribuer des kits d'objets aux joueurs. Les kits prennent en charge les temps de recharge, les restrictions de permissions et les modes d'affichage en interface graphique. Les joueurs peuvent recevoir des kits automatiquement lors de leur première connexion, et les administrateurs peuvent gérer les kits entièrement via des commandes en jeu et des éditeurs.

---

## Configuration Source

```yaml
enable: true
display: IN_LINE  # IN_LINE, INVENTORY, MULTI_LINE
kits-on-first-join:
  - "tools"
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Kits |
| `display` | String | `IN_LINE` | Le mode d'affichage utilisé lors de la liste des kits disponibles. `IN_LINE` affiche les kits sous forme de liste cliquable sur une seule ligne, `INVENTORY` ouvre une interface de coffre avec les icônes des kits, `MULTI_LINE` affiche chaque kit sur sa propre ligne avec des détails |
| `kits-on-first-join` | Liste de Strings | `["tools"]` | Une liste de noms de kits automatiquement donnés aux joueurs lorsqu'ils rejoignent le serveur pour la première fois. Laissez vide ou supprimez la liste pour désactiver les kits de première connexion |

---

## Modes d'Affichage

L'option `display` contrôle la manière dont les kits sont présentés lorsqu'un joueur exécute la commande `/kit` sans spécifier de nom de kit :

| Mode | Description |
|------|-------------|
| `IN_LINE` | Les kits sont affichés sous forme de liste compacte sur une seule ligne avec des noms de kits cliquables. Idéal pour les serveurs avec un petit nombre de kits |
| `INVENTORY` | Ouvre une interface d'inventaire de type coffre où chaque kit est représenté par son icône de matériau configurée. Les joueurs cliquent sur une icône pour réclamer le kit |
| `MULTI_LINE` | Chaque kit est affiché sur sa propre ligne avec des détails supplémentaires tels que l'état du temps de recharge et la disponibilité. Idéal pour des aperçus détaillés |

:::tip
Le mode d'affichage `INVENTORY` offre l'expérience la plus visuellement attrayante pour les joueurs. L'icône de matériau, le nom d'affichage et le lore de chaque kit sont configurés dans la définition du kit elle-même.
:::

---

## Définitions des Kits

Les définitions des kits (objets, temps de recharge, permissions, paramètres d'affichage) ne sont **pas** configurées dans ce fichier. Les kits sont gérés via des commandes en jeu et stockés sous forme de fichiers YAML individuels dans le dossier `plugins/zEssentials/kits/`.

Utilisez le flux de travail suivant pour créer et gérer les kits :

1. **Créer un kit :** Utilisez `/kitcreate <nom>` pour créer un nouveau kit à partir de votre inventaire actuel.
2. **Modifier un kit :** Utilisez `/kiteditor <nom>` pour ouvrir l'éditeur de kit en interface graphique où vous pouvez modifier les objets, les temps de recharge, les permissions et les paramètres d'affichage.
3. **Supprimer un kit :** Utilisez `/kitdelete <nom>` pour supprimer un kit.
4. **Prévisualiser un kit :** Utilisez `/showkit <nom>` pour prévisualiser le contenu d'un kit sans le réclamer.
5. **Donner un kit :** Utilisez `/kitgive <joueur> <nom>` pour donner un kit à un autre joueur, en ignorant son temps de recharge.

:::info
Chaque kit est stocké sous forme de fichier YAML séparé dans le répertoire `kits/` (par exemple, `kits/tools.yml`). Ces fichiers sont automatiquement gérés par les commandes et l'éditeur de kits. La modification manuelle est possible mais non recommandée -- utilisez plutôt l'éditeur en jeu.
:::

---

## Kits de Première Connexion

La liste `kits-on-first-join` spécifie quels kits sont automatiquement donnés aux joueurs lorsqu'ils rejoignent le serveur pour la première fois. Cela est utile pour fournir des objets de départ, des packs de bienvenue ou de l'équipement d'introduction.

```yaml
kits-on-first-join:
  - "tools"
  - "starter"
```

:::warning
Assurez-vous que les kits listés dans `kits-on-first-join` existent réellement. Si un nom de kit ne correspond à aucune définition de kit existante, l'attribution du kit de première connexion échouera silencieusement pour cette entrée.
:::

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/kit` | `kits` | `essentials.kit` | Lister les kits disponibles ou réclamer un kit spécifique |
| `/showkit` | - | `essentials.kit.show` | Prévisualiser le contenu d'un kit sans le réclamer |
| `/kiteditor` | `keditor` | `essentials.kit.editor` | Ouvrir l'éditeur de kit en interface graphique pour modifier un kit existant |
| `/kitcreate` | `kcreate` | `essentials.kit.create` | Créer un nouveau kit à partir de votre inventaire actuel |
| `/kitdelete` | `kdelete` | `essentials.kit.delete` | Supprimer définitivement un kit existant |
| `/kitgive` | `kgive` | `essentials.kit.give` | Donner un kit à un autre joueur, en ignorant son temps de recharge |

Pour la liste complète des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associés

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_has_kit_{name}%` | Renvoie `true` si le joueur a la permission d'utiliser le kit spécifié |
| `%zessentials_user_kit_is_available_{name}%` | Renvoie `true` si le kit est actuellement disponible (pas de temps de recharge actif) |
| `%zessentials_user_kit_time_until_available_{name}%` | Renvoie le temps restant avant que le kit ne soit disponible, dans un format lisible |

Remplacez `{name}` par le nom réel du kit. Par exemple, `%zessentials_user_kit_is_available_starter%` vérifie si le kit `starter` n'est plus en temps de recharge.

Pour la liste complète des placeholders, voir [Placeholders](../placeholders).

---

## Exemple : Kit de Départ avec Première Connexion

Une configuration typique pour un serveur qui donne un kit de départ aux nouveaux joueurs :

**Configuration du module** (`modules/kits/config.yml`) :
```yaml
enable: true
display: INVENTORY
kits-on-first-join:
  - "starter"
```

Ensuite, créez le kit en jeu :
1. Placez les objets de départ souhaités dans votre inventaire.
2. Exécutez `/kitcreate starter`.
3. Exécutez `/kiteditor starter` pour définir le temps de recharge, la permission, le nom d'affichage et l'icône de matériau.
