---
sidebar_position: 15
title: Module Scoreboard
description: Scoreboards dynamiques par joueur avec animations et affichage conditionnel
---

# Module Scoreboard

**Fichier :** `modules/scoreboard/config.yml`

Le module Scoreboard fournit un système de scoreboard dynamique par joueur avec prise en charge des **mises à jour de lignes basées sur les événements**, des **animations de couleurs**, et du **changement conditionnel de scoreboard** basé sur les permissions ou les placeholders. Il utilise la bibliothèque [FastBoard](https://github.com/MrMicky-FR/FastBoard) pour le rendu des scoreboards via des packets, garantissant des performances élevées et des mises à jour sans scintillement.

---

## Configuration Source

```yaml
enable: true
join-conditions:
  - priority: 0
    scoreboard: default
  - priority: 1
    scoreboard: admin
    requirements:
      - type: permission
        permission: "zessentials.scoreboard.admin"
enable-task-conditions: false
task-conditions-interval: 2
task-conditions:
  - scoreboard: event
    requirements:
      - type: placeholder
        placeholder: "%player_world%"
        value: "event"
        action: EQUALS_STRING
scoreboards:
  default:
    default: true
    title: "#53edd6zEssentials"
    lines:
      - line: 1
        text: ""
      - line: 2
        text: "&7Balance: &a%zessentials_user_formatted_balance_money%"
        event: "fr.maxlego08.essentials.api.event.events.user.UserEconomyPostUpdateEvent"
      - line: 3
        text: "&7Coins: &a%zessentials_user_formatted_balance_coins%"
        event: "fr.maxlego08.essentials.api.event.events.user.UserEconomyPostUpdateEvent"
      - line: 4
        text: ""
      - line: 5
        text: "play.essentials.fr"
        animation: COLOR_WAVE
        fromColor: "#5599ff"
        toColor: "#ffffff"
        length: 5
        delayBetween: 5000
        animationSpeed: 30
  admin:
    title: "#53edd6zEssentials"
    lines:
      - line: 1
        text: ""
      - line: 2
        text: "&7Balance: &a%zessentials_user_formatted_balance_money%"
        event: "fr.maxlego08.essentials.api.event.events.user.UserEconomyPostUpdateEvent"
      - line: 3
        text: "&7Coins: &a%zessentials_user_formatted_balance_coins%"
        event: "fr.maxlego08.essentials.api.event.events.user.UserEconomyPostUpdateEvent"
      - line: 4
        text: "&7Rank: &cAdmin"
      - line: 5
        text: ""
      - line: 6
        text: "play.essentials.fr"
        animation: COLOR_WAVE
        fromColor: "#5599ff"
        toColor: "#ffffff"
        length: 5
        delayBetween: 5000
        animationSpeed: 30
```

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Scoreboard |
| `enable-task-conditions` | Boolean | `false` | Activer les vérifications périodiques de conditions qui peuvent changer dynamiquement le scoreboard d'un joueur pendant qu'il est en ligne |
| `task-conditions-interval` | Integer | `2` | Intervalle en secondes entre les vérifications des conditions de tâche (utilisé uniquement lorsque `enable-task-conditions` est `true`) |

### Conditions de Connexion

La liste `join-conditions` détermine quel scoreboard un joueur reçoit lorsqu'il rejoint le serveur. Les entrées sont évaluées par **ordre de priorité** (la plus basse en premier). La première condition correspondante est utilisée ; si aucune ne correspond, le scoreboard marqué comme `default: true` est appliqué.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `join-conditions[].priority` | Integer | - | Priorité d'évaluation. Les valeurs les plus basses sont vérifiées en premier |
| `join-conditions[].scoreboard` | String | - | Le nom du scoreboard à assigner (doit correspondre à une clé sous `scoreboards`) |
| `join-conditions[].requirements` | List | *(optionnel)* | Une liste de conditions de type zMenu qui doivent être remplies. Si omise, la condition correspond toujours |
| `join-conditions[].requirements[].type` | String | - | Le type de condition, par ex. `permission` ou `placeholder` |
| `join-conditions[].requirements[].permission` | String | - | Le noeud de permission à vérifier (lorsque `type` est `permission`) |

### Conditions de Tâche

La liste `task-conditions` permet au plugin de réévaluer périodiquement les conditions et de changer le scoreboard d'un joueur en temps réel (par ex. lorsqu'il entre dans un monde spécifique).

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `task-conditions[].scoreboard` | String | - | Le scoreboard vers lequel basculer lorsque les conditions sont remplies |
| `task-conditions[].requirements` | List | - | Une liste de conditions à évaluer |
| `task-conditions[].requirements[].type` | String | - | Le type de condition, par ex. `placeholder` |
| `task-conditions[].requirements[].placeholder` | String | - | Le placeholder à évaluer (lorsque `type` est `placeholder`) |
| `task-conditions[].requirements[].value` | String | - | La valeur attendue pour la comparaison |
| `task-conditions[].requirements[].action` | String | - | L'action de comparaison, par ex. `EQUALS_STRING`, `EQUALS_NUMBER`, `SUPERIOR`, `INFERIOR` |

### Définitions des Scoreboards

Chaque entrée sous `scoreboards` définit un scoreboard nommé avec un titre et des lignes.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `scoreboards.<name>.default` | Boolean | `false` | Si `true`, ce scoreboard est utilisé par défaut lorsqu'aucune condition de connexion ne correspond |
| `scoreboards.<name>.title` | String | - | Le titre du scoreboard affiché en haut. Supporte les codes couleur et les couleurs hexadécimales (par ex. `#53edd6`) |
| `scoreboards.<name>.lines` | List | - | La liste des entrées de lignes affichées sur le scoreboard |

