import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Persistance unifiée.
// - Web : on lit/écrit directement dans localStorage (synchrone par nature).
// - Natif : AsyncStorage est asynchrone, mais l'API consommée par l'app est
//   synchrone. On garde donc un cache mémoire write-through : `hydrateStorage()`
//   charge une fois toutes les clés au démarrage, les lectures tapent le cache,
//   et les écritures mettent à jour le cache puis persistent en fire-and-forget.

const isWeb = Platform.OS === 'web';
const cache: Record<string, string> = {};

export const AsyncStorage_like = {
  get(key: string): string | null {
    if (isWeb) {
      return typeof window !== 'undefined' && window.localStorage
        ? localStorage.getItem(key)
        : null;
    }
    return cache[key] ?? null;
  },
  set(key: string, value: string): void {
    if (isWeb) {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
      }
      return;
    }
    cache[key] = value;
    AsyncStorage.setItem(key, value).catch((e) => {
      console.warn(`[storage] échec de persistance (set "${key}") :`, e);
    });
  },
  remove(key: string): void {
    if (isWeb) {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
      }
      return;
    }
    delete cache[key];
    AsyncStorage.removeItem(key).catch((e) => {
      console.warn(`[storage] échec de persistance (remove "${key}") :`, e);
    });
  },
};

// Hydratation unique du cache mémoire depuis AsyncStorage (natif uniquement).
// Idempotente : les appels suivants renvoient la même promesse.
let hydratePromise: Promise<void> | null = null;

export function hydrateStorage(): Promise<void> {
  if (isWeb) return Promise.resolve();
  if (hydratePromise) return hydratePromise;
  hydratePromise = (async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length > 0) {
        const pairs = await AsyncStorage.multiGet(keys);
        for (const [k, v] of pairs) {
          if (v !== null) cache[k] = v;
        }
      }
    } catch (e) {
      console.warn('[storage] échec de l’hydratation depuis AsyncStorage :', e);
    }
  })();
  return hydratePromise;
}
