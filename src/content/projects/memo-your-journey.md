---
title: Memo Your Journey
tagline: A travel journal - save memories with photos, places and tags, then browse them on a photo calendar.
kind: ios-app
order: 8
period: Mar 2026
date: 2026-03
phase: Apple Developer Academy · Challenge 1
team: Solo
role: Design and development
platform: iPhone · iOS 26.2+
accent: "#B4532A"
accentOnLight: "#8F3F1E"
accentOnDark: "#F2A27E"
icon: ../../assets/projects/memo-your-journey/icon.png
screenshots:
  - src: ../../assets/projects/memo-your-journey/01-calendar-empty-day.jpg
    alt: Calendar where days with memories show photo thumbnails
    caption: A monthly calendar where days with memories show their photo.
  - src: ../../assets/projects/memo-your-journey/02-add-memory-photos.jpg
    alt: New Memory sheet with selected photos and a cover choice
    caption: Add up to 10 photos and pick a cover.
  - src: ../../assets/projects/memo-your-journey/03-add-memory-location-tags.jpg
    alt: New Memory sheet with location suggestions and tag selection
    caption: Location suggestions and searchable tags.
  - src: ../../assets/projects/memo-your-journey/05-detail.jpg
    alt: Memory detail with a full-bleed photo gallery and glass category chips
    caption: Memory detail with a full-bleed photo gallery.
  - src: ../../assets/projects/memo-your-journey/06-detail-scrolled.jpg
    alt: Memory detail scrolled to the story and More from section
    caption: The story, place and date, and "More from" the same country.
  - src: ../../assets/projects/memo-your-journey/07-memories-grid.jpg
    alt: Masonry grid of memories grouped by month
    caption: A masonry gallery grouped by month.
  - src: ../../assets/projects/memo-your-journey/08-calendar-dark.jpg
    alt: Calendar in dark mode
    caption: Calendar in dark mode.
  - src: ../../assets/projects/memo-your-journey/09-memories-timeline-dark.jpg
    alt: Timeline view of memories with wide photo cards in dark mode
    caption: The timeline view in dark mode.
stack: [SwiftUI, Observation, PhotosUI, Layout protocol, UIKit]
links:
  - { label: GitHub repo, url: "https://github.com/Kenjirl/swift-memo-your-journey" }
---

## Overview

Memo Your Journey is a **travel journal**. Save a memory with photos, a place, a date, a story and tags, then find it again on a calendar where each day shows its photo, or in a gallery of everything you've saved.

## My role

Solo project from Challenge 1, my first at the Academy - design and development, plus a later "Warm Journal" redesign with full add/edit and a new "Travel Stamp" icon.

## Key features

- The calendar shows a photo thumbnail on every day that has a memory. It opens on your latest memory and sums up how many memories, places and countries you have.
- All memories can be browsed as a two-column masonry grid grouped by month, or as a timeline of wide photo cards. The app remembers your choice, and you can search or filter by category.
- A memory opens with a swipeable full-screen photo gallery, then the place and date, the story, and more memories from the same country.
- Adding or editing a memory lets you pick up to 10 photos and choose a cover, with a required title, no future dates, location suggestions from places you've used before, and searchable tags.
- The "Warm Journal" design uses cream paper, a terracotta accent and serif headings, with full dark mode and the iOS 26 Liquid Glass tab bar.

## Tech stack

SwiftUI (`TabView`, `NavigationStack`, paging `ScrollView`, `contextMenu`, `ShareLink`), a custom flow layout with the `Layout` protocol, a masonry grid, Observation (`@Observable` store), PhotosUI with resizing to 1600 px JPEG and an `NSCache`. No third-party dependencies.

## Limitations & next steps

- Memories live in memory with sample data, so changes are lost when the app closes.
- Locations are free text ("Country, Place") and not connected to a map yet.

Next: SwiftData storage, picking places with MapKit, onboarding instead of sample data, and an "On this day" widget.
