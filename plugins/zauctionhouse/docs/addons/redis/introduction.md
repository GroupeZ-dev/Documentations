---
title: zAuctionHouse Redis
description: Connect multiple servers with zAuctionHouse Redis addon
---

# zAuctionHouse Redis

zAuctionHouse has been designed from the ground up with performance and scalability in mind. Whether you're running a small survival server or a large network like DonutSMP, zAuctionHouse is built to handle high traffic and multiple servers seamlessly.

## zAuctionHouse Redis Addon

To connect multiple servers and synchronize your auction house across your entire network, you need the **zAuctionHouse Redis** addon.

<div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', marginBottom: '20px' }}>
  <a href="https://groupez.dev/resources/zauctionhouse-redis.210" style={{ padding: '12px 24px', backgroundColor: '#2CCED2', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Buy on GroupeZ - 15€</a>
  <a href="https://builtbybit.com/resources/zauctionhouse-redis.23405/" style={{ padding: '12px 24px', backgroundColor: '#4a5568', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Buy on BuiltByBit - 20.99$</a>
</div>

### Features

- **Real-time synchronization** - Items listed on one server appear instantly on all others
- **Distributed locking** - Prevents double purchases and race conditions
- **Event propagation** - All auction events (listing, purchase, removal) are synchronized
- **Cache invalidation** - Ensures all servers have up-to-date data
- **High performance** - Minimal latency impact on your servers

## Why Redis?

Redis is an in-memory data structure store that provides extremely fast read and write operations. It is particularly well-suited for scenarios where multiple servers need to share and synchronize data in real time.

### Performance Comparison

| Solution | Speed | Real-time Sync | Data Consistency |
|----------|-------|----------------|------------------|
| **Redis** | Extremely fast (in-memory) | Yes            | Excellent |
| SQL Database | Slower (disk-based) | No             | Good |
| BungeeCord/Velocity | N/A | No             | N/A |

### Why not SQL?

Unlike traditional SQL databases, which are disk-based and can introduce significant latency when handling frequent read and write operations, Redis operates directly in memory. This makes it ideal for applications that require high-performance, low-latency access to shared data.

Using SQL to synchronize multiple servers is not efficient for an auction house. SQL databases are designed for persistent storage, meaning each read or write operation involves disk access. This becomes a bottleneck when dealing with frequent updates from multiple servers. Additionally, SQL doesn't provide the real-time synchronization that an auction house requires, leading to delays and potential data conflicts.

<CalloutContainer type="info">

<CalloutDescription>
zAuctionHouse still uses SQL (MySQL/MariaDB) for persistent data storage. Redis is used as a **cache layer** for real-time synchronization between servers.
</CalloutDescription>

</CalloutContainer>

### Why not BungeeCord/Velocity messaging?

BungeeCord and Velocity are proxy solutions that facilitate communication between Minecraft servers, but they are not designed for data synchronization. While they can pass messages between servers, they lack the capability to efficiently manage shared data like auction items.

Redis, on the other hand, is designed for exactly this purpose: providing a shared, fast-access cache that multiple servers can use to ensure data consistency.

### Key Benefits of Redis

1. **In-memory storage** - Data is stored in RAM for instant access
2. **Pub/Sub messaging** - Real-time event propagation across all servers
3. **Atomic operations** - Prevents race conditions and data corruption
4. **Distributed locking** - Ensures only one server can modify an item at a time
5. **Scalability** - Handles thousands of operations per second

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Server 1   │     │  Server 2   │     │  Server 3   │
│zAuctionHouse│     │zAuctionHouse│     │zAuctionHouse│
│+ Redis Addon│     │+ Redis Addon│     │+ Redis Addon│
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌──────▼──────┐
                    │    Redis    │
                    │   Server    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   MySQL /   │
                    │   MariaDB   │
                    └─────────────┘
```

**How it works:**
1. Player lists an item on Server 1
2. Item is saved to MySQL database
3. Redis publishes an event to all servers
4. Servers 2 and 3 receive the event and update their cache
5. Players on all servers see the item instantly

## Next Steps

- [Installation](/zauctionhouse/addons/redis/installation): install Redis and configure the addon on every server
- [Troubleshooting](/zauctionhouse/addons/redis/troubleshooting): fix connection and synchronization issues
