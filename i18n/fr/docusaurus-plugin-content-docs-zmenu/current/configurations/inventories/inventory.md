---
sidebar_position: 1
title: Configuration d'inventaire
description: Reference complete des options de configuration d'inventaire
---

# Configuration d'inventaire

Cette page documente toutes les options de configuration disponibles pour creer des inventaires dans zMenu.

## Emplacement des fichiers

Les inventaires sont stockes dans le dossier `plugins/zMenu/inventories/`. Chaque fichier YAML represente un inventaire. Vous pouvez organiser les inventaires dans des sous-dossiers.

```
plugins/zMenu/inventories/
├── main_menu.yml
├── shop.yml
├── warps/
│   ├── spawn.yml
│   └── hub.yml
└── admin/
    └── admin_menu.yml
```

## Structure de base

```yaml
# Nom de l'inventaire affiche dans la barre de titre
name: "&6Mon Inventaire"

# Taille de l'inventaire (9, 18, 27, 36, 45 ou 54)
size: 54

# Activer ou desactiver cet inventaire
enable: true

# Definitions des boutons
items:
  nom-bouton:
    # Configuration du bouton...
```

## Options de configuration

### name

Le titre affiche en haut de l'inventaire.

```yaml
name: "&6&lMon Menu Serveur"
```

**Fonctionnalites :**
- Supporte les codes couleur (`&6`, `&#FF5500`)
- Supporte MiniMessage (si active)
- Supporte les placeholders (`%player%`, `%page%`)
- Maximum 32 caracteres (limitation Minecraft)

**Placeholders de pagination :**
```yaml
name: "&6Boutique &7(Page %page%/%max-page%)"
```

---

### size

Le nombre d'emplacements dans l'inventaire. Doit etre un multiple de 9.

| Taille | Lignes | Description |
|--------|--------|-------------|
| 9 | 1 | Une seule ligne |
| 18 | 2 | Deux lignes |
| 27 | 3 | Trois lignes (petit coffre) |
| 36 | 4 | Quatre lignes |
| 45 | 5 | Cinq lignes |
| 54 | 6 | Six lignes (double coffre) |

```yaml
size: 54
```

---

### enable

Activer ou desactiver cet inventaire. Les inventaires desactives ne peuvent pas etre ouverts.

```yaml
enable: true
```

C'est utile pour desactiver temporairement un inventaire sans supprimer le fichier.

---

### updateInterval

Rafraichir automatiquement l'inventaire a intervalle regulier (en ticks).

```yaml
update-interval: 20  # Rafraichir chaque seconde (20 ticks)
```

:::info
20 ticks = 1 seconde. Utilisez ceci pour les inventaires avec des placeholders dynamiques necessitant des mises a jour frequentes.
:::

---

### clearInventory

Vider l'inventaire du joueur pendant que le menu est ouvert et le restaurer a la fermeture.

```yaml
clearInventory: true
```

**Cas d'utilisation :**
- Packs de textures personnalises qui recouvrent tout l'ecran
- Empecher l'interaction d'items dans le menu

---

### fillItem

Definir un item pour remplir tous les emplacements vides.

```yaml
fillItem:
  material: BLACK_STAINED_GLASS_PANE
  name: "&8"
```

Cela remplit automatiquement tout emplacement non occupe par un bouton.

---

### patterns

Appliquer des patterns reutilisables a cet inventaire.

```yaml
patterns:
  - "navigation_bar"
  - "border_pattern"
```

Les patterns doivent etre definis dans le dossier `plugins/zMenu/patterns/`. Voir [Patterns](../patterns) pour les details.

---

### matrix

Definir visuellement la disposition de l'inventaire en utilisant des caracteres.

```yaml
matrix:
  - "AAAAAAAAA"
  - "A       A"
  - "A   B   A"
  - "A       A"
  - "AAAAAAAAA"

items:
  A:
    item:
      material: BLACK_STAINED_GLASS_PANE
      name: "&8"
  B:
    item:
      material: DIAMOND
      name: "&bItem central"
```

Chaque caractere represente un item. Les espaces sont des emplacements vides.

---

### items

Les boutons dans votre inventaire. C'est ici que vous definissez tous les elements cliquables.

```yaml
items:
  mon-bouton:
    slot: 0
    item:
      material: DIAMOND
      name: "&bDiamant"
    actions:
      - type: message
        messages:
          - "&aVous avez clique sur le diamant !"

  autre-bouton:
    slot: 8
    item:
      material: EMERALD
      name: "&aEmeraude"
```

Voir [Configuration des boutons](../buttons/button) pour la documentation complete des boutons.

---

### view-requirement

Exigences qui doivent etre remplies pour ouvrir cet inventaire.

```yaml
view-requirement:
  requirements:
    - type: permission
      permission: "monserveur.vip"
      deny:
        - type: message
          messages:
            - "&cVous avez besoin du VIP pour acceder a ce menu !"
```

Si les exigences ne sont pas remplies, l'inventaire ne s'ouvrira pas et les actions de refus s'executeront.

---

### open-requirement

Nom alternatif pour view-requirement (meme fonctionnalite).

