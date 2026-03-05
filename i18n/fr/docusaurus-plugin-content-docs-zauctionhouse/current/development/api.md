---
sidebar_position: 1
title: Introduction à l'API
description: Démarrer avec l'API Développeur de zAuctionHouse
---

# API Développeur

zAuctionHouse fournit une API complète pour les développeurs souhaitant s'intégrer au système d'enchères.

## Architecture

zAuctionHouse est construit avec une architecture modulaire :

```
zAuctionHouse/
├── API         # Interfaces et classes abstraites
├── Core        # Implémentation
└── Hooks       # Intégrations tierces
```

Cette séparation vous permet de dépendre uniquement du module API, gardant votre plugin léger.

## Configuration Maven

Ajoutez le repository GroupeZ :

```xml
<repositories>
    <repository>
        <id>groupez-releases</id>
        <name>GroupeZ Repository</name>
        <url>https://repo.groupez.dev/releases</url>
    </repository>
</repositories>
```

Ajoutez la dépendance :

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

## Configuration Gradle

Ajoutez le repository GroupeZ :

```kotlin
repositories {
    maven {
        name = "groupezReleases"
        url = uri("https://repo.groupez.dev/releases")
    }
}
```

Ajoutez la dépendance :

```kotlin
dependencies {
    compileOnly("fr.maxlego08.zauctionhouse:zauctionhousev4-api:4.0.0.0")
}
```

## Obtenir l'API

Accédez à l'API via le gestionnaire de services Bukkit :

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
        // Obtenir l'API zAuctionHouse
        RegisteredServiceProvider<AuctionPlugin> provider =
            Bukkit.getServicesManager().getRegistration(AuctionPlugin.class);

        if (provider == null) {
            getLogger().severe("zAuctionHouse non trouvé !");
            getServer().getPluginManager().disablePlugin(this);
            return;
        }

        this.auctionPlugin = provider.getProvider();
        getLogger().info("Connecté avec succès à zAuctionHouse !");
    }

    public AuctionPlugin getAuctionPlugin() {
        return auctionPlugin;
    }
}
```

## JavaDoc

La documentation complète de l'API est disponible ici :
[ici](https://repo.groupez.dev/javadoc/snapshots/fr/maxlego08/zauctionhouse/zauctionhousev4-api/03b7a81)

## Prochaines Étapes

- [Services](./services) - Découvrir l'architecture basée sur les services
- [Événements](./events) - Écouter les événements d'enchères
- [Objets](./items) - Travailler avec les interfaces Item et AuctionItem
- [Économie Personnalisée](./custom-economy) - Créer des implémentations d'économie personnalisées
