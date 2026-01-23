---
sidebar_position: 7
title: Placeholders globaux
description: Definir des valeurs utilisables dans tous les inventaires
---

# Placeholders globaux

Les placeholders globaux vous permettent de definir des valeurs a un seul endroit et de les utiliser dans tous vos inventaires. C'est utile pour les informations du serveur, les URLs et autres valeurs que vous pourriez vouloir changer de maniere centralisee.

## Fichier de configuration

Les placeholders globaux sont definis dans `plugins/zMenu/global-placeholders.yml`.

## Utilisation de base

### Definir des placeholders globaux

```yaml
# global-placeholders.yml

server-name: "Mon Super Serveur"
server-ip: "play.monserveur.com"
discord: "discord.gg/monserveur"
website: "https://monserveur.com"
store: "https://boutique.monserveur.com"
version: "1.0.0"
```

### Utiliser les placeholders globaux

Accedez-y avec `%zmenu_global_placeholders_<cle>%` :

```yaml
# Dans votre inventaire
items:
  server-info:
    slot: 4
    item:
      material: BOOK
      name: "&6&l%zmenu_global_placeholders_server-name%"
      lore:
        - "&7IP : &f%zmenu_global_placeholders_server-ip%"
        - "&7Discord : &9%zmenu_global_placeholders_discord%"
        - "&7Site web : &b%zmenu_global_placeholders_website%"
```

## Fonctionnalites avancees

### Valeurs de liste

Vous pouvez definir des listes de valeurs :

```yaml
# global-placeholders.yml
regles:
  - "&7- Soyez respectueux envers les autres"
  - "&7- Pas de triche ou de hack"
  - "&7- Pas de publicite"
  - "&7- Amusez-vous !"
```

### Valeurs imbriquees

Utilisez des points pour l'organisation (ils deviennent partie de la cle) :

```yaml
# global-placeholders.yml
social.discord: "discord.gg/monserveur"
social.twitter: "@MonServeur"
social.youtube: "youtube.com/monserveur"

prix.vip: "9.99"
prix.mvp: "19.99"
prix.legend: "49.99"
```

Utilisation :
```yaml
lore:
  - "&7Discord : %zmenu_global_placeholders_social.discord%"
  - "&7Prix VIP : %zmenu_global_placeholders_prix.vip%€"
```

## Exemples

### Menu d'information du serveur

```yaml
# global-placeholders.yml
server-name: "CraftWorld"
server-ip: "play.craftworld.net"
discord: "discord.gg/craftworld"
website: "https://craftworld.net"
owner: "Notch"
founded: "2020"
```

```yaml
# inventories/server_info.yml
name: "&6Informations du serveur"
size: 27

items:
  info:
    slot: 13
    item:
      material: BOOK
      name: "&6&l%zmenu_global_placeholders_server-name%"
      lore:
        - "&8&m─────────────────"
        - ""
        - "&7IP : &f%zmenu_global_placeholders_server-ip%"
        - "&7Discord : &9%zmenu_global_placeholders_discord%"
        - "&7Site web : &b%zmenu_global_placeholders_website%"
        - ""
        - "&7Proprietaire : &e%zmenu_global_placeholders_owner%"
        - "&7Fonde en : &a%zmenu_global_placeholders_founded%"
        - ""
        - "&8&m─────────────────"
```

### Prix de la boutique

```yaml
# global-placeholders.yml
rank.vip.price: "9.99"
rank.vip.name: "&a&lVIP"
rank.mvp.price: "19.99"
rank.mvp.name: "&b&lMVP"
rank.legend.price: "49.99"
rank.legend.name: "&6&lLEGEND"
```

```yaml
# inventories/ranks.yml
items:
  vip:
    slot: 11
    item:
      material: IRON_BLOCK
      name: "%zmenu_global_placeholders_rank.vip.name%"
      lore:
        - "&7Prix : &a%zmenu_global_placeholders_rank.vip.price%€"

  mvp:
    slot: 13
    item:
      material: GOLD_BLOCK
      name: "%zmenu_global_placeholders_rank.mvp.name%"
      lore:
        - "&7Prix : &a%zmenu_global_placeholders_rank.mvp.price%€"

  legend:
    slot: 15
    item:
      material: DIAMOND_BLOCK
      name: "%zmenu_global_placeholders_rank.legend.name%"
      lore:
        - "&7Prix : &a%zmenu_global_placeholders_rank.legend.price%€"
```

### Couleurs/Themes centralises

```yaml
# global-placeholders.yml
color.primary: "&6"
color.secondary: "&7"
color.success: "&a"
color.error: "&c"
color.info: "&b"

prefix.shop: "&6&lBOUTIQUE &8»"
prefix.warp: "&5&lWARP &8»"
prefix.admin: "&c&lADMIN &8»"
```

```yaml
# Utilisation dans les inventaires
items:
  item:
    item:
      name: "%zmenu_global_placeholders_color.primary%Mon Item"
```

## Avantages

1. **Gestion centralisee** : Changez les valeurs a un seul endroit
2. **Coherence** : Assurez les memes valeurs dans tous les menus
3. **Mises a jour faciles** : Mettez a jour l'IP du serveur, le lien Discord, etc. une seule fois
4. **Organisation** : Gardez les valeurs de configuration ensemble
5. **Pas de redemarrage** : Les changements s'appliquent apres `/zm reload`

## Comparaison avec les placeholders locaux

| Fonctionnalite | Placeholders globaux | Placeholders locaux |
|----------------|---------------------|---------------------|
| Portee | Tous les inventaires | Un seul inventaire |
| Fichier | `global-placeholders.yml` | Dans le fichier d'inventaire |
| Acces | `%zmenu_global_placeholders_cle%` | `%cle%` |
| Cas d'utilisation | Valeurs a l'echelle du serveur | Valeurs specifiques a l'inventaire |

### Exemple de placeholders locaux

```yaml
# Dans le fichier d'inventaire
local-placeholders:
  categorie: "Armes"
  reduction: "20%"

items:
  header:
    item:
      name: "&6Boutique %categorie%"
      lore:
        - "&7Promotion : %reduction% de reduction !"
```

## Rechargement

Apres avoir modifie `global-placeholders.yml` :

```
/zm reload config
```

Ou rechargez tout :

```
/zm reload
```

## Bonnes pratiques

1. **Utilisez des cles descriptives** : `server-ip` et non `ip`
2. **Groupez les valeurs liees** : Utilisez la notation par points comme `social.discord`
3. **Documentez vos placeholders** : Ajoutez des commentaires dans le fichier YAML
4. **Restez organise** : Groupez par objectif (social, prix, couleurs)
5. **N'en abusez pas** : Utilisez uniquement pour les valeurs vraiment globales

## Prochaines etapes

- Apprenez les [Patterns](./patterns) pour les modeles reutilisables
- Voir les [Donnees joueur](./player-data) pour les valeurs par joueur
- Configurez le fichier [config.yml](./config-yml)
