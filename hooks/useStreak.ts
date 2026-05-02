import { useState, useEffect, useCallback } from 'react';
import { AsyncStorage_like } from '@/context/storage';

const STORAGE_KEY = 'sophia_streak_v1';

interface StreakData {
  lastDate: string;
  streak: number;
  bestStreak: number;
}

function getTodayKey(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

function isConsecutiveDay(lastDate: string, today: string): boolean {
  const last = new Date(lastDate);
  const todayDate = new Date(today);
  const diff = Math.round((todayDate.getTime() - last.getTime()) / 86400000);
  return diff === 1;
}

export interface StreakState {
  streak: number;
  bestStreak: number;
  todayDone: boolean;
  recordOpen: () => void;
}

export function useStreak(): StreakState {
  const [data, setData] = useState<StreakData>({ lastDate: '', streak: 0, bestStreak: 0 });

  useEffect(() => {
    const raw = AsyncStorage_like.get(STORAGE_KEY);
    if (raw) {
      try { setData(JSON.parse(raw)); } catch {}
    }
  }, []);

  const recordOpen = useCallback(() => {
    const today = getTodayKey();
    setData((prev) => {
      if (prev.lastDate === today) return prev;
      const consecutive = isConsecutiveDay(prev.lastDate, today);
      const newStreak = consecutive ? prev.streak + 1 : 1;
      const newBest = Math.max(newStreak, prev.bestStreak);
      const next: StreakData = { lastDate: today, streak: newStreak, bestStreak: newBest };
      AsyncStorage_like.set(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const todayDone = data.lastDate === getTodayKey();

  return { streak: data.streak, bestStreak: data.bestStreak, todayDone, recordOpen };
}
