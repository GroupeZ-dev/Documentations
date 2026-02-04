---
sidebar_position: 6
title: Module Hologrammes
description: Hologrammes d'affichage de texte, d'objets et de blocs avec indicateurs de dégâts
---

# Module Hologrammes

**Fichier :** `modules/hologram/config.yml`

Le module Hologrammes vous permet de créer des hologrammes d'affichage de texte, d'objets et de blocs dans le monde. Il fournit également une fonctionnalité d'indicateurs de dégâts qui affiche des nombres de dégâts flottants au-dessus des entités lorsqu'elles subissent des dommages. Les hologrammes supportent PlaceholderAPI, les tâches de mise à jour automatique, et sont entièrement gérés via des commandes en jeu avec plus de 25 sous-commandes.

---

## Configuration

```yaml
enable: true

# Automatic update task for holograms containing placeholders
auto-update-task:
  enable: false
  milliseconds: 1000

# Damage indicator - floating damage numbers above entities
damage-indicator:
  enabled: false
  players: true
  mobs: true
  animals: true
  waterMobs: true
  duration: 40
  appearance: '<#ed2626>%damage%'
  criticalAppearance: '<#ed2626><bold>\u1d04\u0280\u026a\u1d1b<#bf0b0b> %damage%'
  height: 1.0
  offsetX: 0.5
  offsetY: 0.5
  offsetZ: 0.5
  decimalFormat: "#.#"
  disabledEntities:
    - WITHER
```

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Hologrammes |

### Tâche de Mise à Jour Automatique

La tâche de mise à jour automatique rafraîchit périodiquement tous les hologrammes contenant des placeholders PlaceholderAPI.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `auto-update-task.enable` | Boolean | `false` | Activer ou désactiver la mise à jour automatique des placeholders d'hologrammes |
| `auto-update-task.milliseconds` | Integer | `1000` | Intervalle en millisecondes entre chaque cycle de rafraîchissement des hologrammes |

:::tip
N'activez la tâche de mise à jour automatique que si vos hologrammes contiennent des placeholders dynamiques (par exemple, nombre de joueurs, données baltop). Les hologrammes statiques n'ont pas besoin de cette fonctionnalité et la laisser désactivée économise les ressources du serveur.
:::

### Indicateurs de Dégâts

Les indicateurs de dégâts affichent des nombres de dégâts flottants au-dessus des entités lorsqu'elles reçoivent des dommages. Les coups normaux et les coups critiques peuvent avoir des apparences distinctes.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `damage-indicator.enabled` | Boolean | `false` | Activer ou désactiver les indicateurs de dégâts flottants |
| `damage-indicator.players` | Boolean | `true` | Afficher les indicateurs de dégâts lorsque les joueurs subissent des dommages |
| `damage-indicator.mobs` | Boolean | `true` | Afficher les indicateurs de dégâts lorsque les mobs hostiles subissent des dommages |
| `damage-indicator.animals` | Boolean | `true` | Afficher les indicateurs de dégâts lorsque les animaux passifs subissent des dommages |
| `damage-indicator.waterMobs` | Boolean | `true` | Afficher les indicateurs de dégâts lorsque les mobs aquatiques subissent des dommages |
| `damage-indicator.duration` | Integer | `40` | Durée en ticks pendant laquelle le nombre de dégâts reste visible. `40` ticks = 2 secondes |
| `damage-indicator.appearance` | String | `<#ed2626>%damage%` | Format MiniMessage pour les nombres de dégâts normaux. Utilisez `%damage%` pour la valeur des dégâts |
| `damage-indicator.criticalAppearance` | String | *(voir ci-dessus)* | Format MiniMessage pour les nombres de dégâts critiques. Utilisez `%damage%` pour la valeur des dégâts |
| `damage-indicator.height` | Double | `1.0` | Hauteur de base au-dessus de l'entité où le nombre de dégâts apparaît |
| `damage-indicator.offsetX` | Double | `0.5` | Décalage horizontal aléatoire maximum sur l'axe X. Ajoute de la variété visuelle au placement des nombres de dégâts |
| `damage-indicator.offsetY` | Double | `0.5` | Décalage vertical aléatoire maximum sur l'axe Y |
| `damage-indicator.offsetZ` | Double | `0.5` | Décalage horizontal aléatoire maximum sur l'axe Z |
| `damage-indicator.decimalFormat` | String | `#.#` | Modèle Java DecimalFormat pour la valeur des dégâts. `#.#` affiche une décimale |
| `damage-indicator.disabledEntities` | Liste de Strings | `[WITHER]` | Liste des types d'entités qui n'afficheront pas d'indicateurs de dégâts |

