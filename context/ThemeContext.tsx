import React, { createContext, useContext, useState, useEffect } from 'react';
import { AsyncStorage_like } from './storage';

export type AppTheme = 'dark' | 'light' | 'sepia';

export interface ThemeColors {
  bg: string;
  bgCard: string;
  bgSection: string;
  bgInput: string;
  bgTabBar: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textAccent: string;
  border: string;
  borderAccent: string;
  cardGradient: [string, string, string];
  statusBar: 'light' | 'dark';
}

const THEMES: Record<AppTheme, ThemeColors> = {
  dark: {
    bg: '#0F0B18',
    bgCard: '#160E22',
    bgSection: 'rgba(196,149,74,0.05)',
    bgInput: 'rgba(196,149,74,0.08)',
    bgTabBar: '#100C1A',
    textPrimary: '#F2EAD8',
    textSecondary: '#C8B898',
    textMuted: '#5A4E6A',
    textAccent: '#C4954A',
    border: 'rgba(196,149,74,0.10)',
    borderAccent: 'rgba(196,149,74,0.35)',
    cardGradient: ['rgba(15,11,24,0.45)', 'rgba(15,11,24,0.72)', 'rgba(15,11,24,0.92)'],
    statusBar: 'light',
  },
  light: {
    bg: '#F9F4EC',
    bgCard: '#FFFFFF',
    bgSection: 'rgba(0,0,0,0.03)',
    bgInput: 'rgba(0,0,0,0.05)',
    bgTabBar: '#FFFFFF',
    textPrimary: '#1A1008',
    textSecondary: '#3A2A18',
    textMuted: '#8A7258',
    textAccent: '#A8782A',
    border: 'rgba(0,0,0,0.08)',
    borderAccent: 'rgba(168,120,42,0.4)',
    cardGradient: ['rgba(10,6,0,0.15)', 'rgba(10,6,0,0.50)', 'rgba(10,6,0,0.85)'],
    statusBar: 'dark',
  },
  sepia: {
    bg: '#1A1005',
    bgCard: '#221508',
    bgSection: 'rgba(210,170,90,0.06)',
    bgInput: 'rgba(210,170,90,0.08)',
    bgTabBar: '#160E04',
    textPrimary: '#EAD8A8',
    textSecondary: '#C8A878',
    textMuted: '#7A6040',
    textAccent: '#D4A03C',
    border: 'rgba(210,170,90,0.12)',
    borderAccent: 'rgba(212,160,60,0.4)',
    cardGradient: ['rgba(26,16,5,0.35)', 'rgba(26,16,5,0.65)', 'rgba(26,16,5,0.93)'],
    statusBar: 'light',
  },
};

interface ThemeCtx {
  theme: AppTheme;
  colors: ThemeColors;
  setTheme: (t: AppTheme) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: 'dark',
  colors: THEMES.dark,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AppTheme>('dark');

  useEffect(() => {
    const saved = AsyncStorage_like.get('sophia_theme') as AppTheme | null;
    if (saved && THEMES[saved]) setThemeState(saved);
  }, []);

  function setTheme(t: AppTheme) {
    setThemeState(t);
    AsyncStorage_like.set('sophia_theme', t);
  }

  return (
    <ThemeContext.Provider value={{ theme, colors: THEMES[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export { THEMES };
