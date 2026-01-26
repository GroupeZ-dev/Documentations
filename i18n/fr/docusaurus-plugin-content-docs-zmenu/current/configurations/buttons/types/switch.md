---
sidebar_position: 9
title: Bouton SWITCH
description: Bouton qui affiche differents items selon des conditions
---

# Type de bouton SWITCH

Le type de bouton `SWITCH` affiche differents items en fonction d'une valeur de placeholder. Cela vous permet de creer des boutons dynamiques qui changent d'apparence selon les donnees du joueur ou d'autres conditions.

## Utilisation

```yaml
items:
  toggle:
    type: SWITCH
    slot: 13
    placeholder: "%zmenu_player_value_notifications%"
    buttons:
      "true":
        item:
          material: LIME_DYE
          name: "&a&lNotifications : ON"
          lore:
            - "&7Cliquez pour desactiver"
        actions:
          - type: data
            action: SET
            key: "notifications"
            value: "false"
          - type: refresh

      "false":
        item:
          material: GRAY_DYE
          name: "&7&lNotifications : OFF"
          lore:
            - "&7Cliquez pour activer"
        actions:
          - type: data
            action: SET
            key: "notifications"
            value: "true"
          - type: refresh
```

## Proprietes

### placeholder

**Requis.** Le placeholder a evaluer pour determiner quel bouton afficher.

```yaml
placeholder: "%zmenu_player_value_setting%"
```

---

### buttons

**Requis.** Une map de valeurs vers des configurations de boutons. La cle est le resultat du placeholder, et la valeur est la configuration du bouton a afficher.

```yaml
buttons:
  "value1":
    item:
      material: DIAMOND
    actions:
      - type: message
        messages: ["La valeur est 1"]
  "value2":
    item:
      material: EMERALD
    actions:
      - type: message
        messages: ["La valeur est 2"]
```

---

### default

Bouton a afficher quand la valeur du placeholder ne correspond a aucun bouton defini.

```yaml
default:
  item:
    material: BARRIER
    name: "&cEtat inconnu"
```

## Exemples

### Parametre a bascule

```yaml
items:
  toggle-pvp:
    type: SWITCH
    slot: 13
    placeholder: "%zmenu_player_value_pvp_enabled%"
    buttons:
      "true":
        item:
          material: DIAMOND_SWORD
          name: "&c&lPvP : ACTIVE"
          lore:
            - "&7Vous pouvez etre attaque par les joueurs"
            - ""
            - "&e▸ Cliquez pour desactiver"
          glow: true
        actions:
          - type: data
            action: SET
            key: "pvp_enabled"
            value: "false"
          - type: message
            messages:
              - "&aLe PvP a ete desactive !"
          - type: sound
            sound: BLOCK_NOTE_BLOCK_PLING
          - type: refresh

      "false":
        item:
          material: SHIELD
          name: "&a&lPvP : DESACTIVE"
          lore:
            - "&7Vous etes protege des joueurs"
            - ""
            - "&e▸ Cliquez pour activer"
        actions:
          - type: data
            action: SET
            key: "pvp_enabled"
            value: "true"
          - type: message
            messages:
              - "&cLe PvP a ete active !"
          - type: sound
            sound: ENTITY_ENDER_DRAGON_GROWL
          - type: refresh

    default:
      item:
        material: SHIELD
        name: "&a&lPvP : DESACTIVE"
      actions:
        - type: data
          action: SET
          key: "pvp_enabled"
          value: "true"
        - type: refresh
```

### Bouton multi-etats

```yaml
items:
  difficulty:
    type: SWITCH
    slot: 22
    placeholder: "%zmenu_player_value_difficulty%"
    buttons:
      "easy":
        item:
          material: LIME_WOOL
          name: "&a&lDifficulte : FACILE"
          lore:
            - "&7Actuel : Mode facile"
            - ""
            - "&e▸ Cliquez pour passer en Normal"
        actions:
          - type: data
            action: SET
            key: "difficulty"
            value: "normal"
          - type: refresh

      "normal":
        item:
          material: YELLOW_WOOL
          name: "&e&lDifficulte : NORMAL"
          lore:
            - "&7Actuel : Mode normal"
            - ""
            - "&e▸ Cliquez pour passer en Difficile"
        actions:
          - type: data
            action: SET
            key: "difficulty"
            value: "hard"
          - type: refresh

      "hard":
        item:
          material: RED_WOOL
          name: "&c&lDifficulte : DIFFICILE"
          lore:
            - "&7Actuel : Mode difficile"
            - ""
            - "&e▸ Cliquez pour passer en Facile"
        actions:
          - type: data
            action: SET
            key: "difficulty"
            value: "easy"
          - type: refresh

    default:
      item:
        material: YELLOW_WOOL
        name: "&e&lDifficulte : NORMAL"
      actions:
        - type: data
          action: SET
          key: "difficulty"
          value: "hard"
        - type: refresh
```

