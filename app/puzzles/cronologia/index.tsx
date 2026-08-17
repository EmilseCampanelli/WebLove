import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CRONOLOGIA_PUZZLES } from "../../../src/data/puzzles/cronologia/puzzles";
import { CronologiaPuzzle } from "../../../src/data/puzzles/cronologia/types";
import { Colors, Radius } from "../../../src/theme";

const DIFF_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  facil:   { label: "FÁCIL",   color: "#5A8A5F", bg: "#5A8A5F22" },
  medio:   { label: "MEDIO",   color: "#9A7830", bg: "#9A783022" },
  dificil: { label: "DIFÍCIL", color: "#A04D3A", bg: "#A04D3A22" },
  experto: { label: "EXPERTO", color: "#6B5090", bg: "#6B509022" },
};

function PuzzleCard({ puzzle }: { puzzle: CronologiaPuzzle }) {
  const diff = DIFF_CONFIG[puzzle.difficulty];
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => router.push(`/puzzles/cronologia/${puzzle.id}` as never)}
      accessibilityLabel={puzzle.title}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.diffBadge, { backgroundColor: diff.bg }]}>
          <Text style={[styles.diffLabel, { color: diff.color }]}>{diff.label}</Text>
        </View>
        <Text style={styles.duration}>~{puzzle.estimatedMinutes} min</Text>
      </View>
      <Text style={styles.cardTitle}>{puzzle.title}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>{puzzle.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardMeta}>🕐 {puzzle.events.length} eventos</Text>
        <Text style={styles.arrow}>→</Text>
      </View>
    </Pressable>
  );
}

export default function CronologiaListScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.push("/puzzles" as never)} hitSlop={12}>
          <Text style={styles.backLabel}>← JUEGOS</Text>
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>CRONOLOGÍA</Text>
        <Text style={styles.title}>Ordená los hechos</Text>
        <Text style={styles.subtitle}>
          Reconstruí la línea de tiempo del crimen y encontrá el evento que es físicamente imposible.
        </Text>
        <View style={styles.list}>
          {CRONOLOGIA_PUZZLES.map((p) => (
            <PuzzleCard key={p.id} puzzle={p} />
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8 },
  backLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.primary,
  },
  content: { paddingHorizontal: 24, paddingTop: 8 },
  eyebrow: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    letterSpacing: 3.5,
    color: Colors.primary,
    marginBottom: 6,
  },
  title: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 30,
    lineHeight: 38,
    color: Colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginBottom: 28,
  },
  list: { gap: 14 },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardPressed: { opacity: 0.8, transform: [{ scale: 0.985 }] },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  diffBadge: { borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  diffLabel: { fontFamily: "Manrope_700Bold", fontSize: 9, letterSpacing: 2 },
  duration: { fontFamily: "Manrope_400Regular", fontSize: 11, color: Colors.textTertiary },
  cardTitle: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 20,
    color: Colors.text,
    marginBottom: 6,
  },
  cardDesc: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardMeta: { fontFamily: "Manrope_400Regular", fontSize: 12, color: Colors.textTertiary },
  arrow: { fontFamily: "Manrope_700Bold", fontSize: 16, color: Colors.primary },
});
