---
sidebar_position: 4
title: Module Discord
description: Notifications par webhook Discord et liaison de comptes
---

# Module Discord

**Fichier :** `modules/discord/config.yml`

Le module Discord intègre votre serveur Minecraft avec Discord via des **notifications par webhook** et la **liaison de comptes**. Il peut envoyer des messages vers des salons Discord lorsque des joueurs discutent, se connectent, se déconnectent ou se connectent pour la première fois. Il prend également en charge un système sécurisé de liaison de comptes qui associe les comptes Minecraft aux comptes Discord.

Pour le bot Discord autonome utilisé pour la liaison de comptes, consultez la page [Discord Bot](../development/discord-bot).

---

## Configuration Source

```yaml
enable: true
chat-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  avatar: "https://mc-heads.net/avatar/%uuid%"
  message: "%message%"
  username: "%player%"
join-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  embeds:
    - author:
        name: "%player% just logged in"
        icon-url: "https://mc-heads.net/head/%uuid%"
      color: "#00ff00"
left-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  embeds:
    - author:
        name: "%player% just logged out"
        icon-url: "https://mc-heads.net/head/%uuid%"
      color: "#ff0000"
first-join-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  embeds:
    - author:
        name: "%player% just logged in for the first time"
        icon-url: "https://mc-heads.net/head/%uuid%"
      color: "#44ff44"
enable-link-account: false
log-link-error-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  message: "%player% vient d'essayer de lier son compte avec le code `%code%`"
log-link-success-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  message: "%player% vient de lier son compte avec le code `%code%` (%discord-name%:%discord-id%)"
log-unlink-message:
  enable: false
  webhook: "https://discord.com/api/webhooks/"
  message: "%player% vient de délier son compte (%discord-name%:%discord-id%)"
```

---

## Options

### Options Générales

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `enable` | Boolean | `true` | Activer ou désactiver le module Discord |
| `enable-link-account` | Boolean | `false` | Activer la fonctionnalité de liaison de comptes Discord. Nécessite que le [Discord Bot](../development/discord-bot) soit en cours d'exécution |

### Webhook de Messages du Chat

Transmet les messages du chat en jeu vers un salon Discord via un webhook. Le message du webhook apparaît avec l'avatar et le nom du joueur.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `chat-message.enable` | Boolean | `false` | Activer ou désactiver le transfert des messages du chat vers Discord |
| `chat-message.webhook` | String | `https://discord.com/api/webhooks/` | L'URL du webhook Discord pour envoyer les messages du chat |
| `chat-message.avatar` | String | `https://mc-heads.net/avatar/%uuid%` | Modèle d'URL pour l'image de l'avatar du webhook. Utilisez `%uuid%` pour l'UUID du joueur |
| `chat-message.message` | String | `%message%` | Le contenu du message envoyé à Discord. Utilisez `%message%` pour le texte du message du chat |
| `chat-message.username` | String | `%player%` | Le nom d'utilisateur affiché sur le message du webhook. Utilisez `%player%` pour le nom du joueur |

### Webhook de Message de Connexion

Envoie un embed Discord lorsqu'un joueur se connecte au serveur.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `join-message.enable` | Boolean | `false` | Activer ou désactiver les notifications de connexion |
| `join-message.webhook` | String | `https://discord.com/api/webhooks/` | L'URL du webhook Discord pour les notifications de connexion |
| `join-message.embeds` | List | *(voir ci-dessus)* | Liste des objets embed envoyés lorsqu'un joueur se connecte |

### Webhook de Message de Déconnexion

Envoie un embed Discord lorsqu'un joueur se déconnecte du serveur.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `left-message.enable` | Boolean | `false` | Activer ou désactiver les notifications de déconnexion |
| `left-message.webhook` | String | `https://discord.com/api/webhooks/` | L'URL du webhook Discord pour les notifications de déconnexion |
| `left-message.embeds` | List | *(voir ci-dessus)* | Liste des objets embed envoyés lorsqu'un joueur se déconnecte |

