---
title: Module Spawn
description: Gestion du spawn du serveur avec un comportement de réapparition configurable
---

# Module Spawn

**Fichier :** `modules/spawn/config.yml`

Le module Spawn gère le point de spawn du serveur et le point de premier spawn, et contrôle l'endroit où les joueurs apparaissent lors de la **réapparition** et de la **connexion**. Il permet de choisir si les lits et les ancres de réapparition sont respectés, ainsi que la priorité d'événement à laquelle zEssentials gère les réapparitions et les premières connexions, afin de cohabiter avec d'autres plugins comme Multiverse.

---

## Configuration Source

```yaml
enable: true

# What priority should we use for handling respawns?
# Set this to none, if you want vanilla respawning behaviour.
# Set this to lowest, if you want Multiverse to handle the respawning.
# Set this to high, if you want zEssentials to handle the respawning.
# Set this to highest, if you want to force zEssentials to handle the respawning.
# Note: Changes will not apply until after the server is restarted.
respawn-listener-priority: highest

# What priority should we use for handling spawning on joining the server?
# See respawn-listener-priority for possible values.
# Note: Changing this may impact or break spawn-on-join functionality.
# Note: Changes will not apply until after the server is restarted.
spawn-join-listener-priority: highest

# When the player dies, does he have to respawn to the respawn anchor
respawn-at-anchor: false

# When users die, should they respawn at their first home, instead of the spawnpoint?
respawn-at-home: false

# When users die, should they respawn at their bed instead of the spawnpoint?
respawn-at-bed: true

# Allows teleporting the player to spawn when logged in
teleport-at-spawn-on-join: false
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Active ou désactive le module Spawn |
| `respawn-listener-priority` | String | `highest` | Priorité d'événement de l'écouteur de réapparition. Valeurs acceptées : `none`, `lowest`, `low`, `normal`, `high`, `highest`. `none` désactive l'écouteur (comportement vanilla) |
| `spawn-join-listener-priority` | String | `highest` | Priorité d'événement de l'écouteur qui définit le point d'apparition d'un joueur qui se connecte pour la première fois. Valeurs acceptées : `lowest`, `low`, `normal`, `high`, `highest` |
| `respawn-at-anchor` | Boolean | `false` | Si `true`, un joueur qui réapparaît à une ancre de réapparition conserve cette position. Si `false`, il est envoyé au spawn du serveur |
| `respawn-at-home` | Boolean | `false` | Réservé à une future version : la réapparition à une résidence **n'est pas encore implémentée** et cette option n'a actuellement aucun effet |
| `respawn-at-bed` | Boolean | `true` | Si `true`, un joueur qui réapparaît à son lit conserve cette position. Si `false`, il est envoyé au spawn du serveur |
| `teleport-at-spawn-on-join` | Boolean | `false` | Si `true`, les joueurs sont téléportés au spawn du serveur à chaque connexion |

<CalloutContainer type="info">

<CalloutTitle>Les priorités des écouteurs sont désormais respectées</CalloutTitle>

<CalloutDescription>
Avant la version 1.0.3.8, `respawn-listener-priority` et `spawn-join-listener-priority` étaient ignorées et les deux écouteurs étaient toujours enregistrés avec la priorité `NORMAL`. Ils utilisent maintenant la valeur configurée, `HIGHEST` par défaut, ce qui donne le dernier mot à zEssentials face aux autres plugins. Utilisez `lowest` si un autre plugin (par exemple Multiverse) doit décider à sa place.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="warning">

<CalloutDescription>
`none` n'est supporté que pour `respawn-listener-priority`. Ne l'utilisez pas pour `spawn-join-listener-priority`.
</CalloutDescription>

</CalloutContainer>

Toute modification des priorités nécessite un **redémarrage du serveur**.

---

## Comportement de Réapparition

Lorsqu'un joueur réapparaît et qu'un spawn a été défini avec `/setspawn` :

1. **Ancre de réapparition** -- Si la réapparition a lieu à une ancre et que `respawn-at-anchor` vaut `true`, l'ancre est conservée.
2. **Lit** -- Si la réapparition a lieu à un lit et que `respawn-at-bed` vaut `true`, le lit est conservé.
3. **Spawn du serveur** -- Sinon, le joueur réapparaît au spawn du serveur.

Si aucun spawn n'est défini, zEssentials ne modifie pas le point de réapparition.

<CalloutContainer type="info">

<CalloutDescription>
Pour toujours faire réapparaître les joueurs au spawn, mettez `respawn-at-anchor` et `respawn-at-bed` à `false`.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutTitle>Folia</CalloutTitle>

<CalloutDescription>
Sur Folia, le spawn du serveur est défini comme point de réapparition du joueur au moment de sa mort.
</CalloutDescription>

</CalloutContainer>

---

## Première Connexion

Le premier spawn se définit avec `/setfirstspawn`. Les nouveaux joueurs y sont envoyés uniquement si la **téléportation à la première connexion** est activée dans le fichier principal `config.yml` :

```yaml
# config.yml
enable-first-join-teleport: false
```

Cette option est **désactivée par défaut** depuis la 1.0.3.9. Lorsqu'elle est activée, un joueur qui se connecte pour la première fois apparaît au premier spawn, ou au spawn du serveur si aucun premier spawn n'est défini. Le point d'apparition est défini pendant la connexion (avec `spawn-join-listener-priority`), les nouveaux joueurs apparaissent donc directement au bon endroit.

---

## Fonctionnement

1. Un administrateur définit le point de spawn avec `/setspawn` à l'emplacement souhaité.
2. Optionnellement, un premier spawn est défini avec `/setfirstspawn` et `enable-first-join-teleport` est activé dans `config.yml`.
3. Lorsqu'un joueur meurt, l'écouteur de réapparition applique les règles ci-dessus.
4. Lorsqu'un joueur se connecte, si `teleport-at-spawn-on-join` vaut `true`, il est téléporté au spawn du serveur.
5. Les joueurs peuvent revenir au spawn à tout moment avec `/spawn`.

---

## Commandes Associées

| Commande | Permission | Description |
|----------|------------|-------------|
| `/spawn [joueur]` | `essentials.spawn` | Se téléporter au spawn du serveur. Téléporter un autre joueur nécessite `essentials.spawn.other` |
| `/setspawn` | `essentials.set.spawn` | Définit le spawn du serveur à votre position actuelle |
| `/firstspawn [joueur]` | `essentials.spawn.first` | Se téléporter au premier spawn. Téléporter un autre joueur nécessite `essentials.spawn.other` |
| `/setfirstspawn` | `essentials.set.first.spawn` | Définit le premier spawn à votre position actuelle |

Pour la liste complète des commandes, consultez [Commandes & Permissions](../commands-permissions).

---

## Configurations Courantes

### Toujours Réapparaître au Spawn

```yaml
respawn-at-anchor: false
respawn-at-bed: false
```

### Téléportation au Spawn à Chaque Connexion

Pour téléporter les joueurs au spawn à chaque connexion (utile pour les serveurs lobby) :

```yaml
teleport-at-spawn-on-join: true
```

### Laisser d'Autres Plugins Gérer la Réapparition

Pour désactiver la gestion de la réapparition par zEssentials et laisser un autre plugin (par exemple un plugin de mini-jeux) la contrôler :

```yaml
respawn-listener-priority: none
```

<CalloutContainer type="info">

<CalloutDescription>
Mettre la priorité de l'écouteur de réapparition à `none` le désactive complètement. C'est différent de `lowest`, qui traite toujours l'événement mais laisse les plugins écoutant à une priorité plus élevée modifier la position.
</CalloutDescription>

</CalloutContainer>
