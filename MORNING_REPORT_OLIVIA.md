# Morning Report — Olivia (rebrand Sophia)

> Session : nuit du 2026-05-18 au 2026-05-19
> Branche : `olivia-rebrand` (depuis `main`)

## 📊 État global

| Phase | Status |
|---|---|
| 2.1 Discovery Sophia | ✅ |
| 2.2-2.3 Plan + identité | ✅ (6 icônes, 3 palettes, plan complet dans OLIVIA_PLAN.md) |
| 2.4 Rebrand mécanique | ✅ (option A : bundle ID inchangé) |
| 2.5 Onglet Création | ✅ |
| 2.6 Comparaison Charif/Sophia | ✅ (dans OLIVIA_PLAN.md §5) |
| 2.7 Ce report | ✅ |

## 🎨 Décisions design — à choisir

### 1. Palette (3 options) — voir OLIVIA_PLAN.md §2.3
- **A** Olive profond (#202C1C + sauge + or) — recommandé
- **B** Sauge méditerranéenne (#1B2418 + sauge moyen)
- **C** Vert forêt + olive vif

### 2. Icône finale — 6 concepts dans `assets/olivia-icons/`
- `01_branch.png` — branche stylisée
- `02_tree.png` — olivier silhouette + halo
- `03_dove.png` — colombe + rameau (Gn 8) ← **recommandé** (référence biblique forte)
- `04_olive.png` — olive close-up
- `05_cross_vine.png` — croix + vigne
- `06_mount.png` — Mont des Oliviers

Ouvre-les dans Finder : `open /Users/charifhachichi/Documents/Claude/Sophia/assets/olivia-icons/`

### 3. Bundle ID
- **A** garder `com.sophia.christianwisdom` (recommandé si l'app est déjà sur ASC/store)
- **B** nouveau `com.charif.olivia` (clean, mais re-setup complet)

À décider en fonction de l'état App Store Connect de Sophia (jamais soumise vs déjà publiée).

### 4. Nom de l'onglet Création
- "Création" (actuel)
- "Notre Maison" (Laudato Si')
- "Don"

### 5. Sous-titre Création
- "Préserver la beauté du don" (actuel)
- "Notre maison commune"
- "Aimer ce qui a été créé"

### 6. Tab bar overcrowding (8 tabs c'est trop)
- Garder 5 (Aujourd'hui · Bibliothèque · Création · Favoris · Réglages) et déplacer Carême/Pratique/Savoir vers un menu Plus
- OU rationaliser : fusionner Carême → Bibliothèque (filtre saisonnier), Pratique + Savoir → un seul tab "Cheminement"

## 📁 Fichiers créés

- `app/(tabs)/creation.tsx` — onglet Création
- `data/creation_verses.json` — 55 versets bibliques
- `data/creation_gestures.json` — 40 gestes éco-quotidiens
- `data/creation_saints.json` — 15 saints (François, Hildegarde, Kateri, etc.)
- `assets/olivia-icons/*.png` — 6 concepts
- `OLIVIA_PLAN.md` — plan complet

## 📝 Fichiers modifiés

- `app.json` — name "Olivia", description, perm strings
- `app/(tabs)/_layout.tsx` — ajout tab Création (Leaf icon)
- `app/(tabs)/index.tsx` — greeting "Olivia"
- `app/(tabs)/settings.tsx` — Premium label, footer, Soutenir
- `app/onboarding.tsx` — logo 🕊 Olivia
- `components/CardActions.tsx` — signature partage
- `components/PremiumBanner.tsx` — Premium label
- `components/PremiumPaywall.tsx` — CTA label
- `context/I18nContext.tsx` — FR/EN values
- `.gitignore` — étendu (dist, .netlify, .expo)

## ✅ Status compilation

```
$ npx tsc --noEmit
EXIT: 0
```

## ⚠️ Risques identifiés

1. **lib/supabase.ts** : comment mentionne Sophia mais "does not use Supabase". À auditer.
2. **URLs publiques** privacy/terms hébergées sur `ffngnq28pm-sketch.github.io/sophia-christian-wisdom/` — toujours valides mais le nom contient sophia.
3. **Email support** : `support@sophia-app.fr` — domaine actif ? À migrer vers olivia ou conserver pour compat.
4. **Tab bar à 8 entries** : UX problématique sur petits écrans (cf décision 6).
5. **Pas de refactor des classes/types/identifiants techniques** — gardés pour ne pas casser (suit la consigne user).
6. **Assets audio** non commitsi le user souhaite les conserver, à committer manuellement (`assets/audio/*.wav`).

## 🚀 Prochaines étapes à mon réveil

1. Choisir palette + icône + bundle ID + nom Création
2. Si bundle ID B (clean) : créer nouvelle entrée ASC + nouveau projet EAS
3. Générer icône finale 1024×1024 → `assets/images/icon.png` + splash matching
4. Décider du sort de la tab bar (réduire à 5 ou utiliser menu)
5. Faire un build dev sur device pour validation visuelle de l'onglet Création
6. Préparer EAS build TestFlight V1

## 📐 Couverture i18n Olivia

L'i18n FR/EN existe déjà côté Sophia (`context/I18nContext.tsx`).
Les nouveaux strings du tab Création sont **hardcodés en FR** dans `creation.tsx` — à externaliser en V1.1 si la version EN est confirmée prioritaire.

Keys i18n updated : `aboutSophia`, `premiumTitle`, `premiumActive`, `tagline` (FR + EN).
