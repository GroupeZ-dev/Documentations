---
sidebar_position: 8
title: Patterns
---

# Patterns

zMenu has three types of patterns, each solving a different reuse problem:

| Type | Folder | Purpose | Referenced via |
|---|---|---|---|
| **Inventory Pattern** | `patterns/` | Reusable decoration / layout buttons shared across inventories | `patterns: ["name"]` on the inventory |
| **Button Pattern** | `patterns/` | Reusable single-button template with variable substitution | `pattern:` section inside an item |
| **Action Pattern** | `actions_patterns/` | Default actions applied to every button in an inventory | `action-patterns: ["name"]` on the inventory |

The first two live in the same folder but are distinguished by the `type` key in the file.

## File Locations

```
plugins/zMenu/
├── patterns/               # Inventory patterns and button patterns
│   ├── my_decoration.yml   # type: INVENTORY (default)
│   └── my_button.yml       # type: BUTTON
└── actions_patterns/       # Action patterns
    └── default-actions.yml
```

Subfolders are supported - `patterns/borders/simple.yml` works.

---

## Inventory Patterns

An inventory pattern defines a set of buttons (decorations, navigation, etc.) that can be applied to any inventory. Think of it as a reusable layer.

### Structure

```yaml
name: "pattern_example"        # Unique name used to reference this pattern
size: 54                       # Inventory size (must be a multiple of 9)
# type: INVENTORY              # Optional - INVENTORY is the default
# enableMultiPage: false       # Set to true to allow pagination buttons to work
# matrix:                      # Optional slot matrix (same syntax as inventories)

items:
  example1:
    isPermanent: true
    item:
      material: IRON_INGOT
      name: "&fDecoration"
    slots:
      - 0
      - 8
      - 45
      - 53
```

| Key | Required | Description |
|---|---|---|
| `name` | Yes | Unique identifier. Inventories reference this name. |
| `size` | No | Defaults to `54`. Must be a multiple of 9. |
| `type` | No | `INVENTORY` (default) or `BUTTON`. If set to `BUTTON` the file is loaded as a button pattern instead. |
| `enableMultiPage` | No | When `true`, `NEXT` / `PREVIOUS` buttons inside this pattern will work with the inventory's pagination. Defaults to `false`. |
| `matrix` | No | Optional slot matrix, same format as in inventories. |
| `items` | Yes | The buttons to place. Same syntax as the `items` section in an inventory file. |

### Using in an Inventory

Reference one or more inventory patterns by name in the `patterns` list:

```yaml
name: "&6Shop"
size: 54
patterns:
  - "pattern_example"
  - "pagination"

items:
  # your inventory-specific buttons ...
```

Patterns are applied in order - buttons from later patterns override earlier ones if they occupy the same slot.

### Example: Decoration

File `patterns/pattern_example.yml` (shipped with zMenu):

```yaml
name: "pattern_example"
size: 54
items:
  example1:
    isPermanent: true
    item:
      material: IRON_INGOT
      name: "&fExample of pattern"
    slots:
      - 0
      - 8
      - 45
      - 53
```

Usage in an inventory:

```yaml
name: "&eExample"
size: 54
patterns:
  - "pattern_example"

items:
  # ...
```

### Example: Navigation with Pagination

File `patterns/pagination.yml`:

```yaml
name: "pagination"
size: 54
enableMultiPage: true
items:
  next:
    type: NEXT
    slot: 52
    is-permanent: true
    item:
      material: PAPER
      name: "&fNext Page"

  previous:
    type: PREVIOUS
    slot: 49
    is-permanent: true
    item:
      material: PAPER
      name: "&fPrevious Page"
```

The key here is `enableMultiPage: true` - without it, `NEXT` and `PREVIOUS` buttons from the pattern will not function.

---

## Button Patterns

A button pattern is a template for a **single button**. The inventory that uses it passes variables (`%key%` placeholders) which are replaced before the button is loaded. This is the most powerful pattern type.

### Structure

```yaml
name: "pattern_cookies"       # Unique name
type: BUTTON                  # Must be BUTTON

button:                       # Everything under here becomes the button definition
  slot: '%slot%'
  item:
    material: '%material%'
    name: "&a%name%"
    lore:
      - "&7Click to buy"
  # click-requirement, actions, view_requirement, else ... all go here
```

