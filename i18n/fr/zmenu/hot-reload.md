---
title: Hot Reload
description: Modifiez vos inventaires et voyez le resultat instantanement en jeu, sans aucune commande
---

# Hot Reload

**Enregistrez le fichier, le menu est a jour. Aucune commande, aucun redemarrage.** Avec le hot reload active, zMenu surveille votre dossier `inventories/` et applique chaque modification tout seul : modifiez un fichier dans votre editeur, envoyez-le en SFTP ou recuperez-le depuis git, et les joueurs voient la nouvelle version instantanement, meme s'ils ont le menu ouvert.

```yaml
# config.yml
hot-reload:
  enable: true
  delay-milliseconds: 500
```

Lancez ensuite `/zm reload config` une fois (ou `/zm reload`) pour demarrer la surveillance. A partir de la, vous n'avez plus jamais besoin de `/zm reload` pour vos inventaires.

<CalloutContainer type="info">

<CalloutTitle>Parfait pour creer des menus</CalloutTitle>

<CalloutDescription>
Ouvrez le menu en jeu, placez votre editeur a cote, et concevez en direct : deplacez un bouton, changez une ligne de lore, corrigez un prerequis, enregistrez, et le menu se rouvre avec votre modification sur la meme page. Combine au [convertisseur DeluxeMenus](./convert-deluxemenus), c'est le moyen le plus rapide de peaufiner vos menus convertis.
</CalloutDescription>

</CalloutContainer>

## Ce qu'il fait

| Vous... | zMenu... |
|---------|----------|
| Modifiez un fichier | Recharge l'inventaire |
| Creez un fichier | Charge le nouvel inventaire |
| Supprimez un fichier (ou un dossier entier) | Decharge l'inventaire et le ferme pour ceux qui le regardent |

Les sous-dossiers de `inventories/` sont aussi surveilles.

## Les joueurs gardent leur place

Les joueurs qui regardent un inventaire au moment ou il est recharge voient la nouvelle version s'ouvrir instantanement :

- sur la **meme page**,
- avec les **memes inventaires precedents**, donc un bouton retour ouvre aussi la nouvelle version.

Si l'inventaire est decharge (fichier supprime, ou `enable: false` ajoute dedans), il est ferme.

## Une erreur ne casse jamais un menu

Un fichier qui ne peut pas etre charge (erreur de syntaxe YAML, type de bouton inconnu, taille invalide...) n'est **pas applique** : la version precedente reste chargee et jouable, et l'erreur est affichee dans la console jusqu'a ce que vous corrigiez le fichier. Vous pouvez enregistrer un travail inacheve sans rien casser pour vos joueurs.

## Fonctionne partout

- **Enregistrements regroupes** : les editeurs de texte enregistrent souvent un fichier en plusieurs etapes. zMenu attend `delay-milliseconds` (500 ms par defaut) apres la derniere modification, donc un enregistrement ne declenche qu'un seul rechargement.
- **Docker, Pterodactyl, WSL, partages reseau, SFTP** : en plus des evenements du systeme de fichiers, le dossier est scanne toutes les deux secondes, donc les modifications sont detectees meme la ou le systeme de fichiers n'envoie aucun evenement.
- **Sauvegardes et git** : si le dossier `inventories/` est supprime puis recree (restauration de sauvegarde, `git checkout`...), il est de nouveau surveille automatiquement.
- **Windows** : toute l'arborescence est surveillee avec un seul handle, donc les sous-dossiers peuvent toujours etre renommes ou supprimes pendant que le serveur tourne.
- **Aucun rechargement inutile** : un fichier est recharge quand son contenu ou sa date de modification change. Le reenregistrer sans changement le recharge quand meme, mais la meme version n'est jamais rechargee deux fois.

## Configuration

| Option | Defaut | Description |
|--------|--------|-------------|
| `enable` | `false` | Active le hot reload |
| `delay-milliseconds` | `500` | Temps d'attente apres la derniere modification d'un fichier avant de le recharger |

Activer ou desactiver l'option prend effet apres `/zm reload` ou `/zm reload config`, ou en moins de deux secondes quand elle est modifiee depuis le dialogue de configuration en jeu.

<CalloutContainer type="info">

<CalloutTitle>Ce qui est surveille</CalloutTitle>

<CalloutDescription>
Seul le dossier `inventories/` est surveille. Les fichiers listes dans [`specify-path-menus`](./configurations/config-yml), les patterns, les commandes et les dialogues necessitent toujours `/zm reload`.
</CalloutDescription>

</CalloutContainer>

## Logs console

Chaque detection, rechargement, dechargement et erreur est affiche dans la console avec le prefixe `[HotReload]` :

```
[zMenu] [HotReload] Inventory hot reload enabled, watching .../plugins/zMenu/inventories (native recursive watch, 12 file(s), 12 loaded inventory(ies), scan every 2000ms, delay 500ms).
[zMenu] [HotReload] Change detected on example.yml, reloading the inventory...
[zMenu] [HotReload] Inventory example.yml reloaded in 14ms, reopened for 1 player(s).
```

Avec [`enable-debug`](./configurations/config-yml#enable-debug) a `true`, chaque evenement de fichier, chaque changement trouve par le scan et chaque fichier ignore (inchange) est aussi affiche.

## Depannage

**Rien ne se passe quand j'enregistre un fichier**
1. Verifiez que la ligne `Inventory hot reload enabled` apparait au demarrage ou apres `/zm reload`.
2. Verifiez que le fichier est dans `inventories/` et n'est pas charge via `specify-path-menus`.
3. Activez `enable-debug` pour voir si la modification est detectee.

**Ma modification n'est pas appliquee**
Le fichier contient probablement une erreur : cherchez-la dans la console. La version precedente reste chargee tant que le fichier n'est pas valide.

## Quand l'activer

- Pendant la creation ou la modification de menus, pour voir vos changements instantanement
- Sur un serveur de test ou de developpement
- Sur les serveurs de production ou les menus sont deployes par SFTP ou git et doivent etre pris en compte sans commande

## Prochaines etapes

- [Migrez depuis DeluxeMenus](./convert-deluxemenus) en une commande
- [Creez votre premier inventaire](./configurations/inventories/create-inventory)
- Consultez toutes les options de [config.yml](./configurations/config-yml)
