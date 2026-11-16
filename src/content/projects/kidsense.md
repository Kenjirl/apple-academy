---
title: KidSense
tagline: An interactive story game that teaches young kids about boundaries and consent.
kind: game
featured: true
order: 1
period: May–Jun 2026
date: 2026-05
phase: Apple Developer Academy · Challenge 3
team: Team of 6
role: Story engine — data model, story view & flow, dialog, choices, endings, Chapter 1 script
platform: iPhone & iPad · iOS 26.2+ · landscape
accent: "#B2D94B"
accentOnLight: "#43781F"
accentOnDark: "#9FD46A"
icon: ../../assets/projects/kidsense/icon.png
orientation: landscape
screenshots:
  - src: ../../assets/projects/kidsense/02-select-character.jpg
    alt: Character selection screen with a boy and a girl character to choose from
    caption: Kids pick a character who stays with them through the whole story.
  - src: ../../assets/projects/kidsense/03-chapter-select.jpg
    alt: Chapter card for Chapter 1, Lunch in The School
    caption: Chapter select — Chapter 1, “Lunch in The School”.
  - src: ../../assets/projects/kidsense/05-story-dialog.jpg
    alt: Classroom scene with characters and a speech bubble
    caption: Tap-through dialog in an illustrated classroom scene.
  - src: ../../assets/projects/kidsense/06-lunchbox-puzzle.jpg
    alt: Drag-and-drop lunchbox puzzle with food items and their silhouettes
    caption: A lunchbox mini-game in the middle of the story.
  - src: ../../assets/projects/kidsense/08-story-choice.jpg
    alt: Story choice between Ask Permission and Take the food
    caption: Branching choices lead to different scenes and endings.
  - src: ../../assets/projects/kidsense/09-lesson-learned.jpg
    alt: Lesson Learned card after a story branch
    caption: Each branch ends with a short lesson card.
stack: [SwiftUI, Lottie, AVFoundation, AppStorage]
links:
  - { label: GitHub repo, url: "https://github.com/Kenjirl/swift-ch3-group3-test" }
---

## Overview

KidSense is a picture-book style game for young children about **personal boundaries and consent**. Kids choose a character, follow a story set at school, make decisions at key moments, and learn from the outcome through a mini-game, a short lesson and a quiz. Version 1 is a native SwiftUI app for iPhone and iPad, played in landscape.

## My role

KidSense was built by a team of six. I built the **story engine**:

- The data model for stories — scenes, assets, dialog, choices, endings and checkpoints.
- `StoryView` and its navigation flow, the dialog bubbles, the choice sheet and the ending cards.
- Character animation (Lottie plus SwiftUI keyframes) and the character data.
- The script for Chapter 1.

## Key features

- **Branching story** — choices like “Ask Permission” or “Take the food” lead to different scenes and endings, each closing with a “Lesson Learned” or “Story Clear” card.
- **Checkpoints** — retrying returns to the last checkpoint instead of the start; progress is saved between launches.
- **Living scenes** — the speaking character hops, props such as the clock and sticky notes animate and can be tapped.
- **Lunchbox mini-game** — drag six foods onto their silhouettes; items snap into place or slide back.
- **Lesson and quiz** — a teacher explains “No. Stop. I don’t like that.”, followed by three quizzes: reading emotions, choosing the best action, and “Stop or Go”.
- **Reduce Motion support** — clouds, zooms, hops and Lottie animations switch off or become still images.

## How it works

Stories are **data, not code**. A `StoryModel` holds a list of scenes; each scene describes its characters and props (with positions relative to the screen), its dialog lines, optional choices that point to the next scene, an optional ending, and flags for checkpoints or mini-games. A small screen state machine moves between onboarding, chapter select, story, mini-game, lesson and quiz. Adding a chapter means writing data, not new views.

## Tech stack

- **SwiftUI** — `GeometryReader` with relative positioning for scenes, `keyframeAnimator`, `DragGesture`, `PreferenceKey` for puzzle slots.
- **State** — `ObservableObject` for the global screen state, `@AppStorage` for character, scene and checkpoint.
- **Lottie** (Swift Package) for props and rewards, custom Fredoka font.

## Limitations & next steps

- Only Chapter 1 is playable; Chapter 2 is a placeholder.
- Sound effects are prepared but turned off, and stars are not shown to the player yet.
- Some layouts use fixed values, so a few screens fit some devices better than others.

KidSense continues as **KidSense v2**, a remake in Godot 4 (Challenge 7), which will have its own site.
