import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage_like } from './storage';

export type FocusTheme = 'Patience' | 'Gratitude' | 'Amour' | 'Foi' | 'Sagesse' | 'Paix';
export type NotifPreset = 'Laudes' | 'Tierce' | 'None' | 'Vêpres' | 'Complies';
export type AppTheme = 'dark' | 'light' | 'sepia';

export interface UserProfile {
  firstName: string;
  focusTheme: FocusTheme;
  focusStartedAt: number;
  notifEnabled: boolean;
  notifPreset: NotifPreset;
  notifTheme: string;
  appTheme: AppTheme;
  onboardingDone: boolean;
}

const DEFAULT: UserProfile = {
  firstName: '',
  focusTheme: 'Sagesse',
  focusStartedAt: Date.now(),
  notifEnabled: false,
  notifPreset: 'Laudes',
  notifTheme: '',
  appTheme: 'dark',
  onboardingDone: false,
};

interface ProfileCtx {
  profile: UserProfile;
  update: (patch: Partial<UserProfile>) => void;
  focusDays: number;
}

const ProfileContext = createContext<ProfileCtx>({
  profile: DEFAULT,
  update: () => {},
  focusDays: 0,
});

const KEY = 'olivia_user_profile';

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  // Lecture synchrone à l'init : le storage est déjà hydraté (gate dans
  // app/_layout.tsx), donc le 1er render porte la valeur persistée — pas de
  // course avec le guard d'onboarding de l'accueil.
  const [profile, setProfile] = useState<UserProfile>(() => {
    const raw = AsyncStorage_like.get(KEY);
    if (raw) {
      try {
        return { ...DEFAULT, ...JSON.parse(raw) };
      } catch {}
    }
    return DEFAULT;
  });

  function update(patch: Partial<UserProfile>) {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      AsyncStorage_like.set(KEY, JSON.stringify(next));
      return next;
    });
  }

  const focusDays = Math.max(
    1,
    Math.floor((Date.now() - profile.focusStartedAt) / 86400000) + 1
  );

  return (
    <ProfileContext.Provider value={{ profile, update, focusDays }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(ProfileContext);
}

export const FOCUS_THEMES: FocusTheme[] = [
  'Patience',
  'Gratitude',
  'Amour',
  'Foi',
  'Sagesse',
  'Paix',
];

export const FOCUS_THEME_ICONS: Record<FocusTheme, string> = {
  Patience: '🌊',
  Gratitude: '🌸',
  Amour: '🤝',
  Foi: '✝️',
  Sagesse: '⚖️',
  Paix: '🕊️',
};

export const NOTIF_PRESETS: { key: NotifPreset; label: string; time: string; desc: string }[] = [
  { key: 'Laudes',   label: 'Laudes',   time: '06:00', desc: 'Prière du matin, au lever du soleil' },
  { key: 'Tierce',   label: 'Tierce',   time: '09:00', desc: 'Milieu de la matinée' },
  { key: 'None',     label: 'None',     time: '12:00', desc: 'Heure du milieu du jour' },
  { key: 'Vêpres',   label: 'Vêpres',   time: '18:00', desc: 'Prière du soir' },
  { key: 'Complies', label: 'Complies', time: '21:00', desc: 'Prière avant le coucher' },
];
