---
sidebar_position: 9
title: Donnees joueur
description: Stocker et recuperer des donnees specifiques aux joueurs
---

# Donnees joueur

zMenu inclut un systeme de donnees joueur integre qui vous permet de stocker et recuperer des valeurs specifiques a chaque joueur. C'est parfait pour suivre la progression, creer des bascules, stocker des statistiques et plus encore.

## Comment ca fonctionne

Les donnees joueur sont stockees dans une base de donnees (SQLite par defaut, MySQL/MariaDB en option) et persistent entre les redemarrages du serveur. Chaque joueur a son propre ensemble de paires cle-valeur.

## Acceder aux donnees joueur

### Placeholder

Utilisez le placeholder `%zmenu_player_value_<cle>%` :

```yaml
item:
  name: "&6Pieces : %zmenu_player_value_coins%"
  lore:
    - "&7Kills : %zmenu_player_value_kills%"
    - "&7Morts : %zmenu_player_value_deaths%"
```

### Commandes

```bash
# Definir une valeur
/zm players set <joueur> <cle> <valeur>

# Ajouter a une valeur (numerique)
/zm players add <joueur> <cle> <valeur>

# Obtenir une valeur
/zm players get <joueur> <cle>

# Supprimer une cle
/zm players remove <joueur> <cle>

# Supprimer une cle de TOUS les joueurs
/zm players removeall <cle>

# Lister toutes les cles pour un joueur
/zm players keys <joueur>
```

## Modifier les donnees avec des actions

### L'action Data

```yaml
actions:
  - type: data
    action: SET      # SET, ADD, SUBTRACT, MULTIPLY, DIVIDE, REMOVE
    key: "coins"
    value: "100"
    math: true       # Activer les expressions mathematiques
```

### Actions disponibles

| Action | Description | Exemple |
|--------|-------------|---------|
| `SET` | Definir a une valeur specifique | `value: "100"` |
| `ADD` | Ajouter a la valeur actuelle | `value: "50"` |
| `SUBTRACT` | Soustraire de la valeur actuelle | `value: "25"` |
| `MULTIPLY` | Multiplier la valeur actuelle | `value: "2"` |
| `DIVIDE` | Diviser la valeur actuelle | `value: "2"` |
| `REMOVE` | Supprimer entierement la cle | - |

### Expressions mathematiques

Activez les maths avec `math: true` :

```yaml
actions:
  - type: data
    action: SET
    key: "total"
    value: "%zmenu_player_value_base%*1.5+100"
    math: true
```

## Exemples

### Systeme de pieces/monnaie

```yaml
# Afficher les pieces
items:
  coin-display:
    slot: 4
    item:
      material: GOLD_NUGGET
      name: "&6&lVos Pieces"
      lore:
        - "&7Solde : &e%zmenu_player_value_coins%"

  # Bouton ajouter des pieces
  add-coins:
    slot: 11
    item:
      material: GOLD_INGOT
      name: "&a&l+100 Pieces"
    actions:
      - type: data
        action: ADD
        key: "coins"
        value: "100"
      - type: message
        messages:
          - "&a+100 pieces !"
      - type: refresh

  # Depenser des pieces
  spend-coins:
    slot: 15
    item:
      material: DIAMOND
      name: "&b&lAcheter Diamant"
      lore:
        - "&7Cout : &e50 pieces"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_value_coins%"
          compare: ">="
          number: 50
          deny:
            - type: message
              messages:
                - "&cVous avez besoin de 50 pieces !"
      success:
        - type: data
          action: SUBTRACT
          key: "coins"
          value: "50"
        - type: console-command
          commands:
            - "give %player% diamond 1"
        - type: refresh
```

### Parametre a bascule

```yaml
items:
  toggle-notifications:
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

    default:
      item:
        material: LIME_DYE
        name: "&a&lNotifications : ON"
      actions:
        - type: data
          action: SET
          key: "notifications"
          value: "false"
        - type: refresh
```

### Systeme de recompense quotidienne

```yaml
items:
  daily-reward:
    slot: 22
    item:
      material: CHEST
      name: "&e&lRecompense quotidienne"
      lore:
        - "&7Reclamez votre recompense quotidienne !"
        - ""
        - "&7Derniere reclamation : &f%zmenu_player_value_last_daily%"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_math_%zmenu_time_unix_timestamp%-%zmenu_player_value_last_daily%%"
          compare: ">="
          number: 86400  # 24 heures en secondes
          deny:
            - type: message
              messages:
                - "&cVous avez deja reclame la recompense d'aujourd'hui !"
      success:
        - type: data
          action: SET
          key: "last_daily"
          value: "%zmenu_time_unix_timestamp%"
        - type: console-command
          commands:
            - "give %player% diamond 5"
        - type: data
          action: ADD
          key: "daily_streak"
          value: "1"
        - type: message
          messages:
            - "&aRecompense quotidienne reclamee !"
            - "&7Serie : &e%zmenu_player_value_daily_streak%"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
```

