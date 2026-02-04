---
sidebar_position: 17
title: Steps Module
description: Step-based progression tracking system
---

# Steps Module

**File:** `modules/steps/config.yml`

The Steps module provides a lightweight progression tracking system for players. Each step is a named entry that can be created and finished via the API or commands. Steps track playtime between creation and completion and can store custom JSON data, making them ideal for tutorials, quest milestones, onboarding flows, or any sequential progression mechanic.

---

## Source Configuration

```yaml
enable: true
steps:
  - name: "step-1"
  - name: "step-2"
  - name: "step-3"
  - name: "step-4"
```

---

## Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enable` | Boolean | `true` | Enable or disable the Steps module |
| `steps` | List | *(see above)* | The list of step definitions available for player progression tracking |

### Step Entries

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `steps[].name` | String | - | The unique identifier for this step. Used by commands and the API to reference the step |

:::info
Steps are a lightweight progression system. Each step is a named entry that can be created and finished via the API or commands. When a step is created for a player, it begins tracking playtime. When the step is finished, the elapsed playtime between creation and completion is recorded.
:::

:::tip
Steps can store custom JSON data, allowing you to attach arbitrary metadata to each step instance. This is useful for storing contextual information such as coordinates, item data, or completion conditions alongside the step record.
:::

:::note
The step names defined in the configuration act as the available step templates. You must define a step here before it can be created for a player through commands or the API.
:::

---

## How It Works

1. Define your step names in the `steps` list within the configuration file.
2. When a player reaches a progression point, create the step for them using the `/step` command or the Steps API. This begins tracking their playtime for that step.
3. When the player completes the objective associated with that step, finish the step. The module records the total playtime spent between creation and completion.
4. Custom JSON data can be attached to steps at creation or completion for additional context.

---

## Related Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/step` | `essentials.step` | Manage player steps (create, finish, and view step progress) |

For the full command list, see [Commands & Permissions](../commands-permissions).

---

## Related Events

| Event | Description |
|-------|-------------|
| `StepCreateEvent` | Fired when a new step is created for a player. Can be used to trigger actions at the start of a progression stage |
| `StepFinishEvent` | Fired when a step is marked as finished for a player. Can be used to grant rewards or advance to the next stage |

:::tip
You can listen to `StepCreateEvent` and `StepFinishEvent` in your own plugins or addons to build custom progression logic, such as automatically creating the next step when the current one is finished.
:::

---

## Example: Tutorial Progression

Define a series of steps for a new player tutorial:

```yaml
enable: true
steps:
  - name: "tutorial-welcome"
  - name: "tutorial-crafting"
  - name: "tutorial-building"
  - name: "tutorial-combat"
  - name: "tutorial-complete"
```

Use the API or commands to create `tutorial-welcome` when the player first joins, then finish each step and create the next one as the player progresses through the tutorial stages. The playtime tracking lets you analyze how long players spend on each tutorial section.
