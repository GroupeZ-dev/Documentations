---
sidebar_position: 3
title: Commandes & Permissions
description: Liste complète de toutes les commandes et permissions pour zEssentials
---

# Commandes & Permissions

Cette page contient la liste complète de toutes les commandes et permissions disponibles dans zEssentials. Les commandes sont organisées par catégorie pour faciliter la consultation.

:::info Guide de Syntaxe
- `< >` indique un argument **obligatoire**.
- `[ ]` indique un argument **optionnel**.
- `|` sépare plusieurs alias pour la même commande.
:::

---

## Commandes de Mode de Jeu

Commandes pour changer le mode de jeu des joueurs.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/gamemode` | `gm` | `essentials.gamemode` | Changer le mode de jeu du joueur |
| `/gmc` | `creat` | `essentials.gamemode.creative` | Passer en mode créatif |
| `/gma` | `advent` | `essentials.gamemode.adventure` | Passer en mode aventure |
| `/gms` | `survi` | `essentials.gamemode.survival` | Passer en mode survie |
| `/gmsp` | `spec` | `essentials.gamemode.spectator` | Passer en mode spectateur |

---

## Commandes Météo & Temps

Commandes pour contrôler la météo et le temps, y compris les modifications par joueur.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/day` | - | `essentials.day` | Régler le temps sur jour |
| `/night` | - | `essentials.night` | Régler le temps sur nuit |
| `/sun` | - | `essentials.sun` | Régler la météo sur ensoleillé |
| `/player-weather` | `pweather` | `essentials.player.weather` | Changer la météo personnelle (côté client uniquement) |
| `/player-time` | `ptime` | `essentials.player.time` | Changer le temps personnel (côté client uniquement) |

---

## Commandes de Téléportation

Commandes pour téléporter les joueurs vers des emplacements, d'autres joueurs ou des coordonnées aléatoires.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/tp` | - | `essentials.tp` | Se téléporter vers un joueur ou un emplacement |
| `/tpall` | - | `essentials.tp.all` | Téléporter tous les joueurs vers vous |
| `/tphere` | `s` | `essentials.tp.here` | Téléporter un joueur vers vous |
| `/tpa` | - | `essentials.tpa` | Demander à se téléporter vers un joueur |
| `/tpahere` | - | `essentials.tpa.here` | Demander à un joueur de se téléporter vers vous |
| `/tpaccept` | `tpyes` | `essentials.tpa.accept` | Accepter une demande de téléportation entrante |
| `/tpdeny` | `tpno` | `essentials.tpa.deny` | Refuser une demande de téléportation entrante |
| `/tpacancel` | - | `essentials.tpa.cancel` | Annuler votre demande de téléportation sortante |
| `/back` | - | `essentials.back` | Se téléporter à votre emplacement précédent |
| `/tpr` | `rtp` | `essentials.tp.random` | Se téléporter à un emplacement aléatoire |
| `/top` | - | `essentials.top` | Se téléporter au bloc le plus haut à votre position |
| `/bottom` | - | `essentials.bottom` | Se téléporter au bloc le plus bas à votre position |
| `/worldtp` | `wtp` | `essentials.tp.world` | Se téléporter dans un autre monde |

---

## Commandes de Spawn

Commandes pour gérer et se téléporter aux points de spawn.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/spawn` | - | `essentials.spawn` | Se téléporter au spawn du serveur |
| `/setspawn` | - | `essentials.set.spawn` | Définir l'emplacement du spawn du serveur |
| `/firstspawn` | - | `essentials.spawn.first` | Se téléporter au premier point de spawn |
| `/setfirstspawn` | - | `essentials.set.first.spawn` | Définir le premier point de spawn pour les nouveaux joueurs |

---

## Commandes de Warp

Commandes pour créer, supprimer et se téléporter aux warps.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/warp` | `w` | `essentials.warp` | Se téléporter à un warp |
| `/setwarp` | `wcreate` | `essentials.warp.set` | Créer un nouveau warp |
| `/delwarp` | `wdelete` | `essentials.warp.del` | Supprimer un warp existant |
| `/warps` | `wlist` | `essentials.warps` | Lister tous les warps disponibles |

---

## Commandes de Résidence

