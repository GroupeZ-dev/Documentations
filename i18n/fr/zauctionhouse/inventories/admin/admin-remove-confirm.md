---
title: Confirmation de Retrait Admin
description: Configuration de l'inventaire de confirmation de retrait d'une annonce par un administrateur
---

# Confirmation de Retrait Admin

L'inventaire de confirmation de retrait admin permet à un administrateur de retirer l'annonce de n'importe quel joueur directement depuis l'hôtel des ventes, en choisissant au préalable si le vendeur est averti, si l'objet est rendu au vendeur et si l'administrateur le reçoit.

**Fichier :** `plugins/zAuctionHouse/inventories/admin/admin-remove-confirm.yml`

**Accès :** Dans l'inventaire principal de l'hôtel des ventes, appuyez sur **Q** (touche jeter) ou faites un **clic molette** sur une annonce

**Permission :** `zauctionhouse.admin.remove.inventory`

## Comment l'ouvrir

1. Ouvrez l'hôtel des ventes (`/ah`).
2. Survolez une annonce et appuyez sur la **touche jeter** (`Q` par défaut) ou faites un **clic molette** dessus.
3. L'inventaire de confirmation s'ouvre avec l'annonce sélectionnée affichée dans l'emplacement du haut.

Cela fonctionne sur les annonces affichées par le bouton [`ZAUCTIONHOUSE_LISTED_ITEMS`](../buttons#zauctionhouse_listed_items) (`auction.yml`), et uniquement pour les annonces actuellement en vente. La vérification a lieu **avant** la prévisualisation des conteneurs : pour une shulker box, Q / clic molette ouvre le retrait admin au lieu de l'aperçu du contenu. Les joueurs sans la permission conservent le comportement normal.

Tant que la confirmation est ouverte, l'annonce est réservée à l'administrateur : elle disparaît de l'hôtel des ventes des autres joueurs et ne peut être ni achetée ni retirée par son vendeur. Fermer l'inventaire ou cliquer sur Annuler la remet en vente.

<CalloutContainer type="info">

<CalloutDescription>
À chaque ouverture de l'inventaire, les options sont réinitialisées à leurs valeurs par défaut : **avertir ON**, **expirer ON**, **copie OFF**. Avec ces valeurs, l'annonce est renvoyée dans les objets expirés du vendeur et le vendeur est averti.
</CalloutDescription>

</CalloutContainer>

## Fonctionnalités

- Prévisualiser l'annonce avant de la retirer
- Choisir si le vendeur est averti
- Choisir si l'objet retourne au vendeur ou est supprimé
- Choisir si l'administrateur reçoit l'objet
- Retrait compatible multi-serveurs (fonctionne avec l'[addon Redis](../../addons/redis/introduction))

## Options de retrait

| Option | Bouton | Défaut | Si ON | Si OFF |
|--------|--------|--------|-------|--------|
| Avertir | `ZAUCTIONHOUSE_ADMIN_REMOVE_NOTIFY` | ON | Le vendeur reçoit le message `admin-listing-removed` | Le vendeur n'est pas prévenu |
| Expirer | `ZAUCTIONHOUSE_ADMIN_REMOVE_EXPIRE` | ON | L'objet est déplacé dans les [Objets Expirés](../expired-items) du vendeur, avec la durée normale `expiration.expire`, pour qu'il puisse le récupérer | L'annonce est supprimée |
| Copie | `ZAUCTIONHOUSE_ADMIN_REMOVE_COPY` | OFF | L'administrateur reçoit l'objet (voir tableau ci-dessous) | L'administrateur ne reçoit rien |

### Résultat de chaque combinaison

| Expirer | Copie | Vendeur | Administrateur |
|---------|-------|---------|----------------|
| ON | OFF | Récupère l'objet dans ses objets expirés | Rien |
| ON | ON | Récupère l'objet dans ses objets expirés | Reçoit une **copie** de l'objet |
| OFF | ON | Perd l'objet | Reçoit **l'objet lui-même** |
| OFF | OFF | Perd l'objet | Rien : l'objet est définitivement supprimé |

L'option **Avertir** est indépendante et peut être combinée avec chacune de ces lignes.

<CalloutContainer type="warning">

<CalloutDescription>
Avec **Expirer OFF** et **Copie OFF**, l'objet est détruit et ne peut pas être récupéré. Avec **Expirer OFF** et **Copie ON**, si l'objet ne peut pas être remis à l'administrateur, il retourne dans les objets récupérables (expirés) du vendeur au lieu d'être perdu.
</CalloutDescription>

</CalloutContainer>

## Que se passe-t-il lors de la confirmation

Lorsque l'administrateur clique sur le bouton de confirmation :

1. Le plugin vérifie que l'annonce est toujours disponible, la verrouille puis la revalide (compatible multi-serveurs). Si l'objet a été vendu ou retiré entre-temps, par exemple sur un autre serveur, l'administrateur reçoit `admin-item-not-available` et rien n'est retiré.
2. L'annonce est retirée selon les options choisies.
3. Un log de type `ADMIN_REMOVE` (affiché **Admin Remove**) est enregistré ; il est visible dans l'inventaire [Admin Logs](./admin-logs).
4. L'administrateur reçoit le message `admin-item-removed`.
5. L'inventaire principal de l'hôtel des ventes se rouvre.

Cliquer sur le bouton d'annulation (`BACK`) ramène à l'hôtel des ventes sans rien retirer, et l'annonce est remise en vente.

### Notification hors ligne

Lorsque **Avertir** est activé et que le vendeur n'est pas connecté sur le serveur où le retrait a lieu, le log `ADMIN_REMOVE` est enregistré comme non lu. Le message `admin-listing-removed` est envoyé au vendeur à sa prochaine connexion, puis le log est marqué comme lu.

## Configuration par Défaut

```yaml
# Chaque option peut être activée ou désactivée indépendamment avant de confirmer.
name: "#0c1719Retirer cette annonce ?"
size: 27
items:
  show:
    type: ZAUCTIONHOUSE_SHOW
    slot: 4
  notify:
    type: ZAUCTIONHOUSE_ADMIN_REMOVE_NOTIFY
    enable-material: BELL
    disable-material: BARRIER
    slot: 11
    item:
      material: '%material%'
      name: "%state-color%Avertir le joueur"
      lore:
        - "#8c8c8cCliquez pour changer"
  expire:
    type: ZAUCTIONHOUSE_ADMIN_REMOVE_EXPIRE
    enable-material: CLOCK
    disable-material: BARRIER
    slot: 13
    item:
      material: '%material%'
      name: "%state-color%Envoyer aux items expirés"
      lore:
        - "#8c8c8cCliquez pour changer"
  copy:
    type: ZAUCTIONHOUSE_ADMIN_REMOVE_COPY
    enable-material: CHEST
    disable-material: BARRIER
    slot: 15
    item:
      material: '%material%'
      name: "%state-color%Donner une copie à l’admin"
      lore:
        - "#8c8c8cCliquez pour changer"
  confirm:
    type: ZAUCTIONHOUSE_ADMIN_REMOVE_CONFIRM
    slot: 21
    item:
      material: LIME_CONCRETE
      name: "#2CCED2Confirmer le retrait"
  cancel:
    type: BACK
    slot: 23
    item:
      material: RED_CONCRETE
      name: "#ff5555Annuler"
```

<CalloutContainer type="info">

<CalloutDescription>
Ce fichier est copié automatiquement au démarrage s'il est absent : les installations existantes le reçoivent sans avoir à régénérer leurs inventaires.
</CalloutDescription>

</CalloutContainer>

## Boutons utilisés

| Bouton | Type | Description |
|--------|------|-------------|
| `show` | [`ZAUCTIONHOUSE_SHOW`](../buttons#zauctionhouse_show) | Affiche l'annonce en cours de retrait |
| `notify` | `ZAUCTIONHOUSE_ADMIN_REMOVE_NOTIFY` | Active ou désactive l'avertissement du vendeur |
| `expire` | `ZAUCTIONHOUSE_ADMIN_REMOVE_EXPIRE` | Bascule entre rendre l'objet au vendeur et le supprimer |
| `copy` | `ZAUCTIONHOUSE_ADMIN_REMOVE_COPY` | Active ou désactive la remise de l'objet à l'administrateur |
| `confirm` | `ZAUCTIONHOUSE_ADMIN_REMOVE_CONFIRM` | Effectue le retrait |
| `cancel` | `BACK` | Annule et revient en arrière |

### Boutons d'option

`ZAUCTIONHOUSE_ADMIN_REMOVE_NOTIFY`, `ZAUCTIONHOUSE_ADMIN_REMOVE_EXPIRE` et `ZAUCTIONHOUSE_ADMIN_REMOVE_COPY` partagent la même configuration. Un clic sur le bouton inverse son état et rafraîchit l'inventaire.

| Option | Défaut | Description |
|--------|--------|-------------|
| `enable-material` | `PAPER` | Matériau utilisé quand l'option est ON |
| `disable-material` | `BARRIER` | Matériau utilisé quand l'option est OFF |

**Placeholders :**

| Placeholder | Description |
|-------------|-------------|
| `%material%` | `enable-material` ou `disable-material` selon l'état actuel. À utiliser sous la forme `item.material: '%material%'` |
| `%state-color%` | `#55ff55` si ON, `#ff5555` si OFF |
| `%enabled%` | `true` ou `false` |

### ZAUCTIONHOUSE_ADMIN_REMOVE_CONFIRM

Retire l'annonce affichée par `ZAUCTIONHOUSE_SHOW` en utilisant l'état actuel des trois options. Il n'a aucune option spécifique. Si l'annonce n'est plus en vente au moment du clic, l'inventaire principal de l'hôtel des ventes se rouvre simplement.

## Messages

| Clé | Envoyé à | Défaut (français) |
|-----|----------|-------------------|
| `admin-listing-removed` | Vendeur (immédiatement, ou à sa prochaine connexion s'il est hors ligne) | `<error>Votre annonce <white>%items%<error> a été retirée par un administrateur.` |
| `admin-item-removed` | Administrateur | `<success>Vous avez retiré <white>%items%<success> de <white>%target%<success>.` |
| `admin-item-not-available` | Administrateur | `<error>L'item <white>%items%<error> n'est plus disponible : il a été vendu, récupéré ou supprimé sur un autre serveur.` |

Les messages se configurent dans `messages.yml` (voir [Messages](../../configuration/messages)).
