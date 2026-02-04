---
sidebar_position: 2
title: Module Messages Automatiques
description: Messages de diffusion automatiques a intervalles configurables
---

# Module Messages Automatiques

**Fichier :** `modules/automessage/config.yml`

Le module AutoMessage diffuse des messages automatiques a tous les joueurs en ligne a un intervalle configurable. Il est ideal pour les annonces du serveur, les astuces, les rappels de regles, les promotions d'evenements, ou toute information recurrente que vous souhaitez que les joueurs voient regulierement. Les messages peuvent etre envoyes de maniere sequentielle ou aleatoire.

---

## Configuration Source

```yaml
enable: true
interval: 300
random-order: false
messages:
  - lines:
      - ""
      - "#ffd353ℹ ᴀɴɴᴏᴜɴᴄᴇᴍᴇɴᴛ"
      - "&7Welcome to our server! Type &f/rules &7for server rules."
      - ""
  - lines:
      - ""
      - "#ffd353ℹ ᴀɴɴᴏᴜɴᴄᴇᴍᴇɴᴛ"
      - "&7Join our Discord: &f/discord"
      - ""
```

---

## Options

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou desactiver le module AutoMessage |
| `interval` | Integer | `300` | Temps en secondes entre chaque diffusion automatique. `300` = 5 minutes |
| `random-order` | Boolean | `false` | Si `true`, les messages sont selectionnes aleatoirement a chaque intervalle. Si `false`, les messages sont diffuses sequentiellement du premier au dernier |
| `messages` | List | *(voir ci-dessus)* | La liste des entrees de messages a diffuser. Chaque entree contient une liste `lines` |
| `messages[].lines` | List of Strings | - | Les lignes individuelles de texte envoyees pour une seule diffusion. Chaque ligne est envoyee comme une ligne de chat separee a tous les joueurs |

:::info
Chaque entree de message est un bloc multiligne. Les chaines vides (`""`) produisent des lignes vierges dans le chat, ce qui est utile pour l'espacement visuel autour de vos annonces.
:::

:::tip
Les messages supportent les codes couleur classiques (prefixe `&`), les couleurs hexadecimales (`#ffd353`) et le formatage MiniMessage. Vous pouvez egalement utiliser les placeholders PlaceholderAPI dans les messages pour du contenu dynamique comme le nombre de joueurs ou les informations du serveur.
:::

---

## Fonctionnement

1. Lorsque le module est active, une tache repetitive est programmee a l'`interval` configure (en secondes).
2. A chaque execution de la tache, le prochain message est selectionne dans la liste `messages` :
   - En **mode sequentiel** (`random-order: false`), les messages sont envoyes dans l'ordre du premier au dernier, puis le cycle recommence.
   - En **mode aleatoire** (`random-order: true`), un message est choisi aleatoirement dans la liste a chaque intervalle.
3. Toutes les lignes de l'entree de message selectionnee sont envoyees a chaque joueur en ligne.

---

## Commandes Associees

Le module AutoMessage n'enregistre aucune commande specifique. Pour modifier les messages automatiques, editez le fichier `modules/automessage/config.yml` et redemarrez le serveur ou rechargez la configuration du plugin.

Pour la liste complete des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associes

Le module AutoMessage ne fournit aucun placeholder specifique. Cependant, vous pouvez utiliser n'importe quel placeholder PlaceholderAPI enregistre dans vos lignes de messages.

Pour la liste complete des placeholders, voir [Placeholders](../placeholders).

---

## Exemples

### Rotation d'Astuces

Diffuser des astuces utiles aux joueurs toutes les 3 minutes :

```yaml
enable: true
interval: 180
random-order: true
messages:
  - lines:
      - ""
      - "#ffd353ℹ ᴛɪᴘ"
      - "&7Use &f/sethome &7to save your current location!"
      - ""
  - lines:
      - ""
      - "#ffd353ℹ ᴛɪᴘ"
      - "&7You can trade items safely with &f/pay &7and &f/mail&7."
      - ""
  - lines:
      - ""
      - "#ffd353ℹ ᴛɪᴘ"
      - "&7Vote daily with &f/vote &7to earn rewards!"
      - ""
```

### Annonce d'Evenement

Promouvoir un evenement en cours avec un seul message repetitif :

```yaml
enable: true
interval: 600
random-order: false
messages:
  - lines:
      - ""
      - "&6&l⚔ EVENT &eDouble XP Weekend is active!"
      - "&7Enjoy double experience until Sunday at midnight."
      - "&7Use &f/warp event &7to join the event area."
      - ""
```

:::warning
Definir l'`interval` trop bas (par exemple, en dessous de 60 secondes) peut agacer les joueurs avec des diffusions trop frequentes. Une valeur entre 180 et 600 secondes est generalement recommandee.
:::
