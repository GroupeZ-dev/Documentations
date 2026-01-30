---
sidebar_position: 1
title: Configuration des quetes
description: Apprenez a configurer les quetes dans zQuests
---

# Configuration des quetes

Cette page explique comment configurer les quetes dans zQuests. Chaque quete est definie en utilisant une configuration YAML avec diverses options pour personnaliser le comportement, les objectifs et les recompenses.

## Structure de base

Les quetes sont definies dans des fichiers YAML situes dans le dossier `plugins/zQuests/quests/`. Vous pouvez organiser les quetes en plusieurs fichiers pour une meilleure gestion.

```yaml
quests:
  - type: BLOCK_BREAK
    name: "casseur-de-pierre-1"
    display-name: "Casseur de Pierre"
    description: "Cassez 500 blocs de pierre"
    thumbnail: STONE
    goal: 500
    auto-accept: true
    actions:
      - material: STONE
      - material: COBBLESTONE
    rewards:
      - type: message
        messages:
          - "&aVous avez complete la quete Casseur de Pierre !"
      - type: console_command
        commands:
          - "give %player% diamond 5"
```

## Options de configuration

### `type`

Specifie le type de quete. Cela determine comment la progression est suivie.

- **Requis :** Oui
- **Par defaut :** Aucun

```yaml
type: BLOCK_BREAK
```

Voir [Types de quetes](./quest-types) pour tous les types disponibles.

---

### `name`

Un identifiant unique pour la quete. Cette valeur est utilisee en interne pour suivre la progression des joueurs et ne doit jamais changer une fois que les joueurs ont commence la quete.

- **Requis :** Oui
- **Par defaut :** Aucun

```yaml
name: "casseur-de-pierre-1"
```

:::warning Important
Le nom de la quete doit etre **unique** dans tous les fichiers de quetes. Changer cette valeur apres que des joueurs ont commence la quete reinitialise leur progression !
:::

---

### `display-name`

Le nom affiche aux joueurs dans les inventaires et messages. Supporte les codes couleur et les placeholders.

- **Requis :** Non
- **Par defaut :** Utilise la valeur de `name`

```yaml
display-name: "&6Casseur de Pierre"
```

---

### `description`

Une description de la quete montree aux joueurs. Supporte les codes couleur.

- **Requis :** Non
- **Par defaut :** `"no description"`

```yaml
description: "Cassez 500 blocs de pierre pour completer cette quete"
```

---

### `placeholder-description`

Une description alternative qui supporte les placeholders dynamiques. Utile pour montrer la progression restante.

- **Requis :** Non
- **Par defaut :** Utilise `description`

```yaml
placeholder-description: "Cassez encore %quest-remaining% blocs de pierre"
```

Placeholders disponibles :
- `%quest-remaining%` - Quantite restante
- `%quest-progress%` - Progression actuelle
- `%quest-goal%` - Objectif de la quete

---

### `thumbnail`

Le materiau utilise comme icone de la quete dans les inventaires.

- **Requis :** Non
- **Par defaut :** Aucun

```yaml
thumbnail: DIAMOND_PICKAXE
```

Utilise les [noms de materiaux Bukkit](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/Material.html).

---

### `goal`

La quantite cible pour completer la quete.

- **Requis :** Oui
- **Par defaut :** `1`

```yaml
goal: 500
```

---

### `auto-accept`

Si la quete demarre automatiquement quand elle est disponible pour le joueur.

- **Requis :** Non
- **Par defaut :** `false`

```yaml
auto-accept: true
```

---

### `use-global-rewards`

Si les recompenses globales doivent etre incluses quand la quete est completee.

- **Requis :** Non
- **Par defaut :** `true`

```yaml
use-global-rewards: true
```

Mettez `false` si vous voulez seulement les recompenses specifiques a la quete.

---

### `favorite`

Si la quete est marquee comme favorite quand elle demarre.

- **Requis :** Non
- **Par defaut :** `false`

```yaml
favorite: true
```

---

### `can-change-favorite`

Si les joueurs peuvent changer le statut favori de cette quete.

- **Requis :** Non
- **Par defaut :** `true`

```yaml
can-change-favorite: true
```

---

### `unique`

Quand active, la progression sur cette quete empeche la progression sur d'autres quetes du meme type. Utile pour les quetes d'histoire ou une seule quete doit avancer a la fois.

- **Requis :** Non
- **Par defaut :** `false`

```yaml
unique: true
```

---

### `hidden`

Si la quete est cachee du bouton `ZQUESTS_HISTORY`.

- **Requis :** Non
- **Par defaut :** `false`

```yaml
hidden: true
```

---

### `custom-model-id`

ID de modele personnalise pour l'integration de pack de ressources, disponible via le placeholder `%quest-model-id%`.

- **Requis :** Non
- **Par defaut :** `0`

```yaml
custom-model-id: 1001
```

---

### `actions`

Definit ce qui compte pour la progression de la quete. Le format depend du type de quete.

- **Requis :** Depend du type de quete
- **Par defaut :** Liste vide

```yaml
# Pour les quetes BLOCK_BREAK
actions:
  - material: STONE
  - material: COBBLESTONE
  - tag: LOGS  # Tags Bukkit

# Pour les quetes ENTITY_KILL
actions:
  - entity: ZOMBIE
  - entity: SKELETON
```

---

### `rewards`

