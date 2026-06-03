import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage_like } from './storage';

export type Language = 'fr' | 'en';

export interface Translations {
  tabToday: string;
  tabLibrary: string;
  tabLent: string;
  tabFavorites: string;
  tabSettings: string;
  wisdomOfDay: string;
  card: string;
  of: string;
  library: string;
  wisdoms: string;
  themes: string;
  sources: string;
  all: string;
  divineNames: string;
  divineNamesSub: string;
  divineNamesDesc: string;
  fathers: string;
  fathersDesc: string;
  favorites: string;
  noFavorites: string;
  noFavoritesText: string;
  settings: string;
  profile: string;
  yourName: string;
  addName: string;
  greetingPreview: string;
  monthlyIntent: string;
  focusTheme: string;
  notifications: string;
  dailyWisdom: string;
  receiveDaily: string;
  sendTime: string;
  notifTheme: string;
  random: string;
  visualTheme: string;
  language: string;
  interfaceLanguage: string;
  about: string;
  aboutOlivia: string;
  version: string;
  tagline: string;
  save: string;
  themeDark: string;
  themeLight: string;
  themeSepia: string;
  themeDarkDesc: string;
  themeLightDesc: string;
  themeSepiaDesc: string;
  laudes: string;
  tierce: string;
  none: string;
  vespers: string;
  compline: string;
  laudesDesc: string;
  tierceDesc: string;
  noneDesc: string;
  vespersDesc: string;
  complineDesc: string;
  patience: string;
  gratitude: string;
  love: string;
  faith: string;
  wisdom: string;
  peace: string;
  lentTitle: string;
  dayOf: string;
  previewMode: string;
  deepMeaning: string;
  exclusivePremium: string;
  field: string;
  bornIn: string;
  legacy: string;
  famousQuote: string;
  shareCard: string;
  wallpaper: string;
  shareCardTitle: string;
  wallpaperTitle: string;
  preview: string;
  shareBtn: string;
  savePhotos: string;
  premiumTitle: string;
  premiumDesc: string;
  premiumSee: string;
  premiumActive: string;
  daysOf: string;
  days: string;
  day: string;
}

const FR: Translations = {
  tabToday: "Aujourd'hui",
  tabLibrary: 'Bibliothèque',
  tabLent: 'Liturgie',
  tabFavorites: 'Favoris',
  tabSettings: 'Réglages',
  wisdomOfDay: 'SAGESSE DU JOUR',
  card: 'CARTE',
  of: '/',
  library: 'Bibliothèque',
  wisdoms: 'sagesses',
  themes: 'Thèmes',
  sources: 'Sources',
  all: 'Tout',
  divineNames: 'Les Noms de Dieu',
  divineNamesSub: 'Deus Lux Est',
  divineNamesDesc: "Cinquante méditations sur l'ineffable",
  fathers: 'Pères de l\'Église & Saints',
  fathersDesc: "Huit figures, l'héritage vivant",
  favorites: 'Favoris',
  noFavorites: 'Une page blanche',
  noFavoritesText: "Les pages que vous garderez près de vous reviendront ici.\nComme on plie un coin de page dans un missel.",
  settings: 'Réglages',
  profile: 'PROFIL',
  yourName: 'Votre prénom',
  addName: 'Saisissez votre prénom…',
  greetingPreview: 'Utilisé pour : « Bonjour {name}, voici votre sagesse du jour »',
  monthlyIntent: 'INTENTION DU MOIS',
  focusTheme: 'Thème de contemplation',
  notifications: 'NOTIFICATIONS',
  dailyWisdom: 'Sagesse quotidienne',
  receiveDaily: 'Une sagesse vous est offerte chaque jour',
  sendTime: "Heure d'envoi",
  notifTheme: 'Thème des notifications',
  random: 'Aléatoire',
  visualTheme: 'THÈME VISUEL',
  language: 'LANGUE',
  interfaceLanguage: "Langue de l'interface",
  about: 'À PROPOS',
  aboutOlivia: "À propos d'Olivia",
  version: 'Version 1.0.0',
  tagline: 'Sagesse, paix et création — chaque jour.',
  save: 'Sauvegarder',
  themeDark: 'Vêpres',
  themeLight: 'Laudes',
  themeSepia: 'Monastère',
  themeDarkDesc: 'Lapis profond — méditation du soir',
  themeLightDesc: 'Parchemin ivoire — prière du matin',
  themeSepiaDesc: 'Olive sombre — silence du cloître',
  laudes: 'Laudes',
  tierce: 'Tierce',
  none: 'None',
  vespers: 'Vêpres',
  compline: 'Complies',
  laudesDesc: 'Prière du matin, au lever du soleil',
  tierceDesc: 'Milieu de la matinée',
  noneDesc: 'Heure du milieu du jour',
  vespersDesc: 'Prière du soir',
  complineDesc: 'Prière avant le coucher',
  patience: 'Patience',
  gratitude: 'Gratitude',
  love: 'Amour',
  faith: 'Foi',
  wisdom: 'Sagesse',
  peace: 'Paix',
  lentTitle: 'Temps liturgique',
  dayOf: 'Jour',
  previewMode: 'Aperçu',
  deepMeaning: 'SENS SPIRITUEL',
  exclusivePremium: 'Collection Exclusive Premium',
  field: 'Domaine',
  bornIn: 'Né à',
  legacy: 'Héritage',
  famousQuote: 'Citation célèbre',
  shareCard: 'Partager',
  wallpaper: "Fond d'écran",
  shareCardTitle: 'Partager',
  wallpaperTitle: "Fond d'écran",
  preview: 'APERÇU',
  shareBtn: 'Partager',
  savePhotos: 'Enregistrer dans Photos',
  premiumTitle: 'Olivia Premium',
  premiumDesc: 'Accéder à la sagesse complète',
  premiumSee: 'Découvrir',
  premiumActive: 'Olivia Premium actif',
  daysOf: 'jours de',
  days: 'jours',
  day: 'jour',
};

