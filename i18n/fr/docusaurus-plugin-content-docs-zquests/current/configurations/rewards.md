---
sidebar_position: 3
title: Recompenses
description: Configurez les recompenses pour la completion des quetes dans zQuests
---

# Recompenses

zQuests fournit un systeme de recompenses flexible qui vous permet de recompenser les joueurs quand ils completent des quetes. Vous pouvez utiliser toutes les actions zMenu comme recompenses, configurer des recompenses globales pour toutes les quetes, et creer des recompenses personnalisees qui se declenchent quand des combinaisons specifiques de quetes sont completees.

## Types de recompenses

### Recompenses specifiques a la quete

Definissez les recompenses directement dans la configuration de la quete :

```yaml
quests:
  - type: BLOCK_BREAK
    name: "casseur-pierre"
    display-name: "Casseur de Pierre"
    goal: 100
    actions:
      - material: STONE
    rewards:
      - type: message
        messages:
          - "&aQuete completee !"
      - type: console_command
        commands:
          - "give %player% diamond 5"
      - type: sound
        sound: ENTITY_PLAYER_LEVELUP
```

### Recompenses globales

Recompenses qui s'appliquent a **toutes** les completions de quetes. Definissez-les dans `config.yml` :

```yaml
global-rewards:
  - type: message
    messages:
      - "&aVous avez complete la quete &e%name% &a!"
      - "&7Objectif : &f%goal%"
```

**Placeholders disponibles :**
- `%name%` - Nom d'affichage de la quete
- `%description%` - Description de la quete
- `%goal%` - Objectif de la quete

### Recompenses personnalisees

Recompenses speciales declenchees quand un joueur complete une combinaison specifique de quetes. Definissez dans `config.yml` :

```yaml
custom-rewards:
  - quests:
      - "casseur-pierre-1"
      - "casseur-pierre-2"
      - "casseur-pierre-3"
    actions:
      - type: message
        messages:
          - "&6&lSUCCES DEBLOQUE !"
          - "&eVous avez complete toutes les quetes Casseur de Pierre !"
      - type: console_command
        commands:
          - "give %player% diamond_pickaxe 1"
```

### Recompenses avec permissions

Recompenses bonus donnees seulement si le joueur remplit certaines conditions :

```yaml
quests:
  - type: BLOCK_BREAK
    name: "quete-minage"
    goal: 500
    actions:
      - material: STONE
    rewards:
      - type: console_command
        commands:
          - "give %player% diamond 10"
    permissible-rewards:
      - requirements:
          - type: permission
            permission: rank.vip
        actions:
          - type: message
            messages:
              - "&6BONUS VIP : +10 diamants supplementaires !"
          - type: console_command
            commands:
              - "give %player% diamond 10"
      - requirements:
          - type: permission
            permission: rank.mvp
        actions:
          - type: message
            messages:
              - "&bBONUS MVP : +25 diamants supplementaires !"
          - type: console_command
            commands:
              - "give %player% diamond 25"
```

## Types d'actions disponibles

zQuests supporte toutes les actions zMenu. Voici les plus couramment utilisees :

### Message

Envoyez des messages au joueur :

```yaml
- type: message
  messages:
    - "&aPremiere ligne"
    - "&bDeuxieme ligne"
    - ""
    - "&7Ligne vide au-dessus pour l'espacement"
```

### Commande console

Executez des commandes depuis la console :

```yaml
- type: console_command
  commands:
    - "give %player% diamond 10"
    - "eco give %player% 1000"
    - "lp user %player% permission set quest.completed.%name%"
```

### Commande joueur

Executez des commandes en tant que joueur :

```yaml
- type: player_command
  commands:
    - "spawn"
    - "home"
```

### Son

Jouez des sons :

```yaml
- type: sound
  sound: ENTITY_PLAYER_LEVELUP
  pitch: 1.0
  volume: 1.0
```

### Titre

Affichez des titres :

```yaml
- type: title
  title: "&6Quete Complete !"
  subtitle: "&eVous avez gagne 10 diamants"
  fadeIn: 20
  stay: 60
  fadeOut: 20
```

### Barre d'action

