---
sidebar_position: 1
title: Demarrage
description: Introduction a zQuests - Un puissant plugin de quetes pour serveurs Minecraft
---

# Demarrer avec zQuests

**zQuests** est un plugin de quetes puissant et flexible pour les serveurs Minecraft. Il vous permet de creer des systemes de quetes engageants qui gardent vos joueurs motives et actifs. Avec une integration profonde avec zMenu, vous pouvez creer des experiences immersives avec de belles interfaces de quetes.

## Qu'est-ce que zQuests ?

zQuests est un plugin complet de gestion de quetes qui permet aux administrateurs de serveur de creer des quetes personnalisees avec divers objectifs, recompenses et systemes de progression. Que vous ayez besoin de taches quotidiennes simples, de quetes narratives complexes ou de defis bases sur des succes, zQuests fournit tous les outils necessaires.

## Fonctionnalites cles

### Types de quetes etendus
- **Plus de 25 types de quetes** incluant la casse de blocs, le meurtre d'entites, l'artisanat, la peche et plus encore
- Support des types de quetes personnalises via l'API
- Correspondance de materiaux basee sur les tags pour des configurations flexibles

### Gestion flexible des quetes
- **Quetes auto-acceptees** : Demarrer automatiquement les quetes pour les joueurs
- **Systeme de favoris** : Permettre aux joueurs de suivre leurs quetes importantes
- **Groupes de quetes** : Organiser les quetes en categories
- **Quetes uniques** : Empecher la progression d'autres quetes pendant des chaines specifiques
- **Quetes cachees** : Creer des objectifs secrets

### Systeme de recompenses puissant
- **Recompenses globales** : Appliquees a toutes les completions de quetes
- **Recompenses personnalisees** : Declencher des recompenses quand des combinaisons specifiques sont completees
- **Recompenses avec permissions** : Donner des bonus bases sur les permissions
- Supporte toutes les actions zMenu comme recompenses

### Integration zMenu
- Boutons personnalises pour l'affichage des quetes
- Actions specifiques aux quetes
- Mises a jour dynamiques de l'inventaire
- Suivi de progression dans les menus

### Fonctionnalites supplementaires
- **Waypoints** : Guider les joueurs vers les emplacements de quetes
- **Hologrammes** : Afficher les informations de quetes dans le monde
- **Support PlaceholderAPI** : Afficher les informations de quetes partout
- **Support base de donnees** : MySQL, MariaDB et SQLite
- **Integration scoreboard** : Mettre a jour les scoreboards lors des evenements de quetes

## Apercu des types de quetes

| Categorie | Types de quetes |
|----------|-------------|
| **Blocs** | BLOCK_BREAK, BLOCK_PLACE |
| **Entites** | ENTITY_KILL, ENTITY_DAMAGE, TAME, SHEAR |
| **Items** | CRAFT, SMELT, ITEM_BREAK, ITEM_MENDING, ITEM_CONSUME |
| **Recolte** | FARMING, FISHING, MINING |
| **Potions** | BREW, ENCHANT |
| **Exploration** | CUBOID, LOOK_AT_BLOCK, LOOK_AT_ENTITY |
| **Economie** | SELL, PURCHASE |
| **Progression** | JOB_LEVEL, JOB_PRESTIGE, EXPERIENCE_GAIN |
| **Special** | VOTE, COMMAND, CUSTOM, ISLAND, INVENTORY_OPEN, INVENTORY_CONTENT |
| **Divers** | HATCHING, RESURRECT, SMITHING |

## Comment ca fonctionne

zQuests utilise des fichiers de configuration YAML pour definir vos quetes. Voici un apercu simplifie :

1. Les **quetes** sont definies dans des fichiers YAML dans le dossier `quests/`
2. Chaque quete a un **type** qui determine comment la progression est suivie
3. Les **actions** definissent ce qui compte pour la progression
4. Les **recompenses** sont donnees quand les quetes sont completees
5. Les **inventaires** affichent les informations de quetes via zMenu

### Exemple simple

```yaml
quests:
  - type: BLOCK_BREAK
    name: "casseur-de-pierre"
    display-name: "Casseur de Pierre"
    description: "Cassez 100 blocs de pierre"
    thumbnail: STONE
    goal: 100
    auto-accept: true
    actions:
      - material: STONE
      - material: COBBLESTONE
    rewards:
      - type: message
        messages:
          - "&aQuete completee ! Vous avez casse 100 blocs de pierre !"
      - type: console_command
        commands:
          - "give %player% diamond 5"
```

Cela cree une quete qui suit la casse de pierre et de cobblestone, demarre automatiquement pour tous les joueurs, et donne des recompenses a la completion.

## Pourquoi choisir zQuests ?

| Fonctionnalite | zQuests | Autres plugins |
|---------|---------|---------------|
| Types de quetes | 25+ integres | Limite |
| Integration zMenu | Native | Aucune |
| Actions personnalisees | Support complet zMenu | Basique |
| Systeme de favoris | Oui | Rarement |
| Groupes de quetes | Oui | Parfois |
| Waypoints & Hologrammes | Oui | Rarement |
| Support base de donnees | MySQL/MariaDB/SQLite | Generalement fichiers |
| PlaceholderAPI | Support complet | Variable |
| API | Complete | Souvent minimale |

## Prochaines etapes

Pret a commencer ? Suivez ces etapes :

1. [Installer zQuests](./installation) sur votre serveur
2. Apprendre la [configuration des quetes](./configurations/quests)
3. Explorer tous les [types de quetes](./configurations/quest-types)
4. Configurer les [recompenses](./configurations/rewards) pour vos quetes
5. Creer des [inventaires personnalises](./configurations/inventories) avec zMenu

## Obtenir de l'aide

- **Discord** : Rejoignez notre [serveur Discord](https://discord.groupez.dev) pour du support
- **GitHub** : Signalez les problemes sur [GitHub](https://github.com/Maxlego08/zQuests)
- **Documentation** : Vous etes en train de la lire !