### Options de Ligne

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `lines[].line` | Integer | - | Le numéro de ligne (position sur le scoreboard, commençant à 1) |
| `lines[].text` | String | - | Le contenu textuel de la ligne. Supporte les codes couleur et les placeholders PlaceholderAPI |
| `lines[].event` | String | *(optionnel)* | Un nom de classe d'événement Bukkit/zEssentials pleinement qualifié. Lorsque cet événement se déclenche, la ligne est rafraîchie. Cela évite les mises à jour inutiles basées sur les ticks |
| `lines[].animation` | String | *(optionnel)* | Le type d'animation à appliquer à cette ligne. Supporte actuellement `COLOR_WAVE` |
| `lines[].fromColor` | String | *(optionnel)* | La couleur hexadécimale de départ pour l'animation (par ex. `#5599ff`) |
| `lines[].toColor` | String | *(optionnel)* | La couleur hexadécimale de fin pour l'animation (par ex. `#ffffff`) |
| `lines[].length` | Integer | *(optionnel)* | La longueur (en caractères) de l'effet de vague de couleur |
| `lines[].delayBetween` | Integer | *(optionnel)* | Délai en millisecondes entre les cycles d'animation |
| `lines[].animationSpeed` | Integer | *(optionnel)* | Vitesse de l'animation en millisecondes par image |

---

## Fonctionnalités Clés

### Mises à Jour Basées sur les Événements

Au lieu de mettre à jour chaque ligne sur un minuteur fixe, vous pouvez lier des lignes individuelles à des événements spécifiques. Par exemple, lier une ligne de solde à `UserEconomyPostUpdateEvent` garantit que cette ligne ne se rafraîchit que lorsque le solde du joueur change réellement. Cela réduit considérablement le trafic de packets inutile.

```yaml
- line: 2
  text: "&7Balance: &a%zessentials_user_formatted_balance_money%"
  event: "fr.maxlego08.essentials.api.event.events.user.UserEconomyPostUpdateEvent"
```

:::tip
Les lignes basées sur les événements sont l'approche recommandée pour les données qui changent rarement (soldes, rangs, statistiques). N'utilisez les mises à jour basées sur un minuteur que pour le contenu véritablement dynamique.
:::

### Animation COLOR_WAVE

L'animation `COLOR_WAVE` crée un effet de vague de dégradé fluide à travers le texte, en transitionnant entre deux couleurs hexadécimales.

```yaml
- line: 5
  text: "play.essentials.fr"
  animation: COLOR_WAVE
  fromColor: "#5599ff"
  toColor: "#ffffff"
  length: 5
  delayBetween: 5000
  animationSpeed: 30
```

| Paramètre | Description |
|-----------|-------------|
| `fromColor` | La couleur de départ de la vague |
| `toColor` | La couleur de fin de la vague |
| `length` | Le nombre de caractères que le dégradé couvre simultanément |
| `delayBetween` | Pause en millisecondes avant que l'animation ne redémarre |
| `animationSpeed` | Temps en millisecondes entre chaque image de l'animation |

### Affichage Conditionnel du Scoreboard

En utilisant `join-conditions` et `task-conditions`, vous pouvez afficher différents scoreboards à différents joueurs en fonction des permissions, des mondes, ou de n'importe quelle valeur de placeholder. Cela s'intègre avec le **système de conditions zMenu**.

:::info
Le système `task-conditions` doit être explicitement activé avec `enable-task-conditions: true`. Lorsqu'il est désactivé, les scoreboards ne sont assignés qu'à la connexion et ne changent pas dynamiquement.
:::

---

## Fonctionnement

1. Lorsqu'un joueur se connecte, le plugin évalue les `join-conditions` par ordre de priorité.
2. La première condition correspondante détermine quel scoreboard le joueur voit. Si aucune condition ne correspond, le scoreboard marqué `default: true` est utilisé.
3. Les lignes avec une propriété `event` sont enregistrées comme écouteurs d'événements et ne se mettent à jour que lorsque cet événement se déclenche.
4. Les lignes avec une propriété `animation` fonctionnent sur leur propre boucle d'animation.
5. Si `enable-task-conditions` est `true`, le plugin vérifie périodiquement les `task-conditions` et peut changer le scoreboard du joueur en temps réel.

---

## Commandes Associées

| Commande | Permission | Description |
|----------|------------|-------------|
| `/sb` | `essentials.scoreboard` | Activer ou désactiver la visibilité du scoreboard pour le joueur |

Pour la liste complète des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Bibliothèque FastBoard

Ce module utilise la bibliothèque [FastBoard](https://github.com/MrMicky-FR/FastBoard) pour le rendu des scoreboards via des packets. Cela signifie :

- Aucun scintillement lors de la mise à jour des lignes.
- Aucune interférence avec d'autres plugins qui utilisent l'API scoreboard vanilla.
- Des performances élevées même avec de nombreux joueurs en ligne.

:::warning
Comme FastBoard opère au niveau des packets, d'autres plugins qui envoient également des packets de scoreboard peuvent entrer en conflit avec ce module. Si vous rencontrez des problèmes visuels, vérifiez la présence de plugins de scoreboard en conflit.
:::
