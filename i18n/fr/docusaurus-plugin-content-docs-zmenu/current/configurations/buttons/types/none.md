---
sidebar_position: 1
title: Bouton NONE
description: Le type de bouton par defaut sans comportement special
---

# Type de bouton NONE

Le type `NONE` est le type de bouton par defaut. Il affiche un item et execute des actions lorsqu'il est clique, sans comportement special integre.

## Utilisation

```yaml
items:
  my-button:
    type: NONE  # Optionnel - NONE est la valeur par defaut
    slot: 13
    item:
      material: DIAMOND
      name: "&b&lMon Bouton"
    actions:
      - type: message
        messages:
          - "&aVous avez clique sur le bouton !"
```

Puisque `NONE` est la valeur par defaut, vous pouvez omettre la propriete `type` :

```yaml
items:
  my-button:
    slot: 13
    item:
      material: DIAMOND
      name: "&b&lMon Bouton"
```

## Quand l'utiliser

Utilisez les boutons `NONE` pour :
- Afficher des informations
- Executer des commandes
- Ouvrir des liens
- Envoyer des messages
- Jouer des sons
- Toute action personnalisee

## Exemples

### Affichage d'informations

```yaml
items:
  info:
    slot: 4
    item:
      material: BOOK
      name: "&6&lInformations du serveur"
      lore:
        - "&7Bienvenue sur notre serveur !"
        - ""
        - "&7Joueurs en ligne : &a%server_online%"
        - "&7Votre rang : &e%luckperms_primary_group_name%"
```

### Executeur de commande

```yaml
items:
  spawn:
    slot: 11
    item:
      material: RED_BED
      name: "&c&lSpawn"
      lore:
        - "&7Teleportation au spawn"
    actions:
      - type: close
      - type: player-command
        commands:
          - "spawn"
```

### Bouton lien

```yaml
items:
  website:
    slot: 15
    open-link: "https://myserver.com"
    item:
      material: PAPER
      name: "&a&lSite Web"
      lore:
        - "&7Cliquez pour visiter notre site"
```

### Bouton interactif avec retour

```yaml
items:
  reward:
    slot: 22
    item:
      material: CHEST
      name: "&e&lRecompense quotidienne"
      lore:
        - "&7Cliquez pour recuperer votre recompense quotidienne !"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%dailyreward_claimed%"
          compare: "equals_string"
          target: "false"
          deny:
            - type: message
              messages:
                - "&cVous avez deja recupere la recompense d'aujourd'hui !"
      success:
        - type: console-command
          commands:
            - "dailyreward claim %player%"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
        - type: message
          messages:
            - "&aRecompense recuperee !"
```

## Proprietes

Toutes les proprietes standard des boutons fonctionnent avec les boutons `NONE` :

| Propriete | Description |
|-----------|-------------|
| `slot` / `slots` | Position(s) dans l'inventaire |
| `item` | Apparence visuelle |
| `actions` | Actions au clic |
| `click-requirement` | Conditions pour cliquer |
| `view-requirement` | Conditions pour voir |
| `sound` | Son au clic |
| `messages` | Messages au clic |
| `close-inventory` | Fermer apres le clic |
| `refresh-on-click` | Rafraichir l'inventaire |
| `update-on-click` | Mettre a jour le bouton |
| `is-permanent` | Afficher sur toutes les pages |
| `page` | Afficher sur une page specifique |
| `else` | Alternative quand masque |

## Prochaines etapes

- Decouvrez les boutons [INVENTORY](./inventory) pour ouvrir d'autres menus
- Explorez les boutons [BACK](./back) pour la navigation
- Consultez toutes les [Actions](../actions) disponibles
