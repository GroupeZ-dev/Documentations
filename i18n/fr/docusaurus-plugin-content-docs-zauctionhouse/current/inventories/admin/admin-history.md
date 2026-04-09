---
sidebar_position: 1
title: Admin Historique Principal
description: Configuration de l'inventaire principal de l'historique admin
---

# Admin Historique Principal

L'inventaire principal de l'historique admin est le hub pour consulter l'historique d'enchères d'un joueur. Depuis ici, les administrateurs peuvent accéder à tous les aspects de l'activité d'enchères d'un joueur.

**Fichier :** `plugins/zAuctionHouse/inventories/admin/admin-history-main.yml`

**Accès :** `/ah admin history <joueur>`

**Permission :** Nécessite la permission administrateur

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/admin-history.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Fonctionnalités

- Voir la tête et les informations du joueur ciblé
- Accéder aux objets expirés
- Accéder aux objets achetés
- Accéder aux objets en vente
- Accéder aux logs d'actions
- Accéder à l'historique des transactions

## Configuration par Défaut

```yaml
name: '#0c1719Admin global history (%target%)'
size: 54

items:

  target:
    type: ZAUCTIONHOUSE_ADMIN_HISTORY_MAIN
    slot: 13
    item:
      player-head: '%target%'
      name: '#2CCED2<bold>%target%'

  expired:
    type: ZAUCTIONHOUSE_ADMIN_HISTORY_EXPIRED
    slot: 28
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjdhYWRmZjlkZGM1NDZmZGNlYzZlZDU5MTljYzM5ZGZhOGQwYzA3ZmY0YmM2MTNhMTlmMmU2ZDdmMjU5MyJ9fX0="
      name: '#2CCED2<bold>ᴇxᴘɪʀᴇᴅ ɪᴛᴇᴍs'
      lore:
        - '#92ffff%target% has #2CCED2%expired-items% #92ffffexpired item%s%.'
        - ''
        - '#8c8c8c• #2CCED2Click #92ffffto open'

  purchased:
    type: ZAUCTIONHOUSE_ADMIN_HISTORY_PURCHASED
    slot: 29
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjM3Y2FlNWM1MWViMTU1OGVhODI4ZjU4ZTBkZmY4ZTZiN2IwYjFhMTgzZDczN2VlY2Y3MTQ2NjE3NjEifX19"
      name: '#2CCED2<bold>ᴘᴜʀᴄʜᴀsᴇᴅ ɪᴛᴇᴍs'
      lore:
        - '#92ffff%target% has #2CCED2%purchased-items% #92ffffbought item%s%.'
        - ''
        - '#8c8c8c• #2CCED2Click #92ffffto open'

  selling:
    type: ZAUCTIONHOUSE_ADMIN_HISTORY_SELLING
    slot: 30
    item:
      url: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjU4MDdjYzRjM2I2OTU4YWVhNjE1NmU4NDUxOGQ5MWE0OWM1ZjMyOTcxZTZlYjI2OWEyM2EyNWEyNzE0NSJ9fX0="
      name: '#2CCED2<bold>sᴀʟᴇ ɪᴛᴇᴍs'
      lore:
        - '#92ffff%target% has #2CCED2%selling-items% #92ffffitem%s% on sale.'
        - ''
        - '#8c8c8c• #2CCED2Click #92ffffto open'

  logs:
    type: ZAUCTIONHOUSE_ADMIN_HISTORY_LOGS
    slot: 33
    item:
      material: SUNFLOWER
      name: '#2CCED2<bold>ʟᴏɢs'
      lore:
        - ''
        - '#8c8c8c• #2CCED2Click #92ffffto open'

  transactions:
    type: ZAUCTIONHOUSE_ADMIN_HISTORY_TRANSACTIONS
    slot: 34
    item:
      material: NETHER_STAR
      name: '#2CCED2<bold>ᴛʀᴀɴsᴀᴄᴛɪᴏɴs'
      lore:
        - ''
        - '#8c8c8c• #2CCED2Click #92ffffto open'
```

## Boutons Utilisés

| Bouton | Type | Description |
|--------|------|-------------|
| `target` | [`ZAUCTIONHOUSE_ADMIN_HISTORY_MAIN`](../buttons#admin-buttons) | Affiche les infos du joueur ciblé |
| `expired` | [`ZAUCTIONHOUSE_ADMIN_HISTORY_EXPIRED`](../buttons#admin-buttons) | Ouvre les objets expirés |
| `purchased` | [`ZAUCTIONHOUSE_ADMIN_HISTORY_PURCHASED`](../buttons#admin-buttons) | Ouvre les objets achetés |
| `selling` | [`ZAUCTIONHOUSE_ADMIN_HISTORY_SELLING`](../buttons#admin-buttons) | Ouvre les objets en vente |
| `logs` | [`ZAUCTIONHOUSE_ADMIN_HISTORY_LOGS`](../buttons#admin-buttons) | Ouvre les logs d'actions |
| `transactions` | [`ZAUCTIONHOUSE_ADMIN_HISTORY_TRANSACTIONS`](../buttons#admin-buttons) | Ouvre les transactions |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%target%` | Nom du joueur ciblé |
| `%expired-items%` | Nombre d'objets expirés du joueur ciblé |
| `%purchased-items%` | Nombre d'objets achetés du joueur ciblé |
| `%selling-items%` | Nombre d'objets en vente du joueur ciblé |
| `%s%` | Suffixe de pluralisation |
