import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { GameMode } from "../data/modes";
import { Colors, Typography, Spacing, Radius } from "../theme";

type Props = {
  mode: GameMode;
  onPress: () => void;
};

export function ModeCard({ mode, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${mode.label}. ${mode.description}`}
    >
      <View style={[styles.emojiBox, { backgroundColor: mode.color + "28" }]}>
        <Text style={styles.emoji}>{mode.emoji}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{mode.label.toUpperCase()}</Text>
        <Text style={styles.description}>{mode.description}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.983 }],
  },
  emojiBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    flexShrink: 0,
  },
  emoji: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    gap: 3,
  },
  label: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 1.8,
    color: Colors.text,
  },
  description: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 14,
    lineHeight: 19,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  arrow: {
    fontSize: 22,
    color: Colors.textTertiary,
    marginLeft: 8,
  },
});
