---
sidebar_position: 7
title: Webhooks Discord
description: Configurer les notifications webhook Discord dans zAuctionHouse V4
---

# Configuration des Webhooks Discord

zAuctionHouse V4 peut envoyer des notifications sur Discord lorsque des objets sont mis en vente ou achetés. Configurez les webhooks dans `discord.yml`.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/discord-2.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/discord-1.png" alt="Description" style={{ width: '400px', height: 'auto' }} />
</div>

## Installation

1. Dans Discord, allez dans **Paramètres du serveur** → **Intégrations** → **Webhooks**
2. Créez un nouveau webhook et copiez l'URL du webhook
3. Collez l'URL dans `discord.yml`
4. Activez le webhook et personnalisez l'embed

:::warning
Gardez votre URL de webhook privée ! Toute personne ayant cette URL peut publier dans votre canal.
:::

## Paramètres Globaux

```yaml
# Enable/disable all Discord notifications
enabled: false

# Server name for multi-server setups
server-name: "My Server"
```

## Paramètres d'Image des Objets

Cette section permet d'afficher l'image de l'objet dans l'embed Discord. Vous pouvez également extraire la couleur dominante de l'image pour l'utiliser comme couleur de l'embed.

```yaml
# URL pattern for item icons
# %item_material% is replaced with material name (lowercase)
item-image-url: "https://img.groupez.dev/minecraft/%item_material%.png"

# Extract dominant color from item images
# Adds HTTP requests - may increase latency
extract-dominant-color: false

# Default embed color when extraction is disabled/fails
default-color: "#5865F2"
```

## Configuration des Webhooks

### Webhook de Vente

Envoyé lorsqu'un joueur met un nouvel objet en vente :

```yaml
webhooks:
  sell:
    enabled: false
    url: "https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN"

    # Custom bot appearance
    username: "zAuctionHouse"
    avatar-url: ""

    # Message above the embed
    content: ""

    embed:
      title: "New Item Listed!"
      description: "**%seller_name%** has listed an item for sale"
      color: "#00FF00"

      fields:
        - name: "Item"
          value: "%item_display%"
          inline: true
        - name: "Price"
          value: "%formatted_price%"
          inline: true
        - name: "Quantity"
          value: "%item_amount%"
          inline: true
        - name: "Economy"
          value: "%economy_display_name%"
          inline: true

      footer:
        text: "Server: %server_name%"
        icon-url: ""

      author:
        name: "%seller_name%"
        url: ""
        icon-url: "https://mc-heads.net/avatar/%seller_uuid%"

      thumbnail:
        url: "%item_image_url%"

      image:
        url: ""

      timestamp: true
```

### Webhook d'Achat

Envoyé lorsqu'un joueur achète un objet :

```yaml
  purchase:
    enabled: false
    url: "https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN"
    username: "zAuctionHouse"
    avatar-url: ""
    content: ""

    embed:
      title: "Item Purchased!"
      description: "**%buyer_name%** has purchased an item from **%seller_name%**"
      color: "#FFD700"

      fields:
        - name: "Item"
          value: "%item_display%"
          inline: true
        - name: "Price"
          value: "%formatted_price%"
          inline: true
        - name: "Buyer"
          value: "%buyer_name%"
          inline: true
        - name: "Seller"
          value: "%seller_name%"
          inline: true

      footer:
        text: "Server: %server_name%"
        icon-url: ""

      author:
        name: "%buyer_name%"
        url: ""
        icon-url: "https://mc-heads.net/avatar/%buyer_uuid%"

      thumbnail:
        url: "%item_image_url%"

      image:
        url: ""

      timestamp: true
```

## Placeholders Disponibles

### Placeholders d'Objet

| Placeholder | Description |
|-------------|-------------|
| `%item_id%` | ID interne de l'objet |
| `%item_material%` | Nom du matériau (minuscules, ex: "diamond_sword") |
| `%item_display%` | Nom d'affichage de l'objet avec formatage |
| `%item_amount%` | Taille de la pile |
| `%item_lore%` | Lore de l'objet |
| `%item_enchantments%` | Liste des enchantements |
| `%item_custom_model_data%` | Valeur CustomModelData |
| `%item_dominant_color%` | Couleur dominante extraite |
| `%item_image_url%` | URL complète de l'image de l'objet |

### Placeholders de Joueur

| Placeholder | Description |
|-------------|-------------|
| `%seller_name%` | Nom du vendeur |
| `%seller_uuid%` | UUID du vendeur |
| `%buyer_name%` | Nom de l'acheteur (achat uniquement) |
| `%buyer_uuid%` | UUID de l'acheteur (achat uniquement) |

