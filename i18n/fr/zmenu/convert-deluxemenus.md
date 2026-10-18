---
title: Migrer depuis DeluxeMenus
description: Convertissez vos menus DeluxeMenus en inventaires zMenu avec une seule commande
---

# Migrer depuis DeluxeMenus

**Vous venez de DeluxeMenus ? Vous n'avez rien a reecrire.** zMenu convertit vos menus DeluxeMenus existants en inventaires zMenu avec une seule commande : items, slots, commandes de clic, prerequis, commandes d'ouverture et plus encore sont traduits automatiquement.

```
/zm convert deluxemenus
```

C'est tout. Chaque menu de `plugins/DeluxeMenus/gui_menus/` est converti, et vous gardez toute votre configuration tout en profitant de tout ce que zMenu apporte en plus : [pagination](./configurations/buttons/types/pagination), [patterns](./configurations/patterns), [donnees joueur](./configurations/player-data), [dialogues](./configurations/dialogues), [formulaires Bedrock](./configurations/bedrock), [hot reload](./hot-reload) et bien plus.

<CalloutContainer type="info">

<CalloutTitle>Pourquoi migrer ?</CalloutTitle>

<CalloutDescription>
- **Zero reecriture** : vos menus sont convertis en quelques secondes, pas reecrits a la main pendant des jours.
- **Rien de cache** : tout ce qui ne peut pas etre converti a l'identique est liste en haut du fichier converti et dans la console.
- **Securise par conception** : une fonctionnalite que zMenu ne peut pas reproduire n'accorde jamais plus que DeluxeMenus. Un prerequis non supporte refuse toujours, et une action non supportee arrete les actions qui la suivent.
- **DeluxeMenus non requis** : le convertisseur lit directement les fichiers YAML. DeluxeMenus n'a pas besoin d'etre installe, ni meme active.
</CalloutDescription>

</CalloutContainer>

## Demarrage rapide

1. Copiez votre dossier DeluxeMenus dans `plugins/` (ou laissez-le en place) pour que les menus soient dans `plugins/DeluxeMenus/gui_menus/`.
2. Lancez `/zm convert deluxemenus` (ou `/zm convert dm`) depuis la console ou en jeu.
3. Lisez le resultat : chaque menu affiche ✔ s'il est converti, ou ✘ avec la raison s'il ne l'est pas.
4. Ouvrez les fichiers convertis et verifiez la liste **Not converted exactly** en haut de chaque fichier, s'il y en a une.
5. **Desactivez DeluxeMenus** (retirez son jar), sinon ses commandes d'ouverture entrent en conflit avec celles converties.
6. Lancez `/zm reload` pour charger les inventaires convertis et leurs commandes.

<CalloutContainer type="info">

<CalloutTitle>Combinez-le avec le hot reload</CalloutTitle>

<CalloutDescription>
Activez le [hot reload](./hot-reload) avant de convertir : les menus convertis sont charges des qu'ils sont ecrits, et chaque correction que vous faites en les relisant est appliquee instantanement, sans `/zm reload`.
</CalloutDescription>

</CalloutContainer>

## Commande

| Commande | Permission | Description |
|----------|-----------|-------------|
| `/zm convert deluxemenus` | `zmenu.convert` | Convertir tous les menus de `plugins/DeluxeMenus/gui_menus/` (sous-dossiers inclus) |
| `/zm convert deluxemenus <menu>` | `zmenu.convert` | Convertir un seul menu, par nom de fichier, avec ou sans `.yml` |
| `/zm convert dm [menu]` | `zmenu.convert` | Alias court |

Exemple de resultat :

```
✔ shop → inventories/converted/deluxemenu/shop.yml + command
✔ ranks → inventories/converted/deluxemenu/ranks.yml + command (2 not converted exactly, see the top of the file)
✘ broken: this is not a DeluxeMenus menu
Converted 2/3 menus. Review them, then run /zm reload to load them.
```

