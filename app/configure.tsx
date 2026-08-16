import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Radius } from "../src/theme";
import {
  PlaceOption,
  TimeOption,
  EnergyOption,
  BudgetOption,
} from "../src/data/generator";

type ChipOption<T extends string> = { value: T; label: string; emoji: string };

const PLACES: ChipOption<PlaceOption>[] = [
  { value: "casa", label: "En casa", emoji: "🏠" },
  { value: "afuera", label: "Salimos", emoji: "🌃" },
];

const TIMES: ChipOption<TimeOption>[] = [
  { value: "15min", label: "15 min", emoji: "⚡" },
  { value: "30min", label: "30 min", emoji: "🕐" },
  { value: "1h", label: "1 hora", emoji: "☕" },
  { value: "2h", label: "2 horas", emoji: "🌙" },
  { value: "toda", label: "La noche", emoji: "✨" },
];

const ENERGIES: ChipOption<EnergyOption>[] = [
  { value: "baja", label: "Tranquila", emoji: "😌" },
  { value: "media", label: "Equilibrada", emoji: "🙂" },
  { value: "alta", label: "Intensa", emoji: "🔥" },
];

const BUDGETS: ChipOption<BudgetOption>[] = [
  { value: "nada", label: "Sin gastar", emoji: "💸" },
  { value: "poco", label: "Algo", emoji: "🪙" },
  { value: "flexible", label: "Flexible", emoji: "💳" },
];

function ChipGroup<T extends string>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: ChipOption<T>[];
  selected: T | null;
  onSelect: (v: T) => void;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.chips}>
        {options.map((opt) => {
          const active = selected === opt.value;
          return (
            <Pressable
              key={opt.value}
              style={({ pressed }) => [
                styles.chip,
                active && styles.chipActive,
                pressed && styles.chipPressed,
              ]}
              onPress={() => onSelect(opt.value)}
              accessibilityRole="button"
              accessibilityLabel={opt.label}
              accessibilityState={{ selected: active }}
            >
              <Text style={styles.chipEmoji}>{opt.emoji}</Text>
              <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function ConfigureScreen() {
  const [place, setPlace] = useState<PlaceOption | null>(null);
  const [time, setTime] = useState<TimeOption | null>(null);
  const [energy, setEnergy] = useState<EnergyOption | null>(null);
  const [budget, setBudget] = useState<BudgetOption | null>(null);

  const ready = place !== null && time !== null && energy !== null && budget !== null;

  const handleGenerate = () => {
    if (!ready) return;
    router.push(
      `/night-plan?place=${place}&time=${encodeURIComponent(time!)}&energy=${energy}&budget=${budget}` as Parameters<typeof router.push>[0]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.nav}>
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          style={styles.backBtn}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Volver"
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.navTitle}>ARMARNOS UNA NOCHE</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.pageTitle}>{"¿Cómo es\nesta noche?"}</Text>
        <Text style={styles.pageTagline}>
          Configurá la noche. Nosotros armamos el plan.
        </Text>

        <ChipGroup label="¿Dónde están?" options={PLACES} selected={place} onSelect={setPlace} />
        <ChipGroup label="¿Cuánto tiempo tienen?" options={TIMES} selected={time} onSelect={setTime} />
        <ChipGroup label="¿Qué energía tienen?" options={ENERGIES} selected={energy} onSelect={setEnergy} />
        <ChipGroup label="¿Cuánto quieren gastar?" options={BUDGETS} selected={budget} onSelect={setBudget} />

        <Pressable
          style={({ pressed }) => [
            styles.generateBtn,
            !ready && styles.generateBtnDisabled,
            pressed && ready && styles.generateBtnPressed,
          ]}
          onPress={handleGenerate}
          disabled={!ready}
          accessibilityRole="button"
          accessibilityLabel="Generar mi noche"
        >
          <Text style={[styles.generateLabel, !ready && styles.generateLabelDisabled]}>
            GENERAR MI NOCHE
          </Text>
        </Pressable>
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
    borderRadius: 9999,
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
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 48,
    gap: 24,
  },
  pageTitle: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 34,
    lineHeight: 40,
    color: Colors.text,
  },
  pageTagline: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    fontStyle: "italic",
    marginTop: -12,
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    letterSpacing: 2,
    color: Colors.textSecondary,
    textTransform: "uppercase",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.1)",
  },
  chipActive: {
    backgroundColor: Colors.primary + "22",
    borderColor: Colors.primary,
  },
  chipPressed: {
    opacity: 0.75,
  },
  chipEmoji: {
    fontSize: 14,
  },
  chipLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: Colors.textSecondary,
  },
  chipLabelActive: {
    color: Colors.primary,
  },
  generateBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  generateBtnDisabled: {
    backgroundColor: "rgba(192,154,82,0.25)",
  },
  generateBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.978 }],
  },
  generateLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
  generateLabelDisabled: {
    color: "rgba(192,154,82,0.4)",
  },
});
