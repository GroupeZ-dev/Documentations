---
sidebar_position: 6
title: Inventaires
description: Personnaliser les interfaces de l'hôtel des ventes dans zAuctionHouse
---

# Configuration des Inventaires

Toutes les interfaces de l'hôtel des ventes sont personnalisables via [zMenu](https://docs.groupez.dev/zmenu). Les fichiers d'inventaire se trouvent dans `plugins/zAuctionHouse/inventories/`.

## Inventaires Disponibles

| Fichier | Description |
|---------|-------------|
| `auction.yml` | Interface principale de l'hôtel des ventes |
| `categories.yml` | Menu de sélection des catégories |
| `confirm_buy.yml` | Dialogue de confirmation d'achat |
| `confirm_remove.yml` | Dialogue de confirmation de retrait |
| `expired.yml` | Objets expirés du joueur |
| `player.yml` | Objets en vente du joueur |
| `purchased.yml` | Objets achetés à récupérer |
| `sell.yml` | Interface de vente |

## Structure de Base

Chaque fichier d'inventaire suit la structure zMenu :

```yaml
# Nom de l'inventaire (supporte les placeholders)
name: "&6Hôtel des Ventes"

# Taille de l'inventaire (9, 18, 27, 36, 45, 54)
size: 54

# Objets dans l'inventaire
items:
  # Objet décoratif statique
  decoration:
    slot: 0
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: " "

  # Bouton fonctionnel
  close:
    slot: 49
    item:
      material: BARRIER
      name: "&cFermer"
    actions:
      - type: close
```

## Interface Principale

Exemple de `auction.yml` :

```yaml
name: "&6Hôtel des Ventes"
size: 54

# Remplir les emplacements vides
fillItem:
  material: BLACK_STAINED_GLASS_PANE
  name: " "

items:
  # Bouton catégories
  categories:
    slot: 4
    item:
      material: CHEST
      name: "&6Catégories"
      lore:
        - "&7Parcourir par catégorie"
        - ""
        - "&eCliquez pour voir les catégories"
    actions:
      - type: inventory
        inventory: "zauctionhouse/categories.yml"

  # Bouton recherche
  search:
    slot: 2
    item:
      material: COMPASS
      name: "&eRechercher"
      lore:
        - "&7Trouver des objets spécifiques"
        - ""
        - "&eCliquez pour rechercher"
    actions:
      - type: input
        input:
          type: CHAT
          message: "&eEntrez votre recherche :"
          action: "ah search %input%"

  # Bouton tri
  sort:
    slot: 6
    item:
      material: HOPPER
      name: "&6Tri : &f%zauctionhouse_sort%"
      lore:
        - "&7Changer la méthode de tri"
        - ""
        - "&eCliquez pour changer"
    actions:
      - type: zauctionhouse
        action: TOGGLE_SORT

  # Objets du joueur
  my-items:
    slot: 45
    item:
      material: BOOK
      name: "&aVos Objets"
      lore:
        - "&7Objets : &f%zauctionhouse_player_items_listed%/%zauctionhouse_player_limit%"
        - ""
        - "&eCliquez pour voir"
    actions:
      - type: inventory
        inventory: "zauctionhouse/player.yml"

  # Objets expirés
  expired:
    slot: 46
    item:
      material: CLOCK
      name: "&cObjets Expirés"
      lore:
        - "&7Objets : &f%zauctionhouse_player_items_expired%"
        - ""
        - "&eCliquez pour voir"
    actions:
      - type: inventory
        inventory: "zauctionhouse/expired.yml"

  # Objets achetés
  purchased:
    slot: 47
    item:
      material: CHEST_MINECART
      name: "&aObjets Achetés"
      lore:
        - "&7À récupérer : &f%zauctionhouse_player_items_to_claim%"
        - ""
        - "&eCliquez pour voir"
    actions:
      - type: inventory
        inventory: "zauctionhouse/purchased.yml"

  # Pagination - Précédent
  previous:
    slot: 48
    type: PREVIOUS
    item:
      material: ARROW
      name: "&ePage Précédente"

  # Info de page
  page-info:
    slot: 49
    item:
      material: PAPER
      name: "&ePage &f%page%&7/&f%max_page%"

  # Pagination - Suivant
  next:
    slot: 50
    type: NEXT
    item:
      material: ARROW
      name: "&ePage Suivante"

  # Bouton fermer
  close:
    slot: 53
    item:
      material: BARRIER
      name: "&cFermer"
    actions:
      - type: close

# Pagination des objets d'enchère
pagination:
  # Emplacements pour les objets (zone principale)
  slots:
    - 10-16
    - 19-25
    - 28-34
    - 37-43

  # Template pour chaque objet
  item:
    # Utilise l'objet réel en vente
    useAuctionItem: true

    # Lore supplémentaire ajouté aux objets
    lore:
      - ""
      - "&7Vendeur : &f%zauctionhouse_item_seller%"
      - "&7Prix : &6%zauctionhouse_item_price%"
      - "&7Expire : &f%zauctionhouse_item_expire_time%"
      - ""
      - "&eClic gauche pour acheter"
      - "&eClic droit pour info"

  # Actions au clic
  actions:
    LEFT:
      - type: inventory
        inventory: "zauctionhouse/confirm_buy.yml"
    RIGHT:
      - type: message
        messages:
          - "&7Mis en vente il y a : %zauctionhouse_item_listed_ago%"
```

