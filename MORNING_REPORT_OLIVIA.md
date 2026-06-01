# Morning Report — Olivia (rebrand Sophia)

> Session : nuit du 2026-05-18 au 2026-05-19
> Branche : `olivia-rebrand` (depuis `main`)
> Dernière passe : 2026-05-19 (matin) — décisions finales appliquées

## 📊 État global

| Phase | Status |
|---|---|
| 2.1 Discovery Sophia | ✅ |
| 2.2-2.3 Plan + identité | ✅ (6 icônes, 3 palettes, plan complet dans OLIVIA_PLAN.md) |
| 2.4 Rebrand mécanique | ✅ |
| 2.5 Onglet Création | ✅ |
| 2.6 Comparaison Charif/Sophia | ✅ (dans OLIVIA_PLAN.md §5) |
| 2.7 Décisions finales appliquées | ✅ (palette A1, icône B, bundle olivia, prénoms) |

## ✅ Décisions finales appliquées

### 1. Palette : A1 Olivier Byzantin
Appliquée à `context/ThemeContext.tsx` (dark / light / sepia).

| Token | Dark (principal) | Light | Sepia |
|---|---|---|---|
| bg | `#1B2B4D` lapis profond | `#EDE4D0` ivoire | `#1F2A14` olive sombre |
| bgCard | `#243A5E` | `#F5EFE0` | `#293617` |
| textPrimary | `#EDE4D0` ivoire | `#1B2B4D` lapis | `#EDE4D0` |
| textSecondary | `#CDC4B0` | `#3D5224` olive | `#CDC4B0` |
| textAccent | `#DCB450` or clair | `#B8902D` or vieilli | `#DCB450` |

### 2. Icône finale
- Source : `~/Downloads/olivia-icon.png` (1024×1024, 68 KB)
- Croix latine or sur fond lapis profond + « Olivia » en italique
- Appliquée à `assets/images/icon.png` et `assets/images/splash-icon.png`
- Pas de prebuild iOS (`ios/`) — projet Expo managé, tout est généré au build

### 3. Splash screen
- `splash.backgroundColor` : `#0F0B18` → `#1B2B4D` (lapis profond)
- `splash.resizeMode` : `cover` → `contain` (icône centrée propre)
- Android `adaptiveIcon.backgroundColor` aligné sur lapis
- Notifications `color` aligné sur lapis

### 4. Bundle ID + scheme
- `ios.bundleIdentifier` : `com.sophia.christianwisdom` → **`com.charif.olivia`**
- `android.package` aligné
- `scheme` : `sophia` → `olivia`
- `slug` (`sophia-christian-wisdom`) et `extra.eas.projectId` inchangés → rename EAS à faire manuellement post-ship

### 5. Tagline et nom de l'onglet (déjà appliqués)
- Tagline : « Sagesse, paix et création — chaque jour. »
- Onglet : « Création » conservé
- Tab bar : 8 tabs conservées pour test sur device (cf. action user demain)

### 6. Prénoms chrétiens (`data/christianNames.ts`)
Ajout de deux entrées féminines :
- **Olivia** — Latin *Oliva*, l'olivier. Référence Genèse 8,11 (rameau de la colombe), onction sacrée, Mont des Oliviers. Patronne : Sainte Olive de Palerme (10 juin). Vertu : Paix.
- **Esperanza** — Latin *Spes*, Espérance. Vertu théologale (1 Co 13,13 ; Rm 12,12). Patronne : Sainte Espérance (Elpis), fille de sainte Sophie. Vertu : Espérance.

Détection auto via `findChristianNameMeaning` (case + accent insensitive) → fonctionnera lors de l'onboarding sans modification supplémentaire.

## 📦 Commits (branche `olivia-rebrand`)

```
b9285174 feat(olivia): add Olivia + Esperanza to Christian names
a2f89729 chore(olivia): bundle ID com.charif.olivia
b36b669c feat(olivia): apply A1 Byzantine palette to theme
e150db34 feat(olivia): apply icon B + splash lapis profond
```

## ✅ Status compilation

