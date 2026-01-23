---
sidebar_position: 10
title: Custom Commands
description: Create custom commands to open your inventories
---

# Custom Commands

zMenu allows you to create custom commands that open your inventories. Instead of using `/zm open shop`, players can simply type `/shop`.

## Configuration File

Custom commands are defined in `plugins/zMenu/commands/commands.yml`.

## Basic Structure

```yaml
commands:
  shop:
    command: /shop
    inventory: shop_menu
```

This creates the `/shop` command that opens the `shop_menu` inventory.

## Configuration Options

### Summary Table

| Key | Type | Required | Description |
|-----|------|----------|-------------|
| `command` | String | Yes | Main command players will type |
| `inventory` | String | Yes | Name of the inventory to open |
| `permission` | String | No | Permission required to use the command |
| `deny-message` | String | No | Message shown when user lacks permission |
| `aliases` | List | No | Alternative command names |
| `arguments` | List | No | Command arguments with validation |
| `actions` | List | No | Actions executed when command runs |

---

### command

**Required.** The command players will type.

```yaml
command: /shop
```

---

### inventory

**Required.** The inventory to open when the command is used. You can optionally prefix with the plugin name.

```yaml
inventory: "shop"  # Opens inventories/shop.yml

# Or with plugin prefix
inventory: "MyPlugin:shop"  # Opens shop inventory from MyPlugin
```

---

### permission

Optional permission required to use the command.

```yaml
permission: "myserver.shop"
```

---

### deny-message

Custom message displayed when a player doesn't have the required permission.

```yaml
deny-message: "&cYou don't have access to the shop!"
```

---

### aliases

Alternative command names.

```yaml
aliases:
  - store
  - market
  - buy
```

This allows `/store`, `/market`, and `/buy` to work the same as `/shop`.

---

### actions

Actions to execute when the command is used (before opening the inventory).

```yaml
actions:
  - type: message
    messages:
      - "&aOpening the shop..."
  - type: sound
    sound: BLOCK_CHEST_OPEN
```

---

### arguments

Define command arguments with validation and auto-completion.

```yaml
arguments:
  - name: "category"
    isRequired: false
    auto-completion:
      - "weapons"
      - "armor"
      - "tools"
```

#### Argument Options

| Key | Type | Description |
|-----|------|-------------|
| `name` | String | **Required.** Identifier for the argument |
| `type` | String | Validator type for the argument (see below) |
| `isRequired` | Boolean | Whether the argument must be provided (default: `false`) |
| `performMainAction` | Boolean | Whether to execute main command actions when this argument is used (default: `true`) |
| `auto-completion` | List | Suggested values for tab-completion |
| `actions` | List | Actions to execute specific to this argument |

#### Argument Type Validators

| Type | Description |
|------|-------------|
| `online-player` | Validates that the argument is an online player name |
| `player` | Validates that the argument is a player (online or offline) |
| `integer` | Validates that the argument is a whole number |
| `double` | Validates that the argument is a decimal number |
| `boolean` | Validates that the argument is true/false |
| `material` | Validates that the argument is a valid Minecraft material |
| `world` | Validates that the argument is a valid world name |
| `entity-type` | Validates that the argument is a valid entity type |
| `location` | Validates that the argument is a valid location |

#### Argument Example with Type Validation

```yaml
arguments:
  - name: "player"
    type: online-player
    isRequired: true
    auto-completion: "@players"
  - name: "amount"
    type: integer
    isRequired: false
    auto-completion:
      - "1"
      - "10"
      - "64"
```

## Examples

### Simple Shop Command

```yaml
commands:
  shop:
    command: /shop
    inventory: shop
    permission: "server.shop"
    deny-message: "&cYou need to be a member to access the shop!"
    aliases:
      - store
      - market
```

### Warps Command

```yaml
commands:
  warps:
    command: /warps
    inventory: warps_menu
    permission: "server.warps"
    deny-message: "&cYou don't have permission to use warps!"
    aliases:
      - warp
      - teleport
    actions:
      - type: message
        messages:
          - "&7Opening warps menu..."
```

### Admin Menu

```yaml
commands:
  adminmenu:
    command: /adminmenu
    inventory: admin_panel
    permission: "server.admin.menu"
    aliases:
      - admin
      - apanel
```

### Menu with Categories

```yaml
commands:
  menu:
    command: /menu
    inventory: main_menu
    aliases:
      - gui
      - m

  help:
    command: /help
    inventory: help_menu
    permission: "server.help"

  rules:
    command: /rules
    inventory: rules_menu
```

### Server Information

