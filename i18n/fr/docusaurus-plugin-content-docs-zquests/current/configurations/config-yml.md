---
sidebar_position: 8
title: config.yml
description: Fichier de configuration principal de zQuests
---

# config.yml

Cette page documente toutes les options disponibles dans le fichier de configuration principal `config.yml`.

## Options de debug

```yaml
# Active l'affichage d'informations detaillees dans la console
# Activez ceci lors du depannage
enable-debug: false

# Active le debug du temps d'execution pour mesurer les performances du plugin
# Utile pour identifier les goulots d'etranglement
enable-debug-time: false
```

## Configuration du stockage

```yaml
# Options de type de stockage :
# SQLITE - Stockage simple base sur fichier (test/petits serveurs uniquement)
# MYSQL - Connexion MySQL directe
# HIKARICP - MySQL avec pool de connexions (recommande pour la production)
storage-type: SQLITE

# Configuration de la base de donnees (pour MYSQL et HIKARICP)
database-configuration:
  # Prefixe des tables pour toutes les tables zQuests
  table-prefix: "zquests_"
  # IP du serveur de base de donnees
  host: 192.168.10.10
  # Port de la base de donnees (MySQL par defaut : 3306)
  port: 3306
  # Nom d'utilisateur
  user: votre_utilisateur
  # Mot de passe
  password: 'votre_mot_de_passe'
  # Nom de la base de donnees
  database: zquests
  # Activer la journalisation des requetes SQL
  debug: false
```

:::warning Limitations de SQLite
SQLite est recommande uniquement pour les tests. Certaines fonctionnalites peuvent avoir des fonctionnalites limitees. Utilisez HIKARICP pour les serveurs de production.
:::

## Configuration des commandes

```yaml
# Alias pour la commande principale /zquests
main-command-aliases:
  - quests
  - quest
  - q

# Inventaire par defaut ouvert par la commande /quests
main-command-inventory-name: "quests"

# Page de demarrage basee sur les permissions
# Les joueurs avec ces permissions commencent sur differentes pages
main-command-page:
  - permission: "quests.page.2"
    inventory: "quests"
    page: 2
    priority: 1
  - permission: "quests.page.3"
    inventory: "quests"
    page: 3
    priority: 2
```

## Configuration de la barre de progression

Configurez l'apparence des barres de progression dans les placeholders :

```yaml
progress-bar:
  # Caractere pour la progression completee
  icon: '|'
  # Caractere pour la progression restante
  not-completed-icon: '|'
  # Couleur pour la portion completee (couleur hex)
  progress-color: "#0ff216"
  # Couleur pour la portion restante (couleur hex)
  color: "#828282"
  # Longueur totale de la barre (nombre de caracteres)
  size: 30
```

**Exemple de resultat :** `||||||||||||||||||||||||||||||` (portion verte = complete, gris = restant)

## Configuration de la ligne de lore

Configurez le format du placeholder `%zquests_lore_line_<quete>%` :

```yaml
lore-line-placeholder:
  # Format pour les quetes actives (incompletes)
  active: "%progress-bar% &8- &6%progress%&8/&f%goal% &c✘"
  # Format pour les quetes completees
  complete: "%progress-bar% &8- &6%progress%&8/&f%goal% &a✔"
```

**Variables disponibles :**
- `%progress-bar%` - La barre de progression visuelle
- `%progress%` - Nombre de progression actuelle
- `%goal%` - Objectif de la quete

## Placeholder des quetes favorites

Configurez le placeholder `%zquests_favorite_quests%` :

```yaml
placeholder-favorite:
  # Nombre maximum de quetes favorites a afficher
  limit: 3
  # Message affiche quand le joueur n'a pas de favoris
  empty: "&cAucune quete favorite"
  # Format pour chaque quete dans la liste
  result: "&f%quest-description%\n&8%quest-display-name%\n#fcd600%quest-progress%&8/&f%quest-objective%"
  # Separateur entre les quetes
  between: "\n\n"
```

**Variables disponibles dans `result` :**
- `%quest-name%` - Nom interne de la quete
- `%quest-display-name%` - Nom d'affichage
- `%quest-description%` - Description
- `%quest-thumbnail%` - Materiau miniature
- `%quest-type%` - Type de quete
- `%quest-objective%` - Objectif
- `%quest-lore-line%` - Ligne de lore formatee
- `%quest-progress-bar%` - Barre de progression
- `%quest-percent%` - Pourcentage de completion
- `%quest-progress%` - Progression actuelle
- `%quest-global-group-name%` - Nom du groupe

## Groupes de quetes

Organisez les quetes en groupes pour les placeholders :

```yaml
quests-groups:
  minage:
    display-name: "Quetes de Minage"
    quests:
      - "casseur-pierre-1"
      - "casseur-pierre-2"
      - "mineur-minerai-1"
  agriculture:
    display-name: "Quetes d'Agriculture"
    quests:
      - "fermier-ble-1"
      - "maitre-recoltes-1"

# Nom de groupe par defaut pour les quetes non groupees
global-group-display-name: "General"
```

