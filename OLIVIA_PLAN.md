# OLIVIA — Plan de Transformation

> Sophia → Olivia. App chrétienne, thème olivier, paix et création.
> Branche : `olivia-rebrand` depuis `main`.

---

## 1. Identité

**Nom** : Olivia (Latin *oliva*, l'olivier — paix, longévité, alliance)
**Sous-tagline retenue** : "Sagesse, paix et création — chaque jour."
**Symboles** : olivier, colombe (Gn 8,11), rameau, vigne

### Pourquoi Olivia plutôt que Sophia
- Sophia = nom déjà très utilisé dans l'écosystème spirituel (Pierre Rabhi, IA, etc.)
- Olivia ancre une identité visuelle forte (olivier, vert/or, paix biblique)
- L'olivier est central dans toute la Bible (Genèse, Psaumes, Mont des Oliviers, Romains 11)
- Olivia se prononce de la même façon en français, anglais, italien, espagnol
- Mémorable, doux, féminin sans être réservé

---

## 2. Décisions en attente côté utilisateur

### 2.1 Bundle ID (à choisir)

| Option | Bundle ID | App Store Connect | Avantages | Inconvénients |
|---|---|---|---|---|
| **A** (par défaut) | `com.sophia.christianwisdom` (inchangé) | Réutilise entrée existante | Pas de re-setup ASC, pas de re-souscription RevenueCat | Bundle ID ne correspond plus au nom |
| **B** (clean) | `com.charif.olivia` | Nouvelle entrée à créer | Cohérence parfaite, branding clean | Nouveau projet ASC, nouvelles IAPs à reconfigurer, nouvel install pour beta-testeurs |

**Recommandation** : si l'app n'a pas encore été soumise → option B (clean slate).
Si elle est déjà publiée ou en cours de review → option A (éviter de casser).

Selon ASC Sophia state (à vérifier) :
- Si Sophia n'a pas encore d'entrée live → **B fortement recommandé**
- Si Sophia est déjà sur le store → **A obligatoire** sans re-soumission complète

### 2.2 Slug Expo et scheme

- **slug** actuel : `sophia-christian-wisdom` — conservé pour ne pas perdre le projet EAS (cf `extra.eas.projectId`)
  - À renommer si option B retenue : `olivia-app`
- **scheme** actuel : `sophia://` — conservé
  - Si option B : passer à `olivia://`
- **android.package** : `com.sophia.christianwisdom` — couplé au bundle ID iOS

### 2.3 Palette (3 propositions)

#### A — Olive profond (recommandé)
- Background : `#202C1C` (vert olive très sombre)
- Card : `#2A3624`
- Accent texte : `#D6B266` (or chaud)
- Vert clair : `#BCC48E` (sauge)
- Crème : `#F4EAD2`

#### B — Sauge méditerranéenne
- Background : `#1B2418`
- Card : `#243422`
- Accent vert : `#9CAF88` (sauge moyen)
- Crème : `#EFE3C8`
- Bronze : `#A08552`

#### C — Vert forêt + olive vif
- Background : `#0F1F12`
- Card : `#1A2F1B`
- Vert vif : `#5C8A4E`
- Olive doré : `#B69142`
- Ivoire : `#F2EAD3`

### 2.4 Icône finale (6 concepts générés)

Dans `assets/olivia-icons/` :
1. `01_branch.png` — Branche d'olivier stylisée (tige + feuilles + grappes d'olives)
2. `02_tree.png` — Olivier entier en silhouette avec halo doré
3. `03_dove.png` — Colombe avec rameau d'olivier (Genèse 8) — **fortement biblique**
4. `04_olive.png` — Olive close-up + 4 feuilles dorées
5. `05_cross_vine.png` — Croix dorée entrelacée d'une vigne d'olivier
6. `06_mount.png` — Mont des Oliviers en silhouette avec collines, oliviers, étoile

**Recommandation** : 03 (colombe+rameau) ou 02 (olivier) — instantanément reconnaissable, pas besoin d'éducation visuelle pour le user.

