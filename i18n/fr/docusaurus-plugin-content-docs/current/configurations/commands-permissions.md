---
sidebar_position: 2
title: Commandes et Permissions
description: Toutes les commandes et permissions de zMenu
---

# Commandes et Permissions

Cette page liste toutes les commandes et permissions disponibles dans zMenu.

## Commande principale

La commande principale est `/zm` (alias : `/zmenu`).

**Permission de base** : `zmenu.use`

## Liste des commandes

### Commandes generales

| Commande | Permission | Description |
|----------|-----------|-------------|
| `/zm` | `zmenu.use` | Afficher le menu d'aide |
| `/zm version` | - | Afficher les informations de version du plugin |
| `/zm list` | `zmenu.use` | Lister tous les inventaires charges |
| `/zm documentation` | `zmenu.documentation` | Voir les liens de documentation |
| `/zm addons` | `zmenu.use` | Lister les addons officiels |
| `/zm contributors` | `zmenu.use` | Afficher les contributeurs du plugin |

### Commandes d'inventaire

| Commande | Permission | Description |
|----------|-----------|-------------|
| `/zm open <inventaire>` | `zmenu.open` | Ouvrir un inventaire pour vous-meme |
| `/zm open <inventaire> <joueur>` | `zmenu.open` | Ouvrir un inventaire pour un autre joueur |
| `/zm open <inventaire> <joueur> <args...>` | `zmenu.open` | Ouvrir un inventaire avec des arguments |
| `/zm create [nom]` | `zmenu.create` | Creer un nouvel inventaire a partir d'un modele |
| `/zm editor [nom]` | `zmenu.editor` | Ouvrir l'editeur d'inventaire |

**Exemples :**
```
/zm open shop
/zm open shop Notch
/zm open shop Notch "Bienvenue dans la boutique !"
```

### Commandes de rechargement

| Commande | Permission | Description |
|----------|-----------|-------------|
| `/zm reload` | `zmenu.reload` | Recharger toutes les configurations |
| `/zm reload config` | `zmenu.reload` | Recharger config.yml et les messages uniquement |
| `/zm reload inventory` | `zmenu.reload` | Recharger tous les inventaires |
| `/zm reload inventory <nom>` | `zmenu.reload` | Recharger un inventaire specifique |
| `/zm reload command` | `zmenu.reload` | Recharger toutes les commandes |
| `/zm reload command <nom>` | `zmenu.reload` | Recharger une commande specifique |

**Exemples :**
```
/zm reload
/zm reload inventory shop
/zm reload command warp
```

### Commandes d'items

| Commande | Permission | Description |
|----------|-----------|-------------|
| `/zm giveitem <inventaire> <joueur>` | `zmenu.giveitem` | Donner un item cliquable au joueur |
| `/zm giveopenitem <inventaire> <joueur>` | `zmenu.giveopenitem` | Donner un item ouvrant le menu au joueur |
| `/zm save <nom>` | `zmenu.save` | Sauvegarder l'item tenu comme inventaire |

### Commandes de donnees joueur

| Commande | Permission | Description |
|----------|-----------|-------------|
| `/zm players add <joueur> <cle> <valeur>` | `zmenu.players` | Ajouter une valeur aux donnees joueur |
| `/zm players set <joueur> <cle> <valeur>` | `zmenu.players` | Definir une valeur de donnees joueur |
| `/zm players get <joueur> <cle>` | `zmenu.players` | Obtenir une valeur de donnees joueur |
| `/zm players remove <joueur> <cle>` | `zmenu.players` | Supprimer une cle de donnees joueur |
| `/zm players removeall <cle>` | `zmenu.players` | Supprimer une cle de tous les joueurs |
| `/zm players keys <joueur>` | `zmenu.players` | Lister toutes les cles pour un joueur |
| `/zm players convert` | `zmenu.players` | Convertir les donnees JSON en SQL |

**Exemples :**
```
/zm players set Notch coins 100
/zm players add Notch coins 50
/zm players get Notch coins
/zm players keys Notch
```

