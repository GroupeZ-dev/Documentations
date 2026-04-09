---
sidebar_position: 10
title: Confirmation de Retrait
description: Configuration de l'inventaire de confirmation de retrait
---

# Inventaire de Confirmation de Retrait

L'inventaire de confirmation de retrait demande aux vendeurs de confirmer le retrait de leur objet de la vente.

**Fichier :** `plugins/zAuctionHouse/inventories/confirms/remove-confirm.yml`

**Acces :** S'ouvre automatiquement lorsqu'un vendeur clique sur son propre objet en vente (si `open-confirm-inventory` est `true`)

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/remove-confirm.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Fonctionnalites

- Previsualiser l'objet avant le retrait
- Voir le contenu des shulkers (si applicable)
- Confirmer ou annuler le retrait

## Que se passe-t-il lors du retrait

Lorsqu'un objet est retire de la vente :
- Il est deplace vers l'inventaire [Objets Expires](./expired-items)
- Le joueur peut le recuperer depuis cet inventaire

## Configuration par defaut

```yaml
name: "#0c1719Remove this item?"
size: 27

items:

  remove:
    type: ZAUCTIONHOUSE_CONFIRM_REMOVE_LISTED
    slots:
      - 0-2
      - 9-11
      - 18-20
    item:
      material: GREEN_STAINED_GLASS_PANE
      name: "#2CCED2<bold>ʀᴇᴍᴏᴠᴇ"
      lore:
        - "#92ffffRemove this item."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto remove"

  deny:
    type: BACK
    slots:
      - 6-8
      - 15-17
      - 24-26
    item:
      material: RED_STAINED_GLASS_PANE
      name: "#2CCED2<bold>ʙᴀᴄᴋ"
      lore:
        - "#92ffffGo back."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto go back"

  decoration:
    slots:
      - 3-5
      - 12
      - 14
      - 21-23
    item:
      material: LIGHT_BLUE_STAINED_GLASS_PANE
      name: "#2CCED2"

  show:
    type: ZAUCTIONHOUSE_SHOW
    slot: 13

  shulker:
    type: ZAUCTIONHOUSE_SHULKER_OPEN
    slot: 4
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
| `remove` | [`ZAUCTIONHOUSE_CONFIRM_REMOVE_LISTED`](./buttons#zauctionhouse_confirm_remove_listed) | Confirme le retrait |
| `deny` | `BACK` | Retourne a l'hotel des ventes |
| `decoration` | (statique) | Decoration visuelle |
| `show` | [`ZAUCTIONHOUSE_SHOW`](./buttons#zauctionhouse_show) | Affiche l'objet |
| `shulker` | [`ZAUCTIONHOUSE_SHULKER_OPEN`](./buttons#zauctionhouse_shulker_open) | Ouvre la previsualisation du shulker |

## Desactiver la confirmation

Pour desactiver la boite de dialogue de confirmation et retirer les objets directement :

```yaml
# In config.yml
open-confirm-inventory: false
```