:::warning
Activer les indicateurs de dégâts sur un serveur avec de nombreuses entités et joueurs peut augmenter le trafic de paquets. Envisagez de désactiver les indicateurs pour les types d'entités non essentiels (animaux, mobs aquatiques) sur les serveurs à forte population.
:::

---

## Commandes Associées

Toute la gestion des hologrammes se fait via la commande `/hologram` et ses sous-commandes.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/hologram` | `holo`, `ho` | `essentials.hologram` | Gérer les hologrammes |

### Sous-commandes Hologram

| Sous-commande | Description |
|---------------|-------------|
| `create` | Créer un nouvel hologramme à votre position actuelle |
| `delete` | Supprimer un hologramme existant |
| `addline` | Ajouter une nouvelle ligne de texte à un hologramme |
| `setline` | Définir le contenu d'une ligne spécifique |
| `removeline` | Supprimer une ligne d'un hologramme |
| `insertbeforeline` | Insérer une nouvelle ligne avant un numéro de ligne spécifique |
| `insertafterline` | Insérer une nouvelle ligne après un numéro de ligne spécifique |
| `scale` | Définir l'échelle (taille) d'un hologramme sur les axes x, y, z |
| `translation` | Définir le décalage de translation d'un hologramme |
| `movehere` | Déplacer un hologramme à votre position actuelle |
| `moveto` | Déplacer un hologramme vers des coordonnées x, y, z spécifiques |
| `billboard` | Définir le mode d'affichage (`CENTER`, `FIXED`, `HORIZONTAL`, `VERTICAL`) |
| `textalignment` | Définir l'alignement du texte (`CENTER`, `LEFT`, `RIGHT`) |
| `yaw` | Définir la rotation yaw (horizontale) |
| `pitch` | Définir la rotation pitch (verticale) |
| `background` | Définir la couleur d'arrière-plan (format hexadécimal ARGB) |
| `list` | Lister tous les hologrammes du serveur |
| `teleport` | Se téléporter à l'emplacement d'un hologramme |
| `seethrough` | Activer/désactiver la visibilité du texte de l'hologramme à travers les blocs |
| `textshadow` | Activer/désactiver le rendu de l'ombre du texte |
| `shadowstrength` | Définir l'intensité de l'ombre (0.0 à 1.0) |
| `shadowradius` | Définir le rayon de l'ombre |
| `viewdistance` | Définir la distance de vue maximale en blocs |
| `item` | Définir une ligne d'hologramme pour afficher un objet |
| `block` | Définir une ligne d'hologramme pour afficher un bloc |

---

## Permissions Associées

| Permission | Description |
|------------|-------------|
| `essentials.hologram` | Donne accès à toutes les sous-commandes `/hologram` |

---

## Exemples d'Utilisation

### Créer un Hologramme

```
/hologram create myhologram
/hologram addline myhologram &6&lWelcome to the Server!
/hologram addline myhologram &7Use /help for commands
```

### Afficher un Objet

```
/hologram create itemdisplay
/hologram item itemdisplay DIAMOND_SWORD
/hologram addline itemdisplay &bLegendary Sword
```

### Indicateurs de Dégâts avec Apparence Personnalisée

Pour afficher les nombres de dégâts avec un symbole de coeur :

```yaml
damage-indicator:
  enabled: true
  appearance: '<#ed2626>-%damage% \u2764'
  criticalAppearance: '<#ed2626><bold>CRIT</bold> <#bf0b0b>-%damage% \u2764'
```

:::info
Les hologrammes sont persistants et survivent aux redémarrages du serveur. Toutes les données d'hologrammes sont stockées dans les fichiers de données du plugin et chargées automatiquement au démarrage du serveur.
:::
