---
sidebar_position: 1
title: Informations
description: Informations essentielles sur la configuration de zMenu
---

# Informations de configuration

Cette page fournit des informations essentielles sur la configuration de zMenu et la comprehension de sa philosophie de configuration.

## Comprendre YAML

zMenu utilise YAML (YAML Ain't Markup Language) pour tous ses fichiers de configuration. Si vous etes nouveau avec YAML, voici quelques points importants a connaitre :

### Regles YAML de base

1. **L'indentation compte** - Utilisez des espaces (pas des tabulations) pour l'indentation
2. **Espacement coherent** - Utilisez 2 espaces par niveau d'indentation
3. **Sensible a la casse** - `Material` est different de `material`
4. **Les deux-points necessitent des espaces** - `key: value` et non `key:value`

### Exemple de structure

```yaml
# Ceci est un commentaire
inventory-name: "Mon Inventaire"    # Valeur texte
size: 54                            # Valeur numerique
enabled: true                       # Valeur booleenne

items:                              # Debut d'une section
  mon-bouton:                       # Nom du bouton (cle)
    slot: 0                         # Propriete de mon-bouton
    item:                           # Section imbriquee
      material: DIAMOND
      name: "&bDiamant"
```

### Outils utiles

- **Validateur YAML** : [YAML Lint](http://www.yamllint.com/) - Verifiez votre syntaxe YAML
- **Extension VS Code** : YAML par Red Hat - Coloration syntaxique et validation
- **Notepad++** : Editeur leger avec support YAML

## Philosophie de configuration

zMenu suit une approche de configuration modulaire :

### Organisation des fichiers

```
plugins/zMenu/
├── config.yml                 # Parametres globaux
├── global-placeholders.yml    # Valeurs partagees
├── commands/                  # Definitions des commandes
│   └── commands.yml
├── inventories/               # Vos menus
│   ├── menu1.yml
│   └── sousdossier/
│       └── menu2.yml
├── patterns/                  # Modeles reutilisables
├── items/                     # Items reutilisables
└── actions_patterns/          # Actions par defaut
```

### Principes cles

1. **Un inventaire par fichier** - Chaque fichier YAML dans `inventories/` definit un inventaire
2. **Sous-dossiers supportes** - Organisez les inventaires dans des sous-dossiers
3. **Reutilisabilite** - Utilisez les patterns et items pour eviter les repetitions
4. **Rechargement a chaud** - Utilisez `/zm reload` pour appliquer les changements sans redemarrage

## Codes couleur

zMenu supporte plusieurs formats de codes couleur :

### Codes couleur classiques

En utilisant le symbole `&` :

| Code | Couleur | Code | Couleur |
|------|---------|------|---------|
| `&0` | Noir | `&8` | Gris fonce |
| `&1` | Bleu fonce | `&9` | Bleu |
| `&2` | Vert fonce | `&a` | Vert |
| `&3` | Cyan fonce | `&b` | Cyan |
| `&4` | Rouge fonce | `&c` | Rouge |
| `&5` | Violet fonce | `&d` | Violet clair |
| `&6` | Or | `&e` | Jaune |
| `&7` | Gris | `&f` | Blanc |

### Codes de formatage

| Code | Effet |
|------|-------|
| `&l` | **Gras** |
| `&o` | *Italique* |
| `&n` | <u>Souligne</u> |
| `&m` | ~~Barre~~ |
| `&k` | Brouille |
| `&r` | Reinitialiser |

### Couleurs hexadecimales

```yaml
name: "&#FF5555Ceci est rouge &#55FF55et ceci est vert"
```

### MiniMessage (Paper/Purpur)

Si vous utilisez Paper, Purpur ou Pufferfish, vous pouvez activer le format MiniMessage dans `config.yml` :

```yaml
enable-mini-message-format: true
```

Puis utilisez la syntaxe MiniMessage :

```yaml
name: "<gradient:red:blue>Texte en degrade</gradient>"
lore:
  - "<rainbow>Texte arc-en-ciel !</rainbow>"
  - "<bold><gold>Texte or en gras</gold></bold>"
  - "<click:run_command:/spawn>Cliquez pour spawn</click>"
```

## Placeholders

zMenu supporte les placeholders dans toutes vos configurations :

### PlaceholderAPI

Tout placeholder PlaceholderAPI fonctionne dans zMenu :

```yaml
name: "&6Profil de %player_name%"
lore:
  - "&7Solde : &a$%vault_eco_balance%"
  - "&7Niveau : &e%player_level%"
```

### Placeholders integres zMenu

| Placeholder | Description |
|-------------|-------------|
| `%player%` | Nom du joueur |
| `%page%` | Numero de page actuel |
| `%maxPage%` ou `%max-page%` | Pages totales |
| `%zmenu_player_page%` | Page actuelle |
| `%zmenu_player_max_page%` | Page maximum |

Voir la [page Placeholders](./placeholders) pour la liste complete.

## Recharger les configurations

Apres avoir effectue des modifications, rechargez vos configurations :

```
/zm reload                    # Tout recharger
/zm reload config             # Recharger config.yml uniquement
/zm reload inventory [nom]    # Recharger un inventaire specifique
/zm reload command [nom]      # Recharger une commande specifique
```

:::tip
Utilisez `/zm reload inventory <nom>` lors du test de modifications sur un inventaire specifique - c'est plus rapide que de tout recharger.
:::

## Erreurs courantes

### 1. Indentation incorrecte

```yaml
# Faux
items:
my-button:
  slot: 0

# Correct
items:
  my-button:
    slot: 0
```

### 2. Guillemets manquants pour les caracteres speciaux

```yaml
# Faux - causera une erreur d'analyse
name: &6Mon Menu

# Correct
name: "&6Mon Menu"
```

### 3. Caracteres de tabulation

YAML n'autorise pas les tabulations. Utilisez toujours des espaces :

```yaml
# Faux (tabulations)
items:
→ my-button:
→ → slot: 0

# Correct (espaces)
items:
  my-button:
    slot: 0
```

### 4. Cles dupliquees

```yaml
# Faux - le second 'slot' ecrase le premier
my-button:
  slot: 0
  slot: 1

# Correct
my-button:
  slot: 0
another-button:
  slot: 1
```

## Encodage des fichiers

Sauvegardez toujours vos fichiers avec **l'encodage UTF-8** pour supporter correctement :
- Les caracteres speciaux
- Le texte non anglais
- Les codes couleur

La plupart des editeurs de texte modernes utilisent UTF-8 par defaut, mais verifiez les parametres de votre editeur si vous rencontrez des problemes avec les caracteres speciaux.

## Prochaines etapes

Maintenant que vous comprenez les bases :

1. Apprenez les [Commandes et Permissions](./commands-permissions)
2. Explorez les [Placeholders](./placeholders) disponibles
3. [Creez votre premier inventaire](./inventories/create-inventory)
