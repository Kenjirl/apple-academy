# Portfolio during Academy - Apple Developer Academy 2026

Apps I built as a learner at Apple Developer Academy in 2026: case studies with screenshots, my role in each team, and honest limitations.

Live: https://kenjirl.github.io/apple-academy/

## Stack

[Astro](https://astro.build) (static) + Tailwind CSS v4, deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Working on it

```sh
npm install
npm run dev        # http://localhost:4321/apple-academy/
npm run build      # static site in dist/
npm run og         # regenerate Open Graph images in public/ (run on macOS, uses system fonts)
```

- Projects: `src/content/projects/*.md` (frontmatter schema in `src/content.config.ts`)
- Profile & contact: `src/content/profile.json`
- Screenshots & icons: `src/assets/projects/<slug>/`
- Private repos: list them as `{ label: …, private: true }` — shown with a lock, no URL is published.
