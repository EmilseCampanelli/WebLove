import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Radius } from "../src/theme";
import {
  GUIDED_EXPERIENCES,
  generateQuickSession,
} from "../src/data/generator";
import { CategoryTag } from "../src/data/activities";
import { setSession } from "../src/stores/sessionStore";

// Mood buttons — first 6 go in a 2-column grid, last one is full-width
type MoodButton =
  | { kind: "question"; emoji: string; label: string; modeId: string }
  | { kind: "session"; emoji: string; label: string; category: CategoryTag };

const MOOD_BUTTONS: MoodButton[] = [
  { kind: "question", emoji: "💕", label: "CONECTAR", modeId: "conexion" },
  { kind: "question", emoji: "😂", label: "REÍRNOS", modeId: "diversion" },
  { kind: "question", emoji: "😏", label: "COQUETEAR", modeId: "coqueteo" },
  { kind: "session", emoji: "🎮", label: "JUGAR", category: "juego" },
  { kind: "question", emoji: "🌙", label: "RELAJARNOS", modeId: "profundo" },
  { kind: "session", emoji: "🎲", label: "SORPRENDERNOS", category: "sorpresa" },
  { kind: "question", emoji: "🔥", label: "ALGO MÁS ÍNTIMO", modeId: "intimo" },
];

function handleMoodPress(btn: MoodButton) {
  if (btn.kind === "question") {
    router.push(`/game?modeId=${btn.modeId}` as Parameters<typeof router.push>[0]);
  } else {
    const experience = generateQuickSession(btn.category);
    setSession({
      title: experience.title,
      tagline: experience.tagline,
      activities: experience.activities,
    });
    router.push("/session");
  }
}

