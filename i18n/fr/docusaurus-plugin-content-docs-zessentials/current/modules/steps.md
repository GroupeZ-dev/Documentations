---
sidebar_position: 17
title: Module Étapes
description: Système de suivi de progression par étapes
---

# Module Étapes

**Fichier :** `modules/steps/config.yml`

Le module Étapes fournit un système léger de suivi de progression pour les joueurs. Chaque étape est une entrée nommée qui peut être créée et terminée via l'API ou les commandes. Les étapes suivent le temps de jeu entre la création et l'achèvement et peuvent stocker des données JSON personnalisées, ce qui les rend idéales pour les tutoriels, les jalons de quêtes, les parcours d'intégration ou tout mécanisme de progression séquentielle.

---

## Configuration Source

```yaml
enable: true
steps:
  - name: "step-1"
  - name: "step-2"
  - name: "step-3"
  - name: "step-4"
```

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Étapes |
| `steps` | List | *(voir ci-dessus)* | La liste des définitions d'étapes disponibles pour le suivi de progression des joueurs |

### Entrées d'Étapes

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `steps[].name` | String | - | L'identifiant unique de cette étape. Utilisé par les commandes et l'API pour référencer l'étape |

:::info
Les étapes constituent un système de progression léger. Chaque étape est une entrée nommée qui peut être créée et terminée via l'API ou les commandes. Lorsqu'une étape est créée pour un joueur, le suivi du temps de jeu commence. Lorsque l'étape est terminée, le temps de jeu écoulé entre la création et l'achèvement est enregistré.
:::

:::tip
Les étapes peuvent stocker des données JSON personnalisées, vous permettant d'attacher des métadonnées arbitraires à chaque instance d'étape. C'est utile pour stocker des informations contextuelles telles que des coordonnées, des données d'objets ou des conditions d'achèvement aux côtés de l'enregistrement de l'étape.
:::

:::note
Les noms d'étapes définis dans la configuration servent de modèles d'étapes disponibles. Vous devez définir une étape ici avant qu'elle puisse être créée pour un joueur via les commandes ou l'API.
:::

---

## Fonctionnement

1. Définissez les noms de vos étapes dans la liste `steps` du fichier de configuration.
2. Lorsqu'un joueur atteint un point de progression, créez l'étape pour lui en utilisant la commande `/step` ou l'API Steps. Cela commence le suivi de son temps de jeu pour cette étape.
3. Lorsque le joueur accomplit l'objectif associé à cette étape, terminez l'étape. Le module enregistre le temps de jeu total passé entre la création et l'achèvement.
4. Des données JSON personnalisées peuvent être attachées aux étapes lors de la création ou de l'achèvement pour un contexte supplémentaire.

---

## Commandes Associées

| Commande | Permission | Description |
|----------|------------|-------------|
| `/step` | `essentials.step` | Gérer les étapes des joueurs (créer, terminer et consulter la progression des étapes) |

Pour la liste complète des commandes, consultez [Commandes & Permissions](../commands-permissions).

---

## Événements Associés

| Événement | Description |
|-----------|-------------|
| `StepCreateEvent` | Déclenché lorsqu'une nouvelle étape est créée pour un joueur. Peut être utilisé pour déclencher des actions au début d'une phase de progression |
| `StepFinishEvent` | Déclenché lorsqu'une étape est marquée comme terminée pour un joueur. Peut être utilisé pour accorder des récompenses ou passer à la phase suivante |

:::tip
Vous pouvez écouter les événements `StepCreateEvent` et `StepFinishEvent` dans vos propres plugins ou addons pour construire une logique de progression personnalisée, comme créer automatiquement l'étape suivante lorsque l'étape en cours est terminée.
:::

---

## Exemple : Progression de Tutoriel

Définissez une série d'étapes pour un tutoriel de nouveau joueur :

```yaml
enable: true
steps:
  - name: "tutorial-welcome"
  - name: "tutorial-crafting"
  - name: "tutorial-building"
  - name: "tutorial-combat"
  - name: "tutorial-complete"
```

Utilisez l'API ou les commandes pour créer `tutorial-welcome` lorsque le joueur se connecte pour la première fois, puis terminez chaque étape et créez la suivante au fur et à mesure que le joueur progresse dans les phases du tutoriel. Le suivi du temps de jeu vous permet d'analyser combien de temps les joueurs passent sur chaque section du tutoriel.
