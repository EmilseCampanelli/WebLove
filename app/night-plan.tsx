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
  generateExperience,
  getGuidedExperienceActivities,
  GUIDED_EXPERIENCES,
  NightConfig,
  PlaceOption,
  TimeOption,
  EnergyOption,
  BudgetOption,
  GuidedExperience,
} from "../src/data/generator";
import { Activity } from "../src/data/activities";
import { setSession } from "../src/stores/sessionStore";

const TYPE_EMOJIS: Record<string, string> = {
  question: "💬",
  challenge: "🎯",
  game: "🎮",
  activity: "✨",
  secret_mission: "🕵️",
  timer: "⏱",
  choice: "🎲",
  no_phone: "📵",
  date: "🌙",
  surprise: "🎁",
};

function ActivityRow({ activity, index }: { activity: Activity; index: number }) {
  const emoji = TYPE_EMOJIS[activity.type] ?? "✦";
  return (
    <View style={styles.activityRow}>
      <View style={styles.rowIndex}>
        <Text style={styles.rowIndexText}>{index + 1}</Text>
      </View>
      <View style={[styles.rowEmoji, { backgroundColor: Colors.primary + "18" }]}>
        <Text style={styles.rowEmojiText}>{emoji}</Text>
      </View>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{activity.title}</Text>
        <Text style={styles.rowDesc} numberOfLines={2}>{activity.description}</Text>
      </View>
      <Text style={styles.rowDuration}>{activity.durationMin} min</Text>
    </View>
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
  let activities: Activity[];

  if (params.guidedId) {
    const guided: GuidedExperience | undefined = GUIDED_EXPERIENCES.find(
      (n) => n.id === params.guidedId
    );
    if (guided) {
      title = guided.title;
      tagline = guided.tagline;
      activities = getGuidedExperienceActivities(guided);
    } else {
      const fallback = GUIDED_EXPERIENCES[5];
      title = fallback.title;
      tagline = fallback.tagline;
      activities = getGuidedExperienceActivities(fallback);
    }
  } else {
    const config: NightConfig = {
      place: (params.place as PlaceOption) ?? "casa",
      time: (params.time as TimeOption) ?? "1h",
      energy: (params.energy as EnergyOption) ?? "media",
      budget: (params.budget as BudgetOption) ?? "nada",
    };
    const generated = generateExperience(config);
    title = generated.title;
    tagline = generated.tagline;
    activities = generated.activities;
  }

  const totalMin = activities.reduce((sum, a) => sum + a.durationMin, 0);

  const handleStart = () => {
    setSession({ title, tagline, activities });
    router.push("/session");
  };

  const handleRegenerate = () => {
    // Navigate back to configure to try again
    router.back();
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
        <Text style={styles.navTitle}>TU NOCHE</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.tagline}>{tagline}</Text>
          <Text style={styles.meta}>
            {activities.length} actividades · ~{totalMin} min
          </Text>
        </View>

        {/* Activity list */}
        <View style={styles.list}>
          {activities.map((activity, i) => (
            <ActivityRow key={activity.id} activity={activity} index={i} />
          ))}
        </View>

        {/* Actions */}
        <Pressable
          style={({ pressed }) => [styles.startBtn, pressed && styles.startBtnPressed]}
          onPress={handleStart}
          accessibilityRole="button"
          accessibilityLabel="Empezar"
        >
          <Text style={styles.startLabel}>EMPEZAR</Text>
        </Pressable>

        {!params.guidedId && (
          <Pressable
            style={({ pressed }) => [styles.regenBtn, pressed && styles.regenBtnPressed]}
            onPress={handleRegenerate}
            accessibilityRole="button"
            accessibilityLabel="Generar otro plan"
          >
            <Text style={styles.regenLabel}>🎲 GENERAR OTRO PLAN</Text>
          </Pressable>
        )}
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
  list: {
    gap: 8,
  },
  activityRow: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.07)",
  },
  rowIndex: {
    width: 20,
    alignItems: "center",
  },
  rowIndexText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    color: Colors.textTertiary,
  },
  rowEmoji: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  rowEmojiText: {
    fontSize: 20,
  },
  rowContent: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: Colors.text,
    lineHeight: 19,
  },
  rowDesc: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 12,
    lineHeight: 17,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
  rowDuration: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: Colors.textTertiary,
    letterSpacing: 0.3,
  },
  startBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
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
  regenBtn: {
    borderRadius: Radius.md,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(235,226,213,0.1)",
  },
  regenBtnPressed: {
    opacity: 0.7,
  },
  regenLabel: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
  },
});
