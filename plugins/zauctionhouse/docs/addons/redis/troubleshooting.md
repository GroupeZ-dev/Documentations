---
title: Troubleshooting
description: Fix common zAuctionHouse Redis addon issues
---

# Troubleshooting

## Cannot connect to Redis

- Verify Redis is running: `redis-cli ping` should return `PONG`
- Check host and port in configuration
- Ensure firewall allows connections on port 6379
- If using password authentication, verify the password is correct

## Items not synchronizing

- Ensure all servers use the same MySQL database
- Verify Redis addon is installed on **all** servers
- Check console for any error messages
- Ensure all servers can connect to Redis

## Duplicated or reappearing items

If a sold item reappears in the seller's items, a purchased item is missing after switching servers, or an item becomes impossible to buy:

- Make sure **every** server runs the **same up-to-date version** of both zAuctionHouse and the zAuctionHouse Redis addon. Older versions had cross-server synchronization bugs (ghost listings, missing purchased items, stale purchase locks) that are fixed in newer releases
- The main plugin **and** the Redis addon must be updated together on all servers
- Ensure all servers share the same MySQL/MariaDB database

## High latency

- Consider using a Redis server in the same datacenter as your game servers
- Check Redis server resources (CPU, memory)
- Review connection pool settings

## Performance Tips

1. **Use a local Redis server** - Keep Redis in the same datacenter as your servers
2. **Tune connection pool** - Adjust pool settings based on your server load
3. **Monitor Redis** - Use `redis-cli INFO` to monitor performance
4. **Enable persistence** - Configure Redis RDB/AOF for data safety (optional)

## Support

Need help setting up multi-server? Join our [Discord server](https://discord.groupez.dev) for support.