**Placeholders de groupe :**
- `%zquests_group_name_minage%` - "Quetes de Minage"
- `%zquests_group_count_minage%` - Total de quetes dans le groupe
- `%zquests_group_finish_minage%` - Quetes completees
- `%zquests_group_percent_minage%` - Pourcentage de completion

## Recompenses globales

Recompenses donnees pour TOUTES les completions de quetes :

```yaml
global-rewards:
  - type: message
    messages:
      - "&aQuete completee : &e%name%"
  - type: sound
    sound: ENTITY_PLAYER_LEVELUP
```

**Placeholders disponibles :** `%name%`, `%description%`, `%goal%`

## Recompenses personnalisees

Recompenses speciales quand des combinaisons specifiques de quetes sont completees :

```yaml
custom-rewards:
  - quests:
      - "tutoriel-1"
      - "tutoriel-2"
      - "tutoriel-3"
    actions:
      - type: message
        messages:
          - "&6&lTutoriel Complete !"
      - type: console_command
        commands:
          - "give %player% diamond 10"
```

## Configuration des evenements

Controlez les evenements lies aux quetes et les mises a jour du scoreboard :

```yaml
events:
  - event: QuestStartEvent
    enabled: true
    update-scoreboard: false

  - event: QuestProgressEvent
    enabled: true
    update-scoreboard: false

  - event: QuestCompleteEvent
    enabled: true
    update-scoreboard: false

  - event: QuestFavoriteChangeEvent
    enabled: true
    update-scoreboard: false

  - event: QuestPostProgressEvent
    enabled: true
    update-scoreboard: false

  - event: QuestUserLoadEvent
    enabled: true
    update-scoreboard: false
```

Mettez `update-scoreboard: true` pour rafraichir le scoreboard du joueur quand cet evenement se produit (necessite zEssentials).

## Format de date

Configurez le format d'affichage des dates pour les placeholders :

```yaml
date-format: "dd/MM/yyyy HH:mm:ss"
```

Utilise les patterns Java SimpleDateFormat.

## Detection "Regarder vers"

Configurez la distance de detection pour les types de quetes LOOK_AT :

```yaml
# Distance maximum pour la detection LOOK_AT_BLOCK
look-at-distance-block: 50

# Distance maximum pour la detection LOOK_AT_ENTITY
look-at-distance-entity: 50
```

## Mises a jour hologrammes et waypoints

Controlez les mises a jour automatiques :

```yaml
# Mettre a jour les hologrammes quand l'etat de la quete change
update-hologram: true

# Mettre a jour les waypoints quand l'etat de la quete change
update-waypoint: true
```

## Exemple complet

```yaml
enable-debug: false
enable-debug-time: false

storage-type: HIKARICP

database-configuration:
  table-prefix: "zquests_"
  host: localhost
  port: 3306
  user: minecraft
  password: 'mot_de_passe_securise'
  database: minecraft_quests
  debug: false

main-command-aliases:
  - quests
  - quest
  - q

main-command-inventory-name: "quests"

main-command-page:
  - permission: "quests.vip"
    inventory: "quests_vip"
    page: 1
    priority: 1

progress-bar:
  icon: '█'
  not-completed-icon: '░'
  progress-color: "#00FF00"
  color: "#444444"
  size: 20

lore-line-placeholder:
  active: "%progress-bar% &7%progress%/%goal%"
  complete: "%progress-bar% &a✔ Complete !"

placeholder-favorite:
  limit: 5
  empty: "&7Aucune quete suivie"
  result: "&6%quest-display-name%\n&7%quest-progress%/%quest-objective%"
  between: "\n"

quests-groups:
  quotidien:
    display-name: "&eQuetes Quotidiennes"
    quests:
      - "minage-quotidien"
      - "agriculture-quotidienne"
  hebdomadaire:
    display-name: "&6Quetes Hebdomadaires"
    quests:
      - "boss-hebdomadaire"

global-group-display-name: "Divers"

global-rewards:
  - type: sound
    sound: ENTITY_EXPERIENCE_ORB_PICKUP

custom-rewards:
  - quests:
      - "minage-quotidien"
      - "agriculture-quotidienne"
    actions:
      - type: message
        messages:
          - "&6Bonus quotidien : Toutes les quetes quotidiennes completees !"

events:
  - event: QuestCompleteEvent
    enabled: true
    update-scoreboard: true
  - event: QuestProgressEvent
    enabled: true
    update-scoreboard: false

date-format: "dd MMM yyyy"

look-at-distance-block: 100
look-at-distance-entity: 50

update-hologram: true
update-waypoint: true
```

## Prochaines etapes

- Configurez les [Quetes](./quests)
- Configurez les [Recompenses](./rewards)
- Decouvrez les [Placeholders](./placeholders)
