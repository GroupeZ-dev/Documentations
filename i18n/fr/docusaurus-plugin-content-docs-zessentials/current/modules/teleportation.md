---
sidebar_position: 18
title: Module Téléportation
description: Système de téléportation complet avec TPA, RTP, délais et fonctionnalités de sécurité
---

# Module Téléportation

**Fichier :** `modules/teleportation/config.yml`

Le module Téléportation est un système de téléportation complet prenant en charge les téléportations directes, les demandes de téléportation (TPA), la téléportation aléatoire (RTP), les délais configurables, les vérifications de sécurité, les minuteries de protection, les listes noires de biomes et les paramètres par monde. Il inclut un système de délais et de protection basé sur les permissions, permettant un comportement différent pour différents groupes de joueurs.

---

## Configuration Source

```yaml
enable: true
teleport-safety: true
teleport-to-center: true
teleport-delay: 5
teleport-delay-permissions:
  - permission: "essentials.teleport.delay.vip"
    delay: 4
  - permission: "essentials.teleport.delay.staff"
    delay: 2
teleport-delay-bypass: false
teleport-tpa-expire: 60
open-confirm-inventory-for-tpa: false
open-confirm-inventory-for-tpa-here: false
rtp-worlds:
  - world: "world"
    center-x: 0
    center-z: 0
    radius-x: 5000
    radius-z: 5000
  - world: "survivalspawn"
    center-x: 0
    center-z: 0
    radius-x: 5000
    radius-z: 5000
max-rtp-attempts: 10
blacklist-biomes:
  - cold_ocean
  - deep_cold_ocean
  - deep_frozen_ocean
  - deep_lukewarm_ocean
  - deep_ocean
  - deep_warm_ocean
  - frozen_ocean
  - frozen_river
  - lukewarm_ocean
  - ocean
  - river
  - warm_ocean
teleport-protection: 1000
teleport-protections:
  - permission: "essentials.teleport.protection.vip"
    delay: 2000
  - permission: "essentials.teleport.protection.staff"
    delay: 3000
enable-random-teleport-search-log-message: true
enable-rtp-queue: false
rtp-queue-delay: 2000
enable-first-join-rtp: false
first-join-rtp-world: "world"
rtp-world-overrides:
  - from: "world_nether"
    to: "world"
  - from: "world_the_end"
    to: "world"
```

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Téléportation |
| `teleport-safety` | Boolean | `true` | Si `true`, le plugin vérifie qu'il y a un emplacement d'atterrissage sûr avant de téléporter (évite la lave, le vide, la suffocation, etc.) |
| `teleport-to-center` | Boolean | `true` | Si `true`, les joueurs sont téléportés au centre du bloc (X.5, Z.5) pour un positionnement plus précis |

### Délai de Téléportation

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `teleport-delay` | Integer | `5` | Délai par défaut en secondes avant l'exécution d'une téléportation. Le joueur doit rester immobile pendant ce temps |
| `teleport-delay-bypass` | Boolean | `false` | Si `true`, tous les joueurs contournent entièrement le délai de téléportation |
| `teleport-delay-permissions` | List | *(voir ci-dessus)* | Surcharges basées sur les permissions pour le délai de téléportation. Les joueurs ayant une permission correspondante utilisent le délai spécifié au lieu de celui par défaut |
| `teleport-delay-permissions[].permission` | String | - | Le noeud de permission que le joueur doit posséder pour que cette surcharge de délai s'applique |
| `teleport-delay-permissions[].delay` | Integer | - | Le délai en secondes à utiliser pour les joueurs ayant cette permission |

:::tip
La liste `teleport-delay-permissions` est vérifiée dans l'ordre. La première permission correspondante détermine le délai du joueur. Attribuez les permissions avec soin afin que chaque joueur ne corresponde qu'à une seule entrée.
:::

### Options TPA (Demande de Téléportation)

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `teleport-tpa-expire` | Integer | `60` | Durée en secondes avant qu'une demande TPA en attente n'expire automatiquement |
| `open-confirm-inventory-for-tpa` | Boolean | `false` | Si `true`, ouvre un inventaire de confirmation zMenu pour le joueur cible lors de la réception d'une demande `/tpa` |
| `open-confirm-inventory-for-tpa-here` | Boolean | `false` | Si `true`, ouvre un inventaire de confirmation zMenu pour le joueur cible lors de la réception d'une demande `/tpahere` |

