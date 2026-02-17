---
sidebar_position: 7
title: Exigences
description: Guide complet du systeme d'exigences dans zMenu - conditions pour les boutons et inventaires
---

# Exigences

Les exigences (requirements) sont des conditions qui doivent etre remplies avant qu'un bouton soit affiche, clique, ou qu'un inventaire soit ouvert. C'est le systeme central pour creer des menus dynamiques et conditionnels dans zMenu.

## Comment fonctionnent les exigences

Une exigence verifie une condition (permission, valeur de placeholder, item en inventaire, etc.). Selon le resultat :
- Si **toutes** les exigences sont remplies, les actions `success` sont executees
- Si **une** exigence echoue, les actions `deny` de cette exigence sont executees

```yaml
click-requirement:
  vip-requirement:
    click:
      - ALL
    requirements:
      - type: permission
        permission: "server.vip"
        deny:
          - type: message
            messages:
              - "&cVous devez être VIP pour utiliser ceci !"
    success:
      - type: message
        messages:
          - "&aBienvenue, VIP !"
```

---

## Ou utiliser les exigences

Les exigences peuvent etre utilisees dans trois contextes :

### view-requirement (Boutons)

Controle si un bouton est **visible**. Si les exigences ne sont pas remplies, le bouton est entierement masque.

```yaml
items:
  vip-seulement:
    slot: 0
    view-requirement:
      requirements:
        - type: permission
          permission: "server.vip"
    item:
      material: DIAMOND
      name: "&b&lItem VIP"
```

### click-requirement (Boutons)

Controle si un bouton peut etre **clique**. Le bouton reste visible, mais le clic est refuse si les conditions ne sont pas remplies.

```yaml
items:
  achat:
    slot: 0
    click-requirement:
      requirements:
        - type: placeholder
          value: "%vault_eco_balance%"
          compare: ">="
          number: 100
          deny:
            - type: message
              messages:
                - "&cVous avez besoin de 100$ pour acheter ceci !"
            - type: sound
              sound: ENTITY_VILLAGER_NO
      success:
        - type: currency-withdraw
          amount: 100
        - type: message
          messages:
            - "&aAchat reussi !"
    item:
      material: GOLD_INGOT
      name: "&e&lAcheter - 100$"
```

### view-requirement / open-requirement (Inventaires)

Controle si un **inventaire peut etre ouvert**. Applique au niveau de l'inventaire, pas sur les boutons individuels. `open-requirement` est un alias de `view-requirement` au niveau de l'inventaire.

```yaml
# Dans votre fichier d'inventaire
name: "&6Menu VIP"
size: 54

view-requirement:
  requirements:
    - type: permission
      permission: "server.vip"
      deny:
        - type: message
          messages:
            - "&cVous devez etre VIP pour acceder a ce menu !"
```

Si l'exigence n'est pas remplie, l'inventaire ne s'ouvrira pas et les actions deny seront executees.

---

## Types d'exigences

### permission

Verifie si le joueur possede une permission specifique.

```yaml
requirements:
  - type: permission
    permission: "server.admin"
```

| Cle | Type | Description |
|-----|------|-------------|
| `permission` | String | Le noeud de permission a verifier |

:::tip
Vous pouvez utiliser n'importe quelle permission de n'importe quel plugin de permissions (LuckPerms, etc.). C'est le type d'exigence le plus simple et le plus courant.
:::

---

### placeholder

Compare une valeur de placeholder a une cible. C'est le type d'exigence le plus polyvalent.

#### Comparaison numerique

```yaml
requirements:
  - type: placeholder
    value: "%player_level%"
    compare: ">="
    number: 10
```

| Cle | Type | Description |
|-----|------|-------------|
| `value` | String | Le placeholder a evaluer |
| `compare` | String | L'operateur de comparaison |
| `number` | Number | La valeur numerique a comparer |

#### Comparaison de texte

```yaml
requirements:
  - type: placeholder
    value: "%player_world%"
    compare: "equals_string"
    target: "world_nether"
```

| Cle | Type | Description |
|-----|------|-------------|
| `value` | String | Le placeholder a evaluer |
| `compare` | String | L'operateur de comparaison |
| `target` | String | La valeur texte a comparer |

#### Operateurs de comparaison

