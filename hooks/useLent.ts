import { useMemo } from 'react';

// Ash Wednesday dates and corresponding Easter dates
const LENT_SEASONS = [
  { ashWednesday: new Date(2025, 2, 5),  easter: new Date(2025, 3, 20), total: 40 },
  { ashWednesday: new Date(2026, 1, 18), easter: new Date(2026, 3, 5),  total: 40 },
];

const ADVENT_SEASONS = [
  { start: new Date(2025, 10, 30), end: new Date(2025, 11, 24), label: 'Avent 2025' },
  { start: new Date(2026, 10, 29), end: new Date(2026, 11, 24), label: 'Avent 2026' },
];

export interface LentState {
  isLent: boolean;
  isAdvent: boolean;
  seasonLabel: string;
  day: number;
  total: number;
  daysLeft: number;
  nextSeason: string | null;
  daysUntilNext: number;
}

export function useLent(): LentState {
  return useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    for (const season of LENT_SEASONS) {
      const ash = new Date(season.ashWednesday);
      ash.setHours(0, 0, 0, 0);
      const easter = new Date(season.easter);
      easter.setHours(0, 0, 0, 0);

      if (now >= ash && now <= easter) {
        const day = Math.floor((now.getTime() - ash.getTime()) / 86400000) + 1;
        const daysLeft = Math.ceil((easter.getTime() - now.getTime()) / 86400000);
        return {
          isLent: true,
          isAdvent: false,
          seasonLabel: 'Carême',
          day,
          total: season.total,
          daysLeft,
          nextSeason: null,
          daysUntilNext: 0,
        };
      }
    }

    for (const advent of ADVENT_SEASONS) {
      const start = new Date(advent.start);
      start.setHours(0, 0, 0, 0);
      const end = new Date(advent.end);
      end.setHours(0, 0, 0, 0);

      if (now >= start && now <= end) {
        const day = Math.floor((now.getTime() - start.getTime()) / 86400000) + 1;
        const total = Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;
        const daysLeft = Math.ceil((end.getTime() - now.getTime()) / 86400000);
        return {
          isLent: false,
          isAdvent: true,
          seasonLabel: advent.label,
          day,
          total,
          daysLeft,
          nextSeason: 'Noël',
          daysUntilNext: daysLeft,
        };
      }
    }

    // Find next lent or advent
    const allSeasons = [
      ...LENT_SEASONS.map((s) => ({ date: s.ashWednesday, name: 'Mercredi des Cendres' })),
      ...ADVENT_SEASONS.map((s) => ({ date: s.start, name: 'Avent' })),
    ];

    let nextSeason = null;
    let daysUntilNext = 999;

    for (const s of allSeasons) {
      const start = new Date(s.date);
      start.setHours(0, 0, 0, 0);
      const diff = Math.ceil((start.getTime() - now.getTime()) / 86400000);
      if (diff > 0 && diff < daysUntilNext) {
        daysUntilNext = diff;
        nextSeason = s.name;
      }
    }

    return {
      isLent: false,
      isAdvent: false,
      seasonLabel: 'Temps ordinaire',
      day: 0,
      total: 0,
      daysLeft: 0,
      nextSeason,
      daysUntilNext,
    };
  }, []);
}
