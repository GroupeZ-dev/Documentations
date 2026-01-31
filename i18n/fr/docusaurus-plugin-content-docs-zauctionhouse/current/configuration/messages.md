---
sidebar_position: 2
title: Messages
description: Personnalisez tous les messages dans zAuctionHouse
---

# Configuration des Messages

Tous les messages affichés par zAuctionHouse peuvent être personnalisés dans le fichier `messages.yml`.

## Format des Messages

Les messages supportent :
- **Format MiniMessage** (serveurs Paper) - `<green>`, `<bold>`, `<gradient:green:blue>`
- **Codes de couleur legacy** - `&a`, `&l`, `&6`
- **PlaceholderAPI** - `%player_name%`, `%zauctionhouse_*%`

## Structure des Messages

```yaml
messages:
  prefix: "<gray>[<gold>HôtelDesVentes</gold>]</gray> "

  # Messages de commande
  commands:
    sell:
      success: "<green>Vous avez mis en vente <item> pour <price> !"
      no-item: "<red>Vous devez tenir un objet pour vendre !"
      blacklisted: "<red>Cet objet ne peut pas être vendu !"
      limit-reached: "<red>Vous avez atteint votre limite de mise en vente (<limit>) !"
      price-too-low: "<red>Le prix minimum est <min> !"
      price-too-high: "<red>Le prix maximum est <max> !"

    buy:
      success: "<green>Vous avez acheté <item> pour <price> !"
      not-enough-money: "<red>Vous avez besoin de <price> pour acheter cet objet !"
      own-item: "<red>Vous ne pouvez pas acheter votre propre objet !"
      item-sold: "<red>Cet objet a déjà été vendu !"

    remove:
      success: "<green>Vous avez retiré <item> de l'hôtel des ventes."
      not-owner: "<red>Cet objet ne vous appartient pas !"
```

## Variables Disponibles

Les variables sont automatiquement remplacées dans les messages :

### Variables d'Objet
| Variable | Description |
|----------|-------------|
| `<item>` | Nom de l'objet |
| `<amount>` | Quantité |
| `<price>` | Prix (formaté) |
| `<seller>` | Nom du vendeur |
| `<buyer>` | Nom de l'acheteur |
| `<economy>` | Nom de l'économie |
| `<category>` | Nom de la catégorie |

### Variables Joueur
| Variable | Description |
|----------|-------------|
| `<player>` | Nom du joueur |
| `<limit>` | Limite de mise en vente |
| `<current>` | Nombre actuel de mises en vente |
| `<remaining>` | Emplacements restants |

### Variables de Prix
| Variable | Description |
|----------|-------------|
| `<min>` | Prix minimum |
| `<max>` | Prix maximum |
| `<tax>` | Montant de la taxe |
| `<final>` | Prix final après taxe |

### Variables de Temps
| Variable | Description |
|----------|-------------|
| `<time>` | Temps restant |
| `<expire>` | Temps d'expiration |
| `<duration>` | Durée |

## Exemple Complet de Messages