:::info
Lorsque les options d'inventaire de confirmation sont activées, le joueur recevant la demande obtient une interface graphique pour accepter ou refuser la demande au lieu de s'appuyer sur les commandes du chat. Cela nécessite que zMenu soit installé.
:::

### Options de Téléportation Aléatoire (RTP)

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `rtp-worlds` | List | *(voir ci-dessus)* | Définit quels mondes autorisent la téléportation aléatoire et la zone de recherche pour chaque monde |
| `rtp-worlds[].world` | String | - | Le nom du monde où le RTP est autorisé |
| `rtp-worlds[].center-x` | Integer | `0` | La coordonnée X du point central de la zone de recherche RTP |
| `rtp-worlds[].center-z` | Integer | `0` | La coordonnée Z du point central de la zone de recherche RTP |
| `rtp-worlds[].radius-x` | Integer | `5000` | La distance maximale depuis `center-x` sur l'axe X pour la sélection d'un emplacement aléatoire |
| `rtp-worlds[].radius-z` | Integer | `5000` | La distance maximale depuis `center-z` sur l'axe Z pour la sélection d'un emplacement aléatoire |
| `max-rtp-attempts` | Integer | `10` | Nombre maximum de tentatives pour trouver un emplacement aléatoire sûr avant d'abandonner |
| `enable-random-teleport-search-log-message` | Boolean | `true` | Si `true`, enregistre un message dans la console à chaque fois que le plugin recherche un emplacement de téléportation aléatoire |

### Liste Noire de Biomes

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `blacklist-biomes` | List of Strings | *(voir ci-dessus)* | Une liste d'identifiants de biomes où la téléportation aléatoire ne placera pas les joueurs. Si un emplacement sélectionné se trouve dans un biome de la liste noire, le plugin réessaye jusqu'à `max-rtp-attempts` fois |

:::warning
Si trop de biomes sont dans la liste noire et que la zone RTP est petite, le plugin peut épuiser toutes les tentatives sans trouver un emplacement valide. Augmentez `max-rtp-attempts` ou agrandissez le rayon RTP si les joueurs échouent fréquemment à trouver un emplacement.
:::

### Protection de Téléportation

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `teleport-protection` | Integer | `1000` | Durée de protection par défaut en millisecondes après la téléportation. Pendant ce temps, le joueur est immunisé aux dégâts |
| `teleport-protections` | List | *(voir ci-dessus)* | Surcharges basées sur les permissions pour la durée de protection de téléportation |
| `teleport-protections[].permission` | String | - | Le noeud de permission que le joueur doit posséder pour que cette surcharge de protection s'applique |
| `teleport-protections[].delay` | Integer | - | La durée de protection en millisecondes pour les joueurs ayant cette permission |

:::note
La protection de téléportation empêche les joueurs de subir des dégâts immédiatement après la téléportation. C'est particulièrement utile pour le RTP où les joueurs peuvent atterrir dans des environnements hostiles. La valeur est en **millisecondes** (par ex., `1000` = 1 seconde, `3000` = 3 secondes).
:::

### File d'Attente RTP

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable-rtp-queue` | Boolean | `false` | Si `true`, active un système de file d'attente pour les demandes RTP afin d'éviter les lags serveur causés par des recherches de téléportation aléatoire simultanées |
| `rtp-queue-delay` | Integer | `2000` | Délai en millisecondes entre le traitement de chaque demande RTP en file d'attente |

### RTP à la Première Connexion

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable-first-join-rtp` | Boolean | `false` | Si `true`, les nouveaux joueurs sont automatiquement téléportés aléatoirement lors de leur première connexion au serveur |
| `first-join-rtp-world` | String | `"world"` | Le monde dans lequel la téléportation aléatoire de première connexion a lieu. Doit être défini dans `rtp-worlds` |

:::tip
Le RTP à la première connexion est utile pour les serveurs survie qui souhaitent disperser les joueurs sur la carte dès le départ, plutôt que de faire apparaître tout le monde au même emplacement.
:::

### Paramètres par Monde

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `rtp-world-overrides` | List | *(voir ci-dessus)* | Redirige les demandes RTP d'un monde vers un autre. Si un joueur utilise `/tpr` dans un monde listé comme `from`, il est téléporté à un emplacement aléatoire dans le monde `to` à la place |
| `rtp-world-overrides[].from` | String | - | Le monde où le joueur se trouve actuellement |
| `rtp-world-overrides[].to` | String | - | Le monde cible où le joueur sera téléporté aléatoirement |

