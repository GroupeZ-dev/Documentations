---
sidebar_position: 7
title: Optimisation
description: Découvrez comment zAuctionHouse est optimisé pour les serveurs à grande échelle
---

# Optimisation

zAuctionHouse a été conçu et développé dès le départ pour gérer **de très gros serveurs**. La performance a été une priorité centrale tout au long du processus de développement, pas une réflexion après coup.

## Conçu pour l'Échelle

Que vous gériez un petit serveur survie avec quelques dizaines de joueurs ou un réseau massif avec des milliers de joueurs simultanés, zAuctionHouse est conçu pour maintenir une performance optimale sous n'importe quelle charge.

### Philosophie de Conception

- **Architecture asynchrone prioritaire** - Toutes les opérations de base de données s'exécutent de manière asynchrone pour ne jamais bloquer le thread principal
- **Structures de données efficaces** - Algorithmes et structures de données soigneusement choisis pour une empreinte mémoire minimale
- **Mise en cache intelligente** - Stratégies de mise en cache intelligentes réduisant les requêtes à la base de données
- **Chargement paresseux** - Les données ne sont chargées que lorsque nécessaire, réduisant le temps de démarrage et l'utilisation de la mémoire
- **Pool de connexions** - Gestion optimisée des connexions à la base de données pour un débit élevé

## Outils de Mesure de Performance Internes

zAuctionHouse inclut des outils intégrés permettant aux développeurs et administrateurs de serveur de mesurer et surveiller la performance.

### Mode Debug

Activez le mode debug dans la configuration pour voir des métriques de performance détaillées :

```yaml
debug: true
```

Cela active les mesures de temps internes qui aident à identifier tout goulot d'étranglement de performance.

### Générateur de Données de Test

Le plugin inclut un puissant générateur de données de test qui vous permet de créer de grandes quantités d'objets de test pour stress-tester la configuration de votre serveur.

**Commande :**
```
/zah admin generate <quantité>
```

Cette commande génère de faux objets d'enchères, vous permettant de tester comment votre serveur gère de grands volumes de données avant la mise en production.

:::warning
N'utilisez cette commande que dans un environnement de test ! Les objets générés doivent être supprimés avant l'utilisation en production.
:::

## Benchmarks de Performance

Nous avons mené des tests de performance approfondis pour nous assurer que zAuctionHouse fonctionne bien sous forte charge.

### Tri de 100 000 Objets

L'une des opérations les plus exigeantes dans un hôtel des ventes est le tri d'un grand nombre d'objets pour l'affichage. Nous avons testé le tri de **100 000 objets** simultanément.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/opti.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

| Métrique | Résultat |
|----------|----------|
| **Objets triés** | 100 000 |
| **Temps écoulé** | 45ms |
| **Opération** | Tri complet avec filtres |

### Environnement de Test

Le benchmark a été réalisé sur le matériel suivant :

| Composant | Spécification            |
|-----------|--------------------------|
| **Système d'exploitation** | Windows 11               |
| **Processeur** | AMD Ryzen 7 5700X 8-Core |
| **RAM Serveur** | 4 Go alloués             |
| **Version Java** | Java 21                  |
| **Logiciel Serveur** | Paper 1.21.11            |

:::info
Ces benchmarks ont été réalisés avec les paramètres par défaut du plugin. La performance peut varier selon votre configuration spécifique et votre matériel.
:::

## Performance en Conditions Réelles

zAuctionHouse est activement utilisé sur certains des plus grands réseaux Minecraft, gérant :

- **Des milliers de joueurs simultanés**
- **Des centaines de milliers d'annonces actives**
- **Des millions de transactions par mois**

### Techniques d'Optimisation Utilisées

1. **Requêtes de base de données indexées** - Toutes les colonnes fréquemment consultées sont correctement indexées
2. **Opérations par lots** - Plusieurs opérations de base de données sont regroupées lorsque possible
3. **Sérialisation économe en mémoire** - Les objets sont sérialisés en utilisant des formats d'octets optimisés
4. **Opérations thread-safe** - L'accès concurrent est géré efficacement sans verrous lorsque possible
5. **Pagination** - Les grands ensembles de résultats sont paginés pour réduire la pression sur la mémoire

## Surveillance

### TPS du Serveur

Surveillez le TPS de votre serveur lorsque l'hôtel des ventes est fortement utilisé. zAuctionHouse devrait avoir un impact minimal sur le TPS grâce à sa conception asynchrone.

### Performance de la Base de Données

Pour MySQL/MariaDB, surveillez :
- L'utilisation du pool de connexions
- Le temps d'exécution des requêtes
- La taille des tables

### Utilisation de la Mémoire

Le plugin est conçu pour être économe en mémoire, mais la surveillance de l'utilisation du tas Java pendant les heures de pointe est recommandée pour les très grosses installations.

## Conclusion

zAuctionHouse n'est pas qu'un simple plugin d'hôtel des ventes - c'est une solution optimisée pour la performance, construite pour les exigences des serveurs Minecraft modernes à grande échelle. Le temps de tri de 45ms pour 100 000 objets démontre notre engagement à fournir un plugin qui ne ralentira pas votre serveur, peu importe la popularité de votre hôtel des ventes.
