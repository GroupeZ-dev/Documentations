---
sidebar_position: 7
title: Waypoints et Hologrammes
description: Guidez les joueurs avec des waypoints et hologrammes dans zQuests
---

# Waypoints et Hologrammes

zQuests peut afficher des hologrammes et des waypoints pour guider les joueurs vers les objectifs de quetes. Ces fonctionnalites necessitent un plugin compatible comme **zEssentials**.

## Prerequis

Pour utiliser les waypoints et hologrammes, vous avez besoin de :
- **zEssentials** ou un autre fournisseur compatible d'hologrammes/waypoints

## Configuration globale

Les deux fonctionnalites peuvent etre definies globalement dans des fichiers dedies et referencees par les quetes.

### Hologrammes

Creez `plugins/zQuests/holograms.yml` :

```yaml
holograms:
  - name: ZONE_MINAGE
    location: "world,100,65,200"
    texts:
      - "&6&lQuete de Minage"
      - "&7Cassez des minerais dans cette zone"
      - "&aSuivez la balise !"
    scale: 1.5
    billboard: VERTICAL

  - name: QUETE_PNJ
    locations:
      - "world,50,70,100"
      - "world,-50,70,-100"
    text: "&e&lParlez au villageois"
    scale: 1.2
```

#### Options des hologrammes

| Option | Description | Par defaut |
|--------|-------------|---------|
| `name` | Identifiant unique (requis) | - |
| `location` | Emplacement unique `monde,x,y,z` | - |
| `locations` | Emplacements multiples | - |
| `text` | Texte sur une ligne | - |
| `texts` | Lignes multiples | - |
| `billboard` | Mode de rotation : `CENTER`, `FIXED`, `HORIZONTAL`, `VERTICAL` | `CENTER` |
| `scale` | Multiplicateur de taille (valeur unique ou `x,y,z`) | `1` |
| `translation-x` | Decalage X | `0` |
| `translation-y` | Decalage Y | `0` |
| `translation-z` | Decalage Z | `0` |
| `brightness-block` | Niveau de lumiere des blocs | `15` |
| `brightness-sky` | Niveau de lumiere du ciel | `15` |
| `shadow-radius` | Taille de l'ombre du texte | `0` |
| `shadow-strength` | Intensite de l'ombre | `1.0` |
| `visibility-distance` | Distance de visibilite max | `-1` (defaut) |
| `text-background` | Couleur de fond (hex, nom, `transparent`, `default`) | - |
| `text-alignment` | Alignement du texte : `CENTER`, `LEFT`, `RIGHT` | `CENTER` |
| `text-shadow` | Activer l'ombre du texte | `false` |
| `see-through` | Visible a travers les blocs | `false` |

### Waypoints

Creez `plugins/zQuests/waypoints.yml` :

```yaml
waypoints:
  - name: ZONE_MINAGE
    location: "world,100,65,200"
    texture: marqueur_quete
    color: gold

  - name: EMPLACEMENT_FERME
    location: "world,200,70,150"
    texture: icone_ferme
    color: green
```

#### Options des waypoints

| Option | Description | Par defaut |
|--------|-------------|---------|
| `name` | Identifiant unique (requis) | - |
| `location` | Emplacement cible `monde,x,y,z` | - |
| `texture` | Nom de la texture de l'icone | - |
| `color` | Couleur de la balise (nom ou hex) | `white` |

## Utilisation dans les quetes

### Reference aux definitions globales

Referencez les hologrammes et waypoints definis globalement par leur nom :

```yaml
quests:
  - type: BLOCK_BREAK
    name: "quete-minage"
    display-name: "Quete de Minage"
    goal: 100
    actions:
      - material: STONE
    hologram: ZONE_MINAGE
    waypoint: ZONE_MINAGE
```

### Definitions en ligne

Definissez les hologrammes et waypoints directement dans la quete :

```yaml
quests:
  - type: CUBOID
    name: "trouver-village"
    display-name: "Trouver le Village"
    goal: 1
    actions:
      - cuboid: "world,100,60,100,200,100,200"
    hologram:
      location: "world,150,80,150"
      texts:
        - "&6&lQuete du Village"
        - "&7Trouvez le village cache"
        - "&aCherchez la balise !"
      scale: 2
      billboard: VERTICAL
      see-through: true
    waypoint:
      location: "world,150,65,150"
      texture: marqueur_village
      color: "#FFD700"
```

