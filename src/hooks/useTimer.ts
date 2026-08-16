import { useState, useEffect, useRef, useCallback } from "react";
import * as Haptics from "expo-haptics";

export type TimerState = "idle" | "running" | "paused" | "done";

export function useTimer(durationSeconds: number) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [state, setState] = useState<TimerState>("idle");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => clear();
  }, []);

  const start = useCallback(() => {
    if (state === "done") return;
    setState("running");
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clear();
          setState("done");
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [state]);

  const pause = useCallback(() => {
    clear();
    setState("paused");
  }, []);

  const reset = useCallback(() => {
    clear();
    setRemaining(durationSeconds);
    setState("idle");
  }, [durationSeconds]);

  const toggle = useCallback(() => {
    if (state === "running") {
      pause();
    } else if (state === "idle" || state === "paused") {
      start();
    }
  }, [state, start, pause]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress = 1 - remaining / durationSeconds;

  return { remaining, formatted, minutes, seconds, progress, state, start, pause, reset, toggle };
}
