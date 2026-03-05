---
sidebar_position: 3
title: Pourquoi ai-je besoin de zMenu ?
description: Comprendre pourquoi zAuctionHouse nécessite zMenu pour la gestion des inventaires
---

# Pourquoi ai-je besoin de zMenu ?

zAuctionHouse nécessite [zMenu](https://modrinth.com/plugin/zmenu) comme dépendance. Cette page explique pourquoi et quels avantages cela apporte.

## Qu'est-ce que zMenu ?

zMenu est un plugin de gestion d'inventaire très avancé qui fournit un ensemble complet de fonctionnalités, incluant une API robuste pour une intégration transparente avec d'autres plugins.

L'objectif principal de zMenu est d'être le centre de votre écosystème de plugins, offrant une approche unifiée et complète de la gestion des inventaires. En s'intégrant avec d'autres plugins de GroupeZ et des plugins tiers, zMenu standardise la gestion des inventaires sur votre serveur, facilitant la configuration et fournissant des fonctionnalités avancées.

Qu'il soit utilisé seul ou en remplacement d'autres plugins d'inventaire, zMenu offre une expérience riche en fonctionnalités et polyvalente.

## Avantages pour zAuctionHouse

### Personnalisation Complète

Avec zMenu, vous avez un contrôle total sur chaque inventaire de zAuctionHouse :
- **Dispositions personnalisées** - Concevez votre propre interface d'enchères
- **Boutons & actions** - Configurez ce que fait chaque bouton
- **Patterns** - Créez des composants d'interface réutilisables
- **Animations** - Ajoutez des éléments dynamiques à vos menus

### Configuration Unifiée

Tous les plugins GroupeZ utilisent zMenu pour leurs inventaires, ce qui signifie :
- Apprenez un système de configuration, utilisez-le partout
- Partagez les patterns et composants entre plugins
- Expérience utilisateur cohérente sur tous les menus

### Fonctionnalités Avancées

zMenu fournit des fonctionnalités qui améliorent zAuctionHouse :
- **Placeholders** - Affichez des données dynamiques dans les menus
- **Requirements** - Affichez/masquez des boutons selon des conditions
- **Actions** - Exécutez des commandes, ouvrez des menus, jouez des sons, et plus
- **Types de clic** - Différentes actions pour clic gauche/droit/shift

### Performance

zMenu est optimisé pour la performance :
- Rendu d'inventaire efficace
- Impact minimal sur le serveur
- Opérations asynchrones quand possible

## Compatibilité DeluxeMenu

Vous utilisez déjà DeluxeMenu ? Bonne nouvelle !

**Les configurations DeluxeMenu sont automatiquement compatibles avec zMenu.** Placez simplement vos fichiers de configuration DeluxeMenu dans le dossier `inventories` de zMenu, et ils fonctionneront sans aucun changement supplémentaire !

Cela facilite la migration si vous passez de DeluxeMenu à zMenu.

## Démarrer avec zMenu

1. Téléchargez zMenu depuis [Modrinth](https://modrinth.com/plugin/zmenu)
2. Placez `zMenu.jar` dans votre dossier `plugins/`
3. Démarrez votre serveur
4. zAuctionHouse utilisera automatiquement zMenu pour tous ses inventaires

Pour plus d'informations sur zMenu, consultez la [documentation zMenu](https://docs.groupez.dev/zmenu).
