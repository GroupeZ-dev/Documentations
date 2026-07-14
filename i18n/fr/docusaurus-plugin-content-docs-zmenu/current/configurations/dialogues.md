---
sidebar_position: 8
title: Dialogues
description: Creer des popups de dialogue interactives avec des formulaires, des confirmations et des boutons multi-actions
---

# Dialogues

Les dialogues sont des fenetres popup interactives qui apparaissent a l'ecran, permettant aux joueurs d'interagir avec des formulaires, des confirmations et des boutons d'action. Ils offrent une experience d'interface moderne allant au-dela des menus d'inventaire traditionnels.

:::warning Prerequis
Les dialogues necessitent **Paper 1.21.7+**.
:::

## Emplacement des fichiers

Les dialogues sont stockes dans le dossier `plugins/zMenu/dialogs/`. Chaque fichier YAML represente un dialogue.

```
plugins/zMenu/dialogs/
├── welcome.yml
├── confirmation.yml
├── server-links.yml
└── feedback-form.yml
```

## Types de dialogues

zMenu supporte quatre types de dialogues :

| Type | Description |
|------|-------------|
| `notice` | Dialogue informatif simple avec un corps et des saisies optionnelles |
| `confirmation` | Dialogue de confirmation Oui/Non |
| `multi_action` | Plusieurs boutons d'action disposes en grille |
| `server_links` | Affiche les liens du serveur sous forme de boutons cliquables |

## Structure de base

```yaml
name: "&6&lDialog Title"
external_title: "Window Title"
type: notice

can-close-with-escape: true
pause: false
after_action: CLOSE

body:
  # Sections du contenu du corps...

inputs:
  # Champs de saisie...
```

## Options de configuration

### name

Le nom interne du dialogue, affiche avec la mise en forme des couleurs.

```yaml
name: "&6&lWelcome Dialog"
```

### external_title

Le titre de la fenetre affiche dans l'en-tete du dialogue.

```yaml
external_title: "Server Information"
```

### type