| Operateur | Description | Exemple |
|-----------|-------------|---------|
| `==` | Egal a (numerique) | `compare: "=="` |
| `!=` | Different de (numerique) | `compare: "!="` |
| `>=` | Superieur ou egal | `compare: ">="` |
| `>` | Superieur | `compare: ">"` |
| `<=` | Inferieur ou egal | `compare: "<="` |
| `<` | Inferieur | `compare: "<"` |
| `equals_string` | Correspondance exacte de texte | `compare: "equals_string"` |
| `equalsIgnoreCase` | Correspondance de texte insensible a la casse | `compare: "equalsIgnoreCase"` |

:::info Syntaxe alternative
Dans les patterns, vous pouvez aussi utiliser la cle `action` avec ces valeurs au lieu de `compare` :
- `SUPERIOR_OR_EQUAL` (equivalent a `>=`)
- `SUPERIOR` (equivalent a `>`)
- `EQUAL_TO` (equivalent a `==`)
- `LOWER` (equivalent a `<`)

```yaml
requirements:
  - type: placeholder
    placeholder: "%player_level%"
    value: '10'
    action: SUPERIOR_OR_EQUAL
```
:::

#### Expressions mathematiques

Activez `math: true` pour evaluer des expressions mathematiques dans les valeurs de placeholder :

```yaml
requirements:
  - type: placeholder
    math: true
    placeholder: "%zmenu_player_value_cookie%"
    value: "%price%+(%price%*%zmenu_player_value_upgrades%*1.15)"
    action: SUPERIOR_OR_EQUAL
```

L'expression mathematique est evaluee avant la comparaison. Utile pour des prix dynamiques, des couts progressifs ou des conditions complexes.

---

### money

Verifie si le joueur a suffisamment d'argent sur son compte. Fonctionne avec [BeastTokens](https://www.spigotmc.org/resources/beasttokens-custom-currency.20806/), [Vault](https://www.spigotmc.org/resources/34315/), [PlayerPoints](https://www.spigotmc.org/resources/80745/), [ElementalTokens](https://builtbybit.com/resources/16707/), [ElementalGems](https://builtbybit.com/resources/14920/), [Level](https://www.minecraft.net/), [Experience](https://www.minecraft.net/), [zEssentials](https://www.spigotmc.org/resources/118014/), [EcoBits](https://www.spigotmc.org/resources/109967/), [CoinsEngine](https://www.spigotmc.org/resources/84121/) et [VotingPlugin](https://www.spigotmc.org/resources/15358/).