Commandes pour gérer les emplacements de résidence personnels.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/home` | `h`, `homes` | `essentials.home` | Se téléporter à une résidence |
| `/sethome` | `hcreate`, `hc` | `essentials.set.home` | Créer une nouvelle résidence |
| `/sethomeconfirm` | - | `essentials.set.home.confirm` | Confirmer la création d'une résidence |
| `/delhome` | `hdelete`, `hd` | `essentials.del.home` | Supprimer une résidence |
| `/delhomeconfirm` | - | `essentials.del.home.confirm` | Confirmer la suppression d'une résidence |

---

## Commandes d'Économie

Commandes pour gérer l'économie en jeu, les soldes et les paiements.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/money` | `balance` | `essentials.money` | Afficher votre solde actuel |
| `/pay` | - | `essentials.pay` | Payer un autre joueur |
| `/paytoggle` | - | `essentials.pay.toggle` | Activer/désactiver la réception des paiements |
| `/economy` | `eco` | `essentials.eco.use` | Gérer les économies |
| `/balancetop` | `baltop` | `essentials.balance.top` | Afficher le classement des meilleurs soldes |

### Sous-commandes d'Économie

La commande `/economy` supporte les sous-commandes suivantes :

| Sous-commande | Description |
|---------------|-------------|
| `give` | Donner de l'argent à un joueur |
| `take` | Retirer de l'argent à un joueur |
| `set` | Définir le solde d'un joueur |
| `reset` | Réinitialiser le solde d'un joueur |
| `reset-all` | Réinitialiser les soldes de tous les joueurs |
| `show` | Afficher le solde d'un joueur |
| `give-random` | Donner de l'argent à un joueur aléatoire |
| `give-all` | Donner de l'argent à tous les joueurs |

---

## Commandes de Sanction

Commandes pour modérer et sanctionner les joueurs.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/ban` | - | `essentials.ban` | Bannir un joueur du serveur |
| `/unban` | - | `essentials.unban` | Débannir un joueur |
| `/mute` | - | `essentials.mute` | Rendre un joueur muet |
| `/unmute` | - | `essentials.unmute` | Retirer le mute d'un joueur |
| `/kick` | - | `essentials.kick` | Expulser un joueur du serveur |
| `/kickall` | - | `essentials.kick.all` | Expulser tous les joueurs du serveur |
| `/freeze` | - | `essentials.freeze` | Geler un joueur sur place |
| `/sanction` | `sc` | `essentials.sanction` | Ouvrir l'interface de sanction |
| `/seen` | `whois` | `essentials.seen` | Afficher les informations d'un joueur |
| `/seenip` | `whoisip` | `essentials.seen.ip` | Afficher tous les joueurs partageant la même adresse IP |

---

## Commandes de Chat

Commandes pour gérer et interagir avec le chat du serveur.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/chathistory` | `ct` | `essentials.chat.history` | Afficher l'historique du chat |
| `/chatclear` | `cl` | `essentials.chat.clear` | Effacer le chat |
| `/chatenable` | `ce` | `essentials.chat.enable` | Activer le chat |
| `/chatdisable` | `cd` | `essentials.chat.disable` | Désactiver le chat |
| `/broadcast` | `bc` | `essentials.chat.broadcast` | Diffuser un message à tous les joueurs |
| `/showitem` | - | `essentials.show.item` | Afficher l'objet tenu en main dans le chat |
| `/pub` | - | `essentials.pub` | Envoyer un message mis en avant dans le chat |

---

## Commandes de Messagerie

Commandes pour la messagerie privée entre joueurs.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/message` | `msg`, `tell`, `whisper`, `m`, `w` | `essentials.message` | Envoyer un message privé à un joueur |
| `/reply` | `r` | `essentials.reply` | Répondre au dernier message privé |
| `/messagetoggle` | `msgtoggle`, `mtg` | `essentials.message.toggle` | Activer/désactiver les messages privés |
| `/socialspy` | - | `essentials.socialspy` | Espionner tous les messages privés |

---

## Commandes de Kit

Commandes pour gérer et distribuer les kits.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/kit` | `kits` | `essentials.kit` | Recevoir un kit |
| `/showkit` | - | `essentials.kit.show` | Prévisualiser le contenu d'un kit |
| `/kiteditor` | `keditor` | `essentials.kit.editor` | Ouvrir l'éditeur de kits |
| `/kitcreate` | `kcreate` | `essentials.kit.create` | Créer un nouveau kit |
| `/kitdelete` | `kdelete` | `essentials.kit.delete` | Supprimer un kit existant |
| `/kitgive` | `kgive` | `essentials.kit.give` | Donner un kit à un autre joueur |

---

## Commandes de Coffre

