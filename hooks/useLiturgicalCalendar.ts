import { useMemo } from 'react';
import { Theme } from '@/types';

export type LiturgicalPeriod =
  | 'avent'
  | 'noel'
  | 'epiphanie'
  | 'careme'
  | 'paques'
  | 'temps-pascal'
  | 'pentecote'
  | 'toussaint'
  | 'ordinaire';

// Key liturgical dates [year, month (1-based), day]
interface LiturgicalDate {
  name: string;
  date: [number, number, number];
}

const LITURGICAL_EVENTS: LiturgicalDate[] = [
  { name: 'Mercredi des Cendres', date: [2025, 3, 5] },
  { name: 'Pâques',               date: [2025, 4, 20] },
  { name: 'Ascension',            date: [2025, 5, 29] },
  { name: 'Pentecôte',            date: [2025, 6, 8] },
  { name: 'Toussaint',            date: [2025, 11, 1] },
  { name: 'Premier Dimanche de l\'Avent', date: [2025, 11, 30] },
  { name: 'Noël',                 date: [2025, 12, 25] },
  { name: 'Épiphanie',            date: [2026, 1, 6] },
  { name: 'Mercredi des Cendres', date: [2026, 2, 18] },
  { name: 'Pâques',               date: [2026, 4, 5] },
  { name: 'Ascension',            date: [2026, 5, 14] },
  { name: 'Pentecôte',            date: [2026, 5, 24] },
  { name: 'Toussaint',            date: [2026, 11, 1] },
  { name: 'Premier Dimanche de l\'Avent', date: [2026, 11, 29] },
  { name: 'Noël',                 date: [2026, 12, 25] },
];

function toMs(y: number, m: number, d: number): number {
  return new Date(y, m - 1, d).getTime();
}

function getPeriod(now: Date): LiturgicalPeriod {
  const t = now.getTime();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  // Toussaint: Nov 1
  if (m === 11 && d === 1) return 'toussaint';

  // Noël: Dec 25 - Jan 5
  if ((m === 12 && d >= 25) || (m === 1 && d <= 5)) return 'noel';

  // Épiphanie: Jan 6
  if (m === 1 && d === 6) return 'epiphanie';

  // 2025-2026 precise Lent periods
  const lentPeriods: [number, number][] = [
    [toMs(2025, 3, 5), toMs(2025, 4, 19)],  // Ash Wed → Holy Saturday
    [toMs(2026, 2, 18), toMs(2026, 4, 4)],
  ];
  for (const [start, end] of lentPeriods) {
    if (t >= start && t <= end) return 'careme';
  }

  // Easter Sunday
  const easterDays: [number, number, number][] = [
    [2025, 4, 20], [2026, 4, 5],
  ];
  for (const [ey, em, ed] of easterDays) {
    const eStart = toMs(ey, em, ed);
    const eEnd = toMs(ey, em, ed + 6); // octave (7 days)
    const pascalEnd = toMs(ey, em, ed + 49); // up to Pentecost
    const pentecote = toMs(ey, em, ed + 49);
    if (t >= eStart && t <= eEnd) return 'paques';
    if (t > eEnd && t < pentecote) return 'temps-pascal';
    if (t >= pentecote && t <= pentecote + 86400000) return 'pentecote';
  }

  // Advent: Nov 29/30 - Dec 24
  const adventStarts: [number, number, number][] = [
    [2025, 11, 30], [2026, 11, 29],
  ];
  for (const [ay, am, ad] of adventStarts) {
    const adventStart = toMs(ay, am, ad);
    const adventEnd = toMs(ay, 12, 24);
    if (t >= adventStart && t <= adventEnd) return 'avent';
  }

  return 'ordinaire';
}

// Dynamic accent color per liturgical season
export const PERIOD_ACCENT: Record<LiturgicalPeriod, string> = {
  avent:          '#7C3AED', // violet liturgique
  noel:           '#C4954A', // or de Noël
  epiphanie:      '#F59E0B', // or des mages
  careme:         '#7C3AED', // violet du Carême
  paques:         '#C4954A', // or pascal
  'temps-pascal': '#15803D', // vert de la résurrection
  pentecote:      '#DC2626', // rouge de l'Esprit
  toussaint:      '#C4954A', // or des saints
  ordinaire:      '#C4954A', // or par défaut
};

