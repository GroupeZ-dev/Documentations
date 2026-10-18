---
title: Premiers pas
description: Introduction a zMenu - Le plugin d'inventaire le plus puissant pour Minecraft
---

# Premiers pas avec zMenu

**zMenu** est le plugin d'inventaire (GUI) le plus puissant et flexible pour les serveurs Minecraft. Il vous permet de creer de beaux menus interactifs avec un systeme de configuration extensif qui vous donne un controle total sur chaque aspect de vos inventaires.

## Qu'est-ce que zMenu ?

zMenu est un plugin d'inventaire de qualite premium qui permet aux administrateurs de serveurs de creer des GUIs (Interfaces Graphiques Utilisateur) personnalisees pour leurs serveurs Minecraft. Que vous ayez besoin d'un simple selecteur de serveur, d'un systeme de boutique complexe ou d'un menu de quetes interactif, zMenu fournit tous les outils necessaires.

## Vous venez de DeluxeMenus ? Changez en une commande

Vous n'avez pas a reecrire vos menus. zMenu **convertit automatiquement vos menus DeluxeMenus** : items, slots, commandes de clic, prerequis et commandes d'ouverture sont traduits en inventaires zMenu en quelques secondes.

```
/zm convert deluxemenus
```

Tout ce qui ne peut pas etre converti a l'identique est liste en haut de chaque fichier converti, et vos fichiers DeluxeMenus ne sont jamais modifies. [Lire le guide de migration →](./convert-deluxemenus)

## Modifiez en direct avec le hot reload

Enregistrez un fichier, le menu est a jour en jeu. **Pas de `/zm reload`, pas de redemarrage.** Avec le [hot reload](./hot-reload) active, zMenu surveille votre dossier `inventories/` et recharge, charge ou decharge les inventaires des que leurs fichiers changent. Les joueurs qui ont le menu ouvert voient la nouvelle version instantanement, sur la meme page, et un fichier contenant une erreur ne remplace jamais la version fonctionnelle.

```yaml
# config.yml
hot-reload:
  enable: true
```

## Fonctionnalites cles

