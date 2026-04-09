---
sidebar_position: 13
title: Confirmation d'Achat en Masse
description: Configuration de l'inventaire de confirmation d'achat en masse
---

# Confirmation d'Achat en Masse

L'inventaire de confirmation d'achat en masse confirme l'achat de plusieurs objets (ventes groupees). Il affiche tous les objets de la vente avec une previsualisation avant l'achat.

**Fichier :** `plugins/zAuctionHouse/inventories/confirms/purchase-inventory-confirm.yml`

**Acces :** S'ouvre automatiquement lorsqu'on clique sur un lot d'objets a acheter (indique par une icone de coffre)

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/purchase-items.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Fonctionnalites

- Previsualiser tous les objets de la vente groupee
- Voir le contenu des shulkers (si applicable)
- Un seul clic pour confirmer l'achat de tous les objets

## Configuration par defaut

```yaml
name: "#0c1719Purchase these items ?"
size: 54

patterns:
  - 'zauctionhouse-decoration'

items:

  item-content:
    type: ZAUCTIONHOUSE_ITEM_CONTENT
    slots:
      - 9-44

  confirm:
    type: ZAUCTIONHOUSE_CONFIRM_PURCHASE
    slots:
      - 46-48
    item:
      material: GREEN_STAINED_GLASS_PANE
      name: "#2CCED2<bold>ᴘᴜʀᴄʜᴀsᴇ"
      lore:
        - "#92ffffPurchase this item."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto purchase"

  deny:
    type: BACK
    slots:
      - 50-52
    item:
      material: RED_STAINED_GLASS_PANE
      name: "#2CCED2<bold>ʙᴀᴄᴋ"
      lore:
        - "#92ffffGo back."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto go back"

  shulker:
    type: ZAUCTIONHOUSE_SHULKER_OPEN
    slot: 49
    item:
      material: SHULKER_BOX
      name: "#2CCED2<bold>ᴠɪᴇᴡ sʜᴜʟᴋᴇʀ ᴄᴏɴᴛᴇɴᴛ"
      lore:
        - "#92ffffView the content of shulker boxes."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto view content"
```

## Boutons utilises

| Bouton | Type | Description |
|--------|------|-------------|
| `item-content` | [`ZAUCTIONHOUSE_ITEM_CONTENT`](./buttons#zauctionhouse_item_content) | Affiche tous les objets de la vente groupee |
| `confirm` | [`ZAUCTIONHOUSE_CONFIRM_PURCHASE`](./buttons#zauctionhouse_confirm_purchase) | Confirme l'achat de tous les objets |
| `deny` | `BACK` | Retourne a l'hotel des ventes |
| `shulker` | [`ZAUCTIONHOUSE_SHULKER_OPEN`](./buttons#zauctionhouse_shulker_open) | Ouvre la previsualisation du shulker |

## Difference avec la confirmation d'objet unique

| Caracteristique | Objet unique | Objets groupes |
|-----------------|--------------|----------------|
| Inventaire | `purchase-confirm.yml` | `purchase-inventory-confirm.yml` |
| Taille | 27 emplacements (3 lignes) | 54 emplacements (6 lignes) |
| Affichage de l'objet | Un seul objet au centre | Tous les objets dans une grille de 36 emplacements |
| Type de bouton | `ZAUCTIONHOUSE_SHOW` | `ZAUCTIONHOUSE_ITEM_CONTENT` |