Utilise [CurrenciesAPI](https://github.com/Traqueur-dev/CurrenciesAPI).

```yaml
requirements:
  - type: money
    amount: 1000
```

| Cle | Type | Description |
|-----|------|-------------|
| `amount` | Number | Le solde minimum requis |
| `currency` | String | Le nom de la monnaie (optionnel) |
| `economy` | String | Le nom de l'economie (uniquement necessaire pour zEssentials, CoinsEngine et EcoBits) |

**Exemple avec monnaie et economie specifiques :**

```yaml
requirements:
  - type: money
    amount: 500
    currency: "gems"
    economy: "CoinsEngine"
```

:::warning
Cette exigence verifie uniquement le solde. Pour retirer de l'argent en cas de succes, utilisez l'action `currency-withdraw` dans le bloc `success`.
:::

---

### item

Verifie si le joueur possede un item specifique dans son inventaire.

```yaml
requirements:
  - type: item
    item:
      material: DIAMOND
      amount: 5
```

| Cle | Type | Description |
|-----|------|-------------|
| `item.material` | String | Le nom du materiau Minecraft |
| `item.amount` | Number | La quantite minimum requise |

Vous pouvez aussi verifier des items avec des proprietes specifiques :

```yaml
requirements:
  - type: item
    item:
      material: DIAMOND_SWORD
      name: "&6Lame legendaire"
      amount: 1
```

---

### luckperm

Verifie si le joueur appartient a un groupe LuckPerms specifique. Necessite [LuckPerms](https://luckperms.net/).

```yaml
requirements:
  - type: luckperm
    group: vip
```

| Cle | Type | Description |
|-----|------|-------------|
| `group` | String | Le nom du groupe LuckPerms |

---

### job

Verifie si le joueur a atteint un niveau de metier specifique. Necessite [Jobs Reborn](https://www.spigotmc.org/resources/jobs-reborn.4216/).

```yaml
requirements:
  - type: job
    job: Miner
    level: 10
```

| Cle | Type | Description |
|-----|------|-------------|
| `job` | String | Le nom du metier |
| `level` | Number | Le niveau minimum requis |

---

### regex

Verifie si une valeur correspond a une expression reguliere. Couramment utilise avec le type de bouton `INPUT` pour valider la saisie du joueur.

```yaml
requirements:
  - type: regex
    input: "%input%"
    regex: "^[1-9][0-9]?$|^64$"
```

| Cle | Type | Description |
|-----|------|-------------|
| `input` | String | La valeur a tester contre la regex |
| `regex` | String | Le pattern d'expression reguliere |

**Exemple : Valider une saisie numerique entre 1 et 64 :**

```yaml
items:
  definir-quantite:
    type: INPUT
    slot: 13
    input-message:
      - "&eEntrez la quantite a acheter :"
      - "&7(1-64)"
    input-cancel: "cancel"
    item:
      material: HOPPER
      name: "&6&lDefinir la quantite"
    click-requirement:
      requirements:
        - type: regex
          input: "%input%"
          regex: "^[1-9][0-9]?$|^64$"
          deny:
            - type: message
              messages:
                - "&cVeuillez entrer un nombre entre 1 et 64"
      success:
        - type: data
          key: "amount"
          value: "%input%"
        - type: refresh
```

---

### player-name

Verifie le nom du joueur.

```yaml
requirements:
  - type: player-name
    name: "Notch"
```

| Cle | Type | Description |
|-----|------|-------------|
| `name` | String | Le nom du joueur a verifier |

---

### cuboid

Verifie si le joueur se trouve dans une zone cuboid. Vous devez definir le monde ainsi que les coordonnees des deux extremites de votre cuboid.

```yaml
requirements:
  - type: cuboid
    cuboids:
      - "world,0,60,0,100,120,100"
```

Le format est `<nom du monde>,<x1>,<y1>,<z1>,<x2>,<y2>,<z2>`.

| Cle | Type | Description |
|-----|------|-------------|
| `cuboids` | Liste de Strings | Liste des zones cuboid au format `monde,x1,y1,z1,x2,y2,z2` |

Vous pouvez definir plusieurs cuboids. L'exigence est validee si le joueur se trouve dans **l'un** d'entre eux :

```yaml
requirements:
  - type: cuboid
    cuboids:
      - "world,0,60,0,100,120,100"
      - "world,-50,40,-50,50,100,50"
      - "world_nether,10,30,10,50,80,50"
```

---

### and

:::warning zMenu+ uniquement
Cette fonctionnalite est uniquement disponible avec [zMenu+](../zmenu-plus).
:::

Combine plusieurs exigences ou **toutes** doivent etre remplies. Cela vous permet de regrouper des exigences et de les imbriquer avec des blocs `or` pour une logique complexe.

```yaml
requirements:
  - type: and
    requirements:
      - type: permission
        permission: "server.vip"
      - type: placeholder
        value: "%player_level%"
        compare: ">="
        number: 10
```

| Cle | Type | Description |
|-----|------|-------------|
| `requirements` | Liste | La liste des sous-exigences qui doivent toutes passer |

---

### or

:::warning zMenu+ uniquement
Cette fonctionnalite est uniquement disponible avec [zMenu+](../zmenu-plus).
:::

Combine plusieurs exigences ou seulement un **minimum** doit etre rempli.

```yaml
requirements:
  - type: or
    minimum: 1
    random: false
    requirements:
      - type: permission
        permission: "server.vip"
      - type: permission
        permission: "server.premium"
```

| Cle | Type | Description |
|-----|------|-------------|
| `minimum` | Number | Le nombre minimum d'exigences qui doivent passer |
| `random` | Boolean | Si la liste des exigences doit etre parcourue aleatoirement |
| `requirements` | Liste | La liste des sous-exigences |

---

### Combiner and + or

Vous pouvez combiner les exigences `and` et `or` pour creer des conditions complexes. Par exemple, le joueur doit avoir la permission A **et** B, et doit aussi avoir la permission C **ou** D :

```yaml
name: "&8Test And/Or"
size: 54
items:
  test:
    slot: 22
    view-requirement:
      requirements:
        - type: and
          requirements:
            - type: permission
              permission: zmenu.test
              success:
                - type: message
                  messages:
                    - "&7Test And 1 - &aOK"
              deny:
                - type: message
                  messages:
                    - "&7Test And 1 - &cKO"
            - type: permission
              permission: zmenu.test2
              success:
                - type: message
                  messages:
                    - "&7Test And 2 - &aOK"
              deny:
                - type: message
                  messages:
                    - "&7Test And 2 - &cKO"
        - type: or
          minimum: 1
          random: true
          requirements:
            - type: permission
              permission: zmenu.test3
              success:
                - type: message
                  messages:
                    - "&7Test Or 1 - &aOK"
              deny:
                - type: message
                  messages:
                    - "&7Test Or 1 - &cKO"
            - type: permission
              permission: zmenu.test4
              success:
                - type: message
                  messages:
                    - "&7Test Or 2 - &aOK"
              deny:
                - type: message
                  messages:
                    - "&7Test Or 2 - &cKO"
    item:
      material: PAPER
      name: "&aTest And/Or"
    else:
      item:
        material: PAPER
        name: "&cTest And/Or"
```

Dans cet exemple, le joueur doit avoir `zmenu.test` **et** `zmenu.test2` (le bloc `and`), et doit aussi avoir `zmenu.test3` **ou** `zmenu.test4` (le bloc `or` avec `minimum: 1`). Chaque sous-exigence a ses propres actions `success` et `deny` pour le retour d'information.

---

## Actions success et deny

Chaque exigence peut avoir des actions `deny`, et le bloc d'exigence global peut avoir des actions `success`.

### deny

Actions executees quand **cette exigence specifique** n'est pas remplie. Defini a l'interieur de chaque exigence individuelle.

```yaml
requirements:
  - type: permission
    permission: "server.vip"
    deny:
      - type: message
        messages:
          - "&cVous avez besoin du rang VIP !"
      - type: sound
        sound: ENTITY_VILLAGER_NO
```

### success

Actions executees quand **toutes les exigences** sont remplies. Defini au niveau du bloc d'exigence (en dehors de la liste `requirements`).

```yaml
click-requirement:
  requirements:
    - type: placeholder
      value: "%vault_eco_balance%"
      compare: ">="
      number: 500
      deny:
        - type: message
          messages:
            - "&cVous avez besoin de 500$ !"
  success:
    - type: currency-withdraw
      amount: 500
    - type: console-command
      commands:
        - "give %player% diamond_sword 1"
    - type: message
      messages:
        - "&aAchat reussi !"
    - type: sound
      sound: ENTITY_PLAYER_LEVELUP
```

Tous les [types d'actions](./buttons/actions) peuvent etre utilises dans les blocs `deny` et `success`.

---

## Exigences multiples

Vous pouvez combiner plusieurs exigences. **Toutes** les exigences doivent etre remplies pour que la condition passe. Si une seule exigence echoue, ses actions `deny` sont executees.

```yaml
click-requirement:
  requirements:
    - type: permission
      permission: "server.vip"
      deny:
        - type: message
          messages:
            - "&cVous avez besoin du rang VIP !"
    - type: placeholder
      value: "%vault_eco_balance%"
      compare: ">="
      number: 1000
      deny:
        - type: message
          messages:
            - "&cVous avez besoin de 1000$ !"
    - type: item
      item:
        material: DIAMOND
        amount: 5
      deny:
        - type: message
          messages:
            - "&cVous avez besoin de 5 diamants !"
  success:
    - type: message
      messages:
        - "&aToutes les conditions sont remplies !"
```

Dans cet exemple, le joueur doit avoir la permission VIP **ET** 1000$ **ET** 5 diamants. Si une condition echoue, le message deny correspondant est affiche.

---

## Le systeme else

Le bloc `else` fonctionne avec `view-requirement` pour afficher un bouton alternatif quand l'exigence n'est pas remplie. Au lieu de masquer completement le bouton, vous pouvez afficher un item different.

### else basique

```yaml
items:
  bouton-vip:
    slot: 0
    view-requirement:
      requirements:
        - type: permission
          permission: "vip.access"
    item:
      material: DIAMOND_BLOCK
      name: "&b&lContenu VIP"
    else:
      item:
        material: COAL_BLOCK
        name: "&7&lVerrouille"
        lore:
          - "&cNecessite le rang VIP"
```

Si le joueur a `vip.access`, il voit un bloc de diamant. Sinon, il voit un bloc de charbon avec un message "verrouille".

### Chaines else imbriquees

Vous pouvez enchainer plusieurs blocs `else` pour creer une machine a etats avec plusieurs etats visuels. Chaque `else` peut avoir son propre `view-requirement` :

```yaml
items:
  recompense:
    slot: 0

    # Etat 1 : Deja reclame
    view-requirement:
      requirements:
        - type: placeholder
          placeholder: "%zmenu_player_value_claimed%"
          value: "true"
          action: EQUAL_TO
    item:
      material: MINECART
      name: "&a&lRecompense reclamee"
      lore:
        - "&7Vous avez deja reclame cette recompense"

    else:
      # Etat 2 : Niveau insuffisant
      view-requirement:
        requirements:
          - type: placeholder
            placeholder: "%player_level%"
            value: "10"
            action: LOWER
      item:
        material: BARRIER
        name: "&c&lVerrouille"
        lore:
          - "&7Necessite le niveau 10"

      else:
        # Etat 3 : Pret a reclamer
        item:
          material: CHEST
          name: "&e&lReclamer la recompense"
          lore:
            - "&7Cliquez pour reclamer !"
        click-requirement:
          requirements:
            - type: placeholder
              placeholder: "%player_level%"
              value: "10"
              action: SUPERIOR_OR_EQUAL
          success:
            - type: data
              action: SET
              key: "claimed"
              value: "true"
            - type: console-command
              commands:
                - "give %player% diamond 10"
            - type: sound
              sound: ENTITY_PLAYER_LEVELUP
```

Le systeme evalue chaque `view-requirement` de haut en bas :
1. Si la premiere exigence correspond, cet etat du bouton est affiche
2. Sinon, il passe au bloc `else` et verifie son exigence
3. Cela continue a travers la chaine
4. Le dernier `else` sans `view-requirement` sert de valeur par defaut

---

## Exigences de clic nommees

A l'interieur de `click-requirement`, vous pouvez definir des **groupes d'exigences nommes** avec des types de clics specifiques. Cela permet differentes conditions pour differentes actions de clic.

```yaml
click-requirement:
  achat:
    clicks:
      - ALL
    requirements:
      - type: placeholder
        value: "%vault_eco_balance%"
        compare: ">="
        number: 100
        deny:
          - type: message
            messages:
              - "&cIl vous faut 100$ pour continuer cet achat."
          - type: sound
            sound: ENTITY_VILLAGER_NO
    success:
      - type: currency-withdraw
        amount: 100
      - type: console-command
        commands:
          - "give %player% emerald 1"
      - type: message
        messages:
          - "&aFelicitation ! Vous avez achete une emeraude."
      - type: sound
        sound: ENTITY_EXPERIENCE_ORB_PICKUP
```

| Cle | Description |
|-----|-------------|
| `clicks` | Liste des types de clics auxquels ce groupe repond |
| `requirements` | Les conditions a verifier |
| `success` | Actions si toutes les exigences passent |

**Types de clics disponibles :** `ALL`, `LEFT`, `RIGHT`, `SHIFT_LEFT`, `SHIFT_RIGHT`, `MIDDLE`, `DROP`, `CONTROL_DROP`

**Exemple avec differentes actions par clic :**

```yaml
click-requirement:
  acheter-un:
    clicks:
      - LEFT
    requirements:
      - type: placeholder
        value: "%vault_eco_balance%"
        compare: ">="
        number: 100
        deny:
          - type: message
            messages:
              - "&cVous avez besoin de 100$ !"
    success:
      - type: currency-withdraw
        amount: 100
      - type: console-command
        commands:
          - "give %player% diamond 1"
  acheter-stack:
    clicks:
      - RIGHT
    requirements:
      - type: placeholder
        value: "%vault_eco_balance%"
        compare: ">="
        number: 6400
        deny:
          - type: message
            messages:
              - "&cVous avez besoin de 6400$ !"
    success:
      - type: currency-withdraw
        amount: 6400
      - type: console-command
        commands:
          - "give %player% diamond 64"
```

---

## Exemples complets

### Item de boutique avec verification de prix

Un bouton qui vend un item seulement si le joueur peut se le permettre :

```yaml
items:
  boutique-epee:
    slot: 13
    type: NONE
    item:
      material: DIAMOND_SWORD
      name: "&6&lEpee en diamant"
      lore:
        - "&8&m─────────────────"
        - ""
        - "&7Prix : &a500$"
        - "&7Votre solde : &e$%vault_eco_balance%"
        - ""
        - "&8&m─────────────────"
        - ""
        - "&e▸ Cliquez pour acheter"
      glow: true
    click-requirement:
      requirements:
        - type: placeholder
          value: "%vault_eco_balance%"
          compare: ">="
          number: 500
          deny:
            - type: message
              messages:
                - "&cVous avez besoin de 500$ pour acheter ceci !"
            - type: sound
              sound: ENTITY_VILLAGER_NO
      success:
        - type: currency-withdraw
          amount: 500
        - type: console-command
          commands:
            - "give %player% diamond_sword 1"
        - type: message
          messages:
            - "&aAchat reussi !"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
        - type: close
```

### Recompense quotidienne avec cooldown

Un bouton qui ne peut etre clique qu'une fois toutes les 24 heures en utilisant les donnees joueur et les horodatages :

```yaml
items:
  recompense-quotidienne:
    slot: 22
    item:
      material: CHEST
      name: "&e&lRecompense quotidienne"
      lore:
        - "&7Reclamez votre recompense quotidienne !"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_math_%zmenu_time_unix_timestamp%-%zmenu_player_value_last_daily%%"
          compare: ">="
          number: 86400
          deny:
            - type: message
              messages:
                - "&cVous avez deja reclame la recompense du jour !"
      success:
        - type: data
          action: SET
          key: "last_daily"
          value: "%zmenu_time_unix_timestamp%"
        - type: console-command
          commands:
            - "give %player% diamond 5"
        - type: data
          action: ADD
          key: "daily_streak"
          value: "1"
        - type: message
          messages:
            - "&aRecompense quotidienne reclamee !"
            - "&7Serie : &e%zmenu_player_value_daily_streak%"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
```

### Menu reserve aux VIP

Un inventaire que seuls les joueurs VIP peuvent ouvrir :

```yaml
name: "&6&lSalon VIP"
size: 54

view-requirement:
  requirements:
    - type: permission
      permission: "server.vip"
      deny:
        - type: message
          messages:
            - "&cCe menu est reserve aux membres VIP !"
        - type: sound
          sound: ENTITY_VILLAGER_NO

open-actions:
  - type: sound
    sound: BLOCK_CHEST_OPEN
  - type: message
    messages:
      - "&aBienvenue dans le salon VIP !"

items:
  # ... vos boutons reserves aux VIP
```

### Bouton base sur le rang avec chaine else

Un bouton qui affiche un contenu different selon le rang du joueur :

```yaml
items:
  affichage-rang:
    slot: 4

    # Rang Diamant
    view-requirement:
      requirements:
        - type: luckperm
          group: diamond
    item:
      material: DIAMOND_BLOCK
      name: "&b&lRang Diamant"
      lore:
        - "&7Votre rang : &bDiamant"

    else:
      # Rang Or
      view-requirement:
        requirements:
          - type: luckperm
            group: gold
      item:
        material: GOLD_BLOCK
        name: "&6&lRang Or"
        lore:
          - "&7Votre rang : &6Or"

      else:
        # Par defaut (aucun rang)
        item:
          material: STONE
          name: "&7&lAucun rang"
          lore:
            - "&7Vous n'avez pas de rang"
            - "&eVisitez notre boutique pour en obtenir un !"
```

### Systeme de depense de donnees joueur

Un bouton qui verifie une monnaie personnalisee stockee dans les donnees joueur :

```yaml
items:
  depenser-pieces:
    slot: 15
    item:
      material: DIAMOND
      name: "&b&lAcheter un diamant"
      lore:
        - "&7Cout : &e50 pieces"
        - "&7Vos pieces : &f%zmenu_player_value_coins%"
    click-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_value_coins%"
          compare: ">="
          number: 50
          deny:
            - type: message
              messages:
                - "&cVous avez besoin de 50 pieces !"
      success:
        - type: data
          action: SUBTRACT
          key: "coins"
          value: "50"
        - type: console-command
          commands:
            - "give %player% diamond 1"
        - type: refresh
```

### Initialiser des valeurs par defaut

Utilisez un bouton invisible avec `view-requirement` pour definir des donnees joueur par defaut lors de la premiere visite :

```yaml
items:
  initialiser:
    slot: 0
    view-requirement:
      requirements:
        - type: placeholder
          value: "%zmenu_player_value_initialized%"
          compare: "!="
          target: "true"
    item:
      material: AIR
    actions:
      - type: data
        action: SET
        key: "coins"
        value: "0"
      - type: data
        action: SET
        key: "initialized"
        value: "true"
      - type: refresh
```

Ce bouton invisible verifie si le joueur a ete initialise. Si ce n'est pas le cas, il definit les valeurs par defaut et rafraichit l'inventaire.