Commandes pour accéder et gérer les coffres personnels.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/vault` | `sac`, `bag`, `b`, `coffre`, `chest` | `essentials.vault.use` | Ouvrir votre coffre personnel |

### Sous-commandes de Coffre

La commande `/vault` supporte les sous-commandes suivantes :

| Sous-commande | Description |
|---------------|-------------|
| `set-slot` | Définir le nombre d'emplacements de coffre pour un joueur |
| `add-slot` | Ajouter des emplacements de coffre à un joueur |
| `give` | Donner un coffre à un joueur |
| `info` | Afficher les informations du coffre |
| `show` | Afficher le contenu du coffre |
| `get-slot` | Obtenir le nombre d'emplacements de coffre d'un joueur |
| `delete-slot` | Supprimer des emplacements de coffre d'un joueur |

---

## Commandes d'Hologramme

Commandes pour créer et gérer les hologrammes.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/hologram` | `holo`, `ho` | `essentials.hologram` | Gérer les hologrammes |

### Sous-commandes d'Hologramme

La commande `/hologram` supporte les sous-commandes suivantes :

| Sous-commande | Description |
|---------------|-------------|
| `create` | Créer un nouvel hologramme |
| `delete` | Supprimer un hologramme |
| `addline` | Ajouter une ligne à un hologramme |
| `setline` | Définir le contenu d'une ligne spécifique |
| `removeline` | Supprimer une ligne d'un hologramme |
| `scale` | Définir l'échelle d'un hologramme |
| `translation` | Définir le décalage de translation |
| `movehere` | Déplacer l'hologramme à votre position |
| `moveto` | Déplacer l'hologramme à des coordonnées spécifiques |
| `billboard` | Définir le mode billboard |
| `textalignment` | Définir l'alignement du texte |
| `yaw` | Définir la rotation yaw |
| `pitch` | Définir la rotation pitch |
| `insertbeforeline` | Insérer une ligne avant une ligne spécifique |
| `insertafterline` | Insérer une ligne après une ligne spécifique |
| `background` | Définir la couleur d'arrière-plan |
| `list` | Lister tous les hologrammes |
| `teleport` | Se téléporter à un hologramme |
| `seethrough` | Activer/désactiver le mode transparent |
| `textshadow` | Activer/désactiver l'ombre du texte |
| `shadowstrength` | Définir l'intensité de l'ombre |
| `shadowradius` | Définir le rayon de l'ombre |
| `viewdistance` | Définir la distance de vue |
| `item` | Configurer un hologramme pour afficher un objet |
| `block` | Configurer un hologramme pour afficher un bloc |

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
| `/voteparty` | `vp` | `essentials.voteparty.use` | Afficher les informations du vote party |

### Sous-commandes de Vote

Les commandes `/vote` et `/voteparty` supportent les sous-commandes suivantes :

| Sous-commande | Description |
|---------------|-------------|
| `add` | Ajouter des votes à un joueur ou au vote party |
| `set` | Définir le nombre de votes |
| `remove` | Retirer des votes d'un joueur ou du vote party |

---

## Commandes WorldEdit

Commandes WorldEdit légères intégrées dans zEssentials.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/player-worldedit` | `pwe`, `ess-worldedit`, `eworldedit`, `ew` | `essentials.worldedit.use` | Accéder aux outils WorldEdit |

### Sous-commandes WorldEdit

La commande `/player-worldedit` supporte les sous-commandes suivantes :

| Sous-commande | Description |
|---------------|-------------|
| `give` | Donner l'outil WorldEdit |
| `set` | Remplir la sélection avec un bloc |
| `walls` | Créer des murs autour de la sélection |
| `sphere` | Créer une sphère |
| `fill` | Remplir une zone |
| `cyl` | Créer un cylindre |
| `cut` | Couper la sélection |
| `stop` | Arrêter l'opération en cours |
| `confirm` | Confirmer l'opération en cours |
| `cancel` | Annuler l'opération en cours |
| `pos1` | Définir la position 1 |
| `pos2` | Définir la position 2 |
| `option` | Configurer les options WorldEdit |

---

## Commandes Discord

Commandes pour lier et délier les comptes Discord.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/link` | `lier` | `essentials.discord.link` | Lier votre compte Discord |
| `/unlink` | `delier` | `essentials.discord.unlink` | Délier votre compte Discord |

---

## Commandes de Courrier

