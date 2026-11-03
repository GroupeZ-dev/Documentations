---
title: Presets et tags
description: Fonctionnement des presets, des tags, de la taille des filons, de l'aperçu, de la durabilité et du cooldown de zVeinMiner
---

# Presets et tags

zVeinMiner n'active jamais le vein mining sur tous les outils. Un outil ne mine en filon que s'il **porte des données de vein mining** : une **taille** (le nombre de blocs qu'un filon peut contenir) et une liste de **tags** (les blocs qui peuvent être minés en filon). Ces données sont stockées sur l'objet lui-même (dans son PersistentDataContainer), elles restent donc sur l'objet lorsqu'il est échangé, rangé dans un coffre ou renommé.

Le moyen le plus simple de donner ces données à un objet est un **preset**, défini dans `config.yml`.

---

## Définir des presets

Les presets sont déclarés dans la liste `presets` de `config.yml`. Chaque entrée nécessite trois clés :

| Clé | Type | Description |
|-----|------|-------------|
| `name` | String | Nom unique du preset, utilisé par les commandes (sensible à la casse) |
| `size` | Entier (supérieur à 0) | Nombre maximum de blocs dans un filon, **bloc cassé inclus** |
| `tags` | Liste | Tags et/ou matériaux de blocs que le preset peut miner en filon |

La configuration par défaut contient un preset :

```yaml
presets:
  - name: "pickaxe-1"
    size: 8
    tags:
      - COAL_ORES
      - COPPER_ORES
      - DIAMOND_ORES
      - EMERALD_ORES
      - GOLD_ORES
      - IRON_ORES
      - LAPIS_ORES
      - REDSTONE_ORES
      - ANCIENT_DEBRIS
```

Les presets sont chargés dans l'ordre de `config.yml` et rechargés avec `/zveinminer reload`. Une entrée invalide n'interrompt pas le chargement : elle est ignorée avec un avertissement dans la console.

| Situation | Résultat |
|-----------|----------|
| `name` absent ou vide | Preset ignoré |
| `size` absent, non numérique ou `<= 0` | Preset ignoré |
| `tags` absent ou n'est pas une liste | Preset ignoré |
| Un tag n'est ni un tag connu ni un matériau de bloc | Ce tag est ignoré (avertissement), le preset est conservé, même s'il ne reste aucun tag valide |
| Deux presets avec le même `name` | La dernière définition est utilisée |
| `size` supérieur à `max-size-limit` | Preset conservé, le filon est limité à `max-size-limit` |

<CalloutContainer type="tip">

<CalloutTitle>Lister les presets</CalloutTitle>

<CalloutDescription>
Utilisez `/zveinminer list` en jeu pour voir les presets réellement chargés. Consultez [Commandes et permissions](./commands-permissions) pour la liste de toutes les commandes.
</CalloutDescription>

</CalloutContainer>

---

## Tags

Chaque entrée de `tags` (dans un preset ou ajoutée avec `/zveinminer add`) est l'un des éléments suivants :

| Type | Exemple | Correspond à |
|------|---------|--------------|
| **Tag Bukkit** | `COAL_ORES`, `LOGS`, `LEAVES` | Tous les blocs de ce tag Minecraft (`COAL_ORES` = minerai de charbon et minerai de charbon des abîmes) |
| **Matériau de bloc** | `DIAMOND_ORE`, `GRAVEL`, `ANCIENT_DEBRIS` | Exactement ce bloc |

Règles appliquées à la lecture d'un tag :

- Les noms **ne sont pas sensibles à la casse** (`coal_ores` et `COAL_ORES` sont identiques) et les espaces autour sont ignorés.
- Les tags sont les noms des constantes de la classe `Tag` de Bukkit (par exemple `COAL_ORES`, `IRON_ORES`, `LOGS`, `CRIMSON_STEMS`), **et non** des clés avec namespace comme `minecraft:coal_ores`. Le nom est d'abord recherché parmi les tags, puis parmi les matériaux.
- Seuls les matériaux de **blocs** sont acceptés. Les objets qui ne peuvent pas être posés dans le monde sont refusés.
- `NETHERITE_SCRAP` (utilisé par d'anciennes configurations par défaut) est automatiquement converti en `ANCIENT_DEBRIS`.

<CalloutContainer type="info">

<CalloutTitle>Auto-complétion</CalloutTitle>

<CalloutDescription>
`/zveinminer add <tag>` propose tous les noms de tags disponibles et tous les matériaux de blocs, ce qui vous permet de les parcourir en jeu.
</CalloutDescription>

</CalloutContainer>

### Comment le filon suit un tag

Lorsque vous cassez un bloc, zVeinMiner parcourt les tags de votre outil **dans leur ordre** et retient le **premier qui correspond** au bloc cassé. L'option `match-by-tag` (section `vein-mining` de `config.yml`) détermine ensuite quels blocs voisins font partie du filon :

| `match-by-tag` | Blocs reliés au filon |
|----------------|-----------------------|
| `true` (valeur livrée) | Tous les blocs couverts par **le tag qui correspond au bloc cassé**. Avec `IRON_ORES`, le minerai de fer et le minerai de fer des abîmes sont minés ensemble. |
| `false` | Uniquement les blocs **exactement du même type** que le bloc cassé. Les variantes en pierre et en ardoise des abîmes sont minées séparément. |

```yaml
vein-mining:
  match-by-tag: true
```

<CalloutContainer type="warning">

<CalloutTitle>Tags larges</CalloutTitle>

<CalloutDescription>
Avec `match-by-tag: true`, un tag large relie tout ce qu'il contient : `LOGS` relie un chêne à un bouleau qui le touche. Pour une seule essence à la fois, utilisez des noms de matériaux (`OAK_LOG`, `BIRCH_LOG`...) ou passez `match-by-tag` à `false`. Si la clé est absente d'un ancien `config.yml`, la valeur `false` est utilisée.
</CalloutDescription>

</CalloutContainer>

Lorsqu'un nom de matériau correspond (par exemple `DIAMOND_ORE`), seul ce bloc exact est relié, quelle que soit la valeur de `match-by-tag`.

---

## Donner des données de vein mining à un objet

Cinq commandes écrivent des données de vein mining sur l'objet tenu en main principale (ou sur un nouvel objet pour `give`). Elles ne fonctionnent pas avec une main vide.

| Commande | Ce qui est stocké sur l'objet | Suit les modifications ultérieures de `config.yml` ? |
|----------|-------------------------------|------------------------------------------------------|
| `/zveinminer apply <preset>` | Uniquement le **nom du preset** | Oui : la taille et les tags sont lus depuis le preset à chaque fois |
| `/zveinminer set <preset>` | Une **copie** de la taille et des tags du preset | Non : l'objet conserve les valeurs reçues |
| `/zveinminer give <player> <preset> [material]` | Un nouvel objet avec une **copie** de la taille et des tags du preset (comme `set`) | Non |
| `/zveinminer add <tag>` / `remove <tag>` | La **liste complète des tags** de l'objet | Non pour les tags |
| `/zveinminer size [size]` | La **taille** de l'objet | Non pour la taille |

### apply : lié au preset

```
/zveinminer apply pickaxe-1
```

L'objet ne retient que le nom `pickaxe-1`. Modifiez la taille ou les tags de `pickaxe-1` dans `config.yml`, lancez `/zveinminer reload`, et tous les objets ayant reçu `apply pickaxe-1` utilisent les nouvelles valeurs. Si le preset est retiré de la configuration, ces objets ne minent plus en filon (sauf s'ils possèdent leur propre taille et leurs propres tags).

### set et give : une copie figée

```
/zveinminer set pickaxe-1
/zveinminer give Maxlego08 pickaxe-1 NETHERITE_PICKAXE
```

La taille et les tags du preset sont copiés sur l'objet. Modifier le preset par la suite ne change pas ces objets. `give` crée un nouvel objet du matériau indiqué (par défaut `DIAMOND_PICKAXE`), y copie le preset et le donne à un joueur en ligne dont le nom doit être **exact**. Si son inventaire est plein, l'objet est jeté à ses pieds.

### add, remove et size : ajuster un seul objet

```
/zveinminer add GRAVEL
/zveinminer remove DIAMOND_ORES
/zveinminer size 16
/zveinminer size
```

- `add` et `remove` partent des tags **actuels** de l'objet (y compris ceux hérités d'un preset appliqué) et écrivent la liste obtenue sur l'objet. À partir de là, l'objet conserve sa propre liste de tags au lieu de celle du preset. Retirer le dernier tag laisse l'objet **sans aucun tag** : il ne revient pas aux tags du preset.
- `size <size>` stocke une taille sur l'objet. Elle doit être un nombre entier supérieur ou égal à `0` et, lorsque `max-size-limit` est supérieur à `0`, ne peut pas dépasser `max-size-limit`. `size 0` supprime la taille stockée sur l'objet, qui utilise alors de nouveau la taille de son preset appliqué.
- `size` sans argument affiche la taille actuelle de l'objet tenu en main.

