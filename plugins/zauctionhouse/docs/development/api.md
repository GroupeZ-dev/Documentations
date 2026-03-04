---
sidebar_position: 1
title: API Introduction
description: Getting started with zAuctionHouse Developer API
---

# Developer API

zAuctionHouse provides a comprehensive API for developers to integrate with the auction system.

## Architecture

zAuctionHouse is built with a modular architecture:

```
zAuctionHouse/
├── API         # Interfaces and abstract classes
├── Core        # Implementation
└── Hooks       # Third-party integrations
```

This separation allows you to depend only on the API module, keeping your plugin lightweight.

## Maven Setup

Add the GroupeZ repository:

```xml
<repositories>
    <repository>
        <id>groupez-releases</id>
        <name>GroupeZ Repository</name>
        <url>https://repo.groupez.dev/releases</url>
    </repository>
</repositories>
```

Add the dependency:

```xml
<dependencies>
    <dependency>
        <groupId>fr.maxlego08.zauctionhouse</groupId>
        <artifactId>zauctionhousev4-api</artifactId>
        <version>4.0.0.0</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

## Gradle Setup

Add the GroupeZ repository:

```kotlin
repositories {
    maven {
        name = "groupezReleases"
        url = uri("https://repo.groupez.dev/releases")
    }
}
```

Add the dependency:

```kotlin
dependencies {
    compileOnly("fr.maxlego08.zauctionhouse:zauctionhousev4-api:4.0.0.0")
}
```

## Getting the API

Access the API via Bukkit's service manager:

```java
import fr.maxlego08.zauctionhouse.api.AuctionPlugin;
import fr.maxlego08.zauctionhouse.api.AuctionManager;
import org.bukkit.Bukkit;
import org.bukkit.plugin.RegisteredServiceProvider;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    private AuctionPlugin auctionPlugin;

    @Override
    public void onEnable() {
        // Get the zAuctionHouse API
        RegisteredServiceProvider<AuctionPlugin> provider =
            Bukkit.getServicesManager().getRegistration(AuctionPlugin.class);

        if (provider == null) {
            getLogger().severe("zAuctionHouse not found!");
            getServer().getPluginManager().disablePlugin(this);
            return;
        }

        this.auctionPlugin = provider.getProvider();
        getLogger().info("Successfully hooked into zAuctionHouse!");
    }

    public AuctionPlugin getAuctionPlugin() {
        return auctionPlugin;
    }
}
```

## JavaDoc

Full API documentation is available at:
[here](https://repo.groupez.dev/javadoc/snapshots/fr/maxlego08/zauctionhouse/zauctionhousev4-api/03b7a81)

## Next Steps

- [Services](./services) - Learn about the service-based architecture
- [Events](./events) - Listen to auction events
- [Items](./items) - Work with Item and AuctionItem interfaces
- [Custom Economy](./custom-economy) - Create custom economy implementations