Le type de dialogue. Voir [Types de dialogues](#types-de-dialogues) pour plus de details.

```yaml
type: notice
```

### can-close-with-escape

Permet aux joueurs de fermer le dialogue en appuyant sur Echap.

```yaml
can-close-with-escape: true
```

### pause

Met le jeu en pause pendant que le dialogue est ouvert (comportement de type solo).

```yaml
pause: false
```

### after_action

Ce qui se passe apres qu'une action est effectuee.

| Valeur | Description |
|-------|-------------|
| `CLOSE` | Ferme le dialogue |
| `PAUSE` | Garde le dialogue ouvert |
| `NONE` | Ne fait rien |

```yaml
after_action: CLOSE
```

---

## Contenu du corps

La section `body` definit le contenu qui apparait dans le dialogue. Vous pouvez combiner plusieurs types de contenu.

### plain_message

Affiche des messages texte.

```yaml
body:
  welcome:
    type: plain_message
    messages:
      - "&6&lWelcome to our server!"
      - ""
      - "&7Server IP: &fplay.example.com"
      - "&7Discord: &fdiscord.gg/example"
    width: 400
```

### item

Affiche un item avec une infobulle optionnelle.

```yaml
body:
  featured-item:
    type: item
    item:
      material: DIAMOND_SWORD
      name: "&b&lLegendary Sword"
      lore:
        - "&7A powerful weapon"
    show-decoration: true
    show-tooltip: true
    width: 200
    height: 150
```

---

## Champs de saisie

Les dialogues peuvent inclure des champs de saisie interactifs dans la section `inputs`.

### dialog_text

Un champ de saisie de texte.

```yaml
inputs:
  feedback:
    type: dialog_text
    label: "&6Share your thoughts:"
    width: 400
    max-length: 200
    multiline:
      max-lines: 4
```

**Options :**

| Option | Type | Description |
|--------|------|-------------|
| `label` | String | Label affiche au-dessus de la saisie |
| `width` | Integer | Largeur du champ de saisie |
| `max-length` | Integer | Nombre maximum de caracteres |
| `multiline.max-lines` | Integer | Nombre de lignes pour la saisie multiligne |

### dialog_boolean

Un interrupteur Oui/Non.

```yaml
inputs:
  subscribe:
    type: dialog_boolean
    label: "&eWould you like updates?"
    text-true: "&a&lYES"
    text-false: "&c&lNo"
```

### dialog_single_option

Une selection unique parmi plusieurs options.

```yaml
inputs:
  gamemode:
    type: dialog_single_option
    label: "&6Select your gamemode:"
    options:
      survival:
        id: "survival"
        display: "&2Survival"
      creative:
        id: "creative"
        display: "&bCreative"
      adventure:
        id: "adventure"
        display: "&6Adventure"
```

### dialog_number_range

Un curseur numerique.

```yaml
inputs:
  amount:
    type: dialog_number_range
    label: "&eSelect amount:"
    start: 1
    end: 64
    step: 1
```

---

## Boutons dynamiques

Les boutons dynamiques generent plusieurs sections de corps ou saisies a partir d'un seul modele, repete sur une plage numerique. Ils sont utiles lorsque le nombre d'elements depend de donnees (un placeholder) ou lorsque vous devriez autrement copier/coller le meme bloc de nombreuses fois.

Les deux types dynamiques partagent ces options :

| Option  | Type    | Description                                   |
|---------|---------|-----------------------------------------------|
| `start` | Integer | Premier index, inclus. Compatible placeholders. |
| `end`   | Integer | Dernier index, inclus. Compatible placeholders.  |

A l'interieur du modele repete, le placeholder `%index%` est remplace par le numero de l'iteration en cours.

### dialog-dynamic-body-button

Place dans la section `body:`. Repete un element `body:` (par ex. `dialog_plain_message`, `dialog_item`).

```yaml
body:
  dynamic_message:
    type: dialog-dynamic-body-button
    start: 1
    end: 5
    body:
      type: dialog_plain_message
      messages:
        - "&eThis is body section #%index%"
      width: 300
```

### dialog-dynamic-input-button

Place dans la section `inputs:`. Repete un element `input:` (par ex. `dialog_text`, `dialog_boolean`). Chaque saisie generee a pour cle `<button-name>_<index>`, de sorte que sa valeur soumise est disponible via le placeholder `%<button-name>_<index>%`.

```yaml
inputs:
  # Si le joueur tape "Hello" dans le premier champ, %my_input_1% vaudra "Hello"
  my_input:
    type: dialog-dynamic-input-button
    start: 1
    end: 3
    input:
      type: dialog_text
      label: "&6Enter value #%index%:"
      width: 300
      max-length: 50
```

Consultez le fichier `dialogs/dynamic-dialog-example.yml` fourni pour un exemple complet.

---

## Dialogue Notice

Un dialogue informatif simple avec des saisies optionnelles.

```yaml
name: "&6&lServer Rules"
external_title: "Rules"
type: notice

can-close-with-escape: true
after_action: CLOSE

body:
  rules:
    type: plain_message
    messages:
      - "&c&lServer Rules"
      - ""
      - "&71. Be respectful to all players"
      - "&72. No cheating or exploits"
      - "&73. Follow staff instructions"
      - "&74. Have fun!"
    width: 350

inputs:
  accept:
    type: dialog_boolean
    label: "&eI agree to the rules"
    text-true: "&a&lAccept"
    text-false: "&c&lDecline"
```

---

## Dialogue Confirmation

Un dialogue avec des boutons Oui et Non.

```yaml
name: "&c&lConfirm Purchase"
external_title: "Confirmation"
type: confirmation

can-close-with-escape: true
after_action: CLOSE

body:
  message:
    type: plain_message
    messages:
      - "&7Are you sure you want to purchase"
      - "&6Diamond Sword &7for &a$500&7?"
    width: 300

confirmation:
  yes-text: "&a&lConfirm Purchase"
  yes-tooltip: "Click to confirm"
  yes-width: 200
  no-text: "&c&lCancel"
  no-tooltip: "Click to cancel"
  no-width: 200

yes-actions:
  1:
    success:
      - type: console-command
        commands:
          - "give %player% diamond_sword 1"
      - type: currency-withdraw
        amount: 500
      - type: message
        messages:
          - "&aPurchase successful!"

no-actions:
  1:
    success:
      - type: message
        messages:
          - "&7Purchase cancelled."
```

### Options de confirmation

| Option | Description |
|--------|-------------|
| `yes-text` | Texte du bouton Oui |
| `yes-tooltip` | Infobulle au survol du bouton Oui |
| `yes-width` | Largeur du bouton Oui |
| `no-text` | Texte du bouton Non |
| `no-tooltip` | Infobulle au survol du bouton Non |
| `no-width` | Largeur du bouton Non |

---

## Dialogue Multi-Action

Un dialogue avec plusieurs boutons d'action disposes en grille.

```yaml
name: "&6&lTeleport Menu"
external_title: "Teleport"
type: multi_action

can-close-with-escape: true
after_action: CLOSE
number-of-columns: 2

body:
  header:
    type: plain_message
    messages:
      - "&7Select a destination:"
    width: 300

multi-actions:
  spawn:
    text: "&a&lSpawn"
    tooltip: "&7Teleport to spawn"
    width: 150
    actions:
      1:
        success:
          - type: close
          - type: player-command
            commands:
              - "spawn"
          - type: message
            messages:
              - "&aTeleporting to spawn..."

  shop:
    text: "&e&lShop"
    tooltip: "&7Visit the shop"
    width: 150
    actions:
      1:
        success:
          - type: close
          - type: player-command
            commands:
              - "warp shop"

  pvp:
    text: "&c&lPvP Arena"
    tooltip: "&7Enter the PvP arena"
    width: 150
    actions:
      1:
        success:
          - type: close
          - type: player-command
            commands:
              - "warp pvp"

  home:
    text: "&b&lHome"
    tooltip: "&7Teleport home"
    width: 150
    actions:
      1:
        success:
          - type: close
          - type: player-command
            commands:
              - "home"
```

### Options Multi-Action

| Option | Description |
|--------|-------------|
| `number-of-columns` | Nombre de boutons par ligne |
| `multi-actions` | Map des boutons d'action |
| `text` | Texte du bouton |
| `tooltip` | Infobulle du bouton |
| `width` | Largeur du bouton |
| `actions` | Actions executees au clic |

---

## Dialogue Server Links

Affiche les liens du serveur sous forme de boutons cliquables.

```yaml
name: "&6&lServer Links"
external_title: "Links"
type: server_links

can-close-with-escape: true
after_action: CLOSE

server-links:
  text: "&6&lUseful Links"
  tooltip: "&7Click to open"
  width: 300
  number-of-columns: 2
  actions:
    1:
      success:
        - type: message
          messages:
            - "&aLink opened!"
```

---

## Options des boutons d'action

Les boutons d'action — les boutons Oui/Non d'une `confirmation`, un bouton de `notice`, chaque entree d'un `multi_action`, et le bouton de sortie de `server_links` — partagent un ensemble commun d'options.

### type

Le type d'action effectuee lorsque le bouton est clique.

| Valeur          | Description                                                                   |
|----------------|-------------------------------------------------------------------------------|
| `custom-click` | *(par defaut)* Execute les `actions:` zMenu definies sur le bouton.           |
| `static`       | Execute une action native du client (voir `static-type` ci-dessous), sans aller-retour serveur. |

### static-type

Utilise uniquement lorsque `type: static`. L'action native du client a effectuer.

| `static-type`       | Champ requis | Description                          |
|---------------------|----------------|--------------------------------------|
| `OPEN_URL`          | `url`          | Ouvre une URL dans le navigateur du joueur |
| `OPEN_FILE`         | `file`         | Ouvre un fichier local               |
| `RUN_COMMAND`       | `command`      | Execute une commande en tant que joueur |
| `SUGGEST_COMMAND`   | `command`      | Pre-remplit la zone de chat avec une commande |
| `COPY_TO_CLIPBOARD` | `text`         | Copie du texte dans le presse-papiers |

```yaml
multi-actions:
  website:
    text: "&bOur Website"
    type: static
    static-type: OPEN_URL
    url: "https://example.com"
```

### usage-limit

Nombre maximum de fois que le bouton peut etre active (par defaut : illimite).

```yaml
usage-limit: 1
```

### duration-limit

Un temps de recharge entre les activations. Soit un simple nombre (secondes), soit une section avec une unite de temps :

```yaml
duration-limit: 5          # 5 secondes
```

```yaml
duration-limit:
  value: 2
  type: MINUTES            # SECONDS, MILLISECONDS, MINUTES, HOURS, ...
```

### enable-placeholders

Active l'interpretation des placeholders pour le bouton. Accepte un booleen, ou une section pour l'activer par cle.

:::info Compatibilite ascendante
La forme imbriquee (`<key>.label`, `<key>.tooltip`, `<key>.width`, `<key>.actions`, `<key>.type`) est la nouvelle disposition canonique, mais les anciennes cles plates (`yes-text`, `notice.text`, `multi-actions.<key>.text`, ...) fonctionnent toujours, de sorte que les fichiers de dialogue existants n'ont pas besoin d'etre reecrits.
:::

---

## Ouvrir des dialogues

### Depuis les actions de bouton

Utilisez le type d'action `dialog` dans les boutons d'inventaire :

```yaml
items:
  open-dialog:
    slot: 13
    item:
      material: BOOK
      name: "&6Open Dialog"
    actions:
      - type: dialog
        dialog: "welcome"
```

### Avec des arguments

Passez des arguments au dialogue :

```yaml
actions:
  - type: dialog
    dialog: "confirmation"
    arguments:
      - "diamond_sword"
      - "500"
```

### Depuis un plugin externe

Ouvrez un dialogue depuis un autre plugin :

```yaml
actions:
  - type: dialog
    dialog: "my-dialog"
    plugin: "MyPlugin"
```

---

## Exemples complets

### Formulaire de retour

```yaml
name: "&6&lFeedback Form"
external_title: "Share Your Feedback"
type: notice

can-close-with-escape: true
after_action: CLOSE

body:
  header:
    type: plain_message
    messages:
      - "&6&lWe Value Your Feedback!"
      - ""
      - "&7Please share your thoughts about the server."
    width: 400

inputs:
  rating:
    type: dialog_single_option
    label: "&eHow would you rate your experience?"
    options:
      excellent:
        id: "5"
        display: "&a⭐⭐⭐⭐⭐ Excellent"
      good:
        id: "4"
        display: "&e⭐⭐⭐⭐ Good"
      average:
        id: "3"
        display: "&6⭐⭐⭐ Average"
      poor:
        id: "2"
        display: "&c⭐⭐ Poor"

  comments:
    type: dialog_text
    label: "&7Additional comments:"
    width: 400
    max-length: 500
    multiline:
      max-lines: 5

  subscribe:
    type: dialog_boolean
    label: "&eReceive updates about new features?"
    text-true: "&aYes, keep me updated!"
    text-false: "&7No thanks"
```

### Selection de kit

```yaml
name: "&6&lSelect Your Kit"
external_title: "Kit Selection"
type: multi_action

can-close-with-escape: false
after_action: CLOSE
number-of-columns: 3

body:
  info:
    type: plain_message
    messages:
      - "&7Choose your starting kit wisely!"
      - "&7This cannot be changed later."
    width: 400

multi-actions:
  warrior:
    text: "&c&lWarrior"
    tooltip: "&7Iron armor and sword"
    width: 120
    actions:
      1:
        success:
          - type: console-command
            commands:
              - "kit warrior %player%"
          - type: message
            messages:
              - "&aYou selected the Warrior kit!"

  archer:
    text: "&a&lArcher"
    tooltip: "&7Leather armor and bow"
    width: 120
    actions:
      1:
        success:
          - type: console-command
            commands:
              - "kit archer %player%"
          - type: message
            messages:
              - "&aYou selected the Archer kit!"

  mage:
    text: "&5&lMage"
    tooltip: "&7Robes and magic items"
    width: 120
    actions:
      1:
        success:
          - type: console-command
            commands:
              - "kit mage %player%"
          - type: message
            messages:
              - "&aYou selected the Mage kit!"
```

---

## Bonnes pratiques

1. **Gardez les dialogues cibles** - Un seul objectif par dialogue
2. **Utilisez des labels clairs** - Rendez les saisies faciles a comprendre
3. **Fournissez des infobulles** - Aidez les joueurs a comprendre les actions des boutons
4. **Testez sur la version cible** - Assurez-vous que Paper 1.21.4+ et PacketEvents sont installes
5. **Gerez tous les cas** - Definissez des actions pour tous les choix possibles
6. **Utilisez les types appropries** - Choisissez le bon type de dialogue pour votre cas d'usage

## Prochaines etapes

- Decouvrez les [Actions](./buttons/actions) pour les comportements des boutons de dialogue
- Configurez les [Exigences](./buttons/button#requirements) pour l'acces conditionnel aux dialogues
- Consultez les [Inventaires](./inventories/inventory) pour les alternatives de menu traditionnelles
