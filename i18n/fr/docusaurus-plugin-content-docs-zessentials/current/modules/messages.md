---
sidebar_position: 12
title: Module Messages
description: Système de messagerie privée avec support de réponse et social spy
---

# Module Messages

**Fichier :** `modules/messages/config.yml`

Le module Messages fournit un système complet de messagerie privée entre joueurs. Il inclut la messagerie directe, un raccourci de réponse pour des conversations rapides, une option pour désactiver les messages entrants, et une fonctionnalité de social spy qui permet aux membres du staff de surveiller tous les messages privés sur le serveur.

---

## Configuration Source

```yaml
enable: true
```

---

## Options

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Messages |

:::info
Ce module possède un fichier de configuration minimal. Le comportement du module est principalement contrôlé via le fichier `messages.yml` (pour les formats de messages) et via les commandes en jeu. Activer ou désactiver ce module contrôle si la fonctionnalité de messagerie privée est disponible sur le serveur.
:::

---

## Fonctionnement

1. Un joueur envoie un message privé à un autre joueur en utilisant la commande `/message`.
2. Le destinataire reçoit le message en privé. L'expéditeur et le destinataire voient des versions formatées du message.
3. L'un ou l'autre des joueurs peut répondre rapidement en utilisant `/reply`, qui cible automatiquement la dernière personne avec laquelle ils ont échangé des messages.
4. Les joueurs qui ne souhaitent pas recevoir de messages privés peuvent les désactiver avec `/messagetoggle`.
5. Les membres du staff disposant de la permission `essentials.socialspy` peuvent activer `/socialspy` pour voir tous les messages privés échangés entre les joueurs sur le serveur.

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/message` | `msg`, `tell`, `whisper`, `m`, `w` | `essentials.message` | Envoyer un message privé à un autre joueur |
| `/reply` | `r` | `essentials.reply` | Répondre au dernier joueur qui vous a envoyé un message privé |
| `/messagetoggle` | `msgtoggle`, `mtg` | `essentials.message.toggle` | Activer ou désactiver la réception des messages privés |
| `/socialspy` | - | `essentials.socialspy` | Activer ou désactiver le mode social spy pour surveiller tous les messages privés sur le serveur |

Pour la liste complète des commandes, voir [Commandes & Permissions](../commands-permissions).

---

## Permissions

| Permission | Description |
|------------|-------------|
| `essentials.message` | Permet au joueur d'envoyer des messages privés en utilisant `/message` |
| `essentials.reply` | Permet au joueur de répondre aux messages privés en utilisant `/reply` |
| `essentials.message.toggle` | Permet au joueur d'activer ou désactiver les messages privés en utilisant `/messagetoggle` |
| `essentials.socialspy` | Permet au joueur d'activer le mode social spy pour voir tous les messages privés |

---

## Fonctionnalités

### Messages Privés

La commande `/message` (et ses alias `msg`, `tell`, `whisper`, `m`, `w`) permet aux joueurs d'envoyer des messages privés qui ne sont visibles que par l'expéditeur et le destinataire. Le format des messages pour l'expéditeur et le destinataire est configuré dans le fichier `messages.yml`.

```
/message <player> <message>
/msg Steve Hello, how are you?
```

### Réponse

La commande `/reply` (alias `r`) envoie un message au dernier joueur avec lequel vous avez échangé des messages privés. Cela fournit un raccourci pratique pour les conversations en cours sans avoir besoin de retaper le nom du destinataire.

```
/reply I'm doing great, thanks!
/r See you later!
```

:::tip
La commande `/reply` cible le dernier joueur qui vous a envoyé un message **ou** le dernier joueur à qui vous avez envoyé un message, selon le plus récent. Cela facilite le maintien d'une conversation aller-retour.
:::

### Activation/Désactivation des Messages

Les joueurs peuvent désactiver les messages privés entrants en utilisant `/messagetoggle`. Lorsque cette option est désactivée, les autres joueurs essayant de leur envoyer un message seront informés que le destinataire a désactivé les messages privés.

```
/messagetoggle
/msgtoggle
/mtg
```

### Social Spy

Les membres du staff peuvent activer le mode social spy avec `/socialspy` pour surveiller tous les messages privés échangés entre les joueurs sur le serveur. Cela est utile à des fins de modération, comme la détection de harcèlement ou de violations des règles dans les conversations privées.

```
/socialspy
```

:::warning
Le social spy doit être restreint aux membres du staff de confiance uniquement. La permission `essentials.socialspy` donne la capacité de lire toutes les conversations privées sur le serveur. Assurez-vous que votre configuration des permissions limite cela aux rôles appropriés.
:::

---

## Format des Messages

Le format des messages privés (ce que l'expéditeur voit, ce que le destinataire voit, et ce que le social spy affiche) est configuré dans le fichier `messages.yml`, et non dans la configuration du module. Les placeholders de format typiques incluent :

| Placeholder | Description |
|-------------|-------------|
| `%sender%` | Le nom du joueur envoyant le message |
| `%receiver%` | Le nom du joueur recevant le message |
| `%message%` | Le contenu du message privé |

---

## Exemple : Configuration de Surveillance pour le Staff

Pour configurer une équipe de staff avec accès au social spy :

1. Assurez-vous que le module Messages est activé :
   ```yaml
   enable: true
   ```

2. Accordez la permission `essentials.socialspy` à votre rôle staff dans votre plugin de permissions.

3. Les membres du staff peuvent ensuite activer ou désactiver le social spy à tout moment avec `/socialspy`.

Tous les messages privés entre les joueurs seront visibles par les membres du staff ayant activé le social spy, en utilisant le format configuré dans `messages.yml`.
