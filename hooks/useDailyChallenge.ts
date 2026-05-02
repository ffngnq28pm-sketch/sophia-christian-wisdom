import { useState, useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { AsyncStorage_like } from '@/context/storage';
import { getTodayChallenge, Challenge } from '@/data/challenges';

function todayKey()  { return `sophia_challenge_done_${new Date().toISOString().slice(0, 10)}`; }
function monthKey()  { return `sophia_challenge_month_${new Date().toISOString().slice(0, 7)}`; }

function loadMonthCount(): number {
  return parseInt(AsyncStorage_like.get(monthKey()) ?? '0', 10);
}

function loadIsCompleted(): boolean {
  return AsyncStorage_like.get(todayKey()) === 'true';
}

export interface DailyChallengeState {
  challenge: Challenge;
  isCompleted: boolean;
  monthlyCount: number;
  markDone: () => void;
}

export function useDailyChallenge(): DailyChallengeState {
  const [challenge]      = useState<Challenge>(getTodayChallenge);
  const [isCompleted,  setIsCompleted]  = useState<boolean>(loadIsCompleted);
  const [monthlyCount, setMonthlyCount] = useState<number>(loadMonthCount);

  const markDone = useCallback(() => {
    if (isCompleted) return;

    AsyncStorage_like.set(todayKey(), 'true');

    const next = monthlyCount + 1;
    AsyncStorage_like.set(monthKey(), String(next));

    setIsCompleted(true);
    setMonthlyCount(next);

    if (next % 5 === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [isCompleted, monthlyCount]);

  return { challenge, isCompleted, monthlyCount, markDone };
}
