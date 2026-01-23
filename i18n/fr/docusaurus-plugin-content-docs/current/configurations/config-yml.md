---
sidebar_position: 11
title: Config.yml
description: Reference du fichier de configuration principal
---

# Config.yml

Le fichier `config.yml` est le fichier de configuration principal de zMenu. Il controle les parametres globaux du plugin, la configuration de la base de donnees, les options de performance et plus encore.

## Emplacement du fichier

`plugins/zMenu/config.yml`

## Reference complete de la configuration

```yaml
#######################################
#       Parametres de debug           #
#######################################

# Activer les messages de debug dans la console
enable-debug: false

# Activer les informations de timing de debug
enable-debug-time: false

#######################################
#      Parametres de stockage         #
#######################################

# Type de stockage pour les donnees joueur
# Options : SQLITE, MYSQL, MARIADB, NONE
storage-type: SQLITE

# Configuration de la base de donnees (pour MySQL/MariaDB)
database-configuration:
  table-prefix: "zmenu_"
  host: "localhost"
  port: 3306
  user: "username"
  password: "password"
  database: "zmenu"

#######################################
#     Parametres de formatage         #
#######################################

# Activer le format MiniMessage (Paper/Purpur uniquement)
# Cela permet le formatage moderne comme <gradient:red:blue>
enable-mini-message-format: true

#######################################
#    Parametres de performance        #
#######################################

# Mettre en cache les item stacks pour de meilleures performances
enable-cache-item-stack: true

# Activer le cache PlaceholderAPI
enable-cache-placeholder-api: false

# Duree du cache PlaceholderAPI (ticks, 20 = 1 seconde)
cache-placeholder-api: 20

# Mettre en cache les donnees des joueurs hors ligne (secondes)
cache-offline-player: 300

#######################################
#        Parametres de clic           #
#######################################

# Activer le cooldown de clic pour prevenir le spam de clics
enable-cooldown-click: true

# Duree du cooldown (millisecondes)
cooldown-click-milliseconds: 100

#######################################
#      Parametres de securite         #
#######################################

# Activer la protection anti-duplication
enable-anti-dupe: true

# Logger quand les joueurs ouvrent des inventaires
enable-player-open-inventory-logs: true

#######################################
#        Parametres de menu           #
#######################################

# Nom de l'inventaire du menu principal par defaut
main-menu: "example"

# Utiliser la touche d'echange de main secondaire (F) pour ouvrir le menu principal
use-swap-item-off-hand-key-to-open-main-menu: false
```

## Options de configuration expliquees

### Parametres de debug

#### enable-debug

Active les messages de debug detailles dans la console. Utile pour resoudre les problemes.

```yaml
enable-debug: false
```

**Quand activer :**
- Resolution de problemes de chargement d'inventaire
- Debug de problemes de placeholder
- Signalement de bugs au developpeur

---

#### enable-debug-time

Affiche les informations de timing pour les operations.

```yaml
enable-debug-time: false
```

---

### Parametres de stockage

#### storage-type

Determine comment les donnees joueur sont stockees.

| Type | Description |
|------|-------------|
| `SQLITE` | Base de donnees locale basee sur fichier (par defaut) |
| `MYSQL` | Serveur MySQL |
| `MARIADB` | Serveur MariaDB |
| `NONE` | Pas de stockage persistant |

```yaml
storage-type: SQLITE
```

**Recommandations :**
- **Serveur unique** : Utilisez `SQLITE`
- **Reseau/BungeeCord** : Utilisez `MYSQL` ou `MARIADB`
- **Pas de donnees joueur necessaires** : Utilisez `NONE`

---

#### database-configuration

Parametres de connexion MySQL/MariaDB.

```yaml
database-configuration:
  table-prefix: "zmenu_"
  host: "localhost"
  port: 3306
  user: "minecraft"
  password: "mot_de_passe_securise"
  database: "minecraft_db"
```

| Option | Description |
|--------|-------------|
| `table-prefix` | Prefixe pour les tables de la base de donnees |
| `host` | Adresse du serveur de base de donnees |
| `port` | Port de la base de donnees (defaut : 3306) |
| `user` | Nom d'utilisateur de la base de donnees |
| `password` | Mot de passe de la base de donnees |
| `database` | Nom de la base de donnees |

---

### Parametres de formatage

#### enable-mini-message-format

Active le formatage MiniMessage pour le texte. **Fonctionne uniquement sur Paper/Purpur/Pufferfish**.

```yaml
enable-mini-message-format: true
```

Quand active, vous pouvez utiliser :
```yaml
name: "<gradient:red:blue>Texte en degrade</gradient>"
lore:
  - "<rainbow>Arc-en-ciel !</rainbow>"
  - "<bold><gold>Or en gras</gold></bold>"
```

---

### Parametres de performance

#### enable-cache-item-stack

Met en cache les ItemStacks crees pour ameliorer les performances.

```yaml
enable-cache-item-stack: true
```

**Recommandation :** Gardez active sauf si vous rencontrez des problemes.

---

#### enable-cache-placeholder-api

Met en cache les resultats de PlaceholderAPI pour reduire la charge d'analyse.

```yaml
enable-cache-placeholder-api: false
```

:::warning
Activer ceci signifie que les placeholders ne se mettront pas a jour instantanement. Utilisez avec precaution.
:::

---