### Webhook de Message de Première Connexion

Envoie un embed Discord lorsqu'un joueur se connecte au serveur pour la toute première fois.

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `first-join-message.enable` | Boolean | `false` | Activer ou désactiver les notifications de première connexion |
| `first-join-message.webhook` | String | `https://discord.com/api/webhooks/` | L'URL du webhook Discord pour les notifications de première connexion |
| `first-join-message.embeds` | List | *(voir ci-dessus)* | Liste des objets embed envoyés lorsqu'un nouveau joueur se connecte pour la première fois |

### Webhooks de Journalisation des Liaisons

Ces webhooks enregistrent les événements de liaison de comptes vers un salon Discord à des fins d'audit et de modération.

#### Journal des Erreurs de Liaison

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `log-link-error-message.enable` | Boolean | `false` | Activer la journalisation des tentatives de liaison échouées |
| `log-link-error-message.webhook` | String | `https://discord.com/api/webhooks/` | L'URL du webhook Discord pour les journaux d'erreurs |
| `log-link-error-message.message` | String | *(voir ci-dessus)* | Message envoyé lorsqu'une tentative de liaison échoue. Supporte les placeholders `%player%` et `%code%` |

#### Journal des Liaisons Réussies

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `log-link-success-message.enable` | Boolean | `false` | Activer la journalisation des liaisons de comptes réussies |
| `log-link-success-message.webhook` | String | `https://discord.com/api/webhooks/` | L'URL du webhook Discord pour les journaux de réussite |
| `log-link-success-message.message` | String | *(voir ci-dessus)* | Message envoyé lorsqu'un compte est lié avec succès. Supporte `%player%`, `%code%`, `%discord-name%` et `%discord-id%` |

#### Journal des Déliaisons

| Option | Type | Par Défaut | Description |
|--------|------|------------|-------------|
| `log-unlink-message.enable` | Boolean | `false` | Activer la journalisation des déliaisons de comptes |
| `log-unlink-message.webhook` | String | `https://discord.com/api/webhooks/` | L'URL du webhook Discord pour les journaux de déliaison |
| `log-unlink-message.message` | String | *(voir ci-dessus)* | Message envoyé lorsqu'un joueur délie son compte. Supporte `%player%`, `%discord-name%` et `%discord-id%` |

### Propriétés des Objets Embed

Les sections de webhook qui utilisent `embeds` prennent en charge les propriétés suivantes dans chaque entrée embed :

| Propriété | Type | Description |
|-----------|------|-------------|
| `author.name` | String | Le nom de l'auteur affiché en haut de l'embed. Supporte `%player%` et `%uuid%` |
| `author.icon-url` | String | URL de l'icône affichée à côté du nom de l'auteur |
| `color` | String | Code couleur hexadécimal pour la barre latérale de l'embed (par exemple, `"#00ff00"` pour le vert) |
| `title` | String | Titre optionnel de l'embed |
| `description` | String | Description/texte principal optionnel de l'embed |
| `thumbnail` | String | URL optionnelle de l'image miniature |
| `footer` | String | Texte de pied de page optionnel |

---

## Placeholders Disponibles dans les Messages Webhook

Les placeholders suivants peuvent être utilisés dans les champs de messages webhook et les champs embed :

| Placeholder | Description |
|-------------|-------------|
| `%player%` | Le nom du joueur |
| `%uuid%` | L'UUID du joueur |
| `%message%` | Le contenu du message du chat (webhook chat-message uniquement) |
| `%code%` | Le code de vérification de liaison (webhooks de journalisation de liaison uniquement) |
| `%discord-name%` | Le nom d'utilisateur du compte Discord lié (webhooks de journalisation de liaison uniquement) |
| `%discord-id%` | L'ID du compte Discord lié (webhooks de journalisation de liaison uniquement) |

