---
sidebar_position: 4
title: Placeholders
description: Liste complète des placeholders PlaceholderAPI pour zEssentials
---

# Placeholders

zEssentials fournit **150+ placeholders** via [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/). Tous les placeholders utilisent le préfixe `%zessentials_` et peuvent être utilisés partout où PlaceholderAPI est supporté, y compris les scoreboards, hologrammes, formatage du chat, tab lists, et plus encore.

## Prérequis

- [PlaceholderAPI](https://www.spigotmc.org/resources/placeholderapi.6245/) doit être installé et activé sur votre serveur.
- L'expansion zEssentials est enregistrée automatiquement au chargement du plugin. Vous pouvez le vérifier avec `/papi list`.

:::tip
Les placeholders contenant `{accolades}` sont des paramètres dynamiques que vous devez remplacer par des valeurs réelles. Par exemple, `%zessentials_user_balance_{economy}%` devient `%zessentials_user_balance_default%` si votre économie s'appelle `default`.
:::

---

## Informations Utilisateur

Informations générales sur le joueur.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_is_god%` | Retourne true si le joueur est en mode dieu | Boolean |
| `%zessentials_user_is_afk%` | Retourne true si le joueur est AFK | Boolean |
| `%zessentials_user_afk_status%` | Retourne le texte de placeholder configuré pour le statut AFK | String |
| `%zessentials_user_has_discord_linked%` | Retourne true si le joueur a lié son compte Discord | Boolean |
| `%zessentials_user_world%` | Nom du monde actuel du joueur | String |
| `%zessentials_user_x%` | Coordonnée X précise du joueur | Decimal |
| `%zessentials_user_y%` | Coordonnée Y précise du joueur | Decimal |
| `%zessentials_user_z%` | Coordonnée Z précise du joueur | Decimal |
| `%zessentials_user_block_x%` | Coordonnée X au niveau du bloc du joueur | Integer |
| `%zessentials_user_block_y%` | Coordonnée Y au niveau du bloc du joueur | Integer |
| `%zessentials_user_block_z%` | Coordonnée Z au niveau du bloc du joueur | Integer |
| `%zessentials_user_biome%` | Le biome dans lequel le joueur se trouve actuellement | String |

---

## Statut Utilisateur

Placeholders supplémentaires de statut et d'informations pour les utilisateurs zEssentials. Remplacez `{index}` par l'index de la résidence (commençant à 1).

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_is_vanished%` | Retourne true si le joueur est en mode vanish | Boolean |
| `%zessentials_user_is_frozen%` | Retourne true si le joueur est gelé | Boolean |
| `%zessentials_user_is_ban%` | Retourne true si le joueur est banni | Boolean |
| `%zessentials_user_ban_reason%` | Retourne la raison du bannissement | String |
| `%zessentials_user_ban_duration%` | Retourne la durée restante du bannissement en secondes | Integer |
| `%zessentials_user_ban_duration_formatted%` | Retourne la durée restante du bannissement formatée | String |
| `%zessentials_user_mute_reason%` | Retourne la raison du mute | String |
| `%zessentials_user_fly_formatted%` | Retourne le temps de vol restant formaté | String |
| `%zessentials_user_afk_duration%` | Retourne la durée AFK en secondes | Integer |
| `%zessentials_user_afk_duration_formatted%` | Retourne la durée AFK formatée | String |
| `%zessentials_user_home_list%` | Retourne une liste séparée par des virgules des noms de résidences | String |
| `%zessentials_user_home_{index}%` | Retourne le nom de la résidence par index (commençant à 1) | String |
| `%zessentials_user_home_{index}_{w/x/y/z}%` | Retourne les informations de localisation de la résidence par index | String |
| `%zessentials_user_vote_offline%` | Retourne le nombre de votes hors ligne | Integer |
| `%zessentials_user_pm_recipient%` | Retourne le nom du dernier destinataire de message privé | String |

---

## Joueur Cible

Utilisé dans l'interface de sanctions et les interfaces similaires où un joueur cible est sélectionné.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_target_player_name%` | Nom du joueur cible | String |
| `%zessentials_user_target_is_ban%` | Retourne true si le joueur cible est banni | Boolean |
| `%zessentials_user_target_is_mute%` | Retourne true si le joueur cible est muet | Boolean |
| `%zessentials_user_target_pay_amount%` | Le montant de paiement formaté pour la cible | String |

---

## Économie

Nécessite que le module Economy soit activé. Remplacez `{economy}` par le nom de votre économie (par ex., `default`, `coins`, `tokens`).

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_formatted_balance_{economy}%` | Solde formaté pour l'économie spécifiée (par ex., `$1,234.56`) | String |
| `%zessentials_user_balance_{economy}%` | Solde numérique brut pour l'économie spécifiée | Decimal |
| `%zessentials_user_custom_balance_{economy}_{format}%` | Solde formaté avec un format de nombre personnalisé | String |
| `%zessentials_user_position_{economy}%` | Position du joueur dans le classement baltop | Integer |

### Classement Baltop de l'Économie

Récupérez les informations du classement économique. Remplacez `{economy}` par le nom de votre économie et `{position}` par le numéro de rang (à partir de 1).

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_economy_baltop_name_{economy}_{position}%` | Nom du joueur à la position baltop donnée | String |
| `%zessentials_economy_baltop_uuid_{economy}_{position}%` | UUID du joueur à la position baltop donnée | String |
| `%zessentials_economy_baltop_amount_{economy}_{position}%` | Montant du solde brut à la position donnée | Decimal |
| `%zessentials_economy_baltop_formatted_amount_{economy}_{position}%` | Montant du solde formaté à la position donnée | String |

**Exemple :** Pour afficher les 3 meilleurs joueurs dans l'économie `default` :
```
%zessentials_economy_baltop_name_default_1% - %zessentials_economy_baltop_formatted_amount_default_1%
%zessentials_economy_baltop_name_default_2% - %zessentials_economy_baltop_formatted_amount_default_2%
%zessentials_economy_baltop_name_default_3% - %zessentials_economy_baltop_formatted_amount_default_3%
```

---

## Options Utilisateur

Récupérez la valeur d'une option utilisateur. Remplacez `{option_name}` par la clé de l'option telle que `BAN`, `MUTE`, `GOD`, `VANISH`, ou toute autre option enregistrée.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_option_{option_name}%` | Retourne la valeur de l'option utilisateur spécifiée | String |

**Exemple :** `%zessentials_user_option_VANISH%` retourne si le joueur est en mode vanish.

---

## Temps de Recharge

Suivez les temps de recharge actifs d'un joueur. Remplacez `{cooldown_key}` par l'identifiant du temps de recharge spécifique.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_is_cooldown_{cooldown_key}%` | Retourne true si le temps de recharge est actuellement actif | Boolean |
| `%zessentials_user_cooldown_second_{cooldown_key}%` | Temps de recharge restant en secondes | Integer |
| `%zessentials_user_cooldown_formatted_{cooldown_key}%` | Temps de recharge restant dans un format lisible | String |

---

## Mute / Sanction

Informations sur le statut de mute d'un joueur.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_is_mute%` | Retourne true si le joueur est actuellement muet | Boolean |
| `%zessentials_user_mute_seconds%` | Durée restante du mute en secondes | Integer |
| `%zessentials_user_mute_formatted%` | Durée restante du mute dans un format lisible | String |

---

## Boîte aux Lettres

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_mailbox_items%` | Nombre d'objets actuellement dans la boîte aux lettres du joueur | Integer |

---

## Vol

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_fly_seconds%` | Durée de vol temporaire restante en secondes | Integer |

---

## Réparation

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_can_repair_all%` | Retourne true si le joueur peut réparer tous les objets de son inventaire | Boolean |
| `%zessentials_count_repair_all%` | Nombre d'objets dans l'inventaire du joueur pouvant être réparés | Integer |

---

## Temps de Jeu

Suivez la durée de présence d'un joueur sur le serveur.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_playtime%` | Temps de jeu total en secondes | Integer |
| `%zessentials_user_playtime_formatted%` | Temps de jeu total formaté (par ex., `5d 12h 30m`) | String |
| `%zessentials_user_current_session_playtime%` | Temps de jeu de la session actuelle en secondes | Integer |
| `%zessentials_user_current_session_playtime_formatted%` | Temps de jeu de la session actuelle formaté | String |

---

## Résidences

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_home_count%` | Nombre de résidences que le joueur possède actuellement | Integer |
| `%zessentials_home_max%` | Nombre maximum de résidences autorisé pour le joueur | Integer |
| `%zessentials_home_exist_{home_name}%` | Retourne true si une résidence avec le nom donné existe | Boolean |
| `%zessentials_home_delete%` | Le nom de la résidence en cours de suppression (utilisé dans les interfaces de confirmation) | String |

**Exemple :** `%zessentials_home_exist_base%` retourne `true` si le joueur possède une résidence nommée `base`.

---

## Kits

Remplacez `{kit_name}` par le nom du kit.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_has_kit_{kit_name}%` | Retourne true si le joueur a la permission d'utiliser le kit | Boolean |
| `%zessentials_user_kit_is_available_{kit_name}%` | Retourne true si le kit est disponible (pas de temps de recharge actif) | Boolean |
| `%zessentials_user_kit_time_until_available_{kit_name}%` | Temps restant avant que le kit soit disponible | String |

**Exemple :** `%zessentials_user_kit_is_available_starter%` retourne `true` si le kit `starter` n'a pas de temps de recharge actif.

---

## Objets en Main

Informations sur l'objet que le joueur tient actuellement dans sa main principale.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_iteminhand_type%` | Nom du type de matériau (par ex., `DIAMOND_SWORD`) | String |
| `%zessentials_iteminhand_realname%` | Nom du matériau formaté (par ex., `Diamond Sword`) | String |
| `%zessentials_iteminhand_displayname%` | Nom d'affichage personnalisé, ou nom du matériau si aucun n'est défini | String |
| `%zessentials_iteminhand_custommodeldata%` | Valeur de custom model data (`0` si aucune) | Integer |
| `%zessentials_iteminhand_maxdurability%` | Durabilité maximale de l'objet | Integer |
| `%zessentials_iteminhand_durability%` | Valeur de dégâts actuelle de l'objet | Integer |
| `%zessentials_iteminhand_amount%` | Nombre d'objets dans la pile | Integer |
| `%zessentials_iteminhand_lore%` | Texte de description de l'objet | String |
| `%zessentials_iteminhand_enchantments%` | Tous les enchantements avec leurs niveaux | String |
| `%zessentials_iteminhand_hasenchantment_{enchantment}%` | Retourne true si l'objet possède l'enchantement spécifié | Boolean |
| `%zessentials_iteminhand_enchantmentlevel_{enchantment}%` | Niveau de l'enchantement spécifié | Integer |
| `%zessentials_iteminhand_itemflags%` | Tous les item flags appliqués à l'objet | String |
| `%zessentials_iteminhand_hasitemflag_{flag}%` | Retourne true si l'objet possède le flag spécifié | Boolean |

**Exemple :** `%zessentials_iteminhand_hasenchantment_sharpness%` retourne `true` si l'objet tenu possède l'enchantement Sharpness.

### Objets en Main (Minecraft 1.21+)

Ces placeholders sont uniquement disponibles sur Minecraft 1.21 et versions ultérieures.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_iteminhand_rarity%` | Rareté de l'objet (`COMMON`, `UNCOMMON`, `RARE`, `EPIC`) | String |
| `%zessentials_iteminhand_repaircost%` | Coût de réparation à l'enclume de l'objet | Integer |
| `%zessentials_iteminhand_maxstacksize%` | Taille maximale de pile pour l'objet | Integer |
| `%zessentials_iteminhand_hide_tooltip%` | Retourne true si l'infobulle de l'objet est masquée | Boolean |
| `%zessentials_iteminhand_glint%` | Retourne true si l'objet a un effet lumineux d'enchantement | Boolean |
| `%zessentials_iteminhand_fire_resistant%` | Retourne true si l'objet est résistant au feu | Boolean |
| `%zessentials_iteminhand_unbreakable%` | Retourne true si l'objet est incassable | Boolean |
| `%zessentials_iteminhand_hide_unbreakable%` | Retourne true si la propriété incassable est masquée | Boolean |

---

## Armure

Récupérez le nom de l'objet dans un emplacement d'armure spécifique. Remplacez `{slot}` par l'un des suivants : `HEAD`, `CHEST`, `LEGS`, `FEET`, `HAND`, ou `OFF_HAND`.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_armor_name_{slot}%` | Nom de l'objet dans l'emplacement d'armure spécifié | String |

**Exemple :** `%zessentials_armor_name_HEAD%` retourne le nom du casque que le joueur porte.

---

## Vote

Nécessite que le module Vote soit activé.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_voteparty_amount%` | Progression actuelle du vote party | Integer |
| `%zessentials_voteparty_objective%` | Objectif cible du vote party | Integer |
| `%zessentials_vote_amount%` | Nombre total de votes du joueur | Integer |
| `%zessentials_vote_site_cooldown_{site}%` | Temps de recharge restant avant que le joueur puisse voter à nouveau sur le site spécifié | String |

**Exemple :** `%zessentials_vote_site_cooldown_myserver%` affiche le temps restant avant que le joueur puisse voter à nouveau sur le site de vote `myserver`.

---

## WorldEdit

Nécessite que le module WorldEdit soit activé.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_user_worldedit_option_inventory%` | Retourne true si le mode inventaire WorldEdit est activé | Boolean |
| `%zessentials_user_worldedit_option_bossbar%` | Retourne true si la bossbar WorldEdit est activée | Boolean |

---

## Joueur le Plus Proche

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_nearest_player_name%` | Nom du joueur en ligne le plus proche | String |
| `%zessentials_nearest_player_distance%` | Distance au joueur le plus proche (en blocs) | Decimal |
| `%zessentials_nearest_player_direction%` | Flèche directionnelle pointant vers le joueur le plus proche | String |

---

## Joueur

Placeholders d'informations du joueur Bukkit.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_player_health%` | Retourne la santé actuelle du joueur | Decimal |
| `%zessentials_player_max_health%` | Retourne la santé maximale du joueur | Decimal |
| `%zessentials_player_health_rounded%` | Retourne la santé du joueur arrondie à l'entier le plus proche | Integer |
| `%zessentials_player_absorption%` | Retourne les cœurs d'absorption du joueur | Decimal |
| `%zessentials_player_food_level%` | Retourne le niveau de nourriture du joueur | Integer |
| `%zessentials_player_saturation%` | Retourne le niveau de saturation du joueur | Decimal |
| `%zessentials_player_exhaustion%` | Retourne le niveau d'épuisement du joueur | Decimal |
| `%zessentials_player_level%` | Retourne le niveau d'expérience du joueur | Integer |
| `%zessentials_player_exp%` | Retourne la progression d'expérience du joueur (0.0 à 1.0) | Decimal |
| `%zessentials_player_exp_percentage%` | Retourne la progression d'expérience du joueur en pourcentage | Decimal |
| `%zessentials_player_total_exp%` | Retourne le total de points d'expérience du joueur | Integer |
| `%zessentials_player_exp_to_level%` | Retourne l'expérience requise pour le prochain niveau | Integer |
| `%zessentials_player_displayname%` | Retourne le nom d'affichage du joueur | String |
| `%zessentials_player_uuid%` | Retourne l'UUID du joueur | String |
| `%zessentials_player_locale%` | Retourne la langue du client du joueur | String |
| `%zessentials_player_client_brand%` | Retourne le nom du client du joueur | String |
| `%zessentials_player_gamemode%` | Retourne le mode de jeu du joueur | String |
| `%zessentials_player_is_flying%` | Retourne true si le joueur est en train de voler | Boolean |
| `%zessentials_player_allow_flight%` | Retourne true si le joueur est autorisé à voler | Boolean |
| `%zessentials_player_is_sneaking%` | Retourne true si le joueur est accroupi | Boolean |
| `%zessentials_player_is_sprinting%` | Retourne true si le joueur sprinte | Boolean |
| `%zessentials_player_is_sleeping%` | Retourne true si le joueur dort | Boolean |
| `%zessentials_player_is_op%` | Retourne true si le joueur est opérateur | Boolean |
| `%zessentials_player_is_dead%` | Retourne true si le joueur est mort | Boolean |
| `%zessentials_player_is_swimming%` | Retourne true si le joueur est dans l'eau | Boolean |
| `%zessentials_player_is_blocking%` | Retourne true si le joueur bloque avec un bouclier | Boolean |
| `%zessentials_player_is_gliding%` | Retourne true si le joueur plane avec un elytra | Boolean |
| `%zessentials_player_ping%` | Retourne le ping du joueur en millisecondes | Integer |
| `%zessentials_player_colored_ping%` | Retourne le ping du joueur avec une couleur basée sur la qualité | String |
| `%zessentials_player_fly_speed%` | Retourne la vitesse de vol du joueur | Decimal |
| `%zessentials_player_walk_speed%` | Retourne la vitesse de marche du joueur | Decimal |
| `%zessentials_player_remaining_air%` | Retourne l'air restant du joueur en ticks | Integer |
| `%zessentials_player_max_air%` | Retourne l'air maximum du joueur en ticks | Integer |
| `%zessentials_player_compass%` | Retourne la direction de la boussole du joueur (N, NE, E, SE, S, SO, O, NO) | String |
| `%zessentials_player_yaw%` | Retourne la rotation yaw du joueur | Decimal |
| `%zessentials_player_pitch%` | Retourne la rotation pitch du joueur | Decimal |
| `%zessentials_player_first_played%` | Retourne la date de première connexion du joueur | String |
| `%zessentials_player_last_played%` | Retourne la date de dernière connexion du joueur | String |
| `%zessentials_player_ticks_lived%` | Retourne le nombre de ticks vécus par le joueur | Integer |
| `%zessentials_player_empty_slots%` | Retourne le nombre d'emplacements d'inventaire vides | Integer |
| `%zessentials_player_item_in_hand%` | Retourne le type de matériau de l'objet en main principale | String |
| `%zessentials_player_item_in_offhand%` | Retourne le type de matériau de l'objet en main secondaire | String |
| `%zessentials_player_world_time%` | Retourne le temps du monde du joueur en ticks | Integer |
| `%zessentials_player_world_time_12%` | Retourne le temps du monde en format 12 heures | String |
| `%zessentials_player_world_time_24%` | Retourne le temps du monde en format 24 heures | String |
| `%zessentials_player_world_weather%` | Retourne la météo du monde du joueur | String |
| `%zessentials_player_has_bed%` | Retourne true si le joueur a un point de réapparition défini | Boolean |
| `%zessentials_player_bed_world%` | Retourne le nom du monde du point de réapparition du joueur | String |
| `%zessentials_player_bed_x%` | Retourne la coordonnée X du point de réapparition du joueur | Integer |
| `%zessentials_player_bed_y%` | Retourne la coordonnée Y du point de réapparition du joueur | Integer |
| `%zessentials_player_bed_z%` | Retourne la coordonnée Z du point de réapparition du joueur | Integer |

---

## Serveur

Placeholders généraux liés au serveur.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_server_name%` | Nom du serveur configuré | String |
| `%zessentials_random_player%` | Nom d'un joueur en ligne aléatoire | String |
| `%zessentials_last_random_player%` | Le dernier nom de joueur sélectionné aléatoirement | String |
| `%zessentials_last_first_join_player%` | Nom du joueur le plus récent à avoir rejoint pour la première fois | String |
| `%zessentials_random_number_{from}_{to}%` | Un nombre aléatoire dans la plage spécifiée (inclusif) | Integer |
| `%zessentials_last_random_number_{player}%` | Le dernier nombre aléatoire généré pour le joueur spécifié | Integer |
| `%zessentials_custom_formatted_number_{number}_{format}%` | Un nombre formaté avec le motif spécifié | String |
| `%zessentials_server_uptime_in_second%` | Temps de fonctionnement du serveur en secondes | Integer |
| `%zessentials_server_uptime%` | Temps de fonctionnement du serveur dans un format lisible | String |
| `%zessentials_server_online%` | Nombre de joueurs en ligne | Integer |
| `%zessentials_server_max_players%` | Nombre maximum de joueurs | Integer |
| `%zessentials_server_safe_online%` | Nombre de joueurs en ligne non-vanish | Integer |
| `%zessentials_server_unique_joins%` | Nombre total de joueurs uniques ayant rejoint | Integer |
| `%zessentials_server_tps%` | TPS du serveur (moyenne sur 1 minute) | Decimal |
| `%zessentials_server_tps_5%` | TPS du serveur (moyenne sur 5 minutes) | Decimal |
| `%zessentials_server_tps_15%` | TPS du serveur (moyenne sur 15 minutes) | Decimal |
| `%zessentials_server_tps_colored%` | TPS du serveur avec indicateur de couleur | String |
| `%zessentials_server_free_memory%` | Mémoire libre en Mo | Integer |
| `%zessentials_server_max_memory%` | Mémoire maximale en Mo | Integer |
| `%zessentials_server_used_memory%` | Mémoire utilisée en Mo | Integer |
| `%zessentials_server_total_memory%` | Mémoire totale allouée en Mo | Integer |
| `%zessentials_server_world_players_{world}%` | Nombre de joueurs dans un monde spécifique | Integer |
| `%zessentials_server_world_time_{world}%` | Temps d'un monde spécifique en ticks | Integer |
| `%zessentials_server_world_weather_{world}%` | Météo d'un monde spécifique | String |

**Exemple :** `%zessentials_random_number_1_100%` retourne un nombre aléatoire entre 1 et 100.

---

## Remplacement & Formatage

Placeholders utilitaires pour la manipulation de texte et le formatage visuel.

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_replace_{placeholder}%` | Remplace un placeholder par une valeur définie dans la configuration | String |
| `%zessentials_center_{text1}_{text2}_{length}%` | Centre deux textes dans la longueur de caractères donnée | String |
| `%zessentials_progressbar_{current}_{max}_{size}_{symbol}_{completed_color}_{not_completed_color}%` | Génère une barre de progression visuelle | String |

### Paramètres de la Barre de Progression

Le placeholder de barre de progression accepte les paramètres suivants :

| Paramètre | Description |
|-----------|-------------|
| `{current}` | La valeur de progression actuelle |
| `{max}` | La valeur maximale |
| `{size}` | Nombre total de symboles dans la barre |
| `{symbol}` | Le caractère utilisé pour la barre (par ex., `\|`) |
| `{completed_color}` | Code couleur pour la partie complétée (par ex., `&a`) |
| `{not_completed_color}` | Code couleur pour la partie restante (par ex., `&7`) |

**Exemple :** `%zessentials_progressbar_50_100_20_|_&a_&7%` génère une barre de progression de 20 caractères remplie à 50% en vert (`&a`) et 50% en gris (`&7`).

---

## Mot Aléatoire

| Placeholder | Description | Type de Retour |
|-------------|-------------|----------------|
| `%zessentials_random_word%` | Retourne un mot aléatoire de la liste de mots configurée | String |

---

## Exemples d'Utilisation

### Scoreboard

Afficher les informations du joueur sur un scoreboard dynamique :

```yaml
lines:
  - "&6&lPlayer Info"
  - "&fBalance: &e%zessentials_user_formatted_balance_default%"
  - "&fHomes: &e%zessentials_home_count%&7/&e%zessentials_home_max%"
  - "&fPlaytime: &e%zessentials_user_playtime_formatted%"
  - ""
  - "&6&lServer"
  - "&fUptime: &e%zessentials_server_uptime%"
  - "&fVote Party: &e%zessentials_voteparty_amount%&7/&e%zessentials_voteparty_objective%"
```

### Hologrammes

Utiliser les placeholders dans les hologrammes pour afficher les classements baltop :

```yaml
lines:
  - "&6&l--- Baltop ---"
  - "&e1. &f%zessentials_economy_baltop_name_default_1% &7- &a%zessentials_economy_baltop_formatted_amount_default_1%"
  - "&e2. &f%zessentials_economy_baltop_name_default_2% &7- &a%zessentials_economy_baltop_formatted_amount_default_2%"
  - "&e3. &f%zessentials_economy_baltop_name_default_3% &7- &a%zessentials_economy_baltop_formatted_amount_default_3%"
  - "&e4. &f%zessentials_economy_baltop_name_default_4% &7- &a%zessentials_economy_baltop_formatted_amount_default_4%"
  - "&e5. &f%zessentials_economy_baltop_name_default_5% &7- &a%zessentials_economy_baltop_formatted_amount_default_5%"
  - "&6&l--------------"
```

### Format de Chat

Inclure le statut AFK et d'autres informations dans les messages du chat :

```yaml
format: "%zessentials_user_afk_status% &7%player_name% &8>> &f%message%"
```

### Tab List

Afficher les coordonnées et le biome dans la tab list du joueur :

```yaml
header:
  - "&6&lMy Server"
  - "&fWorld: &e%zessentials_user_world% &7| &fBiome: &e%zessentials_user_biome%"
footer:
  - "&fPosition: &e%zessentials_user_block_x% %zessentials_user_block_y% %zessentials_user_block_z%"
  - "&fNearest Player: &e%zessentials_nearest_player_name% &7(%zessentials_nearest_player_distance% blocks %zessentials_nearest_player_direction%)"
```

### Barre de Progression dans le Scoreboard

Afficher une barre de progression du vote party :

```yaml
lines:
  - "&6Vote Party"
  - "%zessentials_progressbar_%zessentials_voteparty_amount%_%zessentials_voteparty_objective%_20_|_&a_&7%"
  - "&e%zessentials_voteparty_amount%&7/&e%zessentials_voteparty_objective% &fvotes"
```

---

## Dépannage

### Les placeholders s'affichent en texte brut

- Vérifiez que **PlaceholderAPI** est installé et chargé : `/papi list`
- Assurez-vous que le plugin ou le système que vous utilisez supporte PlaceholderAPI (tous les plugins n'analysent pas les placeholders PAPI).
- Rechargez PlaceholderAPI : `/papi reload`

### Les placeholders retournent des valeurs vides ou incorrectes

- Assurez-vous que le **module** correspondant est activé (par ex., module Economy pour les placeholders de solde, module Vote pour les placeholders de vote).
- Vérifiez la syntaxe du placeholder, en particulier les paramètres dynamiques comme les noms d'économie, noms de kits et noms d'emplacements.
- Pour les placeholders d'économie, confirmez que le nom de l'économie correspond à ce qui est configuré dans `modules/economy.yml`.

### Les placeholders ne se mettent pas à jour

- Certains placeholders se mettent à jour selon un intervalle de rafraîchissement. Si vous utilisez des scoreboards ou des hologrammes, assurez-vous que l'intervalle de mise à jour est correctement configuré.
- Pour les placeholders baltop, le classement peut être mis en cache et se mettre à jour périodiquement plutôt qu'en temps réel.
