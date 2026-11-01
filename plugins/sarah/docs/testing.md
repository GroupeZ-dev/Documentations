# Testing databases

Use JDK 21 with the Gradle wrapper. SQLite needs no server:

```powershell
.\gradlew.bat testSqlite
.\gradlew.bat testMariaDb
.\gradlew.bat testMySql
.\gradlew.bat testPostgreSql
```

Server tests require an existing **dedicated, disposable database**: the suite creates and drops tables. Defaults: host `localhost`, database/user/password `sarah`, port `3306` for MySQL/MariaDB and `5432` for PostgreSQL. The tasks do not start or provision servers.

Configure the connection with environment variables (PowerShell example):

```powershell
$env:SARAH_TEST_HOST = "localhost"
$env:SARAH_TEST_PORT = "5433"
$env:SARAH_TEST_DATABASE = "sarah_test"
$env:SARAH_TEST_USER = "sarah"
$env:SARAH_TEST_PASSWORD = "sarah"
.\gradlew.bat testPostgreSql
```

Alternatively use JVM properties, which take priority over environment variables:

```powershell
.\gradlew.bat test "-Dsarah.test.type=POSTGRESQL" "-Dsarah.test.port=5433"
.\gradlew.bat testMariaDb "-Dsarah.test.port=3307"
```

`test` defaults to SQLite; `SARAH_TEST_TYPE` also selects its engine (`SQLITE`, `MARIADB`, `MYSQL`, `POSTGRESQL`, or `POSTGRES`). Named tasks always select their named engine. All tasks run the complete suite, including tests that explicitly use SQLite. Database runs always execute again, without reusing cached test results. Reports are in `build/reports/tests/<task>/index.html`.

### Local connection file

Edit `test-databases.properties` at the repository root to configure each engine separately. This local file is ignored by Git. For a fresh checkout, create it from the committed example:

```powershell
Copy-Item test-databases.properties.example test-databases.properties
```

Use `mariadb.*`, `mysql.*` and `postgresql.*` settings for each server (host, port, database, user, password). SQLite needs no connection settings. Set `type=SQLITE` (or another engine) for the default `test` task. Named tasks such as `testMariaDb` automatically load their engine's settings.

Connection setting priority: `-Dsarah.test.*` > `SARAH_TEST_*` environment variables > local file > built-in defaults. Write values without surrounding quotes; in this Java properties file, literal backslashes must be doubled (`\\`). The file is read as UTF-8.

