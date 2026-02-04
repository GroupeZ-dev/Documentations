---
sidebar_position: 5
title: Module Économie
description: Système économique multi-devises avec intégration Vault
---

# Module Économie

**Fichier :** `modules/economy/config.yml`

Le module Économie fournit un système économique multi-devises complet avec intégration Vault, classements des meilleurs soldes, formatage configurable des nombres, confirmations de paiement et suivi des raisons de transactions. Vous pouvez définir autant d'économies que nécessaire, chacune avec son propre symbole, format, limites et statut d'enregistrement Vault.

---

## Configuration

```yaml
enable: true

# The name of the default economy used by Vault and /pay
default-economy: "money"

# List of economy definitions
economies:
  - name: "money"
    display-name: "&6Money"
    symbol: "$"
    format: "%price%$"
    vault: true
    min: 0
    max: 1000000000
    min-pay: 0
    max-pay: 1000000000
    enable-pay: true
    enable-confirm-inventory: true
    min-confirm-inventory: 1000
    price-format: PRICE_WITH_REDUCTION

  - name: "coins"
    display-name: "&eCoins"
    symbol: "\u26c1"
    format: "%price% \u26c1"
    vault: false
    min: 0
    max: 1000000000
    min-pay: 0
    max-pay: 1000000000
    enable-pay: true
    enable-confirm-inventory: true
    min-confirm-inventory: 1000
    price-format: PRICE_WITH_REDUCTION

# Multiplier suffixes for the /pay command number shorthand
# Players can type e.g. /pay Player 5k to pay 5000
number-format-sell-multiplication:
  k: 1000
  m: 1000000
  b: 1000000000
  t: 1000000000000
  q: 1000000000000000
  qq: 1000000000000000000
  s: 1000000000000000000000
  ss: 1000000000000000000000000
  o: 1000000000000000000000000000
  n: 1000000000000000000000000000000
  d: 1000000000000000000000000000000000
  uu: 1000000000000000000000000000000000000
  dd: 1000000000000000000000000000000000000000
  tr: 1000000000000000000000000000000000000000000

# How prices are formatted globally
# Options: PRICE_RAW, PRICE_WITH_DECIMAL_FORMAT, PRICE_WITH_REDUCTION
price-format: PRICE_WITH_REDUCTION

# Decimal format pattern used when price-format is PRICE_WITH_DECIMAL_FORMAT
price-decimal-format: '#,###.#'

# Reduction tiers used when price-format is PRICE_WITH_REDUCTION
price-reductions:
  - format: "%amount%K"
    maxAmount: 999999
    display: "1K"
  - format: "%amount%M"
    maxAmount: 999999999
    display: "1M"
  - format: "%amount%B"
    maxAmount: 999999999999
    display: "1B"
  - format: "%amount%T"
    maxAmount: 999999999999999
    display: "1T"
  - format: "%amount%Q"
    maxAmount: 999999999999999999
    display: "1Q"

# Balance top leaderboard settings
enable-baltop: true
baltop-refresh-seconds: 900
baltop-placeholder-user-empty: "?"
baltop-display: MESSAGE
baltop-message-economy: money
baltop-message-amount: 10

# Whether to store economy data for offline players (increases storage usage)
store-offline-player-money: false

# Default balances granted to new players
default-economies:
  - economy: money
    amount: 100

# Transaction reason strings used in Vault and internal logging
pay-withdraw-reason: "Payment sent"
pay-deposit-reason: "Payment received"
command-give-reason: "Admin give"
command-give-all-reason: "Admin give all"
command-give-random-reason: "Admin give random"
command-take-reason: "Admin take"
command-reset-reason: "Admin reset"
command-set-reason: "Admin set"
```

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Économie |
| `default-economy` | String | `money` | Le nom de l'économie par défaut. Cette économie est utilisée pour l'intégration Vault et comme valeur par défaut pour les commandes qui ne spécifient pas d'économie |
| `price-format` | String | `PRICE_WITH_REDUCTION` | Mode de formatage global des prix. Options : `PRICE_RAW` (pas de formatage), `PRICE_WITH_DECIMAL_FORMAT` (utilise `price-decimal-format`), `PRICE_WITH_REDUCTION` (utilise les paliers `price-reductions`) |
| `price-decimal-format` | String | `#,###.#` | Modèle Java DecimalFormat utilisé lorsque `price-format` est `PRICE_WITH_DECIMAL_FORMAT` |
| `enable-baltop` | Boolean | `true` | Activer le classement des meilleurs soldes |
| `baltop-refresh-seconds` | Integer | `900` | Fréquence de rafraîchissement (en secondes) du classement baltop. `900` = 15 minutes |
| `baltop-placeholder-user-empty` | String | `?` | Texte affiché dans le baltop lorsqu'une position n'a pas de joueur |
| `baltop-display` | String | `MESSAGE` | Mode d'affichage du classement baltop. Supporte actuellement `MESSAGE` |
| `baltop-message-economy` | String | `money` | L'économie utilisée lors de l'affichage du baltop via la commande `/baltop` |
| `baltop-message-amount` | Integer | `10` | Nombre d'entrées affichées par page dans le classement baltop |
| `store-offline-player-money` | Boolean | `false` | Si `true`, les données économiques des joueurs hors ligne sont stockées et accessibles via les placeholders. Augmente l'utilisation du stockage |

