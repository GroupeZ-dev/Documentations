---
sidebar_position: 6
title: Admin Transactions
description: Admin transactions inventory configuration
---

# Admin Transactions

The admin transactions inventory displays transaction history for a player. Transactions are records of completed sales with financial details.

**File:** `plugins/zAuctionHouse/inventories/admin/admin-transactions.yml`

**Access:** From admin history main menu → Transactions button

**Permission:** Requires admin permission

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="https://img.groupez.dev/zauctionhouse/v4/admin-transactions.png" alt="Description" style={{ width: '600px', height: 'auto' }} />
</div>

## Transaction Status

| Status | Description |
|--------|-------------|
| `PENDING` | Money has not yet been claimed by the seller |
| `RETRIEVED` | Money has been claimed/deposited to the seller |

## Features

- View all completed transactions
- Filter by transaction status
- Filter by date range
- See buyer/seller information

## Default Configuration

```yaml
name: '#0c1719Admin transactions (%page%/%max-page%)'
size: 54

patterns:
  - 'zauctionhouse-decoration'
  - 'zauctionhouse-pagination'
  - 'zauctionhouse-back'

items:

  items:
    type: ZAUCTIONHOUSE_ADMIN_TRANSACTIONS
    loading-slot: 22
    slots:
      - 9-17
      - 18-26
      - 27-35
      - 36-44
    item:
      material: BARRIER
      name: "#ff0000Loading..."
    else:
      slots:
        - 22
      item:
        material: BARRIER
        name: '#ff0000&nNo Sales Found'
        lore:
          - ''
          - '&7You have not sold any items yet.'

  filter-status:
    type: ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_STATUS
    slot: 47
    enable-text: ' #F27438➜ %status%'
    disable-text: ' #76CDCD➜ %status%'
    all-statuses-name: "All"
    statuses:
      - PENDING
      - RETRIEVED
    status-names:
      PENDING: "Pending"
      RETRIEVED: "Retrieved"
    item:
      material: HOPPER
      name: '#2CCED2<bold>ғɪʟᴛᴇʀ ʙʏ sᴛᴀᴛᴜs'
      lore:
        - '#92ffffAvailable statuses:'
        - '%ALL%'
        - '%PENDING%'
        - '%RETRIEVED%'
        - ''
        - '#8c8c8c• #2CCED2Click #92ffffto change the filter status'

  filter-date:
    type: ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_DATE
    slot: 51
    enable-text: ' #F27438➜ %date%'
    disable-text: ' #76CDCD➜ %date%'
    filters:
      - ALL
      - TODAY
      - THIS_WEEK
      - THIS_MONTH
      - THIS_YEAR
    filter-names:
      ALL: "All Time"
      TODAY: "Today"
      THIS_WEEK: "This Week"
      THIS_MONTH: "This Month"
      THIS_YEAR: "This Year"
    item:
      material: CLOCK
      name: '#2CCED2<bold>ғɪʟᴛᴇʀ ʙʏ ᴅᴀᴛᴇ'
      lore:
        - '#92ffffAvailable filters:'
        - '%ALL%'
        - '%TODAY%'
        - '%THIS_WEEK%'
        - '%THIS_MONTH%'
        - '%THIS_YEAR%'
        - ''
        - '#8c8c8c• #2CCED2Click #92ffffto change the date filter'
```

## Buttons Used

| Button | Type | Description |
|--------|------|-------------|
| `items` | [`ZAUCTIONHOUSE_ADMIN_TRANSACTIONS`](../buttons#admin-buttons) | Displays transaction entries |
| `filter-status` | [`ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_STATUS`](../buttons#admin-buttons) | Filters by status |
| `filter-date` | [`ZAUCTIONHOUSE_ADMIN_TRANSACTIONS_FILTER_DATE`](../buttons#admin-buttons) | Filters by date range |

## Date Filters

| Filter | Description |
|--------|-------------|
| `ALL` | All time |
| `TODAY` | Today only |
| `THIS_WEEK` | Last 7 days |
| `THIS_MONTH` | Last 30 days |
| `THIS_YEAR` | Last 365 days |
