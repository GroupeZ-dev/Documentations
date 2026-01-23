---
sidebar_position: 1
title: Configuration des boutons
description: Reference complete pour la configuration des boutons dans zMenu
---

# Configuration des boutons

Les boutons sont les elements interactifs de vos inventaires. Cette page documente toutes les options de configuration de boutons disponibles.

## Structure de base

```yaml
items:
  mon-bouton:
    slot: 0
    item:
      material: DIAMOND
      name: "&bMon Bouton"
    actions:
      - type: message
        messages:
          - "&aVous avez clique sur le bouton !"
```

## Options de configuration

### slot

La position du bouton dans l'inventaire. Les emplacements sont numerotes a partir de 0.

```yaml
items:
  bouton:
    slot: 13
```

**Disposition des emplacements (inventaire 54 slots) :**
```
Ligne 1 :  0  1  2  3  4  5  6  7  8
Ligne 2 :  9 10 11 12 13 14 15 16 17
Ligne 3 : 18 19 20 21 22 23 24 25 26
Ligne 4 : 27 28 29 30 31 32 33 34 35
Ligne 5 : 36 37 38 39 40 41 42 43 44
Ligne 6 : 45 46 47 48 49 50 51 52 53
```

---

### slots

Utiliser plusieurs emplacements pour le meme bouton.

```yaml
items:
  bordure:
    slots:
      - 0
      - 1
      - 2
      - 8
    item:
      material: BLACK_STAINED_GLASS_PANE
```

**Syntaxe de plage :**
```yaml
items:
  ligne:
    slots:
      - 0-8      # Emplacements 0 a 8
      - 45-53    # Emplacements 45 a 53
```

---

### type

Le type de bouton determine un comportement special. Par defaut c'est `NONE`.

```yaml
items:
  retour:
    slot: 45
    type: BACK
    item:
      material: ARROW
      name: "&c&lRetour"
```

**Types disponibles :**

| Type | Description |
|------|-------------|
| `NONE` | Bouton par defaut sans comportement special |
| `INVENTORY` | Ouvre un autre inventaire |
| `BACK` | Retourne a l'inventaire precedent |
| `HOME` | Retourne au premier inventaire de l'historique |
| `NEXT` | Va a la page suivante |
| `PREVIOUS` | Va a la page precedente |
| `JUMP` | Saute a une page specifique |
| `MAIN_MENU` | Ouvre le menu principal |
| `SWITCH` | Affiche differents items selon les conditions |

Voir [Types de boutons](./types/none) pour la documentation detaillee de chaque type.

---

### item

L'apparence visuelle du bouton. Voir [Configuration d'item](../items/item) pour toutes les options.

```yaml
items:
  bouton:
    slot: 0
    item:
      material: DIAMOND
      name: "&b&lDiamant"
      lore:
        - "&7Un diamant brillant"
```

---

### actions

Actions executees lorsque le bouton est clique.

```yaml
items:
  bouton:
    slot: 0
    item:
      material: EMERALD
    actions:
      - type: message
        messages:
          - "&aVous avez clique !"
      - type: sound
        sound: UI_BUTTON_CLICK
```

Voir [Actions](./actions) pour tous les types d'actions disponibles.

---

### sound

Jouer un son lorsque le bouton est clique (raccourci).

```yaml
items:
  bouton:
    slot: 0
    sound: UI_BUTTON_CLICK
    item:
      material: DIAMOND
```

Pour plus de controle, utilisez plutot l'action sound :

```yaml
actions:
  - type: sound
    sound: UI_BUTTON_CLICK
    pitch: 1.5
    volume: 0.5
```

---

### messages

Envoyer des messages au clic (raccourci).

```yaml
items:
  bouton:
    slot: 0
    messages:
      - "&aBonjour !"
      - "&7Bienvenue sur le serveur."
    item:
      material: BOOK
```

---

### close-inventory

Fermer l'inventaire lorsque le bouton est clique.

```yaml
items:
  fermer:
    slot: 49
    close-inventory: true
    item:
      material: BARRIER
      name: "&c&lFermer"
```

---

### refresh-on-click

Rafraichir l'inventaire entier apres le clic.

```yaml
items:
  rafraichir:
    slot: 0
    refresh-on-click: true
    item:
      material: COMPASS
      name: "&e&lRafraichir"
```

---

### update-on-click

Mettre a jour uniquement ce bouton apres le clic.

```yaml
items:
  bascule:
    slot: 0
    update-on-click: true
    item:
      material: LEVER
      name: "&e&lBascule"
```

---

### is-permanent

Afficher ce bouton sur toutes les pages d'un inventaire pagine.

```yaml
items:
  navigation:
    slot: 49
    is-permanent: true
    item:
      material: ARROW
      name: "&7Navigation"
```

---

### page

Afficher le bouton uniquement sur une page specifique.

```yaml
items:
  page1-seulement:
    slot: 0
    page: 1
    item:
      material: DIAMOND
      name: "&bItem Page 1"
```

**Format de plage :**
```yaml
items:
  pages-1-a-3:
    slot: 0
    page: 1-3
    item:
      material: EMERALD
      name: "&aPages 1-3"
```

