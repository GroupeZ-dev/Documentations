---
sidebar_position: 3
title: Item Mechanics
description: Give custom items behaviour with mechanics such as on-click
---

# Item Mechanics

Custom items defined in the `plugins/zMenu/items/` folder can be given **mechanics** — reusable behaviours that run when a player interacts with the item. Each item is identified by an id (its YAML key), which zMenu stores on the item so the mechanic can recognise it later.

## Item File Structure

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

The `on-click` mechanic runs zMenu actions when the player left- or right-clicks while holding the item in their **main hand**.

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

| Option               | Type    | Default  | Description                                                                                          |
|----------------------|---------|----------|-----------------------------------------------------------------------------------------------------|
| `cooldown`           | Integer | `0`      | Seconds between activations, per player (`0` = no cooldown)                                          |
| `cancel-event`       | Boolean | `false`  | Cancel the interaction (e.g. to stop block placement / item use)                                    |
| `click-target`       | String  | `both`   | Where the click must happen: `air`, `block`, or `both`                                               |
| `click-types`        | List    | —        | Which clicks trigger it: `LEFT`, `RIGHT`, `SHIFT_LEFT`, `SHIFT_RIGHT` (sneaking uses the SHIFT variants) |
| `click-requirements` | Section | —        | Standard zMenu [requirements](../requirements) checked on click                                     |
| `actions`            | List    | —        | Standard zMenu [actions](../buttons/actions) run on click                                            |

:::info
`on-click` fires from a `PlayerInteractEvent` on the main-hand item. Because no inventory is open, inventory-specific placeholders are not available inside the requirements/actions.
:::

## Next Steps

- Configure the item itself with [Item Configuration](./item)
- Learn about [Actions](../buttons/actions) you can run
- Set up [Requirements](../requirements) for conditional behaviour
