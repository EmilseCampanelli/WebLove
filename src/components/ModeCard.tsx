import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { GameMode } from "../data/modes";
import { Colors, Typography, Spacing, Radius, Shadow } from "../theme";

type Props = {
  mode: GameMode;
  onPress: () => void;
};

export function ModeCard({ mode, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${mode.label}. ${mode.description}`}
    >
      <View style={[styles.emojiContainer, { backgroundColor: mode.color + "22" }]}>
        <Text style={styles.emoji}>{mode.emoji}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{mode.label}</Text>
        <Text style={styles.description}>{mode.description}</Text>
        <Text style={[styles.count, { color: mode.color }]}>
          {mode.questionCount} preguntas
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    ...Shadow.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  emojiContainer: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  emoji: {
    fontSize: 26,
  },
  content: {
    flex: 1,
  },
  label: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 2,
  },
  description: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  count: {
    ...Typography.labelSmall,
  },
});
