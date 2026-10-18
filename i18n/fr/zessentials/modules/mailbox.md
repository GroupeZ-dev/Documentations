---
title: Module Boîte aux Lettres
description: Livraison d'objets hors ligne et courriers texte entre joueurs, connectés ou non
---

# Module Boîte aux Lettres

**Fichier :** `modules/mailbox/config.yml`

Le module Boîte aux Lettres propose deux fonctionnalités complémentaires :

- **Boîte aux lettres d'objets** : les administrateurs envoient des objets dans la boîte aux lettres virtuelle d'un joueur, même lorsqu'il est hors ligne. Le joueur ouvre l'interface de sa boîte aux lettres pour récupérer ses objets, qui expirent après une durée configurable.
- **Courriers texte** : les joueurs envoient de courts messages texte à un autre joueur, connecté ou non. Le destinataire les lit avec `/mail read` et est prévenu à sa connexion lorsque des courriers non lus l'attendent.

---

## Configuration Source

```yaml
enable: true

# The expiration time of items when added to the mailbox
# If the player does not recover his items with expiration they will be deleted permanently.
expiration: 86400

# Settings of the text mails, sent with /mail send <player> <message>
# A mail can be sent to an offline player, it will be readable with /mail read on his next connection.

# Notify the player when he connects and has unread mails
message-notify-on-join: true

# Delay in seconds before sending the notification, to avoid it being lost in the join messages
message-notify-delay: 3

# Maximum amount of mails a player can store, a new mail is refused when the limit is reached
message-max-amount: 50

# Maximum amount of characters of a mail
message-max-length: 256

# Delay in seconds between two mails sent by the same player
# Players with the permission essentials.bypass.cooldown are not affected
message-cooldown: 5

# Date format used to display the date of a mail
message-date-format: "yyyy-MM-dd HH:mm"
```

---

## Options

### Boîte aux lettres d'objets

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Active ou désactive le module Boîte aux Lettres (objets et courriers texte) |
| `expiration` | Integer | `86400` | Durée en secondes avant qu'un objet non récupéré n'expire et ne soit définitivement supprimé de la boîte aux lettres. `86400` secondes = 24 heures |

<CalloutContainer type="warning">

<CalloutDescription>
Les objets expirés sont définitivement supprimés et ne peuvent pas être récupérés. La date d'expiration d'un objet est calculée au moment de son ajout (`maintenant + expiration`) : une valeur de `0` fait donc expirer les objets immédiatement. Utilisez toujours une valeur positive. Pour une conservation très longue, utilisez une grande valeur comme `2592000` (30 jours).
</CalloutDescription>

</CalloutContainer>

### Courriers texte

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `message-notify-on-join` | Boolean | `true` | Prévient le joueur qui se connecte avec des courriers non lus. La notification contient un `/mail read` cliquable |
| `message-notify-delay` | Integer | `3` | Délai en secondes avant l'envoi de la notification de connexion, pour qu'elle ne se perde pas parmi les autres messages de connexion (minimum `1`) |
| `message-max-amount` | Integer | `50` | Nombre maximum de courriers qu'un joueur peut stocker. Une fois la limite atteinte, les nouveaux courriers destinés à ce joueur sont refusés |
| `message-max-length` | Integer | `256` | Nombre maximum de caractères d'un courrier |
| `message-cooldown` | Integer | `5` | Délai en secondes entre deux courriers envoyés par un même joueur. `0` désactive le délai. Les joueurs ayant `essentials.bypass.cooldown` ne sont pas concernés (si `enable-cooldown-bypass` vaut `true` dans `config.yml`) |
| `message-date-format` | String | `yyyy-MM-dd HH:mm` | Format de date utilisé dans `/mail read`. Suit les motifs Java `SimpleDateFormat` |

---

## Boîte aux lettres d'objets

