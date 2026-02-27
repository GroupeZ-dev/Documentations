---
sidebar_position: 5
title: Discord Webhook
description: Send KOTH events to Discord
---

# Discord Webhook Configuration

zKoth can send event notifications to Discord via webhooks.

## Basic Setup

1. Create a webhook in your Discord channel settings
2. Copy the webhook URL
3. Configure it in your KOTH file

```yaml
webhook:
  enable: true
  url: "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_TOKEN"
  events:
    START:
      event: START
      title: 'KOTH Started'
      description: "KOTH %name% has started!"
      color:
        r: 40
        g: 240
        b: 40
```

## Available Events

| Event | Description |
|-------|-------------|
| `SPAWN` | KOTH spawned (enters cooldown) |
| `START` | KOTH started (capture begins) |
| `STOP` | KOTH stopped |
| `START_CAP` | Player started capturing |
| `WIN` | Player/team won |
| `LOOSE` | Player lost capture progress |

## Event Configuration

Each event can have its own embed configuration:

```yaml
webhook:
  enable: true
  url: "https://discord.com/api/webhooks/..."

  events:
    START:
      event: START
      title: 'KOTH Started'
      description: "KOTH **%name%** has started!"
      url: "https://your-server.com/koth"  # Optional link
      color:
        r: 0
        g: 255
        b: 0
      footer:
        text: "zKoth Events"
        iconUrl: "https://example.com/icon.png"
      thumbnail: "https://example.com/thumbnail.png"
      image: "https://example.com/image.png"
      author:
        name: "KOTH System"
        url: "https://your-server.com"
        iconUrl: "https://example.com/author.png"
      fields:
        - name: "Location"
          value: "%centerX%, %centerY%, %centerZ%"
          inline: true
        - name: "World"
          value: "%world%"
          inline: true
```

## Embed Properties

### Basic Properties

| Property | Description |
|----------|-------------|
| `title` | Embed title |
| `description` | Main text content |
| `url` | Link when clicking title |
| `color` | RGB color values |

### Footer

```yaml
footer:
  text: "Footer text"
  iconUrl: "https://example.com/icon.png"
```

### Author

```yaml
author:
  name: "Author Name"
  url: "https://example.com"
  iconUrl: "https://example.com/author.png"
```

### Images

```yaml
thumbnail: "https://example.com/thumbnail.png"  # Small image
image: "https://example.com/image.png"          # Large image
```

### Fields

```yaml
fields:
  - name: "Field Title"
    value: "Field content"
    inline: false  # Full width

  - name: "Inline Field"
    value: "Content"
    inline: true   # Side by side
```

## Placeholders

All KOTH placeholders work in webhook messages:

| Placeholder | Description |
|-------------|-------------|
| `%name%` | KOTH name |
| `%world%` | World name |
| `%centerX%`, `%centerY%`, `%centerZ%` | Center coordinates |
| `%playerName%` | Capturing/winning player |
| `%teamName%` | Player's team |
| `%captureFormat%` | Formatted capture time |

## Complete Example

```yaml
webhook:
  enable: true
  url: "https://discord.com/api/webhooks/123456789/abcdefg"

  events:
    SPAWN:
      event: SPAWN
      title: '⚔️ KOTH Spawning!'
      description: |
        **%name%** will start soon!

        Get ready to capture!
      color:
        r: 255
        g: 200
        b: 0
      footer:
        text: "Server KOTH Events"
        iconUrl: "https://groupez.dev/storage/images/9.png"
      fields:
        - name: "📍 Location"
          value: "`%centerX%, %centerY%, %centerZ%`"
          inline: true
        - name: "🌍 World"
          value: "`%world%`"
          inline: true

    START:
      event: START
      title: '🏰 KOTH Active!'
      description: "**%name%** is now capturable!"
      color:
        r: 0
        g: 255
        b: 100
      footer:
        text: "zKoth"
        iconUrl: "https://groupez.dev/storage/images/9.png"

    WIN:
      event: WIN
      title: '🏆 KOTH Captured!'
      description: |
        **%playerName%** has captured **%name%**!

        Congratulations!
      color:
        r: 255
        g: 215
        b: 0
      footer:
        text: "Winner!"
        iconUrl: "https://groupez.dev/storage/images/9.png"
      fields:
        - name: "👤 Player"
          value: "%playerName%"
          inline: true
        - name: "👥 Team"
          value: "%teamName%"
          inline: true
        - name: "⏱️ Time"
          value: "%captureFormat%"
          inline: true

    STOP:
      event: STOP
      title: '🛑 KOTH Ended'
      description: "**%name%** has been stopped."
      color:
        r: 255
        g: 50
        b: 50
      footer:
        text: "Event ended"
```

## Multiple KOTHs

Each KOTH can have different webhook configurations or share the same URL:

```yaml
# koth1.yml
webhook:
  enable: true
  url: "https://discord.com/api/webhooks/channel1/..."
  events:
    # ...

# koth2.yml
webhook:
  enable: true
  url: "https://discord.com/api/webhooks/channel2/..."  # Different channel
  events:
    # ...
```

## Tips

1. **Test your webhook** - Use a test channel first
2. **Don't spam** - Disable less important events
3. **Use colors** - Make events visually distinct
4. **Keep descriptions short** - Discord has character limits
5. **Use inline fields** - For compact information display
