---
title: Installation
description: Install and configure the zAuctionHouse Redis addon
---

# Installation

## Requirements

- zAuctionHouse V4 on all servers
- Redis server (6.0+ recommended)
- MySQL/MariaDB database (shared between all servers)

## Step 1: Install Redis

If you don't have a Redis server, you can install one:

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

**Docker:**
```bash
docker run -d --name redis -p 6379:6379 redis:latest
```

Many hosting providers also offer managed Redis instances.

## Step 2: Configure zAuctionHouse

Ensure all servers use the **same MySQL database**:

```yaml
storage-type: 'MYSQL'
server-name: 'skyblock'
database-configuration:
  table-prefix: 'zauctionhouse_'
  host: '192.168.10.10'
  port: 3306
  user: 'homestead'
  password: 'secret'
  database: 'zauctionhouse'
  debug: false
```

## Step 3: Install the Redis Addon

1. Download zAuctionHouseRedis from your purchase
2. Place `zAuctionHouseRedis.jar` in the `plugins` folder of **each server**
3. Start each server to generate the configuration

## Step 4: Configure Redis Connection

Edit `plugins/zAuctionHouseRedis/config.yml` on each server:

```yaml
redis-config:
  mode: 'standalone'
  host: '192.168.10.10'
  port: 6379
  user: ''
  password: ''
  channel-name: 'zauctionhouse'
  database: 0
  timeout: 2000
  lock-ttl-seconds: 30
  pool:
    max-total: 64
    max-idle: 32
    min-idle: 16
```

### Redis Sentinel Mode

For high-availability setups, zAuctionHouse Redis supports [Redis Sentinel](https://redis.io/docs/management/sentinel/). Sentinel provides automatic master discovery and failover, so if the master goes down, a replica is automatically promoted and the plugin reconnects transparently.

To use Sentinel mode, set `mode` to `sentinel` and configure the `sentinel` section:

```yaml
redis-config:
  mode: 'sentinel'

  sentinel:
    master-name: 'mymaster'
    user: ''
    password: ''
    nodes:
      - '192.168.10.10:26379'
      - '192.168.10.11:26379'
      - '192.168.10.12:26379'

  user: ''
  password: ''
  channel-name: 'zauctionhouse'
  database: 0
  timeout: 2000
  lock-ttl-seconds: 30
  pool:
    max-total: 64
    max-idle: 32
    min-idle: 16
```

| Field | Description |
|-------|-------------|
| `mode` | Connection mode: `standalone` (default) or `sentinel` |
| `sentinel.master-name` | Name of the Sentinel master group (usually `mymaster`) |
| `sentinel.user` | Username for Sentinel authentication (leave empty if none) |
| `sentinel.password` | Password for Sentinel authentication (leave empty if none) |
| `sentinel.nodes` | List of Sentinel nodes in `host:port` format |

<CalloutContainer type="info">

<CalloutDescription>
The `user` and `password` fields at the root of `redis-config` are for the **Redis master** connection. The `sentinel.user` and `sentinel.password` are specifically for authenticating with the **Sentinel instances** themselves.
</CalloutDescription>

</CalloutContainer>

<CalloutContainer type="info">

<CalloutDescription>
Existing standalone configurations continue to work without any changes. If the `mode` field is absent, it defaults to `standalone`.
</CalloutDescription>

</CalloutContainer>

## Step 5: Restart Servers

Restart all servers. The plugin will automatically:
- Connect to your Redis server
- Subscribe to auction events
- Synchronize data between servers

## Verification

To verify the addon is working:

1. Check the console for successful Redis connection message
2. List an item on Server 1
3. Open `/ah` on Server 2 - the item should appear immediately
4. Purchase the item on Server 2
5. Check Server 1 - the item should be removed from the listing
