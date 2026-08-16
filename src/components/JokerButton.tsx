import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Colors, Typography, Spacing, Radius } from "../theme";

type JokerType = "beso" | "mimo" | "sorpresa";

type Props = {
  type: JokerType;
  onPress: () => void;
  disabled?: boolean;
};

const JOKER_CONFIG: Record<JokerType, { emoji: string; label: string; color: string }> = {
  beso: { emoji: "💋", label: "Beso", color: Colors.intimo },
  mimo: { emoji: "🫶", label: "Mimo", color: Colors.conexion },
  sorpresa: { emoji: "🎲", label: "Sorpresa", color: Colors.sorpresa },
};

export function JokerButton({ type, onPress, disabled }: Props) {
  const config = JOKER_CONFIG[type];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { borderColor: config.color + "60" },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Comodín: ${config.label}`}
    >
      <View style={[styles.emojiWrapper, { backgroundColor: config.color + "18" }]}>
        <Text style={styles.emoji}>{config.emoji}</Text>
      </View>
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.sm,
    minWidth: 76,
    gap: 4,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.94 }],
  },
  disabled: {
    opacity: 0.35,
  },
  emojiWrapper: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 22,
  },
  label: {
    ...Typography.labelSmall,
    fontSize: 10,
  },
});
