---
title: ParkPulse
tagline: Mark where you parked, then follow a radar and haptic pulses back to your car.
kind: ios-app
order: 5
period: Jul–Aug 2026
date: 2026-07
phase: Personal project · during the Academy
team: Solo
role: Design and development
platform: iPhone & iPad · iOS 26.5+
accent: "#285A48"
accentOnLight: "#285A48"
accentOnDark: "#7EE0B5"
icon: ../../assets/projects/parkpulse/icon.png
screenshots:
  - src: ../../assets/projects/parkpulse/01-park-empty.jpg
    alt: Park screen with a large Mark my spot button and a GPS accuracy chip
    caption: One big button saves your spot, with GPS accuracy in the header.
  - src: ../../assets/projects/parkpulse/02-park-active.jpg
    alt: Active parking card showing place name, distance, height difference and duration
    caption: An active parking card — distance, height difference and time parked.
  - src: ../../assets/projects/parkpulse/03-find-my-car.jpg
    alt: Find my car screen with radar rings, Height and Pulse cards, showing You're here
    caption: Find my car — the radar, height and pulse cards, here on arrival.
  - src: ../../assets/projects/parkpulse/04-history.jpg
    alt: History list grouped by month with times and durations
    caption: Parking history grouped by month.
stack: [SwiftUI, Core Location, MapKit, UIKit haptics, AudioToolbox, Combine]
links:
  - { label: GitHub repo, url: "https://github.com/Kenjirl/swift-parking-sensor" }
---

## Overview

ParkPulse saves where you parked and guides you back **like a car’s parking sensor**: a radar shows the direction, a big number shows the distance, a small staircase shows how many floors up or down, and haptic pulses get faster as you get closer.

## My role

Solo project — design, development, and a UI polish pass with a new icon (“Pulse Pin”).

## Key features

- **Mark my spot** — saves GPS position and altitude; the address fills in through MapKit reverse geocoding.
- **Several cars at once** — each active spot gets its own card with distance, height difference and a live parking timer.
- **Radar** — 10 / 20 / 30 m rings, a rotating sweep, the phone’s heading from the compass, and plain-language directions like “Ahead, slightly left”.
- **Floors** — a 5-step staircase marks the car’s level (about 3 m per floor), e.g. “1 floor up · 3.1 m”.
- **Proximity pulse** — vibration and a soft “tock” get faster and stronger from 30 m down to 3 m, then a success haptic on arrival. Haptics and sound can be turned off separately.
- **History** — grouped by month with start, end and duration; old spots can still be found or deleted.

## How it works

Two shared managers live in the SwiftUI environment. `ParkingLocationManager` wraps `CLLocationManager` (best accuracy, heading, a 0.5 m filter) and computes distance, bearing and altitude difference itself. `ProximityFeedbackManager` turns distance into a timer for haptics and sound. The “Night Radar” look is always dark, uses monospaced digits so numbers don’t jump, and respects Reduce Motion and VoiceOver.

## Tech stack

SwiftUI (`TabView`, `NavigationStack`, `TimelineView`, `AngularGradient`, custom button styles), Combine, Core Location, MapKit reverse geocoding, UIKit haptics, AudioToolbox system sounds. No third-party dependencies.

## Limitations & next steps

- Parking data lives in memory only and is lost when the app closes.
- Height uses GPS altitude, which can be off by a few meters inside a parking garage.
- Feedback only runs while the app is open.

Next: SwiftData storage, the barometer (`CMAltimeter`) for more accurate floors, and a Live Activity for the current spot.
