---
sidebar_position: 2
title: Installation
description: How to add CurrenciesAPI to your project
---

# Installation

This guide explains how to add CurrenciesAPI to your Minecraft plugin project.

## Maven

Add the repository and dependency to your `pom.xml`:

```xml
<repositories>
    <repository>
        <id>groupez-repo</id>
        <url>https://repo.groupez.dev/releases</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>fr.traqueur.currencies</groupId>
        <artifactId>currenciesapi</artifactId>
        <version>1.0.11</version>
    </dependency>
</dependencies>
```

## Gradle (Groovy)

```groovy
repositories {
    maven { url 'https://repo.groupez.dev/releases' }
}

dependencies {
    implementation 'fr.traqueur.currencies:currenciesapi:1.0.11'
}
```

## Gradle (Kotlin DSL)

```kotlin
repositories {
    maven { url = uri("https://repo.groupez.dev/releases") }
}

dependencies {
    implementation("fr.traqueur.currencies:currenciesapi:1.0.11")
}
```

## Shading the Library

:::warning Important
You should **relocate** (shade) the library to prevent conflicts when multiple plugins use CurrenciesAPI.
:::

### Maven Shade Plugin

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.5.1</version>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                    <configuration>
                        <relocations>
                            <relocation>
                                <pattern>fr.traqueur.currencies</pattern>
                                <shadedPattern>your.plugin.package.currencies</shadedPattern>
                            </relocation>
                        </relocations>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

### Gradle Shadow Plugin

```kotlin
plugins {
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

tasks.shadowJar {
    relocate("fr.traqueur.currencies", "your.plugin.package.currencies")
}
```

## Verify Installation

After adding the dependency, you should be able to import and use the library:

```java
import fr.traqueur.currencies.Currencies;

public class MyPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        // Test Vault integration
        if (Currencies.VAULT.isEnable()) {
            getLogger().info("Vault economy is available!");
        }
    }
}
```

## Next Steps

- [Usage Guide](usage) - Learn how to use the API
- [Currencies Reference](currencies) - All supported currencies
