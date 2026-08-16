import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors, Radius } from "../theme";
import { TimerState } from "../hooks/useTimer";

interface Props {
  formatted: string;
  state: TimerState;
  label: string;
  hint?: string;
  completionMessage: string;
  onToggle: () => void;
  onReset: () => void;
}

export function TimerDisplay({
  formatted,
  state,
  label,
  hint,
  completionMessage,
  onToggle,
  onReset,
}: Props) {
  const isDone = state === "done";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label.toUpperCase()}</Text>

      <Text style={[styles.time, isDone && styles.timeDone]}>{formatted}</Text>

      {isDone ? (
        <Text style={styles.completionMsg}>{completionMessage}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}

      <View style={styles.actions}>
        {!isDone && (
          <Pressable
            style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.btnPressed]}
            onPress={onToggle}
            accessibilityRole="button"
            accessibilityLabel={state === "running" ? "Pausar" : "Empezar"}
          >
            <Text style={styles.btnPrimaryLabel}>
              {state === "running" ? "PAUSAR" : state === "paused" ? "CONTINUAR" : "EMPEZAR"}
            </Text>
          </Pressable>
        )}
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnSecondary, pressed && styles.btnPressed]}
          onPress={onReset}
          accessibilityRole="button"
          accessibilityLabel="Reiniciar"
        >
          <Text style={styles.btnSecondaryLabel}>{isDone ? "REPETIR" : "REINICIAR"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingHorizontal: 24,
  },
  label: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.textSecondary,
  },
  time: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 96,
    lineHeight: 100,
    color: Colors.text,
    letterSpacing: -2,
  },
  timeDone: {
    color: Colors.primary,
  },
  hint: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
    fontStyle: "italic",
    textAlign: "center",
    maxWidth: 280,
  },
  completionMsg: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 20,
    lineHeight: 28,
    color: Colors.text,
    fontStyle: "italic",
    textAlign: "center",
    maxWidth: 280,
  },
  actions: {
    gap: 10,
    width: "100%",
  },
  btn: {
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
  },
  btnPrimaryLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
  btnSecondary: {
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.18)",
  },
  btnSecondaryLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.textSecondary,
  },
  btnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.975 }],
  },
});