### Commandes de dialogues

| Commande | Permission | Description |
|----------|-----------|-------------|
| `/zm dialog open <dialogue>` | `zmenu.dialog` | Ouvrir un dialogue pour vous-meme |
| `/zm dialog open <dialogue> <joueur>` | `zmenu.dialog` | Ouvrir un dialogue pour un joueur |

### Commandes utilitaires

| Commande | Permission | Description |
|----------|-----------|-------------|
| `/zm convert` | `zmenu.convert` | Convertir les configurations d'autres plugins |
| `/zm testdupe` | `zmenu.dupe` | Tester le systeme anti-duplication |
| `/zm dumplog` | `zmenu.dumplog` | Exporter les logs de debug |

## Liste des permissions

### Permissions principales

| Permission | Description | Par defaut |
|------------|-------------|------------|
| `zmenu.use` | Acces aux commandes de base | true |
| `zmenu.open` | Ouvrir les inventaires | op |
| `zmenu.open.bypass` | Contourner les exigences d'ouverture d'inventaire | op |
| `zmenu.reload` | Recharger les configurations | op |
| `zmenu.create` | Creer de nouveaux inventaires | op |
| `zmenu.editor` | Acceder a l'editeur d'inventaire | op |

### Permissions d'items

| Permission | Description | Par defaut |
|------------|-------------|------------|
| `zmenu.giveitem` | Donner des items cliquables | op |
| `zmenu.giveopenitem` | Donner des items ouvrant le menu | op |
| `zmenu.save` | Sauvegarder des items comme inventaires | op |

### Permissions de donnees joueur

| Permission | Description | Par defaut |
|------------|-------------|------------|
| `zmenu.players` | Gerer les donnees joueur | op |

### Permissions utilitaires

| Permission | Description | Par defaut |
|------------|-------------|------------|
| `zmenu.convert` | Convertir depuis d'autres plugins | op |
| `zmenu.dupe` | Tester le systeme anti-duplication | op |
| `zmenu.documentation` | Voir la documentation | op |
| `zmenu.dialog` | Ouvrir les dialogues | op |
| `zmenu.dumplog` | Exporter les logs de debug | op |

## Permissions de commandes personnalisees

Lorsque vous creez des commandes personnalisees dans `commands/commands.yml`, vous pouvez definir des permissions personnalisees :

```yaml
commands:
  shop:
    command: /shop
    inventory: shop_menu
    permission: monserveur.shop
    aliases:
      - boutique
      - magasin
```

Les joueurs auront besoin de la permission `monserveur.shop` pour utiliser `/shop`.

## Permissions specifiques aux inventaires

Vous pouvez exiger des permissions specifiques pour ouvrir des inventaires en utilisant les exigences de vue :

```yaml
# Dans votre fichier d'inventaire
view-requirement:
  requirements:
    - type: permission
      permission: "monserveur.vip.menu"
      deny:
        - type: message
          messages:
            - "&cVous avez besoin du rang VIP pour acceder a ce menu !"
```

## Permission administrateur

Pour les administrateurs de serveur, vous pouvez accorder toutes les permissions zMenu avec :

```
zmenu.*
```

Cela donne acces a toutes les commandes zMenu.

## Exemples LuckPerms

Accorder l'utilisation de base :
```
/lp user <joueur> permission set zmenu.use true
```

Accorder toutes les permissions admin :
```
/lp group admin permission set zmenu.* true
```

Accorder l'acces a un inventaire specifique :
```
/lp group vip permission set monserveur.vip.menu true
```

## Plugins de permissions

zMenu fonctionne avec tous les plugins de permissions qui supportent les permissions Bukkit :

- LuckPerms (Recommande)
- PermissionsEx
- GroupManager
- UltraPermissions
- Et bien d'autres

## Prochaines etapes

- Apprenez les [Placeholders](./placeholders)
- Creez des [Commandes personnalisees](./custom-commands)
- Configurez les [Donnees joueur](./player-data) pour le stockage persistant
