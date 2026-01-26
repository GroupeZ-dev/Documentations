---
sidebar_position: 7
title: Global Placeholders
description: Define values that can be used across all inventories
---

# Global Placeholders

Global placeholders allow you to define values in one place and use them across all your inventories. This is useful for server information, URLs, and other values you might want to change centrally.

## Configuration File

Global placeholders are defined in `plugins/zMenu/global-placeholders.yml`.

## Basic Usage

### Defining Global Placeholders

```yaml
# global-placeholders.yml

server-name: "My Awesome Server"
server-ip: "play.myserver.com"
discord: "discord.gg/myserver"
website: "https://myserver.com"
store: "https://store.myserver.com"
version: "1.0.0"
```

### Using Global Placeholders

Access them with `%zmenu_global_placeholders_<key>%`:

```yaml
# In your inventory
items:
  server-info:
    slot: 4
    item:
      material: BOOK
      name: "&6&l%zmenu_global_placeholders_server-name%"
      lore:
        - "&7IP: &f%zmenu_global_placeholders_server-ip%"
        - "&7Discord: &9%zmenu_global_placeholders_discord%"
        - "&7Website: &b%zmenu_global_placeholders_website%"
```

## Advanced Features

### List Values

You can define lists of values:

```yaml
# global-placeholders.yml
rules:
  - "&7- Be respectful to others"
  - "&7- No cheating or hacking"
  - "&7- No advertising"
  - "&7- Have fun!"
```

### Nested Values

Use dots for organization (they become part of the key):

```yaml
# global-placeholders.yml
social.discord: "discord.gg/myserver"
social.twitter: "@MyServer"
social.youtube: "youtube.com/myserver"

prices.vip: "9.99"
prices.mvp: "19.99"
prices.legend: "49.99"
```

Usage:
```yaml
lore:
  - "&7Discord: %zmenu_global_placeholders_social.discord%"
  - "&7VIP Price: $%zmenu_global_placeholders_prices.vip%"
```

## Examples

### Server Information Menu

```yaml
# global-placeholders.yml
server-name: "CraftWorld"
server-ip: "play.craftworld.net"
discord: "discord.gg/craftworld"
website: "https://craftworld.net"
owner: "Notch"
founded: "2020"
```

```yaml
# inventories/server_info.yml
name: "&6Server Information"
size: 27

items:
  info:
    slot: 13
    item:
      material: BOOK
      name: "&6&l%zmenu_global_placeholders_server-name%"
      lore:
        - "&8&m─────────────────"
        - ""
        - "&7IP: &f%zmenu_global_placeholders_server-ip%"
        - "&7Discord: &9%zmenu_global_placeholders_discord%"
        - "&7Website: &b%zmenu_global_placeholders_website%"
        - ""
        - "&7Owner: &e%zmenu_global_placeholders_owner%"
        - "&7Founded: &a%zmenu_global_placeholders_founded%"
        - ""
        - "&8&m─────────────────"
```

### Store Prices

```yaml
# global-placeholders.yml
rank.vip.price: "9.99"
rank.vip.name: "&a&lVIP"
rank.mvp.price: "19.99"
rank.mvp.name: "&b&lMVP"
rank.legend.price: "49.99"
rank.legend.name: "&6&lLEGEND"
```

```yaml
# inventories/ranks.yml
items:
  vip:
    slot: 11
    item:
      material: IRON_BLOCK
      name: "%zmenu_global_placeholders_rank.vip.name%"
      lore:
        - "&7Price: &a$%zmenu_global_placeholders_rank.vip.price%"

  mvp:
    slot: 13
    item:
      material: GOLD_BLOCK
      name: "%zmenu_global_placeholders_rank.mvp.name%"
      lore:
        - "&7Price: &a$%zmenu_global_placeholders_rank.mvp.price%"

  legend:
    slot: 15
    item:
      material: DIAMOND_BLOCK
      name: "%zmenu_global_placeholders_rank.legend.name%"
      lore:
        - "&7Price: &a$%zmenu_global_placeholders_rank.legend.price%"
```

### Centralized Colors/Themes

```yaml
# global-placeholders.yml
color.primary: "&6"
color.secondary: "&7"
color.success: "&a"
color.error: "&c"
color.info: "&b"

prefix.shop: "&6&lSHOP &8»"
prefix.warp: "&5&lWARP &8»"
prefix.admin: "&c&lADMIN &8»"
```

```yaml
# Use in inventories
items:
  item:
    item:
      name: "%zmenu_global_placeholders_color.primary%My Item"
```

## Benefits

1. **Centralized Management**: Change values in one place
2. **Consistency**: Ensure the same values across all menus
3. **Easy Updates**: Update server IP, Discord link, etc. once
4. **Organization**: Keep configuration values together
5. **No Restarts**: Changes apply after `/zm reload`

## Comparison with Local Placeholders

| Feature | Global Placeholders | Local Placeholders |
|---------|--------------------|--------------------|
| Scope | All inventories | Single inventory |
| File | `global-placeholders.yml` | Inside inventory file |
| Access | `%zmenu_global_placeholders_key%` | `%key%` |
| Use case | Server-wide values | Inventory-specific values |

### Local Placeholders Example

```yaml
# In inventory file
local-placeholders:
  category: "Weapons"
  discount: "20%"

items:
  header:
    item:
      name: "&6%category% Shop"
      lore:
        - "&7Sale: %discount% off!"
```

## Reloading

After making changes to `global-placeholders.yml`:

```
/zm reload config
```

Or reload everything:

```
/zm reload
```

## Best Practices

1. **Use descriptive keys**: `server-ip` not `ip`
2. **Group related values**: Use dot notation like `social.discord`
3. **Document your placeholders**: Add comments in the YAML file
4. **Keep it organized**: Group by purpose (social, prices, colors)
5. **Don't overuse**: Only use for truly global values

## Next Steps

- Learn about [Patterns](./patterns) for reusable templates
- See [Player Data](./player-data) for per-player values
- Configure the [config.yml](./config-yml) file