### Quelle valeur l'emporte

Les valeurs de l'objet l'emportent toujours sur celles du preset :

| Valeur | Lue depuis |
|--------|------------|
| Taille | La taille stockée sur l'objet, sinon la taille du preset appliqué, sinon `0` |
| Tags | La liste de tags stockée sur l'objet, sinon les tags du preset appliqué, sinon aucun |

Utilisez `/zveinminer info` pour afficher la taille et les tags résolus pour l'objet tenu en main (la taille affichée est la valeur stockée ou celle du preset, avant la limite `max-size-limit`).

---

## Taille du filon et max-size-limit

La `size` est le nombre total de blocs d'un filon, **bloc cassé inclus** : une taille de `8` casse le bloc que vous minez plus jusqu'à 7 autres.

```yaml
vein-mining:
  # Maximum vein size limit (overrides preset if lower)
  max-size-limit: 64
```

- `max-size-limit` plafonne chaque filon, quelle que soit la taille du preset ou de l'objet. Avec `max-size-limit: 64`, un objet d'une taille de `200` mine au maximum 64 blocs.
- `max-size-limit: 0` (ou moins) désactive le plafond.
- Une taille de `1` ou moins ne déclenche jamais le vein mining : le bloc est cassé normalement.

---

## Détection du filon