## Ou sont les fichiers convertis ?

| Quoi | Emplacement |
|------|-------------|
| Menus source (lecture seule) | `plugins/DeluxeMenus/gui_menus/**/*.yml` |
| Inventaires convertis | `plugins/zMenu/inventories/converted/deluxemenu/<menu>.yml` |
| Commandes d'ouverture converties | `plugins/zMenu/commands/converted/deluxemenu/<menu>.yml` |

- Vos fichiers DeluxeMenus ne sont **jamais modifies**.
- Un menu deja converti n'est **jamais ecrase** : il est ignore avec `already converted, delete ... to convert it again`. Supprimez le fichier converti pour convertir le menu a nouveau. Les fichiers de commandes ne sont pas ecrases non plus.
- Un fichier qui n'a ni `menu_title` ni `items` est ignore avec `this is not a DeluxeMenus menu`.

Chaque fichier converti commence par un en-tete comme celui-ci :

```yaml
# Converted from the DeluxeMenus menu shop.yml by zMenu.
# Review it before use: https://docs.groupez.dev/zmenu/getting-started
#
# Not converted exactly:
# - shop.yml: the action "[meta] set points INTEGER 5" is not supported, the actions after it will not run
# - shop.yml: the requirement money_check "has meta" is not supported, it always denies
name: '&8Shop'
size: 27
items:
  # ...
```

## La commande d'ouverture

L'`open_command` de DeluxeMenus devient une [commande personnalisee](./configurations/custom-commands) zMenu :

```yaml
# DeluxeMenus
open_command:
  - shop
  - store
```

```yaml
# plugins/zMenu/commands/converted/deluxemenu/shop.yml
commands:
  shop:
    command: shop
    aliases:
      - store
    inventory: shop
```

La premiere commande devient la commande zMenu, les autres deviennent ses alias.

## Ce qui est converti

### Options du menu