export const PERIOD_THEMES: Record<LiturgicalPeriod, Theme[]> = {
  avent:         ['Espoir', 'Paix', 'Patience'],
  noel:          ['Amour', 'Lumière', 'Gratitude'],
  epiphanie:     ['Lumière', 'Sagesse', 'Beauté'],
  careme:        ['Patience', 'Humilité', 'Pardon'],
  paques:        ['Amour', 'Espoir', 'Lumière'],
  'temps-pascal': ['Foi', 'Gratitude', 'Amour'],
  pentecote:     ['Force', 'Foi', 'Lumière'],
  toussaint:     ['Espoir', 'Paix', 'Foi'],
  ordinaire:     [],
};

export const PERIOD_LABELS: Record<LiturgicalPeriod, string> = {
  avent:         'Temps de l\'Avent',
  noel:          'Temps de Noël',
  epiphanie:     'Épiphanie du Seigneur',
  careme:        'Temps du Carême',
  paques:        'Octave de Pâques',
  'temps-pascal': 'Temps pascal',
  pentecote:     'Pentecôte',
  toussaint:     'Toussaint',
  ordinaire:     '',
};

export const PERIOD_EMOJI: Record<LiturgicalPeriod, string> = {
  avent:         '🕯️',
  noel:          '⭐',
  epiphanie:     '✨',
  careme:        '✝️',
  paques:        '🌅',
  'temps-pascal': '🌿',
  pentecote:     '🔥',
  toussaint:     '🌸',
  ordinaire:     '☀️',
};

// Lunar phase (for the calendar widget decorative element)
const NEW_MOON_REF = new Date('2000-01-06T18:14:00Z').getTime();
const LUNAR_CYCLE_MS = 29.53059 * 24 * 3600 * 1000;
const PHASE_EMOJIS = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

function getLunarPhase(date: Date) {
  const elapsed = date.getTime() - NEW_MOON_REF;
  const fraction = ((elapsed % LUNAR_CYCLE_MS) + LUNAR_CYCLE_MS) % LUNAR_CYCLE_MS / LUNAR_CYCLE_MS;
  const idx = Math.floor(fraction * 8) % 8;
  const labels = ['Nouvelle lune', 'Croissant', 'Premier quartier', 'Gibbeuse croissante',
    'Pleine lune', 'Gibbeuse décroissante', 'Dernier quartier', 'Croissant décroissant'];
  return { emoji: PHASE_EMOJIS[idx], label: labels[idx], fraction };
}

function daysUntilNextEvent(now: Date): { name: string; daysLeft: number } | null {
  const t = now.getTime();
  let best: { name: string; daysLeft: number } | null = null;

  for (const ev of LITURGICAL_EVENTS) {
    const evMs = toMs(...ev.date);
    const diff = Math.ceil((evMs - t) / 86400000);
    if (diff <= 0) continue;
    if (!best || diff < best.daysLeft) best = { name: ev.name, daysLeft: diff };
  }

  return best;
}

export interface LiturgicalCalendarState {
  period: LiturgicalPeriod;
  periodLabel: string;
  periodEmoji: string;
  periodAccent: string;
  lunarPhase: { emoji: string; label: string; fraction: number };
  nextEvent: { name: string; daysLeft: number } | null;
}

export function useLiturgicalCalendar(): LiturgicalCalendarState {
  return useMemo(() => {
    const now = new Date();
    const period = getPeriod(now);
    return {
      period,
      periodLabel: PERIOD_LABELS[period],
      periodEmoji: PERIOD_EMOJI[period],
      periodAccent: PERIOD_ACCENT[period],
      lunarPhase: getLunarPhase(now),
      nextEvent: daysUntilNextEvent(now),
    };
  }, []);
}
