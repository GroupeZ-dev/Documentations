---
sidebar_position: 10
title: Commandes personnalisees
description: Creer des commandes personnalisees pour ouvrir vos inventaires
---

# Commandes personnalisees

zMenu vous permet de creer des commandes personnalisees qui ouvrent vos inventaires. Au lieu d'utiliser `/zm open shop`, les joueurs peuvent simplement taper `/shop`.

## Fichier de configuration

Les commandes personnalisees sont definies dans `plugins/zMenu/commands/commands.yml`.

## Structure de base

```yaml
commands:
  shop:
    command: /shop
    inventory: shop_menu
```

Ceci cree la commande `/shop` qui ouvre l'inventaire `shop_menu`.

## Options de configuration

### command

**Requis.** La commande que les joueurs taperont.

```yaml
command: /shop
```

---

### inventory

**Requis.** L'inventaire a ouvrir lorsque la commande est utilisee.

```yaml
inventory: "shop"  # Ouvre inventories/shop.yml
```

---

### permission

Permission optionnelle requise pour utiliser la commande.

```yaml
permission: "monserveur.shop"
```

---

### aliases

Noms de commande alternatifs.

```yaml
aliases:
  - boutique
  - magasin
  - acheter
```

Cela permet a `/boutique`, `/magasin` et `/acheter` de fonctionner comme `/shop`.

---

### actions

Actions a executer lorsque la commande est utilisee (avant d'ouvrir l'inventaire).

```yaml
actions:
  - type: message
    messages:
      - "&aOuverture de la boutique..."
  - type: sound
    sound: BLOCK_CHEST_OPEN
```

---

### arguments

Definir des arguments de commande.

```yaml
arguments:
  - name: "category"
    required: false
    auto-completion:
      - "armes"
      - "armures"
      - "outils"
```

## Exemples

### Commande boutique simple

```yaml
commands:
  shop:
    command: /shop
    inventory: shop
    permission: "server.shop"
    aliases:
      - boutique
      - magasin
```

### Commande warps

```yaml
commands:
  warps:
    command: /warps
    inventory: warps_menu
    permission: "server.warps"
    aliases:
      - warp
      - teleport
    actions:
      - type: message
        messages:
          - "&7Ouverture du menu warps..."
```

### Menu admin

```yaml
commands:
  adminmenu:
    command: /adminmenu
    inventory: admin_panel
    permission: "server.admin.menu"
    aliases:
      - admin
      - apanel
```

### Menu avec categories

```yaml
commands:
  menu:
    command: /menu
    inventory: main_menu
    aliases:
      - gui
      - m

  help:
    command: /help
    inventory: help_menu
    permission: "server.help"

  rules:
    command: /rules
    inventory: rules_menu
```

### Informations serveur

```yaml
commands:
  info:
    command: /info
    inventory: server_info
    aliases:
      - serverinfo
      - apropos
    actions:
      - type: sound
        sound: ENTITY_EXPERIENCE_ORB_PICKUP
```

## Fichiers de commandes multiples

Vous pouvez organiser les commandes dans plusieurs fichiers :

```
plugins/zMenu/commands/
├── commands.yml
├── shop/
│   └── shop_commands.yml
├── admin/
│   └── admin_commands.yml
└── social/
    └── social_commands.yml
```

Chaque fichier suit le meme format :

```yaml
# commands/shop/shop_commands.yml
commands:
  shop:
    command: /shop
    inventory: shop_main

  buyweapons:
    command: /buyweapons
    inventory: shop_weapons
```

## Arguments de commande

### Arguments basiques

```yaml
commands:
  give-menu:
    command: /givemenu
    inventory: give_menu
    permission: "server.admin"
    arguments:
      - name: "player"
        required: true
        auto-completion: "@players"  # Auto-completion avec les joueurs en ligne
```

### Arguments multiples

```yaml
commands:
  category:
    command: /category
    inventory: category_menu
    arguments:
      - name: "type"
        required: true
        auto-completion:
          - "armes"
          - "armures"
          - "outils"
          - "nourriture"
      - name: "page"
        required: false
```

## Commandes en conflit

Si votre commande entre en conflit avec un autre plugin :

1. **Changez le nom de la commande** pour quelque chose d'unique
2. **Utilisez des alias** comme point d'entree principal
3. **Verifiez l'ordre de chargement des plugins** dans la configuration du serveur

:::tip
Si une commande comme `/shop` est prise par un autre plugin, utilisez une commande unique comme `/zmshop` et ajoutez `/shop` comme alias. zMenu essaiera d'enregistrer l'alias.
:::

## Exemples de permissions

### Avec LuckPerms

```bash
# Donner la permission d'utiliser shop
/lp group default permission set server.shop true

# Menu admin pour les admins uniquement
/lp group admin permission set server.admin.menu true
```

### Message de refus

Les joueurs sans permission voient le message "pas de permission" par defaut. Personnalisez-le dans votre configuration des messages.

## Recharger les commandes

Apres avoir modifie les fichiers de commandes :

```
/zm reload command           # Recharger toutes les commandes
/zm reload command shop      # Recharger une commande specifique
```

## Exemple complet

```yaml
# commands/commands.yml
commands:
  # Menu principal du serveur
  menu:
    command: /menu
    inventory: main_menu
    aliases:
      - gui
      - serveur
    actions:
      - type: sound
        sound: BLOCK_CHEST_OPEN

  # Boutique avec permission
  shop:
    command: /shop
    inventory: shop_main
    permission: "server.shop"
    aliases:
      - boutique
      - magasin
      - acheter

  # Boutique VIP
  vipshop:
    command: /vipshop
    inventory: vip_shop
    permission: "server.vip.shop"
    aliases:
      - vs

  # Menu warps
  warps:
    command: /warps
    inventory: warps_menu
    permission: "server.warps"
    aliases:
      - warp
      - w

  # Profil joueur
  profile:
    command: /profile
    inventory: player_profile
    aliases:
      - stats
      - me

  # Menu aide
  help:
    command: /serverhelp
    inventory: help_menu
    aliases:
      - faq
      - info

  # Panel admin
  admin:
    command: /adminpanel
    inventory: admin_menu
    permission: "server.admin"
    aliases:
      - ap
      - adminmenu
```

## Bonnes pratiques

1. **Utilisez des noms intuitifs** : `/shop` et non `/spm`
2. **Ajoutez des alias utiles** : Variations courantes et raccourcis
3. **Definissez des permissions appropriees** : Restreignez les menus sensibles
4. **Restez organise** : Utilisez des sous-dossiers pour les grandes configurations
5. **Documentez les commandes** : Commentez vos fichiers YAML
6. **Testez minutieusement** : Verifiez que les commandes fonctionnent comme prevu

## Prochaines etapes

- Configurez le fichier principal [config.yml](./config-yml)
- Apprenez les [Donnees joueur](./player-data)
- Configurez les [Placeholders globaux](./global-placeholders)
