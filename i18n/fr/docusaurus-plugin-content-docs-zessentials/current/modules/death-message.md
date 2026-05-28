---
sidebar_position: 4
title: Module Death Message
description: Messages de mort personnalisables avec support des kills joueurs, mobs, MythicMobs et configuration par cause
---

# Module Death Message

**Fichier :** `modules/death_message/config.yml`

Le module Death Message vous permet de personnaliser entierement les messages de mort affiches dans le chat. Vous pouvez choisir entre les messages vanilla, les desactiver completement, ou utiliser des messages personnalises avec une configuration par cause.

---

## Configuration

```yaml
# Activer ou desactiver ce module
enable: true

# Permettre aux joueurs avec la permission essentials.silent.death de mourir sans message de mort
allow-silent-death: false

# Type de message de mort :
# - DISABLE : Aucun message de mort ne sera affiche
# - DEFAULT : Utiliser les messages de mort vanilla de Minecraft
# - CUSTOM : Utiliser les messages personnalises definis ci-dessous
death-message-type: CUSTOM
```

### Types de Messages de Mort

| Type | Description |
|------|-------------|
| `DISABLE` | Aucun message de mort n'est affiche |
| `DEFAULT` | Utilise les messages de mort vanilla de Minecraft (aucun changement) |
| `CUSTOM` | Utilise les messages personnalises definis dans la configuration |

---

## Messages Personnalises

Lorsque `death-message-type` est defini sur `CUSTOM`, vous pouvez definir plusieurs messages pour chaque cause de mort. Si plusieurs messages sont definis pour une cause, l'un d'entre eux sera choisi aleatoirement.

### Placeholders Disponibles

| Placeholder | Description | Disponibilite |
|-------------|-------------|---------------|
| `%player%` | Nom du joueur qui est mort | Toutes les causes |
| `%displayName%` | Nom d'affichage du joueur qui est mort | Toutes les causes |
| `%killer%` | Nom du joueur qui a tue | Cause `PLAYER` uniquement |
| `%mob%` | Nom du mob qui a tue | Causes `MOB` et `MYTHIC_MOB` uniquement |
| `%cause%` | La cause de mort formatee | Toutes les causes |
| `%weapon%` | L'arme utilisee par le tueur (avec evenement de survol) | Cause `PLAYER` uniquement |

### Causes Supportees

| Cause | Description |
|-------|-------------|
| `GENERIC` | Message par defaut quand aucune cause specifique ne correspond |
| `PLAYER` | Mort par un autre joueur |
| `MOB` | Mort par un mob vanilla |
| `MYTHIC_MOB` | Mort par une creature MythicMobs (necessite MythicMobs) |
| `FALL` | Chute d'une hauteur elevee |
| `DROWNING` | Noyade dans l'eau |
| `FIRE` | Brulure dans le feu |
| `LAVA` | Nage dans la lave |
| `VOID` | Chute hors du monde |
| `LIGHTNING` | Frappe par la foudre |
| `STARVATION` | Mort de faim |
| `SUFFOCATION` | Suffocation dans un mur |
| `EXPLOSION` | Explosion |
| `POISON` | Mort par empoisonnement |
| `WITHER` | Effet de wither |
| `CRAMMING` | Ecrasement d'entites |
| `FLY_INTO_WALL` | Energie cinetique (elytra) |
| `FREEZE` | Mort de froid |

Toutes les valeurs vanilla de `DamageCause` sont supportees.

### Exemple de Configuration

```yaml
custom-messages:
  GENERIC:
    - "#99E0FF%player% &7est mort."
  PLAYER:
    - "#99E0FF%player% &7a ete tue par #34cfe0%killer%&7."
    - "#34cfe0%killer% &7a tue #99E0FF%player%&7."
  MOB:
    - "#99E0FF%player% &7a ete tue par &c%mob%&7."
  MYTHIC_MOB:
    - "#99E0FF%player% &7a ete terrasse par <gradient:#ff6600:#ff0000>%mob%</gradient>&7 !"
  FALL:
    - "#99E0FF%player% &7est tombe de haut."
    - "#99E0FF%player% &7a touche le sol trop violemment."
  DROWNING:
    - "#99E0FF%player% &7s'est noye."
  LAVA:
    - "#99E0FF%player% &7a essaye de nager dans la lave."
```

---

## Commandes

| Commande | Alias | Description | Permission |
|----------|-------|-------------|------------|
| `/deathmessage` | `/dm`, `/deathmsg` | Activer/desactiver la visibilite des messages de mort pour soi-meme | `essentials.deathmessage` |

---

## Permissions

| Permission | Description |
|------------|-------------|
| `essentials.deathmessage` | Permet d'activer/desactiver la visibilite des messages de mort |
| `essentials.silent.death` | Le joueur meurt sans qu'aucun message de mort ne soit affiche (necessite `allow-silent-death: true`) |
