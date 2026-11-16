---
title: DogConnect
tagline: Turn a spare iPhone into a home camera for your dog — live video, two-way audio and video calls.
kind: ios-app
order: 4
period: Aug 2026
date: 2026-08
phase: Apple Developer Academy · Challenge 5
team: Solo
role: Built alone — a Challenge 5 team idea (team of 5) that was later dropped
platform: iPhone & iPad · iOS 26.5+ · two devices
accent: "#C4572A"
accentOnLight: "#A84A22"
accentOnDark: "#E8885A"
icon: ../../assets/projects/dogconnect/icon.png
screenshots:
  - src: ../../assets/projects/dogconnect/01-choose-role.jpg
    alt: Role selection between Home camera and My phone
    caption: One app, two roles — Home camera or My phone.
  - src: ../../assets/projects/dogconnect/02-pairing-code.jpg
    alt: Home camera showing a six-digit pairing code
    caption: The home camera shows a 6-digit pairing code.
  - src: ../../assets/projects/dogconnect/03-enter-code.jpg
    alt: Owner's phone entering the six-digit code after finding the camera nearby
    caption: The owner’s phone finds the camera nearby and enters the code.
  - src: ../../assets/projects/dogconnect/04-home-camera.jpg
    alt: Full-screen camera on the home iPhone with a streaming status
    caption: The home camera streaming to the owner’s phone.
  - src: ../../assets/projects/dogconnect/06-live-view.jpg
    alt: Live view with a LIVE badge and Listen, Video call and Talk buttons
    caption: Live view on the owner’s phone, with Listen, Video call and Talk.
stack: [SwiftUI, Agora RTC, Agora RTM, MultipeerConnectivity, Keychain, CryptoKit, AVFoundation]
links: []
---

## Overview

DogConnect turns a spare iPhone into a **home camera for your dog**. Pair two iPhones once with a 6-digit code, then watch a live view from your own phone, listen to the room, talk to your dog, or start a video call.

The original idea was a *smart* pet monitor that detects the dog’s activity and barking. In its current state DogConnect works as a **regular pet camera** — live video, two-way audio and video calls. Dog detection is not built yet (see Limitations).

## My role

DogConnect started as an idea from my Challenge 5 team of five. Midway through development the team dropped it and moved on to the idea that became [Snoop](../snoop/). By then, this part of the work was mine alone: everything in this app — pairing, streaming, security and the design — is code I wrote myself. I later polished the UI and made a new icon for this portfolio.

## Key features

- **Two roles in one app** — Home camera or My phone; the app remembers its role and pair after setup.
- **One-time nearby pairing** — the camera advertises itself with MultipeerConnectivity; the owner types the 6-digit code; wrong codes show a clear message on both sides.
- **Secure pairing token** — after pairing, a random token is stored in the Keychain on both devices (this device only, not backed up). Unpair removes it and stops streaming.
- **Live view** — video over Agora RTC with a LIVE badge and a waiting state when the camera is offline.
- **Listen, Talk and Video call** — audio commands travel over Agora RTM; the camera shows “Your owner is talking”, and during a call the owner’s video goes full screen.
- **“Cozy Den” design** — warm cream and terracotta, light and dark mode, large labelled controls with VoiceOver values.

## How it works

UI-free managers hold the logic, with one SwiftUI flow per role:

- `PairingManager` — MultipeerConnectivity (encrypted `MCSession`) and the token exchange.
- `PairingStore` — reads and writes the token in the Keychain.
- `AgoraManager` / `AgoraRTMManager` — joins channels, publishes camera and mic, sends audio commands.
- Channel names come from config or a SHA-256 hash of the pairing token (CryptoKit).
- Secrets live in a git-ignored `.env`; a build phase copies only the client keys into the app bundle.

## Tech stack

SwiftUI (`UIViewRepresentable` for Agora video views), Combine, MultipeerConnectivity + Bonjour, Keychain Services, CryptoKit, Agora RTC Engine and Agora RTM (Swift Packages), AVFoundation for camera and microphone permissions.

## Limitations & next steps

- **No dog detection yet** — there’s no computer vision for the dog’s activity and no sound analysis for barking, so there are no alerts; the owner has to open the live view.
- It uses Agora temporary tokens (valid 24 hours) and a fixed channel; real use needs a token server.
- Streaming only runs while the app is open, and there’s no recording or history.

Next: bark detection with Sound Analysis and push alerts, activity detection with Vision / Core ML, and a small token server.