### Placeholders de Prix

| Placeholder | Description |
|-------------|-------------|
| `%price%` | Prix brut |
| `%formatted_price%` | Prix formaté (ex: "1,000$") |
| `%economy_name%` | Nom interne de l'économie |
| `%economy_display_name%` | Nom d'affichage de l'économie |

### Placeholders de Temps

| Placeholder | Description |
|-------------|-------------|
| `%created_at%` | Date de création de l'annonce |
| `%expires_at%` | Date d'expiration de l'annonce |
| `%remaining_time%` | Temps restant avant expiration |
| `%timestamp%` | Horodatage actuel |

### Placeholders de Serveur

| Placeholder | Description |
|-------------|-------------|
| `%server_name%` | Nom du serveur depuis la configuration |

### Placeholders de Catégorie

| Placeholder | Description |
|-------------|-------------|
| `%category_names%` | Noms des catégories séparés par des virgules |
| `%category_count%` | Nombre de catégories correspondantes |

## Personnalisation de l'Embed

### Couleurs

Utilisez le format hexadécimal : `#RRGGBB`

```yaml
color: "#00FF00"  # Green for sales
color: "#FFD700"  # Gold for purchases
color: "#FF0000"  # Red for errors
```

Ou utilisez des couleurs dynamiques :
```yaml
color: "%item_dominant_color%"  # Requires extract-dominant-color: true
```

### Champs

Chaque champ possède :
- `name` : Titre en gras (max 256 caractères)
- `value` : Contenu (max 1024 caractères)
- `inline` : `true` = côte à côte, `false` = pleine largeur

Maximum 25 champs par embed.

```yaml
fields:
  - name: "Item"
    value: "%item_display%"
    inline: true
  - name: "Details"
    value: "Listed on %server_name%"
    inline: false
```

### Auteur

S'affiche au-dessus du titre avec une icône :

```yaml
author:
  name: "%seller_name%"
  url: "https://yourserver.com/profile/%seller_uuid%"
  icon-url: "https://mc-heads.net/avatar/%seller_uuid%"
```

### Pied de Page

Petit texte en bas :

```yaml
footer:
  text: "Server: %server_name%"
  icon-url: "https://yourserver.com/icon.png"
```

### Images

```yaml
# Small image on right
thumbnail:
  url: "%item_image_url%"

# Large image at bottom
image:
  url: ""
```

### Horodatage

Affiche l'heure actuelle dans le fuseau horaire local de l'utilisateur :

```yaml
timestamp: true
```

## Mentions Discord

Utilisez dans le champ `content` :

```yaml
content: "<@USER_ID>"           # Mention user
content: "<@&ROLE_ID>"          # Mention role
content: "@everyone"            # Mention everyone
content: "@here"                # Mention online users
```

## Exemple Complet

```yaml
enabled: true
server-name: "SkyBlock"

item-image-url: "https://img.groupez.dev/minecraft/%item_material%.png"
extract-dominant-color: false
default-color: "#5865F2"

webhooks:
  sell:
    enabled: true
    url: "https://discord.com/api/webhooks/123456/abcdef"
    username: "Auction House"
    avatar-url: ""
    content: ""

    embed:
      title: "New Listing!"
      description: "**%seller_name%** listed **%item_display%** x%item_amount%"
      color: "#00FF00"

      fields:
        - name: "Price"
          value: "%formatted_price%"
          inline: true
        - name: "Expires"
          value: "%remaining_time%"
          inline: true

      footer:
        text: "%server_name% Auction House"

      author:
        name: "%seller_name%"
        icon-url: "https://mc-heads.net/avatar/%seller_uuid%"

      thumbnail:
        url: "%item_image_url%"

      timestamp: true

  purchase:
    enabled: true
    url: "https://discord.com/api/webhooks/123456/abcdef"
    username: "Auction House"

    embed:
      title: "Item Sold!"
      description: "**%buyer_name%** bought from **%seller_name%**"
      color: "#FFD700"

      fields:
        - name: "Item"
          value: "%item_display%"
          inline: true
        - name: "Price"
          value: "%formatted_price%"
          inline: true

      author:
        name: "%buyer_name%"
        icon-url: "https://mc-heads.net/avatar/%buyer_uuid%"

      thumbnail:
        url: "%item_image_url%"

      timestamp: true
```

## Astuces

- Utilisez `%item_dominant_color%` pour des couleurs d'embed dynamiques correspondant à l'objet
- Gardez les valeurs des champs d'embed courtes pour éviter les limites de caractères de Discord
- Testez votre configuration de webhook avec un canal privé d'abord
- Utilisez des URLs de webhook différentes pour différents types d'événements si nécessaire
