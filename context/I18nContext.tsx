import React, { createContext, useContext, useState, useEffect } from 'react';
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
  aboutSophia: string;
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
  divineNamesDesc: 'Collection exclusive — attributs divins',
  fathers: 'Pères de l\'Église & Saints',
  fathersDesc: 'Série encyclopédique premium',
  favorites: 'Favoris',
  noFavorites: 'Aucun favori',
  noFavoritesText: "Touchez le cœur d'une sagesse pour la retrouver ici.",
  settings: 'Réglages',
  profile: 'PROFIL',
  yourName: 'Votre prénom',
  addName: 'Ajouter votre prénom...',
  greetingPreview: 'Utilisé pour : "Bonjour {name}, voici votre méditation du jour"',
  monthlyIntent: 'INTENTION DU MOIS',
  focusTheme: 'Thème de contemplation',
  notifications: 'NOTIFICATIONS',
  dailyWisdom: 'Méditation quotidienne',
  receiveDaily: 'Recevez une sagesse chaque jour',
  sendTime: "Heure d'envoi",
  notifTheme: 'Thème des notifications',
  random: 'Aléatoire',
  visualTheme: 'THÈME VISUEL',
  language: 'LANGUE',
  interfaceLanguage: "Langue de l'interface",
  about: 'À PROPOS',
  aboutSophia: 'À propos de Sophia',
  version: 'Version 1.0.0',
  tagline: 'Lumière, sagesse et grâce — chaque jour.',
  save: 'Sauvegarder',
  themeDark: 'Vêpres',
  themeLight: 'Laudes',
  themeSepia: 'Monastère',
  themeDarkDesc: 'Prune profond — méditation nocturne',
  themeLightDesc: 'Parchemin doux — prière du matin',
  themeSepiaDesc: 'Parchemin sombre — style médiéval',
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
  premiumTitle: 'Sophia Premium',
  premiumDesc: 'Accédez à toute la sagesse',
  premiumSee: 'Découvrir',
  premiumActive: 'Sophia Premium actif',
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
  divineNamesDesc: 'Exclusive collection — divine attributes',
  fathers: 'Church Fathers & Saints',
  fathersDesc: 'Premium encyclopedia series',
  favorites: 'Favorites',
  noFavorites: 'No favorites yet',
  noFavoritesText: 'Tap the heart on a wisdom card to save it here.',
  settings: 'Settings',
  profile: 'PROFILE',
  yourName: 'Your first name',
  addName: 'Add your name...',
  greetingPreview: 'Used for: "Good morning {name}, here is your meditation for today"',
  monthlyIntent: 'MONTHLY INTENTION',
  focusTheme: 'Contemplation theme',
  notifications: 'NOTIFICATIONS',
  dailyWisdom: 'Daily meditation',
  receiveDaily: 'Receive a wisdom every day',
  sendTime: 'Send time',
  notifTheme: 'Notification theme',
  random: 'Random',
  visualTheme: 'VISUAL THEME',
  language: 'LANGUAGE',
  interfaceLanguage: 'Interface language',
  about: 'ABOUT',
  aboutSophia: 'About Sophia',
  version: 'Version 1.0.0',
  tagline: 'Light, wisdom and grace — every day.',
  save: 'Save',
  themeDark: 'Vespers',
  themeLight: 'Lauds',
  themeSepia: 'Monastery',
  themeDarkDesc: 'Deep plum — night meditation',
  themeLightDesc: 'Soft parchment — morning prayer',
  themeSepiaDesc: 'Dark parchment — medieval style',
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
  premiumTitle: 'Sophia Premium',
  premiumDesc: 'Access all the wisdom',
  premiumSee: 'Discover',
  premiumActive: 'Sophia Premium active',
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

const KEY = 'sophia_language';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('fr');

  useEffect(() => {
    const saved = AsyncStorage_like.get(KEY) as Language | null;
    if (saved && LANG_MAP[saved]) setLangState(saved);
  }, []);

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
