import { useState, useCallback } from 'react';
import { AsyncStorage_like } from '@/context/storage';

const KEY = 'sophia_favorites_v1';

function load(): Set<string> {
  const raw = AsyncStorage_like.get(KEY);
  if (!raw) return new Set();
  try {
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function save(ids: Set<string>) {
  AsyncStorage_like.set(KEY, JSON.stringify([...ids]));
}

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(load);
  const loading = false;

  const toggleFavorite = useCallback((cardId: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) next.delete(cardId);
      else next.add(cardId);
      save(next);
      return next;
    });
  }, []);

  return { favoriteIds, toggleFavorite, loading };
}
