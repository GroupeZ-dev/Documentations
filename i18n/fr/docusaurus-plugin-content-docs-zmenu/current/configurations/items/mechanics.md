---
sidebar_position: 3
title: Mecaniques d'Item
description: Donnez un comportement aux items personnalises avec des mecaniques comme on-click
---

# Mecaniques d'Item

Les items personnalises definis dans le dossier `plugins/zMenu/items/` peuvent recevoir des **mecaniques** — des comportements reutilisables qui s'executent lorsqu'un joueur interagit avec l'item. Chaque item est identifie par un id (sa cle YAML), que zMenu stocke sur l'item afin que la mecanique puisse le reconnaitre plus tard.

## Structure du fichier d'item

```yaml
# plugins/zMenu/items/default-items.yml
<item-id>:
  name: "&aMy Item"          # standard zMenu item format (see Item Configuration)
  lore:
    - "&7A special item"
  mechanics:
    <mechanic-id>:
      # options depend on the mechanic
```

## on-click

La mecanique `on-click` execute des actions zMenu lorsque le joueur fait un clic gauche ou droit en tenant l'item dans sa **main principale**.

```yaml
magic-wand:
  name: "&dMagic Wand"
  material: BLAZE_ROD
  mechanics:
    on-click:
      cooldown: 3
      cancel-event: true
      click-target: both
      click-types:
        - RIGHT
        - SHIFT_RIGHT
      click-requirements:
        1:
          requirements:
            - type: permission
              permission: "server.wand"
              deny:
                - type: message
                  messages:
                    - "&cYou can't use this wand."
      actions:
        - type: message
          messages:
            - "&dPoof! ✨"
        - type: player-command
          commands:
            - "spawn"
```

### Options

| Option               | Type    | Defaut   | Description                                                                                          |
|----------------------|---------|----------|-----------------------------------------------------------------------------------------------------|
| `cooldown`           | Integer | `0`      | Secondes entre chaque activation, par joueur (`0` = aucun temps de recharge)                        |
| `cancel-event`       | Boolean | `false`  | Annule l'interaction (par ex. pour empecher le placement de bloc / l'utilisation de l'item)         |
| `click-target`       | String  | `both`   | Ou le clic doit se produire : `air`, `block`, ou `both`                                              |
| `click-types`        | List    | —        | Quels clics le declenchent : `LEFT`, `RIGHT`, `SHIFT_LEFT`, `SHIFT_RIGHT` (l'accroupissement utilise les variantes SHIFT) |
| `click-requirements` | Section | —        | [Conditions](../requirements) standards de zMenu verifiees lors du clic                             |
| `actions`            | List    | —        | [Actions](../buttons/actions) standards de zMenu executees lors du clic                             |

:::info
`on-click` se declenche depuis un `PlayerInteractEvent` sur l'item de la main principale. Comme aucun inventaire n'est ouvert, les placeholders specifiques aux inventaires ne sont pas disponibles dans les conditions/actions.
:::

## Prochaines etapes

- Configurez l'item lui-meme avec [Configuration d'item](./item)
- Decouvrez les [Actions](../buttons/actions) que vous pouvez executer
- Mettez en place des [Conditions](../requirements) pour un comportement conditionnel
