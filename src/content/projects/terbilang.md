---
title: Terbilang
tagline: Turn numbers into written Indonesian words, ready to paste into receipts and invoices.
kind: ios-app
order: 7
period: Apr 2026
date: 2026-04
phase: Personal project · during the Academy
team: Solo
role: Design and development
platform: iPhone · iOS 26.2+
accent: "#284B8F"
accentOnLight: "#284B8F"
accentOnDark: "#8FA8E6"
icon: ../../assets/projects/terbilang/icon.png
screenshots:
  - src: ../../assets/projects/terbilang/01-home-empty.jpg
    alt: Home screen with an empty receipt card and a large number keypad
    caption: A large custom keypad and a receipt-style result card.
  - src: ../../assets/projects/terbilang/03-home-long-number.jpg
    alt: Home screen converting 123,456,789 into Indonesian words
    caption: Long numbers are written out as you type.
  - src: ../../assets/projects/terbilang/04-result-sheet-kapital.jpg
    alt: Full result sheet in uppercase style with word and character counts
    caption: The full result sheet - Title, Sentence or UPPERCASE style.
  - src: ../../assets/projects/terbilang/06-history.jpg
    alt: History list grouped by Today and Yesterday
    caption: Copied and shared numbers are saved to history.
  - src: ../../assets/projects/terbilang/07-home-dark.jpg
    alt: Home screen in dark mode
    caption: Full dark mode.
stack: [SwiftUI, Observation, AppStorage, UserDefaults, UIKit]
links:
  - { label: GitHub repo, url: "https://github.com/Kenjirl/terbilang-app" }
---

## Overview

In Indonesia, receipts, cheques and official documents often need the amount written out in words - *terbilang*. Terbilang converts a number into correct Indonesian words like `# Dua Puluh Tujuh Juta Lima Ratus Ribu Rupiah #`, ready to copy or share. The app's interface is in Indonesian.

## My role

Solo personal project, built alongside the Academy - design, development, and a later "Paper Receipt" redesign with a new icon.

## Key features

- A large custom keypad with 000, comma, delete and clear replaces the system keyboard, and the amount is formatted as you type (`Rp 27.500.000`).
- The result appears on a receipt-style card, ready to copy with one tap (with haptic feedback) or to share.
- Long-press the amount to paste a number from text like "Rp 1.250.000,75".
- It handles numbers up to 999 trillion with four decimal places, and rejects longer input with a message.
- It uses the correct Indonesian forms, like "seratus", "seribu", "sebelas" and "miliar", and reads decimals digit by digit, including zeros.
- History. The last 50 copied or shared numbers are saved, and settings let you choose the "Rupiah" suffix, the `# ... #` marks, letter case and haptics.

## How it works

Conversion is recursive and returns lowercase words; a separate `TerbilangStyle` adds "rupiah", the `#` marks and capitalization, so one number can be shown in any style without recomputing. Amounts are kept as raw strings (`"1250000,75"`), so there's no floating-point rounding.

## Tech stack

SwiftUI (`NavigationStack(path:)`, `Grid`, `ShareLink`, `contextMenu`, `sensoryFeedback`), Observation, `@AppStorage` wrapped in a `DynamicProperty` for settings, `UserDefaults` + `Codable` for history, `UIPasteboard`. No third-party dependencies.

## Limitations

- Decimals still end in "Rupiah" (no "sen" option yet), and only Indonesian is supported.
- Designed for iPhone in portrait; no unit tests yet.

## Can be next

Unit tests for the converter, a "sen" option, and a widget or Shortcut for quick conversions.
