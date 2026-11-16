---
title: News Portal
tagline: A vintage-newspaper news app with its own backend - live updates over WebSocket and push alerts per section.
kind: ios-app+backend
order: 3
period: Sep 2026
date: 2026-09
phase: Apple Developer Academy · Challenge 6
team: Solo
role: iOS app and backend
platform: iPhone · iOS 26.5+ · backend in Docker
accent: "#9B2C1F"
accentOnLight: "#9B2C1F"
accentOnDark: "#E8836F"
icon: ../../assets/projects/news-portal/icon.png
screenshots:
  - src: ../../assets/projects/news-portal/08-story-poster.jpg
    alt: One-page story "The Boy Who Delivers the News", where Holmes explains the push model, WebSockets and APNs to Watson, next to a diagram of the app flow from subscribing to a section to real-time updates and notifications
    caption: A one-page story I made for this challenge, explaining the push model, WebSockets and APNs through Holmes and Watson, next to the app's flow.
    frame: none
  - src: ../../assets/projects/news-portal/01-subscription-coupon.jpg
    alt: Onboarding styled as a newspaper subscription coupon with three steps
    caption: Onboarding as a subscription coupon - connect, allow notifications, save this iPhone.
  - src: ../../assets/projects/news-portal/02-front-page.jpg
    alt: Front page with a gothic masthead, edition number, section filter, lead story and two columns
    caption: The Front Page - masthead, edition number, lead story and two columns.
  - src: ../../assets/projects/news-portal/03-story.jpg
    alt: Story screen with section label, dateline, halftone image and red drop cap
    caption: A story with a halftone image and a red drop cap.
  - src: ../../assets/projects/news-portal/04-sections.jpg
    alt: Sections screen with alert toggles and a red BERLANGGANAN stamp on Sports
    caption: Subscribe to push alerts per section.
  - src: ../../assets/projects/news-portal/05-live-wire.jpg
    alt: Red Kawat Terbaru strip announcing a story that was just published
    caption: The "Kawat Terbaru" (latest wire) strip appears the moment a story is published.
  - src: ../../assets/projects/news-portal/06-push-notification.jpg
    alt: Push notification for a Sports story shown over the app
    caption: A push notification for a subscribed section.
  - src: ../../assets/projects/news-portal/07-front-page-dark.jpg
    alt: Front page in dark mode with dark brown paper and cream ink
    caption: The "evening edition" in Dark Mode.
stack: [SwiftUI, WebSocket, UserNotifications, APNs, Combine, FastAPI, PostgreSQL, SQLAlchemy, aioapns, Docker]
links:
  - { label: App repo, url: "https://github.com/Kenjirl/ch6-news-portal-swift" }
---

## Overview

News Portal is a news app with a **backend I wrote myself**. When a story is published on the server it shows up instantly in every open app over **WebSocket**, and arrives as a **push notification** on iPhones subscribed to that section. The app is styled like an **old Indonesian newspaper**: gothic masthead, newsprint paper, red ink stamps, and small touches of old-spelling Indonesian.

## My role

Solo project - the iOS app, the FastAPI backend, the database schema, Docker setup and the APNs integration.

## Key features

- The first launch walks you through three steps styled as a newspaper subscription coupon: connect to the server, allow notifications, and save this iPhone with its APNs token. "Connected" only shows after a real WebSocket ping, and the device registers again if the token arrives late or changes.
- The front page has a gothic masthead with an edition number and the year in Roman numerals, a live or reconnecting status, a section filter, a lead story and two columns of news.
- When a new story is published, a red "Kawat Terbaru" (latest wire) strip appears right away, and tapping it opens the story.
- Each story shows its section, dateline and reading time, with halftone images drawn in code, a Share button and more stories from the same section. Tapping a push notification opens the story, even when the app was closed.
- The Sections tab shows how many stories each section has, its latest headline, and a switch to get push alerts for it.
- Dark Mode. The "evening edition" uses dark paper and cream ink.

## How it works

```
Newsroom (/docs)                    Backend (FastAPI + Postgres, Docker)
────────────────                    ────────────────────────────────────
POST /news/ ──────────────────────► store the story
                                     ├─► WebSocket broadcast ─────► every open app
                                     │                               (live wire strip)
                                     └─► APNs to subscribers ──────► push on iPhone
                                         of that section             (tap → open story)

iPhone (News Portal)
────────────────────
Onboarding ── /ws/{device_id}, notification permission, POST /devices/register (+ APNs token)
Front Page ── GET /news/, GET /categories/
Sections ──── GET/POST/DELETE /devices/{id}/subscriptions
```

The backend has 11 REST endpoints plus one WebSocket. The Swagger page at `/docs` doubles as the newsroom for publishing stories.

## Tech stack

- **App** - SwiftUI with custom tab bar and components, `URLSessionWebSocketTask` with ping and auto-reconnect, UserNotifications + APNs, Combine stores, four bundled open-licensed fonts. No third-party dependencies.
- **Backend** - Python 3.12, FastAPI, Pydantic, PostgreSQL 16 with SQLAlchemy, aioapns (token-based, sandbox), Docker Compose.

## Limitations

- No newsroom UI and **no authentication** on the API - stories are published from Swagger.
- The backend runs on a local network over HTTP and isn't deployed yet; push uses the APNs sandbox.
- WebSocket connections live in one process's memory, so it can't scale to several instances.
- No pagination, search or offline cache in the app, and no automated tests yet.

## Can be next

A small web newsroom with login and image upload, an HTTPS/WSS deployment with production APNs, then pagination and caching.
