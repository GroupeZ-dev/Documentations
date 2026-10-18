---
title: Hooks & Intégrations
description: Intégrations et hooks optionnels avec d'autres plugins pour zEssentials
---

# Hooks & Intégrations

zEssentials propose des intégrations optionnelles avec des plugins tiers pour étendre ses fonctionnalités. Ces hooks sont chargés automatiquement lorsque le plugin correspondant est détecté sur le serveur, sauf indication contraire.

<CalloutContainer type="info">

<CalloutTitle>Ordre de chargement</CalloutTitle>

<CalloutDescription>
zEssentials est un plugin Paper. Toutes les intégrations ci-dessous sont déclarées comme dépendances serveur optionnelles dans son `paper-plugin.yml` (`load: BEFORE`, `required: false`) : Vault, ProtocolLib, SuperiorSkyblock2, BentoBox, BlockTracker, WorldGuard, Votifier, NChat, MythicMobs, AxVaults et PlayerVaults. Lorsqu'elles sont présentes, elles sont chargées avant zEssentials, et toutes sauf BentoBox utilisent `join-classpath: true` pour que zEssentials puisse accéder à leur API. zMenu et PlaceholderAPI sont les seules dépendances **obligatoires**.
</CalloutDescription>

</CalloutContainer>

---

## Vault