### Emplacements multiples

Affichez des hologrammes a plusieurs emplacements :

```yaml
quests:
  - type: ENTITY_KILL
    name: "chasse-squelettes"
    display-name: "Chasse aux Squelettes"
    goal: 50
    actions:
      - entity: SKELETON
    hologram:
      locations:
        - "world,100,65,100"
        - "world,-100,65,100"
        - "world,100,65,-100"
        - "world,-100,65,-100"
      texts:
        - "&c&lZone Dangereuse"
        - "&7Des squelettes apparaissent ici"
```

## Configuration dans config.yml

Controlez les mises a jour des hologrammes et waypoints :

```yaml
# Mettre a jour les hologrammes quand l'etat de la quete change
update-hologram: true

# Mettre a jour les waypoints quand l'etat de la quete change
update-waypoint: true
```

## Exemples d'hologrammes

### Marqueur de quete simple

```yaml
hologram:
  location: "world,100,70,200"
  text: "&e&l! Quete ici"
  scale: 1.5
```

### Informations detaillees de quete

```yaml
hologram:
  location: "world,100,72,200"
  texts:
    - "&6&lMaitre Mineur"
    - ""
    - "&7Cassez 500 blocs de pierre"
    - "&7dans cette zone pour completer"
    - "&7la quete !"
    - ""
    - "&a↓ Commencez ici ↓"
  scale: 1.2
  billboard: CENTER
  text-alignment: CENTER
```

### Point d'interaction PNJ

```yaml
hologram:
  location: "world,50,73,100"
  texts:
    - "&e&l? Parlez-moi"
    - "&7J'ai une quete pour vous !"
  scale: 1.0
  translation-y: 2.5  # Flotte au-dessus du PNJ
  billboard: CENTER
```

### Integration pack de ressources

```yaml
hologram:
  location: "world,100,70,200"
  text: "%img_marqueur_quete%"  # Image ItemsAdder/Oraxen
  scale: 3
  text-background: transparent
```

## Exemples de waypoints

### Balise simple

```yaml
waypoint:
  location: "world,100,65,200"
  color: blue
```

### Icone personnalisee

```yaml
waypoint:
  location: "world,100,65,200"
  texture: quete_diamant
  color: "#00FFFF"
```

## Commande de rafraichissement

Si les hologrammes ou waypoints ne se mettent pas a jour correctement :

```bash
/zquests refresh-hologram
```

Cela force un rafraichissement de tous les hologrammes et waypoints actifs.

## Visibilite

Les hologrammes et waypoints sont visibles uniquement quand :
1. La quete est **active** pour le joueur
2. La quete n'est **pas completee**
3. Le joueur est dans la `visibility-distance` (si definie)

Une fois une quete completee, les hologrammes et waypoints associes disparaissent automatiquement.

## Bonnes pratiques

1. **Utilisez des noms significatifs** - Nommez les definitions globales clairement (ex: `MARQUEUR_QUETE_MINAGE`)
2. **Hauteurs coherentes** - Placez les hologrammes a des hauteurs coherentes au-dessus du sol
3. **N'en abusez pas** - Trop d'hologrammes peuvent distraire
4. **Testez la visibilite** - Verifiez les hologrammes du point de vue du joueur
5. **Considerez les performances** - Beaucoup d'hologrammes peuvent impacter les performances du serveur

## Depannage

### Les hologrammes ne s'affichent pas

1. Verifiez que zEssentials est installe et active
2. Verifiez que les coordonnees d'emplacement sont correctes
3. Assurez-vous que la quete est active pour le joueur
4. Essayez `/zquests refresh-hologram`

### Les waypoints ne fonctionnent pas

1. Confirmez que le fournisseur de waypoints est installe
2. Verifiez que le format d'emplacement est correct
3. Verifiez que la quete est demarree

### Hologrammes a la mauvaise position

1. Utilisez `translation-y` pour ajuster la hauteur
2. Verifiez que le nom du monde correspond exactement
3. Verifiez les fautes de frappe dans les coordonnees

## Prochaines etapes

- Decouvrez la [Configuration des quetes](./quests)
- Configurez les [Recompenses](./rewards)
- Configurez les [Inventaires](./inventories)