1. Un administrateur envoie un objet dans la boîte aux lettres d'un joueur avec `/mail give`, `/mail give-hand`, `/mail giveall` ou `/mail giveall-hand`.
2. L'objet est stocké dans la boîte aux lettres virtuelle du destinataire, qu'il soit connecté ou non. Un destinataire connecté reçoit un message dans la barre d'action.
3. Le joueur ouvre sa boîte aux lettres avec `/mail` et clique sur les objets pour les récupérer (un emplacement libre dans l'inventaire est nécessaire).
4. Si un objet n'est pas récupéré avant sa date d'expiration, il est supprimé.
5. Les administrateurs peuvent consulter la boîte aux lettres d'un autre joueur avec `/mail open <joueur>` et la vider avec `/mail clear <joueur>`.

<CalloutContainer type="error">

<CalloutTitle>Stockage SQL requis</CalloutTitle>

<CalloutDescription>
La **boîte aux lettres d'objets** nécessite un stockage SQL (`SQLITE`, `MYSQL`, `MARIADB` ou `HIKARICP`). Elle n'est pas implémentée pour le stockage `JSON`.
</CalloutDescription>

</CalloutContainer>

---

## Courriers texte

Les courriers texte permettent de laisser un message à un joueur qui n'est pas connecté.

- `/mail send <joueur> <message>` envoie un courrier à un joueur connecté ou hors ligne. Un destinataire connecté est prévenu immédiatement par un message l'invitant à utiliser `/mail read`.
- `/mail read` affiche tous vos courriers, avec l'expéditeur et la date, puis les marque comme lus.
- `/mail clearmessages` supprime vos propres courriers ; `/mail clearmessages <joueur>` supprime ceux d'un autre joueur.
- `/mail sendall <message>` envoie un courrier à tous les joueurs **connectés** (l'expéditeur est ignoré, ainsi que les joueurs dont la boîte est pleine).
- Lorsqu'un joueur se connecte avec des courriers non lus, il reçoit une notification cliquable après `message-notify-delay` secondes (si `message-notify-on-join` est activé).

### Restrictions

- Un courrier ne peut pas dépasser `message-max-length` caractères.
- Un joueur ne peut pas s'envoyer un courrier à lui-même.
- Un joueur **muet** (mute) ne peut pas envoyer de courrier.
- Un joueur qui a utilisé `/ignore` sur l'expéditeur ne reçoit pas ses courriers (l'expéditeur est informé que le destinataire ne souhaite pas les recevoir). La liste d'ignorés est vérifiée lorsque le destinataire est connecté.
- Un courrier est refusé lorsque le destinataire stocke déjà `message-max-amount` courriers.
- Les joueurs doivent attendre `message-cooldown` secondes entre deux courriers, sauf s'ils ont `essentials.bypass.cooldown`.
- Les courriers envoyés depuis la console sont signés du nom de la console et ne sont pas soumis aux vérifications de mute et de délai.

### Stockage

Les courriers texte fonctionnent avec **tous les types de stockage** :

| Stockage | Persistance |
|----------|-------------|
| `SQLITE`, `MYSQL`, `MARIADB`, `HIKARICP` | Table `user_mail_messages` |
| `JSON` | Enregistrés dans le fichier utilisateur du joueur |

<CalloutContainer type="info">

<CalloutDescription>
Contrairement aux courriers texte, la boîte aux lettres d'objets n'est disponible qu'avec un stockage SQL.
</CalloutDescription>

</CalloutContainer>

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/mail` | `mailbox`, `mb` | `essentials.mail` | Ouvre votre boîte aux lettres d'objets |

### Sous-commandes

| Sous-commande | Permission | Description |
|---------------|------------|-------------|
| `/mail open <joueur>` | `essentials.mail.open` | Ouvre la boîte aux lettres d'objets d'un joueur (vue administrateur) |
| `/mail give <joueur> <objet> [quantité]` | `essentials.mail.give` | Envoie un objet (matériau vanilla ou objet personnalisé du module Items) dans la boîte aux lettres d'un joueur |
| `/mail give-hand <joueur>` | `essentials.mail.give.hand` | Envoie l'objet que vous tenez en main dans la boîte aux lettres d'un joueur |
| `/mail giveall <objet> [quantité]` | `essentials.mail.giveall` | Envoie un objet dans la boîte aux lettres de tous les joueurs connectés |
| `/mail giveall-hand` | `essentials.mail.giveall.hand` | Envoie l'objet que vous tenez en main dans la boîte aux lettres de tous les joueurs connectés |
| `/mail clear <joueur>` | `essentials.mail.clear` | Supprime tous les objets de la boîte aux lettres d'un joueur |
| `/mail send <joueur> <message>` | `essentials.mail.send` | Envoie un courrier texte à un joueur, connecté ou non |
| `/mail read` | `essentials.mail.read` | Lit les courriers reçus et les marque comme lus |
| `/mail sendall <message>` | `essentials.mail.send.all` | Envoie un courrier texte à tous les joueurs connectés |
| `/mail clearmessages [joueur]` | `essentials.mail.clear.messages` | Supprime vos courriers, ou ceux d'un autre joueur |

| Permission | Description |
|------------|-------------|
| `essentials.bypass.cooldown` | Ignore le délai `message-cooldown` entre deux courriers texte |

Pour la liste complète des commandes, consultez [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associés

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_mailbox_items%` | Retourne le nombre d'objets actuellement dans la boîte aux lettres d'objets du joueur |

<CalloutContainer type="info">

<CalloutDescription>
Utilisez le placeholder `%zessentials_user_mailbox_items%` dans les scoreboards, hologrammes ou formats de chat pour indiquer aux joueurs combien d'objets non récupérés ils possèdent. Par exemple, vous pouvez afficher une notification dans le scoreboard lorsque la valeur est supérieure à zéro.
</CalloutDescription>

</CalloutContainer>

Pour la liste complète des placeholders, consultez [Placeholders](../placeholders).

---

## Exemples

### Expiration des objets après 7 jours

```yaml
expiration: 604800
```

Les objets expirent après 7 jours, ce qui laisse plus de temps aux joueurs pour se connecter et récupérer leurs livraisons.

### Courriers texte plus stricts

```yaml
message-max-amount: 20
message-max-length: 128
message-cooldown: 30
message-date-format: "dd/MM/yyyy HH:mm"
```

Les joueurs peuvent stocker au maximum 20 courriers de 128 caractères et doivent attendre 30 secondes entre deux courriers.

### Désactiver la notification de connexion

```yaml
message-notify-on-join: false
```

Les joueurs ne sont plus prévenus à la connexion ; ils doivent exécuter `/mail read` eux-mêmes.