### Migration et workflow
- **[Convertisseur DeluxeMenus](./convert-deluxemenus)** : convertissez tous vos menus DeluxeMenus avec `/zm convert deluxemenus`
- **[Hot reload](./hot-reload)** : les modifications de vos fichiers d'inventaire sont appliquees instantanement, sans aucune commande
- **Editeur en ligne** : concevez vos menus visuellement sur [minecraft-inventory-builder.com](https://minecraft-inventory-builder.com)

### Inventaires hautement personnalisables
- Creez des inventaires de toutes tailles (9 a 54 emplacements)
- Support multi-pages avec pagination automatique
- Titres personnalises avec support des placeholders
- Items de remplissage pour les emplacements vides
- Systeme de mise en page base sur une matrice pour un design facile

### Systeme de boutons puissant
- **9 types de boutons integres** : NONE, INVENTORY, BACK, NEXT, PREVIOUS, HOME, JUMP, MAIN_MENU, SWITCH
- Actions de clic personnalisees pour chaque bouton de souris
- Exigences de vue et de clic
- Support des tetes de joueurs avec textures personnalisees
- Mises a jour dynamiques des items

### Systeme d'actions extensif
- **Plus de 28 types d'actions** incluant messages, sons, commandes, teleportation et plus
- Executez des actions en tant que joueur, console ou avec permissions OP
- Enchainez plusieurs actions ensemble
- Actions conditionnelles avec exigences

### Fonctionnalites avancees
- **Systeme de patterns** : Creez des modeles de boutons reutilisables
- **Donnees joueur** : Stockez et recuperez des donnees specifiques aux joueurs
- **Placeholders globaux** : Definissez des valeurs utilisees dans tous les inventaires
- **Support PlaceholderAPI** : Integration complete avec PAPI
- **Support MiniMessage** : Formatage de texte moderne pour les serveurs Paper
- **Systeme anti-duplication** : Protection integree contre les exploits de duplication d'items
- **Support base de donnees** : MySQL, MariaDB et SQLite pour la persistance des donnees

### Convivial pour les developpeurs
- API propre et bien documentee
- Enregistrement de types de boutons personnalises
- Enregistrement de types d'actions personnalises
- Systeme d'evenements pour les interactions d'inventaire

## Pourquoi choisir zMenu ?

| Fonctionnalite | zMenu | Autres plugins |
|----------------|-------|----------------|
| Import des menus DeluxeMenus | Une commande | Reecriture a la main |
| Hot reload | Automatique, sans commande | Rechargement manuel |
| Types de boutons | 9+ integres | Limite |
| Types d'actions | 28+ | Basique |
| Support multi-pages | Natif | Necessite souvent des contournements |
| Systeme de patterns | Oui | Non |
| Stockage donnees joueur | Oui | Rarement |
| Support MiniMessage | Oui | Rarement |
| Support base de donnees | MySQL/MariaDB/SQLite | Generalement fichiers uniquement |
| Qualite API | Complete | Souvent minimale |
| Developpement actif | Oui | Variable |
| Gratuit | Oui | Souvent payant |

## Comment ca fonctionne

zMenu utilise des fichiers de configuration YAML pour definir vos inventaires. Voici un apercu simplifie :

1. Les **inventaires** sont definis dans le dossier `inventories/`
2. Chaque inventaire contient des **boutons** (items avec lesquels les joueurs peuvent interagir)
3. Les boutons peuvent avoir des **actions** qui s'executent au clic
4. Les **exigences** controlent qui peut voir ou cliquer sur les boutons
5. Les **patterns** permettent de reutiliser des configurations de boutons

### Exemple simple

```yaml
# inventories/mon_menu.yml
name: "&6Mon premier menu"
size: 27

items:
  bouton-bienvenue:
    slot: 13
    item:
      material: DIAMOND
      name: "&bBienvenue !"
      lore:
        - "&7Cliquez-moi pour recevoir un message"
    actions:
      - type: message
        messages:
          - "&aBonjour, %player% !"
          - "&7Merci d'utiliser zMenu !"
```

Ceci cree un inventaire simple de 27 emplacements avec un diamant au centre qui envoie un message au clic.

## Versions Minecraft supportees

zMenu supporte les versions Minecraft **1.20.6 et plus recentes** et fonctionne avec :
- Paper (requis)
- Purpur
- Pufferfish
- Folia

<CalloutContainer type="warning">

<CalloutTitle>Paper requis</CalloutTitle>

<CalloutDescription>
Depuis la version **1.1.1.6**, zMenu fonctionne **uniquement sur Paper** — vous devez utiliser Paper, un fork de Paper (Purpur, Pufferfish) ou Folia. Sur Spigot, le plugin se charge quand meme, mais uniquement pour afficher un avertissement expliquant que Paper est requis : aucune fonctionnalite de zMenu n'y fonctionne.
</CalloutDescription>

</CalloutContainer>

## Prochaines etapes

Pret a commencer ? Suivez ces etapes :

1. [Installez zMenu](./installation) sur votre serveur
2. Vous utilisez DeluxeMenus ? [Convertissez vos menus](./convert-deluxemenus) en une commande
3. Activez le [hot reload](./hot-reload) pour voir vos modifications instantanement
4. Apprenez le [systeme de configuration](./configurations/informations)
5. [Creez votre premier inventaire](./configurations/inventories/create-inventory)
6. Explorez les [types de boutons](./configurations/buttons/button) et les [actions](./configurations/buttons/actions)

## Obtenir de l'aide

- **Discord** : Rejoignez notre [serveur Discord](https://discord.groupez.dev) pour du support
- **SpigotMC** : Visitez la [page ressource SpigotMC](https://www.spigotmc.org/resources/zmenu.110402/)
- **GitHub** : Signalez les problemes sur [GitHub](https://github.com/Maxlego08/zMenu)
