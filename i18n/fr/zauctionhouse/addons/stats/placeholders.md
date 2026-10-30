---
title: Placeholders
description: Tous les placeholders PlaceholderAPI fournis par zAuctionHouseStats - classements, statistiques des joueurs, totaux du serveur, prix des matériaux et alias de compatibilité V1
---

# Placeholders

zAuctionHouseStats enregistre une expansion PlaceholderAPI avec l'identifiant **`zahstats`**, le même identifiant que l'addon V1 : les placeholders déjà utilisés dans vos configurations TAB, scoreboard ou hologrammes continuent donc de fonctionner.

Chaque placeholder a cette forme :

```
%zahstats_<body>%
```

Le corps appartient à l'une des quatre familles : `top_`, `player_`, `global_` et `material_`. Lorsque les alias V1 sont activés, les [alias V1](#alias-de-compatibilité-v1) sont également reconnus, et ils sont vérifiés avant les quatre familles.

## Prérequis

- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installé. C'est une dépendance optionnelle : l'addon fonctionne sans, mais les autres plugins ne peuvent lire ces placeholders qu'à travers PlaceholderAPI.
- L'expansion est enregistrée automatiquement au démarrage de l'addon. Vous n'avez **pas** besoin de `/papi ecloud download`.
- L'expansion est persistante (`persist() = true`), donc `/papi reload` ne la supprime pas.

<CalloutContainer type="info">

<CalloutTitle>Un placeholder n'interroge jamais la base de données</CalloutTitle>

<CalloutDescription>
Chaque placeholder lit un cache en mémoire et répond immédiatement. Il n'exécute jamais de SQL et n'attend jamais, même lorsqu'il est appelé depuis un thread asynchrone (TAB, hologrammes) ou un thread de région Folia. Si une valeur n'a pas encore été calculée, le placeholder renvoie le texte `placeholders.loading` et la valeur est calculée en arrière-plan. Les valeurs expirées continuent d'être servies pendant leur rafraîchissement : une valeur chargée une fois ne revient donc jamais à `Loading...`, même après `/zahstats reload` ou `/zahstats clearcache` (les deux se contentent de marquer les caches comme expirés).
</CalloutDescription>

</CalloutContainer>

## Règles communes

Ces règles s'appliquent à toutes les familles :

| Règle | Comportement |
|-------|--------------|
| Casse | Le corps entier est insensible à la casse : `%zahstats_TOP_Sellers_Money_1_name%` équivaut à `%zahstats_top_sellers_money_1_name%`. |
| Période omise | `all` par défaut (depuis toujours). |
| Économie omise, valeurs de **nombre** | Total sur toutes les économies. |
| Économie omise, valeurs d'**argent** | Utilise l'économie par défaut : `leaderboards.default-economy` dans `config.yml`, ou l'économie par défaut de zAuctionHouse si cette clé est vide. Les montants de différentes économies ne sont jamais additionnés. |
| Noms d'économie | Comparés aux économies enregistrées dans zAuctionHouse, sans tenir compte de la casse. Les noms contenant `_` sont pris en charge. Une économie inconnue renvoie le texte `not-applicable`. |
| Corps inconnu | Ne renvoie rien, PlaceholderAPI affiche donc le texte brut `%zahstats_...%`. Cela signifie généralement une faute de frappe (métrique inconnue, rang ou champ invalide). |
| Brut ou formaté | L'argent brut est un nombre décimal simple avec 2 décimales (`1250.50`). L'argent formaté utilise le format d'économie de zAuctionHouse. Les nombres bruts sont des entiers (`1500`) et les nombres formatés utilisent des séparateurs de milliers (`1,500`). |

### Jetons de période

| Jeton | Fenêtre |
|-------|---------|
| `day` | Aujourd'hui, depuis minuit |
| `week` | Cette semaine, depuis lundi (semaine ISO) |
| `month` | Ce mois-ci, depuis le 1er |
| `all` | Depuis toujours (par défaut) |

