import { useState, useEffect, useCallback } from "react";
import {
  HistoryEntry,
  getHistory,
  clearHistory as storedClear,
} from "../storage/storage";

export type UseHistoryResult = {
  history: HistoryEntry[];
  clearAll: () => Promise<void>;
  reload: () => Promise<void>;
  isLoaded: boolean;
};

export function useHistory(): UseHistoryResult {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const reload = useCallback(async () => {
    const entries = await getHistory();
    setHistory(entries);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const clearAll = useCallback(async () => {
    await storedClear();
    setHistory([]);
  }, []);

  return { history, clearAll, reload, isLoaded };
}
