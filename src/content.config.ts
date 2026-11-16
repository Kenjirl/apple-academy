import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/);

// A code link. Private repos are listed without a URL (it is never published).
const link = z
  .object({
    label: z.string(),
    url: z.url().optional(),
    private: z.boolean().default(false),
  })
  .refine((l) => l.private || l.url, { message: 'Public links need a url' });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        tagline: z.string(),
        kind: z.enum(['ios-app', 'ios-app+backend', 'game', 'external']),
        featured: z.boolean().default(false),
        order: z.number().int(),
        period: z.string(),
        // Sort key for "More projects" (newest first), e.g. 2026-09
        date: z.string().regex(/^\d{4}-\d{2}$/),
        phase: z.string(),
        team: z.string(),
        role: z.string(),
        platform: z.string().optional(),
        // Brand color of the app (fills, lines, glows)
        accent: hex,
        // Text-safe variants (≥ 4.5:1 on the site's light / dark background)
        accentOnLight: hex,
        accentOnDark: hex,
        icon: image().optional(),
        screenshots: z
          .array(
            z.object({
              src: image(),
              alt: z.string(),
              caption: z.string().optional(),
              // "none" for artwork that isn't an app screen (no phone frame)
              frame: z.enum(['phone', 'none']).default('phone'),
            }),
          )
          .default([]),
        orientation: z.enum(['portrait', 'landscape']).default('portrait'),
        stack: z.array(z.string()).default([]),
        links: z.array(link).default([]),
        externalUrl: z.url().optional(),
        externalNote: z.string().optional(),
        // Slug of the project this one continues (shown on that case study)
        continues: z.string().optional(),
      })
      .refine((p) => p.kind !== 'external' || p.screenshots.length === 0, {
        message: 'External entries have no screenshots',
      }),
});

const profile = defineCollection({
  loader: file('./src/content/profile.json'),
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    intro: z.string(),
    location: z.string().optional(),
    photo: z.string().optional(),
    email: z.email().optional(),
    github: z.url(),
    linkedin: z.url().optional(),
    cv: z.string().optional(),
    mainSite: z.url().optional(),
  }),
});

export const collections = { projects, profile };
