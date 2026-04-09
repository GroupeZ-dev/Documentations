---
sidebar_position: 12
title: Patterns
description: Modèles de patterns réutilisables pour les inventaires de zAuctionHouse
---

# Patterns

Les patterns sont des modèles d'inventaire réutilisables qui ajoutent des éléments communs. Ils sont stockés dans `plugins/zAuctionHouse/patterns/` et peuvent être inclus dans n'importe quel inventaire.

## Fonctionnement des Patterns

- Les patterns sont appliqués dans l'ordre ; les patterns suivants peuvent remplacer les précédents
- Les objets des patterns peuvent être remplacés par l'inventaire qui les inclut
- Plusieurs patterns peuvent être combinés dans un seul inventaire

## Utilisation des Patterns

Incluez des patterns dans vos fichiers d'inventaire :

```yaml
name: "My Inventory"
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:
  # Your items here (override pattern slots as needed)
```

---

## zauctionhouse-decoration

Ajoute des bordures décoratives en vitres colorées sur les rangées du haut et du bas.

**Fichier :** `plugins/zAuctionHouse/patterns/decoration.yml`

**Configuration :**

```yaml
name: "zauctionhouse-decoration"
size: 54

items:

  decoration:
    is-permanent: true
    slots:
      - '0-8'     # Top row
      - '45-53'   # Bottom row
    item:
      material: LIGHT_BLUE_STAINED_GLASS_PANE
      name: "<white>"
```

**Visuel :**

```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │  ← Glass Panes
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │ ■ │  ← Glass Panes
└───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

---

## zauctionhouse-pagination

Ajoute des boutons de navigation page précédente et page suivante.

**Fichier :** `plugins/zAuctionHouse/patterns/pagination.yml`

**Configuration :**

```yaml
name: "zauctionhouse-pagination"
size: 54

items:

  previous:
    type: PREVIOUS
    is-permanent: true
    slot: 48
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjllYTFkODYyNDdmNGFmMzUxZWQxODY2YmNhNmEzMDQwYTA2YzY4MTc3Yzc4ZTQyMzE2YTEwOThlNjBmYjdkMyJ9fX0="
      name: "#2CCED2<bold>ᴘʀᴇᴠɪᴏᴜs ᴘᴀɢᴇ"
      lore:
        - "#92ffffGo to the previous page."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
    else:
      item:
        material: LIGHT_BLUE_STAINED_GLASS_PANE
        name: "<white>"

  next:
    type: NEXT
    is-permanent: true
    slot: 50
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvODI3MWE0NzEwNDQ5NWUzNTdjM2U4ZTgwZjUxMWE5ZjEwMmIwNzAwY2E5Yjg4ZTg4Yjc5NWQzM2ZmMjAxMDVlYiJ9fX0="
      name: "#2CCED2<bold>ɴᴇxᴛ ᴘᴀɢᴇ"
      lore:
        - "#92ffffGo to the next page."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
    else:
      item:
        material: LIGHT_BLUE_STAINED_GLASS_PANE
        name: "<white>"
```

**Visuel :**

```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │ < │   │ > │   │   │   │  ← Pagination
└───┴───┴───┴───┴───┴───┴───┴───┴───┘
             ↑       ↑
         Slot 48  Slot 50
```

**Comportement :**
- **Précédent** : Affiche la tête de flèche à partir de la page 2, vitre colorée sur la page 1
- **Suivant** : Affiche la tête de flèche quand d'autres pages existent, vitre colorée sur la dernière page

---

## zauctionhouse-back

Ajoute un bouton retour pour revenir à l'inventaire précédent.

**Fichier :** `plugins/zAuctionHouse/patterns/back.yml`

**Configuration :**

```yaml
name: "zauctionhouse-back"
size: 54

items:

  previous:
    type: BACK
    is-permanent: true
    slot: 49
    item:
      material: BARRIER
      name: "#2CCED2<bold>ʙᴀᴄᴋ"
      lore:
        - "#92ffffGo to the previous inventory."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto open"
```

**Visuel :**

```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │   │
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │ x │   │   │   │   │  ← Back
└───┴───┴───┴───┴───┴───┴───┴───┴───┘
                 ↑
             Slot 49
```

---

## Créer des Patterns Personnalisés

Vous pouvez créer vos propres patterns dans le dossier `patterns/` :

```yaml
# patterns/my-custom-pattern.yml
name: "my-custom-pattern"
size: 54

items:
  my-element:
    is-permanent: true
    slots:
      - 0
      - 8
    item:
      material: DIAMOND
      name: "&bDecoration"
```

Ensuite, utilisez-le dans vos inventaires :

```yaml
patterns:
  - 'my-custom-pattern'
```

:::tip
Les noms de patterns doivent être uniques dans tous les fichiers de patterns.
:::
