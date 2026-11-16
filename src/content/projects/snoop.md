---
title: Snoop
tagline: Identify a dog from its nose print — on device, matched in the cloud.
kind: ios-app+backend
featured: true
order: 2
period: Aug 2026
date: 2026-08
phase: Apple Developer Academy · Challenge 5
team: Team of 5
role: Backend (FastAPI, Supabase, pgvector), API integration, sign-in & sessions, dog catalog and detail
platform: iPhone · iOS 26+
accent: "#7A9A3A"
accentOnLight: "#5A6C34"
accentOnDark: "#A9C46B"
icon: ../../assets/projects/snoop/icon.png
screenshots:
  - src: ../../assets/projects/snoop/01-login.jpg
    alt: Snoop sign-in screen with organization login and a guest option
    caption: Sign in as an organization, or continue as a guest.
  - src: ../../assets/projects/snoop/03-home-catalog.jpg
    alt: Grid of dogs belonging to an organization with search and a scan button
    caption: The organization’s dog catalog, loaded from the API.
  - src: ../../assets/projects/snoop/05-nose-scan.jpg
    alt: Camera view framing a dog's nose with the hint Hold it there
    caption: Live framing guidance while scanning a nose print.
  - src: ../../assets/projects/snoop/04-dog-detail.jpg
    alt: Dog profile with photo, details and medical records filtered by vaccination and treatment
    caption: Dog profile with medical records.
stack: [SwiftUI, Core ML, Vision, AVFoundation, Observation, Lottie, FastAPI, Supabase, pgvector, Cloudinary, Vercel]
links:
  - { label: App repo, private: true }
  - { label: Backend repo, private: true }
---

## Overview

Every dog’s nose print is unique, like a human fingerprint. Snoop lets shelters, clinics and communities **photograph a dog’s nose to open its profile and medical records** — or register the dog if it isn’t known yet. Recognition runs on the iPhone; matching happens on a backend with vector search.

## My role

Snoop was built by a team of five — it was the idea our Challenge 5 team chose to take all the way, after we dropped an earlier one (that one became [DogConnect](../dogconnect/)). I built:

- **The entire backend** — a FastAPI service with Supabase Auth, Postgres + pgvector, Cloudinary for photos, deployed on Vercel.
- **API integration in the app** — the networking layer, sign-in and session restore with refresh tokens, the dog catalog and detail screens from the server, pull-to-refresh, and medical-record icons.
- Reviewing and merging the team’s pull requests.

My teammates built the scan pipeline and ML models, the design system, the dog editor and medical forms, and the nose-print recognizer.

## Key features

- **Live framing guide** — a detection model runs on every camera frame and tells you when the nose is centered, close enough and sharp.
- **Three-step on-device pipeline** — nose detection (YOLOv8n) → nose-print segmentation (YOLOv8n-seg) → a 512-dimension embedding (ResNet).
- **Match, maybe, or new** — the server returns a confident match, a few candidates, or nothing found.
- **No duplicates by design** — a new dog can only be registered from a scan that found no match, so every dog has a nose print.
- **Medical records** — add, edit and delete treatments and vaccinations.
- **Guest mode** — scan and view a found dog’s card without changing any data.

## How it works

```
iPhone (Snoop)                          Backend (FastAPI on Vercel)
──────────────                          ───────────────────────────
Camera → Vision (framing guide)
Photo → Core ML: detect → segment
      → embed (512-d vector) ─────────► POST /dogs/find-by-nose-print
                                          └► Supabase RPC match_dog_nose (pgvector)
Profile, medical records ◄────────────► /dogs, /dogs/{id}/medical-records …
Register a new dog ───────────────────► POST /dogs + /nose-embeddings + /images (Cloudinary)
Sign in / session ────────────────────► /login, /refresh (Supabase Auth)
```

The models run entirely on the device; the server only stores vectors and searches them with cosine similarity. Every response — including errors — uses the same `{ success, message, data }` shape. The API has 21 endpoints.

## Tech stack

- **App** — Swift 6 (strict concurrency), SwiftUI, Observation, Core ML + Vision (4 models), AVFoundation, PhotosUI, Lottie, `URLSession` + `Codable` with bearer and refresh tokens.
- **Backend** — Python 3.12, FastAPI, Pydantic, Supabase Auth, Supabase Postgres + pgvector, Cloudinary, Vercel serverless.

## Limitations & next steps

- The similarity threshold is not calibrated yet — it was tested with little real data and no negative samples, so accuracy isn’t measured.
- The database runs on Supabase’s free tier, which pauses after a few idle days.
- Light mode only; connection errors on sign-in still show as “Invalid email or password”.
- Refresh tokens live in `UserDefaults` rather than the Keychain, and there are no unit tests yet.
