import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  FAVORITES: "@entrenosotros/favorites",
  HISTORY: "@entrenosotros/history",
  SETTINGS: "@entrenosotros/settings",
} as const;

export type HistoryEntry = {
  questionId: string;
  questionText: string;
  category: string;
  timestamp: number;
};

export type AppSettings = {
  animationsEnabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  darkMode: boolean;
};

const DEFAULT_SETTINGS: AppSettings = {
  animationsEnabled: true,
  soundEnabled: false,
  vibrationEnabled: true,
  darkMode: false,
};

async function getItem<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage write failures are silently ignored; favorites/history are best-effort
  }
}

// ── Favorites ────────────────────────────────────────────────────────────────

export async function getFavorites(): Promise<string[]> {
  return getItem<string[]>(KEYS.FAVORITES, []);
}

export async function saveFavorites(ids: string[]): Promise<void> {
  return setItem(KEYS.FAVORITES, ids);
}

export async function toggleFavorite(id: string): Promise<string[]> {
  const current = await getFavorites();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  await saveFavorites(next);
  return next;
}

// ── History ──────────────────────────────────────────────────────────────────

const MAX_HISTORY = 100;

export async function getHistory(): Promise<HistoryEntry[]> {
  return getItem<HistoryEntry[]>(KEYS.HISTORY, []);
}

export async function addToHistory(entry: HistoryEntry): Promise<void> {
  const current = await getHistory();
  const updated = [entry, ...current].slice(0, MAX_HISTORY);
  return setItem(KEYS.HISTORY, updated);
}

export async function clearHistory(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEYS.HISTORY);
  } catch {
    return setItem(KEYS.HISTORY, []);
  }
}

// ── Settings ─────────────────────────────────────────────────────────────────

export async function getSettings(): Promise<AppSettings> {
  return getItem<AppSettings>(KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  return setItem(KEYS.SETTINGS, settings);
}

export async function updateSetting<K extends keyof AppSettings>(
  key: K,
  value: AppSettings[K]
): Promise<AppSettings> {
  const current = await getSettings();
  const next = { ...current, [key]: value };
  await saveSettings(next);
  return next;
}

export { DEFAULT_SETTINGS };