Actions executees quand la quete est completee. Supporte toutes les actions zMenu.

- **Requis :** Non
- **Par defaut :** Liste vide

```yaml
rewards:
  - type: message
    messages:
      - "&aQuete completee !"
  - type: console_command
    commands:
      - "give %player% diamond 10"
  - type: sound
    sound: ENTITY_PLAYER_LEVELUP
```

Voir [Actions zMenu](https://docs.groupez.dev/zmenu/configurations/buttons/actions) pour tous les types d'actions disponibles.

---

### `start-actions`

Actions executees quand la quete demarre.

- **Requis :** Non
- **Par defaut :** Liste vide

```yaml
start-actions:
  - type: message
    messages:
      - "&eQuete demarree ! Bonne chance !"
  - type: sound
    sound: ENTITY_EXPERIENCE_ORB_PICKUP
```

---

### `permissible-rewards`

Recompenses bonus donnees seulement si le joueur remplit certaines conditions.

- **Requis :** Non
- **Par defaut :** Liste vide

```yaml
permissible-rewards:
  - requirements:
      - type: permission
        permission: quests.vip
    actions:
      - type: message
        messages:
          - "&6Bonus VIP : Recompenses supplementaires !"
      - type: console_command
        commands:
          - "give %player% diamond 5"
```

---

### `action-requirements`

Conditions qui doivent etre remplies pour que la progression compte. Si le joueur ne remplit pas ces conditions, ses actions n'avanceront pas la quete.

- **Requis :** Non
- **Par defaut :** Liste vide

```yaml
action-requirements:
  - type: permission
    permission: quests.can-progress
  - type: world
    world: survival
```

---

### `hologram`

Affiche un hologramme quand la quete est active. Peut referencer un hologramme global par nom ou definir en ligne.

- **Requis :** Non
- **Par defaut :** Aucun

**Reference hologramme global :**
```yaml
hologram: MON_HOLOGRAMME
```

**Definition en ligne :**
```yaml
hologram:
  location: "world,100,65,200"
  texts:
    - "&aEmplacement de quete ici !"
    - "&7Suivez le chemin..."
```

Voir [Waypoints & Hologrammes](./waypoints-holograms) pour la configuration complete.

---

### `waypoint`

Affiche un waypoint guidant le joueur vers un emplacement. Peut referencer un waypoint global ou definir en ligne.

- **Requis :** Non
- **Par defaut :** Aucun

**Reference waypoint global :**
```yaml
waypoint: EMPLACEMENT_QUETE
```

**Definition en ligne :**
```yaml
waypoint:
  location: "world,100,65,200"
  texture: marqueur_quete
  color: gold
```

Voir [Waypoints & Hologrammes](./waypoints-holograms) pour la configuration complete.

---

## Exemple complet

Voici une configuration de quete complete montrant la plupart des options :

```yaml
quests:
  - type: BLOCK_BREAK
    name: "maitre-mineur"
    display-name: "&6Maitre Mineur"
    description: "Cassez 1000 blocs de minerai"
    placeholder-description: "Cassez encore %quest-remaining% blocs de minerai"
    thumbnail: DIAMOND_ORE
    goal: 1000
    auto-accept: false
    use-global-rewards: true
    favorite: false
    can-change-favorite: true
    unique: false
    hidden: false
    custom-model-id: 0
    actions:
      - material: COAL_ORE
      - material: IRON_ORE
      - material: GOLD_ORE
      - material: DIAMOND_ORE
      - material: EMERALD_ORE
      - material: LAPIS_ORE
      - material: REDSTONE_ORE
      - material: COPPER_ORE
    action-requirements:
      - type: world
        world: survival
    start-actions:
      - type: message
        messages:
          - "&eVous avez demarre la quete Maitre Mineur !"
          - "&7Cassez 1000 blocs de minerai pour la completer."
    rewards:
      - type: message
        messages:
          - "&a&lQuete Completee !"
          - "&7Vous etes maintenant un Maitre Mineur !"
      - type: console_command
        commands:
          - "give %player% diamond 64"
          - "eco give %player% 10000"
      - type: sound
        sound: UI_TOAST_CHALLENGE_COMPLETE
    permissible-rewards:
      - requirements:
          - type: permission
            permission: rank.vip
        actions:
          - type: message
            messages:
              - "&6&lBONUS VIP : +32 diamants !"
          - type: console_command
            commands:
              - "give %player% diamond 32"
    hologram: ZONE_MINAGE
    waypoint: ZONE_MINAGE
```

## Organisation des fichiers

Vous pouvez organiser les quetes en plusieurs fichiers :

```
plugins/zQuests/quests/
├── debutant/
│   ├── tutoriel.yml
│   └── quetes-demarrage.yml
├── quotidien/
│   ├── minage.yml
│   └── agriculture.yml
├── histoire/
│   └── histoire-principale.yml
└── evenements/
    └── halloween.yml
```

Chaque fichier doit contenir une liste `quests` :

```yaml
# quests/debutant/tutoriel.yml
quests:
  - type: BLOCK_BREAK
    name: "tutoriel-1"
    # ... config quete

  - type: CRAFT
    name: "tutoriel-2"
    # ... config quete
```

## Prochaines etapes

- Decouvrez tous les [Types de quetes](./quest-types)
- Configurez les [Recompenses](./rewards)
- Configurez les [Waypoints & Hologrammes](./waypoints-holograms)
