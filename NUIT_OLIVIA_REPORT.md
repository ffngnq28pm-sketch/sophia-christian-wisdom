# Veillée Olivia — Rapport de nuit

> Nuit du 2026-05-26 au 2026-05-27
> Branche : `olivia-rebrand` (rien n'a été poussé, rien n'a été mergé)
> Posture : moine copiste — lenteur, attention, soin

---

## Esprit de la veillée

Tu as donné carte blanche pour polir, raffiner, ajouter des attentions.
Pas de feature nouvelle, pas de refonte. La règle d'or : *dans le doute,
abstiens-toi avec élégance*.

J'ai choisi six chantiers, classés par valeur perçue par l'utilisateur,
et je m'y suis tenu. Chaque chantier a son commit avec un message
descriptif en français. `npx tsc --noEmit` est resté à EXIT 0 à chaque
étape.

---

## Six commits, six attentions

### 1. `fb32cb43` — Onboarding aligné palette A1 + microcopie contemplative

C'était la plus grosse rupture visuelle : l'onboarding utilisait encore
intégralement l'ancien palette pourpre (`#0F0B18`, `#1A1030`, `#C4954A`,
`#F2EAD8`, `#8A8FA8`) hardcodé sur toutes les vues. Au premier lancement,
Olivia commençait dans un univers visuel différent de celui qu'elle
prétend être.

**Couleurs.** Tout est passé au lapis profond, à l'or vieilli `#DCB450`
et à l'ivoire parchemin `#EDE4D0` de la palette A1. Le `setTheme('dark')`
est forcé à l'arrivée pour que l'onboarding pose la marque, peu importe
le thème mémorisé d'une session précédente.

**Microcopie.** L'utilisateur a maintenant droit à ce ton :

> **Bienvenue.**
> Asseyez-vous un instant.
> Comment puis-je vous appeler ?

Au lieu de *Bienvenue / Commençons votre chemin de sagesse*. Le bouton
*Passer* est devenu **Plus tard**. Le CTA final *Commencer mon chemin*
est devenu **Entrer en silence**. Les six vertus ont vu leurs courtes
descriptions reformulées au registre du psaume :

| Vertu | Avant | Après |
|---|---|---|
| Patience | Développer la persévérance et la sérénité | Marcher au pas du temps de Dieu |
| Gratitude | Cultiver la reconnaissance chaque jour | Recevoir chaque jour comme un don |
| Foi | Renforcer la confiance en Dieu | Confier ce que je ne maîtrise pas |
| Paix | Trouver la tranquillité intérieure | Tenir le silence comme une lampe |

**Animation.** Fade + translateY de 12pt à l'arrivée du logo (cubic out,
720ms). Entre les deux étapes, fade-out → fade-in (cubic in/out, 360ms).
Discret. Native driver pour rester fluide.

**Accessibilité.** Tous les CTA et l'input ont un `accessibilityLabel`.
Touch targets ≥ 44pt vérifiés.

---

### 2. `8225b3f9` — Réglages alignés palette A1

Les Réglages ont deux endroits où l'œil tombe immédiatement :

1. Le **Premium Banner** en haut, avec un gradient pourpre et un accent
   or hardcodés.
2. Les **trois swatches** de thèmes visuels en bas (Vêpres, Laudes,
   Monastère), qui montraient l'ancien palette comme prévisualisation
   — donc *le swatch ne ressemblait pas du tout au thème réel*.

Tout est passé aux tokens du thème courant. Les previews montrent
maintenant *exactement* les couleurs réelles (`#1B2B4D` pour le lapis,
`#EDE4D0` pour l'ivoire, `#1F2A14` pour l'olive). Les descriptions ont
été reformulées :

- *Nuit byzantine — défaut* → **Lapis profond — méditation du soir**
- *Pierre de taille — scriptorium* → **Olive sombre — silence du cloître**

