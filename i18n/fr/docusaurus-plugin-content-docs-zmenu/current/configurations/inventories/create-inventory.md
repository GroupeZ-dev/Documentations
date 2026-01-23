---
sidebar_position: 2
title: Creer un inventaire
description: Guide etape par etape pour creer votre premier inventaire zMenu
---

# Creer un inventaire

Ce guide vous accompagnera dans la creation de votre premier inventaire zMenu a partir de zero.

## Etape 1 : Creer le fichier

Creez un nouveau fichier dans le dossier `plugins/zMenu/inventories/`. Nommez-le de maniere descriptive comme `mon_premier_menu.yml`.

```
plugins/zMenu/inventories/mon_premier_menu.yml
```

:::tip Convention de nommage
Utilisez des lettres minuscules, des chiffres et des underscores pour les noms de fichiers. Evitez les espaces et les caracteres speciaux.
:::

## Etape 2 : Definir les proprietes de base

Commencez avec les proprietes essentielles de l'inventaire :

```yaml
# Le titre affiche en haut de l'inventaire
name: "&6&lMon Premier Menu"

# La taille de l'inventaire (doit etre 9, 18, 27, 36, 45 ou 54)
size: 27

# Si cet inventaire est active
enable: true
```

## Etape 3 : Ajouter un item de remplissage (Optionnel)

Remplissez les emplacements vides avec un item decoratif :

```yaml
name: "&6&lMon Premier Menu"
size: 27
enable: true

fillItem:
  material: GRAY_STAINED_GLASS_PANE
  name: "&8"
```

Cela rend votre inventaire plus propre en remplissant les espaces vides.

## Etape 4 : Ajouter votre premier bouton

Maintenant ajoutons un bouton interactif. Les boutons sont definis dans la section `items` :

```yaml
name: "&6&lMon Premier Menu"
size: 27
enable: true

fillItem:
  material: GRAY_STAINED_GLASS_PANE
  name: "&8"

items:
  bouton-bienvenue:
    slot: 13
    item:
      material: DIAMOND
      name: "&b&lBienvenue !"
      lore:
        - "&7Cliquez-moi pour voir un message"
    actions:
      - type: message
        messages:
          - "&aBonjour, %player% !"
          - "&7Merci d'utiliser zMenu !"
```

Analysons ce que fait chaque partie :

| Propriete | Description |
|-----------|-------------|
| `bouton-bienvenue` | Un nom unique pour ce bouton |
| `slot: 13` | Position dans l'inventaire (centre de la ligne 2) |
| `item` | L'apparence visuelle du bouton |
| `material` | Le type d'item Minecraft |
| `name` | Le nom d'affichage de l'item |
| `lore` | Lignes de description sous le nom |
| `actions` | Ce qui se passe au clic |

## Etape 5 : Tester votre inventaire

1. Sauvegardez le fichier
2. Executez `/zm reload inventory mon_premier_menu`
3. Ouvrez-le avec `/zm open mon_premier_menu`

Vous devriez voir un inventaire de 27 emplacements avec un diamant au centre !

## Etape 6 : Ajouter plus de boutons

Etendons le menu avec plus de fonctionnalites :

```yaml
name: "&6&lMon Premier Menu"
size: 27
enable: true

fillItem:
  material: GRAY_STAINED_GLASS_PANE
  name: "&8"

items:
  # Item de titre (non interactif)
  titre:
    slot: 4
    item:
      material: BOOK
      name: "&6&lGuide du serveur"
      lore:
        - "&7Bienvenue sur notre serveur !"
        - ""
        - "&7Selectionnez une option ci-dessous."

  # Teleportation au spawn
  spawn:
    slot: 11
    item:
      material: RED_BED
      name: "&c&lSpawn"
      lore:
        - "&7Se teleporter au point de spawn"
        - ""
        - "&eCliquez pour vous teleporter !"
    actions:
      - type: close
      - type: player-command
        commands:
          - "spawn"

  # Voir les infos joueur
  info:
    slot: 13
    item:
      material: PLAYER_HEAD
      playerHead: "%player%"
      name: "&a&l%player%"
      lore:
        - "&8&m─────────────"
        - ""
        - "&7Sante : &c%player_health%"
        - "&7Niveau : &a%player_level%"
        - ""
        - "&8&m─────────────"

  # Ouvrir la boutique
  shop:
    slot: 15
    item:
      material: GOLD_INGOT
      name: "&e&lBoutique"
      lore:
        - "&7Parcourir notre boutique"
        - ""
        - "&eCliquez pour ouvrir !"
    actions:
      - type: inventory
        inventory: "shop"

  # Bouton fermer
  fermer:
    slot: 22
    item:
      material: BARRIER
      name: "&c&lFermer"
      lore:
        - "&7Fermer ce menu"
    actions:
      - type: close
```

## Etape 7 : Ajouter des effets sonores

Rendez le menu plus interactif avec des sons :

```yaml
items:
  spawn:
    slot: 11
    item:
      material: RED_BED
      name: "&c&lSpawn"
    sound: ENTITY_ENDERMAN_TELEPORT
    actions:
      - type: close
      - type: player-command
        commands:
          - "spawn"
```

Ou ajoutez un son dans les actions :

```yaml
actions:
  - type: sound
    sound: UI_BUTTON_CLICK
    pitch: 1.2
    volume: 0.5
  - type: player-command
    commands:
      - "spawn"
```

## Etape 8 : Ajouter des exigences (Optionnel)

Restreignez qui peut cliquer sur un bouton :

