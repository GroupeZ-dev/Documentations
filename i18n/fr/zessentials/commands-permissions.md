---
title: Commandes & Permissions
description: Liste complète de toutes les commandes et permissions pour zEssentials
---

# Commandes & Permissions

Cette page contient la liste complète de toutes les commandes et permissions disponibles dans zEssentials. Les commandes sont organisées par catégorie pour faciliter la consultation.

<CalloutContainer type="info">

<CalloutTitle>Guide de Syntaxe</CalloutTitle>

<CalloutDescription>
- `< >` indique un argument **obligatoire**.
- `[ ]` indique un argument **optionnel**.
- `|` sépare plusieurs alias pour la même commande.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutTitle>Format des permissions</CalloutTitle>

<CalloutDescription>
Chaque permission est générée à partir de son nom interne : les underscores deviennent des points. Par exemple `ESSENTIALS_TP_TOGGLE` devient `essentials.tp.toggle` et `ESSENTIALS_UN_BAN` devient `essentials.un.ban`. Copiez toujours la permission exactement comme elle est écrite sur cette page.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutTitle>Commandes personnalisées</CalloutTitle>

<CalloutDescription>
Les commandes créées avec le module [Custom Commands](./modules/custom-commands) (`modules/customcommands/config.yml`, par exemple `/discord` ou `/map`) ne sont pas listées ici. Chacune utilise la `permission` définie dans sa propre configuration (une permission vide signifie que tout le monde peut l'utiliser).
</CalloutDescription>

</CalloutContainer>

---

## Commande Principale

La commande principale d'administration du plugin.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/zessentials` | `ess` | `essentials.use` | Commande principale du plugin |
| `/essversion` | `ev` | - | Afficher la version du plugin (aucune permission requise) |

### Sous-commandes de la Commande Principale

| Sous-commande | Alias | Permission | Description |
|---------------|-------|------------|-------------|
| `reload [module]` | `rl` | `essentials.reload` | Recharger les fichiers de configuration (ou un seul module) |
| `convert <plugin>` | `conv`, `c` | `essentials.convert` | Convertir les données d'un autre plugin |
| `delete-world <world>` | - | `essentials.delete.world` | Supprimer les données liées à un monde |
| `clear-random-word` | - | `essentials.clear.random.word` | Effacer les mots aléatoires |

---

## Commandes de Mode de Jeu

Commandes pour changer le mode de jeu des joueurs.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/gamemode <gamemode> [player]` | `gm` | `essentials.gamemode` | Changer le mode de jeu du joueur |
| `/gmc [player]` | `creat` | `essentials.gamemode.creative` | Passer en mode créatif |
| `/gma [player]` | `advent` | `essentials.gamemode.adventure` | Passer en mode aventure |
| `/gms [player]` | `survi` | `essentials.gamemode.survival` | Passer en mode survie |
| `/gmsp [player]` | `spec` | `essentials.gamemode.spectator` | Passer en mode spectateur |

Changer le mode de jeu d'un autre joueur nécessite aussi `essentials.gamemode.other`.

---

## Commandes Météo & Temps

Commandes pour contrôler la météo et le temps, y compris les modifications par joueur.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/day [world]` | - | `essentials.day` | Régler le temps sur jour |
| `/night [world]` | - | `essentials.night` | Régler le temps sur nuit |
| `/sun [world]` | - | `essentials.sun` | Régler la météo sur ensoleillé |
| `/player-weather [weather]` | `pweather` | `essentials.player.weather` | Changer la météo personnelle (côté client uniquement) |
| `/player-time [time]` | `ptime` | `essentials.player.time` | Changer le temps personnel (côté client uniquement) |

---

## Commandes de Téléportation

Commandes pour téléporter les joueurs vers des emplacements, d'autres joueurs ou des coordonnées aléatoires.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/tp <player> [x] [y] [z] [yaw] [pitch]` | - | `essentials.tp` | Se téléporter vers un joueur ou des coordonnées. `/tp <player1> <player2>` téléporte `player1` vers `player2` |
| `/tpall` | - | `essentials.tp.all` | Téléporter tous les joueurs vers vous |
| `/tphere <player>` | `s` | `essentials.tp.here` | Téléporter un joueur vers vous |
| `/tpa <player>` | - | `essentials.tpa` | Demander à se téléporter vers un joueur |
| `/tpahere <player>` | - | `essentials.tpa.here` | Demander à un joueur de se téléporter vers vous |
| `/tpaccept [player]` | `tpyes` | `essentials.tpa.accept` | Accepter une demande de téléportation entrante |
| `/tpdeny [player]` | `tpno` | `essentials.tpa.deny` | Refuser une demande de téléportation entrante |
| `/tpacancel <player>` | - | `essentials.tpa.cancel` | Annuler votre demande de téléportation sortante |
| `/tptoggle [player]` | - | `essentials.tp.toggle` | Activer/désactiver la réception des demandes de téléportation (`/tpa`) |
| `/tpaheretoggle [player]` | - | `essentials.tpa.here.toggle` | Activer/désactiver la réception des demandes `/tpahere` |
| `/back` | - | `essentials.back` | Se téléporter à votre emplacement précédent |
| `/tpr` | `rtp` | `essentials.tp.random` | Se téléporter à un emplacement aléatoire |
| `/tpr other <player> [world]` | `rtp other` | `essentials.tp.random.other` | Forcer une téléportation aléatoire pour un joueur |
| `/top` | - | `essentials.top` | Se téléporter au bloc le plus haut à votre position |
| `/bottom` | - | `essentials.bottom` | Se téléporter au bloc le plus bas à votre position |
| `/worldtp <world> [player]` | `wtp` | `essentials.tp.world` | Se téléporter dans un autre monde |

| Permission | Description |
|------------|-------------|
| `essentials.tp.toggle.other` | Activer/désactiver les demandes de téléportation d'un autre joueur |
| `essentials.tpa.here.toggle.other` | Activer/désactiver les demandes `/tpahere` d'un autre joueur |
| `essentials.tp.world.other` | Téléporter un autre joueur dans un monde |
| `essentials.back.death` | Permettre à `/back` de ramener à l'endroit de la mort |
| `essentials.teleport.bypass` | Ignorer le délai de téléportation (si activé dans le module de téléportation) |

---

## Commandes de Spawn

Commandes pour gérer et se téléporter aux points de spawn.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/spawn [player]` | - | `essentials.spawn` | Se téléporter au spawn du serveur |
| `/setspawn` | - | `essentials.set.spawn` | Définir l'emplacement du spawn du serveur |
| `/firstspawn [player]` | - | `essentials.spawn.first` | Se téléporter au premier point de spawn |
| `/setfirstspawn` | - | `essentials.set.first.spawn` | Définir le premier point de spawn pour les nouveaux joueurs |

Téléporter un autre joueur avec `/spawn` ou `/firstspawn` nécessite `essentials.spawn.other`.

---

## Commandes de Warp

Commandes pour créer, supprimer et se téléporter aux warps.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/warp [name]` | `w` | `essentials.warp` | Se téléporter à un warp |
| `/setwarp <name>` | `wcreate` | `essentials.warp.set` | Créer un nouveau warp |
| `/delwarp <name>` | `wdelete` | `essentials.warp.del` | Supprimer un warp existant |
| `/warps` | `wlist` | `essentials.warps` | Lister tous les warps disponibles |

Chaque warp nécessite aussi sa propre permission : `essentials.warp.<nom du warp>`.

---

## Commandes de Résidence

Commandes pour gérer les résidences (homes) personnelles.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/home [name]` | `h`, `homes` | `essentials.home` | Se téléporter à une résidence, ou lister vos résidences |
| `/sethome [name]` | `hcreate`, `hc` | `essentials.set.home` | Créer une nouvelle résidence |
| `/sethomeconfirm <name>` | - | `essentials.set.home.confirm` | Confirmer la création d'une résidence |
| `/delhome <name>` | `hdelete`, `hd` | `essentials.del.home` | Supprimer une résidence |
| `/delhomeconfirm <name>` | - | `essentials.del.home.confirm` | Confirmer la suppression d'une résidence |
| `/delhome-other <player> <name>` | `delhomeother`, `hdelother` | `essentials.del.home.other` | Supprimer une résidence d'un autre joueur |
| `/home-list <player>` | `hlist` | `essentials.home.list` | Voir la liste des résidences d'un joueur (admin) |
| `/homepublic <name>` | `publichome` | `essentials.home.public` | Rendre une de vos résidences publique (ou de nouveau privée) |
| `/publichomes [player]` | `phomes` | `essentials.home.visit` | Lister les résidences publiques |
| `/homeshare <name> <player>` | `hshare` | `essentials.home.share` | Partager une résidence avec un joueur |
| `/homeunshare <name> <player>` | `hunshare` | `essentials.home.share` | Arrêter de partager une résidence avec un joueur |
| `/homeshares <name>` | `hshares` | `essentials.home.share` | Lister les joueurs avec qui une résidence est partagée |
| `/homecategory <name> <category>` | `homecat`, `hcat` | `essentials.home.category` | Définir la catégorie d'une résidence |
| `/homefavorite <name>` | `homefav`, `hfav` | `essentials.home.favorite` | Marquer/démarquer une résidence comme favorite |
| `/homeimport <source>` | - | `essentials.home.import` | Importer les résidences d'un autre plugin (`essentialsx`) |

| Permission | Description |
|------------|-------------|
| `essentials.home.other` | Se téléporter à la résidence d'un autre joueur avec `/home <player>:<home>` |
| `essentials.home.visit` | Visiter les résidences publiques et partagées avec `/home <player>:<home>` |
| `essentials.set.home.other` | Créer ou supprimer la résidence d'un autre joueur avec `<player>:<home>` |

---

## Commandes d'Économie

Commandes pour gérer l'économie du jeu, les soldes et les paiements.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/money [player]` | `balance` | `essentials.money` | Afficher votre solde actuel |
| `/pay <player> <amount> [economy]` | - | `essentials.pay` | Payer un autre joueur |
| `/paytoggle [player]` | - | `essentials.pay.toggle` | Activer/désactiver la réception des paiements |
| `/paynotificationtoggle [player]` | `paynotify` | `essentials.pay.notification.toggle` | Activer/désactiver les notifications de paiement |
| `/economy` | `eco` | `essentials.eco.use` | Gérer les économies |
| `/balancetop [page]` | `baltop` | `essentials.balance.top` | Afficher le classement des meilleurs soldes |
| `/balancetop refresh <economy>` | `baltop refresh` | `essentials.balance.top.refresh` | Rafraîchir le classement baltop |

| Permission | Description |
|------------|-------------|
| `essentials.money.other` | Voir le solde d'un autre joueur |
| `essentials.pay.toggle.other` | Activer/désactiver les paiements d'un autre joueur |
| `essentials.pay.notification.toggle.other` | Activer/désactiver les notifications de paiement d'un autre joueur |

### Sous-commandes d'Économie

La commande `/economy` supporte les sous-commandes suivantes :

| Sous-commande | Alias | Permission | Description |
|---------------|-------|------------|-------------|
| `give <economy> <player> <amount> [reason]` | - | `essentials.eco.give` | Donner de l'argent à un joueur |
| `give-random <economy> <player> <min-amount> <max-amount> [reason]` | `gr` | `essentials.eco.give.random` | Donner un montant aléatoire à un joueur |
| `giveall <economy> <amount> [reason]` | - | `essentials.eco.give.all` | Donner de l'argent à tous les joueurs |
| `take <economy> <player> <amount> [reason]` | - | `essentials.eco.take` | Retirer de l'argent à un joueur |
| `set <economy> <player> <amount> [reason]` | - | `essentials.eco.set` | Définir le solde d'un joueur |
| `reset <economy> <player> [reason]` | - | `essentials.eco.reset` | Réinitialiser le solde d'un joueur |
| `reset-all <economy>` | - | `essentials.eco.reset.all` | Réinitialiser les soldes de tous les joueurs |
| `show <player>` | `s` | `essentials.eco.show` | Afficher le solde d'un joueur |

---

## Commandes de Sanction

Commandes pour modérer et sanctionner les joueurs.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/ban <player> <duration> <reason>` | - | `essentials.ban` | Bannir un joueur du serveur |
| `/unban <player> [reason]` | - | `essentials.un.ban` | Débannir un joueur |
| `/mute <player> <duration> <reason>` | - | `essentials.mute` | Rendre muet un joueur |
| `/unmute <player> [reason]` | - | `essentials.un.mute` | Rendre la parole à un joueur |
| `/kick <player> [reason]` | - | `essentials.kick` | Expulser un joueur du serveur |
| `/kickall [reason]` | - | `essentials.kick.all` | Expulser tous les joueurs du serveur |
| `/freeze <player>` | - | `essentials.freeze` | Geler un joueur sur place |
| `/sanction <player>` | `sc` | `essentials.sanction` | Ouvrir l'interface de sanction |
| `/seen <player>` | `whois` | `essentials.seen` | Afficher des informations sur un joueur |
| `/seenip <ip>` | `whoisip` | `essentials.seen.ip` | Afficher tous les joueurs partageant la même adresse IP |

| Permission | Description |
|------------|-------------|
| `essentials.ban.notify` | Recevoir une notification quand un joueur est banni |
| `essentials.unban.notify` | Recevoir une notification quand un joueur est débanni |
| `essentials.mute.notify` | Recevoir une notification quand un joueur est rendu muet |
| `essentials.unmute.notify` | Recevoir une notification quand un joueur retrouve la parole |
| `essentials.kick.notify` | Recevoir une notification quand un joueur est expulsé |
| `essentials.kick.bypass.all` | Ne pas être expulsé par `/kickall` |
| `essentials.seen.show.ip` | Voir l'adresse IP d'un joueur dans `/seen` |
| `essentials.seen.show.last.location` | Voir la dernière position d'un joueur dans `/seen` |
| `essentials.seen.show.created.at` | Voir la date de création d'un joueur dans `/seen` |

---

## Commandes de Chat

Commandes pour gérer et interagir avec le chat du serveur.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/chathistory <player> [page]` | `ct` | `essentials.chat.history` | Afficher l'historique du chat |
| `/chatclear` | `cl` | `essentials.chat.clear` | Effacer le chat |
| `/chatenable` | `ce` | `essentials.chat.enable` | Activer le chat |
| `/chatdisable` | `cd` | `essentials.chat.disable` | Désactiver le chat |
| `/broadcast <message>` | `bc` | `essentials.chat.broadcast` | Diffuser un message à tous les joueurs |
| `/showitem <code>` | - | `essentials.show.item` | Afficher l'objet tenu dans le chat |
| `/pub <message>` | - | `essentials.pub` | Envoyer un message mis en avant dans le chat |
| `/pingsound` | `pingsounds` | `essentials.ping.sound` | Activer/désactiver le son joué quand vous êtes mentionné dans le chat |

### Permissions du Chat

| Permission | Description |
|------------|-------------|
| `essentials.chat.bypass.alphanumeric` | Ne pas être affecté par la limitation des caractères |
| `essentials.chat.bypass.dynamic.cooldown` | Ne pas être affecté par le temps de recharge dynamique |
| `essentials.chat.bypass.link` | Envoyer des messages contenant des liens |
| `essentials.chat.bypass.same.message` | Envoyer deux fois de suite le même message |
| `essentials.chat.bypass.caps` | Envoyer des messages contenant des majuscules |
| `essentials.chat.bypass.flood` | Ne pas être affecté par l'anti-flood |
| `essentials.chat.bypass.disable` | Parler même quand le chat est désactivé |
| `essentials.chat.moderator` | Voir le chat avec la vue modérateur (actions de modération) |
| `essentials.chat.link` | Transformer les liens en liens cliquables (nécessite aussi `essentials.chat.click`) |
| `essentials.chat.color` | Utiliser les couleurs (Minecraft et hexadécimales) dans le chat |
| `essentials.chat.decoration` | Utiliser les décorations (`<bold>`, `<italic>`, `<underlined>`, `<strikethrough>`, `<obfuscated>`) dans le chat |
| `essentials.chat.rainbow` | Utiliser `<rainbow>` dans le chat |
| `essentials.chat.gradient` | Utiliser `<gradient>` dans le chat |
| `essentials.chat.click` | Utiliser `<click>` dans le chat |
| `essentials.chat.hover` | Utiliser `<hover>` dans le chat |
| `essentials.chat.newline` | Utiliser `<newline>` dans le chat |
| `essentials.chat.reset` | Utiliser `<reset>` dans le chat |
| `essentials.chat.font` | Utiliser `<font>` dans le chat |
| `essentials.chat.keybind` | Utiliser `<key>` dans le chat |

Le module de chat utilise aussi des permissions définies dans sa configuration (formats de chat, placeholders de chat comme `[item]`, contournement des règles personnalisées). Voir `modules/chat/config.yml`.

### Permissions des Panneaux

| Permission | Description |
|------------|-------------|
| `essentials.sign.color` | Utiliser les couleurs (Minecraft et hexadécimales) sur les panneaux |
| `essentials.sign.decoration` | Utiliser les décorations sur les panneaux |
| `essentials.sign.rainbow` | Utiliser `<rainbow>` sur les panneaux |
| `essentials.sign.gradient` | Utiliser `<gradient>` sur les panneaux |
| `essentials.sign.click` | Utiliser `<click>` sur les panneaux |
| `essentials.sign.hover` | Utiliser `<hover>` sur les panneaux |
| `essentials.sign.newline` | Utiliser `<newline>` sur les panneaux |
| `essentials.sign.reset` | Utiliser `<reset>` sur les panneaux |
| `essentials.sign.font` | Utiliser `<font>` sur les panneaux |
| `essentials.sign.keybind` | Utiliser `<key>` sur les panneaux |

---

## Commandes de Messagerie

Commandes pour la messagerie privée entre joueurs.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/message <player> <message>` | `msg`, `tell`, `whisper`, `m`, `w` | `essentials.message` | Envoyer un message privé à un joueur |
| `/reply <message>` | `r` | `essentials.reply` | Répondre au dernier message privé |
| `/messagetoggle [player]` | `msgtoggle`, `mtg` | `essentials.message.toggle` | Activer/désactiver les messages privés |
| `/socialspy [player]` | - | `essentials.socialspy` | Espionner tous les messages privés |
| `/ignore <player>` | - | `essentials.ignore` | Ignorer un joueur, en bloquant ses messages privés et ses demandes de téléportation |
| `/unignore <player>` | `unignor` | `essentials.ignore` | Ne plus ignorer un joueur |
| `/ignorelist` | `ignores` | `essentials.ignore.list` | Lister les joueurs que vous ignorez |

Activer/désactiver les messages privés d'un autre joueur nécessite `essentials.message.toggle.other`.

<CalloutContainer type="info">

<CalloutDescription>
`/w` est enregistré à la fois comme alias de `/message` et de `/warp`.
</CalloutDescription>

</CalloutContainer>

---

## Commandes de Kit

Commandes pour gérer et distribuer les kits.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/kit [kit]` | `kits` | `essentials.kit` | Recevoir un kit |
| `/showkit <kit>` | - | `essentials.kit.show` | Prévisualiser le contenu d'un kit |
| `/kiteditor <kit>` | `keditor` | `essentials.kit.editor` | Ouvrir l'éditeur de kit |
| `/kitcreate <name> <cooldown>` | `kcreate` | `essentials.kit.create` | Créer un nouveau kit |
| `/kitdelete <kit>` | `kdelete` | `essentials.kit.delete` | Supprimer un kit existant |
| `/kitgive <player> <kit>` | `kgive` | `essentials.kit.give` | Donner un kit à un autre joueur |

| Permission | Description |
|------------|-------------|
| `essentials.kit.<nom du kit>` | Utiliser un kit précis (permission par défaut, modifiable dans la configuration du kit) |
| `essentials.kit.bypass.cooldown` | Ignorer le temps de recharge des kits |

---

## Commandes de Coffre

Commandes pour accéder et gérer les coffres personnels.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/vault [vault id]` | `sac`, `bag`, `b`, `coffre`, `chest` | `essentials.vault.use` | Ouvrir votre coffre personnel |

### Sous-commandes de Coffre

La commande `/vault` supporte les sous-commandes suivantes :

| Sous-commande | Permission | Description |
|---------------|------------|-------------|
| `set <player> <slot>` | `essentials.vault.set.slot` | Définir le nombre d'emplacements de coffre d'un joueur |
| `add <player> <slot>` | `essentials.vault.add.slot` | Ajouter des emplacements de coffre à un joueur |
| `give <player> <item> [amount]` | `essentials.vault.give` | Donner un objet dans le coffre d'un joueur |
| `info <player>` | `essentials.vault.info` | Afficher les informations du coffre |
| `show <player>` | `essentials.vault.show` | Afficher les coffres d'un joueur |
| `get <player> <vault> <slot> [give]` | `essentials.vault.get.slot` | Récupérer le contenu d'un emplacement de coffre |
| `delete <player> <vault> <slot>` | `essentials.vault.delete.slot` | Supprimer le contenu d'un emplacement de coffre |

Modifier les coffres d'un autre joueur ouverts avec `/vault show` nécessite `essentials.vault.show.edit`.

---

## Commandes d'Hologramme

Commandes pour créer et gérer les hologrammes.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/hologram` | `holo`, `ho` | `essentials.hologram` | Gérer les hologrammes |

### Sous-commandes d'Hologramme

La commande `/hologram` supporte les sous-commandes suivantes :

| Sous-commande | Permission | Description |
|---------------|------------|-------------|
| `create <type> <name>` | `essentials.hologram.create` | Créer un nouvel hologramme |
| `delete <name>` | `essentials.hologram.delete` | Supprimer un hologramme |
| `list` (`l`, `?`) | `essentials.hologram.list` | Lister tous les hologrammes |
| `addline <name> <text>` | `essentials.hologram.add.line` | Ajouter une ligne à un hologramme |
| `setline <name> <line> <text>` | `essentials.hologram.set.line` | Définir le contenu d'une ligne spécifique |
| `removeline <name> <line>` | `essentials.hologram.remove.line` | Supprimer une ligne d'un hologramme |
| `insertbefore <name> <line> <text>` | `essentials.hologram.insert.before.line` | Insérer une ligne avant une ligne spécifique |
| `insertafter <name> <line> <text>` | `essentials.hologram.insert.after.line` | Insérer une ligne après une ligne spécifique |
| `item <name>` | `essentials.hologram.add.line` | Faire afficher à un hologramme d'objet l'objet tenu en main |
| `block <name> <material>` | `essentials.hologram.add.line` | Faire afficher un bloc à un hologramme de bloc |
| `scale <name> <x> <y> <z>` | `essentials.hologram.scale` | Définir l'échelle d'un hologramme |
| `translation <name> <x> <y> <z>` | `essentials.hologram.translation` | Définir le décalage de translation |
| `movehere <name>` | `essentials.hologram.move.here` | Déplacer l'hologramme à votre position |
| `moveto <name> <x> <y> <z>` | `essentials.hologram.move.to` | Déplacer l'hologramme à des coordonnées spécifiques |
| `teleport <name>` (`tp`) | `essentials.hologram.teleport` | Se téléporter à un hologramme |
| `billboard <name> <billboard>` | `essentials.hologram.billboard` | Définir le mode billboard |
| `textalignment <name> <alignment>` | `essentials.hologram.text.alignment` | Définir l'alignement du texte |
| `yaw <name> <yaw>` | `essentials.hologram.yaw` | Définir la rotation horizontale (yaw) |
| `pitch <name> <pitch>` | `essentials.hologram.yaw` | Définir la rotation verticale (pitch) |
| `background <name> <color>` | `essentials.hologram.text.background` | Définir la couleur d'arrière-plan |
| `seethrough <name> <boolean>` | `essentials.hologram.see.through` | Activer/désactiver la visibilité à travers les blocs |
| `textshadow <name> <boolean>` | `essentials.hologram.text.shadow` | Activer/désactiver l'ombre du texte |
| `shadowstrength <name> <strength>` | `essentials.hologram.shadow.strength` | Définir l'intensité de l'ombre |
| `shadowradius <name> <radius>` | `essentials.hologram.shadow.radius` | Définir le rayon de l'ombre |
| `viewdistance <name> <distance>` | `essentials.hologram.shadow.strength` | Définir la distance de vue |

---

## Commandes de Scoreboard

Commandes pour gérer l'affichage du scoreboard.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/sb` | - | `essentials.scoreboard` | Activer/désactiver l'affichage du scoreboard |

---

## Commandes de Vote

Commandes pour gérer les systèmes de vote et de vote party.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/vote` | - | `essentials.vote.use` | Afficher les informations de vote |
| `/voteparty` | `vp` | `essentials.voteparty.use` | Afficher les informations de la vote party |

### Sous-commandes de Vote

| Commande | Permission | Description |
|----------|------------|-------------|
| `/vote add <player> <site> [silent]` | `essentials.vote.add` | Ajouter un vote à un joueur |
| `/voteparty add <amount>` | `essentials.voteparty.add` | Ajouter des votes à la vote party |
| `/voteparty set <amount>` | `essentials.voteparty.set` | Définir le nombre de votes de la vote party |
| `/voteparty remove <amount>` | `essentials.voteparty.remove` | Retirer des votes de la vote party |

---

## Commandes WorldEdit

Commandes WorldEdit légères intégrées à zEssentials.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/player-worldedit` | `pwe`, `ess-worldedit`, `eworldedit`, `ew` | `essentials.worldedit.use` | Accéder aux outils WorldEdit |

### Sous-commandes WorldEdit

La commande `/player-worldedit` supporte les sous-commandes suivantes :

| Sous-commande | Permission | Description |
|---------------|------------|-------------|
| `give <player> <item>` | `essentials.worldedit.give` | Donner un outil WorldEdit |
| `set <material>` | `essentials.worldedit.set` | Remplir la sélection avec un bloc |
| `fill <material>` | `essentials.worldedit.fill` | Remplir les blocs vides de la sélection |
| `walls <material>` | `essentials.worldedit.walls` | Créer des murs autour de la sélection |
| `sphere <material> <radius> [filled]` | `essentials.worldedit.sphere` | Créer une sphère |
| `cyl <material> <radius> <height> [filled]` | `essentials.worldedit.cyl` | Créer un cylindre |
| `cut` | `essentials.worldedit.cut` | Couper la sélection |
| `pos1` | `essentials.worldedit.pos1` | Définir la position 1 |
| `pos2` | `essentials.worldedit.pos2` | Définir la position 2 |
| `confirm` | `essentials.worldedit.confirm` | Confirmer l'opération en cours |
| `cancel` | `essentials.worldedit.cancel` | Annuler l'opération en cours |
| `stop` | `essentials.worldedit.stop` | Arrêter l'opération en cours |
| `option` (`o`) | `essentials.worldedit.option` | Configurer les options WorldEdit |
| `option inventory` (`inv`) | `essentials.worldedit.option.inventory` | Activer/désactiver l'option inventaire |
| `option bossbar` | `essentials.worldedit.option.bossbar` | Activer/désactiver l'option boss bar |

---

## Commandes Discord

Commandes pour lier et délier les comptes Discord.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/link <code>` | `lier` | `essentials.discord.link` | Lier votre compte Discord |
| `/unlink` | `delier` | `essentials.discord.unlink` | Délier votre compte Discord |

---

## Commandes de Courrier

Commandes pour le système de courrier en jeu : boîte aux lettres d'objets et courriers texte.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/mail` | `mailbox`, `mb` | `essentials.mail` | Ouvrir votre boîte aux lettres |

### Sous-commandes de Courrier

La commande `/mail` supporte les sous-commandes suivantes :

| Sous-commande | Permission | Description |
|---------------|------------|-------------|
| `open <player>` | `essentials.mail.open` | Ouvrir la boîte aux lettres d'un joueur |
| `give <player> <item> [amount]` | `essentials.mail.give` | Envoyer un objet dans la boîte aux lettres d'un joueur |
| `give-hand <player>` | `essentials.mail.give.hand` | Envoyer l'objet tenu en main dans la boîte aux lettres d'un joueur |
| `giveall <item> [amount]` | `essentials.mail.giveall` | Envoyer un objet dans les boîtes aux lettres de tous les joueurs |
| `giveall-hand` | `essentials.mail.giveall.hand` | Envoyer l'objet tenu en main dans les boîtes aux lettres de tous les joueurs |
| `clear <player>` | `essentials.mail.clear` | Supprimer les objets de la boîte aux lettres d'un joueur |
| `send <player> <message>` | `essentials.mail.send` | Envoyer un courrier texte à un joueur, connecté ou non |
| `read` | `essentials.mail.read` | Lire les courriers reçus |
| `sendall <message>` | `essentials.mail.send.all` | Envoyer un courrier texte à tous les joueurs connectés |
| `clearmessages [player]` | `essentials.mail.clear.messages` | Supprimer vos courriers texte, ou ceux d'un joueur |

---

## Commandes de Messages de Mort

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/deathmessage [player]` | `dm`, `deathmsg` | `essentials.death.message.toggle` | Activer/désactiver l'affichage des messages de mort |

| Permission | Description |
|------------|-------------|
| `essentials.death.message.toggle.other` | Activer/désactiver les messages de mort d'un autre joueur |
| `essentials.silent.death` | Mourir silencieusement, sans message de mort (si activé dans le module) |

---

## Commandes de Step

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/step` | - | `essentials.step` | Afficher les commandes de step |
| `/step start <player> <step>` | - | `essentials.step.start` | Démarrer une étape pour un joueur |
| `/step finish <player> <step>` | - | `essentials.step.finish` | Terminer une étape pour un joueur |

---

## Commandes de Vol

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/fly [player]` | - | `essentials.fly` | Activer/désactiver le mode vol |
| `/flyspeed <speed>` | `fspeed` | `essentials.fly.speed` | Modifier la vitesse de vol |

### Sous-commandes de Vol

La commande `/fly` gère aussi le temps de vol temporaire :

| Sous-commande | Permission | Description |
|---------------|------------|-------------|
| `add <player> <seconds>` | `essentials.fly.add` | Ajouter du temps de vol à un joueur |
| `remove <player> <seconds>` | `essentials.fly.remove` | Retirer du temps de vol à un joueur |
| `set <player> <seconds>` | `essentials.fly.set` | Définir le temps de vol d'un joueur |
| `get <player>` | `essentials.fly.get` | Afficher le temps de vol d'un joueur |
| `info` | `essentials.fly.info` | Afficher votre temps de vol restant |

| Permission | Description |
|------------|-------------|
| `essentials.fly.other` | Activer/désactiver le vol d'un autre joueur |
| `essentials.fly.unlimited` | Vol illimité (aucun temps de vol temporaire consommé) |
| `essentials.fly.bypass.world` | Voler même dans les mondes où le vol est désactivé |
| `essentials.fly.safelogin` | Activer automatiquement le vol à la connexion si le joueur est suspendu dans les airs |

---

## Commandes d'Administration & Utilitaires

Commandes générales d'administration et utilitaires.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/god [player]` | - | `essentials.god` | Activer/désactiver le mode dieu (invincibilité) |
| `/vanish [player]` | `v` | `essentials.vanish` | Activer/désactiver le mode vanish (invisibilité) |
| `/heal [player\|*]` | - | `essentials.heal` | Soigner un joueur complètement |
| `/feed [player\|*]` | `eat` | `essentials.feed` | Nourrir un joueur complètement |
| `/lightning [player\|*] [--only-visual]` | `strike` | `essentials.lighting` | Faire tomber la foudre sur un joueur |
| `/speed <speed> [player]` | - | `essentials.speed` | Modifier la vitesse de déplacement |
| `/walkspeed <speed>` | `wspeed` | `essentials.walk.speed` | Modifier la vitesse de marche |
| `/more` | - | `essentials.more` | Remplir la pile de l'objet tenu au maximum |
| `/trash` | `poubelle` | `essentials.trash` | Ouvrir l'inventaire poubelle |
| `/craft` | - | `essentials.craft` | Ouvrir un établi virtuel |
| `/enchanting` | - | `essentials.enchanting` | Ouvrir une table d'enchantement virtuelle |
| `/invsee <player>` | - | `essentials.invsee` | Voir l'inventaire d'un autre joueur |
| `/clearinventory [player]` | `clear`, `ci` | `essentials.clearinventory` | Vider l'inventaire d'un joueur |
| `/compact [type]` | `blocks`, `condense` | `essentials.compact` | Compacter les objets en forme de bloc |
| `/compactall` | `blocksall`, `condenseall` | `essentials.compact.all` | Compacter tous les objets de l'inventaire |
| `/hat` | - | `essentials.hat` | Porter l'objet tenu comme chapeau |
| `/anvil` | - | `essentials.anvil` | Ouvrir une enclume virtuelle |
| `/cartographytable` | - | `essentials.cartographytable` | Ouvrir une table de cartographie virtuelle |
| `/grindstone` | - | `essentials.grindstone` | Ouvrir une meule virtuelle |
| `/loom` | - | `essentials.loom` | Ouvrir un métier à tisser virtuel |
| `/stonecutter` | - | `essentials.stonecutter` | Ouvrir un tailleur de pierre virtuel |
| `/smithingtable` | - | `essentials.smithingtable` | Ouvrir une table de forgeron virtuelle |
| `/furnace` | `burn` | `essentials.furnace` | Fondre l'objet dans votre main |
| `/skull [player]` | - | `essentials.skull` | Obtenir la tête d'un joueur |
| `/enderchest` | `ec` | `essentials.enderchest` | Ouvrir votre coffre de l'Ender |
| `/endersee <player>` | `ecsee` | `essentials.endersee` | Ouvrir le coffre de l'Ender d'un autre joueur |
| `/repair` | `fix` | `essentials.repair` | Réparer l'objet tenu |
| `/repairall [player]` | `fixall` | `essentials.repair.all` | Réparer tous les objets de l'inventaire |
| `/ext [player]` | - | `essentials.ext` | S'éteindre (arrêter de brûler) |
| `/near` | - | `essentials.near` | Afficher les joueurs à proximité |
| `/playtime` | - | `essentials.play.time` | Afficher votre temps de jeu total |
| `/killall [type] [world] [radius]` | - | `essentials.kill.all` | Tuer toutes les entités dans la zone |
| `/lag` | - | `essentials.lag` | Afficher le nombre d'entités par monde |
| `/enchant <enchantment> [level] [player]` | `enchantment` | `essentials.enchant` | Ajouter un enchantement à l'objet tenu |
| `/nightvision [player]` | `nv` | `essentials.nightvision` | Activer/désactiver la vision nocturne |
| `/phantoms [player]` | - | `essentials.phantoms` | Activer/désactiver l'apparition des phantoms |
| `/sudo <player> <command/message>` | `su` | `essentials.sudo` | Forcer un joueur à exécuter une commande ou à envoyer un message |
| `/afk` | - | `essentials.afk` | Activer/désactiver le statut AFK |
| `/rules` | `?`, `help`, `aide` | `essentials.rules` | Afficher les règles du serveur |
| `/cooldown` | - | `essentials.cooldown` | Afficher ou gérer les temps de recharge des commandes |
| `/itemname <name>` | `iname`, `itemrename`, `irename` | `essentials.item.name` | Renommer l'objet tenu |
| `/itemlore` | `ilore`, `lore` | `essentials.item.lore` | Gérer la description de l'objet tenu |
| `/give <player> <item> [amount]` | - | `essentials.give` | Donner des objets à un joueur |
| `/giveall <item> [amount]` | - | `essentials.give.all` | Donner des objets à tous les joueurs |
| `/powertools [command]` | `pt` | `essentials.power.tools` | Lier une commande à l'objet tenu |
| `/powertools-toggle [player]` | `pt-toggle` | `essentials.power.tools.toggle` | Activer/désactiver les power tools |
| `/experience` | `xp`, `exp`, `level`, `levels` | `essentials.experience` | Gérer l'expérience des joueurs |
| `/suicide` | - | `essentials.suicide` | Se suicider |
| `/kittycannon` | - | `essentials.kitty.cannon` | Lancer des chatons explosifs |
| `/itemframe` | `iframe` | `essentials.itemframe` | Basculer la visibilité du cadre d'objet que vous regardez |

### Permissions Utilitaires

| Permission | Description |
|------------|-------------|
| `essentials.god.other` | Activer/désactiver le mode dieu d'un autre joueur |
| `essentials.vanish.other` | Activer/désactiver le vanish d'un autre joueur |
| `essentials.vanish.see` | Voir les joueurs en vanish |
| `essentials.heal.other` | Soigner un autre joueur |
| `essentials.heal.all` | Soigner tous les joueurs avec `/heal *` |
| `essentials.feed.other` | Nourrir un autre joueur (aussi utilisée par `/ext <player>`) |
| `essentials.feed.all` | Nourrir tous les joueurs avec `/feed *` |
| `essentials.lighting.other` | Faire tomber la foudre sur un autre joueur |
| `essentials.lighting.all` | Faire tomber la foudre sur tous les joueurs avec `/lightning *` |
| `essentials.clearinventory.other` | Vider l'inventaire d'un autre joueur |
| `essentials.repair.all.other` | Réparer tous les objets d'un autre joueur |
| `essentials.endersee.offline` | Ouvrir le coffre de l'Ender d'un joueur hors ligne |
| `essentials.invsee.interact` | Interagir avec (modifier) un inventaire ouvert avec `/invsee` |
| `essentials.phantoms.other` | Activer/désactiver les phantoms d'un autre joueur |
| `essentials.power.tools.toggle.other` | Activer/désactiver les power tools d'un autre joueur |
| `essentials.sudo.bypass` | Ne pas pouvoir être ciblé par `/sudo` |
| `essentials.afk.bypass` | Ne pas être affecté par l'anti-AFK |
| `essentials.silent.join` | Rejoindre le serveur silencieusement (si activé dans le module join/quit) |
| `essentials.silent.quit` | Quitter le serveur silencieusement (si activé dans le module join/quit) |

Le module AFK utilise aussi les permissions définies dans `modules/afk/config.yml` (par exemple `zessentials.afk.vip`).

### Sous-commandes de Temps de Recharge

La commande `/cooldown` supporte les sous-commandes suivantes :

| Sous-commande | Alias | Permission | Description |
|---------------|-------|------------|-------------|
| `show [player]` | `s` | `essentials.cooldown.show` | Afficher les temps de recharge actifs d'un joueur |
| `delete <player> <cooldown>` | - | `essentials.cooldown.delete` | Supprimer un temps de recharge d'un joueur |
| `create <player> <key> <duration>` | - | `essentials.cooldown.create` | Créer un temps de recharge pour un joueur |

### Sous-commandes de Description d'Objet

La commande `/itemlore` supporte les sous-commandes suivantes :

| Sous-commande | Permission | Description |
|---------------|------------|-------------|
| `add <line>` | `essentials.item.lore.add` | Ajouter une ligne de description à l'objet |
| `set <index> <line>` | `essentials.item.lore.set` | Définir une ligne de description spécifique |
| `clear` | `essentials.item.lore.clear` | Effacer toute la description de l'objet |

### Sous-commandes d'Expérience

La commande `/experience` supporte les sous-commandes suivantes :

| Sous-commande | Permission | Description |
|---------------|------------|-------------|
| `query <player> <type>` | `essentials.experience.query` | Vérifier l'expérience d'un joueur |
| `set <player> <amount> <type>` | `essentials.experience.set` | Définir l'expérience d'un joueur |
| `grant <player> <amount> <type>` | `essentials.experience.grant` | Accorder de l'expérience à un joueur |
| `grant-random <player> <min-amount> <max-amount> <type>` | `essentials.experience.grant` | Accorder une quantité aléatoire d'expérience à un joueur |
| `take <player> <amount> <type>` | `essentials.experience.take` | Retirer de l'expérience à un joueur |

### Sous-commandes de Lag

La commande `/lag` supporte les sous-commandes suivantes (toutes utilisent `essentials.lag`) :

| Sous-commande | Description |
|---------------|-------------|
| `world <world>` | Afficher le nombre détaillé d'entités d'un monde |
| `clear [world/entity] [entity]` | Supprimer les entités d'un monde ou de tout le serveur |
| `clearcooldown <time> [world/entity] [entity]` | Supprimer les entités après un délai |

---

## Autres Permissions

| Permission | Par défaut | Description |
|------------|------------|-------------|
| `zessentials.paper.warning` | op | Recevoir, à la connexion, l'avertissement indiquant que le serveur tourne sous Spigot au lieu de Paper. zEssentials nécessite Paper et reste inactif sous Spigot |

---

## Permissions de Contournement

Ces permissions permettent aux joueurs de contourner certaines restrictions.

| Permission | Description |
|------------|-------------|
| `essentials.bypass.cooldown` | Contourner les temps de recharge des commandes (`command-cooldowns` dans `config.yml`, commandes personnalisées, courrier), si `enable-cooldown-bypass` est activé |
| `essentials.cooldown.command.bypass` | Contourner le temps de recharge anti-spam des commandes (`cooldowns` dans `config.yml`) |
| `essentials.kit.bypass.cooldown` | Contourner le temps de recharge des kits |
| `essentials.teleport.bypass` | Contourner le délai de téléportation |
| `essentials.fly.bypass.world` | Voler dans les mondes où le vol est désactivé |
| `essentials.afk.bypass` | Ne pas être affecté par l'anti-AFK |
| `essentials.kick.bypass.all` | Ne pas être expulsé par `/kickall` |
| `essentials.sudo.bypass` | Ne pas pouvoir être ciblé par `/sudo` |

---

## Temps de Recharge des Commandes

zEssentials supporte des temps de recharge configurables sur les commandes. Lorsqu'un temps de recharge est actif, un joueur doit attendre la durée spécifiée avant de pouvoir utiliser la même commande à nouveau.

### Fonctionnement des Temps de Recharge

- Les temps de recharge sont appliqués **par joueur** et **par commande**.
- Lorsqu'un joueur exécute une commande avec un temps de recharge, un minuteur démarre. Le joueur ne peut pas utiliser cette commande à nouveau tant que le minuteur n'a pas expiré.
- Les durées des temps de recharge sont définies dans la section `command-cooldowns` de `config.yml`, avec des durées optionnelles par permission (par exemple `essentials.cooldown.heal.vip`).
- Les temps de recharge actifs peuvent être consultés et gérés en utilisant la commande `/cooldown` avec les sous-commandes `show`, `delete` et `create`.

### Exceptions Basées sur les Permissions

Les temps de recharge peuvent être entièrement contournés en utilisant la permission `essentials.bypass.cooldown`, à condition que `enable-cooldown-bypass` soit défini sur `true` dans `config.yml`. Les joueurs disposant de cette permission (généralement les membres du staff) ne seront jamais soumis aux temps de recharge des commandes, leur permettant d'utiliser n'importe quelle commande sans délai.

Ceci est particulièrement utile pour :
- **Les administrateurs** qui ont besoin d'un accès illimité à toutes les commandes en permanence.
- **Les modérateurs** qui nécessitent une utilisation rapide des commandes de sanction en cas d'urgence.
- **Les constructeurs** qui utilisent fréquemment les commandes de téléportation et WorldEdit.
