---
title: Bot Discord
description: Bot Discord autonome pour la liaison de comptes
---

# Bot Discord

Le bot Discord de zEssentials est une **application JDA autonome** qui fonctionne indépendamment du serveur Minecraft. Ce n'est pas un plugin Minecraft. Son rôle principal est de lier les comptes Minecraft aux comptes Discord, en faisant le pont entre votre serveur Discord et votre serveur Minecraft grâce à une base de données partagée.

---

## Aperçu

Le bot Discord fournit :

- **Liaison de comptes** -- Les joueurs peuvent lier leurs comptes Minecraft et Discord grâce à une vérification sécurisée par code
- **Interface à base d'embeds** -- Un embed personnalisable avec un bouton interactif est publié dans un salon Discord pour que les joueurs puissent lancer la liaison
- **Journal d'audit** -- Toutes les actions de liaison sont enregistrées dans un salon Discord dédié, à des fins de modération
- **Base de données partagée** -- Le bot se connecte à la même base de données que zEssentials, ce qui permet d'associer les comptes en temps réel

<CalloutContainer type="info">

<CalloutDescription>
Le bot Discord est une application Java autonome utilisant [JDA (Java Discord API)](https://github.com/discord-jda/JDA). Il s'exécute dans son propre processus, séparé du serveur Minecraft. Le bot et le serveur Minecraft doivent se connecter à la même base de données.
</CalloutDescription>

</CalloutContainer>

---

## Installation

### 1. Télécharger le bot

Téléchargez le fichier JAR du bot Discord depuis la même source que zEssentials.

### 2. Créer une application de bot Discord

1. Rendez-vous sur le [portail développeur Discord](https://discord.com/developers/applications)
2. Créez une **New Application**
3. Ouvrez la section **Bot**
4. Cliquez sur **Reset Token** et copiez le token du bot
5. Activez le **Message Content Intent** dans Privileged Gateway Intents
6. Ouvrez **OAuth2 > URL Generator**, sélectionnez les scopes `bot` et `applications.commands`, puis générez une URL d'invitation
7. Invitez le bot sur votre serveur Discord avec l'URL générée

### 3. Créer la configuration

Créez un fichier `config.yml` dans le même dossier que le JAR du bot. Consultez la section [Configuration](#configuration) ci-dessous pour toutes les options disponibles.

### 4. Lancer le bot

Démarrez le bot avec :

```bash
java -jar zessentials-discord-bot.jar
```

Le bot lit le fichier `config.yml` dans le dossier de travail courant, se connecte à la base de données puis à Discord.

---

## Configuration

Le bot se configure via un unique fichier `config.yml` placé à côté du JAR du bot.

### Référence complète de la configuration

```yaml
bot-token: "YOUR_BOT_TOKEN_HERE"
guild-id: "YOUR_GUILD_ID_HERE"

database-configuration:
  table-prefix: "zessentials_"
  user: "homestead"
  password: "secret"
  host: "192.168.10.10"
  port: 3306
  database: "zessentials"
  debug: false

link:
  enable: true

  button:
    name: "Link Account"
    style: PRIMARY
    disabled: false
    emoji: ""

  messages:
    code: "Your link code is: **%code%**. Use `/link %code%` in Minecraft to complete the link."
    already: "Your account is already linked."

  log:
    channel: "CHANNEL_ID_HERE"
    create: "A new link code has been generated."
    ask: "**%name%** is requesting to link their account. Code: `%code%` | Discord ID: `%id%`"

  embed:
    title: "Link Your Account"
    description: "Click the button below to link your Minecraft account with Discord."
    color: "54, 157, 229"
    footer: ""
    image: ""
    thumbnail: ""
    author: ""
    fields: []
```

### Options de configuration

#### Général

| Option | Type | Description |
|--------|------|-------------|
| `bot-token` | String | Le token du bot Discord, récupéré sur le portail développeur |
| `guild-id` | String | L'ID du serveur Discord (guild) sur lequel le bot fonctionne |

#### Configuration de la base de données

Les paramètres de la base de données doivent correspondre à ceux du plugin zEssentials afin que les deux se connectent à la même base.

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `table-prefix` | String | `zessentials_` | Préfixe des noms de tables |
| `user` | String | `homestead` | Nom d'utilisateur de la base de données |
| `password` | String | `secret` | Mot de passe de la base de données |
| `host` | String | `192.168.10.10` | Adresse de l'hôte de la base de données |
| `port` | Integer | `3306` | Port de la base de données |
| `database` | String | `zessentials` | Nom de la base de données |
| `debug` | Boolean | `false` | Active les logs de debug des requêtes |

<CalloutContainer type="warning">

<CalloutDescription>
La `database-configuration` doit pointer vers la **même base de données** que celle utilisée par le plugin zEssentials. Si les bases ne correspondent pas, la liaison de comptes ne fonctionnera pas.
</CalloutDescription>

</CalloutContainer>

#### Configuration de la liaison

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `link.enable` | Boolean | `true` | Active ou désactive la liaison de comptes |

#### Bouton

Contrôle l'apparence et le comportement du bouton « Link Account » de l'embed.

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `button.name` | String | `Link Account` | Le texte affiché sur le bouton |
| `button.style` | Enum | `PRIMARY` | Le style du bouton. Valeurs : `PRIMARY`, `SECONDARY`, `SUCCESS`, `DANGER` |
| `button.disabled` | Boolean | `false` | Indique si le bouton est désactivé (visible mais non cliquable) |
| `button.emoji` | String | `""` | Un emoji optionnel affiché sur le bouton |

#### Messages

Messages envoyés à l'utilisateur pendant la liaison.

| Option | Type | Description |
|--------|------|-------------|
| `messages.code` | String | Message envoyé lorsqu'un code de liaison est généré. Utilisez `%code%` pour afficher le code. |
| `messages.already` | String | Message envoyé lorsqu'un utilisateur essaie de lier un compte déjà lié. |

#### Journal

Configuration du journal d'audit des actions de liaison.

| Option | Type | Description |
|--------|------|-------------|
| `log.channel` | String | L'ID du salon Discord qui reçoit le journal d'audit |
| `log.create` | String | Message enregistré lorsqu'un nouveau code de liaison est généré |
| `log.ask` | String | Message enregistré lorsqu'un joueur demande à lier son compte. Placeholders : `%name%` (nom du joueur), `%code%` (code de liaison), `%id%` (ID de l'utilisateur Discord) |

#### Embed

Personnalise l'apparence de l'embed de liaison publié sur Discord.

| Option | Type | Description |
|--------|------|-------------|
| `embed.title` | String | Le titre de l'embed |
| `embed.description` | String | Le texte de description de l'embed |
| `embed.color` | String | La couleur de la barre latérale de l'embed au format RGB (ex. : `"54, 157, 229"`) |
| `embed.footer` | String | Texte de pied de page optionnel |
| `embed.image` | String | URL d'une image optionnelle affichée dans l'embed |
| `embed.thumbnail` | String | URL d'une miniature optionnelle affichée dans l'embed |
| `embed.author` | String | Nom d'auteur optionnel affiché en haut de l'embed |
| `embed.fields` | List | Liste optionnelle de champs supplémentaires |

---

## Commandes du bot

Le bot Discord enregistre les commandes slash suivantes :

### /reload

| Propriété | Valeur |
|-----------|--------|
| **Permission** | Administrator |
| **Description** | Recharge la configuration du bot depuis `config.yml` |

Recharge le fichier `config.yml` sans redémarrer le processus du bot. Pratique pour appliquer des modifications de configuration à chaud.

### /setlinkmessage

| Propriété | Valeur |
|-----------|--------|
| **Permission** | Administrator |
| **Description** | Envoie l'embed de liaison dans le salon actuel |

Publie l'embed configuré (avec le bouton de liaison) dans le salon où la commande est exécutée. C'est avec cet embed que les joueurs interagissent pour lancer la liaison de leur compte. En général, cette commande n'est exécutée qu'une seule fois, dans un salon dédié à la liaison.

---

## Processus de liaison de compte

La liaison de compte utilise une vérification sécurisée par code pour associer un compte Discord à un compte Minecraft.

### Étape par étape

1. **L'administrateur envoie l'embed de liaison** -- Un administrateur exécute `/setlinkmessage` dans un salon Discord. Un embed avec un bouton « Link Account » est publié.

2. **L'embed apparaît dans le salon** -- L'embed s'affiche avec le titre, la description, la couleur configurée et le bouton interactif.

3. **Le joueur clique sur le bouton** -- Un joueur qui souhaite lier son compte clique sur le bouton « Link Account » de l'embed.

4. **Le bot génère un code de vérification** -- Le bot génère un code hexadécimal unique de 16 caractères pour le joueur.

5. **Le code est envoyé en message éphémère** -- Le bot envoie le code au joueur sous forme de **message éphémère** (visible uniquement par lui). Le message utilise le modèle `messages.code`, avec le placeholder `%code%` remplacé.

6. **Le joueur saisit le code dans Minecraft** -- Le joueur rejoint le serveur Minecraft et exécute `/link <code>` avec le code reçu sur Discord.

7. **Les comptes sont liés** -- zEssentials valide le code, associe l'UUID Minecraft à l'ID de l'utilisateur Discord et enregistre la liaison dans la base de données.

8. **Les actions sont enregistrées dans le salon d'audit** -- Toutes les actions de liaison (génération de code, demandes, liaisons terminées) sont enregistrées dans le salon d'audit configuré, pour la modération.

### Diagramme

```
Discord                                    Minecraft
  |                                            |
  |  1. Admin runs /setlinkmessage             |
  |  2. Embed with button appears              |
  |  3. Player clicks "Link Account"           |
  |  4. Bot generates 16-char hex code         |
  |  5. Code sent as ephemeral message         |
  |                                            |
  |         Player copies code                 |
  |                                            |
  |                                  6. Player runs /link <code>
  |                                  7. Accounts linked in database
  |                                            |
  |  8. Action logged to audit channel         |
  |                                            |
```

<CalloutContainer type="info">

<CalloutDescription>
Si un joueur clique sur le bouton de liaison alors que son compte est déjà lié, le bot répond avec le message `messages.already` au lieu de générer un nouveau code.
</CalloutDescription>

</CalloutContainer>

---

## Tables de la base de données

Le bot Discord et zEssentials partagent les tables suivantes pour la liaison de comptes. Tous les noms de tables sont préfixés par le `table-prefix` configuré.

### link_codes

Stocke les codes de vérification temporaires générés pendant la liaison.

| Colonne | Description |
|---------|-------------|
| Code | Le code de vérification hexadécimal de 16 caractères |
| Discord user ID | L'utilisateur Discord qui a demandé le code |
| Expiration | La date d'expiration du code |

### link_accounts

Stocke les liaisons actives entre comptes Minecraft et Discord.

| Colonne | Description |
|---------|-------------|
| Minecraft UUID | L'UUID du joueur Minecraft lié |
| Discord user ID | L'ID de l'utilisateur Discord lié |
| Link timestamp | La date à laquelle les comptes ont été liés |

### link_histories

Conserve l'historique de toutes les liaisons et suppressions de liaison.

| Colonne | Description |
|---------|-------------|
| Minecraft UUID | L'UUID du joueur Minecraft concerné |
| Discord user ID | L'ID de l'utilisateur Discord concerné |
| Action | Le type d'action (link, unlink) |
| Timestamp | La date de l'action |

---

## Dépannage

### Le bot ne démarre pas

- Vérifiez que le `bot-token` du `config.yml` est correct et n'a pas été régénéré sur le portail développeur
- Assurez-vous que Java 21 ou supérieur est installé
- Vérifiez que le fichier `config.yml` se trouve dans le même dossier que le JAR du bot

### Le bot est en ligne mais les commandes n'apparaissent pas

- Assurez-vous que le bot a été invité avec le scope `applications.commands`
- Patientez quelques minutes, le temps que Discord propage les commandes slash
- Vérifiez que le `guild-id` correspond au serveur Discord sur lequel vous attendez les commandes

### Le bouton de liaison ne fait rien

- Vérifiez que le bot a la permission d'envoyer des messages et de gérer les interactions dans le salon
- Vérifiez que `link.enable` vaut `true` dans la configuration
- Consultez la console du bot pour d'éventuels messages d'erreur

### La liaison échoue dans Minecraft

- Vérifiez que le bot et le serveur Minecraft sont connectés à la **même base de données**
- Assurez-vous que le `table-prefix` est identique dans les deux configurations
- Vérifiez que le code n'a pas expiré
- Confirmez que le module Discord est activé dans zEssentials
