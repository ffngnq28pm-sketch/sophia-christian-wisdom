import { useMemo } from 'react';

// Will import from data/saints.ts once created by data generation
// Stub type definition for compile-time safety
export interface DailySaint {
  date: string;
  saint: string;
  life: string;
  feastType: 'fête' | 'mémoire' | 'solennité' | 'commémoraison';
  story: string;
  achievement: string;
  anecdote: string;
  link?: string;
}

function getTodayMMDD(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${mm}-${dd}`;
}

let SAINTS: DailySaint[] = [];
try {
  SAINTS = require('@/data/saints').SAINTS ?? [];
} catch {}

const FALLBACK: DailySaint = {
  date: '01-01',
  saint: 'Marie, Mère de Dieu',
  life: '1er siècle',
  feastType: 'solennité',
  story: 'Marie, mère de Jésus, est honorée comme Théotokos — celle qui a porté Dieu. Son fiat a ouvert l\'histoire du salut.',
  achievement: 'Mère de Dieu et modèle de l\'Église',
  anecdote: 'À l\'Annonciation, elle répond simplement : "Qu\'il me soit fait selon ta parole."',
};

export function useDailySaint(): DailySaint {
  return useMemo(() => {
    const today = getTodayMMDD();
    return SAINTS.find((s) => s.date === today) ?? FALLBACK;
  }, []);
}