### Propriétés d'une Entrée d'Économie

Chaque entrée dans la liste `economies` supporte les propriétés suivantes :

| Propriété | Type | Par Défaut | Description |
|-----------|------|------------|-------------|
| `name` | String | - | Nom interne unique pour cette économie. Utilisé dans les commandes, les placeholders et les références de configuration |
| `display-name` | String | - | Nom d'affichage montré aux joueurs. Supporte les codes couleur et MiniMessage |
| `symbol` | String | - | Symbole de la devise (par exemple, `$`, `T`, caractères Unicode spéciaux) |
| `format` | String | - | Chaîne de formatage pour l'affichage des prix. Utilisez `%price%` comme placeholder pour le montant (par exemple, `%price%$` ou `%price% coins`) |
| `vault` | Boolean | `false` | Si `true`, cette économie est enregistrée avec l'API Vault et peut être utilisée par d'autres plugins |
| `min` | Double | `0` | Solde minimum autorisé pour cette économie |
| `max` | Double | `1000000000` | Solde maximum autorisé pour cette économie |
| `min-pay` | Double | `0` | Montant minimum qu'un joueur peut envoyer en une seule transaction `/pay` |
| `max-pay` | Double | `1000000000` | Montant maximum qu'un joueur peut envoyer en une seule transaction `/pay` |
| `enable-pay` | Boolean | `true` | Indique si la commande `/pay` est activée pour cette économie |
| `enable-confirm-inventory` | Boolean | `true` | Si `true`, une interface de confirmation s'ouvre avant de traiter les transactions de paiement pour cette économie |
| `min-confirm-inventory` | Double | `1000` | Montant minimum de paiement requis pour déclencher l'interface de confirmation. Les paiements en dessous de ce montant sont traités immédiatement |
| `price-format` | String | `PRICE_WITH_REDUCTION` | Remplacement du formatage des prix par économie. Mêmes options que le `price-format` global |

:::info
Seule **une** économie devrait avoir `vault: true`. Cette économie est enregistrée avec l'API Vault et sera utilisée par tout plugin tiers qui interroge Vault pour les données économiques.
:::

### Multiplicateurs de Format des Nombres

La map `number-format-sell-multiplication` définit les suffixes abrégés que les joueurs peuvent utiliser avec la commande `/pay`. Par exemple, taper `/pay Player 5k` envoie 5 000.

| Suffixe | Multiplicateur |
|---------|----------------|
| `k` | 1 000 |
| `m` | 1 000 000 |
| `b` | 1 000 000 000 |
| `t` | 1 000 000 000 000 |
| `q` | 1 000 000 000 000 000 |
| `qq` | 1 000 000 000 000 000 000 |
| `s` | 10^21 |
| `ss` | 10^24 |
| `o` | 10^27 |
| `n` | 10^30 |
| `d` | 10^33 |
| `uu` | 10^36 |
| `dd` | 10^39 |
| `tr` | 10^42 |

### Paliers de Réduction des Prix

Lorsque `price-format` est défini sur `PRICE_WITH_REDUCTION`, les montants sont abrégés en utilisant les paliers configurés :

| Propriété | Type | Description |
|-----------|------|-------------|
| `format` | String | Le format d'affichage. Utilisez `%amount%` pour le nombre réduit (par exemple, `%amount%K`) |
| `maxAmount` | Long | La borne supérieure pour ce palier. Les montants dépassant cette valeur utilisent le palier suivant |
| `display` | String | Un libellé pour ce palier (par exemple, `1K`, `1M`, `1B`) |

**Exemple :** Un solde de 1 500 000 s'afficherait comme `1.5M` avec les paliers de réduction par défaut.

### Économies Par Défaut

La liste `default-economies` définit le solde de départ accordé aux nouveaux joueurs :