```yaml
open-requirement:
  requirements:
    - type: permission
      permission: "monserveur.premium"
```

---

### openWithItem

Definir un item qui ouvre cet inventaire lorsqu'il est tenu et clique.

```yaml
openWithItem:
  item:
    material: COMPASS
    name: "&6&lMenu"
    lore:
      - "&7Clic droit pour ouvrir"
  actions:
    - RIGHT_CLICK
    - RIGHT_CLICK_BLOCK
  type: full  # full, contains ou starts_with
```

**Types d'actions :**
- `RIGHT_CLICK` - Clic droit dans l'air
- `LEFT_CLICK` - Clic gauche dans l'air
- `RIGHT_CLICK_BLOCK` - Clic droit sur un bloc
- `LEFT_CLICK_BLOCK` - Clic gauche sur un bloc

**Options de type :**
- `full` - L'item doit correspondre exactement
- `contains` - Le nom de l'item doit contenir le nom specifie
- `starts_with` - Le nom de l'item doit commencer par le nom specifie

Donnez l'item aux joueurs avec :
```
/zm giveopenitem <inventaire> <joueur>
```

---

### openActions

Actions a executer lorsque l'inventaire s'ouvre.

```yaml
openActions:
  - type: sound
    sound: ENTITY_EXPERIENCE_ORB_PICKUP
  - type: message
    messages:
      - "&aBienvenue dans le menu !"
```

---

### closeActions

Actions a executer lorsque l'inventaire se ferme.

```yaml
closeActions:
  - type: message
    messages:
      - "&7Merci de votre visite !"
```

---

### local-placeholders

Definir des placeholders specifiques a l'inventaire.

```yaml
local-placeholders:
  server-ip: "play.monserveur.com"
  discord: "discord.gg/monserveur"

items:
  info:
    item:
      lore:
        - "&7IP : &f%server-ip%"
        - "&7Discord : &f%discord%"
```

---

## Exemple complet

```yaml
name: "&6&lMenu Serveur &7(&f%page%&7/&f%maxPage%&7)"
size: 54
enable: true
update-interval: 40

fillItem:
  material: GRAY_STAINED_GLASS_PANE
  name: "&8"

patterns:
  - "navigation"

view-requirement:
  requirements:
    - type: permission
      permission: "server.menu.use"
      deny:
        - type: message
          messages:
            - "&cVous n'avez pas la permission d'utiliser ce menu !"

openActions:
  - type: sound
    sound: BLOCK_CHEST_OPEN
    pitch: 1.2

closeActions:
  - type: sound
    sound: BLOCK_CHEST_CLOSE

local-placeholders:
  menu-version: "1.0"

items:
  titre:
    slot: 4
    item:
      material: NETHER_STAR
      name: "&6&lMenu Serveur"
      lore:
        - "&8Version %menu-version%"
        - ""
        - "&7Bienvenue, &f%player%&7 !"
        - ""
        - "&7Selectionnez une option ci-dessous."

  teleports:
    slot: 20
    item:
      material: ENDER_PEARL
      name: "&b&lTeleportations"
      lore:
        - "&7Acceder aux options de teleportation"
    actions:
      - type: inventory
        inventory: "teleports_menu"

  shop:
    slot: 22
    item:
      material: GOLD_INGOT
      name: "&e&lBoutique"
      lore:
        - "&7Acheter et vendre des items"
    actions:
      - type: inventory
        inventory: "shop_menu"

  settings:
    slot: 24
    item:
      material: COMPARATOR
      name: "&c&lParametres"
      lore:
        - "&7Configurer vos preferences"
    actions:
      - type: inventory
        inventory: "settings_menu"

  fermer:
    slot: 49
    item:
      material: BARRIER
      name: "&c&lFermer"
      lore:
        - "&7Fermer ce menu"
    actions:
      - type: close
```

## Inventaires multi-pages

zMenu cree automatiquement la pagination lorsque les boutons ont plusieurs emplacements ou pages definis :

```yaml
items:
  shop-item:
    slots:
      - 10-16
      - 19-25
      - 28-34
    item:
      # Cela creera plusieurs pages s'il y a plus d'items que d'emplacements
```

Utilisez les types de boutons `NEXT` et `PREVIOUS` pour la navigation. Voir [Types de boutons](../buttons/types/next) pour les details.

## Bonnes pratiques

1. **Organisez vos inventaires** dans des sous-dossiers par categorie
2. **Utilisez des patterns** pour les elements repetes comme les bordures
3. **Utilisez des placeholders locaux** pour les valeurs utilisees plusieurs fois
4. **Testez avec `/zm reload inventory <nom>`** pour une iteration rapide
5. **Utilisez des noms de boutons significatifs** pour une maintenance plus facile
6. **Gardez des tailles d'inventaire appropriees** - n'utilisez pas 54 emplacements si vous n'avez besoin que de 27

## Prochaines etapes

- Apprenez a [Creer un inventaire](./create-inventory) etape par etape
- Configurez les [Boutons](../buttons/button) pour votre inventaire
- Ajoutez des [Actions](../buttons/actions) pour rendre les boutons interactifs