Lorsqu'un bloc est cassé avec un outil valide, le filon est recherché par un parcours en largeur (BFS) à partir de ce bloc :

1. Les 26 blocs voisins (faces, arêtes **et coins**) de chaque bloc sont vérifiés, les minerais en diagonale font donc partie du filon.
2. Un bloc rejoint le filon s'il correspond au tag (voir [Comment le filon suit un tag](#comment-le-filon-suit-un-tag)) **et** si l'outil tenu en main est le bon outil pour le récolter.
3. La recherche s'arrête lorsque le filon atteint sa taille, et les blocs les plus proches sont trouvés en premier.

La recherche ne sort jamais de la hauteur du monde, ne dépasse jamais la bordure du monde et n'entre jamais dans un chunk non chargé.

Le vein mining ne se déclenche que si toutes ces conditions sont remplies :

| Condition | Détails |
|-----------|---------|
| Permission | Le joueur possède `zveinminer.use` |
| Activation | Le joueur n'a pas désactivé le vein mining avec `/zveinminer toggle` |
| Mode de jeu | Ni Aventure ni Spectateur |
| Monde | Le monde est autorisé par la section `worlds` ([Configuration](./configuration)) |
| Accroupissement | Le joueur est accroupi, uniquement si `require-sneak: true` |
| Données de l'objet | L'objet tenu a une taille supérieure à 1 et un tag correspondant au bloc cassé |
| Outil | L'outil tenu peut récolter le bloc cassé (pas de vein mining du minerai de diamant avec une pioche en bois) |

Chaque bloc supplémentaire est cassé comme si le joueur le cassait : un `BlockBreakEvent` est déclenché pour chaque bloc, les drops, Fortune, Toucher de soie et l'expérience de l'outil s'appliquent, et les plugins de protection peuvent refuser n'importe lequel d'entre eux (voir [Intégrations](./integrations)).

---

## Aperçu en étant accroupi

Lorsque le joueur **commence à s'accroupir** en regardant un bloc (jusqu'à 5 blocs de distance) que son outil pourrait miner en filon, le contour du filon est affiché à l'aide de shulkers invisibles lumineux. Seuls les blocs extérieurs du filon sont mis en évidence, et seuls les blocs que le joueur a le droit de casser sont affichés.

```yaml
vein-mining:
  # Show the outline of the vein while sneaking
  preview: true
```

- L'aperçu utilise les mêmes vérifications que le vein mining (permission, activation, monde, données de l'objet, outil), il montre donc exactement ce qui serait miné. Il fonctionne que `require-sneak` soit activé ou non.
- Il est calculé au moment où le joueur commence à s'accroupir. Pour prévisualiser un autre filon, relevez-vous puis accroupissez-vous de nouveau en le regardant.
- Seul le joueur accroupi voit son aperçu.
- Il disparaît lorsque le joueur se relève, casse un bloc, change d'objet en main, échange ses mains, se téléporte, change de monde, meurt ou se déconnecte, ainsi que lorsqu'un bloc prévisualisé est détruit ou déplacé (autre joueur, explosion, piston).
- Les shulkers de l'aperçu ne sont jamais sauvegardés avec le monde. Ceux laissés par un crash ou par une ancienne version sont supprimés au démarrage et au chargement de leur chunk.

Passez `preview: false` pour le désactiver.

---

## Durabilité

La section `tools` de `config.yml` contrôle la façon dont l'outil est endommagé :

```yaml
tools:
  # Check tool durability before mining (prevents breaking more blocks than durability allows)
  check-durability: true
  # Apply durability damage to the tool
  apply-damage: true
```

