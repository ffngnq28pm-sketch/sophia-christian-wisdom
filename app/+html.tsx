import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * Root HTML component for Expo Router web export.
 * Customises <head> with SEO/OG meta tags and a desktop wrapper.
 * Only used on web — has no effect on native iOS/Android builds.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <title>Olivia — Sagesse Chrétienne</title>
        <meta
          name="description"
          content="Une carte de sagesse chrétienne chaque jour. Méditez sur les Psaumes, les Évangiles et les Pères de l'Église."
        />
        <meta name="theme-color" content="#1B2B4D" />
        <link rel="canonical" href="https://olivia.shadowstepsociety.com/" />

        {/* Favicons multi-tailles */}
        <link rel="icon" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/favicon-192.png" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Olivia — Sagesse Chrétienne" />
        <meta
          property="og:description"
          content="Une carte de sagesse chrétienne chaque jour. Méditez sur les Psaumes, les Évangiles et les Pères de l'Église."
        />
        <meta property="og:url" content="https://olivia.shadowstepsociety.com/" />
        <meta property="og:image" content="https://olivia.shadowstepsociety.com/og-image.png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Olivia" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Olivia — Sagesse Chrétienne" />
        <meta
          name="twitter:description"
          content="Une carte de sagesse chrétienne chaque jour. Méditez sur les Psaumes, les Évangiles et les Pères de l'Église."
        />
        <meta name="twitter:image" content="https://olivia.shadowstepsociety.com/og-image.png" />

        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

/* On desktop (≥ 800px), present the app as a centred mobile-shaped column
   to avoid screen-wide stretching of mobile-first layouts. */
const responsiveBackground = `
body {
  background-color: #1B2B4D;
}
@media (min-width: 800px) {
  body {
    background: radial-gradient(ellipse at top, #1B2B4D, #0F1A33 70%);
  }
  #root {
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.55), 0 0 1px rgba(196, 149, 74, 0.2);
  }
}
`;
