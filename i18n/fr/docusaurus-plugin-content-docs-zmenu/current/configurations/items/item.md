---
sidebar_position: 1
title: Configuration d'item
description: Reference complete pour la configuration des items dans zMenu
---

# Configuration d'item

Les items sont les elements visuels affiches dans les boutons de votre inventaire. Cette page documente toutes les options de configuration d'item disponibles.

## Structure de base d'un item

```yaml
item:
  material: DIAMOND
  name: "&bMon Item"
  lore:
    - "&7Ligne 1"
    - "&7Ligne 2"
```

## Options de configuration

### material

Le type de materiau Minecraft pour l'item.

```yaml
item:
  material: DIAMOND_SWORD
```

**Materiaux Vanilla :**
Utilisez n'importe quel nom de materiau Minecraft : `DIAMOND`, `STONE`, `PLAYER_HEAD`, etc.

**Plugins d'items personnalises :**

| Plugin | Format | Exemple |
|--------|--------|---------|
| ItemsAdder | `ITEMSADDER:namespace:id` | `ITEMSADDER:my_items:ruby` |
| Oraxen | `ORAXEN:id` | `ORAXEN:emerald_sword` |
| HeadDatabase | `HEAD_DATABASE:id` | `HEAD_DATABASE:12345` |
| Slimefun | `SLIMEFUN:id` | `SLIMEFUN:ELECTRIC_MOTOR` |
| MythicMobs | `MYTHICMOBS:id` | `MYTHICMOBS:SkeletonSword` |
| ExecutableItems | `EXECUTABLE_ITEM:id` | `EXECUTABLE_ITEM:magic_wand` |
| BreweryX | `BREWERYX:recipe` | `BREWERYX:beer` |
| zHead | `ZHEAD:category:name` | `ZHEAD:animals:cat` |

---

### name

Le nom d'affichage de l'item.

```yaml
item:
  material: DIAMOND
  name: "&b&lDiamant Brillant"
```

**Fonctionnalites :**
- Supporte les codes couleur (`&6`, `&#FF5500`)
- Supporte MiniMessage (si active)
- Supporte les placeholders (`%player%`)

---

### lore

Les lignes de description affichees sous le nom de l'item.

```yaml
item:
  material: DIAMOND_SWORD
  name: "&6&lEpee Legendaire"
  lore:
    - "&7Une arme puissante"
    - ""
    - "&7Degats : &c+50"
    - "&7Vitesse : &a+10%"
    - ""
    - "&eCliquez pour equiper !"
```

Chaque element de liste est une nouvelle ligne. Les chaines vides (`""`) creent des lignes blanches.

---

### amount

La taille de la pile de l'item (1-64).

```yaml
item:
  material: DIAMOND
  amount: 64
```

Vous pouvez aussi utiliser des placeholders :

```yaml
item:
  material: DIAMOND
  amount: "%zmenu_player_value_coins%"  # Quantite dynamique
```

---

### durability

Definir la valeur de durabilite/degats pour les outils et armures.

```yaml
item:
  material: DIAMOND_SWORD
  durability: 100  # 100 de durabilite utilisee
```

---

### customModelData

Definir les donnees de modele personnalise pour l'integration des packs de ressources.

```yaml
item:
  material: DIAMOND
  customModelData: 12345
```

Cela permet aux packs de ressources d'afficher des modeles personnalises pour les items.

---

### glow

Ajouter un effet de lueur d'enchantement sans afficher les enchantements.

```yaml
item:
  material: NETHER_STAR
  name: "&6&lItem Special"
  glow: true
```

---

### playerHead

Afficher la tete d'un joueur. Fonctionne uniquement avec `material: PLAYER_HEAD`.

```yaml
item:
  material: PLAYER_HEAD
  playerHead: "%player%"  # Tete du joueur actuel
  name: "&aTete de %player%"
```

Vous pouvez aussi utiliser un nom de joueur specifique :

```yaml
item:
  material: PLAYER_HEAD
  playerHead: "Notch"
```

---

### url

Utiliser une URL de texture de tete personnalisee (texture encodee en base64).

```yaml
item:
  material: PLAYER_HEAD
  url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUv..."
  name: "&6Tete personnalisee"
```