```yaml
commands:
  info:
    command: /info
    inventory: server_info
    aliases:
      - serverinfo
      - about
    actions:
      - type: sound
        sound: ENTITY_EXPERIENCE_ORB_PICKUP
```

## Multiple Command Files

You can organize commands in multiple files:

```
plugins/zMenu/commands/
├── commands.yml
├── shop/
│   └── shop_commands.yml
├── admin/
│   └── admin_commands.yml
└── social/
    └── social_commands.yml
```

Each file follows the same format:

```yaml
# commands/shop/shop_commands.yml
commands:
  shop:
    command: /shop
    inventory: shop_main

  buyweapons:
    command: /buyweapons
    inventory: shop_weapons
```

## Command Arguments

### Basic Arguments

```yaml
commands:
  give-menu:
    command: /givemenu
    inventory: give_menu
    permission: "server.admin"
    arguments:
      - name: "player"
        type: online-player
        isRequired: true
        auto-completion: "@players"  # Auto-complete with online players
```

### Multiple Arguments

```yaml
commands:
  category:
    command: /category
    inventory: category_menu
    arguments:
      - name: "type"
        isRequired: true
        auto-completion:
          - "weapons"
          - "armor"
          - "tools"
          - "food"
      - name: "page"
        type: integer
        isRequired: false
        auto-completion:
          - "1"
          - "2"
          - "3"
```

### Arguments with performMainAction

Use `performMainAction: false` to create commands that process arguments without opening the main inventory.

```yaml
commands:
  pay:
    command: /pay
    inventory: payment_confirm
    arguments:
      - name: "player"
        type: online-player
        isRequired: true
        auto-completion: "@players"
      - name: "amount"
        type: integer
        isRequired: true
        performMainAction: true  # Opens inventory after validation
        actions:
          - type: message
            messages:
              - "&aPreparing payment of %args_1% to %args_0%..."
```

### Arguments with Specific Actions

Each argument can have its own actions that execute when that argument is provided.

```yaml
commands:
  teleport:
    command: /tp
    permission: "server.teleport"
    arguments:
      - name: "player"
        type: online-player
        isRequired: true
        performMainAction: false  # Don't open inventory
        actions:
          - type: console_command
            commands:
              - "tp %player% %args_0%"
          - type: message
            messages:
              - "&aTeleported to %args_0%!"
```

## Conflicting Commands

If your command conflicts with another plugin:

1. **Change the command name** to something unique
2. **Use aliases** as the main entry point
3. **Check plugin load order** in server configuration

:::tip
If a command like `/shop` is taken by another plugin, use a unique command like `/zmshop` and add `/shop` as an alias. zMenu will try to register the alias.
:::

## Permission Examples

### With LuckPerms

```bash
# Give permission to use shop
/lp group default permission set server.shop true

# Admin menu for admins only
/lp group admin permission set server.admin.menu true
```

### Deny Message

Players without permission see the default "no permission" message. Customize this in your messages configuration.

## Reloading Commands

After modifying command files:

```
/zm reload command           # Reload all commands
/zm reload command shop      # Reload specific command
```

## Complete Example

```yaml
# commands/commands.yml
commands:
  # Main server menu
  menu:
    command: /menu
    inventory: main_menu
    aliases:
      - gui
      - server
    actions:
      - type: sound
        sound: BLOCK_CHEST_OPEN

  # Shop with permission
  shop:
    command: /shop
    inventory: shop_main
    permission: "server.shop"
    aliases:
      - store
      - market
      - buy

  # VIP shop
  vipshop:
    command: /vipshop
    inventory: vip_shop
    permission: "server.vip.shop"
    aliases:
      - vs

  # Warps menu
  warps:
    command: /warps
    inventory: warps_menu
    permission: "server.warps"
    aliases:
      - warp
      - w

  # Player profile
  profile:
    command: /profile
    inventory: player_profile
    aliases:
      - stats
      - me

  # Help menu
  help:
    command: /serverhelp
    inventory: help_menu
    aliases:
      - faq
      - info

  # Admin panel
  admin:
    command: /adminpanel
    inventory: admin_menu
    permission: "server.admin"
    aliases:
      - ap
      - adminmenu
```

## Best Practices

1. **Use intuitive names**: `/shop` not `/spm`
2. **Add useful aliases**: Common variations and shortcuts
3. **Set appropriate permissions**: Restrict sensitive menus
4. **Keep it organized**: Use subfolders for large setups
5. **Document commands**: Comment your YAML files
6. **Test thoroughly**: Verify commands work as expected

## Next Steps

- Configure the main [config.yml](./config-yml)
- Learn about [Player Data](./player-data)
- Set up [Global Placeholders](./global-placeholders)