:::tip
Pour les champs `avatar` et `icon-url`, des services comme `https://mc-heads.net/avatar/%uuid%` et `https://mc-heads.net/head/%uuid%` fournissent des rendus de skins Minecraft basés sur l'UUID du joueur.
:::

---

## Commandes Associées

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/link` | `lier` | `essentials.discord.link` | Lier votre compte Minecraft à Discord en utilisant un code de vérification |
| `/unlink` | `delier` | `essentials.discord.unlink` | Délier votre compte Discord de votre compte Minecraft |

Pour la liste complète des commandes, consultez [Commandes & Permissions](../commands-permissions).

---

## Placeholders Associés

| Placeholder | Description |
|-------------|-------------|
| `%zessentials_user_has_discord_linked%` | Retourne `true` si le joueur a lié son compte Discord, `false` sinon |

Pour la liste complète des placeholders, consultez [Placeholders](../placeholders).

---

## Configuration des Webhooks

Pour créer un webhook Discord :

1. Ouvrez votre serveur Discord et naviguez vers le salon où vous souhaitez recevoir les notifications.
2. Cliquez sur l'icône d'engrenage pour ouvrir les **Paramètres du Salon**.
3. Allez dans **Intégrations** > **Webhooks**.
4. Cliquez sur **Nouveau Webhook**.
5. Configurez le nom et l'avatar du webhook (optionnel), puis cliquez sur **Copier l'URL du Webhook**.
6. Collez l'URL du webhook dans le champ `webhook` correspondant dans la configuration.

:::warning
Gardez vos URLs de webhook privées. Toute personne possédant une URL de webhook peut envoyer des messages dans ce salon Discord. Si une URL de webhook est compromise, supprimez-la dans Discord et créez-en une nouvelle.
:::

---

## Liaison de Comptes

Le système de liaison de comptes connecte le compte Minecraft d'un joueur à son compte Discord via un flux de vérification sécurisé par code. Cela nécessite :

1. L'option `enable-link-account` définie sur `true` dans la configuration de ce module.
2. Le [Discord Bot](../development/discord-bot) en cours d'exécution en tant qu'application autonome connectée à la même base de données.

### Flux de Liaison

1. Un joueur clique sur le bouton "Link Account" sur l'embed Discord (configuré via le bot).
2. Le bot génère un code de vérification unique et l'envoie au joueur sur Discord.
3. Le joueur exécute `/link <code>` sur le serveur Minecraft.
4. Les comptes sont liés dans la base de données partagée.
5. L'événement de liaison est enregistré dans le webhook configuré (si activé).

### Déliaison

Les joueurs peuvent délier leur compte à tout moment en exécutant `/unlink` sur le serveur Minecraft. L'événement de déliaison est enregistré si `log-unlink-message` est activé.

:::info
Pour tous les détails sur la configuration du bot Discord, y compris la configuration de la base de données, les commandes du bot et le diagramme complet du flux de liaison, consultez la page [Discord Bot](../development/discord-bot).
:::

---

## Exemples

### Relais du Chat vers Discord

Transférer tous les messages du chat en jeu vers un salon Discord :

```yaml
chat-message:
  enable: true
  webhook: "https://discord.com/api/webhooks/1234567890/abcdefghijk"
  avatar: "https://mc-heads.net/avatar/%uuid%"
  message: "%message%"
  username: "%player%"
```

### Notifications de Connexion/Déconnexion avec Embeds

```yaml
join-message:
  enable: true
  webhook: "https://discord.com/api/webhooks/1234567890/abcdefghijk"
  embeds:
    - author:
        name: "%player% just logged in"
        icon-url: "https://mc-heads.net/head/%uuid%"
      color: "#00ff00"

left-message:
  enable: true
  webhook: "https://discord.com/api/webhooks/1234567890/abcdefghijk"
  embeds:
    - author:
        name: "%player% just logged out"
        icon-url: "https://mc-heads.net/head/%uuid%"
      color: "#ff0000"
```