Expose le système d'économie de zEssentials via l'API [Vault](https://www.spigotmc.org/resources/vault.34315/), ce qui permet aux autres plugins d'interagir avec les soldes des joueurs grâce à l'interface standard Vault Economy.

- **Chargé dans** : `onLoad()` (avant l'initialisation des autres plugins)
- **Méthodes supportées** : `getBalance`, `deposit`, `withdraw`, `has`, `format` et toutes les autres méthodes standard de Vault Economy
- **Support des banques** : Non supporté
- **Prérequis** : Le module Économie doit être activé dans la configuration de zEssentials

Lorsque Vault est présent et que le module Économie est actif, tout plugin utilisant Vault pour l'économie utilise automatiquement zEssentials comme fournisseur.

---

## Redis

Permet la communication entre plusieurs serveurs via le pub/sub Redis, afin que les instances de zEssentials synchronisent leurs données et leurs actions en temps réel.

<CalloutContainer type="warning">

<CalloutTitle>En développement</CalloutTitle>

<CalloutDescription>
L'intégration Redis est **actuellement désactivée** dans le plugin : le serveur Redis n'est pas démarré, même avec `server-type: REDIS`. Les informations ci-dessous décrivent le fonctionnement prévu.
</CalloutDescription>

</CalloutContainer>

### Configuration

Redis se configure dans le fichier principal `config.yml` :

```yaml
server-type: REDIS

redis-configuration:
  host: "192.168.10.10"
  port: 6379
  password: "123456a"
```

Passez `server-type` à `REDIS` pour activer le mode multi-serveurs.

### Fonctionnalités

- Messages privés entre serveurs
- Annonces entre serveurs
- Expulsions entre serveurs
- Synchronisation des cooldowns entre serveurs
- Synchronisation de l'effacement et de l'activation/désactivation du chat
- Synchronisation de la liste des joueurs via un `SET` Redis

### Détails techniques

| Propriété | Valeur |
|-----------|--------|
| Canal pub/sub | `essentials:messages` |
| Clé de suivi des joueurs | `essentials:playerlist` |

### Types de messages

zEssentials utilise **7 types de messages** pour la communication entre serveurs :

| Type de message | Description |
|-----------------|-------------|
| `KickMessage` | Expulse un joueur sur l'ensemble des serveurs |
| `ServerMessage` | Envoie une annonce à tous les serveurs |
| `ChatClear` | Efface le chat sur tous les serveurs |
| `ChatToggle` | Active/désactive le chat sur tous les serveurs |
| `ServerPrivateMessage` | Transmet un message privé à un autre serveur |
| `ClearCooldown` | Supprime un cooldown sur l'ensemble des serveurs |
| `UpdateCooldown` | Synchronise les cooldowns entre serveurs |

---

## WorldGuard

S'intègre avec [WorldGuard](https://enginehub.org/worldguard) pour vérifier les permissions sur les blocs dans les régions protégées. Lorsque le module WorldEdit modifie un bloc, zEssentials teste le flag WorldGuard `BLOCK_BREAK` du joueur à cet emplacement ; les blocs que le joueur n'a pas le droit de casser sont ignorés.

- **Chargé automatiquement** : Oui, si WorldGuard est présent sur le serveur
- **Aucune configuration supplémentaire requise**

---

## SuperiorSkyblock2

S'intègre avec [SuperiorSkyblock2](https://www.spigotmc.org/resources/superiorskyblock2.87411/) pour vérifier les permissions sur les blocs des îles. Avant que le module WorldEdit ne modifie un bloc, zEssentials vérifie l'appartenance du joueur à l'île et les limites de celle-ci.

- **Chargé automatiquement** : Oui, si SuperiorSkyblock2 est présent sur le serveur
- **Vérifications effectuées** :
  - `isMember()` -- vérifie que le joueur est membre de l'île
  - `isInsideRange()` -- vérifie que l'action a lieu dans les limites de l'île
- **Aucune configuration supplémentaire requise**

---

## Plugins de protection génériques

En plus des hooks dédiés ci-dessus, zEssentials enregistre toujours un **vérificateur de permissions basé sur les événements Bukkit** (depuis la 1.0.3.6). Avant que le module WorldEdit ne modifie un bloc, il déclenche un `BlockBreakEvent` simulé pour le joueur : si un plugin de protection annule l'événement, le bloc est ignoré.

- **Toujours actif**, aucune configuration requise
- Fonctionne avec tout plugin de protection qui annule le `BlockBreakEvent` (HuskClaims, GriefPrevention, Lands, Towny, etc.)

---

## NuVotifier

S'intègre avec [NuVotifier](https://www.spigotmc.org/resources/nuvotifier.13449/) pour recevoir les notifications de vote. Lorsqu'un joueur vote sur un site de classement, NuVotifier déclenche un `VotifierEvent` que zEssentials écoute et enregistre dans son système de suivi des votes.

- **Chargé automatiquement** : Oui, si Votifier est présent sur le serveur
- **Aucune configuration supplémentaire requise**

Les votes reçus via NuVotifier alimentent le module Vote de zEssentials : compteur de votes de chaque joueur et progression de la vote party.

---

## NChat

S'intègre avec NChat pour appliquer les mutes aux messages publics comme aux messages privés. Lorsqu'un joueur est rendu muet via zEssentials, le mute s'applique aussi aux canaux de NChat.

- **Chargé automatiquement** : Oui, si NChat est présent sur le serveur
- **Priorité de l'événement** : `HIGHEST`
- **Appliqué sur** : Messages publics et messages privés
- **Aucune configuration supplémentaire requise**

---

## BlockTracker

S'intègre avec [BlockTracker](https://github.com/Krakenied/BlockTracker) pour suivre les blocs modifiés par les joueurs. C'est utile pour les fonctionnalités qui doivent distinguer les blocs générés naturellement des blocs posés par les joueurs.

- **Chargé automatiquement** : Oui, si BlockTracker est présent sur le serveur
- **Méthodes** :
  - `isTracked()` -- vérifie si un bloc a été modifié par un joueur
  - `track()` -- marque un bloc comme modifié par un joueur
- **Repli** : Si BlockTracker n'est pas installé, zEssentials utilise une implémentation `DefaultBlockTracker` dont `isTracked()` renvoie toujours `false`

---

## ProtocolLib

Intégration avec [ProtocolLib](https://www.spigotmc.org/resources/protocollib.1997/) prévue pour intercepter les paquets `SYSTEM_CHAT` et rendre le motif `./commande` cliquable dans **tous** les messages envoyés aux joueurs (et pas seulement dans le chat des joueurs).

<CalloutContainer type="warning">

<CalloutDescription>
L'écouteur de paquets ProtocolLib est **actuellement désactivé** dans le plugin. ProtocolLib est seulement déclaré comme dépendance optionnelle et n'est requis par aucun module.
</CalloutDescription>

</CalloutContainer>

- **Chargé automatiquement** : Non (désactivé)
- **Paquet intercepté** : `SYSTEM_CHAT`

Le placeholder `./commande` dans le **chat des joueurs** ne nécessite pas ProtocolLib : il est géré par le module Chat, dans la section `command-placeholder` de `modules/chat/config.yml` :

```yaml
command-placeholder: # ./<command>. placeholder
  enable: true
  result: "<hover:show_text:'<yellow>Try this command'><click:suggest_command:'/%fixed_command%'><yellow>/%command%</yellow></click></hover>"
  permission: "zessentials.chat.placeholder.command"
```

---

## MythicMobs

S'intègre avec [MythicMobs](https://www.spigotmc.org/resources/mythicmobs.5702/) pour afficher le nom des mobs personnalisés dans les messages de mort. Lorsqu'un joueur est tué par une créature MythicMobs, le module Messages de mort peut afficher le nom configuré du mob au lieu du type d'entité vanilla.

- **Chargé automatiquement** : Oui, si MythicMobs est présent sur le serveur
- **Prérequis** : Le module Messages de mort doit être activé avec `death-message-type: CUSTOM`
- **Méthodes** :
  - `isMythicMob()` -- vérifie si une entité est une créature MythicMobs
  - `getMythicMobName()` -- récupère le nom affiché de la créature MythicMobs
- **Aucune configuration supplémentaire requise**

---

## AxVaults

Permet la migration des données d'[AxVaults](https://www.spigotmc.org/resources/axvaults.103862/) vers le système de coffres de zEssentials. Il ne s'agit pas d'une intégration permanente mais d'un outil de migration ponctuel.

- **Utilisation** : Via la commande de conversion intégrée
- **Objectif** : Migrer les coffres existants des joueurs d'AxVaults vers les coffres de zEssentials

Pour migrer les données d'AxVaults, exécutez `/zessentials convert axvaults` (voir [Migration de données](../converters#axvaults)). Il en va de même pour PlayerVaults avec `/zessentials convert playervaultx`.