```yaml
messages:
  # Préfixe global pour tous les messages
  prefix: "<gray>[<gold>HDV</gold>]</gray> "

  # Messages généraux
  general:
    no-permission: "<red>Vous n'avez pas la permission de faire cela !"
    player-only: "<red>Cette commande ne peut être utilisée que par les joueurs !"
    reload: "<green>Configuration rechargée avec succès !"
    invalid-number: "<red>Veuillez entrer un nombre valide !"
    cooldown: "<red>Veuillez attendre <time> avant de refaire cela !"
    banned-world: "<red>Vous ne pouvez pas utiliser l'hôtel des ventes dans ce monde !"

  # Messages de vente
  sell:
    success: "<green>Vous avez mis en vente <white><item></white> pour <gold><price></gold> !"
    holding-air: "<red>Vous devez tenir un objet pour vendre !"
    blacklisted: "<red>Cet objet est en liste noire et ne peut pas être vendu !"
    not-whitelisted: "<red>Cet objet n'est pas autorisé dans l'hôtel des ventes !"
    limit-reached: "<red>Vous avez atteint votre limite de mise en vente ! (<current>/<limit>)"
    price-too-low: "<red>Le prix minimum pour cet objet est <gold><min></gold> !"
    price-too-high: "<red>Le prix maximum pour cet objet est <gold><max></gold> !"
    no-economy-permission: "<red>Vous n'avez pas la permission d'utiliser l'économie <economy> !"
    creative-item: "<red>Vous ne pouvez pas vendre d'objets obtenus en mode créatif !"

  # Messages d'achat
  purchase:
    success: "<green>Vous avez acheté <white><item></white> pour <gold><price></gold> !"
    not-enough-money: "<red>Vous avez besoin de <gold><price></gold> pour acheter cet objet !"
    own-item: "<red>Vous ne pouvez pas acheter votre propre objet !"
    already-sold: "<red>Cet objet a déjà été vendu !"
    inventory-full: "<red>Votre inventaire est plein ! L'objet a été sauvegardé pour plus tard."
    seller-notification: "<green><buyer> a acheté votre <white><item></white> pour <gold><price></gold> !"

  # Messages de retrait
  remove:
    success: "<green>Vous avez retiré <white><item></white> de l'hôtel des ventes."
    not-owner: "<red>Cet objet ne vous appartient pas !"
    expired-claimed: "<green>Vous avez récupéré votre objet expiré : <white><item></white> !"
    purchased-claimed: "<green>Vous avez récupéré : <white><item></white> !"

  # Messages d'expiration
  expire:
    notification: "<yellow>Votre objet <white><item></white> a expiré !"
    warning: "<yellow>Votre objet <white><item></white> va expirer dans <time> !"

  # Messages admin
  admin:
    clear-all: "<green>Supprimé <amount> objets de l'hôtel des ventes."
    clear-player: "<green>Supprimé <amount> objets de <player>."
    expire-player: "<green>Expiré <amount> objets de <player>."

  # Messages d'aide
  help:
    header: "<gold>===== Aide Hôtel des Ventes ====="
    commands:
      - "<yellow>/ah</yellow> - Ouvrir l'hôtel des ventes"
      - "<yellow>/ah sell <prix></yellow> - Vendre l'objet dans votre main"
      - "<yellow>/ah selling</yellow> - Voir vos objets en vente"
      - "<yellow>/ah expired</yellow> - Voir vos objets expirés"
      - "<yellow>/ah purchased</yellow> - Voir les objets achetés à récupérer"
    footer: "<gold>=============================="

  # Format du temps
  time:
    seconds: "<seconds>s"
    minutes: "<minutes>m <seconds>s"
    hours: "<hours>h <minutes>m"
    days: "<days>j <hours>h"
```

## Exemples MiniMessage

Utilisation du formatage MiniMessage (Paper uniquement) :

```yaml
messages:
  # Texte en dégradé
  sell:
    success: "<gradient:green:yellow>Objet mis en vente avec succès !</gradient>"

  # Texte au survol
  help:
    sell: "<hover:show_text:'<gray>Cliquez pour vendre un objet'><yellow>/ah sell</yellow></hover>"

  # Actions au clic
  expired:
    notification: "<click:run_command:'/ah expired'><yellow>Cliquez pour voir les objets expirés !</yellow></click>"

  # Formatage combiné
  purchase:
    seller-notification: |
      <gradient:gold:yellow><bold>OBJET VENDU !</bold></gradient>
      <gray>Acheteur :</gray> <white><buyer></white>
      <gray>Objet :</gray> <white><item></white>
      <gray>Prix :</gray> <gold><price></gold>
```

## Messages par Économie

Configurez les messages par type d'économie :

```yaml
messages:
  economies:
    vault:
      format: "<gold><amount>$</gold>"
      not-enough: "<red>Vous avez besoin de <gold><price>$</gold> !"

    playerpoints:
      format: "<aqua><amount> Points</aqua>"
      not-enough: "<red>Vous avez besoin de <aqua><price> Points</aqua> !"

    experience:
      format: "<green><amount> XP</green>"
      not-enough: "<red>Vous avez besoin de <green><price> XP</green> !"
```

## Désactiver des Messages

Pour désactiver un message, définissez-le comme vide :

```yaml
messages:
  sell:
    success: "" # Aucun message envoyé lors d'une vente réussie
```

## Recharger les Messages

Après avoir modifié `messages.yml`, rechargez avec :

```
/ah admin reload
```
