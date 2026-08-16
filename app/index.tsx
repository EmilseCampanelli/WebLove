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
import { Colors, Typography, Radius } from "../src/theme";
import { GUIDED_NIGHTS } from "../src/data/nightPlans";

type MoodButton = {
  emoji: string;
  label: string;
  route: string;
};

const MOOD_BUTTONS: MoodButton[] = [
  { emoji: "❤️", label: "Conexión", route: "/game?modeId=conexion" },
  { emoji: "😉", label: "Coqueteo", route: "/game?modeId=coqueteo" },
  { emoji: "🔥", label: "Íntimo", route: "/game?modeId=intimo" },
  { emoji: "😄", label: "Reírnos", route: "/game?modeId=diversion" },
  { emoji: "💭", label: "Profundo", route: "/game?modeId=profundo" },
  { emoji: "🎯", label: "Desafíos", route: "/experience?category=challenge" },
  { emoji: "🥂", label: "Previas", route: "/game?modeId=previas" },
];

function MoodBtn({ btn }: { btn: MoodButton }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.moodBtn, pressed && styles.moodBtnPressed]}
      onPress={() => router.push(btn.route as Parameters<typeof router.push>[0])}
      accessibilityRole="button"
      accessibilityLabel={btn.label}
    >
      <Text style={styles.moodEmoji}>{btn.emoji}</Text>
      <Text style={styles.moodLabel}>{btn.label.toUpperCase()}</Text>
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

  const randomGuided = GUIDED_NIGHTS[Math.floor(Math.random() * GUIDED_NIGHTS.length)];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Settings button */}
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

          {/* Mood grid: 3 rows of 2 + 1 full */}
          <View style={styles.moodGrid}>
            {MOOD_BUTTONS.slice(0, 6).reduce<MoodButton[][]>((rows, btn, i) => {
              const rowIdx = Math.floor(i / 2);
              if (!rows[rowIdx]) rows[rowIdx] = [];
              rows[rowIdx].push(btn);
              return rows;
            }, []).map((row, rowIdx) => (
              <View key={rowIdx} style={styles.moodRow}>
                {row.map((btn) => (
                  <MoodBtn key={btn.label} btn={btn} />
                ))}
              </View>
            ))}
            {/* last full-width item */}
            <Pressable
              style={({ pressed }) => [styles.moodBtnFull, pressed && styles.moodBtnPressed]}
              onPress={() => router.push(MOOD_BUTTONS[6].route as Parameters<typeof router.push>[0])}
              accessibilityRole="button"
              accessibilityLabel={MOOD_BUTTONS[6].label}
            >
              <Text style={styles.moodEmoji}>{MOOD_BUTTONS[6].emoji}</Text>
              <Text style={styles.moodLabel}>{MOOD_BUTTONS[6].label.toUpperCase()}</Text>
            </Pressable>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Night configurator CTA */}
          <Pressable
            style={({ pressed }) => [styles.nightBtn, pressed && styles.nightBtnPressed]}
            onPress={() => router.push("/configure")}
            accessibilityRole="button"
            accessibilityLabel="Armarse una noche"
          >
            <View style={styles.nightBtnContent}>
              <Text style={styles.nightBtnEmoji}>✨</Text>
              <View style={styles.nightBtnText}>
                <Text style={styles.nightBtnTitle}>ARMARSE UNA NOCHE</Text>
                <Text style={styles.nightBtnDesc}>Configurá y te armamos el plan.</Text>
              </View>
            </View>
            <Text style={styles.nightBtnArrow}>›</Text>
          </Pressable>

          {/* Guided nights */}
          <View style={styles.guidedSection}>
            <Text style={styles.guidedSectionLabel}>NOCHES GUIADAS</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.guidedScroll}
            >
              {GUIDED_NIGHTS.map((night) => (
                <Pressable
                  key={night.id}
                  style={({ pressed }) => [styles.guidedCard, pressed && styles.guidedCardPressed]}
                  onPress={() => router.push(`/night-plan?guidedId=${night.id}` as Parameters<typeof router.push>[0])}
                  accessibilityRole="button"
                  accessibilityLabel={night.title}
                >
                  <Text style={styles.guidedCardEmoji}>{night.emoji}</Text>
                  <Text style={styles.guidedCardTitle}>{night.title}</Text>
                  <Text style={styles.guidedCardTagline}>{night.tagline}</Text>
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
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
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
    opacity: 0.75,
    transform: [{ scale: 0.975 }],
  },
  moodEmoji: {
    fontSize: 22,
  },
  moodLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: Colors.text,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(235,226,213,0.07)",
    marginVertical: 4,
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
  guidedSection: {
    gap: 12,
  },
  guidedSectionLabel: {
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
    opacity: 0.75,
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
