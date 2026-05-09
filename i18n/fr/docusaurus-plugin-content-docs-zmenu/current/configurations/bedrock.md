---
sidebar_position: 9
title: Formulaires Bedrock
description: Creer des formulaires natifs Bedrock Edition pour les joueurs connectes via Geyser/Floodgate
---

# Formulaires Bedrock

Les formulaires Bedrock vous permettent d'afficher des formulaires natifs Bedrock Edition aux joueurs connectes via Geyser/Floodgate. Au lieu de voir un inventaire classique a base de coffre, les joueurs Bedrock obtiennent une experience de formulaire native adaptee a leur plateforme.

:::warning Prerequis
Les formulaires Bedrock necessitent **Geyser** ou **Floodgate** installe sur votre serveur. zMenu utilise l'[API Floodgate](https://wiki.geysermc.org/floodgate/) pour detecter les joueurs Bedrock et envoyer les formulaires.
:::

## Emplacement des fichiers

Les formulaires Bedrock sont stockes dans le dossier `plugins/zMenu/bedrock/`. Chaque fichier YAML represente un formulaire.

```
plugins/zMenu/bedrock/
├── simple-form.yml
├── modal-form.yml
└── custom-form.yml
```

## Types de formulaires

zMenu supporte trois types de formulaires Bedrock :

| Type | Description |
|------|-------------|
| `simple` | Un formulaire avec un titre, un texte optionnel et une liste de boutons |
| `modal` | Un formulaire de confirmation avec un titre, un texte et exactement 2 boutons |
| `custom` | Un formulaire avec des champs de saisie (texte, toggle, liste deroulante, curseur, label) |

## Formulaire Simple

Un formulaire simple affiche une liste de boutons sur lesquels le joueur peut cliquer. Chaque bouton peut avoir une image optionnelle.

### Configuration

```yaml
type: simple
name: "Simple Form"

buttons:
  button1:
    type: "bedrock_button"
    text: "Bouton 1"
    click-requirement:
      1:
        success:
          - type: message
            messages:
              - "&aAction pour le bouton 1"
  button2:
    type: "bedrock_button"
    text: "Bouton 2"
    image-type: "URL"
    image-value: "https://github.com/GeyserMC.png?size=200"
    click-requirement:
      1:
        success:
          - type: message
            messages:
              - "&aAction pour le bouton 2"
  button3:
    type: "bedrock_button"
    text: "Bouton 3"
    image-type: "PATH"
    image-value: "textures/i/glyph_world_template.png"
    click-requirement:
      1:
        success:
          - type: message
            messages:
              - "&aAction pour le bouton 3"
```

### bedrock_button

| Option | Type | Requis | Description |
|--------|------|--------|-------------|
| `text` | String | Oui | Le texte du bouton affiche au joueur |
| `image-type` | String | Non | Type d'image : `URL` (image web) ou `PATH` (chemin de texture du resource pack) |
| `image-value` | String | Non | L'URL de l'image ou le chemin de la texture |
| `click-requirement` | Section | Non | Exigences et actions executees quand le bouton est clique |

Le placeholder `%content%` est disponible dans les actions de clic et contient le texte de contenu du formulaire.

---

## Formulaire Modal

Un formulaire modal est un simple dialogue de confirmation avec un titre, un contenu et exactement **2 boutons**.

### Configuration

```yaml
type: modal
name: "Modal Form"
content: "Bienvenue dans le contenu"

buttons:
  button1:
    type: "bedrock_modal_button"
    text: "Bouton 1"
    click-requirement:
      1:
        success:
          - type: message
            messages:
              - "Merci pour votre retour ! texte : %content%"
  button2:
    type: "bedrock_modal_button"
    text: "Bouton 2"
    click-requirement:
      1:
        success:
          - type: message
            messages:
              - "Nous sommes desoles ! Dites-nous comment nous ameliorer. %content%"
```

### bedrock_modal_button

| Option | Type | Requis | Description |
|--------|------|--------|-------------|
| `text` | String | Oui | Le texte du bouton |
| `click-requirement` | Section | Non | Exigences et actions executees au clic |

:::info
Un formulaire modal doit avoir exactement 2 boutons. S'il y en a moins de 2, le formulaire ne se chargera pas. S'il y en a plus de 2, seuls les deux premiers seront utilises.
:::

Le placeholder `%content%` est disponible dans les actions de clic et contient le texte de contenu du formulaire.

---

## Formulaire Custom