Obtenez des textures de tetes sur des sites comme [minecraft-heads.com](https://minecraft-heads.com/).

---

### enchantments

Ajouter des enchantements a l'item.

```yaml
item:
  material: DIAMOND_SWORD
  enchantments:
    - type: SHARPNESS
      level: 5
    - type: UNBREAKING
      level: 3
    - type: FIRE_ASPECT
      level: 2
```

Types d'enchantements courants :
- Epees : `SHARPNESS`, `SMITE`, `FIRE_ASPECT`, `KNOCKBACK`
- Armures : `PROTECTION`, `THORNS`, `UNBREAKING`
- Outils : `EFFICIENCY`, `FORTUNE`, `SILK_TOUCH`
- Arcs : `POWER`, `PUNCH`, `INFINITY`, `FLAME`

---

### flags

Masquer certains attributs d'item en utilisant les drapeaux d'item.

```yaml
item:
  material: DIAMOND_SWORD
  enchantments:
    - type: SHARPNESS
      level: 5
  flags:
    - HIDE_ENCHANTS
    - HIDE_ATTRIBUTES
```

**Drapeaux disponibles :**

| Drapeau | Description |
|---------|-------------|
| `HIDE_ENCHANTS` | Masquer la liste des enchantements |
| `HIDE_ATTRIBUTES` | Masquer les modificateurs d'attributs |
| `HIDE_UNBREAKABLE` | Masquer le tag "Incassable" |
| `HIDE_DESTROYS` | Masquer la liste "Peut detruire" |
| `HIDE_PLACED_ON` | Masquer la liste "Peut etre place sur" |
| `HIDE_POTION_EFFECTS` | Masquer les effets de potion |
| `HIDE_DYE` | Masquer la couleur de teinture des armures en cuir |
| `HIDE_ARMOR_TRIM` | Masquer le motif de garniture d'armure |

---

### unbreakable

Rendre l'item incassable.

```yaml
item:
  material: DIAMOND_PICKAXE
  unbreakable: true
  flags:
    - HIDE_UNBREAKABLE
```

---

### attributes

Ajouter des modificateurs d'attributs a l'item.

```yaml
item:
  material: DIAMOND_SWORD
  attributes:
    - slot: HAND
      type: ATTACK_DAMAGE
      operation: ADD_NUMBER
      value: 10
    - slot: HAND
      type: ATTACK_SPEED
      operation: ADD_NUMBER
      value: -2.4
```

**Types d'attributs :**
- `ATTACK_DAMAGE` - Bonus de degats d'attaque
- `ATTACK_SPEED` - Modificateur de vitesse d'attaque
- `MAX_HEALTH` - Sante maximum
- `MOVEMENT_SPEED` - Vitesse de deplacement
- `ARMOR` - Points d'armure
- `ARMOR_TOUGHNESS` - Solidite d'armure
- `KNOCKBACK_RESISTANCE` - Resistance au recul
- `LUCK` - Modificateur de chance

**Operations :**
- `ADD_NUMBER` - Ajouter une valeur fixe
- `ADD_SCALAR` - Ajouter un pourcentage
- `MULTIPLY_SCALAR_1` - Multiplier par (1 + valeur)

**Emplacements :**
- `HAND` - Main principale
- `OFF_HAND` - Main secondaire
- `HEAD`, `CHEST`, `LEGS`, `FEET` - Emplacements d'armure

---

### potion

Configurer les items de potion.

```yaml
item:
  material: POTION
  potion:
    type: SPEED
    duration: 600    # En ticks (600 = 30 secondes)
    amplifier: 1     # Niveau 2 (0 = niveau 1)
    extended: false
    upgraded: false
```

Pour les potions a eclabousser ou persistantes :

```yaml
item:
  material: SPLASH_POTION
  potion:
    type: HEALING
    amplifier: 1
```

---

### banner

Configurer les motifs de banniere.

```yaml
item:
  material: WHITE_BANNER
  banner:
    base_color: WHITE
    patterns:
      - type: STRIPE_BOTTOM
        color: RED
      - type: STRIPE_TOP
        color: BLUE
      - type: CROSS
        color: BLACK
```

**Types de motifs :**
`STRIPE_BOTTOM`, `STRIPE_TOP`, `STRIPE_LEFT`, `STRIPE_RIGHT`, `STRIPE_CENTER`, `STRIPE_MIDDLE`, `STRIPE_DOWNRIGHT`, `STRIPE_DOWNLEFT`, `CROSS`, `STRAIGHT_CROSS`, `DIAGONAL_LEFT`, `DIAGONAL_RIGHT`, `DIAGONAL_LEFT_MIRROR`, `DIAGONAL_RIGHT_MIRROR`, `CIRCLE_MIDDLE`, `RHOMBUS_MIDDLE`, `HALF_VERTICAL`, `HALF_HORIZONTAL`, `TRIANGLE_BOTTOM`, `TRIANGLE_TOP`, `TRIANGLES_BOTTOM`, `TRIANGLES_TOP`, `BORDER`, `CURLY_BORDER`, `GRADIENT`, `GRADIENT_UP`, `BRICKS`, `GLOBE`, `CREEPER`, `SKULL`, `FLOWER`, `MOJANG`, `PIGLIN`

---

### firework

Configurer les fusees de feu d'artifice.

```yaml
item:
  material: FIREWORK_ROCKET
  firework:
    power: 2
    effects:
      - type: BALL_LARGE
        colors:
          - RED
          - ORANGE
        fade_colors:
          - YELLOW
        trail: true
        flicker: true
```

**Types de feu d'artifice :**
`BALL`, `BALL_LARGE`, `BURST`, `CREEPER`, `STAR`

---

### leather-color

Colorer les armures en cuir.

```yaml
item:
  material: LEATHER_CHESTPLATE
  leather-color: "#FF5555"  # Couleur rouge
```

Ou utilisez des valeurs RGB :

```yaml
item:
  material: LEATHER_BOOTS
  leather-color: "255,85,85"
```

---

### modelId

Alternative a customModelData (meme fonctionnalite).

```yaml
item:
  material: PAPER
  modelId: 1001
```

---

## Components (1.20.5+)

A partir de Minecraft 1.20.5, les items utilisent un nouveau systeme de composants. zMenu fournit un support complet pour plus de 40 types de composants incluant food, tools, weapons, attributes, et plus encore.

```yaml
item:
  material: DIAMOND_SWORD
  components:
    custom-name: "&6&lEpee Legendaire"
    rarity: EPIC
    enchantments:
      - enchantment: sharpness
        level: 5
    fire-resistant: true
```

Pour la reference complete des composants, consultez la page dediee [Components](./components).

---

## Exemples complets

### Item simple

```yaml
item:
  material: DIAMOND
  name: "&b&lDiamant"
  lore:
    - "&7Une gemme precieuse"
```

### Tete de joueur avec texture

```yaml
item:
  material: PLAYER_HEAD
  url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA..."
  name: "&6&lCoffre au tresor"
  lore:
    - "&7Cliquez pour ouvrir !"
  glow: true
```

### Outil enchante

```yaml
item:
  material: DIAMOND_PICKAXE
  name: "&a&lReve du mineur"
  lore:
    - "&7L'outil de minage ultime"
    - ""
    - "&7Efficacite V"
    - "&7Fortune III"
    - "&7Solidite III"
  enchantments:
    - type: EFFICIENCY
      level: 5
    - type: FORTUNE
      level: 3
    - type: UNBREAKING
      level: 3
  flags:
    - HIDE_ENCHANTS
  glow: true
```

### Item dynamique avec placeholders

```yaml
item:
  material: PLAYER_HEAD
  playerHead: "%player%"
  name: "&6&lProfil de %player%"
  lore:
    - "&8&m─────────────────"
    - ""
    - "&7Niveau : &a%player_level%"
    - "&7Sante : &c%player_health%/%player_max_health%"
    - "&7Solde : &6$%vault_eco_balance_formatted%"
    - ""
    - "&7Kills : &a%statistic_player_kills%"
    - "&7Morts : &c%statistic_deaths%"
    - ""
    - "&8&m─────────────────"
```

### Item potion

```yaml
item:
  material: SPLASH_POTION
  name: "&d&lPotion de soin"
  lore:
    - "&7Guerit instantanement 4 coeurs"
  potion:
    type: INSTANT_HEAL
    amplifier: 1
  flags:
    - HIDE_POTION_EFFECTS
```

### Item avec modele personnalise

```yaml
item:
  material: PAPER
  name: "&e&lBaguette magique"
  lore:
    - "&7Lancez des sorts puissants !"
  customModelData: 10001
  glow: true
```

## Utiliser ItemsAdder/Oraxen

Pour les items personnalises d'ItemsAdder :

```yaml
item:
  material: ITEMSADDER:my_namespace:ruby_gem
  name: "&c&lGemme de rubis"
```

Pour les items Oraxen :

```yaml
item:
  material: ORAXEN:amethyst_sword
  name: "&d&lEpee d'amethyste"
```

## Bonnes pratiques

1. **Utilisez des noms significatifs** - Rendez les noms d'items clairs et descriptifs
2. **Formatez le lore de maniere coherente** - Utilisez des separateurs et des espacements pour la lisibilite
3. **Masquez les infos inutiles** - Utilisez des drapeaux pour masquer les enchantements/attributs quand non necessaire
4. **Utilisez des placeholders** - Rendez les items dynamiques avec PlaceholderAPI
5. **Testez avec les packs de ressources** - Si vous utilisez customModelData, verifiez que les modeles s'affichent correctement

## Prochaines etapes

- Apprenez a utiliser les items dans les [Boutons](../buttons/button)
- Ajoutez des [Actions](../buttons/actions) pour rendre les items interactifs
- Creez des [Patterns](../patterns) pour des modeles d'items reutilisables
