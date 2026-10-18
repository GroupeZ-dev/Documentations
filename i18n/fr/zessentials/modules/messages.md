---
title: Module Messages
description: Système de messagerie privée avec support de réponse et social spy
---

# Module Messages

**Fichier :** `modules/messages/config.yml`

Le module Messages fournit un système complet de messagerie privée entre joueurs. Il comprend l'envoi de messages directs, un raccourci de réponse pour les conversations rapides, une option pour désactiver les messages entrants, un système d'ignore persistant, et une fonctionnalité de social spy permettant aux membres du staff de surveiller tous les messages privés du serveur.

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

<CalloutContainer type="info">

<CalloutDescription>
Ce module possède un fichier de configuration minimal. Son comportement est principalement contrôlé par le fichier de messages (pour les formats) et par les commandes en jeu. Activer ou désactiver ce module détermine si la messagerie privée, le système d'ignore et `/tptoggle` sont disponibles sur le serveur.
</CalloutDescription>

</CalloutContainer>

---

## Fonctionnement

1. Un joueur envoie un message privé à un autre joueur avec la commande `/message`.
2. Le destinataire reçoit le message en privé. L'expéditeur et le destinataire voient chacun une version formatée du message.
3. Les deux joueurs peuvent répondre rapidement avec `/reply`, qui cible automatiquement la dernière personne avec qui ils ont échangé.
4. Les joueurs qui ne souhaitent pas recevoir de messages privés peuvent les désactiver avec `/messagetoggle`.
5. Les joueurs peuvent bloquer un joueur précis avec `/ignore` : ce joueur ne peut plus leur envoyer de messages privés ni de demandes de téléportation.
6. Les membres du staff possédant la permission `essentials.socialspy` peuvent activer `/socialspy` pour voir tous les messages privés échangés entre les joueurs du serveur.

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/message <joueur> <message>` | `msg`, `tell`, `whisper`, `m`, `w` | `essentials.message` | Envoyer un message privé à un autre joueur |
| `/reply <message>` | `r` | `essentials.reply` | Répondre au dernier joueur qui vous a envoyé un message privé |
| `/messagetoggle [joueur]` | `msgtoggle`, `mtg` | `essentials.message.toggle` | Activer ou désactiver la réception des messages privés |
| `/socialspy [joueur]` | - | `essentials.socialspy` | Activer ou désactiver le social spy pour surveiller tous les messages privés du serveur |
| `/ignore <joueur>` | - | `essentials.ignore` | Ignorer un joueur, ce qui bloque ses messages privés et ses demandes de téléportation |
| `/unignore <joueur>` | `unignor` | `essentials.ignore` | Ne plus ignorer un joueur |
| `/ignorelist` | `ignores` | `essentials.ignore.list` | Lister les joueurs que vous ignorez |

Pour la liste complète des commandes, consultez [Commandes & Permissions](../commands-permissions).

---

## Permissions

| Permission | Description |
|------------|-------------|
| `essentials.message` | Autorise l'envoi de messages privés avec `/message` |
| `essentials.reply` | Autorise la réponse aux messages privés avec `/reply` |
| `essentials.message.toggle` | Autorise l'activation ou la désactivation des messages privés avec `/messagetoggle` |
| `essentials.message.toggle.other` | Autorise l'activation ou la désactivation des messages privés d'un autre joueur avec `/messagetoggle <joueur>` |
| `essentials.socialspy` | Autorise l'activation du social spy pour voir tous les messages privés |
| `essentials.ignore` | Autorise l'utilisation de `/ignore` et `/unignore` |
| `essentials.ignore.list` | Autorise l'utilisation de `/ignorelist` |

---

## Fonctionnalités

### Messages Privés

La commande `/message` (et ses alias `msg`, `tell`, `whisper`, `m`, `w`) permet d'envoyer des messages privés visibles uniquement par l'expéditeur et le destinataire. Le format du message pour l'expéditeur et le destinataire est configuré dans le fichier de messages.

```
/message <joueur> <message>
/msg Steve Salut, comment ça va ?
```

Un joueur muet ne peut pas envoyer de messages privés, et les messages privés passent par les mêmes vérifications que le chat public (voir [Module Chat](./chat)).

### Réponse

La commande `/reply` (alias `r`) envoie un message au dernier joueur avec qui vous avez échangé des messages privés. C'est un raccourci pratique pour les conversations en cours, sans avoir à retaper le nom du destinataire.

```
/reply Très bien, merci !
/r À plus tard !
```

<CalloutContainer type="info">

<CalloutDescription>
La commande `/reply` cible le dernier joueur qui vous a écrit **ou** le dernier joueur à qui vous avez écrit, selon le plus récent. Cela facilite les échanges dans une conversation.
</CalloutDescription>

</CalloutContainer>

### Activation/Désactivation des Messages

Les joueurs peuvent désactiver les messages privés entrants avec `/messagetoggle`. Lorsqu'ils sont désactivés, les joueurs qui tentent de leur écrire sont informés que le destinataire a désactivé ses messages privés. Le staff possédant `essentials.message.toggle.other` peut le faire pour un autre joueur avec `/messagetoggle <joueur>`.

```
/messagetoggle
/msgtoggle
/mtg
```

### Système d'Ignore

Un joueur peut ignorer un autre joueur (connecté ou non) avec `/ignore <joueur>`. Tant qu'un joueur est ignoré :

- ses messages privés sont bloqués (il reçoit un message indiquant que le joueur l'ignore)
- ses demandes de téléportation (`/tpa` et `/tpahere`) sont bloquées
- ses mails texte sont bloqués (voir [Module Mailbox](./mailbox))

```
/ignore Steve
/unignore Steve
/ignorelist
```

La liste des joueurs ignorés est persistante : elle est stockée dans la table `user_ignores` (ou dans le fichier du joueur avec le stockage JSON) et survit aux redémarrages.

<CalloutContainer type="info">

<CalloutDescription>
La vérification du vanish est prioritaire sur celle de l'ignore : envoyer un message privé à un joueur en vanish renvoie toujours « joueur introuvable », même si ce joueur ignore l'expéditeur, afin de ne jamais révéler sa présence.
</CalloutDescription>

</CalloutContainer>

### Social Spy

Les membres du staff peuvent activer le social spy avec `/socialspy` pour surveiller tous les messages privés échangés entre les joueurs du serveur. C'est utile pour la modération, par exemple pour détecter du harcèlement ou des infractions aux règles dans les conversations privées. `/socialspy <joueur>` l'active ou le désactive pour un autre joueur.

```
/socialspy
```

<CalloutContainer type="warning">

<CalloutDescription>
Le social spy doit être réservé aux membres du staff de confiance. La permission `essentials.socialspy` permet de lire toutes les conversations privées du serveur. Assurez-vous que votre configuration de permissions la limite aux rôles appropriés.
</CalloutDescription>

</CalloutContainer>

---

## Format des Messages

Le format des messages privés est configuré dans le fichier de messages, et non dans la configuration du module :

| Clé du message | Placeholders | Description |
|----------------|--------------|-------------|
| `command-message-me` | `%target%`, `<message>` | Ce que voit l'expéditeur |
| `command-message-other` | `%target%`, `<message>` | Ce que voit le destinataire |
| `command-message-social-spy` | `%sender%`, `%receiver%`, `%message%` | Ce que voit le staff ayant activé le social spy |
| `command-message-ignore-player` | `%player%` | Envoyé lorsque le destinataire ignore l'expéditeur |
| `command-ignore-list-header` / `command-ignore-list-line` | `%count%` / `%player%` | Format de `/ignorelist` |

---

## Exemple : Configuration de Surveillance pour le Staff

Pour donner l'accès au social spy à votre équipe :

1. Vérifiez que le module Messages est activé :
   ```yaml
   enable: true
   ```

2. Donnez la permission `essentials.socialspy` au rôle staff dans votre plugin de permissions.

3. Les membres du staff peuvent ensuite activer ou désactiver le social spy à tout moment avec `/socialspy`.

Tous les messages privés entre joueurs seront visibles par les membres du staff ayant activé le social spy, avec le format configuré dans le fichier de messages.