Un formulaire custom vous permet de creer un formulaire avec differents champs de saisie. Le joueur remplit le formulaire et le soumet. Les valeurs de chaque champ sont disponibles comme placeholders en utilisant le nom de cle du bouton (`%cle%`).

### Configuration

```yaml
type: custom
name: "Custom Form"

buttons:
  # Label texte (lecture seule)
  label:
    type: bedrock_label
    text: "J'adore les inventaires bedrock."
  # Saisie de texte
  text:
    type: bedrock_text
    text: "Partagez vos impressions sur notre serveur :"
    initial-value: "Ce serveur est genial parce que..."
  # Toggle (on/off)
  toggle:
    type: bedrock_toggle
    text: "Souhaitez-vous recevoir les mises a jour du serveur ?"
    initial-value: true
  # Selection deroulante
  dropdown:
    type: bedrock_dropdown
    text: "Choisissez votre mode"
    options:
      option1:
        id: "survival"
        display: "Mode Survie"
        initial: true
      option2:
        id: "creative"
        display: "Mode Creatif"
        initial: false
      option3:
        id: "adventure"
        display: "Mode Aventure"
        initial: false
      option4:
        id: "pvp"
        display: "Arene PvP"
        initial: false
  # Curseur
  slider:
    type: bedrock_slider
    text: "Combien d'heures jouez-vous par jour ?"
    start: 1
    end: 12
    step: 1
    initial-value: 3

actions:
  1:
    success:
      - type: message
        messages:
          - "Merci ! texte: %text%, toggle: %toggle%, dropdown: %dropdown%, slider: %slider%"
```

### Types de boutons de saisie

#### bedrock_label

Un label texte en lecture seule. Ne produit aucune valeur.

| Option | Type | Requis | Description |
|--------|------|--------|-------------|
| `text` | String | Oui | Le texte du label a afficher |

---

#### bedrock_text

Un champ de saisie de texte libre.

| Option | Type | Requis | Description |
|--------|------|--------|-------------|
| `text` | String | Oui | Le texte du label/placeholder |
| `initial-value` | String | Non | Texte pre-rempli par defaut |

---

#### bedrock_toggle

Un interrupteur on/off.

| Option | Type | Requis | Description |
|--------|------|--------|-------------|
| `text` | String | Oui | Le texte du toggle |
| `initial-value` | Boolean | Non | Etat par defaut (`true` ou `false`, defaut : `true`) |

---

#### bedrock_dropdown

Une liste de selection deroulante.

| Option | Type | Requis | Description |
|--------|------|--------|-------------|
| `text` | String | Oui | Le texte de la liste deroulante |
| `options` | Section | Oui | Liste des options |

Chaque option possede :

| Option | Type | Requis | Description |
|--------|------|--------|-------------|
| `id` | String | Non | La valeur retournee quand l'option est selectionnee (par defaut : nom de la cle) |
| `display` | String | Oui | Le texte affiche dans la liste deroulante |
| `initial` | Boolean | Non | Si cette option est selectionnee par defaut (une seule peut etre `true`) |

---

#### bedrock_slider

Un curseur numerique.

| Option | Type | Requis | Description |
|--------|------|--------|-------------|
| `text` | String | Oui | Le texte du curseur |
| `start` | Number | Non | Valeur minimum (defaut : `0`) |
| `end` | Number | Non | Valeur maximum (defaut : `100`) |
| `step` | Number | Non | Increment du pas (defaut : `1`) |
| `initial-value` | Number | Non | Valeur par defaut (par defaut : point median entre start et end) |

### Placeholders du formulaire custom

Dans un formulaire custom, chaque valeur de saisie est disponible comme placeholder en utilisant le nom de cle YAML du bouton. Par exemple, si vous avez un bouton avec la cle `text`, vous pouvez utiliser `%text%` dans la section actions.

### Actions du formulaire custom

Contrairement aux formulaires simple et modal ou chaque bouton a son propre `click-requirement`, les formulaires custom utilisent une section `actions` partagee au niveau racine. Ces actions sont executees quand le joueur soumet le formulaire, avec toutes les valeurs de saisie disponibles comme placeholders.

---

## Options communes

Ces options sont disponibles pour tous les types de formulaires Bedrock.

### name

Le titre affiche en haut du formulaire. Supporte les codes couleur et les placeholders PlaceholderAPI.

```yaml
name: "&6&lTitre de mon formulaire"
```

---

### content

Le texte de contenu affiche dans le corps du formulaire (utilise par les types `simple` et `modal`).

```yaml
content: "Bienvenue ! Veuillez faire votre choix."
```

---

### open-requirement

