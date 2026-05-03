---
sidebar_position: 11
title: Contenu du Shulker
description: Configuration de l'inventaire de previsualisation du contenu du shulker
---

# Inventaire du Contenu du Shulker

L'inventaire du contenu du shulker affiche le contenu des boites shulker en vente, permettant aux acheteurs de previsualiser ce qu'elles contiennent avant d'acheter.

**Fichier :** `plugins/zAuctionHouse/inventories/shulker-content.yml`

**Acces :** Cliquer sur le bouton "Voir le Contenu du Shulker" dans la confirmation d'achat/retrait

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/shulker-preview.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/shulker-box.gif" alt="Description" style={{ width: '420px', height: 'auto' }} />
</div>

## Fonctionnalites

- Previsualiser tous les objets a l'interieur des boites shulker
- Naviguer entre plusieurs shulkers (ventes groupees)
- Mode consultation uniquement - les objets ne peuvent pas etre pris

## Configuration par defaut

```yaml
name: "#0c1719Shulker Content (%shulker-current%/%shulker-total%)"
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-back'

items:

  content:
    type: ZAUCTIONHOUSE_SHULKER_CONTENT
    slots:
      - 9-17
      - 18-26
      - 27-35
      - 36-44

  shulker-info:
    type: ZAUCTIONHOUSE_SHULKER_INFO
    slot: 4
    item:
      material: SHULKER_BOX
      name: "#2CCED2<bold>sʜᴜʟᴋᴇʀ ʙᴏx"
      lore:
        - "#92ffffViewing shulker #2CCED2%shulker_current% #92ffffof #2CCED2%shulker_total%"
        - ""
        - "#8c8c8c• Use navigation buttons to switch"

  previous:
    type: ZAUCTIONHOUSE_SHULKER_NAVIGATION
    direction: previous
    slot: 48
    item:
      material: ARROW
      name: "#2CCED2<bold>ᴘʀᴇᴠɪᴏᴜs sʜᴜʟᴋᴇʀ"
      lore:
        - "#92ffffView the previous shulker box."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto view previous"

  next:
    type: ZAUCTIONHOUSE_SHULKER_NAVIGATION
    direction: next
    slot: 50
    item:
      material: ARROW
      name: "#2CCED2<bold>ɴᴇxᴛ sʜᴜʟᴋᴇʀ"
      lore:
        - "#92ffffView the next shulker box."
        - ""
        - "#8c8c8c• #2CCED2Click #92ffffto view next"
```

## Boutons utilises

| Bouton | Type | Description |
|--------|------|-------------|
| `content` | [`ZAUCTIONHOUSE_SHULKER_CONTENT`](./buttons#zauctionhouse_shulker_content) | Affiche le contenu du shulker |
| `shulker-info` | [`ZAUCTIONHOUSE_SHULKER_INFO`](./buttons#zauctionhouse_shulker_info) | Affiche les informations du shulker |
| `previous` | [`ZAUCTIONHOUSE_SHULKER_NAVIGATION`](./buttons#zauctionhouse_shulker_navigation) | Shulker precedent |
| `next` | [`ZAUCTIONHOUSE_SHULKER_NAVIGATION`](./buttons#zauctionhouse_shulker_navigation) | Shulker suivant |

## Motifs utilises

| Motif | Description |
|-------|-------------|
| `zauctionhouse-decoration` | Bordures en vitres |
| `zauctionhouse-back` | Bouton retour |

## Placeholders

| Placeholder | Description |
|-------------|-------------|
| `%shulker-current%` | Numero du shulker actuellement consulte (commence a 1) |
| `%shulker-total%` | Nombre total de shulkers dans la vente |
| `%shulker_current%` | Identique au precedent (format alternatif) |
| `%shulker_total%` | Identique au precedent (format alternatif) |

## Shulkers multiples

Lorsqu'une vente groupee contient plusieurs boites shulker, les joueurs peuvent naviguer entre elles a l'aide des boutons precedent/suivant.

Les boutons de navigation ne sont actifs que lorsqu'il y a plusieurs shulkers :
- **Precedent** : Desactive sur le premier shulker
- **Suivant** : Desactive sur le dernier shulker