## Confirmation d'Achat

Exemple de `confirm_buy.yml` :

```yaml
name: "&6Confirmer l'Achat"
size: 27

items:
  # Aperçu de l'objet acheté
  item-preview:
    slot: 13
    type: AUCTION_ITEM_PREVIEW

  # Bouton confirmer
  confirm:
    slot: 11
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&aConfirmer l'Achat"
      lore:
        - "&7Prix : &6%zauctionhouse_item_price%"
        - ""
        - "&eCliquez pour confirmer"
    actions:
      - type: zauctionhouse
        action: PURCHASE_ITEM

  # Bouton annuler
  cancel:
    slot: 15
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&cAnnuler"
      lore:
        - "&7Retour à l'hôtel des ventes"
    actions:
      - type: back
```

## Interface de Vente

Exemple de `sell.yml` :

```yaml
name: "&6Vendre un Objet"
size: 27

items:
  # Objet en cours de vente
  selling-item:
    slot: 4
    type: SELLING_ITEM_PREVIEW

  # Affichage du prix
  price:
    slot: 13
    item:
      material: GOLD_INGOT
      name: "&6Prix : &f%zauctionhouse_sell_price%"
      lore:
        - "&7Cliquez pour changer le prix"
    actions:
      - type: input
        input:
          type: ANVIL
          item:
            material: PAPER
            name: "%zauctionhouse_sell_price%"
          action: "ah setprice %input%"

  # Sélecteur d'économie
  economy:
    slot: 22
    item:
      material: EMERALD
      name: "&6Monnaie : &f%zauctionhouse_sell_economy%"
      lore:
        - "&7Cliquez pour changer de monnaie"
    actions:
      - type: zauctionhouse
        action: TOGGLE_ECONOMY

  # Confirmer la vente
  confirm:
    slot: 11
    item:
      material: LIME_STAINED_GLASS_PANE
      name: "&aMettre en Vente"
      lore:
        - "&7Prix : &6%zauctionhouse_sell_price%"
        - "&7Monnaie : &f%zauctionhouse_sell_economy%"
        - "&7Expire : &f%zauctionhouse_sell_expire%"
        - ""
        - "&eCliquez pour mettre en vente"
    actions:
      - type: zauctionhouse
        action: CONFIRM_SELL

  # Annuler
  cancel:
    slot: 15
    item:
      material: RED_STAINED_GLASS_PANE
      name: "&cAnnuler"
    actions:
      - type: close
```

## Patterns

Utilisez les patterns zMenu pour des éléments réutilisables :

```yaml
# Dans patterns/auction_pattern.yml
size: 54

items:
  border:
    slots:
      - 0-8
      - 45-53
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: " "
```

Puis utilisez dans les inventaires :

```yaml
# Dans auction.yml
name: "&6Hôtel des Ventes"
patterns:
  - "auction_pattern"

items:
  # Vos objets ici
```

## Bouton Historique des Ventes

Le bouton `ZAUCTIONHOUSE_HISTORY_INVENTORY` ouvre l'inventaire de l'historique des ventes.

```yaml
history:
  type: ZAUCTIONHOUSE_HISTORY_INVENTORY
  slot: 47
  item:
    material: BOOK
    name: "#2CCED2<bold>ʜɪsᴛᴏʀɪǫᴜᴇ ᴅᴇs ᴠᴇɴᴛᴇs"
    lore:
      - "#92ffffConsultez votre historique de ventes."
      - ""
      - "#8c8c8c• #2CCED2Cliquez #92ffffpour ouvrir"
```

## Bouton Sélecteur de Catégories

Le bouton `ZAUCTIONHOUSE_CATEGORY_SWITCHER` permet de parcourir les catégories avec un clic gauche/droit. Affiche un lore dynamique montrant l'état activé/désactivé de chaque catégorie.

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `enable-text` | String | Format pour la catégorie sélectionnée |
| `disable-text` | String | Format pour les catégories non sélectionnées |
| `categories` | Liste | Liste des IDs de catégories |
| `item` | Item | Apparence du bouton |

**Placeholders :**
- `%category%` - Nom d'affichage de la catégorie actuelle
- `%<category-id>%` - Remplacé par `enable-text` ou `disable-text` pour chaque catégorie

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
    name: "&6Catégories &7(&f%category%&7)"
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
      - "&7Clic gauche &8» &fSuivant"
      - "&7Clic droit &8» &fPrécédent"
