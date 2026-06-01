# Screenshots App Store — Olivia v1.0

> Capture 6 screenshots dans le simulateur **iPhone 16 Pro Max** (résolution cible **1290×2796**).
> Apple exige au minimum 1 screenshot par taille d'écran couverte ; 6 = ordre conseillé pour maximiser la conversion.

---

## Préparation simulateur

```bash
npm run dev
# puis presser "i" dans le terminal Expo
```

- Modèle : **iPhone 16 Pro Max** (Simulator > File > Open Simulator > Choose iOS… > iPhone 16 Pro Max)
- Status bar : iOS affiche `9:41` par défaut dans le simulator — c'est le réglage Apple, on garde tel quel.
- Mode : **clair OU sombre, mais un seul mode pour les 6 captures** (cohérence visuelle exigée par Apple).
  Olivia a un `ThemeContext.tsx` automatique — pour figer en clair/sombre : Settings de l'app > Thème.
- Raccourci capture : **⌘ S** dans Simulator → fichier `.png` dans `~/Desktop` par défaut.

---

## Ordre conseillé des 6 screenshots

L'écran #1 = celui visible immédiatement dans la fiche App Store → doit être **le plus accrocheur**.

### #1 — Home avec carte du jour (Index `app/(tabs)/index.tsx`)
- **Route** : onglet *Accueil* (tab par défaut)
- **Contenu** : afficher la première carte (déjà la carte du jour à l'ouverture).
  - Cartes visuellement fortes à privilégier : **Ps 23:1** « Le Seigneur est mon berger… », **Augustin** « Aime, et fais ce que tu veux. », **Ubi caritas** « Là où règnent la charité et l'amour, là est Dieu. »
  - Pour favoriser ces cartes : si possible, swipe jusqu'à tomber dessus avant le screenshot.
- **Argument App Store** : *« Une carte de sagesse chrétienne chaque jour. »*

### #2 — Bibliothèque (Library `app/(tabs)/library.tsx`)
- **Route** : onglet *Bibliothèque*
- **Contenu** : grille des collections + tease Premium (« Les 50 Noms de Dieu », « Pères de l'Église »).
- **Argument** : *« 389 cartes méditatives à explorer — Bible, Pères, mystiques chrétiens. »*

### #3 — Détail d'une carte Premium (depuis Library, tap sur une carte verrouillée)
- **Route** : tap n'importe quelle carte de `library` au-delà de la `FREE_CARD_LIMIT` → ouvre le **Paywall Premium**.
- **Contenu** : `components/PremiumPaywall.tsx` complet — features, choix mensuel/à vie, **bouton « Restaurer mon accès »** (visible à la ligne 157-160 ✅).
- **Argument** : *« Olivia Premium : accès illimité à toutes les cartes, parcours, méditations. »*
- **Note importante review** : Apple exige que le bouton « Restaurer mon accès » soit **visible et fonctionnel** (Guideline 3.1.1). Confirmé présent dans le code.

### #4 — Chapelet (RosaryCounter sur home)
- **Route** : onglet *Accueil* → scroll vers le composant `<RosaryCounter />` (ligne 108 de index.tsx) ou bouton dédié si visible.
- **Contenu** : afficher le chapelet en cours avec ≥10 grains comptés (atteindre un milestone visuel).
- **Argument** : *« Compteur de chapelet intégré, hors-ligne et silencieux. »*

### #5 — Pères de l'Église (`app/church-fathers.tsx`)
- **Route** : Library > tap « Pères de l'Église et Saints »
- **Contenu** : liste/carousel des Pères avec citations.
- **Argument** : *« Série encyclopédique : Augustin, Thomas d'Aquin, François d'Assise… »*

### #6 — Onboarding (`app/onboarding.tsx`)
- **Route** : pour y revenir, réinitialiser AsyncStorage (Settings > Reset si l'option existe, sinon désinstaller/réinstaller l'app dans le simulateur).
- **Contenu** : le 1er écran d'introduction Olivia (le plus inspirant visuellement).
- **Argument** : *« Une expérience contemplative, sans publicité, sans tracking. »*

---

## In-App Purchases (5 produits)

Sources : `hooks/usePremium.ts:18-25` + `services/StoreService.ts:5-9`.

| Product ID | Type | Prix indicatif | Visible sur |
|---|---|---|---|
| `olivia_premium_monthly` | Subscription | 2,99 €/mois | Paywall (`PremiumPaywall`) |
| `olivia_premium_lifetime` | Non-consumable | 79,99 € | Paywall (`PremiumPaywall`) |
| `tip_small` | Consumable | 0,99 € | `app/support.tsx` (« Soutenir la Mission ») |
| `tip_medium` | Consumable | 2,99 € | `app/support.tsx` |
| `tip_large` | Consumable | 4,99 € | `app/support.tsx` |

**Visibilité paywall : un seul écran couvre les 2 abonnements.** Les 3 tips sont sur l'écran *Support* (accessible depuis Settings, à confirmer).

→ **ASC review : pas besoin de screenshots IAP séparés.** Les IAP sont visibles dans le paywall et l'écran Support, qui peuvent figurer en screenshots #3 et bonus si tu veux les valoriser.

---

## Routes navigables (référence rapide)

| Route | Fichier | Accessible via |
|---|---|---|
| Home | `app/(tabs)/index.tsx` | tab par défaut |
| Bibliothèque | `app/(tabs)/library.tsx` | tab |
| Carême | `app/(tabs)/lent.tsx` | tab |
| Pratique | `app/(tabs)/practice.tsx` | tab |
| Création | `app/(tabs)/creation.tsx` | tab |
| Favoris | `app/(tabs)/favorites.tsx` | tab |
| Éducation | `app/(tabs)/education.tsx` | tab |
| Réglages | `app/(tabs)/settings.tsx` | tab |
| Pères de l'Église | `app/church-fathers.tsx` | Library > collection |
| Noms divins | `app/divine-names.tsx` | Library > collection |
| Psaumes | `app/psalms.tsx` | Library > collection |
| Onboarding | `app/onboarding.tsx` | premier lancement |
| Support / Dons | `app/support.tsx` | Settings (à confirmer) |
| Paywall Premium | `components/PremiumPaywall.tsx` | tap carte verrouillée ou bouton Premium |

---

## Restore Purchases — confirmé présent ✅

- **Code** : `components/PremiumPaywall.tsx:157-160`
- **Label** : « Restaurer mon accès »
- **Handler** : `handleRestore()` → `restorePurchases()` du hook → `StoreService.restorePurchases()` → `Purchases.restorePurchases()`
- **Feedback** : message éphémère « Accès restauré ✓ » ou « Aucun abonnement retrouvé »

**Aucun ajout requis.** Compatible Guideline 3.1.1 Apple.

---

## Checklist d'avant capture

- [ ] Mode (clair ou sombre) figé partout
- [ ] Pas de notification active dans la status bar (le simulator est clean par défaut)
- [ ] Pas d'écran « Premium activé » par accident (sauf si on veut le montrer)
- [ ] Pas de modal d'erreur RC affichée
- [ ] Pour Onboarding (#6) : reset AsyncStorage ou réinstaller l'app dans le simulateur
- [ ] Vérifier que la résolution capture = **1290 × 2796** (Simulator > Device > iPhone 16 Pro Max)

## Workflow ASC (App Store Connect)

1. Connexion App Store Connect → My Apps → Olivia (ASC App ID 6773872600)
2. App Store tab > 1.0 Prepare for Submission
3. Section *6.7" iPhone Display* → upload les 6 PNG dans l'ordre voulu
4. ASC accepte 1290×2796 directement (taille native iPhone 16 Pro Max).
