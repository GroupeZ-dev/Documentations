---
title: Dépannage
description: Résoudre les problèmes de l'addon zAuctionHouse Redis
---

# Dépannage

## Impossible de se connecter à Redis

- Vérifiez que Redis fonctionne : `redis-cli ping` devrait retourner `PONG`
- Vérifiez l'hôte et le port dans la configuration
- Assurez-vous que le pare-feu autorise les connexions sur le port 6379
- Si vous utilisez l'authentification par mot de passe, vérifiez que le mot de passe est correct

## Les objets ne se synchronisent pas

- Assurez-vous que tous les serveurs utilisent la même base de données MySQL
- Vérifiez que l'addon Redis est installé sur **tous** les serveurs
- Consultez la console pour les messages d'erreur
- Assurez-vous que tous les serveurs peuvent se connecter à Redis

## Objets dupliqués ou qui réapparaissent

Si un objet vendu réapparaît dans les objets du vendeur, si un objet acheté est manquant après un changement de serveur, ou si un objet devient impossible à acheter :

- Assurez-vous que **chaque** serveur utilise la **même version à jour** de zAuctionHouse et de l'addon zAuctionHouse Redis. Les anciennes versions présentaient des bugs de synchronisation inter-serveurs (annonces fantômes, objets achetés manquants, verrous d'achat bloqués) corrigés dans les versions récentes
- Le plugin principal **et** l'addon Redis doivent être mis à jour ensemble sur tous les serveurs
- Assurez-vous que tous les serveurs partagent la même base de données MySQL/MariaDB

## Haute latence

- Envisagez d'utiliser un serveur Redis dans le même datacenter que vos serveurs de jeu
- Vérifiez les ressources du serveur Redis (CPU, mémoire)
- Examinez les paramètres du pool de connexions

## Conseils de Performance

1. **Utilisez un serveur Redis local** - Gardez Redis dans le même datacenter que vos serveurs
2. **Ajustez le pool de connexions** - Adaptez les paramètres du pool selon la charge de votre serveur
3. **Surveillez Redis** - Utilisez `redis-cli INFO` pour surveiller la performance
4. **Activez la persistance** - Configurez Redis RDB/AOF pour la sécurité des données (optionnel)

## Support

Besoin d'aide pour configurer le multi-serveur ? Rejoignez notre [serveur Discord](https://discord.groupez.dev) pour obtenir du support.