| DeluxeMenus | zMenu | Notes |
|-------------|-------|-------|
| `menu_title` (ou `name` / `title`) | `name` | Pour une liste, la premiere ligne est conservee |
| `inventory_type` | `type` | Un type invalide devient un coffre (avertissement) |
| `size` | `size` | Arrondi a une taille de coffre valide, de 9 a 54 (avertissement si modifie) |
| `update_interval` (secondes) | `update-interval` | Converti en millisecondes |
| `open_command` | [commande personnalisee](./configurations/custom-commands) | Premiere entree = commande, les autres = alias |
| `open_commands` | `open-actions` | Voir [actions](#actions) |
| `close_commands` | `close-actions` | Voir [actions](#actions) |
| `open_requirement` | `open-requirement` | Voir [prerequis](#prerequis) |
| `items` | `items` | Voir [items](#items) |

### Items

| DeluxeMenus | zMenu | Notes |
|-------------|-------|-------|
| `slot`, `slots`, `page` | `slot`, `slots`, `page` | |
| `priority` | `priority` + `else` | Les items partageant un slot sont chaines par priorite, exactement comme DeluxeMenus |
| `update` | `update` | |
| `view_requirement` | `view-requirement` | |
| `click_commands` + `click_requirement` | prerequis de clic | Tous les types de clic |
| `left_click_commands`, `right_click_commands`, `shift_left_click_commands`, `shift_right_click_commands`, `middle_click_commands` (+ leurs `*_click_requirement`) | prerequis de clic | Un prerequis par type de clic |
| `display_name`, `lore`, `amount`, `model_data`... | memes cles | Lues telles quelles par zMenu |
| `dynamic_amount` | `amount` | Les placeholders sont supportes |
| `data` | `damage` | |
| `enchantments` (`SHARPNESS;5`) | `enchantments` (`SHARPNESS,5`) | |
| `item_flags` | `flags` | |
| `hide_tooltip` | `hide-tooltip` | |
| `enchantment_glint_override` | `enchantment-glint` | |
| `rarity` | `item-rarity` | |
| `tooltip_style` | `tooltip-style` | |
| `item_model` | `item-model` | |

### Materiaux

| Materiau DeluxeMenus | Materiau zMenu |
|----------------------|----------------|
| `head-<joueur>` | Tete du joueur `<joueur>` (placeholders supportes) |
| `texture-<hash>` | `basehead-<base64>` |
| `placeholder-<placeholder>` | `<placeholder>` |
| `main_hand`, `off_hand` | `armor:HAND`, `armor:OFF_HAND` |
| `armor_helmet`, `armor_chestplate`, `armor_leggings`, `armor_boots` | `armor:HEAD`, `armor:CHEST`, `armor:LEGS`, `armor:FEET` |
| `water_bottle` | `POTION` avec `potion: WATER` |
| `hdb-<id>` / `headdb-<id>` | `hdb:<id>` |
| `itemsadder-<id>` | `itemsadder:<id>` |
| `oraxen-<id>` | `oraxen:<id>` |
| `nexo-<id>` | `nexo:<id>` |
| `mmoitems-<id>` | `mmoitems:<id>` |
| `craftengine-<id>` | `craftengine:<id>` |
| `executableitems-<id>` | `ei:<id>` |
| `executableblocks-<id>` | `eb:<id>` |
| Tout materiau vanilla | Inchange |

### Actions

Les commandes de clic, d'ouverture et de fermeture de DeluxeMenus sont converties en [actions](./configurations/buttons/actions) zMenu. Les modificateurs `<delay=ticks>` et `<chance=pourcentage>` sont conserves, ou qu'ils soient dans la ligne.

| DeluxeMenus | Action zMenu |
|-------------|--------------|
| `[close]` | `close` |
| `[console]` | `console-command` |
| `[player]` | `player-command` |
| `[commandevent]` | `player-command` (avec evenement de commande) |
| `[chat]` | `chat` |
| `[message]` / `[minimessage]` | `message` (couleurs legacy / MiniMessage) |
| `[broadcast]` / `[minibroadcast]` | `broadcast` (couleurs legacy / MiniMessage) |
| `[actionbar]` | `action-bar` |
| `[openguimenu]` / `[openmenu]` | `inventory` (arguments conserves) |
| `[connect]` | `connect` |
| `[refresh]` | `refresh` |
| `[sound]` / `[rawsound]` | `sound` (volume et pitch conserves) |
| `[broadcastsound]` / `[broadcastrawsound]` | `broadcast-sound` |
| `[broadcastsoundworld]` / `[broadcastrawsoundworld]` | `broadcast-sound`, joue a tout le serveur (avertissement) |
| `[takemoney]` / `[givemoney]` | `withdraw` / `deposit` (Vault) |
| `[giveexp]` / `[takeexp]` | Commande console `/xp add` (suffixe `L` = niveaux) |

Tout autre tag (`[meta]`, `[json]`, `[givepermission]`...) est signale, et les actions qui le suivent **ne s'executent pas** : un menu ne peut donc jamais donner une recompense sans l'etape qui devait la preceder.

### Prerequis

`open_requirement`, `view_requirement` et les prerequis de clic sont convertis en [prerequis](./configurations/requirements) zMenu, avec leurs `deny_commands` et `success_commands`.

| Type DeluxeMenus | zMenu | Negation (`!`) |
|------------------|-------|----------------|
| `has permission` | `permission` | Oui |
| `has permissions` | Un `permission` par entree | Non, et `minimum` doit etre egal au nombre de permissions |
| `string equals` | `placeholder` | Oui |
| `string equals ignorecase` | `placeholder` | Oui, avec un `output` litteral |
| `string contains` | `placeholder` | Oui, avec un `output` litteral |
| `string contains ignorecase` | `regex` | Oui, avec un `output` litteral |
| `>`, `>=`, `==`, `<=`, `<` | `placeholder` (numerique) | Non |
| `!=` | `placeholder` (compare comme du texte, avertissement) | - |
| `regex matches` | `regex` | Oui |
| `string length` | `regex` | Non |
| `has money` | `money` (Vault) | Non |
| `has exp` (avec `level: true`) | `placeholder` sur `%player_level%` | Non |
| `has item` (materiau, `model_data`, `amount`) | `item` | Non |

Les noms longs (`has permission`), les noms courts (`hasperm`, `perm`) et les symboles sont tous reconnus, sans tenir compte de la casse.

`minimum_requirements` est supporte quand tous les prerequis sont optionnels. Quand des prerequis obligatoires et optionnels sont melanges, zMenu les exige tous et le signale.

## Ce qui n'est pas converti

Tout ce qui suit est liste en haut du fichier converti et affiche dans la console avec le prefixe `[DeluxeMenus]` :

| Fonctionnalite | Comportement |
|----------------|--------------|
| Tags d'action non supportes | Signales, les actions qui suivent ne s'executent pas |
| Types de prerequis non supportes (ou negation / options non supportees) | Signales, le prerequis refuse toujours |
| `has item` avec `strict`, `name`, `lore`, `data`, `armor`, `offhand`, `name_contains`, `lore_contains`, `model_data_component` | Signale, refuse toujours |
| `stop_at_success` | Tous les prerequis sont verifies |
| `refresh` (option du menu) | Seuls les items avec `update: true` sont rafraichis |
| `args` (arguments du menu) | Non converti, utilisez les [arguments de commande](./configurations/custom-commands) |
| `enable_open_requirements_bypass_permissions` | Non converti |
| Options d'item `rgb`, `banner_meta`, `base_color`, `potion_effects`, `trim_material`, `trim_pattern`, `model_data_component`, `light_level`, `lore_append_mode` | Non converties, utilisez les [options d'item](./configurations/items/item) ou les [composants](./configurations/items/components) zMenu |
| Materiaux `stack-...` et `simpleitemgenerator-...` | Non convertis |

<CalloutContainer type="warning">

<CalloutTitle>Relisez toujours le resultat</CalloutTitle>

<CalloutDescription>
Le convertisseur fait le gros du travail, mais votre serveur est unique. Ouvrez chaque inventaire converti une fois, testez ses boutons et corrigez les lignes listees sous **Not converted exactly** avant de passer en production.
</CalloutDescription>

</CalloutContainer>

## FAQ

**Puis-je reconvertir apres avoir modifie un menu DeluxeMenus ?**
Oui. Supprimez le fichier converti dans `inventories/converted/deluxemenu/` (et sa commande dans `commands/converted/deluxemenu/` si vous voulez la regenerer), puis relancez la commande.

**Puis-je deplacer les fichiers convertis ?**
Oui. Ce sont des inventaires zMenu classiques : deplacez-les ou renommez-les ou vous voulez dans `inventories/`. N'oubliez pas que le nom d'inventaire utilise par `/zm open` et par le fichier de commande est le nom du fichier.

**Dois-je garder DeluxeMenus installe ?**
Non. Le convertisseur lit seulement les fichiers de `plugins/DeluxeMenus/gui_menus/`. Une fois la conversion faite, retirez DeluxeMenus : s'il reste active, zMenu vous previent que ses commandes d'ouverture entrent en conflit avec celles converties.

**Mon menu utilise des placeholders. Fonctionnent-ils toujours ?**
Oui. Les placeholders PlaceholderAPI sont conserves tels quels et resolus par zMenu.

## Prochaines etapes

- Activez le [hot reload](./hot-reload) pour peaufiner vos menus convertis en temps reel
- Decouvrez ce que zMenu ajoute : [types de boutons](./configurations/buttons/button), [actions](./configurations/buttons/actions), [patterns](./configurations/patterns)
- Apprenez le [format des inventaires](./configurations/inventories/inventory) pour aller plus loin