| Key | Required | Description |
|---|---|---|
| `name` | Yes | Unique identifier. |
| `type` | Yes | Must be `BUTTON`. If omitted the file is treated as an inventory pattern and `button:` is ignored. |
| `button` | Yes | The button definition. Supports every property a normal button supports (slot, item, actions, click-requirement, view_requirement, else, etc.). |
| `default-values` | No | Fallback values for variables (see [below](#default-values)). |
| `local-placeholders` | No | Additional placeholders loaded from the pattern file (see [below](#local-placeholders)). |

### Using in an Inventory

Inside the `items` section of an inventory, add a `pattern` key to the button:

```yaml
items:
  grandma:
    pattern:
      file-name: "pattern_cookies"   # The pattern's name
      slot: 20                       # Passed as %slot%
      material: CAKE                 # Passed as %material%
      name: "Grand Ma"              # Passed as %name%
      key: "grandma"                # Passed as %key%
      price: 10                      # Passed as %price%
```

Every key under `pattern:` (except `file-name`, `plugin-name`, and their aliases) becomes a variable. The plugin collects all keys, then replaces `%key%` placeholders in the pattern's `button` section before loading.

### Variable Substitution

Any value wrapped in `%...%` inside the pattern file is replaced with the value provided by the inventory. For example, given:

**Pattern file:**
```yaml
button:
  slot: '%slot%'
  item:
    material: '%material%'
    name: "&a%name%"
```

**Inventory usage:**
```yaml
pattern:
  file-name: "my_pattern"
  slot: 13
  material: DIAMOND
  name: "Shiny"
```

**Result:** slot `13`, material `DIAMOND`, name `&aShiny`.

### Variable Modifiers

zMenu provides built-in modifiers that transform a variable's value. If a variable is named `key`, these modifiers are available:

| Modifier | Syntax | Example (`key = hello`) | Result |
|---|---|---|---|
| Uppercase | `%upper_key%` | `%upper_key%` | `HELLO` |
| Lowercase | `%lower_key%` | `%lower_key%` | `hello` |
| Capitalize | `%capitalize_key%` | `%capitalize_key%` | `Hello` |
| Add one | `%add_one_key%` | `%add_one_key%` (key = `5`) | `6` |
| Remove one | `%remove_one_key%` | `%remove_one_key%` (key = `5`) | `4` |

`add_one` and `remove_one` parse the value as an integer. If parsing fails, the placeholder is left unchanged.

These modifiers work on any variable - for example if the inventory passes `level: 3`, then `%remove_one_level%` resolves to `2`.

### Special Keys

These keys are **not** passed as variables - they control how the pattern is loaded:

| Key | Aliases | Description |
|---|---|---|
| `file-name` | `fileName`, `file` | Name of the pattern file (without `.yml`) |
| `plugin-name` | `pluginName`, `plugin` | Load the pattern from another plugin's `patterns/` folder |

### default-values

You can define fallback values directly in the pattern file. If the inventory does not provide a variable, the default is used instead:

```yaml
name: "my_template"
type: BUTTON

default-values:
  material: STONE
  name: "Default Name"
  slot: 0

button:
  slot: '%slot%'
  item:
    material: '%material%'
    name: "%name%"
```

If the inventory only provides `slot: 5`, the button will use material `STONE` and name `Default Name`.

**Priority:** Inventory values take precedence over default values.

### local-placeholders

Additional placeholders can be defined in the pattern file under `local-placeholders`. These are loaded **after** inventory values and default values, so they have the lowest priority among pattern-defined values:

```yaml
name: "my_template"
type: BUTTON

local-placeholders:
  prefix: "&7[Shop] "

button:
  item:
    name: "%prefix%%name%"
```

### List Variables

When a variable's value is a YAML list, zMenu expands each entry into a separate line in contexts like `lore`. This is useful for dynamic reward descriptions:

**Inventory:**
```yaml
items:
  reward:
    pattern:
      fileName: "playtime_reward"
      rewards:
        - '&f50$'
        - '&fx4 Iron Ingots'
      commands:
        - 'eco give %player% 50'
        - 'give %player% iron_ingot 4'
```

**Pattern file (lore section):**
```yaml
lore:
  - '&eRewards:'
  - '%rewards%'
  - ''
```

**Result:** The `%rewards%` line is expanded into two lines (`&f50$` and `&fx4 Iron Ingots`), so the lore shows:
```
&eRewards:
&f50$
&fx4 Iron Ingots

```

The same expansion applies to `commands` lists used in actions - a `%commands%` placeholder in a `console_command` action's `commands` list will expand into multiple commands.

### view-requirement and else at Item Level

You can add `view-requirement` and `else` from the **inventory side**, outside the pattern's `button` section. These are loaded separately and applied on top of the pattern button:

```yaml
items:
  my_button:
    pattern:
      file-name: "my_template"
      slot: 10
      name: "VIP Item"
    view-requirement:
      requirements:
        - type: permission
          permission: "vip.access"
    else:
      item:
        material: BARRIER
        name: "&cVIP Only"
```

This lets you reuse the same pattern but add different visibility conditions per inventory without modifying the pattern file.

Note: The pattern file itself can also contain `view-requirement` and `else` inside its `button` section - both sources are supported.

### Example: Cookie Clicker

**Pattern file** `patterns/pattern_cookies.yml`:

```yaml
name: "pattern_cookies"
type: BUTTON

button:
  click-requirement:
    purchase:
      clicks:
        - ALL
      requirements:
        - type: placeholder
          math: true
          placeholder: "%zmenu_player_value_cookie%"
          value: "%price%+(%price%*%zmenu_player_value_%key%%*1.15)"
          action: SUPERIOR_OR_EQUAL
      success:
        - type: data
          action: SUBTRACT
          key: 'cookie'
          value: '%price%+(%price%*%zmenu_player_value_%key%%*1.15)'
          math: true
        - type: data
          action: ADD
          key: '%key%'
          value: '1'
        - type: inventory
          inventory: 'cookies'
      deny:
        - type: message
          messages:
            - "&cYou don't have enough cookies"

  slot: '%slot%'

  item:
    material: '%material%'
    name: "&a%name% #353535(&7%zmenu_player_value_%key%%#353535)"
    lore:
      - ""
      - "&fPrice&8: &b%zmenu_formatted_math_%price%+(%price%*{zmenu_player_value_%key%}*1.15)% cookies"
      - ""
      - "&aClick to buy"
```

**Inventory file** `inventories/examples/cookies.yml`:

```yaml
name: "&8Cookies"
size: 36
items:
  cookie:
    slot: 13
    item:
      material: COOKIE
      name: "#77ff77Cookies#353535: &f%zmenu_player_value_cookie%"
      lore:
        - ""
        - "&fCookie per click&8: &b%zmenu_formatted_math_1+({zmenu_player_value_grandma}*2)+({zmenu_player_value_factory}*5)+({zmenu_player_value_mine}*10)%"
        - ""
        - "&7Click on me !"
    actions:
      - type: data
        action: ADD
        key: 'cookie'
        value: '1+(%zmenu_player_value_grandma%*2)+(%zmenu_player_value_factory%*5)+(%zmenu_player_value_mine%*10)'
        math: true
      - type: refresh

  grandma:
    pattern:
      file-name: "pattern_cookies"
      plugin-name: "zMenu"
      slot: 20
      material: CAKE
      name: "Grand Ma"
      key: "grandma"
      price: 10

  factory:
    pattern:
      file-name: "pattern_cookies"
      plugin-name: "zMenu"
      slot: 22
      material: WHEAT
      name: "Factory"
      key: "factory"
      price: 20

  mine:
    pattern:
      file-name: "pattern_cookies"
      plugin-name: "zMenu"
      slot: 24
      material: IRON_PICKAXE
      name: "Mine"
      key: "mine"
      price: 50
```

The same `pattern_cookies` template is reused three times with different variables, creating three upgrade buttons from a single pattern.

### Example: Playtime Rewards

This example shows nested `else` chains and the `%remove_one_level%` modifier. The pattern displays a different item depending on the player's state (already claimed, not enough playtime, must claim previous level, or ready to claim).

**Pattern file** `patterns/playtime_reward.yml` (simplified):

```yaml
name: "playtime_reward"
type: BUTTON
button:
  updateOnClick: true
  page: '%page%'
  slot: '%slot%'

  # State 1: Already claimed (level >= current)
  view-requirement:
    requirements:
      - type: placeholder
        placeholder: "%zmenu_player_value_playtime_level%"
        value: '%level%'
        action: SUPERIOR_OR_EQUAL
  item:
    url: '%head%'
    name: '%color%Level %level%'
    lore:
      - '%rewards%'          # List variable - expands into multiple lines
      - '&cAlready claimed'

  else:
    # State 2: Not enough playtime
    view-requirement:
      requirements:
        - type: placeholder
          placeholder: "%zmenu_statistic_hours_played%"
          value: '%hour%'
          action: LOWER
    item:
      url: '%head%'
      name: '%color%Level %level%'
      lore:
        - '%rewards%'
        - '&cNot enough play time'

    else:
      # State 3: Must claim previous level first
      view-requirement:
        requirements:
          - type: placeholder
            placeholder: "%zmenu_player_value_playtime_level%"
            value: '%remove_one_level%'    # level minus 1
            action: LOWER
      item:
        url: '%head%'
        name: '%color%Level %level%'
        lore:
          - '%rewards%'
          - '&cClaim the previous reward first'

      else:
        # State 4: Ready to claim
        click-requirement:
          right_click:
            clicks:
              - ALL
            requirements:
              - type: placeholder
                placeholder: "%zmenu_player_value_playtime_level%"
                value: '%remove_one_level%'
                action: EQUAL_TO
              - type: placeholder
                placeholder: "%zmenu_statistic_hours_played%"
                value: '%hour%'
                action: SUPERIOR_OR_EQUAL
            success:
              - type: data
                action: SET
                key: 'playtime_level'
                value: '%level%'
              - type: console_command
                commands:
                  - '%commands%'       # List variable - expands into multiple commands
              - type: sound
                sound: ENTITY_PLAYER_LEVELUP
        item:
          url: '%head%'
          name: '%color%Level %level%'
          lore:
            - '%rewards%'
            - '&aClick to claim'
```

**Inventory usage** (one button shown):

```yaml
items:
  btn-10:
    pattern:
      fileName: "playtime_reward"
      slot: 10
      level: 1
      hour: 1
      color: "#7f7f7f"
      head: "eyJ0ZXh0dXJlcyI6..."
      rewards:
        - '&f50$'
        - '&fx4 Iron Ingots'
      commands:
        - 'eco give %player% 50'
        - 'give %player% iron_ingot 4'
```

Key points:
- `%remove_one_level%` uses the `remove_one` modifier on the `level` variable - if `level` is `3`, this becomes `2`
- `%rewards%` is a list variable - it expands into two lore lines
- `%commands%` is a list variable - it expands into two console commands
- The nested `else` chain creates a state machine with four visual states

---

## Action Patterns

Action patterns define default actions that apply to **every button** in an inventory (unless a button defines its own actions).

### Structure

```yaml
name: default-actions
actions:
  - type: sound
    sound: ENTITY_VILLAGER_YES

deny-actions:
  - type: sound
    sound: ENTITY_VILLAGER_NO
```

| Key | Description |
|---|---|
| `name` | Unique identifier for this action pattern |
| `actions` | Actions executed when a button click succeeds |
| `deny-actions` | Actions executed when a requirement denies a click |

### Using in an Inventory

Reference action patterns by name in the `action-patterns` list:

```yaml
name: "&6Shop"
size: 54
action-patterns:
  - "default-actions"

items:
  # ...
```

:::warning
Like `patterns`, the `action-patterns` list only accepts **strings**. Objects are not supported.
:::

### Example

File `actions_patterns/default-actions.yml` (shipped with zMenu):

```yaml
name: default-actions
actions:
  - type: sound
    sound: ENTITY_VILLAGER_YES
deny-actions:
  - type: sound
    sound: ENTITY_VILLAGER_NO
```

With this pattern applied, every button in the inventory will play `ENTITY_VILLAGER_YES` on a successful click and `ENTITY_VILLAGER_NO` on a denied click, unless the button overrides these actions.

---

## Variable Resolution Order

When using button patterns, variables are resolved in this order (highest priority first):

1. **Inventory values** - keys defined under `pattern:` in the inventory file
2. **default-values** - fallback values defined in the pattern file
3. **Global placeholders** - plugin-wide placeholders registered via the API
4. **local-placeholders** - extra placeholders defined in the pattern file

If the same key exists at multiple levels, the highest-priority source wins.

---

## Cross-Plugin Patterns

To load a pattern from another plugin's `patterns/` folder, use `plugin-name`:

```yaml
items:
  my_button:
    pattern:
      file-name: "shared_template"
      plugin-name: "OtherPlugin"
      slot: 13
```

This looks for the file `plugins/OtherPlugin/patterns/shared_template.yml`.

Accepted aliases: `plugin-name`, `pluginName`, `plugin`.

---

## Reloading

```
/zm reload
```

All patterns (inventory, button, and action) are reloaded when the plugin restarts or when you run the reload command.

---

## Common Mistakes

### Objects in the `patterns` list

```yaml
# WRONG - will be silently ignored
patterns:
  - pattern:
      file-name: "my_decoration"

# CORRECT
patterns:
  - "my_decoration"
```

The `patterns` list uses `getStringList()` internally and only accepts strings. To use a button pattern with variables, place the `pattern:` key inside the `items` section on a specific button - not in the top-level `patterns` list.

### Forgetting `type: BUTTON`

```yaml
# WRONG - treated as an inventory pattern, "button:" section is ignored
name: "my_template"
button:
  slot: '%slot%'
  item:
    material: DIAMOND

# CORRECT
name: "my_template"
type: BUTTON
button:
  slot: '%slot%'
  item:
    material: DIAMOND
```

Without `type: BUTTON`, the file is loaded as an inventory pattern. Since it has no `items` section, it will fail to load.

### Confusing inventory patterns and button patterns

- **Inventory patterns** are referenced in the top-level `patterns: ["name"]` list. They define a set of buttons. They do **not** support variable substitution.
- **Button patterns** are referenced via `pattern:` inside a single item definition. They define one button with `%variable%` placeholders.

### Expecting variables in inventory patterns

Inventory patterns do not perform variable substitution. If you need `%placeholders%`, use a button pattern (`type: BUTTON`) instead.
