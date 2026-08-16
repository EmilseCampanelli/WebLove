import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Radius } from "../src/theme";
import {
  generateNightPlan,
  NightConfig,
  NightStep,
  PlaceOption,
  TimeOption,
  EnergyOption,
  BudgetOption,
  GUIDED_NIGHTS,
  GuidedNight,
} from "../src/data/nightPlans";

function StepCard({ step, index }: { step: NightStep; index: number }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.stepCard, pressed && styles.stepCardPressed]}
      onPress={() => router.push(step.route as Parameters<typeof router.push>[0])}
      accessibilityRole="button"
      accessibilityLabel={step.title}
    >
      <View style={styles.stepIndex}>
        <Text style={styles.stepIndexText}>{index + 1}</Text>
      </View>
      <View style={styles.stepEmoji}>
        <Text style={styles.stepEmojiText}>{step.emoji}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepDesc}>{step.description}</Text>
      </View>
      <Text style={styles.stepDuration}>{step.durationMin} min</Text>
      <Text style={styles.stepArrow}>›</Text>
    </Pressable>
  );
}

export default function NightPlanScreen() {
  const params = useLocalSearchParams<{
    place?: string;
    time?: string;
    energy?: string;
    budget?: string;
    guidedId?: string;
  }>();

  let title: string;
  let tagline: string;
  let steps: NightStep[];

  if (params.guidedId) {
    const guided: GuidedNight | undefined = GUIDED_NIGHTS.find(
      (n) => n.id === params.guidedId
    );
    if (!guided) {
      title = "Noche sorpresa";
      tagline = "Algo está por pasar.";
      steps = GUIDED_NIGHTS[5].steps;
    } else {
      title = guided.title;
      tagline = guided.tagline;
      steps = guided.steps;
    }
  } else {
    const config: NightConfig = {
      place: (params.place as PlaceOption) ?? "casa",
      time: (params.time as TimeOption) ?? "1h",
      energy: (params.energy as EnergyOption) ?? "media",
      budget: (params.budget as BudgetOption) ?? "nada",
    };
    const plan = generateNightPlan(config);
    title = plan.title;
    tagline = plan.tagline;
    steps = plan.steps;
  }

  const totalMin = steps.reduce((sum, s) => sum + s.durationMin, 0);

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
        <Text style={styles.navTitle}>TU NOCHE</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.tagline}>{tagline}</Text>
          <Text style={styles.meta}>{steps.length} pasos · ~{totalMin} min</Text>
        </View>

        <View style={styles.steps}>
          {steps.map((step, i) => (
            <StepCard key={`${step.id}-${i}`} step={step} index={i} />
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [styles.startBtn, pressed && styles.startBtnPressed]}
          onPress={() => router.push(steps[0].route as Parameters<typeof router.push>[0])}
          accessibilityRole="button"
          accessibilityLabel="Empezar desde el principio"
        >
          <Text style={styles.startLabel}>EMPEZAR DESDE EL PRINCIPIO</Text>
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
    gap: 20,
  },
  header: {
    gap: 6,
    marginBottom: 4,
  },
  title: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 34,
    lineHeight: 40,
    color: Colors.text,
  },
  tagline: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  meta: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    letterSpacing: 0.5,
    color: Colors.textTertiary,
  },
  steps: {
    gap: 8,
  },
  stepCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  stepCardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.985 }],
  },
  stepIndex: {
    width: 24,
    alignItems: "center",
  },
  stepIndexText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: Colors.textTertiary,
  },
  stepEmoji: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(192,154,82,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepEmojiText: {
    fontSize: 20,
  },
  stepContent: {
    flex: 1,
    gap: 2,
  },
  stepTitle: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: Colors.text,
  },
  stepDesc: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  stepDuration: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textTertiary,
    letterSpacing: 0.3,
  },
  stepArrow: {
    fontSize: 20,
    color: Colors.textTertiary,
  },
  startBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  startBtnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.978 }],
  },
  startLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.background,
  },
});