```

:::tip
Utilisez `"main"` comme ID de catégorie pour représenter "Tous les objets" (sans filtrage).
:::

## Bouton Récupérer l'Argent

Le bouton `ZAUCTIONHOUSE_CLAIM` affiche l'argent en attente du joueur provenant des ventes et permet de le récupérer en un clic. Il affiche les montants par économie grâce à des placeholders dynamiques et supporte un état de chargement.

| Propriété | Type | Description |
|-----------|------|-------------|
| `slot` | Nombre | Position du bouton |
| `loading-item` | Item | Affiché pendant le chargement des données |
| `item` | Item | Apparence normale du bouton |

**Placeholders :**

| Placeholder | Description |
|-------------|-------------|
| `%pending_total%` | Argent total en attente (formaté) |
| `%pending_<nom_economie>%` | Argent en attente pour une économie spécifique (ex: `%pending_vault%`) |
| `%has_pending%` | `true` ou `false` |

:::info
Le nom de l'économie correspond au champ `name` défini dans votre fichier `economies.yml`. Par exemple, si vous avez une économie avec `name: vault`, utilisez `%pending_vault%`.
:::

```yaml
claim-money:
  type: ZAUCTIONHOUSE_CLAIM
  slot: 48
  loading-item:
    material: CLOCK
    name: "#2CCED2<bold>ʀᴇᴄᴜᴘᴇʀᴇʀ"
    lore:
      - "#8c8c8c• #ff3535Chargement, veuillez patienter..."
  item:
    material: GOLD_INGOT
    name: "#2CCED2<bold>ʀᴇᴄᴜᴘᴇʀᴇʀ"
    lore:
      - ""
      - "#92ffffArgent en attente#8c8c8c: #2CCED2%pending_total%"
      - ""
      - "#8c8c8c• #2CCED2Cliquez #92ffffpour récupérer votre argent"
```

**Exemple multi-économie :**

```yaml
claim-money:
  type: ZAUCTIONHOUSE_CLAIM
  slot: 48
  loading-item:
    material: CLOCK
    name: "#2CCED2<bold>ʀᴇᴄᴜᴘᴇʀᴇʀ"
    lore:
      - "#8c8c8c• #ff3535Chargement, veuillez patienter..."
  item:
    material: GOLD_INGOT
    name: "#2CCED2<bold>ʀᴇᴄᴜᴘᴇʀᴇʀ"
    lore:
      - ""
      - "#92ffffVault#8c8c8c: #2CCED2%pending_vault%"
      - "#92ffffTokens#8c8c8c: #2CCED2%pending_tokens%"
      - "#92ffffTotal#8c8c8c: #2CCED2%pending_total%"
      - ""
      - "#8c8c8c• #2CCED2Cliquez #92ffffpour récupérer votre argent"
```

## Actions Personnalisées

zAuctionHouse fournit des actions personnalisées :

| Action | Description |
|--------|-------------|
| `PURCHASE_ITEM` | Acheter l'objet sélectionné |
| `REMOVE_ITEM` | Retirer l'objet du joueur |
| `CLAIM_EXPIRED` | Récupérer un objet expiré |
| `CLAIM_PURCHASED` | Récupérer un objet acheté |
| `CLAIM_ALL_EXPIRED` | Récupérer tous les objets expirés |
| `CLAIM_ALL_PURCHASED` | Récupérer tous les objets achetés |
| `CONFIRM_SELL` | Confirmer la mise en vente |
| `TOGGLE_SORT` | Changer la méthode de tri |
| `TOGGLE_ECONOMY` | Changer d'économie |
| `OPEN_CATEGORY` | Ouvrir une catégorie spécifique |

Utilisation :

```yaml
actions:
  - type: zauctionhouse
    action: PURCHASE_ITEM
```

## Astuces

### Compteur d'Objets Dynamique

Affichez le nombre d'objets dans les boutons :

```yaml
expired:
  item:
    material: CLOCK
    name: "&cExpirés (%zauctionhouse_player_items_expired%)"
```

### Affichage Conditionnel

Masquez les boutons quand vides :

```yaml
expired:
  view-requirement:
    requirements:
      expired-check:
        type: placeholder
        placeholder: "%zauctionhouse_player_items_expired%"
        action: SUPERIOR
        value: 0
```

### Disposition Personnalisée des Catégories

```yaml
# categories.yml avec disposition personnalisée
name: "&6Catégories"
size: 45

items:
  weapons:
    slot: 10
    type: CATEGORY
    category: weapons

  armor:
    slot: 12
    type: CATEGORY
    category: armor
```

## Rechargement

Après avoir modifié les fichiers d'inventaire :

```
/ah admin reload
```

Les modifications prennent effet immédiatement pour les nouvelles ouvertures d'inventaire.
