---
sidebar_position: 8
title: Module Objets
description: Définitions d'objets personnalisés utilisables dans l'ensemble du plugin
---

# Module Objets

**Fichier :** `modules/items/config.yml`

Le module Objets vous permet de définir des objets personnalisés qui peuvent être référencés et utilisés dans l'ensemble du plugin. Les objets personnalisés sont définis en utilisant le [format d'objet zMenu](https://docs.zmenu.dev/) et prennent en charge les noms personnalisés, les matériaux, les enchantements, le lore et toutes les autres propriétés d'objet. Ces objets peuvent ensuite être donnés aux joueurs via la commande `/give` ou référencés dans d'autres modules.

:::info
Contrairement à la plupart des modules, le module Objets ne dispose **pas** d'un bouton `enable`. Les définitions d'objets personnalisés sont toujours disponibles lorsqu'elles sont configurées. Le module sert de registre d'objets partagé pour l'ensemble du plugin.
:::

---

## Configuration

```yaml
# Custom item definitions using the zMenu item format
# Each key is a unique item identifier that can be referenced across the plugin
custom-items:
  master_sword:
    name: "<gradient:#e88d1e:#e8511e>\u1d0d\u1d00s\u1d1b\u1d07\u0280 s\u1d21\u1d0f\u0280\u1d05</gradient>"
    material: DIAMOND_SWORD
    enchants:
      - SHARPNESS,10
      - UNBREAKING,10
      - LOOTING,10
      - MENDING,1
```

---

## Options

### Propriétés des Objets Personnalisés

Chaque objet dans la map `custom-items` est identifié par une clé unique (par exemple, `master_sword`) et prend en charge les propriétés suivantes :

| Propriété | Type | Par Défaut | Description |
|-----------|------|------------|-------------|
| `name` | String | - | Le nom d'affichage personnalisé de l'objet. Prend en charge le formatage MiniMessage, les dégradés et les codes couleur |
| `material` | String | - | Le type de matériau Minecraft (par exemple, `DIAMOND_SWORD`, `GOLDEN_APPLE`, `NETHERITE_PICKAXE`) |
| `enchants` | Liste de Strings | `[]` | Liste des enchantements au format `ENCHANTMENT_NAME,LEVEL` |
| `lore` | Liste de Strings | `[]` | Liste des lignes de lore affichées sur l'objet. Prend en charge les codes couleur et MiniMessage |
| `amount` | Integer | `1` | Taille de la pile d'objets |
| `durability` | Integer | `0` | Valeur de dégâts appliquée à l'objet (pour les outils et armures) |
| `unbreakable` | Boolean | `false` | Si `true`, l'objet ne peut pas perdre de durabilité |
| `modelId` | Integer | `0` | Valeur de custom model data pour l'intégration des packs de ressources |

:::tip
Les objets personnalisés utilisent le **format d'objet zMenu**, ce qui signifie que toute propriété prise en charge par les objets zMenu peut être utilisée ici. Cela inclut les données NBT, les flags d'objet, les textures de crâne, les couleurs d'armure en cuir, les effets de potion, et plus encore. Consultez la [documentation zMenu](https://docs.zmenu.dev/) pour la liste complète des propriétés d'objet prises en charge.
:::

### Format des Enchantements

Les enchantements sont spécifiés sous forme de chaîne séparée par des virgules `NAME,LEVEL` :

```yaml
enchants:
  - SHARPNESS,10
  - UNBREAKING,10
  - LOOTING,10
  - MENDING,1
```

Tous les noms d'enchantement standard de Minecraft sont pris en charge (par exemple, `SHARPNESS`, `EFFICIENCY`, `PROTECTION`, `FIRE_ASPECT`, `SILK_TOUCH`, `FORTUNE`, `MENDING`, `UNBREAKING`).

:::warning
Les niveaux d'enchantement supérieurs au maximum vanilla (par exemple, `SHARPNESS,10`) sont pris en charge mais peuvent se comporter différemment selon votre logiciel serveur et sa version. Certains plugins anti-triche peuvent signaler les objets avec des niveaux d'enchantement non standard.
:::

---

## Définir Plusieurs Objets

Vous pouvez définir autant d'objets personnalisés que nécessaire. Chacun doit avoir une clé unique :

```yaml
custom-items:
  master_sword:
    name: "<gradient:#e88d1e:#e8511e>Master Sword</gradient>"
    material: DIAMOND_SWORD
    enchants:
      - SHARPNESS,10
      - UNBREAKING,10
      - LOOTING,10
      - MENDING,1

  healing_potion:
    name: "&d&lSuper Healing Potion"
    material: POTION
    amount: 3
    lore:
      - "&7A powerful healing potion"
      - "&7that restores full health."

  builders_pickaxe:
    name: "&b&lBuilder's Pickaxe"
    material: NETHERITE_PICKAXE
    unbreakable: true
    enchants:
      - EFFICIENCY,5
      - SILK_TOUCH,1

  trophy_head:
    name: "&6&lChampion Trophy"
    material: PLAYER_HEAD
    lore:
      - "&7Awarded to the champion"
      - "&7of the tournament."
```

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/give` | - | `essentials.give` | Donner des objets (y compris des objets personnalisés) à un joueur |
| `/giveall` | - | `essentials.give.all` | Donner des objets à tous les joueurs en ligne |
| `/itemname` | `iname`, `itemrename`, `irename` | `essentials.item.name` | Renommer l'objet tenu en main |
| `/itemlore` | `ilore`, `lore` | `essentials.item.lore` | Ajouter, définir ou effacer le lore de l'objet tenu |

### Sous-commandes du Lore d'Objet

| Sous-commande | Description |
|---------------|-------------|
| `add` | Ajouter une nouvelle ligne de lore à l'objet tenu |
| `set` | Définir une ligne de lore spécifique par index |
| `clear` | Supprimer tout le lore de l'objet tenu |

---

## Permissions Associées

| Permission | Description |
|------------|-------------|
| `essentials.give` | Permet de donner des objets à un joueur avec `/give` |
| `essentials.give.all` | Permet de donner des objets à tous les joueurs avec `/giveall` |
| `essentials.item.name` | Permet de renommer l'objet tenu |
| `essentials.item.lore` | Permet de modifier le lore de l'objet tenu |

---

## Placeholders Associés

Les placeholders suivants renvoient des informations sur l'objet que le joueur tient actuellement dans sa main principale :

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_iteminhand_type%` | Nom du type de matériau (par exemple, `DIAMOND_SWORD`) | String |
| `%zessentials_iteminhand_realname%` | Nom formaté du matériau (par exemple, `Diamond Sword`) | String |
| `%zessentials_iteminhand_displayname%` | Nom d'affichage personnalisé, ou nom du matériau si aucun n'est défini | String |
| `%zessentials_iteminhand_custommodeldata%` | Valeur de custom model data (`0` si aucune) | Integer |
| `%zessentials_iteminhand_maxdurability%` | Durabilité maximale de l'objet | Integer |
| `%zessentials_iteminhand_durability%` | Valeur de dégâts actuelle de l'objet | Integer |
| `%zessentials_iteminhand_amount%` | Nombre d'objets dans la pile | Integer |
| `%zessentials_iteminhand_lore%` | Texte du lore de l'objet | String |
| `%zessentials_iteminhand_enchantments%` | Tous les enchantements avec leurs niveaux | String |
| `%zessentials_iteminhand_hasenchantment_{enchantment}%` | Renvoie `true` si l'objet possède l'enchantement spécifié | Boolean |
| `%zessentials_iteminhand_enchantmentlevel_{enchantment}%` | Niveau de l'enchantement spécifié | Integer |
| `%zessentials_iteminhand_itemflags%` | Tous les flags d'objet appliqués à l'objet | String |
| `%zessentials_iteminhand_hasitemflag_{flag}%` | Renvoie `true` si l'objet possède le flag spécifié | Boolean |

### Placeholders Minecraft 1.21+

Ces placeholders sont uniquement disponibles sur Minecraft 1.21 et versions ultérieures :

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_iteminhand_rarity%` | Rareté de l'objet (`COMMON`, `UNCOMMON`, `RARE`, `EPIC`) | String |
| `%zessentials_iteminhand_repaircost%` | Coût de réparation à l'enclume de l'objet | Integer |
| `%zessentials_iteminhand_maxstacksize%` | Taille maximale de la pile pour l'objet | Integer |
| `%zessentials_iteminhand_hide_tooltip%` | Renvoie `true` si l'infobulle de l'objet est masquée | Boolean |
| `%zessentials_iteminhand_glint%` | Renvoie `true` si l'objet a un éclat d'enchantement | Boolean |
| `%zessentials_iteminhand_fire_resistant%` | Renvoie `true` si l'objet est résistant au feu | Boolean |
| `%zessentials_iteminhand_unbreakable%` | Renvoie `true` si l'objet est incassable | Boolean |

**Exemple :** Vérifier si l'objet tenu possède Sharpness :
```
%zessentials_iteminhand_hasenchantment_sharpness%
```
