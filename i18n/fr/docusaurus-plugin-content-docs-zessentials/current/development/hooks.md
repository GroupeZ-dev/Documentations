---
sidebar_position: 1
title: Hooks & Integrations
description: Integrations et hooks optionnels de plugins pour zEssentials
---

# Hooks & Integrations

zEssentials fournit des integrations optionnelles avec des plugins tiers pour etendre ses fonctionnalites. Ces hooks sont charges automatiquement lorsque le plugin correspondant est detecte sur le serveur, sauf indication contraire.

---

## Vault

Expose le systeme d'economie de zEssentials via l'API [Vault](https://www.spigotmc.org/resources/vault.34315/), permettant a d'autres plugins d'interagir avec les soldes des joueurs en utilisant l'interface standard Vault Economy.

- **Charge dans** : `onLoad()` (avant l'initialisation des autres plugins)
- **Methodes supportees** : `getBalance`, `deposit`, `withdraw`, `has`, `format`, et toutes les autres methodes standard de Vault Economy
- **Support bancaire** : Non supporte
- **Prerequis** : Le module d'economie doit etre active dans la configuration de zEssentials

Lorsque Vault est present et que le module d'economie est actif, tout plugin dependant de Vault pour les operations economiques utilisera automatiquement zEssentials comme fournisseur d'economie.

---

## Redis

Permet la communication multi-serveur via Redis pub/sub, permettant aux instances de zEssentials sur plusieurs serveurs de synchroniser les donnees et les actions en temps reel.

### Configuration

Redis est configure dans le fichier principal `config.yml` :

```yaml
server-type: REDIS

redis-configuration:
  host: "127.0.0.1"
  port: 6379
  password: ""
```

Definissez `server-type` sur `REDIS` pour activer le mode multi-serveur.

### Fonctionnalites

- Messages prives inter-serveurs
- Diffusions inter-serveurs
- Expulsions inter-serveurs
- Synchronisation des cooldowns entre serveurs
- Synchronisation de l'effacement et du basculement du chat
- Synchronisation de la liste des joueurs via Redis `SET`

### Details Techniques

| Propriete | Valeur |
|-----------|--------|
| Canal Pub/Sub | `essentials:messages` |
| Cle de suivi des joueurs | `essentials:playerlist` |

### Types de Messages

zEssentials utilise **7 types de messages** pour la communication inter-serveurs :

| Type de Message | Description |
|-----------------|-------------|
| `KickMessage` | Expulse un joueur a travers les serveurs |
| `ServerMessage` | Envoie une diffusion a tous les serveurs |
| `ChatClear` | Efface le chat sur tous les serveurs |
| `ChatToggle` | Bascule l'etat du chat sur tous les serveurs |
| `ServerPrivateMessage` | Delivre un message prive inter-serveur |
| `ClearCooldown` | Efface un cooldown specifique a travers les serveurs |
| `UpdateCooldown` | Synchronise les minuteurs de cooldown a travers les serveurs |

---

## WorldGuard

S'integre avec [WorldGuard](https://enginehub.org/worldguard) pour bloquer la verification des permissions dans les regions protegees. Lorsqu'un joueur tente d'effectuer une action dans une region protegee par WorldGuard, zEssentials verifie le flag `BLOCK_BREAK` pour determiner si l'action est autorisee.

- **Chargement automatique** : Oui, si WorldGuard est present sur le serveur
- **Aucune configuration supplementaire requise**

---

## SuperiorSkyblock2

S'integre avec [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) pour bloquer la verification des permissions sur les iles. zEssentials verifie l'appartenance a l'ile et sa portee avant d'autoriser certaines actions.

- **Chargement automatique** : Oui, si SuperiorSkyblock2 est present sur le serveur
- **Verifications effectuees** :
  - `isMember()` -- verifie que le joueur est membre de l'ile
  - `isInsideRange()` -- verifie que l'action se produit dans les limites de l'ile
- **Aucune configuration supplementaire requise**

---

## NuVotifier

S'integre avec [NuVotifier](https://www.spigotmc.org/resources/nuvotifier.13449/) pour recevoir les notifications de vote. Lorsqu'un joueur vote sur un site de liste de serveurs, NuVotifier declenche un `VotifierEvent` que zEssentials ecoute et enregistre dans son systeme de suivi des votes.

- **Chargement automatique** : Oui, si Votifier est present sur le serveur
- **Aucune configuration supplementaire requise**

Les votes recus via NuVotifier sont injectes dans le module de vote de zEssentials, contribuant aux compteurs de votes par joueur et a la progression de la vote party.

---

## NChat

S'integre avec NChat pour appliquer les sanctions de mute sur les messages publics et prives. Lorsqu'un joueur est mute via zEssentials, le mute est egalement applique aux canaux de messages NChat.

- **Chargement automatique** : Oui, si NChat est present sur le serveur
- **Priorite d'evenement** : `HIGHEST`
- **Applique sur** : Messages publics et messages prives
- **Aucune configuration supplementaire requise**

---

## BlockTracker

S'integre avec [BlockTracker](https://github.com/Krakenied/BlockTracker) pour suivre les modifications de blocs effectuees par les joueurs. Ceci est utile pour les fonctionnalites qui doivent distinguer les blocs generes naturellement des blocs places par les joueurs.

- **Chargement automatique** : Oui, si BlockTracker est present sur le serveur
- **Methodes** :
  - `isTracked()` -- verifie si un bloc a ete modifie par un joueur
  - `track()` -- marque un bloc comme modifie par un joueur
- **Repli** : Si BlockTracker n'est pas installe, zEssentials utilise une implementation `DefaultBlockTracker` ou `isTracked()` retourne toujours `false`

---

## ProtocolLib

S'integre avec [ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/) pour intercepter les paquets `SYSTEM_CHAT` et ajouter des suggestions de commandes cliquables aux messages du chat.

- **Chargement automatique** : Oui, si ProtocolLib est present sur le serveur
- **Paquet intercepte** : `SYSTEM_CHAT`
- **Modele** : `./command` -- le texte correspondant a ce modele dans les messages du chat devient cliquable, suggerant la commande lorsqu'on clique dessus

### Configuration

Configure dans `modules/chat/config.yml` sous la section `command-placeholder` :

```yaml
command-placeholder:
  enabled: true
  # Additional settings for command suggestion behavior
```

---

## AxVaults

Fournit la migration de donnees depuis [AxVaults](https://www.spigotmc.org/resources/axvaults.103560/) vers le systeme de coffres de zEssentials. Ce n'est pas une integration en temps d'execution mais un outil de migration ponctuel.

- **Utilisation** : Accessible via la commande de convertisseur integree
- **Objectif** : Migre les donnees de coffres joueurs existantes d'AxVaults vers les coffres de zEssentials

Pour migrer les donnees depuis AxVaults, utilisez la commande de convertisseur de zEssentials et selectionnez AxVaults comme source.