Les périodes suivent le calendrier, ce ne sont pas des fenêtres glissantes. Elles sont calculées dans le fuseau `statistics.timezone` défini dans `config.yml`, ou dans le fuseau horaire du serveur si cette clé est vide. Les placeholders `global_*` n'acceptent pas de période.

### Textes de repli

Les valeurs de repli proviennent de la section `placeholders` de `config.yml` (voir [Configuration](/zauctionhouse/addons/stats/configuration)) :

| Clé | Défaut | Affiché lorsque |
|-----|--------|-----------------|
| `placeholders.loading` | `Loading...` | La valeur n'est pas encore en cache : juste après un démarrage du serveur, ou la première fois qu'un classement, un joueur hors ligne ou un matériau donné est demandé. |
| `placeholders.no-name` | `✘` | `top_..._<rank>_name` lorsque le classement contient moins d'entrées que le rang demandé. |
| `placeholders.no-value` | `0` | `top_..._<rank>_value` ou `_format` au-delà de la taille du classement, ou un placeholder `player_*` utilisé sans joueur (console, hologramme global). |
| `placeholders.not-applicable` | `N/A` | Le placeholder est valide mais n'a pas de données : économie inconnue, période sur une métrique uniquement « depuis toujours », classement désactivé, matériau sans vente, date d'un événement qui n'a jamais eu lieu, ou aucune économie par défaut disponible. |
| `placeholders.enable-not-applicable` | `true` | Si `false`, tous les cas non applicables renvoient `0` à la place, comme en V1. |
| `placeholders.date-format` | `dd/MM/yyyy HH:mm` | Motif utilisé par les placeholders de date `*_at` (syntaxe Java `DateTimeFormatter`), appliqué dans `statistics.timezone`. Un motif invalide revient à la valeur par défaut et affiche un avertissement dans les logs. |
| `placeholders.enable-v1-aliases` | `true` | Si `false`, les [alias V1](#alias-de-compatibilité-v1) ne sont plus reconnus. |

## Classements : `top_`

```
%zahstats_top_<metric>[_<period>][_<economy>]_<rank>_<field>%
```

### Métriques

| Jeton | Classement | Type | Économie omise |
|-------|------------|------|----------------|
| `sellers_money` | Argent gagné par les vendeurs, après taxes | Argent | Économie par défaut |
| `buyers_money` | Argent dépensé par les acheteurs, taxes incluses | Argent | Économie par défaut |
| `sellers_count` | Nombre de ventes réalisées en tant que vendeur | Nombre | Toutes les économies |
| `buyers_count` | Nombre d'achats réalisés en tant qu'acheteur | Nombre | Toutes les économies |
| `tax_paid` | Total des taxes payées (part de taxe à l'achat et taxe de mise en vente) | Argent | Économie par défaut |
| `biggest_sale` | Plus grosse vente unique reçue par un vendeur | Argent | Économie par défaut |

### Rang et champs

- `<rank>` est une position commençant à 1 (`1`, `2`, `3`, ...). Un rang de `0`, un rang négatif ou non numérique, ou un rang de plus de 6 chiffres rend le placeholder invalide (le texte brut est affiché).
- Le nombre d'entrées conservées dépend de `leaderboards.size` (par défaut `10`, de 1 à 100). Les rangs au-delà de cette taille, ou au-delà du nombre de joueurs classés, renvoient les textes `no-name` et `no-value`.

| Champ | Renvoie |
|-------|---------|
| `name` | Nom du joueur (`leaderboards.unknown-name`, par défaut `?`, si le nom est inconnu) |
| `value` | Valeur brute : un entier pour les nombres, un décimal simple pour l'argent |
| `format` | Valeur formatée : format d'économie pour l'argent, séparateurs de milliers pour les nombres |

Une métrique listée dans `leaderboards.disabled` renvoie `not-applicable` pour tous les champs. Un classement d'argent sans économie précisée et sans économie par défaut disponible renvoie également `not-applicable`.

### Exemples

| Placeholder | Exemple de résultat |
|-------------|---------------------|
| `%zahstats_top_sellers_money_1_name%` | `Notch` |
| `%zahstats_top_sellers_money_1_format%` | `$12,450.00` (dépend du format de l'économie) |
| `%zahstats_top_sellers_money_1_value%` | `12450.00` |
| `%zahstats_top_sellers_money_day_1_name%` | Meilleur vendeur du jour, économie par défaut |
| `%zahstats_top_buyers_money_week_vault_3_format%` | 3e plus gros dépensier de la semaine, économie `vault` |
| `%zahstats_top_sellers_count_2_value%` | `87` (ventes sur toutes les économies) |
| `%zahstats_top_buyers_count_month_coins_1_name%` | Meilleur acheteur du mois, économie `coins` uniquement |
| `%zahstats_top_tax_paid_1_format%` | Joueur ayant payé le plus de taxes |
| `%zahstats_top_biggest_sale_all_vault_1_value%` | Plus grosse vente unique de tous les temps en `vault` |
| `%zahstats_top_sellers_money_15_name%` | `✘` avec la taille par défaut de 10 |

<CalloutContainer type="info">

<CalloutTitle>Préchauffez les classements que vous affichez</CalloutTitle>

<CalloutDescription>
Chaque combinaison (métrique, période, économie) est calculée la première fois qu'elle est demandée, puis conservée pendant `caches.leaderboard-ttl-seconds` (60 par défaut). Pour éviter `Loading...` juste après un redémarrage, ajoutez les combinaisons que vous affichez à `leaderboards.preload` (par défaut : `TOP_SELLERS_MONEY` pour `ALL` et `DAY`, et `TOP_BUYERS_MONEY` pour `ALL`). Voir [Configuration](/zauctionhouse/addons/stats/configuration).
</CalloutDescription>

</CalloutContainer>

## Statistiques des joueurs : `player_`

```
%zahstats_player_<metric>[_<period>][_<economy>][_format]%
```

Ces placeholders lisent les statistiques du joueur présent dans le contexte PlaceholderAPI. Ils fonctionnent aussi pour les joueurs **hors ligne**, par exemple depuis des plugins qui résolvent les placeholders pour un `OfflinePlayer`. Les statistiques des joueurs en ligne sont conservées pendant `caches.player-stats-ttl-seconds` (60 par défaut). Les statistiques d'un joueur hors ligne sont chargées à la première demande (le premier rendu affiche `loading`) et conservées pendant `caches.player-stats-offline-ttl-seconds` (60 par défaut), pour 256 joueurs hors ligne au maximum en même temps. Lorsqu'il n'y a aucun joueur, ils renvoient `no-value`.

### Métriques

| Jeton | Valeur | Type | Périodes (`day`/`week`/`month`) |
|-------|--------|------|---------------------------------|
| `items_listed` | Objets mis en vente | Nombre | Oui |
| `items_sold` | Objets vendus (ventes réalisées) | Nombre | Oui |
| `items_bought` | Objets achetés | Nombre | Oui |
| `items_expired` | Annonces expirées | Nombre | Non, uniquement depuis toujours |
| `items_removed` | Annonces retirées par le joueur | Nombre | Non, uniquement depuis toujours |
| `money_earned` | Argent gagné grâce aux ventes, après taxes | Argent | Oui |
| `money_spent` | Argent dépensé en achats | Argent | Oui |
| `tax_paid` | Taxes payées | Argent | Oui |
| `biggest_sale` | Plus grosse vente unique | Argent | Non, uniquement depuis toujours |
| `first_sale_at` | Date de la première vente | Date | Non, uniquement depuis toujours |
| `last_sale_at` | Date de la dernière vente | Date | Non, uniquement depuis toujours |
| `first_purchase_at` | Date du premier achat | Date | Non, uniquement depuis toujours |
| `last_purchase_at` | Date du dernier achat | Date | Non, uniquement depuis toujours |

- Utiliser `day`, `week` ou `month` avec une métrique uniquement « depuis toujours » renvoie `not-applicable`.
- Les **nombres** sans économie sont additionnés sur toutes les économies. L'**argent** sans économie utilise l'économie par défaut.
- Les **dates** sans économie renvoient la date la plus ancienne (`first_*`) ou la plus récente (`last_*`) sur toutes les économies. Elles utilisent `placeholders.date-format` et renvoient `not-applicable` si l'événement n'a jamais eu lieu. Le suffixe `_format` n'a aucun effet sur les dates.
- `_format` doit être le dernier segment.

### Exemples

| Placeholder | Exemple de résultat |
|-------------|---------------------|
| `%zahstats_player_items_sold%` | `1342` |
| `%zahstats_player_items_sold_format%` | `1,342` |
| `%zahstats_player_items_sold_day%` | Objets vendus aujourd'hui, toutes économies |
| `%zahstats_player_items_listed_week_vault%` | Objets mis en vente cette semaine en `vault` |
| `%zahstats_player_money_earned%` | `15230.75` (économie par défaut) |
| `%zahstats_player_money_earned_format%` | `$15,230.75` |
| `%zahstats_player_money_earned_month_coins_format%` | Argent gagné ce mois-ci en `coins`, formaté |
| `%zahstats_player_money_spent_vault%` | Argent dépensé en `vault`, brut |
| `%zahstats_player_tax_paid_week_format%` | Taxes payées cette semaine, formatées |
| `%zahstats_player_biggest_sale_format%` | Plus grosse vente du joueur |
| `%zahstats_player_last_sale_at%` | `21/10/2026 14:32` |
| `%zahstats_player_first_purchase_at_vault%` | Premier achat effectué en `vault` |
| `%zahstats_player_items_expired_day%` | `N/A` (uniquement depuis toujours) |

## Totaux du serveur : `global_`

```
%zahstats_global_<key>[_<economy>][_format]%
```

Totaux à l'échelle du serveur. Sur une configuration multi-serveurs avec une base de données partagée, ce sont des totaux à l'échelle du réseau. Les ventes du serveur actuel apparaissent immédiatement, et les totaux sont relus depuis la base de données toutes les `caches.global-stats-ttl-seconds` (60 par défaut). Ces placeholders n'acceptent **pas** de période : `%zahstats_global_items_sold_day%` lit `day` comme un nom d'économie et renvoie `not-applicable`.

| Jeton | Valeur | Type | Économie omise | Économie précisée |
|-------|--------|------|----------------|-------------------|
| `items_listed` | Objets mis en vente | Nombre | Toutes les économies | Cette économie |
| `items_sold` | Objets vendus | Nombre | Toutes les économies | Cette économie |
| `items_expired` | Annonces expirées | Nombre | Toutes les économies | Cette économie |
| `items_removed` | Annonces retirées | Nombre | Toutes les économies | Cette économie |
| `money_volume` | Total de l'argent échangé | Argent | Économie par défaut | Cette économie |
| `tax_collected` | Total des taxes collectées | Argent | Économie par défaut | Cette économie |
| `biggest_sale` | Plus grosse vente unique | Argent | Économie par défaut | Cette économie |
| `auctions_opened` | Nombre d'ouvertures du menu de l'hôtel des ventes | Nombre | Total du serveur | `not-applicable` (non suivi par économie) |

### Exemples

| Placeholder | Exemple de résultat |
|-------------|---------------------|
| `%zahstats_global_items_sold%` | `48211` |
| `%zahstats_global_items_sold_format%` | `48,211` |
| `%zahstats_global_items_listed_vault%` | Objets mis en vente en `vault` |
| `%zahstats_global_money_volume_format%` | `$2,341,900.00` (économie par défaut) |
| `%zahstats_global_money_volume_coins%` | Volume échangé en `coins`, brut |
| `%zahstats_global_tax_collected_vault_format%` | Taxes collectées en `vault`, formatées |
| `%zahstats_global_biggest_sale_format%` | Plus grosse vente du serveur |
| `%zahstats_global_auctions_opened_format%` | `103,557` |

## Prix des matériaux : `material_`

```
%zahstats_material_[format_]<stat>[_<period>]_<economy>_<material>%
```

Statistiques de prix pour un matériau, calculées à partir des ventes réalisées. Contrairement aux autres familles, **l'économie est obligatoire** ici. Un nom d'économie qui n'est pas enregistré dans zAuctionHouse renvoie `not-applicable`. `format_` se place **juste après** `material_`, et non à la fin.

| Jeton de statistique | Valeur | Type |
|----------------------|--------|------|
| `average` | Prix de vente moyen (le prix de mise en vente de chaque vente réalisée) | Argent |
| `median` | Prix de vente médian (le prix de mise en vente de chaque vente réalisée) | Argent |
| `count` | Nombre de ventes réalisées | Nombre |
| `amount` | Identique à `count` (nom V1) | Nombre |

La partie `<material>` peut être :

- un nom de matériau Bukkit, insensible à la casse, comme `diamond`, `DIAMOND` ou `netherite_ingot`,
- un nombre, interprété comme une valeur de **custom model data** (ventes ayant ce custom model data, quel que soit le matériau).

Les prix correspondent au prix de mise en vente de la vente entière, et non à un prix unitaire : un stack de 64 vendu 640 compte pour 640.

Un matériau sans vente dans l'économie et la période choisies renvoie `not-applicable`. Les valeurs sont conservées pendant `caches.material-price-ttl-seconds` (3600 par défaut) et dans la limite de `statistics.material-prices.max-entries` entrées (1000 par défaut). La médiane est calculée à partir des ventes les plus récentes, avec au maximum `statistics.material-prices.median-sample-limit` prix (50000 par défaut).

### Exemples

| Placeholder | Exemple de résultat |
|-------------|---------------------|
| `%zahstats_material_average_vault_diamond%` | `152.40` |
| `%zahstats_material_format_average_vault_diamond%` | `$152.40` |
| `%zahstats_material_median_week_vault_diamond%` | Prix médian des diamants cette semaine |
| `%zahstats_material_format_median_month_coins_netherite_ingot%` | Prix médian formaté des lingots de netherite ce mois-ci, en `coins` |
| `%zahstats_material_count_vault_elytra%` | `57` |
| `%zahstats_material_format_count_day_vault_diamond%` | Ventes de diamants aujourd'hui, avec séparateurs de milliers |
| `%zahstats_material_amount_vault_diamond%` | Identique à `count` |
| `%zahstats_material_average_vault_10001%` | Prix moyen des objets avec le custom model data `10001` |
| `%zahstats_material_average_vault_bedrock%` | `N/A` si la bedrock n'a jamais été vendue |

## Alias de compatibilité V1

Lorsque `placeholders.enable-v1-aliases` vaut `true` (par défaut), tous les placeholders V1 continuent de fonctionner. Chaque alias est converti vers le placeholder V2 indiqué dans la colonne de droite et lit les mêmes caches. Les arguments sont insensibles à la casse, et une économie inconnue renvoie `not-applicable`. Dans les tableaux ci-dessous, `<eco>` est un nom d'économie **obligatoire**.

Les placeholders V1 `material_[format_]average|median|amount_<eco>_<material>` sont déjà une syntaxe V2 valide (voir [Prix des matériaux](#prix-des-matériaux--material_)), ils ne sont donc pas listés ici.

### Totaux du serveur

| Placeholder V1 | Équivalent V2 | Notes |
|----------------|---------------|-------|
| `%zahstats_item_sold_amount%` | `global_items_listed` | Compte les **mises en vente**, comme en V1, malgré son nom |
| `%zahstats_item_purchase_amount%` | `global_items_sold` | |
| `%zahstats_number_of_items_not_sold%` | `global_items_expired` + `global_items_removed` | Somme des deux |
| `%zahstats_number_of_items_expired%` | `global_items_expired` | Ne renvoyait jamais rien en V1, renvoie désormais de vraies données |
| `%zahstats_number_of_items_remove_from_expire%` | `global_items_expired` | |
| `%zahstats_number_of_items_remove_from_storage%` | `global_items_removed` | |
| `%zahstats_number_of_items_remove_from_bought%` | `global_items_sold` | |
| `%zahstats_number_of_items_destroy%` | `global_items_expired` | |
| `%zahstats_auction_opened%` | `global_auctions_opened` | |

### Totaux par économie

| Placeholder V1 | Équivalent V2 | Notes |
|----------------|---------------|-------|
| `%zahstats_money_spend_<eco>%` | `global_money_volume_<eco>` | Brut |
| `%zahstats_money_spend_format_<eco>%` | `global_money_volume_<eco>_format` | Formaté |
| `%zahstats_total_price_of_all_items_sold_<eco>%` | aucun | Somme des prix de toutes les mises en vente dans cette économie, brute. Calculée à la première demande, puis rafraîchie toutes les 5 minutes |
| `%zahstats_total_price_of_all_items_sold_format_<eco>%` | aucun | Identique, formatée |

### Joueur

| Placeholder V1 | Équivalent V2 | Notes |
|----------------|---------------|-------|
| `%zahstats_player_total_sales%` | `player_items_listed` | Compte les **mises en vente**, comme en V1 |
| `%zahstats_player_total_sales_format%` | `player_items_listed_format` | Formaté comme un nombre avec séparateurs de milliers, et non comme un prix |
| `%zahstats_player_total_purchases%` | `player_items_bought` | |
| `%zahstats_player_total_purchases_format%` | `player_items_bought_format` | Formaté comme un nombre avec séparateurs de milliers |
| `%zahstats_player_total_earned_<eco>%` | `player_money_earned_<eco>` | Brut |
| `%zahstats_player_total_spent_<eco>%` | `player_money_spent_<eco>` | Brut |
| `%zahstats_player_total_format_earned_<eco>%` | `player_money_earned_<eco>_format` | Formaté |
| `%zahstats_player_total_format_spent_<eco>%` | `player_money_spent_<eco>_format` | Formaté |

### Classements

Les alias de classement V1 lisent toujours le **rang 1** du classement **depuis toujours**.

| Placeholder V1 | Équivalent V2 |
|----------------|---------------|
| `%zahstats_who_purchased_most_items_name%` | `top_buyers_count_1_name` |
| `%zahstats_who_purchased_most_items_amount%` | `top_buyers_count_1_value` |
| `%zahstats_who_sales_most_items_name%` | `top_sellers_count_1_name` |
| `%zahstats_who_sales_most_items_amount%` | `top_sellers_count_1_value` |
| `%zahstats_who_purchased_most_items_name_<eco>%` | `top_buyers_count_<eco>_1_name` |
| `%zahstats_who_purchased_most_items_amount_<eco>%` | `top_buyers_count_<eco>_1_value` |
| `%zahstats_who_sales_most_items_name_<eco>%` | `top_sellers_count_<eco>_1_name` |
| `%zahstats_who_sales_most_items_amount_<eco>%` | `top_sellers_count_<eco>_1_value` |
| `%zahstats_who_spent_most_money_name_<eco>%` | `top_buyers_money_<eco>_1_name` |
| `%zahstats_who_spent_most_money_amount_<eco>%` | `top_buyers_money_<eco>_1_value` |
| `%zahstats_format_who_spent_most_money_amount_<eco>%` | `top_buyers_money_<eco>_1_format` |
| `%zahstats_who_earned_most_money_name_<eco>%` | `top_sellers_money_<eco>_1_name` |
| `%zahstats_who_earned_most_money_amount_<eco>%` | `top_sellers_money_<eco>_1_value` |
| `%zahstats_format_who_earned_most_money_amount_<eco>%` | `top_sellers_money_<eco>_1_format` |

<CalloutContainer type="info">

<CalloutTitle>Classements V1 corrigés</CalloutTitle>

<CalloutDescription>
En V2, `who_sales_most_items_*` classe les joueurs selon leurs **ventes réalisées**. Les alias permettent aux anciennes configurations de fonctionner telles quelles, mais les nouvelles configurations devraient utiliser la famille `top_`, qui prend aussi en charge les rangs autres que 1 et les périodes. Vous pouvez désactiver les alias avec `placeholders.enable-v1-aliases: false` une fois que vous ne les utilisez plus.
</CalloutDescription>

</CalloutContainer>

## Utilisation dans d'autres plugins

### TAB, scoreboards et hologrammes

- **Choisissez un intervalle de rafraîchissement adapté au cache.** Les classements et les totaux globaux se rafraîchissent toutes les 60 secondes par défaut : rafraîchir un placeholder TAB ou d'hologramme chaque seconde ne fait que relire la même valeur. Un rafraîchissement de 20 à 60 secondes (`placeholderapi-refresh-intervals` de TAB, en millisecondes, ou l'intervalle de mise à jour du plugin d'hologrammes) suffit. Les lectures restent peu coûteuses dans tous les cas, car elles ne lisent que la mémoire.
- **Les hologrammes globaux n'ont pas de joueur.** Les placeholders `top_`, `global_` et `material_` n'ont pas besoin de joueur et fonctionnent dans les hologrammes partagés (DecentHolograms, FancyHolograms, ...). Les placeholders `player_` ont besoin d'un contexte joueur. Sans joueur, ils renvoient `no-value` : utilisez des hologrammes par joueur ou TAB pour ceux-ci.
- **Le rendu asynchrone est sûr.** Les placeholders peuvent être résolus depuis n'importe quel thread (TAB et la plupart des plugins d'hologrammes font un rendu asynchrone), y compris sur Folia.
- **Évitez `Loading...` après un redémarrage.** Ajoutez les classements que vous affichez à `leaderboards.preload`, ou remplacez `placeholders.loading` par un texte neutre comme `...` ou une chaîne vide.

Exemple d'hologramme « top 3 des vendeurs du jour » :

```yaml
lines:
  - "&6Meilleurs vendeurs du jour"
  - "&e1. %zahstats_top_sellers_money_day_1_name% &7- &a%zahstats_top_sellers_money_day_1_format%"
  - "&e2. %zahstats_top_sellers_money_day_2_name% &7- &a%zahstats_top_sellers_money_day_2_format%"
  - "&e3. %zahstats_top_sellers_money_day_3_name% &7- &a%zahstats_top_sellers_money_day_3_format%"
```

Exemple de bloc de scoreboard :

```yaml
lines:
  - "&7Vendus : &f%zahstats_player_items_sold_format%"
  - "&7Gagné : &a%zahstats_player_money_earned_format%"
  - "&7Aujourd'hui : &a%zahstats_player_money_earned_day_format%"
```

### Plugins de PNJ

Les plugins de PNJ (Citizens avec un trait d'hologramme, FancyNpcs, ZNPCsPlus, ...) peuvent afficher directement les noms des classements. Par exemple, un PNJ « vendeur n°1 » peut utiliser `%zahstats_top_sellers_money_1_name%` comme nom affiché, ou comme nom de skin si le plugin résout les placeholders dans les champs de skin. Lorsque moins de joueurs sont classés que la position du PNJ, le nom est le texte `placeholders.no-name` (par défaut `✘`). Définissez-le sur un nom de joueur existant si votre plugin de PNJ a besoin d'un skin valide.

### Tester

Utilisez la commande de parsing de PlaceholderAPI pour vérifier un placeholder :

```
/papi parse me %zahstats_top_sellers_money_1_name%
/papi parse <player> %zahstats_player_money_earned_format%
```

| Résultat | Signification |
|----------|---------------|
| Le texte brut `%zahstats_...%` | Syntaxe non reconnue. Vérifiez la famille, les jetons et le champ. |
| `Loading...` | Placeholder valide, valeur en cours de calcul. Réessayez un peu plus tard. |
| `N/A` | Placeholder valide sans données. Vérifiez le nom de l'économie, la période, ou si le classement est désactivé. |

Un nom d'économie inconnu est revérifié à chaque rendu : les économies ajoutées plus tard à zAuctionHouse sont donc prises en compte automatiquement. Après d'autres modifications des économies de zAuctionHouse, exécutez `/zahstats reload` ou `/zahstats clearcache` (voir [Commandes & Permissions](/zauctionhouse/addons/stats/commands-permissions)) pour réinitialiser les placeholders analysés et rafraîchir les valeurs en cache.
