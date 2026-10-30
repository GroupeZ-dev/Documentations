---
title: Inventaires
description: Menus, patterns et types de boutons zMenu personnalisés de l'addon zAuctionHouseStats
---

# Inventaires

zAuctionHouseStats fournit cinq menus et deux patterns, tous propulsés par [zMenu](https://modrinth.com/plugin/zmenu). Cette page présente chaque menu, les patterns et tous les types de boutons personnalisés ajoutés par l'addon (`ZAUCTIONHOUSESTATS_*`), avec toutes leurs options.

Pour les options générales de zMenu (items, slots, lore, actions, requirements, etc.), consultez la [documentation zMenu](https://docs.groupez.dev/zmenu).

## Fichiers et dossiers

Tous les fichiers de menus se trouvent dans le dossier de données de l'addon :

```
plugins/zAuctionHouseStats/
├── language.yml
├── inventories/
│   ├── stats.yml
│   ├── leaderboard.yml
│   ├── player-stats.yml
│   ├── item-prices.yml
│   └── admin.yml
└── patterns/
    ├── zahstats-back.yml
    └── zahstats-pagination.yml
```

- Chaque fichier `.yml` de `inventories/` (sous-dossiers compris) est chargé comme un menu. Le nom du menu est le nom du fichier sans `.yml` (par exemple `leaderboard`).
- Chaque fichier `.yml` de `patterns/` est chargé comme un pattern. Vous pouvez y ajouter vos propres patterns.
- Un fichier par défaut manquant est recréé au démarrage. Un fichier existant n'est **jamais écrasé**, vos modifications sont donc conservées.
- `/zahstats reload` recharge tous les menus et patterns. Un pattern supprimé ou renommé est retiré de zMenu au rechargement.

<CalloutContainer type="warning">

<CalloutTitle>Fichiers de menus invalides</CalloutTitle>

<CalloutDescription>
Si un menu ou un pattern est invalide au démarrage, l'addon se désactive et affiche l'erreur dans la console. Si cela arrive pendant `/zahstats reload`, la configuration et les messages sont tout de même appliqués, et l'addon envoie le message `reload-menus-error`.
</CalloutDescription>

</CalloutContainer>

### Langue

Les menus par défaut sont disponibles en quatre langues. La langue est choisie dans `language.yml` :

| Valeur | Langue |
|--------|--------|
| `auto` | Détectée depuis la locale du serveur (pays d'abord, puis langue). Valeur par défaut |
| `en` | Anglais |
| `fr` | Français |
| `es` | Espagnol |
| `it` | Italien |

Toute autre valeur revient à l'anglais, avec un avertissement dans la console. Les quatre versions de chaque menu ont la même disposition, les mêmes slots et les mêmes types de boutons : seuls les textes changent. Les exemples de cette page sont les fichiers français.

```yaml
language: auto
```

<CalloutContainer type="info">

<CalloutDescription>
La langue s'applique uniquement aux fichiers qui **n'existent pas encore**. Pour changer de langue, supprimez `messages.yml` ainsi que les dossiers `inventories/` et `patterns/` dans `plugins/zAuctionHouseStats/`, puis redémarrez le serveur. `/zahstats reload` ne change pas la langue.
</CalloutDescription>

</CalloutContainer>

## Aperçu des menus

| Fichier | Rôle | Ouverture | Permission (`open-requirement`) |
|---------|------|-----------|---------------------------------|
| `stats.yml` | Hub : statistiques globales, top 3 des vendeurs, navigation | `/ah stats` | `zauctionhouse.stats.use` |
| `leaderboard.yml` | Classements paginés avec sélecteurs | Bouton du hub | `zauctionhouse.stats.top` |
| `player-stats.yml` | Fiche statistiques d'un joueur | Bouton « Mes statistiques » du hub, ou clic sur un joueur d'un classement / du podium | `zauctionhouse.stats.player` |
| `item-prices.yml` | Explorateur de prix des matériaux les plus vendus | `/zahstats items [économie]`, ou bouton du hub | `zauctionhouse.stats.items` |
| `admin.yml` | File d'écriture, caches et maintenance | Bouton du hub (affiché uniquement aux administrateurs) | `zauctionhouse.stats.admin` |

La vérification de permission est faite par un `open-requirement` zMenu dans chaque fichier. Si le joueur n'a pas la permission, le message `deny` du fichier est envoyé. Consultez [Commandes & Permissions](/zauctionhouse/addons/stats/commands-permissions) pour la liste complète des permissions.

Pour ouvrir un menu de l'addon depuis un autre bouton, utilisez un bouton zMenu `INVENTORY` avec `plugin: zAuctionHouseStats` :

```yaml
open-leaderboard:
  type: INVENTORY
  inventory: leaderboard
  plugin: zAuctionHouseStats
  slot: 38
  item:
    material: GOLD_INGOT
    name: "#2CCED2<bold>ᴄʟᴀssᴇᴍᴇɴᴛs"
```

Les menus sont ouverts avec un historique de navigation, le bouton `BACK` revient donc au menu précédent.

---

## stats.yml (Hub)

Le hub affiche les statistiques globales en direct, le top 3 des vendeurs et des boutons pour ouvrir les autres menus. Il s'ouvre avec `/ah stats`.

| Paramètre | Valeur |
|-----------|--------|
| Taille | 54 |
| `update-interval` | `1000` (ms) |
| `fill-item` | `BLACK_STAINED_GLASS_PANE` |

**Disposition :**

| Slot | Bouton | Type | Contenu |
|------|--------|------|---------|
| 4 | `header` | `ZAUCTIONHOUSESTATS_TEXT` | Titre et `%zahstats_global_auctions_opened%` |
| 10 | `listed` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_items_listed%` |
| 11 | `sold` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_items_sold%` |
| 12 | `expired` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_items_expired%`, `%zahstats_global_items_removed%` |
| 14 | `volume` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_money_volume_format%` |
| 15 | `tax` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_tax_collected_format%` |
| 16 | `biggest` | `ZAUCTIONHOUSESTATS_TEXT` | `%zahstats_global_biggest_sale_format%` |
| 22 | `podium-first` | `ZAUCTIONHOUSESTATS_PODIUM` | Rang 1 de `TOP_SELLERS_MONEY` / `ALL` |
| 30 | `podium-second` | `ZAUCTIONHOUSESTATS_PODIUM` | Rang 2 |
| 32 | `podium-third` | `ZAUCTIONHOUSESTATS_PODIUM` | Rang 3 |
| 38 | `open-leaderboard` | `INVENTORY` | Ouvre `leaderboard` |
| 40 | `my-stats` | `ZAUCTIONHOUSESTATS_MY_STATS` | Ouvre votre propre `player-stats` |
| 42 | `open-item-prices` | `INVENTORY` | Ouvre `item-prices` |
| 53 | `open-admin` | `INVENTORY` | Ouvre `admin`, uniquement avec `zauctionhouse.stats.admin` (sinon une vitre) |

Les boutons de statistiques utilisent `update: true`, ils se rafraîchissent donc à chaque `update-interval`. Les valeurs sont lues uniquement depuis les caches mémoire : un rafraîchissement n'attend jamais une requête en base de données (une valeur pas encore en cache est chargée en arrière-plan et affiche `placeholders.loading` en attendant).

```
┌───┬───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │ H │   │   │   │   │  H = en-tête
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │ L │ S │ E │   │ V │ T │ B │   │  Statistiques globales
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │ 1 │   │   │   │   │  Podium n°1
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │ 2 │   │ 3 │   │   │   │  Podium n°2 et n°3
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │ ↗ │   │ ★ │   │ ↗ │   │   │  Classements / Mes stats / Prix
├───┼───┼───┼───┼───┼───┼───┼───┼───┤
│   │   │   │   │   │   │   │   │ A │  A = admin
└───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

---

## leaderboard.yml

Classements paginés. Le joueur change la métrique, la période et l'économie avec les trois sélecteurs du bas. Cliquer sur un joueur ouvre sa fiche statistiques.

| Paramètre | Valeur |
|-----------|--------|
| Taille | 54 |
| `update-interval` | `1000` (ms) |
| Patterns | `zahstats-pagination`, `zahstats-back` |

**Disposition :**

| Slot(s) | Bouton | Type |
|---------|--------|------|
| 0-8, 51-53 | `decoration` | `NONE` (vitres) |
| 9-44 | `leaderboard` | `ZAUCTIONHOUSESTATS_LEADERBOARD` (`loading-slot: 22`) |
| 45 | `metric-selector` | `ZAUCTIONHOUSESTATS_METRIC_SELECTOR` |
| 46 | `period-selector` | `ZAUCTIONHOUSESTATS_PERIOD_SELECTOR` |
| 47 | `economy-selector` | `ZAUCTIONHOUSESTATS_ECONOMY_SELECTOR` |
| 48 | `previous` | `PREVIOUS` (pattern `zahstats-pagination`) |
| 49 | `back` | `BACK` (pattern `zahstats-back`) |
| 50 | `next` | `NEXT` (pattern `zahstats-pagination`) |

La sélection par défaut de ce menu est `metric: TOP_SELLERS_MONEY`, `period: ALL` et l'économie par défaut.

<CalloutContainer type="info">

<CalloutTitle>Nombre d'entrées</CalloutTitle>

<CalloutDescription>
Un classement contient au maximum `leaderboards.size` entrées (par défaut `10`, entre `1` et `100`) dans `config.yml`. Avec la valeur par défaut, les 36 slots de données tiennent sur une seule page. Augmentez `leaderboards.size` pour obtenir plus de pages. Consultez [Configuration](/zauctionhouse/addons/stats/configuration).
</CalloutDescription>

</CalloutContainer>

---

## player-stats.yml

La fiche statistiques d'un joueur : les compteurs additionnés sur toutes les économies, puis une entrée par économie.

La fiche affiche :
- **Le joueur cliqué** dans un classement ou dans le podium du hub.
- **Vous-même** lorsqu'elle est ouverte avec le bouton `ZAUCTIONHOUSESTATS_MY_STATS` (cela efface le joueur cliqué auparavant) ou avec `/ah stats` puis « Mes statistiques ».

| Paramètre | Valeur |
|-----------|--------|
| Taille | 54 |
| Patterns | `zahstats-pagination`, `zahstats-back` |

**Disposition :**

| Slot(s) | Bouton | Type |
|---------|--------|------|
| 0-12, 14-26, 45-47, 51-53 | `decoration` | `NONE` (vitres) |
| 13 | `player-stats` | `ZAUCTIONHOUSESTATS_PLAYER_STATS` (tête du joueur et compteurs) |
| 27-44 | `economies` | `ZAUCTIONHOUSESTATS_PLAYER_ECONOMIES` (`loading-slot: 31`) |
| 48 / 49 / 50 | `previous` / `back` / `next` | Issus des patterns |

<CalloutContainer type="info">

<CalloutDescription>
`/zahstats player [nom]` affiche les statistiques **dans le chat**, elle n'ouvre pas ce menu.
</CalloutDescription>

</CalloutContainer>

---

## item-prices.yml

L'explorateur de prix liste les matériaux les plus vendus pour l'économie et la période sélectionnées, avec le nombre de ventes, le prix moyen et le prix médian. La liste est dynamique : elle est calculée à partir des ventes, il n'y a aucune liste de matériaux codée en dur. L'icône de chaque entrée est le matériau vendu lui-même.

Il s'ouvre avec `/zahstats items [économie]`. Si une économie est indiquée, elle est sélectionnée à l'ouverture du menu.

| Paramètre | Valeur |
|-----------|--------|
| Taille | 54 |
| Patterns | `zahstats-pagination`, `zahstats-back` |

**Disposition :**

| Slot(s) | Bouton | Type |
|---------|--------|------|
| 0-8, 45, 51-53 | `decoration` | `NONE` (vitres) |
| 9-44 | `item-prices` | `ZAUCTIONHOUSESTATS_ITEM_PRICES` (`loading-slot: 22`) |
| 46 | `period-selector` | `ZAUCTIONHOUSESTATS_PERIOD_SELECTOR` |
| 47 | `economy-selector` | `ZAUCTIONHOUSESTATS_ECONOMY_SELECTOR` |
| 48 / 49 / 50 | `previous` / `back` / `next` | Issus des patterns |

La sélection par défaut est `period: ALL` et l'économie par défaut. Le nombre de matériaux est défini par `item-prices.top-limit` dans `config.yml` (par défaut `100`, entre `1` et `500`).

Le prix médian est calculé uniquement pour les matériaux de la page consultée. Tant qu'il n'est pas prêt, `%median%` et `%format_median%` affichent le texte `placeholders.loading` de `config.yml`, puis la page se rafraîchit d'elle-même.

---

## admin.yml

Le panneau d'administration : état en direct de la file d'écriture et des caches, et raccourcis vers les commandes de maintenance.

| Paramètre | Valeur |
|-----------|--------|
| Taille | 27 |
| `update-interval` | `1000` (ms) |
| `fill-item` | `BLACK_STAINED_GLASS_PANE` |

**Disposition :**

| Slot | Bouton | Type | Action |
|------|--------|------|--------|
| 10 | `reload` | `NONE` | Exécute `zahstats reload` (`player_command`) |
| 11 | `clearcache` | `NONE` | Exécute `zahstats clearcache` (`player_command`) |
| 13 | `status` | `ZAUCTIONHOUSESTATS_ADMIN_STATUS` | État en direct (`update: true`) |
| 15 | `purge` | `NONE` | Envoie `/zahstats purge <jours> confirm` dans le chat et ferme le menu |
| 16 | `import` | `NONE` | Envoie `/zahstats import v1 confirm` dans le chat et ferme le menu |
| 22 | `back` | `BACK` | Menu précédent |

La purge et l'import sont irréversibles, ces boutons affichent donc uniquement la commande. Le joueur doit la taper lui-même.

---

## Patterns

L'addon fournit deux patterns. Leurs noms commencent par `zahstats-` car le registre des patterns de zMenu est partagé par tous les plugins : conservez ce préfixe si vous les renommez ou si vous ajoutez les vôtres, afin d'éviter les conflits.

| Pattern | Fichier | Slots | Contenu |
|---------|---------|-------|---------|
| `zahstats-pagination` | `patterns/zahstats-pagination.yml` | 48, 50 | Boutons `PREVIOUS` et `NEXT` (vitre quand il n'y a pas d'autre page) |
| `zahstats-back` | `patterns/zahstats-back.yml` | 49 | Bouton `BACK` |

Les deux patterns sont en `size: 54` et leurs boutons utilisent `is-permanent: true`. Ils sont utilisés par `leaderboard.yml`, `player-stats.yml` et `item-prices.yml` :

```yaml
patterns:
  - "zahstats-pagination"
  - "zahstats-back"
```

### zahstats-pagination

```yaml
name: "zahstats-pagination"
size: 54

items:
  previous:
    type: PREVIOUS
    is-permanent: true
    slot: 48
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjllYTFkODYyNDdmNGFmMzUxZWQxODY2YmNhNmEzMDQwYTA2YzY4MTc3Yzc4ZTQyMzE2YTEwOThlNjBmYjdkMyJ9fX0="
      name: "#2CCED2<bold>ᴘᴀɢᴇ ᴘʀᴇ́ᴄᴇ́ᴅᴇɴᴛᴇ"
      lore:
        - "#92ffffAller à la page précédente. #8c8c8c(%page%/%max-page%)"
    else:
      item:
        material: BLACK_STAINED_GLASS_PANE
        name: "<white>"
  next:
    type: NEXT
    is-permanent: true
    slot: 50
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvODI3MWE0NzEwNDQ5NWUzNTdjM2U4ZTgwZjUxMWE5ZjEwMmIwNzAwY2E5Yjg4ZTg4Yjc5NWQzM2ZmMjAxMDVlYiJ9fX0="
      name: "#2CCED2<bold>ᴘᴀɢᴇ sᴜɪᴠᴀɴᴛᴇ"
      lore:
        - "#92ffffAller à la page suivante. #8c8c8c(%page%/%max-page%)"
    else:
      item:
        material: BLACK_STAINED_GLASS_PANE
        name: "<white>"
```

### zahstats-back

```yaml
name: "zahstats-back"
size: 54

items:
  back:
    type: BACK
    is-permanent: true
    slot: 49
    item:
      material: DARK_OAK_DOOR
      name: "#2CCED2<bold>ʀᴇᴛᴏᴜʀ"
      lore:
        - "#92ffffRevenir au menu précédent."
```

---

## Types de boutons

| Type | Description | Utilisé dans |
|------|-------------|--------------|
| [`ZAUCTIONHOUSESTATS_LEADERBOARD`](#zauctionhousestats_leaderboard) | Classement paginé avec les têtes des joueurs | `leaderboard.yml` |
| [`ZAUCTIONHOUSESTATS_METRIC_SELECTOR`](#zauctionhousestats_metric_selector) | Fait défiler les métriques de classement | `leaderboard.yml` |
| [`ZAUCTIONHOUSESTATS_PERIOD_SELECTOR`](#zauctionhousestats_period_selector) | Fait défiler les périodes | `leaderboard.yml`, `item-prices.yml` |
| [`ZAUCTIONHOUSESTATS_ECONOMY_SELECTOR`](#zauctionhousestats_economy_selector) | Fait défiler les économies | `leaderboard.yml`, `item-prices.yml` |
| [`ZAUCTIONHOUSESTATS_PODIUM`](#zauctionhousestats_podium) | Un rang d'un classement, avec la tête du joueur | `stats.yml` |
| [`ZAUCTIONHOUSESTATS_PLAYER_STATS`](#zauctionhousestats_player_stats) | Tête et compteurs du joueur de la fiche | `player-stats.yml` |
| [`ZAUCTIONHOUSESTATS_PLAYER_ECONOMIES`](#zauctionhousestats_player_economies) | Une entrée par économie du joueur (paginé) | `player-stats.yml` |
| [`ZAUCTIONHOUSESTATS_ITEM_PRICES`](#zauctionhousestats_item_prices) | Matériaux les plus vendus avec leurs prix (paginé) | `item-prices.yml` |
| [`ZAUCTIONHOUSESTATS_ADMIN_STATUS`](#zauctionhousestats_admin_status) | État en direct de la file et des caches | `admin.yml` |
| [`ZAUCTIONHOUSESTATS_TEXT`](#zauctionhousestats_text) | Bouton d'affichage qui résout `%zahstats_*%` sans PlaceholderAPI | `stats.yml` |
| [`ZAUCTIONHOUSESTATS_MY_STATS`](#zauctionhousestats_my_stats) | Ouvre votre propre fiche statistiques | `stats.yml` |

Tous ces types acceptent aussi les options standard de zMenu (`slot`/`slots`, `item`, `actions`, `permission`, `update`, etc.).

### Règles communes

**Chargement.** Les boutons de données n'interrogent jamais la base de données pendant l'affichage du menu. Quand les données ne sont pas encore en cache, le bouton affiche son `loading-item`, charge les données en arrière-plan, puis rafraîchit le menu une fois les données prêtes. Les durées de cache sont définies dans la section `caches` de `config.yml`.

**Items manquants.** Si un bouton a besoin de `entry-item`, `loading-item` ou `empty-item` et que la section est absente, un avertissement est affiché dans la console et le bouton utilise sa section `item` à la place.

**Valeurs invalides.** Une valeur de `metric` ou `period` invalide est signalée dans la console (fichier et chemin) et remplacée par sa valeur par défaut. Une faute de frappe ne casse jamais le menu.

**Placeholders `%zahstats_*%`.** Dans chaque bouton `ZAUCTIONHOUSESTATS_*`, les placeholders `%zahstats_...%` du `name` et du `lore` sont résolus par l'addon lui-même, **sans PlaceholderAPI**. Les boutons zMenu standard (`NONE`, `INVENTORY`, ...) ont besoin de PlaceholderAPI pour cela. Consultez [Placeholders](/zauctionhouse/addons/stats/placeholders) pour la liste complète.

### Sélection par défaut : métrique, période, économie

`ZAUCTIONHOUSESTATS_LEADERBOARD`, `ZAUCTIONHOUSESTATS_ITEM_PRICES` et `ZAUCTIONHOUSESTATS_PODIUM` lisent ces options :

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `metric` | Métrique | `TOP_SELLERS_MONEY` | Métrique du classement (ignorée par `ZAUCTIONHOUSESTATS_ITEM_PRICES`) |
| `period` | Période | `ALL` | Période des données |
| `economy` | Texte | Économie par défaut | Nom d'une économie zAuctionHouse. Si absente, voir ci-dessous |

**Métriques :**

| Valeur | Description | Argent |
|--------|-------------|--------|
| `TOP_SELLERS_MONEY` | Argent gagné par les vendeurs, après taxes | Oui |
| `TOP_BUYERS_MONEY` | Argent dépensé par les acheteurs, taxes comprises | Oui |
| `TOP_SELLERS_COUNT` | Nombre de ventes | Non |
| `TOP_BUYERS_COUNT` | Nombre d'achats | Non |
| `TOP_TAX_PAID` | Total des taxes payées | Oui |
| `BIGGEST_SALE` | Plus grosse vente unique | Oui |

**Périodes :**

| Valeur | Description |
|--------|-------------|
| `DAY` | Aujourd'hui, depuis minuit |
| `WEEK` | Cette semaine, depuis lundi |
| `MONTH` | Ce mois-ci, depuis le 1er |
| `ALL` | Depuis toujours |

Les périodes utilisent le `statistics.timezone` de `config.yml`.

**Quand `economy` n'est pas défini :**
- Les métriques d'argent et les prix utilisent l'économie par défaut : `leaderboards.default-economy` dans `config.yml`, ou l'économie par défaut de zAuctionHouse si la valeur est vide.
- Les métriques de comptage (`TOP_SELLERS_COUNT`, `TOP_BUYERS_COUNT`) utilisent **toutes les économies combinées**.

Les montants d'argent ne sont jamais additionnés entre plusieurs économies.

### ZAUCTIONHOUSESTATS_LEADERBOARD

Affiche un classement sur plusieurs slots, avec pagination. La métrique, la période et l'économie viennent des options du bouton, et peuvent être changées par le joueur avec les sélecteurs du même menu. Cliquer sur une entrée ouvre la fiche statistiques (`player-stats.yml`) de ce joueur.

**Configuration :**

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `slots` | Liste | - | Slots des entrées |
| `entry-item` | Item | `item` | Modèle de chaque entrée |
| `loading-item` | Item | `item` | Affiché au `loading-slot` pendant le chargement du classement |
| `loading-slot` | Nombre | `22` | Slot des items de chargement et « aucune donnée ». `-1` = jamais affichés |
| `player-heads` | Booléen | `true` | Applique le skin du joueur sur les entrées `PLAYER_HEAD` |
| `metric` | Métrique | `TOP_SELLERS_MONEY` | Métrique par défaut |
| `period` | Période | `ALL` | Période par défaut |
| `economy` | Texte | Économie par défaut | Économie par défaut |
| `item` | Item | - | Affiché au `loading-slot` quand la sélection courante n'a aucune donnée, ou quand une métrique d'argent n'a aucune économie à utiliser (pas d'économie par défaut) |

**Placeholders des entrées** (`entry-item`) :

| Placeholder | Description |
|-------------|-------------|
| `%rank%` | Rang du joueur |
| `%name%` | Nom du joueur (`leaderboards.unknown-name` si inconnu) |
| `%value%` | Valeur brute |
| `%format%` | Valeur formatée par l'économie zAuctionHouse pour les métriques d'argent, valeur brute pour les métriques de comptage |
| `%economy%` | Nom de l'économie (vide quand toutes les économies sont combinées) |

**Exemple :**

```yaml
leaderboard:
  type: ZAUCTIONHOUSESTATS_LEADERBOARD
  slots:
    - "9-17"
    - "18-26"
    - "27-35"
    - "36-44"
  metric: TOP_SELLERS_MONEY
  period: ALL
  # economy: vault
  player-heads: true
  loading-slot: 22
  loading-item:
    material: CLOCK
    name: "#f1c40fChargement du classement..."
  entry-item:
    material: PLAYER_HEAD
    name: "#f1c40f#%rank% #ffffff%name%"
    lore:
      - "#92ffffValeur : #2CCED2%format%"
      - ""
      - "#8c8c8c• #2CCED2Clic #92ffffpour voir la fiche du joueur"
  item:
    material: BARRIER
    name: "#ff5555Aucune donnée pour cette sélection"
    lore:
      - "#92ffffChangez de métrique, de période ou d'économie."
```

### Sélecteurs

Les trois types de sélecteurs fonctionnent de la même façon :

- **Clic gauche** : valeur suivante.
- **Clic droit** : valeur précédente.
- La liste boucle : après la dernière valeur vient la première.
- Après un changement, le menu se rouvre à la **page 1**, et l'historique de navigation est conservé.
- Les `actions`, messages et sons du bouton sont toujours exécutés au clic.

**Configuration (tous les sélecteurs) :**

| Propriété | Type | Description |
|-----------|------|-------------|
| `metrics` / `periods` / `economies` | Liste | Valeurs du cycle, dans l'ordre (voir chaque sélecteur) |
| `labels` | Section | Nom affiché de chaque valeur (`VALEUR: "Libellé"`). Les clés ne sont pas sensibles à la casse |
| `item` | Item | Item affiché |

**Placeholders** (`item`) :

| Placeholder | Description |
|-------------|-------------|
| `%selected%` | Libellé de la valeur courante |
| `%next%` | Libellé de la valeur sélectionnée par un clic gauche |
| `%previous%` | Libellé de la valeur sélectionnée par un clic droit |

Une valeur sans libellé affiche son nom brut (par exemple `TOP_TAX_PAID`). Dans `metrics` et `periods`, les valeurs invalides sont signalées dans la console et ignorées, et les doublons sont ignorés. Si la liste est vide ou ne contient que des valeurs invalides, la liste par défaut est utilisée. `economies` n'est pas vérifiée auprès de zAuctionHouse : les entrées vides et les doublons sont retirés, les autres noms sont utilisés tels quels. Si le cycle se retrouve vide (par exemple si toutes les métriques sont désactivées), un clic ne fait rien.

<CalloutContainer type="info">

<CalloutTitle>Fonctionnement de la sélection</CalloutTitle>

<CalloutDescription>
La sélection est stockée **par joueur** et ne contient que les valeurs que le joueur a changées. Les autres valeurs viennent du bouton de données du menu (`ZAUCTIONHOUSESTATS_LEADERBOARD` ou `ZAUCTIONHOUSESTATS_ITEM_PRICES`). Placez les sélecteurs dans le même menu que l'un de ces boutons, afin qu'ils affichent la valeur réellement utilisée. La sélection est partagée entre les menus (une économie choisie dans `leaderboard.yml` est conservée dans `item-prices.yml`) et est effacée à la déconnexion du joueur. `ZAUCTIONHOUSESTATS_PODIUM` ignore la sélection.
</CalloutDescription>

</CalloutContainer>

### ZAUCTIONHOUSESTATS_METRIC_SELECTOR

Change la métrique du classement.

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `metrics` | Liste | Toutes les métriques | Métriques du cycle |
| `labels` | Section | - | Libellé de chaque métrique |

Les métriques listées dans `leaderboards.disabled` (`config.yml`) sont retirées du cycle.

**Exemple :**

```yaml
metric-selector:
  type: ZAUCTIONHOUSESTATS_METRIC_SELECTOR
  slot: 45
  # metrics:
  #   - TOP_SELLERS_MONEY
  #   - TOP_BUYERS_MONEY
  labels:
    TOP_SELLERS_MONEY: "Meilleurs vendeurs (argent)"
    TOP_BUYERS_MONEY: "Meilleurs acheteurs (argent)"
    TOP_SELLERS_COUNT: "Meilleurs vendeurs (ventes)"
    TOP_BUYERS_COUNT: "Meilleurs acheteurs (achats)"
    TOP_TAX_PAID: "Plus de taxes payées"
    BIGGEST_SALE: "Plus grosse vente"
  item:
    material: COMPARATOR
    name: "#2CCED2Métrique: #ffffff%selected%"
    lore:
      - "#8c8c8c• #2CCED2Clic gauche #92ffff→ %next%"
      - "#8c8c8c• #2CCED2Clic droit #92ffff→ %previous%"
```

### ZAUCTIONHOUSESTATS_PERIOD_SELECTOR

Change la période.

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `periods` | Liste | `DAY`, `WEEK`, `MONTH`, `ALL` | Périodes du cycle |
| `labels` | Section | - | Libellé de chaque période |

**Exemple :**

```yaml
period-selector:
  type: ZAUCTIONHOUSESTATS_PERIOD_SELECTOR
  slot: 46
  # periods:
  #   - WEEK
  #   - ALL
  labels:
    DAY: "Aujourd'hui"
    WEEK: "Cette semaine"
    MONTH: "Ce mois-ci"
    ALL: "Depuis toujours"
  item:
    material: CLOCK
    name: "#2CCED2Période: #ffffff%selected%"
    lore:
      - "#8c8c8c• #2CCED2Clic gauche #92ffff→ %next%"
      - "#8c8c8c• #2CCED2Clic droit #92ffff→ %previous%"
```

### ZAUCTIONHOUSESTATS_ECONOMY_SELECTOR

Change l'économie.

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `economies` | Liste | Toutes les économies zAuctionHouse | Noms des économies du cycle |
| `labels` | Section | - | Libellé de chaque économie. La clé `default` est le libellé de l'option « par défaut » |

Le cycle commence toujours par l'option **par défaut** (clé de libellé `default`) : économie par défaut pour l'argent et les prix, toutes les économies combinées pour les comptages. Viennent ensuite les économies de la liste. Une économie sans libellé affiche son nom d'affichage zAuctionHouse. Sans libellé `default`, l'option par défaut est affichée comme `default`.

**Exemple :**

```yaml
economy-selector:
  type: ZAUCTIONHOUSESTATS_ECONOMY_SELECTOR
  slot: 47
  # economies:
  #   - vault
  #   - playerpoints
  labels:
    default: "Par défaut"
    # vault: "Argent"
  item:
    material: GOLD_NUGGET
    name: "#2CCED2Économie: #ffffff%selected%"
    lore:
      - "#8c8c8c• #2CCED2Clic gauche #92ffff→ %next%"
      - "#8c8c8c• #2CCED2Clic droit #92ffff→ %previous%"
```

### ZAUCTIONHOUSESTATS_PODIUM

Affiche un rang d'un classement sur un seul slot, avec la tête du joueur. Cliquer dessus ouvre la fiche statistiques de ce joueur. La métrique, la période et l'économie sont fixées par les options : les sélecteurs ne les modifient pas.

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `slot` | Nombre | - | Slot du bouton |
| `rank` | Nombre | `1` | Rang à afficher (minimum `1`) |
| `metric` | Métrique | `TOP_SELLERS_MONEY` | Métrique du classement |
| `period` | Période | `ALL` | Période du classement |
| `economy` | Texte | Économie par défaut | Économie du classement |
| `item` | Item | - | Modèle de l'entrée |
| `loading-item` | Item | `item` | Affiché pendant le chargement du classement |
| `empty-item` | Item | `item` | Affiché quand personne n'occupe ce rang, ou quand une métrique d'argent n'a aucune économie à utiliser |

**Placeholders :**

| Placeholder | Disponible dans | Description |
|-------------|-----------------|-------------|
| `%rank%` | `item`, `loading-item`, `empty-item` | Rang |
| `%name%` | `item` | Nom du joueur (`leaderboards.unknown-name` si inconnu) |
| `%value%` | `item` | Valeur brute |
| `%format%` | `item` | Valeur formatée (métriques d'argent), valeur brute sinon |
| `%economy%` | `item` | Nom de l'économie (vide quand toutes les économies sont combinées) |

Le skin est appliqué quand `leaderboards.player-heads` vaut `true` (ce bouton n'a pas d'option `player-heads` propre).

**Exemple :**

```yaml
podium-first:
  type: ZAUCTIONHOUSESTATS_PODIUM
  slot: 22
  rank: 1
  metric: TOP_SELLERS_MONEY
  period: ALL
  # economy: vault
  item:
    material: PLAYER_HEAD
    name: "#f1c40f#%rank% #ffffff%name%"
    lore:
      - "#92ffffGains : #2CCED2%format%"
      - ""
      - "#8c8c8c• #2CCED2Clic #92ffffpour voir les statistiques"
  loading-item:
    material: CLOCK
    name: "#f1c40fChargement..."
  empty-item:
    material: SKELETON_SKULL
    name: "#8c8c8cAucun vendeur pour l'instant"
```

<CalloutContainer type="info">

<CalloutDescription>
Utilisez ce bouton plutôt qu'un bouton standard avec `player-head: '%zahstats_top_..._name%'` : il fonctionne sans PlaceholderAPI et utilise le cache de têtes de l'addon.
</CalloutDescription>

</CalloutContainer>

### ZAUCTIONHOUSESTATS_PLAYER_STATS

Affiche la tête et les compteurs du joueur affiché par la fiche (le joueur cliqué, ou vous-même). Les compteurs sont des valeurs depuis toujours, additionnées sur toutes les économies.

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `slot` | Nombre | - | Slot du bouton |
| `item` | Item | - | Item affiché une fois les statistiques chargées |
| `loading-item` | Item | `item` | Item affiché pendant le chargement des statistiques |

**Placeholders** (`item`) :

| Placeholder | Description |
|-------------|-------------|
| `%target%` | Nom du joueur (disponible aussi dans `loading-item`) |
| `%items_listed%` | Objets mis en vente |
| `%items_sold%` | Objets vendus |
| `%items_bought%` | Objets achetés |
| `%items_expired%` | Objets expirés |
| `%items_removed%` | Objets retirés |
| `%conversion_rate%` | Vendus / mis en vente × 100, deux décimales |
| `%economies%` | Nombre d'économies utilisées par le joueur |
| `%first_sale%` | Date de la première vente |
| `%last_sale%` | Date de la dernière vente |
| `%first_purchase%` | Date du premier achat |
| `%last_purchase%` | Date du dernier achat |

Les dates utilisent `placeholders.date-format` et `statistics.timezone` de `config.yml`. Une date manquante, ou un taux de conversion sans aucun objet mis en vente, affiche `placeholders.not-applicable` (ou `placeholders.no-value` quand `placeholders.enable-not-applicable` vaut `false`).

**Exemple :**

```yaml
player-stats:
  type: ZAUCTIONHOUSESTATS_PLAYER_STATS
  slot: 13
  loading-item:
    material: CLOCK
    name: "#f1c40fChargement des statistiques de %target%..."
  item:
    material: PLAYER_HEAD
    name: "#2CCED2<bold>%target%"
    lore:
      - "#92ffffObjets mis en vente : #2CCED2%items_listed%"
      - "#92ffffObjets vendus : #2CCED2%items_sold%"
      - "#92ffffObjets achetés : #2CCED2%items_bought%"
      - "#92ffffObjets expirés : #2CCED2%items_expired%"
      - "#92ffffObjets retirés : #2CCED2%items_removed%"
      - "#92ffffTaux de conversion : #2CCED2%conversion_rate%%"
      - ""
      - "#92ffffPremière vente : #2CCED2%first_sale%"
      - "#92ffffDernière vente : #2CCED2%last_sale%"
      - "#92ffffPremier achat : #2CCED2%first_purchase%"
      - "#92ffffDernier achat : #2CCED2%last_purchase%"
```

### ZAUCTIONHOUSESTATS_PLAYER_ECONOMIES

Affiche une entrée par économie utilisée par le joueur de la fiche, triées par nom d'économie, avec pagination.

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `slots` | Liste | - | Slots des entrées |
| `entry-item` | Item | `item` | Modèle de chaque entrée |
| `loading-item` | Item | `item` | Affiché au `loading-slot` pendant le chargement des statistiques |
| `loading-slot` | Nombre | `31` | Slot des items de chargement et « aucune économie ». `-1` = jamais affichés |
| `item` | Item | - | Affiché au `loading-slot` quand le joueur n'a aucune activité |

**Placeholders des entrées** (`entry-item`) :

| Placeholder | Description |
|-------------|-------------|
| `%economy%` | Nom de l'économie |
| `%economy_display%` | Nom d'affichage de l'économie (depuis zAuctionHouse) |
| `%money_earned%` | Argent gagné (formaté) |
| `%money_spent%` | Argent dépensé (formaté) |
| `%tax_paid%` | Taxes payées (formaté) |
| `%biggest_sale%` | Plus grosse vente (formaté) |
| `%money_earned_raw%` | Argent gagné (nombre brut) |
| `%money_spent_raw%` | Argent dépensé (nombre brut) |
| `%items_listed%` | Objets mis en vente dans cette économie |
| `%items_sold%` | Objets vendus dans cette économie |
| `%items_bought%` | Objets achetés dans cette économie |
| `%ratio%` | Gagné / dépensé, deux décimales. Si rien n'a été dépensé : `placeholders.not-applicable` (ou `placeholders.no-value` quand `placeholders.enable-not-applicable` vaut `false`) |

**Exemple :**

```yaml
economies:
  type: ZAUCTIONHOUSESTATS_PLAYER_ECONOMIES
  slots:
    - "27-35"
    - "36-44"
  loading-slot: 31
  loading-item:
    material: CLOCK
    name: "#f1c40fChargement des économies..."
  entry-item:
    material: GOLD_INGOT
    name: "#2CCED2<bold>%economy_display%"
    lore:
      - "#92ffffGagné : #2CCED2%money_earned%"
      - "#92ffffDépensé : #2CCED2%money_spent%"
      - "#92ffffTaxes payées : #2CCED2%tax_paid%"
      - "#92ffffPlus grosse vente : #2CCED2%biggest_sale%"
      - "#92ffffRatio gagné / dépensé : #2CCED2%ratio%"
      - ""
      - "#8c8c8c%items_sold% vendus, %items_bought% achetés"
  item:
    material: BARRIER
    name: "#ff5555Aucune activité à l'hôtel des ventes"
```

### ZAUCTIONHOUSESTATS_ITEM_PRICES

Affiche les matériaux les plus vendus de l'économie et de la période sélectionnées, avec pagination. Les matériaux sont triés par nombre de ventes (les plus vendus d'abord, puis par nom). Le `material` de `entry-item` est remplacé par le matériau vendu, mais son nom, son lore et ses flags sont conservés (un matériau inconnu garde le matériau du modèle). L'option `metric` n'est pas utilisée.

Les prix sont toujours calculés pour **une seule** économie : celle sélectionnée, sinon l'économie par défaut. Si aucune économie n'est trouvée, l'`item` est affiché au `loading-slot`.

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `slots` | Liste | - | Slots des entrées |
| `entry-item` | Item | `item` | Modèle de chaque entrée |
| `loading-item` | Item | `item` | Affiché au `loading-slot` pendant le chargement de la liste |
| `loading-slot` | Nombre | `26` | Slot des items de chargement et « aucune vente ». `-1` = jamais affichés |
| `period` | Période | `ALL` | Période par défaut |
| `economy` | Texte | Économie par défaut | Économie par défaut |
| `limit` | Nombre | `-1` | Nombre maximum de matériaux pour ce bouton. `-1` ou `0` = seul `item-prices.top-limit` s'applique |
| `item` | Item | - | Affiché au `loading-slot` quand la sélection courante n'a aucune vente |

Le nombre de matériaux listés est le plus petit entre `limit` et `item-prices.top-limit` (`config.yml`).

**Placeholders des entrées** (`entry-item`) :

| Placeholder | Description |
|-------------|-------------|
| `%material%` | Nom du matériau (par exemple `DIAMOND_SWORD`) |
| `%material_name%` | Nom lisible (par exemple `Diamond Sword`) |
| `%amount%` | Nombre de ventes |
| `%economy%` | Nom de l'économie |
| `%average%` | Prix de mise en vente moyen des ventes (nombre brut, deux décimales) |
| `%format_average%` | Prix de mise en vente moyen des ventes (formaté) |
| `%median%` | Prix médian (nombre brut), `placeholders.loading` pendant le calcul |
| `%format_median%` | Prix médian (formaté), `placeholders.loading` pendant le calcul |

**Exemple :**

```yaml
item-prices:
  type: ZAUCTIONHOUSESTATS_ITEM_PRICES
  slots:
    - "9-17"
    - "18-26"
    - "27-35"
    - "36-44"
  period: ALL
  # economy: vault
  # limit: 50
  loading-slot: 22
  loading-item:
    material: CLOCK
    name: "#f1c40fChargement des prix..."
  entry-item:
    material: PAPER
    name: "#2CCED2<bold>%material_name%"
    lore:
      - "#92ffffVentes : #2CCED2%amount%"
      - "#92ffffPrix moyen : #2CCED2%format_average%"
      - "#92ffffPrix médian : #2CCED2%format_median%"
  item:
    material: BARRIER
    name: "#ff5555Aucune vente pour cette sélection"
```

### ZAUCTIONHOUSESTATS_ADMIN_STATUS

Panneau d'état en direct. Il lit uniquement des compteurs en mémoire, il peut donc être utilisé sans risque avec `update: true`. Il n'a aucune option spécifique.

**Placeholders :**

| Placeholder | Description |
|-------------|-------------|
| `%storage_type%` | Type de base de données (`SQLITE`, `MYSQL`, `MARIADB`) |
| `%collection_mode%` | Mode de collecte actif sur ce serveur : `EVENTS`, `LOGS_POLLING` ou `NONE` |
| `%queue_pending%` | Événements en attente dans la file d'écriture |
| `%pending_retry%` | `true` si un flush échoué attend un nouvel essai, sinon `false` |
| `%flush_count%` | Nombre de flushs |
| `%flush_failures%` | Nombre de flushs échoués |
| `%dropped_events%` | Nombre d'événements perdus |
| `%leaderboard_entries%` | Entrées dans le cache des classements |
| `%leaderboard_hit_ratio%` | Taux de réussite du cache des classements, en pourcentage (une décimale, sans le signe `%`) |
| `%player_entries%` | Entrées dans le cache des statistiques joueur |
| `%player_hit_ratio%` | Taux de réussite du cache des statistiques joueur, en pourcentage (une décimale) |
| `%material_entries%` | Entrées dans le cache des prix des matériaux |
| `%material_hit_ratio%` | Taux de réussite du cache des prix des matériaux, en pourcentage (une décimale) |
| `%sql_queries%` | Nombre de requêtes de lecture (`SELECT`) exécutées depuis le démarrage |
| `%sales_count%` | Lignes de la table des ventes (`placeholders.loading` jusqu'au comptage, rafraîchi toutes les 5 minutes) |
| `%listings_count%` | Lignes de la table des mises en vente (`placeholders.loading` jusqu'au comptage, rafraîchi toutes les 5 minutes) |
| `%head_textures%` | Textures de têtes de joueurs en cache |

**Exemple :**

```yaml
status:
  type: ZAUCTIONHOUSESTATS_ADMIN_STATUS
  slot: 13
  update: true
  item:
    material: COMPARATOR
    name: "#2CCED2<bold>État"
    lore:
      - "#92ffffBase : #2CCED2%storage_type% #8c8c8c(collecte : %collection_mode%)"
      - "#92ffffÉvénements en attente : #2CCED2%queue_pending% #8c8c8c(nouvel essai : %pending_retry%)"
      - "#92ffffFlushs : #2CCED2%flush_count% #8c8c8c(échecs : %flush_failures%, perdus : %dropped_events%)"
      - ""
      - "#92ffffClassements : #2CCED2%leaderboard_entries% #8c8c8c(hit %leaderboard_hit_ratio%%)"
      - "#92ffffFiches joueur : #2CCED2%player_entries% #8c8c8c(hit %player_hit_ratio%%)"
      - "#92ffffPrix matériaux : #2CCED2%material_entries% #8c8c8c(hit %material_hit_ratio%%)"
      - "#92ffffLignes : #2CCED2%sales_count% #92ffffventes, #2CCED2%listings_count% #92ffffmises en vente"
      - "#8c8c8cRequêtes de lecture : %sql_queries% - textures de têtes : %head_textures%"
```

### ZAUCTIONHOUSESTATS_TEXT

Un bouton d'affichage dont le `name` et le `lore` peuvent contenir des placeholders `%zahstats_*%`. Ils sont résolus par l'addon depuis ses caches, **sans PlaceholderAPI**. Il fonctionne avec `update: true`. Il n'a aucune option spécifique.

**Exemple :**

```yaml
sold:
  type: ZAUCTIONHOUSESTATS_TEXT
  slot: 11
  update: true
  item:
    material: EMERALD
    name: "#2CCED2<bold>Objets vendus"
    lore:
      - "#92ffffTotal : #2CCED2%zahstats_global_items_sold%"
```

### ZAUCTIONHOUSESTATS_MY_STATS

Ouvre `player-stats.yml` sur **vos propres** statistiques. Un simple bouton `INVENTORY` afficherait le dernier joueur cliqué dans un classement ; ce bouton l'efface d'abord. Son `name` et son `lore` résolvent les placeholders `%zahstats_*%` comme `ZAUCTIONHOUSESTATS_TEXT`. Il n'a aucune option spécifique.

**Exemple :**

```yaml
my-stats:
  type: ZAUCTIONHOUSESTATS_MY_STATS
  slot: 40
  item:
    material: BOOK
    name: "#2CCED2<bold>ᴍᴇs sᴛᴀᴛɪsᴛɪǫᴜᴇs"
    lore:
      - "#92ffffVos ventes, achats et gains."
      - ""
      - "#8c8c8c• #2CCED2Clic #92ffffpour ouvrir"
```

---

## Têtes de joueurs

`ZAUCTIONHOUSESTATS_LEADERBOARD`, `ZAUCTIONHOUSESTATS_PODIUM` et `ZAUCTIONHOUSESTATS_PLAYER_STATS` appliquent le skin du joueur sur leur item. L'item doit être une `PLAYER_HEAD` ; tout autre matériau est affiché tel quel.

Les skins sont chargés en arrière-plan, une page à la fois, et conservés dans le cache de l'addon pendant 6 heures (y compris les joueurs sans skin, pour ne pas les redemander). Le menu se rafraîchit une fois les skins de la page prêts. Le skin d'un joueur qui rejoint le serveur est mis en cache immédiatement.

| Paramètre (`config.yml`) | Défaut | Description |
|--------------------------|--------|-------------|
| `leaderboards.player-heads` | `true` | Interrupteur global des skins de joueurs dans tous les menus |
| `leaderboards.default-head-url` | `""` | Texture Base64 utilisée quand un skin est introuvable. Vide = tête par défaut du client |

`ZAUCTIONHOUSESTATS_LEADERBOARD` a aussi sa propre option `player-heads` : les skins ne sont appliqués que si l'option et `leaderboards.player-heads` valent toutes les deux `true`.

Consultez [Configuration](/zauctionhouse/addons/stats/configuration) pour tous les paramètres.
