---
sidebar_position: 8
title: Regles d'items
description: Systeme flexible de correspondance d'items utilise pour valider les items deposes dans un menu
---

# Regles d'items

Les regles d'items sont un **systeme flexible de correspondance d'items**. Au lieu de comparer un item a un seul item fixe, une regle decrit un ensemble de conditions qu'un item doit respecter (son materiau, son nom, son lore, une plage de custom-model-data, l'identifiant d'un item de plugin, etc.).

Les regles sont principalement utilisees par le bouton [`item_drag`](#le-bouton-item_drag) pour decider si un joueur a le droit de deposer un item dans un slot.

## Definir une regle

Une regle se definit avec une section `rule`. Chaque regle possede un `type` et ses propres options :

```yaml
rule:
  type: material
  materials:
    - DIAMOND
    - EMERALD
```

Vous pouvez combiner plusieurs regles avec les types composites `and` / `or` (voir [Combiner des regles](#combiner-des-regles)).

## Le bouton item_drag

Le bouton `item_drag` permet a un joueur de placer (deposer) un item dans un slot. Vous pouvez valider l'item depose avec une `rule`, afficher un item indicatif `check-item` et afficher un `error-item` lorsque l'item est refuse.

```yaml
items:
  deposer-ici:
    slot: 13
    type: item_drag

    # Optionnel : item affiche dans le slot quand il est vide
    check-item:
      type: full
      item:
        material: LIGHT_GRAY_STAINED_GLASS_PANE
        name: "&7Deposez un diamant ici"

    # Optionnel : item affiche brievement quand l'item depose est refuse
    error-item:
      duration: 20      # En ticks (defaut : 20)
      use_cache: true   # Defaut : true
      item:
        material: RED_STAINED_GLASS_PANE
        name: "&cItem invalide !"

    # Seuls les items correspondant a cette regle sont acceptes
    rule:
      type: material
      materials:
        - DIAMOND
```

| Option       | Type   | Description                                                              |
|--------------|--------|--------------------------------------------------------------------------|
| `check-item` | Item   | Item affiche dans le slot (avec un `type` de comparaison, defaut `full`) |
| `error-item` | Item   | Item affiche quand un item refuse est depose (`duration`, `use_cache`)   |
| `rule`       | Rule   | La regle que l'item depose doit respecter pour etre accepte              |

:::tip
`check-item` / `check_item` et `error-item` / `error_item` sont interchangeables (les deux orthographes fonctionnent).
:::

## Types de regles

### material

Correspond a un materiau exact.

```yaml
rule:
  type: material
  materials:
    - DIAMOND
    - EMERALD_BLOCK
```

| Cle | Type | Description |
|-----|------|-------------|
| `materials` | Liste | La liste des materiaux acceptes |

---

### material-contains / material-prefix / material-suffix

Correspondance sur le **nom** du materiau par sous-chaine, prefixe ou suffixe. Utile pour accepter des familles entieres de materiaux (toutes les laines, tous les rondins, etc.).

```yaml
rule:
  type: material-contains
  patterns:
    - "WOOL"        # correspond a WHITE_WOOL, RED_WOOL, ...
```

```yaml
rule:
  type: material-prefix
  prefixes:
    - "DIAMOND_"    # correspond a DIAMOND_SWORD, DIAMOND_PICKAXE, ...
```

```yaml
rule:
  type: material-suffix
  suffixes:
    - "_LOG"        # correspond a OAK_LOG, BIRCH_LOG, ...
```

| Type | Cle | Description |
|------|-----|-------------|
| `material-contains` | `patterns` | Sous-chaines que le nom du materiau doit contenir |
| `material-prefix` | `prefixes` | Prefixes par lesquels le nom du materiau doit commencer |
| `material-suffix` | `suffixes` | Suffixes par lesquels le nom du materiau doit finir |

---

### name

Correspondance sur le nom d'affichage de l'item.

```yaml
rule:
  type: name
  match-type: CONTAINS   # EXACT (defaut), PREFIX, SUFFIX ou CONTAINS
  ignore-case: true      # Defaut : true
  names:
    - "Legendaire"
```

| Cle | Type | Description |
|-----|------|-------------|
| `names` | Liste | La liste des noms a comparer |
| `match-type` | String | `EXACT` (defaut), `PREFIX`, `SUFFIX` ou `CONTAINS` |
| `ignore-case` | Booleen | Comparaison insensible a la casse (defaut : `true`) |

---

### lore

Correspondance sur le lore de l'item.

```yaml
rule:
  type: lore
  match-type: CONTAINS   # CONTAINS (defaut) ou EQUALS
  ignore-case: true      # Defaut : true
  values:
    - "Lie a l'ame"
```

| Cle | Type | Description |
|-----|------|-------------|
| `values` | Liste | Les lignes a rechercher dans le lore |
| `match-type` | String | `CONTAINS` (defaut) ou `EQUALS` |
| `ignore-case` | Booleen | Comparaison insensible a la casse (defaut : `true`) |

---

### tag

Correspondance sur un tag de materiau vanilla Minecraft (par exemple `minecraft:planks`, `minecraft:wool`).

```yaml
rule:
  type: tag
  tags:
    - "planks"
    - "wool"
```

| Cle | Type | Description |
|-----|------|-------------|
| `tags` | Liste | La liste des tags de materiaux a comparer |

**Alias :** `tag`, `material-tag`, `material_tag`, `tags`.

---

### custom-model-data

Correspondance sur le custom model data de l'item, par valeur exacte ou par plage.

```yaml
rule:
  type: custom-model-data
  values:
    - 1001
    - 1002
  ranges:
    - min: 2000
      max: 2999
```

| Cle | Type | Description |
|-----|------|-------------|
| `values` | Liste | Les valeurs de custom-model-data acceptees |
| `ranges` | Liste | Les plages acceptees, chacune avec `min` et `max` |

---

### Regles d'items de plugins

Ces regles font correspondre un item personnalise par son identifiant de plugin. Elles supportent les jokers (wildcards) et une option `ignore-case` (defaut `true`), et necessitent que le plugin correspondant soit installe.

```yaml
rule:
  type: itemsadder
  ignore-case: true
  items:
    - "myitems:ruby"
    - "myitems:*"      # joker
```

**Types de regles de plugins disponibles :** `craftengine`, `denizen`, `eco`, `executableblocks`, `executableitems`, `headdatabase`, `itemsadder`, `mmoitems`, `nexo`, `nextgens`, `nova`, `oraxen`, `slimefun`.

| Cle | Type | Description |
|-----|------|-------------|
| `items` | Liste | La liste des identifiants d'items a comparer (jokers supportes) |
| `ignore-case` | Booleen | Comparaison insensible a la casse (defaut : `true`) |

## Combiner des regles

Utilisez `and` / `or` pour combiner plusieurs regles.

**and** — l'item doit correspondre a **toutes** les sous-regles :

```yaml
rule:
  type: and
  rules:
    - type: material
      materials:
        - DIAMOND_SWORD
    - type: name
      match-type: CONTAINS
      names:
        - "Legendaire"
```

**or** — l'item doit correspondre a **au moins une** sous-regle :

```yaml
rule:
  type: or
  rules:
    - type: material
      materials:
        - DIAMOND
    - type: material
      materials:
        - EMERALD
```

| Cle | Type | Description |
|-----|------|-------------|
| `rules` | Liste | La liste des sous-regles a combiner |

## Voir aussi

- [Validation `item_drag` avec `check-inventory`](./requirements#check-inventory)
- [Plugins supportes](../supported-plugins)
