---
sidebar_position: 4
title: Placeholders
description: Tous les placeholders disponibles dans zAuctionHouse V4
---

# Placeholders

zAuctionHouse V4 fournit des placeholders utilisables dans les messages, le lore, et avec PlaceholderAPI.

## Prérequis

Pour les placeholders PlaceholderAPI, vous devez avoir [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) installé sur votre serveur.

## Placeholders internes

Ces placeholders sont utilisés dans les fichiers de configuration de zAuctionHouse (lore des objets, messages, etc.) :

### Placeholders d'affichage d'objets

Utilisés dans la section `item-lore` de `config.yml` :

| Placeholder | Description |
|-------------|-------------|
| `%seller%` | Nom du joueur qui a mis l'objet en vente |
| `%buyer%` | Nom du joueur qui a acheté l'objet |
| `%price%` | Prix formaté de l'objet |
| `%time-remaining%` | Temps avant expiration de l'annonce |
| `%formatted-expire-date%` | Date d'expiration formatée |
| `%date%` | Date de la transaction |
| `%status%` | Message d'action dynamique (acheter/récupérer) |
| `%items%` | Noms d'affichage des objets |
| `%economy-name%` | Nom interne de l'économie |
| `%economy-display-name%` | Nom d'affichage de l'économie |
| `%type%` | Type d'entrée de log |
| `%player%` | Joueur impliqué dans l'action |
| `%target%` | Joueur cible (opérations admin) |

### Placeholders d'inventaire

Utilisés dans les fichiers d'inventaire :

| Placeholder | Description |
|-------------|-------------|
| `%page%` | Numéro de page actuel |
| `%max-page%` | Nombre total de pages |
| `%zauctionhouse_category_name%` | Nom de la catégorie actuelle |
| `%expired-items%` | Nombre d'objets expirés |
| `%purchased-items%` | Nombre d'objets achetés |
| `%selling-items%` | Nombre d'objets en vente |
| `%s%` | Suffixe de pluralisation ("" pour 1, "s" pour 2+) |

### Placeholders de messages

Utilisés dans `messages.yml` :

| Placeholder | Description | Utilisé dans |
|-------------|-------------|--------------|
| `%version%` | Version actuelle du plugin | Messages de version |
| `%latest%` | Dernière version disponible | Messages de version |
| `%syntax%` | Syntaxe de commande | Messages d'erreur |
| `%inventory-name%` | Nom d'inventaire manquant | Messages d'erreur |
| `%name%` | Nom de l'économie | Messages d'économie |
| `%items%` | Description de l'objet | Messages de transaction |
| `%tax%` | Montant de la taxe | Messages de taxe |
| `%percentage%` | Pourcentage de taxe | Messages de taxe |
| `%max-price%` | Prix maximum autorisé | Erreur de prix |
| `%min-price%` | Prix minimum requis | Erreur de prix |
| `%max-items%` | Maximum d'objets autorisés | Erreur de limite |
| `%amount%` | Valeur du montant | Messages de réclamation |
| `%economy%` | Nom de l'économie | Messages de réclamation |
| `%count%` | Nombre d'objets | Messages de notification |
| `%total%` | Valeur totale | Messages de notification |
| `%key%` | Nom de la clé de cache | Cache admin |
| `%value%` | Valeur du cache | Cache admin |
| `%source%` | Source de migration | Messages de migration |
| `%details%` | Détails de migration | Messages de migration |
| `%progress%` | Progression de migration | Messages de migration |
| `%players%` | Nombre de joueurs migrés | Messages de migration |
| `%transactions%` | Nombre de transactions | Messages de migration |
| `%errors%` | Nombre d'erreurs | Messages de migration |
| `%duration%` | Durée de l'opération (ms) | Messages de migration |
| `%current%` | Progression actuelle | Messages de génération |
| `%time%` | Temps écoulé (ms) | Messages de génération |

### Placeholders de format d'objet

Utilisés dans la section `item-display` :

| Placeholder | Description |
|-------------|-------------|
| `%amount%` | Quantité d'objets |
| `%item-translation-key%` | Clé de langue Minecraft |
| `%item-name%` | Nom personnalisé de l'objet |

### Placeholders d'inventaire de vente

Utilisés dans les boutons de l'inventaire de vente :

| Placeholder | Description |
|-------------|-------------|
| `%price%` | Prix de mise en vente actuel |
| `%economy%` | Nom d'affichage de l'économie sélectionnée |
| `%economy_name%` | Nom interne de l'économie sélectionnée |
| `%item_count%` | Nombre d'objets en vente |
| `%left_click_amount%` | Ajustement du prix au clic gauche |
| `%right_click_amount%` | Ajustement du prix au clic droit |
| `%shift_left_click_amount%` | Ajustement du prix au shift+clic gauche |
| `%shift_right_click_amount%` | Ajustement du prix au shift+clic droit |

### Placeholders de Shulker

Utilisés dans les boutons de contenu de shulker :

| Placeholder | Description |
|-------------|-------------|
| `%shulker_current%` | Numéro du shulker actuel (à partir de 1) |
| `%shulker_total%` | Nombre total de shulkers |

### Placeholders de commande Sell

| Placeholder | Description |
|-------------|-------------|
| `%max-stack-size%` | Taille maximale de pile de l'objet |

## Placeholders PlaceholderAPI

Tous les placeholders PlaceholderAPI utilisent le préfixe `zauctionhouse_` :

