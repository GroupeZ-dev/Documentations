---
sidebar_position: 1
title: Main Configuration
description: Main configuration options for zCookieClicker
---

# Main Configuration

This page covers the main configuration options available in `config.yml`.

## Database Configuration

Configure how player data is stored.

```yaml
sql:
  type: SQLITE  # SQLITE, MYSQL, or MARIADB
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  database: zcookieclicker
  prefix: "zcookieclicker_"
  retry: 5
  debug: false
```

| Option | Description |
|--------|-------------|
| `type` | Storage type: `SQLITE`, `MYSQL`, or `MARIADB` |
| `user` | Database username |
| `password` | Database password |
| `port` | Database port |
| `host` | Database host address |
| `database` | Database name |
| `prefix` | Table name prefix |
| `retry` | Number of connection retry attempts |
| `debug` | Enable SQL query debugging |

## Price Scaling

Configure how upgrade prices increase with each purchase:

```yaml
price-upgrade-percent: 15
```

This means each upgrade purchase increases the next purchase price by 15%.

**Example with 15% increase:**
- First Grandma: 100 cookies
- Second Grandma: 115 cookies
- Third Grandma: 132.25 cookies
- And so on...

## Number Formatting

### Standard Decimal Format

```yaml
decimal-format: "#,###.#"
```

This format is used when short number format is disabled.

### Short Number Format

For large numbers, enable short format with suffixes:

```yaml
short-number-format:
  enabled: true
  decimal-format: "#.##"
  suffixes:
    - ""       # < 1,000
    - "K"      # Thousands
    - "M"      # Millions
    - "B"      # Billions
    - "T"      # Trillions
    - "Qa"     # Quadrillions
    - "Qi"     # Quintillions
    - "Sx"     # Sextillions
    - "Sp"     # Septillions
    - "Oc"     # Octillions
```

| Option | Description |
|--------|-------------|
| `enabled` | Enable/disable short number formatting |
| `decimal-format` | Decimal format pattern for short numbers |
| `suffixes` | List of suffixes for each magnitude |

**Examples:**
| Value | Formatted |
|-------|-----------|
| 500 | 500 |
| 1,234 | 1.23K |
| 5,678,901 | 5.68M |
| 1,234,567,890 | 1.23B |

## Complete Example Configuration

```yaml
# Database configuration
sql:
  type: SQLITE
  user: homestead
  password: secret
  port: 3306
  host: 192.168.10.10
  database: zcookieclicker
  prefix: "zcookieclicker_"
  retry: 5
  debug: false

# Price increase percentage per upgrade purchase
price-upgrade-percent: 15

# Standard number format
decimal-format: "#,###.#"

# Short number format for large numbers
short-number-format:
  enabled: true
  decimal-format: "#.##"
  suffixes:
    - ""
    - "K"
    - "M"
    - "B"
    - "T"
    - "Qa"
    - "Qi"
    - "Sx"
    - "Sp"
    - "Oc"

# Upgrade definitions (see Upgrades page for details)
upgrades:
  - type: "MANUAL_CLICK"
    cost: 10
    cps: 0.1
  # ... more upgrades
```

## Configuration Tips

### Balancing Price Scaling

- **Lower percentage (5-10%)**: Faster progression, easier to buy many upgrades
- **Standard percentage (15%)**: Balanced progression similar to original Cookie Clicker
- **Higher percentage (20-30%)**: Slower progression, more grinding required

### Number Format Customization

You can customize suffixes for your server's language:

```yaml
# French example
suffixes:
  - ""
  - "K"
  - "M"
  - "Md"    # Milliard (Billion in French)
  - "T"
```

### Database Recommendations

- **Single Server**: Use SQLite for simplicity
- **Multiple Servers**: Use MySQL/MariaDB (note: data is not synchronized, just stored remotely)
- **Large Player Base**: Use MySQL/MariaDB with connection pooling