| Option | Effet |
|--------|-------|
| `apply-damage: true` | Chaque bloc supplémentaire endommage l'outil comme en minage vanilla, Solidité incluse |
| `apply-damage: false` | Les blocs supplémentaires du filon n'endommagent pas l'outil |
| `check-durability: true` | La durabilité est vérifiée **bloc par bloc** : le filon s'arrête avant que l'outil ne casse, un vein mining **ne casse donc jamais l'outil** (vérifié uniquement lorsque `apply-damage` vaut `true`) |
| `check-durability: false` | Aucune vérification : le filon continue jusqu'à ce que l'outil casse, puis s'arrête |

Les vérifications de durabilité sont ignorées en mode Créatif et pour les objets incassables. Les outils personnalisés avec une durabilité maximale modifiée ou des dégâts par bloc plus élevés sont pris en compte.

<CalloutContainer type="info">

<CalloutTitle>Mauvais outil, pas de filon</CalloutTitle>

<CalloutDescription>
Les blocs que l'outil tenu ne peut pas récolter ne font jamais partie du filon, même s'ils correspondent à un tag. Avec une pioche en pierre et le tag `DIAMOND_ORES`, rien n'est miné en filon car le minerai de diamant nécessite une pioche en fer. Les blocs qui se récoltent avec n'importe quel outil (bûches, gravier, argile...) acceptent n'importe quel objet tenu portant les données de vein mining.
</CalloutDescription>

</CalloutContainer>

---

## Cooldown

```yaml
vein-mining:
  # Cooldown between vein mines in ticks (0 = disabled)
  cooldown: 0
```

- Le cooldown est exprimé en **ticks** (20 ticks = 1 seconde). `0` le désactive.
- Il démarre après un vein mining ayant cassé au moins un bloc supplémentaire.
- Pendant le cooldown, le bloc cassé est miné normalement (sans filon) et le message `cooldown` est affiché dans l'action bar avec les secondes restantes.
- Les joueurs possédant `zveinminer.bypass.cooldown` ignorent le cooldown.

---

## Exemples

Tous les exemples ci-dessous se placent dans la liste `presets` de `config.yml`. Donnez-les avec `/zveinminer apply <name>`, `/zveinminer set <name>` ou `/zveinminer give <player> <name> [material]`.

### Pioche pour les minerais

```yaml
presets:
  - name: "pickaxe-ores"
    size: 16
    tags:
      - COAL_ORES
      - COPPER_ORES
      - IRON_ORES
      - GOLD_ORES
      - REDSTONE_ORES
      - LAPIS_ORES
      - DIAMOND_ORES
      - EMERALD_ORES
      - NETHER_QUARTZ_ORE
      - ANCIENT_DEBRIS
```

Avec `match-by-tag: true`, les variantes en pierre et en ardoise des abîmes de chaque minerai sont minées ensemble. L'outil doit tout de même pouvoir récolter chaque minerai : une pioche en fer est nécessaire pour les minerais de diamant.

```
/zveinminer give Maxlego08 pickaxe-ores DIAMOND_PICKAXE
```

### Hache pour les arbres

```yaml
presets:
  - name: "axe-trees"
    size: 32
    tags:
      - LOGS
```

`LOGS` contient toutes les bûches, tous les bois, toutes les tiges et toutes les hyphes. Avec `match-by-tag: true`, les bûches d'essences différentes qui se touchent sont minées ensemble.

Pour abattre une seule essence à la fois, listez plutôt des matériaux :

```yaml
presets:
  - name: "axe-oak"
    size: 32
    tags:
      - OAK_LOG
      - DARK_OAK_LOG
```

```
/zveinminer give Maxlego08 axe-trees DIAMOND_AXE
```

### Pelle pour le gravier et l'argile

```yaml
presets:
  - name: "shovel-1"
    size: 12
    tags:
      - GRAVEL
      - CLAY
```

### Améliorer un seul objet

Partez d'un preset, puis ajustez l'objet tenu en main :

```
/zveinminer apply pickaxe-1
/zveinminer add NETHER_QUARTZ_ORE
/zveinminer size 24
/zveinminer info
```

Après ces commandes, l'objet conserve sa propre liste de tags (les tags de `pickaxe-1` plus `NETHER_QUARTZ_ORE`) et sa propre taille de 24. `size 24` est refusé si `max-size-limit` est activé et inférieur à 24.

<CalloutContainer type="tip">

<CalloutTitle>Aller plus loin</CalloutTitle>

<CalloutDescription>
Les autres options de `config.yml` (mondes, drops, économie) sont décrites dans [Configuration](./configuration). Les développeurs peuvent lire et écrire les mêmes données d'objet via l'[API](./api).
</CalloutDescription>

</CalloutContainer>