### Placeholders globaux

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_listed_items%` | Nombre total d'objets actuellement listés |
| `%zauctionhouse_category_count_<catégorie>%` | Nombre d'objets dans une catégorie spécifique (ex : `%zauctionhouse_category_count_weapons%`) |

### Placeholders joueur

| Placeholder | Description |
|-------------|-------------|
| `%zauctionhouse_expired_items%` | Nombre d'objets expirés du joueur |
| `%zauctionhouse_selling_items%` | Nombre d'objets que le joueur vend actuellement |
| `%zauctionhouse_purchased_items%` | Nombre d'objets achetés du joueur |
| `%zauctionhouse_sorting_value%` | Valeur du type de tri actuel (ex : `DECREASING_DATE`) |
| `%zauctionhouse_sorting_name%` | Nom d'affichage du type de tri actuel |
| `%zauctionhouse_category_name%` | Nom d'affichage de la catégorie actuelle |
| `%zauctionhouse_category_id%` | ID de la catégorie actuelle (par défaut `main`) |
| `%zauctionhouse_pending_money%` | Argent en attente total (formaté avec la devise) |
| `%zauctionhouse_pending_money_raw%` | Argent en attente total (nombre brut) |
| `%zauctionhouse_pending_money_<économie>%` | Argent en attente pour une économie spécifique (ex : `%zauctionhouse_pending_money_coins%`) |
| `%zauctionhouse_has_pending_money%` | `true` ou `false` selon si le joueur a de l'argent en attente |

## Placeholders Webhook Discord

Utilisés dans la configuration webhook de `discord.yml` :

### Placeholders d'objet

| Placeholder | Description |
|-------------|-------------|
| `%item_id%` | ID interne de l'objet |
| `%item_material%` | Nom du matériau (minuscule) |
| `%item_display%` | Nom d'affichage de l'objet avec formatage |
| `%item_amount%` | Taille de la pile |
| `%item_lore%` | Lore de l'objet |
| `%item_enchantments%` | Liste des enchantements |
| `%item_custom_model_data%` | Valeur CustomModelData |
| `%item_dominant_color%` | Couleur dominante extraite |
| `%item_image_url%` | URL vers l'image de l'objet |

### Placeholders de joueur

| Placeholder | Description |
|-------------|-------------|
| `%seller_name%` | Nom d'utilisateur du vendeur |
| `%seller_uuid%` | UUID du vendeur |
| `%buyer_name%` | Nom d'utilisateur de l'acheteur (achat uniquement) |
| `%buyer_uuid%` | UUID de l'acheteur (achat uniquement) |

### Placeholders de prix

| Placeholder | Description |
|-------------|-------------|
| `%price%` | Nombre du prix brut |
| `%formatted_price%` | Prix avec formatage de l'économie |
| `%economy_name%` | Nom interne de l'économie |
| `%economy_display_name%` | Nom d'affichage de l'économie |

### Placeholders de temps

| Placeholder | Description |
|-------------|-------------|
| `%created_at%` | Quand l'annonce a été créée |
| `%expires_at%` | Quand l'annonce expire |
| `%remaining_time%` | Temps avant expiration |
| `%timestamp%` | Horodatage actuel |

### Placeholders de serveur

| Placeholder | Description |
|-------------|-------------|
| `%server_name%` | Nom du serveur (depuis la config) |

### Placeholders de catégorie

| Placeholder | Description |
|-------------|-------------|
| `%category_names%` | Noms de catégories séparés par des virgules |
| `%category_count%` | Nombre de catégories correspondantes |

## Exemples d'utilisation

### Lore d'inventaire

```yaml
# Dans inventories/auction.yml
item:
  material: BELL
  name: "#2CCED2Informations de l'hôtel des ventes"
  lore:
    - "#92ffffNombre d'objets: #2CCED2%zauctionhouse_listed_items%"
    - "#92ffffType de tri: #2CCED2%zauctionhouse_sorting_name%"
    - ""
    - "#8c8c8c• #2CCED2Cliquez pour actualiser"
```

### Lore d'objet dans la config

```yaml
# Dans config.yml
item-lore:
  listed-auction-item:
    - ""
    - "<white>⌂ #92ffffVendeur#8c8c8c: #2CCED2%seller%"
    - "<white>☆ #92ffffPrix#8c8c8c: #2CCED2%price%"
    - "<white>⌚ #92ffffExpire#8c8c8c: #969696%time-remaining%"
    - ""
    - "%status%"
```

### Webhook Discord

```yaml
# Dans discord.yml
embed:
  title: "Nouvel objet en vente !"
  description: "**%seller_name%** a mis un objet en vente"
  fields:
    - name: "Objet"
      value: "%item_display%"
      inline: true
    - name: "Prix"
      value: "%formatted_price%"
      inline: true
```

### Messages personnalisés

```yaml
# Dans messages.yml
item-sold: "#e6fff3Vous venez de vendre %items% #e6fff3pour #92bed8%price%#e6fff3."

item-bought-seller: "#ffacd5%buyer% #e6fff3vient d'acheter %items% #e6fff3pour #92bed8%price%#e6fff3."

sales-notification:
  - "<click:run_command:/ah history>#e6fff3Pendant votre absence, %count% de vos objets ont été vendus pour un total de %total% !"
  - "<click:run_command:/ah history>#8c8c8c• #2CCED2Cliquez ici pour voir votre historique de ventes</click>"
```

## Formatage des couleurs

zAuctionHouse V4 supporte :

- **Format MiniMessage** : `<red>`, `<bold>`, `<gradient:red:blue>`
- **Couleurs hex** : `#RRGGBB` ou `#RGB`
- **Codes legacy** : `&c`, `&l`, etc. (MiniMessage recommandé)
- **Raccourcis personnalisés** : `<primary>`, `<secondary>`, `<error>`, `<success>` (définis dans config.yml)

```yaml
# Exemple utilisant des raccourcis personnalisés
message: "<primary>Bienvenue <secondary>à l'hôtel des ventes !"
# Devient : "#24d65d Bienvenue #656665 à l'hôtel des ventes !"
```
