import { useState, useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { AsyncStorage_like } from '@/context/storage';

const STORAGE_KEY = 'sophia_rosary_v1';
const MILESTONES = [10, 50, 150];

interface RosaryStorage {
  count: number;
  date: string;
}

function getTodayKey(): string {
  const now = new Date();
  if (now.getHours() < 5) {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().slice(0, 10);
  }
  return now.toISOString().slice(0, 10);
}

function getPrayerLabel(count: number): string {
  const pos = count % 50;
  if (pos === 0 && count > 0) return 'Gloire au Père';
  if (pos % 10 === 0) return 'Notre Père';
  return 'Je vous salue, Marie';
}

function getMilestoneLabel(count: number): string {
  if (count >= 150) return '✦ Rosaire complet ✦';
  if (count >= 50) return 'Un chapelet accompli';
  if (count >= 10) return 'Une dizaine accomplie';
  return '';
}

export interface RosaryState {
  count: number;
  milestone: number;
  progress: number;
  floatAnim: Animated.Value;
  prayerLabel: string;
  milestoneLabel: string;
  increment: () => void;
  reset: () => void;
}

export function useRosary(): RosaryState {
  const [count, setCount] = useState(0);
  const floatAnim = useRef(new Animated.Value(0)).current;
  const lastMilestone = useRef(0);

  useEffect(() => {
    const raw = AsyncStorage_like.get(STORAGE_KEY);
    if (!raw) return;
    try {
      const stored: RosaryStorage = JSON.parse(raw);
      if (stored.date === getTodayKey()) {
        setCount(stored.count);
        lastMilestone.current = Math.max(...MILESTONES.filter((m) => m <= stored.count), 0);
      }
    } catch {}
  }, []);

  const persist = useCallback((n: number) => {
    const data: RosaryStorage = { count: n, date: getTodayKey() };
    AsyncStorage_like.set(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const triggerFloat = useCallback(() => {
    floatAnim.setValue(0);
    Animated.sequence([
      Animated.timing(floatAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(floatAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [floatAnim]);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      persist(next);
      triggerFloat();
      if (MILESTONES.includes(next) && next > lastMilestone.current) {
        lastMilestone.current = next;
      }
      return next;
    });
  }, [persist, triggerFloat]);

  const reset = useCallback(() => {
    setCount(0);
    lastMilestone.current = 0;
    persist(0);
  }, [persist]);

  const nextMilestone = MILESTONES.find((m) => m > count) ?? MILESTONES[MILESTONES.length - 1];
  const prevMilestone = Math.max(...MILESTONES.filter((m) => m <= count), 0);
  const progress =
    nextMilestone > prevMilestone
      ? (count - prevMilestone) / (nextMilestone - prevMilestone)
      : 1;

  return {
    count,
    milestone: nextMilestone,
    progress,
    floatAnim,
    prayerLabel: getPrayerLabel(count),
    milestoneLabel: getMilestoneLabel(count),
    increment,
    reset,
  };
}
