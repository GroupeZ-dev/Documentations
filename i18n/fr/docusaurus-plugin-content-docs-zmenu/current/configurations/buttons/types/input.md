---
sidebar_position: 12
title: Bouton INPUT
description: Capturez la saisie de texte du joueur via le chat
---

# Type de bouton INPUT

:::warning zMenu+ requis
Ce type de bouton necessite [zMenu+](../../../zmenu-plus) pour fonctionner.
:::

Le type de bouton `INPUT` vous permet de capturer la saisie de texte des joueurs. Lorsqu'il est clique, il ferme l'inventaire et invite le joueur a ecrire dans le chat. La saisie peut ensuite etre utilisee dans des actions ou stockee pour une utilisation ulterieure.

## Utilisation

```yaml
items:
  input-button:
    type: INPUT
    slot: 13
    inputType: TEXT
    conditions:
      regex: "^[a-zA-Z0-9]*$"
    success-actions:
      - type: message
        messages: ["&aSaisie valide : %input%"]
    error-actions:
      - type: message
        messages: ["&aSaisie invalide ! Seuls les caracteres alphanumeriques sont autorises."]
    item:
      material: NAME_TAG
      name: "&a&lEntrez du texte"
```

## Configuration

| Propriete | Description | Requis |
|-----------|-------------|--------|
| `type` | Doit etre `INPUT` | Oui |
| `inputType` | Type de saisie (`TEXT`, `NUMBER`, `LONG`, `DECIMAL`) | Non (Defaut : `TEXT`) |
| `conditions.regex` | Regex pour valider la saisie | Non |
| `conditions.min` | Valeur/longueur minimum | Non (Defaut : 0) |
| `conditions.max` | Valeur/longueur maximum | Non (Defaut : 0) |
| `success-actions` | Actions a executer sur une saisie valide | Non |
| `error-actions` | Actions a executer sur une saisie invalide | Non |
| `item` | Apparence visuelle | Oui |

## Exemple

### Changeur de pseudonyme

```yaml
size: 27
name: "&8Changer de pseudo"

items:
  change-nick:
    type: INPUT
    slot: 13
    inputType: TEXT
    conditions:
      min: 3
      max: 16
      regex: "^[a-zA-Z0-9_]*$"
    success-actions:
      - type: console-command
        commands:
          - "nick %player% %input%"
      - type: message
        messages:
          - "&aVotre pseudonyme a ete change en &e%input%"
    error-actions:
      - type: message
        messages:
          - "&cPseudo invalide ! Doit contenir entre 3 et 16 caracteres alphanumeriques."
    item:
      material: NAME_TAG
      name: "&a&lChanger de pseudo"
      lore:
        - "&7Cliquez pour changer votre nom d'affichage"

  back:
    type: BACK
    slot: 22
    item:
      material: ARROW
      name: "&c&lRetour"
```

### Saisie de montant

```yaml
items:
  set-amount:
    type: INPUT
    slot: 13
    inputType: NUMBER
    conditions:
      min: 1
      max: 64
    success-actions:
      - type: data
        key: "amount"
        value: "%input%"
      - type: message
        messages: ["&aMontant defini a %input%"]
      - type: refresh
    error-actions:
      - type: message
        messages: ["&cVeuillez entrer un nombre entre 1 et 64"]
    item:
      material: HOPPER
      name: "&6&lDefinir le montant"
      lore:
        - "&7Actuel : &e%amount%"
        - "&7Cliquez pour changer"
```

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%input%` | Le texte saisi par le joueur |

## Notes

- L'inventaire se fermera lorsque le joueur devra ecrire
- Validez la saisie en utilisant `conditions` avec regex, min ou max
- Utilisez `%input%` dans vos actions pour acceder au texte du joueur

## Prochaines etapes

- Decouvrez les [Actions](../actions) pour gerer la saisie
- Voir [NONE](./none) pour les boutons standards
