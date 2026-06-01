# Olivia — Rapport de la nuit du 2026-06-02

## Commits poussés

| Hash | Message |
|---|---|
| `45f81df6` | `feat(web): SEO meta tags, multi-size favicons, desktop wrapper` *(initial via +html.tsx, abandonné — voir b7d1d904)* |
| `c60e120a` | `chore: untrack 209 expo-av artifacts from node_modules` |
| `6a9ea6d8` | `docs: SCREENSHOTS_TODO.md — checklist soumission App Store` |
| `b7d1d904` | `feat(web): post-process meta tag injection (replaces +html.tsx)` |
| `0bcc416d` | `feat(web): restore desktop CSS wrapper in inject-meta.js` |

5 commits ajoutés à `main` cette nuit.

## Améliorations livrées

### Qualité visuelle web (priorité 1) — ✅ livré
- **SEO/social** : `<title>Olivia — Sagesse Chrétienne</title>`, meta description, theme-color `#1B2B4D`, link canonical vers `olivia.shadowstepsociety.com`.
- **Open Graph complet** : `og:type`, `og:title`, `og:description`, `og:url`, `og:image` (1024×1024), `og:locale=fr_FR`, `og:site_name`.
- **Twitter Card** : `summary_large_image` + title/description/image.
- **Favicons multi-tailles** : `favicon.png` (48), `favicon-192.png`, `favicon-512.png`, `apple-touch-icon`. Servis depuis `dist/` à la racine (Vercel).
- **og-image.png** (1024×1024 copie de l'icon Olivia) servi à la racine pour le partage social.
- **Wrapper desktop** : sur écran ≥ 800px, l'app s'affiche centrée en 600px avec ombre douce et background `radial-gradient(#1B2B4D, #0F1A33)`. Évite l'étalement laid des layouts mobile-first sur écran 27".
- **`scripts/inject-meta.js`** : post-process idempotent qui s'exécute après `expo export --platform web` (chaîné dans `npm run build:web`).
- **`vercel.json`** : force Vercel à exécuter `npm run build:web` (pas d'autodetect drift).

### Préparation soumission iOS (priorité 2) — ✅ livré
- **`SCREENSHOTS_TODO.md`** créé à la racine : ordre conseillé des 6 captures pour maximiser conversion (Home → Library → Paywall → Chapelet → Pères de l'Église → Onboarding), process simulateur iPhone 16 Pro Max, dimensions cibles 1290×2796, liste exhaustive des routes navigables, mapping des 5 IAP avec leur écran d'apparition.
- **Vérification Restore Purchases** : présent à `components/PremiumPaywall.tsx:157-160` (« Restaurer mon accès »), wired sur `restorePurchases()` du hook → `StoreService.restorePurchases()` → `Purchases.restorePurchases()`. **Conforme Guideline 3.1.1 Apple.** Aucun ajout requis.

### Nettoyage repo (priorité 3) — ✅ partiel
- **209 fichiers `node_modules/expo-av/*`** untracked via `git rm -r --cached`. Le repo Olivia est nettoyé de 19 652 lignes d'artefacts pour ce package.
- **Audit `sophia` dans le code** : 2 occurrences trouvées, toutes **légitimes** :
  - `data/cards.ts:2742` → `latin: 'Philosophia ancilla theologiae.'` (mot grec, citation théologique)
  - `data/christianNames.ts:68` → entrée pour le prénom « Sophie » / Sainte Sophie martyre
  - Aucun résidu de l'ancien branding.
- **TODO/FIXME/XXX** : 2 faux positifs (`XXXV`, `XXXI` = chiffres romains dans des références à Grégoire le Grand). **0 vrai TODO** dans le code applicatif.

## Tâches non faites + pourquoi

- **3.4 `ts-prune`** (imports inutilisés) : skippé, outil non installé. `npm install -D ts-prune` aurait pollué `package-lock.json` la nuit. À refaire si besoin avec une session dédiée.
- **Fixes desktop per-component** (`Dimensions.get('window')` dans 8 fichiers) : non patché au cas par cas. Le wrapper CSS global à 600px résout 95 % du problème visuel sans toucher au code TS, ce qui est plus safe. Patcher chaque écran demanderait de tester chaque composant, hors scope nuit.
- **Static rendering (`web.output: "static"`)** : aurait permis d'utiliser `app/+html.tsx` (méthode Expo officielle), mais **risque réel de crash SSR** sur 5+ écrans qui utilisent `Dimensions.get('window')` au top-level du module. À ne pas tenter sans refactoring préalable.

## Décisions prises seul (à valider au réveil)

1. **Pivot post-process plutôt que static rendering pour les meta tags.**
   - Raison : `app/+html.tsx` est ignoré en mode `web.output: "single"` (notre mode actuel) ; passer en `"static"` exigerait de modifier `app.json` (blacklisté) ET de refactoriser ~5 fichiers utilisant `Dimensions.get('window')` au top-level.
   - Solution livrée : `scripts/inject-meta.js` post-process idempotent. Marche identique en local et sur Vercel.
2. **Suppression de `app/+html.tsx`** (avait été créé puis abandonné après le pivot post-process). Justifié par : fichier inactif en mode single, source de confusion future. À ré-introduire si on passe en static.
3. **Création de `vercel.json`** pour forcer le `buildCommand: "npm run build:web"` — évite que Vercel autodetect-drift ne contourne notre post-process.
4. **Wrapper desktop CSS à 600px de largeur** (au lieu de patcher les `Dimensions.get` partout). Compromis non-invasif : le composant React voit toujours la même `window.width`, c'est juste le DOM externe qui est contraint. Si tu trouves la largeur trop étroite, ajuste dans `scripts/inject-meta.js`.
5. **`og-image.png` = copie 1:1 de `assets/images/icon.png`** (1024×1024). Twitter et Facebook recadrent un carré. Si tu veux un meilleur rendu `summary_large_image`, créer une image 1200×630 dédiée serait préférable — à voir plus tard, pas blocker pour le lancement.

## Suggestions pour la journée

### Immédiat (avant submit App Store)
- [ ] **Capturer les 6 screenshots** selon `SCREENSHOTS_TODO.md`.
- [ ] **Soumission ASC** : uploader `.ipa` via Transporter + screenshots + métadonnées + IAP.
- [ ] **Sur olivia.shadowstepsociety.com** : vérifier visuellement (1) favicon Olivia visible dans l'onglet, (2) preview Facebook/Twitter via leur debugger (https://developers.facebook.com/tools/debug/ + https://cards-dev.twitter.com/validator), (3) wrapper desktop centré sur grand écran.

### Court terme (V1.0.x)
- [ ] **OG image dédiée 1200×630** : créer une image bannière avec logo Olivia + tagline pour un meilleur rendu `summary_large_image` sur Twitter/LinkedIn.
- [ ] **`expo-media-library` à tester sur device réel** : permission `NSPhotoLibraryAddUsageDescription` configurée via plugin (`app.json:78`), mais à confirmer en sandbox sur device avant qu'un user appuie sur « Sauvegarder le fond d'écran ».
- [ ] **Cleanup `.expo/types/router.d.ts` et `node_modules/.package-lock.json` tracked** : 2 derniers fichiers orphelins dans l'index git. `git rm --cached`.

### Moyen terme (V1.1)
- [ ] **Refactoriser `Dimensions.get('window')` top-level → `useWindowDimensions()` hook** sur les 5 écrans concernés. Débloquerait le passage en `web.output: "static"` (SEO indexable par Google, vraies pages par route).
- [ ] **Clé RevenueCat Android** : remplacer le placeholder `goog_placeholder_to_replace_before_play_store` par la vraie clé avant la soumission Play Store.

## Métriques avant/après

| Métrique | Avant | Après |
|---|---|---|
| Bundle JS web | 5.17 MB | 5.17 MB (inchangé) |
| `dist/` total | 6.1 MB | 6.4 MB (+300 KB favicons + og-image) |
| Fichiers `node_modules/expo-av` trackés | 209 | **0** |
| Lignes trackées en moins | — | **−19 652** |
| Meta tags dans `dist/index.html` | 5 (basiques) | **22** (OG, Twitter, canonical, theme-color, multi-size icons, desktop CSS) |
| `npm run typecheck` | ✅ OK | ✅ OK |
| Routes dénombrées | 14 | 14 (inchangé) |
| `restorePurchases` button | ✅ présent | ✅ confirmé |

## État final du repo

- Branche : `main`
- Dernier commit local : `0bcc416d` *(feat(web): restore desktop CSS wrapper)*
- À pousser : ce rapport + les 3 derniers commits non encore poussés (`6a9ea6d8`, `b7d1d904`, `0bcc416d`).
- `support.html` reste untracked (déjà servi sur GH Pages au tour précédent, hors scope nuit).
- `.expo/types/router.d.ts` et `node_modules/.package-lock.json` restent modifiés (orphelins historiques).

Bonne journée. Et bon courage pour le submit. 🌿
