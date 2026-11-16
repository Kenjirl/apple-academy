---
title: Kickbid
tagline: A sneaker auction app - browse live drops, bid fast, and see if you're leading or outbid.
kind: ios-app
order: 6
period: Apr 2026
date: 2026-04
phase: Apple Developer Academy · Challenge 2
team: Team of 2
role: Auction detail, Place Bid sheet, New Auction form, charts and formatting; integration and PR review
platform: iPhone · iOS 26.2+
accent: "#D4FF3A"
accentOnLight: "#4F6B00"
accentOnDark: "#D4FF3A"
icon: ../../assets/projects/kickbid/icon.png
screenshots:
  - src: ../../assets/projects/kickbid/01-drops.jpg
    alt: Drops screen with search, filters and an Ending Soon hero card
    caption: Drops - search, filters and the auction ending soonest.
  - src: ../../assets/projects/kickbid/02-detail.jpg
    alt: Auction detail with a large photo, live countdown and the top bid
    caption: Auction detail with a live countdown and your status.
  - src: ../../assets/projects/kickbid/03-detail-price-chart.jpg
    alt: Step chart of the auction price rising over time with the user's bids marked
    caption: Price history as a step chart, with your bids marked.
  - src: ../../assets/projects/kickbid/04-detail-daily-bids.jpg
    alt: Bar chart of bids per day with the busiest day highlighted
    caption: Bids per day, busiest day highlighted.
  - src: ../../assets/projects/kickbid/06-activity.jpg
    alt: Activity list filtered by Bidding, Won and Lost with a Bid again button
    caption: Activity - Bidding, Won and Lost, with "Bid again".
  - src: ../../assets/projects/kickbid/05-selling.jpg
    alt: Selling summary with active auctions, total bids and highest value
    caption: Selling - your own auctions at a glance.
  - src: ../../assets/projects/kickbid/07-new-auction.jpg
    alt: New Auction form with photo picker, name, opening price, description and end time
    caption: Creating a new auction.
stack: [SwiftUI, Swift Charts, Observation, PhotosUI, TimelineView]
links:
  - { label: GitHub repo, url: "https://github.com/Kenjirl/swift-bidding-app" }
---

## Overview

Kickbid is a **sneaker auction** app. Browse the drops that are live, place a bid in a few taps, keep track of whether you're leading or outbid, and open an auction for your own pair. Prices are in Rupiah.

## My role

Built with one teammate. **I built** the auction detail screen, the Place Bid sheet, the New Auction form, both charts and the formatting utilities, and handled integration and PR review. My teammate built the tab structure, the auction and My Items lists, and the first version of bid history. Later, for this portfolio, I redesigned the UI ("Hype Drop") and the app icon.

## Key features

- The home screen highlights the auction that ends soonest with a countdown that updates every second, followed by a grid of all auctions with filters (All, Live, Ending soon, Ended) and search.
- Every auction shows where you stand: Leading, Outbid, Won or Lost, or Selling and Sold for your own pairs. The status is calculated from the bid history, so it always matches the latest bid.
- The auction page has two charts: the price over time, which only goes up and marks your bids, and the number of bids per day.
- You can raise a bid with -/+ buttons in Rp 50,000 steps, quick buttons for +50k to +500k, or by typing an amount. Bids are checked before they are placed, and a haptic confirms them.
- The Activity tab lists every auction you've bid on, filtered by Bidding, Won and Lost, with a "Bid again" button when you've been outbid.
- The Selling tab sums up your own auctions and has a form to start a new one with a photo.

## Tech stack

SwiftUI (`TabView`, `NavigationStack`, `LazyVGrid`, `Grid`, `sensoryFeedback`, `contentTransition`), Swift Charts (step `LineMark`/`AreaMark`, `PointMark`, `BarMark`), `TimelineView` for countdowns, Observation (`@Observable` store), PhotosUI, `Decimal.FormatStyle` with the `id_ID` locale. No third-party dependencies.

## Limitations

- Data lives in memory with sample auctions and one fixed user - no accounts, storage or backend yet.
- Other people's bids don't arrive in real time; bids can't be cancelled.

## Can be next

A backend with WebSocket for real-time bids, push alerts when you're outbid, SwiftData storage, auto-bid, and unit tests for the bidding rules.