Exigences qui doivent etre remplies avant que le formulaire puisse etre ouvert. Si les exigences ne sont pas remplies, le formulaire ne s'ouvrira pas.

```yaml
open-requirement:
  requirements:
    - type: permission
      permission: "server.vip"
      deny:
        - type: message
          messages:
            - "&cVous avez besoin du rang VIP pour acceder a ce formulaire !"
```

---

### open-actions

Actions executees a l'ouverture du formulaire.

```yaml
open-actions:
  - type: message
    messages:
      - "&aOuverture du formulaire..."
```

---

### close-actions

Actions executees a la fermeture du formulaire (que ce soit par soumission ou fermeture sans soumission).

```yaml
close-actions:
  - type: message
    messages:
      - "&7Formulaire ferme."
```

---

### target-player-name-placeholder

Definir un placeholder personnalise pour le nom du joueur cible, utile lors de l'ouverture du formulaire pour un autre joueur.

```yaml
target-player-name-placeholder: "%player_name%"
```

---

### view-requirement

Les boutons dans les formulaires simple et modal supportent le `view-requirement` pour afficher ou masquer conditionnellement les boutons selon des conditions, similaire aux boutons d'inventaire classiques.

---

## Remplacement d'inventaire

Vous pouvez automatiquement rediriger les joueurs Bedrock vers un formulaire Bedrock lorsqu'ils tentent d'ouvrir un inventaire classique. Cela se configure cote **inventaire classique** avec l'option `inventory-replacement`.

```yaml
# Dans votre fichier d'inventaire classique (ex : inventories/shop.yml)
name: "&6Boutique"
size: 54

inventory-replacement:
  name: "shop-form"       # Nom du fichier de formulaire Bedrock (sans .yml)
  plugin: "zMenu"         # Plugin proprietaire du formulaire Bedrock (defaut : zMenu)
  pages:                  # Optionnel : rediriger uniquement sur des pages specifiques
    - 1

items:
  # ... boutons d'inventaire classique pour les joueurs Java
```

Quand un joueur Bedrock ouvre cet inventaire, il sera automatiquement redirige vers le formulaire Bedrock specifie. Les joueurs Java verront l'inventaire classique normalement.

| Option | Type | Requis | Description |
|--------|------|--------|-------------|
| `name` | String | Oui | Le nom du fichier de formulaire Bedrock (sans `.yml`) |
| `plugin` | String | Non | Le plugin proprietaire du formulaire (defaut : `zMenu`) |
| `pages` | Liste d'entiers | Non | Rediriger uniquement sur ces pages (vide = toutes les pages) |

---

## Commandes

| Commande | Permission | Description |
|----------|------------|-------------|
| `/zm bedrock open <nom> [joueur] [afficher message]` | `zmenu.open.bedrock` | Ouvrir un formulaire Bedrock |
| `/zm bedrock reload` | `zmenu.reload.bedrock` | Recharger tous les fichiers de formulaires Bedrock |

L'argument `<nom>` accepte le format `nomPlugin:nomFormulaire` ou simplement `nomFormulaire`.

**Exemples :**
```
/zm bedrock open simple-form
/zm bedrock open zMenu:custom-form
/zm bedrock open modal-form Notch
/zm bedrock open simple-form Notch false
```

:::info
Les formulaires Bedrock ne peuvent etre ouverts que pour les joueurs Bedrock (connectes via Geyser/Floodgate). Tenter d'ouvrir un formulaire pour un joueur Java affichera un message d'erreur.
:::

---

## Action Bedrock

Vous pouvez ouvrir un formulaire Bedrock depuis une action de bouton en utilisant le type d'action `bedrock` :

```yaml
actions:
  - type: bedrock
    bedrock: "simple-form"
```

**Avec un plugin externe :**
```yaml
actions:
  - type: bedrock
    bedrock: "custom-form"
    plugin: "MonPlugin"
```

**Avec des arguments :**
```yaml
actions:
  - type: bedrock
    bedrock: "feedback"
    arguments:
      - "arg1"
      - "arg2"
```

| Option | Type | Description |
|--------|------|-------------|
| `bedrock` | String | Nom du fichier de formulaire Bedrock (sans `.yml`) |
| `plugin` | String | Nom du plugin si utilisation d'un formulaire externe |
| `arguments` | Liste | Arguments a passer |

---

## Prochaines etapes

- Decouvrez les [Dialogues](./dialogues) pour les popups interactives specifiques a Paper
- Configurez les [Actions](./buttons/actions) pour vos boutons
- Mettez en place les [Exigences](./requirements) pour la logique conditionnelle