Commandes pour le système de courrier en jeu.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/mail` | `mailbox`, `mb` | `essentials.mail` | Ouvrir votre boîte aux lettres |

### Sous-commandes de Courrier

La commande `/mail` supporte les sous-commandes suivantes :

| Sous-commande | Description |
|---------------|-------------|
| `open` | Ouvrir votre boîte aux lettres |
| `give` | Envoyer un objet dans la boîte aux lettres d'un joueur |
| `give-hand` | Envoyer l'objet tenu en main dans la boîte aux lettres d'un joueur |
| `clear` | Vider votre boîte aux lettres |
| `give-all` | Envoyer un objet dans les boîtes aux lettres de tous les joueurs |
| `give-all-hand` | Envoyer l'objet tenu en main dans les boîtes aux lettres de tous les joueurs |

---

## Commandes d'Administration & Utilitaires

Commandes générales d'administration et utilitaires.

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/god` | - | `essentials.god` | Activer/désactiver le mode dieu (invincibilité) |
| `/vanish` | `v` | `essentials.vanish` | Activer/désactiver le mode vanish (invisibilité) |
| `/heal` | - | `essentials.heal` | Soigner un joueur complètement |
| `/lightning` | `strike` | `essentials.lighting` | Faire tomber la foudre à un emplacement |
| `/fly` | - | `essentials.fly` | Activer/désactiver le mode vol |
| `/speed` | - | `essentials.speed` | Modifier la vitesse de déplacement |
| `/walkspeed` | `wspeed` | `essentials.walk.speed` | Modifier la vitesse de marche |
| `/flyspeed` | `fspeed` | `essentials.fly.speed` | Modifier la vitesse de vol |
| `/more` | - | `essentials.more` | Remplir la pile de l'objet tenu au maximum |
| `/trash` | `poubelle` | `essentials.trash` | Ouvrir l'inventaire poubelle |
| `/feed` | `eat` | `essentials.feed` | Nourrir un joueur complètement |
| `/craft` | - | `essentials.craft` | Ouvrir un établi virtuel |
| `/enchanting` | - | `essentials.enchanting` | Ouvrir une table d'enchantement virtuelle |
| `/invsee` | - | `essentials.invsee` | Voir l'inventaire d'un autre joueur |
| `/clearinventory` | `clear`, `ci` | `essentials.clearinventory` | Vider l'inventaire d'un joueur |
| `/compact` | `blocks`, `condense` | `essentials.compact` | Compacter les objets en forme de bloc |
| `/compactall` | `blocksall`, `condenseall` | `essentials.compact.all` | Compacter tous les objets de l'inventaire |
| `/hat` | - | `essentials.hat` | Porter l'objet tenu comme chapeau |
| `/anvil` | - | `essentials.anvil` | Ouvrir une enclume virtuelle |
| `/cartographytable` | - | `essentials.cartographytable` | Ouvrir une table de cartographie virtuelle |
| `/grindstone` | - | `essentials.grindstone` | Ouvrir une meule virtuelle |
| `/loom` | - | `essentials.loom` | Ouvrir un métier à tisser virtuel |
| `/stonecutter` | - | `essentials.stonecutter` | Ouvrir un tailleur de pierre virtuel |
| `/smithingtable` | - | `essentials.smithingtable` | Ouvrir une table de forgeron virtuelle |
| `/furnace` | `burn` | `essentials.furnace` | Fondre l'objet dans votre main |
| `/skull` | - | `essentials.skull` | Obtenir la tête d'un joueur |
| `/enderchest` | `ec` | `essentials.enderchest` | Ouvrir votre coffre de l'Ender |
| `/endersee` | `ecsee` | `essentials.endersee` | Ouvrir le coffre de l'Ender d'un autre joueur |
| `/repair` | `fix` | `essentials.repair` | Réparer l'objet tenu |
| `/repairall` | `fixall` | `essentials.repair.all` | Réparer tous les objets de l'inventaire |
| `/ext` | - | `essentials.ext` | S'éteindre (arrêter de brûler) |
| `/near` | - | `essentials.near` | Afficher les joueurs à proximité |
| `/playtime` | - | `essentials.play.time` | Afficher votre temps de jeu total |
| `/essversion` | `ev` | `essentials.use` | Afficher la version du plugin |
| `/killall` | - | `essentials.kill.all` | Tuer toutes les entités dans la zone |
| `/lag` | - | `essentials.lag` | Afficher le nombre d'entités et les performances du serveur |
| `/enchant` | `enchantment` | `essentials.enchant` | Ajouter un enchantement à l'objet tenu |
| `/nightvision` | `nv` | `essentials.nightvision` | Activer/désactiver la vision nocturne |
| `/phantoms` | - | `essentials.phantoms` | Activer/désactiver l'apparition des phantoms |
| `/sudo` | `su` | `essentials.sudo` | Forcer un joueur à exécuter une commande |
| `/afk` | - | `essentials.afk` | Activer/désactiver le statut AFK |
| `/rules` | `?`, `help`, `aide` | `essentials.rules` | Afficher les règles du serveur |
| `/cooldown` | - | `essentials.cooldown` | Afficher ou gérer les temps de recharge des commandes |
| `/itemname` | `iname`, `itemrename`, `irename` | `essentials.item.name` | Renommer l'objet tenu |
| `/itemlore` | `ilore`, `lore` | `essentials.item.lore` | Gérer la description de l'objet tenu |
| `/give` | - | `essentials.give` | Donner des objets à un joueur |
| `/giveall` | - | `essentials.give.all` | Donner des objets à tous les joueurs |
| `/powertools` | `pt` | `essentials.power.tools` | Lier une commande à l'objet tenu |
| `/powertools-toggle` | `pt-toggle` | `essentials.power.tools.toggle` | Activer/désactiver les power tools |
| `/experience` | `xp`, `exp`, `level`, `levels` | `essentials.experience` | Gérer l'expérience des joueurs |
| `/step` | - | `essentials.step` | Afficher les commandes de step |
| `/suicide` | - | `essentials.suicide` | Se suicider |
| `/kittycannon` | - | `essentials.kitty.cannon` | Lancer des chatons explosifs |

