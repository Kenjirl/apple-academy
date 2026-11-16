// Generates Open Graph images (1200×630) and the touch icon into public/.
// Run locally (uses macOS system fonts) after changing project titles,
// taglines, icons or screenshots:   npm run og
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { parse } from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'src/content/projects');
const outDir = path.join(root, 'public/og');
const W = 1200;
const H = 630;
const FONT = "'SF Pro Display', 'Helvetica Neue', Arial, sans-serif";
const BG = '#fafaf9';
const INK = '#18181b';
const MUTED = '#55555c';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Greedy word wrap by an approximate character budget. */
function wrap(text, maxChars, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars && line) {
      lines.push(line);
      line = w;
    } else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[\s,.;:—-]*$/, '') + '…';
    return kept;
  }
  return lines;
}

const rounded = (w, h, r) =>
  Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}"/></svg>`);

async function roundedImage(file, width, height, radius, fit = 'cover', position = 'top') {
  return sharp(file)
    .resize(width, height, { fit, position })
    .composite([{ input: rounded(width, height, radius), blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function loadProjects() {
  const files = (await readdir(contentDir)).filter((f) => f.endsWith('.md'));
  const projects = [];
  for (const f of files) {
    const raw = await readFile(path.join(contentDir, f), 'utf8');
    const fm = parse(raw.split(/^---$/m)[1]);
    const resolve = (p) => (p ? path.resolve(contentDir, p) : undefined);
    projects.push({
      slug: f.replace(/\.md$/, ''),
      ...fm,
      icon: resolve(fm.icon),
      screenshots: (fm.screenshots ?? []).map((s) => ({ ...s, src: resolve(s.src) })),
    });
  }
  return projects;
}

async function projectImage(p, profile) {
  const landscape = p.orientation === 'landscape';
  const shot = p.screenshots[0];
  const titleLines = wrap(p.title, 18, 2);
  const tagLines = wrap(p.tagline, 36, 4);
  const phase = p.phase.replace('Apple Developer Academy · ', 'Apple Developer Academy · ');

  const textX = 72;
  const titleY = 250;
  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="g" cx="80%" cy="10%" r="80%">
        <stop offset="0" stop-color="${p.accent}" stop-opacity="0.42"/>
        <stop offset="0.75" stop-color="${p.accent}" stop-opacity="0.08"/>
        <stop offset="1" stop-color="${p.accent}" stop-opacity="0.04"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="${BG}"/>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect width="${W}" height="10" fill="${p.accent}"/>
    <text x="${textX + 128}" y="128" font-family="${FONT}" font-size="24" font-weight="600" fill="${p.accentOnLight}">${esc(phase)}</text>
    <text x="${textX + 128}" y="160" font-family="${FONT}" font-size="22" fill="${MUTED}">${esc(p.period)} · ${esc(p.team)}</text>
    ${titleLines
      .map((l, i) => `<text x="${textX}" y="${titleY + i * 76}" font-family="${FONT}" font-size="72" font-weight="700" letter-spacing="-1.5" fill="${INK}">${esc(l)}</text>`)
      .join('')}
    ${tagLines
      .map((l, i) => `<text x="${textX}" y="${titleY + titleLines.length * 76 + 10 + i * 42}" font-family="${FONT}" font-size="32" fill="${MUTED}">${esc(l)}</text>`)
      .join('')}
    <text x="${textX}" y="${H - 56}" font-family="${FONT}" font-size="24" fill="${MUTED}"><tspan font-weight="600" fill="${INK}">${esc(profile.name)}</tspan> · ${esc(profile.headline)}</text>
  </svg>`;

  const layers = [];
  if (p.icon) layers.push({ input: await roundedImage(p.icon, 104, 104, 24), left: textX, top: 78 });
  if (shot) {
    if (landscape) {
      const w = 600, h = Math.round((w * 828) / 1800), pad = 10;
      const frame = await sharp({ create: { width: w + pad * 2, height: h + pad * 2, channels: 4, background: '#1b1b1e' } })
        .composite([
          { input: await roundedImage(shot.src, w, h, 28, 'fill'), left: pad, top: pad },
          { input: rounded(w + pad * 2, h + pad * 2, 38), blend: 'dest-in' },
        ])
        .png()
        .toBuffer();
      layers.push({ input: frame, left: W - w - pad * 2 + 120, top: 300 });
    } else {
      const w = 300, h = Math.round((w * 1800) / 828), pad = 10;
      const frame = await sharp({ create: { width: w + pad * 2, height: h + pad * 2, channels: 4, background: '#1b1b1e' } })
        .composite([
          { input: await roundedImage(shot.src, w, h, 40), left: pad, top: pad },
          { input: rounded(w + pad * 2, h + pad * 2, 50), blend: 'dest-in' },
        ])
        .png()
        .toBuffer();
      // Show the top of the phone, cropped by the bottom edge.
      const cropped = await sharp(frame).extract({ left: 0, top: 0, width: w + pad * 2, height: H - 70 }).png().toBuffer();
      layers.push({ input: cropped, left: W - w - pad * 2 - 90, top: 70 });
    }
  }
  return sharp(Buffer.from(svg)).composite(layers).png({ compressionLevel: 9 }).toBuffer();
}

async function defaultImage(projects, profile) {
  const apps = projects
    .filter((p) => p.kind !== 'external' && p.icon)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || (a.featured ? a.order - b.order : b.date.localeCompare(a.date)));
  const introLines = wrap(profile.intro, 52, 3);
  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${BG}"/>
    <text x="72" y="120" font-family="${FONT}" font-size="26" font-weight="600" fill="${MUTED}">${esc(profile.headline)}</text>
    <text x="72" y="210" font-family="${FONT}" font-size="80" font-weight="700" letter-spacing="-2" fill="${INK}">Hi, I’m ${esc(profile.name)}.</text>
    <text x="72" y="296" font-family="${FONT}" font-size="80" font-weight="700" letter-spacing="-2" fill="#8a8a91">Here’s what I built this year.</text>
    ${introLines.map((l, i) => `<text x="72" y="${370 + i * 40}" font-family="${FONT}" font-size="30" fill="${MUTED}">${esc(l)}</text>`).join('')}
  </svg>`;
  const size = 96, gap = 24;
  const layers = await Promise.all(
    apps.map(async (p, i) => ({ input: await roundedImage(p.icon, size, size, 22), left: 72 + i * (size + gap), top: H - size - 56 })),
  );
  return sharp(Buffer.from(svg)).composite(layers).png({ compressionLevel: 9 }).toBuffer();
}

const profile = JSON.parse(await readFile(path.join(root, 'src/content/profile.json'), 'utf8'))[0];
const projects = await loadProjects();
await mkdir(outDir, { recursive: true });
for (const p of projects.filter((p) => p.kind !== 'external')) {
  await writeFile(path.join(outDir, `${p.slug}.png`), await projectImage(p, profile));
  console.log('og/' + p.slug + '.png');
}
await writeFile(path.join(root, 'public/og-default.png'), await defaultImage(projects, profile));
console.log('og-default.png');

// Touch icon: the same monogram as favicon.svg.
const touch = `<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg"><rect width="180" height="180" fill="${INK}"/><text x="90" y="124" text-anchor="middle" font-family="${FONT}" font-size="112" font-weight="700" fill="#ffffff">${esc(profile.name.charAt(0))}</text></svg>`;
await writeFile(path.join(root, 'public/apple-touch-icon.png'), await sharp(Buffer.from(touch)).png().toBuffer());
console.log('apple-touch-icon.png');
