---
sidebar_position: 4
title: Items
description: Working with Item and AuctionItem interfaces in zAuctionHouse
---

# Items

zAuctionHouse uses a clean abstraction layer for items. Understanding the `Item` and `AuctionItem` interfaces is essential for API integration.

## Sale Architecture

All sales within zAuctionHouse are managed through the `Item` interface. This interface serves as the foundation for every type of transaction in the plugin.

Each sale type extends the `Item` interface to add its specific behavior and data. Currently, the plugin implements `AuctionItem` for standard fixed-price listings. Future updates will introduce additional sale types that follow the same pattern:

- **AuctionItem** - Fixed-price instant purchase listings (currently available)
- **BidItem** - Auction-style listings with bidding system (planned)
- **RentItem** - Rental listings with time-based access (planned)

This inheritance model ensures consistent behavior across all sale types while allowing each implementation to define its own specific logic and properties.