#### cache-placeholder-api

Duree de mise en cache des resultats de placeholder (en ticks).

```yaml
cache-placeholder-api: 20  # 1 seconde
```

---

#### cache-offline-player

Combien de temps mettre en cache les donnees des joueurs hors ligne (secondes).

```yaml
cache-offline-player: 300  # 5 minutes
```

---

### Parametres de clic

#### enable-cooldown-click

Empeche le spam de clics en ajoutant un cooldown entre les clics.

```yaml
enable-cooldown-click: true
```

---

#### cooldown-click-milliseconds

La duree du cooldown entre les clics.

```yaml
cooldown-click-milliseconds: 100  # 0.1 secondes
```

**Ajustez selon vos besoins :**
- Plus bas = Plus reactif, risque de double-clics accidentels
- Plus haut = Plus sur, peut sembler lent

---

### Parametres de securite

#### enable-anti-dupe

Active le systeme anti-duplication d'items.

```yaml
enable-anti-dupe: true
```

Cela detecte et empeche les exploits courants de duplication d'items impliquant les GUIs d'inventaire.

---

#### enable-player-open-inventory-logs

Enregistre quand les joueurs ouvrent des inventaires zMenu.

```yaml
enable-player-open-inventory-logs: true
```

Utile pour :
- Surveiller l'activite des joueurs
- Debugger les problemes
- Audit de securite

---

### Parametres de menu

#### main-menu

L'inventaire par defaut ouvert par le type de bouton `MAIN_MENU` et le raccourci touche F.

```yaml
main-menu: "example"
```

Cela doit correspondre a un nom de fichier d'inventaire (sans `.yml`) dans votre dossier `inventories/`.

---

#### use-swap-item-off-hand-key-to-open-main-menu

Permet aux joueurs d'appuyer sur F (touche d'echange de main secondaire) pour ouvrir le menu principal.

```yaml
use-swap-item-off-hand-key-to-open-main-menu: false
```

**Quand activer :**
- Vous voulez un acces facile au menu sans commandes
- Votre serveur a un menu hub principal

**Quand garder desactive :**
- Les joueurs ont besoin de la touche F pour l'echange d'items reel
- Vous utilisez des packs de ressources personnalises avec des raccourcis touche F

---

## Exemples de configurations

### Serveur basique (SQLite)

```yaml
enable-debug: false
storage-type: SQLITE
enable-mini-message-format: true
enable-cache-item-stack: true
enable-anti-dupe: true
enable-cooldown-click: true
cooldown-click-milliseconds: 100
main-menu: "main"
```

### Serveur reseau (MySQL)

```yaml
enable-debug: false
storage-type: MYSQL
database-configuration:
  table-prefix: "zmenu_"
  host: "mysql.monreseau.com"
  port: 3306
  user: "zmenu_user"
  password: "mot_de_passe_securise_ici"
  database: "minecraft_network"
enable-mini-message-format: true
enable-cache-item-stack: true
enable-cache-placeholder-api: true
cache-placeholder-api: 40
enable-anti-dupe: true
main-menu: "hub_menu"
```

### Axe sur les performances

```yaml
enable-debug: false
storage-type: SQLITE
enable-cache-item-stack: true
enable-cache-placeholder-api: true
cache-placeholder-api: 60
cache-offline-player: 600
enable-cooldown-click: true
cooldown-click-milliseconds: 150
```

### Developpement/Test

```yaml
enable-debug: true
enable-debug-time: true
storage-type: SQLITE
enable-cache-item-stack: false
enable-cache-placeholder-api: false
enable-cooldown-click: false
enable-player-open-inventory-logs: true
```

## Recharger la configuration

Apres avoir effectue des modifications :

```
/zm reload config
```

Ou rechargez tout :

```
/zm reload
```

:::note
Les changements de configuration de base de donnees necessitent un redemarrage du serveur pour prendre effet.
:::

## Bonnes pratiques

1. **Commencez avec les valeurs par defaut** : Changez uniquement ce dont vous avez besoin
2. **Activez le cache sur les gros serveurs** : Ameliore les performances
3. **Utilisez MySQL pour les reseaux** : Permet le partage de donnees entre serveurs
4. **Gardez l'anti-dupe active** : Protege votre economie
5. **Testez le mode debug** : Utile lors de la configuration, desactivez en production
6. **Definissez un cooldown de clic approprie** : Equilibrez reactivite et securite

## Depannage

### Echec de connexion a la base de donnees

1. Verifiez que les identifiants sont corrects
2. Verifiez que le serveur de base de donnees fonctionne
3. Assurez-vous que la base de donnees existe
4. Verifiez que le pare-feu autorise les connexions
5. Verifiez que l'utilisateur a les permissions appropriees

### Les placeholders ne se mettent pas a jour

1. Desactivez temporairement le cache des placeholders
2. Verifiez que PlaceholderAPI est installe
3. Verifiez que l'expansion est telechargee

### Problemes de performance

1. Activez le cache d'item stack
2. Activez le cache de placeholder
3. Augmentez le cooldown de clic
4. Verifiez les boucles d'inventaire (A ouvre B ouvre A)

## Prochaines etapes

- Configurez les [Commandes personnalisees](./custom-commands)
- Configurez le stockage des [Donnees joueur](./player-data)
- Apprenez l'[API de developpement](../development/api-introduction)
