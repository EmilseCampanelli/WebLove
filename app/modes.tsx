import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModeCard } from "../src/components/ModeCard";
import { GAME_MODES, GameMode } from "../src/data/modes";
import { Colors, Typography, Spacing } from "../src/theme";

export default function ModesScreen() {
  const handleSelect = (mode: GameMode) => {
    router.push({ pathname: "/game", params: { modeId: mode.id } });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Volver"
          hitSlop={16}
        >
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Elegí un modo</Text>
        <View style={styles.backButton} />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Cada modo tiene su propia vibra.{"\n"}¿Por dónde empezamos?
        </Text>
        {GAME_MODES.map((mode) => (
          <ModeCard key={mode.id} mode={mode} onPress={() => handleSelect(mode)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    alignItems: "center",
  },
  backIcon: {
    fontSize: 22,
    color: Colors.text,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: "center",
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: Spacing.xl,
    fontStyle: "italic",
  },
});
