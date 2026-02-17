---
sidebar_position: 2
title: Améliorations
description: Configurer les améliorations dans zCookieClicker
---

# Améliorations

zCookieClicker propose 14 améliorations uniques qui augmentent les cookies par seconde (CPS) du joueur. Chaque amélioration peut être achetée plusieurs fois, avec un prix qui augmente après chaque achat.

## Configuration des Améliorations

Les améliorations sont configurées dans la section `upgrades` de `config.yml` :

```yaml
upgrades:
  - type: "MANUAL_CLICK"
    cost: 10
    cps: 0.1

  - type: "GRANDMA"
    cost: 100
    cps: 1
```

| Option | Description |
|--------|-------------|
| `type` | Identifiant de l'amélioration (doit correspondre à la valeur enum) |
| `cost` | Coût de base de l'amélioration |
| `cps` | Cookies par seconde fournis par chaque amélioration |

## Améliorations Disponibles

### Niveau 1 - Début de Partie

| Amélioration | Type | Coût de Base | CPS | Description |
|--------------|------|--------------|-----|-------------|
| Clic Manuel | `MANUAL_CLICK` | 10 | 0.1 | Augmente la puissance de clic |
| Grand-mère | `GRANDMA` | 100 | 1 | Une gentille grand-mère qui fait des cookies |
| Ferme | `FARM` | 1 100 | 8 | Cultive des plantes à cookies |
| Usine | `FACTORY` | 12 000 | 47 | Produit des cookies en masse |

### Niveau 2 - Milieu de Partie

| Amélioration | Type | Coût de Base | CPS | Description |
|--------------|------|--------------|-----|-------------|
| Mine | `MINE` | 130 000 | 260 | Mine de la pâte à cookies |
| Banque | `BANK` | 1 400 000 | 1 400 | Génère des intérêts en cookies |
| Temple | `TEMPLE` | 20 000 000 | 7 800 | Convertit les prières en cookies |
| Tour | `TOWER` | 330 000 000 | 44 000 | Une tour de magicien faisant des cookies |

### Niveau 3 - Fin de Partie

| Amélioration | Type | Coût de Base | CPS | Description |
|--------------|------|--------------|-----|-------------|
| Machine à Voyager dans le Temps | `TIME_MACHINE` | 51 000 000 000 | 2 600 000 | Ramène des cookies du passé |
| Condenseur d'Antimatière | `ANTIMATTER_CONDENSER` | 1 000 000 000 000 | 13 000 000 | Condense l'antimatière en cookies |

### Niveau 4 - Fin de Jeu

| Amélioration | Type | Coût de Base | CPS | Description |
|--------------|------|--------------|-----|-------------|
| Prisme | `PRISM` | 170 000 000 000 000 | 430 000 000 | Transforme la lumière en cookies |
| Chancellerie | `CHANCELLERY` | 2 100 000 000 000 000 | 7 000 000 000 | Crée des cookies à partir de la bureaucratie |
| Couloir Dimensionnel | `DIMENSIONAL_CORRIDOR` | 64 000 000 000 000 000 | 1 200 000 000 000 | Ouvre des portails vers des dimensions à cookies |
| Fours Célestes | `CELESTIAL_OVENS` | 170 000 000 000 000 000 | 44 000 000 000 000 | Cuit des cookies avec la puissance des étoiles |

## Configuration par Défaut

```yaml
upgrades:
  - type: "MANUAL_CLICK"
    cost: 10
    cps: 0.1

  - type: "GRANDMA"
    cost: 100
    cps: 1

  - type: "FARM"
    cost: 1100
    cps: 8

  - type: "FACTORY"
    cost: 12000
    cps: 47

  - type: "MINE"
    cost: 130000
    cps: 260

  - type: "BANK"
    cost: 1400000
    cps: 1400

  - type: "TEMPLE"
    cost: 20000000
    cps: 7800

  - type: "TOWER"
    cost: 330000000
    cps: 44000

  - type: "TIME_MACHINE"
    cost: 51000000000
    cps: 2600000

  - type: "ANTIMATTER_CONDENSER"
    cost: 1000000000000
    cps: 13000000

  - type: "PRISM"
    cost: 170000000000000
    cps: 430000000

  - type: "CHANCELLERY"
    cost: 2100000000000000
    cps: 7000000000

  - type: "DIMENSIONAL_CORRIDOR"
    cost: 64000000000000000
    cps: 1200000000000

  - type: "CELESTIAL_OVENS"
    cost: 170000000000000000
    cps: 44000000000000
```

## Échelle de Prix

Chaque achat d'amélioration augmente le coût du pourcentage configuré :

```yaml
price-upgrade-percent: 15
```

**Formule :** `Nouveau Prix = Prix de Base × (1 + pourcentage/100)^achats`

**Exemple pour Grand-mère (augmentation de 15%) :**
| Achat # | Prix |
|---------|------|
| 1er | 100 |
| 2ème | 115 |
| 3ème | 132 |
| 4ème | 152 |
| 5ème | 175 |
| 10ème | 404 |
| 20ème | 1 637 |

## Configuration GUI

Les améliorations sont affichées dans l'inventaire `cookies-upgrade.yml` en utilisant des patterns :

```yaml
manual-click:
  pattern:
    fileName: "cookie-upgrade"
    pluginName: zCookieClicker
    slot: 19
    material: WOODEN_SWORD
    upgrade: MANUAL_CLICK
    upgrade-name: 'Clic Manuel'
```

| Option | Description |
|--------|-------------|
| `fileName` | Nom du fichier pattern |
| `pluginName` | Nom du plugin pour le pattern |
| `slot` | Position du slot dans l'inventaire |
| `material` | Matériau d'affichage pour l'amélioration |
| `upgrade` | Type d'amélioration (doit correspondre à la config) |
| `upgrade-name` | Nom d'affichage dans l'interface |

## Améliorations Personnalisées

Vous pouvez modifier les valeurs des améliorations pour équilibrer votre serveur :

### Mode Facile

```yaml
upgrades:
  - type: "GRANDMA"
    cost: 50        # Moins cher
    cps: 2          # Plus de CPS

price-upgrade-percent: 10  # Augmentation de prix plus lente
```

### Mode Difficile

```yaml
upgrades:
  - type: "GRANDMA"
    cost: 200       # Plus cher
    cps: 0.5        # Moins de CPS

price-upgrade-percent: 25  # Augmentation de prix plus rapide
```

## Conseils

### Équilibrer les Valeurs CPS

- Gardez une augmentation d'environ 8-10x entre les niveaux pour une progression équilibrée
- Les améliorations de niveau supérieur devraient avoir un CPS significativement plus élevé pour justifier leur coût

### Équilibrage des Prix

- Les niveaux inférieurs devraient être abordables rapidement pour encourager l'engagement
- Les niveaux supérieurs devraient nécessiter patience et stratégie

### Sélection des Matériaux

Choisissez des matériaux qui représentent visuellement chaque amélioration :
- Clic Manuel → Épée en Bois (clic)
- Grand-mère → Gâteau (cuisson)
- Ferme → Blé (agriculture)
- Usine → Brique (industriel)
- Mine → Pioche en Fer (minage)
- Banque → Lingot d'Or (richesse)
