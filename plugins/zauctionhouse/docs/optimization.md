---
sidebar_position: 7
title: Optimization
description: Discover how zAuctionHouse is optimized for large-scale servers
---

# Optimization

zAuctionHouse has been designed and developed from the ground up to handle **very large servers**. Performance has been a core priority throughout the entire development process, not an afterthought.

## Built for Scale

Whether you're running a small survival server with a few dozen players or a massive network with thousands of concurrent players, zAuctionHouse is engineered to maintain optimal performance under any load.

### Design Philosophy

- **Async-first architecture** - All database operations run asynchronously to never block the main thread
- **Efficient data structures** - Carefully chosen algorithms and data structures for minimal memory footprint
- **Smart caching** - Intelligent caching strategies reduce database queries
- **Lazy loading** - Data is loaded only when needed, reducing startup time and memory usage
- **Connection pooling** - Optimized database connection management for high throughput

## Internal Performance Tools

zAuctionHouse includes built-in tools for developers and server administrators to measure and monitor performance.

### Debug Mode

Enable debug mode in the configuration to see detailed performance metrics:

```yaml
debug: true
```

This activates internal timing measurements that help identify any performance bottlenecks.

### Test Data Generator

The plugin includes a powerful test data generator that allows you to create large amounts of test items to stress-test your server configuration.

**Command:**
```
/zah admin generate <amount>
```

This command generates fake auction items, allowing you to test how your server handles large volumes of data before going live.

:::warning
Only use this command in a test environment! Generated items should be cleared before production use.
:::

## Performance Benchmarks

We have conducted extensive benchmarks to ensure zAuctionHouse performs well under heavy load.

### Sorting 100,000 Items

One of the most demanding operations in an auction house is sorting large numbers of items for display. We tested sorting **100,000 items** simultaneously.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/opti.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

| Metric | Result |
|--------|--------|
| **Items sorted** | 100,000 |
| **Time taken** | 45ms |
| **Operation** | Full sort with filters |

### Test Environment

The benchmark was conducted on the following hardware:

| Component | Specification            |
|-----------|--------------------------|
| **Operating System** | Windows 11               |
| **Processor** | AMD Ryzen 7 5700X 8-Core |
| **Server RAM** | 4 GB allocated           |
| **Java Version** | Java 21                  |
| **Server Software** | Paper 1.21.11            |

:::info
These benchmarks were performed with default plugin settings. Performance may vary based on your specific configuration and hardware.
:::

## Real-World Performance

zAuctionHouse is actively used on some of the largest Minecraft networks, handling:

- **Thousands of concurrent players**
- **Hundreds of thousands of active listings**
- **Millions of transactions per month**

### Optimization Techniques Used

1. **Indexed database queries** - All frequently accessed columns are properly indexed
2. **Batch operations** - Multiple database operations are batched together when possible
3. **Memory-efficient serialization** - Items are serialized using optimized byte formats
4. **Thread-safe operations** - Concurrent access is handled efficiently without locks where possible
5. **Pagination** - Large result sets are paginated to reduce memory pressure
6. **Selective placeholder resolution** - Item lore placeholders are pre-detected at configuration load time. At render time, only the placeholders actually referenced in the lore template are computed. For example, the default `expired-item` lore only uses `%time-remaining%`, so the plugin skips computing `%price%`, `%seller%`, `%status%`, and all other placeholders — saving CPU and memory per item rendered

## Monitoring

### Server TPS

Monitor your server TPS when the auction house is heavily used. zAuctionHouse should have minimal impact on TPS due to its async design.

### Database Performance

For MySQL/MariaDB, monitor:
- Connection pool usage
- Query execution time
- Table sizes

### Memory Usage

The plugin is designed to be memory-efficient, but monitoring Java heap usage during peak times is recommended for very large installations.

## Conclusion

zAuctionHouse is not just another auction house plugin - it's a performance-engineered solution built for the demands of modern, large-scale Minecraft servers. The 45ms sorting time for 100,000 items demonstrates our commitment to delivering a plugin that won't slow down your server, no matter how popular your auction house becomes.