Le track des Switch suit l'accent en lieu et place du `rgba(196,149,74,0.4)`
gravé. Les couleurs `#0F0B18` enterrées dans les styles (`saveBtnText`,
`activeCheckText`, `premiumCtaText`) ont été déplacées en inline avec
`colors.bg` — donc le texte sur l'or s'adaptera automatiquement quand
on bascule entre dark/light/sepia (sur fond ivoire, le texte du CTA
sera lapis ; sur fond lapis, il sera lapis aussi via la même règle —
c'est cohérent).

---

### 3. `af346019` — Bibliothèque, bannières Premium alignées

Les deux bannières *Nomina Dei* (Noms de Dieu) et *Patres Ecclesiae*
(Pères de l'Église) sont les premiers éléments visibles quand on ouvre
la Bibliothèque. Elles avaient :

- Un gradient d'overlay au pourpre (`rgba(15,11,24,...)`) qui voilait
  les images sous une nuit *violette*. Passé au lapis (`rgba(21,35,64,...)`,
  `rgba(10,22,50,...)`) : maintenant c'est une nuit *bleue*, qui s'accorde
  avec le reste de l'app.
- L'or `#C4954A` hardcodé partout — Star, Chevron, bordure, badge PREMIUM.
  Migré vers `colors.textAccent` qui suit le thème.

Les descriptions sont aussi adoucies :

- *Collection exclusive de 50 méditations* → **Cinquante méditations sur l'ineffable**
- *8 figures encyclopédiques* → **Huit figures, l'héritage vivant**

Conservation volontaire : le sous-titre des Pères reste en **copper
`#D4956A`** et la bordure du banner reste en **terra-cotta**, parce que
cette différenciation visuelle entre les deux bannières premium me
semble voulue (Pères = stone, terre, ancien ; Noms = or, lumière).
Si tu veux que ce soit aussi du lapis, c'est un changement d'une
ligne — dis-moi.

Le modal de carte (qui s'ouvre quand on touche une sagesse) a aussi
reçu : couleurs prises du thème, taille passée à 44×44pt.

---

### 4. `aa8f452e` — États vides contemplatifs

Deux empty states qui méritaient d'être traités comme des moments,
pas comme des messages d'erreur.

**Favoris vide** :

```
Une page blanche

Les pages que vous garderez près de vous
reviendront ici.

Comme on plie un coin de page dans un missel.
```

(L'image du coin de page plié venait de toi ; je l'ai prise au mot.)

**Journal vide** :

```
Les premiers mots viendront.
Notez ce qui s'est offert aujourd'hui.
```

L'icône cœur de l'empty state Favoris suit maintenant
`colors.textAccent`. Les modaux de Favoris ont leur fermeture en 44×44pt
avec `accessibilityLabel`.

Le journal a aussi reçu deux `accessibilityLabel` (bouton *Nouvelle
entrée* + bouton de suppression d'entrée, qui annonce maintenant la date
de l'entrée à supprimer dans VoiceOver).

---

### 5. `81d9f538` — Microcopie i18n FR + EN

Audit complet de `I18nContext.tsx`. Les chaînes refondues sont celles
qui sonnaient mécaniques ou qui référençaient l'ancienne palette :

| Avant | Après |
|---|---|
| Recevez une sagesse chaque jour | Une sagesse vous est offerte chaque jour |
| Accédez à toute la sagesse | Accéder à la sagesse complète |
| Aucun favori | Une page blanche |
| Méditation quotidienne | Sagesse quotidienne |
| Prune profond — méditation nocturne | Lapis profond — méditation du soir |
| Parchemin sombre — style médiéval | Olive sombre — silence du cloître |
| Ajouter votre prénom... | Saisissez votre prénom… (typo unicode `…`) |
| Bonjour {name}, voici votre méditation du jour | Bonjour {name}, voici votre sagesse du jour |

L'anglais a été refondu en parallèle, même intention.

J'ai laissé intacts les labels purement structurels (THÈMES, SOURCES,
TOUT, les noms des heures liturgiques, les noms de vertus en un mot).

---

### 6. `7fb2b029` — Accessibilité, labels sur boutons icônes

Pass de VoiceOver sur les écrans les plus visités. Tous les boutons
icône-seule reçoivent maintenant `accessibilityRole="button"` et un
`accessibilityLabel` clair.

- Index/Aujourd'hui : *Sagesse précédente*, *Sagesse suivante*, dots
  de pagination annoncés *Aller à la sagesse N sur M* avec
  `accessibilityState.selected`, focus bar annoncée avec son contexte
  complet *Intention du mois : N jours de Patience sur 30. Ouvrir
  les réglages.*
- Création : *Fermer la figure du saint*
- PremiumPaywall : *Fermer Olivia Premium* + `hitSlop` 12pt sur le X
  (qui est petit, 18px)
- Onboarding (déjà fait au commit 1) : *Continuer vers le choix du
  thème*, *Plus tard*, etc.
- Settings (commit 2) : *Sauvegarder le prénom*, *Découvrir Olivia
  Premium*
- Library + Favoris (commits 3-4) : *Fermer la sagesse*

Touch targets : tous les modal-close passent à 44×44pt (étaient à
36×36, en dessous du minimum WCAG/Apple HIG).

---

## Ce que j'ai délibérément laissé

Beaucoup. Voici les renoncements assumés.

### Le terra-cotta du banner Pères
Différenciation voulue entre Noms de Dieu (or) et Pères de l'Église
(stone). Si tu préfères 100% A1, c'est trois lignes à changer.

### Les couleurs vieux palette dans les composants secondaires
`#C4954A` et `#F2EAD8` traînent encore dans `components/WisdomCard.tsx`,
`components/CardActions.tsx`, `components/CardThumbnail.tsx`,
`components/StreakBadge.tsx`, `components/DailyChallengeWidget.tsx`,
`components/DailySaintWidget.tsx`, `components/RosaryCounter.tsx`,
`components/PremiumBanner.tsx`, `components/WallpaperExportButton.tsx`,
`hooks/useLiturgicalCalendar.ts` (couleurs des périodes liturgiques),
`app/divine-names.tsx`, `app/church-fathers.tsx`, `app/psalms.tsx`,
`app/support.tsx`, et `app/(tabs)/lent.tsx`.

L'ancien or `#C4954A` et le nouveau `#DCB450` sont **assez proches**
pour qu'à l'œil nu sur device la différence soit ténue. Les fixer tous
n'apporterait pas un gros gain visible mais représenterait beaucoup de
risque de régression dans des composants que je n'ai pas eu le temps de
tester. Je les ai donc laissés. Si tu veux, c'est un chantier à part,
mécanique, qui peut être fait en demi-journée.

### Les onglets Pratique / Création / Savoir
Les `title` de ces trois onglets sont **hardcodés en français** dans
`app/(tabs)/_layout.tsx`. Pas dans i18n. Pas critique pour shipper en
français — mais à externaliser quand l'anglais sera vraiment activé.

### Les strings de l'écran Favoris
`app/(tabs)/favorites.tsx` n'utilise **pas** `useI18n()` du tout — les
strings comme *Favoris*, *sagesses*, *Une page blanche* sont hardcodées
en français dans le JSX. J'ai mis à jour le copy hardcodé et aussi la
clé i18n correspondante, mais à terme l'écran devrait être branché sur
i18n. Même remarque pour `app/(tabs)/practice.tsx` (*Ma Pratique*,
*Session du Jour*, *Mon Journal*, *Mes Parcours*…), `app/(tabs)/creation.tsx`
(*Création*, *Préserver la beauté du don*, *Saints de la Création*…).

### Animations supplémentaires
Tu m'autorisais à ajouter "de subtiles animations sur l'ouverture de
cartes, le swipe entre versets, le défilement du chapelet". J'ai
ajouté un fade-in d'arrivée + fade entre étapes sur l'onboarding, mais
je n'ai pas touché aux autres parce que ces composants utilisent déjà
des Animated.Value pour leurs propres effets (`PremiumPaywall` a un
shimmer animé, le FlatList horizontal de l'index est `pagingEnabled`
avec `decelerationRate="fast"` qui donne déjà une bonne sensation).
Toucher sans bonne raison aurait été pour faire.

### Les contrastes WCAG AA
Je n'ai pas mesuré les contrastes au pixel près. Le ton `colors.textMuted`
(`#8B8474` sur fond lapis `#1B2B4D`) approche le seuil 4.5:1 mais ne
le franchit pas pour les textes en `fontSize <= 14`. C'est volontaire
côté design (palette de moine, lecture lente), mais à valider si tu vises
une conformité stricte. Idem `textShadow` du logo (lisibilité dépend de
l'arrière-plan).

### Le code natif Java/Swift
Évidemment intact. Tu m'avais dit non.

---

## Suggestions pour ton réveil

Tu évalueras à froid. Ces idées ne sont pas urgentes — c'est ce qui me
vient en sortant de la veillée.

1. **Lancer l'app sur device et regarder dans l'ordre :** onboarding →
   accueil → bibliothèque → favoris (vide d'abord, plein ensuite) →
   réglages. Les six commits forment un parcours visuel cohérent ; c'est
   l'ordre dans lequel ils ont été pensés.

2. **Décider du terra-cotta des Pères.** Si tu veux tout uniformiser au
   lapis/or, je peux faire le changement en deux minutes. Si tu veux
   garder la diff, je peux la *renforcer* avec un sous-ton bronze
   intentionnel partout sur le module Pères.

3. **Le chantier "purge des couleurs vieux palette" peut attendre une
   prochaine session.** Pas critique pour shipper en TestFlight. Critique
   pour shipper sur l'App Store si tu vises une cohérence parfaite.

4. **Branchement i18n sur les écrans qui n'y sont pas (favorites,
   creation, practice).** Une heure de travail, propre, pas risqué.
   À faire avant la traduction anglaise.

5. **Pour la review App Store** : le screenshot principal devrait être
   l'écran d'accueil avec la liturgie + une sagesse premium déverrouillée
   — c'est l'écran le plus dense visuellement et le plus représentatif
   de la valeur. L'onboarding refondu pourrait être le second screenshot
   ("paix dès la première seconde").

6. **Un tag local avant de continuer.** Quelque chose comme
   `git tag -a olivia-veillee-2026-05-27 -m "veillée polish"` sur le
   HEAD courant — pour pouvoir revenir à ce point précis si une session
   future part dans une direction qu'on ne veut pas garder.

---

## Posture finale

Tu m'as demandé de travailler comme un moine copiste. Six commits, plus
de 80 changements ciblés, zéro régression au typecheck, aucune dépendance
ajoutée, aucune feature inventée. La majorité du temps a été passée à
*regarder* et *choisir de ne rien faire*. Le reste, à reformuler des
chaînes pour qu'elles sonnent comme un psaume plutôt que comme une
notification.

Bonne nuit. Ou bon réveil — selon le côté du fuseau où tu te trouves.

—

🕊 Olivia · `olivia-rebrand` · 2026-05-27
