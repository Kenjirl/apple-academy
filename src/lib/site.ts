import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Prefix a site path with the configured base (e.g. /apple-academy/). */
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.replace(/^\/+/, '');
  return clean ? `${base}/${clean}` : `${base}/`;
}

export const projectUrl = (p: Project) => withBase(`projects/${p.id}/`);

export async function getProfile() {
  const entry = await getEntry('profile', 'main');
  if (!entry) throw new Error('profile.json is missing the "main" entry');
  return entry.data;
}

export async function getProjects() {
  const all = await getCollection('projects');
  const byOrder = (a: Project, b: Project) => a.data.order - b.data.order;
  const newestFirst = (a: Project, b: Project) =>
    b.data.date.localeCompare(a.data.date) || a.data.order - b.data.order;

  const apps = all.filter((p) => p.data.kind !== 'external');
  return {
    all,
    /** Every project with its own case study, in reading order (featured first). */
    caseStudies: [
      ...apps.filter((p) => p.data.featured).sort(byOrder),
      ...apps.filter((p) => !p.data.featured).sort(newestFirst),
    ],
    featured: apps.filter((p) => p.data.featured).sort(byOrder),
    more: apps.filter((p) => !p.data.featured).sort(newestFirst),
    external: all.filter((p) => p.data.kind === 'external').sort(byOrder),
  };
}

/** Inline style that hands a project's accent colors to .accent-scope. */
export function accentStyle(p: Project): string {
  const { accent, accentOnLight, accentOnDark } = p.data;
  return `--accent:${accent};--accent-on-light:${accentOnLight};--accent-on-dark:${accentOnDark};`;
}

export const isSolo = (p: Project) => p.data.team.toLowerCase() === 'solo';

/** Toolbox groups for the home page; anything unlisted lands in "Other". */
const GROUPS: Record<string, string[]> = {
  'Swift & SwiftUI': [
    'SwiftUI', 'Observation', 'Combine', 'Swift Charts', 'TimelineView', 'Layout protocol',
    'AppStorage', 'UserDefaults', 'UIKit',
  ],
  'Apple frameworks': [
    'Core ML', 'Vision', 'AVFoundation', 'PhotosUI', 'Core Location', 'MapKit', 'WeatherKit',
    'Foundation Models', 'Translation',
  ],
  'System & services': [
    'MultipeerConnectivity', 'Keychain', 'CryptoKit', 'UserNotifications', 'APNs', 'UIKit haptics',
    'AudioToolbox',
  ],
  Backend: [
    'WebSocket', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Supabase', 'pgvector', 'aioapns', 'Cloudinary',
    'Vercel', 'Docker',
  ],
  'Libraries & engines': ['Lottie', 'Agora RTC', 'Agora RTM', 'Godot 4', 'GDScript'],
};

export function toolbox(projects: Project[]) {
  const used = new Set(projects.flatMap((p) => p.data.stack));
  const groups = Object.entries(GROUPS)
    .map(([name, items]) => ({ name, items: items.filter((i) => used.has(i)) }))
    .filter((g) => g.items.length);
  const known = new Set(Object.values(GROUPS).flat());
  const other = [...used].filter((i) => !known.has(i));
  if (other.length) groups.push({ name: 'Other', items: other });
  return groups;
}