const EN: Translations = {
  tabToday: 'Today',
  tabLibrary: 'Library',
  tabLent: 'Liturgy',
  tabFavorites: 'Favorites',
  tabSettings: 'Settings',
  wisdomOfDay: 'WISDOM OF THE DAY',
  card: 'CARD',
  of: '/',
  library: 'Library',
  wisdoms: 'wisdoms',
  themes: 'Themes',
  sources: 'Sources',
  all: 'All',
  divineNames: 'Names of God',
  divineNamesSub: 'Deus Lux Est',
  divineNamesDesc: 'Fifty meditations on the ineffable',
  fathers: 'Church Fathers & Saints',
  fathersDesc: 'Eight figures, a living heritage',
  favorites: 'Favorites',
  noFavorites: 'A blank page',
  noFavoritesText: 'The pages you keep close will return here.\nLike folding a corner in a missal.',
  settings: 'Settings',
  profile: 'PROFILE',
  yourName: 'Your first name',
  addName: 'Enter your first name…',
  greetingPreview: 'Used for: "Good morning {name}, here is your wisdom for today"',
  monthlyIntent: 'MONTHLY INTENTION',
  focusTheme: 'Contemplation theme',
  notifications: 'NOTIFICATIONS',
  dailyWisdom: 'Daily wisdom',
  receiveDaily: 'A wisdom is offered to you each day',
  sendTime: 'Send time',
  notifTheme: 'Notification theme',
  random: 'Random',
  visualTheme: 'VISUAL THEME',
  language: 'LANGUAGE',
  interfaceLanguage: 'Interface language',
  about: 'ABOUT',
  aboutOlivia: 'About Olivia',
  version: 'Version 1.0.0',
  tagline: 'Wisdom, peace and creation — every day.',
  save: 'Save',
  themeDark: 'Vespers',
  themeLight: 'Lauds',
  themeSepia: 'Monastery',
  themeDarkDesc: 'Deep lapis — evening meditation',
  themeLightDesc: 'Ivory parchment — morning prayer',
  themeSepiaDesc: 'Dark olive — cloister silence',
  laudes: 'Lauds',
  tierce: 'Terce',
  none: 'None',
  vespers: 'Vespers',
  compline: 'Compline',
  laudesDesc: 'Morning prayer, at sunrise',
  tierceDesc: 'Mid-morning hour',
  noneDesc: 'Midday hour',
  vespersDesc: 'Evening prayer',
  complineDesc: 'Prayer before sleep',
  patience: 'Patience',
  gratitude: 'Gratitude',
  love: 'Love',
  faith: 'Faith',
  wisdom: 'Wisdom',
  peace: 'Peace',
  lentTitle: 'Liturgical Season',
  dayOf: 'Day',
  previewMode: 'Preview',
  deepMeaning: 'SPIRITUAL MEANING',
  exclusivePremium: 'Exclusive Premium Collection',
  field: 'Field',
  bornIn: 'Born in',
  legacy: 'Legacy',
  famousQuote: 'Famous quote',
  shareCard: 'Share',
  wallpaper: 'Wallpaper',
  shareCardTitle: 'Share',
  wallpaperTitle: 'Wallpaper',
  preview: 'PREVIEW',
  shareBtn: 'Share',
  savePhotos: 'Save to Photos',
  premiumTitle: 'Olivia Premium',
  premiumDesc: 'Reach the full wisdom',
  premiumSee: 'Discover',
  premiumActive: 'Olivia Premium active',
  daysOf: 'days of',
  days: 'days',
  day: 'day',
};

export const LANG_MAP: Record<Language, Translations> = { fr: FR, en: EN };

export const LANG_META: { code: Language; label: string; native: string; rtl: boolean }[] = [
  { code: 'fr', label: 'Français', native: 'Français', rtl: false },
  { code: 'en', label: 'English',  native: 'English',  rtl: false },
];

interface I18nCtx {
  lang: Language;
  t: Translations;
  setLang: (l: Language) => void;
  isRTL: boolean;
}

const I18nContext = createContext<I18nCtx>({
  lang: 'fr',
  t: FR,
  setLang: () => {},
  isRTL: false,
});

const KEY = 'olivia_language';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = AsyncStorage_like.get(KEY) as Language | null;
    return saved && LANG_MAP[saved] ? saved : 'fr';
  });

  function setLang(l: Language) {
    setLangState(l);
    AsyncStorage_like.set(KEY, l);
  }

  const t = LANG_MAP[lang];

  return (
    <I18nContext.Provider value={{ lang, t, setLang, isRTL: false }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