### Sous-commandes de Temps de Recharge

La commande `/cooldown` supporte les sous-commandes suivantes :

| Sous-commande | Description |
|---------------|-------------|
| `show` | Afficher les temps de recharge actifs d'un joueur |
| `delete` | Supprimer un temps de recharge d'un joueur |
| `create` | Créer un temps de recharge pour un joueur |

### Sous-commandes de Description d'Objet

La commande `/itemlore` supporte les sous-commandes suivantes :

| Sous-commande | Description |
|---------------|-------------|
| `add` | Ajouter une ligne de description à l'objet |
| `set` | Définir une ligne de description spécifique |
| `clear` | Effacer toute la description de l'objet |

### Sous-commandes d'Expérience

La commande `/experience` supporte les sous-commandes suivantes :

| Sous-commande | Description |
|---------------|-------------|
| `query` | Vérifier l'expérience d'un joueur |
| `set` | Définir l'expérience d'un joueur |
| `grant` | Accorder de l'expérience à un joueur |
| `take` | Retirer de l'expérience à un joueur |

### Sous-commandes de Lag

La commande `/lag` supporte les sous-commandes suivantes :

| Sous-commande | Description |
|---------------|-------------|
| `world` | Afficher le nombre d'entités par monde |
| `clear` | Supprimer les entités |
| `clear-timer` | Définir un minuteur de suppression automatique des entités |

---

## Permissions de Contournement

Ces permissions permettent aux joueurs de contourner certaines restrictions.

| Permission | Description |
|------------|-------------|
| `essentials.bypass.cooldown` | Contourner les temps de recharge des commandes, permettant la réutilisation immédiate de toute commande |

---

## Temps de Recharge des Commandes

zEssentials supporte des temps de recharge configurables sur les commandes. Lorsqu'un temps de recharge est actif, un joueur doit attendre la durée spécifiée avant de pouvoir utiliser la même commande à nouveau.

### Fonctionnement des Temps de Recharge

- Les temps de recharge sont appliqués **par joueur** et **par commande**.
- Lorsqu'un joueur exécute une commande avec un temps de recharge, un minuteur démarre. Le joueur ne peut pas utiliser cette commande à nouveau tant que le minuteur n'a pas expiré.
- Les durées des temps de recharge sont définies dans la configuration du plugin.
- Les temps de recharge actifs peuvent être consultés et gérés en utilisant la commande `/cooldown` avec les sous-commandes `show`, `delete` et `create`.

### Exceptions Basées sur les Permissions

Les temps de recharge peuvent être entièrement contournés en utilisant la permission `essentials.bypass.cooldown`. Les joueurs disposant de cette permission (généralement les membres du staff) ne seront jamais soumis aux temps de recharge des commandes, leur permettant d'utiliser n'importe quelle commande sans délai.

Ceci est particulièrement utile pour :
- **Les administrateurs** qui ont besoin d'un accès illimité à toutes les commandes en permanence.
- **Les modérateurs** qui nécessitent une utilisation rapide des commandes de sanction en cas d'urgence.
- **Les constructeurs** qui utilisent fréquemment les commandes de téléportation et WorldEdit.
