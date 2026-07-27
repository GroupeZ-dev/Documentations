---
sidebar_position: 4
title: Mecaniques d'Item
description: Donnez un comportement aux items personnalises avec des mecaniques comme itemjoin et on-click
---

# Mecaniques d'Item

Les [items personnalises](./custom-items) definis dans le dossier `plugins/zMenu/items/` peuvent recevoir des **mecaniques** — des comportements reutilisables attaches a l'item. Chaque item est identifie par un id (sa cle YAML), que zMenu stocke sur l'item afin que la mecanique puisse le reconnaitre plus tard.

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

## itemjoin

La mecanique `itemjoin` controle **quand l'item est donne** et **comment il est protege** dans l'inventaire du joueur. Elle est enregistree par defaut, donc elle fonctionne immediatement.

```yaml
server-guide:
  material: FILLED_MAP
  name: "&eServer Guide"
  lore:
    - "&7Tout ce qu'il faut pour bien commencer."
  mechanics:
    itemjoin:
      give-first-join: true
      fixed-slot: 8
      prevent-inventory-modification: true
```

### Options

| Option                           | Type    | Defaut  | Description                                                                                                    |
|----------------------------------|---------|---------|----------------------------------------------------------------------------------------------------------------|
| `give-first-join`                | Boolean | `false` | Donne l'item automatiquement la **premiere fois** qu'un joueur se connecte au serveur.                          |
| `fixed-slot`                     | Integer | `-1`    | Force l'item dans ce slot d'inventaire lorsqu'il est donne, et l'y verrouille. `-1` le desactive ; plage valide `0`–`36`. |
| `prevent-inventory-modification` | Boolean | `true`  | Empeche l'item d'etre jete, deplace, glisse, echange en main secondaire ou place dans un cadre d'item.          |

:::info
`prevent-inventory-modification` ne prend effet que lorsqu'un `fixed-slot` est defini — la protection est liee au slot verrouille. Sans `fixed-slot`, l'item peut etre deplace librement meme si cette option est `true`.
:::

:::tip
Utilisez `give-first-join` avec un `fixed-slot` pour donner a chaque nouveau joueur un item guide/menu qui reste epingle a sa barre d'action.
:::

## on-click

La mecanique `on-click` execute des actions zMenu lorsque le joueur fait un clic gauche ou droit en tenant l'item dans sa **main principale**.

:::note
`on-click` n'est **pas enregistree par defaut** dans la version actuelle. Elle ne fonctionne que si un addon l'enregistre via l'API (`ItemManager#registerMechanicFactory`) ; sinon un bloc `on-click` genere un avertissement "No MechanicFactory found". La mecanique integree par defaut est [`itemjoin`](#itemjoin).
:::

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

- Decouvrez comment les items sont definis et donnes dans [Items personnalises](./custom-items)
- Configurez l'item lui-meme avec [Configuration d'item](./item)
- Decouvrez les [Actions](../buttons/actions) que vous pouvez executer
- Mettez en place des [Conditions](../requirements) pour un comportement conditionnel
