---
sidebar_position: 1
title: Vue d'ensemble des Modules
description: Vue d'ensemble de tous les modules de zEssentials
---

# Vue d'ensemble des Modules

zEssentials repose sur une **architecture modulaire** dans laquelle chaque fonctionnalite est encapsulee dans son propre module independant. Chaque module possede son propre fichier de configuration, situe dans le repertoire `modules/`, et peut etre active ou desactive individuellement. Cette conception vous permet de n'executer que les fonctionnalites dont votre serveur a besoin, reduisant ainsi la charge et evitant les conflits avec d'autres plugins.

---

## Modules Disponibles

Le tableau suivant liste les 22 modules inclus dans zEssentials :

| Module | Fichier de Configuration | Description |
|--------|--------------------------|-------------|
| [AFK](./afk) | `modules/afk/config.yml` | Detection d'inactivite (Away From Keyboard) et systeme d'expulsion automatique |
| [AutoMessage](./automessage) | `modules/automessage/config.yml` | Messages de diffusion automatiques a intervalles configurables |
| [Chat](./chat) | `modules/chat/config.yml` | Formatage du chat, canaux et outils de moderation |
| [Discord](./discord) | `modules/discord/config.yml` | Integration Discord pour la communication serveur-Discord |
| [Economy](./economy) | `modules/economy/config.yml` | Systeme economique multi-devises avec integration Vault |
| [Hologram](./hologram) | `modules/hologram/config.yml` | Affichages holographiques de texte dans le monde du jeu |
| [Home](./home) | `modules/home/config.yml` | Systeme de teleportation aux residences des joueurs |
| [Items](./items) | `modules/items/config.yml` | Definitions et gestion d'objets personnalises |
| [JoinQuit](./join-quit) | `modules/join_quit/config.yml` | Messages personnalisables de connexion, deconnexion et premiere connexion avec MOTD |
| [Kits](./kits) | `modules/kits/config.yml` | Kits d'objets predefinis avec temps de recharge et permissions |
| [Mailbox](./mailbox) | `modules/mailbox/config.yml` | Systeme de messagerie entre joueurs |
| [Messages](./messages) | `modules/messages/config.yml` | Messages prives et espionnage social pour le staff |
| [Rules](./rules) | `modules/rules/config.yml` | Systeme d'affichage des regles du serveur |
| [Sanction](./sanction) | `modules/sanction/config.yml` | Systeme de sanctions des joueurs (bannissement, mute, expulsion, avertissement) |
| [Scoreboard](./scoreboard) | `modules/scoreboard/config.yml` | Affichage personnalisable du scoreboard lateral |
| [Spawn](./spawn) | `modules/spawn/config.yml` | Gestion du point d'apparition du serveur et teleportation |
| [Steps](./steps) | `modules/steps/config.yml` | Systeme de progression et de suivi par etapes |
| [Teleportation](./teleportation) | `modules/teleportation/config.yml` | Demandes de teleportation (TPA), retour et teleportation aleatoire |
| [Vault](./vault) | `modules/vault/config.yml` | Coffres de stockage personnels des joueurs |
| [Vote](./vote) | `modules/vote/config.yml` | Systeme de recompenses de vote pour les listes de serveurs |
| [Warp](./warp) | `modules/warp/config.yml` | Systeme de warps du serveur avec affichage optionnel en inventaire |
| [WorldEdit](./worldedit) | `modules/worldedit/config.yml` | Outils de manipulation de blocs integres avec integration economique |

---

## Activer et Desactiver les Modules

Chaque fichier de configuration de module contient une option `enable` en haut du fichier. Pour desactiver un module, definissez cette valeur sur `false` :

```yaml
enable: false
```

Pour reactiver un module, remettez la valeur sur `true` :

```yaml
enable: true
```

:::warning
Apres avoir modifie la valeur `enable` dans le fichier de configuration d'un module, vous devez **redemarrer le serveur** pour que le changement prenne effet. Un simple rechargement de la configuration ne suffit pas pour activer ou desactiver completement un module.
:::

---

## Structure des Fichiers de Configuration

Chaque module stocke sa configuration dans le chemin suivant :

```
plugins/zEssentials/modules/<nom-du-module>/config.yml
```

Par exemple, la configuration du module Economy se trouve a l'emplacement :

```
plugins/zEssentials/modules/economy/config.yml
```

:::tip
Tous les modules suivent la meme structure generale : une option `enable` en haut suivie des options specifiques au module. Consultez la page de documentation dediee a chaque module pour un detail complet de ses options de configuration, commandes, permissions et placeholders.
:::

---

## Dependances entre Modules

La plupart des modules fonctionnent de maniere independante, mais certains modules interagissent entre eux :

- Le module **WorldEdit** utilise le module **Economy** pour facturer les joueurs lors des operations sur les blocs.
- Le module **Warp** peut utiliser les inventaires **zMenu** pour la navigation des warps via une interface graphique.
- Le module **Economy** s'integre avec **Vault** pour la compatibilite avec les plugins tiers.
- Les modules **JoinQuit**, **Rules** et **AutoMessage** lisent le contenu des messages depuis `messages.yml`.

:::info
Desactiver un module dont un autre module depend peut provoquer une degradation silencieuse de la fonctionnalite dependante. Par exemple, desactiver le module Economy empechera le module WorldEdit de facturer les joueurs, et les operations pourront echouer ou devenir gratuites selon l'implementation.
:::