### 2.5 Nom de l'onglet
- "Création" (actuel, sobre)
- ou "Notre Maison" (référence directe à *Laudato Si'*, "Notre Maison Commune")
- ou "Don" (court, intense)

Sous-titre :
- "Préserver la beauté du don" (actuel)
- "Notre maison commune" (Laudato Si')
- "Aimer ce qui a été créé"

---

## 3. Rebrand mécanique — état actuel

### Fait
- [x] `app.json` : name, displayName, microphone perm, description
- [x] `app/(tabs)/index.tsx` : greeting
- [x] `app/onboarding.tsx` : logo (🕊 + Olivia + sous-titre)
- [x] `app/(tabs)/settings.tsx` : Premium, Soutenir, footer
- [x] `components/PremiumPaywall.tsx`, `PremiumBanner.tsx`, `CardActions.tsx`
- [x] `context/I18nContext.tsx` : valeurs FR/EN

### Non fait (à valider)
- [ ] Bundle ID + slug + scheme (cf 2.1, 2.2)
- [ ] Renommer les classes/types/paths qui contiennent "sophia" (lib/supabase.ts comment, etc) — *prudent : risque de casser*
- [ ] Email support : `support@sophia-app.fr` → `support@olivia-app.fr` (nouveau domaine ?)
- [ ] URL privacy/terms : `ffngnq28pm-sketch.github.io/sophia-christian-wisdom/` → à migrer
- [ ] Assets/images : remplacer `assets/images/icon.png` et `splash-icon.png` par l'icône choisie
- [ ] AR/TR/UR translations dans I18nContext si l'app les supporte (à vérifier)

---

## 4. Onglet Création — fait

### Architecture
- Tab `creation` ajouté entre `practice` et `favorites` dans `_layout.tsx` (icône Leaf)
- Screen `app/(tabs)/creation.tsx` : verset du jour, geste du jour, liste saints (modal), hymne footer
- Data files :
  - `data/creation_verses.json` — 55 versets (Gn → Ap)
  - `data/creation_gestures.json` — 40 gestes éco-quotidiens
  - `data/creation_saints.json` — 15 saints

### Décision design
- Verset/geste du jour : calculés via `dailyIndex(length, salt)` basé sur `Math.floor(date / 86400000)` — change tous les jours
- Salt différent pour verset (0) et geste (7) pour qu'ils ne tournent pas en phase
- Style : police Cinzel pour titres (déjà chargée par Sophia)

### À ajouter potentiellement (V1.1)
- Favori sur un verset/geste/saint (réutiliser le hook `useFavorites`)
- Partage d'un verset/geste
- Recherche par thème (création / intendance / paix / contemplation / espérance / abondance)
- Hymne complet de Daniel 3 / Psaume 104 / Cantique de Frère Soleil — pages dédiées

---

## 5. Comparaison qualité Charif ↔ Sophia/Olivia

Constat : **Sophia/Olivia a déjà plus de features que Charif V1**.

| Feature | Charif V1 | Olivia |
|---|---|---|
| Cartes sagesses | ✓ (365) | ✓ (4742 lignes data — large pool) |
| Compteur dhikr/chapelet | ✓ Tasbih | ✓ RosaryCounter |
| Calendrier liturgique | ✓ Islamique | ✓ Catholique (LiturgicalCalendarWidget) |
| 99 Noms / Noms divins | ✓ 99 Allah | ✓ DivineNames |
| Penseurs / Saints | ✓ 8 thinkers | ✓ ChurchFathers + saints + DailySaintWidget |
| Horaires prière | ✓ usePrayerTimes (GPS/postal) | — (mais il y a la Liturgie des Heures dans le calendrier) |
| Audio | — (V1 retiré) | ✓ AudioService (5 ambiances) |
| Quiz éducatif | — | ✓ QuizComponent + EducationModule + WeeklyPath + GradeDisplay |
| Sourates / Bible | ✓ Al-Fatiha + Juz Amma | ✓ Psaumes |
| Carême / Ramadan | ✓ RamadanWidget | ✓ Lent tab + DailyChallengeWidget |
| Journal spirituel | — | ✓ SpiritualJournal |
| Onboarding | ✓ nom + thème focus | ✓ multi-step |
| **NOUVEAU** Création | — | ✓ (cf 4) |

### Features Charif que Olivia n'a pas encore
- **Liturgie des Heures complète** (équivalent horaires de prière) : déjà partiel via calendrier liturgique, à étendre
- **Compteur chapelet plus visuel** : RosaryCounter existe, comparé à TasbihCounter de Charif. À vérifier
- **Wallpaper export** : `WallpaperExportButton.tsx` existe côté Sophia. ✓

### Priorisation features (proposition)

**V1 Olivia (à shipper rapidement)**
- [x] Onglet Création (fait)
- [ ] Icône finale + palette (à choisir)
- [ ] Rebrand emails et URLs publiques
- [ ] Réduire la tab bar à 6 max (problème UX : 8 tabs c'est trop)
- [ ] Splash Olivia (à générer)

**V1.1**
- [ ] Favoris dans Création (verset, geste, saint)
- [ ] Liturgie des Heures détaillée
- [ ] Partage carte sociale style Charif
- [ ] Page dédiée Cantique de Frère Soleil

**V2**
- [ ] Pèlerinage virtuel (Mont des Oliviers, Assise, etc)
- [ ] Saints du jour push notification
- [ ] iCloud sync (commun avec Charif)
- [ ] Apple Watch companion (commun avec Charif)

---

## 6. Tab bar overcrowding

Actuellement **8 tabs** (avec Création) :
`Aujourd'hui · Bibliothèque · Carême · Pratique · Création · Favoris · Savoir · Réglages`

**Recommandations** :
- Garder 5 tabs visibles : Aujourd'hui, Bibliothèque, Création, Favoris, Réglages
- Déplacer Carême + Pratique + Savoir vers une sous-section accessible depuis Bibliothèque ou Aujourd'hui
- OU : utiliser un menu "Plus" pour les 3 derniers

À valider au réveil.

---

## 7. Risques techniques identifiés

- ⚠️ `lib/supabase.ts` est présent mais le commentaire dit "Sophia does not use Supabase" — vérifier que c'est mort code, sinon update les refs
- ⚠️ URLs publiques `ffngnq28pm-sketch.github.io/sophia-christian-wisdom/...` deviendront cassées si on renomme le repo GH Pages
- ⚠️ `eas.json` peut contenir des refs à sophia — à auditer
- ⚠️ Le sound asset `assets/audio/*.wav` n'est pas dans git (gitignored implicitement) — vérifier
- ⚠️ La feature audio (expo-av) est volumineuse en taille — si pas critique pour V1 Olivia, on peut la désactiver

---

## 8. Prochaines sessions

1. Décisions design (palette + icône + tab bar + bundle ID)
2. Génération de l'icône finale + splash en 3 tailles
3. Rebrand URLs publiques
4. Refonte tab bar pour passer à 5-6 tabs max
5. Test compilation + run device
6. Préparation EAS build