### Affichage base sur le rang

```yaml
items:
  rank-display:
    type: SWITCH
    slot: 4
    placeholder: "%luckperms_primary_group_name%"
    buttons:
      "default":
        item:
          material: COAL
          name: "&7&lMembre"
          lore:
            - "&7Votre rang actuel"

      "vip":
        item:
          material: IRON_INGOT
          name: "&a&lVIP"
          lore:
            - "&7Votre rang actuel"
          glow: true

      "mvp":
        item:
          material: GOLD_INGOT
          name: "&6&lMVP"
          lore:
            - "&7Votre rang actuel"
          glow: true

      "admin":
        item:
          material: DIAMOND
          name: "&b&lAdmin"
          lore:
            - "&7Votre rang actuel"
          glow: true

    default:
      item:
        material: COAL
        name: "&7&lMembre"
```

### Indicateur de progression

```yaml
items:
  quest-status:
    type: SWITCH
    slot: 31
    placeholder: "%zmenu_player_value_quest_stage%"
    buttons:
      "0":
        item:
          material: PAPER
          name: "&7&lQuete : Non commencee"
          lore:
            - "&7Commencez votre aventure !"
            - ""
            - "&e▸ Cliquez pour commencer"
        actions:
          - type: data
            action: SET
            key: "quest_stage"
            value: "1"
          - type: message
            messages:
              - "&aQuete commencee ! Parlez a l'ancien du village."
          - type: refresh

      "1":
        item:
          material: WRITABLE_BOOK
          name: "&e&lQuete : En cours"
          lore:
            - "&7Parlez a l'ancien du village"
            - ""
            - "&7Progression : &e1/3"

      "2":
        item:
          material: WRITABLE_BOOK
          name: "&e&lQuete : En cours"
          lore:
            - "&7Collectez 10 bles"
            - ""
            - "&7Progression : &e2/3"

      "3":
        item:
          material: ENCHANTED_BOOK
          name: "&a&lQuete : Terminee !"
          lore:
            - "&7Revenez pour votre recompense"
            - ""
            - "&e▸ Cliquez pour recuperer"
          glow: true
        actions:
          - type: console-command
            commands:
              - "give %player% diamond 5"
          - type: data
            action: SET
            key: "quest_stage"
            value: "done"
          - type: message
            messages:
              - "&aVous avez recu 5 diamants !"
          - type: refresh

      "done":
        item:
          material: BOOK
          name: "&8&lQuete : Completee"
          lore:
            - "&7Vous avez complete cette quete"

    default:
      item:
        material: PAPER
        name: "&7&lQuete : Non commencee"
```

## Notes importantes

1. **Utilisez l'action `refresh`** - Incluez toujours une action refresh lors du changement d'etat
2. **Mettez les valeurs chaines entre guillemets** - Les valeurs comme `"true"` et `"false"` necessitent des guillemets
3. **Fournissez une valeur par defaut** - Definissez toujours un default pour les valeurs inattendues
4. **Integration des donnees joueur** - Fonctionne tres bien avec les placeholders `%zmenu_player_value_*%`

## Cas d'utilisation courants

- Parametres a bascule (on/off)
- Selecteurs multi-options
- Indicateurs de progression
- Affichages bases sur le rang
- Machines a etats
- Recompenses conditionnelles

## Bonnes pratiques

1. **Rafraichissez toujours** apres les changements d'etat
2. **Utilisez des cles descriptives** pour les donnees joueur
3. **Fournissez un retour visuel** (sons, messages)
4. **Incluez un etat par defaut** pour les nouveaux joueurs
5. **Utilisez une distinction visuelle claire** entre les etats

## Fonctionnalites associees

- [Donnees joueur](../../player-data) - Stocker des valeurs specifiques au joueur
- [Placeholders](../../placeholders) - Valeurs dynamiques
- [Actions](../actions) - Executer au clic

## Prochaines etapes

- Decouvrez les [Donnees joueur](../../player-data) pour stocker les etats
- Consultez toutes les [Actions](../actions) disponibles
- Voir les autres [types de boutons](./none)
