#!/usr/bin/env node
/**
 * Post-process dist/index.html after `expo export --platform web` to inject
 * SEO, Open Graph, Twitter Card meta tags and multi-size favicon links.
 *
 * Required because Expo's "single" web output ignores app/+html.tsx
 * (that file is only applied in `web.output: "static"` mode, which is risky
 * here because several screens use `Dimensions.get('window')` at module
 * top-level and would crash during SSR).
 *
 * Hooked into `npm run build:web` so it runs both locally and on Vercel.
 */

const fs = require('fs');
const path = require('path');

const HTML_PATH = path.join(process.cwd(), 'dist', 'index.html');

if (!fs.existsSync(HTML_PATH)) {
  console.error(`✗ ${HTML_PATH} not found — run "expo export --platform web" first.`);
  process.exit(1);
}

const TITLE = 'Olivia — Sagesse Chrétienne';
const DESCRIPTION =
  "Une carte de sagesse chrétienne chaque jour. Méditez sur les Psaumes, les Évangiles et les Pères de l'Église.";
const URL = 'https://olivia.shadowstepsociety.com/';
const OG_IMAGE = 'https://olivia.shadowstepsociety.com/og-image.png';

const META_BLOCK = `
    <meta name="description" content="${DESCRIPTION}" />
    <meta name="theme-color" content="#1B2B4D" />
    <link rel="canonical" href="${URL}" />
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />
    <link rel="apple-touch-icon" sizes="192x192" href="/favicon-192.png" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${TITLE}" />
    <meta property="og:description" content="${DESCRIPTION}" />
    <meta property="og:url" content="${URL}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="1024" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:site_name" content="Olivia" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${TITLE}" />
    <meta name="twitter:description" content="${DESCRIPTION}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <style id="olivia-bg">
      body { background-color: #1B2B4D; }
    </style>
`;

let html = fs.readFileSync(HTML_PATH, 'utf8');

// Idempotent: if meta is already there, skip (rerun safe).
if (html.includes('og:title')) {
  console.log('  meta tags already present, skipping');
  process.exit(0);
}

html = html
  .replace('<html lang="en">', '<html lang="fr">')
  .replace('<title>Olivia</title>', `<title>${TITLE}</title>`)
  .replace('</head>', `${META_BLOCK}</head>`);

fs.writeFileSync(HTML_PATH, html);
console.log('✓ Meta tags injected into dist/index.html');
