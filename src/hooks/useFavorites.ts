import { useState, useEffect, useCallback } from "react";
import {
  getFavorites,
  toggleFavorite as storedToggle,
  saveFavorites,
} from "../storage/storage";

export type UseFavoritesResult = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  isLoaded: boolean;
};

export function useFavorites(): UseFavoritesResult {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getFavorites().then((ids) => {
      setFavorites(ids);
      setIsLoaded(true);
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const toggle = useCallback(async (id: string) => {
    const next = await storedToggle(id);
    setFavorites(next);
  }, []);

  const clearAll = useCallback(async () => {
    setFavorites([]);
    await saveFavorites([]);
  }, []);

  return { favorites, isFavorite, toggle, clearAll, isLoaded };
}
