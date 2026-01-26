---
sidebar_position: 1
title: Informations
description: Essential information about configuring zMenu
---

# Configuration Informations

This page provides essential information about how to configure zMenu and understand its configuration philosophy.

## Understanding YAML

zMenu uses YAML (YAML Ain't Markup Language) for all its configuration files. If you're new to YAML, here are some important things to know:

### Basic YAML Rules

1. **Indentation matters** - Use spaces (not tabs) for indentation
2. **Consistent spacing** - Use 2 spaces per indentation level
3. **Case sensitive** - `Material` is different from `material`
4. **Colons need spaces** - `key: value` not `key:value`

### Example Structure

```yaml
# This is a comment
inventory-name: "My Inventory"    # String value
size: 54                          # Number value
enabled: true                     # Boolean value

items:                            # Start of a section
  my-button:                      # Button name (key)
    slot: 0                       # Property of my-button
    item:                         # Nested section
      material: DIAMOND
      name: "&bDiamond"
```

### Useful Tools

- **YAML Validator**: [YAML Lint](http://www.yamllint.com/) - Check your YAML syntax
- **VS Code Extension**: YAML by Red Hat - Syntax highlighting and validation
- **Notepad++**: Lightweight editor with YAML support

## Configuration Philosophy

zMenu follows a modular configuration approach:

### File Organization

```
plugins/zMenu/
├── config.yml                 # Global settings
├── global-placeholders.yml    # Shared values
├── commands/                  # Command definitions
│   └── commands.yml
├── inventories/               # Your menus
│   ├── menu1.yml
│   └── subfolder/
│       └── menu2.yml
├── patterns/                  # Reusable templates
├── items/                     # Reusable items
└── actions_patterns/          # Default actions
```

### Key Principles

1. **One inventory per file** - Each YAML file in `inventories/` defines one inventory
2. **Subfolders supported** - Organize inventories in subfolders
3. **Reusability** - Use patterns and items to avoid repetition
4. **Hot reload** - Use `/zm reload` to apply changes without restart

## Color Codes

zMenu supports multiple color code formats:

### Legacy Color Codes

Using the `&` symbol:

| Code | Color | Code | Color |
|------|-------|------|-------|
| `&0` | Black | `&8` | Dark Gray |
| `&1` | Dark Blue | `&9` | Blue |
| `&2` | Dark Green | `&a` | Green |
| `&3` | Dark Aqua | `&b` | Aqua |
| `&4` | Dark Red | `&c` | Red |
| `&5` | Dark Purple | `&d` | Light Purple |
| `&6` | Gold | `&e` | Yellow |
| `&7` | Gray | `&f` | White |

### Formatting Codes

| Code | Effect |
|------|--------|
| `&l` | **Bold** |
| `&o` | *Italic* |
| `&n` | <u>Underline</u> |
| `&m` | ~~Strikethrough~~ |
| `&k` | Obfuscated |
| `&r` | Reset |

### Hex Colors

```yaml
name: "&#FF5555This is red &#55FF55and this is green"
```

### MiniMessage (Paper/Purpur)

If you're using Paper, Purpur, or Pufferfish, you can enable MiniMessage format in `config.yml`:

```yaml
enable-mini-message-format: true
```

Then use MiniMessage syntax:

```yaml
name: "<gradient:red:blue>Gradient Text</gradient>"
lore:
  - "<rainbow>Rainbow text!</rainbow>"
  - "<bold><gold>Bold gold text</gold></bold>"
  - "<click:run_command:/spawn>Click to spawn</click>"
```

## Placeholders

zMenu supports placeholders throughout your configurations:

### PlaceholderAPI

Any PlaceholderAPI placeholder works in zMenu:

```yaml
name: "&6%player_name%'s Profile"
lore:
  - "&7Balance: &a$%vault_eco_balance%"
  - "&7Level: &e%player_level%"
```

### zMenu Built-in Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%player%` | Player name |
| `%page%` | Current page number |
| `%maxPage%` or `%max-page%` | Total pages |
| `%zmenu_player_page%` | Current page |
| `%zmenu_player_max_page%` | Maximum page |

See the [Placeholders page](./placeholders) for the complete list.

## Reloading Configurations

After making changes, reload your configurations:

```
/zm reload                    # Reload everything
/zm reload config             # Reload config.yml only
/zm reload inventory [name]   # Reload specific inventory
/zm reload command [name]     # Reload specific command
```

:::tip
Use `/zm reload inventory <name>` when testing changes to a specific inventory - it's faster than reloading everything.
:::

## Common Mistakes

### 1. Incorrect Indentation

```yaml
# Wrong
items:
my-button:
  slot: 0

# Correct
items:
  my-button:
    slot: 0
```

### 2. Missing Quotes for Special Characters

```yaml
# Wrong - will cause parsing error
name: &6My Menu

# Correct
name: "&6My Menu"
```

### 3. Tab Characters

YAML doesn't allow tabs. Always use spaces:

```yaml
# Wrong (tabs)
items:
→ my-button:
→ → slot: 0

# Correct (spaces)
items:
  my-button:
    slot: 0
```

### 4. Duplicate Keys

```yaml
# Wrong - second 'slot' overwrites first
my-button:
  slot: 0
  slot: 1

# Correct
my-button:
  slot: 0
another-button:
  slot: 1
```

## File Encoding

Always save your files with **UTF-8 encoding** to properly support:
- Special characters
- Non-English text
- Color codes

Most modern text editors use UTF-8 by default, but check your editor's settings if you experience issues with special characters.

## Next Steps

Now that you understand the basics:

1. Learn about [Commands & Permissions](./commands-permissions)
2. Explore available [Placeholders](./placeholders)
3. [Create your first inventory](./inventories/create-inventory)
