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
    bg: '#1B2B4D',
    bgCard: '#243A5E',
    bgSection: 'rgba(184,144,45,0.06)',
    bgInput: 'rgba(184,144,45,0.10)',
    bgTabBar: '#152340',
    textPrimary: '#EDE4D0',
    textSecondary: '#CDC4B0',
    textMuted: '#8B8474',
    textAccent: '#DCB450',
    border: 'rgba(184,144,45,0.18)',
    borderAccent: 'rgba(184,144,45,0.45)',
    cardGradient: ['rgba(27,43,77,0.45)', 'rgba(27,43,77,0.72)', 'rgba(10,22,50,0.92)'],
    statusBar: 'light',
  },
  light: {
    bg: '#EDE4D0',
    bgCard: '#F5EFE0',
    bgSection: 'rgba(27,43,77,0.04)',
    bgInput: 'rgba(27,43,77,0.06)',
    bgTabBar: '#FFFFFF',
    textPrimary: '#1B2B4D',
    textSecondary: '#3D5224',
    textMuted: '#7A6E58',
    textAccent: '#B8902D',
    border: 'rgba(27,43,77,0.10)',
    borderAccent: 'rgba(184,144,45,0.40)',
    cardGradient: ['rgba(27,43,77,0.10)', 'rgba(27,43,77,0.40)', 'rgba(27,43,77,0.80)'],
    statusBar: 'dark',
  },
  sepia: {
    bg: '#1F2A14',
    bgCard: '#293617',
    bgSection: 'rgba(220,180,80,0.06)',
    bgInput: 'rgba(220,180,80,0.10)',
    bgTabBar: '#19220F',
    textPrimary: '#EDE4D0',
    textSecondary: '#CDC4B0',
    textMuted: '#8B8474',
    textAccent: '#DCB450',
    border: 'rgba(184,144,45,0.20)',
    borderAccent: 'rgba(184,144,45,0.45)',
    cardGradient: ['rgba(31,42,20,0.40)', 'rgba(31,42,20,0.70)', 'rgba(15,22,8,0.92)'],
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
    const saved = AsyncStorage_like.get('olivia_theme') as AppTheme | null;
    if (saved && THEMES[saved]) setThemeState(saved);
  }, []);

  function setTheme(t: AppTheme) {
    setThemeState(t);
    AsyncStorage_like.set('olivia_theme', t);
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
