---
sidebar_position: 3
title: Items personnalises
description: Definissez des items personnalises dans le dossier items et donnez-les aux joueurs
---

# Items personnalises

En plus des items affiches dans les menus, zMenu peut gerer des **items personnalises autonomes** — de vrais items qui se trouvent dans l'inventaire d'un joueur. Ils sont definis dans le dossier `items/`, distribues via une commande (ou depuis un bouton de menu), et peuvent porter des [mecaniques](./mechanics) comme etre donnes a la premiere connexion.

Comme ils sont stockes avec un id cache, zMenu peut aussi les **reconnaitre plus tard** et les **garder a jour** : modifiez le nom ou le lore d'un item, rechargez, et chaque exemplaire deja present dans les inventaires est reconstruit automatiquement.

## Le dossier `items/`

Les items personnalises sont charges depuis :

```
plugins/zMenu/items/
```

Ce dossier est **toujours actif** — il n'existe aucune option pour l'activer ou le desactiver dans `config.yml`. Il est cree automatiquement au premier demarrage avec un exemple `default-items.yml` a l'interieur.

- Vous pouvez creer **autant de fichiers `.yml`** que vous voulez (par ex. `weapons.yml`, `tools.yml`, `events.yml`) pour organiser vos items.
- Les **sous-dossiers sont supportes** : chaque fichier `.yml` trouve n'importe ou sous `items/` est charge.
- Chaque item est identifie par un **id d'item** — la cle YAML de premier niveau. Les ids doivent etre uniques a travers tous les fichiers.

## Definir un item

Chaque cle de premier niveau est un id d'item, et son contenu utilise le **meme format exact que les items de menu** (voir [Configuration d'item](./item)). Vous pouvez utiliser des materiaux de plugins connectes, des [composants](./components), des enchantements, des placeholders, des noms traduits, et tout ce que le loader d'item supporte.

```yaml
# plugins/zMenu/items/weapons.yml

# "legendary-sword" est l'id de l'item
legendary-sword:
  material: DIAMOND_SWORD
  name: "&b&lLegendary Sword"
  lore:
    - "&7Une lame d'une puissance pure."
  amount: 1
  enchantments:
    - SHARPNESS,5
  flags:
    - HIDE_ENCHANTS
  glow: true
```

Le fichier par defaut fourni avec le plugin montre la structure minimale :

```yaml
# plugins/zMenu/items/default-items.yml
#<item-id>:
#  name: ... # Meme format que pour les items dans les menus
#  mechanics:
#    <mechanic-id>:
#      ... # Depend de la mecanique

first-item:
  name: "&aFirst Item"
  lore:
    - "&7This is the first item"
    - "&7in the default items file."
```

### Options de l'item

En plus de toutes les options d'item standard, les items personnalises acceptent deux options supplementaires placees directement sous l'id de l'item.

| Option              | Type    | Defaut  | Description                                                                                       |
|---------------------|---------|---------|---------------------------------------------------------------------------------------------------|
| `save-owner-in-pdc` | Boolean | `true`  | Enregistre le receveur comme **proprietaire** de l'item. Les placeholders du nom/lore sont alors toujours resolus pour ce proprietaire (voir [Proprietaire & placeholders](#proprietaire--placeholders)). |
| `skip-item-update`  | Boolean | `false` | Si `true`, les exemplaires deja dans les inventaires ne sont **jamais reconstruits** au join/reload. A utiliser pour des items que les joueurs peuvent personnaliser et conserver tels quels. |

```yaml
legendary-sword:
  material: DIAMOND_SWORD
  name: "&b&lLegendary Sword"
  save-owner-in-pdc: true
  skip-item-update: false
```

## Donner des items

### `/zmenu giveitem`

Donnez un item personnalise a un joueur avec :

```
/zmenu giveitem <item-id> [player]
```

- `<item-id>` — l'id defini dans vos fichiers `items/` (auto-complete automatiquement).
- `[player]` — cible optionnelle ; par defaut vous-meme quand la commande est executee en jeu.

| | |
|-|-|
| **Permission** | `zmenu.give.item` |
| **Se donner l'item** | `/zmenu giveitem legendary-sword` |
| **Donner a quelqu'un d'autre** | `/zmenu giveitem legendary-sword Notch` |

### Depuis un bouton de menu

Il n'existe pas d'action dediee "donner un item personnalise" — vous distribuez l'item avec une [action](../buttons/actions) de commande classique qui execute `zmenu giveitem` :

```yaml
buttons:
  claim-reward:
    material: CHEST
    name: "&aRecuperez votre epee"
    slot: 13
    actions:
      - click: LEFT
        type: console_command
        commands:
          - "zmenu giveitem legendary-sword %player%"
```

Utiliser une action `console_command` signifie que la commande est executee depuis la console, donc le joueur qui clique n'a pas besoin de la permission `zmenu.give.item` lui-meme.

## Garder les items a jour

Les items personnalises sont marques avec un id cache, ce qui permet a zMenu de gerer les exemplaires deja presents dans les inventaires des joueurs. Cette verification s'execute **quand un joueur se connecte** et **quand vous executez `/zmenu reload`** (pour chaque joueur en ligne) :

- **L'item existe toujours** → il est reconstruit a partir de la configuration actuelle, donc les modifications du nom, du lore, des enchantements, etc. sont appliquees automatiquement aux exemplaires existants (sauf `skip-item-update: true`).
- **L'id de l'item n'existe plus** (vous l'avez supprime des fichiers) → les marqueurs caches sont retires et l'item reste dans l'inventaire comme un item normal.

:::tip
Modifiez un item, executez `/zmenu reload`, et les joueurs en ligne voient la version mise a jour sans avoir a recevoir un nouvel item.
:::

### Proprietaire & placeholders

Le comportement des placeholders dans le nom/lore depend de `save-owner-in-pdc` :

- **`save-owner-in-pdc: true`** (defaut) — l'item est lie au joueur a qui il a ete donne. Les placeholders sont toujours resolus pour ce **proprietaire**, et les mises a jour n'ont lieu que lorsque le proprietaire est en ligne.
- **`save-owner-in-pdc: false`** — l'item est generique. Les placeholders sont resolus pour celui qui le **tient actuellement**, et les mises a jour utilisent le porteur.

## Mecaniques

Un item peut recevoir des **mecaniques** — des comportements reutilisables attaches sous une section `mechanics:`. Celle disponible de base est `itemjoin` (donner a la premiere connexion, verrouiller a un slot, empecher la modification) :

```yaml
starter-map:
  material: FILLED_MAP
  name: "&eServer Guide"
  mechanics:
    itemjoin:
      give-first-join: true
      fixed-slot: 8
      prevent-inventory-modification: true
```

Consultez la page dediee [Mecaniques d'Item](./mechanics) pour la liste complete des mecaniques et leurs options.

## Prochaines etapes

- Configurez l'item lui-meme avec [Configuration d'item](./item)
- Donnez un comportement aux items avec [Mecaniques d'Item](./mechanics)
- Ajoutez des [Actions](../buttons/actions) a un bouton pour donner des items au clic