---

### else

Definir un bouton alternatif quand une exigence de vue n'est pas remplie.

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

---

### open-link

Ouvrir une URL ou proposer au joueur de rejoindre un serveur Discord.

```yaml
items:
  discord:
    slot: 0
    open-link: "https://discord.gg/monserveur"
    item:
      material: PLAYER_HEAD
      url: "discord_head_texture"
      name: "&9&lDiscord"
      lore:
        - "&7Cliquez pour rejoindre notre Discord !"
```

---

### player-head

Afficher la tete du joueur actuel.

```yaml
items:
  profil:
    slot: 0
    player-head: "%player%"
    item:
      material: PLAYER_HEAD
      name: "&a&l%player%"
```

---

## Exigences

### view-requirement

Controler si le bouton est visible.

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

Si les exigences ne sont pas remplies, le bouton ne sera pas affiche.

---

### click-requirement

Controler si le bouton peut etre clique. Le bouton est toujours visible, mais le clic peut etre refuse.

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
        - type: message
          messages:
            - "&aAchat reussi !"
        - type: console-command
          commands:
            - "eco take %player% 100"
    item:
      material: GOLD_INGOT
      name: "&e&lAcheter - 100$"
```

### Types d'exigences

| Type | Description |
|------|-------------|
| `permission` | Verifier si le joueur a une permission |
| `placeholder` | Comparer une valeur de placeholder |
| `currency` | Verifier le solde du joueur |
| `item` | Verifier si le joueur a des items |
| `job` | Verifier le niveau Jobs Reborn |
| `luckperm` | Verifier le groupe LuckPerms |
| `regex` | Faire correspondre du texte a un pattern |
| `player-name` | Verifier le nom du joueur |

**Exigence de permission :**
```yaml
requirements:
  - type: permission
    permission: "server.admin"
```

**Exigence de placeholder :**
```yaml
requirements:
  - type: placeholder
    value: "%player_level%"
    compare: ">="
    number: 10
```

**Operateurs de comparaison :** `==`, `!=`, `>=`, `>`, `<=`, `<`, `equals_string`, `equalsIgnoreCase`

**Exigence de monnaie :**
```yaml
requirements:
  - type: currency
    amount: 1000
```

**Exigence d'item :**
```yaml
requirements:
  - type: item
    item:
      material: DIAMOND
      amount: 5
```

---

## Types de clics

Vous pouvez specifier differentes actions pour differents types de clics :

```yaml
items:
  multi-clic:
    slot: 0
    item:
      material: CHEST
      name: "&e&lBouton multi-actions"
      lore:
        - "&7Clic gauche : Ouvrir boutique"
        - "&7Clic droit : Voir solde"
        - "&7Shift-clic : Aide"
    clicks:
      LEFT:
        actions:
          - type: inventory
            inventory: "shop"
      RIGHT:
        actions:
          - type: message
            messages:
              - "&7Votre solde : &a$%vault_eco_balance%"
      SHIFT_LEFT:
        actions:
          - type: message
            messages:
              - "&eCeci est un bouton multi-actions !"
```

**Types de clics disponibles :**
- `LEFT` - Clic gauche
- `RIGHT` - Clic droit
- `SHIFT_LEFT` - Shift + clic gauche
- `SHIFT_RIGHT` - Shift + clic droit
- `MIDDLE` - Clic molette
- `DROP` - Appuyer sur Q pour lacher
- `CONTROL_DROP` - Ctrl + Q

---

## Exemple complet

```yaml
items:
  item-boutique:
    slot: 13
    type: NONE

    item:
      material: DIAMOND_SWORD
      name: "&6&lEpee en diamant"
      lore:
        - "&8&m─────────────────"
        - ""
        - "&7Une epee puissante !"
        - ""
        - "&7Prix : &a500$"
        - "&7Votre solde : &e$%vault_eco_balance%"
        - ""
        - "&8&m─────────────────"
        - ""
        - "&e▸ Cliquez pour acheter"
      enchantments:
        - type: SHARPNESS
          level: 5
      flags:
        - HIDE_ENCHANTS
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
        - type: console-command
          commands:
            - "eco take %player% 500"
            - "give %player% diamond_sword{Enchantments:[{id:sharpness,lvl:5}]} 1"
        - type: message
          messages:
            - "&aAchat reussi !"
            - "&7Vous avez achete une &6Epee en diamant&7 !"
        - type: sound
          sound: ENTITY_PLAYER_LEVELUP
        - type: close
```

## Bonnes pratiques

1. **Utilisez des noms de boutons significatifs** pour une maintenance plus facile
2. **Groupez les boutons lies** en utilisant des conventions de nommage descriptives
3. **Fournissez des retours** avec des sons et des messages
4. **Utilisez des exigences** pour controler l'acces de maniere appropriee
5. **Utilisez `else`** pour montrer les etats verrouilles/indisponibles
6. **Ajoutez des indices dans le lore** pour expliquer ce que font les boutons

## Prochaines etapes

- Apprenez chaque [Type de bouton](./types/none)
- Explorez toutes les [Actions](./actions) disponibles
- Creez des [Patterns](../patterns) pour des boutons reutilisables
