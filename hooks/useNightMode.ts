import { useState, useRef, useCallback } from 'react';
import { AsyncStorage_like } from '@/context/storage';

const KEY_MANUAL  = 'olivia_night_manual';
const KEY_AUTO    = 'olivia_night_auto';
const KEY_TIMER   = 'olivia_night_timer';

export interface NightModeState {
  isNightMode: boolean;
  isAutoEnabled: boolean;
  timerMinutes: number | null;
  toggleManual: () => void;
  setAutoEnabled: (v: boolean) => void;
  setTimer: (m: number | null) => void;
}

function isEvening(): boolean {
  const h = new Date().getHours();
  return h >= 19 || h < 6;
}

export function useNightMode(): NightModeState {
  const [manual, setManual] = useState<boolean | null>(() => {
    const m = AsyncStorage_like.get(KEY_MANUAL);
    return m !== null ? m === 'true' : null;
  });
  const [autoEnabled, setAutoState] = useState<boolean>(() => {
    const a = AsyncStorage_like.get(KEY_AUTO);
    return a !== null ? a === 'true' : true;
  });
  const [timer, setTimerState] = useState<number | null>(() => {
    const t = AsyncStorage_like.get(KEY_TIMER);
    if (t === null) return null;
    return t === 'null' ? null : parseInt(t, 10);
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleManual = useCallback(() => {
    setManual((prev) => {
      const next = !prev;
      AsyncStorage_like.set(KEY_MANUAL, String(next));
      return next;
    });
  }, []);

  const setAutoEnabled = useCallback((v: boolean) => {
    setAutoState(v);
    AsyncStorage_like.set(KEY_AUTO, String(v));
  }, []);

  const setTimer = useCallback((m: number | null) => {
    setTimerState(m);
    AsyncStorage_like.set(KEY_TIMER, String(m));
    if (timerRef.current) clearTimeout(timerRef.current);
    if (m) {
      timerRef.current = setTimeout(() => setManual(false), m * 60 * 1000);
    }
  }, []);

  const isNightMode = manual !== null ? manual : (autoEnabled && isEvening());

  return { isNightMode, isAutoEnabled: autoEnabled, timerMinutes: timer, toggleManual, setAutoEnabled, setTimer };
}