function MoodBtn({ btn, fullWidth }: { btn: MoodButton; fullWidth?: boolean }) {
  return (
    <Pressable
      style={({ pressed }) => [
        fullWidth ? styles.moodBtnFull : styles.moodBtn,
        pressed && styles.moodBtnPressed,
      ]}
      onPress={() => handleMoodPress(btn)}
      accessibilityRole="button"
      accessibilityLabel={btn.label}
    >
      <Text style={styles.moodEmoji}>{btn.emoji}</Text>
      <Text style={[styles.moodLabel, fullWidth && styles.moodLabelFull]}>
        {btn.label}
      </Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useFocusEffect(
    React.useCallback(() => {
      opacity.setValue(0);
      translateY.setValue(16);
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 480, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 480, useNativeDriver: true }),
      ]).start();
    }, [opacity, translateY])
  );

  const gridButtons = MOOD_BUTTONS.slice(0, 6);
  const fullWidthBtn = MOOD_BUTTONS[6];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Settings */}
      <View style={styles.topBar}>
        <View />
        <Pressable
          onPress={() => router.push("/settings")}
          style={styles.settingsButton}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Ajustes"
        >
          <Text style={styles.settingsIcon}>☀︎</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          {/* Header */}
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { fontSize: height < 680 ? 34 : 44, lineHeight: height < 680 ? 38 : 50 },
              ]}
            >
              {"ENTRE\nNOSOTROS"}
            </Text>
            <Text style={styles.tagline}>{"¿Qué hacemos esta noche?"}</Text>
          </View>

          {/* 3 rows of 2 mood buttons */}
          <View style={styles.moodGrid}>
            {[0, 2, 4].map((start) => (
              <View key={start} style={styles.moodRow}>
                <MoodBtn btn={gridButtons[start]} />
                <MoodBtn btn={gridButtons[start + 1]} />
              </View>
            ))}
            {/* Full-width last button */}
            <MoodBtn btn={fullWidthBtn} fullWidth />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* ✨ Armarnos una noche — protagonist CTA */}
          <Pressable
            style={({ pressed }) => [styles.nightBtn, pressed && styles.nightBtnPressed]}
            onPress={() => router.push("/configure")}
            accessibilityRole="button"
            accessibilityLabel="Armarnos una noche"
          >
            <View style={styles.nightBtnContent}>
              <Text style={styles.nightBtnEmoji}>✨</Text>
              <View style={styles.nightBtnText}>
                <Text style={styles.nightBtnTitle}>ARMARNOS UNA NOCHE</Text>
                <Text style={styles.nightBtnDesc}>
                  Configurá y te armamos el plan.
                </Text>
              </View>
            </View>
            <Text style={styles.nightBtnArrow}>›</Text>
          </Pressable>

          {/* 🧠 JUEGOS section */}
          <Pressable
            style={({ pressed }) => [styles.nightBtn, pressed && styles.nightBtnPressed, styles.juegosBtn]}
            onPress={() => router.push("/puzzles" as never)}
            accessibilityRole="button"
            accessibilityLabel="Juegos de misterio"
          >
            <View style={styles.nightBtnContent}>
              <Text style={styles.nightBtnEmoji}>🧠</Text>
              <View style={styles.nightBtnText}>
                <Text style={styles.nightBtnTitle}>JUEGOS DE MISTERIO</Text>
                <Text style={styles.nightBtnDesc}>
                  Puzzles de asesinato. Resuelvan el caso juntos.
                </Text>
              </View>
            </View>
            <Text style={styles.nightBtnArrow}>›</Text>
          </Pressable>

          {/* Guided experiences horizontal scroll */}
          <View style={styles.guidedSection}>
            <Text style={styles.guidedLabel}>NOCHES GUIADAS</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.guidedScroll}
            >
              {GUIDED_EXPERIENCES.map((exp) => (
                <Pressable
                  key={exp.id}
                  style={({ pressed }) => [
                    styles.guidedCard,
                    pressed && styles.guidedCardPressed,
                  ]}
                  onPress={() =>
                    router.push(
                      `/night-plan?guidedId=${exp.id}` as Parameters<typeof router.push>[0]
                    )
                  }
                  accessibilityRole="button"
                  accessibilityLabel={exp.title}
                >
                  <Text style={styles.guidedCardEmoji}>{exp.emoji}</Text>
                  <Text style={styles.guidedCardTitle}>{exp.title}</Text>
                  <Text style={styles.guidedCardTagline}>{exp.tagline}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "rgba(235,226,213,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: {
    fontSize: 18,
    color: "rgba(235,226,213,0.55)",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 32,
    gap: 20,
  },
  header: {
    gap: 6,
    marginBottom: 4,
  },
  title: {
    fontFamily: "InstrumentSerif_400Regular",
    color: Colors.text,
    letterSpacing: -1,
  },
  tagline: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 17,
    lineHeight: 24,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  moodGrid: {
    gap: 8,
  },
  moodRow: {
    flexDirection: "row",
    gap: 8,
  },
  moodBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
    minHeight: 72,
    justifyContent: "center",
  },
  moodBtnFull: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  moodBtnPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.972 }],
  },
  moodEmoji: {
    fontSize: 22,
  },
  moodLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    letterSpacing: 1.8,
    color: Colors.text,
    textAlign: "center",
  },
  moodLabelFull: {
    fontSize: 12,
    letterSpacing: 2,
    textAlign: "left",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(235,226,213,0.07)",
    marginVertical: 2,
  },
  nightBtn: {
    backgroundColor: Colors.primary + "18",
    borderRadius: Radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.primary + "44",
  },
  nightBtnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.978 }],
  },
  nightBtnContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  nightBtnEmoji: {
    fontSize: 24,
  },
  nightBtnText: {
    gap: 2,
    flex: 1,
  },
  nightBtnTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 1.8,
    color: Colors.primary,
  },
  nightBtnDesc: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  nightBtnArrow: {
    fontSize: 22,
    color: Colors.primary,
  },
  juegosBtn: {
    marginTop: 10,
    borderColor: Colors.accent + "44",
    backgroundColor: Colors.accent + "12",
  },
  guidedSection: {
    gap: 12,
  },
  guidedLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 2.5,
    color: Colors.textTertiary,
  },
  guidedScroll: {
    gap: 10,
    paddingRight: 4,
  },
  guidedCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 16,
    width: 160,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  guidedCardPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.975 }],
  },
  guidedCardEmoji: {
    fontSize: 24,
  },
  guidedCardTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 0.5,
    color: Colors.text,
    lineHeight: 16,
  },
  guidedCardTagline: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
});
