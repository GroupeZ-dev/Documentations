---
title: Introduction
description: Introduction à zVeinMiner - Un plugin de minage de filons configurable pour les serveurs Paper, basé sur des presets stockés sur les items
---

# zVeinMiner

Bienvenue dans la documentation officielle de zVeinMiner !

zVeinMiner est un plugin de minage de filons (vein mining) pour les serveurs Paper. Lorsqu'un joueur casse un bloc avec un item de minage de filons, tous les blocs connectés du même type sont également cassés, jusqu'à une taille configurable. Ce qu'un item peut miner n'est pas global : chaque item possède son propre **preset**, sa propre **taille de filon** et ses propres **tags**, ce qui vous permet de distribuer une petite pioche à charbon, une grande pioche à minerais ou une hache de bûcheron avec le même plugin.

<CalloutContainer type="info">

<CalloutTitle>Plugin Paper</CalloutTitle>

<CalloutDescription>
zVeinMiner est un plugin Paper (`paper-plugin.yml`). Il nécessite **Paper 26.3 ou supérieur** (ou un fork comme Purpur) et **Java 25**. Spigot et Folia ne sont pas supportés. Consultez le [Guide d'Installation](./installation).
</CalloutDescription>

</CalloutContainer>

## Fonctionnalités Clés

### Minage de Filons par Preset

- **Presets** - Définissez autant de presets que vous le souhaitez dans `config.yml`, chacun avec un nom, une taille de filon et une liste de tags
- **Données stockées sur l'item** - Le nom du preset, la taille du filon et les tags sont écrits dans le PersistentDataContainer de l'item, chaque item conserve donc ses propres paramètres
- **Tags** - Un tag est soit un matériau de bloc unique (`DIAMOND_ORE`), soit le nom d'un tag de matériaux Bukkit (`COAL_ORES`, `LOGS`...)
- **Correspondance par tag** - Avec `match-by-tag`, les variantes en pierre et en deepslate d'un minerai sont minées ensemble
- **Commandes d'item** - Appliquez, définissez, redimensionnez, ajoutez ou retirez des tags sur l'item tenu en main, ou donnez un item avec un preset

Consultez [Presets & Tags](./presets-and-tags) pour plus de détails.

### Aperçu en Sneak

En étant accroupi avec un item de minage de filons et en regardant un bloc correspondant, le joueur voit un contour lumineux des blocs qui seront minés. L'aperçu n'est visible que par son propriétaire, utilise des entités non persistantes et peut être désactivé avec l'option `preview`.

### Gestion des Outils

- **Vérification de la durabilité** - Avec `check-durability` (activé par défaut), la durabilité de l'outil est vérifiée bloc par bloc et le minage de filons s'arrête avant que l'outil ne se casse
- **Dégâts de l'outil** - `apply-damage` peut être désactivé pour que les blocs supplémentaires n'endommagent pas l'outil
- **Solidité** - L'enchantement Solidité (Unbreaking) est appliqué comme lors du minage vanilla
- **Bon outil uniquement** - Le minage de filons ne se déclenche que si l'item tenu est le bon outil pour le bloc cassé, et les blocs qui nécessitent un autre outil ne font pas partie du filon
- **Enchantements** - Les blocs sont cassés comme lors d'un cassage normal par un joueur, Toucher de soie (Silk Touch) et Fortune s'appliquent donc à chaque bloc
- **Mode créatif** - Aucun dégât de durabilité en mode créatif

### Compatibilité avec les Plugins

Chaque bloc supplémentaire est cassé via un véritable cassage par le joueur, ce qui déclenche un `BlockBreakEvent` pour chaque bloc. Les plugins de protection (Towny, Lands, WorldGuard...), de journalisation (CoreProtect) et de récompenses (Jobs, mcMMO) voient chaque bloc miné, et pas seulement le premier.

### Fonctionnalités Joueur

- **Activation** - Les joueurs peuvent activer ou désactiver le minage de filons pour eux-mêmes avec `/zveinminer toggle`
- **Statistiques** - Le nombre total de blocs et de filons minés est suivi par joueur et affiché avec `/zveinminer stats`
- **Données persistantes** - Les préférences et les statistiques sont sauvegardées dans `plugins/zVeinMiner/playerdata/<uuid>.yml`

### Contrôle du Serveur

- **Cooldown** - Cooldown optionnel en ticks entre deux minages de filons (contournable avec une permission)
- **Sneak obligatoire** - Exigez optionnellement d'être accroupi pour déclencher le minage de filons
- **Limite de taille globale** - `max-size-limit` plafonne la taille de filon de tous les items
- **Contrôle par monde** - Liste noire ou liste blanche de mondes
- **Drops** - Téléportez optionnellement les drops vers le joueur ou ramassez-les automatiquement
- **Économie** - Facturez optionnellement un coût par bloc et/ou par filon (nécessite Vault)
- **Messages configurables** - Chaque message peut être modifié dans `messages.yml`, les messages manquants sont ajoutés automatiquement lors des mises à jour

### Protections & Intégrations

Toutes les intégrations sont des dépendances optionnelles (soft dependencies) :

- **WorldGuard** - Seuls les blocs que le joueur a le droit de casser sont minés
- **GriefPrevention** - Les claims sont respectés
- **NoCheatPlus** - Les joueurs sont exemptés des vérifications de cassage de blocs pendant le minage d'un filon
- **Vault** - Coûts économiques
- **PlaceholderAPI** - Les placeholders sont remplacés dans chaque message envoyé à un joueur (zVeinMiner n'enregistre pas de placeholders propres)

Consultez [Intégrations](./integrations).

### API Développeur

zVeinMiner expose un `VeinManager` et un `PlayerManager` via le ServicesManager de Bukkit, des événements personnalisés (`VeinMineStartEvent`, `VeinMineBlockEvent`, `VeinMineCompleteEvent`) et des méthodes pour appliquer des presets et des tags aux items. Consultez [API](./api).

## Fonctionnement

1. Un joueur casse un bloc avec un item qui possède des données de minage de filons.
2. zVeinMiner vérifie le mode de jeu (ni aventure ni spectateur), la permission `zveinminer.use`, l'activation, le monde, l'exigence de sneak, que la taille du filon est supérieure à 1, que le bloc correspond à l'un des tags de l'item et que l'item est le bon outil pour ce bloc, puis le cooldown.
3. Les blocs connectés correspondants sont trouvés avec un parcours en largeur (BFS), limité par la taille de filon de l'item et par `max-size-limit`.
4. Les blocs que le joueur ne peut pas casser (protections, protection du spawn) sont retirés, le coût économique est vérifié et `VeinMineStartEvent` est déclenché.
5. Chaque bloc restant est cassé un par un, avec son propre `BlockBreakEvent`, ses dégâts d'outil et ses drops, jusqu'à ce que le filon soit terminé ou que l'outil soit sur le point de se casser.
6. Le coût économique est facturé pour les blocs réellement cassés, les statistiques du joueur sont mises à jour et `VeinMineCompleteEvent` est déclenché.

## Prérequis

| Prérequis | Version |
|-----------|---------|
| Java | 25 ou supérieur |
| Serveur | Paper 26.3 ou supérieur |

## Plateformes Supportées

| Plateforme | Support |
|------------|---------|
| Paper | Recommandé |
| Purpur et autres forks de Paper | Supporté |
| Spigot | Non supporté |
| Folia | Non supporté |

## Liens Rapides

- [Guide d'Installation](./installation)
- [Commandes & Permissions](./commands-permissions)
- [Configuration](./configuration)
- [Presets & Tags](./presets-and-tags)
- [Intégrations](./integrations)
- [API](./api)

## Support

- **Discord** : Rejoignez notre [serveur Discord](https://discord.groupez.dev) pour obtenir de l'aide

## Téléchargement

- **Modrinth** : [modrinth.com/plugin/zveinminer](https://modrinth.com/plugin/zveinminer)
- **groupez.dev** : [groupez.dev](https://groupez.dev/)
