---
sidebar_position: 3
title: Économies
description: Configurer les systèmes économiques dans zAuctionHouse
---

# Configuration des Économies

zAuctionHouse supporte plusieurs systèmes économiques. Configurez-les dans le dossier `economies/`.

## Économie Vault

L'intégration économique la plus courante. Créez `economies/vault.yml` :

```yaml
# Activer cette économie
enabled: true

# Nom d'affichage pour cette économie
name: "Argent"

# Icône pour l'affichage dans l'inventaire
icon:
  material: GOLD_INGOT
  name: "&6Argent"

# Restrictions de prix
price:
  # Prix minimum pour tout objet
  min: 1
  # Prix maximum pour tout objet (0 pour pas de limite)
  max: 1000000000

# Nécessite une permission pour utiliser cette économie
permission: ""  # Laisser vide pour tout le monde

# Configuration des taxes
tax:
  # Activer les taxes sur les ventes
  enabled: true
  # Pourcentage de taxe (10 = 10%)
  percentage: 10
  # Qui paie la taxe : SELLER ou BUYER
  payer: SELLER

# Paramètres de réclamation automatique
auto-claim:
  # Donner automatiquement l'argent au vendeur lors de l'achat
  enabled: true
  # Si false, le vendeur doit récupérer depuis les objets achetés
```

## Économie PlayerPoints

Pour les serveurs utilisant PlayerPoints. Créez `economies/playerpoints.yml` :

```yaml
enabled: true
name: "Points"

icon:
  material: EMERALD
  name: "&aPoints"

price:
  min: 1
  max: 10000000

tax:
  enabled: false

auto-claim:
  enabled: true
```

## Économie Expérience

Utilisez l'expérience du joueur comme monnaie. Créez `economies/experience.yml` :

```yaml
enabled: true
name: "Expérience"

icon:
  material: EXPERIENCE_BOTTLE
  name: "&aExpérience"

price:
  min: 10
  max: 100000

tax:
  enabled: false

auto-claim:
  enabled: true
```

## Économie Niveaux

Utilisez les niveaux du joueur comme monnaie. Créez `economies/levels.yml` :

```yaml
enabled: true
name: "Niveaux"

icon:
  material: ENCHANTED_BOOK
  name: "&bNiveaux"

price:
  min: 1
  max: 1000

tax:
  enabled: false

auto-claim:
  enabled: true
```

## Économie basée sur les Objets

Utilisez un objet spécifique comme monnaie. Créez `economies/diamonds.yml` :

```yaml
enabled: true
name: "Diamants"

# Définir l'objet de monnaie
currency-item:
  material: DIAMOND
  # Optionnel : nécessite un nom spécifique
  name: ""
  # Optionnel : nécessite un lore spécifique
  lore: []
  # Optionnel : nécessite un custom model data
  model-data: 0

icon:
  material: DIAMOND
  name: "&bDiamants"

price:
  min: 1
  max: 10000

tax:
  enabled: false

auto-claim:
  enabled: true
```

## Réduction de Prix

Configurez la réduction automatique des prix au fil du temps :

```yaml
price-reduction:
  # Activer la réduction de prix
  enabled: true

  # Calendrier de réduction
  schedule:
    # Après 1 jour, réduire de 5%
    - after: 1d
      reduction: 5
    # Après 3 jours, réduire de 10%
    - after: 3d
      reduction: 10
    # Après 7 jours, réduire de 20%
    - after: 7d
      reduction: 20

  # Prix minimum (pourcentage du prix original)
  minimum-percentage: 50
```

Avec ces paramètres :
- Jour 1-2 : 100% du prix original
- Jour 2-3 : 95% du prix original
- Jour 3-7 : 90% du prix original
- Jour 7+ : 80% du prix original (minimum 50%)

## Détails de Configuration des Taxes

```yaml
tax:
  enabled: true

  # Pourcentage de taxe de base
  percentage: 10

  # Qui paie : SELLER ou BUYER
  payer: SELLER

  # Permission pour contourner la taxe
  bypass-permission: "zauctionhouse.bypass.tax"

  # Taux de taxe différents selon les permissions
  rates:
    - permission: zauctionhouse.tax.vip
      percentage: 5
    - permission: zauctionhouse.tax.mvp
      percentage: 2
    - permission: zauctionhouse.tax.exempt
      percentage: 0
```

## Exemple d'Économies Multiples

Vous pouvez avoir plusieurs économies actives simultanément. Les joueurs choisissent laquelle utiliser lors de la mise en vente.

Structure du répertoire :
```
economies/
├── vault.yml        # Argent standard
├── points.yml       # PlayerPoints
├── diamonds.yml     # Monnaie en diamants
└── tokens.yml       # Objet de jeton personnalisé
```

Dans les inventaires, affichez le sélecteur d'économie :

```yaml
# Dans sell.yml
items:
  economy-selector:
    slot: 4
    item:
      material: GOLD_INGOT
      name: "&6Sélectionner la Monnaie"
      lore:
        - "&7Cliquez pour changer de monnaie"
        - ""
        - "&7Actuelle : &f%economy%"
```

## Exemple Complet d'Économie Vault

`economies/vault.yml` complet :

```yaml
enabled: true
name: "Argent"

icon:
  material: GOLD_INGOT
  name: "&6Argent"
  lore:
    - "&7Monnaie standard du serveur"
    - "&7Alimentée par Vault"

price:
  min: 1
  max: 1000000000

  # Limites de prix par catégorie
  category-limits:
    weapons:
      min: 100
      max: 100000
    armor:
      min: 100
      max: 100000
    blocks:
      min: 1
      max: 10000
    misc:
      min: 1
      max: 50000

permission: ""

tax:
  enabled: true
  percentage: 10
  payer: SELLER
  bypass-permission: "zauctionhouse.bypass.tax"
  rates:
    - permission: zauctionhouse.tax.vip
      percentage: 5

price-reduction:
  enabled: true
  schedule:
    - after: 3d
      reduction: 10
    - after: 7d
      reduction: 20
  minimum-percentage: 50

auto-claim:
  enabled: true

# Format pour l'affichage des prix
format: "%amount%$"
```
