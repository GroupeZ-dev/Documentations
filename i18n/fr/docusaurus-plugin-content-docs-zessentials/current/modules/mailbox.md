---
sidebar_position: 11
title: Module Boîte aux Lettres
description: Système de livraison d'objets hors ligne pour envoyer des objets aux joueurs
---

# Module Boîte aux Lettres

**Fichier :** `modules/mailbox/config.yml`

Le module Boîte aux Lettres fournit un système de livraison d'objets hors ligne qui permet aux joueurs et aux administrateurs d'envoyer des objets physiques à d'autres joueurs, même lorsque le destinataire est hors ligne. Les objets sont stockés dans une boîte aux lettres virtuelle que le destinataire peut ouvrir à tout moment pour récupérer ses livraisons. Les objets expirent automatiquement après une durée configurable pour éviter le stockage indéfini.

---

## Configuration Source

```yaml
enable: true
expiration: 86400  # seconds (24 hours)
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Boîte aux Lettres |
| `expiration` | Integer | `86400` | Durée en secondes avant que les objets non récupérés n'expirent et ne soient définitivement supprimés de la boîte aux lettres. `86400` secondes = 24 heures. Définir sur `0` pour désactiver l'expiration |

:::warning
Lorsque les objets expirent, ils sont définitivement supprimés et ne peuvent pas être récupérés. Choisissez une durée d'expiration qui laisse aux joueurs suffisamment de temps pour récupérer leurs livraisons. Une valeur de `86400` (24 heures) est la valeur par défaut et convient à la plupart des serveurs.
:::

---

## Fonctionnement

1. Un joueur ou un administrateur envoie un objet dans la boîte aux lettres d'un autre joueur en utilisant la commande `/mail give` ou `/mail give-hand`.
2. L'objet est stocké dans la boîte aux lettres virtuelle du destinataire, qu'il soit en ligne ou hors ligne.
3. Lorsque le destinataire se connecte (ou à tout moment en ligne), il peut ouvrir sa boîte aux lettres avec `/mail open` pour consulter et récupérer les objets en attente.
4. Si le destinataire ne récupère pas les objets dans le délai d'`expiration` configuré, les objets sont automatiquement supprimés.
5. Les administrateurs peuvent envoyer des objets à tous les joueurs en même temps en utilisant `/mail give-all` ou `/mail give-all-hand`.

:::info
Les joueurs sont notifiés lorsqu'ils ont des objets non récupérés dans leur boîte aux lettres lors de leur connexion au serveur.
:::

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/mail` | `mailbox`, `mb` | `essentials.mail` | Accéder au système de boîte aux lettres |

### Sous-commandes Mail

| Sous-commande | Description |
|---------------|-------------|
| `open` | Ouvrir votre boîte aux lettres pour consulter et récupérer les objets en attente |
| `give` | Envoyer un objet dans la boîte aux lettres d'un joueur spécifique |
| `give-hand` | Envoyer l'objet que vous tenez actuellement dans la boîte aux lettres d'un joueur |
| `clear` | Vider tous les objets de votre boîte aux lettres |
| `give-all` | Envoyer un objet dans la boîte aux lettres de chaque joueur |
| `give-all-hand` | Envoyer l'objet que vous tenez actuellement dans la boîte aux lettres de chaque joueur |

Pour la liste complète des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associés

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_mailbox_items%` | Renvoie le nombre d'objets actuellement dans la boîte aux lettres du joueur |

:::tip
Utilisez le placeholder `%zessentials_user_mailbox_items%` dans les scoreboards, hologrammes ou formats de chat pour indiquer aux joueurs combien d'objets non récupérés ils possèdent. Par exemple, vous pourriez afficher une notification dans le scoreboard lorsque la valeur est supérieure à zéro.
:::

Pour la liste complète des placeholders, voir [Placeholders](../placeholders).

---

## Exemple : Configuration de l'Expiration

### Expiration de 24 Heures (Par Défaut)

```yaml
expiration: 86400
```

Les objets expirent après 24 heures s'ils ne sont pas récupérés.

### Expiration de 7 Jours

```yaml
expiration: 604800
```

Les objets expirent après 7 jours, laissant aux joueurs plus de temps pour se connecter et récupérer leurs livraisons.

### Pas d'Expiration

```yaml
expiration: 0
```

Les objets n'expirent jamais et restent dans la boîte aux lettres indéfiniment jusqu'à ce que le joueur les récupère ou les efface.

:::warning
Désactiver l'expiration (`0`) signifie que les objets s'accumuleront indéfiniment. Sur les grands serveurs avec de nombreux joueurs, cela pourrait augmenter l'utilisation du stockage au fil du temps.
:::
