# Olivia — Sagesse chrétienne, au quotidien

Application mobile (iOS, + export web) de sagesse et de prière chrétiennes :
cartes de méditation quotidiennes, bibliothèque (Noms de Dieu, Pères de l'Église,
Psaumes), compteur de chapelet, calendrier liturgique, et un abonnement Premium.

> Le package npm s'appelle encore `sophia-christian-wisdom` (rebrand assumé vers
> Olivia ; le slug Expo et le repo GitHub restent inchangés).

## Stack

- Expo SDK 54 · Expo Router v6 · React Native 0.81 · React 19 · TypeScript
- RevenueCat (`react-native-purchases`) pour les achats in-app
- Persistance : `@react-native-async-storage/async-storage` (cache write-through, voir `context/storage.ts`)

## Démarrage

```bash
npm install
npm run dev          # Expo (port 8081) — presser "i" pour le simulateur iOS
```

## Scripts

| Script | Rôle |
|---|---|
| `npm run dev` | Lance Metro / Expo. |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run lint` | `expo lint`. |
| `npm run build:web` | Export web statique + injection des meta (SEO). |

## Variables d'environnement

Clés RevenueCat (préfixe `EXPO_PUBLIC_`, embarquées dans le bundle client) :

```
EXPO_PUBLIC_RC_KEY_IOS_OLIVIA=appl_xxx
EXPO_PUBLIC_RC_KEY_ANDROID_OLIVIA=goog_xxx
```

En l'absence de clés (Expo Go / web), le store bascule en mock et le paywall
affiche les prix de repli (19,99 € / 2,99 €).

## Build & publication

- iOS : `eas build --platform ios --profile production` puis `eas submit`.
- Web : `npm run build:web` → déploiement Netlify.

## Structure

```
app/         routes expo-router ((tabs)/ + écrans détail)
components/  composants UI
context/     providers + storage.ts (persistance)
data/        contenu statique (cartes, saints, psaumes…)
hooks/       hooks métier (usePremium, useStreak, useLiturgicalCalendar…)
services/    StoreService (RevenueCat), Notification, Wallpaper
```

## Licence

Propriétaire — © Charif Hachichi.