| Propriété | Type | Description |
|-----------|------|-------------|
| `economy` | String | Le nom de l'économie dans laquelle accorder le solde de départ |
| `amount` | Double | Le montant du solde de départ |

### Raisons des Transactions

Les raisons des transactions sont enregistrées avec chaque opération économique et peuvent être utilisées pour l'audit :

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `pay-withdraw-reason` | String | `Payment sent` | Raison enregistrée lorsque de l'argent est retiré via `/pay` |
| `pay-deposit-reason` | String | `Payment received` | Raison enregistrée lorsque de l'argent est déposé via `/pay` |
| `command-give-reason` | String | `Admin give` | Raison enregistrée pour `/eco give` |
| `command-give-all-reason` | String | `Admin give all` | Raison enregistrée pour `/eco give-all` |
| `command-give-random-reason` | String | `Admin give random` | Raison enregistrée pour `/eco give-random` |
| `command-take-reason` | String | `Admin take` | Raison enregistrée pour `/eco take` |
| `command-reset-reason` | String | `Admin reset` | Raison enregistrée pour `/eco reset` |
| `command-set-reason` | String | `Admin set` | Raison enregistrée pour `/eco set` |

:::tip
Les raisons des transactions apparaissent dans les callbacks de l'API Vault et peuvent être captées par des plugins de journalisation qui surveillent les transactions économiques.
:::

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/money` | `balance` | `essentials.money` | Afficher votre solde actuel |
| `/pay` | - | `essentials.pay` | Payer un autre joueur |
| `/paytoggle` | - | `essentials.pay.toggle` | Activer/désactiver la réception des paiements |
| `/economy` | `eco` | `essentials.eco.use` | Gérer les économies (give, take, set, reset, show) |
| `/balancetop` | `baltop` | `essentials.balance.top` | Afficher le classement des meilleurs soldes |

### Sous-commandes Economy

| Sous-commande | Description |
|---------------|-------------|
| `give` | Donner de l'argent à un joueur |
| `take` | Retirer de l'argent à un joueur |
| `set` | Définir le solde d'un joueur |
| `reset` | Réinitialiser le solde d'un joueur à la valeur par défaut |
| `reset-all` | Réinitialiser tous les soldes des joueurs |
| `show` | Afficher le solde d'un joueur |
| `give-random` | Donner de l'argent à un joueur en ligne aléatoire |
| `give-all` | Donner de l'argent à tous les joueurs en ligne |

---

## Permissions Associées

| Permission | Description |
|------------|-------------|
| `essentials.money` | Autorise l'utilisation de la commande `/money` |
| `essentials.pay` | Autorise l'utilisation de la commande `/pay` |
| `essentials.pay.toggle` | Autorise l'activation/désactivation de la réception des paiements |
| `essentials.eco.use` | Autorise l'utilisation des commandes d'administration `/economy` |
| `essentials.balance.top` | Autorise la consultation du classement des meilleurs soldes |

---

## Placeholders Associés

### Solde du Joueur

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_formatted_balance_{economy}%` | Solde formaté pour l'économie spécifiée (par exemple, `1.5M$`) |
| `%zessentials_user_balance_{economy}%` | Solde numérique brut pour l'économie spécifiée |
| `%zessentials_user_custom_balance_{economy}_{format}%` | Solde formaté avec un modèle DecimalFormat personnalisé |
| `%zessentials_user_position_{economy}%` | Position du joueur dans le classement baltop |

### Classement Baltop

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_economy_baltop_name_{economy}_{position}%` | Nom du joueur à la position donnée du baltop |
| `%zessentials_economy_baltop_uuid_{economy}_{position}%` | UUID du joueur à la position donnée du baltop |
| `%zessentials_economy_baltop_amount_{economy}_{position}%` | Montant brut du solde à la position donnée |
| `%zessentials_economy_baltop_formatted_amount_{economy}_{position}%` | Montant formaté du solde à la position donnée |

:::warning
Remplacez `{economy}` par le nom réel de l'économie (par exemple, `money`, `coins`) et `{position}` par le numéro de rang à partir de 1. L'utilisation d'un nom d'économie invalide retournera une valeur vide.
:::

**Exemple :** Afficher les 3 meilleurs joueurs de l'économie `money` :
```
1. %zessentials_economy_baltop_name_money_1% - %zessentials_economy_baltop_formatted_amount_money_1%
2. %zessentials_economy_baltop_name_money_2% - %zessentials_economy_baltop_formatted_amount_money_2%
3. %zessentials_economy_baltop_name_money_3% - %zessentials_economy_baltop_formatted_amount_money_3%
```
