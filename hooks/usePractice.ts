import { useState, useCallback } from 'react';
import { AsyncStorage_like } from '@/context/storage';

const JOURNAL_KEY = 'olivia_journal_v1';
const SESSION_KEY = 'olivia_session_done_v1';
const PATHS_KEY = 'olivia_path_progress_v1';

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  sessionId?: string;
  question: string;
  answer: string;
}

export interface PracticeState {
  sessionCompletedToday: boolean;
  completeSession: () => void;
  entries: JournalEntry[];
  addEntry: (e: Omit<JournalEntry, 'id'>) => void;
  deleteEntry: (id: string) => void;
  pathProgress: Record<string, number>;
  advancePath: (pathId: string) => void;
  resetPath: (pathId: string) => void;
}

export function usePractice(): PracticeState {
  const today = new Date().toISOString().slice(0, 10);

  // Lectures synchrones à l'init (storage déjà hydraté) — pas de load différé.
  const [sessionCompletedToday, setSessionCompletedToday] = useState<boolean>(
    () => AsyncStorage_like.get(SESSION_KEY) === today
  );
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const storedEntries = AsyncStorage_like.get(JOURNAL_KEY);
    if (storedEntries) {
      try {
        return (JSON.parse(storedEntries) as JournalEntry[]).slice(0, 30);
      } catch {}
    }
    return [];
  });
  const [pathProgress, setPathProgress] = useState<Record<string, number>>(() => {
    const storedPaths = AsyncStorage_like.get(PATHS_KEY);
    if (storedPaths) {
      try {
        return JSON.parse(storedPaths) as Record<string, number>;
      } catch {}
    }
    return {};
  });

  const completeSession = useCallback(() => {
    AsyncStorage_like.set(SESSION_KEY, today);
    setSessionCompletedToday(true);
  }, [today]);

  const addEntry = useCallback(
    (entry: Omit<JournalEntry, 'id'>) => {
      const newEntry: JournalEntry = {
        ...entry,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      };
      setEntries((prev) => {
        const updated = [newEntry, ...prev].slice(0, 30);
        AsyncStorage_like.set(JOURNAL_KEY, JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      AsyncStorage_like.set(JOURNAL_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const advancePath = useCallback((pathId: string) => {
    setPathProgress((prev) => {
      const current = prev[pathId] ?? 0;
      const updated = { ...prev, [pathId]: current + 1 };
      AsyncStorage_like.set(PATHS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const resetPath = useCallback((pathId: string) => {
    setPathProgress((prev) => {
      const updated = { ...prev, [pathId]: 0 };
      AsyncStorage_like.set(PATHS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    sessionCompletedToday,
    completeSession,
    entries,
    addEntry,
    deleteEntry,
    pathProgress,
    advancePath,
    resetPath,
  };
}