```
$ npx tsc --noEmit       → EXIT 0
$ npx expo-doctor        → 16/17 checks passed
  (seul fail : .expo/ pas dans .gitignore — sans rapport)
```

## ⚠️ Risques résiduels (inchangés depuis hier soir)

1. **lib/supabase.ts** : comment mentionne Sophia mais "does not use Supabase". À auditer.
2. **URLs publiques** privacy/terms hébergées sur `ffngnq28pm-sketch.github.io/sophia-christian-wisdom/` — toujours valides mais le nom contient sophia.
3. **Email support** : `support@sophia-app.fr` — domaine actif ? À migrer vers olivia ou conserver pour compat.
4. **Pas de refactor des classes/types/identifiants techniques** — gardés pour ne pas casser.

## 🚀 Prochaines étapes pour l'utilisateur au réveil

1. **Brancher l'iPhone et faire un test simulateur/device** pour valider le rendu visuel de la palette A1 (lapis + ivoire + or) et de la nouvelle icône → c'est là que se voient les défauts éventuels (contraste, lisibilité textuelle sur fond lapis).
2. **Décider après essai** si on garde les 8 tabs ou si on les rationalise (réduction à 5 + menu Plus, ou fusion Carême/Pratique/Savoir).
3. **Créer manuellement la nouvelle entrée App Store Connect** pour `com.charif.olivia` (nouveau bundle, nouvelle app side-by-side avec Charif). Penser à :
   - Nouvelle app dans ASC (réutiliser l'équipe Apple Developer existante)
   - Nouveau Subscription Group si Premium (sinon partager avec Charif via App Group)
   - Nouvelle entrée EAS (`eas init` dans le repo Olivia une fois prêt) — l'actuel `projectId` pointe encore vers Sophia
4. **Préparer le binaire V1 Olivia** : archive Xcode (après `npx expo prebuild --clean` qui régénérera `ios/` à partir d'app.json), signing avec Team `8BDCCST69F`, upload TestFlight.

## 📐 Couverture i18n Olivia

L'i18n FR/EN existe déjà côté Sophia (`context/I18nContext.tsx`).
Les nouveaux strings du tab Création sont **hardcodés en FR** dans `creation.tsx` — à externaliser en V1.1 si la version EN est confirmée prioritaire.

## 🌐 Web preview

- **URL publique** : https://ffngnq28pm-sketch.github.io/olivia-preview/
- **Repo de deploy** : https://github.com/ffngnq28pm-sketch/olivia-preview (public)
- **Date du déploiement** : 2026-05-19
- **Bundle size** : 6.2 MB (5.15 MB JS + fonts + assets)
- **Source** : `app.json` → `experiments.baseUrl = "/olivia-preview"` + `npx expo export --platform web` → dossier `dist/`

### Limitations connues en version web (ne pas chercher à fixer)
- Notifications push iOS : ne marchent pas sur web (normal — `expo-notifications` n'a pas de support browser pour push remote)
- In-App Purchases (`react-native-purchases`) : pas d'équivalent web, le paywall affichera mais sans tunnel d'achat
- `expo-haptics` : silencieusement no-op sur web
- Certaines libs natives ont des fallbacks ou ne s'affichent pas — c'est attendu

### Commande de re-deploy (copier-coller à chaque update)

```bash
cd /Users/charifhachichi/Documents/Claude/Sophia \
  && trash dist 2>/dev/null; npx expo export --platform web \
  && cd /tmp/olivia-preview-deploy \
  && find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.nojekyll' -exec rm -rf {} + \
  && cp -R /Users/charifhachichi/Documents/Claude/Sophia/dist/* . \
  && git add -A \
  && git commit -m "deploy: update Olivia web preview" \
  && git push
```

> Si `/tmp/olivia-preview-deploy` a été nettoyé (reboot etc.), recréer :
> ```bash
> mkdir /tmp/olivia-preview-deploy && cd /tmp/olivia-preview-deploy \
>   && git init -b main && git remote add origin https://github.com/ffngnq28pm-sketch/olivia-preview.git \
>   && git pull origin main && touch .nojekyll
> ```
