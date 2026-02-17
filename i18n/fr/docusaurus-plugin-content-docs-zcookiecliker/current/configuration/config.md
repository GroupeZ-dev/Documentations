---
sidebar_position: 1
title: Configuration Principale
description: Options de configuration principales pour zCookieClicker
---

# Configuration Principale

Cette page couvre les options de configuration principales disponibles dans `config.yml`.

## Configuration de la Base de Données

Configurez comment les données des joueurs sont stockées.

```yaml
sql:
  type: SQLITE  # SQLITE, MYSQL ou MARIADB
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  database: zcookieclicker
  prefix: "zcookieclicker_"
  retry: 5
  debug: false
```

| Option | Description |
|--------|-------------|
| `type` | Type de stockage : `SQLITE`, `MYSQL` ou `MARIADB` |
| `user` | Nom d'utilisateur de la base de données |
| `password` | Mot de passe de la base de données |
| `port` | Port de la base de données |
| `host` | Adresse hôte de la base de données |
| `database` | Nom de la base de données |
| `prefix` | Préfixe des noms de tables |
| `retry` | Nombre de tentatives de reconnexion |
| `debug` | Activer le débogage des requêtes SQL |

## Échelle de Prix

Configurez comment les prix des améliorations augmentent à chaque achat :

```yaml
price-upgrade-percent: 15
```

Cela signifie que chaque achat d'amélioration augmente le prix suivant de 15%.

**Exemple avec augmentation de 15% :**
- Première Grand-mère : 100 cookies
- Deuxième Grand-mère : 115 cookies
- Troisième Grand-mère : 132,25 cookies
- Et ainsi de suite...

## Formatage des Nombres

### Format Décimal Standard

```yaml
decimal-format: "#,###.#"
```

Ce format est utilisé quand le format court est désactivé.

### Format de Nombres Courts

Pour les grands nombres, activez le format court avec des suffixes :

```yaml
short-number-format:
  enabled: true
  decimal-format: "#.##"
  suffixes:
    - ""       # < 1 000
    - "K"      # Milliers
    - "M"      # Millions
    - "Md"     # Milliards
    - "T"      # Billions
    - "Qa"     # Quadrillions
    - "Qi"     # Quintillions
    - "Sx"     # Sextillions
    - "Sp"     # Septillions
    - "Oc"     # Octillions
```

| Option | Description |
|--------|-------------|
| `enabled` | Activer/désactiver le formatage court des nombres |
| `decimal-format` | Motif de format décimal pour les nombres courts |
| `suffixes` | Liste des suffixes pour chaque magnitude |

**Exemples :**
| Valeur | Formaté |
|--------|---------|
| 500 | 500 |
| 1 234 | 1.23K |
| 5 678 901 | 5.68M |
| 1 234 567 890 | 1.23Md |

## Exemple de Configuration Complète

```yaml
# Configuration de la base de données
sql:
  type: SQLITE
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  database: zcookieclicker
  prefix: "zcookieclicker_"
  retry: 5
  debug: false

# Pourcentage d'augmentation du prix par achat d'amélioration
price-upgrade-percent: 15

# Format de nombre standard
decimal-format: "#,###.#"

# Format de nombres courts pour les grands nombres
short-number-format:
  enabled: true
  decimal-format: "#.##"
  suffixes:
    - ""
    - "K"
    - "M"
    - "Md"
    - "T"
    - "Qa"
    - "Qi"
    - "Sx"
    - "Sp"
    - "Oc"

# Définitions des améliorations (voir la page Améliorations pour les détails)
upgrades:
  - type: "MANUAL_CLICK"
    cost: 10
    cps: 0.1
  # ... plus d'améliorations
```

## Conseils de Configuration

### Équilibrer l'Échelle de Prix

- **Pourcentage bas (5-10%)** : Progression rapide, plus facile d'acheter beaucoup d'améliorations
- **Pourcentage standard (15%)** : Progression équilibrée similaire au Cookie Clicker original
- **Pourcentage élevé (20-30%)** : Progression lente, plus de grinding requis

### Personnalisation du Format des Nombres

Vous pouvez personnaliser les suffixes pour la langue de votre serveur :

```yaml
# Exemple français
suffixes:
  - ""
  - "K"
  - "M"
  - "Md"    # Milliard
  - "T"
```

### Recommandations de Base de Données

- **Serveur Unique** : Utilisez SQLite pour la simplicité
- **Serveurs Multiples** : Utilisez MySQL/MariaDB (note : les données ne sont pas synchronisées, juste stockées à distance)
- **Grande Base de Joueurs** : Utilisez MySQL/MariaDB avec pooling de connexions
