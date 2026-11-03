---
title: Intégrations
description: Comment zVeinMiner fonctionne avec WorldGuard, GriefPrevention, Vault, NoCheatPlus et PlaceholderAPI
---

# Intégrations

zVeinMiner fonctionne seul. Chaque intégration est une **dépendance optionnelle** (soft dependency) : si l'autre plugin est absent, zVeinMiner démarre quand même et la fonctionnalité qui l'utilise est simplement ignorée.

| Plugin | Ce que zVeinMiner en fait | Configuration nécessaire |
|--------|---------------------------|--------------------------|
| **WorldGuard** (+ WorldEdit) | Vérifie la protection des régions pour chaque bloc du filon | Aucune |
| **GriefPrevention** | Vérifie les permissions des claims pour chaque bloc du filon | Aucune |
| **Vault** (+ un plugin d'économie) | Fait payer les joueurs pour le minage de filons | Section `economy` dans `config.yml` |
| **NoCheatPlus** | Désactive les vérifications de cassage de blocs pendant le minage d'un filon | Aucune |
| **PlaceholderAPI** | Remplace les placeholders dans les messages envoyés aux joueurs | Aucune |

Lorsqu'un hook se connecte, la console affiche une ligne comme `Hooked into WorldGuard`, `Hooked into Vault economy: <name>` ou `Hooked into NoCheatPlus`.

## Plugins de protection

### Fonctionnement de la protection

Chaque bloc supplémentaire d'un filon est cassé avec `Player#breakBlock` de Paper. Cela déclenche un `BlockBreakEvent` normal pour chaque bloc, donc **n'importe quel** plugin de protection, de logs ou de récompenses voit chaque bloc comme si le joueur l'avait cassé à la main. Cela inclut les plugins pour lesquels zVeinMiner n'a pas de hook.

Les hooks WorldGuard et GriefPrevention ajoutent une vérification **avant** le début du minage :

1. zVeinMiner détecte le filon.
2. Il retire tous les blocs que le joueur n'a pas le droit de casser, selon les hooks de protection et la protection du spawn vanilla.
3. Seuls les blocs restants sont minés. Ce sont aussi les seuls qui comptent dans le coût [économique](#vault-économie).

Le même filtre est utilisé pour la prévisualisation du filon, le contour affiché lorsque le joueur est accroupi (quand `vein-mining.preview` vaut `true`). La prévisualisation n'affiche que les blocs que le joueur peut réellement casser.

<CalloutContainer type="info">

<CalloutTitle>Plugins de protection sans hook</CalloutTitle>

<CalloutDescription>

Un plugin de protection sans hook dédié bloque quand même le minage de filons dans ses zones grâce au `BlockBreakEvent` déclenché pour chaque bloc. Si 3 blocs d'affilée sont refusés, zVeinMiner arrête le minage du filon. Cela évite au joueur de recevoir un message de refus par bloc. Le seul inconvénient est que la prévisualisation peut afficher des blocs qui ne peuvent pas être cassés.

</CalloutDescription>

</CalloutContainer>

La protection du spawn est toujours vérifiée, même sans aucun plugin de protection. Elle suit la règle vanilla : elle s'applique uniquement dans le monde principal, uniquement lorsque `spawn-protection` est supérieur à 0, uniquement lorsqu'au moins un opérateur existe, et jamais aux opérateurs.

### WorldGuard

Nécessite WorldGuard et WorldEdit, dont WorldGuard dépend.

Pour chaque bloc, zVeinMiner exécute le test de construction de WorldGuard avec le flag `block-break`. C'est le même test que WorldGuard utilise lorsqu'un joueur casse un bloc :

- les membres et propriétaires de la région peuvent miner, et les valeurs par défaut de la région s'appliquent ;
- un flag `block-break` défini sur `allow` ou `deny` remplace la valeur par défaut ;
- une région **sans** flag `block-break` suit les règles de construction normales. Elle n'est pas refusée automatiquement ;
- les joueurs disposant du bypass WorldGuard dans ce monde (par exemple `worldguard.region.bypass.<world>`) ne sont pas soumis à la vérification.

Aucun flag ni aucune option n'a besoin d'être configuré dans zVeinMiner.

### GriefPrevention

Pour chaque bloc, zVeinMiner cherche le claim GriefPrevention à cet emplacement :

- aucun claim : le bloc peut être miné ;
- un claim : le bloc ne peut être miné que si GriefPrevention autorise ce joueur à casser ce type de bloc à cet endroit, la même vérification que pour un cassage normal.

### Détection et rechargement

zVeinMiner recherche les hooks de protection au démarrage, puis à chaque `/zveinminer reload`. Un hook n'est utilisé que si son plugin est activé.

| Situation | Résultat |
|-----------|----------|
| Plugin non installé | Rien n'est affiché, la vérification est ignorée |
| Plugin installé et hook fonctionnel | `Hooked into <plugin>` |
| Plugin installé mais son API n'est pas prête | Avertissement : `<plugin> is installed but its hook is not available, vein mining will not check its protections.` |
| Version du plugin non compatible | Avertissement : `Failed to hook into <plugin>: <error>`, la vérification est ignorée |

Même lorsqu'un hook est ignoré, le `BlockBreakEvent` déclenché pour chaque bloc permet toujours à ce plugin d'annuler les blocs.

## Vault (économie)

Vault vous permet de faire payer les joueurs pour le minage de filons. Activez-le dans `config.yml` :

```yaml
# Economy settings (requires Vault)
economy:
  enabled: false
  # Cost per block mined (0 = disabled)
  cost-per-block: 0.0
  # Cost per vein mine action (0 = disabled)
  cost-per-vein: 0.0
```

Vous avez besoin de **Vault et d'un plugin d'économie** qui enregistre un fournisseur Vault. zVeinMiner recherche le fournisseur la première fois qu'il en a besoin, et non au démarrage, donc un plugin d'économie qui s'enregistre tardivement est quand même trouvé.

**Calcul du coût :**

```
cost = cost-per-vein + cost-per-block x number of extra blocks broken
```

Le bloc cassé à la main par le joueur n'est pas compté. Seuls les blocs supplémentaires minés par zVeinMiner le sont.

1. Avant le minage, zVeinMiner calcule le coût maximal possible, à partir de tous les blocs qui ont passé les vérifications de protection. Si le joueur ne peut pas payer ce montant, aucun bloc supplémentaire n'est miné (le bloc cassé à la main se casse quand même normalement) et le joueur reçoit le message `economy-not-enough`.
2. Après le minage, le joueur ne paie que les blocs **réellement** cassés. Par exemple, si l'outil n'a plus de durabilité à mi-chemin, les blocs qui n'ont pas été cassés ne sont pas facturés.
3. Lorsque le montant est supérieur à 0, le joueur reçoit le message `economy-charged`.

| Clé du message (`messages.yml`) | Valeur par défaut | Variable |
|---------------------------------|-------------------|----------|
| `economy-not-enough` | `&cYou don't have enough money. Required: &f%amount%` | `%amount%`, formaté par le plugin d'économie |
| `economy-charged` | `&aYou have been charged &f%amount%&a.` | `%amount%`, formaté par le plugin d'économie |

<CalloutContainer type="warning">

<CalloutTitle>Aucun fournisseur d'économie</CalloutTitle>

<CalloutDescription>

Si `economy.enabled` vaut `true` mais que Vault ou le fournisseur d'économie est absent, le minage de filons est **gratuit**. La console affiche cet avertissement une seule fois : `Economy is enabled in config.yml but no Vault economy provider was found: vein mining will be free.` Lorsque `economy.enabled` vaut `false`, Vault n'est jamais utilisé.

</CalloutDescription>

</CalloutContainer>

## NoCheatPlus

Tous les blocs d'un filon sont cassés dans le même tick. Sans ce hook, les vérifications de cassage de blocs de NoCheatPlus (fast break et similaires) les annuleraient.

Lorsque NoCheatPlus est activé, zVeinMiner exempte le joueur des vérifications `BLOCKBREAK` uniquement pendant le minage d'un filon, puis retire l'exemption. Si un autre plugin avait déjà exempté le joueur, zVeinMiner ne touche pas à cette exemption. Le cassage normal du bloc n'est jamais exempté, seuls les blocs supplémentaires du filon le sont.

Le hook ne nécessite aucune configuration. Il est chargé par réflexion au démarrage de zVeinMiner. Si NoCheatPlus n'est pas installé, rien n'est affiché et rien n'est exempté. Si NoCheatPlus est installé mais que son API a changé, rien n'est exempté et la console affiche `Failed to hook into NoCheatPlus: <error>`. Contrairement aux hooks de protection, le hook NoCheatPlus n'est pas recherché à nouveau lors d'un `/zveinminer reload`.

## PlaceholderAPI

zVeinMiner **n'enregistre pas sa propre expansion PlaceholderAPI**, il n'a donc aucun placeholder `%zveinminer_...%`.

Lorsque PlaceholderAPI est installé, chaque message que zVeinMiner envoie à un joueur, dans le chat ou dans l'action bar, passe d'abord par PlaceholderAPI. Vous pouvez utiliser n'importe quel placeholder d'autres expansions dans `messages.yml` :

```yaml
economy-charged: "&aYou have been charged &f%amount%&a. Balance: &f%vault_eco_balance_formatted%"
```

Les messages envoyés à la console ne sont pas analysés. Sans PlaceholderAPI, les messages sont envoyés tels quels, et les placeholders restent en texte brut.

<CalloutContainer type="tip">

<CalloutTitle>Pour les développeurs</CalloutTitle>

<CalloutDescription>

Pour ajouter vos propres vérifications, récompenses ou statistiques autour du minage de filons, utilisez les événements et le service `VeinManager` décrits sur la page [API](./api).

</CalloutDescription>

</CalloutContainer>

## Voir aussi

- [Configuration](./configuration) : toutes les options de `config.yml`, y compris `economy`
- [Commandes et permissions](./commands-permissions) : `/zveinminer reload` et les permissions `zveinminer.*`
- [Installation](./installation) : prérequis et mise en place du plugin
