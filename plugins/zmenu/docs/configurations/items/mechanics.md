---
sidebar_position: 4
title: Item Mechanics
description: Give custom items behaviour with mechanics such as itemjoin and on-click
---

# Item Mechanics

[Custom items](./custom-items) defined in the `plugins/zMenu/items/` folder can be given **mechanics** — reusable behaviours attached to the item. Each item is identified by an id (its YAML key), which zMenu stores on the item so the mechanic can recognise it later.

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

## itemjoin

The `itemjoin` mechanic controls **when the item is granted** and **how it is protected** in the player's inventory. It is registered by default, so it works out of the box.

```yaml
server-guide:
  material: FILLED_MAP
  name: "&eServer Guide"
  lore:
    - "&7Everything you need to get started."
  mechanics:
    itemjoin:
      give-first-join: true
      fixed-slot: 8
      prevent-inventory-modification: true
```

### Options

| Option                           | Type    | Default | Description                                                                                                   |
|----------------------------------|---------|---------|---------------------------------------------------------------------------------------------------------------|
| `give-first-join`                | Boolean | `false` | Give the item automatically the **first time** a player ever joins the server.                                |
| `fixed-slot`                     | Integer | `-1`    | Force the item into this inventory slot when given, and lock it there. `-1` disables it; valid range is `0`–`36`. |
| `prevent-inventory-modification` | Boolean | `true`  | Prevent the item from being dropped, moved, dragged, swapped to the off-hand or placed in an item frame.       |

:::info
`prevent-inventory-modification` only takes effect when a `fixed-slot` is set — the protection is tied to the locked slot. Without a `fixed-slot`, the item can be moved freely even if this option is `true`.
:::

:::tip
Use `give-first-join` together with a `fixed-slot` to hand every new player a guide/menu item that stays pinned to their hotbar.
:::

## on-click

The `on-click` mechanic runs zMenu actions when the player left- or right-clicks while holding the item in their **main hand**.

:::note
`on-click` is **not registered by default** in the current build. It only works if an addon registers it through the API (`ItemManager#registerMechanicFactory`); otherwise an `on-click` block logs a "No MechanicFactory found" warning. The default built-in mechanic is [`itemjoin`](#itemjoin).
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

- Learn how items are defined and given in [Custom Items](./custom-items)
- Configure the item itself with [Item Configuration](./item)
- Learn about [Actions](../buttons/actions) you can run
- Set up [Requirements](../requirements) for conditional behaviour