:::info
Les paramètres par monde sont utiles pour empêcher le RTP dans des dimensions comme le Nether ou l'End, redirigeant ces demandes vers l'overworld à la place.
:::

---

## Fonctionnement

1. **Téléportations Directes** (`/tp`, `/tphere`, `/tpall`) : Téléporte instantanément les joueurs vers un emplacement ou un joueur cible, soumis au délai configuré et aux vérifications de sécurité.
2. **Demandes de Téléportation** (`/tpa`, `/tpahere`) : Envoie une demande à un autre joueur. La cible peut accepter (`/tpaccept`) ou refuser (`/tpdeny`) dans le délai d'expiration. Le demandeur peut annuler avec `/tpacancel`.
3. **Téléportation Aléatoire** (`/tpr`) : Sélectionne un emplacement aléatoire dans les limites RTP configurées pour le monde actuel du joueur (ou le monde de redirection), en évitant les biomes de la liste noire, et y téléporte le joueur après les vérifications de sécurité.
4. **Retour** (`/back`) : Ramène le joueur à son emplacement précédent avant la dernière téléportation.
5. **Téléportations Verticales** (`/top`, `/bottom`) : Téléporte le joueur au bloc sûr le plus haut ou le plus bas à ses coordonnées X/Z actuelles.
6. **Téléportation de Monde** (`/worldtp`) : Téléporte un joueur vers un monde spécifique.

---

## Commandes Associées

| Commande | Permission | Description |
|----------|------------|-------------|
| `/tp` | `essentials.tp` | Se téléporter vers un joueur ou des coordonnées |
| `/tpall` | `essentials.tpall` | Téléporter tous les joueurs connectés vers vous |
| `/tphere` | `essentials.tphere` | Téléporter un joueur à votre emplacement |
| `/tpa` | `essentials.tpa` | Envoyer une demande de téléportation à un joueur |
| `/tpahere` | `essentials.tpahere` | Demander à un joueur de se téléporter vers vous |
| `/tpaccept` | `essentials.tpaccept` | Accepter une demande de téléportation en attente |
| `/tpdeny` | `essentials.tpdeny` | Refuser une demande de téléportation en attente |
| `/tpacancel` | `essentials.tpacancel` | Annuler votre demande de téléportation sortante |
| `/back` | `essentials.back` | Se téléporter à votre emplacement précédent |
| `/tpr` (rtp) | `essentials.rtp` | Se téléporter à un emplacement aléatoire |
| `/top` | `essentials.top` | Se téléporter au bloc le plus haut à votre position |
| `/bottom` | `essentials.bottom` | Se téléporter au bloc sûr le plus bas à votre position |
| `/worldtp` | `essentials.worldtp` | Se téléporter vers un monde spécifique |

Pour la liste complète des commandes, consultez [Commandes & Permissions](../commands-permissions).

---

## Permissions Associées

| Permission | Description |
|------------|-------------|
| `essentials.teleport.delay.vip` | Accorde le délai de téléportation VIP (4 secondes dans la configuration par défaut) |
| `essentials.teleport.delay.staff` | Accorde le délai de téléportation staff (2 secondes dans la configuration par défaut) |
| `essentials.teleport.protection.vip` | Accorde la protection de téléportation VIP (2000ms dans la configuration par défaut) |
| `essentials.teleport.protection.staff` | Accorde la protection de téléportation staff (3000ms dans la configuration par défaut) |

:::note
Les noeuds de permission et leurs valeurs associées sont entièrement configurables. Les permissions listées ci-dessus proviennent de la configuration par défaut et peuvent être modifiées pour correspondre à la structure de permissions de votre serveur.
:::

---

## Exemple : Configuration Serveur Survie

Une configuration typique de serveur survie avec des limites RTP généreuses et l'exclusion des biomes océaniques :

```yaml
enable: true
teleport-safety: true
teleport-to-center: true
teleport-delay: 5
teleport-delay-permissions:
  - permission: "essentials.teleport.delay.donor"
    delay: 2
  - permission: "essentials.teleport.delay.staff"
    delay: 0
teleport-delay-bypass: false
teleport-tpa-expire: 120
rtp-worlds:
  - world: "world"
    center-x: 0
    center-z: 0
    radius-x: 10000
    radius-z: 10000
max-rtp-attempts: 20
blacklist-biomes:
  - ocean
  - deep_ocean
teleport-protection: 3000
enable-first-join-rtp: true
first-join-rtp-world: "world"
```
