import { useState, useEffect, useCallback } from "react";
import {
  AppSettings,
  DEFAULT_SETTINGS,
  getSettings,
  updateSetting,
  saveSettings,
} from "../storage/storage";

export type UseSettingsResult = {
  settings: AppSettings;
  setSetting: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => Promise<void>;
  resetSettings: () => Promise<void>;
  isLoaded: boolean;
};

export function useSettings(): UseSettingsResult {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getSettings().then((s) => {
      setSettings(s);
      setIsLoaded(true);
    });
  }, []);

  const setSetting = useCallback(
    async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
      const next = await updateSetting(key, value);
      setSettings(next);
    },
    []
  );

  const resetSettings = useCallback(async () => {
    await saveSettings(DEFAULT_SETTINGS);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return { settings, setSetting, resetSettings, isLoaded };
}