```yaml
items:
  zone-vip:
    slot: 16
    item:
      material: DIAMOND_BLOCK
      name: "&b&lZone VIP"
      lore:
        - "&7Teleportation VIP exclusive"
    click-requirement:
      requirements:
        - type: permission
          permission: "server.vip"
          deny:
            - type: message
              messages:
                - "&cVous avez besoin du rang VIP pour utiliser ceci !"
            - type: sound
              sound: ENTITY_VILLAGER_NO
      success:
        - type: player-command
          commands:
            - "warp vip"
```

## Comprendre les numeros d'emplacements

Les emplacements sont numerotes de 0 a (taille - 1), en commencant par le coin superieur gauche :

```
Ligne 1 :  0  1  2  3  4  5  6  7  8
Ligne 2 :  9 10 11 12 13 14 15 16 17
Ligne 3 : 18 19 20 21 22 23 24 25 26
Ligne 4 : 27 28 29 30 31 32 33 34 35
Ligne 5 : 36 37 38 39 40 41 42 43 44
Ligne 6 : 45 46 47 48 49 50 51 52 53
```

Pour un inventaire de 27 emplacements (3 lignes), les emplacements 0-26 sont disponibles.

## Utiliser plusieurs emplacements

Un bouton peut occuper plusieurs emplacements :

```yaml
items:
  gros-bouton:
    slots:
      - 11
      - 12
      - 13
      - 20
      - 21
      - 22
    item:
      material: EMERALD_BLOCK
      name: "&a&lGros Bouton"
```

Ou utilisez une plage :

```yaml
items:
  bouton-ligne:
    slots:
      - 10-16  # Emplacements 10 a 16
    item:
      material: GOLD_BLOCK
      name: "&e&lLigne d'or"
```

## Exemple complet

Voici un menu complet et fonctionnel :

```yaml
name: "&6&lMenu Serveur"
size: 45
enable: true

fillItem:
  material: BLACK_STAINED_GLASS_PANE
  name: "&8"

openActions:
  - type: sound
    sound: BLOCK_CHEST_OPEN
    pitch: 1.0

items:
  # Bordure decorative superieure
  bordure-haut:
    slots:
      - 0-8
    item:
      material: BLUE_STAINED_GLASS_PANE
      name: "&8"

  # Titre
  titre:
    slot: 4
    item:
      material: NETHER_STAR
      name: "&6&l✦ Menu Serveur ✦"
      lore:
        - ""
        - "&7Bienvenue, &f%player%"
        - ""
        - "&7Choisissez une option ci-dessous"
      glow: true

  # Teleportation spawn
  spawn:
    slot: 19
    item:
      material: RED_BED
      name: "&c&lSpawn"
      lore:
        - "&7Retourner au spawn"
        - ""
        - "&e▸ Cliquez pour vous teleporter"
    sound: UI_BUTTON_CLICK
    actions:
      - type: close
      - type: player-command
        commands:
          - "spawn"
      - type: message
        messages:
          - "&aTeleportation au spawn..."

  # Menu warps
  warps:
    slot: 21
    item:
      material: ENDER_PEARL
      name: "&5&lWarps"
      lore:
        - "&7Parcourir les emplacements warp"
        - ""
        - "&e▸ Cliquez pour ouvrir"
    sound: UI_BUTTON_CLICK
    actions:
      - type: inventory
        inventory: "warps"

  # Info joueur
  profil:
    slot: 23
    item:
      material: PLAYER_HEAD
      playerHead: "%player%"
      name: "&a&lVotre Profil"
      lore:
        - "&8&m────────────────"
        - ""
        - "&7Nom : &f%player%"
        - "&7Solde : &6$%vault_eco_balance%"
        - "&7Temps de jeu : &e%zmenu_statistic_time_played%"
        - ""
        - "&8&m────────────────"

  # Parametres
  parametres:
    slot: 25
    item:
      material: COMPARATOR
      name: "&e&lParametres"
      lore:
        - "&7Configurer vos preferences"
        - ""
        - "&e▸ Cliquez pour ouvrir"
    sound: UI_BUTTON_CLICK
    actions:
      - type: inventory
        inventory: "settings"

  # Bordure inferieure
  bordure-bas:
    slots:
      - 36-44
    item:
      material: BLUE_STAINED_GLASS_PANE
      name: "&8"

  # Bouton fermer
  fermer:
    slot: 40
    item:
      material: BARRIER
      name: "&c&lFermer le menu"
      lore:
        - "&7Fermer ce menu"
    sound: UI_BUTTON_CLICK
    actions:
      - type: close
```

## Conseils pour un bon design de menu

1. **Utilisez un style coherent** - Gardez des couleurs et un formatage similaires dans tous vos menus
2. **Ajoutez des bordures visuelles** - Utilisez des vitres ou d'autres items pour encadrer votre contenu
3. **Fournissez des retours** - Utilisez des sons et des messages pour confirmer les actions
4. **Groupez les items lies** - Placez les options similaires pres les unes des autres
5. **Incluez la navigation** - Fournissez toujours un moyen de revenir en arriere ou de fermer
6. **Utilisez des icones claires** - Choisissez des materiaux qui representent visuellement leur fonction
7. **Gardez le lore concis** - Ne surchargez pas les boutons avec trop de texte

## Prochaines etapes

Maintenant que vous pouvez creer des inventaires basiques :

- Apprenez toutes les [Options de boutons](../buttons/button)
- Explorez les differents [Types de boutons](../buttons/types/none)
- Ajoutez des [Actions](../buttons/actions) complexes a vos boutons
- Creez des [Patterns](../patterns) pour les elements reutilisables