### Suivi de progression

```yaml
items:
  quest-progress:
    slot: 13
    type: SWITCH
    placeholder: "%zmenu_player_value_quest_1_stage%"
    buttons:
      "0":
        item:
          material: PAPER
          name: "&7&lQuete : Non commencee"
          lore:
            - "&7Cliquez pour commencer"
        actions:
          - type: data
            action: SET
            key: "quest_1_stage"
            value: "1"
          - type: message
            messages:
              - "&aQuete commencee !"
          - type: refresh

      "1":
        item:
          material: WRITABLE_BOOK
          name: "&e&lQuete : En cours"
          lore:
            - "&7Etape 1 : Collecter 10 bois"

      "2":
        item:
          material: WRITABLE_BOOK
          name: "&e&lQuete : En cours"
          lore:
            - "&7Etape 2 : Fabriquer une epee"

      "complete":
        item:
          material: ENCHANTED_BOOK
          name: "&a&lQuete : Terminee !"
          lore:
            - "&7Cliquez pour reclamer la recompense"
          glow: true
        actions:
          - type: console-command
            commands:
              - "give %player% emerald 10"
          - type: data
            action: SET
            key: "quest_1_stage"
            value: "claimed"
          - type: refresh

      "claimed":
        item:
          material: BOOK
          name: "&8&lQuete : Reclamee"
          lore:
            - "&7Vous avez termine cette quete"

    default:
      item:
        material: PAPER
        name: "&7&lQuete : Non commencee"
```

### Compteur de kills

```yaml
items:
  stats-display:
    slot: 4
    item:
      material: PLAYER_HEAD
      playerHead: "%player%"
      name: "&a&lStats de %player%"
      lore:
        - "&8&m───────────────"
        - ""
        - "&7Kills : &a%zmenu_player_value_kills%"
        - "&7Morts : &c%zmenu_player_value_deaths%"
        - "&7Ratio K/D : &e%zmenu_math_%zmenu_player_value_kills%/%zmenu_player_value_deaths%%"
        - ""
        - "&8&m───────────────"
```

## Configuration de la base de donnees

Configurez le stockage dans `config.yml` :

```yaml
# Type de stockage : SQLITE, MYSQL, MARIADB ou NONE
storage-type: SQLITE

# Configuration de la base de donnees (pour MySQL/MariaDB)
database-configuration:
  table-prefix: "zmenu_"
  host: "localhost"
  port: 3306
  user: "username"
  password: "password"
  database: "zmenu"
```

### Convertir JSON en SQL

Si vous utilisiez precedemment le stockage JSON :

```
/zm players convert
```

Cela migre les donnees des fichiers JSON vers la base de donnees configuree.

## Valeurs par defaut

Si une cle n'existe pas, le placeholder retourne une chaine vide. Utilisez des valeurs par defaut :

```yaml
# Dans les exigences, verifiez l'existence
- type: placeholder
  value: "%zmenu_player_value_coins%"
  compare: ">="
  number: 0  # Fonctionne meme si la cle n'existe pas
```

Ou definissez des valeurs par defaut au premier acces :

```yaml
items:
  initialize:
    slot: 0
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_value_initialized%"
          compare: "!="
          target: "true"
    item:
      material: AIR
    actions:
      - type: data
        action: SET
        key: "coins"
        value: "0"
      - type: data
        action: SET
        key: "initialized"
        value: "true"
      - type: refresh
```

## Bonnes pratiques

1. **Utilisez des cles descriptives** : `daily_reward_claimed` et non `drc`
2. **Initialisez les valeurs par defaut** : Definissez les valeurs initiales pour les nouveaux joueurs
3. **Utilisez les maths avec precaution** : Assurez-vous que les valeurs sont numeriques pour les operations mathematiques
4. **Nettoyez les anciennes donnees** : Utilisez `removeall` pour les cles inutilisees
5. **Sauvegardez votre base de donnees** : Surtout avant les changements majeurs
6. **Documentez vos cles** : Gardez une trace des donnees que vous stockez

## Conventions de nommage des cles

```
# Bons exemples
player_coins
quest_tutorial_complete
settings_notifications
stats_kills
daily_last_claim

# Mauvais exemples
c        # Trop court
data1    # Pas descriptif
x        # Sans signification
```

## Prochaines etapes

- Creez des [Boutons a bascule](./buttons/types/switch) avec les donnees joueur
- Configurez les [Commandes personnalisees](./custom-commands)
- Configurez les parametres de base de donnees dans [config.yml](./config-yml)
