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
import { Colors, Typography, Spacing, Radius } from "../src/theme";

export default function ModesScreen() {
  const handleSelect = (mode: GameMode) => {
    router.push({ pathname: "/game", params: { modeId: mode.id } });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      {/* Nav bar */}
      <View style={styles.nav}>
        <Pressable
          onPress={() => router.canGoBack() ? router.back() : router.replace("/")}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Volver"
          hitSlop={16}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.navTitle}>ELEGIR UN MODO</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Editorial heading */}
        <Text style={styles.heading}>{"¿Cómo estamos\nesta noche?"}</Text>

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
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: "rgba(235,226,213,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 26,
    color: Colors.text,
    lineHeight: 30,
  },
  navTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 2.5,
    color: Colors.textSecondary,
    textTransform: "uppercase",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  heading: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 32,
    lineHeight: 38,
    color: Colors.text,
    marginBottom: 28,
    letterSpacing: -0.3,
  },
});
