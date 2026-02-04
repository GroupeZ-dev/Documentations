---
sidebar_position: 13
title: Module Règles
description: Système d'affichage des règles du serveur
---

# Module Règles

**Fichier :** `modules/rules/config.yml`

Le module Règles fournit un système configurable pour afficher les règles du serveur aux joueurs. Les règles peuvent être affichées soit via un **inventaire zMenu** interactif, soit sous forme de **messages dans le chat**, selon votre préférence. Le contenu des règles est défini séparément dans `messages.yml`.

---

## Configuration Source

```yaml
enable: true
rule-type: INVENTORY  # INVENTORY or MESSAGE
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Règles |
| `rule-type` | String | `INVENTORY` | Comment les règles sont affichées au joueur. Accepte `INVENTORY` ou `MESSAGE` |

:::info Modes d'affichage
- **`INVENTORY`** -- Les règles sont affichées via une interface d'inventaire zMenu. Cela fournit une interface graphique riche et interactive où les joueurs peuvent parcourir les règles dans un menu paginé.
- **`MESSAGE`** -- Les règles sont envoyées directement sous forme de messages dans le chat. C'est plus simple et fonctionne sans zMenu, mais offre moins de mise en forme visuelle.
:::

:::tip
Le texte et la mise en forme des règles sont configurés dans `messages.yml`, et non dans ce fichier de configuration. Ce module contrôle uniquement si le système de règles est activé et quel mode d'affichage utiliser.
:::

---

## Fonctionnement

1. Un joueur exécute la commande `/rules` (ou l'un de ses alias).
2. Le plugin vérifie le `rule-type` configuré.
3. S'il est défini sur `INVENTORY`, le plugin ouvre un inventaire zMenu affichant les règles dans un format GUI.
4. S'il est défini sur `MESSAGE`, le plugin envoie le contenu des règles directement dans le chat du joueur.

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/rules` | `?`, `help`, `aide` | `essentials.rules` | Afficher les règles du serveur au joueur |

Pour la liste complète des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Configuration dans messages.yml

:::note
Pour modifier le contenu des règles affiché aux joueurs, modifiez la section des règles dans votre fichier `messages.yml`. Le module Règles lit les entrées de messages à partir de ce fichier et les présente en utilisant le format `rule-type` choisi.
:::

---

## Exemple d'utilisation

### Mode Inventaire

Lorsque `rule-type` est défini sur `INVENTORY`, l'exécution de `/rules` ouvre une interface GUI zMenu. Vous pouvez personnaliser la disposition de l'inventaire, les icônes des items et la pagination via vos fichiers de configuration zMenu.

### Mode Message

Lorsque `rule-type` est défini sur `MESSAGE`, l'exécution de `/rules` affiche les règles directement dans le chat. C'est idéal pour les serveurs qui souhaitent une solution légère sans nécessiter que les joueurs interagissent avec une interface graphique.
