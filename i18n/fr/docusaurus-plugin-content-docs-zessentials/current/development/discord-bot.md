---
sidebar_position: 3
title: Bot Discord
description: Bot Discord autonome pour la liaison de comptes
---

# Bot Discord

Le Bot Discord de zEssentials est une **application JDA autonome** qui fonctionne independamment du serveur Minecraft. Ce n'est pas un plugin Minecraft. Son objectif principal est de lier les comptes Minecraft aux comptes Discord, fournissant un pont entre votre serveur Discord et votre serveur Minecraft via une base de donnees partagee.

---

## Apercu

Le bot Discord fournit :

- **Liaison de Compte** -- Les joueurs peuvent lier leurs comptes Minecraft et Discord via un flux de verification securise base sur un code
- **Interface basee sur les Embeds** -- Un embed personnalisable avec un bouton interactif est publie dans un canal Discord pour que les joueurs puissent initier le processus de liaison
- **Journalisation d'Audit** -- Toutes les actions de liaison sont enregistrees dans un canal Discord designe a des fins de moderation
- **Base de Donnees Partagee** -- Le bot se connecte a la meme base de donnees que zEssentials, permettant l'association de comptes en temps reel

:::info
Le bot Discord est une application Java autonome utilisant [JDA (Java Discord API)](https://github.com/discord-jda/JDA). Il s'execute en tant que processus independant, separe du serveur Minecraft. Le bot et le serveur Minecraft doivent se connecter a la meme base de donnees.
:::

---

## Installation

### 1. Telecharger le Bot

Telechargez le fichier JAR du bot Discord depuis la meme source que zEssentials.

### 2. Creer une Application Bot Discord

1. Allez sur le [Portail Developpeur Discord](https://discord.com/developers/applications)
2. Creez une **Nouvelle Application**
3. Naviguez vers la section **Bot**
4. Cliquez sur **Reset Token** et copiez le token du bot
5. Activez le **Message Content Intent** sous Privileged Gateway Intents
6. Naviguez vers **OAuth2 > URL Generator**, selectionnez les scopes `bot` et `applications.commands`, puis generez une URL d'invitation
7. Invitez le bot sur votre serveur Discord en utilisant l'URL generee

### 3. Creer la Configuration

Creez un fichier `config.yml` dans le meme repertoire que le fichier JAR du bot. Consultez la section [Configuration](#configuration) ci-dessous pour toutes les options disponibles.

### 4. Lancer le Bot

Demarrez le bot avec :

```bash
java -jar zessentials-discord-bot.jar
```

Le bot lira le fichier `config.yml` depuis le repertoire de travail courant, se connectera a la base de donnees et se connectera a Discord.

---

## Configuration

Le bot est configure via un seul fichier `config.yml` place a cote du fichier JAR du bot.

### Reference Complete de la Configuration

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

### Options de Configuration

#### General

| Option | Type | Description |
|--------|------|-------------|
| `bot-token` | String | Le token du bot Discord depuis le Portail Developpeur |
| `guild-id` | String | L'ID du serveur Discord (guild) dans lequel le bot opere |

#### Configuration de la Base de Donnees

Les parametres de la base de donnees doivent correspondre a la configuration du plugin Minecraft zEssentials afin que les deux se connectent a la meme base de donnees.

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `table-prefix` | String | `zessentials_` | Prefixe des noms de tables de la base de donnees |
| `user` | String | `homestead` | Nom d'utilisateur de la base de donnees |
| `password` | String | `secret` | Mot de passe de la base de donnees |
| `host` | String | `192.168.10.10` | Adresse de l'hote de la base de donnees |
| `port` | Integer | `3306` | Port de la base de donnees |
| `database` | String | `zessentials` | Nom de la base de donnees |
| `debug` | Boolean | `false` | Activer les logs de debug pour les requetes de base de donnees |

:::warning
La `database-configuration` doit pointer vers la **meme base de donnees** utilisee par le plugin Minecraft zEssentials. Si les bases de donnees ne correspondent pas, la liaison de comptes ne fonctionnera pas.
:::

#### Configuration de la Liaison

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `link.enable` | Boolean | `true` | Activer ou desactiver la fonctionnalite de liaison de comptes |

#### Bouton

Controle l'apparence et le comportement du bouton "Link Account" sur l'embed.

| Option | Type | Par Defaut | Description |
|--------|------|------------|-------------|
| `button.name` | String | `Link Account` | Le libelle affiche sur le bouton |
| `button.style` | Enum | `PRIMARY` | Le style du bouton. Options : `PRIMARY`, `SECONDARY`, `SUCCESS`, `DANGER` |
| `button.disabled` | Boolean | `false` | Indique si le bouton est desactive (visible mais non cliquable) |
| `button.emoji` | String | `""` | Un emoji optionnel affiche sur le bouton |

#### Messages

Messages envoyes a l'utilisateur pendant le processus de liaison.

| Option | Type | Description |
|--------|------|-------------|
| `messages.code` | String | Message envoye lorsqu'un code de liaison est genere. Utilisez `%code%` comme placeholder pour le code. |
| `messages.already` | String | Message envoye lorsqu'un utilisateur tente de lier un compte deja lie. |

#### Journal

Configuration de la journalisation d'audit pour le suivi des actions de liaison.

| Option | Type | Description |
|--------|------|-------------|
| `log.channel` | String | L'ID du canal Discord ou les logs d'audit sont envoyes |
| `log.create` | String | Modele de message de log lorsqu'un nouveau code de liaison est genere |
| `log.ask` | String | Modele de message de log lorsqu'un joueur demande a lier son compte. Placeholders : `%name%` (nom du joueur), `%code%` (code de liaison), `%id%` (ID utilisateur Discord) |

#### Embed

Personnalise l'apparence de l'embed de liaison publie sur Discord.

| Option | Type | Description |
|--------|------|-------------|
| `embed.title` | String | Le titre de l'embed |
| `embed.description` | String | Le texte de description de l'embed |
| `embed.color` | String | La couleur de la barre laterale de l'embed au format RGB (ex. : `"54, 157, 229"`) |
| `embed.footer` | String | Texte de pied de page optionnel |
| `embed.image` | String | URL d'image optionnelle affichee dans l'embed |
| `embed.thumbnail` | String | URL de miniature optionnelle affichee dans l'embed |
| `embed.author` | String | Nom d'auteur optionnel affiche en haut de l'embed |
| `embed.fields` | List | Liste optionnelle de champs supplementaires de l'embed |

---

## Commandes du Bot

Le bot Discord enregistre les commandes slash suivantes :

### /reload

| Propriete | Valeur |
|-----------|--------|
| **Permission** | Administrator |
| **Description** | Recharge la configuration du bot depuis `config.yml` |

Recharge le fichier `config.yml` sans redemarrer le processus du bot. Utile pour appliquer des modifications de configuration a la volee.

### /setlinkmessage

| Propriete | Valeur |
|-----------|--------|
| **Permission** | Administrator |
| **Description** | Envoie l'embed de liaison dans le canal actuel |

Publie l'embed configure (avec le bouton de liaison) dans le canal ou la commande est executee. C'est l'embed avec lequel les joueurs interagissent pour commencer le processus de liaison de compte. En general, vous executez cette commande une seule fois dans un canal de liaison dedie.

---

## Flux de Liaison de Compte

Le processus de liaison de compte utilise un flux de verification securise base sur un code pour associer un compte Discord a un compte Minecraft.

### Processus Etape par Etape

1. **L'administrateur envoie l'embed de liaison** -- Un administrateur execute `/setlinkmessage` dans un canal Discord. Cela publie un embed avec un bouton "Link Account".

2. **L'embed apparait dans le canal** -- L'embed est affiche avec le titre, la description, la couleur configuree et le bouton interactif.

3. **Le joueur clique sur le bouton** -- Un joueur qui souhaite lier son compte clique sur le bouton "Link Account" de l'embed.

4. **Le bot genere un code de verification** -- Le bot genere un code hexadecimal unique de 16 caracteres pour le joueur.

5. **Le code est envoye comme message ephemere** -- Le bot envoie le code de verification au joueur sous forme de **message ephemere** (visible uniquement par ce joueur). Le message utilise le modele `messages.code` avec le placeholder `%code%` remplace.

6. **Le joueur entre le code dans Minecraft** -- Le joueur rejoint le serveur Minecraft et execute la commande `/link <code>` avec le code recu sur Discord.

7. **Les comptes sont lies** -- zEssentials valide le code, associe l'UUID Minecraft avec l'ID utilisateur Discord et stocke la liaison dans la base de donnees.

8. **Les actions sont enregistrees dans le canal d'audit** -- Toutes les actions de liaison (generation de code, demandes de liaison, liaisons completees) sont enregistrees dans le canal de journal d'audit configure pour la visibilite de la moderation.

### Diagramme de Flux

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

:::tip
Si un joueur clique sur le bouton de liaison mais que son compte est deja lie, le bot repondra avec le message `messages.already` au lieu de generer un nouveau code.
:::

---

## Tables de la Base de Donnees

Le bot Discord et zEssentials partagent les tables de base de donnees suivantes pour la liaison de comptes. Tous les noms de tables sont prefixes avec le `table-prefix` configure.

### link_codes

Stocke les codes de verification temporaires generes pendant le processus de liaison.

| Colonne | Description |
|---------|-------------|
| Code | Le code de verification hexadecimal de 16 caracteres |
| Discord user ID | L'utilisateur Discord qui a demande le code |
| Expiration | La date d'expiration du code |

### link_accounts

Stocke les liaisons actives entre les comptes Minecraft et Discord.

| Colonne | Description |
|---------|-------------|
| Minecraft UUID | L'UUID du joueur Minecraft lie |
| Discord user ID | L'ID de l'utilisateur Discord lie |
| Link timestamp | La date a laquelle les comptes ont ete lies |

### link_histories

Stocke une piste d'audit de toutes les actions de liaison et de deliaison.

| Colonne | Description |
|---------|-------------|
| Minecraft UUID | L'UUID du joueur Minecraft concerne |
| Discord user ID | L'ID de l'utilisateur Discord concerne |
| Action | Le type d'action (link, unlink) |
| Timestamp | La date a laquelle l'action s'est produite |

---

## Depannage

### Le bot ne demarre pas

- Verifiez que le `bot-token` dans `config.yml` est correct et n'a pas ete regenere dans le Portail Developpeur
- Assurez-vous que Java 17 ou superieur est installe
- Verifiez que le fichier `config.yml` se trouve dans le meme repertoire que le fichier JAR du bot

### Le bot est en ligne mais les commandes n'apparaissent pas

- Assurez-vous que le bot a ete invite avec le scope `applications.commands`
- Attendez quelques minutes que Discord propage les commandes slash globalement
- Verifiez que le `guild-id` correspond au serveur Discord ou vous attendez les commandes

### Le bouton de liaison ne fait rien

- Verifiez que le bot a la permission d'envoyer des messages et de gerer les interactions dans le canal
- Verifiez que `link.enable` est defini sur `true` dans la configuration
- Consultez la console du bot pour les messages d'erreur

### La liaison echoue dans Minecraft

- Verifiez que le bot et le serveur Minecraft sont connectes a la **meme base de donnees**
- Assurez-vous que le `table-prefix` correspond dans les deux configurations
- Verifiez que le code n'a pas expire
- Confirmez que le module Discord est active dans zEssentials