Affichez des messages dans la barre d'action :

```yaml
- type: actionbar
  message: "&aQuete completee ! +10 diamants"
```

### Teleportation

Teleportez le joueur :

```yaml
- type: teleport
  location: "world,100,65,200,0,0"
```

### Donner un item

Donnez des items directement :

```yaml
- type: give_item
  item:
    material: DIAMOND_SWORD
    name: "&6Epee Recompense de Quete"
    lore:
      - "&7Une recompense pour votre travail"
    enchants:
      - SHARPNESS:5
      - UNBREAKING:3
```

### Fermer l'inventaire

Fermez l'inventaire du joueur :

```yaml
- type: close
```

### Ouvrir un inventaire

Ouvrez un inventaire zMenu :

```yaml
- type: inventory
  inventory: "menu_recompenses"
  plugin: "zMenu"
```

### Demarrer une autre quete

Chainez les quetes :

```yaml
- type: START_QUEST
  quest: "quete-minage-avancee"
```

## Ordre des recompenses

Quand une quete est completee, les recompenses sont executees dans cet ordre :

1. **Recompenses specifiques a la quete** - Definies dans la section `rewards` de la quete
2. **Recompenses globales** - Si `use-global-rewards: true` (par defaut)
3. **Recompenses avec permissions** - Si les conditions sont remplies
4. **Recompenses personnalisees** - Si toutes les quetes requises sont completees

## Desactiver les recompenses globales

Pour empecher les recompenses globales d'etre donnees pour une quete specifique :

```yaml
quests:
  - type: BLOCK_BREAK
    name: "quete-silencieuse"
    goal: 100
    use-global-rewards: false
    rewards:
      - type: message
        messages:
          - "&aCette quete a uniquement des recompenses personnalisees !"
```

## Exemple complet

Voici une configuration complete montrant tous les types de recompenses :

```yaml
# Dans config.yml
global-rewards:
  - type: message
    messages:
      - ""
      - "&8&m─────────────────────────"
      - "&a&lQUETE COMPLETEE"
      - "&f%name%"
      - "&8&m─────────────────────────"
      - ""
  - type: sound
    sound: ENTITY_PLAYER_LEVELUP

custom-rewards:
  - quests:
      - "tutoriel-1"
      - "tutoriel-2"
      - "tutoriel-3"
    actions:
      - type: title
        title: "&6Tutoriel Complete !"
        subtitle: "&eVous etes pret pour l'aventure"
      - type: console_command
        commands:
          - "give %player% diamond_sword{display:{Name:'\"&6Epee du Debutant\"'}} 1"
          - "give %player% cooked_beef 64"

# Dans le fichier de quetes
quests:
  - type: BLOCK_BREAK
    name: "tutoriel-3"
    display-name: "Derniere Quete du Tutoriel"
    goal: 50
    use-global-rewards: true
    actions:
      - material: STONE
    rewards:
      - type: message
        messages:
          - "&eVous avez casse 50 blocs de pierre !"
      - type: console_command
        commands:
          - "give %player% iron_pickaxe 1"
    permissible-rewards:
      - requirements:
          - type: permission
            permission: donateur
        actions:
          - type: message
            messages:
              - "&6Bonus donateur : Outils supplementaires !"
          - type: console_command
            commands:
              - "give %player% diamond_pickaxe 1"
```

## Bonnes pratiques

1. **Utilisez les recompenses globales avec parcimonie** - Ne spammez pas les joueurs avec trop de messages pour chaque quete
2. **Chainez les quetes** - Utilisez l'action `START_QUEST` pour creer des chaines de quetes
3. **Equilibrez les recompenses** - Assurez-vous que les recompenses correspondent a la difficulte de la quete
4. **Testez minutieusement** - Testez les recompenses pour vous assurer que les commandes fonctionnent correctement
5. **Utilisez les placeholders** - Rendez les messages dynamiques avec les placeholders de quetes

## Prochaines etapes

- Decouvrez les [Placeholders](./placeholders)
- Configurez les [Commandes et Permissions](./commands-permissions)
- Configurez les [Inventaires](./inventories) pour afficher les quetes
