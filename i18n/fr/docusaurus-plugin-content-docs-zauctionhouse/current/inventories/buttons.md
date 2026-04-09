---
sidebar_position: 1
title: Boutons
description: Tous les types de boutons disponibles pour les inventaires de zAuctionHouse
---

# Types de Boutons

Cette page liste tous les types de boutons disponibles dans zAuctionHouse. Chaque type de bouton possède des fonctionnalités et des options de configuration spécifiques.

Tous les inventaires de zAuctionHouse sont propulsés par [zMenu](https://modrinth.com/plugin/zmenu). Pour la configuration générale des boutons zMenu (objets, emplacements, lore, etc.), consultez la [documentation zMenu](https://docs.groupez.dev/zmenu).

## Boutons d'Affichage des Objets

Ces boutons affichent et gèrent les objets de l'hôtel des ventes.

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSE_LISTED_ITEMS`](#zauctionhouse_listed_items) | Affiche tous les objets en vente avec pagination | [Enchères](./auction) |
| [`ZAUCTIONHOUSE_EXPIRED_ITEMS`](#zauctionhouse_expired_items) | Affiche les objets expirés du joueur | [Objets Expirés](./expired-items) |
| [`ZAUCTIONHOUSE_PURCHASED_ITEMS`](#zauctionhouse_purchased_items) | Affiche les objets achetés du joueur | [Objets Achetés](./purchased-items) |
| [`ZAUCTIONHOUSE_SELLING_ITEMS`](#zauctionhouse_selling_items) | Affiche les objets en vente du joueur | [Objets en Vente](./selling-items) |
| [`ZAUCTIONHOUSE_HISTORY_ITEMS`](#zauctionhouse_history_items) | Affiche l'historique des ventes du joueur | [Historique](./history) |

---

### ZAUCTIONHOUSE_LISTED_ITEMS

Affiche tous les objets actuellement en vente dans l'hôtel des ventes. Supporte la pagination, le filtrage par catégorie et le tri.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slots` | Liste | Emplacements où les objets sont affichés (ex. `9-17`, `18-26`) |
| `empty-slot` | Nombre | Emplacement pour le placeholder "aucun objet" |
| `item` | Item | Placeholder affiché quand aucun objet n'existe |

**Exemple :**

```yaml
displayItems:
  type: ZAUCTIONHOUSE_LISTED_ITEMS
  empty-slot: 22
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
  item:
    material: BARRIER
    name: '#ff0000&nNo items found'
```

---

### ZAUCTIONHOUSE_EXPIRED_ITEMS

Affiche les objets expirés que le joueur peut récupérer. Cliquez sur un objet pour le récupérer.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slots` | Liste | Emplacements où les objets sont affichés |
| `empty-slot` | Nombre | Emplacement pour le placeholder "aucun objet" |
| `item` | Item | Placeholder affiché quand aucun objet n'existe |

**Exemple :**

```yaml
items:
  type: ZAUCTIONHOUSE_EXPIRED_ITEMS
  empty-slot: 22
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
  item:
    material: BARRIER
    name: '#ff0000&nNo items found'
```

---

### ZAUCTIONHOUSE_PURCHASED_ITEMS

Affiche les objets que le joueur a achetés mais pas encore récupérés.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slots` | Liste | Emplacements où les objets sont affichés |
| `empty-slot` | Nombre | Emplacement pour le placeholder "aucun objet" |
| `item` | Item | Placeholder affiché quand aucun objet n'existe |

**Exemple :**

```yaml
items:
  type: ZAUCTIONHOUSE_PURCHASED_ITEMS
  empty-slot: 22
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
  item:
    material: BARRIER
    name: '#ff0000&nNo items found'
```

---

### ZAUCTIONHOUSE_SELLING_ITEMS

Affiche les objets que le joueur a actuellement en vente. Cliquez pour retirer un objet de la vente.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slots` | Liste | Emplacements où les objets sont affichés |
| `empty-slot` | Nombre | Emplacement pour le placeholder "aucun objet" |
| `item` | Item | Placeholder affiché quand aucun objet n'existe |

**Exemple :**

```yaml
items:
  type: ZAUCTIONHOUSE_SELLING_ITEMS
  empty-slot: 22
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
  item:
    material: BARRIER
    name: '#ff0000&nNo items found'
```

---

### ZAUCTIONHOUSE_HISTORY_ITEMS

Affiche l'historique des ventes du joueur (objets qu'il a vendus).

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slots` | Liste | Emplacements où les objets sont affichés |
| `loading-slot` | Nombre | Emplacement pour l'indicateur de chargement |
| `item` | Item | Placeholder de chargement |
| `else` | Objet | Configuration quand aucun historique n'existe |

**Exemple :**

```yaml
items:
  type: ZAUCTIONHOUSE_HISTORY_ITEMS
  loading-slot: 22
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
  item:
    material: BARRIER
    name: "#ff0000Loading..."
  else:
    slots:
      - 22
    item:
      material: BARRIER
      name: '#ff0000&nNo Sales Found'
```

---

## Boutons de Navigation

Ces boutons ouvrent d'autres inventaires.

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSE_EXPIRED_INVENTORY`](#zauctionhouse_expired_inventory) | Ouvre l'inventaire des objets expirés | [Enchères](./auction) |
| [`ZAUCTIONHOUSE_PURCHASED_INVENTORY`](#zauctionhouse_purchased_inventory) | Ouvre l'inventaire des objets achetés | [Enchères](./auction) |
| [`ZAUCTIONHOUSE_SELLING_INVENTORY`](#zauctionhouse_selling_inventory) | Ouvre l'inventaire des objets en vente | [Enchères](./auction) |
| [`ZAUCTIONHOUSE_HISTORY_INVENTORY`](#zauctionhouse_history_inventory) | Ouvre l'inventaire de l'historique des ventes | [Enchères](./auction) |
| [`ZAUCTIONHOUSE_CATEGORY`](#zauctionhouse_category) | Ouvre les enchères filtrées par catégorie | [Catégories](./categories) |
| [`ZAUCTIONHOUSE_CATEGORY_SWITCHER`](#zauctionhouse_category_switcher) | Parcourt les catégories avec clic gauche/droit | [Enchères](./auction) |
| [`ZAUCTIONHOUSE_SEARCH`](#zauctionhouse_search) | Ouvre la saisie de recherche par chat | [Enchères](./auction) |
| [`ZAUCTIONHOUSE_CLEAR_SEARCH`](#zauctionhouse_clear_search) | Efface le filtre de recherche actif | [Enchères](./auction) |

---

### ZAUCTIONHOUSE_EXPIRED_INVENTORY

Ouvre l'inventaire des objets expirés. Affiche des objets différents selon que le joueur possède ou non des objets expirés.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Affiché quand le joueur A des objets expirés |
| `else.item` | Item | Affiché quand le joueur N'A PAS d'objets expirés |

**Placeholders :**
- `%expired-items%` - Nombre d'objets expirés
- `%s%` - Suffixe de pluralisation ("" pour 1, "s" pour 2+)

**Exemple :**

```yaml
expired-items:
  type: ZAUCTIONHOUSE_EXPIRED_INVENTORY
  slot: 45
  item:
    url: "eyJ0ZXh0dXJlcy..."
    name: "#2CCED2<bold>ᴇxᴘɪʀᴇᴅ ɪᴛᴇᴍs"
    lore:
      - "#92ffffYou have #2CCED2%expired-items% #92ffffexpired item%s%."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto open"
  else:
    item:
      url: "eyJ0ZXh0dXJlcy..."
      name: "#2CCED2<bold>ᴇxᴘɪʀᴇᴅ ɪᴛᴇᴍs"
      lore:
        - "#ff3535You have no expired items."
```

---

### ZAUCTIONHOUSE_PURCHASED_INVENTORY

Ouvre l'inventaire des objets achetés.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Affiché quand le joueur A des objets achetés |
| `else.item` | Item | Affiché quand le joueur N'A PAS d'objets achetés |

**Placeholders :**
- `%purchased-items%` - Nombre d'objets achetés
- `%s%` - Suffixe de pluralisation

**Exemple :**

```yaml
purchased-items:
  type: ZAUCTIONHOUSE_PURCHASED_INVENTORY
  slot: 46
  item:
    url: "eyJ0ZXh0dXJlcy..."
    name: "#2CCED2<bold>ᴘᴜʀᴄʜᴀsᴇᴅ ɪᴛᴇᴍs"
    lore:
      - "#92ffffYou have #2CCED2%purchased-items% #92ffffbought item%s%."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto open"
  else:
    item:
      url: "eyJ0ZXh0dXJlcy..."
      name: "#2CCED2<bold>ᴘᴜʀᴄʜᴀsᴇᴅ ɪᴛᴇᴍs"
      lore:
        - "#ff3535You have no purchased items."
```

---

### ZAUCTIONHOUSE_SELLING_INVENTORY

Ouvre l'inventaire affichant les objets que le joueur a actuellement en vente.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Affiché quand le joueur A des objets en vente |
| `else.item` | Item | Affiché quand le joueur N'A PAS d'objets en vente |

**Placeholders :**
- `%selling-items%` - Nombre d'objets en vente
- `%s%` - Suffixe de pluralisation

**Exemple :**

```yaml
selling-items:
  type: ZAUCTIONHOUSE_SELLING_INVENTORY
  slot: 53
  item:
    url: "eyJ0ZXh0dXJlcy..."
    name: "#2CCED2<bold>ʏᴏᴜʀ ɪᴛᴇᴍs"
    lore:
      - "#92ffffYou have #2CCED2%selling-items% #92ffffitem%s% on sale."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto open"
  else:
    item:
      url: "eyJ0ZXh0dXJlcy..."
      name: "#2CCED2<bold>ʏᴏᴜʀ ɪᴛᴇᴍs"
      lore:
        - "#ff3535You have no items for sale."
```

---

### ZAUCTIONHOUSE_HISTORY_INVENTORY

Ouvre l'inventaire de l'historique des ventes.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Apparence du bouton |

**Exemple :**

```yaml
history:
  type: ZAUCTIONHOUSE_HISTORY_INVENTORY
  slot: 47
  item:
    material: BOOK
    name: "#2CCED2<bold>sᴀʟᴇs ʜɪsᴛᴏʀʏ"
    lore:
      - "#92ffffView your sales history."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto open"
```

---

### ZAUCTIONHOUSE_CATEGORY

Ouvre l'hôtel des ventes filtré par une catégorie spécifique.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `category` | Chaîne | Nom de la catégorie (doit correspondre à `categories.yml`) |
| `item` | Item | Apparence du bouton |

**Catégories spéciales :**
- `all` - Affiche tous les objets (sans filtrage)

**Placeholders :**
- `%zauctionhouse_category_count_<name>%` - Nombre d'objets dans la catégorie

**Exemple :**

```yaml
weapons:
  type: ZAUCTIONHOUSE_CATEGORY
  category: weapons
  slot: 20
  item:
    material: DIAMOND_SWORD
    name: "#ff5555<bold>ᴡᴇᴀᴘᴏɴs"
    lore:
      - "#92ffffCombat equipment"
      - ""
      - "#92ffffItems#8c8c8c: #2CCED2%zauctionhouse_category_count_weapons%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto browse"
```

---

### ZAUCTIONHOUSE_CATEGORY_SWITCHER

Parcourt les catégories en utilisant le clic gauche/droit. Affiche un lore dynamique montrant l'état activé/désactivé de chaque catégorie.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `enable-text` | Chaîne | Format pour la catégorie actuellement sélectionnée |
| `disable-text` | Chaîne | Format pour les catégories non sélectionnées |
| `categories` | Liste | Liste des identifiants de catégories à parcourir |
| `item` | Item | Apparence du bouton |

**Placeholders :**
- `%category%` - Nom d'affichage de la catégorie actuelle
- `%<category-id>%` - Remplacé par `enable-text` ou `disable-text` pour chaque catégorie

**Exemple :**

```yaml
category-switcher:
  type: ZAUCTIONHOUSE_CATEGORY_SWITCHER
  slot: 49
  enable-text: "&a● %category%"
  disable-text: "&7○ %category%"
  categories:
    - "main"
    - "weapons"
    - "armor"
    - "tools"
    - "blocks"
    - "consumables"
    - "resources"
    - "enchanted-books"
    - "misc"
  item:
    material: COMPASS
    name: "&6Categories &7(&f%category%&7)"
    lore:
      - ""
      - "%main%"
      - "%weapons%"
      - "%armor%"
      - "%tools%"
      - "%blocks%"
      - "%consumables%"
      - "%resources%"
      - "%enchanted-books%"
      - "%misc%"
      - ""
      - "&7Left-click &8» &fNext"
      - "&7Right-click &8» &fPrevious"
```

:::tip
Utilisez `"main"` comme identifiant de catégorie pour représenter "Tous les objets" (sans filtrage).
:::

---

## Boutons de Recherche

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSE_SEARCH`](#zauctionhouse_search) | Ouvre la saisie de recherche par chat | [Enchères](./auction) |
| [`ZAUCTIONHOUSE_CLEAR_SEARCH`](#zauctionhouse_clear_search) | Efface le filtre de recherche actif | [Enchères](./auction) |

---

### ZAUCTIONHOUSE_SEARCH

Ouvre une saisie de recherche par chat. Lorsque le joueur clique, son inventaire se ferme et il peut taper une requête de recherche dans le chat. Supporte des opérateurs de filtre avancés pour des recherches ciblées.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Apparence du bouton |

**Placeholders :**
- `%search_query%` - Requête de recherche actuelle (ou "None" si aucune recherche active)
- `%search_active%` - Indique si une recherche est active (`true`/`false`)

**Opérateurs de recherche :**

| Opérateur | Description |
|-----------|-------------|
| `~` | Contient (sensible à la casse) |
| `=` | Correspondance exacte (sensible à la casse) |
| `~=` | Contient (insensible à la casse) |
| `==` | Correspondance exacte (insensible à la casse) |

**Champs recherchables :** `name`, `material`, `lore`, `seller`

**Exemple :**

```yaml
search:
  type: ZAUCTIONHOUSE_SEARCH
  slot: 47
  is-permanent: true
  item:
    material: COMPASS
    name: "#2CCED2<bold>sᴇᴀʀᴄʜ"
    lore:
      - ""
      - "#92ffffCurrent search#8c8c8c: #2CCED2%search_query%"
      - ""
      - "#92ffffFilters#8c8c8c:"
      - "#8c8c8c  name #76CDCD~ #8c8c8cvalue    #555555(contains)"
      - "#8c8c8c  name #76CDCD= #8c8c8cvalue    #555555(exact)"
      - "#8c8c8c  name #76CDCD~= #8c8c8cvalue   #555555(contains, ignore case)"
      - "#8c8c8c  name #76CDCD== #8c8c8cvalue   #555555(exact, ignore case)"
      - ""
      - "#92ffffFields#8c8c8c: #76CDCDname#8c8c8c, #76CDCDmaterial#8c8c8c, #76CDCDlore#8c8c8c, #76CDCDseller"
      - ""
      - "#92ffffExamples#8c8c8c:"
      - "#8c8c8c  seller #76CDCD= #8c8c8cNotch"
      - "#8c8c8c  name #76CDCD~ #8c8c8cDiamond"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto search"
```

:::tip
Sans opérateur, la recherche effectue une correspondance de sous-chaîne insensible à la casse sur le nom de l'objet, le matériau, le lore et le nom du vendeur simultanément.
:::

---

### ZAUCTIONHOUSE_CLEAR_SEARCH

Efface le filtre de recherche actif. Ce bouton n'est visible que lorsque le joueur a une requête de recherche active.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Apparence du bouton |

**Placeholders :**
- `%search_query%` - Requête de recherche actuelle

**Exemple :**

```yaml
clear-search:
  type: ZAUCTIONHOUSE_CLEAR_SEARCH
  slot: 48
  is-permanent: true
  item:
    material: BARRIER
    name: "#ff6b6b<bold>ᴄʟᴇᴀʀ sᴇᴀʀᴄʜ"
    lore:
      - ""
      - "#92ffffSearching for#8c8c8c: #2CCED2%search_query%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto clear search"
```

---

## Bouton de Réclamation

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSE_CLAIM`](#zauctionhouse_claim) | Affiche l'argent en attente et permet de le réclamer | [Enchères](./auction) |

---

### ZAUCTIONHOUSE_CLAIM

Affiche l'argent en attente du joueur provenant des ventes et lui permet de le réclamer en un seul clic. Affiche les montants par économie en utilisant des placeholders dynamiques et supporte un état de chargement pendant la récupération des données.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `loading-item` | Item | Affiché pendant le chargement des données d'argent en attente |
| `item` | Item | Apparence normale du bouton avec les placeholders d'argent en attente |

**Placeholders :**

| Placeholder | Description |
|-------------|-------------|
| `%pending_total%` | Total de l'argent en attente pour toutes les économies (formaté) |
| `%pending_<economy_name>%` | Argent en attente pour une économie spécifique (ex. `%pending_vault%`) |
| `%has_pending%` | `true` ou `false` |

:::info
Le nom de l'économie correspond au champ `name` défini dans votre configuration `economies.yml`. Par exemple, si vous avez une économie avec `name: vault`, utilisez `%pending_vault%`.
:::

**Exemple :**

```yaml
claim-money:
  type: ZAUCTIONHOUSE_CLAIM
  slot: 48
  loading-item:
    material: CLOCK
    name: "#2CCED2<bold>ᴄʟᴀɪᴍ ᴍᴏɴᴇʏ"
    lore:
      - "#8c8c8c• #ff3535Loading, please wait..."
  item:
    material: GOLD_INGOT
    name: "#2CCED2<bold>ᴄʟᴀɪᴍ ᴍᴏɴᴇʏ"
    lore:
      - ""
      - "#92ffffPending money#8c8c8c: #2CCED2%pending_total%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto claim your money"
```

**Exemple multi-économie :**

```yaml
claim-money:
  type: ZAUCTIONHOUSE_CLAIM
  slot: 48
  loading-item:
    material: CLOCK
    name: "#2CCED2<bold>ᴄʟᴀɪᴍ ᴍᴏɴᴇʏ"
    lore:
      - "#8c8c8c• #ff3535Loading, please wait..."
  item:
    material: GOLD_INGOT
    name: "#2CCED2<bold>ᴄʟᴀɪᴍ ᴍᴏɴᴇʏ"
    lore:
      - ""
      - "#92ffffVault#8c8c8c: #2CCED2%pending_vault%"
      - "#92ffffTokens#8c8c8c: #2CCED2%pending_tokens%"
      - "#92ffffTotal#8c8c8c: #2CCED2%pending_total%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto claim your money"
```

---

## Boutons de Tri

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSE_CHANGE_SORT`](#zauctionhouse_change_sort) | Change l'ordre de tri des objets en vente | [Enchères](./auction) |
| [`ZAUCTIONHOUSE_HISTORY_SORT`](#zauctionhouse_history_sort) | Change l'ordre de tri de l'historique | [Historique](./history) |

---

### ZAUCTIONHOUSE_CHANGE_SORT

Parcourt les options de tri disponibles pour l'hôtel des ventes.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `sorts` | Liste | Options de tri disponibles |
| `enable-text` | Chaîne | Format pour l'option de tri sélectionnée |
| `disable-text` | Chaîne | Format pour les options de tri non sélectionnées |
| `loading-item` | Item | Affiché pendant le tri |
| `item` | Item | Apparence du bouton |

**Options de tri :**
- `DECREASING_DATE` - Plus récent en premier
- `INCREASING_DATE` - Plus ancien en premier
- `DECREASING_PRICE` - Plus cher en premier
- `INCREASING_PRICE` - Moins cher en premier

**Exemple :**

```yaml
change-sort:
  type: ZAUCTIONHOUSE_CHANGE_SORT
  slot: 52
  sorts:
    - DECREASING_DATE
    - DECREASING_PRICE
    - ASCENDING_DATE
    - ASCENDING_PRICE
  enable-text: ' #F27438➜ %sorting%'
  disable-text: ' #76CDCD➜ %sorting%'
  loading-item:
    material: HOPPER
    name: "#2CCED2<bold>sᴏʀᴛ ᴛʏᴘᴇ"
    lore:
      - "#8c8c8c• #ff3535Loading, please wait"
  item:
    material: HOPPER
    name: "#2CCED2<bold>sᴏʀᴛ ᴛʏᴘᴇ"
    lore:
      - "#92ffffAvailable sort types:"
      - "%DECREASING_DATE%"
      - "%DECREASING_PRICE%"
      - "%ASCENDING_DATE%"
      - "%ASCENDING_PRICE%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto change the sort type"
```

---

### ZAUCTIONHOUSE_HISTORY_SORT

Parcourt les options de tri pour l'historique des ventes.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `sorts` | Liste | Options de tri disponibles |
| `sort-names` | Map | Noms d'affichage pour les options de tri |
| `enable-text` | Chaîne | Format pour l'option de tri sélectionnée |
| `disable-text` | Chaîne | Format pour les options de tri non sélectionnées |
| `item` | Item | Apparence du bouton |

**Options de tri :**
- `DATE_DESC` - Plus récent en premier
- `DATE_ASC` - Plus ancien en premier
- `PRICE_DESC` - Prix le plus élevé en premier
- `PRICE_ASC` - Prix le plus bas en premier
- `BUYER_ASC` - Nom de l'acheteur A-Z
- `BUYER_DESC` - Nom de l'acheteur Z-A

**Exemple :**

```yaml
sort:
  type: ZAUCTIONHOUSE_HISTORY_SORT
  slot: 51
  enable-text: ' #F27438➜ %sorting%'
  disable-text: ' #76CDCD➜ %sorting%'
  sorts:
    - DATE_DESC
    - DATE_ASC
    - PRICE_DESC
    - PRICE_ASC
  sort-names:
    DATE_DESC: "Newest First"
    DATE_ASC: "Oldest First"
    PRICE_DESC: "Highest Price"
    PRICE_ASC: "Lowest Price"
  item:
    material: HOPPER
    name: "#2CCED2<bold>sᴏʀᴛ"
    lore:
      - "#92ffffAvailable sort types:"
      - "%DATE_DESC%"
      - "%DATE_ASC%"
      - "%PRICE_DESC%"
      - "%PRICE_ASC%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto change the sort type"
```

---

## Boutons de l'Inventaire de Vente

Ces boutons sont utilisés dans l'inventaire de vente.

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSE_SELL_SHOW_ITEM`](#zauctionhouse_sell_show_item) | Affiche les objets sélectionnés | [Vente](./sell) |
| [`ZAUCTIONHOUSE_SELL_PRICE`](#zauctionhouse_sell_price) | Ajuste le prix de mise en vente | [Vente](./sell) |
| [`ZAUCTIONHOUSE_SELL_ECONOMY`](#zauctionhouse_sell_economy) | Sélectionne le type d'économie | [Vente](./sell) |
| [`ZAUCTIONHOUSE_SELL_CONFIRM`](#zauctionhouse_sell_confirm) | Confirme la vente | [Vente](./sell) |
| [`ZAUCTIONHOUSE_SELL_CANCEL`](#zauctionhouse_sell_cancel) | Annule la vente | [Vente](./sell) |

---

### ZAUCTIONHOUSE_SELL_SHOW_ITEM

Affiche les objets sélectionnés pour la vente.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slots` | Liste | Emplacements pour l'affichage des objets |
| `empty-slot` | Nombre | Emplacement pour le placeholder "aucun objet" |
| `item` | Item | Placeholder quand aucun objet n'est sélectionné |

**Exemple :**

```yaml
show-item:
  type: ZAUCTIONHOUSE_SELL_SHOW_ITEM
  slots:
    - 9-44
  empty-slot: 22
  item:
    material: BARRIER
    name: "#ff0000<bold>No Item Selected"
    lore:
      - ""
      - "#8c8c8cHold an item in your hand"
      - "#8c8c8cor select items from your inventory"
```

---

### ZAUCTIONHOUSE_SELL_PRICE

Ajuste le prix de mise en vente avec différents montants par type de clic.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `amounts` | Map | Changements de prix par type de clic |
| `item` | Item | Apparence du bouton |

**Types de clic :**
- `left-click` - Clic gauche classique
- `right-click` - Clic droit classique
- `shift-left-click` - Maj + clic gauche
- `shift-right-click` - Maj + clic droit

**Placeholders :**
- `%price%` - Prix de mise en vente actuel

**Exemple (Diminuer) :**

```yaml
price-decrease:
  type: ZAUCTIONHOUSE_SELL_PRICE
  slot: 48
  amounts:
    left-click: -500
    right-click: -100
    shift-left-click: -1000
    shift-right-click: -2500
  item:
    url: eyJ0ZXh0dXJlcy...
    name: "#ff3333-1,000"
    lore:
      - ""
      - "<white>Current price#8c8c8c: #2CCED2%price%"
      - ""
      - "#8c8c8c• #92ffffLeft click#8c8c8c: -500"
      - "#8c8c8c• #92ffffRight click#8c8c8c: -100"
      - "#8c8c8c• #92ffffShift+Left#8c8c8c: -1,000"
      - "#8c8c8c• #92ffffShift+Right#8c8c8c: -2,500"
```

**Exemple (Augmenter) :**

```yaml
price-increase:
  type: ZAUCTIONHOUSE_SELL_PRICE
  slot: 50
  amounts:
    left-click: 500
    right-click: 100
    shift-left-click: 1000
    shift-right-click: 2500
  item:
    url: eyJ0ZXh0dXJlcy...
    name: '#00cc00+1,000'
    lore:
      - '<white>Current price#8c8c8c: #2CCED2%price%'
      - ''
      - '#8c8c8c• #92ffffLeft click#8c8c8c: +500'
      - '#8c8c8c• #92ffffRight click#8c8c8c: +100'
      - '#8c8c8c• #92ffffShift+Left#8c8c8c: +1,000'
      - '#8c8c8c• #92ffffShift+Right#8c8c8c: +2,500'
```

---

### ZAUCTIONHOUSE_SELL_ECONOMY

Parcourt les économies disponibles.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Apparence du bouton |

**Placeholders :**
- `%economy%` - Nom de l'économie actuelle

**Exemple :**

```yaml
select-economy:
  type: ZAUCTIONHOUSE_SELL_ECONOMY
  slot: 49
  item:
    url: eyJ0ZXh0dXJlcy...
    name: "#ffd700<bold>Economy"
    lore:
      - ""
      - "<white>Current#8c8c8c: #2CCED2%economy%"
      - ""
      - "#8c8c8c• #92ffffLeft click#8c8c8c: Next economy"
      - "#8c8c8c• #92ffffRight click#8c8c8c: Previous economy"
```

---

### ZAUCTIONHOUSE_SELL_CONFIRM

Confirme la vente et met les objets en vente.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Apparence du bouton |

**Placeholders :**
- `%economy%` - Économie sélectionnée
- `%price%` - Prix de mise en vente
- `%item_count%` - Nombre d'objets

**Exemple :**

```yaml
confirm:
  type: ZAUCTIONHOUSE_SELL_CONFIRM
  slot: 53
  item:
    material: LIME_STAINED_GLASS_PANE
    name: "#00ff00<bold>CONFIRM SALE"
    lore:
      - ""
      - "<white>Economy#8c8c8c: #2CCED2%economy%"
      - "<white>Price#8c8c8c: #2CCED2%price%"
      - "<white>Items#8c8c8c: #2CCED2%item_count%"
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto confirm the sale"
```

---

### ZAUCTIONHOUSE_SELL_CANCEL

Annule la vente et renvoie les objets au joueur.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Apparence du bouton |

**Exemple :**

```yaml
cancel:
  type: ZAUCTIONHOUSE_SELL_CANCEL
  slot: 45
  item:
    material: RED_STAINED_GLASS_PANE
    name: "#ff0000<bold>CANCEL"
    lore:
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto cancel and return items"
```

---

## Boutons de Confirmation

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSE_CONFIRM_PURCHASE`](#zauctionhouse_confirm_purchase) | Confirme un achat | [Confirmation d'Achat](./purchase-confirm) |
| [`ZAUCTIONHOUSE_CONFIRM_REMOVE_LISTED`](#zauctionhouse_confirm_remove_listed) | Confirme le retrait d'une annonce | [Confirmation de Retrait](./remove-confirm) |
| [`ZAUCTIONHOUSE_SHOW`](#zauctionhouse_show) | Affiche l'objet de l'enchère | [Confirmations](./purchase-confirm) |

---

### ZAUCTIONHOUSE_CONFIRM_PURCHASE

Confirme l'achat d'un objet.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slots` | Liste | Emplacements du bouton (zone de clic plus grande) |
| `item` | Item | Apparence du bouton |

**Exemple :**

```yaml
confirm:
  type: ZAUCTIONHOUSE_CONFIRM_PURCHASE
  slots:
    - 0-2
    - 9-11
    - 18-20
  item:
    material: GREEN_STAINED_GLASS_PANE
    name: "#2CCED2<bold>ᴘᴜʀᴄʜᴀsᴇ"
    lore:
      - "#92ffffPurchase this item."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto purchase"
```

---

### ZAUCTIONHOUSE_CONFIRM_REMOVE_LISTED

Confirme le retrait d'un objet de la vente.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slots` | Liste | Emplacements du bouton |
| `item` | Item | Apparence du bouton |

**Exemple :**

```yaml
remove:
  type: ZAUCTIONHOUSE_CONFIRM_REMOVE_LISTED
  slots:
    - 0-2
    - 9-11
    - 18-20
  item:
    material: GREEN_STAINED_GLASS_PANE
    name: "#2CCED2<bold>ʀᴇᴍᴏᴠᴇ"
    lore:
      - "#92ffffRemove this item."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto remove"
```

---

### ZAUCTIONHOUSE_SHOW

Affiche l'objet de l'enchère en cours de confirmation.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position d'affichage |

**Exemple :**

```yaml
show:
  type: ZAUCTIONHOUSE_SHOW
  slot: 13
```

---

## Boutons Shulker

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSE_SHULKER_OPEN`](#zauctionhouse_shulker_open) | Ouvre le visualiseur de contenu de shulker | [Confirmations](./purchase-confirm) |
| [`ZAUCTIONHOUSE_SHULKER_CONTENT`](#zauctionhouse_shulker_content) | Affiche le contenu du shulker | [Contenu Shulker](./shulker-content) |
| [`ZAUCTIONHOUSE_SHULKER_INFO`](#zauctionhouse_shulker_info) | Affiche les informations du shulker | [Contenu Shulker](./shulker-content) |
| [`ZAUCTIONHOUSE_SHULKER_NAVIGATION`](#zauctionhouse_shulker_navigation) | Navigue entre les shulkers | [Contenu Shulker](./shulker-content) |

---

### ZAUCTIONHOUSE_SHULKER_OPEN

Ouvre l'aperçu du contenu du shulker. Visible uniquement quand l'objet contient des boîtes de shulker.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Apparence du bouton |

**Exemple :**

```yaml
shulker:
  type: ZAUCTIONHOUSE_SHULKER_OPEN
  slot: 4
  item:
    material: SHULKER_BOX
    name: "#2CCED2<bold>ᴠɪᴇᴡ sʜᴜʟᴋᴇʀ ᴄᴏɴᴛᴇɴᴛ"
    lore:
      - "#92ffffView the content of shulker boxes."
      - ""
      - "#8c8c8c• #2CCED2Click #92ffffto view content"
```

---

### ZAUCTIONHOUSE_SHULKER_CONTENT

Affiche le contenu de la boîte de shulker actuelle.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slots` | Liste | Emplacements pour l'affichage du contenu |

**Exemple :**

```yaml
content:
  type: ZAUCTIONHOUSE_SHULKER_CONTENT
  slots:
    - 9-17
    - 18-26
    - 27-35
    - 36-44
```

---

### ZAUCTIONHOUSE_SHULKER_INFO

Affiche des informations sur le shulker actuel.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Apparence du bouton |

**Placeholders :**
- `%shulker_current%` - Numéro du shulker actuel
- `%shulker_total%` - Nombre total de shulkers

**Exemple :**

```yaml
shulker-info:
  type: ZAUCTIONHOUSE_SHULKER_INFO
  slot: 4
  item:
    material: SHULKER_BOX
    name: "#2CCED2<bold>sʜᴜʟᴋᴇʀ ʙᴏx"
    lore:
      - "#92ffffViewing shulker #2CCED2%shulker_current% #92ffffof #2CCED2%shulker_total%"
```

---

### ZAUCTIONHOUSE_SHULKER_NAVIGATION

Navigue entre les shulkers dans les ventes en lot.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `direction` | Chaîne | `previous` ou `next` |
| `item` | Item | Apparence du bouton |

**Exemple :**

```yaml
previous:
  type: ZAUCTIONHOUSE_SHULKER_NAVIGATION
  direction: previous
  slot: 48
  item:
    material: ARROW
    name: "#2CCED2<bold>ᴘʀᴇᴠɪᴏᴜs sʜᴜʟᴋᴇʀ"
    lore:
      - "#92ffffView the previous shulker box."

next:
  type: ZAUCTIONHOUSE_SHULKER_NAVIGATION
  direction: next
  slot: 50
  item:
    material: ARROW
    name: "#2CCED2<bold>ɴᴇxᴛ sʜᴜʟᴋᴇʀ"
    lore:
      - "#92ffffView the next shulker box."
```

---

## Boutons d'Objets en Lot

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSE_ITEM_CONTENT`](#zauctionhouse_item_content) | Affiche tous les objets d'une vente en lot | [Confirmation d'Achat d'Inventaire](./purchase-inventory-confirm), [Confirmation de Retrait d'Inventaire](./remove-inventory-confirm) |

---

### ZAUCTIONHOUSE_ITEM_CONTENT

Affiche tous les objets d'une vente en lot. Utilisé dans les inventaires de confirmation pour les achats et retraits en lot.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slots` | Liste | Emplacements pour l'affichage des objets |

**Exemple :**

```yaml
item-content:
  type: ZAUCTIONHOUSE_ITEM_CONTENT
  slots:
    - 9-44
```

---

## Boutons Administrateur

### Boutons de Navigation

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_MAIN`](#zauctionhouse_admin_history_main) | Affiche les informations du joueur ciblé | [Historique Admin](./admin/admin-history) |
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_EXPIRED`](#zauctionhouse_admin_history_expired) | Ouvre les objets expirés de la cible | [Historique Admin](./admin/admin-history) |
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_PURCHASED`](#zauctionhouse_admin_history_purchased) | Ouvre les objets achetés de la cible | [Historique Admin](./admin/admin-history) |
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_SELLING`](#zauctionhouse_admin_history_selling) | Ouvre les objets en vente de la cible | [Historique Admin](./admin/admin-history) |
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_LOGS`](#zauctionhouse_admin_history_logs) | Ouvre les journaux d'actions de la cible | [Historique Admin](./admin/admin-history) |
| [`ZAUCTIONHOUSE_ADMIN_HISTORY_TRANSACTIONS`](#zauctionhouse_admin_history_transactions) | Ouvre les transactions de la cible | [Historique Admin](./admin/admin-history) |

### Boutons d'Affichage des Objets

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| `ZAUCTIONHOUSE_ADMIN_SELLING_ITEMS` | Affiche les objets en vente de la cible | [Objets en Vente Admin](./admin/admin-selling-items) |
| `ZAUCTIONHOUSE_ADMIN_EXPIRED_ITEMS` | Affiche les objets expirés de la cible | [Objets Expirés Admin](./admin/admin-expired-items) |
| `ZAUCTIONHOUSE_ADMIN_PURCHASED_ITEMS` | Affiche les objets achetés de la cible | [Objets Achetés Admin](./admin/admin-purchased-items) |
| `ZAUCTIONHOUSE_ADMIN_LOGS` | Affiche les journaux d'actions | [Journaux Admin](./admin/admin-logs) |
| `ZAUCTIONHOUSE_ADMIN_TRANSACTIONS` | Affiche les transactions | [Transactions Admin](./admin/admin-transactions) |

### Boutons de Filtre

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| `ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_TYPE` | Filtre les journaux par type d'action | [Journaux Admin](./admin/admin-logs) |
| `ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_DATE` | Filtre les journaux par période | [Journaux Admin](./admin/admin-logs) |
| `ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_STATUS` | Filtre les transactions par statut | [Transactions Admin](./admin/admin-transactions) |
| `ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_DATE` | Filtre les transactions par date | [Transactions Admin](./admin/admin-transactions) |

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_MAIN

Affiche les informations du joueur ciblé (tête du joueur).

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `item` | Item | Apparence du bouton |

**Exemple :**

```yaml
target:
  type: ZAUCTIONHOUSE_ADMIN_HISTORY_MAIN
  slot: 13
  item:
    player-head: '%target%'
    name: '#2CCED2<bold>%target%'
```

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_EXPIRED

Ouvre l'inventaire admin des objets expirés pour le joueur ciblé.

**Placeholders :**
- `%target%` - Nom du joueur ciblé
- `%expired-items%` - Nombre d'objets expirés
- `%s%` - Suffixe de pluralisation

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_PURCHASED

Ouvre l'inventaire admin des objets achetés pour le joueur ciblé.

**Placeholders :**
- `%target%` - Nom du joueur ciblé
- `%purchased-items%` - Nombre d'objets achetés
- `%s%` - Suffixe de pluralisation

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_SELLING

Ouvre l'inventaire admin des objets en vente pour le joueur ciblé.

**Placeholders :**
- `%target%` - Nom du joueur ciblé
- `%selling-items%` - Nombre d'objets en vente
- `%s%` - Suffixe de pluralisation

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_LOGS

Ouvre l'inventaire admin des journaux d'actions pour le joueur ciblé.

---

### ZAUCTIONHOUSE_ADMIN_HISTORY_TRANSACTIONS

Ouvre l'inventaire admin des transactions pour le joueur ciblé.

---

### ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_TYPE

Parcourt les filtres de type de journal.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `types` | Liste | Types de journaux disponibles pour le filtre |
| `type-names` | Map | Noms d'affichage pour chaque type |
| `enable-text` | Chaîne | Format pour le type sélectionné |
| `disable-text` | Chaîne | Format pour les types non sélectionnés |
| `all-types-name` | Chaîne | Nom d'affichage pour l'option "tous" |

**Types de journaux :**
- `SALE` - L'objet a été mis en vente
- `PURCHASE` - L'objet a été acheté
- `REMOVE_LISTED` - L'objet a été retiré de la liste active
- `REMOVE_SELLING` - L'objet a été récupéré de l'inventaire de vente
- `REMOVE_EXPIRED` - L'objet a été récupéré de l'inventaire des expirés
- `REMOVE_PURCHASED` - L'objet a été récupéré de l'inventaire des achats

---

### ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_DATE

Parcourt les filtres de période.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `filters` | Liste | Filtres de date disponibles |
| `filter-names` | Map | Noms d'affichage pour chaque filtre |
| `enable-text` | Chaîne | Format pour le filtre sélectionné |
| `disable-text` | Chaîne | Format pour les filtres non sélectionnés |

**Filtres de date :**
- `ALL` - Toute la période
- `TODAY` - Aujourd'hui uniquement
- `THIS_WEEK` - 7 derniers jours
- `THIS_MONTH` - 30 derniers jours
- `THIS_YEAR` - 365 derniers jours

---

### ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_STATUS

Parcourt les filtres de statut de transaction.

**Configuration :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `statuses` | Liste | Statuts disponibles |
| `status-names` | Map | Noms d'affichage pour chaque statut |
| `enable-text` | Chaîne | Format pour le statut sélectionné |
| `disable-text` | Chaîne | Format pour les statuts non sélectionnés |
| `all-statuses-name` | Chaîne | Nom d'affichage pour l'option "tous" |

**Statuts :**
- `PENDING` - Argent pas encore réclamé
- `RETRIEVED` - Argent réclamé

---

### ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_DATE

Parcourt les filtres de période pour les transactions.

**Configuration :**

Identique à [`ZAUCTIONHOUSE_ADMIN_LOGS_FILTER_DATE`](#zauctionhouse_admin_logs_filter_date).

---

## Boutons intégrés zMenu

Ces boutons sont fournis par zMenu et fonctionnent dans tous les inventaires.

| Type | Description |
|------|-------------|
| `PREVIOUS` | Retourne à la page précédente |
| `NEXT` | Passe à la page suivante |
| `BACK` | Retourne à l'inventaire précédent |
| `inventory` | Ouvre un autre inventaire |

Consultez la [documentation zMenu](https://docs.groupez.dev/zmenu) pour plus de détails.
