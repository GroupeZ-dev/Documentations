---
sidebar_position: 3
title: Commandes & Permissions
description: Liste complète de toutes les commandes et permissions pour zCookieClicker
---

# Commandes & Permissions

Cette page contient la liste complète de toutes les commandes et permissions disponibles dans zCookieClicker.

:::info Guide de Syntaxe
- `< >` indique un argument **requis**.
- `[ ]` indique un argument **optionnel**.
:::

---

## Commandes

| Commande | Alias | Permission | Description |
|----------|-------|------------|-------------|
| `/zcookieclicker` | `cookieclicker`, `cookie` | `zcookieclicker.use` | Ouvrir l'interface Cookie Clicker |
| `/zcookieclicker reload` | - | `zcookieclicker.reload` | Recharger les fichiers de configuration |
| `/zcookieclicker give <joueur> <montant>` | - | `zcookieclicker.give` | Donner des cookies à un joueur |

---

## Détails des Commandes

### Ouvrir Cookie Clicker

```
/cookie
```

Ouvre l'interface principale de Cookie Clicker où les joueurs peuvent :
- Cliquer sur le cookie pour gagner des cookies
- Voir leur nombre de cookies actuel
- Voir leurs cookies par seconde (CPS)
- Accéder au menu des améliorations

### Recharger la Configuration

```
/cookie reload
```

Recharge tous les fichiers de configuration incluant :
- `config.yml`
- `messages.yml`
- Fichiers d'inventaire
- Fichiers de patterns

### Donner des Cookies

```
/cookie give <joueur> <montant>
```

Donne un montant spécifié de cookies à un joueur.

**Exemples :**
```
/cookie give Maxlego08 1000
/cookie give Notch 5000000
```

---

## Permissions

### Permissions Joueur

| Permission | Description |
|------------|-------------|
| `zcookieclicker.use` | Accéder à l'interface Cookie Clicker |

### Permissions Admin

| Permission | Description |
|------------|-------------|
| `zcookieclicker.reload` | Recharger les fichiers de configuration |
| `zcookieclicker.give` | Donner des cookies aux joueurs |
| `zcookieclicker.set` | Définir le nombre de cookies d'un joueur |
| `zcookieclicker.remove` | Retirer des cookies à un joueur |

---

## Exemples de Permissions

### LuckPerms

Donner à un joueur l'accès au cookie clicker :
```
/lp user <joueur> permission set zcookieclicker.use true
```

Donner à un groupe les permissions admin :
```
/lp group admin permission set zcookieclicker.reload true
/lp group admin permission set zcookieclicker.give true
```

### PermissionsEx

```yaml
groups:
  default:
    permissions:
      - zcookieclicker.use
  admin:
    permissions:
      - zcookieclicker.reload
      - zcookieclicker.give
```

---

## Exemples d'Utilisation

### Utilisation Basique par un Joueur

1. Le joueur exécute `/cookie` pour ouvrir l'interface
2. Cliquer sur le cookie pour gagner des cookies
3. Cliquer sur "Améliorations" pour voir les améliorations disponibles
4. Acheter des améliorations pour augmenter le CPS
5. Fermer et rouvrir pour voir les statistiques mises à jour

### Gestion Admin des Cookies

```bash
# Donner 10 000 cookies à un joueur
/cookie give Maxlego08 10000

# Recharger après des changements de configuration
/cookie reload
```
