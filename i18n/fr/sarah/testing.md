# Tests par moteur

Utilisez Java 21 et une base dédiée aux tests : les tables sont créées et supprimées. Les serveurs doivent être démarrés au préalable. SQLite ne nécessite pas de serveur.

```powershell
.\gradlew.bat testSqlite
.\gradlew.bat testMariaDb
.\gradlew.bat testMySql
.\gradlew.bat testPostgreSql
```

Copiez `test-databases.properties.example` vers `test-databases.properties` à la racine de Sarah. Ce fichier est ignoré par Git. Renseignez les clés `mariadb.host`, `mariadb.port`, `mariadb.database`, `mariadb.user`, `mariadb.password`, puis les mêmes clés avec les préfixes `mysql` et `postgresql` pour les autres moteurs. SQLite ne nécessite pas de paramètres de connexion.

`type=SQLITE` choisit le moteur de la tâche `test`. Les tâches nommées sélectionnent toujours leur propre moteur. Types acceptés : SQLITE, MYSQL, MARIADB, POSTGRESQL et l'alias POSTGRES.

Priorité des paramètres : `-Dsarah.test.*` > variables `SARAH_TEST_*` > fichier local > valeurs par défaut. Les suffixes disponibles sont type, host, port, database, user et password. Valeurs par défaut : localhost, base/utilisateur/mot de passe sarah, port 3306 pour MySQL/MariaDB et 5432 pour PostgreSQL.

```powershell
.\gradlew.bat testMariaDb "-Dsarah.test.port=3307"
$env:SARAH_TEST_PASSWORD = "local-password"
.\gradlew.bat testPostgreSql
```

Le fichier utilise UTF-8 et le format Java properties : valeurs sans guillemets, antislashs littéraux doublés. Chaque tâche relance les tests sans cache de résultats. Rapports : `build/reports/tests/<task>/index.html`.

La suite complète est exécutée pour chaque tâche ; certains tests vérifient uniquement la génération SQL ou utilisent explicitement SQLite. Un résultat global réussi ne signifie donc pas que chaque test a interrogé le serveur sélectionné.
